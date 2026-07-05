"use client";
import { useState, useEffect, useRef } from "react";
import { useTranslations } from "next-intl";
import { Button, Badge, Input, Modal, Toggle } from "@/shared/components";
import { providerAllowsOptionalApiKey, supportsBulkApiKey } from "@/shared/constants/providers";
import { parseBulkApiKeys } from "@/shared/utils/bulkApiKeyParser";
import { providerHasFreeModels } from "@/shared/utils/freeModels";
import {
  isBaseUrlConfigurableProvider,
  getProviderBaseUrlDefault,
  getProviderBaseUrlHint,
  getProviderBaseUrlPlaceholder,
  isGlmProvider,
  getWebSessionCredentialLabel,
  getWebSessionCredentialHint,
  getWebSessionCredentialCheckLabel,
  getAddCredentialModalTitle,
  getLocalProviderMetadata,
  normalizeAndValidateHttpBaseUrl,
  extractCommandCodeCredentialInput,
  combineModalCredential,
  defaultValidationModelIdForProvider,
  providerText,
  validationBadgeProps,
  type CommandCodeAuthFlowState,
} from "../../providerPageHelpers";
import { getWebSessionCredentialRequirement } from "../../webSessionCredentials";
import { useOpenRouterPresetControl } from "../OpenRouterPresetInput";
import WebSessionCredentialGuide from "../WebSessionCredentialGuide";
import CcCompatibleRequestDefaultsFields from "./CcCompatibleRequestDefaultsFields";
import { buildAddProviderSpecificData } from "./connectionProviderSpecificData";
import QuotaScrapingFields, { EMPTY_QUOTA_SCRAPING_FIELDS } from "./QuotaScrapingFields";
export interface AddApiKeyModalProps {
  isOpen: boolean;
  provider?: string;
  providerName?: string;
  initialBaseUrl?: string;
  isCompatible?: boolean;
  isAnthropic?: boolean;
  isCcCompatible?: boolean;
  isCommandCode?: boolean;
  commandCodeAuthState?: CommandCodeAuthFlowState;
  onStartCommandCodeAuth?: () => void;
  onSave: (data: {
    name: string;
    apiKey?: string;
    priority: number;
    baseUrl?: string;
    defaultModel?: string;
    providerSpecificData?: Record<string, unknown>;
  }) => Promise<void | unknown>;
  onClose: () => void;
}

