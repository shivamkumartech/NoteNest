import { useContext, useState } from "react";
import { NoteContext } from "../context/NoteContext";
import { toast } from "sonner";
import { Pencil, Trash2 } from "lucide-react";
import ConfirmDialog from "./ConfirmDialog";

function NoteCard({ note }) {
  const { deleteNote, updateNote } = useContext(NoteContext);

  const [isUpdating, setIsUpdating] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const [isEditing, setIsEditing] = useState(false);
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

      setIsEditing(false);
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

    setIsEditing(false);
  };

  return (
    <div className="bg-gray-800 border border-gray-700 rounded-2xl shadow-lg hover:shadow-xl hover:border-gray-600 transition-all p-6 flex flex-col">
      {isEditing ? (
        <>
          {/* Edit Mode */}
          <input
            type="text"
            value={editData.title}
            onChange={(e) =>
              setEditData({
                ...editData,
                title: e.target.value,
              })
            }
            disabled={isUpdating}
            className="border border-gray-600 rounded-lg p-2 w-full mb-3 focus:ring-2 focus:ring-blue-500 outline-none bg-gray-700 text-white disabled:opacity-50 disabled:cursor-not-allowed"
          />

          <textarea
            rows="3"
            value={editData.content}
            onChange={(e) =>
              setEditData({
                ...editData,
                content: e.target.value,
              })
            }
            disabled={isUpdating}
            className="border border-gray-600 rounded-lg p-2 w-full mb-3 focus:ring-2 focus:ring-blue-500 outline-none bg-gray-700 text-white disabled:opacity-50 disabled:cursor-not-allowed"
          />

          <div className="flex gap-2">
            <button
              type="button"
              onClick={handleUpdate}
              disabled={isUpdating}
              className="bg-green-500 hover:bg-green-600 disabled:opacity-50 disabled:cursor-not-allowed text-white px-4 py-1.5 rounded-lg transition"
            >
              {isUpdating ? "Saving..." : "Save"}
            </button>

            <button
              type="button"
              onClick={handleCancelEdit}
              disabled={isUpdating}
              className="bg-gray-400 hover:bg-gray-500 disabled:opacity-50 disabled:cursor-not-allowed text-white px-4 py-1.5 rounded-lg transition"
            >
              Cancel
            </button>
          </div>
        </>
      ) : (
        <>
          {/* View Mode */}
          <h2 className="text-xl font-semibold text-white break-words">
            {note.title}
          </h2>

          <p className="text-gray-300 mt-2 flex-1 line-clamp-4 break-words">
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

            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setIsEditing(true)}
                disabled={isDeleting}
                className="cursor-pointer rounded-lg bg-gray-700/60 p-2 text-gray-300 transition hover:bg-yellow-500/20 hover:text-yellow-400 disabled:cursor-not-allowed disabled:opacity-50"
                title="Edit note"
                aria-label="Edit note"
              >
                <Pencil size={16} />
              </button>

              <button
                type="button"
                onClick={() => setShowDeleteDialog(true)}
                disabled={isDeleting}
                className="cursor-pointer rounded-lg bg-gray-700/60 p-2 text-gray-300 transition hover:bg-red-500/20 hover:text-red-400 disabled:cursor-not-allowed disabled:opacity-50"
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