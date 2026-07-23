"use client";

/**
 * RequestCountByProviderDateTable — #4009
 *
 * Some providers bill by request rather than by token, so operators need a
 * plain per-provider, per-date request count (not just token aggregates).
 * Self-contained: fetches its own data (via useProviderDailyUsage) from a
 * dedicated endpoint so the main analytics route (frozen at the file-size
 * baseline) stays untouched. Header + table markup are split into
 * RequestCountDateFilter / RequestCountTable to keep this container under
 * the max-lines-per-function complexity gate.
 */

import { useCallback, useMemo, useState } from "react";
import { useTranslations } from "next-intl";
import Card from "../Card";
import RequestCountDateFilter from "./RequestCountDateFilter";
import RequestCountTable, { type RequestCountSortField } from "./RequestCountTable";
import { useProviderDailyUsage } from "./useProviderDailyUsage";
import { sortProviderDailyUsageRows } from "./requestCountSort";

export default function RequestCountByProviderDateTable({ range }: { range: string }) {
  const t = useTranslations("analytics");
  const tCommon = useTranslations("common");
  const [dateFilter, setDateFilter] = useState("");
  const [sortBy, setSortBy] = useState<RequestCountSortField>("date");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");

  const { rows, loading, error } = useProviderDailyUsage(range, dateFilter);

  const toggleSort = useCallback(
    (field: RequestCountSortField) => {
      if (sortBy === field) {
        setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"));
      } else {
        setSortBy(field);
        setSortOrder("desc");
      }
    },
    [sortBy]
  );

  const sorted = useMemo(
    () => sortProviderDailyUsageRows(rows, sortBy, sortOrder),
    [rows, sortBy, sortOrder]
  );

  return (
    <Card className="overflow-hidden">
      <RequestCountDateFilter
        title={t("chartRequestsByProviderDate")}
        dateLabel={t("chartDate")}
        value={dateFilter}
        onChange={setDateFilter}
      />

      {loading && rows.length === 0 ? (
        <div className="text-center text-text-muted text-sm py-8">{tCommon("loading")}</div>
      ) : error ? (
        <div className="text-center text-red-500 text-sm py-8">
          {tCommon("errorShort")}: {error}
        </div>
      ) : sorted.length === 0 ? (
        <div className="text-center text-text-muted text-sm py-8">{t("chartNoData")}</div>
      ) : (
        <RequestCountTable
          rows={sorted}
          sortBy={sortBy}
          sortOrder={sortOrder}
          onToggleSort={toggleSort}
          dateLabel={t("chartDate")}
          providerLabel={t("chartProvider")}
          requestsLabel={t("chartRequests")}
          totalLabel={t("chartTotal")}
        />
      )}
    </Card>
  );
}
