# Delegated Context Editing (Anthropic) (Bosanski)

🌐 **Languages:** 🇺🇸 [English](../../../../compression/CONTEXT_EDITING.md) · 🇪🇹 [am](../../../am/docs/compression/CONTEXT_EDITING.md) · 🇸🇦 [ar](../../../ar/docs/compression/CONTEXT_EDITING.md) · 🇦🇿 [az](../../../az/docs/compression/CONTEXT_EDITING.md) · 🇧🇬 [bg](../../../bg/docs/compression/CONTEXT_EDITING.md) · 🇧🇩 [bn](../../../bn/docs/compression/CONTEXT_EDITING.md) · 🇨🇿 [cs](../../../cs/docs/compression/CONTEXT_EDITING.md) · 🇩🇰 [da](../../../da/docs/compression/CONTEXT_EDITING.md) · 🇩🇪 [de](../../../de/docs/compression/CONTEXT_EDITING.md) · 🇬🇷 [el](../../../el/docs/compression/CONTEXT_EDITING.md) · 🇪🇸 [es](../../../es/docs/compression/CONTEXT_EDITING.md) · 🇪🇪 [et](../../../et/docs/compression/CONTEXT_EDITING.md) · 🇮🇷 [fa](../../../fa/docs/compression/CONTEXT_EDITING.md) · 🇫🇮 [fi](../../../fi/docs/compression/CONTEXT_EDITING.md) · 🇫🇷 [fr](../../../fr/docs/compression/CONTEXT_EDITING.md) · 🇮🇪 [ga](../../../ga/docs/compression/CONTEXT_EDITING.md) · 🇮🇳 [gu](../../../gu/docs/compression/CONTEXT_EDITING.md) · 🇳🇬 [ha](../../../ha/docs/compression/CONTEXT_EDITING.md) · 🇮🇱 [he](../../../he/docs/compression/CONTEXT_EDITING.md) · 🇮🇳 [hi](../../../hi/docs/compression/CONTEXT_EDITING.md) · 🇭🇷 [hr](../../../hr/docs/compression/CONTEXT_EDITING.md) · 🇭🇺 [hu](../../../hu/docs/compression/CONTEXT_EDITING.md) · 🇦🇲 [hy](../../../hy/docs/compression/CONTEXT_EDITING.md) · 🇮🇩 [id](../../../id/docs/compression/CONTEXT_EDITING.md) · 🇳🇬 [ig](../../../ig/docs/compression/CONTEXT_EDITING.md) · 🇮🇹 [it](../../../it/docs/compression/CONTEXT_EDITING.md) · 🇯🇵 [ja](../../../ja/docs/compression/CONTEXT_EDITING.md) · 🇬🇪 [ka](../../../ka/docs/compression/CONTEXT_EDITING.md) · 🇰🇭 [km](../../../km/docs/compression/CONTEXT_EDITING.md) · 🇮🇳 [kn](../../../kn/docs/compression/CONTEXT_EDITING.md) · 🇰🇷 [ko](../../../ko/docs/compression/CONTEXT_EDITING.md) · 🇱🇹 [lt](../../../lt/docs/compression/CONTEXT_EDITING.md) · 🇱🇻 [lv](../../../lv/docs/compression/CONTEXT_EDITING.md) · 🇮🇳 [ml](../../../ml/docs/compression/CONTEXT_EDITING.md) · 🇮🇳 [mr](../../../mr/docs/compression/CONTEXT_EDITING.md) · 🇲🇾 [ms](../../../ms/docs/compression/CONTEXT_EDITING.md) · 🇲🇹 [mt](../../../mt/docs/compression/CONTEXT_EDITING.md) · 🇲🇲 [my](../../../my/docs/compression/CONTEXT_EDITING.md) · 🇳🇵 [ne](../../../ne/docs/compression/CONTEXT_EDITING.md) · 🇳🇱 [nl](../../../nl/docs/compression/CONTEXT_EDITING.md) · 🇳🇴 [no](../../../no/docs/compression/CONTEXT_EDITING.md) · 🇮🇳 [or](../../../or/docs/compression/CONTEXT_EDITING.md) · 🇮🇳 [pa](../../../pa/docs/compression/CONTEXT_EDITING.md) · 🇵🇭 [phi](../../../phi/docs/compression/CONTEXT_EDITING.md) · 🇵🇱 [pl](../../../pl/docs/compression/CONTEXT_EDITING.md) · 🇵🇹 [pt](../../../pt/docs/compression/CONTEXT_EDITING.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/compression/CONTEXT_EDITING.md) · 🇷🇴 [ro](../../../ro/docs/compression/CONTEXT_EDITING.md) · 🇷🇺 [ru](../../../ru/docs/compression/CONTEXT_EDITING.md) · 🇱🇰 [si](../../../si/docs/compression/CONTEXT_EDITING.md) · 🇸🇰 [sk](../../../sk/docs/compression/CONTEXT_EDITING.md) · 🇸🇮 [sl](../../../sl/docs/compression/CONTEXT_EDITING.md) · 🇷🇸 [sr](../../../sr/docs/compression/CONTEXT_EDITING.md) · 🇸🇪 [sv](../../../sv/docs/compression/CONTEXT_EDITING.md) · 🇰🇪 [sw](../../../sw/docs/compression/CONTEXT_EDITING.md) · 🇮🇳 [ta](../../../ta/docs/compression/CONTEXT_EDITING.md) · 🇮🇳 [te](../../../te/docs/compression/CONTEXT_EDITING.md) · 🇹🇭 [th](../../../th/docs/compression/CONTEXT_EDITING.md) · 🇹🇷 [tr](../../../tr/docs/compression/CONTEXT_EDITING.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/compression/CONTEXT_EDITING.md) · 🇵🇰 [ur](../../../ur/docs/compression/CONTEXT_EDITING.md) · 🇺🇿 [uz](../../../uz/docs/compression/CONTEXT_EDITING.md) · 🇻🇳 [vi](../../../vi/docs/compression/CONTEXT_EDITING.md) · 🇳🇬 [yo](../../../yo/docs/compression/CONTEXT_EDITING.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/compression/CONTEXT_EDITING.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/compression/CONTEXT_EDITING.md)

