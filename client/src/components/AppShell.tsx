import { ReactNode, useState } from "react";
import { Link, useLocation } from "wouter";
import {
  Bell,
  BookOpen,
  BriefcaseBusiness,
  ChevronRight,
  CircleDollarSign,
  LayoutDashboard,
  LogOut,
  Menu,
  Settings,
  ShieldCheck,
  UserRound,
  X,
} from "lucide-react";
import { useAuth } from "@/_core/hooks/useAuth";
import { Skill2EarnLogo } from "./Skill2EarnLogo";
import { ActivationGate } from "./ActivationGate";

const navItems = [
  { href: "/app", label: "Dashboard", icon: LayoutDashboard },
  { href: "/app/learn", label: "Learning", icon: BookOpen },
  { href: "/app/jobs", label: "Find Work", icon: BriefcaseBusiness },
  { href: "/app/earnings", label: "Earnings", icon: CircleDollarSign },
  { href: "/app/profile", label: "Profile", icon: UserRound },
];

function isActive(path: string, href: string) {
  return href === "/app" ? path === "/app" : path.startsWith(href);
}

export function AppShell({
  children,
  title = "Dashboard",
  activationExempt = false,
}: {
  children: ReactNode;
  title?: string;
  activationExempt?: boolean;
}) {
  const [location, setLocation] = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const { user, logout } = useAuth();
  const displayName = user?.name?.split(" ")[0] || "Amina";

  const handleLogout = async () => {
    await logout();
    setLocation("/");
  };

  return (
    <div className="dashboard-shell">
      {/* Desktop sidebar */}
      <aside className="dashboard-sidebar fixed inset-y-0 left-0 z-40 hidden w-[240px] flex-col lg:flex">
        <div className="flex h-16 items-center px-5">
          <Skill2EarnLogo />
        </div>

        <nav className="mt-2 flex-1 space-y-0.5 px-3" aria-label="Workspace navigation">
          <p className="px-3 pb-2 pt-3 text-[11px] font-semibold uppercase tracking-wider text-gray-400">
            Workspace
          </p>
          {navItems.map(({ href, label, icon: Icon }) => (
            <Link
              key={href}
              href={href}
              data-active={isActive(location, href)}
              className="group relative flex items-center gap-3 rounded-lg px-3 py-2.5 text-[13px] font-medium"
            >
              <Icon size={18} strokeWidth={1.75} />
              <span>{label}</span>
            </Link>
          ))}
          <p className="px-3 pb-2 pt-6 text-[11px] font-semibold uppercase tracking-wider text-gray-400">
            Account
          </p>
          <Link
            href="/activate"
            className="group relative flex items-center gap-3 rounded-lg px-3 py-2.5 text-[13px] font-medium text-gray-500 transition hover:bg-gray-50 hover:text-gray-900"
          >
            <ShieldCheck size={18} strokeWidth={1.75} />
            <span>Activation</span>
          </Link>
          <Link
            href="/app/profile"
            className="group relative flex items-center gap-3 rounded-lg px-3 py-2.5 text-[13px] font-medium text-gray-500 transition hover:bg-gray-50 hover:text-gray-900"
          >
            <Settings size={18} strokeWidth={1.75} />
            <span>Settings</span>
          </Link>
        </nav>

        {/* User card */}
        <div className="border-t border-gray-100 p-3">
          <div className="flex items-center gap-3 rounded-lg px-2 py-2">
            <div className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-gray-100 text-sm font-semibold text-gray-700">
              {displayName[0]?.toUpperCase()}
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate text-[13px] font-semibold text-gray-900">
                {displayName} {user ? "" : "(demo)"}
              </p>
              <p className="truncate text-xs text-gray-400">Skill builder</p>
            </div>
            <button
              onClick={handleLogout}
              className="grid h-8 w-8 shrink-0 place-items-center rounded-lg text-gray-400 transition hover:bg-gray-100 hover:text-gray-700"
              aria-label="Sign out"
            >
              <LogOut size={16} strokeWidth={1.75} />
            </button>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <div className="lg:pl-[240px]">
        {/* Header */}
        <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-gray-200 bg-white/95 px-5 backdrop-blur-sm lg:px-8">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMenuOpen(true)}
              className="grid h-9 w-9 place-items-center rounded-lg border border-gray-200 text-gray-600 lg:hidden"
              aria-label="Open navigation"
            >
              <Menu size={18} />
            </button>
            <div>
              <h1 className="text-[15px] font-semibold tracking-tight text-gray-900">
                {title}
              </h1>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              className="relative grid h-9 w-9 place-items-center rounded-lg border border-gray-200 text-gray-500 transition hover:bg-gray-50"
              aria-label="Notifications"
            >
              <Bell size={17} strokeWidth={1.75} />
              <span className="absolute right-2 top-2 h-1.5 w-1.5 rounded-full bg-blue-600" />
            </button>
            <div className="grid h-9 w-9 place-items-center rounded-full bg-gray-100 text-sm font-semibold text-gray-700">
              {displayName[0]?.toUpperCase()}
            </div>
          </div>
        </header>

        {/* Mobile drawer */}
        {menuOpen && (
          <div
            className="fixed inset-0 z-50 bg-gray-900/30 lg:hidden"
            onClick={() => setMenuOpen(false)}
          >
            <aside
              className="h-full w-[280px] bg-white shadow-xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex h-16 items-center justify-between border-b border-gray-100 px-5">
                <Skill2EarnLogo />
                <button
                  onClick={() => setMenuOpen(false)}
                  className="grid h-9 w-9 place-items-center rounded-lg border border-gray-200 text-gray-600"
                  aria-label="Close navigation"
                >
                  <X size={18} />
                </button>
              </div>
              <nav className="space-y-0.5 p-3">
                <p className="px-3 pb-2 pt-3 text-[11px] font-semibold uppercase tracking-wider text-gray-400">
                  Workspace
                </p>
                {navItems.map(({ href, label, icon: Icon }) => (
                  <Link
                    key={href}
                    href={href}
                    onClick={() => setMenuOpen(false)}
                    className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-[13px] font-medium transition ${
                      isActive(location, href)
                        ? "bg-blue-50 text-blue-700"
                        : "text-gray-600 hover:bg-gray-50"
                    }`}
                  >
                    <Icon size={18} strokeWidth={1.75} />
                    <span>{label}</span>
                  </Link>
                ))}
                <p className="px-3 pb-2 pt-6 text-[11px] font-semibold uppercase tracking-wider text-gray-400">
                  Account
                </p>
                <Link
                  href="/activate"
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-[13px] font-medium text-gray-600 transition hover:bg-gray-50"
                >
                  <ShieldCheck size={18} strokeWidth={1.75} />
                  <span>Activation</span>
                </Link>
                <button
                  onClick={() => {
                    setMenuOpen(false);
                    handleLogout();
                  }}
                  className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-[13px] font-medium text-gray-600 transition hover:bg-gray-50"
                >
                  <LogOut size={18} strokeWidth={1.75} />
                  <span>Sign out</span>
                </button>
              </nav>
            </aside>
          </div>
        )}

        {/* Page content */}
        <main className="mobile-safe-bottom mx-auto max-w-[1280px] px-5 py-6 lg:px-8 lg:py-8">
          {children}
        </main>
      </div>

      {/* Mobile bottom nav */}
      <nav
        className="mobile-bottom-nav fixed inset-x-0 bottom-0 z-30 flex border-t border-gray-200 bg-white px-2 py-1.5 lg:hidden"
        aria-label="Mobile navigation"
      >
        {navItems.map(({ href, label, icon: Icon }) => {
          const active = isActive(location, href);
          return (
            <Link
              key={href}
              href={href}
              className={`flex flex-1 flex-col items-center gap-0.5 rounded-lg py-1.5 text-[10px] font-medium transition ${
                active ? "text-blue-700" : "text-gray-400"
              }`}
            >
              <Icon size={20} strokeWidth={active ? 2.25 : 1.75} />
              <span>{label}</span>
            </Link>
          );
        })}
      </nav>

      {!activationExempt && <ActivationGate />}
    </div>
  );
}
