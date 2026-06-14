"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import Card from "@/shared/components/Card";

export default function QuotaConceptCard() {
  const t = useTranslations("quotaShare");
  const [expanded, setExpanded] = useState(false);

  return (
    <Card padding="md">
      <button
        type="button"
        className="w-full flex items-center justify-between gap-2 cursor-pointer"
        onClick={() => setExpanded((p) => !p)}
        aria-expanded={expanded}
      >
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-[20px] text-primary">info</span>
          <span className="text-sm font-semibold text-text-main">{t("conceptTitle")}</span>
        </div>
        <span className="material-symbols-outlined text-[18px] text-text-muted">
          {expanded ? "expand_less" : "expand_more"}
        </span>
      </button>

      {expanded && (
        <div className="mt-3 space-y-2 text-xs text-text-muted leading-relaxed">
          <p>{t("conceptIntro")}</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
            <ConceptItem icon="balance" text={t("conceptFairShare")} />
            <ConceptItem icon="trending_up" text={t("conceptBorrowing")} />
            <ConceptItem icon="lock" text={t("conceptGlobalCap")} />
            <ConceptItem icon="schedule" text={t("conceptWindows")} />
            <ConceptItemWithDesc
              icon="vpn_key"
              title={t("conceptKeyHowTitle")}
              desc={t("conceptKeyHowDesc")}
            />
            <ConceptItemWithDesc
              icon="block"
              title={t("conceptExclusiveTitle")}
              desc={t("conceptExclusiveDesc")}
            />
          </div>
        </div>
      )}
    </Card>
  );
}

function ConceptItem({ icon, text }: { icon: string; text: string }) {
  return (
    <div className="flex items-start gap-1.5 rounded-md bg-bg-subtle/40 p-2">
      <span className="material-symbols-outlined text-[16px] text-primary shrink-0 mt-0.5">
        {icon}
      </span>
      <span>{text}</span>
    </div>
  );
}

function ConceptItemWithDesc({ icon, title, desc }: { icon: string; title: string; desc: string }) {
  return (
    <div className="flex items-start gap-1.5 rounded-md bg-bg-subtle/40 p-2">
      <span className="material-symbols-outlined text-[16px] text-primary shrink-0 mt-0.5">
        {icon}
      </span>
      <div className="flex flex-col gap-0.5">
        <span className="font-semibold text-text-main">{title}</span>
        <span className="text-text-muted">{desc}</span>
      </div>
    </div>
  );
}
