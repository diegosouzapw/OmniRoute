# Gamification & Leaderboard System (Deutsch)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/GAMIFICATION.md) · 🇪🇹 [am](../../../am/docs/frameworks/GAMIFICATION.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/GAMIFICATION.md) · 🇦🇿 [az](../../../az/docs/frameworks/GAMIFICATION.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/GAMIFICATION.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/GAMIFICATION.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/GAMIFICATION.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/GAMIFICATION.md) · 🇩🇰 [da](../../../da/docs/frameworks/GAMIFICATION.md) · 🇬🇷 [el](../../../el/docs/frameworks/GAMIFICATION.md) · 🇪🇸 [es](../../../es/docs/frameworks/GAMIFICATION.md) · 🇪🇪 [et](../../../et/docs/frameworks/GAMIFICATION.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/GAMIFICATION.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/GAMIFICATION.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/GAMIFICATION.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/GAMIFICATION.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/GAMIFICATION.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/GAMIFICATION.md) · 🇮🇱 [he](../../../he/docs/frameworks/GAMIFICATION.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/GAMIFICATION.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/GAMIFICATION.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/GAMIFICATION.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/GAMIFICATION.md) · 🇮🇩 [id](../../../id/docs/frameworks/GAMIFICATION.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/GAMIFICATION.md) · 🇮🇹 [it](../../../it/docs/frameworks/GAMIFICATION.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/GAMIFICATION.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/GAMIFICATION.md) · 🇰🇭 [km](../../../km/docs/frameworks/GAMIFICATION.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/GAMIFICATION.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/GAMIFICATION.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/GAMIFICATION.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/GAMIFICATION.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/GAMIFICATION.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/GAMIFICATION.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/GAMIFICATION.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/GAMIFICATION.md) · 🇲🇲 [my](../../../my/docs/frameworks/GAMIFICATION.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/GAMIFICATION.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/GAMIFICATION.md) · 🇳🇴 [no](../../../no/docs/frameworks/GAMIFICATION.md) · 🇮🇳 [or](../../../or/docs/frameworks/GAMIFICATION.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/GAMIFICATION.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/GAMIFICATION.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/GAMIFICATION.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/GAMIFICATION.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/GAMIFICATION.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/GAMIFICATION.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/GAMIFICATION.md) · 🇱🇰 [si](../../../si/docs/frameworks/GAMIFICATION.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/GAMIFICATION.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/GAMIFICATION.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/GAMIFICATION.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/GAMIFICATION.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/GAMIFICATION.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/GAMIFICATION.md) · 🇮🇳 [te](../../../te/docs/frameworks/GAMIFICATION.md) · 🇹🇭 [th](../../../th/docs/frameworks/GAMIFICATION.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/GAMIFICATION.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/GAMIFICATION.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/GAMIFICATION.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/GAMIFICATION.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/GAMIFICATION.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/GAMIFICATION.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/GAMIFICATION.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/GAMIFICATION.md)

---

> **Maßgebliche Quelle:** `src/lib/gamification/`, `src/lib/db/gamification.ts`, `src/app/api/gamification/`
> **Zuletzt aktualisiert:** 2026-06-28 — v3.8.40

OmniRoute enthält eine Local-First-Gamification-Schicht, die Benutzer für die
Interaktion mit der Plattform belohnt — für das Stellen von Anfragen, den
Wechsel von Anbietern, das Erstellen von Combos, das Teilen von Tokens und
Beiträge zur Community. Der gesamte Zustand wird in SQLite gespeichert; die
Föderation mit Community-Servern ist optional und Push-basiert.

Das System ist so konzipiert, dass es im kritischen Ausführungspfad **keine
Latenz verursacht** — Gamification-Ereignisse werden nach dem Fire-and-Forget-
Prinzip aus der Anfrage-Pipeline ausgelöst und blockieren niemals eine
LLM-Antwort.

---

## Überblick

### Zweck

Steigerung der Benutzerinteraktion und -bindung durch sichtbaren Fortschritt
(XP, Level, Abzeichen), soziale Bestätigung (Bestenlisten) und wirtschaftliche
Anreize (Teilen von Tokens, Einladungsbelohnungen).

### Umfang

| Funktion              | Beschreibung                                                              |
| --------------------- | ------------------------------------------------------------------------- |
| XP und Level          | XP pro Aktion verdienen; Levelaufstieg entlang einer polynomialen Kurve   |
| Abzeichen             | Mehr als 20 Erfolge in 5 Kategorien mit 4 Seltenheitsstufen               |
| Serien                | Verfolgung der täglichen aktiven Nutzung mit aktueller/längster Serie     |
| Bestenlisten          | Globale, wöchentliche, monatliche, Token-Sharing- und Beitragskategorien  |
| Token-Sharing         | Übertragung von Guthaben zwischen Benutzern über ein doppisches Hauptbuch |
| Einladen und Einlösen | Empfehlungscodes mit SHA-256-gehashtem Speicher                           |
| Community-Server      | Föderation mit externen OmniRoute-Instanzen                               |
| Betrugsschutz         | Serverseitige Punktevergabe, Ratenbegrenzung, Z-Score-Anomalieerkennung   |

### Designprinzipien

1. **Local-First** — der gesamte Zustand befindet sich in SQLite; es sind keine
   externen Dienste erforderlich.
2. **Nicht blockierend** — Ereignisse werden nach dem Fire-and-Forget-Prinzip
   verarbeitet; der LLM-Antwortpfad wird niemals durch Gamification-Logik
   verzögert.
3. **Serverautoritativ** — XP werden ausschließlich serverseitig berechnet;
   Clients können Punktzahlen nicht künstlich erhöhen.
4. **Datenschutzfreundlich** — die Teilnahme an Bestenlisten ist optional;
   Benutzer können ihr Profil ausblenden.
5. **Für Föderation ausgelegt** — Community-Server können Punktzahlen über eine
   signierte API übertragen; die Synchronisierung überschreibt bestehende Werte,
   statt sie zu addieren.

---

## Architektur

### Ablauf auf hoher Ebene

