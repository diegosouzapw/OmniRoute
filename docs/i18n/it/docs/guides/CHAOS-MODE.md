# Chaos Mode (Italiano)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/CHAOS-MODE.md) · 🇪🇹 [am](../../../am/docs/guides/CHAOS-MODE.md) · 🇸🇦 [ar](../../../ar/docs/guides/CHAOS-MODE.md) · 🇦🇿 [az](../../../az/docs/guides/CHAOS-MODE.md) · 🇧🇬 [bg](../../../bg/docs/guides/CHAOS-MODE.md) · 🇧🇩 [bn](../../../bn/docs/guides/CHAOS-MODE.md) · 🇧🇦 [bs](../../../bs/docs/guides/CHAOS-MODE.md) · 🇨🇿 [cs](../../../cs/docs/guides/CHAOS-MODE.md) · 🇩🇰 [da](../../../da/docs/guides/CHAOS-MODE.md) · 🇩🇪 [de](../../../de/docs/guides/CHAOS-MODE.md) · 🇬🇷 [el](../../../el/docs/guides/CHAOS-MODE.md) · 🇪🇸 [es](../../../es/docs/guides/CHAOS-MODE.md) · 🇪🇪 [et](../../../et/docs/guides/CHAOS-MODE.md) · 🇮🇷 [fa](../../../fa/docs/guides/CHAOS-MODE.md) · 🇫🇮 [fi](../../../fi/docs/guides/CHAOS-MODE.md) · 🇫🇷 [fr](../../../fr/docs/guides/CHAOS-MODE.md) · 🇮🇪 [ga](../../../ga/docs/guides/CHAOS-MODE.md) · 🇮🇳 [gu](../../../gu/docs/guides/CHAOS-MODE.md) · 🇳🇬 [ha](../../../ha/docs/guides/CHAOS-MODE.md) · 🇮🇱 [he](../../../he/docs/guides/CHAOS-MODE.md) · 🇮🇳 [hi](../../../hi/docs/guides/CHAOS-MODE.md) · 🇭🇷 [hr](../../../hr/docs/guides/CHAOS-MODE.md) · 🇭🇺 [hu](../../../hu/docs/guides/CHAOS-MODE.md) · 🇦🇲 [hy](../../../hy/docs/guides/CHAOS-MODE.md) · 🇮🇩 [id](../../../id/docs/guides/CHAOS-MODE.md) · 🇳🇬 [ig](../../../ig/docs/guides/CHAOS-MODE.md) · 🇯🇵 [ja](../../../ja/docs/guides/CHAOS-MODE.md) · 🇬🇪 [ka](../../../ka/docs/guides/CHAOS-MODE.md) · 🇰🇭 [km](../../../km/docs/guides/CHAOS-MODE.md) · 🇮🇳 [kn](../../../kn/docs/guides/CHAOS-MODE.md) · 🇰🇷 [ko](../../../ko/docs/guides/CHAOS-MODE.md) · 🇱🇹 [lt](../../../lt/docs/guides/CHAOS-MODE.md) · 🇱🇻 [lv](../../../lv/docs/guides/CHAOS-MODE.md) · 🇮🇳 [ml](../../../ml/docs/guides/CHAOS-MODE.md) · 🇮🇳 [mr](../../../mr/docs/guides/CHAOS-MODE.md) · 🇲🇾 [ms](../../../ms/docs/guides/CHAOS-MODE.md) · 🇲🇹 [mt](../../../mt/docs/guides/CHAOS-MODE.md) · 🇲🇲 [my](../../../my/docs/guides/CHAOS-MODE.md) · 🇳🇵 [ne](../../../ne/docs/guides/CHAOS-MODE.md) · 🇳🇱 [nl](../../../nl/docs/guides/CHAOS-MODE.md) · 🇳🇴 [no](../../../no/docs/guides/CHAOS-MODE.md) · 🇮🇳 [or](../../../or/docs/guides/CHAOS-MODE.md) · 🇮🇳 [pa](../../../pa/docs/guides/CHAOS-MODE.md) · 🇵🇭 [phi](../../../phi/docs/guides/CHAOS-MODE.md) · 🇵🇱 [pl](../../../pl/docs/guides/CHAOS-MODE.md) · 🇵🇹 [pt](../../../pt/docs/guides/CHAOS-MODE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/CHAOS-MODE.md) · 🇷🇴 [ro](../../../ro/docs/guides/CHAOS-MODE.md) · 🇷🇺 [ru](../../../ru/docs/guides/CHAOS-MODE.md) · 🇱🇰 [si](../../../si/docs/guides/CHAOS-MODE.md) · 🇸🇰 [sk](../../../sk/docs/guides/CHAOS-MODE.md) · 🇸🇮 [sl](../../../sl/docs/guides/CHAOS-MODE.md) · 🇷🇸 [sr](../../../sr/docs/guides/CHAOS-MODE.md) · 🇸🇪 [sv](../../../sv/docs/guides/CHAOS-MODE.md) · 🇰🇪 [sw](../../../sw/docs/guides/CHAOS-MODE.md) · 🇮🇳 [ta](../../../ta/docs/guides/CHAOS-MODE.md) · 🇮🇳 [te](../../../te/docs/guides/CHAOS-MODE.md) · 🇹🇭 [th](../../../th/docs/guides/CHAOS-MODE.md) · 🇹🇷 [tr](../../../tr/docs/guides/CHAOS-MODE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/CHAOS-MODE.md) · 🇵🇰 [ur](../../../ur/docs/guides/CHAOS-MODE.md) · 🇺🇿 [uz](../../../uz/docs/guides/CHAOS-MODE.md) · 🇻🇳 [vi](../../../vi/docs/guides/CHAOS-MODE.md) · 🇳🇬 [yo](../../../yo/docs/guides/CHAOS-MODE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/CHAOS-MODE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/CHAOS-MODE.md)

