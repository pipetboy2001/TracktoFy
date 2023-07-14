import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./style/index.scss";
import Login from "./components/LoginPage";
import Dashboard from "./components/DashboardPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
