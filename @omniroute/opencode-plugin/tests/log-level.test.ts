import assert from "node:assert/strict";
import { mkdtemp, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import test from "node:test";
import type { Config } from "@opencode-ai/plugin";

import {
  createOmniRouteConfigHook,
  createOmniRouteProviderHook,
  defaultOmniRouteAutoCombosFetcher,
  OmniRoutePlugin,
  type OmniRouteRawModelEntry,
} from "../src/index.js";
import { createLogger, getLogLevel, logger, setLogLevel, type LogLevel } from "../src/logger.js";

type ConsoleMethod = "error" | "info" | "log" | "warn";
type ConsoleEntries = Record<ConsoleMethod, unknown[][]>;

const fakeInput = {} as Parameters<typeof OmniRoutePlugin>[0];
const consoleMethods: ConsoleMethod[] = ["error", "info", "log", "warn"];

async function captureConsole(run: () => Promise<void>): Promise<ConsoleEntries> {
  const entries: ConsoleEntries = { error: [], info: [], log: [], warn: [] };
  const originals = Object.fromEntries(
    consoleMethods.map((method) => [method, console[method]])
  ) as Record<ConsoleMethod, typeof console.warn>;

  for (const method of consoleMethods) {
    console[method] = (...args: unknown[]) => {
      entries[method].push(args);
    };
  }

  try {
    await run();
  } finally {
    for (const method of consoleMethods) console[method] = originals[method];
  }

  return entries;
}

function rendered(entries: ConsoleEntries): string[] {
  return consoleMethods.flatMap((method) =>
    entries[method].map((args) => args.map((arg) => String(arg)).join(" "))
  );
}

async function capturePluginLifecycle(args: {
  level: LogLevel;
  autoSyncIntervalMs: number;
  invokeConfig?: boolean;
}): Promise<string[]> {
  const previousDataDir = process.env.OPENCODE_DATA_DIR;
  const previousLevel = getLogLevel();
  const dataDir = await mkdtemp(join(tmpdir(), "omniroute-log-level-"));
  process.env.OPENCODE_DATA_DIR = dataDir;

  try {
    const entries = await captureConsole(async () => {
      const hooks = await OmniRoutePlugin(fakeInput, {
        autoSyncIntervalMs: args.autoSyncIntervalMs,
        features: { logLevel: args.level },
      });
      if (args.invokeConfig) {
        assert.equal(typeof hooks.config, "function");
        await hooks.config!({} as Config);
      }
    });
    return rendered(entries);
  } finally {
    setLogLevel(previousLevel);
    if (previousDataDir === undefined) delete process.env.OPENCODE_DATA_DIR;
    else process.env.OPENCODE_DATA_DIR = previousDataDir;
    await rm(dataDir, { recursive: true, force: true });
  }
}

test("logLevel error suppresses the initialization banner", async () => {
  const lines = await capturePluginLifecycle({ level: "error", autoSyncIntervalMs: 0 });

  assert.equal(lines.filter((line) => line.includes("initialized")).length, 0);
});

test("logLevel error suppresses the auto-sync enabled lifecycle message", async () => {
  const lines = await capturePluginLifecycle({ level: "error", autoSyncIntervalMs: 60_000 });

  assert.equal(lines.filter((line) => line.includes("auto-sync enabled")).length, 0);
});

test("logLevel error suppresses factory config-shim diagnostics", async () => {
  const lines = await capturePluginLifecycle({
    level: "error",
    autoSyncIntervalMs: 0,
    invokeConfig: true,
  });

  assert.equal(lines.filter((line) => line.includes("config shim skipped")).length, 0);
});

test("logLevel debug preserves startup and config-shim diagnostics", async () => {
  const lines = await capturePluginLifecycle({
    level: "debug",
    autoSyncIntervalMs: 60_000,
    invokeConfig: true,
  });

  assert.ok(
    lines.some((line) => line.includes("initialized")),
    "initialization banner emitted"
  );
  assert.ok(
    lines.some((line) => line.includes("auto-sync enabled")),
    "auto-sync message emitted"
  );
  assert.ok(
    lines.some((line) => line.includes("config shim skipped")),
    "config breadcrumb emitted"
  );
});

test("debug instance retains config diagnostics after an error instance is created", async () => {
  const lines = rendered(
    await captureConsole(async () => {
      const debugHooks = await OmniRoutePlugin(fakeInput, {
        autoSyncIntervalMs: 0,
        features: { logLevel: "debug" },
      });
      await OmniRoutePlugin(fakeInput, {
        autoSyncIntervalMs: 0,
        features: { logLevel: "error" },
      });
      await debugHooks.config!({} as Config);
    })
  );

  assert.equal(lines.filter((line) => line.includes("config shim skipped")).length, 1);
});

test("error instance keeps config diagnostics suppressed after a debug instance is created", async () => {
  const lines = rendered(
    await captureConsole(async () => {
      const errorHooks = await OmniRoutePlugin(fakeInput, {
        autoSyncIntervalMs: 0,
        features: { logLevel: "error" },
      });
      await OmniRoutePlugin(fakeInput, {
        autoSyncIntervalMs: 0,
        features: { logLevel: "debug" },
      });
      await errorHooks.config!({} as Config);
    })
  );

  assert.equal(lines.filter((line) => line.includes("config shim skipped")).length, 0);
});

test("error-level config fetch failures remain visible as concise injected-logger messages", async () => {
  const entries: unknown[][] = [];
  const hook = createOmniRouteConfigHook(
    {
      baseURL: "https://omniroute.example/v1",
      features: {
        autoCombos: false,
        diskCache: false,
        enrichment: false,
        logLevel: "error",
      },
    },
    {
      readAuthJson: async () => ({
        "opencode-omniroute": { type: "api", key: "test-key" },
      }),
      fetcher: async () => {
        throw new Error("models unavailable");
      },
      combosFetcher: async () => {
        throw new Error("combos unavailable");
      },
      logger: {
        warn: (...args: unknown[]) => {
          entries.push(args);
        },
      },
    }
  );

  await hook({} as Config);

  assert.equal(entries.length, 2, "both genuine fetch failures remain visible");
  assert.deepEqual(
    entries.map((args) => args.length),
    [1, 1],
    "each failure is emitted as one concise argument"
  );
  const lines = entries.map(([message]) => String(message));
  assert.ok(
    lines.some((line) => line.includes("/v1/models") && line.includes("models unavailable"))
  );
  assert.ok(
    lines.some((line) => line.includes("/api/combos") && line.includes("combos unavailable"))
  );
  assert.equal(
    entries.flat().some((arg) => arg instanceof Error),
    false,
    "no raw Error object emitted"
  );
});

test("logger error output remains visible at error level", async () => {
  const previousLevel = getLogLevel();
  try {
    setLogLevel("error");
    const lines = rendered(
      await captureConsole(async () => {
        logger.error("genuine startup failure");
      })
    );
    assert.ok(lines.some((line) => line.includes("genuine startup failure")));
  } finally {
    setLogLevel(previousLevel);
  }
});

const MINIMAL_MODELS: OmniRouteRawModelEntry[] = [
  {
    id: "claude-primary",
    object: "model",
    owned_by: "combo",
    capabilities: { tool_calling: true, reasoning: true, vision: true, thinking: true },
    context_length: 200000,
    max_output_tokens: 64000,
    input_modalities: ["text", "image"],
    output_modalities: ["text"],
  },
];

function providerHookWithLevel(level: LogLevel, baseURL?: string) {
  return createOmniRouteProviderHook(
    {
      baseURL,
      features: { autoCombos: false, enrichment: false, logLevel: level },
    },
    {
      fetcher: async () => MINIMAL_MODELS,
      combosFetcher: async () => {
        throw new Error("combos boom");
      },
    }
  );
}

test("logLevel error suppresses provider.models() fallback warnings and the catalog-refresh breadcrumb", async () => {
  const hook = providerHookWithLevel("error", "https://or.example.com/v1");
  const lines = rendered(
    await captureConsole(async () => {
      await hook.models!({} as never, { auth: { type: "api", key: "sk-x" } as never });
    })
  );

  assert.equal(lines.filter((line) => line.includes("combos fetch failed")).length, 0);
  assert.equal(lines.filter((line) => line.includes("catalog refreshed")).length, 0);
});

test("logLevel debug preserves the provider.models() catalog-refresh breadcrumb", async () => {
  const hook = providerHookWithLevel("debug", "https://or.example.com/v1");
  const lines = rendered(
    await captureConsole(async () => {
      await hook.models!({} as never, { auth: { type: "api", key: "sk-x" } as never });
    })
  );

  assert.ok(
    lines.some((line) => line.includes("catalog refreshed")),
    "catalog-refresh breadcrumb emitted at debug level"
  );
});

test("no baseURL resolvable stays visible at error level", async () => {
  const hook = providerHookWithLevel("error");
  const lines = rendered(
    await captureConsole(async () => {
      await hook.models!({} as never, { auth: { type: "api", key: "sk-x" } as never });
    })
  );

  assert.ok(
    lines.some((line) => line.includes("no baseURL resolvable")),
    "genuine misconfiguration error remains visible at error level"
  );
});

test("default auto-combos fetcher 404 warning respects the threaded logger level", async () => {
  const originalFetch = globalThis.fetch;
  (globalThis as { fetch: unknown }).fetch = (async () => ({
    status: 404,
    ok: false,
  })) as typeof fetch;
  try {
    const silent = await captureConsole(async () => {
      await defaultOmniRouteAutoCombosFetcher(
        "https://or.example.com/v1",
        "sk-x",
        5_000,
        createLogger("error")
      );
    });
    assert.equal(rendered(silent).length, 0, "404 warning suppressed at error level");

    const loud = await captureConsole(async () => {
      await defaultOmniRouteAutoCombosFetcher(
        "https://or.example.com/v1",
        "sk-x",
        5_000,
        createLogger("warn")
      );
    });
    assert.ok(
      rendered(loud).some((line) => line.includes("/api/combos/auto not available")),
      "404 warning emitted at warn level"
    );
  } finally {
    globalThis.fetch = originalFetch;
  }
});
