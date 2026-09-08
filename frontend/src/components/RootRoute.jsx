import { Navigate, Outlet } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import LoadingSpinner from "../components/LoadingSpinner";

function RootRoute() {
  const { user, authStatus } = useContext(AuthContext);

  if (authStatus === "checking") {
    return <LoadingSpinner />;
  }

  if (authStatus === "authenticated" && user) {
    return <Navigate to="/notes" replace />;
  }

  return <Outlet />;
}

export default RootRoute;