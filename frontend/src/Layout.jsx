import { Outlet } from "react-router";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";

function Layout() {
  return (
    <div className="relative flex min-h-screen flex-col bg-gray-950 text-white">
      {/* Subtle ambient lighting - natural dark-mode depth */}
      <div
        className="pointer-events-none fixed inset-x-0 top-0 h-[500px] bg-[radial-gradient(ellipse_70%_50%_at_50%_-10%,rgba(59,130,246,0.07),transparent_70%)]"
        aria-hidden="true"
      />

      <Navbar />

      <main className="relative flex-1 container mx-auto p-4">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
}

export default Layout;
