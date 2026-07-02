import assert from "node:assert/strict";
import { test } from "node:test";

import { validateVersionManagerToolBody } from "../../src/app/api/version-manager/request.ts";

async function readFailure(result: ReturnType<typeof validateVersionManagerToolBody>) {
  assert.equal(result.ok, false);
  if (result.ok) {
    throw new Error("expected validation failure");
  }

  return {
    status: result.response.status,
    body: await result.response.json(),
  };
}

test("validateVersionManagerToolBody accepts cliproxy aliases", () => {
  assert.deepEqual(validateVersionManagerToolBody({ tool: "cliproxy" }), {
    ok: true,
    tool: "cliproxy",
  });
  assert.deepEqual(validateVersionManagerToolBody({ tool: "cliproxyapi" }), {
    ok: true,
    tool: "cliproxyapi",
  });
});

test("validateVersionManagerToolBody rejects unknown tools with the legacy response shape", async () => {
  const failure = await readFailure(validateVersionManagerToolBody({ tool: "other" }));

  assert.equal(failure.status, 400);
  assert.deepEqual(failure.body, { error: "Unknown tool: other" });
});

test("validateVersionManagerToolBody rejects invalid bodies", async () => {
  const failure = await readFailure(validateVersionManagerToolBody({}));

  assert.equal(failure.status, 400);
  assert.equal(failure.body.error.message, "Invalid request");
  assert.deepEqual(failure.body.error.details, [
    {
      field: "tool",
      message: "Invalid input: expected string, received undefined",
    },
  ]);
});
