# Delegated Context Editing (Anthropic) (Lietuvių)

🌐 **Languages:** 🇺🇸 [English](../../../../compression/CONTEXT_EDITING.md) · 🇪🇹 [am](../../../am/docs/compression/CONTEXT_EDITING.md) · 🇸🇦 [ar](../../../ar/docs/compression/CONTEXT_EDITING.md) · 🇦🇿 [az](../../../az/docs/compression/CONTEXT_EDITING.md) · 🇧🇬 [bg](../../../bg/docs/compression/CONTEXT_EDITING.md) · 🇧🇩 [bn](../../../bn/docs/compression/CONTEXT_EDITING.md) · 🇨🇿 [cs](../../../cs/docs/compression/CONTEXT_EDITING.md) · 🇩🇰 [da](../../../da/docs/compression/CONTEXT_EDITING.md) · 🇩🇪 [de](../../../de/docs/compression/CONTEXT_EDITING.md) · 🇬🇷 [el](../../../el/docs/compression/CONTEXT_EDITING.md) · 🇪🇸 [es](../../../es/docs/compression/CONTEXT_EDITING.md) · 🇪🇪 [et](../../../et/docs/compression/CONTEXT_EDITING.md) · 🇮🇷 [fa](../../../fa/docs/compression/CONTEXT_EDITING.md) · 🇫🇮 [fi](../../../fi/docs/compression/CONTEXT_EDITING.md) · 🇫🇷 [fr](../../../fr/docs/compression/CONTEXT_EDITING.md) · 🇮🇪 [ga](../../../ga/docs/compression/CONTEXT_EDITING.md) · 🇮🇳 [gu](../../../gu/docs/compression/CONTEXT_EDITING.md) · 🇳🇬 [ha](../../../ha/docs/compression/CONTEXT_EDITING.md) · 🇮🇱 [he](../../../he/docs/compression/CONTEXT_EDITING.md) · 🇮🇳 [hi](../../../hi/docs/compression/CONTEXT_EDITING.md) · 🇭🇷 [hr](../../../hr/docs/compression/CONTEXT_EDITING.md) · 🇭🇺 [hu](../../../hu/docs/compression/CONTEXT_EDITING.md) · 🇦🇲 [hy](../../../hy/docs/compression/CONTEXT_EDITING.md) · 🇮🇩 [id](../../../id/docs/compression/CONTEXT_EDITING.md) · 🇳🇬 [ig](../../../ig/docs/compression/CONTEXT_EDITING.md) · 🇮🇹 [it](../../../it/docs/compression/CONTEXT_EDITING.md) · 🇯🇵 [ja](../../../ja/docs/compression/CONTEXT_EDITING.md) · 🇬🇪 [ka](../../../ka/docs/compression/CONTEXT_EDITING.md) · 🇰🇭 [km](../../../km/docs/compression/CONTEXT_EDITING.md) · 🇮🇳 [kn](../../../kn/docs/compression/CONTEXT_EDITING.md) · 🇰🇷 [ko](../../../ko/docs/compression/CONTEXT_EDITING.md) · 🇱🇻 [lv](../../../lv/docs/compression/CONTEXT_EDITING.md) · 🇮🇳 [ml](../../../ml/docs/compression/CONTEXT_EDITING.md) · 🇮🇳 [mr](../../../mr/docs/compression/CONTEXT_EDITING.md) · 🇲🇾 [ms](../../../ms/docs/compression/CONTEXT_EDITING.md) · 🇲🇹 [mt](../../../mt/docs/compression/CONTEXT_EDITING.md) · 🇲🇲 [my](../../../my/docs/compression/CONTEXT_EDITING.md) · 🇳🇵 [ne](../../../ne/docs/compression/CONTEXT_EDITING.md) · 🇳🇱 [nl](../../../nl/docs/compression/CONTEXT_EDITING.md) · 🇳🇴 [no](../../../no/docs/compression/CONTEXT_EDITING.md) · 🇮🇳 [or](../../../or/docs/compression/CONTEXT_EDITING.md) · 🇮🇳 [pa](../../../pa/docs/compression/CONTEXT_EDITING.md) · 🇵🇭 [phi](../../../phi/docs/compression/CONTEXT_EDITING.md) · 🇵🇱 [pl](../../../pl/docs/compression/CONTEXT_EDITING.md) · 🇵🇹 [pt](../../../pt/docs/compression/CONTEXT_EDITING.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/compression/CONTEXT_EDITING.md) · 🇷🇴 [ro](../../../ro/docs/compression/CONTEXT_EDITING.md) · 🇷🇺 [ru](../../../ru/docs/compression/CONTEXT_EDITING.md) · 🇱🇰 [si](../../../si/docs/compression/CONTEXT_EDITING.md) · 🇸🇰 [sk](../../../sk/docs/compression/CONTEXT_EDITING.md) · 🇸🇮 [sl](../../../sl/docs/compression/CONTEXT_EDITING.md) · 🇷🇸 [sr](../../../sr/docs/compression/CONTEXT_EDITING.md) · 🇸🇪 [sv](../../../sv/docs/compression/CONTEXT_EDITING.md) · 🇰🇪 [sw](../../../sw/docs/compression/CONTEXT_EDITING.md) · 🇮🇳 [ta](../../../ta/docs/compression/CONTEXT_EDITING.md) · 🇮🇳 [te](../../../te/docs/compression/CONTEXT_EDITING.md) · 🇹🇭 [th](../../../th/docs/compression/CONTEXT_EDITING.md) · 🇹🇷 [tr](../../../tr/docs/compression/CONTEXT_EDITING.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/compression/CONTEXT_EDITING.md) · 🇵🇰 [ur](../../../ur/docs/compression/CONTEXT_EDITING.md) · 🇺🇿 [uz](../../../uz/docs/compression/CONTEXT_EDITING.md) · 🇻🇳 [vi](../../../vi/docs/compression/CONTEXT_EDITING.md) · 🇳🇬 [yo](../../../yo/docs/compression/CONTEXT_EDITING.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/compression/CONTEXT_EDITING.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/compression/CONTEXT_EDITING.md)

