"use client";

import { useEffect, useMemo, useState } from "react";
import { Button, Card, Collapsible, Input, Select, Toggle } from "@/shared/components";
import { useTranslations } from "next-intl";
import { useNotificationStore } from "@/store/notificationStore";
import FallbackChainsEditor from "./FallbackChainsEditor";
import {
  CLI_COMPAT_PROVIDER_DISPLAY,
  CLI_COMPAT_TOGGLE_IDS,
  normalizeCliCompatProviderId,
} from "@/shared/constants/cliCompatProviders";
import { AI_PROVIDERS } from "@/shared/constants/providers";

// Provider keys (mirror of open-sse/services/systemTransforms.ts).
const PROVIDER_CLAUDE = "claude";
const PROVIDER_CC_BRIDGE = "anthropic-compatible-cc";
const BUILTIN_PROVIDERS = new Set([PROVIDER_CLAUDE, PROVIDER_CC_BRIDGE]);

// Canonical provider catalog for the "Add provider" dropdown. Pulled from the
// shared AI_PROVIDERS registry so the UI stays in sync with backend provider
// definitions. We add the CC bridge synthetic ID (no AI_PROVIDERS entry — it's
// a relay surface, not an upstream provider). Sorted by display name.
type ProviderCatalogEntry = { id: string; name: string };
const PROVIDER_CATALOG: ProviderCatalogEntry[] = (() => {
  const entries: ProviderCatalogEntry[] = Object.values(AI_PROVIDERS).map((p) => ({
    id: p.id,
    name: p.name ?? p.id,
  }));
  entries.push({ id: PROVIDER_CC_BRIDGE, name: "Anthropic-compatible CC bridge" });
  entries.sort((a, b) => a.name.localeCompare(b.name));
  return entries;
})();

const OPENWEBUI_PARAGRAPH_ANCHORS = [
  "github.com/open-webui/open-webui",
  "openwebui.com",
  "docs.openwebui.com",
];

const DEFAULT_OBFUSCATE_WORDS = [
  "opencode",
  "open-code",
  "cline",
  "roo-cline",
  "roo_cline",
  "cursor",
  "windsurf",
  "aider",
  "continue.dev",
  "copilot",
  "avante",
  "codecompanion",
  "openwebui",
  "open-webui",
];

// Mirror of DEFAULT_SYSTEM_TRANSFORMS_CONFIG from open-sse/services/systemTransforms.ts.
// Kept client-side so the UI can render + reset to defaults without a server roundtrip.
// Server remains the source of truth — UI just lets the user inspect, edit, and reset.
const DEFAULT_SYSTEM_TRANSFORMS_CLIENT = {
  providers: {
    [PROVIDER_CLAUDE]: {
      enabled: false,
      pipeline: [
        {
          kind: "drop_paragraph_if_contains",
          needles: [...OPENWEBUI_PARAGRAPH_ANCHORS],
        },
        {
          kind: "drop_paragraph_if_starts_with",
          prefixes: ["You are Open WebUI"],
        },
        {
          kind: "obfuscate_words",
          words: [...DEFAULT_OBFUSCATE_WORDS],
          targets: ["system", "messages", "tools"],
        },
      ],
    },
    [PROVIDER_CC_BRIDGE]: {
      enabled: true,
      pipeline: [
        {
          kind: "drop_paragraph_if_contains",
          needles: [...OPENWEBUI_PARAGRAPH_ANCHORS],
        },
        {
          kind: "drop_paragraph_if_starts_with",
          prefixes: ["You are Open WebUI"],
        },
        {
          kind: "obfuscate_words",
          words: ["openwebui", "open-webui"],
          targets: ["system", "messages", "tools"],
        },
        {
          kind: "drop_paragraph_if_contains",
          needles: [
            "github.com/anomalyco/opencode",
            "opencode.ai/docs",
            "github.com/cline/cline",
            "github.com/getcursor/cursor",
            "continue.dev",
          ],
        },
        {
          kind: "drop_paragraph_if_starts_with",
          prefixes: ["You are OpenCode"],
        },
        {
          kind: "replace_text",
          match: "if OpenCode honestly",
          replacement: "if the assistant honestly",
          allOccurrences: true,
        },
        {
          kind: "replace_text",
          match: "Here is some useful information about the environment you are running in:",
          replacement: "Environment context you are running in:",
          allOccurrences: true,
        },
        {
          kind: "prepend_system_block",
          text: "You are a Claude agent, built on Anthropic's Claude Agent SDK.",
          idempotencyKey: "claude-agent-sdk-identity",
        },
        {
          kind: "inject_billing_header",
          entrypoint: "sdk-cli",
          versionFormat: "ex-machina",
          cchAlgo: "sha256-first-user",
        },
      ],
    },
  },
} as const;

const PROVIDER_TILE_DISPLAY: Record<
  string,
  { name: string; description: string; icon: string; tone: string }
> = {
  [PROVIDER_CLAUDE]: {
    name: "Claude (OAuth)",
    description: "Native Claude provider with OAuth-issued tokens.",
    icon: "anthropic",
    tone: "indigo",
  },
  [PROVIDER_CC_BRIDGE]: {
    name: "Claude-Code Bridge",
    description: "Relay endpoints using API keys (anthropic-compatible-cc-*).",
    icon: "hub",
    tone: "purple",
  },
};

type TransformOpKind =
  | "drop_paragraph_if_contains"
  | "drop_paragraph_if_starts_with"
  | "replace_text"
  | "replace_regex"
  | "drop_block_if_contains"
  | "prepend_system_block"
  | "append_system_block"
  | "inject_billing_header"
  | "obfuscate_words";

const OP_KIND_LABELS: Record<TransformOpKind, string> = {
  drop_paragraph_if_contains: "Drop paragraph (contains)",
  drop_paragraph_if_starts_with: "Drop paragraph (starts with)",
  replace_text: "Replace text",
  replace_regex: "Replace regex",
  drop_block_if_contains: "Drop block (contains)",
  prepend_system_block: "Prepend system block",
  append_system_block: "Append system block",
  inject_billing_header: "Inject billing header",
  obfuscate_words: "Obfuscate words (ZWJ)",
};

