import { FormEvent, useMemo, useState } from "react";
import type { ChangeEvent, ReactNode } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  ChevronDown,
  Eye,
  EyeOff,
  LockKeyhole,
  Search,
  ShieldCheck,
} from "lucide-react";
import { Link, useLocation, useRoute } from "wouter";
import { Skill2EarnLogo } from "@/components/Skill2EarnLogo";

const countries: [string, string, string][] = [
  ["Zimbabwe", "🇿🇼", "+263"],
  ["South Africa", "🇿🇦", "+27"],
  ["United States", "🇺🇸", "+1"],
  ["United Kingdom", "🇬🇧", "+44"],
  ["Nigeria", "🇳🇬", "+234"],
  ["Kenya", "🇰🇪", "+254"],
  ["Ghana", "🇬🇭", "+233"],
  ["India", "🇮🇳", "+91"],
  ["Canada", "🇨🇦", "+1"],
  ["Australia", "🇦🇺", "+61"],
  ["Germany", "🇩🇪", "+49"],
  ["France", "🇫🇷", "+33"],
  ["Brazil", "🇧🇷", "+55"],
  ["Philippines", "🇵🇭", "+63"],
  ["United Arab Emirates", "🇦🇪", "+971"],
  ["Singapore", "🇸🇬", "+65"],
  ["Japan", "🇯🇵", "+81"],
  ["Rwanda", "🇷🇼", "+250"],
  ["Tanzania", "🇹🇿", "+255"],
  ["Uganda", "🇺🇬", "+256"],
];

function Field({
  label,
  children,
  hint,
}: {
  label: string;
  children: ReactNode;
  hint?: string;
}) {
  return (
    <label className="grid gap-1.5">
      <span className="text-sm font-medium text-gray-700">{label}</span>
      {children}
      {hint && <span className="text-xs text-gray-400">{hint}</span>}
    </label>
  );
}

const inputClass =
  "h-11 w-full rounded-lg border border-gray-200 bg-white px-3.5 text-sm text-gray-900 placeholder:text-gray-400 transition focus:border-blue-600 focus:ring-2 focus:ring-blue-600/15";

