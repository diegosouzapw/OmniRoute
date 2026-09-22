# Gamification & Leaderboard System (Italiano)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/GAMIFICATION.md) · 🇪🇹 [am](../../../am/docs/frameworks/GAMIFICATION.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/GAMIFICATION.md) · 🇦🇿 [az](../../../az/docs/frameworks/GAMIFICATION.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/GAMIFICATION.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/GAMIFICATION.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/GAMIFICATION.md) · 🇩🇰 [da](../../../da/docs/frameworks/GAMIFICATION.md) · 🇩🇪 [de](../../../de/docs/frameworks/GAMIFICATION.md) · 🇬🇷 [el](../../../el/docs/frameworks/GAMIFICATION.md) · 🇪🇸 [es](../../../es/docs/frameworks/GAMIFICATION.md) · 🇪🇪 [et](../../../et/docs/frameworks/GAMIFICATION.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/GAMIFICATION.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/GAMIFICATION.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/GAMIFICATION.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/GAMIFICATION.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/GAMIFICATION.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/GAMIFICATION.md) · 🇮🇱 [he](../../../he/docs/frameworks/GAMIFICATION.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/GAMIFICATION.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/GAMIFICATION.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/GAMIFICATION.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/GAMIFICATION.md) · 🇮🇩 [id](../../../id/docs/frameworks/GAMIFICATION.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/GAMIFICATION.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/GAMIFICATION.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/GAMIFICATION.md) · 🇰🇭 [km](../../../km/docs/frameworks/GAMIFICATION.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/GAMIFICATION.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/GAMIFICATION.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/GAMIFICATION.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/GAMIFICATION.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/GAMIFICATION.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/GAMIFICATION.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/GAMIFICATION.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/GAMIFICATION.md) · 🇲🇲 [my](../../../my/docs/frameworks/GAMIFICATION.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/GAMIFICATION.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/GAMIFICATION.md) · 🇳🇴 [no](../../../no/docs/frameworks/GAMIFICATION.md) · 🇮🇳 [or](../../../or/docs/frameworks/GAMIFICATION.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/GAMIFICATION.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/GAMIFICATION.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/GAMIFICATION.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/GAMIFICATION.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/GAMIFICATION.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/GAMIFICATION.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/GAMIFICATION.md) · 🇱🇰 [si](../../../si/docs/frameworks/GAMIFICATION.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/GAMIFICATION.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/GAMIFICATION.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/GAMIFICATION.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/GAMIFICATION.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/GAMIFICATION.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/GAMIFICATION.md) · 🇮🇳 [te](../../../te/docs/frameworks/GAMIFICATION.md) · 🇹🇭 [th](../../../th/docs/frameworks/GAMIFICATION.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/GAMIFICATION.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/GAMIFICATION.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/GAMIFICATION.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/GAMIFICATION.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/GAMIFICATION.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/GAMIFICATION.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/GAMIFICATION.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/GAMIFICATION.md)

---

> **Fonte autorevole:** `src/lib/gamification/`, `src/lib/db/gamification.ts`, `src/app/api/gamification/`
> **Ultimo aggiornamento:** 2026-06-28 — v3.8.40

OmniRoute include un livello di gamification local-first che premia gli utenti per
l'interazione con la piattaforma — effettuando richieste, cambiando provider, creando
combo, condividendo token e contribuendo alla community. Tutto lo stato risiede in
SQLite; la federazione con i server della community è facoltativa e basata su push.

Il sistema è progettato per avere **latenza zero nel percorso critico** — gli eventi di gamification
vengono inviati in modalità fire-and-forget dalla pipeline delle richieste e non bloccano mai
una risposta LLM.

---

## Panoramica

### Scopo

Aumentare il coinvolgimento e la fidelizzazione degli utenti fornendo progressi visibili (XP,
livelli, badge), riprova sociale (classifiche) e incentivi economici (condivisione di token,
ricompense per gli inviti).

### Ambito

| Funzionalità       | Descrizione                                                                                    |
| ------------------ | ---------------------------------------------------------------------------------------------- |
| XP e livelli       | Guadagno di XP per azione; avanzamento di livello lungo una curva polinomiale                  |
| Badge              | Oltre 20 obiettivi in 5 categorie con 4 livelli di rarità                                      |
| Serie              | Monitoraggio dell'utilizzo attivo giornaliero con serie attuale/più lunga                      |
| Classifiche        | Ambiti globali, settimanali, mensili, di condivisione token e di contribuzione                 |
| Condivisione token | Trasferimento di crediti tra utenti tramite registro a partita doppia                          |
| Inviti e riscatto  | Codici di referral archiviati con hash SHA-256                                                 |
| Server community   | Federazione con istanze OmniRoute esterne                                                      |
| Anti-cheat         | Punteggio lato server, limitazione della frequenza, rilevamento delle anomalie tramite z-score |

### Principi di progettazione

1. **Local-first** — tutto lo stato è in SQLite; non sono richiesti servizi esterni.
2. **Non bloccante** — gli eventi sono fire-and-forget; il percorso di risposta dell'LLM
   non subisce mai ritardi dovuti alla logica di gamification.
3. **Server autorevole** — gli XP vengono calcolati esclusivamente lato server; i client non possono
   gonfiare i punteggi.
4. **Rispetto della privacy** — la partecipazione alle classifiche è facoltativa; gli utenti possono
   nascondere il proprio profilo.
5. **Pronto per la federazione** — i server della community possono inviare i punteggi tramite un'API firmata;
   la sincronizzazione sovrascrive i dati anziché sommarli.

---

## Architettura

### Flusso di alto livello

```
Richiesta client
  → /v1/chat/completions
    → handleChatCore()                      [open-sse/handlers/chatCore.ts]
      → ... (pipeline esistente) ...
      → risposta upstream inviata al client
      → setImmediate (fire-and-forget):
        → emitGamificationEvent()           [src/lib/gamification/events.ts]
          → awardXp()                       [src/lib/gamification/xp.ts]
          → updateStreak()                  [src/lib/gamification/streaks.ts]
          → evaluateBadges()                [src/lib/gamification/badges.ts]
          → updateLeaderboard()             [src/lib/gamification/leaderboard.ts]
          → checkAnomalies()                [src/lib/gamification/antiCheat.ts]
```

