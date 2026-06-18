"use client";

import { useTranslations } from "next-intl";
import { useState, useEffect } from "react";
import { useIsElectron } from "@/shared/hooks/useElectron";

/**
 * Forgot Password Page — Phase 8.2
 *
 * Provides recovery methods:
 * - Web/CLI: CLI reset via omniroute-reset-password command + manual database reset
 * - Electron: Data directory reset instructions
 */

import Link from "next/link";
import { Card } from "@/shared/components";

export default function ForgotPasswordPage() {
  const t = useTranslations("auth");
  const isElectron = useIsElectron();
  const [dataDir, setDataDir] = useState<string | null>(null);

  useEffect(() => {
    if (isElectron && typeof window !== "undefined" && (window as any).electronAPI?.getDataDir) {
      (window as any).electronAPI
        .getDataDir()
        .then((dir: string) => setDataDir(dir))
        .catch(() => {});
    }
  }, [isElectron]);

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-lg">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-primary mb-2">{t("resetPassword")}</h1>
          <p className="text-text-muted">{t("resetDescription")}</p>
        </div>

        {isElectron ? (
          <>
            {/* Electron: App Reset Method */}
            <Card className="mb-4">
              <div className="flex items-start gap-4 p-2">
                <div className="flex items-center justify-center size-10 rounded-lg bg-primary/10 text-primary shrink-0 mt-0.5">
                  <span className="material-symbols-outlined text-[20px]" aria-hidden="true">
                    folder_open
                  </span>
                </div>
                <div className="flex-1">
                  <h2 className="text-lg font-semibold mb-1">Reset via App Data</h2>
                  <p className="text-sm text-text-muted mb-3">
                    Delete the settings file from the app data directory to reset your password:
                  </p>
                  <ol className="text-sm text-text-muted space-y-2 list-decimal list-inside mb-3">
                    <li>Quit the OmniRoute desktop app completely</li>
                    <li>
                      Navigate to the app data directory:
                      {dataDir ? (
                        <div className="bg-black/30 rounded-lg p-2 mt-1 font-mono text-xs text-green-400 border border-white/5 break-all">
                          {dataDir}
                        </div>
                      ) : (
                        <div className="bg-black/30 rounded-lg p-2 mt-1 font-mono text-xs text-green-400 border border-white/5">
                          <span className="text-text-muted/60">
                            (Check your system app data folder)
                          </span>
                        </div>
                      )}
                    </li>
                    <li>
                      Delete{" "}
                      <code className="bg-black/30 px-1 rounded text-text-main">settings.json</code>{" "}
                      ({t("orRemovePasswordHashField")})
                    </li>
                    <li>Relaunch the OmniRoute desktop app — it will start fresh setup</li>
                  </ol>
                </div>
              </div>
            </Card>

            {/* Electron: Env File Method */}
            <Card className="mb-6">
              <div className="flex items-start gap-4 p-2">
                <div className="flex items-center justify-center size-10 rounded-lg bg-amber-500/10 text-amber-500 shrink-0 mt-0.5">
                  <span className="material-symbols-outlined text-[20px]" aria-hidden="true">
                    settings
                  </span>
                </div>
                <div className="flex-1">
                  <h2 className="text-lg font-semibold mb-1">Alternative: Set New Password</h2>
                  <p className="text-sm text-text-muted mb-3">
                    Set a new initial password via the server environment file:
                  </p>
                  <ol className="text-sm text-text-muted space-y-2 list-decimal list-inside mb-3">
                    <li>Quit the OmniRoute desktop app completely</li>
                    <li>
                      Open{" "}
                      <code className="bg-black/30 px-1 rounded text-text-main">server.env</code> in
                      the data directory
                      {dataDir && (
                        <div className="bg-black/30 rounded-lg p-2 mt-1 font-mono text-xs text-green-400 border border-white/5 break-all">
                          {dataDir}/server.env
                        </div>
                      )}
                    </li>
                    <li>
                      Add or update:
                      <div className="bg-black/30 rounded-lg p-2 mt-1 font-mono text-xs text-green-400 border border-white/5">
                        INITIAL_PASSWORD={t("newPasswordPlaceholder")}
                      </div>
                    </li>
                    <li>
                      Delete{" "}
                      <code className="bg-black/30 px-1 rounded text-text-main">settings.json</code>{" "}
                      from the data directory
                    </li>
                    <li>Relaunch the OmniRoute desktop app</li>
                  </ol>
                </div>
              </div>
            </Card>
          </>
        ) : (
          <>
            {/* Method 1: CLI Reset */}
            <Card className="mb-4">
              <div className="flex items-start gap-4 p-2">
                <div className="flex items-center justify-center size-10 rounded-lg bg-primary/10 text-primary shrink-0 mt-0.5">
                  <span className="material-symbols-outlined text-[20px]" aria-hidden="true">
                    terminal
                  </span>
                </div>
                <div className="flex-1">
                  <h2 className="text-lg font-semibold mb-1">{t("methodCliTitle")}</h2>
                  <p className="text-sm text-text-muted mb-3">{t("methodCliDescription")}</p>
                  <div className="bg-black/30 rounded-lg p-3 mb-3 font-mono text-sm text-green-400 border border-white/5">
                    <code>npx omniroute reset-password</code>
                  </div>
                  <p className="text-xs text-text-muted">{t("methodCliHint")}</p>
                </div>
              </div>
            </Card>

            {/* Method 2: Database Reset */}
            <Card className="mb-6">
              <div className="flex items-start gap-4 p-2">
                <div className="flex items-center justify-center size-10 rounded-lg bg-amber-500/10 text-amber-500 shrink-0 mt-0.5">
                  <span className="material-symbols-outlined text-[20px]" aria-hidden="true">
                    database
                  </span>
                </div>
                <div className="flex-1">
                  <h2 className="text-lg font-semibold mb-1">{t("methodManualTitle")}</h2>
                  <p className="text-sm text-text-muted mb-3">{t("methodManualDescription")}</p>
                  <ol className="text-sm text-text-muted space-y-2 list-decimal list-inside mb-3">
                    <li>{t("stopServer")}</li>
                    <li>
                      {t("setPasswordInYour")}{" "}
                      <code className="bg-black/30 px-1 rounded text-text-main">.env</code>{" "}
                      {t("fileLabelSuffix")}
                      <div className="bg-black/30 rounded-lg p-2 mt-1 font-mono text-xs text-green-400 border border-white/5">
                        INITIAL_PASSWORD={t("newPasswordPlaceholder")}
                      </div>
                    </li>
                    <li>
                      {t("deleteSettingsFile")}{" "}
                      <code className="bg-black/30 px-1 rounded text-text-main">
                        data/settings.json
                      </code>{" "}
                      ({t("orRemovePasswordHashField")})
                    </li>
                    <li>{t("restartServerWithNewPassword")}</li>
                  </ol>
                </div>
              </div>
            </Card>
          </>
        )}

        <div className="text-center">
          <Link
            href="/login"
            className="text-sm text-primary hover:underline inline-flex items-center gap-1"
          >
            <span className="material-symbols-outlined text-[16px]" aria-hidden="true">
              arrow_back
            </span>
            {t("backToLogin")}
          </Link>
        </div>
      </div>
    </div>
  );
}
