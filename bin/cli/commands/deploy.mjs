/**
 * `omniroute deploy` — Kubernetes manifests and cluster provisioning commands.
 *
 * Both subcommands only WRITE TO STDOUT. Nothing here touches a cluster, runs
 * kubectl, or connects to a server: provisioning a cluster is a privileged
 * host-level operation, and doing it from a long-running proxy would mean
 * shipping an SSH client and holding a private key. You pipe the output where
 * you want it:
 *
 *   omniroute deploy k8s --target local | kubectl apply -f -
 *   omniroute deploy k8s provision --target vps --server 203.0.113.10
 *
 * The generation logic lives in src/lib/deploy/kubernetes/ (TypeScript, unit
 * tested); this file is the argument surface. Dynamic .ts imports work because
 * bin/omniroute.mjs registers tsx before dispatching.
 */

const VALID_TARGETS = new Set(["local", "vps"]);
const VALID_LIVENESS = new Set(["http", "tcp"]);
const VALID_PULL_POLICIES = new Set(["Always", "IfNotPresent", "Never"]);

function fail(message) {
  process.stderr.write(`error: ${message}\n`);
  process.exit(2);
}

function parseTarget(value) {
  if (!VALID_TARGETS.has(value)) {
    fail(`--target must be "local" or "vps" (got ${JSON.stringify(value)})`);
  }
  return value;
}

/** Apply CLI flags on top of the baseline spec for the chosen target. */
function applyOverrides(spec, opts) {
  const next = {
    ...spec,
    image: { ...spec.image },
    ingress: { ...spec.ingress },
    storage: { ...spec.storage },
    resources: { ...spec.resources },
    config: { ...spec.config },
  };

  if (opts.namespace) next.namespace = opts.namespace;
  if (opts.release) next.releaseName = opts.release;
  if (opts.image) next.image.repository = opts.image;
  if (opts.tag) next.image.tag = opts.tag;
  if (opts.pullPolicy) {
    if (!VALID_PULL_POLICIES.has(opts.pullPolicy)) {
      fail(`--pull-policy must be one of ${[...VALID_PULL_POLICIES].join(", ")}`);
    }
    next.image.pullPolicy = opts.pullPolicy;
  }

  if (opts.host) next.ingress.host = opts.host;
  if (opts.ingressClass !== undefined) {
    next.ingress.className = opts.ingressClass || undefined;
  }
  // commander maps --no-ingress to ingress:false and --no-tls to tls:false.
  if (opts.ingress === false) {
    next.ingress.enabled = false;
    // TLS is terminated AT the Ingress, so it cannot outlive it. Without this,
    // `--no-ingress` on the vps profile (which defaults TLS on) would render an
    // invalid spec and fail with a confusing message about a flag not passed.
    next.ingress.tlsEnabled = false;
  }
  if (opts.tls === false) next.ingress.tlsEnabled = false;
  if (opts.tls === true && next.ingress.enabled) next.ingress.tlsEnabled = true;
  if (opts.tlsSecret) next.ingress.tlsSecretName = opts.tlsSecret;

  if (opts.storageClass !== undefined) {
    next.storage.className = opts.storageClass || undefined;
  }
  if (opts.storageSize) next.storage.size = opts.storageSize;
  if (opts.secretName) next.secretName = opts.secretName;

  if (opts.requestsCpu) next.resources.requestsCpu = opts.requestsCpu;
  if (opts.requestsMemory) next.resources.requestsMemory = opts.requestsMemory;
  if (opts.limitsCpu) next.resources.limitsCpu = opts.limitsCpu;
  if (opts.limitsMemory) next.resources.limitsMemory = opts.limitsMemory;
  if (opts.maxOldSpace) {
    const parsed = Number.parseInt(opts.maxOldSpace, 10);
    if (!Number.isFinite(parsed)) fail("--max-old-space must be a number of MiB");
    next.config.maxOldSpaceSizeMb = parsed;
  }

  if (opts.requireApiKey === true) next.config.requireApiKey = true;
  if (opts.requireApiKey === false) next.config.requireApiKey = false;
  if (opts.logLevel) next.config.logLevel = opts.logLevel;
  if (opts.wsOrigins !== undefined) next.config.liveWsAllowedOrigins = opts.wsOrigins;

  if (opts.liveness) {
    if (!VALID_LIVENESS.has(opts.liveness)) fail('--liveness must be "http" or "tcp"');
    next.livenessProbe = opts.liveness;
  }

  // A hostname with no explicit origins would otherwise leave the dashboard's
  // live WebSocket rejecting the very host it is served from.
  if (next.ingress.enabled && next.ingress.host && !next.config.liveWsAllowedOrigins) {
    const scheme = next.ingress.tlsEnabled ? "https" : "http";
    next.config.liveWsAllowedOrigins = `${scheme}://${next.ingress.host}`;
  }

  return next;
}

export async function runManifestsCommand(opts) {
  const target = parseTarget(opts.target ?? "local");
  const { defaultSpec, renderManifests } =
    await import("../../../src/lib/deploy/kubernetes/manifestGenerator.ts");
  const { deploySpecSchema } = await import("../../../src/lib/deploy/kubernetes/types.ts");

  const spec = applyOverrides(defaultSpec(target), opts);
  const parsed = deploySpecSchema.safeParse(spec);

  if (!parsed.success) {
    process.stderr.write("error: the deploy spec is incomplete or invalid:\n");
    for (const issue of parsed.error.issues) {
      process.stderr.write(`  ${issue.path.join(".") || "spec"}: ${issue.message}\n`);
    }
    if (parsed.error.issues.some((i) => i.path.join(".") === "ingress.host")) {
      process.stderr.write("\nhint: pass --host <hostname>, or --no-ingress to skip it.\n");
    }
    process.exit(2);
  }

  if (opts.json) {
    process.stdout.write(`${JSON.stringify(parsed.data, null, 2)}\n`);
    return 0;
  }

  process.stdout.write(renderManifests(parsed.data));
  return 0;
}

