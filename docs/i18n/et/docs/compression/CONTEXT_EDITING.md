# Delegated Context Editing (Anthropic) (Eesti)

🌐 **Languages:** 🇺🇸 [English](../../../../compression/CONTEXT_EDITING.md) · 🇪🇹 [am](../../../am/docs/compression/CONTEXT_EDITING.md) · 🇸🇦 [ar](../../../ar/docs/compression/CONTEXT_EDITING.md) · 🇦🇿 [az](../../../az/docs/compression/CONTEXT_EDITING.md) · 🇧🇬 [bg](../../../bg/docs/compression/CONTEXT_EDITING.md) · 🇧🇩 [bn](../../../bn/docs/compression/CONTEXT_EDITING.md) · 🇨🇿 [cs](../../../cs/docs/compression/CONTEXT_EDITING.md) · 🇩🇰 [da](../../../da/docs/compression/CONTEXT_EDITING.md) · 🇩🇪 [de](../../../de/docs/compression/CONTEXT_EDITING.md) · 🇬🇷 [el](../../../el/docs/compression/CONTEXT_EDITING.md) · 🇪🇸 [es](../../../es/docs/compression/CONTEXT_EDITING.md) · 🇮🇷 [fa](../../../fa/docs/compression/CONTEXT_EDITING.md) · 🇫🇮 [fi](../../../fi/docs/compression/CONTEXT_EDITING.md) · 🇫🇷 [fr](../../../fr/docs/compression/CONTEXT_EDITING.md) · 🇮🇪 [ga](../../../ga/docs/compression/CONTEXT_EDITING.md) · 🇮🇳 [gu](../../../gu/docs/compression/CONTEXT_EDITING.md) · 🇳🇬 [ha](../../../ha/docs/compression/CONTEXT_EDITING.md) · 🇮🇱 [he](../../../he/docs/compression/CONTEXT_EDITING.md) · 🇮🇳 [hi](../../../hi/docs/compression/CONTEXT_EDITING.md) · 🇭🇷 [hr](../../../hr/docs/compression/CONTEXT_EDITING.md) · 🇭🇺 [hu](../../../hu/docs/compression/CONTEXT_EDITING.md) · 🇦🇲 [hy](../../../hy/docs/compression/CONTEXT_EDITING.md) · 🇮🇩 [id](../../../id/docs/compression/CONTEXT_EDITING.md) · 🇳🇬 [ig](../../../ig/docs/compression/CONTEXT_EDITING.md) · 🇮🇹 [it](../../../it/docs/compression/CONTEXT_EDITING.md) · 🇯🇵 [ja](../../../ja/docs/compression/CONTEXT_EDITING.md) · 🇬🇪 [ka](../../../ka/docs/compression/CONTEXT_EDITING.md) · 🇰🇭 [km](../../../km/docs/compression/CONTEXT_EDITING.md) · 🇮🇳 [kn](../../../kn/docs/compression/CONTEXT_EDITING.md) · 🇰🇷 [ko](../../../ko/docs/compression/CONTEXT_EDITING.md) · 🇱🇹 [lt](../../../lt/docs/compression/CONTEXT_EDITING.md) · 🇱🇻 [lv](../../../lv/docs/compression/CONTEXT_EDITING.md) · 🇮🇳 [ml](../../../ml/docs/compression/CONTEXT_EDITING.md) · 🇮🇳 [mr](../../../mr/docs/compression/CONTEXT_EDITING.md) · 🇲🇾 [ms](../../../ms/docs/compression/CONTEXT_EDITING.md) · 🇲🇹 [mt](../../../mt/docs/compression/CONTEXT_EDITING.md) · 🇲🇲 [my](../../../my/docs/compression/CONTEXT_EDITING.md) · 🇳🇵 [ne](../../../ne/docs/compression/CONTEXT_EDITING.md) · 🇳🇱 [nl](../../../nl/docs/compression/CONTEXT_EDITING.md) · 🇳🇴 [no](../../../no/docs/compression/CONTEXT_EDITING.md) · 🇮🇳 [or](../../../or/docs/compression/CONTEXT_EDITING.md) · 🇮🇳 [pa](../../../pa/docs/compression/CONTEXT_EDITING.md) · 🇵🇭 [phi](../../../phi/docs/compression/CONTEXT_EDITING.md) · 🇵🇱 [pl](../../../pl/docs/compression/CONTEXT_EDITING.md) · 🇵🇹 [pt](../../../pt/docs/compression/CONTEXT_EDITING.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/compression/CONTEXT_EDITING.md) · 🇷🇴 [ro](../../../ro/docs/compression/CONTEXT_EDITING.md) · 🇷🇺 [ru](../../../ru/docs/compression/CONTEXT_EDITING.md) · 🇱🇰 [si](../../../si/docs/compression/CONTEXT_EDITING.md) · 🇸🇰 [sk](../../../sk/docs/compression/CONTEXT_EDITING.md) · 🇸🇮 [sl](../../../sl/docs/compression/CONTEXT_EDITING.md) · 🇷🇸 [sr](../../../sr/docs/compression/CONTEXT_EDITING.md) · 🇸🇪 [sv](../../../sv/docs/compression/CONTEXT_EDITING.md) · 🇰🇪 [sw](../../../sw/docs/compression/CONTEXT_EDITING.md) · 🇮🇳 [ta](../../../ta/docs/compression/CONTEXT_EDITING.md) · 🇮🇳 [te](../../../te/docs/compression/CONTEXT_EDITING.md) · 🇹🇭 [th](../../../th/docs/compression/CONTEXT_EDITING.md) · 🇹🇷 [tr](../../../tr/docs/compression/CONTEXT_EDITING.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/compression/CONTEXT_EDITING.md) · 🇵🇰 [ur](../../../ur/docs/compression/CONTEXT_EDITING.md) · 🇺🇿 [uz](../../../uz/docs/compression/CONTEXT_EDITING.md) · 🇻🇳 [vi](../../../vi/docs/compression/CONTEXT_EDITING.md) · 🇳🇬 [yo](../../../yo/docs/compression/CONTEXT_EDITING.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/compression/CONTEXT_EDITING.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/compression/CONTEXT_EDITING.md)

