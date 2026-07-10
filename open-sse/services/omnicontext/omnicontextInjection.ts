/**
 * Hot-path OmniContext inject — fail-open. Called from chatCore adjacent to Memory.
 */
import { providerSupportsSystemMessage, systemMessageMustBeFirst } from "@/lib/memory/injection";
import { getMembership } from "@/lib/db/omnicontextProjects";
import {
  buildWorkContext,
  readExplicitProjectId,
  resolveScope,
  getOmniContextSettings,
  NO_OMNICONTEXT_HEADER,
} from "@/lib/omnicontext";
import { retrieveForProject } from "@/lib/omnicontext/retrieve";
import { buildInjectBlock } from "@/lib/omnicontext/inject";
import { getHeaderValueCaseInsensitive } from "../../handlers/chatCore/headers.ts";

export function isNoOmniContextRequested(
  headers: Record<string, unknown> | Headers | null | undefined
): boolean {
  const value = (getHeaderValueCaseInsensitive(headers, NO_OMNICONTEXT_HEADER) || "")
    .trim()
    .toLowerCase();
  return value === "true" || value === "1" || value === "yes";
}

function extractLastUserQuery(body: Record<string, unknown>): string {
  const pickFrom = (arr: unknown[]): string => {
    for (let i = arr.length - 1; i >= 0; i--) {
      const item = arr[i] as Record<string, unknown> | undefined;
      if (!item || (item.role !== undefined && item.role !== "user")) continue;
      const content = item.content ?? item.text;
      if (typeof content === "string" && content.trim()) return content.trim();
      if (Array.isArray(content)) {
        const parts: string[] = [];
        for (const p of content) {
          if (typeof p === "string") parts.push(p);
          else if (p && typeof p === "object") {
            const t = (p as Record<string, unknown>).text;
            if (typeof t === "string") parts.push(t);
          }
        }
        if (parts.length) return parts.join(" ").trim();
      }
    }
    return "";
  };
  if (Array.isArray(body.messages)) {
    const r = pickFrom(body.messages);
    if (r) return r;
  }
  if (Array.isArray(body.input)) {
    const r = pickFrom(body.input);
    if (r) return r;
  }
  return "";
}

function placeSystemOrUser(
  body: Record<string, unknown>,
  text: string,
  provider: string | null | undefined
): Record<string, unknown> {
  const messages = Array.isArray(body.messages)
    ? [...(body.messages as Array<Record<string, unknown>>)]
    : [];

  if (!providerSupportsSystemMessage(provider)) {
    return {
      ...body,
      messages: [{ role: "user", content: text }, ...messages],
    };
  }

  if (systemMessageMustBeFirst(provider)) {
    const first = messages[0];
    if (first && first.role === "system" && typeof first.content === "string") {
      return {
        ...body,
        messages: [{ ...first, content: `${text}\n${first.content}` }, ...messages.slice(1)],
      };
    }
    return { ...body, messages: [{ role: "system", content: text }, ...messages] };
  }

  // Prefer early system message after any existing leading system (Layer A cache-aligned)
  if (messages[0]?.role === "system") {
    const next = [...messages];
    next.splice(1, 0, { role: "system", content: text });
    return { ...body, messages: next };
  }
  return { ...body, messages: [{ role: "system", content: text }, ...messages] };
}

export interface InjectOmniContextResult {
  body: Record<string, unknown>;
  injected: boolean;
  reason?: string;
  projectId?: string;
  tokensEstimate?: number;
}

/**
 * Fail-open Continuity inject. Never throws to the caller.
 */
export async function injectOmniContext(params: {
  body: Record<string, unknown>;
  headers?: Record<string, unknown> | Headers | null;
  apiKeyId?: string | null;
  provider?: string | null;
  log?: {
    warn?: (msg: string, meta?: unknown) => void;
    info?: (msg: string, meta?: unknown) => void;
  };
}): Promise<InjectOmniContextResult> {
  const { body, headers, apiKeyId, provider, log } = params;
  try {
    if (isNoOmniContextRequested(headers ?? null)) {
      return { body, injected: false, reason: "opt_out_header" };
    }

    const settings = await getOmniContextSettings();
    if (!settings.enabled) {
      return { body, injected: false, reason: "disabled" };
    }
    if (!apiKeyId) {
      return { body, injected: false, reason: "no_api_key" };
    }

    const workContext = await buildWorkContext({
      headers: headers as Headers | Record<string, string | string[] | undefined> | null,
      body,
      gitProbeEnabled: settings.gitProbeEnabled,
    });
    const explicitProjectId = readExplicitProjectId(
      headers as Headers | Record<string, string | string[] | undefined> | null
    );
    const scope = resolveScope({
      workContext,
      apiKeyId,
      explicitProjectId,
    });

    if (scope.confidence === "low" || !scope.scope.projectId) {
      return { body, injected: false, reason: "low_scope" };
    }

    const projectId = scope.scope.projectId;
    if (!getMembership(projectId, apiKeyId)) {
      return { body, injected: false, reason: "not_member" };
    }

    const query = extractLastUserQuery(body);
    const timeoutMs = settings.retrieveTimeoutMs;

    const retrieved = await Promise.race([
      Promise.resolve(
        retrieveForProject({
          projectId,
          query,
          viewerApiKeyId: apiKeyId,
        })
      ),
      new Promise<null>((resolve) => setTimeout(() => resolve(null), timeoutMs)),
    ]);

    if (!retrieved) {
      log?.warn?.("omnicontext.inject.timeout", { projectId, timeoutMs });
      return { body, injected: false, reason: "timeout" };
    }

    // Prefer stable/lead_approved for Layer A
    if (
      retrieved.stablePrefix &&
      retrieved.stablePrefix.trustTier !== "stable" &&
      retrieved.stablePrefix.trustTier !== "lead_approved" &&
      retrieved.stablePrefix.trustTier !== "member"
    ) {
      retrieved.stablePrefix = null;
    }

    const block = buildInjectBlock(projectId, retrieved, settings.injectBudgetTokens);
    if (!block) {
      return { body, injected: false, reason: "empty", projectId };
    }

    const nextBody = placeSystemOrUser(body, block.markdown, provider);
    log?.info?.("omnicontext.inject.ok", {
      projectId,
      tokensEstimate: block.tokensEstimate,
      artifactIds: block.artifactIds,
    });
    return {
      body: nextBody,
      injected: true,
      projectId,
      tokensEstimate: block.tokensEstimate,
    };
  } catch (err) {
    log?.warn?.("omnicontext.inject.fail_open", {
      error: err instanceof Error ? err.message : String(err),
    });
    return { body, injected: false, reason: "error" };
  }
}
