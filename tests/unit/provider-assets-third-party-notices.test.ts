import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const NOTICE_PATH = new URL("../../THIRD_PARTY_NOTICES.md", import.meta.url);
const notice = await readFile(NOTICE_PATH, "utf8");

const LOBEHUB_ASSETS = [
  ["360ai.svg", "package/es/Ai360/components/Color.js"],
  ["baichuan.svg", "package/es/Baichuan/components/Color.js"],
  ["codex.svg", "package/es/Codex/components/Color.js"],
  ["copilot.svg", "package/es/Copilot/components/Color.js"],
  ["openclaw.svg", "package/es/OpenClaw/components/Color.js"],
  ["stepfun.svg", "package/es/Stepfun/components/Color.js"],
] as const;

const THESVG_ASSETS = [
  "alibaba",
  "anthropic",
  "arcee",
  "assemblyai",
  "aws",
  "azure",
  "bailian",
  "baseten",
  "cerebras",
  "cline",
  "comfyui",
  "continue",
  "cursor",
  "deepgram",
  "deepinfra",
  "elevenlabs",
  "exa",
  "fal",
  "fireworks",
  "friendli",
  "gemini",
  "grok",
  "groq",
  "heroku",
  "huggingface",
  "hyperbolic",
  "ibm",
  "inference",
  "lambda",
  "longcat",
  "minimax",
  "mistral",
  "moonshot",
  "morph",
  "nebius",
  "novita",
  "nvidia",
  "ollama",
  "openai",
  "openrouter",
  "ovhcloud",
  "picoclaw",
  "poe",
  "pollinations",
  "qwen",
  "recraft",
  "replicate",
  "roocode",
  "runway",
  "sambanova",
  "searchapi",
  "suno",
  "tavily",
  "topazlabs",
  "trae",
  "udio",
  "upstage",
  "v0",
  "vercel",
  "vllm",
  "volcengine",
  "voyage",
  "windsurf",
  "xai",
  "zhipu",
] as const;

const THESVG_CLAIMS = {
  MIT: [
    "alibaba",
    "arcee",
    "assemblyai",
    "aws",
    "bailian",
    "baseten",
    "cerebras",
    "comfyui",
    "deepinfra",
    "exa",
    "fal",
    "fireworks",
    "friendli",
    "gemini",
    "grok",
    "groq",
    "heroku",
    "hyperbolic",
    "ibm",
    "inference",
    "lambda",
    "longcat",
    "mistral",
    "moonshot",
    "morph",
    "nebius",
    "novita",
    "openai",
    "picoclaw",
    "pollinations",
    "qwen",
    "recraft",
    "roocode",
    "runway",
    "sambanova",
    "searchapi",
    "tavily",
    "topazlabs",
    "trae",
    "udio",
    "upstage",
    "vllm",
    "volcengine",
    "voyage",
    "xai",
    "zhipu",
  ],
  "CC0-1.0": [
    "anthropic",
    "cline",
    "cursor",
    "deepgram",
    "elevenlabs",
    "nvidia",
    "ollama",
    "openrouter",
    "poe",
    "replicate",
    "suno",
    "v0",
    "vercel",
    "windsurf",
  ],
  "Apache-2.0": ["continue"],
  "brand-use": ["azure", "ovhcloud"],
  Custom: ["minimax"],
  MISSING: ["huggingface"],
} as const;

function section(start: string, end?: string): string {
  const startIndex = notice.indexOf(start);
  assert.notEqual(startIndex, -1, `missing notice section: ${start}`);
  const endIndex = end ? notice.indexOf(end, startIndex + start.length) : notice.length;
  assert.notEqual(endIndex, -1, `missing notice boundary: ${end}`);
  return notice.slice(startIndex, endIndex);
}

