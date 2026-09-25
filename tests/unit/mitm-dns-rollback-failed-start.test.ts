/**
 * Regression test: a FAILED AgentBridge/MITM start must not leave its
 * `/etc/hosts` entries behind.
 *
 * `startMitmInternal()` provisions the DNS entries (step 3) before it spawns and
 * verifies the proxy (step 4). On a failed spawn — the port is already held by
 * another service, `EACCES`, a missing `ROUTER_API_KEY` — the throw skipped every
 * teardown. The entries survived and kept resolving the AgentBridge target
 * hostnames to `127.0.0.1:<port>`, where whatever *does* own the port answers the
 * TLS handshake with an alert. Those hostnames then failed machine-wide, for
 * every client on the host, not just OmniRoute.
 *
 * Observed in the field: AgentBridge DNS was enabled for `antigravity` while
 * Caddy already owned :443. The bridge never came up, the four
 * `*cloudcode-pa.googleapis.com` hostnames stayed sinkholed, and every
 * `antigravity` request returned `502 ... ERR_SSL_TLSV1_ALERT_INTERNAL_ERROR`
 * until the lines were removed by hand. `getMitmStatus()` reported
 * `dnsConfigured: true` with `running: false` and offered no reconciliation.
 *
 * The failure path now reuses the same teardown `stopMitm()` uses, and is
 * best-effort so it can never mask the startup error being surfaced.
 */
import test from "node:test";
import assert from "node:assert/strict";

const { removeDnsEntriesAfterFailedStart } = await import("../../src/mitm/stopDnsTeardown.ts");

const INCIDENT_HOSTS = [
  "daily-cloudcode-pa.googleapis.com",
  "cloudcode-pa.googleapis.com",
  "daily-cloudcode-pa.sandbox.googleapis.com",
  "autopush-cloudcode-pa.sandbox.googleapis.com",
];

test("reverts the default entry and every managed host after a failed start", async () => {
  const calls: string[] = [];

  await removeDnsEntriesAfterFailedStart(
    {
      removeDNSEntry: async () => {
        calls.push("removeDNSEntry");
      },
      removeDNSEntries: async (hosts) => {
        calls.push(`removeDNSEntries:${hosts.join(",")}`);
      },
      collectManagedHosts: () => INCIDENT_HOSTS,
    },
    "fake-sudo-password"
  );

  assert.deepEqual(
    calls,
    ["removeDNSEntry", `removeDNSEntries:${INCIDENT_HOSTS.join(",")}`],
    "a failed start must revert both the default (antigravity) entry and the " +
      "managed host set — leaving either behind keeps the hostnames sinkholed"
  );
});

test("does not issue a managed-hosts removal when there is nothing managed", async () => {
  let managedCallCount = 0;

  await removeDnsEntriesAfterFailedStart(
    {
      removeDNSEntry: async () => {},
      removeDNSEntries: async () => {
        managedCallCount += 1;
      },
      collectManagedHosts: () => [],
    },
    "pw"
  );

  assert.equal(
    managedCallCount,
    0,
    "an empty managed set must not trigger a pointless privileged removal"
  );
});

test("a failing default-entry removal never throws — the startup error must win", async () => {
  await assert.doesNotReject(
    () =>
      removeDnsEntriesAfterFailedStart(
        {
          removeDNSEntry: async () => {
            throw new Error("sudo: no tty present");
          },
          removeDNSEntries: async () => {},
          collectManagedHosts: () => INCIDENT_HOSTS,
        },
        "pw"
      ),
    "rollback is best-effort: a teardown failure must not replace the startup " +
      "error the caller is about to throw"
  );
});

test("a failing managed-hosts removal never throws", async () => {
  await assert.doesNotReject(() =>
    removeDnsEntriesAfterFailedStart(
      {
        removeDNSEntry: async () => {},
        removeDNSEntries: async () => {
          throw new Error("sudo: no tty present");
        },
        collectManagedHosts: () => INCIDENT_HOSTS,
      },
      "pw"
    )
  );
});

test("a throwing collectManagedHosts never throws", async () => {
  await assert.doesNotReject(() =>
    removeDnsEntriesAfterFailedStart(
      {
        removeDNSEntry: async () => {},
        removeDNSEntries: async () => {},
        collectManagedHosts: () => {
          throw new Error("db unavailable");
        },
      },
      "pw"
    )
  );
});
