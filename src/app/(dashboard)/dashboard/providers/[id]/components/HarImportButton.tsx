"use client";

import { useRef, useState } from "react";
import { useTranslations } from "next-intl";
import {
  extractM365CredentialFromHar,
  describeHarImportExpiry,
  type M365HarImportResult,
} from "@/shared/utils/m365HarImport";
import { providerText, type ProviderMessageTranslator } from "../providerPageHelpers";

type HarImporter = (text: string) => M365HarImportResult;

// One entry per web-session provider that can offer HAR import. Add a new
// key here (and its own extractor in src/shared/utils/) to support another
// provider — the button renders nothing for any provider not listed.
const HAR_IMPORTERS: Record<string, HarImporter> = {
  "copilot-m365-web": extractM365CredentialFromHar,
};

const ERROR_MESSAGE_KEYS: Record<string, [string, string]> = {
  notJson: ["harImportErrorNotJson", "That file isn't valid JSON — is it really a .har export?"],
  noEntries: ["harImportErrorNoEntries", "This HAR has no network entries recorded."],
  noChathubUrl: [
    "harImportErrorNoChathubUrl",
    "No Copilot chat connection found in this HAR. Send at least one chat message in m365.cloud.microsoft before exporting.",
  ],
  unparsableUrl: [
    "harImportErrorUnparsableUrl",
    "Found the chat connection, but couldn't read its URL.",
  ],
  missingFields: [
    "harImportErrorMissingFields",
    "Found the chat connection, but the token was missing from it.",
  ],
};

export interface HarImportButtonProps {
  provider: string;
  onImport: (apiKey: string) => void;
}

export default function HarImportButton({ provider, onImport }: HarImportButtonProps) {
  const t = useTranslations("providers") as ProviderMessageTranslator;
  const importer = HAR_IMPORTERS[provider];
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [state, setState] = useState<
    | { phase: "idle" }
    | { phase: "reading" }
    | { phase: "error"; message: string }
    | { phase: "success"; expiresAt: number | null }
  >({ phase: "idle" });

  if (!importer) return null;

  async function handleFile(file: File | undefined) {
    if (!file) return;
    setState({ phase: "reading" });
    let text: string;
    try {
      text = await file.text();
    } catch {
      setState({
        phase: "error",
        message: providerText(t, "harImportErrorReadFailed", "Couldn't read that file."),
      });
      return;
    }

    const result = importer(text);
    if (result.ok === false) {
      const [key, fallback] = ERROR_MESSAGE_KEYS[result.error] ?? [
        "harImportErrorUnknown",
        "Couldn't extract a credential from that HAR file.",
      ];
      setState({ phase: "error", message: providerText(t, key, fallback) });
      return;
    }

    onImport(result.apiKey);
    setState({ phase: "success", expiresAt: result.expiresAt });
  }

  const expiry = state.phase === "success" ? describeHarImportExpiry(state.expiresAt) : null;
  const expiryText =
    expiry?.tone === "unknown"
      ? providerText(t, "harImportStatusUnknownExpiry", "Imported. Couldn't read its expiry.")
      : expiry?.tone === "bad"
        ? providerText(
            t,
            "harImportStatusExpired",
            "Imported, but this token already expired ({minutes}m ago) — export a fresh HAR.",
            { minutes: Math.abs(expiry.minutesRemaining ?? 0) }
          )
        : expiry?.tone === "warn"
          ? providerText(
              t,
              "harImportStatusExpiringSoon",
              "Imported — valid for only ~{minutes}m more.",
              { minutes: expiry.minutesRemaining ?? 0 }
            )
          : expiry?.tone === "ok"
            ? providerText(t, "harImportStatusValid", "Imported — valid for ~{minutes}m.", {
                minutes: expiry.minutesRemaining ?? 0,
              })
            : null;

  return (
    <div className="flex flex-col gap-1.5">
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          disabled={state.phase === "reading"}
          data-testid="har-import-button"
          className="inline-flex items-center gap-1.5 rounded border border-border px-2.5 py-1.5 text-xs font-medium text-text-main hover:bg-surface-hover disabled:opacity-50"
        >
          <span className="material-symbols-outlined text-[16px]" aria-hidden="true">
            upload_file
          </span>
          {state.phase === "reading"
            ? providerText(t, "harImportButtonBusy", "Importing…")
            : providerText(t, "harImportButtonLabel", "Import .har file")}
        </button>
        <span className="text-xs text-text-muted">
          {providerText(
            t,
            "harImportButtonHint",
            "Export from DevTools Network tab after sending at least one chat message."
          )}
        </span>
        <input
          ref={fileInputRef}
          type="file"
          accept=".har,application/json"
          data-testid="har-import-input"
          className="hidden"
          onChange={(event) => {
            void handleFile(event.target.files?.[0]);
            event.target.value = "";
          }}
        />
      </div>
      {state.phase === "error" && (
        <p className="text-xs text-red-600 dark:text-red-400" data-testid="har-import-error">
          {state.message}
        </p>
      )}
      {state.phase === "success" && expiryText && (
        <p
          className={
            expiry?.tone === "bad"
              ? "text-xs text-red-600 dark:text-red-400"
              : expiry?.tone === "warn"
                ? "text-xs text-amber-700 dark:text-amber-300"
                : "text-xs text-emerald-700 dark:text-emerald-300"
          }
          data-testid="har-import-status"
        >
          {expiryText}
        </p>
      )}
    </div>
  );
}