```
Client-Anfrage
  → /v1/chat/completions
    → handleChatCore()                      [open-sse/handlers/chatCore.ts]
      → ... (bestehende Pipeline) ...
      → Upstream-Antwort an den Client gesendet
      → setImmediate (Fire-and-Forget):
        → emitGamificationEvent()           [src/lib/gamification/events.ts]
          → awardXp()                       [src/lib/gamification/xp.ts]
          → updateStreak()                  [src/lib/gamification/streaks.ts]
          → evaluateBadges()                [src/lib/gamification/badges.ts]
          → updateLeaderboard()             [src/lib/gamification/leaderboard.ts]
          → checkAnomalies()                [src/lib/gamification/antiCheat.ts]
```

Der Ereignis-Emitter ist der einzige Integrationspunkt. `chatCore.ts` ruft
`emitGamificationEvent()` auf, nachdem die Antwort gesendet wurde; das
Ereignismodul verteilt die Verarbeitung auf die Subsysteme für XP, Serien,
Abzeichen, Bestenlisten und Betrugsschutz.

### Modulabhängigkeitsgraph

```
src/lib/gamification/
  events.ts          ← Einstiegspunkt (aufgerufen von chatCore.ts)
    ├── xp.ts        ← XP-Berechnung und Levelermittlung
    ├── streaks.ts   ← Verfolgung täglicher Aktivitätsserien
    ├── badges.ts    ← Auswertung der Abzeichenkriterien
    ├── leaderboard.ts ← Rangberechnung und SSE-Übertragung
    ├── antiCheat.ts ← Ratenbegrenzung und Anomalieerkennung
    ├── sharing.ts   ← Hauptbuch für Token-Übertragungen
    ├── invites.ts   ← Verwaltung von Einladungs-/Einlösecodes
    ├── servers.ts   ← Föderation von Community-Servern
    └── notifications.ts ← SSE-Benachrichtigungsstream

src/lib/db/
  gamification.ts    ← alle CRUD-Operationen (8 Tabellen)

src/app/api/gamification/
  leaderboard/       ← GET-Ranglisten, POST zur manuellen Aktualisierung
  leaderboard/stream ← SSE-Echtzeitaktualisierungen
  transfer/          ← GET für Verlauf, POST zum Senden von Tokens
  invite/            ← GET/POST für Codes, DELETE zum Widerrufen
  invite/redeem/     ← POST zum Einlösen eines Codes
  servers/           ← GET/POST/DELETE für Community-Server
  federation/score/  ← POST zum Übertragen der Punktzahl an den Server
  federation/leaderboard/ ← GET zum Abrufen der Bestenliste vom Server
  notifications/     ← SSE-Benachrichtigungen für Abzeichen/Levelaufstiege
  anomalies/         ← GET für Anomalieberichte (Administrator)
  rotate/            ← POST zum Rotieren geheimer Einladungstoken
```

---

## Datenschicht

### Datenbanktabellen

Alle Tabellen befinden sich in der durch die Migration
`060_create_gamification.sql` erstellten OmniRoute-Hauptdatenbank unter SQLite. Die WAL-Protokollierung wird von der Singleton-Instanz
`getDbInstance()` in `src/lib/db/core.ts` übernommen.

