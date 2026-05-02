# Task 21 - Preserve Typst, LaTeX, Math, Frontmatter, Headings, and Tables

> **Priority**: P2
> **Effort**: 90 min
> **Dependencies**: Tasks 04, 05, 08
> **Branch**: `release/v3.7.9`

---

## Problem

Task 08 ports the main `caveman-shrink` protected patterns. The upstream v1.7.0 review
also highlights additional protected content classes that matter for docs and memory
files:

- Typst
- LaTeX
- math blocks / inline math
- markdown frontmatter
- headings
- tables

OmniRoute's current preservation layer does not explicitly protect these structures.

---

## Solution

Extend preservation and validation to protect document structures that compression should
not corrupt.

Protect:

- YAML frontmatter at the start of markdown files/messages:
  - `---\n...\n---`
- Markdown headings:
  - preserve heading marker and heading text exactly by default;
  - optionally compress only body text under headings.
- Markdown tables:
  - preserve pipe structure and alignment rows;
  - optionally compress cell prose only if structure remains valid.
- LaTeX blocks:
  - `\begin{...}...\end{...}`
  - `\[...\]`
- Math blocks:
  - `$$...$$`
- Typst code/math-looking sections where safe detection is possible.

Be conservative. If unsure whether text is structural, preserve it.

---

## Files

- `open-sse/services/compression/preservation.ts`
- `open-sse/services/compression/validation.ts`
- `tests/unit/compression/caveman-preservation.test.ts`
- `tests/unit/compression/validation.test.ts`
- `tests/golden-set/compression-caveman-v2.test.ts`

---

## Tests

Add tests for:

- frontmatter round-trip exact;
- headings unchanged;
- markdown table separators and column counts unchanged;
- `$$...$$` exact preservation;
- `\begin{equation}...\end{equation}` exact preservation;
- no false positive for normal dollar amounts like `$10`.

---

## Acceptance Criteria

- Compression never changes protected structures.
- Validation catches structure loss and falls back to original.
- Existing Caveman rules still apply to normal prose around protected structures.

---

## Rollback

Remove the extra protected patterns if false positives are too broad. Keep validation
warnings so future tuning remains visible.
