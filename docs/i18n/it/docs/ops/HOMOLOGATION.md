# Homologation Suite (`npm run homolog`) (Italiano)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/HOMOLOGATION.md) · 🇪🇹 [am](../../../am/docs/ops/HOMOLOGATION.md) · 🇸🇦 [ar](../../../ar/docs/ops/HOMOLOGATION.md) · 🇦🇿 [az](../../../az/docs/ops/HOMOLOGATION.md) · 🇧🇬 [bg](../../../bg/docs/ops/HOMOLOGATION.md) · 🇧🇩 [bn](../../../bn/docs/ops/HOMOLOGATION.md) · 🇨🇿 [cs](../../../cs/docs/ops/HOMOLOGATION.md) · 🇩🇰 [da](../../../da/docs/ops/HOMOLOGATION.md) · 🇩🇪 [de](../../../de/docs/ops/HOMOLOGATION.md) · 🇬🇷 [el](../../../el/docs/ops/HOMOLOGATION.md) · 🇪🇸 [es](../../../es/docs/ops/HOMOLOGATION.md) · 🇪🇪 [et](../../../et/docs/ops/HOMOLOGATION.md) · 🇮🇷 [fa](../../../fa/docs/ops/HOMOLOGATION.md) · 🇫🇮 [fi](../../../fi/docs/ops/HOMOLOGATION.md) · 🇫🇷 [fr](../../../fr/docs/ops/HOMOLOGATION.md) · 🇮🇪 [ga](../../../ga/docs/ops/HOMOLOGATION.md) · 🇮🇳 [gu](../../../gu/docs/ops/HOMOLOGATION.md) · 🇳🇬 [ha](../../../ha/docs/ops/HOMOLOGATION.md) · 🇮🇱 [he](../../../he/docs/ops/HOMOLOGATION.md) · 🇮🇳 [hi](../../../hi/docs/ops/HOMOLOGATION.md) · 🇭🇷 [hr](../../../hr/docs/ops/HOMOLOGATION.md) · 🇭🇺 [hu](../../../hu/docs/ops/HOMOLOGATION.md) · 🇦🇲 [hy](../../../hy/docs/ops/HOMOLOGATION.md) · 🇮🇩 [id](../../../id/docs/ops/HOMOLOGATION.md) · 🇳🇬 [ig](../../../ig/docs/ops/HOMOLOGATION.md) · 🇯🇵 [ja](../../../ja/docs/ops/HOMOLOGATION.md) · 🇬🇪 [ka](../../../ka/docs/ops/HOMOLOGATION.md) · 🇰🇭 [km](../../../km/docs/ops/HOMOLOGATION.md) · 🇮🇳 [kn](../../../kn/docs/ops/HOMOLOGATION.md) · 🇰🇷 [ko](../../../ko/docs/ops/HOMOLOGATION.md) · 🇱🇹 [lt](../../../lt/docs/ops/HOMOLOGATION.md) · 🇱🇻 [lv](../../../lv/docs/ops/HOMOLOGATION.md) · 🇮🇳 [ml](../../../ml/docs/ops/HOMOLOGATION.md) · 🇮🇳 [mr](../../../mr/docs/ops/HOMOLOGATION.md) · 🇲🇾 [ms](../../../ms/docs/ops/HOMOLOGATION.md) · 🇲🇹 [mt](../../../mt/docs/ops/HOMOLOGATION.md) · 🇲🇲 [my](../../../my/docs/ops/HOMOLOGATION.md) · 🇳🇵 [ne](../../../ne/docs/ops/HOMOLOGATION.md) · 🇳🇱 [nl](../../../nl/docs/ops/HOMOLOGATION.md) · 🇳🇴 [no](../../../no/docs/ops/HOMOLOGATION.md) · 🇮🇳 [or](../../../or/docs/ops/HOMOLOGATION.md) · 🇮🇳 [pa](../../../pa/docs/ops/HOMOLOGATION.md) · 🇵🇭 [phi](../../../phi/docs/ops/HOMOLOGATION.md) · 🇵🇱 [pl](../../../pl/docs/ops/HOMOLOGATION.md) · 🇵🇹 [pt](../../../pt/docs/ops/HOMOLOGATION.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/HOMOLOGATION.md) · 🇷🇴 [ro](../../../ro/docs/ops/HOMOLOGATION.md) · 🇷🇺 [ru](../../../ru/docs/ops/HOMOLOGATION.md) · 🇱🇰 [si](../../../si/docs/ops/HOMOLOGATION.md) · 🇸🇰 [sk](../../../sk/docs/ops/HOMOLOGATION.md) · 🇸🇮 [sl](../../../sl/docs/ops/HOMOLOGATION.md) · 🇷🇸 [sr](../../../sr/docs/ops/HOMOLOGATION.md) · 🇸🇪 [sv](../../../sv/docs/ops/HOMOLOGATION.md) · 🇰🇪 [sw](../../../sw/docs/ops/HOMOLOGATION.md) · 🇮🇳 [ta](../../../ta/docs/ops/HOMOLOGATION.md) · 🇮🇳 [te](../../../te/docs/ops/HOMOLOGATION.md) · 🇹🇭 [th](../../../th/docs/ops/HOMOLOGATION.md) · 🇹🇷 [tr](../../../tr/docs/ops/HOMOLOGATION.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/HOMOLOGATION.md) · 🇵🇰 [ur](../../../ur/docs/ops/HOMOLOGATION.md) · 🇺🇿 [uz](../../../uz/docs/ops/HOMOLOGATION.md) · 🇻🇳 [vi](../../../vi/docs/ops/HOMOLOGATION.md) · 🇳🇬 [yo](../../../yo/docs/ops/HOMOLOGATION.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/HOMOLOGATION.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/HOMOLOGATION.md)

