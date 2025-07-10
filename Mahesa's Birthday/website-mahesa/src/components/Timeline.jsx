import React, { useState, useEffect, useRef } from 'react';
import { Heart, Star, Gift, Calendar, Camera, Music, Sparkles, MapPin } from 'lucide-react';

// Data timeline yang lebih kaya dengan tema PINK! 💕
const timelineData = [
  {
    date: "10 Agustus 2021",
    title: "Pertama Kali Main Bareng",
    description: "Hari di mana kita pertama kali main Valorant sampai pagi. Saat itu aku sudah tau kamu spesial.",
    image: "/api/placeholder/400/250",
    icon: "🎮",
    color: "from-pink-400 to-rose-500",
    category: "gaming"
  },
  {
    date: "25 Desember 2022", 
    title: "Liburan ke Bandung",
    description: "Trip dadakan yang penuh cerita, mencoba kuliner baru. Momen yang tak terlupakan bersama.",
    image: "/api/placeholder/400/250",
    icon: "🏔️",
    color: "from-pink-500 to-fuchsia-500",
    category: "travel"
  },
  {
    date: "14 Februari 2023",
    title: "Valentine Pertama",
    description: "Hari spesial di mana kita merayakan cinta untuk pertama kalinya. Dinner romantis yang indah.",
    image: "/api/placeholder/400/250", 
    icon: "💖",
    color: "from-rose-400 to-pink-500",
    category: "love"
  },
  {
    date: "15 Juni 2023",
    title: "Konser Musik Favorit",
    description: "Menyanyi bersama lagu-lagu favorit kita. Malam yang penuh dengan musik dan tawa.",
    image: "/api/placeholder/400/250",
    icon: "🎵",
    color: "from-fuchsia-400 to-pink-600",
    category: "music"
  },
  {
    date: "20 September 2023",
    title: "Ulang Tahun Pertama Bersama",
    description: "Merayakan hari spesialmu dengan kejutan kecil. Senyummu adalah hadiah terindah.",
    image: "/api/placeholder/400/250",
    icon: "🎂",
    color: "from-pink-300 to-rose-600",
    category: "birthday"
  },
  {
    date: "10 Juli 2025",
    title: "Hari Ini - Masih Bersama",
    description: "Dan di hari ini, kita masih bersama. Terima kasih telah menjadi bagian terindah dalam hidupku.",
    image: "/api/placeholder/400/250",
    icon: "💝",
    color: "from-rose-500 to-pink-400",
    category: "present"
  }
];

// Komponen partikel mengambang dengan warna PINK! 💕
const FloatingParticle = ({ delay = 0, duration = 3 }) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  
  useEffect(() => {
    const interval = setInterval(() => {
      setPosition({
        x: Math.random() * 100,
        y: Math.random() * 100
      });
    }, duration * 1000);
    
    return () => clearInterval(interval);
  }, [duration]);
  
  return (
    <div
      className="absolute w-2 h-2 bg-pink-400 rounded-full opacity-70 animate-pulse"
      style={{
        left: `${position.x}%`,
        top: `${position.y}%`,
        animationDelay: `${delay}s`,
        transition: `all ${duration}s ease-in-out`,
        boxShadow: '0 0 10px rgba(236, 72, 153, 0.5)'
      }}
    />
  );
};

