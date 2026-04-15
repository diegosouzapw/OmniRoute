import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs/promises";
import os from "node:os";
import path from "node:path";

import {
  buildCloudflaredChildEnv,
  extractCloudflaredErrorMessage,
  extractTryCloudflareUrl,
  getCloudflaredTunnelStatus,
  getDefaultCloudflaredCertEnv,
  getCloudflaredStartArgs,
  getCloudflaredAssetSpec,
} from "../../src/lib/cloudflaredTunnel.ts";

test("extractTryCloudflareUrl parses trycloudflare URL from log output", () => {
  const url = extractTryCloudflareUrl(
    "INF +------------------------------------------------------------+\nINF |  https://violet-sky-1234.trycloudflare.com                   |\nINF +------------------------------------------------------------+"
  );

  assert.equal(url, "https://violet-sky-1234.trycloudflare.com");
});

test("extractTryCloudflareUrl returns null when no tunnel URL is present", () => {
  assert.equal(extractTryCloudflareUrl("cloudflared starting without assigned URL"), null);
});

test("extractTryCloudflareUrl ignores the cloudflared API endpoint host", () => {
  assert.equal(
    extractTryCloudflareUrl(
      'ERR failed to request quick Tunnel: Post "https://api.trycloudflare.com/tunnel": tls: failed to verify certificate'
    ),
    null
  );
});

test("extractCloudflaredErrorMessage keeps the actionable stderr line", () => {
  const error = extractCloudflaredErrorMessage(
    '2026-03-30T19:56:12Z INF Requesting new quick Tunnel on trycloudflare.com...\n2026-03-30T19:56:12Z ERR failed to request quick Tunnel: Post "https://api.trycloudflare.com/tunnel": tls: failed to verify certificate: x509: certificate signed by unknown authority'
  );

  assert.equal(
    error,
    'failed to request quick Tunnel: Post "https://api.trycloudflare.com/tunnel": tls: failed to verify certificate: x509: certificate signed by unknown authority'
  );
});

test("extractCloudflaredErrorMessage ignores the non-actionable UDP buffer warning", () => {
  const error = extractCloudflaredErrorMessage(
    "WRN failed to sufficiently increase receive buffer size (was: 208 kiB, wanted: 7168 kiB, got: 416 kiB). See https://github.com/quic-go/quic-go/wiki/UDP-Buffer-Sizes for details."
  );

  assert.equal(error, null);
});

test("getCloudflaredAssetSpec resolves linux amd64 binary", () => {
  const spec = getCloudflaredAssetSpec("linux", "x64");

  assert.deepEqual(spec, {
    assetName: "cloudflared-linux-amd64",
    binaryName: "cloudflared",
    archive: "none",
    downloadUrl:
      "https://github.com/cloudflare/cloudflared/releases/latest/download/cloudflared-linux-amd64",
  });
});

test("getCloudflaredAssetSpec resolves darwin arm64 archive", () => {
  const spec = getCloudflaredAssetSpec("darwin", "arm64");

  assert.deepEqual(spec, {
    assetName: "cloudflared-darwin-arm64.tgz",
    binaryName: "cloudflared",
    archive: "tgz",
    downloadUrl:
      "https://github.com/cloudflare/cloudflared/releases/latest/download/cloudflared-darwin-arm64.tgz",
  });
});

test("getCloudflaredAssetSpec returns null for unsupported platforms", () => {
  assert.equal(getCloudflaredAssetSpec("freebsd", "x64"), null);
});

test("buildCloudflaredChildEnv keeps runtime essentials, isolates runtime dirs, and drops secrets", () => {
  const env = buildCloudflaredChildEnv(
    {
      PATH: "/usr/bin",
      HTTPS_PROXY: "http://proxy.internal:8080",
      JWT_SECRET: "top-secret",
      API_KEY_SECRET: "another-secret",
    },
    {
      runtimeRoot: "/managed/runtime",
      homeDir: "/managed/runtime/home",
      configDir: "/managed/runtime/config",
      cacheDir: "/managed/runtime/cache",
      dataDir: "/managed/runtime/data",
      tempDir: "/managed/runtime/tmp",
      userProfileDir: "/managed/runtime/userprofile",
      appDataDir: "/managed/runtime/userprofile/AppData/Roaming",
      localAppDataDir: "/managed/runtime/userprofile/AppData/Local",
    },
    {}
  );

  assert.deepEqual(env, {
    PATH: "/usr/bin",
    HTTPS_PROXY: "http://proxy.internal:8080",
    HOME: "/managed/runtime/home",
    XDG_CONFIG_HOME: "/managed/runtime/config",
    XDG_CACHE_HOME: "/managed/runtime/cache",
    XDG_DATA_HOME: "/managed/runtime/data",
    USERPROFILE: "/managed/runtime/userprofile",
    APPDATA: "/managed/runtime/userprofile/AppData/Roaming",
    LOCALAPPDATA: "/managed/runtime/userprofile/AppData/Local",
    TMPDIR: "/managed/runtime/tmp",
    TMP: "/managed/runtime/tmp",
    TEMP: "/managed/runtime/tmp",
    TUNNEL_TRANSPORT_PROTOCOL: "http2",
  });
});

test("buildCloudflaredChildEnv allows overriding the tunnel transport protocol", () => {
  const env = buildCloudflaredChildEnv(
    {
      PATH: "/usr/bin",
      CLOUDFLARED_PROTOCOL: "quic",
    },
    {
      runtimeRoot: "/managed/runtime",
      homeDir: "/managed/runtime/home",
      configDir: "/managed/runtime/config",
      cacheDir: "/managed/runtime/cache",
      dataDir: "/managed/runtime/data",
      tempDir: "/managed/runtime/tmp",
      userProfileDir: "/managed/runtime/userprofile",
      appDataDir: "/managed/runtime/userprofile/AppData/Roaming",
      localAppDataDir: "/managed/runtime/userprofile/AppData/Local",
    },
    {}
  );

  assert.equal(env.TUNNEL_TRANSPORT_PROTOCOL, "quic");
});

