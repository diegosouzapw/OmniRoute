/**
 * Single-use, short-lived tickets for the public "Adicionar Externo" Codex link.
 *
 * The dashboard generates a ticket and shares a public URL
 * (`/connect/codex/{token}`). A third party opens it and completes the Codex
 * device flow in their own browser; the public completion endpoint claims +
 * completes the ticket before persisting the connection. The dashboard polls the
 * ticket status so it can notify + refresh once the remote login finishes.
 *
 * Backed by an in-memory `globalThis` map, mirroring the existing
 * `__codexCallbackState` pattern in the OAuth route. Trade-off: tickets do not
 * survive a restart and are not shared across instances — acceptable for a
 * short-lived (15 min), single-use link.
 */
import { randomBytes } from "crypto";

const TICKET_TTL_MS = 15 * 60 * 1000; // matches OpenAI's device code expiry
const STORE_KEY = "__codexDeviceFlowTickets";

export type DeviceFlowTicketStatus = "pending" | "claimed" | "completed";

export interface DeviceFlowTicketResult {
  connectionId: string;
  email: string | null;
}

export interface DeviceFlowTicket {
  token: string;
  provider: string;
  /** Optional target connection to update instead of creating a new one. */
  connectionId?: string;
  /** Epoch ms. */
  expiresAt: number;
  status: DeviceFlowTicketStatus;
  /** Populated once the device flow completes and the connection is persisted. */
  result?: DeviceFlowTicketResult;
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
    if (ticket.expiresAt <= now) map.delete(token);
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
  store().set(token, { token, provider, connectionId, expiresAt, status: "pending" });
  return { token, expiresAt };
}

/** Return a ticket if it exists and has not expired (any status). */
export function peekDeviceFlowTicket(token: string): DeviceFlowTicket | null {
  prune();
  const ticket = store().get(token);
  if (!ticket || ticket.expiresAt <= Date.now()) return null;
  return ticket;
}

/**
 * Claim a still-pending ticket for the given provider so the device flow can be
 * completed exactly once. Marks it "claimed" to reject concurrent/duplicate
 * submissions. Returns the ticket, or null if invalid/expired/used/wrong-provider.
 */
export function claimDeviceFlowTicket(token: string, provider: string): DeviceFlowTicket | null {
  const ticket = peekDeviceFlowTicket(token);
  if (!ticket || ticket.provider !== provider || ticket.status !== "pending") return null;
  ticket.status = "claimed";
  return ticket;
}

/** Mark a claimed ticket completed and record the resulting connection. */
export function completeDeviceFlowTicket(token: string, result: DeviceFlowTicketResult): void {
  const ticket = store().get(token);
  if (!ticket) return;
  ticket.status = "completed";
  ticket.result = result;
}

/** Revert a claimed ticket back to pending so the visitor can retry after a failure. */
export function releaseDeviceFlowTicket(token: string): void {
  const ticket = store().get(token);
  if (ticket && ticket.status === "claimed") ticket.status = "pending";
}

/**
 * Status for the dashboard poll. Returns "expired" when the ticket is gone
 * (missing or past its TTL), otherwise the live status + result if completed.
 */
export function getDeviceFlowTicketStatus(
  token: string
): { status: DeviceFlowTicketStatus | "expired"; result: DeviceFlowTicketResult | null } {
  const ticket = peekDeviceFlowTicket(token);
  if (!ticket) return { status: "expired", result: null };
  return { status: ticket.status, result: ticket.result ?? null };
}
