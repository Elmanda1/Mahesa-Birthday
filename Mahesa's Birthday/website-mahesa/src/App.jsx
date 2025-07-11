// src/App.jsx
import React, { useState } from 'react';
import Home from './components/Home'; // Sesuaikan dengan struktur folder Anda
import QuizPage from './pages/QuizPage';
import GalleryPage from './pages/GalleryPage';
import TimelinePage from './components/Timeline'; // Buat page baru jika perlu
import AboutPage from './components/About'; // Buat page baru jika perlu
import './index.css';

function App() {
  // State untuk mengelola halaman yang aktif
  const [currentPage, setCurrentPage] = useState('home');

  // Fungsi navigasi untuk setiap halaman
  const handleStartQuiz = () => {
    setCurrentPage('quiz');
  };

  const handleNavigateToGallery = () => {
    setCurrentPage('gallery');
  };

  const handleNavigateToTimeline = () => {
    setCurrentPage('timeline');
  };

  const handleNavigateToAbout = () => {
    setCurrentPage('about');
  };

  // Fungsi untuk kembali ke home
  const handleBackToHome = () => {
    setCurrentPage('home');
  };

  // Fungsi untuk menyelesaikan quiz dan lanjut ke gallery
  const handleQuizComplete = () => {
    setCurrentPage('gallery');
  };

  // Fungsi untuk merender halaman yang sesuai
  const renderPage = () => {
    switch(currentPage) {
      case 'quiz':
        return (
          <QuizPage 
            onQuizComplete={handleQuizComplete}
            onBackToHome={handleBackToHome}
          />
        );
      
      case 'gallery':
        return (
          <GalleryPage 
            onBackToHome={handleBackToHome}
            onStartQuiz={handleStartQuiz}
          />
        );
      
      case 'timeline':
        return (
          <TimelinePage 
            onBackToHome={handleBackToHome}
            onNavigateToGallery={handleNavigateToGallery}
          />
        );
      
      case 'about':
        return (
          <AboutPage 
            onBackToHome={handleBackToHome}
            onStartQuiz={handleStartQuiz}
          />
        );
      
      default: // 'home'
        return (
          <Home 
            onStartQuiz={handleStartQuiz}
            onNavigateToGallery={handleNavigateToGallery}
            onNavigateToTimeline={handleNavigateToTimeline}
            onNavigateToAbout={handleNavigateToAbout}
          />
        );
    }
  };

  return (
    <div className="App">
      {renderPage()}
    </div>
  );
}

export default App;