```
┌─────────────────────────┐     ┌──────────────────────────┐
│      leaderboard        │     │      user_levels         │
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
│     user_badges         │     │    badge_definitions     │
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

### Domänenmodul: `src/lib/db/gamification.ts`

Folgt dem standardmäßigen OmniRoute-Muster — importiert `getDbInstance()` aus
`core.ts` und exportiert typisierte CRUD-Funktionen. Kein unformatiertes SQL in Route-Handlern.

Wichtige Funktionen:

| Funktion                   | Beschreibung                                                            |
| -------------------------- | ----------------------------------------------------------------------- |
| `upsertLeaderboardEntry()` | Punktestand für (api_key_id, scope, period) einfügen oder aktualisieren |
| `getLeaderboard()`         | Paginierte Rangliste für einen bestimmten Bereich/Zeitraum              |
| `getUserLevel()`           | Datensatz zur Benutzerstufe abrufen oder erstellen                      |
| `updateUserLevel()`        | XP, Stufe und Titel atomar festlegen                                    |
| `getBadgeDefinitions()`    | Alle Abzeichendefinitionen (optional gefiltert)                         |
| `getUserBadges()`          | Von einem Benutzer verdiente Abzeichen                                  |
| `awardBadge()`             | Erhalt eines Abzeichens einfügen (idempotent anhand von badge_id)       |
| `logXpAction()`            | An xp_audit_log anhängen                                                |
| `getXpAuditLog()`          | Paginierter Auditverlauf für einen Benutzer                             |
| `insertLedgerEntry()`      | Doppelte Buchung einer Übertragung (innerhalb einer Transaktion)        |
| `getBalance()`             | Summe der empfangenen abzüglich der gesendeten Beträge eines Benutzers  |
| `getTransferHistory()`     | Paginierter Übertragungsverlauf                                         |
| `createInviteToken()`      | Einladungscode und gehashtes Token einfügen                             |
| `redeemInviteToken()`      | Nach Code suchen, validieren und Nutzungszähler erhöhen                 |
| `upsertCommunityServer()`  | Föderationsserver registrieren oder aktualisieren                       |
| `getCommunityServers()`    | Server eines Benutzers auflisten                                        |
| `deleteCommunityServer()`  | Serverregistrierung entfernen                                           |

---

## XP-/Level-System

**Datei:** `src/lib/gamification/xp.ts`

### Level-Kurve

Die zum Erreichen von Level `n` erforderlichen XP folgen einer polynomialen Kurve:

```
xp_for_level(n) = floor(100 * n^1.5)
```

| Level | XP bis zum nächsten Level | Kumulative XP | Titel     |
| ----- | ------------------------- | ------------- | --------- |
| 1     | 100                       | 100           | Anfänger  |
| 5     | 1,118                     | 2,415         | Anfänger  |
| 10    | 3,162                     | 10,523        | Entdecker |
| 25    | 12,500                    | 86,024        | Entdecker |
| 50    | 35,355                    | 345,529       | Experte   |
| 75    | 64,952                    | 948,683       | Meister   |
| 100   | 100,000                   | 2,050,000     | Legende   |

### Titel

| Level-Bereich | Titel     |
| ------------- | --------- |
| 1 – 9         | Anfänger  |
| 10 – 24       | Entdecker |
| 25 – 49       | Experte   |
| 50 – 74       | Meister   |
| 75 – 100      | Legende   |

### XP-Belohnungen

| Aktion            | XP  | Beschreibung                                                             |
| ----------------- | --- | ------------------------------------------------------------------------ |
| `request`         | 1   | Pro über OmniRoute weitergeleiteter API-Anfrage                          |
| `provider_switch` | 5   | Wechsel zu einem anderen Anbieter                                        |
| `model_switch`    | 3   | Wechsel zu einem anderen Modell                                          |
| `combo_create`    | 10  | Erstellen einer neuen Kombination                                        |
| `combo_use`       | 2   | Verwenden einer Kombination für eine Anfrage                             |
| `token_share`     | 1   | Pro 1 000 mit einem anderen Benutzer geteilten Token                     |
| `invite_redeem`   | 50  | Einlösen eines Einladungscodes                                           |
| `daily_login`     | 5   | Tägliche aktive Nutzung (einmal pro Tag)                                 |
| `streak_bonus`    | 2   | Pro aufeinanderfolgendem Streak-Tag (mit der Streak-Länge multipliziert) |
| `badge_unlock`    | 10  | Freischalten eines Abzeichens                                            |

### Vergabeablauf

```typescript
export async function awardXp(
  apiKeyId: string,
  action: XpAction,
  metadata?: Record<string, unknown>
): Promise<{ xp: number; level: number; title: string; levelUp: boolean }>;
```

1. `XP_REWARDS[action]` nachschlagen, um den XP-Betrag zu erhalten.
2. Durch `checkRateLimit()` leiten (Anti-Cheat: max. 1000 XP/min pro Schlüssel).
3. Eine Transaktion öffnen:
   - Aktuelle Zeile aus `user_levels` lesen.
   - XP addieren; Level über `levelFromXp(totalXp)` neu berechnen.
   - Falls sich das Level geändert hat, `levelUp = true` setzen.
   - Zeile in `user_levels` aktualisieren.
   - Eintrag in `xp_audit_log` einfügen.
4. Das Ergebnis zurückgeben. Der Aufrufer verarbeitet Benachrichtigungen.

### Hilfsfunktion: `levelFromXp(totalXp)`

Iteriert über die Level 1..100 und summiert `xp_for_level(n)`, bis die kumulativen XP
`totalXp` überschreiten. Gibt das höchste Level zurück, dessen Schwellenwert erreicht wurde.
Dies ist O(100) — akzeptabel, da Level auf 100 begrenzt sind.

---

## Abzeichensystem

**Datei:** `src/lib/gamification/badges.ts`

### Kategorien

| Kategorie      | Beschreibung                               | Beispielabzeichen                         |
| -------------- | ------------------------------------------ | ----------------------------------------- |
| `usage`        | Volumenbasierte Meilensteine               | Erste Anfrage, 1K Anfragen, 100K          |
| `sharing`      | Teilen von Token und Empfehlungen          | Erstes Teilen, Großzügig (10-mal geteilt) |
| `contribution` | Community-Engagement                       | Kombinationsersteller, Anbieterentdecker  |
| `streak`       | Beständigkeit über längere Zeit            | Wochenkrieger, Monatlich Engagierter      |
| `rare`         | Schwer erreichbare oder verborgene Erfolge | Früher Anwender, Fehlermelder             |

### Seltenheitsgrade

| Seltenheit  | Farbe | Wahrscheinlichkeitshinweis |
| ----------- | ----- | -------------------------- |
| `common`    | Grau  | Die meisten Benutzer       |
| `uncommon`  | Grün  | Aktive Benutzer            |
| `rare`      | Blau  | Engagierte Benutzer        |
| `legendary` | Gold  | Oberste 1 %                |

### Kriterientypen

| Typ            | Feld         | Beschreibung                                                 |
| -------------- | ------------ | ------------------------------------------------------------ |
| `action_count` | `count`      | Aktion N-mal ausführen (z. B. 1000 Anfragen)                 |
| `streak`       | `days`       | Streak für N aufeinanderfolgende Tage beibehalten            |
| `unique_count` | `field`, `n` | N eindeutige Werte verwenden (z. B. 10 verschiedene Modelle) |
| `rank`         | `scope`, `n` | Rang N in einem Bestenlistenbereich erreichen                |
| `first`        | —            | Als Erster eine Aktion ausführen                             |
| `hidden`       | (variiert)   | Kriterien werden erst nach Erhalt angezeigt                  |

Abzeichendefinitionen werden in `badge_definitions` als JSON-`criteria` gespeichert:

```json
{
  "type": "action_count",
  "action": "request",
  "count": 1000
}
```

### Auswertungsablauf

```
emitGamificationEvent(event)
  → evaluateBadges(apiKeyId, event)
    → getBadgeDefinitions()           # alle Definitionen
    → getUserBadges(apiKeyId)         # bereits erhalten (überspringen)
    → für jedes noch nicht erhaltene Abzeichen:
       → matchesCriteria(badge, event, userState)
       → bei Übereinstimmung: awardBadge(apiKeyId, badgeId)
         → Benachrichtigungs-Payload zurückgeben
