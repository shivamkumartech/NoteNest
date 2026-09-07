import { useContext } from "react";
import { Link } from "react-router-dom";
import { FileQuestion } from "lucide-react";
import { AuthContext } from "../context/AuthContext";

function NotFound() {
  const { user } = useContext(AuthContext);

  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center text-center px-4">
      <FileQuestion className="w-16 h-16 text-(--app-text-muted) mb-4" />

      <h1 className="text-4xl font-bold text-(--app-text)">404</h1>

      <h2 className="mt-2 text-xl font-semibold text-(--app-text-secondary)">
        Page not found
      </h2>

      <p className="mt-2 text-(--app-text-secondary)">
        The page you're looking for doesn't exist.
      </p>

      <Link
        to={user ? "/notes" : "/"}
        className="mt-6 inline-flex cursor-pointer items-center rounded-lg bg-(--app-accent) px-4 py-2.5 text-sm font-medium text-white shadow-sm transition hover:bg-(--app-accent-hover)"
      >
        Back to NoteNest
      </Link>
    </div>
  );
}

export default NotFound;