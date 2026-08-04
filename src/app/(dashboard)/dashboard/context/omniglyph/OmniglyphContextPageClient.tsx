"use client";

// OmniglyphContextPageClient — the dedicated detail screen for the "omniglyph"
// context-as-image compression engine. Four sections: economics (measured savings),
// a real before→after (dense text vs the rendered PNG page), the fail-closed gate
// flow, and the enable control (wired to /api/settings/compression, preview engine).
//
// The sample in ./sampleData.ts is a REAL render from the omniglyph package, not a mockup.
//
// Card/Toggle are imported from their direct module paths (not the @/shared/components
// barrel) — the barrel pulls a Node-only module that hangs vitest/jsdom.
import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import Card from "@/shared/components/Card";
import Toggle from "@/shared/components/Toggle";
import { SAMPLE_BEFORE_TEXT, SAMPLE_PAGE_PNG_DATA_URI, SAMPLE_METRICS } from "./sampleData";

interface CompressionConfigLite {
  engines?: Record<string, { enabled: boolean; level?: string }>;
}

type EngineMap = Record<string, { enabled: boolean; level?: string }>;

/** The measured fail-closed gate chain, in evaluation order. Every no-op is telemetered
 *  as `skip:<reason>`; the engine only fires when all pass. */
const GATES = [
  {
    id: "model",
  },
  {
    id: "transport",
  },
  {
    id: "format",
  },
  {
    id: "profitable",
  },
] as const;

const ECONOMICS = [
  { value: "~10×", id: "fewerTokens" },
  { value: "59–70%", id: "savings" },
  { value: "1456", id: "imageTokens" },
  { value: "100%", id: "accuracy" },
] as const;

// Section components are split out of the page component so each function stays
// under the complexity gate's 80-line cap; the page composes them.

function PageHeader() {
  const t = useTranslations("omniglyph");
  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center gap-3">
        <h1 className="text-2xl font-semibold">OmniGlyph</h1>
        <span className="rounded-full border border-amber-500/40 bg-amber-500/10 px-2 py-0.5 text-xs font-medium text-amber-600 dark:text-amber-400">
          {t("preview")}
        </span>
      </div>
      <p className="max-w-2xl text-sm text-text-muted">{t("description")}</p>
    </div>
  );
}

function EconomicsCard() {
  const t = useTranslations("omniglyph");
  return (
    <Card className="p-6">
      <h2 className="mb-4 text-lg font-semibold">{t("economicsTitle")}</h2>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        {ECONOMICS.map((e) => (
          <div key={e.id} className="flex flex-col gap-1">
            <span className="text-2xl font-semibold tabular-nums">{e.value}</span>
            <span className="text-xs text-text-muted">{t(`economics.${e.id}`)}</span>
          </div>
        ))}
      </div>
    </Card>
  );
}

function BeforeAfterCard() {
  const t = useTranslations("omniglyph");
  return (
    <Card className="p-6">
      <div className="mb-1 flex items-baseline justify-between">
        <h2 className="text-lg font-semibold">{t("beforeAfterTitle")}</h2>
        <span className="text-sm font-medium text-emerald-600 dark:text-emerald-400">
          {t("blockSavings", { percent: SAMPLE_METRICS.savingsPct })}
        </span>
      </div>
      <p className="mb-4 text-xs text-text-muted">
        {t("realRender", { characters: SAMPLE_METRICS.beforeChars })}
      </p>
      <div className="grid gap-4 md:grid-cols-2">
        <div className="flex flex-col gap-2">
          <span className="text-xs font-medium uppercase tracking-wide text-text-muted">
            {t("textTokens", { tokens: SAMPLE_METRICS.textTokens })}
          </span>
          <pre className="max-h-60 overflow-auto rounded border border-black/10 bg-black/5 p-3 text-[11px] leading-relaxed dark:border-white/10 dark:bg-white/5">
            {SAMPLE_BEFORE_TEXT}
          </pre>
        </div>
        <div className="flex flex-col gap-2">
          <span className="text-xs font-medium uppercase tracking-wide text-text-muted">
            {t("renderedTokens", { tokens: SAMPLE_METRICS.imageTokens })}
          </span>
          <div className="overflow-auto rounded border border-black/10 bg-white p-3 dark:border-white/10">
            {/* eslint-disable-next-line @next/next/no-img-element -- data URI, no loader needed */}
            <img
              src={SAMPLE_PAGE_PNG_DATA_URI}
              alt={t("renderedImageAlt", {
                width: SAMPLE_METRICS.pageWidth,
                height: SAMPLE_METRICS.pageHeight,
              })}
              width={SAMPLE_METRICS.pageWidth}
              height={SAMPLE_METRICS.pageHeight}
              className="max-w-full"
            />
          </div>
        </div>
      </div>
    </Card>
  );
}