---

# Delegirano uređivanje konteksta (Anthropic)

Delegirano **uređivanje konteksta** (Context Editing) je funkcija upravljanja kontekstom isključivo za Claude. Za razliku od OmniRoute lokalnih engine-a za kompresiju (Caveman, RTK, LLMLingua, stacked pipelines) — koji prepisuju tijelo zahtjeva _prije_ nego što napusti proxy — Context Editing traži od **provider-a** da obriše zastarjele tool-use / tool-result blokove iz svog vlastitog aktivnog prozora konteksta. OmniRoute samo dodaje parametar tijela (`context_management.edits[]`); Claude vrši stvarno brisanje prema vlastitom tokenizer-u.

Ovo je po prirodi delegirana mogućnost: drugi provider-i odbijaju ovaj parametar, pa ga OmniRoute ograničava isključivo na Claude i Claude-Code-kompatibilne releje.

Izvor istine: `open-sse/config/contextEditing.ts` (strategy ids, body injection, telemetry extraction), `open-sse/executors/base.ts` (injection gate + 400-fallback) i `open-sse/services/compression/types.ts` (config shape + default).

## Šta `clear_tool_uses` radi

OmniRoute ubacuje jednu izmjenu u odlazno tijelo Anthropic Messages:

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

- `type: "clear_tool_uses_20250919"` — datirani Anthropic strategy id (`CLEAR_TOOL_USES_STRATEGY`).
- `trigger.value: 100000` — kada ulazni tokeni zahtjeva premaše ovaj prag, Claude počinje brisati stare tool-use/result parove (`CONTEXT_EDITING_DEFAULT_TRIGGER_TOKENS`, Anthropic-ov default).
- `keep.value: 3` — N najnovijih tool-use/result parova ostaje netaknuto (`CONTEXT_EDITING_DEFAULT_KEEP_TOOL_USES`).

Beta se oglašava putem `anthropic-beta: context-management-2025-06-27` zaglavlja, koje OmniRoute već šalje u Claude zahtjevima.

