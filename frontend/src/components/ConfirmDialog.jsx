import { useEffect } from "react";
import { createPortal } from "react-dom";

function ConfirmDialog({
  isOpen,
  message = "Are you sure?",
  onConfirm,
  onCancel,
  loading = false,
  cancelText = "Cancel",
  confirmText = "OK",
  confirmLoadingText = "Please wait...",
}) {
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (event) => {
      if (event.key === "Escape" && !loading) {
        onCancel();
      }
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, loading, onCancel]);

  if (!isOpen) return null;

  return createPortal(
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4 backdrop-blur-[3px]"
      role="presentation"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget && !loading) {
          onCancel();
        }
      }}
    >
      <div
        className="w-full max-w-sm rounded-2xl bg-(--app-surface) px-6 py-6 shadow-2xl"
        role="dialog"
        aria-modal="true"
        aria-describedby="confirm-dialog-message"
      >
        <p
          id="confirm-dialog-message"
          className="text-base leading-relaxed text-(--app-text)"
        >
          {message}
        </p>

        <div className="mt-7 flex justify-end gap-6">
          <button
            type="button"
            onClick={onCancel}
            disabled={loading}
            className="cursor-pointer text-sm font-medium text-(--app-text-secondary) transition hover:text-(--app-text) disabled:cursor-not-allowed disabled:opacity-50"
          >
            {cancelText}
          </button>

          <button
            type="button"
            onClick={onConfirm}
            disabled={loading}
            className="cursor-pointer text-sm font-semibold text-(--app-danger) transition hover:text-(--app-danger-hover) disabled:cursor-not-allowed disabled:opacity-50"
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
