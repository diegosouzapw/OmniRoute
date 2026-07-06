import { serve } from '@hono/node-server';
import app from './index';

const port = Number(process.env.PORT ?? 4322);
const socketPath = process.env.OMNIROUTE_BFF_SOCKET;

serve({ fetch: app.fetch, port }, (info) => {
  console.log(`OmniRoute BFF listening on http://localhost:${info.port}`);
});

if (socketPath) {
  // Bun has first-class Unix domain socket support via Bun.serve().
  // The @hono/node-server adapter wraps node:http.Server, which doesn't
  // speak Unix sockets directly. So we use Bun.serve() when running under Bun
  // (i.e. always in this repo), and fall back to a clear error on Node.
  // @ts-expect-error - Bun global is injected by Bun's runtime
  if (typeof Bun !== 'undefined' && typeof Bun.serve === 'function') {
    // @ts-expect-error - Bun global
    Bun.serve({
      unix: socketPath,
      fetch: app.fetch,
      // Bun's unix listener takes the path as `unix: string` (above) OR as `socket: { path }`
    } as { unix: string; fetch: typeof app.fetch });
    console.log(`OmniRoute BFF also listening on Unix socket ${socketPath}`);
  } else {
    console.error(
      `OMNIROUTE_BFF_SOCKET=${socketPath} requested but Bun runtime not detected. ` +
      `Unix sockets in this BFF require bun. Falling back to TCP only.`
    );
  }
}
