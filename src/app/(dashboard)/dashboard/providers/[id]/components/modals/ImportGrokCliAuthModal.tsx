"use client";
import { useState } from "react";
import { useNotificationStore } from "@/store/notificationStore";
import { Button, Modal } from "@/shared/components";

interface ImportGrokCliAuthModalProps {
  onClose: () => void;
  onSuccess: () => void;
}

function extractTokenFromGrokJson(json: unknown): {
  valid: boolean;
  token: string | null;
  email: string | null;
} {
  try {
    const doc = json && typeof json === "object" ? (json as Record<string, unknown>) : null;
    if (!doc) return { valid: false, token: null, email: null };

    // Grok Build auth.json format:
    // { "https://auth.x.ai::clientId": { "key": "eyJ...", "sub": "...", "email": "..." } }
    const entries = Object.values(doc);
    for (const entry of entries) {
      if (entry && typeof entry === "object" && "key" in entry) {
        const obj = entry as Record<string, unknown>;
        const key = typeof obj.key === "string" ? obj.key : null;
        const email = typeof obj.email === "string" ? obj.email : null;
        if (key && key.startsWith("eyJ")) {
          return { valid: true, token: key, email };
        }
      }
    }
    return { valid: false, token: null, email: null };
  } catch {
    return { valid: false, token: null, email: null };
  }
}

export default function ImportGrokCliAuthModal({
  onClose,
  onSuccess,
}: ImportGrokCliAuthModalProps) {
  const notify = useNotificationStore();
  const [tab, setTab] = useState<"upload" | "paste">("upload");
  const [parsedToken, setParsedToken] = useState<string | null>(null);
  const [detectedEmail, setDetectedEmail] = useState<string | null>(null);
  const [parseError, setParseError] = useState<string | null>(null);
  const [pasteText, setPasteText] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function handlePreview(json: unknown) {
    setParseError(null);
    setDetectedEmail(null);
    setParsedToken(null);
    const { valid, token, email } = extractTokenFromGrokJson(json);
    if (!valid || !token) {
      setParseError(
        "Not a valid Grok Build auth.json. Expected an object with a key containing a JWT."
      );
      return;
    }
    setDetectedEmail(email);
    setParsedToken(token);
  }

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      try {
        handlePreview(JSON.parse(ev.target?.result as string));
      } catch {
        setParseError("Could not parse JSON");
      }
    };
    reader.readAsText(file);
  }

  function handlePasteChange(text: string) {
    setPasteText(text);
    if (!text.trim()) {
      setParsedToken(null);
      setParseError(null);
      setDetectedEmail(null);
      return;
    }
    try {
      handlePreview(JSON.parse(text));
    } catch {
      setParseError("Could not parse JSON");
      setParsedToken(null);
    }
  }

  async function handleSubmit() {
    if (!parsedToken) return;
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/oauth/grok-cli/import-token", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token: parsedToken }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setError(data.error || "Failed to import");
        return;
      }
      notify.success("Grok Build connection imported successfully");
      onSuccess();
    } catch {
      setError("Failed to import Grok Build auth");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Modal isOpen onClose={onClose} title="Import Grok Build Auth" size="md">
      <div className="flex flex-col gap-4">
        <p className="text-sm text-text-muted">
          Import your Grok Build <code>~/.grok/auth.json</code> file. You can get it by running{" "}
          <code>grok login</code> in your terminal.
        </p>

        {/* Tab toggle */}
        <div className="flex gap-2 border-b border-border pb-3">
          <button
            className={`text-sm px-3 py-1 rounded-t ${tab === "upload" ? "font-semibold border-b-2 border-primary text-primary" : "text-text-muted"}`}
            onClick={() => setTab("upload")}
          >
            Upload file
          </button>
          <button
            className={`text-sm px-3 py-1 rounded-t ${tab === "paste" ? "font-semibold border-b-2 border-primary text-primary" : "text-text-muted"}`}
            onClick={() => setTab("paste")}
          >
            Paste JSON
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
        {parsedToken && (
          <div className="flex flex-col gap-3">
            <div className="bg-green-500/10 border border-green-500/20 rounded-md p-3">
              <p className="text-sm text-green-400">
                Valid Grok Build token detected{detectedEmail ? ` (${detectedEmail})` : ""}
              </p>
            </div>
            <input
              type="text"
              placeholder="Connection name (optional)"
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
          <Button onClick={handleSubmit} fullWidth disabled={!parsedToken || loading}>
            {loading ? "Saving…" : "Save Connection"}
          </Button>
          <Button onClick={onClose} variant="ghost" fullWidth>
            Cancel
          </Button>
        </div>
      </div>
    </Modal>
  );
}
