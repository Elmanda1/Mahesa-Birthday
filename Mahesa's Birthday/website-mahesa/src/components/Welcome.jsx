import React, { useState, useEffect } from 'react';

function Welcome() {
  const [isVisible, setIsVisible] = useState(false);
  const [clickedCard, setClickedCard] = useState(null);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleCardClick = (cardIndex) => {
    setClickedCard(cardIndex);
    setTimeout(() => setClickedCard(null), 300);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-pink-50 to-white relative overflow-hidden">
      {/* Enhanced background decorative elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 w-40 h-40 bg-pink-300/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-40 right-20 w-56 h-56 bg-pink-400/15 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-20 left-1/4 w-48 h-48 bg-pink-200/20 rounded-full blur-3xl animate-pulse delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-pink-100/10 rounded-full blur-3xl animate-pulse delay-3000"></div>
      </div>

      {/* Floating particles */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-pink-400/30 rounded-full animate-bounce"
            style={{
              left: `${15 + i * 12}%`,
              top: `${25 + (i % 4) * 15}%`,
              animationDelay: `${i * 0.8}s`,
              animationDuration: `${3 + (i % 3)}s`
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-4 py-16 relative z-10">
        <div className="max-w-6xl mx-auto">
          {/* Main welcome section */}
          <div className="bg-white/90 backdrop-blur-sm p-8 md:p-12 rounded-3xl shadow-2xl border border-white/30 mb-12 transform hover:scale-[1.01] transition-all duration-500">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Photo Section */}
              <div className="text-center lg:text-left">
                <div className="relative w-80 h-80 mx-auto lg:mx-0 group">
                  {/* Gradient border */}
                  <div className="absolute inset-0 bg-gradient-to-br from-pink-400 to-pink-500 rounded-3xl p-1 group-hover:scale-105 group-hover:rotate-1 transition-all duration-500">
                    <div className="w-full h-full rounded-3xl overflow-hidden bg-white p-2">
                      <div className="w-full h-full bg-gradient-to-br from-pink-100 to-pink-200 rounded-2xl flex items-center justify-center">
                        <div className="text-center">
                          <div className="w-20 h-20 bg-gradient-to-br from-pink-400 to-pink-500 rounded-full mx-auto mb-4 flex items-center justify-center">
                            <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                            </svg>
                          </div>
                          <p className="text-2xl font-bold bg-gradient-to-r from-pink-500 to-pink-600 bg-clip-text text-transparent">
                            Mahesa
                          </p>
                          <p className="text-gray-500 text-sm mt-1">Teman Terbaik</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Decorative elements */}
                  <div className="absolute -inset-6 border-2 border-pink-200/50 rounded-3xl group-hover:border-pink-300/70 transition-colors duration-500"></div>
                  <div className="absolute -top-3 -right-3 w-8 h-8 bg-gradient-to-br from-pink-400 to-pink-500 rounded-full animate-pulse shadow-lg"></div>
                  <div className="absolute -bottom-3 -left-3 w-6 h-6 bg-gradient-to-br from-pink-500 to-pink-400 rounded-full animate-pulse delay-1000 shadow-lg"></div>
                </div>
              </div>

              {/* Greeting Section */}
              <div className="text-center lg:text-left">
                {/* Decorative top element */}
                <div className="w-20 h-1 bg-gradient-to-r from-pink-500 to-pink-600 mx-auto lg:mx-0 mb-8 rounded-full"></div>
                
                <h1 className="text-4xl lg:text-6xl font-bold mb-8 bg-gradient-to-r from-pink-500 to-pink-600 bg-clip-text text-transparent leading-tight">
                  Untuk Mahesa,
                </h1>
                
                <div className="space-y-6 text-lg text-gray-700 leading-relaxed">
                  <p className="opacity-90">
                    Selamat memasuki babak baru dalam hidupmu! Aku membuat website kecil ini bukan hanya sebagai hadiah, tapi juga sebagai kapsul waktu digital untuk semua kenangan yang telah kita lalui.
                  </p>
                  
                  <p className="opacity-90">
                    Semoga kamu suka dengan hadiah sederhana ini. Jelajahi setiap bagiannya, kenang kembali momen-momen kita, dan tersenyumlah. Selamat ulang tahun, kawan terbaik!
                  </p>
                </div>
                
                {/* Signature */}
                <div className="mt-10">
                  <div className="text-xl font-bold bg-gradient-to-r from-pink-500 to-pink-600 bg-clip-text text-transparent mb-3">
                    - [Nama Anda]
                  </div>
                  <div className="w-32 h-0.5 bg-gradient-to-r from-pink-400 to-pink-500 mx-auto lg:mx-0 rounded-full"></div>
                </div>
              </div>
            </div>
          </div>

          {/* Feature cards */}
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {[
              {
                icon: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z",
                title: "Timeline Kenangan",
                desc: "Jelajahi perjalanan waktu bersama",
                gradient: "from-pink-400 to-pink-500"
              },
              {
                icon: "M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z",
                title: "Momen Spesial",
                desc: "Koleksi kenangan terindah",
                gradient: "from-pink-500 to-pink-400"
              },
              {
                icon: "M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z",
                title: "Tentang Kita",
                desc: "Cerita persahabatan yang indah",
                gradient: "from-pink-500 to-pink-600"
              }
            ].map((card, index) => (
              <div
                key={index}
                onClick={() => handleCardClick(index)}
                className={`bg-white/80 backdrop-blur-sm p-8 rounded-3xl shadow-lg border border-white/30 text-center transform hover:scale-105 hover:shadow-2xl hover:bg-white/90 transition-all duration-300 cursor-pointer group ${
                  clickedCard === index ? 'scale-95 shadow-inner' : ''
                }`}
              >
                <div className={`w-16 h-16 bg-gradient-to-br ${card.gradient} rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 group-hover:rotate-12 transition-all duration-300 shadow-lg`}>
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={card.icon} />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-3 group-hover:text-pink-600 transition-colors duration-300">{card.title}</h3>
                <p className="text-gray-600 group-hover:text-gray-700 transition-colors duration-300 leading-relaxed">{card.desc}</p>
                
                {/* Subtle indicator */}
                <div className="w-0 h-1 bg-gradient-to-r from-pink-400 to-pink-500 mx-auto mt-4 group-hover:w-12 transition-all duration-300 rounded-full"></div>
              </div>
            ))}
          </div>

          {/* Call to action */}
          <div className="text-center mb-8">
            <button className="inline-flex items-center px-10 py-4 bg-gradient-to-r from-pink-500 to-pink-600 text-white rounded-full font-semibold shadow-lg hover:shadow-2xl transform hover:scale-105 hover:-translate-y-1 transition-all duration-300 cursor-pointer group text-lg">
              <span className="group-hover:mr-1 transition-all duration-300">Mulai Jelajahi</span>
              <svg className="w-6 h-6 ml-2 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </button>
          </div>

          {/* Inspirational quote */}
          <div className="text-center">
            <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/30 max-w-md mx-auto">
              <p className="text-gray-600 italic text-lg hover:text-gray-800 transition-colors duration-300">
                "Setiap kenangan adalah harta yang tak ternilai"
              </p>
              <div className="w-16 h-0.5 bg-gradient-to-r from-pink-400 to-pink-500 mx-auto mt-4 rounded-full"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced floating elements */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(12)].map((_, i) => (
          <div
            key={`star-${i}`}
            className="absolute text-pink-300/40 animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${i * 0.5}s`,
              fontSize: `${8 + Math.random() * 8}px`
            }}
          >
            ✨
          </div>
        ))}
      </div>

      {/* Custom styles */}
      <style jsx>{`
        @keyframes gentleFloat {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-10px) rotate(5deg); }
        }
        
        @keyframes sparkle {
          0%, 100% { opacity: 0.3; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.2); }
        }
        
        .animate-gentle-float {
          animation: gentleFloat 4s ease-in-out infinite;
        }
        
        .animate-sparkle {
          animation: sparkle 2s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}

export default Welcome;