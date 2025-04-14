import React, { useState } from 'react';
import { MapPin, Calendar } from 'lucide-react';

export function ItemCard({ item, onHandover }) {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div
      className="relative w-full max-w-[120px] h-[150px] mx-auto group [transform-style:preserve-3d] transition-transform duration-500"
      onMouseEnter={() => setIsFlipped(true)}
      onMouseLeave={() => setIsFlipped(false)}
    >
      <div
        className={`relative w-full h-full transition-transform duration-500 transform ${
          isFlipped ? 'rotate-y-180' : ''
        }`}
        style={{ transformStyle: 'preserve-3d' }}
      >
        {/* Front Side */}
        <div
          className="absolute inset-0 backface-hidden"
          style={{ backfaceVisibility: 'hidden' }}
        >
          <div className="h-full rounded-lg overflow-hidden shadow bg-white p-1">
            <span className="inline-block px-1 py-0.5 text-[7px] font-semibold text-pink-600 bg-pink-100 rounded">
              {item.category}
            </span>
            <h3 className="mt-0.5 text-[8px] font-semibold text-gray-900 truncate">
              {item.name}
            </h3>
            <div className="mt-0.5 flex items-center text-[7px] text-gray-500">
              <MapPin className="h-2 w-2 mr-0.5" />
              {item.location}
            </div>
            <div className="mt-0.5 flex items-center text-[7px] text-gray-500">
              <Calendar className="h-2 w-2 mr-0.5" />
              {item.date}
            </div>
          </div>
        </div>

        {/* Back Side */}
        <div
          className="absolute inset-0 backface-hidden transform rotate-y-180"
          style={{ backfaceVisibility: 'hidden' }}
        >
          <div className="h-full rounded-lg overflow-hidden shadow bg-white p-1 flex flex-col justify-between">
            <div>
              <h3 className="text-[8px] font-semibold text-gray-900 mb-0.5">
                Description
              </h3>
              <p className="text-[7px] text-gray-600 line-clamp-3">
                {item.description}
              </p>
            </div>
            <button
              className="w-full mt-1 bg-blue-600 text-white py-0.5 text-[8px] rounded hover:bg-blue-700 transition-colors"
              onClick={() => onHandover(item)} // <- Send whole item
            >
              Handover
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