export async function runProvisionCommand(opts) {
  const target = parseTarget(opts.target ?? "local");
  const {
    buildProvisionPlan,
    isSafeServerAddress,
    isSafeVersion,
    isSafeContextName,
    isSafeSshUser,
  } = await import("../../../src/lib/deploy/kubernetes/provisionPlan.ts");

  // These values are rendered into commands a human then runs. A shell
  // metacharacter would make the printed command mean something other than
  // what it looks like, so reject rather than escape.
  if (opts.server && !isSafeServerAddress(opts.server)) {
    fail("--server must be a plain hostname or IP address");
  }
  if (opts.k3sVersion && !isSafeVersion(opts.k3sVersion)) {
    fail("--k3s-version must look like v1.31.2+k3s1");
  }
  if (opts.sshUser && !isSafeSshUser(opts.sshUser)) {
    fail("--ssh-user must be a plain username");
  }
  if (opts.context && !isSafeContextName(opts.context)) {
    fail("--context must be a plain kubeconfig context name");
  }

  const plan = buildProvisionPlan({
    target,
    serverAddress: opts.server,
    k3sVersion: opts.k3sVersion,
    sshUser: opts.sshUser,
    contextName: opts.context,
  });

  if (opts.json) {
    process.stdout.write(`${JSON.stringify(plan, null, 2)}\n`);
    return 0;
  }

  const out = [];
  out.push(`# Provision a k3s cluster — target: ${plan.target}`, "");
  for (const warning of plan.warnings) out.push(`# ! ${warning}`);
  out.push("");

  plan.steps.forEach((step, index) => {
    const where = step.location === "server" ? "on the server" : "on your machine";
    const tags = [where];
    if (step.privileged) tags.push("needs root");
    if (step.optional) tags.push("optional");
    out.push(`# ${index + 1}. ${step.title}  [${tags.join(", ")}]`);
    out.push(`#    ${step.rationale}`);
    out.push(step.command, "");
  });

  process.stdout.write(`${out.join("\n")}\n`);
  return 0;
}

export function registerDeploy(program) {
  const deploy = program.command("deploy").description("Generate deployment artifacts");

  const k8s = deploy
    .command("k8s")
    .alias("kubernetes")
    .description("Print Kubernetes manifests for this instance on stdout")
    .option("--target <target>", "local or vps", "local")
    .option("--namespace <name>", "Kubernetes namespace")
    .option("--release <name>", "release name used for every object")
    .option("--image <repository>", "container image repository")
    .option("--tag <tag>", "container image tag")
    .option("--pull-policy <policy>", "Always, IfNotPresent or Never")
    .option("--host <hostname>", "Ingress hostname")
    .option("--ingress-class <name>", "Ingress class (traefik, nginx, …)")
    .option("--no-ingress", "do not generate an Ingress")
    .option("--tls", "terminate TLS at the Ingress")
    .option("--no-tls", "do not terminate TLS at the Ingress")
    .option("--tls-secret <name>", "existing TLS Secret name")
    .option("--storage-class <name>", "StorageClass (empty for the cluster default)")
    .option("--storage-size <size>", "volume size, e.g. 20Gi")
    .option("--secret-name <name>", "existing Secret holding JWT_SECRET and friends")
    .option("--requests-cpu <cpu>", "CPU request")
    .option("--requests-memory <memory>", "memory request")
    .option("--limits-cpu <cpu>", "CPU limit")
    .option("--limits-memory <memory>", "memory limit")
    .option("--max-old-space <mib>", "V8 heap ceiling in MiB (must be below the memory limit)")
    .option("--require-api-key", "require an API key on /v1/*")
    .option("--no-require-api-key", "do not require an API key on /v1/*")
    .option("--log-level <level>", "trace, debug, info, warn, error or fatal")
    .option("--ws-origins <origins>", "comma-separated allowed WebSocket origins")
    .option("--liveness <kind>", "liveness probe: tcp (default) or http")
    .option("--json", "print the resolved spec as JSON instead of YAML")
    .action(async (opts) => {
      const code = await runManifestsCommand(opts);
      if (code !== 0) process.exit(code);
    });

  k8s
    .command("provision")
    .description("Print the commands for standing up a k3s cluster (never runs them)")
    // No --target here on purpose: the parent `k8s` command already declares it,
    // and commander binds the flag to the parent, leaving a duplicate on the
    // subcommand permanently stuck at its own default. optsWithGlobals() reads
    // the inherited value instead, and accepts the flag on either side of
    // `provision`.
    .option("--server <address>", "public address of the VPS (with --target vps)")
    .option("--k3s-version <version>", "pin a k3s version, e.g. v1.31.2+k3s1")
    .option("--ssh-user <user>", "SSH user rendered into the commands", "root")
    .option("--context <name>", "kubeconfig context name for the cluster")
    .option("--json", "print the plan as JSON")
    .action(async (opts, cmd) => {
      const code = await runProvisionCommand({ ...cmd.optsWithGlobals(), ...opts });
      if (code !== 0) process.exit(code);
    });
}
