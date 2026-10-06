/**
 * Agent-features clearing for the combos editor (#399 / #401 / #454, fixed in #12158).
 *
 * `PUT /api/combos/[id]` merges its body over the stored record, so an omitted field
 * means "leave unchanged". Deleting a cleared field from the payload therefore left the
 * previous value in the database: unchecking context cache protection, or emptying the
 * system message or tool filter, never persisted. Only an explicit `null` reaches
 * `updateCombo`'s null-means-delete pass.
 *
 * On create there is nothing to clear, so an empty field is simply absent — the same
 * shape `description` and `context_length` already use in this editor.
 */
export interface AgentFeatureInput {
  systemMessage: string;
  toolFilter: string;
  contextCache: boolean;
  isEdit: boolean;
}

export interface AgentFeaturePatch {
  system_message?: string | null;
  tool_filter_regex?: string | null;
  context_cache_protection?: true | null;
}

export function buildAgentFeaturePatch({
  systemMessage,
  toolFilter,
  contextCache,
  isEdit,
}: AgentFeatureInput): AgentFeaturePatch {
  const patch: AgentFeaturePatch = {};

  const message = systemMessage.trim();
  if (message) patch.system_message = message;
  else if (isEdit) patch.system_message = null;

  const filter = toolFilter.trim();
  if (filter) patch.tool_filter_regex = filter;
  else if (isEdit) patch.tool_filter_regex = null;

  if (contextCache) patch.context_cache_protection = true;
  else if (isEdit) patch.context_cache_protection = null;

  return patch;
}
