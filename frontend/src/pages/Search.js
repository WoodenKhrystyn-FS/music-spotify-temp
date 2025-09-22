import React, { useState } from "react";
import NavBar from "../components/NavBar";
import ResultsCard from "../components/ResultsCard";

function Search() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [error, setError] = useState(null);

  const handleSearch = async (e) => {
    e.preventDefault();
    setError("");
    setResults([]);

    if (!query) {
      setError("Plese enter search input");
      return;
    }
    try {
      const response = await fetch(
        `http://localhost:3000/spotify/search?q=${query}&type=track,album,artist&limit=10`,
        {
          method: "GET",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || "No results found");
        return;
      }

      //Putting all results into one array:
      const combinedResults = [
        ...(data.tracks?.items || []),
        ...(data.albums?.items || []),
        ...(data.artists?.items || []),
      ];

      setResults(combinedResults);
    } catch (err) {
      setError("Network error, try again later");
    }
  };

  return (
    <div className="search-page" style={styles.container}>
      <NavBar />
      <h1>Search With Spotify</h1>
      <form onSubmit={handleSearch} style={styles.form}>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for tracks, albums, artists..."
          style={styles.input}
        />
        <button type="submit" style={styles.button}>
          Search
        </button>
      </form>
      {error && <p>{error}</p>}
      <ul className="results-list" style={styles.resultsList}>
        {results.map((item) => (
          <li key={item.id}>
            <ResultsCard item={item} type={item.type} />
          </li>
        ))}
      </ul>
    </div>
  );
}
export default Search;

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "100vh",
    backgroundColor: "#f0f0f0",
  },
  button: {
    padding: "10px 20px",
    fontSize: "16px",
    borderRadius: "5px",
    border: "1px solid #444",
    marginRight: "10px",
    width: "100px",
    backgroundColor: "#1DB954",
    color: "white",
    cursor: "pointer",
  },
  input: {
    marginRight: "10px",
    padding: "10px",
    fontSize: "16px",
    borderRadius: "8px",
    border: "1px solid #444",
    width: "300px",
  },

  resultsList: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
    gap: "20px",
    width: "80%",
    listStyleType: "none",
    padding: 0,
    marginTop: "20px",
  },
  form: {
    display: "flex",
    alignItems: "center",
    marginBottom: "20px",
  },
};
