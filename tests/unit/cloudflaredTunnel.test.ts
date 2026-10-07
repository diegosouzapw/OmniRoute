import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs/promises";
import os from "node:os";
import path from "node:path";

import {
  buildCloudflaredChildEnv,
  extractCloudflaredConnectionReady,
  extractCloudflaredErrorMessage,
  extractCloudflaredHostnameFromConfig,
  extractTryCloudflareUrl,
  getCloudflaredNamedTunnelConfig,
  getCloudflaredTunnelStatus,
  getDefaultCloudflaredCertEnv,
  getCloudflaredStartArgs,
  getCloudflaredAssetSpec,
  getSha256FromGitHubDigest,
  normalizeCloudflaredHostname,
  verifyCloudflaredDownloadDigest,
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
  });
});

test("getCloudflaredAssetSpec resolves darwin arm64 archive", () => {
  const spec = getCloudflaredAssetSpec("darwin", "arm64");

  assert.deepEqual(spec, {
    assetName: "cloudflared-darwin-arm64.tgz",
    binaryName: "cloudflared",
    archive: "tgz",
  });
});

test("getCloudflaredAssetSpec returns null for unsupported platforms", () => {
  assert.equal(getCloudflaredAssetSpec("freebsd", "x64"), null);
});

test("getSha256FromGitHubDigest accepts only GitHub sha256 digests", () => {
  const digest = "sha256:" + "a".repeat(64);

  assert.equal(getSha256FromGitHubDigest(digest), "a".repeat(64));
  assert.equal(getSha256FromGitHubDigest("sha512:" + "a".repeat(64)), null);
  assert.equal(getSha256FromGitHubDigest("sha256:not-a-sha"), null);
});

test("verifyCloudflaredDownloadDigest rejects checksum mismatches", () => {
  const buffer = Buffer.from("cloudflared-test-binary");
  const expected = "d23f921ab91d965bb151ad66dcfc7abe20acf79cd0325cf6b7f9919ed0251c9e";

  verifyCloudflaredDownloadDigest(buffer, expected, "cloudflared-test");
  assert.throws(
    () => verifyCloudflaredDownloadDigest(buffer, "a".repeat(64), "cloudflared-test"),
    /checksum mismatch/
  );
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

test("getCloudflaredStartArgs runs a named tunnel from a config file instead of --url", () => {
  const args = getCloudflaredStartArgs("http://127.0.0.1:20128", {
    configPath: "/home/op/.cloudflared/config.yml",
    hostname: "https://ai.example.com",
  });

  assert.deepEqual(args, [
    "tunnel",
    "--no-autoupdate",
    "--config",
    "/home/op/.cloudflared/config.yml",
    "run",
  ]);
  // Quick-tunnel `--url` must not be present in named mode.
  assert.ok(!args.includes("--url"));
});

test("normalizeCloudflaredHostname coerces bare hosts and full URLs to an https origin", () => {
  assert.equal(
    normalizeCloudflaredHostname("omniroute.example.com"),
    "https://omniroute.example.com"
  );
  assert.equal(
    normalizeCloudflaredHostname("https://omniroute.example.com/"),
    "https://omniroute.example.com"
  );
  assert.equal(
    normalizeCloudflaredHostname("http://omniroute.example.com:8443/ignored/path"),
    "http://omniroute.example.com:8443"
  );
  assert.equal(normalizeCloudflaredHostname("  edge.example.com  "), "https://edge.example.com");
});

test("normalizeCloudflaredHostname returns null for empty or invalid input", () => {
  assert.equal(normalizeCloudflaredHostname(""), null);
  assert.equal(normalizeCloudflaredHostname("   "), null);
  assert.equal(normalizeCloudflaredHostname(undefined), null);
  assert.equal(normalizeCloudflaredHostname(null), null);
  assert.equal(normalizeCloudflaredHostname("https://"), null);
});

test("getCloudflaredNamedTunnelConfig returns null when CLOUDFLARED_CONFIG is unset", () => {
  assert.equal(getCloudflaredNamedTunnelConfig({}), null);
  assert.equal(getCloudflaredNamedTunnelConfig({ CLOUDFLARED_HOSTNAME: "edge.example.com" }), null);
});

test("getCloudflaredNamedTunnelConfig reads CLOUDFLARED_CONFIG and normalizes the hostname override", () => {
  assert.deepEqual(
    getCloudflaredNamedTunnelConfig({
      CLOUDFLARED_CONFIG: "  /home/op/.cloudflared/config.yml  ",
      CLOUDFLARED_HOSTNAME: "ai.example.com",
    }),
    { configPath: "/home/op/.cloudflared/config.yml", hostname: "https://ai.example.com" }
  );
});

test("getCloudflaredNamedTunnelConfig leaves hostname null when no override is set", () => {
  assert.deepEqual(getCloudflaredNamedTunnelConfig({ CLOUDFLARED_CONFIG: "/etc/cfd/config.yml" }), {
    configPath: "/etc/cfd/config.yml",
    hostname: null,
  });
});

test("extractCloudflaredHostnameFromConfig reads the first ingress hostname", () => {
  const config = [
    "tunnel: 5a336351-fcb0-4f44-8772-02572830459d",
    "credentials-file: /home/op/.cloudflared/5a336351.json",
    "# API-only exposure",
    "ingress:",
    "  - hostname: ai.example.com",
    "    path: ^/(v1|api/v1)($|/.*)",
    "    service: http://127.0.0.1:20128",
    "  - service: http_status:404",
  ].join("\n");

  assert.equal(extractCloudflaredHostnameFromConfig(config), "https://ai.example.com");
});

test("extractCloudflaredHostnameFromConfig returns null for a catch-all-only config", () => {
  assert.equal(
    extractCloudflaredHostnameFromConfig("ingress:\n  - service: http_status:404\n"),
    null
  );
  assert.equal(extractCloudflaredHostnameFromConfig(""), null);
});

test("extractCloudflaredConnectionReady matches registered edge connections", () => {
  assert.equal(
    extractCloudflaredConnectionReady(
      "2026-08-26T12:00:00Z INF Registered tunnel connection connIndex=0 connection=ab12 protocol=quic"
    ),
    true
  );
  assert.equal(
    extractCloudflaredConnectionReady("INF Connection 0a1b2c3d-4e5f registered with edge"),
    true
  );
  assert.equal(
    extractCloudflaredConnectionReady("INF Requesting new quick Tunnel on trycloudflare.com..."),
    false
  );
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

    await fs.rm(tempDir, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  }
});
