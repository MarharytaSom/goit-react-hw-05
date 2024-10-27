import axios from 'axios';

const API_KEY = '70f54cb90e4b493d18567c567a2bd2b4';
const BASE_URL = 'https://api.themoviedb.org/3';
const BASE_IMAGE_URL = 'https://image.tmdb.org/t/p/w500';
const KEY = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3MGY1NGNiOTBlNGI0OTNkMTg1NjdjNTY3YTJiZDJiNCIsIm5iZiI6MTczMDAzNTY5NS43MzUyNjgsInN1YiI6IjY3MWUzN2Q3NGJlMTU0NjllNzBlMTM5ZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.b5GUkZVh_eMCWBXzzsKKPnyxYoCciFrufjHLOyauKYQ'

export const fetchTrendingMovies = async () => {
  const response = await axios.get(`${BASE_URL}/trending/movie/day?api_key=${API_KEY}`);
  return response.data.results;
};

export const searchMovies = async (query) => {
  const response = await axios.get(`${BASE_URL}/search/movie`, {
    params: { api_key: API_KEY, query },
  });
  return response.data.results;
};

export const fetchMovieDetails = async (movieId) => {
  const response = await axios.get(`${BASE_URL}/movie/${movieId}?api_key=${API_KEY}`);
  return response.data;
};

export const fetchMovieCredits = async (movieId) => {
  const response = await axios.get(`${BASE_URL}/movie/${movieId}/credits`, {
    headers: {
      Authorization: `Bearer ${KEY}`,
    },
  });
  return response.data;
};


export const fetchMovieReviews = async (movieId) => {
    const response = await axios.get(`${BASE_URL}/movie/${movieId}/reviews`, {
        headers: {
            Authorization: `Bearer ${KEY}`, 
      
    },
  });
  return response.data;
};


export { BASE_IMAGE_URL };
