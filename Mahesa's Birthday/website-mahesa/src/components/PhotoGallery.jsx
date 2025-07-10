// src/components/PhotoGallery.jsx
import React from 'react';
import { photoData } from '../data/photoData';

function PhotoGallery() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-gray-800 text-center mb-12">
        Galeri Foto
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {photoData.map((imageUrl, index) => (
          <div key={index} className="w-full h-64 bg-gray-300 rounded-lg overflow-hidden">
            <img 
              src={imageUrl} 
              alt={`Gallery item ${index + 1}`} 
              className="w-full h-full object-cover transform hover:scale-110 transition-transform duration-300" 
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default PhotoGallery;