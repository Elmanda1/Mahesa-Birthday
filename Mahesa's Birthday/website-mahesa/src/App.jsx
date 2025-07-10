// src/App.jsx
import React, { useState } from 'react';
import HomePage from './pages/HomePage';
import QuizPage from './pages/QuizPage';
import GalleryPage from './pages/GalleryPage'; // Import halaman baru
import './index.css';

function App() {
  // Kita ganti state boolean menjadi string untuk mengelola 3 kondisi
  // 'home' -> 'quiz' -> 'gallery'
  const [pageState, setPageState] = useState('home');

  // Fungsi untuk pindah dari 'home' ke 'quiz'
  const handleStartQuiz = () => {
    setPageState('quiz');
  };

  // Fungsi untuk pindah dari 'quiz' ke 'gallery'
  const handleQuizComplete = () => {
    setPageState('gallery');
  };

  // Fungsi untuk merender halaman yang benar berdasarkan state
  const renderPage = () => {
    if (pageState === 'quiz') {
      return <QuizPage onQuizComplete={handleQuizComplete} />;
    }
    if (pageState === 'gallery') {
      return <GalleryPage />;
    }
    // Defaultnya adalah 'home'
    return <HomePage onStartQuiz={handleStartQuiz} />;
  };

  return (
    <div className="App">
      {renderPage()}
    </div>
  );
}

export default App;