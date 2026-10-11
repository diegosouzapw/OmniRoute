/**
 * Recovery contract for executors that override `BaseExecutor.execute()` (#14629).
 *
 * Overrides bypass the base recovery loop; prefer the transformation hooks when possible.
 * Custom loops own applicable reasoning enum 400/422, known-field 400 and Gemini
 * budget recovery. Use the actual payload (rebuild envelopes after inner recovery),
 * preserve provider/model/protocol learning, URL/headers/signal/serializer and retry
 * bounds, and return the sent body as transformedBody without mutating caller input.
 *
 * New nontrivial overrides must document their decision on the execute member:
 * set `@executorRecovery` to `custom` (own loop) or `native` (inapplicable payload),
 * give `@executorRecoveryReason` a protocol justification, and `@executorRecoveryTest`
 * the path of an existing behavioral test under tests/; one tag each on the member.
 *
 * These tags declare ownership; neither a helper name nor a test path proves correct
 * recovery. Test actual dispatch/payloads, including fallback paths. The AST guard in
 * tests/unit/executor-recovery-contract-guard.test.ts exempts historical identities
 * without certifying them; only direct trivial super.execute delegation needs no tags.
 */
export const EXECUTOR_RECOVERY_TAGS = {
  mode: "executorRecovery",
  reason: "executorRecoveryReason",
  test: "executorRecoveryTest",
} as const;

export const EXECUTOR_RECOVERY_MODES = ["custom", "native"] as const;

export type ExecutorRecoveryMode = (typeof EXECUTOR_RECOVERY_MODES)[number];

export const EXECUTOR_RECOVERY_CONTRACT_DOC = "open-sse/executors/base/recoveryContract.ts";
