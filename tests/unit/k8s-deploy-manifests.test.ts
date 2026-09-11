/**
 * Guards for the Kubernetes deployment manifests (deploy/kubernetes, deploy/helm).
 *
 * The invariants here are the ones that corrupt data or break streaming when
 * they regress, not stylistic preferences:
 *
 *   - replicas stay 1 and the strategy stays Recreate. OmniRoute is one Node
 *     process writing one SQLite file; two pods on one volume corrupt it.
 *   - the PVC stays ReadWriteOnce, for the same reason.
 *   - liveness never points at /api/monitoring/health, which does real DB work
 *     and false-positives under load (docs/ops/MONITORING_GUIDE.md), and stays
 *     on tcpSocket: better-sqlite3 is synchronous, so a checkpoint or VACUUM
 *     stalls every HTTP handler and an HTTP probe would restart the pod
 *     mid-write.
 *   - the termination grace period leaves room for the WAL checkpoint that
 *     runs after the request drain, which has no timeout of its own.
 *   - the nginx Ingress keeps response buffering off, or SSE is withheld until
 *     the provider turn ends and streaming silently stops working.
 *   - no real secret value is ever committed.
 */

import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { parseAllDocuments } from "yaml";

const REPO_ROOT = path.resolve(import.meta.dirname, "../..");
const K8S_DIR = path.join(REPO_ROOT, "deploy/kubernetes");
const HELM_DIR = path.join(REPO_ROOT, "deploy/helm/omniroute");

/** Minimal shapes for the fields these tests actually assert on. */
interface Probe {
  httpGet?: { path?: string; port?: string };
  tcpSocket?: { port?: string };
  periodSeconds?: number;
  failureThreshold?: number;
}

interface Container {
  ports?: { containerPort?: number; name?: string }[];
  lifecycle?: { preStop?: { exec?: { command?: string[] } } };
  livenessProbe?: Probe;
  readinessProbe?: Probe;
  startupProbe?: Probe;
}

interface K8sDoc {
  kind?: string;
  metadata?: { name?: string; annotations?: Record<string, string> };
  spec?: {
    replicas?: number;
    strategy?: { type?: string };
    accessModes?: string[];
    storageClassName?: string;
    ingressClassName?: string;
    template?: {
      spec?: { containers?: Container[]; terminationGracePeriodSeconds?: number };
    };
  };
  data?: Record<string, string>;
  stringData?: Record<string, string>;
}

interface ChartValues {
  replicaCount?: number;
  terminationGracePeriodSeconds?: number;
  probes?: { livenessType?: string; startupFailureThreshold?: number };
  service?: { port?: number };
  persistence?: { accessMode?: string };
  secrets?: Record<string, string | boolean>;
}

function loadYaml<T>(relPath: string): T[] {
  const raw = fs.readFileSync(path.join(REPO_ROOT, relPath), "utf8");
  return parseAllDocuments(raw)
    .map((d) => d.toJS() as T)
    .filter((d): d is T => d !== null && d !== undefined);
}

function firstOfKind(docs: K8sDoc[], kind: string): K8sDoc {
  const found = docs.find((d) => d?.kind === kind);
  assert.ok(found, `expected a ${kind} document`);
  return found;
}

/** Narrows an optional field, failing the test instead of throwing on undefined. */
function required<T>(value: T | undefined, what: string): T {
  assert.ok(value !== undefined && value !== null, `missing ${what}`);
  return value;
}

function containerOf(deploy: K8sDoc): Container {
  return required(deploy.spec?.template?.spec?.containers?.[0], "container");
}

// ── Single-writer invariants (base manifests) ─────────────────────────────────

test("base Deployment pins a single replica with the Recreate strategy", () => {
  const deploy = firstOfKind(
    loadYaml<K8sDoc>("deploy/kubernetes/base/deployment.yaml"),
    "Deployment"
  );
  assert.equal(deploy.spec?.replicas, 1, "replicas > 1 puts two writers on one SQLite file");
  assert.equal(
    deploy.spec?.strategy?.type,
    "Recreate",
    "RollingUpdate briefly runs two pods against the same volume"
  );
});

