import { RouterProvider } from "react-router-dom";
import { Toaster } from "sonner";
import { AuthProvider, AuthContext } from "./context/AuthContext.jsx";
import { NoteProvider } from "./context/NoteContext.jsx";
import router from "./router.jsx";
import { useContext } from "react";

function AuthBootstrap() {
  const { authStatus } = useContext(AuthContext);

  if (authStatus === "checking") {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-950">
        <div className="h-8 w-8 animate-spin rounded-full border-3 border-blue-500/20 border-t-blue-500" />
      </div>
    );
  }

  return <RouterProvider router={router} />;
}

function App() {
  return (
    <AuthProvider>
      <NoteProvider>
        <AuthBootstrap />
        <Toaster position="top-right" richColors />
      </NoteProvider>
    </AuthProvider>
  );
}

export default App;