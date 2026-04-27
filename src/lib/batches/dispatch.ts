import type { SupportedBatchEndpoint } from "@/shared/constants/batchEndpoints";

type BatchRouteHandler = (request: Request) => Promise<Response> | Response;

const handlerLoaders: Record<SupportedBatchEndpoint, () => Promise<BatchRouteHandler>> = {
  "/v1/responses": async () => (await import("@/app/api/v1/responses/route")).POST,
  "/v1/chat/completions": async () => (await import("@/app/api/v1/chat/completions/route")).POST,
  "/v1/embeddings": async () => (await import("@/app/api/v1/embeddings/route")).POST,
  "/v1/completions": async () => (await import("@/app/api/v1/completions/route")).POST,
  "/v1/moderations": async () => (await import("@/app/api/v1/moderations/route")).POST,
  "/v1/images/generations": async () =>
    (await import("@/app/api/v1/images/generations/route")).POST,
  "/v1/videos/generations": async () =>
    (await import("@/app/api/v1/videos/generations/route")).POST,
};

const handlerCache = new Map<SupportedBatchEndpoint, BatchRouteHandler>();

async function getHandler(endpoint: SupportedBatchEndpoint): Promise<BatchRouteHandler> {
  const cached = handlerCache.get(endpoint);
  if (cached) return cached;

  const handler = await handlerLoaders[endpoint]();
  handlerCache.set(endpoint, handler);
  return handler;
}

export async function dispatchBatchApiRequest({
  endpoint,
  body,
  apiKey,
}: {
  endpoint: SupportedBatchEndpoint;
  body: Record<string, unknown>;
  apiKey?: string | null;
}): Promise<Response> {
  const headers = new Headers({ "Content-Type": "application/json" });
  if (apiKey) {
    headers.set("Authorization", `Bearer ${apiKey}`);
  }

  const handler = await getHandler(endpoint);
  const request = new Request(`http://localhost${endpoint}`, {
    method: "POST",
    headers,
    body: JSON.stringify(body),
  });
  return await handler(request);
}
