import { execFile } from "node:child_process";
import { basename } from "node:path";
import { promisify } from "node:util";
import { isGitProbeEnvEnabled } from "./settings";
import type { WorkContext } from "./types";
import { PROJECT_ID_HEADER, REPO_HEADER, TICKET_HEADER, TOOL_HEADER } from "./types";

const execFileAsync = promisify(execFile);

function headerValue(
  headers: Headers | Record<string, string | string[] | undefined> | null | undefined,
  name: string
): string | undefined {
  if (!headers) return undefined;
  if (typeof (headers as Headers).get === "function") {
    const v = (headers as Headers).get(name);
    return v?.trim() || undefined;
  }
  const raw = (headers as Record<string, string | string[] | undefined>)[name];
  if (Array.isArray(raw)) return raw[0]?.trim() || undefined;
  return typeof raw === "string" ? raw.trim() || undefined : undefined;
}

export function parseRepoName(remoteUrl: string | undefined): string | undefined {
  if (!remoteUrl) return undefined;
  const cleaned = remoteUrl.trim().replace(/\.git$/i, "");
  const ssh = cleaned.match(/[:/]([^/]+\/[^/]+)$/);
  if (ssh?.[1]) {
    const parts = ssh[1].split("/");
    return parts[parts.length - 1] || undefined;
  }
  try {
    const u = new URL(cleaned.includes("://") ? cleaned : `https://${cleaned}`);
    const parts = u.pathname.split("/").filter(Boolean);
    return parts[parts.length - 1] || undefined;
  } catch {
    return basename(cleaned) || undefined;
  }
}

export function extractTicket(branch: string | undefined): string | undefined {
  if (!branch) return undefined;
  const m = branch.match(/\b([A-Z][A-Z0-9]+-\d+)\b/);
  return m?.[1];
}

async function gitProbe(
  cwd: string
): Promise<{ repo?: string; branch?: string; ticketId?: string }> {
  try {
    const opts = { cwd, timeout: 1500, maxBuffer: 64 * 1024 };
    const [branchRes, remoteRes] = await Promise.all([
      execFileAsync("git", ["rev-parse", "--abbrev-ref", "HEAD"], opts).catch(() => null),
      execFileAsync("git", ["config", "--get", "remote.origin.url"], opts).catch(() => null),
    ]);
    const branch = branchRes?.stdout?.toString().trim() || undefined;
    const remote = remoteRes?.stdout?.toString().trim() || undefined;
    return {
      repo: parseRepoName(remote),
      branch,
      ticketId: extractTicket(branch),
    };
  } catch {
    return {};
  }
}

export interface BuildWorkContextInput {
  headers?: Headers | Record<string, string | string[] | undefined> | null;
  body?: Record<string, unknown> | null;
  cwd?: string | null;
  gitProbeEnabled?: boolean;
}

/**
 * Build WorkContext from headers/body. Git probe is OFF unless settings or env enable it.
 * Never throws — worst case returns unknown/empty fields.
 */
export async function buildWorkContext(input: BuildWorkContextInput = {}): Promise<WorkContext> {
  const headers = input.headers;
  const body = input.body ?? {};

  const tool = headerValue(headers, TOOL_HEADER) || headerValue(headers, "x-omniroute-tool");
  const repoHeader = headerValue(headers, REPO_HEADER);
  const ticketHeader = headerValue(headers, TICKET_HEADER);
  const model =
    typeof body.model === "string"
      ? body.model
      : typeof (body as { request_model?: string }).request_model === "string"
        ? (body as { request_model: string }).request_model
        : undefined;

  let repo = repoHeader;
  let gitBranch: string | undefined;
  let ticketId = ticketHeader;
  let workspace: string | undefined;

  const probeEnabled = Boolean(input.gitProbeEnabled) || isGitProbeEnvEnabled();
  if (probeEnabled && input.cwd) {
    const probed = await gitProbe(input.cwd);
    repo = repo || probed.repo;
    gitBranch = probed.branch;
    ticketId = ticketId || probed.ticketId;
    workspace = basename(input.cwd);
  }

  return {
    tool,
    appCategory: "unknown",
    repo,
    gitBranch,
    ticketId,
    workspace,
    provider: undefined,
    requestModel: model,
    scopeConfidence: "low",
  };
}

export function readExplicitProjectId(
  headers?: Headers | Record<string, string | string[] | undefined> | null
): string | undefined {
  return headerValue(headers, PROJECT_ID_HEADER);
}
