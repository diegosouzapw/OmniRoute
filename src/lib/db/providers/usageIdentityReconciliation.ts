import { resolveUsageAccountIdentity } from "@/lib/usage/accountIdentity";
import { parseProviderSpecificData } from "../webSessionDedup";
import { toStringOrNull } from "./columns";

type JsonRecord = Record<string, unknown>;

interface StatementLike {
  run: (...params: unknown[]) => { changes?: number };
}

interface DbLike {
  prepare: <TRow = unknown>(sql: string) => StatementLike;
}

function nonEmptyString(value: unknown): string | null {
  if (typeof value !== "string") return null;
  const trimmed = value.trim();
  return trimmed || null;
}

function isSafeCodexIdentityEnrichment(existing: JsonRecord, merged: JsonRecord): boolean {
  const oldProviderData = parseProviderSpecificData(existing.provider_specific_data) || {};
  const newProviderData = parseProviderSpecificData(merged.providerSpecificData) || {};
  const oldUserId = nonEmptyString(oldProviderData.chatgptUserId);
  const newUserId = nonEmptyString(newProviderData.chatgptUserId);
  const oldWorkspaceId = nonEmptyString(oldProviderData.workspaceId);
  const newWorkspaceId = nonEmptyString(newProviderData.workspaceId);
  const oldEmail = nonEmptyString(existing.email);
  const newEmail = nonEmptyString(merged.email);

  return (
    toStringOrNull(existing.provider) === "codex" &&
    toStringOrNull(existing.auth_type) === "oauth" &&
    toStringOrNull(merged.provider) === "codex" &&
    toStringOrNull(merged.authType) === "oauth" &&
    oldUserId === null &&
    newUserId !== null &&
    (oldWorkspaceId === null || oldWorkspaceId === newWorkspaceId) &&
    (oldEmail === null || oldEmail === newEmail)
  );
}

/**
 * Reconcile usage-history identity after a Codex connection gains its stable
 * user identity. The caller invokes this inside the same transaction as the
 * provider row update, so history and connection identity cannot diverge.
 */
export function reconcileCodexUsageHistory(
  db: DbLike,
  input: {
    connectionId: string;
    existing: JsonRecord;
    merged: JsonRecord;
    matchedExistingCodexByWorkspace?: boolean;
  }
): void {
  const oldIdentity = resolveUsageAccountIdentity(input.existing);
  const newIdentity = resolveUsageAccountIdentity(input.merged);
  const identityChanged = oldIdentity.accountKey !== newIdentity.accountKey;
  const permitted =
    input.matchedExistingCodexByWorkspace === true ||
    isSafeCodexIdentityEnrichment(input.existing, input.merged);

  if (!identityChanged || !permitted) return;

  db.prepare(
    `UPDATE usage_history
     SET account_key = @newAccountKey,
         account_label = CASE
           WHEN @newLabelPriority > COALESCE(account_label_priority, 0)
           THEN @newLabel
           ELSE account_label
         END,
         account_label_priority = MAX(
           COALESCE(account_label_priority, 0),
           @newLabelPriority
         )
     WHERE connection_id = @connectionId
       AND account_key = @oldAccountKey`
  ).run({
    connectionId: input.connectionId,
    oldAccountKey: oldIdentity.accountKey,
    newAccountKey: newIdentity.accountKey,
    newLabel: newIdentity.accountLabel,
    newLabelPriority: newIdentity.accountLabelPriority,
  });
}
