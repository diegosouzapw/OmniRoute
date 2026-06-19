import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { resolve, join } from "node:path";

// Regression guard for #4287: the dashboard is frequently served over plain HTTP
// on a LAN IP (e.g. http://192.168.0.15:20128). In a non-secure browsing context
// `window.crypto.randomUUID` is undefined in several browsers (it is gated to
// secure contexts), so any client code that called `crypto.randomUUID()` threw a
// TypeError and broke the dashboard. The fix installs a small polyfill in the
// blocking inline <script> in src/app/layout.tsx (it runs before any app code),
// guarded so it never overrides a native implementation. These assertions fail on
// the pre-fix tree (no polyfill present) and stay green afterwards.

const cwd = process.cwd();
const layoutPath = resolve(join(cwd, "src/app/layout.tsx"));

test("layout.tsx polyfills crypto.randomUUID for non-secure contexts (guarded)", () => {
  const layout = readFileSync(layoutPath, "utf8");
  // The polyfill is installed only when the native implementation is absent —
  // it must NEVER clobber a real (secure-context) crypto.randomUUID.
  assert.match(
    layout,
    /if\s*\(\s*!\s*window\.crypto\.randomUUID\s*\)/,
    "layout.tsx must guard the polyfill behind `if (!window.crypto.randomUUID)`"
  );
  assert.match(
    layout,
    /window\.crypto\.randomUUID\s*=\s*function/,
    "layout.tsx must assign a fallback window.crypto.randomUUID implementation"
  );
});

test("the crypto.randomUUID polyfill emits an RFC4122 v4-shaped UUID", () => {
  const layout = readFileSync(layoutPath, "utf8");
  // RFC4122 v4 template: version nibble `4` + variant nibble `y` (8/9/a/b).
  assert.match(
    layout,
    /xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx/,
    "the polyfill must build a v4-shaped UUID template (…-4xxx-yxxx-…)"
  );
  assert.match(
    layout,
    /r\s*&\s*0x3\s*\|\s*0x8/,
    "the polyfill must set the RFC4122 variant bits via (r & 0x3 | 0x8)"
  );
});

test("the polyfill prefers crypto.getRandomValues and falls back to Math.random", () => {
  const layout = readFileSync(layoutPath, "utf8");
  // Strong randomness when available; Math.random only as a last resort so the
  // dashboard never hard-fails in a non-secure context that also lacks it.
  assert.match(
    layout,
    /window\.crypto\.getRandomValues/,
    "the polyfill should prefer crypto.getRandomValues when present"
  );
  assert.match(layout, /Math\.random\(\)/, "the polyfill must keep a Math.random fallback");
});
