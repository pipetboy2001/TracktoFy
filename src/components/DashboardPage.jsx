import { useEffect, useState } from "react";
import { FaUser, FaMusic, FaListUl,FaHistory, FaPlus } from "react-icons/fa";
import axios from "axios";
import Login from "./LoginPage";
import HeaderNav from "./HeaderNav";

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
      {!token ? (
        //Si no hay token, se muestra el boton de login
        <Login />
      ) : (
        <HeaderNav />
      )}

      {/* Si hay token, se muestran 6 opciones*/}

      {userData && (
        <div className="dashboard-container">
        <div className="dashboard-grid">
          <div className="dashboard-item">
            <FaUser className="dashboard-icon" />
             Perfil
          </div>
          <div className="dashboard-item">
            <FaListUl className="dashboard-icon" />
             Playlist
          </div>
          <div className="dashboard-item">
            <FaMusic className="dashboard-icon" />
             Tu Top Artistas
          </div>
          <div className="dashboard-item">
            <FaMusic className="dashboard-icon" />
             Tu Top Canciones
          </div>
          <div className="dashboard-item">
            <FaHistory className="dashboard-icon" />
             Recien escuchadas
          </div>
          <div className="dashboard-item">
            <FaPlus className="dashboard-icon" />
            Crear Playlist personalizada
          </div>
        </div>
      </div>
      )}
    </>
  );
};

export default Dashboard;
