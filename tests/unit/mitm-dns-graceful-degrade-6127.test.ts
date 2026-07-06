/**
 * Regression test for #6127 + #6198 — AgentBridge DNS provisioning must degrade
 * gracefully AND surface the privileged command's stderr to app.log.
 *
 * #6127: In the runtime Docker image (`USER node`, `node:24-trixie-slim`, no `sudo`,
 * read-only /etc/hosts) the Antigravity-default DNS step (`addDNSEntry`) was called
 * unguarded, while the two sibling DNS steps (agent hosts, custom hosts) and the cert
 * install were each wrapped in a best-effort `try/catch { log.error; continuing }`.
 * The asymmetric unguarded step threw all the way out of `startMitmInternal`, aborting
 * the whole bridge start with a bare "Command failed with code 1".
 *
 * #6198: because the failure propagated instead of being logged, only the exit code
 * reached the toast — the privileged command's stderr (captured into the Error message
 * by `systemCommands.ts`) never reached app.log, leaving no diagnostic trail.
 *
 * The fix extracts the three DNS steps into `provisionDnsEntries()`, where each step is
 * best-effort: a failure is logged with the full `err` (stderr included) and never
 * aborts the start.
 */
import { test } from "node:test";
import assert from "node:assert/strict";
import { provisionDnsEntries } from "../../src/mitm/dns/provision.ts";

function makeSpyLogger() {
  const errorCalls: Array<{ payload: unknown; msg: string }> = [];
  const infoCalls: Array<{ payload: unknown; msg: string }> = [];
  return {
    logger: {
      error: (payload: unknown, msg: string) => errorCalls.push({ payload, msg }),
      info: (payload: unknown, msg?: string) =>
        infoCalls.push({ payload, msg: msg ?? "" }),
    },
    errorCalls,
    infoCalls,
  };
}

test("provisionDnsEntries: default DNS step failure does NOT abort (graceful degrade) [#6127]", async () => {
  const spy = makeSpyLogger();
  await assert.doesNotReject(
    provisionDnsEntries("fake-password", {
      addDefaultDns: async () => {
        throw new Error("Command failed with code 1\nsudo: a password is required");
      },
      // No agents / no custom hosts so the other two steps are no-ops.
      getAgentStates: () => [],
      listEnabledCustomHosts: () => [],
      logger: spy.logger,
    })
  );
});

test("provisionDnsEntries: failed default DNS step logs the stderr to the logger [#6198]", async () => {
  const spy = makeSpyLogger();
  await provisionDnsEntries("fake-password", {
    addDefaultDns: async () => {
      throw new Error("Command failed with code 1\nsudo: a password is required");
    },
    getAgentStates: () => [],
    listEnabledCustomHosts: () => [],
    logger: spy.logger,
  });

  assert.equal(spy.errorCalls.length, 1, "expected exactly one error log");
  const call = spy.errorCalls[0];
  const err = (call.payload as { err?: Error }).err;
  assert.ok(err instanceof Error, "logged payload must carry the Error under `err`");
  assert.match(
    err.message,
    /sudo: a password is required/,
    "the privileged command stderr must reach the log payload"
  );
});

test("provisionDnsEntries: a failing agent/custom step does not stop the others [#6127]", async () => {
  const spy = makeSpyLogger();
  let customCalled = false;
  await provisionDnsEntries("pw", {
    addDefaultDns: async () => {
      throw new Error("Command failed with code 1\nno sudo");
    },
    addHostsDns: async (hosts: string[]) => {
      // Custom-hosts call must still happen even after default + agent errors.
      if (hosts.includes("custom.example.com")) customCalled = true;
    },
    getAgentStates: () =>
      [{ dns_enabled: true, agent_id: "__nonexistent_agent__" }] as never,
    listEnabledCustomHosts: () => [{ host: "custom.example.com" }] as never,
    logger: spy.logger,
  });
  assert.ok(customCalled, "custom-hosts DNS step must run despite earlier failures");
});

test("provisionDnsEntries: happy path calls the default step and does not log errors", async () => {
  const spy = makeSpyLogger();
  let defaultCalled = false;
  await provisionDnsEntries("pw", {
    addDefaultDns: async () => {
      defaultCalled = true;
    },
    getAgentStates: () => [],
    listEnabledCustomHosts: () => [],
    logger: spy.logger,
  });
  assert.ok(defaultCalled, "default DNS step must be invoked");
  assert.equal(spy.errorCalls.length, 0, "no error logs on the happy path");
});
