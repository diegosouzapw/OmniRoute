/**
 * Smart Router Plugin — demonstrates dynamic model routing via onRequest.
 *
 * onModelSelect is NOT a supported hook in the plugin system. Instead, this
 * plugin uses onRequest to intercept the request body.model field and
 * rewrite it when the prompt exceeds the configured token threshold.
 *
 * To test: activate the plugin and send a long prompt to an expensive model.
 * The plugin will rewrite body.model to your configured fallback model
 * before the request reaches the executor.
 *
 * @module smart-router
 */

export function onRequest(ctx) {
  const config = ctx?.config || {};
  const fallback = config.fallbackModel || "gpt-3.5-turbo";
  const maxChars = (config.maxTokensForExpensiveModel || 1000) * 4;
  const body = ctx?.body || {};
  const messages = body.messages || [];
  const promptText = messages.map((m) => m.content || "").join(" ");
  const originalModel = body.model || "unknown";

  // Skip if body already targets the fallback model
  if (body.model === fallback) return;

  // If the prompt exceeds the threshold, rewrite the model
  if (promptText.length > maxChars) {
    console.log(`[smart-router] Prompt length ${promptText.length} > ${maxChars}. Rewriting model: ${originalModel} -> ${fallback}`);
    return { body: { ...body, model: fallback } };
  }

  console.log(`[smart-router] Prompt length ${promptText.length} <= ${maxChars}. Keeping model: ${originalModel}`);
}