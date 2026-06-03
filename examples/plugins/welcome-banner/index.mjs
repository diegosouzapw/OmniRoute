/**
 * Welcome Banner Plugin — PoC demonstrating the OmniRoute plugin system.
 *
 * Adds a banner message to request metadata on every request.
 * Logs a delivery confirmation on every response.
 *
 * @module welcome-banner
 */

/**
 * onRequest hook — injects banner text into request metadata.
 *
 * @param {object} ctx - Plugin context
 * @param {object} [ctx.config] - Plugin configuration
 * @param {object} [ctx.metadata] - Request metadata (mutable)
 */
export function onRequest(ctx) {
  const config = ctx?.config || {};
  const enabled = config.enabled !== false; // default true
  if (!enabled) return;

  const bannerText = config.bannerText || "Welcome to OmniRoute!";
  if (ctx.metadata) {
    ctx.metadata.banner = bannerText;
  }
}

/**
 * onResponse hook — fire-and-forget banner delivery log.
 *
 * @param {object} ctx - Plugin context
 * @param {object} response - Upstream response
 */
export function onResponse() {
  // No-op — banner is request-side only
}
