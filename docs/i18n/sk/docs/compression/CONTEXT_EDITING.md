# Delegated Context Editing (Anthropic) (Slovenčina)

🌐 **Languages:** 🇺🇸 [English](../../../../compression/CONTEXT_EDITING.md) · 🇪🇹 [am](../../../am/docs/compression/CONTEXT_EDITING.md) · 🇸🇦 [ar](../../../ar/docs/compression/CONTEXT_EDITING.md) · 🇦🇿 [az](../../../az/docs/compression/CONTEXT_EDITING.md) · 🇧🇬 [bg](../../../bg/docs/compression/CONTEXT_EDITING.md) · 🇧🇩 [bn](../../../bn/docs/compression/CONTEXT_EDITING.md) · 🇨🇿 [cs](../../../cs/docs/compression/CONTEXT_EDITING.md) · 🇩🇰 [da](../../../da/docs/compression/CONTEXT_EDITING.md) · 🇩🇪 [de](../../../de/docs/compression/CONTEXT_EDITING.md) · 🇬🇷 [el](../../../el/docs/compression/CONTEXT_EDITING.md) · 🇪🇸 [es](../../../es/docs/compression/CONTEXT_EDITING.md) · 🇪🇪 [et](../../../et/docs/compression/CONTEXT_EDITING.md) · 🇮🇷 [fa](../../../fa/docs/compression/CONTEXT_EDITING.md) · 🇫🇮 [fi](../../../fi/docs/compression/CONTEXT_EDITING.md) · 🇫🇷 [fr](../../../fr/docs/compression/CONTEXT_EDITING.md) · 🇮🇪 [ga](../../../ga/docs/compression/CONTEXT_EDITING.md) · 🇮🇳 [gu](../../../gu/docs/compression/CONTEXT_EDITING.md) · 🇳🇬 [ha](../../../ha/docs/compression/CONTEXT_EDITING.md) · 🇮🇱 [he](../../../he/docs/compression/CONTEXT_EDITING.md) · 🇮🇳 [hi](../../../hi/docs/compression/CONTEXT_EDITING.md) · 🇭🇷 [hr](../../../hr/docs/compression/CONTEXT_EDITING.md) · 🇭🇺 [hu](../../../hu/docs/compression/CONTEXT_EDITING.md) · 🇦🇲 [hy](../../../hy/docs/compression/CONTEXT_EDITING.md) · 🇮🇩 [id](../../../id/docs/compression/CONTEXT_EDITING.md) · 🇳🇬 [ig](../../../ig/docs/compression/CONTEXT_EDITING.md) · 🇮🇹 [it](../../../it/docs/compression/CONTEXT_EDITING.md) · 🇯🇵 [ja](../../../ja/docs/compression/CONTEXT_EDITING.md) · 🇬🇪 [ka](../../../ka/docs/compression/CONTEXT_EDITING.md) · 🇰🇭 [km](../../../km/docs/compression/CONTEXT_EDITING.md) · 🇮🇳 [kn](../../../kn/docs/compression/CONTEXT_EDITING.md) · 🇰🇷 [ko](../../../ko/docs/compression/CONTEXT_EDITING.md) · 🇱🇹 [lt](../../../lt/docs/compression/CONTEXT_EDITING.md) · 🇱🇻 [lv](../../../lv/docs/compression/CONTEXT_EDITING.md) · 🇮🇳 [ml](../../../ml/docs/compression/CONTEXT_EDITING.md) · 🇮🇳 [mr](../../../mr/docs/compression/CONTEXT_EDITING.md) · 🇲🇾 [ms](../../../ms/docs/compression/CONTEXT_EDITING.md) · 🇲🇹 [mt](../../../mt/docs/compression/CONTEXT_EDITING.md) · 🇲🇲 [my](../../../my/docs/compression/CONTEXT_EDITING.md) · 🇳🇵 [ne](../../../ne/docs/compression/CONTEXT_EDITING.md) · 🇳🇱 [nl](../../../nl/docs/compression/CONTEXT_EDITING.md) · 🇳🇴 [no](../../../no/docs/compression/CONTEXT_EDITING.md) · 🇮🇳 [or](../../../or/docs/compression/CONTEXT_EDITING.md) · 🇮🇳 [pa](../../../pa/docs/compression/CONTEXT_EDITING.md) · 🇵🇭 [phi](../../../phi/docs/compression/CONTEXT_EDITING.md) · 🇵🇱 [pl](../../../pl/docs/compression/CONTEXT_EDITING.md) · 🇵🇹 [pt](../../../pt/docs/compression/CONTEXT_EDITING.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/compression/CONTEXT_EDITING.md) · 🇷🇴 [ro](../../../ro/docs/compression/CONTEXT_EDITING.md) · 🇷🇺 [ru](../../../ru/docs/compression/CONTEXT_EDITING.md) · 🇱🇰 [si](../../../si/docs/compression/CONTEXT_EDITING.md) · 🇸🇮 [sl](../../../sl/docs/compression/CONTEXT_EDITING.md) · 🇷🇸 [sr](../../../sr/docs/compression/CONTEXT_EDITING.md) · 🇸🇪 [sv](../../../sv/docs/compression/CONTEXT_EDITING.md) · 🇰🇪 [sw](../../../sw/docs/compression/CONTEXT_EDITING.md) · 🇮🇳 [ta](../../../ta/docs/compression/CONTEXT_EDITING.md) · 🇮🇳 [te](../../../te/docs/compression/CONTEXT_EDITING.md) · 🇹🇭 [th](../../../th/docs/compression/CONTEXT_EDITING.md) · 🇹🇷 [tr](../../../tr/docs/compression/CONTEXT_EDITING.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/compression/CONTEXT_EDITING.md) · 🇵🇰 [ur](../../../ur/docs/compression/CONTEXT_EDITING.md) · 🇺🇿 [uz](../../../uz/docs/compression/CONTEXT_EDITING.md) · 🇻🇳 [vi](../../../vi/docs/compression/CONTEXT_EDITING.md) · 🇳🇬 [yo](../../../yo/docs/compression/CONTEXT_EDITING.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/compression/CONTEXT_EDITING.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/compression/CONTEXT_EDITING.md)

