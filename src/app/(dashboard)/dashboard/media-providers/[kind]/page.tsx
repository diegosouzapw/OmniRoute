import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import Link from "next/link";
import { AI_PROVIDERS } from "@/shared/constants/providers";
import { resolveProviderServiceKinds } from "@omniroute/open-sse/config/mediaServiceKinds.ts";
import type { MediaKind } from "../components/mediaKinds";
import { MEDIA_KINDS } from "../components/mediaKinds";
import MediaProviderKindNav from "../components/MediaProviderKindNav";
import ProviderIcon from "@/shared/components/ProviderIcon";

interface PageProps {
  params: Promise<{ kind: string }>;
}

/**
 * /dashboard/media-providers/[kind]
 *
 * Lists all AI providers that declare the given serviceKind.
 * Returns 404 for unknown kinds.
 */
export default async function MediaProviderKindPage({ params }: PageProps) {
  const { kind } = await params;

  // Validate kind
  if (!MEDIA_KINDS.includes(kind as MediaKind)) {
    notFound();
  }

  const validKind = kind as MediaKind;
  const t = await getTranslations("media");

  // Filter providers that support this kind. Membership is the union of the
  // explicitly declared serviceKinds and the media kinds derived from the
  // backend registries (audio/video/music/image/embedding) — see
  // resolveProviderServiceKinds. This keeps the UI in lockstep with the backend
  // without hand-maintaining serviceKinds on every media provider.
  const matchingProviders = Object.values(AI_PROVIDERS).filter((p) => {
    const entry = p as Record<string, unknown> & { id: string; serviceKinds?: string[] };
    return resolveProviderServiceKinds(entry.id, entry.serviceKinds).includes(validKind);
  });

  const kindLabel = t(`kinds.${validKind}`);

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-semibold">{kindLabel}</h1>
        <p className="text-sm text-text-muted">{t("noProviders")}</p>
      </div>

      <MediaProviderKindNav activeKind={validKind} />

      {matchingProviders.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 gap-3 border border-dashed border-border rounded-xl text-text-muted">
          <span className="material-symbols-outlined text-[32px]">category</span>
          <p className="text-sm">{t("noProviders")}</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
          {matchingProviders.map((provider) => {
            const p = provider as Record<string, unknown> & {
              id: string;
              name: string;
              color?: string;
              hasFree?: boolean;
              freeNote?: string;
            };
            return (
              <Link
                key={p.id}
                href={`/dashboard/media-providers/${validKind}/${p.id}`}
                className="group"
              >
                <div className="rounded-xl border border-border bg-bg-card p-3 hover:bg-black/[0.01] dark:hover:bg-white/[0.01] transition-colors cursor-pointer h-full flex flex-col gap-2">
                  <div className="flex items-center gap-2">
                    <div
                      className="size-7 rounded-lg flex items-center justify-center shrink-0"
                      style={{ backgroundColor: `${p.color ?? "#64748b"}15` }}
                    >
                      <ProviderIcon providerId={p.id} size={20} type="color" />
                    </div>
                    <span className="text-sm font-medium truncate">{p.name}</span>
                  </div>
                  {p.hasFree && (
                    <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-green-500/10 border border-green-500/20 text-green-600 dark:text-green-400 w-fit">
                      Free
                    </span>
                  )}
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
