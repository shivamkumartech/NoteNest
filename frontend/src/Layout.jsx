import { Suspense } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";

function Layout() {
  const location = useLocation();
  const isLanding = location.pathname === "/";

  return (
    <div className="relative flex min-h-screen flex-col bg-gray-950 text-white">
      <Navbar />

      <main
        className={`relative flex-1 ${isLanding ? "w-full" : "container mx-auto p-4"}`}
      >
        <Suspense
          fallback={
            <div className="flex min-h-[50vh] items-center justify-center">
              <div className="h-8 w-8 animate-spin rounded-full border-3 border-blue-500/20 border-t-blue-500" />
            </div>
          }
        >
          <Outlet />
        </Suspense>
      </main>

      <Footer />
    </div>
  );
}

export default Layout;
