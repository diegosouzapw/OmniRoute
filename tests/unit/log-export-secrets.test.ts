import test from "node:test";
import assert from "node:assert/strict";

process.env.STORAGE_ENCRYPTION_KEY =
  process.env.STORAGE_ENCRYPTION_KEY || "log-export-secrets-test-key";

const secrets = await import("../../src/lib/logExport/secrets.ts");

const TYPE = "bigquery";
const SA_JSON = '{"type":"service_account","client_email":"a@b.iam.gserviceaccount.com"}';

test("encryptDestinationConfig_SecretField_IsCiphertextAtRest", () => {
  const stored = secrets.encryptDestinationConfig(TYPE, {
    projectId: "proj",
    serviceAccountJson: SA_JSON,
  });

  assert.equal(stored.projectId, "proj");
  assert.notEqual(stored.serviceAccountJson, SA_JSON);
  assert.match(String(stored.serviceAccountJson), /^enc:v1:/);
});

test("decryptDestinationConfig_EncryptedConfig_RoundTripsBackToPlaintext", () => {
  const stored = secrets.encryptDestinationConfig(TYPE, { serviceAccountJson: SA_JSON });
  const runtime = secrets.decryptDestinationConfig(TYPE, stored);
  assert.equal(runtime.serviceAccountJson, SA_JSON);
});

test("redactDestinationConfig_StoredSecret_NeverReturnsCiphertextOrPlaintext", () => {
  const stored = secrets.encryptDestinationConfig(TYPE, {
    projectId: "proj",
    serviceAccountJson: SA_JSON,
  });
  const view = secrets.redactDestinationConfig(TYPE, stored);

  assert.equal(view.projectId, "proj");
  assert.equal(view.serviceAccountJson, secrets.SECRET_PLACEHOLDER);
  assert.equal(JSON.stringify(view).includes("enc:v1:"), false);
  assert.equal(JSON.stringify(view).includes("gserviceaccount"), false);
});

test("redactDestinationConfig_UnsetSecret_OmitsTheKeyEntirely", () => {
  const view = secrets.redactDestinationConfig(TYPE, { projectId: "proj" });
  assert.equal("serviceAccountJson" in view, false);
});

test("mergeDestinationConfig_PlaceholderSubmitted_KeepsStoredSecret", () => {
  const stored = secrets.encryptDestinationConfig(TYPE, { serviceAccountJson: SA_JSON });
  const merged = secrets.mergeDestinationConfig(TYPE, stored, {
    projectId: "proj",
    serviceAccountJson: secrets.SECRET_PLACEHOLDER,
  });

  assert.equal(merged.serviceAccountJson, stored.serviceAccountJson);
  assert.equal(secrets.decryptDestinationConfig(TYPE, merged).serviceAccountJson, SA_JSON);
});

test("mergeDestinationConfig_NewSecretSubmitted_ReplacesStoredSecret", () => {
  const stored = secrets.encryptDestinationConfig(TYPE, { serviceAccountJson: SA_JSON });
  const merged = secrets.mergeDestinationConfig(TYPE, stored, {
    serviceAccountJson: '{"type":"service_account","client_email":"new@x.iam.gserviceaccount.com"}',
  });

  assert.match(String(merged.serviceAccountJson), /new@x/);
});

test("mergeDestinationConfig_SecretOmitted_KeepsStoredSecret", () => {
  const stored = secrets.encryptDestinationConfig(TYPE, { serviceAccountJson: SA_JSON });
  const merged = secrets.mergeDestinationConfig(TYPE, stored, { projectId: "proj" });
  assert.equal(merged.serviceAccountJson, stored.serviceAccountJson);
});
