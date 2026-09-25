/**
 * Builds the command plan for standing up a k3s cluster.
 *
 * OmniRoute deliberately does NOT run these itself. Provisioning a cluster is a
 * privileged, host-level operation, and doing it from a long-running proxy would mean
 * shipping an SSH client, storing a private key, and executing privileged
 * commands on a remote box — a large security surface for a one-off task. So
 * this module produces the exact commands and the operator runs them, matching
 * how contrib/vps documents a VPS install.
 *
 * Pure: no execution, no filesystem, no network. Every step is a string the UI
 * renders for copy-paste.
 */

import type { DeployTargetKind } from "./types";

/** Where a step runs. `workstation` is the machine holding your kubeconfig. */
export type StepLocation = "workstation" | "server";

export interface ProvisionStep {
  id: string;
  title: string;
  /** Why this step exists — shown above the command. */
  rationale: string;
  command: string;
  location: StepLocation;
  /** True when the step needs root (sudo) on its host. */
  privileged: boolean;
  optional?: boolean;
}

export interface ProvisionPlan {
  target: DeployTargetKind;
  steps: ProvisionStep[];
  /** Caveats worth reading before running anything. */
  warnings: string[];
}

export interface ProvisionPlanInput {
  target: DeployTargetKind;
  /**
   * Public address of the VPS — an IP or hostname. Required for `vps`: it goes
   * into the API server certificate, and the kubeconfig on your workstation
   * must point at it.
   */
  serverAddress?: string;
  /** Pin a k3s version instead of tracking the stable channel. */
  k3sVersion?: string;
  /** SSH user for the copy/login commands. Cosmetic — only used to render them. */
  sshUser?: string;
  /** Context name to write into the local kubeconfig for a VPS cluster. */
  contextName?: string;
}

/**
 * Address values are interpolated into commands the operator reads before
 * running, so a shell metacharacter would make the rendered command mean
 * something other than it looks like.
 *
 * Restricted to a hostname or an IPv4 literal — deliberately no port and no
 * IPv6. The plan renders `https://<address>:6443`, so an address that already
 * carried a port would produce `host:123:6443`, and a bare IPv6 literal would
 * need brackets the rendering does not add. Rejecting them beats emitting a
 * command that looks correct and is not.
 */
export function isSafeServerAddress(value: string): boolean {
  if (value.length > 253) return false;
  if (/^(\d{1,3}\.){3}\d{1,3}$/.test(value)) {
    return value.split(".").every((octet) => Number(octet) <= 255);
  }
  if (
    !/^[A-Za-z0-9]([A-Za-z0-9-]*[A-Za-z0-9])?(\.[A-Za-z0-9]([A-Za-z0-9-]*[A-Za-z0-9])?)*$/.test(
      value
    )
  ) {
    return false;
  }
  // An all-numeric final label means this was meant to be an IP address and is
  // malformed (1.2.3.4.5), not a hostname — a real TLD is never all digits.
  const lastLabel = value.split(".").pop() ?? "";
  return !/^\d+$/.test(lastLabel);
}

export function isSafeVersion(value: string): boolean {
  return /^v?\d+\.\d+\.\d+(\+k3s\d+)?$/.test(value);
}

/**
 * kubeconfig context names. Managed clusters produce colons and slashes — an
 * EKS context is `arn:aws:eks:<region>:<account>:cluster/<name>` — so both are
 * allowed. Safe because the value is never used as a path component (the
 * fetch-kubeconfig step uses a fixed temp filename) and cannot start with `-`,
 * which is what would let it be read as an option.
 */
export function isSafeContextName(value: string): boolean {
  return /^[A-Za-z0-9][A-Za-z0-9._@:/-]{0,127}$/.test(value);
}

export function isSafeSshUser(value: string): boolean {
  return /^[a-z_][a-z0-9_-]{0,31}$/.test(value);
}

/** Prefix that pins the installer to a version, when one was requested. */
function versionPrefix(version: string | undefined): string {
  if (!version) return "";
  return `INSTALL_K3S_VERSION=${version} `;
}

function localSteps(input: ProvisionPlanInput): ProvisionStep[] {
  const pin = versionPrefix(input.k3sVersion);
  return [
    {
      id: "install",
      title: "Install k3s",
      rationale:
        "Installs a single-node Kubernetes cluster and starts it under systemd. " +
        "`--write-kubeconfig-mode 644` makes the generated kubeconfig readable by " +
        "your user, so the next step does not need root.",
      command: `curl -sfL https://get.k3s.io | ${pin}sh -s - --write-kubeconfig-mode 644`,
      location: "server",
      privileged: true,
    },
    {
      id: "wait-ready",
      title: "Wait for the node to be Ready",
      rationale: "The API server accepts connections before the node finishes registering.",
      command: "sudo k3s kubectl wait --for=condition=Ready node --all --timeout=120s",
      location: "server",
      privileged: true,
    },
    {
      id: "kubeconfig",
      title: "Point kubectl at the cluster",
      rationale:
        "k3s writes its kubeconfig to /etc/rancher/k3s/k3s.yaml. Copying it to " +
        "~/.kube/config lets plain `kubectl` — and OmniRoute — use it.",
      command: [
        "mkdir -p ~/.kube",
        "sudo cp /etc/rancher/k3s/k3s.yaml ~/.kube/config",
        "sudo chown $(id -u):$(id -g) ~/.kube/config",
        "chmod 600 ~/.kube/config",
      ].join(" && "),
      location: "server",
      privileged: true,
    },
    {
      id: "verify",
      title: "Verify",
      rationale: "Confirms the context works before OmniRoute tries to deploy into it.",
      command: "kubectl get nodes -o wide",
      location: "workstation",
      privileged: false,
    },
  ];
}