test("base PVC is ReadWriteOnce", () => {
  const pvc = firstOfKind(
    loadYaml<K8sDoc>("deploy/kubernetes/base/pvc.yaml"),
    "PersistentVolumeClaim"
  );
  assert.deepEqual(pvc.spec?.accessModes, ["ReadWriteOnce"]);
});

// ── Probe invariants ──────────────────────────────────────────────────────────

test("no probe targets /api/monitoring/health", () => {
  const deploy = firstOfKind(
    loadYaml<K8sDoc>("deploy/kubernetes/base/deployment.yaml"),
    "Deployment"
  );
  const container = containerOf(deploy);
  for (const probe of ["livenessProbe", "readinessProbe", "startupProbe"]) {
    const target = container[probe]?.httpGet?.path;
    assert.notEqual(
      target,
      "/api/monitoring/health",
      `${probe} must not use the deep health endpoint — it does real DB work`
    );
  }
  assert.equal(container.readinessProbe.httpGet.path, "/healthz");
  assert.equal(container.startupProbe.httpGet.path, "/healthz");
});

test("liveness is tcpSocket, because a synchronous checkpoint stalls HTTP", () => {
  const deploy = firstOfKind(
    loadYaml<K8sDoc>("deploy/kubernetes/base/deployment.yaml"),
    "Deployment"
  );
  const liveness = required(containerOf(deploy).livenessProbe, "liveness probe");

  // better-sqlite3 blocks the event loop, so /livez stops answering during a
  // large checkpoint or VACUUM while the process is perfectly healthy. An HTTP
  // probe restarts the pod mid-write, which grows the WAL and makes the next
  // boot slower still. Readiness (HTTP) is what removes a stalled pod from the
  // Service; liveness only exists to restart an unrecoverable process.
  assert.ok(liveness.tcpSocket, "liveness must be tcpSocket, not httpGet");
  assert.equal(liveness.httpGet, undefined);

  // The opt-in patch back to HTTP must stay available and must clear tcpSocket,
  // or a strategic-merge patch would leave a container with two probe handlers.
  const patch = firstOfKind(
    loadYaml<K8sDoc>("deploy/kubernetes/overlays/k8s/liveness-http.yaml"),
    "Deployment"
  );
  const patched = required(containerOf(patch).livenessProbe, "patched liveness probe");
  assert.equal(patched.httpGet?.path, "/livez");
  assert.equal(patched.tcpSocket, null, "the patch must null out tcpSocket");
});

test("the startup budget covers the cold-start VACUUM, not just migrations", () => {
  const deploy = firstOfKind(
    loadYaml<K8sDoc>("deploy/kubernetes/base/deployment.yaml"),
    "Deployment"
  );
  const startup = required(containerOf(deploy).startupProbe, "startup probe");
  const budgetSeconds = (startup.periodSeconds ?? 0) * (startup.failureThreshold ?? 0);

  // Cold start replays the WAL and runs the startup cleanup VACUUM, which is
  // minutes on a large database on network storage. Killing the pod mid-VACUUM
  // is what creates the oversized WAL that makes the next boot slower, so a
  // tight budget here is self-amplifying. Readiness holds traffic back for
  // exactly as long as this takes, so the budget is free.
  assert.ok(
    budgetSeconds >= 600,
    `startup budget is ${budgetSeconds}s; a cold-start VACUUM on a large ` +
      "database takes minutes, and a kill mid-VACUUM makes the next boot slower"
  );

  const cleanup = fs.readFileSync(path.join(REPO_ROOT, "src/lib/db/cleanup.ts"), "utf8");
  assert.match(
    cleanup,
    /startCleanupScheduler[\s\S]*?db\.exec\("VACUUM"\)/,
    "startup cleanup no longer VACUUMs — re-derive the startup budget"
  );
});

