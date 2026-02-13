import Link from "next/link";
import { APP_CONFIG } from "@/shared/constants/config";

const endpointRows = [
  { path: "/v1/chat/completions", note: "OpenAI-compatible chat endpoint (default)." },
  { path: "/v1/responses", note: "Responses API endpoint (supported)." },
  { path: "/v1/models", note: "Model catalog for connected providers." },
  { path: "/chat/completions", note: "Rewrite helper for clients that do not include /v1." },
  { path: "/responses", note: "Rewrite helper for Responses clients without /v1." },
  { path: "/models", note: "Rewrite helper for model discovery without /v1." },
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
    text: "Track tokens/cost by provider, account and API key in Usage + Logger tabs.",
  },
];

const troubleshootingItems = [
  "If the client fails with model routing, use explicit provider/model (for example: gh/gpt-5.1-codex).",
  "If you receive ambiguous model errors, pick a provider prefix instead of a bare model ID.",
  "For GitHub Codex-family models, keep model as gh/<codex-model>; router selects /responses automatically.",
  "Use Dashboard > Providers > Test Connection before testing from IDEs or external clients.",
];

export default function DocsPage() {
  return (
    <div className="min-h-screen bg-bg text-text-main">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-10 md:py-14 flex flex-col gap-8">
        <header className="rounded-2xl border border-border bg-bg-subtle p-6 md:p-8">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-xs uppercase tracking-wider text-text-muted">
                In-App Documentation
              </p>
              <h1 className="text-3xl md:text-4xl font-bold mt-1">{APP_CONFIG.name} Docs</h1>
              <p className="text-sm md:text-base text-text-muted mt-2 max-w-3xl">
                Quick setup, client compatibility notes, and endpoint reference to run
                OpenAI-compatible clients, Codex/Copilot models, and Cherry Studio integrations on
                this server.
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              <Link
                href="/dashboard/endpoint"
                className="px-3 py-2 rounded-lg border border-border text-sm hover:bg-bg transition-colors"
              >
                Open Endpoint Page
              </Link>
              <a
                href="https://github.com/decolua/omniroute/issues"
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-2 rounded-lg border border-border text-sm hover:bg-bg transition-colors"
              >
                Report Issue
              </a>
            </div>
          </div>
        </header>

        <section id="quick-start" className="rounded-2xl border border-border bg-bg-subtle p-6">
          <h2 className="text-xl font-semibold">Quick Start</h2>
          <ol className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
            <li className="rounded-lg border border-border p-3 bg-bg">
              <span className="font-semibold">1. Create API key</span>
              <p className="text-text-muted mt-1">Generate one key per app/environment.</p>
            </li>
            <li className="rounded-lg border border-border p-3 bg-bg">
              <span className="font-semibold">2. Connect providers</span>
              <p className="text-text-muted mt-1">
                Add provider accounts in Dashboard and run Test Connection.
              </p>
            </li>
            <li className="rounded-lg border border-border p-3 bg-bg">
              <span className="font-semibold">3. Set client base URL</span>
              <p className="text-text-muted mt-1">
                Prefer <code className="px-1 rounded bg-bg-subtle">https://&lt;host&gt;/v1</code>.
              </p>
            </li>
            <li className="rounded-lg border border-border p-3 bg-bg">
              <span className="font-semibold">4. Choose model</span>
              <p className="text-text-muted mt-1">
                Prefer explicit provider prefix, for example{" "}
                <code className="px-1 rounded bg-bg-subtle">gh/gpt-5.1-codex</code>.
              </p>
            </li>
          </ol>
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
            <article id="cherry-studio" className="rounded-lg border border-border p-4 bg-bg">
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
            <article id="codex-copilot" className="rounded-lg border border-border p-4 bg-bg">
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
          </div>
        </section>

        <section id="api-reference" className="rounded-2xl border border-border bg-bg-subtle p-6">
          <h2 className="text-xl font-semibold">Endpoint Reference</h2>
          <div className="mt-4 overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-2 pr-4">Path</th>
                  <th className="text-left py-2">Notes</th>
                </tr>
              </thead>
              <tbody>
                {endpointRows.map((row) => (
                  <tr key={row.path} className="border-b border-border/60">
                    <td className="py-2 pr-4 font-mono">{row.path}</td>
                    <td className="py-2 text-text-muted">{row.note}</td>
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
