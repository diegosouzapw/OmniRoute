/**
 * Pre-request Middleware Types
 *
 * Types for the pre-request middleware pipeline that executes
 * BEFORE provider/routing selection.
 */

/** Execution priority — lower runs first */
export enum HookPriority {
  CRITICAL = 0,
  HIGH = 100,
  NORMAL = 200,
  LOW = 300,
}

/** Scope of a hook — global (all requests) or combo-scoped */
export type HookScope = { type: "global" } | { type: "combo"; comboId: string };

/**
 * Context passed to each hook.
 * Hooks can read and mutate this freely.
 */
export interface PreRequestHookContext {
  /** Original request body (chat completions format) */
  body: Record<string, unknown>;
  /** Request headers */
  headers: Record<string, string | string[] | undefined>;
  /** Resolved model string (may be "auto" or a specific model) */
  model: string;
  /** Combo name if the model resolved to a combo */
  combo?: string;
  /** API key info if authenticated */
  apiKeyInfo?: Record<string, unknown>;
  /** Arbitrary metadata for hooks to pass data between each other */
  metadata: Record<string, unknown>;
  /** Logger instance */
  log: {
    info: (tag: string, msg: string) => void;
    warn: (tag: string, msg: string) => void;
    error: (tag: string, msg: string) => void;
  };
}

/**
 * Result returned by a hook.
 * Hooks can selectively mutate the context or short-circuit.
 */
export interface HookResult {
  /** Replacement body (partial — merged with original) */
  body?: Record<string, unknown>;
  /** Replacement headers */
  headers?: Record<string, string | string[] | undefined>;
  /** Override model string */
  model?: string;
  /** Override combo target */
  combo?: string;
  /** Short-circuit — return this response instead of forwarding */
  response?: { status: number; body: Record<string, unknown> };
  /** If true, skip all remaining hooks */
  skipRemaining?: boolean;
}

/**
 * Hook middleware function signature.
 * Receives a mutable context and returns an optional result.
 */
export type HookMiddleware = (context: PreRequestHookContext) => HookResult | Promise<HookResult>;

/**
 * Registered hook configuration.
 */
export interface HookConfig {
  /** Unique hook name */
  name: string;
  /** Human-readable description */
  description: string;
  /** Execution priority (lower = first) */
  priority: HookPriority;
  /** Execution scope */
  scope: HookScope;
  /** Whether the hook is active */
  enabled: boolean;
  /** JavaScript source code of the hook function */
  code: string;
  /** Created timestamp */
  createdAt: string;
  /** Updated timestamp */
  updatedAt: string;
  /** Run count (for observability) */
  runCount: number;
  /** Last error message if execution failed */
  lastError?: string;
}

/** Serialized hook config for DB storage */
export interface HookConfigRow {
  name: string;
  description: string;
  priority: number;
  scope_type: "global" | "combo";
  combo_id?: string | null;
  enabled: number;
  code: string;
  created_at: string;
  updated_at: string;
  run_count: number;
  last_error?: string | null;
}

/** API request body for creating/updating a hook */
export interface CreateHookRequest {
  name: string;
  description?: string;
  priority?: HookPriority;
  scope?: HookScope;
  code: string;
}

/** Hook execution log entry */
export interface HookLogEntry {
  id: string;
  hookName: string;
  requestId: string;
  durationMs: number;
  mutated: boolean;
  skipped: boolean;
  error?: string;
  timestamp: string;
}