// Human-readable description shown above each op's editor. Explains in one
// sentence what the op DOES (transformation effect) and one sentence WHEN
// to use it (the typical fingerprint-sanitization use-case).
const OP_KIND_DESCRIPTIONS: Record<TransformOpKind, string> = {
  drop_paragraph_if_contains:
    "Removes any paragraph (text block split on blank lines) inside the system prompt whose text contains ANY of the listed substrings. Use to strip third-party client fingerprints like 'github.com/anomalyco/opencode' or 'docs.openwebui.com' that Anthropic's classifier flags.",
  drop_paragraph_if_starts_with:
    "Removes any paragraph that STARTS WITH one of the listed prefixes. Use for identity lines like 'You are OpenCode' or 'You are Open WebUI' that announce the calling client.",
  replace_text:
    "Replaces a literal substring with another literal substring. Use for known trigger phrases — e.g. rewrite 'Here is some useful information about the environment you are running in:' to 'Environment context you are running in:' (an empirically-validated trigger phrase).",
  replace_regex:
    "Replaces text matching a regular expression. Use when you need patterns (character classes, optional whitespace, anchors) instead of literal substrings. A malformed pattern is caught at runtime when the op runs.",
  drop_block_if_contains:
    "Removes ENTIRE system blocks (not just paragraphs) whose text contains any of the listed substrings. Use when a whole block is fingerprint-bearing and you want it gone — e.g. an injected MCP-server description.",
  prepend_system_block:
    "Inserts a new text block at the FRONT of the system array. Use to add the SDK identity 'You are a Claude agent, built on Anthropic's Claude Agent SDK.' that Anthropic's classifier expects.",
  append_system_block:
    "Inserts a new text block at the END of the system array. Use for cosmetic additions that don't need to be at position [0].",
  inject_billing_header:
    "Prepends the special 'x-anthropic-billing-header: cc_version=...; cc_entrypoint=...; cch=...;' text block that Anthropic's classifier validates. Required for CC bridge relay endpoints; for the native claude provider OmniRoute already injects its own billing line so this op is usually redundant there.",
  obfuscate_words:
    "Inserts a Zero-Width-Joiner character after the first letter of each listed word, so 'opencode' becomes 'o\u200dpencode'. Reads identical to humans but bypasses classifier word matches. Targets system blocks, user/assistant messages, and tool descriptions.",
};

// Per-field hints rendered under each Input/Select/Toggle inside the
// editor. Short, plain-English. Keep under ~120 chars each.
const FIELD_HINTS = {
  needles:
    "List of substrings. A paragraph matches if it contains ANY one of them. Add one per line via 'Add entry'.",
  prefixes:
    "List of strings. A paragraph matches if it starts with any one of them (leading whitespace is trimmed before matching).",
  caseSensitive:
    "When ON, 'OpenCode' and 'opencode' are different strings. When OFF (default), the comparison ignores case.",
  matchLiteral:
    "Exact literal substring to find. No regex syntax — special chars like . * ? are treated as themselves.",
  replacementText:
    "Replacement string. Leave blank to delete the match. The output preserves surrounding text.",
  allOccurrences:
    "When ON (default), every instance is replaced. When OFF, only the first match is replaced.",
  pattern:
    "JavaScript regex source. Don't wrap in slashes — just 'foo(.*)bar'. Server rejects patterns that fail to compile.",
  regexFlags:
    "JavaScript regex flags (g = all matches, i = case-insensitive, s = dot matches newline, m = multiline). Default 'g'.",
  blockText:
    "Full text of the new system block. Use a literal string; the system block stores text only.",
  idempotencyKey:
    "Optional. If set, the op skips when a block whose text starts with this key is already present. Prevents double-prepend on retries.",
  billingEntrypoint:
    "Value injected as 'cc_entrypoint='. Anthropic accepts 'sdk-cli' (Agent SDK), 'cli' (Claude Code CLI), or other documented values.",
  billingVersionFormat:
    "How the 3-char build hash after cc_version= is computed. 'ex-machina' = sha256 of CCH_SALT+chars-from-first-user-msg+version (per-message). 'omniroute-daystamp' = sha256 of YYYY-MM-DD+version (stable per-day).",
  billingCchAlgo:
    "How the 5-char cch= token is computed. 'sha256-first-user' = sha256 of first user message text. 'xxhash64-body' = body-level signing fills it later. 'static-zero' = literal '00000' placeholder.",
  obfuscateWords:
    "Lowercase words to obfuscate. ZWJ insertion is applied case-insensitively, so 'opencode' also matches 'OpenCode' and 'OPENCODE'.",
  obfuscateTargets:
    "Which body regions to scan for the words: system blocks, user/assistant messages, and/or tool descriptions.",
};

function makeDefaultOp(kind: TransformOpKind): any {
  switch (kind) {
    case "drop_paragraph_if_contains":
      return { kind, needles: [""] };
    case "drop_paragraph_if_starts_with":
      return { kind, prefixes: [""] };
    case "replace_text":
      return { kind, match: "", replacement: "", allOccurrences: true };
    case "replace_regex":
      return { kind, pattern: "", flags: "g", replacement: "" };
    case "drop_block_if_contains":
      return { kind, needles: [""] };
    case "prepend_system_block":
      return { kind, text: "", idempotencyKey: "" };
    case "append_system_block":
      return { kind, text: "", idempotencyKey: "" };
    case "inject_billing_header":
      return {
        kind,
        entrypoint: "sdk-cli",
        versionFormat: "ex-machina",
        cchAlgo: "sha256-first-user",
      };
    case "obfuscate_words":
      return { kind, words: [""], targets: ["system", "messages", "tools"] };
  }
}

function StringListEditor({
  label,
  hint,
  items,
  onChange,
  disabled,
}: {
  label: string;
  hint?: string;
  items: string[];
  onChange: (next: string[]) => void;
  disabled?: boolean;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <span className="text-xs font-medium text-text-main">{label}</span>
      {hint && <p className="text-xs text-text-muted">{hint}</p>}
      {items.map((item, idx) => (
        <div key={idx} className="flex items-center gap-2">
          <Input
            className="flex-1"
            value={item}
            disabled={disabled}
            onChange={(e) => {
              const next = [...items];
              next[idx] = e.target.value;
              onChange(next);
            }}
          />
          <Button
            variant="ghost"
            size="sm"
            icon="close"
            disabled={disabled}
            aria-label="Remove entry"
            onClick={() => {
              const next = [...items];
              next.splice(idx, 1);
              onChange(next);
            }}
          />
        </div>
      ))}
      <Button
        variant="ghost"
        size="sm"
        icon="add"
        disabled={disabled}
        onClick={() => onChange([...items, ""])}
        className="self-start"
      >
        Add entry
      </Button>
    </div>
  );
}

