import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../auth/context/AuthContext";

export const ProfileProtectedRoute = ({ children }) => {
  const { selectedProfile } = useAuth();
  const location = useLocation();

  if (!selectedProfile) {
    return <Navigate to="/profiles" state={{ from: location }} replace />;
  }

  return children;
};