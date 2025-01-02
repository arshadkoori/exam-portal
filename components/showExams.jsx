// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import "./css/ShowExams.css"

// const ShowExams = () => {
//   const [exams, setExams] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchExams = async () => {
//       try {
//         const response = await axios.get("/api/exam");
//         setExams(response.data);
//         setLoading(false);
//       } catch (error) {
//         console.error("Error fetching exams:", error);
//         setLoading(false);
//       }
//     };

//     fetchExams();
//   }, []);

//   if (loading) {
//     return <p>Loading exams...</p>;
//   }

//   return (
//     <div>
//       <h2>Exams</h2>
//       {exams.length === 0 ? (
//         <p>No exams available</p>
//       ) : (
//         exams.map((exam, examIndex) => (
//           <div key={examIndex} className="exam-container">
//             {/* <h2>{question.examTitle}</h2> */}
//             <h3>Exam {examIndex + 1}</h3>
//             {exam.questions.map((question, questionIndex) => (
//               <div key={questionIndex} className="question-container">
//                 {/* <h2>{question.examTitle}</h2> */}
//                 <p>
//                   <strong>Q{questionIndex + 1}:</strong> {question.questionText}
//                 </p>
//                 <ul>
//                   {question.options.map((option, optionIndex) => (
//                     <li key={optionIndex}>{option}</li>
//                   ))}
//                 </ul>
//                 <p>
//                   <strong>Correct Answer:</strong> {question.correctAnswer}
//                 </p>
//               </div>
//             ))}
//           </div>
//         ))
//       )}
//     </div>
//   );
// };

// export default ShowExams;


import React, { useEffect, useState } from "react";
import axios from "axios";
import "./css/ShowExams.css";

const ShowExams = () => {
  const [exams, setExams] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch exams from the backend
  useEffect(() => {
    const fetchExams = async () => {
      try {
        const response = await axios.get("/api/exam");
        setExams(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching exams:", error);
        setLoading(false);
      }
    };

    fetchExams();
  }, []);

  if (loading) {
    return <p>Loading exams...</p>;
  }

  return (
    <div>
      <h2>Exams</h2>
      {exams.length === 0 ? (
        <p>No exams available</p>
      ) : (
        exams.map((exam, examIndex) => (
          <div key={examIndex} className="exam-container">
            <h3>Exam {examIndex + 1}</h3>
            <h4>{exam.examTitle}</h4>
            {exam.questions.map((question, questionIndex) => (
              <div key={questionIndex} className="question-container">
                <p>
                  <strong>Q{questionIndex + 1}:</strong> {question.questionText}
                </p>
                <ul>
                  {question.options.map((option, optionIndex) => (
                    <li key={optionIndex}>{option}</li>
                  ))}
                </ul>
                <p>
                  <strong>Correct Answer:</strong> {question.correctAnswer}
                </p>
              </div>
            ))}
          </div>
        ))
      )}
    </div>
  );
};

export default ShowExams;
