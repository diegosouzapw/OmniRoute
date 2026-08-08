import json
import sqlite3
import os
from datetime import datetime

creds_file = '/Users/work/.gemini/oauth_creds.json'
db_file = '/Users/work/.omniroute/storage.sqlite'

if not os.path.exists(creds_file):
    print(f"Credentials file not found: {creds_file}")
    exit(1)

with open(creds_file, 'r', encoding='utf-8') as f:
    creds = json.load(f)

conn = sqlite3.connect(db_file)
cursor = conn.cursor()

provider = 'antigravity'
auth_type = 'oauth'
name = 'Antigravity'
email = creds.get('email', 'oleksiibarsuk@gmail.com')
priority = 1
is_active = 1
access_token = creds.get('access_token')
refresh_token = creds.get('refresh_token')
scope = creds.get('scope')
id_token = creds.get('id_token')
token_type = creds.get('token_type', 'Bearer')
now = datetime.utcnow().isoformat() + 'Z'

# Check if already exists
cursor.execute('SELECT id FROM provider_connections WHERE provider = ?', (provider,))
row = cursor.fetchone()

if row:
    print(f"Connection for provider '{provider}' already exists. Updating...")
    sql = """
        UPDATE provider_connections 
        SET access_token = ?, refresh_token = ?, scope = ?, id_token = ?, token_type = ?, is_active = 1, test_status = 'active', updated_at = ?
        WHERE provider = ?
    """
    cursor.execute(sql, (access_token, refresh_token, scope, id_token, token_type, now, provider))
else:
    print(f"Inserting new connection for provider '{provider}'...")
    sql = """
        INSERT INTO provider_connections (
            id, provider, auth_type, name, email, priority, is_active, 
            access_token, refresh_token, scope, id_token, token_type, 
            test_status, created_at, updated_at
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    """
    cursor.execute(sql, (
        'antigravity-001', provider, auth_type, name, email, priority, is_active,
        access_token, refresh_token, scope, id_token, token_type,
        'active', now, now
    ))

conn.commit()
print("Success! Database updated successfully.")
conn.close()
