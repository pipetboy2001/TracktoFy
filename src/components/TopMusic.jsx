import { useEffect, useState } from "react";
import axios from "axios";


const TopTracks = () => {
  const [userData, setUserData] = useState(null);
  const [topTracks, setTopTracks] = useState([]);
  const [selectedTimeRange, setSelectedTimeRange] = useState("short_term");

  useEffect(() => {
    const token = window.localStorage.getItem("token");
    if (token) {
      getUserData(token);
      getTopTracks(token, selectedTimeRange);
    }
  }, [selectedTimeRange]);

  const getUserData = async (token) => {
    try {
      const response = await axios.get("https://api.spotify.com/v1/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUserData(response.data);
    } catch (error) {
      console.log("Error al obtener los datos del usuario:", error);
    }
  };

  const getTopTracks = async (token, timeRange) => {
    try {
      const response = await axios.get(
        `https://api.spotify.com/v1/me/top/tracks?time_range=${timeRange}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setTopTracks(response.data.items);
    } catch (error) {
      console.log(`Error al obtener las canciones (${timeRange}):`, error);
    }
  };

  //obtener el rango de tiempo
  const handleTimeRangeChange = (timeRange) => {
    setSelectedTimeRange(timeRange);
  };

  const IrACancion = (trackId) => {
    window.open(`https://open.spotify.com/track/${trackId}`, "_blank");
  };

  return (
    <div className="container mt-4">
      {userData && (
        <div className="profile-container">
          <div className="top-track">
            <h2>Top Canciones</h2>
            <div className="time-range-buttons">
              <button
                className={`time-range-button ${
                  selectedTimeRange === "short_term" ? "active" : ""
                }`}
                onClick={() => handleTimeRangeChange("short_term")}
              >
                Ultimas 4 semanas
              </button>
              <button
                className={`time-range-button ${
                  selectedTimeRange === "medium_term" ? "active" : ""
                }`}
                onClick={() => handleTimeRangeChange("medium_term")}
              >
                Ultimos 6 meses
              </button>
              <button
                className={`time-range-button ${
                  selectedTimeRange === "long_term" ? "active" : ""
                }`}
                onClick={() => handleTimeRangeChange("long_term")}
              >
                De todo el tiempo
              </button>
            </div>
            <div className="track-list">
              {topTracks.map((track) => (
                <div
                  key={track.id}
                  className="track-item"
                  onClick={() => IrACancion(track.id)}
                >
                  <img
                  src={track.album.images[0].url}
                  alt={track.name}
                  className="track-image"
                />
                  <p className="track-name">{track.name}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TopTracks;
