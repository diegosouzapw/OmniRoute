# Monitoring & Costs — Navigation Structure (Italiano)

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/MONITORING_SECTIONS.md) · 🇪🇹 [am](../../../am/docs/architecture/MONITORING_SECTIONS.md) · 🇸🇦 [ar](../../../ar/docs/architecture/MONITORING_SECTIONS.md) · 🇦🇿 [az](../../../az/docs/architecture/MONITORING_SECTIONS.md) · 🇧🇬 [bg](../../../bg/docs/architecture/MONITORING_SECTIONS.md) · 🇧🇩 [bn](../../../bn/docs/architecture/MONITORING_SECTIONS.md) · 🇧🇦 [bs](../../../bs/docs/architecture/MONITORING_SECTIONS.md) · 🇨🇿 [cs](../../../cs/docs/architecture/MONITORING_SECTIONS.md) · 🇩🇰 [da](../../../da/docs/architecture/MONITORING_SECTIONS.md) · 🇩🇪 [de](../../../de/docs/architecture/MONITORING_SECTIONS.md) · 🇬🇷 [el](../../../el/docs/architecture/MONITORING_SECTIONS.md) · 🇪🇸 [es](../../../es/docs/architecture/MONITORING_SECTIONS.md) · 🇪🇪 [et](../../../et/docs/architecture/MONITORING_SECTIONS.md) · 🇮🇷 [fa](../../../fa/docs/architecture/MONITORING_SECTIONS.md) · 🇫🇮 [fi](../../../fi/docs/architecture/MONITORING_SECTIONS.md) · 🇫🇷 [fr](../../../fr/docs/architecture/MONITORING_SECTIONS.md) · 🇮🇪 [ga](../../../ga/docs/architecture/MONITORING_SECTIONS.md) · 🇮🇳 [gu](../../../gu/docs/architecture/MONITORING_SECTIONS.md) · 🇳🇬 [ha](../../../ha/docs/architecture/MONITORING_SECTIONS.md) · 🇮🇱 [he](../../../he/docs/architecture/MONITORING_SECTIONS.md) · 🇮🇳 [hi](../../../hi/docs/architecture/MONITORING_SECTIONS.md) · 🇭🇷 [hr](../../../hr/docs/architecture/MONITORING_SECTIONS.md) · 🇭🇺 [hu](../../../hu/docs/architecture/MONITORING_SECTIONS.md) · 🇦🇲 [hy](../../../hy/docs/architecture/MONITORING_SECTIONS.md) · 🇮🇩 [id](../../../id/docs/architecture/MONITORING_SECTIONS.md) · 🇳🇬 [ig](../../../ig/docs/architecture/MONITORING_SECTIONS.md) · 🇯🇵 [ja](../../../ja/docs/architecture/MONITORING_SECTIONS.md) · 🇬🇪 [ka](../../../ka/docs/architecture/MONITORING_SECTIONS.md) · 🇰🇭 [km](../../../km/docs/architecture/MONITORING_SECTIONS.md) · 🇮🇳 [kn](../../../kn/docs/architecture/MONITORING_SECTIONS.md) · 🇰🇷 [ko](../../../ko/docs/architecture/MONITORING_SECTIONS.md) · 🇱🇹 [lt](../../../lt/docs/architecture/MONITORING_SECTIONS.md) · 🇱🇻 [lv](../../../lv/docs/architecture/MONITORING_SECTIONS.md) · 🇮🇳 [ml](../../../ml/docs/architecture/MONITORING_SECTIONS.md) · 🇮🇳 [mr](../../../mr/docs/architecture/MONITORING_SECTIONS.md) · 🇲🇾 [ms](../../../ms/docs/architecture/MONITORING_SECTIONS.md) · 🇲🇹 [mt](../../../mt/docs/architecture/MONITORING_SECTIONS.md) · 🇲🇲 [my](../../../my/docs/architecture/MONITORING_SECTIONS.md) · 🇳🇵 [ne](../../../ne/docs/architecture/MONITORING_SECTIONS.md) · 🇳🇱 [nl](../../../nl/docs/architecture/MONITORING_SECTIONS.md) · 🇳🇴 [no](../../../no/docs/architecture/MONITORING_SECTIONS.md) · 🇮🇳 [or](../../../or/docs/architecture/MONITORING_SECTIONS.md) · 🇮🇳 [pa](../../../pa/docs/architecture/MONITORING_SECTIONS.md) · 🇵🇭 [phi](../../../phi/docs/architecture/MONITORING_SECTIONS.md) · 🇵🇱 [pl](../../../pl/docs/architecture/MONITORING_SECTIONS.md) · 🇵🇹 [pt](../../../pt/docs/architecture/MONITORING_SECTIONS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/MONITORING_SECTIONS.md) · 🇷🇴 [ro](../../../ro/docs/architecture/MONITORING_SECTIONS.md) · 🇷🇺 [ru](../../../ru/docs/architecture/MONITORING_SECTIONS.md) · 🇱🇰 [si](../../../si/docs/architecture/MONITORING_SECTIONS.md) · 🇸🇰 [sk](../../../sk/docs/architecture/MONITORING_SECTIONS.md) · 🇸🇮 [sl](../../../sl/docs/architecture/MONITORING_SECTIONS.md) · 🇷🇸 [sr](../../../sr/docs/architecture/MONITORING_SECTIONS.md) · 🇸🇪 [sv](../../../sv/docs/architecture/MONITORING_SECTIONS.md) · 🇰🇪 [sw](../../../sw/docs/architecture/MONITORING_SECTIONS.md) · 🇮🇳 [ta](../../../ta/docs/architecture/MONITORING_SECTIONS.md) · 🇮🇳 [te](../../../te/docs/architecture/MONITORING_SECTIONS.md) · 🇹🇭 [th](../../../th/docs/architecture/MONITORING_SECTIONS.md) · 🇹🇷 [tr](../../../tr/docs/architecture/MONITORING_SECTIONS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/MONITORING_SECTIONS.md) · 🇵🇰 [ur](../../../ur/docs/architecture/MONITORING_SECTIONS.md) · 🇺🇿 [uz](../../../uz/docs/architecture/MONITORING_SECTIONS.md) · 🇻🇳 [vi](../../../vi/docs/architecture/MONITORING_SECTIONS.md) · 🇳🇬 [yo](../../../yo/docs/architecture/MONITORING_SECTIONS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/MONITORING_SECTIONS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/MONITORING_SECTIONS.md)

