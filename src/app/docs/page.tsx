import Link from "next/link";
import { APP_CONFIG } from "@/shared/constants/config";
import { FREE_PROVIDERS, OAUTH_PROVIDERS, APIKEY_PROVIDERS } from "@/shared/constants/providers";

const endpointRows = [
  {
    path: "/v1/chat/completions",
    method: "POST",
    note: "OpenAI-compatible chat endpoint (default).",
  },
  { path: "/v1/responses", method: "POST", note: "Responses API endpoint (Codex, o-series)." },
  { path: "/v1/models", method: "GET", note: "Model catalog for all connected providers." },
  {
    path: "/v1/audio/transcriptions",
    method: "POST",
    note: "Audio transcription (Deepgram, AssemblyAI).",
  },
  { path: "/v1/images/generations", method: "POST", note: "Image generation (NanoBanana)." },
  { path: "/chat/completions", method: "POST", note: "Rewrite helper for clients without /v1." },
  { path: "/responses", method: "POST", note: "Rewrite helper for Responses without /v1." },
  { path: "/models", method: "GET", note: "Rewrite helper for model discovery without /v1." },
];

const featureItems = [
  {
    icon: "hub",
    title: "Multi-Provider Routing",
    text: "Route requests to 30+ AI providers through a single OpenAI-compatible endpoint. Supports chat, responses, audio, and image APIs.",
  },
  {
    icon: "layers",
    title: "Combos & Balancing",
    text: "Create model combos with fallback chains and balancing strategies: round-robin, priority, random, least-used, and cost-optimized.",
  },
  {
    icon: "bar_chart",
    title: "Usage & Cost Tracking",
    text: "Real-time token counting, cost calculation per provider/model, and detailed usage breakdown by API key and account.",
  },
  {
    icon: "analytics",
    title: "Analytics Dashboard",
    text: "Visual analytics with charts for requests, tokens, errors, latency, costs, and model popularity over time.",
  },
  {
    icon: "health_and_safety",
    title: "Health Monitoring",
    text: "Live health checks, provider status, circuit breaker states, and automatic rate limit detection with exponential backoff.",
  },
  {
    icon: "terminal",
    title: "CLI Tools",
    text: "Manage IDE configurations, export/import backups, discover codex profiles, and configure settings from the dashboard.",
  },
  {
    icon: "shield",
    title: "Security & Policies",
    text: "API key authentication, IP filtering, prompt injection guard, domain policies, session management, and audit logging.",
  },
  {
    icon: "cloud_sync",
    title: "Cloud Sync",
    text: "Sync your configuration to Cloudflare Workers for remote access with encrypted credentials and automatic failover.",
  },
];

const useCases = [
  {
    title: "Single endpoint for many providers",
    text: "Point clients to one base URL and route by model prefix (for example: gh/, cc/, kr/, openai/).",
  },
  {
    title: "Fallback and model switching with combos",
    text: "Create combo models in Dashboard and keep client config stable while providers rotate internally.",
  },
  {
    title: "Usage, cost and debug visibility",
    text: "Track tokens/cost by provider, account and API key in Usage + Analytics tabs.",
  },
];

const troubleshootingItems = [
  "If the client fails with model routing, use explicit provider/model (for example: gh/gpt-5.1-codex).",
  "If you receive ambiguous model errors, pick a provider prefix instead of a bare model ID.",
  "For GitHub Codex-family models, keep model as gh/<codex-model>; router selects /responses automatically.",
  "Use Dashboard > Providers > Test Connection before testing from IDEs or external clients.",
  "If a provider shows circuit breaker open, wait for the cooldown or check Health page for details.",
  "For OAuth providers, re-authenticate if tokens expire. Check the provider card status indicator.",
];

