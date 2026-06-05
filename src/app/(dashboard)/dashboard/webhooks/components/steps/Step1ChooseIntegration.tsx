"use client";

import { IntegrationCard, type WebhookKind, type ComingSoonKind } from "../shared/IntegrationCard";

interface Step1Props {
  selected: WebhookKind;
  onSelect: (kind: WebhookKind) => void;
  t: (key: string) => string;
}

const KINDS: WebhookKind[] = ["slack", "telegram", "discord", "custom"];
const COMING_SOON: ComingSoonKind[] = ["email", "pagerduty", "teams"];

export function Step1ChooseIntegration({ selected, onSelect, t }: Step1Props) {
  return (
    <div className="space-y-3">
      <p className="text-sm text-text-muted">{t("wizard.step1Desc")}</p>
      <div className="grid grid-cols-2 gap-3">
        {KINDS.map((kind) => (
          <IntegrationCard
            key={kind}
            kind={kind}
            name={t(`kinds.${kind}`)}
            description={t(`kinds.${kind}Desc`)}
            selected={selected === kind}
            onSelect={onSelect}
          />
        ))}
        {COMING_SOON.map((kind) => (
          <IntegrationCard
            key={kind}
            kind={kind}
            name={t(`kinds.${kind}`)}
            description={t(`kinds.${kind}Desc`)}
            selected={false}
            disabled
            comingSoonLabel={t("kinds.comingSoon")}
          />
        ))}
      </div>
    </div>
  );
}
