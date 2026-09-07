import { Navigate, Outlet } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

function ProtectedRoute() {
  const { user, authStatus } = useContext(AuthContext);

  if (authStatus === "checking") {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center">
        <div
          className="mb-4 h-10 w-10 animate-spin rounded-full border-4"
          style={{
            borderColor: "var(--app-border)",
            borderTopColor: "var(--app-accent)",
          }}
        />
        <p className="text-sm text-(--app-text-secondary)">
          Loading NoteNest...
        </p>
      </div>
    );
  }

  if (authStatus === "anonymous") {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}

export default ProtectedRoute;