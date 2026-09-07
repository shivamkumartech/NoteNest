function LoadingSpinner() {
  return (
    <div
      className="flex min-h-screen items-center justify-center"
      style={{ background: "var(--app-bg)" }}
    >
      <div
        className="h-8 w-8 animate-spin rounded-full border-3"
        style={{
          borderColor: "var(--app-accent-soft)",
          borderTopColor: "var(--app-accent)",
        }}
      />
    </div>
  );
}

export default LoadingSpinner;
