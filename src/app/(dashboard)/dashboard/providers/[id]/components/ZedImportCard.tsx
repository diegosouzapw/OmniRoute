"use client";

import { useState, useCallback } from "react";
import { useTranslations } from "next-intl";
import { Button, Card } from "@/shared/components";

type ZedImportCardProps = {
  fetchConnections: () => Promise<void>;
  notify: {
    success: (msg: string) => void;
    error: (msg: string) => void;
    info: (msg: string) => void;
  };
};

export default function ZedImportCard({ fetchConnections, notify }: ZedImportCardProps) {
  const t = useTranslations("providers");
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
        notify.error(data.error || t("zedImportFailed"));
      } else if (!data.count) {
        const found = data.credentials?.length ?? 0;
        if (found === 0) {
          notify.info(t("zedNoCredentials"));
        } else {
          notify.info(t("zedUnsupportedCredentials", { count: found }));
        }
      } else {
        notify.success(
          t("zedImportSuccess", {
            credentials: data.count,
            providers: data.providers?.length ?? 0,
          })
        );
        await fetchConnections();
      }
    } catch (e: any) {
      notify.error(e?.message || t("zedImportFailed"));
    } finally {
      setImportingZed(false);
    }
  }, [fetchConnections, importingZed, notify, t]);

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
        notify.error(data.error?.message ?? data.error ?? t("zedManualImportFailed"));
      } else {
        notify.success(t("zedManualImportSuccess", { provider: zedManualProvider }));
        setZedManualToken("");
        await fetchConnections();
      }
    } catch (e: any) {
      notify.error(e?.message || t("zedManualImportFailed"));
    } finally {
      setImportingZedManual(false);
    }
  }, [fetchConnections, importingZedManual, notify, t, zedManualProvider, zedManualToken]);

  return (
    <>
      <Card>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex-1 min-w-0">
            <h2 className="text-lg font-semibold flex items-center gap-2">
              <span className="material-symbols-outlined text-[20px]">download</span>
              {t("zedImportTitle")}
            </h2>
            <p className="text-sm text-text-muted mt-1">{t("zedImportDescription")}</p>
          </div>
          <Button
            size="sm"
            variant="secondary"
            icon={importingZed ? "sync" : "download"}
            onClick={handleZedImport}
            disabled={importingZed}
          >
            {importingZed ? t("zedImporting") : t("zedImportButton")}
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
              {t("zedManualTitle")}
            </h2>
            <span className="material-symbols-outlined text-[18px] text-text-muted">
              {showZedManual ? "expand_less" : "expand_more"}
            </span>
          </button>
          {showZedManual && (
            <div className="flex flex-col gap-3 mt-1">
              <p className="text-sm text-text-muted">
                {t.rich("zedManualDescription", {
                  path: (chunks) => <code className="font-mono text-xs">{chunks}</code>,
                })}
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
                  placeholder={t("zedPasteApiKey")}
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
                  {importingZedManual ? t("zedSaving") : t("zedImportAction")}
                </Button>
              </div>
            </div>
          )}
        </div>
      </Card>
    </>
  );
}
