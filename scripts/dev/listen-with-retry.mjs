// scripts/dev/listen-with-retry.mjs
// net.Server.listen with a bounded EADDRINUSE retry.
//
// The dev server binds its port only AFTER next prepare() (~15-18s), while test
// harnesses pick the port with a bind(0)-release at module load. Anything that
// claims the port inside that window (the previous test file's server still
// tearing down, a leftover process) used to kill the boot with EADDRINUSE and
// red the whole integration job. The conflicts this window actually produces
// are transient, so retry; a port that is still busy after the last attempt
// rejects with the original error, so a genuine conflict still fails loudly.

/**
 * Listen on `port`/`host`, retrying while the error is EADDRINUSE.
 *
 * @param {import("node:net").Server} server
 * @param {{ port: number, host?: string, attempts?: number, delayMs?: number,
 *           log?: (msg: string) => void }} options
 *   `attempts` is the total number of tries (default 6 — 1 try + 5 retries).
 * @returns {Promise<import("node:net").AddressInfo | string | null>} the bound
 *   address (post-listen errors are the caller's business again).
 */
export function listenWithRetry(server, options) {
  const { port, host, attempts = 6, delayMs = 5000, log = console.warn } = options;
  let triesLeft = attempts;
  return new Promise((resolve, reject) => {
    const listen = () => {
      const onListen = () => {
        cleanup();
        resolve(server.address());
      };
      const onError = (error) => {
        cleanup();
        triesLeft -= 1;
        if (error?.code !== "EADDRINUSE" || triesLeft <= 0) {
          reject(error);
          return;
        }
        log(
          `[listen] port ${port} busy (EADDRINUSE) — retrying in ${delayMs}ms (${triesLeft} attempt(s) left)`
        );
        setTimeout(listen, delayMs);
      };
      const cleanup = () => {
        server.removeListener("listening", onListen);
        server.removeListener("error", onError);
      };
      server.once("listening", onListen);
      server.once("error", onError);
      server.listen(port, host);
    };
    listen();
  });
}
