-- Migration 182: Seed version_manager row for sing-box embedded service
--
-- sing-box is a supervised TPROXY sidecar (see src/lib/services/installers/singbox.ts),
-- not an LLM provider, so provider_expose stays 0 (never exposes models for routing) and
-- auto_update stays 0 (installer only supports the pinned, checksum-verified release —
-- see SINGBOX_PINNED_VERSION). The row is seeded with status='not_installed' so the
-- bootstrap loop skips it until the user installs via /api/services/singbox/install.

INSERT OR IGNORE INTO version_manager (tool, status, port, auto_start, auto_update, provider_expose)
VALUES ('singbox', 'not_installed', 20140, 0, 0, 0);
