/**
 * GHSA-jmq6-8j86-8xqj — the connection test's local CLI probe spawns on the host
 * (`getCliRuntimeStatus()` → `sh -c 'command -v -- "$1"'`), the LOCAL_ONLY capability of
 * Hard Rules #15/#17. The connection-test routes stay reachable remotely, so the probe
 * itself is gated on the caller's trusted locality (loopback or private LAN).
 */
import test, { after } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-jmq6-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../src/lib/db/core.ts");
const { getRequestPeerLocality, isLoopbackRequest } =
  await import("../../src/shared/utils/apiAuth.ts");
const { getProviderRuntimeStatus } = await import("../../src/app/api/providers/[id]/test/route.ts");

after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
});

function probeSpy() {
  const calls: string[] = [];
  const probe = async (toolId: string) => {
    calls.push(toolId);
    return { installed: true, runnable: true } as never;
  };
  return { calls, probe: probe as never };
}

const CLINE = { provider: "cline", authType: "oauth" };

test("a remote caller's connection test never spawns the local CLI probe", async () => {
  const { calls, probe } = probeSpy();
  const runtime = await getProviderRuntimeStatus(CLINE, { allowLocalRuntimeProbe: false, probe });
  assert.equal(runtime, null, "no runtime diagnosis for a remote caller");
  assert.deepEqual(calls, []);
});

test("a local caller (and the scheduler default) still gets the probe", async () => {
  const { calls, probe } = probeSpy();
  await getProviderRuntimeStatus(CLINE, { allowLocalRuntimeProbe: true, probe });
  const spy2 = probeSpy();
  await getProviderRuntimeStatus(CLINE, { probe: spy2.probe });
  assert.deepEqual(calls, ["cline"]);
  assert.deepEqual(spy2.calls, ["cline"]);
});

test("getRequestPeerLocality keeps the LAN verdict and fails closed to remote", () => {
  const prevToken = process.env.OMNIROUTE_PEER_STAMP_TOKEN;
  delete process.env.OMNIROUTE_PEER_STAMP_TOKEN;
  try {
    const withIp = (ip: string) => ({ ip, headers: new Headers() });
    assert.equal(getRequestPeerLocality(withIp("127.0.0.1")), "loopback");
    assert.equal(getRequestPeerLocality(withIp("192.168.1.20")), "lan");
    assert.equal(getRequestPeerLocality(withIp("8.8.8.8")), "remote");
    assert.equal(getRequestPeerLocality(null), "remote");
    // isLoopbackRequest keeps its exact verdicts.
    assert.equal(isLoopbackRequest(withIp("127.0.0.1")), true);
    assert.equal(isLoopbackRequest(withIp("192.168.1.20")), false);
  } finally {
    if (prevToken === undefined) delete process.env.OMNIROUTE_PEER_STAMP_TOKEN;
    else process.env.OMNIROUTE_PEER_STAMP_TOKEN = prevToken;
  }
});

test("with a stamping server, a client-supplied locality header is not trusted", () => {
  const prevToken = process.env.OMNIROUTE_PEER_STAMP_TOKEN;
  process.env.OMNIROUTE_PEER_STAMP_TOKEN = "stamp-token-for-test";
  try {
    // The pipeline verdict is honoured only because the pipeline stripped client copies;
    // with no stamp and no verdict, fail closed.
    assert.equal(getRequestPeerLocality({ headers: new Headers() }), "remote");
    const verdict = new Headers({ "x-omniroute-peer-locality": "lan" });
    assert.equal(getRequestPeerLocality({ headers: verdict }), "lan");
    const bogus = new Headers({ "x-omniroute-peer-locality": "anything" });
    assert.equal(getRequestPeerLocality({ headers: bogus }), "remote");
  } finally {
    if (prevToken === undefined) delete process.env.OMNIROUTE_PEER_STAMP_TOKEN;
    else process.env.OMNIROUTE_PEER_STAMP_TOKEN = prevToken;
  }
});

test("all three connection-test entry points pass the caller's locality", () => {
  const read = (p: string) => fs.readFileSync(path.join(process.cwd(), p), "utf8");
  const single = read("src/app/api/providers/[id]/test/route.ts");
  const batch = read("src/app/api/providers/test-batch/route.ts");
  const create = read("src/app/api/providers/route.ts");
  assert.match(single, /export async function POST\(request: Request/);
  assert.match(
    single,
    /testSingleConnection\(id, validationModelId, \{\s*allowLocalRuntimeProbe: getRequestPeerLocality\(request\) !== "remote",/
  );
  assert.match(
    batch,
    /const allowLocalRuntimeProbe = getRequestPeerLocality\(request\) !== "remote";/
  );
  // S-01 (#15159): this call grew a second locality-gated flag for the devin
  // cloud-agent CLI-spawn fallback, so the single-property shape this assertion
  // used to pin no longer describes the route. Both flags must stay present —
  // restoring the old one-property regex would re-open the spawn.
  assert.match(batch, /const allowLocalSpawn = getRequestPeerLocality\(request\) !== "remote";/);
  assert.match(
    batch,
    /testSingleConnection\(conn\.id, undefined, \{ allowLocalRuntimeProbe, allowLocalSpawn \}\)/
  );
  assert.match(
    create,
    /testSingleConnection\(newConnection\.id, undefined, \{\s*allowLocalRuntimeProbe: getRequestPeerLocality\(request\) !== "remote",/
  );
});
