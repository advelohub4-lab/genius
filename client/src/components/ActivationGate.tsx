import { useEffect, useState } from "react";
import { useAuth } from "@/_core/hooks/useAuth";
import { Check, Clipboard, Copy, LockKeyhole, ShieldCheck, TimerReset } from "lucide-react";
import { trpc } from "@/lib/trpc";

const WALLET_ADDRESS = "0x69cb07ec7095461f457a0d7e7f370dbcfcc78539";
const QR_ASSET = "/manus-storage/skill2earn-usdt-bep20-qr_b1d13216.png";
type PaymentStatus = "required" | "submitted" | "pending" | "verified";
const statusLabels: Record<PaymentStatus, string> = { required: "Payment Required", submitted: "Payment Submitted", pending: "Verification Pending", verified: "Payment Verified / Activation Complete" };
const steps: PaymentStatus[] = ["required", "submitted", "pending", "verified"];

function readStoredStatus(): PaymentStatus { if (typeof window === "undefined") return "required"; const stored = window.localStorage.getItem("skill2earn.activationStatus"); return stored === "verified" || stored === "pending" || stored === "submitted" ? stored : "required"; }
function readVerified() { return readStoredStatus() === "verified"; }

export function ActivationGate() {
  const { isAuthenticated } = useAuth();
  const activationQuery = trpc.activation.status.useQuery(undefined, { enabled: isAuthenticated, retry: false, refetchInterval: isAuthenticated ? 5000 : false });
  const submitMutation = trpc.payments.submit.useMutation({ onSuccess: () => { setStatus("pending"); void activationQuery.refetch(); } });
  const [verified, setVerified] = useState(() => !isAuthenticated && readVerified());
  const [status, setStatus] = useState<PaymentStatus>(() => !isAuthenticated ? readStoredStatus() : "required");
  const [hash, setHash] = useState("");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (isAuthenticated && activationQuery.data) {
      const serverStatus: PaymentStatus = activationQuery.data.activationStatus === "activated" ? "verified" : activationQuery.data.activationStatus === "verification_pending" ? "pending" : activationQuery.data.activationStatus === "payment_submitted" ? "submitted" : "required";
      setStatus(serverStatus);
      setVerified(serverStatus === "verified");
    }
  }, [activationQuery.data, isAuthenticated]);

  useEffect(() => {
    const sync = () => {
      if (isAuthenticated) { void activationQuery.refetch(); return; }
      const nextVerified = readVerified();
      setVerified(nextVerified);
      const stored = window.localStorage.getItem("skill2earn.activationStatus");
      if (!nextVerified && (stored === "pending" || stored === "submitted")) setStatus(stored);
    };
    window.addEventListener("skill2earn:activation-updated", sync);
    document.body.style.overflow = verified ? "" : "hidden";
    return () => { window.removeEventListener("skill2earn:activation-updated", sync); document.body.style.overflow = ""; };
  }, [verified, isAuthenticated]);

  if (verified) return null;
  const submitHash = () => { if (!hash.trim()) return; if (isAuthenticated) { submitMutation.mutate({ transactionHash: hash.trim() }); return; } setStatus("submitted"); window.localStorage.setItem("skill2earn.activationStatus", "submitted"); window.setTimeout(() => { setStatus("pending"); window.localStorage.setItem("skill2earn.activationStatus", "pending"); }, 900); };
  const copyAddress = async () => { try { await navigator.clipboard.writeText(WALLET_ADDRESS); } catch { /* Clipboard permission is optional. */ } setCopied(true); window.setTimeout(() => setCopied(false), 1800); };
  const currentIndex = status === "pending" ? 2 : status === "submitted" ? 1 : 0;

  return <div className="fixed inset-0 z-[70] overflow-y-auto bg-[#0e1b33]/82 px-3 py-4 backdrop-blur-md sm:px-6 sm:py-8" role="dialog" aria-modal="true" aria-labelledby="activation-gate-title">
    <div className="mx-auto flex min-h-full max-w-3xl items-center justify-center">
      <section className="w-full overflow-hidden rounded-[1.5rem] border border-white/15 bg-[#f6f8fc] shadow-[0_30px_100px_rgba(0,0,0,.35)]">
        <header className="flex items-center justify-between border-b border-[#dbe4f0] bg-white px-5 py-4 sm:px-7"><div className="flex items-center gap-3"><span className="grid h-10 w-10 place-items-center rounded-xl bg-[#0e1b33] text-white"><LockKeyhole size={18} /></span><div><p className="font-display font-bold text-[#13213a]">Pre-work activation</p><p className="text-xs text-[#8190a6]">Your account must be verified before paid AI training work.</p></div></div><span className="inline-flex items-center gap-1.5 rounded-full bg-[#fff5dd] px-3 py-1.5 text-xs font-bold text-[#91610b]"><span className="h-1.5 w-1.5 rounded-full bg-[#d9ae55]" />Not activated</span></header>
        <div className="grid gap-5 p-5 sm:p-7 lg:grid-cols-[1.1fr_.9fr]">
          <div><p className="eyebrow">Required before work access</p><h2 id="activation-gate-title" className="mt-3 font-display text-3xl font-bold leading-tight tracking-[-.05em] text-[#0e1b33] sm:text-4xl">Activate Your Skill2Earn HUB Account ($10 USD Activation Fee)</h2><p className="mt-3 text-sm leading-6 text-[#71809a]">Activation fee: <strong className="text-[#13213a]">$10 USD</strong> · USDT on BEP20</p><div className="mt-5 rounded-2xl border border-[#cddcf7] bg-[#eef4ff] p-4"><div className="flex items-start gap-3"><ShieldCheck size={18} className="mt-0.5 shrink-0 text-[#1e56d0]" /><p className="text-sm leading-6 text-[#456293]"><strong className="font-bold text-[#1944a5]">What activation unlocks:</strong> access to the AI training job interface, task instructions, work tracking, and eligible opportunity tools after verification.</p></div></div><div className="mt-4 rounded-2xl border border-[#ecd9a9] bg-[#fffaf0] p-4"><p className="text-sm leading-6 text-[#876a35]"><strong className="font-bold text-[#7d5612]">Important disclosure:</strong> Activation does not guarantee employment, tasks, daily income, earnings, returns, or acceptance by an external platform. Actual earnings depend on task availability, eligibility, skill level, performance, and third-party policies.</p></div><div className="mt-5 flex items-center gap-3 rounded-2xl bg-[#0e1b33] p-4 text-white"><div className="grid h-11 w-11 place-items-center rounded-xl bg-[#d9ae55] text-[#0e1b33]"><TimerReset size={20} /></div><div><p className="text-[10px] font-bold uppercase tracking-[.15em] text-[#9fb1ce]">Illustrative target only</p><p className="mt-1 font-display text-xl font-bold">$5–$10 / day <span className="text-xs font-bold text-[#f0c96f]">· 3–7 hrs/day</span></p></div></div></div>
          <div className="rounded-2xl border border-[#dbe4f0] bg-white p-4 sm:p-5"><div className="flex items-center justify-between"><div><p className="text-xs font-bold uppercase tracking-[.14em] text-[#8190a6]">USDT payment</p><p className="mt-1 font-display text-xl font-bold text-[#13213a]">BEP20 network</p></div><span className="rounded-md bg-[#edf8f1] px-2 py-1 text-[10px] font-bold text-[#198754]">Official wallet</span></div><div className="mt-4 grid place-items-center rounded-2xl border border-[#e4eaf3] bg-[#f9fbfe] p-3"><img src={QR_ASSET} alt="USDT BEP20 receiving wallet QR code" className="h-36 w-36 rounded-xl object-contain sm:h-44 sm:w-44" /></div><p className="mt-4 text-[10px] font-bold uppercase tracking-[.13em] text-[#8190a6]">Receiving address</p><div className="mt-2 flex gap-2"><div className="min-w-0 flex-1 rounded-xl border border-[#dbe4f0] bg-[#f9fbfe] px-3 py-3 font-mono text-[11px] leading-4 text-[#64728a]"><span className="break-all">{WALLET_ADDRESS}</span></div><button onClick={copyAddress} className="grid h-12 w-12 shrink-0 place-items-center rounded-xl border border-[#dbe4f0] bg-white text-[#1e56d0] hover:bg-[#e9f0ff]" aria-label="Copy official wallet address">{copied ? <Check size={18} /> : <Copy size={18} />}</button></div><p className="mt-2 text-[11px] leading-4 text-[#8190a6]">Only send USDT using BEP20. Another network may cause permanent loss.</p><label className="mt-4 grid gap-2"><span className="text-xs font-bold text-[#42536e]">Transaction hash</span><input value={hash} onChange={(event) => setHash(event.target.value)} className="h-11 rounded-xl border border-[#dbe4f0] px-3 text-sm" placeholder="Paste your transaction hash" /></label><button onClick={submitHash} disabled={!hash.trim() || status === "pending" || submitMutation.isPending} className="mt-3 inline-flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-[#1e56d0] px-4 text-sm font-bold text-white disabled:cursor-not-allowed disabled:opacity-45">{status === "pending" ? "Submitted for verification" : "Submit payment"}<Clipboard size={16} /></button></div>
        </div>
        <div className="border-t border-[#dbe4f0] bg-white px-5 py-5 sm:px-7"><div className="flex items-center justify-between gap-2"><p className="text-xs font-bold uppercase tracking-[.14em] text-[#8190a6]">Verification status</p><span className="text-xs font-bold text-[#a6680b]">{statusLabels[status]}</span></div><div className="mt-4 grid grid-cols-4 gap-1.5">{steps.map((step, index) => <div key={step} className="min-w-0"><div className={`h-1.5 rounded-full ${index <= currentIndex ? "bg-[#1e56d0]" : "bg-[#e5ebf3]"}`} /><p className={`mt-2 truncate text-[10px] font-bold ${index <= currentIndex ? "text-[#1e56d0]" : "text-[#9baaca]"}`}>{statusLabels[step]}</p></div>)}</div><div className="mt-4 flex items-start gap-2 text-xs leading-5 text-[#71809a]"><LockKeyhole size={14} className="mt-0.5 shrink-0 text-[#1e56d0]" /><span>This gate cannot be dismissed or bypassed through navigation. It lifts only after an admin or verification service records <strong className="text-[#13213a]">Payment Verified / Activation Complete</strong>.</span></div></div>
      </section>
    </div>
  </div>;
}
