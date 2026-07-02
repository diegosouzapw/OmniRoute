import crypto from "crypto";

/**
 * Generate PKCE code verifier (43-128 characters)
 */
export function generateCodeVerifier() {
  return crypto.randomBytes(32).toString("base64url");
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
export function generatePKCE() {
  const codeVerifier = generateCodeVerifier();
  const codeChallenge = generateCodeChallenge(codeVerifier);
  const state = generateState();

  return {
    codeVerifier,
    codeChallenge,
    state,
  };
}
