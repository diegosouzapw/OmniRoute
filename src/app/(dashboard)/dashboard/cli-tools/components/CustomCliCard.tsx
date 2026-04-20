import { useMemo, useState } from "react";
import { Card, Input, Select, Button } from "@/shared/components";
import { useTranslations } from "next-intl";

interface CustomCliCardProps {
  availableModels: { value: string; label: string; provider: string }[];
  baseUrl: string;
  apiKeys: { key: string; name: string }[];
}

export default function CustomCliCard({ availableModels, baseUrl, apiKeys }: CustomCliCardProps) {
  const t = useTranslations("cliTools");
  const [customName, setCustomName] = useState("");
  const [selectedModel, setSelectedModel] = useState(availableModels[0]?.value || "");
  const [selectedKey, setSelectedKey] = useState(apiKeys[0]?.key || "");
  const resolvedSelectedModel = useMemo(() => {
    if (selectedModel && availableModels.some((model) => model.value === selectedModel)) {
      return selectedModel;
    }

    return availableModels[0]?.value || "";
  }, [availableModels, selectedModel]);
  const resolvedSelectedKey = useMemo(() => {
    if (selectedKey && apiKeys.some((key) => key.key === selectedKey)) {
      return selectedKey;
    }

    return apiKeys[0]?.key || "";
  }, [apiKeys, selectedKey]);

  const baseUrlWithApi = `${baseUrl}/v1`;
  const chatCompletionsEndpoint = `${baseUrlWithApi}/chat/completions`;
  const displayName = customName.trim() || t("custom");
  const codeSnippet = useMemo(
    () => `# ${displayName}
export OPENAI_BASE_URL="${baseUrlWithApi}"
export OPENAI_API_KEY="${resolvedSelectedKey || "YOUR_OMNIROUTE_KEY"}"
export OPENAI_MODEL_NAME="${resolvedSelectedModel || "gpt-4o"}"

# ${t("customEndpointLabel")}: ${chatCompletionsEndpoint}`,
    [
      baseUrlWithApi,
      chatCompletionsEndpoint,
      displayName,
      resolvedSelectedKey,
      resolvedSelectedModel,
      t,
    ]
  );

  return (
    <Card className="p-6 flex flex-col gap-4 border-dashed border-2 border-primary/40">
      <div className="flex items-center gap-3 border-b border-border pb-4">
        <span className="material-symbols-outlined text-3xl text-primary">terminal</span>
        <div>
          <h3 className="font-bold text-lg">{t("custom")}</h3>
          <p className="text-sm text-text-muted">{t("toolUseCases.custom")}</p>
        </div>
      </div>

      <div className="rounded-xl border border-border/40 bg-surface/20 p-4 text-sm text-text-muted">
        <p>{t("customSetupHint")}</p>
        <p className="mt-2 font-mono text-xs text-primary/80">
          {t("customEndpointLabel")}: {chatCompletionsEndpoint}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Input
          label={t("customCliNameLabel")}
          placeholder={t("customCliNamePlaceholder")}
          value={customName}
          onChange={(e) => setCustomName(e.target.value)}
        />
        <div>
          <label className="text-xs text-text-muted">{t("customTargetModelLabel")}</label>
          <Select value={resolvedSelectedModel} onChange={(e) => setSelectedModel(e.target.value)}>
            {availableModels.map((m) => (
              <option key={m.value} value={m.value}>
                {m.label}
              </option>
            ))}
          </Select>
        </div>
        <div>
          <label className="text-xs text-text-muted">{t("customApiKeyLabel")}</label>
          <Select value={resolvedSelectedKey} onChange={(e) => setSelectedKey(e.target.value)}>
            <option value="">{t("chooseKeyPlaceholder")}</option>
            {apiKeys.map((k) => (
              <option key={k.key} value={k.key}>
                {k.name}
              </option>
            ))}
          </Select>
        </div>
      </div>

      <div className="bg-black/90 p-4 rounded-xl relative mt-2 group">
        <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <Button
            size="sm"
            variant="secondary"
            onClick={() => navigator.clipboard.writeText(codeSnippet)}
          >
            {t("copy")}
          </Button>
        </div>
        <pre className="text-sm text-green-400 overflow-x-auto font-mono">{codeSnippet}</pre>
      </div>
    </Card>
  );
}
