/** Callback contracts for the stream controller lifecycle. */
type StreamDisconnectEvent = {
  reason: string;
  duration: number;
};

type StreamErrorEvent = {
  error: unknown;
  message: string;
  statusCode: number;
  duration: number;
};

export type StreamControllerOptions = {
  onDisconnect?: (event: StreamDisconnectEvent) => boolean | void;
  onError?: (event: StreamErrorEvent) => boolean | void;
  provider?: string;
  model?: string;
  connectionId?: string | null;
  pendingRequestId?: string | null;
  clientResponseFormat?: string | null;
  clientAbortSignal?: AbortSignal | null;
  allowCompletedToolHandoffGrace?: boolean;
  clientDisconnectGracePeriodMs?: number;
};
