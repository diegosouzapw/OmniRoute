/**
 * System Transforms — generic, per-provider, config-driven body normalization.
 *
 * Generalises the CC-bridge-only transforms (`ccBridgeTransforms.ts`) into
 * a per-provider registry so the same pipeline DSL can run against ANY
 * provider's request body: native `claude` OAuth, `anthropic-compatible-cc-*`
 * bridge, `gemini`, `codex`, `openai`, etc.
 *
 * Each provider has its own `{ enabled, pipeline }`. Defaults shipped:
 *   - `claude`: obfuscate_words ON (adds Open WebUI words on top of native
 *     ZWJ pass). Billing+sentinel handled by native code (executors/base.ts
 *     :753-782); DSL on this path does NOT inject billing.
 *   - `anthropic-compatible-cc-*`: full T4-200 pipeline (anchors + identity
 *     prefixes + replacements + prepend identity + inject_billing_header).
 *   - all other providers: `{ enabled: false, pipeline: [] }`.
 *
 * Adds a new op kind `obfuscate_words` (ZWJ insertion driven by configurable
 * word list, replaces the hardcoded `claudeCodeObfuscation.ts` defaults for
 * users who opt-in).
 *
 * Migration: legacy `ccBridgeTransforms` config (single-pipeline shape) is
 * accepted and normalized into `systemTransforms.providers["anthropic-compatible-cc-*"]`.
 *
 * Reference: OmniRoute issue #2260 + comment 4459544580 (Open WebUI bypass).
 */

import {
  applyCcBridgeTransformPipeline,
  CLAUDE_AGENT_SDK_IDENTITY,
  DEFAULT_CC_BRIDGE_PIPELINE,
  DEFAULT_IDENTITY_PREFIXES,
  DEFAULT_PARAGRAPH_REMOVAL_ANCHORS,
  DEFAULT_TEXT_REPLACEMENTS,
} from "./ccBridgeTransforms.ts";
import type {
  CcBridgeTransformsConfig,
  TransformOp as BaseTransformOp,
} from "./ccBridgeTransforms.ts";

// Re-export base DSL types so external callers depend only on systemTransforms.
export {
  CLAUDE_AGENT_SDK_IDENTITY,
  DEFAULT_CC_BRIDGE_PIPELINE,
  DEFAULT_IDENTITY_PREFIXES,
  DEFAULT_PARAGRAPH_REMOVAL_ANCHORS,
  DEFAULT_TEXT_REPLACEMENTS,
};

// ────────────────────────────────────────────────────────────────────────────
// DSL — extends base TransformOp with the new `obfuscate_words` op kind.
// ────────────────────────────────────────────────────────────────────────────

export interface ObfuscateWordsOp {
  kind: "obfuscate_words";
  /** Words to obfuscate via zero-width joiner insertion. Case-insensitive. */
  words: string[];
  /** Where to apply obfuscation. Defaults to ["system", "messages", "tools"]. */
  targets?: Array<"system" | "messages" | "tools">;
}

export type TransformOp = BaseTransformOp | ObfuscateWordsOp;

export interface ProviderTransformsConfig {
  enabled: boolean;
  pipeline: TransformOp[];
}

export interface SystemTransformsConfig {
  providers: Record<string, ProviderTransformsConfig>;
}

// ────────────────────────────────────────────────────────────────────────────
// Default word lists (legacy hardcoded + OpenWebUI additions).
// ────────────────────────────────────────────────────────────────────────────

/**
 * Default obfuscation word list — current hardcoded set from
 * `claudeCodeObfuscation.ts` PLUS Open WebUI additions per issue #2260
 * comment 4459544580.
 */
export const DEFAULT_OBFUSCATE_WORDS = [
  // legacy hardcoded set
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
  // Open WebUI additions
  "openwebui",
  "open-webui",
];

/**
 * Open WebUI paragraph anchors — URLs identifying Open WebUI deployments.
 * Added on top of `DEFAULT_PARAGRAPH_REMOVAL_ANCHORS` for the CC bridge
 * default pipeline.
 */
export const OPENWEBUI_PARAGRAPH_ANCHORS = [
  "github.com/open-webui/open-webui",
  "openwebui.com",
  "docs.openwebui.com",
];

/** Open WebUI identity paragraph prefixes. */
export const OPENWEBUI_IDENTITY_PREFIXES = ["You are Open WebUI"];

