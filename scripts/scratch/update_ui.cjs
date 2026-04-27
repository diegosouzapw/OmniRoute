const fs = require('fs');

const path = 'src/app/(dashboard)/dashboard/providers/[id]/page.tsx';
let content = fs.readFileSync(path, 'utf8');

// 1. Add ModelRowProps fields
content = content.replace(
  '  togglingHidden?: boolean;\n}',
  '  togglingHidden?: boolean;\n  onTestModel?: (modelId: string, fullModel: string) => Promise<void>;\n  testStatus?: "ok" | "error" | null;\n  testingModel?: boolean;\n}'
);

// 2. Add PassthroughModelRowProps fields
content = content.replace(
  '  togglingHidden?: boolean;\n}',
  '  togglingHidden?: boolean;\n  onTestModel?: (modelId: string, fullModel: string) => Promise<void>;\n  testStatus?: "ok" | "error" | null;\n  testingModel?: boolean;\n}'
);

// 3. Add PassthroughModelsSectionProps fields
content = content.replace(
  '  togglingModelId?: string | null;\n}',
  '  togglingModelId?: string | null;\n  onTestModel?: (modelId: string, fullModel: string) => Promise<void>;\n  modelTestStatus?: Record<string, "ok" | "error" | null>;\n  testingModelId?: string | null;\n}'
);

// 4. Add CompatibleModelsSectionProps fields
content = content.replace(
  '  togglingModelId?: string | null;\n}',
  '  togglingModelId?: string | null;\n  onTestModel?: (modelId: string, fullModel: string) => Promise<void>;\n  modelTestStatus?: Record<string, "ok" | "error" | null>;\n  testingModelId?: string | null;\n}'
);

// 5. Update ModelRow
content = content.replace(
  '  compatDisabled,\n  onToggleHidden,\n  togglingHidden,\n}: ModelRowProps) {',
  '  compatDisabled,\n  onToggleHidden,\n  togglingHidden,\n  onTestModel,\n  testStatus,\n  testingModel,\n}: ModelRowProps) {'
);
content = content.replace(
  '      <div className="flex shrink-0 items-center gap-1">',
  `      <div className="flex shrink-0 items-center gap-1">
        {onTestModel && (
          <button
            onClick={() => onTestModel(model.id, fullModel)}
            disabled={testingModel}
            className={\`rounded p-0.5 hover:bg-sidebar transition-colors disabled:opacity-40 disabled:cursor-not-allowed \${testStatus === "ok" ? "text-green-500" : testStatus === "error" ? "text-red-500" : "text-text-muted hover:text-primary"}\`}
            title={testingModel ? t("testingModel", "Testing...") : testStatus === "ok" ? "OK" : testStatus === "error" ? "Error" : t("testModel", "Test Model")}
          >
            {testingModel ? (
              <span className="material-symbols-outlined text-sm animate-spin">progress_activity</span>
            ) : testStatus === "ok" ? (
              <span className="material-symbols-outlined text-sm">check_circle</span>
            ) : testStatus === "error" ? (
              <span className="material-symbols-outlined text-sm">error</span>
            ) : (
              <span className="material-symbols-outlined text-sm">play_circle</span>
            )}
          </button>
        )}`
);

// 6. Update PassthroughModelRow
content = content.replace(
  '  compatDisabled,\n  onToggleHidden,\n  togglingHidden,\n}: PassthroughModelRowProps) {',
  '  compatDisabled,\n  onToggleHidden,\n  togglingHidden,\n  onTestModel,\n  testStatus,\n  testingModel,\n}: PassthroughModelRowProps) {'
);
content = content.replace(
  '      <div className="flex shrink-0 items-center gap-1 self-start">',
  `      <div className="flex shrink-0 items-center gap-1 self-start">
        {onTestModel && (
          <button
            onClick={() => onTestModel(modelId, fullModel)}
            disabled={testingModel}
            className={\`rounded p-0.5 hover:bg-sidebar transition-colors disabled:opacity-40 disabled:cursor-not-allowed \${testStatus === "ok" ? "text-green-500" : testStatus === "error" ? "text-red-500" : "text-text-muted hover:text-primary"}\`}
            title={testingModel ? t("testingModel", "Testing...") : testStatus === "ok" ? "OK" : testStatus === "error" ? "Error" : t("testModel", "Test Model")}
          >
            {testingModel ? (
              <span className="material-symbols-outlined text-sm animate-spin">progress_activity</span>
            ) : testStatus === "ok" ? (
              <span className="material-symbols-outlined text-sm">check_circle</span>
            ) : testStatus === "error" ? (
              <span className="material-symbols-outlined text-sm">error</span>
            ) : (
              <span className="material-symbols-outlined text-sm">play_circle</span>
            )}
          </button>
        )}`
);

