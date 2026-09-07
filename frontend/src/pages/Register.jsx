import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import { AuthContext } from "../context/AuthContext";
import { toast } from "sonner";

function Register() {
  const { register } = useContext(AuthContext);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");

    if (!formData.name.trim() || !formData.email.trim() || !formData.password) {
      setError("Name, email and password are required");
      return;
    }

    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    try {
      setLoading(true);

      await register(formData.name, formData.email, formData.password);

      toast.success("Account created successfully");

      navigate("/notes", { replace: true });
    } catch (error) {
      setError(
        error.response?.data?.message ||
          "Unable to register. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto mt-6 sm:mt-10 rounded-2xl border border-(--app-border) bg-(--app-surface)/70 p-6 sm:p-8 shadow-sm">
      <h1 className="text-2xl font-semibold tracking-tight text-center text-(--app-text) mb-6">
        Create Account
      </h1>

      {error && (
        <div className="mb-4 rounded-lg bg-(--app-danger)/10 border border-(--app-danger)/30 text-(--app-danger) px-4 py-3 text-sm">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Name */}
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-(--app-text-secondary) mb-1"
          >
            Name
          </label>

          <input
            id="name"
            type="text"
            name="name"
            placeholder="Enter your name"
            value={formData.name}
            onChange={handleChange}
            autoComplete="name"
            autoFocus
            className="w-full rounded-lg border border-(--app-border-hover) bg-(--app-surface-raised)/80 px-4 py-2.5 text-sm text-(--app-text) placeholder-(--app-text-muted) outline-none transition focus:border-(--app-accent) focus:ring-1 focus:ring-(--app-accent)"
          />
        </div>

        {/* Email */}
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-(--app-text-secondary) mb-1"
          >
            Email
          </label>

          <input
            id="email"
            type="email"
            name="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleChange}
            autoComplete="email"
            className="w-full rounded-lg border border-(--app-border-hover) bg-(--app-surface-raised)/80 px-4 py-2.5 text-sm text-(--app-text) placeholder-(--app-text-muted) outline-none transition focus:border-(--app-accent) focus:ring-1 focus:ring-(--app-accent)"
          />
        </div>

        {/* Password */}
        <div>
          <label
            htmlFor="password"
            className="block text-sm font-medium text-(--app-text-secondary) mb-1"
          >
            Password
          </label>

          <div className="relative">
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Create a password"
              value={formData.password}
              onChange={handleChange}
              autoComplete="new-password"
              className="w-full rounded-lg border border-(--app-border-hover) bg-(--app-surface-raised)/80 px-4 py-2.5 pr-11 text-sm text-(--app-text) placeholder-(--app-text-muted) outline-none transition focus:border-(--app-accent) focus:ring-1 focus:ring-(--app-accent)"
            />

            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-(--app-text-secondary) hover:text-(--app-text) transition"
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full cursor-pointer rounded-lg bg-(--app-accent) px-4 py-2.5 text-sm font-medium text-white shadow-sm transition hover:bg-(--app-accent-hover) disabled:cursor-not-allowed disabled:opacity-50"
        >
          {loading ? "Creating account..." : "Register"}
        </button>
      </form>

      <p className="text-center text-sm text-(--app-text-secondary) mt-5">
        Already have an account?{" "}
        <Link
          to="/login"
          className="text-(--app-accent) hover:text-(--app-accent-hover) font-medium"
        >
          Login
        </Link>
      </p>
    </div>
  );
}

export default Register;