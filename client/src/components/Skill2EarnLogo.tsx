import { Link } from "wouter";

export function Skill2EarnLogo({
  light = false,
  compact = false,
}: {
  light?: boolean;
  compact?: boolean;
}) {
  return (
    <Link
      href="/"
      className="inline-flex items-center gap-2.5"
      aria-label="Skill2Earn HUB home"
    >
      <span
        className={`grid h-9 w-9 shrink-0 place-items-center rounded-lg ${
          light
            ? "bg-white/10 text-white ring-1 ring-white/15"
            : "bg-blue-50 text-blue-700"
        }`}
      >
        <svg
          viewBox="0 0 40 40"
          className="h-6 w-6"
          fill="none"
          aria-hidden="true"
        >
          <path
            d="M20 3.5 34 9v10.8c0 8.2-5.8 14-14 17.2-8.2-3.2-14-9-14-17.2V9l14-5.5Z"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinejoin="round"
          />
          <path
            d="m11.5 25.5 6.1-6.2 3.8 3.4 7.4-8.2"
            stroke={light ? "#c4a052" : "#a9803f"}
            strokeWidth="2.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M28.8 14.5h-4.7v4.7"
            stroke={light ? "#c4a052" : "#a9803f"}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>
      {!compact && (
        <span
          className={`text-[15px] font-semibold tracking-tight ${
            light ? "text-white" : "text-gray-900"
          }`}
        >
          Skill2Earn{" "}
          <span className={light ? "text-[#c4a052]" : "text-blue-700"}>HUB</span>
        </span>
      )}
    </Link>
  );
}
