import { FormEvent, useMemo, useState } from "react";
import { ChevronDown, LifeBuoy, Mail, Search, Send } from "lucide-react";
import { AppShell } from "@/components/AppShell";

const faqs = [
  { question: "How does activation work?", answer: "Activation is a one-time $10 USD USDT BEP20 payment review. It unlocks the eligible task workspace after verification; it does not guarantee employment or income." },
  { question: "How are tasks assigned?", answer: "Task availability depends on current partner demand, your eligibility, location, and the quality requirements for each batch." },
  { question: "When do I see earnings?", answer: "Completed work is tracked after review. Any payout timing, rate, and eligibility rules depend on the specific opportunity and its external platform terms." },
  { question: "How can I keep my account secure?", answer: "Use a unique password, keep your phone and email current, and never share your transaction details or sign-in information with another person." },
];

export default function Help() {
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(0);
  const [message, setMessage] = useState("");
  const [sent, setSent] = useState(false);
  const visibleFaqs = useMemo(() => faqs.filter((faq) => `${faq.question} ${faq.answer}`.toLowerCase().includes(query.toLowerCase())), [query]);
  const submit = (event: FormEvent) => { event.preventDefault(); if (!message.trim()) return; setSent(true); setMessage(""); };
  return <AppShell title="Help center" activationExempt>
    <div className="reveal"><p className="eyebrow">Support & guidance</p><h2 className="mt-4 font-display text-3xl font-bold tracking-[-.05em] text-[#13213a] sm:text-4xl">Find a clear answer.</h2><p className="mt-2 max-w-2xl text-sm leading-6 text-[#71809a]">Browse the common questions or send a support note when you need a human response.</p></div>
    <div className="mt-7 grid gap-6 xl:grid-cols-[1fr_.7fr]"><section className="safe-card soft-shadow p-4 sm:p-6"><div className="relative"><Search size={17} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#9baaca]" /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search help topics" className="h-11 w-full rounded-xl border border-[#dbe4f0] bg-[#fbfcfe] pl-10 pr-4 text-sm text-[#13213a] outline-none focus:border-[#7fa4ee]" /></div><div className="mt-5 grid gap-2">{visibleFaqs.map((faq, index) => <div key={faq.question} className="rounded-2xl border border-[#e7edf5] bg-white"><button onClick={() => setOpen(open === index ? -1 : index)} className="flex w-full items-center justify-between gap-3 px-4 py-4 text-left text-sm font-bold text-[#13213a]"><span>{faq.question}</span><ChevronDown size={16} className={`shrink-0 text-[#8190a6] transition ${open === index ? "rotate-180" : ""}`} /></button>{open === index && <p className="border-t border-[#edf1f7] px-4 pb-4 pt-3 text-xs leading-5 text-[#71809a]">{faq.answer}</p>}</div>)}{visibleFaqs.length === 0 && <div className="py-8 text-center text-sm text-[#8190a6]">No help topic matches that search.</div>}</div></section><aside className="safe-card soft-shadow p-5 sm:p-6"><div className="flex items-center gap-3"><span className="grid h-10 w-10 place-items-center rounded-xl bg-[#e9f0ff] text-[#1e56d0]"><LifeBuoy size={19} /></span><div><h3 className="font-display font-bold text-[#13213a]">Contact support</h3><p className="text-xs text-[#8190a6]">Typical reply within one business day</p></div></div>{sent ? <div className="mt-6 rounded-2xl bg-[#e7f6ee] p-4 text-sm leading-6 text-[#176b43]"><strong>Message received.</strong><br />We’ll review your note and follow up through your account email.</div> : <form onSubmit={submit} className="mt-5 grid gap-3"><label className="grid gap-2"><span className="text-xs font-bold text-[#42536e]">What do you need help with?</span><textarea value={message} onChange={(event) => setMessage(event.target.value)} rows={5} placeholder="Tell us what happened..." className="w-full resize-none rounded-xl border border-[#dbe4f0] bg-white p-3 text-sm text-[#13213a] outline-none focus:border-[#7fa4ee]" /></label><button className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-[#1e56d0] px-4 text-sm font-bold text-white hover:bg-[#1948b5]"><Send size={16} /> Send message</button></form>}<div className="mt-5 flex items-center gap-2 border-t border-[#edf1f7] pt-4 text-xs text-[#8190a6]"><Mail size={14} /> support@skill2earnhub.example</div></aside></div>
  </AppShell>;
}
