import { NextResponse } from "next/server";
import { updateSettings } from "@/lib/db/settings";
import {
  CLI_VERSION_KEYS,
  getCliVersionOverrides,
  setCliVersionOverrides,
  type CliVersionKey,
  type CliVersionOverrides,
  type CliVersionSource,
  type CliVersionStatus,
} from "@/shared/constants/cliVersions";
import {
  CLAUDE_CODE_CLIENT_VERSION,
  getClaudeCodeClientVersion,
  getClaudeCodeClientVersionSource,
} from "@/shared/constants/claudeCodeClient";
import {
  DEFAULT_CODEX_CLIENT_VERSION,
  getCodexClientVersion,
  getCodexClientVersionSource,
} from "@omniroute/open-sse/config/codexClient.ts";
import { updateCliVersionSchema } from "@/shared/validation/schemas";
import { isValidationFailure, validateBody } from "@/shared/validation/helpers";
import { requireManagementAuth } from "@/lib/api/requireManagementAuth";

// GET / PUT the operator-set CLI client-version overrides that sit on top of the
// CLAUDE_CODE_CLIENT_VERSION / CODEX_CLIENT_VERSION env vars and the captured
// pins (src/shared/constants/cliVersions.ts).
//
// The response surfaces WHICH layer won (`source`) because the most common
// support question about this subsystem is "why isn't my override taking
// effect", and the answer is almost always the precedence order.

// Each kind's NON-caller-aware chain (auth / backend identity). The Codex
// INFERENCE path additionally forwards the caller's own version ABOVE the env
// layer — see resolveCodexClientVersion; the dashboard card carries that caveat.
const RESOLVERS: Record<
  CliVersionKey,
  { resolve: () => string; source: () => CliVersionSource; pinned: string }
> = {
  claude: {
    resolve: getClaudeCodeClientVersion,
    source: getClaudeCodeClientVersionSource,
    pinned: CLAUDE_CODE_CLIENT_VERSION,
  },
  codex: {
    resolve: getCodexClientVersion,
    source: getCodexClientVersionSource,
    pinned: DEFAULT_CODEX_CLIENT_VERSION,
  },
};

function buildView(): CliVersionStatus[] {
  const overrides = getCliVersionOverrides();
  return CLI_VERSION_KEYS.map((key) => {
    const resolver = RESOLVERS[key];
    return {
      key,
      version: overrides[key] ?? null,
      effective: resolver.resolve(),
      source: resolver.source(),
      pinned: resolver.pinned,
    };
  });
}

export async function GET(request: Request) {
  const authError = await requireManagementAuth(request);
  if (authError) return authError;
  try {
    return NextResponse.json({ items: buildView() });
  } catch (error) {
    console.error("Error reading CLI version overrides:", error);
    return NextResponse.json({ error: "Failed to read CLI version overrides" }, { status: 500 });
  }
}

/**
 * Merge a validated patch into the override map and apply it in-memory:
 * `null` clears a key, an omitted key keeps its current value. Returns the
 * NORMALIZED map the store actually accepted, which is what gets persisted — so
 * a malformed value can never reach the settings row even if one slipped past
 * the schema.
 */
function applyOverridePatch(
  current: CliVersionOverrides,
  patch: { claude?: string | null; codex?: string | null }
): CliVersionOverrides {
  const next: CliVersionOverrides = { ...current };
  for (const key of CLI_VERSION_KEYS) {
    const value = patch[key];
    if (value === undefined) continue;
    if (value === null) delete next[key];
    else next[key] = value;
  }
  return setCliVersionOverrides(next);
}

export async function PUT(request: Request) {
  const authError = await requireManagementAuth(request);
  if (authError) return authError;

  let rawBody;
  try {
    rawBody = await request.json();
  } catch {
    return NextResponse.json(
      {
        error: {
          message: "Invalid request",
          details: [{ field: "body", message: "Invalid JSON body" }],
        },
      },
      { status: 400 }
    );
  }

  try {
    const validation = validateBody(updateCliVersionSchema, rawBody);
    if (isValidationFailure(validation)) {
      return NextResponse.json({ error: validation.error }, { status: 400 });
    }

    // applyOverridePatch already swapped the in-memory map (so the very next
    // request advertises the new fingerprint); persist the NORMALIZED result so
    // the choice survives a restart.
    const applied = applyOverridePatch(getCliVersionOverrides(), validation.data);
    await updateSettings({ cliVersionOverrides: applied });

    return NextResponse.json({ items: buildView() });
  } catch (error) {
    console.error("Error updating CLI version overrides:", error);
    return NextResponse.json({ error: "Failed to update CLI version overrides" }, { status: 500 });
  }
}
