import { z } from "zod";

export const NEWS_JSON_URL =
  "https://raw.githubusercontent.com/diegosouzapw/OmniRoute/main/news.json";
export const CHANGELOG_RAW_URL =
  "https://raw.githubusercontent.com/diegosouzapw/OmniRoute/main/CHANGELOG.md";
export const CHANGELOG_GITHUB_URL =
  "https://github.com/diegosouzapw/OmniRoute/blob/main/CHANGELOG.md";
export const NEWS_DISMISS_STORAGE_NAME = "omniroute-news-dismissed-v2";
export const NEWS_DISMISS_EVENT = "omniroute:news-dismissed";

const NEWS_ID_PATTERN = /^[a-z0-9](?:[a-z0-9-]{0,78}[a-z0-9])?$/;
const LOCALE_PATTERN = /^[a-z]{2,3}(?:-[A-Z][a-z]{3})?(?:-[A-Z]{2}|-[0-9]{3})?$/;
const MAX_DISMISSED_IDS = 50;

const newsIconSchema = z.enum(["campaign", "celebration", "info", "new_releases", "radar"]);
const localizedTextSchema = z
  .object({
    title: z.string().trim().min(1).max(120),
    message: z.string().trim().min(1).max(600),
    linkLabel: z.string().trim().min(1).max(80).optional(),
  })
  .strict();

const httpsUrlSchema = z
  .string()
  .url()
  .max(500)
  .refine((value) => {
    const url = new URL(value);
    return url.protocol === "https:" && !url.username && !url.password;
  }, "Announcement links must use HTTPS without embedded credentials");

const localizedTextMapSchema = z
  .record(z.string(), localizedTextSchema)
  .superRefine((value, context) => {
    if (!value.en) {
      context.addIssue({ code: z.ZodIssueCode.custom, message: "English copy is required" });
    }
    for (const locale of Object.keys(value)) {
      if (!LOCALE_PATTERN.test(locale)) {
        context.addIssue({
          code: z.ZodIssueCode.custom,
          message: `Invalid locale: ${locale}`,
        });
      }
    }
  });

const newsFeedItemSchema = z
  .object({
    id: z.string().regex(NEWS_ID_PATTERN),
    active: z.boolean(),
    publishedAt: z.string().datetime({ offset: true }),
    text: localizedTextMapSchema,
    link: httpsUrlSchema.optional(),
    icon: newsIconSchema,
  })
  .strict();

const newsFeedSchema = z
  .object({
    schemaVersion: z.literal(2),
    items: z.array(newsFeedItemSchema).max(50),
  })
  .strict()
  .superRefine(({ items }, context) => {
    const ids = new Set<string>();
    for (const [index, item] of items.entries()) {
      if (ids.has(item.id)) {
        context.addIssue({
          code: z.ZodIssueCode.custom,
          message: `Duplicate announcement id: ${item.id}`,
          path: ["items", index, "id"],
        });
      }
      ids.add(item.id);
    }
  });

const legacyActiveNewsSchema = z
  .object({
    active: z.literal(true),
    title: z.string().trim().min(1).max(120),
    message: z.string().trim().min(1).max(600),
    link: httpsUrlSchema.optional(),
    linkLabel: z.string().trim().min(1).max(80).optional(),
    icon: newsIconSchema.optional(),
  })
  .strict();

const legacyInactiveNewsSchema = z
  .object({
    active: z.literal(false),
  })
  .passthrough();

const legacyNewsSchema = z.discriminatedUnion("active", [
  legacyActiveNewsSchema,
  legacyInactiveNewsSchema,
]);

export type NewsFeedItem = z.infer<typeof newsFeedItemSchema>;
export type NewsIcon = z.infer<typeof newsIconSchema>;

export type NewsAnnouncement = {
  id: string;
  active: true;
  publishedAt: string;
  title: string;
  message: string;
  link?: string;
  linkLabel?: string;
  icon: NewsIcon;
};

type NewsFetchResponse = Pick<Response, "json" | "ok">;
type NewsFetch = (url: string, init: RequestInit) => Promise<NewsFetchResponse>;

export async function fetchNewsPayload(
  fetchNews: NewsFetch = fetch,
  signal?: AbortSignal
): Promise<unknown | null> {
  try {
    const response = await fetchNews(NEWS_JSON_URL, {
      cache: "no-store",
      credentials: "omit",
      referrerPolicy: "no-referrer",
      signal,
    });
    return response.ok ? await response.json() : null;
  } catch {
    return null;
  }
}

