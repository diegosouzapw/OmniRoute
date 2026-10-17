/**
 * Execute immediate per-connection model discovery with bounded concurrency.
 * Unlike Promise.allSettled(ids.map(run)), this never starts every upstream
 * /models call in the same event-loop tick for providers with many accounts.
 * Each result stays in input order; one upstream failure never blocks the rest.
 */
export async function settleBoundedSyncRequests(
  ids: readonly string[],
  run: (connectionId: string) => Promise<void>,
  maxConcurrent = 2
): Promise<PromiseSettledResult<void>[]> {
  if (!Number.isSafeInteger(maxConcurrent) || maxConcurrent < 1) {
    throw new RangeError("maxConcurrent must be a positive integer");
  }
  const results: PromiseSettledResult<void>[] = new Array(ids.length);
  let nextIndex = 0;
  const worker = async (): Promise<void> => {
    while (nextIndex < ids.length) {
      const index = nextIndex++;
      try {
        await run(ids[index]);
        results[index] = { status: "fulfilled", value: undefined };
      } catch (reason) {
        results[index] = { status: "rejected", reason };
      }
    }
  };
  await Promise.all(Array.from(
    { length: Math.min(maxConcurrent, ids.length) }, () => worker()
  ));
  return results;
}
