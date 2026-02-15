import Link from "next/link";

export const metadata = {
  title: "Privacy Policy | OmniRoute",
  description: "Privacy policy for the OmniRoute AI API proxy router.",
};

export default function PrivacyPage() {
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

        <h1 className="text-3xl font-bold mb-2">Privacy Policy</h1>
        <p className="text-sm text-text-muted mb-10">Last updated: February 13, 2026</p>

        <div className="space-y-8 text-text-muted leading-relaxed">
          <section>
            <h2 className="text-lg font-semibold text-text-main mb-3">
              1. Local-First Architecture
            </h2>
            <p>
              OmniRoute is designed as a <strong className="text-text-main">local-first</strong>{" "}
              application. All data processing and storage occurs entirely on your machine. There is
              no centralized server collecting your information.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-text-main mb-3">2. Data We Store</h2>
            <p className="mb-3">
              The following data is stored locally in{" "}
              <code className="text-primary text-sm">~/.omniroute/storage.sqlite</code>:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                <strong className="text-text-main">Provider configurations</strong> — connection
                URLs, provider types, and priority settings
              </li>
              <li>
                <strong className="text-text-main">API keys</strong> — encrypted and stored locally
                for authenticating with AI providers
              </li>
              <li>
                <strong className="text-text-main">Usage logs</strong> — request counts, token
                usage, model names, timestamps, and response times
              </li>
              <li>
                <strong className="text-text-main">Application settings</strong> — theme
                preferences, routing strategy, and combo configurations
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-text-main mb-3">3. No Telemetry</h2>
            <p>
              OmniRoute does <strong className="text-text-main">not</strong> collect telemetry,
              analytics, or crash reports. No data is sent to us or any third party. Your usage
              patterns, API calls, and configurations remain entirely private.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-text-main mb-3">
              4. Third-Party AI Providers
            </h2>
            <p>
              When you make API calls through OmniRoute, your requests are forwarded to the AI
              providers you have configured (e.g., OpenAI, Anthropic, Google). These providers have
              their own privacy policies that govern how they handle your data. Please review:
            </p>
            <ul className="list-disc pl-6 space-y-2 mt-3">
              <li>
                <a
                  href="https://openai.com/policies/privacy-policy"
                  className="text-primary hover:underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  OpenAI Privacy Policy
                </a>
              </li>
              <li>
                <a
                  href="https://www.anthropic.com/privacy"
                  className="text-primary hover:underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Anthropic Privacy Policy
                </a>
              </li>
              <li>
                <a
                  href="https://policies.google.com/privacy"
                  className="text-primary hover:underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Google Privacy Policy
                </a>
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-text-main mb-3">5. Cloud Sync (Optional)</h2>
            <p>
              If you enable the optional cloud sync feature, provider configurations and API keys
              may be transmitted to a configured cloud endpoint. This feature is{" "}
              <strong className="text-text-main">disabled by default</strong> and requires explicit
              opt-in.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-text-main mb-3">6. Logging</h2>
            <p>Request logs can be configured through the dashboard settings. You can:</p>
            <ul className="list-disc pl-6 space-y-2 mt-3">
              <li>View and export usage analytics</li>
              <li>Clear usage history at any time</li>
              <li>Configure log retention policies</li>
              <li>Back up and restore your database</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-text-main mb-3">7. Your Rights</h2>
            <p>
              Since all data is stored locally, you have full control. You can delete your data at
              any time by removing the <code className="text-primary text-sm">~/.omniroute/</code>{" "}
              directory or using the database backup/restore features in the dashboard.
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
