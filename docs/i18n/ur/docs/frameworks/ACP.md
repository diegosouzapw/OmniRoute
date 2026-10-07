# ACP registry and registered CLI launchers (اردو)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/ACP.md) · 🇪🇹 [am](../../../am/docs/frameworks/ACP.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/ACP.md) · 🇦🇿 [az](../../../az/docs/frameworks/ACP.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/ACP.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/ACP.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/ACP.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/ACP.md) · 🇩🇰 [da](../../../da/docs/frameworks/ACP.md) · 🇩🇪 [de](../../../de/docs/frameworks/ACP.md) · 🇬🇷 [el](../../../el/docs/frameworks/ACP.md) · 🇪🇸 [es](../../../es/docs/frameworks/ACP.md) · 🇪🇪 [et](../../../et/docs/frameworks/ACP.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/ACP.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/ACP.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/ACP.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/ACP.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/ACP.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/ACP.md) · 🇮🇱 [he](../../../he/docs/frameworks/ACP.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/ACP.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/ACP.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/ACP.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/ACP.md) · 🇮🇩 [id](../../../id/docs/frameworks/ACP.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/ACP.md) · 🇮🇹 [it](../../../it/docs/frameworks/ACP.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/ACP.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/ACP.md) · 🇰🇭 [km](../../../km/docs/frameworks/ACP.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/ACP.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/ACP.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/ACP.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/ACP.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/ACP.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/ACP.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/ACP.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/ACP.md) · 🇲🇲 [my](../../../my/docs/frameworks/ACP.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/ACP.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/ACP.md) · 🇳🇴 [no](../../../no/docs/frameworks/ACP.md) · 🇮🇳 [or](../../../or/docs/frameworks/ACP.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/ACP.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/ACP.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/ACP.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/ACP.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/ACP.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/ACP.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/ACP.md) · 🇱🇰 [si](../../../si/docs/frameworks/ACP.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/ACP.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/ACP.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/ACP.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/ACP.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/ACP.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/ACP.md) · 🇮🇳 [te](../../../te/docs/frameworks/ACP.md) · 🇹🇭 [th](../../../th/docs/frameworks/ACP.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/ACP.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/ACP.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/ACP.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/ACP.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/ACP.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/ACP.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/ACP.md)

---

OmniRoute، **CLI دریافت**، **مقامی Agent Client Protocol**، اور
**قدیمی stdio adapters** کو الگ رکھتا ہے۔ کسی نصب شدہ binary کا مل جانا اس کی
authentication، model compatibility، یا prompt سنبھالنے کی تیاری کو ثابت نہیں کرتا۔

dashboard، inventory اور custom-agent registration کے لیے `GET /api/acp/agents` اور
`POST /api/acp/agents` استعمال کرتا ہے۔ یہ صرف مقامی management routes ہیں، processes
شروع کرنے یا prompts جمع کرانے کے لیے کوئی public API نہیں ہیں۔ داخلی
`AcpManager` خودکار طور پر HTTP provider fallback نہیں بن جاتا۔

## رجسٹرڈ معاہدے

`config/cli-tools-manifest.json`، پہلے سے شامل launch binaries، arguments، اور backend
modes کے لیے مستند ماخذ ہے۔ registry اپنی definitions اسی manifest سے اخذ کرتی ہے۔
Detection کو 60 سیکنڈ کے لیے cache کیا جاتا ہے۔

- `acp`: Gemini contract، `gemini --experimental-acp` چلاتا ہے اور سرکاری
  TypeScript SDK کے ذریعے newline-delimited ACP JSON-RPC استعمال کرتا ہے۔
- `stdio-adapter`: دیگر رجسٹرڈ contracts قدیمی newline-input،
  stdout-output adapter برقرار رکھتے ہیں۔ output میں دو سیکنڈ کی غیرفعالیت اس کے response
  کو ختم کر دیتی ہے۔ یہ adapter ان CLIs کے لیے مقامی ACP support کی **تصدیق نہیں** کرتا۔

