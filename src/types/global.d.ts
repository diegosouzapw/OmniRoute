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

declare module "figlet" {
  export default function figlet(
    text: string,
    callback: (err: Error | null, result?: string) => void
  ): void;
  export function textSync(text: string, options?: Record<string, unknown>): string;
}

declare module "gradient-string" {
  interface GradientFunction {
    (text: string): string;
    multiline(text: string): string;
  }
  const gradient: {
    rainbow: GradientFunction;
    cristal: GradientFunction;
    teen: GradientFunction;
    pastel: GradientFunction;
    (colors: string[]): GradientFunction;
    [key: string]: GradientFunction;
  };
  export default gradient;
}

declare module "chalk-animation" {
  interface Animation {
    start(): Animation;
    stop(): Animation;
    replace(text: string): Animation;
  }
  const chalkAnimation: {
    rainbow(text: string): Animation;
    pulse(text: string): Animation;
    glitch(text: string): Animation;
    radar(text: string): Animation;
    neon(text: string): Animation;
    karaoke(text: string): Animation;
  };
  export default chalkAnimation;
}

declare module "chalk" {
  interface ChalkInstance {
    (text: string): string;
    bold: ChalkInstance;
    dim: ChalkInstance;
    italic: ChalkInstance;
    underline: ChalkInstance;
    red: ChalkInstance;
    green: ChalkInstance;
    yellow: ChalkInstance;
    blue: ChalkInstance;
    magenta: ChalkInstance;
    cyan: ChalkInstance;
    white: ChalkInstance;
    gray: ChalkInstance;
    hex(color: string): ChalkInstance;
    rgb(r: number, g: number, b: number): ChalkInstance;
    bgRed: ChalkInstance;
    bgGreen: ChalkInstance;
    bgYellow: ChalkInstance;
    bgBlue: ChalkInstance;
  }
  const chalk: ChalkInstance;
  export default chalk;
}
