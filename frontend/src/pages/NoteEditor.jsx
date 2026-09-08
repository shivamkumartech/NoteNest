import { useContext, useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import { ArrowLeft, Check, Trash2 } from "lucide-react";
import { NoteContext } from "../context/NoteContext";
import ConfirmDialog from "../components/ConfirmDialog";

function NoteEditor() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { notes, createNote, updateNote, deleteNote } = useContext(NoteContext);

  const isEditing = Boolean(id);

  const note = isEditing
    ? notes.find((currentNote) => currentNote._id === id)
    : null;

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const [isSaving, setIsSaving] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [showBackDialog, setShowBackDialog] = useState(false);

  const initialData = useRef({
    title: "",
    content: "",
  });

  const createdAt = useRef(new Date());
  const titleRef = useRef(null);

  useEffect(() => {
    if (isEditing && note) {
      setTitle(note.title);
      setContent(note.content);

      initialData.current = {
        title: note.title,
        content: note.content,
      };
    }
  }, [isEditing, note]);

  useEffect(() => {
    if (isEditing && !note && notes.length > 0) {
      navigate("/notes", { replace: true });
    }
  }, [isEditing, note, notes.length, navigate]);

  // Automatically grow the title as it wraps onto multiple lines.
  useEffect(() => {
    const textarea = titleRef.current;

    if (!textarea) return;

    textarea.style.height = "auto";
    textarea.style.height = `${textarea.scrollHeight}px`;
  }, [title]);

  /*
   * Whitespace-only changes are ignored.
   */
  const hasMeaningfulChanges =
    title.trim() !== initialData.current.title.trim() ||
    content.trim() !== initialData.current.content.trim();

  /*
   * Create mode:
   * Check is dim until the user enters meaningful content.
   *
   * Edit mode:
   * Check is dim until the user makes a meaningful change.
   */
  const canSave = isEditing
    ? hasMeaningfulChanges
    : title.trim().length > 0 || content.trim().length > 0;

  const handleTitleChange = (e) => {
    const value = e.target.value;

    setTitle(value);

    if (value.length === 100) {
      toast.info("Title has reached the 100 character limit.");
    }
  };

  const handleContentChange = (e) => {
    const value = e.target.value;

    setContent(value);

    if (value.length === 10000) {
      toast.info("Content has reached the 10,000 character limit.");
    }
  };

  const handleSave = async () => {
    const trimmedTitle = title.trim();
    const trimmedContent = content.trim();

    // Don't call update API when nothing meaningful changed.
    if (isEditing && !hasMeaningfulChanges) {
      return;
    }

    if (!trimmedTitle || !trimmedContent) {
      toast.error("Title and content are required");
      return;
    }

    try {
      setIsSaving(true);

      if (isEditing) {
        await updateNote(id, {
          title: trimmedTitle,
          content: trimmedContent,
        });

        toast.success("Note updated.");
      } else {
        await createNote({
          title: trimmedTitle,
          content: trimmedContent,
        });

        toast.success("Note created.");
      }

      navigate("/notes");
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          `Unable to ${
            isEditing ? "update" : "create"
          } note. Please try again.`,
      );
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async () => {
    try {
      setIsDeleting(true);

      await deleteNote(id);

      setShowDeleteDialog(false);

      toast.success("Note deleted.");

      navigate("/notes");
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Unable to delete note. Please try again.",
      );
    } finally {
      setIsDeleting(false);
    }
  };

  const handleBack = () => {
    if (isSaving || isDeleting) return;

    if (hasMeaningfulChanges) {
      setShowBackDialog(true);
      return;
    }

    navigate("/notes");
  };

  const handleDiscardChanges = () => {
    setShowBackDialog(false);
    navigate("/notes");
  };

  const formatEditorDate = (date) => {
    const time = date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });

    const dayMonth = date.toLocaleDateString("en-GB", {
      day: "numeric",
      month: "long",
    });

    return `${time}, ${dayMonth}`;
  };

  const displayDate =
    isEditing && note
      ? formatEditorDate(new Date(note.updatedAt || note.createdAt))
      : formatEditorDate(createdAt.current);

  return (
    <>
      <div className="fixed inset-0 z-50 flex min-h-screen items-stretch justify-center bg-(--app-bg) sm:items-center sm:bg-black/70 sm:p-6">
        <div className="flex h-full w-full flex-col bg-(--app-bg) sm:h-auto sm:max-h-[90vh] sm:max-w-3xl sm:rounded-2xl sm:border sm:border-(--app-border) sm:bg-(--app-surface)">
          {/* Top Bar */}
          <div className="flex shrink-0 items-center justify-between px-3 py-4 sm:px-7">
            {" "}
            {/* Back */}
            <button
              type="button"
              onClick={handleBack}
              disabled={isSaving || isDeleting}
              className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-lg text-(--app-text-secondary) transition hover:bg-(--app-surface-raised) hover:text-(--app-text) disabled:cursor-not-allowed disabled:opacity-50"
              title="Back"
              aria-label="Back"
            >
              <ArrowLeft size={21} strokeWidth={2} />
            </button>
            {/* Save + Delete */}
            <div className="flex items-center gap-1">
              {/* Save / Create */}
              <button
                type="button"
                onClick={handleSave}
                disabled={isSaving || isDeleting || !canSave}
                className={`flex h-10 w-10 cursor-pointer items-center justify-center rounded-lg transition disabled:cursor-not-allowed disabled:opacity-50 ${
                  canSave
                    ? "text-(--app-text) hover:bg-(--app-surface-raised)"
                    : "text-(--app-text-muted) opacity-40 hover:bg-(--app-surface-raised)"
                }`}
                title={isEditing ? "Save changes" : "Create note"}
                aria-label={isEditing ? "Save changes" : "Create note"}
              >
                <Check size={21} strokeWidth={2} />
              </button>

              {/* Delete */}
              {isEditing && (
                <button
                  type="button"
                  onClick={() => setShowDeleteDialog(true)}
                  disabled={isSaving || isDeleting}
                  className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-lg text-(--app-text-secondary) transition hover:bg-(--app-danger)/10 hover:text-(--app-danger) disabled:cursor-not-allowed disabled:opacity-50"
                  title="Delete note"
                  aria-label="Delete note"
                >
                  <Trash2 size={20} strokeWidth={2} />
                </button>
              )}
            </div>
          </div>

          {/* Editor */}
          <div className="flex min-h-0 flex-1 flex-col overflow-y-auto px-6 pb-10 sm:px-10 sm:pb-12">
            {/* Title */}
            <textarea
              ref={titleRef}
              value={title}
              maxLength={100}
              autoFocus={!isEditing}
              onChange={handleTitleChange}
              disabled={isSaving || isDeleting}
              placeholder="Title"
              rows={1}
              className="w-full resize-none overflow-hidden border-0 bg-transparent p-0 text-3xl font-semibold leading-[1.15] tracking-tight text-(--app-text) outline-none placeholder:text-(--app-text-muted) focus:outline-none disabled:cursor-not-allowed disabled:opacity-50 sm:text-4xl"
            />

            {/* Metadata */}
            <div className="mt-3 flex items-center text-xs text-(--app-text-muted) sm:mt-5">
              <span>{displayDate}</span>

              <span className="mx-2">|</span>

              <span>
                {content.length}{" "}
                {content.length === 1 ? "character" : "characters"}
              </span>
            </div>

            {/* Content */}
            <textarea
              value={content}
              maxLength={10000}
              onChange={handleContentChange}
              disabled={isSaving || isDeleting}
              placeholder="Write your note..."
              className="mt-5 min-h-[55vh] w-full flex-1 resize-none border-0 bg-transparent p-0 text-base leading-7 text-(--app-text) outline-none placeholder:text-(--app-text-muted) focus:outline-none disabled:cursor-not-allowed disabled:opacity-50 sm:mt-10 sm:min-h-107.5 sm:text-lg sm:leading-8"
            />
          </div>
        </div>
      </div>

      {/* Delete Confirmation */}
      <ConfirmDialog
        isOpen={showDeleteDialog}
        title="Delete this note?"
        message="This action cannot be undone."
        onConfirm={handleDelete}
        onCancel={() => setShowDeleteDialog(false)}
        loading={isDeleting}
      />

      {/* Unsaved Changes Confirmation */}
      <ConfirmDialog
        isOpen={showBackDialog}
        title="Discard changes?"
        message="You have unsaved changes. If you leave now, your changes will be lost."
        onConfirm={handleDiscardChanges}
        onCancel={() => setShowBackDialog(false)}
        loading={false}
      />
    </>
  );
}

export default NoteEditor;