---

Validazione E2E in ambiente reale del deploy di OmniRoute in esecuzione sulla VPS di omologazione
(`HOMOLOG_BASE_URL`, ad es. `http://192.168.0.15:20128`). Un singolo comando sostituisce la checklist
manuale dello STOP #2 del rilascio con un'esecuzione automatizzata che produce evidenze.

## Cosa copre

| Livello                 | Cosa verifica                                                                                                                                                                                                                  | Implementazione                                                               |
| ----------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ----------------------------------------------------------------------------- |
| L0 — integrità/parità   | `/api/monitoring/health` risponde con `200`, `status: "healthy"` e la versione prevista                                                                                                                                        | `scripts/homolog/lib/parity.mjs`                                              |
| L1a — chiave effimera   | Accesso amministratore → `POST /api/keys` crea una chiave API con ambito limitato per l'esecuzione, revocata (`DELETE /api/keys/:id`) in un blocco `finally` indipendentemente dall'esito                                      | `scripts/homolog/lib/adminClient.mjs`                                         |
| L1b — superficie API    | Catalogo `/v1/models`, un completamento chat reale non in streaming (modello critico per il livello, `max_tokens: 5`), una risposta `401` per una chiave non valida e l'endpoint pubblico `/api/monitoring/health`             | `tests/homolog/api/core.http` (httpYac)                                       |
| L1c — streaming SSE     | Completamento chat reale in streaming; verifica `text/event-stream`, almeno un delta di contenuto e un terminatore `[DONE]`                                                                                                    | `scripts/homolog/lib/sseCheck.mjs`                                            |
| L2 — provider reali     | Una richiesta chat a costo minimo per ciascun provider critico presente nel catalogo live `/v1/models`, generata al volo tramite promptfoo                                                                                     | `scripts/homolog/gen-promptfoo.mjs` + `scripts/homolog/lib/providerTiers.mjs` |
| L4a — autenticazione UI | Esegue una sola volta l'accesso tramite il modulo di login reale e riutilizza la sessione (`storageState`) nell'intero livello UI                                                                                              | `tests/homolog/ui/auth.setup.ts`                                              |
| L4b — route UI          | Ogni `page.tsx` statico in `src/app/(dashboard)/dashboard` (individuato dal filesystem, saltando le route dinamiche `[param]`) viene caricato senza errori HTTP, errori di pagina o attivazioni dell'error boundary di Next.js | `tests/homolog/ui/routes.spec.ts`                                             |
| L4c — flusso UI critico | Crea una chiave API tramite l'interfaccia della dashboard e la revoca subito dopo (senza lasciare residui sulla VPS)                                                                                                           | `tests/homolog/ui/api-key-flow.spec.ts`                                       |
| L5 — report unificato   | Unisce httpYac (tramite `junit-to-ctrf`), l'adattatore promptfoo→CTRF e il reporter CTRF di Playwright in un unico `homolog-ctrf.json`, oltre a un file `homolog-report/summary.md` leggibile dall'utente                      | `scripts/homolog/run.mjs`                                                     |

Nessun coinvolgimento di LLM nell'esecuzione stessa: si tratta di una batteria di regressione deterministica,
non di una valutazione. L'IA interviene solo nelle future attività di manutenzione (vedere la Roadmap di seguito).

## Prerequisiti

