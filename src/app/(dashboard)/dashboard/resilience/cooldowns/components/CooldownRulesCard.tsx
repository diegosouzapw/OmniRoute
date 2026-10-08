"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import Card from "@/shared/components/Card";
import Button from "@/shared/components/Button";
import Input from "@/shared/components/Input";
import Toggle from "@/shared/components/Toggle";
import type { CooldownProfile, CooldownRules } from "./useCooldownData";

const MAX_BASE_COOLDOWN_SECONDS = 24 * 60 * 60;
const MAX_BACKOFF_STEPS = 32;

function clampInt(raw: string, max: number): number {
  const value = Math.floor(Number(raw));
  return Number.isFinite(value) ? Math.min(Math.max(value, 0), max) : 0;
}

function ProfileFields({
  title,
  profile,
  onChange,
}: {
  title: string;
  profile: CooldownProfile;
  onChange: (next: CooldownProfile) => void;
}) {
  const t = useTranslations("resilienceCooldowns");
  return (
    <div className="flex flex-col gap-3">
      <h4 className="text-sm font-semibold text-text-main">{title}</h4>
      <Input
        type="number"
        min={0}
        max={MAX_BASE_COOLDOWN_SECONDS}
        label={t("rules.baseCooldown")}
        hint={t("rules.baseCooldownHint")}
        value={Math.round(profile.baseCooldownMs / 1000)}
        onChange={(event) =>
          onChange({
            ...profile,
            baseCooldownMs: clampInt(event.target.value, MAX_BASE_COOLDOWN_SECONDS) * 1000,
          })
        }
      />
      <Input
        type="number"
        min={0}
        max={MAX_BACKOFF_STEPS}
        label={t("rules.maxBackoffSteps")}
        hint={t("rules.maxBackoffStepsHint")}
        value={profile.maxBackoffSteps}
        onChange={(event) =>
          onChange({ ...profile, maxBackoffSteps: clampInt(event.target.value, MAX_BACKOFF_STEPS) })
        }
      />
    </div>
  );
}

/** The cooldown rules an operator tunes most: stall behaviour and the per-auth base cooldown. */
export default function CooldownRulesCard({
  rules,
  onSave,
}: {
  rules: CooldownRules;
  onSave: (next: CooldownRules) => Promise<void>;
}) {
  const t = useTranslations("resilienceCooldowns");
  const [draft, setDraft] = useState<CooldownRules>(rules);
  const [saving, setSaving] = useState(false);
  const dirty = JSON.stringify(draft) !== JSON.stringify(rules);

  const save = async () => {
    setSaving(true);
    try {
      await onSave(draft);
    } finally {
      setSaving(false);
    }
  };

  return (
    <Card title={t("rules.title")} subtitle={t("rules.subtitle")} icon="tune">
      <div className="flex flex-col gap-6">
        <Toggle
          checked={draft.streamStallCooldown}
          onChange={(checked) => setDraft({ ...draft, streamStallCooldown: checked })}
          label={t("rules.stallLabel")}
          description={t("rules.stallDescription")}
        />
        <div className="grid gap-6 md:grid-cols-2">
          <ProfileFields
            title={t("rules.oauth")}
            profile={draft.oauth}
            onChange={(oauth) => setDraft({ ...draft, oauth })}
          />
          <ProfileFields
            title={t("rules.apikey")}
            profile={draft.apikey}
            onChange={(apikey) => setDraft({ ...draft, apikey })}
          />
        </div>
        <div className="flex justify-end">
          <Button onClick={save} disabled={!dirty} loading={saving} icon="save">
            {t("rules.save")}
          </Button>
        </div>
      </div>
    </Card>
  );
}
