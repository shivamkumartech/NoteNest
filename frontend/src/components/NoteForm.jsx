import { useContext, useState } from "react";
import { NoteContext } from "../context/NoteContext";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { ArrowLeft, Check } from "lucide-react";

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
    <div className="w-full max-w-2xl px-4 sm:px-6">
      <div className="rounded-2xl border border-(--app-border) bg-(--app-surface) shadow-sm">
        <form onSubmit={handleSubmit}>
          {/* Top Bar */}
          <div className="flex items-center justify-between border-b border-(--app-border) px-4 py-3 sm:px-5">
            <button
              type="button"
              onClick={() => navigate("/notes")}
              disabled={isCreating}
              className="cursor-pointer rounded-lg p-1.5 text-(--app-text-secondary) transition hover:bg-(--app-surface-raised) hover:text-(--app-text) disabled:cursor-not-allowed disabled:opacity-50"
              title="Back"
              aria-label="Back"
            >
              <ArrowLeft size={18} />
            </button>

            <button
              type="submit"
              disabled={isCreating}
              className="cursor-pointer rounded-lg p-1.5 text-(--app-text-secondary) transition hover:bg-(--app-surface-raised) hover:text-(--app-text) disabled:cursor-not-allowed disabled:opacity-50"
              title="Create note"
              aria-label="Create note"
            >
              <Check size={19} />
            </button>
          </div>

          {/* Error */}
          {error && (
            <div className="mx-5 mt-4 rounded-lg border border-(--app-danger)/30 bg-(--app-danger)/10 px-4 py-3 text-sm text-(--app-danger)">
              {error}
            </div>
          )}

          {/* Editor */}
          <div className="p-5 sm:p-7">
            <div>
              <input
                type="text"
                placeholder="Title"
                maxLength={100}
                autoFocus
                value={note.title}
                onChange={(e) =>
                  setNote({
                    ...note,
                    title: e.target.value,
                  })
                }
                disabled={isCreating}
                className="w-full border-none bg-transparent text-xl font-semibold tracking-tight text-(--app-text) placeholder-(--app-text-muted) outline-none focus:outline-none sm:text-2xl"
              />

              <p className="mt-2 text-right text-xs text-(--app-text-muted)">
                {note.title.length}/100
              </p>
            </div>

            <div className="mt-5">
              <textarea
                placeholder="Write your note..."
                maxLength={10000}
                value={note.content}
                onChange={(e) =>
                  setNote({
                    ...note,
                    content: e.target.value,
                  })
                }
                disabled={isCreating}
                className="min-h-[360px] w-full resize-none border-none bg-transparent text-sm leading-7 text-(--app-text) placeholder-(--app-text-muted) outline-none focus:outline-none sm:min-h-[420px]"
              />

              <p className="text-right text-xs text-(--app-text-muted)">
                {note.content.length}/10000
              </p>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default NoteForm;