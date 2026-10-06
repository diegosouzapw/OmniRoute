"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { notFound } from "next/navigation";

import type { ComboBuilderOptionsPayload } from "@/lib/combos/builderOptions";
import type { MergedEntry } from "@/lib/radar/applyFeed";
import {
  buildRadarComboSuggestions,
  type RadarComboSuggestion,
} from "@/lib/radar/comboSuggestions";
import { Card } from "@/shared/components";

interface RadarCatalogPayload {
  entries?: MergedEntry[];
  meta?: unknown;
}

function comboNames(payload: ComboBuilderOptionsPayload): Set<string> {
  return new Set(payload.comboRefs.map((combo) => combo.name));
}

export default function RadarCombosPage() {
  const t = useTranslations("radarCombosPage");
  const [entries, setEntries] = useState<MergedEntry[]>([]);
  const [providers, setProviders] = useState<ComboBuilderOptionsPayload["providers"]>([]);
  const [existingNames, setExistingNames] = useState<Set<string>>(new Set());
  const [createdNames, setCreatedNames] = useState<Set<string>>(new Set());
  const [hasCatalog, setHasCatalog] = useState(false);
  const [flagOff, setFlagOff] = useState(false);
  const [loading, setLoading] = useState(true);
  const [creatingName, setCreatingName] = useState<string | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    async function load() {
      try {
        const [catalogResponse, optionsResponse] = await Promise.all([
          fetch("/api/radar/catalog"),
          fetch("/api/combos/builder/options"),
        ]);
        if (catalogResponse.status === 404) {
          setFlagOff(true);
          return;
        }
        if (!catalogResponse.ok || !optionsResponse.ok) throw new Error("load_failed");

        const catalog = (await catalogResponse.json()) as RadarCatalogPayload;
        const options = (await optionsResponse.json()) as ComboBuilderOptionsPayload;
        if (!Array.isArray(catalog.entries) || !Array.isArray(options.providers)) {
          throw new Error("invalid_shape");
        }

        setEntries(catalog.entries);
        setProviders(options.providers);
        setExistingNames(comboNames(options));
        setHasCatalog(catalog.meta != null);
      } catch {
        setError(t("loadFailed"));
      } finally {
        setLoading(false);
      }
    }

    void load();
  }, [t]);

  const suggestions = useMemo(
    () => buildRadarComboSuggestions({ entries, providers, existingComboNames: existingNames }),
    [entries, providers, existingNames]
  );

  const refreshExistingName = useCallback(async (name: string): Promise<boolean> => {
    try {
      const response = await fetch("/api/combos/builder/options");
      if (!response.ok) return false;
      const options = (await response.json()) as ComboBuilderOptionsPayload;
      if (!Array.isArray(options.comboRefs)) return false;
      const names = comboNames(options);
      if (![...names].some((candidate) => candidate.toLowerCase() === name.toLowerCase())) {
        return false;
      }
      setExistingNames(names);
      return true;
    } catch {
      return false;
    }
  }, []);

  const createSuggestion = useCallback(
    async (suggestion: RadarComboSuggestion) => {
      setCreatingName(suggestion.name);
      setError("");
      try {
        const response = await fetch("/api/combos", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(suggestion.payload),
        });
        if (!response.ok) {
          if (response.status === 400 && (await refreshExistingName(suggestion.name))) return;
          throw new Error("create_failed");
        }
        setExistingNames((current) => new Set([...current, suggestion.name]));
        setCreatedNames((current) => new Set([...current, suggestion.name]));
      } catch {
        setError(t("createFailed"));
      } finally {
        setCreatingName(null);
      }
    },
    [refreshExistingName, t]
  );

  if (flagOff) notFound();

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-3">
        <Link
          href="/dashboard/radar"
          className="text-sm text-text-muted hover:text-text-main transition-colors w-fit"
        >
          ← {t("backToRadar")}
        </Link>
        <div>
          <h1 className="text-2xl font-bold">{t("title")}</h1>
          <p className="text-sm text-text-muted mt-1">{t("subtitle")}</p>
        </div>
      </div>

      {error && <div className="p-3 rounded-lg bg-red-500/10 text-red-400 text-sm">{error}</div>}

      {loading ? (
        <div className="flex items-center justify-center min-h-[200px] text-text-muted">
          {t("loading")}
        </div>
      ) : !hasCatalog ? (
        <Card>
          <p className="text-center text-text-muted py-8">{t("catalogRequired")}</p>
        </Card>
      ) : suggestions.length === 0 ? (
        <Card>
          <p className="text-center text-text-muted py-8">{t("noSuggestions")}</p>
        </Card>
      ) : (
        <div className="grid gap-4">
          {suggestions.map((suggestion) => {
            const creating = creatingName === suggestion.name;
            const created = createdNames.has(suggestion.name);
            return (
              <Card key={suggestion.familyId}>
                <div className="flex flex-col gap-4">
                  <div className="flex flex-col gap-1">
                    <span className="text-xs uppercase tracking-wide text-text-muted">
                      {t("familyLabel")}
                    </span>
                    <h2 className="text-lg font-semibold font-mono">{suggestion.familyId}</h2>
                    <p className="text-sm text-text-muted">{t("strategyReason")}</p>
                  </div>

                  <div className="flex flex-col gap-2">
                    <span className="text-sm font-medium">{t("modelsLabel")}</span>
                    {suggestion.models.map((model) => (
                      <div
                        key={`${model.providerId}:${model.modelId}`}
                        className="flex flex-wrap items-center justify-between gap-2 rounded-lg border border-border px-3 py-2"
                      >
                        <span className="font-medium">{model.providerName}</span>
                        <span className="font-mono text-sm text-text-muted">
                          {model.qualifiedModel}
                        </span>
                      </div>
                    ))}
                  </div>

                  <button
                    type="button"
                    onClick={() => void createSuggestion(suggestion)}
                    disabled={creating || suggestion.alreadyExists}
                    className="self-start px-4 py-2 text-sm font-medium rounded-lg bg-violet-500 text-white hover:bg-violet-600 transition-colors disabled:opacity-50"
                  >
                    {created
                      ? t("created")
                      : suggestion.alreadyExists
                        ? t("alreadyCreated")
                        : creating
                          ? t("generating")
                          : t("generateButton")}
                  </button>
                </div>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}
