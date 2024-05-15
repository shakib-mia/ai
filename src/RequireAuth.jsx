// import React from "react";
import Login from "./pages/Login/Login";
import PropTypes from "prop-types";

const RequireAuth = ({ children }) => {
  const token = localStorage.getItem("token");

  // if(token)
  return token ? children : <Login />;
};

RequireAuth.propTypes = {
  children: PropTypes.node.isRequired,
};

export default RequireAuth;
