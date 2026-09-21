import { ReactNode, useState } from "react";
import { Link, useLocation } from "wouter";
import { Bell, BookOpen, BriefcaseBusiness, ChevronRight, CircleDollarSign, Home, LogOut, Menu, Settings, ShieldCheck, UserRound, X } from "lucide-react";
import { useAuth } from "@/_core/hooks/useAuth";
import { Skill2EarnLogo } from "./Skill2EarnLogo";
import { ActivationGate } from "./ActivationGate";

const navItems = [
  { href: "/app", label: "Home", icon: Home },
  { href: "/app/learn", label: "Train AI", icon: BookOpen },
  { href: "/app/jobs", label: "Jobs", icon: BriefcaseBusiness },
  { href: "/app/earnings", label: "Earnings", icon: CircleDollarSign },
  { href: "/app/profile", label: "Profile", icon: UserRound },
];

function isActive(path: string, href: string) { return href === "/app" ? path === "/app" : path.startsWith(href); }

export function AppShell({ children, title = "Home", activationExempt = false }: { children: ReactNode; title?: string; activationExempt?: boolean }) {
  const [location, setLocation] = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const { user, logout } = useAuth();
  const displayName = user?.name?.split(" ")[0] || "Amina";
  const handleLogout = async () => { await logout(); setLocation("/"); };
  return <div className="dashboard-shell">
    <aside className="dashboard-sidebar fixed inset-y-0 left-0 z-40 hidden w-[248px] flex-col px-4 py-5 lg:flex">
      <Skill2EarnLogo light />
      <div className="mt-10 flex items-center gap-3 rounded-2xl bg-white/7 p-3">
        <div className="grid h-10 w-10 place-items-center rounded-xl bg-[#d9ae55] font-display font-bold text-[#0e1b33]">{displayName[0]}</div>
        <div className="min-w-0"><p className="truncate text-sm font-bold text-white">{displayName} {user ? "" : "(demo)"}</p><p className="truncate text-xs text-[#9fb1ce]">Skill builder</p></div>
      </div>
      <nav className="mt-7 flex-1 space-y-1" aria-label="Workspace navigation">
        <p className="px-3 pb-2 text-[10px] font-bold uppercase tracking-[.16em] text-[#7185a5]">Workspace</p>
        {navItems.map(({ href, label, icon: Icon }) => <Link key={href} href={href} data-active={isActive(location, href)} className="group flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-semibold transition"><Icon size={18} strokeWidth={1.8} /><span>{label}</span></Link>)}
        <p className="px-3 pb-2 pt-7 text-[10px] font-bold uppercase tracking-[.16em] text-[#7185a5]">Account</p>
        <Link href="/activate" className="group flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-semibold text-[#f1d28c] transition hover:bg-white/8"><ShieldCheck size={18} strokeWidth={1.8} /><span>Activation</span><ChevronRight size={15} className="ml-auto opacity-60" /></Link>
        <Link href="/app/profile" className="group flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-semibold text-[#aebed8] transition hover:bg-white/8 hover:text-white"><Settings size={18} strokeWidth={1.8} /><span>Settings</span></Link>
      </nav>
      <div className="border-t border-white/10 pt-4">
        <button onClick={handleLogout} className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm font-semibold text-[#aebed8] transition hover:bg-white/8 hover:text-white"><LogOut size={18} strokeWidth={1.8} />Sign out</button>
        <p className="mt-3 px-3 text-[11px] leading-5 text-[#7185a5]">Demo workspace · Connect authentication before launch.</p>
      </div>
    </aside>

    <div className="lg:pl-[248px]">
      <header className="sticky top-0 z-20 flex h-[72px] items-center justify-between border-b border-[#dbe4f0]/90 bg-[#f6f8fc]/90 px-5 backdrop-blur-xl lg:px-9">
        <div className="flex items-center gap-3"><button onClick={() => setMenuOpen(true)} className="grid h-10 w-10 place-items-center rounded-xl border border-[#dbe4f0] bg-white text-[#42536e] lg:hidden" aria-label="Open navigation"><Menu size={19} /></button><div><p className="text-xs font-semibold text-[#8190a6]">Skill2Earn HUB</p><h1 className="font-display text-lg font-bold tracking-[-.03em] text-[#13213a]">{title}</h1></div></div>
        <div className="flex items-center gap-2.5"><span className="hidden items-center gap-1.5 rounded-full bg-[#fff5dd] px-3 py-1.5 text-xs font-bold text-[#91610b] sm:flex"><span className="h-1.5 w-1.5 rounded-full bg-[#d9ae55]" />Demo mode</span><button className="grid h-10 w-10 place-items-center rounded-xl border border-[#dbe4f0] bg-white text-[#64728a]" aria-label="Notifications"><Bell size={18} /></button><div className="grid h-10 w-10 place-items-center rounded-xl bg-[#1e56d0] font-display font-bold text-white">{displayName[0]}</div></div>
      </header>
      {menuOpen && <div className="fixed inset-0 z-50 bg-[#0e1b33]/35 backdrop-blur-sm lg:hidden" onClick={() => setMenuOpen(false)}><aside className="h-full w-[min(330px,88vw)] bg-[#0e1b33] p-5 shadow-2xl" onClick={(event) => event.stopPropagation()}><div className="flex items-center justify-between"><Skill2EarnLogo light compact /><button onClick={() => setMenuOpen(false)} className="grid h-10 w-10 place-items-center rounded-xl border border-white/15 text-white" aria-label="Close navigation"><X size={19} /></button></div><p className="mt-10 px-3 text-[10px] font-bold uppercase tracking-[.16em] text-[#7185a5]">All pages</p><nav className="mt-3 grid gap-1">{navItems.map(({ href, label, icon: Icon }) => <Link key={href} href={href} onClick={() => setMenuOpen(false)} className={`flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-semibold ${isActive(location, href) ? "bg-white/10 text-white" : "text-[#aebed8] hover:bg-white/8 hover:text-white"}`}><Icon size={18} /><span>{label}</span></Link>)}<Link href="/activate" onClick={() => setMenuOpen(false)} className="mt-4 flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-semibold text-[#f1d28c] hover:bg-white/8"><ShieldCheck size={18} /><span>Activation</span></Link></nav></aside></div>}
      <main className="mobile-safe-bottom mx-auto max-w-[1480px] px-5 py-6 lg:px-9 lg:py-9">{children}</main>
    </div>

    <nav className="mobile-bottom-nav fixed inset-x-0 bottom-0 z-30 flex border-t border-[#dbe4f0] bg-white/95 px-2 pt-2 shadow-[0_-8px_24px_rgba(27,56,105,.08)] backdrop-blur-xl lg:hidden" aria-label="Mobile navigation">
      {navItems.map(({ href, label, icon: Icon }) => <Link key={href} href={href} data-active={isActive(location, href)} className={`flex flex-1 flex-col items-center gap-1 rounded-xl py-1.5 text-[10px] font-bold transition ${isActive(location, href) ? "text-[#1e56d0]" : "text-[#8190a6]"}`}><Icon size={19} strokeWidth={isActive(location, href) ? 2.4 : 1.8} /><span>{label}</span></Link>)}
    </nav>
    {!activationExempt && <ActivationGate />}
  </div>;
}