function OpEditor({
  op,
  onChange,
  disabled,
}: {
  op: any;
  onChange: (next: any) => void;
  disabled?: boolean;
}) {
  const updateField = (field: string, value: any) => onChange({ ...op, [field]: value });
  const kind = op?.kind as TransformOpKind | undefined;
  const opDescription = kind ? OP_KIND_DESCRIPTIONS[kind] : null;

  const wrap = (body: React.ReactNode) => (
    <div className="flex flex-col gap-3">
      {opDescription && (
        <p className="text-[11px] leading-relaxed text-text-muted border-l-2 border-purple-500/30 pl-2 italic">
          {opDescription}
        </p>
      )}
      {body}
    </div>
  );

  switch (op?.kind) {
    case "drop_paragraph_if_contains":
      return wrap(
        <div className="flex flex-col gap-2">
          <StringListEditor
            label="Needles (substrings to match)"
            hint={FIELD_HINTS.needles}
            items={op.needles || []}
            onChange={(next) => updateField("needles", next)}
            disabled={disabled}
          />
          <Toggle
            label="Case sensitive"
            description={FIELD_HINTS.caseSensitive}
            checked={op.caseSensitive !== false}
            onChange={(c) => updateField("caseSensitive", c)}
            size="sm"
            disabled={disabled}
          />
        </div>
      );
    case "drop_paragraph_if_starts_with":
      return wrap(
        <div className="flex flex-col gap-2">
          <StringListEditor
            label="Prefixes"
            hint={FIELD_HINTS.prefixes}
            items={op.prefixes || []}
            onChange={(next) => updateField("prefixes", next)}
            disabled={disabled}
          />
          <Toggle
            label="Case sensitive"
            description={FIELD_HINTS.caseSensitive}
            checked={op.caseSensitive !== false}
            onChange={(c) => updateField("caseSensitive", c)}
            size="sm"
            disabled={disabled}
          />
        </div>
      );
    case "replace_text":
      return wrap(
        <div className="flex flex-col gap-2">
          <Input
            label="Match"
            hint={FIELD_HINTS.matchLiteral}
            value={op.match || ""}
            disabled={disabled}
            onChange={(e) => updateField("match", e.target.value)}
          />
          <Input
            label="Replacement"
            hint={FIELD_HINTS.replacementText}
            value={op.replacement || ""}
            disabled={disabled}
            onChange={(e) => updateField("replacement", e.target.value)}
          />
          <Toggle
            label="Replace all occurrences"
            description={FIELD_HINTS.allOccurrences}
            checked={op.allOccurrences !== false}
            onChange={(c) => updateField("allOccurrences", c)}
            size="sm"
            disabled={disabled}
          />
        </div>
      );
    case "replace_regex":
      return wrap(
        <div className="flex flex-col gap-2">
          <Input
            label="Pattern (regex)"
            hint={FIELD_HINTS.pattern}
            value={op.pattern || ""}
            disabled={disabled}
            onChange={(e) => updateField("pattern", e.target.value)}
          />
          <Input
            label="Flags"
            hint={FIELD_HINTS.regexFlags}
            value={op.flags || "g"}
            disabled={disabled}
            onChange={(e) => updateField("flags", e.target.value)}
          />
          <Input
            label="Replacement"
            hint={FIELD_HINTS.replacementText}
            value={op.replacement || ""}
            disabled={disabled}
            onChange={(e) => updateField("replacement", e.target.value)}
          />
        </div>
      );
    case "drop_block_if_contains":
      return wrap(
        <StringListEditor
          label="Needles"
          hint={FIELD_HINTS.needles}
          items={op.needles || []}
          onChange={(next) => updateField("needles", next)}
          disabled={disabled}
        />
      );
    case "prepend_system_block":
    case "append_system_block":
      return wrap(
        <div className="flex flex-col gap-2">
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-text-main">Block text</label>
            <textarea
              rows={3}
              value={op.text || ""}
              disabled={disabled}
              onChange={(e) => updateField("text", e.target.value)}
              className="w-full rounded-md border border-black/10 dark:border-white/10 bg-white dark:bg-white/5 px-3 py-2 text-sm text-text-main font-mono focus:ring-1 focus:ring-primary/30 focus:border-primary/50 focus:outline-none transition-all shadow-inner disabled:opacity-50 disabled:cursor-not-allowed"
            />
            <p className="text-xs text-text-muted">{FIELD_HINTS.blockText}</p>
          </div>
          <Input
            label="Idempotency key"
            hint={FIELD_HINTS.idempotencyKey}
            value={op.idempotencyKey || ""}
            disabled={disabled}
            onChange={(e) => updateField("idempotencyKey", e.target.value)}
          />
        </div>
      );
    case "inject_billing_header":
      return wrap(
        <div className="flex flex-col gap-2">
          <Input
            label="Entrypoint"
            hint={FIELD_HINTS.billingEntrypoint}
            value={op.entrypoint || "sdk-cli"}
            disabled={disabled}
            onChange={(e) => updateField("entrypoint", e.target.value)}
          />
          <Select
            label="Version format"
            hint={FIELD_HINTS.billingVersionFormat}
            value={op.versionFormat || "ex-machina"}
            disabled={disabled}
            onChange={(e) => updateField("versionFormat", e.target.value)}
            options={[
              { value: "ex-machina", label: "ex-machina (sha256 per-msg suffix)" },
              { value: "omniroute-daystamp", label: "omniroute-daystamp (sha256 day+version)" },
            ]}
          />
          <Select
            label="CCH algorithm"
            hint={FIELD_HINTS.billingCchAlgo}
            value={op.cchAlgo || "sha256-first-user"}
            disabled={disabled}
            onChange={(e) => updateField("cchAlgo", e.target.value)}
            options={[
              { value: "sha256-first-user", label: "sha256-first-user (ex-machina style)" },
              { value: "xxhash64-body", label: "xxhash64-body (body-level signing)" },
              { value: "static-zero", label: "static-zero (00000 placeholder)" },
            ]}
          />
        </div>
      );
    case "obfuscate_words":
      return wrap(
        <div className="flex flex-col gap-2">
          <StringListEditor
            label="Words to obfuscate (ZWJ inserted after first char)"
            hint={FIELD_HINTS.obfuscateWords}
            items={op.words || []}
            onChange={(next) => updateField("words", next)}
            disabled={disabled}
          />
          <div className="flex flex-col gap-1.5">
            <span className="text-xs font-medium text-text-main">Targets</span>
            <p className="text-xs text-text-muted">{FIELD_HINTS.obfuscateTargets}</p>
            <div className="flex flex-wrap gap-4">
              {(["system", "messages", "tools"] as const).map((target) => {
                const targets: string[] = op.targets || ["system", "messages", "tools"];
                const checked = targets.includes(target);
                return (
                  <Toggle
                    key={target}
                    label={target}
                    checked={checked}
                    size="sm"
                    disabled={disabled}
                    onChange={(c) => {
                      const next = c ? [...targets, target] : targets.filter((x) => x !== target);
                      updateField("targets", next);
                    }}
                  />
                );
              })}
            </div>
          </div>
        </div>
      );
    default:
      return <p className="text-xs text-text-muted">Unknown op kind: {op?.kind}</p>;
  }
}

