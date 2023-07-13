import spotifyLogo from "../assets/spotify-logo.svg";

const Login = () => {
  const handleLogin = () => {
    const clientID = "77f10df7f21e404faf5991c4b9e4be2c"; 
    const redirectURI = encodeURIComponent(
      "https://spotify-review.vercel.app/"
    );
    const authURL = `https://accounts.spotify.com/authorize?client_id=${clientID}&response_type=code&redirect_uri=${redirectURI}`;
    window.location.href = authURL;
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
