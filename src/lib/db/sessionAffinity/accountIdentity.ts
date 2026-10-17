import { createHash } from "node:crypto";
import { resolveUsageAccountIdentity } from "@/lib/usage/accountIdentity";
import type { SessionAccountAffinityRecord } from "./store";

export type AffinityAccountConnection = Parameters<typeof resolveUsageAccountIdentity>[0];

export function sessionAffinityAccountIdentity(
  connection: AffinityAccountConnection,
  provider: string
): string {
  const { accountKey } = resolveUsageAccountIdentity({ ...connection, provider });
  // Usage identities may include an email. Persist only its digest, not the label/key.
  return createHash("sha256").update(accountKey).digest("hex");
}

export function resolveSessionAffinityConnection<T extends { id: string }>(
  record: SessionAccountAffinityRecord | null,
  connections: T[],
  provider: string
): T | null {
  if (!record) return null;
  if (record.accountIdentity) {
    // Every candidate has a usage identity (connection-scoped when metadata is absent).
    // A contradictory local id must never override the recorded identity.
    return (
      connections.find(
        (candidate) =>
          sessionAffinityAccountIdentity(candidate, provider) === record.accountIdentity
      ) ?? null
    );
  }
  return connections.find((candidate) => candidate.id === record.connectionId) ?? null;
}
