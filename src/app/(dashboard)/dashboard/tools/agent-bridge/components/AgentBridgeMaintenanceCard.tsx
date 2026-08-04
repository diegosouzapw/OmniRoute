"use client";

import { useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { Button, Input, Modal } from "@/shared/components";
import {
  runDiagnose,
  removeCaCert,
  repairMitmState,
  fetchAgentBridgeConfig,
  importAgentBridgeConfig,
  type DiagnoseResult,
} from "@/lib/inspector/agentBridgeMaintenanceApi";
import type { AgentBridgeConfig, ImportResult } from "@/lib/inspector/configPortability";

interface AgentBridgeMaintenanceCardProps {
  /** A crash left DNS spoof / CA / system proxy behind → surface the repair banner. */
  orphanedStateDetected: boolean;
  /** Whether the MITM root CA is currently trusted (gates the Remove-CA button). */
  certTrusted: boolean;
  /** Session-cached sudo password from a prior MITM privileged action. */
  hasCachedPassword: boolean;
  /** Server OS requires a sudo password and none is cached. */
  needsSudoPassword: boolean;
  /** Whether the OmniRoute server is running on Windows. */
  isWin: boolean;
  /** Report a sanitized error to the page-level alert banner. */
  onError: (msg: string | null) => void;
  /** Re-fetch page state after an action that mutates system state. */
  onRefresh: () => Promise<void> | void;
}

function downloadJson(data: unknown, filename: string): void {
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

/**
 * Maintenance & Diagnostics card — exposes the operational MITM routes that
 * shipped without UI: capture self-test (#4093), orphaned-state repair + root-CA
 * removal (#4084), and portable config import/export (#4094).
 */
export function AgentBridgeMaintenanceCard({
  orphanedStateDetected,
  certTrusted,
  hasCachedPassword,
  needsSudoPassword,
  isWin,
  onError,
  onRefresh,
}: AgentBridgeMaintenanceCardProps) {
  const t = useTranslations("agentBridge");
  const tCli = useTranslations("cliTools");
  const [busy, setBusy] = useState<string | null>(null);
  const [report, setReport] = useState<DiagnoseResult | null>(null);
  const [notice, setNotice] = useState<string | null>(null);
  const [confirmRemoveCa, setConfirmRemoveCa] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [pendingPrivilegedAction, setPendingPrivilegedAction] = useState<
    "repair" | "remove-ca" | null
  >(null);
  const [sudoPassword, setSudoPassword] = useState("");
  const [passwordModalError, setPasswordModalError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const canRunWithoutPassword = isWin || hasCachedPassword || !needsSudoPassword;

  const run = async (action: string, fn: () => Promise<void>) => {
    setBusy(action);
    onError(null);
    setNotice(null);
    try {
      await fn();
    } catch (err) {
      onError(err instanceof Error ? err.message : "Action failed");
    } finally {
      setBusy(null);
    }
  };

  const handleDiagnose = () =>
    run("diagnose", async () => {
      setReport(await runDiagnose());
    });

  const handleRepair = async (password = "") => {
    const { repaired } = await repairMitmState(password || undefined);
    setNotice(
      repaired.length === 0
        ? t("repairNothing") || "Nothing to repair — system state is clean."
        : (t("repairDone") || "Repaired: {items}").replace("{items}", repaired.join(", "))
    );
    await onRefresh();
  };

  const handleRemoveCa = async (password = "") => {
    await removeCaCert(password || undefined);
    setConfirmRemoveCa(false);
    setNotice(t("removeCaDone") || "MITM root CA removed from the OS trust store.");
    await onRefresh();
  };

  const runPrivilegedAction = async (
    action: "repair" | "remove-ca",
    password = ""
  ) => {
    if (action === "repair") {
      await run("repair", () => handleRepair(password));
      return;
    }
    await run("remove-ca", () => handleRemoveCa(password));
  };

  const requestPrivilegedAction = (action: "repair" | "remove-ca") => {
    if (canRunWithoutPassword) {
      void runPrivilegedAction(action);
      return;
    }
    setPendingPrivilegedAction(action);
    setPasswordModalError(null);
    setSudoPassword("");
    setShowPasswordModal(true);
  };

  const handleConfirmPassword = () => {
    if (!sudoPassword.trim()) {
      setPasswordModalError(tCli("sudoPasswordRequiredError"));
      return;
    }
    const action = pendingPrivilegedAction;
    if (!action) return;
    setShowPasswordModal(false);
    setPendingPrivilegedAction(null);
    const password = sudoPassword;
    setSudoPassword("");
    setPasswordModalError(null);
    void runPrivilegedAction(action, password);
  };

  const onRepairClick = () => requestPrivilegedAction("repair");

  const onRemoveCaClick = () => requestPrivilegedAction("remove-ca");

  const closePasswordModal = () => {
    setShowPasswordModal(false);
    setPendingPrivilegedAction(null);
    setSudoPassword("");
    setPasswordModalError(null);
  };

  const handleExport = () =>
    run("export", async () => {
      const config = await fetchAgentBridgeConfig();
      downloadJson(config, `agent-bridge-config-${Date.now()}.json`);
    });

  const handleImportFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    e.target.value = ""; // allow re-selecting the same file
    if (!file) return;
    await run("import", async () => {
      let parsed: unknown;
      try {
        parsed = JSON.parse(await file.text());
      } catch {
        throw new Error(t("importInvalidJson") || "The selected file is not valid JSON.");
      }
      const result: ImportResult = await importAgentBridgeConfig(parsed as AgentBridgeConfig);
      setNotice(
        (t("importDone") || "Imported {bypass} bypass · {hosts} hosts · {agents} agents")
          .replace("{bypass}", String(result.bypassPatterns))
          .replace("{hosts}", String(result.customHosts))
          .replace("{agents}", String(result.agents))
      );
      await onRefresh();
    });
  };

  return (
    <>
    <div className="rounded-xl border border-border/60 bg-card overflow-hidden">
      <div className="flex items-center gap-3 px-5 py-4">
        <div className="p-2 rounded-lg bg-primary/10">
          <span className="material-symbols-outlined text-[20px] text-primary">build</span>
        </div>
        <div>
          <h2 className="text-sm font-semibold text-text-main">
            {t("maintenanceTitle") || "Maintenance & Diagnostics"}
          </h2>
          <p className="text-xs text-text-muted mt-0.5">
            {t("maintenanceSubtitle") ||
              "Self-test the capture pipeline, undo leftover system state, and move your setup between machines."}
          </p>
        </div>
      </div>

      {/* Orphaned-state repair banner (Gap 7) */}
      {orphanedStateDetected && (
        <div className="mx-5 mb-3 flex items-center gap-2 rounded-lg border border-amber-500/30 bg-amber-500/5 px-3 py-2 text-xs text-amber-700 dark:text-amber-400">
          <span className="material-symbols-outlined text-[16px]">warning</span>
          <span>
            {t("orphanedStateWarning") ||
              "A previous session left system state behind (DNS spoof, CA, or system proxy). Run Repair to clean it up."}
          </span>
        </div>
      )}

      {/* Action buttons */}
      <div className="flex flex-wrap gap-2 px-5 pb-4">
        <button
          type="button"
          onClick={handleDiagnose}
          disabled={busy !== null}
          className="inline-flex items-center gap-1.5 rounded-lg bg-blue-500/10 text-blue-600 px-3 py-1.5 text-xs font-medium hover:bg-blue-500/20 transition-colors disabled:opacity-50"
        >
          <span className="material-symbols-outlined text-[14px]">troubleshoot</span>
          {busy === "diagnose" ? t("diagnosing") || "Diagnosing…" : t("diagnose") || "Diagnose"}
        </button>

        <button
          type="button"
          onClick={onRepairClick}
          disabled={busy !== null}
          className={`inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium transition-colors disabled:opacity-50 ${
            orphanedStateDetected
              ? "bg-amber-500/20 text-amber-700 dark:text-amber-300 hover:bg-amber-500/30"
              : "bg-amber-500/10 text-amber-600 hover:bg-amber-500/20"
          }`}
        >
          <span className="material-symbols-outlined text-[14px]">cleaning_services</span>
          {busy === "repair" ? t("repairing") || "Repairing…" : t("repair") || "Repair"}
        </button>

        {certTrusted &&
          (confirmRemoveCa ? (
            <span className="inline-flex items-center gap-1 rounded-lg bg-red-500/5 border border-red-500/30 px-2 py-1 text-xs">
              <span className="text-red-600 dark:text-red-400">{t("removeCaConfirm") || "Remove CA?"}</span>
              <button
                type="button"
                onClick={onRemoveCaClick}
                disabled={busy !== null}
                className="rounded bg-red-500/15 text-red-600 px-2 py-0.5 font-medium hover:bg-red-500/25 disabled:opacity-50"
              >
                {busy === "remove-ca" ? t("removing") || "Removing…" : t("confirm") || "Confirm"}
              </button>
              <button
                type="button"
                onClick={() => setConfirmRemoveCa(false)}
                disabled={busy !== null}
                className="rounded text-text-muted px-2 py-0.5 hover:text-text-main disabled:opacity-50"
              >
                {t("cancel") || "Cancel"}
              </button>
            </span>
          ) : (
            <button
              type="button"
              onClick={() => setConfirmRemoveCa(true)}
              disabled={busy !== null}
              className="inline-flex items-center gap-1.5 rounded-lg bg-red-500/10 text-red-600 px-3 py-1.5 text-xs font-medium hover:bg-red-500/20 transition-colors disabled:opacity-50"
            >
              <span className="material-symbols-outlined text-[14px]">gpp_bad</span>
              {t("removeCa") || "Remove CA"}
            </button>
          ))}

        <button
          type="button"
          onClick={handleExport}
          disabled={busy !== null}
          className="inline-flex items-center gap-1.5 rounded-lg bg-zinc-500/10 text-text-muted px-3 py-1.5 text-xs font-medium hover:bg-zinc-500/20 transition-colors disabled:opacity-50"
        >
          <span className="material-symbols-outlined text-[14px]">download</span>
          {busy === "export" ? t("exporting") || "Exporting…" : t("exportConfig") || "Export config"}
        </button>

        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          disabled={busy !== null}
          className="inline-flex items-center gap-1.5 rounded-lg bg-zinc-500/10 text-text-muted px-3 py-1.5 text-xs font-medium hover:bg-zinc-500/20 transition-colors disabled:opacity-50"
        >
          <span className="material-symbols-outlined text-[14px]">upload</span>
          {busy === "import" ? t("importing") || "Importing…" : t("importConfig") || "Import config"}
        </button>
        <input
          ref={fileInputRef}
          type="file"
          accept="application/json,.json"
          onChange={handleImportFile}
          className="hidden"
          aria-hidden="true"
        />
      </div>

      {/* Success notice */}
      {notice && (
        <div className="mx-5 mb-4 flex items-center gap-2 rounded-lg border border-emerald-500/30 bg-emerald-500/5 px-3 py-2 text-xs text-emerald-700 dark:text-emerald-400">
          <span className="material-symbols-outlined text-[16px]">check_circle</span>
          {notice}
        </div>
      )}

      {/* Diagnose report */}
      {report && (
        <div className="mx-5 mb-4 rounded-lg border border-border/40 bg-bg-subtle/40 p-3">
          <div className="flex items-center gap-2 mb-2 text-xs font-medium">
            <span
              className={`material-symbols-outlined text-[16px] ${
                report.healthy ? "text-emerald-500" : "text-red-500"
              }`}
            >
              {report.healthy ? "check_circle" : "error"}
            </span>
            <span className={report.healthy ? "text-emerald-600 dark:text-emerald-400" : "text-red-600 dark:text-red-400"}>
              {report.healthy
                ? t("diagnoseHealthy") || "Capture pipeline is healthy."
                : t("diagnoseUnhealthy") || "Capture pipeline has problems:"}
            </span>
            <span className="ml-auto text-text-muted font-mono">:{report.port}</span>
          </div>
          <ul className="flex flex-col gap-1.5">
            {report.checks.map((c) => (
              <li key={c.name} className="text-xs">
                <div className="flex items-center gap-1.5">
                  <span
                    className={`material-symbols-outlined text-[14px] ${
                      c.ok ? "text-emerald-500" : "text-red-500"
                    }`}
                  >
                    {c.ok ? "check" : "close"}
                  </span>
                  <span className="font-mono text-text-main">{c.name}</span>
                </div>
                {!c.ok && c.hint && <p className="ml-5 text-text-muted">{c.hint}</p>}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>

      <Modal
        isOpen={showPasswordModal}
        onClose={closePasswordModal}
        title={tCli("sudoPasswordRequiredTitle")}
        size="sm"
      >
        <div className="flex flex-col gap-4">
          <div className="flex items-start gap-3 rounded-lg border border-yellow-500/30 bg-yellow-500/10 p-3">
            <span className="material-symbols-outlined text-[20px] text-yellow-500">warning</span>
            <p className="text-xs text-text-muted">{tCli("sudoPasswordHint")}</p>
          </div>

          <Input
            type="password"
            placeholder={tCli("enterSudoPassword")}
            value={sudoPassword}
            onChange={(event) => setSudoPassword(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === "Enter" && busy === null) handleConfirmPassword();
            }}
          />

          {passwordModalError && (
            <div className="flex items-center gap-2 rounded bg-red-500/10 px-2 py-1.5 text-xs text-red-600">
              <span className="material-symbols-outlined text-[14px]">error</span>
              <span>{passwordModalError}</span>
            </div>
          )}

          <div className="flex items-center justify-end gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={closePasswordModal}
              disabled={busy !== null}
            >
              {tCli("cancel")}
            </Button>
            <Button size="sm" onClick={handleConfirmPassword} disabled={busy !== null}>
              {tCli("confirm")}
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
}
