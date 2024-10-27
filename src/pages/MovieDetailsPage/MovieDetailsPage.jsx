import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { fetchMovieDetails, fetchMovieCredits, fetchMovieReviews, BASE_IMAGE_URL } from '../../services/api';

const MovieDetailsPage = () => {
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);
  const [cast, setCast] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [showCast, setShowCast] = useState(false);
  const [showReviews, setShowReviews] = useState(false);

  useEffect(() => {
    const loadMovieDetails = async () => {
      const movieData = await fetchMovieDetails(movieId);
      setMovie(movieData);
    };

    loadMovieDetails();
  }, [movieId]);

  const handleShowCast = async () => {
    if (!cast.length) {
      const credits = await fetchMovieCredits(movieId);
      setCast(credits.cast);
    }
    setShowCast(prevState => !prevState); // переключаем видимость кастинга
  };

  const handleShowReviews = async () => {
    if (!reviews.length) {
      const reviewsData = await fetchMovieReviews(movieId);
      setReviews(reviewsData.results);
    }
    setShowReviews(prevState => !prevState); // переключаем видимость отзывов
  };

  if (!movie) return <div>Loading movie details...</div>;

  return (
    <div>
      <Link to="/movies">← Go back</Link>
      <div style={{ display: 'flex', gap: '20px' }}>
        <img 
          src={`${BASE_IMAGE_URL}${movie.poster_path}`} 
          alt={movie.title} 
          width="300" 
        />
        <div>
          <h2>{movie.title} ({new Date(movie.release_date).getFullYear()})</h2>
          <p>User Score: {Math.round(movie.vote_average * 10)}%</p>
          <h3>Overview</h3>
          <p>{movie.overview}</p>
          <h3>Genres</h3>
          <p>{movie.genres.map(genre => genre.name).join(', ')}</p>
        </div>
      </div>

      <div>
        <h3>Additional information</h3>
        <ul>
          <li><button onClick={handleShowCast}>{showCast ? "Hide Cast" : "Show Cast"}</button></li>
          <li><button onClick={handleShowReviews}>{showReviews ? "Hide Reviews" : "Show Reviews"}</button></li>
        </ul>
      </div>

      {showCast && (
        <div id="cast">
          <h3>Cast</h3>
          <ul>
            {cast.map(actor => (
              <li key={actor.id}>
                <p>{actor.name}</p>
                {actor.profile_path ? (
                  <img
                    src={`${BASE_IMAGE_URL}${actor.profile_path}`}
                    alt={`${actor.name}`}
                    width="100"
                  />
                ) : (
                  <p>No image available</p>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}

      {showReviews && (
        <div id="reviews">
          <h3>Reviews</h3>
          {reviews.length ? (
            <ul>
              {reviews.map(review => (
                <li key={review.id}>
                  <h4>{review.author}</h4>
                  <p>{review.content}</p>
                </li>
              ))}
            </ul>
          ) : (
            <p>No reviews found.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default MovieDetailsPage;
