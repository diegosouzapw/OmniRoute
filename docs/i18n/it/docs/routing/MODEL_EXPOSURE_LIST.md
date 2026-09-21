# Model Exposure Allow/Deny List (Italiano)

🌐 **Languages:** 🇺🇸 [English](../../../../routing/MODEL_EXPOSURE_LIST.md) · 🇪🇹 [am](../../../am/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇸🇦 [ar](../../../ar/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇦🇿 [az](../../../az/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇧🇬 [bg](../../../bg/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇧🇩 [bn](../../../bn/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇨🇿 [cs](../../../cs/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇩🇰 [da](../../../da/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇩🇪 [de](../../../de/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇬🇷 [el](../../../el/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇪🇸 [es](../../../es/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇪🇪 [et](../../../et/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇮🇷 [fa](../../../fa/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇫🇮 [fi](../../../fi/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇫🇷 [fr](../../../fr/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇮🇪 [ga](../../../ga/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇮🇳 [gu](../../../gu/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇳🇬 [ha](../../../ha/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇮🇱 [he](../../../he/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇮🇳 [hi](../../../hi/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇭🇷 [hr](../../../hr/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇭🇺 [hu](../../../hu/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇦🇲 [hy](../../../hy/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇮🇩 [id](../../../id/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇳🇬 [ig](../../../ig/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇯🇵 [ja](../../../ja/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇬🇪 [ka](../../../ka/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇰🇭 [km](../../../km/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇮🇳 [kn](../../../kn/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇰🇷 [ko](../../../ko/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇱🇹 [lt](../../../lt/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇱🇻 [lv](../../../lv/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇮🇳 [ml](../../../ml/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇮🇳 [mr](../../../mr/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇲🇾 [ms](../../../ms/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇲🇹 [mt](../../../mt/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇲🇲 [my](../../../my/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇳🇵 [ne](../../../ne/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇳🇱 [nl](../../../nl/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇳🇴 [no](../../../no/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇮🇳 [or](../../../or/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇮🇳 [pa](../../../pa/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇵🇭 [phi](../../../phi/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇵🇱 [pl](../../../pl/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇵🇹 [pt](../../../pt/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇷🇴 [ro](../../../ro/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇷🇺 [ru](../../../ru/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇱🇰 [si](../../../si/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇸🇰 [sk](../../../sk/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇸🇮 [sl](../../../sl/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇷🇸 [sr](../../../sr/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇸🇪 [sv](../../../sv/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇰🇪 [sw](../../../sw/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇮🇳 [ta](../../../ta/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇮🇳 [te](../../../te/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇹🇭 [th](../../../th/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇹🇷 [tr](../../../tr/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇵🇰 [ur](../../../ur/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇺🇿 [uz](../../../uz/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇻🇳 [vi](../../../vi/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇳🇬 [yo](../../../yo/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/routing/MODEL_EXPOSURE_LIST.md)

---

> Funzionalità opt-in, disattivata per impostazione predefinita (se `modelVisibilityAllowlist` e
> `modelVisibilityDenylist` sono entrambe vuote, il catalogo `/v1/models` E ogni pool di candidati
> `auto/*` rimangono identici byte per byte). Un'impostazione analoga a
> `hidePaidModels`/`hideAutoCombos` (`src/lib/db/settings.ts`) per gli operatori che desiderano un
> elenco curato di modelli per ragioni che non hanno nulla a che fare con il costo.

## Perché esiste

`hidePaidModels` risponde alla domanda "questo modello è gratuito?" e `hideAutoCombos` risponde
a "gli id virtuali `auto/*` devono essere pubblicizzati?" — nessuna delle due consente a un
operatore di selezionare un sottoinsieme arbitrario di modelli (ad es. presentando esattamente
i modelli che uno specifico client Claude Code / OpenCode dovrebbe vedere, indipendentemente
dal prezzo). #11481 aggiunge questa possibilità tramite due impostazioni indipendenti e opt-in
di tipo array di stringhe.

## Impostazioni

| Chiave                     | Tipo       | Valore predefinito | Significato                                                                            |
| -------------------------- | ---------- | ------------------ | -------------------------------------------------------------------------------------- |
| `modelVisibilityDenylist`  | `string[]` | `[]`               | Le voci che corrispondono a un candidato lo nascondono dal catalogo/pool di candidati. |
| `modelVisibilityAllowlist` | `string[]` | `[]`               | Quando non è vuota, rimangono esposte SOLO le voci che corrispondono a un candidato.   |

Entrambe accettano fino a 500 voci, ciascuna composta da un massimo di 200 caratteri
(convalidate tramite Zod in `src/shared/validation/settingsSchemas.ts`). Una voce può essere:

- un id esatto del catalogo — `"gpt-4o"` (id del modello senza prefisso) oppure
  `"openai/gpt-4o"` (con prefisso del provider), oppure
- un pattern glob che utilizza `*`/`?` — ad es. `"openai/gpt-4*"` o `"anthropic/*"` — risolto
  tramite lo stesso matcher condiviso `globToRegex()` (`src/shared/utils/globPattern.ts`) già
  utilizzato dalle mappature delle combinazioni per modello di `ModelRoutingSection` e da
  `freeModels.ts::matchesOnlyPaidModels`.

Precedenza: la denylist viene controllata per prima (una voce negata è sempre nascosta, anche
se corrisponde anche alla allowlist); quando la allowlist non è vuota, sopravvivono solo le
voci che corrispondono a essa.

## Due punti di controllo, non uno

La lezione tratta da #6512 (un filtro del catalogo basato esclusivamente su `hidePaidModels`
consentiva comunque ad `auto/*` di instradare verso un modello a pagamento, poiché il pool di
candidati della combinazione veniva creato indipendentemente) si applica allo stesso modo anche
qui. Il predicato di corrispondenza `isModelExposureAllowed()`
(`src/shared/utils/modelExposureList.ts`) viene chiamato da ENTRAMBI:

- `src/app/api/v1/models/catalog.ts` — l'elenco `/v1/models` stesso, negli stessi 5 punti di
  controllo per sorgente già gestiti da `shouldHidePaid()` (`PROVIDER_MODELS` statici, righe
  sincronizzate dei provider, righe personalizzate, righe basate su alias, righe di fallback
  gestite).
- `open-sse/services/autoCombo/modelExposureFilter.ts::filterModelExposureCandidates()` —
  chiamato da `virtualFactory.ts::buildPreparedPool`, immediatamente dopo la chiamata
  equivalente a `filterPaidOnlyCandidates()`, affinché un modello negato non possa mai essere
  selezionato neppure in un pool di candidati `auto/*`.

## Cosa NON viene filtrato

Rispecchia il comportamento esistente di `hideAutoCombos`: un id modello inviato
**esplicitamente** (non tramite `auto/*` e non individuato attraverso l'elenco del catalogo) non
viene mai bloccato in fase di dispatch — vengono filtrate solo la pubblicizzazione e
l'appartenenza al pool di candidati. Ciò è indipendente da `hidePaidModels`; un operatore può
desiderare un insieme curato per ragioni che non hanno nulla a che fare con il costo, pertanto
entrambe le impostazioni si combinano come filtri indipendenti uniti mediante AND, analogamente
alla composizione multiflag esistente in `catalog.ts`.

L'esportazione delle impostazioni (`GET /api/settings/export-json`) include entrambi gli array
testualmente, come qualsiasi altro campo delle impostazioni — a differenza del filtro di
esportazione dei passaggi delle combinazioni di `hidePaidModels`, qui non vi è alcun rischio di
ri-idratazione: un id negato incorporato in un passaggio di una combinazione esportata
rappresenta una scelta esplicita di instradamento dell'operatore, non qualcosa che il confine di
esportazione debba rimuovere.
