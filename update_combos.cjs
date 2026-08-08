const Database = require('better-sqlite3');

const db = new Database('/Users/work/.omniroute/storage.sqlite');
const combos = db.prepare("SELECT id, name, data FROM combos").all();
const now = new Date().toISOString();

const modelsMap = {
  'coding': [
    { provider: 'deepseek', model: 'deepseek-coder' },
    { provider: 'mistral', model: 'codestral-latest' },
    { provider: 'groq', model: 'llama-3.1-70b-versatile' }
  ],
  'free-agent': [
    { provider: 'gemini', model: 'gemini-2.0-flash' },
    { provider: 'groq', model: 'llama-3.1-70b-versatile' },
    { provider: 'nvidia', model: 'meta/llama-3.1-70b-instruct' }
  ],
  'smart': [
    { provider: 'gemini', model: 'gemini-2.5-pro' },
    { provider: 'deepseek', model: 'deepseek-chat' }
  ],
  'fast-small': [
    { provider: 'groq', model: 'llama-3.1-8b-instant' },
    { provider: 'gemini', model: 'gemini-2.0-flash-lite' }
  ],
  'free-reasoning': [
    { provider: 'openrouter', model: 'deepseek/deepseek-r1:free' },
    { provider: 'nvidia', model: 'deepseek-ai/deepseek-r1' }
  ],
  'fallback-all': [
    { provider: 'gemini', model: 'gemini-2.0-flash' },
    { provider: 'groq', model: 'llama-3.1-70b-versatile' }
  ]
};

for (const row of combos) {
  try {
    const data = JSON.parse(row.data);
    if (modelsMap[row.name]) {
      data.models = modelsMap[row.name];
      db.prepare(`UPDATE combos SET data = ?, updated_at = ? WHERE id = ?`)
        .run(JSON.stringify(data), now, row.id);
      console.log(`Updated combo '${row.name}' with ${data.models.length} models.`);
    }
  } catch(e) {
    console.log(`Error updating ${row.name}: ${e.message}`);
  }
}
console.log("Done.");
