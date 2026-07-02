export const SUPPORTED_BATCH_ENDPOINTS = [
  "/v1/responses",
  "/v1/chat/completions",
  "/v1/embeddings",
  "/v1/completions",
  "/v1/moderations",
  "/v1/images/generations",
  "/v1/videos/generations",
] as const;

export type SupportedBatchEndpoint = (typeof SUPPORTED_BATCH_ENDPOINTS)[number];
