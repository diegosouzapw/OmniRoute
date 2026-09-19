# Thinking Budget (Italiano)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/THINKING_BUDGET.md) · 🇪🇹 [am](../../../am/docs/guides/THINKING_BUDGET.md) · 🇸🇦 [ar](../../../ar/docs/guides/THINKING_BUDGET.md) · 🇦🇿 [az](../../../az/docs/guides/THINKING_BUDGET.md) · 🇧🇬 [bg](../../../bg/docs/guides/THINKING_BUDGET.md) · 🇧🇩 [bn](../../../bn/docs/guides/THINKING_BUDGET.md) · 🇧🇦 [bs](../../../bs/docs/guides/THINKING_BUDGET.md) · 🇨🇿 [cs](../../../cs/docs/guides/THINKING_BUDGET.md) · 🇩🇰 [da](../../../da/docs/guides/THINKING_BUDGET.md) · 🇩🇪 [de](../../../de/docs/guides/THINKING_BUDGET.md) · 🇬🇷 [el](../../../el/docs/guides/THINKING_BUDGET.md) · 🇪🇸 [es](../../../es/docs/guides/THINKING_BUDGET.md) · 🇪🇪 [et](../../../et/docs/guides/THINKING_BUDGET.md) · 🇮🇷 [fa](../../../fa/docs/guides/THINKING_BUDGET.md) · 🇫🇮 [fi](../../../fi/docs/guides/THINKING_BUDGET.md) · 🇫🇷 [fr](../../../fr/docs/guides/THINKING_BUDGET.md) · 🇮🇪 [ga](../../../ga/docs/guides/THINKING_BUDGET.md) · 🇮🇳 [gu](../../../gu/docs/guides/THINKING_BUDGET.md) · 🇳🇬 [ha](../../../ha/docs/guides/THINKING_BUDGET.md) · 🇮🇱 [he](../../../he/docs/guides/THINKING_BUDGET.md) · 🇮🇳 [hi](../../../hi/docs/guides/THINKING_BUDGET.md) · 🇭🇷 [hr](../../../hr/docs/guides/THINKING_BUDGET.md) · 🇭🇺 [hu](../../../hu/docs/guides/THINKING_BUDGET.md) · 🇦🇲 [hy](../../../hy/docs/guides/THINKING_BUDGET.md) · 🇮🇩 [id](../../../id/docs/guides/THINKING_BUDGET.md) · 🇳🇬 [ig](../../../ig/docs/guides/THINKING_BUDGET.md) · 🇯🇵 [ja](../../../ja/docs/guides/THINKING_BUDGET.md) · 🇬🇪 [ka](../../../ka/docs/guides/THINKING_BUDGET.md) · 🇰🇭 [km](../../../km/docs/guides/THINKING_BUDGET.md) · 🇮🇳 [kn](../../../kn/docs/guides/THINKING_BUDGET.md) · 🇰🇷 [ko](../../../ko/docs/guides/THINKING_BUDGET.md) · 🇱🇹 [lt](../../../lt/docs/guides/THINKING_BUDGET.md) · 🇱🇻 [lv](../../../lv/docs/guides/THINKING_BUDGET.md) · 🇮🇳 [ml](../../../ml/docs/guides/THINKING_BUDGET.md) · 🇮🇳 [mr](../../../mr/docs/guides/THINKING_BUDGET.md) · 🇲🇾 [ms](../../../ms/docs/guides/THINKING_BUDGET.md) · 🇲🇹 [mt](../../../mt/docs/guides/THINKING_BUDGET.md) · 🇲🇲 [my](../../../my/docs/guides/THINKING_BUDGET.md) · 🇳🇵 [ne](../../../ne/docs/guides/THINKING_BUDGET.md) · 🇳🇱 [nl](../../../nl/docs/guides/THINKING_BUDGET.md) · 🇳🇴 [no](../../../no/docs/guides/THINKING_BUDGET.md) · 🇮🇳 [or](../../../or/docs/guides/THINKING_BUDGET.md) · 🇮🇳 [pa](../../../pa/docs/guides/THINKING_BUDGET.md) · 🇵🇭 [phi](../../../phi/docs/guides/THINKING_BUDGET.md) · 🇵🇱 [pl](../../../pl/docs/guides/THINKING_BUDGET.md) · 🇵🇹 [pt](../../../pt/docs/guides/THINKING_BUDGET.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/THINKING_BUDGET.md) · 🇷🇴 [ro](../../../ro/docs/guides/THINKING_BUDGET.md) · 🇷🇺 [ru](../../../ru/docs/guides/THINKING_BUDGET.md) · 🇱🇰 [si](../../../si/docs/guides/THINKING_BUDGET.md) · 🇸🇰 [sk](../../../sk/docs/guides/THINKING_BUDGET.md) · 🇸🇮 [sl](../../../sl/docs/guides/THINKING_BUDGET.md) · 🇷🇸 [sr](../../../sr/docs/guides/THINKING_BUDGET.md) · 🇸🇪 [sv](../../../sv/docs/guides/THINKING_BUDGET.md) · 🇰🇪 [sw](../../../sw/docs/guides/THINKING_BUDGET.md) · 🇮🇳 [ta](../../../ta/docs/guides/THINKING_BUDGET.md) · 🇮🇳 [te](../../../te/docs/guides/THINKING_BUDGET.md) · 🇹🇭 [th](../../../th/docs/guides/THINKING_BUDGET.md) · 🇹🇷 [tr](../../../tr/docs/guides/THINKING_BUDGET.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/THINKING_BUDGET.md) · 🇵🇰 [ur](../../../ur/docs/guides/THINKING_BUDGET.md) · 🇺🇿 [uz](../../../uz/docs/guides/THINKING_BUDGET.md) · 🇻🇳 [vi](../../../vi/docs/guides/THINKING_BUDGET.md) · 🇳🇬 [yo](../../../yo/docs/guides/THINKING_BUDGET.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/THINKING_BUDGET.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/THINKING_BUDGET.md)

