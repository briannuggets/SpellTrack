import asyncHandler from "express-async-handler";
import Goal from "../models/goalModel.js";

// Add goal
// POST /api/goals
// Private
const addGoal = asyncHandler(async (req, res) => {
  const { title, description, priority, status } = req.body;

  const userId = req.user._id;
  if (userId === undefined) {
    res.status(401);
    throw new Error("Not authorized");
  }

  const foundGoal = await Goal.findOne({ user: userId });

  if (foundGoal) {
    foundGoal.goals.push({
      title,
      description,
      priority,
      status,
    });
    await foundGoal.save();
  } else {
    await Goal.create({
      user: userId,
      goals: [
        {
          title,
          description,
          priority,
          status,
        },
      ],
    });
  }
  res.status(201).json({ message: "Goal added" });
});

// Get goals
// GET /api/goals
// Private
const getGoals = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  if (userId === undefined) {
    res.status(401);
    throw new Error("Not authorized");
  }

  const foundGoal = await Goal.findOne({ user: userId });
  if (foundGoal) {
    res.json(foundGoal);
  } else {
    res.status(404);
    throw new Error("Goal not found");
  }
});

// Delete goal
// DELETE /api/goals/:id
// Private
const deleteGoal = asyncHandler(async (req, res) => {
  const goalId = req.params.id;

  const userId = req.user._id;
  if (userId === undefined) {
    res.status(401);
    throw new Error("Not authorized");
  }

  try {
    const result = await Goal.updateOne(
      { user: userId },
      { $pull: { goals: { _id: goalId } } }
    );

    if (result.nModified === 0) {
      res.status(404);
      throw new Error("Goal not found");
    } else {
      res.status(200).json({ message: "Goal deleted" });
    }
  } catch (err) {
    res.status(500);
    throw new Error("Failed to delete goal");
  }
});

// Update goal
// PUT /api/goals/:id
// Private
const updateGoal = asyncHandler(async (req, res) => {
  const goalId = req.params.id;
  const { title, description, priority, status } = req.body;
  const userId = req.user._id;

  if (userId === undefined) {
    res.status(401);
    throw new Error("Not authorized");
  }

  try {
    const result = await Goal.findOne(
      { user: userId, "goals._id": goalId },
      { "goals.$": 1 }
    );
    const previousGoal = result.goals[0];

    const updatedGoal = {
      title: title || previousGoal.title,
      description: description || previousGoal.description,
      priority: priority || previousGoal.priority,
      status: status || previousGoal.status,
    };

    await Goal.findOneAndUpdate(
      { user: userId, "goals._id": goalId }, // Filter for the specific goal to be replaced
      { $set: { "goals.$": updatedGoal } } // Set the updatedGoal as the replacement
    );

    res.status(200).json({ message: "Goal updated" });
  } catch (err) {
    res.status(400);
    throw new Error("Failed to update goal");
  }
});

export { addGoal, getGoals, deleteGoal, updateGoal };
