import mongoose from "mongoose";

const goalSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  goals: [
    {
      title: {
        type: String,
        required: true,
      },
      description: {
        type: String,
      },
      priority: {
        type: String,
        required: true,
      },
      status: {
        type: Boolean,
        required: true,
      },
    },
  ],
});

const Goal = mongoose.model("Goal", goalSchema);

export default Goal;
