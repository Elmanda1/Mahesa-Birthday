import React from 'react';

// Komponen ini akan menerima sebuah 'prop' bernama 'onStartQuiz'.
// Ini adalah fungsi yang akan kita kirim dari App.jsx untuk memulai kuis.
function HomePage({ onStartQuiz }) {
  return (
    <div className="bg-gradient-to-br from-rose-500 to-pink-600 min-h-screen flex flex-col items-center justify-center p-4 text-white text-center">
      
      {/* Container utama dengan efek glassmorphism */}
      <div className="bg-white/10 backdrop-blur-md rounded-xl shadow-2xl p-8 max-w-lg">

        {/* Judul Utama */}
        <h1 className="text-4xl md:text-5xl font-bold mb-4 animate-fade-in-down">
          Selamat Ulang Tahun, Mahesa!
        </h1>

        {/* Pesan Pembuka */}
        <p className="text-lg md:text-xl mb-8 animate-fade-in-up">
          Ada sesuatu yang spesial untukmu. Tapi sebelum itu, buktikan kalau kamu benar-benar kenal dirimu sendiri!
        </p>

        {/* Tombol untuk Memulai Kuis */}
        <button
          onClick={onStartQuiz} // Saat diklik, tombol ini akan menjalankan fungsi onStartQuiz
          className="py-3 px-8 bg-white text-rose-500 font-bold rounded-full shadow-lg hover:scale-110 transform transition-all duration-300"
        >
          Mulai Petualangan!
        </button>
        
      </div>
    </div>
  );
}

export default HomePage;