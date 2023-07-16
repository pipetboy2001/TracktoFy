import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const PlaylistList = () => {
  const [playlists, setPlaylists] = useState([]);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);// para mostrar un mensaje de carga

  useEffect(() => {
    const token = window.localStorage.getItem("token");
    if (token) {
      getUserPlaylists(token);
    }
  }, []);

  const getUserPlaylists = async (token) => {
    try {
      let allPlaylists = [];
      let nextUrl = "https://api.spotify.com/v1/me/playlists";

      while (nextUrl) {
        const response = await axios.get(nextUrl, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        allPlaylists = [...allPlaylists, ...response.data.items];
        nextUrl = response.data.next;
      }

      setPlaylists(allPlaylists);
      setIsLoading(false); // luego que carge se deja de mostrar el mensaje de carga
    } catch (error) {
      console.log("Error al obtener las playlists:", error);
      setIsLoading(false); // si hay un error, se deja de mostrar el mensaje de carga
    }
  };

  const viewPlaylistDetails = (playlistId) => {
    navigate(`/playlist/${playlistId}`); // redirecciona a la ruta /playlist/:playlistId
  };

  return (
    <div className="container mt-4">
      <h2>Tus Playlists</h2>
      {isLoading ? (
        <p>Espere un momento...</p>
      ) : (
      <div className="top-playlist">
      <div className="track-list">
        {playlists.map((playlist) => (
          <div
            key={playlist.id}
            className="playlist-item"
            onClick={() => viewPlaylistDetails(playlist.id)}
          >
            <img
              src={playlist.images[0].url}
              alt="Playlist"
              className="playlist-image"
            />
            <p className="playlist-name">{playlist.name}</p>
          </div>
        ))}
        </div>
      </div>
        )}
    </div>
  );
};

export default PlaylistList;
