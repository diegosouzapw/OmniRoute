/**
 * Langfuse Plugin — emits generation traces for every LLM completion.
 *
 * Records model, provider, prompt, completion, token usage, latency,
 * and error details to Langfuse cloud or self-hosted.
 *
 * @module langfuse
 */

let langfuseClient = null;

/**
 * Lazy-init the Langfuse SDK. First trace request creates the client; the SDK
 * batches events and flushes per config.flushAt / config.flushInterval.
 */
async function getClient(config) {
  if (langfuseClient) return langfuseClient;
  if (!config.publicKey || !config.secretKey) return null;
  try {
    const { Langfuse } = await import("langfuse");
    langfuseClient = new Langfuse({
      publicKey: config.publicKey,
      secretKey: config.secretKey,
      baseUrl: config.host || "https://cloud.langfuse.com",
      flushAt: config.flushAt ?? 15,
      flushInterval: config.flushInterval ?? 10000,
    });
    return langfuseClient;
  } catch (err) {
    console.error("[langfuse] SDK import failed:", err.message);
    return null;
  }
}

function shouldSample(rate) {
  if (rate >= 1) return true;
  if (rate <= 0) return false;
  return Math.random() < rate;
}

function truncateBody(body, redact) {
  if (redact) return "[REDACTED]";
  if (body === undefined || body === null) return undefined;
  return body;
}

/**
 * onRequest — mark trace start, capture request metadata.
 */
export async function onRequest(ctx) {
  const config = ctx?.config || {};
  if (config.enabled === false) return;
  if (!shouldSample(config.sampleRate ?? 1)) return;
  if (ctx?.metadata) {
    ctx.metadata.__langfuseStart = Date.now();
    ctx.metadata.__langfuseSampled = true;
  }
}

/**
 * onResponse — emit a Langfuse generation event with prompt, completion, usage.
 */
export async function onResponse(ctx) {
  const config = ctx?.config || {};
  if (config.enabled === false) return;
  if (!ctx?.metadata?.__langfuseSampled) return;

  const client = await getClient(config);
  if (!client) return;

  const start = ctx.metadata.__langfuseStart || Date.now();
  const end = Date.now();
  const body = ctx?.body || {};
  const response = ctx?.response || {};
  const usage = response.usage || {};

  try {
    const trace = client.trace({
      name: `omniroute:${body.model || "unknown"}`,
      userId: ctx?.userId,
      metadata: {
        provider: ctx?.provider,
        requestId: ctx?.requestId,
        omnirouteVersion: ctx?.omnirouteVersion,
      },
    });
    trace.generation({
      name: "chat.completion",
      model: body.model || "unknown",
      modelParameters: {
        temperature: body.temperature,
        max_tokens: body.max_tokens,
        top_p: body.top_p,
      },
      input: truncateBody(body.messages, config.redactBody),
      output: truncateBody(response.choices?.[0]?.message, config.redactBody),
      usage: {
        promptTokens: usage.prompt_tokens,
        completionTokens: usage.completion_tokens,
        totalTokens: usage.total_tokens,
      },
      startTime: new Date(start),
      endTime: new Date(end),
    });
  } catch (err) {
    console.error("[langfuse] trace emit failed:", err.message);
  }
}

/**
 * onError — emit a failed generation with error details.
 */
export async function onError(ctx) {
  const config = ctx?.config || {};
  if (config.enabled === false) return;
  if (!ctx?.metadata?.__langfuseSampled) return;

  const client = await getClient(config);
  if (!client) return;

  const start = ctx.metadata.__langfuseStart || Date.now();
  const body = ctx?.body || {};
  const error = ctx?.error || {};

  try {
    const trace = client.trace({
      name: `omniroute:${body.model || "unknown"}`,
      userId: ctx?.userId,
      metadata: {
        provider: ctx?.provider,
        requestId: ctx?.requestId,
      },
    });
    trace.generation({
      name: "chat.completion",
      model: body.model || "unknown",
      input: truncateBody(body.messages, config.redactBody),
      level: "ERROR",
      statusMessage: error.message || String(error),
      startTime: new Date(start),
      endTime: new Date(),
    });
  } catch (err) {
    console.error("[langfuse] error trace emit failed:", err.message);
  }
}

/**
 * onShutdown — flush pending events before OmniRoute exits.
 */
export async function onShutdown() {
  if (!langfuseClient) return;
  try {
    await langfuseClient.shutdownAsync();
  } catch (err) {
    console.error("[langfuse] shutdown failed:", err.message);
  }
}
