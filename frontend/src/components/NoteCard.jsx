import { Link } from "react-router-dom";
import formatNoteDate from "../utils/formatNoteDate";

function NoteCard({ note }) {
  return (
    <Link
      to={`/notes/${note._id}`}
      className="group relative flex flex-col rounded-2xl border border-(--app-border) bg-(--app-surface)/70 p-4 shadow-sm transition-all duration-200 hover:border-(--app-border-hover) hover:bg-(--app-surface)/90 hover:shadow-md"
    >
      <h2 className="line-clamp-1 wrap-break-word text-lg font-semibold tracking-tight text-(--app-text)">
        {note.title}
      </h2>

      <p className="mt-2.5 min-h-12 line-clamp-2 wrap-break-word text-sm leading-relaxed text-(--app-text-secondary)">
        {note.content}
      </p>

      {/* Footer: date */}
      <div className="mt-4 flex items-center text-sm text-(--app-text-secondary)">
        <span>{formatNoteDate(note.createdAt, note.updatedAt)}</span>
      </div>
    </Link>
  );
}

export default NoteCard;