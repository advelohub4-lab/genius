import { useMemo, useState } from "react";
import { Bell, CheckCheck, CircleDollarSign, Info, ShieldCheck } from "lucide-react";
import { AppShell } from "@/components/AppShell";

type Notice = { id: number; type: "Updates" | "Account" | "Opportunities"; title: string; body: string; time: string; read: boolean };
const initialNotices: Notice[] = [
  { id: 1, type: "Opportunities", title: "New evaluation tasks are available", body: "A small batch of model-evaluation tasks has been added to your workspace.", time: "12 min ago", read: false },
  { id: 2, type: "Account", title: "Activation review is still pending", body: "Your submitted transaction hash is waiting for manual verification.", time: "Yesterday", read: false },
  { id: 3, type: "Updates", title: "Task guidelines were refreshed", body: "The quality checklist now includes a clearer note about citing evidence.", time: "2 days ago", read: true },
];
const tabs = ["All", "Updates", "Account", "Opportunities"] as const;

export default function Notifications() {
  const [tab, setTab] = useState<(typeof tabs)[number]>("All");
  const [notices, setNotices] = useState(initialNotices);
  const visible = useMemo(() => tab === "All" ? notices : notices.filter((notice) => notice.type === tab), [notices, tab]);
  const unread = notices.filter((notice) => !notice.read).length;
  const markRead = (id: number) => setNotices((current) => current.map((notice) => notice.id === id ? { ...notice, read: true } : notice));
  return <AppShell title="Notifications" activationExempt>
    <div className="reveal flex flex-wrap items-end justify-between gap-4"><div><p className="eyebrow">Stay up to date</p><h2 className="mt-4 font-display text-3xl font-bold tracking-[-.05em] text-[#13213a] sm:text-4xl">Updates that matter.</h2><p className="mt-2 max-w-2xl text-sm leading-6 text-[#71809a]">Keep track of task availability, account notices, and workspace changes in one place.</p></div><button onClick={() => setNotices((current) => current.map((notice) => ({ ...notice, read: true })))} className="inline-flex items-center gap-2 rounded-xl border border-[#dbe4f0] bg-white px-3 py-2.5 text-xs font-bold text-[#42536e] hover:border-[#b9cae8]"><CheckCheck size={15} /> Mark all read</button></div>
    <section className="mt-7 safe-card soft-shadow p-4 sm:p-6"><div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#e7edf5] pb-4"><div className="flex items-center gap-2 text-sm font-bold text-[#13213a]"><Bell size={16} className="text-[#1e56d0]" /> Inbox <span className="rounded-full bg-[#e9f0ff] px-2 py-0.5 text-[10px] text-[#1e56d0]">{unread} unread</span></div><div className="flex gap-1 overflow-x-auto rounded-xl bg-[#f6f8fc] p-1">{tabs.map((item) => <button key={item} onClick={() => setTab(item)} className={`whitespace-nowrap rounded-lg px-3 py-2 text-xs font-bold transition ${tab === item ? "bg-white text-[#1e56d0] shadow-sm" : "text-[#8190a6] hover:text-[#42536e]"}`}>{item}</button>)}</div></div><div className="mt-4 grid gap-2">{visible.map((notice) => <button key={notice.id} onClick={() => markRead(notice.id)} className={`flex w-full items-start gap-3 rounded-2xl border p-4 text-left transition hover:border-[#b9cae8] ${notice.read ? "border-[#edf1f7] bg-white" : "border-[#cddcf7] bg-[#f7faff]"}`}><span className={`grid h-10 w-10 shrink-0 place-items-center rounded-xl ${notice.type === "Account" ? "bg-[#fff5dd] text-[#a6680b]" : notice.type === "Opportunities" ? "bg-[#e9f0ff] text-[#1e56d0]" : "bg-[#e7f6ee] text-[#198754]"}`}>{notice.type === "Account" ? <ShieldCheck size={18} /> : notice.type === "Opportunities" ? <CircleDollarSign size={18} /> : <Info size={18} />}</span><span className="min-w-0 flex-1"><span className="flex flex-wrap items-center justify-between gap-2"><strong className="font-display text-sm text-[#13213a]">{notice.title}</strong><span className="text-[11px] text-[#9baaca]">{notice.time}</span></span><span className="mt-1 block text-xs leading-5 text-[#71809a]">{notice.body}</span></span>{!notice.read && <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-[#1e56d0]" />}</button>)}</div>{visible.length === 0 && <div className="py-10 text-center text-sm text-[#8190a6]">Nothing here yet.</div>}</section>
  </AppShell>;
}