function ProviderTable({ title, providers, colorDot }) {
  const entries = Object.values(providers);
  return (
    <div className="rounded-lg border border-border bg-bg p-4">
      <div className="flex items-center gap-2 mb-3">
        <span className={`size-2.5 rounded-full ${colorDot}`} />
        <h3 className="font-semibold">{title}</h3>
        <span className="text-xs text-text-muted ml-auto">{entries.length} providers</span>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-1 text-sm">
        {entries.map((p) => (
          <div
            key={p.id}
            className="flex items-center justify-between py-1.5 border-b border-border/40 last:border-0"
          >
            <span className="font-medium">{p.name}</span>
            <code className="text-xs text-text-muted px-1.5 py-0.5 rounded bg-bg-subtle">
              {p.alias}/
            </code>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function DocsPage() {
  return (
    <div className="min-h-screen bg-bg text-text-main">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-10 md:py-14 flex flex-col gap-8">
        <header className="rounded-2xl border border-border bg-bg-subtle p-6 md:p-8">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-xs uppercase tracking-wider text-text-muted">
                Documentation — v{APP_CONFIG.version}
              </p>
              <h1 className="text-3xl md:text-4xl font-bold mt-1">{APP_CONFIG.name} Docs</h1>
              <p className="text-sm md:text-base text-text-muted mt-2 max-w-3xl">
                AI gateway for multi-provider LLMs. One endpoint for OpenAI, Anthropic, Gemini,
                GitHub Copilot, Claude Code, Cursor, and 20+ more providers.
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              <Link
                href="/dashboard"
                className="px-3 py-2 rounded-lg border border-border text-sm hover:bg-bg transition-colors"
              >
                Open Dashboard
              </Link>
              <Link
                href="/dashboard/endpoint"
                className="px-3 py-2 rounded-lg border border-border text-sm hover:bg-bg transition-colors"
              >
                Endpoint Page
              </Link>
              <a
                href="https://github.com/diegosouzapw/OmniRoute"
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-2 rounded-lg border border-border text-sm hover:bg-bg transition-colors flex items-center gap-1"
              >
                GitHub <span className="material-symbols-outlined text-[14px]">open_in_new</span>
              </a>
              <a
                href="https://github.com/diegosouzapw/OmniRoute/issues"
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-2 rounded-lg border border-border text-sm hover:bg-bg transition-colors"
              >
                Report Issue
              </a>
            </div>
          </div>
        </header>

        {/* Table of Contents */}
        <nav className="rounded-2xl border border-border bg-bg-subtle p-6">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-text-muted mb-3">
            On this page
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-sm">
            {[
              { href: "#quick-start", label: "Quick Start" },
              { href: "#features", label: "Features" },
              { href: "#supported-providers", label: "Providers" },
              { href: "#use-cases", label: "Use Cases" },
              { href: "#client-compatibility", label: "Client Compatibility" },
              { href: "#api-reference", label: "API Reference" },
              { href: "#model-prefixes", label: "Model Prefixes" },
              { href: "#troubleshooting", label: "Troubleshooting" },
            ].map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="flex items-center gap-1.5 px-3 py-2 rounded-lg border border-border hover:bg-bg transition-colors"
              >
                <span className="material-symbols-outlined text-[14px] text-text-muted">tag</span>
                {item.label}
              </a>
            ))}
          </div>
        </nav>

        <section id="quick-start" className="rounded-2xl border border-border bg-bg-subtle p-6">
          <h2 className="text-xl font-semibold">Quick Start</h2>
          <ol className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
            <li className="rounded-lg border border-border p-3 bg-bg">
              <span className="font-semibold">1. Install & run</span>
              <p className="text-text-muted mt-1">
                <code className="px-1 rounded bg-bg-subtle">npx omniroute</code> or clone from
                GitHub and run <code className="px-1 rounded bg-bg-subtle">npm start</code>.
              </p>
            </li>
            <li className="rounded-lg border border-border p-3 bg-bg">
              <span className="font-semibold">2. Create API key</span>
              <p className="text-text-muted mt-1">
                Go to Settings → API Keys. Generate one key per environment.
              </p>
            </li>
            <li className="rounded-lg border border-border p-3 bg-bg">
              <span className="font-semibold">3. Connect providers</span>
              <p className="text-text-muted mt-1">
                Add provider accounts via OAuth login, API key, or free-tier auto-connect.
              </p>
            </li>
            <li className="rounded-lg border border-border p-3 bg-bg">
              <span className="font-semibold">4. Set client base URL</span>
              <p className="text-text-muted mt-1">
                Point your IDE or API client to{" "}
                <code className="px-1 rounded bg-bg-subtle">https://&lt;host&gt;/v1</code>. Use
                provider prefix, e.g.{" "}
                <code className="px-1 rounded bg-bg-subtle">gh/gpt-5.1-codex</code>.
              </p>
            </li>
          </ol>
        </section>

        {/* Features */}
        <section id="features" className="rounded-2xl border border-border bg-bg-subtle p-6">
          <h2 className="text-xl font-semibold">Features</h2>
          <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-3">
            {featureItems.map((item) => (
              <article
                key={item.title}
                className="rounded-lg border border-border p-4 bg-bg flex gap-3"
              >
                <span className="material-symbols-outlined text-[20px] text-primary shrink-0 mt-0.5">
                  {item.icon}
                </span>
                <div>
                  <h3 className="font-semibold text-sm">{item.title}</h3>
                  <p className="text-sm text-text-muted mt-1">{item.text}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* Supported Providers */}
        <section
          id="supported-providers"
          className="rounded-2xl border border-border bg-bg-subtle p-6"
        >
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-xl font-semibold">Supported Providers</h2>
              <p className="text-sm text-text-muted mt-1">
                {Object.keys(FREE_PROVIDERS).length +
                  Object.keys(OAUTH_PROVIDERS).length +
                  Object.keys(APIKEY_PROVIDERS).length}{" "}
                providers across three connection types.
              </p>
            </div>
            <Link
              href="/dashboard/providers"
              className="px-3 py-2 rounded-lg border border-border text-sm hover:bg-bg transition-colors"
            >
              Manage Providers
            </Link>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
            <ProviderTable title="Free Tier" providers={FREE_PROVIDERS} colorDot="bg-green-500" />
            <ProviderTable title="OAuth" providers={OAUTH_PROVIDERS} colorDot="bg-blue-500" />
            <ProviderTable title="API Key" providers={APIKEY_PROVIDERS} colorDot="bg-amber-500" />
          </div>
        </section>

        <section id="use-cases" className="rounded-2xl border border-border bg-bg-subtle p-6">
          <h2 className="text-xl font-semibold">Common Use Cases</h2>
          <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-3">
            {useCases.map((item) => (
              <article key={item.title} className="rounded-lg border border-border p-4 bg-bg">
                <h3 className="font-semibold">{item.title}</h3>
                <p className="text-sm text-text-muted mt-2">{item.text}</p>
              </article>
            ))}
          </div>
        </section>

        <section
          id="client-compatibility"
          className="rounded-2xl border border-border bg-bg-subtle p-6"
        >
          <h2 className="text-xl font-semibold">Client Compatibility</h2>
          <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
            <article className="rounded-lg border border-border p-4 bg-bg">
              <h3 className="font-semibold">Cherry Studio</h3>
              <ul className="mt-2 text-text-muted space-y-1">
                <li>
                  Base URL:{" "}
                  <code className="px-1 rounded bg-bg-subtle">https://&lt;host&gt;/v1</code>
                </li>
                <li>
                  Chat endpoint:{" "}
                  <code className="px-1 rounded bg-bg-subtle">/chat/completions</code>
                </li>
                <li>
                  Model recommendation: explicit prefix (
                  <code className="px-1 rounded bg-bg-subtle">gh/...</code>,{" "}
                  <code className="px-1 rounded bg-bg-subtle">cc/...</code>)
                </li>
              </ul>
            </article>
            <article className="rounded-lg border border-border p-4 bg-bg">
              <h3 className="font-semibold">Codex / GitHub Copilot Models</h3>
              <ul className="mt-2 text-text-muted space-y-1">
                <li>
                  Use model IDs with <code className="px-1 rounded bg-bg-subtle">gh/</code> prefix.
                </li>
                <li>
                  Codex-family models auto-route to{" "}
                  <code className="px-1 rounded bg-bg-subtle">/responses</code>.
                </li>
                <li>
                  Non-Codex models continue on{" "}
                  <code className="px-1 rounded bg-bg-subtle">/chat/completions</code>.
                </li>
              </ul>
            </article>
            <article className="rounded-lg border border-border p-4 bg-bg">
              <h3 className="font-semibold">Cursor IDE</h3>
              <ul className="mt-2 text-text-muted space-y-1">
                <li>
                  Use <code className="px-1 rounded bg-bg-subtle">cu/</code> prefix for Cursor
                  models.
                </li>
                <li>OAuth connection — login from the Providers page.</li>
                <li>Supports both chat and responses endpoints.</li>
              </ul>
            </article>
            <article className="rounded-lg border border-border p-4 bg-bg">
              <h3 className="font-semibold">Claude Code / Antigravity</h3>
              <ul className="mt-2 text-text-muted space-y-1">
                <li>
                  Use <code className="px-1 rounded bg-bg-subtle">cc/</code> (Claude) or{" "}
                  <code className="px-1 rounded bg-bg-subtle">ag/</code> (Antigravity) prefix.
                </li>
                <li>OAuth connection with automatic token refresh.</li>
                <li>Full streaming support for all models.</li>
              </ul>
            </article>
          </div>
        </section>

        <section id="api-reference" className="rounded-2xl border border-border bg-bg-subtle p-6">
          <h2 className="text-xl font-semibold">API Reference</h2>
          <div className="mt-4 overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-2 pr-4">Method</th>
                  <th className="text-left py-2 pr-4">Path</th>
                  <th className="text-left py-2">Notes</th>
                </tr>
              </thead>
              <tbody>
                {endpointRows.map((row) => (
                  <tr key={row.path} className="border-b border-border/60">
                    <td className="py-2 pr-4">
                      <code className="px-1.5 py-0.5 rounded bg-bg text-xs font-semibold">
                        {row.method}
                      </code>
                    </td>
                    <td className="py-2 pr-4 font-mono">{row.path}</td>
                    <td className="py-2 text-text-muted">{row.note}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Model prefixes */}
        <section id="model-prefixes" className="rounded-2xl border border-border bg-bg-subtle p-6">
          <h2 className="text-xl font-semibold">Model Prefixes</h2>
          <p className="text-sm text-text-muted mt-2 mb-4">
            Use the provider prefix before the model name to route to a specific provider. Example:{" "}
            <code className="px-1 rounded bg-bg">gh/gpt-5.1-codex</code> routes to GitHub Copilot.
          </p>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-2 pr-4">Prefix</th>
                  <th className="text-left py-2 pr-4">Provider</th>
                  <th className="text-left py-2">Type</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ...Object.values(FREE_PROVIDERS).map((p) => ({ ...p, type: "Free" })),
                  ...Object.values(OAUTH_PROVIDERS).map((p) => ({ ...p, type: "OAuth" })),
                  ...Object.values(APIKEY_PROVIDERS).map((p) => ({ ...p, type: "API Key" })),
                ].map((p) => (
                  <tr key={p.id} className="border-b border-border/60">
                    <td className="py-2 pr-4 font-mono">
                      <code className="px-1.5 py-0.5 rounded bg-bg">{p.alias}/</code>
                    </td>
                    <td className="py-2 pr-4">{p.name}</td>
                    <td className="py-2">
                      <span
                        className={`inline-flex items-center gap-1 text-xs ${
                          p.type === "Free"
                            ? "text-green-500"
                            : p.type === "OAuth"
                              ? "text-blue-500"
                              : "text-amber-500"
                        }`}
                      >
                        <span
                          className={`size-1.5 rounded-full ${
                            p.type === "Free"
                              ? "bg-green-500"
                              : p.type === "OAuth"
                                ? "bg-blue-500"
                                : "bg-amber-500"
                          }`}
                        />
                        {p.type}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section id="troubleshooting" className="rounded-2xl border border-border bg-bg-subtle p-6">
          <h2 className="text-xl font-semibold">Troubleshooting</h2>
          <ul className="mt-4 list-disc list-inside text-sm text-text-muted space-y-2">
            {troubleshootingItems.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  );
}
