import test from "node:test";
import assert from "node:assert/strict";
import {
  ANTIGRAVITY_REQUIRES_MANUAL_PROJECT,
  isUsableAntigravityProjectId,
} from "@omniroute/open-sse/services/antigravityProjectBootstrap.ts";
import { preferAntigravityConnectionsWithStoredProject } from "@omniroute/open-sse/services/antigravityProjectPersist.ts";

test("the manual-project sentinel is never a usable project id", () => {
  assert.equal(isUsableAntigravityProjectId(ANTIGRAVITY_REQUIRES_MANUAL_PROJECT), false);
  assert.equal(isUsableAntigravityProjectId(`  ${ANTIGRAVITY_REQUIRES_MANUAL_PROJECT}  `), false);
  assert.equal(isUsableAntigravityProjectId(""), false);
  assert.equal(isUsableAntigravityProjectId("   "), false);
  assert.equal(isUsableAntigravityProjectId(null), false);
  assert.equal(isUsableAntigravityProjectId(42), false);
  assert.equal(isUsableAntigravityProjectId("my-gcp-project-123"), true);
});

test("account selection does not prefer connections whose stored project is the sentinel", () => {
  const kept = preferAntigravityConnectionsWithStoredProject([
    { id: "poisoned-column", projectId: ANTIGRAVITY_REQUIRES_MANUAL_PROJECT },
    {
      id: "poisoned-psd",
      providerSpecificData: { projectId: ANTIGRAVITY_REQUIRES_MANUAL_PROJECT },
    },
    { id: "healthy", projectId: "my-gcp-project-123" },
  ]);

  assert.deepEqual(
    kept.map((c) => c.id),
    ["healthy"]
  );
});
