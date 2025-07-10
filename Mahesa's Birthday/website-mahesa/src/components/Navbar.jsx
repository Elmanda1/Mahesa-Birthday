// src/components/Navbar.jsx
import React from 'react';

function Navbar({ activeView, onNavigate }) {
  const getButtonClasses = (viewName) => {
    const baseClasses = "py-2 px-4 rounded-md text-sm font-medium transition-colors";
    if (activeView === viewName) {
      return `${baseClasses} bg-blue-600 text-white`; // Style untuk tombol aktif
    }
    return `${baseClasses} text-gray-700 hover:bg-blue-100`; // Style untuk tombol non-aktif
  };

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-center space-x-4 h-16">
          <button onClick={() => onNavigate('timeline')} className={getButtonClasses('timeline')}>
            Timeline
          </button>
          <button onClick={() => onNavigate('gallery')} className={getButtonClasses('gallery')}>
            Galeri Foto
          </button>
          {/* Nanti kita bisa tambahkan link "About" di sini */}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;