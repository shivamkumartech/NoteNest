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
    <div className="overflow-hidden bg-(--app-bg) text-(--app-text)">
      {/* Hero */}
      <section className="relative min-h-[calc(100vh-64px)] px-6 sm:px-10 lg:px-16">
        {/* Subtle background detail */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-1/2 top-0 h-130 w-130 -translate-x-1/2 rounded-full opacity-30 blur-3xl"
          style={{
            background:
              "radial-gradient(circle, rgba(23,23,23,0.07) 0%, transparent 70%)",
          }}
        />

        <div className="relative mx-auto flex min-h-[calc(100vh-64px)] max-w-6xl flex-col">
          {/* Main Hero */}
          <div className="grid flex-1 items-center gap-14 py-20 lg:grid-cols-[minmax(0,1fr)_260px] lg:gap-24 lg:py-24">
            {/* Main Content */}
            <div>
              <h1 className="max-w-5xl text-[clamp(2.5rem,7.5vw,5.5rem)] font-semibold leading-[1.1] tracking-[-0.05em]">
                Keep the things
                <br />
                <span className="text-(--app-text-secondary)">
                  worth remembering
                </span>
              </h1>

              <div className="mt-7">
                <p className="max-w-xl text-base leading-7 text-(--app-text-secondary) sm:text-lg">
                  A quiet, distraction-free space for your ideas, plans,
                  reminders, unfinished thoughts, and everything in between
                </p>

                {/* Actions */}
                <div className="mt-9 flex items-center gap-5">
                  <Link
                    to="/register"
                    className="group inline-flex items-center gap-2 rounded-full bg-(--app-accent) px-5 py-2.5 text-sm font-medium text-(--app-bg) transition-all duration-200 hover:-translate-y-0.5 hover:bg-(--app-accent-hover)"
                  >
                    Start writing
                    <ArrowUpRight className="h-4 w-4 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  </Link>

                  <Link
                    to="/login"
                    className="text-sm text-(--app-text-secondary) transition-colors duration-200 hover:text-(--app-text)"
                  >
                    Sign in
                  </Link>
                </div>
              </div>
            </div>

            {/* Side Note */}
            <div className="self-center border-l border-(--app-border) pl-6 lg:self-center">
              <span className="text-[10px] font-medium uppercase tracking-[0.2em] text-(--app-text-muted)">
                Note
              </span>

              <p className="mt-4 max-w-xs text-sm leading-6 text-(--app-text-secondary)">
                A thought comes in. Capture it before it disappears. Let it stay
                with you until you need it again.
              </p>
            </div>
          </div>

          {/* Scroll */}
          <a
            href="#why-daykeep"
            className="group absolute bottom-6 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2 text-[10px] uppercase tracking-[0.2em] text-(--app-text-muted) transition-colors duration-200 hover:text-(--app-text) sm:bottom-8"
            aria-label="Scroll to Why Daykeep"
          >
            <span>Scroll</span>

            <span className="flex h-7 w-7 items-center justify-center rounded-full border border-(--app-border) transition-all duration-200 group-hover:translate-y-1 group-hover:border-(--app-border-hover)">
              <ArrowDown className="h-3.5 w-3.5" />
            </span>
          </a>
        </div>
      </section>

      {/* Why Daykeep */}
      <section
        id="why-daykeep"
        className="scroll-mt-16 border-t border-(--app-border) px-6 py-24 sm:px-10 lg:px-16 lg:py-32"
      >
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-10 lg:grid-cols-[220px_minmax(0,1fr)] lg:gap-20">
            <div>
              <h2 className="text-xs font-medium uppercase tracking-[0.18em] text-(--app-text-muted)">
                Why Daykeep
              </h2>
            </div>

            <div>
              <p className="max-w-4xl text-xl font-medium leading-[1.08] tracking-[-0.035em] sm:text-4xl lg:text-[3.25rem]">
                Your thoughts don’t always arrive organized.
                <br />
                They shouldn’t have to.
                <br />
                <span className="text-(--app-text-secondary)">
                  Just give them somewhere to go.
                </span>
              </p>

              <p className="mt-7 max-w-xl text-sm leading-7 text-(--app-text-secondary)">
                Daykeep gives your thoughts a simple place to land, just a clean
                place to write, keep what matters, and return when the time is
                right.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Principles */}
      <section className="border-t border-(--app-border) px-6 py-26 sm:px-10 lg:px-16 lg:py-28">
        <div className="mx-auto max-w-6xl">
          <div className="mb-12 flex items-end justify-between">
            <h2 className="text-xs font-medium uppercase tracking-[0.18em] text-(--app-text-muted)">
              How it works
            </h2>
          </div>

          <div className="grid border-t border-(--app-border) md:grid-cols-3">
            {/* 01 */}
            <div className="group border-b border-(--app-border) py-8 md:border-b-0 md:border-r md:pr-10">
              <div className="flex items-start justify-between">
                <span className="text-xs font-medium text-(--app-text-muted)">
                  01
                </span>

                <ArrowUpRight className="h-4 w-4 text-(--app-text-muted) opacity-0 transition-all duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:opacity-100" />
              </div>

              <h3 className="mt-14 text-lg font-medium tracking-tight">
                Write
              </h3>

              <p className="mt-3 max-w-xs text-sm leading-6 text-(--app-text-secondary)">
                Capture the thought while it’s still fresh. Don’t let a good
                idea disappear just because you weren’t ready to organize it.
              </p>
            </div>

            {/* 02 */}
            <div className="group border-b border-(--app-border) py-8 md:border-b-0 md:border-r md:px-10">
              <div className="flex items-start justify-between">
                <span className="text-xs font-medium text-(--app-text-muted)">
                  02
                </span>

                <ArrowUpRight className="h-4 w-4 text-(--app-text-muted) opacity-0 transition-all duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:opacity-100" />
              </div>

              <h3 className="mt-14 text-lg font-medium tracking-tight">Keep</h3>

              <p className="mt-3 max-w-xs text-sm leading-6 text-(--app-text-secondary)">
                Keep your notes without clutter, distractions, or unnecessary
                complexity.
              </p>
            </div>

            {/* 03 */}
            <div className="group py-8 md:pl-10">
              <div className="flex items-start justify-between">
                <span className="text-xs font-medium text-(--app-text-muted)">
                  03
                </span>

                <ArrowUpRight className="h-4 w-4 text-(--app-text-muted) opacity-0 transition-all duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:opacity-100" />
              </div>

              <h3 className="mt-14 text-lg font-medium tracking-tight">
                Return
              </h3>

              <p className="mt-3 max-w-xs text-sm leading-6 text-(--app-text-secondary)">
                Come back to your notes when they become useful. What you wrote
                today can become something tomorrow.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="border-t border-(--app-border) px-6 py-24 sm:px-10 lg:px-16 lg:py-32">
        <div className="mx-auto max-w-6xl">
          <div className="flex flex-col gap-8 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h2 className="max-w-2xl text-3xl font-medium leading-tight tracking-[-0.035em] sm:text-4xl">
                Keep what matters.
              </h2>

              <p className="mt-3 text-sm leading-6 text-(--app-text-secondary)">
                Write it now. Come back to it later.
              </p>
            </div>

            <Link
              to="/register"
              className="group inline-flex w-fit shrink-0 items-center gap-2 rounded-full bg-(--app-accent) px-6 py-3 text-sm font-medium text-(--app-bg) transition-all duration-200 hover:-translate-y-0.5 hover:bg-(--app-accent-hover)"
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