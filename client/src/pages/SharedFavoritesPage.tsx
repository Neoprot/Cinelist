import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { getSharedFavorites } from '../services/api';
import MovieDetails from '../components/MovieDetails';
import { useAuth } from '../context/AuthContext';
import LoadingModal from '../components/modals/LoadingModal';

const SharedFavoritesPage: React.FC = () => {
  const { id } = useParams();
  const [movies, setMovies] = useState<any[]>([]);
  const { user, logout } = useAuth();
  const [username, setUsername] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        if (!id) {
          setIsLoading(true);
          setError(true);
          setMessage('No id provided to fetch shared favorites');
          setTimeout(() => {
            setIsLoading(false);
            navigate('/');
          }, 2000);
          return;
        }
        const response = await getSharedFavorites(id);
        setUsername(response.username);
        const movieIds = response.movie_ids;
        setMovies(movieIds);
      } catch (error) {
        setIsLoading(true);
        setError(true);
        setMessage('User not found, please check the link or if the user exported the favorites. Redirecting to home page...');
        setTimeout(() => {
          setIsLoading(false);
          navigate('/');
        }, 4000);
      }
    };


    fetchFavorites();
    
  }, [navigate, id, user]);



  return (
    <div className="min-h-screen flex flex-col bg-gray-900 text-white">
      <header className="px-20 py-6 bg-blue-500 text-white flex justify-between items-center">
        <Link to="/">
          <img src="/logo.png" alt="Logo" className="h-16" />
        </Link>
        <h1 className="text-4xl font-bold font-serif">Favorites of {username}</h1>

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
        <p>© 2024 Cinelist. All rights reserved.</p>
      </footer>

      <LoadingModal isLoading={isLoading} message={message} error={error} success={success}></LoadingModal>
    </div>
  );
};

export default SharedFavoritesPage;