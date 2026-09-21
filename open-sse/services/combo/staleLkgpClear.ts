/**
 * Clear persisted LKGP pins when a combo target fails or is skipped for exhaustion,
 * cooldown or unavailability (#11911 #919), scoped to the pin that names the
 * failed target when the caller knows it (#12235).
 *
 * Non-blocking by design: the fallback loop never waits on these SQLite writes. A
 * failed clear is not silent — it logs a warning carrying the combo and the
 * execution key. The returned promise never rejects: routing callers ignore it,
 * tests await it.
 *
 * @internal — re-exported by combo.ts as `clearStaleLKGP`.
 */

type WarnLogger = { warn?: (tag: string, msg: string, data?: unknown) => void } | null;
type ClearLkgp = (comboName: string, modelKey: string) => Promise<void>;

/** The target whose failure triggered the clear, when the caller has one in scope. */
type FailedTarget = { provider?: string | null; connectionId?: string | null } | null;

async function clearPins(
  comboName: string,
  executionKey: string | null | undefined,
  comboId: string | null | undefined,
  clearLKGP: ClearLkgp | undefined,
  failed: FailedTarget
): Promise<void> {
  const clear = clearLKGP ?? (await import("@/lib/db/settings")).clearLKGP;
  const comboKey = comboId || comboName;

  // The target-scoped pin is unambiguously about the target that just failed.
  const pending: Promise<void>[] = executionKey ? [clear(comboName, executionKey)] : [];

  if (!failed?.provider) {
    // No target in scope: previous unconditional behaviour.
    pending.push(clear(comboName, comboKey));
  } else {
    const { getLKGP } = await import("@/lib/db/settings");
    const pin = await getLKGP(comboName, comboKey);
    // Same provider, and — when both sides carry one — the same connection.
    // A sibling connection failing does not make the pinned one stale.
    const namesFailedTarget =
      pin?.provider === failed.provider &&
      (!pin?.connectionId || !failed.connectionId || pin.connectionId === failed.connectionId);
    if (namesFailedTarget) pending.push(clear(comboName, comboKey));
  }

  await Promise.all(pending);
}

export function clearStaleLKGP(
  comboName: string,
  executionKey?: string | null,
  comboId?: string | null,
  log?: WarnLogger,
  tag: string = "COMBO",
  /** Test seam; the routing path always resolves clearLKGP from @/lib/db/settings. */
  clearLKGP?: ClearLkgp,
  /**
   * The failed target, when the caller has one. Scopes the COMBO-LEVEL pin so it
   * is cleared only when it actually names that target's provider: the pin
   * records whichever provider last SUCCEEDED, which need not be the one failing
   * now. Under `auto` the pin is a scoring input rather than a hoist
   * (`resolveAutoStrategy` reads it into `lastKnownGoodProvider`), so the pinned
   * provider is not necessarily tried first, and clearing unconditionally
   * discarded a preference for a healthy provider every time an unrelated target
   * was skipped. Omitted keeps the previous unconditional behaviour (#12235).
   */
  failed?: FailedTarget
): Promise<void> {
  return clearPins(comboName, executionKey, comboId, clearLKGP, failed ?? null).catch(
    (err: unknown) => {
      log?.warn?.(tag, "Failed to clear Last Known Good Provider. This is non-fatal.", {
        combo: comboName,
        comboId: comboId ?? null,
        executionKey: executionKey ?? null,
        err,
      });
    }
  );
}
