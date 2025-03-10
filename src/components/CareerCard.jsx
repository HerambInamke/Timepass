import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function CareerCard({ career }) {
  const [activeTab, setActiveTab] = useState('skills');
  const navigate = useNavigate();

  const handleTakeTest = () => {
    navigate(`/skill-assessment/instructions/${career.id}`);
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow w-full">
      {/* Card Header - More horizontal layout */}
      <div className="p-6 border-b border-gray-100 flex flex-col md:flex-row md:items-center md:justify-between">
        <div className="mb-4 md:mb-0 md:mr-8 md:flex-1">
          <div className="flex items-center mb-2">
            <h3 className="text-2xl font-semibold text-gray-800 mr-3">{career.name}</h3>
            <span className="inline-block bg-blue-100 text-blue-800 text-sm px-3 py-1 rounded-full">
              {career.category}
            </span>
          </div>
          <p className="text-gray-600">{career.description}</p>
        </div>
        
        {/* Take A Test button */}
        <div className="flex-shrink-0">
          <button 
            className="px-3 py-2.5 bg-green-600 text-white font-medium rounded-md hover:bg-green-700 transition-colors flex items-center"
            onClick={handleTakeTest}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
            Take A Test
          </button>
        </div>
      </div>

      {/* Tab buttons moved below header */}
      <div className="flex justify-start border-b border-gray-200 bg-gray-50">
        <button
          onClick={() => setActiveTab('skills')}
          className={`px-6 py-3 text-sm font-medium transition-colors ${
            activeTab === 'skills'
              ? 'border-b-2 border-blue-500 text-blue-600'
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          Key Skills
        </button>
        <button
          onClick={() => setActiveTab('path')}
          className={`px-6 py-3 text-sm font-medium transition-colors ${
            activeTab === 'path'
              ? 'border-b-2 border-blue-500 text-blue-600'
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          Career Path
        </button>
        <button
          onClick={() => setActiveTab('roadmap')}
          className={`px-6 py-3 text-sm font-medium transition-colors ${
            activeTab === 'roadmap'
              ? 'border-b-2 border-blue-500 text-blue-600'
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          Learning Roadmap
        </button>
      </div>

      {/* Tab Content */}
      <div className="p-6">
        {/* Skills Tab */}
        {activeTab === 'skills' && (
          <div>
            <h4 className="font-medium text-gray-700 mb-3">Key Skills:</h4>
            <div className="flex flex-wrap gap-2">
              {career.skills.map((skill, index) => (
                <span key={index} className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm">
                  {skill}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Career Path Tab - Timeline layout */}
        {activeTab === 'path' && (
          <div>
            <h4 className="font-medium text-gray-700 mb-6">Career Progression:</h4>
            <div className="relative">
              {/* Horizontal line */}
              <div className="absolute left-0 right-0 h-0.5 bg-blue-300 top-6 z-0"></div>
              
              {/* Timeline items */}
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                {career.potentialPaths.map((path, index) => (
                  <div key={index} className="flex flex-col items-center text-center">
                    {/* Circle with number */}
                    <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center text-white font-medium text-lg mb-3 z-10">
                      {index + 1}
                    </div>
                    {/* Path name */}
                    <h5 className="font-medium text-gray-800 mb-1">{path}</h5>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Roadmap Tab - Timeline layout */}
        {activeTab === 'roadmap' && (
          <div>
            <h4 className="font-medium text-gray-700 mb-6">Learning Roadmap:</h4>
            <div className="relative">
              {/* Horizontal line */}
              <div className="absolute left-0 right-0 h-0.5 bg-green-300 top-6 z-0"></div>
              
              {/* Timeline items */}
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                {career.roadmap && career.roadmap.map((step, index) => (
                  <div key={index} className="flex flex-col items-center text-center">
                    {/* Circle with number */}
                    <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center text-white font-medium text-lg mb-3 z-10">
                      {index + 1}
                    </div>
                    {/* Step description */}
                    <p className="text-gray-800 text-sm">{step}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default CareerCard;