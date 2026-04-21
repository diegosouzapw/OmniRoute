"use client";

import { useEffect, useMemo, useState } from "react";
import Modal from "./Modal";
import Button from "./Button";
import Input from "./Input";

type ImportField = {
  name: string;
  label: string;
  description?: string;
  type?: "text" | "textarea";
  required?: boolean;
  placeholder?: string;
};

type ImportInstructions = {
  title?: string;
  steps?: string[];
};

type ImportTokenAuthModalProps = {
  isOpen: boolean;
  provider: string;
  providerInfo?: { name?: string } | null;
  onSuccess?: () => void;
  onClose: () => void;
};

function getErrorMessage(payload: unknown, fallback: string): string {
  if (!payload || typeof payload !== "object") return fallback;

  const root = payload as Record<string, unknown>;
  if (typeof root.error === "string" && root.error.trim()) return root.error;

  if (root.error && typeof root.error === "object" && !Array.isArray(root.error)) {
    const nested = root.error as Record<string, unknown>;
    if (typeof nested.message === "string" && nested.message.trim()) return nested.message;
    if (Array.isArray(nested.details) && nested.details.length > 0) {
      const messages = nested.details
        .map((detail) =>
          detail &&
          typeof detail === "object" &&
          typeof (detail as Record<string, unknown>).message === "string"
            ? String((detail as Record<string, unknown>).message)
            : null
        )
        .filter(Boolean);
      if (messages.length > 0) return messages.join("; ");
    }
  }

  return fallback;
}

