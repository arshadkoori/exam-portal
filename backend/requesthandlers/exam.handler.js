
import Exam from '../models/exam.model.js';
import Question from '../models/question.model.js';

// Create a new exam
// export const createExam = async (req, res) => {
//   const { questions } = req.body;

//   console.log('Received Questions:', questions); // Debugging: Log received questions

//   if (!questions || questions.length === 0) {
//     return res.status(400).json({ message: 'No questions provided' });
//   }

//   try {
//     const questionDocs = await Promise.all(
//       questions.map(async (q) => {
//         const newQuestion = new Question(q);
//         await newQuestion.save();
//         return newQuestion._id;
//       })
//     );

//     console.log('Saved Question IDs:', questionDocs); // Debugging: Log saved question IDs

//     const newExam = new Exam({ questions: questionDocs });
//     await newExam.save();

//     console.log('Exam Saved:', newExam); // Debugging: Log saved exam
//     res.status(201).json({ message: 'Exam created successfully', examId: newExam._id });
//   } catch (error) {
//     console.error('Error creating exam:', error); // Log error details
//     res.status(500).json({ message: 'Error creating exam', error: error.message });
//   }
// };


// export const createExam = async (req, res) => {
//   try {
//     const { examTitle, questions } = req.body;

//     // Validate required fields
//     if (!examTitle || !questions || !Array.isArray(questions)) {
//       return res.status(400).json({ message: "Invalid request data" });
//     }

//     // Create and save questions
//     const questionDocs = await Promise.all(
//       questions.map(async (q) => {
//         const newQuestion = new Question(q);
//         await newQuestion.save();
//         return newQuestion._id;
//       })
//     );

//     // Create and save exam
//     const newExam = new Exam({ examTitle, questions: questionDocs });
//     await newExam.save();

//     res.status(201).json({ message: "Exam created successfully" });
//   } catch (error) {
//     console.error("Error creating exam:", error);
//     res.status(500).json({ message: "Error creating exam", error: error.message });
//   }
// };

export const createExam = async (req, res) => {
  try {
    const { examTitle, questions } = req.body;

    // Log request body
    console.log("Request Body:", req.body);

    if (!examTitle || !questions || !Array.isArray(questions)) {
      return res.status(400).json({ message: "Invalid request data" });
    }

    const questionDocs = await Promise.all(
      questions.map(async (q) => {
        const newQuestion = new Question(q);
        await newQuestion.save();
        return newQuestion._id;
      })
    );

    const newExam = new Exam({ examTitle, questions: questionDocs });
    await newExam.save();

    res.status(201).json({ message: "Exam created successfully" });
  } catch (error) {
    console.error("Error creating exam:", error); // Log the error
    res.status(500).json({ message: "Error creating exam", error: error.message });
  }
};



// Get the exam 
export const getExams = async (req, res) => {
  try {
    const exams = await Exam.find().populate("questions");
    res.status(200).json(exams);
  } catch (error) {
    console.error("Error fetching exams:", error);
    res.status(500).json({ message: "Error fetching exams" });
  }
};


// Fetch all exam titles
export const getExamTitles = async (req, res) => {
  try {
    const exams = await Exam.find().select("examTitle");
    res.status(200).json(exams);
  } catch (error) {
    console.error("Error fetching exam titles:", error);
    res.status(500).json({ message: "Error fetching exam titles" });
  }
};


// Fetch questions for a specific exam
export const getExamQuestions = async (req, res) => {
  const { id } = req.params;

  try {
    const exam = await Exam.findById(id).populate("questions");
    if (!exam) {
      return res.status(404).json({ message: "Exam not found" });
    }
    res.status(200).json(exam);
  } catch (error) {
    console.error("Error fetching exam questions:", error);
    res.status(500).json({ message: "Error fetching exam questions" });
  }
};
