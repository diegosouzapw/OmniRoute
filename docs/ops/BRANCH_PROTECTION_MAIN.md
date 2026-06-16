# Branch protection — `main` (OpenSSF Scorecard: Branch-Protection)

Owner action. Apply via Settings → Branches → Add rule, or:

```bash
gh api -X PUT repos/diegosouzapw/OmniRoute/branches/main/protection \
  --input - <<'JSON'
{ "required_status_checks": { "strict": true, "contexts": ["Quality Ratchet", "Quality Gates (Extended)", "Fast Quality Gates"] },
  "enforce_admins": false,
  "required_pull_request_reviews": { "required_approving_review_count": 0, "dismiss_stale_reviews": true },
  "restrictions": null,
  "required_linear_history": false,
  "allow_force_pushes": false,
  "allow_deletions": false }
JSON
```

Lifts Scorecard Branch-Protection from 0. `enforce_admins:false` keeps the existing
forward-merge flow workable; tighten to `true` once stable.
