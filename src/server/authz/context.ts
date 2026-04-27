import type { AuthSubject, RouteClass, RouteClassification } from "./types";

export interface AuthDecision {
  allow: true;
  subject: AuthSubject;
}

export interface AuthRejection {
  allow: false;
  status: number;
  code: string;
  message: string;
}

export type AuthOutcome = AuthDecision | AuthRejection;

export interface RequestLike {
  method: string;
  headers: Headers;
  cookies?: { get?: (name: string) => { value?: string } | undefined };
  nextUrl?: { pathname?: string | null } | null;
  url?: string;
}

export interface PolicyContext {
  request: RequestLike;
  classification: RouteClassification;
  requestId: string;
}

export interface RoutePolicy {
  readonly routeClass: RouteClass;
  evaluate(ctx: PolicyContext): Promise<AuthOutcome>;
}

export function allow(subject: AuthSubject): AuthDecision {
  return { allow: true, subject };
}

export function reject(status: number, code: string, message: string): AuthRejection {
  return { allow: false, status, code, message };
}
