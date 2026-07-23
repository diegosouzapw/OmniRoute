"use client";

import { useCallback, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { Button, Input, Modal } from "@/shared/components";

export interface MitmSudoPasswordModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (password: string) => void;
  busy?: boolean;
  error?: string | null;
}

/**
 * Shared sudo password modal for Agent Bridge privileged actions (#7938).
 * Same UX as AgentBridgeMaintenanceCard Repair / Remove CA.
 */
export function MitmSudoPasswordModal({
  isOpen,
  onClose,
  onConfirm,
  busy = false,
  error = null,
}: MitmSudoPasswordModalProps) {
  const tCli = useTranslations("cliTools");
  const [sudoPassword, setSudoPassword] = useState("");
  const [localError, setLocalError] = useState<string | null>(null);

  const handleClose = () => {
    setSudoPassword("");
    setLocalError(null);
    onClose();
  };

  const handleConfirm = () => {
    if (!sudoPassword.trim()) {
      setLocalError(tCli("sudoPasswordRequiredError"));
      return;
    }
    const password = sudoPassword;
    setSudoPassword("");
    setLocalError(null);
    onConfirm(password);
  };

  const displayError = error ?? localError;

  return (
    <Modal isOpen={isOpen} onClose={handleClose} title={tCli("sudoPasswordRequiredTitle")} size="sm">
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
            if (event.key === "Enter" && !busy) handleConfirm();
          }}
        />

        {displayError && (
          <div className="flex items-center gap-2 rounded bg-red-500/10 px-2 py-1.5 text-xs text-red-600">
            <span className="material-symbols-outlined text-[14px]">error</span>
            <span>{displayError}</span>
          </div>
        )}

        <div className="flex items-center justify-end gap-2">
          <Button variant="ghost" size="sm" onClick={handleClose} disabled={busy}>
            {tCli("cancel")}
          </Button>
          <Button size="sm" onClick={handleConfirm} disabled={busy}>
            {tCli("confirm")}
          </Button>
        </div>
      </div>
    </Modal>
  );
}

interface UseMitmSudoPromptOptions {
  hasCachedPassword: boolean;
  needsSudoPassword: boolean;
  isWin: boolean;
}

type PrivilegedRunner = (password: string) => Promise<void>;

/**
 * Prompt for sudo when the server reports `needsSudoPassword` and none is cached.
 */
export function useMitmSudoPrompt({
  hasCachedPassword,
  needsSudoPassword,
  isWin,
}: UseMitmSudoPromptOptions) {
  const pendingRef = useRef<PrivilegedRunner | null>(null);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [modalError, setModalError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  const canRunWithoutPassword = isWin || hasCachedPassword || !needsSudoPassword;

  const closePasswordModal = useCallback(() => {
    setShowPasswordModal(false);
    pendingRef.current = null;
    setModalError(null);
  }, []);

  const runPrivileged = useCallback(
    async (fn: PrivilegedRunner) => {
      if (canRunWithoutPassword) {
        await fn("");
        return;
      }
      setModalError(null);
      pendingRef.current = fn;
      setShowPasswordModal(true);
    },
    [canRunWithoutPassword]
  );

  const confirmPassword = useCallback(async (password: string) => {
    const action = pendingRef.current;
    if (!action) return;
    setShowPasswordModal(false);
    pendingRef.current = null;
    setBusy(true);
    setModalError(null);
    try {
      await action(password);
    } catch (err) {
      pendingRef.current = action;
      setModalError(err instanceof Error ? err.message : "Action failed");
      setShowPasswordModal(true);
    } finally {
      setBusy(false);
    }
  }, []);

  return {
    runPrivileged,
    sudoModalProps: {
      isOpen: showPasswordModal,
      onClose: closePasswordModal,
      onConfirm: confirmPassword,
      busy,
      error: modalError,
    },
  };
}
