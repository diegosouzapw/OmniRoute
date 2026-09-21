# Delegated Context Editing (Anthropic) (Suomi)

🌐 **Languages:** 🇺🇸 [English](../../../../compression/CONTEXT_EDITING.md) · 🇪🇹 [am](../../../am/docs/compression/CONTEXT_EDITING.md) · 🇸🇦 [ar](../../../ar/docs/compression/CONTEXT_EDITING.md) · 🇦🇿 [az](../../../az/docs/compression/CONTEXT_EDITING.md) · 🇧🇬 [bg](../../../bg/docs/compression/CONTEXT_EDITING.md) · 🇧🇩 [bn](../../../bn/docs/compression/CONTEXT_EDITING.md) · 🇨🇿 [cs](../../../cs/docs/compression/CONTEXT_EDITING.md) · 🇩🇰 [da](../../../da/docs/compression/CONTEXT_EDITING.md) · 🇩🇪 [de](../../../de/docs/compression/CONTEXT_EDITING.md) · 🇬🇷 [el](../../../el/docs/compression/CONTEXT_EDITING.md) · 🇪🇸 [es](../../../es/docs/compression/CONTEXT_EDITING.md) · 🇪🇪 [et](../../../et/docs/compression/CONTEXT_EDITING.md) · 🇮🇷 [fa](../../../fa/docs/compression/CONTEXT_EDITING.md) · 🇫🇷 [fr](../../../fr/docs/compression/CONTEXT_EDITING.md) · 🇮🇪 [ga](../../../ga/docs/compression/CONTEXT_EDITING.md) · 🇮🇳 [gu](../../../gu/docs/compression/CONTEXT_EDITING.md) · 🇳🇬 [ha](../../../ha/docs/compression/CONTEXT_EDITING.md) · 🇮🇱 [he](../../../he/docs/compression/CONTEXT_EDITING.md) · 🇮🇳 [hi](../../../hi/docs/compression/CONTEXT_EDITING.md) · 🇭🇷 [hr](../../../hr/docs/compression/CONTEXT_EDITING.md) · 🇭🇺 [hu](../../../hu/docs/compression/CONTEXT_EDITING.md) · 🇦🇲 [hy](../../../hy/docs/compression/CONTEXT_EDITING.md) · 🇮🇩 [id](../../../id/docs/compression/CONTEXT_EDITING.md) · 🇳🇬 [ig](../../../ig/docs/compression/CONTEXT_EDITING.md) · 🇮🇹 [it](../../../it/docs/compression/CONTEXT_EDITING.md) · 🇯🇵 [ja](../../../ja/docs/compression/CONTEXT_EDITING.md) · 🇬🇪 [ka](../../../ka/docs/compression/CONTEXT_EDITING.md) · 🇰🇭 [km](../../../km/docs/compression/CONTEXT_EDITING.md) · 🇮🇳 [kn](../../../kn/docs/compression/CONTEXT_EDITING.md) · 🇰🇷 [ko](../../../ko/docs/compression/CONTEXT_EDITING.md) · 🇱🇹 [lt](../../../lt/docs/compression/CONTEXT_EDITING.md) · 🇱🇻 [lv](../../../lv/docs/compression/CONTEXT_EDITING.md) · 🇮🇳 [ml](../../../ml/docs/compression/CONTEXT_EDITING.md) · 🇮🇳 [mr](../../../mr/docs/compression/CONTEXT_EDITING.md) · 🇲🇾 [ms](../../../ms/docs/compression/CONTEXT_EDITING.md) · 🇲🇹 [mt](../../../mt/docs/compression/CONTEXT_EDITING.md) · 🇲🇲 [my](../../../my/docs/compression/CONTEXT_EDITING.md) · 🇳🇵 [ne](../../../ne/docs/compression/CONTEXT_EDITING.md) · 🇳🇱 [nl](../../../nl/docs/compression/CONTEXT_EDITING.md) · 🇳🇴 [no](../../../no/docs/compression/CONTEXT_EDITING.md) · 🇮🇳 [or](../../../or/docs/compression/CONTEXT_EDITING.md) · 🇮🇳 [pa](../../../pa/docs/compression/CONTEXT_EDITING.md) · 🇵🇭 [phi](../../../phi/docs/compression/CONTEXT_EDITING.md) · 🇵🇱 [pl](../../../pl/docs/compression/CONTEXT_EDITING.md) · 🇵🇹 [pt](../../../pt/docs/compression/CONTEXT_EDITING.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/compression/CONTEXT_EDITING.md) · 🇷🇴 [ro](../../../ro/docs/compression/CONTEXT_EDITING.md) · 🇷🇺 [ru](../../../ru/docs/compression/CONTEXT_EDITING.md) · 🇱🇰 [si](../../../si/docs/compression/CONTEXT_EDITING.md) · 🇸🇰 [sk](../../../sk/docs/compression/CONTEXT_EDITING.md) · 🇸🇮 [sl](../../../sl/docs/compression/CONTEXT_EDITING.md) · 🇷🇸 [sr](../../../sr/docs/compression/CONTEXT_EDITING.md) · 🇸🇪 [sv](../../../sv/docs/compression/CONTEXT_EDITING.md) · 🇰🇪 [sw](../../../sw/docs/compression/CONTEXT_EDITING.md) · 🇮🇳 [ta](../../../ta/docs/compression/CONTEXT_EDITING.md) · 🇮🇳 [te](../../../te/docs/compression/CONTEXT_EDITING.md) · 🇹🇭 [th](../../../th/docs/compression/CONTEXT_EDITING.md) · 🇹🇷 [tr](../../../tr/docs/compression/CONTEXT_EDITING.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/compression/CONTEXT_EDITING.md) · 🇵🇰 [ur](../../../ur/docs/compression/CONTEXT_EDITING.md) · 🇺🇿 [uz](../../../uz/docs/compression/CONTEXT_EDITING.md) · 🇻🇳 [vi](../../../vi/docs/compression/CONTEXT_EDITING.md) · 🇳🇬 [yo](../../../yo/docs/compression/CONTEXT_EDITING.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/compression/CONTEXT_EDITING.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/compression/CONTEXT_EDITING.md)

