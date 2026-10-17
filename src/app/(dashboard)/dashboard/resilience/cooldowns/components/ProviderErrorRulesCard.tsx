"use client";

import { useCallback, useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import Card from "@/shared/components/Card";
import Button from "@/shared/components/Button";
import Input from "@/shared/components/Input";
import Select from "@/shared/components/Select";
import { useNotificationStore } from "@/store/notificationStore";
import {
  COOLDOWN_PRESETS,
  ERROR_RULE_REASONS,
  ERROR_RULE_SCOPES,
  MAX_CUSTOM_COOLDOWN_MINUTES,
  nextDraftKey,
  serializeErrorRulesDraft,
  toErrorRulesDraft,
  type CooldownChoice,
  type DraftCooldown,
  type DraftDefault,
  type DraftRule,
  type ErrorRuleReason,
  type ErrorRuleScope,
  type ErrorRulesDraft,
  type ErrorRulesIssue,
} from "./providerErrorRulesModel";

type Translate = ReturnType<typeof useTranslations>;

function rowErrors(
  t: Translate,
  issues: ErrorRulesIssue[],
  target: "rule" | "default",
  index: number
): string[] {
  return issues.flatMap((issue) =>
    issue.kind !== "tooMany" && issue.target === target && issue.index === index
      ? [t(`errorRules.errors.${issue.kind}`)]
      : []
  );
}

function DurationField({
  value,
  allowAuto,
  onChange,
}: {
  value: DraftCooldown;
  allowAuto: boolean;
  onChange: (next: DraftCooldown) => void;
}) {
  const t = useTranslations("resilienceCooldowns");
  const choices: CooldownChoice[] = [
    ...(allowAuto ? (["auto"] as const) : []),
    ...COOLDOWN_PRESETS.map((preset) => preset.key),
    "custom",
  ];
  return (
    <div className="flex flex-col gap-2">
      <Select
        label={t("errorRules.duration")}
        value={value.choice}
        options={choices.map((choice) => ({
          value: choice,
          label: t(`errorRules.durations.${choice}`),
        }))}
        onChange={(event) => onChange({ ...value, choice: event.target.value as CooldownChoice })}
      />
      {value.choice === "custom" && (
        <Input
          type="number"
          min={1}
          max={MAX_CUSTOM_COOLDOWN_MINUTES}
          aria-label={t("errorRules.customMinutes")}
          placeholder={t("errorRules.customMinutes")}
          value={value.customMinutes}
          onChange={(event) => onChange({ ...value, customMinutes: event.target.value })}
        />
      )}
    </div>
  );
}

function ScopeField({
  value,
  onChange,
}: {
  value: ErrorRuleScope;
  onChange: (next: ErrorRuleScope) => void;
}) {
  const t = useTranslations("resilienceCooldowns");
  return (
    <Select
      label={t("errorRules.scope")}
      value={value}
      options={ERROR_RULE_SCOPES.map((scope) => ({
        value: scope,
        label: t(`errorRules.scopes.${scope}`),
      }))}
      onChange={(event) => onChange(event.target.value as ErrorRuleScope)}
    />
  );
}

function RowShell({
  errors,
  onRemove,
  children,
}: {
  errors: string[];
  onRemove: () => void;
  children: React.ReactNode;
}) {
  const t = useTranslations("resilienceCooldowns");
  return (
    <div className="flex flex-col gap-2 rounded-lg border border-border p-3">
      <div className="grid gap-3 md:grid-cols-3 lg:grid-cols-6">{children}</div>
      <div className="flex items-center justify-between gap-3">
        <p role="alert" className="text-xs text-red-500">
          {errors.join(" ")}
        </p>
        <Button variant="ghost" size="sm" icon="delete" onClick={onRemove}>
          {t("errorRules.remove")}
        </Button>
      </div>
    </div>
  );
}

function RuleRow({
  rule,
  errors,
  onChange,
  onRemove,
}: {
  rule: DraftRule;
  errors: string[];
  onChange: (next: DraftRule) => void;
  onRemove: () => void;
}) {
  const t = useTranslations("resilienceCooldowns");
  return (
    <RowShell errors={errors} onRemove={onRemove}>
      <Input
        label={t("errorRules.provider")}
        placeholder={t("errorRules.providerPlaceholder")}
        value={rule.provider}
        onChange={(event) => onChange({ ...rule, provider: event.target.value })}
      />
      <Input
        type="number"
        min={100}
        max={599}
        label={t("errorRules.status")}
        placeholder={t("errorRules.statusPlaceholder")}
        value={rule.status}
        onChange={(event) => onChange({ ...rule, status: event.target.value })}
      />
      <Input
        label={t("errorRules.match")}
        placeholder={t("errorRules.matchPlaceholder")}
        maxLength={200}
        value={rule.match}
        onChange={(event) => onChange({ ...rule, match: event.target.value })}
      />
      <ScopeField value={rule.scope} onChange={(scope) => onChange({ ...rule, scope })} />
      <Select
        label={t("errorRules.reason")}
        value={rule.reason}
        options={[
          { value: "", label: t("errorRules.reasonAuto") },
          ...ERROR_RULE_REASONS.map((reason) => ({
            value: reason,
            label: t(`errorRules.reasons.${reason}`),
          })),
        ]}
        onChange={(event) =>
          onChange({ ...rule, reason: event.target.value as ErrorRuleReason | "" })
        }
      />
      <DurationField
        value={rule.cooldown}
        allowAuto
        onChange={(cooldown) => onChange({ ...rule, cooldown })}
      />
    </RowShell>
  );
}

function DefaultRow({
  entry,
  errors,
  onChange,
  onRemove,
}: {
  entry: DraftDefault;
  errors: string[];
  onChange: (next: DraftDefault) => void;
  onRemove: () => void;
}) {
  const t = useTranslations("resilienceCooldowns");
  return (
    <RowShell errors={errors} onRemove={onRemove}>
      <Input
        label={t("errorRules.provider")}
        placeholder={t("errorRules.providerPlaceholder")}
        value={entry.provider}
        onChange={(event) => onChange({ ...entry, provider: event.target.value })}
      />
      <ScopeField value={entry.scope} onChange={(scope) => onChange({ ...entry, scope })} />
      <DurationField
        value={entry.cooldown}
        allowAuto={false}
        onChange={(cooldown) => onChange({ ...entry, cooldown })}
      />
    </RowShell>
  );
}

const newRule = (): DraftRule => ({
  key: nextDraftKey(),
  provider: "",
  status: "",
  match: "",
  scope: "connection",
  reason: "",
  cooldown: { choice: "1h", customMinutes: "" },
});

const newDefault = (): DraftDefault => ({
  key: nextDraftKey(),
  provider: "",
  scope: "connection",
  cooldown: { choice: "1h", customMinutes: "" },
});

/** Editor for the operator error rules (`providerErrorRules`) and catch-all defaults. */
export default function ProviderErrorRulesCard() {
  const t = useTranslations("resilienceCooldowns");
  const notify = useNotificationStore();
  const [draft, setDraft] = useState<ErrorRulesDraft | null>(null);
  const [loadError, setLoadError] = useState(false);
  const [issues, setIssues] = useState<ErrorRulesIssue[]>([]);
  const [saving, setSaving] = useState(false);

  const load = useCallback(async () => {
    try {
      const res = await fetch("/api/settings", { cache: "no-store" });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      setDraft(toErrorRulesDraft((await res.json()) as Record<string, unknown>));
      setLoadError(false);
    } catch {
      setLoadError(true);
    }
  }, []);

  useEffect(() => {
    void load();
  }, [load]);

  const update = (next: ErrorRulesDraft) => {
    setDraft(next);
    setIssues([]);
  };

  const save = async () => {
    if (!draft) return;
    const result = serializeErrorRulesDraft(draft);
    if (!result.ok) {
      setIssues(result.issues);
      return;
    }
    setSaving(true);
    try {
      const res = await fetch("/api/settings", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(result.payload),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      notify.success(t("errorRules.saved"));
    } catch {
      notify.error(t("errorRules.saveFailed"));
    } finally {
      setSaving(false);
    }
  };

  const errorsFor = (target: "rule" | "default", index: number) =>
    rowErrors(t, issues, target, index);

  return (
    <Card title={t("errorRules.title")} subtitle={t("errorRules.subtitle")} icon="rule">
      {!draft ? (
        <p className="text-sm text-text-muted">
          {loadError ? t("errorRules.loadFailed") : t("loading")}
        </p>
      ) : (
        <div className="flex flex-col gap-6">
          <section className="flex flex-col gap-3">
            <h4 className="text-sm font-semibold text-text-main">{t("errorRules.rulesHeading")}</h4>
            <p className="text-xs text-text-muted">{t("errorRules.matchHint")}</p>
            {draft.rules.length === 0 && (
              <p className="text-sm text-text-muted">{t("errorRules.rulesEmpty")}</p>
            )}
            {draft.rules.map((rule, index) => (
              <RuleRow
                key={rule.key}
                rule={rule}
                errors={errorsFor("rule", index)}
                onChange={(next) =>
                  update({ ...draft, rules: draft.rules.map((r, i) => (i === index ? next : r)) })
                }
                onRemove={() =>
                  update({ ...draft, rules: draft.rules.filter((_, i) => i !== index) })
                }
              />
            ))}
            <div>
              <Button
                variant="secondary"
                size="sm"
                icon="add"
                onClick={() => update({ ...draft, rules: [...draft.rules, newRule()] })}
              >
                {t("errorRules.addRule")}
              </Button>
            </div>
          </section>
          <section className="flex flex-col gap-3">
            <h4 className="text-sm font-semibold text-text-main">
              {t("errorRules.defaultsHeading")}
            </h4>
            <p className="text-xs text-text-muted">{t("errorRules.defaultsHint")}</p>
            {draft.defaults.length === 0 && (
              <p className="text-sm text-text-muted">{t("errorRules.defaultsEmpty")}</p>
            )}
            {draft.defaults.map((entry, index) => (
              <DefaultRow
                key={entry.key}
                entry={entry}
                errors={errorsFor("default", index)}
                onChange={(next) =>
                  update({
                    ...draft,
                    defaults: draft.defaults.map((d, i) => (i === index ? next : d)),
                  })
                }
                onRemove={() =>
                  update({ ...draft, defaults: draft.defaults.filter((_, i) => i !== index) })
                }
              />
            ))}
            <div>
              <Button
                variant="secondary"
                size="sm"
                icon="add"
                onClick={() => update({ ...draft, defaults: [...draft.defaults, newDefault()] })}
              >
                {t("errorRules.addDefault")}
              </Button>
            </div>
          </section>
          <div className="flex items-center justify-end gap-3">
            {issues.some((issue) => issue.kind === "tooMany") && (
              <p role="alert" className="text-xs text-red-500">
                {t("errorRules.errors.tooMany")}
              </p>
            )}
            <Button onClick={save} loading={saving} icon="save">
              {t("errorRules.save")}
            </Button>
          </div>
        </div>
      )}
    </Card>
  );
}
