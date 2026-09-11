import test from "node:test";
import assert from "node:assert/strict";
import {
  attachTokensPerSecond,
  generationDurationMs,
  tokensPerSecond,
} from "../../open-sse/utils/generationThroughput.ts";
import { filterUsageForFormat } from "../../open-sse/utils/usageTracking.ts";
import { FORMATS } from "../../open-sse/translator/formats.ts";
import { createStreamTiming } from "../../open-sse/utils/streamTiming.ts";
import {
  buildOmniRouteResponseMetaHeaders,
  buildOmniRouteSseMetadataComment,
} from "../../src/domain/omnirouteResponseMeta.ts";
import { OMNIROUTE_RESPONSE_HEADERS } from "../../src/shared/constants/headers.ts";

test("#12616 tok/s excludes TTFT (200 tokens over 2s generation after 3s TTFT)", () => {
  const generationMs = generationDurationMs(5000, 3000);
  assert.equal(generationMs, 2000);
  assert.equal(tokensPerSecond(200, generationMs), 100);
});

test("#12616 tok/s is omitted when TTFT is unknown (do not use tokens/total_latency)", () => {
  assert.equal(generationDurationMs(5000, null), null);
  assert.equal(tokensPerSecond(200, null), null);
  const usage = attachTokensPerSecond({ prompt_tokens: 10, completion_tokens: 200 }, null);
  assert.equal((usage as { tokens_per_second?: number }).tokens_per_second, undefined);
});

test("#12616 tok/s is omitted when generation duration is not positive", () => {
  assert.equal(generationDurationMs(3000, 3000), null);
  assert.equal(generationDurationMs(2000, 3000), null);
  assert.equal(tokensPerSecond(0, 2000), null);
});

test("#12616 filterUsageForFormat keeps tokens_per_second for OpenAI and Claude", () => {
  const usage = { prompt_tokens: 10, completion_tokens: 20, tokens_per_second: 42.5 };
  const openai = filterUsageForFormat(usage, FORMATS.OPENAI) as Record<string, unknown>;
  const claude = filterUsageForFormat(
    { input_tokens: 10, output_tokens: 20, tokens_per_second: 42.5 },
    FORMATS.CLAUDE
  ) as Record<string, unknown>;
  assert.equal(openai.tokens_per_second, 42.5);
  assert.equal(claude.tokens_per_second, 42.5);
});

test("#12616 headers omit tok/s without ttftMs and emit it when TTFT is known", () => {
  const without = buildOmniRouteResponseMetaHeaders({
    provider: "openai",
    model: "gpt-4o-mini",
    latencyMs: 5000,
    usage: { prompt_tokens: 11, completion_tokens: 200 },
  });
  assert.equal(without[OMNIROUTE_RESPONSE_HEADERS.tokensPerSecond], undefined);

  const withTtft = buildOmniRouteResponseMetaHeaders({
    provider: "openai",
    model: "gpt-4o-mini",
    latencyMs: 5000,
    ttftMs: 3000,
    usage: { prompt_tokens: 11, completion_tokens: 200 },
  });
  assert.equal(withTtft[OMNIROUTE_RESPONSE_HEADERS.tokensPerSecond], "100.000");
});

test("#12616 SSE comment carries tok/s from usage.tokens_per_second when TTFT is unknown", () => {
  const comment = buildOmniRouteSseMetadataComment({
    provider: "openai",
    model: "gpt-4o-mini",
    latencyMs: 50,
    usage: { prompt_tokens: 4, completion_tokens: 2, tokens_per_second: 12.5 },
  });
  assert.match(comment, /^: x-omniroute-tokens-per-second=12.500/m);
});

test("#12616 StreamTiming.withTps attaches tok/s after first forward", async () => {
  const t = createStreamTiming();
  t.markForward();
  await new Promise((r) => setTimeout(r, 25));
  const usage = t.withTps({ prompt_tokens: 1, completion_tokens: 100 });
  const tps = (usage as { tokens_per_second?: number }).tokens_per_second;
  assert.equal(typeof tps, "number");
  assert.ok(tps! > 0);
});
