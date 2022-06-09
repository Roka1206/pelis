const API_KEY = "8f781d70654b5a6f2fa69770d1d115a3";

export const fetchApiData = (text: string): Promise<Response> => {
  const API_URL = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${text}&language=es-ES`;
  return fetch(API_URL)
    .then((response) => response.json())
    .catch((error) => console.error(error));
};

export const fetchMovie = (movie_id: string): Promise<Response> => {
  const API_URL = `https://api.themoviedb.org/3/movie/${movie_id}?api_key=${API_KEY}&language=es-ES`;
  return fetch(API_URL)
    .then((response) => response.json())
    .catch((error) => console.error(error));
};