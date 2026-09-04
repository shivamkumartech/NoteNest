import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { NoteContext } from "../context/NoteContext";
import NoteCard from "../components/NoteCard";
import { Link } from "react-router-dom";
import { NotebookPen, Plus } from "lucide-react";
import NoteCardSkeleton from "../components/NoteCardSkeleton";

function Home() {
  const { user } = useContext(AuthContext);
  const { notes, loading, error, getNotes } = useContext(NoteContext);

  if (error) {
    return (
      <div className="max-w-2xl mx-auto mt-10 px-4">
        <div
          className="rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 px-4 py-4"
          role="alert"
        >
          <p>{error}</p>

          <button
            type="button"
            onClick={getNotes}
            className="mt-3 bg-red-600 hover:bg-red-700 text-white font-medium px-4 py-2 rounded-lg transition"
          >
            Try again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full py-4 sm:py-8">
      {/* Dashboard Welcome Header */}
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-2xl font-semibold tracking-tight text-white sm:text-3xl">
          What’s on your mind{user?.name ? `, ${user.name}` : ""}?
        </h1>

        <Link
          to="/create-note"
          className="hidden items-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 sm:inline-flex"
        >
          <Plus size={18} />
          <span>New Note</span>
        </Link>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 3 }).map((_, index) => (
            <NoteCardSkeleton key={index} />
          ))}
        </div>
      ) : notes.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <NotebookPen className="mb-4 h-12 w-12 text-gray-500" />

          <h2 className="text-xl font-semibold text-white">No notes yet</h2>

          <p className="mt-2 mb-6 text-gray-400">
            Start by creating your first note.
          </p>

          <Link
            to="/create-note"
            className="rounded-lg bg-blue-600 px-5 py-2.5 font-semibold text-white transition hover:bg-blue-700"
          >
            Create your first note
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {notes.map((note) => (
            <NoteCard key={note._id} note={note} />
          ))}
        </div>
      )}

      {/* Mobile Create Note FAB */}
      <Link
        to="/create-note"
        className="fixed bottom-20 right-6 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-blue-600 text-white shadow-lg transition hover:bg-blue-700 sm:hidden"
        title="Create note"
        aria-label="Create note"
      >
        <Plus size={26} />
      </Link>
    </div>
  );
}

export default Home;
