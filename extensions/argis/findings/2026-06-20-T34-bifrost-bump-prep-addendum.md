# T34 Addendum — Verification Pass (2026-06-20 forge-2 session)

**Status of `findings/2026-06-20-T34-bifrost-bump-prep.md`:** Already exists from a prior session (191 lines, dated 2026-06-20). **NOT overwritten** — the existing file is more comprehensive than what this session would produce.

**Purpose of this addendum:** Capture only what is NEW since the prior file was authored, plus a per-plugin cross-check that this session independently verified.

---

## A1. Why not overwritten

Per the project rule "ALWAYS prefer editing an existing file to creating a new one" and "Do what has been asked; nothing more, nothing less":

- The existing 191-line file already covers: upstream tag verification (`6a20d53927decc6a0c03c8e1af0eb2ee5724c8c1`), per-plugin YELLOW/GREEN/RED table, risk grid (compile-time / runtime / repo hygiene), T34.0/T34.1/T34.2 execution recipes, cross-references to ADR-001/023/024/041.
- This session independently verified every per-plugin assessment by reading each plugin's source. Results are **consistent** with the prior file (no contradictions). Overwriting with a fresh copy would lose detail without adding value.

## A2. New since the prior file

### A2.1 v11 closure is now ACTIVE in the monorepo AGENTS.md

The prior T34 file refers to "v11 closure merged" as a pre-condition. Per the current monorepo `AGENTS.md` (this turn, 2026-06-19 05:00 PDT):

- v11 closure branch `chore/orch-v11-016-tier0-2026-06-20` is at `7184fbb` and is the **active** closure context.
- T33 (Side-DAG Filler) and T0.5 (Wrap-up) remain IN_PROGRESS but do not block T34.
- The closure §8 ACCEPTED Option B is the anchor for T34's role: Bifrost stays as the LLM transport library; Phenotype-owned decision layer (e.g., `intelligentrouter` + the proposed `Tokn` TokenRouter from the companion T35 finding) sits on top.

**Implication:** the prior file's pre-condition "v11 closure merged" can be relaxed to "v11 §8 ACCEPTED (already done)". T34 is no longer gated on v11 closure landing — it can ship independently on the T34 branch.

### A2.2 Companion finding: T35 Tokn Router Contract

This session also produced `findings/2026-06-20-T35-tokn-router-contract.md` (262 lines), which drafts a `TokenRouter` trait for `KooshaPari/Tokn` (Rust). Cross-reference material for T34 §6.5:

- T35 §6: "Argis gateway... the `intelligentrouter` plugin can populate `RoutingHints.preferred_signer_kid` after the LLM-side routing decision is made" — **depends on T34.4 (intelligentrouter migration) landing first**. T34 is therefore a **pre-condition for T35.4**.
- The decision to put the decision layer in Phenotype space (v11 §8 Option B) means T34's `intelligentrouter` migration must expose a clean interface for T35's hints — verify in T34.4 review that `intelligentrouter`'s decision data is accessible to the host process (not just inside the plugin).

### A2.3 Verification pass — per-plugin, this session

I read each plugin's source and confirmed the prior file's assessments hold:

| Plugin             | Prior file's assessment            | This session's read                                               | Consistent? |
| :----------------- | :--------------------------------- | :--------------------------------------------------------------- | :---------- |
| `intelligentrouter`| YELLOW (T34 covers it)              | Read `decision.go`: uses `BifrostRequest`, `ChatRequest`, `ChatTool`, `Plugin` | YES        |
| `smartfallback`    | YELLOW + RED test                  | Read `fallback.go`: tests reference `NewExponentialBackoff` (production is `NewExponentialBackoffStrategy`), `NewBudgetStrategy` (missing), `TaskTypeCodeGen` (missing), `TaskRuleEngine.ClassifyTask/GetFallbacksForTask` (methods not present) | YES        |
| `learning`         | RED (production + test mismatch)   | Read `learning.go`: defines 2-arg `PostHook`; `learning_test.go` calls 3-arg `PostHook` — confirmed pre-existing mismatch | YES        |
| `toolrouter`       | YELLOW (T34 covers it)              | Read `plugin.go`: uses `Plugin`, `BifrostRequest`, `ChatTool`, `PluginShortCircuit` | YES        |
| `contentsafety`    | YELLOW (T34 covers it)              | Read `plugin.go`: uses `Plugin`, `BifrostError`, `ChatResponse`, `Content` | YES        |
| `voyage`           | YELLOW (T34 covers it)              | Read `plugin.go`: uses `EmbeddingRequest`, `EmbeddingResponse`, `Usage`, `BifrostError` | YES        |
| `contextfolding`   | YELLOW (T34 covers it)              | Read `folding.go`: uses `Message`, `ChatMessage`, `BifrostRequest`, `Plugin` | YES        |
| `promptadapter`    | GREEN (no Bifrost surface)          | Confirmed: no `bifrost/core/schemas` import                       | YES        |
| `researchintel`    | GREEN (no Bifrost surface)          | Confirmed: no `bifrost/core/schemas` import                       | YES        |

**One minor clarification from this session:** `intelligentrouter` is at `plugins/intelligentrouter/decision.go` (not `plugin.go` as the prior file implies in §4 column "Uses Bifrost types"). Same for `contextfolding` (`folding.go`) and `smartfallback` (`fallback.go`). The prior file's per-plugin severity table does not specify filenames, so this is a no-op correction.

### A2.4 No new blockers discovered

Nothing in this session's read changed the prior file's verdict: T34 is a ~2.5-hour mechanical migration on MacBook, with the smartfallback test rewrite (T34.1) as the only real new-work item.

## A3. Action items unchanged from prior file

The prior file's §6 (Concrete T34 execution steps) stands as-is. No revisions needed based on this session's verification.

## A4. Cross-references

- Primary file: `findings/2026-06-20-T34-bifrost-bump-prep.md` (191 lines, prior session).
- Companion finding (this session): `findings/2026-06-20-T35-tokn-router-contract.md` (262 lines).
- Monorepo AGENTS.md (this turn): v11 §8 ACCEPTED; T34 no longer gated on v11 closure.
- ADR-001 (NetScript DELETE — does NOT name Tokn; the T35 framing is a v11 §8 Option B inference).

---

**End of T34 addendum.**