---

Delegovaná **úprava kontextu** je funkcia správy kontextu dostupná iba pre Claude. Na rozdiel od lokálnych
kompresných mechanizmov OmniRoute (Caveman, RTK, LLMLingua, zreťazené pipeline), ktoré prepisujú telo požiadavky
_ešte predtým_, ako opustí proxy, úprava kontextu požiada **poskytovateľa**, aby zo svojho aktuálneho kontextového
okna odstránil zastarané bloky použitia nástrojov/výsledkov nástrojov. OmniRoute iba pridá parameter tela
(`context_management.edits[]`); samotné odstránenie vykoná Claude podľa vlastného tokenizéra.

Táto schopnosť je zo svojej podstaty delegovaná: ostatní poskytovatelia tento parameter odmietajú, preto ju OmniRoute
striktne obmedzuje na Claude a relay služby kompatibilné s Claude Code.

Zdroj pravdy: `open-sse/config/contextEditing.ts` (ID stratégií, vloženie do tela, extrakcia
telemetrie), `open-sse/executors/base.ts` (podmienka vloženia + záložný postup pri chybe 400) a
`open-sse/services/compression/types.ts` (štruktúra konfigurácie + predvolená hodnota).

## Čo robí `clear_tool_uses`

OmniRoute vloží do odosielaného tela Anthropic Messages jednu úpravu:

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

- `type: "clear_tool_uses_20250919"` — datované ID stratégie Anthropic (`CLEAR_TOOL_USES_STRATEGY`).
- `trigger.value: 100000` — keď počet vstupných tokenov požiadavky prekročí túto prahovú hodnotu, Claude začne
  odstraňovať staré dvojice použitia nástroja/výsledku (`CONTEXT_EDITING_DEFAULT_TRIGGER_TOKENS`, predvolená hodnota Anthropic).
- `keep.value: 3` — N najnovších dvojíc použitia nástroja/výsledku zostane nedotknutých
  (`CONTEXT_EDITING_DEFAULT_KEEP_TOOL_USES`).

Beta funkcia je oznámená prostredníctvom hlavičky `anthropic-beta: context-management-2025-06-27`, ktorú
OmniRoute už odosiela v požiadavkách na Claude.

