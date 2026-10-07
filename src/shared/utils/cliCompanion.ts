import type { ToolBatchStatus } from "@/shared/types/cliBatchStatus";

export interface CompanionTarget {
  id: string;
  name: string;
  configure: boolean;
  run: boolean;
  requiresModel: boolean;
}

interface ManifestTarget {
  description: string;
  configure: boolean;
  run: boolean;
  runModel?: Readonly<{ flag: string; prefix?: string; required?: boolean }> | null;
}

export function projectCompanionTargets(
  manifest: Record<string, ManifestTarget>,
  catalog: Record<string, { name: string }>
): CompanionTarget[] {
  return Object.entries(manifest)
    .filter(([, entry]) => entry.configure || entry.run)
    .map(([id, entry]) => ({
      id,
      name: catalog[id]?.name || entry.description,
      configure: entry.configure,
      run: entry.run,
      requiresModel: entry.runModel?.required === true,
    }));
}

// Intentionally accept a small portable literal subset; never interpolate shell syntax.
export const validCompanionContext = (value: string): boolean =>
  value === "" || /^[a-zA-Z0-9][a-zA-Z0-9._-]{0,63}$/.test(value);
export const validCompanionModel = (value: string): boolean =>
  /^[a-zA-Z0-9][a-zA-Z0-9._:/-]{0,199}$/.test(value);

export function buildCompanionCommands(target: CompanionTarget, context: string, model: string) {
  const commands: { contexts: string; configure?: string; run?: string } = {
    contexts: "omniroute contexts list\nomniroute contexts current",
  };
  if (!/^[a-z0-9][a-z0-9-]*$/.test(target.id) || !validCompanionContext(context)) return commands;
  const suffix = context ? ` --context ${context}` : "";
  if (target.configure) commands.configure = `omniroute configure ${target.id}${suffix}`;
  if (target.run && (!target.requiresModel || validCompanionModel(model))) {
    const modelArg = target.requiresModel ? ` --model ${model}` : "";
    commands.run = `omniroute run ${target.id}${suffix}${modelArg} --dry-run`;
  }
  return commands;
}

export function companionStatus(
  status: ToolBatchStatus | undefined,
  loading: boolean,
  error: boolean
) {
  if (loading) return { detection: "loading", runtime: "loading", configuration: "loading" };
  if (error || status?.error)
    return { detection: "error", runtime: "error", configuration: "error" };
  if (!status) return { detection: "unknown", runtime: "unknown", configuration: "unknown" };
  const configuration: Partial<Record<ToolBatchStatus["config"]["status"], string>> = {
    configured: "configured",
    not_configured: "notConfigured",
  };
  return {
    detection: status.detection.installed ? "detected" : "notDetected",
    runtime: status.detection.runnable ? "runnable" : "notRunnable",
    configuration: configuration[status.config.status] || "unknown",
  };
}
