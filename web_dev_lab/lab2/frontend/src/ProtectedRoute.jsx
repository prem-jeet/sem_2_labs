import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
  const isLoggedIn = !!localStorage.getItem("token");
  return isLoggedIn ? <Outlet /> : <Navigate to="/auth/login" />;
};

export default ProtectedRoute;
