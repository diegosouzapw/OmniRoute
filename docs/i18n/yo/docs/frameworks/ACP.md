# ACP registry and registered CLI launchers (Yorùbá)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/ACP.md) · 🇪🇹 [am](../../../am/docs/frameworks/ACP.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/ACP.md) · 🇦🇿 [az](../../../az/docs/frameworks/ACP.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/ACP.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/ACP.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/ACP.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/ACP.md) · 🇩🇰 [da](../../../da/docs/frameworks/ACP.md) · 🇩🇪 [de](../../../de/docs/frameworks/ACP.md) · 🇬🇷 [el](../../../el/docs/frameworks/ACP.md) · 🇪🇸 [es](../../../es/docs/frameworks/ACP.md) · 🇪🇪 [et](../../../et/docs/frameworks/ACP.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/ACP.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/ACP.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/ACP.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/ACP.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/ACP.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/ACP.md) · 🇮🇱 [he](../../../he/docs/frameworks/ACP.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/ACP.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/ACP.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/ACP.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/ACP.md) · 🇮🇩 [id](../../../id/docs/frameworks/ACP.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/ACP.md) · 🇮🇹 [it](../../../it/docs/frameworks/ACP.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/ACP.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/ACP.md) · 🇰🇭 [km](../../../km/docs/frameworks/ACP.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/ACP.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/ACP.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/ACP.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/ACP.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/ACP.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/ACP.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/ACP.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/ACP.md) · 🇲🇲 [my](../../../my/docs/frameworks/ACP.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/ACP.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/ACP.md) · 🇳🇴 [no](../../../no/docs/frameworks/ACP.md) · 🇮🇳 [or](../../../or/docs/frameworks/ACP.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/ACP.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/ACP.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/ACP.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/ACP.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/ACP.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/ACP.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/ACP.md) · 🇱🇰 [si](../../../si/docs/frameworks/ACP.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/ACP.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/ACP.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/ACP.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/ACP.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/ACP.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/ACP.md) · 🇮🇳 [te](../../../te/docs/frameworks/ACP.md) · 🇹🇭 [th](../../../th/docs/frameworks/ACP.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/ACP.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/ACP.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/ACP.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/ACP.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/ACP.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/ACP.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/ACP.md)

---

OmniRoute ya **ìṣàwárí CLI**, **Agent Client Protocol abinibi**, àti
**àwọn ohun amúlò ìbámu stdio àtijọ́** sọ́tọ̀. Rírí fáìlì aláṣẹ kan tí a ti fi sílẹ̀ kò jẹ́ ẹ̀rí pé
ìfàṣẹsí rẹ̀, ìbámu awoṣe rẹ̀, tàbí ìmúrasílẹ̀ rẹ̀ tó láti bójú tó ìbéèrè kan.

Pátákó ìṣàkóso náà ń lo `GET /api/acp/agents` àti `POST /api/acp/agents` fún àkójọ
àti ìforúkọsílẹ̀ aṣojú àdáni. Àwọn wọ̀nyí jẹ́ ipa-ọ̀nà ìṣàkóso agbègbè-nìkan, kì í ṣe
API gbogbogbò fún ṣíṣe àwọn process tuntun tàbí fífi àwọn ìbéèrè ránṣẹ́. `AcpManager`
ti inú kò di àfidípò olupèsè HTTP láìfọwọ́yí.

## Àwọn àdéhùn tí a forúkọsílẹ̀

`config/cli-tools-manifest.json` ni orísun òtítọ́ fún àwọn fáìlì aláṣẹ ìfilọ́lẹ̀
tí a fi sínú rẹ̀ tẹ́lẹ̀, àwọn argument, àti àwọn ipò backend. Registry náà ń gba àwọn ìtumọ̀ rẹ̀
láti inú manifest yẹn. A máa ń fi àbájáde ìṣàwárí pamọ́ fún ìṣẹ́jú-àáyá 60.

- `acp`: àdéhùn Gemini ń ṣe ìfilọ́lẹ̀ `gemini --experimental-acp`, ó sì ń bá
  ACP JSON-RPC tí a pín pẹ̀lú ìlà tuntun sọ̀rọ̀ nípasẹ̀ TypeScript SDK òṣìṣẹ́.
- `stdio-adapter`: àwọn àdéhùn mìíràn tí a forúkọsílẹ̀ ń pa ohun amúlò ìbámu àtijọ́ mọ́, èyí tí
  ń gba ìwọlé ní ìlà tuntun, tí ó sì ń fi àbájáde stdout jáde. Àkókò àìṣiṣẹ́ àbájáde
  ìṣẹ́jú-àáyá méjì máa ń parí ìdáhùn rẹ̀. Ohun amúlò ìbámu yìí **kò** jẹ́rìí sí
  àtìlẹ́yìn ACP abinibi fún àwọn CLI wọ̀nyẹn.

