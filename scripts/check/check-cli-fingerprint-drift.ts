/**
 * Compare the four captured CLI fingerprint pins against the published CLI.
 *
 * A pin is the version OmniRoute advertises on the wire. Upstream gates new
 * models on that version, so a pin behind the published CLI fails closed
 * here instead of failing as a 400 on the first request for the new model.
 *
 * Network failure is not drift: the caller records it and exits 0. A version
 * that was fetched and does not match the pin exits 1.
 */
import { execFile } from "node:child_process";
import { promisify } from "node:util";

import { CLAUDE_CODE_CLIENT_VERSION } from "../../src/shared/constants/claudeCodeClient.ts";
import { DEFAULT_CODEX_CLIENT_VERSION } from "../../src/shared/constants/codexClient.ts";
import { GITHUB_COPILOT_CLI_VERSION } from "../../open-sse/config/providerHeaderProfiles.ts";
import { GROK_BUILD_DEFAULT_CLIENT_VERSION } from "../../open-sse/config/grokBuild.ts";

const execFileAsync = promisify(execFile);

export type FingerprintId = "claude-code" | "codex" | "copilot" | "grok-build";

export interface PublishedCliVersion {
  version: string;
  source: string;
}

export interface FingerprintDrift {
  id: FingerprintId;
  pinned: string;
  published: string | null;
  source: string;
}

interface FingerprintSource {
  id: FingerprintId;
  pinned: string;
  /** npm package whose `version` field is the wire version. */
  npmPackage: string;
  /**
   * Optional second package. grok's launcher (`@xai-official/grok`) is not the
   * binary that speaks the wire protocol; the platform package is.
   */
  platformPackage?: string;
}

export const FINGERPRINT_SOURCES: readonly FingerprintSource[] = [
  {
    id: "claude-code",
    pinned: CLAUDE_CODE_CLIENT_VERSION,
    npmPackage: "@anthropic-ai/claude-code",
  },
  {
    id: "codex",
    pinned: DEFAULT_CODEX_CLIENT_VERSION,
    npmPackage: "@openai/codex",
  },
  {
    id: "copilot",
    pinned: GITHUB_COPILOT_CLI_VERSION,
    npmPackage: "@github/copilot",
  },
  {
    id: "grok-build",
    pinned: GROK_BUILD_DEFAULT_CLIENT_VERSION,
    npmPackage: "@xai-official/grok",
    platformPackage: "@xai-official/grok-linux-x64",
  },
];

export function compareFingerprintPins(
  pins: Record<FingerprintId, string>,
  published: Record<FingerprintId, PublishedCliVersion | null>
): FingerprintDrift[] {
  const drift: FingerprintDrift[] = [];
  for (const source of FINGERPRINT_SOURCES) {
    const live = published[source.id];
    const pinned = pins[source.id];
    if (!live || live.version !== pinned) {
      drift.push({
        id: source.id,
        pinned,
        published: live?.version ?? null,
        source: live?.source ?? source.npmPackage,
      });
    }
  }
  return drift;
}

export function exitCodeForFingerprintCheck(
  unreachable: readonly string[],
  drift: readonly FingerprintDrift[]
): number {
  if (unreachable.length > 0) return 0;
  return drift.length > 0 ? 1 : 0;
}

export async function readNpmVersion(pkg: string): Promise<string> {
  const { stdout } = await execFileAsync("npm", ["view", pkg, "version"], {
    timeout: 30_000,
  });
  const version = stdout.trim();
  if (!/^\d+\.\d+\.\d+/.test(version)) {
    throw new Error(`npm view ${pkg} version returned ${JSON.stringify(version)}`);
  }
  return version;
}

async function main(): Promise<void> {
  const pins = Object.fromEntries(FINGERPRINT_SOURCES.map((s) => [s.id, s.pinned])) as Record<
    FingerprintId,
    string
  >;
  const published = {} as Record<FingerprintId, PublishedCliVersion | null>;
  const unreachable: string[] = [];

  for (const source of FINGERPRINT_SOURCES) {
    const pkg = source.platformPackage ?? source.npmPackage;
    try {
      published[source.id] = { version: await readNpmVersion(pkg), source: pkg };
    } catch (error) {
      published[source.id] = null;
      unreachable.push(`${source.id}: ${error instanceof Error ? error.message : String(error)}`);
    }
  }

  if (unreachable.length > 0) {
    console.warn("Could not read every published CLI version; not treating that as drift:");
    for (const line of unreachable) console.warn(`  - ${line}`);
  }

  const drift = compareFingerprintPins(pins, published);
  const exitCode = exitCodeForFingerprintCheck(unreachable, drift);
  if (exitCode === 0 && drift.length === 0) {
    console.log("CLI fingerprint pins match the published CLIs.");
  }
  if (exitCode === 1) {
    console.error("CLI fingerprint pins are behind the published CLI:");
    for (const row of drift) {
      console.error(
        `  - ${row.id}: pinned ${row.pinned}, published ${row.published} (${row.source})`
      );
    }
    console.error(
      "Bump the captured pin, or set the matching *_CLIENT_VERSION env, before shipping."
    );
  }
  process.exitCode = exitCode;
}

const isDirectExecution = process.argv[1]?.endsWith("check-cli-fingerprint-drift.ts");
if (isDirectExecution) {
  await main();
}
