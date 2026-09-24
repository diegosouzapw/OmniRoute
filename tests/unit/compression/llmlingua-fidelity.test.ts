/**
 * Fidelity tests for the llmlingua engine (#13455).
 *
 * The default TinyBERT model is uncased (`do_lower_case: true`): it rebuilds
 * output from lower-cased word pieces, prunes negations/absolutes and eats the
 * whitespace around preserved spans. The engine must therefore shield tags +
 * negations from the backend, map surviving words back to their original spans
 * (casing) and restore edge whitespace on re-stitch — all model-free, via the
 * `setLlmlinguaBackend` hook.
 */

import { describe, it, after } from "node:test";
import assert from "node:assert/strict";

import {
  llmlinguaEngine,
  setLlmlinguaBackend,
} from "../../../open-sse/services/compression/engines/llmlingua/index.ts";

function makeBody(content: string): Record<string, unknown> {
  return { model: "gpt-4o", messages: [{ role: "user", content }] };
}

function outContent(result: Awaited<ReturnType<typeof llmlinguaEngine.applyAsync>>): string {
  return (result.body.messages as Array<{ role: string; content: string }>)[0]!.content;
}

/**
 * Simulates the uncased-model backend: lowercases, trims edges, collapses
 * inner whitespace runs and drops a negation — i.e. what the real TinyBERT
 * path observably does to prose.
 */
function uncasedModelBackend(text: string): Promise<string> {
  let out = text.toLowerCase();
  out = out.replace(/\bdon't\b/g, "");
  out = out.trim().replace(/\s+/g, " ");
  return Promise.resolve(out);
}

after(() => {
  setLlmlinguaBackend(null);
});

describe("llmlingua engine — fidelity (#13455)", () => {
  it("case, newlines and spacing around preserved spans survive re-stitching", async () => {
    setLlmlinguaBackend(uncasedModelBackend);

    const code = "`rm -rf`";
    const content = `Deploy rules:\n\nNever run this:\n\n${code}\n\nAlways verify first.`;
    const result = await llmlinguaEngine.applyAsync!(makeBody(content), {
      stepConfig: { minTokens: 0 },
    });

    const out = outContent(result);
    // Preserved span byte-identical, with original newlines/spacing around it.
    assert.ok(
      out.includes(`this:\n\n${code}\n\nAlways`),
      `newlines/spacing around ${code} must survive.\nGot:\n${out}`
    );
    // Surviving words keep their original casing despite the lower-casing backend.
    assert.ok(out.includes("Deploy rules:"), `prose casing must be restored.\nGot:\n${out}`);
    // The absolutes Never/Always are shielded verbatim (original case).
    assert.ok(out.includes("Never run this:"), `negation casing must survive.\nGot:\n${out}`);
  });

  it("negations/absolutes never reach the backend and are kept verbatim", async () => {
    const seen: string[] = [];
    setLlmlinguaBackend((text) => {
      seen.push(text);
      return uncasedModelBackend(text);
    });

    const content =
      "NEVER run rm on the target host. Do not push to main directly. " +
      "You must ask first. Don't restart the database.";
    const result = await llmlinguaEngine.applyAsync!(makeBody(content), {
      stepConfig: { minTokens: 0 },
    });

    const joined = seen.join("\n").toLowerCase();
    for (const word of ["never", "not", "must", "don't"]) {
      assert.ok(
        !new RegExp(`\\b${word}\\b`).test(joined),
        `backend must never see ${word}; got backend inputs:\n${seen.join("\n")}`
      );
    }

    const out = outContent(result);
    for (const word of ["NEVER", "Do not", "must", "Don't"]) {
      assert.ok(out.includes(word), `output must keep ${word} verbatim.\nGot:\n${out}`);
    }
  });

  it("XML-style tags are never sent to the backend and survive verbatim", async () => {
    const seen: string[] = [];
    setLlmlinguaBackend((text) => {
      seen.push(text);
      // Backend that additionally strips anything looking like a tag.
      return uncasedModelBackend(text).then((s) => s.replace(/<[^>]*>/g, ""));
    });

    const content = "Hello <tag> world, see <foo>bar</foo> and a lone </tag> here.";
    const result = await llmlinguaEngine.applyAsync!(makeBody(content), {
      stepConfig: { minTokens: 0 },
    });

    for (const call of seen) {
      assert.ok(!call.includes("<"), `backend must not receive tags, got:\n${call}`);
    }

    const out = outContent(result);
    for (const tag of ["<tag>", "<foo>", "</foo>", "</tag>"]) {
      assert.ok(out.includes(tag), `output must keep ${tag} verbatim.\nGot:\n${out}`);
    }
  });

  it("system-reminder envelope stays byte-identical and keeps boundary newlines", async () => {
    setLlmlinguaBackend(uncasedModelBackend);

    const envelope =
      "<system-reminder>\nProject instructions:\n\n- NEVER run `rm -rf`.\n- Do NOT edit `/etc`.\n</system-reminder>";
    const content = `${envelope}\n\nPlease deploy the fix. Thanks!`;
    const result = await llmlinguaEngine.applyAsync!(makeBody(content), {
      stepConfig: { minTokens: 0 },
    });

    const out = outContent(result);
    assert.ok(out.includes(envelope), `envelope must be byte-identical.\nGot:\n${out}`);
    assert.ok(
      out.includes("</system-reminder>\n\nPlease"),
      `blank line after the envelope must survive (was: </system-reminder>please).\nGot:\n${out}`
    );
  });

  it("empty backend output fail-opens instead of deleting the segment", async () => {
    setLlmlinguaBackend(() => Promise.resolve(""));

    const content = "Some prose the backend wipes out entirely.";
    const body = makeBody(content);
    const result = await llmlinguaEngine.applyAsync!(body, { stepConfig: { minTokens: 0 } });

    assert.equal(result.compressed, false, "empty reply must fail-open");
    assert.equal(outContent(result), content, "original segment must be kept");
  });

  it("hyphenated compounds like no-op are not fragmented", async () => {
    const seen: string[] = [];
    setLlmlinguaBackend((text) => {
      seen.push(text);
      return Promise.resolve("X");
    });

    const content = "This change is a no-op for existing users.";
    await llmlinguaEngine.applyAsync!(makeBody(content), { stepConfig: { minTokens: 0 } });

    assert.ok(
      seen.some((call) => call.includes("no-op")),
      `no-op must reach the backend whole; got backend inputs:\n${seen.join("\n")}`
    );
  });
});
