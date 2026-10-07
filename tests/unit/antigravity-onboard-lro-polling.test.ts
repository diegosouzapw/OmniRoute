/**
 * Tests: onboardUser Long-Running-Operation polling in
 * ensureAntigravityProjectAssigned.
 *
 * onboardUser is a Google LRO: the first call frequently answers with
 * {"done": false} (no cloudaicompanionProject field yet) and expects the
 * SAME request re-sent every couple of seconds until the operation settles
 * with {"done": true, response: {...}}. Treating that first "done:false"
 * response as "no project" (BYOP) misclassifies a normal in-progress
 * onboarding as "bring your own project" and permanently caches the wrong
 * verdict for the process lifetime — every subsequent request for that
 * account 422s with "Missing Google projectId" even though onboarding would
 * have succeeded on the next poll. Reproduces the exact symptom reported in
 * https://github.com/diegosouzapw/OmniRoute/issues/11379 (repeated
 * "loadCodeAssist ... returned no project id" across reconnect/restart).
 *
 * These tests verify:
 * 1. A {"done": false} response is polled (same endpoint, re-sent) rather
 *    than immediately classified as BYOP.
 * 2. A subsequent {"done": true, response: {cloudaicompanionProject}}
 *    resolves the project id.
 * 3. A genuinely empty {} response (no `done` field at all — not an LRO in
 *    progress, Google's immediate "no project" answer) is still classified
 *    as BYOP on the FIRST attempt, unchanged from before this fix — this is
 *    the case #8491 introduced, and must not regress.
 * 4. Polling is bounded (does not loop forever on a stuck operation).
 */

import { test, describe, beforeEach } from "node:test";
import assert from "node:assert/strict";

import {
  ensureAntigravityProjectAssigned,
  clearAntigravityProjectCache,
  ANTIGRAVITY_REQUIRES_MANUAL_PROJECT,
} from "../../open-sse/services/antigravityProjectBootstrap.ts";

beforeEach(() => {
  clearAntigravityProjectCache();
});

describe("ensureAntigravityProjectAssigned — onboardUser LRO polling", () => {
  test("polls a {done:false} response instead of treating it as BYOP", async () => {
    let onboardCalls = 0;
    let onboarded = false;

    const mockFetch = async (url: string): Promise<Response> => {
      if (url.includes("loadCodeAssist")) {
        // Post-onboard retry (ensureAntigravityProjectAssigned re-calls
        // loadCodeAssist once onboardUser reports success) now finds the
        // freshly-created project.
        return onboarded
          ? new Response(JSON.stringify({ cloudaicompanionProject: "proj-after-poll" }), {
              status: 200,
            })
          : new Response(JSON.stringify({}), { status: 200 });
      }
      if (url.includes("onboardUser")) {
        onboardCalls++;
        if (onboardCalls === 1) {
          return new Response(JSON.stringify({ done: false }), { status: 200 });
        }
        onboarded = true;
        return new Response(
          JSON.stringify({ done: true, response: { cloudaicompanionProject: "proj-after-poll" } }),
          { status: 200 }
        );
      }
      return new Response("not found", { status: 404 });
    };

    const projectId = await ensureAntigravityProjectAssigned(
      "test-token",
      mockFetch as typeof fetch,
      "ide"
    );

    assert.equal(onboardCalls, 2, "should have polled onboardUser a second time");
    assert.equal(projectId, "proj-after-poll");
  });

  test("still classifies a genuinely empty {} response as BYOP on the first attempt (#8491, no regression)", async () => {
    let onboardCalls = 0;

    const mockFetch = async (url: string): Promise<Response> => {
      if (url.includes("loadCodeAssist")) {
        return new Response(JSON.stringify({}), { status: 200 });
      }
      if (url.includes("onboardUser")) {
        onboardCalls++;
        return new Response(JSON.stringify({}), { status: 200 });
      }
      return new Response("not found", { status: 404 });
    };

    const result = await ensureAntigravityProjectAssigned(
      "test-token",
      mockFetch as typeof fetch,
      "ide"
    );

    assert.equal(onboardCalls, 1, "an absent `done` field must not trigger polling");
    assert.equal(result, ANTIGRAVITY_REQUIRES_MANUAL_PROJECT);
  });

  test("bounds polling instead of looping forever on a stuck operation", async () => {
    let onboardCalls = 0;

    const mockFetch = async (url: string): Promise<Response> => {
      if (url.includes("loadCodeAssist")) {
        return new Response(JSON.stringify({}), { status: 200 });
      }
      if (url.includes("onboardUser")) {
        onboardCalls++;
        return new Response(JSON.stringify({ done: false }), { status: 200 });
      }
      return new Response("not found", { status: 404 });
    };

    const result = await ensureAntigravityProjectAssigned(
      "test-token",
      mockFetch as typeof fetch,
      "ide"
    );

    assert.ok(
      onboardCalls > 1 && onboardCalls <= 5,
      `expected bounded polling, got ${onboardCalls} calls`
    );
    assert.equal(result, undefined);
  });
});
