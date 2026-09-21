# Account-Ban / Banned-Keyword Detection (Deutsch)

🌐 **Languages:** 🇺🇸 [English](../../../../security/BAN_DETECTION.md) · 🇪🇹 [am](../../../am/docs/security/BAN_DETECTION.md) · 🇸🇦 [ar](../../../ar/docs/security/BAN_DETECTION.md) · 🇦🇿 [az](../../../az/docs/security/BAN_DETECTION.md) · 🇧🇬 [bg](../../../bg/docs/security/BAN_DETECTION.md) · 🇧🇩 [bn](../../../bn/docs/security/BAN_DETECTION.md) · 🇨🇿 [cs](../../../cs/docs/security/BAN_DETECTION.md) · 🇩🇰 [da](../../../da/docs/security/BAN_DETECTION.md) · 🇬🇷 [el](../../../el/docs/security/BAN_DETECTION.md) · 🇪🇸 [es](../../../es/docs/security/BAN_DETECTION.md) · 🇪🇪 [et](../../../et/docs/security/BAN_DETECTION.md) · 🇮🇷 [fa](../../../fa/docs/security/BAN_DETECTION.md) · 🇫🇮 [fi](../../../fi/docs/security/BAN_DETECTION.md) · 🇫🇷 [fr](../../../fr/docs/security/BAN_DETECTION.md) · 🇮🇪 [ga](../../../ga/docs/security/BAN_DETECTION.md) · 🇮🇳 [gu](../../../gu/docs/security/BAN_DETECTION.md) · 🇳🇬 [ha](../../../ha/docs/security/BAN_DETECTION.md) · 🇮🇱 [he](../../../he/docs/security/BAN_DETECTION.md) · 🇮🇳 [hi](../../../hi/docs/security/BAN_DETECTION.md) · 🇭🇷 [hr](../../../hr/docs/security/BAN_DETECTION.md) · 🇭🇺 [hu](../../../hu/docs/security/BAN_DETECTION.md) · 🇦🇲 [hy](../../../hy/docs/security/BAN_DETECTION.md) · 🇮🇩 [id](../../../id/docs/security/BAN_DETECTION.md) · 🇳🇬 [ig](../../../ig/docs/security/BAN_DETECTION.md) · 🇮🇹 [it](../../../it/docs/security/BAN_DETECTION.md) · 🇯🇵 [ja](../../../ja/docs/security/BAN_DETECTION.md) · 🇬🇪 [ka](../../../ka/docs/security/BAN_DETECTION.md) · 🇰🇭 [km](../../../km/docs/security/BAN_DETECTION.md) · 🇮🇳 [kn](../../../kn/docs/security/BAN_DETECTION.md) · 🇰🇷 [ko](../../../ko/docs/security/BAN_DETECTION.md) · 🇱🇹 [lt](../../../lt/docs/security/BAN_DETECTION.md) · 🇱🇻 [lv](../../../lv/docs/security/BAN_DETECTION.md) · 🇮🇳 [ml](../../../ml/docs/security/BAN_DETECTION.md) · 🇮🇳 [mr](../../../mr/docs/security/BAN_DETECTION.md) · 🇲🇾 [ms](../../../ms/docs/security/BAN_DETECTION.md) · 🇲🇹 [mt](../../../mt/docs/security/BAN_DETECTION.md) · 🇲🇲 [my](../../../my/docs/security/BAN_DETECTION.md) · 🇳🇵 [ne](../../../ne/docs/security/BAN_DETECTION.md) · 🇳🇱 [nl](../../../nl/docs/security/BAN_DETECTION.md) · 🇳🇴 [no](../../../no/docs/security/BAN_DETECTION.md) · 🇮🇳 [or](../../../or/docs/security/BAN_DETECTION.md) · 🇮🇳 [pa](../../../pa/docs/security/BAN_DETECTION.md) · 🇵🇭 [phi](../../../phi/docs/security/BAN_DETECTION.md) · 🇵🇱 [pl](../../../pl/docs/security/BAN_DETECTION.md) · 🇵🇹 [pt](../../../pt/docs/security/BAN_DETECTION.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/security/BAN_DETECTION.md) · 🇷🇴 [ro](../../../ro/docs/security/BAN_DETECTION.md) · 🇷🇺 [ru](../../../ru/docs/security/BAN_DETECTION.md) · 🇱🇰 [si](../../../si/docs/security/BAN_DETECTION.md) · 🇸🇰 [sk](../../../sk/docs/security/BAN_DETECTION.md) · 🇸🇮 [sl](../../../sl/docs/security/BAN_DETECTION.md) · 🇷🇸 [sr](../../../sr/docs/security/BAN_DETECTION.md) · 🇸🇪 [sv](../../../sv/docs/security/BAN_DETECTION.md) · 🇰🇪 [sw](../../../sw/docs/security/BAN_DETECTION.md) · 🇮🇳 [ta](../../../ta/docs/security/BAN_DETECTION.md) · 🇮🇳 [te](../../../te/docs/security/BAN_DETECTION.md) · 🇹🇭 [th](../../../th/docs/security/BAN_DETECTION.md) · 🇹🇷 [tr](../../../tr/docs/security/BAN_DETECTION.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/security/BAN_DETECTION.md) · 🇵🇰 [ur](../../../ur/docs/security/BAN_DETECTION.md) · 🇺🇿 [uz](../../../uz/docs/security/BAN_DETECTION.md) · 🇻🇳 [vi](../../../vi/docs/security/BAN_DETECTION.md) · 🇳🇬 [yo](../../../yo/docs/security/BAN_DETECTION.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/security/BAN_DETECTION.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/security/BAN_DETECTION.md)

