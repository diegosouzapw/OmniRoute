import { isProviderCircuitOpenResult } from "@omniroute/open-sse/services/combo/comboPredicates.ts";
import { classifyProviderBreakerResult } from "./chatPredicates";

type ProbeDispatch = {
  success?: boolean;
  status: number;
  response?: Response;
  errorCode?: string | null;
  errorType?: string | null;
  error?: unknown;
};

/** An acquired probe uses the ordinary upstream policy but ignores local refusals. */
export function classifyProviderProbeResult(
  value: ProbeDispatch | { result: ProbeDispatch }
): "success" | "failure" | "ignore" {
  const result = "result" in value ? value.result : value;
  if (
    isProviderCircuitOpenResult(
      result.response ?? {},
      String(result.errorCode ?? result.error ?? "")
    )
  ) {
    return "ignore";
  }
  return classifyProviderBreakerResult(result, false, false);
}
