import { ArrowLeft, FileText, ShieldCheck } from "lucide-react";
import { Link, useRoute } from "wouter";

const content: Record<
  string,
  { title: string; eyebrow: string; intro: string; sections: [string, string][] }
> = {
  terms: {
    title: "Terms & Conditions",
    eyebrow: "Platform policies",
    intro:
      "These terms outline the intended use of Skill2Earn HUB as a training and opportunity-discovery platform.",
    sections: [
      [
        "Training and discovery",
        "Skill2Earn HUB provides educational content and links to external opportunities. Unless explicitly stated otherwise, Skill2Earn HUB is not the employer, recruiter, or payment provider for an external opportunity.",
      ],
      [
        "External platforms",
        "External platforms may require separate registration, identity checks, assessments, eligibility criteria, geographic availability, and acceptance of their own terms. Review those terms before applying.",
      ],
      [
        "Activation",
        "The planned activation fee is an access and account-review fee. Activation does not guarantee employment, tasks, income, earnings, returns, or acceptance by any third party.",
      ],
      [
        "Responsible use",
        "Users must provide accurate information, protect their credentials, and use the platform lawfully. The production version should replace this draft with reviewed legal language before launch.",
      ],
    ],
  },
  privacy: {
    title: "Privacy Policy",
    eyebrow: "Platform policies",
    intro:
      "This draft explains the categories of information the product is designed to handle.",
    sections: [
      [
        "Information we expect to collect",
        "Account identity, email, phone number, country, authentication identifiers, activation status, payment submission metadata, and opportunity application activity may be stored when the corresponding features are connected.",
      ],
      [
        "Why information is used",
        "Information supports account security, user experience, activation review, platform administration, and communication about account or opportunity status.",
      ],
      [
        "Security",
        "Passwords should be handled by a secure authentication provider and never stored in plain text. Admin controls and payment status changes must be protected by server-side role checks.",
      ],
      [
        "Your choices",
        "The final deployed policy should explain access, correction, deletion, retention, and contact procedures for the jurisdictions served.",
      ],
    ],
  },
  disclaimer: {
    title: "Earnings Disclaimer",
    eyebrow: "Trust & transparency",
    intro:
      "Skill2Earn HUB does not guarantee a specific daily, weekly, or monthly income.",
    sections: [
      [
        "No guaranteed earnings",
        "Any illustrative figure, including a $5–$10/day example, is only an example target and is not a promise, forecast, or expected result. Actual earnings depend on available work, eligibility, skill level, performance, task availability, and third-party platform policies.",
      ],
      [
        "No guaranteed employment",
        "Completing training, activating an account, or viewing an opportunity does not guarantee employment, a task, a client, acceptance, or payment.",
      ],
      [
        "Independent decisions",
        "Users should assess opportunity requirements, fees, privacy implications, geographic restrictions, and payment terms before applying or committing time.",
      ],
      [
        "External jobs disclaimer",
        "External links are provided for discovery. The external platform controls its application process, work availability, assessment, and payout decisions.",
      ],
    ],
  },
  payment: {
    title: "Payment Terms",
    eyebrow: "Platform policies",
    intro:
      "Payment flows must be configured with the final wallet, network, refund rules, and review process before launch.",
    sections: [
      [
        "Supported method",
        "The current interface placeholder is USDT on BEP20. Users should only send assets using the specified network. Sending assets through another network may result in permanent loss.",
      ],
      [
        "Verification",
        "A submitted transaction hash is not proof of payment by itself. Reviewers should validate the hash, destination, network, token, amount, transaction status, and confirmations.",
      ],
      [
        "Refund policy",
        "The final refund policy must be published by the platform owner and reviewed for the jurisdictions in which the platform operates.",
      ],
      [
        "Placeholder values",
        "The wallet address and QR code shown in the interface are placeholders and must be replaced with official values before any payment flow is enabled.",
      ],
    ],
  },
  refund: {
    title: "Refund Policy",
    eyebrow: "Platform policies",
    intro:
      "This draft gives the platform owner a clear surface for a final refund policy.",
    sections: [
      [
        "Before launch",
        "Refund eligibility, timelines, processing method, exceptions, and support contacts must be defined before the activation fee is accepted.",
      ],
      [
        "No automatic refund promise",
        "A transaction submission or verification outcome should not be represented as refundable until the final policy and review process are approved.",
      ],
      [
        "Contact",
        "Users should be given a clear support route for payment questions and should retain their transaction record and submission details.",
      ],
    ],
  },
  "external-jobs": {
    title: "External Jobs Disclaimer",
    eyebrow: "Trust & transparency",
    intro:
      "External opportunities are third-party listings, not employment offers from Skill2Earn HUB.",
    sections: [
      [
        "Who controls the opportunity",
        "The external platform or company controls registration, screening, assessments, task availability, work allocation, payment, and account decisions.",
      ],
      [
        "What users should review",
        "Check eligibility, country restrictions, identity requirements, privacy terms, task availability, payment policies, and any fees before applying.",
      ],
      [
        "How listings are presented",
        "External links should display the external opportunity label and only be published after admin review. No listing should imply an outcome that the third party has not promised.",
      ],
    ],
  },
  risk: {
    title: "Risk Disclosure",
    eyebrow: "Trust & transparency",
    intro:
      "Digital work can be variable and carries practical risks that should be understood before spending time or money.",
    sections: [
      [
        "Availability risk",
        "Opportunities and task volume can change without notice. A skill path does not create a guaranteed supply of work.",
      ],
      [
        "Eligibility risk",
        "A user may not qualify for a third-party platform due to country, age, language, identity, technical, or assessment requirements.",
      ],
      [
        "Payment and platform risk",
        "Third-party payout timing, policies, disputes, and account decisions are outside Skill2Earn HUB control. Never send assets over an unsupported network.",
      ],
    ],
  },
  contact: {
    title: "Contact & Support",
    eyebrow: "Platform policies",
    intro:
      "Use this surface for clear support ownership before the product goes live.",
    sections: [
      [
        "General support",
        "Contact details should be configured by the platform owner before launch. The current placeholder is hello@skill2earn.example.",
      ],
      [
        "Payment questions",
        "Include the account email, payment status, network, and transaction hash when requesting review. Never share passwords or private wallet keys.",
      ],
      [
        "Opportunity questions",
        "For external application decisions, contact the external platform directly. Skill2Earn HUB can explain how a listing is presented but cannot control a third party's process.",
      ],
    ],
  },
};

