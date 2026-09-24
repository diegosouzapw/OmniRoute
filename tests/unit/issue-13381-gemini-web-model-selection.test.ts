// #13381 — gemini-web advertised model IDs but never selected the requested
// model in the Gemini UI: every alias opened the identical page and ran the
// identical automation, so two structurally different advertised models
// produced byte-identical Playwright traces, and the OpenAI-shaped `model`
// field on the response was a caller-supplied label, not an observed fact.
//
// Owner decision (2026-09-15, Option B): implement real selection. gemini-web
// now drives an in-browser mode-selection step (open-sse/executors/gemini-web/
// modeSelection.ts) before typing anything: `gemini-3.1-pro` is the mode
// gemini.google.com/app already opens to (no interaction, matches every other
// pre-existing gemini-web test's fake page); every OTHER advertised model
// (and Extended Thinking, the reporter's 2026-09-11 follow-up) is switched to
// and READ BACK before the executor proceeds — a confirmed match is required,
// or the request fails closed with 400 `unsupported_control_for_provider`
// rather than silently running the account default under the requested
// label. The mode-selection selectors themselves are UNVALIDATED (no live
// Gemini account/DOM access from this checkout) — see modeSelection.ts and
// the PR's "Live check" section. This suite proves the STRUCTURE: the
// confirmed path proceeds, the unconfirmed path never does.

import test from "node:test";
import assert from "node:assert/strict";

const { GeminiWebExecutor } = await import("../../open-sse/executors/gemini-web.ts");
const { GEMINI_WEB_UNSUPPORTED_CONTROL_CODE } =
  await import("../../open-sse/executors/gemini-web/capabilities.ts");
const { GEMINI_WEB_MODEL_MODES, GEMINI_WEB_EXTENDED_THINKING_MODE } =
  await import("../../open-sse/executors/gemini-web/modeSelection.ts");

type Call = { fn: string; args: unknown[] };

interface SelectorScriptEntry {
  found: boolean;
  text?: string | null;
}

interface PageScript {
  /** Keyed by the EXACT selector string the production descriptor uses. */
  selectors?: Record<string, SelectorScriptEntry>;
}

/**
 * A configurable fake Playwright whose `waitForSelector` resolves the prompt
 * editor unconditionally (every pre-#13381 gemini-web test relies on that)
 * and otherwise consults `script.selectors`, keyed by the exact selector
 * string — read from the real `GEMINI_WEB_MODEL_MODES` /
 * `GEMINI_WEB_EXTENDED_THINKING_MODE` descriptors below, never duplicated as
 * a literal, so this suite stays valid across a future selector update.
 */
function makeFakePlaywright(calls: Call[], script: PageScript = {}) {
  return {
    newContext: async (opts: unknown) => {
      calls.push({ fn: "newContext", args: [opts] });
      return {
        addCookies: async (cookies: unknown) => {
          calls.push({ fn: "addCookies", args: [cookies] });
        },
        cookies: async () => [],
        newPage: async () => ({
          on: (event: string) => {
            calls.push({ fn: "page.on", args: [event] });
          },
          goto: async (url: string, opts2: unknown) => {
            calls.push({ fn: "goto", args: [url, opts2] });
          },
          waitForTimeout: async (ms: number) => {
            calls.push({ fn: "waitForTimeout", args: [ms] });
          },
          waitForSelector: async (selector: string, opts2: unknown) => {
            calls.push({ fn: "waitForSelector", args: [selector, opts2] });
            if (selector.includes(".ql-editor")) {
              return {
                click: async () => {
                  calls.push({ fn: "editor.click", args: [] });
                },
              };
            }
            const entry = script.selectors?.[selector];
            if (!entry || !entry.found) return null;
            return {
              click: async () => {
                calls.push({ fn: "mode.click", args: [selector] });
              },
              textContent: async () => entry.text ?? null,
            };
          },
          keyboard: {
            type: async (text: string, opts2: unknown) => {
              calls.push({ fn: "keyboard.type", args: [text, opts2] });
            },
            insertText: async (text: string) => {
              calls.push({ fn: "keyboard.insertText", args: [text] });
            },
            press: async (key: string) => {
              calls.push({ fn: "keyboard.press", args: [key] });
            },
          },
        }),
      };
    },
    close: async () => {
      calls.push({ fn: "browser.close", args: [] });
    },
  };
}

