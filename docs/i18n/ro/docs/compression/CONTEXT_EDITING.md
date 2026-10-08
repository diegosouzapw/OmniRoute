# Delegated Context Editing (Anthropic) (Română)

🌐 **Languages:** 🇺🇸 [English](../../../../compression/CONTEXT_EDITING.md) · 🇪🇹 [am](../../../am/docs/compression/CONTEXT_EDITING.md) · 🇸🇦 [ar](../../../ar/docs/compression/CONTEXT_EDITING.md) · 🇦🇿 [az](../../../az/docs/compression/CONTEXT_EDITING.md) · 🇧🇬 [bg](../../../bg/docs/compression/CONTEXT_EDITING.md) · 🇧🇩 [bn](../../../bn/docs/compression/CONTEXT_EDITING.md) · 🇧🇦 [bs](../../../bs/docs/compression/CONTEXT_EDITING.md) · 🇨🇿 [cs](../../../cs/docs/compression/CONTEXT_EDITING.md) · 🇩🇰 [da](../../../da/docs/compression/CONTEXT_EDITING.md) · 🇩🇪 [de](../../../de/docs/compression/CONTEXT_EDITING.md) · 🇬🇷 [el](../../../el/docs/compression/CONTEXT_EDITING.md) · 🇪🇸 [es](../../../es/docs/compression/CONTEXT_EDITING.md) · 🇪🇪 [et](../../../et/docs/compression/CONTEXT_EDITING.md) · 🇮🇷 [fa](../../../fa/docs/compression/CONTEXT_EDITING.md) · 🇫🇮 [fi](../../../fi/docs/compression/CONTEXT_EDITING.md) · 🇫🇷 [fr](../../../fr/docs/compression/CONTEXT_EDITING.md) · 🇮🇪 [ga](../../../ga/docs/compression/CONTEXT_EDITING.md) · 🇮🇳 [gu](../../../gu/docs/compression/CONTEXT_EDITING.md) · 🇳🇬 [ha](../../../ha/docs/compression/CONTEXT_EDITING.md) · 🇮🇱 [he](../../../he/docs/compression/CONTEXT_EDITING.md) · 🇮🇳 [hi](../../../hi/docs/compression/CONTEXT_EDITING.md) · 🇭🇷 [hr](../../../hr/docs/compression/CONTEXT_EDITING.md) · 🇭🇺 [hu](../../../hu/docs/compression/CONTEXT_EDITING.md) · 🇦🇲 [hy](../../../hy/docs/compression/CONTEXT_EDITING.md) · 🇮🇩 [id](../../../id/docs/compression/CONTEXT_EDITING.md) · 🇳🇬 [ig](../../../ig/docs/compression/CONTEXT_EDITING.md) · 🇮🇹 [it](../../../it/docs/compression/CONTEXT_EDITING.md) · 🇯🇵 [ja](../../../ja/docs/compression/CONTEXT_EDITING.md) · 🇬🇪 [ka](../../../ka/docs/compression/CONTEXT_EDITING.md) · 🇰🇭 [km](../../../km/docs/compression/CONTEXT_EDITING.md) · 🇮🇳 [kn](../../../kn/docs/compression/CONTEXT_EDITING.md) · 🇰🇷 [ko](../../../ko/docs/compression/CONTEXT_EDITING.md) · 🇱🇹 [lt](../../../lt/docs/compression/CONTEXT_EDITING.md) · 🇱🇻 [lv](../../../lv/docs/compression/CONTEXT_EDITING.md) · 🇮🇳 [ml](../../../ml/docs/compression/CONTEXT_EDITING.md) · 🇮🇳 [mr](../../../mr/docs/compression/CONTEXT_EDITING.md) · 🇲🇾 [ms](../../../ms/docs/compression/CONTEXT_EDITING.md) · 🇲🇹 [mt](../../../mt/docs/compression/CONTEXT_EDITING.md) · 🇲🇲 [my](../../../my/docs/compression/CONTEXT_EDITING.md) · 🇳🇵 [ne](../../../ne/docs/compression/CONTEXT_EDITING.md) · 🇳🇱 [nl](../../../nl/docs/compression/CONTEXT_EDITING.md) · 🇳🇴 [no](../../../no/docs/compression/CONTEXT_EDITING.md) · 🇮🇳 [or](../../../or/docs/compression/CONTEXT_EDITING.md) · 🇮🇳 [pa](../../../pa/docs/compression/CONTEXT_EDITING.md) · 🇵🇭 [phi](../../../phi/docs/compression/CONTEXT_EDITING.md) · 🇵🇱 [pl](../../../pl/docs/compression/CONTEXT_EDITING.md) · 🇵🇹 [pt](../../../pt/docs/compression/CONTEXT_EDITING.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/compression/CONTEXT_EDITING.md) · 🇷🇺 [ru](../../../ru/docs/compression/CONTEXT_EDITING.md) · 🇱🇰 [si](../../../si/docs/compression/CONTEXT_EDITING.md) · 🇸🇰 [sk](../../../sk/docs/compression/CONTEXT_EDITING.md) · 🇸🇮 [sl](../../../sl/docs/compression/CONTEXT_EDITING.md) · 🇷🇸 [sr](../../../sr/docs/compression/CONTEXT_EDITING.md) · 🇸🇪 [sv](../../../sv/docs/compression/CONTEXT_EDITING.md) · 🇰🇪 [sw](../../../sw/docs/compression/CONTEXT_EDITING.md) · 🇮🇳 [ta](../../../ta/docs/compression/CONTEXT_EDITING.md) · 🇮🇳 [te](../../../te/docs/compression/CONTEXT_EDITING.md) · 🇹🇭 [th](../../../th/docs/compression/CONTEXT_EDITING.md) · 🇹🇷 [tr](../../../tr/docs/compression/CONTEXT_EDITING.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/compression/CONTEXT_EDITING.md) · 🇵🇰 [ur](../../../ur/docs/compression/CONTEXT_EDITING.md) · 🇺🇿 [uz](../../../uz/docs/compression/CONTEXT_EDITING.md) · 🇻🇳 [vi](../../../vi/docs/compression/CONTEXT_EDITING.md) · 🇳🇬 [yo](../../../yo/docs/compression/CONTEXT_EDITING.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/compression/CONTEXT_EDITING.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/compression/CONTEXT_EDITING.md)

