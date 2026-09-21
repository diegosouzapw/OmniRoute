# Delegated Context Editing (Anthropic) (Hrvatski)

🌐 **Languages:** 🇺🇸 [English](../../../../compression/CONTEXT_EDITING.md) · 🇪🇹 [am](../../../am/docs/compression/CONTEXT_EDITING.md) · 🇸🇦 [ar](../../../ar/docs/compression/CONTEXT_EDITING.md) · 🇦🇿 [az](../../../az/docs/compression/CONTEXT_EDITING.md) · 🇧🇬 [bg](../../../bg/docs/compression/CONTEXT_EDITING.md) · 🇧🇩 [bn](../../../bn/docs/compression/CONTEXT_EDITING.md) · 🇨🇿 [cs](../../../cs/docs/compression/CONTEXT_EDITING.md) · 🇩🇰 [da](../../../da/docs/compression/CONTEXT_EDITING.md) · 🇩🇪 [de](../../../de/docs/compression/CONTEXT_EDITING.md) · 🇬🇷 [el](../../../el/docs/compression/CONTEXT_EDITING.md) · 🇪🇸 [es](../../../es/docs/compression/CONTEXT_EDITING.md) · 🇪🇪 [et](../../../et/docs/compression/CONTEXT_EDITING.md) · 🇮🇷 [fa](../../../fa/docs/compression/CONTEXT_EDITING.md) · 🇫🇮 [fi](../../../fi/docs/compression/CONTEXT_EDITING.md) · 🇫🇷 [fr](../../../fr/docs/compression/CONTEXT_EDITING.md) · 🇮🇪 [ga](../../../ga/docs/compression/CONTEXT_EDITING.md) · 🇮🇳 [gu](../../../gu/docs/compression/CONTEXT_EDITING.md) · 🇳🇬 [ha](../../../ha/docs/compression/CONTEXT_EDITING.md) · 🇮🇱 [he](../../../he/docs/compression/CONTEXT_EDITING.md) · 🇮🇳 [hi](../../../hi/docs/compression/CONTEXT_EDITING.md) · 🇭🇺 [hu](../../../hu/docs/compression/CONTEXT_EDITING.md) · 🇦🇲 [hy](../../../hy/docs/compression/CONTEXT_EDITING.md) · 🇮🇩 [id](../../../id/docs/compression/CONTEXT_EDITING.md) · 🇳🇬 [ig](../../../ig/docs/compression/CONTEXT_EDITING.md) · 🇮🇹 [it](../../../it/docs/compression/CONTEXT_EDITING.md) · 🇯🇵 [ja](../../../ja/docs/compression/CONTEXT_EDITING.md) · 🇬🇪 [ka](../../../ka/docs/compression/CONTEXT_EDITING.md) · 🇰🇭 [km](../../../km/docs/compression/CONTEXT_EDITING.md) · 🇮🇳 [kn](../../../kn/docs/compression/CONTEXT_EDITING.md) · 🇰🇷 [ko](../../../ko/docs/compression/CONTEXT_EDITING.md) · 🇱🇹 [lt](../../../lt/docs/compression/CONTEXT_EDITING.md) · 🇱🇻 [lv](../../../lv/docs/compression/CONTEXT_EDITING.md) · 🇮🇳 [ml](../../../ml/docs/compression/CONTEXT_EDITING.md) · 🇮🇳 [mr](../../../mr/docs/compression/CONTEXT_EDITING.md) · 🇲🇾 [ms](../../../ms/docs/compression/CONTEXT_EDITING.md) · 🇲🇹 [mt](../../../mt/docs/compression/CONTEXT_EDITING.md) · 🇲🇲 [my](../../../my/docs/compression/CONTEXT_EDITING.md) · 🇳🇵 [ne](../../../ne/docs/compression/CONTEXT_EDITING.md) · 🇳🇱 [nl](../../../nl/docs/compression/CONTEXT_EDITING.md) · 🇳🇴 [no](../../../no/docs/compression/CONTEXT_EDITING.md) · 🇮🇳 [or](../../../or/docs/compression/CONTEXT_EDITING.md) · 🇮🇳 [pa](../../../pa/docs/compression/CONTEXT_EDITING.md) · 🇵🇭 [phi](../../../phi/docs/compression/CONTEXT_EDITING.md) · 🇵🇱 [pl](../../../pl/docs/compression/CONTEXT_EDITING.md) · 🇵🇹 [pt](../../../pt/docs/compression/CONTEXT_EDITING.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/compression/CONTEXT_EDITING.md) · 🇷🇴 [ro](../../../ro/docs/compression/CONTEXT_EDITING.md) · 🇷🇺 [ru](../../../ru/docs/compression/CONTEXT_EDITING.md) · 🇱🇰 [si](../../../si/docs/compression/CONTEXT_EDITING.md) · 🇸🇰 [sk](../../../sk/docs/compression/CONTEXT_EDITING.md) · 🇸🇮 [sl](../../../sl/docs/compression/CONTEXT_EDITING.md) · 🇷🇸 [sr](../../../sr/docs/compression/CONTEXT_EDITING.md) · 🇸🇪 [sv](../../../sv/docs/compression/CONTEXT_EDITING.md) · 🇰🇪 [sw](../../../sw/docs/compression/CONTEXT_EDITING.md) · 🇮🇳 [ta](../../../ta/docs/compression/CONTEXT_EDITING.md) · 🇮🇳 [te](../../../te/docs/compression/CONTEXT_EDITING.md) · 🇹🇭 [th](../../../th/docs/compression/CONTEXT_EDITING.md) · 🇹🇷 [tr](../../../tr/docs/compression/CONTEXT_EDITING.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/compression/CONTEXT_EDITING.md) · 🇵🇰 [ur](../../../ur/docs/compression/CONTEXT_EDITING.md) · 🇺🇿 [uz](../../../uz/docs/compression/CONTEXT_EDITING.md) · 🇻🇳 [vi](../../../vi/docs/compression/CONTEXT_EDITING.md) · 🇳🇬 [yo](../../../yo/docs/compression/CONTEXT_EDITING.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/compression/CONTEXT_EDITING.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/compression/CONTEXT_EDITING.md)

