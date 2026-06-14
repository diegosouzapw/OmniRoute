// Trae SOLO auth diagnostic — probes the live API with your token across several
// Authorization variants, so we can see which one (if any) the server accepts.
//
// Usage:
//   node scripts/ad-hoc/diag-trae-auth.mjs <YOUR_CLOUD_IDE_JWT>
//   TRAE_TOKEN=eyJ... node scripts/ad-hoc/diag-trae-auth.mjs
//
// Paste ONLY the token value (no "Cloud-IDE-JWT " prefix). The token is never
// printed in full; only its length + last 6 chars are shown for sanity.

const token = (process.argv[2] || process.env.TRAE_TOKEN || "").trim();
if (!token) {
  console.error("No token. Pass it as arg or set TRAE_TOKEN.");
  process.exit(1);
}
console.log(`token: len=${token.length} …${token.slice(-6)}`);

const BASE = "https://core-normal.trae.ai/api/remote/v1";
const MODELS = `${BASE}/models?functions=solo_agent_remote,solo_work_remote`;

const commonHeaders = {
  "Content-Type": "application/json",
  "X-Trae-Client-Type": "web",
  "X-Preferenced-Language": "en",
  "x-user-region": "US",
  Referer: "https://solo.trae.ai/",
  "User-Agent":
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 " +
    "(KHTML, like Gecko) Chrome/148.0.0.0 Safari/537.36",
};

// Each variant = a set of auth-bearing headers to try.
const variants = [
  {
    name: "Authorization: Cloud-IDE-JWT <t>",
    headers: { Authorization: `Cloud-IDE-JWT ${token}` },
  },
  { name: "Authorization: Bearer <t>", headers: { Authorization: `Bearer ${token}` } },
  { name: "Authorization: <t> (raw)", headers: { Authorization: token } },
  { name: "Cloud-IDE-JWT: <t> (header)", headers: { "Cloud-IDE-JWT": token } },
  { name: "x-cloud-ide-jwt: <t>", headers: { "x-cloud-ide-jwt": token } },
  { name: "x-cloud-ide-token: <t>", headers: { "x-cloud-ide-token": token } },
];

async function probe(label, url, method, headers) {
  try {
    const res = await fetch(url, {
      method,
      headers: { ...commonHeaders, ...headers },
      body:
        method === "POST"
          ? JSON.stringify({ mode: "code", env: "remote", origin: "web" })
          : undefined,
    });
    const text = await res.text();
    const snippet = text.replace(/\s+/g, " ").slice(0, 160);
    const ok = res.ok && !/"code"\s*:\s*1001/.test(text) && !/not able to authenticate/i.test(text);
    console.log(`${ok ? "✅" : "❌"} [${res.status}] ${label}\n     ${snippet}`);
    return ok;
  } catch (e) {
    console.log(`💥 ${label} → ${e?.message || e}`);
    return false;
  }
}

console.log(`\n=== GET ${MODELS} ===`);
let anyOk = false;
for (const v of variants) {
  const ok = await probe(v.name, MODELS, "GET", v.headers);
  anyOk = anyOk || ok;
}

console.log(`\n=== POST ${BASE}/chat_sessions (only the first auth variant, sanity) ===`);
await probe(variants[0].name, `${BASE}/chat_sessions`, "POST", variants[0].headers);

console.log(
  anyOk
    ? "\n→ At least one variant authenticated. Tell me which ✅ line, I'll set the executor to it."
    : "\n→ No header-only variant worked. The web client likely authenticates via a COOKIE, not a\n" +
        "  bearer header. Next step: in DevTools → Network, right-click a request to\n" +
        "  core-normal.trae.ai → Copy → Copy as cURL, and paste it here (redact the token). That\n" +
        "  shows the exact auth header/cookie the server actually accepts."
);
