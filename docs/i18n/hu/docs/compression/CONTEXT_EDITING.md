# Delegated Context Editing (Anthropic) (Magyar)

🌐 **Languages:** 🇺🇸 [English](../../../../compression/CONTEXT_EDITING.md) · 🇪🇹 [am](../../../am/docs/compression/CONTEXT_EDITING.md) · 🇸🇦 [ar](../../../ar/docs/compression/CONTEXT_EDITING.md) · 🇦🇿 [az](../../../az/docs/compression/CONTEXT_EDITING.md) · 🇧🇬 [bg](../../../bg/docs/compression/CONTEXT_EDITING.md) · 🇧🇩 [bn](../../../bn/docs/compression/CONTEXT_EDITING.md) · 🇧🇦 [bs](../../../bs/docs/compression/CONTEXT_EDITING.md) · 🇨🇿 [cs](../../../cs/docs/compression/CONTEXT_EDITING.md) · 🇩🇰 [da](../../../da/docs/compression/CONTEXT_EDITING.md) · 🇩🇪 [de](../../../de/docs/compression/CONTEXT_EDITING.md) · 🇬🇷 [el](../../../el/docs/compression/CONTEXT_EDITING.md) · 🇪🇸 [es](../../../es/docs/compression/CONTEXT_EDITING.md) · 🇪🇪 [et](../../../et/docs/compression/CONTEXT_EDITING.md) · 🇮🇷 [fa](../../../fa/docs/compression/CONTEXT_EDITING.md) · 🇫🇮 [fi](../../../fi/docs/compression/CONTEXT_EDITING.md) · 🇫🇷 [fr](../../../fr/docs/compression/CONTEXT_EDITING.md) · 🇮🇪 [ga](../../../ga/docs/compression/CONTEXT_EDITING.md) · 🇮🇳 [gu](../../../gu/docs/compression/CONTEXT_EDITING.md) · 🇳🇬 [ha](../../../ha/docs/compression/CONTEXT_EDITING.md) · 🇮🇱 [he](../../../he/docs/compression/CONTEXT_EDITING.md) · 🇮🇳 [hi](../../../hi/docs/compression/CONTEXT_EDITING.md) · 🇭🇷 [hr](../../../hr/docs/compression/CONTEXT_EDITING.md) · 🇦🇲 [hy](../../../hy/docs/compression/CONTEXT_EDITING.md) · 🇮🇩 [id](../../../id/docs/compression/CONTEXT_EDITING.md) · 🇳🇬 [ig](../../../ig/docs/compression/CONTEXT_EDITING.md) · 🇮🇹 [it](../../../it/docs/compression/CONTEXT_EDITING.md) · 🇯🇵 [ja](../../../ja/docs/compression/CONTEXT_EDITING.md) · 🇬🇪 [ka](../../../ka/docs/compression/CONTEXT_EDITING.md) · 🇰🇭 [km](../../../km/docs/compression/CONTEXT_EDITING.md) · 🇮🇳 [kn](../../../kn/docs/compression/CONTEXT_EDITING.md) · 🇰🇷 [ko](../../../ko/docs/compression/CONTEXT_EDITING.md) · 🇱🇹 [lt](../../../lt/docs/compression/CONTEXT_EDITING.md) · 🇱🇻 [lv](../../../lv/docs/compression/CONTEXT_EDITING.md) · 🇮🇳 [ml](../../../ml/docs/compression/CONTEXT_EDITING.md) · 🇮🇳 [mr](../../../mr/docs/compression/CONTEXT_EDITING.md) · 🇲🇾 [ms](../../../ms/docs/compression/CONTEXT_EDITING.md) · 🇲🇹 [mt](../../../mt/docs/compression/CONTEXT_EDITING.md) · 🇲🇲 [my](../../../my/docs/compression/CONTEXT_EDITING.md) · 🇳🇵 [ne](../../../ne/docs/compression/CONTEXT_EDITING.md) · 🇳🇱 [nl](../../../nl/docs/compression/CONTEXT_EDITING.md) · 🇳🇴 [no](../../../no/docs/compression/CONTEXT_EDITING.md) · 🇮🇳 [or](../../../or/docs/compression/CONTEXT_EDITING.md) · 🇮🇳 [pa](../../../pa/docs/compression/CONTEXT_EDITING.md) · 🇵🇭 [phi](../../../phi/docs/compression/CONTEXT_EDITING.md) · 🇵🇱 [pl](../../../pl/docs/compression/CONTEXT_EDITING.md) · 🇵🇹 [pt](../../../pt/docs/compression/CONTEXT_EDITING.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/compression/CONTEXT_EDITING.md) · 🇷🇴 [ro](../../../ro/docs/compression/CONTEXT_EDITING.md) · 🇷🇺 [ru](../../../ru/docs/compression/CONTEXT_EDITING.md) · 🇱🇰 [si](../../../si/docs/compression/CONTEXT_EDITING.md) · 🇸🇰 [sk](../../../sk/docs/compression/CONTEXT_EDITING.md) · 🇸🇮 [sl](../../../sl/docs/compression/CONTEXT_EDITING.md) · 🇷🇸 [sr](../../../sr/docs/compression/CONTEXT_EDITING.md) · 🇸🇪 [sv](../../../sv/docs/compression/CONTEXT_EDITING.md) · 🇰🇪 [sw](../../../sw/docs/compression/CONTEXT_EDITING.md) · 🇮🇳 [ta](../../../ta/docs/compression/CONTEXT_EDITING.md) · 🇮🇳 [te](../../../te/docs/compression/CONTEXT_EDITING.md) · 🇹🇭 [th](../../../th/docs/compression/CONTEXT_EDITING.md) · 🇹🇷 [tr](../../../tr/docs/compression/CONTEXT_EDITING.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/compression/CONTEXT_EDITING.md) · 🇵🇰 [ur](../../../ur/docs/compression/CONTEXT_EDITING.md) · 🇺🇿 [uz](../../../uz/docs/compression/CONTEXT_EDITING.md) · 🇻🇳 [vi](../../../vi/docs/compression/CONTEXT_EDITING.md) · 🇳🇬 [yo](../../../yo/docs/compression/CONTEXT_EDITING.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/compression/CONTEXT_EDITING.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/compression/CONTEXT_EDITING.md)