```

Die Auswertung ist **ereignisgesteuert** — sie wird nach jedem Gamification-Ereignis ausgeführt, prüft jedoch
nur Abzeichen, deren `criteria.type` mit der Ereignisaktion übereinstimmt. Dadurch
bleibt die Auswertung schnell (< 5 ms für die meisten Ereignisse).

### `matchesCriteria(badge, event, userState)`

| Kriterientyp   | Prüfung                                                         |
| -------------- | --------------------------------------------------------------- |
| `action_count` | `getActionCount(apiKeyId, action) >= count`                     |
| `streak`       | `getCurrentStreak(apiKeyId) >= days`                            |
| `unique_count` | `getUniqueCount(apiKeyId, field) >= n`                          |
| `rank`         | `getRank(apiKeyId, scope) <= n`                                 |
| `first`        | Kein vorheriger Eintrag in `xp_audit_log` für diesen Aktionstyp |
| `hidden`       | Delegiert an die entsprechende Unterprüfung                     |

### Integrierte Abzeichen (20+)

<details>
<summary>Vollständige Abzeichenliste</summary>

| Abzeichen           | Kategorie | Seltenheit   | Kriterien                          |
| ------------------- | --------- | ------------ | ---------------------------------- |
| Erste Schritte      | Nutzung   | gewöhnlich   | 1 Anfrage                          |
| Aufwärmphase        | Nutzung   | gewöhnlich   | 100 Anfragen                       |
| Power-User          | Nutzung   | ungewöhnlich | 1.000 Anfragen                     |
| Zenturio            | Nutzung   | selten       | 10.000 Anfragen                    |
| OmniPower           | Nutzung   | legendär     | 100.000 Anfragen                   |
| Anbieter-Hopper     | Beitrag   | gewöhnlich   | 5 verschiedene Anbieter verwenden  |
| Anbieter-Meister    | Beitrag   | ungewöhnlich | 20 verschiedene Anbieter verwenden |
| Combo-Architekt     | Beitrag   | ungewöhnlich | 5 Combos erstellen                 |
| Combo-Großmeister   | Beitrag   | selten       | 25 Combos erstellen                |
| Erstes Teilen       | Teilen    | gewöhnlich   | 1 Token-Übertragung                |
| Großzügig           | Teilen    | ungewöhnlich | 10 Token-Übertragungen             |
| Philanthrop         | Teilen    | selten       | Insgesamt 10.000 Token übertragen  |
| Empfehlungsgeber    | Teilen    | gewöhnlich   | 1 erfolgreiche Empfehlung          |
| Netzwerk-Builder    | Teilen    | ungewöhnlich | 10 erfolgreiche Empfehlungen       |
| Wochenkrieger       | Serie     | ungewöhnlich | 7-tägige Serie                     |
| Monatlich treu      | Serie     | selten       | 30-tägige Serie                    |
| Unaufhaltsam        | Serie     | legendär     | 365-tägige Serie                   |
| Frühanwender        | selten    | legendär     | Während der Betaphase beitreten    |
| Kompressionspionier | selten    | ungewöhnlich | Komprimierung 100-mal verwenden    |
| Skill-Sammler       | selten    | selten       | 10 verschiedene Skills verwenden   |
| Modell-Entdecker    | Beitrag   | ungewöhnlich | 15 verschiedene Modelle verwenden  |

</details>

---

## Streak-Tracker

**Datei:** `src/lib/gamification/streaks.ts`

### Datenmodell

Streaks werden in der Tabelle `key_value` (gemeinsam genutzte Hilfstabelle) unter
Namensraum-Schlüsseln gespeichert:

| Schlüssel                     | Wert                             | Beschreibung        |
| ----------------------------- | -------------------------------- | ------------------- |
| `gamification:streak:{keyId}` | `{current},{longest},{lastDate}` | Aktive Streak-Daten |

### Logik

```typescript
export async function updateStreak(
  apiKeyId: string
): Promise<{ current: number; longest: number; milestone: boolean }>;
```

1. Streak-Datensatz aus `key_value` lesen.
2. `{current}`, `{longest}`, `{lastDate}` (ISO-Datumszeichenfolge) parsen.
3. Wenn `lastDate === today` — keine Änderung (heute bereits gezählt).
4. Wenn `lastDate === yesterday` — `current` erhöhen; `longest` bei Bedarf aktualisieren.
5. Wenn `lastDate < yesterday` — `current = 1` zurücksetzen (Streak unterbrochen).
6. Aktualisierten Datensatz schreiben.
7. Meilensteine prüfen: 7, 14, 30, 60, 90, 180, 365 Tage. Wenn einer überschritten wird,
   `milestone = true` setzen (der Aufrufer vergibt XP und prüft Badges).

### Sonderfälle

- **Zeitzone**: Streaks verwenden UTC-Datumswerte (`new Date().toISOString().slice(0, 10)`).
  Dies ist beabsichtigt — eine einzige kanonische Zeitzone verhindert Manipulationen
  durch Zeitzonenwechsel.
- **Neue Benutzer**: Es existiert kein Streak-Datensatz; die erste Anfrage erstellt ihn mit
  `current=1, longest=1, lastDate=today`.
- **Mehrere Anfragen pro Tag**: Nur die erste Anfrage des UTC-Tages
  erhöht den Streak.

---

## Bestenliste

**Datei:** `src/lib/gamification/leaderboard.ts`

### Bereiche

| Bereich         | Zeitraum | Beschreibung                                               |
| --------------- | -------- | ---------------------------------------------------------- |
| `global`        | `all`    | Kumulative XP über den gesamten Zeitraum                   |
| `weekly`        | `week`   | In der aktuellen UTC-Woche verdiente XP (Mo–So)            |
| `monthly`       | `month`  | Im aktuellen UTC-Monat verdiente XP                        |
| `tokens_shared` | `all`    | Gesamtzahl der an andere übertragenen Token                |
| `contributions` | `all`    | Erstellte Combos + verwendete Provider + verwendete Skills |

### Rangberechnung

Ränge werden **zum Zeitpunkt des Lesens berechnet** und nicht gespeichert. Dadurch werden veraltete Rangdaten
vermieden und regelmäßige Jobs zur Neuberechnung der Ränge überflüssig.

```typescript
export async function getLeaderboard(
  scope: LeaderboardScope,
  period: string,
  limit: number,
  offset: number
): Promise<{ entries: LeaderboardEntry[]; total: number }>;
```

Abfragemuster:

```sql
SELECT api_key_id, score,
       RANK() OVER (ORDER BY score DESC) as rank
FROM leaderboard
WHERE scope = ? AND period = ?
ORDER BY score DESC
LIMIT ? OFFSET ?
```

### Periodenrotation

Wöchentliche und monatliche Bestenlisten rotieren automatisch:

1. **Archivierung**: An der Periodengrenze werden die aktuellen Einträge mit der Periodenbezeichnung nach
   `leaderboard_archive` kopiert.
2. **Zurücksetzen**: Einträge für die abgelaufene Periode werden gelöscht.
3. **Auslöser**: Wird bei jedem Aufruf von `updateLeaderboard()` geprüft; die erste Anfrage
   einer neuen Periode löst die Rotation aus.

Dadurch wird sichergestellt, dass wöchentliche Bestenlisten jeden Montag um 00:00 Uhr UTC und monatliche Bestenlisten
am 1. jedes Monats zurückgesetzt werden.

### SSE-Echtzeitaktualisierungen

**Endpunkt:** `GET /api/gamification/stream`

```
Client → GET /api/gamification/stream
  → SSE-Verbindung wird hergestellt
  → Server sendet sofort eine Momentaufnahme der Top 10 der Bestenliste
  → Alle 5 Sekunden: aktualisierte Top 10 senden, falls geändert
  → Alle 15 Sekunden: Heartbeat-Kommentar (": heartbeat\n\n")
  → Client trennt die Verbindung → Bereinigung (Listener entfernen)
