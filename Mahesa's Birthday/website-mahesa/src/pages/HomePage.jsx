// src/pages/HomePage.jsx
import React from 'react';

function HomePage({ onStartQuiz }) {
  return (
    <div className="relative min-h-screen flex items-center justify-center p-4 text-center overflow-hidden bg-brand-background">
      {/* Aurora Background Effect */}
      <div className="absolute top-0 left-0 -translate-x-1/4 -translate-y-1/4 w-96 h-96 bg-brand-primary/20 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-0 right-0 translate-x-1/4 translate-y-1/4 w-96 h-96 bg-brand-primary-light/20 rounded-full blur-3xl animate-pulse delay-75"></div>
      
      <div className="z-10">
        <h1 className="text-5xl md:text-7xl font-bold text-brand-text leading-tight">
          Selamat Ulang Tahun, <span className="text-brand-primary">Mahesa</span>!
        </h1>
        <p className="text-lg md:text-xl text-brand-text/70 mt-4 max-w-2xl mx-auto">
          Sebuah website kecil disiapkan untuk merayakan harimu. Tapi sebelum itu, ada sedikit tantangan untukmu.
        </p>
        <button
          onClick={onStartQuiz}
          className="mt-8 py-3 px-8 bg-brand-primary text-white font-bold rounded-full shadow-lg hover:shadow-xl hover:scale-105 transform transition-all duration-300"
        >
          Mulai Tantangan
        </button>
      </div>
    </div>
  );
}
export default HomePage;