// 7. Update PassthroughModelsSection component passing props down
content = content.replace(
  '  togglingModelId,\n}: PassthroughModelsSectionProps)',
  '  togglingModelId,\n  onTestModel,\n  modelTestStatus,\n  testingModelId,\n}: PassthroughModelsSectionProps)'
);
content = content.replace(
  '              saveModelCompatFlags={saveModelCompatFlags}\n              compatDisabled={compatSavingModelId === cm.id}',
  '              saveModelCompatFlags={saveModelCompatFlags}\n              compatDisabled={compatSavingModelId === cm.id}\n              onTestModel={onTestModel}\n              testStatus={modelTestStatus?.[cm.id] || null}\n              testingModel={testingModelId === cm.id}'
);
content = content.replace(
  '                compatDisabled={compatSavingModelId === alias}\n                onToggleHidden={onToggleHidden}',
  '                compatDisabled={compatSavingModelId === alias}\n                onToggleHidden={onToggleHidden}\n                onTestModel={onTestModel}\n                testStatus={modelTestStatus?.[alias] || null}\n                testingModel={testingModelId === alias}'
);

// 8. Update CompatibleModelsSection component passing props down
content = content.replace(
  '  togglingModelId,\n}: CompatibleModelsSectionProps) {',
  '  togglingModelId,\n  onTestModel,\n  modelTestStatus,\n  testingModelId,\n}: CompatibleModelsSectionProps) {'
);
content = content.replace(
  '              saveModelCompatFlags={saveModelCompatFlags}\n              compatDisabled={compatSavingModelId === cm.id}',
  '              saveModelCompatFlags={saveModelCompatFlags}\n              compatDisabled={compatSavingModelId === cm.id}\n              onTestModel={onTestModel}\n              testStatus={modelTestStatus?.[cm.id] || null}\n              testingModel={testingModelId === cm.id}'
);
content = content.replace(
  '                  compatDisabled={compatSavingModelId === model.id}\n                  onToggleHidden={(modelId, hidden)',
  '                  compatDisabled={compatSavingModelId === model.id}\n                  onTestModel={onTestModel}\n                  testStatus={modelTestStatus?.[model.id] || null}\n                  testingModel={testingModelId === model.id}\n                  onToggleHidden={(modelId, hidden)'
);

// 9. Update ProviderDetailPage
content = content.replace(
  '  const [togglingModelId, setTogglingModelId] = useState<string | null>(null);',
  '  const [togglingModelId, setTogglingModelId] = useState<string | null>(null);\n  const [testingModelId, setTestingModelId] = useState<string | null>(null);\n  const [modelTestStatus, setModelTestStatus] = useState<Record<string, "ok" | "error">>({});'
);

// Add the onTestModel function
content = content.replace(
  '  const handleSetAlias = async (modelId, alias, providerAliasOverride = providerAlias) => {',
  `  const onTestModel = async (modelId: string, fullModel: string) => {
    setTestingModelId(modelId);
    setModelTestStatus(prev => ({ ...prev, [modelId]: undefined }));
    try {
      const res = await fetch("/api/models/test", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ providerId: selectedConnection?.provider || providerNode?.id || providerId, modelId: fullModel })
      });
      const data = await res.json();
      if (res.ok && data.status === "ok") {
        notify.success(providerText(t, "testModelSuccess", \`Model \${modelId} is working. Latency: \${data.latencyMs}ms\`, { modelId, latencyMs: data.latencyMs }));
        setModelTestStatus(prev => ({ ...prev, [modelId]: "ok" }));
      } else {
        notify.error(data.error || "Model test failed");
        setModelTestStatus(prev => ({ ...prev, [modelId]: "error" }));
      }
    } catch (err) {
      notify.error("Network error testing model");
      setModelTestStatus(prev => ({ ...prev, [modelId]: "error" }));
    } finally {
      setTestingModelId(null);
    }
  };

  const handleSetAlias = async (modelId, alias, providerAliasOverride = providerAlias) => {`
);

// Pass to PassthroughModelsSection in ProviderDetailPage
content = content.replace(
  '            togglingModelId={togglingModelId}\n          />',
  '            togglingModelId={togglingModelId}\n            onTestModel={onTestModel}\n            modelTestStatus={modelTestStatus}\n            testingModelId={testingModelId}\n          />'
);

// Pass to CompatibleModelsSection in ProviderDetailPage
content = content.replace(
  '            togglingModelId={togglingModelId}\n          />',
  '            togglingModelId={togglingModelId}\n            onTestModel={onTestModel}\n            modelTestStatus={modelTestStatus}\n            testingModelId={testingModelId}\n          />'
);

// Pass to ModelRow in ProviderDetailPage (fallback/normal models list)
content = content.replace(
  '                togglingHidden={togglingModelId === model.id}\n              />',
  '                togglingHidden={togglingModelId === model.id}\n                onTestModel={onTestModel}\n                testStatus={modelTestStatus[model.id] || null}\n                testingModel={testingModelId === model.id}\n              />'
);

fs.writeFileSync(path, content);
console.log("Successfully updated page.tsx");
