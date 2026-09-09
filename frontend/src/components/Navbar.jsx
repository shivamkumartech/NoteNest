import { useContext, useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { EllipsisVertical } from "lucide-react";
import { AuthContext } from "../context/AuthContext";
import { toast } from "sonner";
import ConfirmDialog from "./ConfirmDialog";

function NavLinks({ user, onNavigate, onLogout, mobile = false }) {
  if (user) {
    if (mobile) {
      return (
        <button
          type="button"
          onClick={onLogout}
          className="w-full cursor-pointer rounded-lg px-3 py-2.5 text-left text-sm text-(--app-text-secondary) transition-colors duration-150 hover:bg-(--app-surface-raised) hover:text-(--app-text)"
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
      <Link
        to="/login"
        onClick={onNavigate}
        className={
          mobile
            ? "block rounded-lg px-3 py-2.5 text-sm text-(--app-text-secondary) transition-colors duration-150 hover:bg-(--app-surface-raised) hover:text-(--app-text)"
            : "text-sm text-(--app-text-secondary) transition-colors duration-200 hover:text-(--app-text)"
        }
      >
        Sign in
      </Link>

      <Link
        to="/register"
        onClick={onNavigate}
        className={
          mobile
            ? "block rounded-lg px-3 py-2.5 text-sm text-(--app-text-secondary) transition-colors duration-150 hover:bg-(--app-surface-raised) hover:text-(--app-text)"
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

  const menuRef = useRef(null);

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    if (!isMenuOpen) return;

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setIsMenuOpen(false);
      }
    };

    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("mousedown", handleClickOutside);
    };
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
    <nav className="sticky top-0 z-50 border-b border-(--app-border) bg-(--app-bg)/90 px-6 py-4 text-(--app-text) backdrop-blur-md">
      <div className="container mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link to={homePath} onClick={closeMenu} className="flex items-center">
          <span className="text-lg font-extrabold tracking-tight text-(--app-text)">
            Daykeep
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

        {/* Mobile Overflow Menu */}
        <div ref={menuRef} className="relative md:hidden">
          <button
            type="button"
            onClick={() => setIsMenuOpen((prev) => !prev)}
            className="flex cursor-pointer items-center justify-center rounded-lg text-(--app-text) transition-colors duration-200 hover:bg-(--app-surface-raised) hover:text-(--app-text)"
            aria-label="More options"
            aria-expanded={isMenuOpen}
          >
            <EllipsisVertical size={21} />
          </button>

          {isMenuOpen && (
            <div className="absolute right-0 top-full mt-3 w-auto rounded-xl border border-(--app-border) bg-(--app-surface) p-1.5 shadow-md">
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
          )}
        </div>
      </div>

      {/* Logout Confirmation */}
      <ConfirmDialog
        isOpen={showLogoutDialog}
        message="Are you sure you want to log out of Daykeep?"
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
