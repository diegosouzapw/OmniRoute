import { describe, it } from "node:test";
import assert from "node:assert/strict";
import type { PluginContext } from "@opencode-ai/plugin/v2/promise";
import type { Logger } from "../src/shared/index.js";
import { resolveApiKey, warnIfMissing } from "../src/credentials.js";

function collectingLogger(): { log: Logger; warnings: string[] } {
  const warnings: string[] = [];
  const log = {
    error: () => {},
    warn: (m: string) => warnings.push(m),
    info: () => {},
    debug: () => {},
  } as unknown as Logger;
  return { log, warnings };
}

/** A host exposing `integration.connection`, optionally with a stored value. */
function ctxWith(stored: unknown, opts: { withConnectionApi?: boolean } = {}): PluginContext {
  const integration =
    opts.withConnectionApi === false
      ? {}
      : {
          connection: {
            active: async () =>
              stored === undefined ? undefined : { type: "credential", id: "c", label: "l" },
            resolve: async () => stored,
          },
        };
  return { integration } as unknown as PluginContext;
}

const ENV = "OMNIROUTE_API_KEY";

async function withEnv<T>(value: string | undefined, fn: () => Promise<T>): Promise<T> {
  const previous = process.env[ENV];
  if (value === undefined) delete process.env[ENV];
  else process.env[ENV] = value;
  try {
    return await fn();
  } finally {
    if (previous === undefined) delete process.env[ENV];
    else process.env[ENV] = previous;
  }
}

describe("gateway credential resolution", () => {
  it("prefers the credential the host stored over one written in config", async () => {
    const { log } = collectingLogger();
    const got = await withEnv("from-env", () =>
      resolveApiKey(ctxWith({ type: "key", key: "from-host" }), "omniroute", "from-option", log)
    );
    assert.deepEqual(got, { key: "from-host", origin: "connection" });
  });

  it("falls back to the configured option, then to the environment", async () => {
    const { log } = collectingLogger();
    const option = await withEnv("from-env", () =>
      resolveApiKey(ctxWith(undefined), "omniroute", "from-option", log)
    );
    assert.deepEqual(option, { key: "from-option", origin: "option" });
    const env = await withEnv("from-env", () =>
      resolveApiKey(ctxWith(undefined), "omniroute", undefined, log)
    );
    assert.deepEqual(env, { key: "from-env", origin: "env" });
  });

  it("reports no key rather than pretending an empty one works", async () => {
    const { log, warnings } = collectingLogger();
    const got = await withEnv(undefined, () =>
      resolveApiKey(ctxWith(undefined), "omniroute", undefined, log)
    );
    assert.deepEqual(got, { key: "", origin: "missing" });
    warnIfMissing(got, "omniroute", log);
    assert.equal(warnings.length, 1);
    // The message must name every way out, or it sends the user hunting.
    assert.match(warnings[0] ?? "", /Connect the integration/);
    assert.match(warnings[0] ?? "", /"apiKey"/);
    assert.match(warnings[0] ?? "", new RegExp(ENV));
  });

  it("declines an oauth credential instead of reading a token as a key", async () => {
    const { log, warnings } = collectingLogger();
    const got = await withEnv(undefined, () =>
      resolveApiKey(
        ctxWith({ type: "oauth", methodID: "m", refresh: "r", access: "a", expires: 0 }),
        "omniroute",
        undefined,
        log
      )
    );
    assert.equal(got.origin, "missing");
    assert.equal(warnings.length, 1);
    assert.match(warnings[0] ?? "", /oauth/);
  });

  it("stays loadable on a host that has no connection api", async () => {
    const { log, warnings } = collectingLogger();
    const got = await withEnv(undefined, () =>
      resolveApiKey(
        ctxWith(undefined, { withConnectionApi: false }),
        "omniroute",
        "from-option",
        log
      )
    );
    assert.deepEqual(got, { key: "from-option", origin: "option" });
    assert.deepEqual(warnings, []);
  });

  it("treats a lookup that throws as no credential, not as a failure to load", async () => {
    const { log, warnings } = collectingLogger();
    const ctx = {
      integration: {
        connection: {
          active: async () => {
            throw new Error("store unavailable");
          },
          resolve: async () => undefined,
        },
      },
    } as unknown as PluginContext;
    const got = await withEnv(undefined, () => resolveApiKey(ctx, "omniroute", "from-option", log));
    assert.deepEqual(got, { key: "from-option", origin: "option" });
    assert.equal(warnings.length, 1);
    assert.match(warnings[0] ?? "", /store unavailable/);
  });
});
