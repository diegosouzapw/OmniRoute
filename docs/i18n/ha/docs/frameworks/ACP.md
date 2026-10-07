# ACP registry and registered CLI launchers (Hausa)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/ACP.md) · 🇪🇹 [am](../../../am/docs/frameworks/ACP.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/ACP.md) · 🇦🇿 [az](../../../az/docs/frameworks/ACP.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/ACP.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/ACP.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/ACP.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/ACP.md) · 🇩🇰 [da](../../../da/docs/frameworks/ACP.md) · 🇩🇪 [de](../../../de/docs/frameworks/ACP.md) · 🇬🇷 [el](../../../el/docs/frameworks/ACP.md) · 🇪🇸 [es](../../../es/docs/frameworks/ACP.md) · 🇪🇪 [et](../../../et/docs/frameworks/ACP.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/ACP.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/ACP.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/ACP.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/ACP.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/ACP.md) · 🇮🇱 [he](../../../he/docs/frameworks/ACP.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/ACP.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/ACP.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/ACP.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/ACP.md) · 🇮🇩 [id](../../../id/docs/frameworks/ACP.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/ACP.md) · 🇮🇹 [it](../../../it/docs/frameworks/ACP.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/ACP.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/ACP.md) · 🇰🇭 [km](../../../km/docs/frameworks/ACP.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/ACP.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/ACP.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/ACP.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/ACP.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/ACP.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/ACP.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/ACP.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/ACP.md) · 🇲🇲 [my](../../../my/docs/frameworks/ACP.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/ACP.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/ACP.md) · 🇳🇴 [no](../../../no/docs/frameworks/ACP.md) · 🇮🇳 [or](../../../or/docs/frameworks/ACP.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/ACP.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/ACP.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/ACP.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/ACP.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/ACP.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/ACP.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/ACP.md) · 🇱🇰 [si](../../../si/docs/frameworks/ACP.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/ACP.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/ACP.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/ACP.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/ACP.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/ACP.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/ACP.md) · 🇮🇳 [te](../../../te/docs/frameworks/ACP.md) · 🇹🇭 [th](../../../th/docs/frameworks/ACP.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/ACP.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/ACP.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/ACP.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/ACP.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/ACP.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/ACP.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/ACP.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/ACP.md)

---

OmniRoute yana raba **gano CLI**, **Agent Client Protocol na asali**, da
**adaftocin stdio na gado**. Gano binary da aka girka ba ya tabbatar da
ingancin tantancewarsa, dacewarsa da samfuri, ko shirinsa na sarrafa prompt.

Dashboard yana amfani da `GET /api/acp/agents` da `POST /api/acp/agents` don lissafin
kadarori da rajistar wakili na musamman. Waɗannan hanyoyin gudanarwa ne na cikin gida
kawai, ba API na jama'a ba ne don ƙaddamar da processes ko aika prompts. `AcpManager`
na ciki ba ya zama madadin mai samar da HTTP kai tsaye.

## Yarjejeniyoyin da aka yi wa rajista

`config/cli-tools-manifest.json` shi ne tushen gaskiya na binaries na ƙaddamarwa
da aka gina a ciki, arguments, da yanayin backend. Registry yana samo ma'anoninsa
daga wannan manifest. Ana adana sakamakon ganowa a cache na daƙiƙa 60.

- `acp`: yarjejeniyar Gemini tana ƙaddamar da `gemini --experimental-acp` kuma tana sadarwa
  ta ACP JSON-RPC da aka raba da sabbin layuka ta hanyar TypeScript SDK na hukuma.
- `stdio-adapter`: sauran yarjejeniyoyin da aka yi wa rajista suna riƙe adaftar gado mai
  karɓar shigarwa ta sabbin layuka da fitarwa ta stdout. Tsawon daƙiƙa biyu ba tare da
  fitarwa ba yana kawo ƙarshen amsarta. Wannan adaftar ba ta **tabbatar** da goyon bayan
  ACP na asali ga waɗannan CLIs.