function vpsSteps(input: ProvisionPlanInput): ProvisionStep[] {
  const address = input.serverAddress ?? "<vps-address>";
  const user = input.sshUser ?? "root";
  const context = input.contextName ?? "omniroute-vps";
  const pin = versionPrefix(input.k3sVersion);

  return [
    {
      id: "ssh",
      title: "Open a session on the VPS",
      rationale: "Every server-side step below runs in this session.",
      command: `ssh ${user}@${address}`,
      location: "workstation",
      privileged: false,
    },
    {
      id: "install",
      title: "Install k3s with the public address in the certificate",
      rationale:
        "`--tls-san` puts the public address into the API server certificate. Without " +
        "it the cluster is only reachable as 127.0.0.1 and a remote kubectl fails TLS " +
        "verification. `--write-kubeconfig-mode 644` lets you read the kubeconfig " +
        "without root in the next step.",
      command:
        `curl -sfL https://get.k3s.io | ${pin}sh -s - ` +
        `--write-kubeconfig-mode 644 --tls-san ${address}`,
      location: "server",
      privileged: true,
    },
    {
      id: "wait-ready",
      title: "Wait for the node to be Ready",
      rationale: "The API server answers before the node has finished registering.",
      command: "sudo k3s kubectl wait --for=condition=Ready node --all --timeout=120s",
      location: "server",
      privileged: true,
    },
    {
      id: "firewall",
      title: "Allow the Kubernetes API port",
      rationale:
        "6443 is the API server. Restrict the source to the address you administer " +
        "from — an API server open to the whole internet is a standing risk.",
      command: `sudo ufw allow from <your-ip> to any port 6443 proto tcp`,
      location: "server",
      privileged: true,
      optional: true,
    },
    {
      id: "fetch-kubeconfig",
      title: "Copy the kubeconfig to your workstation",
      rationale:
        "The file k3s generates points at 127.0.0.1, which is the VPS itself. The " +
        "sed rewrites the server address so your workstation reaches the real host, " +
        "and the context is renamed so it does not collide with an existing 'default'.",
      command: [
        // The temp filename is fixed, never derived from the context: a context
        // name may legitimately contain "/" (EKS), which would otherwise turn
        // this into a path and write somewhere unintended.
        `ssh ${user}@${address} "sudo cat /etc/rancher/k3s/k3s.yaml" > /tmp/omniroute-k3s-kubeconfig.yaml`,
        `sed -i "s#https://127.0.0.1:6443#https://${address}:6443#" /tmp/omniroute-k3s-kubeconfig.yaml`,
        `sed -i "s#: default#: ${context}#" /tmp/omniroute-k3s-kubeconfig.yaml`,
        `KUBECONFIG=~/.kube/config:/tmp/omniroute-k3s-kubeconfig.yaml kubectl config view --flatten > /tmp/omniroute-merged-kubeconfig`,
        `mkdir -p ~/.kube && mv /tmp/omniroute-merged-kubeconfig ~/.kube/config && chmod 600 ~/.kube/config`,
        `rm -f /tmp/omniroute-k3s-kubeconfig.yaml`,
      ].join(" && "),
      location: "workstation",
      privileged: false,
    },
    {
      id: "verify",
      title: "Verify the context",
      rationale: "Confirms the rewritten address and certificate work end to end.",
      command: `kubectl --context ${context} get nodes -o wide`,
      location: "workstation",
      privileged: false,
    },
  ];
}

export function buildProvisionPlan(input: ProvisionPlanInput): ProvisionPlan {
  const warnings: string[] = [
    "These commands are yours to run — OmniRoute never connects to the server itself.",
    "Read each command before running it. `curl | sh` executes whatever the URL returns; " +
      "pin a k3s version if you want a reproducible install.",
  ];

  if (input.target === "vps") {
    if (!input.serverAddress) {
      warnings.push(
        "No server address given, so the commands below contain a <vps-address> " +
          "placeholder. Fill it in before running them — --tls-san must carry the real " +
          "address or a remote kubectl will fail TLS verification."
      );
    }
    warnings.push(
      "Exposing port 6443 publicly exposes the Kubernetes API. Restrict it by source " +
        "address, or reach it over a private network or tunnel."
    );
    warnings.push(
      "The kubeconfig is a full cluster credential. It lands in ~/.kube/config with mode " +
        "600 — treat it like a private key."
    );
  } else {
    warnings.push(
      "k3s installs a systemd service and iptables rules on this machine. " +
        "`/usr/local/bin/k3s-uninstall.sh` reverses it."
    );
  }

  const steps = input.target === "vps" ? vpsSteps(input) : localSteps(input);
  return { target: input.target, steps, warnings };
}
