/**
 * Log export — the destination contract.
 *
 * A destination is a plugin: it declares a Zod config schema, a UI field descriptor
 * (so the dashboard renders its form without knowing the destination exists), which
 * config keys are secrets, and a client that can test connectivity and ship batches.
 *
 * Adding Datadog / Grafana / Sentry means adding one file under `destinations/` and
 * one line in `registry.ts`. Nothing in the runner, the REST layer or the UI changes.
 */

import type { ZodType } from "zod";

/**
 * One exported call log. Mirrors the shape the Logs dashboard tab renders
 * (`mapSummaryRow` in src/lib/usage/callLogs.ts) so what ships downstream is exactly
 * what the operator sees in the UI.
 *
 * Payload bodies (the `*Body` / `pipeline*` fields) are only populated when the
 * destination opts in with `includeBodies`. They carry prompt and completion content,
 * so they are off by default. When on, they are read through `getCallLogById` — the
 * same path the Logs detail pane uses — which means they arrive already PII-sanitized
 * and secret-redacted, and rows written under a `noLog` API key carry none.
 */
export interface LogExportRecord {
  id: string;
  timestamp: string | null;
  method: string | null;
  path: string | null;
  status: number | null;
  model: string | null;
  requestedModel: string | null;
  provider: string | null;
  providerDisplay: string | null;
  account: string | null;
  connectionId: string | null;
  duration: number | null;
  tokensIn: number | null;
  tokensOut: number | null;
  tokensCacheRead: number | null;
  tokensCacheWrite: number | null;
  tokensReasoning: number | null;
  tokensCompressed: number | null;
  cacheSource: string | null;
  requestType: string | null;
  sourceFormat: string | null;
  targetFormat: string | null;
  apiKeyId: string | null;
  apiKeyName: string | null;
  comboName: string | null;
  comboStepId: string | null;
  comboExecutionKey: string | null;
  errorSummary: string | null;
  errorType: string | null;
  correlationId: string | null;
  sessionTag: string | null;
  modelPinned: boolean;
  detailState: string | null;
  hasRequestBody: boolean;
  hasResponseBody: boolean;
  hasPipelineDetails: boolean;
  /** Client-side request payload (the prompt as the caller sent it). */
  requestBody: string | null;
  /** Response payload returned to the caller. */
  responseBody: string | null;
  /** Router's target/model decision for the call. */
  pipelineRouteDecision: string | null;
  /** Raw request exactly as the client sent it, before normalisation. */
  pipelineClientRequest: string | null;
  /** Request after translation into OmniRoute's internal OpenAI shape. */
  pipelineOpenaiRequest: string | null;
  /** Request as actually sent upstream, in the provider's own dialect. */
  pipelineProviderRequest: string | null;
  /** Raw upstream response, before translation back. */
  pipelineProviderResponse: string | null;
  /** Response as handed back to the client. */
  pipelineClientResponse: string | null;
  /** Pipeline-level error detail, when the call failed. */
  pipelineError: string | null;
  /** True when any of the above hit the destination's `maxBodyBytes` cap. */
  bodiesTruncated: boolean;
}

/** A call log row paired with its SQLite rowid, which is the export cursor. */
export interface LogExportSourceRow {
  rowId: number;
  record: LogExportRecord;
}

export type LogExportFieldType = "text" | "password" | "textarea" | "number" | "boolean" | "select";

/** UI descriptor for one config key — the dashboard renders the form from these. */
export interface LogExportConfigField {
  key: string;
  labelFallback: string;
  type: LogExportFieldType;
  required?: boolean;
  secret?: boolean;
  placeholder?: string;
  helpFallback?: string;
  options?: ReadonlyArray<{ value: string; labelFallback: string }>;
}

export interface LogExportTestResult {
  ok: boolean;
  /** Operator-facing detail, already sanitized. Never carries credentials. */
  detail: string;
}

/** The live side of a destination: everything that talks to the outside world. */
export interface LogExportClient {
  /** Probe credentials and reachability without writing rows. */
  test(): Promise<LogExportTestResult>;
  /** Create whatever the destination needs (table, dataset, index). Idempotent. */
  prepare(): Promise<void>;
  /** Ship one batch. Must throw on partial failure so the cursor does not advance. */
  send(records: readonly LogExportRecord[]): Promise<void>;
}

export interface LogExportDestinationType<TConfig = Record<string, unknown>> {
  /** Stable identifier persisted in `log_export_destinations.type`. */
  id: string;
  labelFallback: string;
  descriptionFallback: string;
  docsUrl?: string;
  /** Config keys holding secrets: encrypted at rest, never returned by the API. */
  secretFields: readonly string[];
  fields: readonly LogExportConfigField[];
  configSchema: ZodType<TConfig>;
  createClient(config: TConfig): LogExportClient;
}
