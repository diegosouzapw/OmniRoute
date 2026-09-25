"use client";

import { useCallback, useState } from "react";
import { useLocale } from "next-intl";
import { useApiKeyDetails } from "./useApiKeyDetails";
import { ApiKeyDetailsContent } from "./components/ApiKeyDetailsContent";
import type { SavedSection } from "./components/ApiKeyDetailsContent";
import { ApiKeyDetailsHeader } from "./components/ApiKeyDetailsHeader";
import { formatDateTime } from "./components/DetailsPrimitives";
import {
  ApiKeyDetailsLoadError,
  ApiKeyDetailsLoadingSkeleton,
} from "./components/ApiKeyDetailsLoadState";

/**
 * Per-key information and statistics page: UTC day/week usage, every enforced limit,
 * the shared account quota preview, and the controls that shape them. Each control
 * saves on its own and then refetches the whole page.
 */
export default function ApiKeyDetailsPageClient({ keyId }: { keyId: string }) {
  const locale = useLocale();
  const { data, error, loading, refreshing, reload } = useApiKeyDetails(keyId);
  const [savedSection, setSavedSection] = useState<SavedSection | null>(null);

  const savedHandler = useCallback(
    (section: SavedSection) => async () => {
      await reload();
      setSavedSection(section);
    },
    [reload]
  );

  const view = data?.view;
  const keyConfig = data?.keyConfig ?? null;
  const name = view?.apiKey.name || keyConfig?.name || "";
  const generatedAt = formatDateTime(view?.generatedAt ?? null, locale);

  return (
    <div className="w-full min-w-0 space-y-6 pb-10">
      <ApiKeyDetailsHeader
        keyId={keyId}
        name={name}
        generatedAt={generatedAt}
        view={view ?? null}
        hasData={Boolean(data)}
        refreshing={refreshing}
        onReload={() => void reload()}
      />

      {loading ? (
        <ApiKeyDetailsLoadingSkeleton />
      ) : !data || !view ? (
        <ApiKeyDetailsLoadError error={error} onRetry={() => void reload()} />
      ) : (
        <ApiKeyDetailsContent
          keyId={keyId}
          data={data}
          error={error}
          savedSection={savedSection}
          onSaved={savedHandler}
        />
      )}
    </div>
  );
}
