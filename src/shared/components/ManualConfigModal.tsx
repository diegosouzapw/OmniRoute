"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import Modal from "./Modal";
import Button from "./Button";
import { useCopyToClipboard } from "@/shared/hooks/useCopyToClipboard";

export default function ManualConfigModal({ isOpen, onClose, title, configs = [] }) {
  const t = useTranslations("common");
  const resolvedTitle = title ?? t("manualConfig");
  const [copiedIndex, setCopiedIndex] = useState(null);
  const { copy } = useCopyToClipboard();

  // Delegates to the shared useCopyToClipboard hook, which transparently
  // falls back to a hidden textarea + legacy copy command when the
  // Clipboard API is unavailable (HTTP / non-secure contexts, iframes).
  const copyConfig = async (text, index) => {
    const ok = await copy(text, `manualconfig-${index}`);
    if (!ok) return;
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={resolvedTitle} size="xl">
      <div className="flex flex-col gap-4">
        {configs.map((config, index) => (
          <div key={index} className="flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-text-main">{config.filename}</span>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => copyConfig(config.content, index)}
              >
                <span className="material-symbols-outlined text-[14px] mr-1">
                  {copiedIndex === index ? "check" : "content_copy"}
                </span>
                {copiedIndex === index ? t("copied") : t("copy")}
              </Button>
            </div>
            <pre className="px-3 py-2 bg-black/5 dark:bg-white/5 rounded font-mono text-xs overflow-x-auto whitespace-pre-wrap break-all max-h-60 overflow-y-auto border border-border">
              {config.content}
            </pre>
          </div>
        ))}
      </div>
    </Modal>
  );
}
