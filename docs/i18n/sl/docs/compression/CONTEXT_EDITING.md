# Delegated Context Editing (Anthropic) (Slovenščina)

🌐 **Languages:** 🇺🇸 [English](../../../../compression/CONTEXT_EDITING.md) · 🇪🇹 [am](../../../am/docs/compression/CONTEXT_EDITING.md) · 🇸🇦 [ar](../../../ar/docs/compression/CONTEXT_EDITING.md) · 🇦🇿 [az](../../../az/docs/compression/CONTEXT_EDITING.md) · 🇧🇬 [bg](../../../bg/docs/compression/CONTEXT_EDITING.md) · 🇧🇩 [bn](../../../bn/docs/compression/CONTEXT_EDITING.md) · 🇧🇦 [bs](../../../bs/docs/compression/CONTEXT_EDITING.md) · 🇨🇿 [cs](../../../cs/docs/compression/CONTEXT_EDITING.md) · 🇩🇰 [da](../../../da/docs/compression/CONTEXT_EDITING.md) · 🇩🇪 [de](../../../de/docs/compression/CONTEXT_EDITING.md) · 🇬🇷 [el](../../../el/docs/compression/CONTEXT_EDITING.md) · 🇪🇸 [es](../../../es/docs/compression/CONTEXT_EDITING.md) · 🇪🇪 [et](../../../et/docs/compression/CONTEXT_EDITING.md) · 🇮🇷 [fa](../../../fa/docs/compression/CONTEXT_EDITING.md) · 🇫🇮 [fi](../../../fi/docs/compression/CONTEXT_EDITING.md) · 🇫🇷 [fr](../../../fr/docs/compression/CONTEXT_EDITING.md) · 🇮🇪 [ga](../../../ga/docs/compression/CONTEXT_EDITING.md) · 🇮🇳 [gu](../../../gu/docs/compression/CONTEXT_EDITING.md) · 🇳🇬 [ha](../../../ha/docs/compression/CONTEXT_EDITING.md) · 🇮🇱 [he](../../../he/docs/compression/CONTEXT_EDITING.md) · 🇮🇳 [hi](../../../hi/docs/compression/CONTEXT_EDITING.md) · 🇭🇷 [hr](../../../hr/docs/compression/CONTEXT_EDITING.md) · 🇭🇺 [hu](../../../hu/docs/compression/CONTEXT_EDITING.md) · 🇦🇲 [hy](../../../hy/docs/compression/CONTEXT_EDITING.md) · 🇮🇩 [id](../../../id/docs/compression/CONTEXT_EDITING.md) · 🇳🇬 [ig](../../../ig/docs/compression/CONTEXT_EDITING.md) · 🇮🇹 [it](../../../it/docs/compression/CONTEXT_EDITING.md) · 🇯🇵 [ja](../../../ja/docs/compression/CONTEXT_EDITING.md) · 🇬🇪 [ka](../../../ka/docs/compression/CONTEXT_EDITING.md) · 🇰🇭 [km](../../../km/docs/compression/CONTEXT_EDITING.md) · 🇮🇳 [kn](../../../kn/docs/compression/CONTEXT_EDITING.md) · 🇰🇷 [ko](../../../ko/docs/compression/CONTEXT_EDITING.md) · 🇱🇹 [lt](../../../lt/docs/compression/CONTEXT_EDITING.md) · 🇱🇻 [lv](../../../lv/docs/compression/CONTEXT_EDITING.md) · 🇮🇳 [ml](../../../ml/docs/compression/CONTEXT_EDITING.md) · 🇮🇳 [mr](../../../mr/docs/compression/CONTEXT_EDITING.md) · 🇲🇾 [ms](../../../ms/docs/compression/CONTEXT_EDITING.md) · 🇲🇹 [mt](../../../mt/docs/compression/CONTEXT_EDITING.md) · 🇲🇲 [my](../../../my/docs/compression/CONTEXT_EDITING.md) · 🇳🇵 [ne](../../../ne/docs/compression/CONTEXT_EDITING.md) · 🇳🇱 [nl](../../../nl/docs/compression/CONTEXT_EDITING.md) · 🇳🇴 [no](../../../no/docs/compression/CONTEXT_EDITING.md) · 🇮🇳 [or](../../../or/docs/compression/CONTEXT_EDITING.md) · 🇮🇳 [pa](../../../pa/docs/compression/CONTEXT_EDITING.md) · 🇵🇭 [phi](../../../phi/docs/compression/CONTEXT_EDITING.md) · 🇵🇱 [pl](../../../pl/docs/compression/CONTEXT_EDITING.md) · 🇵🇹 [pt](../../../pt/docs/compression/CONTEXT_EDITING.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/compression/CONTEXT_EDITING.md) · 🇷🇴 [ro](../../../ro/docs/compression/CONTEXT_EDITING.md) · 🇷🇺 [ru](../../../ru/docs/compression/CONTEXT_EDITING.md) · 🇱🇰 [si](../../../si/docs/compression/CONTEXT_EDITING.md) · 🇸🇰 [sk](../../../sk/docs/compression/CONTEXT_EDITING.md) · 🇷🇸 [sr](../../../sr/docs/compression/CONTEXT_EDITING.md) · 🇸🇪 [sv](../../../sv/docs/compression/CONTEXT_EDITING.md) · 🇰🇪 [sw](../../../sw/docs/compression/CONTEXT_EDITING.md) · 🇮🇳 [ta](../../../ta/docs/compression/CONTEXT_EDITING.md) · 🇮🇳 [te](../../../te/docs/compression/CONTEXT_EDITING.md) · 🇹🇭 [th](../../../th/docs/compression/CONTEXT_EDITING.md) · 🇹🇷 [tr](../../../tr/docs/compression/CONTEXT_EDITING.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/compression/CONTEXT_EDITING.md) · 🇵🇰 [ur](../../../ur/docs/compression/CONTEXT_EDITING.md) · 🇺🇿 [uz](../../../uz/docs/compression/CONTEXT_EDITING.md) · 🇻🇳 [vi](../../../vi/docs/compression/CONTEXT_EDITING.md) · 🇳🇬 [yo](../../../yo/docs/compression/CONTEXT_EDITING.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/compression/CONTEXT_EDITING.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/compression/CONTEXT_EDITING.md)

