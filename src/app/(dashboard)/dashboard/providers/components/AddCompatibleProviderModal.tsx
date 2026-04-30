"use client";

import { useEffect, useMemo, useState } from "react";
import { useTranslations } from "next-intl";

import { Badge, Button, Input, Modal, Select } from "@/shared/components";

type CompatibleMode = "openai" | "anthropic" | "cc";
type CompatibleProviderNode = { id: string } & Record<string, unknown>;

interface AddCompatibleProviderModalProps {
  isOpen: boolean;
  mode: CompatibleMode;
  title?: string;
  onClose: () => void;
  onCreated: (node: CompatibleProviderNode) => void;
}

interface CompatibleFormState {
  name: string;
  prefix: string;
  apiType: string;
  baseUrl: string;
  chatPath: string;
  modelsPath: string;
}

const CC_DEFAULT_CHAT_PATH = "/v1/messages?beta=true";

const MODE_DEFAULTS: Record<
  CompatibleMode,
  {
    baseUrl: string;
    type: "openai-compatible" | "anthropic-compatible";
    compatMode?: "cc";
    chatPath: string;
    hasApiType: boolean;
    hasModelsPath: boolean;
    hasWarning: boolean;
  }
> = {
  openai: {
    baseUrl: "https://api.openai.com/v1",
    type: "openai-compatible",
    chatPath: "",
    hasApiType: true,
    hasModelsPath: true,
    hasWarning: false,
  },
  anthropic: {
    baseUrl: "https://api.anthropic.com/v1",
    type: "anthropic-compatible",
    chatPath: "",
    hasApiType: false,
    hasModelsPath: true,
    hasWarning: false,
  },
  cc: {
    baseUrl: "",
    type: "anthropic-compatible",
    compatMode: "cc",
    chatPath: CC_DEFAULT_CHAT_PATH,
    hasApiType: false,
    hasModelsPath: false,
    hasWarning: true,
  },
};

function createInitialForm(mode: CompatibleMode): CompatibleFormState {
  const defaults = MODE_DEFAULTS[mode];
  return {
    name: "",
    prefix: "",
    apiType: "chat",
    baseUrl: defaults.baseUrl,
    chatPath: defaults.chatPath,
    modelsPath: "",
  };
}

