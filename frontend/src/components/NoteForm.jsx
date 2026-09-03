import { useContext, useState } from "react";
import { NoteContext } from "../context/NoteContext";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

function Noteform() {
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
    <div className="w-full max-w-xl mx-auto bg-gray-800 border border-gray-700 rounded-2xl shadow-lg p-6 sm:p-8">
      <h2 className="text-2xl font-bold text-center text-blue-400 mb-6">
        Create a New Note
      </h2>

      {error && (
        <div className="mb-4 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 px-4 py-3">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Enter title..."
          autoFocus
          className="w-full px-4 py-2 rounded-lg border border-gray-600 bg-gray-700 text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 outline-none"
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
          className="w-full px-4 py-2 rounded-lg border border-gray-600 bg-gray-700 text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 outline-none"
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
            className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition text-white font-semibold py-2.5 rounded-lg shadow-md cursor-pointer"
          >
            {isCreating ? "Creating..." : "Add Note"}
          </button>

          <button
            type="button"
            onClick={() => navigate("/notes")}
            disabled={isCreating}
            className="cursor-pointer rounded-lg border border-gray-700 px-5 py-2.5 font-medium text-gray-300 transition hover:border-gray-600 hover:bg-gray-700/50 hover:text-white disabled:cursor-not-allowed disabled:opacity-50"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

export default Noteform;
