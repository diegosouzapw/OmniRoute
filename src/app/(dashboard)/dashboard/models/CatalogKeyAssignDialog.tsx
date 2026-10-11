"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Button, Input, Modal } from "@/shared/components";
import { useNotificationStore } from "@/store/notificationStore";
import {
  assignRunToastType,
  filterAccessKeys,
  findStillAllowedPatterns,
  getKeyState,
  keyAllowsAll,
  planKeyAssignment,
  summarizeKeyAccess,
  type AccessKey,
  type AccessKind,
  type AssignAction,
  type AssignItem,
  type AssignOutcome,
  type KeyState,
} from "./keyAccessAssignUtils";
import { runWithConcurrency } from "./catalogBulkUtils";
import type { ApiKeyAccessIndex } from "./useApiKeyAccessIndex";

const UNUSABLE_STATES: ReadonlySet<KeyState> = new Set(["revoked", "expired"]);

interface AssignDialogProps {
  kind: AccessKind;
  items: AssignItem[];
  /** Selected rows that cannot be assigned from this tab (combo rows in the models tab). */
  excludedCount?: number;
  index: ApiKeyAccessIndex;
  onClose: () => void;
}
function useCatalogKeyAssignContext({
  kind,
  items,
  excludedCount = 0,
  index,
  onClose,
}: {
  kind: AccessKind;
  items: AssignItem[];
  /** Selected rows that cannot be assigned from this tab (combo rows in the models tab). */
  excludedCount?: number;
  index: ApiKeyAccessIndex;
  onClose: () => void;
}) {
  const t = useTranslations("modelCatalog");
  const common = useTranslations("common");
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
    would_empty: kind === "models" ? "resultWouldEmptyModels" : "resultWouldEmptyCombos",
    needs_switch: "resultNeedsSwitch",
    error: "resultNetworkError",
  } as const;
  const stateLabels: Record<KeyState, string> = {
    active: t("active"),
    inactive: t("keyInactive"),
    banned: t("keyBanned"),
    revoked: t("keyRevoked"),
    expired: common("expirationBadgeExpired"),
  };
  const itemIds = items.map((item) => item.id);
  const now = index.checkedAt;
  const visibleKeys = filterAccessKeys(index.keys, search);
  // Only keys the admin can still see and that can authenticate are submitted.
  const targets = visibleKeys.filter(
    (key) => selected.has(key.id) && !UNUSABLE_STATES.has(getKeyState(key, now))
  );
  const toggle = (set: Set<string>, id: string) => {
    const next = new Set(set);
    if (next.has(id)) next.delete(id);
    else next.add(id);
    return next;
  };
  const planFor = (key: AccessKey) =>
    planKeyAssignment({ key, kind, action, items: itemIds, switchOptIn: switches.has(key.id) });
  const submit = useAssignSubmission({ targets, planFor, index, t, setOutcomes, setRunning });
  return {
    t,
    common,
    search,
    setSearch,
    action,
    setAction,
    selected,
    setSelected,
    switches,
    setSwitches,
    outcomes,
    running,
    outcomeKeys,
    stateLabels,
    now,
    visibleKeys,
    targets,
    toggle,
    planFor,
    submit,
    kind,
    items,
    excludedCount,
    index,
    onClose,
  };
}
function useAssignSubmission({
  targets,
  planFor,
  index,
  t,
  setOutcomes,
  setRunning,
}: {
  targets: AccessKey[];
  planFor: (key: AccessKey) => ReturnType<typeof planKeyAssignment>;
  index: ApiKeyAccessIndex;
  t: ReturnType<typeof useTranslations>;
  setOutcomes: React.Dispatch<React.SetStateAction<Record<string, AssignOutcome>>>;
  setRunning: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const submit = async () => {
    setRunning(true);
    const completed: Record<string, AssignOutcome> = {};
    try {
      await runWithConcurrency(targets, 2, new AbortController().signal, async (key) => {
        const plan = planFor(key);
        const outcome: AssignOutcome =
          plan.type === "send"
            ? await index.assign(key.id, plan.body)
            : { status: plan.reason === "would_empty" ? "would_empty" : "skipped" };
        completed[key.id] = outcome;
        setOutcomes({ ...completed });
      });
      const type = assignRunToastType(Object.values(completed));
      useNotificationStore.getState().addNotification({
        type,
        message: t(
          type === "error"
            ? "assignFailed"
            : type === "success"
              ? "assignComplete"
              : "assignNoChanges"
        ),
      });
      await index.refresh();
    } finally {
      setRunning(false);
    }
  };
  return submit;
}
type AssignDialogContext = ReturnType<typeof useCatalogKeyAssignContext>;
function AssignKeyRow({
  accessKey: key,
  context,
}: {
  accessKey: AccessKey;
  context: AssignDialogContext;
}) {
  const { t, selected, setSelected, running, stateLabels, toggle } = context;
  const summary = summarizeKeyAccess(key);
  const state = getKeyState(key, context.now);
  const usable = !UNUSABLE_STATES.has(state);
  const isTarget = usable && selected.has(key.id);
  return (
    <div key={key.id} className="rounded border border-border p-3">
      <label className="flex items-center gap-2">
        <input
          type="checkbox"
          aria-label={t("selectApiKey", { name: key.name })}
          checked={isTarget}
          disabled={running || !usable}
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
        · {stateLabels[state]}
      </p>
      <AssignKeyHints accessKey={key} context={context} />
    </div>
  );
}
function AssignKeyHints({
  accessKey: key,
  context,
}: {
  accessKey: AccessKey;
  context: AssignDialogContext;
}) {
  const {
    t,
    kind,
    action,
    selected,
    switches,
    setSwitches,
    running,
    outcomeKeys,
    now,
    toggle,
    planFor,
    items,
  } = context;
  const all = keyAllowsAll(key, kind);
  const state = getKeyState(key, now);
  const usable = !UNUSABLE_STATES.has(state);
  const isTarget = usable && selected.has(key.id);
  const wouldEmpty = isTarget && planFor(key).type === "skip" && action === "remove";
  const stillAllowed =
    isTarget && action === "remove" && kind === "models"
      ? findStillAllowedPatterns(key, items)
      : [];
  return (
    <>
      {isTarget && all && action === "add" && (
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
      {isTarget && all && action === "remove" && (
        <p className="text-xs">{t("removeNoChangeHint")}</p>
      )}
      {wouldEmpty && <p className="text-xs">{t(outcomeKeys.would_empty)}</p>}
      {stillAllowed.length > 0 && (
        <p className="text-xs">
          {t("removeStaysAllowedHint", { patterns: stillAllowed.join(", ") })}
        </p>
      )}
      <AssignKeyOutcome keyId={key.id} context={context} />
    </>
  );
}
function AssignKeyOutcome({ keyId, context }: { keyId: string; context: AssignDialogContext }) {
  const { outcomes, outcomeKeys, t } = context;
  const outcome = outcomes[keyId];
  return outcome ? (
    <p data-testid={`assign-result-${keyId}`} role="status" className="mt-2 text-sm">
      {t(outcomeKeys[outcome.status])}
      {outcome.message ? `: ${outcome.message}` : ""}
    </p>
  ) : null;
}
function AssignDialogControls({ context }: { context: AssignDialogContext }) {
  const {
    t,
    search,
    setSearch,
    action,
    setAction,
    running,
    visibleKeys,
    items,
    excludedCount,
    index,
  } = context;
  return (
    <div className="space-y-4">
      <p>{t("selectedAccessItems", { count: items.length })}</p>
      {excludedCount > 0 && (
        <p className="text-sm text-text-muted">
          {t("assignExcludedCombos", { count: excludedCount })}
        </p>
      )}
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
        aria-label={t("searchKeys")}
      />
      {index.loading && <p>{t("keysLoading")}</p>}
      {index.error && <Button onClick={() => void index.refresh()}>{t("keysRetry")}</Button>}
      <div className="max-h-96 space-y-2 overflow-auto">
        {visibleKeys.map((key) => (
          <AssignKeyRow key={key.id} accessKey={key} context={context} />
        ))}
      </div>
    </div>
  );
}
export default function CatalogKeyAssignDialog(props: AssignDialogProps) {
  const context = useCatalogKeyAssignContext(props);
  const { t, running, targets, submit, items, onClose } = context;
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
          disabled={running || targets.length === 0 || items.length === 0}
          onClick={() => void submit()}
        >
          {t("assignApply")}
        </Button>
      }
    >
      <AssignDialogControls context={context} />
    </Modal>
  );
}