L'emettitore di eventi è l'unico punto di integrazione. `chatCore.ts` chiama
`emitGamificationEvent()` dopo l'invio della risposta; il modulo degli eventi
distribuisce l'elaborazione ai sottosistemi di XP, serie, badge, classifiche e anti-cheat.

### Grafo delle dipendenze dei moduli

```
src/lib/gamification/
  events.ts          ← punto di ingresso (chiamato da chatCore.ts)
    ├── xp.ts        ← calcolo degli XP e determinazione del livello
    ├── streaks.ts   ← monitoraggio della serie di attività giornaliera
    ├── badges.ts    ← valutazione dei criteri dei badge
    ├── leaderboard.ts ← calcolo della posizione e trasmissione SSE
    ├── antiCheat.ts ← limitazione della frequenza e rilevamento delle anomalie
    ├── sharing.ts   ← registro dei trasferimenti di token
    ├── invites.ts   ← gestione dei codici di invito/riscatto
    ├── servers.ts   ← federazione dei server della community
    └── notifications.ts ← flusso di notifiche SSE

src/lib/db/
  gamification.ts    ← tutte le operazioni CRUD (8 tabelle)

src/app/api/gamification/
  leaderboard/       ← GET classifiche, POST aggiornamento manuale
  leaderboard/stream ← aggiornamenti in tempo reale tramite SSE
  transfer/          ← GET cronologia, POST invio di token
  invite/            ← GET/POST codici, DELETE revoca
  invite/redeem/     ← POST riscatto di un codice
  servers/           ← GET/POST/DELETE server della community
  federation/score/  ← POST invio del punteggio al server
  federation/leaderboard/ ← GET recupero della classifica dal server
  notifications/     ← notifiche SSE per badge/avanzamento di livello
  anomalies/         ← GET report delle anomalie (amministratore)
  rotate/            ← POST rotazione dei segreti dei token di invito
```

---

## Livello dati

### Tabelle del database

Tutte le tabelle risiedono nel database SQLite principale di OmniRoute, creato dalla migrazione
`060_create_gamification.sql`. La modalità di journaling WAL viene ereditata dall'istanza singleton
`getDbInstance()` in `src/lib/db/core.ts`.

```
┌─────────────────────────┐     ┌──────────────────────────┐
│      leaderboard        │     │      user_levels          │
├─────────────────────────┤     ├──────────────────────────┤
│ id            TEXT PK   │     │ api_key_id    TEXT PK    │
│ api_key_id    TEXT      │     │ xp            INTEGER    │
│ scope         TEXT      │     │ level         INTEGER    │
│ score         INTEGER   │     │ title         TEXT       │
│ period        TEXT      │     │ updated_at    TEXT       │
│ updated_at    TEXT      │     └──────────────────────────┘
└─────────────────────────┘
                │
                │ 1:N
                ▼
┌─────────────────────────┐     ┌──────────────────────────┐
│     user_badges         │     │    badge_definitions      │
├─────────────────────────┤     ├──────────────────────────┤
│ id            TEXT PK   │     │ id            TEXT PK    │
│ api_key_id    TEXT      │     │ name          TEXT       │
│ badge_id      TEXT FK   │     │ category      TEXT       │
│ earned_at     TEXT      │     │ rarity        TEXT       │
│ notified      INTEGER   │     │ criteria_type TEXT       │
└─────────────────────────┘     │ criteria      TEXT(JSON) │
                                │ description   TEXT       │
                                │ icon          TEXT       │
                                │ hidden        INTEGER    │
                                └──────────────────────────┘

┌─────────────────────────┐     ┌──────────────────────────┐
│     xp_audit_log        │     │     token_ledger         │
├─────────────────────────┤     ├──────────────────────────┤
│ id            TEXT PK   │     │ id            TEXT PK    │
│ api_key_id    TEXT      │     │ from_key_id   TEXT       │
│ action        TEXT      │     │ to_key_id     TEXT       │
│ xp_awarded    INTEGER   │     │ amount        INTEGER    │
│ metadata      TEXT(JSON)│     │ idempotency_key TEXT UQ  │
│ created_at    TEXT      │     │ created_at    TEXT       │
└─────────────────────────┘     └──────────────────────────┘

┌─────────────────────────┐     ┌──────────────────────────┐
│    invite_tokens        │     │   community_servers      │
├─────────────────────────┤     ├──────────────────────────┤
│ id            TEXT PK   │     │ id            TEXT PK    │
│ api_key_id    TEXT      │     │ name          TEXT       │
│ code          TEXT UQ   │     │ url           TEXT       │
│ token_hash    TEXT      │     │ token_hash    TEXT       │
│ uses          INTEGER   │     │ status        TEXT       │
│ max_uses      INTEGER   │     │ last_sync     TEXT       │
│ created_at    TEXT      │     │ created_at    TEXT       │
│ expires_at    TEXT      │     └──────────────────────────┘
└─────────────────────────┘
```

### Modulo di dominio: `src/lib/db/gamification.ts`

Segue il modello standard di OmniRoute: importa `getDbInstance()` da
`core.ts` ed esporta funzioni CRUD tipizzate. Nessuna istruzione SQL grezza nei gestori delle route.

Funzioni principali:

