# Session Overview

Goal: ensure the repository has a Taskfile with the common tasks `build`, `test`, `lint`, and `clean`
and that the task behavior is selected from the detected repo language.

Success criteria:
- `Taskfile.yml` provides the requested common tasks.
- Language detection resolves the primary repo language from manifests at the repo root.
- The change is validated locally and published in a PR.
