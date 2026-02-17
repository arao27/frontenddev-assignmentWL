import { useState } from "react";
import { Link } from "react-router-dom";

function Header({ onSearch }) {
  const [query, setQuery] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(query);
  };

  return (
    <header className="header">
      <div className="header-content">
        {/* Logo / App title links to Home */}
        <Link to="/" className="app-title">MovieShelf</Link>

        {/* Navigation links */}
        <nav className="nav-links">
          <Link to="/favorites" className="nav-link">Favorites</Link>
          <Link to="/watchlist" className="nav-link">Watchlist</Link>
        </nav>

        {/* Search bar */}
        <div className="search-container">
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Search movies..."
              className="search-input"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <button type="submit" className="search-button">Search</button>
          </form>
        </div>
      </div>
    </header>
  );
}

export default Header;