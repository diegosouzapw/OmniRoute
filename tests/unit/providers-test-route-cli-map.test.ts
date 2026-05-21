import test from "node:test";
import assert from "node:assert/strict";

import { CLI_RUNTIME_PROVIDER_MAP } from "../../src/app/api/providers/[id]/test/cliRuntimeProviderMap";

// #2404 — Before this fix, the kilocode provider (OAuth device flow + direct HTTPS
// to api.kilo.ai) was gated on the local `kilocode` CLI binary being installed,
// which made the connection test hard-fail with "Local CLI runtime is not installed"
// even when the OAuth token itself was perfectly valid. The CLI binary is only
// relevant for the dashboard's CLI-tools integration, not for the provider itself.
test("CLI_RUNTIME_PROVIDER_MAP must not gate kilocode on a local CLI binary (#2404)", () => {
  assert.equal(
    CLI_RUNTIME_PROVIDER_MAP.kilocode,
    undefined,
    "kilocode is an OAuth+HTTPS provider; it must not require the local CLI binary at test time"
  );
});

test("CLI_RUNTIME_PROVIDER_MAP still gates providers that actually need a local CLI", () => {
  // cline and qoder both read credentials from a local CLI auth file when used
  // in their CLI-flavored auth mode, so the runtime check stays meaningful.
  assert.equal(CLI_RUNTIME_PROVIDER_MAP.cline, "cline");
  assert.equal(CLI_RUNTIME_PROVIDER_MAP.qoder, "qoder");
});