function backtickedValues(text: string): string[] {
  return [...text.matchAll(/`([^`]+)`/g)].map((match) => match[1]);
}

test("provider asset notice pins the complete LobeHub MIT source and six derivatives", () => {
  const lobe = section("## LobeHub provider asset derivatives", "## theSVG provider assets");

  assert.match(lobe, /@lobehub\/icons@5\.10\.0/);
  assert.match(lobe, /https:\/\/registry\.npmjs\.org\/@lobehub\/icons\/-\/icons-5\.10\.0\.tgz/);
  assert.match(lobe, /add1baced073a60157d39c7820b8d5c1928a1054/);
  assert.match(
    lobe,
    /sha512-CIpjkISCLRK7haDtSugGFd0o3odaJts8ewJOkUiEFtns3xvsqbl8i24eowBnjw\+yMDQVQyNONlhqTD58YC6Ljg==/
  );
  assert.match(lobe, /Copyright \(c\) 2023 LobeHub/);
  assert.match(lobe, /Permission is hereby granted, free of charge/);
  assert.match(lobe, /THE SOFTWARE IS PROVIDED "AS IS"/);

  for (const [asset, source] of LOBEHUB_ASSETS) {
    assert.match(lobe, new RegExp(`public/providers/${asset.replace(".", "\\.")}.*${source}`));
  }

  const localAssets = backtickedValues(lobe)
    .filter((value) => value.startsWith("public/providers/"))
    .map((value) => value.replace("public/providers/", ""));
  assert.deepEqual(
    localAssets,
    LOBEHUB_ASSETS.map(([asset]) => asset)
  );
});

test("theSVG notice pins the byte-exact 65-file scope without relicensing brand marks", () => {
  const thesvg = section("## theSVG provider assets");
  const scope = section("### Byte-exact file scope (65/65)", "### Upstream registry claims");

  assert.match(thesvg, /GLINCKER\/thesvg/);
  assert.match(thesvg, /7870bc1c5f657d9accbb7f96cc457b8dd3363ee8/);
  assert.match(thesvg, /public\/icons\/<slug>\/default\.svg/);
  assert.match(thesvg, /Copyright \(c\) 2025 thesvg\.org/);
  assert.match(thesvg, /Permission is hereby granted, free of charge/);
  assert.match(thesvg, /THE SOFTWARE IS PROVIDED "AS IS"/);
  assert.match(thesvg, /does not relicense/i);
  assert.match(thesvg, /trademark clearance/i);

  const localAssets = backtickedValues(scope)
    .filter((value) => value.startsWith("public/providers/"))
    .map((value) => value.replace("public/providers/", "").replace(/\.svg$/, ""));
  assert.equal(new Set(localAssets).size, 65);
  assert.deepEqual(localAssets, [...THESVG_ASSETS]);
  assert.doesNotMatch(thesvg, /all (?:65 )?(?:logos|assets) (?:are|as) MIT/i);
  assert.doesNotMatch(thesvg, /logos (?:are|as) open[- ]source/i);
});

test("theSVG registry claims retain exact counts, group membership, and HOLD boundaries", () => {
  const claims = section(
    "### Upstream registry claims",
    "### Trademark and affiliation disclaimer"
  );
  const expectedCounts = new Map([
    ["MIT", 46],
    ["CC0-1.0", 14],
    ["Apache-2.0", 1],
    ["brand-use", 2],
    ["Custom", 1],
    ["MISSING", 1],
  ]);

  for (const [claim, expectedAssets] of Object.entries(THESVG_CLAIMS)) {
    const rowPattern = new RegExp(
      `\\|\\s*${claim.replace(".", "\\.")}\\s*\\|\\s*${expectedCounts.get(claim)}\\s*\\|`
    );
    assert.match(claims, rowPattern);
    const group = section(`#### ${claim} (${expectedAssets.length})`, `<!-- end:${claim} -->`);
    assert.deepEqual(backtickedValues(group), [...expectedAssets]);
  }

  assert.match(claims, /claims recorded by the fixed upstream registry/i);
  assert.match(claims, /not independently verified/i);
  assert.match(claims, /continue.*HOLD.*NOTICE/is);
  assert.match(claims, /azure.*ovhcloud.*not open-source licenses/is);
  assert.match(claims, /minimax.*HOLD/is);
  assert.match(claims, /huggingface.*HOLD/is);

  const disclaimer = section("### Trademark and affiliation disclaimer");
  assert.match(disclaimer, /nominative/i);
  assert.match(disclaimer, /no affiliation/i);
  assert.match(disclaimer, /endorsement/i);
  assert.match(disclaimer, /respective owners/i);
});