export default function AddCompatibleProviderModal({
  isOpen,
  mode,
  title,
  onClose,
  onCreated,
}: AddCompatibleProviderModalProps) {
  const t = useTranslations("providers");
  const defaults = MODE_DEFAULTS[mode];
  const [formData, setFormData] = useState<CompatibleFormState>(() => createInitialForm(mode));
  const [submitting, setSubmitting] = useState(false);
  const [checkKey, setCheckKey] = useState("");
  const [validating, setValidating] = useState(false);
  const [validationResult, setValidationResult] = useState<"success" | "failed" | null>(null);
  const [showAdvanced, setShowAdvanced] = useState(false);

  const apiTypeOptions = useMemo(
    () => [
      { value: "chat", label: t("chatCompletions") },
      { value: "responses", label: t("responsesApi") },
      { value: "embeddings", label: t("embeddings") },
      { value: "audio-transcriptions", label: t("audioTranscriptions") },
      { value: "audio-speech", label: t("audioSpeech") },
      { value: "images-generations", label: t("imagesGenerations") },
    ],
    [t]
  );

  useEffect(() => {
    if (!isOpen) return;
    setFormData(createInitialForm(mode));
    setValidationResult(null);
    setCheckKey("");
    setShowAdvanced(false);
  }, [isOpen, mode]);

  const modalTitle =
    title ||
    (mode === "openai"
      ? t("addOpenAICompatible")
      : mode === "anthropic"
        ? t("addAnthropicCompatible")
        : t("addCcCompatible"));

  const namePlaceholder =
    mode === "cc"
      ? t("ccCompatibleNamePlaceholder")
      : t("compatibleProdPlaceholder", {
          type: mode === "openai" ? t("openai") : t("anthropic"),
        });
  const nameHint = mode === "cc" ? t("ccCompatibleNameHint") : t("nameHint");
  const prefixPlaceholder =
    mode === "openai"
      ? t("openaiPrefixPlaceholder")
      : mode === "cc"
        ? t("ccCompatiblePrefixPlaceholder")
        : t("anthropicPrefixPlaceholder");
  const prefixHint = mode === "cc" ? t("ccCompatiblePrefixHint") : t("prefixHint");
  const baseUrlPlaceholder =
    mode === "openai"
      ? t("openaiBaseUrlPlaceholder")
      : mode === "cc"
        ? t("ccCompatibleBaseUrlPlaceholder")
        : t("anthropicBaseUrlPlaceholder");
  const baseUrlHint =
    mode === "cc"
      ? t("ccCompatibleBaseUrlHint")
      : t("compatibleBaseUrlHint", {
          type: mode === "openai" ? t("openai") : t("anthropic"),
        });
  const chatPathPlaceholder =
    mode === "openai" ? "/v1/chat/completions" : mode === "cc" ? CC_DEFAULT_CHAT_PATH : "/messages";
  const chatPathHint = mode === "cc" ? t("ccCompatibleChatPathHint") : t("chatPathHint");
  const advancedId = `advanced-settings-${mode}`;
  const hasRequiredFields = Boolean(
    formData.name.trim() && formData.prefix.trim() && formData.baseUrl.trim()
  );
  const canValidate = Boolean(checkKey.trim() && formData.baseUrl.trim());

  const resetAfterCreate = () => {
    setFormData(createInitialForm(mode));
    setCheckKey("");
    setValidationResult(null);
    setShowAdvanced(false);
  };

  const handleSubmit = async () => {
    if (!hasRequiredFields) return;
    setSubmitting(true);
    try {
      const body: Record<string, unknown> = {
        name: formData.name,
        prefix: formData.prefix,
        baseUrl: formData.baseUrl,
        type: defaults.type,
        chatPath: formData.chatPath || (mode === "cc" ? CC_DEFAULT_CHAT_PATH : ""),
      };
      if (defaults.hasApiType) body.apiType = formData.apiType;
      if (defaults.hasModelsPath) body.modelsPath = formData.modelsPath || "";
      if (defaults.compatMode) body.compatMode = defaults.compatMode;

      const res = await fetch("/api/provider-nodes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const data = (await res.json()) as { node: CompatibleProviderNode };
      if (res.ok) {
        onCreated(data.node);
        resetAfterCreate();
      }
    } catch (error) {
      console.log(`Error creating ${mode} compatible node:`, error);
    } finally {
      setSubmitting(false);
    }
  };

  const handleValidate = async () => {
    setValidating(true);
    try {
      const body: Record<string, unknown> = {
        baseUrl: formData.baseUrl,
        apiKey: checkKey,
        type: defaults.type,
      };
      if (defaults.hasModelsPath) body.modelsPath = formData.modelsPath || "";
      if (defaults.compatMode) {
        body.compatMode = defaults.compatMode;
        body.chatPath = formData.chatPath || CC_DEFAULT_CHAT_PATH;
      }

      const res = await fetch("/api/provider-nodes/validate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const data = await res.json();
      setValidationResult(data.valid ? "success" : "failed");
    } catch {
      setValidationResult("failed");
    } finally {
      setValidating(false);
    }
  };

  return (
    <Modal isOpen={isOpen} title={modalTitle} onClose={onClose}>
      <div className="flex flex-col gap-4">
        {defaults.hasWarning && (
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
          placeholder={namePlaceholder}
          hint={nameHint}
        />
        <Input
          label={t("prefixLabel")}
          value={formData.prefix}
          onChange={(e) => setFormData({ ...formData, prefix: e.target.value })}
          placeholder={prefixPlaceholder}
          hint={prefixHint}
        />
        {defaults.hasApiType && (
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
          placeholder={baseUrlPlaceholder}
          hint={baseUrlHint}
        />

        <button
          type="button"
          className="text-sm text-text-muted hover:text-text-primary flex items-center gap-1"
          onClick={() => setShowAdvanced(!showAdvanced)}
          aria-expanded={showAdvanced}
          aria-controls={advancedId}
        >
          <span
            className={`transition-transform ${showAdvanced ? "rotate-90" : ""}`}
            aria-hidden="true"
          >
            {">"}
          </span>
          {t("advancedSettings")}
        </button>
        {showAdvanced && (
          <div id={advancedId} className="flex flex-col gap-3 pl-2 border-l-2 border-border">
            <Input
              label={t("chatPathLabel")}
              value={formData.chatPath}
              onChange={(e) => setFormData({ ...formData, chatPath: e.target.value })}
              placeholder={chatPathPlaceholder}
              hint={chatPathHint}
            />
            {defaults.hasModelsPath && (
              <Input
                label={t("modelsPathLabel")}
                value={formData.modelsPath}
                onChange={(e) => setFormData({ ...formData, modelsPath: e.target.value })}
                placeholder={t("modelsPathPlaceholder")}
                hint={t("modelsPathHint")}
              />
            )}
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
              disabled={!canValidate || validating}
              variant="secondary"
            >
              {validating ? t("checking") : t("check")}
            </Button>
          </div>
        </div>
        {validationResult && (
          <Badge variant={validationResult === "success" ? "success" : "error"}>
            {validationResult === "success" ? t("valid") : t("invalid")}
          </Badge>
        )}

        <div className="flex gap-2">
          <Button onClick={handleSubmit} fullWidth disabled={!hasRequiredFields || submitting}>
            {submitting ? t("creating") : t("add")}
          </Button>
          <Button onClick={onClose} variant="ghost" fullWidth>
            {t("cancel")}
          </Button>
        </div>
      </div>
    </Modal>
  );
}
