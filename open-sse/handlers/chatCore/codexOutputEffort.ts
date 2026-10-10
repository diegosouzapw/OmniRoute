export function stripCodexOutputEffort(input: {
  provider?: string | null;
  finalModelToUpstream?: unknown;
  translatedBody: Record<string, any>;
  log?: { warn?: (...args: unknown[]) => void };
}) {
  const { provider, finalModelToUpstream, log } = input;
  const translatedBody = input.translatedBody;
  if (provider === "codex" || provider?.startsWith("codex")) {
    const modelName = typeof finalModelToUpstream === "string" ? finalModelToUpstream : "";
    const hasEffortSuffix = modelName.match(/-(low|medium|high|xhigh)$/i);
    if (hasEffortSuffix && translatedBody.output_config && typeof translatedBody.output_config === "object") {
      const oc = translatedBody.output_config as Record<string, unknown>;
      if (oc.effort) {
        log?.warn?.("PARAMS", `Stripped output_config.effort="${oc.effort}" because model "${modelName}" already encodes effort`);
        delete oc.effort;
        if (Object.keys(oc).length === 0) delete translatedBody.output_config;
      }
    }
  }
  return translatedBody;
}
