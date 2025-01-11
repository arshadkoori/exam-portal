
import mongoose from 'mongoose';

// Define the Exam Schema
const examSchema = new mongoose.Schema(
  {
    examTitle: { type: String, required: true },
    questions: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Question' }],
    instructorId: { type: mongoose.Schema.Types.ObjectId, ref: 'Instructor', required: true },
    instructorName: { type: String, required: true },
  },
  { timestamps: true }
);

// Create the Exam model
const Exam = mongoose.model('Exam', examSchema);

export default Exam;

