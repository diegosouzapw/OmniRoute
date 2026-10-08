# ACP registry and registered CLI launchers (සිංහල)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/ACP.md) · 🇪🇹 [am](../../../am/docs/frameworks/ACP.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/ACP.md) · 🇦🇿 [az](../../../az/docs/frameworks/ACP.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/ACP.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/ACP.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/ACP.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/ACP.md) · 🇩🇰 [da](../../../da/docs/frameworks/ACP.md) · 🇩🇪 [de](../../../de/docs/frameworks/ACP.md) · 🇬🇷 [el](../../../el/docs/frameworks/ACP.md) · 🇪🇸 [es](../../../es/docs/frameworks/ACP.md) · 🇪🇪 [et](../../../et/docs/frameworks/ACP.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/ACP.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/ACP.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/ACP.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/ACP.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/ACP.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/ACP.md) · 🇮🇱 [he](../../../he/docs/frameworks/ACP.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/ACP.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/ACP.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/ACP.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/ACP.md) · 🇮🇩 [id](../../../id/docs/frameworks/ACP.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/ACP.md) · 🇮🇹 [it](../../../it/docs/frameworks/ACP.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/ACP.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/ACP.md) · 🇰🇭 [km](../../../km/docs/frameworks/ACP.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/ACP.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/ACP.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/ACP.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/ACP.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/ACP.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/ACP.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/ACP.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/ACP.md) · 🇲🇲 [my](../../../my/docs/frameworks/ACP.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/ACP.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/ACP.md) · 🇳🇴 [no](../../../no/docs/frameworks/ACP.md) · 🇮🇳 [or](../../../or/docs/frameworks/ACP.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/ACP.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/ACP.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/ACP.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/ACP.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/ACP.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/ACP.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/ACP.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/ACP.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/ACP.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/ACP.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/ACP.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/ACP.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/ACP.md) · 🇮🇳 [te](../../../te/docs/frameworks/ACP.md) · 🇹🇭 [th](../../../th/docs/frameworks/ACP.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/ACP.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/ACP.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/ACP.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/ACP.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/ACP.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/ACP.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/ACP.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/ACP.md)

---

OmniRoute විසින් **CLI සොයාගැනීම**, **ස්වදේශීය Agent Client Protocol**, සහ
**පැරණි stdio adapters** වෙන් කරයි. ස්ථාපිත binary එකක් සොයාගැනීමෙන් එහි
සත්යාපනය, model අනුකූලතාව, හෝ prompt එකක් හැසිරවීමට ඇති සූදානම තහවුරු නොවේ.

Dashboard එක inventory සහ custom-agent ලියාපදිංචිය සඳහා `GET /api/acp/agents` සහ
`POST /api/acp/agents` භාවිත කරයි. මේවා process ආරම්භ කිරීම හෝ prompt ඉදිරිපත් කිරීම
සඳහා වන පොදු API එකක් නොව, local-only කළමනාකරණ routes වේ. අභ්යන්තර
`AcpManager` එක ස්වයංක්රීයව HTTP provider fallback එකක් බවට පත් නොවේ.

## ලියාපදිංචි කළ contracts

Built-in launch binaries, arguments, සහ backend modes සඳහා සත්යයේ මූලාශ්රය
`config/cli-tools-manifest.json` වේ. Registry එක එම manifest එකෙන් සිය
definitions ලබාගනී. හඳුනාගැනීම තත්පර 60ක් සඳහා cache කරනු ලැබේ.

- `acp`: Gemini contract එක `gemini --experimental-acp` ආරම්භ කර, නිල
  TypeScript SDK එක හරහා newline-delimited ACP JSON-RPC භාවිතයෙන් සන්නිවේදනය කරයි.
- `stdio-adapter`: අනෙකුත් ලියාපදිංචි contracts විසින් පැරණි newline-input,
  stdout-output adapter එක පවත්වාගෙන යයි. තත්පර දෙකක output idle කාලයක් එහි
  ප්රතිචාරය අවසන් කරයි. මෙම adapter එක එම CLI සඳහා ස්වදේශීය ACP සහාය
  **තහවුරු නොකරයි**.

