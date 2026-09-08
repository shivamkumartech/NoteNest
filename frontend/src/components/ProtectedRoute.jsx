import { Navigate, Outlet } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import LoadingSpinner from "../components/LoadingSpinner";

function ProtectedRoute() {
  const { user, authStatus } = useContext(AuthContext);

  if (authStatus === "checking") {
    return <LoadingSpinner />;
  }

  if (authStatus === "anonymous") {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}

export default ProtectedRoute;