---

Delegirano **urejanje konteksta** je funkcija za upravljanje konteksta, ki je na voljo samo za Claude. Za razliko od lokalnih mehanizmov stiskanja v OmniRoute (Caveman, RTK, LLMLingua, sestavljeni cevovodi) — ki prepišejo telo zahteve, _preden_ ta zapusti posredniški strežnik — urejanje konteksta od **ponudnika** zahteva, da iz lastnega trenutnega kontekstnega okna odstrani zastarele bloke uporabe orodij/rezultatov orodij. OmniRoute zgolj doda parameter telesa (`context_management.edits[]`); dejansko odstranjevanje glede na lasten razčlenjevalnik žetonov opravi Claude.

To je po naravi delegirana zmožnost: drugi ponudniki ta parameter zavrnejo, zato ga OmniRoute strogo omejuje na Claude in posredniške storitve, združljive s Claude Code.

Viri resnice: `open-sse/config/contextEditing.ts` (ID-ji strategij, vstavljanje v telo, pridobivanje telemetrije), `open-sse/executors/base.ts` (pogoj za vstavljanje + nadomestno ravnanje pri napaki 400) in `open-sse/services/compression/types.ts` (oblika konfiguracije + privzeta vrednost).

## Kaj počne `clear_tool_uses`

OmniRoute v odhodno telo Anthropic Messages vstavi eno urejanje:

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

- `type: "clear_tool_uses_20250919"` — datirani ID strategije Anthropic (`CLEAR_TOOL_USES_STRATEGY`).
- `trigger.value: 100000` — ko število vhodnih žetonov zahteve preseže ta prag, začne Claude odstranjevati stare pare uporabe orodij/rezultatov (`CONTEXT_EDITING_DEFAULT_TRIGGER_TOKENS`, privzeta vrednost Anthropic).
- `keep.value: 3` — N najnovejših parov uporabe orodij/rezultatov ostane nespremenjenih (`CONTEXT_EDITING_DEFAULT_KEEP_TOOL_USES`).

Beta je najavljena z glavo `anthropic-beta: context-management-2025-06-27`, ki jo OmniRoute že pošilja pri zahtevah za Claude.

