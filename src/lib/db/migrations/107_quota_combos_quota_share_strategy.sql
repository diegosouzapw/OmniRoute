-- Migration 107: activate the dedicated quota-share strategy on existing qtSd/ combos
--
-- Fase 3 #9 introduced a dedicated "quota-share" routing strategy and changed
-- syncQuotaCombos() to mint the auto-generated qtSd/ combos with it (replacing the
-- previous "fill-first"). syncQuotaCombos only re-runs when a pool/connection is
-- created or edited, so combos minted BEFORE the #9 deploy keep their old
-- "fill-first" strategy and never exercise the new DRR + P2C + per-model gating
-- engine. This migration aligns those pre-existing combos with the new default.
--
-- Scope is deliberately narrow:
--   - name LIKE 'qtSd/%'              → only the auto-minted, hidden quota-share combos
--   - strategy = 'fill-first'         → only the stale ones (leaves anything already
--                                       on quota-share / a user-chosen strategy untouched)
-- A user's own combo can never match 'qtSd/%' (that prefix is reserved for the
-- quota-share engine), so no human-authored routing choice is overwritten.
--
-- Idempotent: re-running is a no-op once every qtSd/ combo is on quota-share.
--
-- Part of: Group B — Quota Sharing Engine, Fase 3 #9 (activation follow-up).

UPDATE combos
SET data = json_set(data, '$.strategy', 'quota-share'),
    updated_at = datetime('now')
WHERE name LIKE 'qtSd/%'
  AND json_extract(data, '$.strategy') = 'fill-first';
