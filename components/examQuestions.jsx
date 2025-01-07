
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./css/examQuestions.css";

const ExamQuestions = () => {
  const { id } = useParams();
  const [exam, setExam] = useState(null);
  const [timer, setTimer] = useState(900); // 15 minutes in seconds
  const [isExamStarted, setIsExamStarted] = useState(false);
  const [isExamFinished, setIsExamFinished] = useState(false);
  const [answers, setAnswers] = useState([]);
  const [score, setScore] = useState(0);
  const [intervalId, setIntervalId] = useState(null);
  const studentId = localStorage.getItem("Student_ID");
  const studentName = localStorage.getItem("Student_Name");

  useEffect(() => {
    const fetchExamQuestions = async () => {
      try {
        const response = await axios.get(`/api/exam/${id}`);
        setExam(response.data);
      } catch (error) {
        console.error("Error fetching exam questions:", error);
      }
    };

    fetchExamQuestions();

    return () => {
      if (intervalId) clearInterval(intervalId); // Clean up interval on component unmount
    };
  }, [id, intervalId]);

  const formatTime = (timeInSeconds) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  const handleAnswerChange = (questionIndex, selectedOption) => {
    setAnswers((prevAnswers) => {
      const updatedAnswers = [...prevAnswers];
      updatedAnswers[questionIndex] = selectedOption;
      return updatedAnswers;
    });
  };

  const handleSubmit = async () => {
    // Stop the timer when exam is submitted
    clearInterval(intervalId);
    let totalScore = 0;

    exam.questions.forEach((question, index) => {
      if (answers[index] === question.correctAnswer) {
        totalScore += 1;
      }
    });

    setScore(totalScore);
    setIsExamFinished(true); // Show the results after submission

    // Save student's score to the database
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

    // Start the timer countdown logic
    const newIntervalId = setInterval(() => {
      if (timer > 0) {
        setTimer((prevTimer) => prevTimer - 1);
      } else {
        clearInterval(newIntervalId); // Clear the interval when time is up
        setIsExamFinished(true);
      }
    }, 1000); // Interval should decrement every second

    setIntervalId(newIntervalId); // Store interval ID for cleanup
  };

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
