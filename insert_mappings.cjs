const Database = require('better-sqlite3');
const { v4: uuidv4 } = require('uuid');

const db = new Database('/Users/work/.omniroute/storage.sqlite');
const combos = db.prepare("SELECT id, name FROM combos").all();
const now = new Date().toISOString();

for (const combo of combos) {
  const mappingId = uuidv4();
  // Map the combo name directly as the pattern
  try {
    db.prepare(`
      INSERT INTO model_combo_mappings 
      (id, pattern, combo_id, priority, enabled, description, created_at, updated_at)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `).run(mappingId, combo.name, combo.id, 100, 1, `Auto-mapped combo: ${combo.name}`, now, now);
    console.log(`Mapped pattern '${combo.name}' to combo '${combo.name}'`);
  } catch(e) {
    console.log(`Error mapping ${combo.name}: ${e.message}`);
  }
}
console.log("Done.");
