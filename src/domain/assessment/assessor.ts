/**
 * Assessor — Probes provider/model pairs to determine working status and performance.
 *
 * Sends lightweight chat completion requests through each provider connection
 * and records success/failure, latency, and capability detection.
 *
 * @module domain/assessment/assessor
 */

import type {
  ModelAssessment,
  AssessmentStatus,
  ProbeLevel,
  AssessmentConfig,
  AssessmentRun,
  AssessmentScope,
  AssessmentTrigger,
} from "./types";
import { DEFAULT_ASSESSMENT_CONFIG, PROBE_MESSAGES, PROBE_MAX_TOKENS } from "./types";

interface ProbeResult {
  status: AssessmentStatus;
  latencyMs: number;
  error?: string;
  supportsStreaming?: boolean;
  content?: string;
}

export class Assessor {
  private config: AssessmentConfig;
  private assessments: Map<string, ModelAssessment> = new Map();
  private apiKey: string;
  private baseUrl: string;

  constructor(
    apiKey: string,
    baseUrl: string = "http://localhost:20128/v1",
    config: Partial<AssessmentConfig> = {}
  ) {
    this.apiKey = apiKey;
    this.baseUrl = baseUrl;
    this.config = { ...DEFAULT_ASSESSMENT_CONFIG, ...config };
  }

  async probeModel(
    providerId: string,
    modelId: string,
    level: ProbeLevel = "quick"
  ): Promise<ProbeResult> {
    const messages = PROBE_MESSAGES[level];
    const maxTokens = PROBE_MAX_TOKENS[level];
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), this.config.probeTimeoutMs);

    try {
      const start = Date.now();
      const response = await fetch(`${this.baseUrl}/chat/completions`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${this.apiKey}`,
        },
        body: JSON.stringify({
          model: `${providerId}/${modelId}`,
          messages,
          max_tokens: maxTokens,
          stream: false,
        }),
        signal: controller.signal,
      });

      const latencyMs = Date.now() - start;

      if (response.status === 401 || response.status === 403) {
        return { status: "auth_error", latencyMs, error: `Auth failed: ${response.status}` };
      }

      if (response.status === 429) {
        return { status: "rate_limited", latencyMs, error: "Rate limited" };
      }

      if (response.status === 400) {
        const body = await response.text();
        return { status: "broken", latencyMs, error: `Bad request: ${body.slice(0, 200)}` };
      }

      if (!response.ok) {
        return { status: "broken", latencyMs, error: `HTTP ${response.status}` };
      }

      const data = await response.json();
      const content = data.choices?.[0]?.message?.content?.trim() ?? "";
      const supportsStreaming = data.usage?.completion_tokens > 0;

      return { status: "working", latencyMs, content, supportsStreaming };
    } catch (err) {
      if (err.name === "AbortError") {
        return {
          status: "timeout",
          latencyMs: this.config.probeTimeoutMs,
          error: "Probe timed out",
        };
      }
      return { status: "broken", latencyMs: 0, error: err.message };
    } finally {
      clearTimeout(timeout);
    }
  }

  async assessModel(providerId: string, modelId: string): Promise<ModelAssessment> {
    const id = `${providerId}/${modelId}`;
    const existing = this.assessments.get(id);
    const now = new Date().toISOString();

    const probeResults: ProbeResult[] = [];

    for (const level of ["quick", "standard"] as ProbeLevel[]) {
      const result = await this.probeModel(providerId, modelId, level);
      probeResults.push(result);
      if (result.status === "auth_error" || result.status === "broken") break;
    }

    const bestResult = probeResults.find((r) => r.status === "working") ?? probeResults[0];
    const latencies = probeResults.filter((r) => r.status === "working").map((r) => r.latencyMs);

    const assessment: ModelAssessment = {
      id,
      modelId,
      providerId,
      status: bestResult.status,
      latencyP50: latencies.length > 0 ? percentile(latencies, 50) : null,
      latencyP95: latencies.length > 0 ? percentile(latencies, 95) : null,
      successRate: probeResults.filter((r) => r.status === "working").length / probeResults.length,
      supportsVision: false,
      supportsToolCall: false,
      supportsStreaming: bestResult.supportsStreaming ?? false,
      supportsStructuredOutput: false,
      maxContextWindow: null,
      maxOutputTokens: null,
      categories: [],
      fitnessScores: {} as Record<string, number>,
      tier: "balanced",
      lastTested: now,
      lastError: bestResult.error ?? null,
      consecutiveFails: bestResult.status === "working" ? 0 : (existing?.consecutiveFails ?? 0) + 1,
      probeCount: (existing?.probeCount ?? 0) + probeResults.length,
      createdAt: existing?.createdAt ?? now,
      updatedAt: now,
    };

    this.assessments.set(id, assessment);
    return assessment;
  }

  async runAssessment(
    models: Array<{ providerId: string; modelId: string }>,
    trigger: AssessmentTrigger = "on_demand"
  ): Promise<AssessmentRun> {
    const run: AssessmentRun = {
      id: crypto.randomUUID(),
      startedAt: new Date().toISOString(),
      completedAt: null,
      modelsTested: 0,
      modelsPassed: 0,
      modelsFailed: 0,
      modelsRateLimited: 0,
      durationMs: null,
      trigger,
      createdAt: new Date().toISOString(),
    };

    const start = Date.now();

    for (const { providerId, modelId } of models) {
      const assessment = await this.assessModel(providerId, modelId);
      run.modelsTested++;
      if (assessment.status === "working") run.modelsPassed++;
      else if (assessment.status === "rate_limited") run.modelsRateLimited++;
      else run.modelsFailed++;
    }

    run.completedAt = new Date().toISOString();
    run.durationMs = Date.now() - start;

    return run;
  }

  getAssessment(providerId: string, modelId: string): ModelAssessment | undefined {
    return this.assessments.get(`${providerId}/${modelId}`);
  }

  getAllAssessments(): ModelAssessment[] {
    return Array.from(this.assessments.values());
  }

  getWorkingModels(): ModelAssessment[] {
    return this.getAllAssessments().filter((a) => a.status === "working");
  }
}

function percentile(values: number[], p: number): number {
  if (values.length === 0) return 0;
  const sorted = [...values].sort((a, b) => a - b);
  const idx = Math.ceil((p / 100) * sorted.length) - 1;
  return sorted[Math.max(0, idx)];
}
