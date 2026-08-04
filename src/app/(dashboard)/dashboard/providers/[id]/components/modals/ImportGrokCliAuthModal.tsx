"use client";
import { useState } from "react";
import { useTranslations } from "next-intl";
import { useNotificationStore } from "@/store/notificationStore";
import { Button, Modal } from "@/shared/components";

interface ImportGrokCliAuthModalProps {
  onClose: () => void;
  onSuccess: () => void;
}

function parseGrokJson(json: unknown): {
  valid: boolean;
  email: string | null;
  hasRefreshToken: boolean;
} {
  try {
    const doc = json && typeof json === "object" ? (json as Record<string, unknown>) : null;
    if (!doc) return { valid: false, email: null, hasRefreshToken: false };

    const entries = Object.values(doc);
    for (const entry of entries) {
      if (entry && typeof entry === "object" && "key" in entry) {
        const obj = entry as Record<string, unknown>;
        const key = typeof obj.key === "string" ? obj.key : null;
        const email = typeof obj.email === "string" ? obj.email : null;
        const hasRefreshToken =
          typeof obj.refresh_token === "string" && obj.refresh_token.length > 0;
        if (key && key.startsWith("eyJ")) {
          return { valid: true, email, hasRefreshToken };
        }
      }
    }
    return { valid: false, email: null, hasRefreshToken: false };
  } catch {
    return { valid: false, email: null, hasRefreshToken: false };
  }
}

export default function ImportGrokCliAuthModal({
  onClose,
  onSuccess,
}: ImportGrokCliAuthModalProps) {
  const notify = useNotificationStore();
  const t = useTranslations("providers");
  const [tab, setTab] = useState<"upload" | "paste">("upload");
  const [parsedJson, setParsedJson] = useState<unknown>(null);
  const [detectedEmail, setDetectedEmail] = useState<string | null>(null);
  const [hasRefreshToken, setHasRefreshToken] = useState(false);
  const [parseError, setParseError] = useState<string | null>(null);
  const [pasteText, setPasteText] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function handlePreview(json: unknown) {
    setParseError(null);
    setDetectedEmail(null);
    setParsedJson(null);
    setHasRefreshToken(false);
    const result = parseGrokJson(json);
    if (!result.valid) {
      setParseError(t("grokInvalidAuth"));
      return;
    }
    setDetectedEmail(result.email);
    setHasRefreshToken(result.hasRefreshToken);
    setParsedJson(json);
  }

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      try {
        handlePreview(JSON.parse(ev.target?.result as string));
      } catch {
        setParseError(t("grokParseFailed"));
      }
    };
    reader.readAsText(file);
  }

  function handlePasteChange(text: string) {
    setPasteText(text);
    if (!text.trim()) {
      setParsedJson(null);
      setParseError(null);
      setDetectedEmail(null);
      setHasRefreshToken(false);
      return;
    }
    try {
      handlePreview(JSON.parse(text));
    } catch {
      setParseError(t("grokParseFailed"));
      setParsedJson(null);
    }
  }

  async function handleSubmit() {
    if (!parsedJson) return;
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/oauth/grok-cli/import-token", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token: parsedJson }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setError(data.error || t("grokImportFailed"));
        return;
      }
      notify.success(t("grokImportSuccess"));
      onSuccess();
    } catch {
      setError(t("grokImportFailed"));
    } finally {
      setLoading(false);
    }
  }

  return (
    <Modal isOpen onClose={onClose} title={t("grokImportTitle")} size="md">
      <div className="flex flex-col gap-4">
        <p className="text-sm text-text-muted">
          {t.rich("grokImportDescription", {
            authPath: (chunks) => <code>{chunks}</code>,
            command: (chunks) => <code>{chunks}</code>,
          })}
        </p>

        {/* Tab toggle */}
        <div className="flex gap-2 border-b border-border pb-3">
          <button
            className={`text-sm px-3 py-1 rounded-t ${tab === "upload" ? "font-semibold border-b-2 border-primary text-primary" : "text-text-muted"}`}
            onClick={() => setTab("upload")}
          >
            {t("grokUploadFile")}
          </button>
          <button
            className={`text-sm px-3 py-1 rounded-t ${tab === "paste" ? "font-semibold border-b-2 border-primary text-primary" : "text-text-muted"}`}
            onClick={() => setTab("paste")}
          >
            {t("grokPasteJson")}
          </button>
        </div>

        {/* Upload tab */}
        {tab === "upload" && (
          <div className="flex flex-col gap-3">
            <input
              type="file"
              accept=".json"
              onChange={handleFileChange}
              className="text-sm text-text-muted file:mr-3 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-medium file:bg-primary/10 file:text-primary hover:file:bg-primary/20 cursor-pointer"
            />
          </div>
        )}

        {/* Paste tab */}
        {tab === "paste" && (
          <div className="flex flex-col gap-3">
            <textarea
              className="w-full h-32 p-3 text-sm font-mono bg-input border border-border rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder='{"https://auth.x.ai::clientId": {"key": "eyJ...", ...}}'
              value={pasteText}
              onChange={(e) => handlePasteChange(e.target.value)}
            />
          </div>
        )}

        {/* Parse error */}
        {parseError && <p className="text-sm text-red-500">{parseError}</p>}

        {/* Detected info */}
        {parsedJson && (
          <div className="flex flex-col gap-3">
            <div className="bg-green-500/10 border border-green-500/20 rounded-md p-3">
              <p className="text-sm text-green-400">
                {t("grokValidToken")}
                {detectedEmail ? ` (${detectedEmail})` : ""}
              </p>
              {hasRefreshToken && (
                <p className="text-xs text-green-500 mt-1">{t("grokRefreshIncluded")}</p>
              )}
              {!hasRefreshToken && (
                <p className="text-xs text-amber-400 mt-1">{t("grokRefreshMissing")}</p>
              )}
            </div>
            <input
              type="text"
              placeholder={t("grokConnectionName")}
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-2 text-sm bg-input border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
        )}

        {/* Submit error */}
        {error && <p className="text-sm text-red-500">{error}</p>}

        {/* Buttons */}
        <div className="flex gap-2">
          <Button onClick={handleSubmit} fullWidth disabled={!parsedJson || loading}>
            {loading ? t("grokSaving") : t("grokSaveConnection")}
          </Button>
          <Button onClick={onClose} variant="ghost" fullWidth>
            {t("cancel")}
          </Button>
        </div>
      </div>
    </Modal>
  );
}
