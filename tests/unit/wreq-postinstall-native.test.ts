import assert from "node:assert/strict";
import test from "node:test";

import {
  WREQ_JS_NATIVE_BINDINGS,
  WREQ_JS_VERSION,
  detectRuntimeLibc,
  resolveWreqJsNativeBinding,
} from "../../scripts/build/wreqJsNative.mjs";

test("wreq-js 3.2 resolver covers all nine published native bindings", () => {
  assert.equal(WREQ_JS_VERSION, "3.2.0");
  assert.deepEqual(WREQ_JS_NATIVE_BINDINGS.map((binding) => binding.packageName).sort(), [
    "@wreq-js/binding-android-arm64",
    "@wreq-js/binding-darwin-arm64",
    "@wreq-js/binding-darwin-x64",
    "@wreq-js/binding-linux-arm64-gnu",
    "@wreq-js/binding-linux-arm64-musl",
    "@wreq-js/binding-linux-x64-gnu",
    "@wreq-js/binding-linux-x64-musl",
    "@wreq-js/binding-win32-arm64-msvc",
    "@wreq-js/binding-win32-x64-msvc",
  ]);

  assert.equal(
    resolveWreqJsNativeBinding({ platform: "darwin", arch: "arm64" })?.fileName,
    "wreq-js.darwin-arm64.node"
  );
  assert.equal(
    resolveWreqJsNativeBinding({ platform: "linux", arch: "arm64", libc: "gnu" })?.packageName,
    "@wreq-js/binding-linux-arm64-gnu"
  );
  assert.equal(
    resolveWreqJsNativeBinding({ platform: "linux", arch: "x64", libc: "musl" })?.fileName,
    "wreq-js.linux-x64-musl.node"
  );
  assert.equal(
    resolveWreqJsNativeBinding({ platform: "win32", arch: "arm64" })?.packageName,
    "@wreq-js/binding-win32-arm64-msvc"
  );
  assert.equal(
    resolveWreqJsNativeBinding({ platform: "android", arch: "arm64" })?.fileName,
    "wreq-js.android-arm64.node"
  );
  assert.equal(resolveWreqJsNativeBinding({ platform: "freebsd", arch: "x64" }), null);
});

test("libc detection falls back to ldd when process.report fails", () => {
  assert.equal(
    detectRuntimeLibc({
      platform: "linux",
      getReport() {
        throw new Error("report unavailable");
      },
      readLdd() {
        return "musl libc (x86_64) Version 1.2.5";
      },
    }),
    "musl"
  );
  assert.equal(
    detectRuntimeLibc({
      platform: "linux",
      getReport() {
        throw new Error("report unavailable");
      },
      readLdd() {
        return "ldd (GNU libc) 2.39";
      },
    }),
    "gnu"
  );
});

test("libc detection fails closed when neither report nor ldd is conclusive", () => {
  assert.throws(
    () =>
      detectRuntimeLibc({
        platform: "linux",
        getReport() {
          throw new Error("report unavailable");
        },
        readLdd() {
          throw new Error("ldd unavailable");
        },
      }),
    /unable to detect linux libc/i
  );
});
