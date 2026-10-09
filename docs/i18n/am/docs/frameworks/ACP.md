# ACP registry and registered CLI launchers (አማርኛ)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/ACP.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/ACP.md) · 🇦🇿 [az](../../../az/docs/frameworks/ACP.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/ACP.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/ACP.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/ACP.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/ACP.md) · 🇩🇰 [da](../../../da/docs/frameworks/ACP.md) · 🇩🇪 [de](../../../de/docs/frameworks/ACP.md) · 🇬🇷 [el](../../../el/docs/frameworks/ACP.md) · 🇪🇸 [es](../../../es/docs/frameworks/ACP.md) · 🇪🇪 [et](../../../et/docs/frameworks/ACP.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/ACP.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/ACP.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/ACP.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/ACP.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/ACP.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/ACP.md) · 🇮🇱 [he](../../../he/docs/frameworks/ACP.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/ACP.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/ACP.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/ACP.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/ACP.md) · 🇮🇩 [id](../../../id/docs/frameworks/ACP.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/ACP.md) · 🇮🇹 [it](../../../it/docs/frameworks/ACP.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/ACP.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/ACP.md) · 🇰🇭 [km](../../../km/docs/frameworks/ACP.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/ACP.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/ACP.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/ACP.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/ACP.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/ACP.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/ACP.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/ACP.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/ACP.md) · 🇲🇲 [my](../../../my/docs/frameworks/ACP.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/ACP.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/ACP.md) · 🇳🇴 [no](../../../no/docs/frameworks/ACP.md) · 🇮🇳 [or](../../../or/docs/frameworks/ACP.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/ACP.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/ACP.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/ACP.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/ACP.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/ACP.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/ACP.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/ACP.md) · 🇱🇰 [si](../../../si/docs/frameworks/ACP.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/ACP.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/ACP.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/ACP.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/ACP.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/ACP.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/ACP.md) · 🇮🇳 [te](../../../te/docs/frameworks/ACP.md) · 🇹🇭 [th](../../../th/docs/frameworks/ACP.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/ACP.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/ACP.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/ACP.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/ACP.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/ACP.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/ACP.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/ACP.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/ACP.md)

---

OmniRoute **CLI ፍለጋን**፣ **የመነሻ Agent Client Protocolን** እና
**የቆዩ stdio አስማሚዎችን** ለይቶ ይይዛል። የተጫነ binary ማግኘት የእሱን
ማረጋገጫ፣ ከሞዴል ጋር ተኳኋኝነት ወይም prompt ለማስተናገድ ዝግጁነት አያረጋግጥም።

ዳሽቦርዱ ለዝርዝር አያያዝ እና ለብጁ agent ምዝገባ `GET /api/acp/agents`ን እና
`POST /api/acp/agents`ን ይጠቀማል። እነዚህ በአካባቢው ብቻ የሚሰሩ የአስተዳደር መንገዶች ናቸው፤
processዎችን ለማስጀመር ወይም promptዎችን ለማስገባት የታሰበ ይፋዊ API አይደሉም። ውስጣዊው
`AcpManager` በራስ-ሰር የHTTP provider fallback አይሆንም።

## የተመዘገቡ ውሎች

`config/cli-tools-manifest.json` ለአብሮገነብ ማስጀመሪያ
binaryዎች፣ arguments እና backend modes ትክክለኛው ዋና ምንጭ ነው። registryው ትርጓሜዎቹን
ከዚያ manifest ያገኛል። ፍለጋው ለ60 ሰከንዶች cache ይደረጋል።

- `acp`፦ የGemini ውል `gemini --experimental-acp`ን ያስጀምራል፣ እንዲሁም
  በይፋዊው TypeScript SDK በኩል በአዲስ መስመር የተከፋፈለ ACP JSON-RPC ይጠቀማል።
