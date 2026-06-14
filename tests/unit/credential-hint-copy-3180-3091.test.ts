/**
 * #3180 — the grok-web credential hint named only `sso`, but Grok needs BOTH `sso` and
 * `sso-rw`; the misleading hint led users to paste just `sso` and hit anti-bot 403s.
 * #3091 — the Vertex AI Service Account placeholder was an untranslated stub literal
 * ("Vertex Service Account Placeholder"), making the field look broken even though
 * Service Account JSON auth is fully supported.
 */
import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import { getWebSessionCredentialRequirement } from "../../src/app/(dashboard)/dashboard/providers/[id]/webSessionCredentials.ts";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const MESSAGES_DIR = path.join(__dirname, "..", "..", "src", "i18n", "messages");

test("#3180 grok-web credential hint names both sso and sso-rw", () => {
  const req = getWebSessionCredentialRequirement("grok-web");
  assert.ok(req && req.kind !== "none");
  assert.match(req!.credentialName, /sso-rw/);
  assert.match(req!.placeholder, /sso-rw/);
});

test("#3091 vertex Service Account placeholder is real instructional text, not the stub", () => {
  const en = JSON.parse(readFileSync(path.join(MESSAGES_DIR, "en.json"), "utf8"));
  const placeholder = en.providers?.vertexServiceAccountPlaceholder;
  assert.equal(typeof placeholder, "string");
  assert.notEqual(placeholder, "Vertex Service Account Placeholder");
  assert.match(placeholder, /service_account/);
});
