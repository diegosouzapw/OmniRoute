const fs = require("fs");
const path = require("fs");
const sqlite3 = require("sqlite3").verbose();

const credsFile = "/Users/work/.gemini/oauth_creds.json";
const dbFile = "/Users/work/serpentos/packages/omniroute/storage.sqlite";

if (!fs.existsSync(credsFile)) {
  console.error(`Credentials file not found: ${credsFile}`);
  process.exit(1);
}

const creds = JSON.parse(fs.readFileSync(credsFile, "utf8"));

const db = new sqlite3.Database(dbFile, (err) => {
  if (err) {
    console.error(`Could not open database: ${err.message}`);
    process.exit(1);
  }
});

const id = "antigravity-001";
const provider = "antigravity";
const auth_type = "oauth";
const name = "Antigravity";
const email = creds.email || "oleksiibarsuk@gmail.com";
const priority = 1;
const is_active = 1;
const access_token = creds.access_token;
const refresh_token = creds.refresh_token;
const scope = creds.scope;
const id_token = creds.id_token;
const token_type = creds.token_type || "Bearer";
const now = new Date().toISOString();

// Check if already exists
db.get("SELECT id FROM provider_connections WHERE provider = ?", [provider], (err, row) => {
  if (err) {
    console.error(`Error querying table: ${err.message}`);
    process.exit(1);
  }

  if (row) {
    console.log(`Connection for provider ${provider} already exists. Updating...`);
    const sql = `
      UPDATE provider_connections 
      SET access_token = ?, refresh_token = ?, scope = ?, id_token = ?, token_type = ?, is_active = 1, test_status = 'active', updated_at = ?
      WHERE provider = ?
    `;
    db.run(
      sql,
      [access_token, refresh_token, scope, id_token, token_type, now, provider],
      function (err) {
        if (err) {
          console.error(`Error updating connection: ${err.message}`);
          process.exit(1);
        }
        console.log("Successfully updated Antigravity connection in database!");
        db.close();
      }
    );
  } else {
    console.log(`Inserting new connection for provider ${provider}...`);
    const sql = `
      INSERT INTO provider_connections (
        id, provider, auth_type, name, email, priority, is_active, 
        access_token, refresh_token, scope, id_token, token_type, 
        test_status, created_at, updated_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;
    db.run(
      sql,
      [
        id,
        provider,
        auth_type,
        name,
        email,
        priority,
        is_active,
        access_token,
        refresh_token,
        scope,
        id_token,
        token_type,
        "active",
        now,
        now,
      ],
      function (err) {
        if (err) {
          console.error(`Error inserting connection: ${err.message}`);
          process.exit(1);
        }
        console.log("Successfully inserted Antigravity connection into database!");
        db.close();
      }
    );
  }
});
