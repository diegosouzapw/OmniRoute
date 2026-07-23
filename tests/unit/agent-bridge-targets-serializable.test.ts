import test from "node:test";
import assert from "node:assert/strict";
import { ALL_TARGETS } from "../../src/mitm/targets/index.ts";

// Regression guard for the agent-bridge "erro ao carregar" bug.
//
// `agent-bridge/page.tsx` is a Server Component that passes `targets` to the
// `AgentBridgePageClient` Client Component. Each MitmTarget carries a
// `handler: () => Promise<...>` function. Next.js forbids passing functions
// across the Server/Client boundary, raising at runtime:
//   "Functions cannot be passed directly to Client Components ..."
// which broke SSR for the whole page. The fix sanitizes the array via
//   ALL_TARGETS.map(({ handler, ...rest }) => rest)
// (a MitmTargetView). These tests pin both halves of that contract.

test("agent-bridge: sanitized targets (no handler) are fully serializable for Client Components", () => {
  const views = ALL_TARGETS.map(({ handler, ...rest }) => rest);
  assert.ok(views.length > 0, "expected at least one MITM target");
  for (const v of views) {
    const id = (v as { id?: string }).id ?? "<unknown>";
    assert.equal("handler" in v, false, `${id}: handler must be stripped before crossing to a Client Component`);
    for (const [key, value] of Object.entries(v)) {
      assert.notEqual(typeof value, "function", `${id}.${key} must not be a function (non-serializable)`);
    }
    assert.doesNotThrow(() => JSON.parse(JSON.stringify(v)), `${id} must be JSON-serializable`);
  }
});

test("agent-bridge: raw ALL_TARGETS still carry a handler function (so the sanitization is required)", () => {
  for (const t of ALL_TARGETS) {
    assert.equal(typeof t.handler, "function", `${t.id} should expose a lazy handler function`);
  }
});