Gemini ya bayyana flag na ƙaddamarwa a cikin [bayanin CLI](https://geminicli.com/docs/cli/cli-reference/).
Client yana amfani da [ACP SDK na hukuma](https://github.com/agentclientprotocol/typescript-sdk)
don farawa, ƙirƙirar session, buƙatun prompt, sanarwa, da sokewa.

Ma'anonin wakilai na musamman suna ci gaba da zama yarjejeniyoyin ƙaddamarwa
waɗanda administrator ke sarrafawa. Yin rajistar binary da arguments yana ba
wannan process damar aiwatarwa ta cikin gida ta mai amfani da server; rajista
ba sandbox ba ce. Gwaje-gwajen version suna karɓar executable da aka yi wa
rajista da kuma version flag da aka gane kawai.

## API na ƙaddamarwa na ciki

```typescript
import { acpManager } from "@/lib/acp";

const session = acpManager.spawn("gemini", {
  cwd: process.cwd(),
  // Miƙa variables na provider waɗanda aka ware wa wannan wakilin da gangan kawai.
  env: {
    GEMINI_API_KEY: process.env.GEMINI_API_KEY,
  },
});

try {
  const response = await acpManager.sendPrompt(session.id, "Explain this project", 120_000);
  // Yi amfani da response a cikin application ɗin da ya kira.
} finally {
  acpManager.kill(session.id);
}
```

`spawn(agentId, options)` yana gano executable da arguments daga ma'anar da aka
yi wa rajista. Zaɓuɓɓukan mai kira kawai su ne `cwd` da `env`; tsohuwar
signature ta `spawn(agentId, binary, args, env)` da sauya executable ana
ƙin karɓarsu. Wannan manager ba ya goyon bayan yarjejeniyoyin ƙaddamarwa na HTTP.

Child yana gādon tsarin aiki, terminal, locale, da certificate allowlist iri ɗaya
da masu ƙaddamar da CLI. Ba a kwafe sirrin server/provider daga parent
environment. Dole ne a miƙa credentials da CLI ɗin da aka zaɓa ke buƙata
a bayyane ko kuma a samar da su ta hanyar tantancewar cikin gida ta wannan CLI.
Har yanzu child yana da izinin filesystem na mai amfani na cikin gida kuma yana
iya karanta nasa config.

## Zagayowar aiki da iyakokin asali

1. Ƙaddamar da binary da aka yi wa rajista, fara ACP, sannan ƙirƙiri session mai tushe a
   working directory da aka zaɓa. Farawa yana da iyakar daƙiƙa goma.
2. Aika prompt kuma tattara sanarwar rubutu na wannan session kawai.
   Kammalawa ita ce amsar prompt RPC, ba wani lokaci na shiru a stdout ba.
3. Yi amfani da wa'adin prompt guda ɗaya, ciki har da duk wani farawa da bai kammala ba;
   tsohon ƙimarsa ita ce daƙiƙa 120. Ana ƙin prompts masu gudana lokaci guda a process ɗaya.
4. Idan lokacin asali ya ƙare, yi ƙoƙarin `session/cancel` sannan a dakatar da process.
   Ƙayyadadden taga na 100 ms yana ba sanarwar damar flush kafin dakatarwa.
5. Rufe matsayin transport kuma cire session idan farawa ya gaza, connection ya rufe,
   process ya fita, ko mai kira ya kashe shi.

Ana ƙin buƙatun izinin tool. Ba a tallata damar client na filesystem ko terminal.
Waɗannan ƙuntatawa ba sa sanya child binary ɗin kansa cikin sandbox ko maye gurbin
saitunan izini na CLI ɗin kansa.

Dukansu rubutun asali da stdout/stderr na gado suna riƙe har zuwa haruffa 1 MiB,
tare da adana sabuwar fitarwa da sanarwar yankewa. An iyakance kowane native wire
frame zuwa bytes 2 MiB kafin SDK parsing. Buffers suna sake farawa ga kowane prompt.

`kill(sessionId)` yana aika SIGTERM, sannan SIGKILL bayan daƙiƙa biyar idan process
bai fita ba. Ƙarewar lokacin prompt na gado yana sakin listeners da timers amma
yana barin session a shirye don wani prompt; masu kira suna ci gaba da ɗaukar
alhakin amfani da `kill()` ko `killAll()` idan sun gama.

## Events da dubawa

Manager yana fitar da `stdout`, `stderr`, da `exit`, kowannensu tare da `sessionId`.
`sessionError` yana ba da rahoton kuskuren transport da aka tsabtace. Ana fitar da
event na daidaituwa `error` ne kawai idan yana da subscriber, don haka rashin binary
ba zai iya haifar da kuskuren EventEmitter da ba a sarrafa ba.

- `getSession(sessionId)` yana dawo da session da ake sarrafawa ko `undefined`.
- `getActiveSessions()` yana cire sessions da aka dakatar ko ake kan dakatarwa.
- `sendInput(sessionId, input)` yana samuwa ne kawai ga adaftar gado mai aiki;
  ACP na asali yana ƙin raw input don kare JSON-RPC stream ɗinsa.
- `killAll()` yana dakatar da kowane session da wannan instance ke sarrafawa.

## Iyakokin tantancewa

Deterministic fixtures suna gwada native handshake, fitarwar rubutu, izinin da aka
ƙi, sokewa, prompts masu gudana lokaci guda, gazawar farawa, fitowar process,
iyakokin fitarwa, da keɓe sirri. Har yanzu ana gwada matsalolin koma-baya na
buffer/listener na gado. Waɗannan gwaje-gwajen ba sa tabbatar da login na Gemini
kai tsaye ko nasarar inference na provider; waɗannan suna buƙatar smoke test da
aka ba izini daban a cikin target environment.

## Takardun da ke da alaƙa

- [Ka'idojin wakilai](./AGENT_PROTOCOLS_GUIDE.md)
- [Yarjejeniyoyin ƙaddamar da CLI](../guides/CLI-LAUNCH-CONTRACTS.md)
- [Kayan aikin CLI](../reference/CLI-TOOLS.md)
- [Server na A2A](./A2A-SERVER.md)
- [Wakilan cloud](./CLOUD_AGENT.md)
