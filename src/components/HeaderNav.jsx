import { useEffect, useState } from "react";
import axios from "axios";
import { Navbar, Nav, Image } from "react-bootstrap";
import spotifyLogo from "../assets/spotify-logo.svg";
import Container from 'react-bootstrap/Container';


const HeaderNav = () => {
  const [token, setToken] = useState("");
  const [userData, setUserData] = useState(null);
  const [hideUserName, setHideUserName] = useState(false);

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
    window.location.reload();
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

  // Función para manejar los cambios en el tamaño de la ventana 
  const handleResize = () => { 
    if (window.innerWidth <= 768) { 
      setHideUserName(true); 
    } else { 
      setHideUserName(false); 
    } 
  }; 
 
  useEffect(() => { 
    window.addEventListener("resize", handleResize); 
    handleResize(); // Llama a la función al cargar la página para ajustar la visibilidad inicial del nombre de usuario 
    return () => { 
      window.removeEventListener("resize", handleResize); 
    }; 
  }, []); 

  return (
    <>
    <Navbar bg="dark" variant="dark" data-bs-theme="dark">
      <Container className="d-flex justify-content-between align-items-center">
        <Navbar.Brand href="/">
        <Image
            src={spotifyLogo}
            alt="Logo de Spotify"
            className="header-nav__logo ml-2"
          />
          <span>Spotify Review</span>
        </Navbar.Brand>
        <Nav className="justify-content-center">
          {userData && (
            <>
            {!hideUserName && (
              <>
              <Image
                src={userData.images[0].url}
                alt="Foto de perfil"
                className="header-nav__user-foto mr-2"
              />
              <span className="header-nav__user-nombre">
                {userData.display_name}
              </span>
            </>
          )}
          </>
          )}
        </Nav>
        <Nav>
          <button className="header-nav__logout-btn" onClick={logout}>
            Logout
          </button>
        </Nav>
      </Container>
    </Navbar>
    </>
  );
};

export default HeaderNav;
