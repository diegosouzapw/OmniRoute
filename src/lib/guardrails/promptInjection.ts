import { BaseGuardrail, type GuardrailContext, type GuardrailResult } from "./base";
import {
  MAX_INJECTION_SCAN_BYTES,
  extractMessageContents,
  sanitizeRequest,
} from "@/shared/utils/inputSanitizer";
import { getFeatureFlagOverride } from "@/lib/db/featureFlags";
import { parseEnvBoolean } from "@/shared/utils/envBoolean";
import {
  resolveBlockThreshold,
  shouldBlockDetections,
  SEVERITY_SCORES as SHARED_SEVERITY_SCORES,
  type InjectionSeverity,
} from "@/shared/utils/injectionSeverity";

type Detection = {
  match: string;
  pattern: string;
  severity: "low" | "medium" | "high";
};

type PatternLike =
  | string
  | RegExp
  | {
      name?: string;
      pattern: string | RegExp;
      severity?: "low" | "medium" | "high";
    };

export interface PromptInjectionGuardrailOptions {
  blockThreshold?: "low" | "medium" | "high";
  customPatterns?: PatternLike[];
  enabled?: boolean;
  logger?: GuardrailContext["log"];
  mode?: "block" | "warn" | "log";
  priority?: number;
}

export interface PromptInjectionGuardrailDecision {
  blocked: boolean;
  result: {
    detections: Detection[];
    flagged: boolean;
    piiDetections: Array<{ count: number; type: string }>;
  };
}

