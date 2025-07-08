import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import './App.css';

// Progress Hook untuk tracking user journey
const useProgress = () => {
  const [completedSteps, setCompletedSteps] = useState(() => {
    const saved = localStorage.getItem('birthday-progress');
    return saved ? JSON.parse(saved) : [];
  });
  
  const [quizScore, setQuizScore] = useState(() => {
    const saved = localStorage.getItem('quiz-score');
    return saved ? parseInt(saved) : 0;
  });

  useEffect(() => {
    localStorage.setItem('birthday-progress', JSON.stringify(completedSteps));
  }, [completedSteps]);

  useEffect(() => {
    localStorage.setItem('quiz-score', quizScore.toString());
  }, [quizScore]);

  const completeStep = (stepId, score = null) => {
    if (!completedSteps.includes(stepId)) {
      setCompletedSteps(prev => [...prev, stepId]);
    }
    if (score !== null) {
      setQuizScore(score);
    }
  };

  const canAccessStep = (stepId) => {
    const stepOrder = ['quiz', 'welcome', 'celebration', 'memory', 'dashboard'];
    const stepIndex = stepOrder.indexOf(stepId);
    
    if (stepIndex === 0) return true; // Quiz selalu bisa diakses
    
    const previousStep = stepOrder[stepIndex - 1];
    return completedSteps.includes(previousStep);
  };

  const resetProgress = () => {
    setCompletedSteps([]);
    setQuizScore(0);
    localStorage.removeItem('birthday-progress');
    localStorage.removeItem('quiz-score');
  };

  return { completedSteps, quizScore, completeStep, canAccessStep, resetProgress };
};

