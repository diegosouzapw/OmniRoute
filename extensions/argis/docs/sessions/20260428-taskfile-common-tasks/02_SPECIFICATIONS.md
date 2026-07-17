# Specifications

Required behavior:
- `build` builds the detected language.
- `test` runs the detected language test command.
- `lint` runs the detected language linter.
- `clean` removes common build/test artifacts for the detected language.

Language detection:
- Prefer `go` when `go.mod` exists at the repo root.
- Fall back to `python` when `pyproject.toml` exists at the repo root.
- Fall back to `node` when `package.json` is present at the repo root.
- Fail clearly when no supported language is detected.
