/**
 * #13144 — error messages were being truncated after a path.
 *
 * `findUnquotedPathEnd` may swallow the remainder of a line when it cannot tell
 * where a path ends, so a Windows path with spaces cannot leak a `Files\secret`
 * suffix. Two things made that fire far wider than intended:
 *
 * 1. The licence was granted on `hasFilesystemEvidence` alone, and every API
 *    route carries slashes — so an ordinary `/v1/x/y` in prose qualified. The
 *    image-model 400 lost the one sentence it exists to deliver:
 *      built:     "...cannot be used on /v1/chat/completions. Use POST
 *                  /v1/images/generations instead."
 *      delivered: "...cannot be used on <path>"
 * 2. The ambiguity check ran *before* `resolvedExtensionEnd`, so a path whose
 *    end was pinned exactly by a known extension was treated as ambiguous the
 *    moment any prose followed it — costing the dashboard probe its
 *    ` with api_key='[REDACTED]'` tail.
 *
 * Now only an unequivocal prefix with no determinable end swallows the line.
 * The last test is the other half of the fix: this narrows what fails closed
 * and must not weaken it.
 */
import test from "node:test";
import assert from "node:assert/strict";

const { redactErrorPaths } = await import("../../open-sse/utils/errorPathRedaction.ts");

test("an API route in prose does not truncate the rest of the message (#13144)", () => {
  const built =
    "Model 'huggingface/stabilityai/stable-diffusion-xl-base-1.0' is an image-generation " +
    "model and cannot be used on /v1/chat/completions. Use POST /v1/images/generations instead.";

  assert.equal(redactErrorPaths(built), built);
});

test("separator evidence alone does not license swallowing the line", () => {
  // The mechanism isolated from the message that surfaced it: a route is
  // route-shaped, not filesystem-shaped, whatever its first segment is. All
  // three truncated to "on <path>" before the fix, including the known root.
  for (const route of ["/v1/chat/completions", "/zz/chat/completions", "/v1/chat"]) {
    const input = `on ${route}. Contact support.`;
    assert.equal(redactErrorPaths(input), input, `route ${route} must survive with its tail`);
  }
});

test("a determinable extension pins the endpoint, so the tail survives", () => {
  // A known extension says exactly where the path stops, so there is no
  // ambiguity to fail closed about. The whole path is still replaced —
  // including its suffix — and the message keeps what followed it.
  const cases: readonly (readonly [string, string])[] = [
    ["at C:\\Program Files\\secret\\a.ts and more", "at <path> and more"],
    ["failed at /Users/alice/My Project/app.ts and more", "failed at <path> and more"],
    [
      "Provider failed in /srv/omniroute/src/private/provider.ts:42:7 with api_key='x'",
      "Provider failed in <path> with api_key='x'",
    ],
  ];
  for (const [input, expected] of cases) {
    const out = redactErrorPaths(input);
    assert.equal(out, expected);
    assert.ok(!/secret|alice|omniroute/.test(out), `must not expose a path suffix: ${out}`);
  }
});

test("an unequivocal prefix with no determinable end still swallows the line", () => {
  // `/etc/shadow copy failed` has nothing to anchor the endpoint on, so
  // stopping at the space could publish `shadow copy`. This is the case the
  // branch exists for, and it must keep firing.
  const out = redactErrorPaths("reading /etc/shadow copy failed");
  assert.equal(out, "reading <path>");
  assert.ok(!/shadow/.test(out), "must not expose a suffix");
});

test("quoted paths and file URIs are unaffected", () => {
  assert.equal(
    redactErrorPaths("ENOENT: no such file or directory, open '/Users/alice/secret/app.ts'"),
    "ENOENT: no such file or directory, open '<path>'"
  );
  assert.equal(
    redactErrorPaths("loading file:///Users/alice/secret/mod.ts failed later"),
    "loading <path> failed later"
  );
});
