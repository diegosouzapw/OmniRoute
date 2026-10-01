-- 193_proxy_subscription_selector_control.sql
-- Selector-control columns for proxy subscriptions: opt-in steering of
-- a local Clash/Mihomo core selector group when a member is set aside.
--
--   control_url              — base URL of the core external-controller API
--                              (http/https only, loopback by default, LAN only
--                              via the dedicated allow-list)
--   control_secret_enc       — write-only API secret, stored via encrypt()
--                              (passthrough-plaintext when no
--                              STORAGE_ENCRYPTION_KEY, same posture as
--                              provider credentials), never read back in clear
--   selector_min_gap_seconds — per-(subscription, selector) switch throttle,
--                              clamped [0, 3600], default 60
--   selector_last_switch_at     — ISO timestamp of the last switch attempt
--   selector_last_switch_result — "ok" or the failure reason of that attempt
--   selector_last_switch_member — member name the switch steered to (on success)
--
-- Purely additive: no backfill, no index, existing rows read NULL/60.

ALTER TABLE proxy_subscriptions ADD COLUMN control_url TEXT;
ALTER TABLE proxy_subscriptions ADD COLUMN control_secret_enc TEXT;
ALTER TABLE proxy_subscriptions ADD COLUMN selector_min_gap_seconds INTEGER NOT NULL DEFAULT 60;
ALTER TABLE proxy_subscriptions ADD COLUMN selector_last_switch_at TEXT;
ALTER TABLE proxy_subscriptions ADD COLUMN selector_last_switch_result TEXT;
ALTER TABLE proxy_subscriptions ADD COLUMN selector_last_switch_member TEXT;
