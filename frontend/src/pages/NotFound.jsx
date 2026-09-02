import { Link } from "react-router-dom";
import { FileQuestion } from "lucide-react";

function NotFound() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center text-center px-4">
      <FileQuestion className="w-16 h-16 text-gray-500 mb-4" />

      <h1 className="text-4xl font-bold text-white">404</h1>

      <h2 className="mt-2 text-xl font-semibold text-gray-300">
        Page not found
      </h2>

      <p className="mt-2 text-gray-400">
        The page you're looking for doesn't exist.
      </p>

      <Link
        to="/"
        className="mt-6 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-5 py-2.5 rounded-lg transition"
      >
        Back to Home
      </Link>
    </div>
  );
}

export default NotFound;
