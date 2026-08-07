const Database = require('better-sqlite3');
const path = require('path');
const dbPath = path.resolve(process.env.USERPROFILE, '.omniroute', 'storage.sqlite');
try {
  const db = new Database(dbPath, { readonly: true });
  const rows = db.prepare(`SELECT id, provider, name, auth_type, is_active, last_error, test_status, updated_at FROM provider_connections ORDER BY updated_at DESC LIMIT 200`).all();
  console.log(JSON.stringify(rows, null, 2));
  db.close();
} catch (err) {
  console.error('ERROR', err && err.message);
  process.exit(2);
}
