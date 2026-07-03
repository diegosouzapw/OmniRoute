"use client";

import { useTranslations } from "next-intl";
import { Button } from "@/shared/components";

interface ProxyBatchActionsProps {
  selectedCount: number;
  batchDeleting: boolean;
  autoTesting: boolean;
  onBatchDelete: () => void;
  onAutoTestAll: () => void;
}

export function ProxyBatchActions({
  selectedCount,
  batchDeleting,
  autoTesting,
  onBatchDelete,
  onAutoTestAll,
}: ProxyBatchActionsProps) {
  const t = useTranslations("proxyRegistry");

  return (
    <>
      {selectedCount > 0 && (
        <>
          <span className="text-xs text-text-muted">
            {t("batchSelectedCount", { count: selectedCount })}
          </span>
          <Button
            size="sm"
            variant="secondary"
            icon="delete"
            onClick={onBatchDelete}
            loading={batchDeleting}
            className="!text-red-400 !border-red-500/30"
            data-testid="proxy-registry-batch-delete"
          >
            {t("batchDeleteSelected", { count: selectedCount })}
          </Button>
        </>
      )}
      <Button
        size="sm"
        variant="secondary"
        icon="network_check"
        onClick={onAutoTestAll}
        loading={autoTesting}
        data-testid="proxy-registry-test-all"
      >
        {t("testAll")}
      </Button>
    </>
  );
}
