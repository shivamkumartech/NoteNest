import { useContext } from "react";
import { Outlet } from "react-router";
import { AuthContext } from "./context/AuthContext";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";

function Layout() {
  const { loading } = useContext(AuthContext);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-10 h-10 border-4 border-gray-700 border-t-blue-400 rounded-full animate-spin mx-auto mb-4" />

          <p className="text-gray-400">
            Loading NoteNest...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-900 text-white">
      <Navbar />

      <main className="flex-1 container mx-auto p-4">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
}

export default Layout;