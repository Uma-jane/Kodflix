// API key is loaded from an environment variable so it isn't committed.
// For create-react-app the name must start with REACT_APP_ and be present when
// the app is built (see `.env.example`).
const API_KEY = process.env.REACT_APP_TMDB_API_KEY || '';

export const hasApiKey = !!API_KEY;

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
  if (!API_KEY) {
    // without a key we can't request the API; return empty array so components
    // can render gracefully and we can show a warning elsewhere.
    console.warn(`fetchMovies called without TMDB API key (category=${category})`);
    return [];
  }

  const path = `/movie/${category}`;
  const url = buildUrl(path, { language: "en-US", page: 1 });
  const res = await fetch(url);
  if (!res.ok) throw new Error(`TMDB fetch failed: ${res.status}`);
  const data = await res.json();
  return data.results;
}

export const IMAGE_BASE = "https://image.tmdb.org/t/p/original";
