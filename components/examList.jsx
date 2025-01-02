import React, { useState, useEffect } from "react";
import axios from "axios";

export default function ExamList () {
  const [exams, setExams] = useState([]);

  useEffect(() => {
    const fetchExams = async () => {
      try {
        const response = await axios.get("/api/exams");
        setExams(response.data);
      } catch (error) {
        console.error("Error fetching exams:", error);
      }
    };
    fetchExams();
  }, []);

  return (
    <div>
      <h2>List of Exams</h2>
      <ul>
        {exams.map((exam, index) => (
          <li key={index}>
            <h3>Exam {index + 1}</h3>
            <ul>
              {exam.questions.map((question, qIndex) => (
                <li key={qIndex}>
                  <p>Question: {question.questionText}</p>
                  <ul>
                    {question.options.map((option, oIndex) => (
                      <li key={oIndex}>{option}</li>
                    ))}
                  </ul>
                  <p>Correct Answer: {question.correctAnswer}</p>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
};

// export default ExamList;
