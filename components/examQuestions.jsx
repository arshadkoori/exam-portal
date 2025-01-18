
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./css/examQuestions.css";
import toast from "react-hot-toast";

const ExamQuestions = () => {
  const { id } = useParams();
  const [exam, setExam] = useState(null);
  const [timer, setTimer] = useState(900);
  const [isExamStarted, setIsExamStarted] = useState(false);
  const [isExamFinished, setIsExamFinished] = useState(false);
  const [answers, setAnswers] = useState([]);
  const [score, setScore] = useState(0);
  const [intervalId, setIntervalId] = useState(null);
  const [passwordInput, setPasswordInput] = useState("");
  const [isPasswordVerified, setIsPasswordVerified] = useState(false);
  const studentId = localStorage.getItem("Student_ID");
  const studentName = localStorage.getItem("Student_Name");

  useEffect(() => {
    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [intervalId]);

  const formatTime = (timeInSeconds) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  const handlePasswordSubmit = async () => {
    try {
      const response = await axios.get(`/api/exam/${id}`, {
        params: { password: passwordInput },
      });

      setExam(response.data);
      setIsPasswordVerified(true);
      toast.success("success")
    } catch (error) {
      if (error.response && error.response.status === 401) {
        toast.error("Invalid password. Please try again.");
      } else {
        console.error("Error verifying password:", error);
      }
    }
  };

  const handleAnswerChange = (questionIndex, selectedOption) => {
    setAnswers((prevAnswers) => {
      const updatedAnswers = [...prevAnswers];
      updatedAnswers[questionIndex] = selectedOption;
      return updatedAnswers;
    });
  };

  const handleSubmit = async () => {
    clearInterval(intervalId); // Stop the timer when the exam is submitted
    let totalScore = 0;

    exam.questions.forEach((question, index) => {
      if (answers[index] === question.correctAnswer) {
        totalScore += 1;
      }
    });

    setScore(totalScore);
    setIsExamFinished(true); // Show the results after submission

    // Save the student's score to the database
    try {
      await axios.post("/api/saveMarks", {
        studentId,
        studentName,
        examId: id,
        score: totalScore,
      });
    } catch (error) {
      console.error("Error saving marks:", error);
    }
  };

  const startExam = () => {
    setIsExamStarted(true);

    const newIntervalId = setInterval(() => {
      setTimer((prevTimer) => {
        if (prevTimer <= 1) {
          clearInterval(newIntervalId);
          setIsExamFinished(true); // End the exam when the timer reaches 0
          return 0;
        }
        return prevTimer - 1;
      });
    }, 1000);

    setIntervalId(newIntervalId);
  };

  if (!isPasswordVerified) {
    return (
      <div className="password-section">
        <h3>Enter Exam Password</h3>
        <input
          type="passowrd"
          className="password-input"
          value={passwordInput}
          onChange={(e) => setPasswordInput(e.target.value)}
          placeholder="Enter 10-digit password"
        />
        <button
          onClick={handlePasswordSubmit}
          className="password-submit-button"
        >
          Verify Password
        </button>
      </div>
    );
  }

  if (!exam) {
    return <p>Loading questions...</p>;
  }

  return (
    <div className="exam-questions-container">
      <h2 className="exam-title-head">{exam.examTitle}</h2>

      {!isExamStarted && (
        <div className="start-exam-button-container">
          <button onClick={startExam} className="start-exam-button">
            Start Exam
          </button>
        </div>
      )}

      {isExamStarted && (
        <>
          <div className="timer-container">
            <p className="timer">Time Remaining: {formatTime(timer)}</p>
          </div>

          {exam.questions.map((question, index) => (
            <div key={index} className="question-container">
              <p>
                <strong>Q{index + 1}:</strong> {question.questionText}
              </p>
              <ul className="options-list">
                {question.options.map((option, optionIndex) => (
                  <li
                    key={optionIndex}
                    className="option-item"
                    onClick={() => handleAnswerChange(index, option)}
                    style={{
                      backgroundColor:
                        answers[index] === option ? "#d4edda" : "",
                      cursor: "pointer",
                    }}
                  >
                    {option}
                  </li>
                ))}
              </ul>

              {isExamFinished && (
                <p className="correct-answer">
                  <strong>Correct Answer:</strong> {question.correctAnswer}
                </p>
              )}
            </div>
          ))}

          {!isExamFinished && (
            <div className="submit-button-container">
              <button onClick={handleSubmit} className="submit-button">
                Submit Exam
              </button>
            </div>
          )}
        </>
      )}

      {isExamFinished && (
        <div className="exam-results">
          <h3>Exam Finished</h3>
          <p>
            <strong>Your Score:</strong> {score} / {exam.questions.length}
          </p>
          {exam.questions.map((question, index) => (
            <div key={index} className="exam-result-item">
              <p>
                <strong>Q{index + 1}:</strong> {question.questionText}
              </p>
              <p>
                <strong>Your Answer:</strong> {answers[index]}
              </p>
              <p>
                <strong>Correct Answer:</strong> {question.correctAnswer}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ExamQuestions;
