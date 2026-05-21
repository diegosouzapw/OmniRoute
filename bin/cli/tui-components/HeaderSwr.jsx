import React, { useEffect, useState } from "react";
import { Text } from "ink";

export function HeaderSwr({ fetcher, interval = 5000, render, initial = null }) {
  const [data, setData] = useState(initial);

  useEffect(() => {
    let cancelled = false;
    async function tick() {
      try {
        const next = await fetcher();
        if (!cancelled) setData(next);
      } catch {}
    }
    tick();
    const id = setInterval(tick, interval);
    return () => {
      cancelled = true;
      clearInterval(id);
    };
  }, [fetcher, interval]);

  if (!data) return <Text dimColor>Loading…</Text>;
  return render(data);
}
