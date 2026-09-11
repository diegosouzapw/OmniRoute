import { readFileSync } from "node:fs";

/** Exact native binding set published by wreq-js 3.2.0. */
export const WREQ_JS_VERSION = "3.2.0";

export const WREQ_JS_NATIVE_BINDINGS = Object.freeze([
  {
    target: "android-arm64",
    packageName: "@wreq-js/binding-android-arm64",
    fileName: "wreq-js.android-arm64.node",
    platform: "android",
    arch: "arm64",
  },
  {
    target: "darwin-arm64",
    packageName: "@wreq-js/binding-darwin-arm64",
    fileName: "wreq-js.darwin-arm64.node",
    platform: "darwin",
    arch: "arm64",
  },
  {
    target: "darwin-x64",
    packageName: "@wreq-js/binding-darwin-x64",
    fileName: "wreq-js.darwin-x64.node",
    platform: "darwin",
    arch: "x64",
  },
  {
    target: "linux-arm64-gnu",
    packageName: "@wreq-js/binding-linux-arm64-gnu",
    fileName: "wreq-js.linux-arm64-gnu.node",
    platform: "linux",
    arch: "arm64",
    libc: "gnu",
  },
  {
    target: "linux-arm64-musl",
    packageName: "@wreq-js/binding-linux-arm64-musl",
    fileName: "wreq-js.linux-arm64-musl.node",
    platform: "linux",
    arch: "arm64",
    libc: "musl",
  },
  {
    target: "linux-x64-gnu",
    packageName: "@wreq-js/binding-linux-x64-gnu",
    fileName: "wreq-js.linux-x64-gnu.node",
    platform: "linux",
    arch: "x64",
    libc: "gnu",
  },
  {
    target: "linux-x64-musl",
    packageName: "@wreq-js/binding-linux-x64-musl",
    fileName: "wreq-js.linux-x64-musl.node",
    platform: "linux",
    arch: "x64",
    libc: "musl",
  },
  {
    target: "win32-arm64-msvc",
    packageName: "@wreq-js/binding-win32-arm64-msvc",
    fileName: "wreq-js.win32-arm64-msvc.node",
    platform: "win32",
    arch: "arm64",
  },
  {
    target: "win32-x64-msvc",
    packageName: "@wreq-js/binding-win32-x64-msvc",
    fileName: "wreq-js.win32-x64-msvc.node",
    platform: "win32",
    arch: "x64",
  },
]);

function readSystemLdd() {
  const failures = [];
  for (const lddPath of ["/usr/bin/ldd", "/bin/ldd"]) {
    try {
      return readFileSync(lddPath, "utf8");
    } catch (error) {
      failures.push(error);
    }
  }
  throw failures[0] ?? new Error("ldd is unavailable");
}

/** Detect the C library used by the current Linux runtime. */
export function detectRuntimeLibc(options = {}) {
  const platform = options.platform ?? process.platform;
  if (platform !== "linux") return undefined;
  const getReport = options.getReport ?? (() => process.report?.getReport());
  const readLdd = options.readLdd ?? readSystemLdd;
  let reportError;
  try {
    const report = getReport();
    if (report?.header?.glibcVersionRuntime) return "gnu";
    if (report?.header) return "musl";
  } catch (error) {
    reportError = error;
  }

  let lddError;
  try {
    const ldd = String(readLdd());
    if (/\bmusl\b/i.test(ldd)) return "musl";
    if (/\b(?:glibc|gnu libc|gnu c library)\b/i.test(ldd)) return "gnu";
    lddError = new Error("ldd output did not identify glibc or musl");
  } catch (error) {
    lddError = error;
  }

  const detail = [reportError, lddError]
    .filter((error) => error instanceof Error)
    .map((error) => error.message)
    .join("; ");
  throw new Error(`Unable to detect Linux libc${detail ? `: ${detail}` : ""}`);
}

/** Resolve the exact package and addon filename wreq-js 3.2.0 loads. */
export function resolveWreqJsNativeBinding({ platform, arch, libc }) {
  const runtimeLibc = platform === "linux" ? (libc ?? detectRuntimeLibc()) : undefined;
  return (
    WREQ_JS_NATIVE_BINDINGS.find(
      (binding) =>
        binding.platform === platform &&
        binding.arch === arch &&
        (binding.libc === undefined || binding.libc === runtimeLibc)
    ) ?? null
  );
}
