/** API-key model authority stays separate from target availability and retries. */
export interface ModelAccessMetadata {
  modelAccessMode?: string | null;
  allowedModels?: string[] | null;
  blockedModels?: string[] | null;
  disableNonPublicModels?: boolean | null;
}

export type ResolvedModelPermission = "allowed" | "denied" | "unavailable";

export function hasApiKeyModelRestrictions(
  metadata: ModelAccessMetadata | null | undefined
): boolean {
  return Boolean(
    metadata &&
      (metadata.modelAccessMode === "restricted" ||
        metadata.allowedModels?.length ||
        metadata.blockedModels?.length ||
        metadata.disableNonPublicModels === true)
  );
}

export async function checkResolvedModelPermission(
  input: {
    hasApiKeyMetadata: boolean;
    apiKey: string | null | undefined;
    requestedModel: string;
    resolvedModel: string;
  },
  isAllowed: (key: string, model: string, resolvedModel?: string) => Promise<boolean>
): Promise<ResolvedModelPermission> {
  if (!input.hasApiKeyMetadata) return "allowed";
  if (!input.apiKey) return "unavailable";

  try {
    return (await isAllowed(input.apiKey, input.requestedModel, input.resolvedModel))
      ? "allowed"
      : "denied";
  } catch {
    return "unavailable";
  }
}

// A process-local symbol cannot be spoofed by an upstream response body/header.
// Symbol.for preserves marker identity across separately compiled server chunks.
const LOCAL_MODEL_POLICY = Symbol.for("omniroute.local-model-policy-response");

export function markLocalModelPolicyResponse(response: Response): Response {
  Object.defineProperty(response, LOCAL_MODEL_POLICY, { value: true });
  return response;
}

export function isLocalModelPolicyResponse(response: unknown): boolean {
  return (
    response !== null &&
    typeof response === "object" &&
    (response as Record<symbol, unknown>)[LOCAL_MODEL_POLICY] === true
  );
}
