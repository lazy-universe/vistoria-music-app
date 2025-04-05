import { Navigate, Outlet } from "react-router-dom";

export const ProtectedRoute = () => {
  const token = localStorage.getItem("token");
  return token ? <Outlet /> : <Navigate to="/auth" />;
};

export const PublicRoute = () => {
    const token = localStorage.getItem("token");    
    return !token ? <Outlet /> : <Navigate to="/dashboard" />;
}

export const ProfileCompleted = () => {
  const profileCompleted = localStorage.getItem("profileCompleted") === "true";
  return profileCompleted ? <Outlet /> : <Navigate to="/profile" />;
};