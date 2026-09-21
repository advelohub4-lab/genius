import {
  BriefcaseBusiness,
  CalendarDays,
  ExternalLink,
  Globe2,
  MapPin,
  Search,
  ShieldCheck,
  SlidersHorizontal,
} from "lucide-react";
import { AppShell } from "@/components/AppShell";

export default function Jobs() {
  return (
    <AppShell title="Find Work">
      <div className="reveal">
        <h2 className="text-2xl font-bold tracking-tight text-gray-900">
          Find AI training work
        </h2>
        <p className="mt-1.5 max-w-2xl text-sm text-gray-500">
          Review external AI training opportunities by task type, location, and
          skill requirements. Apply only when the requirements make sense for
          you.
        </p>
      </div>

      {/* Search + filters */}
      <div className="mt-6 grid gap-3 sm:grid-cols-[1fr_auto_auto]">
        <label className="flex h-10 items-center gap-2 rounded-lg border border-gray-200 bg-white px-3">
          <Search size={16} className="text-gray-400" />
          <input
            className="min-w-0 flex-1 text-sm outline-none placeholder:text-gray-400"
            placeholder="Search jobs, platforms, or skills"
          />
        </label>
        <button className="inline-flex h-10 items-center justify-center gap-2 rounded-lg border border-gray-200 bg-white px-4 text-sm font-medium text-gray-600 transition hover:bg-gray-50">
          <SlidersHorizontal size={15} /> Category
        </button>
        <button className="inline-flex h-10 items-center justify-center gap-2 rounded-lg border border-gray-200 bg-white px-4 text-sm font-medium text-gray-600 transition hover:bg-gray-50">
          <ShieldCheck size={15} /> Filters
        </button>
      </div>

      {/* Empty state */}
      <div className="mt-8 rounded-xl border border-dashed border-gray-200 bg-white px-6 py-16 text-center">
        <div className="mx-auto grid h-14 w-14 place-items-center rounded-xl bg-blue-50 text-blue-700">
          <BriefcaseBusiness size={26} strokeWidth={1.5} />
        </div>
        <h3 className="mt-5 text-lg font-semibold text-gray-900">
          No approved opportunities yet
        </h3>
        <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-gray-500">
          New opportunities will appear here when they are added and reviewed.
          We'd rather show an honest empty state than fabricate jobs.
        </p>
        <div className="mx-auto mt-8 grid max-w-2xl gap-3 text-left sm:grid-cols-3">
          <div className="rounded-lg bg-gray-50 p-4">
            <Globe2 size={17} className="text-blue-700" />
            <p className="mt-3 text-xs font-semibold text-gray-700">
              Task type
            </p>
            <p className="mt-1 text-xs leading-5 text-gray-500">
              Data training, annotation, evaluation, or prompting.
            </p>
          </div>
          <div className="rounded-lg bg-gray-50 p-4">
            <MapPin size={17} className="text-blue-700" />
            <p className="mt-3 text-xs font-semibold text-gray-700">
              Country eligibility
            </p>
            <p className="mt-1 text-xs leading-5 text-gray-500">
              See where a role is available before applying.
            </p>
          </div>
          <div className="rounded-lg bg-gray-50 p-4">
            <CalendarDays size={17} className="text-blue-700" />
            <p className="mt-3 text-xs font-semibold text-gray-700">
              Quality expectations
            </p>
            <p className="mt-1 text-xs leading-5 text-gray-500">
              Understand review standards before starting.
            </p>
          </div>
        </div>
      </div>

      {/* External notice */}
      <div className="mt-6 flex items-start gap-3 rounded-lg border border-amber-200 bg-amber-50 p-4">
        <ExternalLink
          size={17}
          className="mt-0.5 shrink-0 text-amber-700"
        />
        <p className="text-sm leading-relaxed text-amber-800">
          <strong className="font-semibold">
            External opportunity notice:
          </strong>{" "}
          External platforms may have their own registration requirements,
          assessments, eligibility rules, payment policies, and geographic
          restrictions.
        </p>
      </div>
    </AppShell>
  );
}
