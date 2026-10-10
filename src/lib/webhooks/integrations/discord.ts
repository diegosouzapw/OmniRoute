import type { WebhookEvent } from "../eventDescriptions";
import { resolveEventDescription } from "../resolveEventDescription";

export interface DiscordEmbed {
  title: string;
  description: string;
  color: number;
  footer: { text: string };
}

export interface DiscordPayload {
  content?: string;
  embeds?: DiscordEmbed[];
}

const EVENT_COLORS: Partial<Record<WebhookEvent, number>> = {
  "request.completed": 0x22c55e,
  "request.failed": 0xef4444,
  "quota.exceeded": 0xeab308,
  "test.ping": 0x8b5cf6,
};

export function buildDiscordPayload(
  event: WebhookEvent,
  data: Record<string, unknown>
): DiscordPayload {
  const desc = resolveEventDescription(event);
  const model = typeof data.model === "string" ? data.model : null;
  const error = typeof data.error === "string" ? data.error : null;

  const lines: string[] = [];
  if (model) lines.push(`**Model:** \`${model}\``);
  if (error) lines.push(`**Error:** \`${error}\``);
  if (lines.length === 0) lines.push(desc.description);

  return {
    embeds: [
      {
        title: `${desc.emoji} ${desc.label}`,
        description: lines.join("\n"),
        color: (Object.hasOwn(EVENT_COLORS, event) ? EVENT_COLORS[event] : undefined) ?? 0x6366f1,
        footer: { text: `OmniRoute · ${new Date().toISOString()}` },
      },
    ],
  };
}
