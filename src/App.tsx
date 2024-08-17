import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate,  } from 'react-router-dom';
import { AuthProvider } from './components/organisms/AuthProvider/AuthProvider';
import { ProtectedRoute } from './components/organisms/ProtectedRoute/ProtectedRoute';
import SignUp from './components/templates/SignUp/SignUp';
import SignIn from './components/templates/SignIn/SignIn';
import Home from './components/templates/Home/Home';



const App: React.FC = () => {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-gray-100">
          <Routes>
            <Route path="/signup" element={<SignUp />} />
            <Route path="/signin" element={<SignIn />} />
            <Route
              path="/app"
              element={
                <ProtectedRoute>
                  <Home />
                </ProtectedRoute>
              }
            />
            <Route path="/" element={<Navigate to="/signin" replace />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
};

export default App;