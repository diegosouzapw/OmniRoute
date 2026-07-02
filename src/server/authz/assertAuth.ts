import {
  AUTHZ_HEADER_AUTH_ID,
  AUTHZ_HEADER_AUTH_KIND,
  AUTHZ_HEADER_AUTH_LABEL,
  AUTHZ_HEADER_AUTH_SCOPES,
  AUTHZ_HEADER_ROUTE_CLASS,
} from "./headers";
import type { AuthSubject, RouteClass } from "./types";

export class AuthzAssertionError extends Error {
  readonly status: number;
  readonly code: string;

  constructor(code: string, message: string, status = 500) {
    super(message);
    this.name = "AuthzAssertionError";
    this.code = code;
    this.status = status;
  }
}

type HeaderSource = Headers | { get(name: string): string | null };

function readHeader(source: HeaderSource, name: string): string | null {
  return source.get(name) ?? null;
}

function isHeaderSource(value: unknown): value is HeaderSource {
  if (value instanceof Headers) return true;
  if (typeof value !== "object" || value === null) return false;
  return typeof (value as { get?: unknown }).get === "function";
}

export function readSubjectFromHeaders(headers: HeaderSource): AuthSubject {
  const kind = (readHeader(headers, AUTHZ_HEADER_AUTH_KIND) ?? "anonymous") as AuthSubject["kind"];
  const id = readHeader(headers, AUTHZ_HEADER_AUTH_ID) ?? "anonymous";
  const label = readHeader(headers, AUTHZ_HEADER_AUTH_LABEL) ?? undefined;
  const rawScopes = readHeader(headers, AUTHZ_HEADER_AUTH_SCOPES);
  const scopes = rawScopes
    ? rawScopes
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean)
    : [];
  return { kind, id, label, scopes };
}

export function readRouteClassFromHeaders(headers: HeaderSource): RouteClass | null {
  const raw = readHeader(headers, AUTHZ_HEADER_ROUTE_CLASS);
  if (raw === "PUBLIC" || raw === "CLIENT_API" || raw === "MANAGEMENT") return raw;
  return null;
}

export function assertAuth(
  request: Request | { headers: HeaderSource },
  expected: RouteClass
): AuthSubject {
  const headers = request.headers;

  if (!isHeaderSource(headers)) {
    throw new AuthzAssertionError("AUTHZ_INVALID_REQUEST", "Request headers are unavailable", 500);
  }

  const actualClass = readRouteClassFromHeaders(headers);
  if (!actualClass) {
    throw new AuthzAssertionError(
      "AUTHZ_NOT_INITIALIZED",
      "Request did not pass through the authz middleware",
      500
    );
  }

  if (actualClass !== expected) {
    throw new AuthzAssertionError(
      "AUTHZ_ROUTE_CLASS_MISMATCH",
      `Expected ${expected} but got ${actualClass}`,
      500
    );
  }

  const subject = readSubjectFromHeaders(headers);

  if (expected !== "PUBLIC" && subject.kind === "anonymous") {
    throw new AuthzAssertionError("AUTHZ_UNAUTHENTICATED", "Authentication required", 401);
  }

  return subject;
}
