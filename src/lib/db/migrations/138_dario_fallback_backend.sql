-- Migration 138: Dario failover backend selection for upstream_proxy_config
--
-- Adds `fallback_backend` so a provider whose mode is 'fallback' can choose
-- WHICH embedded proxy handles the retry leg — CLIProxyAPI (the historical,
-- hardcoded behaviour) or Dario (@askalf/dario). Defaults to 'cliproxyapi'
-- so every existing 'fallback' config keeps behaving exactly as it does today
-- (zero behaviour change for anyone not opting in). The new 'dario' value for
-- the `mode` column itself needs no schema change — `mode` is a free TEXT
-- column already ('native' | 'cliproxyapi' | 'dario' | 'fallback').
ALTER TABLE upstream_proxy_config
  ADD COLUMN fallback_backend TEXT NOT NULL DEFAULT 'cliproxyapi';
