const Database = require('node:sqlite');
const db = new Database.DatabaseSync(process.env.HOME + '/.omniroute/storage.sqlite');

console.log("Deleting iflow connections...");
const stmt = db.prepare("DELETE FROM provider_connections WHERE provider = 'iflow'");
const info = stmt.run();
console.log(`Deleted ${info.changes} rows.`);
