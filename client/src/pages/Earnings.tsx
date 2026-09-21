import {
  ArrowDownToLine,
  CircleDollarSign,
  Clock3,
  Info,
  ReceiptText,
  ShieldCheck,
  Wallet,
} from "lucide-react";
import { AppShell } from "@/components/AppShell";

const summary = [
  {
    icon: CircleDollarSign,
    label: "Total earnings",
    value: "$0.00",
    note: "All time",
    tint: "bg-blue-50 text-blue-700",
  },
  {
    icon: Clock3,
    label: "Pending",
    value: "$0.00",
    note: "In review",
    tint: "bg-amber-50 text-amber-700",
  },
  {
    icon: Wallet,
    label: "Available",
    value: "$0.00",
    note: "Ready to withdraw",
    tint: "bg-green-50 text-green-700",
  },
];

export default function Earnings() {
  return (
    <AppShell title="Earnings">
      <div className="reveal">
        <h2 className="text-2xl font-bold tracking-tight text-gray-900">
          Track your earnings
        </h2>
        <p className="mt-1.5 max-w-2xl text-sm text-gray-500">
          A clear record of eligible work after it's completed and confirmed.
          This never forecasts or guarantees income.
        </p>
      </div>

      {/* Summary cards */}
      <div className="mt-6 grid gap-4 sm:grid-cols-3">
        {summary.map(({ icon: Icon, label, value, note, tint }) => (
          <div key={label} className="safe-card soft-shadow p-5">
            <div className="flex items-center gap-3">
              <span
                className={`grid h-9 w-9 place-items-center rounded-lg ${tint}`}
              >
                <Icon size={18} strokeWidth={1.75} />
              </span>
              <span className="text-xs font-medium text-gray-500">{note}</span>
            </div>
            <p className="mt-4 text-xs font-medium text-gray-500">{label}</p>
            <p className="mt-1 text-2xl font-bold tabular text-gray-900">
              {value}
            </p>
          </div>
        ))}
      </div>

      {/* Activity + info */}
      <div className="mt-6 grid gap-6 lg:grid-cols-[1.2fr_.8fr]">
        <section className="safe-card soft-shadow overflow-hidden">
          <div className="flex items-center justify-between border-b border-gray-100 p-5">
            <div>
              <h3 className="text-base font-semibold text-gray-900">
                Earnings activity
              </h3>
              <p className="mt-0.5 text-xs text-gray-500">
                Completed and pending eligible work.
              </p>
            </div>
            <button
              className="inline-flex items-center gap-2 rounded-lg border border-gray-200 px-3 py-1.5 text-xs font-medium text-gray-500"
              disabled
            >
              <ReceiptText size={14} /> Export
            </button>
          </div>
          <div className="px-5 py-16 text-center">
            <div className="mx-auto grid h-12 w-12 place-items-center rounded-xl bg-gray-100 text-gray-400">
              <ReceiptText size={22} strokeWidth={1.5} />
            </div>
            <h4 className="mt-4 text-base font-semibold text-gray-900">
              No earnings yet
            </h4>
            <p className="mx-auto mt-1.5 max-w-sm text-sm leading-relaxed text-gray-500">
              Complete eligible work to begin building your earnings history.
            </p>
          </div>
        </section>

        <aside className="space-y-4">
          <div className="safe-card soft-shadow p-5">
            <div className="flex items-start gap-3">
              <Info
                size={18}
                className="mt-0.5 shrink-0 text-blue-700"
              />
              <div>
                <p className="text-sm font-semibold text-gray-900">
                  Earnings are variable
                </p>
                <p className="mt-1.5 text-sm leading-relaxed text-gray-500">
                  The platform does not guarantee a specific daily, weekly, or
                  monthly income. Actual earnings depend on available work,
                  eligibility, performance, and third-party policies.
                </p>
              </div>
            </div>
          </div>
          <div className="safe-card soft-shadow p-5">
            <div className="flex items-start gap-3">
              <ShieldCheck
                size={18}
                className="mt-0.5 shrink-0 text-green-600"
              />
              <p className="text-sm leading-relaxed text-gray-500">
                No balances are invented for demonstration purposes.
              </p>
            </div>
          </div>
          <div className="flex items-start gap-3 rounded-lg border border-gray-200 bg-gray-50 p-4">
            <ArrowDownToLine
              size={17}
              className="mt-0.5 shrink-0 text-gray-400"
            />
            <p className="text-sm leading-relaxed text-gray-500">
              Withdrawal and payment info will be configurable when real earning
              sources and payout policies are connected.
            </p>
          </div>
        </aside>
      </div>
    </AppShell>
  );
}
