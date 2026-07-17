# SHA-Pin Audit — 2026-06-08

Workflow SHA-pin audit flagged this repo as highest-impact.

- 30 non-SHA-pinned action uses
- 13 workflows missing `permissions:` block
- 30 workflows missing `concurrency:` block

Follow-up: pin all `uses: ...@<ref>` to `uses: ...@<sha>`.
