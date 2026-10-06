import { NextResponse } from "next/server";
import { ensureCliConfigWriteAllowed } from "@/shared/services/cliRuntime";
import { isContainerWriteRefusal } from "@/shared/utils/containerConfigGuard";

/**
 * Shared gate for API routes that write a host CLI's config file.
 *
 * Returns `null` when the write may proceed, otherwise the response to send:
 *   - 422 + `containerEphemeralTarget` when OmniRoute runs in a container and
 *     the target is not bind-mounted from the host (the write would vanish),
 *   - 403 when CLI config writes are switched off entirely.
 *
 * Clients key off `containerEphemeralTarget` to render the host-CLI guidance
 * inline, the same way the Zed import card handles its Docker 422.
 */
export function guardCliConfigWrite(
  targetPath: string,
  options: { toolLabel?: string; hostCommand?: string } = {}
): NextResponse | null {
  const writeError = ensureCliConfigWriteAllowed(targetPath, options);
  if (!writeError) return null;

  const containerEphemeralTarget = isContainerWriteRefusal(writeError);
  return NextResponse.json(
    {
      error: writeError,
      ...(containerEphemeralTarget
        ? { containerEphemeralTarget, hostSetupCommand: options.hostCommand }
        : {}),
    },
    { status: containerEphemeralTarget ? 422 : 403 }
  );
}
