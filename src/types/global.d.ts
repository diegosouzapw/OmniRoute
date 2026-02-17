/**
 * Global Type Declarations for OmniRoute
 *
 * Ambient declarations for modules and globals that don't ship their own types.
 */

/* ─── Environment Variables ─────────────────────────────── */
declare namespace NodeJS {
  interface ProcessEnv {
    JWT_SECRET?: string;
    INITIAL_PASSWORD?: string;
    AUTH_COOKIE_SECURE?: string;
    PROMPT_CACHE_MAX_SIZE?: string;
    PROMPT_CACHE_TTL_MS?: string;
    NEXT_PUBLIC_CLOUD_URL?: string;
    NODE_ENV?: "development" | "production" | "test";
  }
}

/* ─── Untyped Modules ───────────────────────────────────── */
declare module "node-machine-id" {
  export function machineIdSync(original?: boolean): string;
  export function machineId(original?: boolean): Promise<string>;
}

declare module "fetch-socks" {
  export function socksDispatcher(
    proxy: { type: number; host: string; port: number },
    options?: Record<string, unknown>
  ): import("undici").Dispatcher;
}
