
import React, { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import "./css/addExam.css";
import { useNavigate } from "react-router-dom";

const AddExam = () => {
  const [questions, setQuestions] = useState([
    {
      questionText: "",
      options: ["", "", "", ""],
      correctAnswer: "",
    },
  ]);
  const [examTitle, setExamTitle] = useState("");
  const [instructorDetails, setInstructorDetails] = useState(null); // Store instructor details
  const navigate = useNavigate();

  // Fetch instructor details from localStorage
  useEffect(() => {
    const storedInstructor = localStorage.getItem("instructor");
    if (storedInstructor) {
      setInstructorDetails(JSON.parse(storedInstructor)); // Parse instructor details
    } else {
      toast.error("Instructor details not found. Please log in again.");
      navigate("/instructor-dashboard");
    }
  }, [navigate]);

  const handleQuestionChange = (index, field, value) => {
    setQuestions((prevQuestions) => {
      const updatedQuestions = [...prevQuestions];
      updatedQuestions[index][field] = value;
      return updatedQuestions;
    });
  };

  const addQuestion = () => {
    setQuestions((prevQuestions) => [
      ...prevQuestions,
      {
        questionText: "",
        options: ["", "", "", ""],
        correctAnswer: "",
      },
    ]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!examTitle.trim()) {
      return toast.error("Please provide an exam title.");
    }

    try {
      const response = await axios.post("/api/exam", {
        examTitle,
        questions,
        instructorId: instructorDetails?.id, // Use instructor ID from localStorage
        instructorName: instructorDetails?.name, // Use instructor name from localStorage
      });

      toast.success("Exam created successfully!");
      navigate("/instructor-dashboard");
      console.log("Response from server:", response.data);
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to create exam."
      );
      console.error("Error creating exam:", error);
    }
  };

  return (
    <div className="addExamContainer">
      <h2>Create Exam</h2>
      <form onSubmit={handleSubmit} className="addExamForm">
        <div className="addExamFormDiv">
          <label className="addExamFormLabel">Exam Title</label>
          <input
            type="text"
            placeholder="Enter exam title"
            value={examTitle}
            onChange={(e) => setExamTitle(e.target.value)}
            className="addExamFormInput"
          />
        </div>

        {questions.map((q, index) => (
          <div key={index} className="questionContainer">
            <div>
              <label>Question Text</label>
              <input
                type="text"
                placeholder="Enter question text"
                value={q.questionText}
                onChange={(e) =>
                  handleQuestionChange(index, "questionText", e.target.value)
                }
              />
            </div>
            <div className="answerContainer">
              <label>Options</label>
              {q.options.map((opt, optIndex) => (
                <input
                  key={optIndex}
                  type="text"
                  placeholder={`Option ${optIndex + 1}`}
                  value={opt}
                  onChange={(e) => {
                    const newOptions = [...q.options];
                    newOptions[optIndex] = e.target.value;
                    handleQuestionChange(index, "options", newOptions);
                  }}
                />
              ))}
            </div>
            <div>
              <label>Correct Answer</label>
              <select
                value={q.correctAnswer}
                onChange={(e) =>
                  handleQuestionChange(index, "correctAnswer", e.target.value)
                }
              >
                <option value="">Select Correct Answer</option>
                {q.options.map((opt, optIndex) => (
                  <option key={optIndex} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
            </div>
          </div>
        ))}

        <div className="addExamButtons">
          <button
            type="button"
            onClick={addQuestion}
            className="addExamButtonsAdd"
          >
            Add Question
          </button>
          <button type="submit" className="addExamButtonsSubmit">
            Submit Exam
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddExam;
