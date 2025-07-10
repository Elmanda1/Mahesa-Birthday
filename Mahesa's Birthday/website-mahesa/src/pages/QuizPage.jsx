// src/pages/QuizPage.jsx
import React, { useState } from 'react';
import { quizQuestions } from '../data/quizQuestions';

// TAMBAHKAN prop 'onQuizComplete'
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
    if (isCorrect) {
      setScore(score + 1);
    }
    setTimeout(() => {
      const nextQuestionIndex = currentQuestionIndex + 1;
      if (nextQuestionIndex < quizQuestions.length) {
        setCurrentQuestionIndex(nextQuestionIndex);
        setSelectedAnswer(null);
        setAnswerStatus(null);
      } else {
        setShowScore(true);
      }
    }, 1000);
  };

  // Fungsi restart tidak kita butuhkan lagi untuk alur utama,
  // tapi bisa disimpan jika ingin ada fitur "coba lagi" di masa depan.

  const getButtonClassName = (option) => {
    const baseClass = "w-full py-3 px-4 rounded-lg font-semibold transition-all duration-300";
    if (!answerStatus) {
      return `${baseClass} bg-white/20 text-white hover:bg-cyan-400/50`;
    }
    const isThisButtonTheSelectedOne = option === selectedAnswer;
    if (isThisButtonTheSelectedOne) {
      return answerStatus === 'correct' ? `${baseClass} bg-green-500 text-white` : `${baseClass} bg-red-500 text-white`;
    }
    return `${baseClass} bg-white/10 text-white/50 cursor-not-allowed`;
  };

  return (
    <div className="bg-gradient-to-br from-slate-900 to-slate-700 min-h-screen flex flex-col items-center justify-center p-4 text-white">
      <div className="bg-white/10 backdrop-blur-md rounded-xl shadow-2xl p-8 w-full max-w-md text-center">
        {showScore ? (
          <div>
            <h2 className="text-3xl font-bold text-white mb-2">Kuis Selesai!</h2>
            <p className="text-lg text-cyan-300 mb-6">
              Skor Kamu: {score} dari {quizQuestions.length}
            </p>
            {/* TOMBOL BARU UNTUK MELANJUTKAN */}
            <button
              onClick={onQuizComplete} // Saat diklik, panggil fungsi dari App.jsx
              className="w-full py-3 px-4 bg-green-500 rounded-lg font-semibold text-white hover:bg-green-600 transition-all duration-200"
            >
              Buka Kenangan ✨
            </button>
          </div>
        ) : (
          <>
            <p className="text-sm font-semibold text-cyan-300 mb-2">
              Pertanyaan {currentQuestionIndex + 1} dari {quizQuestions.length}
            </p>
            <h2 className="text-2xl font-bold text-white mb-6">
              {quizQuestions[currentQuestionIndex].question}
            </h2>
            <div className="flex flex-col space-y-3">
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