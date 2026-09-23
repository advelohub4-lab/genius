import { useState } from "react";
import { ArrowLeft, ArrowRight, Check, Copy, ExternalLink, ShieldCheck } from "lucide-react";
import { Link, useLocation } from "wouter";

const wallet = "0x69cb07ec7095461f457a0d7e7f370dbcfcc78539";
const steps = [
  { n: "1", t: "Send $10 USDT · BEP20" },
  { n: "2", t: "Copy transaction hash" },
  { n: "3", t: "Submit for verification" },
  { n: "4", t: "Account activated" },
];

export default function Activation() {
  const [, setLocation] = useLocation();
  const [copied, setCopied] = useState(false);
  const [hash, setHash] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const copy = async () => {
    await navigator.clipboard?.writeText(wallet);
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };

  return (
    <div className="flex h-[100svh] flex-col overflow-hidden bg-slate-100 text-slate-800">
      <header className="flex h-14 shrink-0 items-center justify-between border-b border-slate-200 bg-white px-4">
        <Link href="/" className="inline-flex items-center gap-1.5 text-sm font-semibold text-slate-500 transition hover:text-slate-900">
          <ArrowLeft size={15} /> <span className="hidden sm:inline">Back to home</span>
        </Link>
        <span className="font-bold tracking-tight text-slate-800">Account Activation</span>
        <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-600">
          <ShieldCheck size={13} /> Secure
        </span>
      </header>

      <main className="grid min-h-0 flex-1 grid-cols-1 overflow-hidden md:grid-cols-2">
        {/* Left: payment details */}
        <section className="flex flex-col overflow-hidden border-b border-slate-200 bg-white p-4 md:border-b-0 md:border-r sm:p-5">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">Payment status</p>
              <div className="mt-1.5 inline-flex items-center gap-1.5 rounded-full bg-amber-50 px-2.5 py-1 text-[11px] font-bold text-amber-700">
                <span className="h-1.5 w-1.5 rounded-full bg-amber-500" />
                {submitted ? "Verification pending" : "Payment required"}
              </div>
            </div>
            <div className="text-right">
              <p className="text-[11px] font-semibold text-slate-400">Amount</p>
              <p className="text-2xl font-bold text-slate-800">$10 <span className="text-xs font-semibold text-slate-400">USD</span></p>
            </div>
          </div>

          <div className="mt-3 grid grid-cols-2 gap-2.5">
            <div className="rounded-lg bg-slate-50 p-3">
              <p className="text-[11px] font-semibold text-slate-400">Account status</p>
              <p className="mt-1.5 flex items-center gap-1.5 text-sm font-bold text-amber-600">
                <span className="h-2 w-2 rounded-full bg-amber-500" /> Not activated
              </p>
            </div>
            <div className="rounded-lg bg-slate-50 p-3">
              <p className="text-[11px] font-semibold text-slate-400">Method</p>
              <p className="mt-1.5 text-sm font-bold text-slate-700">USDT · BEP20</p>
            </div>
          </div>

          <div className="mt-3 flex items-center gap-2 rounded-lg border border-amber-200 bg-amber-50 px-3 py-2">
            <span className="text-sm text-amber-600">⚠</span>
            <p className="text-[11px] font-semibold text-amber-700">BEP20 network only. Wrong network may cause permanent loss.</p>
          </div>

          <div className="mt-3">
            <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Receiving address</p>
            <div className="mt-1.5 flex gap-2">
              <div className="min-w-0 flex-1 overflow-hidden rounded-lg border border-slate-200 bg-slate-50 px-3 py-2.5 font-mono text-[11px] text-slate-600">
                <span className="break-all">{wallet}</span>
              </div>
              <button onClick={copy} className="grid h-10 w-10 shrink-0 place-items-center rounded-lg border border-slate-200 bg-white text-blue-600 transition hover:bg-blue-50" aria-label="Copy address">
                {copied ? <Check size={16} /> : <Copy size={16} />}
              </button>
            </div>
          </div>

          <div className="mt-auto pt-3">
            <label className="grid gap-1.5">
              <span className="text-xs font-bold text-slate-600">Transaction hash</span>
              <input className="h-10 rounded-lg border border-slate-200 px-3 text-sm outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100" placeholder="Paste your transaction hash" value={hash} onChange={(e) => setHash(e.target.value)} />
            </label>
            <button onClick={() => hash.trim() && setSubmitted(true)} disabled={!hash.trim() || submitted} className="mt-2.5 inline-flex h-10 w-full items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 text-sm font-bold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-45">
              {submitted ? "Submitted for review" : "Submit payment"} <ArrowRight size={15} />
            </button>
          </div>
        </section>

        {/* Right: steps + info */}
        <section className="flex flex-col overflow-hidden bg-slate-100 p-4 sm:p-5">
          <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">What happens next</p>
          <div className="mt-3 grid gap-2.5">
            {steps.map((s) => (
              <div key={s.n} className="flex items-center gap-3">
                <div className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-blue-100 text-xs font-bold text-blue-700">{s.n}</div>
                <p className="text-sm font-semibold text-slate-700">{s.t}</p>
              </div>
            ))}
          </div>

          <div className="mt-3 rounded-xl border border-slate-200 bg-white p-3.5">
            <div className="flex items-start gap-2.5">
              <ShieldCheck size={18} className="mt-0.5 shrink-0 text-blue-600" />
              <div>
                <p className="text-sm font-bold text-slate-700">Activation details</p>
                <p className="mt-1 text-xs leading-relaxed text-slate-500">Activation verifies your account for paid tasks. No work or income guarantee.</p>
              </div>
            </div>
          </div>

          <button onClick={() => setLocation("/app")} className="mt-auto inline-flex items-center justify-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm font-bold text-blue-600 transition hover:bg-slate-50">
            Preview workspace <ExternalLink size={15} />
          </button>
        </section>
      </main>
    </div>
  );
}
