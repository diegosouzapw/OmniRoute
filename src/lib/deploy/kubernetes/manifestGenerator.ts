/**
 * Turns a DeploySpec into Kubernetes manifests.
 *
 * Pure by design: no cluster, no filesystem, no clock. The generated objects
 * mirror deploy/kubernetes/base, so the manifests `omniroute deploy k8s` prints and
 * the ones committed in the repo cannot drift apart silently — a unit test
 * asserts they agree.
 *
 * The single-writer invariants are not options: replicas is always 1, the
 * strategy is always Recreate, and the volume is always ReadWriteOnce. Two
 * OmniRoute pods on one SQLite file corrupt the database.
 */

import { dump as yamlDump } from "js-yaml";

import {
  DEFAULT_HTTP_PORT,
  DEFAULT_LIVE_WS_PORT,
  type DeploySpec,
  type DeployTargetKind,
} from "./types";

/** A rendered Kubernetes object. Kept loose — these are serialized, not traversed. */
export type ManifestObject = Record<string, unknown>;

/** Labels every generated object carries, so `kubectl delete -l` can find them. */
function labelsFor(spec: DeploySpec): Record<string, string> {
  return {
    "app.kubernetes.io/name": spec.releaseName,
    "app.kubernetes.io/part-of": "omniroute",
    "app.kubernetes.io/managed-by": "omniroute-cli",
  };
}

function selectorFor(spec: DeploySpec): Record<string, string> {
  return { "app.kubernetes.io/name": spec.releaseName };
}

export function buildNamespace(spec: DeploySpec): ManifestObject {
  return {
    apiVersion: "v1",
    kind: "Namespace",
    metadata: { name: spec.namespace, labels: labelsFor(spec) },
  };
}

export function buildConfigMap(spec: DeploySpec): ManifestObject {
  return {
    apiVersion: "v1",
    kind: "ConfigMap",
    metadata: {
      name: `${spec.releaseName}-config`,
      namespace: spec.namespace,
      labels: labelsFor(spec),
    },
    data: {
      DATA_DIR: "/app/data",
      PORT: String(DEFAULT_HTTP_PORT),
      DASHBOARD_PORT: String(DEFAULT_HTTP_PORT),
      API_HOST: "0.0.0.0",
      LIVE_WS_PORT: String(DEFAULT_LIVE_WS_PORT),
      LIVE_WS_HOST: "0.0.0.0",
      LIVE_WS_ALLOWED_ORIGINS: spec.config.liveWsAllowedOrigins,
      APP_LOG_LEVEL: spec.config.logLevel,
      REQUIRE_API_KEY: String(spec.config.requireApiKey),
      SHUTDOWN_TIMEOUT_MS: String(spec.config.shutdownTimeoutMs),
      NODE_OPTIONS: `--max-old-space-size=${spec.config.maxOldSpaceSizeMb}`,
    },
  };
}

export function buildPvc(spec: DeploySpec): ManifestObject {
  const pvcSpec: Record<string, unknown> = {
    // ReadWriteOnce is not configurable: a shared-write volume invites a second
    // SQLite writer.
    accessModes: ["ReadWriteOnce"],
    resources: { requests: { storage: spec.storage.size } },
  };
  // An unset storageClassName binds the cluster default; an empty string would
  // instead disable dynamic provisioning entirely.
  if (spec.storage.className) {
    pvcSpec.storageClassName = spec.storage.className;
  }
  return {
    apiVersion: "v1",
    kind: "PersistentVolumeClaim",
    metadata: {
      name: `${spec.releaseName}-data`,
      namespace: spec.namespace,
      labels: labelsFor(spec),
    },
    spec: pvcSpec,
  };
}

function buildLivenessProbe(spec: DeploySpec): ManifestObject {
  // Never /api/monitoring/health: it does real DB work and false-positives
  // under load, restarting the only replica. TCP is the default (see
  // defaultSpec) because a synchronous SQLite checkpoint or VACUUM blocks the
  // event loop for minutes, and HTTP liveness reads that as a dead process.
  if (spec.livenessProbe === "tcp") {
    return { tcpSocket: { port: "http" }, periodSeconds: 20, failureThreshold: 6 };
  }
  return {
    httpGet: { path: "/livez", port: "http" },
    periodSeconds: 10,
    timeoutSeconds: 3,
    failureThreshold: 6,
  };
}

/**
 * The container spec. Extracted so buildDeployment stays readable — the pod
 * template is mostly this one object.
 */