export default function AuthPage() {
  const [, setLocation] = useLocation();
  const [, params] = useRoute("/auth/:mode");
  const isSignIn = params?.mode !== "signup";
  const [step, setStep] = useState(1);
  const [showPassword, setShowPassword] = useState(false);
  const [countrySearch, setCountrySearch] = useState("");
  const [countryOpen, setCountryOpen] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState(countries[0]);
  const [values, setValues] = useState({
    firstName: "",
    lastName: "",
    email: "",
    username: "",
    password: "",
    confirm: "",
    phone: "",
    referral: "",
  });

  const filteredCountries = useMemo(
    () =>
      countries.filter(([name, , code]) =>
        `${name} ${code}`.toLowerCase().includes(countrySearch.toLowerCase())
      ),
    [countrySearch]
  );
  const update =
    (key: string) => (event: ChangeEvent<HTMLInputElement>) =>
      setValues((current) => ({ ...current, [key]: event.target.value }));
  const submit = (event: FormEvent) => {
    event.preventDefault();
    if (!isSignIn && step < 2) {
      setStep(2);
      return;
    }
    setLocation(isSignIn ? "/app" : "/activate");
  };
  const title = isSignIn
    ? "Welcome back"
    : step === 1
    ? "Create your account"
    : "Tell us about you";

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="mx-auto flex min-h-screen max-w-6xl flex-col lg:grid lg:grid-cols-[.85fr_1.15fr]">
        {/* Left panel */}
        <aside className="grain relative overflow-hidden bg-[#0e1b33] px-6 py-8 text-white lg:flex lg:flex-col lg:justify-between lg:px-12 lg:py-12">
          <div className="relative z-10">
            <Skill2EarnLogo light />
            <div className="mt-12 max-w-md lg:mt-20">
              <span className="text-xs font-semibold uppercase tracking-wider text-[#c4a052]">
                A better starting point
              </span>
              <h1 className="mt-4 text-3xl font-bold leading-tight tracking-tight sm:text-4xl">
                Train AI and earn from eligible work.
              </h1>
              <p className="mt-4 leading-relaxed text-gray-400">
                A guided workspace for completing AI training tasks and reviewing
                paid opportunities with the context you need.
              </p>
            </div>
            <div className="mt-10 grid gap-3 lg:mt-16">
              <div className="flex items-center gap-3 rounded-lg bg-white/5 px-3 py-2.5">
                <span className="grid h-8 w-8 place-items-center rounded-lg bg-blue-600">
                  <ShieldCheck size={16} />
                </span>
                <span className="text-sm font-medium text-gray-300">
                  Transparent status
                </span>
              </div>
              <div className="flex items-center gap-3 rounded-lg bg-white/5 px-3 py-2.5">
                <span className="grid h-8 w-8 place-items-center rounded-lg bg-[#c4a052] text-[#0e1b33]">
                  <LockKeyhole size={16} />
                </span>
                <span className="text-sm font-medium text-gray-300">
                  Secure account flow
                </span>
              </div>
              <div className="flex items-center gap-3 rounded-lg bg-white/5 px-3 py-2.5">
                <span className="grid h-8 w-8 place-items-center rounded-lg bg-white/10">
                  <Check size={16} />
                </span>
                <span className="text-sm font-medium text-gray-300">
                  No income promises
                </span>
              </div>
            </div>
          </div>
          <p className="relative z-10 mt-8 text-xs text-gray-500">
            Training and opportunity discovery — not employment or financial
            advice.
          </p>
        </aside>

        {/* Right panel */}
        <main className="flex flex-1 flex-col px-6 py-8 sm:px-10 lg:px-14 lg:py-12">
          <div className="flex items-center justify-between">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-sm font-medium text-gray-500 transition hover:text-blue-700"
            >
              <ArrowLeft size={16} /> Back to home
            </Link>
            <span className="text-xs font-medium text-gray-400">
              {isSignIn ? "Account access" : `Step ${step} of 2`}
            </span>
          </div>

          <div className="mx-auto flex w-full max-w-[480px] flex-1 flex-col justify-center py-10">
            <div className="mb-7">
              <h2 className="text-2xl font-bold tracking-tight text-gray-900">
                {title}
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-gray-500">
                {isSignIn
                  ? "Sign in to continue your learning and opportunity journey."
                  : step === 1
                  ? "Start with your account details. You can refine your profile later."
                  : "A little context helps us show a more relevant workspace."}
              </p>
            </div>

            {!isSignIn && (
              <div className="mb-7 flex gap-2">
                {[1, 2].map((item) => (
                  <div
                    key={item}
                    className={`h-1 flex-1 rounded-full ${
                      item <= step ? "bg-blue-700" : "bg-gray-200"
                    }`}
                  />
                ))}
              </div>
            )}

            <form onSubmit={submit} className="grid gap-4">
              {isSignIn && (
                <Field label="Email address">
                  <input
                    className={inputClass}
                    type="email"
                    required
                    placeholder="you@example.com"
                    value={values.email}
                    onChange={update("email")}
                  />
                </Field>
              )}

              {!isSignIn && step === 1 && (
                <>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <Field label="First name">
                      <input
                        className={inputClass}
                        required
                        placeholder="Amina"
                        value={values.firstName}
                        onChange={update("firstName")}
                      />
                    </Field>
                    <Field label="Last name">
                      <input
                        className={inputClass}
                        required
                        placeholder="Moyo"
                        value={values.lastName}
                        onChange={update("lastName")}
                      />
                    </Field>
                  </div>
                  <Field label="Username">
                    <input
                      className={inputClass}
                      required
                      placeholder="amina.moyo"
                      value={values.username}
                      onChange={update("username")}
                    />
                  </Field>
                  <Field label="Email address">
                    <input
                      className={inputClass}
                      type="email"
                      required
                      placeholder="you@example.com"
                      value={values.email}
                      onChange={update("email")}
                    />
                  </Field>
                </>
              )}

              {(isSignIn || (!isSignIn && step === 1)) && (
                <Field label="Password">
                  <div className="relative">
                    <input
                      className={`${inputClass} pr-11`}
                      type={showPassword ? "text" : "password"}
                      required
                      minLength={8}
                      placeholder="At least 8 characters"
                      value={values.password}
                      onChange={update("password")}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword((c) => !c)}
                      className="absolute right-2 top-1/2 grid h-8 w-8 -translate-y-1/2 place-items-center rounded-lg text-gray-400 hover:bg-gray-100"
                      aria-label={showPassword ? "Hide password" : "Show password"}
                    >
                      {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                </Field>
              )}

              {!isSignIn && step === 1 && (
                <Field label="Confirm password">
                  <input
                    className={inputClass}
                    type="password"
                    required
                    minLength={8}
                    placeholder="Repeat your password"
                    value={values.confirm}
                    onChange={update("confirm")}
                  />
                </Field>
              )}

              {!isSignIn && step === 2 && (
                <>
                  <Field label="Country">
                    <div className="relative">
                      <button
                        type="button"
                        onClick={() => setCountryOpen((c) => !c)}
                        className={`${inputClass} flex items-center justify-between text-left`}
                      >
                        <span>
                          {selectedCountry[1]} {selectedCountry[0]}{" "}
                          <span className="ml-1 text-gray-500">
                            {selectedCountry[2]}
                          </span>
                        </span>
                        <ChevronDown size={17} className="text-gray-400" />
                      </button>
                      {countryOpen && (
                        <div className="absolute left-0 right-0 top-[calc(100%+.4rem)] z-20 overflow-hidden rounded-lg border border-gray-200 bg-white p-2 shadow-lg">
                          <div className="flex items-center gap-2 border-b border-gray-100 px-2 pb-2">
                            <Search size={15} className="text-gray-400" />
                            <input
                              autoFocus
                              className="h-9 min-w-0 flex-1 text-sm outline-none"
                              placeholder="Search country or code"
                              value={countrySearch}
                              onChange={(e) => setCountrySearch(e.target.value)}
                            />
                          </div>
                          <div className="mt-1 max-h-52 overflow-auto scroll-thin">
                            {filteredCountries.map(([name, flag, code]) => (
                              <button
                                type="button"
                                key={`${name}-${code}`}
                                onClick={() => {
                                  setSelectedCountry([name, flag, code]);
                                  setCountryOpen(false);
                                  setCountrySearch("");
                                }}
                                className="flex w-full items-center justify-between rounded-lg px-2 py-2 text-left text-sm hover:bg-gray-50"
                              >
                                <span>
                                  {flag} {name}
                                </span>
                                <span className="text-xs font-medium text-gray-400">
                                  {code}
                                </span>
                              </button>
                            ))}
                            {filteredCountries.length === 0 && (
                              <p className="px-2 py-3 text-xs text-gray-400">
                                No matching country found.
                              </p>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  </Field>
                  <Field
                    label="Phone number"
                    hint="Enter a valid number without the country code."
                  >
                    <div className="flex gap-2">
                      <div className="grid h-11 min-w-[72px] place-items-center rounded-lg border border-gray-200 bg-gray-50 px-2 text-sm font-semibold text-gray-600">
                        {selectedCountry[2]}
                      </div>
                      <input
                        className={`${inputClass} flex-1`}
                        type="tel"
                        required
                        placeholder="77 123 4567"
                        value={values.phone}
                        onChange={update("phone")}
                      />
                    </div>
                  </Field>
                  <Field label="Referral code" hint="Optional">
                    <input
                      className={inputClass}
                      placeholder="If someone invited you"
                      value={values.referral}
                      onChange={update("referral")}
                    />
                  </Field>
                  <label className="flex items-start gap-3 rounded-lg border border-gray-200 bg-gray-50 p-3.5">
                    <input
                      type="checkbox"
                      required
                      className="mt-0.5 h-4 w-4 accent-blue-700"
                    />
                    <span className="text-xs leading-5 text-gray-500">
                      I agree to the{" "}
                      <Link
                        href="/legal/terms"
                        className="font-medium text-blue-700"
                      >
                        Terms
                      </Link>{" "}
                      and understand that earnings are not guaranteed.
                    </span>
                  </label>
                </>
              )}

              {isSignIn && (
                <div className="flex items-center justify-between text-xs">
                  <label className="flex items-center gap-2 text-gray-500">
                    <input
                      type="checkbox"
                      className="h-4 w-4 accent-blue-700"
                    />{" "}
                    Remember me
                  </label>
                  <button
                    type="button"
                    className="font-medium text-blue-700"
                    onClick={() =>
                      alert("Password reset flow will be connected to the auth provider.")
                    }
                  >
                    Forgot password?
                  </button>
                </div>
              )}

              <button
                type="submit"
                className="pressable mt-2 inline-flex h-11 items-center justify-center gap-2 rounded-lg bg-blue-700 px-4 text-sm font-semibold text-white transition hover:bg-blue-800"
              >
                {isSignIn ? "Sign in" : step === 1 ? "Continue" : "Create account"}
                <ArrowRight size={16} />
              </button>
            </form>

            <p className="mt-7 text-center text-sm text-gray-500">
              {isSignIn ? "New to Skill2Earn HUB?" : "Already have an account?"}{" "}
              <Link
                href={isSignIn ? "/auth/signup" : "/auth/signin"}
                className="font-semibold text-blue-700"
              >
                {isSignIn ? "Create an account" : "Sign in"}
              </Link>
            </p>
          </div>
        </main>
      </div>
    </div>
  );
}
