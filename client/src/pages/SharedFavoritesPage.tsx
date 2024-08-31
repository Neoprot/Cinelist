import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { getSharedFavorites } from '../services/api';
import MovieDetails from '../components/MovieDetails';
import { useAuth } from '../context/AuthContext';

const SharedFavoritesPage: React.FC = () => {
  const { id } = useParams();
  const [movies, setMovies] = useState<any[]>([]);
  const { user, logout } = useAuth();
  const [email, setEmail] = useState('');

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        if (!id) {
          return console.error('No id provided to fetch shared favorites');
        }
        const response = await getSharedFavorites(id);
        const movieIds = response.movie_ids;
        setEmail(response.email);
        setMovies(movieIds);
      } catch (error) {
        console.error('Error fetching shared favorites:', error);
      }
    };

    fetchFavorites();
  }, [id]);

  return (
    <div className="min-h-screen flex flex-col bg-gray-900 text-white">
      <header className="px-20 py-6 bg-blue-500 text-white flex justify-between items-center">
        <Link to="/">
          <img src="/logo.png" alt="Logo" className="h-20" />
        </Link>
        <h1 className="text-3xl font-bold">Favorites of {email}</h1>

        <div className="flex items-center space-x-6">
          {user ? (
            <>
              <Link to="/favorites" className="text-white hover:underline">
                My Favorites
              </Link>
              <span className="ml-8">{user.email}</span>
              <button onClick={logout} className="text-white hover:underline">
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="text-white hover:underline">
                Login
              </Link>
              <span>|</span>
              <Link to="/signup" className="text-white hover:underline">
                Sign Up
              </Link>
            </>
          )}
        </div>
      </header>
      <main className="flex-grow px-20 py-8">
        {movies.length === 0 ? (
          <p className='text-lg'>This user doesn't have any favorites yet</p>
        ) : (
          movies.map(movie => (
            <MovieDetails key={movie} movieId={movie} />
          ))
        )}
      </main>
      <footer className="p-4 bg-gray-800 text-white text-center">
        <p>© 2024 Movie App. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default SharedFavoritesPage;