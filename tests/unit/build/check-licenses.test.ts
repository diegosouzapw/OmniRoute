// tests/unit/build/check-licenses.test.ts
// TDD unit tests for scripts/check/check-licenses.mjs — Task 7.20 license compliance.
//
// Strategy: test the three exported pure functions without spawning license-checker
// or reading the real .license-allowlist.json. All fixtures are synthetic.
//   - loadAllowlist()    — parses + validates the allowlist JSON shape
//   - classifyLicense()  — core policy decision (allowed / exception / denied)
//   - stripVersion()     — strips @version suffix from package keys
import test from "node:test";
import assert from "node:assert/strict";
// @ts-expect-error — .mjs helper has no type declarations; runtime shape is known.
import {
  classifyLicense,
  stripVersion,
  loadAllowlist,
} from "../../../scripts/check/check-licenses.mjs";

// ---------------------------------------------------------------------------
// Helpers — synthetic allowlists for testing classifyLicense in isolation
// ---------------------------------------------------------------------------

function makeAllowlist(overrides: Partial<{
  allowed: string[];
  allowedExpressions: string[];
  exceptions: Record<string, { license: string; justification: string; risk: string }>;
}> = {}) {
  return {
    allowed: ["MIT", "Apache-2.0", "BSD-3-Clause", "ISC", "0BSD"],
    allowedExpressions: ["(MIT OR Apache-2.0)", "MIT AND ISC", "MIT*"],
    exceptions: {},
    ...overrides,
  };
}

// ---------------------------------------------------------------------------
// stripVersion
// ---------------------------------------------------------------------------

test("stripVersion: strips @version from a regular package", () => {
  assert.equal(stripVersion("lodash@4.17.21"), "lodash");
});

test("stripVersion: strips @version from a scoped package", () => {
  assert.equal(stripVersion("@img/sharp-libvips-linux-x64@1.2.4"), "@img/sharp-libvips-linux-x64");
});

test("stripVersion: returns bare name unchanged (no version)", () => {
  assert.equal(stripVersion("lodash"), "lodash");
});

test("stripVersion: handles scoped package without version", () => {
  assert.equal(stripVersion("@scope/pkg"), "@scope/pkg");
});

test("stripVersion: handles nested scope-like name with version", () => {
  assert.equal(stripVersion("@aws-sdk/client-bedrock-runtime@3.1063.0"), "@aws-sdk/client-bedrock-runtime");
});

// ---------------------------------------------------------------------------
// classifyLicense — allowed
// ---------------------------------------------------------------------------

test("classifyLicense: MIT is allowed", () => {
  const result = classifyLicense("some-pkg@1.0.0", "MIT", makeAllowlist());
  assert.equal(result.status, "allowed");
});

test("classifyLicense: Apache-2.0 is allowed", () => {
  const result = classifyLicense("some-pkg@1.0.0", "Apache-2.0", makeAllowlist());
  assert.equal(result.status, "allowed");
});

test("classifyLicense: ISC is allowed", () => {
  const result = classifyLicense("some-pkg@1.0.0", "ISC", makeAllowlist());
  assert.equal(result.status, "allowed");
});

test("classifyLicense: 0BSD is allowed", () => {
  const result = classifyLicense("some-pkg@1.0.0", "0BSD", makeAllowlist());
  assert.equal(result.status, "allowed");
});

// ---------------------------------------------------------------------------
// classifyLicense — allowed expressions
// ---------------------------------------------------------------------------

test("classifyLicense: (MIT OR Apache-2.0) expression is allowed", () => {
  const result = classifyLicense("some-pkg@1.0.0", "(MIT OR Apache-2.0)", makeAllowlist());
  assert.equal(result.status, "allowed");
});

test("classifyLicense: MIT AND ISC expression is allowed", () => {
  const result = classifyLicense("some-pkg@1.0.0", "MIT AND ISC", makeAllowlist());
  assert.equal(result.status, "allowed");
});

test("classifyLicense: MIT* expression is allowed (e.g. khroma)", () => {
  const result = classifyLicense("khroma@2.1.0", "MIT*", makeAllowlist());
  assert.equal(result.status, "allowed");
});

// ---------------------------------------------------------------------------
// classifyLicense — denied
// ---------------------------------------------------------------------------

