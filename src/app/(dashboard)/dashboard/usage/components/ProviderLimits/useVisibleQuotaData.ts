import { useEffect, useMemo, useState } from "react";

import { collectHiddenQuotaModelIds, filterHiddenModelQuotas } from "./utils";

function getProviderKey(connections: any[]): string {
  const providers = new Set<string>();
  for (const conn of connections) {
    if (typeof conn?.provider === "string" && conn.provider) providers.add(conn.provider);
  }
  return Array.from(providers).sort().join("|");
}

export function useVisibleQuotaData(
  connections: any[],
  quotaData: Record<string, any>
): Record<string, any> {
  const [hiddenModelsByProvider, setHiddenModelsByProvider] = useState<Record<string, string[]>>(
    {}
  );
  const providerKey = useMemo(() => getProviderKey(connections), [connections]);

  useEffect(() => {
    if (!providerKey) return;

    let alive = true;
    const providers = providerKey.split("|").filter(Boolean);

    Promise.all(
      providers.map(async (provider) => {
        try {
          const response = await fetch(
            `/api/provider-models?provider=${encodeURIComponent(provider)}`
          );
          if (!response.ok) return [provider, []] as const;
          const data = await response.json();
          return [provider, collectHiddenQuotaModelIds(provider, data)] as const;
        } catch {
          return [provider, []] as const;
        }
      })
    ).then((entries) => {
      if (alive) setHiddenModelsByProvider(Object.fromEntries(entries));
    });

    return () => {
      alive = false;
    };
  }, [providerKey]);

  return useMemo(() => {
    const next: Record<string, any> = {};
    for (const conn of connections) {
      const data = quotaData[conn.id];
      if (!data) continue;
      next[conn.id] = {
        ...data,
        quotas: filterHiddenModelQuotas(
          conn.provider,
          data.quotas,
          hiddenModelsByProvider[conn.provider]
        ),
      };
    }
    return next;
  }, [connections, hiddenModelsByProvider, quotaData]);
}