---

Deleguotasis **konteksto redagavimas** yra tik Claude skirta konteksto valdymo funkcija. Kitaip nei vietiniai
OmniRoute glaudinimo varikliai (Caveman, RTK, LLMLingua, sudėtinės grandinės), kurie perrašo užklausos turinį
_prieš_ jam paliekant tarpinį serverį, konteksto redagavimas prašo **teikėjo** pašalinti pasenusius
įrankių naudojimo / įrankių rezultatų blokus iš jo paties aktyvaus konteksto lango. OmniRoute tik prideda turinio
parametrą (`context_management.edits[]`); faktinį valymą pagal savo tokenizatorių atlieka Claude.

Tai iš esmės yra deleguota galimybė: kiti teikėjai šį parametrą atmeta, todėl OmniRoute griežtai apriboja
jo naudojimą Claude ir su Claude Code suderinamomis tarpinėmis paslaugomis.

Pirminiai šaltiniai: `open-sse/config/contextEditing.ts` (strategijų ID, įterpimas į turinį, telemetrijos
išgavimas), `open-sse/executors/base.ts` (įterpimo patikra ir atsarginis veikimas gavus 400) ir
`open-sse/services/compression/types.ts` (konfigūracijos struktūra ir numatytoji reikšmė).

## Ką daro `clear_tool_uses`

OmniRoute į siunčiamą Anthropic Messages turinį įterpia vieną redagavimo operaciją:

```json
{
  "context_management": {
    "edits": [
      {
        "type": "clear_tool_uses_20250919",
        "trigger": { "type": "input_tokens", "value": 100000 },
        "keep": { "type": "tool_uses", "value": 3 }
      }
    ]
  }
}
```

- `type: "clear_tool_uses_20250919"` — datuotas Anthropic strategijos ID (`CLEAR_TOOL_USES_STRATEGY`).
- `trigger.value: 100000` — kai užklausos įvesties tokenų skaičius viršija šią ribą, Claude pradeda
  šalinti senas įrankių naudojimo / rezultatų poras (`CONTEXT_EDITING_DEFAULT_TRIGGER_TOKENS`, numatytoji Anthropic reikšmė).
- `keep.value: 3` — N naujausių įrankių naudojimo / rezultatų porų paliekamos nepakeistos
  (`CONTEXT_EDITING_DEFAULT_KEEP_TOOL_USES`).

Beta funkcija nurodoma antrašte `anthropic-beta: context-management-2025-06-27`, kurią
OmniRoute jau siunčia Claude užklausose.

Įterpimą atlieka `applyContextEditingToBody()`, ir ši operacija yra **idempotentinė**: jei `clear_tool_uses`
redagavimo operacija turinyje jau yra (pridėta ankstesnio iškvietimo arba pateikta kliento), turinys
paliekamas nepakeistas. Jei taip pat yra `clear_thinking_20251015` redagavimo operacija, OmniRoute stabiliai surikiuoja
`clear_thinking` operaciją į pradžią, nes Anthropic reikalauja, kad `clear_thinking` būtų pateikta prieš
`clear_tool_uses` masyve `edits[]`.

## Kiekvieno derinio įjungimo jungiklis

Konteksto redagavimas pagal numatytuosius nustatymus yra **išjungtas** ir turi būti įjungiamas pasirinktinai. Jungiklis yra viena loginė reikšmė, saugoma
glaudinimo konfigūracijoje:

