"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import Button from "@/shared/components/Button";
import { copyToClipboard } from "@/shared/utils/clipboard";

export default function CompanionCommand({
  command,
  title,
  hint,
}: {
  command: string;
  title: string;
  hint?: string;
}) {
  const common = useTranslations("common");
  const t = useTranslations("cliCommon.companion");
  const [feedback, setFeedback] = useState<"copied" | "failed" | null>(null);
  const [copying, setCopying] = useState(false);
  async function handleCopy() {
    setCopying(true);
    setFeedback(null);
    const copied = await copyToClipboard(command);
    setFeedback(copied ? "copied" : "failed");
    setCopying(false);
  }
  return (
    <li className="min-w-0 space-y-2 border-t border-border py-3 first:border-t-0">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h3 className="text-sm font-medium text-text-main">{title}</h3>
        <Button
          variant="secondary"
          icon="content_copy"
          disabled={copying}
          onClick={handleCopy}
          aria-label={`${common("copy")}: ${title}`}
          className="focus-visible:outline-2 focus-visible:outline-primary motion-reduce:transition-none"
        >
          {common("copy")}
        </Button>
      </div>
      <pre className="max-w-full whitespace-pre-wrap break-all rounded-control bg-black/5 p-3 text-xs leading-relaxed text-text-main dark:bg-white/5">
        <code>{command}</code>
      </pre>
      {hint && <p className="max-w-prose text-sm text-text-muted">{hint}</p>}
      <p role="status" aria-live="polite" className="min-h-4 text-xs text-text-main">
        {feedback === "failed" ? t("copyFailed") : feedback === "copied" ? common("copied") : ""}
      </p>
    </li>
  );
}
