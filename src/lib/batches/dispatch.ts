import type { SupportedBatchEndpoint } from "@/shared/constants/batchEndpoints";
import { getRuntimePorts } from "@/lib/runtime/ports";
import { normalizeBasePath } from "@/shared/utils/basePath";

async function dispatchBatchApiRequest({
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

  const { dashboardPort } = getRuntimePorts();
  const basePath = normalizeBasePath(process.env.OMNIROUTE_BASE_PATH);
  const url = `http://127.0.0.1:${dashboardPort}${basePath}${endpoint}`;

  return await globalThis.fetch(url, {
    method: "POST",
    headers,
    body: JSON.stringify(body),
    // Never follow a redirect while carrying the stored batch API key.
    redirect: "error",
  });
}

export const dispatch = {
  dispatchBatchApiRequest,
};
