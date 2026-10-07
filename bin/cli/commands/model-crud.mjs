import { z } from "zod";
import { emit } from "../output.mjs";
import { ModelCommandError, modelRequest, publicModel } from "./model-api.mjs";

// Runtime CLI subset of providerModelMutationSchema. The API validates again.
const identity = z.object({
  provider: z.string().trim().min(1).max(120),
  modelId: z.string().trim().min(1).max(240),
});
const patchSchema = z.object({
  modelName: z.string().trim().min(1).max(240).optional(),
  apiFormat: z
    .enum([
      "chat-completions",
      "responses",
      "embeddings",
      "rerank",
      "audio-transcriptions",
      "audio-speech",
      "images-generations",
      "video",
    ])
    .optional(),
  max_input_tokens: z.number().int().positive().safe().optional(),
  max_output_tokens: z.number().int().positive().safe().optional(),
  contextWindowOverride: z.number().int().positive().safe().nullable().optional(),
});

const FORMAT_ENDPOINT = {
  "chat-completions": "chat",
  responses: "chat",
  embeddings: "embeddings",
  rerank: "rerank",
  "audio-transcriptions": "audio-transcriptions",
  "audio-speech": "audio-speech",
  "images-generations": "images",
  video: "videos",
};

function payloadFor(action, provider, modelId, opts) {
  const id = identity.safeParse({ provider, modelId });
  const patch = {};
  if (opts.name !== undefined) patch.modelName = opts.name;
  if (opts.apiFormat !== undefined) patch.apiFormat = opts.apiFormat;
  if (opts.contextWindow !== undefined) {
    patch[action === "add" ? "max_input_tokens" : "contextWindowOverride"] = Number(
      opts.contextWindow
    );
  }
  if (opts.clearContextWindow) {
    if (opts.contextWindow !== undefined || action !== "edit")
      throw new ModelCommandError("Invalid context-window options.");
    patch.contextWindowOverride = null;
  }
  if (opts.maxOutputTokens !== undefined) patch.max_output_tokens = Number(opts.maxOutputTokens);
  const parsed = patchSchema.safeParse(patch);
  if (!id.success || !parsed.success)
    throw new ModelCommandError("Invalid model identifier or metadata.");
  if (action === "edit" && Object.keys(patch).length === 0)
    throw new ModelCommandError("Provide at least one metadata change.");
  return {
    ...id.data,
    ...parsed.data,
    ...(parsed.data.apiFormat
      ? { supportedEndpoints: [FORMAT_ENDPOINT[parsed.data.apiFormat]] }
      : {}),
    ...(action === "add" ? { source: "manual" } : {}),
  };
}

export async function listManualModels(provider, opts = {}) {
  const parsed = identity.shape.provider.safeParse(provider);
  if (!parsed.success) throw new ModelCommandError("Invalid provider identifier.");
  const data = await modelRequest(
    `/api/provider-models?${new URLSearchParams({ provider: parsed.data })}`,
    opts
  );
  if (!Array.isArray(data?.models)) throw new ModelCommandError("Invalid manual model catalog.", 1);
  return data.models;
}

export async function modifyManualModel(action, provider, modelId, opts = {}) {
  if (!["add", "edit", "remove"].includes(action))
    throw new ModelCommandError("Invalid model operation.");
  if (action === "remove" && !opts.yes && !opts.dryRun)
    throw new ModelCommandError("Removal requires --yes (or --dry-run).");
  const body = payloadFor(action, provider, modelId, opts);
  const before = (await listManualModels(body.provider, opts)).find(
    (model) => model.id === body.modelId
  );
  if (action === "add" && before)
    throw new ModelCommandError("The custom model already exists; use edit.");
  if (action !== "add" && (!before || (before.source && before.source !== "manual"))) {
    throw new ModelCommandError("The selected model is not an existing manual model.");
  }
  if (opts.dryRun)
    return { action, dryRun: true, provider: body.provider, modelId: body.modelId, changes: body };
  const query = new URLSearchParams({
    provider: body.provider,
    model: body.modelId,
    resetOverride: "true",
  });
  await modelRequest(
    action === "remove" ? `/api/provider-models?${query}` : "/api/provider-models",
    opts,
    {
      method: { add: "POST", edit: "PUT", remove: "DELETE" }[action],
      ...(action === "remove" ? {} : { body }),
    }
  );
  const after = (await listManualModels(body.provider, opts)).find(
    (model) => model.id === body.modelId
  );
  const mapping = {
    modelName: "name",
    max_input_tokens: "inputTokenLimit",
    max_output_tokens: "outputTokenLimit",
  };
  const mismatch =
    action === "remove"
      ? Boolean(after)
      : !after ||
        Object.entries(body).some(([key, value]) => {
          if (["provider", "modelId"].includes(key)) return false;
          const actual = after[mapping[key] || key];
          if (Array.isArray(value)) return JSON.stringify(actual) !== JSON.stringify(value);
          return value === null ? actual != null : actual !== value;
        });
  if (mismatch)
    throw new ModelCommandError(
      "Model readback did not confirm the requested change; inspect the server before retrying.",
      1
    );
  return {
    action,
    persistenceVerified: true,
    inferenceValidation: "not-run",
    provider: body.provider,
    modelId: body.modelId,
    ...(after ? { model: publicModel({ ...after, provider: body.provider }) } : {}),
  };
}

export function modelMutationAction(action) {
  return async (provider, modelId, options, cmd) => {
    try {
      const opts = { ...cmd.optsWithGlobals(), ...options };
      emit(await modifyManualModel(action, provider, modelId, opts), {
        ...opts,
        output: opts.output || "json",
      });
    } catch (error) {
      console.error(error instanceof ModelCommandError ? error.message : "Model operation failed.");
      process.exitCode = error.exitCode || 1;
    }
  };
}

export async function manualListAction(provider, options, cmd) {
  const opts = { ...cmd.optsWithGlobals(), ...options };
  try {
    emit(
      (await listManualModels(provider, opts))
        .filter((model) => !model.source || model.source === "manual")
        .map((model) => publicModel({ ...model, provider })),
      { ...opts, output: opts.output || "json" }
    );
  } catch (error) {
    console.error(
      error instanceof ModelCommandError ? error.message : "Unable to list manual models."
    );
    process.exitCode = error.exitCode || 1;
  }
}
