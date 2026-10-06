# ACP registry and registered CLI launchers (Lietuvių)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/ACP.md) · 🇪🇹 [am](../../../am/docs/frameworks/ACP.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/ACP.md) · 🇦🇿 [az](../../../az/docs/frameworks/ACP.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/ACP.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/ACP.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/ACP.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/ACP.md) · 🇩🇰 [da](../../../da/docs/frameworks/ACP.md) · 🇩🇪 [de](../../../de/docs/frameworks/ACP.md) · 🇬🇷 [el](../../../el/docs/frameworks/ACP.md) · 🇪🇸 [es](../../../es/docs/frameworks/ACP.md) · 🇪🇪 [et](../../../et/docs/frameworks/ACP.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/ACP.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/ACP.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/ACP.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/ACP.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/ACP.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/ACP.md) · 🇮🇱 [he](../../../he/docs/frameworks/ACP.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/ACP.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/ACP.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/ACP.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/ACP.md) · 🇮🇩 [id](../../../id/docs/frameworks/ACP.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/ACP.md) · 🇮🇹 [it](../../../it/docs/frameworks/ACP.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/ACP.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/ACP.md) · 🇰🇭 [km](../../../km/docs/frameworks/ACP.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/ACP.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/ACP.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/ACP.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/ACP.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/ACP.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/ACP.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/ACP.md) · 🇲🇲 [my](../../../my/docs/frameworks/ACP.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/ACP.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/ACP.md) · 🇳🇴 [no](../../../no/docs/frameworks/ACP.md) · 🇮🇳 [or](../../../or/docs/frameworks/ACP.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/ACP.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/ACP.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/ACP.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/ACP.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/ACP.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/ACP.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/ACP.md) · 🇱🇰 [si](../../../si/docs/frameworks/ACP.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/ACP.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/ACP.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/ACP.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/ACP.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/ACP.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/ACP.md) · 🇮🇳 [te](../../../te/docs/frameworks/ACP.md) · 🇹🇭 [th](../../../th/docs/frameworks/ACP.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/ACP.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/ACP.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/ACP.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/ACP.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/ACP.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/ACP.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/ACP.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/ACP.md)

---

OmniRoute atskiria **CLI aptikimą**, **savitąjį Agent Client Protocol** ir
**senesnius stdio adapterius**. Įdiegto vykdomojo failo aptikimas nepatvirtina jo
autentifikavimo, modelio suderinamumo ar pasirengimo apdoroti užklausą.

Valdymo skydelis naudoja `GET /api/acp/agents` ir `POST /api/acp/agents` inventoriui
bei pasirinktinių agentų registracijai. Tai yra tik vietiniam naudojimui skirti valdymo maršrutai, o ne
viešoji API procesams paleisti ar užklausoms pateikti. Vidinis
`AcpManager` automatiškai netampa atsarginiu HTTP teikėju.

## Registruotos sutartys

`config/cli-tools-manifest.json` yra pagrindinis integruotųjų paleidimo
vykdomųjų failų, argumentų ir posistemės režimų informacijos šaltinis. Registras savo apibrėžtis
išveda iš šio manifesto. Aptikimo rezultatai podėlyje saugomi 60 sekundžių.

- `acp`: pagal Gemini sutartį paleidžiama `gemini --experimental-acp` ir naudojamas
  naujomis eilutėmis atskirtas ACP JSON-RPC per oficialų TypeScript SDK.
- `stdio-adapter`: kitose registruotose sutartyse išlaikomas senesnis adapteris, kuris priima
  įvestį naujomis eilutėmis ir pateikia išvestį per stdout. Dviejų sekundžių išvesties neveiklos laikotarpis užbaigia atsakymą.
  Šis adapteris **nepatvirtina** savitojo ACP palaikymo šiose CLI priemonėse.

