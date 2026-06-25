/**
 * Secrets Validator — FASE-01 Security Hardening
 *
 * Validates that required secrets are configured with strong values.
 * Called during server initialization (fail-fast on missing or weak secrets).
 *
 * @module secretsValidator
 */

const KNOWN_WEAK_SECRETS = [
  "omniroute-default-secret-change-me",
  "change-me-to-a-long-random-secret",
  "endpoint-proxy-api-key-secret",
  "change-me-storage-encryption-key",
  "your-secret-here",
  "secret",
  "password",
  "changeme",
];

/**
 * @typedef {Object} SecretRule
 * @property {string} name - Environment variable name
 * @property {number} minLength - Minimum acceptable length
 * @property {boolean} required - Whether the secret is required for startup
 * @property {string} description - Human-readable description
 * @property {string} generateHint - Command to generate a strong value
 */

/** @type {SecretRule[]} */
const SECRET_RULES = [
  {
    name: "JWT_SECRET",
    minLength: 32,
    required: false,
    description: "JWT signing secret for dashboard authentication (auto-generated if not set)",
    generateHint: "openssl rand -base64 48",
  },
  {
    name: "API_KEY_SECRET",
    minLength: 16,
    required: true,
    description: "HMAC secret for API key CRC generation",
    generateHint: "openssl rand -hex 32",
  },
];

/**
 * @typedef {Object} ValidationResult
 * @property {boolean} valid
 * @property {Array<{name: string, issue: string, hint: string}>} errors
 * @property {Array<{name: string, issue: string}>} warnings
 */

/**
 * Validate all required secrets.
 * @param {NodeJS.ProcessEnv} [env]
 * @returns {ValidationResult}
 */
export function validateSecrets(env = process.env) {
  const errors = [];
  const warnings = [];

  for (const rule of SECRET_RULES) {
    const value = env[rule.name];

    // Missing entirely
    if (!value || value.trim() === "") {
      if (rule.required) {
        errors.push({
          name: rule.name,
          issue: `Required environment variable "${rule.name}" is not set.`,
          hint: `Generate with: ${rule.generateHint}`,
        });
      }
      continue;
    }

    // Too short
    if (value.length < rule.minLength) {
      errors.push({
        name: rule.name,
        issue: `"${rule.name}" is too short (${value.length} chars, minimum ${rule.minLength}).`,
        hint: `Generate with: ${rule.generateHint}`,
      });
      continue;
    }

    // Known weak value
    if (KNOWN_WEAK_SECRETS.includes(value.toLowerCase())) {
      warnings.push({
        name: rule.name,
        issue: `"${rule.name}" appears to use a default/weak value. Please generate a strong secret.`,
      });
    }
  }

  return {
    valid: errors.length === 0,
    errors,
    warnings,
  };
}
