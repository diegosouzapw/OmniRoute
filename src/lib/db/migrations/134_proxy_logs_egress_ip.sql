-- egress_ip: no index by design (not a query dimension) — YAGNI
ALTER TABLE proxy_logs ADD COLUMN egress_ip TEXT;