Gemini විසින් launch flag එක එහි [CLI යොමුවේ](https://geminicli.com/docs/cli/cli-reference/)
ලේඛනගත කර ඇත. Client එක initialization, session creation, prompt requests,
notifications, සහ cancellation සඳහා [නිල ACP SDK](https://github.com/agentclientprotocol/typescript-sdk)
භාවිත කරයි.

Custom-agent definitions පරිපාලකයා විසින් පාලනය කරන launch contracts ලෙසම පවතී.
Binary එකක් සහ arguments ලියාපදිංචි කිරීමෙන් එම process එකට server userගේ local
execution privileges හිමි වේ; ලියාපදිංචිය sandbox එකක් නොවේ. Version probes පිළිගන්නේ
ලියාපදිංචි executable එක සහ හඳුනාගත් version flag එකක් පමණි.

## අභ්යන්තර launch API

```typescript
import { acpManager } from "@/lib/acp";

const session = acpManager.spawn("gemini", {
  cwd: process.cwd(),
  // මෙම agent වෙත හිතාමතා පවරා ඇති provider variables පමණක් යවන්න.
  env: {
    GEMINI_API_KEY: process.env.GEMINI_API_KEY,
  },
});

try {
  const response = await acpManager.sendPrompt(
    session.id,
    "මෙම project එක පැහැදිලි කරන්න",
    120_000
  );
  // කැඳවන application එක තුළ response එක භාවිත කරන්න.
} finally {
  acpManager.kill(session.id);
}
```

`spawn(agentId, options)` විසින් ලියාපදිංචි definition එකෙන් executable එක සහ
arguments නිරාකරණය කරයි. Caller options ලෙස ඇත්තේ `cwd` සහ `env` පමණි; පැරණි
`spawn(agentId, binary, args, env)` signature එක සහ executable overrides
ප්රතික්ෂේප කරනු ලැබේ. මෙම manager එක HTTP launch contracts සඳහා සහාය නොදක්වයි.

Child process එකට CLI launchers භාවිත කරන operating-system, terminal, locale, සහ
certificate allowlist එකම උරුම වේ. Server/provider secrets parent environment
එකෙන් පිටපත් නොකෙරේ. තෝරාගත් CLI එකට අවශ්ය credentials පැහැදිලිව යැවිය යුතුය,
නැතහොත් එම CLI එකේම local authentication හරහා සැපයිය යුතුය. Child process එකට
තවමත් local userගේ filesystem permissions ඇති අතර, එයට තමන්ගේම config කියවිය හැක.

## ස්වදේශීය lifecycle සහ සීමා

1. ලියාපදිංචි binary එක ආරම්භ කර, ACP initialize කර, තෝරාගත් working directory
   එක මූලය ලෙස ඇති session එකක් සාදන්න. Initialization සඳහා තත්පර දහයක සීමාවක් ඇත.
2. Prompt එකක් ඉදිරිපත් කර, එම session එකට පමණක් අදාළ text notifications එකතු කරන්න.
   Completion යනු prompt RPC response එක මිස stdout නිශ්ශබ්දව පවතින කාල පරිච්ඡේදයක් නොවේ.
3. අවසන් නොවූ initialization එකක් ඇතුළුව එක් prompt deadline එකක් භාවිත කරන්න;
   default අගය තත්පර 120කි. එකම process එක තුළ concurrent prompts ප්රතික්ෂේප කරනු ලැබේ.
4. ස්වදේශීය timeout එකකදී `session/cancel` උත්සාහ කර process එක terminate කරන්න.
   සීමා කළ 100 ms කාල කවුළුවක් termination ට පෙර notification එක flush වීමට ඉඩ දෙයි.
5. Initialization අසාර්ථක වූ විට, connection එක වැසුණු විට, process එක exit වූ විට,
   හෝ caller එය kill කළ විට transport state එක වසා session එක ඉවත් කරන්න.

Tool permission requests ප්රතික්ෂේප කරනු ලැබේ. Filesystem හෝ terminal client
capabilities කිසිවක් ප්රචාරණය නොකෙරේ. මෙම සීමා child binary එකම sandbox නොකරන අතර,
CLI එකේම authorization settings සඳහා ආදේශකයක් ද නොවේ.

ස්වදේශීය text සහ පැරණි stdout/stderr යන දෙකම උපරිම වශයෙන් අක්ෂර 1 MiBක් රඳවාගනිමින්,
truncation notice එකක් සමඟ නවතම output එක තබාගනී. SDK parsing කිරීමට පෙර තනි
ස්වදේශීය wire frame එකක් bytes 2 MiBකට සීමා වේ. සෑම prompt එකකටම buffers reset වේ.

`kill(sessionId)` විසින් SIGTERM යවන අතර, process එක exit වී නොමැති නම් තත්පර පහකට
පසු SIGKILL යවයි. පැරණි prompt timeouts විසින් listeners සහ timers නිදහස් කරන නමුත්,
වෙනත් prompt එකක් සඳහා session එක ලබාගත හැකිව තබයි; අවසන් වූ විට `kill()` හෝ
`killAll()` කැඳවීමේ වගකීම callers සතුව පවතී.

## Events සහ පරීක්ෂාව

Manager එක `stdout`, `stderr`, සහ `exit` emit කරන අතර, ඒ සෑම එකක් සමඟම
`sessionId` ඇත. `sessionError` විසින් පිරිසිදු කළ transport error එකක් වාර්තා කරයි.
අනුකූලතා `error` event එක emit කරන්නේ එයට subscriber කෙනෙකු සිටින විට පමණි;
එබැවින් නොමැති binary එකකට හැසිරවීමකින් තොර EventEmitter error එකක් ඇති කළ නොහැක.

- `getSession(sessionId)` විසින් managed session එකක් හෝ `undefined` ලබා දෙයි.
- `getActiveSessions()` විසින් නවතා ඇති හෝ නවතමින් පවතින sessions බැහැර කරයි.
- `sendInput(sessionId, input)` ලබාගත හැක්කේ සජීවී legacy adapter එකක් සඳහා පමණි;
  එහි JSON-RPC stream එක ආරක්ෂා කිරීම සඳහා ස්වදේශීය ACP විසින් raw input ප්රතික්ෂේප කරයි.
- `killAll()` විසින් එම instance එක කළමනාකරණය කරන සියලු sessions terminate කරයි.

## Validation සීමා

Deterministic fixtures මගින් ස්වදේශීය handshake එක, text output, ප්රතික්ෂේප කළ
permissions, cancellation, concurrent prompts, අසාර්ථක initialization, process
exit, output limits, සහ secret isolation ආවරණය කරයි. දැනට පවතින පැරණි
buffer/listener regressions ද තවදුරටත් ආවරණය වේ. මෙම tests මගින් සජීවී Gemini
login එකක් හෝ සාර්ථක provider inference එකක් පෙන්නුම් නොකරයි; ඒවාට target
environment එක තුළ වෙනම authorization ලබාදුන් smoke test එකක් අවශ්ය වේ.

## අදාළ ලේඛන

- [Agent protocols](./AGENT_PROTOCOLS_GUIDE.md)
- [CLI launch contracts](../guides/CLI-LAUNCH-CONTRACTS.md)
- [CLI tools](../reference/CLI-TOOLS.md)
- [A2A server](./A2A-SERVER.md)
- [Cloud agents](./CLOUD_AGENT.md)
