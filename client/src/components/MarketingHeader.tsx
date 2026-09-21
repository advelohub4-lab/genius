import { useState } from "react";
import { Link } from "wouter";
import { Menu, X } from "lucide-react";
import { Skill2EarnLogo } from "./Skill2EarnLogo";

const menuItems = [
  ["#how-it-works", "How it works"],
  ["/app/jobs", "Find work"],
  ["/app/learn", "Learning"],
  ["/app/earnings", "Earnings"],
  ["/legal/disclaimer", "Earnings disclaimer"],
];

export function MarketingHeader() {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);
  return (
    <header className="sticky top-0 z-30 border-b border-gray-200 bg-white/95 backdrop-blur-sm">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 lg:px-8">
        <Skill2EarnLogo />
        <nav className="hidden items-center gap-1 md:flex">
          {menuItems.map(([href, label]) =>
            href.startsWith("#") ? (
              <a
                key={href}
                href={href}
                className="rounded-lg px-3 py-2 text-[13px] font-medium text-gray-600 transition hover:bg-gray-50 hover:text-gray-900"
              >
                {label}
              </a>
            ) : (
              <Link
                key={href}
                href={href}
                className="rounded-lg px-3 py-2 text-[13px] font-medium text-gray-600 transition hover:bg-gray-50 hover:text-gray-900"
              >
                {label}
              </Link>
            )
          )}
        </nav>
        <div className="flex items-center gap-2">
          <Link
            href="/auth/signin"
            className="hidden rounded-lg px-3.5 py-2 text-[13px] font-medium text-gray-600 transition hover:bg-gray-50 hover:text-gray-900 sm:inline-flex"
          >
            Sign in
          </Link>
          <Link
            href="/auth/signup"
            className="hidden rounded-lg bg-blue-700 px-3.5 py-2 text-[13px] font-medium text-white transition hover:bg-blue-800 sm:inline-flex"
          >
            Get started
          </Link>
          <button
            onClick={() => setOpen((v) => !v)}
            className="grid h-9 w-9 place-items-center rounded-lg border border-gray-200 text-gray-700 md:hidden"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>
      {open && (
        <div className="border-t border-gray-100 bg-white px-5 py-3 md:hidden">
          <nav className="grid gap-0.5">
            {menuItems.map(([href, label]) =>
              href.startsWith("#") ? (
                <a
                  key={href}
                  href={href}
                  onClick={close}
                  className="rounded-lg px-3 py-2.5 text-sm font-medium text-gray-600 hover:bg-gray-50"
                >
                  {label}
                </a>
              ) : (
                <Link
                  key={href}
                  href={href}
                  onClick={close}
                  className="rounded-lg px-3 py-2.5 text-sm font-medium text-gray-600 hover:bg-gray-50"
                >
                  {label}
                </Link>
              )
            )}
            <div className="mt-2 grid grid-cols-2 gap-2 border-t border-gray-100 pt-3">
              <Link
                href="/auth/signin"
                onClick={close}
                className="rounded-lg border border-gray-200 px-3 py-2.5 text-center text-sm font-medium text-gray-700"
              >
                Sign in
              </Link>
              <Link
                href="/auth/signup"
                onClick={close}
                className="rounded-lg bg-blue-700 px-3 py-2.5 text-center text-sm font-medium text-white"
              >
                Get started
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
