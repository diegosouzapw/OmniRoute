-- Migration 099: Per-proxy address-family egress policy
-- 'auto' (default) lets the OS pick; 'ipv4' forces IPv4-only; 'ipv6' forces
-- all egress through that proxy over IPv6 only (fail-closed).
ALTER TABLE proxy_registry ADD COLUMN family TEXT NOT NULL DEFAULT 'auto';
ALTER TABLE upstream_proxy_config ADD COLUMN family TEXT NOT NULL DEFAULT 'auto';
