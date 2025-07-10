import React, { useState, useEffect } from 'react';
import { Heart, Star, Sparkles, Gift, Cake, Gamepad2, Coffee, Film, ArrowDown } from 'lucide-react';

function About() {
  const [isVisible, setIsVisible] = useState(false);
  const [currentQuote, setCurrentQuote] = useState(0);
  const quotes = [
    "Selamat ulang tahun, kawan! Semoga semua 'misi' di kehidupan nyata dan di dalam game bisa kamu selesaikan dengan epic.",
    "Terima kasih sudah menjadi teman yang luar biasa. Cheers to another level up!",
    "May your birthday be filled with legendary drops and epic wins! 🎮",
    "Here's to another year of amazing adventures, both virtual and real! 🌟"
  ];

  useEffect(() => {
    setIsVisible(true);
    const interval = setInterval(() => {
      setCurrentQuote((prev) => (prev + 1) % quotes.length);
    }, 4000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-900 via-rose-800 to-pink-600 relative overflow-hidden">
      {/* Animated Background */}
      <div className='absolute inset-0 bg-[url("data:image/svg+xml,%3Csvg width=&#34;60&#34; height=&#34;60&#34; viewBox=&#34;0 0 60 60&#34; xmlns=&#34;http://www.w3.org/2000/svg&#34;%3E%3Cg fill=&#34;none&#34; fill-rule=&#34;evenodd&#34;%3E%3Cg fill=&#34;%23ffffff&#34; fill-opacity=&#34;0.1&#34;%3E%3Ccircle cx=&#34;30&#34; cy=&#34;30&#34; r=&#34;2&#34;/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")]'></div>

      {/* Main Content */}
      <div className="relative z-10 container mx-auto px-4 py-8">

        {/* Main Profile Card */}
        <div className={`transform transition-all duration-1000 delay-300 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <div className="bg-white/10 backdrop-blur-xl p-8 rounded-3xl shadow-2xl border border-white/20 mb-8 hover:scale-[1.02] transition-all duration-300">
            <div className="flex flex-col md:flex-row items-center gap-8">
              
              {/* Profile Image with Glow Effect */}
              <div className="relative group">
                <div className="absolute -inset-4 bg-gradient-to-r from-pink-400 via-rose-400 to-pink-500 rounded-full blur-lg opacity-70 group-hover:opacity-100 transition-opacity"></div>
                <div className="relative w-64 h-64 rounded-full overflow-hidden border-4 border-white/50 shadow-2xl">
                  <img 
                    src="https://placehold.co/400x400/3498db/ffffff?text=Foto+Mahesa"
                    alt="Foto Profil Mahesa"
                    className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                </div>
              </div>

              {/* Profile Info */}
              <div className="text-center md:text-left text-white">
                <h2 className="text-5xl font-black mb-2 bg-gradient-to-r from-pink-300 to-rose-300 bg-clip-text text-transparent">
                  MAHESA
                </h2>
                <div className="flex items-center justify-center md:justify-start gap-2 mb-4">
                  <Star className="w-5 h-5 text-pink-300" />
                  <span className="text-2xl font-bold text-rose-300">Gamer & Bakso Enthusiast</span>
                  <Star className="w-5 h-5 text-pink-300" />
                </div>
                <p className="text-lg text-white/90 leading-relaxed max-w-md">
                  Seorang petualang di dunia digital dan nyata. Dikenal karena kemampuannya untuk kalah dalam game apa pun sambil tetap tertawa dan menyalahkan koneksi internet.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Favorites Section */}
        <div className={`transform transition-all duration-1000 delay-500 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <div className="bg-white/10 backdrop-blur-xl p-8 rounded-3xl shadow-2xl border border-white/20 mb-8">
            <h2 className="text-4xl font-black text-center mb-8 bg-gradient-to-r from-pink-300 to-rose-300 bg-clip-text text-transparent">
              ✨ FAVORITES CORNER ✨
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Food */}
              <div className="group bg-gradient-to-br from-pink-500/20 to-rose-500/20 p-6 rounded-2xl border border-white/20 hover:scale-105 transition-all duration-300 hover:shadow-xl">
                <div className="text-center">
                  <div className="text-6xl mb-4 group-hover:animate-bounce">🍜</div>
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <Coffee className="w-5 h-5 text-pink-300" />
                    <h3 className="font-bold text-xl text-white">Makanan</h3>
                  </div>
                  <p className="text-pink-200 font-semibold">Bakso Urat Kuah Pedas</p>
                  <div className="mt-2 text-sm text-pink-300/80">The ultimate comfort food! 🔥</div>
                </div>
              </div>

              {/* Game */}
              <div className="group bg-gradient-to-br from-pink-400/20 to-rose-400/20 p-6 rounded-2xl border border-white/20 hover:scale-105 transition-all duration-300 hover:shadow-xl">
                <div className="text-center">
                  <div className="text-6xl mb-4 group-hover:animate-bounce">🎮</div>
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <Gamepad2 className="w-5 h-5 text-pink-300" />
                    <h3 className="font-bold text-xl text-white">Game</h3>
                  </div>
                  <p className="text-pink-200 font-semibold">Valorant (kalau menang)</p>
                  <div className="mt-2 text-sm text-pink-300/80">Rank up time! 🚀</div>
                </div>
              </div>

              {/* Entertainment */}
              <div className="group bg-gradient-to-br from-rose-500/20 to-pink-400/20 p-6 rounded-2xl border border-white/20 hover:scale-105 transition-all duration-300 hover:shadow-xl">
                <div className="text-center">
                  <div className="text-6xl mb-4 group-hover:animate-bounce">🎬</div>
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <Film className="w-5 h-5 text-rose-300" />
                    <h3 className="font-bold text-xl text-white">Tontonan</h3>
                  </div>
                  <p className="text-rose-200 font-semibold">Serial The Office</p>
                  <div className="mt-2 text-sm text-rose-300/80">That's what she said! 😄</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Birthday Message */}
        <div className={`transform transition-all duration-1000 delay-700 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <div className="bg-gradient-to-r from-pink-500/20 via-rose-500/20 to-pink-400/20 backdrop-blur-xl p-8 rounded-3xl shadow-2xl border border-white/20 mb-8">
            <div className="text-center">
              <div className="flex items-center justify-center gap-2 mb-4">
                <Heart className="w-6 h-6 text-pink-300" />
                <h2 className="text-3xl font-black text-white">A Special Note For You</h2>
                <Heart className="w-6 h-6 text-pink-300" />
              </div>
              
              <div className="relative overflow-hidden h-24 mb-6">
                <div 
                  className="absolute inset-0 transition-transform duration-1000 ease-in-out"
                  style={{ transform: `translateY(-${currentQuote * 100}%)` }}
                >
                  {quotes.map((quote, index) => (
                    <div key={index} className="h-24 flex items-center justify-center px-4">
                      <p className="text-lg text-white/90 italic font-medium max-w-2xl">
                        "{quote}"
                      </p>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="flex justify-center gap-2">
                {quotes.map((_, index) => (
                  <div
                    key={index}
                    className={`w-2 h-2 rounded-full transition-colors duration-300 ${
                      index === currentQuote ? 'bg-pink-300' : 'bg-white/30'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Birthday Wishes Grid */}
        <div className={`transform transition-all duration-1000 delay-900 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="bg-gradient-to-br from-pink-500/20 to-rose-500/20 backdrop-blur-xl p-6 rounded-2xl border border-white/20 hover:scale-105 transition-all duration-300">
              <div className="text-center">
                <div className="text-4xl mb-3">🎯</div>
                <h3 className="font-bold text-xl text-white mb-2">Achievement Unlocked!</h3>
                <p className="text-pink-200">Another year of being awesome! Level up completed! 🎮</p>
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-rose-400/20 to-pink-500/20 backdrop-blur-xl p-6 rounded-2xl border border-white/20 hover:scale-105 transition-all duration-300">
              <div className="text-center">
                <div className="text-4xl mb-3">🌟</div>
                <h3 className="font-bold text-xl text-white mb-2">Legendary Status</h3>
                <p className="text-rose-200">You're not just a friend, you're a rare legendary drop! ✨</p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-pink-500/20 to-rose-500/20 backdrop-blur-xl px-6 py-3 rounded-full border border-white/20">
            <Cake className="w-5 h-5 text-pink-300" />
            <span className="text-white font-bold">Made with ❤️ for an amazing friend</span>
            <Gift className="w-5 h-5 text-rose-300" />
          </div>
        </div>
      </div>

      {/* Custom CSS for animations */}
      <style>{`
        .animate-glow {
          animation: glow 2s ease-in-out infinite alternate;
        }
        
        @keyframes glow {
          from {
            box-shadow: 0 0 20px rgba(244, 114, 182, 0.5);
          }
          to {
            box-shadow: 0 0 30px rgba(244, 114, 182, 0.8);
          }
        }
      `}</style>
    </div>
  );
}

export default About;