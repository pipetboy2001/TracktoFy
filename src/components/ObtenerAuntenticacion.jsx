import React from "react";
import Login from "./LoginPage";
import HeaderNav from "./HeaderNav";

const AuthenticationStatus = ({ token }) => {
  //Si hay token, se muestra el navbar, sino, se muestra el login
  return token ? <HeaderNav /> : <Login />;
};

export default AuthenticationStatus;
