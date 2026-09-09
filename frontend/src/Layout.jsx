import { Suspense } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import LoadingSpinner from "./components/LoadingSpinner";

function Layout() {
  const location = useLocation();
  const isLanding = location.pathname === "/";

  return (
    <div className="relative flex min-h-screen flex-col bg-(--app-bg) text-(--app-text)">
      <Navbar />

      <main
        className={`relative flex-1 ${isLanding ? "w-full" : "container mx-auto p-4"}`}
      >
        <Suspense fallback={<LoadingSpinner />}>
          <Outlet />
        </Suspense>
      </main>

      <Footer />
    </div>
  );
}

export default Layout;