test("classifyLicense: GPL-3.0 is denied", () => {
  const result = classifyLicense("gpl-pkg@1.0.0", "GPL-3.0", makeAllowlist());
  assert.equal(result.status, "denied");
  assert.ok(result.reason.includes("GPL-3.0"), `reason should mention license: ${result.reason}`);
});

test("classifyLicense: AGPL-3.0 is denied (strong copyleft)", () => {
  const result = classifyLicense("agpl-pkg@1.0.0", "AGPL-3.0", makeAllowlist());
  assert.equal(result.status, "denied");
});

test("classifyLicense: LGPL-3.0-or-later is denied without exception", () => {
  const result = classifyLicense("lgpl-pkg@1.0.0", "LGPL-3.0-or-later", makeAllowlist());
  assert.equal(result.status, "denied");
});

test("classifyLicense: MPL-2.0 is denied without exception or expression", () => {
  const result = classifyLicense("mpl-pkg@1.0.0", "MPL-2.0", makeAllowlist());
  assert.equal(result.status, "denied");
});

test("classifyLicense: unknown/UNKNOWN license is denied", () => {
  const result = classifyLicense("mystery-pkg@1.0.0", "UNKNOWN", makeAllowlist());
  assert.equal(result.status, "denied");
});

test("classifyLicense: Custom license is denied", () => {
  const result = classifyLicense("custom-pkg@1.0.0", "Custom: LICENSE", makeAllowlist());
  assert.equal(result.status, "denied");
});

// ---------------------------------------------------------------------------
// classifyLicense — exceptions
// ---------------------------------------------------------------------------

test("classifyLicense: LGPL package with registered exception returns 'exception'", () => {
  const allowlist = makeAllowlist({
    exceptions: {
      "lgpl-native-pkg": {
        license: "LGPL-3.0-or-later",
        justification: "Dynamically linked native binary; user can replace.",
        risk: "low",
      },
    },
  });
  const result = classifyLicense("lgpl-native-pkg@1.2.3", "LGPL-3.0-or-later", allowlist);
  assert.equal(result.status, "exception");
  assert.ok(result.reason.includes("exception"), `reason should mention exception: ${result.reason}`);
});

test("classifyLicense: scoped package with exception: version is stripped for lookup", () => {
  const allowlist = makeAllowlist({
    exceptions: {
      "@img/sharp-libvips-linux-x64": {
        license: "LGPL-3.0-or-later",
        justification: "Prebuilt shared lib.",
        risk: "low",
      },
    },
  });
  const result = classifyLicense(
    "@img/sharp-libvips-linux-x64@1.2.4",
    "LGPL-3.0-or-later",
    allowlist
  );
  assert.equal(result.status, "exception", "scoped exception should be found after version strip");
});

test("classifyLicense: exception does not apply to different package", () => {
  const allowlist = makeAllowlist({
    exceptions: {
      "only-this-pkg": {
        license: "GPL-3.0",
        justification: "Special case.",
        risk: "high",
      },
    },
  });
  const result = classifyLicense("other-gpl-pkg@1.0.0", "GPL-3.0", allowlist);
  assert.equal(result.status, "denied", "exception must be per-package, not per-license");
});

test("classifyLicense: exception with risk=medium still returns 'exception' (not denied)", () => {
  const allowlist = makeAllowlist({
    exceptions: {
      "tls-client-node": {
        license: "Custom: LICENSE",
        justification: "Commons Clause + Apache-2.0. TODO: revisar.",
        risk: "medium",
      },
    },
  });
  const result = classifyLicense("tls-client-node@0.2.0", "Custom: LICENSE", allowlist);
  assert.equal(result.status, "exception");
});

// ---------------------------------------------------------------------------
// classifyLicense — reason field content
// ---------------------------------------------------------------------------

test("classifyLicense: denied result includes package name in reason", () => {
  const result = classifyLicense("bad-pkg@1.0.0", "GPL-3.0", makeAllowlist());
  assert.ok(
    result.reason.includes("bad-pkg"),
    `reason should include package name; got: ${result.reason}`
  );
});

test("classifyLicense: allowed result mentions the matched license", () => {
  const result = classifyLicense("ok-pkg@1.0.0", "MIT", makeAllowlist());
  assert.ok(result.reason.includes("MIT"), `reason should include license; got: ${result.reason}`);
});

// ---------------------------------------------------------------------------
// loadAllowlist — shape validation (reads the real .license-allowlist.json)
// ---------------------------------------------------------------------------