- Nustatymo raktas: `contextEditing.enabled` (camelCase — **ne** `context_editing` / `context-editing`).
- Tipas: `ContextEditingConfig { enabled: boolean }`, esantis
  `open-sse/services/compression/types.ts`.
- Numatytoji reikšmė: `DEFAULT_CONTEXT_EDITING_CONFIG = { enabled: false }`.
- Zod schema: `contextEditingConfigSchema`, esanti `src/shared/validation/compressionConfigSchemas.ts`.
- Saugojimas: išsaugoma kartu su likusiais glaudinimo nustatymais (normalizuojama
  `src/lib/db/compression.ts`).

Valdymo skydelyje jungiklis yra glaudinimo centre
(`src/app/(dashboard)/dashboard/context/combos/CompressionHub.tsx`) ir per `saveSettings()` įrašo
`{ contextEditing: { enabled: … } }`. Kadangi jis perduodamas kaip glaudinimo nustatymų objekto dalis,
jis veikia kartu su kiekvieno derinio glaudinimo profiliu, o ne kaip visiškai nepriklausoma sąsajos dalis — konfigūracijoje yra tik
įjungimo / išjungimo vėliavėlė; visos ribinės reikšmės (`trigger`,
`keep`) yra pirmiau aprašytos konstantos.

## Tik Claude skirtas ribojimas

Įterpimas atliekamas tik naudojant tikrą „Claude“ arba su „Claude Code“ suderinamus tarpinius serverius. Sąlyga faile
`open-sse/executors/base.ts` yra:

```ts
if (
  (this.provider === "claude" || isClaudeCodeCompatible(this.provider)) &&
  contextEditing?.enabled &&
  !contextEditingDisabled
) {
  applyContextEditingToBody(transformedBody, { enabled: true });
}
```

- `this.provider === "claude"` — tikras „Anthropic“ raktas / OAuth.
- `isClaudeCodeCompatible(this.provider)` — tarpiniai serveriai, kurių teikėjo ID prasideda
  prefiksu `anthropic-compatible-cc-` (jie deklaruoja suderinamumą su „Claude Code“, todėl būtent šie
  tarpiniai serveriai greičiausiai priims beta funkciją). Žr. `open-sse/services/provider.ts`.

Sąmoningai **neįtraukti**:

- `claude-web` — naršyklės tarpinis serveris, naudojantis `create_conversation_params` užklausos
  struktūrą, kuri niekada negauna `context_management`.
- Bendrieji `anthropic-compatible-*` tarpiniai serveriai (be prefikso `-cc-`) — trečiųjų šalių
  galiniai taškai, kurių beta funkcijos palaikymas nėra aiškus.

Ne „Claude“ teikėjai niekada negauna parametro `context_management`, net kai jungiklis įjungtas.

## 400 atsarginis mechanizmas / tarpinių serverių aprėptis

Su „Claude“ suderinamas tarpinis serveris gali deklaruoti beta funkciją, bet vis tiek atmesti
parametrą `context_management`, pateikdamas HTTP 400. Kad užklausa būtų korektiškai vykdoma toliau,
užuot nutrūkusi, vykdyklė pašalina parametrą ir **vieną kartą** pakartoja užklausą tuo pačiu URL:

```ts
if (
  response.status === HTTP_STATUS.BAD_REQUEST &&
  contextEditing?.enabled &&
  !contextEditingDisabled &&
  transformedBody?.context_management !== undefined
) {
  const errText = await response
    .clone()
    .text()
    .catch(() => "");
  if (/context[_-]management|context editing/i.test(errText)) {
    contextEditingDisabled = true;
    delete transformedBody.context_management;
    let retryBody = JSON.stringify(transformedBody);
    if (isClaudeCodeCompatible(this.provider) || this.provider === "claude") {
      retryBody = await signRequestBody(retryBody);
    }
    response = await fetch(url, { ...fetchOptions, body: retryBody });
  }
}
```

Veikimas:

1. Suaktyvinamas tik gavus `400`, kai konteksto redagavimas įjungtas ir užklausos turinyje iš tikrųjų
   yra `context_management`.
2. 400 atsakymo turinys skaitomas naudojant `clone()`, todėl pradinis atsakymas lieka nepakeistas
   neatitikties atvejui.
3. Klaidos tekstas turi atitikti `/context[_-]management|context editing/i` — nesusijusi 400 klaida
   (pvz., `max_tokens must be >= 1`) **nesuaktyvina** atsarginio mechanizmo; pradinė klaida perduodama
   toliau.