---

A delegált **kontextusszerkesztés** egy kizárólag Claude-hoz készült kontextuskezelési funkció. Az OmniRoute helyi tömörítési motorjaival (Caveman, RTK, LLMLingua, egymásra épülő feldolgozási láncok) ellentétben — amelyek még azelőtt átírják a kérés törzsét, _hogy_ az elhagyná a proxyt — a kontextusszerkesztés arra kéri a **szolgáltatót**, hogy távolítsa el az elavult eszközhasználati / eszközeredmény-blokkokat a saját aktív kontextusablakából. Az OmniRoute csak egy törzsparamétert (`context_management.edits[]`) csatol; a tényleges törlést a Claude végzi el a saját tokenizerével.

Ez természeténél fogva delegált képesség: a többi szolgáltató elutasítja a paramétert, ezért az OmniRoute szigorúan a Claude-ra és a Claude Code-dal kompatibilis közvetítőkre korlátozza.

Hiteles forrás: `open-sse/config/contextEditing.ts` (stratégiaazonosítók, törzsbe történő beillesztés, telemetria kinyerése), `open-sse/executors/base.ts` (beillesztési kapu + 400-as hibánál alkalmazott tartalékmechanizmus), valamint `open-sse/services/compression/types.ts` (konfigurációs struktúra + alapértelmezett érték).

## Mit csinál a `clear_tool_uses`

Az OmniRoute egyetlen szerkesztési műveletet illeszt a kimenő Anthropic Messages-törzsbe:

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

- `type: "clear_tool_uses_20250919"` — az Anthropic dátummal ellátott stratégiaazonosítója (`CLEAR_TOOL_USES_STRATEGY`).
- `trigger.value: 100000` — amint a kérés bemeneti tokenjeinek száma meghaladja ezt a küszöbértéket, a Claude elkezdi törölni a régi eszközhasználati/eredménypárokat (`CONTEXT_EDITING_DEFAULT_TRIGGER_TOKENS`, az Anthropic alapértelmezett értéke).
- `keep.value: 3` — az N legutóbbi eszközhasználati/eredménypár érintetlen marad (`CONTEXT_EDITING_DEFAULT_KEEP_TOOL_USES`).

A bétafunkciót az `anthropic-beta: context-management-2025-06-27` fejléc jelzi, amelyet az OmniRoute már eleve elküld a Claude-kérésekben.

A beillesztést az `applyContextEditingToBody()` végzi, és a művelet **idempotens**: ha már létezik `clear_tool_uses` szerkesztési művelet a törzsben (egy korábbi hívás adta hozzá, vagy az ügyfél küldte), a törzs változatlan marad. Ha egy `clear_thinking_20251015` szerkesztési művelet is jelen van, az OmniRoute stabil rendezéssel előre helyezi a `clear_thinking` műveletet, mivel az Anthropic megköveteli, hogy a `clear_thinking` megelőzze a `clear_tool_uses` műveletet az `edits[]` tömbben.

