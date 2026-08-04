/**
 * API utility functions for making HTTP requests
 */

const DEFAULT_HEADERS: Record<string, string> = {
  "Content-Type": "application/json",
};

interface ApiOptions extends RequestInit {
  headers?: Record<string, string>;
}

export async function get(url: string, options: ApiOptions = {}) {
  const response = await fetch(url, {
    ...options,
    method: "GET",
    headers: { ...DEFAULT_HEADERS, ...options.headers },
  });
  return handleResponse(response);
}

export async function post(url: string, data: unknown, options: ApiOptions = {}) {
  const response = await fetch(url, {
    ...options,
    method: "POST",
    headers: { ...DEFAULT_HEADERS, ...options.headers },
    body: JSON.stringify(data),
  });
  return handleResponse(response);
}

export async function put(url: string, data: unknown, options: ApiOptions = {}) {
  const response = await fetch(url, {
    ...options,
    method: "PUT",
    headers: { ...DEFAULT_HEADERS, ...options.headers },
    body: JSON.stringify(data),
  });
  return handleResponse(response);
}

export async function del(url: string, options: ApiOptions = {}) {
  const response = await fetch(url, {
    ...options,
    method: "DELETE",
    headers: { ...DEFAULT_HEADERS, ...options.headers },
  });
  return handleResponse(response);
}

/**
 * Safely read a fetch `Response` body. Returns the parsed JSON when the body is
 * JSON, the raw text when it is not, or `null` when empty. Never throws on a
 * non-JSON body — a plain-text `500 Internal Server Error` no longer surfaces to
 * the caller as `Unexpected token 'I'…`. (#1318) The body is read exactly once,
 * so pass the returned value to {@link getErrorMessage} rather than re-reading
 * the response.
 */
export async function parseResponseBody(response: Response): Promise<unknown> {
  const text = await response.text();
  if (!text) return null;
  try {
    return JSON.parse(text);
  } catch {
    return text;
  }
}

/**
 * Extract a human-readable error message from an already-parsed response body
 * (see {@link parseResponseBody}), regardless of whether it is a JSON object
 * (`{ error }` / `{ error: { message } }` / `{ message }`) or plain text. Falls
 * back to a status-qualified default. (#1318)
 */
export function getErrorMessage(
  body: unknown,
  status?: number,
  fallback = "Request failed"
): string {
  if (body && typeof body === "object") {
    const rec = body as Record<string, unknown>;
    const err = rec.error;
    if (typeof err === "string" && err.trim()) return err;
    if (err && typeof err === "object") {
      const message = (err as Record<string, unknown>).message;
      if (typeof message === "string" && message.trim()) return message;
      return JSON.stringify(err);
    }
    const msg = rec.message ?? rec.detail;
    if (typeof msg === "string" && msg.trim()) return msg;
  }
  if (typeof body === "string" && body.trim()) {
    return body.length > 300 ? `${body.slice(0, 300)}…` : body;
  }
  return status != null ? `${fallback} (HTTP ${status})` : fallback;
}

async function handleResponse(response: Response) {
  const data = await parseResponseBody(response);

  if (!response.ok) {
    const error: any = new Error(getErrorMessage(data, response.status, "An error occurred"));
    error.status = response.status;
    error.data = data;
    throw error;
  }

  return data;
}

const api = { get, post, put, del };
export default api;
