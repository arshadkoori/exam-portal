
import React, { useEffect, useState } from "react";
import axios from "axios";
import "./css/ShowExams.css";
import toast from "react-hot-toast";

const ShowExams = () => {
  const [exams, setExams] = useState([]); // Store exams
  const [loading, setLoading] = useState(true); // Loading state
  const [editQuestion, setEditQuestion] = useState(null); // Question to edit
  const [showModal, setShowModal] = useState(false); // Modal visibility

  // Fetch exams created by the logged-in instructor
  useEffect(() => {
    const fetchExams = async () => {
      try {
        const instructorId = localStorage.getItem("Instructor_ID");
        const response = await axios.get(
          `/api/exam?instructorId=${instructorId}`
        );
        setExams(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching exams:", error);
        setLoading(false);
      }
    };

    fetchExams();
  }, []);

  // Open the modal to edit a question
  const handleEditClick = (question, examId) => {
    setEditQuestion({ ...question, examId }); // Attach examId to question
    setShowModal(true);
  };

  // Update the input fields in the modal
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditQuestion((prev) => ({ ...prev, [name]: value }));
  };

  // Update options in the modal
  const handleOptionChange = (index, value) => {
    const updatedOptions = [...editQuestion.options];
    updatedOptions[index] = value;
    setEditQuestion((prev) => ({ ...prev, options: updatedOptions }));
  };

  // Handle change of the correct answer (from input to select)
  const handleCorrectAnswerChange = (e) => {
    const selectedAnswer = e.target.value;
    setEditQuestion((prev) => ({ ...prev, correctAnswer: selectedAnswer }));
  };

  // Save changes to the question
  const handleSaveChanges = async () => {
    try {
      const {
        examId,
        _id: questionId,
        questionText,
        options,
        correctAnswer,
      } = editQuestion;

      const response = await axios.put(
        `/api/exam/${examId}/questions/${questionId}`,
        {
          questionText,
          options,
          correctAnswer,
        }
      );

      // Update the exams list locally
      setExams((prevExams) =>
        prevExams.map((exam) =>
          exam._id === examId
            ? {
                ...exam,
                questions: exam.questions.map((q) =>
                  q._id === questionId ? response.data : q
                ),
              }
            : exam
        )
      );
      toast.success("Exam updated successfully");

      setShowModal(false); // Close modal
      setEditQuestion(null); // Reset state
    } catch (error) {
      console.error("Error saving changes:", error);
    }
  };

  // Delete the exam and its questions
  const handleDeleteExam = async (examId) => {
    try {
      const response = await axios.delete(`/api/exam/${examId}`);
      // Remove the deleted exam from the exams list
      setExams((prevExams) => prevExams.filter((exam) => exam._id !== examId));
      toast.success("Exam deleted successfully");
    } catch (error) {
      console.error("Error deleting exam:", error);
      toast.error("Failed to delete exam");
    }
  };

  if (loading) {
    return <p className="showExamsLoadingPara">Loading exams...</p>;
  }

  if (!exams || exams.length === 0) {
    return <p className="showExamsLoadingPara">No exams available !</p>;
  }

  return (
    <div className="showExamsBody">
      <h2 className="showExamsHead">Exams</h2>
      {exams.map((exam) => (
        <div key={exam._id} className="exam-container">
          <h3>{exam.examTitle}</h3>
          {exam.questions.map((question) => (
            <div key={question._id} className="question-container">
              <p>
                <strong>Q:</strong> {question.questionText}
              </p>
              <ul>
                {question.options.map((option, index) => (
                  <li key={index}>{option}</li>
                ))}
              </ul>
              <p>
                <strong>Correct Answer:</strong> {question.correctAnswer}
              </p>
              <button
                onClick={() => handleEditClick(question, exam._id)}
                className="edit-button"
              >
                Edit question
              </button>
            </div>
          ))}
          <button
            onClick={() => handleDeleteExam(exam._id)}
            className="delete-button"
          >
            Delete Exam
          </button>
        </div>
      ))}

      {/* Modal for editing a question */}
      {showModal && editQuestion && (
        <div className="modal">
          <div className="modal-content">
            <h3>Edit Question</h3>
            <label>
              Question:
              <input
                type="text"
                name="questionText"
                value={editQuestion.questionText}
                onChange={handleInputChange}
              />
            </label>
            <label>
              Options:
              {editQuestion.options.map((option, index) => (
                <input
                  key={index}
                  type="text"
                  value={option}
                  onChange={(e) => handleOptionChange(index, e.target.value)}
                />
              ))}
            </label>
            <label>
              Correct Answer:
              <select
                name="correctAnswer"
                value={editQuestion.correctAnswer}
                onChange={handleCorrectAnswerChange}
              >
                {editQuestion.options.map((option, index) => (
                  <option key={index} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </label>
            <div className="modal-actions">
              <button onClick={handleSaveChanges} className="save-button">
                Save
              </button>
              <button
                onClick={() => setShowModal(false)}
                className="cancel-button"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ShowExams;
