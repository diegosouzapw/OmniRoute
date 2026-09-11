"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Button, Badge, Input, Modal, Toggle, Select } from "@/shared/components";
import { CHATGPT_WEB_CODEX_CONNECTOR_NAME } from "@/shared/constants/chatgptWebCodex";
import {
  isOpenAICompatibleProvider,
  isAnthropicCompatibleProvider,
  isClaudeCodeCompatibleProvider,
  providerAllowsOptionalApiKey,
} from "@/shared/constants/providers";
import {
  ANTIGRAVITY_CLIENT_PROFILE_OPTIONS,
  normalizeAntigravityClientProfileSetting,
} from "@/shared/constants/antigravityClientProfile";
import { parseExtraApiKeys } from "@/shared/utils/parseApiKeys";
import { providerHasFreeModels } from "@/shared/utils/freeModels";
import { maskEmail } from "@/shared/utils/maskEmail";
import useEmailPrivacyStore from "@/store/emailPrivacyStore";
import { useNotificationStore } from "@/store/notificationStore";
import { type CodexServiceTier } from "@/lib/providers/requestDefaults";
import { isClaudeExtraUsageBlockEnabled } from "@/lib/providers/claudeExtraUsage";
import { resolveDashboardProviderInfo } from "../../../providerPageUtils";
import {
  isBaseUrlConfigurableProvider,
  isBaseUrlOverrideEligibleProvider,
  getAlternateFormats,
  getProviderBaseUrlDefault,
  getProviderBaseUrlHint,
  getProviderBaseUrlPlaceholder,
  isGlmProvider,
  parseRoutingTagsInput,
  parseExcludedModelsInput,
  formatRoutingTagsInput,
  formatExcludedModelsInput,
  getWebSessionCredentialLabel,
  getWebSessionCredentialHint,
  getWebSessionCredentialCheckLabel,
  getLocalProviderMetadata,
  normalizeAndValidateHttpBaseUrl,
  getCodexFingerprintMode,
  getCodexRequestDefaults,
  type CodexFingerprintModeValue,
  getClaudeCodeCompatibleRequestDefaults,
  providerText,
  ERROR_TYPE_LABELS,
  formatTimeAgo,
} from "../../providerPageHelpers";
import { getWebSessionCredentialRequirement } from "../../webSessionCredentials";
import { useOpenRouterPresetControl } from "../OpenRouterPresetInput";
import WebSessionCredentialGuide from "../WebSessionCredentialGuide";
import HarImportButton from "../HarImportButton";
import CcCompatibleRequestDefaultsFields from "./CcCompatibleRequestDefaultsFields";
import { CodexConnectionFields } from "./CodexFingerprintFields";
import { assignEditApiKeyProviderSpecificData } from "./connectionProviderSpecificData";
import { isM365TierCapableProvider, normalizeM365TierValue, type M365TierValue } from "./m365Tier";
import ProviderTierField from "./ProviderTierField";
import AgentrouterConsoleFields from "./AgentrouterConsoleFields";
import { getVertexCredentialCopy } from "./vertexCredentialCopy";
import QuotaScrapingFields, { EMPTY_QUOTA_SCRAPING_FIELDS } from "./QuotaScrapingFields";
import GlmTeamQuotaFields, { EMPTY_GLM_TEAM_QUOTA_FIELDS } from "./GlmTeamQuotaFields";
import ProviderRegionField, { getProviderRegionConfig } from "./AlibabaProviderRegionField";
import PeakHourProtectionEditor, {
  EMPTY_PEAK_HOUR_PROTECTION,
  formatPeakHourSummary,
  normalizePeakHourProtectionForSave,
} from "../PeakHourProtectionEditor";
import type { PeakHourProtectionConfig } from "@/lib/providers/peakHourProtection";
export interface EditConnectionModalConnection {
  id?: string;
  name?: string;
  email?: string;
  priority?: number;
  maxConcurrent?: number | null;
  rateLimitOverrides?: Record<string, number> | null;
  authType?: string;
  provider?: string;
  apiKey?: string;
  providerSpecificData?: Record<string, unknown>;
  defaultModel?: string | null;
  healthCheckInterval?: number;
  projectId?: string | null;
}
export interface EditConnectionModalProps {
  isOpen: boolean;
  connection: EditConnectionModalConnection | null;
  providerId: string;
  providerWebsite?: string;
  onSave: (data: unknown) => Promise<void | unknown>;
  /** Triggered after a successful save when the "import only free models" flag changed. */
  onResyncModels?: (connectionId: string) => void | Promise<void>;
  onClose: () => void;
}
const stringField = (value: unknown) => (typeof value === "string" ? value : "");
export default function EditConnectionModal({
  isOpen,
  connection,
  providerId,
  providerWebsite,
  onSave,
  onResyncModels,
  onClose,
}: EditConnectionModalProps) {
  const t = useTranslations("providers");
  const notify = useNotificationStore();
  const provider = connection?.provider || providerId;
  const connectionAuthType = connection?.authType;
  const connectionProviderSpecificData = connection?.providerSpecificData;
  const showFreeModelsToggle = providerHasFreeModels(provider);
  const [formData, setFormData] = useState({
    name: "",
    priority: 1,
    maxConcurrent: "",
    rpm: "",
    rpd: "",
    tpm: "",
    tpd: "",
    minTime: "",
    maxWaitMs: "",
    rateLimitMaxConcurrent: "",
    apiKey: "",
    healthCheckInterval: "" as number | "",
    baseUrl: "",
    targetFormat: "",
    cx: "",
    region: "",
    awsAccessKeyId: "",
    awsSessionToken: "",
    apiRegion: "international",
    validationModelId: "",
    defaultModel: "",
    tag: "",
    routingTags: "",
    excludedModels: "",
    customUserAgent: "",
    accountId: "",
    codexReasoningEffort: "medium",
    codexServiceTier: "default" as CodexServiceTier,
    codexFingerprintMode: "session" as CodexFingerprintModeValue,
    codexOpenaiStoreEnabled: false,
    openaiResponsesStoreEnabled: false,
    preserveEncryptedReasoning: false,
    consoleApiKey: "",
    newApiUserId: "",
    newApiAggregatorBalance: false,
    quotaPerUnit: "",
    ...EMPTY_GLM_TEAM_QUOTA_FIELDS,
    ...EMPTY_QUOTA_SCRAPING_FIELDS,
    ccCompatibleContext1m: false,
    ccCompatibleRedactThinking: false,
    ccCompatibleSummarizeThinking: false,
    cloudCodeProjectId: "",
    antigravityClientProfile: "ide",
    blockExtraUsage:
      provider === "claude"
        ? isClaudeExtraUsageBlockEnabled(provider, connectionProviderSpecificData)
        : false,
    passthroughModels: connectionProviderSpecificData?.passthroughModels === true,
    disableCooling: connectionProviderSpecificData?.disableCooling === true,
    importFreeModelsOnly: connectionProviderSpecificData?.importFreeModelsOnly === true,
    tunnelId: stringField(connectionProviderSpecificData?.tunnelId),
    runtimeKey: "",
    connectorName:
      stringField(connectionProviderSpecificData?.connectorName) ||
      CHATGPT_WEB_CODEX_CONNECTOR_NAME,
    m365Tier: normalizeM365TierValue(connectionProviderSpecificData?.tier) as M365TierValue,
    peakHourProtection: { ...EMPTY_PEAK_HOUR_PROTECTION, windows: [] } as PeakHourProtectionConfig,
  });
  const [testing, setTesting] = useState(false);
  const [testResult, setTestResult] = useState(null);
  const [validating, setValidating] = useState(false);
  const [validationResult, setValidationResult] = useState(null);
  const [validatedProviderSpecificData, setValidatedProviderSpecificData] = useState<
    Record<string, unknown> | undefined
  >();
  const [doctorStatus, setDoctorStatus] = useState<Record<string, any> | null>(null);
  const [doctorLoading, setDoctorLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);
  const [extraApiKeys, setExtraApiKeys] = useState<string[]>([]);
  const [newExtraKey, setNewExtraKey] = useState("");
  const [apiKeyHealth, setApiKeyHealth] = useState<
    Record<
      string,
      {
        status: "active" | "warning" | "invalid";
        failures: number;
        lastFailure: string | null;
        totalRequests?: number;
        totalFailures?: number;
      }
    >
  >({});
  const [showAdvanced, setShowAdvanced] = useState(false);
  const showEmail = useEmailPrivacyStore((state) => state.emailsVisible);
  // #6147 — built-in providers can opt in to an advanced base-URL override.
  // OAuth connections are excluded: their save path does not persist
  // providerSpecificData.baseUrl.
  const isConfigurableBaseUrl = isBaseUrlConfigurableProvider(provider);
  const isBaseUrlOverrideEligible =
    !!connection && connectionAuthType !== "oauth" && isBaseUrlOverrideEligibleProvider(provider);
  const [showBaseUrlOverride, setShowBaseUrlOverride] = useState(
    () =>
      typeof connectionProviderSpecificData?.baseUrl === "string" &&
      connectionProviderSpecificData.baseUrl.trim().length > 0
  );
  const usesBaseUrl = isConfigurableBaseUrl || (isBaseUrlOverrideEligible && showBaseUrlOverride);
  // Protocol selector: only for providers that declare alternatives.
  const alternateFormats = getAlternateFormats(provider);
  const showProtocolSelector = alternateFormats.length > 0;
  const defaultBaseUrl = getProviderBaseUrlDefault(provider);
  const isVertex = provider === "vertex" || provider === "vertex-partner";
  const { defaultRegion, showsRegion } = getProviderRegionConfig(provider);
  const isGlm = isGlmProvider(provider);
  const isCloudflare = provider === "cloudflare-ai";
  const openRouterPreset = useOpenRouterPresetControl(provider, t);
  const setOpenRouterPreset = openRouterPreset.setValue;
  const isCodex = provider === "codex";
  const isResponsesConnection =
    isCodex ||
    provider === "openai" ||
    (isOpenAICompatibleProvider(provider) &&
      (provider.startsWith("openai-compatible-responses-") ||
        connectionProviderSpecificData?.apiType === "responses" ||
        formData.targetFormat === "openai-responses"));
  const isCustomResponsesConnection = isResponsesConnection && !isCodex && provider !== "openai";
  const isClaude = provider === "claude";
  const isAntigravityFamily = provider === "antigravity" || provider === "agy";
  const localProviderMetadata = getLocalProviderMetadata(provider);
  const isLocalSelfHostedProvider = !!localProviderMetadata;
  const isGooglePse = provider === "google-pse-search";
  const isChatGptWebCodex = provider === "chatgpt-web-codex";
  const isAwsPolly = provider === "aws-polly";
  const isM365TierCapable = isM365TierCapableProvider(provider);
  const webSessionCredential = getWebSessionCredentialRequirement(provider);
  const isNoAuthWebSessionCredential = webSessionCredential?.kind === "none";
  const isWebSessionCredential = !!webSessionCredential && webSessionCredential.kind !== "none";
  const providerDisplayName =
    (provider ? resolveDashboardProviderInfo(provider)?.name : null) ||
    localProviderMetadata?.name ||
    provider ||
    "";
  const apiKeyOptional =
    providerAllowsOptionalApiKey(provider) || Boolean(isNoAuthWebSessionCredential);
  const isCcCompatible = isClaudeCodeCompatibleProvider(provider);
  const isCompatible =
    isOpenAICompatibleProvider(provider) || isAnthropicCompatibleProvider(provider);
  const vertexCopy = isVertex ? getVertexCredentialCopy(t) : null;
  const apiCredentialLabel = webSessionCredential
    ? getWebSessionCredentialLabel(t, webSessionCredential, apiKeyOptional)
    : isAwsPolly
      ? providerText(t, "awsPollySecretAccessKeyLabel", "AWS Secret Access Key")
      : (vertexCopy?.label ?? (apiKeyOptional ? t("apiKeyOptionalLabel") : t("apiKeyLabel")));
  const apiCredentialPlaceholder = isWebSessionCredential
    ? webSessionCredential.placeholder
    : (vertexCopy?.placeholder ?? t("enterNewApiKey"));
  const apiCredentialHint = isWebSessionCredential
    ? getWebSessionCredentialHint(t, webSessionCredential, providerDisplayName, true)
    : (vertexCopy?.hint ??
      (isLocalSelfHostedProvider
        ? t("localProviderApiKeyOptionalHint", {
            provider: localProviderMetadata?.name || provider || "",
          })
        : apiKeyOptional
          ? t("apiKeyOptionalHint")
          : t("leaveBlankKeepCurrentApiKey")));
  // Modal-open form initialization from the loaded connection — applied as a
  // render-phase adjustment guarded by the previously initialized connection
  // (react.dev "adjusting state when a prop changes") instead of the former
  // synchronous-setState effect. Remounting the 30+ field form per connection
  // id stays out of scope (#11251 follow-up, #9985); closing clears the marker
  // so the next open re-initializes again.
  const [initializedFor, setInitializedFor] = useState<{
    connection: EditConnectionModalConnection;
    providerId: string;
  } | null>(null);
  if (isOpen && connection) {
    if (initializedFor?.connection !== connection || initializedFor.providerId !== providerId) {
      setInitializedFor({ connection, providerId });
      const effectiveProvider = connection.provider || providerId;
      const existingBaseUrl = stringField(connection.providerSpecificData?.baseUrl);
      const existingTargetFormat = stringField(connection.providerSpecificData?.targetFormat);
      const existingRegion = stringField(connection.providerSpecificData?.region);
      const existingAwsAccessKeyId =
        stringField(connection.providerSpecificData?.accessKeyId) ||
        stringField(connection.providerSpecificData?.awsAccessKeyId);
      const existingCustomUserAgent = stringField(connection.providerSpecificData?.customUserAgent);
      const existingOpenRouterPreset = stringField(connection.providerSpecificData?.preset);
      const existingCx = stringField(connection.providerSpecificData?.cx);
      const existingAccountId = stringField(connection.providerSpecificData?.accountId);
      const existingGlmOrganizationId =
        stringField(connection.providerSpecificData?.glmOrganizationId) ||
        stringField(connection.providerSpecificData?.bigmodelOrganization) ||
        stringField(connection.providerSpecificData?.glmOrganization);
      const existingGlmProjectId =
        stringField(connection.providerSpecificData?.glmProjectId) ||
        stringField(connection.providerSpecificData?.bigmodelProject) ||
        stringField(connection.providerSpecificData?.glmProject);
      const codexRequestDefaults = getCodexRequestDefaults(connection.providerSpecificData);
      const ccRequestDefaults = getClaudeCodeCompatibleRequestDefaults(
        connection.providerSpecificData
      );
      const existingConsoleApiKey = stringField(connection.providerSpecificData?.consoleApiKey);
      const existingNewApiUserId = stringField(connection.providerSpecificData?.newApiUserId);
      const existingQuotaPerUnit =
        connection.providerSpecificData?.quotaPerUnit != null
          ? String(connection.providerSpecificData.quotaPerUnit)
          : "";
      setFormData({
        name: connection.name || "",
        priority: connection.priority || 1,
        maxConcurrent:
          connection.maxConcurrent !== null && connection.maxConcurrent !== undefined
            ? String(connection.maxConcurrent)
            : "",
        rpm:
          connection.rateLimitOverrides?.rpm != null
            ? String(connection.rateLimitOverrides.rpm)
            : "",
        rpd:
          connection.rateLimitOverrides?.rpd != null
            ? String(connection.rateLimitOverrides.rpd)
            : "",
        tpm:
          connection.rateLimitOverrides?.tpm != null
            ? String(connection.rateLimitOverrides.tpm)
            : "",
        tpd:
          connection.rateLimitOverrides?.tpd != null
            ? String(connection.rateLimitOverrides.tpd)
            : "",
        minTime:
          connection.rateLimitOverrides?.minTime != null
            ? String(connection.rateLimitOverrides.minTime)
            : "",
        maxWaitMs:
          connection.rateLimitOverrides?.maxWaitMs != null
            ? String(connection.rateLimitOverrides.maxWaitMs)
            : "",
        rateLimitMaxConcurrent:
          connection.rateLimitOverrides?.maxConcurrent != null
            ? String(connection.rateLimitOverrides.maxConcurrent)
            : "",
        apiKey: "",
        // Unset per-connection override means "follow the global default" —
        // surface that as an empty field (0 renders as an explicit opt-out).
        healthCheckInterval: connection.healthCheckInterval ?? "",
        baseUrl: existingBaseUrl || defaultBaseUrl,
        targetFormat: existingTargetFormat || "",
        cx: existingCx,
        region:
          existingRegion ||
          (effectiveProvider === "aws-polly" ? "us-east-1" : showsRegion ? defaultRegion : ""),
        awsAccessKeyId: existingAwsAccessKeyId,
        awsSessionToken: "",
        apiRegion: (connection.providerSpecificData?.apiRegion as string) || "international",
        validationModelId: (connection.providerSpecificData?.validationModelId as string) || "",
        defaultModel: (connection.defaultModel as string) || "",
        tag: (connection.providerSpecificData?.tag as string) || "",
        routingTags: formatRoutingTagsInput(connection.providerSpecificData?.tags),
        excludedModels: formatExcludedModelsInput(
          connection.providerSpecificData?.excludedModels ??
            connection.providerSpecificData?.excluded_models
        ),
        customUserAgent: existingCustomUserAgent,
        accountId: existingAccountId,
        codexReasoningEffort: codexRequestDefaults.reasoningEffort,
        codexServiceTier: codexRequestDefaults.serviceTier ?? "default",
        codexFingerprintMode: getCodexFingerprintMode(connection.providerSpecificData),
        codexOpenaiStoreEnabled: connection.providerSpecificData?.openaiStoreEnabled === true,
        openaiResponsesStoreEnabled: connection.providerSpecificData?.openaiStoreEnabled === true,
        preserveEncryptedReasoning:
          connection.providerSpecificData?.preserveEncryptedReasoning === true,
        consoleApiKey: existingConsoleApiKey,
        newApiUserId: existingNewApiUserId,
        newApiAggregatorBalance: connection.providerSpecificData?.newApiAggregatorBalance === true,
        quotaPerUnit: existingQuotaPerUnit,
        glmOrganizationId: existingGlmOrganizationId,
        glmProjectId: existingGlmProjectId,
        // Console-session credentials are stripped from API responses
        // (sanitizeProviderSpecificDataForResponse), so there is nothing to
        // round-trip: start empty and let "blank keeps the stored value" hold —
        // the quota-scraping assign skips empty fields and the PUT merge
        // preserves keys the payload does not carry.
        ollamaCloudUsageCookie: "",
        alibabaConsoleCookie: "",
        qwenCloudCookie: "",
        qwenCloudSecToken: "",
        alibabaConsoleSecToken: "",
        ccCompatibleContext1m: ccRequestDefaults.context1m,
        ccCompatibleRedactThinking: ccRequestDefaults.redactThinking,
        ccCompatibleSummarizeThinking: ccRequestDefaults.summarizeThinking,
        cloudCodeProjectId:
          (connection.providerSpecificData?.projectId as string) || connection.projectId || "",
        antigravityClientProfile: normalizeAntigravityClientProfileSetting(
          connection.providerSpecificData?.clientProfile
        ),
        blockExtraUsage: isClaudeExtraUsageBlockEnabled(
          effectiveProvider,
          connection.providerSpecificData
        ),
        passthroughModels: connection?.providerSpecificData?.passthroughModels === true,
        disableCooling: connection?.providerSpecificData?.disableCooling === true,
        importFreeModelsOnly: connection?.providerSpecificData?.importFreeModelsOnly === true,
        tunnelId: stringField(connection.providerSpecificData?.tunnelId),
        runtimeKey: "",
        connectorName:
          stringField(connection.providerSpecificData?.connectorName) ||
          CHATGPT_WEB_CODEX_CONNECTOR_NAME,
        m365Tier: normalizeM365TierValue(connection.providerSpecificData?.tier) as M365TierValue,
        peakHourProtection: {
          ...EMPTY_PEAK_HOUR_PROTECTION,
          ...((connection.providerSpecificData?.peakHourProtection as PeakHourProtectionConfig) ||
            {}),
          windows: Array.isArray(
            (
              connection.providerSpecificData?.peakHourProtection as
                PeakHourProtectionConfig | undefined
            )?.windows
          )
            ? [
                ...(connection.providerSpecificData?.peakHourProtection as PeakHourProtectionConfig)
                  .windows,
              ]
            : [],
        },
      });
      const existing = connection.providerSpecificData?.extraApiKeys;
      setExtraApiKeys(Array.isArray(existing) ? existing : []);
      const health = connection.providerSpecificData?.apiKeyHealth as
        | Record<
            string,
            {
              status: "active" | "warning" | "invalid";
              failures: number;
              lastFailure: string | null;
              totalRequests?: number;
              totalFailures?: number;
            }
          >
        | undefined;
      setApiKeyHealth(health || {});
      setNewExtraKey("");
      setOpenRouterPreset(existingOpenRouterPreset);
      setShowAdvanced(
        !!existingCustomUserAgent ||
          normalizeM365TierValue(connection.providerSpecificData?.tier) !== ""
      );
      setTestResult(null);
      setValidationResult(null);
      setValidatedProviderSpecificData(undefined);
      setSaveError(null);
    }
  } else if (initializedFor !== null) {
    setInitializedFor(null);
  }
  const handleTest = async () => {
    if (!provider) return;
    setTesting(true);
    setTestResult(null);
    try {
      const res = await fetch(`/api/providers/${connection.id}/test`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          validationModelId: formData.validationModelId || undefined,
        }),
      });
      const data = await res.json();
      setTestResult({
        valid: !!data.valid,
        diagnosis: data.diagnosis || null,
        message: data.error || null,
      });
    } catch {
      setTestResult({
        valid: false,
        diagnosis: { type: "network_error" },
        message: t("failedTestConnection"),
      });
    } finally {
      setTesting(false);
    }
  };
  const handleValidate = async () => {
    if (
      !provider ||
      isNoAuthWebSessionCredential ||
      (!isCompatible && !apiKeyOptional && !formData.apiKey) ||
      (isAwsPolly && !formData.awsAccessKeyId.trim())
    ) {
      return;
    }
    setValidating(true);
    setValidationResult(null);
    try {
      const res = await fetch("/api/providers/validate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          provider,
          apiKey: formData.apiKey,
          validationModelId: formData.validationModelId || undefined,
          customUserAgent: formData.customUserAgent.trim() || undefined,
          baseUrl: formData.baseUrl.trim() || undefined,
          region: isAwsPolly
            ? formData.region.trim() || "us-east-1"
            : showsRegion
              ? formData.region.trim() || defaultRegion
              : undefined,
          accessKeyId: isAwsPolly ? formData.awsAccessKeyId.trim() || undefined : undefined,
          sessionToken: isAwsPolly ? formData.awsSessionToken.trim() || undefined : undefined,
          cx: formData.cx.trim() || undefined,
          runtimeKey: isChatGptWebCodex ? formData.runtimeKey.trim() || undefined : undefined,
          tunnelId: isChatGptWebCodex ? formData.tunnelId.trim() || undefined : undefined,
          connectorName: isChatGptWebCodex ? formData.connectorName.trim() || undefined : undefined,
        }),
      });
      const data = await res.json();
      setValidationResult(data.valid ? "success" : "failed");
      if (
        data.valid &&
        data.providerSpecificData &&
        typeof data.providerSpecificData === "object"
      ) {
        setValidatedProviderSpecificData(data.providerSpecificData);
      }
    } catch {
      setValidationResult("failed");
    } finally {
      setValidating(false);
    }
  };
  const handleAddParsedExtraKeys = (raw: string) => {
    const { added, duplicates } = parseExtraApiKeys(raw, extraApiKeys);
    if (added.length > 0) {
      setExtraApiKeys((prev) => [...prev, ...added]);
      notify.success(t("bulkPasteAdded", { count: added.length }));
    }
    if (duplicates > 0) {
      notify.warning(t("bulkPasteDuplicatesIgnored", { count: duplicates }));
    }
  };
  const handleSubmit = async () => {
    setSaving(true);
    setSaveError(null);
    try {
      const trimmedMaxConcurrent = formData.maxConcurrent.trim();
      const trimmedCloudCodeProjectId = formData.cloudCodeProjectId.trim();
      let parsedMaxConcurrent: number | null = null;
      if (trimmedMaxConcurrent) {
        const numericMaxConcurrent = Number(trimmedMaxConcurrent);
        if (!Number.isInteger(numericMaxConcurrent) || numericMaxConcurrent < 0) {
          setSaveError(t("maxConcurrentWholeNumberError"));
          return;
        }
        parsedMaxConcurrent = numericMaxConcurrent;
      }
      const updates: any = {
        name: formData.name,
        priority: formData.priority,
        maxConcurrent: parsedMaxConcurrent,
        // Empty field = "follow the global default" → send undefined so the
        // stored per-connection override is cleared; 0 = explicit opt-out.
        healthCheckInterval:
          formData.healthCheckInterval === "" ? undefined : formData.healthCheckInterval,
      };
      const overrides: Record<string, number> = {};
      if (formData.rpm.trim()) overrides.rpm = Number(formData.rpm);
      if (formData.rpd.trim()) overrides.rpd = Number(formData.rpd);
      if (formData.tpm.trim()) overrides.tpm = Number(formData.tpm);
      if (formData.tpd.trim()) overrides.tpd = Number(formData.tpd);
      if (formData.minTime.trim()) overrides.minTime = Number(formData.minTime);
      if (formData.maxWaitMs.trim()) overrides.maxWaitMs = Number(formData.maxWaitMs);
      if (formData.rateLimitMaxConcurrent.trim())
        overrides.maxConcurrent = Number(formData.rateLimitMaxConcurrent);
      updates.rateLimitOverrides = Object.keys(overrides).length > 0 ? overrides : null;
      if (isAntigravityFamily) {
        updates.projectId = trimmedCloudCodeProjectId || null;
      }
      if (isGooglePse && !formData.cx.trim()) {
        setSaveError(t("searchEngineIdRequired"));
        return;
      }
      let validatedBaseUrl = null;
      let validationPsd = validatedProviderSpecificData;
      if (usesBaseUrl) {
        // #6147 — an opt-in override left blank clears it (no default to fall
        // back to). Configurable providers keep their existing default-fallback.
        if (!isConfigurableBaseUrl && !formData.baseUrl.trim()) {
          validatedBaseUrl = null;
        } else {
          const checked = normalizeAndValidateHttpBaseUrl(formData.baseUrl, defaultBaseUrl);
          if (checked.error) {
            setSaveError(checked.error);
            return;
          }
          validatedBaseUrl = checked.value;
        }
      }
      if (!isOAuth && formData.apiKey) {
        let isValid = validationResult === "success";
        if (!isValid) {
          try {
            setValidating(true);
            setValidationResult(null);
            const res = await fetch("/api/providers/validate", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                provider,
                apiKey: formData.apiKey,
                validationModelId: formData.validationModelId || undefined,
                customUserAgent: formData.customUserAgent.trim() || undefined,
                baseUrl: formData.baseUrl.trim() || undefined,
                region: isAwsPolly
                  ? formData.region.trim() || "us-east-1"
                  : showsRegion
                    ? formData.region.trim() || defaultRegion
                    : undefined,
                accessKeyId: isAwsPolly ? formData.awsAccessKeyId.trim() || undefined : undefined,
                sessionToken: isAwsPolly ? formData.awsSessionToken.trim() || undefined : undefined,
                cx: formData.cx.trim() || undefined,
                runtimeKey: isChatGptWebCodex ? formData.runtimeKey.trim() || undefined : undefined,
                tunnelId: isChatGptWebCodex ? formData.tunnelId.trim() || undefined : undefined,
                connectorName: isChatGptWebCodex
                  ? formData.connectorName.trim() || undefined
                  : undefined,
              }),
            });
            const data = await res.json();
            isValid = !!data.valid;
            setValidationResult(isValid ? "success" : "failed");
            if (
              isValid &&
              data.providerSpecificData &&
              typeof data.providerSpecificData === "object"
            ) {
              setValidatedProviderSpecificData(data.providerSpecificData);
              validationPsd = data.providerSpecificData;
            }
          } catch {
            setValidationResult("failed");
          } finally {
            setValidating(false);
          }
        }
        if (isValid) {
          updates.apiKey = isChatGptWebCodex
            ? JSON.stringify({
                version: 1,
                cookie: formData.apiKey.trim().replace(/^cookie\s*:\s*/i, ""),
                ...(formData.runtimeKey.trim() ? { runtimeKey: formData.runtimeKey.trim() } : {}),
              })
            : formData.apiKey;
          updates.testStatus = "active";
          updates.lastError = null;
          updates.lastErrorAt = null;
          updates.lastErrorType = null;
          updates.lastErrorSource = null;
          updates.errorCode = null;
          updates.rateLimitedUntil = null;
        }
      }
      if (!isOAuth) {
        if (isCompatible) {
          updates.defaultModel = formData.defaultModel.trim() || null;
        }
        updates.providerSpecificData = {
          ...(connection.providerSpecificData || {}),
          ...(validationPsd || {}),
          ...(isCodex ? { codexFingerprintMode: null, codex_fingerprint_mode: null } : {}),
        };
        assignEditApiKeyProviderSpecificData({
          provider,
          formData,
          target: updates.providerSpecificData,
          extraApiKeys,
          openRouterPreset,
          usesBaseUrl,
          validatedBaseUrl,
          showsRegion,
          defaultRegion,
          isGlm,
          isCloudflare,
          isAntigravityFamily,
          trimmedCloudCodeProjectId,
          isGooglePse,
          isCcCompatible,
        });
      } else {
        updates.providerSpecificData = {
          ...(connection.providerSpecificData || {}),
          tag: formData.tag.trim() || undefined,
          tags: parseRoutingTagsInput(formData.routingTags),
          excludedModels: parseExcludedModelsInput(formData.excludedModels),
        };
        if (isClaude) {
          updates.providerSpecificData.blockExtraUsage = formData.blockExtraUsage;
        }
        if (isCodex) {
          updates.providerSpecificData.requestDefaults = {
            reasoningEffort: formData.codexReasoningEffort,
            ...(formData.codexServiceTier !== "default"
              ? { serviceTier: formData.codexServiceTier }
              : {}),
          };
          updates.providerSpecificData.openaiStoreEnabled =
            formData.codexOpenaiStoreEnabled === true;
          updates.providerSpecificData.codexFingerprintMode = formData.codexFingerprintMode;
        }
        if (isAntigravityFamily) {
          updates.providerSpecificData.projectId = trimmedCloudCodeProjectId || null;
        }
      }
      if (isAntigravityFamily) {
        updates.providerSpecificData = {
          ...(connection.providerSpecificData || {}),
          ...(updates.providerSpecificData || {}),
          clientProfile: normalizeAntigravityClientProfileSetting(
            formData.antigravityClientProfile
          ),
          // A manually-entered project id must not be overwritten by
          // auto-discovery (loadCodeAssist) on later token refreshes. This
          // merge is the single surviving write of providerSpecificData for
          // antigravity (both OAuth and API-key branches rebuild the object
          // above), so the flag has to land here to actually persist.
          isProjectIdManual: !!trimmedCloudCodeProjectId,
        };
      }
      if (updates.providerSpecificData) {
        updates.providerSpecificData.disableCooling = formData.disableCooling ? true : undefined;
        updates.providerSpecificData.peakHourProtection = normalizePeakHourProtectionForSave(
          formData.peakHourProtection
        );
        // Explicit `null`, not `undefined`: the PUT route merges
        // { ...existing, ...incoming }, so omitting the key would keep the previous
        // choice and switching back to the default would never take effect.
        if (showProtocolSelector) {
          updates.providerSpecificData.targetFormat = formData.targetFormat || null;
        }
      }
      if (isResponsesConnection && updates.providerSpecificData) {
        if (isCustomResponsesConnection) {
          updates.providerSpecificData.preserveEncryptedReasoning =
            formData.preserveEncryptedReasoning === true;
        } else {
          delete updates.providerSpecificData.preserveEncryptedReasoning;
        }
        updates.providerSpecificData.openaiStoreEnabled =
          formData.openaiResponsesStoreEnabled === true;
      }
      const freeOnlyChanged =
        showFreeModelsToggle &&
        formData.importFreeModelsOnly !==
          (connection.providerSpecificData?.importFreeModelsOnly === true);
      if (showFreeModelsToggle && updates.providerSpecificData) {
        // Store an explicit boolean (not undefined): the PUT route merges
        // { ...existing, ...incoming }, so an undefined/omitted key would keep the
        // previously-saved `true` and unchecking would never take effect.
        updates.providerSpecificData.importFreeModelsOnly = formData.importFreeModelsOnly === true;
      }
      const error = (await onSave(updates)) as void | unknown;
      if (error) {
        setSaveError(typeof error === "string" ? error : t("failedSaveConnection"));
        return;
      }
      // Re-sync so the available model list reflects the new free-only choice.
      if (freeOnlyChanged && onResyncModels && connection.id) {
        await onResyncModels(connection.id);
      }
    } finally {
      setSaving(false);
    }
  };
  if (!connection) return null;
  const isOAuth = connection.authType === "oauth";
  const testErrorMeta =
    !testResult?.valid && testResult?.diagnosis?.type
      ? ERROR_TYPE_LABELS[testResult.diagnosis.type] || null
      : null;
  const preserveEncryptedReasoningToggle = isCustomResponsesConnection ? (
    <Toggle
      checked={formData.preserveEncryptedReasoning}
      onChange={(checked) => setFormData({ ...formData, preserveEncryptedReasoning: checked })}
      label={providerText(t, "preserveEncryptedReasoningLabel", "Preserve encrypted reasoning")}
      description={providerText(
        t,
        "preserveEncryptedReasoningDescription",
        "Forward encrypted Responses reasoning items supplied by the client."
      )}
    />
  ) : null;
  const openaiResponsesStoreToggle = isResponsesConnection ? (
    <Toggle
      checked={formData.openaiResponsesStoreEnabled}
      onChange={(checked) => setFormData({ ...formData, openaiResponsesStoreEnabled: checked })}
      label={t("openaiResponsesStoreLabel")}
      description={t("openaiResponsesStoreDescription")}
    />
  ) : null;
  return (
    <Modal isOpen={isOpen} title={t("editConnection")} onClose={onClose}>
      <div className="flex flex-col gap-4">
        <Input
          label={t("nameLabel")}
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          placeholder={isOAuth ? t("accountName") : t("productionKey")}
        />
        <Input
          label={t("tagGroupLabel")}
          value={formData.tag}
          onChange={(e) => setFormData({ ...formData, tag: e.target.value })}
          placeholder={t("tagGroupPlaceholder")}
          hint={t("tagGroupHint")}
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
        {isCodex && (
          <CodexConnectionFields
            t={t}
            reasoningEffort={formData.codexReasoningEffort}
            serviceTier={formData.codexServiceTier}
            fingerprintMode={formData.codexFingerprintMode}
            openaiStoreEnabled={formData.codexOpenaiStoreEnabled}
            showFingerprintMode={isOAuth}
            onChange={(patch) => setFormData({ ...formData, ...patch })}
          />
        )}
        {isClaude && (
          <div className="flex flex-col gap-4 rounded-lg border border-border/50 bg-surface/20 p-4">
            <Toggle
              checked={formData.blockExtraUsage}
              onChange={(checked) => setFormData({ ...formData, blockExtraUsage: checked })}
              label={t("blockClaudeExtraUsageLabel")}
              description={t("blockClaudeExtraUsageDescription")}
            />
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
        <div className="flex flex-col gap-4 rounded-lg border border-border/50 bg-surface/20 p-4">
          {showFreeModelsToggle && (
            <Toggle
              checked={formData.importFreeModelsOnly}
              onChange={(checked) => setFormData({ ...formData, importFreeModelsOnly: checked })}
              label={t("importFreeModelsOnlyLabel")}
              description={t("importFreeModelsOnlyHint")}
            />
          )}
          {preserveEncryptedReasoningToggle}
          {openaiResponsesStoreToggle}
          <Toggle
            checked={formData.disableCooling}
            onChange={(checked) => setFormData({ ...formData, disableCooling: checked })}
            label={t("disableCoolingLabel")}
            description={t("disableCoolingDescription")}
          />
          <PeakHourProtectionEditor
            value={formData.peakHourProtection}
            onChange={(peakHourProtection) => setFormData({ ...formData, peakHourProtection })}
            t={t}
          />
          {formatPeakHourSummary(formData.peakHourProtection) && (
            <p className="text-xs text-text-muted">
              {formatPeakHourSummary(formData.peakHourProtection)}
            </p>
          )}
        </div>
        <QuotaScrapingFields
          provider={provider}
          values={formData}
          onChange={(patch) => setFormData({ ...formData, ...patch })}
          t={t}
          editMode
        />
        {isAntigravityFamily && (
          <div className="flex flex-col gap-4 rounded-lg border border-border/50 bg-surface/20 p-4">
            <Select
              label={t("antigravityClientProfileLabel")}
              value={formData.antigravityClientProfile}
              options={ANTIGRAVITY_CLIENT_PROFILE_OPTIONS.map((option) => ({
                value: option.value,
                label: t(option.labelKey),
              }))}
              onChange={(e) =>
                setFormData({ ...formData, antigravityClientProfile: e.target.value })
              }
              hint={t("antigravityClientProfileHint")}
            />
            <Input
              label={t("antigravityProjectIdLabel")}
              value={formData.cloudCodeProjectId}
              onChange={(e) => setFormData({ ...formData, cloudCodeProjectId: e.target.value })}
              placeholder={t("antigravityProjectIdPlaceholder")}
              hint={t("antigravityProjectIdHint")}
              className="font-mono text-xs"
            />
          </div>
        )}
        {isOAuth && connection.email && (
          <div className="bg-sidebar/50 p-3 rounded-lg">
            <p className="text-sm text-text-muted mb-1">{t("email")}</p>
            <p className="font-medium" title={showEmail ? connection.email : undefined}>
              {showEmail ? connection.email : maskEmail(connection.email)}
            </p>
          </div>
        )}
        <Input
          label={t("healthCheckMinutes")}
          type="number"
          min={0}
          max={1440}
          value={formData.healthCheckInterval}
          onChange={(e) => {
            const parsed = Number.parseInt(e.target.value, 10);
            const next = Number.isNaN(parsed) ? 0 : Math.min(1440, Math.max(0, parsed));
            setFormData({ ...formData, healthCheckInterval: next });
          }}
          hint={t("healthCheckHint")}
        />
        <Input
          label={t("priorityLabel")}
          type="number"
          value={formData.priority}
          onChange={(e) =>
            setFormData({ ...formData, priority: Number.parseInt(e.target.value) || 1 })
          }
        />
        <div className="flex flex-col gap-2 rounded-lg border border-primary/30 bg-primary/5 p-4">
          <div className="flex items-center gap-1.5 text-sm font-semibold text-primary">
            <span className="material-symbols-outlined text-[18px]" aria-hidden="true">
              dynamic_feed
            </span>
            {t("accountConcurrencyCapLabel")}
          </div>
          <Input
            type="number"
            min={0}
            step={1}
            aria-label={t("accountConcurrencyCapLabel")}
            value={formData.maxConcurrent}
            onChange={(e) => {
              const nextValue = e.target.value;
              setFormData({ ...formData, maxConcurrent: nextValue });
              if (saveError && nextValue.trim()) {
                const numericValue = Number(nextValue);
                if (Number.isInteger(numericValue) && numericValue >= 0) {
                  setSaveError(null);
                }
              }
            }}
            placeholder="0"
            hint={t("accountConcurrencyCapHint")}
          />
        </div>
        {saveError && (
          <div className="text-sm text-red-500 bg-red-500/10 border border-red-500/20 rounded-lg px-3 py-2">
            {saveError}
          </div>
        )}
        {!isOAuth && (
          <>
            {webSessionCredential && (
              <WebSessionCredentialGuide
                requirement={webSessionCredential}
                providerName={providerDisplayName}
                providerWebsite={providerWebsite}
                t={t}
              />
            )}
            {provider && (
              <HarImportButton
                provider={provider}
                onImport={(apiKey) => setFormData({ ...formData, apiKey })}
              />
            )}
            {!isNoAuthWebSessionCredential && (
              <div className="flex gap-2">
                <Input
                  label={apiCredentialLabel}
                  type="password"
                  value={formData.apiKey}
                  onChange={(e) => setFormData({ ...formData, apiKey: e.target.value })}
                  placeholder={apiCredentialPlaceholder}
                  hint={apiCredentialHint}
                  className="flex-1"
                  autoComplete="off"
                  spellCheck={false}
                  autoCapitalize="off"
                />
                <div className="pt-6">
                  <Button
                    onClick={handleValidate}
                    disabled={
                      (!isCompatible && !apiKeyOptional && !formData.apiKey) ||
                      (isAwsPolly && !formData.awsAccessKeyId.trim()) ||
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
            {isChatGptWebCodex && (
              <div className="space-y-3 rounded-lg border border-border bg-surface/40 p-3">
                <p className="text-sm font-medium text-text-main">Codex-Toolverbindung</p>
                <Input
                  label="Tunnel-ID"
                  value={formData.tunnelId}
                  onChange={(event) => setFormData({ ...formData, tunnelId: event.target.value })}
                  placeholder="tunnel_0123456789abcdef0123456789abcdef"
                />
                <Input
                  label="Neuer Tunnel Runtime-Key"
                  type="password"
                  value={formData.runtimeKey}
                  onChange={(event) => setFormData({ ...formData, runtimeKey: event.target.value })}
                  hint="Nur zusammen mit einem frischen Cookie eingeben. Der Wert wird verschlüsselt gespeichert."
                  autoComplete="off"
                />
                <Input
                  label="ChatGPT-Custom-Connector"
                  value={formData.connectorName}
                  onChange={(event) =>
                    setFormData({ ...formData, connectorName: event.target.value })
                  }
                  placeholder={CHATGPT_WEB_CODEX_CONNECTOR_NAME}
                />
                <Button
                  variant="secondary"
                  disabled={doctorLoading || !connection.id}
                  onClick={async () => {
                    if (!connection.id) return;
                    setDoctorLoading(true);
                    try {
                      const response = await fetch(
                        `/api/providers/${connection.id}/chatgpt-web-codex-doctor`
                      );
                      const payload = await response.json();
                      setDoctorStatus(response.ok ? payload.status : { error: payload.error });
                    } finally {
                      setDoctorLoading(false);
                    }
                  }}
                >
                  {doctorLoading ? "Status wird geprüft …" : "Doctor-Status prüfen"}
                </Button>
                {doctorStatus && (
                  <div className="grid grid-cols-2 gap-2 text-xs text-text-muted">
                    {[
                      ["Browser", doctorStatus.browser?.ready],
                      ["Storage-State", doctorStatus.storageState?.ready],
                      ["ChatGPT-Anmeldung", doctorStatus.login?.ready],
                      ["Temporary Chat", doctorStatus.temporaryChats?.ready],
                      ["Tunnel-Binary", doctorStatus.tunnelBinary?.ready],
                      ["Tunnel", doctorStatus.tunnel?.ready],
                      ["Connector", doctorStatus.connector?.ready],
                      ["Tool-Roundtrip", doctorStatus.toolRoundtrip?.ready],
                      ["Aktive Turns", doctorStatus.runtime?.activeTurns],
                      ["Wartende Turns", doctorStatus.runtime?.waitingTurns],
                    ].map(([label, ready]) => (
                      <div key={String(label)}>
                        {label}:{" "}
                        {typeof ready === "number" ? ready : ready ? "bereit" : "nicht bereit"}
                      </div>
                    ))}
                    {doctorStatus.recovery?.interactiveLoginRequired && (
                      <div className="col-span-2 text-warning">
                        Interaktive Anmeldung erforderlich. Nutze den geschützten
                        Browser-/VNC-Recovery-Pfad.
                      </div>
                    )}
                    {doctorStatus.lastError && (
                      <div className="col-span-2 break-words text-danger">
                        Letzter Fehler: {String(doctorStatus.lastError)}
                      </div>
                    )}
                  </div>
                )}
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
            {isAwsPolly && (
              <>
                <Input
                  label={providerText(t, "awsPollyAccessKeyIdLabel", "AWS Access Key ID")}
                  value={formData.awsAccessKeyId}
                  onChange={(e) => setFormData({ ...formData, awsAccessKeyId: e.target.value })}
                  placeholder="AKIA..."
                  hint={providerText(
                    t,
                    "awsPollyAccessKeyIdHint",
                    "Used with the secret access key to sign Amazon Polly requests."
                  )}
                  autoComplete="off"
                  spellCheck={false}
                  autoCapitalize="off"
                />
                <Input
                  label={providerText(t, "awsPollyRegionLabel", "AWS Region")}
                  value={formData.region}
                  onChange={(e) => setFormData({ ...formData, region: e.target.value })}
                  placeholder="us-east-1"
                  hint={providerText(
                    t,
                    "awsPollyRegionHint",
                    "Defaults to us-east-1 when left blank."
                  )}
                  autoComplete="off"
                  spellCheck={false}
                  autoCapitalize="off"
                />
                <Input
                  label={providerText(
                    t,
                    "awsPollySessionTokenLabel",
                    "AWS Session Token (optional)"
                  )}
                  type="password"
                  value={formData.awsSessionToken}
                  onChange={(e) => setFormData({ ...formData, awsSessionToken: e.target.value })}
                  hint={providerText(
                    t,
                    "awsPollySessionTokenHint",
                    "Required only for temporary AWS credentials."
                  )}
                  autoComplete="off"
                  spellCheck={false}
                  autoCapitalize="off"
                />
              </>
            )}
            {validationResult && (
              <Badge variant={validationResult === "success" ? "success" : "error"}>
                {validationResult === "success" ? t("valid") : t("invalid")}
              </Badge>
            )}
            <button
              type="button"
              className="text-sm text-text-muted hover:text-text-primary flex items-center gap-1"
              onClick={() => setShowAdvanced(!showAdvanced)}
              aria-expanded={showAdvanced}
              aria-controls="edit-connection-advanced-settings"
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
                id="edit-connection-advanced-settings"
                className="flex flex-col gap-3 pl-2 border-l-2 border-border"
              >
                <Input
                  label={t("customUserAgentLabel")}
                  value={formData.customUserAgent}
                  onChange={(e) => setFormData({ ...formData, customUserAgent: e.target.value })}
                  placeholder="my-app/1.0"
                  hint={t("customUserAgentHint")}
                />
                <ProviderTierField provider={provider} />
                {isM365TierCapable && (
                  <Select
                    label={t("m365TierLabel")}
                    value={formData.m365Tier ?? ""}
                    options={[
                      { value: "", label: t("m365TierIndividualOption") },
                      { value: "edu", label: t("m365TierEduOption") },
                      { value: "enterprise", label: t("m365TierEnterpriseOption") },
                    ]}
                    onChange={(e) =>
                      setFormData({ ...formData, m365Tier: e.target.value as M365TierValue })
                    }
                    hint={t("m365TierHint")}
                  />
                )}
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
                <AgentrouterConsoleFields
                  provider={provider}
                  values={formData}
                  onChange={(patch) => setFormData({ ...formData, ...patch })}
                  t={t}
                />
                <div className="border-t border-border/30 pt-3 mt-1">
                  <p className="text-xs font-medium text-text-muted mb-2">
                    {t("rateLimitOverridesSection")}
                  </p>
                  <div className="grid grid-cols-2 gap-3">
                    <Input
                      label={t("rateLimitOverridesRpmLabel")}
                      type="number"
                      min={0}
                      value={formData.rpm}
                      onChange={(e) => setFormData({ ...formData, rpm: e.target.value })}
                      placeholder={t("inherit")}
                      hint={t("rateLimitOverridesRpmHint")}
                    />
                    <Input
                      label={t("rateLimitOverridesRpdLabel")}
                      type="number"
                      min={0}
                      value={formData.rpd}
                      onChange={(e) => setFormData({ ...formData, rpd: e.target.value })}
                      placeholder={t("inherit")}
                      hint={t("rateLimitOverridesRpdHint")}
                    />
                    <Input
                      label={t("rateLimitOverridesTpmLabel")}
                      type="number"
                      min={0}
                      value={formData.tpm}
                      onChange={(e) => setFormData({ ...formData, tpm: e.target.value })}
                      placeholder={t("inherit")}
                      hint={t("rateLimitOverridesTpmHint")}
                    />
                    <Input
                      label={t("rateLimitOverridesTpdLabel")}
                      type="number"
                      min={0}
                      value={formData.tpd}
                      onChange={(e) => setFormData({ ...formData, tpd: e.target.value })}
                      placeholder={t("inherit")}
                      hint={t("rateLimitOverridesTpdHint")}
                    />
                    <Input
                      label={t("rateLimitOverridesMinTimeLabel")}
                      type="number"
                      min={0}
                      value={formData.minTime}
                      onChange={(e) => setFormData({ ...formData, minTime: e.target.value })}
                      placeholder={t("inherit")}
                      hint={t("rateLimitOverridesMinTimeHint")}
                    />
                    <Input
                      label={t("rateLimitOverridesMaxWaitMsLabel")}
                      type="number"
                      min={0}
                      value={formData.maxWaitMs}
                      onChange={(e) => setFormData({ ...formData, maxWaitMs: e.target.value })}
                      placeholder={t("inherit")}
                      hint={t("rateLimitOverridesMaxWaitMsHint")}
                    />
                    <Input
                      label={t("rateLimitOverridesMaxConcurrentLabel")}
                      type="number"
                      min={0}
                      value={formData.rateLimitMaxConcurrent}
                      onChange={(e) =>
                        setFormData({ ...formData, rateLimitMaxConcurrent: e.target.value })
                      }
                      placeholder={t("inherit")}
                      hint={t("rateLimitOverridesMaxConcurrentHint")}
                    />
                  </div>
                </div>
              </div>
            )}
            {isCompatible && (
              <Input
                label={t("compatibleDefaultModelLabel")}
                value={formData.defaultModel}
                onChange={(e) => setFormData({ ...formData, defaultModel: e.target.value })}
                placeholder={
                  isAnthropicCompatibleProvider(provider)
                    ? "claude-3-5-sonnet-latest"
                    : "gpt-4o-mini"
                }
                hint={t("compatibleDefaultModelHint")}
                data-testid="compat-default-model-input"
              />
            )}
            <Input
              label={t("validationModelIdLabel")}
              placeholder={t("validationModelIdPlaceholder")}
              value={formData.validationModelId}
              onChange={(e) => setFormData({ ...formData, validationModelId: e.target.value })}
              hint={t("validationModelIdHint")}
            />
          </>
        )}
        {/* #6147 — opt-in "Advanced → override base URL" for eligible built-ins */}
        {!usesBaseUrl && isBaseUrlOverrideEligible && (
          <button
            type="button"
            onClick={() => setShowBaseUrlOverride(true)}
            className="self-start text-xs text-primary hover:underline"
          >
            {providerText(t, "overrideBaseUrlAdvanced", "Advanced: override base URL")}
          </button>
        )}
        {usesBaseUrl && (
          <Input
            label={t("baseUrlLabel")}
            value={formData.baseUrl}
            onChange={(e) => setFormData({ ...formData, baseUrl: e.target.value })}
            placeholder={getProviderBaseUrlPlaceholder(provider)}
            hint={
              getProviderBaseUrlHint(provider, t) ||
              (isBaseUrlOverrideEligible
                ? providerText(
                    t,
                    "overrideBaseUrlHint",
                    "Advanced: point this built-in provider at a custom endpoint. Leave blank to use the default."
                  )
                : undefined)
            }
          />
        )}
        {showProtocolSelector && (
          <Select
            label={providerText(t, "apiProtocolLabel", "API protocol")}
            value={formData.targetFormat}
            options={[
              {
                value: "",
                label: providerText(t, "apiProtocolDefault", "OpenAI-compatible (default)"),
              },
              ...alternateFormats.map((alt) => ({ value: alt.format, label: alt.label })),
            ]}
            onChange={(e) => setFormData({ ...formData, targetFormat: e.target.value })}
            hint={providerText(
              t,
              "apiProtocolHint",
              "Some providers publish the same models over more than one protocol. Leave the default unless you need the alternative."
            )}
          />
        )}
        <ProviderRegionField
          provider={provider}
          value={formData.region}
          onChange={(region) => setFormData({ ...formData, region })}
        />
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
          <div className="flex flex-col gap-3">
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
            <GlmTeamQuotaFields
              values={formData}
              onChange={(patch) => setFormData({ ...formData, ...patch })}
              t={t}
            />
          </div>
        )}
        {!isOAuth && connection?.apiKey && (
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-text-main">{t("apiKeyHealthLabel")}</label>
            <div className="flex flex-col gap-1.5">
              {(() => {
                const keyId = "primary";
                const health = apiKeyHealth[keyId];
                const statusColor =
                  health?.status === "invalid"
                    ? "text-red-400"
                    : health?.status === "warning"
                      ? "text-yellow-400"
                      : "text-text-muted";
                const statusIcon =
                  health?.status === "invalid" ? "🔴" : health?.status === "warning" ? "🟡" : "🟢";
                const statusLabel =
                  health?.status === "invalid"
                    ? t("apiKeyStatusInvalid")
                    : health?.status === "warning"
                      ? t("apiKeyStatusWarning", { count: health.failures })
                      : t("apiKeyStatusActive");

                return (
                  <div className="flex items-center gap-2">
                    <span
                      className={`flex-1 min-w-0 break-all font-mono text-xs bg-sidebar/50 px-3 py-2 rounded border border-border ${statusColor}`}
                    >
                      {statusIcon} {t("primaryKey")}: {connection.apiKey}
                    </span>
                    {health && (
                      <span
                        className="text-[10px] text-text-muted whitespace-nowrap"
                        title={statusLabel}
                      >
                        {health.failures}x
                        {health.lastFailure ? ` · ${formatTimeAgo(health.lastFailure)}` : ""}
                        {health.totalRequests != null
                          ? ` · (${health.totalRequests} req${health.totalFailures != null ? `, ${health.totalFailures} fail` : ""})`
                          : ""}
                      </span>
                    )}
                  </div>
                );
              })()}
            </div>
          </div>
        )}

        {!isOAuth && (
          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between gap-2">
              <label className="text-sm font-medium text-text-main">
                {t("extraApiKeysLabel")}
                <span className="ml-2 text-[11px] font-normal text-text-muted">
                  ({t("extraApiKeysHint")})
                </span>
              </label>
              {extraApiKeys.length > 0 && (
                <button
                  type="button"
                  onClick={() => setExtraApiKeys([])}
                  className="px-2.5 py-1.5 rounded-md bg-red-500/10 text-red-400 hover:bg-red-500/20 hover:text-red-300 text-xs font-medium transition-colors"
                >
                  {t("deleteAllExtraApiKeys")}
                </button>
              )}
            </div>
            {extraApiKeys.length > 0 && (
              <div className="flex flex-col gap-1.5">
                {extraApiKeys.map((key, idx) => {
                  const keyId = `extra_${idx}`;
                  const health = apiKeyHealth[keyId];
                  const statusColor =
                    health?.status === "invalid"
                      ? "text-red-400"
                      : health?.status === "warning"
                        ? "text-yellow-400"
                        : "text-text-muted";
                  const statusIcon =
                    health?.status === "invalid"
                      ? "🔴"
                      : health?.status === "warning"
                        ? "🟡"
                        : "🟢";
                  const statusLabel =
                    health?.status === "invalid"
                      ? t("apiKeyStatusInvalid")
                      : health?.status === "warning"
                        ? t("apiKeyStatusWarning", { count: health.failures })
                        : t("apiKeyStatusActive");

                  return (
                    <div key={idx} className="flex items-center gap-2">
                      <span
                        className={`flex-1 font-mono text-xs bg-sidebar/50 px-3 py-2 rounded border border-border truncate ${statusColor}`}
                      >
                        {statusIcon}{" "}
                        {t("extraApiKeyMasked", {
                          index: idx + 2,
                          prefix: key.slice(0, 6),
                          suffix: key.slice(-4),
                        })}
                      </span>
                      <div className="flex items-center gap-1">
                        {health && (
                          <span
                            className="text-[10px] text-text-muted whitespace-nowrap"
                            title={statusLabel}
                          >
                            {health.failures}x
                            {health.lastFailure ? ` · ${formatTimeAgo(health.lastFailure)}` : ""}
                            {health.totalRequests != null
                              ? ` · (${health.totalRequests} req${health.totalFailures != null ? `, ${health.totalFailures} fail` : ""})`
                              : ""}
                          </span>
                        )}
                        <button
                          onClick={() => setExtraApiKeys(extraApiKeys.filter((_, i) => i !== idx))}
                          className="p-1.5 rounded hover:bg-red-500/10 text-red-400 hover:text-red-500"
                          title={t("removeThisKey")}
                        >
                          <span className="material-symbols-outlined text-[16px]">close</span>
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
            <div className="flex gap-2">
              <input
                type="password"
                value={newExtraKey}
                onChange={(e) => setNewExtraKey(e.target.value)}
                placeholder={t("addAnotherApiKey")}
                className="flex-1 text-sm bg-sidebar/50 border border-border rounded px-3 py-2 text-text-main placeholder:text-text-muted focus:ring-1 focus:ring-primary outline-none"
                onKeyDown={(e) => {
                  if (e.key === "Enter" && newExtraKey.trim()) {
                    setExtraApiKeys([...extraApiKeys, newExtraKey.trim()]);
                    setNewExtraKey("");
                  }
                }}
                onPaste={(e) => {
                  const text = e.clipboardData.getData("text");
                  if (!/\r?\n/.test(text)) return;
                  e.preventDefault();
                  handleAddParsedExtraKeys(text);
                }}
              />
              <button
                onClick={() => {
                  if (newExtraKey.trim()) {
                    setExtraApiKeys([...extraApiKeys, newExtraKey.trim()]);
                    setNewExtraKey("");
                  }
                }}
                disabled={!newExtraKey.trim()}
                className="px-3 py-2 rounded bg-primary/10 text-primary hover:bg-primary/20 disabled:opacity-40 text-sm font-medium"
              >
                {t("add")}
              </button>
            </div>
            <p className="text-[11px] text-text-muted">{t("bulkPasteHint")}</p>
            {extraApiKeys.length > 0 && (
              <p className="text-[11px] text-text-muted">
                {t("totalKeysRotating", { count: extraApiKeys.length + 1 })}
              </p>
            )}
          </div>
        )}

        {!isCompatible && (
          <div className="flex items-center gap-3">
            <Button onClick={handleTest} variant="secondary" disabled={testing}>
              {testing ? t("testing") : t("testConnection")}
            </Button>
            {testResult && (
              <>
                <Badge variant={testResult.valid ? "success" : "error"}>
                  {testResult.valid ? t("valid") : t("failed")}
                </Badge>
                {testErrorMeta && (
                  <Badge variant={testErrorMeta.variant}>{t(testErrorMeta.labelKey)}</Badge>
                )}
              </>
            )}
          </div>
        )}

        <div className="flex gap-2">
          <Button
            onClick={handleSubmit}
            fullWidth
            disabled={saving || (isGooglePse && !formData.cx.trim())}
          >
            {saving ? t("saving") : t("save")}
          </Button>
          <Button onClick={onClose} variant="ghost" fullWidth>
            {t("cancel")}
          </Button>
        </div>
      </div>
    </Modal>
  );
}