Gemini نے launch flag کو اپنی [CLI reference](https://geminicli.com/docs/cli/cli-reference/)
میں دستاویزی شکل دی ہے۔ client، initialization، session creation، prompt requests،
notifications، اور cancellation کے لیے [سرکاری ACP SDK](https://github.com/agentclientprotocol/typescript-sdk)
استعمال کرتا ہے۔

Custom-agent definitions بدستور administrator کے زیرِ انتظام launch contracts رہتی ہیں۔
کسی binary اور arguments کو رجسٹر کرنے سے اس process کو server user کے مقامی
execution privileges حاصل ہو جاتے ہیں؛ registration کوئی sandbox نہیں ہے۔ Version probes
صرف رجسٹرڈ executable اور تسلیم شدہ version flag قبول کرتے ہیں۔

## داخلی launch API

```typescript
import { acpManager } from "@/lib/acp";

const session = acpManager.spawn("gemini", {
  cwd: process.cwd(),
  // صرف وہ provider variables فراہم کریں جو دانستہ طور پر اس agent کو تفویض کیے گئے ہوں۔
  env: {
    GEMINI_API_KEY: process.env.GEMINI_API_KEY,
  },
});

try {
  const response = await acpManager.sendPrompt(session.id, "Explain this project", 120_000);
  // response کو بلانے والی application میں استعمال کریں۔
} finally {
  acpManager.kill(session.id);
}
```

`spawn(agentId, options)`، رجسٹرڈ definition سے executable اور arguments کو resolve
کرتا ہے۔ caller کے لیے دستیاب واحد options، `cwd` اور `env` ہیں؛ پرانا
`spawn(agentId, binary, args, env)` signature اور executable overrides مسترد کر دیے
جاتے ہیں۔ یہ manager، HTTP launch contracts کو support نہیں کرتا۔

child کو وہی operating-system، terminal، locale، اور certificate allowlist وراثت میں
ملتی ہے جو CLI launchers استعمال کرتے ہیں۔ Server/provider secrets کو parent
environment سے copy نہیں کیا جاتا۔ منتخب CLI کو درکار credentials واضح طور پر
فراہم کیے جانے چاہییں یا اس CLI کی اپنی مقامی authentication کے ذریعے دستیاب ہونے
چاہییں۔ child کے پاس پھر بھی مقامی user کی filesystem permissions ہوتی ہیں اور وہ اپنی
config پڑھ سکتا ہے۔

## مقامی lifecycle اور حدود

1. رجسٹرڈ binary کو شروع کریں، ACP کو initialize کریں، اور منتخب working directory
   پر مبنی session بنائیں۔ Initialization کی حد دس سیکنڈ ہے۔
2. prompt جمع کریں اور صرف اسی session کے لیے text notifications اکٹھی کریں۔
   تکمیل سے مراد prompt RPC response ہے، stdout کی خاموشی کا کوئی دورانیہ نہیں۔
3. ایک ہی prompt deadline استعمال کریں، جس میں کوئی نامکمل initialization بھی شامل ہو؛
   default مدت 120 سیکنڈ ہے۔ ایک ہی process میں concurrent prompts مسترد کر دیے جاتے ہیں۔
4. مقامی timeout ہونے پر `session/cancel` کی کوشش کریں اور process ختم کر دیں۔
   termination سے پہلے 100 ms کی محدود مہلت notification کو flush ہونے دیتی ہے۔
5. initialization ناکام ہونے، connection بند ہونے، process کے exit ہونے، یا caller کے
   اسے ختم کرنے پر transport state بند کریں اور session ہٹا دیں۔

Tool permission requests مسترد کر دی جاتی ہیں۔ کسی filesystem یا terminal client
capabilities کی تشہیر نہیں کی جاتی۔ یہ پابندیاں خود child binary کو sandbox نہیں کرتیں
اور نہ ہی کسی CLI کی اپنی authorization settings کی جگہ لیتی ہیں۔

مقامی text اور قدیمی stdout/stderr، دونوں زیادہ سے زیادہ 1 MiB حروف برقرار رکھتے ہیں،
اور truncation notice کے ساتھ تازہ ترین output محفوظ کرتے ہیں۔ SDK parsing سے پہلے
ہر انفرادی مقامی wire frame کی حد 2 MiB bytes ہے۔ Buffers ہر prompt پر reset ہوتے ہیں۔

`kill(sessionId)`، SIGTERM بھیجتا ہے، پھر اگر process پانچ سیکنڈ کے بعد بھی exit نہ کرے
تو SIGKILL بھیجتا ہے۔ قدیمی prompt timeouts، listeners اور timers کو release کرتے ہیں
لیکن session کو ایک اور prompt کے لیے دستیاب رکھتے ہیں؛ کام مکمل ہونے پر `kill()` یا
`killAll()` استعمال کرنا callers کی ذمہ داری رہتی ہے۔

## Events اور معائنہ

manager، `stdout`، `stderr`، اور `exit` خارج کرتا ہے، جن میں سے ہر ایک کے ساتھ
`sessionId` ہوتا ہے۔ `sessionError` ایک sanitized transport error رپورٹ کرتا ہے۔
مطابقتی `error` event صرف اس وقت خارج ہوتا ہے جب اس کا کوئی subscriber ہو، تاکہ
غائب binary کسی unhandled EventEmitter error کا سبب نہ بن سکے۔

- `getSession(sessionId)` ایک managed session یا `undefined` واپس کرتا ہے۔
- `getActiveSessions()` رکے ہوئے یا رکنے کے عمل میں موجود sessions کو شامل نہیں کرتا۔
- `sendInput(sessionId, input)` صرف فعال قدیمی adapter کے لیے دستیاب ہے؛ مقامی ACP
  اپنے JSON-RPC stream کے تحفظ کے لیے raw input مسترد کرتا ہے۔
- `killAll()` اس instance کے زیرِ انتظام ہر session کو ختم کر دیتا ہے۔

## توثیق کی حدود

Deterministic fixtures، مقامی handshake، text output، مسترد شدہ permissions،
cancellation، concurrent prompts، ناکام initialization، process exit، output limits،
اور secret isolation کا احاطہ کرتے ہیں۔ موجودہ قدیمی buffer/listener regressions بھی
بدستور شامل ہیں۔ یہ tests کسی فعال Gemini login یا کامیاب provider inference کو ثابت
نہیں کرتے؛ ان کے لیے target environment میں الگ سے authorized smoke test درکار ہے۔

## متعلقہ دستاویزات

- [Agent protocols](./AGENT_PROTOCOLS_GUIDE.md)
- [CLI launch contracts](../guides/CLI-LAUNCH-CONTRACTS.md)
- [CLI tools](../reference/CLI-TOOLS.md)
- [A2A server](./A2A-SERVER.md)
- [Cloud agents](./CLOUD_AGENT.md)
