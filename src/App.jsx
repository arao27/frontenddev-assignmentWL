import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";
import Favorites from "./pages/Favorites";
import Watchlist from "./pages/Watchlist"; // NEW
import { MovieProvider } from "./contexts/MovieContext"; // NEW
import { searchMovies } from "./services/movieService";
import "./App.css";

function App() {
  const [searchResults, setSearchResults] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = async (query) => {
    setSearchQuery(query);
    if (!query) {
      setSearchResults([]); // empty query → show popular movies
      return;
    }
    try {
      const results = await searchMovies(query);
      setSearchResults(results);
    } catch (err) {
      console.error("Search error:", err);
      setSearchResults([]);
    }
  };

  return (
    <Router>
      <MovieProvider> {/* WRAP ROUTES */}
        <div className="app">
          <Header onSearch={handleSearch} />
          <Routes>
            <Route
              path="/"
              element={<Home searchResults={searchResults} searchQuery={searchQuery} />}
            />
            <Route path="/favorites" element={<Favorites />} />
            <Route path="/watchlist" element={<Watchlist />} /> {/* NEW ROUTE */}
          </Routes>
        </div>
      </MovieProvider>
    </Router>
  );
}

export default App;