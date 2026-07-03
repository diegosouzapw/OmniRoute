export const OMNIROUTE_API_BASE = 'http://localhost:20128/api';

export type ApiRecord = Record<string, unknown>;

export type ServerStatus = ApiRecord & {
  status?: string;
  state?: string;
  version?: string;
};

export type Provider = ApiRecord & {
  id?: string;
  name?: string;
  provider?: string;
  enabled?: boolean;
  active?: boolean;
  connected?: boolean;
};

export type Combo = ApiRecord & {
  id?: string;
  name?: string;
  strategy?: string;
  models?: unknown[];
  targets?: unknown[];
  providers?: unknown[];
};

export type ComboMetrics = Record<string, string | number | boolean | null | undefined>;

export class ApiError extends Error {
  constructor(
    message: string,
    readonly status: number,
    readonly details?: unknown
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

type FetchOptions = RequestInit & {
  timeoutMs?: number;
};

export async function omniFetch<T>(path: string, options: FetchOptions = {}): Promise<T> {
  const { timeoutMs = 8000, ...fetchOptions } = options;
  const controller = new AbortController();
  const timeout = window.setTimeout(() => controller.abort(), timeoutMs);

  try {
    const response = await fetch(`${OMNIROUTE_API_BASE}${path}`, {
      ...fetchOptions,
      headers: {
        accept: 'application/json',
        ...fetchOptions.headers
      },
      signal: controller.signal
    });

    const contentType = response.headers.get('content-type') ?? '';
    const body = contentType.includes('application/json') ? await response.json() : await response.text();

    if (!response.ok) {
      throw new ApiError(`OmniRoute API request failed for ${path}`, response.status, body);
    }

    return body as T;
  } catch (error) {
    if (error instanceof ApiError) throw error;
    if (error instanceof DOMException && error.name === 'AbortError') {
      throw new ApiError(`OmniRoute API request timed out for ${path}`, 408);
    }
    throw error;
  } finally {
    window.clearTimeout(timeout);
  }
}

export const getStatus = () => omniFetch<ServerStatus>('/v1/status');

export const getProviders = () =>
  omniFetch<Provider[] | { data?: Provider[]; providers?: Provider[] }>('/v1/providers');

export const getCombos = () => omniFetch<Combo[] | { data?: Combo[]; combos?: Combo[] }>('/combos');

export const getComboMetrics = () => omniFetch<ComboMetrics>('/combos/metrics');
