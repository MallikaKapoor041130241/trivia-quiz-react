import React, { useState, useEffect } from 'react';

const Trivia = () => {
  // State to store quiz data, loading state, and error state
  const [quizData, setQuizData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // useEffect hook to fetch data from the API when the component mounts
  useEffect(() => {
    const fetchQuizData = async () => {
      try {
        // Fetch trivia data from the provided API URL
        const response = await fetch('https://opentdb.com/api.php?amount=10&category=11&type=multiple');
        
        // If the response is not ok, throw an error
        if (!response.ok) {
          throw new Error('Failed to fetch trivia data');
        }

        // Parse the response to JSON
        const data = await response.json();

        // Set quiz data to the state
        setQuizData(data.results);
        setLoading(false); // Set loading to false after data is fetched
      } catch (error) {
        // Set error state if something went wrong
        setError(error);
        setLoading(false); // Set loading to false even in case of an error
      }
    };

    fetchQuizData(); // Fetch the quiz data when the component mounts
  }, []); // Empty dependency array ensures this only runs once on mount

  // Display loading message or error if something went wrong
  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error fetching data: {error.message}</div>;
  }

  // Render the trivia questions once data is fetched
  return (
    <div>
      <h1>Trivia Quiz</h1>
      <ul>
        {quizData.map((question, index) => (
          <li key={index}>
            <h3>{question.question}</h3>
            <ul>
              {question.incorrect_answers.concat(question.correct_answer).map((answer, i) => (
                <li key={i}>{answer}</li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Trivia;