---

Delegirano **uređivanje konteksta** značajka je upravljanja kontekstom dostupna samo za Claude. Za razliku od OmniRouteovih lokalnih
mehanizama kompresije (Caveman, RTK, LLMLingua, složeni cjevovodi) — koji preoblikuju tijelo zahtjeva
_prije_ nego što napusti proxy — uređivanje konteksta traži od **pružatelja usluge** da iz vlastitog aktivnog kontekstnog prozora ukloni zastarjele
blokove upotrebe alata / rezultata alata. OmniRoute samo prilaže parametar tijela
(`context_management.edits[]`); Claude obavlja stvarno uklanjanje na temelju vlastitog tokenizatora.

To je po svojoj prirodi delegirana mogućnost: drugi pružatelji usluge odbijaju taj parametar, stoga ga OmniRoute
strogo ograničava na Claude i releje kompatibilne s Claude Codeom.

Izvor istine: `open-sse/config/contextEditing.ts` (ID-jevi strategija, umetanje u tijelo, izdvajanje
telemetrije), `open-sse/executors/base.ts` (uvjet umetanja + rezervno ponašanje za 400) i
`open-sse/services/compression/types.ts` (oblik konfiguracije + zadana vrijednost).

## Što radi `clear_tool_uses`

OmniRoute umeće jednu izmjenu u odlazno tijelo Anthropic Messages zahtjeva:

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

- `type: "clear_tool_uses_20250919"` — datirani ID Anthropicove strategije (`CLEAR_TOOL_USES_STRATEGY`).
- `trigger.value: 100000` — nakon što broj ulaznih tokena zahtjeva prijeđe ovaj prag, Claude počinje
  uklanjati stare parove upotrebe alata/rezultata (`CONTEXT_EDITING_DEFAULT_TRIGGER_TOKENS`, Anthropicova zadana vrijednost).
- `keep.value: 3` — N najnovijih parova upotrebe alata/rezultata ostaje netaknuto
  (`CONTEXT_EDITING_DEFAULT_KEEP_TOOL_USES`).

Beta-verzija oglašava se putem zaglavlja `anthropic-beta: context-management-2025-06-27`, koje
OmniRoute već šalje u Claude zahtjevima.

