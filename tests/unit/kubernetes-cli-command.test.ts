/**
 * `omniroute deploy k8s` — argument surface and stdout contract.
 *
 * The command exists to be piped (`omniroute deploy k8s | kubectl apply -f -`),
 * so the contract that matters most is that stdout carries ONLY the manifests.
 * Env-loading notices and DB warnings printed there make the YAML unparseable,
 * which is exactly the regression these tests pin.
 */

import test from "node:test";
import assert from "node:assert/strict";
import { execFile } from "node:child_process";
import path from "node:path";
import { promisify } from "node:util";
import { loadAll as yamlLoadAll } from "js-yaml";

const execFileAsync = promisify(execFile);
const REPO_ROOT = path.resolve(import.meta.dirname, "../..");
const CLI = path.join(REPO_ROOT, "bin/omniroute.mjs");

/** ESC — startup notices are colorized, so any escape on stdout is a leak. */
const ESC = "\u001b";

interface CliResult {
  stdout: string;
  stderr: string;
  code: number;
}

async function runCli(args: string[]): Promise<CliResult> {
  try {
    const { stdout, stderr } = await execFileAsync("node", [CLI, ...args], {
      cwd: REPO_ROOT,
      timeout: 120_000,
      maxBuffer: 8 * 1024 * 1024,
    });
    return { stdout, stderr, code: 0 };
  } catch (err) {
    const e = err as { stdout?: string; stderr?: string; code?: number };
    return { stdout: e.stdout ?? "", stderr: e.stderr ?? "", code: e.code ?? 1 };
  }
}

interface Doc {
  kind?: string;
  spec?: Record<string, unknown>;
  data?: Record<string, string>;
}

function parseDocs(stdout: string): Doc[] {
  return (yamlLoadAll(stdout) as Doc[]).filter((d) => d && typeof d === "object");
}

test("stdout carries only manifests, so the output can be piped to kubectl", async () => {
  const { stdout, code } = await runCli(["deploy", "k8s", "--target", "local"]);
  assert.equal(code, 0);

  // The real failure mode: startup notices on stdout make this throw with
  // "control characters are not allowed".
  const docs = parseDocs(stdout);
  assert.deepEqual(
    docs.map((d) => d.kind),
    ["Namespace", "ConfigMap", "PersistentVolumeClaim", "Deployment", "Service", "Ingress"]
  );
  assert.ok(!stdout.includes(ESC), "ANSI escapes must not reach stdout");
  assert.ok(!/Loaded env|\[DB\]|STORAGE_ENCRYPTION_KEY/.test(stdout));
});

test("the single-writer invariants survive the CLI path", async () => {
  const { stdout } = await runCli(["deploy", "k8s", "--target", "local"]);
  const deployment = parseDocs(stdout).find((d) => d.kind === "Deployment");
  assert.ok(deployment);
  assert.equal(deployment.spec?.replicas, 1);
  assert.deepEqual(deployment.spec?.strategy, { type: "Recreate" });
});

test("a vps target without a host fails with a usable hint", async () => {
  const { stdout, stderr, code } = await runCli(["deploy", "k8s", "--target", "vps"]);
  assert.equal(code, 2, "invalid arguments must exit 2, per the CLI conventions");
  assert.equal(stdout, "", "nothing partial may reach stdout on failure");
  assert.match(stderr, /ingress\.host/);
  assert.match(stderr, /--host/, "the error must say how to fix it");
});

test("a vps target with a host renders TLS and requires an API key", async () => {
  const { stdout, code } = await runCli([
    "deploy",
    "k8s",
    "--target",
    "vps",
    "--host",
    "llms.example.com",
  ]);
  assert.equal(code, 0);
  const docs = parseDocs(stdout);

  const ingress = docs.find((d) => d.kind === "Ingress");
  assert.ok(ingress, "a vps deploy must expose an Ingress");
  const tls = (ingress.spec as { tls?: { hosts: string[] }[] }).tls;
  assert.deepEqual(tls?.[0]?.hosts, ["llms.example.com"]);

  const config = docs.find((d) => d.kind === "ConfigMap");
  assert.equal(
    config?.data?.REQUIRE_API_KEY,
    "true",
    "a cluster others can reach must not serve /v1/* unauthenticated"
  );
  assert.equal(
    config?.data?.LIVE_WS_ALLOWED_ORIGINS,
    "https://llms.example.com",
    "the host must be derived into the WebSocket origins, or the live view is rejected"
  );
});

test("--no-ingress drops the Ingress instead of failing on a missing host", async () => {
  const { stdout, code } = await runCli(["deploy", "k8s", "--target", "vps", "--no-ingress"]);
  assert.equal(code, 0);
  assert.ok(!parseDocs(stdout).some((d) => d.kind === "Ingress"));
});

test("an invalid target is rejected", async () => {
  const { stderr, code } = await runCli(["deploy", "k8s", "--target", "staging"]);
  assert.equal(code, 2);
  assert.match(stderr, /--target/);
});

test("a heap ceiling above the memory limit is rejected end to end", async () => {
  const { code, stderr } = await runCli([
    "deploy",
    "k8s",
    "--limits-memory",
    "2Gi",
    "--max-old-space",
    "4096",
  ]);
  assert.equal(code, 2, "this config is OOMKilled at runtime, so it must not render");
  assert.match(stderr, /maxOldSpaceSizeMb/);
});

test("the provision plan prints commands and never runs them", async () => {
  const { stdout, code } = await runCli([
    "deploy",
    "k8s",
    "provision",
    "--target",
    "vps",
    "--server",
    "203.0.113.10",
  ]);
  assert.equal(code, 0);
  assert.match(stdout, /--tls-san 203\.0\.113\.10/);
  assert.match(stdout, /never connects|yours to run/i);
});

test("a hostile --server value is rejected before it is rendered into a command", async () => {
  const { stdout, stderr, code } = await runCli([
    "deploy",
    "k8s",
    "provision",
    "--target",
    "vps",
    "--server",
    "1.2.3.4; curl attacker.example",
  ]);
  assert.equal(code, 2);
  assert.equal(stdout, "");
  assert.match(stderr, /--server/);
});

test("--json emits the resolved spec instead of YAML", async () => {
  const { stdout, code } = await runCli(["deploy", "k8s", "--target", "local", "--json"]);
  assert.equal(code, 0);
  const spec = JSON.parse(stdout) as { target: string; namespace: string };
  assert.equal(spec.target, "local");
  assert.equal(spec.namespace, "omniroute");
});
