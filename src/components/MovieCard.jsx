import { useState, useEffect, useContext } from "react";
import { MovieContext } from "../contexts/MovieContext"; // NEW

function MovieCard({ movie }) {
  const [isFavorite, setIsFavorite] = useState(false);
  const { watchlist, addToWatchlist, removeFromWatchlist } = useContext(MovieContext); // NEW

  // Check favorites
  useEffect(() => {
    const favorites = JSON.parse(localStorage.getItem("favorites") || "[]");
    setIsFavorite(favorites.some((f) => f.id === movie.id));
  }, [movie.id]);

  const toggleFavorite = () => {
    const favorites = JSON.parse(localStorage.getItem("favorites") || "[]");
    if (isFavorite) {
      const updated = favorites.filter((f) => f.id !== movie.id);
      localStorage.setItem("favorites", JSON.stringify(updated));
      setIsFavorite(false);
    } else {
      favorites.push(movie);
      localStorage.setItem("favorites", JSON.stringify(favorites));
      setIsFavorite(true);
    }
  };

  const inWatchlist = watchlist.some((m) => m.id === movie.id); // NEW

  return (
    <div className="movie-card">
      <div className="movie-poster">
        <img
          src={
            movie.poster_path
              ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
              : "https://placehold.co/300x450/667eea/ffffff?text=No+Poster"
          }
          alt={movie.title}
        />
      </div>
      <div className="movie-info">
        <h3 className="movie-title">{movie.title}</h3>
        <div className="movie-details">
          <span className="movie-rating">⭐ {movie.vote_average}</span>
          <span className="movie-year">{movie.release_date?.substring(0, 4)}</span>
        </div>
        <button className="favorite-button" onClick={toggleFavorite}>
          {isFavorite ? "♥ Remove from Favorites" : "♡ Add to Favorites"}
        </button>

        {/* NEW WATCHLIST BUTTON */}
        <button
          className="watchlist-button"
          onClick={() => {
            inWatchlist ? removeFromWatchlist(movie.id) : addToWatchlist(movie);
          }}
        >
          {inWatchlist ? "Remove from Watchlist" : "Add to Watchlist"}
        </button>
      </div>
    </div>
  );
}

export default MovieCard;