// Entry Quiz Component
const EntryQuiz = () => {
  const navigate = useNavigate();
  const { completeStep } = useProgress();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState(null);

  const questions = [
    {
      question: "Apa makanan favorit Mahesa?",
      options: ["Nasi Gudeg", "Rendang", "Gado-gado", "Bakso"],
      correct: 0
    },
    {
      question: "Hobi utama Mahesa adalah?",
      options: ["Gaming", "Membaca", "Olahraga", "Coding"],
      correct: 3
    },
    {
      question: "Warna favorit Mahesa?",
      options: ["Merah", "Biru", "Hijau", "Hitam"],
      correct: 1
    },
    {
      question: "Kapan ulang tahun Mahesa?",
      options: ["15 Januari", "22 Februari", "8 Juli", "10 Desember"],
      correct: 2
    },
    {
      question: "Tempat favorit Mahesa untuk liburan?",
      options: ["Pantai", "Gunung", "Kota", "Desa"],
      correct: 0
    }
  ];

  const handleAnswerSelect = (answerIndex) => {
    setSelectedAnswer(answerIndex);
  };

  const handleNextQuestion = () => {
    if (selectedAnswer === questions[currentQuestion].correct) {
      setScore(score + 20);
    }
    
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
    } else {
      setShowResult(true);
    }
  };

  const handleFinishQuiz = () => {
    const finalScore = selectedAnswer === questions[currentQuestion].correct ? score + 20 : score;
    completeStep('quiz', finalScore);
    
    if (finalScore >= 60) {
      navigate('/welcome');
    } else {
      // Bisa retry atau kasih motivasi
      alert('Coba lagi! Kamu perlu score minimal 60 untuk lanjut 😊');
      window.location.reload();
    }
  };

  if (showResult) {
    const finalScore = selectedAnswer === questions[currentQuestion].correct ? score + 20 : score;
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-400 via-pink-500 to-red-500">
        <div className="birthday-card max-w-md w-full mx-4 text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">Quiz Selesai!</h2>
          <div className="text-6xl mb-4">
            {finalScore >= 80 ? '🎉' : finalScore >= 60 ? '👍' : '😅'}
          </div>
          <p className="text-xl mb-4">Score kamu: {finalScore}/100</p>
          <p className="text-gray-600 mb-6">
            {finalScore >= 80 ? 'Wow! Kamu sangat mengenal Mahesa!' :
             finalScore >= 60 ? 'Bagus! Kamu cukup mengenal Mahesa.' :
             'Hmm, sepertinya kamu perlu lebih mengenal Mahesa 😊'}
          </p>
          {finalScore >= 60 ? (
            <button 
              onClick={handleFinishQuiz}
              className="birthday-button"
            >
              Lanjutkan Journey! 🚀
            </button>
          ) : (
            <button 
              onClick={() => window.location.reload()}
              className="birthday-button"
            >
              Coba Lagi 🔄
            </button>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500">
      <div className="birthday-card max-w-2xl w-full mx-4">
        <div className="mb-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold text-gray-800">
              Quiz: Seberapa Kenal Kamu dengan Mahesa?
            </h2>
            <span className="text-lg text-gray-600">
              {currentQuestion + 1}/{questions.length}
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
            ></div>
          </div>
        </div>

        <div className="mb-8">
          <h3 className="text-xl font-semibold mb-6 text-gray-800">
            {questions[currentQuestion].question}
          </h3>
          <div className="space-y-3">
            {questions[currentQuestion].options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswerSelect(index)}
                className={`w-full p-4 text-left rounded-lg border-2 transition-all duration-200 ${
                  selectedAnswer === index
                    ? 'border-purple-500 bg-purple-100 text-purple-800'
                    : 'border-gray-300 hover:border-purple-300 hover:bg-purple-50'
                }`}
              >
                {option}
              </button>
            ))}
          </div>
        </div>

        <div className="flex justify-between">
          <div className="text-sm text-gray-600">
            Score saat ini: {score}
          </div>
          <button
            onClick={handleNextQuestion}
            disabled={selectedAnswer === null}
            className={`px-6 py-2 rounded-lg font-semibold transition-all duration-200 ${
              selectedAnswer !== null
                ? 'bg-purple-500 text-white hover:bg-purple-600'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            {currentQuestion === questions.length - 1 ? 'Selesai' : 'Lanjut'}
          </button>
        </div>
      </div>
    </div>
  );
};

// Welcome Page Component
const WelcomePage = () => {
  const navigate = useNavigate();
  const { completeStep } = useProgress();

  const handleContinue = () => {
    completeStep('welcome');
    navigate('/celebration');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-400 via-blue-500 to-purple-600">
      <div className="birthday-card max-w-lg w-full mx-4 text-center">
        <div className="text-6xl mb-6">🎉</div>
        <h1 className="text-4xl font-bold text-gray-800 mb-4">
          Selamat!
        </h1>
        <p className="text-xl text-gray-600 mb-6">
          Kamu berhasil lulus quiz! Sekarang kamu bisa melanjutkan journey untuk merayakan ulang tahun Mahesa.
        </p>
        <div className="mb-8">
          <div className="animate-bounce text-4xl mb-4">🎊</div>
          <p className="text-gray-500">
            Bersiaplah untuk petualangan yang menyenangkan!
          </p>
        </div>
        <button 
          onClick={handleContinue}
          className="birthday-button text-lg px-8 py-3"
        >
          Mulai Petualangan! 🚀
        </button>
      </div>
    </div>
  );
};

// Celebration Page Component
const CelebrationPage = () => {
  const navigate = useNavigate();
  const { completeStep } = useProgress();
  const [cakeClicked, setCakeClicked] = useState(false);

  const handleCakeClick = () => {
    setCakeClicked(true);
    setTimeout(() => {
      completeStep('celebration');
      navigate('/memory');
    }, 2000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-yellow-400 via-orange-500 to-red-500">
      <div className="birthday-card max-w-lg w-full mx-4 text-center">
        <h1 className="text-4xl font-bold text-gray-800 mb-6">
          Waktunya Merayakan! 🎉
        </h1>
        
        {!cakeClicked ? (
          <>
            <p className="text-xl text-gray-600 mb-8">
              Klik kue untuk meniup lilin dan melanjutkan journey!
            </p>
            <button 
              onClick={handleCakeClick}
              className="text-8xl hover:scale-110 transition-transform duration-200 cursor-pointer"
            >
              🎂
            </button>
            <p className="text-gray-500 mt-4">
              Klik kue di atas!
            </p>
          </>
        ) : (
          <>
            <div className="text-8xl mb-4">🎊</div>
            <p className="text-xl text-gray-600 mb-4">
              Selamat Ulang Tahun Mahesa! 🎉
            </p>
            <div className="animate-pulse text-lg text-gray-500">
              Redirecting to memory lane...
            </div>
          </>
        )}
      </div>
    </div>
  );
};

// Memory Lane Page Component
const MemoryLanePage = () => {
  const navigate = useNavigate();
  const { completeStep } = useProgress();
  const [currentMemory, setCurrentMemory] = useState(0);

  const memories = [
    {
      year: "2020",
      title: "Pertama Kali Kenal",
      description: "Saat pertama kali bertemu di kampus, siapa sangka akan jadi sahabat sebaik ini!",
      emoji: "🤝"
    },
    {
      year: "2021", 
      title: "Liburan Pertama",
      description: "Trip ke Bali yang tak terlupakan, penuh tawa dan petualangan seru!",
      emoji: "🏖️"
    },
    {
      year: "2022",
      title: "Wisuda Bersama",
      description: "Merayakan pencapaian bersama, moment yang sangat berharga!",
      emoji: "🎓"
    },
    {
      year: "2023",
      title: "Tahun Penuh Kenangan",
      description: "Dari project bareng sampai hangout seru, tahun yang amazing!",
      emoji: "⭐"
    },
    {
      year: "2024",
      title: "Dan Sekarang...",
      description: "Saatnya merayakan hari special kamu dengan website ini!",
      emoji: "🎉"
    }
  ];

  const handleNext = () => {
    if (currentMemory < memories.length - 1) {
      setCurrentMemory(currentMemory + 1);
    } else {
      completeStep('memory');
      navigate('/dashboard');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-400 via-purple-500 to-pink-500">
      <div className="birthday-card max-w-2xl w-full mx-4">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Memory Lane 📸
          </h1>
          <p className="text-gray-600">
            Perjalanan kenangan bersama Mahesa
          </p>
        </div>

        <div className="text-center mb-8">
          <div className="text-6xl mb-4">{memories[currentMemory].emoji}</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            {memories[currentMemory].year}
          </h2>
          <h3 className="text-xl font-semibold text-purple-600 mb-4">
            {memories[currentMemory].title}
          </h3>
          <p className="text-gray-600 text-lg leading-relaxed">
            {memories[currentMemory].description}
          </p>
        </div>

        <div className="flex justify-between items-center">
          <div className="text-sm text-gray-500">
            {currentMemory + 1} / {memories.length}
          </div>
          <button 
            onClick={handleNext}
            className="birthday-button"
          >
            {currentMemory === memories.length - 1 ? 'Ke Dashboard! 🏠' : 'Lanjut 👉'}
          </button>
        </div>

        <div className="mt-6">
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${((currentMemory + 1) / memories.length) * 100}%` }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Dashboard Page Component
const DashboardPage = () => {
  const { resetProgress, quizScore } = useProgress();
  const [activeTab, setActiveTab] = useState('home');

  const handleReset = () => {
    if (confirm('Apakah kamu yakin ingin reset progress?')) {
      resetProgress();
      window.location.href = '/';
    }
  };

  const renderContent = () => {
    switch(activeTab) {
      case 'home':
        return (
          <div className="text-center">
            <div className="text-6xl mb-6">🎉</div>
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              Selamat Datang di Dashboard!
            </h2>
            <p className="text-xl text-gray-600 mb-6">
              Kamu berhasil menyelesaikan journey ulang tahun Mahesa!
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              <div className="bg-purple-100 p-4 rounded-lg">
                <div className="text-2xl mb-2">🏆</div>
                <p className="font-semibold">Quiz Score</p>
                <p className="text-lg text-purple-600">{quizScore}/100</p>
              </div>
              <div className="bg-blue-100 p-4 rounded-lg">
                <div className="text-2xl mb-2">🎯</div>
                <p className="font-semibold">Journey</p>
                <p className="text-lg text-blue-600">Completed</p>
              </div>
              <div className="bg-green-100 p-4 rounded-lg">
                <div className="text-2xl mb-2">🎊</div>
                <p className="font-semibold">Status</p>
                <p className="text-lg text-green-600">Unlocked</p>
              </div>
            </div>
          </div>
        );
      
      case 'about':
        return (
          <div className="text-center">
            <div className="text-6xl mb-6">👨‍💻</div>
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              Tentang Mahesa
            </h2>
            <div className="text-left max-w-2xl mx-auto space-y-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="font-semibold text-gray-700">Nama Lengkap:</p>
                <p className="text-gray-600">Mahesa Dwi Putra</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="font-semibold text-gray-700">Tanggal Lahir:</p>
                <p className="text-gray-600">8 Juli 1995</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="font-semibold text-gray-700">Hobi:</p>
                <p className="text-gray-600">Coding, Gaming, Traveling</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="font-semibold text-gray-700">Makanan Favorit:</p>
                <p className="text-gray-600">Nasi Gudeg & Bakso</p>
              </div>
            </div>
          </div>
        );
      
      case 'gallery':
        return (
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">
              Gallery Kenangan 📸
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {[1,2,3,4,5,6].map(i => (
                <div key={i} className="bg-gray-200 aspect-square rounded-lg flex items-center justify-center">
                  <div className="text-4xl">📸</div>
                </div>
              ))}
            </div>
            <p className="text-gray-500 mt-4">
              Gallery photos akan ditampilkan di sini
            </p>
          </div>
        );
      
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500">
      <nav className="bg-white shadow-lg">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center py-4">
            <h1 className="text-2xl font-bold text-gray-800">
              🎉 Mahesa's Birthday
            </h1>
            <div className="flex space-x-4">
              {['home', 'about', 'gallery'].map(tab => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-4 py-2 rounded-lg font-semibold transition-all duration-200 ${
                    activeTab === tab 
                      ? 'bg-purple-500 text-white' 
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
              ))}
            </div>
          </div>
        </div>
      </nav>

      <main className="container mx-auto px-4 py-8">
        <div className="birthday-card max-w-4xl mx-auto">
          {renderContent()}
          
          <div className="mt-8 pt-8 border-t border-gray-200 text-center">
            <button 
              onClick={handleReset}
              className="text-sm text-gray-500 hover:text-red-500 transition-colors"
            >
              🔄 Reset Progress
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

// Protected Route Component
const ProtectedRoute = ({ children, stepId }) => {
  const { canAccessStep } = useProgress();
  
  if (!canAccessStep(stepId)) {
    return <Navigate to="/" replace />;
  }
  
  return children;
};

// Main App Component
function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<EntryQuiz />} />
          <Route 
            path="/welcome" 
            element={
              <ProtectedRoute stepId="welcome">
                <WelcomePage />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/celebration" 
            element={
              <ProtectedRoute stepId="celebration">
                <CelebrationPage />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/memory" 
            element={
              <ProtectedRoute stepId="memory">
                <MemoryLanePage />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/dashboard" 
            element={
              <ProtectedRoute stepId="dashboard">
                <DashboardPage />
              </ProtectedRoute>
            } 
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;