-- PR1 adaptive learning: quality axis columns for combo_adaptation_state.
-- Health failures (502/timeout/429/connection reset) drive failures /
-- consecutive_failures / cooldown_until. These columns capture the QUALITY
-- axis — a property of the model, not the infrastructure: empty responses,
-- tool-call participation, emitted tokens and first-pass success. Quality
-- failures never touch the cooldown ladder.
ALTER TABLE combo_adaptation_state ADD COLUMN quality_failures INTEGER NOT NULL DEFAULT 0;
ALTER TABLE combo_adaptation_state ADD COLUMN empty_responses INTEGER NOT NULL DEFAULT 0;
ALTER TABLE combo_adaptation_state ADD COLUMN tool_calls INTEGER NOT NULL DEFAULT 0;
ALTER TABLE combo_adaptation_state ADD COLUMN tool_call_successes INTEGER NOT NULL DEFAULT 0;
ALTER TABLE combo_adaptation_state ADD COLUMN total_tokens INTEGER NOT NULL DEFAULT 0;
ALTER TABLE combo_adaptation_state ADD COLUMN first_pass_successes INTEGER NOT NULL DEFAULT 0;
ALTER TABLE combo_adaptation_state ADD COLUMN first_pass_total INTEGER NOT NULL DEFAULT 0;
