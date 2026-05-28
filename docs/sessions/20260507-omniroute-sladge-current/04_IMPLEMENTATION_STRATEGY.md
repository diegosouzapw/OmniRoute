# Implementation Strategy

## Approach

Keep the implementation intentionally narrow:

- Add a Markdown badge line after the existing top README badge.
- Avoid touching generated assets, package metadata, provider logic, and
  localized README variants.
- Store session evidence in the canonical session-doc structure.

## Validation Strategy

Use lightweight hygiene first, then repo-native npm checks where dependencies
are available:

- `git diff --check`
- README badge search
- `npx prettier --check README.md docs/sessions/20260507-omniroute-sladge-current/*.md`
- available npm checks such as lint, typecheck, and build
