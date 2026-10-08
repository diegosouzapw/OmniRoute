import { resolveRequestToolIdentity } from "./requestToolIdentity.ts";
import { plaintextCollaborationFields } from "./collaborationPlaintextMarker.ts";

interface FunctionCallItemLike {
  namespace?: string;
  name?: string;
  encrypted_function_args?: unknown[];
  [key: string]: unknown;
}

/**
 * #7936 identity closure: rewrite a function_call item's `name` back to its
 * bare leaf and stamp the original `namespace` alongside it, matching the
 * codex ResponseItem::FunctionCall schema (independent `namespace` field, NOT
 * a `__` split on `name`). #14154: once the identity is restored, also stamp
 * the `encrypted_function_args: []` plaintext-delivery marker Codex requires
 * for collaboration spawn_agent/send_message/followup_task calls.
 *
 * Mutates `funcItem` in place and returns it for convenience at call sites.
 */
export function applyFunctionCallIdentity<T extends FunctionCallItemLike>(
  funcItem: T,
  identityMap: unknown,
  toolName: string
): T {
  const identity = resolveRequestToolIdentity(identityMap, toolName);
  if (identity) {
    funcItem.namespace = identity.namespace;
    funcItem.name = identity.name;
  }
  Object.assign(funcItem, plaintextCollaborationFields(funcItem.namespace, funcItem.name));
  return funcItem;
}