const DEFAULT_GUARD_PATTERNS: PatternLike[] = [
  {
    name: "system_override_inline",
    pattern: /\bsystem\s*:\s*override\b/i,
    severity: "high",
  },
  {
    name: "markdown_system_block",
    pattern: /```+\s*system\b/i,
    severity: "high",
  },
];

const SEVERITY_SCORES = SHARED_SEVERITY_SCORES;

function normalizePatternEntry(entry: PatternLike, index: number) {
  if (entry instanceof RegExp) {
    return {
      name: `custom_${index}`,
      pattern: entry,
      severity: "high" as const,
    };
  }

  if (typeof entry === "string") {
    return {
      name: `custom_${index}`,
      pattern: new RegExp(entry, "i"),
      severity: "high" as const,
    };
  }

  if (!entry || (!(entry.pattern instanceof RegExp) && typeof entry.pattern !== "string")) {
    return null;
  }

  return {
    name: entry.name || `custom_${index}`,
    pattern: entry.pattern instanceof RegExp ? entry.pattern : new RegExp(entry.pattern, "i"),
    severity: entry.severity || ("high" as const),
  };
}

function detectWithPatterns(text: string, patterns: ReturnType<typeof normalizePatternEntry>[]) {
  const detections: Detection[] = [];

  for (const rule of patterns) {
    if (!rule) continue;
    const match = text.match(rule.pattern);
    if (!match) continue;
    detections.push({
      pattern: rule.name,
      severity: rule.severity,
      match: match[0].slice(0, 50),
    });
  }

  return detections;
}

function shouldBlock(detections: Detection[], threshold: "low" | "medium" | "high") {
  return shouldBlockDetections(detections, threshold);
}

function getLogger(options: PromptInjectionGuardrailOptions, context: GuardrailContext) {
  return options.logger || context.log || console;
}

function emitGuardrailLog(
  logger: GuardrailContext["log"] | Console,
  level: "debug" | "info" | "warn",
  message: string,
  meta?: Record<string, unknown>
) {
  const target = logger?.[level];
  if (typeof target !== "function") return;

  if (logger === console) {
    target.call(logger, message, meta || "");
    return;
  }

  target.call(logger, "GUARDRAIL", message, meta);
}

function getMode(options: PromptInjectionGuardrailOptions) {
  // A dashboard-set DB override for INJECTION_GUARD_MODE wins over env vars, so the
  // Feature Flags UI actually controls this guard (DB > ENV > default, matching
  // resolveFeatureFlag). Read DB-only here to preserve the existing env fallback
  // chain and "warn" default when no override is set — i.e. behavior is unchanged
  // for every deployment that has not explicitly set the flag. Fail-safe: any DB
  // read error falls back to the env-based behavior.
  let dbOverride: string | undefined;
  try {
    dbOverride = getFeatureFlagOverride("INJECTION_GUARD_MODE");
  } catch {
    dbOverride = undefined;
  }
  return (options.mode ||
    dbOverride ||
    process.env.INJECTION_GUARD_MODE ||
    process.env.INPUT_SANITIZER_MODE ||
    "warn") as "block" | "warn" | "log";
}

function getThreshold(options: PromptInjectionGuardrailOptions) {
  return resolveBlockThreshold(options.blockThreshold);
}

function isEnabled(options: PromptInjectionGuardrailOptions) {
  return options.enabled ?? parseEnvBoolean(process.env.INPUT_SANITIZER_ENABLED, true);
}

export function evaluatePromptInjection(
  body: unknown,
  options: PromptInjectionGuardrailOptions = {},
  context: GuardrailContext = {}
): PromptInjectionGuardrailDecision {
  if (!isEnabled(options) || !body || typeof body !== "object") {
    return {
      blocked: false,
      result: {
        flagged: false,
        detections: [],
        piiDetections: [],
      },
    };
  }

  const logger = getLogger(options, context);
  const mode = getMode(options);
  const threshold = getThreshold(options);
  const patterns = [...DEFAULT_GUARD_PATTERNS, ...(options.customPatterns || [])]
    .map(normalizePatternEntry)
    .filter(Boolean);

  const sanitizerResult = sanitizeRequest(body, {
    info() {},
    warn() {},
  } as Console);
  const contents = extractMessageContents(body);
  // Bound the custom-pattern scan to the first 16 KB, matching detectInjection's
  // cap inside sanitizeRequest above (hot-path perf, #3932 / #4041). Injection
  // directives sit near the top; scanning the full join buys only CPU/GC.
  const joinedContents = contents.join("\n");
  const scanText =
    joinedContents.length > MAX_INJECTION_SCAN_BYTES
      ? joinedContents.slice(0, MAX_INJECTION_SCAN_BYTES)
      : joinedContents;
  const customDetections = detectWithPatterns(scanText, patterns);
  const existingDetections = new Set(
    sanitizerResult.detections.map((d: Detection) => `${d.pattern}:${d.match}:${d.severity}`)
  );

  for (const detection of customDetections) {
    const key = `${detection.pattern}:${detection.match}:${detection.severity}`;
    if (!existingDetections.has(key)) {
      sanitizerResult.detections.push(detection);
    }
  }

  const result = {
    detections: sanitizerResult.detections as Detection[],
    flagged: sanitizerResult.detections.length > 0 || sanitizerResult.piiDetections.length > 0,
    piiDetections: sanitizerResult.piiDetections,
  };

  if (!result.flagged) {
    return { blocked: false, result };
  }

  if (mode === "block" && shouldBlock(result.detections, threshold)) {
    emitGuardrailLog(logger, "warn", "Request blocked by prompt injection guard", {
      detections: result.detections.map((detection) => ({
        pattern: detection.pattern,
        severity: detection.severity,
      })),
    });
    return { blocked: true, result };
  }

  if (mode === "warn" || mode === "log") {
    const hasHighSeverity = result.detections.some((detection) => detection.severity === "high");
    if (mode === "warn" && !hasHighSeverity) {
      return { blocked: false, result };
    }

    const level = mode === "log" ? "info" : "warn";
    emitGuardrailLog(logger, level, "Prompt injection guard flagged request", {
      detections: result.detections.map((detection) => ({
        pattern: detection.pattern,
        severity: detection.severity,
      })),
      pii: result.piiDetections.length,
    });
  }

  return { blocked: false, result };
}

export class PromptInjectionGuardrail extends BaseGuardrail {
  private readonly options: PromptInjectionGuardrailOptions;

  constructor(options: PromptInjectionGuardrailOptions = {}) {
    super("prompt-injection", {
      enabled: options.enabled,
      priority: options.priority ?? 20,
    });
    this.options = options;
  }

  async preCall(payload: unknown, context: GuardrailContext): Promise<GuardrailResult<unknown>> {
    const decision = evaluatePromptInjection(payload, this.options, context);
    if (decision.blocked) {
      return {
        block: true,
        message: "Request rejected: suspicious content detected",
        meta: {
          detections: decision.result.detections.length,
          piiDetections: decision.result.piiDetections.length,
        },
      };
    }

    return {
      block: false,
      meta: decision.result.flagged
        ? {
            detections: decision.result.detections.length,
            piiDetections: decision.result.piiDetections.length,
          }
        : null,
    };
  }
}

export { DEFAULT_GUARD_PATTERNS, detectWithPatterns, normalizePatternEntry, shouldBlock };
