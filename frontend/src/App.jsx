import { useEffect, useContext } from "react";
import { RouterProvider } from "react-router-dom";
import { Toaster, toast } from "sonner";
import { AuthProvider, AuthContext } from "./context/AuthContext.jsx";
import { NoteProvider } from "./context/NoteContext.jsx";
import router from "./router.jsx";

function AuthBootstrap() {
  const { authStatus } = useContext(AuthContext);

  if (authStatus === "checking") {
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

  return <RouterProvider router={router} />;
}

function App() {
  useEffect(() => {
    const handleVisibilityChange = () => {
      toast.dismiss();
    };

    const handlePageShow = () => {
      toast.dismiss();
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    window.addEventListener("pageshow", handlePageShow);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      window.removeEventListener("pageshow", handlePageShow);
    };
  }, []);

  return (
    <AuthProvider>
      <NoteProvider>
        <AuthBootstrap />
        <Toaster
          position="top-right"
          offset="16px"
          theme="dark"
          visibleToasts={3}
          toastOptions={{
            duration: 1500,
            style: {
              background: "var(--app-surface)",
              color: "var(--app-text)",
              border: "1px solid var(--app-border)",
            },
          }}
        />
      </NoteProvider>
    </AuthProvider>
  );
}

export default App;
