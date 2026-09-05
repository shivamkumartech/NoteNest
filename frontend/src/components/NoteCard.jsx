import { useContext, useState } from "react";
import { NoteContext } from "../context/NoteContext";
import { toast } from "sonner";
import { Pencil, Trash2 } from "lucide-react";
import ConfirmDialog from "./ConfirmDialog";

function NoteCard({ note, isEditing, onStartEdit, onCancelEdit }) {
  const { deleteNote, updateNote } = useContext(NoteContext);

  const [isUpdating, setIsUpdating] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  const [editData, setEditData] = useState({
    title: note.title,
    content: note.content,
  });

  const handleUpdate = async () => {
    if (!editData.title.trim() || !editData.content.trim()) {
      toast.error("Title and content are required");
      return;
    }

    try {
      setIsUpdating(true);

      await updateNote(note._id, {
        title: editData.title.trim(),
        content: editData.content.trim(),
      });

      toast.success("Note updated successfully");

      onCancelEdit();
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Unable to update note. Please try again.",
      );
    } finally {
      setIsUpdating(false);
    }
  };

  const handleDelete = async () => {
    try {
      setIsDeleting(true);

      await deleteNote(note._id);

      setShowDeleteDialog(false);

      toast.success("Note deleted successfully");
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Unable to delete note. Please try again.",
      );
    } finally {
      setIsDeleting(false);
    }
  };

  const handleCancelEdit = () => {
    setEditData({
      title: note.title,
      content: note.content,
    });

    onCancelEdit();
  };

  return (
    <div className="group relative flex flex-col rounded-2xl border border-gray-800 bg-gray-900/70 p-6 shadow-sm transition-all duration-200 hover:border-gray-700 hover:bg-gray-900/90 hover:shadow-md">
      {isEditing ? (
        <>
          {/* Edit Mode */}
          <input
            type="text"
            value={editData.title}
            maxLength={100}
            onChange={(e) =>
              setEditData({
                ...editData,
                title: e.target.value,
              })
            }
            disabled={isUpdating}
            className="mb-2 w-full rounded-lg border border-gray-700 bg-gray-800/80 px-3 py-2.5 text-sm text-white placeholder-gray-500 outline-none transition focus:border-blue-500 focus:ring-1 focus:ring-blue-500 disabled:cursor-not-allowed disabled:opacity-50"
          />
          <div className="mb-2 flex justify-end">
            <span className="text-xs text-gray-500">
              {editData.title.length}/100
            </span>
          </div>

          <textarea
            rows="4"
            value={editData.content}
            maxLength={10000}
            onChange={(e) =>
              setEditData({
                ...editData,
                content: e.target.value,
              })
            }
            disabled={isUpdating}
            className=" mb-2 resize-none w-full rounded-lg border border-gray-700 bg-gray-800/80 px-3 py-2.5 text-sm text-white placeholder-gray-500 outline-none transition focus:border-blue-500 focus:ring-1 focus:ring-blue-500 disabled:cursor-not-allowed disabled:opacity-50"
          />
          <div className="flex justify-end">
            <span className="text-xs text-gray-500">
              {editData.content.length}/10000
            </span>
          </div>

          <div className="flex gap-2.5">
            <button
              type="button"
              onClick={handleUpdate}
              disabled={isUpdating}
              className="cursor-pointer rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-500 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {isUpdating ? "Saving..." : "Save"}
            </button>

            <button
              type="button"
              onClick={handleCancelEdit}
              disabled={isUpdating}
              className="cursor-pointer rounded-lg border border-gray-700 bg-gray-800/50 px-4 py-2 text-sm font-medium text-gray-300 transition hover:border-gray-600 hover:bg-gray-800 hover:text-white disabled:cursor-not-allowed disabled:opacity-50"
            >
              Cancel
            </button>
          </div>
        </>
      ) : (
        <>
          {/* View Mode */}
          <h2 className="text-lg font-semibold tracking-tight text-white line-clamp-1 wrap-break-word">
            {note.title}
          </h2>

          <p className="mt-2.5 min-h-12 text-sm leading-relaxed text-gray-300 line-clamp-2 wrap-break-word">
            {note.content}
          </p>

          {/* Footer: date + actions */}
          <div className="mt-4 flex items-center justify-between text-sm text-gray-400">
            <span>
              {new Date(note.createdAt).toLocaleDateString("en-GB", {
                day: "numeric",
                month: "short",
                year: "numeric",
              })}
            </span>

            <div className="flex items-center gap-1 transition sm:opacity-60 sm:group-hover:opacity-100">
              <button
                type="button"
                onClick={() => onStartEdit(true)}
                disabled={isDeleting}
                className="cursor-pointer rounded-lg p-1.5 text-gray-400 transition hover:bg-gray-800 hover:text-gray-200 disabled:cursor-not-allowed disabled:opacity-50"
                title="Edit note"
                aria-label="Edit note"
              >
                <Pencil size={16} />
              </button>

              <button
                type="button"
                onClick={() => setShowDeleteDialog(true)}
                disabled={isDeleting}
                className="cursor-pointer rounded-lg p-1.5 text-gray-400 transition hover:bg-red-500/10 hover:text-red-400 disabled:cursor-not-allowed disabled:opacity-50"
                title="Delete note"
                aria-label="Delete note"
              >
                <Trash2 size={16} />
              </button>
            </div>
          </div>
        </>
      )}

      <ConfirmDialog
        isOpen={showDeleteDialog}
        title="Delete this note?"
        message="This action cannot be undone."
        onConfirm={handleDelete}
        onCancel={() => setShowDeleteDialog(false)}
        loading={isDeleting}
      />
    </div>
  );
}

export default NoteCard;
