import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import { AuthContext } from "../context/AuthContext";
import { toast } from "sonner";

function Login() {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
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

    if (!formData.email.trim() || !formData.password) {
      setError("Email and password are required");
      return;
    }

    try {
      setLoading(true);

      await login(formData.email, formData.password);

      toast.success("Logged in successfully");

      navigate("/notes", { replace: true });
    } catch (error) {
      setError(
        error.response?.data?.message || "Unable to login. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto mt-6 sm:mt-10 rounded-2xl border border-(--app-border) bg-(--app-surface)/70 p-6 sm:p-8 shadow-sm">
      <h1 className="text-2xl font-semibold tracking-tight text-center text-(--app-text) mb-6">
        Sign in
      </h1>

      {error && (
        <div className="mb-4 rounded-lg bg-(--app-danger)/10 border border-(--app-danger)/30 text-(--app-danger) px-4 py-3 text-sm">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
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
            autoFocus
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
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
              autoComplete="current-password"
              className="w-full rounded-lg border border-(--app-border-hover) bg-(--app-surface-raised)/80 px-4 py-2.5 pr-11 text-sm text-(--app-text) placeholder-(--app-text-muted) outline-none transition focus:border-(--app-accent) focus:ring-1 focus:ring-(--app-accent)"
            />

            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-(--app-text-secondary) hover:text-(--app-text) transition cursor-pointer"
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
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>

      <p className="text-center text-sm text-(--app-text-secondary) mt-5">
        Don't have an account?{" "}
        <Link
          to="/register"
          className="text-(--app-accent) hover:text-(--app-accent-hover) font-medium"
        >
          Register
        </Link>
      </p>
    </div>
  );
}

export default Login;