---

Delegoitu **kontekstin muokkaus** on vain Claudessa käytettävissä oleva kontekstinhallintaominaisuus. Toisin kuin OmniRouten paikalliset
pakkausmoottorit (Caveman, RTK, LLMLingua, pinotut käsittelyketjut), jotka kirjoittavat pyyntörungon uudelleen
_ennen_ kuin se poistuu välityspalvelimelta, kontekstin muokkaus pyytää **palveluntarjoajaa** poistamaan vanhentuneet
työkalukutsu- ja työkalutuloslohkot omasta aktiivisesta konteksti-ikkunastaan. OmniRoute lisää vain rungon
parametrin (`context_management.edits[]`); Claude suorittaa varsinaisen poistamisen omaa tokenisoijaansa käyttäen.

Tämä ominaisuus on luonteeltaan delegoitu: muut palveluntarjoajat hylkäävät parametrin, joten OmniRoute rajaa
sen tiukasti Claudeen ja Claude Code -yhteensopiviin välityspalveluihin.

Ensisijaiset lähteet: `open-sse/config/contextEditing.ts` (strategiatunnisteet, rungon parametrien lisäys, telemetrian
poiminta), `open-sse/executors/base.ts` (lisäyksen ehto + 400-virheen varamenettely) ja
`open-sse/services/compression/types.ts` (määrityksen rakenne + oletusarvo).

## Mitä `clear_tool_uses` tekee

OmniRoute lisää yhden muokkauksen lähtevän Anthropic Messages -pyynnön runkoon:

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

- `type: "clear_tool_uses_20250919"` — päivätty Anthropicin strategiatunniste (`CLEAR_TOOL_USES_STRATEGY`).
- `trigger.value: 100000` — kun pyynnön syötetokenien määrä ylittää tämän raja-arvon, Claude alkaa
  poistaa vanhoja työkalukutsu- ja tulospareja (`CONTEXT_EDITING_DEFAULT_TRIGGER_TOKENS`, Anthropicin oletusarvo).
- `keep.value: 3` — N viimeisintä työkalukutsu- ja tulosparia säilytetään muuttamattomina
  (`CONTEXT_EDITING_DEFAULT_KEEP_TOOL_USES`).

Betaominaisuudesta ilmoitetaan `anthropic-beta: context-management-2025-06-27`-otsakkeella, jonka
OmniRoute lähettää jo Claude-pyynnöissä.

Lisäyksen suorittaa `applyContextEditingToBody()`, ja se on **idempotentti**: jos rungossa on jo
`clear_tool_uses`-muokkaus (aiemman kutsun lisäämänä tai asiakkaan toimittamana), runko jätetään
ennalleen. Jos mukana on myös `clear_thinking_20251015`-muokkaus, OmniRoute järjestää vakaalla lajittelulla
`clear_thinking`-muokkauksen ensimmäiseksi, koska Anthropic edellyttää, että `clear_thinking` on ennen
`clear_tool_uses`-muokkausta `edits[]`-taulukossa.

