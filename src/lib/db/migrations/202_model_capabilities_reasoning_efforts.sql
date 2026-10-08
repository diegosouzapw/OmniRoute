-- 202_model_capabilities_reasoning_efforts.sql
--
-- models.dev publishes a model's reasoning tiers as reasoning_options
-- [{ type: "effort", values: [...] }]. The sync stored only the boolean
-- `reasoning` flag, so an imported model knew it could think but not which
-- depths it accepts. Keep the tiers next to the flag, as a JSON array.
-- NULL means the catalog declared no tier list.

ALTER TABLE model_capabilities ADD COLUMN reasoning_efforts TEXT DEFAULT NULL;