1. Copia `.env.homolog.example` in `.env.homolog` (ignorato da git — non eseguirne mai il commit) e compila:
   - `HOMOLOG_BASE_URL` — il deploy di destinazione, ad esempio `http://192.168.0.15:20128`.
   - `HOMOLOG_ADMIN_PASSWORD` — la password di gestione della dashboard per quel deploy.
   - `HOMOLOG_CRITICAL_PROVIDERS` — prefissi dei provider separati da virgole che ricevono una vera
     richiesta di smoke test in chat (ad esempio `openai,anthropic,gemini,codex,grok,glm,deepseek,openrouter`).
   - `HOMOLOG_API_KEY` — lascia vuoto nelle esecuzioni normali; la suite crea e revoca la
     propria chiave temporanea. Impostalo solo per eseguire il debug di un singolo livello in isolamento.
2. Esegui `npm install` nel repository (le dipendenze della suite — `httpyac`, `promptfoo`,
   `playwright-ctrf-json-reporter`, `junit-to-ctrf`, `ctrf` — sono normali devDependencies).
3. Esegui `npx playwright install` se i binari del browser non sono già presenti.

## Come eseguire

```bash
npm run homolog
```

Per eseguire la convalida su un deploy la cui versione non corrisponde al `package.json` locale
(ad esempio un ambiente di omologazione ancora su una patch precedente), sovrascrivi esplicitamente
la versione prevista:

```bash
HOMOLOG_EXPECT_VERSION=3.8.47 npm run homolog
```

L'esecuzione termina con un codice diverso da zero se un qualsiasi livello non riesce e tenta sempre di revocare la chiave
API temporanea creata, anche in caso di errore (blocco `finally` in `scripts/homolog/run.mjs`).

## Lettura del report

Tutto l'output viene salvato in `homolog-report/` (ignorato da git):

- `summary.md` — la stessa tabella stampata su stdout, con una riga per livello (✅/❌ + dettagli).
- `homolog-ctrf.json` — il report CTRF unificato (unione dei risultati API/SSE, smoke test dei provider e
  UI) — questo è l'artefatto da allegare alla checklist STOP #2 di una release.
- `httpyac-junit.xml`, `api-ctrf.json`, `providers-ctrf.json`, `ui-ctrf.json` — i
  report grezzi/intermedi per ciascun livello.
- `promptfooconfig.yaml`, `provider-misses.json` — la configurazione promptfoo generata per
  l'esecuzione corrente e gli eventuali provider critici mancanti dal catalogo attivo.

Un errore di L0 interrompe immediatamente l'esecuzione (non viene creata alcuna chiave temporanea), poiché una mancata corrispondenza
di versione/stato significa che ogni livello successivo convaliderebbe il deploy errato.

## Aggiornamento della baseline quando l'interfaccia cambia legittimamente

L4b (smoke test delle route) e L4c (flusso UI della chiave API) sono gestiti tramite veri localizzatori DOM, non
snapshot, quindi la maggior parte delle modifiche legittime all'interfaccia non richiede alcun aggiornamento della suite. Quando una modifica
invalida un localizzatore (ad esempio l'etichetta di un pulsante rinominata o una pagina delle impostazioni spostata):

1. Riconferma il localizzatore rispetto al sorgente corrente (le specifiche documentano già il
   file e la riga rispetto ai quali è stato confermato ciascun localizzatore — segui lo stesso schema, non procedere per tentativi).
2. Aggiorna la specifica in `tests/homolog/ui/`.
3. Esegui nuovamente `npm run homolog` (oppure soltanto la specifica Playwright interessata) sul VPS per
   confermare la correzione, quindi esegui il commit.

Questa suite non include alcuna baseline visiva/a livello di pixel (F1) — consulta la roadmap per ulteriori informazioni.

## Roadmap (F2 / F3)

La progettazione e il rilascio graduale sono descritti nella specifica di pianificazione interna
`_tasks/superpowers/specs/2026-07-13-homolog-e2e-suite-design.md` (non collegata — artefatto interno
di `_tasks/`, non incluso nella documentazione versionata di questo repository). Riepilogo:

- **F2** — registrazione completa della procedura → Playwright Test Agents (`planner`/`generator`)
  la trasformano in specifiche di flusso (creazione della combo, test del provider, modifica delle impostazioni, strumenti MCP) +
  baseline di regressione visiva (Lost Pixel) con maschere sui dati dinamici (metriche,
  timestamp, log) + una routine di manutenzione `healer` per ogni release.
- **F3** — copertura di resilienza/contratti/integrazione: toxiproxy + un provider fittizio compatibile con OpenAI
  sul devbox, una combo `homolog-resilience` sul VPS che punta a esso
  (timeout indotto → verifica del fallback + apertura/chiusura del circuit breaker tramite
  `/api/monitoring/health`); test dei contratti con Schemathesis, soggetti a gate, rispetto a
  `docs/openapi.yaml` (`--max-examples` basso, seed fissi, solo endpoint non LLM); e
  integrazione di `npm run homolog` + del relativo `summary.md` nella fase STOP #2 di `/generate-release`.
