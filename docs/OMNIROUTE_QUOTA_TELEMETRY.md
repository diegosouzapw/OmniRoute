# OmniRoute Quota Telemetry

OmniRoute separates provider quota telemetry from Ghostlight accounting.

## Truthful states

- `healthy` means a source reported usable remaining capacity.
- `approaching_limit` means a source reported remaining capacity at or below the configured threshold.
- `exhausted` is emitted only when a source reports zero capacity or usage at its limit.
- `unavailable` means a supported source failed to return data.
- `unknown` means no supported source exists or no provider limit is known.

Unknown is not exhausted and does not disable a provider.

Sources are preferred in this order: official provider API, authenticated usage API, explicitly mapped response headers, administrator configuration, local estimates, unknown. Local estimates are never presented as provider billing data.

Response headers are parsed only through an explicit provider mapping. Generic header names are not assumed globally.
