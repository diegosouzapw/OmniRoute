/**
 * Manifest generation.
 *
 * The generator is pure, so these run without a cluster. Two classes of
 * assertion matter here:
 *
 *   1. Invariants that corrupt data or break streaming when violated —
 *      single replica, Recreate, ReadWriteOnce, unbuffered SSE, probe targets.
 *   2. Parity with deploy/kubernetes/base, so the YAML the dashboard produces
 *      and the YAML committed in the repo cannot drift apart unnoticed.
 */

import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { load as yamlLoad, loadAll as yamlLoadAll } from "js-yaml";

import {
  buildManifests,
  renderManifests,
  defaultSpec,
  ingressAnnotationsFor,
} from "../../src/lib/deploy/kubernetes/manifestGenerator.ts";
import { deploySpecSchema, type DeploySpec } from "../../src/lib/deploy/kubernetes/types.ts";

const REPO_ROOT = path.resolve(import.meta.dirname, "../..");

interface Doc {
  kind?: string;
  metadata?: { name?: string; annotations?: Record<string, string> };
  spec?: Record<string, unknown>;
  data?: Record<string, string>;
}

function docsFor(spec: DeploySpec): Doc[] {
  return buildManifests(spec) as Doc[];
}

function ofKind(docs: Doc[], kind: string): Doc {
  const found = docs.find((d) => d.kind === kind);
  assert.ok(found, `expected a ${kind}`);
  return found;
}

/** A vps baseline needs a host before it can render. */
function completeVpsSpec(): DeploySpec {
  const base = defaultSpec("vps");
  return {
    ...base,
    ingress: { ...base.ingress, host: "llms.example.com" },
    config: { ...base.config, liveWsAllowedOrigins: "https://llms.example.com" },
  };
}

// ── Invariants ────────────────────────────────────────────────────────────────

test("every target renders exactly one replica with the Recreate strategy", () => {
  for (const spec of [defaultSpec("local"), completeVpsSpec()]) {
    const deploy = ofKind(docsFor(spec), "Deployment");
    assert.equal(deploy.spec?.replicas, 1, `${spec.target}: replicas must stay 1`);
    assert.deepEqual(
      deploy.spec?.strategy,
      { type: "Recreate" },
      `${spec.target}: RollingUpdate would run two SQLite writers`
    );
  }
});

test("the volume is always ReadWriteOnce", () => {
  for (const spec of [defaultSpec("local"), completeVpsSpec()]) {
    const pvc = ofKind(docsFor(spec), "PersistentVolumeClaim");
    assert.deepEqual(pvc.spec?.accessModes, ["ReadWriteOnce"]);
  }
});

test("liveness never targets the deep health endpoint", () => {
  for (const probeType of ["http", "tcp"] as const) {
    const spec = { ...defaultSpec("local"), livenessProbe: probeType };
    const deploy = ofKind(docsFor(spec), "Deployment");
    const container = (
      deploy.spec as { template: { spec: { containers: Record<string, unknown>[] } } }
    ).template.spec.containers[0];
    const liveness = container.livenessProbe as { httpGet?: { path?: string } };
    assert.notEqual(liveness.httpGet?.path, "/api/monitoring/health");
    if (probeType === "http") assert.equal(liveness.httpGet?.path, "/livez");
    else assert.ok((container.livenessProbe as { tcpSocket?: unknown }).tcpSocket);
  }
});

test("nginx ingress disables buffering so SSE streams", () => {
  const ann = ingressAnnotationsFor("nginx");
  assert.equal(ann["nginx.ingress.kubernetes.io/proxy-buffering"], "off");
  assert.equal(ann["nginx.ingress.kubernetes.io/proxy-request-buffering"], "off");
  assert.ok(Number(ann["nginx.ingress.kubernetes.io/proxy-read-timeout"]) >= 600);
});

test("an unknown ingress class gets no invented annotations", () => {
  assert.deepEqual(ingressAnnotationsFor("haproxy"), {});
  assert.deepEqual(ingressAnnotationsFor(undefined), {});
});

// ── Target profiles ───────────────────────────────────────────────────────────

test("the vps profile defaults to requiring API keys and TLS", () => {
  const vps = defaultSpec("vps");
  assert.equal(
    vps.config.requireApiKey,
    true,
    "a cluster others can reach must not serve /v1/* unauthenticated"
  );
  assert.equal(vps.ingress.tlsEnabled, true);
});

