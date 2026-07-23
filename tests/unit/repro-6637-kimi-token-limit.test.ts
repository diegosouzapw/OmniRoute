// Repro probe for issue #6637: combo stops fallback after Kimi total token-limit 400.
//
// Observed provider response (Kimi, verbatim from the issue report):
//   "Invalid request: Your request exceeded model token limit: 262144 (requested: 308458)"
//
// combo.ts's #2101 guard (handleComboChat) treats a 400 as a combo-halting
// "body-specific" error UNLESS isContextOverflow400() or isParamValidation400()
// recognizes it as a context/param overflow that should fall through to the next
// combo target. Kimi's exact wording ("... exceeded model token limit ...") does
// NOT contain the literal word "context", so isContextOverflow400() misses it even
// though accountFallback.ts's OWN CONTEXT_OVERFLOW_PATTERNS (used one layer below,
// to decide fallbackResult.shouldFallback) explicitly matches `/\btoken limit\b/i`
// and `/\bmax.*token/i`. The two classifiers disagree, and the stricter one wins,
// so the combo halts instead of trying the next (larger-context) target.
import assert from "node:assert/strict";
import test from "node:test";
import { isContextOverflow400, isParamValidation400 } from "../../open-sse/services/combo.ts";

const KIMI_ERROR_TEXT =
  "Invalid request: Your request exceeded model token limit: 262144 (requested: 308458)";

test("#6637: Kimi's 'exceeded model token limit' 400 must be classified as context/token overflow (not body-specific)", () => {
  // This is the exact predicate combo.ts checks before deciding to abort the
  // whole combo instead of falling through to the next target (combo.ts ~L2038-2049):
  //   if (status === 400 && fallbackResult.shouldFallback &&
  //       !isContextOverflow400(errorText) && !isParamValidation400(errorText) && ...)
  //     -> "stopping combo"
  //
  // For the fallback to proceed to the next target, at least one of these must be true.
  const isRecognizedAsOverflow = isContextOverflow400(KIMI_ERROR_TEXT) || isParamValidation400(KIMI_ERROR_TEXT);

  assert.equal(
    isRecognizedAsOverflow,
    true,
    `Expected Kimi's "exceeded model token limit" 400 to be classified as context/token ` +
      `overflow so combo fallback continues to the next target, but neither ` +
      `isContextOverflow400() nor isParamValidation400() matched it. This causes ` +
      `handleComboChat's #2101 guard to treat it as a body-specific error and halt the ` +
      `whole combo (bug #6637).`
  );
});
