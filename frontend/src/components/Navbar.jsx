import { useContext, useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Menu, NotebookText, X } from "lucide-react";
import { AuthContext } from "../context/AuthContext";
import { toast } from "sonner";
import ConfirmDialog from "./ConfirmDialog";

function NavLinks({ user, location, onNavigate, onLogout, mobile = false }) {
  const linkClass = (path) =>
    `transition-colors duration-200 ${mobile ? "py-1.5" : ""} ${
      location.pathname === path
        ? "font-medium text-(--app-text)"
        : "text-(--app-text-secondary) hover:text-(--app-text)"
    }`;

  if (user) {
    if (mobile) {
      return (
        <button
          type="button"
          onClick={onLogout}
          className="cursor-pointer py-1.5 text-left text-(--app-text-secondary) transition-colors duration-200 hover:text-(--app-danger)"
        >
          Logout
        </button>
      );
    }

    return (
      <button
        type="button"
        onClick={onLogout}
        className="cursor-pointer rounded-full border border-(--app-border-hover) px-3.5 py-1.5 text-sm text-(--app-text-secondary) transition-colors duration-200 hover:border-(--app-border-hover) hover:bg-(--app-surface-raised) hover:text-(--app-text)"
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
            : "rounded-full bg-(--app-accent) px-4 py-1.5 text-sm font-medium text-(--app-bg) transition-colors duration-200 hover:bg-(--app-accent-hover)"
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
    <nav className="sticky top-0 z-50 border-b border-(--app-border) bg-(--app-bg)/90 px-6 py-3.5 text-(--app-text) backdrop-blur-md">
      <div className="container mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link
          to={homePath}
          onClick={closeMenu}
          className="flex items-center gap-2"
        >
          <NotebookText className="h-5 w-5 text-(--app-text)" />

          <span className="text-lg font-extrabold tracking-tight text-(--app-text)">
            NoteNest
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
          className="cursor-pointer text-(--app-text-secondary) transition-colors duration-200 hover:text-(--app-text) md:hidden"
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
            className="fixed inset-0 top-14.25 z-40 bg-black/50 md:hidden"
            onClick={closeMenu}
            aria-hidden="true"
          />

          <div className="absolute left-0 right-0 top-full z-50 border-t border-(--app-border) bg-(--app-bg)/95 px-6 py-4 shadow-xl backdrop-blur-md md:hidden">
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
        message="Are you sure you want to log out?"
        onConfirm={handleConfirmLogout}
        onCancel={() => setShowLogoutDialog(false)}
        loading={isLoggingOut}
        confirmText="Log out"
        confirmLoadingText="Logging out..."
      />
    </nav>
  );
}

export default Navbar;