interface ErrorBodyLike {
  error: { message: string; type: string; code: string };
}

async function runWithFakePage(
  model: string,
  script: PageScript,
  extra: Record<string, unknown> = {}
): Promise<{ calls: Call[]; status: number; body: ErrorBodyLike | Record<string, unknown> }> {
  const playwright = await import("playwright");
  const originalLaunch = playwright.chromium.launch;
  const calls: Call[] = [];
  playwright.chromium.launch = (async () =>
    makeFakePlaywright(calls, script)) as unknown as typeof originalLaunch;
  try {
    const executor = new GeminiWebExecutor();
    const result = await executor.execute({
      model,
      body: { messages: [{ role: "user", content: "What is 2+2?" }], stream: false, ...extra },
      stream: false,
      credentials: { apiKey: "__Secure-1PSID=fake" },
      signal: AbortSignal.timeout(5000),
      log: null,
    });
    const body = (await result.response.json()) as ErrorBodyLike | Record<string, unknown>;
    return { calls, status: result.response.status, body };
  } finally {
    playwright.chromium.launch = originalLaunch;
  }
}

// ─── Regression guard: two different advertised models must diverge ────────

test(
  "#13381: distinct advertised gemini-web model IDs drive distinguishable Playwright " +
    "automation (per-model selection is genuinely attempted)",
  async () => {
    // gemini-3.1-pro is the mode gemini.google.com/app already opens to — no mode
    // switch is attempted, so it reaches the prompt editor and (since this fake page
    // never fires the "response" event) ends in 502.
    const runA = await runWithFakePage("gemini-3.1-pro", {});
    // gemini-3.7-flash requires a confirmed switch. This fake page's script has no
    // entry for its toggle selector, so the control is reported "not found" and the
    // request fails closed BEFORE the editor is ever touched.
    const runB = await runWithFakePage("gemini-3.7-flash", {});

    assert.notDeepEqual(
      runA.calls,
      runB.calls,
      "expected the automation trace to DIFFER between two distinct advertised models " +
        "(proving model selection is attempted) — an identical trace would mean the " +
        "executor still never selects the requested Gemini UI mode"
    );

    assert.equal(runA.status, 502, "the default model proceeds to the (unanswered) prompt");
    assert.equal(
      runB.status,
      400,
      "an unconfirmed non-default model must fail closed, never silently proceed"
    );
    assert.equal((runB.body as ErrorBodyLike).error.code, GEMINI_WEB_UNSUPPORTED_CONTROL_CODE);

    const gotoCall = runA.calls.find((c) => c.fn === "goto");
    assert.ok(gotoCall);
    assert.equal(gotoCall!.args[0], "https://gemini.google.com/app");

    // The core dishonesty this issue reported: runB must NOT reach the editor at all —
    // proceeding under an unconfirmed model label is exactly the bug being fixed.
    assert.equal(
      runB.calls.some((c) => c.fn === "editor.click"),
      false,
      "an unconfirmed model must never reach the prompt editor"
    );
  }
);

// ─── (a) Read-back confirms -> proceeds ─────────────────────────────────────

test("#13381: a confirmed model-mode read-back lets the request proceed to the prompt", async () => {
  const descriptor = GEMINI_WEB_MODEL_MODES["gemini-3.7-flash"];
  assert.ok(descriptor.toggleSelector && descriptor.activeIndicatorSelector);

  const { status, calls } = await runWithFakePage("gemini-3.7-flash", {
    selectors: {
      [descriptor.toggleSelector!]: { found: true },
      [descriptor.activeIndicatorSelector!]: { found: true, text: "Gemini 3.7 Flash" },
    },
  });

  assert.equal(
    status,
    502,
    "a CONFIRMED mode switch must proceed to the (unanswered-by-the-fake-page) prompt, not 400"
  );
  assert.ok(
    calls.some((c) => c.fn === "mode.click"),
    "the mode toggle must have been clicked"
  );
  assert.ok(
    calls.some((c) => c.fn === "editor.click"),
    "must reach the prompt editor once confirmed"
  );
});

