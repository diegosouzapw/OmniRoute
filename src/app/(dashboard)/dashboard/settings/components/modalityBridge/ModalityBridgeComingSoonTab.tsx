"use client";

import { useTranslations } from "next-intl";

interface ModalityBridgeComingSoonTabProps {
  bodyKey: string;
}

export default function ModalityBridgeComingSoonTab({ bodyKey }: ModalityBridgeComingSoonTabProps) {
  const t = useTranslations("settings");

  return (
    <div className="flex flex-col gap-2 rounded-card border border-dashed border-border p-6">
      <div className="flex items-center gap-2 text-text-muted">
        <span className="material-symbols-outlined text-[20px]" aria-hidden="true">
          hourglass_top
        </span>
        <p className="text-sm">{t(bodyKey)}</p>
      </div>
    </div>
  );
}
