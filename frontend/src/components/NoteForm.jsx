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

      navigate("/");
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
    <div className="max-w-xl mx-auto mt-10 bg-gray-800 rounded-2xl shadow-lg p-6">
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
          className="w-full px-4 py-2 rounded-lg bg-gray-700 text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 outline-none"
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
          className="w-full px-4 py-2 rounded-lg bg-gray-700 text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 outline-none"
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

        <button
          type="submit"
          disabled={isCreating}
          className="w-full bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition text-white font-semibold py-2 rounded-lg shadow-md"
        >
          {isCreating ? "Creating..." : "Add Note"}
        </button>
      </form>
    </div>
  );
}

export default Noteform;
