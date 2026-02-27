import React, { useEffect, useState } from 'react';
import './App.css';
import Header from './components/Header';
import Row from './components/Row';
import FeaturedMovie from './components/FeaturedMovie';
import { fetchMovies, hasApiKey } from './api/tmdb';

function App() {
  if (!hasApiKey) {
    return (
      <div className="app">
        <Header />
        <div className="error" style={{ padding: '1rem', color: 'red' }}>
          TMDB API key is missing. Define <code>REACT_APP_TMDB_API_KEY</code> in
          your environment and rebuild the app.
        </div>
      </div>
    );
  }
  const [popular, setPopular] = useState([]);
  const [topRated, setTopRated] = useState([]);
  const [upcoming, setUpcoming] = useState([]);
  const [featured, setFeatured] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadAll() {
      try {
        const popularList = await fetchMovies('popular');
        console.log('popularList', popularList);
        setPopular(popularList);
        const topList = await fetchMovies('top_rated');
        setTopRated(topList);
        const upcomingList = await fetchMovies('upcoming');
        setUpcoming(upcomingList);
        // pick a random movie for featured from popular
        const random = popularList[Math.floor(Math.random() * popularList.length)];
        console.log('featured candidate', random);
        setFeatured(random);
      } catch (err) {
        console.error('Error fetching movies', err);
        setError("Failed to load movies. See console.");
      }
    }
    loadAll();
  }, []);

  return (
    <div className="app">
      <Header />
      {error && <div className="error">{error}</div>}
      <main>
        <FeaturedMovie movie={featured} />
        <Row title="Popular" movies={popular} />
        <Row title="Top Rated" movies={topRated} />
        <Row title="Upcoming" movies={upcoming} />
      </main>
    </div>
  );
}

export default App;
