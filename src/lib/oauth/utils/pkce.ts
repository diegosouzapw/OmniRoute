import crypto from "crypto";

/**
 * Generate PKCE code verifier (43-128 characters)
 */
export function generateCodeVerifier(bytes = 32) {
  return crypto.randomBytes(bytes).toString("base64url");
}

/**
 * Generate PKCE code challenge from verifier (S256 method)
 */
export function generateCodeChallenge(verifier) {
  return crypto.createHash("sha256").update(verifier).digest("base64url");
}

/**
 * Generate random state for CSRF protection
 */
export function generateState() {
  return crypto.randomBytes(32).toString("base64url");
}

/**
 * Generate complete PKCE pair
 */
export function generatePKCE(verifierBytes = 32) {
  const codeVerifier = generateCodeVerifier(verifierBytes);
  const codeChallenge = generateCodeChallenge(codeVerifier);
  const state = generateState();

  return {
    codeVerifier,
    codeChallenge,
    state,
  };
}
