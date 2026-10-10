import { computeRequestHash, shouldDeduplicate } from "../../services/requestDedup.ts";

export interface RequestDedupInput {
  translatedBody: Record<string, unknown> | null | undefined;
  provider: string;
  model: string;
  stream: boolean;
  apiKeyId?: string | null;
  trustedEffortContext?: unknown;
}

export function runRequestDedup(input: RequestDedupInput) {
  const { translatedBody, provider, model, stream, apiKeyId, trustedEffortContext } = input;
  const dedupRequestBody = { ...translatedBody, model: `${provider}/${model}`, stream };
  const dedupEnabled = shouldDeduplicate(dedupRequestBody);
  const dedupHash = dedupEnabled
    ? computeRequestHash(dedupRequestBody, apiKeyId, trustedEffortContext)
    : null;
  return { dedupEnabled, dedupHash };
}