---

> **Dashboard:** Impostazioni → **IA** → Budget di ragionamento  
> **API:** `GET` / `PUT` `/api/settings/thinking-budget`  
> **Sorgente:** `open-sse/services/thinkingBudget.ts`

Il budget di ragionamento controlla se OmniRoute **riscrive i parametri di pensiero/ragionamento del client** durante l'inoltro ai provider. **Non** attiva né disattiva la compressione, il routing o la cache dei prompt.

## Modalità

| Modalità                        | Cosa fa OmniRoute                                                                                                                     | Quando utilizzarla                                                                                                                                                                                                             |
| ------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **`passthrough`** (predefinita) | Lascia invariati i campi del client (`reasoning`, `reasoning_effort`, `thinking` di Claude, `thinking_config` di Gemini, ecc.).       | **Codex / Desktop / qualsiasi client che debba controllare l'intensità + i riepiloghi del ragionamento.** Necessaria per visualizzare i pannelli di ragionamento quando il client richiede `reasoning.summary`.                |
| **`auto`**                      | **Rimuove tutti** i campi di pensiero/ragionamento dal corpo della richiesta prima dell'inoltro al servizio upstream.                 | Solo quando si desidera deliberatamente che sia il **provider** a determinare i valori predefiniti e **non** è necessario che il client controlli il ragionamento. **Non** significa “mostra automaticamente il ragionamento”. |
| **`custom`**                    | Sovrascrive ogni richiesta con un budget fisso di token di ragionamento.                                                              | Limite rigido ai token di ragionamento per tutto il traffico.                                                                                                                                                                  |
| **`adaptive`**                  | Ridimensiona il budget a partire da un'intensità di base, utilizzando il numero di messaggi, gli strumenti e la lunghezza del prompt. | Controllo flessibile dei token senza ignorare completamente le indicazioni del client.                                                                                                                                         |

### Cosa rimuove `auto`

Quando la modalità è `auto`, `stripThinkingConfig()` elimina, tra gli altri:

- OpenAI / Responses: `reasoning`, `reasoning_effort`
- Claude: `thinking` e, quando presente, `output_config.effort`
- Gemini: `generationConfig.thinking_config` / `thinkingConfig`

