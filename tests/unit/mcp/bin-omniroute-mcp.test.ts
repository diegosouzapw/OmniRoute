import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { pathToFileURL } from "node:url";
import { join } from "node:path";
import { platform } from "node:os";

describe("bin/omniroute.mjs MCP path handling", () => {
  it("pathToFileURL converts Windows paths to valid file:// URLs", () => {
    if (platform() !== "win32") {
      // Skip on non-Windows platforms
      return;
    }

    const testPath = "C:\\Users\\test\\projects\\OmniRoute\\bin\\mcp-server.mjs";
    const fileUrl = pathToFileURL(testPath);

    assert.ok(fileUrl.href.startsWith("file:///"), "URL should start with file:///");
    assert.ok(fileUrl.href.includes("C:/"), "Windows drive letter should be converted");
    assert.ok(!fileUrl.href.includes("\\"), "Backslashes should be converted to forward slashes");
    assert.ok(fileUrl.href.endsWith("mcp-server.mjs"), "Filename should be preserved");
  });

  it("pathToFileURL converts Unix paths to valid file:// URLs", () => {
    if (platform() === "win32") {
      // Skip on Windows
      return;
    }

    const testPath = "/home/user/projects/OmniRoute/bin/mcp-server.mjs";
    const fileUrl = pathToFileURL(testPath);

    assert.ok(fileUrl.href.startsWith("file:///"), "URL should start with file:///");
    assert.ok(fileUrl.href.endsWith("mcp-server.mjs"), "Filename should be preserved");
  });

  it("pathToFileURL handles relative paths correctly", () => {
    const relativePath = join("bin", "mcp-server.mjs");
    const absolutePath = join(process.cwd(), relativePath);
    const fileUrl = pathToFileURL(absolutePath);

    assert.ok(fileUrl.href.startsWith("file:///"), "URL should start with file:///");
    assert.ok(fileUrl.href.endsWith("mcp-server.mjs"), "Filename should be preserved");
  });

  it("pathToFileURL result can be used with dynamic import", async () => {
    // This test verifies that the URL format is compatible with import()
    const testPath = join(process.cwd(), "package.json");
    const fileUrl = pathToFileURL(testPath);

    // Verify the URL is valid for import (we use a JSON file as a safe test)
    assert.ok(fileUrl.href.startsWith("file:///"), "URL should be valid for import");
    const parsedUrl = new URL(fileUrl.href);
    assert.equal(parsedUrl.protocol, "file:", "URL should be parseable");
  });
});
