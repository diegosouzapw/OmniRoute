"use strict";

const http = require("node:http");

const DEFAULT_TRACE_ALLOW = "GET, HEAD, POST, PUT, PATCH, DELETE, OPTIONS";
const TRACE_ALLOW_RULES = [
  [/^\/api\/auth\/login\/?$/, "POST"],
  [/^\/api\/auth\/logout\/?$/, "POST"],
  [/^\/api\/keys\/?$/, "GET, POST"],
  [/^\/api\/keys\/[^/]+\/?$/, "GET, PATCH, DELETE"],
];

let installed = false;

function getPathname(req) {
  const rawUrl = typeof req?.url === "string" && req.url ? req.url : "/";
  try {
    return new URL(rawUrl, "http://localhost").pathname;
  } catch {
    return rawUrl.split("?")[0] || "/";
  }
}

function getAllowHeader(pathname) {
  for (const [pattern, allow] of TRACE_ALLOW_RULES) {
    if (pattern.test(pathname)) return allow;
  }
  return DEFAULT_TRACE_ALLOW;
}

function maybeHandleDisallowedTrace(req, res) {
  if (req?.method !== "TRACE") return false;

  const allow = getAllowHeader(getPathname(req));
  res.statusCode = 405;
  res.setHeader("Allow", allow);
  res.setHeader("Cache-Control", "no-store");
  res.setHeader("Content-Type", "application/json; charset=utf-8");
  res.end(
    JSON.stringify({
      error: {
        code: "METHOD_NOT_ALLOWED",
        message: "TRACE is not allowed",
      },
    })
  );
  return true;
}

function wrapRequestListenerWithMethodGuard(listener) {
  return function methodGuardRequestHandler(req, res) {
    if (maybeHandleDisallowedTrace(req, res)) return;
    return listener.call(this, req, res);
  };
}

function installHttpMethodGuard() {
  if (installed) return;
  installed = true;

  const originalCreateServer = http.createServer.bind(http);
  http.createServer = function createServerWithMethodGuard(...args) {
    const lastFnIdx = args.map((arg) => typeof arg === "function").lastIndexOf(true);
    if (lastFnIdx >= 0) {
      args[lastFnIdx] = wrapRequestListenerWithMethodGuard(args[lastFnIdx]);
    }
    return originalCreateServer(...args);
  };
}

module.exports = {
  getAllowHeader,
  maybeHandleDisallowedTrace,
  wrapRequestListenerWithMethodGuard,
  installHttpMethodGuard,
};
