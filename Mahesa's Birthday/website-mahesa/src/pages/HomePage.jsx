import React, { useState, useEffect } from 'react';
import Welcome from '../components/Home';

function HomePage({ onStartQuiz }) {
  const [isVisible, setIsVisible] = useState(false);
  const [showMahesa, setShowMahesa] = useState(false);
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    // Trigger animations on mount
    const timer1 = setTimeout(() => setIsVisible(true), 100);
    const timer2 = setTimeout(() => setShowMahesa(true), 1400);
    const timer3 = setTimeout(() => setShowButton(true), 2200);
    
    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, []);

  return (
    <div>
      {/* Landing Section */}
      <div className="relative min-h-screen flex items-center justify-center p-4 text-center overflow-hidden bg-brand-background">
        {/* Aurora Background Effect */}
        <div className="absolute top-0 left-0 -translate-x-1/4 -translate-y-1/4 w-96 h-96 bg-brand-primary/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-0 translate-x-1/4 translate-y-1/4 w-96 h-96 bg-brand-primary-light/20 rounded-full blur-3xl animate-pulse delay-75"></div>
        
        <div className="z-10 max-w-4xl mx-auto">
          {/* Main heading with staggered animation */}
          <div className="overflow-hidden">
            <h1 className={`text-5xl pb-3 md:text-7xl font-bold text-brand-text leading-tight transform transition-all duration-1000 ease-out ${
              isVisible ? 'scale-100 opacity-100 rotate-0' : 'scale-95 opacity-0 rotate-1'
            }`}>
              Selamat Ulang Tahun,
            </h1>
          </div>
          
          <div className="overflow-hidden">
            <h1 className={`text-5xl md:text-7xl font-bold text-brand-text leading-tight transform transition-all duration-1000 ease-out delay-300 ${
              isVisible ? 'scale-100 opacity-100 filter-none' : 'scale-90 opacity-0 blur-sm'
            }`}>
              Najma Gusti Ayu
            </h1>
          </div>
          
          <div className="overflow-hidden">
            <h1 className={`text-5xl md:text-7xl font-bold text-brand-text leading-tight transform transition-all duration-1000 ease-out delay-600 ${
              isVisible ? 'translate-x-0 opacity-100' : 'translate-x-8 opacity-0'
            }`}>
              {/* Change: Replaced 'text-brand-primary' with 'text-pink-500' for the main text color */}
              <span className={`text-pink-500 relative inline-block font-serif italic transform transition-all duration-2000 ease-out ${
                showMahesa ? 'scale-100 opacity-100 rotate-0' : 'scale-100 opacity-0 rotate-0'
              }`}>
                <span className={`relative z-10 inline-block transition-all duration-2000 ease-out ${
                  showMahesa ? 'transform-none' : 'transform translate-y-2'
                }`} style={{
                  // Change: Replaced the CSS variable with the direct RGB value for pink-500 (236, 72, 153) for the shadow effects.
                  textShadow: showMahesa ? '0 0 20px rgba(236, 72, 153, 0.3)' : 'none',
                  filter: showMahesa ? 'drop-shadow(0 0 8px rgba(236, 72, 153, 0.2))' : 'none'
                }}>
                  {'Mahesa'.split('').map((letter, index) => (
                    <span
                      key={index}
                      className={`inline-block transition-all duration-300 ease-out ${
                        showMahesa ? 'opacity-100 transform-none' : 'opacity-0 translate-y-4'
                      }`}
                      style={{
                        transitionDelay: showMahesa ? `${index * 150}ms` : '0ms'
                      }}
                    >
                      {letter}
                    </span>
                  ))}
                </span>
                
                {/* Elegant underline effect */}
                {/* Change: Updated the gradient to use pink shades. */}
                <div className={`absolute -bottom-2 left-0 h-0.5 bg-gradient-to-r from-pink-500 to-pink-400 transition-all duration-2000 ease-out delay-1000 ${
                  showMahesa ? 'w-full opacity-100' : 'w-0 opacity-0'
                }`}></div>
              </span>
            </h1>
          </div>

          {/* Description with fade-in */}
          <p className={`text-lg md:text-xl text-brand-text/70 mt-8 max-w-2xl mx-auto leading-relaxed transform transition-all duration-1000 ease-out delay-1000 ${
            isVisible ? 'scale-100 opacity-100 filter-none' : 'scale-95 opacity-0 blur-sm'
          }`}>
            Website kecil ini kusiapkan untuk merayakan hari kelahiranmu. Tapi sebelum itu, ada sedikit tantangan untukmu.
          </p>
          
          {/* Button with entrance animation */}
          <div className={`mt-12 transform transition-all duration-1000 ease-out ${
            showButton ? 'rotate-0 opacity-100 scale-100 filter-none' : 'rotate-3 opacity-0 scale-80 blur-sm'
          }`}>
            <button
              onClick={onStartQuiz}
              className="group relative py-4 px-10 bg-brand-primary text-white font-bold rounded-full shadow-lg hover:shadow-2xl transform transition-all duration-300 hover:scale-105 hover:rotate-1 active:scale-95 overflow-hidden animate-pulse hover:animate-none"
            >
              {/* Button glow effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-brand-primary to-brand-primary-light opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full"></div>
              
              {/* Button text */}
              <span className="relative z-10 tracking-wide">Mulai Tantangan</span>
              
              {/* Subtle shine effect */}
              <div className="absolute inset-0 -top-1 -left-1 bg-gradient-to-r from-transparent via-white/20 to-transparent w-6 h-full transform -skew-x-12 translate-x-[-100%] group-hover:translate-x-[300%] transition-transform duration-700"></div>
            </button>
          </div>
        </div>
      </div>

      {/* Welcome Section */}
      <Welcome onStartQuiz={onStartQuiz} />
    </div>
  );
}

export default HomePage;