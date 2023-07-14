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
      const { data } = await axios.get("https://api.spotify.com/v1/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUserData(data);
    } catch (error) {
      console.log("Error al obtener los datos del usuario:", error);
    }
  };

  return (
    <div>
      {userData && (
        <div>
          <h1>{userData.display_name}</h1>
        </div>
      )}
    </div>
  );
};

export default ProfilePage;
