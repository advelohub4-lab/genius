import {
  ArrowRight,
  BookOpen,
  CheckCircle2,
  Clock3,
  FileCheck2,
  Lock,
  PlayCircle,
} from "lucide-react";
import { AppShell } from "@/components/AppShell";

const tracks = [
  {
    title: "AI Data Training",
    description:
      "Prepare, label, and review training data with consistent quality standards.",
    level: "Foundation",
    modules: "6 modules",
    progress: 72,
    icon: FileCheck2,
  },
  {
    title: "Text Annotation",
    description:
      "Apply clear labels to text and document decisions for reliable model training.",
    level: "Practical",
    modules: "5 modules",
    progress: 38,
    icon: CheckCircle2,
  },
  {
    title: "Model Evaluation",
    description:
      "Compare model outputs against quality, relevance, and safety criteria.",
    level: "Applied",
    modules: "7 modules",
    progress: 0,
    icon: BookOpen,
  },
  {
    title: "Prompt Engineering",
    description:
      "Write precise prompts and evaluate how well models follow instructions.",
    level: "Practical",
    modules: "Coming soon",
    progress: 0,
    icon: CheckCircle2,
  },
];

export default function Learn() {
  return (
    <AppShell title="Learning">
      <div className="reveal flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-gray-900">
            Learning paths
          </h2>
          <p className="mt-1.5 max-w-xl text-sm text-gray-500">
            Focused training to help you do AI work accurately and meet quality
            standards.
          </p>
        </div>
        <div className="rounded-lg border border-gray-200 bg-white px-4 py-3">
          <p className="text-xs font-medium text-gray-500">
            Overall progress
          </p>
          <p className="mt-0.5 text-xl font-bold tabular text-gray-900">58%</p>
        </div>
      </div>

      <div className="mt-6 grid gap-5 md:grid-cols-2">
        {tracks.map(({ title, description, level, modules, progress, icon: Icon }) => {
          const locked = !progress && modules === "Coming soon";
          return (
            <article
              key={title}
              className="safe-card safe-card-hover soft-shadow p-6"
            >
              <div className="flex items-start justify-between gap-4">
                <span className="grid h-10 w-10 place-items-center rounded-lg bg-blue-50 text-blue-700">
                  <Icon size={20} strokeWidth={1.75} />
                </span>
                <span className="rounded-md bg-gray-100 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide text-gray-500">
                  {level}
                </span>
              </div>
              <h3 className="mt-4 text-base font-semibold text-gray-900">
                {title}
              </h3>
              <p className="mt-2 min-h-[40px] text-sm leading-relaxed text-gray-500">
                {description}
              </p>
              <div className="mt-5 flex items-center justify-between text-xs">
                <span className="inline-flex items-center gap-1.5 font-medium text-gray-500">
                  <Clock3 size={14} /> {modules}
                </span>
                <span className="font-semibold text-gray-900">
                  {progress ? `${progress}%` : "Not started"}
                </span>
              </div>
              <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-gray-100">
                <div
                  className="h-full rounded-full bg-blue-700 transition-all"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <button
                disabled={locked}
                className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm font-medium text-blue-700 transition hover:bg-blue-50 disabled:cursor-not-allowed disabled:text-gray-300 disabled:hover:bg-white"
              >
                {locked ? (
                  <>
                    <Lock size={15} /> Coming soon
                  </>
                ) : (
                  <>
                    {progress ? (
                      <PlayCircle size={15} />
                    ) : (
                      <ArrowRight size={15} />
                    )}{" "}
                    {progress ? "Continue" : "Start path"}
                  </>
                )}
              </button>
            </article>
          );
        })}
      </div>

      <div className="mt-6 flex items-start gap-3 rounded-lg border border-gray-200 bg-gray-50 p-5">
        <BookOpen size={18} className="mt-0.5 shrink-0 text-blue-700" />
        <div>
          <p className="text-sm font-semibold text-gray-900">
            Training paths prepare you for task work
          </p>
          <p className="mt-1 text-sm leading-relaxed text-gray-500">
            Completion helps you practice and document progress. Third-party
            work platforms may still have their own assessments and quality
            checks.
          </p>
        </div>
      </div>
    </AppShell>
  );
}
