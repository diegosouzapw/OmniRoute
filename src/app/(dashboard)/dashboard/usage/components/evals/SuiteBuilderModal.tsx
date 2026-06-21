import { Card, Button, Input, Modal, Select } from "@/shared/components";
import type { EvalSuiteDraft, EvalCaseDraft, BuilderStrategy } from "./types";
import { STRATEGIES } from "./constants";
import { createEmptyCaseDraft, createDraftId } from "./draft-helpers";

export default function SuiteBuilderModal({
  draft,
  isOpen,
  onChange,
  onClose,
  onSave,
  saving,
  t,
}: {
  draft: EvalSuiteDraft;
  isOpen: boolean;
  onChange: (next: EvalSuiteDraft) => void;
  onClose: () => void;
  onSave: () => void;
  saving: boolean;
  t: (key: string, values?: Record<string, unknown>) => string;
}) {
  const editableStrategies = STRATEGIES.filter((strategy) => strategy.name !== "custom");

  function updateCase(caseId: string, patch: Partial<EvalCaseDraft>) {
    onChange({
      ...draft,
      cases: draft.cases.map((entry) => (entry.id === caseId ? { ...entry, ...patch } : entry)),
    });
  }

  function addCase() {
    onChange({
      ...draft,
      cases: [...draft.cases, createEmptyCaseDraft()],
    });
  }

  function removeCase(caseId: string) {
    if (draft.cases.length <= 1) {
      onChange({
        ...draft,
        cases: [createEmptyCaseDraft()],
      });
      return;
    }

    onChange({
      ...draft,
      cases: draft.cases.filter((entry) => entry.id !== caseId),
    });
  }

  function duplicateCase(caseId: string) {
    const source = draft.cases.find((entry) => entry.id === caseId);
    if (!source) return;

    const sourceIndex = draft.cases.findIndex((entry) => entry.id === caseId);
    const duplicate = {
      ...source,
      id: createDraftId(),
      name: source.name ? `${source.name} ${t("suiteBuilderCloneSuffix")}`.trim() : "",
    };
    const nextCases = [...draft.cases];
    nextCases.splice(sourceIndex + 1, 0, duplicate);
    onChange({
      ...draft,
      cases: nextCases,
    });
  }

  function getExpectedPlaceholder(strategy: BuilderStrategy) {
    if (strategy === "exact") return t("suiteBuilderCaseExpectedPlaceholderExact");
    if (strategy === "regex") return t("suiteBuilderCaseExpectedPlaceholderRegex");
    return t("suiteBuilderCaseExpectedPlaceholderContains");
  }

  function getExpectedHint(strategy: BuilderStrategy) {
    if (strategy === "regex") return t("suiteBuilderCaseExpectedHintRegex");
    return undefined;
  }

  return (
    <Modal
      isOpen={isOpen}
      title={draft.id ? t("suiteBuilderEditTitle") : t("suiteBuilderCreateTitle")}
      onClose={onClose}
    >
      <div className="flex max-h-[75vh] flex-col gap-4 overflow-y-auto pr-1">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <Input
            label={t("suiteBuilderNameLabel")}
            value={draft.name}
            onChange={(event) => onChange({ ...draft, name: event.target.value })}
            placeholder={t("suiteBuilderNamePlaceholder")}
          />
          <Input
            label={t("suiteBuilderDescriptionLabel")}
            value={draft.description}
            onChange={(event) => onChange({ ...draft, description: event.target.value })}
            placeholder={t("suiteBuilderDescriptionPlaceholder")}
          />
        </div>

        <div className="rounded-xl border border-border/20 bg-surface/20 p-4">
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div>
              <h4 className="text-sm font-semibold text-text-main">
                {t("suiteBuilderCasesTitle")}
              </h4>
              <p className="text-xs text-text-muted">{t("suiteBuilderCasesHint")}</p>
            </div>
            <Button icon="add" variant="secondary" onClick={addCase}>
              {t("suiteBuilderAddCase")}
            </Button>
          </div>
        </div>

        {draft.cases.map((draftCase, index) => {
          const selectedStrategy = editableStrategies.find(
            (strategy) => strategy.name === draftCase.strategy
          );

          return (
            <Card key={draftCase.id} className="p-4">
              <div className="mb-4 flex items-center justify-between gap-3">
                <div>
                  <h4 className="text-sm font-semibold text-text-main">
                    {t("suiteBuilderCaseCardTitle", { index: index + 1 })}
                  </h4>
                  <p className="text-xs text-text-muted">
                    {t("suiteBuilderCaseCardHint", { index: index + 1 })}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    size="sm"
                    variant="secondary"
                    icon="content_copy"
                    onClick={() => duplicateCase(draftCase.id)}
                  >
                    {t("suiteBuilderDuplicateCase")}
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    icon="delete"
                    onClick={() => removeCase(draftCase.id)}
                  >
                    {t("delete")}
                  </Button>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <Input
                  label={t("suiteBuilderCaseNameLabel")}
                  value={draftCase.name}
                  onChange={(event) => updateCase(draftCase.id, { name: event.target.value })}
                  placeholder={t("suiteBuilderCaseNamePlaceholder")}
                />
                <Input
                  label={t("suiteBuilderCaseModelLabel")}
                  value={draftCase.model}
                  onChange={(event) => updateCase(draftCase.id, { model: event.target.value })}
                  placeholder={t("suiteBuilderCaseModelPlaceholder")}
                />
                <Input
                  label={t("suiteBuilderCaseTagsLabel")}
                  value={draftCase.tags}
                  onChange={(event) => updateCase(draftCase.id, { tags: event.target.value })}
                  placeholder={t("suiteBuilderCaseTagsPlaceholder")}
                  hint={t("suiteBuilderCaseTagsHint")}
                />
                <Select
                  label={t("suiteBuilderCaseStrategyLabel")}
                  value={draftCase.strategy}
                  onChange={(event) =>
                    updateCase(draftCase.id, { strategy: event.target.value as BuilderStrategy })
                  }
                  options={editableStrategies.map((strategy) => ({
                    value: strategy.name,
                    label: t(strategy.labelKey),
                  }))}
                />
                {selectedStrategy && (
                  <div
                    className={`flex items-start gap-2 rounded-lg px-3 py-2 ${selectedStrategy.bg}`}
                  >
                    <span
                      className={`material-symbols-outlined mt-0.5 text-[18px] ${selectedStrategy.color}`}
                    >
                      {selectedStrategy.icon}
                    </span>
                    <p className="text-xs leading-relaxed text-text-muted">
                      {t(selectedStrategy.descriptionKey)}
                    </p>
                  </div>
                )}
              </div>

              <div className="mt-4 grid grid-cols-1 gap-4">
                <label className="flex flex-col gap-1">
                  <span className="text-sm font-medium text-text-main">
                    {t("suiteBuilderCaseSystemPromptLabel")}
                  </span>
                  <textarea
                    value={draftCase.systemPrompt}
                    onChange={(event) =>
                      updateCase(draftCase.id, { systemPrompt: event.target.value })
                    }
                    rows={3}
                    placeholder={t("suiteBuilderCaseSystemPromptPlaceholder")}
                    className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-text-main outline-none focus:border-primary"
                  />
                </label>
                <label className="flex flex-col gap-1">
                  <span className="text-sm font-medium text-text-main">
                    {t("suiteBuilderCaseUserPromptLabel")}
                  </span>
                  <textarea
                    value={draftCase.userPrompt}
                    onChange={(event) =>
                      updateCase(draftCase.id, { userPrompt: event.target.value })
                    }
                    rows={4}
                    placeholder={t("suiteBuilderCaseUserPromptPlaceholder")}
                    className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-text-main outline-none focus:border-primary"
                  />
                </label>
                <Input
                  label={t("suiteBuilderCaseExpectedLabel")}
                  value={draftCase.expectedValue}
                  onChange={(event) =>
                    updateCase(draftCase.id, { expectedValue: event.target.value })
                  }
                  placeholder={getExpectedPlaceholder(draftCase.strategy)}
                  hint={getExpectedHint(draftCase.strategy)}
                />
              </div>
            </Card>
          );
        })}

        <div className="flex gap-2">
          <Button fullWidth onClick={onSave} disabled={saving}>
            {saving ? t("saving") : draft.id ? t("save") : t("suiteBuilderCreateAction")}
          </Button>
          <Button fullWidth variant="ghost" onClick={onClose} disabled={saving}>
            {t("cancel")}
          </Button>
        </div>
      </div>
    </Modal>
  );
}
