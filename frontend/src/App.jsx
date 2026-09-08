import { AuthBootstrap } from "./components/AuthBootstrap.jsx";
import { AuthProvider } from "./context/AuthContext.jsx";
import { NoteProvider } from "./context/NoteContext.jsx";
import { Toaster } from "sonner";
import { useToastCleanup } from "./hooks/useToastCleanup.js";
import { TOAST_CONFIG } from "./config/toast.js";

function App() {
  useToastCleanup();

  return (
    <AuthProvider>
      <NoteProvider>
        <AuthBootstrap />
        <Toaster {...TOAST_CONFIG} />
      </NoteProvider>
    </AuthProvider>
  );
}

export default App;