test("the drain budget fits inside the termination grace period", () => {
  const deploy = firstOfKind(
    loadYaml<K8sDoc>("deploy/kubernetes/base/deployment.yaml"),
    "Deployment"
  );
  const podSpec = required(deploy.spec?.template?.spec, "pod spec");
  const preStop = required(
    containerOf(deploy).lifecycle?.preStop?.exec?.command,
    "preStop command"
  );
  const sleepSeconds = Number(preStop.join(" ").match(/sleep (\d+)/)?.[1]);
  assert.ok(Number.isFinite(sleepSeconds), "preStop must sleep so endpoints drain first");

  const config = firstOfKind(
    loadYaml<K8sDoc>("deploy/kubernetes/base/configmap.yaml"),
    "ConfigMap"
  );
  const shutdownSeconds =
    Number(required(config.data, "configmap data").SHUTDOWN_TIMEOUT_MS) / 1000;

  const graceSeconds = required(
    podSpec.terminationGracePeriodSeconds,
    "terminationGracePeriodSeconds"
  );
  assert.ok(
    sleepSeconds + shutdownSeconds < graceSeconds,
    `preStop (${sleepSeconds}s) + shutdown (${shutdownSeconds}s) must fit inside ` +
      `terminationGracePeriodSeconds (${graceSeconds}s), ` +
      "or the kubelet SIGKILLs the pod mid-drain"
  );

  // The drain is only the first half of shutdown. gracefulShutdown.ts awaits
  // waitForDrain() — the part SHUTDOWN_TIMEOUT_MS bounds — and only then runs
  // cleanup(), whose closeDbInstance() checkpoints the WAL with no timeout of
  // its own. On a large WAL on network storage that is minutes, and a SIGKILL
  // mid-checkpoint carries the fat WAL into the next boot. So the grace period
  // must leave real headroom past the drain, not just fit it.
  const checkpointHeadroom = graceSeconds - sleepSeconds - shutdownSeconds;
  assert.ok(
    checkpointHeadroom >= 180,
    `only ${checkpointHeadroom}s left after the drain for the WAL checkpoint; ` +
      "a large checkpoint on network storage takes minutes and has no timeout"
  );

  const shutdownSrc = fs.readFileSync(path.join(REPO_ROOT, "src/lib/gracefulShutdown.ts"), "utf8");
  const drainAt = shutdownSrc.indexOf("await waitForDrain()");
  const cleanupAt = shutdownSrc.indexOf("await cleanup()");
  assert.ok(drainAt >= 0 && cleanupAt > drainAt, "cleanup() must still run after the drain");
  assert.match(
    shutdownSrc,
    /closeDbInstance\(\)/,
    "shutdown no longer closes the DB — re-derive the checkpoint headroom above"
  );
});

// ── Ingress / SSE invariants ──────────────────────────────────────────────────

test("the nginx Ingress disables response buffering so SSE streams", () => {
  const ing = firstOfKind(
    loadYaml<K8sDoc>("deploy/kubernetes/overlays/k8s/ingress.yaml"),
    "Ingress"
  );
  const ann = required(ing.metadata?.annotations, "ingress annotations");
  assert.equal(ann["nginx.ingress.kubernetes.io/proxy-buffering"], "off");
  assert.equal(ann["nginx.ingress.kubernetes.io/proxy-request-buffering"], "off");
  assert.ok(
    Number(ann["nginx.ingress.kubernetes.io/proxy-read-timeout"]) >= 600,
    "a short read timeout cuts long provider turns mid-stream"
  );
});

