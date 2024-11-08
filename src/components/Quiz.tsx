import React, { useState } from 'react';
import './Quiz.css';
import QuizQuestion from '../core/QuizQuestion';
import QuizCore from '../core/QuizCore'; // Import QuizCore to manage quiz logic

// Hint: Take advantage of the QuizQuestion interface

// Interface for component state is no longer needed since QuizCore handles most of the state
// However, we'll keep track of selectedAnswer and quiz completion status
interface QuizState {
  selectedAnswer: string | null;
  quizCompleted: boolean;
}

const Quiz: React.FC = () => {
  // TODO: Task1 - Separate the logic of quiz from the UI.
  // Hint: Take advantage of QuizCore to manage quiz state separately from the UI.

  const [quizCore] = useState(new QuizCore()); // Initialize QuizCore instance
  const [state, setState] = useState<QuizState>({
    selectedAnswer: null, // Initialize the selected answer.
    quizCompleted: false,  // Initialize quiz completion status.
  });

  // Handle option selection
  const handleOptionSelect = (option: string): void => {
    setState((prevState) => ({ ...prevState, selectedAnswer: option }));
  };

  // Handle button click for "Next Question" and "Submit"
  const handleButtonClick = (): void => {
    // TODO: Task3 - Implement the logic for button click ("Next Question" and "Submit").
    // Hint: You might want to check for a function in the core logic to help with this.
    const { selectedAnswer } = state;

    if (selectedAnswer) {
      // Record the user's answer and update the score
      quizCore.answerQuestion(selectedAnswer);

      if (quizCore.hasNextQuestion()) {
        // Move to the next question
        quizCore.nextQuestion();
        // Reset the selected answer
        setState((prevState) => ({ ...prevState, selectedAnswer: null }));
      } else {
        // Quiz is completed
        setState((prevState) => ({ ...prevState, quizCompleted: true }));
      }
    } else {
      alert('Please select an answer before proceeding.');
    }
  };

  // Get current question and score from QuizCore
  const currentQuestion = quizCore.getCurrentQuestion();
  const score = quizCore.getScore();
  const totalQuestions = quizCore.getTotalQuestions();
  const { selectedAnswer, quizCompleted } = state;

  // If quiz is completed, display the final score
  if (quizCompleted) {
    return (
      <div>
        <h2>Quiz Completed</h2>
        <p>
          Final Score: {score} out of {totalQuestions}
        </p>
      </div>
    );
  }

  // If no current question is available, display a loading message
  if (!currentQuestion) {
    return (
      <div>
        <h2>Loading...</h2>
      </div>
    );
  }

  return (
    <div>
      <h2>Quiz Question:</h2>
      <p>{currentQuestion.question}</p>

      <h3>Answer Options:</h3>
      <ul>
        {currentQuestion.options.map((option) => (
          <li
            key={option}
            onClick={() => handleOptionSelect(option)}
            // Task 2: Add className attribute for highlighting selected answer
            className={`option ${selectedAnswer === option ? 'selected' : ''}`}
          >
            {option}
          </li>
        ))}
      </ul>

      {/* Remove direct display of selected answer to enhance user experience */}
      {/* <h3>Selected Answer:</h3>
      <p>{selectedAnswer ?? 'No answer selected'}</p> */}

      {/* Change button label based on whether there is a next question */}
      <button onClick={handleButtonClick}>
        {quizCore.hasNextQuestion() ? 'Next Question' : 'Submit'}
      </button>
    </div>
  );
};

export default Quiz;
