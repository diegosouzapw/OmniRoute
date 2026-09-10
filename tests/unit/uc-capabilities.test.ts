/**
 * Unit tests for the UC (uncensored.com) capability additions beyond text+tools:
 *   • the tool-dialect layer (code-style + Gemini <tool_code> parsing, refusal
 *     detection) for guardrailed persona models,
 *   • the persona input-media blob-upload layer (vision + doc), and
 *   • the vision catalog flags.
 * All hermetic — mocked fetch, no live network.
 */
import test from "node:test";
import assert from "node:assert/strict";
import { Buffer } from "node:buffer";

import {
  ucUsesCodestyle,
  ucLooksLikeRefusal,
  parseCodestyleCalls,
  parseToolcodeCalls,
  parseUcExtraDialects,
  UC_CODESTYLE_MODELS,
} from "../../open-sse/executors/uc/toolDialect.ts";
import {
  extractCurrentTurnMedia,
  uploadUcBlob,
  uploadUcTurnMedia,
} from "../../open-sse/executors/uc/media.ts";
import { buildPersonaFrame } from "../../open-sse/executors/uc/protocol.ts";
import { UC_MODELS, UC_REGISTRY_MODELS } from "../../open-sse/executors/uc/catalog.ts";

// ─── Tool dialect ────────────────────────────────────────────────────────────

const WEATHER_TOOL = [
  {
    type: "function",
    function: {
      name: "get_weather",
      description: "weather",
      parameters: { type: "object", properties: { city: { type: "string" } }, required: ["city"] },
    },
  },
];

test("ucUsesCodestyle is true only for the guardrailed model set", () => {
  assert.ok(ucUsesCodestyle("gpt-5.5"));
  assert.ok(!ucUsesCodestyle("claude-opus-46"));
  assert.ok(UC_CODESTYLE_MODELS.has("gpt-5.5"));
});

test("parseCodestyleCalls parses positional and keyword python-style calls", () => {
  const pos = parseCodestyleCalls('get_weather("Paris")', WEATHER_TOOL);
  assert.equal(pos.length, 1);
  assert.equal(pos[0].function.name, "get_weather");
  assert.deepEqual(JSON.parse(pos[0].function.arguments), { city: "Paris" });

  const kw = parseCodestyleCalls('get_weather(city="Lisbon")', WEATHER_TOOL);
  assert.deepEqual(JSON.parse(kw[0].function.arguments), { city: "Lisbon" });
});

test("parseCodestyleCalls only fires on DECLARED tool names (no prose false-positive)", () => {
  // A sentence that looks like a call but isn't a declared tool → ignored.
  assert.equal(parseCodestyleCalls("I think about this (deeply)", WEATHER_TOOL).length, 0);
  assert.equal(parseCodestyleCalls('unknown_fn("x")', WEATHER_TOOL).length, 0);
});

test("parseToolcodeCalls parses the Gemini <tool_code> print(mod.fn(..)) dialect", () => {
  const calls = parseToolcodeCalls(
    `<tool_code>\nprint(hermes_tools.get_weather(city='Berlin'))\n</tool_code>`,
    WEATHER_TOOL
  );
  assert.equal(calls.length, 1);
  assert.equal(calls[0].function.name, "get_weather"); // module prefix stripped
  assert.deepEqual(JSON.parse(calls[0].function.arguments), { city: "Berlin" });
});

test("parseUcExtraDialects prefers code-style for code-style models, else falls back", () => {
  // gpt-5.5 (code-style): the fn("x") form parses.
  assert.equal(parseUcExtraDialects('get_weather("Rome")', WEATHER_TOOL, "gpt-5.5").length, 1);
  // default model: code-style still works as a universal fallback.
  assert.equal(
    parseUcExtraDialects('get_weather("Rome")', WEATHER_TOOL, "claude-opus-46").length,
    1
  );
  // Gemini dialect works too.
  assert.equal(
    parseUcExtraDialects(
      "<tool_code>print(get_weather(city='X'))</tool_code>",
      WEATHER_TOOL,
      "gemini-emotional"
    ).length,
    1
  );
});

test("ucLooksLikeRefusal flags a short guardrail refusal but not a long real answer", () => {
  assert.ok(ucLooksLikeRefusal("I'm sorry, but I cannot assist with that."));
  assert.ok(!ucLooksLikeRefusal("x".repeat(500) + " i cannot assist with that"));
  assert.ok(!ucLooksLikeRefusal("Here is a helpful answer about the weather in Paris."));
});

// ─── Media input (vision + doc blob-upload) ──────────────────────────────────

const PNG_DATA_URL = "data:image/png;base64," + Buffer.from("fakepngbytes").toString("base64");
const PDF_DATA_URL =
  "data:application/pdf;base64," + Buffer.from("%PDF-1.4 fake").toString("base64");

test("extractCurrentTurnMedia pulls data-url images and remote image urls from the last user turn", () => {
  const { inline, remoteImageUrls } = extractCurrentTurnMedia([
    { role: "user", content: [{ type: "image_url", image_url: { url: "https://ex.com/a.png" } }] },
    { role: "assistant", content: "ok" },
    {
      role: "user",
      content: [
        { type: "text", text: "what is this?" },
        { type: "image_url", image_url: { url: PNG_DATA_URL } },
      ],
    },
  ]);
  // only the CURRENT (last) user turn's media
  assert.equal(inline.length, 1);
  assert.equal(inline[0].contentType, "image/png");
  assert.equal(remoteImageUrls.length, 0);
});

