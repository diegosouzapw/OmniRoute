import test from "node:test";
import assert from "node:assert/strict";
import React from "react";
import { renderToStaticMarkup } from "react-dom/server";

const { default: RequestLoggerDetail } =
  await import("../../src/shared/components/RequestLoggerDetail.tsx");

function renderDetailWithSourceFormat(sourceFormat: string) {
  return renderToStaticMarkup(
    React.createElement(RequestLoggerDetail, {
      log: {
        status: 200,
        method: "POST",
        path: "/v1/chat/completions",
        timestamp: "2026-04-09T21:27:08.000Z",
        duration: 2500,
        provider: "openrouter",
        sourceFormat,
        model: "deepseek/deepseek-v4-pro",
        requestedModel: "openrouter/deepseek/deepseek-v4-pro",
        cacheSource: "upstream",
        tokens: {
          in: 10,
          out: 2,
          cacheRead: null,
          cacheWrite: null,
          reasoning: null,
        },
      },
      detail: {
        requestedModel: "openrouter/deepseek/deepseek-v4-pro",
        cacheSource: "upstream",
        tokens: {
          in: 10,
          out: 2,
          cacheRead: null,
          cacheWrite: null,
          reasoning: null,
        },
      },
      loading: false,
      onClose: () => {},
      onCopy: async () => true,
    })
  );
}

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
        cacheSource: "semantic",
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
        cacheSource: "semantic",
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

  // The completed-request detail grid renders "Started At" / "Ended At" columns
  // (renamed from the old single "Completed Time" label in #5834).
  assert.notEqual(html.indexOf(">Ended At<"), -1);
  assert.equal(html.includes(">Time<"), false);
  assert.notEqual(inputLabelIndex, -1);
  assert.notEqual(outputLabelIndex, -1);
  assert.notEqual(modelLabelIndex, -1);
  assert.notEqual(requestedModelLabelIndex, -1);
  assert.equal(html.includes(">Tokens<"), false);
  assert.equal(inputLabelIndex < outputLabelIndex, true);
  assert.equal(outputLabelIndex < modelLabelIndex, true);
  assert.equal(modelLabelIndex < requestedModelLabelIndex, true);
  assert.notEqual(html.indexOf(">Cache Source<"), -1);
  assert.notEqual(html.indexOf(">Semantic (OmniRoute)<"), -1);
  assert.notEqual(html.indexOf(">OpenAI-Chat<"), -1);

  assert.match(
    html,
    /data-testid="token-group-input"[\s\S]*Total In: 21[\s\S]*818[\s\S]*Cache Read: 21[\s\S]*632[\s\S]*Cache Write: N\/A/
  );
  assert.match(html, /data-testid="token-group-output"[\s\S]*Total Out: 42[\s\S]*Reasoning: N\/A/);
});

test("request log detail labels OpenAI protocol variants explicitly", () => {
  const chatHtml = renderDetailWithSourceFormat("openai");
  const responsesHtml = renderDetailWithSourceFormat("openai-responses");

  assert.notEqual(chatHtml.indexOf(">OpenAI-Chat<"), -1);
  assert.notEqual(responsesHtml.indexOf(">OpenAI-Responses<"), -1);
});

test("request log detail compression-summary badge shows positive saved%, never negative", () => {
  // Regression: prior code used `(-{pct}%)` which produced literal "-100%" when the entire
  // prompt was compressed (compressed=5286, totalIn=0). The fix clamps pct to [0, 100] and
  // uses "(N% saved)" so the user-facing label is always positive.
  const make = (tokensIn: number, tokensCompressed: number) =>
    renderToStaticMarkup(
      React.createElement(RequestLoggerDetail, {
        log: {
          status: 200,
          method: "POST",
          path: "/v1/chat/completions",
          timestamp: "2026-04-09T21:27:08.000Z",
          duration: 1500,
          provider: "openai-compatible-sp-openai",
          sourceFormat: "openai-chat",
          model: "gpt-5.4",
          requestedModel: "openai-compatible-sp-openai/gpt-5.4",
          cacheSource: "semantic",
          tokens: {
            in: tokensIn,
            out: 42,
            cacheRead: null,
            cacheWrite: null,
            reasoning: null,
            compressed: tokensCompressed,
          },
        },
        detail: {
          tokens: {
            in: tokensIn,
            out: 42,
            cacheRead: null,
            cacheWrite: null,
            reasoning: null,
            compressed: tokensCompressed,
          },
        },
        loading: false,
        onClose: () => {},
        onCopy: async () => true,
      })
    );

  // Original bug repro: totalIn=0, compressed=5286 → previously rendered "(−100%)".
  const fullyCompressed = make(0, 5286);
  assert.match(fullyCompressed, /Compressed: 5,286 → 0 \(100% saved\)/);
  assert.equal(fullyCompressed.includes("(-100%)"), false, "literal '(-100%)' must never appear");
  assert.equal(
    fullyCompressed.includes("\u2212100%"),
    false,
    "unicode minus + 100% must never appear"
  );

  // Half-compressed case must clamp cleanly inside the [0, 100] window.
  const halfCompressed = make(2500, 2500);
  assert.match(halfCompressed, /Compressed: 5,000 → 2,500 \(50% saved\)/);
  assert.equal(halfCompressed.includes("-50%"), false);

  // Sanity: tiny input, tiny savings still rendered as a positive percentage.
  const small = make(1000, 100);
  assert.match(small, /Compressed: 1,100 → 1,000 \(9% saved\)/);
});

test("request log detail follows the email visibility setting for accounts", () => {
  const props = {
    log: {
      status: 200,
      method: "POST",
      path: "/v1/responses",
      timestamp: "2026-04-09T21:27:08.000Z",
      duration: 2500,
      provider: "codex",
      sourceFormat: "openai-responses",
      model: "gpt-5.5",
      account: "logs.user@example.com",
      tokens: { in: 10, out: 2 },
    },
    detail: {
      account: "logs.user@example.com",
      tokens: { in: 10, out: 2 },
    },
    loading: false,
    onClose: () => {},
    onCopy: async () => true,
  };

  const hiddenHtml = renderToStaticMarkup(
    React.createElement(RequestLoggerDetail, { ...props, emailsVisible: false })
  );
  const visibleHtml = renderToStaticMarkup(
    React.createElement(RequestLoggerDetail, { ...props, emailsVisible: true })
  );

  assert.match(hiddenHtml, /log\*{6}@\*{8}com/);
  assert.equal(hiddenHtml.includes("logs.user@example.com"), false);
  assert.notEqual(visibleHtml.indexOf("logs.user@example.com"), -1);
});
