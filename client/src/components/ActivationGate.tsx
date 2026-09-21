import { useEffect, useState } from "react";
import { useAuth } from "@/_core/hooks/useAuth";
import { Check, Clipboard, Copy, LockKeyhole, ShieldCheck, TimerReset } from "lucide-react";
import { trpc } from "@/lib/trpc";

const WALLET_ADDRESS = "0x69cb07ec7095461f457a0d7e7f370dbcfcc78539";
const QR_ASSET = "/manus-storage/skill2earn-usdt-bep20-qr_b1d13216.png";
type PaymentStatus = "required" | "submitted" | "pending" | "verified";
const statusLabels: Record<PaymentStatus, string> = {
  required: "Payment Required",
  submitted: "Payment Submitted",
  pending: "Verification Pending",
  verified: "Payment Verified / Activation Complete",
};
const steps: PaymentStatus[] = ["required", "submitted", "pending", "verified"];

function readStoredStatus(): PaymentStatus {
  if (typeof window === "undefined") return "required";
  const stored = window.localStorage.getItem("skill2earn.activationStatus");
  return stored === "verified" || stored === "pending" || stored === "submitted"
    ? stored
    : "required";
}
function readVerified() {
  return readStoredStatus() === "verified";
}

export function ActivationGate() {
  const { isAuthenticated } = useAuth();
  const activationQuery = trpc.activation.status.useQuery(undefined, {
    enabled: isAuthenticated,
    retry: false,
    refetchInterval: isAuthenticated ? 5000 : false,
  });
  const submitMutation = trpc.payments.submit.useMutation({
    onSuccess: () => {
      setStatus("pending");
      void activationQuery.refetch();
    },
  });
  const [verified, setVerified] = useState(() => !isAuthenticated && readVerified());
  const [status, setStatus] = useState<PaymentStatus>(() =>
    !isAuthenticated ? readStoredStatus() : "required"
  );
  const [hash, setHash] = useState("");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (isAuthenticated && activationQuery.data) {
      const serverStatus: PaymentStatus =
        activationQuery.data.activationStatus === "activated"
          ? "verified"
          : activationQuery.data.activationStatus === "verification_pending"
          ? "pending"
          : activationQuery.data.activationStatus === "payment_submitted"
          ? "submitted"
          : "required";
      setStatus(serverStatus);
      setVerified(serverStatus === "verified");
    }
  }, [activationQuery.data, isAuthenticated]);

  useEffect(() => {
    const sync = () => {
      if (isAuthenticated) {
        void activationQuery.refetch();
        return;
      }
      const nextVerified = readVerified();
      setVerified(nextVerified);
      const stored = window.localStorage.getItem("skill2earn.activationStatus");
      if (!nextVerified && (stored === "pending" || stored === "submitted"))
        setStatus(stored);
    };
    window.addEventListener("skill2earn:activation-updated", sync);
    document.body.style.overflow = verified ? "" : "hidden";
    return () => {
      window.removeEventListener("skill2earn:activation-updated", sync);
      document.body.style.overflow = "";
    };
  }, [verified, isAuthenticated]);

  if (verified) return null;

  const submitHash = () => {
    if (!hash.trim()) return;
    if (isAuthenticated) {
      submitMutation.mutate({ transactionHash: hash.trim() });
      return;
    }
    setStatus("submitted");
    window.localStorage.setItem("skill2earn.activationStatus", "submitted");
    window.setTimeout(() => {
      setStatus("pending");
      window.localStorage.setItem("skill2earn.activationStatus", "pending");
    }, 900);
  };

  const copyAddress = async () => {
    try {
      await navigator.clipboard.writeText(WALLET_ADDRESS);
    } catch {
      /* Clipboard permission is optional. */
    }
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1800);
  };

  const currentIndex =
    status === "pending" ? 2 : status === "submitted" ? 1 : 0;

  return (
    <div
      className="fixed inset-0 z-[70] overflow-y-auto bg-gray-900/50 px-3 py-4 backdrop-blur-sm sm:px-6 sm:py-8"
      role="dialog"
      aria-modal="true"
      aria-labelledby="activation-gate-title"
    >
      <div className="mx-auto flex min-h-full max-w-3xl items-center justify-center">
        <section className="w-full overflow-hidden rounded-xl border border-gray-200 bg-white shadow-lg">
          {/* Header */}
          <header className="flex items-center justify-between border-b border-gray-100 px-5 py-4 sm:px-7">
            <div className="flex items-center gap-3">
              <span className="grid h-9 w-9 place-items-center rounded-lg bg-gray-900 text-white">
                <LockKeyhole size={17} />
              </span>
              <div>
                <p className="text-sm font-semibold text-gray-900">
                  Pre-work activation
                </p>
                <p className="text-xs text-gray-500">
                  Your account must be verified before paid AI training work.
                </p>
              </div>
            </div>
            <span className="inline-flex items-center gap-1.5 rounded-md bg-amber-50 px-2.5 py-1 text-xs font-medium text-amber-700">
              <span className="h-1.5 w-1.5 rounded-full bg-amber-500" />
              Not activated
            </span>
          </header>

          {/* Body */}
          <div className="grid gap-5 p-5 sm:p-7 lg:grid-cols-[1.1fr_.9fr]">
            {/* Left: info */}
            <div>
              <span className="eyebrow">Required before work access</span>
              <h2
                id="activation-gate-title"
                className="mt-3 text-2xl font-bold leading-tight tracking-tight text-gray-900"
              >
                Activate your Skill2Earn HUB account ($10 USD)
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-gray-500">
                Activation fee:{" "}
                <strong className="text-gray-900">$10 USD</strong> · USDT on
                BEP20
              </p>

              <div className="mt-5 rounded-lg border border-blue-200 bg-blue-50 p-4">
                <div className="flex items-start gap-3">
                  <ShieldCheck
                    size={18}
                    className="mt-0.5 shrink-0 text-blue-700"
                  />
                  <p className="text-sm leading-relaxed text-gray-600">
                    <strong className="font-semibold text-gray-900">
                      What activation unlocks:
                    </strong>{" "}
                    access to the AI training job interface, task instructions,
                    work tracking, and eligible opportunity tools after
                    verification.
                  </p>
                </div>
              </div>

              <div className="mt-4 rounded-lg border border-amber-200 bg-amber-50 p-4">
                <p className="text-sm leading-relaxed text-amber-800">
                  <strong className="font-semibold">
                    Important disclosure:
                  </strong>{" "}
                  Activation does not guarantee employment, tasks, daily income,
                  earnings, returns, or acceptance by an external platform.
                  Actual earnings depend on task availability, eligibility,
                  skill level, performance, and third-party policies.
                </p>
              </div>

              <div className="mt-5 flex items-center gap-3 rounded-lg bg-gray-900 p-4 text-white">
                <div className="grid h-10 w-10 place-items-center rounded-lg bg-amber-500 text-gray-900">
                  <TimerReset size={19} />
                </div>
                <div>
                  <p className="text-[10px] font-medium uppercase tracking-wider text-gray-400">
                    Illustrative target only
                  </p>
                  <p className="mt-0.5 text-lg font-bold tabular">
                    $5–$10 / day{" "}
                    <span className="text-xs font-medium text-amber-400">
                      · 3–7 hrs/day
                    </span>
                  </p>
                </div>
              </div>
            </div>

            {/* Right: payment */}
            <div className="rounded-lg border border-gray-200 bg-white p-4 sm:p-5">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-medium uppercase tracking-wider text-gray-400">
                    USDT payment
                  </p>
                  <p className="mt-1 text-base font-semibold text-gray-900">
                    BEP20 network
                  </p>
                </div>
                <span className="rounded-md bg-green-50 px-2 py-0.5 text-[11px] font-medium text-green-700">
                  Official wallet
                </span>
              </div>

              <div className="mt-4 grid place-items-center rounded-lg border border-gray-200 bg-gray-50 p-3">
                <img
                  src={QR_ASSET}
                  alt="USDT BEP20 receiving wallet QR code"
                  className="h-32 w-32 rounded-lg object-contain sm:h-40 sm:w-40"
                />
              </div>

              <p className="mt-4 text-[10px] font-medium uppercase tracking-wider text-gray-400">
                Receiving address
              </p>
              <div className="mt-2 flex gap-2">
                <div className="min-w-0 flex-1 rounded-lg border border-gray-200 bg-gray-50 px-3 py-3 font-mono text-[11px] leading-4 text-gray-600">
                  <span className="break-all">{WALLET_ADDRESS}</span>
                </div>
                <button
                  onClick={copyAddress}
                  className="grid h-11 w-11 shrink-0 place-items-center rounded-lg border border-gray-200 bg-white text-blue-700 transition hover:bg-blue-50"
                  aria-label="Copy official wallet address"
                >
                  {copied ? <Check size={18} /> : <Copy size={18} />}
                </button>
              </div>
              <p className="mt-2 text-[11px] leading-4 text-gray-400">
                Only send USDT using BEP20. Another network may cause permanent
                loss.
              </p>

              <label className="mt-4 grid gap-1.5">
                <span className="text-xs font-medium text-gray-600">
                  Transaction hash
                </span>
                <input
                  value={hash}
                  onChange={(e) => setHash(e.target.value)}
                  className="h-10 rounded-lg border border-gray-200 px-3 text-sm outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-600/15"
                  placeholder="Paste your transaction hash"
                />
              </label>
              <button
                onClick={submitHash}
                disabled={
                  !hash.trim() || status === "pending" || submitMutation.isPending
                }
                className="mt-3 inline-flex h-10 w-full items-center justify-center gap-2 rounded-lg bg-blue-700 px-4 text-sm font-semibold text-white transition hover:bg-blue-800 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {status === "pending" ? "Submitted for verification" : "Submit payment"}
                <Clipboard size={15} />
              </button>
            </div>
          </div>

          {/* Footer: status tracker */}
          <div className="border-t border-gray-100 bg-gray-50 px-5 py-5 sm:px-7">
            <div className="flex items-center justify-between gap-2">
              <p className="text-xs font-medium uppercase tracking-wider text-gray-400">
                Verification status
              </p>
              <span className="text-xs font-semibold text-amber-700">
                {statusLabels[status]}
              </span>
            </div>
            <div className="mt-4 grid grid-cols-4 gap-1.5">
              {steps.map((step, index) => (
                <div key={step} className="min-w-0">
                  <div
                    className={`h-1.5 rounded-full ${
                      index <= currentIndex ? "bg-blue-700" : "bg-gray-200"
                    }`}
                  />
                  <p
                    className={`mt-1.5 truncate text-[10px] font-medium ${
                      index <= currentIndex ? "text-blue-700" : "text-gray-400"
                    }`}
                  >
                    {statusLabels[step]}
                  </p>
                </div>
              ))}
            </div>
            <div className="mt-4 flex items-start gap-2 text-xs leading-relaxed text-gray-500">
              <LockKeyhole size={14} className="mt-0.5 shrink-0 text-blue-700" />
              <span>
                This gate cannot be dismissed or bypassed through navigation.
                It lifts only after an admin or verification service records{" "}
                <strong className="text-gray-900">
                  Payment Verified / Activation Complete
                </strong>
                .
              </span>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