test("the local profile targets k3s defaults", () => {
  const local = defaultSpec("local");
  assert.equal(local.ingress.className, "traefik");
  assert.equal(local.storage.className, "local-path");
  assert.equal(deploySpecSchema.safeParse(local).success, true, "local baseline must be valid");
});

test("the vps baseline is incomplete until a host is supplied", () => {
  const parsed = deploySpecSchema.safeParse(defaultSpec("vps"));
  assert.equal(parsed.success, false);
  assert.ok(
    !parsed.success && parsed.error.issues.some((i) => i.path.join(".") === "ingress.host"),
    "the missing field must be reported as ingress.host, not a generic failure"
  );
});

// ── Storage class semantics ───────────────────────────────────────────────────

test("an unset storage class is omitted, not emitted as an empty string", () => {
  // "" disables dynamic provisioning; omitting the key binds the cluster default.
  const pvc = ofKind(docsFor(completeVpsSpec()), "PersistentVolumeClaim");
  assert.ok(
    !("storageClassName" in (pvc.spec ?? {})),
    "an empty storageClassName would stop the claim from ever binding"
  );

  const local = ofKind(docsFor(defaultSpec("local")), "PersistentVolumeClaim");
  assert.equal(local.spec?.storageClassName, "local-path");
});

// ── Rendering ─────────────────────────────────────────────────────────────────

test("rendered YAML parses back into the same objects", () => {
  const spec = completeVpsSpec();
  const parsed = yamlLoadAll(renderManifests(spec)) as Doc[];
  const nonEmpty = parsed.filter((d) => d && typeof d === "object");
  assert.deepEqual(
    nonEmpty.map((d) => d.kind),
    ["Namespace", "ConfigMap", "PersistentVolumeClaim", "Deployment", "Service", "Ingress"]
  );
});

test("no Secret is ever generated", () => {
  // Secrets are created out of band; generating one would put credentials into
  // a preview pane and into whatever the operator pastes it in to.
  for (const spec of [defaultSpec("local"), completeVpsSpec()]) {
    assert.ok(
      !docsFor(spec).some((d) => d.kind === "Secret"),
      "the generator must reference a Secret by name, never emit its contents"
    );
  }
});

// ── Parity with the committed manifests ───────────────────────────────────────

test("generated manifests agree with deploy/kubernetes/base", () => {
  const baseDeploy = yamlLoad(
    fs.readFileSync(path.join(REPO_ROOT, "deploy/kubernetes/base/deployment.yaml"), "utf8")
  ) as Doc;
  const generated = ofKind(docsFor(defaultSpec("local")), "Deployment");

  const basePod = (baseDeploy.spec as { template: { spec: Record<string, unknown> } }).template
    .spec;
  const genPod = (generated.spec as { template: { spec: Record<string, unknown> } }).template.spec;

  assert.equal(baseDeploy.spec?.replicas, generated.spec?.replicas);
  assert.deepEqual(baseDeploy.spec?.strategy, generated.spec?.strategy);
  assert.deepEqual(basePod.securityContext, genPod.securityContext);

  const baseContainer = (basePod.containers as Record<string, unknown>[])[0];
  const genContainer = (genPod.containers as Record<string, unknown>[])[0];
  assert.deepEqual(
    baseContainer.startupProbe,
    genContainer.startupProbe,
    "startup probe drifted from the committed manifest"
  );
  assert.deepEqual(
    baseContainer.readinessProbe,
    genContainer.readinessProbe,
    "readiness probe drifted from the committed manifest"
  );
  assert.deepEqual(
    baseContainer.livenessProbe,
    genContainer.livenessProbe,
    "liveness probe drifted from the committed manifest — both must default to tcpSocket"
  );
  assert.deepEqual(
    baseContainer.ports,
    genContainer.ports,
    "container ports drifted from the committed manifest"
  );
});

test("generated ConfigMap keys match the committed ConfigMap", () => {
  const baseConfig = yamlLoad(
    fs.readFileSync(path.join(REPO_ROOT, "deploy/kubernetes/base/configmap.yaml"), "utf8")
  ) as Doc;
  const generated = ofKind(docsFor(defaultSpec("local")), "ConfigMap");
  assert.deepEqual(
    Object.keys(generated.data ?? {}).sort(),
    Object.keys(baseConfig.data ?? {}).sort(),
    "the dashboard would ship a different env surface than the committed manifests"
  );
});