function buildContainer(spec: DeploySpec): ManifestObject {
  return {
    name: "omniroute",
    image: `${spec.image.repository}:${spec.image.tag}`,
    imagePullPolicy: spec.image.pullPolicy,
    ports: [
      { name: "http", containerPort: DEFAULT_HTTP_PORT, protocol: "TCP" },
      { name: "live-ws", containerPort: DEFAULT_LIVE_WS_PORT, protocol: "TCP" },
    ],
    envFrom: [
      { configMapRef: { name: `${spec.releaseName}-config` } },
      { secretRef: { name: spec.secretName } },
    ],
    volumeMounts: [{ name: "data", mountPath: "/app/data" }],
    lifecycle: {
      preStop: {
        // Let the Service drop this endpoint before SIGTERM arrives.
        exec: { command: ["/bin/sh", "-c", `sleep ${spec.preStopSleepSeconds}`] },
      },
    },
    startupProbe: {
      httpGet: { path: "/healthz", port: "http" },
      periodSeconds: 5,
      // The kubelet default is 1s, and /healthz shares the event loop.
      timeoutSeconds: 3,
      // 10 min. Cold start replays the WAL and runs the startup cleanup
      // VACUUM (src/lib/db/cleanup.ts), not just migrations; a kill mid-VACUUM
      // grows the WAL and makes the next boot slower still.
      failureThreshold: 120,
    },
    readinessProbe: {
      httpGet: { path: "/healthz", port: "http" },
      periodSeconds: 5,
      timeoutSeconds: 2,
      failureThreshold: 6,
    },
    livenessProbe: buildLivenessProbe(spec),
    resources: {
      requests: {
        cpu: spec.resources.requestsCpu,
        memory: spec.resources.requestsMemory,
      },
      limits: {
        cpu: spec.resources.limitsCpu,
        memory: spec.resources.limitsMemory,
      },
    },
    securityContext: {
      allowPrivilegeEscalation: false,
      readOnlyRootFilesystem: false,
      capabilities: { drop: ["ALL"] },
    },
  };
}

export function buildDeployment(spec: DeploySpec): ManifestObject {
  return {
    apiVersion: "apps/v1",
    kind: "Deployment",
    metadata: {
      name: spec.releaseName,
      namespace: spec.namespace,
      labels: labelsFor(spec),
    },
    spec: {
      replicas: 1,
      strategy: { type: "Recreate" },
      selector: { matchLabels: selectorFor(spec) },
      template: {
        metadata: { labels: selectorFor(spec) },
        spec: {
          terminationGracePeriodSeconds: spec.terminationGracePeriodSeconds,
          securityContext: {
            runAsNonRoot: true,
            runAsUser: 1000,
            runAsGroup: 1000,
            fsGroup: 1000,
            seccompProfile: { type: "RuntimeDefault" },
          },
          containers: [buildContainer(spec)],
          volumes: [
            {
              name: "data",
              persistentVolumeClaim: { claimName: `${spec.releaseName}-data` },
            },
          ],
        },
      },
    },
  };
}

export function buildService(spec: DeploySpec): ManifestObject {
  return {
    apiVersion: "v1",
    kind: "Service",
    metadata: {
      name: spec.releaseName,
      namespace: spec.namespace,
      labels: labelsFor(spec),
    },
    spec: {
      type: "ClusterIP",
      selector: selectorFor(spec),
      ports: [
        { name: "http", port: DEFAULT_HTTP_PORT, targetPort: "http", protocol: "TCP" },
        {
          name: "live-ws",
          port: DEFAULT_LIVE_WS_PORT,
          targetPort: "live-ws",
          protocol: "TCP",
        },
      ],
    },
  };
}

/**
 * Controller-specific annotations. The one that matters everywhere is
 * disabling response buffering: with buffering on, an SSE stream is withheld
 * until the provider turn ends, which reads to the user as a hung request.
 */
export function ingressAnnotationsFor(className: string | undefined): Record<string, string> {
  if (className === "nginx") {
    return {
      "nginx.ingress.kubernetes.io/proxy-buffering": "off",
      "nginx.ingress.kubernetes.io/proxy-request-buffering": "off",
      "nginx.ingress.kubernetes.io/proxy-read-timeout": "3600",
      "nginx.ingress.kubernetes.io/proxy-send-timeout": "3600",
      // Matches OMNIROUTE_CHAT_HARD_MAX_BODY_BYTES (50 MB). Below that, nginx
      // rejects bodies the app would accept and its compact-required 413 never runs.
      "nginx.ingress.kubernetes.io/proxy-body-size": "50m",
    };
  }
  if (className === "traefik") {
    // Traefik streams without buffering; its idle timeout is an entrypoint
    // setting, not an Ingress annotation (see the deployment guide).
    return { "traefik.ingress.kubernetes.io/router.entrypoints": "web" };
  }
  return {};
}

