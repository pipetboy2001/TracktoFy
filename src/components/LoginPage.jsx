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
    <div>
      <button onClick={handleLogin}>Iniciar sesión con Spotify</button>
    </div>
  );
};

export default Login;
