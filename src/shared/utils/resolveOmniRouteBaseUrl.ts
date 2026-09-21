const DEFAULT_OMNIROUTE_BASE_URL = "http://localhost:20128";

type OmniRouteBaseUrlEnv = {
  OMNIROUTE_BASE_URL?: string;
  BASE_URL?: string;
  NEXT_PUBLIC_BASE_URL?: string;
  PORT?: string | number;
  API_PORT?: string | number;
  DASHBOARD_PORT?: string | number;
};

function normalizeBaseUrl(value?: string): string | null {
  const trimmed = value?.trim();
  if (!trimmed) return null;
  return trimmed.replace(/\/+$/, "");
}

export function resolveOmniRouteBaseUrl(env: OmniRouteBaseUrlEnv = process.env): string {
  const port = env.PORT || env.API_PORT || env.DASHBOARD_PORT;
  const fallback = port ? `http://localhost:${port}` : DEFAULT_OMNIROUTE_BASE_URL;

  return (
    normalizeBaseUrl(env.OMNIROUTE_BASE_URL) ||
    normalizeBaseUrl(env.BASE_URL) ||
    normalizeBaseUrl(env.NEXT_PUBLIC_BASE_URL) ||
    fallback
  );
}

export { DEFAULT_OMNIROUTE_BASE_URL };
