import { useState } from "react";
import { Link } from "wouter";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { Skill2EarnLogo } from "./Skill2EarnLogo";

const menuItems = [
  ["#ai-cards", "Train AI cards"],
  ["/app/learn", "AI training workspace"],
  ["/app/jobs", "Jobs & opportunities"],
  ["/app/earnings", "Earnings"],
  ["/app/profile", "Profile & settings"],
  ["/activate", "Activation"],
];

export function MarketingHeader() {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);
  return <header className="relative z-30 border-b border-[#dbe4f0]/80 bg-white/90 backdrop-blur-xl">
    <div className="mx-auto flex h-[72px] max-w-7xl items-center justify-between px-5 lg:px-8">
      <Skill2EarnLogo />
      <div className="flex items-center gap-2.5"><Link href="/auth/signin" className="hidden rounded-xl px-4 py-2.5 text-sm font-bold text-[#1e56d0] transition hover:bg-[#e9f0ff] sm:inline-flex">Sign in</Link><button onClick={() => setOpen((value) => !value)} className="grid h-11 w-11 place-items-center rounded-xl border border-[#dbe4f0] bg-white text-[#13213a] shadow-sm transition hover:border-[#9fb7e4]" aria-label={open ? "Close menu" : "Open menu"} aria-expanded={open}>{open ? <X size={20} /> : <Menu size={20} />}</button></div>
    </div>
    {open && <div className="absolute right-5 top-[80px] w-[min(360px,calc(100vw-2.5rem))] rounded-2xl border border-[#dbe4f0] bg-white p-3 shadow-[0_20px_60px_rgba(24,52,100,.18)] lg:right-8"><div className="flex items-center justify-between border-b border-[#edf1f7] px-3 pb-3"><div><p className="font-display font-bold text-[#13213a]">Skill2Earn HUB</p><p className="text-xs text-[#8190a6]">One-page view · more pages inside</p></div><span className="rounded-full bg-[#eef4ff] px-2.5 py-1 text-[10px] font-bold text-[#1e56d0]">Menu</span></div><nav className="mt-2 grid gap-1" aria-label="All website pages">{menuItems.map(([href, label]) => href.startsWith("#") ? <a key={href} href={href} onClick={close} className="flex items-center justify-between rounded-xl px-3 py-3 text-sm font-semibold text-[#42536e] hover:bg-[#f6f8fc] hover:text-[#1e56d0]">{label}<ArrowUpRight size={15} /></a> : <Link key={href} href={href} onClick={close} className="flex items-center justify-between rounded-xl px-3 py-3 text-sm font-semibold text-[#42536e] hover:bg-[#f6f8fc] hover:text-[#1e56d0]">{label}<ArrowUpRight size={15} /></Link>)}</nav><div className="mt-2 grid grid-cols-2 gap-2 border-t border-[#edf1f7] pt-3"><Link onClick={close} href="/auth/signin" className="rounded-xl border border-[#dbe4f0] px-3 py-3 text-center text-sm font-bold text-[#1e56d0]">Sign in</Link><Link onClick={close} href="/auth/signup" className="rounded-xl bg-[#1e56d0] px-3 py-3 text-center text-sm font-bold text-white">Create account</Link></div></div>}
  </header>;
}