```

Ereignisformat:

```
event: leaderboard
data: {"scope":"global","entries":[...]}

event: leaderboard
data: {"scope":"weekly","entries":[...]}

: heartbeat
```

Der SSE-Manager verfolgt die verbundenen Clients pro Bereich und sendet Aktualisierungen nur,
wenn sich die Bestenlistendaten seit der letzten Übertragung tatsächlich geändert haben.

---

## Token-Weitergabe

**Datei:** `src/lib/gamification/sharing.ts`

### Doppelte Buchführung

Jede Übertragung erstellt zwei Zeilen in `token_ledger`:

| Zeile      | `from_key_id` | `to_key_id` | `amount` |
| ---------- | ------------- | ----------- | -------- |
| Belastung  | Absender      | Empfänger   | +Betrag  |
| Gutschrift | Empfänger     | Absender    | -Betrag  |

Moment — die Konvention lautet:

| Zeile   | `from_key_id` | `to_key_id` | `amount` | Bedeutung              |
| ------- | ------------- | ----------- | -------- | ---------------------- |
| Senden  | Absender      | Empfänger   | +Betrag  | Abfluss beim Absender  |
| Empfang | Empfänger     | Absender    | +Betrag  | Zufluss beim Empfänger |

Der Kontostand wird wie folgt berechnet:

```sql
SELECT
  COALESCE(SUM(CASE WHEN to_key_id = ? THEN amount ELSE 0 END), 0)
  - COALESCE(SUM(CASE WHEN from_key_id = ? THEN amount ELSE 0 END), 0)
  AS balance
FROM token_ledger
WHERE from_key_id = ? OR to_key_id = ?
```

### Übertragungsablauf

```typescript
export async function transferTokens(
  fromKeyId: string,
  toKeyId: string,
  amount: number,
  idempotencyKey: string
): Promise<{ success: boolean; balance: number }>;
```

1. **Validierung**: `amount > 0`, `fromKeyId !== toKeyId`.
2. **Idempotenz**: Prüfen, ob `idempotency_key` bereits im Ledger vorhanden ist.
   Falls ja, das zwischengespeicherte Ergebnis zurückgeben.
3. **Transaktion** (einzelne SQLite-Transaktion):
   a. Kontostand des Absenders berechnen.
   b. Falls `balance < amount`, abbrechen (unzureichendes Guthaben).
   c. Sendezeile einfügen (`from=sender,` zurückgeben.

### Ratenbegrenzung

- Max. 10 Übertragungen pro Minute und API-Schlüssel.
- Max. 10.000 Token pro einzelner Übertragung.
- Max. 100.000 übertragene Token pro Tag und API-Schlüssel.

---

## Token zum Einladen und Einlösen

**Datei:** `src/lib/gamification/invites.ts`

### Codeformat

- **Code**: 8-stellig, alphanumerisch (z. B. `A3K9-X7M2`), menschenlesbar und
  wird dem Benutzer angezeigt.
- **Token**: 32 Byte langes Zufallstoken, gespeichert als SHA-256-Hash. Wird für
  die programmgesteuerte Einlösung verwendet (z. B. URL-Links).

### Speicherung

| Spalte       | Wert                              |
| ------------ | --------------------------------- |
| `code`       | `A3K9X7M2` (eindeutig, indiziert) |
| `token_hash` | SHA-256(raw_token)                |

Das Roh-Token wird dem Benutzer genau einmal bei der Erstellung zurückgegeben. OmniRoute
speichert oder zeigt es danach nie wieder an — nur der Hash bleibt erhalten.

### Verhinderung von Selbstempfehlungen

Wenn ein Benutzer einen Code einlöst, prüft das System:

1. Der Code gehört zu einer anderen `api_key_id`.
2. Der einlösende Benutzer hat zuvor noch keinen Code desselben
   Empfehlungsgebers eingelöst (Verknüpfung über `invite_tokens` und das Einlösungsprotokoll).

Wenn eine der Prüfungen fehlschlägt, wird die Einlösung mit einer eindeutigen Fehlermeldung abgelehnt.

### Ablauf und Limits

- Standardwert für `max_uses`: 10 (bei der Erstellung konfigurierbar).
- Standardwert für `expires_at`: 30 Tage nach der Erstellung.
- Abgelaufene oder ausgeschöpfte Codes geben HTTP 410 Gone zurück.

---

## Föderation von Community-Servern

**Datei:** `src/lib/gamification/servers.ts`

### Verbinden

Ein Community-Server wird über ein Einladungstoken registriert, das vom entfernten Server ausgestellt wurde. Die lokale Instanz:

1. Empfängt das Einladungstoken (z. B. durch Einfügen in das Dashboard).
2. Ruft `POST /api/gamification/federation/leaderboard` auf dem entfernten Server auf, um das Token zu validieren und die aktuelle Bestenliste abzurufen.
3. Speichert den Serverdatensatz mit `status: connected`.

### Synchronisierungsmodell

Die Föderation verwendet eine **überschreibende Synchronisierung**, keine additive:

```
Lokale Instanz                Community-Server
     │                              │
     ├── Punktzahl übertragen ─────►│  POST /federation/score
     │   { api_key_id, score }      │  (Server validiert Token-Hash)
     │                              │
     ├── Bestenliste abrufen ──────►│  GET /federation/leaderboard
     │◄── Top-N-Einträge ───────────┤  (überschreibt lokalen Cache)
     │                              │
     └── Zustandsprüfung ──────────►│  GET /federation/health
         (alle 60 s, Timeout 5 s)   │
