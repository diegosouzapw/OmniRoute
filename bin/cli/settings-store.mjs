import bcrypt from "bcryptjs";

const MANAGEMENT_PASSWORD_SALT_ROUNDS = 12;

export async function hashManagementPassword(password) {
  return bcrypt.hash(password, MANAGEMENT_PASSWORD_SALT_ROUNDS);
}

export function ensureSettingsSchema(db) {
  db.prepare(
    `CREATE TABLE IF NOT EXISTS key_value (
      namespace TEXT NOT NULL,
      key TEXT NOT NULL,
      value TEXT NOT NULL,
      PRIMARY KEY (namespace, key)
    )`
  ).run();
}

export function updateSettings(db, updates) {
  ensureSettingsSchema(db);
  const insert = db.prepare(
    "INSERT OR REPLACE INTO key_value (namespace, key, value) VALUES ('settings', ?, ?)"
  );
  const tx = db.transaction(() => {
    for (const [key, value] of Object.entries(updates)) {
      insert.run(key, JSON.stringify(value));
    }
  });
  tx();
}

export function getSettings(db) {
  ensureSettingsSchema(db);
  const rows = db.prepare("SELECT key, value FROM key_value WHERE namespace = 'settings'").all();
  const settings = {};
  for (const row of rows) {
    try {
      settings[row.key] = JSON.parse(row.value);
    } catch {
      settings[row.key] = row.value;
    }
  }
  return settings;
}
