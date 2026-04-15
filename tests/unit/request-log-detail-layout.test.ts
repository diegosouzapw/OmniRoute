import test from "node:test";
import assert from "node:assert/strict";
import React from "react";
import { renderToStaticMarkup } from "react-dom/server";

const { default: RequestLoggerDetail } =
  await import("../../src/shared/components/RequestLoggerDetail.tsx");

test("request log detail splits token badges into input and output groups", () => {
  const html = renderToStaticMarkup(
    React.createElement(RequestLoggerDetail, {
      log: {
        status: 200,
        method: "POST",
        path: "/v1/chat/completions",
        timestamp: "2026-04-09T21:27:08.000Z",
        duration: 2500,
        provider: "openai-compatible-sp-openai",
        sourceFormat: "openai-chat",
        model: "gpt-5.4",
        requestedModel: "openai-compatible-sp-openai/gpt-5.4",
        account: "main",
        apiKeyName: "tools",
        apiKeyId: "29d9***7e37",
        comboName: "_Latest-Discounted",
        tokens: {
          in: 21818,
          out: 42,
          cacheRead: 21632,
          cacheWrite: null,
          reasoning: null,
        },
      },
      detail: {
        account: "main",
        apiKeyName: "tools",
        apiKeyId: "29d9***7e37",
        comboName: "_Latest-Discounted",
        requestedModel: "openai-compatible-sp-openai/gpt-5.4",
        tokens: {
          in: 21818,
          out: 42,
          cacheRead: 21632,
          cacheWrite: null,
          reasoning: null,
        },
      },
      loading: false,
      onClose: () => {},
      onCopy: async () => true,
    })
  );

  const inputLabelIndex = html.indexOf(">Input<");
  const outputLabelIndex = html.indexOf(">Output<");
  const modelLabelIndex = html.indexOf(">Model<");
  const requestedModelLabelIndex = html.indexOf(">Requested Model<");

  assert.notEqual(html.indexOf(">Completed Time<"), -1);
  assert.equal(html.includes(">Time<"), false);
  assert.notEqual(inputLabelIndex, -1);
  assert.notEqual(outputLabelIndex, -1);
  assert.notEqual(modelLabelIndex, -1);
  assert.notEqual(requestedModelLabelIndex, -1);
  assert.equal(html.includes(">Tokens<"), false);
  assert.equal(inputLabelIndex < outputLabelIndex, true);
  assert.equal(outputLabelIndex < modelLabelIndex, true);
  assert.equal(modelLabelIndex < requestedModelLabelIndex, true);

  assert.match(
    html,
    /data-testid="token-group-input"[\s\S]*Total In: 21[\s\S]*818[\s\S]*Cache Read: 21[\s\S]*632[\s\S]*Cache Write: N\/A/
  );
  assert.match(html, /data-testid="token-group-output"[\s\S]*Total Out: 42[\s\S]*Reasoning: N\/A/);
});
