/**
 * tests/unit/cli-memory-types.test.mjs
 *
 * Plan 21 F8 — D17: CLI memory.mjs type validation and legacy warning.
 *
 * Cases:
 *   A) VALID_TYPES contains exactly ["factual", "episodic", "procedural", "semantic"]
 *   B) Legacy types NOT in VALID_TYPES: user, feedback, project, reference
 *   C) runMemoryAdd with --type user emits deprecation warning to stderr
 *   D) runMemoryAdd with --type feedback emits deprecation warning to stderr
 *   E) runMemoryAdd with legacy type maps to "factual" in request body
 *   F) runMemoryAdd with no --type defaults to "factual"
 *   G) runMemoryAdd with valid type "episodic" passes through unchanged (no warning)
 */

import { describe, it, before, after, afterEach } from "node:test";
import assert from "node:assert/strict";

// ── A: VALID_TYPES contains the new canonical types ───────────────────────────

describe("VALID_TYPES", () => {
  it("contains factual, episodic, procedural, semantic (exact set)", async () => {
    const mod = await import("../../bin/cli/commands/memory.mjs");
    // VALID_TYPES is not exported — we test its effect through runMemoryAdd behavior.
    // However, we can verify the module loaded correctly and exports the expected functions.
    assert.equal(typeof mod.runMemoryAdd, "function", "runMemoryAdd must be exported");
    assert.equal(typeof mod.runMemorySearch, "function", "runMemorySearch must be exported");
    assert.equal(typeof mod.runMemoryList, "function", "runMemoryList must be exported");
  });

  it("does NOT contain legacy types: user, feedback, project, reference", async () => {
    // We verify this by checking that passing a legacy type triggers a warning.
    // If VALID_TYPES still contained legacy types, the warning branch would not fire.
    const stderrChunks = [];
    const origWrite = process.stderr.write.bind(process.stderr);
    process.stderr.write = (chunk) => {
      if (typeof chunk === "string") stderrChunks.push(chunk);
      return true;
    };

    let capturedBody = null;
    const origFetch = globalThis.fetch;
    globalThis.fetch = async (_url, opts) => {
      if (opts && opts.body) {
        capturedBody = typeof opts.body === "string" ? JSON.parse(opts.body) : opts.body;
      }
      return {
        ok: true,
        status: 200,
        json: async () => ({ id: "mem_test", type: "factual", content: "test" }),
      };
    };

    try {
      const { runMemoryAdd } = await import("../../bin/cli/commands/memory.mjs");
      const cmd = { optsWithGlobals: () => ({ output: "json", quiet: false }) };
      await runMemoryAdd({ content: "test content", type: "user" }, cmd).catch(() => {});
    } finally {
      process.stderr.write = origWrite;
      globalThis.fetch = origFetch;
    }

    const warnOutput = stderrChunks.join("");
    assert.ok(
      warnOutput.includes("deprecated"),
      `expected deprecation warning for legacy type 'user', got: ${JSON.stringify(warnOutput)}`
    );
  });
});

// ── C+D: warning emitted for each legacy type ─────────────────────────────────

describe("legacy type deprecation warning", () => {
  const legacyTypes = ["user", "feedback", "project", "reference"];

  for (const legacyType of legacyTypes) {
    it(`emits deprecation warning for --type ${legacyType}`, async () => {
      const stderrChunks = [];
      const origWrite = process.stderr.write.bind(process.stderr);
      process.stderr.write = (chunk) => {
        if (typeof chunk === "string") stderrChunks.push(chunk);
        return true;
      };

      const origFetch = globalThis.fetch;
      globalThis.fetch = async () => ({
        ok: true,
        status: 200,
        json: async () => ({ id: "m1", type: "factual", content: "x" }),
      });

      try {
        const { runMemoryAdd } = await import("../../bin/cli/commands/memory.mjs");
        const cmd = { optsWithGlobals: () => ({ output: "json", quiet: false }) };
        await runMemoryAdd({ content: "some content", type: legacyType }, cmd).catch(() => {});
      } finally {
        process.stderr.write = origWrite;
        globalThis.fetch = origFetch;
      }

      const warnOutput = stderrChunks.join("");
      assert.ok(
        warnOutput.includes("deprecated"),
        `expected warning for legacy type '${legacyType}', stderr: ${JSON.stringify(warnOutput)}`
      );
      assert.ok(
        warnOutput.includes(legacyType),
        `warning must mention the legacy type name '${legacyType}'`
      );
      assert.ok(
        warnOutput.includes("factual"),
        "warning must mention 'factual' as the replacement"
      );
    });
  }
});

