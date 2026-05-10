import Database from 'better-sqlite3';
import path from 'path';
import os from 'os';

const SQLITE_FILE = path.join(process.cwd(), 'data', 'storage.sqlite');

console.log('Checking database at:', SQLITE_FILE);

const db = new Database(SQLITE_FILE, { readonly: true });

try {
    const rows = db.prepare(`
        SELECT api_key_id, api_key_name, COUNT(*) as count, MAX(timestamp) as last_used
        FROM usage_history
        GROUP BY api_key_id, api_key_name
        ORDER BY count DESC
    `).all();

    console.log('Top Usage Entries:');
    console.table(rows);

    const keys = db.prepare(`
        SELECT id, name, key_prefix, machine_id
        FROM api_keys
    `).all();

    console.log('All API Keys:');
    console.table(keys);

} catch (err) {
    console.error('Error:', err.message);
} finally {
    db.close();
}
