"use client";
import { useState, useEffect, useRef } from "react";
import { useNotificationStore } from "@/store/notificationStore";
import Link from "next/link";
import { useTranslations } from "next-intl";
import {
  Button,
  Badge,
  Input,
  Modal,
  Toggle,
  Select
} from "@/shared/components";
import {
  providerAllowsOptionalApiKey,
  supportsBulkApiKey
} from "@/shared/constants/providers";
import { parseBulkApiKeys } from "@/shared/utils/bulkApiKeyParser";
import {
  getWebSessionCredentialRequirement
} from "./webSessionCredentials";

import type {
  CompatByProtocolMap,
  ModelCompatSavePatch,
  CompatModelRow,
  CompatModelMap,
  ModelRowProps,
  PassthroughModelRowProps,
  PassthroughModelsSectionProps,
  CustomModelsSectionProps,
  CompatibleModelsSectionProps,
  ProviderMessageTranslator,
  HeaderDraftRow,
  ProviderModelsApiErrorBody,
  CommandCodeAuthFlowState,
  CooldownTimerProps,
  ConnectionRowConnection,
  ConnectionRowProps,
  AddApiKeyModalProps,
  EditConnectionModalConnection,
  EditConnectionModalProps,
  EditCompatibleNodeModalNode,
  EditCompatibleNodeModalProps,
  ImportTopTab,
  ClaudeImportTopTab,
  GeminiImportTopTab,
  LocalProviderMetadata
} from "./types";
import {
  providerText,
  getWebSessionCredentialLabel,
  getWebSessionCredentialHint,
  getWebSessionCredentialCheckLabel,
  getAddCredentialModalTitle,
  WebSessionCredentialGuide,
  getLocalProviderMetadata,
  isBaseUrlConfigurableProvider,
  getProviderBaseUrlDefault,
  getProviderBaseUrlHint,
  getProviderBaseUrlPlaceholder,
  isGlmProvider,
  parseRoutingTagsInput,
  parseExcludedModelsInput,
  extractCommandCodeCredentialInput,
  normalizeAndValidateHttpBaseUrl,
  previewCodexJson,
  parseBulkPasteText,
  extractEmailFromClaudeJson,
  previewClaudeJson,
  previewGeminiJson
} from "./utils";

