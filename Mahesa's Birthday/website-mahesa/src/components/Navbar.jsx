import React, { useState, useEffect } from 'react';
import { Menu, X, Sparkles } from 'lucide-react';

function Navbar({ activeView, onNavigate }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'timeline', label: 'Timeline' },
    { id: 'gallery', label: 'Galeri Foto' }
  ];

  // Detect scroll to add extra blur effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const getButtonClasses = (viewName) => {
    const baseClasses = "relative py-2.5 px-5 rounded-full text-sm font-semibold transition-all duration-300 group";
    if (activeView === viewName) {
      return `${baseClasses} bg-gradient-to-r from-pink-500 to-pink-600 text-white shadow-lg transform scale-105`;
    }
    return `${baseClasses} text-pink-600 hover:text-white hover:bg-gradient-to-r hover:from-pink-400 hover:to-pink-500 hover:scale-105 hover:shadow-md`;
  };

  const getMobileButtonClasses = (viewName) => {
    const baseClasses = "w-full py-3 px-4 rounded-2xl text-left font-semibold transition-all duration-300 flex items-center gap-3";
    if (activeView === viewName) {
      return `${baseClasses} bg-gradient-to-r from-pink-500 to-pink-600 text-white shadow-lg`;
    }
    return `${baseClasses} text-pink-700 hover:text-white hover:bg-gradient-to-r hover:from-pink-400 hover:to-pink-500`;
  };

  const handleNavigation = (view) => {
    onNavigate(view);
    setIsMobileMenuOpen(false);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <>
      {/* Floating Navbar */}
      <nav className={`fixed top-4 left-1/2 transform -translate-x-1/2 z-50 transition-all duration-500 ${
        isScrolled ? 'top-2' : 'top-4'
      }`}>
        <div className={`bg-white/80 backdrop-blur-xl rounded-full border border-white/20 shadow-xl transition-all duration-300 ${
          isScrolled ? 'shadow-2xl bg-white/90' : 'shadow-xl'
        }`}>
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center px-2 py-2">
            {navItems.map(({ id, label }) => (
              <button
                key={id}
                onClick={() => handleNavigation(id)}
                className={getButtonClasses(id)}
                aria-label={`Navigate to ${label}`}
              >
                <span>{label}</span>
                {activeView === id && (
                  <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-white rounded-full animate-pulse"></div>
                )}
              </button>
            ))}
            
            {/* Birthday sparkle decoration */}
            <div className="ml-3 flex items-center space-x-1">
              <Sparkles className="text-pink-400 animate-pulse" size={16} />
              <span className="text-xs text-gray-500 font-medium">🎂</span>
            </div>
          </div>

          {/* Mobile Navigation */}
          <div className="md:hidden flex items-center justify-between px-4 py-3">
            <div className="flex items-center space-x-2">
              <span className="text-sm font-semibold text-pink-700">Menu</span>
              <span className="text-xs">🎉</span>
            </div>
            <button
              onClick={toggleMobileMenu}
              className="p-1 rounded-full text-pink-600 hover:text-pink-500 hover:bg-pink-50 transition-colors duration-300"
              aria-label="Toggle mobile menu"
            >
              {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Floating particles around navbar */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-2 -left-2 w-1 h-1 bg-pink-400/60 rounded-full animate-ping"></div>
          <div className="absolute -top-1 -right-3 w-1 h-1 bg-pink-500/60 rounded-full animate-ping animation-delay-1000"></div>
          <div className="absolute -bottom-2 left-1/3 w-1 h-1 bg-pink-300/60 rounded-full animate-ping animation-delay-2000"></div>
        </div>
      </nav>

      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-40 md:hidden">
          <div className="absolute inset-0 bg-black/20 backdrop-blur-sm" onClick={toggleMobileMenu}></div>
          <div className="absolute top-20 left-1/2 transform -translate-x-1/2 w-80 max-w-[90vw]">
            <div className="bg-white/95 backdrop-blur-xl rounded-3xl border border-white/20 shadow-2xl p-6">
              <div className="flex flex-col space-y-3">
                {navItems.map(({ id, label }) => (
                  <button
                    key={id}
                    onClick={() => handleNavigation(id)}
                    className={getMobileButtonClasses(id)}
                    aria-label={`Navigate to ${label}`}
                  >
                    <span>{label}</span>
                  </button>
                ))}
              </div>
              
              {/* Birthday message in mobile menu */}
              <div className="mt-6 pt-4 border-t border-gray-200/50 text-center">
                <div className="flex items-center justify-center space-x-2">
                  <Sparkles className="text-pink-400 animate-pulse" size={16} />
                  <span className="text-sm text-gray-600 font-medium">Happy Birthday! 🎂</span>
                  <Sparkles className="text-pink-400 animate-pulse" size={16} />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Add some spacing so content doesn't hide behind navbar */}
      <div className="h-20"></div>
    </>
  );
}

export default Navbar;