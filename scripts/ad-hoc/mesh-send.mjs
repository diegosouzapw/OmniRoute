// Helper único para enviar replies/notes no bridge do bot da mesh.
// Lê BOT_URL e BOT_TOKEN do ambiente (nunca embutidos).
// Uso: BOT_URL=... BOT_TOKEN=... node scripts/ad-hoc/mesh-send.mjs <cmd> <json-file|->
// cmd: reply | note
import { readFileSync } from "node:fs";

const [cmd, path] = process.argv.slice(2);
const BOT_URL = process.env.BOT_URL;
const BOT_TOKEN = process.env.BOT_TOKEN;

const input = path === "-" ? readFileSync(0, "utf8") : readFileSync(path, "utf8");
const items = JSON.parse(input);

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function send(item) {
  // endpoint de reply; mode presente => note
  const body = {
    messageId: item.id,
    text: item.text,
    ...(cmd === "note" ? { mode: "note" } : {}),
  };
  const res = await fetch(`${BOT_URL}/internal/bridge/reply`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${BOT_TOKEN}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
  const txt = await res.text();
  console.log(`[${cmd}] ${item.id.slice(0, 12)} → ${res.status} ${txt.slice(0, 80)}`);
}

for (const item of items) {
  try {
    await send(item);
  } catch (e) {
    console.log(`[${cmd}] ${item.id.slice(0, 12)} → ERRO ${e.message}`);
  }
  await sleep(1000); // pace ~1s
}
