"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Button, Input, Modal } from "@/shared/components";
import { useNotificationStore } from "@/store/notificationStore";
import {
  filterAccessKeys,
  keyAllowsAll,
  planKeyAssignment,
  summarizeKeyAccess,
  type AccessKind,
  type AssignAction,
  type AssignOutcome,
} from "./keyAccessAssignUtils";
import { runWithConcurrency } from "./catalogBulkUtils";
import type { ApiKeyAccessIndex } from "./useApiKeyAccessIndex";

export default function CatalogKeyAssignDialog({
  kind,
  items,
  index,
  onClose,
}: {
  kind: AccessKind;
  items: string[];
  index: ApiKeyAccessIndex;
  onClose: () => void;
}) {
  const t = useTranslations("modelCatalog");
  const [search, setSearch] = useState("");
  const [action, setAction] = useState<AssignAction>("add");
  const [selected, setSelected] = useState(new Set<string>());
  const [switches, setSwitches] = useState(new Set<string>());
  const [outcomes, setOutcomes] = useState<Record<string, AssignOutcome>>({});
  const [running, setRunning] = useState(false);
  const outcomeKeys = {
    changed: "resultChanged",
    unchanged: "resultUnchanged",
    skipped: "resultSkipped",
    needs_switch: "resultNeedsSwitch",
    error: "resultNetworkError",
  } as const;
  const toggle = (set: Set<string>, id: string) => {
    const next = new Set(set);
    if (next.has(id)) next.delete(id);
    else next.add(id);
    return next;
  };
  const submit = async () => {
    setRunning(true);
    const completed: Record<string, AssignOutcome> = {};
    try {
      await runWithConcurrency(
        index.keys.filter((key) => selected.has(key.id)),
        2,
        new AbortController().signal,
        async (key) => {
          const plan = planKeyAssignment({
            key,
            kind,
            action,
            items,
            switchOptIn: switches.has(key.id),
          });
          const outcome: AssignOutcome =
            plan.type === "skip" ? { status: "skipped" } : await index.assign(key.id, plan.body);
          completed[key.id] = outcome;
          setOutcomes({ ...completed });
        }
      );
      const failed = Object.values(completed).some(
        (outcome) => outcome.status === "error" || outcome.status === "needs_switch"
      );
      useNotificationStore.getState().addNotification({
        type: failed ? "error" : "success",
        message: t(failed ? "assignFailed" : "assignComplete"),
      });
      await index.refresh();
    } finally {
      setRunning(false);
    }
  };
  return (
    <Modal
      isOpen
      onClose={() => {
        if (!running) onClose();
      }}
      title={t("assignToKeys")}
      size="lg"
      footer={
        <Button
          data-testid="assign-apply-btn"
          disabled={running || selected.size === 0}
          onClick={() => void submit()}
        >
          {t("assignApply")}
        </Button>
      }
    >
      <div className="space-y-4">
        <p>{t("selectedAccessItems", { count: items.length })}</p>
        <div className="flex gap-3">
          {(["add", "remove"] as const).map((mode) => (
            <label key={mode}>
              <input
                type="radio"
                name="assign-action"
                aria-label={t(mode === "add" ? "assignActionAdd" : "assignActionRemove")}
                checked={action === mode}
                disabled={running}
                onChange={() => setAction(mode)}
              />{" "}
              {t(mode === "add" ? "assignActionAdd" : "assignActionRemove")}
            </label>
          ))}
        </div>
        <Input
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          placeholder={t("searchKeys")}
        />
        {index.loading && <p>{t("keysLoading")}</p>}
        {index.error && <Button onClick={() => void index.refresh()}>{t("keysRetry")}</Button>}
        <div className="max-h-96 space-y-2 overflow-auto">
          {filterAccessKeys(index.keys, search).map((key) => {
            const summary = summarizeKeyAccess(key);
            const all = keyAllowsAll(key, kind);
            return (
              <div key={key.id} className="rounded border border-border p-3">
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    aria-label={t("selectApiKey", { name: key.name })}
                    checked={selected.has(key.id)}
                    disabled={running}
                    onChange={() => setSelected(toggle(selected, key.id))}
                  />
                  <span>{key.name}</span>
                </label>
                <p className="text-xs text-text-muted">
                  {summary.allModels
                    ? t("allModelsAccess")
                    : t("modelAccessCount", { count: summary.modelCount })}{" "}
                  ·{" "}
                  {summary.allCombos
                    ? t("allCombosAccess")
                    : t("comboAccessCount", { count: summary.comboCount })}{" "}
                  ·{" "}
                  {t(
                    key.isBanned
                      ? "keyBanned"
                      : key.isActive === false
                        ? "keyInactive"
                        : "keyActive"
                  )}
                </p>
                {selected.has(key.id) && all && action === "add" && (
                  <label className="mt-2 flex items-start gap-2 text-sm">
                    <input
                      type="checkbox"
                      data-testid={`switch-restricted-${key.id}`}
                      checked={switches.has(key.id)}
                      disabled={running}
                      onChange={() => setSwitches(toggle(switches, key.id))}
                    />
                    {t("switchRestrictedConfirm")}
                  </label>
                )}
                {selected.has(key.id) && all && action === "remove" && (
                  <p className="text-xs">{t("removeNoChangeHint")}</p>
                )}
                {outcomes[key.id] && (
                  <p data-testid={`assign-result-${key.id}`} role="status" className="mt-2 text-sm">
                    {t(outcomeKeys[outcomes[key.id].status])}
                    {outcomes[key.id].message ? `: ${outcomes[key.id].message}` : ""}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </Modal>
  );
}
