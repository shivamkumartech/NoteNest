import { useContext } from "react";
import { Link, Navigate } from "react-router-dom";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import { AuthContext } from "../context/AuthContext";

function Landing() {
  const { user, loading } = useContext(AuthContext);

  if (!loading && user) {
    return <Navigate to="/notes" replace />;
  }
  return (
    <div className="bg-gray-950 text-white">
      {/* Hero */}
      <section className="relative flex min-h-[calc(100vh-64px)] items-center px-6 pb-20 pt-8 sm:px-10 sm:py-0 lg:px-16">
        <div className="mx-auto w-full max-w-5xl">
          <div className="grid items-center gap-16 lg:grid-cols-[1fr_320px] lg:gap-24">
            {/* Main Content */}
            <div>
              <h1 className="max-w-3xl text-5xl font-semibold leading-[1.08] tracking-tight text-white sm:text-6xl lg:text-7xl">
                Keep the things
                <br />
                <span className="text-gray-400">worth remembering.</span>
              </h1>

              <p className="mt-7 max-w-xl text-base leading-relaxed text-gray-400 sm:text-lg">
                Ideas, plans, reminders, and everything in between. Write it
                down and come back to it whenever you need.
              </p>

              {/* Actions */}
              <div className="mt-9 flex items-center gap-6">
                <Link
                  to="/register"
                  className="group inline-flex items-center gap-2 text-sm font-medium text-blue-400 transition-colors duration-200 hover:text-blue-300"
                >
                  Start writing
                  <ArrowUpRight className="h-4 w-4 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </Link>

                <Link
                  to="/login"
                  className="text-sm text-gray-400 transition-colors duration-200 hover:text-white"
                >
                  Sign in
                </Link>
              </div>
            </div>

            {/* Quick Note */}
            <div className="border-l border-gray-800 pl-6 sm:pl-8">
              <p className="text-xs font-semibold uppercase tracking-wider text-blue-400">
                Note
              </p>

              <p className="mt-4 max-w-xs text-sm leading-relaxed text-gray-300">
                Don't overthink it. Write something down while it's still in
                your head.
              </p>

              <p className="mt-5 text-xs leading-relaxed text-gray-500">
                A thought doesn't need a system.
                <br />
                Sometimes it just needs a place.
              </p>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <a
          href="#why-notenest"
          className="group absolute bottom-4 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2 text-gray-500 transition-colors duration-200 hover:text-blue-400 sm:bottom-8"
          aria-label="Scroll to Why NoteNest"
        >
          <span className="text-[10px] font-medium uppercase tracking-widest text-gray-500 transition-colors group-hover:text-blue-400">
            Scroll
          </span>

          <ArrowDown className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-y-1" />
        </a>
      </section>

      {/* Why NoteNest */}
      <section
        id="why-notenest"
        className="scroll-mt-16 border-y border-gray-800/80 px-6 py-24 sm:px-10 lg:px-16 lg:py-32"
      >
        <div className="mx-auto max-w-5xl">
          <div className="grid gap-10 lg:grid-cols-[160px_1fr]">
            {/* Label */}
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-blue-400">
                Why NoteNest
              </p>
            </div>

            {/* Content */}
            <div>
              <p className="max-w-2xl text-2xl font-semibold leading-relaxed tracking-tight text-white sm:text-3xl">
                Not a productivity system.
                <br />
                Not another workspace.
                <br />
                <span className="text-gray-400">
                  Just a place for your thoughts.
                </span>
              </p>

              <p className="mt-6 max-w-xl text-sm leading-relaxed text-gray-400">
                Open a note, write something down, and get back to what you were
                doing.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Principles */}
      <section className="px-6 py-20 sm:px-10 lg:px-16 lg:py-28">
        <div className="mx-auto max-w-5xl">
          <div className="grid gap-12 md:grid-cols-3 md:gap-8">
            {/* 01 */}
            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-blue-400">
                01
              </span>

              <h2 className="mt-3 text-base font-semibold tracking-tight text-white">
                Write
              </h2>

              <p className="mt-2 max-w-xs text-sm leading-relaxed text-gray-400">
                Get the thought out of your head and somewhere you can keep it.
              </p>
            </div>

            {/* 02 */}
            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-blue-400">
                02
              </span>

              <h2 className="mt-3 text-base font-semibold tracking-tight text-white">
                Keep
              </h2>

              <p className="mt-2 max-w-xs text-sm leading-relaxed text-gray-400">
                Keep your notes together instead of letting them disappear
                across different places.
              </p>
            </div>

            {/* 03 */}
            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-blue-400">
                03
              </span>

              <h2 className="mt-3 text-base font-semibold tracking-tight text-white">
                Return
              </h2>

              <p className="mt-2 max-w-xs text-sm leading-relaxed text-gray-400">
                Come back when you need an old idea, reminder, or thought.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="border-t border-gray-800/80 px-6 py-20 sm:px-10 lg:px-16">
        <div className="mx-auto max-w-5xl">
          <div className="flex flex-col justify-between gap-8 sm:flex-row sm:items-end">
            <div>
              <p className="text-2xl font-semibold tracking-tight text-white sm:text-3xl">
                Have something to remember?
              </p>

              <p className="mt-2 text-sm text-gray-400">
                Put it in NoteNest you'll find it again.
              </p>
            </div>

            <Link
              to="/register"
              className="group inline-flex w-fit cursor-pointer items-center gap-2 rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-medium text-white shadow-sm transition hover:bg-blue-700"
            >
              Create account
              <ArrowUpRight className="h-4 w-4 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Landing;
