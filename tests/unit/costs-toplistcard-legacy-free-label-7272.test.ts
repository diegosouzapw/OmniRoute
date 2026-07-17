import test from "node:test";
import assert from "node:assert/strict";
import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { TopListCard } from "../../src/app/(dashboard)/dashboard/costs/components/TopListCard";

// Regression for issue #7272: /dashboard/costs?range=all&apiKeyIds=...&groupBy=model
// crashed with "ReferenceError: t is not defined" because TopListCard referenced the
// bare `t` identifier from an outer component's scope instead of receiving the
// resolved label as a prop (mirroring the working CostBreakdownTable pattern).
test("TopListCard renders the legacyFreeLabel prop for the zero-cost / !hasCostData branch without throwing", () => {
  const rows = [{ model: "some-free-model", cost: 0, totalTokens: 100 }];

  const html = renderToStaticMarkup(
    React.createElement(TopListCard, {
      title: "Top Models",
      rows,
      nameKey: "model",
      valueKey: "cost",
      secondaryKey: "totalTokens",
      secondaryLabel: "tokens",
      locale: "en",
      hasCostData: false,
      legacyFreeLabel: "Legacy / Free",
    })
  );

  assert.match(html, /Legacy \/ Free/);
});

test("TopListCard renders the formatted cost when hasCostData is true (unaffected branch)", () => {
  const rows = [{ model: "gpt-5", cost: 1.23, totalTokens: 500 }];

  const html = renderToStaticMarkup(
    React.createElement(TopListCard, {
      title: "Top Models",
      rows,
      nameKey: "model",
      valueKey: "cost",
      secondaryKey: "totalTokens",
      secondaryLabel: "tokens",
      locale: "en",
      hasCostData: true,
      legacyFreeLabel: "Legacy / Free",
    })
  );

  assert.doesNotMatch(html, /Legacy \/ Free/);
});
