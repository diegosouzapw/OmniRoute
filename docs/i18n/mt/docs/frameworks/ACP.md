# ACP registry and registered CLI launchers (Malti)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/ACP.md) · 🇪🇹 [am](../../../am/docs/frameworks/ACP.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/ACP.md) · 🇦🇿 [az](../../../az/docs/frameworks/ACP.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/ACP.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/ACP.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/ACP.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/ACP.md) · 🇩🇰 [da](../../../da/docs/frameworks/ACP.md) · 🇩🇪 [de](../../../de/docs/frameworks/ACP.md) · 🇬🇷 [el](../../../el/docs/frameworks/ACP.md) · 🇪🇸 [es](../../../es/docs/frameworks/ACP.md) · 🇪🇪 [et](../../../et/docs/frameworks/ACP.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/ACP.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/ACP.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/ACP.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/ACP.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/ACP.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/ACP.md) · 🇮🇱 [he](../../../he/docs/frameworks/ACP.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/ACP.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/ACP.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/ACP.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/ACP.md) · 🇮🇩 [id](../../../id/docs/frameworks/ACP.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/ACP.md) · 🇮🇹 [it](../../../it/docs/frameworks/ACP.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/ACP.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/ACP.md) · 🇰🇭 [km](../../../km/docs/frameworks/ACP.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/ACP.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/ACP.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/ACP.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/ACP.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/ACP.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/ACP.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/ACP.md) · 🇲🇲 [my](../../../my/docs/frameworks/ACP.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/ACP.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/ACP.md) · 🇳🇴 [no](../../../no/docs/frameworks/ACP.md) · 🇮🇳 [or](../../../or/docs/frameworks/ACP.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/ACP.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/ACP.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/ACP.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/ACP.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/ACP.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/ACP.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/ACP.md) · 🇱🇰 [si](../../../si/docs/frameworks/ACP.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/ACP.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/ACP.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/ACP.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/ACP.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/ACP.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/ACP.md) · 🇮🇳 [te](../../../te/docs/frameworks/ACP.md) · 🇹🇭 [th](../../../th/docs/frameworks/ACP.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/ACP.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/ACP.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/ACP.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/ACP.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/ACP.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/ACP.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/ACP.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/ACP.md)

---

OmniRoute jissepara **l-iskoperta tas-CLI**, il-**protokoll nattiv Agent Client Protocol**, u
l-**adapters stdio tradizzjonali**. Is-sejba ta' binarju installat ma tipprovax
l-awtentikazzjoni tiegħu, il-kompatibbiltà tal-mudell, jew kemm hu lest biex jipproċessa prompt.

Id-dashboard juża `GET /api/acp/agents` u `POST /api/acp/agents` għall-inventarju
u r-reġistrazzjoni ta' aġenti personalizzati. Dawn huma rotot ta' ġestjoni lokali biss, mhux
API pubblika biex jitnedew proċessi jew jintbagħtu prompts. L-`AcpManager` intern
ma jsirx awtomatikament alternattiva ta' fornitur HTTP.

## Kuntratti rreġistrati

`config/cli-tools-manifest.json` huwa s-sors awtorevoli għall-binarji, l-argumenti,
u l-modalitajiet backend integrati għat-tnedija. Ir-reġistru jidderiva d-definizzjonijiet tiegħu
minn dak il-manifest. Is-sejbien jinżamm fil-cache għal 60 sekonda.

- `acp`: il-kuntratt ta' Gemini jniedi `gemini --experimental-acp` u jikkomunika
  permezz ta' ACP JSON-RPC delimitat b'linji ġodda bl-użu tal-SDK uffiċjali ta' TypeScript.
- `stdio-adapter`: kuntratti rreġistrati oħra jżommu l-adapter tradizzjonali b'input
  delimitat b'linji ġodda u output fuq stdout. Perjodu ta' inattività tal-output ta' żewġ sekondi jtemm ir-risposta tiegħu.
  Dan l-adapter **ma** jiċċertifikax appoġġ nattiv għal ACP għal dawk is-CLIs.

