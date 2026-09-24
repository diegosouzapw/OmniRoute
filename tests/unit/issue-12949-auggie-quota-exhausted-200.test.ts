// Regression test for issue #12949: the local `auggie` CLI prints its quota-exhausted
// warning to stdout and exits 0 (a clean exit). The executor used to treat any clean
// exit as a successful completion and wrap that text as a normal 200 assistant reply,
// so combo/fallback routing never failed over to the next configured model.
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const { AuggieExecutor } = await import("@omniroute/open-sse/executors/auggie");

const TMP_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-auggie-quota-test-"));

function writeFakeBin(name: string, script: string): string {
  const p = path.join(TMP_DIR, name);
  fs.writeFileSync(p, `#!/bin/sh\n${script}\n`, { mode: 0o755 });
  return p;
}

test.after(() => {
  fs.rmSync(TMP_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

test("issue #12949: auggie quota-exhausted stdout with exit 0 must NOT surface as HTTP 200 (non-streaming)", async () => {
  // Note: the CLI's real quota text is wrapped in the ⚠️ emoji, but this fixture
  // uses plain ASCII (single-quoted literal, no printf hex escapes — those are not
  // portable across shells, e.g. dash's printf does not interpret `\xHH`) — the
  // detector matches on the plain-English phrase, so the emoji is irrelevant to it.
  const bin = writeFakeBin(
    "fake-auggie-quota.sh",
    `printf '%s\\n' 'You have run out of usage for ursoambra@gmail.com. Please visit https://app.augmentcode.com/account to upgrade.'\nprintf '%s\\n' 'Request ID: f8f864e4-4559-4595-8514-678d1ff1aa09'\nexit 0`
  );
  const prevBin = process.env.AUGGIE_BIN;
  process.env.AUGGIE_BIN = bin;
  try {
    const executor = new AuggieExecutor();
    const { response } = await executor.execute({
      model: "sonnet4.6",
      body: { messages: [{ role: "user", content: "hi" }] },
      stream: false,
      credentials: {} as never,
    });
    assert.notEqual(
      response.status,
      200,
      "quota-exhausted Auggie output must not be reported as a successful 200 response " +
        "(combo routing would never fail over to the next model)"
    );
    assert.equal(response.status, 429, "quota-exhausted output should surface as 429");
    const body = (await response.json()) as { error?: { message?: string; code?: string } };
    assert.match(String(body.error?.message ?? ""), /run out of usage/i);
    assert.equal(body.error?.code, "AUGGIE_QUOTA_EXHAUSTED");
  } finally {
    if (prevBin === undefined) delete process.env.AUGGIE_BIN;
    else process.env.AUGGIE_BIN = prevBin;
  }
});

test("issue #12949: auggie quota-exhausted stdout with exit 0 must NOT surface as a normal completion (streaming)", async () => {
  const bin = writeFakeBin(
    "fake-auggie-quota-stream.sh",
    `printf '%s\\n' 'You have run out of usage for ursoambra@gmail.com. Please visit https://app.augmentcode.com/account to upgrade.'\nprintf '%s\\n' 'Request ID: f8f864e4-4559-4595-8514-678d1ff1aa09'\nexit 0`
  );
  const prevBin = process.env.AUGGIE_BIN;
  process.env.AUGGIE_BIN = bin;
  try {
    const executor = new AuggieExecutor();
    const { response } = await executor.execute({
      model: "sonnet4.6",
      body: { messages: [{ role: "user", content: "hi" }] },
      stream: true,
      credentials: {} as never,
    });
    const text = await response.text();
    const frames = text
      .split("\n\n")
      .map((chunk) => chunk.trim())
      .filter((chunk) => chunk.startsWith("data: ") && chunk !== "data: [DONE]")
      .map((chunk) => JSON.parse(chunk.slice("data: ".length)));

    const hasErrorFrame = frames.some(
      (frame) => frame && typeof frame === "object" && "error" in frame
    );
    assert.ok(hasErrorFrame, "expected an in-band {error:...} SSE frame for the quota text");

    const leakedQuotaDelta = frames.some((frame) => {
      const content = frame?.choices?.[0]?.delta?.content;
      return typeof content === "string" && /run out of usage/i.test(content);
    });
    assert.equal(
      leakedQuotaDelta,
      false,
      "the quota-exhausted text must not be forwarded as a normal delta.content chunk"
    );
  } finally {
    if (prevBin === undefined) delete process.env.AUGGIE_BIN;
    else process.env.AUGGIE_BIN = prevBin;
  }
});

test("issue #12949: a normal reply that merely mentions usage/quota in passing is NOT misclassified as quota-exhausted", async () => {
  const bin = writeFakeBin(
    "fake-auggie-normal.sh",
    `printf 'Sure — here is how you can check your API usage and quota dashboard in the settings page.'\nexit 0`
  );
  const prevBin = process.env.AUGGIE_BIN;
  process.env.AUGGIE_BIN = bin;
  try {
    const executor = new AuggieExecutor();
    const { response } = await executor.execute({
      model: "sonnet4.6",
      body: { messages: [{ role: "user", content: "how do I check usage?" }] },
      stream: false,
      credentials: {} as never,
    });
    assert.equal(response.status, 200, "a normal reply discussing usage/quota must stay a 200");
    const body = (await response.json()) as { choices?: Array<{ message?: { content?: string } }> };
    assert.match(String(body.choices?.[0]?.message?.content ?? ""), /usage and quota dashboard/i);
  } finally {
    if (prevBin === undefined) delete process.env.AUGGIE_BIN;
    else process.env.AUGGIE_BIN = prevBin;
  }
});
