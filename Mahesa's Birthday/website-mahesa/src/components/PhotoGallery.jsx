import React, { useState } from 'react';
import { photoData } from '../data/photoData';

function PhotoGallery() {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const handleMouseEnter = (index) => {
    setHoveredIndex(index);
  };

  const handleMouseLeave = () => {
    setHoveredIndex(null);
  };

  const handleItemClick = (item) => {
    if (item.type === 'video') {
      // Di sini kita akan tambahkan logika untuk menampilkan/memutar video
      alert(`Video akan diputar: ${item.url}`);
      // Nanti Anda bisa mengganti alert ini dengan modal atau pemutar video
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-gray-800 text-center mb-12">
        Galeri Kenangan
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {photoData.map((item, index) => (
          <div 
            key={index} 
            className="relative rounded-lg overflow-hidden shadow-lg cursor-pointer"
            onMouseEnter={() => handleMouseEnter(index)}
            onMouseLeave={handleMouseLeave}
            onClick={() => handleItemClick(item)}
          >
            <img 
              src={item.url} 
              alt={`Gallery item ${index + 1}`} 
              className="w-full h-64 object-cover transform transition-transform duration-300 hover:scale-105" 
            />
            {hoveredIndex === index && item.description && (
              <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-70 text-white p-4">
                <p className="text-sm">{item.description}</p>
              </div>
            )}
            {item.type === 'video' && (
              <div className="absolute top-2 left-2 bg-black bg-opacity-50 text-white rounded-md p-1">
                <span className="text-xs">Video</span>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default PhotoGallery;