-- egress_ip: no index by design (not a query dimension); (proxy_host, proxy_port) reads are window-bounded via idx_pl_timestamp — YAGNI
ALTER TABLE proxy_logs ADD COLUMN egress_ip TEXT;