---

OmniRoute durchsucht Upstream-Fehlerantworten nach Signalen, die darauf hindeuten, dass ein Provider-**Konto dauerhaft unbrauchbar ist** (gesperrt / deaktiviert / wegen Verstoßes gegen die Nutzungsbedingungen gesperrt), und versetzt die betreffende Verbindung bei einem Treffer in einen **terminalen `banned`-Status**, sodass sie nicht mehr für Anfragen ausgewählt wird. Dies wird über die Einstellungskarte **Sicherheit → Gesperrte Schlüsselwörter** konfiguriert („Zusätzliche Schlüsselwörter, die die Erkennung einer dauerhaften Kontosperrung auslösen. Integrierte Schlüsselwörter gelten immer.“).

Diese Seite dokumentiert die integrierte Liste, den Erkennungsablauf, ihren Geltungsbereich, das sichere Hinzufügen benutzerdefinierter Schlüsselwörter und die Wiederherstellung einer markierten Verbindung. Der terminale Status selbst ist Teil des Resilienzmodells — siehe
[RESILIENCE_GUIDE](../architecture/RESILIENCE_GUIDE.md) („Terminale Status“).

**Maßgebliche Quelle:** `open-sse/services/accountFallback.ts`
(`ACCOUNT_DEACTIVATED_SIGNALS`, `getMergedBannedSignals()`, `isAccountDeactivated()`).

## Integrierte Schlüsselwörter

Diese 8 Teilzeichenfolgen gelten immer (ohne Beachtung der Groß-/Kleinschreibung), unabhängig von einer benutzerdefinierten Liste:

```
account_deactivated
account has been deactivated
account has been disabled
your account has been suspended
this account is deactivated
verify your account to continue                                 (Antigravity / Google Cloud Code)
this service has been disabled in this account for violation    (Antigravity)
this service has been disabled in this account                  (Antigravity)
```

> Diese Liste wird weiterentwickelt, wenn Provider den Wortlaut ihrer Sperrmeldungen ändern. Die maßgebliche
> Fassung ist `ACCOUNT_DEACTIVATED_SIGNALS` in `open-sse/services/accountFallback.ts`;
> betrachten Sie den obigen Block als Momentaufnahme.

Zwei angrenzende, **separate** Signaltabellen befinden sich in derselben Datei und sind _nicht_ Teil der Erkennung gesperrter Schlüsselwörter:

- `CREDITS_EXHAUSTED_SIGNALS` — Guthaben/Kontingent aufgebraucht (`insufficient_quota`,
  `credit_balance_too_low`, `payment required`, …) → terminaler Status `credits_exhausted`.
- `OAUTH_INVALID_TOKEN_SIGNALS` — **nicht terminal**; eine Token-Aktualisierung kann den Zustand beheben.

