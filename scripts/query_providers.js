const Database = require('better-sqlite3');
const path = require('path');
const dbPath = path.resolve(process.env.USERPROFILE, '.omniroute', 'storage.sqlite');
try {
  const db = new Database(dbPath, { readonly: true });
  const rows = db.prepare(`SELECT id, provider, name, auth_type, is_active, api_key IS NOT NULL as has_api_key, access_token IS NOT NULL as has_access_token, refresh_token IS NOT NULL as has_refresh, last_error, test_status, provider_specific_data, updated_at FROM provider_connections WHERE provider LIKE '%anthropic%' OR provider='anthropic' OR provider LIKE '%claude%' OR provider='claude'`).all();
  console.log(JSON.stringify(rows, null, 2));
  db.close();
} catch (err) {
  console.error('ERROR', err && err.message);
  process.exit(2);
}