export function buildIngress(spec: DeploySpec): ManifestObject | null {
  if (!spec.ingress.enabled || !spec.ingress.host) return null;

  const ingressSpec: Record<string, unknown> = {
    rules: [
      {
        host: spec.ingress.host,
        http: {
          paths: [
            {
              path: "/",
              pathType: "Prefix",
              backend: {
                service: { name: spec.releaseName, port: { name: "http" } },
              },
            },
          ],
        },
      },
    ],
  };
  if (spec.ingress.className) {
    ingressSpec.ingressClassName = spec.ingress.className;
  }
  if (spec.ingress.tlsEnabled) {
    ingressSpec.tls = [
      {
        hosts: [spec.ingress.host],
        secretName: spec.ingress.tlsSecretName ?? `${spec.releaseName}-tls`,
      },
    ];
  }

  return {
    apiVersion: "networking.k8s.io/v1",
    kind: "Ingress",
    metadata: {
      name: spec.releaseName,
      namespace: spec.namespace,
      labels: labelsFor(spec),
      annotations: ingressAnnotationsFor(spec.ingress.className),
    },
    spec: ingressSpec,
  };
}

/** Every object for a spec, in apply order. */
export function buildManifests(spec: DeploySpec): ManifestObject[] {
  const objects: (ManifestObject | null)[] = [
    buildNamespace(spec),
    buildConfigMap(spec),
    buildPvc(spec),
    buildDeployment(spec),
    buildService(spec),
    buildIngress(spec),
  ];
  return objects.filter((o): o is ManifestObject => o !== null);
}

/** Multi-document YAML, ready for `kubectl apply -f -`. */
export function renderManifests(spec: DeploySpec): string {
  const header = [
    "# Generated by `omniroute deploy k8s` — regenerate rather than editing in place.",
    `# Target: ${spec.target} · namespace: ${spec.namespace} · release: ${spec.releaseName}`,
    "#",
    "# Single replica with the Recreate strategy is deliberate: OmniRoute is one",
    "# Node process writing one SQLite file. Raising replicas corrupts the database.",
    "",
  ].join("\n");

  const docs = buildManifests(spec).map((obj) =>
    yamlDump(obj, { noRefs: true, lineWidth: 100, sortKeys: false })
  );
  return `${header}${docs.join("---\n")}`;
}

/**
 * Baseline spec per target. `local` assumes k3s on the same machine; `vps`
 * assumes a real hostname in front of a cluster someone else can reach, so it
 * defaults to TLS on and API keys required.
 */
export function defaultSpec(target: DeployTargetKind): DeploySpec {
  const shared = {
    target,
    namespace: "omniroute",
    releaseName: "omniroute",
    image: {
      repository: "diegosouzapw/omniroute",
      tag: "latest",
      pullPolicy: "IfNotPresent" as const,
    },
    secretName: "omniroute-secrets",
    preStopSleepSeconds: 15,
    // A ceiling, not a delay: the post-drain WAL checkpoint in
    // closeDbInstance() has no timeout of its own, and a SIGKILL mid-checkpoint
    // carries the fat WAL into the next boot. A healthy pod still exits in ~45s.
    terminationGracePeriodSeconds: 300,
    livenessProbe: "tcp" as const,
  };

  if (target === "local") {
    return {
      ...shared,
      ingress: {
        enabled: true,
        className: "traefik",
        host: "omniroute.local",
        tlsEnabled: false,
        tlsSecretName: undefined,
      },
      // k3s ships local-path as its default StorageClass.
      storage: { className: "local-path", size: "10Gi" },
      resources: {
        requestsCpu: "100m",
        requestsMemory: "384Mi",
        limitsCpu: "2",
        limitsMemory: "2Gi",
      },
      config: {
        requireApiKey: false,
        logLevel: "info",
        liveWsAllowedOrigins: "http://omniroute.local",
        shutdownTimeoutMs: 30_000,
        maxOldSpaceSizeMb: 1536,
      },
    };
  }

  return {
    ...shared,
    ingress: {
      enabled: true,
      className: "nginx",
      host: undefined,
      tlsEnabled: true,
      tlsSecretName: undefined,
    },
    // Unset: bind whatever the cluster's default StorageClass is.
    storage: { className: undefined, size: "20Gi" },
    resources: {
      requestsCpu: "250m",
      requestsMemory: "512Mi",
      limitsCpu: "2",
      limitsMemory: "4Gi",
    },
    config: {
      // A cluster someone else can reach must not serve /v1/* unauthenticated.
      requireApiKey: true,
      logLevel: "info",
      liveWsAllowedOrigins: "",
      shutdownTimeoutMs: 30_000,
      maxOldSpaceSizeMb: 3072,
    },
  };
}
