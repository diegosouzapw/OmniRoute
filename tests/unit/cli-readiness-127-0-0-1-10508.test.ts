import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { resolve, join } from "node:path";

// Regression guard for #10508: pollHealthOnce() used "localhost" (forcing DNS
// resolution) while the sibling isPortListening() already hard-codes 127.0.0.1
// for exactly this reason. A slow "localhost" DNS lookup (Windows VPN
// split-DNS/search-suffix probing, corporate resolvers, DNS-filtering
// security software) can exceed the 2s per-poll timeout and make
// waitForServer() report "hanging" forever even though the server is healthy.

const filePath = resolve(join(process.cwd(), "bin/cli/utils/pid.mjs"));
const source = readFileSync(filePath, "utf-8");

test("issue #10508: pollHealthOnce must target 127.0.0.1, not localhost", () => {
  // #11794 probes both loopbacks (IPv4 + IPv6) in parallel; the invariant from #10508
  // is unchanged: the literal 127.0.0.1 is always probed and "localhost" never is
  // (its resolution order is what broke readiness on dual-stack hosts).
  const hosts = source.match(/const hosts = \[([^\]]+)\]/);
  assert.ok(hosts, "pollHealthOnce host list not found");
  assert.match(hosts[1], /"127\.0\.0\.1"/, "readiness poll must probe the literal 127.0.0.1");
  assert.doesNotMatch(hosts[1], /localhost/, "readiness poll must never resolve localhost");
  assert.match(
    source,
    /fetch\(`http:\/\/\$\{host\}:\$\{port\}\/api\/monitoring\/health`/,
    "pollHealthOnce fetch call not found"
  );
});