Umetanje obavlja `applyContextEditingToBody()` i ono je **idempotentno**: ako izmjena `clear_tool_uses`
već postoji u tijelu (dodana prethodnim pozivom ili ju je poslao klijent), tijelo
ostaje neizmijenjeno. Ako je prisutna i izmjena `clear_thinking_20251015`, OmniRoute stabilnim sortiranjem premješta izmjenu
`clear_thinking` na početak jer Anthropic zahtijeva da `clear_thinking` prethodi
`clear_tool_uses` u polju `edits[]`.

## Prekidač za omogućivanje po kombinaciji

Uređivanje konteksta **isključeno je prema zadanim postavkama** i zahtijeva izričito uključivanje. Prekidač je jedna Booleova vrijednost sadržana u
konfiguraciji kompresije:

- Ključ postavke: `contextEditing.enabled` (camelCase — **ne** `context_editing` / `context-editing`).
- Tip: `ContextEditingConfig { enabled: boolean }` u
  `open-sse/services/compression/types.ts`.
- Zadana vrijednost: `DEFAULT_CONTEXT_EDITING_CONFIG = { enabled: false }`.
- Zod shema: `contextEditingConfigSchema` u `src/shared/validation/compressionConfigSchemas.ts`.
- Pohrana: trajno se pohranjuje s ostalim postavkama kompresije (normalizirano u
  `src/lib/db/compression.ts`).

Na nadzornoj ploči prekidač se nalazi u središtu za kompresiju
(`src/app/(dashboard)/dashboard/context/combos/CompressionHub.tsx`) i zapisuje
`{ contextEditing: { enabled: … } }` putem `saveSettings()`. Budući da je dio
objekta postavki kompresije, kombinira se s profilom kompresije za pojedinu kombinaciju umjesto da bude
potpuno neovisno sučelje — konfiguracija sadrži samo oznaku za uključivanje/isključivanje; svi pragovi (`trigger`,
`keep`) konstante su dokumentirane iznad.

## Ograničavanje samo na Claude

Umetanje se događa samo za izvorni Claude ili releje kompatibilne s Claude Codeom. Uvjet u
`open-sse/executors/base.ts` glasi:

```ts
if (
  (this.provider === "claude" || isClaudeCodeCompatible(this.provider)) &&
  contextEditing?.enabled &&
  !contextEditingDisabled
) {
  applyContextEditingToBody(transformedBody, { enabled: true });
}
```

- `this.provider === "claude"` — izvorni Anthropic ključ/OAuth.
- `isClaudeCodeCompatible(this.provider)` — releji čiji ID pružatelja počinje prefiksom
  `anthropic-compatible-cc-` (oglašavaju kompatibilnost s Claude Codeom pa je najvjerojatnije da će
  upravo ti releji prihvatiti beta-značajku). Pogledajte `open-sse/services/provider.ts`.

Namjerno **isključeni**:

- `claude-web` — preglednički relej s oblikom zahtjeva `create_conversation_params` koji nikada ne
  prima `context_management`.
- Generički releji `anthropic-compatible-*` (bez prefiksa `-cc-`) — krajnje točke trećih strana s
  neizvjesnom podrškom za beta-značajku.

Pružatelji koji nisu Claude nikada ne primaju parametar `context_management`, čak ni kada je opcija
uključena.

## Rezervni postupak za 400 / pokrivenost releja

Relej kompatibilan s Claudeom može oglašavati beta-značajku, ali ipak odbiti parametar
`context_management` s HTTP statusom 400. Kako bi se funkcionalnost postupno degradirala umjesto da
zahtjev ne uspije, izvršitelj uklanja parametar i **jednom** ponavlja zahtjev prema istom URL-u:

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

Ponašanje:

1. Aktivira se samo pri statusu `400` dok je uređivanje konteksta omogućeno i tijelo doista sadrži
   `context_management`.
2. Tijelo odgovora 400 čita se putem `clone()` kako bi izvorni odgovor ostao netaknut za slučaj
   nepodudaranja.
3. Tekst pogreške mora odgovarati izrazu `/context[_-]management|context editing/i` — nepovezana
   pogreška 400 (npr. `max_tokens must be >= 1`) **ne** pokreće rezervni postupak; izvorna se pogreška
   prosljeđuje.
4. Pri podudaranju postavlja `contextEditingDisabled = true` (čime se sprječava ponovno umetanje ako
   se poslije izgradi novi `transformedBody` za ponovljeni zahtjev ili rezervni URL), briše
   `context_management`, ponovno potpisuje tijelo za Claude / releje kompatibilne s Claude Codeom
   (`signRequestBody`) te jednom ponavlja zahtjev prema istom URL-u.

