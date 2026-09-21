import {
  Check,
  ChevronRight,
  LockKeyhole,
  Mail,
  MapPin,
  Phone,
  ShieldCheck,
  UserRound,
} from "lucide-react";
import { Link } from "wouter";
import { AppShell } from "@/components/AppShell";

const inputClass =
  "h-10 w-full rounded-lg border border-gray-200 bg-white px-3.5 text-sm text-gray-900 placeholder:text-gray-400";

export default function Profile() {
  return (
    <AppShell title="Profile">
      <div className="reveal">
        <h2 className="text-2xl font-bold tracking-tight text-gray-900">
          Your profile
        </h2>
        <p className="mt-1.5 max-w-2xl text-sm text-gray-500">
          Accurate details help you understand eligibility and keep your account
          secure.
        </p>
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_.75fr]">
        {/* Profile form */}
        <section className="safe-card soft-shadow p-6">
          <div className="flex items-center gap-4 border-b border-gray-100 pb-5">
            <div className="grid h-14 w-14 place-items-center rounded-full bg-blue-700 text-xl font-bold text-white">
              A
            </div>
            <div>
              <h3 className="text-base font-semibold text-gray-900">
                Amina Moyo
              </h3>
              <p className="mt-0.5 text-sm text-gray-500">
                @amina.moyo · Member since September 2026
              </p>
            </div>
            <button className="ml-auto hidden rounded-lg border border-gray-200 px-3 py-1.5 text-xs font-medium text-blue-700 transition hover:bg-blue-50 sm:block">
              Edit photo
            </button>
          </div>

          <div className="mt-6 grid gap-5 sm:grid-cols-2">
            <label className="grid gap-1.5">
              <span className="text-xs font-medium text-gray-600">
                First name
              </span>
              <div className="relative">
                <UserRound
                  size={15}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                />
                <input
                  className={`${inputClass} pl-9`}
                  value="Amina"
                  readOnly
                />
              </div>
            </label>
            <label className="grid gap-1.5">
              <span className="text-xs font-medium text-gray-600">
                Last name
              </span>
              <input className={inputClass} value="Moyo" readOnly />
            </label>
            <label className="grid gap-1.5">
              <span className="text-xs font-medium text-gray-600">Email</span>
              <div className="relative">
                <Mail
                  size={15}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                />
                <input
                  className={`${inputClass} pl-9`}
                  value="amina@example.com"
                  readOnly
                />
              </div>
            </label>
            <label className="grid gap-1.5">
              <span className="text-xs font-medium text-gray-600">Phone</span>
              <div className="relative">
                <Phone
                  size={15}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                />
                <input
                  className={`${inputClass} pl-9`}
                  value="+263 77 123 4567"
                  readOnly
                />
              </div>
            </label>
            <label className="grid gap-1.5 sm:col-span-2">
              <span className="text-xs font-medium text-gray-600">Country</span>
              <div className="relative">
                <MapPin
                  size={15}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                />
                <input
                  className={`${inputClass} pl-9`}
                  value="Zimbabwe"
                  readOnly
                />
              </div>
            </label>
          </div>

          <button
            onClick={() =>
              alert(
                "Profile editing will be connected to the database-backed profile procedure."
              )
            }
            className="mt-6 inline-flex h-10 items-center justify-center gap-2 rounded-lg bg-blue-700 px-4 text-sm font-semibold text-white transition hover:bg-blue-800"
          >
            Save changes <Check size={15} />
          </button>
        </section>

        {/* Sidebar */}
        <aside className="space-y-4">
          <div className="safe-card soft-shadow p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-medium uppercase tracking-wider text-gray-400">
                  Account status
                </p>
                <p className="mt-2 flex items-center gap-2 text-base font-semibold text-amber-700">
                  <span className="h-2 w-2 rounded-full bg-amber-500" />
                  Pending activation
                </p>
              </div>
              <ShieldCheck size={22} className="text-amber-500" />
            </div>
            <p className="mt-3 text-sm leading-relaxed text-gray-500">
              Finish payment review to unlock the full opportunity workspace.
            </p>
            <Link
              href="/activate"
              className="mt-4 inline-flex w-full items-center justify-between rounded-lg border border-amber-200 bg-amber-50 px-4 py-2.5 text-sm font-medium text-amber-800 transition hover:bg-amber-100"
            >
              Review activation <ChevronRight size={16} />
            </Link>
          </div>

          <div className="safe-card soft-shadow p-5">
            <div className="flex items-center gap-3">
              <span className="grid h-9 w-9 place-items-center rounded-lg bg-blue-50 text-blue-700">
                <LockKeyhole size={18} strokeWidth={1.75} />
              </span>
              <div>
                <h3 className="text-sm font-semibold text-gray-900">
                  Security
                </h3>
                <p className="text-xs text-gray-500">
                  Password and sign-in methods
                </p>
              </div>
            </div>
            <button
              onClick={() =>
                alert("Password management will be connected to the auth provider.")
              }
              className="mt-4 flex w-full items-center justify-between rounded-lg border border-gray-200 px-4 py-2.5 text-sm font-medium text-gray-600 transition hover:bg-gray-50"
            >
              Manage password <ChevronRight size={16} />
            </button>
          </div>
        </aside>
      </div>
    </AppShell>
  );
}