Ubacivanje vrši `applyContextEditingToBody()` i ono je **idempotentno**: ako `clear_tool_uses` izmjena već postoji u tijelu (dodana prethodnim pozivom ili dostavljena od strane klijenta), tijelo ostaje nepromijenjeno. Ako je prisutna i `clear_thinking_20251015` izmjena, OmniRoute stabilno sortira `clear_thinking` izmjenu na početak, jer Anthropic zahtijeva da `clear_thinking` prethodi `clear_tool_uses` u `edits[]` nizu.

## Prekidač za omogućavanje po kombinaciji (per-combo)

Context Editing je **isključen po defaultu** i zahtijeva eksplicitno uključivanje (opt-in). Prekidač je jedan boolean sadržan u konfiguraciji kompresije:

- Ključ postavke: `contextEditing.enabled` (camelCase — **ne** `context_editing` / `context-editing`).
- Tip: `ContextEditingConfig { enabled: boolean }` u `open-sse/services/compression/types.ts`.
- Default: `DEFAULT_CONTEXT_EDITING_CONFIG = { enabled: false }`.
- Zod shema: `contextEditingConfigSchema` u `src/shared/validation/compressionConfigSchemas.ts`.
- Pohrana: perzistirano sa ostatkom postavki kompresije (normalizovano u `src/lib/db/compression.ts`).

Na kontrolnoj tabli (dashboard), prekidač se nalazi u hub-u za kompresiju (`src/app/(dashboard)/dashboard/context/combos/CompressionHub.tsx`) i upisuje `{ contextEditing: { enabled: … } }` nazad putem `saveSettings()`. Budući da se oslanja na objekat postavki kompresije, on se kombinuje sa profilom kompresije po kombinaciji (per-combo) umjesto da bude potpuno nezavisna površina — konfiguracija nosi samo on/off zastavicu; svi pragovi (`trigger`, `keep`) su konstante dokumentovane iznad.

## Ograničavanje samo na Claude

Injektovanje se dešava samo za pravi Claude ili releje kompatibilne sa Claude-Code. Kapija (gate) u `open-sse/executors/base.ts` je:

```ts
if (
  (this.provider === "claude" || isClaudeCodeCompatible(this.provider)) &&
  contextEditing?.enabled &&
  !contextEditingDisabled
) {
  applyContextEditingToBody(transformedBody, { enabled: true });
}
```

- `this.provider === "claude"` — pravi Anthropic ključ/OAuth.
- `isClaudeCodeCompatible(this.provider)` — releji čiji ID provajdera počinje prefiksom `anthropic-compatible-cc-` (oni reklamiraju kompatibilnost sa Claude Code, pa su to releji koji najverovatnije prihvataju beta verziju). Pogledajte `open-sse/services/provider.ts`.

Namerno **isključeni**:

- `claude-web` — relej pretraživača sa oblikom zahteva `create_conversation_params` koji nikada ne vidi `context_management`.
- Generički `anthropic-compatible-*` releji (bez `-cc-` prefiksa) — krajnje tačke trećih strana sa neizvesnom podrškom za beta verziju.

Provajderi koji nisu Claude nikada ne primaju parametar `context_management` čak ni kada je prekidač uključen.

## 400-fallback / pokrivenost releja

Relej kompatibilan sa Claude može reklamirati beta verziju, ali ipak odbiti parametar `context_management` sa HTTP 400 greškom. Da bi se degradiralo graciozno umesto neuspeha zahteva, izvršilac uklanja parametar i ponovo pokušava isti URL **jednom**:

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

1. Aktivira se samo na `400` dok je uređivanje konteksta omogućeno i telo zahteva zaista sadrži `context_management`.
2. Telo 400 odgovora se čita putem `clone()` tako da originalni odgovor ostaje netaknut za putanju koja se ne podudara.
3. Tekst greške se mora podudarati sa `/context[_-]management|context editing/i` — nepovezana 400 greška (npr. `max_tokens must be >= 1`) **ne** pokreće fallback; originalna greška se propagira.
4. Pri podudaranju, postavlja `contextEditingDisabled = true` (što potiskuje ponovno injektovanje ako se kasnije napravi svež `transformedBody` za retry/fallback URL), briše `context_management`, ponovo potpisuje telo za Claude / Claude-Code-kompatibilne releje (`signRequestBody`) i ponovo pokušava isti URL jednom.

