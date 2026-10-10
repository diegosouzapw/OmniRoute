import { test } from "node:test";
import assert from "node:assert/strict";
import { mkdtempSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";
import {
  CDP_TOKEN_HEADER,
  cdpConnectOptions,
  resolveCdpProxyToken,
} from "../../open-sse/vendor/codex-chatgpt-web/cdp-auth.ts";

// #14486: the CDP proxy now fails closed, so connectOverCDP must carry the token.

test("connectOverCDP options send X-Omni-Cdp-Token from CDP_PROXY_TOKEN", () => {
  const opts = cdpConnectOptions({ CDP_PROXY_TOKEN: " secret-1 " } as NodeJS.ProcessEnv);
  assert.deepEqual(opts, { headers: { [CDP_TOKEN_HEADER]: "secret-1" } });
  assert.equal(CDP_TOKEN_HEADER, "X-Omni-Cdp-Token");
});

test("connectOverCDP options fall back to the shared CDP_PROXY_TOKEN_FILE", () => {
  const dir = mkdtempSync(path.join(tmpdir(), "cdp-hdr-14486-"));
  try {
    const file = path.join(dir, "token");
    writeFileSync(file, "from-file\n");
    const env = { CDP_PROXY_TOKEN_FILE: file } as NodeJS.ProcessEnv;
    assert.equal(resolveCdpProxyToken(env), "from-file");
    assert.deepEqual(cdpConnectOptions(env), { headers: { [CDP_TOKEN_HEADER]: "from-file" } });
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
});

test("no token configured yields no options and an unreadable file does not throw", () => {
  assert.equal(cdpConnectOptions({} as NodeJS.ProcessEnv), undefined);
  assert.equal(
    cdpConnectOptions({ CDP_PROXY_TOKEN_FILE: "/nonexistent/14486" } as NodeJS.ProcessEnv),
    undefined
  );
});
