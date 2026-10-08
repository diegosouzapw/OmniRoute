import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";

const repoRoot = process.cwd();

function read(relativePath: string) {
  return fs.readFileSync(path.join(repoRoot, relativePath), "utf8");
}

test("api manager exposes allowUsageCommand in create, edit, and list UI", () => {
  const src = read("src/app/(dashboard)/dashboard/api-manager/ApiManagerPageClient.tsx");
  // Editing moved from the permissions modal to the access editor page (Behaviour tab).
  const behaviourTab = read(
    "src/app/(dashboard)/dashboard/api-manager/[id]/access/tabs/BehaviourTab.tsx"
  );
  const accessForm = read(
    "src/app/(dashboard)/dashboard/api-manager/[id]/access/useApiKeyAccessForm.ts"
  );

  assert.ok(src.includes("newKeyAllowUsageCommand"), "create modal must keep command state");
  assert.ok(
    behaviourTab.includes("setAllowUsageCommand(!formState.allowUsageCommand)"),
    "access editor must edit command state"
  );
  assert.ok(
    accessForm.includes("allowUsageCommand: formState.allowUsageCommand"),
    "access editor PATCH payload must include allowUsageCommand"
  );
  assert.ok(src.includes("allowUsageCommand"), "API payloads must include allowUsageCommand");
  assert.ok(src.includes('t("localUsageCommand")'), "create toggle must use i18n title");
  assert.ok(behaviourTab.includes('t("localUsageCommand")'), "edit toggle must use i18n title");
  assert.ok(src.includes('t("localUsageCommandBadge")'), "key list must show enabled state");
});

test("api key routes and schemas accept allowUsageCommand", () => {
  const schemas = read("src/shared/validation/schemas/keys.ts");
  const createRoute = read("src/app/api/keys/route.ts");
  const updateRoute = read("src/app/api/keys/[id]/route.ts");

  assert.ok(
    schemas.includes("allowUsageCommand: z.boolean().optional()"),
    "zod schemas must accept the field"
  );
  assert.ok(createRoute.includes("allowUsageCommand"), "create route must persist the field");
  assert.ok(updateRoute.includes("allowUsageCommand"), "update route must persist the field");
});
