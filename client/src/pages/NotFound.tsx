import { AlertCircle, ArrowLeft } from "lucide-react";
import { Link } from "wouter";

export default function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-5">
      <div className="text-center">
        <div className="mx-auto grid h-14 w-14 place-items-center rounded-xl bg-gray-100 text-gray-400">
          <AlertCircle size={28} strokeWidth={1.5} />
        </div>
        <h1 className="mt-6 text-5xl font-bold tabular text-gray-900">404</h1>
        <h2 className="mt-2 text-lg font-semibold text-gray-700">
          Page not found
        </h2>
        <p className="mx-auto mt-1.5 max-w-sm text-sm leading-relaxed text-gray-500">
          The page you're looking for doesn't exist or may have been moved.
        </p>
        <Link
          href="/"
          className="mt-6 inline-flex items-center justify-center gap-2 rounded-lg bg-blue-700 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-800"
        >
          <ArrowLeft size={16} /> Back to home
        </Link>
      </div>
    </div>
  );
}