---

> **Dashboard:** **Modalità Chaos** (barra laterale) → `/dashboard/chaos`  
> **API:** `GET` / `PUT` `/api/chaos/config` · `POST /api/chaos/run` (sessione della dashboard) · `POST /api/skills/collect/chaos` (chiave API)  
> **Codice sorgente:** `src/lib/chaos/chaosExecutor.ts`, `src/lib/chaos/chaosConfig.ts`

La Modalità Chaos invia **un'attività contemporaneamente a più provider**: ogni provider partecipante
contribuisce con un'istanza di modello e tutte le risposte vengono mostrate affiancate (o concatenate). È
un'interfaccia di esecuzione multimodello, non una strategia di routing: il normale traffico
`/v1/chat/completions` non ne viene mai influenzato.

**Precisazione: esistono tre funzionalità diverse il cui nome contiene "chaos":**

| Elemento                   | Descrizione                                                                                                                               | Dove è documentato                           |
| -------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------- |
| **Modalità Chaos**         | La pagina della dashboard e l'API descritte qui: distribuisce un'attività a più provider (in parallelo o in collaborazione).              | Questa guida                                 |
| `auto/chaos`               | Un ID modello Auto-Combo con pesi di valutazione per l'iniezione di errori, destinato ai test di resilienza. Non richiede configurazione. | [AUTO-COMBO.md](../routing/AUTO-COMBO.md)    |
| Configurazione combo Chaos | Una combo persistente con `config.chaos.enabled` distribuisce le richieste a un gruppo con un modello giudice opzionale (solo API).       | `open-sse/services/autoCombo/chaosEngine.ts` |

## Configurazione

1. Apri **Dashboard → Modalità Chaos** (`/dashboard/chaos`).
2. **Attivala**: la Modalità Chaos è **disabilitata per impostazione predefinita** (`enabled: false` in
   `src/lib/chaos/chaosConfig.ts`). Quando è disabilitata, `POST /api/chaos/run` restituisce
   `400 — "Chaos Mode is not enabled. Enable it in Dashboard → Chaos Mode."`.
