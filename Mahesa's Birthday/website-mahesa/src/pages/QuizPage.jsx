import React, { useState, useEffect } from 'react';
import { quizQuestions } from '../data/quizQuestions';

function QuizPage({ onQuizComplete }) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [answerStatus, setAnswerStatus] = useState(null);
  const [showChatPage, setShowChatPage] = useState(false);
  const [completedChats, setCompletedChats] = useState([]);
  const [currentChatIndex, setCurrentChatIndex] = useState(0);
  const [typingText, setTypingText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [showTypingIndicator, setShowTypingIndicator] = useState(false);

  // Fixed chat animation logic - messages stay visible after typing
  useEffect(() => {
    if (showChatPage && currentChatIndex < quizQuestions[currentQuestionIndex].chatMemory.length) {
      const currentChat = quizQuestions[currentQuestionIndex].chatMemory[currentChatIndex];
      
      if (currentChat.sender === 'you') {
        // For "you" messages (pink), show typing animation immediately
        setIsTyping(true);
        setTypingText('');
        
        let index = 0;
        const typeInterval = setInterval(() => {
          if (index < currentChat.message.length) {
            setTypingText(currentChat.message.substring(0, index + 1));
            index++;
          } else {
            clearInterval(typeInterval);
            setIsTyping(false);
            
            // Add completed chat to the list and move to next
            setCompletedChats(prev => [...prev, currentChat]);
            setCurrentChatIndex(prev => prev + 1);
            setTypingText('');
          }
        }, 60);
        
        return () => clearInterval(typeInterval);
      } else {
        // For "me" (Mahesa) messages, show typing indicator first, then typing animation
        setShowTypingIndicator(true);
        
        setTimeout(() => {
          setShowTypingIndicator(false);
          setIsTyping(true);
          setTypingText('');
          
          let index = 0;
          const typeInterval = setInterval(() => {
            if (index < currentChat.message.length) {
              setTypingText(currentChat.message.substring(0, index + 1));
              index++;
            } else {
              clearInterval(typeInterval);
              setIsTyping(false);
              
              // Add completed chat to the list and move to next
              setCompletedChats(prev => [...prev, currentChat]);
              setCurrentChatIndex(prev => prev + 1);
              setTypingText('');
            }
          }, 60);
          
          return () => clearInterval(typeInterval);
        }, 1200);
      }
    }
  }, [showChatPage, currentChatIndex, currentQuestionIndex]);

  const handleAnswerOptionClick = (selectedOption) => {
    if (answerStatus) return;
    setSelectedAnswer(selectedOption);
    const isCorrect = selectedOption === quizQuestions[currentQuestionIndex].correctAnswer;
    setAnswerStatus(isCorrect ? 'correct' : 'incorrect');
    if (isCorrect) setScore(score + 1);
    
    // Go to chat page after 1.5 seconds
    setTimeout(() => {
      setShowChatPage(true);
      setCompletedChats([]);
      setCurrentChatIndex(0);
      setTypingText('');
      setShowTypingIndicator(false);
      setIsTyping(false);
    }, 1500);
  };

  const handleNextQuestion = () => {
    const nextQuestionIndex = currentQuestionIndex + 1;
    if (nextQuestionIndex < quizQuestions.length) {
      setCurrentQuestionIndex(nextQuestionIndex);
      setSelectedAnswer(null);
      setAnswerStatus(null);
      setShowChatPage(false);
      setCompletedChats([]);
      setCurrentChatIndex(0);
      setTypingText('');
      setShowTypingIndicator(false);
      setIsTyping(false);
    } else {
      setShowScore(true);
      setShowChatPage(false);
    }
  };

  const getButtonClassName = (option) => {
    const baseClass = "w-full text-left p-4 rounded-lg border transition-all duration-300 font-medium";
    if (!answerStatus) {
      return `${baseClass} border-brand-secondary text-brand-text hover:bg-brand-primary-light/20 hover:border-brand-primary hover:shadow-md transform hover:scale-[1.02]`;
    }
    const isThisButtonTheSelectedOne = option === selectedAnswer;
    if (isThisButtonTheSelectedOne) {
      return answerStatus === 'correct' 
        ? `${baseClass} bg-brand-correct border-brand-correct text-white shadow-lg transform scale-[1.02]` 
        : `${baseClass} bg-brand-incorrect border-brand-incorrect text-white shadow-lg transform scale-[1.02]`;
    }
    return `${baseClass} border-brand-secondary/50 text-brand-text/50 cursor-not-allowed opacity-60`;
  };

  const currentQuestion = quizQuestions[currentQuestionIndex];

  return (
    <div className="min-h-screen bg-brand-background relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 left-10 w-20 h-20 bg-brand-primary/20 rounded-full opacity-20 animate-pulse"></div>
        <div className="absolute top-32 right-20 w-16 h-16 bg-brand-primary-light/20 rounded-full opacity-20 animate-pulse" style={{animationDelay: '1s'}}></div>
        <div className="absolute bottom-20 left-32 w-24 h-24 bg-brand-primary/10 rounded-full opacity-20 animate-pulse" style={{animationDelay: '2s'}}></div>
        <div className="absolute bottom-40 right-10 w-12 h-12 bg-brand-primary-light/20 rounded-full opacity-20 animate-pulse" style={{animationDelay: '0.5s'}}></div>
      </div>

      {/* Chat Page */}
      {showChatPage && (
        <div className="absolute inset-0 bg-gradient-to-br from-purple-100 via-pink-50 to-blue-100 flex flex-col animate-slide-in">
          {/* Enhanced Header */}
          <div className="bg-white/90 backdrop-blur-sm shadow-lg p-4 flex items-center justify-between border-b border-gray-200">
            <div className="flex items-center space-x-3">
              <div className="relative">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center shadow-lg">
                  <span className="text-white font-bold text-lg">M</span>
                </div>
                <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
              </div>
              <div>
                <h3 className="font-bold text-gray-800 text-lg">Mahesa</h3>
                <p className="text-sm text-green-600 font-medium">● online</p>
              </div>
            </div>
            <div className="text-center bg-gradient-to-r from-brand-primary/10 to-brand-primary-light/10 px-4 py-2 rounded-full border border-brand-primary/20">
              <p className="text-sm font-bold text-brand-text">
                {answerStatus === 'correct' ? '✅ Benar!' : '❌ Salah!'}
              </p>
              {answerStatus === 'incorrect' && (
                <p className="text-xs text-brand-text/70 mt-1">
                  Jawaban: {quizQuestions[currentQuestionIndex].correctAnswer}
                </p>
              )}
            </div>
          </div>

          {/* Enhanced Chat Area */}
          <div className="flex-1 p-6 space-y-4 overflow-y-auto">
            {/* Show all completed chats - these stay visible permanently */}
            {completedChats.map((chat, index) => (
              <div 
                key={`completed-${index}`}
                className={`flex ${chat.sender === 'me' ? 'justify-start' : 'justify-end'} animate-chat-appear-permanent`}
              >
                <div className={`max-w-xs px-5 py-3 rounded-2xl shadow-lg ${
                  chat.sender === 'me' 
                    ? 'bg-white text-brand-text rounded-bl-md border border-brand-secondary' 
                    : 'bg-gradient-to-r from-brand-primary to-brand-primary-light text-white rounded-br-md'
                }`}>
                  <p className="text-sm leading-relaxed font-medium">{chat.message}</p>
                  <p className="text-xs opacity-70 mt-2 text-right font-medium">{chat.time}</p>
                </div>
              </div>
            ))}
            
            {/* Typing indicator - only show for Mahesa */}
            {showTypingIndicator && (
              <div className="flex justify-start animate-chat-appear">
                <div className="bg-white text-brand-text rounded-2xl rounded-bl-md border border-gray-200 px-5 py-3 shadow-lg">
                  <div className="flex items-center space-x-2">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-brand-text/60 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-brand-text/60 rounded-full animate-bounce" style={{animationDelay: '5.0s'}}></div>
                      <div className="w-2 h-2 bg-brand-text/60 rounded-full animate-bounce" style={{animationDelay: '5.0s'}}></div>
                    </div>
                    <span className="text-xs text-brand-text/70">Mahesa sedang mengetik...</span>
                  </div>
                </div>
              </div>
            )}
            
            {/* Currently typing chat - this will become permanent after typing finishes */}
            {isTyping && currentChatIndex < quizQuestions[currentQuestionIndex].chatMemory.length && (
              <div className={`flex ${quizQuestions[currentQuestionIndex].chatMemory[currentChatIndex].sender === 'me' ? 'justify-start' : 'justify-end'} animate-chat-appear`}>
                <div className={`max-w-xs px-5 py-3 rounded-2xl shadow-lg ${
                  quizQuestions[currentQuestionIndex].chatMemory[currentChatIndex].sender === 'me' 
                    ? 'bg-white text-brand-text rounded-bl-md border border-brand-secondary' 
                    : 'bg-gradient-to-r from-brand-primary to-brand-primary-light text-white rounded-br-md'
                }`}>
                  <p className="text-sm leading-relaxed font-medium">
                    {typingText}
                    <span className="animate-pulse text-brand-primary-light font-bold">|</span>
                  </p>
                  <p className="text-xs opacity-70 mt-2 text-right font-medium">
                    {quizQuestions[currentQuestionIndex].chatMemory[currentChatIndex].time}
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Enhanced Memory Context */}
          <div className="p-6 bg-white/90 backdrop-blur-sm border-t border-gray-200">
            <div className="bg-gradient-to-r from-brand-primary/10 to-brand-primary-light/10 rounded-2xl p-5 border border-brand-primary/20 mb-4 shadow-lg">
              <p className="text-sm text-brand-text font-bold text-center leading-relaxed">
                💭 {quizQuestions[currentQuestionIndex].memoryContext}
              </p>
            </div>
            
            {/* Enhanced Continue Button */}
            {currentChatIndex >= quizQuestions[currentQuestionIndex].chatMemory.length && (
              <button
                onClick={handleNextQuestion}
                className="w-full py-4 px-6 bg-gradient-to-r from-brand-primary to-brand-primary-light rounded-2xl font-bold text-white hover:shadow-xl transition-all duration-300 transform hover:scale-105 animate-fade-in-up text-lg"
              >
                {currentQuestionIndex + 1 < quizQuestions.length ? '➡️ Lanjut ke Pertanyaan Berikutnya' : '🎉 Lihat Hasil'}
              </button>
            )}
          </div>
        </div>
      )}

      {/* Enhanced Main Quiz Content */}
      <div className={`min-h-screen flex items-center justify-center p-4 transition-all duration-700 ${showChatPage ? 'opacity-0 pointer-events-none scale-95' : 'opacity-100 scale-100'}`}>
        <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl p-8 w-full max-w-2xl border border-white/20">
          {showScore ? (
            <div className="text-center animate-fade-in-up">
              <div className="text-6xl mb-4">🎉</div>
              <h2 className="text-4xl font-bold text-brand-text mb-3">Kuis Selesai!</h2>
              <div className="text-xl text-brand-text/70 mb-8">
                Skor Akhir: <span className="font-bold text-brand-primary text-2xl">{score}</span> dari {quizQuestions.length}
              </div>
              <button
                onClick={onQuizComplete}
                className="w-full py-4 px-6 bg-gradient-to-r from-brand-primary to-brand-primary-light rounded-2xl font-bold text-white hover:shadow-xl transition-all duration-300 transform hover:scale-105 text-lg"
              >
                ✨ Lanjutkan Petualangan ✨
              </button>
            </div>
          ) : (
            <div className="animate-fade-in-up">
              <div className="flex items-center justify-between mb-6">
                <p className="font-bold text-brand-primary text-lg">
                  Pertanyaan {currentQuestionIndex + 1}/{quizQuestions.length}
                </p>
                <div className="flex space-x-2">
                  {Array.from({ length: quizQuestions.length }, (_, i) => (
                    <div
                      key={i}
                      className={`w-3 h-3 rounded-full transition-all duration-300 ${
                        i === currentQuestionIndex
                          ? 'bg-brand-primary scale-125'
                          : i < currentQuestionIndex
                          ? 'bg-brand-correct'
                          : 'bg-brand-secondary/50'
                      }`}
                    />
                  ))}
                </div>
              </div>
              
              <h2 className="text-3xl md:text-4xl font-bold text-brand-text mb-10 leading-tight">
                {quizQuestions[currentQuestionIndex].question}
              </h2>
              
              <div className="flex flex-col space-y-4">
                {quizQuestions[currentQuestionIndex].options.map((option, index) => (
                  <button
                    key={index}
                    onClick={() => handleAnswerOptionClick(option)}
                    className={getButtonClassName(option)}
                    disabled={!!answerStatus}
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <span className="text-lg font-medium">{option}</span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
      
      {/* Enhanced Custom Styles */}
      <style jsx>{`
        @keyframes slide-in {
          0% {
            transform: translateX(100%);
            opacity: 0;
          }
          100% {
            transform: translateX(0);
            opacity: 1;
          }
        }
        
        @keyframes chat-appear {
          0% {
            transform: translateY(20px) scale(0.8);
            opacity: 0;
          }
          100% {
            transform: translateY(0) scale(1);
            opacity: 1;
          }
        }
        
        @keyframes chat-appear-permanent {
          0% {
            transform: translateY(20px) scale(0.8);
            opacity: 0;
          }
          100% {
            transform: translateY(0) scale(1);
            opacity: 1;
          }
        }
        
        @keyframes fade-in-up {
          0% {
            transform: translateY(30px);
            opacity: 0;
          }
          100% {
            transform: translateY(0);
            opacity: 1;
          }
        }
        
        .animate-slide-in {
          animation: slide-in 0.5s ease-out;
        }
        
        .animate-chat-appear {
          animation: chat-appear 0.6s ease-out forwards;
          opacity: 0;
        }
        
        .animate-chat-appear-permanent {
          animation: chat-appear-permanent 0.6s ease-out forwards;
          opacity: 1;
        }
        
        .animate-fade-in-up {
          animation: fade-in-up 0.8s ease-out;
        }
      `}</style>
    </div>
  );
}

export default QuizPage;