// Komponen timeline item dengan efek 3D
const TimelineItem3D = ({ data, index, isVisible, onHover }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const cardRef = useRef(null);
  
  const isEven = index % 2 === 0;
  
  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    setMousePosition({ x, y });
  };
  
  const cardStyle = {
    transform: isHovered 
      ? `perspective(1000px) rotateX(${(mousePosition.y - 150) * 0.1}deg) rotateY(${(mousePosition.x - 200) * 0.1}deg) translateZ(50px)`
      : 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0px)',
    transformStyle: 'preserve-3d'
  };
  
  return (
    <div className={`flex items-center w-full mb-16 ${isEven ? 'flex-row-reverse' : ''} relative`}>
      {/* Efek cahaya latar */}
      <div className="absolute inset-0 pointer-events-none">
        <div className={`absolute w-96 h-96 bg-gradient-to-r ${data.color} opacity-10 rounded-full blur-3xl 
          ${isEven ? 'right-0' : 'left-0'} top-1/2 transform -translate-y-1/2`} />
      </div>
      
      {/* Content Card dengan efek 3D */}
      <div className="w-full md:w-5/12 relative z-10">
        <div
          ref={cardRef}
          className={`bg-white/90 backdrop-blur-sm p-8 rounded-3xl shadow-2xl 
            transition-all duration-700 ease-out cursor-pointer overflow-hidden relative
            ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-16'}
            ${isHovered ? 'shadow-3xl' : ''}`}
          style={{
            ...cardStyle,
            animationDelay: `${index * 0.2}s`
          }}
          onMouseEnter={() => {
            setIsHovered(true);
            onHover(index);
          }}
          onMouseLeave={() => setIsHovered(false)}
          onMouseMove={handleMouseMove}
        >
          {/* Efek shimmer */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent 
            translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
          
          {/* Kategori badge */}
          <div className={`inline-block px-4 py-2 rounded-full text-sm font-semibold text-white 
            bg-gradient-to-r ${data.color} mb-4 shadow-lg`}>
            {data.category}
          </div>
          
          {/* Tanggal dengan efek glow PINK dan input field */}
          <div className="mb-4">
            <time className="text-sm font-bold text-pink-600 block mb-2 relative">
              <span className="relative z-10">{data.date}</span>
              <div className="absolute inset-0 bg-pink-200 blur-sm opacity-50 rounded" />
            </time>
            
            {/* Input field untuk menulis tanggal khusus */}
            <div className="relative">
              <input
                type="text"
                placeholder="Tulis tanggal spesial kamu disini... 💕"
                className="w-full px-4 py-2 border-2 border-pink-200 rounded-lg focus:border-pink-400 
                  focus:outline-none transition-colors duration-300 text-pink-700 placeholder-pink-300
                  bg-pink-50/50 backdrop-blur-sm"
                style={{
                  background: 'linear-gradient(45deg, rgba(252, 231, 243, 0.5), rgba(253, 242, 248, 0.5))',
                  boxShadow: 'inset 0 2px 4px rgba(236, 72, 153, 0.1)'
                }}
              />
              <div className="absolute right-3 top-2 text-pink-400">✍️</div>
            </div>
          </div>
          
          {/* Judul dengan animasi PINK */}
          <h3 className="text-2xl font-bold mb-4 text-gray-800 relative">
            <span className="relative z-10">{data.title}</span>
            {isHovered && (
              <div className="absolute -inset-2 bg-gradient-to-r from-pink-200 via-rose-200 to-pink-300 rounded-lg blur-md opacity-40 animate-pulse" />
            )}
          </h3>
          
          {/* Gambar dengan efek hover */}
          {data.image && (
            <div className="relative mb-4 group overflow-hidden rounded-2xl">
              <img 
                src={data.image} 
                alt={data.title} 
                className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
          )}
          
          {/* Deskripsi */}
          <p className="text-gray-700 leading-relaxed text-lg">{data.description}</p>
          
          {/* Efek partikel mini PINK */}
          {isHovered && (
            <div className="absolute inset-0 pointer-events-none">
              {[...Array(8)].map((_, i) => (
                <div
                  key={i}
                  className="absolute w-1 h-1 bg-pink-400 rounded-full animate-ping"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                    animationDelay: `${i * 0.1}s`,
                    boxShadow: '0 0 6px rgba(236, 72, 153, 0.8)'
                  }}
                />
              ))}
            </div>
          )}
        </div>
      </div>
      
      {/* Garis tengah dengan animasi PINK */}
      <div className="hidden md:flex items-center justify-center w-2/12 relative">
        <div className="w-1 h-32 bg-gradient-to-b from-pink-400 via-rose-400 to-pink-500 relative overflow-hidden rounded-full">
          <div className="absolute inset-0 bg-gradient-to-b from-white/50 to-transparent animate-pulse" />
          <div className="absolute inset-0 bg-pink-300 blur-sm opacity-30 animate-pulse" />
        </div>
        
        {/* Icon dengan efek 3D PINK */}
        <div className={`absolute w-16 h-16 bg-gradient-to-br ${data.color} text-white text-2xl 
          rounded-full flex items-center justify-center shadow-2xl transition-all duration-500
          ${isHovered ? 'scale-125 rotate-12' : 'scale-100 rotate-0'}`}
          style={{
            transform: isHovered ? 'translateZ(30px) scale(1.25) rotate(12deg)' : 'translateZ(0px) scale(1) rotate(0deg)',
            boxShadow: isHovered ? '0 20px 40px rgba(236, 72, 153, 0.4)' : '0 10px 20px rgba(236, 72, 153, 0.2)'
          }}>
          <span className="relative z-10">{data.icon}</span>
          {isHovered && (
            <div className="absolute inset-0 bg-pink-200/30 rounded-full animate-ping" />
          )}
        </div>
      </div>
      
      <div className="w-full md:w-5/12" />
    </div>
  );
};

