import { SUPPORTED_BATCH_ENDPOINTS, type SupportedBatchEndpoint }
  from "@/shared/constants/batchEndpoints";

// ── Wizard state ─────────────────────────────────────────────────────────────

export interface WizardDestination {
  provider: "openai" | "anthropic" | "gemini";
  endpoint: SupportedBatchEndpoint;
  model: string;
}

export type WizardInputKind = "jsonl" | "csv";

export interface WizardCsvMapping {
  // CSV header name → JSONL field path.
  // Supported paths: "custom_id", "body.messages[0].content",
  //                  "body.messages[0].role", "body.max_tokens",
  //                  "body.temperature", "body.model" (defaults to wizard.model).
  [csvColumn: string]: string;
}

export interface WizardInput {
  kind: WizardInputKind;
  fileName: string | null;
  rawContent: string | null;          // utf-8 text (read via FileReader)
  csvMapping?: WizardCsvMapping;      // only when kind === "csv"
}

// ── Validation result ────────────────────────────────────────────────────────

export interface JsonlLineError {
  lineNumber: number;                  // 1-based
  reason: string;                      // user-facing, short
  field?: string;                      // optional path of offending field
}

export interface ValidationResult {
  ok: boolean;
  totalLines: number;
  sampledLines: number;                // how many lines actually inspected
  uniqueCustomIds: number;
  duplicateCustomIds: string[];        // up to first 10
  errors: JsonlLineError[];            // up to first 50
  preview: unknown[];                  // first 5 parsed request bodies
  byteSize: number;
}

// ── Cost estimate ────────────────────────────────────────────────────────────

export interface CostEstimate {
  model: string;
  totalRequests: number;
  estimatedInputTokens: number;
  estimatedOutputTokens: number;
  syncCostUsd: number;                 // baseline
  batchCostUsd: number;                // syncCost * 0.5
  savingsUsd: number;                  // syncCost - batchCost
  pricingSource: "exact-match" | "alias-match" | "fallback";
  warnings: string[];                  // e.g. "model not in pricing table"
}

// ── Retry plan ───────────────────────────────────────────────────────────────

export interface RetryPlan {
  failedCustomIds: string[];           // from error_file_id
  retriableLines: number;
  skippedLines: number;
  newJsonl: string;                    // ready to upload
}

// ── Provider catalog (D16 / D17) ─────────────────────────────────────────────

export const BATCH_SUPPORTED_PROVIDERS = ["openai", "anthropic", "gemini"] as const;
export type BatchProvider = (typeof BATCH_SUPPORTED_PROVIDERS)[number];

// ── Re-exports ───────────────────────────────────────────────────────────────

export type { SupportedBatchEndpoint };
export { SUPPORTED_BATCH_ENDPOINTS };