function GatesCard() {
  const t = useTranslations("omniglyph");
  return (
    <Card className="p-6">
      <h2 className="mb-1 text-lg font-semibold">{t("gatesTitle")}</h2>
      <p className="mb-4 text-xs text-text-muted">
        {t.rich("gatesDescription", {
          code: (chunks) => <code>{chunks}</code>,
        })}
      </p>
      <ol className="flex flex-col gap-3">
        {GATES.map((g, i) => (
          <li key={g.id} className="flex gap-3">
            <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-black/5 text-xs font-semibold tabular-nums dark:bg-white/10">
              {i + 1}
            </span>
            <div className="flex flex-col">
              <span className="text-sm font-medium">
                {t(`gates.${g.id}.label`)} —{" "}
                <span className="text-emerald-600 dark:text-emerald-400">
                  {t(`gates.${g.id}.pass`)}
                </span>
              </span>
              <span className="text-xs text-text-muted">{t(`gates.${g.id}.why`)}</span>
            </div>
          </li>
        ))}
      </ol>
    </Card>
  );
}

function EnableCard(props: {
  enabled: boolean;
  disabled: boolean;
  status: "" | "saved" | "error";
  onToggle: (next: boolean) => void;
}) {
  const t = useTranslations("omniglyph");
  return (
    <Card className="p-6">
      <div className="flex items-start justify-between gap-4">
        <div className="flex flex-col gap-1">
          <h2 className="text-lg font-semibold">{t("enableTitle")}</h2>
          <p className="max-w-xl text-sm text-text-muted">
            {t.rich("enableDescription", {
              code: (chunks) => <code>{chunks}</code>,
            })}
          </p>
          <span className="mt-1 h-4 text-xs text-text-muted" aria-live="polite">
            {props.status === "saved"
              ? t("saved")
              : props.status === "error"
                ? t("saveFailed")
                : ""}
          </span>
        </div>
        <span data-testid="omniglyph-enable-toggle">
          <Toggle
            size="md"
            checked={props.enabled}
            onChange={props.onToggle}
            disabled={props.disabled}
            ariaLabel={t("enableAria")}
          />
        </span>
      </div>
    </Card>
  );
}

export default function OmniglyphContextPageClient() {
  const [engines, setEngines] = useState<EngineMap>({});
  const [enabled, setEnabled] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [status, setStatus] = useState<"" | "saved" | "error">("");

  useEffect(() => {
    fetch("/api/settings/compression")
      .then((r) => (r.ok ? r.json() : null))
      .then((data: CompressionConfigLite | null) => {
        const e = data?.engines ?? {};
        setEngines(e);
        setEnabled(e.omniglyph?.enabled === true);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  // Persist the FULL engines map (the store keeps it as one JSON row — a partial patch
  // of a single engine would drop the others). Mirrors CompressionPanel.setEngine.
  const toggle = async (next: boolean) => {
    setEnabled(next);
    const nextEngines: EngineMap = {
      ...engines,
      omniglyph: { ...(engines.omniglyph ?? { enabled: false }), enabled: next },
    };
    setEngines(nextEngines);
    setSaving(true);
    setStatus("");
    try {
      const res = await fetch("/api/settings/compression", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ engines: nextEngines }),
      });
      if (res.ok) {
        setStatus("saved");
        setTimeout(() => setStatus(""), 2000);
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="mx-auto flex max-w-4xl flex-col gap-6 p-6" data-testid="omniglyph-page">
      <PageHeader />
      <EconomicsCard />
      <BeforeAfterCard />
      <GatesCard />
      <EnableCard
        enabled={enabled}
        disabled={loading || saving}
        status={status}
        onToggle={toggle}
      />
    </div>
  );
}
