export const API_KEY_BYPASS_PROVIDER_QUOTA_SCOPE = "policy:bypass-provider-quota";

export function hasProviderQuotaBypassScope(scopes: readonly string[] | null | undefined): boolean {
  return Array.isArray(scopes) && scopes.includes(API_KEY_BYPASS_PROVIDER_QUOTA_SCOPE);
}
