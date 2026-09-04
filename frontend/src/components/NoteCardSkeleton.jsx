function NoteCardSkeleton() {
  return (
    <div
      className="animate-pulse rounded-2xl border border-gray-800 bg-gray-900/70 p-6 shadow-sm"
      aria-hidden="true"
    >
      {/* Title */}
      <div className="h-5 w-2/3 rounded bg-gray-800" />

      {/* Content */}
      <div className="mt-3 space-y-2">
        <div className="h-4 w-full rounded bg-gray-800" />
        <div className="h-4 w-5/6 rounded bg-gray-800" />
      </div>

      {/* Footer */}
      <div className="mt-4 flex items-center justify-between">
        <div className="h-4 w-20 rounded bg-gray-800" />

        <div className="flex items-center gap-2">
          <div className="h-7 w-7 rounded-lg bg-gray-800" />
          <div className="h-7 w-7 rounded-lg bg-gray-800" />
        </div>
      </div>
    </div>
  );
}

export default NoteCardSkeleton;