Vloženie vykonáva `applyContextEditingToBody()` a je **idempotentné**: ak už telo obsahuje úpravu `clear_tool_uses`
(pridanú predchádzajúcim volaním alebo dodanú klientom), telo zostane nezmenené. Ak sa v ňom nachádza aj úprava
`clear_thinking_20251015`, OmniRoute pomocou stabilného zoradenia presunie úpravu `clear_thinking` na začiatok,
pretože Anthropic vyžaduje, aby `clear_thinking` v poli `edits[]` predchádzalo `clear_tool_uses`.

## Prepínač aktivácie pre jednotlivé kombinácie

Úprava kontextu je **predvolene vypnutá** a musí sa explicitne aktivovať. Prepínač je jedna booleovská hodnota
uložená v konfigurácii kompresie:

- Kľúč nastavenia: `contextEditing.enabled` (camelCase — **nie** `context_editing` / `context-editing`).
- Typ: `ContextEditingConfig { enabled: boolean }` v
  `open-sse/services/compression/types.ts`.
- Predvolená hodnota: `DEFAULT_CONTEXT_EDITING_CONFIG = { enabled: false }`.
- Schéma Zod: `contextEditingConfigSchema` v `src/shared/validation/compressionConfigSchemas.ts`.
- Úložisko: uchováva sa spolu s ostatnými nastaveniami kompresie (normalizácia prebieha v
  `src/lib/db/compression.ts`).

Na ovládacom paneli sa prepínač nachádza v centre kompresie
(`src/app/(dashboard)/dashboard/context/combos/CompressionHub.tsx`) a prostredníctvom `saveSettings()` zapisuje
späť `{ contextEditing: { enabled: … } }`. Keďže je súčasťou objektu nastavení kompresie, kombinuje sa s
kompresným profilom konkrétnej kombinácie a nepredstavuje úplne nezávislé rozhranie — konfigurácia obsahuje iba
príznak zapnutia/vypnutia; všetky prahové hodnoty (`trigger`, `keep`) sú konštanty zdokumentované vyššie.

## Obmedzenie len na Claude

Vkladanie prebieha iba pre skutočný Claude alebo relay služby kompatibilné s Claude Code. Podmienka v
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

- `this.provider === "claude"` — skutočný kľúč Anthropic/OAuth.
- `isClaudeCodeCompatible(this.provider)` — relay služby, ktorých ID poskytovateľa sa začína predponou
  `anthropic-compatible-cc-` (deklarujú kompatibilitu s Claude Code, takže ide o relay služby
  s najväčšou pravdepodobnosťou podpory beta funkcie). Pozrite si `open-sse/services/provider.ts`.

Zámerne **vylúčené**:

- `claude-web` — prehliadačová relay služba s formátom požiadavky `create_conversation_params`, ktorý
  nikdy neobsahuje `context_management`.
- Všeobecné relay služby `anthropic-compatible-*` (bez predpony `-cc-`) — koncové body tretích strán
  s neistou podporou beta funkcie.

Poskytovatelia mimo Claude nikdy nedostanú parameter `context_management`, ani keď je prepínač zapnutý.

## Núdzový mechanizmus pri chybe 400 / pokrytie relay služieb

Relay služba kompatibilná s Claude môže deklarovať podporu beta funkcie, ale napriek tomu odmietnuť
parameter `context_management` s chybou HTTP 400. Aby sa namiesto zlyhania požiadavky funkčnosť
degradovala kontrolovaným spôsobom, executor odstráni parameter a zopakuje požiadavku na rovnakú URL
**jedenkrát**:

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

Správanie:

1. Aktivuje sa iba pri chybe `400`, keď je úprava kontextu povolená a telo skutočne obsahuje
   `context_management`.
2. Telo odpovede 400 sa načíta prostredníctvom `clone()`, takže pôvodná odpoveď zostane nedotknutá
   pre prípad, že sa podmienka nezhoduje.
3. Text chyby sa musí zhodovať s `/context[_-]management|context editing/i` — nesúvisiaca chyba 400
   (napr. `max_tokens must be >= 1`) **nespustí** núdzový mechanizmus; pôvodná chyba sa odovzdá ďalej.
4. Pri zhode nastaví `contextEditingDisabled = true` (čo zabráni opätovnému vloženiu, ak sa neskôr
   vytvorí nový `transformedBody` pre opakovaný pokus alebo náhradnú URL), odstráni
   `context_management`, znovu podpíše telo pre Claude / relay služby kompatibilné s Claude Code
   (`signRequestBody`) a jedenkrát zopakuje požiadavku na rovnakú URL.

