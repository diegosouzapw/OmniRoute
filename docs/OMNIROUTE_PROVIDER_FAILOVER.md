# OmniRoute Provider Failover

Failures are classified before retry decisions are made.

Transient failures such as timeouts, network errors, rate limits, and provider 5xx responses may fail over. Authentication errors, permission errors, invalid requests, unavailable models, and unknown failures are not retried blindly.

The default cross-provider policy allows up to three provider attempts, retries rate limits and timeouts, and keeps administrative disablement separate from temporary circuit state.

Circuit states are `closed`, `open`, and `half_open`. A cooldown schedules a bounded probe; a successful probe closes the circuit and a failed probe reopens it.
