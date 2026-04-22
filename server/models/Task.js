import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
  userId: mongoose.Schema.Types.ObjectId,
  title: String,
  completed: { default: false, type: Boolean }
}, { timestamps: true });

export default mongoose.model("Task", taskSchema);