export default function Legal() {
  const [, params] = useRoute("/legal/:page");
  const page = content[params?.page || "disclaimer"] || content.disclaimer;
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="border-b border-gray-200 bg-white">
        <div className="mx-auto flex h-16 max-w-4xl items-center justify-between px-5 lg:px-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm font-medium text-gray-500 transition hover:text-blue-700"
          >
            <ArrowLeft size={16} /> Back to home
          </Link>
          <span className="hidden items-center gap-2 text-sm font-semibold text-gray-900 sm:flex">
            <ShieldCheck size={16} className="text-blue-700" /> Skill2Earn HUB
          </span>
        </div>
      </header>
      <main className="mx-auto max-w-3xl px-5 py-12 lg:px-8 lg:py-16">
        <div className="reveal">
          <span className="eyebrow">{page.eyebrow}</span>
          <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900">
            {page.title}
          </h1>
          <p className="mt-4 text-base leading-relaxed text-gray-600">
            {page.intro}
          </p>
        </div>
        <div className="mt-10 grid gap-5">
          {page.sections.map(([heading, text]) => (
            <section key={heading} className="safe-card soft-shadow p-6">
              <div className="flex items-start gap-4">
                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-blue-50 text-blue-700">
                  <FileText size={17} strokeWidth={1.75} />
                </span>
                <div>
                  <h2 className="text-base font-semibold text-gray-900">
                    {heading}
                  </h2>
                  <p className="mt-2 text-sm leading-relaxed text-gray-600">
                    {text}
                  </p>
                </div>
              </div>
            </section>
          ))}
        </div>
        <div className="mt-8 rounded-lg border border-amber-200 bg-amber-50 p-4 text-sm leading-relaxed text-amber-800">
          <strong className="font-semibold">Draft notice:</strong> These pages
          are product-ready draft surfaces and should be reviewed and finalized
          by qualified counsel before launch.
        </div>
      </main>
    </div>
  );
}
