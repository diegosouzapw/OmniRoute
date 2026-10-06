"use client";
import { useState } from "react";
import { useTranslations } from "next-intl";
import { Button, Badge, Input, Modal, Select, Toggle } from "@/shared/components";
import { isValidProviderIconUrl } from "@/shared/validation/iconUrl";
import { CC_COMPATIBLE_DEFAULT_CHAT_PATH } from "../../providerDetailConstants";
import NewApiAggregatorFields from "./NewApiAggregatorFields";
import { providerText } from "../../providerPageHelpers";
interface EditCompatibleNodeModalNode {
  id?: string;
  name?: string;
  prefix?: string;
  apiType?: string;
  baseUrl?: string;
  chatPath?: string;
  modelsPath?: string;
  iconUrl?: string;
  dailyQuotaResetTimezone?: string | null;
  dailyQuotaResetHour?: number | null;
  providerSpecificData?: Record<string, unknown>;
}

interface EditCompatibleNodeModalProps {
  isOpen: boolean;
  node: EditCompatibleNodeModalNode | null;
  onSave: (data: unknown) => Promise<void>;
  onClose: () => void;
  isAnthropic?: boolean;
  isCcCompatible?: boolean;
}

export default function EditCompatibleNodeModal({
  isOpen,
  node,
  onSave,
  onClose,
  isAnthropic,
  isCcCompatible,
}: EditCompatibleNodeModalProps) {
  const t = useTranslations("providers");
  const [formData, setFormData] = useState({
    name: "",
    prefix: "",
    apiType: "chat",
    baseUrl: "https://api.openai.com/v1",
    chatPath: "",
    modelsPath: "",
    iconUrl: "",
    newApiAggregatorBalance: false,
    consoleApiKey: "",
    newApiUserId: "",
    quotaPerUnit: "",
    dailyQuotaResetTimezone: "",
    dailyQuotaResetHour: "",
  });
  const [saving, setSaving] = useState(false);
  const [checkKey, setCheckKey] = useState("");
  const [checkModelId, setCheckModelId] = useState("");
  const [validating, setValidating] = useState(false);
  const [validationResult, setValidationResult] = useState<null | {
    valid: boolean;
    error?: string | null;
    method?: string | null;
  }>(null);
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [iconUrlError, setIconUrlError] = useState<string | null>(null);
  const [saveError, setSaveError] = useState<string | null>(null);

  // Modal-open form initialization from the node being edited — applied as a
  // render-phase adjustment guarded by the previously initialized node
  // (react.dev "adjusting state when a prop changes") instead of a
  // synchronous-setState effect. Closing clears the marker so the next open
  // re-initializes again.
  const [initializedFor, setInitializedFor] = useState<{
    node: EditCompatibleNodeModalNode;
    isAnthropic?: boolean;
    isCcCompatible?: boolean;
  } | null>(null);
  if (isOpen && node) {
    if (
      initializedFor?.node !== node ||
      initializedFor.isAnthropic !== isAnthropic ||
      initializedFor.isCcCompatible !== isCcCompatible
    ) {
      setInitializedFor({ node, isAnthropic, isCcCompatible });
      const psd = (node.providerSpecificData || {}) as Record<string, unknown>;
      setFormData({
        name: node.name || "",
        prefix: node.prefix || "",
        apiType: node.apiType || "chat",
        baseUrl:
          node.baseUrl ||
          (isCcCompatible
            ? "https://api.anthropic.com"
            : isAnthropic
              ? "https://api.anthropic.com/v1"
              : "https://api.openai.com/v1"),
        chatPath: node.chatPath || (isCcCompatible ? CC_COMPATIBLE_DEFAULT_CHAT_PATH : ""),
        modelsPath: isCcCompatible ? "" : node.modelsPath || "",
        iconUrl: node.iconUrl || "",
        newApiAggregatorBalance: psd.newApiAggregatorBalance === true,
        consoleApiKey: typeof psd.consoleApiKey === "string" ? psd.consoleApiKey : "",
        newApiUserId: typeof psd.newApiUserId === "string" ? psd.newApiUserId : "",
        quotaPerUnit: typeof psd.quotaPerUnit === "number" ? String(psd.quotaPerUnit) : "",
        dailyQuotaResetTimezone: node.dailyQuotaResetTimezone || "",
        dailyQuotaResetHour:
          node.dailyQuotaResetHour === 0 || node.dailyQuotaResetHour
            ? String(node.dailyQuotaResetHour)
            : "",
      });
      setSaveError(null);
      setIconUrlError(null);
      setShowAdvanced(
        !!(
          node.chatPath ||
          (!isCcCompatible && node.modelsPath) ||
          (isCcCompatible && !node.chatPath)
        )
      );
    }
  } else if (initializedFor !== null) {
    setInitializedFor(null);
  }

  const apiTypeOptions = [
    { value: "chat", label: t("chatCompletions") },
    { value: "responses", label: t("responsesApi") },
    { value: "embeddings", label: t("embeddings") },
    { value: "audio-transcriptions", label: t("audioTranscriptions") },
    { value: "audio-speech", label: t("audioSpeech") },
    { value: "images-generations", label: t("imagesGenerations") },
  ];

  const handleSubmit = async () => {
    if (!formData.name.trim() || !formData.prefix.trim() || !formData.baseUrl.trim()) return;
    const iconUrl = formData.iconUrl.trim();
    if (!isValidProviderIconUrl(iconUrl)) {
      setIconUrlError(t("iconUrlInvalid"));
      return;
    }
    setIconUrlError(null);
    setSaveError(null);
    setSaving(true);
    try {
      const payload: any = {
        name: formData.name,
        prefix: formData.prefix,
        baseUrl: formData.baseUrl,
        chatPath: formData.chatPath || (isCcCompatible ? CC_COMPATIBLE_DEFAULT_CHAT_PATH : ""),
        modelsPath: isCcCompatible ? "" : formData.modelsPath,
        iconUrl: formData.iconUrl.trim(),
      };
      const tz = formData.dailyQuotaResetTimezone.trim();
      payload.dailyQuotaResetTimezone = tz || null;
      const hourRaw = formData.dailyQuotaResetHour.trim();
      payload.dailyQuotaResetHour = hourRaw === "" ? null : Number(hourRaw);
      if (!isAnthropic) {
        payload.apiType = formData.apiType;
      }
      // Aggregator gateway fields (#9415)
      if (formData.newApiAggregatorBalance) {
        payload.providerSpecificData = {
          newApiAggregatorBalance: true,
        };
        if (formData.consoleApiKey.trim()) {
          payload.providerSpecificData.consoleApiKey = formData.consoleApiKey.trim();
        }
        if (formData.newApiUserId.trim()) {
          payload.providerSpecificData.newApiUserId = formData.newApiUserId.trim();
        }
        const parsedQuotaPerUnit = parseInt(formData.quotaPerUnit, 10);
        if (Number.isFinite(parsedQuotaPerUnit) && parsedQuotaPerUnit > 0) {
          payload.providerSpecificData.quotaPerUnit = parsedQuotaPerUnit;
        }
      }
      await onSave(payload);
    } catch (error) {
      setSaveError(
        error instanceof Error && error.message.trim()
          ? error.message
          : providerText(t, "failedSave", "Failed to save")
      );
    } finally {
      setSaving(false);
    }
  };

  const handleValidate = async () => {
    setValidating(true);
    try {
      const res = await fetch("/api/provider-nodes/validate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          baseUrl: formData.baseUrl,
          apiKey: checkKey,
          type: isAnthropic ? "anthropic-compatible" : "openai-compatible",
          apiType: !isAnthropic ? formData.apiType : undefined,
          compatMode: isCcCompatible ? "cc" : undefined,
          chatPath: formData.chatPath || (isCcCompatible ? CC_COMPATIBLE_DEFAULT_CHAT_PATH : ""),
          modelsPath: isCcCompatible ? "" : formData.modelsPath,
          modelId: checkModelId.trim() || undefined,
        }),
      });
      const data = await res.json();
      setValidationResult({
        valid: !!data.valid,
        error: data.error ?? null,
        method: data.method ?? null,
      });
    } catch {
      setValidationResult({
        valid: false,
        error: providerText(t, "networkError", "Network error"),
      });
    } finally {
      setValidating(false);
    }
  };

  if (!node) return null;

  return (
    <Modal
      isOpen={isOpen}
      title={
        isCcCompatible
          ? t("ccCompatibleDetailsTitle")
          : t("editCompatibleTitle", { type: isAnthropic ? t("anthropic") : t("openai") })
      }
      onClose={onClose}
    >
      <div className="flex flex-col gap-4">
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
        <Input
          label={t("nameLabel")}
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          placeholder={
            isCcCompatible
              ? t("ccCompatibleNamePlaceholder")
              : t("compatibleProdPlaceholder", {
                  type: isAnthropic ? t("anthropic") : t("openai"),
                })
          }
          hint={isCcCompatible ? t("ccCompatibleNameHint") : t("nameHint")}
        />
        <Input
          label={t("prefixLabel")}
          value={formData.prefix}
          onChange={(e) => setFormData({ ...formData, prefix: e.target.value })}
          placeholder={
            isCcCompatible
              ? t("ccCompatiblePrefixPlaceholder")
              : isAnthropic
                ? t("anthropicPrefixPlaceholder")
                : t("openaiPrefixPlaceholder")
          }
          hint={isCcCompatible ? t("ccCompatiblePrefixHint") : t("prefixHint")}
        />
        {!isAnthropic && (
          <Select
            label={t("apiTypeLabel")}
            options={apiTypeOptions}
            value={formData.apiType}
            onChange={(e) => setFormData({ ...formData, apiType: e.target.value })}
          />
        )}
        <Input
          label={t("baseUrlLabel")}
          value={formData.baseUrl}
          onChange={(e) => setFormData({ ...formData, baseUrl: e.target.value })}
          placeholder={
            isCcCompatible
              ? t("ccCompatibleBaseUrlPlaceholder")
              : isAnthropic
                ? t("anthropicBaseUrlPlaceholder")
                : t("openaiBaseUrlPlaceholder")
          }
          hint={
            isCcCompatible
              ? t("ccCompatibleBaseUrlHint")
              : t("compatibleBaseUrlHint", {
                  type: isAnthropic ? t("anthropic") : t("openai"),
                })
          }
        />
        <Input
          label={t("iconUrlLabel")}
          value={formData.iconUrl}
          onChange={(e) => setFormData({ ...formData, iconUrl: e.target.value })}
          placeholder="https://example.com/logo.png"
          hint={iconUrlError ?? t("iconUrlHint")}
        />
        <Toggle
          label={t("newApiAggregatorToggleLabel")}
          description={t("newApiAggregatorToggleHint")}
          checked={formData.newApiAggregatorBalance}
          onChange={(checked: boolean) =>
            setFormData({ ...formData, newApiAggregatorBalance: checked })
          }
        />
        <NewApiAggregatorFields
          enabled={formData.newApiAggregatorBalance}
          values={{
            consoleApiKey: formData.consoleApiKey,
            newApiUserId: formData.newApiUserId,
            quotaPerUnit: formData.quotaPerUnit,
          }}
          onChange={(patch) => setFormData({ ...formData, ...patch })}
          t={t}
        />
        <button
          type="button"
          className="text-sm text-text-muted hover:text-text-primary flex items-center gap-1"
          onClick={() => setShowAdvanced(!showAdvanced)}
          aria-expanded={showAdvanced}
          aria-controls="advanced-settings"
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
          <div id="advanced-settings" className="flex flex-col gap-3 pl-2 border-l-2 border-border">
            <Input
              label={t("chatPathLabel")}
              value={formData.chatPath}
              onChange={(e) => setFormData({ ...formData, chatPath: e.target.value })}
              placeholder={
                isCcCompatible
                  ? CC_COMPATIBLE_DEFAULT_CHAT_PATH
                  : isAnthropic
                    ? "/messages"
                    : t("chatPathPlaceholder")
              }
              hint={isCcCompatible ? t("ccCompatibleChatPathHint") : t("chatPathHint")}
            />
            {!isCcCompatible && (
              <Input
                label={t("modelsPathLabel")}
                value={formData.modelsPath}
                onChange={(e) => setFormData({ ...formData, modelsPath: e.target.value })}
                placeholder={t("modelsPathPlaceholder")}
                hint={t("modelsPathHint")}
              />
            )}
            <Input
              label={t("dailyQuotaResetTimezoneLabel")}
              value={formData.dailyQuotaResetTimezone}
              onChange={(e) =>
                setFormData({ ...formData, dailyQuotaResetTimezone: e.target.value })
              }
              placeholder="Asia/Shanghai"
              hint={t("dailyQuotaResetTimezoneHint")}
            />
            <Input
              label={t("dailyQuotaResetHourLabel")}
              value={formData.dailyQuotaResetHour}
              onChange={(e) => setFormData({ ...formData, dailyQuotaResetHour: e.target.value })}
              placeholder="0"
              hint={t("dailyQuotaResetHourHint")}
            />
          </div>
        )}
        <div className="flex gap-2">
          <Input
            label={t("apiKeyForCheck")}
            type="password"
            value={checkKey}
            onChange={(e) => setCheckKey(e.target.value)}
            className="flex-1"
          />
          <div className="pt-6">
            <Button
              onClick={handleValidate}
              disabled={!checkKey || validating || !formData.baseUrl.trim()}
              variant="secondary"
            >
              {validating ? t("checking") : t("check")}
            </Button>
          </div>
        </div>
        <Input
          label={t("testModelIdLabel")}
          value={checkModelId}
          onChange={(e) => setCheckModelId(e.target.value)}
          placeholder={t("testModelIdPlaceholder")}
          hint={t("testModelIdHint")}
        />
        {validationResult && (
          <div className="flex flex-col gap-1">
            <Badge variant={validationResult.valid ? "success" : "error"}>
              {validationResult.valid ? t("valid") : t("invalid")}
            </Badge>
            {validationResult.error && (
              <span
                className={`text-sm ${validationResult.valid ? "text-text-muted" : "text-red-500"}`}
              >
                {validationResult.error}
              </span>
            )}
          </div>
        )}
        {saveError && (
          <div
            role="alert"
            aria-live="assertive"
            className="text-sm text-red-500 bg-red-500/10 border border-red-500/20 rounded-lg px-3 py-2"
          >
            {saveError}
          </div>
        )}
        <div className="flex gap-2">
          <Button
            onClick={handleSubmit}
            fullWidth
            disabled={
              !formData.name.trim() || !formData.prefix.trim() || !formData.baseUrl.trim() || saving
            }
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
