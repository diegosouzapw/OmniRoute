"use client";

import Link from "next/link";
import { useTranslations } from "next-intl";

type CavemanIntensity = "lite" | "full" | "ultra";
type RtkIntensity = "minimal" | "standard" | "aggressive";

export interface CompressionTokenSaverConfig {
  enabled: boolean;
  cavemanConfig?: { enabled: boolean; intensity: CavemanIntensity };
  cavemanOutputMode?: { enabled: boolean; intensity: CavemanIntensity };
  rtkConfig?: { enabled: boolean; intensity: RtkIntensity };
}

export type CompressionTokenSaverPatch = Partial<CompressionTokenSaverConfig>;

// Read-only summary. The engine on/off + level toggles that used to live here moved to
// the single-source panel (/dashboard/context/settings). This card now only reflects the
// current state and links to the panel — it no longer writes anything (the `onSave` prop
// is accepted for backward compatibility but intentionally unused).
function StatusPill({ on }: { on: boolean }) {
  return (
    <span
      className={`rounded px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider ${
        on ? "bg-emerald-500/15 text-emerald-500" : "bg-border/50 text-text-muted"
      }`}
    >
      {on ? "on" : "off"}
    </span>
  );
}

function SummaryRow({
  title,
  badge,
  href,
  on,
  level,
}: {
  title: string;
  badge: string;
  href: string;
  on: boolean;
  level: string;
}) {
  return (
    <div className="flex items-center justify-between gap-3 py-2 text-sm text-text-main">
      <div className="flex items-center gap-2">
        {title}
        <Link
          href={href}
          className="rounded border border-border bg-bg-subtle px-1.5 py-0.5 text-[10px] uppercase tracking-wider text-text-muted hover:border-primary/40 hover:text-primary"
        >
          {badge}
        </Link>
      </div>
      <div className="flex items-center gap-2 text-xs text-text-muted">
        <span>{level}</span>
        <StatusPill on={on} />
      </div>
    </div>
  );
}

export default function CompressionTokenSaverCard({
  config,
}: {
  config: CompressionTokenSaverConfig;
  // Kept for call-site compatibility; this card is read-only and never persists.
  saving?: boolean;
  onSave?: (patch: CompressionTokenSaverPatch) => void | Promise<void>;
}) {
  const t = useTranslations("settings");
  const masterEnabled = config.enabled;
  const rtk = config.rtkConfig ?? { enabled: true, intensity: "standard" as RtkIntensity };
  const cavemanOut = config.cavemanOutputMode ?? {
    enabled: false,
    intensity: "full" as CavemanIntensity,
  };
  const cavemanIn = config.cavemanConfig ?? {
    enabled: true,
    intensity: "full" as CavemanIntensity,
  };

  return (
    <section className="rounded-lg border border-border/70 bg-surface/40 p-4">
      <div className="mb-1 flex items-start justify-between gap-4">
        <div className="min-w-0 flex-1">
          <h4 className="flex items-center gap-2 text-base font-semibold text-text-main">
            <span className="material-symbols-outlined text-[21px] text-amber-500">bolt</span>
            {t("tokenSaverTitle")}
          </h4>
          <p className="mt-1 text-sm text-text-muted">{t("tokenSaverSubtitle")}</p>
        </div>
        <StatusPill on={masterEnabled} />
      </div>

      <div className="mt-3 divide-y divide-border">
        <SummaryRow
          title={t("tokenSaverToolOutput")}
          badge="RTK"
          href="/dashboard/context/settings"
          on={masterEnabled && rtk.enabled}
          level={rtk.intensity}
        />
        <SummaryRow
          title={t("tokenSaverLlmOutput")}
          badge="Caveman"
          href="/dashboard/context/settings"
          on={masterEnabled && cavemanOut.enabled}
          level={cavemanOut.intensity}
        />
        <SummaryRow
          title={t("tokenSaverInputCompression")}
          badge="Caveman"
          href="/dashboard/context/settings"
          on={masterEnabled && cavemanIn.enabled}
          level={cavemanIn.intensity}
        />
      </div>

      <div className="mt-4 flex items-start gap-2 border-t border-border pt-3 text-xs text-text-muted">
        <span className="material-symbols-outlined mt-px text-[16px]">info</span>
        <p>
          Turn these layers on/off and set their level in{" "}
          <Link href="/dashboard/context/settings" className="text-primary hover:underline">
            Compression Settings
          </Link>
          .
        </p>
      </div>
    </section>
  );
}
