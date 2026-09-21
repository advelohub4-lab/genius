import { Link } from "wouter";

export function Skill2EarnLogo({ light = false, compact = false }: { light?: boolean; compact?: boolean }) {
  return <Link href="/" className="group inline-flex items-center gap-2.5" aria-label="Skill2Earn HUB home">
    <span className={`grid h-10 w-10 shrink-0 place-items-center rounded-xl ${light ? "bg-white/12 text-white ring-1 ring-white/15" : "bg-[#e9f0ff] text-[#1e56d0]"} transition-transform duration-200 group-hover:-translate-y-0.5`}>
      <svg viewBox="0 0 40 40" className="h-7 w-7" fill="none" aria-hidden="true">
        <path d="M20 3.5 34 9v10.8c0 8.2-5.8 14-14 17.2-8.2-3.2-14-9-14-17.2V9l14-5.5Z" stroke="currentColor" strokeWidth="2.4" strokeLinejoin="round"/>
        <path d="m11.5 25.5 6.1-6.2 3.8 3.4 7.4-8.2" stroke="#d9ae55" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M28.8 14.5h-4.7v4.7" stroke="#d9ae55" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    </span>
    {!compact && <span className={`font-display text-[1.02rem] font-bold tracking-[-.03em] ${light ? "text-white" : "text-[#13213a]"}`}>Skill2Earn <span className={light ? "text-[#f0c96f]" : "text-[#1e56d0]"}>HUB</span></span>}
  </Link>;
}
