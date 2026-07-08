/**
 * POST /api/skills/collect/chaos
 *
 * Chaos Mode — spawn multiple models across providers for parallel or collaborative
 * task execution. Each active provider contributes one model instance; all models
 * work on the same task simultaneously (parallel) or in a chain where each sees
 * the previous model's output (collaborative).
 *
 * Body (JSON):
 *   task: string                   // REQUIRED — the task/goal for all models
 *   providers?: string[]           // Optional filter — only these provider IDs
 *   mode?: "parallel" | "collaborative"  // Default: "parallel"
 *   systemPrompt?: string          // Optional custom system prompt
 *   stream?: boolean               // NOT YET IMPLEMENTED — reserved for SSE
 *
 * Returns:
 *   {
 *     task: string,
 *     mode: "parallel" | "collaborative",
 *     startedAt: ISO string,
 *     models: [{
 *       providerId: string,
 *       providerName: string,
 *       modelId: string,
 *       status: "success" | "error" | "skipped",
 *       content: string | null,
 *       error?: string,
 *       durationMs: number
 *     }],
 *     summary?: string  // collaborative mode only — final aggregated output
 *   }
 */
import { NextResponse } from "next/server";
import { z } from "zod";
import { getProviderConnections } from "@/models";
import { validateBody, isValidationFailure } from "@/shared/validation/helpers";
import { buildErrorBody, sanitizeErrorMessage } from "@omniroute/open-sse/utils/error";
import { validateApiKey } from "@/lib/localDb";

export const dynamic = "force-dynamic";

// ── Schema ───────────────────────────────────────────────────────────────────

const chaosSchema = z.object({
  task: z.string().min(1, "task is required").max(100_000, "task too long"),
  providers: z.array(z.string().min(1)).max(50).optional(),
  mode: z.enum(["parallel", "collaborative"]).default("parallel"),
  systemPrompt: z.string().max(10_000).optional(),
});

// ── Default system prompt for chaos model instances ──────────────────────────

const DEFAULT_CHAOS_SYSTEM_PROMPT = `You are one of several AI models working in CHAOS MODE.

Your job:
1. Analyze the user's task thoroughly
2. Produce the best possible response using your unique strengths
3. Be concise but complete — your output will be combined with other models' outputs
4. Do NOT refer to "other models" or "CHAOS MODE" in your response — just answer the task directly`;

const COLLABORATIVE_CHAOS_SYSTEM_PROMPT = `You are one of several AI models working in CHAOS MODE (collaborative).

Your job:
1. You will see the task AND the previous model's output
2. Build upon, refine, critique, or extend the previous work
3. Add new insights, fix issues, or provide an alternative perspective
4. Do NOT refer to "CHAOS MODE" or other models explicitly — just contribute your part naturally`;

// ── Internal chat dispatch ───────────────────────────────────────────────────

interface ProviderInfo {
  id: string;
  name: string;
  provider: string;
  defaultModel: string | null;
}

interface ModelResult {
  providerId: string;
  providerName: string;
  modelId: string;
  status: "success" | "error" | "skipped";
  content: string | null;
  error?: string;
  durationMs: number;
}

const OMNIROUTE_BASE = process.env.OMNIROUTE_INTERNAL_URL || "http://localhost:30129";

/**
 * Call OmniRoute's own /v1/chat/completions for a given provider+model.
 * We dispatch via fetch to the local server so the request goes through
 * the full OmniRoute pipeline (routing, auth, fallback, streaming).
 */
async function dispatchToModel(
  providerId: string,
  providerName: string,
  modelId: string,
  messages: { role: string; content: string }[],
  signal?: AbortSignal
): Promise<ModelResult> {
  const start = performance.now();
  try {
    // Use provider:model format — OmniRoute's routing resolves this to
    // the provider connection's actual model endpoint.
    const model = modelId || providerId;

    const body = {
      model,
      messages,
      stream: false,
      max_tokens: 4096,
    };

    const res = await fetch(`${OMNIROUTE_BASE}/v1/chat/completions`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
      signal: signal ?? AbortSignal.timeout(120_000),
    });

    if (!res.ok) {
      const errText = await res.text().catch(() => "unknown error");
      return {
        providerId,
        providerName,
        modelId,
        status: "error",
        content: null,
        error: `API ${res.status}: ${errText.slice(0, 500)}`,
        durationMs: Math.round(performance.now() - start),
      };
    }

    const data = await res.json();
    const content =
      data.choices?.[0]?.message?.content ?? data.choices?.[0]?.text ?? JSON.stringify(data);

    return {
      providerId,
      providerName,
      modelId,
      status: "success",
      content,
      durationMs: Math.round(performance.now() - start),
    };
  } catch (err: any) {
    const isAbort = err?.name === "AbortError" || err?.type === "aborted";
    return {
      providerId,
      providerName,
      modelId,
      status: "error",
      content: null,
      error: isAbort ? "timeout (120s)" : (err?.message ?? String(err)),
      durationMs: Math.round(performance.now() - start),
    };
  }
}

/**
 * Resolve the best model ID for a provider connection.
 * Prefers defaultModel, then uses the provider id itself (OmniRoute routing).
 */
function resolveModelId(conn: any): string {
  return conn.defaultModel || conn.provider;
}

// ── Main handler ─────────────────────────────────────────────────────────────

