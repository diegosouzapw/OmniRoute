# ACP registry and registered CLI launchers (Latviešu)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/ACP.md) · 🇪🇹 [am](../../../am/docs/frameworks/ACP.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/ACP.md) · 🇦🇿 [az](../../../az/docs/frameworks/ACP.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/ACP.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/ACP.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/ACP.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/ACP.md) · 🇩🇰 [da](../../../da/docs/frameworks/ACP.md) · 🇩🇪 [de](../../../de/docs/frameworks/ACP.md) · 🇬🇷 [el](../../../el/docs/frameworks/ACP.md) · 🇪🇸 [es](../../../es/docs/frameworks/ACP.md) · 🇪🇪 [et](../../../et/docs/frameworks/ACP.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/ACP.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/ACP.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/ACP.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/ACP.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/ACP.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/ACP.md) · 🇮🇱 [he](../../../he/docs/frameworks/ACP.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/ACP.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/ACP.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/ACP.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/ACP.md) · 🇮🇩 [id](../../../id/docs/frameworks/ACP.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/ACP.md) · 🇮🇹 [it](../../../it/docs/frameworks/ACP.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/ACP.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/ACP.md) · 🇰🇭 [km](../../../km/docs/frameworks/ACP.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/ACP.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/ACP.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/ACP.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/ACP.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/ACP.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/ACP.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/ACP.md) · 🇲🇲 [my](../../../my/docs/frameworks/ACP.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/ACP.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/ACP.md) · 🇳🇴 [no](../../../no/docs/frameworks/ACP.md) · 🇮🇳 [or](../../../or/docs/frameworks/ACP.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/ACP.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/ACP.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/ACP.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/ACP.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/ACP.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/ACP.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/ACP.md) · 🇱🇰 [si](../../../si/docs/frameworks/ACP.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/ACP.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/ACP.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/ACP.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/ACP.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/ACP.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/ACP.md) · 🇮🇳 [te](../../../te/docs/frameworks/ACP.md) · 🇹🇭 [th](../../../th/docs/frameworks/ACP.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/ACP.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/ACP.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/ACP.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/ACP.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/ACP.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/ACP.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/ACP.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/ACP.md)

---

OmniRoute nodala **CLI noteikšanu**, **vietējo Agent Client Protocol** un
**mantotos stdio adapterus**. Instalēta binārā faila atrašana neapliecina tā
autentifikāciju, modeļa saderību vai gatavību apstrādāt uzvedni.

Informācijas panelis izmanto `GET /api/acp/agents` un `POST /api/acp/agents`, lai
uzskaitītu un reģistrētu pielāgotus aģentus. Tie ir tikai lokālai lietošanai
paredzēti pārvaldības maršruti, nevis publiska API procesu palaišanai vai uzvedņu
iesniegšanai. Iekšējais `AcpManager` automātiski nekļūst par HTTP nodrošinātāja
atkāpšanās mehānismu.

## Reģistrētie līgumi

`config/cli-tools-manifest.json` ir autoritatīvais avots iebūvētajām palaišanas
binārajām programmām, argumentiem un aizmugursistēmas režīmiem. Reģistrs atvasina
savas definīcijas no šī manifesta. Noteikšanas rezultāts tiek kešots 60 sekundes.

- `acp`: Gemini līgums palaiž `gemini --experimental-acp` un sazinās, izmantojot
  ar jaunrindām atdalītu ACP JSON-RPC, ar oficiālā TypeScript SDK starpniecību.
- `stdio-adapter`: citi reģistrētie līgumi saglabā mantoto adapteri, kas saņem
  ievadi pa rindām un izvada rezultātu uz stdout. Divu sekunžu izvades dīkstāves
  periods pabeidz tā atbildi. Šis adapters **neapliecina** šo CLI vietējo ACP
  atbalstu.