Izvorni Claude uključuje beta-značajku u `ANTHROPIC_BETA_BASE` i ne ulazi u ovaj rezervni postupak.

## Telemetrija `applied_edits`

Nakon Claudeova odgovora OmniRoute bilježi koliko je konteksta pružatelj doista očistio. To se
**ne** prenosi strujanjem — podaci se izdvajaju iz tijela odgovora koji se ne prenosi strujanjem,
prema načelu najboljeg pokušaja, i nikada ne utječu na odgovor (pogreške telemetrije se zanemaruju).

- Izdvajanje: `extractContextEditingTelemetry(responseBody)` u `open-sse/config/contextEditing.ts`.
  Provjerava `applied_edits` na tri mjesta (radi otpornosti na različite oblike odgovora):
  - `context_management.applied_edits`
  - `usage.context_management.applied_edits`
  - `usage.applied_edits`
- Polja koja se čitaju iz svakog zapisa izmjene: `cleared_input_tokens` i `cleared_tool_uses`
  (snake_case, izvorni Anthropicov oblik), uz rezervna camelCase polja `clearedInputTokens` /
  `clearedToolUses`.
- Vraća `null` kada nije pronađen niz `applied_edits` ili kada ništa nije stvarno očišćeno.

Oblik potvrde je `ContextEditingTelemetry { editCount, clearedInputTokens, clearedToolUses }`.
Bilježenje se provodi u `open-sse/handlers/chatCore.ts` (ograničeno na `provider === "claude"`) putem
`recordContextEditingTelemetry()` (`src/lib/db/compressionAnalytics.ts`), koji zapisuje redak analitike
kompresije označen ovako:

- `mode: "context-editing"`
- `engine: "context-editing"`
- `tokens_saved` / `original_tokens` = broj očišćenih ulaznih tokena
- `request_id` s dodanim sufiksom `::context-editing`

Tako se delegirano čišćenje prikazuje u analitici kompresije uz lokalne mehanizme, pod oznakom
mehanizma `context-editing`, i može se razlikovati od ušteda ostvarenih putem RTK-a, Cavemana ili
LLMLingue.

## Odnos prema lokalnim mehanizmima kompresije

| Aspekt                 | Lokalni mehanizmi (Caveman / RTK / LLMLingua / stacked) | Delegirano uređivanje konteksta                                 |
| ---------------------- | ------------------------------------------------------- | --------------------------------------------------------------- |
| Gdje se izvršava       | U OmniRouteu, prije nego što zahtjev napusti proxy      | Kod pružatelja (Claude), na strani poslužitelja                 |
| Što uređuje            | Tekst upita / konteksta / rezultata alata               | Stare blokove uporabe alata / rezultata alata                   |
| Opseg pružatelja       | Svi pružatelji                                          | Samo `claude` + `anthropic-compatible-cc-*`                     |
| Prekidač               | Postavke načina kompresije                              | `contextEditing.enabled`                                        |
| Ponašanje pri pogrešci | Nastavak bez kompresije (izvorni tekst)                 | Rezervni postupak za 400: ukloni parametar i pokušaj još jednom |
| Telemetrija uštede     | `engine: <engine id>`                                   | `engine: "context-editing"`                                     |

Ta se dva pristupa međusobno nadopunjuju: lokalni mehanizmi komprimiraju bajtove koje OmniRoute šalje; uređivanje konteksta omogućuje Claudeu da sažima tekući kontekst kroz više interakcija. Mogu se omogućiti istodobno.

## Vidi također

- [COMPRESSION_ENGINES.md](./COMPRESSION_ENGINES.md) — registar mehanizama i lokalni mehanizmi
  kompresije
- [RTK_COMPRESSION.md](./RTK_COMPRESSION.md) — kompresija izlaza naredbi/alata
- [../frameworks/MCP-SERVER.md](../frameworks/MCP-SERVER.md) — kompresija MCP opisa i
  smanjenje broja alata
- Izvor: `open-sse/config/contextEditing.ts`, `open-sse/executors/base.ts`,
  `open-sse/services/compression/types.ts`, `src/lib/db/compressionAnalytics.ts`
