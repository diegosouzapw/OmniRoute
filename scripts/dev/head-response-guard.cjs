"use strict";

/**
 * HEAD response guard (#6400).
 *
 * RFC 9110 §9.3.2 requires a HEAD response to carry the same headers/status a
 * GET would, with ZERO body, and the connection should not leave the client
 * guessing about when the (bodyless) response is actually finished.
 *
 * Next.js 16 handles this correctly for App Router *route handlers*
 * (`route.ts` exporting `GET`) — `next/dist/server/send-response.js` explicitly
 * skips piping the `Response.body` when `req.method === 'HEAD'`. But Next's
 * *page*-rendering pipeline (`next/dist/server/pipe-readable.js` ->
 * `pipeToNodeResponse`, used for every app-router page/layout render — the
 * root page, the `not-found` boundary that unmatched paths fall through to,
 * dashboard pages, etc.) has NO such check: it always pipes the fully
 * rendered body to the HTTP response regardless of method. Combined with
 * Node's default keep-alive framing, a HEAD request to any page-rendered path
 * ends up with the socket only settling once that render finishes — on a
 * client that doesn't special-case a HEAD response's implicit zero-length
 * body (observed on Windows/curl in #6400), this reads as "headers arrive,
 * then it hangs" instead of the RFC-mandated "closes immediately".
 *
 * Fix: for every inbound HEAD request, before Next ever sees it, wrap the
 * Node `ServerResponse` so:
 *   - Any body bytes written by Next (route handler OR page render) are
 *     discarded — status code and headers Next computed (auth 401s, 404s,
 *     200s, etc.) are preserved untouched.
 *   - The connection is force-closed right after headers flush
 *     (`Connection: close`), removing any keep-alive ambiguity a client could
 *     have about whether more bytes are coming.
 *
 * This applies globally (valid routes, unmatched/404 paths, authed and
 * unauthed) because it operates at the Node HTTP transport layer shared by
 * every request — the same tier as the existing `http-method-guard.cjs` /
 * `peer-stamp.mjs` wrappers — never inside Next's per-route code.
 * See: https://github.com/diegosouzapw/OmniRoute/issues/6400
 */

function isHeadRequest(req) {
  return typeof req?.method === "string" && req.method.toUpperCase() === "HEAD";
}

/**
 * Mutates `res` in place so any body write is discarded and the response
 * ends (closing the connection) as soon as `.end()` is called, regardless of
 * what body argument was passed to it.
 *
 * @param {import("node:http").ServerResponse} res
 */
function suppressBodyAndForceClose(res) {
  try {
    // Never leave the client guessing whether the (bodyless) response has
    // more bytes coming — closing the socket is the unambiguous signal.
    res.setHeader("Connection", "close");
  } catch {
    // Headers may already be flushed in rare re-entrant cases — the write/end
    // overrides below still guarantee an empty, prompt HEAD response.
  }

  const originalEnd = res.end.bind(res);
  let ended = false;

  res.write = function headSuppressedWrite(_chunk, encodingOrCb, cb) {
    // Discard the body but keep the writable-stream contract: report the
    // write as flushed (no backpressure) so callers like Next's
    // `pipeToNodeResponse` never block waiting on a `drain` that would
    // otherwise never fire, and invoke whichever callback form was passed.
    if (typeof encodingOrCb === "function") encodingOrCb();
    else if (typeof cb === "function") cb();
    return true;
  };

  res.end = function headSuppressedEnd(chunk, encoding, cb) {
    if (ended) return res;
    ended = true;
    if (typeof chunk === "function") return originalEnd(chunk);
    if (typeof encoding === "function") return originalEnd(encoding);
    if (typeof cb === "function") return originalEnd(cb);
    return originalEnd();
  };
}

/**
 * Wrap a Node request listener so every inbound HEAD request gets the
 * body-suppression + forced-close treatment before the wrapped listener
 * (eventually Next.js) runs.
 *
 * @param {(req: import("node:http").IncomingMessage, res: import("node:http").ServerResponse) => unknown} listener
 */
function wrapRequestListenerWithHeadResponseGuard(listener) {
  return function headResponseGuardRequestHandler(req, res) {
    if (isHeadRequest(req)) {
      suppressBodyAndForceClose(res);
    }
    return listener.call(this, req, res);
  };
}

module.exports = {
  isHeadRequest,
  suppressBodyAndForceClose,
  wrapRequestListenerWithHeadResponseGuard,
};