Gemini dokumentē palaišanas karodziņu savā [CLI atsaucē](https://geminicli.com/docs/cli/cli-reference/).
Klients izmanto [oficiālo ACP SDK](https://github.com/agentclientprotocol/typescript-sdk)
inicializācijai, sesiju izveidei, uzvedņu pieprasījumiem, paziņojumiem un atcelšanai.

Pielāgoto aģentu definīcijas joprojām ir administratora pārvaldīti palaišanas
līgumi. Binārās programmas un argumentu reģistrēšana piešķir šim procesam servera
lietotāja lokālās izpildes privilēģijas; reģistrācija nav smilškaste. Versijas
pārbaudes pieņem tikai reģistrēto izpildāmo failu un atpazītu versijas karodziņu.

## Iekšējā palaišanas API

```typescript
import { acpManager } from "@/lib/acp";

const session = acpManager.spawn("gemini", {
  cwd: process.cwd(),
  // Nododiet tikai šim aģentam apzināti piešķirtos nodrošinātāja mainīgos.
  env: {
    GEMINI_API_KEY: process.env.GEMINI_API_KEY,
  },
});

try {
  const response = await acpManager.sendPrompt(session.id, "Izskaidro šo projektu", 120_000);
  // Izmantojiet atbildi izsaucošajā lietojumprogrammā.
} finally {
  acpManager.kill(session.id);
}
```

`spawn(agentId, options)` nosaka izpildāmo failu un argumentus no reģistrētās
definīcijas. Vienīgās izsaucējam pieejamās opcijas ir `cwd` un `env`; vecais
`spawn(agentId, binary, args, env)` paraksts un izpildāmā faila aizstāšana tiek
noraidīti. Šis pārvaldnieks neatbalsta HTTP palaišanas līgumus.

Bērnprocess manto tos pašus operētājsistēmas, termināļa, lokalizācijas un
sertifikātu atļauto sarakstu iestatījumus, ko CLI palaidēji. Servera/nodrošinātāja
noslēpumi netiek kopēti no vecākprocesa vides. Izvēlētajam CLI nepieciešamie
akreditācijas dati ir jānodod tieši vai jānodrošina, izmantojot paša CLI lokālo
autentifikāciju. Bērnprocesam joprojām ir lokālā lietotāja failu sistēmas
atļaujas, un tas var lasīt savu konfigurāciju.

## Vietējais dzīves cikls un ierobežojumi

1. Palaidiet reģistrēto bināro programmu, inicializējiet ACP un izveidojiet sesiju,
   kuras sakne ir atlasītais darba direktorijs. Inicializācijas ierobežojums ir
   desmit sekundes.
2. Iesniedziet uzvedni un apkopojiet teksta paziņojumus tikai šai sesijai.
   Pabeigšanu nosaka uzvednes RPC atbilde, nevis stdout klusuma periods.
3. Izmantojiet vienu uzvednes termiņu, ieskaitot nepabeigtu inicializāciju;
   noklusējums ir 120 sekundes. Vienlaicīgas uzvednes vienā procesā tiek
   noraidītas.
4. Vietējā noildzes gadījumā mēģiniet izpildīt `session/cancel` un pārtrauciet
   procesu. Ierobežots 100 ms logs ļauj paziņojumam tikt nosūtītam pirms procesa
   pārtraukšanas.
5. Aizveriet transporta stāvokli un noņemiet sesiju, ja inicializācija neizdodas,
   savienojums tiek aizvērts, process beidz darbu vai izsaucējs to aptur.

Rīku atļauju pieprasījumi tiek noraidīti. Failu sistēmas vai termināļa klienta
iespējas netiek reklamētas. Šie ierobežojumi neievieto pašu bērnprocesa bināro
programmu smilškastē un neaizstāj paša CLI autorizācijas iestatījumus.

Gan vietējais teksts, gan mantotā stdout/stderr izvade saglabā ne vairāk kā 1 MiB
rakstzīmju, paturot jaunāko izvadi kopā ar paziņojumu par apcirpšanu. Atsevišķa
vietējā protokola kadra izmērs pirms SDK parsēšanas ir ierobežots līdz 2 MiB
baitiem. Buferi tiek atiestatīti katrai uzvednei.

`kill(sessionId)` nosūta SIGTERM un pēc piecām sekundēm — SIGKILL, ja process nav
beidzis darbu. Mantoto uzvedņu noildzes atbrīvo klausītājus un taimerus, bet
atstāj sesiju pieejamu citai uzvednei; izsaucēji joprojām ir atbildīgi par
`kill()` vai `killAll()` izsaukšanu pēc darba pabeigšanas.

## Notikumi un pārbaude

Pārvaldnieks izstaro `stdout`, `stderr` un `exit`; katrs no tiem ietver
`sessionId`. `sessionError` ziņo par sanitizētu transporta kļūdu. Saderības
notikums `error` tiek izstarots tikai tad, ja tam ir abonents, tādēļ trūkstoša
binārā programma nevar izraisīt neapstrādātu EventEmitter kļūdu.

- `getSession(sessionId)` atgriež pārvaldītu sesiju vai `undefined`.
- `getActiveSessions()` neietver apturētas sesijas vai sesijas, kuru apturēšana
  notiek.
- `sendInput(sessionId, input)` ir pieejams tikai aktīvam mantotajam adapteram;
  vietējais ACP noraida neapstrādātu ievadi, lai aizsargātu savu JSON-RPC plūsmu.
- `killAll()` pārtrauc visas šīs instances pārvaldītās sesijas.

## Validācijas robežas

Deterministiski testa dati aptver vietējo sākotnējo saziņu, teksta izvadi,
noraidītās atļaujas, atcelšanu, vienlaicīgas uzvednes, neveiksmīgu inicializāciju,
procesa beigšanu, izvades ierobežojumus un noslēpumu izolāciju. Joprojām tiek
aptvertas esošās mantoto buferu/klausītāju regresijas. Šie testi neapliecina
aktīvu Gemini pieteikšanos vai veiksmīgu nodrošinātāja secinājumu ģenerēšanu;
tam nepieciešams atsevišķi autorizēts pārbaudes tests mērķa vidē.

## Saistītā dokumentācija

- [Aģentu protokoli](./AGENT_PROTOCOLS_GUIDE.md)
- [CLI palaišanas līgumi](../guides/CLI-LAUNCH-CONTRACTS.md)
- [CLI rīki](../reference/CLI-TOOLS.md)
- [A2A serveris](./A2A-SERVER.md)
- [Mākoņa aģenti](./CLOUD_AGENT.md)
