import { ArrowRight, CheckCircle2, Database, FileCheck2, Headphones, ShieldCheck, Tags, UsersRound } from "lucide-react";
import { Link } from "wouter";
import { MarketingHeader } from "@/components/MarketingHeader";

const taskTypes: Array<{ icon: typeof Tags; title: string; description: string; href: string }> = [
  { icon: Tags, title: "Data Annotation", description: "Label and categorize data for real projects.", href: "/work/data-annotation" },
  { icon: ShieldCheck, title: "Content Moderation", description: "Review content and support quality standards.", href: "/work/content-moderation" },
  { icon: Headphones, title: "Audio Transcription", description: "Convert recorded speech into accurate text.", href: "/work/audio-transcription" },
  { icon: Database, title: "Data Validation", description: "Check records for consistency and integrity.", href: "/work/data-validation" },
];

export default function Home() {
  return <div className="h-[100svh] overflow-hidden bg-[#5b7180] text-[#172832]">
    <MarketingHeader />
    <main className="mx-auto h-[calc(100svh-72px)] max-w-[560px] overflow-hidden bg-[#5b7180] shadow-[0_20px_70px_rgba(20,34,43,.18)] lg:max-w-6xl lg:bg-[#536977] lg:px-8">
      <section className="relative overflow-hidden bg-[#1d2d35] lg:mt-6 lg:rounded-[2rem]">
        <img src="/manus-storage/skill2earn-corporate-hero-b_a8dd1da9.jpg" alt="A diverse team collaborating in a modern office" className="absolute inset-0 h-full w-full object-cover object-center opacity-85" fetchPriority="high" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#14232c]/95 via-[#14232c]/78 to-[#14232c]/10" />
        <div className="relative flex min-h-[228px] items-end px-5 pb-5 pt-7 sm:min-h-[390px] sm:px-10 sm:pb-10 lg:min-h-[520px] lg:max-w-[650px] lg:px-12">
          <div className="max-w-[490px]">
            <p className="mb-2 inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[.18em] text-[#d9ae55]"><span className="h-1.5 w-1.5 rounded-full bg-[#d9ae55]" /> Professional task work</p>
            <h1 className="text-[1.42rem] font-semibold leading-[1.02] tracking-[-.055em] text-white sm:text-5xl lg:text-[4rem]">YOUR SKILLS.<br />PROFESSIONAL TASKS.<br /><span className="text-[#cbd9df]">REAL INCOME.</span></h1>
            
            <div className="mt-2 flex flex-wrap gap-2 sm:mt-6 sm:gap-3"><Link href="/auth/signup" className="inline-flex min-h-9 items-center justify-center gap-2 rounded-xl bg-[#d9ae55] px-5 text-sm font-bold text-[#172832] shadow-lg transition hover:bg-[#e7c47a]">Start working <ArrowRight size={17} /></Link><Link href="/app/jobs" className="inline-flex min-h-9 items-center justify-center gap-2 rounded-xl border border-white/35 bg-white/10 px-5 text-sm font-bold text-white backdrop-blur-sm transition hover:bg-white/20">Browse projects</Link></div>
          </div>
        </div>
      </section>

      <section className="grid grid-cols-2 gap-2 px-4 pt-2 sm:gap-3 sm:px-8 lg:grid-cols-[1.05fr_.95fr] lg:pt-6">
        <div className="rounded-2xl bg-[#21343e] p-2.5 text-white shadow-[0_12px_28px_rgba(20,34,43,.16)] sm:p-6"><p className="text-[10px] font-bold uppercase tracking-[.16em] text-[#b8cbd2]">Your earning potential</p><div className="mt-0.5 flex items-end gap-1"><strong className="text-lg font-semibold tracking-[-.05em] text-white sm:text-4xl">$5–$10</strong><span className="pb-1 text-sm font-semibold text-[#d9ae55]">/ day</span></div><p className="mt-0.5 text-[9px] font-medium text-[#d7e0e4]">Target only</p></div>
        <div className="rounded-2xl bg-white p-2.5 shadow-[0_12px_28px_rgba(20,34,43,.12)] sm:p-6"><div className="flex items-start justify-between gap-3"><div><p className="text-[10px] font-bold uppercase tracking-[.16em] text-[#647b87]">Live platform activity</p><p className="mt-2 whitespace-nowrap text-lg font-semibold tracking-[-.04em] text-[#172832] sm:text-2xl">421 workers</p><p className="mt-1 text-xs text-[#5f717a]">now live</p></div><span className="grid h-11 w-11 place-items-center rounded-xl bg-[#eaf3f1] text-[#287b66]"><UsersRound size={21} /></span></div><div className="mt-1 flex items-center gap-1.5 text-[10px] font-semibold text-[#287b66]"><span className="h-2 w-2 rounded-full bg-[#3ca47f]" /> Live now</div></div>
      </section>

      <section id="work-types" className="px-4 pt-2 sm:px-8 sm:pt-7"><div className="flex items-end justify-between gap-3"><div><p className="text-[10px] font-bold uppercase tracking-[.16em] text-[#e4c77f]">Work categories</p><h2 className="mt-1 text-2xl font-semibold tracking-[-.04em] text-white sm:text-3xl">Choose your task focus.</h2></div><Link href="/app/jobs" className="hidden items-center gap-1 text-xs font-bold text-white sm:inline-flex">View all <ArrowRight size={14} /></Link></div><div className="mt-1 grid grid-cols-2 gap-2 sm:mt-4 sm:gap-3">{taskTypes.map(({ icon: Icon, title, description, href }) => <Link key={title} href={href} className="group min-h-[92px] rounded-2xl bg-white p-2.5 shadow-[0_10px_24px_rgba(20,34,43,.12)] transition hover:-translate-y-0.5 hover:shadow-[0_14px_30px_rgba(20,34,43,.18)] sm:p-5"><span className="grid h-8 w-8 place-items-center rounded-xl border border-[#c8d6d9] text-[#203640]"><Icon size={23} strokeWidth={1.55} /></span><h3 className="mt-1 text-[10px] font-semibold leading-5 text-[#172832] sm:text-base">{title}</h3><span className="mt-1 hidden items-center gap-1 text-[10px] sm:inline-flex font-bold uppercase tracking-[.1em] text-[#2c6274] opacity-0 transition group-hover:opacity-100">Explore <ArrowRight size={12} /></span></Link>)}</div></section>

      <section className="px-4 pt-2 sm:px-8 sm:pt-7"><div className="flex items-center justify-between rounded-2xl border border-[#d9ae55]/55 bg-[#20343e] p-2.5 text-white sm:p-5"><div className="flex items-center gap-3"><span className="grid h-8 w-8 place-items-center rounded-xl bg-[#e9f3f2] text-[#287b66]"><CheckCircle2 size={20} /></span><div><p className="text-xs font-bold uppercase tracking-[.12em] text-[#d9ae55]">Built for dependable work</p></div></div><Link href="/legal/disclosure" className="hidden text-xs font-bold text-white sm:inline-flex">Learn more <ArrowRight size={14} className="ml-1" /></Link></div></section>
    </main>
  </div>;
}
