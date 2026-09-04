import { Link } from "react-router-dom";
import { ArrowDown, ArrowUpRight } from "lucide-react";

function Landing() {
  return (
    <main className="overflow-x-hidden bg-gray-950 text-white">
      {/* Hero */}
      <section className="relative flex min-h-[calc(100vh-64px)] items-center px-6 sm:px-10 lg:px-16">
        <div className="mx-auto w-full max-w-5xl">
          <div className="grid items-center gap-16 lg:grid-cols-[1fr_320px] lg:gap-24">
            {/* Main Content */}
            <div>
              <h1 className="max-w-3xl text-5xl font-medium leading-[1.04] tracking-[-0.045em] text-gray-100 sm:text-6xl lg:text-7xl">
                Keep the things
                <br />
                <span className="text-gray-500">
                  worth remembering.
                </span>
              </h1>

              <p className="mt-7 max-w-xl text-base leading-7 text-gray-500">
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
                  className="text-sm text-gray-600 transition-colors duration-200 hover:text-gray-300"
                >
                  Sign in
                </Link>
              </div>
            </div>

            {/* Quick Note */}
            <div className="border-l border-gray-800 pl-6 sm:pl-8">
              <p className="text-[11px] uppercase tracking-[0.18em] text-gray-700">
                Note
              </p>

              <p className="mt-5 max-w-xs text-sm leading-6 text-gray-500">
                Don't overthink it. Write something down while it's still in
                your head.
              </p>

              <div className="mt-6 h-px w-8 bg-gray-800" />

              <p className="mt-5 text-xs leading-5 text-gray-700">
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
          className="group absolute bottom-8 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-gray-700 transition-colors duration-200 hover:text-gray-500 sm:flex"
          aria-label="Scroll to Why NoteNest"
        >
          <span className="text-[10px] uppercase tracking-[0.18em]">
            Scroll
          </span>

          <ArrowDown className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-y-1" />
        </a>
      </section>

      {/* Why NoteNest */}
      <section
        id="why-notenest"
        className="scroll-mt-16 border-y border-gray-900 px-6 py-24 sm:px-10 lg:px-16 lg:py-32"
      >
        <div className="mx-auto max-w-5xl">
          <div className="grid gap-10 lg:grid-cols-[160px_1fr]">
            {/* Label */}
            <div>
              <p className="text-xs uppercase tracking-[0.18em] text-gray-700">
                Why NoteNest
              </p>
            </div>

            {/* Content */}
            <div>
              <p className="max-w-2xl text-2xl font-medium leading-9 tracking-tight text-gray-300 sm:text-3xl">
                Not a productivity system.
                <br />
                Not another workspace.
                <br />
                Just a place for your thoughts.
              </p>

              <p className="mt-7 max-w-xl text-sm leading-7 text-gray-600">
                Open a note, write something down, and get back to what you
                were doing.
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
              <span className="font-mono text-xs text-gray-700">
                01
              </span>

              <h2 className="mt-4 text-sm font-medium text-gray-300">
                Write
              </h2>

              <p className="mt-2 max-w-xs text-sm leading-6 text-gray-600">
                Get the thought out of your head and somewhere you can keep
                it.
              </p>
            </div>

            {/* 02 */}
            <div>
              <span className="font-mono text-xs text-gray-700">
                02
              </span>

              <h2 className="mt-4 text-sm font-medium text-gray-300">
                Keep
              </h2>

              <p className="mt-2 max-w-xs text-sm leading-6 text-gray-600">
                Keep your notes together instead of letting them disappear
                across different places.
              </p>
            </div>

            {/* 03 */}
            <div>
              <span className="font-mono text-xs text-gray-700">
                03
              </span>

              <h2 className="mt-4 text-sm font-medium text-gray-300">
                Return
              </h2>

              <p className="mt-2 max-w-xs text-sm leading-6 text-gray-600">
                Come back when you need an old idea, reminder, or thought.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="border-t border-gray-900 px-6 py-20 sm:px-10 lg:px-16">
        <div className="mx-auto max-w-5xl">
          <div className="flex flex-col justify-between gap-8 sm:flex-row sm:items-end">
            <div>
              <p className="text-2xl font-medium tracking-tight text-gray-300 sm:text-3xl">
                Have something to remember?
              </p>

              <p className="mt-2 text-sm text-gray-600">
                Put it somewhere you'll find it again.
              </p>
            </div>

            <Link
              to="/register"
              className="group inline-flex w-fit items-center gap-2 rounded-md bg-blue-600 px-4 py-2.5 text-sm font-medium text-white transition-colors duration-200 hover:bg-blue-500"
            >
              Create account

              <ArrowUpRight className="h-4 w-4 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

export default Landing;