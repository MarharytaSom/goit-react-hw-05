import { useState } from 'react';
import { searchMovies, BASE_IMAGE_URL } from '../../services/api';
import { Link } from 'react-router-dom';

const MoviesPage = () => {
  const [query, setQuery] = useState('');
  const [movies, setMovies] = useState([]);

  const handleSearch = async () => {
    const results = await searchMovies(query);
    setMovies(results);
  };

  return (
    <div>
      <input 
        type="text" 
        value={query} 
        onChange={e => setQuery(e.target.value)} 
        placeholder="Search movies" 
      />
      <button onClick={handleSearch}>Search</button>
      <ul>
        {movies.map(movie => (
          <li key={movie.id}>
            <Link to={`/movies/${movie.id}`}>
              <img src={`${BASE_IMAGE_URL}${movie.poster_path}`} alt={movie.title} />
              <h2>{movie.title} ({new Date(movie.release_date).getFullYear()})</h2>
              <p>User Score: {Math.round(movie.vote_average * 10)}%</p>
              <p><strong>Overview:</strong> {movie.overview}</p>
              <p><strong>Genres:</strong> {movie.genre_ids ? movie.genre_ids.join(', ') : 'N/A'}</p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MoviesPage;