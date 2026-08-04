"use strict";

const http = require("node:http");

const HIGH_RISK_METHOD_RULES = [
  [/^\/api\/auth\/login\/?$/, ["POST"]],
  [/^\/api\/auth\/logout\/?$/, ["POST"]],
  [/^\/api\/keys\/?$/, ["GET", "POST"]],
  [/^\/api\/keys\/[^/]+\/?$/, ["GET", "PATCH", "DELETE"]],
  [/^\/api\/keys\/[^/]+\/devices\/?$/, ["GET"]],
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

function getAllowedMethods(pathname) {
  for (const [pattern, methods] of HIGH_RISK_METHOD_RULES) {
    if (pattern.test(pathname)) return methods;
  }
  return null;
}

function getAllowHeader(pathname) {
  const methods = getAllowedMethods(pathname);
  return methods ? methods.join(", ") : null;
}

// Methods undici/fetch cannot represent: Next's middleware adapter throws
// `TypeError: 'TRACE' HTTP method is unsupported.` while building the Request,
// which surfaces as an unhandled 500 on EVERY route (caught by the dast-smoke
// Schemathesis negative tests). Reject them up-front with a clean 405.
const UNSUPPORTED_METHODS = new Set(["TRACE", "TRACK", "CONNECT"]);

function maybeHandleDisallowedMethod(req, res) {
  const method = typeof req?.method === "string" ? req.method.toUpperCase() : "";
  const pathname = getPathname(req);
  if (UNSUPPORTED_METHODS.has(method)) {
    res.statusCode = 405;
    res.setHeader("Allow", getAllowHeader(pathname) || "GET, POST, OPTIONS");
    res.setHeader("Cache-Control", "no-store");
    res.setHeader("Content-Type", "application/json; charset=utf-8");
    res.end(
      JSON.stringify({
        error: {
          code: "METHOD_NOT_ALLOWED",
          message: `${method} is not allowed`,
        },
      })
    );
    return true;
  }
  const methods = getAllowedMethods(pathname);
  if (!methods || method === "OPTIONS" || methods.includes(method)) return false;

  res.statusCode = 405;
  res.setHeader("Allow", methods.join(", "));
  res.setHeader("Cache-Control", "no-store");
  res.setHeader("Content-Type", "application/json; charset=utf-8");
  res.end(
    JSON.stringify({
      error: {
        code: "METHOD_NOT_ALLOWED",
        message: `${method || "Method"} is not allowed`,
      },
    })
  );
  return true;
}

function wrapRequestListenerWithMethodGuard(listener) {
  return function methodGuardRequestHandler(req, res) {
    if (maybeHandleDisallowedMethod(req, res)) return;
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
  maybeHandleDisallowedMethod,
  wrapRequestListenerWithMethodGuard,
  installHttpMethodGuard,
};
