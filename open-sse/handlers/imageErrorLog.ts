/**
 * Shared call-log error stringifier for the image handlers
 * (`/v1/images/generations`, `/v1/images/upscale`).
 *
 * Both sinks take `error: unknown`, and the Codex fan-out forwards whatever
 * `sanitizeImageProviderError()` produced — i.e. the output of
 * `sanitizeUpstreamDetails()`, which builds every object with
 * `Object.create(null)` on purpose (#12506) so a hostile upstream key such as
 * `__proto__` or `constructor` can never reach a real prototype. That object
 * therefore has NO `toString`/`Symbol.toPrimitive`, so a bare `String(value)`
 * throws `TypeError: Cannot convert object to primitive value` and turns a
 * handled provider failure into an unhandled crash. The null prototype is the
 * correct behavior at the source, so the sink is what has to be total:
 * serialize objects structurally and keep `String()` semantics for everything
 * else.
 *
 * The rendered text is also passed through `redactSensitiveErrorText()` so an
 * `Error` whose message quotes an upstream `Authorization: Bearer …` header (or
 * any other recognised credential shape) never reaches the call log verbatim.
 *
 * Kept in its own module so `imageGeneration.ts` and `imageUpscale/shared.ts`
 * share ONE implementation instead of rediscovering the null-prototype contract
 * per sink (omni-code-review LEDGER-22 / LEDGER-37).
 */

import { redactSensitiveErrorText } from "../utils/error.ts";

export function stringifyImageErrorForLog(value: unknown): string {
  return redactSensitiveErrorText(renderImageErrorForLog(value));
}

function renderImageErrorForLog(value: unknown): string {
  if (typeof value === "string") return value;
  if (value instanceof Error) return renderErrorInstanceForLog(value);
  if (value !== null && typeof value === "object") {
    try {
      const serialized = JSON.stringify(value);
      if (typeof serialized === "string") return serialized;
    } catch {
      // Circular graph or a throwing toJSON — fall through to String().
    }
  }
  try {
    return String(value);
  } catch {
    return "[unserializable error]";
  }
}

/**
 * The `Error` branch has to be as total as the others: `name`/`message` are ordinary
 * (re)assignable properties, so an Error can carry a null-prototype object or a throwing
 * getter in either slot, and a bare `${value.name}: ${value.message}` would throw the very
 * `TypeError` this module exists to prevent (omni-code-review LEDGER-56).
 */
function renderErrorInstanceForLog(error: Error): string {
  return `${readErrorPart(error, "name", "Error")}: ${readErrorPart(
    error,
    "message",
    "[unserializable message]"
  )}`;
}

function readErrorPart(error: Error, key: "name" | "message", fallback: string): string {
  try {
    const part: unknown = error[key];
    return typeof part === "string" ? part : fallback;
  } catch {
    return fallback;
  }
}