---

Delegeeritud **konteksti redigeerimine** on ainult Claude'ile mõeldud kontekstihalduse funktsioon. Erinevalt OmniRoute'i kohalikest tihendusmootoritest (Caveman, RTK, LLMLingua, virnastatud konveierid) — mis kirjutavad päringu keha ümber _enne_, kui see puhverserverist väljub — palub konteksti redigeerimine **teenusepakkujal** eemaldada oma aktiivsest kontekstiaknast aegunud tööriistakasutuse / tööriistatulemuse plokid. OmniRoute lisab ainult keha parameetri (`context_management.edits[]`); tegeliku eemaldamise teeb Claude oma tokenisaatori alusel.

Olemuselt on see delegeeritud võimekus: teised teenusepakkujad lükkavad selle parameetri tagasi, mistõttu piirab OmniRoute selle kasutamise rangelt Claude'i ja Claude Code'iga ühilduvate vahendajatega.

Tõeallikas: `open-sse/config/contextEditing.ts` (strateegia ID-d, keha täiendamine, telemeetria eraldamine), `open-sse/executors/base.ts` (täiendamise kontroll + 400-tagavaramehhanism) ja `open-sse/services/compression/types.ts` (konfiguratsiooni struktuur + vaikeväärtus).

## Mida `clear_tool_uses` teeb

OmniRoute lisab väljamineva Anthropic Messagesi päringu kehasse ühe redigeerimiskirje:

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

- `type: "clear_tool_uses_20250919"` — kuupäevaga Anthropicu strateegia ID (`CLEAR_TOOL_USES_STRATEGY`).
- `trigger.value: 100000` — kui päringu sisendtokenite arv ületab selle lävendi, hakkab Claude vanu tööriistakasutuse/tulemuse paare eemaldama (`CONTEXT_EDITING_DEFAULT_TRIGGER_TOKENS`, Anthropicu vaikeväärtus).
- `keep.value: 3` — N kõige hiljutisemat tööriistakasutuse/tulemuse paari jäetakse puutumata (`CONTEXT_EDITING_DEFAULT_KEEP_TOOL_USES`).

Beetafunktsioonist antakse teada päise `anthropic-beta: context-management-2025-06-27` kaudu, mille OmniRoute juba Claude'i päringutele lisab.