Hinweis: Häufige vorübergehende Formulierungen wie **`rate limit`** / `429` werden über den Pfad für Ratenbegrenzung bzw. Verbindungs-Cooldown verarbeitet und sind **keine** Sperrsignale.

## Erkennungsablauf

```
Upstream-Fehlerantwort
  → Body in Zeichenfolge umgewandelt + in Kleinschreibung konvertiert
  → isAccountDeactivated(body): getMergedBannedSignals().some(sig => body.includes(sig))   [Teilzeichenfolgenabgleich]
  → Treffer?
      → testStatus der Verbindung = "banned"      (dauerhaft — 1 Jahr Cooldown, keine automatische Wiederherstellung)
      → wenn die Einstellung `autoDisableBannedAccounts` aktiviert ist und `autoDisableBannedScope`
        diese Verbindung einschließt (`all` oder `subscription` für OAuth/Cookie/Sitzung)
        → zusätzlich isActive = false. Prepaid-API-Schlüssel bleiben aktiv, wenn der Geltungsbereich
        `subscription` ist.
      → Verbindung wird bei der Kontoauswahl übersprungen (kombinierte QUOTA_BLOCKING-Status)
```

- Der Abgleich ist eine Suche nach **Teilzeichenfolgen ohne Beachtung der Groß-/Kleinschreibung** im **Body** der Antwort
  (`isAccountDeactivated`, `accountFallback.ts`).
- Die dauerhafte Terminalisierung als `banned` wird bei einem Body mit Sperrsignal bei **jedem
  HTTP-Status** ausgelöst (über `markAccountUnavailable` → `checkFallbackError`). Die
  engere Kennzeichnung **`deactivated`** (`isActive=false`, wenn die Verbindung keine
  zusätzlichen API-Schlüssel hat) wird vom Inline-Pfad `chatCore.ts` bei **HTTP 401 / 403**
  geschrieben (klassifiziert über `classifyProviderError` → `ACCOUNT_DEACTIVATED`). Beachten Sie,
  dass der Pfad `markAccountUnavailable()` für dasselbe `ACCOUNT_DEACTIVATED`-Signal einen
  _anderen_ terminalen Status — **`expired`** — schreibt (über
  `resolveTerminalConnectionStatus`), sodass dieselbe Sperre entweder als
  `deactivated` oder `expired` erscheinen kann, je nachdem, welcher Pfad die Antwort verarbeitet hat. (Der
  ältere Codekommentar lautet „wenn ein 401-Body diese Zeichenfolgen enthält“ — das
  beschreibt das aktuelle Verhalten nur unzureichend.)
- Eine Verbindung mit dem Status `banned` wird überall dort von der Auswahl ausgeschlossen, wo terminale Status
  herausgefiltert werden (`isTerminalConnectionStatus`, kombinierte `QUOTA_BLOCKING_CONNECTION_STATUSES`).

## Geltungsbereich — welche Anbieter geprüft werden

**Alle Anbieter.** Die Prüfung wird in der generischen Fehlerbehandlungspipeline ausgeführt,
die jede fehlgeschlagene Upstream-Anfrage durchläuft — sie ist **nicht** auf
OAuth-/Abonnement-Scraper beschränkt. Der daraus resultierende Endzustand gilt pro
**Verbindung**, nicht pro Anbieter.

Allerdings sind die integrierten _Zeichenfolgen_ auf Abonnement-/OAuth-Anbieter
mit einem realen Sperrrisiko ausgerichtet (ChatGPT Web Codex, Claude Web, Codex, Muse Spark,
Antigravity). Ein API-Schlüssel-Anbieter löst die Erkennung nur dann aus, wenn sein Fehlertext
buchstäblich eine der Teilzeichenfolgen enthält.

`autoDisableBannedScope` (`all` | `subscription`, Standardwert `all`) steuert, ob
bei einem Treffer zusätzlich `isActive=false` gesetzt wird. `subscription` bezeichnet
anmeldungsbasierte Zugänge (kostenpflichtige Abonnements und kostenlose Konten,
einschließlich Web-Cookie-Sitzungen). Für vorausbezahlte API-Schlüssel wird weiterhin
`testStatus=banned` erfasst, sie verbleiben jedoch im Routing-Pool. Das dauerhafte
Design sieht eine Überschreibung pro Anbieter und pro Konto vor; die globale
Enumeration ist die erste Ausbaustufe.