/**
 * Extract Bearer token from Authorization header.
 */
function extractBearerToken(request: Request): string | null {
  const auth = request.headers.get("Authorization");
  if (!auth || !auth.startsWith("Bearer ")) return null;
  return auth.slice(7).trim();
}

export async function POST(request: Request) {
  try {
    // ── API Key auth check ─────────────────────────────────────────────
    const bearerToken = extractBearerToken(request);
    if (!bearerToken) {
      return NextResponse.json(
        buildErrorBody(401, "Missing or invalid Authorization header — Bearer token required"),
        { status: 401 }
      );
    }

    const keyInfo = await validateApiKey(bearerToken);
    if (!keyInfo || !keyInfo.id) {
      return NextResponse.json(buildErrorBody(403, "Invalid API key"), { status: 403 });
    }

    // Check that this key has chaos mode enabled
    const { getApiKeyMetadata } = await import("@/lib/localDb");
    const metadata = await getApiKeyMetadata(bearerToken);
    if (!metadata || !metadata.chaosModeEnabled) {
      return NextResponse.json(
        buildErrorBody(
          403,
          "Chaos Mode is not enabled for this API key. Enable it in API Key settings."
        ),
        { status: 403 }
      );
    }

    const rawBody = await request.json();
    const validation = validateBody(chaosSchema, rawBody);
    if (isValidationFailure(validation)) {
      return NextResponse.json(buildErrorBody(400, validation.error.message), {
        status: 400,
      });
    }

    const { task, providers: providerFilter, mode, systemPrompt } = validation.data;

    // 1. Fetch all active provider connections
    const allConnections = await getProviderConnections().catch(() => [] as any[]);
    const active = (Array.isArray(allConnections) ? allConnections : []).filter(
      (c: any) => c.isActive !== false
    );

    if (active.length === 0) {
      return NextResponse.json(buildErrorBody(400, "No active provider connections found"), {
        status: 400,
      });
    }

    // 2. Filter by provider if requested
    let selected = active;
    if (providerFilter && providerFilter.length > 0) {
      const filterSet = new Set(providerFilter.map((p: string) => p.toLowerCase()));
      selected = active.filter((c: any) => filterSet.has((c.provider ?? "").toLowerCase()));
      if (selected.length === 0) {
        return NextResponse.json(
          buildErrorBody(
            400,
            `None of the specified providers are active: ${providerFilter.join(", ")}`
          ),
          { status: 400 }
        );
      }
    }

    // 3. Build provider list with resolved models (deduplicate by provider id)
    const providerMap = new Map<string, ProviderInfo>();
    for (const conn of selected) {
      const providerKey = conn.provider || conn.id;
      if (!providerMap.has(providerKey)) {
        providerMap.set(providerKey, {
          id: conn.id,
          name: conn.name || conn.provider || providerKey,
          provider: conn.provider || providerKey,
          defaultModel: conn.defaultModel || null,
        });
      }
    }
    const providers = Array.from(providerMap.values());

    // 4. Build messages
    const effectiveSystemPrompt =
      systemPrompt ||
      (mode === "collaborative" ? COLLABORATIVE_CHAOS_SYSTEM_PROMPT : DEFAULT_CHAOS_SYSTEM_PROMPT);

    // 5. Dispatch
    const startedAt = new Date().toISOString();
    let results: ModelResult[];

    if (mode === "parallel") {
      // All models run concurrently
      const tasks = providers.map((p) => {
        const modelId = resolveModelId(p);
        const messages = [
          { role: "system" as const, content: effectiveSystemPrompt },
          { role: "user" as const, content: task },
        ];
        return dispatchToModel(p.id, p.name, modelId, messages);
      });

      results = await Promise.all(tasks);
      // Sort: successes first, then errors
      results.sort((a, b) => {
        if (a.status === "success" && b.status !== "success") return -1;
        if (a.status !== "success" && b.status === "success") return 1;
        return a.durationMs - b.durationMs;
      });
    } else {
      // Collaborative mode: chain outputs through models
      results = [];
      let context = task;

      for (const p of providers) {
        const modelId = resolveModelId(p);
        const messages = [
          { role: "system" as const, content: effectiveSystemPrompt },
          { role: "user" as const, content: context },
        ];

        const result = await dispatchToModel(p.id, p.name, modelId, messages);
        results.push(result);

        if (result.status === "success" && result.content) {
          // Feed this model's output as context for the next
          context = `Task: ${task}\n\nPrevious model's output:\n${result.content}\n\n---\n\nPlease refine, extend, critique, or provide an alternative perspective on the above.`;
        }
      }
    }

    // 6. Build summary for collaborative mode
    let summary: string | undefined;
    if (mode === "collaborative") {
      const successfulOutputs = results
        .filter((r) => r.status === "success" && r.content)
        .map((r) => r.content!)
        .join("\n\n---\n\n");
      summary = successfulOutputs || undefined;
    }

    return NextResponse.json({
      task,
      mode,
      startedAt,
      totalProviders: providers.length,
      totalResults: results.length,
      models: results,
      ...(summary ? { summary } : {}),
    });
  } catch (err) {
    const msg = sanitizeErrorMessage(err);
    return NextResponse.json(buildErrorBody(500, msg), { status: 500 });
  }
}
