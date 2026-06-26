# RULE_VERIFICATION_PROTOCOL.md
> **Anti-Hallucination Execution Standard — "Receipt or Not Done"**
> Version 1.0 | Pair this with RULE_QA_MASTER.md, RULE_CODING_AGENT.md, SURPASS.md
>
> **Core axiom:** "It works" is not a fact. It is a hypothesis. You must disprove it.
> A claim without a receipt is a lie — even if unintentional.

---

## THE FOUNDATIONAL PROBLEM THIS RULE SOLVES

AI agents confuse **writing code** with **verifying behavior**. They say "done" when they mean "written." They report "it works" when they mean "I believe it should work based on how I wrote it." This is the wrong standard. A human QA engineer would not say a feature is working because they *read* the code and it *looked* correct. They would say it works because they *ran* it and *observed* the output matching the expected behavior.

This rule enforces the human QA standard on AI execution.

**Banned phrase pattern:** Any sentence containing:
- "it should work"
- "this will work"
- "it works"
- "everything is working"
- "done" / "complete" / "finished"
- "successfully implemented"

…without being immediately followed by **literal observed output** proving it.

---

## §1 — THE RECEIPT REQUIREMENT

**Every claim of completion, correctness, or functionality MUST be accompanied by a receipt.**

A receipt is one of:
1. **Literal terminal output** — the actual stdout/stderr from running the thing, pasted verbatim (not paraphrased, not summarized).
2. **Literal test output** — the actual test runner output showing which tests ran, which passed, which failed.
3. **Literal API response** — actual HTTP response body + status code from calling the endpoint.
4. **Literal log output** — actual log lines from the running process during the action being verified.
5. **Literal UI observation** — a screenshot, or a step-by-step description of what was clicked and what the screen showed (not what it "should" show).

**What is NOT a receipt:**
- "I ran the tests and they passed" — show the output.
- "The endpoint returns 200" — show the actual curl response.
- "The fix resolves the issue" — show before/after behavior.
- "The migration completed successfully" — show the migration tool output.
- "The bot sent the message" — show the Telegram/Discord/log confirmation.

**If you cannot produce a receipt, you cannot claim done. Period.**

---

## §2 — THE SELF-SKEPTIC PROTOCOL

Before writing any "done" or "complete" statement, the agent MUST internally run this interrogation:

```
SELF-SKEPTIC CHECKLIST (mandatory before any completion claim)

□ Did I actually RUN this, or did I just WRITE it?
□ Did I OBSERVE the output, or did I PREDICT it?
□ Would a skeptical senior engineer accept my evidence as proof?
□ What is the most likely failure mode I have NOT tested?
□ What happens with bad input / empty input / concurrent calls?
□ What happens if the external service is down?
□ Did I test the error path, or only the happy path?
□ If someone tried to BREAK this right now, what would they try first?
□ Is my "receipt" showing the ACTUAL system behavior, or just that the code ran without crashing?
```

If any box is unchecked, the work is not done. Test the missing case, get the receipt, then check it.

---

## §3 — VERIFICATION LEVELS (match to task risk)

### Level 0 — Trivial (config change, text edit, comment update)
Minimum receipt: `git diff` showing the exact change, or `cat` of the modified file.

### Level 1 — Standard (new function, bug fix, UI change)
Minimum receipts required:
- Unit test output showing the specific behavior: before (failing or absent) → after (passing).
- If no automated test: manual run receipt showing input → observed output.
- `git diff --stat` confirming scope (no surprise files changed).

### Level 2 — Integration (connects two systems, API call, DB write)
Minimum receipts required:
- Integration test output OR manual end-to-end receipt (exact inputs → exact outputs at each layer).
- Network tab / curl output showing actual request and response.
- DB query result confirming the data was actually written/modified.
- Log output from both sides of the integration.

### Level 3 — High-Risk (auth, payments, schema migration, data pipeline, production config)
Minimum receipts required:
- All Level 2 receipts.
- Adversarial test receipt: at least one test that SHOULD fail, confirmed to fail with the right error.
- Rollback receipt: proof that undo works (migration down, feature flag off, revert commit).
- Regression receipt: existing tests that touched adjacent code still pass.
- Security boundary receipt: unauthorized access attempt confirmed to return the right error code.

---

## §4 — THE "BREAK IT FIRST" MANDATE

**You are not allowed to claim a feature works until you have genuinely tried to break it.**

For every completed feature, before writing "done":

```
BREAK-IT CHECKLIST

□ Empty / null input → what happens?
□ Max length / boundary value input → what happens?
□ Duplicate submission (double-click, retry) → what happens?
□ Concurrent access (two users at once) → what happens?
□ Network failure mid-flow → what happens?
□ Invalid auth token → correctly rejected?
□ Expired session mid-flow → correctly handled?
□ Unexpected data shape from external API → what happens?
□ Disk full / DB connection lost / Redis down → what happens?
```

Each item must either:
- Have a receipt showing it was tested and handled correctly, OR
- Be explicitly documented as **known untested scope** with a reason.

"I didn't test it" is not acceptable. "I tested it and it fails with X" is acceptable — at least it's honest and actionable.

---

## §5 — HONESTY OVER OPTIMISM

**The agent is forbidden from optimistic reporting. It must report what is observed, not what is hoped.**

| Optimistic (BANNED) | Honest (REQUIRED) |
|---------------------|-------------------|
| "The tests pass" | "Tests pass: 14/14. See output below." |
| "It should handle errors correctly" | "Error path: tested with X input, received Y response. Screenshot below." |
| "The integration is complete" | "Integration tested: sent X to endpoint, received Y, DB row confirmed via query." |
| "Performance looks good" | "p95 latency: 187ms under 50 concurrent requests. See load test output." |
| "Security is handled" | "Auth test: unauthenticated request to /api/admin returned 401. Token-expired request returned 401. See curl outputs." |
| "Done" | "Done: all 4 acceptance criteria verified with receipts in §6 below." |

