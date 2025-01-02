
import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

import "./css/addExam.css";

const AddExam = () => {
  const [questions, setQuestions] = useState([
    {
      questionText: "",
      options: ["", "", "", ""],
      correctAnswer: "",
    },
  ]);

  const [examTitle, setExamTitle] = useState("");

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
      });
      toast.success("Exam created successfully!");
      console.log("Response from server:", response.data);
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to create exam."
      );
      console.error("Error creating exam:", error);
    }
  };

  return (
    <div>
      <h2>Create Exam</h2>
      <form onSubmit={handleSubmit} className="addExamForm">
        <div className="addExamFormDiv">
          <label className="addExamForm">Exam Title</label>
          <input
            type="text"
            placeholder="Enter exam title"
            value={examTitle}
            onChange={(e) => setExamTitle(e.target.value)}
            className="addExamFormTitle"
          />
        </div>

        {questions.map((q, index) => (
          <div key={index} className="question-container">
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
            <div>
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
          <button type="button" onClick={addQuestion} className="addExamButtonsSubmit">
            Add Question
          </button>
          <button type="submit" className="addExamButtonsSubmit">Submit Exam</button>
        </div>
      </form>
    </div>
  );
};

export default AddExam;
