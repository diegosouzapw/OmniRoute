import { describe, it } from "node:test";
import assert from "node:assert/strict";
import {
  compressDescriptionsInPlace,
  compressMcpListMetadata,
  compressMcpRegistryMetadata,
  compressMcpDescription,
  getMcpDescriptionCompressionStats,
  maybeCompressMcpDescription,
  resetMcpDescriptionCompressionStats,
} from "../../../open-sse/mcp-server/descriptionCompressor.ts";

describe("MCP description compression", () => {
  it("compresses MCP-style descriptions while preserving substance", () => {
    const input =
      "Get the current weather for a given location. Returns the temperature in Fahrenheit. Please make sure to provide the location as a city name.";
    const result = compressMcpDescription(input);
    assert.ok(result.after < result.before);
    assert.match(result.compressed, /weather/i);
    assert.match(result.compressed, /Fahrenheit/i);
    assert.match(result.compressed, /city name/i);
    assert.doesNotMatch(result.compressed, /\bthe\b/i);
  });

  it("preserves code, URLs, paths, identifiers, and versions", () => {
    const input =
      "Call config.api.endpoint() with API_KEY_VALUE from /tmp/the/file.txt. See https://example.com/the/api for version 3.7.9.";
    const result = compressMcpDescription(input).compressed;
    assert.match(result, /config\.api\.endpoint\(\)/);
    assert.match(result, /API_KEY_VALUE/);
    assert.match(result, /\/tmp\/the\/file\.txt/);
    assert.match(result, /https:\/\/example\.com\/the\/api/);
    assert.match(result, /3\.7\.9/);
  });

  it("walks nested list metadata and skips non-string fields", () => {
    const payload = {
      result: {
        tools: [
          { name: "get_weather", description: "The function returns the weather for a city." },
          { name: "nested", inputSchema: { description: { not: "string" } } },
        ],
      },
    };
    compressDescriptionsInPlace(payload.result);
    assert.doesNotMatch(payload.result.tools[0].description, /\bthe\b/i);
    assert.deepEqual(payload.result.tools[1].inputSchema.description, { not: "string" });
  });

  it("compresses only MCP list metadata containers, not tool-call response bodies", () => {
    resetMcpDescriptionCompressionStats();
    const payload = {
      result: {
        tools: [
          { name: "get_weather", description: "The function returns the weather for a city." },
        ],
        prompts: [{ name: "ask", description: "The prompt asks for a detailed summary." }],
        resources: [{ name: "docs", description: "The resource contains the project docs." }],
        resourceTemplates: [
          { name: "doc", description: "The template returns the matching project document." },
        ],
        content: [
          {
            type: "text",
            description: "The tool response body should remain unchanged.",
          },
        ],
      },
    };

    const output = compressMcpListMetadata(payload);

    assert.doesNotMatch(output.result.tools[0].description, /\bthe\b/i);
    assert.doesNotMatch(output.result.prompts[0].description, /\bthe\b/i);
    assert.doesNotMatch(output.result.resources[0].description, /\bthe\b/i);
    assert.doesNotMatch(output.result.resourceTemplates[0].description, /\bthe\b/i);
    assert.equal(
      output.result.content[0].description,
      "The tool response body should remain unchanged."
    );
  });

  it("compresses registry metadata for tools, prompts, and resources", () => {
    const metadata = compressMcpRegistryMetadata({
      description: "The function returns the current weather for a city.",
      inputSchema: {},
    });

    assert.doesNotMatch(metadata.description as string, /\bthe\b/i);
    assert.deepEqual(metadata.inputSchema, {});
  });

  it("honors settings and environment kill switches", () => {
    const originalEnv = process.env.OMNIROUTE_MCP_DESCRIPTION_COMPRESSION;
    const originalAliasEnv = process.env.OMNIROUTE_MCP_COMPRESS_DESCRIPTIONS;
    try {
      delete process.env.OMNIROUTE_MCP_DESCRIPTION_COMPRESSION;
      delete process.env.OMNIROUTE_MCP_COMPRESS_DESCRIPTIONS;
      const input = "The function returns the weather for a city.";
      assert.equal(maybeCompressMcpDescription(input, { enabled: false }), input);

      process.env.OMNIROUTE_MCP_COMPRESS_DESCRIPTIONS = "off";
      assert.equal(maybeCompressMcpDescription(input, { enabled: true }), input);
    } finally {
      if (originalEnv === undefined) {
        delete process.env.OMNIROUTE_MCP_DESCRIPTION_COMPRESSION;
      } else {
        process.env.OMNIROUTE_MCP_DESCRIPTION_COMPRESSION = originalEnv;
      }
      if (originalAliasEnv === undefined) {
        delete process.env.OMNIROUTE_MCP_COMPRESS_DESCRIPTIONS;
      } else {
        process.env.OMNIROUTE_MCP_COMPRESS_DESCRIPTIONS = originalAliasEnv;
      }
    }
  });

  it("records MCP description savings separately", () => {
    resetMcpDescriptionCompressionStats();
    const input =
      "The function returns the current weather for a city and the detailed forecast summary.";
    const output = maybeCompressMcpDescription(input, { enabled: true });
    const stats = getMcpDescriptionCompressionStats();

    assert.notEqual(output, input);
    assert.equal(stats.descriptionsCompressed, 1);
    assert.equal(stats.charsBefore, input.length);
    assert.equal(stats.charsAfter, output.length);
    assert.ok(stats.charsSaved > 0);
    assert.ok(stats.estimatedTokensSaved > 0);
  });
});
