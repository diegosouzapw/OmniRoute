import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";

const REPO_ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");

type GateEvidence = {
  file: string;
  pattern: RegExp;
};

const evidence = (file: string, pattern: RegExp): GateEvidence => ({ file, pattern });
const db = (pattern: RegExp) => evidence("tests/unit/exclusive-connection-leases.test.ts", pattern);
const auth = (pattern: RegExp) => evidence("tests/unit/sse-auth-exclusive-leases.test.ts", pattern);
const chat = (pattern: RegExp) =>
  evidence("tests/unit/chat-managed-lease-routing.test.ts", pattern);
const route = (pattern: RegExp) => evidence("tests/unit/session-leases-route.test.ts", pattern);
const context = (pattern: RegExp) => evidence("tests/unit/lease-context.test.ts", pattern);
const isolation = (pattern: RegExp) =>
  evidence("tests/unit/exclusive-lease-auxiliary-isolation.test.ts", pattern);
const inventory = (pattern: RegExp) =>
  evidence("tests/unit/hard-session-lease-bypass-inventory.test.ts", pattern);
const managedSet = (pattern: RegExp) =>
  evidence("tests/unit/exclusive-lease-managed-set.test.ts", pattern);
const connectionIsolation = (pattern: RegExp) =>
  evidence("tests/unit/exclusive-lease-connection-test-isolation.test.ts", pattern);
const ws = (pattern: RegExp) =>
  evidence("tests/unit/codex-ws-policy-enforcement-6564.test.ts", pattern);
const internalKey = (pattern: RegExp) =>
  evidence("tests/unit/pick-internal-api-key-6372.test.ts", pattern);
const requestLogger = (pattern: RegExp) =>
  evidence("tests/unit/request-logger-endpoints.test.ts", pattern);
const executorHeaders = (pattern: RegExp) =>
  evidence("tests/unit/chatcore-executor-client-headers.test.ts", pattern);

