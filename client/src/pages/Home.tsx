import { Link } from "wouter";
import {
  ArrowRight,
  BookOpen,
  BriefcaseBusiness,
  CircleDollarSign,
  FileCheck2,
  GraduationCap,
  ShieldCheck,
  TrendingUp,
} from "lucide-react";
import { MarketingHeader } from "@/components/MarketingHeader";
import { Skill2EarnLogo } from "@/components/Skill2EarnLogo";

const steps = [
  {
    icon: GraduationCap,
    title: "Build your skills",
    text: "Complete focused training paths that teach you how to do AI data work accurately.",
  },
  {
    icon: FileCheck2,
    title: "Complete tasks",
    text: "Pick up data labeling, prompt testing, and model evaluation tasks when they're available.",
  },
  {
    icon: CircleDollarSign,
    title: "Track earnings",
    text: "See completed work and pending earnings in one clear, honest dashboard.",
  },
] as const;

const features = [
  {
    icon: BookOpen,
    title: "Learning paths",
    text: "Short, practical courses on data annotation, model evaluation, and prompt testing.",
  },
  {
    icon: BriefcaseBusiness,
    title: "Work opportunities",
    text: "Browse reviewed external opportunities with clear eligibility and skill requirements.",
  },
  {
    icon: TrendingUp,
    title: "Progress tracking",
    text: "Monitor your training progress, completed tasks, and earnings history over time.",
  },
] as const;