test("the ingress body limit is not below the application's own cap", () => {
  // Reported from a production deployment on #12400: a smaller limit here makes
  // nginx return 413 for bodies the app would have accepted, and the app's own
  // 413 handling (which tells the client to compact) never gets to run. Read the
  // real default rather than restating it, so raising one side fails this test.
  const admission = fs.readFileSync(
    path.join(REPO_ROOT, "src/shared/middleware/chatBodyAdmission.ts"),
    "utf8"
  );
  const appCap = admission.match(
    /CHAT_HARD_MAX_BODY_BYTES = parsePositiveInt\(\s*process\.env\.OMNIROUTE_CHAT_HARD_MAX_BODY_BYTES,\s*(\d+)\s*\*\s*1024\s*\*\s*1024/
  );
  assert.ok(appCap, "could not read the app's hard body cap — update this test with it");
  const appCapMb = Number(appCap[1]);

  const ing = firstOfKind(
    loadYaml<K8sDoc>("deploy/kubernetes/overlays/k8s/ingress.yaml"),
    "Ingress"
  );
  const annotation = required(ing.metadata?.annotations, "ingress annotations")[
    "nginx.ingress.kubernetes.io/proxy-body-size"
  ];
  const ingressMb = Number(annotation.replace(/m$/i, ""));

  assert.ok(
    ingressMb >= appCapMb,
    `proxy-body-size (${ingressMb}m) must not be below the app cap (${appCapMb}m)`
  );
});

test("the k3s overlay targets Traefik and k3s local-path storage", () => {
  const ing = firstOfKind(
    loadYaml<K8sDoc>("deploy/kubernetes/overlays/k3s/ingress.yaml"),
    "Ingress"
  );
  assert.equal(ing.spec?.ingressClassName, "traefik");
  const pvc = firstOfKind(
    loadYaml<K8sDoc>("deploy/kubernetes/overlays/k3s/pvc-storageclass.yaml"),
    "PersistentVolumeClaim"
  );
  assert.equal(pvc.spec?.storageClassName, "local-path");
});

// ── Secret hygiene ────────────────────────────────────────────────────────────

test("the committed Secret template carries only placeholders", () => {
  const secret = firstOfKind(
    loadYaml<K8sDoc>("deploy/kubernetes/base/secret.example.yaml"),
    "Secret"
  );
  for (const [key, value] of Object.entries(required(secret.stringData, "secret stringData"))) {
    assert.equal(value, "REPLACE_ME", `${key} must stay a placeholder in git`);
  }
});

test("the Secret template is excluded from the base kustomization", () => {
  const kustomization = fs.readFileSync(path.join(K8S_DIR, "base/kustomization.yaml"), "utf8");
  assert.ok(
    !/^\s*-\s*secret\.example\.yaml\s*$/m.test(kustomization),
    "applying the placeholder Secret would start OmniRoute with fake auth secrets"
  );
});

test("chart values ship no baked-in secret material", () => {
  const values = loadYaml<ChartValues>("deploy/helm/omniroute/values.yaml")[0];
  assert.equal(values.secrets?.create, false, "default must not create a Secret from values");
  for (const key of ["jwtSecret", "apiKeySecret", "storageEncryptionKey", "initialPassword"]) {
    assert.equal(values.secrets?.[key], "", `secrets.${key} must ship empty`);
  }
});

// ── Chart consistency ─────────────────────────────────────────────────────────

test("chart defaults mirror the base manifests", () => {
  const values = loadYaml<ChartValues>("deploy/helm/omniroute/values.yaml")[0];
  assert.equal(values.replicaCount, 1);
  assert.equal(values.persistence?.accessMode, "ReadWriteOnce");

  const deploy = firstOfKind(
    loadYaml<K8sDoc>("deploy/kubernetes/base/deployment.yaml"),
    "Deployment"
  );
  const podSpec = required(deploy.spec?.template?.spec, "pod spec");
  assert.equal(values.terminationGracePeriodSeconds, podSpec.terminationGracePeriodSeconds);
  assert.equal(values.service?.port, containerOf(deploy).ports?.[0]?.containerPort);

  // The chart must default to the same probe posture as the base manifests, or
  // Helm users silently get the HTTP liveness the Kustomize path rejects.
  assert.equal(values.probes?.livenessType, "tcp");
  assert.equal(
    values.probes?.startupFailureThreshold,
    containerOf(deploy).startupProbe?.failureThreshold
  );
});

test("the chart refuses to render more than one replica", () => {
  const helpers = fs.readFileSync(path.join(HELM_DIR, "templates/_helpers.tpl"), "utf8");
  assert.match(helpers, /define "omniroute\.validate"/);
  assert.match(helpers, /replicaCount must be 1/);

  // Helm discards top-level code in a _*.tpl file, so the guard only runs if a
  // rendered template includes it. Without this the guard is a silent no-op.
  const deployTpl = fs.readFileSync(path.join(HELM_DIR, "templates/deployment.yaml"), "utf8");
  assert.match(deployTpl, /include "omniroute\.validate"/);
});

test("the chart keeps the SQLite volume on uninstall", () => {
  const pvcTpl = fs.readFileSync(path.join(HELM_DIR, "templates/pvc.yaml"), "utf8");
  assert.match(pvcTpl, /helm\.sh\/resource-policy: keep/);
});
