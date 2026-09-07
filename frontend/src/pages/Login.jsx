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

      toast.success("Welcome back!");

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
    <div className="mx-auto mt-8 w-full max-w-md px-4 sm:mt-12 sm:px-0">
      <div className="rounded-2xl border border-(--app-border) bg-(--app-surface) p-6 shadow-sm sm:p-8">
        <div className="mb-7 text-center">
          <h1 className="text-2xl font-semibold tracking-tight text-(--app-text)">
            Sign in
          </h1>

          <p className="mt-2 text-sm text-(--app-text-secondary)">
            Welcome back to NoteNest.
          </p>
        </div>

        {error && (
          <div
            className="mb-5 rounded-lg border border-(--app-danger)/30 bg-(--app-danger)/10 px-4 py-3 text-sm text-(--app-danger)"
            role="alert"
          >
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Email */}
          <div>
            <label
              htmlFor="email"
              className="mb-1.5 block text-sm font-medium text-(--app-text)"
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
              className="w-full rounded-lg border border-(--app-border-hover) bg-(--app-bg) px-4 py-2.5 text-sm text-(--app-text) placeholder:text-(--app-text-muted) outline-none transition focus:border-(--app-text-secondary) focus:ring-1 focus:ring-(--app-border-hover)"
            />
          </div>

          {/* Password */}
          <div>
            <label
              htmlFor="password"
              className="mb-1.5 block text-sm font-medium text-(--app-text)"
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
                className="w-full rounded-lg border border-(--app-border-hover) bg-(--app-bg) px-4 py-2.5 pr-11 text-sm text-(--app-text) placeholder:text-(--app-text-muted) outline-none transition focus:border-(--app-text-secondary) focus:ring-1 focus:ring-(--app-border-hover)"
              />

              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-(--app-text-muted) transition hover:text-(--app-text)"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full cursor-pointer rounded-lg bg-(--app-accent) px-4 py-2.5 text-sm font-medium text-(--app-bg) shadow-sm transition hover:bg-(--app-accent-hover) disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-(--app-text-secondary)">
          Don't have an account?{" "}
          <Link
            to="/register"
            className="font-medium text-(--app-text) underline-offset-4 transition hover:underline"
          >
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;