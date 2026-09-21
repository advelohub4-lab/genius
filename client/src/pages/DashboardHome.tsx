import {
  ArrowRight,
  BookOpen,
  BriefcaseBusiness,
  CircleDollarSign,
  Clock3,
  FileCheck2,
  Flame,
  ShieldCheck,
  Wallet,
} from "lucide-react";
import { Link } from "wouter";
import { AppShell } from "@/components/AppShell";

const stats = [
  {
    icon: CircleDollarSign,
    label: "Today's earnings",
    value: "$0.00",
    note: "No completed tasks today",
    tint: "bg-blue-50 text-blue-700",
  },
  {
    icon: Wallet,
    label: "Available balance",
    value: "$0.00",
    note: "No withdrawals configured",
    tint: "bg-amber-50 text-amber-700",
  },
  {
    icon: FileCheck2,
    label: "Tasks completed",
    value: "0",
    note: "Start training to qualify",
    tint: "bg-green-50 text-green-700",
  },
  {
    icon: Flame,
    label: "Current streak",
    value: "0 days",
    note: "Complete tasks daily to build",
    tint: "bg-purple-50 text-purple-700",
  },
] as const;

const quickActions = [
  {
    icon: BookOpen,
    label: "Continue learning",
    text: "AI data training fundamentals · 58% complete",
    href: "/app/learn",
  },
  {
    icon: BriefcaseBusiness,
    label: "Find work",
    text: "Browse available AI training opportunities",
    href: "/app/jobs",
  },
  {
    icon: FileCheck2,
    label: "Complete profile",
    text: "Add your work preferences and skills",
    href: "/app/profile",
  },
] as const;

export default function DashboardHome() {
  const hour = new Date().getHours();
  const greeting =
    hour < 12 ? "Good morning" : hour < 18 ? "Good afternoon" : "Good evening";

  return (
    <AppShell title="Dashboard">
      <div className="reveal">
        <h2 className="text-2xl font-bold tracking-tight text-gray-900">
          {greeting}, Amina
        </h2>
        <p className="mt-1.5 text-sm text-gray-500">
          Here's what's happening with your work today.
        </p>
      </div>

      {/* Stat cards */}
      <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map(({ icon: Icon, label, value, note, tint }) => (
          <div key={label} className="safe-card soft-shadow p-5">
            <div className="flex items-center justify-between">
              <span
                className={`grid h-9 w-9 place-items-center rounded-lg ${tint}`}
              >
                <Icon size={18} strokeWidth={1.75} />
              </span>
            </div>
            <p className="mt-4 text-xs font-medium text-gray-500">{label}</p>
            <p className="mt-1 text-2xl font-bold tabular text-gray-900">
              {value}
            </p>
            <p className="mt-1.5 text-xs text-gray-400">{note}</p>
          </div>
        ))}
      </div>

      {/* Quick actions + side panel */}
      <div className="mt-8 grid gap-6 lg:grid-cols-[1.3fr_.7fr]">
        <section className="safe-card soft-shadow p-6">
          <h3 className="text-base font-semibold text-gray-900">
            Next steps
          </h3>
          <p className="mt-1 text-sm text-gray-500">
            Actions to help you move forward.
          </p>
          <div className="mt-5 grid gap-3">
            {quickActions.map(({ icon: Icon, label, text, href }) => (
              <Link
                key={label}
                href={href}
                className="group flex items-center gap-4 rounded-lg border border-gray-200 p-4 transition hover:border-gray-300 hover:bg-gray-50"
              >
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-blue-50 text-blue-700">
                  <Icon size={19} strokeWidth={1.75} />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-semibold text-gray-900">
                    {label}
                  </p>
                  <p className="mt-0.5 truncate text-xs text-gray-500">
                    {text}
                  </p>
                </div>
                <ArrowRight
                  size={17}
                  className="text-gray-300 transition group-hover:translate-x-0.5 group-hover:text-blue-700"
                />
              </Link>
            ))}
          </div>
        </section>

        <section className="safe-card soft-shadow overflow-hidden">
          <div className="bg-[#0e1b33] p-6 text-white">
            <p className="text-xs font-medium uppercase tracking-wider text-gray-400">
              Trust note
            </p>
            <h3 className="mt-3 text-lg font-semibold">
              Quality work is the product.
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-gray-300">
              This workspace helps you build capability and make informed
              decisions — not to sell a guaranteed outcome.
            </p>
          </div>
          <div className="p-6">
            <div className="flex items-start gap-3">
              <ShieldCheck
                size={18}
                className="mt-0.5 shrink-0 text-green-600"
              />
              <p className="text-sm leading-relaxed text-gray-600">
                External opportunities are always marked before you apply.
              </p>
            </div>
            <Link
              href="/legal/disclaimer"
              className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-blue-700 hover:text-blue-800"
            >
              Read earnings disclaimer{" "}
              <ArrowRight size={14} />
            </Link>
          </div>
        </section>
      </div>
    </AppShell>
  );
}