test("buildCloudflaredChildEnv preserves auto negotiation when explicitly requested", () => {
  const env = buildCloudflaredChildEnv(
    {
      PATH: "/usr/bin",
      CLOUDFLARED_PROTOCOL: "auto",
    },
    {
      runtimeRoot: "/managed/runtime",
      homeDir: "/managed/runtime/home",
      configDir: "/managed/runtime/config",
      cacheDir: "/managed/runtime/cache",
      dataDir: "/managed/runtime/data",
      tempDir: "/managed/runtime/tmp",
      userProfileDir: "/managed/runtime/userprofile",
      appDataDir: "/managed/runtime/userprofile/AppData/Roaming",
      localAppDataDir: "/managed/runtime/userprofile/AppData/Local",
    },
    {}
  );

  assert.equal(env.TUNNEL_TRANSPORT_PROTOCOL, undefined);
});

test("getDefaultCloudflaredCertEnv detects common CA bundle paths", () => {
  const env = getDefaultCloudflaredCertEnv((candidate) =>
    ["/etc/ssl/certs/ca-certificates.crt", "/etc/ssl/certs"].includes(candidate)
  );

  assert.deepEqual(env, {
    SSL_CERT_FILE: "/etc/ssl/certs/ca-certificates.crt",
    SSL_CERT_DIR: "/etc/ssl/certs",
  });
});

test("buildCloudflaredChildEnv injects discovered CA paths when the parent env omits them", () => {
  const env = buildCloudflaredChildEnv(
    { PATH: "/usr/bin" },
    {
      runtimeRoot: "/managed/runtime",
      homeDir: "/managed/runtime/home",
      configDir: "/managed/runtime/config",
      cacheDir: "/managed/runtime/cache",
      dataDir: "/managed/runtime/data",
      tempDir: "/managed/runtime/tmp",
      userProfileDir: "/managed/runtime/userprofile",
      appDataDir: "/managed/runtime/userprofile/AppData/Roaming",
      localAppDataDir: "/managed/runtime/userprofile/AppData/Local",
    },
    {
      SSL_CERT_FILE: "/etc/ssl/certs/ca-certificates.crt",
      SSL_CERT_DIR: "/etc/ssl/certs",
    }
  );

  assert.equal(env.SSL_CERT_FILE, "/etc/ssl/certs/ca-certificates.crt");
  assert.equal(env.SSL_CERT_DIR, "/etc/ssl/certs");
});

test("getCloudflaredStartArgs keeps protocol selection out of argv", () => {
  assert.deepEqual(getCloudflaredStartArgs("http://127.0.0.1:20128"), [
    "tunnel",
    "--url",
    "http://127.0.0.1:20128",
    "--no-autoupdate",
  ]);
});

test("getCloudflaredTunnelStatus resets stale runtime state from a previous server process", async () => {
  const originalDataDir = process.env.DATA_DIR;
  const originalBinary = process.env.CLOUDFLARED_BIN;
  const tempDir = await fs.mkdtemp(path.join(os.tmpdir(), "omniroute-cloudflared-"));
  const binDir = path.join(tempDir, "bin");
  const binaryPath = path.join(binDir, "cloudflared");
  const stateDir = path.join(tempDir, "cloudflared");
  const statePath = path.join(stateDir, "quick-tunnel-state.json");

  process.env.DATA_DIR = tempDir;
  process.env.CLOUDFLARED_BIN = binaryPath;

  try {
    await fs.mkdir(binDir, { recursive: true });
    await fs.mkdir(stateDir, { recursive: true });
    await fs.writeFile(binaryPath, "#!/bin/sh\nexit 0\n", "utf8");
    await fs.writeFile(
      statePath,
      JSON.stringify(
        {
          binaryPath,
          installSource: "env",
          ownerPid: process.pid + 100000,
          pid: process.pid,
          publicUrl: "https://stale.trycloudflare.com",
          apiUrl: "https://stale.trycloudflare.com/v1",
          targetUrl: "http://127.0.0.1:20128",
          status: "running",
          lastError:
            "failed to sufficiently increase receive buffer size (was: 208 kiB, wanted: 7168 kiB, got: 416 kiB)",
          startedAt: "2026-04-02T00:07:16.000Z",
        },
        null,
        2
      ) + "\n",
      "utf8"
    );

    const status = await getCloudflaredTunnelStatus();
    const persisted = JSON.parse(await fs.readFile(statePath, "utf8"));

    assert.equal(status.running, false);
    assert.equal(status.phase, "stopped");
    assert.equal(status.publicUrl, null);
    assert.equal(status.apiUrl, null);
    assert.equal(status.lastError, null);
    assert.equal(persisted.ownerPid, null);
    assert.equal(persisted.pid, null);
    assert.equal(persisted.publicUrl, null);
    assert.equal(persisted.apiUrl, null);
    assert.equal(persisted.status, "stopped");
    assert.equal(persisted.lastError, null);
  } finally {
    if (originalDataDir === undefined) {
      delete process.env.DATA_DIR;
    } else {
      process.env.DATA_DIR = originalDataDir;
    }

    if (originalBinary === undefined) {
      delete process.env.CLOUDFLARED_BIN;
    } else {
      process.env.CLOUDFLARED_BIN = originalBinary;
    }

    await fs.rm(tempDir, { recursive: true, force: true });
  }
});