## Yhdistelmäkohtainen käyttöönottokytkin

Kontekstin muokkaus on **oletusarvoisesti poissa käytöstä**, ja se on otettava erikseen käyttöön. Kytkin on yksi pakkausmääritykseen
sisältyvä totuusarvo:

- Asetusavain: `contextEditing.enabled` (camelCase — **ei** `context_editing` / `context-editing`).
- Tyyppi: `ContextEditingConfig { enabled: boolean }` tiedostossa
  `open-sse/services/compression/types.ts`.
- Oletusarvo: `DEFAULT_CONTEXT_EDITING_CONFIG = { enabled: false }`.
- Zod-skeema: `contextEditingConfigSchema` tiedostossa `src/shared/validation/compressionConfigSchemas.ts`.
- Tallennus: säilytetään muiden pakkausasetusten kanssa (normalisoidaan tiedostossa
  `src/lib/db/compression.ts`).

Hallintapaneelissa kytkin sijaitsee pakkauskeskuksessa
(`src/app/(dashboard)/dashboard/context/combos/CompressionHub.tsx`) ja kirjoittaa arvon
`{ contextEditing: { enabled: … } }` takaisin `saveSettings()`-toiminnon kautta. Koska se sisältyy
pakkausasetusten objektiin, se yhdistyy yhdistelmäkohtaiseen pakkausprofiiliin sen sijaan, että olisi
täysin itsenäinen asetusnäkymä — määritys sisältää vain päällä/pois-lipun; kaikki raja-arvot (`trigger`,
`keep`) ovat edellä dokumentoituja vakioita.

## Vain Claudea koskeva rajaus

Injektio tapahtuu vain aidolle Claudelle tai Claude Code -yhteensopiville välityspalveluille. Ehto tiedostossa
`open-sse/executors/base.ts` on:

```ts
if (
  (this.provider === "claude" || isClaudeCodeCompatible(this.provider)) &&
  contextEditing?.enabled &&
  !contextEditingDisabled
) {
  applyContextEditingToBody(transformedBody, { enabled: true });
}
```

- `this.provider === "claude"` — aito Anthropic-avain/OAuth.
- `isClaudeCodeCompatible(this.provider)` — välityspalvelimet, joiden palveluntarjoajatunnus alkaa
  `anthropic-compatible-cc-`-etuliitteellä (ne ilmoittavat Claude Code -yhteensopivuudesta, joten ne ovat
  välityspalvelimia, jotka todennäköisimmin hyväksyvät betan). Katso `open-sse/services/provider.ts`.

Tarkoituksella **pois rajatut**:

- `claude-web` — selainvälityspalvelin, jonka `create_conversation_params`-pyyntörakenne ei koskaan näe
  `context_management`-parametria.
- Yleiset `anthropic-compatible-*`-välityspalvelimet (ilman `-cc-`-etuliitettä) — kolmannen osapuolen päätepisteet,
  joiden betatuki on epävarma.

Muut kuin Claude-palveluntarjoajat eivät koskaan saa `context_management`-parametria, vaikka valitsin olisi käytössä.

## 400-varamenettely / välityspalvelinten kattavuus

Claude-yhteensopiva välityspalvelin saattaa ilmoittaa tukevansa betaa mutta silti hylätä `context_management`-parametrin
HTTP 400 -vastauksella. Jotta pyyntö ei epäonnistuisi vaan toiminnallisuus heikkenisi hallitusti, suorittaja poistaa
parametrin ja yrittää samaa URL-osoitetta uudelleen **kerran**:

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

Toiminta:

1. Käynnistyy vain `400`-vastauksella, kun kontekstin muokkaus on käytössä ja runko todella sisältää
   `context_management`-parametrin.
2. 400-vastauksen runko luetaan `clone()`-kutsun kautta, jotta alkuperäinen vastaus säilyy muuttumattomana
   täsmäämätöntä polkua varten.
3. Virhetekstin on vastattava lauseketta `/context[_-]management|context editing/i` — asiaan liittymätön 400-virhe (esim.
   `max_tokens must be >= 1`) **ei** käynnistä varamenettelyä, vaan alkuperäinen virhe välitetään eteenpäin.
4. Täsmäyksen yhteydessä se asettaa arvon `contextEditingDisabled = true` (mikä estää uudelleeninjektoinnin, jos uusi
   `transformedBody` muodostetaan myöhemmin uutta yritystä tai vara-URL-osoitetta varten), poistaa `context_management`-parametrin,
   allekirjoittaa rungon uudelleen Claudelle / Claude Code -yhteensopiville välityspalvelimille (`signRequestBody`) ja yrittää
   samaa URL-osoitetta uudelleen kerran.

