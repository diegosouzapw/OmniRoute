import { useState } from "react";
import { Card, Input, Select, Button } from "@/shared/components";
import { useTranslations } from "next-intl";

interface CustomCliCardProps {
  availableModels: { value: string; label: string; provider: string }[];
  baseUrl: string;
  apiKeys: { key: string; name: string }[];
}

export function CustomCliCard({ availableModels, baseUrl, apiKeys }: CustomCliCardProps) {
  const t = useTranslations("cliTools");
  const [selectedModel, setSelectedModel] = useState(availableModels[0]?.value || "");
  const [selectedKey, setSelectedKey] = useState(apiKeys[0]?.key || "");

  const codeSnippet = `export OPENAI_BASE_URL="${baseUrl}/v1"
export OPENAI_API_KEY="${selectedKey || "YOUR_OMNIROUTE_KEY"}"
export OPENAI_MODEL_NAME="${selectedModel || "gpt-4o"}"`;

  return (
    <Card className="p-6 flex flex-col gap-4 border-dashed border-2 border-primary/40">
      <div className="flex items-center gap-3 border-b border-border pb-4">
        <span className="material-symbols-outlined text-3xl text-primary">terminal</span>
        <div>
          <h3 className="font-bold text-lg">{t("custom")}</h3>
          <p className="text-sm text-text-muted">{t("toolUseCases.custom")}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="text-xs text-text-muted">Target Model to Route To</label>
          <Select value={selectedModel} onChange={(e) => setSelectedModel(e.target.value)}>
            {availableModels.map((m) => (
              <option key={m.value} value={m.value}>
                {m.label}
              </option>
            ))}
          </Select>
        </div>
        <div>
          <label className="text-xs text-text-muted">OmniRoute API Key (Auth)</label>
          <Select value={selectedKey} onChange={(e) => setSelectedKey(e.target.value)}>
            <option value="">-- Choose Key --</option>
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
            Copy
          </Button>
        </div>
        <pre className="text-sm text-green-400 overflow-x-auto font-mono">{codeSnippet}</pre>
      </div>
    </Card>
  );
}