---

**Editarea contextului** delegată este o funcționalitate de gestionare a contextului disponibilă exclusiv pentru Claude. Spre deosebire de motoarele locale
de compresie OmniRoute (Caveman, RTK, LLMLingua, fluxuri suprapuse) — care rescriu corpul cererii
_înainte_ ca acesta să părăsească proxy-ul — Editarea contextului îi solicită **furnizorului** să elimine blocurile învechite
de utilizare a instrumentelor / rezultate ale instrumentelor din propria fereastră de context activă. OmniRoute atașează doar un
parametru în corp (`context_management.edits[]`); Claude efectuează eliminarea propriu-zisă folosind propriul tokenizator.

Prin natura sa, aceasta este o capabilitate delegată: ceilalți furnizori resping parametrul, astfel încât OmniRoute o limitează
strict la Claude și la releele compatibile cu Claude Code.

Sursa de referință: `open-sse/config/contextEditing.ts` (ID-uri de strategie, injectarea în corp, extragerea
telemetriei), `open-sse/executors/base.ts` (poarta de injectare + mecanismul alternativ la eroarea 400) și
`open-sse/services/compression/types.ts` (structura configurației + valoarea implicită).

## Ce face `clear_tool_uses`

OmniRoute injectează o singură editare în corpul de ieșire Anthropic Messages:

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

- `type: "clear_tool_uses_20250919"` — ID-ul datat al strategiei Anthropic (`CLEAR_TOOL_USES_STRATEGY`).
- `trigger.value: 100000` — odată ce tokenurile de intrare ale cererii depășesc acest prag, Claude începe
  să elimine perechile vechi de utilizare/rezultat ale instrumentelor (`CONTEXT_EDITING_DEFAULT_TRIGGER_TOKENS`, valoarea implicită Anthropic).
- `keep.value: 3` — cele mai recente N perechi de utilizare/rezultat ale instrumentelor sunt păstrate neatinse
  (`CONTEXT_EDITING_DEFAULT_KEEP_TOOL_USES`).

