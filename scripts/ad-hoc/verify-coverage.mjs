// Verificacao de cobertura do plano da mesh.
// Envs: BOT_URL, BOT_TOKEN. Uso: node verify-coverage.mjs <plano.json>
import { readFileSync } from "node:fs";
import { env } from "node:process";

const BOT_URL = env.BOT_URL;
const BOT_TOKEN = env.BOT_TOKEN;
const FILTER = "platform=discord&language=en&direct=only";

const plan = JSON.parse(readFileSync(process.argv[2], "utf8"));

const res = await fetch(BOT_URL + "/internal/bridge/questions?" + FILTER, {
  headers: { Authorization: "Bearer " + BOT_TOKEN },
});
const json = await res.json();
const pending = json.data || [];

const gaps = [];
const amb = [];

for (const m of pending) {
  const t = (m.text || "").toLowerCase();
  const hits = plan.filter((e) => t.includes(e.match.toLowerCase()));
  if (hits.length === 0) {
    gaps.push(m.id + " :: " + t.slice(0, 80));
  } else if (hits.length > 1) {
    const names = hits.map((h) => h.bucket + ":" + h.match).join(" | ");
    amb.push(m.id + " :: " + names + " :: " + t.slice(0, 50));
  }
}

console.log("pendentes:", pending.length, "| plano:", plan.length);
console.log("\n[GAPS] sem match (" + gaps.length + "):");
for (const g of gaps) console.log("  -", g);
console.log("\n[AMB] >1 match (" + amb.length + "):");
for (const a of amb) console.log("  -", a);