function stableHash(value: string): string {
  let hash = 0x811c9dc5;
  for (let index = 0; index < value.length; index += 1) {
    hash ^= value.charCodeAt(index);
    hash = Math.imul(hash, 0x01000193);
  }
  return (hash >>> 0).toString(16).padStart(8, "0");
}

function normalizeLegacyNews(payload: unknown): NewsFeedItem[] {
  const parsed = legacyNewsSchema.safeParse(payload);
  if (!parsed.success || !parsed.data.active) return [];

  const item = parsed.data;
  return [
    {
      id: `legacy-${stableHash(`${item.title}\n${item.message}\n${item.link ?? ""}`)}`,
      active: true,
      publishedAt: "1970-01-01T00:00:00.000Z",
      text: {
        en: {
          title: item.title,
          message: item.message,
          ...(item.linkLabel ? { linkLabel: item.linkLabel } : {}),
        },
      },
      ...(item.link ? { link: item.link } : {}),
      icon: item.icon ?? "campaign",
    },
  ];
}

export function parseNewsPayload(payload: unknown): NewsFeedItem[] {
  const feed = newsFeedSchema.safeParse(payload);
  if (feed.success) return feed.data.items;
  return normalizeLegacyNews(payload);
}

function resolveLocalizedText(item: NewsFeedItem, locale: string) {
  const normalizedLocale = locale.trim().replace("_", "-");
  const exactKey = Object.keys(item.text).find(
    (key) => key.toLowerCase() === normalizedLocale.toLowerCase()
  );
  if (exactKey) return item.text[exactKey];

  const language = normalizedLocale.split("-")[0]?.toLowerCase();
  const languageKey = Object.keys(item.text).find((key) => key.toLowerCase() === language);
  return (languageKey && item.text[languageKey]) || item.text.en;
}

export function listActiveNews(
  payload: unknown,
  locale = "en",
  now = new Date()
): NewsAnnouncement[] {
  const nowMs = now.getTime();
  if (!Number.isFinite(nowMs)) return [];

  return parseNewsPayload(payload)
    .filter((item) => item.active && Date.parse(item.publishedAt) <= nowMs)
    .sort(
      (left, right) =>
        Date.parse(right.publishedAt) - Date.parse(left.publishedAt) ||
        left.id.localeCompare(right.id)
    )
    .map((item) => {
      const text = resolveLocalizedText(item, locale);
      return {
        id: item.id,
        active: true as const,
        publishedAt: item.publishedAt,
        title: text.title,
        message: text.message,
        ...(item.link ? { link: item.link } : {}),
        ...(text.linkLabel ? { linkLabel: text.linkLabel } : {}),
        icon: item.icon,
      };
    });
}

export function selectActiveNews(
  payload: unknown,
  locale = "en",
  dismissedIds: ReadonlySet<string> = new Set(),
  now = new Date()
): NewsAnnouncement | null {
  return listActiveNews(payload, locale, now).find((item) => !dismissedIds.has(item.id)) ?? null;
}

export function parseActiveNewsPayload(payload: unknown): NewsAnnouncement | null {
  return selectActiveNews(payload, "en");
}

export function parseDismissedNewsIds(raw: string | null): Set<string> {
  if (!raw) return new Set();
  try {
    const value: unknown = JSON.parse(raw);
    if (!Array.isArray(value)) return new Set();
    const ids = value.filter(
      (id): id is string => typeof id === "string" && NEWS_ID_PATTERN.test(id)
    );
    return new Set(ids.slice(-MAX_DISMISSED_IDS));
  } catch {
    return new Set();
  }
}

export function serializeDismissedNewsIds(ids: Iterable<string>): string {
  const sanitized = [...new Set(ids)].filter((id) => NEWS_ID_PATTERN.test(id));
  return JSON.stringify(sanitized.slice(-MAX_DISMISSED_IDS));
}

export function getLatestChangelogMarkdown(markdown: string, limit = 10): string {
  const parts = markdown.split(/^##\s+\[/gm);
  if (parts.length <= 1) {
    const truncated = markdown.slice(0, 5000).trimEnd();
    return markdown.length > 5000 ? `${truncated}\n\n...` : truncated;
  }

  const header = parts[0].trimEnd();
  const versions = parts
    .slice(1, limit + 1)
    .map((part) => `## [${part.trimEnd()}`)
    .join("\n\n");

  return [header, versions].filter(Boolean).join("\n\n");
}
