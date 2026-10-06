import instrument from "istanbul-lib-instrument";
import { createHash } from "node:crypto";
import { createRequire } from "node:module";
import { extname, posix } from "node:path";

const require = createRequire(import.meta.url);
const { version } = require("istanbul-lib-instrument/package.json");

// Common-source prototype: instrumentation must precede either runner's transform.
export function instrumentCoverageSource(source, filename) {
  if (
    typeof filename !== "string" ||
    !filename ||
    posix.isAbsolute(filename) ||
    filename.startsWith("../") ||
    posix.normalize(filename) !== filename ||
    /[\\\u0000?:]/.test(filename) ||
    /\.d\.[cm]?ts$/.test(filename) ||
    !/\.(?:[cm]?[jt]s|[jt]sx)$/.test(filename)
  ) {
    throw new Error("coverage requires a canonical runtime source path relative to the checkout");
  }
  const extension = extname(filename);
  const parserPlugins = [];
  if ([".ts", ".tsx", ".mts", ".cts"].includes(extension)) parserPlugins.push("typescript");
  if ([".jsx", ".tsx"].includes(extension)) parserPlugins.push("jsx");
  const instance = instrument.createInstrumenter({
    esModules: true,
    parserPlugins,
    produceSourceMap: true,
    coverageGlobalScope: "globalThis",
    coverageGlobalScopeFunc: false,
  });
  const code = instance.instrumentSync(source, filename);
  return {
    code,
    map: instance.lastSourceMap(),
    coverage: instance.lastFileCoverage(),
    identity: {
      schemaVersion: 1,
      instrumenter: `istanbul-lib-instrument@${version}`,
      sourceHash: createHash("sha256").update(source).digest("hex"),
    },
  };
}