---

> Implementato nel Gruppo B (piano 16). Vedere `src/shared/constants/sidebarVisibility.ts`.

---

## Navigazione di alto livello

La barra laterale della dashboard (dopo il Gruppo B) presenta le seguenti sezioni di primo livello, nell'ordine indicato:

```
Home
Provider
Combinazioni
Chiavi API
Impostazioni
Analisi
Costi          ← NUOVO (Gruppo B, piano 16)
Monitoraggio   ← RIORGANIZZATO (Gruppo B, piano 16)
...
```

---

## Sezione Costi (nuova, livello 1)

Prefisso del percorso: `/dashboard/costs/`

| Voce                 | URL                                  | Descrizione                                            |
| -------------------- | ------------------------------------ | ------------------------------------------------------ |
| Panoramica           | `/dashboard/costs`                   | Dashboard aggregata dei costi (spostata da Analisi)    |
| Prezzi               | `/dashboard/costs/pricing`           | Tabella dei prezzi per modello                         |
| Budget               | `/dashboard/costs/budget`            | Soglie di budget + avvisi                              |
| Condivisione quota   | `/dashboard/costs/quota-share`       | Pool di condivisione della quota + utilizzo            |
| Configurazione piano | `/dashboard/costs/quota-share/plans` | Sostituzioni delle impostazioni del piano per provider |

**Motivazione**: Prezzi, Budget e Condivisione quota si trovavano in precedenza sotto
`Monitoraggio > Parametri dei costi`. Spostandoli in una sezione dedicata di primo livello,
diventano individuabili senza dover navigare tra gli strumenti di osservabilità.

---

## Sezione Monitoraggio (riorganizzata)

La sezione Monitoraggio ora presenta **Attività in cima**, seguita da **3 sottogruppi**:

```
Monitoraggio
├── Attività              ← Feed cronologico (voce di primo livello)
├── Gruppo Log
│   ├── Log (tutti)
│   ├── Log proxy
│   └── Log console
├── Gruppo Audit
│   ├── Log di audit
│   ├── Audit MCP
│   └── Audit A2A
└── Gruppo Sistema
    ├── Integrità
    └── Runtime
```

### Cosa è cambiato rispetto alla struttura precedente