// Komponen utama timeline
function Timeline() {
  const [visibleItems, setVisibleItems] = useState(new Set());
  const [hoveredItem, setHoveredItem] = useState(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const timelineRef = useRef(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = parseInt(entry.target.dataset.index);
            setVisibleItems(prev => new Set([...prev, index]));
          }
        });
      },
      { threshold: 0.2 }
    );
    
    const items = document.querySelectorAll('[data-index]');
    items.forEach((item) => observer.observe(item));
    
    return () => observer.disconnect();
  }, []);
  
  useEffect(() => {
    const handleScroll = () => {
      if (timelineRef.current) {
        const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
        const progress = scrollTop / (scrollHeight - clientHeight);
        setScrollProgress(progress);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-rose-50 to-fuchsia-50 relative overflow-hidden">
      {/* Partikel mengambang dengan warna PINK */}
      <div className="fixed inset-0 pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <FloatingParticle key={i} delay={i * 0.2} duration={2 + i * 0.3} />
        ))}
      </div>
      
      {/* Progress bar dengan gradient PINK */}
      <div className="fixed top-0 left-0 w-full h-1 bg-white/20 z-50">
        <div 
          className="h-full bg-gradient-to-r from-pink-400 via-rose-500 to-pink-600 transition-all duration-300 shadow-lg"
          style={{ 
            width: `${scrollProgress * 100}%`,
            boxShadow: '0 0 20px rgba(236, 72, 153, 0.6)'
          }}
        />
      </div>
      
      {/* Header dengan animasi PINK */}
      <div className="text-center py-20 relative z-10">
        <div className="inline-block">
          <h1 className="text-6xl font-bold bg-gradient-to-r from-pink-600 via-rose-600 to-fuchsia-600 
            bg-clip-text text-transparent mb-4 animate-pulse">
            Jejak Langkah Kita
          </h1>
          <div className="w-24 h-1 bg-gradient-to-r from-pink-500 via-rose-500 to-pink-600 mx-auto rounded-full shadow-lg" 
            style={{ boxShadow: '0 0 20px rgba(236, 72, 153, 0.5)' }} />
        </div>
        <p className="text-xl text-gray-600 mt-8 max-w-2xl mx-auto px-4">
          Setiap momen berharga yang kita lalui bersama, terangkai dalam kenangan yang tak terlupakan 🌸✨
        </p>
        
        {/* Tambahan elemen dekoratif PINK */}
        <div className="flex justify-center mt-8 space-x-4">
          <div className="w-3 h-3 bg-pink-400 rounded-full animate-bounce" style={{ animationDelay: '0s' }} />
          <div className="w-3 h-3 bg-rose-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
          <div className="w-3 h-3 bg-pink-500 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }} />
        </div>
      </div>
      
      {/* Timeline container */}
      <div ref={timelineRef} className="container mx-auto px-4 pb-20">
        <div className="flex flex-col items-center relative">
          {timelineData.map((data, index) => (
            <div key={index} data-index={index} className="w-full">
              <TimelineItem3D 
                data={data} 
                index={index} 
                isVisible={visibleItems.has(index)}
                onHover={setHoveredItem}
              />
            </div>
          ))}
        </div>
      </div>
      
      {/* Footer dengan efek cahaya PINK */}
      <div className="text-center py-16 relative">
        <div className="absolute inset-0 bg-gradient-to-t from-pink-100 via-rose-50 to-transparent" />
        <div className="relative z-10">
          <Heart className="w-12 h-12 text-pink-500 mx-auto mb-4 animate-pulse" 
            style={{ filter: 'drop-shadow(0 0 10px rgba(236, 72, 153, 0.5))' }} />
          <p className="text-2xl font-semibold text-gray-700 mb-2">
            Untuk seseorang yang sangat berharga 💕
          </p>
          <p className="text-lg text-gray-600">
            Setiap detik bersamamu adalah hadiah terindah
          </p>
          
          {/* Tambahan input field di footer */}
          <div className="mt-8 max-w-md mx-auto">
            <div className="relative">
              <input
                type="text"
                placeholder="Tulis pesan spesial untuknya... 💌"
                className="w-full px-6 py-3 border-2 border-pink-200 rounded-full focus:border-pink-400 
                  focus:outline-none transition-all duration-300 text-pink-700 placeholder-pink-300
                  bg-pink-50/70 backdrop-blur-sm text-center"
                style={{
                  background: 'linear-gradient(45deg, rgba(252, 231, 243, 0.7), rgba(253, 242, 248, 0.7))',
                  boxShadow: 'inset 0 2px 4px rgba(236, 72, 153, 0.1), 0 0 20px rgba(236, 72, 153, 0.1)'
                }}
              />
              <div className="absolute right-4 top-3 text-pink-400">💝</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Timeline;