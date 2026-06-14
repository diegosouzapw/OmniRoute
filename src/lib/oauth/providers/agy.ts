import { antigravity } from "./antigravity";
import { AGY_CONFIG } from "../constants/oauth";

/**
 * Antigravity CLI (`agy`) OAuth provider module.
 *
 * `agy` targets the identical Google consumer-OAuth backend as the `antigravity` provider
 * (same client_id, scopes, token URL and Code Assist endpoints — verified byte-for-byte),
 * so it reuses the antigravity authorization-code + PKCE flow (`buildAuthUrl`,
 * `exchangeToken`, `postExchange`, `mapTokens`) wholesale. Only the `config` label differs;
 * `AGY_CONFIG` resolves to the same embedded antigravity credentials. Kept as its own
 * module so `agy` is a first-class, standalone entry in the OAuth provider registry and can
 * diverge later without touching the antigravity flow.
 */
export const agy = { ...antigravity, config: AGY_CONFIG };
