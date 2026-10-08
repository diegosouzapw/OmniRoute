import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";

import { normalizeComplianceEventTypes } from "@/i18n/request";
import { pickMessages } from "@/i18n/pickMessages";

/**
 * Server component that re-scopes the client i18n catalog for a route
 * subtree: loads the full merged catalog (server-side only) and serializes
 * just the given namespaces into the flight payload.
 *
 * next-intl's nested client providers REPLACE the message set for their
 * subtree (they do not merge), so every set passed here must be complete
 * for everything rendered below it — the generated maps always include the
 * dashboard chrome namespaces alongside the section's own.
 *
 * Never call this without `namespaces` from the generated map
 * (src/i18n/routeNamespaces.generated.json); omitting the messages prop on
 * any NextIntlClientProvider makes next-intl fall back to embedding the
 * whole catalog again.
 */

interface SectionI18nProviderProps {
  namespaces: readonly string[];
  children: React.ReactNode;
}

export async function SectionI18nProvider({ namespaces, children }: SectionI18nProviderProps) {
  const messages = normalizeComplianceEventTypes(
    pickMessages((await getMessages()) as Record<string, unknown>, namespaces)
  );
  return <NextIntlClientProvider messages={messages}>{children}</NextIntlClientProvider>;
}
