import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const PlaylistDetails = () => {
  const [playlist, setPlaylist] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const params = useParams();
    const playlistId = params.playlistId;


  useEffect(() => {
    const token = window.localStorage.getItem("token");
    if (token) {
      getPlaylistDetails(token);
    }
  }, []);

  //conseguir los detalles de la playslis
  const getPlaylistDetails = async (token) => {
    try {
      const response = await axios.get(
        `https://api.spotify.com/v1/playlists/${playlistId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setPlaylist(response.data);
      setIsLoading(false);
    } catch (error) {
      console.log("Error al obtener los detalles de la playlist:", error);
      setIsLoading(false);
    }
  };

  //si está cargando, muestra un mensaje
  if (isLoading) {
    return <p>Espere...</p>;
  }
  //si no hay playlist, muestra un mensaje
  if (!playlist) {
    return <p>No se encontró la playlist {playlistId} </p>;
  }

  console.log(playlist);

  return (
    <div className="playlist-details">
      <div className="playlist-info">
        <img
          src={playlist.images[0]?.url} // Obtén la URL de la imagen de la playlist
          alt="Playlist Cover"
          className="playlist-cover"
        />
        <h2 className="playlist-name">{playlist.name}</h2>
      </div>

      {/* mostrar los detalles de la playlist */}
      <h3 className="section-title">Canciones</h3>
      <ul className="song-list">
        {/* // Mapea las canciones de la playlist */}
        {playlist.tracks.items.map((item) => (
          <li key={item.track.id} className="song-item">
            <img
              src={item.track.album.images[0]?.url} // Obtén la URL de la imagen de la canción
              alt="Song Cover"
              className="song-cover"
            />
            <div className="song-details">
              <p className="song-name">{item.track.name}</p>
              <p className="song-artist">
                Artista: {item.track.artists[0].name}
              </p>
              <p className="song-album">Álbum: {item.track.album.name}</p>
              
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};



export default PlaylistDetails;
