import React from 'react';

const SkillAssessmentResults = ({ result, career }) => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Your Skill Assessment Results</h1>
      <div className="bg-white rounded-lg shadow-md p-8">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Your Score: {result.percentage}%</h2>
          <p className="text-gray-600 mt-2">You answered {result.correctCount} out of {result.totalQuestions} questions correctly.</p>
        </div>
        
        <h3 className="text-lg font-medium text-gray-900 mb-4">Skill Gap Analysis</h3>
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
          <h4 className="font-medium text-blue-800 mb-2">Recommended Learning Path:</h4>
          <ul className="list-disc list-inside text-blue-700 space-y-1">
            {career.roadmap && career.roadmap.map((step, index) => (
              <li key={index}>{step}</li>
            ))}
          </ul>
        </div>
        
        <div className="flex justify-end">
          <button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
            Back to Career Exploration
          </button>
        </div>
      </div>
    </div>
  );
};

export default SkillAssessmentResults; 