4. Radus atitiktį, nustatoma `contextEditingDisabled = true` (tai neleidžia pakartotinai įterpti
   parametro, jei vėliau naujam bandymui ar atsarginiam URL sukuriamas naujas `transformedBody`),
   pašalinamas `context_management`, „Claude“ / su „Claude Code“ suderinamiems tarpiniams serveriams
   turinys iš naujo pasirašomas (`signRequestBody`) ir užklausa tuo pačiu URL pakartojama vieną kartą.

Naudojant tikrą „Claude“, beta funkcija perduodama per `ANTHROPIC_BETA_BASE`, todėl šis atsarginis
mechanizmas nesuaktyvinamas.

## `applied_edits` telemetrija

Gavusi „Claude“ atsakymą, „OmniRoute“ užregistruoja, kiek konteksto teikėjas iš tikrųjų pašalino. Šie
duomenys **nesiunčiami srautu** — jie dedant visas pastangas išgaunami iš ne srautiniu būdu perduodamo
atsakymo turinio ir niekada nepaveikia atsakymo (telemetrijos klaidos ignoruojamos).

- Išgavimas: `extractContextEditingTelemetry(responseBody)` faile
  `open-sse/config/contextEditing.ts`. Ji tikrina `applied_edits` trijose vietose (apsidraudžiant dėl
  atsakymo struktūros):
  - `context_management.applied_edits`
  - `usage.context_management.applied_edits`
  - `usage.applied_edits`
- Iš kiekvieno įrašo skaitomi šie laukai: `cleared_input_tokens` ir `cleared_tool_uses`
  („Anthropic“ naudojamas snake_case formatas), o kaip atsarginiai variantai naudojami camelCase
  laukai `clearedInputTokens` / `clearedToolUses`.
- Grąžina `null`, kai nerandamas joks `applied_edits` masyvas arba faktiškai niekas nebuvo pašalinta.

Kvito struktūra yra `ContextEditingTelemetry { editCount, clearedInputTokens, clearedToolUses }`.
Registravimas atliekamas faile `open-sse/handlers/chatCore.ts` (tik kai `provider === "claude"`)
naudojant `recordContextEditingTelemetry()` (`src/lib/db/compressionAnalytics.ts`), kuri įrašo
glaudinimo analizės eilutę su šiomis žymomis:

- `mode: "context-editing"`
- `engine: "context-editing"`
- `tokens_saved` / `original_tokens` = pašalintų įvesties žetonų skaičius
- `request_id` su pridėta galūne `::context-editing`

Taigi deleguotas šalinimas rodomas glaudinimo analizėje kartu su vietiniais varikliais, po
`context-editing` variklio žyma, ir jį galima atskirti nuo RTK / „Caveman“ / „LLMLingua“ sutaupymų.

## Ryšys su vietiniais glaudinimo varikliais

| Aspektas              | Vietiniai varikliai (Caveman / RTK / LLMLingua / stacked)   | Deleguotasis konteksto redagavimas                                      |
| --------------------- | ----------------------------------------------------------- | ----------------------------------------------------------------------- |
| Kur vykdoma           | OmniRoute viduje, prieš užklausai paliekant tarpinį serverį | Teikėjo pusėje (Claude), serveryje                                      |
| Kas redaguojama       | Užklausos / konteksto / įrankio rezultato tekstas           | Seni įrankio naudojimo / įrankio rezultato blokai                       |
| Teikėjų aprėptis      | Visi teikėjai                                               | Tik `claude` + `anthropic-compatible-cc-*`                              |
| Perjungiklis          | Glaudinimo režimo nustatymai                                | `contextEditing.enabled`                                                |
| Trikties režimas      | Trikties atveju naudojamas originalus tekstas               | 400 atsarginis scenarijus: pašalinti parametrą ir vieną kartą pakartoti |
| Sutaupymo telemetrija | `engine: <engine id>`                                       | `engine: "context-editing"`                                             |

Šie du būdai papildo vienas kitą: vietiniai varikliai suglaudina baitus, kuriuos siunčia OmniRoute; konteksto redagavimas leidžia
Claude mažinti kaupiamą kontekstą tarp užklausų. Abu gali būti įjungti kartu.

## Taip pat žr.

- [COMPRESSION_ENGINES.md](./COMPRESSION_ENGINES.md) — variklių registras ir vietiniai glaudinimo
  varikliai
- [RTK_COMPRESSION.md](./RTK_COMPRESSION.md) — komandų / įrankių išvesties glaudinimas
- [../frameworks/MCP-SERVER.md](../frameworks/MCP-SERVER.md) — MCP aprašų glaudinimas ir
  įrankių kardinalumo mažinimas
- Šaltinis: `open-sse/config/contextEditing.ts`, `open-sse/executors/base.ts`,
  `open-sse/services/compression/types.ts`, `src/lib/db/compressionAnalytics.ts`
