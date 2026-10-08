"use strict";

// =========================================================================
// Backpressure-aware write for the standalone CommonJS `server.cjs` proxy
// (#14528). Kept in its own module so the wait/cleanup behavior can be
// exercised directly by unit tests — `server.cjs` itself binds a port on load.
// =========================================================================

/**
 * Write `chunk` to `res` and, when the socket reports backpressure
 * (`write()` returned false), wait until it drains, closes or errors before
 * resolving. All three listeners are removed whichever event fires first, so a
 * long stream to a slow client never accumulates listeners.
 *
 * @param {NodeJS.WritableStream} res
 * @param {string | Buffer} chunk
 * @returns {Promise<void>}
 */
function writeWithBackpressure(res, chunk) {
  if (res.write(chunk)) return Promise.resolve();
  return new Promise((resolve) => {
    const done = () => {
      res.off("drain", done);
      res.off("close", done);
      res.off("error", done);
      resolve();
    };
    res.once("drain", done);
    res.once("close", done);
    res.once("error", done);
  });
}

module.exports = { writeWithBackpressure };
