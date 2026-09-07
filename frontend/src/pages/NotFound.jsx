import { useContext } from "react";
import { Link } from "react-router-dom";
import { FileQuestion } from "lucide-react";
import { AuthContext } from "../context/AuthContext";

function NotFound() {
  const { user } = useContext(AuthContext);

  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-4 text-center">
      <div className="flex h-16 w-16 items-center justify-center rounded-full border border-(--app-border)">
        <FileQuestion className="h-7 w-7 text-(--app-text-muted)" />
      </div>

      <h1 className="mt-6 text-5xl font-semibold tracking-[-0.04em] text-(--app-text)">
        404
      </h1>

      <h2 className="mt-3 text-xl font-semibold text-(--app-text)">
        Page not found
      </h2>

      <p className="mt-2 text-sm text-(--app-text-secondary)">
        The page you're looking for doesn't exist.
      </p>

      <Link
        to={user ? "/notes" : "/"}
        className="mt-7 inline-flex cursor-pointer items-center rounded-full bg-(--app-accent) px-5 py-2.5 text-sm font-medium text-(--app-bg) shadow-sm transition hover:bg-(--app-accent-hover)"
      >
        Back to NoteNest
      </Link>
    </div>
  );
}

export default NotFound;