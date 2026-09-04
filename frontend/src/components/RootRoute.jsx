import { Navigate, Outlet } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

function RootRoute() {
  const { user, authStatus } = useContext(AuthContext);

  if (authStatus === "checking") {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-gray-700 border-t-blue-400" />
      </div>
    );
  }

  if (authStatus === "authenticated" && user) {
    return <Navigate to="/notes" replace />;
  }

  return <Outlet />;
}

export default RootRoute;