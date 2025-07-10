// src/components/Timeline.jsx
import React from 'react';
import { timelineData } from '../data/timelineData';

// Komponen untuk satu item, dengan logika bolak-balik
const TimelineItem = ({ data, index }) => {
  const isEven = index % 2 === 0;
  const itemClasses = `mb-8 flex justify-between items-center w-full ${isEven ? 'flex-row-reverse' : ''}`;

  return (
    <div className={itemClasses}>
      <div className="order-1 w-5/12"></div>
      <div className="z-20 flex items-center order-1 bg-gradient-to-br from-cyan-500 to-blue-600 shadow-xl w-8 h-8 rounded-full">
        <h1 className="mx-auto font-semibold text-lg text-white">{index + 1}</h1>
      </div>
      <div className="order-1 bg-white rounded-lg shadow-xl w-5/12 px-6 py-4">
        <time className="text-xs text-gray-500 mb-1 block">{data.date}</time>
        <h3 className="mb-2 font-bold text-gray-800 text-xl">{data.title}</h3>
        {data.image && <img src={data.image} alt={data.title} className="mb-3 rounded-md w-full" />}
        <p className="text-sm leading-snug tracking-wide text-gray-700">{data.description}</p>
      </div>
    </div>
  );
};

function Timeline() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-gray-800 text-center mb-12">
        Linimasa Kenangan Kita
      </h1>
      <div className="relative wrap overflow-hidden p-10 h-full">
        <div className="border-2-2 absolute border-opacity-20 border-gray-700 h-full border" style={{ left: '50%' }}></div>
        {timelineData.map((data, index) => (
          <TimelineItem data={data} index={index} key={index} />
        ))}
      </div>
    </div>
  )
}

export default Timeline;