Vstavljanje izvede `applyContextEditingToBody()` in je **idempotentno**: če urejanje `clear_tool_uses` v telesu že obstaja (dodano pri prejšnjem klicu ali posredovano s strani odjemalca), telo ostane nespremenjeno. Če je prisotno tudi urejanje `clear_thinking_20251015`, OmniRoute s stabilnim razvrščanjem premakne urejanje `clear_thinking` na začetek, saj Anthropic zahteva, da je `clear_thinking` v polju `edits[]` pred `clear_tool_uses`.

## Stikalo za omogočanje za posamezno kombinacijo

Urejanje konteksta je **privzeto izklopljeno** in zahteva izrecno vključitev. Stikalo je ena logična vrednost v konfiguraciji stiskanja:

- Ključ nastavitve: `contextEditing.enabled` (camelCase — **ne** `context_editing` / `context-editing`).
- Tip: `ContextEditingConfig { enabled: boolean }` v
  `open-sse/services/compression/types.ts`.
- Privzeta vrednost: `DEFAULT_CONTEXT_EDITING_CONFIG = { enabled: false }`.
- Shema Zod: `contextEditingConfigSchema` v `src/shared/validation/compressionConfigSchemas.ts`.
- Shranjevanje: ohrani se skupaj z drugimi nastavitvami stiskanja (normalizirano v
  `src/lib/db/compression.ts`).

Na nadzorni plošči je stikalo v središču za stiskanje (`src/app/(dashboard)/dashboard/context/combos/CompressionHub.tsx`) in prek `saveSettings()` zapiše `{ contextEditing: { enabled: … } }`. Ker je del objekta z nastavitvami stiskanja, se uporablja skupaj s profilom stiskanja za posamezno kombinacijo, namesto da bi predstavljalo povsem neodvisno nastavitev — konfiguracija vsebuje samo zastavico za vklop/izklop; vsi pragovi (`trigger`, `keep`) so konstante, dokumentirane zgoraj.

## Omejevanje samo na Claude

Vstavljanje se izvede samo za pristne posrednike Claude ali posrednike, združljive s Claude Code. Pogoj v
`open-sse/executors/base.ts` je:

```ts
if (
  (this.provider === "claude" || isClaudeCodeCompatible(this.provider)) &&
  contextEditing?.enabled &&
  !contextEditingDisabled
) {
  applyContextEditingToBody(transformedBody, { enabled: true });
}
```

- `this.provider === "claude"` — pravi ključ Anthropic/OAuth.
- `isClaudeCodeCompatible(this.provider)` — posredniki, katerih ID ponudnika se začne s predpono
  `anthropic-compatible-cc-` (oglašujejo združljivost s Claude Code, zato je zanje najverjetneje, da
  sprejemajo različico beta). Glejte `open-sse/services/provider.ts`.

Namerno **izključeni**:

- `claude-web` — brskalniški posrednik z obliko zahteve `create_conversation_params`, ki nikoli ne
  prejme `context_management`.
- Splošni posredniki `anthropic-compatible-*` (brez predpone `-cc-`) — končne točke tretjih oseb z
  negotovo podporo za različico beta.

Ponudniki, ki niso Claude, nikoli ne prejmejo parametra `context_management`, tudi ko je preklopnik vklopljen.

## Nadomestni postopek ob napaki 400 / pokritost posrednikov

Posrednik, združljiv s Claude, lahko oglašuje različico beta, vendar kljub temu zavrne parameter
`context_management` z odzivom HTTP 400. Da bi se funkcionalnost postopoma zmanjšala namesto neuspeha
zahteve, izvajalnik odstrani parameter in **enkrat** ponovi zahtevo na istem URL-ju:

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

Vedenje:

1. Sproži se samo ob napaki `400`, ko je urejanje konteksta omogočeno in telo dejansko vsebuje
   `context_management`.
2. Telo odziva 400 se prebere prek `clone()`, tako da izvirni odziv ostane nedotaknjen za primer
   neujemanja.
3. Besedilo napake se mora ujemati z `/context[_-]management|context editing/i` — nepovezana napaka 400 (npr.
   `max_tokens must be >= 1`) **ne** sproži nadomestnega postopka; posreduje se izvirna napaka.
