-- GROUP BY provider support. (provider,timestamp) backs the bare
-- GROUP BY provider in getProviderMetrics; (request_type,provider)
-- backs WHERE request_type='search' GROUP BY provider. Non-covering for the
-- real queries (duration/status outside the index) by design — no third index.
CREATE INDEX IF NOT EXISTS idx_cl_provider_timestamp ON call_logs(provider, timestamp);
CREATE INDEX IF NOT EXISTS idx_cl_request_provider ON call_logs(request_type, provider);
