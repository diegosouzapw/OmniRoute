import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";

test("provider-models handlers require centralized management auth before work", () => {
  const routePath = "src/app/api/provider-models/route.ts";
  const source = fs.readFileSync(routePath, "utf8");

  assert.ok(source.includes('from "@/lib/api/requireManagementAuth"'));

  for (const method of ["GET", "POST", "PUT", "PATCH", "DELETE"]) {
    const handlerStart = source.indexOf(`export async function ${method}(`);
    assert.ok(handlerStart >= 0, `${routePath} is missing ${method}`);
    const nextHandlerStart = source.indexOf("export async function", handlerStart + 1);
    const handler = source.slice(
      handlerStart,
      nextHandlerStart === -1 ? source.length : nextHandlerStart
    );
    const authCall = handler.indexOf("const authError = await requireManagementAuth(request);");
    assert.ok(authCall >= 0, `${method} must use requireManagementAuth(request)`);
    assert.ok(
      handler.indexOf("if (authError) return authError;") > authCall,
      `${method} must return management-auth failures`
    );

    const workMarkers = ["request.json()", "new URL(request.url)"]
      .map((marker) => handler.indexOf(marker))
      .filter((position) => position >= 0);
    assert.ok(
      workMarkers.every((position) => authCall < position),
      `${method} must authenticate before parsing input or reading request parameters`
    );
  }
});
