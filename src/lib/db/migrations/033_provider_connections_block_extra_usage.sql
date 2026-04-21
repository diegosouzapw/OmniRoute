-- 033_provider_connections_block_extra_usage.sql
-- Compatibility marker only.
--
-- The provider_connections.block_extra_usage column is provisioned defensively
-- by core init/upgrade paths because historical releases shipped conflicting
-- migration numbering in the 026-032 range. Keeping this migration as a no-op
-- ensures fresh databases record the version while upgraded databases avoid
-- duplicate ALTER TABLE attempts.

SELECT 1;
