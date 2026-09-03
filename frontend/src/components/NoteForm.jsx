import { useContext, useState } from "react";
import { NoteContext } from "../context/NoteContext";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

function NoteForm() {
  const { createNote } = useContext(NoteContext);

  const navigate = useNavigate();

  const [note, setNote] = useState({
    title: "",
    content: "",
  });

  const [error, setError] = useState("");
  const [isCreating, setIsCreating] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");

    if (!note.title.trim() || !note.content.trim()) {
      setError("Title and content are required");
      return;
    }

    try {
      setIsCreating(true);

      await createNote(note);

      toast.success("Note created successfully");

      setNote({
        title: "",
        content: "",
      });

      navigate("/notes");
    } catch (error) {
      setError(
        error.response?.data?.message ||
          "Unable to create note. Please try again.",
      );
    } finally {
      setIsCreating(false);
    }
  };

  return (
    <div className="w-full max-w-xl mx-auto rounded-2xl border border-gray-800 bg-gray-900/70 p-6 sm:p-8 shadow-sm">
      <h2 className="text-2xl font-bold tracking-tight text-center text-blue-400 mb-6">
        Create a New Note
      </h2>

      {error && (
        <div className="mb-4 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 px-4 py-3 text-sm">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Enter title..."
          autoFocus
          className="w-full rounded-lg border border-gray-700 bg-gray-800/80 px-4 py-2.5 text-sm text-white placeholder-gray-500 outline-none transition focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
          value={note.title}
          onChange={(e) =>
            setNote({
              ...note,
              title: e.target.value,
            })
          }
          disabled={isCreating}
        />

        <textarea
          placeholder="Write your note here..."
          className="w-full rounded-lg border border-gray-700 bg-gray-800/80 px-4 py-2.5 text-sm text-white placeholder-gray-500 outline-none transition focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
          rows="5"
          value={note.content}
          onChange={(e) =>
            setNote({
              ...note,
              content: e.target.value,
            })
          }
          disabled={isCreating}
        />

        <div className="flex gap-3">
          <button
            type="submit"
            disabled={isCreating}
            className="flex-1 cursor-pointer rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-medium text-white shadow-sm transition hover:bg-blue-500 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isCreating ? "Creating..." : "Add Note"}
          </button>

          <button
            type="button"
            onClick={() => navigate("/notes")}
            disabled={isCreating}
            className="cursor-pointer rounded-lg border border-gray-700 bg-gray-800/50 px-5 py-2.5 text-sm font-medium text-gray-300 transition hover:border-gray-600 hover:bg-gray-800 hover:text-white disabled:cursor-not-allowed disabled:opacity-50"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

export default NoteForm;
