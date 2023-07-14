import { useEffect, useState } from "react";
import axios from "axios";

const ProfilePage = () => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const token = window.localStorage.getItem("token");
    if (token) {
      getUserData(token);
    }
  }, []);

  const getUserData = async (token) => {
    try {
      const response = await axios.get("https://api.spotify.com/v1/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUserData(response.data);
    } catch (error) {
      console.log("Error al obtener los datos del usuario:", error);
    }
  };

  return (
    <div className=" profile-container mt-4">
      {userData && (
        <div className="profile-card">
          <img
            src={userData.images[0].url}
            alt="Profile"
            className="profile-image"
          />
          <h1 className="profile-name">
            <a className="profile-name-link" href={userData.external_urls.spotify}>{userData.display_name}</a>
          </h1>
          <div className="profile-details">
            <p className="profile-followers">
              Seguidores: {userData.followers.total}
            </p>
            <p className="profile-country">Pais: {userData.country}</p>
            <p className="profile-product">Subcripción: {userData.product}</p>
          </div>
        </div>
      )}
    </div>

  );
};

export default ProfilePage;
