import { getRuntimePorts } from "@/lib/runtime/ports";

export type TunnelPhase =
  | "unsupported"
  | "not_installed"
  | "stopped"
  | "needs_auth"
  | "starting"
  | "running"
  | "error";

export type NgrokTunnelStatus = {
  supported: boolean;
  installed: boolean;
  running: boolean;
  publicUrl: string | null;
  apiUrl: string | null;
  targetUrl: string;
  phase: TunnelPhase;
  lastError: string | null;
};

// Next.js hot-reloading safe global storage for the listener
const globalForNgrok = globalThis as unknown as {
  __ngrokListener: any;
};

let startPromise: Promise<NgrokTunnelStatus> | null = null;

function getLocalTargetUrl() {
  const { apiPort } = getRuntimePorts();
  return `http://127.0.0.1:${apiPort}`;
}

function getTunnelApiUrl(publicUrl: string | null) {
  return publicUrl ? `${publicUrl.replace(/\/$/, "")}/v1` : null;
}

export async function getNgrokTunnelStatus(): Promise<NgrokTunnelStatus> {
  const targetUrl = getLocalTargetUrl();
  const tokenAvailable = !!(
    process.env.NGROK_AUTHTOKEN && process.env.NGROK_AUTHTOKEN.trim() !== ""
  );
  const listener = globalForNgrok.__ngrokListener;
  let currentUrl = null;

  if (listener) {
    try {
      currentUrl = typeof listener.url === "function" ? listener.url() : listener.url;
    } catch {
      // Ignored
    }
  }

  return {
    supported: true,
    installed: true,
    running: currentUrl !== null,
    publicUrl: currentUrl || null,
    apiUrl: currentUrl ? getTunnelApiUrl(currentUrl) : null,
    targetUrl,
    phase: currentUrl === null ? (tokenAvailable ? "stopped" : "needs_auth") : "running",
    lastError: null,
  };
}

export async function startNgrokTunnel(inputAuthToken?: string): Promise<NgrokTunnelStatus> {
  const current = await getNgrokTunnelStatus();
  if (current.running) return current;
  if (startPromise) return startPromise;

  startPromise = (async () => {
    try {
      const authToken =
        inputAuthToken && inputAuthToken.trim() !== ""
          ? inputAuthToken.trim()
          : process.env.NGROK_AUTHTOKEN;

      if (!authToken) {
        return {
          ...(await getNgrokTunnelStatus()),
          phase: "needs_auth",
          lastError: "An ngrok authtoken is required.",
        };
      }

      // Dynamically import ngrok so it doesn't break environments where native build fails if not used
      const ngrok = await import("@ngrok/ngrok");

      const targetUrl = getLocalTargetUrl();
      const listenerOptions: any = { addr: targetUrl };

      if (!inputAuthToken && process.env.NGROK_AUTHTOKEN) {
        listenerOptions.authtoken_from_env = true;
      } else {
        listenerOptions.authtoken = authToken;
      }

      const listener = await ngrok.forward(listenerOptions);
      globalForNgrok.__ngrokListener = listener;

      let url = null;
      try {
        url = typeof listener.url === "function" ? listener.url() : listener.url;
      } catch {
        // Ignored
      }

      if (!url) {
        await stopNgrokTunnel();
        throw new Error("ngrok did not return a public URL.");
      }

      return await getNgrokTunnelStatus();
    } catch (error) {
      return {
        ...(await getNgrokTunnelStatus()),
        phase: "error",
        lastError: error instanceof Error ? error.message : String(error),
      };
    } finally {
      startPromise = null;
    }
  })();

  return startPromise;
}

export async function stopNgrokTunnel(): Promise<NgrokTunnelStatus> {
  const listener = globalForNgrok.__ngrokListener;
  if (listener) {
    try {
      if (typeof listener.close === "function") {
        await listener.close();
      }
    } catch (e) {
      // Ignore close errors
    }
    globalForNgrok.__ngrokListener = undefined;
  }
  return await getNgrokTunnelStatus();
}
