import React from 'react';
import MovieSearch from '../components/MovieSearch';
import MovieList from '../components/MovieList';

const HomePage: React.FC = () => {
    return (
        <div>
        <MovieSearch />
        <MovieList movies={[]} /> {/* Substitua com a lógica correta para listar filmes */}
        </div>
    );
};

export default HomePage;
