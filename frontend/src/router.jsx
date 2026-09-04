import { lazy } from "react";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import Layout from "./Layout.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import PublicRoute from "./components/PublicRoute.jsx";

const Landing = lazy(() => import("./pages/Landing.jsx"));
const Home = lazy(() => import("./pages/Home.jsx"));
const CreateNote = lazy(() => import("./pages/CreateNote.jsx"));
const Login = lazy(() => import("./pages/Login.jsx"));
const Register = lazy(() => import("./pages/Register.jsx"));
const NotFound = lazy(() => import("./pages/NotFound.jsx"));

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      {/* Public Landing Page */}
      <Route index element={<Landing />} />

      {/* Public Auth Pages */}
      <Route element={<PublicRoute />}>
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
      </Route>

      {/* Protected App Pages */}
      <Route element={<ProtectedRoute />}>
        <Route path="notes" element={<Home />} />
        <Route path="create-note" element={<CreateNote />} />
      </Route>

      <Route path="*" element={<NotFound />} />
    </Route>,
  ),
);

export default router;
