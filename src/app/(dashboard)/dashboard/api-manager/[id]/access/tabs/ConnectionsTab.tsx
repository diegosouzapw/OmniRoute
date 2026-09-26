"use client";

import { useTranslations } from "next-intl";
import ProviderConnectionPermissionList, {
  type ProviderConnection,
} from "@/app/(dashboard)/dashboard/api-manager/components/ProviderConnectionPermissionList";
import type { ApiKeyAccessFormState } from "../useApiKeyAccessForm";

interface ConnectionsTabProps {
  formState: ApiKeyAccessFormState;
  allConnections: ProviderConnection[];
  setAllowAllConnections: (allow: boolean) => void;
  setSelectedConnections: (connections: string[]) => void;
}

export default function ConnectionsTab({
  formState,
  allConnections,
  setAllowAllConnections,
  setSelectedConnections,
}: ConnectionsTabProps) {
  const t = useTranslations("apiManager");

  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-col gap-3 p-4 rounded-lg border border-border bg-surface/40">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex flex-col gap-1">
            <p className="text-sm font-medium text-text-main">{t("allowedConnections")}</p>
            <p className="text-xs text-text-muted">
              {formState.allowAllConnections
                ? t("allConnectionsDesc")
                : formState.selectedConnections.length === 0
                  ? t("selectAtLeastOneConnection")
                  : t("restrictedToConnections", { count: formState.selectedConnections.length })}
            </p>
          </div>
          <div className="flex gap-1 p-0.5 bg-surface rounded-md shrink-0">
            <button
              type="button"
              onClick={() => {
                setAllowAllConnections(true);
                setSelectedConnections([]);
              }}
              className={`px-3 py-1.5 rounded text-xs font-medium transition-all ${
                formState.allowAllConnections
                  ? "bg-primary text-white"
                  : "text-text-muted hover:bg-black/5 dark:hover:bg-white/5"
              }`}
            >
              {t("allConnections")}
            </button>
            <button
              type="button"
              onClick={() => setAllowAllConnections(false)}
              className={`px-3 py-1.5 rounded text-xs font-medium transition-all ${
                !formState.allowAllConnections
                  ? "bg-primary text-white"
                  : "text-text-muted hover:bg-black/5 dark:hover:bg-white/5"
              }`}
            >
              {t("onlySelectedConnections")}
            </button>
          </div>
        </div>

        {!formState.allowAllConnections && (
          <div className="pt-2">
            <ProviderConnectionPermissionList
              connections={allConnections}
              selectedConnections={formState.selectedConnections}
              onSelectionChange={setSelectedConnections}
            />
          </div>
        )}
      </div>
    </div>
  );
}
