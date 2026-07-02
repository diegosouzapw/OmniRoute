/**
 * Model compatibility protocol keys — shared between client UI and server.
 * Must not import Node or DB code so client components can import safely.
 */

/** Client request shapes from detectFormat — compat options apply when the client uses this protocol */
export const MODEL_COMPAT_PROTOCOL_KEYS = ["openai", "openai-responses", "claude"] as const;

export type ModelCompatProtocolKey = (typeof MODEL_COMPAT_PROTOCOL_KEYS)[number];
