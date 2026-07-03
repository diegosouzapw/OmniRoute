import { SELF_ACCOUNT_QUOTA_SCOPE, SELF_USAGE_SCOPE } from "@/shared/constants/selfServiceScopes";
import { API_KEY_BYPASS_PROVIDER_QUOTA_SCOPE } from "@/shared/constants/apiKeyPolicyScopes";

const MANAGEMENT_SCOPE = "manage";

export interface CreateScopeOptions {
  manageEnabled: boolean;
  selfUsageEnabled?: boolean;
  selfAccountQuotaEnabled?: boolean;
  bypassProviderQuotaPolicyEnabled?: boolean;
}

export interface PermissionScopeOptions {
  manageEnabled: boolean;
  selfUsageEnabled: boolean;
  selfAccountQuotaEnabled: boolean;
  bypassProviderQuotaPolicyEnabled: boolean;
}

export function buildApiKeyCreateScopes(options: CreateScopeOptions): string[] {
  const scopes: string[] = [];
  const selfUsageEnabled = options.selfUsageEnabled ?? true;
  if (options.manageEnabled) scopes.push(MANAGEMENT_SCOPE);
  if (selfUsageEnabled) scopes.push(SELF_USAGE_SCOPE);
  if (selfUsageEnabled && options.selfAccountQuotaEnabled === true) {
    scopes.push(SELF_ACCOUNT_QUOTA_SCOPE);
  }
  if (options.bypassProviderQuotaPolicyEnabled === true) {
    scopes.push(API_KEY_BYPASS_PROVIDER_QUOTA_SCOPE);
  }
  return scopes;
}

export function mergeApiKeyPermissionScopes(
  currentScopes: readonly string[] | null | undefined,
  options: PermissionScopeOptions
): string[] {
  const scopes = new Set((currentScopes ?? []).filter((scope) => typeof scope === "string"));

  setScope(scopes, MANAGEMENT_SCOPE, options.manageEnabled);
  setScope(scopes, SELF_USAGE_SCOPE, options.selfUsageEnabled);
  setScope(
    scopes,
    SELF_ACCOUNT_QUOTA_SCOPE,
    options.selfUsageEnabled && options.selfAccountQuotaEnabled
  );
  setScope(scopes, API_KEY_BYPASS_PROVIDER_QUOTA_SCOPE, options.bypassProviderQuotaPolicyEnabled);

  return [...scopes];
}

function setScope(scopes: Set<string>, scope: string, enabled: boolean): void {
  if (enabled) {
    scopes.add(scope);
  } else {
    scopes.delete(scope);
  }
}