3. Scegli i partecipanti e i valori predefiniti (persistenti per ogni istanza tramite l'archivio delle impostazioni):

   | Campo               | Significato                                                                  | Valore predefinito / limiti                  |
   | ------------------- | ---------------------------------------------------------------------------- | -------------------------------------------- |
   | `enabled`           | Interruttore principale                                                      | `false`                                      |
   | `defaultMode`       | `parallel` o `collaborative` (vedi sotto)                                    | `parallel`                                   |
   | `providerOverrides` | Partecipazione per provider (`providerId`, `modelId` facoltativo, `enabled`) | vuoto = tutti i provider attivi, massimo 200 |
   | `systemPrompt`      | Sostituzione del prompt di sistema Chaos integrato                           | facoltativo, massimo 10 000 caratteri        |
   | `timeoutMs`         | Tempo massimo per ogni chiamata al modello                                   | `120000` (5 000–600 000)                     |
   | `maxTokens`         | `max_tokens` per ogni chiamata al modello                                    | `4096` (256–128 000)                         |

4. Esegui un **test direttamente dalla pagina**: il pannello dei risultati mostra la risposta,
   lo stato e la durata di ogni provider.

## Modalità di esecuzione

- **`parallel`** — ogni modello riceve contemporaneamente la stessa attività; tutte le risposte
  vengono restituite in modo indipendente.
- **`collaborative`** — i modelli vengono eseguiti **in sequenza**: ciascuno vede l'output del modello precedente e
  riceve la richiesta di perfezionarlo, ampliarlo, criticarlo o proporre un'alternativa. Il campo `summary`
  della risposta concatena gli output riusciti nell'ordine della sequenza (le esecuzioni parallele non hanno
  alcun campo `summary`).

## API

### `POST /api/chaos/run` — sessione della dashboard

Autenticazione tramite cookie (la sessione di gestione; consulta
[MANAGEMENT-AUTH.md](MANAGEMENT-AUTH.md)); utilizzato dalla pagina della dashboard.

```jsonc
// corpo
{
  "task": "Compare approaches to X", // obbligatorio
  "providers": ["glm", "kimi"], // filtro facoltativo
  "mode": "parallel", // facoltativo — sostituisce defaultMode
  "systemPrompt": "…", // sostituzione facoltativa
  "maxTokens": 4096, // sostituzione facoltativa
}
```

### `POST /api/skills/collect/chaos` — chiave API

Variante con token Bearer per chiamanti esterni. La chiave deve disporre dell'**autorizzazione Modalità Chaos**
(`chaosModeEnabled`), che è **disattivata per impostazione predefinita**: abilitala per ogni chiave in
**Dashboard → Gestione API → modifica chiave → autorizzazioni → Modalità Chaos**. Il corpo è identico a quello precedente.

```bash
curl -X POST http://localhost:20128/api/skills/collect/chaos \
  -H "Authorization: Bearer $OMNIROUTE_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"task":"Compare approaches to X","mode":"parallel"}'
```

Entrambi gli endpoint restituiscono la stessa struttura:

```jsonc
{
  "task": "…",
  "mode": "parallel",
  "startedAt": "2026-09-01T00:00:00.000Z",
  "totalProviders": 3,
  "totalResults": 3,
  "models": [
    {
      "providerId": "glm",
      "providerName": "GLM",
      "modelId": "glm-4.7",
      "status": "success",
      "content": "…",
      "durationMs": 3210,
    },
  ],
  "summary": "…", // solo per la modalità collaborativa
}
```

## Risoluzione dei problemi

- **`400 Chaos Mode is not enabled`** — consulta il passaggio 2 sopra: l'interruttore globale è disattivato.
- **La chiave API viene rifiutata su `/api/skills/collect/chaos`** — la chiave non dispone
  dell'autorizzazione `chaosModeEnabled` specifica per la chiave (disattivata per impostazione predefinita; si tratta di un'impostazione, non di un errore).
- **Un provider previsto non compare nei risultati** — controlla `providerOverrides` nella
  pagina Modalità Chaos (una sostituzione disabilitata lo esclude) e verifica che la connessione al provider sia
  attiva.