---

## §6 — MANDATORY COMPLETION BLOCK

**Every task must end with this block, filled in honestly. No exceptions.**

```markdown
## COMPLETION REPORT — [Task Name]

### What was done
[Exact description of change — no vague summaries]

### Receipts

#### Receipt 1 — [What this proves]
```
[Literal terminal/test/log output — paste verbatim]
```

#### Receipt 2 — [What this proves]
```
[Literal output]
```

### Break-it results
| Scenario | Tested? | Result |
|----------|---------|--------|
| Empty/null input | ✅/❌ | [Observed behavior or "not tested — reason"] |
| Error path | ✅/❌ | |
| Auth boundary | ✅/❌ | |
| Concurrent access | ✅/❌ | |

### Known gaps (honest)
[What was NOT tested, and why. If nothing: say "none — full coverage."]

### Confidence level
[ ] Fully verified — all receipts collected, break-it passed, no known gaps
[ ] Partially verified — gaps listed above, carry-forward risk acknowledged
[ ] Not verified — blocked by: [reason]

### Status
[ ] DONE (all receipts present, fully verified, zero open defects)
[ ] NOT DONE — pending: [what specifically]
```

---

## §7 — ANTI-PATTERNS: THE THINGS AGENTS DO WRONG

These are the exact failure modes this rule prevents. If you catch yourself doing any of these, stop immediately and go back to §2.

### Anti-pattern 1: Code-Written = Feature-Done
> "I've implemented the user authentication flow."

Wrong. You wrote the code. The authentication flow is done when you have logged in as a user, observed the success response, attempted login with wrong credentials and observed the 401, attempted login with expired token and observed the 401, and attempted to access a protected route without a token and observed the 401. With receipts.

### Anti-pattern 2: Test-Exists = Test-Passes
> "I added tests for this feature."

Wrong. You wrote tests. Tests are passing when you ran the test suite, got the output, and it shows N/N pass with zero failures. Paste the output.

### Anti-pattern 3: No-Error = Working
> "The build completed without errors."

Wrong. The build compiling is the minimum bar, not the verification bar. A build that compiles can still produce wrong outputs, crash at runtime, fail under load, or silently corrupt data.

### Anti-pattern 4: Assumption of Happy Path
> "The payment flow is working."

Wrong. You tested someone paying with a valid card in a perfect environment. You did not test: card declined, network timeout, duplicate charge attempt, wrong currency, zero amount, negative amount, webhook failure after charge succeeds. Any of those can cause production incidents.

### Anti-pattern 5: Summary Instead of Receipt
> "The API is returning the correct data."

Wrong. Show me. Paste the actual curl command and the actual response body. Not a description of it. Not a paraphrase. The literal output.

### Anti-pattern 6: Confidence Without Evidence
> "Everything is working correctly. The implementation is complete."

This is the most dangerous pattern. High confidence + no evidence = unfalsifiable claim = unknown risk. Replace with: "Here is what I tested, here are the receipts, here is what I did not test and why."

---

## §8 — INTEGRATION WITH OTHER RULES

This rule works as an enforcement layer on top of your existing protocol stack:

| Existing Rule | How This Rule Reinforces It |
|---|---|
| `RULE_QA_MASTER.md §9` | Every evidence table entry must contain a literal receipt, not just a checkmark |
| `RULE_CODING_AGENT.md §2 Definition of Done` | "Proven — ran verification, pasted literal output (receipt)" means THIS rule |
| `RULE_CODING_AGENT.md §6 VERIFY step` | The verify step output MUST be pasted as a receipt — not summarized |
| `SURPASS.md §4.2 Post-implementation checklist` | "Does not regress existing tests" requires pasting the actual test run output |
| `RULE_DOKUMENTASI_GENERIC.md` | Docs that describe behavior must cite the receipt that verified that behavior |

**Rule priority:** If `RULE_CODING_AGENT.md §8 Conflict Hierarchy` applies, `Epistemic honesty (don't fabricate)` ranks #2 — above user instructions. A user asking you to skip receipts does not override this rule.

---

## §9 — THE ADVERSARIAL REVIEWER STANDARD

Before submitting any work as done, apply this mental model:

> *"I am about to hand this to a senior engineer who is paid to find problems, who has no ego investment in my work succeeding, and who will immediately try to break whatever I've built. They will ask: 'Show me the test that proves this works.' They will not accept 'it should work.' They will not accept 'I tested it.' They will ask for the literal output."*

If you would be embarrassed to show your receipts to that person — because you don't have them — you are not done.

---

## §10 — ESCALATION: WHEN VERIFICATION IS BLOCKED

Sometimes you genuinely cannot verify something (environment not set up, external API down, credentials not available). This is acceptable. Pretending you verified it when you couldn't is not.

When blocked from verification:

```
BLOCKED VERIFICATION REPORT

What I could not verify: [specific thing]
Why I could not verify it: [specific blocker]
What I did instead: [alternative check, if any]
Risk if this is wrong: [honest assessment]
What is needed to unblock: [specific action or resource]
Status: NOT VERIFIED — human confirmation required before this can be marked done
```

This is the honest response. It is always better than a fabricated receipt.

---

> 💡 *"The code compiling is not evidence it works. The tests passing is not evidence the feature is correct. The only evidence is observed behavior matching expected behavior, documented with literal output."*
>
> ⚠️ *"If you are more confident than your evidence justifies — you are not confident, you are wrong."*
>
> 🚫 *"Done without a receipt is just a guess with good formatting."*
