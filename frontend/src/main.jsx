import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import Layout from "./Layout.jsx";
import Home from "./pages/Home.jsx";
import { RouterProvider } from "react-router";
import { NoteProvider } from "./context/NoteContext.jsx";
import Createnote from "./pages/Createnote.jsx";
import { AuthProvider } from "./context/AuthContext.jsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route path="" element={<Home />} />
      <Route path="create-note" element={<Createnote />} />
    </Route>,
  ),
);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <NoteProvider>
        <RouterProvider router={router} />
      </NoteProvider>
    </AuthProvider>
  </StrictMode>,
);