test("loadAllowlist: returns an object with allowed, allowedExpressions, and exceptions keys", () => {
  const allowlist = loadAllowlist();
  assert.ok(typeof allowlist === "object" && allowlist !== null, "should be an object");
  assert.ok(Array.isArray(allowlist.allowed), "allowed should be an array");
  assert.ok(Array.isArray(allowlist.allowedExpressions), "allowedExpressions should be an array");
  assert.ok(typeof allowlist.exceptions === "object", "exceptions should be an object");
});

test("loadAllowlist: allowed includes MIT", () => {
  const allowlist = loadAllowlist();
  assert.ok(allowlist.allowed.includes("MIT"), "MIT must be in allowed");
});

test("loadAllowlist: allowed includes Apache-2.0", () => {
  const allowlist = loadAllowlist();
  assert.ok(allowlist.allowed.includes("Apache-2.0"), "Apache-2.0 must be in allowed");
});

test("loadAllowlist: allowed includes ISC", () => {
  const allowlist = loadAllowlist();
  assert.ok(allowlist.allowed.includes("ISC"), "ISC must be in allowed");
});

test("loadAllowlist: exceptions entries have required fields", () => {
  const allowlist = loadAllowlist();
  for (const [pkgName, exc] of Object.entries(allowlist.exceptions)) {
    assert.ok(
      typeof (exc as any).license === "string",
      `exceptions.${pkgName}.license should be a string`
    );
    assert.ok(
      typeof (exc as any).justification === "string",
      `exceptions.${pkgName}.justification should be a string`
    );
    assert.ok(
      typeof (exc as any).risk === "string",
      `exceptions.${pkgName}.risk should be a string`
    );
    assert.ok(
      (exc as any).justification.length > 10,
      `exceptions.${pkgName}.justification must be non-trivial (> 10 chars)`
    );
  }
});

test("loadAllowlist: tls-client-node exception has risk=medium (Commons Clause)", () => {
  const allowlist = loadAllowlist();
  const exc = allowlist.exceptions["tls-client-node"] as any;
  assert.ok(exc, "tls-client-node exception must be registered");
  assert.equal(exc.risk, "medium", "tls-client-node is a medium-risk exception (Commons Clause)");
});

test("loadAllowlist: LGPL packages have registered exceptions", () => {
  const allowlist = loadAllowlist();
  const lgplPkgs = ["@img/sharp-libvips-linux-x64", "@img/sharp-libvips-linuxmusl-x64"];
  for (const pkg of lgplPkgs) {
    assert.ok(
      allowlist.exceptions[pkg],
      `${pkg} (LGPL-3.0-or-later) must have a registered exception`
    );
  }
});

test("loadAllowlist: MPL-2.0 packages have registered exceptions or allowed expressions", () => {
  const allowlist = loadAllowlist();
  const mplPkgs = ["lightningcss", "lightningcss-linux-x64-gnu", "lightningcss-linux-x64-musl"];
  for (const pkg of mplPkgs) {
    const hasException = Boolean(allowlist.exceptions[pkg]);
    const mplExpr = allowlist.allowedExpressions.some((e: string) => e.includes("MPL"));
    assert.ok(
      hasException || mplExpr,
      `${pkg} (MPL-2.0) must be in exceptions or have an allowed expression`
    );
  }
});

// ---------------------------------------------------------------------------
// Integration: real allowlist correctly classifies known packages
// ---------------------------------------------------------------------------

test("integration: classifyLicense passes MIT packages against real allowlist", () => {
  const allowlist = loadAllowlist();
  const result = classifyLicense("lodash@4.17.21", "MIT", allowlist);
  assert.equal(result.status, "allowed");
});

test("integration: classifyLicense passes tls-client-node as exception against real allowlist", () => {
  const allowlist = loadAllowlist();
  const result = classifyLicense("tls-client-node@0.2.0", "Custom: LICENSE", allowlist);
  assert.equal(result.status, "exception");
});

test("integration: classifyLicense denies GPL-3.0 against real allowlist", () => {
  const allowlist = loadAllowlist();
  const result = classifyLicense("hypothetical-gpl@1.0.0", "GPL-3.0", allowlist);
  assert.equal(result.status, "denied");
});

test("integration: classifyLicense denies AGPL-3.0 against real allowlist", () => {
  const allowlist = loadAllowlist();
  const result = classifyLicense("hypothetical-agpl@1.0.0", "AGPL-3.0", allowlist);
  assert.equal(result.status, "denied");
});
