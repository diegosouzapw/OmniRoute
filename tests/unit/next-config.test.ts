import test from "node:test";
import assert from "node:assert/strict";
import path from "node:path";
import { pathToFileURL } from "node:url";

const modulePath = path.join(process.cwd(), "next.config.mjs");
const originalNextDistDir = process.env.NEXT_DIST_DIR;

async function loadNextConfig(label) {
  return import(`${pathToFileURL(modulePath).href}?case=${label}-${Date.now()}`);
}

function runExternalResolver(resolver, request) {
  return new Promise((resolve, reject) => {
    resolver({ request }, (error, result) => {
      if (error) {
        reject(error);
        return;
      }
      resolve(result);
    });
  });
}

test.afterEach(() => {
  if (originalNextDistDir === undefined) {
    delete process.env.NEXT_DIST_DIR;
  } else {
    process.env.NEXT_DIST_DIR = originalNextDistDir;
  }
});

test("next config exposes standalone build settings and canonical rewrites", async () => {
  process.env.NEXT_DIST_DIR = ".next-task607";
  const { default: nextConfig } = await loadNextConfig("distdir");

  const rewrites = await nextConfig.rewrites();

  assert.equal(nextConfig.distDir, ".next-task607");
  assert.equal(nextConfig.output, "standalone");
  assert.equal(nextConfig.images.unoptimized, true);
  assert.deepEqual(nextConfig.transpilePackages, ["@omniroute/open-sse"]);
  assert.deepEqual(rewrites.slice(0, 4), [
    {
      source: "/chat/completions",
      destination: "/api/v1/chat/completions",
    },
    {
      source: "/responses",
      destination: "/api/v1/responses",
    },
    {
      source: "/responses/:path*",
      destination: "/api/v1/responses/:path*",
    },
    {
      source: "/models",
      destination: "/api/v1/models",
    },
  ]);
});

test("next config webpack server branch ignores thread-stream tests and normalizes externals", async () => {
  const { default: nextConfig } = await loadNextConfig("webpack-server");

  class IgnorePlugin {
    constructor(options) {
      this.options = options;
    }
  }

  const config = {
    context: process.cwd(),
    plugins: [],
    resolve: { fallback: {} },
    externals: [],
  };

  nextConfig.webpack(config, { isServer: true, webpack: { IgnorePlugin } });

  assert.equal(config.plugins.length, 1);
  assert.match(String(config.plugins[0].options.resourceRegExp), /test/);
  assert.match(String(config.plugins[0].options.contextRegExp), /thread-stream/);

  const resolver = config.externals.at(-1);
  assert.equal(await runExternalResolver(resolver, "fs"), "commonjs fs");
  assert.equal(
    await runExternalResolver(resolver, "better-sqlite3-90e2652d1716b047"),
    "commonjs better-sqlite3"
  );
  assert.equal(await runExternalResolver(resolver, "left-pad"), undefined);
});

test("next config webpack client branch disables Node builtins in browser bundles", async () => {
  const { default: nextConfig } = await loadNextConfig("webpack-client");
  const config = {
    context: process.cwd(),
    plugins: [],
    externals: [],
    resolve: { fallback: { http: true } },
  };

  nextConfig.webpack(config, { isServer: false, webpack: { IgnorePlugin: class {} } });

  assert.deepEqual(config.resolve.fallback, {
    http: true,
    fs: false,
    path: false,
    child_process: false,
    net: false,
    tls: false,
    crypto: false,
    process: false,
  });
});
