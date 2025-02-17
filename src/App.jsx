import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from "react-router-dom";
import { TestProvider } from "./context/TestContext";
import { useAuth } from "./context/AuthContext";
import Home from "./pages/Home";
import CareerExploration from "./pages/CareerExploration";
import PersonalityTest from "./pages/PersonalityTest";
import Results from "./pages/Results";
import TestAnalytics from "./pages/TestAnalytics";
import AuthPage from "./pages/AuthPage";
import { LogIn, Menu, X } from "lucide-react";

function App() {
  const { isLoggedIn, setIsLoggedIn } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const ProtectedRoute = ({ children }) => {
    if (!isLoggedIn) {
      return <Navigate to="/auth" />;
    }
    return children;
  };

  return (
    <Router>
      <TestProvider>
        <div className="min-h-screen bg-gray-50">
          <nav className="bg-white shadow-sm">
            <div className="max-w-6xl mx-auto px-4">
              <div className="flex justify-between h-16">
                <div className="flex items-center">
                  <Link to="/" className="flex-shrink-0">
                    <span className="text-xl font-bold text-blue-600">CareerGuide</span>
                  </Link>
                  <div className="hidden md:ml-8 md:flex md:space-x-8">
                    <Link to="/explore" className="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium">
                      Explore Careers
                    </Link>
                    <Link to="/test" className="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium">
                      Take Test
                    </Link>
                    <Link to="/analysis" className="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium">
                      Test Analytics
                    </Link>
                  </div>
                </div>

                <div className="flex items-center">
                  {isLoggedIn ? (
                    <button
                      onClick={() => setIsLoggedIn(false)}
                      className="ml-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
                    >
                      Sign Out
                    </button>
                  ) : (
                    <Link
                      to="/auth"
                      className="ml-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
                    >
                      <LogIn className="w-4 h-4 mr-2" />
                      Sign In
                    </Link>
                  )}

                  <button
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    className="md:hidden ml-4 inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100"
                  >
                    {isMobileMenuOpen ? <X className="block h-6 w-6" /> : <Menu className="block h-6 w-6" />}
                  </button>
                </div>
              </div>
            </div>
          </nav>

          <main>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/explore" element={<CareerExploration />} />
              <Route path="/test" element={<ProtectedRoute><PersonalityTest /></ProtectedRoute>} />
              <Route path="/results" element={<ProtectedRoute><Results /></ProtectedRoute>} />
              <Route path="/analysis" element={<ProtectedRoute><TestAnalytics /></ProtectedRoute>} />
              <Route path="/auth" element={<AuthPage />} />
            </Routes>
          </main>
        </div>
      </TestProvider>
    </Router>
  );
}

export default App;
