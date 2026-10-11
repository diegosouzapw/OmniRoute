import { getHiddenChatModels } from "@/lib/hiddenChatModels";
import { createHiddenModelLookup } from "@/lib/hiddenModelLookup";
import { errorResponse } from "@omniroute/open-sse/utils/error.ts";

type ModelGate = (targets: Iterable<string>) => Promise<Response | null>;

/** Preserve authorization precedence at both initial and final dispatch gates. */
export function withHiddenModelGate(authorize: ModelGate): ModelGate {
  let isHidden: ReturnType<typeof createHiddenModelLookup> | undefined;
  return async (targets) => {
    const resolvedTargets = [...targets];
    const denied = await authorize(resolvedTargets);
    if (denied) return denied;
    isHidden ??= createHiddenModelLookup(await getHiddenChatModels());
    for (const target of resolvedTargets) {
      const separator = target.indexOf("/");
      const provider = target.slice(0, separator);
      const model = target.slice(separator + 1);
      if (separator > 0 && isHidden(provider, model)) {
        return errorResponse(404, "Model not found", {
          code: "model_not_found",
          type: "invalid_request_error",
        });
      }
    }
    return null;
  };
}
