const NOTION_API_BASE = "https://api.notion.com/v1";
const NOTION_VERSION = "2026-03-11";
const MAX_RETRIES = 3;
const TIMEOUT_MS = 55000;

export class NotionAuthError extends Error {
  constructor(msg: string) {
    super(msg);
    this.name = "NotionAuthError";
  }
}

export class NotionNotFoundError extends Error {
  constructor(msg: string) {
    super(msg);
    this.name = "NotionNotFoundError";
  }
}

export class NotionRateLimitError extends Error {
  retryAfter: number;
  constructor(msg: string, retryAfter: number) {
    super(msg);
    this.name = "NotionRateLimitError";
    this.retryAfter = retryAfter;
  }
}

export class NotionValidationError extends Error {
  constructor(msg: string) {
    super(msg);
    this.name = "NotionValidationError";
  }
}

export class NotionServerError extends Error {
  constructor(msg: string) {
    super(msg);
    this.name = "NotionServerError";
  }
}

export class NotionTimeoutError extends Error {
  constructor(msg: string) {
    super(msg);
    this.name = "NotionTimeoutError";
  }
}

type NotionErrorBody = {
  object: "error";
  status: number;
  code: string;
  message: string;
};

function classifyNotionError(status: number, code: string, message: string): Error {
  switch (status) {
    case 401:
      return new NotionAuthError(message);
    case 403:
      return new NotionAuthError(`Access denied: ${message}`);
    case 404:
      return new NotionNotFoundError(message);
    case 409:
      return new NotionValidationError(`Conflict: ${message}`);
    case 429: {
      const retryAfter = 1;
      const match = message.match(/retry after (\d+)/i) ?? message.match(/(\d+)/);
      const parsed = match ? parseInt(match[1], 10) : 1;
      return new NotionRateLimitError(message, Math.max(parsed, retryAfter));
    }
    case 400:
      return new NotionValidationError(message);
    default:
      if (status >= 500) return new NotionServerError(message);
      return new NotionValidationError(message);
  }
}

function sanitize(msg: string): string {
  return msg.replace(/\s+at\s+\S+/g, "").replace(/\/[\w/.-]+\.[a-z]+\:\d+/g, "").slice(0, 4096);
}

async function notionFetch(
  path: string,
  apiKey: string,
  options: RequestInit = {}
): Promise<unknown> {
  const url = `${NOTION_API_BASE}${path}`;
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), TIMEOUT_MS);
  const mergedSignal = options.signal
    ? combineSignals(options.signal, controller.signal)
    : controller.signal;

  let lastError: Error | null = null;

  for (let attempt = 0; attempt < MAX_RETRIES; attempt++) {
    try {
      const response = await fetch(url, {
        ...options,
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Notion-Version": NOTION_VERSION,
          "Content-Type": "application/json",
          ...(options.headers as Record<string, string>),
        },
        signal: mergedSignal,
      });

      if (!response.ok) {
        const body = await response.json().catch(() => ({})) as Record<string, unknown>;
        const errBody = body as Partial<NotionErrorBody>;
        const code = errBody?.code ?? "unknown";
        const msg = errBody?.message ?? `HTTP ${response.status}`;
        const error = classifyNotionError(response.status, code, msg);

        if (error instanceof NotionRateLimitError) {
          lastError = error;
          const waitMs = error.retryAfter * 1000 + Math.pow(2, attempt) * 200;
          await sleep(waitMs);
          continue;
        }

        if (error instanceof NotionServerError && attempt < MAX_RETRIES - 1) {
          lastError = error;
          await sleep(Math.pow(2, attempt) * 500);
          continue;
        }

        throw error;
      }

      return response.json();
    } catch (err) {
      if (err instanceof Error && err.name === "AbortError") {
        clearTimeout(timeout);
        throw new NotionTimeoutError("Notion API request timed out after 55s");
      }
      if (err instanceof NotionAuthError || err instanceof NotionNotFoundError || err instanceof NotionValidationError) {
        clearTimeout(timeout);
        throw err;
      }
      if (attempt < MAX_RETRIES - 1) {
        lastError = err instanceof Error ? err : new NotionServerError(String(err));
        await sleep(Math.pow(2, attempt) * 500);
        continue;
      }
    }
  }

  clearTimeout(timeout);
  throw lastError ?? new NotionServerError("Exhausted all retries");
}

function combineSignals(...signals: AbortSignal[]): AbortSignal {
  const controller = new AbortController();
  for (const signal of signals) {
    if (signal.aborted) {
      controller.abort(signal.reason);
      return controller.signal;
    }
    signal.addEventListener("abort", () => controller.abort(signal.reason), { once: true });
  }
  return controller.signal;
}

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export function createNotionClient(apiKey: string) {
  const client = {
    async searchPagesAndDatabases(
      query: string,
      startCursor?: string,
      pageSize = 20
    ): Promise<unknown> {
      const body: Record<string, unknown> = {
        query,
        page_size: Math.min(pageSize, 100),
        filter: { value: "page", property: "object" },
      };
      if (startCursor) body.start_cursor = startCursor;
      return notionFetch("/search", apiKey, {
        method: "POST",
        body: JSON.stringify(body),
      });
    },

    async getPage(pageId: string): Promise<unknown> {
      return notionFetch(`/pages/${pageId}`, apiKey);
    },

    async listBlockChildren(
      blockId: string,
      startCursor?: string,
      pageSize = 50
    ): Promise<unknown> {
      const params = new URLSearchParams();
      params.set("page_size", String(Math.min(pageSize, 100)));
      if (startCursor) params.set("start_cursor", startCursor);
      return notionFetch(`/blocks/${blockId}/children?${params}`, apiKey);
    },

    async queryDatabase(
      databaseId: string,
      filter?: unknown,
      sorts?: unknown[],
      startCursor?: string,
      pageSize = 50
    ): Promise<unknown> {
      const body: Record<string, unknown> = {
        page_size: Math.min(pageSize, 100),
      };
      if (filter) body.filter = filter;
      if (sorts) body.sorts = sorts;
      if (startCursor) body.start_cursor = startCursor;
      return notionFetch(`/databases/${databaseId}/query`, apiKey, {
        method: "POST",
        body: JSON.stringify(body),
      });
    },

    async getDatabase(databaseId: string): Promise<unknown> {
      return notionFetch(`/databases/${databaseId}`, apiKey);
    },

    async appendBlocks(
      blockId: string,
      children: unknown[],
      after?: string
    ): Promise<unknown> {
      const body: Record<string, unknown> = {
        children: children.slice(0, 100),
      };
      if (after) body.after = after;
      return notionFetch(`/blocks/${blockId}/children`, apiKey, {
        method: "PATCH",
        body: JSON.stringify(body),
      });
    },
  };

  return client;
}

export type NotionClient = ReturnType<typeof createNotionClient>;
