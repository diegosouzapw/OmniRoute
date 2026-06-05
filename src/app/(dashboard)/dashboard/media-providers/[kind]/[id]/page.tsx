import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { AI_PROVIDERS } from "@/shared/constants/providers";
import type { MediaKind } from "../../components/mediaKinds";
import { MEDIA_KINDS } from "../../components/mediaKinds";
import MediaProviderPageClient from "./MediaProviderPageClient";

interface PageProps {
  params: Promise<{ kind: string; id: string }>;
}

/**
 * /dashboard/media-providers/[kind]/[id]
 *
 * Individual provider page for a media-service provider.
 * Validates both kind and id; 404 if either is unknown or the provider
 * does not declare the requested kind.
 */
export default async function MediaProviderDetailPage({ params }: PageProps) {
  const { kind, id } = await params;

  // Validate kind
  if (!MEDIA_KINDS.includes(kind as MediaKind)) {
    notFound();
  }

  const validKind = kind as MediaKind;

  // Validate provider exists in AI_PROVIDERS
  const provider = Object.values(AI_PROVIDERS).find((p) => p.id === id) as
    | (Record<string, unknown> & {
        id: string;
        name: string;
        color?: string;
        website?: string;
        hasFree?: boolean;
        freeNote?: string;
      })
    | undefined;

  if (!provider) {
    notFound();
  }

  // Validate that the provider declares this kind
  const serviceKinds = provider.serviceKinds as string[] | undefined;
  if (!Array.isArray(serviceKinds) || !serviceKinds.includes(validKind)) {
    notFound();
  }

  const t = await getTranslations("media");
  const kindLabel = t(`kinds.${validKind}`);

  return (
    <MediaProviderPageClient
      providerId={provider.id}
      providerName={provider.name}
      providerColor={provider.color}
      kindLabel={kindLabel}
      activeKind={validKind}
      website={provider.website}
      hasFree={provider.hasFree}
      freeNote={provider.freeNote}
    />
  );
}
