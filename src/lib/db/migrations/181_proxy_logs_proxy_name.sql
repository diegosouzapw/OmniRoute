-- proxy_name: registry name of the proxy that served the logged request, so the
-- Proxy Logs page can tell entries apart when several registry entries share one
-- gateway (host:port). NULL for direct/legacy rows. No index: not a query dimension.
ALTER TABLE proxy_logs ADD COLUMN proxy_name TEXT;
