import { useEffect, useState } from "react";
import { FaUser, FaMusic, FaListUl, FaHistory,FaHeadphones } from "react-icons/fa";
import { Link } from "react-router-dom";
import axios from "axios";

const Dashboard = () => {
  const [token, setToken] = useState("");
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const hash = window.location.hash;
    let token = window.localStorage.getItem("token");
    // Si no hay token y hay hash, entonces se obtiene el token
    if (!token && hash) {
      token = hash
        .substring(1)
        .split("&")
        .find((elem) => elem.startsWith("access_token"))
        .split("=")[1];
      window.location.hash = "";
      window.localStorage.setItem("token", token); //Se guarda el token en el local storage
    }
    setToken(token);
    if (token) {
      getUserData(token);
    }
  }, []);

  //Funcion para mostrar los datos del usuario
  const getUserData = async (token) => {
    try {
      const { data } = await axios.get("https://api.spotify.com/v1/me", {
        headers: {
          Authorization: `Bearer ${token}`, //Bearer es un tipo de autenticacion
        },
      });
      setUserData(data);
    } catch (error) {
      console.log("Error al obtener los datos del usuario:", error);
    }
  };

  return (
    <>
      {/* Si hay token, se muestran 6 opciones*/}
      {userData && (
        <div className="dashboard-container">
          <div className="dashboard-grid">
            <Link to="/perfil" className="dashboard-item">
              <div className="dashboard-link">
                <FaUser className="dashboard-icon" />
                <span className="dashboard-text">Perfil</span>
              </div>
            </Link>

            <Link to="/playlist" className="dashboard-item">
              <div className="dashboard-link">
                <FaListUl className="dashboard-icon" />
                <span className="dashboard-text">Playlist</span>
              </div>
            </Link>

            <Link to="/top-artists" className="dashboard-item">
              <div className="dashboard-link">
                <FaMusic className="dashboard-icon" />
                <span className="dashboard-text">Top Artistas</span>
              </div>
            </Link>

            <Link to="/top-tracks" className="dashboard-item">
              <div className="dashboard-link">
                <FaMusic className="dashboard-icon" />
                <span className="dashboard-text">Top Canciones</span>
              </div>
            </Link>

            <Link to="/recently-played" className="dashboard-item">
              <div className="dashboard-link">
                <FaHistory className="dashboard-icon" />
                <span className="dashboard-text">Recien escuchadas</span>
              </div>
            </Link>

            <Link to="/top-genres" className="dashboard-item">
              <div className="dashboard-link">
                <FaHeadphones className="dashboard-icon" />
                <span className="dashboard-text">
                  Top Generos
                </span>
              </div>
            </Link>
          </div>
        </div>
      )}
    </>
  );
};

export default Dashboard;
