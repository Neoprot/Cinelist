import React, { useRef, useState, useEffect } from 'react';
import MovieCard from './MovieCard';
import { IconButton } from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

interface MovieListProps {
    movies: any[];
}

const MovieList: React.FC<MovieListProps> = ({ movies }) => {
    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const [showScrollLeft, setShowScrollLeft] = useState(false);
    const [showScrollRight, setShowScrollRight] = useState(true);

    useEffect(() => {
        const updateScrollButtons = () => {
            if (scrollContainerRef.current) {
                const container = scrollContainerRef.current;
                const maxScroll = container.scrollWidth - container.clientWidth;
                setShowScrollLeft(container.scrollLeft > 0);
                setShowScrollRight(container.scrollLeft < maxScroll - 1);
            }
        };

        const container = scrollContainerRef.current;
        container?.addEventListener('scroll', updateScrollButtons);
        window.addEventListener('resize', updateScrollButtons);

        updateScrollButtons();

        return () => {
            container?.removeEventListener('scroll', updateScrollButtons);
            window.removeEventListener('resize', updateScrollButtons);
        };
    }, [movies]);

    const scrollLeft = () => {
        if (scrollContainerRef.current) {
            const numberOfMoviesToScroll = 5;
            const movieWidth = scrollContainerRef.current.scrollWidth / movies.length;
            const scrollAmount = movieWidth * numberOfMoviesToScroll;
            scrollContainerRef.current.scrollBy({
                left: -scrollAmount,
                behavior: 'smooth',
            });
        }
    };

    const scrollRight = () => {
        if (scrollContainerRef.current) {
            const numberOfMoviesToScroll = 5;
            const movieWidth = scrollContainerRef.current.scrollWidth / movies.length;
            const scrollAmount = movieWidth * numberOfMoviesToScroll;
            scrollContainerRef.current.scrollBy({
                left: scrollAmount,
                behavior: 'smooth',
            });
        }
    };

    return (
        <div className="relative">
            {showScrollLeft && (
                <button
                    onClick={scrollLeft}
                    className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full z-10"
                >
                    <IconButton color="info">
                        <ArrowBackIcon sx={{ fontSize: 40 }} />
                    </IconButton>
                </button>
            )}
            <div
                className="flex overflow-x-auto space-x-4 p-4 scrollbar-hide"
                ref={scrollContainerRef}
                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none', scrollBehavior: 'smooth' }}
            >
                {movies.map((movie, index) => (
                    <div key={index} style={{ display: 'inline-block', width: '200px' }}>
                        <MovieCard movie={movie} />
                    </div>
                ))}
            </div>
            {showScrollRight && (
                <button
                    onClick={scrollRight}
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full z-10"
                >
                    <IconButton color="info">
                        <ArrowForwardIcon sx={{ fontSize: 40 }} />
                    </IconButton>
                </button>
            )}
        </div>
    );
};

export default MovieList;