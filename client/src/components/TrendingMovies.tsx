import { useEffect, useState } from 'react';
import MovieList from './MovieList';
import { getTreadingMovies } from '../services/api';


const TrendingMovies = () => {
    const [trendingMovies, setTrendingMovies] = useState([]);
    const [isDailyTrending, setIsDailyTrending] = useState(false);

    const firstAcess = async () => {
        const trending = await getTreadingMovies("week");
        setTrendingMovies(trending);
    };

    useEffect(() => {
        firstAcess();
    }, []);

    const toggleTrending = async (period: 'day' | 'week') => {
        setIsDailyTrending(period === 'day');
        const trending = await getTreadingMovies(period);
        setTrendingMovies(trending);
    };


    return (
        <div className="mt-8 w-full">
            <div className="flex items-center mb-4 px-4">
                <h1 className="text-4xl font-bold mr-4 text-white font-serif">Trending</h1>
                <div className="flex space-x-2">
                    <button 
                        onClick={() => toggleTrending('day')} 
                        className={`px-4 py-2 rounded ${isDailyTrending ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-700'}`}
                    >
                        Day
                    </button>
                    <button 
                        onClick={() => toggleTrending('week')} 
                        className={`px-4 py-2 rounded ${!isDailyTrending ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-700'}`}
                    >
                        Week
                    </button>
                </div>
            </div>
            <div className="relative">
                <MovieList movies={trendingMovies} />
            </div>
        </div>
    )
}

export default TrendingMovies;