## A kombinációnkénti engedélyezési kapcsoló

A kontextusszerkesztés **alapértelmezés szerint ki van kapcsolva**, és külön engedélyezendő. A kapcsoló egyetlen logikai érték, amely a tömörítési konfigurációban található:

- Beállításkulcs: `contextEditing.enabled` (camelCase — **nem** `context_editing` / `context-editing`).
- Típus: `ContextEditingConfig { enabled: boolean }` az
  `open-sse/services/compression/types.ts` fájlban.
- Alapértelmezett érték: `DEFAULT_CONTEXT_EDITING_CONFIG = { enabled: false }`.
- Zod-séma: `contextEditingConfigSchema` a `src/shared/validation/compressionConfigSchemas.ts` fájlban.
- Tárolás: a többi tömörítési beállítással együtt maradandóan tárolva (normalizálás:
  `src/lib/db/compression.ts`).

Az irányítópulton a kapcsoló a tömörítési központban található
(`src/app/(dashboard)/dashboard/context/combos/CompressionHub.tsx`), és a
`{ contextEditing: { enabled: … } }` értéket írja vissza a `saveSettings()` használatával. Mivel a tömörítési beállításokat tartalmazó objektum részeként működik, a kombinációnkénti tömörítési profillal együtt alkalmazható, nem pedig teljesen független felületként — a konfiguráció csak a be-/kikapcsolási jelzőt tartalmazza; az összes küszöbérték (`trigger`, `keep`) a fent dokumentált konstansokból származik.

## Kizárólag Claude-ra vonatkozó kapuzás

Az injektálás csak valódi Claude, illetve Claude Code-kompatibilis relayek esetén történik meg. Az
`open-sse/executors/base.ts` fájlban található kapu:

```ts
if (
  (this.provider === "claude" || isClaudeCodeCompatible(this.provider)) &&
  contextEditing?.enabled &&
  !contextEditingDisabled
) {
  applyContextEditingToBody(transformedBody, { enabled: true });
}
```

- `this.provider === "claude"` — valódi Anthropic-kulcs/OAuth.
- `isClaudeCodeCompatible(this.provider)` — olyan relayek, amelyek szolgáltatói azonosítója az
  `anthropic-compatible-cc-` előtaggal kezdődik (Claude Code-kompatibilitást hirdetnek, ezért ezek a
  relayek fogadják el a legnagyobb valószínűséggel a bétát). Lásd: `open-sse/services/provider.ts`.

Szándékosan **kizárva**:

- `claude-web` — böngészőalapú relay, amelynek `create_conversation_params` kérésformátuma soha nem
  találkozik a `context_management` paraméterrel.
- Általános `anthropic-compatible-*` relayek (a `-cc-` előtag nélkül) — külső végpontok, amelyek
  bétatámogatása bizonytalan.

A nem Claude szolgáltatók még bekapcsolt kapcsoló esetén sem kapják meg a `context_management`
paramétert.

## A 400-as tartalékmechanizmus / relay-lefedettség

Egy Claude-kompatibilis relay hirdetheti a bétát, mégis elutasíthatja a `context_management`
paramétert HTTP 400-as válasszal. Annak érdekében, hogy a kérés meghiúsítása helyett a rendszer
fokozatosan visszalépjen, a végrehajtó eltávolítja a paramétert, majd **egyszer** újrapróbálkozik
ugyanazzal az URL-lel:

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

Működés:

1. Csak `400` esetén aktiválódik, ha a kontextusszerkesztés engedélyezve van, és a törzs ténylegesen
   tartalmazza a `context_management` paramétert.
2. A 400-as válasz törzsét egy `clone()` segítségével olvassa be, így az eredeti válasz érintetlen
   marad arra az esetre, ha nincs egyezés.
3. A hibaüzenet szövegének illeszkednie kell a `/context[_-]management|context editing/i` mintára —
   egy ettől független 400-as hiba (például `max_tokens must be >= 1`) **nem** aktiválja a
   tartalékmechanizmust; az eredeti hiba továbbterjed.
4. Egyezés esetén `contextEditingDisabled = true` értéket állít be (ami megakadályozza az ismételt
   injektálást, ha később új `transformedBody` készül egy újrapróbálkozási/tartalék URL-hez), törli a
   `context_management` paramétert, újra aláírja a törzset a Claude / Claude Code-kompatibilis
   relayekhez (`signRequestBody`), majd egyszer újrapróbálkozik ugyanazzal az URL-lel.

