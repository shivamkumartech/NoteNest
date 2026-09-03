import { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Menu, NotebookText, X } from "lucide-react";
import { AuthContext } from "../context/AuthContext";
import { toast } from "sonner";
import ConfirmDialog from "./ConfirmDialog";

function NavLinks({ user, location, onNavigate, onLogout, mobile = false }) {
  const homePath = user ? "/app" : "/";

  const linkClass = (path) =>
    `hover:text-blue-400 transition ${
      location.pathname === path
        ? "text-blue-400 font-semibold"
        : "text-gray-300"
    }`;

  return (
    <>
      <Link to={homePath} onClick={onNavigate} className={linkClass(homePath)}>
        Home
      </Link>

      {user && (
        <Link
          to="/create-note"
          onClick={onNavigate}
          className={linkClass("/create-note")}
        >
          Create Note
        </Link>
      )}

      {user ? (
        <>
          <span className="text-gray-300">Hi, {user.name}</span>

          <button
            onClick={onLogout}
            className={
              mobile
                ? "text-left text-gray-300 hover:text-red-400 transition"
                : "text-gray-300 hover:text-red-400 transition"
            }
          >
            Logout
          </button>
        </>
      ) : (
        <>
          <Link
            to="/login"
            onClick={onNavigate}
            className={linkClass("/login")}
          >
            Login
          </Link>

          <Link
            to="/register"
            onClick={onNavigate}
            className={linkClass("/register")}
          >
            Register
          </Link>
        </>
      )}
    </>
  );
}

function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();

  const { user, logout } = useContext(AuthContext);

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showLogoutDialog, setShowLogoutDialog] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const handleOpenLogoutDialog = () => {
    closeMenu();
    setShowLogoutDialog(true);
  };

  const handleConfirmLogout = async () => {
    try {
      setIsLoggingOut(true);

      await logout();

      setShowLogoutDialog(false);

      toast.success("Logged out successfully");

      navigate("/login");
    } catch (error) {
      console.error("Logout error:", error);

      toast.error(
        error.response?.data?.message || "Unable to logout. Please try again.",
      );
    } finally {
      setIsLoggingOut(false);
    }
  };

  return (
    <nav className="relative sticky top-0 z-50 bg-gray-900 px-6 py-3 text-white shadow-lg">
      <div className="container mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link to="/" onClick={closeMenu} className="flex items-center gap-2">
          <NotebookText className="h-7 w-7 text-blue-400" />

          <span className="text-2xl tracking-wide text-blue-400">NoteNest</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-6 md:flex">
          <NavLinks
            user={user}
            location={location}
            onNavigate={undefined}
            onLogout={handleOpenLogoutDialog}
          />
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMenuOpen((prev) => !prev)}
          className="text-gray-300 transition hover:text-blue-400 md:hidden"
          aria-label={
            isMenuOpen ? "Close navigation menu" : "Open navigation menu"
          }
          aria-expanded={isMenuOpen}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="absolute left-0 right-0 top-full border-t border-gray-800 bg-gray-900 px-6 py-4 shadow-lg md:hidden">
          <div className="flex flex-col gap-4">
            <NavLinks
              user={user}
              location={location}
              onNavigate={closeMenu}
              onLogout={handleOpenLogoutDialog}
              mobile
            />
          </div>
        </div>
      )}

      <ConfirmDialog
        isOpen={showLogoutDialog}
        title="Log out of NoteNest?"
        message="Are you sure you want to log out of your account?"
        onConfirm={handleConfirmLogout}
        onCancel={() => setShowLogoutDialog(false)}
        loading={isLoggingOut}
        confirmText="Logout"
        confirmLoadingText="Logging out..."
      />
    </nav>
  );
}

export default Navbar;
