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
import { RouterProvider } from "react-router-dom";
import { NoteProvider } from "./context/NoteContext.jsx";
import Createnote from "./pages/Createnote.jsx";
import { AuthProvider } from "./context/AuthContext.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import { Toaster } from "sonner";
import NotFound from "./pages/NotFound.jsx";
import PublicRoute from "./components/PublicRoute.jsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route element={<PublicRoute />}>
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
      </Route>

      <Route element={<ProtectedRoute />}>
        <Route path="" element={<Home />} />
        <Route path="create-note" element={<Createnote />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Route>,
  ),
);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <NoteProvider>
        <RouterProvider router={router} />
        <Toaster position="top-right" richColors />
      </NoteProvider>
    </AuthProvider>
  </StrictMode>,
);
