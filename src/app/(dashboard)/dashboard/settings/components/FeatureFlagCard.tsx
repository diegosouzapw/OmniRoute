"use client";

interface FeatureFlagCardProps {
  flag: {
    key: string;
    label: string;
    description: string;
    category: "security" | "network" | "policies" | "runtime" | "cli" | "health";
    type: "boolean" | "enum";
    enumValues?: string[] | null;
    effectiveValue: string;
    source: "db" | "env" | "default";
    requiresRestart: boolean;
    warningLevel?: "info" | "caution" | "danger";
  };
  onToggle: (key: string, newValue: string) => void;
  onReset: (key: string) => void;
  saving?: boolean;
}

const CATEGORY_STYLES: Record<
  FeatureFlagCardProps["flag"]["category"],
  { bg: string; text: string; label: string }
> = {
  security: { bg: "bg-red-500/15", text: "text-red-400", label: "Security" },
  network: { bg: "bg-blue-500/15", text: "text-blue-400", label: "Network" },
  policies: { bg: "bg-amber-500/15", text: "text-amber-400", label: "Policies" },
  runtime: { bg: "bg-purple-500/15", text: "text-purple-400", label: "Runtime" },
  cli: { bg: "bg-green-500/15", text: "text-green-400", label: "CLI" },
  health: { bg: "bg-cyan-500/15", text: "text-cyan-400", label: "Health" },
};

const SOURCE_STYLES: Record<
  FeatureFlagCardProps["flag"]["source"],
  { bg: string; text: string; label: string }
> = {
  db: { bg: "bg-blue-500/20", text: "text-blue-300", label: "DB" },
  env: { bg: "bg-amber-500/20", text: "text-amber-300", label: "ENV" },
  default: { bg: "bg-slate-500/20", text: "text-slate-400", label: "DEF" },
};

function isEnabled(value: string): boolean {
  return value === "true" || value === "1" || value === "yes";
}

function Spinner() {
  return (
    <span
      className="inline-block w-4 h-4 border-2 border-white/20 border-t-white/80 rounded-full animate-spin"
      aria-hidden="true"
    />
  );
}

export default function FeatureFlagCard({
  flag,
  onToggle,
  onReset,
  saving = false,
}: FeatureFlagCardProps) {
  const enabled = flag.type === "boolean" ? isEnabled(flag.effectiveValue) : false;
  const category = CATEGORY_STYLES[flag.category];
  const source = SOURCE_STYLES[flag.source];

  const cardBorder =
    flag.type === "boolean" && enabled
      ? "border-green-500/30 shadow-green-500/10"
      : "border-white/10";

  const cardOpacity = flag.type === "boolean" && !enabled ? "opacity-80" : "";

  return (
    <div
      role="group"
      aria-label={flag.label}
      className={`backdrop-blur-xl bg-black/60 border rounded-xl p-4 transition-all duration-200 hover:-translate-y-px hover:shadow-xl hover:border-white/15 ${cardBorder} ${cardOpacity}`}
    >
      {/* Top row: category badge + toggle/select */}
      <div className="flex items-center justify-between mb-3">
        <span
          aria-label={`Category: ${flag.category}`}
          className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${category.bg} ${category.text}`}
        >
          {category.label}
        </span>

        <div className="flex items-center gap-2">
          {saving && <Spinner />}

          {flag.type === "boolean" ? (
            <button
              role="switch"
              aria-checked={enabled}
              aria-label={flag.label}
              disabled={saving}
              onClick={() => onToggle(flag.key, enabled ? "false" : "true")}
              className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white/50 disabled:cursor-not-allowed disabled:opacity-50 ${
                enabled ? "bg-green-500" : "bg-white/20"
              }`}
            >
              <span
                className={`inline-block h-3.5 w-3.5 transform rounded-full bg-white shadow transition-transform ${
                  enabled ? "translate-x-4" : "translate-x-0.5"
                }`}
                aria-hidden="true"
              />
            </button>
          ) : (
            <select
              aria-label={flag.label}
              disabled={saving}
              value={flag.effectiveValue}
              onChange={(e) => onToggle(flag.key, e.target.value)}
              className="text-xs bg-white/10 border border-white/20 rounded-md px-2 py-0.5 text-white focus:outline-none focus:ring-1 focus:ring-white/30 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {(flag.enumValues ?? []).map((val) => (
                <option key={val} value={val} className="bg-neutral-900">
                  {val}
                </option>
              ))}
            </select>
          )}
        </div>
      </div>

      {/* Flag key + warning icon */}
      <div className="flex items-center gap-2 mb-1.5">
        <span className="font-mono text-xs font-semibold text-white/90 truncate flex-1">
          {flag.key}
        </span>

        {flag.warningLevel === "caution" && (
          <span className="text-amber-400 text-sm" aria-label="Caution">
            ⚠️
          </span>
        )}
        {flag.warningLevel === "danger" && (
          <span className="text-sm animate-pulse" aria-label="Danger">
            🔴
          </span>
        )}
        {flag.requiresRestart && (
          <span
            className="text-[10px] text-slate-400 border border-slate-400/30 rounded px-1"
            title="Requires restart"
            aria-label="Requires restart"
          >
            restart
          </span>
        )}
      </div>

      {/* Description */}
      <p className="text-xs text-white/50 line-clamp-2 mb-3">{flag.description}</p>

      {/* Bottom row: source badge + reset button */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1.5">
          <span className="text-xs text-white/30">Source:</span>
          <span
            className={`inline-flex items-center px-1.5 py-0.5 rounded text-xs font-mono font-medium ${source.bg} ${source.text}`}
          >
            {source.label}
          </span>
        </div>

        {flag.source === "db" && (
          <button
            aria-label={`Reset ${flag.label} to default`}
            disabled={saving}
            onClick={() => onReset(flag.key)}
            className="inline-flex items-center gap-1 text-xs text-white/40 hover:text-white/70 transition-colors disabled:cursor-not-allowed disabled:opacity-40 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white/50 rounded"
          >
            <span className="material-symbols-outlined text-[14px]" aria-hidden="true">
              refresh
            </span>
            Reset
          </button>
        )}
      </div>
    </div>
  );
}
