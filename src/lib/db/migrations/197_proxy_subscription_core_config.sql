-- 197_proxy_subscription_core_config.sql
-- Opt-in core-config path for proxy subscriptions: when set, each sync
-- renders the local-core configuration beside the adopted file
-- (`<path>.generated`). Purely additive: no backfill, no index, existing
-- rows read NULL (no generation, current behavior unchanged).
-- The switch-kind column records why the last selector switch fired
-- (same additive posture: NULL means unknown, current rows unaffected).

ALTER TABLE proxy_subscriptions ADD COLUMN core_config_path TEXT;
ALTER TABLE proxy_subscriptions ADD COLUMN selector_last_switch_kind TEXT;
