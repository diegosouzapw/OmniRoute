-- correlation_id: request id shared with call_logs.correlation_id, so an
-- operator can join proxy attempts to the request that caused them. NULL for
-- legacy rows and whenever the attribution flag is off. No index: the join
-- starts from call_logs, which already indexes correlation_id.
ALTER TABLE proxy_logs ADD COLUMN correlation_id TEXT;
