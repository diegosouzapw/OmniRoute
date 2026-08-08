import assert from "node:assert/strict";
import test from "node:test";

import { ESLint } from "eslint";

const eslint = new ESLint({ cwd: process.cwd() });

async function restrictedImportMessages(code: string, filePath: string): Promise<string[]> {
  const [result] = await eslint.lintText(code, { filePath });

  return result.messages
    .filter(({ ruleId }) => ruleId === "no-restricted-imports")
    .map(({ message }) => message);
}

test("G14 rejects localDb barrel imports outside src/lib/db", async () => {
  const cases = [
    {
      code: 'import { getSettings } from "@/lib/localDb";\nvoid getSettings;',
      filePath: "src/lib/example.ts",
    },
    {
      code: 'import { getSettings } from "@/lib/localDb.ts";\nvoid getSettings;',
      filePath: "src/shared/example.ts",
    },
    {
      code: 'import { getSettings } from "../localDb";\nvoid getSettings;',
      filePath: "src/lib/feature/example.ts",
    },
    {
      code: 'import { getSettings } from "../../lib/localDb.ts";\nvoid getSettings;',
      filePath: "src/app/example.ts",
    },
  ];

  for (const fixture of cases) {
    const messages = await restrictedImportMessages(fixture.code, fixture.filePath);
    assert.equal(messages.length, 1, `expected ${fixture.code} to be rejected`);
    assert.match(messages[0], /domain module from `@\/lib\/db\//);
  }
});

test("G14 rejects executor implementation imports from src/app", async () => {
  for (const importPath of [
    "@omniroute/open-sse/executors/default.ts",
    "open-sse/executors/default.ts",
  ]) {
    const messages = await restrictedImportMessages(
      `import { DefaultExecutor } from "${importPath}";\nvoid DefaultExecutor;`,
      "src/app/api/example/route.ts"
    );

    assert.equal(messages.length, 1, `expected ${importPath} to be rejected from src/app`);
    assert.match(messages[0], /handler or service boundary/);
  }
});

test("G14 allows imports through the intended boundaries", async () => {
  const cases = [
    {
      code: 'import { getSettings } from "@/lib/localDb";\nvoid getSettings;',
      filePath: "src/lib/db/example.ts",
    },
    {
      code: 'import { DefaultExecutor } from "@omniroute/open-sse/executors/default.ts";\nvoid DefaultExecutor;',
      filePath: "src/sse/handlers/example.ts",
    },
    {
      code: 'import { handleChat } from "@omniroute/open-sse/handlers/chat";\nvoid handleChat;',
      filePath: "src/app/api/example/route.ts",
    },
  ];

  for (const fixture of cases) {
    assert.deepEqual(await restrictedImportMessages(fixture.code, fixture.filePath), []);
  }
});
