"use client";

import type { Dispatch, SetStateAction } from "react";
import { useTranslations } from "next-intl";
import { Button } from "@/shared/components";
import { providerText, type ProviderMessageTranslator } from "../providerPageHelpers";
import type { BooleanCapabilityChoice } from "../customModelFormHelpers";
import CapabilityChoiceControl from "./CapabilityChoiceControl";

type CapabilityChoiceLabels = {
  unknownLabel: string;
  yesLabel: string;
  noLabel: string;
};

type AddCustomModelFormProps = {
  adding: boolean;
  newModelId: string;
  newModelName: string;
  newApiFormat: string;
  newTargetFormat: string;
  newEndpoints: string[];
  newUnsupportedParams: string;
  newSupportsVision: BooleanCapabilityChoice;
  newSupportsTools: BooleanCapabilityChoice;
  newSupportsThinking: BooleanCapabilityChoice;
  newSupportsXHigh: BooleanCapabilityChoice;
  newSupportsMax: BooleanCapabilityChoice;
  newContextWindow: string;
  newMaxOutputTokens: string;
  newDefaultThinkingBudget: string;
  newThinkingBudgetCap: string;
  capabilityChoiceLabels: CapabilityChoiceLabels;
  onAdd: () => void;
  setNewModelId: Dispatch<SetStateAction<string>>;
  setNewModelName: Dispatch<SetStateAction<string>>;
  setNewApiFormat: Dispatch<SetStateAction<string>>;
  setNewTargetFormat: Dispatch<SetStateAction<string>>;
  setNewEndpoints: Dispatch<SetStateAction<string[]>>;
  setNewUnsupportedParams: Dispatch<SetStateAction<string>>;
  setNewSupportsVision: Dispatch<SetStateAction<BooleanCapabilityChoice>>;
  setNewSupportsTools: Dispatch<SetStateAction<BooleanCapabilityChoice>>;
  setNewSupportsThinking: Dispatch<SetStateAction<BooleanCapabilityChoice>>;
  setNewSupportsXHigh: Dispatch<SetStateAction<BooleanCapabilityChoice>>;
  setNewSupportsMax: Dispatch<SetStateAction<BooleanCapabilityChoice>>;
  setNewContextWindow: Dispatch<SetStateAction<string>>;
  setNewMaxOutputTokens: Dispatch<SetStateAction<string>>;
  setNewDefaultThinkingBudget: Dispatch<SetStateAction<string>>;
  setNewThinkingBudgetCap: Dispatch<SetStateAction<string>>;
};

const ENDPOINTS = ["chat", "embeddings", "rerank", "images", "audio"] as const;
type CustomModelEndpoint = (typeof ENDPOINTS)[number];
type CapabilityChoiceItem = {
  label: string;
  value: BooleanCapabilityChoice;
  setter: Dispatch<SetStateAction<BooleanCapabilityChoice>>;
};
type NumericCapabilityItem = {
  label: string;
  value: string;
  min: number;
  setter: Dispatch<SetStateAction<string>>;
};
type CustomModelRoutingProps = Pick<
  AddCustomModelFormProps,
  | "newApiFormat"
  | "newTargetFormat"
  | "newEndpoints"
  | "setNewApiFormat"
  | "setNewTargetFormat"
  | "setNewEndpoints"
> & {
  t: ProviderMessageTranslator;
};
type CustomModelCapabilitiesProps = Pick<
  AddCustomModelFormProps,
  | "newSupportsVision"
  | "newSupportsTools"
  | "newSupportsThinking"
  | "newSupportsXHigh"
  | "newSupportsMax"
  | "newContextWindow"
  | "newMaxOutputTokens"
  | "newDefaultThinkingBudget"
  | "newThinkingBudgetCap"
  | "capabilityChoiceLabels"
  | "setNewSupportsVision"
  | "setNewSupportsTools"
  | "setNewSupportsThinking"
  | "setNewSupportsXHigh"
  | "setNewSupportsMax"
  | "setNewContextWindow"
  | "setNewMaxOutputTokens"
  | "setNewDefaultThinkingBudget"
  | "setNewThinkingBudgetCap"