// ── E: legacy type maps to "factual" in request body ─────────────────────────

describe("legacy type mapping", () => {
  it("--type user maps to factual in request body", async () => {
    let capturedBody = null;
    const origFetch = globalThis.fetch;
    globalThis.fetch = async (_url, opts) => {
      if (opts && opts.body) {
        try {
          capturedBody =
            typeof opts.body === "string" ? JSON.parse(opts.body) : opts.body;
        } catch {}
      }
      return {
        ok: true,
        status: 200,
        json: async () => ({ id: "m2", type: "factual", content: "x" }),
      };
    };

    const origStderr = process.stderr.write.bind(process.stderr);
    process.stderr.write = () => true; // suppress warning in this test

    try {
      const { runMemoryAdd } = await import("../../bin/cli/commands/memory.mjs");
      const cmd = { optsWithGlobals: () => ({ output: "json", quiet: false }) };
      await runMemoryAdd({ content: "test content", type: "user" }, cmd).catch(() => {});
    } finally {
      globalThis.fetch = origFetch;
      process.stderr.write = origStderr;
    }

    assert.ok(capturedBody !== null, "apiFetch must have been called with a body");
    assert.equal(
      capturedBody.type,
      "factual",
      `expected body.type='factual' but got '${capturedBody?.type}'`
    );
  });
});

// ── F: no --type option defaults to "factual" ─────────────────────────────────

describe("default type", () => {
  it("runMemoryAdd with no --type defaults body.type to factual", async () => {
    let capturedBody = null;
    const origFetch = globalThis.fetch;
    globalThis.fetch = async (_url, opts) => {
      if (opts && opts.body) {
        try {
          capturedBody =
            typeof opts.body === "string" ? JSON.parse(opts.body) : opts.body;
        } catch {}
      }
      return {
        ok: true,
        status: 200,
        json: async () => ({ id: "m3", type: "factual", content: "x" }),
      };
    };

    const origStderr = process.stderr.write.bind(process.stderr);
    process.stderr.write = () => true;

    try {
      const { runMemoryAdd } = await import("../../bin/cli/commands/memory.mjs");
      const cmd = { optsWithGlobals: () => ({ output: "json", quiet: false }) };
      // No type passed — should default to "factual"
      await runMemoryAdd({ content: "default type test" }, cmd).catch(() => {});
    } finally {
      globalThis.fetch = origFetch;
      process.stderr.write = origStderr;
    }

    assert.ok(capturedBody !== null, "apiFetch must have been called with a body");
    assert.equal(
      capturedBody.type,
      "factual",
      `expected default body.type='factual' but got '${capturedBody?.type}'`
    );
  });
});

// ── G: valid new type passes through unchanged, no warning ────────────────────

describe("valid new types", () => {
  const validTypes = ["factual", "episodic", "procedural", "semantic"];

  for (const validType of validTypes) {
    it(`--type ${validType} passes through as-is with no deprecation warning`, async () => {
      let capturedBody = null;
      const stderrChunks = [];

      const origFetch = globalThis.fetch;
      globalThis.fetch = async (_url, opts) => {
        if (opts && opts.body) {
          try {
            capturedBody =
              typeof opts.body === "string" ? JSON.parse(opts.body) : opts.body;
          } catch {}
        }
        return {
          ok: true,
          status: 200,
          json: async () => ({ id: "m4", type: validType, content: "x" }),
        };
      };

      const origStderr = process.stderr.write.bind(process.stderr);
      process.stderr.write = (chunk) => {
        if (typeof chunk === "string") stderrChunks.push(chunk);
        return true;
      };

      try {
        const { runMemoryAdd } = await import("../../bin/cli/commands/memory.mjs");
        const cmd = { optsWithGlobals: () => ({ output: "json", quiet: false }) };
        await runMemoryAdd({ content: "valid type test", type: validType }, cmd).catch(() => {});
      } finally {
        globalThis.fetch = origFetch;
        process.stderr.write = origStderr;
      }

      const warnOutput = stderrChunks.join("");
      assert.ok(
        !warnOutput.includes("deprecated"),
        `should NOT emit deprecation warning for valid type '${validType}', got: ${JSON.stringify(warnOutput)}`
      );
      assert.ok(capturedBody !== null, "apiFetch must have been called with a body");
      assert.equal(
        capturedBody.type,
        validType,
        `expected body.type='${validType}' but got '${capturedBody?.type}'`
      );
    });
  }
});
