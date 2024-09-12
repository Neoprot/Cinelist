import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import FavoritesPage from './pages/FavoritesPage';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import SearchPage from './pages/SearchPage';
import ProtectedRoute from './components/auth/ProtectedRoute';
import { AuthProvider } from './context/AuthContext';
import { FavoritesProvider } from './context/FavoritesContext';
import SharedFavoritesPage from './pages/SharedFavoritesPage';
import MovieDetailsPage from './pages/MovieDetailsPage';

const App: React.FC = () => {
  return (
    <AuthProvider>
      <FavoritesProvider>
        <Router>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/search" element={<SearchPage />} />
            <Route
              path="/favorites"
              element={
                <ProtectedRoute>
                  <FavoritesPage />
                </ProtectedRoute>
              }
            />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignUpPage />} />
            <Route path="/shared-favorites/:id" element={<SharedFavoritesPage />} />
            <Route path="/movie/:id" element={<MovieDetailsPage />} />
          </Routes>
        </Router>
      </FavoritesProvider>
    </AuthProvider>
  );
};

export default App;