export default function ImportTokenAuthModal({
  isOpen,
  provider,
  providerInfo,
  onSuccess,
  onClose,
}: ImportTokenAuthModalProps) {
  const [loading, setLoading] = useState(false);
  const [importing, setImporting] = useState(false);
  const [autoDetecting, setAutoDetecting] = useState(false);
  const [autoDetectedSource, setAutoDetectedSource] = useState<string | null>(null);
  const [autoDetectNote, setAutoDetectNote] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [instructions, setInstructions] = useState<ImportInstructions | null>(null);
  const [fields, setFields] = useState<ImportField[]>([]);
  const [formData, setFormData] = useState<Record<string, string>>({});

  useEffect(() => {
    if (!isOpen) return;

    let cancelled = false;
    setLoading(true);
    setError(null);
    setAutoDetectedSource(null);
    setAutoDetectNote(null);

    fetch(`/api/oauth/${provider}/import`)
      .then(async (response) => {
        const payload = await response.json().catch(() => ({}));
        if (!response.ok) {
          throw new Error(getErrorMessage(payload, "Failed to load import instructions"));
        }
        if (cancelled) return;

        const nextFields = Array.isArray(payload.requiredFields)
          ? (payload.requiredFields as ImportField[])
          : [];
        const nextFormData: Record<string, string> = {};
        for (const field of nextFields) {
          nextFormData[field.name] = "";
        }

        setInstructions(payload.instructions || null);
        setFields(nextFields);
        setFormData(nextFormData);

        setAutoDetecting(true);
        fetch(`/api/oauth/${provider}/auto-import`)
          .then(async (autoResponse) => {
            if (autoResponse.status === 404) return null;

            const autoPayload = await autoResponse.json().catch(() => ({}));
            if (!autoResponse.ok) {
              throw new Error(getErrorMessage(autoPayload, "Failed to auto-detect local session"));
            }
            return autoPayload as Record<string, unknown> | null;
          })
          .then((autoPayload) => {
            if (cancelled || !autoPayload || autoPayload.found !== true) return;

            setFormData((current) => {
              const next = { ...current };
              for (const field of nextFields) {
                const autoValue = autoPayload[field.name];
                if (typeof autoValue === "string" && autoValue.trim()) {
                  next[field.name] = autoValue;
                }
              }
              return next;
            });

            if (typeof autoPayload.source === "string" && autoPayload.source.trim()) {
              setAutoDetectedSource(autoPayload.source);
            }
            if (typeof autoPayload.note === "string" && autoPayload.note.trim()) {
              setAutoDetectNote(autoPayload.note);
            }
          })
          .catch((autoError) => {
            if (!cancelled) {
              setAutoDetectNote(autoError instanceof Error ? autoError.message : String(autoError));
            }
          })
          .finally(() => {
            if (!cancelled) setAutoDetecting(false);
          });
      })
      .catch((nextError) => {
        if (!cancelled) {
          setError(nextError instanceof Error ? nextError.message : String(nextError));
        }
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [isOpen, provider]);

  const canSubmit = useMemo(() => {
    if (loading || importing || fields.length === 0) return false;
    return fields.every((field) => {
      if (field.required === false) return true;
      return (formData[field.name] || "").trim().length > 0;
    });
  }, [fields, formData, importing, loading]);

  const handleSubmit = async () => {
    setImporting(true);
    setError(null);

    try {
      const body = Object.fromEntries(
        Object.entries(formData)
          .map(([key, value]) => [key, value.trim()])
          .filter(([, value]) => value.length > 0)
      );

      const response = await fetch(`/api/oauth/${provider}/import`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      const payload = await response.json().catch(() => ({}));
      if (!response.ok) {
        throw new Error(getErrorMessage(payload, "Import failed"));
      }

      onSuccess?.();
      onClose();
    } catch (nextError) {
      setError(nextError instanceof Error ? nextError.message : String(nextError));
    } finally {
      setImporting(false);
    }
  };

  const title = providerInfo?.name ? `Import ${providerInfo.name}` : "Import session";

  return (
    <Modal isOpen={isOpen} title={title} onClose={onClose} size="lg">
      <div className="flex flex-col gap-4">
        {loading && <p className="text-sm text-text-muted">Loading import instructions...</p>}

        {!loading && instructions?.title && (
          <div className="rounded-lg border border-border bg-bg-secondary/40 p-3">
            <p className="text-sm font-medium text-text-main">{instructions.title}</p>
            {Array.isArray(instructions.steps) && instructions.steps.length > 0 && (
              <ol className="mt-2 list-decimal space-y-1 pl-5 text-sm text-text-muted">
                {instructions.steps.map((step) => (
                  <li key={step}>{step}</li>
                ))}
              </ol>
            )}
          </div>
        )}

        {!loading && autoDetecting && (
          <div className="rounded-lg border border-sky-200 bg-sky-50 p-3 text-sm text-sky-700 dark:border-sky-900/50 dark:bg-sky-950/30 dark:text-sky-300">
            Trying to detect a local session automatically...
          </div>
        )}

        {!loading && autoDetectedSource && (
          <div className="rounded-lg border border-emerald-200 bg-emerald-50 p-3 text-sm text-emerald-700 dark:border-emerald-900/50 dark:bg-emerald-950/30 dark:text-emerald-300">
            Local session detected from <span className="font-mono">{autoDetectedSource}</span>.
          </div>
        )}

        {!loading && autoDetectNote && !error && (
          <div className="rounded-lg border border-amber-200 bg-amber-50 p-3 text-sm text-amber-700 dark:border-amber-900/50 dark:bg-amber-950/30 dark:text-amber-300">
            {autoDetectNote}
          </div>
        )}

        {!loading &&
          fields.map((field) => (
            <div key={field.name} className="flex flex-col gap-2">
              <label className="text-sm font-medium text-text-main">
                {field.label}
                {field.required === false ? null : <span className="ml-1 text-red-500">*</span>}
              </label>
              {field.description ? (
                <p className="text-xs text-text-muted">{field.description}</p>
              ) : null}
              {field.type === "textarea" ? (
                <textarea
                  value={formData[field.name] || ""}
                  onChange={(event) =>
                    setFormData((current) => ({
                      ...current,
                      [field.name]: event.target.value,
                    }))
                  }
                  rows={4}
                  placeholder={field.placeholder || ""}
                  className="w-full rounded-lg border border-border bg-background px-3 py-2 font-mono text-sm focus:outline-none focus:border-primary resize-y"
                />
              ) : (
                <Input
                  value={formData[field.name] || ""}
                  onChange={(event) =>
                    setFormData((current) => ({
                      ...current,
                      [field.name]: event.target.value,
                    }))
                  }
                  placeholder={field.placeholder || ""}
                  className="font-mono text-sm"
                />
              )}
            </div>
          ))}

        {error ? (
          <div className="rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700 dark:border-red-900/50 dark:bg-red-950/30 dark:text-red-300">
            {error}
          </div>
        ) : null}

        <div className="flex gap-2">
          <Button onClick={handleSubmit} disabled={!canSubmit} fullWidth>
            {importing ? "Importing..." : "Import session"}
          </Button>
          <Button onClick={onClose} variant="ghost" fullWidth disabled={importing}>
            Cancel
          </Button>
        </div>
      </div>
    </Modal>
  );
}
