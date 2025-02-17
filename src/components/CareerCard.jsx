import React, { useState } from 'react';

function CareerCard({ career }) {
  const [showRoadmap, setShowRoadmap] = useState(false);

  return (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
      <h3 className="text-xl font-semibold text-gray-800 mb-2">{career.name}</h3>
      <span className="inline-block bg-blue-100 text-blue-800 text-sm px-3 py-1 rounded-full mb-3">
        {career.category}
      </span>
      <p className="text-gray-600 mb-4">{career.description}</p>
      
      <button
        onClick={() => setShowRoadmap(!showRoadmap)}
        className="text-blue-600 hover:text-blue-800 mb-4 flex items-center"
      >
        {showRoadmap ? 'Hide Career Path' : 'Show Career Path'}
        <svg
          className={`ml-2 h-5 w-5 transform transition-transform ${showRoadmap ? 'rotate-180' : ''}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {showRoadmap && (
        <div className="mb-4">
          <h4 className="font-medium text-gray-700 mb-2">Career Progression:</h4>
          <div className="relative">
            {career.potentialPaths.map((path, index) => (
              <div key={index} className="flex items-start mb-4">
                <div className="flex-shrink-0 w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white">
                  {index + 1}
                </div>
                <div className="ml-4">
                  <p className="text-gray-800 font-medium">{path}</p>
                  {index < career.potentialPaths.length - 1 && (
                    <div className="absolute left-4 w-0.5 h-8 bg-blue-200 -z-10" style={{ top: `${index * 4}rem + 2rem` }} />
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div>
        <h4 className="font-medium text-gray-700 mb-2">Key Skills:</h4>
        <div className="flex flex-wrap gap-2">
          {career.skills.map((skill, index) => (
            <span key={index} className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm">
              {skill}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

export default CareerCard;