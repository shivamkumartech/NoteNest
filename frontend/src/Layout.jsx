import { Outlet, useLocation } from "react-router-dom";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";

function Layout() {
  const location = useLocation();
  const isLanding = location.pathname === "/";

  return (
    <div className="relative flex min-h-screen flex-col bg-gray-950 text-white">
      <Navbar />

      <main className={`relative flex-1 ${isLanding ? "w-full" : "container mx-auto p-4"}`}>
        <Outlet />
      </main>

      <Footer />
    </div>
  );
}

export default Layout;
