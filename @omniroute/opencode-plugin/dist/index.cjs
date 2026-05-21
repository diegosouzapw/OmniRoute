'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

// src/index.ts
var OMNIROUTE_PROVIDER_KEY = "omniroute";
var DEFAULT_MODEL_CACHE_TTL_MS = 3e5;
function resolveOmniRoutePluginOptions(opts) {
  const providerId = opts?.providerId ?? OMNIROUTE_PROVIDER_KEY;
  const displayName = opts?.displayName ?? (providerId === OMNIROUTE_PROVIDER_KEY ? "OmniRoute" : `OmniRoute (${providerId})`);
  const modelCacheTtl = typeof opts?.modelCacheTtl === "number" && opts.modelCacheTtl > 0 ? opts.modelCacheTtl : DEFAULT_MODEL_CACHE_TTL_MS;
  return {
    providerId,
    displayName,
    modelCacheTtl,
    baseURL: opts?.baseURL
  };
}
var OmniRoutePlugin = async (_ctx) => {
  return {
    // hooks land here in T-02 / T-03 / T-04 / T-06 / T-07
  };
};
var index_default = OmniRoutePlugin;

exports.DEFAULT_MODEL_CACHE_TTL_MS = DEFAULT_MODEL_CACHE_TTL_MS;
exports.OMNIROUTE_PROVIDER_KEY = OMNIROUTE_PROVIDER_KEY;
exports.OmniRoutePlugin = OmniRoutePlugin;
exports.default = index_default;
exports.resolveOmniRoutePluginOptions = resolveOmniRoutePluginOptions;
