import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";

// Automatically reload the page when a dynamically imported module fails to load (e.g. after a new deployment)
window.addEventListener("vite:preloadError", (event) => {
  event.preventDefault();

  const hasReloaded = sessionStorage.getItem("notenest_chunk_reloaded");
  if (!hasReloaded) {
    sessionStorage.setItem("notenest_chunk_reloaded", "true");
    window.location.reload();
  }
});

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
