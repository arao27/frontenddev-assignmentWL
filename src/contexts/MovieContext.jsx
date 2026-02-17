import { createContext, useState, useEffect } from "react";

// Create the Context
export const MovieContext = createContext();

// Provider component
export const MovieProvider = ({ children }) => {
  // Watchlist state
  const [watchlist, setWatchlist] = useState([]);

  // Load watchlist from localStorage when app starts
  useEffect(() => {
    const stored = localStorage.getItem("watchlist");
    if (stored) {
      setWatchlist(JSON.parse(stored));
    }
  }, []);

  // Save watchlist to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("watchlist", JSON.stringify(watchlist));
  }, [watchlist]);

  // Add movie to watchlist
  const addToWatchlist = (movie) => {
    // Avoid duplicates
    if (!watchlist.some((m) => m.id === movie.id)) {
      setWatchlist([...watchlist, movie]);
    }
  };

  // Remove movie from watchlist
  const removeFromWatchlist = (movieId) => {
    setWatchlist(watchlist.filter((m) => m.id !== movieId));
  };

  // Provide context value
  return (
    <MovieContext.Provider
      value={{ watchlist, addToWatchlist, removeFromWatchlist }}
    >
      {children}
    </MovieContext.Provider>
  );
};