Gemini paleidimo žymą aprašo savo [CLI žinyne](https://geminicli.com/docs/cli/cli-reference/).
Klientas naudoja [oficialų ACP SDK](https://github.com/agentclientprotocol/typescript-sdk)
inicijavimui, seansų kūrimui, užklausoms, pranešimams ir atšaukimui.

Pasirinktinių agentų apibrėžtys išlieka administratoriaus valdomomis paleidimo sutartimis.
Vykdomojo failo ir argumentų registravimas suteikia tam procesui serverio naudotojo vietines
vykdymo teises; registracija nėra smėlio dėžė. Versijos tikrinimo užklausose priimamas
tik registruotas vykdomasis failas ir atpažinta versijos žyma.

## Vidinė paleidimo API

```typescript
import { acpManager } from "@/lib/acp";

const session = acpManager.spawn("gemini", {
  cwd: process.cwd(),
  // Perduokite tik šiam agentui sąmoningai priskirtus teikėjo kintamuosius.
  env: {
    GEMINI_API_KEY: process.env.GEMINI_API_KEY,
  },
});

try {
  const response = await acpManager.sendPrompt(session.id, "Paaiškink šį projektą", 120_000);
  // Panaudokite atsakymą kviečiančiojoje programoje.
} finally {
  acpManager.kill(session.id);
}
```

`spawn(agentId, options)` vykdomąjį failą ir argumentus nustato pagal
registruotą apibrėžtį. Vienintelės kviečiančiajam prieinamos parinktys yra `cwd` ir `env`; senoji
`spawn(agentId, binary, args, env)` signatūra ir vykdomojo failo perrašymai yra
atmetami. Ši tvarkyklė nepalaiko HTTP paleidimo sutarčių.

Antrinis procesas paveldi tas pačias operacinės sistemos, terminalo, lokalės ir sertifikatų
leidžiamųjų sąrašo nuostatas kaip ir CLI paleidyklės. Serverio ar teikėjo paslaptys iš
pirminio proceso aplinkos nekopijuojamos. Pasirinktai CLI priemonei reikalingi prisijungimo duomenys turi būti perduoti
aiškiai arba pateikti naudojant pačios CLI priemonės vietinį autentifikavimą. Antrinis procesas
vis tiek turi vietinio naudotojo failų sistemos teises ir gali skaityti savo konfigūraciją.

## Savasis gyvavimo ciklas ir apribojimai

1. Paleiskite registruotą vykdomąjį failą, inicijuokite ACP ir sukurkite seansą, kurio šaknis yra
   pasirinktas darbinis katalogas. Inicijavimui taikomas dešimties sekundžių limitas.
2. Pateikite užklausą ir rinkite tik tam seansui skirtus tekstinius pranešimus.
   Užbaigimą nurodo užklausos RPC atsakymas, o ne stdout tylos laikotarpis.
3. Naudokite vieną užklausos terminą, apimantį ir bet kokį neužbaigtą inicijavimą; numatytoji
   trukmė yra 120 sekundžių. Lygiagrečios užklausos tame pačiame procese atmetamos.
4. Pasibaigus savajai skirtajai trukmei, bandykite vykdyti `session/cancel` ir nutraukite procesą. Ribotas
   100 ms laikotarpis leidžia išsiųsti pranešimą prieš nutraukiant procesą.
5. Uždarykite transporto būseną ir pašalinkite seansą, kai inicijavimas nepavyksta,
   ryšys uždaromas, procesas baigiamas arba kviečiantysis jį nutraukia.

Įrankių leidimų užklausos atmetamos. Jokios failų sistemos ar terminalo kliento
galimybės neskelbiamos. Šie apribojimai neizoliuoja paties antrinio vykdomojo failo
smėlio dėžėje ir nepakeičia pačios CLI priemonės autorizavimo nuostatų.

Tiek savajame tekste, tiek senesnėje stdout/stderr išvestyje išlaikoma daugiausia 1 MiB simbolių,
paliekant naujausią išvestį su pranešimu apie sutrumpinimą. Atskiras savasis perdavimo
kadras prieš SDK analizę ribojamas iki 2 MiB baitų. Buferiai nustatomi iš naujo kiekvienai užklausai.

`kill(sessionId)` siunčia SIGTERM, o po penkių sekundžių – SIGKILL, jei procesas
nebuvo baigtas. Pasibaigus senesnės užklausos skirtajai trukmei, klausytojai ir laikmačiai atlaisvinami, tačiau
seansas paliekamas prieinamas kitai užklausai; baigę darbą kviečiantieji ir toliau privalo iškviesti
`kill()` arba `killAll()`.

## Įvykiai ir tikrinimas

Tvarkyklė išsiunčia `stdout`, `stderr` ir `exit` įvykius, kiekvieną su `sessionId`.
`sessionError` praneša apie išvalytą transporto klaidą. Suderinamumo `error`
įvykis išsiunčiamas tik tada, kai turi prenumeratorių, todėl trūkstamas vykdomasis failas
negali sukelti neapdorotos EventEmitter klaidos.

- `getSession(sessionId)` grąžina valdomą seansą arba `undefined`.
- `getActiveSessions()` neįtraukia sustabdytų ar stabdomų seansų.
- `sendInput(sessionId, input)` pasiekiama tik aktyviam senesniam adapteriui;
  savasis ACP atmeta neapdorotą įvestį, kad apsaugotų savo JSON-RPC srautą.
- `killAll()` nutraukia visus to egzemplioriaus valdomus seansus.

## Tikrinimo ribos

Deterministiniai testiniai duomenys apima savąją užmezgimo procedūrą, tekstinę išvestį, atmestus
leidimus, atšaukimą, lygiagrečias užklausas, nepavykusį inicijavimą, proceso
baigimą, išvesties ribas ir paslapčių izoliavimą. Esamos senesnių buferių ir klausytojų
regresijos tebėra testuojamos. Šie testai nepatvirtina veikiančio Gemini prisijungimo
ar sėkmingos teikėjo inferencijos; tam tikslinėje aplinkoje reikalingas atskirai autorizuotas kontrolinis
testas.

## Susijusi dokumentacija

- [Agentų protokolai](./AGENT_PROTOCOLS_GUIDE.md)
- [CLI paleidimo sutartys](../guides/CLI-LAUNCH-CONTRACTS.md)
- [CLI įrankiai](../reference/CLI-TOOLS.md)
- [A2A serveris](./A2A-SERVER.md)
- [Debesijos agentai](./CLOUD_AGENT.md)
