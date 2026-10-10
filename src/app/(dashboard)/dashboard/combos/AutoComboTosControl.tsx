"use client";

import { useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import Toggle from "@/shared/components/Toggle";

/** The opt-in is global; connecting an account never changes this setting. */
export default function AutoComboTosControl({ onPolicyChange }: { onPolicyChange: () => void }) {
  const t = useTranslations("combos");
  const common = useTranslations("common");
  const [excluded, setExcluded] = useState<boolean | null>(null);
  const [saving, setSaving] = useState(false);
  const [loadFailed, setLoadFailed] = useState(false);
  const [loadRevision, setLoadRevision] = useState(0);
  const [saveFailed, setSaveFailed] = useState(false);
  const saveInFlight = useRef(false);

  useEffect(() => {
    const controller = new AbortController();
    void (async () => {
      try {
        const response = await fetch("/api/settings", {
          cache: "no-store",
          signal: controller.signal,
        });
        if (!response.ok) throw new Error("Settings read failed");
        const data = await response.json();
        if (typeof data?.excludeTosAvoid !== "boolean")
          throw new Error("Unconfirmed settings snapshot");
        if (!controller.signal.aborted) setExcluded(data.excludeTosAvoid);
      } catch {
        if (!controller.signal.aborted) setLoadFailed(true);
      }
    })();
    return () => controller.abort();
  }, [loadRevision]);

  const save = async (included: boolean) => {
    if (excluded === null || saveInFlight.current) return;
    saveInFlight.current = true;
    setSaving(true);
    setSaveFailed(false);
    try {
      const response = await fetch("/api/settings", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ excludeTosAvoid: !included }),
      });
      if (!response.ok) throw new Error("Settings update failed");
      const data = await response.json();
      if (data?.excludeTosAvoid !== !included) throw new Error("Unconfirmed settings update");
      setExcluded(data.excludeTosAvoid);
      onPolicyChange();
    } catch {
      setSaveFailed(true);
    } finally {
      saveInFlight.current = false;
      setSaving(false);
    }
  };

  return (
    <section id="auto-tos-policy" className="mt-4 border-t border-border pt-4">
      <Toggle
        checked={excluded === false}
        disabled={excluded === null || saving}
        onChange={(included) => void save(included)}
        label={t("autoTosIncludeLabel")}
        ariaLabel={t("autoTosIncludeLabel")}
        description={t("autoTosDescription")}
      />
      {loadFailed && (
        <div className="mt-2 text-sm">
          <p role="alert" className="text-red-500">
            {t("autoTosLoadError")}
          </p>
          <button
            type="button"
            onClick={() => {
              setLoadFailed(false);
              setLoadRevision((value) => value + 1);
            }}
            className="mt-1 text-primary underline"
          >
            {common("retry")}
          </button>
        </div>
      )}
      {saveFailed && (
        <p role="alert" className="mt-2 text-sm text-red-500">
          {t("autoTosSaveError")}
        </p>
      )}
    </section>
  );
}
