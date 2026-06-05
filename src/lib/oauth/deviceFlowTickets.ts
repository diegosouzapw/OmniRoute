/**
 * Single-use, short-lived tickets for the public "Adicionar Externo" Codex link.
 *
 * The dashboard generates a ticket and shares a public URL
 * (`/codex/connect/{token}`). A third party opens it and completes the Codex
 * device flow in their own browser; the public completion endpoint validates +
 * consumes the ticket before persisting the connection.
 *
 * Backed by an in-memory `globalThis` map, mirroring the existing
 * `__codexCallbackState` pattern in the OAuth route. Trade-off: tickets do not
 * survive a restart and are not shared across instances — acceptable for a
 * short-lived (15 min), single-use link.
 */
import { randomBytes } from "crypto";

const TICKET_TTL_MS = 15 * 60 * 1000; // matches OpenAI's device code expiry
const STORE_KEY = "__codexDeviceFlowTickets";

export interface DeviceFlowTicket {
  token: string;
  provider: string;
  /** Optional target connection to update instead of creating a new one. */
  connectionId?: string;
  /** Epoch ms. */
  expiresAt: number;
  used: boolean;
}

function store(): Map<string, DeviceFlowTicket> {
  const g = globalThis as unknown as { [STORE_KEY]?: Map<string, DeviceFlowTicket> };
  if (!g[STORE_KEY]) g[STORE_KEY] = new Map<string, DeviceFlowTicket>();
  return g[STORE_KEY]!;
}

function prune(): void {
  const now = Date.now();
  const map = store();
  for (const [token, ticket] of map) {
    if (ticket.used || ticket.expiresAt <= now) map.delete(token);
  }
}

/** Create a ticket and return its opaque token + expiry. */
export function createDeviceFlowTicket(
  provider: string,
  connectionId?: string
): { token: string; expiresAt: number } {
  prune();
  const token = randomBytes(32).toString("base64url");
  const expiresAt = Date.now() + TICKET_TTL_MS;
  store().set(token, { token, provider, connectionId, expiresAt, used: false });
  return { token, expiresAt };
}

/** Validate a ticket without consuming it. Returns null if missing/expired/used. */
export function peekDeviceFlowTicket(token: string): DeviceFlowTicket | null {
  prune();
  const ticket = store().get(token);
  if (!ticket || ticket.used || ticket.expiresAt <= Date.now()) return null;
  return ticket;
}

/**
 * Validate a ticket for the given provider and mark it consumed (single-use).
 * Returns the ticket on success, or null if invalid/expired/used/wrong-provider.
 */
export function consumeDeviceFlowTicket(token: string, provider: string): DeviceFlowTicket | null {
  const ticket = peekDeviceFlowTicket(token);
  if (!ticket || ticket.provider !== provider) return null;
  ticket.used = true;
  store().delete(token);
  return ticket;
}
