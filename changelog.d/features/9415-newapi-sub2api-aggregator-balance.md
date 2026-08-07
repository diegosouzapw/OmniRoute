---
kind: feature
ref: "#9415"
---

New-API / One-API / Sub2API aggregator balance detection for compatible nodes. When a compatible provider node has the "Aggregator Gateway" toggle enabled, OmniRoute will query the aggregator's `/api/user/self` endpoint to detect the account balance. The dashboard shows the balance badge and quota-preflight routing skips exhausted accounts. The feature is gated by the `NEWAPI_AGGREGATOR_BALANCE` feature flag (default: off). A custom `quotaPerUnit` override is supported for aggregators that use a different rate than the default 500000 units/$1.
