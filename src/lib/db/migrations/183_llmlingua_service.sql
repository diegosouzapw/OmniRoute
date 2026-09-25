-- Migration 183: Seed version_manager row for the LLMLingua embedded service.
--
-- LLMLingua (npm @atjsh/llmlingua-2, a JS/TS port of Microsoft's LLMLingua-2
-- prompt-compression algorithm) is managed via the ServiceSupervisor
-- framework, same shape as Bifrost (115) and Mux (114). The sidecar HTTP
-- endpoint lets open-sse/services/compression/engines/llmlingua/index.ts
-- dispatch prompt compression over HTTP instead of the in-process worker
-- thread. Seeded with status='not_installed' so the bootstrap loop skips it
-- until the user installs via /api/services/llmlingua/install.

INSERT OR IGNORE INTO version_manager
  (tool, status, port, auto_start, auto_update, provider_expose)
VALUES
  ('llmlingua', 'not_installed', 20135, 0, 0, 0);