Pravi Claude nosi beta verziju u `ANTHROPIC_BETA_BASE` i ne nailazi na ovu fallback putanju.

## telemetrija applied_edits

Nakon Claude odgovora, OmniRoute beleži koliko je konteksta provajder zapravo očistio. Ovo se **ne** strimuje — ekstrahuje se iz nestrimujućeg tela odgovora, uz najbolji napor (best-effort), i nikada ne utiče na odgovor (greške telemetrije se zanemaruju).

- Ekstrakcija: `extractContextEditingTelemetry(responseBody)` u `open-sse/config/contextEditing.ts`. Proverava `applied_edits` na tri lokacije (defanzivno u odnosu na oblik odgovora):
  - `context_management.applied_edits`
  - `usage.context_management.applied_edits`
  - `usage.applied_edits`
- Polja po uređivanju pročitana iz svakog unosa: `cleared_input_tokens` i `cleared_tool_uses` (snake_case, Anthropic-native), sa `clearedInputTokens` / `clearedToolUses` camelCase rezervnim opcijama.
- Vraća `null` kada se ne pronađe niz `applied_edits` ili ništa nije zapravo očišćeno.

Oblik potvrde je `ContextEditingTelemetry { editCount, clearedInputTokens, clearedToolUses }`.
Beleženje se dešava u `open-sse/handlers/chatCore.ts` (ograničeno na `provider === "claude"`) putem `recordContextEditingTelemetry()` (`src/lib/db/compressionAnalytics.ts`), koji upisuje red analitike kompresije označen sa:

- `mode: "context-editing"`
- `engine: "context-editing"`
- `tokens_saved` / `original_tokens` = broj očišćenih ulaznih tokena
- `request_id` sa sufiksom `::context-editing`

Dakle, delegirano čišćenje se pojavljuje u analitici kompresije pored lokalnih mašina (engines), pod oznakom mašine `context-editing`, i može se razlikovati od ušteda RTK/Caveman/LLMLingua.

## Odnos prema lokalnim mehanizmima za kompresiju

| Aspekt             | Lokalni mehanizmi (Caveman / RTK / LLMLingua / stacked) | Delegirano uređivanje konteksta                       |
| ------------------ | ------------------------------------------------------- | ----------------------------------------------------- |
| Gdje se izvršava   | U OmniRoute, prije nego što zahtjev napusti proxy       | Kod provajdera (Claude), na strani servera            |
| Šta uređuje        | Prompt / kontekst / tekst rezultata alata               | Stari blokovi korištenja alata / rezultata alata      |
| Opseg provajdera   | Svi provajderi                                          | Samo `claude` + `anthropic-compatible-cc-*`           |
| Prekidač           | Postavke načina kompresije                              | `contextEditing.enabled`                              |
| Režim neuspjeha    | Fail-open (originalni tekst)                            | 400-fallback: ukloni parametar, pokušaj ponovo jednom |
| Telemetrija uštede | `engine: <engine id>`                                   | `engine: "context-editing"`                           |

Ova dva pristupa su komplementarna: lokalni mehanizmi kompresuju bajtove koje OmniRoute šalje; Context Editing omogućava Claude-u da skrati tekući kontekst kroz više krugova interakcije. Mogu se omogućiti istovremeno.

## Vidi također

- [COMPRESSION_ENGINES.md](./COMPRESSION_ENGINES.md) — registar mehanizama i lokalni mehanizmi za kompresiju
- [RTK_COMPRESSION.md](./RTK_COMPRESSION.md) — kompresija izlaza komandi/alata
- [../frameworks/MCP-SERVER.md](../frameworks/MCP-SERVER.md) — kompresija MCP opisa i smanjenje kardinalnosti alata
- Izvor: `open-sse/config/contextEditing.ts`, `open-sse/executors/base.ts`, `open-sse/services/compression/types.ts`, `src/lib/db/compressionAnalytics.ts`
