import { useEffect } from "react";
import { createPortal } from "react-dom";

function ConfirmDialog({
  isOpen,
  title = "Are you sure?",
  message = "This action cannot be undone.",
  onConfirm,
  onCancel,
  loading = false,
  confirmText = "Delete",
  confirmLoadingText = "Deleting...",
}) {
  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const handleKeyDown = (event) => {
      if (event.key === "Escape" && !loading) {
        onCancel();
      }
    };

    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "unset";
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, loading, onCancel]);

  if (!isOpen) {
    return null;
  }

  return createPortal(
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4"
      role="presentation"
      onClick={onCancel}
    >
      <div
        className="w-full max-w-md rounded-2xl border border-(--app-border) bg-(--app-surface)/95 p-6 shadow-2xl backdrop-blur-md"
        role="dialog"
        aria-modal="true"
        aria-labelledby="confirm-dialog-title"
        aria-describedby="confirm-dialog-message"
        onClick={(e) => e.stopPropagation()}
      >
        <h2
          id="confirm-dialog-title"
          className="text-lg font-semibold tracking-tight text-(--app-text)"
        >
          {title}
        </h2>

        <p
          id="confirm-dialog-message"
          className="mt-2 text-sm text-(--app-text-secondary)"
        >
          {message}
        </p>

        <div className="mt-6 flex justify-end gap-2.5">
          <button
            type="button"
            onClick={onCancel}
            disabled={loading}
            className="cursor-pointer rounded-lg border border-(--app-border-hover) bg-(--app-surface-raised)/50 px-4 py-2 text-sm font-medium text-(--app-text-secondary) transition hover:border-(--app-border) hover:bg-(--app-surface-raised) hover:text-(--app-text)"
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={onConfirm}
            disabled={loading}
            className="cursor-pointer rounded-lg bg-(--app-danger) px-4 py-2 text-sm font-medium text-white transition hover:bg-(--app-danger-hover) disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading ? confirmLoadingText : confirmText}
          </button>
        </div>
      </div>
    </div>,
    document.body,
  );
}

export default ConfirmDialog;