function AddApiKeyModal({
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
  const usesBaseUrl = isBaseUrlConfigurableProvider(provider);
  const defaultBaseUrl = getProviderBaseUrlDefault(provider);
  const isVertex = provider === "vertex" || provider === "vertex-partner";
  const isBedrock = provider === "bedrock";
  const showsRegion = isVertex || isBedrock;
  const defaultRegion = isBedrock ? "eu-west-2" : "us-central1";
  const isGlm = isGlmProvider(provider);
  const isQoder = provider === "qoder";
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
    name: "",
    apiKey: "",
    priority: 1,
    baseUrl: initialBaseUrl || defaultBaseUrl,
    cx: "",
    region: showsRegion ? defaultRegion : "",
    apiRegion: "international",
    validationModelId: "",
    routingTags: "",
    excludedModels: "",
    customUserAgent: "",
    accountId: "",
    consoleApiKey: "",
    ccCompatibleContext1m: false,
    passthroughModels: false,
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
  const apiCredentialLabel = isQoder
    ? t("personalAccessTokenLabel")
    : webSessionCredential
      ? getWebSessionCredentialLabel(t, webSessionCredential, apiKeyOptional)
      : apiKeyOptional
        ? `${t("apiKeyLabel")} (${t("optional").toLowerCase()})`
        : t("apiKeyLabel");
  const apiCredentialPlaceholder = isVertex
    ? t("vertexServiceAccountPlaceholder")
    : isWebSessionCredential
      ? webSessionCredential.placeholder
      : isQoder
        ? t("qoderPatPlaceholder")
        : apiKeyOptional
          ? t("optional")
          : undefined;
  const apiCredentialHint = isQoder
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

  const handleValidate = async () => {
    setValidating(true);
    setSaveError(null);
    try {
      const credentialInput = isCommandCode
        ? extractCommandCodeCredentialInput(formData.apiKey)
        : formData.apiKey;
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
      setValidationResult(data.valid ? "success" : "failed");
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
    const credentialInput = isCommandCode
      ? extractCommandCodeCredentialInput(formData.apiKey)
      : formData.apiKey;
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
          if (!isValid && data.error) {
            validationError = data.error;
          }
          setValidationResult(isValid ? "success" : "failed");
        } catch {
          setValidationResult("failed");
        } finally {
          setValidating(false);
        }
      }

      if (!isValid) {
        if (apiKeyOptional && !credentialInput) {
          // Bypass validation block for local/optional providers when no key is provided
          console.debug("Validation failed but apiKey is optional; proceeding to save.");
        } else {
          setSaveError(validationError || credentialValidationFailedMessage);
          return;
        }
      }

      const providerSpecificData: Record<string, unknown> = {};
      if (formData.customUserAgent.trim()) {
        providerSpecificData.customUserAgent = formData.customUserAgent.trim();
      }
      if (formData.routingTags.trim()) {
        providerSpecificData.tags = parseRoutingTagsInput(formData.routingTags);
      }
      if (formData.excludedModels.trim()) {
        providerSpecificData.excludedModels = parseExcludedModelsInput(formData.excludedModels);
      }
      if (formData.passthroughModels) {
        providerSpecificData.passthroughModels = true;
      }
      if (provider === "bailian-coding-plan" && formData.consoleApiKey.trim()) {
        providerSpecificData.consoleApiKey = formData.consoleApiKey.trim();
      }
      if (isGooglePse && formData.cx.trim()) {
        providerSpecificData.cx = formData.cx.trim();
      }
      if (usesBaseUrl) {
        providerSpecificData.baseUrl = validatedBaseUrl;
      } else if (showsRegion) {
        providerSpecificData.region = formData.region.trim() || defaultRegion;
      } else if (isGlm) {
        providerSpecificData.apiRegion = formData.apiRegion;
      } else if (isCloudflare && formData.accountId.trim()) {
        providerSpecificData.accountId = formData.accountId.trim();
      }
      if (isCcCompatible && formData.ccCompatibleContext1m) {
        providerSpecificData.requestDefaults = { context1m: true };
      }

      const payload = {
        name: formData.name,
        apiKey: credentialInput.trim() || undefined,
        priority: formData.priority,
        testStatus: "active",
        providerSpecificData:
          Object.keys(providerSpecificData).length > 0 ? providerSpecificData : undefined,
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
    const parsed = parseBulkApiKeys(bulkText);
    setBulkWarnings(parsed.warnings);
    if (parsed.entries.length === 0) return;

    setSaving(true);
    setBulkResult(null);
    setSaveError(null);

    try {
      let providerSpecificData: Record<string, unknown> | undefined;
      if (usesBaseUrl) {
        const checked = normalizeAndValidateHttpBaseUrl(formData.baseUrl, defaultBaseUrl);
        if (checked.error) {
          setSaveError(checked.error);
          return;
        }
        providerSpecificData = { baseUrl: checked.value };
      }

      const res = await fetch("/api/providers/bulk", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          provider,
          entries: parsed.entries.map((e) => ({ name: e.name, apiKey: e.apiKey })),
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
            <p className="text-xs text-text-muted">{t("bulkAddFormatHint")}</p>
            <textarea
              className="w-full rounded border border-border bg-background p-2 text-sm font-mono resize-y min-h-[140px] focus:outline-none focus:ring-1 focus:ring-primary"
              placeholder={"name1|sk-key1\nname2|sk-key2\nsk-key-only-auto-named"}
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
              <Badge variant={validationResult === "success" ? "success" : "error"}>
                {validationResult === "success" ? t("valid") : t("invalid")}
              </Badge>
            )}
            {saveError && (
              <div className="text-sm text-red-500 bg-red-500/10 border border-red-500/20 rounded-lg px-3 py-2">
                {saveError}
              </div>
            )}
            {isCcCompatible && (
              <div className="flex flex-col gap-4 rounded-lg border border-border/50 bg-surface/20 p-4">
                <Toggle
                  checked={formData.ccCompatibleContext1m}
                  onChange={(checked) =>
                    setFormData({ ...formData, ccCompatibleContext1m: checked })
                  }
                  label={t("ccCompatibleContext1mLabel")}
                  description={t("ccCompatibleContext1mDescription")}
                />
              </div>
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

function SiliconFlowEndpointModal({
  isOpen,
  onSelect,
  onClose,
}: {
  isOpen: boolean;
  onSelect: (baseUrl: string) => void;
  onClose: () => void;
}) {
  const t = useTranslations("providers");

  return (
    <Modal
      isOpen={isOpen}
      title={providerText(t, "connectSiliconFlow", "Connect SiliconFlow")}
      onClose={onClose}
      size="lg"
    >
      <div className="space-y-3">
        <p className="text-sm text-text-muted mb-4">
          {providerText(t, "chooseSiliconFlowEndpoint", "Choose your SiliconFlow endpoint:")}
        </p>
        {SILICONFLOW_ENDPOINTS.map((endpoint) => (
          <button
            key={endpoint.id}
            type="button"
            onClick={() => onSelect(endpoint.baseUrl)}
            className="w-full p-4 text-left border border-border rounded-lg hover:bg-sidebar transition-colors"
          >
            <div className="flex items-start gap-3">
              <span className="material-symbols-outlined text-primary mt-0.5">public</span>
              <div className="flex-1">
                <h3 className="font-semibold mb-1">
                  {providerText(
                    t,
                    endpoint.id === "siliconflow" ? "endpointGlobal" : "endpointChina",
                    endpoint.label
                  )}
                </h3>
                <p className="text-sm text-text-muted font-mono">{endpoint.baseUrl}</p>
              </div>
            </div>
          </button>
        ))}
      </div>
    </Modal>
  );
}

function ImportCodexAuthModal({ onClose, onSuccess }: ImportCodexAuthModalProps) {
  const t = useTranslations("providers");
  const notify = useNotificationStore();

  // Top-level tab: Single / Bulk
  const [topTab, setTopTab] = useState<ImportTopTab>("single");

  // ── Single mode state ──
  const [singleTab, setSingleTab] = useState<"upload" | "paste">("upload");
  const [singleParsedJson, setSingleParsedJson] = useState<unknown>(null);
  const [singleParseError, setSingleParseError] = useState<string | null>(null);
  const [singleDetectedEmail, setSingleDetectedEmail] = useState<string | null>(null);
  const [singlePasteText, setSinglePasteText] = useState("");
  const [singleName, setSingleName] = useState("");
  const [singleEmail, setSingleEmail] = useState("");
  const [singleOverwrite, setSingleOverwrite] = useState(false);
  const [singleLoading, setSingleLoading] = useState(false);
  const [singleError, setSingleError] = useState<string | null>(null);

  // ── Bulk mode state ──
  const [bulkMode, setBulkMode] = useState<BulkSubMode>("upload");
  const [bulkEntries, setBulkEntries] = useState<BulkEntry[]>([]);
  const [bulkPasteText, setBulkPasteText] = useState("");
  const [bulkZipExtracting, setBulkZipExtracting] = useState(false);
  const [bulkZipError, setBulkZipError] = useState<string | null>(null);
  const [bulkOverwrite, setBulkOverwrite] = useState(false);
  const [bulkLoading, setBulkLoading] = useState(false);
  const [bulkResult, setBulkResult] = useState<{
    success: number;
    failed: number;
    errors: { index: number; name: string; message: string }[];
  } | null>(null);

  // ── Single helpers ──

  function handleSinglePreview(json: unknown) {
    setSingleParseError(null);
    setSingleDetectedEmail(null);
    setSingleParsedJson(null);
    const { valid, email } = previewCodexJson(json);
    if (!valid) {
      setSingleParseError(t("codexImportInvalidShape") || "Not a valid Codex auth.json");
      return;
    }
    setSingleDetectedEmail(email);
    if (email && !singleEmail) setSingleEmail(email);
    setSingleParsedJson(json);
  }

  function handleSingleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      try {
        handleSinglePreview(JSON.parse(ev.target?.result as string));
      } catch {
        setSingleParseError(t("codexImportInvalidJson") || "Could not parse JSON");
      }
    };
    reader.readAsText(file);
  }

  function handleSinglePasteChange(text: string) {
    setSinglePasteText(text);
    if (!text.trim()) {
      setSingleParsedJson(null);
      setSingleParseError(null);
      setSingleDetectedEmail(null);
      return;
    }
    try {
      handleSinglePreview(JSON.parse(text));
    } catch {
      setSingleParseError(t("codexImportInvalidJson") || "Could not parse JSON");
      setSingleParsedJson(null);
    }
  }

  async function handleSingleSubmit() {
    if (!singleParsedJson) return;
    setSingleLoading(true);
    setSingleError(null);
    try {
      const res = await fetch("/api/providers/codex-auth/import", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          source: { kind: "json", json: singleParsedJson },
          name: singleName.trim() || undefined,
          email: singleEmail.trim() || undefined,
          overwriteExisting: singleOverwrite,
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setSingleError(
          data.code === "duplicate_account"
            ? t("codexImportDuplicate") ||
                "Account already exists — enable Replace existing to overwrite"
            : data.error || t("codexImportFailed") || "Failed to import"
        );
        return;
      }
      notify.success(t("codexImportSuccess") || "Codex connection imported successfully");
      onSuccess();
    } catch {
      setSingleError(t("codexImportFailed") || "Failed to import Codex auth");
    } finally {
      setSingleLoading(false);
    }
  }

  // ── Bulk helpers ──

  function handleBulkFilesChange(e: React.ChangeEvent<HTMLInputElement>) {
    const files = Array.from(e.target.files || []);
    const entries: BulkEntry[] = [];
    let pending = files.length;
    if (pending === 0) return;
    files.forEach((file) => {
      const reader = new FileReader();
      reader.onload = (ev) => {
        try {
          const json = JSON.parse(ev.target?.result as string);
          const { email } = previewCodexJson(json);
          entries.push({
            name: email || file.name.replace(".json", ""),
            json,
            parseError: null,
            email,
          });
        } catch {
          entries.push({ name: file.name, json: null, parseError: "Invalid JSON", email: null });
        }
        if (--pending === 0) setBulkEntries([...entries]);
      };
      reader.readAsText(file);
    });
  }

  function handleBulkPasteChange(text: string) {
    setBulkPasteText(text);
    if (!text.trim()) {
      setBulkEntries([]);
      return;
    }
    setBulkEntries(parseBulkPasteText(text));
  }

  async function handleZipUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setBulkZipExtracting(true);
    setBulkZipError(null);
    setBulkEntries([]);
    try {
      const res = await fetch("/api/providers/codex-auth/zip-extract", {
        method: "POST",
        headers: { "Content-Type": "application/octet-stream" },
        body: file,
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setBulkZipError(data.error || t("codexImportBulkZipError") || "Failed to extract ZIP");
        return;
      }
      const extracted: BulkEntry[] = (data.entries || []).map(
        (entry: { name: string; json: unknown; parseError: string | null }) => {
          if (entry.parseError)
            return { name: entry.name, json: null, parseError: entry.parseError, email: null };
          const { email } = previewCodexJson(entry.json);
          return {
            name: email || entry.name.replace(".json", ""),
            json: entry.json,
            parseError: null,
            email,
          };
        }
      );
      setBulkEntries(extracted);
    } catch {
      setBulkZipError(t("codexImportBulkZipError") || "Failed to extract ZIP");
    } finally {
      setBulkZipExtracting(false);
    }
  }

  async function handleBulkSubmit() {
    const validEntries = bulkEntries.filter((e) => !e.parseError && e.json !== null);
    if (validEntries.length === 0) return;
    setBulkLoading(true);
    setBulkResult(null);
    try {
      const res = await fetch("/api/providers/codex-auth/import-bulk", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          entries: validEntries.map((e) => ({
            json: e.json,
            name: e.name || undefined,
            email: e.email || undefined,
          })),
          overwriteExisting: bulkOverwrite,
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        notify.error(data.error || t("codexImportFailed") || "Failed to import");
        return;
      }
      setBulkResult({ success: data.success, failed: data.failed, errors: data.errors || [] });
      if (data.success > 0) onSuccess();
    } catch {
      notify.error(t("codexImportFailed") || "Failed to import Codex auth");
    } finally {
      setBulkLoading(false);
    }
  }

  const singleCanSubmit = !!singleParsedJson && !singleParseError && !singleLoading;
  const validBulkCount = bulkEntries.filter((e) => !e.parseError && e.json !== null).length;
  const bulkCanSubmit = validBulkCount > 0 && !bulkLoading && !bulkZipExtracting;

  const TOP_TABS: { id: ImportTopTab; label: string }[] = [
    { id: "single", label: t("codexImportTabSingle") || "Single" },
    { id: "bulk", label: t("codexImportTabBulk") || "Bulk" },
  ];

  const BULK_MODES: { id: BulkSubMode; label: string }[] = [
    { id: "upload", label: t("codexImportBulkModeUpload") || "Upload files" },
    { id: "paste", label: t("codexImportBulkModePaste") || "Paste list" },
    { id: "zip", label: t("codexImportBulkModeZip") || "ZIP archive" },
  ];

  return (
    <Modal
      isOpen
      onClose={onClose}
      title={t("codexImportModalTitle") || "Import Codex Auth"}
      maxWidth="max-w-lg"
    >
      <div className="flex flex-col gap-4">
        {/* Top-level Single / Bulk tabs */}
        <div className="flex border-b border-border">
          {TOP_TABS.map(({ id, label }) => (
            <button
              key={id}
              onClick={() => {
                setTopTab(id);
                setBulkResult(null);
                setSingleError(null);
              }}
              className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
                topTab === id
                  ? "border-primary text-primary"
                  : "border-transparent text-text-muted hover:text-text-main"
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        {/* ── Single tab ── */}
        {topTab === "single" && (
          <>
            {/* Source sub-tabs */}
            <div className="flex border-b border-border">
              {(["upload", "paste"] as const).map((id) => (
                <button
                  key={id}
                  onClick={() => {
                    setSingleTab(id);
                    setSingleParsedJson(null);
                    setSingleParseError(null);
                    setSingleDetectedEmail(null);
                  }}
                  className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
                    singleTab === id
                      ? "border-primary text-primary"
                      : "border-transparent text-text-muted hover:text-text-main"
                  }`}
                >
                  {id === "upload"
                    ? t("codexImportTabUpload") || "Upload file"
                    : t("codexImportTabPaste") || "Paste JSON"}
                </button>
              ))}
            </div>

            {singleTab === "upload" && (
              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium text-text-main">
                  {t("codexImportFileLabel") || "Choose auth.json"}
                </label>
                <input
                  type="file"
                  accept=".json"
                  onChange={handleSingleFileChange}
                  className="text-sm text-text-muted file:mr-3 file:py-1.5 file:px-3 file:rounded-lg file:border file:border-border file:text-xs file:bg-bg-subtle file:text-text-main hover:file:bg-bg-hover cursor-pointer"
                />
                <p className="text-xs text-text-muted">
                  {t("codexImportFileHint") ||
                    "Select the auth.json file exported from Codex or OmniRoute."}
                </p>
              </div>
            )}

            {singleTab === "paste" && (
              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium text-text-main">
                  {t("codexImportPasteLabel") || "Paste the JSON content"}
                </label>
                <textarea
                  value={singlePasteText}
                  onChange={(e) => handleSinglePasteChange(e.target.value)}
                  rows={7}
                  placeholder='{ "auth_mode": "chatgpt", ... }'
                  className="w-full rounded-lg border border-border bg-bg-subtle px-3 py-2 text-xs font-mono text-text-main placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-primary/40 resize-none"
                />
              </div>
            )}

            {singleParseError && <p className="text-sm text-red-500">{singleParseError}</p>}
            {singleDetectedEmail && !singleParseError && (
              <p className="text-xs text-text-muted">
                {t("codexImportDetectedEmail", { email: singleDetectedEmail }) ||
                  `Detected: ${singleDetectedEmail}`}
              </p>
            )}

            <div className="flex flex-col gap-3">
              <div className="flex flex-col gap-1">
                <label className="text-sm font-medium text-text-main">
                  {t("codexImportEmailLabel") || "Account email"}
                </label>
                <input
                  type="email"
                  value={singleEmail}
                  onChange={(e) => setSingleEmail(e.target.value)}
                  placeholder="user@example.com"
                  className="rounded-lg border border-border bg-bg-subtle px-3 py-2 text-sm text-text-main placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-primary/40"
                />
                <p className="text-xs text-text-muted">
                  {t("codexImportEmailHint") || "Auto-detected from the file; edit if needed."}
                </p>
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-sm font-medium text-text-main">
                  {t("codexImportNameLabel") || "Connection name (optional)"}
                </label>
                <input
                  type="text"
                  value={singleName}
                  onChange={(e) => setSingleName(e.target.value)}
                  placeholder={singleEmail || "Codex (imported)"}
                  className="rounded-lg border border-border bg-bg-subtle px-3 py-2 text-sm text-text-main placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-primary/40"
                />
              </div>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={singleOverwrite}
                  onChange={(e) => setSingleOverwrite(e.target.checked)}
                  className="rounded border-border"
                />
                <span className="text-sm text-text-main">
                  {t("codexImportOverwriteLabel") ||
                    "Replace existing connection if account already exists"}
                </span>
              </label>
            </div>

            {singleError && (
              <div className="rounded-lg bg-red-500/10 border border-red-500/20 px-4 py-3 text-sm text-red-400">
                {singleError}
              </div>
            )}

            <div className="flex gap-2 pt-1">
              <Button
                onClick={handleSingleSubmit}
                disabled={!singleCanSubmit}
                loading={singleLoading}
                fullWidth
              >
                {t("codexImportSubmit") || "Import"}
              </Button>
              <Button onClick={onClose} variant="ghost" fullWidth>
                {t("cancel")}
              </Button>
            </div>
          </>
        )}

        {/* ── Bulk tab ── */}
        {topTab === "bulk" && (
          <>
            {/* Sub-mode selector */}
            <div className="flex gap-1 p-1 bg-bg-subtle rounded-lg">
              {BULK_MODES.map(({ id, label }) => (
                <button
                  key={id}
                  onClick={() => {
                    setBulkMode(id);
                    setBulkEntries([]);
                    setBulkZipError(null);
                    setBulkPasteText("");
                    setBulkResult(null);
                  }}
                  className={`flex-1 px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
                    bulkMode === id
                      ? "bg-bg-primary text-text-main shadow-sm"
                      : "text-text-muted hover:text-text-main"
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>

            {/* Upload mode */}
            {bulkMode === "upload" && (
              <div className="flex flex-col gap-2">
                <input
                  type="file"
                  accept=".json"
                  multiple
                  onChange={handleBulkFilesChange}
                  className="text-sm text-text-muted file:mr-3 file:py-1.5 file:px-3 file:rounded-lg file:border file:border-border file:text-xs file:bg-bg-subtle file:text-text-main hover:file:bg-bg-hover cursor-pointer"
                />
                <p className="text-xs text-text-muted">
                  {t("codexImportBulkUploadHint") || "Select multiple .json files"}
                </p>
              </div>
            )}

            {/* Paste mode */}
            {bulkMode === "paste" && (
              <div className="flex flex-col gap-2">
                <textarea
                  value={bulkPasteText}
                  onChange={(e) => handleBulkPasteChange(e.target.value)}
                  rows={7}
                  placeholder={'[{ "auth_mode": "chatgpt", ... }, ...]'}
                  className="w-full rounded-lg border border-border bg-bg-subtle px-3 py-2 text-xs font-mono text-text-main placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-primary/40 resize-none"
                />
                <p className="text-xs text-text-muted">
                  {t("codexImportBulkPasteHint") || "JSON array or multiple JSONs separated by ---"}
                </p>
              </div>
            )}

            {/* ZIP mode */}
            {bulkMode === "zip" && (
              <div className="flex flex-col gap-2">
                <input
                  type="file"
                  accept=".zip"
                  onChange={handleZipUpload}
                  disabled={bulkZipExtracting}
                  className="text-sm text-text-muted file:mr-3 file:py-1.5 file:px-3 file:rounded-lg file:border file:border-border file:text-xs file:bg-bg-subtle file:text-text-main hover:file:bg-bg-hover cursor-pointer disabled:opacity-50"
                />
                {bulkZipExtracting && (
                  <p className="text-xs text-text-muted animate-pulse">
                    {t("codexImportBulkZipExtracting") || "Extracting ZIP…"}
                  </p>
                )}
                {bulkZipError && <p className="text-sm text-red-500">{bulkZipError}</p>}
                <p className="text-xs text-text-muted">
                  {t("codexImportBulkZipHint") ||
                    "Upload a .zip containing auth.json files (max 50 files, 10 MB)"}
                </p>
              </div>
            )}

            {/* Entry preview list */}
            {bulkEntries.length > 0 && !bulkResult && (
              <div className="flex flex-col gap-1 max-h-40 overflow-y-auto rounded-lg border border-border bg-bg-subtle p-2">
                <p className="text-xs font-medium text-text-muted px-1">
                  {validBulkCount} / {bulkEntries.length} valid
                </p>
                {bulkEntries.map((entry, i) => (
                  <div key={i} className="flex items-center gap-2 px-2 py-1 rounded">
                    <span
                      className={`material-symbols-outlined text-[14px] ${entry.parseError ? "text-red-500" : "text-emerald-500"}`}
                    >
                      {entry.parseError ? "error" : "check_circle"}
                    </span>
                    <span className="text-xs text-text-main flex-1 truncate">{entry.name}</span>
                    {entry.parseError && (
                      <span className="text-xs text-red-400">{entry.parseError}</span>
                    )}
                  </div>
                ))}
              </div>
            )}

            {/* Overwrite checkbox */}
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={bulkOverwrite}
                onChange={(e) => setBulkOverwrite(e.target.checked)}
                className="rounded border-border"
              />
              <span className="text-sm text-text-main">
                {t("codexImportOverwriteLabel") ||
                  "Replace existing connections if accounts already exist"}
              </span>
            </label>

            {/* Result panel */}
            {bulkResult && (
              <div
                className={`rounded-lg border px-4 py-3 text-sm ${
                  bulkResult.failed === 0
                    ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-400"
                    : "bg-amber-500/10 border-amber-500/20 text-amber-400"
                }`}
              >
                <p className="font-medium">
                  {bulkResult.success}{" "}
                  {t("codexImportBulkSuccess", { count: bulkResult.success }) || "imported"} ·{" "}
                  {bulkResult.failed}{" "}
                  {t("codexImportBulkFailed", { count: bulkResult.failed }) || "failed"}
                </p>
                {bulkResult.errors.length > 0 && (
                  <ul className="mt-2 space-y-0.5 text-xs">
                    {bulkResult.errors.map((e, i) => (
                      <li key={i}>
                        <span className="font-medium">{e.name}:</span> {e.message}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            )}

            <div className="flex gap-2 pt-1">
              <Button
                onClick={handleBulkSubmit}
                disabled={!bulkCanSubmit}
                loading={bulkLoading}
                fullWidth
              >
                {bulkLoading
                  ? t("saving") || "Importing…"
                  : typeof t.has === "function" && t.has("codexImportBulkSubmit")
                    ? t("codexImportBulkSubmit", { count: validBulkCount })
                    : `Import ${validBulkCount} accounts`}
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

function ApplyCodexAuthModal({
  connectionId,
  inProgress,
  onConfirm,
  onClose,
}: {
  connectionId: string | null;
  inProgress: boolean;
  onConfirm: (id: string) => Promise<void>;
  onClose: () => void;
}) {
  const t = useTranslations("providers");
  // `key`-reset pattern: caller re-mounts the modal each open (different
  // connectionId triggers a new instance), so local confirmation state is
  // naturally fresh without any post-render bookkeeping.
  const [confirmed, setConfirmed] = useState(false);
  const isOpen = !!connectionId;

  if (!connectionId) return null;

  const title =
    typeof t.has === "function" && t.has("codexApplyModalTitle")
      ? t("codexApplyModalTitle")
      : "Apply to Local Codex";
  const targetLabel =
    typeof t.has === "function" && t.has("codexApplyTargetLabel")
      ? t("codexApplyTargetLabel")
      : "Target path";
  const backupLabel =
    typeof t.has === "function" && t.has("codexApplyBackupLabel")
      ? t("codexApplyBackupLabel")
      : "Backups";
  const warning =
    typeof t.has === "function" && t.has("codexApplyWarning")
      ? t("codexApplyWarning")
      : "This will replace the existing auth.json. Continue?";
  const confirmText =
    typeof t.has === "function" && t.has("codexApplyConfirmCheckbox")
      ? t("codexApplyConfirmCheckbox")
      : "I confirm I want to replace the existing auth.json";
  const applyText = typeof t.has === "function" && t.has("codexApply") ? t("codexApply") : "Apply";

  return (
    <Modal isOpen={isOpen} title={title} onClose={onClose}>
      <div className="flex flex-col gap-4">
        <div>
          <div className="text-xs uppercase text-text-muted mb-1">{targetLabel}</div>
          <code className="block rounded bg-sidebar px-2 py-1.5 text-xs font-mono text-text-main">
            ~/.codex/auth.json
          </code>
          <p className="mt-1 text-xs text-text-muted">{t("providerDetailPathAutoDetectedAllOs")}</p>
        </div>
        <div>
          <div className="text-xs uppercase text-text-muted mb-1">{backupLabel}</div>
          <ul className="text-xs text-text-muted space-y-0.5 list-disc pl-4">
            <li>
              <code className="text-text-main">~/.codex/auth-&lt;timestamp&gt;.bak</code> — quick
              local rollback
            </li>
            <li>Centralized backup history (audit trail)</li>
          </ul>
        </div>
        <div className="rounded-lg border border-amber-500/25 bg-amber-500/10 px-3 py-2 text-sm text-amber-200">
          <div className="flex items-start gap-2">
            <span className="material-symbols-outlined mt-0.5 text-[18px] text-amber-500">
              warning
            </span>
            <span>{warning}</span>
          </div>
        </div>
        <label className="flex items-center gap-2 text-sm text-text-muted cursor-pointer">
          <input
            type="checkbox"
            checked={confirmed}
            onChange={(e) => setConfirmed(e.target.checked)}
            className="rounded border-border"
          />
          {confirmText}
        </label>
        <div className="flex gap-2">
          <Button
            onClick={() => void onConfirm(connectionId)}
            fullWidth
            disabled={!confirmed || inProgress}
          >
            {inProgress ? t("saving") : applyText}
          </Button>
          <Button onClick={onClose} variant="ghost" fullWidth disabled={inProgress}>
            {t("cancel")}
          </Button>
        </div>
      </div>
    </Modal>
  );
}

function ImportClaudeAuthModal({ onClose, onSuccess }: ImportClaudeAuthModalProps) {
  const t = useTranslations("providers");
  const notify = useNotificationStore();

  const [topTab, setTopTab] = useState<ClaudeImportTopTab>("single");
  const [singleSubTab, setSingleSubTab] = useState<"upload" | "paste">("upload");
  const [bulkSubMode, setBulkSubMode] = useState<ClaudeBulkSubMode>("upload");

  // Single
  const [singleJson, setSingleJson] = useState<unknown>(null);
  const [singlePasteText, setSinglePasteText] = useState("");
  const [singleName, setSingleName] = useState("");
  const [singleEmail, setSingleEmail] = useState("");
  const [overwriteExisting, setOverwriteExisting] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  // Bulk
  const [bulkEntries, setBulkEntries] = useState<ClaudeBulkEntry[]>([]);
  const [bulkPasteText, setBulkPasteText] = useState("");
  const [bulkSubmitting, setBulkSubmitting] = useState(false);
  const [bulkErrors, setBulkErrors] = useState<{ index: number; name: string; message: string }[]>(
    []
  );
  const [bulkResult, setBulkResult] = useState<{
    success: number;
    failed: number;
    total: number;
  } | null>(null);
  const [zipExtracting, setZipExtracting] = useState(false);

  const handleSingleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      try {
        const json = JSON.parse(ev.target?.result as string);
        setSingleJson(json);
      } catch {
        notify.error(
          typeof t.has === "function" && t.has("claudeImportInvalidJson")
            ? t("claudeImportInvalidJson")
            : "Could not parse the file as JSON"
        );
      }
    };
    reader.readAsText(file);
  };

  const handleSingleSubmit = async () => {
    if (submitting) return;
    setSubmitting(true);
    try {
      let rawJson: unknown;
      if (singleSubTab === "upload") {
        rawJson = singleJson;
      } else {
        try {
          rawJson = JSON.parse(singlePasteText);
        } catch {
          notify.error(
            typeof t.has === "function" && t.has("claudeImportInvalidJson")
              ? t("claudeImportInvalidJson")
              : "Could not parse the pasted content as JSON"
          );
          return;
        }
      }

      const body =
        singleSubTab === "paste"
          ? {
              source: { kind: "text", text: singlePasteText },
              name: singleName || undefined,
              email: singleEmail || undefined,
              overwriteExisting,
            }
          : {
              source: { kind: "json", json: rawJson },
              name: singleName || undefined,
              email: singleEmail || undefined,
              overwriteExisting,
            };

      const res = await fetch("/api/providers/claude-auth/import", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        if (data.code === "duplicate_account") {
          notify.error(
            typeof t.has === "function" && t.has("claudeImportDuplicate")
              ? t("claudeImportDuplicate")
              : 'Account already exists — enable "Replace existing" to overwrite'
          );
        } else if (data.code === "identity_unverified") {
          notify.error(
            typeof t.has === "function" && t.has("claudeImportIdentityUnverified")
              ? t("claudeImportIdentityUnverified")
              : 'Bootstrap could not verify the account. Enable "Replace existing" or provide an email.'
          );
        } else {
          notify.error(
            data.error ||
              (typeof t.has === "function" && t.has("claudeImportFailed")
                ? t("claudeImportFailed")
                : "Failed to import Claude auth")
          );
        }
        return;
      }

      notify.success(
        typeof t.has === "function" && t.has("claudeImportSuccess")
          ? t("claudeImportSuccess")
          : "Claude connection imported successfully"
      );
      onSuccess();
    } catch {
      notify.error(
        typeof t.has === "function" && t.has("claudeImportFailed")
          ? t("claudeImportFailed")
          : "Failed to import Claude auth"
      );
    } finally {
      setSubmitting(false);
    }
  };

  const handleBulkFilesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const newEntries: ClaudeBulkEntry[] = [];
    let pending = files.length;
    if (!pending) return;
    files.forEach((file) => {
      const reader = new FileReader();
      reader.onload = (ev) => {
        try {
          const json = JSON.parse(ev.target?.result as string);
          const email = extractEmailFromClaudeJson(json);
          newEntries.push({
            name: file.name.replace(/\.json$/, ""),
            json,
            parseError: null,
            email,
          });
        } catch {
          newEntries.push({
            name: file.name,
            json: null,
            parseError: "Not valid JSON",
            email: null,
          });
        }
        pending--;
        if (pending === 0) setBulkEntries((prev) => [...prev, ...newEntries]);
      };
      reader.readAsText(file);
    });
  };

  const handleBulkPasteChange = (text: string) => {
    setBulkPasteText(text);
    const trimmed = text.trim();
    if (!trimmed) {
      setBulkEntries([]);
      return;
    }
    try {
      const arr = JSON.parse(trimmed);
      if (Array.isArray(arr)) {
        setBulkEntries(
          arr.map((item, i) => ({
            name: `entry ${i + 1}`,
            json: item,
            parseError: null,
            email: null,
          }))
        );
      } else {
        setBulkEntries([{ name: "entry 1", json: arr, parseError: null, email: null }]);
      }
    } catch {
      setBulkEntries([
        { name: "parse error", json: null, parseError: "Invalid JSON", email: null },
      ]);
    }
  };

  const handleZipUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setZipExtracting(true);
    try {
      const res = await fetch("/api/providers/claude-auth/zip-extract", {
        method: "POST",
        headers: { "Content-Type": "application/zip" },
        body: file,
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        notify.error(
          data.error ||
            (typeof t.has === "function" && t.has("claudeImportBulkZipError")
              ? t("claudeImportBulkZipError")
              : "Failed to extract ZIP")
        );
        return;
      }
      const entries: ClaudeBulkEntry[] = (data.entries || []).map(
        (e: { name: string; json: unknown; parseError: string | null }) => ({
          name: e.name,
          json: e.json,
          parseError: e.parseError,
          email: null,
        })
      );
      setBulkEntries(entries);
    } catch {
      notify.error(
        typeof t.has === "function" && t.has("claudeImportBulkZipError")
          ? t("claudeImportBulkZipError")
          : "Failed to extract ZIP"
      );
    } finally {
      setZipExtracting(false);
    }
  };

  const handleBulkSubmit = async () => {
    if (bulkSubmitting) return;
    setBulkSubmitting(true);
    setBulkErrors([]);
    setBulkResult(null);
    try {
      const validEntries = bulkEntries.filter((e) => e.json !== null);
      if (validEntries.length === 0) {
        notify.error("No valid entries to import");
        return;
      }
      const res = await fetch("/api/providers/claude-auth/import-bulk", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          entries: validEntries.map((e) => ({
            json: e.json,
            name: e.name,
            email: e.email || undefined,
          })),
          overwriteExisting,
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        notify.error(
          data.error ||
            (typeof t.has === "function" && t.has("claudeImportBulkFailed")
              ? t("claudeImportBulkFailed")
              : "Some entries failed to import")
        );
        return;
      }
      setBulkResult({ success: data.success, failed: data.failed, total: data.total });
      if (data.errors?.length > 0) setBulkErrors(data.errors);
      if (data.success > 0) {
        notify.success(
          typeof t.has === "function" && t.has("claudeImportBulkSuccess")
            ? t("claudeImportBulkSuccess", { count: data.success })
            : `Imported ${data.success} Claude connections`
        );
        if (data.failed === 0) onSuccess();
      }
    } catch {
      notify.error(
        typeof t.has === "function" && t.has("claudeImportBulkFailed")
          ? t("claudeImportBulkFailed")
          : "Some entries failed to import"
      );
    } finally {
      setBulkSubmitting(false);
    }
  };

  const tabLabels: Record<ClaudeImportTopTab, string> = {
    single:
      typeof t.has === "function" && t.has("claudeImportTabSingle")
        ? t("claudeImportTabSingle")
        : "Single",
    bulk:
      typeof t.has === "function" && t.has("claudeImportTabBulk")
        ? t("claudeImportTabBulk")
        : "Bulk",
  };

  const modalTitle =
    typeof t.has === "function" && t.has("claudeImportModalTitle")
      ? t("claudeImportModalTitle")
      : "Import Claude Auth";

  return (
    <Modal isOpen onClose={onClose} title={modalTitle}>
      <div className="flex flex-col gap-4">
        {/* Top tabs */}
        <div className="flex gap-1 border-b border-border pb-0">
          {(["single", "bulk"] as ClaudeImportTopTab[]).map((tab) => (
            <button
              key={tab}
              onClick={() => setTopTab(tab)}
              className={`px-3 py-1.5 text-sm rounded-t-md transition-colors ${
                topTab === tab
                  ? "bg-primary/10 text-primary border-b-2 border-primary"
                  : "text-text-muted hover:text-text-primary"
              }`}
            >
              {tabLabels[tab]}
            </button>
          ))}
        </div>

        {topTab === "single" && (
          <div className="flex flex-col gap-3">
            {/* Sub-tabs */}
            <div className="flex gap-1">
              {(["upload", "paste"] as const).map((sub) => (
                <button
                  key={sub}
                  onClick={() => setSingleSubTab(sub)}
                  className={`px-2 py-1 text-xs rounded transition-colors ${
                    singleSubTab === sub
                      ? "bg-bg-subtle text-text-primary"
                      : "text-text-muted hover:text-text-primary"
                  }`}
                >
                  {sub === "upload"
                    ? typeof t.has === "function" && t.has("claudeImportTabUpload")
                      ? t("claudeImportTabUpload")
                      : "Upload file"
                    : typeof t.has === "function" && t.has("claudeImportTabPaste")
                      ? t("claudeImportTabPaste")
                      : "Paste JSON"}
                </button>
              ))}
            </div>
            {singleSubTab === "upload" ? (
              <div>
                <label className="block text-xs text-text-muted mb-1">
                  {typeof t.has === "function" && t.has("claudeImportFileLabel")
                    ? t("claudeImportFileLabel")
                    : "Choose .credentials.json"}
                </label>
                <input
                  type="file"
                  accept=".json"
                  onChange={handleSingleFileChange}
                  className="block w-full text-sm"
                />
                {singleJson && previewClaudeJson(singleJson).valid && (
                  <p className="mt-1 text-xs text-emerald-500">
                    {t("providerDetailValidClaudeCredentialsFile")}
                  </p>
                )}
                {singleJson && !previewClaudeJson(singleJson).valid && (
                  <p className="mt-1 text-xs text-red-500">
                    {typeof t.has === "function" && t.has("claudeImportInvalidShape")
                      ? t("claudeImportInvalidShape")
                      : "The file is not a valid .credentials.json"}
                  </p>
                )}
              </div>
            ) : (
              <div>
                <label className="block text-xs text-text-muted mb-1">
                  {typeof t.has === "function" && t.has("claudeImportPasteLabel")
                    ? t("claudeImportPasteLabel")
                    : "Paste the JSON content"}
                </label>
                <textarea
                  value={singlePasteText}
                  onChange={(e) => setSinglePasteText(e.target.value)}
                  rows={6}
                  className="w-full rounded border border-border bg-bg-subtle px-2 py-1.5 text-xs font-mono text-text-main"
                  placeholder='{ "claudeAiOauth": { ... } }'
                />
              </div>
            )}
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-xs text-text-muted mb-1">
                  {typeof t.has === "function" && t.has("claudeImportEmailLabel")
                    ? t("claudeImportEmailLabel")
                    : "Account email"}
                </label>
                <input
                  type="email"
                  value={singleEmail}
                  onChange={(e) => setSingleEmail(e.target.value)}
                  placeholder="auto-detected"
                  className="w-full rounded border border-border bg-bg-subtle px-2 py-1.5 text-xs text-text-main"
                />
              </div>
              <div>
                <label className="block text-xs text-text-muted mb-1">
                  {typeof t.has === "function" && t.has("claudeImportNameLabel")
                    ? t("claudeImportNameLabel")
                    : "Connection name (optional)"}
                </label>
                <input
                  type="text"
                  value={singleName}
                  onChange={(e) => setSingleName(e.target.value)}
                  placeholder="My Claude account"
                  className="w-full rounded border border-border bg-bg-subtle px-2 py-1.5 text-xs text-text-main"
                />
              </div>
            </div>
            <label className="flex items-center gap-2 text-xs text-text-muted">
              <input
                type="checkbox"
                checked={overwriteExisting}
                onChange={(e) => setOverwriteExisting(e.target.checked)}
              />
              {typeof t.has === "function" && t.has("claudeImportOverwriteLabel")
                ? t("claudeImportOverwriteLabel")
                : "Replace existing connection if account already exists"}
            </label>
            <Button
              loading={submitting}
              onClick={handleSingleSubmit}
              disabled={singleSubTab === "upload" ? !singleJson : !singlePasteText.trim()}
            >
              {typeof t.has === "function" && t.has("claudeImportSubmit")
                ? t("claudeImportSubmit")
                : "Import"}
            </Button>
          </div>
        )}

        {topTab === "bulk" && (
          <div className="flex flex-col gap-3">
            {/* Sub-mode tabs */}
            <div className="flex gap-1">
              {(["upload", "paste", "zip"] as ClaudeBulkSubMode[]).map((mode) => (
                <button
                  key={mode}
                  onClick={() => {
                    setBulkSubMode(mode);
                    setBulkEntries([]);
                  }}
                  className={`px-2 py-1 text-xs rounded transition-colors ${
                    bulkSubMode === mode
                      ? "bg-bg-subtle text-text-primary"
                      : "text-text-muted hover:text-text-primary"
                  }`}
                >
                  {mode === "upload"
                    ? typeof t.has === "function" && t.has("claudeImportBulkModeUpload")
                      ? t("claudeImportBulkModeUpload")
                      : "Upload files"
                    : mode === "paste"
                      ? typeof t.has === "function" && t.has("claudeImportBulkModePaste")
                        ? t("claudeImportBulkModePaste")
                        : "Paste JSON array"
                      : typeof t.has === "function" && t.has("claudeImportBulkModeZip")
                        ? t("claudeImportBulkModeZip")
                        : "Upload ZIP"}
                </button>
              ))}
            </div>

            {bulkSubMode === "upload" && (
              <div>
                <p className="text-xs text-text-muted mb-1">
                  {typeof t.has === "function" && t.has("claudeImportBulkUploadHint")
                    ? t("claudeImportBulkUploadHint")
                    : "Drop or pick up to 50 .credentials.json files (256KB each, 10MB total)."}
                </p>
                <input
                  type="file"
                  accept=".json"
                  multiple
                  onChange={handleBulkFilesChange}
                  className="block w-full text-sm"
                />
              </div>
            )}
            {bulkSubMode === "paste" && (
              <div>
                <p className="text-xs text-text-muted mb-1">
                  {typeof t.has === "function" && t.has("claudeImportBulkPasteHint")
                    ? t("claudeImportBulkPasteHint")
                    : "Paste an array of objects: [{ json, name?, email? }, ...]"}
                </p>
                <textarea
                  value={bulkPasteText}
                  onChange={(e) => handleBulkPasteChange(e.target.value)}
                  rows={6}
                  className="w-full rounded border border-border bg-bg-subtle px-2 py-1.5 text-xs font-mono text-text-main"
                  placeholder="[{ ... }, { ... }]"
                />
              </div>
            )}
            {bulkSubMode === "zip" && (
              <div>
                <p className="text-xs text-text-muted mb-1">
                  {typeof t.has === "function" && t.has("claudeImportBulkZipHint")
                    ? t("claudeImportBulkZipHint")
                    : "ZIP containing .json entries. Max 50 entries, 10MB unpacked."}
                </p>
                {zipExtracting ? (
                  <p className="text-xs text-primary animate-pulse">
                    {typeof t.has === "function" && t.has("claudeImportBulkZipExtracting")
                      ? t("claudeImportBulkZipExtracting")
                      : "Extracting ZIP…"}
                  </p>
                ) : (
                  <input
                    type="file"
                    accept=".zip"
                    onChange={handleZipUpload}
                    className="block w-full text-sm"
                  />
                )}
              </div>
            )}

            {bulkEntries.length > 0 && (
              <div className="rounded border border-border bg-bg-subtle px-2 py-1.5 max-h-36 overflow-y-auto">
                {bulkEntries.map((e, i) => (
                  <div
                    key={i}
                    className={`text-xs py-0.5 flex items-center gap-1 ${e.parseError ? "text-red-500" : "text-text-main"}`}
                  >
                    <span className="material-symbols-outlined text-[12px]">
                      {e.parseError ? "error" : "check_circle"}
                    </span>
                    {e.name}
                    {e.email ? ` (${e.email})` : ""}
                    {e.parseError ? ` — ${e.parseError}` : ""}
                  </div>
                ))}
              </div>
            )}

            <label className="flex items-center gap-2 text-xs text-text-muted">
              <input
                type="checkbox"
                checked={overwriteExisting}
                onChange={(e) => setOverwriteExisting(e.target.checked)}
              />
              {typeof t.has === "function" && t.has("claudeImportOverwriteLabel")
                ? t("claudeImportOverwriteLabel")
                : "Replace existing connection if account already exists"}
            </label>

            {bulkResult && (
              <div className="rounded bg-bg-subtle px-2 py-1.5 text-xs">
                {bulkResult.success}/{bulkResult.total} imported
                {bulkResult.failed > 0 ? `, ${bulkResult.failed} failed` : ""}
              </div>
            )}
            {bulkErrors.length > 0 && (
              <div className="rounded border border-red-500/30 bg-red-500/5 px-2 py-1.5 max-h-28 overflow-y-auto">
                {bulkErrors.map((e) => (
                  <div key={e.index} className="text-xs text-red-500 py-0.5">
                    {e.name}: {e.message}
                  </div>
                ))}
              </div>
            )}

            <Button
              loading={bulkSubmitting}
              onClick={handleBulkSubmit}
              disabled={bulkEntries.filter((e) => e.json !== null).length === 0}
            >
              {typeof t.has === "function" && t.has("claudeImportBulkSubmit")
                ? t("claudeImportBulkSubmit")
                : "Import all"}
            </Button>
          </div>
        )}
      </div>
    </Modal>
  );
}

function ApplyClaudeAuthModal({
  connectionId,
  inProgress,
  onConfirm,
  onClose,
}: {
  connectionId: string | null;
  inProgress: boolean;
  onConfirm: (id: string) => Promise<void>;
  onClose: () => void;
}) {
  const t = useTranslations("providers");
  const [confirmed, setConfirmed] = useState(false);
  const isOpen = !!connectionId;

  if (!connectionId) return null;

  const title =
    typeof t.has === "function" && t.has("claudeApplyModalTitle")
      ? t("claudeApplyModalTitle")
      : "Apply to Local Claude Code";
  const targetLabel =
    typeof t.has === "function" && t.has("claudeApplyTargetLabel")
      ? t("claudeApplyTargetLabel")
      : "Target path";
  const backupLabel =
    typeof t.has === "function" && t.has("claudeApplyBackupLabel")
      ? t("claudeApplyBackupLabel")
      : "Backups";
  const warning =
    typeof t.has === "function" && t.has("claudeApplyWarning")
      ? t("claudeApplyWarning")
      : "This will replace the existing claudeAiOauth section. Continue?";
  const confirmText =
    typeof t.has === "function" && t.has("claudeApplyConfirmCheckbox")
      ? t("claudeApplyConfirmCheckbox")
      : "I confirm I want to replace the existing claudeAiOauth section";
  const applyText =
    typeof t.has === "function" && t.has("claudeApply") ? t("claudeApply") : "Apply";
  const mcpHint =
    typeof t.has === "function" && t.has("claudeApplyMcpHint")
      ? t("claudeApplyMcpHint")
      : "Existing MCP OAuth state will be preserved.";

  return (
    <Modal isOpen={isOpen} title={title} onClose={onClose}>
      <div className="flex flex-col gap-4">
        <div>
          <div className="text-xs uppercase text-text-muted mb-1">{targetLabel}</div>
          <code className="block rounded bg-sidebar px-2 py-1.5 text-xs font-mono text-text-main">
            ~/.claude/.credentials.json
          </code>
          <p className="mt-1 text-xs text-text-muted">Path is auto-detected per OS (Linux/Mac).</p>
        </div>
        <div>
          <div className="text-xs uppercase text-text-muted mb-1">{backupLabel}</div>
          <code className="block rounded bg-sidebar px-2 py-1.5 text-xs font-mono text-text-main">
            {"~/.claude/credentials-{timestamp}.bak"}
          </code>
        </div>
        <div className="rounded bg-sky-500/10 border border-sky-500/20 px-3 py-2 text-xs text-sky-400">
          {mcpHint}
        </div>
        <p className="text-sm text-text-muted">{warning}</p>
        <label className="flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            checked={confirmed}
            onChange={(e) => setConfirmed(e.target.checked)}
          />
          {confirmText}
        </label>
        <div className="flex justify-end gap-2">
          <Button variant="secondary" onClick={onClose} disabled={inProgress}>
            Cancel
          </Button>
          <Button
            loading={inProgress}
            disabled={!confirmed || inProgress}
            onClick={() => void onConfirm(connectionId)}
          >
            {applyText}
          </Button>
        </div>
      </div>
    </Modal>
  );
}

function ImportGeminiAuthModal({ onClose, onSuccess }: ImportGeminiAuthModalProps) {
  const t = useTranslations("providers");
  const notify = useNotificationStore();

  const [topTab, setTopTab] = useState<GeminiImportTopTab>("single");
  const [singleSubTab, setSingleSubTab] = useState<"upload" | "paste">("upload");
  const [bulkSubMode, setBulkSubMode] = useState<GeminiBulkSubMode>("upload");

  // Single
  const [singleJson, setSingleJson] = useState<unknown>(null);
  const [singlePasteText, setSinglePasteText] = useState("");
  const [singleName, setSingleName] = useState("");
  const [singleEmail, setSingleEmail] = useState("");
  const [overwriteExisting, setOverwriteExisting] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  // Bulk
  const [bulkEntries, setBulkEntries] = useState<GeminiBulkEntry[]>([]);
  const [bulkPasteText, setBulkPasteText] = useState("");
  const [bulkSubmitting, setBulkSubmitting] = useState(false);
  const [bulkErrors, setBulkErrors] = useState<{ index: number; name: string; message: string }[]>(
    []
  );
  const [bulkResult, setBulkResult] = useState<{
    success: number;
    failed: number;
    total: number;
  } | null>(null);
  const [zipExtracting, setZipExtracting] = useState(false);

  const handleSingleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      try {
        const json = JSON.parse(ev.target?.result as string);
        setSingleJson(json);
      } catch {
        notify.error(
          typeof t.has === "function" && t.has("geminiImportInvalidJson")
            ? t("geminiImportInvalidJson")
            : "Could not parse the file as JSON"
        );
      }
    };
    reader.readAsText(file);
  };

  const handleSingleSubmit = async () => {
    if (submitting) return;
    setSubmitting(true);
    try {
      const body =
        singleSubTab === "paste"
          ? {
              source: { kind: "text", text: singlePasteText },
              name: singleName || undefined,
              email: singleEmail || undefined,
              overwriteExisting,
            }
          : {
              source: { kind: "json", json: singleJson },
              name: singleName || undefined,
              email: singleEmail || undefined,
              overwriteExisting,
            };

      const res = await fetch("/api/providers/gemini-cli-auth/import", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        if (data.code === "duplicate_account") {
          notify.error(
            typeof t.has === "function" && t.has("geminiImportDuplicate")
              ? t("geminiImportDuplicate")
              : 'Account already exists — enable "Replace existing" to overwrite'
          );
        } else if (data.code === "identity_unverified") {
          notify.error(
            typeof t.has === "function" && t.has("geminiImportIdentityUnverified")
              ? t("geminiImportIdentityUnverified")
              : 'Could not verify identity from id_token. Enable "Replace existing" or provide an email.'
          );
        } else {
          notify.error(
            data.error ||
              (typeof t.has === "function" && t.has("geminiImportFailed")
                ? t("geminiImportFailed")
                : "Failed to import Gemini auth")
          );
        }
        return;
      }

      const preview = previewGeminiJson(singleJson);
      notify.success(
        typeof t.has === "function" && t.has("geminiImportSuccess")
          ? t("geminiImportSuccess")
          : `Gemini connection imported successfully${preview.email ? ` (${preview.email})` : ""}`
      );
      onSuccess();
    } catch {
      notify.error(
        typeof t.has === "function" && t.has("geminiImportFailed")
          ? t("geminiImportFailed")
          : "Failed to import Gemini auth"
      );
    } finally {
      setSubmitting(false);
    }
  };

  const handleBulkFilesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const newEntries: GeminiBulkEntry[] = [];
    let pending = files.length;
    if (!pending) return;
    files.forEach((file) => {
      const reader = new FileReader();
      reader.onload = (ev) => {
        try {
          const json = JSON.parse(ev.target?.result as string);
          const { email } = previewGeminiJson(json);
          newEntries.push({
            name: file.name.replace(/\.json$/, ""),
            json,
            parseError: null,
            email,
          });
        } catch {
          newEntries.push({
            name: file.name,
            json: null,
            parseError: "Not valid JSON",
            email: null,
          });
        }
        pending--;
        if (pending === 0) setBulkEntries((prev) => [...prev, ...newEntries]);
      };
      reader.readAsText(file);
    });
  };

  const handleBulkPasteChange = (text: string) => {
    setBulkPasteText(text);
    const trimmed = text.trim();
    if (!trimmed) {
      setBulkEntries([]);
      return;
    }
    try {
      const arr = JSON.parse(trimmed);
      if (Array.isArray(arr)) {
        setBulkEntries(
          arr.map((item, i) => {
            const { email } = previewGeminiJson(item);
            return { name: email || `entry ${i + 1}`, json: item, parseError: null, email };
          })
        );
      } else {
        const { email } = previewGeminiJson(arr);
        setBulkEntries([{ name: email || "entry 1", json: arr, parseError: null, email }]);
      }
    } catch {
      setBulkEntries([
        { name: "parse error", json: null, parseError: "Invalid JSON", email: null },
      ]);
    }
  };

  const handleZipUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setZipExtracting(true);
    try {
      const res = await fetch("/api/providers/gemini-cli-auth/zip-extract", {
        method: "POST",
        headers: { "Content-Type": "application/zip" },
        body: file,
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        notify.error(
          data.error ||
            (typeof t.has === "function" && t.has("geminiImportBulkZipError")
              ? t("geminiImportBulkZipError")
              : "Failed to extract ZIP")
        );
        return;
      }
      const entries: GeminiBulkEntry[] = (data.entries || []).map(
        (e: { name: string; json: unknown; parseError: string | null }) => {
          const { email } = previewGeminiJson(e.json);
          return { name: e.name, json: e.json, parseError: e.parseError, email };
        }
      );
      setBulkEntries(entries);
    } catch {
      notify.error(
        typeof t.has === "function" && t.has("geminiImportBulkZipError")
          ? t("geminiImportBulkZipError")
          : "Failed to extract ZIP"
      );
    } finally {
      setZipExtracting(false);
    }
  };

  const handleBulkSubmit = async () => {
    if (bulkSubmitting) return;
    setBulkSubmitting(true);
    setBulkErrors([]);
    setBulkResult(null);
    try {
      const validEntries = bulkEntries.filter((e) => e.json !== null);
      if (validEntries.length === 0) {
        notify.error("No valid entries to import");
        return;
      }
      const res = await fetch("/api/providers/gemini-cli-auth/import-bulk", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          entries: validEntries.map((e) => ({
            json: e.json,
            name: e.name,
            email: e.email || undefined,
          })),
          overwriteExisting,
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        notify.error(
          data.error ||
            (typeof t.has === "function" && t.has("geminiImportBulkFailed")
              ? t("geminiImportBulkFailed")
              : "Some entries failed to import")
        );
        return;
      }
      setBulkResult({ success: data.success, failed: data.failed, total: data.total });
      if (data.errors?.length > 0) setBulkErrors(data.errors);
      if (data.success > 0) {
        notify.success(
          typeof t.has === "function" && t.has("geminiImportBulkSuccess")
            ? t("geminiImportBulkSuccess", { count: data.success })
            : `Imported ${data.success} Gemini connections`
        );
        if (data.failed === 0) onSuccess();
      }
    } catch {
      notify.error(
        typeof t.has === "function" && t.has("geminiImportBulkFailed")
          ? t("geminiImportBulkFailed")
          : "Some entries failed to import"
      );
    } finally {
      setBulkSubmitting(false);
    }
  };

  const tabLabels: Record<GeminiImportTopTab, string> = {
    single:
      typeof t.has === "function" && t.has("geminiImportTabSingle")
        ? t("geminiImportTabSingle")
        : "Single",
    bulk:
      typeof t.has === "function" && t.has("geminiImportTabBulk")
        ? t("geminiImportTabBulk")
        : "Bulk",
  };

  const modalTitle =
    typeof t.has === "function" && t.has("geminiImportModalTitle")
      ? t("geminiImportModalTitle")
      : "Import Gemini Auth";

  return (
    <Modal isOpen onClose={onClose} title={modalTitle}>
      <div className="flex flex-col gap-4">
        <div className="flex gap-1 border-b border-border pb-0">
          {(["single", "bulk"] as GeminiImportTopTab[]).map((tab) => (
            <button
              key={tab}
              onClick={() => setTopTab(tab)}
              className={`px-3 py-1.5 text-sm rounded-t-md transition-colors ${
                topTab === tab
                  ? "bg-primary/10 text-primary border-b-2 border-primary"
                  : "text-text-muted hover:text-text-primary"
              }`}
            >
              {tabLabels[tab]}
            </button>
          ))}
        </div>

        {topTab === "single" && (
          <div className="flex flex-col gap-3">
            <div className="flex gap-1">
              {(["upload", "paste"] as const).map((sub) => (
                <button
                  key={sub}
                  onClick={() => setSingleSubTab(sub)}
                  className={`px-2 py-1 text-xs rounded transition-colors ${
                    singleSubTab === sub
                      ? "bg-bg-subtle text-text-primary"
                      : "text-text-muted hover:text-text-primary"
                  }`}
                >
                  {sub === "upload"
                    ? typeof t.has === "function" && t.has("geminiImportTabUpload")
                      ? t("geminiImportTabUpload")
                      : "Upload file"
                    : typeof t.has === "function" && t.has("geminiImportTabPaste")
                      ? t("geminiImportTabPaste")
                      : "Paste JSON"}
                </button>
              ))}
            </div>
            {singleSubTab === "upload" ? (
              <div>
                <label className="block text-xs text-text-muted mb-1">
                  {typeof t.has === "function" && t.has("geminiImportFileLabel")
                    ? t("geminiImportFileLabel")
                    : "Choose oauth_creds.json"}
                </label>
                <input
                  type="file"
                  accept=".json"
                  onChange={handleSingleFileChange}
                  className="block w-full text-sm"
                />
                {singleJson && previewGeminiJson(singleJson).valid && (
                  <p className="mt-1 text-xs text-emerald-500">
                    Valid Gemini OAuth credentials
                    {previewGeminiJson(singleJson).email
                      ? ` (${previewGeminiJson(singleJson).email})`
                      : ""}
                  </p>
                )}
                {singleJson && !previewGeminiJson(singleJson).valid && (
                  <p className="mt-1 text-xs text-red-500">
                    {typeof t.has === "function" && t.has("geminiImportInvalidShape")
                      ? t("geminiImportInvalidShape")
                      : "The file is not a valid oauth_creds.json"}
                  </p>
                )}
              </div>
            ) : (
              <div>
                <label className="block text-xs text-text-muted mb-1">
                  {typeof t.has === "function" && t.has("geminiImportPasteLabel")
                    ? t("geminiImportPasteLabel")
                    : "Paste the JSON content"}
                </label>
                <textarea
                  value={singlePasteText}
                  onChange={(e) => setSinglePasteText(e.target.value)}
                  rows={6}
                  className="w-full rounded border border-border bg-bg-subtle px-2 py-1.5 text-xs font-mono text-text-main"
                  placeholder='{ "access_token": "...", "refresh_token": "...", "id_token": "..." }'
                />
              </div>
            )}
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-xs text-text-muted mb-1">
                  {typeof t.has === "function" && t.has("geminiImportEmailLabel")
                    ? t("geminiImportEmailLabel")
                    : "Account email"}
                </label>
                <input
                  type="email"
                  value={singleEmail}
                  onChange={(e) => setSingleEmail(e.target.value)}
                  placeholder="auto-detected from id_token"
                  className="w-full rounded border border-border bg-bg-subtle px-2 py-1.5 text-xs text-text-main"
                />
              </div>
              <div>
                <label className="block text-xs text-text-muted mb-1">
                  {typeof t.has === "function" && t.has("geminiImportNameLabel")
                    ? t("geminiImportNameLabel")
                    : "Connection name (optional)"}
                </label>
                <input
                  type="text"
                  value={singleName}
                  onChange={(e) => setSingleName(e.target.value)}
                  placeholder="My Gemini account"
                  className="w-full rounded border border-border bg-bg-subtle px-2 py-1.5 text-xs text-text-main"
                />
              </div>
            </div>
            <label className="flex items-center gap-2 text-xs text-text-muted">
              <input
                type="checkbox"
                checked={overwriteExisting}
                onChange={(e) => setOverwriteExisting(e.target.checked)}
              />
              {typeof t.has === "function" && t.has("geminiImportOverwriteLabel")
                ? t("geminiImportOverwriteLabel")
                : "Replace existing connection if account already exists"}
            </label>
            <Button
              loading={submitting}
              onClick={handleSingleSubmit}
              disabled={singleSubTab === "upload" ? !singleJson : !singlePasteText.trim()}
            >
              {typeof t.has === "function" && t.has("geminiImportSubmit")
                ? t("geminiImportSubmit")
                : "Import"}
            </Button>
          </div>
        )}

        {topTab === "bulk" && (
          <div className="flex flex-col gap-3">
            <div className="flex gap-1">
              {(["upload", "paste", "zip"] as GeminiBulkSubMode[]).map((mode) => (
                <button
                  key={mode}
                  onClick={() => {
                    setBulkSubMode(mode);
                    setBulkEntries([]);
                  }}
                  className={`px-2 py-1 text-xs rounded transition-colors ${
                    bulkSubMode === mode
                      ? "bg-bg-subtle text-text-primary"
                      : "text-text-muted hover:text-text-primary"
                  }`}
                >
                  {mode === "upload"
                    ? typeof t.has === "function" && t.has("geminiImportBulkModeUpload")
                      ? t("geminiImportBulkModeUpload")
                      : "Upload files"
                    : mode === "paste"
                      ? typeof t.has === "function" && t.has("geminiImportBulkModePaste")
                        ? t("geminiImportBulkModePaste")
                        : "Paste JSON array"
                      : typeof t.has === "function" && t.has("geminiImportBulkModeZip")
                        ? t("geminiImportBulkModeZip")
                        : "Upload ZIP"}
                </button>
              ))}
            </div>

            {bulkSubMode === "upload" && (
              <div>
                <p className="text-xs text-text-muted mb-1">
                  {typeof t.has === "function" && t.has("geminiImportBulkUploadHint")
                    ? t("geminiImportBulkUploadHint")
                    : "Drop or pick up to 50 oauth_creds.json files (256KB each, 10MB total)."}
                </p>
                <input
                  type="file"
                  accept=".json"
                  multiple
                  onChange={handleBulkFilesChange}
                  className="block w-full text-sm"
                />
              </div>
            )}
            {bulkSubMode === "paste" && (
              <div>
                <p className="text-xs text-text-muted mb-1">
                  {typeof t.has === "function" && t.has("geminiImportBulkPasteHint")
                    ? t("geminiImportBulkPasteHint")
                    : "Paste an array of objects: [{ json, name?, email? }, ...]"}
                </p>
                <textarea
                  value={bulkPasteText}
                  onChange={(e) => handleBulkPasteChange(e.target.value)}
                  rows={6}
                  className="w-full rounded border border-border bg-bg-subtle px-2 py-1.5 text-xs font-mono text-text-main"
                  placeholder="[{ ... }, { ... }]"
                />
              </div>
            )}
            {bulkSubMode === "zip" && (
              <div>
                <p className="text-xs text-text-muted mb-1">
                  {typeof t.has === "function" && t.has("geminiImportBulkZipHint")
                    ? t("geminiImportBulkZipHint")
                    : "ZIP containing oauth_creds.json entries. Max 50 entries, 10MB unpacked."}
                </p>
                {zipExtracting ? (
                  <p className="text-xs text-primary animate-pulse">
                    {typeof t.has === "function" && t.has("geminiImportBulkZipExtracting")
                      ? t("geminiImportBulkZipExtracting")
                      : "Extracting ZIP…"}
                  </p>
                ) : (
                  <input
                    type="file"
                    accept=".zip"
                    onChange={handleZipUpload}
                    className="block w-full text-sm"
                  />
                )}
              </div>
            )}

            {bulkEntries.length > 0 && (
              <div className="rounded border border-border bg-bg-subtle px-2 py-1.5 max-h-36 overflow-y-auto">
                {bulkEntries.map((e, i) => (
                  <div
                    key={i}
                    className={`text-xs py-0.5 flex items-center gap-1 ${e.parseError ? "text-red-500" : "text-text-main"}`}
                  >
                    <span className="material-symbols-outlined text-[12px]">
                      {e.parseError ? "error" : "check_circle"}
                    </span>
                    {e.name}
                    {e.email ? ` (${e.email})` : ""}
                    {e.parseError ? ` — ${e.parseError}` : ""}
                  </div>
                ))}
              </div>
            )}

            <label className="flex items-center gap-2 text-xs text-text-muted">
              <input
                type="checkbox"
                checked={overwriteExisting}
                onChange={(e) => setOverwriteExisting(e.target.checked)}
              />
              {typeof t.has === "function" && t.has("geminiImportOverwriteLabel")
                ? t("geminiImportOverwriteLabel")
                : "Replace existing connection if account already exists"}
            </label>

            {bulkResult && (
              <div className="rounded bg-bg-subtle px-2 py-1.5 text-xs">
                {bulkResult.success}/{bulkResult.total} imported
                {bulkResult.failed > 0 ? `, ${bulkResult.failed} failed` : ""}
              </div>
            )}
            {bulkErrors.length > 0 && (
              <div className="rounded border border-red-500/30 bg-red-500/5 px-2 py-1.5 max-h-28 overflow-y-auto">
                {bulkErrors.map((e) => (
                  <div key={e.index} className="text-xs text-red-500 py-0.5">
                    {e.name}: {e.message}
                  </div>
                ))}
              </div>
            )}

            <Button
              loading={bulkSubmitting}
              onClick={handleBulkSubmit}
              disabled={bulkEntries.filter((e) => e.json !== null).length === 0}
            >
              {typeof t.has === "function" && t.has("geminiImportBulkSubmit")
                ? t("geminiImportBulkSubmit")
                : "Import all"}
            </Button>
          </div>
        )}
      </div>
    </Modal>
  );
}

function ApplyGeminiAuthModal({
  connectionId,
  inProgress,
  onConfirm,
  onClose,
}: {
  connectionId: string | null;
  inProgress: boolean;
  onConfirm: (id: string) => Promise<void>;
  onClose: () => void;
}) {
  const t = useTranslations("providers");
  const [confirmed, setConfirmed] = useState(false);
  const isOpen = !!connectionId;

  if (!connectionId) return null;

  const title =
    typeof t.has === "function" && t.has("geminiApplyModalTitle")
      ? t("geminiApplyModalTitle")
      : "Apply to Local Gemini CLI";
  const targetLabel =
    typeof t.has === "function" && t.has("geminiApplyTargetLabel")
      ? t("geminiApplyTargetLabel")
      : "Target path";
  const backupLabel =
    typeof t.has === "function" && t.has("geminiApplyBackupLabel")
      ? t("geminiApplyBackupLabel")
      : "Backups";
  const warning =
    typeof t.has === "function" && t.has("geminiApplyWarning")
      ? t("geminiApplyWarning")
      : "This will replace the existing oauth_creds.json and update google_accounts.json. Continue?";
  const confirmText =
    typeof t.has === "function" && t.has("geminiApplyConfirmCheckbox")
      ? t("geminiApplyConfirmCheckbox")
      : "I confirm I want to replace the existing oauth_creds.json";
  const applyText =
    typeof t.has === "function" && t.has("geminiApply") ? t("geminiApply") : "Apply";
  const accountsHint =
    typeof t.has === "function" && t.has("geminiApplyAccountsHint")
      ? t("geminiApplyAccountsHint")
      : "The google_accounts.json active account will be updated to match this connection.";

  return (
    <Modal isOpen={isOpen} title={title} onClose={onClose}>
      <div className="flex flex-col gap-4">
        <div>
          <div className="text-xs uppercase text-text-muted mb-1">{targetLabel}</div>
          <code className="block rounded bg-sidebar px-2 py-1.5 text-xs font-mono text-text-main">
            ~/.gemini/oauth_creds.json
          </code>
          <p className="mt-1 text-xs text-text-muted">Path is auto-detected per OS (Linux/Mac).</p>
        </div>
        <div>
          <div className="text-xs uppercase text-text-muted mb-1">{backupLabel}</div>
          <code className="block rounded bg-sidebar px-2 py-1.5 text-xs font-mono text-text-main">
            ~/.gemini/oauth_creds-&#123;timestamp&#125;.bak
          </code>
        </div>
        <div className="rounded bg-amber-500/10 border border-amber-500/20 px-3 py-2 text-xs text-amber-400">
          {accountsHint}
        </div>
        <p className="text-sm text-text-muted">{warning}</p>
        <label className="flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            checked={confirmed}
            onChange={(e) => setConfirmed(e.target.checked)}
          />
          {confirmText}
        </label>
        <div className="flex justify-end gap-2">
          <Button variant="secondary" onClick={onClose} disabled={inProgress}>
            Cancel
          </Button>
          <Button
            loading={inProgress}
            disabled={!confirmed || inProgress}
            onClick={() => void onConfirm(connectionId)}
          >
            {applyText}
          </Button>
        </div>
      </div>
    </Modal>
  );
}
