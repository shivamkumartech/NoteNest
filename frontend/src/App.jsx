import { RouterProvider } from "react-router-dom";
import { Toaster } from "sonner";
import { AuthProvider } from "./context/AuthContext.jsx";
import { NoteProvider } from "./context/NoteContext.jsx";
import router from "./router.jsx";

function App() {
  return (
    <AuthProvider>
      <NoteProvider>
        <RouterProvider router={router} />
        <Toaster position="top-right" richColors />
      </NoteProvider>
    </AuthProvider>
  );
}

export default App;
