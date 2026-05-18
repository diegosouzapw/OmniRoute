"use client";

import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import Modal from "./Modal";
import Button from "./Button";
import Input from "./Input";

type CursorAuthModalProps = {
  isOpen: boolean;
  onSuccess?: () => void;
  onClose: () => void;
  reauthConnection?: unknown;
};

export default function CursorAuthModal({
  isOpen,
  onSuccess,
  onClose,
  reauthConnection: _,
}: CursorAuthModalProps) {
  const t = useTranslations("cursorAuthModal");

  // ── Tab state ─────────────────────────────────────────────────────────────
  const [mode, setMode] = useState<"ide" | "apikey">("ide");

  // ── IDE import state ──────────────────────────────────────────────────────
  const [accessToken, setAccessToken] = useState("");
  const [machineId, setMachineId] = useState("");
  const [autoDetecting, setAutoDetecting] = useState(false);
  const [autoDetected, setAutoDetected] = useState(false);

  // ── API Key import state ──────────────────────────────────────────────────
  const [apiKey, setApiKey] = useState("");
  const [label, setLabel] = useState("");

  // ── Shared state ──────────────────────────────────────────────────────────
  const [error, setError] = useState<string | null>(null);
  const [importing, setImporting] = useState(false);

  // Auto-detect tokens when modal opens (IDE mode only — runs once)
  useEffect(() => {
    if (!isOpen) return;

    const autoDetect = async () => {
      setAutoDetecting(true);
      setError(null);
      setAutoDetected(false);

      try {
        const res = await fetch("/api/oauth/cursor/auto-import");
        const data = await res.json();

        if (data.found) {
          setAccessToken(data.accessToken);
          setMachineId(data.machineId || "");
          setAutoDetected(true);
        } else {
          setError(data.error || t("errorAutoDetect"));
        }
      } catch (err) {
        setError(t("errorAutoDetectFailed"));
      } finally {
        setAutoDetecting(false);
      }
    };

    autoDetect();
  }, [isOpen]);

  // Reset form state on mode switch
  const switchMode = (newMode: "ide" | "apikey") => {
    setMode(newMode);
    setError(null);
  };

  // ── IDE import handler ────────────────────────────────────────────────────
  const handleImportToken = async () => {
    if (!accessToken.trim()) {
      setError(t("errorEnterToken"));
      return;
    }

    setImporting(true);
    setError(null);

    try {
      const body: Record<string, string> = { accessToken: accessToken.trim() };
      if (machineId.trim()) body.machineId = machineId.trim();

      const res = await fetch("/api/oauth/cursor/import", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || t("errorImportFailed"));
      }

      onSuccess?.();
      onClose();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setImporting(false);
    }
  };

  // ── API Key import handler ────────────────────────────────────────────────
  const handleImportApiKey = async () => {
    const key = apiKey.trim();
    if (!key) {
      setError(t("errorApiKeyEmpty"));
      return;
    }
    if (!key.startsWith("crsr_")) {
      setError(t("errorApiKeyFormat"));
      return;
    }

    setImporting(true);
    setError(null);

    try {
      const body: Record<string, string> = { apiKey: key };
      if (label.trim()) body.label = label.trim();

      const res = await fetch("/api/oauth/cursor/import-apikey", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || t("errorImportFailed"));
      }

      onSuccess?.();
      onClose();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setImporting(false);
    }
  };

  return (
    <Modal isOpen={isOpen} title={t("title")} onClose={onClose}>
      <div className="flex flex-col gap-4">
        {/* ── Tab switcher ──────────────────────────────────────────────── */}
        <div className="flex rounded-lg bg-surface p-1">
          <button
            type="button"
            className={`flex-1 px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
              mode === "ide"
                ? "bg-primary text-white shadow-sm"
                : "text-text-muted hover:text-text-main"
            }`}
            onClick={() => switchMode("ide")}
          >
            {t("tabIde")}
          </button>
          <button
            type="button"
            className={`flex-1 px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
              mode === "apikey"
                ? "bg-primary text-white shadow-sm"
                : "text-text-muted hover:text-text-main"
            }`}
            onClick={() => switchMode("apikey")}
          >
            {t("tabApiKey")}
          </button>
        </div>

        {/* ── IDE mode ──────────────────────────────────────────────────── */}
        {mode === "ide" && (
          <>
            {/* Auto-detecting state */}
            {autoDetecting && (
              <div className="text-center py-6">
                <div className="size-16 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                  <span className="material-symbols-outlined text-3xl text-primary animate-spin">
                    progress_activity
                  </span>
                </div>
                <h3 className="text-lg font-semibold mb-2">{t("autoDetecting")}</h3>
                <p className="text-sm text-text-muted">{t("readingFromCursor")}</p>
              </div>
            )}

            {/* Form (shown after auto-detect completes) */}
            {!autoDetecting && (
              <>
                {/* Success message if auto-detected */}
                {autoDetected && (
                  <div className="bg-green-50 dark:bg-green-900/20 p-3 rounded-lg border border-green-200 dark:border-green-800">
                    <div className="flex gap-2">
                      <span className="material-symbols-outlined text-green-600 dark:text-green-400">
                        check_circle
                      </span>
                      <p className="text-sm text-green-800 dark:text-green-200">
                        {t("tokensAutoDetected")}
                      </p>
                    </div>
                  </div>
                )}

                {/* Info message if not auto-detected */}
                {!autoDetected && (
                  <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg border border-blue-200 dark:border-blue-800">
                    <div className="flex gap-2">
                      <span className="material-symbols-outlined text-blue-600 dark:text-blue-400">
                        info
                      </span>
                      <p className="text-sm text-blue-800 dark:text-blue-200">
                        {t("cursorNotDetected")}
                      </p>
                    </div>
                  </div>
                )}

                {/* Access Token Input */}
                <div>
                  <label className="block text-sm font-medium mb-2">
                    {t("accessToken")} <span className="text-red-500">{t("required")}</span>
                  </label>
                  <textarea
                    value={accessToken}
                    onChange={(e) => setAccessToken(e.target.value)}
                    placeholder={t("accessTokenPlaceholder")}
                    rows={3}
                    className="w-full px-3 py-2 text-sm font-mono border border-border rounded-lg bg-background focus:outline-none focus:border-primary resize-none"
                  />
                </div>

                {/* Machine ID Input */}
                <div>
                  <label className="block text-sm font-medium mb-2">
                    {t("machineId")}{" "}
                    <span className="text-text-muted text-xs">{t("optional")}</span>
                  </label>
                  <Input
                    value={machineId}
                    onChange={(e) => setMachineId(e.target.value)}
                    placeholder={t("machineIdPlaceholder")}
                    className="font-mono text-sm"
                  />
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2">
                  <Button
                    onClick={handleImportToken}
                    fullWidth
                    disabled={importing || !accessToken.trim()}
                  >
                    {importing ? t("importing") : t("importToken")}
                  </Button>
                  <Button onClick={onClose} variant="ghost" fullWidth>
                    {t("cancel")}
                  </Button>
                </div>
              </>
            )}
          </>
        )}

        {/* ── API Key mode ──────────────────────────────────────────────── */}
        {mode === "apikey" && (
          <>
            <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg border border-blue-200 dark:border-blue-800">
              <div className="flex gap-2">
                <span className="material-symbols-outlined text-blue-600 dark:text-blue-400">
                  info
                </span>
                <p className="text-sm text-blue-800 dark:text-blue-200">{t("apiKeyInfo")}</p>
              </div>
            </div>

            {/* API Key Input */}
            <div>
              <label className="block text-sm font-medium mb-2">
                {t("apiKeyField")} <span className="text-red-500">{t("required")}</span>
              </label>
              <textarea
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                placeholder={t("apiKeyPlaceholder")}
                rows={2}
                className="w-full px-3 py-2 text-sm font-mono border border-border rounded-lg bg-background focus:outline-none focus:border-primary resize-none"
              />
            </div>

            {/* Label Input */}
            <div>
              <label className="block text-sm font-medium mb-2">
                {t("label")} <span className="text-text-muted text-xs">{t("optional")}</span>
              </label>
              <Input
                value={label}
                onChange={(e) => setLabel(e.target.value)}
                placeholder={t("labelPlaceholder")}
                className="text-sm"
              />
            </div>

            {/* Error Display */}
            {error && (
              <div className="bg-red-50 dark:bg-red-900/20 p-3 rounded-lg border border-red-200 dark:border-red-800">
                <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex gap-2">
              <Button onClick={handleImportApiKey} fullWidth disabled={importing || !apiKey.trim()}>
                {importing ? t("importing") : t("importApiKey")}
              </Button>
              <Button onClick={onClose} variant="ghost" fullWidth>
                {t("cancel")}
              </Button>
            </div>
          </>
        )}

        {/* Error Display (IDE mode) */}
        {mode === "ide" && !autoDetecting && error && (
          <div className="bg-red-50 dark:bg-red-900/20 p-3 rounded-lg border border-red-200 dark:border-red-800">
            <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
          </div>
        )}
      </div>
    </Modal>
  );
}
