// src/pages/GalleryPage.jsx
import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Timeline from '../components/Timeline';
import PhotoGallery from '../components/PhotoGallery';

function GalleryPage() {
  // State untuk melacak view mana yang aktif: 'timeline' atau 'gallery'
  const [activeView, setActiveView] = useState('timeline');

  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Tampilkan Navbar, kirim view aktif dan fungsi untuk mengubahnya */}
      <Navbar activeView={activeView} onNavigate={setActiveView} />

      <main>
        {/* Tampilkan komponen berdasarkan state activeView */}
        {activeView === 'timeline' && <Timeline />}
        {activeView === 'gallery' && <PhotoGallery />}
      </main>
    </div>
  );
}

export default GalleryPage;