Täiendamise teeb `applyContextEditingToBody()` ja see on **idempotentne**: kui kehas on `clear_tool_uses` redigeerimiskirje juba olemas (lisatud eelmise kutsega või kliendi poolt), jäetakse keha muutmata. Kui olemas on ka `clear_thinking_20251015` redigeerimiskirje, sordib OmniRoute stabiilselt `clear_thinking` redigeerimiskirje ettepoole, sest Anthropic nõuab, et `clear_thinking` eelneks massiivis `edits[]` kirjele `clear_tool_uses`.

## Kombinatsioonipõhine lubamislüliti

Konteksti redigeerimine on **vaikimisi välja lülitatud** ja tuleb eraldi lubada. Lüliti on tihenduskonfiguratsioonis sisalduv üksainus kahendväärtus:

- Seadistuse võti: `contextEditing.enabled` (camelCase — **mitte** `context_editing` / `context-editing`).
- Tüüp: `ContextEditingConfig { enabled: boolean }` failis `open-sse/services/compression/types.ts`.
- Vaikeväärtus: `DEFAULT_CONTEXT_EDITING_CONFIG = { enabled: false }`.
- Zodi skeem: `contextEditingConfigSchema` failis `src/shared/validation/compressionConfigSchemas.ts`.
- Salvestamine: säilitatakse koos ülejäänud tihendusseadetega (normaliseeritakse failis `src/lib/db/compression.ts`).

Juhtpaneelil asub lüliti tihenduskeskuses (`src/app/(dashboard)/dashboard/context/combos/CompressionHub.tsx`) ja kirjutab `{ contextEditing: { enabled: … } }` funktsiooni `saveSettings()` kaudu tagasi. Kuna see kuulub tihendusseadete objekti, kombineerub see kombinatsioonipõhise tihendusprofiiliga ega ole täielikult iseseisev funktsioon — konfiguratsioon sisaldab ainult sisse-/väljalülitamise lippu; kõik lävendid (`trigger`, `keep`) on eespool dokumenteeritud konstandid.

## Ainult Claude'ile rakenduv piirang

Lisamine toimub ainult ehtsa Claude'i või Claude-Code'iga ühilduvate releede puhul. Piirang failis
`open-sse/executors/base.ts` on järgmine:

```ts
if (
  (this.provider === "claude" || isClaudeCodeCompatible(this.provider)) &&
  contextEditing?.enabled &&
  !contextEditingDisabled
) {
  applyContextEditingToBody(transformedBody, { enabled: true });
}
```

- `this.provider === "claude"` — ehtne Anthropicu võti/OAuth.
- `isClaudeCodeCompatible(this.provider)` — releed, mille pakkuja ID algab prefiksiga
  `anthropic-compatible-cc-` (need reklaamivad Claude Code'iga ühilduvust, seega on need releed, mis
  kõige tõenäolisemalt beetafunktsiooni toetavad). Vt `open-sse/services/provider.ts`.

Tahtlikult **välistatud**:

- `claude-web` — brauserirelee, mille päringu kuju on `create_conversation_params` ja mis ei näe
  kunagi parameetrit `context_management`.
- Üldised `anthropic-compatible-*` releed (ilma prefiksita `-cc-`) — kolmandate osapoolte
  lõpp-punktid, mille beetafunktsiooni tugi pole kindel.

Muud kui Claude'i pakkujad ei saa kunagi parameetrit `context_management`, isegi kui lüliti on sisse lülitatud.

## 400-varuvariant / releede katvus

Claude'iga ühilduv relee võib beetafunktsiooni reklaamida, kuid lükata parameetri
`context_management` siiski HTTP 400 vastusega tagasi. Päringu nurjumise asemel sujuvaks
taandumiseks eemaldab täitur parameetri ja proovib sama URL-i **ühe korra** uuesti:

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

Käitumine:

1. Käivitub ainult `400` korral, kui konteksti redigeerimine on lubatud ja päringukeha sisaldab
   tegelikult välja `context_management`.
2. 400-vastuse keha loetakse meetodiga `clone()`, et algne vastus jääks mittevastava juhtumi jaoks
   puutumata.
3. Veatekst peab vastama avaldisele `/context[_-]management|context editing/i` — mitteseotud 400
   (nt `max_tokens must be >= 1`) **ei** käivita varuvarianti; algne viga edastatakse edasi.
4. Vaste korral määratakse `contextEditingDisabled = true` (mis takistab uuesti lisamist, kui uue
   korduskatse või varu-URL-i jaoks koostatakse hiljem värske `transformedBody`), eemaldatakse
   `context_management`, allkirjastatakse Claude'i / Claude-Code'iga ühilduvate releede puhul keha
   uuesti (`signRequestBody`) ning proovitakse sama URL-i ühe korra uuesti.

