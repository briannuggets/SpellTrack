import express from "express";
import {
  addGoal,
  getGoals,
  deleteGoal,
  updateGoal,
} from "../controllers/goalController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", protect, addGoal);
router.get("/", protect, getGoals);
router.delete("/:id", protect, deleteGoal);
router.put("/:id", protect, updateGoal);

export default router;
