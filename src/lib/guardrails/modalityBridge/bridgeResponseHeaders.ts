import { buildModalityBridgeHeader } from "./bridgeStats";
import { VIDEO_DRILLDOWN_HANDLE_PATTERN } from "../videoBridgeDrilldownHandle";

export type ModalityBridgeResponseHeaders = Partial<
  Record<"x-omniroute-modality-bridge" | "x-omniroute-video-drilldown", string>
>;

export function buildModalityBridgeResponseHeaders(
  results: Array<{
    guardrail: string;
    meta?: Record<string, unknown> | null;
  }>
): ModalityBridgeResponseHeaders | null {
  const headers: ModalityBridgeResponseHeaders = {};
  const modality = buildModalityBridgeHeader(results);
  if (modality) headers["x-omniroute-modality-bridge"] = modality;
  const handles = new Set<string>();
  for (const result of results) {
    if (result.guardrail !== "video-bridge" || !Array.isArray(result.meta?.videoDrilldownHandles))
      continue;
    for (const item of result.meta.videoDrilldownHandles.slice(0, 4)) {
      if (handles.size >= 4) break;
      const handle = item && typeof item === "object" ? item.handle : undefined;
      if (typeof handle === "string" && VIDEO_DRILLDOWN_HANDLE_PATTERN.test(handle))
        handles.add(handle);
    }
  }
  if (handles.size) headers["x-omniroute-video-drilldown"] = [...handles].join(",");
  return Object.keys(headers).length ? headers : null;
}

/** Reuses the response stream; immutable upstream header objects get a shallow response clone. */
export function withModalityBridgeResponseHeaders(
  response: Response,
  value: string | ModalityBridgeResponseHeaders | null
): Response {
  if (!response || !value) return response;
  const headers = typeof value === "string" ? { "x-omniroute-modality-bridge": value } : value;
  try {
    for (const [name, content] of Object.entries(headers)) response.headers.set(name, content);
    return response;
  } catch {
    const cloned = new Response(response.body, {
      status: response.status,
      statusText: response.statusText,
      headers: response.headers,
    });
    for (const [name, content] of Object.entries(headers)) cloned.headers.set(name, content);
    return cloned;
  }
}