export default function AddApiKeyModal({
  isOpen,
  provider,
  providerName,
  initialBaseUrl,
  isCompatible,
  isAnthropic,
  isCcCompatible,
  isCommandCode,
  commandCodeAuthState,
  onStartCommandCodeAuth,
  onSave,
  onClose,
}: AddApiKeyModalProps) {
  const t = useTranslations("providers");
  const showFreeModelsToggle = providerHasFreeModels(provider);
  const usesBaseUrl = isBaseUrlConfigurableProvider(provider);
  const defaultBaseUrl = getProviderBaseUrlDefault(provider);
  const isVertex = provider === "vertex" || provider === "vertex-partner";
  const isBedrock = provider === "bedrock";
  const showsRegion = isVertex || isBedrock;
  const defaultRegion = isBedrock ? "eu-west-2" : "us-central1";
  const isModal = provider === "modal";
  const isGlm = isGlmProvider(provider);
  const isQoder = provider === "qoder";
  const openRouterPreset = useOpenRouterPresetControl(provider, t);
  const isCloudflare = provider === "cloudflare-ai";
  const localProviderMetadata = getLocalProviderMetadata(provider);
  const isLocalSelfHostedProvider = !!localProviderMetadata;
  const isGooglePse = provider === "google-pse-search";
  const webSessionCredential = getWebSessionCredentialRequirement(provider);
  const isNoAuthWebSessionCredential = webSessionCredential?.kind === "none";
  const isWebSessionCredential = !!webSessionCredential && webSessionCredential.kind !== "none";
  const providerDisplayName = providerName || provider || "";
  const apiKeyOptional =
    providerAllowsOptionalApiKey(provider) || Boolean(isNoAuthWebSessionCredential);
  const commandCodeAuthPhaseLabel = commandCodeAuthState
    ? {
        idle: "Ready",
        starting: "Starting…",
        polling: "Waiting for browser…",
        received: "Browser approved",
        applying: "Applying key…",
        applied: "Connected",
        expired: "Link expired",
        error: "Connection failed",
      }[commandCodeAuthState.phase]
    : null;
  const [formData, setFormData] = useState({
    name: "main", // #5421: required field; default resists autofill garbage (was "" → "wiw")
    apiKey: "",
    tokenSecret: "", // #5446 — Modal Token Secret (joined with apiKey as id:secret)
    defaultModel: "",
    priority: 1,
    baseUrl: initialBaseUrl || defaultBaseUrl,
    cx: "",
    region: showsRegion ? defaultRegion : "",
    apiRegion: "international",
    validationModelId: defaultValidationModelIdForProvider(provider), // #5446 item 4 — Modal probe model pre-fill
    routingTags: "",
    excludedModels: "",
    customUserAgent: "",
    accountId: "",
    consoleApiKey: "",
    ...EMPTY_QUOTA_SCRAPING_FIELDS,
    ccCompatibleContext1m: false,
    ccCompatibleRedactThinking: false,
    ccCompatibleSummarizeThinking: false,
    passthroughModels: false,
    importFreeModelsOnly: false,
  });
  const [validating, setValidating] = useState(false);
  const [validationResult, setValidationResult] = useState(null);
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [copiedCommandCodeField, setCopiedCommandCodeField] = useState<string | null>(null);
  const wasOpenRef = useRef(false);
  useEffect(() => {
    const wasOpen = wasOpenRef.current;
    wasOpenRef.current = isOpen;
    if (!isOpen || wasOpen) return;
    setFormData((current) => ({
      ...current,
      baseUrl: initialBaseUrl || defaultBaseUrl,
    }));
  }, [defaultBaseUrl, initialBaseUrl, isOpen]);
  const bulkSupported = supportsBulkApiKey(provider);
  const [mode, setMode] = useState<"single" | "bulk">("single");
  const [bulkText, setBulkText] = useState("");
  const [bulkValidateKeys, setBulkValidateKeys] = useState(false);
  const [bulkResult, setBulkResult] = useState<{
    success: number;
    failed: number;
    total: number;
    errors: Array<{ index: number; name: string; message: string }>;
  } | null>(null);
  const [bulkWarnings, setBulkWarnings] = useState<string[]>([]);
  const apiCredentialLabel = isModal
    ? providerText(t, "modalTokenIdLabel", "Token ID")
    : isQoder
      ? t("personalAccessTokenLabel")
      : webSessionCredential
        ? getWebSessionCredentialLabel(t, webSessionCredential, apiKeyOptional)
        : apiKeyOptional
          ? `${t("apiKeyLabel")} (${t("optional").toLowerCase()})`
          : t("apiKeyLabel");
  const apiCredentialPlaceholder = isModal
    ? "ak-xxxxxxxxxxxxxxxx"
    : isVertex
      ? t("vertexServiceAccountPlaceholder")
      : isWebSessionCredential
        ? webSessionCredential.placeholder
        : isQoder
          ? t("qoderPatPlaceholder")
          : apiKeyOptional
            ? t("optional")
            : undefined;
  const apiCredentialHint = isModal
    ? providerText(
        t,
        "modalTokenIdHint",
        "Modal auth uses a Token ID + Token Secret pair. Create one at https://modal.com/settings → API Tokens."
      )
    : isQoder
      ? t("qoderPatHint")
      : isWebSessionCredential
        ? getWebSessionCredentialHint(t, webSessionCredential, providerDisplayName, false)
        : isLocalSelfHostedProvider
          ? t("localProviderApiKeyOptionalHint", {
              provider: localProviderMetadata?.name || providerName || provider || "",
            })
          : apiKeyOptional
            ? t("apiKeyOptionalHint")
            : undefined;
  const credentialValidationFailedMessage = isWebSessionCredential
    ? providerText(
        t,
        "webSessionCredentialValidationFailed",
        "Session credential validation failed. Sign in again, copy a fresh credential, and try again."
      )
    : t("apiKeyValidationFailed");

  // Normalize the raw credential field(s) into the single value stored as `apiKey`.
  // command-code providers extract a key from a pasted blob (#5088); Modal joins its
  // Token ID + Token Secret into `id:secret` (#5446); everyone else uses the field verbatim.
  const resolveCredentialInput = () => {
    if (isCommandCode) return extractCommandCodeCredentialInput(formData.apiKey);
    if (isModal) return combineModalCredential(formData.apiKey, formData.tokenSecret);
    return formData.apiKey;
  };

  const handleValidate = async () => {
    setValidating(true);
    setSaveError(null);
    try {
      const credentialInput = resolveCredentialInput();
      const res = await fetch("/api/providers/validate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          provider,
          apiKey: credentialInput,
          validationModelId: formData.validationModelId || undefined,
          customUserAgent: formData.customUserAgent.trim() || undefined,
          baseUrl: formData.baseUrl.trim() || undefined,
          region: showsRegion ? formData.region.trim() || defaultRegion : undefined,
          cx: formData.cx.trim() || undefined,
        }),
      });
      const data = await res.json();
      const ok = !!data.valid;
      setValidationResult(ok ? "success" : data.unsupported ? "unsupported" : "failed");
      // #5088: surface the detailed reason the backend returns (e.g. a TLS/EACCES
      // environment error for claude-web/chatgpt-web) instead of only a bare
      // "invalid" badge — otherwise the real cause is hidden and users are stuck.
      if (!ok && typeof data.error === "string" && data.error) {
        setSaveError(data.error);
      }
    } catch {
      setValidationResult("failed");
    } finally {
      setValidating(false);
    }
  };
  const copyCommandCodeValue = async (value: string | undefined, key: string) => {
    if (!value) return;
    try {
      await navigator.clipboard.writeText(value);
      setCopiedCommandCodeField(key);
      window.setTimeout(() => setCopiedCommandCodeField(null), 1500);
    } catch {
      setSaveError("Copy failed. Select the text and copy it manually.");
    }
  };

  const handleSubmit = async () => {
    const credentialInput = resolveCredentialInput();
    if (!provider || (!isCompatible && !apiKeyOptional && !credentialInput)) return;

    setSaving(true);
    setSaveError(null);
    try {
      if (isGooglePse && !formData.cx.trim()) {
        setSaveError(t("searchEngineIdRequired"));
        return;
      }

      let validatedBaseUrl = null;
      if (usesBaseUrl) {
        const checked = normalizeAndValidateHttpBaseUrl(formData.baseUrl, defaultBaseUrl);
        if (checked.error) {
          setSaveError(checked.error);
          return;
        }
        validatedBaseUrl = checked.value;
      }

      let isValid = Boolean(isNoAuthWebSessionCredential && !credentialInput);
      let validationError: string | null = null;
      let isUnsupported = false; // #5565/#5567: no live validator → save anyway
      if (!isValid) {
        try {
          setValidating(true);
          setValidationResult(null);
          const res = await fetch("/api/providers/validate", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              provider,
              apiKey: credentialInput,
              validationModelId: formData.validationModelId || undefined,
              customUserAgent: formData.customUserAgent.trim() || undefined,
              baseUrl: formData.baseUrl.trim() || undefined,
              region: showsRegion ? formData.region.trim() || defaultRegion : undefined,
              cx: formData.cx.trim() || undefined,
            }),
          });
          const data = await res.json();
          isValid = !!data.valid;
          isUnsupported = !!data.unsupported;
          if (!isValid && data.error) {
            validationError = data.error;
          }
          setValidationResult(isValid ? "success" : isUnsupported ? "unsupported" : "failed");
        } catch {
          setValidationResult("failed");
        } finally {
          setValidating(false);
        }
      }

      if (!isValid) {
        if (isUnsupported || (apiKeyOptional && !credentialInput)) {
          console.debug("Validation unsupported/optional; proceeding to save as-is.");
        } else {
          setSaveError(validationError || credentialValidationFailedMessage);
          return;
        }
      }

      const providerSpecificData = buildAddProviderSpecificData({
        provider,
        formData,
        openRouterPreset,
        showFreeModelsToggle,
        isGooglePse,
        usesBaseUrl,
        validatedBaseUrl,
        showsRegion,
        defaultRegion,
        isGlm,
        isCloudflare,
        isCcCompatible,
      });

      const payload = {
        name: formData.name,
        apiKey: credentialInput.trim() || undefined,
        priority: formData.priority,
        testStatus: "active",
        defaultModel: isCompatible ? formData.defaultModel.trim() || undefined : undefined,
        providerSpecificData,
      };

      const error = await onSave(payload);
      if (error) {
        setSaveError(typeof error === "string" ? error : t("failedSaveConnection"));
      }
    } finally {
      setSaving(false);
    }
  };

  const handleBulkSubmit = async () => {
    if (!provider) return;
    const parsed = parseBulkApiKeys(bulkText, { withAccountId: isCloudflare });
    setBulkWarnings(parsed.warnings);
    if (parsed.entries.length === 0) return;

    setSaving(true);
    setBulkResult(null);
    setSaveError(null);

    try {
      const bulkProviderSpecificData: Record<string, unknown> = {};
      if (usesBaseUrl) {
        const checked = normalizeAndValidateHttpBaseUrl(formData.baseUrl, defaultBaseUrl);
        if (checked.error) {
          setSaveError(checked.error);
          return;
        }
        bulkProviderSpecificData.baseUrl = checked.value;
      }
      openRouterPreset.applyTo(bulkProviderSpecificData);
      if (showFreeModelsToggle && formData.importFreeModelsOnly) {
        bulkProviderSpecificData.importFreeModelsOnly = true;
      }
      const providerSpecificData =
        Object.keys(bulkProviderSpecificData).length > 0 ? bulkProviderSpecificData : undefined;

      const res = await fetch("/api/providers/bulk", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          provider,
          entries: parsed.entries.map((e) => ({
            name: e.name,
            apiKey: e.apiKey,
            ...(e.accountId ? { accountId: e.accountId } : {}),
          })),
          priority: formData.priority || 1,
          providerSpecificData,
          validateKeys: bulkValidateKeys,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setSaveError(typeof data?.error === "string" ? data.error : t("failedSaveConnection"));
        return;
      }
      setBulkResult({
        success: data.success || 0,
        failed: data.failed || 0,
        total: data.total || 0,
        errors: Array.isArray(data.errors) ? data.errors : [],
      });
    } catch (err) {
      setSaveError(err instanceof Error ? err.message : t("failedSaveConnection"));
    } finally {
      setSaving(false);
    }
  };

  if (!provider) return null;

  const freeModelsToggle = showFreeModelsToggle ? (
    <Toggle
      size="sm"
      checked={formData.importFreeModelsOnly}
      onChange={(checked) => setFormData({ ...formData, importFreeModelsOnly: checked })}
      label={t("importFreeModelsOnlyLabel")}
      description={t("importFreeModelsOnlyHint")}
    />
  ) : null;

  return (
    <Modal
      isOpen={isOpen}
      title={getAddCredentialModalTitle(t, providerDisplayName, webSessionCredential)}
      onClose={onClose}
    >
      <div className="flex flex-col gap-4">
        {bulkSupported && (
          <div className="flex gap-1 border-b border-border">
            <button
              type="button"
              onClick={() => {
                setMode("single");
                setBulkResult(null);
                setBulkWarnings([]);
              }}
              className={`px-3 py-1.5 text-sm font-medium transition-colors ${
                mode === "single"
                  ? "border-b-2 border-primary text-text-main"
                  : "text-text-muted hover:text-text-main"
              }`}
            >
              {t("bulkTabSingle")}
            </button>
            <button
              type="button"
              onClick={() => {
                setMode("bulk");
                setSaveError(null);
              }}
              className={`px-3 py-1.5 text-sm font-medium transition-colors ${
                mode === "bulk"
                  ? "border-b-2 border-primary text-text-main"
                  : "text-text-muted hover:text-text-main"
              }`}
            >
              {t("bulkTabBulkAdd")}
            </button>
          </div>
        )}

        {bulkSupported && mode === "bulk" && (
          <div className="flex flex-col gap-3">
            <p className="text-xs text-text-muted">
              {isCloudflare ? t("bulkAddFormatHintCloudflare") : t("bulkAddFormatHint")}
            </p>
            {openRouterPreset.input}
            {freeModelsToggle}
            <textarea
              className="w-full rounded border border-border bg-background p-2 text-sm font-mono resize-y min-h-[140px] focus:outline-none focus:ring-1 focus:ring-primary"
              placeholder={
                isCloudflare
                  ? "name1|account-id-1|cf-token-1\nname2|account-id-2|cf-token-2"
                  : "name1|sk-key1\nname2|sk-key2\nsk-key-only-auto-named"
              }
              value={bulkText}
              onChange={(e) => setBulkText(e.target.value)}
            />
            <div className="flex items-center gap-4 flex-wrap">
              <div className="flex items-center gap-2">
                <label className="text-sm text-text-muted">{t("priorityLabel")}</label>
                <input
                  type="number"
                  min={1}
                  max={100}
                  value={formData.priority}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      priority: Number.parseInt(e.target.value) || 1,
                    })
                  }
                  className="w-20 px-2 py-1 text-sm border border-border rounded bg-background"
                />
              </div>
              <label className="flex items-center gap-2 text-sm text-text-muted cursor-pointer">
                <input
                  type="checkbox"
                  checked={bulkValidateKeys}
                  onChange={(e) => setBulkValidateKeys(e.target.checked)}
                  className="rounded border-border"
                />
                {t("bulkValidateKeys")}
              </label>
            </div>
            {bulkWarnings.length > 0 && (
              <div className="rounded border border-amber-500/25 bg-amber-500/10 p-2 text-xs text-amber-200 space-y-1">
                {bulkWarnings.map((w, i) => (
                  <div key={i}>{w}</div>
                ))}
              </div>
            )}
            {bulkResult && (
              <div
                className={`text-sm font-medium ${
                  bulkResult.failed > 0 ? "text-amber-300" : "text-emerald-400"
                }`}
              >
                {t("bulkAddedCount", { count: bulkResult.success })}
                {bulkResult.failed > 0 && (
                  <>, {t("bulkFailedCount", { count: bulkResult.failed })}</>
                )}
                {bulkResult.errors.length > 0 && (
                  <ul className="mt-2 list-disc pl-5 text-xs text-text-muted font-normal space-y-0.5">
                    {bulkResult.errors.slice(0, 10).map((err, i) => (
                      <li key={i}>
                        {err.name}: {err.message}
                      </li>
                    ))}
                    {bulkResult.errors.length > 10 && (
                      <li>… {bulkResult.errors.length - 10} more</li>
                    )}
                  </ul>
                )}
              </div>
            )}
            {saveError && <div className="text-sm text-rose-400">{saveError}</div>}
            <div className="flex gap-2">
              <Button onClick={handleBulkSubmit} fullWidth disabled={saving || !bulkText.trim()}>
                {saving ? t("adding") : t("bulkAddAllKeys")}
              </Button>
              <Button onClick={onClose} variant="ghost" fullWidth>
                {t("cancel")}
              </Button>
            </div>
          </div>
        )}

        {(!bulkSupported || mode === "single") && (
          <>
            {isCcCompatible && (
              <div className="rounded-lg border border-amber-500/25 bg-amber-500/10 px-3 py-2 text-sm text-text-muted">
                <div className="flex items-start gap-2">
                  <span className="material-symbols-outlined mt-0.5 text-[18px] text-amber-500">
                    warning
                  </span>
                  <p>{t("ccCompatibleValidationHint")}</p>
                </div>
              </div>
            )}
            {isCommandCode && onStartCommandCodeAuth && (
              <div className="rounded-lg border border-sky-500/20 bg-sky-500/10 px-3 py-3 text-sm">
                <div className="flex items-start gap-3">
                  <span className="material-symbols-outlined mt-0.5 text-[18px] text-sky-500">
                    open_in_new
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="font-medium text-text-main">
                      {t("providerDetailBrowserManualConnect")}
                    </p>
                    <p className="mt-1 text-xs text-text-muted">
                      Open Command Code Studio, then paste the returned key/JSON/URL into the API
                      key field below.
                    </p>
                    {commandCodeAuthState?.message && (
                      <p className="mt-2 text-xs text-text-muted">
                        {commandCodeAuthPhaseLabel}: {commandCodeAuthState.message}
                      </p>
                    )}
                    {commandCodeAuthState?.authUrl && (
                      <div className="mt-3 space-y-2">
                        <div>
                          <p className="mb-1 text-xs font-medium text-text-main">
                            {t("providerDetailAuthUrl")}
                          </p>
                          <div className="flex gap-2">
                            <Input
                              value={commandCodeAuthState.authUrl}
                              readOnly
                              className="flex-1 font-mono text-xs"
                            />
                            <Button
                              variant="ghost"
                              size="sm"
                              icon={copiedCommandCodeField === "authUrl" ? "check" : "content_copy"}
                              onClick={() =>
                                copyCommandCodeValue(commandCodeAuthState.authUrl, "authUrl")
                              }
                            />
                          </div>
                        </div>
                        {commandCodeAuthState.callbackUrl && (
                          <div>
                            <p className="mb-1 text-xs font-medium text-text-main">
                              {t("providerDetailCallbackUrl")}
                            </p>
                            <div className="flex gap-2">
                              <Input
                                value={commandCodeAuthState.callbackUrl}
                                readOnly
                                className="flex-1 font-mono text-xs"
                              />
                              <Button
                                variant="ghost"
                                size="sm"
                                icon={
                                  copiedCommandCodeField === "callbackUrl"
                                    ? "check"
                                    : "content_copy"
                                }
                                onClick={() =>
                                  copyCommandCodeValue(
                                    commandCodeAuthState.callbackUrl,
                                    "callbackUrl"
                                  )
                                }
                              />
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                  <Button
                    variant="secondary"
                    size="sm"
                    icon="open_in_new"
                    loading={
                      commandCodeAuthState?.phase === "starting" ||
                      commandCodeAuthState?.phase === "polling" ||
                      commandCodeAuthState?.phase === "applying"
                    }
                    onClick={onStartCommandCodeAuth}
                  >
                    Connect in browser
                  </Button>
                </div>
              </div>
            )}
            <Input
              label={t("nameLabel")}
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder={isQoder ? t("personalAccessTokenLabel") : t("productionKey")}
            />
            {webSessionCredential && (
              <WebSessionCredentialGuide
                requirement={webSessionCredential}
                providerName={providerDisplayName}
                t={t}
              />
            )}
            {!isNoAuthWebSessionCredential && (
              <div className="flex gap-2">
                <Input
                  label={apiCredentialLabel}
                  type="password"
                  value={formData.apiKey}
                  onChange={(e) => setFormData({ ...formData, apiKey: e.target.value })}
                  className="flex-1"
                  placeholder={apiCredentialPlaceholder}
                  hint={apiCredentialHint}
                  autoComplete="off"
                  spellCheck={false}
                  autoCapitalize="off"
                />
                <div className="pt-6">
                  <Button
                    onClick={handleValidate}
                    disabled={
                      (!isCompatible && !apiKeyOptional && !formData.apiKey) ||
                      (isGooglePse && !formData.cx.trim()) ||
                      validating ||
                      saving
                    }
                    variant="secondary"
                  >
                    {validating
                      ? t("checking")
                      : webSessionCredential
                        ? getWebSessionCredentialCheckLabel(t, webSessionCredential)
                        : t("check")}
                  </Button>
                </div>
              </div>
            )}
            {isModal && (
              <Input
                label={providerText(t, "modalTokenSecretLabel", "Token Secret")}
                type="password"
                value={formData.tokenSecret}
                onChange={(e) => setFormData({ ...formData, tokenSecret: e.target.value })}
                placeholder="as-xxxxxxxxxxxxxxxx"
                hint={providerText(
                  t,
                  "modalTokenSecretHint",
                  "Paired with the Token ID above; combined as Bearer <id>:<secret>."
                )}
                autoComplete="off"
                spellCheck={false}
                autoCapitalize="off"
              />
            )}
            {isGooglePse && (
              <Input
                label={t("searchEngineIdLabel")}
                value={formData.cx}
                onChange={(e) => setFormData({ ...formData, cx: e.target.value })}
                placeholder="012345678901234567890:abc123xyz"
                hint={t("searchEngineIdHint")}
              />
            )}
            {validationResult && (
              <Badge variant={validationBadgeProps(validationResult).variant}>
                {t(validationBadgeProps(validationResult).labelKey)}
              </Badge>
            )}
            {saveError && (
              <div className="text-sm text-red-500 bg-red-500/10 border border-red-500/20 rounded-lg px-3 py-2">
                {saveError}
              </div>
            )}
            {(isCcCompatible || openRouterPreset.input) && (
              <div className="flex flex-col gap-4 rounded-lg border border-border/50 bg-surface/20 p-4">
                {isCcCompatible && (
                  <CcCompatibleRequestDefaultsFields
                    values={formData}
                    onChange={(patch) => setFormData({ ...formData, ...patch })}
                  />
                )}
                {openRouterPreset.input}
              </div>
            )}
            {freeModelsToggle}
            <QuotaScrapingFields
              provider={provider}
              values={formData}
              onChange={(patch) => setFormData({ ...formData, ...patch })}
              t={t}
            />
            {isCompatible && (
              <Input
                label={t("compatibleDefaultModelLabel")}
                value={formData.defaultModel}
                onChange={(e) => setFormData({ ...formData, defaultModel: e.target.value })}
                placeholder={isAnthropic ? "claude-3-5-sonnet-latest" : "gpt-4o-mini"}
                hint={t("compatibleDefaultModelHint")}
                data-testid="compat-default-model-input"
              />
            )}
            {isCompatible && !isCcCompatible && (
              <p className="text-xs text-text-muted">
                {isAnthropic
                  ? t("validationChecksAnthropicCompatible", {
                      provider: providerName || t("anthropicCompatibleName"),
                    })
                  : t("validationChecksOpenAiCompatible", {
                      provider: providerName || t("openaiCompatibleName"),
                    })}
              </p>
            )}
            <button
              type="button"
              className="text-sm text-text-muted hover:text-text-primary flex items-center gap-1"
              onClick={() => setShowAdvanced(!showAdvanced)}
              aria-expanded={showAdvanced}
              aria-controls="add-api-key-advanced-settings"
            >
              <span
                className={`transition-transform ${showAdvanced ? "rotate-90" : ""}`}
                aria-hidden="true"
              >
                ▶
              </span>
              {t("advancedSettings")}
            </button>
            {showAdvanced && (
              <div
                id="add-api-key-advanced-settings"
                className="flex flex-col gap-3 pl-2 border-l-2 border-border"
              >
                <Input
                  label={t("customUserAgentLabel")}
                  value={formData.customUserAgent}
                  onChange={(e) => setFormData({ ...formData, customUserAgent: e.target.value })}
                  placeholder="my-app/1.0"
                  hint={t("customUserAgentHint")}
                />
                <Input
                  label={t("routingTagsLabel")}
                  value={formData.routingTags}
                  onChange={(e) => setFormData({ ...formData, routingTags: e.target.value })}
                  placeholder={t("routingTagsPlaceholder")}
                  hint={t("routingTagsHint")}
                />
                <Input
                  label={t("excludedModelsLabel")}
                  value={formData.excludedModels}
                  onChange={(e) => setFormData({ ...formData, excludedModels: e.target.value })}
                  placeholder={t("excludedModelsPlaceholder")}
                  hint={t("excludedModelsHint")}
                />
                <Toggle
                  size="sm"
                  checked={formData.passthroughModels}
                  onChange={(checked) => setFormData({ ...formData, passthroughModels: checked })}
                  label={t("perModelQuotaLabel")}
                  description={t("perModelQuotaDescription")}
                />
                {provider === "bailian-coding-plan" && (
                  <Input
                    label={t("consoleApiKeyOracleLabel")}
                    value={formData.consoleApiKey}
                    onChange={(e) => setFormData({ ...formData, consoleApiKey: e.target.value })}
                    placeholder={t("consoleApiKeyOraclePlaceholder")}
                    hint={t("consoleApiKeyOracleHint")}
                    type="password"
                  />
                )}
              </div>
            )}
            <Input
              label={t("validationModelIdLabel")}
              placeholder={t("validationModelIdPlaceholder")}
              value={formData.validationModelId}
              onChange={(e) => setFormData({ ...formData, validationModelId: e.target.value })}
              hint={t("validationModelIdHint")}
            />
            <Input
              label={t("priorityLabel")}
              type="number"
              value={formData.priority}
              onChange={(e) =>
                setFormData({ ...formData, priority: Number.parseInt(e.target.value) || 1 })
              }
            />
            {usesBaseUrl && (
              <Input
                label={t("baseUrlLabel")}
                value={formData.baseUrl}
                onChange={(e) => setFormData({ ...formData, baseUrl: e.target.value })}
                placeholder={getProviderBaseUrlPlaceholder(provider)}
                hint={getProviderBaseUrlHint(provider, t)}
              />
            )}
            {showsRegion && (
              <Input
                label={t("regionLabel")}
                value={formData.region}
                onChange={(e) => setFormData({ ...formData, region: e.target.value })}
                placeholder={defaultRegion}
                hint={t("regionHint")}
              />
            )}
            {isCloudflare && (
              <Input
                label={t("accountIdLabel")}
                value={formData.accountId}
                onChange={(e) => setFormData({ ...formData, accountId: e.target.value })}
                placeholder={t("accountIdPlaceholder")}
                hint={t("accountIdHint")}
              />
            )}
            {isGlm && (
              <div>
                <label className="text-sm font-medium text-text-main mb-1 block">
                  {t("apiRegionLabel")}
                </label>
                <select
                  value={formData.apiRegion}
                  onChange={(e) => setFormData({ ...formData, apiRegion: e.target.value })}
                  className="w-full px-3 py-2 text-sm border border-border rounded-lg bg-background focus:outline-none focus:border-primary"
                >
                  <option value="international">{t("apiRegionInternational")}</option>
                  <option value="china">{t("apiRegionChina")}</option>
                </select>
                <p className="text-xs text-text-muted mt-1">{t("apiRegionHint")}</p>
              </div>
            )}
            <div className="flex gap-2">
              <Button
                onClick={handleSubmit}
                fullWidth
                disabled={
                  !formData.name ||
                  (!isCompatible && !apiKeyOptional && !formData.apiKey) ||
                  (isCompatible && !formData.defaultModel.trim()) ||
                  (isGooglePse && !formData.cx.trim()) ||
                  saving ||
                  (usesBaseUrl && !formData.baseUrl.trim() && !defaultBaseUrl)
                }
              >
                {saving ? t("saving") : t("save")}
              </Button>
              <Button onClick={onClose} variant="ghost" fullWidth>
                {t("cancel")}
              </Button>
            </div>
          </>
        )}
      </div>
    </Modal>
  );
}