// ────────────────────────────────────────────────────────────────────────────
// Per-provider defaults.
// ────────────────────────────────────────────────────────────────────────────

/**
 * Provider key for the native Claude OAuth path (`executors/base.ts`).
 * Billing+sentinel is already prepended by native code; DSL on this path
 * runs cosmetic ops only (no `inject_billing_header`).
 */
export const PROVIDER_CLAUDE = "claude";

/**
 * Provider key prefix for the Claude-Code-compatible bridge.
 * `claudeCodeCompatible.ts` invokes the pipeline via
 * `applyCcBridgeTransformPipeline` (kept for backward compatibility).
 */
export const PROVIDER_CC_BRIDGE = "anthropic-compatible-cc";

/**
 * Default pipeline for the native `claude` provider path.
 *
 * Cosmetic ops only — native executor already injects billing+sentinel.
 * Obfuscates sensitive words (Open WebUI etc.) and drops Open WebUI
 * paragraph anchors. Does NOT inject billing header (would conflict
 * with native code at executors/base.ts:753-782).
 */
export const DEFAULT_CLAUDE_PIPELINE: TransformOp[] = [
  // Open WebUI paragraph anchors (Gap 2 from comment 4459544580).
  {
    kind: "drop_paragraph_if_contains",
    needles: [...OPENWEBUI_PARAGRAPH_ANCHORS],
  },
  // Open WebUI identity prefixes.
  {
    kind: "drop_paragraph_if_starts_with",
    prefixes: [...OPENWEBUI_IDENTITY_PREFIXES],
  },
  // ZWJ obfuscation of sensitive words (closes Gap 1 + Gap 3).
  {
    kind: "obfuscate_words",
    words: [...DEFAULT_OBFUSCATE_WORDS],
    targets: ["system", "messages", "tools"],
  },
];

/**
 * Default pipeline for the CC bridge provider.
 *
 * Wraps the existing `DEFAULT_CC_BRIDGE_PIPELINE` (T4-200 proven layout)
 * and layers Open WebUI defenses on top: extra paragraph anchors + ZWJ
 * obfuscation of Open WebUI words.
 */
export const DEFAULT_CC_BRIDGE_PROVIDER_PIPELINE: TransformOp[] = [
  // Extra Open WebUI anchors (the base pipeline only carries OpenCode/Cline/
  // Cursor/Continue anchors).
  {
    kind: "drop_paragraph_if_contains",
    needles: [...OPENWEBUI_PARAGRAPH_ANCHORS],
  },
  {
    kind: "drop_paragraph_if_starts_with",
    prefixes: [...OPENWEBUI_IDENTITY_PREFIXES],
  },
  // ZWJ obfuscate Open WebUI words across system+messages+tools.
  {
    kind: "obfuscate_words",
    words: ["openwebui", "open-webui"],
    targets: ["system", "messages", "tools"],
  },
  // Base CC bridge pipeline (anchors + identity prefixes + replacements +
  // prepend SDK identity + inject billing header).
  ...DEFAULT_CC_BRIDGE_PIPELINE,
];

export const DEFAULT_SYSTEM_TRANSFORMS_CONFIG: SystemTransformsConfig = {
  providers: {
    [PROVIDER_CLAUDE]: {
      enabled: false,
      pipeline: DEFAULT_CLAUDE_PIPELINE,
    },
    [PROVIDER_CC_BRIDGE]: {
      enabled: true,
      pipeline: DEFAULT_CC_BRIDGE_PROVIDER_PIPELINE,
    },
  },
};

// ────────────────────────────────────────────────────────────────────────────
// Body shape helpers (mirrors ccBridgeTransforms.ts internals).
// ────────────────────────────────────────────────────────────────────────────

interface RequestBody {
  system?: unknown;
  messages?: unknown;
  tools?: unknown;
  [key: string]: unknown;
}

// ────────────────────────────────────────────────────────────────────────────
// Op: obfuscate_words (the only op kind beyond the base set).
// ────────────────────────────────────────────────────────────────────────────

