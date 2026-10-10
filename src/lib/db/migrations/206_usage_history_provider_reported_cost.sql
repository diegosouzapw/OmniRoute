-- Persist the exact provider-reported USD cost of a request (and, for credit-metered
-- providers, the credits it was derived from) without replacing the display token
-- counts. NULL means the provider reported no cost and the row is priced from tokens.
ALTER TABLE usage_history ADD COLUMN provider_credits REAL CHECK(provider_credits >= 0);
ALTER TABLE usage_history ADD COLUMN provider_cost_usd REAL CHECK(provider_cost_usd >= 0);
