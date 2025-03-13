import React, { useState, useEffect } from 'react';
import { questions } from '../data/questions';
import QuestionCard from '../components/QuestionCard';
import { useTest } from '../context/TestContext';
import LoadingSpinner from '../components/LoadingSpinner';
import Snackbar from '../components/Snackbar';
import { useNavigate } from 'react-router-dom';

const PersonalityTest = ({ setNavbarVisible }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate()
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    type: 'error'
  });
  const { answers, setAnswers, calculateRecommendations } = useTest();

  // Function to enter fullscreen
  const enterFullscreen = () => {
    if (document.documentElement.requestFullscreen) {
      document.documentElement.requestFullscreen();
    }
  };

  // Function to exit fullscreen
  const exitFullscreen = () => {
    if (document.fullscreenElement) {
      document.exitFullscreen();
    }
  };

  // Listen for fullscreen change and tab visibility change
  useEffect(() => {
    enterFullscreen(); // Enter fullscreen on component mount

    const handleFullscreenChange = () => {
      if (!document.fullscreenElement) {
        window.location.href = '/'; // Redirect to home if fullscreen is exited
      }
    };

    const handleTabChange = () => {
      if (document.visibilityState === 'hidden') {
        window.location.href = '/'; // Redirect to home if the user switches tabs
      }
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    document.addEventListener('visibilitychange', handleTabChange);

    setNavbarVisible(false); // Hide navbar when the test starts

    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
      document.removeEventListener('visibilitychange', handleTabChange);
      exitFullscreen(); // Ensure fullscreen exits on unmount
      setNavbarVisible(true); // Show navbar when the test ends
    };
  }, [setNavbarVisible]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (Object.keys(answers).length < questions.length) {
      setSnackbar({
        open: true,
        message: 'Please answer all questions before submitting.',
        type: 'error'
      });
      return;
    }

    setIsSubmitting(true);

    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    calculateRecommendations();

    setAnswers({}); // Clear form state after submission
    exitFullscreen(); // Exit fullscreen when submitting
    setIsSubmitting(false);
    navigate('/results');
  };

  const handleCloseSnackbar = () => {
    setSnackbar(prev => ({ ...prev, open: false }));
  };

  if (isSubmitting) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-12">
        <LoadingSpinner />
        <p className="text-center mt-4 text-gray-600">Processing your responses...</p>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Personality Test</h1>
      <form onSubmit={handleSubmit}>
        {questions.map(question => (
          <QuestionCard key={question.id} question={question} />
        ))}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors"
        >
          Submit Answers
        </button>
      </form>
      
      <Snackbar
        message={snackbar.message}
        isOpen={snackbar.open}
        onClose={handleCloseSnackbar}
        type={snackbar.type}
      />
    </div>
  );
};

export default PersonalityTest;