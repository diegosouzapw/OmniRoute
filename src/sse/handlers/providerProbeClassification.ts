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
  value: ProbeDispatch | { result: ProbeDispatch },
  provider?: string | null
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
  // `provider` keeps provider-specific local failures (e.g. a ChatGPT Web browser
  // bridge that did not load) from re-opening the breaker on a HALF_OPEN probe.
  return classifyProviderBreakerResult(result, false, false, provider);
}
