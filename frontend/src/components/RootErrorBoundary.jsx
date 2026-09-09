import { useEffect } from "react";
import { useRouteError, Link } from "react-router-dom";
import { RotateCw, Home, AlertCircle } from "lucide-react";

function RootErrorBoundary() {
  const error = useRouteError();

  const isChunkError =
    error?.name === "TypeError" &&
    (/dynamically imported module/i.test(error?.message) ||
      /Failed to fetch/i.test(error?.message) ||
      /Loading chunk/i.test(error?.message) ||
      /Importing a module script failed/i.test(error?.message));

  const handleReload = () => {
    window.location.reload();
  };

  useEffect(() => {
    if (isChunkError) {
      const key = "chunk-auto-reloaded";
      if (!sessionStorage.getItem(key)) {
        sessionStorage.setItem(key, "1");
        window.location.reload();
        return;
      }
    }
  }, [isChunkError]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-(--app-bg) px-4 text-center text-(--app-text)">
      <div className="w-full max-w-md rounded-2xl border border-(--app-border) bg-(--app-surface) p-8 shadow-sm">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-(--app-danger)/10 text-(--app-danger)">
          <AlertCircle className="h-7 w-7" />
        </div>

        <h1 className="mt-5 text-xl font-bold tracking-tight text-(--app-text)">
          {isChunkError ? "App updated" : "Something went wrong"}
        </h1>

        <p className="mt-2 text-sm text-(--app-text-secondary)">
          {isChunkError
            ? "A newer version of NoteNest is available. Please reload the page to continue."
            : error?.message ||
              "An unexpected error occurred while loading this page."}
        </p>

        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <button
            type="button"
            onClick={handleReload}
            className="flex cursor-pointer items-center justify-center gap-2 rounded-lg bg-(--app-accent) px-5 py-2.5 text-sm font-medium text-(--app-bg) transition hover:bg-(--app-accent-hover)"
          >
            <RotateCw size={16} />
            <span>Reload NoteNest</span>
          </button>

          {!isChunkError && (
            <Link
              to="/"
              className="flex items-center justify-center gap-2 rounded-lg border border-(--app-border) bg-(--app-surface-raised)/50 px-5 py-2.5 text-sm font-medium text-(--app-text-secondary) transition hover:text-(--app-text)"
            >
              <Home size={16} />
              <span>Go home</span>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}

export default RootErrorBoundary;
