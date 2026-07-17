# Testing Strategy

Validation steps:
- `task --list` to confirm the Taskfile parses.
- `task build` to exercise the build path for the detected language.
- `task test` to exercise the test path.
- `task lint` to exercise the lint path.
- `task clean` to confirm language-aware cleanup runs without errors.