4. Ob ujemanju nastavi `contextEditingDisabled = true` (kar prepreči ponovno vstavljanje, če je za
   ponovitev ali nadomestni URL pozneje ustvarjen nov `transformedBody`), izbriše `context_management`,
   znova podpiše telo za Claude oziroma posrednike, združljive s Claude Code (`signRequestBody`), in
   enkrat ponovi zahtevo na istem URL-ju.

Pristni Claude vključuje različico beta v `ANTHROPIC_BETA_BASE` in ne uporabi te nadomestne poti.

## Telemetrija `applied_edits`

Po odzivu Claude OmniRoute zabeleži, koliko konteksta je ponudnik dejansko počistil. To se
**ne** pretaka — podatki se po najboljših močeh izvlečejo iz telesa odziva brez pretakanja in nikoli
ne vplivajo na odziv (napake telemetrije se prezrejo).

- Izvlek: `extractContextEditingTelemetry(responseBody)` v `open-sse/config/contextEditing.ts`.
  Preveri `applied_edits` na treh mestih (obrambno glede na obliko odziva):
  - `context_management.applied_edits`
  - `usage.context_management.applied_edits`
  - `usage.applied_edits`
- Polja posamezne spremembe, prebrana iz vsakega vnosa: `cleared_input_tokens` in `cleared_tool_uses`
  (zapis snake_case, izvorno za Anthropic), z rezervnima različicama camelCase `clearedInputTokens` /
  `clearedToolUses`.
- Vrne `null`, kadar ni najdeno nobeno polje `applied_edits` ali kadar ni bilo dejansko nič počiščeno.

Oblika potrdila je `ContextEditingTelemetry { editCount, clearedInputTokens, clearedToolUses }`.
Beleženje se izvaja v `open-sse/handlers/chatCore.ts` (omejeno na `provider === "claude"`) prek
`recordContextEditingTelemetry()` (`src/lib/db/compressionAnalytics.ts`), ki zapiše vrstico analitike
stiskanja z oznakami:

- `mode: "context-editing"`
- `engine: "context-editing"`
- `tokens_saved` / `original_tokens` = število počiščenih vhodnih žetonov
- `request_id` s pripono `::context-editing`

Tako se delegirano čiščenje prikaže v analitiki stiskanja skupaj z lokalnimi pogoni pod oznako pogona
`context-editing` in ga je mogoče razlikovati od prihrankov RTK/Caveman/LLMLingua.

## Razmerje do lokalnih mehanizmov stiskanja

| Vidik                  | Lokalni mehanizmi (Caveman / RTK / LLMLingua / stacked)  | Delegirano urejanje konteksta                            |
| ---------------------- | -------------------------------------------------------- | -------------------------------------------------------- |
| Kje se izvaja          | V OmniRoute, preden zahteva zapusti posredniški strežnik | Pri ponudniku (Claude), na strani strežnika              |
| Kaj ureja              | Besedilo poziva / konteksta / rezultata orodja           | Stare bloke uporabe orodij / rezultatov orodij           |
| Obseg ponudnikov       | Vsi ponudniki                                            | Samo `claude` + `anthropic-compatible-cc-*`              |
| Preklop                | Nastavitve načina stiskanja                              | `contextEditing.enabled`                                 |
| Način obravnave napak  | Odprto ob napaki (izvirno besedilo)                      | Rezervni odziv ob 400: odstrani parameter, ponovi enkrat |
| Telemetrija prihrankov | `engine: <engine id>`                                    | `engine: "context-editing"`                              |

Oba pristopa se dopolnjujeta: lokalni mehanizmi stisnejo bajte, ki jih pošlje OmniRoute; urejanje konteksta pa omogoča,
da Claude med posameznimi koraki skrajšuje tekoči kontekst. Omogočena sta lahko hkrati.

## Glejte tudi

- [COMPRESSION_ENGINES.md](./COMPRESSION_ENGINES.md) — register mehanizmov in lokalni mehanizmi
  stiskanja
- [RTK_COMPRESSION.md](./RTK_COMPRESSION.md) — stiskanje ukazov/izhodov orodij
- [../frameworks/MCP-SERVER.md](../frameworks/MCP-SERVER.md) — stiskanje opisov MCP in
  zmanjšanje kardinalnosti orodij
- Vir: `open-sse/config/contextEditing.ts`, `open-sse/executors/base.ts`,
  `open-sse/services/compression/types.ts`, `src/lib/db/compressionAnalytics.ts`
