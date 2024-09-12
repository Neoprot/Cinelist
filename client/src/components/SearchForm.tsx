import React, { useState } from 'react';
import { FiSearch } from 'react-icons/fi';

interface SearchFormProps {
    initialQuery: string;
    setQuery: (query: string) => void;
    searchMovies: (event: React.FormEvent<HTMLFormElement>, searchQuery: string) => void;
  }
  

const SearchForm: React.FC<SearchFormProps> = ({ initialQuery, setQuery, searchMovies }) => {
  const [localQuery, setLocalQuery] = useState(initialQuery);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setQuery(localQuery);
    searchMovies(e, localQuery);
};


  return (
    <form onSubmit={handleSubmit} className="flex items-center w-full max-w-2xl mx-auto my-4 relative">
      <input
        type="text"
        placeholder="Search for movies..."
        value={localQuery}
        onChange={(e) => setLocalQuery(e.target.value)}
        className="border rounded p-2 rounded-full w-full pr-10 text-black text-lg pl-5 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <button type="submit" className="absolute right-3 top-1/2 transform -translate-y-1/2">
        <FiSearch className="text-gray-500 hover:text-blue-500 cursor-pointer" size={24} />
      </button>
    </form>
  );
};

export default SearchForm;