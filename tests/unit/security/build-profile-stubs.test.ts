/**
 * Regression: when OMNIROUTE_BUILD_PROFILE=minimal is the resolved build
 * profile, the four stub modules throw FeatureDisabledError instead of
 * performing their privileged operations.
 * See docs/security/SOCKET_DEV_FINDINGS.md.
 */
import { test } from "node:test";
import assert from "node:assert/strict";

test("featureDisabledError carries the featureName", async () => {
  const mod = await import("../../../src/lib/build-profile/featureDisabled.ts");
  const err = mod.featureDisabledError("my-feature");
  assert.equal(err.featureName, "my-feature");
  assert.match(err.message, /my-feature/);
  assert.match(err.message, /minimal/);
});

test("install.stub.ts: installCert / uninstallCert throw FeatureDisabledError", async () => {
  const stub = await import("../../../src/mitm/cert/install.stub.ts");
  await assert.rejects(() => stub.installCert("pw", "/tmp/x"), /mitm-cert-install/);
  await assert.rejects(() => stub.uninstallCert("pw", "/tmp/x"), /mitm-cert-install/);
  // checkCertInstalled returns false (does not throw — used by render paths)
  assert.equal(await stub.checkCertInstalled("/tmp/x"), false);
});

test("keychain-reader.stub.ts: discoverZedCredentials / getZedCredential throw", async () => {
  const stub = await import("../../../src/lib/zed-oauth/keychain-reader.stub.ts");
  await assert.rejects(() => stub.discoverZedCredentials(), /zed-keychain-import/);
  await assert.rejects(() => stub.getZedCredential("openai"), /zed-keychain-import/);
  assert.equal(await stub.isZedInstalled(), false);
});

test("cloudSync.stub.ts: syncToCloud soft-fails with feature-disabled message", async () => {
  const stub = await import("../../../src/lib/cloudSync.stub.ts");
  const result = await stub.syncToCloud("machine-id");
  assert.deepEqual(result, {
    error: "Cloud Sync is disabled in this build (minimal profile)",
  });
  assert.equal(stub.CLOUD_SYNC_SECRETS_ENABLED, false);
  await assert.rejects(() => stub.fetchWithTimeout(), /cloud-sync/);
});

test("ninerouter.stub.ts: install / resolveSpawnArgs throw FeatureDisabledError", async () => {
  const stub = await import("../../../src/lib/services/installers/ninerouter.stub.ts");
  await assert.rejects(() => stub.installNinerouter(), /9router-installer/);
  assert.throws(() => stub.resolveSpawnArgs("api-key", 20130), /9router-installer/);
});