Gemini jiddokumenta l-flag tat-tnedija fir-[referenza tas-CLI](https://geminicli.com/docs/cli/cli-reference/).
Il-klijent juża l-[SDK uffiċjali ta' ACP](https://github.com/agentclientprotocol/typescript-sdk)
għall-inizjalizzazzjoni, il-ħolqien ta' sessjoni, it-talbiet ta' prompts, in-notifiki, u l-kanċellazzjoni.

Id-definizzjonijiet ta' aġenti personalizzati jibqgħu kuntratti ta' tnedija kkontrollati mill-amministratur.
Ir-reġistrazzjoni ta' binarju u argumenti tagħti lil dak il-proċess il-privileġġi ta'
eżekuzzjoni lokali tal-utent tas-server; ir-reġistrazzjoni mhijiex sandbox. Is-sondi tal-verżjoni jaċċettaw
biss l-eżegwibbli rreġistrat u flag tal-verżjoni rikonoxxut.

## API interna tat-tnedija

```typescript
import { acpManager } from "@/lib/acp";

const session = acpManager.spawn("gemini", {
  cwd: process.cwd(),
  // Għaddi biss il-varjabbli tal-fornitur assenjati apposta lil dan l-aġent.
  env: {
    GEMINI_API_KEY: process.env.GEMINI_API_KEY,
  },
});

try {
  const response = await acpManager.sendPrompt(session.id, "Spjega dan il-proġett", 120_000);
  // Uża r-risposta fl-applikazzjoni li għamlet is-sejħa.
} finally {
  acpManager.kill(session.id);
}
```

`spawn(agentId, options)` jirriżolvi l-eżegwibbli u l-argumenti mid-definizzjoni
rreġistrata. L-uniċi għażliet tas-sejjieħ huma `cwd` u `env`; il-firma l-antika
`spawn(agentId, binary, args, env)` u s-sostituzzjonijiet tal-eżegwibbli
jiġu rrifjutati. Il-kuntratti ta' tnedija HTTP mhumiex appoġġati minn dan il-manager.

Il-proċess child jiret l-istess allowlist tas-sistema operattiva, tat-terminal, tal-locale,
u taċ-ċertifikati bħall-lanċjaturi tas-CLI. Is-sigrieti tas-server/tal-fornitur ma jiġux ikkupjati
mill-ambjent parent. Il-kredenzjali meħtieġa mis-CLI magħżul għandhom jiġu mgħoddija
b'mod espliċitu jew ipprovduti permezz tal-awtentikazzjoni lokali ta' dik is-CLI stess. Il-proċess child
xorta jkollu l-permessi tas-sistema tal-fajls tal-utent lokali u jista' jaqra l-konfigurazzjoni tiegħu stess.

## Ċiklu tal-ħajja nattiv u limiti

1. Niedi l-binarju rreġistrat, inizjalizza ACP, u oħloq sessjoni b'għerqha
   fid-direttorju tax-xogħol magħżul. L-inizjalizzazzjoni għandha limitu ta' għaxar sekondi.
2. Ibgħat prompt u iġbor in-notifiki testwali għal dik is-sessjoni biss.
   It-tlestija hija r-risposta RPC tal-prompt, mhux perjodu ta' silenzju fuq stdout.
3. Uża skadenza waħda għall-prompt, inkluża kwalunkwe inizjalizzazzjoni mhux mitmuma; il-valur
   predefinit huwa 120 sekonda. Prompts konkorrenti fl-istess proċess jiġu rrifjutati.
4. Meta jinqabeż il-limitu taż-żmien nattiv, ipprova `session/cancel` u waqqaf il-proċess. Tieqa
   limitata ta' 100 ms tippermetti li n-notifika tintbagħat kollha qabel it-twaqqif.
5. Agħlaq l-istat tat-trasport u neħħi s-sessjoni meta l-inizjalizzazzjoni tfalli, il-
   konnessjoni tingħalaq, il-proċess jintemm, jew is-sejjieħ iwaqqfu.

It-talbiet għall-permessi tal-għodod jiġu miċħuda. Ma jiġu ddikjarati l-ebda kapaċitajiet tal-klijent
għas-sistema tal-fajls jew għat-terminal. Dawn ir-restrizzjonijiet ma jpoġġux il-binarju child innifsu
f'sandbox u lanqas ma jissostitwixxu s-settings ta' awtorizzazzjoni tas-CLI stess.

Kemm it-test nattiv kif ukoll stdout/stderr tradizzjonali jżommu mhux aktar minn 1 MiB ta' karattri,
filwaqt li jżommu l-output l-aktar reċenti flimkien ma' avviż ta' qtugħ. Frame nattiv individwali
fuq il-wire huwa limitat għal 2 MiB ta' bytes qabel l-ipproċessar mill-SDK. Il-buffers jiġu ssettjati mill-ġdid għal kull prompt.

`kill(sessionId)` jibgħat SIGTERM, imbagħad SIGKILL wara ħames sekondi jekk il-proċess
ma jkunx intemm. Meta l-prompts tradizzjonali jaqbżu l-limitu taż-żmien, il-listeners u t-timers jiġu rilaxxati iżda
s-sessjoni tibqa' disponibbli għal prompt ieħor; is-sejjieħa jibqgħu responsabbli biex jużaw
`kill()` jew `killAll()` meta jispiċċaw.

## Avvenimenti u spezzjoni

Il-manager jarmi `stdout`, `stderr`, u `exit`, kull wieħed b'`sessionId`.
`sessionError` jirrapporta żball tat-trasport sanitizzat. L-avveniment ta' kompatibbiltà `error`
jinħareġ biss meta jkollu abbonat, sabiex binarju nieqes ma jkunx jista'
jikkawża żball EventEmitter mhux immaniġġjat.

- `getSession(sessionId)` jirritorna sessjoni ġestita jew `undefined`.
- `getActiveSessions()` jeskludi sessjonijiet imwaqqfa jew li qed jitwaqqfu.
- `sendInput(sessionId, input)` huwa disponibbli biss għal adapter tradizzjonali attiv;
  ACP nattiv jirrifjuta input mhux ipproċessat biex jipproteġi l-fluss JSON-RPC tiegħu.
- `killAll()` itemm kull sessjoni ġestita minn dik l-istanza.

## Limiti tal-validazzjoni

Fixtures deterministiċi jkopru l-handshake nattiv, l-output testwali, il-permessi
miċħuda, il-kanċellazzjoni, il-prompts konkorrenti, l-inizjalizzazzjoni falluta, it-tmiem tal-
proċess, il-limiti tal-output, u l-iżolament tas-sigrieti. Ir-rigressjonijiet eżistenti tal-buffer/listener
tradizzjonali jibqgħu koperti. Dawn it-testijiet ma jurux login attiv ma' Gemini
jew inferenza b'suċċess mill-fornitur; dawn jeħtieġu smoke test awtorizzat separatament
fl-ambjent fil-mira.

## Dokumentazzjoni relatata

- [Protokolli tal-aġenti](./AGENT_PROTOCOLS_GUIDE.md)
- [Kuntratti tat-tnedija tas-CLI](../guides/CLI-LAUNCH-CONTRACTS.md)
- [Għodod tas-CLI](../reference/CLI-TOOLS.md)
- [Server A2A](./A2A-SERVER.md)
- [Aġenti tal-cloud](./CLOUD_AGENT.md)
