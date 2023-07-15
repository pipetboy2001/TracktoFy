import { useEffect, useState } from "react";
import axios from "axios";

const RecentlyPlayed = () => {
  const [recentlyPlayed, setRecentlyPlayed] = useState([]);

  useEffect(() => {
    const token = window.localStorage.getItem("token");
    if (token) {
      getRecentlyPlayed(token);
    }
  }, []);

  const getRecentlyPlayed = async (token) => {
    try {
      const response = await axios.get(
        "https://api.spotify.com/v1/me/player/recently-played",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setRecentlyPlayed(response.data.items);
    } catch (error) {
      console.log("Error al obtener las canciones recientes:", error);
    }
  };

  const openTrack = (trackId) => {
    window.open(`https://open.spotify.com/track/${trackId}`, "_blank");
  };

  return (
    <div className="container mt-4">
    <div className="recently-played-container">
      <h2>Canciones Recientes</h2>
      <div className="recently-played-list">
        {recentlyPlayed.map((item) => (
          <div
            key={item.played_at}
            className="recently-played-item"
            onClick={() => openTrack(item.track.id)}
          >
            <img
              src={item.track.album.images[0].url}
              alt={item.track.name}
              className="recently-played-image"
            />
            <p className="recently-played-name">{item.track.name}</p>
          </div>
        ))}
      </div>
    </div>
    </div>
  );
};

export default RecentlyPlayed;