/**
 * OAuth Provider Configurations and Handlers
 *
 * This file re-exports from the modular providers/ directory.
 * Each provider is now in its own file for maintainability.
 *
 * @see ./providers/index.js for the registry
 */

import { generatePKCE, generateState } from "./utils/pkce";
import { PROVIDERS } from "./providers/index";

/**
 * Get provider handler
 */
export function getProvider(name) {
  const provider = PROVIDERS[name];
  if (!provider) {
    throw new Error(`Unknown provider: ${name}`);
  }
  return provider;
}

/**
 * Get all provider names
 */
export function getProviderNames() {
  return Object.keys(PROVIDERS);
}

/**
 * Generate auth data for a provider
 */
export function generateAuthData(providerName, redirectUri) {
  const provider = getProvider(providerName);
  const { codeVerifier, codeChallenge, state } = generatePKCE();

  let authUrl;
  if (provider.flowType === "device_code") {
    authUrl = null;
  } else if (provider.flowType === "authorization_code_pkce") {
    authUrl = provider.buildAuthUrl(provider.config, redirectUri, state, codeChallenge);
  } else {
    authUrl = provider.buildAuthUrl(provider.config, redirectUri, state);
  }

  return {
    authUrl,
    state,
    codeVerifier,
    codeChallenge,
    redirectUri,
    flowType: provider.flowType,
    fixedPort: provider.fixedPort,
    callbackPath: provider.callbackPath || "/callback",
  };
}

/**
 * Exchange code for tokens
 */
export async function exchangeTokens(providerName, code, redirectUri, codeVerifier, state) {
  const provider = getProvider(providerName);

  const tokens = await provider.exchangeToken(
    provider.config,
    code,
    redirectUri,
    codeVerifier,
    state
  );

  let extra = null;
  if (provider.postExchange) {
    extra = await provider.postExchange(tokens);
  }

  return provider.mapTokens(tokens, extra);
}

/**
 * Request device code (for device_code flow)
 */
export async function requestDeviceCode(providerName, codeChallenge) {
  const provider = getProvider(providerName);
  if (provider.flowType !== "device_code") {
    throw new Error(`Provider ${providerName} does not support device code flow`);
  }
  return await provider.requestDeviceCode(provider.config, codeChallenge);
}

/**
 * Poll for token (for device_code flow)
 * @param {string} providerName - Provider name
 * @param {string} deviceCode - Device code from requestDeviceCode
 * @param {string} codeVerifier - PKCE code verifier (optional for some providers)
 * @param {object} extraData - Extra data from device code response (e.g. clientId/clientSecret for Kiro)
 */
export async function pollForToken(providerName, deviceCode, codeVerifier, extraData) {
  const provider = getProvider(providerName);
  if (provider.flowType !== "device_code") {
    throw new Error(`Provider ${providerName} does not support device code flow`);
  }

  const result = await provider.pollToken(provider.config, deviceCode, codeVerifier, extraData);

  if (result.ok) {
    if (result.data.access_token) {
      let extra = null;
      if (provider.postExchange) {
        extra = await provider.postExchange(result.data);
      }
      return { success: true, tokens: provider.mapTokens(result.data, extra) };
    } else {
      if (result.data.error === "authorization_pending" || result.data.error === "slow_down") {
        return {
          success: false,
          error: result.data.error,
          errorDescription: result.data.error_description || result.data.message,
          pending: result.data.error === "authorization_pending",
        };
      } else {
        return {
          success: false,
          error: result.data.error || "no_access_token",
          errorDescription:
            result.data.error_description || result.data.message || "No access token received",
        };
      }
    }
  }

  return {
    success: false,
    error: result.data.error,
    errorDescription: result.data.error_description,
  };
}