- `stdio-adapter`፦ ሌሎች የተመዘገቡ ውሎች የቆየውን የአዲስ-መስመር input፣
  stdout-output adapter ይዘው ይቀጥላሉ። የሁለት ሰከንድ የoutput ሥራ-ፈት ጊዜ ምላሹን ያበቃል።
  ይህ adapter ለእነዚያ CLIዎች የመነሻ ACP ድጋፍ መኖሩን **አያረጋግጥም**።

Gemini የማስጀመሪያ flagን በ[CLI ማጣቀሻው](https://geminicli.com/docs/cli/cli-reference/) ውስጥ ይዘረዝራል።
clientው ለማስጀመር፣ session ለመፍጠር፣ prompt ጥያቄዎች፣ ማሳወቂያዎች እና ስረዛ
[ይፋዊውን ACP SDK](https://github.com/agentclientprotocol/typescript-sdk)
ይጠቀማል።

የብጁ agent ትርጓሜዎች በአስተዳዳሪ ቁጥጥር ሥር ያሉ የማስጀመሪያ ውሎች ሆነው ይቆያሉ።
binaryን እና argumentsን መመዝገብ ለዚያ process የserver userን የአካባቢ
ማስኬጃ ፈቃዶች ይሰጣል፤ ምዝገባ sandbox አይደለም። የversion ምርመራዎች
የተመዘገበውን executable እና የሚታወቅ version flag ብቻ ይቀበላሉ።

## ውስጣዊ የማስጀመሪያ API

```typescript
import { acpManager } from "@/lib/acp";

const session = acpManager.spawn("gemini", {
  cwd: process.cwd(),
  // ሆን ተብለው ለዚህ agent የተመደቡትን provider variables ብቻ ያስተላልፉ።
  env: {
    GEMINI_API_KEY: process.env.GEMINI_API_KEY,
  },
});

try {
  const response = await acpManager.sendPrompt(session.id, "Explain this project", 120_000);
  // ምላሹን በጠሪው application ውስጥ ይጠቀሙ።
} finally {
  acpManager.kill(session.id);
}
```

`spawn(agentId, options)` executableውን እና argumentsን ከተመዘገበው
ትርጓሜ ይፈታል። ብቸኛዎቹ የጠሪ አማራጮች `cwd` እና `env` ናቸው፤ የድሮው
`spawn(agentId, binary, args, env)` signature እና executable overrides
ውድቅ ይደረጋሉ። የHTTP ማስጀመሪያ ውሎች በዚህ manager አይደገፉም።

childው ከCLI launchers ጋር ተመሳሳዩን operating-system፣ terminal፣ locale እና certificate
allowlist ይወርሳል። የserver/provider secrets ከparent environment አይቀዱም።
በተመረጠው CLI የሚያስፈልጉ credentials በግልጽ መተላለፍ
ወይም በዚያ CLI የራሱ የአካባቢ authentication በኩል መቅረብ አለባቸው። childው
አሁንም የአካባቢው user የfilesystem ፈቃዶች አሉት፣ እና የራሱን config ማንበብ ይችላል።

## የመነሻ lifecycle እና ገደቦች

1. የተመዘገበውን binary ያስጀምሩ፣ ACPን ያስጀምሩ እና በተመረጠው
   working directory ላይ የተመሠረተ session ይፍጠሩ። Initialization የአሥር ሰከንድ ገደብ አለው።
2. prompt ያስገቡ እና ለዚያ session ብቻ የጽሑፍ ማሳወቂያዎችን ይሰብስቡ።
   ማጠናቀቂያው የprompt RPC ምላሽ ነው፤ የstdout ዝምታ ጊዜ አይደለም።
3. ያልተጠናቀቀ initializationን ጨምሮ አንድ የprompt የጊዜ ገደብ ይጠቀሙ፤ defaultው
   120 ሰከንዶች ነው። በተመሳሳይ process ውስጥ በአንድ ጊዜ የሚቀርቡ prompts ውድቅ ይደረጋሉ።
4. የመነሻ timeout ሲከሰት፣ `session/cancel`ን ለመጠቀም ይሞክሩ እና processውን ያቋርጡ።
   የተገደበ የ100 ms መስኮት ከማቋረጡ በፊት ማሳወቂያው እንዲለቀቅ ያስችላል።
5. initialization ሲከሽፍ፣ connectionው ሲዘጋ፣ processው ሲወጣ ወይም ጠሪው
   ሲያቋርጠው transport stateን ይዝጉ እና sessionውን ያስወግዱ።

የtool permission ጥያቄዎች ውድቅ ይደረጋሉ። ምንም የfilesystem ወይም terminal client
capabilities አይታወጁም። እነዚህ ገደቦች child binaryውን ራሱን sandbox
አያደርጉም፣ ወይም የCLIን የራሱን authorization settings አይተኩም።

የመነሻ text እና የቆዩ stdout/stderr ሁለቱም ቢበዛ 1 MiB ቁምፊዎችን ይይዛሉ፤
ከtruncation ማሳወቂያ ጋር አዲሱን output ያቆያሉ። አንድ የመነሻ wire
frame ከSDK parsing በፊት በ2 MiB bytes የተገደበ ነው። Buffers በእያንዳንዱ prompt ዳግም ይጀመራሉ።

`kill(sessionId)` SIGTERMን ይልካል፤ ከዚያም processው
ካልወጣ ከአምስት ሰከንዶች በኋላ SIGKILLን ይልካል። የቆዩ prompt timeouts listenersን እና timersን
ይለቃሉ፣ ነገር ግን sessionውን ለሌላ prompt ዝግጁ አድርገው ይተዋሉ፤ ጠሪዎች
ሲጨርሱ `kill()` ወይም `killAll()`ን የመጠቀም ኃላፊነት አሁንም አለባቸው።

## Events እና ምርመራ

managerው `stdout`፣ `stderr` እና `exit`ን ያወጣል፤ እያንዳንዳቸው `sessionId` አላቸው።
`sessionError` የተጣራ transport error ያሳውቃል። የተኳኋኝነት `error`
event subscriber ሲኖረው ብቻ ይወጣል፤ ስለዚህ የጠፋ binary
ያልተያዘ EventEmitter error ሊያስከትል አይችልም።

- `getSession(sessionId)` የሚተዳደር session ወይም `undefined` ይመልሳል።
- `getActiveSessions()` የቆሙ ወይም በመቆም ላይ ያሉ sessionsን አያካትትም።
- `sendInput(sessionId, input)` ለቀጥታ ለሚሰራ የቆየ adapter ብቻ ይገኛል፤
  የመነሻ ACP የJSON-RPC streamን ለመጠበቅ raw inputን ውድቅ ያደርጋል።
- `killAll()` በዚያ instance የሚተዳደሩትን ሁሉንም sessions ያቋርጣል።

## የማረጋገጫ ወሰኖች

የተወሰኑ fixtures የመነሻ handshakeን፣ text outputን፣ ውድቅ የተደረጉ
ፈቃዶችን፣ ስረዛን፣ concurrent promptsን፣ ያልተሳካ initializationን፣ process
exitን፣ output limitsን እና secret isolationን ይሸፍናሉ። ነባሮቹ የቆዩ buffer/listener
regressions እንደተሸፈኑ ይቆያሉ። እነዚህ tests ቀጥታ የGemini loginን
ወይም የተሳካ provider inferenceን አያሳዩም፤ እነዚህ በታለመው environment ውስጥ
ለየብቻ ፈቃድ ያገኘ smoke test ያስፈልጋቸዋል።

## ተዛማጅ ሰነዶች

- [የAgent protocols](./AGENT_PROTOCOLS_GUIDE.md)
- [የCLI ማስጀመሪያ ውሎች](../guides/CLI-LAUNCH-CONTRACTS.md)
- [የCLI tools](../reference/CLI-TOOLS.md)
- [የA2A server](./A2A-SERVER.md)
- [የCloud agents](./CLOUD_AGENT.md)
