-- upstream_status: HTTP status the provider actually returned for the logged request.
-- NULL when no response was received (network error, local refusal). No index: not a
-- query dimension.
ALTER TABLE proxy_logs ADD COLUMN upstream_status INTEGER;
