import {
  isPublicApiRoute,
  isPublicReadonlyCorsRoute,
} from "../../shared/constants/publicApiRoutes";
import type { ClassificationReason, RouteClassification } from "./types";

const CLIENT_API_ALIAS_PREFIXES: ReadonlyArray<{ alias: string; canonical: string }> = [
  { alias: "/chat/completions", canonical: "/api/v1/chat/completions" },
  { alias: "/responses", canonical: "/api/v1/responses" },
  { alias: "/models", canonical: "/api/v1/models" },
];

function normalizePathname(rawPath: string): { path: string; reason?: ClassificationReason } {
  let path = rawPath || "/";
  if (!path.startsWith("/")) path = "/" + path;
  if (path.length > 1 && path.endsWith("/")) path = path.slice(0, -1);

  // Client-API aliases are matched case-insensitively on the control segment.
  // Next's rewrite layer accepts `/V1/...`, `/CODEX`, etc. and routes them to
  // the client handler, so the classifier must recognize the same casing —
  // otherwise an uppercase alias falls through to the management fallback and
  // the request is treated as a different route class than it is actually
  // dispatched to (GHSA-jvqc-mp9f-q936). Only the leading control segment is
  // lowercased for detection; the original-case tail is preserved.
  const lower = path.toLowerCase();

  if (lower === "/codex" || lower.startsWith("/codex/")) {
    return { path: "/api/v1/responses", reason: "client_api_codex_alias" };
  }

  if (lower === "/v1/v1" || lower.startsWith("/v1/v1/")) {
    const tail = path.slice("/v1/v1".length) || "";
    return { path: "/api/v1" + tail, reason: "client_api_double_prefix" };
  }

  if (lower === "/v1beta" || lower.startsWith("/v1beta/")) {
    const tail = path.slice("/v1beta".length) || "";
    return { path: "/api/v1beta" + tail, reason: "client_api_alias" };
  }

  if (lower === "/v1" || lower.startsWith("/v1/")) {
    const tail = path.slice("/v1".length) || "";
    return { path: "/api/v1" + tail, reason: "client_api_alias" };
  }

  for (const { alias, canonical } of CLIENT_API_ALIAS_PREFIXES) {
    if (lower === alias) {
      return { path: canonical, reason: "client_api_alias" };
    }
    if (lower.startsWith(alias + "/")) {
      return { path: canonical + path.slice(alias.length), reason: "client_api_alias" };
    }
  }

  return { path };
}

export function classifyRoute(rawPath: string, method: string = "GET"): RouteClassification {
  const { path: normalizedPath, reason: aliasReason } = normalizePathname(rawPath);

  if (normalizedPath === "/" || normalizedPath === "") {
    return {
      routeClass: "MANAGEMENT",
      reason: "root_redirect",
      normalizedPath: "/",
    };
  }

  if (normalizedPath === "/dashboard/onboarding") {
    return {
      routeClass: "PUBLIC",
      reason: "setup_wizard",
      normalizedPath,
    };
  }

  // Public, ticket-gated device-flow connect pages (e.g. /connect/codex/{token}).
  // Anyone with the shared link completes the provider login in their own browser.
  if (normalizedPath === "/connect" || normalizedPath.startsWith("/connect/")) {
    return {
      routeClass: "PUBLIC",
      reason: "public_connect_page",
      normalizedPath,
    };
  }

  if (normalizedPath.startsWith("/dashboard")) {
    return {
      routeClass: "MANAGEMENT",
      reason: "dashboard_prefix",
      normalizedPath,
    };
  }

  if (normalizedPath === "/api/v1" || normalizedPath.startsWith("/api/v1/")) {
    return {
      routeClass: "CLIENT_API",
      reason: aliasReason ?? "client_api_v1",
      normalizedPath,
    };
  }

  if (normalizedPath === "/api/v1beta" || normalizedPath.startsWith("/api/v1beta/")) {
    return {
      routeClass: "CLIENT_API",
      reason: aliasReason ?? "client_api_v1",
      normalizedPath,
    };
  }

  if (normalizedPath.startsWith("/api/")) {
    if (isClassifiedAsPublic(normalizedPath, method)) {
      return {
        routeClass: "PUBLIC",
        reason: matchesReadonlyPublic(normalizedPath, method)
          ? "public_readonly_prefix"
          : "public_prefix",
        normalizedPath,
      };
    }

    return {
      routeClass: "MANAGEMENT",
      reason: "management_api",
      normalizedPath,
    };
  }

  return {
    routeClass: "MANAGEMENT",
    reason: "fallback_management",
    normalizedPath,
  };
}

function matchesReadonlyPublic(path: string, method: string): boolean {
  // Exact match, not startsWith: a prefix here would hand the CORS origin
  // relaxation to every adjacent path too (GHSA-74g9-q8f6-793h).
  return isPublicReadonlyCorsRoute(path, method);
}

function isClassifiedAsPublic(path: string, method: string): boolean {
  return isPublicApiRoute(path, method);
}
