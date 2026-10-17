-- 206_proxy_subscription_selector_last_switch_by_selector.sql
-- Per-selector last-switch trace for proxy subscriptions: the four
-- `selector_last_switch_*` columns keep the subscription-wide summary of the
-- most recent switch, while this JSON column keeps one entry per selector
-- tag (`{ "<tag>": { at, result, member, kind } }`) so two selectors of one
-- subscription no longer overwrite each other's trace.
-- Purely additive: no backfill, no index, existing rows read NULL.

ALTER TABLE proxy_subscriptions ADD COLUMN selector_last_switch_by_selector TEXT;