> & {
  t: ProviderMessageTranslator;
};
type CustomModelMetadataProps = Pick<
  AddCustomModelFormProps,
  "newUnsupportedParams" | "setNewUnsupportedParams"
> & {
  t: ProviderMessageTranslator;
};

function toggleEndpointSelection(
  endpoints: string[],
  endpoint: string,
  enabled: boolean
): string[] {
  if (!enabled) return endpoints.filter((entry) => entry !== endpoint);
  return endpoints.includes(endpoint) ? endpoints : [...endpoints, endpoint];
}

function getEndpointLabel(t: ProviderMessageTranslator, endpoint: CustomModelEndpoint): string {
  switch (endpoint) {
    case "chat":
      return `💬 ${t("supportedEndpointChat")}`;
    case "embeddings":
      return `📐 ${t("supportedEndpointEmbeddings")}`;
    case "rerank":
      return providerText(t, "supportedEndpointRerank", "Rerank");
    case "images":
      return `🖼️ ${t("supportedEndpointImages")}`;
    case "audio":
      return `🔊 ${t("supportedEndpointAudio")}`;
  }
}

function CustomModelHeader({
  adding,
  newModelId,
  newModelName,
  onAdd,
  setNewModelId,
  setNewModelName,
  t,
}: Pick<
  AddCustomModelFormProps,
  "adding" | "newModelId" | "newModelName" | "onAdd" | "setNewModelId" | "setNewModelName"
> & {
  t: ProviderMessageTranslator;
}) {
  return (
    <div className="flex flex-col items-stretch gap-2 sm:flex-row sm:items-end">
      <div className="min-w-0 flex-1">
        <label htmlFor="custom-model-id" className="text-xs text-text-muted mb-1 block">
          {t("modelId")}
        </label>
        <input
          id="custom-model-id"
          type="text"
          value={newModelId}
          onChange={(e) => setNewModelId(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && onAdd()}
          placeholder={t("customModelPlaceholder")}
          className="w-full px-3 py-2 text-sm border border-border rounded-lg bg-background focus:outline-none focus:border-primary"
        />
      </div>
      <div className="min-w-0 sm:w-40">
        <label htmlFor="custom-model-name" className="text-xs text-text-muted mb-1 block">
          {t("displayName")}
        </label>
        <input
          id="custom-model-name"
          type="text"
          value={newModelName}
          onChange={(e) => setNewModelName(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && onAdd()}
          placeholder={t("optional")}
          className="w-full px-3 py-2 text-sm border border-border rounded-lg bg-background focus:outline-none focus:border-primary"
        />
      </div>
      <Button
        size="sm"
        icon="add"
        onClick={onAdd}
        disabled={!newModelId.trim() || adding}
        className="sm:shrink-0"
      >
        {adding ? t("adding") : t("add")}
      </Button>
    </div>
  );
}

function ApiFormatSelect({
  value,
  setter,
  t,
}: {
  value: string;
  setter: Dispatch<SetStateAction<string>>;
  t: ProviderMessageTranslator;
}) {
  return (
    <div className="w-48">
      <label htmlFor="custom-api-format" className="text-xs text-text-muted mb-1 block">
        {providerText(t, "apiFormatLabel", "API format")}
      </label>
      <select
        id="custom-api-format"
        value={value}
        onChange={(e) => setter(e.target.value)}
        className="w-full px-3 py-2 text-sm border border-border rounded-lg bg-background focus:outline-none focus:border-primary"
      >
        <option value="chat-completions">{t("chatCompletions")}</option>
        <option value="responses">{t("responsesApi")}</option>
        <option value="embeddings">{t("embeddings")}</option>
        <option value="rerank">{providerText(t, "apiFormatRerank", "Rerank")}</option>
        <option value="audio-transcriptions">{t("audioTranscriptions")}</option>
        <option value="audio-speech">{t("audioSpeech")}</option>
        <option value="images-generations">{t("imagesGenerations")}</option>
      </select>
    </div>
  );
}

function TargetFormatSelect({
  value,
  setter,
  t,
}: {
  value: string;
  setter: Dispatch<SetStateAction<string>>;
  t: ProviderMessageTranslator;
}) {
  return (
    <div className="w-48">
      <label htmlFor="custom-target-format" className="text-xs text-text-muted mb-1 block">
        {providerText(t, "targetFormatLabel", "Target format")}
      </label>
      <select
        id="custom-target-format"
        value={value}
        onChange={(e) => setter(e.target.value)}
        title={providerText(t, "targetFormatHint", "Override the upstream wire format")}
        className="w-full px-3 py-2 text-sm border border-border rounded-lg bg-background focus:outline-none focus:border-primary"
      >
        <option value="">{providerText(t, "targetFormatUnset", "No override")}</option>
        <option value="openai">{providerText(t, "compatProtocolOpenAI", "OpenAI")}</option>
        <option value="openai-responses">
          {providerText(t, "compatProtocolOpenAIResponses", "OpenAI Responses")}
        </option>
        <option value="claude">{providerText(t, "compatProtocolClaude", "Claude")}</option>
        <option value="gemini">{providerText(t, "targetFormatGemini", "Gemini")}</option>
        <option value="antigravity">
          {providerText(t, "targetFormatAntigravity", "Antigravity")}
        </option>
      </select>
    </div>
  );
}

function EndpointSelector({
  endpoints,
  setEndpoint,
  t,
}: {
  endpoints: string[];
  setEndpoint: (endpoint: string, enabled: boolean) => void;
  t: ProviderMessageTranslator;
}) {
  return (
    <div className="flex-1">
      <span className="text-xs text-text-muted mb-1 block">{t("supportedEndpointsLabel")}</span>
      <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
        {ENDPOINTS.map((endpoint) => (
          <label
            key={endpoint}
            className="flex items-center gap-1.5 text-xs text-text-main cursor-pointer"
          >
            <input
              type="checkbox"
              checked={endpoints.includes(endpoint)}
              onChange={(e) => setEndpoint(endpoint, e.target.checked)}
              className="rounded border-border"
            />
            {getEndpointLabel(t, endpoint)}
          </label>
        ))}
      </div>
    </div>
  );
}

function CustomModelRouting({
  newApiFormat,
  newTargetFormat,
  newEndpoints,
  setNewApiFormat,
  setNewTargetFormat,
  setNewEndpoints,
  t,
}: CustomModelRoutingProps) {
  const setEndpoint = (endpoint: string, enabled: boolean) => {
    setNewEndpoints((prev) => toggleEndpointSelection(prev, endpoint, enabled));
  };

  return (
    <div className="flex items-end gap-4 flex-wrap">
      <ApiFormatSelect value={newApiFormat} setter={setNewApiFormat} t={t} />
      <TargetFormatSelect value={newTargetFormat} setter={setNewTargetFormat} t={t} />
      <EndpointSelector endpoints={newEndpoints} setEndpoint={setEndpoint} t={t} />
    </div>
  );
}

function CustomModelMetadata({
  newUnsupportedParams,
  setNewUnsupportedParams,
  t,
}: CustomModelMetadataProps) {
  return (
    <label className="block min-w-0">
      <span className="mb-1 block text-xs text-text-muted">
        {providerText(t, "modelUnsupportedParams", "Unsupported params")}
      </span>
      <textarea
        value={newUnsupportedParams}
        onChange={(e) => setNewUnsupportedParams(e.target.value)}
        rows={2}
        placeholder="temperature, top_p"
        className="w-full resize-none rounded-lg border border-border bg-background px-3 py-2 text-xs font-mono text-text-main focus:outline-none focus:border-primary"
      />
    </label>
  );
}

function NumericCapabilityInput({ label, value, min, setter }: NumericCapabilityItem) {
  return (
    <label className="min-w-0 text-xs text-text-muted">
      {label}
      <input
        type="number"
        min={min}
        value={value}
        onChange={(e) => setter(e.target.value)}
        className="mt-1 w-full rounded-lg border border-border bg-background px-2 py-1.5 text-xs text-text-main focus:outline-none focus:border-primary"
      />
    </label>
  );
}

function buildCapabilityItems({
  newSupportsVision,
  newSupportsTools,
  newSupportsThinking,
  newSupportsXHigh,
  newSupportsMax,
  setNewSupportsVision,
  setNewSupportsTools,
  setNewSupportsThinking,
  setNewSupportsXHigh,
  setNewSupportsMax,
  t,
}: CustomModelCapabilitiesProps): CapabilityChoiceItem[] {
  return [
    {
      label: providerText(t, "modelCapabilityVision", "Vision"),
      value: newSupportsVision,
      setter: setNewSupportsVision,
    },
    {
      label: providerText(t, "modelCapabilityTools", "Tool calling"),
      value: newSupportsTools,
      setter: setNewSupportsTools,
    },
    {
      label: providerText(t, "modelCapabilityThinking", "Thinking"),
      value: newSupportsThinking,
      setter: setNewSupportsThinking,
    },
    {
      label: providerText(t, "modelCapabilityXHigh", "xhigh"),
      value: newSupportsXHigh,
      setter: setNewSupportsXHigh,
    },
    {
      label: providerText(t, "modelCapabilityMaxEffort", "max"),
      value: newSupportsMax,
      setter: setNewSupportsMax,
    },
  ];
}

function buildNumericCapabilityItems({
  newContextWindow,
  newMaxOutputTokens,
  newDefaultThinkingBudget,
  newThinkingBudgetCap,
  setNewContextWindow,
  setNewMaxOutputTokens,
  setNewDefaultThinkingBudget,
  setNewThinkingBudgetCap,
  t,
}: CustomModelCapabilitiesProps): NumericCapabilityItem[] {
  return [
    {
      label: providerText(t, "modelCapabilityContext", "Context"),
      value: newContextWindow,
      min: 1,
      setter: setNewContextWindow,
    },
    {
      label: providerText(t, "modelCapabilityMaxOutput", "Max output"),
      value: newMaxOutputTokens,
      min: 1,
      setter: setNewMaxOutputTokens,
    },
    {
      label: providerText(t, "modelCapabilityDefaultThinkingBudget", "Default thinking"),
      value: newDefaultThinkingBudget,
      min: 0,
      setter: setNewDefaultThinkingBudget,
    },
    {
      label: providerText(t, "modelCapabilityThinkingBudgetCap", "Max thinking"),
      value: newThinkingBudgetCap,
      min: 0,
      setter: setNewThinkingBudgetCap,
    },
  ];
}

function CustomModelCapabilities(props: CustomModelCapabilitiesProps) {
  const capabilityItems = buildCapabilityItems(props);
  const numericItems = buildNumericCapabilityItems(props);

  return (
    <div className="grid gap-3 rounded-lg border border-border bg-muted/40 p-3 sm:grid-cols-2 xl:grid-cols-3">
      {capabilityItems.map((item) => (
        <CapabilityChoiceControl key={item.label} {...item} {...props.capabilityChoiceLabels} />
      ))}
      {numericItems.map((item) => (
        <NumericCapabilityInput key={item.label} {...item} />
      ))}
    </div>
  );
}

export default function AddCustomModelForm(props: AddCustomModelFormProps) {
  const t = useTranslations("providers");

  return (
    <div className="flex flex-col gap-3 mb-3">
      <CustomModelHeader {...props} t={t} />
      <CustomModelRouting {...props} t={t} />
      <CustomModelMetadata {...props} t={t} />
      <CustomModelCapabilities {...props} t={t} />
    </div>
  );
}
