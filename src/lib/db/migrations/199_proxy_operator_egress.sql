-- 199: operator-provided dated egress observations per pool member.
--
-- A pool member's observed address today comes only from the echo probe
-- journal (proxy_logs): wrong as soon as a member changes exit behind its
-- entry point. The operator can push dated observed addresses through the
-- operator-egress route; this table holds them. Read-only for routing: the
-- reader merges the freshest rows with the journal single-address read.
--
-- Keyed by entry point (host, port) + observed address, same normalization as
-- the journal reader (trim, strip one bracket pair, lowercase; port 1-65535).
-- observed_at is ISO text, same convention as the proxy log readers. Growth
-- is bounded at write time (stale purge, per-member cap, total cap), so no
-- background job is needed. Safe to re-run.

CREATE TABLE IF NOT EXISTS proxy_operator_egress (
  host TEXT NOT NULL,
  port INTEGER NOT NULL,
  address TEXT NOT NULL,
  observed_at TEXT NOT NULL,
  PRIMARY KEY (host, port, address)
);

CREATE INDEX IF NOT EXISTS idx_poe_member ON proxy_operator_egress (host, port);
