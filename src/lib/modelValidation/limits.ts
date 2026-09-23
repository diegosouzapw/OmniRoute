export function deadline(parent: AbortSignal, milliseconds: number) {
  const controller = new AbortController();
  const timer = setTimeout(
    () => controller.abort(new DOMException("Validation timed out", "TimeoutError")),
    milliseconds
  );
  timer.unref();
  return { signal: AbortSignal.any([parent, controller.signal]), clear: () => clearTimeout(timer) };
}

export async function abortable<T>(promise: Promise<T>, signal: AbortSignal): Promise<T> {
  signal.throwIfAborted();
  let listener: () => void;
  const aborted = new Promise<never>((_, reject) => {
    listener = () => reject(signal.reason);
    signal.addEventListener("abort", listener, { once: true });
  });
  try {
    return await Promise.race([promise, aborted]);
  } finally {
    signal.removeEventListener("abort", listener!);
  }
}