## Benutzerdefinierte Schlüsselwörter für Sperren

Fügen Sie Schlüsselwörter unter **Sicherheit → Schlüsselwörter für Sperren** hinzu oder entfernen Sie sie
(dauerhaft als globale Einstellung `customBannedSignals` über
`PATCH /api/settings` gespeichert). Sie werden der integrierten Liste **hinzugefügt** —
sie ersetzen sie niemals — und werden beim Speichern (sowie beim Start) über
`setCustomBannedSignals()` ohne Neustart neu geladen. Jedes Schlüsselwort ist auf
200 Zeichen begrenzt; für die Länge des Arrays gibt es keine Begrenzung.

**⚠ Risiko falsch positiver Treffer — wählen Sie spezifische Formulierungen.**
Die Erkennung führt einen einfachen Teilzeichenfolgenabgleich mit dem gesamten Antworttext
durch, und ein Treffer ist **dauerhaft** (1 Jahr Abkühlzeit, manuelle Wiederherstellung).
Ein zu allgemeines Schlüsselwort kann eine vollkommen funktionsfähige Verbindung sperren:

- **Schlecht:** `quota`, `limit`, `error`, `denied` — kommen in vielen vorübergehenden Fehlern vor.
- **Gut:** vollständige Sperrmeldungen, z. B. `your account has been suspended for`,
  `account permanently banned`, `violation of our terms`.

Bevorzugen Sie die längste eindeutige Formulierung, die der Anbieter bei einer tatsächlichen
Sperre zurückgibt. Beobachten Sie im Zweifelsfall zunächst `lastError` der Verbindung und
fügen Sie anschließend den exakten Wortlaut hinzu.

## Wiederherstellen einer markierten Verbindung

Die Endzustände `banned` / `deactivated` werden **niemals automatisch wiederhergestellt**
(sie sind vom proaktiven Wiederherstellungszyklus ausgeschlossen — nur Abkühlzeiten des
Zustands `unavailable` werden selbstständig aufgehoben). Ein Administrator muss sie
explizit zurücksetzen:

1. **Verbindung erneut testen** — die Dashboard-Aktion **Test**
   (`POST /api/providers/{id}/test`); eine erfolgreiche Prüfung setzt `testStatus`
   auf `active` zurück und löscht die Fehlerfelder.
2. **Erneut authentifizieren / Zugangsdaten bearbeiten** — führen Sie bei OAuth-Anbietern
   den Anmelde-/Aktualisierungsablauf erneut aus; Routen zum Erstellen/Importieren von
   Anbietern setzen `isActive = true`.
3. **Verbindung erneut aktivieren** — falls die automatische Deaktivierung
   `isActive = false` gesetzt hat (Geltungsbereich `all` oder `subscription` für eine
   OAuth-/Cookie-/Sitzungsverbindung), aktivieren Sie sie nach der Behebung des
   Kontoproblems wieder.

Es gibt keine separate Schaltfläche „Sperrmarkierung löschen“ — die Wiederherstellung
erfolgt durch erneutes Testen, erneute Authentifizierung oder erneute Aktivierung,
entsprechend der allgemeinen Regel für Endzustände im
[RESILIENCE_GUIDE](../architecture/RESILIENCE_GUIDE.md).

## Isolierung von Prüfungen (Modell-Test-all)

