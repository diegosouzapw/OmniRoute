/**
 * Centralized display name helpers for provider and account/connection labels.
 *
 * Prevents raw internal IDs (connection UUIDs, dynamic provider IDs) from
 * leaking into user-facing dashboards (Health, Analytics, Sessions, Rate-limits,
 * Quota, Compatible Provider pages, etc.).
 *
 * Priority order:
 *   — Account: name → displayName → email → short readble label
 *   — Provider: node.name → node.prefix → alias → readable ID
 *
 * @module lib/display/names
 */

export interface ConnectionLike {
  id?: string | null;
  name?: string | null;
  displayName?: string | null;
  email?: string | null;
}

export interface ProviderNodeLike {
  name?: string | null;
  prefix?: string | null;
}

/**
 * Friendly display name for an account/connection.
 *
 * Priority: name → displayName → email → "Account #<6-char ID>"
 */
export function getAccountDisplayName(conn: ConnectionLike): string {
  if (!conn) return "Unknown Account";
  const name =
    (typeof conn.name === "string" && conn.name.trim()) ||
    (typeof conn.displayName === "string" && conn.displayName.trim()) ||
    (typeof conn.email === "string" && conn.email.trim());
  if (name) return name;
  if (typeof conn.id === "string" && conn.id) {
    return `Account #${conn.id.slice(0, 6)}`;
  }
  return "Unknown Account";
}

/**
 * Friendly display name for a provider node/ID.
 *
 * Priority: node.name → node.prefix → de-UUIDed providerId
 *
 * Dynamic compatible provider IDs like
 *   "openai-compatible-chat-02669115-2545-4896-b003-cb4dac09d441"
 * are rendered as "Compatible (openai)".
 */
export function getProviderDisplayName(
  providerId: string | null | undefined,
  providerNode?: ProviderNodeLike | null
): string {
  if (providerNode?.name?.trim()) return providerNode.name.trim();
  if (providerNode?.prefix?.trim()) return providerNode.prefix.trim();
  if (!providerId) return "Unknown Provider";

  // Simplify dynamic compatible provider IDs
  const match = providerId.match(
    /^(openai|anthropic)-compatible-(?:chat|responses)-[0-9a-f-]{10,}$/i
  );
  if (match) return `Compatible (${match[1]})`;

  return providerId;
}
