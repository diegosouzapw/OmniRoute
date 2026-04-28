import {
  PUBLIC_API_ROUTE_PREFIXES,
  PUBLIC_READONLY_API_ROUTE_PREFIXES,
  PUBLIC_READONLY_METHODS,
} from "../../shared/constants/publicApiRoutes";
import type { ClassificationReason, RouteClass, RouteClassification } from "./types";

const CLIENT_API_ALIAS_PREFIXES: ReadonlyArray<{ alias: string; canonical: string }> = [
  { alias: "/chat/completions", canonical: "/api/v1/chat/completions" },
  { alias: "/responses", canonical: "/api/v1/responses" },
  { alias: "/models", canonical: "/api/v1/models" },
];

function normalizePathname(rawPath: string): { path: string; reason?: ClassificationReason } {
  let path = rawPath || "/";
  if (!path.startsWith("/")) path = "/" + path;
  if (path.length > 1 && path.endsWith("/")) path = path.slice(0, -1);

  if (path === "/codex" || path.startsWith("/codex/")) {
    return { path: "/api/v1/responses", reason: "client_api_codex_alias" };
  }

  if (path === "/v1/v1" || path.startsWith("/v1/v1/")) {
    const tail = path.slice("/v1/v1".length) || "";
    return { path: "/api/v1" + tail, reason: "client_api_double_prefix" };
  }

  if (path === "/v1" || path.startsWith("/v1/")) {
    const tail = path.slice("/v1".length) || "";
    return { path: "/api/v1" + tail, reason: "client_api_alias" };
  }

  for (const { alias, canonical } of CLIENT_API_ALIAS_PREFIXES) {
    if (path === alias) {
      return { path: canonical, reason: "client_api_alias" };
    }
    if (path.startsWith(alias + "/")) {
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
  if (!PUBLIC_READONLY_METHODS.has(String(method).toUpperCase())) return false;
  return PUBLIC_READONLY_API_ROUTE_PREFIXES.some((p) => path.startsWith(p));
}

function isClassifiedAsPublic(path: string, method: string): boolean {
  const isV1ApiPrefix = (p: string) =>
    p === "/api/v1" || p === "/api/v1/" || p.startsWith("/api/v1/");
  const filtered = PUBLIC_API_ROUTE_PREFIXES.filter((p) => p !== "/api/v1/");
  if (filtered.some((prefix) => path.startsWith(prefix)) && !isV1ApiPrefix(path)) {
    return true;
  }
  return matchesReadonlyPublic(path, method);
}

export function isClientApi(routeClass: RouteClass): boolean {
  return routeClass === "CLIENT_API";
}

export function isManagement(routeClass: RouteClass): boolean {
  return routeClass === "MANAGEMENT";
}

export function isPublic(routeClass: RouteClass): boolean {
  return routeClass === "PUBLIC";
}