// ─── (b) Control missing -> 400, never a silent 200 ─────────────────────────

test("#13381: a missing model-mode control fails closed with 400, not a silent 200", async () => {
  const { status, body } = await runWithFakePage("gemini-3.1-flash-lite", { selectors: {} });

  assert.notEqual(status, 200);
  assert.equal(status, 400);
  const err = (body as ErrorBodyLike).error;
  assert.equal(err.code, GEMINI_WEB_UNSUPPORTED_CONTROL_CODE);
  assert.match(err.message, /gemini-3\.1-flash-lite/);
  assert.equal(err.message.includes("at /"), false, "error bodies must stay sanitized");
});

// ─── (c) Read-back disagrees -> 400, not a silent success ───────────────────

test("#13381: a mismatched read-back fails closed with 400, not a silent success", async () => {
  const descriptor = GEMINI_WEB_MODEL_MODES["gemini-3.1-flash-lite"];
  const { status, body } = await runWithFakePage("gemini-3.1-flash-lite", {
    selectors: {
      [descriptor.toggleSelector!]: { found: true },
      // Toggle clicked, but the UI actually shows a different mode than requested.
      [descriptor.activeIndicatorSelector!]: { found: true, text: "Gemini 3.1 Pro" },
    },
  });

  assert.notEqual(status, 200);
  assert.equal(status, 400);
  assert.equal((body as ErrorBodyLike).error.code, GEMINI_WEB_UNSUPPORTED_CONTROL_CODE);
});

// ─── Unknown model id -> 400, not a silent account-default run ──────────────

test("#13381: an advertised-but-unmapped model id fails closed instead of running the account default", async () => {
  const { status, body } = await runWithFakePage("gemini-4.0-ultra-does-not-exist", {});

  assert.equal(status, 400);
  assert.equal((body as ErrorBodyLike).error.code, GEMINI_WEB_UNSUPPORTED_CONTROL_CODE);
});

// ─── Extended Thinking (#13381 follow-up, 2026-09-11 reporter comment) ──────

test("#13381: Extended Thinking is attempted and, once confirmed, the request proceeds", async () => {
  const descriptor = GEMINI_WEB_EXTENDED_THINKING_MODE;
  const { status, calls } = await runWithFakePage(
    "gemini-3.1-pro",
    {
      selectors: {
        [descriptor.toggleSelector!]: { found: true },
        [descriptor.activeIndicatorSelector!]: { found: true, text: "Deep Think enabled" },
      },
    },
    { reasoning_effort: "high" }
  );

  assert.equal(status, 502, "a CONFIRMED Extended Thinking switch must proceed to the prompt");
  assert.ok(calls.some((c) => c.fn === "mode.click"));
});

test(
  "#13381: Extended Thinking fails closed with 400 when the control cannot be confirmed " +
    "(no live account can verify it from this checkout)",
  async () => {
    const { status, body } = await runWithFakePage(
      "gemini-3.1-pro",
      { selectors: {} },
      { reasoning_effort: "high" }
    );

    assert.notEqual(status, 200);
    assert.equal(status, 400);
    const err = (body as ErrorBodyLike).error;
    assert.equal(err.code, GEMINI_WEB_UNSUPPORTED_CONTROL_CODE);
    assert.match(err.message, /Extended Thinking/);
  }
);

test("#13381: reasoning_effort none/minimal never triggers the Extended Thinking control at all", async () => {
  for (const effort of ["none", "minimal"]) {
    const { status, calls } = await runWithFakePage(
      "gemini-3.1-pro",
      {},
      { reasoning_effort: effort }
    );
    assert.equal(
      status,
      502,
      `effort="${effort}" must reach the ordinary (unanswered) prompt path`
    );
    assert.equal(
      calls.some((c) => c.fn === "mode.click"),
      false,
      `effort="${effort}" must not attempt any UI control switch`
    );
  }
});