```

### Authentifizierung

Föderationsanfragen enthalten:

```
Authorization: Bearer <raw_token>
X-Federation-Version: 1
```

Der entfernte Server hasht das Token und sucht die entsprechende Zeile in
`community_servers`. Dadurch wird die Übertragung des gespeicherten Hashs vermieden.

### Zustandsüberwachung

Jeder Serverdatensatz erfasst:

| Feld        | Beschreibung                                               |
| ----------- | ---------------------------------------------------------- |
| `status`    | `connected`, `degraded`, `unreachable`                     |
| `last_sync` | ISO-Zeitstempel der letzten erfolgreichen Synchronisierung |
| `failures`  | Aufeinanderfolgende fehlgeschlagene Zustandsprüfungen      |

Nach 5 aufeinanderfolgenden Fehlschlägen ändert sich der Status zu `unreachable`, und die Synchronisierung wird pausiert, bis eine manuelle Zustandsprüfung erfolgreich ist.

---

## Schutz vor Betrug

**Datei:** `src/lib/gamification/antiCheat.ts`

### Serverseitige Punkteberechnung

Alle XP-Berechnungen erfolgen in `src/lib/gamification/xp.ts`. Clients übermitteln niemals eine Punktzahl – sie übermitteln Aktionen, und der Server berechnet die XP. Die Spalte `leaderboard.score` kann nur durch serverseitigen Code geschrieben werden.

### Ratenbegrenzung

| Begrenzung                  | Wert    | Geltungsbereich   |
| --------------------------- | ------- | ----------------- |
| Max. XP pro Minute          | 1,000   | Pro API-Schlüssel |
| Max. Übertragungen pro Min. | 10      | Pro API-Schlüssel |
| Max. Übertragungsbetrag     | 10,000  | Pro Übertragung   |
| Max. tägliche Übertragungen | 100,000 | Pro API-Schlüssel |

Die Ratenbegrenzungen verwenden ein gleitendes Zeitfenster im Arbeitsspeicher (nach demselben Muster wie `RateLimitManager` in `open-sse/services/`). Falls der Prozess neu gestartet wird, wird auf SQLite-gestützte Zähler zurückgegriffen.

### Anomalieerkennung mittels Z-Wert

Für jeden API-Schlüssel verwaltet das System ein gleitendes 7-Tage-Fenster der pro Stunde verdienten XP. Bei jeder XP-Vergabe:

1. Wird die aktuelle stündliche XP-Rate des Benutzers berechnet.
2. Werden Mittelwert und Standardabweichung der Population berechnet.
3. Wird `z = (user_rate - mean) / stddev` berechnet.
4. Wenn `z > 3.0` (3 Standardabweichungen) gilt, wird dies als Anomalie markiert.

Anomalien werden mit `action = 'anomaly_detected'` in `xp_audit_log` protokolliert und im Admin-Dashboard angezeigt.

### Audit-Trail

Jede XP-Vergabe, Übertragung, Abzeichenvergabe und Anomalieerkennung wird in `xp_audit_log` mit folgenden Angaben protokolliert:

| Feld         | Beschreibung                                      |
| ------------ | ------------------------------------------------- |
| `api_key_id` | Wer                                               |
| `action`     | Was passiert ist (xp_award, transfer, anomaly, …) |
| `xp_awarded` | Betrag (0 für Ereignisse ohne XP)                 |
| `metadata`   | JSON mit Kontext (Aktionstyp, Ziel, …)            |
| `created_at` | Zeitpunkt (ISO 8601)                              |

Administratoren können den vollständigen Audit-Trail über `GET /api/gamification/anomalies` abfragen.

---

## API-Routen

Alle Routen folgen dem standardmäßigen OmniRoute-Muster:

```
Route → CORS-Preflight → Body-Validierung (Zod) → Authentifizierung (extractApiKey)
  → Handler
```

### Endpunkte

| Methode | Pfad                                       | Beschreibung                                         | Authentifizierung |
| ------- | ------------------------------------------ | ---------------------------------------------------- | ----------------- |
| GET     | `/api/gamification/leaderboard`            | Bestenliste abrufen (Bereich, Zeitraum, Paginierung) | Optional          |
| POST    | `/api/gamification/leaderboard`            | Aktualisierung des Bestenlisten-Caches erzwingen     | Erforderlich      |
| GET     | `/api/gamification/stream`                 | Echtzeitaktualisierungen der Bestenliste per SSE     | Optional          |
| GET     | `/api/gamification/transfer`               | Übertragungsverlauf abrufen (Paginierung)            | Erforderlich      |
| POST    | `/api/gamification/transfer`               | Token an einen anderen Benutzer senden               | Erforderlich      |
| GET     | `/api/gamification/invite`                 | Meine Einladungscodes auflisten                      | Erforderlich      |
| POST    | `/api/gamification/invite`                 | Neuen Einladungscode generieren                      | Erforderlich      |
| DELETE  | `/api/gamification/invite`                 | Einladungscode widerrufen                            | Erforderlich      |
| POST    | `/api/gamification/invite/redeem`          | Einladungscode einlösen                              | Erforderlich      |
| GET     | `/api/gamification/servers`                | Community-Server auflisten                           | Erforderlich      |
| POST    | `/api/gamification/servers`                | Mit einem Community-Server verbinden                 | Erforderlich      |
| DELETE  | `/api/gamification/servers`                | Verbindung zu einem Community-Server trennen         | Erforderlich      |
| POST    | `/api/gamification/federation/score`       | Punktestand an Remote-Server übertragen              | Föderation        |
| GET     | `/api/gamification/federation/leaderboard` | Bestenliste von Remote-Server abrufen                | Föderation        |
| GET     | `/api/gamification/notifications`          | SSE-Benachrichtigungen zu Abzeichen/Stufenaufstiegen | Erforderlich      |
| GET     | `/api/gamification/anomalies`              | Anomalieberichte anzeigen (Admin)                    | Admin             |
| POST    | `/api/gamification/rotate`                 | Geheimnisse für Einladungstoken rotieren             | Erforderlich      |

### Anfrage-/Antwortbeispiele

**POST /api/gamification/transfer**

```json
// Anfrage
{
  "to": "recipient-api-key-id",
  "amount": 500,
  "idempotencyKey": "uuid-v4"
}

// Antwort 200
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

