import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";
import * as yaml from "js-yaml";

import { buildApiOperationExample } from "../../src/lib/agentSkills/apiOperationExample.ts";
import { parseOpenapi } from "../../src/lib/agentSkills/openapiParser.ts";

type Operation = {
  security: Array<Record<string, string[]>>;
  parameters: Array<{ in: string; name: string; required?: boolean }>;
  responses: Record<string, { description: string }>;
};

test("drill-down publishes one parseable authenticated GET/DELETE contract", () => {
  // Use the same parser as generated skills: duplicate YAML keys must fail,
  // rather than silently replacing the detailed contract with a generated stub.
  const parsed = parseOpenapi();
  const route = "/api/v1/video-bridge/drilldown";
  assert.match(parsed.paths.get(`GET ${route}`)?.summary ?? "", /tenant-bound/);
  assert.match(parsed.paths.get(`DELETE ${route}`)?.summary ?? "", /owner/);
  assert.ok(parsed.paths.has("GET /api/settings"));

  const document = yaml.load(readFileSync("docs/openapi.yaml", "utf8")) as {
    paths: Record<string, Record<string, Operation>>;
  };
  for (const method of ["get", "delete"]) {
    const operation = document.paths[route][method];
    assert.deepEqual(operation.security, [{ BearerAuth: [] }]);
    assert.ok(
      operation.parameters.some(
        (parameter) =>
          parameter.in === "query" && parameter.name === "handle" && parameter.required === true
      )
    );
    assert.equal(typeof operation.responses["401"].description, "string");
    assert.equal(typeof operation.responses["403"].description, "string");
  }
  // A comma in an unquoted YAML flow scalar creates extra mapping keys.
  assert.deepEqual(document.paths[route].get.responses["404"], {
    description: "Unknown, expired or cross-key handle",
  });
});

for (const method of ["GET", "DELETE"]) {
  test(`published drill-down ${method} example supplies its required opaque handle`, () => {
    const example = buildApiOperationExample(
      { method, path: "/api/v1/video-bridge/drilldown" },
      false
    ).join("\n");
    assert.match(example, /curl --get /);
    assert.ok(example.includes('--data-urlencode "handle=$OMNIROUTE_VIDEO_HANDLE"'));
    assert.ok(example.includes("Authorization: Bearer $OMNIROUTE_TOKEN"));
    assert.equal(example.includes("-X DELETE"), method === "DELETE");
  });
}
