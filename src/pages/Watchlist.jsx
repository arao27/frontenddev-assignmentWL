import { useContext } from "react";
import { MovieContext } from "../contexts/MovieContext";
import MovieCard from "../components/MovieCard";

const Watchlist = () => {
  const { watchlist } = useContext(MovieContext);

  return (
    <div className="watchlist-page">
      <h2>Your Watchlist</h2>
      
      {watchlist.length === 0 ? (
        <p>You haven’t added any movies yet!</p>
      ) : (
        <div className="movie-grid">
          {watchlist.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Watchlist;