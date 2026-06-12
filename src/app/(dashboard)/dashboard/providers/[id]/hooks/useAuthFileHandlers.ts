"use client";

// Phase 1j extraction — Issue #3501
// Manages Codex / Claude / Gemini auth-file apply+export state and handlers.

import { useState } from "react";

type Notify = { success: (msg: string) => void; error: (msg: string) => void };

type UseAuthFileHandlersParams = {
  parseApiErrorMessage: (res: Response, fallback: string) => Promise<string>;
  getAttachmentFilename: (res: Response, fallback: string) => string;
  notify: Notify;
  t: (key: string) => string;
};

export function useAuthFileHandlers({
  parseApiErrorMessage,
  getAttachmentFilename,
  notify,
  t,
}: UseAuthFileHandlersParams) {
  // ── Codex ──────────────────────────────────────────────────────────────────
  const [applyingCodexAuthId, setApplyingCodexAuthId] = useState<string | null>(null);
  const [applyCodexModalConnectionId, setApplyCodexModalConnectionId] = useState<string | null>(
    null
  );
  const [exportingCodexAuthId, setExportingCodexAuthId] = useState<string | null>(null);

  // ── Claude ─────────────────────────────────────────────────────────────────
  const [applyingClaudeAuthId, setApplyingClaudeAuthId] = useState<string | null>(null);
  const [applyClaudeModalConnectionId, setApplyClaudeModalConnectionId] = useState<string | null>(
    null
  );
  const [exportingClaudeAuthId, setExportingClaudeAuthId] = useState<string | null>(null);

  // ── Gemini ─────────────────────────────────────────────────────────────────
  const [applyingGeminiAuthId, setApplyingGeminiAuthId] = useState<string | null>(null);
  const [applyGeminiModalConnectionId, setApplyGeminiModalConnectionId] = useState<string | null>(
    null
  );
  const [exportingGeminiAuthId, setExportingGeminiAuthId] = useState<string | null>(null);

  // ── Handlers ───────────────────────────────────────────────────────────────

  const handleApplyCodexAuthLocal = async (connectionId: string) => {
    if (applyingCodexAuthId) return;
    setApplyingCodexAuthId(connectionId);

    const defaultSuccess =
      typeof (t as any).has === "function" && (t as any).has("codexAuthAppliedLocal")
        ? t("codexAuthAppliedLocal")
        : "Codex auth.json applied locally";
    const defaultError =
      typeof (t as any).has === "function" && (t as any).has("codexAuthApplyFailed")
        ? t("codexAuthApplyFailed")
        : "Failed to apply Codex auth.json locally";

    try {
      const res = await fetch(`/api/providers/${connectionId}/codex-auth/apply-local`, {
        method: "POST",
      });

      if (!res.ok) {
        notify.error(await parseApiErrorMessage(res, defaultError));
        return;
      }

      notify.success(defaultSuccess);
      setApplyCodexModalConnectionId(null);
    } catch (error) {
      console.error("Error applying Codex auth locally:", error);
      notify.error(defaultError);
    } finally {
      setApplyingCodexAuthId(null);
    }
  };

  const handleExportCodexAuthFile = async (connectionId: string) => {
    if (exportingCodexAuthId) return;
    setExportingCodexAuthId(connectionId);

    const defaultSuccess =
      typeof (t as any).has === "function" && (t as any).has("codexAuthExported")
        ? t("codexAuthExported")
        : "Codex auth.json exported";
    const defaultError =
      typeof (t as any).has === "function" && (t as any).has("codexAuthExportFailed")
        ? t("codexAuthExportFailed")
        : "Failed to export Codex auth.json";

    try {
      const res = await fetch(`/api/providers/${connectionId}/codex-auth/export`, {
        method: "POST",
      });

      if (!res.ok) {
        notify.error(await parseApiErrorMessage(res, defaultError));
        return;
      }

      const blob = await res.blob();
      const filename = getAttachmentFilename(res, "codex-auth.json");
      const objectUrl = window.URL.createObjectURL(blob);
      const link = document.createElement("a");

      link.href = objectUrl;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.setTimeout(() => window.URL.revokeObjectURL(objectUrl), 1000);

      notify.success(defaultSuccess);
    } catch (error) {
      console.error("Error exporting Codex auth file:", error);
      notify.error(defaultError);
    } finally {
      setExportingCodexAuthId(null);
    }
  };

  const handleApplyClaudeAuthLocal = async (connectionId: string) => {
    if (applyingClaudeAuthId) return;
    setApplyingClaudeAuthId(connectionId);

    const defaultSuccess =
      typeof (t as any).has === "function" && (t as any).has("claudeAuthAppliedLocal")
        ? t("claudeAuthAppliedLocal")
        : "Claude auth applied locally";
    const defaultError =
      typeof (t as any).has === "function" && (t as any).has("claudeAuthApplyFailed")
        ? t("claudeAuthApplyFailed")
        : "Failed to apply Claude auth locally";

    try {
      const res = await fetch(`/api/providers/${connectionId}/claude-auth/apply-local`, {
        method: "POST",
      });

      if (!res.ok) {
        notify.error(await parseApiErrorMessage(res, defaultError));
        return;
      }

      notify.success(defaultSuccess);
      setApplyClaudeModalConnectionId(null);
    } catch (error) {
      console.error("Error applying Claude auth locally:", error);
      notify.error(defaultError);
    } finally {
      setApplyingClaudeAuthId(null);
    }
  };

  const handleExportClaudeAuthFile = async (connectionId: string) => {
    if (exportingClaudeAuthId) return;
    setExportingClaudeAuthId(connectionId);

    const defaultSuccess =
      typeof (t as any).has === "function" && (t as any).has("claudeAuthExported")
        ? t("claudeAuthExported")
        : "Claude auth file exported";
    const defaultError =
      typeof (t as any).has === "function" && (t as any).has("claudeAuthExportFailed")
        ? t("claudeAuthExportFailed")
        : "Failed to export Claude auth file";

    try {
      const res = await fetch(`/api/providers/${connectionId}/claude-auth/export`, {
        method: "POST",
      });

      if (!res.ok) {
        notify.error(await parseApiErrorMessage(res, defaultError));
        return;
      }

      const blob = await res.blob();
      const filename = getAttachmentFilename(res, "claude-auth.json");
      const objectUrl = window.URL.createObjectURL(blob);
      const link = document.createElement("a");

      link.href = objectUrl;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.setTimeout(() => window.URL.revokeObjectURL(objectUrl), 1000);

      notify.success(defaultSuccess);
    } catch (error) {
      console.error("Error exporting Claude auth file:", error);
      notify.error(defaultError);
    } finally {
      setExportingClaudeAuthId(null);
    }
  };

  const handleApplyGeminiAuthLocal = async (connectionId: string) => {
    if (applyingGeminiAuthId) return;
    setApplyingGeminiAuthId(connectionId);

    const defaultSuccess =
      typeof (t as any).has === "function" && (t as any).has("geminiAuthAppliedLocal")
        ? t("geminiAuthAppliedLocal")
        : "Gemini auth applied locally";
    const defaultError =
      typeof (t as any).has === "function" && (t as any).has("geminiAuthApplyFailed")
        ? t("geminiAuthApplyFailed")
        : "Failed to apply Gemini auth locally";

    try {
      const res = await fetch(`/api/providers/${connectionId}/gemini-cli-auth/apply-local`, {
        method: "POST",
      });

      if (!res.ok) {
        notify.error(await parseApiErrorMessage(res, defaultError));
        return;
      }

      notify.success(defaultSuccess);
      setApplyGeminiModalConnectionId(null);
    } catch (error) {
      console.error("Error applying Gemini auth locally:", error);
      notify.error(defaultError);
    } finally {
      setApplyingGeminiAuthId(null);
    }
  };

  const handleExportGeminiAuthFile = async (connectionId: string) => {
    if (exportingGeminiAuthId) return;
    setExportingGeminiAuthId(connectionId);

    const defaultSuccess =
      typeof (t as any).has === "function" && (t as any).has("geminiAuthExported")
        ? t("geminiAuthExported")
        : "Gemini auth file exported";
    const defaultError =
      typeof (t as any).has === "function" && (t as any).has("geminiAuthExportFailed")
        ? t("geminiAuthExportFailed")
        : "Failed to export Gemini auth file";

    try {
      const res = await fetch(`/api/providers/${connectionId}/gemini-cli-auth/export`, {
        method: "POST",
      });

      if (!res.ok) {
        notify.error(await parseApiErrorMessage(res, defaultError));
        return;
      }

      const blob = await res.blob();
      const filename = getAttachmentFilename(res, "gemini-auth.json");
      const objectUrl = window.URL.createObjectURL(blob);
      const link = document.createElement("a");

      link.href = objectUrl;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.setTimeout(() => window.URL.revokeObjectURL(objectUrl), 1000);

      notify.success(defaultSuccess);
    } catch (error) {
      console.error("Error exporting Gemini auth file:", error);
      notify.error(defaultError);
    } finally {
      setExportingGeminiAuthId(null);
    }
  };

  return {
    // Codex
    applyingCodexAuthId,
    applyCodexModalConnectionId,
    setApplyCodexModalConnectionId,
    exportingCodexAuthId,
    handleApplyCodexAuthLocal,
    handleExportCodexAuthFile,
    // Claude
    applyingClaudeAuthId,
    applyClaudeModalConnectionId,
    setApplyClaudeModalConnectionId,
    exportingClaudeAuthId,
    handleApplyClaudeAuthLocal,
    handleExportClaudeAuthFile,
    // Gemini
    applyingGeminiAuthId,
    applyGeminiModalConnectionId,
    setApplyGeminiModalConnectionId,
    exportingGeminiAuthId,
    handleApplyGeminiAuthLocal,
    handleExportGeminiAuthFile,
  };
}
