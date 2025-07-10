// src/pages/QuizPage.jsx
import React, { useState } from 'react';
import { quizQuestions } from '../data/quizQuestions';

function QuizPage({ onQuizComplete }) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [answerStatus, setAnswerStatus] = useState(null);

  const handleAnswerOptionClick = (selectedOption) => {
    if (answerStatus) return;
    setSelectedAnswer(selectedOption);
    const isCorrect = selectedOption === quizQuestions[currentQuestionIndex].correctAnswer;
    setAnswerStatus(isCorrect ? 'correct' : 'incorrect');
    if (isCorrect) setScore(score + 1);
    setTimeout(() => {
      const nextQuestionIndex = currentQuestionIndex + 1;
      if (nextQuestionIndex < quizQuestions.length) {
        setCurrentQuestionIndex(nextQuestionIndex);
        setSelectedAnswer(null);
        setAnswerStatus(null);
      } else {
        setShowScore(true);
      }
    }, 1200);
  };

  const getButtonClassName = (option) => {
    const baseClass = "w-full text-left p-4 rounded-lg border transition-all duration-300 font-medium";
    if (!answerStatus) {
      return `${baseClass} border-brand-secondary text-brand-text hover:bg-brand-primary-light/20 hover:border-brand-primary`;
    }
    const isThisButtonTheSelectedOne = option === selectedAnswer;
    if (isThisButtonTheSelectedOne) {
      return answerStatus === 'correct' ? `${baseClass} bg-brand-correct border-brand-correct text-white` : `${baseClass} bg-brand-incorrect border-brand-incorrect text-white`;
    }
    return `${baseClass} border-brand-secondary/50 text-brand-text/50 cursor-not-allowed`;
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-brand-background">
      <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-2xl">
        {showScore ? (
          <div className="text-center">
            <h2 className="text-3xl font-bold text-brand-text mb-2">Kuis Selesai!</h2>
            <p className="text-lg text-brand-text/70 mb-6">
              Skor Akhir: <span className="font-bold text-brand-primary">{score}</span> dari {quizQuestions.length}
            </p>
            <button
              onClick={onQuizComplete}
              className="w-full py-3 px-4 bg-brand-primary rounded-lg font-bold text-white hover:bg-brand-primary-light transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              Lanjutkan Petualangan ✨
            </button>
          </div>
        ) : (
          <>
            <p className="font-semibold text-brand-primary mb-2">
              Pertanyaan {currentQuestionIndex + 1}/{quizQuestions.length}
            </p>
            <h2 className="text-2xl md:text-3xl font-bold text-brand-text mb-8">
              {quizQuestions[currentQuestionIndex].question}
            </h2>
            <div className="flex flex-col space-y-4">
              {quizQuestions[currentQuestionIndex].options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswerOptionClick(option)}
                  className={getButtonClassName(option)}
                  disabled={!!answerStatus}
                >
                  {option}
                </button>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
export default QuizPage;