Aidolla Claudella beta sisältyy `ANTHROPIC_BETA_BASE`-arvoon, eikä se päädy tähän varamenettelypolkuun.

## `applied_edits`-telemetria

Claude-vastauksen jälkeen OmniRoute tallentaa, kuinka paljon kontekstia palveluntarjoaja todellisuudessa tyhjensi. Tätä
**ei** suoratoisteta — se poimitaan ei-suoratoistetun vastauksen rungosta best effort -periaatteella, eikä se koskaan
vaikuta vastaukseen (telemetriavirheet jätetään huomiotta).

- Poiminta: `extractContextEditingTelemetry(responseBody)` tiedostossa `open-sse/config/contextEditing.ts`.
  Se etsii `applied_edits`-kenttää kolmesta sijainnista (varautuen erilaisiin vastausrakenteisiin):
  - `context_management.applied_edits`
  - `usage.context_management.applied_edits`
  - `usage.applied_edits`
- Kustakin merkinnästä luettavat muokkauskohtaiset kentät: `cleared_input_tokens` ja `cleared_tool_uses`
  (snake_case, Anthropicin natiivi muoto), varavaihtoehtoina camelCase-muodot `clearedInputTokens` / `clearedToolUses`.
- Palauttaa arvon `null`, jos `applied_edits`-taulukkoa ei löydy tai mitään ei todellisuudessa tyhjennetty.

Kuittauksen rakenne on `ContextEditingTelemetry { editCount, clearedInputTokens, clearedToolUses }`.
Tallennus tapahtuu tiedostossa `open-sse/handlers/chatCore.ts` (rajattuna ehtoon `provider === "claude"`) funktion
`recordContextEditingTelemetry()` (`src/lib/db/compressionAnalytics.ts`) kautta. Se kirjoittaa pakkausanalytiikkarivin,
jolle asetetaan seuraavat tunnisteet:

- `mode: "context-editing"`
- `engine: "context-editing"`
- `tokens_saved` / `original_tokens` = tyhjennettyjen syötetunnisteiden määrä
- `request_id`, jonka loppuun lisätään `::context-editing`

Näin delegoitu tyhjennys näkyy pakkausanalytiikassa paikallisten moottorien rinnalla
`context-editing`-moottoritunnisteella ja on erotettavissa RTK-/Caveman-/LLMLingua-säästöistä.

## Suhde paikallisiin pakkausmoottoreihin

| Näkökohta            | Paikalliset moottorit (Caveman / RTK / LLMLingua / stacked) | Delegoitu kontekstin muokkaus                                |
| -------------------- | ----------------------------------------------------------- | ------------------------------------------------------------ |
| Missä se suoritetaan | OmniRoutessa, ennen kuin pyyntö poistuu välityspalvelimelta | Palveluntarjoajalla (Claude), palvelinpuolella               |
| Mitä se muokkaa      | Kehote-/konteksti-/työkalutulosteksti                       | Vanhat työkalunkäyttö-/työkalutuloslohkot                    |
| Palveluntarjoajat    | Kaikki palveluntarjoajat                                    | Vain `claude` + `anthropic-compatible-cc-*`                  |
| Käyttöönotto         | Pakkaustilan asetukset                                      | `contextEditing.enabled`                                     |
| Virhetoiminta        | Virheen sattuessa käytetään alkuperäistä tekstiä            | 400-varatoiminto: poista parametri ja yritä kerran uudelleen |
| Säästöjen telemetria | `engine: <engine id>`                                       | `engine: "context-editing"`                                  |

Nämä kaksi täydentävät toisiaan: paikalliset moottorit pakkaavat OmniRouten lähettämät tavut, kun taas kontekstin muokkauksen avulla
Claude voi karsia keskusteluvuorojen aikana kertynyttä kontekstia. Molemmat voidaan ottaa käyttöön samanaikaisesti.

## Katso myös

- [COMPRESSION_ENGINES.md](./COMPRESSION_ENGINES.md) — moottorirekisteri ja paikalliset pakkausmoottorit
- [RTK_COMPRESSION.md](./RTK_COMPRESSION.md) — komentojen ja työkalutulosteiden pakkaus
- [../frameworks/MCP-SERVER.md](../frameworks/MCP-SERVER.md) — MCP-kuvausten pakkaus ja
  työkalujen määrän vähentäminen
- Lähdekoodi: `open-sse/config/contextEditing.ts`, `open-sse/executors/base.ts`,
  `open-sse/services/compression/types.ts`, `src/lib/db/compressionAnalytics.ts`
