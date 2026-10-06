"use strict";

const CLOSE_BEHAVIOR_KEEP_LOADED = "keep-loaded";
const CLOSE_BEHAVIOR_UNLOAD = "unload";

function normalizeCloseBehavior(value) {
  if (value === CLOSE_BEHAVIOR_KEEP_LOADED || value === CLOSE_BEHAVIOR_UNLOAD) return value;
  return null;
}

function resolveRendererUrl(currentUrl, serverUrl) {
  try {
    const current = new URL(currentUrl);
    const server = new URL(serverUrl);
    return current.origin === server.origin ? current.href : server.href;
  } catch {
    return serverUrl;
  }
}

module.exports = {
  CLOSE_BEHAVIOR_KEEP_LOADED,
  CLOSE_BEHAVIOR_UNLOAD,
  normalizeCloseBehavior,
  resolveRendererUrl,
};
