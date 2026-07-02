import { AsyncLocalStorage } from "node:async_hooks";

type McpHttpAuthContext = {
  authorization?: string;
  cookie?: string;
  xApiKey?: string;
  anthropicVersion?: string;
};

const mcpHttpAuthContext = new AsyncLocalStorage<McpHttpAuthContext>();

function headerValue(request: Request, name: string): string | undefined {
  const value = request.headers.get(name);
  return value && value.trim().length > 0 ? value : undefined;
}

export function getMcpHttpAuthHeadersForInternalFetch(): Record<string, string> {
  const context = mcpHttpAuthContext.getStore();
  const headers: Record<string, string> = {};
  if (context?.authorization) headers.Authorization = context.authorization;
  if (context?.cookie) headers.Cookie = context.cookie;
  if (context?.xApiKey && context?.anthropicVersion) {
    headers["x-api-key"] = context.xApiKey;
    headers["anthropic-version"] = context.anthropicVersion;
  }
  return headers;
}

export async function withMcpHttpAuthContext<T>(
  request: Request,
  callback: () => Promise<T>
): Promise<T> {
  return mcpHttpAuthContext.run(
    {
      authorization: headerValue(request, "authorization"),
      cookie: headerValue(request, "cookie"),
      xApiKey: headerValue(request, "x-api-key"),
      anthropicVersion: headerValue(request, "anthropic-version"),
    },
    callback
  );
}
