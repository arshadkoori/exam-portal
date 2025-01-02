
// import mongoose from 'mongoose';

// const examSchema = new mongoose.Schema({
//   questions: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Question' }],
// });

// const Exam = mongoose.model('Exam', examSchema);

// export default Exam;


import mongoose from "mongoose";

const examSchema = new mongoose.Schema({
  examTitle: { type: String, required: true },
  questions: [{ type: mongoose.Schema.Types.ObjectId, ref: "Question" }],
});

const Exam = mongoose.model("Exam", examSchema);

export default Exam;