Gemini ṣe àkọsílẹ̀ àmì ìfilọ́lẹ̀ náà nínú [ìtọ́kasí CLI](https://geminicli.com/docs/cli/cli-reference/) rẹ̀.
Oníbàárà náà ń lo [ACP SDK òṣìṣẹ́](https://github.com/agentclientprotocol/typescript-sdk)
fún ìpilẹ̀ṣẹ̀, ṣíṣẹ̀dá session, àwọn ìbéèrè prompt, àwọn ìfitónilétí, àti ìfagilé.

Àwọn ìtumọ̀ aṣojú àdáni ṣì jẹ́ àdéhùn ìfilọ́lẹ̀ tí olùṣàkóso ń darí.
Fífáìlì aláṣẹ kan àti àwọn argument rẹ̀ sílẹ̀ fún ìforúkọsílẹ̀ ń fún process yẹn ní àwọn àǹfààní
ìṣiṣẹ́ agbègbè ti aṣàmúlò server; ìforúkọsílẹ̀ kì í ṣe sandbox. Àwọn ìwádìí version
máa ń gba fáìlì aláṣẹ tí a forúkọsílẹ̀ àti àmì version tí a mọ̀ nìkan.

## API ìfilọ́lẹ̀ ti inú

```typescript
import { acpManager } from "@/lib/acp";

const session = acpManager.spawn("gemini", {
  cwd: process.cwd(),
  // Fi àwọn variable olupèsè tí a mọ̀ọ́mọ̀ yàn fún aṣojú yìí nìkan ránṣẹ́.
  env: {
    GEMINI_API_KEY: process.env.GEMINI_API_KEY,
  },
});

try {
  const response = await acpManager.sendPrompt(session.id, "Explain this project", 120_000);
  // Lo response náà nínú application tí ó pè é.
} finally {
  acpManager.kill(session.id);
}
```

`spawn(agentId, options)` ń yan fáìlì aláṣẹ àti àwọn argument láti inú
ìtumọ̀ tí a forúkọsílẹ̀. Àwọn aṣayan olùpè nìkan ni `cwd` àti `env`; signature àtijọ́
`spawn(agentId, binary, args, env)` àti àwọn ìyípadà fáìlì aláṣẹ ni a kọ̀.
Olùṣàkóso yìí kò ṣe àtìlẹ́yìn fún àwọn àdéhùn ìfilọ́lẹ̀ HTTP.

Ọmọ-process náà jogún operating-system, terminal, locale, àti àkójọ àwọn certificate
tí a fàyè gbà, gẹ́gẹ́ bí àwọn olùfilọ́lẹ̀ CLI. A kì í da àwọn àṣírí server/olupèsè láti inú
environment òbí sí i. A gbọ́dọ̀ fi àwọn credential tí CLI tí a yàn nílò ránṣẹ́
ní kedere, tàbí kí a pèsè wọn nípasẹ̀ ìfàṣẹsí agbègbè ti CLI náà fúnra rẹ̀. Ọmọ-process náà
ṣì ní àwọn àṣẹ filesystem ti aṣàmúlò agbègbè, ó sì lè ka config tirẹ̀.

## Ìgbésí-ayé abinibi àti àwọn ààlà

1. Ṣe ìfilọ́lẹ̀ fáìlì aláṣẹ tí a forúkọsílẹ̀, bẹ̀rẹ̀ ACP, kí o sì ṣẹ̀dá session tí gbòngbò rẹ̀ wà ní
   working directory tí a yàn. Ìpilẹ̀ṣẹ̀ ní ààlà ìṣẹ́jú-àáyá mẹ́wàá.
2. Fi prompt kan ránṣẹ́, kí o sì kó àwọn ìfitónilétí ọ̀rọ̀ jọ fún session yẹn nìkan.
   Ìparí ni response RPC prompt, kì í ṣe àkókò ìdákẹ́jẹ stdout.
3. Lo àkókò ìparí prompt kan ṣoṣo, pẹ̀lú ìpilẹ̀ṣẹ̀ èyíkéyìí tí kò tíì parí; àkókò àtìlẹ́yìn
   ni ìṣẹ́jú-àáyá 120. A kọ àwọn prompt tí ń ṣiṣẹ́ lẹ́ẹ̀kan náà nínú process kan náà.
4. Nígbà tí àkókò abinibi bá kọjá, gbìyànjú `session/cancel`, kí o sì dá process náà dúró.
   Ààyè oníwọ̀n 100 ms máa ń jẹ́ kí ìfitónilétí jáde tán kí a tó dá a dúró.
5. Pa ipò transport, kí o sì yọ session náà kúrò nígbà tí ìpilẹ̀ṣẹ̀ bá kùnà, connection
   bá ti pa, process bá jáde, tàbí olùpè bá pa á.

A kọ àwọn ìbéèrè àṣẹ tool. A kò polówó agbára oníbàárà filesystem tàbí terminal.
Àwọn ìdènà wọ̀nyí kì í fi ọmọ-fáìlì aláṣẹ sínú sandbox, bẹ́ẹ̀ ni wọn kì í rọ́pò
àwọn ààtò ìfàṣẹsí ti CLI fúnra rẹ̀.

Ọ̀rọ̀ abinibi àti stdout/stderr àtijọ́ méjèèjì máa ń pa ohun kikọ́ tó pọ̀ jù 1 MiB mọ́,
nípa fífi àbájáde tuntun jù lọ pamọ́ pẹ̀lú ìfitónilétí pé a ti gé e kúrú. Fireemu wire
abinibi kọ̀ọ̀kan ní ààlà byte 2 MiB kí SDK tó parse rẹ̀. Àwọn buffer máa ń padà sí òfo fún prompt kọ̀ọ̀kan.

`kill(sessionId)` ń fi SIGTERM ránṣẹ́, lẹ́yìn náà SIGKILL lẹ́yìn ìṣẹ́jú-àáyá márùn-ún bí process náà
kò bá tíì jáde. Àwọn àkókò prompt àtijọ́ tí ó kọjá máa ń tú àwọn listener àti timer sílẹ̀ ṣùgbọ́n
wọ́n fi session náà sílẹ̀ fún prompt mìíràn; àwọn olùpè ṣì ní ojúṣe láti lo
`kill()` tàbí `killAll()` nígbà tí wọ́n bá parí.

## Àwọn event àti àyẹ̀wò

Olùṣàkóso náà ń ṣe ìtújáde `stdout`, `stderr`, àti `exit`, ọ̀kọ̀ọ̀kan pẹ̀lú `sessionId`.
`sessionError` ń jálẹ̀ àṣìṣe transport tí a ti yọ àlàyé kókó kúrò nínú rẹ̀. Event ìbámu `error`
máa ń jáde nìkan nígbà tí ó bá ní subscriber, kí fáìlì aláṣẹ tí kò sí má bàa
fa àṣìṣe EventEmitter tí a kò bójú tó.

- `getSession(sessionId)` máa ń dá session tí a ń ṣàkóso padà tàbí `undefined`.
- `getActiveSessions()` kò ní àwọn session tí ó ti dúró tàbí tí ń dúró lọ́wọ́.
- `sendInput(sessionId, input)` wà fún ohun amúlò ìbámu àtijọ́ tí ń ṣiṣẹ́ nìkan;
  ACP abinibi máa ń kọ ìwọlé raw láti dáàbò bo stream JSON-RPC rẹ̀.
- `killAll()` máa ń dá gbogbo session tí instance yẹn ń ṣàkóso dúró.

## Àwọn ààlà ìfàṣẹ̀sí

Àwọn fixture tí àbájáde wọn dájú bo handshake abinibi, àbájáde ọ̀rọ̀, àwọn àṣẹ tí a kọ̀,
ìfagilé, àwọn prompt tí ń ṣiṣẹ́ lẹ́ẹ̀kan náà, ìpilẹ̀ṣẹ̀ tí ó kùnà, ìjáde process,
àwọn ààlà àbájáde, àti ìyasọ́tọ̀ àṣírí. Àwọn regression buffer/listener àtijọ́ tó ti wà
ṣì wà lábẹ́ àyẹ̀wò. Àwọn ìdánwò wọ̀nyí kò ṣe àfihàn ìwọlé Gemini tó ń ṣiṣẹ́
tàbí inference olupèsè tó ṣàṣeyọrí; àwọn wọ̀nyẹn nílò smoke test tí a ti fàyè sí lọ́tọ̀
nínú environment àfojúsùn.

## Àwọn àkọsílẹ̀ tó jọmọ́

- [Àwọn ìlànà aṣojú](./AGENT_PROTOCOLS_GUIDE.md)
- [Àwọn àdéhùn ìfilọ́lẹ̀ CLI](../guides/CLI-LAUNCH-CONTRACTS.md)
- [Àwọn irinṣẹ́ CLI](../reference/CLI-TOOLS.md)
- [Server A2A](./A2A-SERVER.md)
- [Àwọn aṣojú cloud](./CLOUD_AGENT.md)
