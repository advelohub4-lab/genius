import { useState } from "react";
import { trpc } from "@/lib/trpc";
import {
  Activity,
  Check,
  ChevronDown,
  CircleDollarSign,
  FileText,
  LayoutDashboard,
  LockKeyhole,
  Plus,
  Search,
  Settings,
  ShieldCheck,
  Users,
  X,
} from "lucide-react";
import { AppShell } from "@/components/AppShell";

const tabs = [
  ["overview", "Overview", LayoutDashboard],
  ["users", "Users", Users],
  ["payments", "Payments", CircleDollarSign],
  ["jobs", "Jobs", FileText],
  ["settings", "Settings", Settings],
] as const;

function Stat({
  label,
  value,
  note,
  tint = "blue",
}: {
  label: string;
  value: string;
  note: string;
  tint?: "blue" | "amber" | "green" | "gray";
}) {
  const styles: Record<string, string> = {
    blue: "bg-blue-50 text-blue-700",
    amber: "bg-amber-50 text-amber-700",
    green: "bg-green-50 text-green-700",
    gray: "bg-gray-100 text-gray-600",
  };
  return (
    <div className="safe-card soft-shadow p-5">
      <span
        className={`grid h-9 w-9 place-items-center rounded-lg ${styles[tint]}`}
      >
        <Activity size={18} strokeWidth={1.75} />
      </span>
      <p className="mt-4 text-xs font-medium text-gray-500">{label}</p>
      <p className="mt-1 text-2xl font-bold tabular text-gray-900">{value}</p>
      <p className="mt-1 text-xs text-gray-400">{note}</p>
    </div>
  );
}

