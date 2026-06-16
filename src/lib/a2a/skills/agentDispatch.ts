/**
 * Agent Dispatch A2A Skill
 * Dispatches coding tasks to the substrate engine (forge or other drivers)
 */

import { spawn } from "child_process";
import { z } from "zod";
import { A2ATask } from "../taskManager";
import { A2ASkillResult } from "../taskExecution";

/**
 * Sanitize error messages to prevent leaking stack traces and file paths
 */
function sanitizeErrorMessage(message: unknown): string {
  let str = typeof message === "string" ? message : String(message ?? "");
  if (str.length > 4096) str = str.slice(0, 4096);
  const nl = str.indexOf("\n");
  const firstLine = nl >= 0 ? str.slice(0, nl) : str;
  const parts = firstLine.split(/(\s+)/);
  for (let i = 0; i < parts.length; i++) {
    if (/(\/|[A-Za-z]:)[^\s]*\.(ts|tsx|js|jsx|mjs|cjs)/i.test(parts[i])) {
      parts[i] = "<path>";
    }
  }
  return parts.join("");
}

// Zod schema for validating task input
const AgentDispatchParamsSchema = z.object({
  cwd: z.string().optional().default(process.cwd()),
  engine: z.enum(["forge", "codex", "claude"]).optional().default("forge"),
  timeout: z.number().optional().default(300000), // 5 minutes default
});

type AgentDispatchParams = z.infer<typeof AgentDispatchParamsSchema>;

/**
 * Parse metadata from A2A task to extract dispatch parameters
 */
function parseDispatchParams(metadata?: Record<string, unknown>): AgentDispatchParams {
  try {
    return AgentDispatchParamsSchema.parse(metadata || {});
  } catch (err) {
    if (err instanceof z.ZodError) {
      throw new Error(
        `Invalid dispatch parameters: ${err.errors.map((e) => `${e.path.join(".")}: ${e.message}`).join("; ")}`
      );
    }
    throw err;
  }
}

/**
 * Spawn subprocess to invoke substrate driver-cli
 */
function invokeSubstrate(
  args: string[],
  timeout: number,
  cwd: string
): Promise<{ success: boolean; stdout: string; stderr: string; exitCode: number }> {
  return new Promise((resolve) => {
    const substrateBin = process.env.SUBSTRATE_BIN || "cargo";
    const actualArgs =
      substrateBin === "cargo"
        ? [
            "run",
            "-q",
            "-p",
            "driver-cli",
            "--",
            ...args,
          ]
        : args;

    const proc = spawn(substrateBin, actualArgs, {
      cwd,
      timeout,
      stdio: ["pipe", "pipe", "pipe"],
    });

    let stdout = "";
    let stderr = "";

    proc.stdout?.on("data", (chunk) => {
      stdout += chunk.toString();
    });

    proc.stderr?.on("data", (chunk) => {
      stderr += chunk.toString();
    });

    const timeoutHandle = setTimeout(() => {
      proc.kill();
      resolve({
        success: false,
        stdout,
        stderr: `Timeout after ${timeout}ms`,
        exitCode: 124,
      });
    }, timeout + 1000); // Add 1s buffer to let process finish naturally

    proc.on("close", (code) => {
      clearTimeout(timeoutHandle);
      resolve({
        success: (code || 0) === 0,
        stdout,
        stderr,
        exitCode: code || 0,
      });
    });

    proc.on("error", (err) => {
      clearTimeout(timeoutHandle);
      resolve({
        success: false,
        stdout,
        stderr: err.message,
        exitCode: 1,
      });
    });
  });
}

/**
 * Execute agent-dispatch skill
 */
export async function executeAgentDispatch(task: A2ATask): Promise<A2ASkillResult> {
  // Validate and parse parameters
  let params: AgentDispatchParams;
  try {
    params = parseDispatchParams(task.metadata);
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    return {
      artifacts: [
        {
          type: "error",
          content: sanitizeErrorMessage(message),
        },
      ],
      metadata: {
        error: sanitizeErrorMessage(message),
        success: false,
      },
    };
  }

  // Extract the coding prompt from messages
  const prompt = task.messages
    .filter((m) => m.role === "user")
    .map((m) => m.content)
    .join("\n");

  if (!prompt.trim()) {
    const errMsg = "No user message content to dispatch";
    return {
      artifacts: [
        {
          type: "error",
          content: errMsg,
        },
      ],
      metadata: {
        error: errMsg,
        success: false,
      },
    };
  }

  // Build dispatch command arguments
  const args = [
    "dispatch",
    `--engine=${params.engine}`,
    `--cwd=${params.cwd}`,
    "--", // Separator before the prompt
    prompt,
  ];

  // Invoke substrate driver-cli
  const result = await invokeSubstrate(args, params.timeout, params.cwd);

  // Parse result
  if (!result.success) {
    const errorMsg = result.stderr || result.stdout || `Process exited with code ${result.exitCode}`;
    return {
      artifacts: [
        {
          type: "error",
          content: sanitizeErrorMessage(errorMsg),
        },
      ],
      metadata: {
        error: sanitizeErrorMessage(errorMsg),
        success: false,
        exitCode: result.exitCode,
      },
    };
  }

  // Try to parse JSON result from stdout
  let parsedResult: unknown;
  try {
    parsedResult = JSON.parse(result.stdout);
  } catch {
    // If not JSON, return raw stdout
    parsedResult = result.stdout;
  }

  return {
    artifacts: [
      {
        type: typeof parsedResult === "object" ? "data" : "text",
        content: typeof parsedResult === "string" ? parsedResult : JSON.stringify(parsedResult, null, 2),
      },
    ],
    metadata: {
      engine: params.engine,
      cwd: params.cwd,
      success: true,
      exitCode: result.exitCode,
    },
  };
}
