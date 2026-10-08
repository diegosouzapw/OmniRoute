# Resilience Guide (Deutsch)

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/RESILIENCE_GUIDE.md) · 🇪🇹 [am](../../../am/docs/architecture/RESILIENCE_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/architecture/RESILIENCE_GUIDE.md) · 🇦🇿 [az](../../../az/docs/architecture/RESILIENCE_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/architecture/RESILIENCE_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/architecture/RESILIENCE_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/architecture/RESILIENCE_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/architecture/RESILIENCE_GUIDE.md) · 🇩🇰 [da](../../../da/docs/architecture/RESILIENCE_GUIDE.md) · 🇬🇷 [el](../../../el/docs/architecture/RESILIENCE_GUIDE.md) · 🇪🇸 [es](../../../es/docs/architecture/RESILIENCE_GUIDE.md) · 🇪🇪 [et](../../../et/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/architecture/RESILIENCE_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/architecture/RESILIENCE_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇱 [he](../../../he/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/architecture/RESILIENCE_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/architecture/RESILIENCE_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/architecture/RESILIENCE_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇩 [id](../../../id/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇹 [it](../../../it/docs/architecture/RESILIENCE_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/architecture/RESILIENCE_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/architecture/RESILIENCE_GUIDE.md) · 🇰🇭 [km](../../../km/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/architecture/RESILIENCE_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/architecture/RESILIENCE_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/architecture/RESILIENCE_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/architecture/RESILIENCE_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/architecture/RESILIENCE_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/architecture/RESILIENCE_GUIDE.md) · 🇲🇲 [my](../../../my/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇴 [no](../../../no/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [or](../../../or/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/architecture/RESILIENCE_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/architecture/RESILIENCE_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/architecture/RESILIENCE_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/architecture/RESILIENCE_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/RESILIENCE_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/architecture/RESILIENCE_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/architecture/RESILIENCE_GUIDE.md) · 🇱🇰 [si](../../../si/docs/architecture/RESILIENCE_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/architecture/RESILIENCE_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/architecture/RESILIENCE_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/architecture/RESILIENCE_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/architecture/RESILIENCE_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [te](../../../te/docs/architecture/RESILIENCE_GUIDE.md) · 🇹🇭 [th](../../../th/docs/architecture/RESILIENCE_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/architecture/RESILIENCE_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/RESILIENCE_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/architecture/RESILIENCE_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/architecture/RESILIENCE_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/architecture/RESILIENCE_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/RESILIENCE_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/RESILIENCE_GUIDE.md)

---

OmniRoute verfügt über drei unterschiedliche, aber miteinander verbundene Resilienzmechanismen. Jeder hat einen anderen Geltungsbereich und Zweck. Behalten Sie diese bei der Fehlersuche im Routingverhalten getrennt voneinander.

![3-Schichten-Resilienzmodell](../diagrams/exported/resilience-3layers.svg)

> Quelle: [diagrams/resilience-3layers.mmd](../diagrams/resilience-3layers.mmd)

## 1. Provider-Circuit-Breaker

**Geltungsbereich:** gesamter Provider (z. B. `glm`, `openai`, `anthropic`).

**Zweck:** Es soll kein Traffic mehr an einen Provider gesendet werden, bei dem wiederholt Fehler auf Upstream-/Service-Ebene auftreten.

**Implementierung:**

- Kernklasse: `src/shared/utils/circuitBreaker.ts`
- Einbindung: `src/sse/handlers/chatHelpers.ts`, `src/sse/handlers/chat.ts`
- Status-API: `GET /api/monitoring/health`
- Reset-API: `POST /api/resilience/reset`
- Wrapper: `open-sse/services/accountFallback.ts`
- DB-Tabelle: `domain_circuit_breakers`

**Zustände:**

- `CLOSED` — normaler Traffic ist zulässig
- `DEGRADED` — Traffic ist weiterhin zulässig, aber vermehrte Provider-Fehler werden erfasst
- `OPEN` — Provider ist vorübergehend blockiert; das Combo-Routing überspringt ihn
- `HALF_OPEN` — Reset-Zeitüberschreitung ist abgelaufen; eine Testanfrage ist zulässig

**Konfigurierbare Standardwerte (`open-sse/config/constants.ts`, verfügbar unter Dashboard → Einstellungen → Resilienz):**

| Klasse  | Herabgestuft ab | Öffnet ab | Reset-Zeitüberschreitung |
| ------- | --------------- | --------- | ------------------------ |
| OAuth   | 5 Fehler        | 8 Fehler  | 60s                      |
| API-Key | 7 Fehler        | 12 Fehler | 30s                      |
| Lokal   | abgeleitet      | 2 Fehler  | 15s                      |

`degradationThreshold` steuert, wann ein Provider in den Zustand `DEGRADED` wechselt; `failureThreshold` steuert, wann er geöffnet und übersprungen wird. Profile lokaler Provider sind auf der Seite mit den Resilienz-Einstellungen noch nicht verfügbar.

**Auslösungscodes:** nur Statuscodes auf Provider-Ebene `[408, 500, 502, 503, 504]`. Bei Fehlern auf Kontoebene (die meisten 401/403/429) NICHT auslösen — diese gehören zum Cooldown oder zur Sperrung.

**Verzögerte Wiederherstellung:** Wenn `OPEN` abläuft, aktualisieren `getStatus()`, `canExecute()` und `getRetryAfterMs()` den Zustand auf `HALF_OPEN`. Es ist kein Hintergrund-Timer erforderlich.

---

### Optionaler globaler Provider-Cooldown (Zeitfenster-Gate)

Eine vierte, **optionale** Schicht (`PROVIDER_COOLDOWN_ENABLED`, standardmäßig **deaktiviert**) speichert anfrageübergreifend fehlgeschlagene Provider in
`open-sse/services/providerCooldownTracker.ts`. Diese Daten werden bei der
Auflösung von Combo-Zielen berücksichtigt, damit aufeinanderfolgende Combo-Anfragen einen gerade
fehlgeschlagenen Provider nicht erneut durchlaufen. Einträge auf Provider-Ebene berücksichtigen das Zeitfenster-Gate `PROVIDER_PROFILES`:

| Profil  | Auslösung nach (`providerFailureThreshold`) | innerhalb von (`providerFailureWindowMs`) | Abkühlzeit (`providerCooldownMs`) |
| ------- | ------------------------------------------: | ----------------------------------------: | --------------------------------: |
| OAuth   |                                        `10` |                                   `15min` |                            `5min` |
| API-Key |                                        `15` |                                   `30min` |                           `10min` |

Unterhalb des Schwellenwerts gilt der Provider **nicht** als in der Abkühlphase befindlich; ein Erfolg
setzt das Zeitfenster zurück. Einträge auf Verbindungsebene (`provider:connectionId`) behalten stattdessen
den exponentiellen Backoff `minRetryCooldownMs → maxRetryCooldownMs` bei. Überschreibungen:
`OMNIROUTE_PROVIDER_BREAKER_{OAUTH,API_KEY}_{FAILURE_THRESHOLD,FAILURE_WINDOW_MS,COOLDOWN_MS}`.
Regressionsschutz: `tests/unit/provider-cooldown-window-gate.test.ts`.

## 2. Verbindungs-Cooldown

**Geltungsbereich:** einzelne Provider-Verbindung/einzelnes Konto/einzelner Schlüssel.

**Zweck:** einen fehlerhaften Schlüssel überspringen, während andere Verbindungen desselben Providers weiterhin Anfragen verarbeiten.

**Implementierung:**

- Als nicht verfügbar markieren: `src/sse/services/auth.ts::markAccountUnavailable()`
- Auswahl: `getProviderCredentials*` in derselben Datei
- Cooldown-Berechnung: `open-sse/services/accountFallback.ts::checkFallbackError()`
- Einstellungen: `src/lib/resilience/settings.ts`

**Felder pro Verbindung:**

- `rateLimitedUntil` — Zeitstempel, bis zu dem der Cooldown läuft
- `testStatus: "unavailable"`
- `lastError`, `lastErrorType`, `errorCode`
- `backoffLevel` — Zähler für exponentielles Backoff

**Standard-Cooldowns:**

- OAuth-Basiswert: 5 s
- API-Schlüssel-Basiswert: 3 s
- API-Schlüssel bei 429: bevorzugt vorgelagerte `Retry-After`-/Reset-Header bzw. analysierbaren Reset-Text
- Backoff: `baseCooldownMs * 2 ** failureIndex`

**Schutz vor einer Anfragelawine:** verhindert, dass gleichzeitige Fehler den Cooldown übermäßig verlängern oder `backoffLevel` doppelt erhöhen.

**Endzustände (KEINE Cooldowns):**

- `banned` — wird durch die Erkennung gesperrter Schlüsselwörter/Kontensperren (siehe [BAN_DETECTION](../security/BAN_DETECTION.md)) sowie durch drei aufeinanderfolgende vorgelagerte Ablehnungen pro Anfrage gesetzt (`request_rejected`, z. B. Anthropic OAuth 403 „Request not allowed“ — `open-sse/services/requestRejectedStreak.ts`); eine einzelne Ablehnung versetzt die Verbindung lediglich in den Cooldown
- `expired` (wechselt nach einer begrenzten Anzahl von Wiederholungsversuchen in den Endzustand — `EXPIRED_RETRY_MAX = 3` mit exponentiellem Backoff —, sodass vorübergehende OAuth-Fehler sich selbst beheben können, bevor das Konto dauerhaft deaktiviert wird)
- `credits_exhausted`

Diese Zustände bleiben bestehen, bis sich die Anmeldedaten ändern oder sie von einem Operator zurückgesetzt werden. Endzustände dürfen nicht mit einem vorübergehenden Cooldown-Zustand überschrieben werden.

**Lazy Recovery:** Sobald `rateLimitedUntil` in der Vergangenheit liegt, kann die Verbindung wieder ausgewählt werden. Nach erfolgreicher Nutzung löscht `clearAccountError()` alle Fehlerfelder.

### Claude-OAuth-Nutzungslimit: Lane mit niedrigerer Priorität + Zurücksetzen des Sitzungslimits

**Geltungsbereich:** eine Claude-Abonnementverbindung (OAuth). Beide Funktionen müssen **pro
Verbindung explizit aktiviert werden** (Verbindung bearbeiten → Claude-Bereich → `lowPriorityMode` / `autoLimitReset` in
`providerSpecificData`; beide sind standardmäßig deaktiviert) und entsprechen den Claude-Code-Befehlen `/low-priority` und
`/limit-reset` (Wire-Protokoll aus Claude Code 2.1.263 erfasst).

**Implementierung:**

- Zustandsautomat + Antwortklassifizierung: `open-sse/services/claudeLowPriority.ts`
- Client für Reset-Status/-Anforderung: `open-sse/services/claudeLimitReset.ts`
- Executor-Hook (Header-Injektion + Wiederholungsversuch mit demselben Konto): `open-sse/executors/base.ts::execute()`
- Persistenz der expliziten Aktivierung: `src/lib/providers/requestDefaults.ts::normalizeProviderSpecificData()`

**Auslöser:** das 5-Stunden-Nutzungslimit — eine `429`, deren Header
`anthropic-ratelimit-unified-status: rejected` und, sofern das Konto berechtigt ist,
`anthropic-ratelimit-unified-slow-offer: treatment` enthalten. Vor dieser ersten
429-Limitantwort wird nichts gesendet; eine Serie von 429-Antworten ohne Unified-Header wird über den normalen Cooldown-Pfad verarbeitet.

**Lane mit niedrigerer Priorität** (`lowPriorityMode`):

- Bei der 429-Limitantwort akzeptiert der Executor das Angebot und wiederholt die Anfrage sofort mit **demselben**
  Konto und `anthropic-usage-limit: slow`; die Lane bleibt bis zum angekündigten
  `anthropic-ratelimit-unified-reset` (+60 s Toleranz) aktiv, und jede Anfrage in diesem Zeitraum enthält
  den Header. Die abgefangene 429-Antwort erreicht `handleChatCore` nie, sodass die Verbindung
  **nicht** in den Cooldown versetzt und nicht durch Rotation ersetzt wird.
- `anthropic-ratelimit-unified-slow-status` bei späteren Antworten: `active` / `not_needed`
  behalten die Lane bei; bei `slot_busy` (429) oder einer `529` wird die durch
  `anthropic-ratelimit-unified-slow-retry-after` vorgegebene Zeit gewartet (Standardwert 20 s, begrenzt auf 5–600 s, ±30 % Jitter)
  und die Anfrage wiederholt, begrenzt durch `anthropic-ratelimit-unified-slow-max-wait` (Standardwert 20 min, begrenzt
  auf 1 min–6 h) — wird dieser Wert überschritten, endet die Lane, und eine 10-minütige Abkühlphase verhindert die erneute Annahme. Die
  Wartezeit wird zusätzlich auf die verbleibende Zeit des eigenen Timeouts der Anfrage für den Start der vorgelagerten Verarbeitung
  (`resolveFetchStartTimeout`, standardmäßig 10 min) abzüglich eines Spielraums von 5 s begrenzt: Ohne diese Begrenzung würde die
  standardmäßige maximale Wartezeit von 20 Minuten die Anfrage überdauern, und der Wartevorgang würde
  mittendrin abgebrochen, wodurch ein `TimeoutError` anstelle des ordnungsgemäßen `max_wait`-Endes mit anschließender Abkühlphase ausgegeben würde.
- `weekly_limit` / `budget_exhausted` / `off` / `ineligible`, der Beginn eines neuen 5-Stunden-Zeitfensters oder
  `ineligible` + `anthropic-ratelimit-unified-overage-in-use: true` (wodurch die Lane bei
  jedem Status als `extra_usage` beendet wird, da die kostenpflichtige Mehrnutzung nun das Limit abdeckt) beenden die Lane; die
  Antwort wird anschließend über den normalen Cooldown-Pfad verarbeitet. `budget_exhausted` wird bis zum
  angekündigten Budget-Reset (≤ 8 Tage) gespeichert.
- Die Prüfung auf das Nutzungslimit erfolgt nach den eigenen, durch 400-Antworten ausgelösten Wiederholungsversuchen innerhalb eines Versuchs des Executors (Kontextbearbeitung,
  Begrenzung von Thinking/Effort, automatisches Erlernen von Parametern), sodass eine 429-Limitantwort, die erst bei
  einem dieser Wiederholungsversuche auftritt, weiterhin abgefangen wird, statt den Cooldown-Pfad zu erreichen.
- Der Zustand wird pro Verbindung im Arbeitsspeicher gehalten (ein Neustart führt dazu, dass eine zusätzliche 429-Limitantwort erforderlich ist, um die Lane erneut zu akzeptieren).

**Zurücksetzen des Sitzungslimits** (`autoLimitReset`, wird vor der Lane versucht, wenn beide aktiviert sind):

- `GET https://api.anthropic.com/api/oauth/usage?at_wall=1&skip_spend=1` → `juniper_tide`-
  Block; wenn `arm: "reset"` und `available: true`,
  `POST https://api.anthropic.com/api/organizations/{orgUUID}/reset_rate_limits` mit
  `{ "program": "juniper_tide" }` (Organisations-UUID aus
  `providerSpecificData.organizationUUID`, Bootstrap-Fallback).
- Bei `result: reset|not_limited` wird die Anfrage mit voller Geschwindigkeit wiederholt (ohne Slow-Header).
  `already_used` / `not_offered` speichern `next_available_at` zwischen (Standardwert: eine Woche); bei jedem
  Fehler erfolgt ein Backoff von 15 Minuten. Das Zurücksetzen ist einmal pro Woche möglich und wird weiterhin auf das
  Wochenlimit angerechnet.

Regressionsprüfungen: `tests/unit/claude-low-priority-mode.test.ts`,
`tests/unit/claude-limit-reset.test.ts`, `tests/unit/claude-low-priority-executor.test.ts`.

### Sitzungsaffinität (#7274)

**Geltungsbereich:** eine Client-Sitzung (Header `X-Session-Id` / `x-codex-session-id` / `x-omniroute-session`), die für **jeden** Provider an eine Verbindung gebunden ist.

**Zweck:** Einen Multi-Turn-Agenten (Claude Code, aider, benutzerdefinierte Agenten) über mehrere Anfragen hinweg demselben Konto zuzuordnen, wodurch Kontextverluste durch Kontowechsel und wiederholte Cold-Start-429-Fehler bei Anbietern mit kontobezogenem Sitzungsstatus reduziert werden.

**Implementierung:**

- TTL-Auflösung: `src/sse/services/sessionAffinityPin.ts::resolveSessionAffinityTtlMs()`
- Pin-Auswahl/-Erstellung: `src/sse/services/sessionAffinityPin.ts::selectSessionAffinityConnection()`
- Header-Extraktion (generisch, für jeden Anbieter): `src/sse/services/auth.ts::extractSessionAffinityKey()`
- Persistierte Pin-Tabelle: `sessionAccountAffinity` (`src/lib/db/sessionAccountAffinity.ts`)
- Einstellung: `sessionAffinityTtlMs` (globale TTL in ms, `0` deaktiviert) — `src/lib/db/settings.ts`. Durch die Migration `124_generic_session_affinity_ttl.sql` von der ausschließlich für Codex geltenden Einstellung `codexSessionAffinityTtlMs` umbenannt; dabei wird eine zuvor konfigurierte Codex-TTL als neuer Standardwert übernommen.

Vor #7274 gab `resolveSessionAffinityTtlMs()` für jeden Anbieter außer `codex` vorzeitig `0` zurück, sodass die TTL-Einstellung (und die Sitzungs-Header) anderswo wirkungslos blieben, obwohl der Pinning-Mechanismus und die Header-Extraktion bereits anbieterunabhängig waren. Mit der Korrektur wurde diese vorzeitige Rückgabe entfernt; die TTL gilt nun einheitlich für jeden Anbieter, sobald sie global auf einen Wert größer als `0` gesetzt ist.

Die drei Sitzungsaffinitäts-Header werden niemals an den Upstream weitergeleitet — Executors erstellen ihre eigenen Upstream-Header von Grund auf, anstatt Client-Header durchzureichen. Daher bleibt dies ausschließlich eine interne Korrelations-ID.

### Exklusive Leases für verwaltete Sitzungsverbindungen

**Geltungsbereich:** Ein aktiver verwalteter HTTP-Client bzw. eine aktive verwaltete Sitzung besitzt eine geeignete OmniRoute-Verbindung.

**Zweck:** Dauerhafte exklusive Verbindungsinhaberschaft für Clients bereitzustellen, die über mehrere Anfragen hinweg eine strikte Routing-Grenze benötigen. Dies unterscheidet sich von Sitzungsaffinität, die lediglich eine weiche Kontinuitätspräferenz darstellt: Eine exklusive Lease persistiert den Lebenszyklusstatus in SQLite, erzwingt die globale Eindeutigkeit aktiver Inhaber und aktiver Verbindungen und weist eine veraltete Generation vor der Weiterleitung an den Anbieter zurück.

Die Funktion muss pro API-Schlüssel explizit aktiviert werden. Ein verwalteter Schlüssel muss den Scope `lease:exclusive` und eine explizite, nicht leere `allowedConnections`-Liste besitzen. Jeder HTTP-Client kann den Lebenszyklus-Endpunkt verwenden; weder Clientname, User-Agent, Anbieter, OAuth-Methode noch Modell sind erforderlich. Die Lease gilt für eine Verbindung, nicht für ein Modell. Daher bleibt die Bindung bei einem Modellwechsel bestehen, solange die Verbindung weiterhin regulär geeignet ist. Die normalen Regeln für Modell, Kontingent, Zustand, Abklingzeit und Positivliste bleiben maßgeblich und können dieselbe Generation auf eine andere freie, geeignete Verbindung umstellen.

Der Lebenszyklus wird über `POST /api/v1/session-leases` mit den JSON-Aktionen `acquire`, `renew` und `release` gesteuert. Verwaltete Inferenzanfragen übermitteln den opaken Wert `X-OmniRoute-Lease-Owner` und die exakte `X-OmniRoute-Lease-Generation`. Der Inhaberwert beginnt mit `vlo_`, gefolgt von 43 base64url-Zeichen; gespeichert wird ausschließlich sein SHA-256-Hash. Jede abschließende Dispatch-Schranke bindet außerdem die ID des authentifizierten API-Schlüssels und die ID der aktiven Verbindung ein. Lease-Steuerungs-Header werden aus Protokollen, gespeicherten Anfrage-Snapshots und den Upstream-Headern der Executors entfernt.

Wenn das reguläre Routing geeignete verwaltete Kandidaten findet, aber jeder freie Kandidat durch eine fremde aktive Lease belegt ist, gibt OmniRoute HTTP `429`, den Code für nicht verfügbare Lease-Kapazität, einen Status des Wartens auf Kapazität sowie einen begrenzten, aus dem frühesten relevanten Ablaufzeitpunkt abgeleiteten `Retry-After`-Wert zurück. Eine regulär leere Eignungsmenge ist kein Lease-Konflikt und behält die bestehende Routing-Fehlersemantik bei.

Verwandte Mechanismen bleiben voneinander getrennt:

- Die OAuth-Sitzungsbelegung dient der prozesslokalen weichen Verteilung auf OAuth-Konten.
- Konto-Semaphoren gewähren Berechtigungen für parallele Anfragen, die mit Abschluss einer Anfrage enden.
- Exklusive Leases für verwaltete Sitzungsverbindungen bieten dauerhafte Lebenszyklus-Inhaberschaft mit einer Generationsschranke.

---

## 3. Modellsperre

**Geltungsbereich:** Tupel aus Anbieter + Verbindung + Modell.

**Schlüsselbereich nach Status:** Der Fehlerstatus bestimmt, in welchen Schlüssel eine Sperre geschrieben wird
(`resolveLockoutScope()` in `open-sse/services/accountFallback/exactModelLock.ts`):

- `429` / `403` / `402` — ein Kontingent- oder Berechtigungssignal — sperren die **Kontingentfamilie**:
  bei codex den gesamten Geltungsbereich `codex` / `spark` (jedes `gpt-5*`-Modell der
  Verbindung), bei anderen Anbietern `getQuotaScopedModelForProvider()`.
- `404` sperrt nur das konkrete Modell (`getModelLockKey()` grenzt `not_found` ein).
- Jeder andere Status — `5xx`-Transport-/Serverfehler und der von OmniRoute selbst
  aufgrund der Qualitätsvalidierung erzeugte `502` — sperrt nur das **exakte**
  Anbieter-/Verbindungs-/Modell-Tupel. Ein fehlerhafter Stream bei einem Modell ist kein Beleg
  für ein Problem mit dem Kontingent des Kontos; vor dieser Regel entfernte eine einzige leere Antwort bei
  `codex/gpt-5.6-luna` jedes `gpt-5*`-Modell dieser Verbindung für
  2–30 min (mit Eskalation) aus dem Routing, obwohl das Kontingent unberührt war.
- Eine explizite `scope`-Option des Aufrufers hat immer Vorrang (Antigravity übergibt `"exact"`).

**Zweck:** Verhindert die Deaktivierung einer gesamten Verbindung, wenn nur ein Modell nicht verfügbar oder kontingentbeschränkt ist.

**Beispiele:**

- Anbieter mit Kontingenten pro Modell, die 429 zurückgeben
- Lokale Anbieter, die für ein einzelnes fehlendes Modell 404 zurückgeben
- Anbieterspezifische Modus-/Modellberechtigungsfehler (z. B. Grok-Modi)

**Implementierung:** `open-sse/services/accountFallback.ts` — `lockModel()`, `clearModelLock()`, `getAllModelLockouts()`.

### Dashboard für Modellabklingzeiten (v3.8.0)

Benutzeroberfläche: Einstellungen → Modellabklingzeiten (`src/app/(dashboard)/dashboard/settings/components/ModelCooldownsCard.tsx`)

Listet aktive Sperren mit folgenden Angaben auf: Anbieter, Verbindung, Modell, Grund, expiresAt. Betreiber können ein Modell über die Karte manuell wieder aktivieren.

**REST-API:**

- `GET /api/resilience/model-cooldowns` — aktive Sperren auflisten
- `DELETE /api/resilience/model-cooldowns` — manuell wieder aktivieren. Body: `{provider, connection, model}`. Authentifizierung: Verwaltung.

### Benutzeroberfläche für Sperreinstellungen + Wiederherstellung durch Erfolgsabnahme (v3.8.23)

Die Modellsperre wurde von einem stets aktiven, fest codierten Verhalten zu einer vollständig konfigurierbaren,
explizit zu aktivierenden Funktion mit eigener Einstellungskarte und einem selbstheilenden Wiederherstellungspfad.

**Einstellungskarte:** Einstellungen → Modellsperre
(`src/app/(dashboard)/dashboard/settings/components/ModelLockoutCard.tsx`).
Diese unterscheidet sich von der oben genannten schreibgeschützten `ModelCooldownsCard` (die aktive Sperren nur
_auflistet_) — die neue Karte _konfiguriert die Parameter_. Die Standardwerte
befinden sich in `DEFAULT_MODEL_LOCKOUT_SETTINGS`
(`src/lib/resilience/modelLockoutSettings.ts`):

| Einstellung             | Standardwert                     | Bedeutung                                                            |
| ----------------------- | -------------------------------- | -------------------------------------------------------------------- |
| `enabled`               | `false`                          | Hauptschalter — die Modellsperre ist **standardmäßig deaktiviert**.  |
| `errorCodes`            | `[403, 404, 429, 502, 503, 504]` | Upstream-Statuscodes, die als modellspezifischer Fehler zählen.      |
| `baseCooldownMs`        | `120_000` (120 s)                | Anfängliche Sperrdauer für den ersten Fehler.                        |
| `maxCooldownMs`         | `1_800_000` (30 min)             | Obergrenze für die eskalierte Abklingzeit.                           |
| `maxBackoffSteps`       | `10`                             | Maximale Anzahl von Eskalationsschritten für exponentielles Backoff. |
| `useExponentialBackoff` | `true`                           | Ob wiederholte Fehler die Abklingzeit exponentiell erhöhen.          |

Die Einstellungen werden über den regulären Einstellungsspeicher persistiert und anhand des
Schemas für Resilienzeinstellungen validiert; die Karte begrenzt `baseCooldownMs`/`maxCooldownMs`
(mit `maxCooldownMs ≥ baseCooldownMs`) und `maxBackoffSteps`.

**Wiederherstellung durch Erfolgsabnahme:** Die Wiederherstellung basiert **nicht** ausschließlich auf dem Ablauf eines Timers. Eine fehlerfreie
Antwort reduziert den Fehlerzähler des Modells schrittweise, sodass ein Modell, das sich
innerhalb des Zeitfensters erholt hat, nicht weiter eskaliert und die Sperre aufgehoben wird, bevor der Timer ablaufen würde. Bei einem erfolgreichen
Kombinationsziel ruft `open-sse/services/combo.ts` die Funktion `decayModelFailureCount()`
(`open-sse/services/accountFallback.ts`) auf, die den gespeicherten
`failureCount` **halbiert** (`Math.floor(failureCount / 2)`); sobald er `0` erreicht,
wird der Sperreintrag vollständig gelöscht. Das Gegenstück `recordModelLockoutFailure()`
erhöht den Zähler bei Fehlern innerhalb des Eskalationsfensters (und eskaliert die Abklingzeit).
Diese Erfolgsabnahme ergänzt den normalen Ablauf des Timers —
beide Wege können ein Modell wieder aktivieren.

**Status:** Sperren werden **im Arbeitsspeicher** gehalten (prozessbezogene `Map`s von
`ModelLockoutEntry`, verschlüsselt nach `provider:connectionId:model`; Sperren mit exaktem Geltungsbereich nach
`provider:connectionId:exact:model`) und nicht in
der DB persistiert — sie gehen bei einem Neustart verloren. Die _Einstellungen_ werden persistiert; der aktive
_Sperrstatus_ ist flüchtig.

---

## 4. Parallelitätssteuerung für Quota-Share (v3.8.36)

Abonnementkonten (GLM, MiniMax usw.) akzeptieren häufig nur etwa 1–3 gleichzeitige
Anfragen; wird diese Anzahl überschritten, führt dies zu 429-Antworten und Abklingzeiten. Besonders ausgeprägt ist dies bei
**Quota-Share**-Kombinationen (`qtSd/…`), bei denen sich mehrere API-Schlüssel ein gemeinsames Upstream-Konto
teilen. Drei Ebenen verhindern, dass ein gemeinsam genutztes Konto mit Anfragen überflutet wird.

### Parallelitätsobergrenze pro Verbindung (`max_concurrent`)

Für jede Provider-Verbindung kann eine `max_concurrent`-Obergrenze festgelegt werden
(`provider_connections.max_concurrent`, konfigurierbar im Verbindungsdialog / über die API / in der DB).
Lassen Sie das Feld leer, um keine Begrenzung anzuwenden. Dies ist die zentrale Einstellung für die nachfolgende
Serialisierungsebene — setzen Sie sie auf die tatsächliche Parallelität des Kontos (z. B. GLM ~1, MiniMax ~2).

### Serialisierung von Quota-Share-Anfragen

Wenn ein Quota-Share-Dispatch auf eine Verbindung abzielt, für die ein positiver
`max_concurrent`-Wert festgelegt ist, werden gleichzeitige Anfragen an dieses **Konto** über ein
verbindungsspezifisches Semaphor serialisiert (Schlüssel `qsconn:<connectionId>`): Überschüssige Anfragen **warten in
der Warteschlange**, statt das Konto zu überfluten. Das Verhalten ist **Fail-Open** — bei einer ausgelasteten
Warteschlange oder einer Zeitüberschreitung wird ohne Slot fortgefahren, statt jemals eine weiterleitbare
Anfrage abzulehnen. Umschaltbar unter **Einstellungen → Resilienz → Quota-Share-Parallelität
pro Verbindung** (`resilienceSettings.quotaShareConcurrencyLimit.enabled`, standardmäßig
aktiviert). Ohne `max_concurrent`-Obergrenze bleibt das Verhalten unverändert.

> Das Quota-Share-Routing-Gate (`selectQuotaShareTarget`, DRR + P2C) ist selbst
> Fail-Open und _depriorisiert_ eine Verbindung an ihrer Kapazitätsgrenze lediglich — bei einem
> Pool mit nur einer Verbindung kann es keine harte Begrenzung durchsetzen; daher ist dieses Semaphor der Mechanismus, der die
> Überflutung tatsächlich eindämmt.

### Abklingzeitbewusste Wiederholung für Kombinationen

Bei jeder Kombinationsstrategie wartet eine Anfrage, sofern aktiviert, eine KURZE vorübergehende Abklingzeit ab, die andernfalls zu einer endgültigen 429-Antwort führen würde,
und wird anschließend erneut weitergeleitet, statt die 429-Antwort
zurückzugeben — dies deckt TPM-/RPM-Zeitfenster der Gemini-Klasse ab (~60 s `retry-after`)
bei Kombinationen aus mehreren Modellen, beispielsweise wenn beide Ziele einer Kombination aus zwei Modellen
ein modellspezifisches Ratenlimit erreichen. Begrenzt durch `comboCooldownWait` (`enabled`, `maxWaitMs`, `maxAttempts`,
`budgetMs`) unter **Einstellungen → Resilienz**. Bei `quota_exhausted`
(bis Mitternacht gesperrt) oder Authentifizierungs-/Nicht-gefunden-Gründen wird niemals gewartet.

---

## 5. Zulassungssteuerung für die Anfragewarteschlange (v3.8.49 · Issue #6593)

**Geltungsbereich**: die lokale Ratenbegrenzungswarteschlange pro Anbieter+Verbindung (`open-sse/services/rateLimitManager.ts`,
basierend auf Bottleneck), eine Ebene unterhalb der drei oben genannten Mechanismen.

**`maxWaitMs` begrenzt die Wartezeit in der Warteschlange; `executionMaxWaitMs` begrenzt die Ausführungszeit.**
Beide sind bewusst voneinander getrennt, und keiner der Werte beeinflusst den anderen.

`resilienceSettings.requestQueue.maxWaitMs` ist das **Wartezeitbudget der Warteschlange**: Es
deckt das Warten auf einen Anbieter-Slot und den anschließenden Aufenthalt im Zustand QUEUED ab. Der zugehörige Timer wird
in dem Moment gelöscht, in dem der Job den Zustand QUEUED verlässt und mit der Ausführung beginnt
(`rateLimitManager.ts`, `wrappedFn`). Eine Anfrage, die dieses Budget überschreitet, erreicht
den Upstream nie. Der Standardwert beträgt 30000ms, bereitgestellt durch `DEFAULT_REQUEST_QUEUE_MAX_WAIT_MS`
in `src/lib/resilience/settings.ts` und festgeschrieben durch
`tests/unit/ratelimit-admission-control-6593.test.ts`, sodass eine Änderung daran
diesen Test fehlschlagen lässt, anstatt diesen Absatz unbemerkt veralten zu lassen.

`resilienceSettings.requestQueue.executionMaxWaitMs` ist der Wert, den Bottleneck
als `expiration` des Jobs erhält; dessen Timer startet erst nach der Übergabe zur Ausführung. Er dient
als Absicherung für Executors ohne eigenes Upstream-Timeout und wird
auf das eigene Timeout des Executors für den Beginn des Abrufs angehoben, wenn dieses länger ist, damit
eine intakte, laufende Antwort nicht abgebrochen werden kann. Der Standardwert beträgt 600000ms (10 min).

Die Übergabe des Warteschlangenbudgets an `expiration` führte früher dazu, dass nicht inkrementelle
Gateways während der Verarbeitung abgebrochen wurden — sie laufen berechtigterweise minutenlang, bevor die ersten Bytes eintreffen —
und deshalb wird ein Ablauf als `code:
"RATE_LIMIT_EXECUTION_TIMEOUT"` (HTTP 504) ausgegeben, während das Warteschlangenbudget den
Warteschlangen-Timeout-Code verwendet. Beide Werte können über `RATE_LIMIT_MAX_WAIT_MS` /
`RATE_LIMIT_EXECUTION_MAX_WAIT_MS` (Umgebungsvariablen) oder im Dashboard
(**Settings → Resilience**) überschrieben werden. Bei der Normalisierung werden beide auf 1ms–24h begrenzt.

**Rangfolge für beide:** Die Umgebungsvariable stellt lediglich den _Standardwert_ bereit. Ein in
`resilienceSettings.requestQueue` persistierter Wert (Dashboard / API-Patch, gespeichert
in `key_value`) hat Vorrang; ein verbindungsspezifischer Wert unter
`rateLimitOverrides.maxWaitMs` / `.executionMaxWaitMs` hat wiederum Vorrang davor. Das Setzen
der Umgebungsvariable für eine Bereitstellung, die bereits einen persistierten Wert enthält,
ändert daher nichts — löschen oder aktualisieren Sie stattdessen die persistierte Einstellung.

Die Verweildauer in der Warteschlange wird durch `maxWaitMs` begrenzt; das unten beschriebene `maxQueueDepth` begrenzt, wie
viele Aufrufer gleichzeitig eingereiht sein dürfen.

**`maxQueueDepth` — optionale Zulassungsobergrenze (neu).** `resilienceSettings.requestQueue.maxQueueDepth`
begrenzt, wie viele Anfragen gleichzeitig für eine bestimmte
Anbieter+Verbindung-Kombination in der Warteschlange auf ihre Ausführung warten dürfen. Wenn die Warteschlange bereits `maxQueueDepth`
Anfragen enthält, wird eine neue Anfrage frühzeitig mit einem typisierten
`code: "RATE_LIMIT_QUEUE_FULL"`-Fehler abgelehnt, **bevor** sie jemals `limiter.schedule()`
erreicht — dadurch ist die Ablehnung kostengünstig und erfolgt vor jeglicher nachgelagerter
Prompt-Komprimierungs-/Übersetzungsarbeit für diese Anfrage. Der Standardwert `0` =
deaktiviert; dadurch bleibt das bestehende Verhalten einer unbegrenzten Warteschlange erhalten. Der zulässige Bereich ist 0–100000.
Der Wert kann über `RATE_LIMIT_MAX_QUEUE_DEPTH` (Umgebungsvariable) oder
`resilienceSettings.requestQueue.maxQueueDepth` (Dashboard/API-Patch) überschrieben werden.

Die Zulassungsprüfung selbst ist eine reine Funktion
(`open-sse/services/rateLimitManager/admission.ts::checkQueueAdmission`), sodass
sie ohne einen echten Bottleneck-Limiter mit Unit-Tests geprüft werden kann.

> Der RFC, mit dem #6593 eröffnet wurde, schlug außerdem ein
> `bypassCompressionOnRateLimit`-Flag vor. Die Pipeline dieses Repositorys unter `open-sse/services/compression/`
> dient der Prompt-/Kontextkomprimierung für die ausgehende LLM-Anfrage (`chatCore.ts`,
> im Bereich des Blocks `resolveCompressionSettings`/`selectCompressionStrategy`),
> nicht der HTTP-Antwortkomprimierung für erzeugte 429-Antworttexte — es gibt keinen
> entsprechenden Codepfad für ein wörtlich verstandenes Bypass-Flag. Dieser Schritt zur Prompt-Komprimierung
> wird derzeit außerdem _vor_ `withRateLimit()` in der Anfragepipeline ausgeführt. Eine
> Umordnung, um ihn bei einer Ablehnung aufgrund einer vollen Warteschlange zu überspringen, stellt daher eine separate, größere
> Änderung dar, die über den Geltungsbereich dieses Issues hinausgeht; sie wurde hier bewusst **nicht** implementiert
> und bleibt einer späteren Folgeänderung vorbehalten, falls die CPU-Einsparung das
> Risiko der Umordnung rechtfertigt.

---

## 6. Durchsatz-Watchdog für langsame Streams (#9709)

Die optionale Schutzfunktion `resilienceSettings.streamRecovery.throughputWatchdog` erkennt
einen Upstream, der weiterhin Chunks sendet, aber Assistentenausgaben unterhalb der
konfigurierten Rate für nutzbare Ausgaben erzeugt. Sie unterscheidet sich bewusst vom
Leerlauf-Timeout: Heartbeats und Metadaten setzen keinen der beiden Timer zurück und
gelten nicht als Fortschritt. Sie unterscheidet sich außerdem von der festen Frist für
Versuche (#9153), die unabhängig von der Ausgabequalität eine absolute Sicherheitsgrenze
bleibt.

Der Watchdog benötigt eine Aufwärmphase, gefolgt von einem vollständigen gleitenden
Zeitfenster, bevor er abbrechen kann. Er zählt Text-Deltas aus Ausgabeereignissen der
Chat Completions API und Responses API (als konservative Näherung für UTF-8-Bytes),
ignoriert Ereignisse, die ausschließlich Nutzungsdaten enthalten oder leer sind, und
setzt die Bewertung aus, solange Tool-Aufruf- oder Reasoning-Ereignisse verarbeitet
werden. Er ist standardmäßig deaktiviert und kann mit
`STREAM_THROUGHPUT_WATCHDOG_ENABLED=true` aktiviert werden; Zeitfenster, Aufwärmphase,
Mindestrate und minimal messbare Ausgabe werden durch die normale
Normalisierungsschicht der Resilienz-Einstellungen begrenzt.

Wenn der Watchdog aktiviert ist, wird ein von ihm ausgelöster Abbruch nur auf den
aktiven Upstream-Versuch angewendet. Bevor für den Client sichtbare Bytes gesendet
wurden, kann der bestehende Early-Recovery-Pfad für dasselbe Konto den Versuch erneut
öffnen. Nach dem Commit wird der Stream niemals blind erneut abgespielt; nur der
bestehende Vertrag für eine sichere Fortsetzung während des Streams kann ein Suffix
anfügen. Die Finalisierung erfolgt weiterhin genau einmal, sodass Nutzungsabrechnung
und Semaphore-Freigabe nicht dupliziert werden.

---

## 7. Neufestlegung des Upstream-Status (falsch ausgewiesene Kontingentfehler)

**Geltungsbereich:** ein Upstream-Gateway, das eine vorübergehende Kontingenterschöpfung mit dem falschen HTTP-Status meldet.

**Zweck:** einen irreführenden Status VOR der Klassifizierung korrigieren, damit nachgelagerte Verbraucher (Fallback-Engine, Combo-Aggregation und die clientseitige Antwort) die tatsächliche, wiederholbare Natur des Fehlers erkennen.

Einige Gateways signalisieren eine VORÜBERGEHENDE Kontingenterschöpfung mit einem
nicht wiederholbaren HTTP-Status. `agentrouter.org` gibt `403` (manchmal `400`) mit
einem chinesischen Antworttext (`用户额度不足` / `额度不足`) anstelle des
standardmäßigen Status `429` zurück. Clients wie Claude Code behandeln `403` als
dauerhaften Fehler und brechen die Sitzung ab; ohne Korrektur würde die
Fallback-Engine ihn statt als Kontingentereignis als `AUTH_ERROR` klassifizieren.

**Implementierung:**

- Registry + Matcher: `open-sse/config/upstreamStatusRestatement.ts` — eine
  anbieterspezifische Liste von Regeln (`{id, fromStatuses, toStatus, textMarkers,
excludeMarkers, defaultRetryAfterMs}`), die über `applyStatusRestatement()`
  abgeglichen wird.
- Aufrufstelle: der Block `providerFailure:` in `open-sse/handlers/chatCore.ts`
  (etwa bei Zeile 3654), unmittelbar nachdem `parseUpstreamError()` eine
  Upstream-Antwort mit einem HTTP-Fehlerstatus (`!providerResponse.ok`) geparst hat,
  und bevor eine Klassifizierung ausgeführt wird, sodass jeder nachgelagerte
  Verbraucher den korrigierten Status sieht. Fehler, die in einen `200`-SSE-Stream
  eingebettet sind, durchlaufen einen separaten, späteren Stream-Parsing-Pfad und
  werden von diesem Hook derzeit **nicht** abgedeckt — dies ist eine bekannte
  Einschränkung, die für den fehlerhaften Status von agentrouter noch nicht relevant
  ist (da dieser als HTTP-Fehlerstatus auftritt).
- Wiederholungsberechtigung: `429` ist in `RETRY_AFTER_ELIGIBLE_STATUSES`
  (`open-sse/services/combo/unavailableRetryGate.ts`) enthalten, sodass ein neu
  festgelegter Fehler ein echtes Wiederholungszeitfenster erhält, anstatt als
  nicht wiederholbarer `403` ausgegeben zu werden.
- Der synthetische Wert `60s` für `defaultRetryAfterMs`
  (`upstreamStatusRestatement.ts`) ist lediglich das, was die neu festgelegte
  Antwort dem **Client** mitteilt; er ist nicht selbst die Dauer des internen
  Cooldowns bzw. der Sperre der Verbindung — diese wird separat durch den
  Mechanismus gesteuert, der den neu festgelegten Fehler tatsächlich verarbeitet
  (der eskalierende Backoff von Connection Cooldown, §2, mit einer Basis von `3s`
  für API-Schlüssel-Anbieter; oder Model Lockout, §3, für Anbieter mit
  modellspezifischen Kontingenten wie agentrouter). Der Router kann intern bereits
  vor Ablauf des dem Client mitgeteilten 60-Sekunden-Fensters wieder für einen
  Versuch infrage kommen — dies ist beabsichtigter Spielraum und kein Fehler.

Dauerhafte Fehler (`无权访问模型` von agentrouter — kein Zugriff auf dieses Modell)
werden NIEMALS neu festgelegt: `excludeMarkers` verwirft die Regel selbst dann, wenn
`textMarkers` zutrifft, sodass der Fehler seinen ursprünglichen Status behält und
nicht endlos wiederholt wird. Die entsprechende Klassifizierungsregel des Anbieters
(`agentrouter-model-access-denied` in `open-sse/config/providerErrorRules.ts`:
`reason: "auth_error"`, `scope: "model"`, ein deklarierter Basis-Cooldown von `6h`)
wird von `checkFallbackError` (`open-sse/services/accountFallback.ts`) _vor_ dem
generischen frühen Rücksprung `FORBIDDEN` der apikey-Kategorie ausgewertet, wobei dies
durch `honorsRuleLockScope(provider)` eingeschränkt wird (#10334 — derzeit über die
Allowlist `HONORS_RULE_LOCK_SCOPE_PROVIDERS` in `providerErrorRules.ts` ausschließlich
für agentrouter aktiviert). Der deklarierte 6-Stunden-Cooldown der Regel wird als
`fallbackResult.baseCooldownMs` weitergereicht, fließt jedoch weiterhin in den bereits
vorhandenen Lockout-Pfad für modellspezifische Kontingente
(`lockModelIfPerModelQuota()` / `recordModelLockoutFailure()`, durch #10334 mit
Ausnahme der Cooldown-Quelle unverändert) ein: Wie jeder andere Modell-Lockout wird er
auf `mlSettings.maxCooldownMs` des Betreibers (standardmäßig `1_800_000ms` / 30min)
begrenzt, und der _persistierte Lockout-Grund_ bleibt der bereits vorhandene,
fest codierte Wert `"forbidden"` und nicht `"auth_error"` aus der Regel — nur die
Cooldown-Dauer wird durchgängig berücksichtigt, nicht die Zeichenfolge für den Grund.
Die Verbindung selbst bleibt aktiv; andere Modelle derselben Verbindung sind nicht
betroffen.

Neu formulierte Kontingentfehler (`额度不足`) erreichen in der Produktion eine Anbieterregel
(`agentrouter-user-quota-exhausted`: `reason: "quota_exhausted"`, `scope:
"connection"`, ohne eigene deklarierte Abklingzeit — es gilt der Standardwert
für den skalierten Backoff der Persistenzschicht). Seit #10334 wird `scope` bei
`ProviderErrorRuleMatch` durchgängig verarbeitet, aber **nur** für Anbieter in
der Positivliste `HONORS_RULE_LOCK_SCOPE_PROVIDERS` (`providerErrorRules.ts` —
derzeit nur `"agentrouter"`, gesteuert über `honorsRuleLockScope()`). Für alle
anderen Anbieter bleibt `scope` rein informativ, genau wie vor #10334.
`checkFallbackError` stellt den Gültigkeitsbereich der zutreffenden Regel als
`fallbackResult.ruleScope` bereit; `isAgentrouterConnectionQuotaScope()`
(`src/sse/services/auth.ts`) ist die gemeinsame Schutzprüfung, die bestätigt,
dass ein `ruleScope` tatsächlich sicher als verbindungsweites, selbstheilendes
Signal berücksichtigt werden kann (Gültigkeitsbereich `"connection"`, Grund
`quota_exhausted`, niemals `permanent`, niemals `creditsExhausted` — eine
Absicherung gegen eine zukünftige Regel, die den Gültigkeitsbereich
`"connection"` mit einem permanenten Kontostatus kombiniert). Zwei Verbraucher
rufen sie auf:

- **Persistenz** (`markAccountUnavailable()`, `src/sse/services/auth.ts`):
  Statt in den **modellspezifischen** Sperrzweig für Passthrough-Anbieter zu
  fallen (agentrouter ist `passthroughModels: true` → `hasPerModelQuota()`
  gibt `true` zurück), wird eine **temporäre Verbindungsabklingzeit**
  angewendet — `testStatus: "unavailable"` + `rateLimitedUntil`, niemals ein
  endgültiger Status (`credits_exhausted`/`banned`/`expired`) —, sodass die
  Verbindung nach Ablauf der Abklingzeit automatisch wiederhergestellt wird,
  statt ein manuelles Zurücksetzen der Zugangsdaten zu erfordern.
  Übersprungen für Verbindungen mit `disableCooling: true` (#2997): Bei dieser
  Abwahl wird stattdessen auf die modellspezifische Sperre zurückgefallen
  (ein dokumentierter Kompromiss — siehe den Codekommentar oberhalb des
  Zweigs).
- **Combo-Routing innerhalb derselben Anfrage** (`applyComboTargetExhaustion()`,
  `open-sse/services/combo/targetExhaustion.ts`): Dieselbe Schutzprüfung
  markiert die Verbindung in der speicherinternen Menge
  `exhaustedConnections`, indiziert durch `${provider}:${connectionId}`. Dies
  überspringt nur ein verbleibendes Ziel DERSELBEN ANFRAGE, das _selbst bereits
  genau diese `connectionId`_ in seinem eigenen Zielobjekt enthält
  (`getExhaustedTargetSkipReason()`,
  `open-sse/services/combo/comboPredicates.ts`, `if (provider &&
connectionId)` vor der Suche in `exhaustedConnections`) — eine einfache
  Modelllisten-Combo, bei der benachbarte Ziele keine eigene festgelegte
  `connectionId` enthalten und eine solche erst je Weiterleitung aus dem
  `X-OmniRoute-Selected-Connection-Id`-Header der Antwort aufgelöst wird,
  erzielt niemals einen Treffer für diesen Schlüssel. In diesem häufigen Fall
  ist der eigentliche Schutz davor, dass ein verbleibender Zweig das gerade
  ausgeschöpfte Konto erneut verwendet, NICHT diese Menge — sondern die oben
  beschriebene Persistenzschicht (der Wert `rateLimitedUntil` der Verbindung
  liegt nun in der Zukunft) zusammen damit, dass dieselbe Schutzprüfung für
  den Fehler `transientRateLimitedProviders` unterdrückt (siehe
  „Zweistufiges Design“ und den Codekommentar zum Zweig
  `isAgentrouterConnectionQuotaScope` in `targetExhaustion.ts`): Da diese
  Menge unmarkiert bleibt, wird die erzwungene Zulassung durch
  `allowRateLimitedConnection` in `combo.ts`
  (`open-sse/services/combo.ts:1005-1013`, `:2734-2738`) für die verbleibenden
  Zweige des Anbieters NICHT aktiviert. Daher wird der Filter
  `rateLimitedUntil` der Zugangsdaten-Auswahl
  (`src/sse/services/auth.ts:1238`) normal berücksichtigt, und ein
  verbleibender Zweig wählt entweder eine andere, weiterhin zulässige
  agentrouter-Verbindung aus oder schlägt fehl, weil keine Zugangsdaten
  verfügbar sind — er erzwingt keine erneute Verwendung der Verbindung, für
  die dieser Zweig gerade eine Abklingzeit festgelegt hat.

### Zweistufiges Design: Statusneuformulierung, dann Klassifizierung

Die Statusneuformulierung (`upstreamStatusRestatement.ts`) und die
Anbieterklassifizierungsregeln (`open-sse/config/providerErrorRules.ts`,
`providerRuleRegistry`) sind separate Register, die beide nach Anbieter-ID
und Textmarkierungen indiziert sind, jedoch an verschiedenen Stellen
ausgeführt werden und unterschiedlichen Zwecken dienen: Die Neuformulierung
schreibt den HTTP-Status frühzeitig in `chatCore.ts` um;
Klassifizierungsregeln bestimmen innerhalb von `checkFallbackError()`
(`open-sse/services/accountFallback.ts`) den Fallback-`reason` und den
Sperr-`scope` (`model` / `provider` / `connection`).

Klassifizierungsregeln sehen den vollständigen Fehler**text** (der zum
Abgleich von Textmarkierungen im Antwortkörper wie `额度不足` benötigt wird)
nur für Anbieter, die in der Positivliste `FULL_TEXT_RULE_PROVIDERS` in
`providerErrorRules.ts` aufgeführt sind — derzeit nur `"agentrouter"`. Für
jeden anderen Anbieter aus dem **integrierten Katalog** übergibt
`checkFallbackError` an `getProviderErrorRuleMatch` nur den strukturierten
Fehler (`{code, type}`), was für Header-, Status- und Code-basierte Regeln
ausreicht, aber Textmarkierungen im Antwortkörper nicht erkennen kann. Die
Hilfsfunktion `resolveRuleMatchBody()` führt diese Auswahl durch: den
vollständigen Fehlertext für Anbieter auf der Positivliste, andernfalls den
strukturierten Fehler. Das Hinzufügen eines **integrierten** Anbieters zu
`FULL_TEXT_RULE_PROVIDERS` ist eine explizite anbieterspezifische Aktivierung
— sie existiert, damit der Standardpfad für jeden nicht auf der Liste
stehenden Anbieter Byte für Byte unverändert bleibt.

Der `scope` einer Regel (`model` / `provider` / `connection`) ist eine von
`FULL_TEXT_RULE_PROVIDERS` unabhängige Aktivierung: `checkFallbackError` stellt
ihn lediglich als `fallbackResult.ruleScope` bereit, und nachgelagerte
Verbraucher berücksichtigen ihn nur für Anbieter in der Positivliste
`HONORS_RULE_LOCK_SCOPE_PROVIDERS` in derselben Datei als etwas anderes als
eine informative Kennzeichnung (`gated via
honorsRuleLockScope()` — derzeit nur `"agentrouter"`). Welche Wirkung ein
Treffer mit `scope: "connection"` tatsächlich hat, sobald ein Anbieter auf
dieser Positivliste steht, ist oben unter „Neu formulierte Kontingentfehler“
beschrieben.

**#11104 — vom Operator deklarierte Regeln umgehen beide Positivlisten.** Ein Operator kann
zur Laufzeit über `settings.providerErrorRules`
(`open-sse/config/providerErrorRules.ts::setOperatorProviderErrorRules`)
eine anbieterspezifische Regel deklarieren, ohne diese Datei zu bearbeiten.
Eine Operatorregel durch `FULL_TEXT_RULE_PROVIDERS`/
`HONORS_RULE_LOCK_SCOPE_PROVIDERS` zu beschränken — Positivlisten, die das
**standardmäßige** Verhalten der integrierten Katalogregeln schützen sollen —
würde den Einstellungsmechanismus für alle Anbieter außer den dort bereits
aufgeführten wirkungslos machen, da die Deklaration der Regel bereits die
ausdrückliche Zustimmung des Operators darstellt. `resolveRuleMatchBody()`
und `honorsRuleLockScope()` prüfen beide zuerst
`hasOperatorRuleForProvider()`: Ein Anbieter mit einer Operatorregel erhält
den unverarbeiteten Fehlertext, und sein deklarierter `scope` wird
berücksichtigt, unabhängig davon, ob er zusätzlich in einer der Positivlisten
aufgeführt ist.

**Bekannte Lücke — `providerRuleRegistry` wird bei HTTP 400 nie abgefragt.**
Der `BAD_REQUEST`-Zweig von `checkFallbackError` klassifiziert den Status 400
vollständig anhand seiner eigenen Muster-Arrays (`MODEL_ACCESS_DENIED_PATTERNS`,
`CONTEXT_OVERFLOW_PATTERNS` usw. in `accountFallback.ts`) und kehrt zurück,
bevor der darüberliegende Zweig
`configuredRule`/`getProviderErrorRuleMatch` erreicht wird. Eine integrierte
Katalogregel (oder eine Operatorregel) mit `status: 400` ist syntaktisch
gültig, wird aber nie ausgelöst. Derzeit zielt keine bestehende Regel auf 400,
sodass die Produktion nicht betroffen ist — eine zukünftige 400-Regel
erfordert jedoch zunächst eine Änderung an diesem Zweig. Das ist eine größere
Änderung als das Hinzufügen einer Regel (sie klassifiziert 400 für jeden
Anbieter neu, der sich bereits auf das Verhalten der Muster-Arrays verlässt)
und liegt außerhalb des Umfangs einer Regelerweiterung für einen einzelnen
Anbieter.

### Hinzufügen eines neuen Gateways mit falscher Kontingentangabe

1. Registrieren Sie ein Regel-Array in `statusRestatementRegistry`
   (`open-sse/config/upstreamStatusRestatement.ts`). Halten Sie `textMarkers`
   anbieterspezifisch; verwenden Sie niemals generische englische Formulierungen
   erneut, die mit `CREDITS_EXHAUSTED_SIGNALS`
   (`open-sse/services/accountFallback.ts`) kollidieren.
2. Registrieren Sie optional Klassifizierungsregeln in
   `open-sse/config/providerErrorRules.ts` (`providerRuleRegistry`), um den
   richtigen Sperrbereich auszuwählen (`connection` für ein kontoweites
   Kontingent, `model` für modellspezifische Fehler). Dieser Schritt wirkt
   sich in der Produktion nur bei Anbietern aus, deren Regeln den vollständigen
   Fehlertext benötigen (Body-Marker): Fügen Sie die Anbieter-ID in derselben
   Datei zu `FULL_TEXT_RULE_PROVIDERS` hinzu — andernfalls übergibt
   `checkFallbackError` der Regel stets nur den strukturierten Fehler
   `{code, type}`, und eine Regel für den Body-Text wird bei Live-Datenverkehr
   niemals übereinstimmen. Regeln, die ausschließlich anhand von
   `status`/`headers` übereinstimmen (wie die von Opencode oder Minimax),
   benötigen diese ausdrückliche Aktivierung nicht. Falls die Regel außerdem
   `scope: "connection"` deklariert und tatsächlich eine verbindungsweite
   Abklingzeit sowie das Überspringen der Kombination innerhalb derselben
   Anfrage beabsichtigt sind (und nicht nur eine informative Kennzeichnung),
   fügen Sie die Anbieter-ID in derselben Datei zu
   `HONORS_RULE_LOCK_SCOPE_PROVIDERS` hinzu — dies steuert die
   `isAgentrouterConnectionQuotaScope()`-artige Verarbeitung in
   `markAccountUnavailable()` (`src/sse/services/auth.ts`) und
   `applyComboTargetExhaustion()`
   (`open-sse/services/combo/targetExhaustion.ts`); andernfalls wird `scope`
   zwar weiterhin über `fallbackResult.ruleScope` weitergegeben, aber nichts
   reagiert darauf.
3. Fügen Sie Unit-Tests nach dem Vorbild von
   `tests/unit/upstream-status-restatement.test.ts` und
   `tests/unit/agentrouter-error-rules.test.ts` hinzu (einschließlich der
   Schutzprüfungen für „nicht dauerhaft“ / „nicht `creditsExhausted`“ sowie —
   falls der Anbieter die Positivliste benötigt — eines Tests, der bestätigt,
   dass `resolveRuleMatchBody()` nur für diesen Anbieter den vollständigen Text
   zurückgibt).

An `chatCore.ts`, `classifyError` oder der Kombinationslogik sind keine
Änderungen erforderlich.

#### Nach ausgehendem Datenverkehr gruppierte Sperre (#10880)

Anbieter in `EGRESS_BUCKETED_LOCK_PROVIDERS` (Opencode-Familie) werden als
nach IP gruppierte Upstream-Anbieter behandelt (die kostenlose Opencode-Stufe
ist nach IP und nicht nach Konto gruppiert — siehe #9611): Ein mit
`quota_exhausted` **oder** `rate_limit_exceeded` klassifizierter Status 429
versetzt jede Verbindung der Positivlistenfamilie, deren zuletzt bekannte
ausgehende IP-Adresse mit derjenigen der fehlgeschlagenen Verbindung
übereinstimmt, in eine Abklingzeit, bevor die Rotation sie ausprobieren kann
— dadurch werden N-1 garantiert fehlschlagende Upstream-Aufrufe vermieden
(entspricht dem Muster von #10460/#10525). `rate_limit_exceeded` ist bewusst
enthalten: Im `markAccountUnavailable`-Pfad stimmen die Opencode-spezifischen
Regeln nie überein (keine Header/kein Body wird an `checkFallbackError`
übergeben, Opencode ist nicht in `FULL_TEXT_RULE_PROVIDERS` enthalten).
Daher wird ein 429-Fehler, dessen Body den Text zum Abonnementkontingent
enthält („monthly usage limit reached“), durch den Kontingenttext-Fallback
(`buildSubscriptionQuotaFallback`, `accountFallback.ts`; 1 Stunde Abklingzeit)
als `quota_exhausted` klassifiziert, bevor die `status_429`-Regel überhaupt
erreicht wird — während ein 429-Fehler ohne Kontingenttext (einfache
Ratenbegrenzung) über die `status_429`-Regel als `rate_limit_exceeded`
klassifiziert wird und dennoch die gesamte IP-Familie in die Abklingzeit
versetzt. Bei einem Anbieter auf der Positivliste ist eine nach IP gruppierte
Ratenbegrenzung dasselbe Signal wie ein erschöpftes Kontingent. Tatsächliche
Einschränkungen:

- **Best-Effort**: Die Sperre ermittelt die zuletzt bekannte `egress_ip` der
  Verbindung aus `proxy_logs` (24-Stunden-Fenster, synchron, ohne Cache). Bei
  kaltem Cache (Egress-IP wurde nie geprüft) oder fehlender Zeile → wird die
  fehlgeschlagene Verbindung durch den Zweig weiterhin in den Cooldown versetzt
  (wie bisher protokolliert), lediglich keine Geschwisterverbindung wird
  gesperrt.
- **Nie terminal**: Der Cooldown ist ein sich erneuerndes Kontingentfenster
  (`testStatus: "unavailable"`); aus einem Signal auf IP-Ebene wird niemals ein
  permanenter Zustand abgeleitet. Verbindungen mit `disableCooling` überspringen
  den Zweig vollständig.
- **Die Sperrgranularität ändert sich für die Familie auf der Positivliste**:
  Dies ist eine Änderung des Geltungsbereichs, nicht nur eine Optimierung für
  Geschwisterverbindungen. opencode ist ein `passthroughModels`-Provider,
  weshalb vor diesem Zweig ein 429 zu einer Sperre pro MODELL führte; nun führt
  er zu einem Verbindungs-Cooldown — auch bei einem Betreiber, der nur eine
  einzige Verbindung ohne jegliche Geschwisterverbindung verwendet. Dies ist
  die Granularität, die die opencode-Regeltabelle bereits als korrekt deklariert
  (`scope: "connection"`, `providerErrorRules.ts`), die bislang jedoch nie
  berücksichtigt wurde, da opencode nicht in
  `HONORS_RULE_LOCK_SCOPE_PROVIDERS` enthalten ist. Der Zweig schreibt den
  Cooldown der fehlgeschlagenen Verbindung sowie deren `backoffLevel` selbst,
  analog zum verbindungsbezogenen agentrouter-Zweig, und kehrt zurück — der
  Block pro Modell und der darunterliegende generische Pfad werden nie
  erreicht.
- **Combo eingeschlossen**: Wie beim agentrouter-Zweig ignoriert der
  Geltungsbereich bewusst die Herabstufung durch
  `persistUnavailableState`/`isCombo`, die ein Combo-Aufrufer auf einen 429
  anwendet. Eine Sperre pro Modell ist keine schwächere Form dieses
  Geltungsbereichs, sondern verwendet die falsche Einheit: Sie sagt nichts über
  die ausgeschöpfte IP aus, sodass die Combo-Rotation weiterhin für jede
  Geschwisterverbindung jeweils einen garantiert fehlschlagenden Aufruf
  verbrauchen würde.
- **Sicherheit von Geschwisterverbindungen**: Eine Geschwisterverbindung, die
  bereits terminal ist (banned/credits_exhausted) oder sich bereits in einem
  längeren Cooldown befindet, wird niemals überschrieben.
- **Exklusive Positivliste**: Die Erweiterung von
  `EGRESS_BUCKETED_LOCK_PROVIDERS` ist eine ausdrückliche Entscheidung des
  Verantwortlichen; keine generische Verdrahtung (Muster #10334/#10419). Die
  Abfrage der Geschwisterverbindungen bindet dieselbe Positivliste ein, anstatt
  sie als SQL-Literal zu wiederholen, sodass ihre Erweiterung eine einzeilige
  Änderung bleibt.
- **Egress-IP-Rotation in beide Richtungen**: Das Abfragefenster (24 Std.) ist
  wesentlich größer als die TTL des Egress-IP-Caches (5 Min.), daher ist die
  „zuletzt bekannte IP“ ein historischer Wert und nicht der aktuelle Zustand.
  Wenn der Proxy einer Verbindung innerhalb des Fensters rotiert ist, kann die
  Sperre eine tatsächlich gemeinsam genutzte IP **übersehen** (die erfasste IP
  ist die neue, noch nicht ausgeschöpfte IP) — und umgekehrt kann sie **eine
  Geschwisterverbindung in den Cooldown versetzen, die inzwischen von der
  ausgeschöpften IP wegrotiert ist**. Der zweite Fall kostet diese
  Geschwisterverbindung ein Cooldown-Fenster; beide Fälle werden als
  Best-Effort-Einschränkungen einer verlaufsbasierten Abfrage akzeptiert.
- **Kosten**: Zwei begrenzte Scans von `proxy_logs` (über `idx_pl_timestamp`
  auf das Zeitfenster gefiltert), ausschließlich mit der Häufigkeit von
  429-Antworten. Kein neuer Index (Migration 134 YAGNI). Gemessen anhand einer
  Datenbankkopie mit realem Datenverkehr und moderater Größe; eine Instanz mit
  hohem Durchsatz enthält im selben Zeitfenster proportional mehr Zeilen.

---

## Weitere Resilienzfunktionen

- **19 Routingstrategien** (Priorität, gewichtet, Round-Robin, Kontextweiterleitung, zuerst auffüllen, p2c, zufällig, am wenigsten verwendet, kostenoptimiert, Reset-berücksichtigend, Reset-Fenster, Kapazitätsreserve, strikt zufällig, automatisch, lkgp, kontextoptimiert, Cache-optimiert, Fusion, Pipeline) — siehe [AUTO-COMBO.md](../routing/AUTO-COMBO.md).
- **Reset-berücksichtigendes Routing** (v3.8.0) — priorisiert Verbindungen anhand des Zeitpunkts der Kontingentzurücksetzung.
- **Herabstufung des Hintergrundmodus** — Responses API `background: true` wird mit einer Warnung auf synchrone Verarbeitung herabgestuft.
- **Dynamische Erkennung von Tool-Limits** — weicht auf andere Anbieter aus, wenn Limits für die Anzahl der Tools erreicht werden.
- **Notfall-Fallback** — wird durch `OMNIROUTE_EMERGENCY_FALLBACK` gesteuert; Betreiber können es auf der Seite „Feature Flags“ ohne Neustart überschreiben.

---

## Debugging

- Antworten gewichteter Kombinationen mit `503 all_targets_cooling_down` (`Retry-After` ist gesetzt, `diagnostics.excluded` führt jedes Ziel mit `model_lockout` / `circuit_open` / `provider_cooldown` / `unavailable` auf) → der Pool ist konfiguriert und verbunden, aber jedes Ziel wird aktuell durch einen Resilienz-Timer ausgeschlossen; die Warnung `[COMBO] Weighted selection: every target excluded before dispatch — …` nennt die Gründe und die verbleibenden Sekunden. Ein `404 no_executable_targets` derselben Kombination bedeutet, dass kein Resilienz-Timer beteiligt war (nichts zur Ausführung vorhanden oder die Verfügbarkeitsprüfung ist für jedes Konto fehlgeschlagen). Implementiert in `open-sse/services/combo/pinRecovery.ts` auf Grundlage der in `targetResolution.ts` erfassten Ausschlüsse.
- Alle Schlüssel eines Anbieters werden übersprungen → sowohl den Zustand des Circuit Breakers ALS AUCH `rateLimitedUntil`/`testStatus` jeder Verbindung prüfen.
- Anbieter nach dem Rücksetzzeitfenster dauerhaft ausgeschlossen → Code liest den rohen Wert `state` anstelle von `getStatus()`/`canExecute()`.
- Ein Schlüssel schlägt fehl, andere sollten funktionieren → Verbindungs-Cooldown gegenüber dem Circuit Breaker bevorzugen.
- Nur ein Modell schlägt fehl → Modellsperre gegenüber Verbindungs-Cooldown bevorzugen.
- Der Zustand sollte sich selbst wiederherstellen, tut es aber nicht → auf einen zukünftigen Zeitstempel sowie einen Lesepfad prüfen, der den abgelaufenen Zustand aktualisiert. Dauerhafte Statuswerte erfordern manuelle Änderungen.

---

## TLS-Fingerprinting und Tarnung

Anbieterspezifische Tarnmechanismen (JA3/JA4, CCH, Verschleierung) sind separat dokumentiert — siehe `docs/security/STEALTH_GUIDE.md` (git; nicht in `/docs` kompiliert).

---

## Resilienztests (Phase 8 · Block C)

Zusätzlich zu Unit-Tests für die Resilienzlogik testen drei Tests die Laufzeitumgebung unter
realen Belastungs-/Fehlerbedingungen (alle sind Integrations-/Nightly-Tests — keiner blockiert PRs):

| Test          | Beschreibung                                                                                                                                                                                                                | Ausführung                               |
| ------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------- |
| Chaos         | Ein simuliertes Upstream-Node injiziert reale Latenz/Resets/Timeouts/503-Fehler; überprüft, ob sich der Circuit Breaker öffnet/wiederherstellt und `checkFallbackError` 503 als wiederherstellbaren Fallback klassifiziert. | `RUN_CHAOS_INT=1 npm run test:chaos`     |
| Heap-Wachstum | ~500 Streams pro `createSSEStream` unter `--expose-gc`; schlägt fehl, wenn der Heap über den Grenzwert hinaus wächst (OOM-Schutz #3069).                                                                                    | `npm run test:heap`                      |
| k6-Dauertest  | Dauerlast gegen `/api/monitoring/health`; p95-/Fehlerschwellenwerte.                                                                                                                                                        | `k6 run tests/load/k6-soak.js` (nightly) |

Orchestriert durch `.github/workflows/nightly-resilience.yml` (Cron + manuelle Ausführung). Im
standardmäßigen `test:integration` überspringen sich Chaos- und Heap-Test selbst (ohne `RUN_CHAOS_INT`/`--expose-gc`).

---

## Siehe auch

- [Architekturleitfaden](./ARCHITECTURE.md) — Systemarchitektur und Interna
- [Benutzerhandbuch](../guides/USER_GUIDE.md) — Anbieter, Kombinationen, CLI-Integration
- [Auto-Combo-Engine](../routing/AUTO-COMBO.md) — Bewertung anhand von 16 Faktoren, Moduspakete
