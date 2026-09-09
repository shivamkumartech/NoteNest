import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { NoteContext } from "../context/NoteContext";
import NoteCard from "../components/NoteCard";
import LoadingSpinner from "../components/LoadingSpinner";
import { Link } from "react-router-dom";
import { Plus } from "lucide-react";

function Home() {
  const { user } = useContext(AuthContext);
  const { notes, loading, error, getNotes } = useContext(NoteContext);

  if (error) {
    return (
      <div className="mx-auto mt-10 w-full max-w-2xl px-4">
        <div
          className="rounded-xl border border-(--app-danger)/30 bg-(--app-danger)/10 px-4 py-4 text-(--app-danger)"
          role="alert"
        >
          <p className="text-sm">{error}</p>

          <button
            type="button"
            onClick={getNotes}
            className="mt-4 cursor-pointer rounded-lg bg-(--app-danger) px-4 py-2 text-sm font-medium text-white transition hover:bg-(--app-danger-hover)"
          >
            Try again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full py-6 sm:py-10">
      {/* Dashboard Welcome Header */}
      <div className="mb-8 flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-(--app-text) sm:text-3xl">
            What’s on your mind{user?.name ? `, ${user.name}` : ""}?
          </h1>
        </div>

        <Link
          to="/create-note"
          className="hidden items-center gap-2 rounded-lg bg-(--app-accent) px-4 py-2.5 text-sm font-medium text-(--app-bg) shadow-sm transition hover:bg-(--app-accent-hover) sm:inline-flex"
        >
          <Plus size={18} />
          <span>New Note</span>
        </Link>
      </div>

      {/* Notes Section */}
      <div>
        <p className="mb-2 text-xs font-medium uppercase tracking-[0.18em] text-(--app-text-muted)">
          Your Notes
        </p>
      </div>

      {loading ? (
        <LoadingSpinner />
      ) : notes.length === 0 ? (
        <div className="flex min-h-[50vh] flex-col items-center justify-center rounded-2xl border border-dashed border-(--app-border) px-6 py-20 text-center">
          <div className="flex h-14 w-14 items-center justify-center rounded-full border border-(--app-border)">
          </div>

          <h2 className="mt-5 text-xl font-semibold text-(--app-text)">
            No notes yet
          </h2>

          <p className="mt-2 max-w-sm text-sm text-(--app-text-secondary)">
            Start by creating your first note.{" "}
          </p>

          <Link
            to="/create-note"
            className="mt-6 rounded-full bg-(--app-accent) px-5 py-2.5 text-sm font-medium text-(--app-bg) transition hover:bg-(--app-accent-hover)"
          >
            Create your first note
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 items-start gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {notes.map((note) => (
            <NoteCard key={note._id} note={note} />
          ))}
        </div>
      )}

      {/* Mobile Create Note FAB */}
      <Link
        to="/create-note"
        className="fixed bottom-22 right-6 z-40 flex h-16 w-16 items-center justify-center rounded-full bg-(--app-accent) text-(--app-bg) shadow-lg transition hover:bg-(--app-accent-hover) sm:hidden"
        title="Create note"
        aria-label="Create note"
      >
        <Plus size={30} />
      </Link>
    </div>
  );
}

export default Home;