Ein **prüfungsbedingter Fehler** (Modell-Test-all-/Integritätsprüfungs-Dispatches,
die innerhalb von `runAsProbe` ausgeführt werden) entfernt niemals eine Verbindung
aus dem Pool (#9817): Er wird **zur Nachvollziehbarkeit aufgezeichnet**
(`last_error`, `last_error_type`, `error_code`, `last_error_at`), überspringt jedoch
**jede** Routing-Änderung — Abkühlzeiten, Endstatus (`banned` / `deactivated` /
`credits_exhausted`), modellspezifische Sperren, den Anbieter-Circuit-Breaker,
den 5-Minuten-Kontingentcache, die OAuth-Token-Aktualisierung und die automatische
Deaktivierung. Nur ein Fehler im realen Anfragepfad führt zur Deaktivierung.
Der aufgezeichnete Fehler sorgt dafür, dass ein markiertes Konto im Dashboard
sichtbar ist, während es weiterhin Anfragen verarbeitet.

Der zentrale Entscheidungspunkt ist `shouldIsolateProbeFailures()`
(`src/shared/utils/probeOrigin.ts`), der von **jeder** Stelle abgefragt wird,
die den Routing-Zustand aufgrund eines prüfungsbedingten Fehlers ändern könnte:

- `markAccountUnavailable` (`auth.ts`) — nur Aufzeichnung (`lastError` als Rohtext,
  `lastErrorType`, `errorCode`, `lastErrorAt`; bewusst **kein**
  `backoffLevel`, da dies den automatischen Abbau bei der Auswahl auslösen und
  den Eintrag löschen würde)
- `maybeAutoDisableBannedAccount` — keine automatische Deaktivierung
- `chatCore` — FORBIDDEN, ACCOUNT_DEACTIVATED, QUOTA_EXHAUSTED (nur Aufzeichnung,
  kein Endstatus `credits_exhausted`), GEO_BLOCKED (kein 24-stündiger Ausschluss),
  MODEL_NOT_FOUND (kein `lockModel`), das Codex-429-Failover mit Kontorotation
  (kein `markCodexScopeRateLimited`, kein persistiertes `rate_limited_until`, keine
  Aufhebung der Sitzungsaffinität), `persistCodexQuotaState` (kein Schreiben des
  Kontingentstatus, keine Cache-Invalidierung), `recordKeyHealthStatus`
  (Schlüsselstatus-Rotator bleibt unverändert)
- OAuth-Aktualisierung — sowohl die proaktive Aktualisierung in der Executor-Basisklasse
  (`base.ts` `execute()`, es wird keine Rotation des Aktualisierungstokens verbraucht)
  als auch der reaktive 401/403-Pfad in `chatCore` (keine `expired`-Deaktivierung)
- `chat.ts` — Anbieter-Circuit-Breaker und der 5-Minuten-Kontingentcache
  (`markAccountExhaustedFrom429`) werden niemals beeinträchtigt

Der aufgezeichnete Fehler sorgt dafür, dass ein markiertes Konto im Dashboard
sichtbar ist, während es weiterhin Anfragen verarbeitet. Hinweis: Der Prüfungseintrag
speichert den **rohen** (nicht gekürzten) Fehlertext, anders als die Kürzung
`slice(0,100)` im realen Pfad.

Administratoren, die Test-all als Wartungswerkzeug verwenden, können das bisherige
Verhalten (die Prüfung zählt als reale Generierung) auf eine der folgenden Arten
wiederherstellen:

- über die Einstellung `probeCanDisable` (`POST /api/settings` mit
  `{"probeCanDisable": true}` oder durch direkte Bearbeitung der `key_value`-Datenbank), oder
- über das Feature-Flag **`PROBE_CAN_DISABLE=true`** (Umgebungs- oder
  Datenbanküberschreibung; hat Vorrang vor der Einstellung).

Ausfallsicherheit: Falls die Abfrage des Flags oder der Einstellungen einen Fehler
auslöst, bleibt die Isolierung AKTIV.

## Quelldateien

| Bereich                                                    | Datei                                                                                                         |
| ---------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------- |
| Signaltabellen + Abgleich                                  | `open-sse/services/accountFallback.ts`                                                                        |
| Finalisierung / Persistierung                              | `src/sse/services/auth.ts` (`markAccountUnavailable`, `resolveTerminalConnectionStatus`, `clearAccountError`) |
| Geltungsbereich der automatischen Deaktivierung            | `src/shared/utils/autoDisableBanned.ts`, `src/sse/services/autoDisableBannedAccount.ts`                       |
| Inline-Klassifizierung                                     | `open-sse/handlers/chatCore.ts`, `open-sse/services/errorClassifier.ts`                                       |
| Ausschluss von der Wiederherstellung bei terminalem Status | `src/lib/quota/connectionRecovery.ts`                                                                         |
| Laden benutzerdefinierter Schlüsselwörter zur Laufzeit     | `src/lib/config/runtimeSettings.ts` (`setCustomBannedSignals`)                                                |
| Einstellungsoberfläche                                     | `src/app/(dashboard)/dashboard/settings/components/SecurityTab.tsx`                                           |
