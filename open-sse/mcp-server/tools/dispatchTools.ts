/**
 * Substrate Dispatch Tools — Unified tier-based dispatch for Phenotype agent workflows.
 *
 * Wraps substrate HTTP API (`POST /v1/dispatch`) which routes prompts through
 * configured engines (forge, codex, claude) with model-tier routing (heavy/main/worker).
 *
 * Usage:
 *   substrate_dispatch(prompt, tier?, engine?, cwd?)
 *
 * Requirements:
 *   SUBSTRATE_HTTP_URL env var (e.g., http://localhost:8000)
 */

interface McpToolExtraLike {
  name: string;
  description: string;
  inputSchema: Record<string, unknown>;
  handler: (input: Record<string, unknown>, extra?: Record<string, unknown>) => Promise<object>;
}

const SUBSTRATE_HTTP_URL = process.env.SUBSTRATE_HTTP_URL || "";

interface DispatchRequest {
  prompt: string;
  tier?: "heavy" | "main" | "worker" | string;
  engine?: "forge" | "codex" | "claude" | "agentapi" | string;
  cwd?: string;
  mode?: "background" | "foreground" | "in_process";
}

interface DispatchResponse {
  text: string;
  artifacts: Array<{ name: string; uri: string }>;
  pr_urls: string[];
  status: "submitted" | "running" | "completed" | "failed";
  error?: string;
}

async function callSubstrateApi(path: string, body: object): Promise<object> {
  if (!SUBSTRATE_HTTP_URL) {
    throw new Error(
      "SUBSTRATE_HTTP_URL environment variable not set. Set it to substrate HTTP server URL (e.g., http://localhost:8000)",
    );
  }

  const url = `${SUBSTRATE_HTTP_URL}${path}`;
  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
    signal: AbortSignal.timeout(120000), // 2 min timeout for long-running tasks
  });

  if (!response.ok) {
    const text = await response.text().catch(() => "Unknown error");
    throw new Error(`Substrate API [${response.status}]: ${text}`);
  }

  return response.json();
}

async function handleSubstrateDispatch(
  prompt: string,
  tier?: string,
  engine?: string,
  cwd?: string,
): Promise<object> {
  const req: DispatchRequest = { prompt };

  if (tier) req.tier = tier;
  if (engine) req.engine = engine;
  if (cwd) req.cwd = cwd;

  return callSubstrateApi("/v1/dispatch", req);
}

async function handleSubstratePlan(
  prompt: string,
  engine?: string,
  cwd?: string,
): Promise<object> {
  const req: DispatchRequest = { prompt };

  if (cwd) req.cwd = cwd;

  if (engine) req.engine = engine;

  return callSubstrateApi("/v1/plan", req);
}

/**
 * Health check: verify substrate HTTP server is reachable.
 */
async function handleSubstrateHealth(): Promise<object> {
  if (!SUBSTRATE_HTTP_URL) {
    throw new Error(
      "SUBSTRATE_HTTP_URL environment variable not set. Set it to substrate HTTP server URL (e.g., http://localhost:8000)",
    );
  }

  const url = `${SUBSTRATE_HTTP_URL}/healthz`;
  const response = await fetch(url, {
    method: "GET",
    signal: AbortSignal.timeout(10000),
  });

  if (!response.ok) {
    const text = await response.text().catch(() => "Unknown error");
    throw new Error(`Substrate health check failed [${response.status}]: ${text}`);
  }

  return response.json();
}

export const dispatchTools: McpToolExtraLike[] = [
  {
    name: "substrate_dispatch",
    description:
      "Dispatch a prompt to substrate with optional tier-based model routing (heavy=reasoning, main=standard, worker=fast). Returns task status and artifacts.",
    inputSchema: {
      type: "object",
      properties: {
        prompt: {
          type: "string",
          description: "The prompt, task description, or codebase instruction to dispatch.",
        },
        tier: {
          type: "string",
          enum: ["heavy", "main", "worker"],
          description:
            "Model tier: heavy (gpt-5.5 reasoning), main (gpt-5.4-mini), worker (codex spark). Defaults to auto.",
        },
        engine: {
          type: "string",
          enum: ["forge", "codex", "claude", "agentapi"],
          description: "Execution engine. Defaults to forge.",
        },
        cwd: {
          type: "string",
          description: "Working directory for execution context (optional).",
        },
      },
      required: ["prompt"],
    },
    handler: async (
      input: Record<string, unknown>,
      extra?: Record<string, unknown>,
    ): Promise<object> => {
      const { prompt, tier, engine, cwd } = input;
      return handleSubstrateDispatch(
        String(prompt),
        tier ? String(tier) : undefined,
        engine ? String(engine) : undefined,
        cwd ? String(cwd) : undefined,
      );
    },
  },
  {
    name: "substrate_plan",
    description:
      "Invoke substrate planner to generate task plan without execution. Returns structured plan for review before running dispatch.",
    inputSchema: {
      type: "object",
      properties: {
        prompt: {
          type: "string",
          description: "Task description or request to plan.",
        },
        engine: {
          type: "string",
          enum: ["forge", "codex", "claude", "agentapi"],
          description: "Planner engine. Defaults to claude.",
        },
        cwd: {
          type: "string",
          description: "Working directory context (optional).",
        },
      },
      required: ["prompt"],
    },
    handler: async (
      input: Record<string, unknown>,
      extra?: Record<string, unknown>,
    ): Promise<object> => {
      const { prompt, engine, cwd } = input;
      return handleSubstratePlan(
        String(prompt),
        engine ? String(engine) : undefined,
        cwd ? String(cwd) : undefined,
      );
    },
  },
  {
    name: "substrate_health",
    description: "Health check: verify substrate HTTP server is reachable and operational.",
    inputSchema: {
      type: "object",
      properties: {},
    },
    handler: async (
      _input: Record<string, unknown>,
      extra?: Record<string, unknown>,
    ): Promise<object> => {
      return handleSubstrateHealth();
    },
  },
];
