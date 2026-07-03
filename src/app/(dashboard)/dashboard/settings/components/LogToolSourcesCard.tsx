"use client";

import { useEffect, useState } from "react";
import { Card, Toggle } from "@/shared/components";
import { useTranslations } from "next-intl";

export default function LogToolSourcesCard() {
  const [logToolSources, setLogToolSources] = useState(false);
  const [loading, setLoading] = useState(true);
  const t = useTranslations("settings");

  useEffect(() => {
    let mounted = true;

    async function loadSettings() {
      setLoading(true);
      try {
        const res = await fetch("/api/settings", { cache: "no-store" });
        if (res.ok && mounted) {
          const data = await res.json();
          setLogToolSources(data.logToolSources === true);
        }
      } catch {
        // Leave the current switch state in place if settings cannot be loaded.
      } finally {
        if (mounted) setLoading(false);
      }
    }

    loadSettings();
    return () => {
      mounted = false;
    };
  }, []);

  const updateLogToolSources = async (value: boolean) => {
    const previousValue = logToolSources;
    setLogToolSources(value);
    try {
      const res = await fetch("/api/settings", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ logToolSources: value }),
      });
      if (!res.ok) setLogToolSources(previousValue);
    } catch (err) {
      setLogToolSources(previousValue);
      console.error("Failed to update logToolSources:", err);
    }
  };

  return (
    <Card>
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-primary/10 text-primary">
            <span className="material-symbols-outlined text-[20px]" aria-hidden="true">
              troubleshoot
            </span>
          </div>
          <div>
            <h3 className="text-lg font-semibold">{t("logToolSourcesToggle")}</h3>
            <p className="text-sm text-muted-foreground">{t("logToolSourcesDescription")}</p>
          </div>
        </div>
        <Toggle checked={logToolSources} onChange={updateLogToolSources} disabled={loading} />
      </div>
    </Card>
  );
}