Versiunea beta este semnalată prin antetul `anthropic-beta: context-management-2025-06-27`, pe care
OmniRoute îl emite deja pentru cererile Claude.

Injectarea este efectuată de `applyContextEditingToBody()` și este **idempotentă**: dacă o editare `clear_tool_uses`
există deja în corp (adăugată de un apel anterior sau furnizată de client), corpul este
lăsat nemodificat. Dacă este prezentă și o editare `clear_thinking_20251015`, OmniRoute sortează stabil
editarea `clear_thinking` în față, deoarece Anthropic impune ca `clear_thinking` să preceadă
`clear_tool_uses` în matricea `edits[]`.

## Comutatorul de activare pentru fiecare combinație

Editarea contextului este **dezactivată implicit** și necesită activare explicită. Comutatorul este o singură valoare booleană inclusă în
configurația de compresie:

- Cheia setării: `contextEditing.enabled` (camelCase — **nu** `context_editing` / `context-editing`).
- Tip: `ContextEditingConfig { enabled: boolean }` în
  `open-sse/services/compression/types.ts`.
- Valoare implicită: `DEFAULT_CONTEXT_EDITING_CONFIG = { enabled: false }`.
- Schema Zod: `contextEditingConfigSchema` în `src/shared/validation/compressionConfigSchemas.ts`.
- Stocare: persistă împreună cu restul setărilor de compresie (normalizate în
  `src/lib/db/compression.ts`).

În panoul de control, comutatorul se află în centrul de compresie
(`src/app/(dashboard)/dashboard/context/combos/CompressionHub.tsx`) și scrie
`{ contextEditing: { enabled: … } }` înapoi prin `saveSettings()`. Deoarece face parte din obiectul
setărilor de compresie, acesta se combină cu profilul de compresie al fiecărei combinații, în loc să fie o
suprafață complet independentă — configurația conține doar indicatorul de activare/dezactivare; toate pragurile (`trigger`,
`keep`) sunt constantele documentate mai sus.

## Limitare exclusivă la Claude

Injectarea are loc doar pentru instanțe Claude autentice sau relee compatibile cu Claude Code. Condiția din
`open-sse/executors/base.ts` este:

```ts
if (
  (this.provider === "claude" || isClaudeCodeCompatible(this.provider)) &&
  contextEditing?.enabled &&
  !contextEditingDisabled
) {
  applyContextEditingToBody(transformedBody, { enabled: true });
}
```

- `this.provider === "claude"` — cheie Anthropic/OAuth autentică.
- `isClaudeCodeCompatible(this.provider)` — relee al căror ID de furnizor începe cu prefixul
  `anthropic-compatible-cc-` (acestea declară compatibilitate cu Claude Code, deci sunt releele
  cu cele mai mari șanse să accepte funcționalitatea beta). Consultați `open-sse/services/provider.ts`.

Sunt **excluse** în mod deliberat:

- `claude-web` — un releu pentru browser cu un format de cerere `create_conversation_params` care nu primește niciodată
  `context_management`.
- Releele generice `anthropic-compatible-*` (fără prefixul `-cc-`) — endpointuri terțe cu
  suport beta incert.

Furnizorii non-Claude nu primesc niciodată parametrul `context_management`, chiar dacă opțiunea este activată.

## Mecanismul de rezervă pentru 400 / acoperirea releelor

Un releu compatibil cu Claude poate declara funcționalitatea beta, dar poate totuși respinge parametrul `context_management`
cu un răspuns HTTP 400. Pentru o degradare elegantă în locul eșuării cererii, executorul elimină
parametrul și reîncearcă aceeași adresă URL **o singură dată**:

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

Comportament:

1. Se declanșează doar la un răspuns `400`, atunci când editarea contextului este activată, iar corpul conține efectiv
   `context_management`.
2. Corpul răspunsului 400 este citit printr-o `clone()`, astfel încât răspunsul original rămâne intact pentru cazul în care
   nu există o potrivire.
3. Textul erorii trebuie să corespundă expresiei `/context[_-]management|context editing/i` — un răspuns 400 fără legătură (de exemplu,
   `max_tokens must be >= 1`) **nu** declanșează mecanismul de rezervă; eroarea originală este propagată.
