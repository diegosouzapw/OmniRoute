-- Migration 072: enforce free_proxies.pool_proxy_id integrity via trigger
--
-- 068_free_proxies.sql declared `pool_proxy_id TEXT` with a comment claiming it
-- was a foreign key to proxy_registry.id, but the constraint was never emitted
-- and the OmniRoute build does not run with PRAGMA foreign_keys=ON (existing
-- test suites rely on attaching arbitrary string pool IDs without a registry
-- row). To get the operational guarantee that the FK was meant to provide
-- (delete-cascading nulls out dangling references) without breaking those
-- callers, we install a single trigger that fires on proxy_registry DELETE
-- and clears the matching pool_proxy_id rows.
--
-- This intentionally does NOT enforce inserts — application code is now the
-- single writer for the promotion path (`promoteFreeProxyToPool` in db/freeProxies.ts)
-- which inserts both rows in the same SQLite transaction.

DROP TRIGGER IF EXISTS trg_free_proxies_clear_pool_proxy_id;

CREATE TRIGGER trg_free_proxies_clear_pool_proxy_id
AFTER DELETE ON proxy_registry
FOR EACH ROW
BEGIN
  UPDATE free_proxies
  SET pool_proxy_id = NULL,
      in_pool = 0,
      updated_at = datetime('now')
  WHERE pool_proxy_id = OLD.id;
END;
