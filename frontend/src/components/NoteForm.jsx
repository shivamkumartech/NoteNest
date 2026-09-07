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

      toast.success("Note created.");

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
    <div className="w-full max-w-xl mx-auto rounded-2xl border border-(--app-border) bg-(--app-surface)/70 p-6 sm:p-8 shadow-sm">
      <h2 className="text-xl font-semibold tracking-tight text-center text-(--app-text) mb-6">
        Create a New Note
      </h2>

      {error && (
        <div className="mb-4 rounded-lg bg-(--app-danger)/10 border border-(--app-danger)/30 text-(--app-danger) px-4 py-3 text-sm">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Enter title..."
          maxLength={100}
          autoFocus
          className="w-full rounded-lg border border-(--app-border-hover) bg-(--app-surface-raised)/80 px-4 py-2.5 text-sm text-(--app-text) placeholder-(--app-text-muted) outline-none transition focus:border-(--app-accent) focus:ring-1 focus:ring-(--app-accent)"
          value={note.title}
          onChange={(e) =>
            setNote({
              ...note,
              title: e.target.value,
            })
          }
          disabled={isCreating}
        />

        <p className="text-right text-xs text-(--app-text-muted)">
          {note.title.length}/100
        </p>

        <textarea
          placeholder="Type anything to remember"
          maxLength={10000}
          className="w-full resize-none rounded-lg border border-(--app-border-hover) bg-(--app-surface-raised)/80 px-4 py-2.5 text-sm text-(--app-text) placeholder-(--app-text-muted) outline-none transition focus:border-(--app-accent) focus:ring-1 focus:ring-(--app-accent)"
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

        <p className="text-right text-xs text-(--app-text-muted)">
          {note.content.length}/10000
        </p>

        <div className="flex gap-3">
          <button
            type="submit"
            disabled={isCreating}
            className="flex-1 cursor-pointer rounded-lg bg-(--app-accent) px-4 py-2.5 text-sm font-medium text-(--app-bg) shadow-sm transition hover:bg-(--app-accent-hover) disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isCreating ? "Creating..." : "Add Note"}
          </button>

          <button
            type="button"
            onClick={() => navigate("/notes")}
            disabled={isCreating}
            className="cursor-pointer rounded-lg border border-(--app-border-hover) bg-(--app-surface-raised)/50 px-5 py-2.5 text-sm font-medium text-(--app-text-secondary) transition hover:border-(--app-border) hover:bg-(--app-surface-raised) hover:text-(--app-text) disabled:cursor-not-allowed disabled:opacity-50"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

export default NoteForm;