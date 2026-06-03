import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { createRequire } from "node:module";
import { readdirSync, readFileSync } from "node:fs";
import path from "node:path";
import { cavemanCompress } from "../../open-sse/services/compression/caveman.ts";
import {
  compressDescriptionsInPlace,
  getMcpDescriptionCompressionStats,
  resetMcpDescriptionCompressionStats,
} from "../../open-sse/mcp-server/descriptionCompressor.ts";

const require = createRequire(import.meta.url);
const upstreamFixtureDir = path.resolve("_references/_outros/caveman/tests/caveman-compress");
const upstream = require(
  path.resolve("_references/_outros/caveman/mcp-servers/caveman-shrink/compress.js")
) as {
  compress(text: string): { compressed: string; before: number; after: number };
};

function omnirouteCompress(text: string): string {
  return omniroutePromptCompression(text).text;
}

function omniroutePromptCompression(text: string): { text: string; fallbackApplied: boolean } {
  const result = cavemanCompress(
    { messages: [{ role: "user", content: text }] },
    {
      enabled: true,
      compressRoles: ["user"],
      skipRules: [],
      minMessageLength: 0,
      preservePatterns: [],
      intensity: "full",
    }
  );
  return {
    text: result.body.messages[0].content as string,
    fallbackApplied: result.stats?.fallbackApplied === true,
  };
}

const parityCases = [
  "The user is the owner of an account and should make sure to configure the database.",
  "Sure, this just basically returns the value from config.api.endpoint().",
  "I will perhaps connect to the database using API_KEY_VALUE and version 3.7.9.",
  "Read just the file at /tmp/the/just/file.txt and see https://example.com/the/api.",
];

describe("upstream Caveman parity benchmark", () => {
  it("matches core upstream shrink protections and savings direction", () => {
    for (const input of parityCases) {
      const ours = omnirouteCompress(input);
      const theirs = upstream.compress(input).compressed;
      assert.ok(ours.length <= input.length, `OmniRoute did not reduce: ${input}`);
      assert.ok(theirs.length <= input.length, `Upstream did not reduce: ${input}`);
      for (const protectedToken of [
        "config.api.endpoint()",
        "API_KEY_VALUE",
        "3.7.9",
        "/tmp/the/just/file.txt",
        "https://example.com/the/api",
      ]) {
        if (input.includes(protectedToken)) {
          assert.match(ours, new RegExp(protectedToken.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")));
        }
      }
    }
  });

  it("stays within upstream token budget on representative prose", () => {
    const input =
      "Sure, I will make sure to return the current weather for a given location and the temperature in Fahrenheit.";
    const ours = omnirouteCompress(input);
    const theirs = upstream.compress(input).compressed;
    assert.ok(
      ours.length <= Math.ceil(theirs.length * 1.2),
      `Expected OmniRoute within 20% of upstream shrink length. ours=${ours.length}, upstream=${theirs.length}`
    );
  });

  it("tracks MCP description shrink parity separately from prompt compression", () => {
    resetMcpDescriptionCompressionStats();
    const originalDescription =
      "The tool returns the current weather for a given location and the temperature in Fahrenheit.";
    const payload = {
      tools: [
        {
          name: "get_weather",
          description: originalDescription,
        },
      ],
    };

    compressDescriptionsInPlace(payload);
    const stats = getMcpDescriptionCompressionStats();
    assert.ok(payload.tools[0].description.length < originalDescription.length);
    assert.equal(stats.descriptionsCompressed, 1);
    assert.ok(stats.estimatedTokensSaved > 0);
  });

  it("runs offline parity against upstream Caveman fixture files", () => {
    const fixturePairs = readdirSync(upstreamFixtureDir)
      .filter((entry) => entry.endsWith(".original.md"))
      .map((originalName) => ({
        name: originalName.replace(/\.original\.md$/, ""),
        originalPath: path.join(upstreamFixtureDir, originalName),
        compressedPath: path.join(
          upstreamFixtureDir,
          originalName.replace(/\.original\.md$/, ".md")
        ),
      }));

    assert.ok(fixturePairs.length >= 5, "expected upstream fixture pairs");

    for (const fixture of fixturePairs) {
      const original = readFileSync(fixture.originalPath, "utf8");
      const expected = readFileSync(fixture.compressedPath, "utf8");
      const ours = omniroutePromptCompression(original);
      const upstreamShrink = upstream.compress(original).compressed;

      assert.ok(
        expected.length < original.length,
        `${fixture.name}: upstream fixture did not reduce`
      );
      if (ours.fallbackApplied) {
        assert.equal(
          ours.text,
          original,
          `${fixture.name}: fallback must preserve original fixture verbatim`
        );
      } else {
        assert.ok(ours.text.length < original.length, `${fixture.name}: OmniRoute did not reduce`);
        assert.ok(
          ours.text.length <= Math.ceil(Math.max(expected.length, upstreamShrink.length) * 1.35),
          `${fixture.name}: OmniRoute drifted too far from upstream fixture budget`
        );
      }

      for (const protectedPattern of [/```[\s\S]*?```/g, /`[^`\n]+`/g, /https?:\/\/\S+/g]) {
        const protectedValues = original.match(protectedPattern) ?? [];
        for (const protectedValue of protectedValues) {
          assert.ok(
            ours.text.includes(protectedValue),
            `${fixture.name}: protected content changed: ${protectedValue.slice(0, 80)}`
          );
        }
      }
    }
  });
});
