import { AuthBootstrap } from "./components/AuthBootstrap.jsx";
import { AuthProvider } from "./context/AuthContext.jsx";
import { NoteProvider } from "./context/NoteContext.jsx";
import { Toaster } from "sonner";
import { useToastCleanup } from "./hooks/useToastCleanup.js";
import { TOAST_CONFIG } from "./config/toast.js";
import { useMemo } from "react";

function App() {
  useToastCleanup();
  
  const toastConfig = useMemo(() => TOAST_CONFIG, []);

  return (
    <AuthProvider>
      <NoteProvider>
        <AuthBootstrap />
        <Toaster {...toastConfig} />
      </NoteProvider>
    </AuthProvider>
  );
}

export default App;