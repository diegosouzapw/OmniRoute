---
title: "Ochrona gałęzi — main"
---

# Ochrona gałęzi — `main` (OpenSSF Scorecard: Branch-Protection)

Akcja właściciela. Zastosuj przez Settings → Branches → Add rule, albo:

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

Podnosi Scorecard Branch-Protection z 0. `enforce_admins:false` zachowuje działający
przepływ forward-merge; zaostrz do `true`, gdy będzie stabilnie.
