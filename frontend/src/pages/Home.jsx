import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { NoteContext } from "../context/NoteContext";
import NoteCard from "../components/NoteCard";
import { Link } from "react-router-dom";
import { NotebookPen, Plus } from "lucide-react";

function Home() {
  const { user } = useContext(AuthContext);
  const { notes, loading, error, getNotes } = useContext(NoteContext);

  if (loading) {
    return (
      <div className="flex flex-col justify-center items-center min-h-[60vh]">
        <div className="w-10 h-10 border-4 border-gray-700 border-t-blue-400 rounded-full animate-spin mb-4" />

        <p className="text-gray-400 text-lg">Loading notes...</p>
      </div>
    );
  }

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
          Welcome back{user?.name ? `, ${user.name}` : ""}
        </h1>

        <Link
          to="/create-note"
          className="hidden items-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 sm:inline-flex"
        >
          <Plus size={18} />
          <span>New Note</span>
        </Link>
      </div>

      {notes.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <NotebookPen className="w-12 h-12 text-gray-500 mb-4" />

          <h2 className="text-xl font-semibold text-white">No notes yet</h2>

          <p className="text-gray-400 mt-2 mb-6">
            Start by creating your first note.
          </p>

          <Link
            to="/create-note"
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-5 py-2.5 rounded-lg transition"
          >
            Create your first note
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
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