// Antwort 400 (unzureichendes Guthaben)
{
  "error": "Insufficient balance",
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
      "title": "Expert"
    }
  ],
  "total": 847,
  "updatedAt": "2026-05-19T12:00:00.000Z"
}
```

---

## MCP-Tools (8)

Registriert in `open-sse/mcp-server/` neben bestehenden Tools. Dem
Berechtigungsbereich `gamification` zugeordnet.

| Tool                       | Beschreibung                                           | Eingabeschema                |           |
| -------------------------- | ------------------------------------------------------ | ---------------------------- | --------- |
| `gamification_leaderboard` | Bestenliste für einen Bereich/Zeitraum abrufen         | `{ scope, period?, limit? }` |
| `gamification_rank`        | Rang und Nachbarn des Aufrufers abrufen                | `{ scope }`                  |
| `gamification_profile`     | Zusammenfassung von XP, Level, Titel und Serie abrufen | `{}`                         |
| `gamification_badges`      | Verdiente Abzeichen oder alle Definitionen auflisten   | `{ earned?: boolean }`       |
| `gamification_transfer`    | Token an einen anderen Benutzer senden                 | `{ to, amount }`             |
| `gamification_invite`      | Einladungscodes generieren oder auflisten              | `{ action: "create"          | "list" }` |
| `gamification_servers`     | Community-Server auflisten oder verbinden              | `{ action, token? }`         |
| `gamification_anomalies`   | Anomalieberichte anzeigen (Admin-Berechtigungsbereich) | `{ limit?, since? }`         |

---

## Dashboard-Seiten

### `/dashboard/leaderboard`

- Podiumsanzeige (Top 3 mit Avataren und XP).
- Bereichsauswahl: Global / Wöchentlich / Monatlich / Geteilte Token / Beiträge.
- Paginierte Tabelle (25 pro Seite) mit Rang, Name, Punktzahl, Level und Titel.
- SSE-Echtzeitaktualisierungen — Rangänderungen werden animiert.
- Der aktuelle Benutzer wird in der Tabelle mit einer fixierten Zeile „Dein Rang“ hervorgehoben.

### `/dashboard/profile`

- XP-Fortschrittsbalken mit aktuellem Level und Schwellenwert für das nächste Level.
- Titelabzeichen wird deutlich hervorgehoben angezeigt.
- Abzeichengalerie — verdiente Abzeichen mit Erwerbsdatum, nicht verdiente Abzeichen ausgegraut
  (verborgene Abzeichen zeigen bis zum Erwerb „???“ an).
- Serienzähler mit Flammensymbol; Serienkalender (letzte 30 Tage).
- XP-Verlaufsdiagramm (tägliche XP der letzten 30 Tage).

### `/dashboard/tokens`

- Token-Guthaben (deutlich sichtbar oben auf der Seite).
- Überweisungsformular: Empfänger, Betrag, Bestätigungsdialog.
- Tabelle des Überweisungsverlaufs mit Filtern (gesendet/empfangen/alle).
- Einladungsbereich: aktive Codes, neue generieren, Link teilen.
- Community-Server: Liste mit Integritätsstatus, verbinden/trennen.

### `/dashboard/gamification/admin`

- Anomalieliste mit Schweregrad, Benutzer, Zeitstempel und Z-Wert.
- Auditprotokoll-Viewer mit Filtern (Aktionstyp, Benutzer, Datumsbereich).
- Systemstatistiken: insgesamt vergebene XP, aktive Benutzer, Erwerbsraten von Abzeichen.
- Übersicht über den Zustand der Föderationsserver.

---

## Pipeline-Integration

### Integrationspunkt

Gamification wird an einem einzigen Punkt in
`open-sse/handlers/chatCore.ts` in die Anfrage-Pipeline eingebunden:

```typescript
// Nachdem die Antwort an den Client gesendet wurde:
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
    // Fire-and-forget: protokollieren, aber niemals an den Client weitergeben
  });
});
```

### Ereignistypen

| Ereignistyp         | Zeitpunkt der Ausgabe                               |
| ------------------- | --------------------------------------------------- |
| `request.completed` | Erfolgreiche LLM-Antwort wurde gesendet             |
| `provider.switch`   | Anbieter wurde gewechselt (Combo-Fallbacks zählen)  |
| `combo.created`     | Neue Combo-Konfiguration wurde gespeichert          |
| `combo.used`        | Combo-Ziel wurde erfolgreich erreicht               |
| `badge.earned`      | Abzeichenauswertung ergab eine Übereinstimmung      |
| `streak.milestone`  | Serienschwellenwert wurde überschritten             |
| `transfer.sent`     | Token-Überweisung wurde abgeschlossen               |
| `referral.redeemed` | Einladungscode wurde erfolgreich eingelöst          |
| `compression.used`  | Prompt-Komprimierung wurde angewendet               |
| `skill.executed`    | Skill-Ausführung wurde abgeschlossen                |
| `model.first_use`   | Modell wurde in den letzten 7 Tagen nicht verwendet |

### Garantie der nicht blockierenden Ausführung

Das Muster `setImmediate` + `.catch(() => {})` stellt Folgendes sicher:

1. Die Antwort wird vollständig gesendet, bevor die Gamification ausgeführt wird.
2. Gamification-Fehler werden niemals an den Client weitergegeben.
3. Die Ereignisverarbeitung wird im nächsten Mikrotask und nicht inline ausgeführt.

---

## Sicherheit

### Bedrohungsmodell

| Bedrohung                                | Gegenmaßnahme                                                                               |
| ---------------------------------------- | ------------------------------------------------------------------------------------------- |
| Künstliche Erhöhung der Punktzahl        | Ausschließlich serverseitige XP-Berechnung; Clients übermitteln Aktionen, keine Punktzahlen |
| Replay-Angriffe                          | Idempotenzschlüssel bei Übertragungen; Deduplizierung des Audit-Protokolls                  |
| Übertragungsbetrug                       | Doppelte Buchführung; atomare Transaktionen; Ratenbegrenzungen                              |
| Eigenwerbung                             | Gegenprüfung von `api_key_id` bei der Einlösung                                             |
| Manipulation der Rangliste               | Z-Score-Anomalieerkennung; Admin-Dashboard für Anomalien                                    |
| Diebstahl von Föderationstoken           | Speicherung als SHA-256-Hash; Rohtoken wird nur einmal angezeigt                            |
| Brute-Force-Angriffe auf Einladungscodes | Ratenbegrenzung am Einlösungsendpunkt; Entropie mit 8 Zeichen                               |
| XSS in Anzeigenamen                      | Anzeigenamen werden bereinigt; Ranglisteneinträge werden maskiert                           |
| Timing-Angriffe auf Hashes               | `crypto.timingSafeEqual` für den Vergleich von Token-Hashes                                 |

### Authentifizierungsanforderungen

- **Öffentlich** (keine Authentifizierung): `GET /leaderboard`, `GET /stream` (schreibgeschützte
  Ranglisten).
- **API-Schlüssel erforderlich**: alle Schreibvorgänge, Profil, Übertragungen, Einladungen.
- **Nur für Administratoren**: Anomalie-Dashboard, Audit-Protokollanzeige.
- **Föderation**: separater Authentifizierungspfad, der das Rohtoken im `Authorization`-
  Header verwendet und es anhand des gespeicherten SHA-256-Hashes validiert.

---

## Tests

### Testdateien

Alle Tests verwenden den nativen Test-Runner von Node.js (`node --import tsx/esm --test`).

| Testdatei                                     | Abdeckung                                         | Tests |
| --------------------------------------------- | ------------------------------------------------- | ----- |
| `tests/unit/gamification/xp.test.ts`          | XP-Berechnung, Levelkurve, Titel                  | 8     |
| `tests/unit/gamification/badges.test.ts`      | Abgleich von Abzeichenkriterien, Vergabe          | 10    |
| `tests/unit/gamification/streaks.test.ts`     | Serienlogik, Meilensteine, Randfälle              | 7     |
| `tests/unit/gamification/leaderboard.test.ts` | Rangberechnung, Paginierung, Rotation             | 8     |
| `tests/unit/gamification/sharing.test.ts`     | Übertragungen, Guthaben, Idempotenz               | 9     |
| `tests/unit/gamification/invites.test.ts`     | Erstellen, Einlösen, Ablauf, Eigenwerbung         | 7     |
| `tests/unit/gamification/antiCheat.test.ts`   | Ratenbegrenzungen, Z-Score, Audit-Protokollierung | 6     |
| `tests/unit/gamification/events.test.ts`      | Ereignisausgabe, Fan-out, Fehlerbehandlung        | 5     |

### Tests ausführen

```bash
# Alle Gamification-Tests
node --import tsx/esm --test tests/unit/gamification/*.test.ts

# Einzelne Testdatei
node --import tsx/esm --test tests/unit/gamification/xp.test.ts
```

### Anforderungen an die Testabdeckung

Gemäß `CONTRIBUTING.md` müssen alle neuen Module Folgendes aufweisen:

- Zweigabdeckung >= 80 %.
- Jede öffentliche Funktion muss mindestens einmal getestet werden.
- Fehlerpfade müssen getestet werden (unzureichendes Guthaben, abgelaufene Codes, Ratenbegrenzungen).

---

## Dateistruktur

```
src/
  lib/
    db/
      migrations/
        060_create_gamification.sql    # Alle 8 Tabellen + Indizes
      gamification.ts                  # CRUD-Modul der Domäne
    gamification/
      xp.ts                           # XP-Berechnung, Levelkurve, Titel
      badges.ts                       # Badge-Definitionen, Kriterien, Auswertung
      streaks.ts                      # Nachverfolgung täglicher Serien
      leaderboard.ts                  # Rangberechnung, SSE, Rotation
      antiCheat.ts                    # Ratenbegrenzung, Z-Score, Auditierung
      sharing.ts                      # Hauptbuch für Token-Übertragungen
      invites.ts                      # Einladungs-/Einlösecodes
      servers.ts                      # Föderation von Community-Servern
      events.ts                       # Event-Emitter (Integrationspunkt)
      notifications.ts                # SSE-Benachrichtigungsstream
  app/
    api/
      gamification/
        leaderboard/route.ts          # GET/POST-Bestenliste
        leaderboard/stream/route.ts   # SSE-Echtzeitaktualisierungen
        transfer/route.ts             # GET/POST-Übertragungen
        invite/route.ts               # GET/POST/DELETE-Einladungscodes
        invite/redeem/route.ts        # POST-Codeeinlösung
        servers/route.ts              # GET/POST/DELETE-Server
        federation/score/route.ts     # POST-Punktestand übertragen
        federation/leaderboard/route.ts # GET-Bestenliste abrufen
        notifications/route.ts        # SSE-Benachrichtigungen
        anomalies/route.ts            # GET-Anomalieberichte
        rotate/route.ts               # POST-Geheimnisse rotieren
    (dashboard)/
      dashboard/
        leaderboard/page.tsx           # Ranglistenseite
        profile/page.tsx               # XP-/Badge-/Serien-Seite
        tokens/page.tsx                # Guthaben-/Übertragungs-/Einladungsseite
        gamification/admin/page.tsx    # Admin-Überwachung von Anomalien
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
    GAMIFICATION.md                    # Dieses Dokument
```

---

## Migrationsstrategie

### Phase 1: Backend-Kern (PR 1)

- Migration `060_create_gamification.sql` (8 Tabellen).
- `src/lib/db/gamification.ts` (Domänenmodul).
- `src/lib/gamification/xp.ts`, `streaks.ts`, `events.ts`.
- Integrationspunkt in `chatCore.ts`.
- Unit-Tests für XP, Serien und Events.

### Phase 2: Badges & Bestenliste (PR 2)

- `src/lib/gamification/badges.ts`, `leaderboard.ts`.
- Badge-Definitionen in den Konstanten.
- Bestenlisten-API-Routen + SSE-Stream.
- Unit-Tests für Badges und Bestenliste.

### Phase 3: Teilen & Einladungen (PR 3)

- `src/lib/gamification/sharing.ts`, `invites.ts`, `antiCheat.ts`.
- API-Routen für Übertragungen und Einladungen.
- Unit-Tests für das Teilen, Einladungen und Anti-Cheat.

### Phase 4: Föderation & Dashboard (PR 4)

- `src/lib/gamification/servers.ts`, `notifications.ts`.
- Föderations-API-Routen.
- Dashboard-Seiten (Bestenliste, Profil, Token, Administration).
- Registrierung der MCP-Tools.

---

## Zukünftige Überlegungen

- **Saisonale Events**: zeitlich begrenzte Badge-Sets und Ranglisten-Saisons.
- **Team-Ranglisten**: Benutzer nach Organisation oder Combo gruppieren.
- **XP-Multiplikatoren**: XP während Aktionszeiträumen erhöhen.
- **Teilen von Errungenschaften**: teilbare Badge-Karten (OpenGraph-Bilder) generieren.
- **Mobile Push-Benachrichtigungen**: Webhook-basierte Benachrichtigungen für Badge-/Level-Events.
- **Ranglisten-API**: öffentliche API für Integrationen von Drittanbietern.