Se un client (ad es. Codex Desktop) ha inviato `reasoning: { effort: "ultra", summary: "detailed" }`, **`auto` elimina quell'oggetto**. Il servizio upstream potrebbe comunque addebitare alcuni token di ragionamento, ma spesso restituisce elementi di ragionamento **vuoti o solo crittografati**; di conseguenza, l'interfaccia utente non mostra alcun flusso di ragionamento utile.

## Cosa **non è**

| Funzionalità                                           | Relazione                                                                                                                                 |
| ------------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------- |
| **Compressione** (Caveman, RTK, stacked, …)            | Pipeline separata. Funziona con qualsiasi modalità del budget di ragionamento.                                                            |
| **Cache dei prompt / semantica**                       | Separata. Non è influenzata dalla modalità del budget di ragionamento.                                                                    |
| **Routing combinato / fallback**                       | Separati. Non sono influenzati.                                                                                                           |
| **Limiti di token / budget di costo delle chiavi API** | Separati. Non sono influenzati.                                                                                                           |
| **Cache di riproduzione del ragionamento**             | Reinserimento multi-turno per provider rigorosi (DeepSeek, Kimi, Qwen-thinking, …). Non equivale a “mostrare il ragionamento” in Desktop. |
| **Decrittografia di `encrypted_content`**              | **Impossibile.** I blob di ragionamento privati di OpenAI/Codex sono opachi. OmniRoute non li decrittografa mai (#7095 / #7176 / #7304).  |

## Pensiero visibile (client Codex / Responses)

Affinché un client mostri il testo del ragionamento, sono necessari **tutti** i seguenti elementi:

1. Modalità Thinking Budget = **`passthrough`** (oppure custom/adaptive, purché mantenga le richieste di riepilogo sufficientemente intatte per il percorso utilizzato).
2. Il client richiede un riepilogo, ad es. Codex `model_reasoning_summary = "detailed"` / `auto` (non `none`).
3. Il servizio upstream trasmette effettivamente `response.reasoning_summary_text.*` (oppure un `reasoning.summary` non vuoto nell'elemento).

Se ottieni soltanto “ragionamento privato crittografato”, significa che:

- la modalità era **`auto`** (la richiesta del client è stata rimossa), oppure
- il servizio upstream ha restituito `encrypted_content` senza il testo del riepilogo (limitazione del provider; OmniRoute può mostrare soltanto un segnaposto, non il testo in chiaro).

## Esempi API

```bash
# Lettura
curl -sS https://localhost:20128/api/settings/thinking-budget \
  -H "Authorization: Bearer $OMNIROUTE_TOKEN"

# Impostazione consigliata per la visibilità del ragionamento in Codex / Desktop
curl -sS -X PUT https://localhost:20128/api/settings/thinking-budget \
  -H "Authorization: Bearer $OMNIROUTE_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"mode":"passthrough","customBudget":10240,"effortLevel":"medium"}'
```

Schema (`updateThinkingBudgetSchema`): `mode` ∈ `passthrough|auto|custom|adaptive`; `customBudget`, `effortLevel`, `baseBudget`, `complexityMultiplier` facoltativi.

### Persistenza / riavvio

Il valore viene memorizzato nella chiave delle impostazioni `thinkingBudget` e caricato all'avvio del processo (`hydrateThinkingBudgetConfig`). Dopo una modifica tramite il DB o alcuni percorsi non API, **riavvia il processo OmniRoute** affinché il singleton in memoria corrisponda ai dati su disco.

## Checklist per l'operatore

- [ ] Utenti Codex / Desktop: modalità = **passthrough**
- [ ] Mantieni la compressione abilitata se vuoi risparmiare token sui **messaggi**, non rimuovendo il ragionamento
- [ ] Non aspettarti che `auto` “mostri più ragionamento”
- [ ] I riepiloghi disponibili soltanto in forma crittografata sono un comportamento del **provider**; passthrough non può decrittografarli

## Documentazione correlata

- [REASONING_REPLAY.md](../routing/REASONING_REPLAY.md) — cache `reasoning_content` multi-turno
- [USER_GUIDE.md](./USER_GUIDE.md) — schede della dashboard delle impostazioni
- [API_REFERENCE.md](../reference/API_REFERENCE.md) — endpoint delle impostazioni
