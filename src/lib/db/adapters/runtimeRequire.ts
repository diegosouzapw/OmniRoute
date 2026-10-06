// src/lib/db/adapters/runtimeRequire.ts
/**
 * Load optional database drivers from the runtime rather than bundling them.
 *
 * The standalone server is emitted as CommonJS chunks and externalizes the
 * native database packages. Keep those requests as static `require()` calls so
 * webpack preserves the external boundary. Development and tests run as ESM,
 * where `require` is unavailable; the fallback anchors resolution to the real
 * process entrypoint so Turbopack cannot replace it with an in-bundle resolver.
 */
import * as nodeModule from "node:module";

const esmRequire = nodeModule.createRequire(process.argv[1] || process.cwd());

function esmRuntimeRequire(specifier: string): unknown {
  // Reflect keeps the optional request dynamic. A direct call is rewritten by
  // Turbopack and fails at runtime as "Cannot find module as expression is too dynamic".
  return Reflect.apply(esmRequire, undefined, [specifier]);
}

export function runtimeRequire(specifier: string): unknown {
  const isCjs = typeof module !== "undefined" && typeof module.require === "function";
  if (isCjs) {
    const req = module.require;
    switch (specifier) {
      case "better-sqlite3":
        return req("better-sqlite3");
      case "node:sqlite":
        return req("node:sqlite");
      case "bun:sqlite":
        return req("bun:sqlite");
      case "sql.js":
        return req("sql.js");
      case "sqlite-vec":
        return req("sqlite-vec");
    }
  }

  return esmRuntimeRequire(specifier);
}
