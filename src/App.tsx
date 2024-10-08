import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { AuthProvider } from "./components/organisms/AuthProvider/AuthProvider";
import { ProtectedRoute } from "./components/organisms/ProtectedRoute/ProtectedRoute";
import SignUp from "./components/templates/SignUp/SignUp";
import SignIn from "./components/templates/SignIn/SignIn";
import Home from "./components/templates/Home/Home";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App: React.FC = () => {
  return (
    <>
      <ToastContainer />
      <Router>
        <AuthProvider>
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
        </AuthProvider>
      </Router>
    </>
  );
};

export default App;
