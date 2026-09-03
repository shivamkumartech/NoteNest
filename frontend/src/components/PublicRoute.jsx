import { Navigate, Outlet } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

function PublicRoute() {
  const { user, loading } = useContext(AuthContext);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <div className="w-10 h-10 border-4 border-gray-700 border-t-blue-400 rounded-full animate-spin" />
      </div>
    );
  }

  if (user) {
    return <Navigate to="/notes" replace />;
  }

  return <Outlet />;
}

export default PublicRoute;
