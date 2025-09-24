import React from "react";

function ResultsCard({ item, type }) {
  const name = item.name;
  const artists = item.artists;

  const imageUrl =
    item.album?.images?.[0]?.url || item.images?.[0]?.url || null;

  return (
    <div className="results-card" style={styles.card}>
      <h2>Search Results</h2>
      <br />
      {imageUrl && (
        <img src={imageUrl} alt={name} style={styles.image} />
      )}
      ;
      
      <div className="results-list" style={styles.list}>
        <div className="results-item" style={styles.listItem}>
          <h3>{name}</h3>
          {artists && (
            <p>
              Artist:
              {artists.map((artist) => {
                return artist.name + " ";
              })}
            </p>
          )}
          {item.album && (
            <p>
              Album:
              {item.album.name}
            </p>
          )}
          {(item.total_tracks || item.followers) && (
            <p>Total of Tracks: {item.total_tracks}</p>
          )}{" "}
          {item.followers && <p>Total Followers: {item.followers.total}</p>}
          {item.type && <p>Type: {item.type}</p>}
        </div>
      </div>
      {item.external_urls?.spotify && (
        <a
          href={item.external_urls.spotify}
          rel="noopener noreferrer"
          style={styles.link}
        >
          Open in Spotify
        </a>
      )}
    </div>
  );
}

export default ResultsCard;

const styles = {
  card: {
    border: "1px solid #ccc",
    borderRadius: "8px",
    padding: "18px",
    margin: "10px",
    width: "300px",
    textAlign: "center",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  },
  list: {
    listStyleType: "none",
    padding: 0,
    margin: 0,
  },
  listItem: {
    marginBottom: "1px solid #eee",
    padding: "10px 0",
  },
  image: {
    width: "100px",
    height: "100px",
    borderRadius: "50%",
    marginBottom: "10px",
  },
  link: {
    display: "inline-block",
    marginTop: "10px",
    color: "#1DB954",
    backgroundColor: "fff",
    textDecoration: "none",
    fontWeight: "bold",
  },
};