const faqs = [
  {
    q: "Is Skill2Earn HUB free to join?",
    a: "Creating an account and accessing learning paths is free. A one-time activation fee may apply before paid work features are unlocked.",
  },
  {
    q: "Do you guarantee income?",
    a: "No. Earnings depend on task availability, your eligibility, skill level, performance, and third-party platform policies. Any income figures shown are illustrative targets, not promises.",
  },
  {
    q: "What kind of work is available?",
    a: "AI training tasks like data labeling, text annotation, prompt testing, and model evaluation. Opportunities are sourced from external platforms with their own requirements.",
  },
  {
    q: "How do I get paid?",
    a: "Payment is handled by the external platform hosting each task. Skill2Earn HUB helps you find and prepare for work, but does not process payouts directly.",
  },
] as const;

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <MarketingHeader />

      {/* Hero */}
      <section className="relative overflow-hidden border-b border-gray-100">
        <div className="mx-auto max-w-6xl px-5 py-16 lg:px-8 lg:py-24">
          <div className="max-w-2xl">
            <span className="eyebrow">Learn · Work · Earn</span>
            <h1 className="mt-5 text-4xl font-bold leading-[1.1] tracking-tight text-gray-900 sm:text-5xl">
              Turn your skills into income
            </h1>
            <p className="mt-5 text-lg leading-relaxed text-gray-600">
              Learn practical skills, complete digital work, and build your
              earning potential from anywhere.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/auth/signup"
                className="pressable inline-flex items-center justify-center gap-2 rounded-lg bg-blue-700 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-800"
              >
                Get started <ArrowRight size={16} />
              </Link>
              <Link
                href="/app/jobs"
                className="pressable inline-flex items-center justify-center gap-2 rounded-lg border border-gray-200 bg-white px-5 py-3 text-sm font-semibold text-gray-700 transition hover:bg-gray-50"
              >
                Explore opportunities
              </Link>
            </div>
            <p className="mt-4 text-xs text-gray-400">
              No guaranteed income. Earnings depend on task availability and
              eligibility.
            </p>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="how-it-works" className="border-b border-gray-100">
        <div className="mx-auto max-w-6xl px-5 py-16 lg:px-8 lg:py-20">
          <div className="max-w-2xl">
            <h2 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
              How it works
            </h2>
            <p className="mt-3 text-base text-gray-600">
              Three straightforward steps to start building skills and finding
              work.
            </p>
          </div>
          <div className="mt-10 grid gap-8 sm:grid-cols-3">
            {steps.map(({ icon: Icon, title, text }, i) => (
              <div key={title} className="relative">
                <div className="flex items-center gap-3">
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-blue-50 text-blue-700">
                    <Icon size={20} strokeWidth={1.75} />
                  </span>
                  <span className="text-sm font-semibold text-gray-400">
                    Step {i + 1}
                  </span>
                </div>
                <h3 className="mt-4 text-base font-semibold text-gray-900">
                  {title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-gray-600">
                  {text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What you can do */}
      <section className="border-b border-gray-100 bg-gray-50">
        <div className="mx-auto max-w-6xl px-5 py-16 lg:px-8 lg:py-20">
          <div className="max-w-2xl">
            <h2 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
              What you can do here
            </h2>
            <p className="mt-3 text-base text-gray-600">
              Practical tools to help you learn, find work, and track progress.
            </p>
          </div>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {features.map(({ icon: Icon, title, text }) => (
              <div
                key={title}
                className="safe-card soft-shadow p-6"
              >
                <span className="grid h-10 w-10 place-items-center rounded-lg bg-blue-50 text-blue-700">
                  <Icon size={20} strokeWidth={1.75} />
                </span>
                <h3 className="mt-4 text-base font-semibold text-gray-900">
                  {title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-gray-600">
                  {text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust */}
      <section className="border-b border-gray-100">
        <div className="mx-auto max-w-6xl px-5 py-16 lg:px-8 lg:py-20">
          <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
            <div>
              <h2 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
                Built on transparency
              </h2>
              <p className="mt-3 text-base text-gray-600">
                We'd rather show you an honest empty state than fabricate jobs,
                salaries, or guarantees. Every opportunity is clearly labelled,
                and we never promise income we can't deliver.
              </p>
              <div className="mt-8 space-y-4">
                <div className="flex items-start gap-3">
                  <ShieldCheck
                    size={20}
                    className="mt-0.5 shrink-0 text-green-600"
                  />
                  <p className="text-sm text-gray-600">
                    External opportunities are always labelled before you apply.
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <FileCheck2
                    size={20}
                    className="mt-0.5 shrink-0 text-green-600"
                  />
                  <p className="text-sm text-gray-600">
                    No fabricated job listings, companies, or payout claims.
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <CircleDollarSign
                    size={20}
                    className="mt-0.5 shrink-0 text-green-600"
                  />
                  <p className="text-sm text-gray-600">
                    Earnings figures are illustrative targets, not guarantees.
                  </p>
                </div>
              </div>
            </div>
            <div className="safe-card soft-shadow-lg p-8">
              <p className="text-sm font-semibold text-gray-900">
                Ready to start?
              </p>
              <p className="mt-2 text-sm text-gray-600">
                Create an account to access learning paths, browse
                opportunities, and track your progress.
              </p>
              <Link
                href="/auth/signup"
                className="mt-5 inline-flex items-center justify-center gap-2 rounded-lg bg-blue-700 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-800"
              >
                Create your account <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="border-b border-gray-100 bg-gray-50">
        <div className="mx-auto max-w-3xl px-5 py-16 lg:px-8 lg:py-20">
          <h2 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
            Frequently asked questions
          </h2>
          <div className="mt-8 divide-y divide-gray-200">
            {faqs.map(({ q, a }) => (
              <details key={q} className="group py-4">
                <summary className="flex cursor-pointer items-center justify-between text-sm font-semibold text-gray-900 marker:content-none">
                  {q}
                  <span className="ml-4 shrink-0 text-gray-400 transition group-open:rotate-180">
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                    >
                      <path
                        d="M4 6l4 4 4-4"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                      />
                    </svg>
                  </span>
                </summary>
                <p className="mt-3 text-sm leading-relaxed text-gray-600">
                  {a}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#0e1b33] text-gray-400">
        <div className="mx-auto max-w-6xl px-5 py-12 lg:px-8">
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            <div>
              <Skill2EarnLogo light />
              <p className="mt-4 max-w-xs text-sm leading-relaxed text-gray-500">
                Learn skills, complete digital work, and track your earnings —
                all in one place.
              </p>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-gray-500">
                Platform
              </p>
              <ul className="mt-3 space-y-2 text-sm">
                <li>
                  <Link href="/app/learn" className="hover:text-white">
                    Learning
                  </Link>
                </li>
                <li>
                  <Link href="/app/jobs" className="hover:text-white">
                    Find work
                  </Link>
                </li>
                <li>
                  <Link href="/app/earnings" className="hover:text-white">
                    Earnings
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-gray-500">
                Legal
              </p>
              <ul className="mt-3 space-y-2 text-sm">
                <li>
                  <Link href="/legal/terms" className="hover:text-white">
                    Terms
                  </Link>
                </li>
                <li>
                  <Link href="/legal/privacy" className="hover:text-white">
                    Privacy
                  </Link>
                </li>
                <li>
                  <Link href="/legal/disclaimer" className="hover:text-white">
                    Earnings disclaimer
                  </Link>
                </li>
                <li>
                  <Link href="/legal/risk" className="hover:text-white">
                    Risk disclosure
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-gray-500">
                Account
              </p>
              <ul className="mt-3 space-y-2 text-sm">
                <li>
                  <Link href="/auth/signin" className="hover:text-white">
                    Sign in
                  </Link>
                </li>
                <li>
                  <Link href="/auth/signup" className="hover:text-white">
                    Create account
                  </Link>
                </li>
                <li>
                  <Link href="/legal/contact" className="hover:text-white">
                    Support
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-10 border-t border-white/10 pt-6 text-xs text-gray-500">
            <p>
              Skill2Earn HUB is a training and opportunity-discovery platform.
              It is not an employer and does not guarantee income.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
