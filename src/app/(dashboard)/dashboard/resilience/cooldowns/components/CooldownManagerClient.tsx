"use client";

import { useTranslations } from "next-intl";
import EmptyState from "@/shared/components/EmptyState";
import { useNotificationStore } from "@/store/notificationStore";
import CooldownConnectionsCard from "./CooldownConnectionsCard";
import CooldownRulesCard from "./CooldownRulesCard";
import { useCooldownData, type CooldownRules } from "./useCooldownData";

export default function CooldownManagerClient() {
  const t = useTranslations("resilienceCooldowns");
  const notify = useNotificationStore();
  const { connections, rules, loadError, refresh, clearCooldowns, saveRules } = useCooldownData();

  const handleClear = async (request: Parameters<typeof clearCooldowns>[0]) => {
    try {
      const result = await clearCooldowns(request);
      notify.success(
        t("list.cleared", {
          cleared: result.cleared,
          lockouts: result.lockoutsCleared,
          skipped: result.skippedTerminal,
        })
      );
    } catch {
      notify.error(t("list.clearFailed"));
    }
  };

  const handleSave = async (next: CooldownRules) => {
    try {
      await saveRules(next);
      notify.success(t("rules.saved"));
    } catch {
      notify.error(t("rules.saveFailed"));
    }
  };

  if (!connections || !rules) {
    return loadError ? (
      <EmptyState icon="error" title={t("loadFailed")} description={t("loadFailedDetail")} />
    ) : (
      <EmptyState icon="hourglass_empty" title={t("loading")} />
    );
  }

  return (
    <>
      <CooldownRulesCard rules={rules} onSave={handleSave} />
      <CooldownConnectionsCard
        connections={connections}
        onClear={handleClear}
        onRefresh={() => void refresh()}
      />
    </>
  );
}
