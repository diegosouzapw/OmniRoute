"use client";

import { useEffect, useId, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import Button from "./Button";
import Modal, { TALL_MODAL_PROPS } from "./Modal";

type Model = { id: string; name?: string };
type Props = {
  connectionId: string;
  disabled?: boolean;
  compact?: boolean;
  onSent?: () => void;
};

async function readResponse(response: Response) {
  const data = await response.json();
  if (!response.ok) throw new Error(data.error?.message || data.error || response.statusText);
  return data;
}

export default function ConnectionTestButton({ connectionId, disabled, compact, onSent }: Props) {
  const t = useTranslations("connectionTest");
  const inputId = useId();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [busy, setBusy] = useState(false);
  const inFlight = useRef(false);
  const [models, setModels] = useState<Model[]>([]);
  const [modelId, setModelId] = useState("");
  const [savedModelId, setSavedModelId] = useState("");
  const [prompt, setPrompt] = useState("");
  const [answer, setAnswer] = useState("");
  const [error, setError] = useState("");
  const [saved, setSaved] = useState(false);
  const endpoint = `/api/providers/${encodeURIComponent(connectionId)}/test-message`;

  useEffect(() => {
    if (!open) return;
    const controller = new AbortController();
    setLoading(true);
    setError("");
    setAnswer("");
    setSaved(false);
    Promise.all([
      fetch(endpoint, { signal: controller.signal }).then(readResponse),
      fetch(
        `/api/providers/${encodeURIComponent(connectionId)}/models?chatOnly=true&refresh=false`,
        {
          signal: controller.signal,
        }
      ).then(readResponse),
    ])
      .then(([config, catalog]) => {
        if (controller.signal.aborted) return;
        const available = (catalog.models || []).filter(
          (model: Model) => typeof model.id === "string"
        );
        setModels(available);
        setModelId(config.modelId || "");
        setSavedModelId(config.modelId || "");
        setPrompt(config.prompt);
      })
      .catch((failure) => {
        if (!controller.signal.aborted) setError(failure.message || t("failed"));
      })
      .finally(() => {
        if (!controller.signal.aborted) setLoading(false);
      });
    return () => controller.abort();
  }, [open, connectionId, endpoint, t]);

  async function act(send: boolean) {
    if (inFlight.current || !modelId || loading || (send && disabled)) return;
    inFlight.current = true;
    setBusy(true);
    setError("");
    setSaved(false);
    if (send) setAnswer("");
    try {
      await readResponse(
        await fetch(endpoint, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ modelId }),
        })
      );
      setSavedModelId(modelId);
      setSaved(true);
      if (send) {
        const result = await readResponse(await fetch(endpoint, { method: "POST" }));
        setPrompt(result.prompt);
        setAnswer(result.responseText);
        onSent?.();
      }
    } catch (failure) {
      setError(failure instanceof Error ? failure.message : t("failed"));
    } finally {
      inFlight.current = false;
      setBusy(false);
    }
  }

  const available = models.some((model) => model.id === modelId);
  return (
    <>
      <Button
        size="sm"
        variant="ghost"
        icon="send"
        title={t("title")}
        aria-label={t("title")}
        className={compact ? "!px-1" : "!px-2"}
        onClick={(event) => {
          event.stopPropagation();
          setOpen(true);
        }}
      >
        {!compact && t("title")}
      </Button>
      {open && (
        <Modal
          {...TALL_MODAL_PROPS}
          isOpen
          onClose={() => {
            if (!busy) setOpen(false);
          }}
          title={t("title")}
          closeOnOverlay={!busy}
          showCloseButton={!busy}
        >
          <div className="space-y-4">
            <p className="text-sm text-text-muted">{t("description")}</p>
            {loading ? (
              <p role="status">{t("loading")}</p>
            ) : (
              <>
                <label htmlFor={inputId} className="block text-sm font-medium">
                  {t("model")}
                </label>
                <select
                  id={inputId}
                  value={modelId}
                  disabled={busy}
                  className="w-full rounded-lg border border-border bg-bg-main p-2 text-sm"
                  onChange={(event) => {
                    setModelId(event.target.value);
                    setSaved(false);
                    setAnswer("");
                  }}
                >
                  <option value="">{t("chooseModel")}</option>
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
                {!models.length && <p className="text-sm text-text-muted">{t("noModels")}</p>}
                <div>
                  <p className="text-sm font-medium">{t("message")}</p>
                  <p className="mt-1 whitespace-pre-wrap break-words rounded-lg bg-black/5 p-3 text-sm dark:bg-white/5">
                    {prompt}
                  </p>
                  <a href="/dashboard/settings/ai" className="text-xs text-primary hover:underline">
                    {t("settingsLink")}
                  </a>
                </div>
                {disabled && <p className="text-sm text-amber-500">{t("activateFirst")}</p>}
                <div className="flex flex-wrap gap-2">
                  <Button
                    variant="secondary"
                    disabled={busy || !available || modelId === savedModelId}
                    onClick={() => act(false)}
                  >
                    {t("saveModel")}
                  </Button>
                  <Button
                    icon="send"
                    loading={busy}
                    disabled={disabled || !available}
                    onClick={() => act(true)}
                  >
                    {t("send")}
                  </Button>
                </div>
                {saved && (
                  <p role="status" className="text-xs text-green-600">
                    {t("saved")}
                  </p>
                )}
              </>
            )}
            {error && (
              <p role="alert" className="whitespace-pre-wrap break-words text-sm text-red-500">
                {error}
              </p>
            )}
            {answer && (
              <div role="status">
                <p className="text-sm font-medium">{t("answer")}</p>
                <pre className="mt-1 max-h-64 overflow-auto whitespace-pre-wrap break-words rounded-lg bg-black/5 p-3 text-sm dark:bg-white/5">
                  {answer}
                </pre>
              </div>
            )}
          </div>
        </Modal>
      )}
    </>
  );
}
