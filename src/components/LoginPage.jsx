import { useEffect} from "react";
import spotifyLogo from "../assets/spotify-logo.svg";

const Login = () => {
  const CLIENT_ID = "77f10df7f21e404faf5991c4b9e4be2c";
  const REDIRECT_URI = "http://localhost:5173/dashboard";
  const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize";
  const RESPONSE_TYPE = "token";
  const SCOPES = [
    "user-read-currently-playing",
    "user-read-playback-state",
    "user-read-email",
    "user-read-private",
    "user-top-read",
    "user-read-recently-played",
    "playlist-read-private",
    "playlist-read-collaborative",
    
  ];

  //Se obtiene el token
  useEffect(() => {
    const hash = window.location.hash;
    let token = window.localStorage.getItem("token");
    if (!token && hash) {
      token = hash
        .substring(1)
        .split("&")
        .find((elem) => elem.startsWith("access_token"))
        .split("=")[1];
      window.location.hash = "";
      window.localStorage.setItem("token", token); //Se guarda el token en el local storage
    }
  }, []);

  //Funcion para entrar al autenticador de spotify
  const handleLogin = () => {
    const authUrl = `${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&scope=${SCOPES.join(
      "%20"
    )}&response_type=${RESPONSE_TYPE}&show_dialog=true`;
    window.location.href = authUrl;
  };

  return (
    <div className="login__contenedor">
      <img
        src={spotifyLogo}
        alt="Logo de Spotify"
        className="login__logo-spotify"
      />
      <h1 className="login__texto-spotify-review">Spotify Review</h1>
      <button className="login__boton-inicio-spotify" onClick={handleLogin}>
        Iniciar sesión con Spotify
      </button>
    </div>
  );
};

export default Login;
