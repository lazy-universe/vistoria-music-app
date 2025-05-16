import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "../utils/useAuthStore";

export const ProtectedRoute = () => {
  // const token = localStorage.getItem("token");
  const token = useAuthStore((state) => state.user?.token);
  return token ? <Outlet /> : <Navigate to="/login" />;
};

export const PublicRoute = () => {
    // const token = localStorage.getItem("token");    
    const token = useAuthStore((state) => state.user?.token);
    return !token ? <Outlet /> : <Navigate to="/dashboard" />;
}

export const ProfileCompleted = () => {
  // const profileCompleted = localStorage.getItem("profileCompleted") === "true";
  const profileCompleted = useAuthStore((state) => state.user?.profileCompleted);
  return profileCompleted ? <Outlet /> : <Navigate to="/profile" />;
};