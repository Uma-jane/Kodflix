import React from 'react';
import './FeaturedMovie.css';
import { IMAGE_BASE } from '../api/tmdb';

export default function FeaturedMovie({ movie }) {
  if (!movie) return null;

  const background = `${IMAGE_BASE}${movie.backdrop_path || movie.poster_path}`;

  return (
    <div
      className="featured"
      style={{
        backgroundSize: 'cover',
        backgroundImage: `url(${background})`,
        backgroundPosition: 'center center',
      }}
    >
      <div className="featured-contents">
        <h1 className="featured-title">
          {movie.title || movie.name || movie.original_name}
        </h1>
        <div className="featured-buttons">
          <button className="featured-button">Play</button>
          <button className="featured-button">My List</button>
        </div>
        <p className="featured-description">
          {movie.overview && movie.overview.length > 150
            ? movie.overview.slice(0, 150) + '...'
            : movie.overview}
        </p>
      </div>
      <div className="featured-fadeBottom" />
    </div>
  );
}
