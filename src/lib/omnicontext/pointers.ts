/**
 * Optional Notion / Obsidian pointer enrichment for OmniContext handoff packs.
 * Does not call MCP — normalizes caller-supplied refs into pointers_json shape.
 */

export interface KnowledgePointer {
  kind: "notion" | "obsidian" | "url" | "file";
  id?: string;
  title?: string;
  url?: string;
  path?: string;
}

export function normalizePointers(input: unknown): {
  pointers: KnowledgePointer[];
  json: string | null;
} {
  if (!input) return { pointers: [], json: null };
  const list: KnowledgePointer[] = [];

  const push = (raw: Record<string, unknown>) => {
    const kindRaw =
      typeof raw.kind === "string" ? raw.kind : typeof raw.type === "string" ? raw.type : "";
    const kind =
      kindRaw === "notion" || kindRaw === "obsidian" || kindRaw === "url" || kindRaw === "file"
        ? kindRaw
        : raw.path
          ? "obsidian"
          : raw.url
            ? "url"
            : null;
    if (!kind) return;
    list.push({
      kind,
      id: typeof raw.id === "string" ? raw.id : undefined,
      title: typeof raw.title === "string" ? raw.title : undefined,
      url: typeof raw.url === "string" ? raw.url : undefined,
      path: typeof raw.path === "string" ? raw.path : undefined,
    });
  };

  if (Array.isArray(input)) {
    for (const item of input) {
      if (item && typeof item === "object") push(item as Record<string, unknown>);
    }
  } else if (typeof input === "object") {
    const obj = input as Record<string, unknown>;
    if (Array.isArray(obj.notion)) {
      for (const n of obj.notion) {
        if (n && typeof n === "object") push({ ...(n as object), kind: "notion" });
      }
    }
    if (Array.isArray(obj.obsidian)) {
      for (const o of obj.obsidian) {
        if (o && typeof o === "object") push({ ...(o as object), kind: "obsidian" });
      }
    }
    if (Array.isArray(obj.items)) {
      for (const i of obj.items) {
        if (i && typeof i === "object") push(i as Record<string, unknown>);
      }
    }
  }

  return {
    pointers: list,
    json: list.length ? JSON.stringify({ items: list }) : null,
  };
}

export function formatPointersMarkdown(pointers: KnowledgePointer[]): string {
  if (!pointers.length) return "";
  const lines = ["## Pointers"];
  for (const p of pointers) {
    if (p.kind === "notion") {
      lines.push(`- Notion: ${p.title || p.id || "page"}${p.url ? ` (${p.url})` : ""}`);
    } else if (p.kind === "obsidian") {
      lines.push(`- Obsidian: ${p.path || p.title || "note"}`);
    } else if (p.kind === "url") {
      lines.push(`- URL: ${p.url || p.title || "link"}`);
    } else {
      lines.push(`- File: ${p.path || p.title || "file"}`);
    }
  }
  return lines.join("\n");
}
