import { useState } from "react";
import {
  AlertTriangle,
  ArrowLeft,
  ArrowRight,
  Check,
  Copy,
  ExternalLink,
  LockKeyhole,
  ShieldCheck,
} from "lucide-react";
import { Link, useLocation } from "wouter";

const wallet = "0x69cb07ec7095461f457a0d7e7f370dbcfcc78539";

function Step({
  number,
  title,
  text,
  done = false,
}: {
  number: string;
  title: string;
  text: string;
  done?: boolean;
}) {
  return (
    <div className="flex gap-3.5">
      <div
        className={`grid h-7 w-7 shrink-0 place-items-center rounded-full text-xs font-semibold ${
          done ? "bg-green-600 text-white" : "bg-blue-50 text-blue-700"
        }`}
      >
        {done ? <Check size={14} /> : number}
      </div>
      <div>
        <p className="text-sm font-semibold text-gray-900">{title}</p>
        <p className="mt-0.5 text-sm leading-relaxed text-gray-500">{text}</p>
      </div>
    </div>
  );
}

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
    <div className="min-h-screen bg-gray-50">
      <header className="border-b border-gray-200 bg-white">
        <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-5 lg:px-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm font-medium text-gray-500 transition hover:text-blue-700"
          >
            <ArrowLeft size={16} /> <span className="hidden sm:inline">Back to home</span>
          </Link>
          <span className="font-semibold text-gray-900">Account activation</span>
          <span className="inline-flex items-center gap-1.5 text-xs font-medium text-green-700">
            <LockKeyhole size={14} /> Secure flow
          </span>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-5 py-8 lg:px-8 lg:py-12">
        <div className="mx-auto max-w-4xl">
          <div className="mb-8">
            <span className="eyebrow">Account activation</span>
            <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900">
              Activate your account
            </h1>
            <p className="mt-2.5 max-w-2xl text-base leading-relaxed text-gray-600">
              Activation unlocks the full workspace after your payment
              submission has been reviewed. This process never guarantees a job,
              task, income, or earnings.
            </p>
          </div>

          <div className="grid gap-6 lg:grid-cols-[1.1fr_.9fr] lg:items-start">
            {/* Payment panel */}
            <section className="safe-card soft-shadow overflow-hidden">
              <div className="border-b border-gray-100 p-6">
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div>
                    <p className="text-xs font-medium uppercase tracking-wider text-gray-400">
                      Payment status
                    </p>
                    <div className="mt-2 inline-flex items-center gap-2 rounded-md bg-amber-50 px-2.5 py-1 text-xs font-medium text-amber-700">
                      <span className="h-1.5 w-1.5 rounded-full bg-amber-500" />
                      {submitted ? "Verification pending" : "Payment required"}
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-xs font-medium text-gray-500">
                      Activation amount
                    </p>
                    <p className="mt-1 text-2xl font-bold tabular text-gray-900">
                      $10{" "}
                      <span className="text-sm font-medium text-gray-400">
                        USD
                      </span>
                    </p>
                  </div>
                </div>
                <div className="mt-5 grid gap-3 sm:grid-cols-2">
                  <div className="rounded-lg bg-gray-50 p-4">
                    <p className="text-xs font-medium text-gray-500">
                      Account status
                    </p>
                    <p className="mt-1.5 flex items-center gap-2 text-sm font-semibold text-amber-700">
                      <span className="h-2 w-2 rounded-full bg-amber-500" /> Not
                      activated
                    </p>
                  </div>
                  <div className="rounded-lg bg-gray-50 p-4">
                    <p className="text-xs font-medium text-gray-500">
                      Payment method
                    </p>
                    <p className="mt-1.5 text-sm font-semibold text-gray-900">
                      USDT <span className="text-gray-400">· BEP20</span>
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-6">
                <div className="flex items-start gap-3 rounded-lg border border-amber-200 bg-amber-50 p-4">
                  <AlertTriangle
                    className="mt-0.5 shrink-0 text-amber-600"
                    size={17}
                  />
                  <p className="text-sm leading-relaxed text-amber-800">
                    <strong className="font-semibold">
                      Network warning:
                    </strong>{" "}
                    Only send funds using the specified network. Sending assets
                    through another network may result in permanent loss.
                  </p>
                </div>

                <div className="mt-6 flex items-center justify-between">
                  <div>
                    <p className="text-xs font-medium uppercase tracking-wider text-gray-400">
                      Receiving address
                    </p>
                    <p className="mt-1 text-sm font-semibold text-gray-900">
                      USDT — BEP20
                    </p>
                  </div>
                  <span className="rounded-md bg-green-50 px-2 py-0.5 text-[11px] font-medium text-green-700">
                    Official wallet
                  </span>
                </div>

                <div className="mt-3 flex gap-2">
                  <div className="min-w-0 flex-1 overflow-hidden rounded-lg border border-gray-200 bg-gray-50 px-3.5 py-3 font-mono text-xs text-gray-600">
                    <span className="break-all">{wallet}</span>
                  </div>
                  <button
                    onClick={copy}
                    className="grid h-11 w-11 shrink-0 place-items-center rounded-lg border border-gray-200 bg-white text-blue-700 transition hover:bg-blue-50"
                    aria-label="Copy address"
                  >
                    {copied ? <Check size={18} /> : <Copy size={18} />}
                  </button>
                </div>

                <div className="mt-5 grid gap-5 sm:grid-cols-[140px_1fr] sm:items-center">
                  <div className="grid aspect-square place-items-center rounded-lg border border-gray-200 bg-white p-3">
                    <img
                      src="/manus-storage/skill2earn-usdt-bep20-qr_b1d13216.png"
                      alt="USDT BEP20 wallet QR code"
                      className="h-full w-full rounded-lg object-contain"
                    />
                    <p className="sr-only">
                      QR code for the official USDT BEP20 receiving address.
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-900">
                      Submit for verification
                    </p>
                    <p className="mt-1.5 text-sm leading-relaxed text-gray-500">
                      After sending exactly the required amount, paste the
                      transaction hash below. Entering a hash does not
                      automatically activate your account.
                    </p>
                    <label className="mt-4 grid gap-1.5">
                      <span className="text-xs font-medium text-gray-600">
                        Transaction hash
                      </span>
                      <input
                        className="h-10 rounded-lg border border-gray-200 px-3 text-sm outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-600/15"
                        placeholder="Paste your transaction hash"
                        value={hash}
                        onChange={(e) => setHash(e.target.value)}
                      />
                    </label>
                    <button
                      onClick={() => hash.trim() && setSubmitted(true)}
                      disabled={!hash.trim() || submitted}
                      className="pressable mt-3 inline-flex h-10 items-center justify-center gap-2 rounded-lg bg-blue-700 px-4 text-sm font-semibold text-white transition hover:bg-blue-800 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      {submitted ? "Submitted for review" : "Submit payment"}
                      <ArrowRight size={16} />
                    </button>
                  </div>
                </div>
              </div>
            </section>

            {/* Steps + info */}
            <aside className="grid gap-4">
              <div className="safe-card soft-shadow p-6">
                <p className="text-xs font-medium uppercase tracking-wider text-gray-400">
                  What happens next
                </p>
                <div className="mt-5 grid gap-5">
                  <Step
                    number="1"
                    title="Send the exact amount"
                    text="Use only USDT on the BEP20 network."
                  />
                  <Step
                    number="2"
                    title="Copy the transaction hash"
                    text="Find it in your wallet or exchange history."
                  />
                  <Step
                    number="3"
                    title="Submit for review"
                    text="A reviewer checks destination, network, asset, amount, status, and confirmations."
                  />
                  <Step
                    number="4"
                    title="Activation complete"
                    text="Your account status changes only after verification."
                  />
                </div>
              </div>
              <div className="rounded-lg border border-blue-200 bg-blue-50 p-5">
                <div className="flex items-start gap-3">
                  <ShieldCheck
                    size={18}
                    className="mt-0.5 shrink-0 text-blue-700"
                  />
                  <div>
                    <p className="text-sm font-semibold text-gray-900">
                      What activation does — and does not — do
                    </p>
                    <p className="mt-1.5 text-sm leading-relaxed text-gray-600">
                      Activation is an access and review step. It does not
                      guarantee employment, tasks, income, returns, or acceptance
                      by any external platform.
                    </p>
                  </div>
                </div>
              </div>
              <button
                onClick={() => setLocation("/app")}
                className="inline-flex items-center justify-center gap-2 rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm font-medium text-blue-700 transition hover:bg-gray-50"
              >
                Preview workspace <ExternalLink size={15} />
              </button>
            </aside>
          </div>
        </div>
      </main>
    </div>
  );
}
