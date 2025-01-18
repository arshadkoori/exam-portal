import Exam from "../models/exam.model.js";
import Question from "../models/question.model.js";
import StudentMarks from "../models/students.mark.model.js"; // Model to store marks

export const createExam = async (req, res) => {
  try {
    const { examTitle, examPassword, questions, instructorId, instructorName } =
      req.body;

    console.log("Request Body:", req.body);

    if (
      !examTitle ||
      !examPassword ||
      !questions ||
      !instructorId ||
      !instructorName ||
      !Array.isArray(questions)
    ) {
      return res.status(400).json({ message: "Invalid request data" });
    }

    const questionDocs = await Promise.all(
      questions.map(async (q) => {
        const newQuestion = new Question(q);
        await newQuestion.save();
        return newQuestion._id;
      })
    );

    //

    const passwordRegex = /^\d{10}$/; // Regex to validate 10 numeric digits
    if (!passwordRegex.test(examPassword)) {
      return res
        .status(400)
        .json({ message: "Exam password must be exactly 10 numeric digits." });
    }

    //

    const newExam = new Exam({
      examTitle,
      password: examPassword,
      questions: questionDocs,
      instructorId,
      instructorName,
    });
    await newExam.save();

    res.status(201).json({ message: "Exam created successfully" });
  } catch (error) {
    console.error("Error creating exam:", error); // Log the error for debugging
    res
      .status(500)
      .json({ message: "Error creating exam", error: error.message });
  }
};

export const getExams = async (req, res) => {
  try {
    const exams = await Exam.find().populate("questions");
    res.status(200).json(exams);
  } catch (error) {
    console.error("Error fetching exams:", error);
    res.status(500).json({ message: "Error fetching exams" });
  }
};

export const getExamTitles = async (req, res) => {
  try {
    const exams = await Exam.find().select("examTitle");
    res.status(200).json(exams);
  } catch (error) {
    console.error("Error fetching exam titles:", error);
    res.status(500).json({ message: "Error fetching exam titles" });
  }
};

// export const getExamQuestions = async (req, res) => {
//   const { id } = req.params;

//   try {
//     const exam = await Exam.findById(id).populate("questions");
//     if (!exam) {
//       return res.status(404).json({ message: "Exam not found" });
//     }
//     res.status(200).json(exam);
//   } catch (error) {
//     console.error("Error fetching exam questions:", error);
//     res.status(500).json({ message: "Error fetching exam questions" });
//   }
// };

export const getExamQuestions = async (req, res) => {
  const { id } = req.params;
  const { password } = req.query; // Expect the password to be sent as a query parameter

  try {
    const exam = await Exam.findById(id).populate("questions");
    if (!exam) {
      return res.status(404).json({ message: "Exam not found" });
    }

    // Check if the provided password matches the exam's password
    if (exam.password !== password) {
      return res.status(401).json({ message: "Invalid password" });
    }

    res.status(200).json(exam);
  } catch (error) {
    console.error("Error fetching exam questions:", error);
    res.status(500).json({ message: "Error fetching exam questions" });
  }
};

export const saveMarks = async (req, res) => {
  try {
    const { studentId, studentName, examId, score } = req.body;

    if (!studentId || !studentName || !examId || score === undefined) {
      return res.status(400).json({ message: "Missing required fields." });
    }

    const exam = await Exam.findById(examId);
    if (!exam) {
      return res.status(404).json({ message: "Exam not found." });
    }

    const newMarks = new StudentMarks({
      studentId,
      studentName,
      examId,
      examName: exam.examTitle,
      score,
    });

    await newMarks.save();
    res.status(200).json({ message: "Marks saved successfully!" });
  } catch (error) {
    console.error("Error saving marks:", error);
    res
      .status(500)
      .json({ message: "Error saving marks", error: error.message });
  }
};

export const getStudentExams = async (req, res) => {
  try {
    const studentId = req.user.id;
    console.log("Fetching exams for student ID:", studentId);

    const student = await Student.findById(studentId);

    if (!student) {
      console.log("Student not found");
      return res.status(404).json({ msg: "Student not found" });
    }

    console.log("Student found:", student);

    const exams = student.marks.map((exam) => ({
      examName: exam.name,
      marks: [
        { subjectName: "Subject 1", mark: exam.subject1 },
        { subjectName: "Subject 2", mark: exam.subject2 },
        { subjectName: "Subject 3", mark: exam.subject3 },
      ],
    }));

    console.log("Exams to return:", exams);
    res.json(exams);
  } catch (err) {
    console.error("Error in getStudentExams:", err);
    res.status(500).json({ msg: "Server error" });
  }
};
