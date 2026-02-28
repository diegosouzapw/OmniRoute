import Link from "next/link";
import { useTranslations } from "next-intl";
import { APP_CONFIG } from "@/shared/constants/config";
import { FREE_PROVIDERS, OAUTH_PROVIDERS, APIKEY_PROVIDERS } from "@/shared/constants/providers";

const ENDPOINT_ROWS = [
  { path: "/v1/chat/completions", method: "POST", noteKey: "endpointChatNote" },
  { path: "/v1/responses", method: "POST", noteKey: "endpointResponsesNote" },
  { path: "/v1/models", method: "GET", noteKey: "endpointModelsNote" },
  { path: "/v1/audio/transcriptions", method: "POST", noteKey: "endpointAudioNote" },
  { path: "/v1/images/generations", method: "POST", noteKey: "endpointImagesNote" },
  { path: "/chat/completions", method: "POST", noteKey: "endpointRewriteChatNote" },
  { path: "/responses", method: "POST", noteKey: "endpointRewriteResponsesNote" },
  { path: "/models", method: "GET", noteKey: "endpointRewriteModelsNote" },
] as const;

const FEATURE_ITEMS = [
  { icon: "hub", titleKey: "featureRoutingTitle", textKey: "featureRoutingText" },
  { icon: "layers", titleKey: "featureCombosTitle", textKey: "featureCombosText" },
  { icon: "bar_chart", titleKey: "featureUsageTitle", textKey: "featureUsageText" },
  { icon: "analytics", titleKey: "featureAnalyticsTitle", textKey: "featureAnalyticsText" },
  { icon: "health_and_safety", titleKey: "featureHealthTitle", textKey: "featureHealthText" },
  { icon: "terminal", titleKey: "featureCliTitle", textKey: "featureCliText" },
  { icon: "shield", titleKey: "featureSecurityTitle", textKey: "featureSecurityText" },
  { icon: "cloud_sync", titleKey: "featureCloudSyncTitle", textKey: "featureCloudSyncText" },
] as const;

const USE_CASE_ITEMS = [
  { titleKey: "useCaseSingleEndpointTitle", textKey: "useCaseSingleEndpointText" },
  { titleKey: "useCaseFallbackTitle", textKey: "useCaseFallbackText" },
  { titleKey: "useCaseUsageVisibilityTitle", textKey: "useCaseUsageVisibilityText" },
] as const;

const TROUBLESHOOTING_KEYS = [
  "troubleshootingModelRouting",
  "troubleshootingAmbiguousModels",
  "troubleshootingCodexFamily",
  "troubleshootingTestConnection",
  "troubleshootingCircuitBreaker",
  "troubleshootingOAuth",
] as const;

const TOC_ITEMS = [
  { href: "#quick-start", labelKey: "quickStart" },
  { href: "#features", labelKey: "features" },
  { href: "#supported-providers", labelKey: "supportedProvidersToc" },
  { href: "#use-cases", labelKey: "commonUseCases" },
  { href: "#client-compatibility", labelKey: "clientCompatibility" },
  { href: "#api-reference", labelKey: "apiReference" },
  { href: "#model-prefixes", labelKey: "modelPrefixes" },
  { href: "#troubleshooting", labelKey: "troubleshooting" },
] as const;

