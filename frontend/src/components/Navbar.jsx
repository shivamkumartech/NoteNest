import { useContext, useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Menu, NotebookText, X } from "lucide-react";
import { AuthContext } from "../context/AuthContext";
import { toast } from "sonner";
import ConfirmDialog from "./ConfirmDialog";

function NavLinks({ user, location, onNavigate, onLogout, mobile = false }) {
  const linkClass = (path) =>
    `hover:text-blue-400 transition ${mobile ? "py-1.5" : ""} ${
      location.pathname === path
        ? "text-blue-400 font-semibold"
        : "text-gray-300"
    }`;

  if (user) {
    if (mobile) {
      return (
        <button
          type="button"
          onClick={onLogout}
          className="cursor-pointer py-1.5 text-left text-gray-300 transition hover:text-red-400"
        >
          Logout
        </button>
      );
    }

    return (
      <button
        type="button"
        onClick={onLogout}
        className="cursor-pointer rounded-lg border border-gray-700 px-3 py-1.5 text-sm text-gray-300 transition hover:border-gray-600 hover:bg-gray-800 hover:text-red-400"
      >
        Logout
      </button>
    );
  }

  return (
    <>
      <Link to="/login" onClick={onNavigate} className={linkClass("/login")}>
        Sign in
      </Link>

      <Link
        to="/register"
        onClick={onNavigate}
        className={
          mobile
            ? linkClass("/register")
            : "rounded-lg bg-blue-600 px-3.5 py-1.5 text-sm font-medium text-white transition hover:bg-blue-700"
        }
      >
        Register
      </Link>
    </>
  );
}

function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();

  const { user, authStatus, logout } = useContext(AuthContext);

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showLogoutDialog, setShowLogoutDialog] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        setIsMenuOpen(false);
      }
    };

    if (isMenuOpen) {
      window.addEventListener("keydown", handleKeyDown);
      return () => window.removeEventListener("keydown", handleKeyDown);
    }
  }, [isMenuOpen]);

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

  const homePath = user ? "/notes" : "/";

  return (
    <nav className="sticky top-0 z-50 border-b border-gray-800/80 bg-gray-950/80 px-6 py-3.5 text-white backdrop-blur-md">
      <div className="container mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link
          to={homePath}
          onClick={closeMenu}
          className="flex items-center gap-2"
        >
          <NotebookText className="h-6 w-6 text-blue-400" />

          <span className="text-xl font-bold tracking-tight text-white">
            Note<span className="text-blue-400">Nest</span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-6 md:flex">
          {authStatus !== "checking" && (
            <NavLinks
              user={user}
              location={location}
              onNavigate={undefined}
              onLogout={handleOpenLogoutDialog}
            />
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          type="button"
          onClick={() => setIsMenuOpen((prev) => !prev)}
          className="cursor-pointer text-gray-300 transition hover:text-white md:hidden"
          aria-label={
            isMenuOpen ? "Close navigation menu" : "Open navigation menu"
          }
          aria-expanded={isMenuOpen}
        >
          {isMenuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile Navigation Drawer & Backdrop */}
      {isMenuOpen && (
        <>
          <div
            className="fixed inset-0 top-[57px] z-40 bg-black/60 md:hidden"
            onClick={closeMenu}
            aria-hidden="true"
          />

          <div className="absolute left-0 right-0 top-full z-50 border-t border-gray-800/80 bg-gray-950/95 px-6 py-4 shadow-xl backdrop-blur-md md:hidden">
            <div className="flex flex-col gap-4">
              {authStatus !== "checking" && (
                <NavLinks
                  user={user}
                  location={location}
                  onNavigate={closeMenu}
                  onLogout={handleOpenLogoutDialog}
                  mobile
                />
              )}
            </div>
          </div>
        </>
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
