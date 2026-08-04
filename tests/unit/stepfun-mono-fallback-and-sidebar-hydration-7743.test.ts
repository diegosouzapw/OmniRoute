import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";

// Regression guards for PR #7743:
//  1) @lobehub/icons v5.13+ dropped the Stepfun `Color` sub-component. Importing it
//     causes a build-time module-not-found error that breaks the whole dashboard.
//     Lock in the Mono fallback so a future bump can't silently re-import it.
//  2) DashboardLayout must not read localStorage synchronously during the initial
//     `useState` render — that produces a client/server markup mismatch (hydration
//     error) because the server always renders the `false` (collapsed=false) branch.
//     The fix defers the localStorage read to a `useEffect`.

const lobeProviderIconsSrc = fs.readFileSync(
  new URL("../../src/shared/components/lobeProviderIcons.ts", import.meta.url),
  "utf8"
);

const dashboardLayoutSrc = fs.readFileSync(
  new URL("../../src/shared/components/layouts/DashboardLayout.tsx", import.meta.url),
  "utf8"
);

test("lobeProviderIcons never imports the removed Stepfun Color sub-component", () => {
  assert.doesNotMatch(
    lobeProviderIconsSrc,
    /@lobehub\/icons\/es\/Stepfun\/components\/Color/,
    "Stepfun/components/Color does not exist in @lobehub/icons v5.13+ and must not be imported"
  );
});

test("lobeProviderIcons maps both Stepfun mono and color slots to StepfunMonoIcon", () => {
  const stepfunEntry = lobeProviderIconsSrc.match(/Stepfun:\s*{\s*mono:\s*(\w+),\s*color:\s*(\w+)\s*}/);
  assert.ok(stepfunEntry, "Stepfun entry must exist in LOBE_ICON_COMPONENTS");
  const [, mono, color] = stepfunEntry;
  assert.equal(mono, "StepfunMonoIcon");
  assert.equal(color, "StepfunMonoIcon", "color slot must fall back to the Mono icon");
});

test("DashboardLayout does not read localStorage synchronously inside the collapsed useState initializer", () => {
  const collapsedStateMatch = dashboardLayoutSrc.match(/const \[collapsed, setCollapsed\] = useState\(([^)]*)\)/);
  assert.ok(collapsedStateMatch, "collapsed useState declaration must exist");
  assert.equal(
    collapsedStateMatch[1].trim(),
    "false",
    "collapsed must initialize to a constant so server and first client render match (no hydration mismatch)"
  );
});

test("DashboardLayout defers the sidebar-collapsed localStorage read to a useEffect", () => {
  const effectIndex = dashboardLayoutSrc.indexOf("useEffect(() => {");
  assert.ok(effectIndex >= 0, "a useEffect must exist");
  const effectBody = dashboardLayoutSrc.slice(effectIndex, dashboardLayoutSrc.indexOf("}, []);", effectIndex));
  assert.match(effectBody, /localStorage\.getItem\(SIDEBAR_COLLAPSED_KEY\)/);
  assert.match(effectBody, /setCollapsed\(true\)/);
});
