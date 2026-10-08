"use client";

import { useId, useState } from "react";
import { useTranslations } from "next-intl";
import {
  buildCompanionCommands,
  companionStatus,
  type CompanionTarget,
} from "@/shared/utils/cliCompanion";
import type { ToolBatchStatusMap } from "@/shared/types/cliBatchStatus";
import CompanionControls from "./CompanionControls";
import CompanionCommand from "./CompanionCommand";

interface Props {
  targets: CompanionTarget[];
  statuses: ToolBatchStatusMap | null;
  loading: boolean;
  error: boolean;
}

function CompanionHostStatus({ state }: { state: ReturnType<typeof companionStatus> }) {
  const t = useTranslations("cliCommon.companion");
  const cli = useTranslations("cliCommon");
  const common = useTranslations("common");
  function label(value: string) {
    if (value === "loading" || value === "error") return common(value);
    if (["detected", "notDetected", "configured", "notConfigured"].includes(value))
      return cli(`card.${value}`);
    return t(value);
  }
  return (
    <dl
      className="flex flex-wrap gap-x-6 gap-y-3 text-sm"
      aria-busy={state.detection === "loading"}
    >
      {[
        [cli("detail.detectionStatus"), state.detection],
        [t("runtime"), state.runtime],
        [cli("detail.configStatus"), state.configuration],
      ].map(([name, value]) => (
        <div key={name} className="flex flex-col gap-0.5">
          <dt className="text-text-muted">{name}</dt>
          <dd className="font-medium text-text-main">{label(value)}</dd>
        </div>
      ))}
    </dl>
  );
}

export default function CliCompanionPanel({ targets, statuses, loading, error }: Props) {
  const t = useTranslations("cliCommon.companion");
  const id = useId();
  const [selectedId, setSelectedId] = useState(targets[0]?.id || "");
  const [context, setContext] = useState("");
  const [model, setModel] = useState("");
  const selected = targets.find((target) => target.id === selectedId) || targets[0];
  if (!selected) return <p className="text-sm text-text-main">{t("empty")}</p>;
  const state = companionStatus(statuses?.[selected.id], loading, error);
  const commands = buildCompanionCommands(selected, context, model);
  return (
    <section
      aria-labelledby={id}
      className="min-w-0 space-y-4 rounded-lg border border-border bg-surface p-4 sm:p-5"
    >
      <div className="max-w-prose space-y-2">
        <h2 id={id} className="text-base font-semibold text-text-main">
          {t("title")}
        </h2>
        <p className="text-sm text-text-main">{t("intro")}</p>
        <p className="text-sm text-text-muted">{t("hostNotice")}</p>
      </div>
      <CompanionControls
        targets={targets}
        selected={selected}
        context={context}
        model={model}
        onTarget={setSelectedId}
        onContext={setContext}
        onModel={setModel}
      />
      <CompanionHostStatus state={state} />
      {state.detection === "error" && (
        <p role="alert" className="text-sm text-text-main">
          {t("detectionError")}
        </p>
      )}
      <ol className="min-w-0">
        <CompanionCommand command={commands.contexts} title={t("contextsStep")} />
        {commands.configure && (
          <CompanionCommand
            key={commands.configure}
            command={commands.configure}
            title={t("configureStep")}
            hint={t("configureHint")}
          />
        )}
        {commands.run && (
          <CompanionCommand
            key={commands.run}
            command={commands.run}
            title={t("runStep")}
            hint={t("runHint")}
          />
        )}
      </ol>
    </section>
  );
}
