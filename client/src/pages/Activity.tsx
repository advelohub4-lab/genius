import { useMemo, useState } from "react";
import { Bookmark, Check, ChevronDown, Clock3, Filter, ListChecks } from "lucide-react";
import { AppShell } from "@/components/AppShell";

type Task = { id: number; title: string; category: string; minutes: number; status: "Saved" | "In progress" | "Completed"; description: string };

const initialTasks: Task[] = [
  { id: 1, title: "Evaluate customer-support responses", category: "Model evaluation", minutes: 18, status: "Saved", description: "Compare two responses against the quality rubric and select the answer that is more accurate, useful, and appropriately scoped." },
  { id: 2, title: "Label product attributes", category: "Data annotation", minutes: 12, status: "In progress", description: "Review product images and tag the visible attributes using the supplied annotation guidelines." },
  { id: 3, title: "Review prompt variations", category: "Prompt testing", minutes: 15, status: "Completed", description: "Check prompt outputs for clarity, instruction following, and consistency across several test cases." },
];

const filters = ["All", "Saved", "In progress", "Completed"] as const;

export default function Activity() {
  const [activeFilter, setActiveFilter] = useState<(typeof filters)[number]>("All");
  const [saved, setSaved] = useState<number[]>([1]);
  const [expanded, setExpanded] = useState<number | null>(1);
  const visibleTasks = useMemo(() => activeFilter === "All" ? initialTasks : initialTasks.filter((task) => task.status === activeFilter), [activeFilter]);

  return <AppShell title="My activity" activationExempt>
    <div className="reveal flex flex-wrap items-end justify-between gap-4">
      <div><p className="eyebrow">Your workspace</p><h2 className="mt-4 font-display text-3xl font-bold tracking-[-.05em] text-[#13213a] sm:text-4xl">Keep your work moving.</h2><p className="mt-2 max-w-2xl text-sm leading-6 text-[#71809a]">Review saved tasks, pick up unfinished work, and keep a simple record of your activity.</p></div>
      <div className="flex items-center gap-2 rounded-xl bg-[#e9f0ff] px-3 py-2 text-xs font-bold text-[#1e56d0]"><ListChecks size={16} /> {initialTasks.filter((task) => task.status === "Completed").length} completed</div>
    </div>
    <section className="mt-7 safe-card soft-shadow p-4 sm:p-6">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#e7edf5] pb-4"><div className="flex items-center gap-2 text-sm font-bold text-[#13213a]"><Filter size={16} className="text-[#1e56d0]" /> Filter activity</div><div className="flex gap-1 overflow-x-auto rounded-xl bg-[#f6f8fc] p-1">{filters.map((filter) => <button key={filter} onClick={() => setActiveFilter(filter)} className={`whitespace-nowrap rounded-lg px-3 py-2 text-xs font-bold transition ${activeFilter === filter ? "bg-white text-[#1e56d0] shadow-sm" : "text-[#8190a6] hover:text-[#42536e]"}`}>{filter}</button>)}</div></div>
      <div className="mt-4 grid gap-3">{visibleTasks.map((task) => <article key={task.id} className="rounded-2xl border border-[#e7edf5] bg-[#fbfcfe] p-4 transition hover:border-[#b9cae8]">
        <div className="flex items-start gap-3"><div className={`grid h-10 w-10 shrink-0 place-items-center rounded-xl ${task.status === "Completed" ? "bg-[#e7f6ee] text-[#198754]" : "bg-[#e9f0ff] text-[#1e56d0]"}`}><ListChecks size={18} /></div><div className="min-w-0 flex-1"><div className="flex flex-wrap items-center gap-2"><h3 className="font-display font-bold text-[#13213a]">{task.title}</h3><span className={`rounded-full px-2 py-1 text-[10px] font-bold ${task.status === "Completed" ? "bg-[#e7f6ee] text-[#198754]" : task.status === "In progress" ? "bg-[#fff5dd] text-[#91610b]" : "bg-[#eef4ff] text-[#1e56d0]"}`}>{task.status}</span></div><div className="mt-1 flex flex-wrap items-center gap-3 text-xs text-[#8190a6]"><span>{task.category}</span><span className="inline-flex items-center gap-1"><Clock3 size={13} /> {task.minutes} min</span></div></div><button onClick={() => setSaved((current) => current.includes(task.id) ? current.filter((id) => id !== task.id) : [...current, task.id])} className={`grid h-9 w-9 shrink-0 place-items-center rounded-xl border ${saved.includes(task.id) ? "border-[#b9cae8] bg-[#e9f0ff] text-[#1e56d0]" : "border-[#dbe4f0] bg-white text-[#9baaca]"}`} aria-label={saved.includes(task.id) ? "Remove bookmark" : "Save task"}><Bookmark size={16} fill={saved.includes(task.id) ? "currentColor" : "none"} /></button></div>
        <button onClick={() => setExpanded((current) => current === task.id ? null : task.id)} className="mt-3 flex w-full items-center justify-between border-t border-[#edf1f7] pt-3 text-left text-xs font-bold text-[#42536e]">{expanded === task.id ? "Hide task brief" : "View task brief"}<ChevronDown size={15} className={`transition ${expanded === task.id ? "rotate-180" : ""}`} /></button>
        {expanded === task.id && <div className="mt-3 rounded-xl bg-white p-3 text-xs leading-5 text-[#71809a]"><p>{task.description}</p>{task.status === "Completed" && <p className="mt-2 inline-flex items-center gap-1 font-bold text-[#198754]"><Check size={14} /> Review recorded</p>}</div>}
      </article>)}</div>
      {visibleTasks.length === 0 && <div className="py-10 text-center text-sm text-[#8190a6]">No tasks match this filter yet.</div>}
    </section>
  </AppShell>;
}
