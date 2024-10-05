import React from "react";

import { Navigate, Outlet } from "react-router-dom";

import { useAuth } from "../hooks/useAuth";

const ProtectedRoute: React.FC<{ children?: React.ReactNode }> = ({
  children,
}) => {
  const { isAuth } = useAuth();
  return isAuth ? children || <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoute;
