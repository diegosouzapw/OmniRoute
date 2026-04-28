import { z } from "zod";

export const NEWS_JSON_URL =
  "https://raw.githubusercontent.com/diegosouzapw/OmniRoute/main/news.json";
export const CHANGELOG_RAW_URL =
  "https://raw.githubusercontent.com/diegosouzapw/OmniRoute/main/CHANGELOG.md";
export const CHANGELOG_GITHUB_URL =
  "https://github.com/diegosouzapw/OmniRoute/blob/main/CHANGELOG.md";

const activeNewsSchema = z.object({
  active: z.literal(true),
  title: z.string().trim().min(1).max(120),
  message: z.string().trim().min(1).max(600),
  link: z.string().url().optional(),
  linkLabel: z.string().trim().min(1).max(80).optional(),
  icon: z
    .string()
    .trim()
    .regex(/^[a-z0-9_]+$/)
    .optional(),
});

const inactiveNewsSchema = z
  .object({
    active: z.literal(false),
  })
  .passthrough();

const newsPayloadSchema = z.discriminatedUnion("active", [activeNewsSchema, inactiveNewsSchema]);

export type NewsAnnouncement = z.infer<typeof activeNewsSchema>;

export function parseActiveNewsPayload(payload: unknown): NewsAnnouncement | null {
  const parsed = newsPayloadSchema.safeParse(payload);
  if (!parsed.success || parsed.data.active !== true) return null;
  return parsed.data;
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
