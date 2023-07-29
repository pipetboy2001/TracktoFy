import { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useParams } from "react-router-dom";
import "./style/index.scss";
import AuthenticationStatus from "./components/ObtenerAuntenticacion";
import Dashboard from "./components/DashboardPage";
import Perfil from "./components/ProfilePage";
import TopArtista from "./components/TopArtista";
import TopMusic from "./components/TopMusic";
import RecentlyPlayed from "./components/RecienEscuchadas";
import Playlist from "./components/PlaylistPage";
import PlaylistDetails from "./components/PlaylistDetails";
import TopGenero from "./components/TopGenero";
import SubirArriba from "./components/SubirArriba";
import Footer from "./components/FooterPage";

function App() {
  const [token, setToken] = useState("");
  const params = useParams();


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
      window.localStorage.setItem("token", token);
    }
    setToken(token);
  }, []);


  return (
    <Router>
      {/*Login o navbar*/}
      <AuthenticationStatus token={token} /> 
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/perfil" element={<Perfil />} />
        <Route path="/top-artists" element={<TopArtista />} />
        <Route path="/top-tracks" element={<TopMusic />} />
        <Route path="/recently-played" element={<RecentlyPlayed />} />
        <Route path="/top-genres" element={<TopGenero />} />
        <Route path="/playlist" element={<Playlist />} />
        <Route path="/playlist/:playlistId" element={<PlaylistDetails playlistId={params.playlistId} />} />
        <Route path="/*" element={<Dashboard />} />
        <Route path="*" element={<Dashboard />} />
      </Routes>
      <SubirArriba />
      <Footer />
    </Router>
  );
}

export default App;