| Prima                                                                                  | Dopo                                             |
| -------------------------------------------------------------------------------------- | ------------------------------------------------ |
| Attività = scheda all'interno di Log che mostrava il Log di audit                      | Attività = feed dedicato (`/dashboard/activity`) |
| Gruppo Parametri dei costi in Monitoraggio                                             | Spostato nella sezione Costi                     |
| Elenco semplice: Log, Attività (log), Audit, Integrità, Runtime, Prezzi, Budget, Quota | Struttura in 3 gruppi + sezione Costi dedicata   |

---

## Attività e Log di audit

Ora si tratta di due elementi distinti:

| Dimensione            | Attività (`/dashboard/activity`)                                 | Log di audit (`/dashboard/audit`)                |
| --------------------- | ---------------------------------------------------------------- | ------------------------------------------------ |
| **Scopo**             | Feed di eventi rivolto all'utente ("cosa è successo di recente") | Log di conformità/sicurezza                      |
| **Origine dati**      | `GET /api/compliance/audit-log?level=high`                       | `GET /api/compliance/audit-log?level=all`        |
| **Formato**           | Cronologia raggruppata per giorno, con verbi leggibili e icone   | Tabella densa impaginata, 50 elementi per pagina |
| **Filtri**            | Categoria del tipo di evento                                     | Azione, gravità, attore, intervallo di date      |
| **Esportazione**      | Non disponibile                                                  | Esportazione JSON                                |
| **Filtro per attore** | Non applicabile                                                  | Filtrabile per attore                            |
| **Eventi mostrati**   | Solo azioni di alto livello (elenco consentito)                  | Tutti gli eventi di audit                        |

### Elenco consentito delle azioni di alto livello

Definito in `src/lib/audit/highLevelActions.ts`. Controlla quali eventi vengono visualizzati nel
feed Attività. L'elenco consentito include:

- Eventi di aggiunta/rimozione/test dei provider
- Creazione/aggiornamento/eliminazione delle combinazioni
- Ciclo di vita delle chiavi API (creazione, revoca, rotazione)
- Raggiungimento della soglia di budget
- Accesso/disconnessione dall'autenticazione
- Creazione di sessioni dell'agente cloud
- Registrazione di strumenti MCP
- Creazione/eliminazione di webhook
- Modifiche a pool/piani di quota (azioni `quota.*`, Gruppo B)
- Eventi della piattaforma (aggiornamento, distribuzione)
- Installazione/rimozione di skill

Gli eventi non inclusi in questo elenco vengono visualizzati solo nel Log di audit.

### Aggiunta di una nuova azione di alto livello

Modificare `src/lib/audit/highLevelActions.ts` e aggiungere la stringa dell'azione a
`HIGH_LEVEL_ACTIONS`. Questa operazione richiede una PR (l'elenco è definito nel codice, non è configurabile tramite DB).
L'icona corrispondente può essere aggiunta a `src/lib/audit/activityIcons.ts`.

---

## Reindirizzamento: `/dashboard/logs/activity`

Il vecchio percorso `/dashboard/logs/activity` viene reindirizzato in modo permanente (HTTP 308) a
`/dashboard/activity` tramite `permanentRedirect()` in
`src/app/(dashboard)/dashboard/logs/activity/page.tsx`.

L'ID legacy della barra laterale `logs-activity` viene mantenuto in `HIDEABLE_SIDEBAR_ITEM_IDS`
(ma rimosso da `SIDEBAR_DEFINITIONS`) per evitare di compromettere i preset utente che
fanno riferimento al vecchio ID.

---

## i18n

Namespace aggiunti dal Gruppo B:

| Chiave del namespace    | Contenuto                                                                    |
| ----------------------- | ---------------------------------------------------------------------------- |
| `sidebar.costsSection`  | Etichetta della sezione Costi                                                |
| `sidebar.activity`      | Voce Attività della barra laterale                                           |
| `sidebar.logsGroup`     | Etichetta del sottogruppo Log                                                |
| `sidebar.systemGroup`   | Etichetta del sottogruppo Sistema                                            |
| `sidebar.costsOverview` | Voce della panoramica dei costi                                              |
| `activity.*`            | Tutte le stringhe della pagina Attività (titolo, verbi, filtri, stato vuoto) |

Le impostazioni locali di riferimento sono `pt-BR` ed `en`. Tutte le altre 40 impostazioni locali utilizzano
l'inglese come lingua di riserva tramite il meccanismo di fallback di `next-intl` (configurato in `src/i18n/config.ts`).
