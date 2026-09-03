import { Link } from "react-router-dom";
import { ArrowRight, NotebookText, ShieldCheck, Zap } from "lucide-react";

function Landing() {
  return (
    <div className="flex min-h-[calc(100vh-140px)] flex-col">

          {/* Hero */}
      <section className="flex flex-1 items-center justify-center px-4 py-16 sm:py-20">
        <div className="mx-auto max-w-4xl text-center">
          <div className="mb-7 flex justify-center">
            <div className="rounded-2xl bg-blue-500/10 p-4 ring-1 ring-blue-500/20">
              <NotebookText className="h-12 w-12 text-blue-400" />
            </div>
          </div>

          <div className="mb-4 inline-flex items-center rounded-full border border-gray-800 bg-gray-900/70 px-4 py-1.5 text-sm text-gray-400">
            A simple place for your ideas
          </div>

          <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl">
            Your thoughts.
            <span className="block text-blue-400">Organized simply.</span>
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-gray-400 sm:text-lg">
            Create, manage, and organize your notes in one focused workspace.
            Keep your ideas accessible without unnecessary complexity.
          </p>

          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              to="/register"
              className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-blue-500 px-6 py-3 font-medium text-white transition hover:bg-blue-600 sm:w-auto"
            >
              Get Started
              <ArrowRight className="h-4 w-4" />
            </Link>

            <Link
              to="/login"
              className="inline-flex w-full items-center justify-center rounded-lg border border-gray-700 px-6 py-3 font-medium text-gray-200 transition hover:border-gray-600 hover:bg-gray-800 sm:w-auto"
            >
              Sign In
            </Link>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="border-t border-gray-800 px-4 py-12">
        <div className="mx-auto grid max-w-4xl gap-6 md:grid-cols-3">
          <div className="rounded-2xl border border-gray-700 bg-gray-800 p-6 shadow-lg transition-all hover:border-gray-600 hover:shadow-xl">
            <NotebookText className="mb-4 h-7 w-7 text-blue-400" />

            <h2 className="text-lg font-semibold text-white">
              Create & Manage
            </h2>

            <p className="mt-2 text-sm leading-6 text-gray-400">
              Create notes quickly and keep your thoughts organized in one
              simple workspace.
            </p>
          </div>

          <div className="rounded-2xl border border-gray-700 bg-gray-800 p-6 shadow-lg transition-all hover:border-gray-600 hover:shadow-xl">
            <ShieldCheck className="mb-4 h-7 w-7 text-blue-400" />

            <h2 className="text-lg font-semibold text-white">
              Private by Account
            </h2>

            <p className="mt-2 text-sm leading-6 text-gray-400">
              Your notes are associated with your account and protected by
              authenticated access.
            </p>
          </div>

          <div className="rounded-2xl border border-gray-700 bg-gray-800 p-6 shadow-lg transition-all hover:border-gray-600 hover:shadow-xl">
            <Zap className="mb-4 h-7 w-7 text-blue-400" />

            <h2 className="text-lg font-semibold text-white">
              Focus on Your Ideas
            </h2>

            <p className="mt-2 text-sm leading-6 text-gray-400">
              A focused note-taking experience without unnecessary features
              getting in the way.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Landing;
