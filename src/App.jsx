import { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./style/index.scss";
import AuthenticationStatus from "./components/ObtenerAuntenticacion";
import Dashboard from "./components/DashboardPage";
import Perfil from "./components/ProfilePage";
import TopArtista from "./components/TopArtista";
import TopMusic from "./components/TopMusic";

function App() {
  const [token, setToken] = useState("");

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

  const logout = () => {
    setToken("");
    window.localStorage.removeItem("token");
  };

  return (
    <Router>
      {/*Login o navbar*/}
      <AuthenticationStatus token={token} logout={logout} /> 
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/perfil" element={<Perfil />} />
        <Route path="/top-artists" element={<TopArtista />} />
        <Route path="/top-tracks" element={<TopMusic />} />

        <Route path="/*" element={<Dashboard />} />
        <Route path="/:temaId" element={<Dashboard />}/>
        <Route path="*" element={<Dashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
