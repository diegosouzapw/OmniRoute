import test from "node:test";
import assert from "node:assert/strict";
import os from "node:os";
import {
  __setExec,
  apply,
  revert,
  type ExecFileFn,
} from "../../src/mitm/inspector/systemProxyConfig.ts";

interface Call {
  file: string;
  args: string[];
}

function makeRecorder(stdoutByCmd: Record<string, string> = {}): {
  calls: Call[];
  exec: ExecFileFn;
} {
  const calls: Call[] = [];
  const exec: ExecFileFn = async (file, args) => {
    calls.push({ file, args });
    const key = `${file} ${args.join(" ")}`;
    for (const [pattern, out] of Object.entries(stdoutByCmd)) {
      if (key.includes(pattern)) return { stdout: out, stderr: "" };
    }
    return { stdout: "", stderr: "" };
  };
  return { calls, exec };
}

test("macOS apply uses execFile array-form and captures previous state", async (t) => {
  const orig = os.platform;
  (os as { platform: () => NodeJS.Platform }).platform = () => "darwin" as NodeJS.Platform;
  t.after(() => {
    (os as { platform: () => NodeJS.Platform }).platform = orig;
  });

  const { calls, exec } = makeRecorder({
    "-getwebproxy Wi-Fi": "Enabled: Yes\nServer: 10.0.0.1\nPort: 8888\n",
    "-getsecurewebproxy Wi-Fi": "Enabled: No\nServer:\nPort: 0\n",
  });
  const restore = __setExec(exec);
  t.after(restore);

  const result = await apply(8080);
  assert.equal(result.platform, "macos");
  // All calls must use array args, never a single shell string
  for (const c of calls) {
    assert.ok(Array.isArray(c.args));
    // file is bare command name, no spaces / pipes / redirects
    assert.ok(!c.file.includes(" "));
    assert.ok(!c.file.includes(";"));
    assert.ok(!c.file.includes("|"));
  }
  const setCall = calls.find((c) => c.args.includes("-setwebproxy"));
  assert.ok(setCall);
  assert.deepEqual(setCall.args, ["-setwebproxy", "Wi-Fi", "127.0.0.1", "8080"]);
  const prev = result.previousState as { platform: string; http: { enabled: boolean } };
  assert.equal(prev.platform, "macos");
  assert.equal(prev.http.enabled, true);
});

test("macOS revert restores prior server when http was enabled", async (t) => {
  const orig = os.platform;
  (os as { platform: () => NodeJS.Platform }).platform = () => "darwin" as NodeJS.Platform;
  t.after(() => {
    (os as { platform: () => NodeJS.Platform }).platform = orig;
  });

  const { calls, exec } = makeRecorder();
  const restore = __setExec(exec);
  t.after(restore);

  await revert({
    platform: "macos",
    service: "Wi-Fi",
    http: { enabled: true, host: "10.0.0.1", port: "8888" },
    https: { enabled: false, host: "", port: "" },
  });
  const restoreCall = calls.find((c) => c.args.includes("-setwebproxy"));
  assert.ok(restoreCall);
  assert.deepEqual(restoreCall.args, ["-setwebproxy", "Wi-Fi", "10.0.0.1", "8888"]);
  // https disabled previously → revert should turn it off
  const offCall = calls.find((c) => c.args.includes("-setsecurewebproxystate"));
  assert.ok(offCall);
  assert.deepEqual(offCall.args, ["-setsecurewebproxystate", "Wi-Fi", "off"]);
});