Skutočný Claude obsahuje beta funkciu v `ANTHROPIC_BETA_BASE` a túto cestu núdzového mechanizmu
nevyužíva.

## Telemetria `applied_edits`

Po odpovedi Claude služba OmniRoute zaznamená, akú časť kontextu poskytovateľ skutočne odstránil.
Tieto údaje sa **neodosielajú priebežne** — extrahujú sa z tela odpovede bez streamovania podľa
možnosti a nikdy neovplyvňujú odpoveď (zlyhania telemetrie sa ignorujú).

- Extrakcia: `extractContextEditingTelemetry(responseBody)` v `open-sse/config/contextEditing.ts`.
  Kontroluje `applied_edits` na troch miestach (preventívne vzhľadom na formát odpovede):
  - `context_management.applied_edits`
  - `usage.context_management.applied_edits`
  - `usage.applied_edits`
- Polia jednotlivých úprav načítané z každej položky: `cleared_input_tokens` a `cleared_tool_uses`
  (snake_case, natívny formát Anthropic), s náhradnými variantmi camelCase
  `clearedInputTokens` / `clearedToolUses`.
- Vráti `null`, ak sa nenájde žiadne pole `applied_edits` alebo ak sa v skutočnosti nič neodstránilo.

Formát záznamu je `ContextEditingTelemetry { editCount, clearedInputTokens, clearedToolUses }`.
Zaznamenávanie prebieha v `open-sse/handlers/chatCore.ts` (obmedzené na `provider === "claude"`)
prostredníctvom `recordContextEditingTelemetry()` (`src/lib/db/compressionAnalytics.ts`), ktoré zapíše
riadok analytiky kompresie označený:

- `mode: "context-editing"`
- `engine: "context-editing"`
- `tokens_saved` / `original_tokens` = počet odstránených vstupných tokenov
- `request_id` s príponou `::context-editing`

Delegované odstraňovanie sa teda zobrazuje v analytike kompresie spolu s lokálnymi enginmi pod
označením enginu `context-editing` a dá sa odlíšiť od úspor RTK/Caveman/LLMLingua.

## Vzťah k lokálnym kompresným mechanizmom

| Aspekt                | Lokálne mechanizmy (Caveman / RTK / LLMLingua / stacked) | Delegovaná úprava kontextu                                                   |
| --------------------- | -------------------------------------------------------- | ---------------------------------------------------------------------------- |
| Kde sa vykonáva       | V OmniRoute, predtým ako požiadavka opustí proxy         | U poskytovateľa (Claude), na strane servera                                  |
| Čo upravuje           | Text promptu / kontextu / výsledku nástroja              | Staré bloky použitia nástroja / výsledku nástroja                            |
| Rozsah poskytovateľov | Všetci poskytovatelia                                    | Iba `claude` + `anthropic-compatible-cc-*`                                   |
| Prepínač              | Nastavenia režimu kompresie                              | `contextEditing.enabled`                                                     |
| Režim zlyhania        | Pokračovanie pri zlyhaní (pôvodný text)                  | Náhradný postup pri chybe 400: odstránenie parametra a jeden opakovaný pokus |
| Telemetria úspor      | `engine: <engine id>`                                    | `engine: "context-editing"`                                                  |

Tieto dva prístupy sa navzájom dopĺňajú: lokálne mechanizmy komprimujú bajty odosielané službou OmniRoute; úprava kontextu umožňuje
službe Claude priebežne medzi jednotlivými interakciami orezávať kontext. Možno ich zapnúť súčasne.

## Pozrite si tiež

- [COMPRESSION_ENGINES.md](./COMPRESSION_ENGINES.md) — register mechanizmov a lokálne kompresné
  mechanizmy
- [RTK_COMPRESSION.md](./RTK_COMPRESSION.md) — kompresia výstupu príkazov/nástrojov
- [../frameworks/MCP-SERVER.md](../frameworks/MCP-SERVER.md) — kompresia opisov MCP a
  zníženie kardinality nástrojov
- Zdroj: `open-sse/config/contextEditing.ts`, `open-sse/executors/base.ts`,
  `open-sse/services/compression/types.ts`, `src/lib/db/compressionAnalytics.ts`