function escapeRegex(str: string): string {
  return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

const ZWJ = "\u200d";

function obfuscateWord(word: string): string {
  if (word.length <= 1) return word;
  return word[0] + ZWJ + word.slice(1);
}

/**
 * Stateless variant of `obfuscateSensitiveWords` — uses the supplied word
 * list instead of the module-level singleton, so concurrent requests with
 * different op configs do not race.
 */
function obfuscateWithList(text: string, words: string[]): string {
  if (!text || words.length === 0) return text;
  let result = text;
  for (const word of words) {
    if (!word) continue;
    const regex = new RegExp(escapeRegex(word), "gi");
    result = result.replace(regex, (match) => obfuscateWord(match));
  }
  return result;
}

function applyObfuscateWords(body: RequestBody, op: ObfuscateWordsOp): void {
  const words = op.words || [];
  if (words.length === 0) return;
  const targets =
    op.targets && op.targets.length > 0 ? op.targets : ["system", "messages", "tools"];

  if (targets.includes("system")) {
    if (typeof body.system === "string") {
      body.system = obfuscateWithList(body.system, words);
    } else if (Array.isArray(body.system)) {
      for (const block of body.system as Array<Record<string, unknown>>) {
        if (typeof block.text === "string") {
          block.text = obfuscateWithList(block.text, words);
        }
      }
    }
  }

  if (targets.includes("messages") && Array.isArray(body.messages)) {
    for (const msg of body.messages as Array<Record<string, unknown>>) {
      const content = msg.content;
      if (typeof content === "string") {
        msg.content = obfuscateWithList(content, words);
      } else if (Array.isArray(content)) {
        for (const block of content as Array<Record<string, unknown>>) {
          if (typeof block.text === "string") {
            block.text = obfuscateWithList(block.text, words);
          }
        }
      }
    }
  }

  if (targets.includes("tools") && Array.isArray(body.tools)) {
    for (const tool of body.tools as Array<Record<string, unknown>>) {
      if (typeof tool.description === "string") {
        tool.description = obfuscateWithList(tool.description, words);
      }
      const fn = tool.function as Record<string, unknown> | undefined;
      if (fn && typeof fn.description === "string") {
        fn.description = obfuscateWithList(fn.description, words);
      }
    }
  }
}

// ────────────────────────────────────────────────────────────────────────────
// Pipeline executor (delegates base ops to applyCcBridgeTransformPipeline).
// ────────────────────────────────────────────────────────────────────────────

export interface ApplyPipelineResult {
  body: RequestBody;
  appliedOpKinds: string[];
}

function isObfuscateWordsOp(op: TransformOp): op is ObfuscateWordsOp {
  return op.kind === "obfuscate_words";
}

/**
 * Apply a pipeline of generic transforms to a request body.
 *
 * Strategy:
 *   1. Split the pipeline into runs of `obfuscate_words` ops vs base ops.
 *   2. Base-op runs delegate to `applyCcBridgeTransformPipeline` (preserves
 *      the well-tested base executor, including ordering semantics).
 *   3. `obfuscate_words` ops mutate the body in place between base-op runs.
 *
 * This preserves declared order (e.g. drop paragraphs first → obfuscate
 * what survives) while reusing the existing executor.
 */
export function applyTransformPipeline(
  body: RequestBody,
  pipeline: TransformOp[]
): ApplyPipelineResult {
  if (!body || typeof body !== "object") return { body, appliedOpKinds: [] };
  if (!Array.isArray(pipeline) || pipeline.length === 0) {
    return { body, appliedOpKinds: [] };
  }

  const appliedOpKinds: string[] = [];
  let baseRun: BaseTransformOp[] = [];

  const flushBaseRun = () => {
    if (baseRun.length === 0) return;
    const config: CcBridgeTransformsConfig = { enabled: true, pipeline: baseRun };
    // Local `RequestBody` interface is intentionally looser than the strict one
    // exported by ccBridgeTransforms — system transforms accept any shape.
    const result = applyCcBridgeTransformPipeline(
      body as Parameters<typeof applyCcBridgeTransformPipeline>[0],
      config
    );
    appliedOpKinds.push(...result.appliedOpKinds);
    baseRun = [];
  };

  for (const op of pipeline) {
    if (isObfuscateWordsOp(op)) {
      flushBaseRun();
      applyObfuscateWords(body, op);
      appliedOpKinds.push(op.kind);
    } else {
      baseRun.push(op);
    }
  }
  flushBaseRun();

  return { body, appliedOpKinds };
}

/**
 * Apply the configured per-provider pipeline to `body`. No-op when the
 * provider is unconfigured or disabled.
 *
 * `providerId` matches OmniRoute's provider key (`claude`,
 * `anthropic-compatible-cc-…`, `gemini`, etc.). For CC bridge providers,
 * the bridge-prefix match falls back to the `PROVIDER_CC_BRIDGE` key so
 * a single config entry covers every cc/* variant.
 */
export function applySystemTransformPipeline(
  providerId: string,
  body: RequestBody,
  config: SystemTransformsConfig = getSystemTransformsConfig()
): ApplyPipelineResult {
  if (!body || typeof body !== "object") return { body, appliedOpKinds: [] };
  if (!config || !config.providers) return { body, appliedOpKinds: [] };

  const providerConfig = resolveProviderConfig(providerId, config);
  if (!providerConfig || !providerConfig.enabled) {
    return { body, appliedOpKinds: [] };
  }

  return applyTransformPipeline(body, providerConfig.pipeline);
}

function resolveProviderConfig(
  providerId: string,
  config: SystemTransformsConfig
): ProviderTransformsConfig | undefined {
  if (!providerId) return undefined;
  const exact = config.providers[providerId];
  if (exact) return exact;

  // CC bridge providers (anthropic-compatible-cc-*) all share one config.
  if (providerId.startsWith(`${PROVIDER_CC_BRIDGE}-`) || providerId === PROVIDER_CC_BRIDGE) {
    return config.providers[PROVIDER_CC_BRIDGE];
  }
  return undefined;
}

// ────────────────────────────────────────────────────────────────────────────
// Runtime singleton.
// ────────────────────────────────────────────────────────────────────────────

let _systemTransformsConfig: SystemTransformsConfig = DEFAULT_SYSTEM_TRANSFORMS_CONFIG;

/**
 * Replace the active system-transforms config. Called from
 * `runtimeSettings.applySystemTransformsSection()` on Settings UI save.
 *
 * Accepts a legacy `CcBridgeTransformsConfig` shape (single-provider) and
 * migrates it into `providers[PROVIDER_CC_BRIDGE]`.
 */
export function setSystemTransformsConfig(input: unknown): void {
  if (!input || typeof input !== "object") {
    _systemTransformsConfig = DEFAULT_SYSTEM_TRANSFORMS_CONFIG;
    return;
  }
  const candidate = input as Record<string, unknown>;

  // Legacy shape: { enabled, pipeline } → migrate to per-provider map.
  if ("pipeline" in candidate && Array.isArray(candidate.pipeline)) {
    _systemTransformsConfig = {
      providers: {
        ...DEFAULT_SYSTEM_TRANSFORMS_CONFIG.providers,
        [PROVIDER_CC_BRIDGE]: {
          enabled: candidate.enabled !== false,
          pipeline: candidate.pipeline as TransformOp[],
        },
      },
    };
    return;
  }

  // Per-provider shape: { providers: Record<string, { enabled, pipeline }> }
  if ("providers" in candidate && candidate.providers && typeof candidate.providers === "object") {
    const next: SystemTransformsConfig = { providers: {} };
    const providers = candidate.providers as Record<string, unknown>;
    for (const [providerId, providerEntry] of Object.entries(providers)) {
      if (!providerEntry || typeof providerEntry !== "object") continue;
      const entry = providerEntry as Record<string, unknown>;
      next.providers[providerId] = {
        enabled: entry.enabled !== false,
        pipeline: Array.isArray(entry.pipeline) ? (entry.pipeline as TransformOp[]) : [],
      };
    }
    // Merge defaults for any unset provider — keeps ZWJ on by default even
    // when the user only configured one provider explicitly.
    for (const [providerId, providerDefault] of Object.entries(
      DEFAULT_SYSTEM_TRANSFORMS_CONFIG.providers
    )) {
      if (!next.providers[providerId]) {
        next.providers[providerId] = providerDefault;
      }
    }
    _systemTransformsConfig = next;
    return;
  }

  _systemTransformsConfig = DEFAULT_SYSTEM_TRANSFORMS_CONFIG;
}

export function getSystemTransformsConfig(): SystemTransformsConfig {
  return _systemTransformsConfig;
}

export function resetSystemTransformsConfig(): void {
  _systemTransformsConfig = DEFAULT_SYSTEM_TRANSFORMS_CONFIG;
}
