import { useEffect, useState } from "react";
import axios from "axios";
import { FaArrowRight } from "react-icons/fa";
import { BsMusicNoteList } from "react-icons/bs";

const ProfilePage = () => {
  const [topGenres, setTopGenres] = useState([]);
  const [selectedTimeRange, setSelectedTimeRange] = useState("short_term");

  useEffect(() => {
    const token = window.localStorage.getItem("token");
    if (token) {
      getTopGenres(token, selectedTimeRange);
    }
  }, [selectedTimeRange]);

  //Funcion para obtener los generos mas escuchados
  const getTopGenres = async (token, timeRange) => {
    try {
      const response = await axios.get(
        "https://api.spotify.com/v1/me/top/artists",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          params: {
            time_range: timeRange,
            limit: 50,
          },
        }
      );

      // Se crea un objeto con los generos y la cantidad de veces que aparecen
      // (se obtienen los generos de los artistas y se cuentan)
      const genresCount = response.data.items.reduce((acc, artist) => {
        artist.genres.forEach((genre) => {
          acc[genre] = (acc[genre] || 0) + 1;
        });
        return acc;
      }, {});

      // Se ordenan los generos de mayor a menor
      const sortedGenres = Object.keys(genresCount)
        .map((genre) => ({
          genre,
          count: genresCount[genre],
        }))
        // Se ordenan los generos de mayor a menor
        .sort((a, b) => b.count - a.count);

      // Se obtienen los primeros generos
      const topGenres = sortedGenres
        .slice(0, 10) // Se obtienen los 10 primeros generos
        .map((genreObj) => genreObj.genre);
      setTopGenres(topGenres);
    } catch (error) {
      console.log("Error al obtener los géneros más escuchados:", error);
    }
  };

  //obtener el rango de tiempo
  const handleTimeRangeChange = (timeRange) => {
    setSelectedTimeRange(timeRange);
  };

  const getPlaylistUrl = (genre) => {
    // Obtiene la URL de la lista de reproducción de Spotify para el género especificado
    const playlistUrl = `https://open.spotify.com/search/the%20sound%20of%20${genre}`;
    return playlistUrl;
  };

  return (
    <div className="container mt-4">
      <div className="profile-container">
        <div className="top-genres">
          <h1>Géneros más escuchados:</h1>
          <div className="time-range-buttons">
            <button
              className={`time-range-button ${
                selectedTimeRange === "short_term" ? "" : "inactive"
              }`}
              onClick={() => handleTimeRangeChange("short_term")}
            >
              Ultimas 4 semanas
            </button>
            <button
              className={`time-range-button ${
                selectedTimeRange === "medium_term" ? "" : "inactive"
              }`}
              onClick={() => handleTimeRangeChange("medium_term")}
            >
              Ultimos 6 meses
            </button>
            <button
              className={`time-range-button ${
                selectedTimeRange === "long_term" ? "" : "inactive"
              }`}
              onClick={() => handleTimeRangeChange("long_term")}
            >
              De todo el tiempo
            </button>
          </div>
          <div className="genres-list">
            {topGenres.length > 0 && (
              <ul>
                {topGenres.map((genre, index) => (
                  <li key={index} className="genres-list__item" href={getPlaylistUrl(genre)}>
                  {index + 1}.-  {/*//para mostrar el numero de genero */}
                   {genre}
                    <a
                      href={getPlaylistUrl(genre)}
                      target="_blank"
                      rel="noreferrer"
                      className="genres-list__item__playlist-link genres-list__item__playlist-link--with-icon"
                    >
                      <FaArrowRight />
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
