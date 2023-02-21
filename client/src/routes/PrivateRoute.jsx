import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const PrivateRoute = ({ children }) => {
  const { user } = useSelector((state) => state.auth);

  if (!user) {
    // not logged in so redirect to login page with the return url
    return <Navigate to="/account" />;
  }

  return children;
};

export default PrivateRoute;