| Funzione                   | Descrizione                                                            |
| -------------------------- | ---------------------------------------------------------------------- |
| `upsertLeaderboardEntry()` | Inserisce o aggiorna il punteggio per (api_key_id, scope, period)      |
| `getLeaderboard()`         | Classifiche paginate per uno scope/period specifico                    |
| `getUserLevel()`           | Ottiene o crea il record del livello utente                            |
| `updateUserLevel()`        | Imposta XP, livello e titolo in modo atomico                           |
| `getBadgeDefinitions()`    | Tutte le definizioni dei badge (con filtro facoltativo)                |
| `getUserBadges()`          | Badge ottenuti da un utente                                            |
| `awardBadge()`             | Inserisce l'assegnazione di un badge (idempotente rispetto a badge_id) |
| `logXpAction()`            | Aggiunge una voce a xp_audit_log                                       |
| `getXpAuditLog()`          | Cronologia di audit paginata per un utente                             |
| `insertLedgerEntry()`      | Trasferimento a partita doppia (all'interno di una transazione)        |
| `getBalance()`             | Somma degli importi ricevuti meno quelli inviati per un utente         |
| `getTransferHistory()`     | Registro paginato dei trasferimenti                                    |
| `createInviteToken()`      | Inserisce il codice di invito e il token sottoposto a hashing          |
| `redeemInviteToken()`      | Cerca per codice, convalida e incrementa il numero di utilizzi         |
| `upsertCommunityServer()`  | Registra o aggiorna un server di federazione                           |
| `getCommunityServers()`    | Elenca i server di un utente                                           |
| `deleteCommunityServer()`  | Rimuove la registrazione di un server                                  |

---

## Sistema XP / livelli

**File:** `src/lib/gamification/xp.ts`

### Curva dei livelli

Gli XP necessari per raggiungere il livello `n` seguono una curva polinomiale:

```
xp_for_level(n) = floor(100 * n^1.5)
```

| Livello | XP al successivo | XP cumulativi | Titolo       |
| ------- | ---------------- | ------------- | ------------ |
| 1       | 100              | 100           | Principiante |
| 5       | 1,118            | 2,415         | Principiante |
| 10      | 3,162            | 10,523        | Esploratore  |
| 25      | 12,500           | 86,024        | Esploratore  |
| 50      | 35,355           | 345,529       | Esperto      |
| 75      | 64,952           | 948,683       | Maestro      |
| 100     | 100,000          | 2,050,000     | Leggenda     |

### Titoli

| Intervallo di livelli | Titolo       |
| --------------------- | ------------ |
| 1 – 9                 | Principiante |
| 10 – 24               | Esploratore  |
| 25 – 49               | Esperto      |
| 50 – 74               | Maestro      |
| 75 – 100              | Leggenda     |

### Ricompense in XP

| Azione            | XP  | Descrizione                                                                         |
| ----------------- | --- | ----------------------------------------------------------------------------------- |
| `request`         | 1   | Per ogni richiesta API instradata tramite OmniRoute                                 |
| `provider_switch` | 5   | Passaggio a un provider diverso                                                     |
| `model_switch`    | 3   | Passaggio a un modello diverso                                                      |
| `combo_create`    | 10  | Creazione di una nuova combo                                                        |
| `combo_use`       | 2   | Utilizzo di una combo per una richiesta                                             |
| `token_share`     | 1   | Per ogni 1 000 token condivisi con un altro utente                                  |
| `invite_redeem`   | 50  | Riscatto di un codice di invito                                                     |
| `daily_login`     | 5   | Utilizzo attivo giornaliero (una volta al giorno)                                   |
| `streak_bonus`    | 2   | Per ogni giorno consecutivo della serie (moltiplicato per la lunghezza della serie) |
| `badge_unlock`    | 10  | Sblocco di un badge                                                                 |

### Flusso di assegnazione

```typescript
export async function awardXp(
  apiKeyId: string,
  action: XpAction,
  metadata?: Record<string, unknown>
): Promise<{ xp: number; level: number; title: string; levelUp: boolean }>;
```

1. Cercare `XP_REWARDS[action]` per ottenere la quantità di XP.
2. Passare attraverso `checkRateLimit()` (anti-cheat: massimo 1000 XP/min per chiave).
3. Aprire una transazione:
   - Leggere la riga corrente di `user_levels`.
   - Aggiungere gli XP; ricalcolare il livello tramite `levelFromXp(totalXp)`.
   - Se il livello è cambiato, impostare `levelUp = true`.
   - Aggiornare la riga di `user_levels`.
   - Inserire un record in `xp_audit_log`.
4. Restituire il risultato. Il chiamante gestisce le notifiche.

### Funzione di supporto: `levelFromXp(totalXp)`

Itera sui livelli 1..100, sommando `xp_for_level(n)` finché gli XP cumulativi
non superano `totalXp`. Restituisce il livello più alto la cui soglia è stata raggiunta.
La complessità è O(100), accettabile poiché i livelli sono limitati a 100.

---

## Sistema dei badge

**File:** `src/lib/gamification/badges.ts`

### Categorie

| Categoria      | Descrizione                                | Badge di esempio                               |
| -------------- | ------------------------------------------ | ---------------------------------------------- |
| `usage`        | Traguardi basati sul volume                | Prima richiesta, 1K richieste, 100K            |
| `sharing`      | Condivisione di token e referral           | Prima condivisione, Generoso (10 condivisioni) |
| `contribution` | Partecipazione alla community              | Creatore di combo, Esploratore di provider     |
| `streak`       | Costanza nel tempo                         | Guerriero settimanale, Devoto mensile          |
| `rare`         | Obiettivi difficili da ottenere o nascosti | Utente precoce, Segnalatore di bug             |

### Rarità

| Rarità      | Colore | Indicazione sulla probabilità |
| ----------- | ------ | ----------------------------- |
| `common`    | Grigio | La maggior parte degli utenti |
| `uncommon`  | Verde  | Utenti attivi                 |
| `rare`      | Blu    | Utenti assidui                |
| `legendary` | Oro    | Miglior 1%                    |

### Tipi di criteri

| Tipo           | Campo        | Descrizione                                            |
| -------------- | ------------ | ------------------------------------------------------ |
| `action_count` | `count`      | Eseguire un'azione N volte (ad es., 1000 richieste)    |
| `streak`       | `days`       | Mantenere una serie per N giorni consecutivi           |
| `unique_count` | `field`, `n` | Usare N valori univoci (ad es., 10 modelli diversi)    |
| `rank`         | `scope`, `n` | Raggiungere la posizione N in una classifica specifica |
| `first`        | —            | Essere il primo a eseguire un'azione                   |
| `hidden`       | (variabile)  | Criteri non mostrati fino all'ottenimento              |

Le definizioni dei badge sono archiviate in `badge_definitions` sotto forma di `criteria` JSON:

```json
{
  "type": "action_count",
  "action": "request",
  "count": 1000
}
```

### Flusso di valutazione

```
emitGamificationEvent(event)
  → evaluateBadges(apiKeyId, event)
    → getBadgeDefinitions()           # tutte le definizioni
    → getUserBadges(apiKeyId)         # già ottenuti (ignorare)
    → per ogni badge non ottenuto:
       → matchesCriteria(badge, event, userState)
       → in caso di corrispondenza: awardBadge(apiKeyId, badgeId)
         → restituisce il payload della notifica
```

La valutazione è **basata sugli eventi**: viene eseguita dopo ogni evento di gamification, ma
controlla solo i badge il cui `criteria.type` corrisponde all'azione dell'evento. Ciò
mantiene rapida la valutazione (< 5ms per la maggior parte degli eventi).

### `matchesCriteria(badge, event, userState)`

| Tipo di criterio | Controllo                                                           |
| ---------------- | ------------------------------------------------------------------- |
| `action_count`   | `getActionCount(apiKeyId, action) >= count`                         |
| `streak`         | `getCurrentStreak(apiKeyId) >= days`                                |
| `unique_count`   | `getUniqueCount(apiKeyId, field) >= n`                              |
| `rank`           | `getRank(apiKeyId, scope) <= n`                                     |
| `first`          | Nessuna voce precedente in `xp_audit_log` per questo tipo di azione |
| `hidden`         | Delega al sottocontrollo appropriato                                |

### Badge integrati (20+)

<details>
<summary>Elenco completo dei badge</summary>

| Distintivo                  | Categoria    | Rarità      | Criteri                            |
| --------------------------- | ------------ | ----------- | ---------------------------------- |
| Primi passi                 | utilizzo     | comune      | 1 richiesta                        |
| Riscaldamento               | utilizzo     | comune      | 100 richieste                      |
| Utente esperto              | utilizzo     | non comune  | 1.000 richieste                    |
| Centurione                  | utilizzo     | raro        | 10.000 richieste                   |
| OmniPotenza                 | utilizzo     | leggendario | 100.000 richieste                  |
| Esploratore di provider     | contributo   | comune      | Usa 5 provider diversi             |
| Maestro dei provider        | contributo   | non comune  | Usa 20 provider diversi            |
| Architetto di combo         | contributo   | non comune  | Crea 5 combo                       |
| Gran maestro di combo       | contributo   | raro        | Crea 25 combo                      |
| Prima condivisione          | condivisione | comune      | 1 trasferimento di token           |
| Generoso                    | condivisione | non comune  | 10 trasferimenti di token          |
| Filantropo                  | condivisione | raro        | Trasferisce 10.000 token in totale |
| Referente                   | condivisione | comune      | 1 referral riuscito                |
| Costruttore di reti         | condivisione | non comune  | 10 referral riusciti               |
| Guerriero settimanale       | serie        | non comune  | Serie di 7 giorni                  |
| Devoto mensile              | serie        | raro        | Serie di 30 giorni                 |
| Inarrestabile               | serie        | leggendario | Serie di 365 giorni                |
| Pioniere                    | raro         | leggendario | Si unisce durante il periodo beta  |
| Pioniere della compressione | raro         | non comune  | Usa la compressione 100 volte      |
| Collezionista di skill      | raro         | raro        | Usa 10 skill diverse               |
| Esploratore di modelli      | contributo   | non comune  | Usa 15 modelli diversi             |

</details>

---

## Monitoraggio delle serie

**File:** `src/lib/gamification/streaks.ts`

### Modello dei dati

Le serie vengono archiviate nella tabella `key_value` (tabella di utilità condivisa) con chiavi dotate di namespace:

| Chiave                        | Valore                           | Descrizione             |
| ----------------------------- | -------------------------------- | ----------------------- |
| `gamification:streak:{keyId}` | `{current},{longest},{lastDate}` | Dati della serie attiva |

### Logica

```typescript
export async function updateStreak(
  apiKeyId: string
): Promise<{ current: number; longest: number; milestone: boolean }>;
```

1. Leggere il record della serie da `key_value`.
2. Analizzare `{current}`, `{longest}`, `{lastDate}` (stringa di data ISO).
3. Se `lastDate === today` — nessuna modifica (già conteggiata oggi).
4. Se `lastDate === yesterday` — incrementare `current`; aggiornare `longest` se necessario.
5. Se `lastDate < yesterday` — reimpostare `current = 1` (serie interrotta).
6. Scrivere il record aggiornato.
7. Controllare i traguardi: 7, 14, 30, 60, 90, 180, 365 giorni. Se ne viene superato uno, impostare
   `milestone = true` (il chiamante assegna gli XP e verifica i badge).

### Casi limite

- **Fuso orario**: le serie utilizzano date UTC (`new Date().toISOString().slice(0, 10)`).
  È una scelta intenzionale: un unico fuso orario canonico impedisce manipolazioni tramite
  cambi di fuso orario.
- **Nuovi utenti**: non esiste alcun record della serie; la prima richiesta lo crea con
  `current=1, longest=1, lastDate=today`.
- **Richieste multiple al giorno**: solo la prima richiesta del giorno UTC
  incrementa la serie.

---

## Classifica

**File:** `src/lib/gamification/leaderboard.ts`

### Ambiti

| Ambito          | Periodo | Descrizione                                        |
| --------------- | ------- | -------------------------------------------------- |
| `global`        | `all`   | XP cumulativi di tutti i tempi                     |
| `weekly`        | `week`  | XP ottenuti nella settimana UTC corrente (lun-dom) |
| `monthly`       | `month` | XP ottenuti nel mese UTC corrente                  |
| `tokens_shared` | `all`   | Token totali trasferiti ad altri                   |
| `contributions` | `all`   | Combo create + provider usati + skill usate        |

### Calcolo della posizione

Le posizioni vengono **calcolate al momento della lettura**, non archiviate. In questo modo si evitano dati obsoleti relativi alle posizioni
e viene eliminata la necessità di processi periodici di ricalcolo delle posizioni.

```typescript
export async function getLeaderboard(
  scope: LeaderboardScope,
  period: string,
  limit: number,
  offset: number
): Promise<{ entries: LeaderboardEntry[]; total: number }>;
```

Schema della query:

```sql
SELECT api_key_id, score,
       RANK() OVER (ORDER BY score DESC) as rank
FROM leaderboard
WHERE scope = ? AND period = ?
ORDER BY score DESC
LIMIT ? OFFSET ?
```

### Rotazione dei periodi

Le classifiche settimanali e mensili ruotano automaticamente:

1. **Archiviazione**: al termine del periodo, copiare le voci correnti in
   `leaderboard_archive` con l'etichetta del periodo.
2. **Reimpostazione**: eliminare le voci del periodo scaduto.
3. **Attivazione**: il controllo viene eseguito a ogni chiamata di `updateLeaderboard()`; la prima richiesta
   di un nuovo periodo attiva la rotazione.

Ciò garantisce che le classifiche settimanali vengano reimpostate ogni lunedì alle 00:00 UTC e quelle mensili
il 1° giorno di ogni mese.

### Aggiornamenti SSE in tempo reale

**Endpoint:** `GET /api/gamification/stream`

```
Client → GET /api/gamification/stream
  → Connessione SSE stabilita
  → Il server invia immediatamente un'istantanea dei primi 10 elementi della classifica
  → Ogni 5 secondi: invia i primi 10 elementi aggiornati, se sono cambiati
  → Ogni 15 secondi: commento heartbeat (": heartbeat\n\n")
  → Il client si disconnette → pulizia (rimozione del listener)
```

Formato degli eventi:

```
event: leaderboard
data: {"scope":"global","entries":[...]}

event: leaderboard
data: {"scope":"weekly","entries":[...]}

: heartbeat
```

Il gestore SSE tiene traccia dei client connessi per ciascun ambito e invia aggiornamenti
solo quando i dati della classifica sono effettivamente cambiati rispetto all'ultimo invio.

---

## Condivisione dei token

**File:** `src/lib/gamification/sharing.ts`

### Registro contabile a partita doppia

Ogni trasferimento crea due righe in `token_ledger`:

| Riga      | `from_key_id` | `to_key_id`  | `amount` |
| --------- | ------------- | ------------ | -------- |
| Addebito  | mittente      | destinatario | +importo |
| Accredito | destinatario  | mittente     | -importo |

Attenzione: la convenzione è:

| Riga      | `from_key_id` | `to_key_id`  | `amount` | Significato                 |
| --------- | ------------- | ------------ | -------- | --------------------------- |
| Invio     | mittente      | destinatario | +importo | Uscita dal mittente         |
| Ricezione | destinatario  | mittente     | +importo | Entrata per il destinatario |

Il saldo viene calcolato come segue:

```sql
SELECT
  COALESCE(SUM(CASE WHEN to_key_id = ? THEN amount ELSE 0 END), 0)
  - COALESCE(SUM(CASE WHEN from_key_id = ? THEN amount ELSE 0 END), 0)
  AS balance
FROM token_ledger
WHERE from_key_id = ? OR to_key_id = ?
```

### Flusso di trasferimento

```typescript
export async function transferTokens(
  fromKeyId: string,
  toKeyId: string,
  amount: number,
  idempotencyKey: string
): Promise<{ success: boolean; balance: number }>;
```

1. **Validazione**: `amount > 0`, `fromKeyId !== toKeyId`.
2. **Idempotenza**: verifica se `idempotency_key` esiste già nel registro.
   In caso affermativo, restituisce il risultato memorizzato nella cache.
3. **Transazione** (singola transazione SQLite):
   a. Calcola il saldo del mittente.
   b. Se `balance < amount`, interrompe l'operazione (fondi insufficienti).
   c. Inserisce la riga di invio (`from=sender,`.

### Limitazione della frequenza

- Massimo 10 trasferimenti al minuto per chiave API.
- Massimo 10.000 token per singolo trasferimento.
- Massimo 100.000 token trasferiti al giorno per chiave API.

---

## Token di invito e riscatto

**File:** `src/lib/gamification/invites.ts`

### Formato del codice

- **Codice**: alfanumerico di 8 caratteri (ad es. `A3K9-X7M2`), leggibile,
  mostrato all'utente.
- **Token**: token casuale di 32 byte, memorizzato come hash SHA-256. Utilizzato per
  il riscatto programmatico (ad es. link URL).

### Archiviazione

| Colonna      | Valore                            |
| ------------ | --------------------------------- |
| `code`       | `A3K9X7M2` (univoco, indicizzato) |
| `token_hash` | SHA-256(raw_token)                |

Il token non elaborato viene restituito all'utente una sola volta al momento della creazione. OmniRoute
non lo memorizza né lo mostra mai più: viene conservato solo l'hash.

### Prevenzione dell'auto-referral

Quando un utente riscatta un codice, il sistema verifica che:

1. Il codice appartenga a un `api_key_id` diverso.
2. L'utente che effettua il riscatto non abbia già riscattato alcun codice dello stesso
   referente (join su `invite_tokens` + registro dei riscatti).

Se uno dei controlli non viene superato, il riscatto viene rifiutato con un messaggio di errore chiaro.

### Scadenza e limiti

- `max_uses` predefinito: 10 (configurabile al momento della creazione).
- `expires_at` predefinito: 30 giorni dalla creazione.
- I codici scaduti o esauriti restituiscono HTTP 410 Gone.

---

## Federazione dei server della community

**File:** `src/lib/gamification/servers.ts`

### Connessione

Un server della community viene registrato tramite un token di invito emesso dal server remoto. L'istanza locale:

1. Riceve il token di invito (ad esempio, incollato nella dashboard).
2. Chiama `POST /api/gamification/federation/leaderboard` sul server remoto per convalidare il token e recuperare la classifica corrente.
3. Memorizza il record del server con `status: connected`.

### Modello di sincronizzazione

La federazione utilizza una **sincronizzazione con sovrascrittura**, non additiva:

```
Istanza locale                Server della community
     │                              │
     ├── invio punteggio ──────────►│  POST /federation/score
     │   { api_key_id, score }      │  (il server convalida l'hash del token)
     │                              │
     ├── recupero classifica ──────►│  GET /federation/leaderboard
     │◄── prime N voci ─────────────┤  (sovrascrive la cache locale)
     │                              │
     └── controllo integrità ──────►│  GET /federation/health
         (ogni 60 s, timeout 5 s)   │
```

### Autenticazione

Le richieste di federazione includono:

```
Authorization: Bearer <raw_token>
X-Federation-Version: 1
```

Il server remoto calcola l'hash del token e cerca la riga corrispondente in `community_servers`. In questo modo si evita di trasmettere l'hash memorizzato.

### Monitoraggio dell'integrità

Ogni record del server tiene traccia di:

| Campo       | Descrizione                                         |
| ----------- | --------------------------------------------------- |
| `status`    | `connected`, `degraded`, `unreachable`              |
| `last_sync` | Timestamp ISO dell'ultima sincronizzazione riuscita |
| `failures`  | Errori consecutivi del controllo di integrità       |

Dopo 5 errori consecutivi, lo stato passa a `unreachable` e la sincronizzazione viene sospesa finché un controllo manuale dell'integrità non ha esito positivo.

---

## Protezione anti-cheat

**File:** `src/lib/gamification/antiCheat.ts`

### Calcolo del punteggio lato server

Tutti i calcoli degli XP avvengono in `src/lib/gamification/xp.ts`. I client non inviano mai un punteggio: inviano azioni e il server calcola gli XP. La colonna `leaderboard.score` è scrivibile esclusivamente dal codice lato server.

### Limitazione della frequenza

| Limite                            | Valore  | Ambito            |
| --------------------------------- | ------- | ----------------- |
| XP massimi al minuto              | 1,000   | Per chiave API    |
| Trasferimenti massimi al min      | 10      | Per chiave API    |
| Importo massimo trasferibile      | 10,000  | Per trasferimento |
| Trasferimenti giornalieri massimi | 100,000 | Per chiave API    |

I limiti di frequenza utilizzano una finestra scorrevole in memoria (lo stesso modello di `RateLimitManager` in `open-sse/services/`). Se il processo viene riavviato, vengono utilizzati come fallback contatori basati su SQLite.

### Rilevamento delle anomalie tramite Z-score

Per ogni chiave API, il sistema mantiene una finestra mobile di 7 giorni degli XP guadagnati ogni ora. A ogni assegnazione di XP:

1. Calcola il tasso orario corrente di XP dell'utente.
2. Calcola la media e la deviazione standard della popolazione.
3. Calcola `z = (user_rate - mean) / stddev`.
4. Se `z > 3.0` (3 deviazioni standard), contrassegna l'evento come anomalia.

Le anomalie vengono registrate in `xp_audit_log` con `action = 'anomaly_detected'` e visualizzate nella dashboard di amministrazione.

### Registro di controllo

Ogni assegnazione di XP, trasferimento, ottenimento di badge e rilevamento di anomalie viene registrato in `xp_audit_log` con:

| Campo        | Descrizione                                            |
| ------------ | ------------------------------------------------------ |
| `api_key_id` | Chi                                                    |
| `action`     | Cosa è successo (xp_award, transfer, anomaly, …)       |
| `xp_awarded` | Quantità (0 per gli eventi non relativi agli XP)       |
| `metadata`   | JSON con il contesto (tipo di azione, destinazione, …) |
| `created_at` | Quando (ISO 8601)                                      |

Gli amministratori possono consultare l'intero registro di controllo tramite `GET /api/gamification/anomalies`.

---

## Route API

Tutte le route seguono il modello OmniRoute standard:

```
Route → Preflight CORS → Validazione del corpo (Zod) → Autenticazione (extractApiKey)
  → Gestore
```

### Endpoint

| Metodo | Percorso                                   | Descrizione                                             | Autenticazione |
| ------ | ------------------------------------------ | ------------------------------------------------------- | -------------- |
| GET    | `/api/gamification/leaderboard`            | Ottiene la classifica (ambito, periodo, paginazione)    | Facoltativa    |
| POST   | `/api/gamification/leaderboard`            | Forza l'aggiornamento della cache della classifica      | Obbligatoria   |
| GET    | `/api/gamification/stream`                 | Aggiornamenti della classifica in tempo reale via SSE   | Facoltativa    |
| GET    | `/api/gamification/transfer`               | Ottiene la cronologia dei trasferimenti (paginazione)   | Obbligatoria   |
| POST   | `/api/gamification/transfer`               | Invia token a un altro utente                           | Obbligatoria   |
| GET    | `/api/gamification/invite`                 | Elenca i miei codici di invito                          | Obbligatoria   |
| POST   | `/api/gamification/invite`                 | Genera un nuovo codice di invito                        | Obbligatoria   |
| DELETE | `/api/gamification/invite`                 | Revoca un codice di invito                              | Obbligatoria   |
| POST   | `/api/gamification/invite/redeem`          | Riscatta un codice di invito                            | Obbligatoria   |
| GET    | `/api/gamification/servers`                | Elenca i server della community                         | Obbligatoria   |
| POST   | `/api/gamification/servers`                | Si connette a un server della community                 | Obbligatoria   |
| DELETE | `/api/gamification/servers`                | Si disconnette da un server della community             | Obbligatoria   |
| POST   | `/api/gamification/federation/score`       | Invia il punteggio al server remoto                     | Federazione    |
| GET    | `/api/gamification/federation/leaderboard` | Recupera la classifica dal server remoto                | Federazione    |
| GET    | `/api/gamification/notifications`          | Notifiche SSE per badge e passaggi di livello           | Obbligatoria   |
| GET    | `/api/gamification/anomalies`              | Visualizza le segnalazioni di anomalie (amministratore) | Amministratore |
| POST   | `/api/gamification/rotate`                 | Ruota i segreti dei token di invito                     | Obbligatoria   |

### Esempi di richieste/risposte

**POST /api/gamification/transfer**

```json
// Richiesta
{
  "to": "recipient-api-key-id",
  "amount": 500,
  "idempotencyKey": "uuid-v4"
}

// Risposta 200
{
  "success": true,
  "transfer": {
    "id": "txn-uuid",
    "from": "sender-api-key-id",
    "to": "recipient-api-key-id",
    "amount": 500,
    "createdAt": "2026-05-19T12:00:00.000Z"
  },
  "balance": 2500
}

// Risposta 400 (fondi insufficienti)
{
  "error": "Saldo insufficiente",
  "balance": 200,
  "requested": 500
}
```

**GET /api/gamification/leaderboard?scope=weekly&limit=10**

```json
{
  "scope": "weekly",
  "period": "2026-W20",
  "entries": [
    {
      "rank": 1,
      "apiKeyId": "key-uuid",
      "displayName": "User***1234",
      "score": 15230,
      "level": 42,
      "title": "Esperto"
    }
  ],
  "total": 847,
  "updatedAt": "2026-05-19T12:00:00.000Z"
}
```

---

## Strumenti MCP (8)

Registrati in `open-sse/mcp-server/` insieme agli strumenti esistenti. Limitati all'ambito di autorizzazione
`gamification`.

| Strumento                  | Descrizione                                                | Schema di input              |           |
| -------------------------- | ---------------------------------------------------------- | ---------------------------- | --------- |
| `gamification_leaderboard` | Ottiene la classifica per un ambito/periodo                | `{ scope, period?, limit? }` |
| `gamification_rank`        | Ottiene la posizione del chiamante e quelle vicine         | `{ scope }`                  |
| `gamification_profile`     | Ottiene un riepilogo di XP, livello, titolo e serie        | `{}`                         |
| `gamification_badges`      | Elenca i badge ottenuti o tutte le definizioni             | `{ earned?: boolean }`       |
| `gamification_transfer`    | Invia token a un altro utente                              | `{ to, amount }`             |
| `gamification_invite`      | Genera o elenca codici di invito                           | `{ action: "create"          | "list" }` |
| `gamification_servers`     | Elenca o connette i server della community                 | `{ action, token? }`         |
| `gamification_anomalies`   | Visualizza i report sulle anomalie (ambito amministratore) | `{ limit?, since? }`         |

---

## Pagine della dashboard

### `/dashboard/leaderboard`

- Visualizzazione del podio (primi 3 con avatar e XP).
- Selettore dell'ambito: Globale / Settimanale / Mensile / Token condivisi / Contributi.
- Tabella impaginata (25 per pagina) con posizione, nome, punteggio, livello e titolo.
- Aggiornamenti SSE in tempo reale — i cambiamenti di posizione vengono animati.
- L'utente corrente è evidenziato nella tabella con una riga fissa "La tua posizione".

### `/dashboard/profile`

- Barra di avanzamento XP con il livello corrente e la soglia del livello successivo.
- Badge del titolo visualizzato in evidenza.
- Galleria dei badge — badge ottenuti con la data di ottenimento, badge non ottenuti disattivati
  (i badge nascosti mostrano "???" finché non vengono ottenuti).
- Contatore della serie con icona a forma di fiamma; calendario della serie (ultimi 30 giorni).
- Grafico della cronologia XP (XP giornalieri negli ultimi 30 giorni).

### `/dashboard/tokens`

- Saldo dei token (in evidenza, nella parte superiore della pagina).
- Modulo di trasferimento: destinatario, importo, finestra di conferma.
- Tabella della cronologia dei trasferimenti con filtri (inviati/ricevuti/tutti).
- Sezione inviti: codici attivi, generazione di nuovi codici, link di condivisione.
- Server della community: elenco con stato di integrità, connessione/disconnessione.

### `/dashboard/gamification/admin`

- Elenco delle anomalie con gravità, utente, timestamp e z-score.
- Visualizzatore del registro di controllo con filtri (tipo di azione, utente, intervallo di date).
- Statistiche di sistema: XP totali assegnati, utenti attivi, tassi di ottenimento dei badge.
- Panoramica dello stato dei server federati.

---

## Integrazione nella pipeline

### Punto di integrazione

La gamification si inserisce nella pipeline delle richieste in un unico punto in
`open-sse/handlers/chatCore.ts`:

```typescript
// Dopo l'invio della risposta al client:
setImmediate(() => {
  emitGamificationEvent({
    type: "request.completed",
    apiKeyId,
    metadata: {
      provider: selectedProvider,
      model: selectedModel,
      comboId: resolvedCombo?.id,
      compressionUsed: compressionStats?.applied,
      skillUsed: skillExecution?.name,
    },
  }).catch(() => {
    // Avvia e prosegui senza attendere: registra l'errore, ma non propagarlo mai al client
  });
});
```

### Tipi di evento

| Tipo di evento      | Quando viene emesso                                            |
| ------------------- | -------------------------------------------------------------- |
| `request.completed` | Risposta LLM inviata correttamente                             |
| `provider.switch`   | Provider cambiato (i fallback delle combo vengono conteggiati) |
| `combo.created`     | Nuova configurazione combo salvata                             |
| `combo.used`        | Destinazione della combo raggiunta correttamente               |
| `badge.earned`      | La valutazione dei badge ha trovato una corrispondenza         |
| `streak.milestone`  | Soglia della serie superata                                    |
| `transfer.sent`     | Trasferimento di token completato                              |
| `referral.redeemed` | Codice di invito riscattato correttamente                      |
| `compression.used`  | Compressione del prompt applicata                              |
| `skill.executed`    | Esecuzione della skill completata                              |
| `model.first_use`   | Modello non utilizzato negli ultimi 7 giorni                   |

### Garanzia di non blocco

Il pattern `setImmediate` + `.catch(() => {})` garantisce che:

1. La risposta venga inviata completamente prima dell'esecuzione della gamification.
2. Gli errori della gamification non vengano mai mostrati al client.
3. L'elaborazione dell'evento venga eseguita nella microtask successiva, non inline.

---

## Sicurezza

### Modello delle minacce

| Minaccia                          | Mitigazione                                                                   |
| --------------------------------- | ----------------------------------------------------------------------------- |
| Aumento artificiale dei punteggi  | Calcolo degli XP solo lato server; i client inviano azioni, non punteggi      |
| Attacchi di replay                | Chiavi di idempotenza sui trasferimenti; deduplicazione del registro di audit |
| Frode nei trasferimenti           | Registro a partita doppia; transazioni atomiche; limiti di frequenza          |
| Auto-referenza                    | Verifica incrociata di `api_key_id` al momento del riscatto                   |
| Manipolazione della classifica    | Rilevamento delle anomalie tramite Z-score; dashboard amministrativa anomalie |
| Furto del token di federazione    | Archiviazione con hash SHA-256; il token grezzo viene mostrato una sola volta |
| Forzatura bruta dei codici invito | Limite di frequenza sull'endpoint di riscatto; entropia di 8 caratteri        |
| XSS nei nomi visualizzati         | Nomi visualizzati sanitizzati; voci della classifica sottoposte a escape      |
| Attacchi temporali agli hash      | `crypto.timingSafeEqual` per il confronto degli hash dei token                |

### Requisiti di autenticazione

- **Pubblico** (senza autenticazione): `GET /leaderboard`, `GET /stream` (classifiche
  in sola lettura).
- **Chiave API richiesta**: tutte le operazioni di scrittura, profilo, trasferimenti, inviti.
- **Solo amministratori**: dashboard delle anomalie, visualizzatore del registro di audit.
- **Federazione**: percorso di autenticazione separato che utilizza il token grezzo
  nell'header `Authorization`, convalidato rispetto all'hash SHA-256 archiviato.

---

## Test

### File di test

Tutti i test utilizzano il test runner nativo di Node.js (`node --import tsx/esm --test`).

| File di test                                  | Ambiti coperti                                       | Test |
| --------------------------------------------- | ---------------------------------------------------- | ---- |
| `tests/unit/gamification/xp.test.ts`          | Calcolo degli XP, curva dei livelli, titoli          | 8    |
| `tests/unit/gamification/badges.test.ts`      | Corrispondenza dei criteri dei badge, assegnazione   | 10   |
| `tests/unit/gamification/streaks.test.ts`     | Logica delle serie, traguardi, casi limite           | 7    |
| `tests/unit/gamification/leaderboard.test.ts` | Calcolo della posizione, paginazione, rotazione      | 8    |
| `tests/unit/gamification/sharing.test.ts`     | Trasferimenti, saldo, idempotenza                    | 9    |
| `tests/unit/gamification/invites.test.ts`     | Creazione, riscatto, scadenza, auto-referenza        | 7    |
| `tests/unit/gamification/antiCheat.test.ts`   | Limiti di frequenza, Z-score, registrazione di audit | 6    |
| `tests/unit/gamification/events.test.ts`      | Emissione eventi, fan-out, gestione degli errori     | 5    |

### Esecuzione dei test

```bash
# Tutti i test di gamification
node --import tsx/esm --test tests/unit/gamification/*.test.ts

# Singolo file di test
node --import tsx/esm --test tests/unit/gamification/xp.test.ts
```

### Requisiti di copertura

Come indicato in `CONTRIBUTING.md`, tutti i nuovi moduli devono avere:

- Copertura dei rami >= 80%.
- Ogni funzione pubblica testata almeno una volta.
- Percorsi di errore testati (saldo insufficiente, codici scaduti, limiti di frequenza).

---

## Struttura dei file

```
src/
  lib/
    db/
      migrations/
        060_create_gamification.sql    # Tutte le 8 tabelle + indici
      gamification.ts                  # Modulo CRUD del dominio
    gamification/
      xp.ts                           # Calcolo degli XP, curva dei livelli, titoli
      badges.ts                       # Definizioni, criteri e valutazione dei badge
      streaks.ts                      # Monitoraggio delle serie giornaliere
      leaderboard.ts                  # Calcolo della posizione, SSE, rotazione
      antiCheat.ts                    # Limitazione della frequenza, z-score, audit
      sharing.ts                      # Registro dei trasferimenti di token
      invites.ts                      # Codici di invito/riscatto
      servers.ts                      # Federazione dei server della community
      events.ts                       # Emettitore di eventi (punto di integrazione)
      notifications.ts                # Flusso di notifiche SSE
  app/
    api/
      gamification/
        leaderboard/route.ts          # GET/POST della classifica
        leaderboard/stream/route.ts   # Aggiornamenti in tempo reale tramite SSE
        transfer/route.ts             # GET/POST dei trasferimenti
        invite/route.ts               # GET/POST/DELETE dei codici di invito
        invite/redeem/route.ts        # POST per riscattare un codice
        servers/route.ts              # GET/POST/DELETE dei server
        federation/score/route.ts     # POST per inviare il punteggio
        federation/leaderboard/route.ts # GET per recuperare la classifica
        notifications/route.ts        # Notifiche SSE
        anomalies/route.ts            # GET dei report sulle anomalie
        rotate/route.ts               # POST per ruotare i segreti
    (dashboard)/
      dashboard/
        leaderboard/page.tsx           # Pagina delle classifiche
        profile/page.tsx               # Pagina di XP/badge/serie
        tokens/page.tsx                # Pagina di saldo/trasferimenti/inviti
        gamification/admin/page.tsx    # Monitoraggio amministrativo delle anomalie
  shared/
    constants/
      gamification.ts                  # XP_REWARDS, TITLES, BADGE_DEFS, LIMITS

tests/
  unit/
    gamification/
      xp.test.ts
      badges.test.ts
      streaks.test.ts
      leaderboard.test.ts
      sharing.test.ts
      invites.test.ts
      antiCheat.test.ts
      events.test.ts

docs/
  frameworks/
    GAMIFICATION.md                    # Questo documento
```

---

## Strategia di migrazione

### Fase 1: Core del backend (PR 1)

- Migrazione `060_create_gamification.sql` (8 tabelle).
- `src/lib/db/gamification.ts` (modulo del dominio).
- `src/lib/gamification/xp.ts`, `streaks.ts`, `events.ts`.
- Punto di integrazione in `chatCore.ts`.
- Test unitari per XP, serie ed eventi.

### Fase 2: Badge e classifica (PR 2)

- `src/lib/gamification/badges.ts`, `leaderboard.ts`.
- Definizioni dei badge nelle costanti.
- Route API della classifica + flusso SSE.
- Test unitari per badge e classifica.

### Fase 3: Condivisione e inviti (PR 3)

- `src/lib/gamification/sharing.ts`, `invites.ts`, `antiCheat.ts`.
- Route API per trasferimenti e inviti.
- Test unitari per condivisione, inviti e anti-cheat.

### Fase 4: Federazione e dashboard (PR 4)

- `src/lib/gamification/servers.ts`, `notifications.ts`.
- Route API della federazione.
- Pagine della dashboard (classifica, profilo, token, amministrazione).
- Registrazione degli strumenti MCP.

---

## Considerazioni future

- **Eventi stagionali**: set di badge disponibili per un periodo limitato e stagioni delle classifiche.
- **Classifiche a squadre**: raggruppamento degli utenti per organizzazione o combo.
- **Moltiplicatori di XP**: incremento degli XP durante i periodi promozionali.
- **Condivisione dei traguardi**: generazione di schede dei badge condivisibili (immagini OpenGraph).
- **Notifiche push su dispositivi mobili**: notifiche basate su webhook per eventi relativi a badge/livelli.
- **API della classifica**: API pubblica per integrazioni di terze parti.
