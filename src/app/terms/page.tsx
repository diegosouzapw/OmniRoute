import Link from "next/link";

export const metadata = {
  title: "Terms of Service | OmniRoute",
  description: "Terms of service for the OmniRoute AI API proxy router.",
};

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-bg text-text-main">
      <div className="max-w-3xl mx-auto px-6 py-16">
        <Link
          href="/"
          className="inline-flex items-center gap-1 text-sm text-text-muted hover:text-primary transition-colors mb-8"
        >
          <span className="material-symbols-outlined text-[18px]">arrow_back</span>
          Back to home
        </Link>

        <h1 className="text-3xl font-bold mb-2">Terms of Service</h1>
        <p className="text-sm text-text-muted mb-10">Last updated: February 13, 2026</p>

        <div className="space-y-8 text-text-muted leading-relaxed">
          <section>
            <h2 className="text-lg font-semibold text-text-main mb-3">1. Overview</h2>
            <p>
              OmniRoute is a <strong className="text-text-main">local-first</strong> AI API proxy
              router that operates entirely on your machine. It routes requests to multiple AI
              providers with load balancing, failover, and usage tracking.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-text-main mb-3">2. User Responsibilities</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                You are solely responsible for managing your own API keys and credentials for
                third-party AI providers (OpenAI, Anthropic, Google, etc.).
              </li>
              <li>
                You must comply with the terms of service of each AI provider whose API you access
                through OmniRoute.
              </li>
              <li>
                You are responsible for the security of your local OmniRoute installation, including
                setting a password and restricting network access.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-text-main mb-3">3. How It Works</h2>
            <p>
              OmniRoute acts as an intermediary proxy. API calls sent to OmniRoute are translated
              and forwarded to your configured AI providers. OmniRoute does not modify the content
              of your requests or responses beyond the necessary protocol translation.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-text-main mb-3">4. Data Handling</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                All data is stored <strong className="text-text-main">locally</strong> on your
                machine in a SQLite database.
              </li>
              <li>
                OmniRoute does not transmit any data to external servers unless you explicitly
                enable cloud sync features.
              </li>
              <li>
                Usage logs, API keys, and configuration are stored in{" "}
                <code className="text-primary text-sm">~/.omniroute/</code>.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-text-main mb-3">5. Disclaimer</h2>
            <p>
              OmniRoute is provided &ldquo;as is&rdquo; without warranty of any kind. We are not
              responsible for any costs incurred through API usage, service disruptions, or data
              loss. Always maintain backups of your configuration.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-text-main mb-3">6. Open Source</h2>
            <p>
              OmniRoute is open-source software. You are free to inspect, modify, and distribute it
              under the terms of its license.
            </p>
          </section>
        </div>

        <div className="mt-12 pt-8 border-t border-white/[0.06] text-sm text-text-muted">
          <p>
            Questions? Visit our{" "}
            <a
              href="https://github.com/diegosouzapw/OmniRoute"
              className="text-primary hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub repository
            </a>
            .
          </p>
        </div>
      </div>
    </main>
  );
}
