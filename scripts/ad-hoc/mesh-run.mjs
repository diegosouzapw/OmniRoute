// Runner generico para a mesh. Recebe um arquivo JSON de plano:
// [
//   { "bucket": "A"|"B"|"C", "match": "<substring e lowercase do texto>", "text": "<resposta>" }
// ]
// Fases: A=reply (answered), B=notice mode:note (fica pending), C=recusa note + mark ignored (por ultimo).
// Envs: BOT_URL, BOT_TOKEN. Uso: node mesh-run.mjs <plano.json>
import { readFileSync } from "node:fs";
import { env } from "node:process";

const BOT_URL = env.BOT_URL;
const BOT_TOKEN = env.BOT_TOKEN;
const FILTER = "platform=discord&language=en&direct=only";
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function api(path, opts = {}) {
  const res = await fetch(BOT_URL + path, {
    ...opts,
    headers: {
      Authorization: "Bearer " + BOT_TOKEN,
      "Content-Type": "application/json",
      ...(opts.headers || {}),
    },
  });
  return { status: res.status, json: await res.json().catch(() => null) };
}

const planPath = process.argv[2];
const plan = JSON.parse(readFileSync(planPath, "utf8"));

async function main() {
  console.log("Fetching pendentes (" + FILTER + ")...");
  const { json } = await api("/internal/bridge/questions?" + FILTER);
  const pending = (json && json.data) || [];
  console.log("-> " + pending.length + " pendentes");

  const out = { A: [], B: [], C: [], U: [] };

  // fase 1-2: A (reply) e B (notice)
  for (const msg of pending) {
    const t = (msg.text || "").toLowerCase();
    const hit = plan.find((e) => t.includes(e.match.toLowerCase()));
    if (!hit) {
      out.U.push(msg.id + " :: " + (msg.text || "").slice(0, 60));
      continue;
    }
    if (hit.bucket === "A") {
      const r = await api("/internal/bridge/reply", {
        method: "POST",
        body: JSON.stringify({ messageId: msg.id, text: hit.text }),
      });
      out.A.push(r.status + " " + msg.id);
    } else if (hit.bucket === "B") {
      const r = await api("/internal/bridge/reply", {
        method: "POST",
        body: JSON.stringify({ messageId: msg.id, text: hit.text, mode: "note" }),
      });
      out.B.push(r.status + " " + msg.id);
    } else if (hit.bucket === "C") {
      out.C.push(msg.id);
    }
    await sleep(1000);
  }

  // fase 3: bucket C — nota de recusa + mark ignored (por último)
  for (const id of out.C) {
    const msg = pending.find((m) => m.id === id);
    const t = (msg.text || "").toLowerCase();
    const hit = plan.find((e) => e.bucket === "C" && t.includes(e.match.toLowerCase()));
    if (!hit) continue;
    const note = await api("/internal/bridge/reply", {
      method: "POST",
      body: JSON.stringify({ messageId: id, text: hit.text, mode: "note" }),
    });
    const mark = await api("/internal/bridge/mark", {
      method: "POST",
      body: JSON.stringify({ messageIds: [id], status: "ignored", ref: "auto-declined" }),
    });
    out.C[out.C.indexOf(id)] =
      "note:" + note.status + " mark:" + (mark.json && mark.json.updated) + " " + id;
    await sleep(1000);
  }

  console.log("\n=== RESUMO ===");
  console.log("A (respondidas):", out.A);
  console.log("B (notices, pending):", out.B);
  console.log("C (recusa+ignoradas):", out.C);
  console.log("U (nao classif., relatar):", out.U);
}

main().catch((e) => {
  console.error("ERRO:", e);
  process.exit(1);
});