4. La găsirea unei potriviri, setează `contextEditingDisabled = true` (ceea ce împiedică reinjectarea dacă este construit ulterior
   un `transformedBody` nou pentru o reîncercare sau o adresă URL de rezervă), șterge `context_management`,
   resemnează corpul pentru Claude/releele compatibile cu Claude Code (`signRequestBody`) și reîncearcă
   aceeași adresă URL o singură dată.

Claude autentic include funcționalitatea beta în `ANTHROPIC_BETA_BASE` și nu ajunge pe această cale de rezervă.

## Telemetria `applied_edits`

După un răspuns Claude, OmniRoute înregistrează cât context a eliminat efectiv furnizorul. Aceste date
**nu** sunt transmise în flux — sunt extrase din corpul răspunsului fără flux, în regim best-effort, și nu
afectează niciodată răspunsul (erorile de telemetrie sunt ignorate).

- Extragere: `extractContextEditingTelemetry(responseBody)` din `open-sse/config/contextEditing.ts`.
  Verifică `applied_edits` în trei locații (în mod defensiv, pentru diferite formate ale răspunsului):
  - `context_management.applied_edits`
  - `usage.context_management.applied_edits`
  - `usage.applied_edits`
- Câmpurile citite din fiecare intrare: `cleared_input_tokens` și `cleared_tool_uses`
  (snake_case, format nativ Anthropic), cu alternativele camelCase `clearedInputTokens` / `clearedToolUses`.
- Returnează `null` când nu este găsit niciun tablou `applied_edits` sau când nu a fost eliminat efectiv nimic.

Structura confirmării este `ContextEditingTelemetry { editCount, clearedInputTokens, clearedToolUses }`.
Înregistrarea are loc în `open-sse/handlers/chatCore.ts` (limitată la `provider === "claude"`) prin
`recordContextEditingTelemetry()` (`src/lib/db/compressionAnalytics.ts`), care scrie un rând de analiză a
compresiei etichetat astfel:

- `mode: "context-editing"`
- `engine: "context-editing"`
- `tokens_saved` / `original_tokens` = numărul de tokenuri de intrare eliminate
- `request_id` cu sufixul `::context-editing`

Astfel, eliminarea delegată apare în analiza compresiei alături de motoarele locale, sub eticheta de motor
`context-editing`, și poate fi diferențiată de economiile RTK/Caveman/LLMLingua.

## Relația cu motoarele locale de compresie

| Aspect                 | Motoare locale (Caveman / RTK / LLMLingua / stacked)          | Editarea delegată a contextului                                              |
| ---------------------- | ------------------------------------------------------------- | ---------------------------------------------------------------------------- |
| Unde rulează           | În OmniRoute, înainte ca solicitarea să părăsească proxy-ul   | La furnizor (Claude), pe server                                              |
| Ce editează            | Textul promptului / contextului / rezultatului instrumentului | Blocurile vechi de utilizare a instrumentelor / rezultate ale instrumentelor |
| Furnizori vizați       | Toți furnizorii                                               | Doar `claude` + `anthropic-compatible-cc-*`                                  |
| Comutator              | Setările modului de compresie                                 | `contextEditing.enabled`                                                     |
| Mod de eșec            | Continuare în caz de eroare (textul original)                 | Revenire la eroarea 400: eliminarea parametrului și o singură reîncercare    |
| Telemetria economiilor | `engine: <engine id>`                                         | `engine: "context-editing"`                                                  |

Cele două sunt complementare: motoarele locale comprimă octeții trimiși de OmniRoute; Editarea contextului îi permite lui
Claude să reducă din mers contextul acumulat de-a lungul schimburilor. Acestea pot fi activate simultan.

## Consultați și

- [COMPRESSION_ENGINES.md](./COMPRESSION_ENGINES.md) — registrul motoarelor și motoarele locale de
  compresie
- [RTK_COMPRESSION.md](./RTK_COMPRESSION.md) — compresia comenzilor/rezultatelor instrumentelor
- [../frameworks/MCP-SERVER.md](../frameworks/MCP-SERVER.md) — compresia descrierilor MCP și
  reducerea cardinalității instrumentelor
- Sursă: `open-sse/config/contextEditing.ts`, `open-sse/executors/base.ts`,
  `open-sse/services/compression/types.ts`, `src/lib/db/compressionAnalytics.ts`
