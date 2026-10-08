"use client";

import { useId } from "react";
import { useTranslations } from "next-intl";
import Input from "@/shared/components/Input";
import {
  validCompanionContext,
  validCompanionModel,
  type CompanionTarget,
} from "@/shared/utils/cliCompanion";

interface Props {
  targets: CompanionTarget[];
  selected: CompanionTarget;
  context: string;
  model: string;
  onTarget: (value: string) => void;
  onContext: (value: string) => void;
  onModel: (value: string) => void;
}

export default function CompanionControls(props: Props) {
  const t = useTranslations("cliCommon.companion");
  const common = useTranslations("common");
  const id = useId();
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      <div className="flex min-w-0 flex-col gap-1.5">
        <label htmlFor={id} className="text-sm font-medium text-text-main">
          {t("target")}
        </label>
        <select
          id={id}
          value={props.selected.id}
          onChange={(event) => props.onTarget(event.target.value)}
          className="h-10 w-full rounded-control border border-black/10 bg-surface px-3 text-sm text-text-main focus-visible:outline-2 focus-visible:outline-primary dark:border-white/10"
        >
          {props.targets.map((target) => (
            <option key={target.id} value={target.id}>
              {target.name}
            </option>
          ))}
        </select>
      </div>
      <Input
        label={t("context")}
        value={props.context}
        autoComplete="off"
        spellCheck={false}
        maxLength={64}
        onChange={(event) => props.onContext(event.target.value)}
        hint={t("contextHint")}
        error={!validCompanionContext(props.context) ? t("contextInvalid") : undefined}
      />
      {props.selected.requiresModel && (
        <Input
          label={common("model")}
          value={props.model}
          autoComplete="off"
          spellCheck={false}
          maxLength={200}
          onChange={(event) => props.onModel(event.target.value)}
          hint={t("modelHint")}
          error={props.model && !validCompanionModel(props.model) ? t("modelInvalid") : undefined}
        />
      )}
    </div>
  );
}
