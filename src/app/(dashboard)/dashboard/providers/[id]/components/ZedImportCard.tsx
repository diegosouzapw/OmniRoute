"use client";

import { useState, useCallback } from "react";
import { Button, Card } from "@/shared/components";

type ZedImportCardProps = {
  fetchConnections: () => Promise<void>;
  notify: { success: (msg: string) => void; error: (msg: string) => void; info: (msg: string) => void };
};

export default function ZedImportCard({ fetchConnections, notify }: ZedImportCardProps) {
  const [importingZed, setImportingZed] = useState(false);
  const [showZedManual, setShowZedManual] = useState(false);
  const [zedManualProvider, setZedManualProvider] = useState("openai");
  const [zedManualToken, setZedManualToken] = useState("");
  const [importingZedManual, setImportingZedManual] = useState(false);

  const handleZedImport = useCallback(async () => {
    if (importingZed) return;
    setImportingZed(true);
    try {
      const res = await fetch("/api/providers/zed/import", { method: "POST" });
      const data = await res.json();
      if (!res.ok || !data.success) {
        if (data.zedDockerEnvironment) {
          setShowZedManual(true);
        }
        notify.error(data.error || "Zed import failed");
      } else if (!data.count) {
        const found = data.credentials?.length ?? 0;
        if (found === 0) {
          notify.info("No Zed credentials found in keychain");
        } else {
          notify.info(
            `Found ${found} keychain credential(s), but none matched supported providers`
          );
        }
      } else {
        notify.success(
          `Imported ${data.count} credential(s) from Zed for ${data.providers?.length ?? 0} provider(s)`
        );
        await fetchConnections();
      }
    } catch (e: any) {
      notify.error(e?.message || "Zed import failed");
    } finally {
      setImportingZed(false);
    }
  }, [importingZed, notify, fetchConnections]);

  const handleZedManualImport = useCallback(async () => {
    if (importingZedManual || !zedManualToken.trim()) return;
    setImportingZedManual(true);
    try {
      const res = await fetch("/api/providers/zed/manual-import", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ provider: zedManualProvider, token: zedManualToken.trim() }),
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        notify.error(data.error?.message ?? data.error ?? "Manual import failed");
      } else {
        notify.success(`Imported ${zedManualProvider} token from Zed`);
        setZedManualToken("");
        await fetchConnections();
      }
    } catch (e: any) {
      notify.error(e?.message || "Manual import failed");
    } finally {
      setImportingZedManual(false);
    }
  }, [importingZedManual, zedManualProvider, zedManualToken, notify, fetchConnections]);

  return (
    <>
      <Card>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex-1 min-w-0">
            <h2 className="text-lg font-semibold flex items-center gap-2">
              <span className="material-symbols-outlined text-[20px]">download</span>
              Import from Zed Keychain
            </h2>
            <p className="text-sm text-text-muted mt-1">
              Discover AI provider credentials (OpenAI, Anthropic, Google, Mistral, xAI) that
              Zed IDE stored in the OS keychain and import them as connections. Requires Zed IDE
              installed on this machine.
            </p>
          </div>
          <Button
            size="sm"
            variant="secondary"
            icon={importingZed ? "sync" : "download"}
            onClick={handleZedImport}
            disabled={importingZed}
          >
            {importingZed ? "Importing…" : "Import from Zed"}
          </Button>
        </div>
      </Card>
      <Card>
        <div className="flex flex-col gap-3">
          <button
            className="flex items-center justify-between w-full text-left"
            onClick={() => setShowZedManual((v) => !v)}
          >
            <h2 className="text-lg font-semibold flex items-center gap-2">
              <span className="material-symbols-outlined text-[20px]">edit</span>
              Manual Token Import
            </h2>
            <span className="material-symbols-outlined text-[18px] text-text-muted">
              {showZedManual ? "expand_less" : "expand_more"}
            </span>
          </button>
          {showZedManual && (
            <div className="flex flex-col gap-3 mt-1">
              <p className="text-sm text-text-muted">
                Use this when OmniRoute runs in Docker or the keychain is unavailable. Paste the
                API key that Zed stored under{" "}
                <code className="font-mono text-xs">~/.config/zed/settings.json</code> or copy
                it from the Zed AI settings panel.
              </p>
              <div className="flex gap-2 flex-col sm:flex-row">
                <select
                  className="input input-sm"
                  value={zedManualProvider}
                  onChange={(e) => setZedManualProvider(e.target.value)}
                >
                  <option value="openai">OpenAI</option>
                  <option value="anthropic">Anthropic</option>
                  <option value="google">Google</option>
                  <option value="mistral">Mistral</option>
                  <option value="xai">xAI</option>
                  <option value="openrouter">OpenRouter</option>
                  <option value="deepseek">DeepSeek</option>
                </select>
                <input
                  type="password"
                  className="input input-sm flex-1"
                  placeholder="Paste API key…"
                  value={zedManualToken}
                  onChange={(e) => setZedManualToken(e.target.value)}
                />
                <Button
                  size="sm"
                  variant="secondary"
                  icon={importingZedManual ? "sync" : "upload"}
                  onClick={handleZedManualImport}
                  disabled={importingZedManual || !zedManualToken.trim()}
                >
                  {importingZedManual ? "Saving…" : "Import"}
                </Button>
              </div>
            </div>
          )}
        </div>
      </Card>
    </>
  );
}