test("Linux apply uses gsettings with array args", async (t) => {
  const orig = os.platform;
  (os as { platform: () => NodeJS.Platform }).platform = () => "linux" as NodeJS.Platform;
  t.after(() => {
    (os as { platform: () => NodeJS.Platform }).platform = orig;
  });

  const { calls, exec } = makeRecorder({
    "get org.gnome.system.proxy mode": "'none'\n",
    "get org.gnome.system.proxy.http host": "''\n",
  });
  const restore = __setExec(exec);
  t.after(restore);

  const result = await apply(9090);
  assert.equal(result.platform, "linux");
  const setMode = calls.find(
    (c) => c.args[0] === "set" && c.args[1] === "org.gnome.system.proxy" && c.args[2] === "mode"
  );
  assert.ok(setMode);
  assert.deepEqual(setMode.args, ["set", "org.gnome.system.proxy", "mode", "manual"]);
  const setHost = calls.find(
    (c) =>
      c.args[0] === "set" &&
      c.args[1] === "org.gnome.system.proxy.http" &&
      c.args[2] === "host"
  );
  assert.ok(setHost);
  assert.deepEqual(setHost.args, ["set", "org.gnome.system.proxy.http", "host", "127.0.0.1"]);
  // port string is passed as own arg (no shell interpolation)
  const setPort = calls.find(
    (c) =>
      c.args[0] === "set" &&
      c.args[1] === "org.gnome.system.proxy.http" &&
      c.args[2] === "port"
  );
  assert.ok(setPort);
  assert.equal(setPort.args[3], "9090");
});

test("Linux revert restores recorded gnomeMode", async (t) => {
  const orig = os.platform;
  (os as { platform: () => NodeJS.Platform }).platform = () => "linux" as NodeJS.Platform;
  t.after(() => {
    (os as { platform: () => NodeJS.Platform }).platform = orig;
  });

  const { calls, exec } = makeRecorder();
  const restore = __setExec(exec);
  t.after(restore);

  await revert({
    platform: "linux",
    gnomeMode: "'auto'",
    httpHost: "old.host",
    httpPort: "1234",
    httpsHost: "",
    httpsPort: "",
  });
  const restoreMode = calls.find(
    (c) => c.args[0] === "set" && c.args[1] === "org.gnome.system.proxy" && c.args[2] === "mode"
  );
  assert.ok(restoreMode);
  assert.equal(restoreMode.args[3], "'auto'");
});

test("Windows apply passes proxyArg as single arg, no shell interpolation", async (t) => {
  const orig = os.platform;
  (os as { platform: () => NodeJS.Platform }).platform = () => "win32" as NodeJS.Platform;
  t.after(() => {
    (os as { platform: () => NodeJS.Platform }).platform = orig;
  });

  const { calls, exec } = makeRecorder({
    "winhttp show proxy": "Direct access (no proxy server).",
  });
  const restore = __setExec(exec);
  t.after(restore);

  const result = await apply(7777);
  assert.equal(result.platform, "windows");
  const setCall = calls.find((c) => c.args.join(" ") === "winhttp set proxy 127.0.0.1:7777");
  assert.ok(setCall);
  assert.equal(setCall.file, "netsh");
  // Argument is one literal token — no embedded spaces, semicolons, pipes
  const proxyArg = setCall.args[setCall.args.length - 1];
  assert.equal(proxyArg, "127.0.0.1:7777");
});

test("Windows revert calls netsh winhttp reset proxy", async (t) => {
  const orig = os.platform;
  (os as { platform: () => NodeJS.Platform }).platform = () => "win32" as NodeJS.Platform;
  t.after(() => {
    (os as { platform: () => NodeJS.Platform }).platform = orig;
  });

  const { calls, exec } = makeRecorder();
  const restore = __setExec(exec);
  t.after(restore);

  await revert({ platform: "windows", netshOutput: "" });
  const resetCall = calls.find((c) => c.args.join(" ") === "winhttp reset proxy");
  assert.ok(resetCall);
});

test("apply throws sanitized error when exec fails", async (t) => {
  const orig = os.platform;
  (os as { platform: () => NodeJS.Platform }).platform = () => "darwin" as NodeJS.Platform;
  t.after(() => {
    (os as { platform: () => NodeJS.Platform }).platform = orig;
  });

  const exec: ExecFileFn = async () => {
    throw new Error("ENOENT: /usr/bin/networksetup");
  };
  const restore = __setExec(exec);
  t.after(restore);

  await assert.rejects(() => apply(8080), (err: Error) => {
    // sanitizeErrorMessage strips paths; assert we still get an Error
    assert.ok(err instanceof Error);
    assert.ok(err.message.length > 0);
    return true;
  });
});

test("revert no-ops for unknown platform payload", async (t) => {
  const { calls, exec } = makeRecorder();
  const restore = __setExec(exec);
  t.after(restore);

  await revert(null);
  await revert({ platform: "freebsd" });
  assert.equal(calls.length, 0);
});
