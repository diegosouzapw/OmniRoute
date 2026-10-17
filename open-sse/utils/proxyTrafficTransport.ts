import { payloadTrafficRecorder } from "@/lib/db/proxyTraffic";
import { meterPayloadAttempt, type PayloadDelta } from "./proxyPayloadMetering.ts";

type TrafficSendOptions = RequestInit & { dispatcher?: unknown; duplex?: string };
type Send = (input: RequestInfo | URL, options?: TrafficSendOptions) => Promise<Response>;
export type TrafficRecorderOverride = (proxy: unknown, delta: PayloadDelta) => void;

/** Wrap the raw send, not a routing/retry function. Each invocation owns its route snapshot. */
export function withPayloadTraffic(
  send: Send,
  proxy: unknown,
  override?: TrafficRecorderOverride
): Send {
  return (input, options = {}) =>
    meterTrafficSend(proxy, input, options, () => send(input, options), override);
}

export function meterTrafficSend(
  proxy: unknown,
  input: unknown,
  options: { body?: unknown; signal?: AbortSignal | null },
  send: () => Promise<Response>,
  override?: TrafficRecorderOverride,
  adapt?: (response: Response) => Promise<Response>
): Promise<Response> {
  const record = override
    ? (delta: PayloadDelta) => override(proxy, delta)
    : payloadTrafficRecorder(proxy);
  return meterPayloadAttempt(send, input, options, record, adapt);
}
