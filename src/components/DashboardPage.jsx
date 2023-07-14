import { useEffect, useState } from "react";
import axios from "axios";
import Login from "./LoginPage";

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

  //Funcion para desahacerse del token
  const logout = () => {
    setToken("");
    window.localStorage.removeItem("token");
  };

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
        <button onClick={logout}>Logout</button>
      )}

      {/* //Si hay token, se muestra la informacion del usuario */}
      {token && (
        <div>
          {userData ? (
            <div>
              <h2>{userData.display_name}</h2>
              {userData.images.length > 0 && (
                <img
                  src={userData.images[0].url}
                  alt="User Profile"
                  style={{ width: "200px" }}
                />
              )}
            </div>
          ) : (
            <h2>Cargando datos del usuario...</h2>
          )}
        </div>
      )}
    </>
  );
};

export default Dashboard;
