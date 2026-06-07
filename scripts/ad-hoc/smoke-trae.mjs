// End-to-end smoke test: drives TraeExecutor against the real Trae API with your
// JWT from trae_solo.env (kept outside the repo), printing content + usage.
// Run:  node --import tsx/esm scripts/ad-hoc/smoke-trae.mjs

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const envPath = path.resolve(__dirname, "../../../trae_solo.env");
if (!fs.existsSync(envPath)) {
  console.error(`Не найден ${envPath}. Положи туда TRAE_TOKEN= и TRAE_WEB_ID= и т.д.`);
  process.exit(1);
}
const cfg = Object.fromEntries(
  fs
    .readFileSync(envPath, "utf8")
    .split("\n")
    .filter((l) => l && !l.startsWith("#") && l.includes("="))
    .map((l) => {
      const i = l.indexOf("=");
      return [l.slice(0, i), l.slice(i + 1)];
    })
);

const { TraeExecutor } = await import("../../open-sse/executors/trae.ts");
const ex = new TraeExecutor();

const credentials = {
  accessToken: cfg.TRAE_TOKEN,
  providerSpecificData: {
    webId: cfg.TRAE_WEB_ID || "",
    bizUserId: cfg.TRAE_BIZ_USER_ID || "",
    userUniqueId: cfg.TRAE_USER_UNIQUE_ID || "",
    scope: cfg.TRAE_SCOPE || "marscode-us",
    tenant: cfg.TRAE_TENANT || "marscode",
    region: cfg.TRAE_REGION || "US-East",
    aiRegion: cfg.TRAE_AIREGION || cfg.TRAE_REGION || "US-East",
    appLanguage: cfg.TRAE_APP_LANGUAGE || "en",
    appVersion: cfg.TRAE_APP_VERSION || "1.0.0.1229",
  },
};

const model = process.argv[2] || "auto";
const prompt = process.argv.slice(3).join(" ") || "Ответь одним словом: столица Франции?";

console.log(`[smoke] model=${model} prompt=${JSON.stringify(prompt)}`);
const { response } = await ex.execute({
  model,
  body: { messages: [{ role: "user", content: prompt }] },
  stream: false,
  credentials,
});
const text = await response.text();
if (response.status !== 200) {
  console.error(`[smoke] HTTP ${response.status}\n${text}`);
  process.exit(1);
}
const json = JSON.parse(text);
console.log("content:", JSON.stringify(json.choices?.[0]?.message?.content));
console.log("usage:  ", json.usage);