A valódi Claude az `ANTHROPIC_BETA_BASE` részeként tartalmazza a bétát, és nem kerül erre a
tartalékútvonalra.

## `applied_edits` telemetria

Egy Claude-válasz után az OmniRoute rögzíti, hogy a szolgáltató ténylegesen mennyi kontextust törölt.
Ez **nem** streamelve történik — az adatokat a nem streamelt válasz törzséből nyeri ki a rendszer
best-effort módon, és ez soha nem befolyásolja a választ (a telemetriai hibákat figyelmen kívül
hagyja).

- Kinyerés: `extractContextEditingTelemetry(responseBody)` az
  `open-sse/config/contextEditing.ts` fájlban. Az `applied_edits` értékét három helyen vizsgálja
  (védekezően kezelve a válasz szerkezetét):
  - `context_management.applied_edits`
  - `usage.context_management.applied_edits`
  - `usage.applied_edits`
- Az egyes bejegyzésekből kiolvasott mezők: `cleared_input_tokens` és `cleared_tool_uses`
  (snake_case, natív Anthropic-formátum), tartalékként a camelCase formájú `clearedInputTokens` /
  `clearedToolUses` mezőkkel.
- `null` értéket ad vissza, ha nem található `applied_edits` tömb, vagy valójában semmi sem lett
  törölve.

A nyugta formátuma:
`ContextEditingTelemetry { editCount, clearedInputTokens, clearedToolUses }`.
A rögzítés az `open-sse/handlers/chatCore.ts` fájlban történik (a `provider === "claude"` feltétellel
kapuzva), a `recordContextEditingTelemetry()` függvényen keresztül
(`src/lib/db/compressionAnalytics.ts`), amely egy tömörítési analitikai sort ír a következő címkékkel:

- `mode: "context-editing"`
- `engine: "context-editing"`
- `tokens_saved` / `original_tokens` = a törölt bemeneti tokenek száma
- `request_id` a `::context-editing` utótaggal

Így a delegált törlés a helyi motorok mellett szintén megjelenik a tömörítési analitikában, a
`context-editing` motorcímke alatt, és megkülönböztethető az RTK/Caveman/LLMLingua által elért
megtakarításoktól.

## Kapcsolat a helyi tömörítési motorokkal

| Szempont                 | Helyi motorok (Caveman / RTK / LLMLingua / stacked) | Delegált kontextusszerkesztés                                               |
| ------------------------ | --------------------------------------------------- | --------------------------------------------------------------------------- |
| Hol fut                  | Az OmniRoute-ban, mielőtt a kérés elhagyja a proxyt | A szolgáltatónál (Claude), szerveroldalon                                   |
| Mit szerkeszt            | Prompt-, kontextus- és eszközeredmény-szöveg        | Régi eszközhasználati és eszközeredmény-blokkok                             |
| Szolgáltatói hatókör     | Minden szolgáltató                                  | Csak `claude` + `anthropic-compatible-cc-*`                                 |
| Kapcsoló                 | Tömörítési mód beállításai                          | `contextEditing.enabled`                                                    |
| Hibakezelés              | Nyitott hibakezelés (eredeti szöveg)                | 400-as tartalék eljárás: a paraméter eltávolítása, majd egy újrapróbálkozás |
| Megtakarítási telemetria | `engine: <engine id>`                               | `engine: "context-editing"`                                                 |

A kettő kiegészíti egymást: a helyi motorok az OmniRoute által küldött bájtokat tömörítik; a kontextusszerkesztés pedig lehetővé teszi,
hogy a Claude a fordulók során ritkítsa az aktuális kontextust. Együtt is engedélyezhetők.

## Lásd még

- [COMPRESSION_ENGINES.md](./COMPRESSION_ENGINES.md) — motorjegyzék és a helyi tömörítési
  motorok
- [RTK_COMPRESSION.md](./RTK_COMPRESSION.md) — parancs- és eszközkimenet-tömörítés
- [../frameworks/MCP-SERVER.md](../frameworks/MCP-SERVER.md) — MCP-leírások tömörítése és az
  eszközkardinalitás csökkentése
- Forrás: `open-sse/config/contextEditing.ts`, `open-sse/executors/base.ts`,
  `open-sse/services/compression/types.ts`, `src/lib/db/compressionAnalytics.ts`