function ProviderTable({
  title,
  providers,
  colorDot,
}: {
  title: string;
  providers: Record<string, any>;
  colorDot: string;
}) {
  const t = useTranslations("docs");
  const entries = Object.values(providers) as any[];

  return (
    <div className="rounded-lg border border-border bg-bg p-4">
      <div className="flex items-center gap-2 mb-3">
        <span className={`size-2.5 rounded-full ${colorDot}`} />
        <h3 className="font-semibold">{title}</h3>
        <span className="text-xs text-text-muted ml-auto">
          {t("providersCount", { count: entries.length })}
        </span>
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
  const t = useTranslations("docs");

  const totalProviders =
    Object.keys(FREE_PROVIDERS).length +
    Object.keys(OAUTH_PROVIDERS).length +
    Object.keys(APIKEY_PROVIDERS).length;

  const endpointRows = ENDPOINT_ROWS.map((row) => ({
    ...row,
    note: t(row.noteKey),
  }));

  const featureItems = FEATURE_ITEMS.map((item) => ({
    ...item,
    title: t(item.titleKey),
    text: t(item.textKey),
  }));

  const useCases = USE_CASE_ITEMS.map((item) => ({
    ...item,
    title: t(item.titleKey),
    text: t(item.textKey),
  }));

  const troubleshootingItems = TROUBLESHOOTING_KEYS.map((key) => t(key));
  const tocItems = TOC_ITEMS.map((item) => ({ ...item, label: t(item.labelKey) }));

  const providerPrefixRows = [
    ...Object.values(FREE_PROVIDERS).map((p) => ({ ...p, type: "free" as const })),
    ...Object.values(OAUTH_PROVIDERS).map((p) => ({ ...p, type: "oauth" as const })),
    ...Object.values(APIKEY_PROVIDERS).map((p) => ({ ...p, type: "apiKey" as const })),
  ];

  const getProviderTypeLabel = (type: "free" | "oauth" | "apiKey") => {
    if (type === "free") return t("providerTypeFree");
    if (type === "oauth") return t("providerTypeOAuth");
    return t("providerTypeApiKey");
  };

  return (
    <div className="min-h-screen bg-bg text-text-main">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-10 md:py-14 flex flex-col gap-8">
        <header className="rounded-2xl border border-border bg-bg-subtle p-6 md:p-8">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-xs uppercase tracking-wider text-text-muted">
                {t("documentationVersion", { version: APP_CONFIG.version })}
              </p>
              <h1 className="text-3xl md:text-4xl font-bold mt-1">
                {APP_CONFIG.name} {t("docsLabel")}
              </h1>
              <p className="text-sm md:text-base text-text-muted mt-2 max-w-3xl">
                {t("docsHeroDescription")}
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              <Link
                href="/dashboard"
                className="px-3 py-2 rounded-lg border border-border text-sm hover:bg-bg transition-colors"
              >
                {t("openDashboard")}
              </Link>
              <Link
                href="/dashboard/endpoint"
                className="px-3 py-2 rounded-lg border border-border text-sm hover:bg-bg transition-colors"
              >
                {t("endpointPage")}
              </Link>
              <a
                href="https://github.com/diegosouzapw/OmniRoute"
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-2 rounded-lg border border-border text-sm hover:bg-bg transition-colors flex items-center gap-1"
              >
                {t("github")}{" "}
                <span className="material-symbols-outlined text-[14px]">open_in_new</span>
              </a>
              <a
                href="https://github.com/diegosouzapw/OmniRoute/issues"
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-2 rounded-lg border border-border text-sm hover:bg-bg transition-colors"
              >
                {t("reportIssue")}
              </a>
            </div>
          </div>
        </header>

        <nav className="rounded-2xl border border-border bg-bg-subtle p-6">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-text-muted mb-3">
            {t("onThisPage")}
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-sm">
            {tocItems.map((item) => (
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
          <h2 className="text-xl font-semibold">{t("quickStart")}</h2>
          <ol className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
            <li className="rounded-lg border border-border p-3 bg-bg">
              <span className="font-semibold">{t("quickStartStep1Title")}</span>
              <p className="text-text-muted mt-1">
                {t("quickStartStep1Prefix")}{" "}
                <code className="px-1 rounded bg-bg-subtle">npx omniroute</code>{" "}
                {t("quickStartStep1Middle")}{" "}
                <code className="px-1 rounded bg-bg-subtle">npm start</code>.
              </p>
            </li>
            <li className="rounded-lg border border-border p-3 bg-bg">
              <span className="font-semibold">{t("quickStartStep2Title")}</span>
              <p className="text-text-muted mt-1">{t("quickStartStep2Text")}</p>
            </li>
            <li className="rounded-lg border border-border p-3 bg-bg">
              <span className="font-semibold">{t("quickStartStep3Title")}</span>
              <p className="text-text-muted mt-1">{t("quickStartStep3Text")}</p>
            </li>
            <li className="rounded-lg border border-border p-3 bg-bg">
              <span className="font-semibold">{t("quickStartStep4Title")}</span>
              <p className="text-text-muted mt-1">
                {t("quickStartStep4Prefix")}{" "}
                <code className="px-1 rounded bg-bg-subtle">https://&lt;host&gt;/v1</code>.{" "}
                {t("quickStartStep4Suffix")}{" "}
                <code className="px-1 rounded bg-bg-subtle">gh/gpt-5.1-codex</code>.
              </p>
            </li>
          </ol>
        </section>

        <section id="features" className="rounded-2xl border border-border bg-bg-subtle p-6">
          <h2 className="text-xl font-semibold">{t("features")}</h2>
          <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-3">
            {featureItems.map((item) => (
              <article
                key={item.titleKey}
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

        <section
          id="supported-providers"
          className="rounded-2xl border border-border bg-bg-subtle p-6"
        >
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-xl font-semibold">{t("supportedProviders")}</h2>
              <p className="text-sm text-text-muted mt-1">
                {t("providersAcrossConnectionTypes", { count: totalProviders })}
              </p>
            </div>
            <Link
              href="/dashboard/providers"
              className="px-3 py-2 rounded-lg border border-border text-sm hover:bg-bg transition-colors"
            >
              {t("manageProviders")}
            </Link>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
            <ProviderTable
              title={t("providerTypeFree")}
              providers={FREE_PROVIDERS}
              colorDot="bg-green-500"
            />
            <ProviderTable
              title={t("providerTypeOAuth")}
              providers={OAUTH_PROVIDERS}
              colorDot="bg-blue-500"
            />
            <ProviderTable
              title={t("providerTypeApiKey")}
              providers={APIKEY_PROVIDERS}
              colorDot="bg-amber-500"
            />
          </div>
        </section>

        <section id="use-cases" className="rounded-2xl border border-border bg-bg-subtle p-6">
          <h2 className="text-xl font-semibold">{t("commonUseCases")}</h2>
          <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-3">
            {useCases.map((item) => (
              <article key={item.titleKey} className="rounded-lg border border-border p-4 bg-bg">
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
          <h2 className="text-xl font-semibold">{t("clientCompatibility")}</h2>
          <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
            <article className="rounded-lg border border-border p-4 bg-bg">
              <h3 className="font-semibold">{t("clientCherryStudioTitle")}</h3>
              <ul className="mt-2 text-text-muted space-y-1">
                <li>
                  {t("baseUrlLabel")}:{" "}
                  <code className="px-1 rounded bg-bg-subtle">https://&lt;host&gt;/v1</code>
                </li>
                <li>
                  {t("chatEndpointLabel")}:{" "}
                  <code className="px-1 rounded bg-bg-subtle">/chat/completions</code>
                </li>
                <li>
                  {t("modelRecommendationLabel")} (
                  <code className="px-1 rounded bg-bg-subtle">gh/...</code>,{" "}
                  <code className="px-1 rounded bg-bg-subtle">cc/...</code>)
                </li>
              </ul>
            </article>
            <article className="rounded-lg border border-border p-4 bg-bg">
              <h3 className="font-semibold">{t("clientCodexTitle")}</h3>
              <ul className="mt-2 text-text-muted space-y-1">
                <li>
                  {t("clientCodexBullet1")} <code className="px-1 rounded bg-bg-subtle">gh/</code>.
                </li>
                <li>
                  {t("clientCodexBullet2")}{" "}
                  <code className="px-1 rounded bg-bg-subtle">/responses</code>.
                </li>
                <li>
                  {t("clientCodexBullet3")}{" "}
                  <code className="px-1 rounded bg-bg-subtle">/chat/completions</code>.
                </li>
              </ul>
            </article>
            <article className="rounded-lg border border-border p-4 bg-bg">
              <h3 className="font-semibold">{t("clientCursorTitle")}</h3>
              <ul className="mt-2 text-text-muted space-y-1">
                <li>
                  {t("clientCursorBullet1")} <code className="px-1 rounded bg-bg-subtle">cu/</code>{" "}
                  {t("clientCursorBullet1Suffix")}
                </li>
                <li>{t("clientCursorBullet2")}</li>
                <li>{t("supportsChat")}</li>
              </ul>
            </article>
            <article className="rounded-lg border border-border p-4 bg-bg">
              <h3 className="font-semibold">{t("clientClaudeTitle")}</h3>
              <ul className="mt-2 text-text-muted space-y-1">
                <li>
                  {t("clientClaudeBullet1Prefix")}{" "}
                  <code className="px-1 rounded bg-bg-subtle">cc/</code>{" "}
                  {t("clientClaudeBullet1Middle")}{" "}
                  <code className="px-1 rounded bg-bg-subtle">ag/</code>{" "}
                  {t("clientClaudeBullet1Suffix")}
                </li>
                <li>{t("oauthAutoRefresh")}</li>
                <li>{t("fullStreaming")}</li>
              </ul>
            </article>
          </div>
        </section>

        <section id="api-reference" className="rounded-2xl border border-border bg-bg-subtle p-6">
          <h2 className="text-xl font-semibold">{t("apiReference")}</h2>
          <div className="mt-4 overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-2 pr-4">{t("method")}</th>
                  <th className="text-left py-2 pr-4">{t("path")}</th>
                  <th className="text-left py-2">{t("notes")}</th>
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

        <section id="model-prefixes" className="rounded-2xl border border-border bg-bg-subtle p-6">
          <h2 className="text-xl font-semibold">{t("modelPrefixes")}</h2>
          <p className="text-sm text-text-muted mt-2 mb-4">
            {t("modelPrefixesDescriptionStart")}{" "}
            <code className="px-1 rounded bg-bg">gh/gpt-5.1-codex</code>{" "}
            {t("modelPrefixesDescriptionEnd")}
          </p>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-2 pr-4">{t("prefix")}</th>
                  <th className="text-left py-2 pr-4">{t("provider")}</th>
                  <th className="text-left py-2">{t("type")}</th>
                </tr>
              </thead>
              <tbody>
                {providerPrefixRows.map((p) => (
                  <tr key={p.id} className="border-b border-border/60">
                    <td className="py-2 pr-4 font-mono">
                      <code className="px-1.5 py-0.5 rounded bg-bg">{p.alias}/</code>
                    </td>
                    <td className="py-2 pr-4">{p.name}</td>
                    <td className="py-2">
                      <span
                        className={`inline-flex items-center gap-1 text-xs ${
                          p.type === "free"
                            ? "text-green-500"
                            : p.type === "oauth"
                              ? "text-blue-500"
                              : "text-amber-500"
                        }`}
                      >
                        <span
                          className={`size-1.5 rounded-full ${
                            p.type === "free"
                              ? "bg-green-500"
                              : p.type === "oauth"
                                ? "bg-blue-500"
                                : "bg-amber-500"
                          }`}
                        />
                        {getProviderTypeLabel(p.type)}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section id="troubleshooting" className="rounded-2xl border border-border bg-bg-subtle p-6">
          <h2 className="text-xl font-semibold">{t("troubleshooting")}</h2>
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
