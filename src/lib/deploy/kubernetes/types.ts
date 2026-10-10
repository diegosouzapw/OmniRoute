/**
 * Types and validation for Kubernetes deploy specs.
 *
 * A spec is the whole description of one deployment: which cluster, which
 * image, how it is exposed, how much it may consume. Everything that turns a
 * spec into YAML is pure (see manifestGenerator.ts), so the interesting
 * behaviour is unit-testable without a cluster.
 *
 * The single-writer invariants from deploy/kubernetes are enforced here rather
 * than left to the caller: OmniRoute is one Node process writing one SQLite
 * file, and a spec that would run two of them corrupts the database.
 */

import { z } from "zod";

/** Where a deployment goes. Only the defaults differ; the mechanism is identical. */
export type DeployTargetKind = "local" | "vps";

/** Default container port — API and dashboard share it. */
export const DEFAULT_HTTP_PORT = 20128;
/** Dashboard live-view WebSocket. */
export const DEFAULT_LIVE_WS_PORT = 20132;

const dnsName = z
  .string()
  .min(1)
  .max(63)
  .regex(
    /^[a-z0-9]([-a-z0-9]*[a-z0-9])?$/,
    "must be a lowercase RFC 1123 label (letters, digits and dashes)"
  );

const hostname = z
  .string()
  .min(1)
  .max(253)
  .regex(/^[a-z0-9]([-a-z0-9.]*[a-z0-9])?$/, "must be a lowercase DNS hostname");

// Kubernetes quantity suffixes: decimal (m, k, M, G, T, P, E) and binary
// (Ki, Mi, Gi, Ti, Pi, Ei). The decimal thousand is a lowercase `k` — the
// previous pattern rejected it while accepting only `K`.
const quantity = z
  .string()
  .regex(
    /^\d+(\.\d+)?(m|Ki|Mi|Gi|Ti|Pi|Ei|k|K|M|G|T|P|E)?$/,
    "must be a Kubernetes quantity, e.g. 500m, 512k or 2Gi"
  );

export const deploySpecSchema = z
  .object({
    target: z.enum(["local", "vps"]),
    namespace: dnsName,
    releaseName: dnsName,
    image: z.object({
      repository: z.string().min(1).max(255),
      tag: z
        .string()
        .min(1)
        .max(128)
        .regex(/^[\w][\w.-]*$/, "must be a valid image tag"),
      pullPolicy: z.enum(["Always", "IfNotPresent", "Never"]),
    }),
    ingress: z.object({
      enabled: z.boolean(),
      className: z.string().max(63).optional(),
      host: hostname.optional(),
      tlsEnabled: z.boolean(),
      tlsSecretName: dnsName.optional(),
    }),
    storage: z.object({
      className: z.string().max(63).optional(),
      size: quantity,
    }),
    resources: z.object({
      requestsCpu: quantity,
      requestsMemory: quantity,
      limitsCpu: quantity,
      limitsMemory: quantity,
    }),
    config: z.object({
      requireApiKey: z.boolean(),
      logLevel: z.enum(["trace", "debug", "info", "warn", "error", "fatal"]),
      liveWsAllowedOrigins: z.string().max(2048),
      shutdownTimeoutMs: z.number().int().min(1000).max(600_000),
      maxOldSpaceSizeMb: z.number().int().min(512).max(65_536),
    }),
    /** Name of a Secret that already exists in the namespace. Never its contents. */
    secretName: dnsName,
    preStopSleepSeconds: z.number().int().min(0).max(300),
    terminationGracePeriodSeconds: z.number().int().min(30).max(3600),
    livenessProbe: z.enum(["http", "tcp"]),
  })
  .superRefine((spec, ctx) => {
    // The pod must finish draining before the kubelet SIGKILLs it, or in-flight
    // SSE is cut instead of drained.
    const drainBudgetMs = (spec.terminationGracePeriodSeconds - spec.preStopSleepSeconds) * 1000;
    if (spec.config.shutdownTimeoutMs >= drainBudgetMs) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["config", "shutdownTimeoutMs"],
        message:
          `shutdownTimeoutMs (${spec.config.shutdownTimeoutMs}) must be below ` +
          `(terminationGracePeriodSeconds - preStopSleepSeconds) * 1000 = ${drainBudgetMs}, ` +
          "or the kubelet kills the pod mid-drain",
      });
    }

    // An Ingress without a host would route nothing.
    if (spec.ingress.enabled && !spec.ingress.host) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["ingress", "host"],
        message: "an enabled Ingress needs a host",
      });
    }

    if (spec.ingress.tlsEnabled && !spec.ingress.enabled) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["ingress", "tlsEnabled"],
        message: "TLS only applies to an enabled Ingress",
      });
    }

    // V8's heap ceiling must sit below the cgroup limit, or the kernel
    // OOM-kills the pod instead of Node raising a recoverable heap error.
    const limitMib = parseMemoryToMib(spec.resources.limitsMemory);
    if (limitMib !== null && spec.config.maxOldSpaceSizeMb >= limitMib) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["config", "maxOldSpaceSizeMb"],
        message:
          `maxOldSpaceSizeMb (${spec.config.maxOldSpaceSizeMb}) must be below the memory ` +
          `limit (${limitMib} MiB), or the pod is OOMKilled instead of raising a heap error`,
      });
    }
  });

export type DeploySpec = z.infer<typeof deploySpecSchema>;

/**
 * Convert a Kubernetes memory quantity to MiB. Returns null for units this
 * helper does not model, so callers can skip the check rather than guess.
 */
export function parseMemoryToMib(value: string): number | null {
  const match = value.match(/^(\d+(?:\.\d+)?)(Ki|Mi|Gi|Ti|Pi|Ei|k|K|M|G|T|P|E)?$/);
  if (!match) return null;
  const amount = Number(match[1]);
  const factors: Record<string, number> = {
    Ki: 1 / 1024,
    Mi: 1,
    Gi: 1024,
    Ti: 1024 * 1024,
    Pi: 1024 * 1024 * 1024,
    Ei: 1024 * 1024 * 1024 * 1024,
    k: 1000 / (1024 * 1024),
    K: 1000 / (1024 * 1024),
    M: 1_000_000 / (1024 * 1024),
    G: 1_000_000_000 / (1024 * 1024),
    T: 1_000_000_000_000 / (1024 * 1024),
    P: 1_000_000_000_000_000 / (1024 * 1024),
    E: 1_000_000_000_000_000_000 / (1024 * 1024),
  };
  const unit = match[2];
  if (!unit) return amount / (1024 * 1024); // bare bytes
  return amount * factors[unit];
}