function summarizeTransformOp(op: any): string {
  switch (op?.kind) {
    case "drop_paragraph_if_contains":
      return `drop paragraphs containing: ${(op.needles || []).slice(0, 3).join(", ")}${(op.needles || []).length > 3 ? "…" : ""}`;
    case "drop_paragraph_if_starts_with":
      return `drop paragraphs starting with: ${(op.prefixes || []).slice(0, 3).join(", ")}${(op.prefixes || []).length > 3 ? "…" : ""}`;
    case "replace_text":
      return `replace "${(op.match || "").slice(0, 40)}${(op.match || "").length > 40 ? "…" : ""}" → "${(op.replacement || "").slice(0, 40)}${(op.replacement || "").length > 40 ? "…" : ""}"`;
    case "replace_regex":
      return `regex /${op.pattern}/${op.flags || ""} → "${(op.replacement || "").slice(0, 40)}"`;
    case "drop_block_if_contains":
      return `drop blocks containing: ${(op.needles || []).slice(0, 3).join(", ")}`;
    case "prepend_system_block":
      return `prepend block: "${(op.text || "").slice(0, 60)}${(op.text || "").length > 60 ? "…" : ""}"`;
    case "append_system_block":
      return `append block: "${(op.text || "").slice(0, 60)}${(op.text || "").length > 60 ? "…" : ""}"`;
    case "inject_billing_header":
      return `inject billing header (entrypoint=${op.entrypoint}, version=${op.versionFormat}, cch=${op.cchAlgo})`;
    case "obfuscate_words":
      return `obfuscate ${(op.words || []).length} word(s) via ZWJ in ${(op.targets || ["system", "messages", "tools"]).join("+")}`;
    default:
      return JSON.stringify(op);
  }
}

// Client-side validator — light shape check before we PATCH; the server
// re-validates with the full zod schema in settingsSchemas.ts.
function validateProviderTransformsConfig(value: unknown): string | null {
  if (!value || typeof value !== "object") return "Config must be a JSON object";
  const cfg = value as { enabled?: unknown; pipeline?: unknown };
  if (typeof cfg.enabled !== "boolean") return "`enabled` must be true or false";
  if (!Array.isArray(cfg.pipeline)) return "`pipeline` must be an array of ops";
  if (cfg.pipeline.length > 50) return "Pipeline cannot exceed 50 ops";
  for (let i = 0; i < cfg.pipeline.length; i++) {
    const op = cfg.pipeline[i] as { kind?: unknown };
    if (!op || typeof op !== "object" || typeof op.kind !== "string") {
      return `Op #${i + 1}: missing or invalid \`kind\``;
    }
    const validKinds = [
      "drop_paragraph_if_contains",
      "drop_paragraph_if_starts_with",
      "replace_text",
      "replace_regex",
      "drop_block_if_contains",
      "prepend_system_block",
      "append_system_block",
      "inject_billing_header",
      "obfuscate_words",
    ];
    if (!validKinds.includes(op.kind)) {
      return `Op #${i + 1}: unknown kind "${op.kind}"`;
    }
  }
  return null;
}

