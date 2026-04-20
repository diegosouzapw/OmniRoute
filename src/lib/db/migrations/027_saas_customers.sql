CREATE TABLE IF NOT EXISTS saas_plans (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  monthly_token_limit INTEGER NOT NULL DEFAULT 0,
  price_monthly_cents INTEGER NOT NULL DEFAULT 0,
  is_active INTEGER NOT NULL DEFAULT 1,
  allow_all_models INTEGER NOT NULL DEFAULT 1,
  allow_all_combos INTEGER NOT NULL DEFAULT 1,
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS saas_customers (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  company TEXT DEFAULT '',
  status TEXT NOT NULL DEFAULT 'active',
  billing_status TEXT NOT NULL DEFAULT 'active',
  paid_until TEXT,
  extra_token_credits INTEGER NOT NULL DEFAULT 0,
  plan_id TEXT,
  billing_cycle_anchor TEXT NOT NULL,
  notes TEXT DEFAULT '',
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_saas_customers_email ON saas_customers(email);
CREATE INDEX IF NOT EXISTS idx_saas_customers_status ON saas_customers(status);

CREATE TABLE IF NOT EXISTS saas_customer_api_keys (
  id TEXT PRIMARY KEY,
  customer_id TEXT NOT NULL,
  api_key_id TEXT NOT NULL UNIQUE,
  label TEXT DEFAULT '',
  is_active INTEGER NOT NULL DEFAULT 1,
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_saas_keys_customer ON saas_customer_api_keys(customer_id);

CREATE TABLE IF NOT EXISTS saas_customer_model_permissions (
  customer_id TEXT NOT NULL,
  model_id TEXT NOT NULL,
  PRIMARY KEY (customer_id, model_id)
);

CREATE TABLE IF NOT EXISTS saas_customer_combo_permissions (
  customer_id TEXT NOT NULL,
  combo_name TEXT NOT NULL,
  PRIMARY KEY (customer_id, combo_name)
);