test("extractCurrentTurnMedia decodes OpenAI file, input_file, and Claude document parts", () => {
  const openaiFile = extractCurrentTurnMedia([
    {
      role: "user",
      content: [{ type: "file", file: { filename: "report.pdf", file_data: PDF_DATA_URL } }],
    },
  ]);
  assert.equal(openaiFile.inline[0].contentType, "application/pdf");

  const claudeDoc = extractCurrentTurnMedia([
    {
      role: "user",
      content: [
        {
          type: "document",
          source: {
            type: "base64",
            media_type: "application/pdf",
            data: Buffer.from("x").toString("base64"),
          },
        },
      ],
    },
  ]);
  assert.equal(claudeDoc.inline[0].contentType, "application/pdf");
});

test("extractCurrentTurnMedia returns empty for a plain text turn", () => {
  const { inline } = extractCurrentTurnMedia([{ role: "user", content: "hello" }]);
  assert.equal(inline.length, 0);
});

test("uploadUcBlob runs the signed-url → PUT → ready flow and returns the blob descriptor", async () => {
  const calls: string[] = [];
  const fakeFetch = (async (url: string, init?: RequestInit) => {
    const u = String(url);
    calls.push(`${init?.method ?? "GET"} ${u}`);
    if (u.includes("/generate-signed-url")) {
      return new Response(
        JSON.stringify({ signed_url: "https://d.moveinwater.com/up/tok", blob_name: "blob_123" }),
        { status: 200 }
      );
    }
    if (u.includes("/up/tok")) return new Response("", { status: 200 }); // PUT
    if (u.includes("/blob_123")) return new Response("", { status: 200 }); // ready HEAD
    return new Response("", { status: 404 });
  }) as unknown as typeof fetch;

  const blob = await uploadUcBlob(
    { bytes: Buffer.from("img"), contentType: "image/png" },
    { jwt: "jwt", uid: "uid-1", fetchImpl: fakeFetch }
  );
  assert.ok(blob);
  assert.equal(blob!.blobName, "blob_123");
  assert.equal(blob!.contentType, "image/png");
  // The signed-url POST carried the Bearer + content_type; the PUT sent the bytes.
  assert.ok(calls.some((c) => c.startsWith("POST") && c.includes("/generate-signed-url")));
  assert.ok(calls.some((c) => c.startsWith("PUT") && c.includes("/up/tok")));
});

test("uploadUcBlob returns null (best-effort) on a signed-url failure", async () => {
  const fakeFetch = (async () => new Response("nope", { status: 500 })) as unknown as typeof fetch;
  const blob = await uploadUcBlob(
    { bytes: Buffer.from("x"), contentType: "image/png" },
    { jwt: "j", uid: "u", fetchImpl: fakeFetch }
  );
  assert.equal(blob, null);
});

test("uploadUcTurnMedia uploads several files and skips failures", async () => {
  let n = 0;
  const fakeFetch = (async (url: string) => {
    const u = String(url);
    if (u.includes("/generate-signed-url")) {
      n++;
      // first file succeeds, second fails at signed-url
      if (n === 1) {
        return new Response(
          JSON.stringify({ signed_url: "https://d.moveinwater.com/up/t1", blob_name: "b1" }),
          {
            status: 200,
          }
        );
      }
      return new Response("", { status: 500 });
    }
    return new Response("", { status: 200 });
  }) as unknown as typeof fetch;

  const blobs = await uploadUcTurnMedia(
    [
      { bytes: Buffer.from("a"), contentType: "image/png" },
      { bytes: Buffer.from("b"), contentType: "application/pdf" },
    ],
    { jwt: "j", uid: "u", fetchImpl: fakeFetch }
  );
  assert.equal(blobs.length, 1);
  assert.equal(blobs[0].blobName, "b1");
});

test("buildPersonaFrame carries a media blob when provided (and stays clean without one)", () => {
  const withMedia = buildPersonaFrame({
    model: "claude-opus-46",
    text: "hi",
    history: [],
    uid: "uid",
    media: [{ blobName: "blob_9", contentType: "image/png" }],
  });
  assert.equal(withMedia.media_blob_name, "blob_9");
  assert.equal(withMedia.media_content_type, "image/png");

  const noMedia = buildPersonaFrame({
    model: "claude-opus-46",
    text: "hi",
    history: [],
    uid: "uid",
  });
  assert.equal(noMedia.media_blob_name, "");
  assert.equal(noMedia.media_content_type, "");
});

// ─── Vision catalog flags ────────────────────────────────────────────────────

test("catalog flags the vision-capable persona models (and not the text-only ones)", () => {
  const visionCount = UC_MODELS.filter((m) => m.supportsVision).length;
  assert.equal(visionCount, 15);
  const byId = new Map(UC_MODELS.map((m) => [m.id, m]));
  assert.ok(byId.get("claude-opus-46")?.supportsVision);
  assert.ok(byId.get("grok-4-3")?.supportsVision);
  assert.ok(byId.get("kimi-k2.5")?.supportsVision);
  // text-only models must NOT be flagged
  assert.ok(!byId.get("deepseek-r1")?.supportsVision);
  assert.ok(!byId.get("glm-5.1")?.supportsVision);
  assert.ok(!byId.get("minimax-m2-her")?.supportsVision);
});

test("UC_REGISTRY_MODELS surfaces supportsVision so /v1/models advertises it", () => {
  const claude = UC_REGISTRY_MODELS.find((m) => m.id === "claude-opus-46");
  assert.ok(claude?.supportsVision);
  const deepseek = UC_REGISTRY_MODELS.find((m) => m.id === "deepseek-r1");
  assert.ok(!deepseek?.supportsVision);
});
