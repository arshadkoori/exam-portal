
import mongoose from 'mongoose';

// Define the Exam Schema
const examSchema = new mongoose.Schema(
  {
    examTitle: { type: String, required: true }, // Exam title is required
    questions: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Question' }], // Array of question references
    instructorId: { type: mongoose.Schema.Types.ObjectId, ref: 'Instructor', required: true }, // Reference to Instructor model
    instructorName: { type: String, required: true }, // Instructor name added for consistency with the request body
  },
  { timestamps: true } // This will add `createdAt` and `updatedAt` fields automatically
);

// Create the Exam model
const Exam = mongoose.model('Exam', examSchema);

export default Exam;