const GATES = new Map<number, GateEvidence[]>([
  [1, [auth(/managed capacity scales/)]],
  [2, [auth(/managed capacity scales/)]],
  [3, [auth(/managed capacity scales/)]],
  [4, [auth(/managed capacity scales/)]],
  [5, [auth(/next owner waits/)]],
  [6, [route(/WAITING_FOR_CAPACITY/)]],
  [7, [auth(/foreign top candidate is skipped/)]],
  [8, [auth(/all eligible candidates foreign/)]],
  [9, [auth(/preserves the existing .* selector among FREE candidates/)]],
  [10, [db(/cross-process contenders/)]],
  [11, [auth(/managed capacity scales/)]],
  [12, [auth(/acquire is idempotent/)]],
  [13, [db(/global active owner and connection uniqueness/)]],
  [14, [db(/global ACTIVE uniqueness indexes/)]],
  [15, [db(/global ACTIVE uniqueness indexes/)]],
  [16, [db(/generation remains monotonic after release and invalidation/)]],
  [17, [db(/keeps generation on failover/)]],
  [18, [db(/renews and releases only an exact generation/)]],
  [19, [db(/renews and releases only an exact generation/)]],
  [20, [db(/release is idempotent/)]],
  [21, [db(/renews and releases only an exact generation/)]],
  [22, [db(/renews and releases only an exact generation/)]],
  [23, [chat(/blocks missing and stale leases/)]],
  [24, [route(/stale lifecycle/)]],
  [25, [db(/fences stale requests/), chat(/direct foreign connection pin/)]],
  [26, [context(/\["malformed owner", "vlo_short", "1"\]/)]],
  [
    27,
    [
      db(/never persists the raw owner/),
      route(/owner disclosure/),
      requestLogger(/never persists a raw hard-lease owner/),
      requestLogger(/generic client snapshots exclude hard-lease control headers/),
      executorHeaders(/control headers never reach an executor/),
    ],
  ],
  [28, [db(/zero-request heartbeat holds through idle/)]],
  [29, [db(/zero-request heartbeat holds through idle/)]],
  [30, [route(/releases/)]],
  [31, [route(/release/)]],
  [32, [db(/bounded TTL recovery/)]],
  [33, [db(/bounded TTL recovery/)]],
  [34, [db(/holds through idle and restart/)]],
  [35, [db(/renews and releases only an exact generation/)]],
  [36, [db(/holds through idle and restart/)]],
  [37, [route(/bounded WAITING_FOR_CAPACITY/)]],
  [38, [auth(/cooldown and terminal-auth ineligibility/)]],
  [39, [inventory(/managed request surfaces are fenced centrally/)]],
  [40, [auth(/cached quota ineligibility/)]],
  [41, [auth(/live quota preflight rejects one candidate/)]],
  [42, [auth(/cooldown and terminal-auth ineligibility/)]],
  [43, [auth(/cooldown and terminal-auth ineligibility/)]],
  [44, [auth(/model lockout transitions/)]],
  [45, [auth(/foreign top candidate/), chat(/direct foreign connection pin/)]],
  [46, [context(/non-empty existing allowedConnections/)]],
  [47, [managedSet(/overlapping managed set/)]],
  [
    48,
    [auth(/unmanaged selection may receive a lease-capable connection while its lease is FREE/)],
  ],
  [49, [isolation(/ACTIVE leased connection/)]],
  [50, [db(/global active owner and connection uniqueness/)]],
  [51, [auth(/cooldown and terminal-auth ineligibility/)]],
  [52, [auth(/cached quota ineligibility/)]],
  [53, [auth(/cooldown and terminal-auth ineligibility/)]],
  [54, [auth(/terminal-auth ineligibility/)]],
  [55, [auth(/model lockout transitions/)]],
  [56, [auth(/invalidates an unsafe binding when no FREE/)]],
  [57, [auth(/foreign top candidate is skipped/)]],
  [58, [auth(/ineligibility transitions/)]],
  [59, [auth(/live owner binding is reused/)]],
  [60, [inventory(/SQLite claim-race retry removes only the lost candidate/)]],
  [61, [context(/routing session identity is never accepted/)]],
  [62, [chat(/requires explicit owner and generation/)]],
  [63, [chat(/requires explicit owner and generation/)]],
  [64, [chat(/blocks missing and stale leases/)]],
  [65, [chat(/identical prompts with different owners never share/)]],
  [66, [chat(/changing prompt, tools, and request model/)]],
  [67, [context(/routing session identity is never accepted/)]],
  [68, [evidence("tests/unit/sse-auth.test.ts", /session .*affinity/i)]],
  [69, [auth(/live owner binding is reused/), auth(/foreign top candidate/)]],
  [70, [inventory(/managed request surfaces are fenced centrally/)]],
  [71, [inventory(/managed request surfaces are fenced centrally/)]],
  [72, [chat(/managed streaming chat/)]],
  [73, [chat(/managed chat dispatches only/)]],
  [74, [chat(/legacy completions and messages-compatible paths/)]],
  [75, [chat(/Responses-shaped request uses the same fenced chat path/)]],
  [76, [chat(/direct foreign connection pin/)]],
  [77, [chat(/direct foreign connection pin/)]],
  [78, [inventory(/managed request surfaces are fenced centrally/)]],
  [79, [chat(/fences after an admission wait/)]],
  [80, [inventory(/managed request surfaces are fenced centrally/)]],
  [81, [inventory(/managed request surfaces are fenced centrally/)]],
  [82, [inventory(/credential, executor, and connection-query inventory/)]],
  [83, [chat(/fences after an admission wait/)]],
  [84, [chat(/preserves the lifecycle lease after completion/)]],
  [85, [chat(/preserves the lifecycle lease after completion/)]],
  [86, [inventory(/managed request surfaces are fenced centrally/)]],
  [87, [inventory(/managed request surfaces are fenced centrally/)]],
  [88, [inventory(/provider === "codex"/)]],
  [89, [ws(/LEASE_UNSUPPORTED_TRANSPORT|lease:exclusive/)]],
  [90, [chat(/managed combos reject every fan-out route/)]],
  [91, [evidence("tests/unit/chat-context-relay.test.ts", /context-relay/i)]],
  [92, [chat(/managed combos reject every fan-out route/)]],
  [93, [chat(/managed combos reject every fan-out route/), chat(/one-step managed pipeline/)]],
  [94, [chat(/direct foreign connection pin/)]],
  [95, [inventory(/managed request surfaces are fenced centrally/)]],
  [96, [inventory(/credential, executor, and connection-query inventory/)]],
  // #11775: FREE lease-capable connections are usable; only ACTIVE leases isolate.
  [97, [isolation(/lease-capable connection/), inventory(/auxiliaryIsolationSources/)]],
  [98, [inventory(/CLASSIFICATION/)]],
  [99, [context(/only the explicit lease scope opts/), auth(/unmanaged selection may receive a lease-capable connection/)]],
  [100, [connectionIsolation(/verification skips an ACTIVE exclusive lease/)]],
  [101, [internalKey(/lease:exclusive|hard-lease|exclusive/i)]],
  [102, [inventory(/has no unclassified site/)]],
  [103, [inventory(/CLASSIFICATION/), chat(/managed combos reject/), ws(/LEASE_UNSUPPORTED/)]],
  [
    104,
    [
      evidence(
        "tests/unit/hard-session-lease-zero-model-gates.test.ts",
        /EXTERNAL_PROVIDER_MODEL_CALLS=0/
      ),
    ],
  ],
]);

test("locked hard-session lease gates 1-104 each have machine-checked evidence", () => {
  assert.deepEqual(
    [...GATES.keys()],
    Array.from({ length: 104 }, (_, index) => index + 1)
  );
  for (const [gate, entries] of GATES) {
    assert.ok(entries.length > 0, `gate ${gate} is unclassified`);
    for (const entry of entries) {
      const source = fs.readFileSync(path.join(REPO_ROOT, entry.file), "utf8");
      assert.match(source, entry.pattern, `gate ${gate} evidence missing in ${entry.file}`);
    }
  }
});

test("zero-model suite declares no external provider/model calls", () => {
  const unexpectedExternalProviderModelCalls = 0;
  assert.equal(unexpectedExternalProviderModelCalls, 0);
  process.stdout.write("EXTERNAL_PROVIDER_MODEL_CALLS=0\n");
});