export default function Admin() {
  const [tab, setTab] = useState("overview");
  const [query, setQuery] = useState("");
  const [paymentState, setPaymentState] = useState("Pending review");
  const approveMutation = trpc.admin.approveActivation.useMutation();

  const approveDemoPayment = () => {
    approveMutation.mutate(
      { userId: 1 },
      {
        onSuccess: (result) => {
          if (result.approved) {
            window.localStorage.setItem(
              "skill2earn.activationStatus",
              "verified"
            );
            window.dispatchEvent(new Event("skill2earn:activation-updated"));
          }
          setPaymentState("Approved");
        },
        onError: () => {
          window.localStorage.setItem(
            "skill2earn.activationStatus",
            "verified"
          );
          window.dispatchEvent(new Event("skill2earn:activation-updated"));
          setPaymentState("Approved (demo)");
        },
      }
    );
  };

  return (
    <AppShell title="Admin" activationExempt>
      <div className="reveal flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <div className="inline-flex items-center gap-2 rounded-md bg-gray-900 px-2.5 py-1 text-xs font-medium text-white">
            <LockKeyhole size={13} /> Admin only · Demo console
          </div>
          <h2 className="mt-3 text-2xl font-bold tracking-tight text-gray-900">
            Platform control center
          </h2>
          <p className="mt-1.5 max-w-2xl text-sm text-gray-500">
            Review users, payment submissions, opportunities, and settings.
            Actions must be wired to protected admin procedures before
            production.
          </p>
        </div>
        <div className="inline-flex items-center gap-2 rounded-lg border border-green-200 bg-green-50 px-3 py-1.5 text-xs font-medium text-green-700">
          <ShieldCheck size={14} /> Role-based access required
        </div>
      </div>

      {/* Tabs */}
      <div className="mt-6 grid gap-1.5 overflow-x-auto rounded-lg border border-gray-200 bg-white p-1.5 sm:flex sm:w-fit">
        {tabs.map(([id, label, Icon]) => (
          <button
            key={id}
            onClick={() => setTab(id)}
            className={`inline-flex min-w-fit items-center justify-center gap-2 rounded-md px-3.5 py-2 text-sm font-medium transition ${
              tab === id
                ? "bg-blue-700 text-white"
                : "text-gray-500 hover:bg-gray-50"
            }`}
          >
            <Icon size={15} /> {label}
          </button>
        ))}
      </div>

      {tab === "overview" && (
        <>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            <Stat label="Registered users" value="1" note="Demo record only" />
            <Stat
              label="Payment submissions"
              value="0"
              note="No review queue"
              tint="amber"
            />
            <Stat
              label="Active listings"
              value="0"
              note="No fabricated jobs"
              tint="green"
            />
            <Stat
              label="Platform status"
              value="Draft"
              note="Connect integrations"
              tint="gray"
            />
          </div>
          <div className="mt-6 grid gap-6 xl:grid-cols-[1.2fr_.8fr]">
            <section className="safe-card soft-shadow p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-base font-semibold text-gray-900">
                    Recent activity
                  </h3>
                  <p className="mt-0.5 text-xs text-gray-500">
                    Audit events will appear here.
                  </p>
                </div>
                <button className="text-xs font-medium text-blue-700">
                  View audit log
                </button>
              </div>
              <div className="mt-6 rounded-lg border border-dashed border-gray-200 p-8 text-center">
                <Activity
                  className="mx-auto text-gray-300"
                  size={24}
                  strokeWidth={1.5}
                />
                <p className="mt-3 text-sm font-medium text-gray-600">
                  No activity to display
                </p>
                <p className="mt-1 text-xs text-gray-400">
                  Admin actions will be timestamped and attributable.
                </p>
              </div>
            </section>
            <section className="safe-card soft-shadow p-6">
              <h3 className="text-base font-semibold text-gray-900">
                Launch checklist
              </h3>
              <div className="mt-4 grid gap-2.5">
                {[
                  ["Connect real auth", false],
                  ["Set wallet and QR", false],
                  ["Add approved opportunities", false],
                  ["Publish policy pages", true],
                ].map(([label, done]) => (
                  <div
                    key={label as string}
                    className="flex items-center gap-3 rounded-lg bg-gray-50 p-2.5"
                  >
                    <span
                      className={`grid h-6 w-6 place-items-center rounded ${
                        done
                          ? "bg-green-100 text-green-700"
                          : "bg-white text-gray-300"
                      }`}
                    >
                      {done ? <Check size={14} /> : <span className="h-1.5 w-1.5 rounded-full bg-gray-300" />}
                    </span>
                    <span className="text-sm font-medium text-gray-700">
                      {label as string}
                    </span>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </>
      )}

      {tab === "users" && (
        <section className="safe-card soft-shadow mt-6 overflow-hidden">
          <div className="flex flex-col gap-4 border-b border-gray-100 p-5 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h3 className="text-base font-semibold text-gray-900">Users</h3>
              <p className="mt-0.5 text-xs text-gray-500">
                Search and review account status.
              </p>
            </div>
            <label className="flex h-9 items-center gap-2 rounded-lg border border-gray-200 px-3">
              <Search size={15} className="text-gray-400" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full text-sm outline-none sm:w-52"
                placeholder="Search users"
              />
            </label>
          </div>
          <div className="overflow-x-auto scroll-thin">
            <table className="w-full min-w-[680px] text-left text-sm">
              <thead className="bg-gray-50 text-xs uppercase tracking-wide text-gray-500">
                <tr>
                  <th className="px-5 py-3 font-medium">User</th>
                  <th className="px-5 py-3 font-medium">Country</th>
                  <th className="px-5 py-3 font-medium">Account</th>
                  <th className="px-5 py-3 font-medium">Payment</th>
                  <th className="px-5 py-3 font-medium">Created</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-t border-gray-100">
                  <td className="px-5 py-4">
                    <p className="font-semibold text-gray-900">Amina Moyo</p>
                    <p className="text-xs text-gray-400">amina@example.com</p>
                  </td>
                  <td className="px-5 py-4 text-gray-600">Zimbabwe</td>
                  <td className="px-5 py-4">
                    <span className="rounded-md bg-amber-50 px-2 py-0.5 text-xs font-medium text-amber-700">
                      Pending
                    </span>
                  </td>
                  <td className="px-5 py-4 text-gray-600">Required</td>
                  <td className="px-5 py-4 text-gray-500">20 Sep 2026</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>
      )}

      {tab === "payments" && (
        <section className="safe-card soft-shadow mt-6 p-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h3 className="text-base font-semibold text-gray-900">
                Payment verification queue
              </h3>
              <p className="mt-0.5 text-xs text-gray-500">
                Hashes never activate accounts automatically.
              </p>
            </div>
            <span className="rounded-md bg-amber-50 px-2.5 py-1 text-xs font-medium text-amber-700">
              {paymentState}
            </span>
          </div>
          <div className="mt-6 rounded-lg border border-dashed border-gray-200 p-6">
            <div className="flex items-start gap-3">
              <CircleDollarSign
                size={20}
                className="mt-0.5 shrink-0 text-amber-600"
              />
              <div>
                <p className="text-sm font-semibold text-gray-900">
                  No payment submissions
                </p>
                <p className="mt-1 text-sm leading-relaxed text-gray-500">
                  When a user submits a hash, reviewers must check destination
                  wallet, network, token, amount, status, and confirmations.
                </p>
              </div>
            </div>
            <div className="mt-5 flex flex-wrap gap-2">
              <button
                onClick={approveDemoPayment}
                className="inline-flex items-center gap-2 rounded-lg bg-green-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-green-700"
              >
                <Check size={15} /> Demo approve
              </button>
              <button
                onClick={() => setPaymentState("Rejected")}
                className="inline-flex items-center gap-2 rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-red-700"
              >
                <X size={15} /> Demo reject
              </button>
            </div>
          </div>
        </section>
      )}

      {tab === "jobs" && (
        <section className="safe-card soft-shadow mt-6 p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-semibold text-gray-900">
                Opportunity listings
              </h3>
              <p className="mt-0.5 text-xs text-gray-500">
                Add only approved external links. No fake listings.
              </p>
            </div>
            <button className="inline-flex items-center gap-2 rounded-lg bg-blue-700 px-3.5 py-2 text-sm font-medium text-white transition hover:bg-blue-800">
              <Plus size={15} /> Add opportunity
            </button>
          </div>
          <div className="mt-6 rounded-lg border border-dashed border-gray-200 py-12 text-center">
            <FileText
              className="mx-auto text-gray-300"
              size={24}
              strokeWidth={1.5}
            />
            <p className="mt-3 text-sm font-medium text-gray-600">
              No listings yet
            </p>
            <p className="mt-1 text-xs text-gray-400">
              Create and manage job titles, descriptions, companies, URLs,
              categories, skills, and closing dates here.
            </p>
          </div>
        </section>
      )}

      {tab === "settings" && (
        <section className="safe-card soft-shadow mt-6 max-w-3xl p-6">
          <div className="flex items-center gap-3">
            <span className="grid h-9 w-9 place-items-center rounded-lg bg-blue-50 text-blue-700">
              <Settings size={18} strokeWidth={1.75} />
            </span>
            <div>
              <h3 className="text-base font-semibold text-gray-900">
                Platform settings
              </h3>
              <p className="text-xs text-gray-500">
                Owner-controlled values for payment and policy surfaces.
              </p>
            </div>
          </div>
          <div className="mt-6 grid gap-5 sm:grid-cols-2">
            <label className="grid gap-1.5">
              <span className="text-xs font-medium text-gray-600">
                Activation fee (USD)
              </span>
              <input
                className="h-10 rounded-lg border border-gray-200 px-3 text-sm"
                value="$10.00"
                readOnly
              />
            </label>
            <label className="grid gap-1.5">
              <span className="text-xs font-medium text-gray-600">
                Payment network
              </span>
              <div className="relative">
                <select className="h-10 w-full appearance-none rounded-lg border border-gray-200 bg-white px-3 text-sm">
                  <option>USDT — BEP20</option>
                </select>
                <ChevronDown
                  size={15}
                  className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
                />
              </div>
            </label>
            <label className="grid gap-1.5 sm:col-span-2">
              <span className="text-xs font-medium text-gray-600">
                Wallet address
              </span>
              <input
                className="h-10 rounded-lg border border-gray-200 px-3 font-mono text-xs"
                value="0x69cb07ec7095461f457a0d7e7f370dbcfcc78539"
                readOnly
              />
            </label>
            <label className="grid gap-1.5 sm:col-span-2">
              <span className="text-xs font-medium text-gray-600">
                Payment instructions
              </span>
              <textarea
                className="min-h-24 rounded-lg border border-gray-200 p-3 text-sm"
                value="Send exactly the required amount using the supported network. Copy the transaction hash and submit it for verification."
                readOnly
              />
            </label>
          </div>
          <button className="mt-5 inline-flex items-center gap-2 rounded-lg bg-blue-700 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-blue-800">
            <Check size={16} /> Save settings
          </button>
        </section>
      )}
    </AppShell>
  );
}
