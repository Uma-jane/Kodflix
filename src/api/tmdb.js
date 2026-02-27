// API key is loaded from environment variable to avoid committing secrets.
// For create-react-app, the variable must start with REACT_APP_ and be defined in
// a .env file (see .env.example).
const API_KEY = process.env.REACT_APP_TMDB_API_KEY;
if (!API_KEY) {
  throw new Error(
    "TMDB API key not found. Please set REACT_APP_TMDB_API_KEY in your environment."
  );
}

const BASE_URL = "https://api.themoviedb.org/3";

// helper to build URL with query params
function buildUrl(path, params = {}) {
  const url = new URL(`${BASE_URL}${path}`);
  url.searchParams.append("api_key", API_KEY);
  Object.entries(params).forEach(([key, value]) => {
    url.searchParams.append(key, value);
  });
  return url.toString();
}

export async function fetchMovies(category = "popular") {
  const path = `/movie/${category}`;
  const url = buildUrl(path, { language: "en-US", page: 1 });
  const res = await fetch(url);
  if (!res.ok) throw new Error(`TMDB fetch failed: ${res.status}`);
  const data = await res.json();
  return data.results;
}

export const IMAGE_BASE = "https://image.tmdb.org/t/p/original";
