"use client";

/**
 * useProviderDailyUsage — data hook for #4009's request-count-by-provider-date table.
 * Split out of RequestCountByProviderDateTable to keep that container under the
 * max-lines-per-function complexity gate.
 */

import { useCallback, useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { readFetchErrorMessage } from "@/shared/utils/fetchError";
import type { ProviderDailyUsageRow } from "./RequestCountTable";

export function useProviderDailyUsage(range: string, dateFilter: string) {
  const tCommon = useTranslations("common");
  const [rows, setRows] = useState<ProviderDailyUsageRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchRows = useCallback(async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      if (dateFilter) {
        params.set("date", dateFilter);
      } else {
        params.set("range", range);
      }
      const res = await fetch(`/api/usage/requests-by-provider-date?${params.toString()}`);
      if (!res.ok) throw new Error(await readFetchErrorMessage(res, tCommon("error")));
      const data = await res.json();
      setRows(Array.isArray(data.rows) ? data.rows : []);
      setError(null);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  }, [range, dateFilter, tCommon]);

  useEffect(() => {
    fetchRows();
  }, [fetchRows]);

  return { rows, loading, error };
}
