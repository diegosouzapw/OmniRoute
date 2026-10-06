import { apiFetch, statusToExitCode } from "../api.mjs";

export class ModelCommandError extends Error {
  constructor(message, exitCode = 2) {
    super(message);
    this.exitCode = exitCode;
  }
}

export async function modelRequest(path, opts, init = {}) {
  let response;
  try {
    response = await apiFetch(path, {
      ...opts,
      ...init,
      retry: false,
      timeout: opts.timeout ?? 30000,
      redirect: "error",
      acceptNotOk: true,
    });
  } catch (error) {
    throw new ModelCommandError(
      "Unable to reach the selected OmniRoute server.",
      error.exitCode === 124 ? 124 : 1
    );
  }
  if (!response.ok) {
    const error = new ModelCommandError(
      `Model request failed (HTTP ${response.status}).`,
      statusToExitCode(response.status)
    );
    error.status = response.status;
    throw error;
  }
  try {
    return await response.json();
  } catch {
    throw new ModelCommandError("The server returned an invalid model response.", 1);
  }
}

export async function loadModelCatalog(opts = {}) {
  let data;
  try {
    data = await modelRequest("/api/v1/models", opts);
  } catch (error) {
    if (![404, 405, 501].includes(error.status)) throw error;
    data = await modelRequest("/api/models", opts);
  }
  const models = Array.isArray(data) ? data : (data?.data ?? data?.models);
  if (!Array.isArray(models)) throw new ModelCommandError("Invalid model catalog.", 1);
  return models.filter((model) => model && typeof model === "object").map(publicModel);
}

// Public model metadata only; never forward credentials or compatibility headers.
const PUBLIC_FIELDS = [
  "id",
  "name",
  "object",
  "created",
  "owned_by",
  "provider",
  "description",
  "source",
  "context_length",
  "contextWindow",
  "contextWindowOverride",
  "contextWindowOverrideSource",
  "max_input_tokens",
  "max_output_tokens",
  "inputTokenLimit",
  "outputTokenLimit",
  "apiFormat",
  "supportedEndpoints",
  "targetFormat",
  "supportsVision",
  "supports_vision",
  "supports_tools",
  "supports_reasoning",
  "modelType",
  "isFree",
  "dimensions",
  "root",
  "parent",
  "type",
  "free",
  "custom",
  "api_format",
  "supported_endpoints",
  "input_modalities",
  "output_modalities",
  "supported_parameters",
  "supportedInputTypes",
];

export function publicModel(model) {
  const result = {};
  for (const field of PUBLIC_FIELDS) {
    const value = model?.[field];
    if (value === null || ["string", "number", "boolean"].includes(typeof value))
      result[field] = value;
    else if (Array.isArray(value) && value.every((item) => typeof item === "string"))
      result[field] = value;
  }
  if (model?.capabilities && typeof model.capabilities === "object") {
    result.capabilities = Object.fromEntries(
      Object.entries(model.capabilities).filter(
        ([key, value]) =>
          [
            "vision",
            "reasoning",
            "tool_calling",
            "structured_output",
            "streaming",
            "audio",
            "video",
          ].includes(key) && typeof value === "boolean"
      )
    );
  }
  result.id = String(model?.id || model?.name || "unknown");
  result.provider = String(model?.provider || model?.owned_by || "unknown");
  result.contextWindow =
    result.contextWindowOverride ??
    result.context_length ??
    result.max_input_tokens ??
    result.inputTokenLimit ??
    result.contextWindow ??
    "-";
  return result;
}
