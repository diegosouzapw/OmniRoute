import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const pageClientSource = readFileSync(
  "src/app/(dashboard)/dashboard/webhooks/WebhooksPageClient.tsx",
  "utf8"
);
const wizardSource = readFileSync(
  "src/app/(dashboard)/dashboard/webhooks/components/AddWebhookWizard.tsx",
  "utf8"
);

test("webhook edit action opens the wizard in edit mode", () => {
  assert.match(pageClientSource, /const \[editingWebhook, setEditingWebhook\]/);
  assert.match(pageClientSource, /const handleEditWebhook = \(webhook: WebhookItem\) => \{/);
  assert.match(pageClientSource, /setEditingWebhook\(webhook\);/);
  assert.match(pageClientSource, /onEdit=\{handleEditWebhook\}/);
  assert.match(pageClientSource, /editingWebhook=\{editingWebhook\}/);
  assert.doesNotMatch(pageClientSource, /onEdit=\{\(\) => setWizardOpen\(true\)\}/);
});

test("webhook wizard title reflects add versus edit mode", () => {
  assert.match(wizardSource, /editingWebhook\?: WebhookItem \| null;/);
  assert.match(wizardSource, /const isEditing = Boolean\(editingWebhook\);/);
  assert.match(wizardSource, /title=\{`\$\{t\(isEditing \? "editWebhook" : "addWebhook"\)\}/);
});

test("editing an existing webhook reuses the current webhook payload", () => {
  assert.match(
    wizardSource,
    /function stateFromWebhook\(webhook: WebhookItem \| null \| undefined\)/
  );
  assert.match(wizardSource, /setState\(stateFromWebhook\(editingWebhook\)\);/);
  assert.match(wizardSource, /setCreatedId\(editingWebhook\?\.id \?\? null\);/);
  assert.match(wizardSource, /\.\.\.buildConfigPayload\(\),/);
  assert.match(wizardSource, /step2Valid\(state, isEditing\)/);
});
