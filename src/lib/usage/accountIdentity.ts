type UsageAccountConnection = {
  id?: unknown;
  provider?: unknown;
  authType?: unknown;
  auth_type?: unknown;
  displayName?: unknown;
  display_name?: unknown;
  email?: unknown;
  name?: unknown;
  providerSpecificData?: unknown;
  provider_specific_data?: unknown;
};

export type UsageAccountIdentity = {
  accountKey: string;
  accountLabel: string;
  accountLabelPriority: number;
};

function identityString(value: unknown): string | null {
  return typeof value === "string" && value ? value : null;
}

function displayString(value: unknown): string | null {
  if (typeof value !== "string") return null;
  const trimmed = value.trim();
  return trimmed || null;
}

function sanePriority(value: unknown): number | null {
  return typeof value === "number" && Number.isSafeInteger(value) && value >= 0 && value <= 4
    ? value
    : null;
}

function toProviderSpecificData(value: unknown): Record<string, unknown> {
  if (value && typeof value === "object" && !Array.isArray(value)) {
    return value as Record<string, unknown>;
  }
  if (typeof value !== "string" || !value) return {};
  try {
    const parsed = JSON.parse(value);
    return parsed && typeof parsed === "object" && !Array.isArray(parsed)
      ? (parsed as Record<string, unknown>)
      : {};
  } catch {
    return {};
  }
}

/**
 * Resolve the stable, non-secret account identity stored with a usage event.
 * The identity deliberately mirrors provider-connection OAuth dedup boundaries.
 */
export function resolveUsageAccountIdentity(
  connection: UsageAccountConnection | null | undefined
): UsageAccountIdentity {
  const provider = identityString(connection?.provider) || "unknown";
  const connectionId = identityString(connection?.id) || "unknown";
  const authType = identityString(connection?.authType ?? connection?.auth_type);
  const email = identityString(connection?.email);
  const providerSpecificData = toProviderSpecificData(
    connection?.providerSpecificData ?? connection?.provider_specific_data
  );
  const workspaceId = identityString(providerSpecificData.workspaceId);
  const chatgptUserId = identityString(providerSpecificData.chatgptUserId);
  const username = identityString(providerSpecificData.username);

  let identityParts: string[];
  if (authType === "oauth" && provider === "codex" && workspaceId && chatgptUserId) {
    identityParts = ["oauth", provider, "workspace", workspaceId, "user", chatgptUserId];
  } else if (authType === "oauth" && provider === "codex" && chatgptUserId) {
    identityParts = ["oauth", provider, "user", chatgptUserId];
  } else if (authType === "oauth" && provider === "codex" && workspaceId && email) {
    identityParts = ["oauth", provider, "workspace", workspaceId, "email", email];
  } else if (authType === "oauth" && provider !== "codex" && email) {
    identityParts = username
      ? ["oauth", provider, "email", email, "username", username]
      : ["oauth", provider, "email", email];
  } else {
    identityParts = ["connection", provider, connectionId];
  }

  const displayName = displayString(connection?.displayName ?? connection?.display_name);
  const displayEmail = displayString(connection?.email);
  const name = displayString(connection?.name);
  const id = displayString(connection?.id);

  return {
    accountKey: JSON.stringify(identityParts),
    accountLabel: displayName || displayEmail || name || id || "unknown",
    accountLabelPriority: displayName ? 4 : displayEmail ? 3 : name ? 2 : id ? 1 : 0,
  };
}

export function resolveOrphanedUsageAccountIdentity(
  provider: unknown,
  connectionId: unknown
): UsageAccountIdentity {
  return resolveUsageAccountIdentity({ provider, id: connectionId });
}

export function resolveImportedUsageAccountIdentity(
  row: Record<string, unknown>,
  fallback: UsageAccountIdentity
): UsageAccountIdentity {
  return {
    accountKey: identityString(row.account_key ?? row.accountKey) || fallback.accountKey,
    accountLabel: displayString(row.account_label ?? row.accountLabel) || fallback.accountLabel,
    accountLabelPriority:
      sanePriority(row.account_label_priority ?? row.accountLabelPriority) ??
      fallback.accountLabelPriority,
  };
}
