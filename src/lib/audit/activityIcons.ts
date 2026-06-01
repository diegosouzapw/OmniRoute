export interface ActivityIconSpec {
  /** Material Symbols icon name (e.g. "extension"). */
  icon: string;
  /** i18n key under namespace `activity.eventVerb.*` for the human verb. */
  i18nKeyVerb: string;
}

export const ACTIVITY_ICONS: Record<string, ActivityIconSpec> = {
  // providers
  "provider.credentials.created": { icon: "extension", i18nKeyVerb: "providerCredentialsCreated" },
  "provider.credentials.applied": { icon: "check_circle", i18nKeyVerb: "providerCredentialsApplied" },
  "provider.credentials.updated": { icon: "edit", i18nKeyVerb: "providerCredentialsUpdated" },
  "provider.credentials.revoked": { icon: "extension_off", i18nKeyVerb: "providerCredentialsRevoked" },
  "provider.credentials.batch_revoked": { icon: "extension_off", i18nKeyVerb: "providerCredentialsBatchRevoked" },
  "provider.credentials.bulk_created": { icon: "extension", i18nKeyVerb: "providerCredentialsBulkCreated" },
  "provider.credentials.bulk_imported": { icon: "upload", i18nKeyVerb: "providerCredentialsBulkImported" },
  "provider.credentials.imported": { icon: "upload", i18nKeyVerb: "providerCredentialsImported" },
  "provider.validation.ssrf_blocked": { icon: "block", i18nKeyVerb: "providerSsrfBlocked" },

  // auth
  "auth.login.success": { icon: "login", i18nKeyVerb: "authLoginSuccess" },
  "auth.login.error": { icon: "error", i18nKeyVerb: "authLoginError" },
  "auth.login.failed": { icon: "error", i18nKeyVerb: "authLoginFailed" },
  "auth.login.locked": { icon: "lock", i18nKeyVerb: "authLoginLocked" },
  "auth.login.misconfigured": { icon: "warning", i18nKeyVerb: "authLoginMisconfigured" },
  "auth.login.setup_required": { icon: "warning", i18nKeyVerb: "authLoginSetupRequired" },
  "auth.logout.success": { icon: "logout", i18nKeyVerb: "authLogoutSuccess" },

  // sync
  "sync.token.created": { icon: "sync", i18nKeyVerb: "syncTokenCreated" },
  "sync.token.revoked": { icon: "sync_disabled", i18nKeyVerb: "syncTokenRevoked" },

  // settings
  "settings.update": { icon: "settings", i18nKeyVerb: "settingsUpdate" },
  "settings.update_failed": { icon: "warning", i18nKeyVerb: "settingsUpdateFailed" },

  // service
  "service.reveal_api_key": { icon: "visibility", i18nKeyVerb: "serviceRevealApiKey" },

  // quota
  "quota.pool.created": { icon: "pie_chart", i18nKeyVerb: "quotaPoolCreated" },
  "quota.pool.updated": { icon: "edit_note", i18nKeyVerb: "quotaPoolUpdated" },
  "quota.pool.deleted": { icon: "delete", i18nKeyVerb: "quotaPoolDeleted" },
  "quota.plan.updated": { icon: "fact_check", i18nKeyVerb: "quotaPlanUpdated" },
  "quota.store.driver_changed": { icon: "storage", i18nKeyVerb: "quotaStoreDriverChanged" },
};

export function getActivityIcon(action: string): ActivityIconSpec {
  return ACTIVITY_ICONS[action] ?? { icon: "info", i18nKeyVerb: "genericEvent" };
}
