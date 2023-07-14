import { useEffect, useState } from "react";
import axios from "axios";

const TopArtista = () => {
  const [userData, setUserData] = useState(null);
  const [topArtists, setTopArtists] = useState([]);
  //const [selectedTimeRange, setSelectedTimeRange] = useState("long_term");
  const [selectedTimeRange, setSelectedTimeRange] = useState("short_term"); // por cual parte

  useEffect(() => {
    const token = window.localStorage.getItem("token");
    if (token) {
      getUserData(token);
      getTopArtists(token, selectedTimeRange);
    }
  }, [selectedTimeRange]);

  // obtener datos del usuario
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

  // obtener artistas segun el tiempo
  const getTopArtists = async (token, timeRange) => {
    try {
      const response = await axios.get(
        `https://api.spotify.com/v1/me/top/artists?time_range=${timeRange}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setTopArtists(response.data.items);
    } catch (error) {
      console.log(`Error al obtener los artistas (${timeRange}):`, error);
    }
  };

  // handle para cambiar el tiempo
  const handleTimeRangeChange = (timeRange) => {
    setSelectedTimeRange(timeRange);
  };

  // redireccionar a perfil de spotify
  const IrPerfilArtista = (artistId) => {
    window.open(`https://open.spotify.com/artist/${artistId}`, "_blank");
  };

  return (
    <div className="container mt-4">
      {userData && (
        <div className="profile-container">
          <div className="top-artists">
            <h2>Top Artistas</h2>
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
            <div className="artist-list">
              {topArtists.map((artist) => (
                <div
                  key={artist.id}
                  className="artist-item"
                  onClick={() => IrPerfilArtista(artist.id)}
                >
                  <img
                    src={artist.images[0].url}
                    alt="Artist"
                    className="artist-image"
                  />
                  <p className="artist-name">{artist.name}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TopArtista;
