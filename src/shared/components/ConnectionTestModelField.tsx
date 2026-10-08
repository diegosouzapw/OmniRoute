"use client";

import { useEffect, useId, useState } from "react";
import { useTranslations } from "next-intl";

type Model = { id: string; name?: string };

/** Draft-only field: the enclosing connection form owns persistence. */
export default function ConnectionTestModelField({
  connectionId,
  disabled,
  onChange,
}: {
  connectionId: string;
  disabled?: boolean;
  onChange: (modelId: string) => void;
}) {
  const t = useTranslations("connectionTest");
  const id = useId();
  const [modelId, setModelId] = useState("");
  const [models, setModels] = useState<Model[]>([]);
  const [loading, setLoading] = useState(true);
  const [failed, setFailed] = useState(false);
  useEffect(() => {
    const controller = new AbortController();
    const base = `/api/providers/${encodeURIComponent(connectionId)}`;
    const read = async (path: string) => {
      const response = await fetch(base + path, { signal: controller.signal });
      if (!response.ok) throw new Error("Model configuration unavailable");
      return response.json();
    };
    Promise.all([read("/test-message"), read("/models?chatOnly=true&refresh=false")])
      .then(([config, catalog]) => {
        if (controller.signal.aborted) return;
        setModelId(config.modelId || "");
        setModels((catalog.models || []).filter((model: Model) => typeof model.id === "string"));
      })
      .catch(() => {
        if (!controller.signal.aborted) setFailed(true);
      })
      .finally(() => {
        if (!controller.signal.aborted) setLoading(false);
      });
    return () => controller.abort();
  }, [connectionId]);
  const available = models.some((model) => model.id === modelId);
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-sm font-medium text-text-main">
        {t("defaultModel")}
      </label>
      <select
        id={id}
        value={modelId}
        disabled={disabled || loading || failed}
        className="w-full rounded-lg border border-border bg-bg-main p-2.5 text-sm disabled:opacity-50"
        onChange={(event) => {
          setModelId(event.target.value);
          onChange(event.target.value);
        }}
      >
        <option value="">{loading ? t("loading") : t("chooseModel")}</option>
        {modelId && !available && (
          <option value={modelId} disabled>
            {modelId} — {t("unavailable")}
          </option>
        )}
        {models.map((model) => (
          <option key={model.id} value={model.id}>
            {model.name || model.id}
          </option>
        ))}
      </select>
      <p className="mt-1 text-xs text-text-muted">{t("defaultModelHint")}</p>
      {failed && (
        <p role="alert" className="mt-1 text-xs text-red-500">
          {t("failed")}
        </p>
      )}
    </div>
  );
}