export default function RoutingTab() {
  const [settings, setSettings] = useState<any>({
    alwaysPreserveClientCache: "auto",
    antigravitySignatureCacheMode: "enabled",
    cliCompatProviders: [],
    autoRoutingEnabled: true,
    autoRoutingDefaultVariant: "lkgp",
    systemTransforms: DEFAULT_SYSTEM_TRANSFORMS_CLIENT,
  });
  // Per-provider JSON draft + error state for the system-transforms editor.
  // Map keyed by provider id; values track the textarea content + last
  // validation error string (null when valid). Synced from settings via
  // effect so server-side values flow into the editor.
  const [jsonDrafts, setJsonDrafts] = useState<Record<string, string>>({});
  const [jsonErrors, setJsonErrors] = useState<Record<string, string | null>>({});
  // Save-state messages for the per-op structured editor (separate from
  // jsonErrors which belongs to the JSON textarea). Cleared when the user
  // makes a fresh edit; populated when the server rejects a PATCH.
  const [providerSaveErrors, setProviderSaveErrors] = useState<Record<string, string | null>>({});
  const [showJsonEditor, setShowJsonEditor] = useState<Record<string, boolean>>({});
  const [addOpKind, setAddOpKind] = useState<Record<string, TransformOpKind>>({});
  const [newProviderId, setNewProviderId] = useState("");
  const [loading, setLoading] = useState(true);
  const [lkgpCacheLoading, setLkgpCacheLoading] = useState(false);
  const [lkgpCacheStatus, setLkgpCacheStatus] = useState({ type: "", message: "" });
  const t = useTranslations("settings");
  const notify = useNotificationStore();

  useEffect(() => {
    fetch("/api/settings")
      .then((res) => res.json())
      .then((data) => {
        setSettings(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  // Optimistic update: apply the patch to local state FIRST so the UI never
  // appears to drop the user's edit, then PATCH the server. If the server
  // rejects (e.g. blank required field on a freshly-added op), surface the
  // error to the caller via onError so the editor can render it inline. Local
  // state is intentionally NOT rolled back — the user keeps editing and
  // re-saves once the validation passes.
  const updateSetting = async (patch: Record<string, unknown>, onError?: (msg: string) => void) => {
    setSettings((prev: any) => ({ ...prev, ...patch }));
    try {
      const res = await fetch("/api/settings", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(patch),
      });
      if (!res.ok) {
        let serverMsg = `HTTP ${res.status}`;
        try {
          const body = await res.json();
          const details = Array.isArray(body?.error?.details)
            ? body.error.details
                .map((d: { field?: string; message?: string }) =>
                  d.field ? `${d.field}: ${d.message ?? "invalid"}` : d.message
                )
                .filter(Boolean)
                .join("; ")
            : null;
          serverMsg = details || body?.error?.message || serverMsg;
        } catch {
          // body wasn't JSON — keep the HTTP status fallback
        }
        notify.error(t("saveFailed"), serverMsg);
        if (onError) onError(serverMsg);
        else console.error("Failed to update settings:", serverMsg);
      } else {
        notify.success(t("savedSuccessfully"));
      }
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err);
      notify.error(t("saveFailed"), msg);
      if (onError) onError(msg);
      else console.error("Failed to update settings:", msg);
    }
  };

  const cliCompatProviders = useMemo(
    () =>
      Array.isArray(settings.cliCompatProviders)
        ? settings.cliCompatProviders.map((providerId: string) =>
            normalizeCliCompatProviderId(providerId)
          )
        : [],
    [settings.cliCompatProviders]
  );
  const cliCompatProviderSet = useMemo(() => new Set(cliCompatProviders), [cliCompatProviders]);

  // Normalize the server snapshot into a per-provider map. Legacy v1
  // `ccBridgeTransforms` payloads from Phase 2 are migrated client-side
  // into providers[PROVIDER_CC_BRIDGE] so the editor never breaks.
  const systemTransforms = useMemo(() => {
    const raw = settings.systemTransforms;
    if (raw && typeof raw === "object" && raw.providers && typeof raw.providers === "object") {
      return raw as { providers: Record<string, { enabled: boolean; pipeline: any[] }> };
    }
    // Legacy migration shim: { enabled, pipeline } → providers[CC_BRIDGE].
    const legacy = settings.ccBridgeTransforms;
    if (legacy && typeof legacy === "object" && Array.isArray(legacy.pipeline)) {
      return {
        providers: {
          ...DEFAULT_SYSTEM_TRANSFORMS_CLIENT.providers,
          [PROVIDER_CC_BRIDGE]: {
            enabled: legacy.enabled !== false,
            pipeline: legacy.pipeline,
          },
        },
      };
    }
    return DEFAULT_SYSTEM_TRANSFORMS_CLIENT;
  }, [settings.systemTransforms, settings.ccBridgeTransforms]);

  // Sync JSON drafts from settings whenever the server snapshot changes.
  useEffect(() => {
    const nextDrafts: Record<string, string> = {};
    for (const [providerId, providerCfg] of Object.entries(systemTransforms.providers)) {
      nextDrafts[providerId] = JSON.stringify(providerCfg, null, 2);
    }
    setJsonDrafts(nextDrafts);
    setJsonErrors({});
  }, [systemTransforms]);

  const updateProviderTransforms = (
    providerId: string,
    next: { enabled: boolean; pipeline: any[] }
  ) => {
    const merged = {
      providers: {
        ...systemTransforms.providers,
        [providerId]: next,
      },
    };
    // Clear any prior save error for this provider so the user sees a fresh
    // state. If the server rejects, the callback below will repopulate it.
    setProviderSaveErrors((prev) => ({ ...prev, [providerId]: null }));
    updateSetting({ systemTransforms: merged }, (msg) =>
      setProviderSaveErrors((prev) => ({ ...prev, [providerId]: msg }))
    );
  };

  const toggleProviderEnabled = (providerId: string, enabled: boolean) => {
    const current = systemTransforms.providers[providerId] ?? { enabled: false, pipeline: [] };
    updateProviderTransforms(providerId, { enabled, pipeline: current.pipeline });
  };

  const applyProviderJson = (providerId: string) => {
    const raw = jsonDrafts[providerId] ?? "";
    let parsed: unknown;
    try {
      parsed = JSON.parse(raw);
    } catch (err) {
      setJsonErrors((prev) => ({
        ...prev,
        [providerId]: `Invalid JSON: ${(err as Error).message}`,
      }));
      return;
    }
    const validationError = validateProviderTransformsConfig(parsed);
    if (validationError) {
      setJsonErrors((prev) => ({ ...prev, [providerId]: validationError }));
      return;
    }
    setJsonErrors((prev) => ({ ...prev, [providerId]: null }));
    updateProviderTransforms(providerId, parsed as { enabled: boolean; pipeline: any[] });
  };

  const resetProviderTransforms = (providerId: string) => {
    const def = (DEFAULT_SYSTEM_TRANSFORMS_CLIENT.providers as Record<string, any>)[providerId];
    if (!def) return;
    setJsonErrors((prev) => ({ ...prev, [providerId]: null }));
    updateProviderTransforms(providerId, {
      enabled: def.enabled,
      pipeline: def.pipeline.map((op: any) => ({ ...op })),
    });
  };

  const updateOp = (providerId: string, opIndex: number, next: any) => {
    const current = systemTransforms.providers[providerId] ?? { enabled: false, pipeline: [] };
    const pipeline = [...(current.pipeline as any[])];
    pipeline[opIndex] = next;
    updateProviderTransforms(providerId, { enabled: current.enabled, pipeline });
  };

  const deleteOp = (providerId: string, opIndex: number) => {
    const current = systemTransforms.providers[providerId] ?? { enabled: false, pipeline: [] };
    const pipeline = (current.pipeline as any[]).filter((_, i) => i !== opIndex);
    updateProviderTransforms(providerId, { enabled: current.enabled, pipeline });
  };

  const moveOp = (providerId: string, opIndex: number, direction: -1 | 1) => {
    const current = systemTransforms.providers[providerId] ?? { enabled: false, pipeline: [] };
    const pipeline = [...(current.pipeline as any[])];
    const target = opIndex + direction;
    if (target < 0 || target >= pipeline.length) return;
    [pipeline[opIndex], pipeline[target]] = [pipeline[target], pipeline[opIndex]];
    updateProviderTransforms(providerId, { enabled: current.enabled, pipeline });
  };

  const addOp = (providerId: string) => {
    const kind = addOpKind[providerId] ?? "drop_paragraph_if_contains";
    const current = systemTransforms.providers[providerId] ?? { enabled: false, pipeline: [] };
    const pipeline = [...(current.pipeline as any[]), makeDefaultOp(kind)];
    updateProviderTransforms(providerId, { enabled: current.enabled, pipeline });
  };

  const availableProvidersToAdd = useMemo(
    () => PROVIDER_CATALOG.filter((p) => !systemTransforms.providers[p.id]),
    [systemTransforms.providers]
  );

  const addProvider = () => {
    const id = newProviderId;
    if (!id || systemTransforms.providers[id]) return;
    updateProviderTransforms(id, { enabled: false, pipeline: [] });
    setNewProviderId("");
  };

  const removeProvider = (providerId: string) => {
    if (BUILTIN_PROVIDERS.has(providerId)) return;
    const providers = systemTransforms.providers as Record<string, unknown>;
    const { [providerId]: _removed, ...rest } = providers;
    updateSetting({ systemTransforms: { providers: rest } });
  };

  const toggleCliCompatProvider = (providerId: string, enabled: boolean) => {
    const normalizedProviderId = normalizeCliCompatProviderId(providerId);
    const nextProviders = new Set(cliCompatProviders);
    if (enabled) {
      nextProviders.add(normalizedProviderId);
    } else {
      nextProviders.delete(normalizedProviderId);
    }
    updateSetting({ cliCompatProviders: Array.from(nextProviders) });
  };

  return (
    <div className="flex flex-col gap-6">
      <Card>
        <div className="flex items-start justify-between gap-4">
          <div className="flex gap-3">
            <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-500 h-fit">
              <span className="material-symbols-outlined text-[20px]" aria-hidden="true">
                network_ping
              </span>
            </div>
            <div>
              <h3 className="text-lg font-semibold">
                {t("adaptiveVolumeRouting") || "Adaptive Volume Routing"}
              </h3>
              <p className="text-sm text-text-muted mt-1">
                {t("adaptiveVolumeRoutingDesc") ||
                  "Automatically adjusts traffic volume between providers based on real-time latency and error rates."}
              </p>
            </div>
          </div>
          <div className="pt-1">
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                className="sr-only peer"
                checked={!!settings.adaptiveVolumeRouting}
                onChange={(e) => updateSetting({ adaptiveVolumeRouting: e.target.checked })}
                disabled={loading}
              />
              <div className="w-11 h-6 bg-border peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
            </label>
          </div>
        </div>
      </Card>

      <Card>
        <div className="flex items-start justify-between gap-4">
          <div className="flex gap-3">
            <div className="p-2 rounded-lg bg-amber-500/10 text-amber-500 h-fit">
              <span className="material-symbols-outlined text-[20px]" aria-hidden="true">
                verified
              </span>
            </div>
            <div>
              <h3 className="text-lg font-semibold">
                {t("lkgpToggleTitle") || "Last Known Good Provider (LKGP)"}
              </h3>
              <p className="text-sm text-text-muted mt-1">
                {t("lkgpToggleDesc") ||
                  "When enabled, the router remembers which provider last served a successful response and tries it first on subsequent requests."}
              </p>
            </div>
          </div>
          <div className="pt-1">
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                className="sr-only peer"
                checked={settings.lkgpEnabled !== false}
                onChange={(e) => updateSetting({ lkgpEnabled: e.target.checked })}
                disabled={loading}
              />
              <div className="w-11 h-6 bg-border peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
            </label>
          </div>
        </div>
        <div className="mt-3 pt-3 border-t border-border/30 flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            loading={lkgpCacheLoading}
            onClick={async () => {
              setLkgpCacheLoading(true);
              setLkgpCacheStatus({ type: "", message: "" });
              try {
                const res = await fetch("/api/settings/lkgp-cache", { method: "DELETE" });
                const data = await res.json();
                if (res.ok) {
                  setLkgpCacheStatus({
                    type: "success",
                    message: t("lkgpCacheCleared") || "LKGP cache cleared successfully",
                  });
                } else {
                  setLkgpCacheStatus({
                    type: "error",
                    message:
                      data.error || t("lkgpCacheClearFailed") || "Failed to clear LKGP cache",
                  });
                }
              } catch {
                setLkgpCacheStatus({
                  type: "error",
                  message: t("errorOccurred") || "An error occurred",
                });
              } finally {
                setLkgpCacheLoading(false);
              }
            }}
          >
            <span className="material-symbols-outlined text-[14px] mr-1" aria-hidden="true">
              delete_sweep
            </span>
            {t("clearLkgpCache") || "Clear LKGP Cache"}
          </Button>
          {lkgpCacheStatus.message && (
            <span
              className={`text-xs ${lkgpCacheStatus.type === "success" ? "text-green-500" : "text-red-500"}`}
            >
              {lkgpCacheStatus.message}
            </span>
          )}
        </div>
      </Card>

      <FallbackChainsEditor />

      <Card>
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 rounded-lg bg-sky-500/10 text-sky-500">
            <span className="material-symbols-outlined text-[20px]" aria-hidden="true">
              fingerprint
            </span>
          </div>
          <div>
            <h3 className="text-lg font-semibold">Antigravity Signature Cache Mode</h3>
            <p className="text-sm text-text-muted">
              Control whether OmniRoute reuses only stored Gemini thought signatures or accepts
              validated client-provided signatures in Antigravity-compatible tool-call flows.
            </p>
          </div>
        </div>

        <div className="space-y-3">
          {[
            {
              value: "enabled",
              label: "Enabled",
              desc: "Current behavior. Ignore client-provided signatures and keep using the stored OmniRoute flow.",
            },
            {
              value: "bypass",
              label: "Bypass",
              desc: "Accept client-provided signatures after lightweight validation and fall back to the stored signature when invalid.",
            },
            {
              value: "bypass-strict",
              label: "Bypass Strict",
              desc: "Require full protobuf validation before accepting a client-provided signature.",
            },
          ].map((option) => (
            <button
              key={option.value}
              onClick={() => updateSetting({ antigravitySignatureCacheMode: option.value })}
              disabled={loading}
              className={`w-full flex flex-col items-start gap-1 p-3 rounded-lg border text-left transition-all ${
                settings.antigravitySignatureCacheMode === option.value
                  ? "border-sky-500/50 bg-sky-500/5 ring-1 ring-sky-500/20"
                  : "border-border/50 hover:border-border hover:bg-surface/30"
              }`}
            >
              <div className="flex items-center gap-2">
                <span
                  className={`material-symbols-outlined text-[16px] ${
                    settings.antigravitySignatureCacheMode === option.value
                      ? "text-sky-400"
                      : "text-text-muted"
                  }`}
                >
                  {settings.antigravitySignatureCacheMode === option.value
                    ? "check_circle"
                    : "radio_button_unchecked"}
                </span>
                <span
                  className={`text-sm font-medium ${settings.antigravitySignatureCacheMode === option.value ? "text-sky-400" : ""}`}
                >
                  {option.label}
                </span>
              </div>
              <p className="text-xs text-text-muted ml-7">{option.desc}</p>
            </button>
          ))}
        </div>
      </Card>

      <Card>
        <div className="flex items-start gap-3 mb-4">
          <div className="p-2 rounded-lg bg-indigo-500/10 text-indigo-500 h-fit">
            <span className="material-symbols-outlined text-[20px]" aria-hidden="true">
              security
            </span>
          </div>
          <div>
            <h3 className="text-lg font-semibold">{t("cliFingerprint")}</h3>
            <p className="text-sm text-text-muted mt-1">{t("cliFingerprintDesc")}</p>
          </div>
        </div>

        <div className="mb-5">
          <h4 className="text-sm font-semibold mb-2">Header fingerprint (per provider)</h4>
          <p className="text-xs text-text-muted mb-2">
            {t("cliFingerprintEnabled", { count: cliCompatProviderSet.size })}
          </p>
          <div className="grid gap-3 md:grid-cols-2">
            {CLI_COMPAT_TOGGLE_IDS.map((providerId) => {
              const normalizedProviderId = normalizeCliCompatProviderId(providerId);
              const providerDisplay = CLI_COMPAT_PROVIDER_DISPLAY[providerId];
              const checked = cliCompatProviderSet.has(normalizedProviderId);
              const label = providerDisplay?.name || providerId;
              const description = providerDisplay?.description || providerId;
              const titleText = checked
                ? t("disableFingerprintTitle", { provider: label })
                : t("enableFingerprintTitle", { provider: label });

              return (
                <button
                  key={providerId}
                  type="button"
                  onClick={() => toggleCliCompatProvider(providerId, !checked)}
                  disabled={loading}
                  aria-pressed={checked}
                  title={titleText}
                  className={`flex items-start gap-3 rounded-lg border p-3 text-left transition-all ${
                    checked
                      ? "border-indigo-500/50 bg-indigo-500/5 ring-1 ring-indigo-500/20"
                      : "border-border/50 hover:border-border hover:bg-surface/30"
                  } ${loading ? "cursor-not-allowed opacity-60" : ""}`}
                >
                  <span
                    className={`material-symbols-outlined mt-0.5 text-[18px] ${checked ? "text-indigo-400" : "text-text-muted"}`}
                    aria-hidden="true"
                  >
                    {checked ? "check_circle" : "radio_button_unchecked"}
                  </span>
                  <span className="min-w-0 flex-1">
                    <span
                      className={`block text-sm font-medium ${checked ? "text-indigo-400" : ""}`}
                    >
                      {label}
                    </span>
                    <span className="mt-1 block text-xs text-text-muted">{description}</span>
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </Card>

      <Card>
        <div className="flex items-start gap-3 mb-4">
          <div className="p-2 rounded-lg bg-purple-500/10 text-purple-500 h-fit">
            <span className="material-symbols-outlined text-[20px]" aria-hidden="true">
              tune
            </span>
          </div>
          <div>
            <h3 className="text-lg font-semibold">{t("systemTransforms")}</h3>
            <p className="text-sm text-text-muted mt-1">{t("systemTransformsDesc")}</p>
          </div>
        </div>

        {/* Add provider — moved to TOP per UX brief. */}
        <div className="mb-4 flex items-end gap-2 rounded-lg border border-dashed border-border/40 bg-surface/30 p-3">
          <Select
            label={t("systemTransformsAddProvider")}
            value={newProviderId}
            disabled={loading || availableProvidersToAdd.length === 0}
            onChange={(e) => setNewProviderId(e.target.value)}
            className="flex-1"
          >
            <option value="">
              {availableProvidersToAdd.length === 0
                ? t("systemTransformsAddProviderAllConfigured")
                : t("systemTransformsAddProviderPlaceholder")}
            </option>
            {availableProvidersToAdd.map((p) => (
              <option key={p.id} value={p.id}>
                {p.name} ({p.id})
              </option>
            ))}
          </Select>
          <Button
            variant="secondary"
            size="sm"
            icon="add"
            disabled={loading || !newProviderId || !!systemTransforms.providers[newProviderId]}
            onClick={addProvider}
          >
            {t("systemTransformsAddProvider")}
          </Button>
        </div>

        {Object.keys(systemTransforms.providers).length === 0 && (
          <p className="text-sm text-text-muted py-2">{t("systemTransformsNoProviders")}</p>
        )}

        <div className="flex flex-col gap-3">
          {Object.entries(systemTransforms.providers).map(([providerId, providerCfg]) => {
            const isBuiltin = BUILTIN_PROVIDERS.has(providerId);
            const display = PROVIDER_TILE_DISPLAY[providerId] ?? {
              name: providerId,
              description: "Custom provider.",
              icon: "extension",
              tone: "purple",
            };
            const draft = jsonDrafts[providerId] ?? JSON.stringify(providerCfg, null, 2);
            const errorMsg = jsonErrors[providerId] ?? null;
            const opCount = Array.isArray(providerCfg.pipeline) ? providerCfg.pipeline.length : 0;
            const hasDefault = Boolean(
              (DEFAULT_SYSTEM_TRANSFORMS_CLIENT.providers as Record<string, unknown>)[providerId]
            );
            const isJsonOpen = showJsonEditor[providerId] ?? false;
            const enabled = providerCfg.enabled !== false;
            const selectedKind =
              (addOpKind[providerId] as TransformOpKind | undefined) ??
              "drop_paragraph_if_contains";

            return (
              <Collapsible
                key={providerId}
                defaultOpen={false}
                title={
                  <div className="flex items-center gap-2 flex-wrap">
                    <code className="text-xs font-mono rounded bg-surface px-1.5 py-0.5">
                      {providerId}
                    </code>
                    <span className="text-sm font-medium">{display.name}</span>
                  </div>
                }
                subtitle={`${opCount} op${opCount === 1 ? "" : "s"} · ${enabled ? "enabled" : "disabled"}`}
                trailing={
                  <>
                    <Toggle
                      checked={enabled}
                      onChange={(checked) => toggleProviderEnabled(providerId, checked)}
                      disabled={loading}
                      ariaLabel={`Enable ${display.name} transforms`}
                    />
                    {!isBuiltin && (
                      <Button
                        variant="ghost"
                        size="sm"
                        icon="delete"
                        disabled={loading}
                        aria-label={t("systemTransformsRemoveProvider")}
                        title={t("systemTransformsRemoveProvider")}
                        onClick={() => removeProvider(providerId)}
                      />
                    )}
                  </>
                }
              >
                <p className="text-xs text-text-muted mb-3">{display.description}</p>
                {providerSaveErrors[providerId] && (
                  <div
                    role="alert"
                    className="mb-3 rounded border border-red-500/40 bg-red-500/10 p-2 text-xs text-red-300"
                  >
                    <span className="font-medium">⚠ Server rejected save:</span>{" "}
                    <span className="break-words font-mono">{providerSaveErrors[providerId]}</span>
                    <p className="mt-1 text-[11px] text-red-200/80">
                      Your local edits are kept. Fix the field above and the next change will
                      re-save.
                    </p>
                  </div>
                )}

                {/* Pipeline op list — each op is itself collapsible. */}
                {opCount > 0 && (
                  <ol className="flex flex-col gap-2 mb-3">
                    {(providerCfg.pipeline as any[]).map((op, index) => (
                      <li key={index}>
                        <Collapsible
                          variant="inline"
                          defaultOpen={false}
                          title={
                            <div className="flex items-center gap-2">
                              <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-purple-500/10 text-[10px] font-semibold text-purple-400">
                                {index + 1}
                              </span>
                              <span className="font-mono text-purple-300 text-xs">{op?.kind}</span>
                            </div>
                          }
                          trailing={
                            <>
                              <Button
                                variant="ghost"
                                size="sm"
                                icon="keyboard_arrow_up"
                                disabled={loading || index === 0}
                                aria-label={t("systemTransformsOpMoveUp")}
                                title={t("systemTransformsOpMoveUp")}
                                onClick={() => moveOp(providerId, index, -1)}
                              />
                              <Button
                                variant="ghost"
                                size="sm"
                                icon="keyboard_arrow_down"
                                disabled={loading || index === opCount - 1}
                                aria-label={t("systemTransformsOpMoveDown")}
                                title={t("systemTransformsOpMoveDown")}
                                onClick={() => moveOp(providerId, index, 1)}
                              />
                              <Button
                                variant="ghost"
                                size="sm"
                                icon="delete"
                                disabled={loading}
                                aria-label={t("systemTransformsOpDelete")}
                                title={t("systemTransformsOpDelete")}
                                onClick={() => deleteOp(providerId, index)}
                              />
                            </>
                          }
                        >
                          <OpEditor
                            op={op}
                            disabled={loading}
                            onChange={(next) => updateOp(providerId, index, next)}
                          />
                        </Collapsible>
                      </li>
                    ))}
                  </ol>
                )}

                {/* Add op row */}
                <div className="flex items-end gap-2 mb-3">
                  <Select
                    label="Add a transform op"
                    className="flex-1"
                    value={selectedKind}
                    onChange={(e) =>
                      setAddOpKind((prev) => ({
                        ...prev,
                        [providerId]: e.target.value as TransformOpKind,
                      }))
                    }
                    disabled={loading}
                    options={(Object.keys(OP_KIND_LABELS) as TransformOpKind[]).map((kind) => ({
                      value: kind,
                      label: OP_KIND_LABELS[kind],
                    }))}
                  />
                  <Button
                    onClick={() => addOp(providerId)}
                    disabled={loading}
                    variant="secondary"
                    size="sm"
                    icon="add"
                  >
                    Add op
                  </Button>
                </div>

                {/* JSON import section (collapsible) */}
                <div className="border-t border-border/20 pt-2 mt-2">
                  <button
                    type="button"
                    onClick={() =>
                      setShowJsonEditor((prev) => ({ ...prev, [providerId]: !isJsonOpen }))
                    }
                    className="text-[11px] text-primary hover:underline"
                  >
                    {isJsonOpen ? "▾ Hide JSON editor" : "▸ Import / export JSON"}
                  </button>
                  {isJsonOpen && (
                    <div className="mt-2">
                      <label className="text-[11px] font-medium text-text-muted block mb-1">
                        JSON (edit &amp; Apply, or paste to import)
                      </label>
                      <textarea
                        value={draft}
                        onChange={(e) =>
                          setJsonDrafts((prev) => ({ ...prev, [providerId]: e.target.value }))
                        }
                        rows={Math.min(40, Math.max(6, draft.split("\n").length))}
                        disabled={loading}
                        spellCheck={false}
                        className="w-full rounded border border-border/50 bg-background/40 p-2 font-mono text-[11px] text-text resize-y"
                      />
                      {errorMsg && (
                        <p className="mt-1 text-xs text-red-400 break-words">⚠ {errorMsg}</p>
                      )}
                      <div className="flex flex-wrap items-center gap-2 mt-2">
                        <Button
                          onClick={() => applyProviderJson(providerId)}
                          disabled={loading}
                          variant="secondary"
                          size="sm"
                          icon="check"
                        >
                          Apply JSON
                        </Button>
                        {hasDefault && (
                          <Button
                            onClick={() => resetProviderTransforms(providerId)}
                            disabled={loading}
                            variant="ghost"
                            size="sm"
                            icon="restart_alt"
                          >
                            Reset to defaults
                          </Button>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </Collapsible>
            );
          })}
        </div>

        <p className="mt-3 text-[11px] text-text-muted">
          All transform ops are idempotent on re-run. Changes take effect immediately on the next
          request.
        </p>
      </Card>

      <Card>
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 rounded-lg bg-green-500/10 text-green-500">
            <span className="material-symbols-outlined text-[20px]" aria-hidden="true">
              cached
            </span>
          </div>
          <div>
            <h3 className="text-lg font-semibold">Client Cache Control</h3>
            <p className="text-sm text-text-muted">
              Configure whether OmniRoute preserves client-provided cache_control markers
            </p>
          </div>
        </div>

        <div className="space-y-3">
          {[
            {
              value: "auto",
              label: "Auto (Recommended)",
              desc: "For deterministic Claude-compatible flows, preserve client-provided cache_control as-is. If the request has no cache_control, OmniRoute does not inject any bridge-owned markers for CC-compatible third-party proxy compatibility.",
            },
            {
              value: "always",
              label: "Always Preserve",
              desc: "Always forward client-provided cache_control headers to upstream providers as-is.",
            },
            {
              value: "never",
              label: "Never Preserve",
              desc: "Always remove client cache_control headers and let OmniRoute manage caching where native provider flows support it.",
            },
          ].map((option) => (
            <button
              key={option.value}
              onClick={() => updateSetting({ alwaysPreserveClientCache: option.value })}
              disabled={loading}
              className={`w-full flex flex-col items-start gap-1 p-3 rounded-lg border text-left transition-all ${
                settings.alwaysPreserveClientCache === option.value
                  ? "border-green-500/50 bg-green-500/5 ring-1 ring-green-500/20"
                  : "border-border/50 hover:border-border hover:bg-surface/30"
              }`}
            >
              <div className="flex items-center gap-2">
                <span
                  className={`material-symbols-outlined text-[16px] ${
                    settings.alwaysPreserveClientCache === option.value
                      ? "text-green-400"
                      : "text-text-muted"
                  }`}
                >
                  {settings.alwaysPreserveClientCache === option.value
                    ? "check_circle"
                    : "radio_button_unchecked"}
                </span>
                <span
                  className={`text-sm font-medium ${settings.alwaysPreserveClientCache === option.value ? "text-green-400" : ""}`}
                >
                  {option.label}
                </span>
              </div>
              <p className="text-xs text-text-muted ml-7">{option.desc}</p>
            </button>
          ))}
        </div>
      </Card>

      <Card>
        <div className="flex items-start justify-between gap-4">
          <div className="flex gap-3">
            <div className="p-2 rounded-lg bg-indigo-500/10 text-indigo-500 h-fit">
              <span className="material-symbols-outlined text-[20px]" aria-hidden="true">
                auto_awesome
              </span>
            </div>
            <div>
              <h3 className="text-lg font-semibold">Zero-Config Auto-Routing</h3>
              <p className="text-sm text-text-muted mt-1">
                Enable automatic provider selection using the auto/ prefix. When enabled, requests
                to auto, auto/coding, auto/fast, etc. will dynamically route across all connected
                providers.
              </p>
            </div>
          </div>
          <div className="pt-1">
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                className="sr-only peer"
                checked={settings.autoRoutingEnabled !== false}
                onChange={(e) => updateSetting({ autoRoutingEnabled: e.target.checked })}
                disabled={loading}
              />
              <div className="w-11 h-6 bg-border peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
            </label>
          </div>
        </div>
        <div className="mt-4 pt-4 border-t border-border/30">
          <label className="block text-sm font-medium mb-2">Default Auto Variant</label>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {[
              { value: "lkgp", label: "LKGP", desc: "Last Known Good Provider" },
              { value: "coding", label: "Coding", desc: "Quality-first for code" },
              { value: "fast", label: "Fast", desc: "Low-latency routing" },
              { value: "cheap", label: "Cheap", desc: "Cost-optimized" },
              { value: "offline", label: "Offline", desc: "High availability" },
              { value: "smart", label: "Smart", desc: "Best discovery (10% explore)" },
            ].map((option) => (
              <button
                key={option.value}
                onClick={() => updateSetting({ autoRoutingDefaultVariant: option.value })}
                disabled={loading}
                className={`p-2 rounded-lg border text-left transition-all ${
                  settings.autoRoutingDefaultVariant === option.value
                    ? "border-indigo-500/50 bg-indigo-500/5 ring-1 ring-indigo-500/20"
                    : "border-border/50 hover:border-border hover:bg-surface/30"
                }`}
              >
                <div className="flex items-center gap-1">
                  <span
                    className={`material-symbols-outlined text-[14px] ${
                      settings.autoRoutingDefaultVariant === option.value
                        ? "text-indigo-400"
                        : "text-text-muted"
                    }`}
                  >
                    {settings.autoRoutingDefaultVariant === option.value
                      ? "check_circle"
                      : "radio_button_unchecked"}
                  </span>
                  <span
                    className={`text-xs font-medium ${settings.autoRoutingDefaultVariant === option.value ? "text-indigo-400" : ""}`}
                  >
                    {option.label}
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </Card>
    </div>
  );
}