Ehtsa Claude'i puhul sisaldub beetafunktsioon muutujas `ANTHROPIC_BETA_BASE` ja seda varuteed ei kasutata.

## `applied_edits` telemeetria

Pärast Claude'i vastust salvestab OmniRoute, kui palju konteksti pakkuja tegelikult eemaldas. Seda
**ei** voogedastata — see eraldatakse võimaluste piires mittevoogedastatava vastuse kehast ega mõjuta
kunagi vastust (telemeetriavead jäetakse tähelepanuta).

- Eraldamine: `extractContextEditingTelemetry(responseBody)` failis
  `open-sse/config/contextEditing.ts`. See otsib välja `applied_edits` kolmest asukohast (vastuse
  kuju erinevuste suhtes kaitsvaks käsitluseks):
  - `context_management.applied_edits`
  - `usage.context_management.applied_edits`
  - `usage.applied_edits`
- Iga kirje puhul loetavad väljad: `cleared_input_tokens` ja `cleared_tool_uses`
  (snake_case, Anthropicu algupärane vorm), varuvariantidena camelCase-kujul
  `clearedInputTokens` / `clearedToolUses`.
- Tagastab `null`, kui massiivi `applied_edits` ei leita või midagi tegelikult ei eemaldatud.

Kinnituse kuju on `ContextEditingTelemetry { editCount, clearedInputTokens, clearedToolUses }`.
Salvestamine toimub failis `open-sse/handlers/chatCore.ts` (piiratud tingimusega
`provider === "claude"`) funktsiooni `recordContextEditingTelemetry()` kaudu
(`src/lib/db/compressionAnalytics.ts`), mis kirjutab tihendusanalüütika rea järgmiste märgenditega:

- `mode: "context-editing"`
- `engine: "context-editing"`
- `tokens_saved` / `original_tokens` = eemaldatud sisendtokenite arv
- `request_id`, millele lisatakse järelliide `::context-editing`

Seega kuvatakse delegeeritud eemaldamine tihendusanalüütikas koos kohalike mootoritega mootori
`context-editing` sildi all ning see on eristatav RTK/Caveman/LLMLingua säästudest.

## Seos kohalike tihendusmootoritega

| Aspekt                  | Kohalikud mootorid (Caveman / RTK / LLMLingua / stacked) | Delegeeritud konteksti redigeerimine                         |
| ----------------------- | -------------------------------------------------------- | ------------------------------------------------------------ |
| Kus see töötab          | OmniRoute'is enne, kui päring puhverserverist väljub     | Teenusepakkuja juures (Claude), serveripoolel                |
| Mida see redigeerib     | Viiba / konteksti / tööriista tulemuse tekst             | Vanad tööriistakasutuse / tööriista tulemuse plokid          |
| Teenusepakkujate ulatus | Kõik teenusepakkujad                                     | Ainult `claude` + `anthropic-compatible-cc-*`                |
| Lüliti                  | Tihendusrežiimi sätted                                   | `contextEditing.enabled`                                     |
| Tõrkerežiim             | Tõrke korral jätkatakse algtekstiga                      | 400-varulahendus: eemalda parameeter, proovi üks kord uuesti |
| Säästu telemeetria      | `engine: <engine id>`                                    | `engine: "context-editing"`                                  |

Need kaks täiendavad teineteist: kohalikud mootorid tihendavad baite, mida OmniRoute saadab; konteksti redigeerimine võimaldab
Claude'il voorude jooksul jooksvat konteksti kärpida. Neid saab koos lubada.

## Vaata ka

- [COMPRESSION_ENGINES.md](./COMPRESSION_ENGINES.md) — mootorite register ja kohalikud tihendusmootorid
- [RTK_COMPRESSION.md](./RTK_COMPRESSION.md) — käskude/tööriistaväljundi tihendamine
- [../frameworks/MCP-SERVER.md](../frameworks/MCP-SERVER.md) — MCP kirjelduste tihendamine ja
  tööriistade arvu vähendamine
- Lähtekood: `open-sse/config/contextEditing.ts`, `open-sse/executors/base.ts`,
  `open-sse/services/compression/types.ts`, `src/lib/db/compressionAnalytics.ts`
