interface QueueItem<T> {
  byteSize: number;
  execute: (signal?: AbortSignal) => Promise<T>;
  reject: (error: Error) => void;
  resolve: (value: T) => void;
  signal?: AbortSignal;
  abortListener?: () => void;
}

export interface VideoExtractionQueue {
  run<T>(
    byteSize: number,
    execute: (signal?: AbortSignal) => Promise<T>,
    signal?: AbortSignal
  ): Promise<T>;
}

export type VideoExtractionQueueErrorCode = "CLIENT_ABORTED" | "QUEUE_CAPACITY";

export class VideoExtractionQueueError extends Error {
  constructor(
    readonly code: VideoExtractionQueueErrorCode,
    message: string
  ) {
    super(message);
    this.name = "VideoExtractionQueueError";
  }
}

function abortError(): VideoExtractionQueueError {
  return new VideoExtractionQueueError("CLIENT_ABORTED", "Video extraction request aborted");
}

export function createVideoExtractionQueue(options: {
  concurrency: number;
  maxPending: number;
  maxQueuedBytes: number;
}): VideoExtractionQueue {
  let active = 0;
  let queuedBytes = 0;
  const pending: Array<QueueItem<unknown>> = [];

  const pump = (): void => {
    while (active < options.concurrency && pending.length > 0) {
      const item = pending.shift()!;
      queuedBytes -= item.byteSize;
      if (item.abortListener) item.signal?.removeEventListener("abort", item.abortListener);
      if (item.signal?.aborted) {
        item.reject(abortError());
        continue;
      }
      active += 1;
      void item
        .execute(item.signal)
        .then(item.resolve, item.reject)
        .finally(() => {
          active -= 1;
          pump();
        });
    }
  };

  return {
    run<T>(
      byteSize: number,
      execute: (signal?: AbortSignal) => Promise<T>,
      signal?: AbortSignal
    ): Promise<T> {
      if (!Number.isInteger(byteSize) || byteSize < 0) {
        return Promise.reject(new Error("Video extraction byte size is invalid"));
      }
      if (signal?.aborted) return Promise.reject(abortError());
      if (pending.length >= options.maxPending || queuedBytes + byteSize > options.maxQueuedBytes) {
        return Promise.reject(
          new VideoExtractionQueueError(
            "QUEUE_CAPACITY",
            "Video extraction queue capacity exceeded"
          )
        );
      }
      return new Promise<T>((resolve, reject) => {
        const item: QueueItem<T> = { byteSize, execute, reject, resolve, signal };
        item.abortListener = () => {
          const index = pending.indexOf(item as QueueItem<unknown>);
          if (index < 0) return;
          pending.splice(index, 1);
          queuedBytes -= item.byteSize;
          reject(abortError());
          pump();
        };
        signal?.addEventListener("abort", item.abortListener, { once: true });
        pending.push(item as QueueItem<unknown>);
        queuedBytes += byteSize;
        pump();
      });
    },
  };
}
