import { z } from "zod";
import { apiFetch, statusToExitCode } from "../api.mjs";
import { resolveActiveContextAsync } from "../contexts.mjs";

const identifier = (limit) =>
  z
    .string()
    .trim()
    .min(1)
    .max(limit)
    .regex(/^[^\s\x00-\x1f\x7f]+$/);
const positiveInteger = z.coerce.number().int().positive().max(Number.MAX_SAFE_INTEGER).optional();
const inputSchema = z
  .object({
    provider: identifier(120),
    modelId: identifier(240),
    connectionId: identifier(160),
    allowInference: z.literal(true),
    modelName: z
      .string()
      .trim()
      .min(1)
      .max(240)
      .regex(/^[^\x00-\x1f\x7f]+$/)
      .optional(),
    max_input_tokens: positiveInteger,
    max_output_tokens: positiveInteger,
    apiFormat: z.enum(["chat-completions", "responses"]).default("chat-completions"),
  })
  .transform((input) =>
    Object.fromEntries(Object.entries(input).filter(([, value]) => value !== undefined))
  );
const receiptSchema = z.object({
  schemaVersion: z.literal(1),
  persistenceVerified: z.literal(true),
  validation: z.object({
    id: z.string().uuid(),
    status: z.literal("passed"),
    provider: identifier(120),
    modelId: identifier(240),
    connectionId: identifier(160),
    validatedAt: z.string().datetime(),
    stages: z.object({
      generation: z.literal("passed"),
      toolCall: z.literal("passed"),
      continuation: z.literal("passed"),
    }),
  }),
});

function buildInput(modelId, options) {
  return inputSchema.safeParse({
    provider: options.provider,
    modelId,
    connectionId: options.connection,
    allowInference: true,
    modelName: options.name,
    max_input_tokens: options.maxInputTokens,
    max_output_tokens: options.maxOutputTokens,
    apiFormat: options.apiFormat,
  });
}

async function targetOptions(options, resolveContext) {
  let baseUrl = options.baseUrl;
  if (!baseUrl && options.context) {
    const context = await resolveContext(options.context);
    if (!context?.baseUrl) throw new Error("Unknown context");
    baseUrl = context.baseUrl;
  }
  if (baseUrl) {
    const url = new URL(baseUrl);
    if (
      !["http:", "https:"].includes(url.protocol) ||
      url.username ||
      url.password ||
      url.search ||
      url.hash
    ) {
      throw new Error("Invalid destination");
    }
  }
  return { baseUrl, context: options.context, apiKey: options.apiKey };
}

function checkedReceipt(value, input) {
  const parsed = receiptSchema.safeParse(value);
  if (!parsed.success) return null;
  const receipt = parsed.data;
  const { validation } = receipt;
  if (
    validation.provider !== input.provider ||
    validation.modelId !== input.modelId ||
    validation.connectionId !== input.connectionId
  )
    return null;
  return receipt;
}

async function readReceipt(response, timeoutMs) {
  if (!response.body) throw new Error("Missing receipt");
  const reader = response.body.getReader();
  let timer;
  const timeout = new Promise((_, reject) => {
    timer = setTimeout(() => reject(new Error("Receipt deadline")), timeoutMs);
  });
  const body = async () => {
    const decoder = new TextDecoder();
    let text = "";
    let bytes = 0;
    while (true) {
      const chunk = await reader.read();
      if (chunk.done) break;
      bytes += chunk.value.byteLength;
      if (bytes > 65_536) throw new Error("Receipt exceeds limit");
      text += decoder.decode(chunk.value, { stream: true });
    }
    return JSON.parse(text + decoder.decode());
  };
  try {
    return await Promise.race([body(), timeout]);
  } finally {
    clearTimeout(timer);
    void reader.cancel().catch(() => {});
    reader.releaseLock();
  }
}

/** No automatic retry: a lost response may follow successful model persistence. */
export async function runModelValidation(modelId, options = {}, dependencies = {}) {
  const writeOut = dependencies.writeOut ?? console.log;
  const writeError = dependencies.writeError ?? console.error;
  const input = buildInput(modelId, options);
  if (!input.success) {
    writeError(
      "Invalid model, provider, connection, format or token limits. Use models test-add --help."
    );
    return 2;
  }
  if (options.dryRun) {
    writeOut(
      JSON.stringify({ dryRun: true, allowInferenceRequired: true, request: input.data }, null, 2)
    );
    return 0;
  }
  if (options.allowInference !== true || options.yes !== true) {
    writeError(
      "Test & Add may incur provider charges and persists a model. Pass --allow-inference and --yes to confirm."
    );
    return 2;
  }
  let target;
  try {
    target = await targetOptions(options, dependencies.resolveContext ?? resolveActiveContextAsync);
  } catch {
    writeError("Invalid destination or unavailable context. No validation request was sent.");
    return 2;
  }
  try {
    const response = await (dependencies.fetch ?? apiFetch)(
      "/api/provider-models/validate-and-add",
      {
        ...target,
        method: "POST",
        body: input.data,
        retry: false,
        redirect: "error",
        timeout: 95000,
        acceptNotOk: true,
        verbose: false,
      }
    );
    if (response.status !== 201) {
      void response.body?.cancel().catch(() => {});
      writeError(
        `Test & Add was not verified (HTTP ${response.status}). Check model state before retrying.`
      );
      return response.ok ? 1 : statusToExitCode(response.status);
    }
    const receipt = checkedReceipt(
      await readReceipt(response, dependencies.receiptTimeoutMs ?? 5000),
      input.data
    );
    if (!receipt) {
      writeError(
        "Test & Add receipt did not match the requested connection/model or all required stages. Persistence is not verified."
      );
      return 1;
    }
    writeOut(JSON.stringify(receipt, null, options.output === "jsonl" ? undefined : 2));
    return 0;
  } catch {
    writeError(
      "Test & Add outcome is not verified. Check model state before retrying; no automatic retry was made."
    );
    return 1;
  }
}

export function registerModelValidation(program) {
  const models = program.commands.find((command) => command.name() === "models");
  if (!models) throw new Error("Register models before model validation");
  models
    .command("test-add <model>")
    .description(
      "Validate an OpenAI-compatible model on one strict connection, then add it after a synthetic tool round-trip"
    )
    .requiredOption("--provider <id>", "Exact provider id")
    .requiredOption("--connection <id>", "Full connection id; no fallback")
    .option("--name <name>", "Display name")
    .option("--max-input-tokens <count>", "User-supplied positive input context limit")
    .option("--max-output-tokens <count>", "User-supplied positive output token limit")
    .option("--api-format <format>", "chat-completions or responses", "chat-completions")
    .option("--context <name>", "Existing local or remote context")
    .option("--base-url <url>", "Explicit OmniRoute management base URL")
    .option("--allow-inference", "Allow test requests that may incur provider charges")
    .option("--yes", "Confirm persistence after successful validation")
    .option("--dry-run", "Preview only; no requests or persistence")
    .option("--json", "Output the sanitized verification receipt as JSON")
    .action(async (model, _options, command) => {
      const code = await runModelValidation(model, command.optsWithGlobals());
      if (code !== 0) process.exitCode = code;
    });
}
