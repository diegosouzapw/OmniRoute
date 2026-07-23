import test from "node:test";
import assert from "node:assert/strict";

import { sanitizeAntigravityToolPayload } from "../../open-sse/config/toolCloaking.ts";
import {
  createPreparedRequestLogger,
  type ProviderRequestPrepared,
} from "../../open-sse/utils/providerRequestLogging.ts";

function makeCapture() {
  const reqLogger = {
    logTargetRequest: (_url: unknown, _headers: Record<string, string>, _body: unknown) => {},
  };
  const scope = {
    id: null,
    model: "gemini-2.5-pro",
    provider: "antigravity",
    connectionId: null,
  };
  return createPreparedRequestLogger(reqLogger, scope);
}

test("Antigravity request capture preserves original tool names without a cloak map", () => {
  const capture = makeCapture();
  const source: Record<string, unknown> = {
    model: "gemini-2.5-pro",
    request: {
      tools: [
        {
          functionDeclarations: [
            {
              name: "workspace_read",
              description: "Read a file",
              parameters: { type: "OBJECT", properties: {} },
            },
          ],
        },
      ],
      contents: [
        {
          role: "model",
          parts: [{ functionCall: { name: "workspace_read", args: { path: "/tmp/a" } } }],
        },
      ],
    },
  };
  const sanitized = sanitizeAntigravityToolPayload(source);
  const bodyString = JSON.stringify(sanitized);
  const prepared: ProviderRequestPrepared = {
    url: "https://cloudcode-pa.googleapis.com/v1internal:streamGenerateContent?alt=sse",
    headers: {},
    body: JSON.parse(bodyString),
    bodyString,
  };
  capture.capture(prepared);

  const finalBody = capture.body(sanitized) as {
    _toolNameMap?: unknown;
    request: {
      tools: Array<{ functionDeclarations: Array<{ name: string }> }>;
      contents: Array<{ parts: Array<{ functionCall: { name: string } }> }>;
    };
  };

  assert.equal("_toolNameMap" in sanitized, false);
  assert.equal(finalBody._toolNameMap, undefined);
  assert.deepEqual(
    finalBody.request.tools[0].functionDeclarations.map((declaration) => declaration.name),
    ["workspace_read"]
  );
  assert.equal(finalBody.request.contents[0].parts[0].functionCall.name, "workspace_read");
  assert.equal(bodyString.includes("_ide"), false);
});
