import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/homePage';
import Login from './components/Login';
import SignUp from './components/SignUp';
import ProtectedRoute from './components/ProtectedRoute';
import { FavoriteProvider } from './context/FavoriteContext';

const App: React.FC = () => {
  return (
    <FavoriteProvider>
      <Router>
        <div className="min-h-screen bg-gray-100">
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/" element={<ProtectedRoute><HomePage /></ProtectedRoute>} />
          </Routes>
        </div>
      </Router>
    </FavoriteProvider>
  );
};

export default App;
