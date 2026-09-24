# Radar Free-Model Catalog (Deutsch)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/RADAR.md) · 🇪🇹 [am](../../../am/docs/frameworks/RADAR.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/RADAR.md) · 🇦🇿 [az](../../../az/docs/frameworks/RADAR.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/RADAR.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/RADAR.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/RADAR.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/RADAR.md) · 🇩🇰 [da](../../../da/docs/frameworks/RADAR.md) · 🇬🇷 [el](../../../el/docs/frameworks/RADAR.md) · 🇪🇸 [es](../../../es/docs/frameworks/RADAR.md) · 🇪🇪 [et](../../../et/docs/frameworks/RADAR.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/RADAR.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/RADAR.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/RADAR.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/RADAR.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/RADAR.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/RADAR.md) · 🇮🇱 [he](../../../he/docs/frameworks/RADAR.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/RADAR.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/RADAR.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/RADAR.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/RADAR.md) · 🇮🇩 [id](../../../id/docs/frameworks/RADAR.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/RADAR.md) · 🇮🇹 [it](../../../it/docs/frameworks/RADAR.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/RADAR.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/RADAR.md) · 🇰🇭 [km](../../../km/docs/frameworks/RADAR.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/RADAR.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/RADAR.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/RADAR.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/RADAR.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/RADAR.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/RADAR.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/RADAR.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/RADAR.md) · 🇲🇲 [my](../../../my/docs/frameworks/RADAR.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/RADAR.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/RADAR.md) · 🇳🇴 [no](../../../no/docs/frameworks/RADAR.md) · 🇮🇳 [or](../../../or/docs/frameworks/RADAR.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/RADAR.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/RADAR.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/RADAR.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/RADAR.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/RADAR.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/RADAR.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/RADAR.md) · 🇱🇰 [si](../../../si/docs/frameworks/RADAR.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/RADAR.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/RADAR.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/RADAR.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/RADAR.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/RADAR.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/RADAR.md) · 🇮🇳 [te](../../../te/docs/frameworks/RADAR.md) · 🇹🇭 [th](../../../th/docs/frameworks/RADAR.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/RADAR.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/RADAR.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/RADAR.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/RADAR.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/RADAR.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/RADAR.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/RADAR.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/RADAR.md)

---

> **Maßgebliche Quelle:** `src/lib/radar/`, `src/lib/db/radar.ts`, `src/app/api/radar/`
> **Zuletzt aktualisiert:** 2026-09-01 — v3.8.51
> **Nachweisgrenze für den gehosteten Dienst:** Die hier beschriebenen serverseitigen Regeln wurden am
> 2026-09-01 anhand des bewusst privaten Radar-Servers in der exakten Revision
> `main@dce70f004364912f3f144cdb69f4cbcde16093ed` verifiziert. Diese Implementierung wird nicht in
> diesem OSS-Repository bereitgestellt; die Verfügbarkeit des gehosteten Dienstes bleibt ein separater Betriebszustand.

Radar ist ein **optionales Add-on**, das einen signierten, aktuell kuratierten Katalog kostenloser Modelle
über den Release-Basisbestand (`FREE_MODEL_BUDGETS` in
`open-sse/config/freeModelCatalog.data.ts`) legt. Es existiert, weil sich die Landschaft der kostenlosen Kontingente
schneller verändert als der Release-Zyklus — Anbieter fügen zwischen Releases kostenlose Kontingente hinzu,
reduzieren sie oder stellen sie ein, während der Basiskatalog nur bei Veröffentlichung einer neuen Version
aktualisiert werden kann.

**Nichts, was heute kostenlos ist, wird aufgrund des Remote-Feeds kostenpflichtig.** Radar
belegt Basiseinträge niemals mit einer Bezahlschranke; es aktualisiert lediglich Limits und Statusfelder zur
Lesezeit und kann zwischen Releases neu entdeckte kostenlose Modelle ergänzen. Betreiber können ein
Modell weiterhin lokal ausblenden und es über dasselbe Dashboard wiederherstellen. Der Basiskatalog selbst
wird auf dem Datenträger niemals verändert — siehe nachfolgend
[Regeln für das Zusammenführen des Overlays zur Lesezeit](#read-time-overlay-merge-rules).

---

## Bereitstellungsstatus in v3.8.51

Der folgende Status unterscheidet zwischen dem, was dieses OSS-Release implementiert, und späteren
Radar-Arbeitsbereichen. Es handelt sich um einen Status auf Codeebene, nicht um eine Zusage, dass eine bestimmte
gehostete Bereitstellung oder externe Integration derzeit verfügbar ist.

| Bereich                                 | Status in diesem Release                                                                                                                                                                                                                                                                                    |
| --------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Client für signierten Katalog           | Hinter `RADAR_ENABLED` implementiert, mit separater Zustimmung, Ed25519-Verifizierung, lokalen verschlüsselten Einstellungen und Caches, dauerhaften Anzeige- und Aktivierungsüberschreibungen, reversiblen Tombstones, Scheduler und Dashboard.                                                            |
| Aktivierung für Mitwirkende             | Das Dashboard verlinkt auf den vom Server gehosteten GitHub-Claim-Ablauf und akzeptiert einen vorhandenen `omr_…`-Schlüssel. Die Berechtigung Mitwirkender wird vom privaten Dienst ermittelt; der OSS-Client enthält weder GitHub-Token noch Ausgabelogik.                                                 |
| Aktivierung per Unterstützerschlüssel   | Implementiert. Der Rohschlüssel wird validiert, im Ruhezustand verschlüsselt, bei Lesezugriffen maskiert und nur durch die serverseitige Synchronisierung gesendet. Das Ändern oder Löschen des Schlüssels invalidiert alle vier berechtigungsabhängigen Feed-Caches.                                       |
| Empfehlungslinks                        | Als separat signierter, stündlich aktualisierter Feed implementiert. Feste Links stehen der Community-Stufe sofort zur Verfügung; zeitlich begrenzte Kampagnen bleiben Live-Stufendaten.                                                                                                                    |
| Unterstützerangebote                    | Als separater signierter, ausschließlich live verfügbarer Feed und als Dashboard-Seite implementiert. Der Client revalidiert das geschlossene Vorteilschema, bewahrt den letzten gültigen Cache, filtert abgelaufene Einträge und kennzeichnet Partnerangebote ausdrücklich.                                |
| Informationen und Unterstützererkennung | Als strikter signierter, ausschließlich live verfügbarer Feed mit Radar-eigener ELO, sachlichen Angaben zu Aktualität und Trends des Katalogs, einem verifizierten lokalen Unterstützerabzeichen, einer Dashboard-Seite und ausschließlich lokalen CLI-Status- und Synchronisierungsbefehlen implementiert. |
| Zahlungen und Transaktions-E-Mails      | Im OSS-Client nicht implementiert. Kauf, Spende, Belegprüfung, Wiederherstellung und E-Mail-Versand gehören zum privaten Dienst; die Verfügbarkeit des gehosteten Dienstes hängt weiterhin von dessen überwachter Bereitstellung und Anbieterkonfiguration ab.                                              |
| Arbeitsbereich Forschungsagent          | Nicht Bestandteil dieses Client-Releases. Die Inhalte des kuratierten Feeds bleiben serverseitige Daten; in einer OmniRoute-Installation wird kein autonomer Forschungsagent ausgeführt.                                                                                                                    |

---

## Leser für öffentliche Ankündigungen

Der generische Leser für Ankündigungen ist vom Radar-Feature-Flag getrennt. Die Dashboard-Startseite und
die Changelog-Ansicht rufen die öffentliche Datei `news.json` des Repositorys über einen einfachen `GET` an
`NEWS_JSON_URL` (`src/shared/utils/releaseNotes.ts`) ab. Dabei werden weder Radar-Einstellungen noch Prompts, Provider-
Konfigurationen, Nutzungsdatensätze oder lokale Verwerfungszustände gesendet.

`news.json` verwendet das geschlossene v2-Schema, das von `parseNewsPayload()` implementiert wird:

- `schemaVersion: 2` und eine begrenzte `items[]`-Sammlung;
- stabile, eindeutige `id`-Werte für Ankündigungen;
- explizite Felder `active` und `publishedAt` im ISO-Format;
- erforderlicher englischer Text mit optionalen lokalisierten Texten;
- optionale HTTPS-Links ohne Anmeldedaten und ein Symbol aus einer Positivliste;
- Auswahl der neuesten aktiven Ankündigung zuerst, Rückgriff auf Englisch, wenn die gewünschte Sprache nicht verfügbar ist, sowie lokale Verwerfung pro ID.

Der Parser akzeptiert vorübergehend die frühere singuläre Form `{ active, title, message, ... }`, damit
ältere Forks ohne eine defekte Changelog-Ansicht migriert werden können. Ungültige Feeds bleiben wirkungslos. Der Radar-Launch-
Eintrag wird mit `active: false` ausgeliefert; die Änderung auf `true` ist eine separate Release-Aktion nach dem Merge und nach dem Deployment
und ändert weder `RADAR_ENABLED` noch die unabhängige Zustimmung zur Feed-Synchronisierung.

---

## Flag: `RADAR_ENABLED` (standardmäßig deaktiviert)

Radar wird durchgängig durch das Feature-Flag `RADAR_ENABLED` geschützt
(`src/shared/constants/featureFlagDefinitions.ts`, Kategorie `policies`,
`defaultValue: "false"`).

**Wenn das Flag deaktiviert ist, existiert die Oberfläche nicht:**

- Alle `/api/radar/*`-Endpunkte, einschließlich lokaler Lese- und Schreibvorgänge für den Modellzustand,
  geben `404` zurück, bevor ein Radar-Modul angesprochen wird.
- Die Dashboard-Seiten (`/dashboard/radar`, `/dashboard/radar/setup`,
  `/dashboard/radar/combos`, `/dashboard/radar/offers`, `/dashboard/radar/intel`) führen
  `notFound()` aus.
- `getRadarCatalog()` (`src/lib/radar/index.ts`) gibt den unveränderten Ausgangsbestand zurück —
  dieselbe Anzahl an Einträgen, dieselben Werte, jeder Eintrag mit `origin: "baseline"` gekennzeichnet — und liest
  niemals den Feed-Cache.
- Es wird niemals ein Radar-Netzwerkaufruf ausgeführt; jedes Synchronisierungsmodul gibt `{ status: "disabled" }`
  zurück, bevor `fetch` angesprochen wird.

Dies ist eine strikte übergeordnete Sperre: Das Aktivieren des Flags schaltet lediglich die _Oberflächen_
frei. Es lädt keine Daten hoch, startet keine Hintergrundsynchronisierung und ändert weder
Routing noch Modellauswahl — siehe die separate Zustimmung unten.

---

## Die Datensynchronisierung ist eine SEPARATE Zustimmung — das Datenschutzversprechen

Das Aktivieren von `RADAR_ENABLED` schaltet lediglich die Benutzeroberfläche frei. Die Synchronisierung des Feeds erfordert eine zweite,
unabhängige Zustimmung, die in `radar_settings.opt_in` gespeichert wird (`src/lib/db/radar.ts`,
Migration `136_radar_cache_settings.sql`). `syncRadar()` prüft das Flag _und_ die
Zustimmung, bevor ein Netzwerkaufruf ausgeführt wird:

```
Flag deaktiviert → { status: "disabled" }   — kein Netzwerkaufruf
Zustimmung fehlt → { status: "opt_out" }    — kein Netzwerkaufruf
```

Wenn beide aktiviert sind, sieht der Synchronisierungspfad wie folgt aus:

1. `GET <Feed-Basis-URL>/v1/catalog/latest` mit `x-omniroute-radar-schema: 2` und einem optionalen
   `Authorization: Bearer <Supporter-Schlüssel>`-Header (siehe unten). Server verwenden standardmäßig das separat
   signierte v1-Übergangsartefakt, wenn der Schema-Header fehlt, sodass ältere installierte Clients weiterhin
   Aktualisierungen erhalten.
2. Dies ist ein reiner Download-Ablauf der Anwendung, dennoch handelt es sich um eine HTTPS-Anfrage. Die gehostete
   Infrastruktur empfängt gewöhnliche Verbindungsmetadaten wie die Quell-IP-Adresse. Wenn ein Supporter-
   Schlüssel konfiguriert ist, sendet die Synchronisierung diesen Schlüssel außerdem im Bearer-Header, damit der Dienst die
   Berechtigung ermitteln kann. In genau der privaten Server-Revision, die innerhalb der oben beschriebenen Nachweisgrenze angegeben ist,
   verwendet die Erfassung von Feed-Anfragen Schlüssel-Hashes, aggregierte Nutzung und einen täglich wechselnden gekürzten HMAC
   der IP-Adresse für die manuelle Missbrauchsprüfung; in diesen Tabellen werden weder der Schlüssel noch die IP-Adresse in Rohform gespeichert.
   Infrastruktur-Zugriffsprotokolle und die verschlüsselte Versand-Outbox bilden separate betriebliche
   Grenzen.
3. OmniRoute sendet niemals Prompts, Antworten, Konversationen, Provider-Anmeldedaten, Modellverkehr,
   Verfügbarkeit, Latenz oder die lokale Provider-Konfiguration an den Radar-Dienst.
4. Die Antwort wird verifiziert, validiert und lokal zwischengespeichert (siehe
   [Sicherheitsmodell](#security-model)). Radar verfügt über genau vier serverseitige Netzwerkpfade:
   `syncRadar()` für den Katalog, `syncRadarReferrals()` für Empfehlungen sowie
   `syncRadarOffers()` / `syncRadarIntel()` für Supportern vorbehaltene Angebote und Intel.

Der **Supporter-Schlüssel** ist ein optionales Bearer-Token (`radar_settings.supporter_key`),
mit dem der Feed-Dienst entscheidet, welche Stufe bereitgestellt wird (siehe
[Stufen](#tiers-community-and-live)). Er wird:

- **Im Ruhezustand verschlüsselt** mit denselben AES-256-GCM-Hilfsfunktionen `encrypt()`/`decrypt()`
  (`src/lib/db/encryption.ts`) gespeichert, die auch für Provider-Anmeldedaten verwendet werden.
- Über `POST /api/radar/settings` (`{ supporterKey: "omr_" + 40 hex chars }`) festgelegt und
  **niemals zurückgegeben** — die Antwort enthält eine maskierte Form (`omr_****abcd`).
- Beim Ändern oder Löschen werden die Caches für Katalog, Empfehlungen, Angebote und Intel atomar invalidiert. Bei der
  nächsten Synchronisierung bzw. beim nächsten Lesevorgang wird die neue Berechtigung serverseitig ermittelt; das Speichern eines Schlüssels löst nicht selbst
  eine Netzwerkanfrage aus und verbraucht keinen einmalig verwendbaren Aktivierungsschlüssel.
- Bei der Synchronisierungs-GET-Anfrage als Bearer-Token an den Feed-Dienst gesendet — keine anderen Informationen über den
  Schlüssel verlassen jemals den Client.

---

## Vor dem Opt-in angezeigte Zugriffs- und Sicherheitsregeln

Das inaktive Dashboard zeigt diese Regeln aus
`src/app/(dashboard)/dashboard/radar/RadarAccessExplainer.tsx` **vor** einer der beiden Aktivierungsaktionen an.
Die verbindliche Zugriffsskala lautet:

| Stufe                     | Berechtigung                                                                                                                          | Zugriff                                                       | Wiederholungs-/Ablaufregel                                                                       |
| ------------------------- | ------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------- | ------------------------------------------------------------------------------------------------ |
| Community                 | Jeder; kein Schlüssel                                                                                                                 | Vollständiger Katalog mit etwa 30 Tagen Verzögerung           | Immer verfügbar; keine Ausstellung                                                               |
| Stern + Folgen            | GitHub OAuth verifiziert sowohl einen Stern für das Repository als auch das Folgen des Eigentümers                                    | Ein einmaliger Zugriff auf den Live-Katalog, danach Community | Eine Ausstellung pro Anmeldung; keine erneute Ausstellung                                        |
| Mitwirkende Top 10        | Plätze 1–10 in der neuesten vollständigen wöchentlichen Rangliste                                                                     | 365 Live-Tage                                                 | Auf Anforderung beansprucht; das Verlassen der Rangliste verkürzt einen gewährten Zeitraum nicht |
| Mitwirkende Top 100       | Plätze 11–100 in dieser Rangliste                                                                                                     | 90 Live-Tage                                                  | Dieselbe anforderungsbasierte/idempotente Beanspruchungsregel                                    |
| Supporter-Kauf            | Einmaliger Kauf für 6 Monate, 1 Jahr oder lebenslang                                                                                  | Live-Katalog, signierte Live-Angebote und Intel               | Keine automatische Verlängerung                                                                  |
| Spende/manuelle Gewährung | Vom Eigentümer geprüfte Spende oder eine Gewährung durch den Eigentümer für eine ausdrücklich festgelegte Anzahl von Tagen/lebenslang | Dieselbe Live-Berechtigung für den gewährten Zeitraum         | Auditierte, idempotente Gewährung                                                                |

Zusammengeführte PRs, Commits und geänderte Zeilen sind **nur Eingaben für die Rangliste**. Eine Anmeldung außerhalb der Top 100 erhält
unabhängig von der Anzahl der PRs keine Berechtigung für Mitwirkende. Befristete Käufe, Spenden, Zeiträume für Mitwirkende und
manuelle Gewährungen werden ab dem aktuellen Ablaufdatum kumuliert; eine lebenslange Berechtigung hat Vorrang. Eine Änderung des Rangs
widerruft oder verkürzt bereits gewährte Zeit niemals rückwirkend.

Die gehostete Lizenz ist personenbezogen, und die für Benutzer sichtbare Regel erlaubt jeweils nur eine aktive Installation. Dieses
Release beansprucht **keine** Hardwarebindung: Die OSS-Synchronisierung erstellt keinen Hardware-Fingerabdruck und verwaltet keine
kryptografische Geräte-Lease. Bei der oben genannten verifizierten Revision des privaten Servers besteht die implementierte Durchsetzung
aus der Validierung der Berechtigung sowie einem Signal zur manuellen Überprüfung, wenn derselbe aktive Schlüssel innerhalb von 24 Stunden von einer vierten
eindeutigen IP-Adresse erkannt wird. Dieses Signal sperrt oder widerruft einen Schlüssel niemals automatisch. Die Wiederherstellung
widerruft und ersetzt den verlorenen Schlüssel unter Beibehaltung des bestehenden Ablaufdatums; sie startet den
gekauften oder gewährten Zeitraum nicht neu.

Live-Angebote werden manuell kuratiert und können sich ändern oder ablaufen. Der Opt-in-Bildschirm benennt außerdem die genaue
Datenschutzgrenze: Signierte Katalog-/Referral-Metadaten werden heruntergeladen; ein gültiger Schlüssel schaltet zusätzlich
signierte Angebote und Intel frei; der Bearer-Schlüssel und normale Verbindungsmetadaten erreichen den gehosteten Dienst;
Prompts, Antworten, Unterhaltungen, Anbieter-Zugangsdaten, Modell-Traffic, Verfügbarkeit, Latenz und die lokale
Anbieterkonfiguration hingegen nicht.

---

## Einen Supporter-Schlüssel erhalten

Der Aktivierungsbildschirm (`/dashboard/radar`) verweist auf zwei Abläufe zum **Erhalt** eines
Supporter-Schlüssels. Das OSS-Repository selbst stellt niemals einen Schlüssel aus, führt keinen Zahlungscode aus und
**nennt niemals einen Preis** — die Preisgestaltung wird vollständig auf den
Zielseiten festgelegt und angezeigt, nicht in diesem Repository (Spezifikationsentscheidung D14).

- **„Ich bin Mitwirkender“** — öffnet `RADAR_CONTRIBUTOR_CLAIM_URL` (Standard:
  `https://radar.omniroute.online/auth/github`), einen auf dem privaten Radar-Server gehosteten
  GitHub-OAuth-Ablauf zur Anforderung. Er prüft das jüngste vollständig abgeschlossene wöchentliche Ranking: Die Top 10 erhalten 365 Tage
  und die Plätze 11–100 erhalten 90 Tage. Außerhalb der Top 100 gewährt die Anzahl der PRs niemals Zugriff; stattdessen
  prüft der Ablauf die separate, einmalig nutzbare Stufe für Stern + Folgen.
- **„Projekt unterstützen“** — öffnet `RADAR_SUPPORTER_PLANS_URL` (Standard:
  `https://radar.omniroute.online/planos`), die gehostete Seite mit den einmaligen Optionen für 6 Monate, 1 Jahr und
  lebenslange Nutzung. Die OSS-Seite zeigt weiterhin keinen Geldbetrag an.

Beide URLs werden serverseitig aufgelöst (`src/lib/radar/links.ts`, dasselbe Muster für Umgebungsüberschreibungen
wie bei `RADAR_FEED_URL`) und über die bestehende Antwort von
`GET /api/radar/settings` (`contributorClaimUrl`, `supporterPlansUrl`) an das Dashboard weitergeleitet — die
Client-Komponente liest `process.env` niemals selbst aus.

| Variable                      | Zweck                                                                                                          |
| ----------------------------- | -------------------------------------------------------------------------------------------------------------- |
| `RADAR_CONTRIBUTOR_CLAIM_URL` | Überschreibt die URL zur Anforderung für Mitwirkende (Standard: `https://radar.omniroute.online/auth/github`). |
| `RADAR_SUPPORTER_PLANS_URL`   | Überschreibt die URL für Supporter-Optionen (Standard: `https://radar.omniroute.online/planos`).               |

### Einen verlorenen Supporter-Schlüssel wiederherstellen

Der Einstiegspunkt des gehosteten Dienstes zur Wiederherstellung lautet `https://radar.omniroute.online/recover`; er ist außerdem
auf der Seite mit den Optionen verlinkt. Die Wiederherstellung bleibt vollständig außerhalb des OSS-Clients, da die lokale
Installation niemals die E-Mail-Adresse des Käufers/Mitwirkenden erhält und aus ihren verschlüsselten Einstellungen keinen
unverschlüsselten Schlüssel rekonstruieren kann.

1. Übermitteln Sie die mit dem Schlüssel verknüpfte E-Mail-Adresse. Der Dienst gibt unabhängig davon, ob eine
   wiederherstellbare Lizenz vorhanden ist, dieselbe Bestätigungsseite zurück, sodass das Formular keine Konten offenlegt.
2. Falls eine Berechtigung besteht, sendet der Zustellungs-Worker einen kurzlebigen, einmalig nutzbaren Link. Beim Öffnen wird
   das Token sofort in ein temporäres, verschlüsseltes `HttpOnly`/`Secure`-Cookie verschoben und auf die bereinigte
   `/recover`-URL weitergeleitet; die Seite enthält weder Token noch E-Mail-Adresse, alten Schlüssel oder Ersatzschlüssel.
3. Bestätigen Sie den Widerruf. Der private Dienst widerruft den bisherigen Schlüssel, erstellt den Ersatz mit
   derselben Option/demselben Ablaufdatum und reiht ihn innerhalb einer Transaktion für den E-Mail-Versand ein. Der Ersatz wird niemals
   an den Browser zurückgegeben.
4. Fügen Sie den Ersatz in `/dashboard/radar` ein. Der alte Schlüssel muss nun auf `community` zurückgestuft werden; der
   Ersatz muss eine verifizierte `live`-Synchronisierung bewirken. Das erneute Öffnen desselben Wiederherstellungslinks muss
   mit einer generischen Antwort für einen ungültigen/abgelaufenen Link fehlschlagen.

Die gehostete Wiederherstellungsroute und der Mail-Worker können im Code vorhanden sein, in einer bestimmten
Bereitstellung jedoch trotzdem nicht verfügbar sein. Bezeichnen Sie den Ablauf erst dann als produktionsbereit, wenn der Server bereitgestellt,
der Zustellungsanbieter mit einem kontrollierten Empfänger konfiguriert und der vollständige einmalig nutzbare Link getestet wurde.

Sobald ein Besucher einen Schlüssel besitzt (`omr_` + 40 Hexadezimalzeichen), bietet der Aktivierungsbildschirm
(`src/app/(dashboard)/dashboard/radar/page.tsx`) als primären
Weg ein Eingabefeld zum Einfügen des Schlüssels: Wird ein Schlüssel eingefügt und abgesendet, wird in einem Aufruf
`POST /api/radar/settings` (`{ optIn: true, supporterKey }`) gesendet — durch das Einfügen eines Schlüssels wird dieser sowohl gesetzt als auch die Teilnahme aktiviert,
wodurch der Bildschirm entsperrt wird. Das Format (`omr_` + 40 Hexadezimalzeichen) wird zur Verbesserung der Benutzerfreundlichkeit zunächst clientseitig
mit der gemeinsamen Hilfsfunktion `isValidSupporterKeyFormat()` (`src/lib/radar/supporterKey.ts`)
geprüft; maßgeblich ist in jedem Fall das Zod-Schema des Servers. Sobald ein
Schlüssel gesetzt ist, zeigt der Aktivierungsbildschirm statt eines leeren Eingabefelds die maskierte Form (`supporterKeyMasked` aus
`GET /api/radar/settings`) sowie ein Steuerelement „Schlüssel ändern“ zum
Einfügen eines neuen Schlüssels an — der unverschlüsselte Schlüssel wird niemals erneut angezeigt. Die beiden Schaltflächen für Anforderung/Optionen oben
bleiben der Weg, um überhaupt erst einen Schlüssel zu _erhalten_; in diesem Eingabefeld aktiviert ihn ein Betreiber,
der bereits einen besitzt.

### Durchgängige Aktivierung und geführte Einrichtung

Der private Feed-Dienst und dieser OSS-Client besitzen bewusst eine klar abgegrenzte Schnittstelle: Der Dienst
stellt den Supporter-Schlüssel aus und validiert ihn, während die lokale OmniRoute-Installation den Schlüssel verschlüsselt,
signierte Artefakte serverseitig synchronisiert und durch die Anbietereinrichtung führt. Die Reihenfolge der unterstützten Validierung lautet:

1. Beziehen Sie einen neu ausgestellten oder wiederhergestellten Schlüssel über den Anspruch für Mitwirkende, Pläne/Checkout, den Wiederherstellungsprozess oder einen autorisierten Betreiber eines privaten Servers. Fügen Sie den Rohschlüssel nicht in Protokolle, Screenshots, Issue-Kommentare oder Befehlszeilenargumente ein.
2. Aktivieren Sie das Feature-Flag `RADAR_ENABLED` in der lokalen OmniRoute-Installation. Dadurch wird die Benutzeroberfläche verfügbar, bleibt jedoch netzwerkinaktiv, bis die separate Einwilligung gespeichert wurde.
3. Öffnen Sie `/dashboard/radar`, fügen Sie den Schlüssel ein und aktivieren Sie ihn. Der Browser sendet einmalig lokal einen `POST /api/radar/settings` mit `{ optIn: true, supporterKey }`; der Schlüssel wird lokal verschlüsselt, und die Antwort enthält nur `omr_****<last4>`.
4. Lassen Sie auf dem Aktivierungsbildschirm die Katalogsynchronisierung durchlaufen oder wählen Sie **Jetzt synchronisieren**. Vergewissern Sie sich, dass die Seite `live`, eine Feed-Version und eine Abrufzeit meldet. Für eine authentifizierte lokale Diagnose meldet `GET /api/radar/status` den Einwilligungs-/Schlüsselstatus sowie die vier Cache-Zustände, ohne den Schlüssel zurückzugeben. Mit `POST /api/radar/sync-all` können Katalog, Empfehlungen, Angebote und Intel explizit aktualisiert werden.
5. Öffnen Sie `/dashboard/radar/setup?provider=<provider>`. Folgen Sie der vom Anbieter bereitgestellten Anmeldedaten-URL, wählen Sie **API-Schlüssel hinzufügen**, speichern Sie über das tatsächliche Anbieterformular, kehren Sie zur Anleitung zurück und führen Sie **Verbindung testen** aus. Die Anleitung verwendet die regulären Routen `/api/providers` und `/api/providers/<connection-id>/test`; sie erstellt keine separaten Radar-Anmeldedaten.
6. Öffnen Sie `/dashboard/radar/combos`, nachdem mindestens zwei kompatible Anbieterverbindungen aktiv sind. Prüfen Sie die vorgeschlagene Familie und erstellen Sie die Kombination über die bestehende Combo-API. Angebote und Intel bleiben separate, ausschließlich für `live` verfügbare signierte Caches und können auf ihren jeweiligen Radar-Seiten geprüft werden.
7. Laden Sie `/dashboard/radar` und die Einrichtungsseite neu. Die Einwilligung, der maskierte Schlüsselstatus, der verifizierte Cache, die gespeicherte Anbieterverbindung und die Testaktion müssen das Neuladen überstehen. Erfassen Sie Nachweise erst, nachdem der Rohschlüssel und die Anbieter-Anmeldedaten nicht mehr sichtbar sind.

Das Speichern eines Schlüssels ist für sich genommen kein Nachweis einer gültigen Live-Berechtigung. Der Nachweis ergibt sich aus der Kombination des Ergebnisses von `GET /v1/license/check` des privaten Dienstes, der vom OSS-Katalog bereitgestellten Stufe `live`, eines verifizierten signierten Caches und des tatsächlichen Verbindungs-/Testablaufs für den Anbieter. Bei einem ungültigen, abgelaufenen oder widerrufenen Schlüssel wird der Katalog sicher auf `community` zurückgestuft; dies darf nicht als erfolgreiche Validierung eines Live-Schlüssels gemeldet werden.

### Link zum privaten Admin-Panel

`RADAR_ADMIN_URL` fügt optional unmittelbar nach dem benutzerseitigen Radar-Eintrag im Bereich „Kosten“ der Seitenleiste den Eintrag **Radar-Admin ↗** hinzu. Bewusst ist kein Standardwert vorgesehen: Wenn die Variable nicht gesetzt oder ungültig ist, enthalten die statische Seitenleiste, die Befehlspalette und der Bildschirm zur Anpassung der Seitenleiste weder einen Admin-Eintrag noch eine private URL.

Der Wert wird serverseitig aufgelöst und über die durch die Verwaltungsanmeldung geschützte Antwort von `GET /api/settings` ausschließlich an eine authentifizierte Dashboard-Sitzung oder während eines lokalen Bootstrap-Vorgangs ohne Anmeldung an den vertrauenswürdigen Loopback-Eigentümer übermittelt. Authentifizierungen per CLI, internem Dienst oder API-Schlüssel mit Verwaltungsbereich erhalten ihn nicht. Der Browser validiert die Antwort erneut, bevor er den externen Link erzeugt, der mit `noopener noreferrer` geöffnet wird.

Verwenden Sie eine HTTPS-Tunnel-/Tailnet-URL ohne Anmeldedaten. Unverschlüsseltes HTTP wird nur für eine Loopback-SSH-Weiterleitung wie `http://127.0.0.1:9351` akzeptiert; andere Schemas, eingebettete Anmeldedaten, fehlerhafte URLs und entfernte HTTP-Ziele werden nach dem Fail-Closed-Prinzip abgelehnt und lassen die Navigation inaktiv.

---

## Sicherheitsmodell

### Ed25519-Signatur über exakte Bytes

Die Feed-Nutzlast wird mit Ed25519 signiert. `verifyFeedBytes()`
(`src/lib/radar/verify.ts`) überprüft die Signatur anhand der **exakten Antwortbytes**,
die über die Verbindung empfangen wurden — die Nutzlast wird vor der Überprüfung niemals erneut serialisiert, sodass eine
bytegenaue Neukodierung die Signaturprüfung nicht unbemerkt ungültig machen oder umgehen kann.
Ein Überprüfungsfehler (`invalid_signature`) bricht die Synchronisierung ab, bevor die Nutzlast
geparst oder zwischengespeichert wird.

### Angehefteter öffentlicher Schlüssel + Rotation

Der öffentliche Schlüssel zur Überprüfung ist in `src/lib/radar/pinnedKeys.ts`
(`PINNED_FEED_PUBLIC_KEYS`) fest hinterlegt. Dabei handelt es sich um ein Array, sodass ein neuer Schlüssel vor einer
Rotation vorangestellt werden kann, während ältere zwischengespeicherte Feeds, die mit einem vorherigen Schlüssel signiert wurden, gültig bleiben, bis sie
erneut synchronisiert werden.

### Fork-freundliche Umgebungsvariablen zum Überschreiben

Zwei Umgebungsvariablen ermöglichen Forks und selbstgehosteten Installationen, den Client statt auf den
standardmäßigen OmniRoute-Dienst auf einen eigenen Feed zu verweisen — siehe
[So hosten Sie einen Feed selbst](#how-to-self-host-a-feed) weiter unten:

| Variable            | Zweck                                                                                                                                               |
| ------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------- |
| `RADAR_FEED_URL`    | Überschreibt die Basis-URL des Feeds (Standard: `https://radar.omniroute.online`).                                                                  |
| `RADAR_FEED_PUBKEY` | Überschreibt den angehefteten öffentlichen Schlüssel (Base64-DER-SPKI oder PEM) und ersetzt das integrierte Array durch diesen einzelnen Schlüssel. |

### Versionsuntergrenze

`syncRadar()` lehnt einen heruntergeladenen Feed ab, dessen `version` nicht strikt neuer als die
aktuell zwischengespeicherte Version ist (`compareVersions()`, Vergleich des gepunkteten Formats `YYYY.MM.DD.n`) —
`{ status: "stale" }`. Dadurch wird verhindert, dass ein kompromittierter oder falsch konfigurierter Feed-Endpunkt
einen Client auf eine ältere, anders signierte Nutzlast zurücksetzt.

### Zwei Datumsangaben und warum beide beibehalten werden

Ein zwischengespeicherter Feed enthält zwei unterschiedliche Datumsangaben. Gerade weil diese leicht verwechselt werden können,
werden beide beibehalten:

| Feld          | Herkunft                | Beantwortete Frage                                   |
| ------------- | ----------------------- | ---------------------------------------------------- |
| `generatedAt` | signierter Feed-Inhalt  | Wie alt sind die **Daten**?                          |
| `fetchedAt`   | Uhr dieser Installation | Wann hat diese Installation sie **heruntergeladen**? |

Ein vor wenigen Minuten abgerufener Feed kann mehrere Wochen alte Daten enthalten. Daher kann
`fetchedAt` allein einem Betreiber nicht sagen, ob das Overlay aktueller ist als die zugrunde liegende Baseline.
Beide Werte werden in `radar_feed_cache` gespeichert, von `getRadarCatalog().meta` zurückgegeben und
von `GET /api/radar/status` getrennt gemeldet. Eine Zeile, die zwischengespeichert wurde, bevor die Spalte
`generated_at` existierte (Migration 163), wird als `null` gelesen — unbekannt bleibt unbekannt, anstatt
ersatzweise den Abrufzeitpunkt zu verwenden. `radar_referrals_cache` speichert sein eigenes `generated_at` seit
Migration 142.

Die oben beschriebene Versionsuntergrenze vergleicht `version`, nicht eines der beiden Datumsfelder.

Zwei Lücken bleiben bestehen, beide bewusst: Das Dashboard zeigt weiterhin nur `Last fetched` an. Um dort
das Erstellungsdatum anzuzeigen, wären daher eine neue Bezeichnung (und deren 41 Lokalisierungseinträge) erforderlich.
Außerdem speichern die Angebots- und Intelligence-Caches überhaupt kein Erstellungsdatum, obwohl ihre Feed-Schemas eines enthalten —
`GET /api/radar/status` lässt das Feld für diese beiden daher weg, anstatt `null` zu melden,
was als „unbekannt“ interpretiert würde.

### Schemavalidierung

Die heruntergeladenen Bytes werden **nach** der Signaturprüfung geparst und anhand von `RadarFeedSchema`
(`src/lib/radar/feedSchema.ts`, ein Zod-Schema) validiert. Eine
Schemaabweichung gibt `{ status: "invalid_schema" }` zurück und lässt den Cache
unverändert. Die zwischengespeicherte Nutzlast wird vorsichtshalber bei jedem Lesevorgang erneut validiert
(`getRadarCatalog()`) — bei einer beschädigten oder manuell bearbeiteten Cache-Zeile wird auf die
Baseline zurückgegriffen, anstatt diese auszuliefern.

### Begrenzung der Antwortgröße (10 MB)

`syncRadar()` erzwingt eine **harte Obergrenze von 10 MB** für den Antwortinhalt des Feeds — der signierte
Feed ist ein JSON-Dokument im KB-Bereich. Alles, was darüber hinausgeht, deutet daher auf eine falsch konfigurierte oder
bösartige `RADAR_FEED_URL` (oder auf eine vorgeschaltete Instanz, die Datenmüll ausliefert) hin, nicht auf einen legitimen Katalog.
Die Durchsetzung erfolgt zweistufig:

1. Eine Vorabprüfung von `Content-Length` überspringt das Einlesen des Inhalts vollständig, wenn der
   Header bereits einen Wert oberhalb der Obergrenze angibt.
2. Eine Prüfung der laufenden Gesamtsumme beim Einlesen des Inhalts setzt die Obergrenze auch dann durch, wenn
   `Content-Length` fehlt oder die tatsächliche Größe zu niedrig angibt — dem Header allein wird niemals
   vertraut. Das Verketten der gesammelten Blöcke bewahrt die exakten
   Bytes, die anschließend für die Ed25519-Signaturprüfung benötigt werden.

Wird die Obergrenze überschritten, wird `{ status: "too_large" }` zurückgegeben und der Cache bleibt unverändert.
Dies folgt demselben nicht-destruktiven Muster wie alle anderen Synchronisierungsfehler
(`invalid_signature`, `invalid_schema`, `stale`).

---

## Stufen: `community` und `live`

Das Feed-Schema enthält ein Feld `tier: "community" | "live"`, das **serverseitig**
vom Feed-Dienst auf Grundlage der Anfrage bestimmt wird (Vorhandensein und Gültigkeit
des Unterstützerschlüssels) — der Client bestimmt niemals seine eigene Stufe.

- **`community`** — der kostenlose Katalog, der den aktuellsten Daten ungefähr 30 Tage
  hinterherhinkt. Diesen erhält eine nicht authentifizierte Anfrage oder eine Anfrage
  mit ungültigem Schlüssel.
- **`live`** — der aktuellste Katalog, der für Anfragen mit einem gültigen
  Unterstützerschlüssel bereitgestellt wird.

**Bei einem ungültigen oder abgelaufenen Unterstützerschlüssel erfolgt eine Rückstufung
auf `community` — dies ist niemals ein Fehler.** Der Synchronisierungspfad unterscheidet
nur Signatur-/Schema-/Versionsfehler (alle behebbar und für den zwischengespeicherten
Zustand nicht schwerwiegend) von einem erfolgreichen `{ status:
"updated", version, tier }`. Es gibt keinen stufenspezifischen Fehlerpfad, den ein
Client behandeln müsste.

### Die bereitgestellte Stufe stammt aus einem Antwort-Header, nicht aus dem signierten Body

Das Feld `tier` im signierten Feed-**Body** lautet immer `"live"` — der Feed-Dienst
liefert **zwei signierte Artefakte pro Version** aus: „live“ enthält aktuelle Kampagnen,
„community“ lässt sie aus. Jedes Artefakt wird über seine eigenen exakten Bytes signiert.
Der Body dient weiterhin nicht als Berechtigungsentscheidung; die tatsächlich für eine
Anfrage ausgewählte Stufe wird im **Antwort-Header `x-omniroute-feed-tier`** übermittelt
und serverseitig anhand des `Authorization`-Schlüssels der Anfrage bestimmt.

`syncRadar()` (`src/lib/radar/sync.ts::parseServedTierHeader()`) ist die einzige Stelle,
die bestimmt, welcher Stufe ein Client vertrauen soll:

1. `x-omniroute-feed-tier` mit `RadarTierSchema` (Zod) parsen — ein fehlender Header
   oder ein Wert, der nicht exakt `"community"` oder `"live"` entspricht, wird als
   **nicht vorhanden** behandelt (er wird niemals unverändert als vertrauenswürdig
   in den Cache/die UI übernommen; dies deckt auch ältere Feed-Server ab, die vor
   Einführung des Headers existierten).
2. Nur dann auf das Feld `tier` des signierten Bodys (immer `"live"`) zurückgreifen,
   wenn Schritt 1 kein Ergebnis liefert.
3. Die ermittelte Stufe wird zwischengespeichert und als `{ status: "updated",
version, tier }` zurückgegeben — diesen Wert zeigt das Dashboard an, niemals das
   unverarbeitete Body-Feld.

---

## Regeln für die Overlay-Zusammenführung beim Lesen

`applyFeed()` (`src/lib/radar/applyFeed.ts`) führt den zwischengespeicherten Feed
**zur Lesezeit** innerhalb von `getRadarCatalog()` **über** der statischen Basis
zusammen. Das Basis-Array (`FREE_MODEL_BUDGETS`) wird niemals verändert — bei jedem
Aufruf wird ein neues `MergedEntry[]` berechnet.

Vier Regeln in absteigender Prioritätsreihenfolge:

1. **Der Feed überschreibt niemals eine lokale Überschreibung.** Feldweise gilt:
   Wenn der Betreiber ein Feld eines Eintrags angepasst hat (`localOverrides`-Map,
   indiziert nach `provider:modelId`), wird der Feed-Wert für dieses spezifische Feld
   übersprungen — der Wert des Betreibers gewinnt.
2. **`enabled: false` deaktiviert den Eintrag und dokumentiert die Herkunft.** Ein
   Feed-Eintrag, der einen Eintrag deaktiviert, setzt im zusammengeführten Ergebnis
   `enabled: false` und `disabledBy: "radar"`, sodass die UI erklären kann, _warum_
   ein Eintrag von verfügbar zu deaktiviert gewechselt ist.
3. **Ein vom Benutzer hinzugefügter Eintrag, der nicht im Feed vorhanden ist, bleibt
   unverändert bestehen.** Einträge, die nur in der Basis vorhanden sind (oder lokal
   hinzugefügt wurden) und keinen entsprechenden Feed-Eintrag haben, werden unverändert
   übernommen.
4. **Ein mit einem Tombstone versehener Eintrag wird niemals wiederhergestellt.** Wenn
   der Betreiber einen Eintrag ausdrücklich gelöscht hat (`tombstones`-Set), wird er
   nicht wiederhergestellt, falls der Feed dieses `provider:modelId` in einer späteren
   Version erneut hinzufügt.

Die bearbeitbaren Felder und Tombstones werden in
`radar_local_model_state` (Migration `153_radar_local_model_state.sql`) gespeichert. Der
öffentliche DB-Adapter (`src/lib/db/radar.ts`) konvertiert diese Zeilen in die von
`applyFeed()` verwendete `localOverrides`-Map und das `tombstones`-Set; die
Produktionsversion von `getRadarCatalog()` lädt diesen Zustand, nachdem die Prüfungen
von Flag, Cache und Schema bestanden wurden. Nur `displayName` und `enabled` können
vom Betreiber bearbeitet werden. Anbieter-/Modellidentität, Feed-Herkunft, Kontingent,
Fähigkeiten, Nutzungsbedingungen und Einrichtungsdaten können über diese Oberfläche
nicht geschrieben werden.

Das Dashboard bietet vier lokale Aktionen:

- **Bearbeiten** ändert den lokalen Anzeigenamen und den Aktivierungsstatus.
- **Lokale Änderungen zurücksetzen** löscht beide bearbeitbaren Felder, ohne einen
  Tombstone zu ändern.
- **Ausblenden** erstellt einen Tombstone, sodass spätere Feed-Aktualisierungen die
  Zeile nicht erneut erstellen können.
- **Wiederherstellen** entfernt den Tombstone; jede separat gespeicherte Überschreibung
  bleibt wirksam.

Ein `enabled: false` aus dem Feed bleibt die Sicherheitsausnahme: Es hat Vorrang vor
einem veralteten lokalen `enabled: true`, belässt den zusammengeführten Eintrag im
deaktivierten Zustand und vermerkt `disabledBy: "radar"`.

Katalogveröffentlichungen verwenden `schemaVersion: 2`. `contextWindow` und jeweils
`tools`, `vision` und `thinking` sind unabhängig voneinander `number | null` /
`boolean | null`: `null` bedeutet unbekannt, während `false` bedeutet, dass eine durch
D16 bestätigte offizielle Anbieterquelle ausdrücklich angibt, dass die Fähigkeit nicht
vorhanden ist. Interne Registry-/Modellspezifikations-Flags von OmniRoute werden niemals
direkt zu Feed-Fakten hochgestuft. Der Client akzeptiert weiterhin v1-Snapshots; da der
alte Builder `false` als Platzhalter für Abwesenheit verwendete, wird `false` aus v1 zu
„unbekannt“ normalisiert, während `true` aus v1 weiterhin als Fakt gilt. Unbekannte
Schemaversionen schlagen nach dem Fail-Closed-Prinzip fehl, und der letzte gültige Cache
bleibt verfügbar. Jedes v2-Modell mit einem nicht-null Kontext/einer nicht-null Fähigkeit
muss ein ohne Anmeldedaten zugängliches HTTPS-`metadataEvidenceUrls[]` enthalten;
andernfalls schlägt die Schemavalidierung fehl und der Cache wird nicht ersetzt. Die
Katalogtabelle stellt alle drei Zustände als `✓`, `✕` und `?` dar.

### Geführte Kombinationen und MCP-Zugriff

Bestätigte `familyId`-Werte bleiben beim zur Lesezeit angewendeten Overlay erhalten und
steuern das reine Modul `buildRadarComboSuggestions()`
(`src/lib/radar/comboSuggestions.ts`). Eine Familie wird nur vorgeschlagen, wenn
mindestens zwei unterschiedliche Anbieter über aktive Verbindungen verfügen und die
exakte kuratierte Modell-ID anbieten. Deaktivierte Modelle, inaktive Anbieter, fehlende
Modell-IDs, Familien mit nur einem Eintrag und mehrdeutige Alias-/Präfixübereinstimmungen
schlagen nach dem Fail-Closed-Prinzip fehl. Vorschläge verwenden die vorhandene
`priority`-Strategie, wobei das größte wiederkehrende monatliche Budget zuerst
eingeordnet wird; die UI erstellt sie ausschließlich über `POST /api/combos`.

Die geführte Benutzeroberfläche befindet sich unter `/dashboard/radar/combos`. Sie liest ausschließlich die lokalen Endpunkte
`GET /api/radar/catalog` und `GET /api/combos/builder/options`. Sie löst niemals eine Radar-Synchronisierung aus,
liest keine Anbieterzugangsdaten und schreibt nicht direkt in die Combo-Datenbank.

MCP-Clients können dieselbe lokale Projektion mit `omniroute_radar_catalog` (`read:radar`) lesen. Die
optionalen Filter `provider`, `familyId` und `enabledOnly` werden nach einem einzelnen lokalen
Lesezugriff auf `GET /api/radar/catalog` ausgewertet. Die geschlossene Ausgabe umfasst Katalogmetadaten sowie Anbieter/Modell,
Anzeigename, `familyId`, Kontingent, Funktionen, Aktivierungsstatus, Ursprung und `disabledBy`; Einrichtungs-URLs,
Schritte, Verbindungen, E-Mail-Adressen, Schlüssel und Empfehlungsdaten werden niemals zurückgegeben. Dieses Tool ist
schreibgeschützt und ruft niemals `/api/radar/sync` auf.

### Herkunftsmarkierungen

Jeder zusammengeführte Eintrag enthält ein `origin`-Feld, das die Benutzeroberfläche als Badge darstellt:

- `"baseline"` — unverändert aus dem statischen Veröffentlichungskatalog übernommen.
- `"radar"` — ein oder mehrere Felder wurden durch den Feed aktualisiert.
- `"local"` — der Betreiber hat mindestens eine lokale Überschreibung für diesen Eintrag festgelegt (lokale
  Überschreibungen haben gemäß Regel 1 immer Vorrang vor dem Feed, unabhängig davon, was der Feed angibt).

---

## Lokale Oberflächen — niemals ein Feed-Proxy

Die folgenden lokalen Radar-Routenfamilien unterstützen die Benutzeroberfläche unter `src/app/api/radar/`:

| Route                          | Methode | Zweck                                                                                                                                                |
| ------------------------------ | ------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- |
| `/api/radar/catalog`           | GET     | Gibt den zusammengeführten Katalog (`getRadarCatalog()`) aus dem lokalen Cache zurück.                                                               |
| `/api/radar/sync`              | POST    | Löst serverseitig `syncRadar()` aus und gibt den resultierenden Status zurück.                                                                       |
| `/api/radar/settings`          | GET     | Gibt `{ optIn, hasSupporterKey, supporterKeyMasked }` zurück — niemals den unverschlüsselten Schlüssel.                                              |
| `/api/radar/settings`          | POST    | Legt die Einwilligung und/oder den (verschlüsselten) Unterstützerschlüssel fest.                                                                     |
| `/api/radar/referrals`         | GET     | Gibt `{ fixed, campaigns, tier }` aus dem lokalen Cache zurück — siehe unten [Empfehlungslinks](#referral-links-free-credits).                       |
| `/api/radar/offers`            | GET     | Gibt aktive Angebote aus dem verifizierten lokalen Live-Cache zurück; der Unterstützerschlüssel wird niemals zurückgegeben.                          |
| `/api/radar/offers/sync`       | POST    | Löst die serverseitige, ausschließlich für Live-Schlüssel vorgesehene `syncRadarOffers()`-Pipeline aus.                                              |
| `/api/radar/intel`             | GET     | Gibt verifizierte lokale Live-Intel-Daten sowie einen booleschen Wert zur Unterstützererkennung zurück; niemals eine Identität oder einen Schlüssel. |
| `/api/radar/intel/sync`        | POST    | Löst die serverseitige, ausschließlich für Live-Schlüssel vorgesehene `syncRadarIntel()`-Pipeline aus.                                               |
| `/api/radar/status`            | GET     | Gibt den schreibgeschützten lokalen Einstellungs-/Cache-Status für Katalog, Empfehlungen, Angebote und Intel ohne Geheimnisse zurück.                |
| `/api/radar/sync-all`          | POST    | Führt alle vier serverseitigen Synchronisierungsmodule aus und gibt für jeden Feed einen separaten Status zurück.                                    |
| `/api/radar/local-model-state` | GET     | Listet persistierte Überschreibungen und Tombstones für Steuerelemente zum Bearbeiten/Wiederherstellen auf.                                          |
| `/api/radar/local-model-state` | PATCH   | Legt die validierten Überschreibungsfelder `displayName`/`enabled` fest oder löscht sie.                                                             |
| `/api/radar/local-model-state` | PUT     | Erstellt oder entfernt einen Tombstone mit `{ provider, modelId, tombstoned }`.                                                                      |
| `/api/radar/local-model-state` | DELETE  | Löscht bearbeitbare Überschreibungsfelder, während ein vorhandener Tombstone erhalten bleibt.                                                        |

**Strikte Regel: Diese Routen fungieren niemals als Proxy für den Feed-Dienst.** Der Browser kommuniziert ausschließlich
mit dem lokalen OmniRoute-Server. Die vier Module, die auf den Radar-Dienst zugreifen, sind
`src/lib/radar/sync.ts` (Katalog), `src/lib/radar/referralsSync.ts` (Empfehlungen) und
`src/lib/radar/offersSync.ts` (Angebote) sowie `src/lib/radar/intelSync.ts` (Intel); alle werden
serverseitig und niemals clientseitig ausgeführt. Dadurch bleiben
die Feed-URL und etwaige Unterstützerschlüssel vollständig aus dem clientseitigen Netzwerkverkehr heraus.

Alle Radar-Endpunkte geben `404` zurück, wenn `RADAR_ENABLED` deaktiviert ist (siehe
[Flag](#flag-radar_enabled-default-off) oben), und verarbeiten Routenfehlerantworten gemäß der
repositoryweiten Regel zur Fehlerbereinigung über `buildErrorBody()`/`sanitizeErrorMessage()`
(`docs/security/ERROR_SANITIZATION.md`).

### Authentifizierung

Alle Radar-Endpunkte erfordern eine Authentifizierung über `isAuthenticated()`
(`src/shared/utils/apiAuth.ts`) — ein Dashboard-Sitzungscookie oder einen auf die Verwaltung beschränkten
API-Schlüssel, also dieselbe Zugriffskontrolle, die auch den Rest von `/api/settings/*` schützt. Die `404`-Prüfung
bei deaktiviertem Flag wird immer **vor** der Authentifizierungsprüfung ausgeführt, sodass eine Installation mit
deaktiviertem `RADAR_ENABLED` Byte für Byte identisch bleibt (keine Authentifizierungsaufforderung, nur um festzustellen,
dass die Oberfläche nicht existiert); sobald das Flag aktiviert ist, erhält eine nicht authentifizierte Anfrage `401`,
bevor irgendein Datenbank-Lese- oder -Schreibvorgang stattfindet. `GET /api/radar/settings` gibt unabhängig vom
Authentifizierungsstatus niemals den unverschlüsselten Unterstützerschlüssel zurück — nur die maskierte Form und einen
booleschen Wert `hasSupporterKey`.

---

## Supporter-Angebote

Angebote verwenden ihr eigenes signiertes Artefakt, `GET /v1/offers/latest`, und teilen sich niemals den Katalog- oder Empfehlungs-Cache. Der Server-Endpunkt erfordert einen gültigen aktiven Supporter-Bearer-Key; es gibt keinen Community-Fallback. `syncRadarOffers()` wird daher noch vor dem Netzwerkzugriff beendet, wenn das Feature-Flag deaktiviert ist, der Betreiber nicht zugestimmt hat oder kein Supporter-Key konfiguriert ist.

Nach einem erfolgreichen GET überprüft der Client die Ed25519-Signatur über die exakten Antwortbytes, validiert `RadarOffersFeedSchema`, verlangt, dass sowohl der signierte Body als auch der Header `x-omniroute-feed-tier` den Wert `live` enthalten, erzwingt eine strikt neuere gepunktete Version und ersetzt erst dann atomar `radar_offers_cache` (Migration `144_radar_offers_cache.sql`). Es gilt dieselbe Obergrenze von 10 MB für Header plus Stream wie bei den anderen Feeds. Bei Signatur-, Schema-, Tier-, Replay-, Größen-, HTTP- und Netzwerkfehlern bleibt der zuletzt verifizierte Cache stets erhalten.

Das geschlossene Angebotsformat unterstützt drei vergleichbare Vorteilssarten: Prozentsatz in Basispunkten, Guthaben in kleinsten Währungseinheiten oder Testzeiträume in Tagen. Ein Partnerangebot muss eine öffentliche Vergleichsbasis derselben Art enthalten, und sein Vorteil muss strikt größer sein; offizielle Angebote haben keine Partner-Vergleichsbasis. URLs müssen HTTPS verwenden und dürfen keine Zugangsdaten enthalten. `getRadarOffers()` validiert die zwischengespeicherte Nutzlast bei jedem lokalen Lesezugriff vorsichtshalber erneut und filtert abgelaufene Einträge heraus; `/dashboard/radar/offers` filtert vor dem Rendern nochmals nach Ablaufdatum, verwendet portugiesischen Text, sofern verfügbar, mit englischem Fallback und kennzeichnet Partnerangebote ausdrücklich.

Der Browser ruft nur lokale Routen auf: Er liest den maskierten Einstellungs-Snapshot, fordert über `POST /api/radar/offers/sync` eine serverseitige Aktualisierung an und liest anschließend `GET /api/radar/offers`. Ohne Key zeigt er die vorhandenen Mitwirkenden-/Support-Links an, anstatt eine Feed-Anfrage zu versuchen. Externe Angebotslinks werden mit `noopener noreferrer` in einem neuen Tab geöffnet. In diesem Release wird kein MCP-Tool `radar_offers` bereitgestellt.

---

## Radar Intel, Supporter-Badge und CLI

Intel ist ein signiertes Artefakt unter `GET /v1/intel/latest`. Das geschlossene `RadarIntelFeedSchema` akzeptiert ausschließlich Radar-eigene ELO-Ranglisten, die der private Kurator aus bestätigten Vergleichen ableitet, sowie sachliche Alters-/Anzahldifferenzen des Katalogs, die aus signierten Katalog-Snapshots abgeleitet werden. Die Methodik ist auf eine Anfangswertung von 1000 und K=32 festgelegt. Eine leere Rangliste ist gültig, wenn kein Vergleich bestätigt wurde; der Client erzeugt niemals selbst eine.

`syncRadarIntel()` wendet dieselben Regeln wie für Angebote an: serverseitige Bearer-Authentifizierung, ein Timeout von 30 Sekunden, eine gestreamte Obergrenze von 10 MiB, Ed25519-Verifizierung der exakten Bytes, strikte Schemavalidierung, die Anforderung `live` für Body und Header, eine Versionsuntergrenze sowie die Beibehaltung des letzten gültigen Caches. Nachdem ein verifizierter Live-Snapshot gespeichert wurde, leitet der Client `radar:<sha256(supporter key)>` ab, speichert nur diese nicht umkehrbare Identität und erzeugt das dedizierte Erkennungsereignis `radar_supporter`. Das Badge `radar-supporter` ist idempotent und vergibt null XP; es aktualisiert niemals Bestenlisten und verwendet `token_share` nicht erneut. `/dashboard/radar/intel` rendert das Badge ausschließlich anhand verifizierter lokaler Cache-Metadaten.

Die CLI stellt `omniroute radar status` und `omniroute radar sync` bereit. Beide kommunizieren ausschließlich mit der lokalen OmniRoute-API. `status` führt ein schreibgeschütztes `GET /api/radar/status` aus; `sync` sendet einmalig `POST /api/radar/sync-all` und gibt für jeden Feed ein Ergebnis aus. Keiner der beiden Befehle liest, akzeptiert oder gibt den Supporter-Key aus, und keiner kontaktiert den Radar-Dienst direkt.

---

## Empfehlungslinks (kostenlose Guthaben)

Empfehlungslinks werden über einen **eigenständigen, stets aktuellen** Feed bereitgestellt —
`GET /v1/referrals/latest` — getrennt vom Katalog-Feed. Dies ist beabsichtigt: Der
Katalog-Feed im Community-Tarif ist eine Momentaufnahme, die bis zu 30 Tage alt sein kann,
sodass ein daraus extrahierter Empfehlungslink der tatsächlichen Linkliste des Servers
früher um denselben Zeitraum hinterherhinkte (eine neu hinzugefügte Empfehlung erreichte
kostenlose/Community-Benutzer bis zu einem Monat lang nicht). Der Empfehlungs-Feed beseitigt
diese Verzögerung, indem er in einem eigenen, deutlich kürzeren Intervall synchronisiert wird.

```ts
// Antwortkörper von GET /v1/referrals/latest (Ed25519-signiert, derselbe fest
// hinterlegte Schlüssel wie beim Katalog-Feed):
{
  feed: "omniroute-radar-referrals",
  schemaVersion: 1,
  generatedAt: string,           // ISO — deterministisch: max(updatedAt) über alle
                                  // Empfehlungslinks, sodass zwei identische Anfragen exakt
                                  // dieselben signierten Bytes/dieselbe Signatur erzeugen
  referrals: {
    fixed: RadarReferral[],      // in JEDEM Tarif vorhanden, einschließlich ohne Authentifizierung/Community
    campaigns: RadarReferral[],  // nur bei einem gültigen aktiven (Supporter-)Bearer-
                                  // Schlüssel befüllt; Anfragen ohne Authentifizierung/mit abgelaufenem Schlüssel erhalten []
  },
}
// RadarReferral = { provider, url, kind: "fixo" | "campanha", validUntil,
//                    requiredAction, isDefault }
```

Anders als der Katalog-Feed enthält dieser Körper überhaupt kein `tier`-Feld — der Server
entscheidet pro Anfrage anhand des `Authorization`-Schlüssels, was einbezogen wird, sodass
der Antwort-Header `x-omniroute-feed-tier` die EINZIGE Quelle für den bereitgestellten Tarif
ist (`referralsSync.ts::syncRadarReferrals`); ein fehlender/nicht erkannter Header führt zur
Herabstufung auf `"community"`, der Annahme mit den geringsten Berechtigungen.
`RadarReferralsFeedSchema` (`src/lib/radar/referralsFeedSchema.ts`) validiert den gesamten
Körper und verwendet dabei dasselbe aus `feedSchema.ts` exportierte
`RadarReferralSchema` pro Empfehlung, sodass beide Feeds einzelne Empfehlungen identisch
validieren. Jede `RadarReferral.url` muss `https://` verwenden — eine `http://`-URL
schlägt bei der Schemavalidierung fehl.

Das ALTE, in den Katalog eingebettete Feld `referrals` in `RadarFeedSchema`
(`feedSchema.ts`) bleibt zur Abwärtskompatibilität mit bereits zwischengespeicherten
Katalog-Feeds erhalten, aber `getRadarReferrals()` liest es nicht mehr — siehe
[Accessor](#accessor) unten.

### Synchronisierung

`syncRadarReferrals()` (`src/lib/radar/referralsSync.ts`) ist das EINZIGE Modul, das
für Empfehlungen auf das Netzwerk zugreift, und bildet den Vertrag von `syncRadar()`
exakt nach: Flag deaktiviert → `disabled`; Opt-in false → `opt_out`; lädt
`${RADAR_FEED_URL}/v1/referrals/latest` herunter (dieselben
`RADAR_FEED_URL`-/`RADAR_FEED_PUBKEY`-Fork-Überschreibungen wie beim Katalog), verifiziert
die Ed25519-Signatur über die exakten Antwort-Bytes (`verifyFeedBytes`), validiert gegen
`RadarReferralsFeedSchema` und speichert in der Tabelle `radar_referrals_cache`
(Migration `142_radar_referrals_cache.sql`) zwischen — einer vom
`radar_feed_cache` des Katalogs vollständig getrennten Tabelle. Eine Obergrenze von 10 MB
für die Antwort und eine Untergrenze für `generatedAt` weisen einen eingehenden Feed ab,
der älter als der zwischengespeicherte ist, und schützen so vor der erneuten Wiedergabe
eines älteren signierten Artefakts. Ein identischer Zeitstempel wird akzeptiert: Der Server
weist den Community- und Live-Empfehlungsvarianten absichtlich denselben deterministischen
`generatedAt`-Wert zu, sodass sich die signierte Nutzlast und der bereitgestellte Tarif
nach einer Änderung des Supporter-Schlüssels ändern können, ohne dass sich die zugrunde
liegende Linkmenge ändert. Löst niemals eine Ausnahme aus — gibt stets ein Statusobjekt
zurück; Fehler enthalten in `reason` niemals einen Stacktrace.

Zwei Auslöser halten den Empfehlungs-Cache aktuell, beide unabhängig vom eigenen
24-Stunden-Intervall des Katalogs:

- **Synchronisierung beim Lesen** — `GET /api/radar/referrals` selbst ruft
  `syncRadarReferrals()` direkt auf, wenn der Cache fehlt oder älter als
  `REFERRALS_STALE_MS` ist (1 Stunde, `shouldSyncReferralsOnRead()`), bevor die Antwort
  bereitgestellt wird. Dadurch sind feste Links bereits beim unmittelbar nächsten Laden
  des Dashboards „stets aktuell“, ohne auf einen Hintergrund-Timer warten zu müssen.
- **Seitliche Scheduler-Synchronisierung** — `radarSchedulerTick()` (`scheduler.ts`)
  prüft die Veraltung der Empfehlungen unabhängig im selben stündlichen Takt, der für
  den Katalog verwendet wird, und ruft bei Fälligkeit `syncRadarReferrals()` auf. Dies
  geschieht unabhängig davon, ob der Katalog in diesem Takt selbst fällig war, und
  beeinflusst niemals die Form von `RadarTickResult` (nur ein Best-Effort-Nebeneffekt,
  der bei einem Fehler unterdrückt wird).

### Zugriffsfunktion

`src/lib/radar/index.ts` exportiert zwei schreibgeschützte Zugriffsfunktionen, die beide
niemals eine Ausnahme auslösen (derselbe defensive Vertrag wie bei `getRadarCatalog()` —
deaktiviertes Flag, kein Cache oder eine beschädigte zwischengespeicherte Nutzlast führen
jeweils zur leeren Form statt zu einem Fehler):

- `getRadarReferrals()` → `{ fixed: RadarReferral[], campaigns: RadarReferral[] }`,
  liest aus `radar_referrals_cache` (über `getRadarReferralsCache()`) und validiert
  durch `RadarReferralsFeedSchema` — **nicht** den Katalog-Cache.
- `getDefaultReferralFor(provider)` → die `fixed`-Empfehlung mit `isDefault: true` für
  diesen Anbieter oder `null`. Berücksichtigt ausschließlich `fixed` — eine Kampagne
  wird niemals als „Standardlink“ eines Anbieters verwendet.

Die eigentliche Regel dafür, „welche Empfehlung für einen Anbieter die Standardeinstellung
ist“, befindet sich in `findDefaultReferral()` (`src/lib/radar/referrals.ts`), einer
kleinen reinen Funktion **ohne DB-Import** — sie kann sicher in eine `"use client"`-
Komponente importiert werden. `getRadarReferrals`/`getDefaultReferralFor` (in `index.ts`)
binden `@/lib/db/radar` ein und bleiben daher ausschließlich serverseitig; das
Anbieter-Dashboard importiert `referrals.ts` direkt statt `index.ts` (siehe unten), um
zu vermeiden, dass `better-sqlite3` in das Browser-Bundle aufgenommen wird.

### `GET /api/radar/referrals`

Folgt exakt derselben Prüfungsreihenfolge wie jede andere Radar-Route: `RADAR_ENABLED` aus →
`404` (wird zuerst geprüft, byte-identisches Verhalten); nicht authentifiziert → `401`; andernfalls
wird bei veralteten Daten ein Sync-on-Read ausgelöst (siehe oben), anschließend folgt `200` mit
`{ fixed, campaigns, tier }` — `tier` stammt direkt aus dem (möglicherweise gerade aktualisierten)
Cache-Datensatz und dient ausschließlich zur Information (steuert den nachfolgend beschriebenen dezenten Upsell-Text der UI). Der
Feed-Server wird niemals direkt als Proxy angesprochen — der Quellcode der Route selbst enthält keinen `fetch(`-Aufruf;
Netzwerkzugriffe erfolgen ausschließlich innerhalb von `syncRadarReferrals()`, nach demselben
Prinzip des ausschließlichen Zugriffs auf den lokalen Cache wie bei `/api/radar/catalog`.

### Dashboard-UI — Tab „Kostenlose Credits“ unter `/dashboard/radar`

Verwendet die bestehende Radar-Seite (`src/app/(dashboard)/dashboard/radar/page.tsx`) als
zweiten Tab, anstatt eine neue Route einzuführen — dadurch bleibt die Routing-/i18n-Oberfläche für eine Funktion kleiner, die lediglich eine
Variation der Daten darstellt, welche die Seite bereits abruft. Nach dem Opt-in bietet die Tab-Leiste
**Katalog** (bestehende Tabelle) und **Kostenlose Credits**:

- Feste Links werden nach Anbieter gruppiert; jeder zeigt `requiredAction` (sofern vorhanden)
  sowie eine Schaltfläche mit `target="_blank" rel="noopener noreferrer"` zur Empfehlungs-URL.
- Kampagnen zeigen dieselben Informationen und zusätzlich `validUntil`, sofern vorhanden.
- Wenn `campaigns` leer ist **und** die ausgelieferte Stufe `community` lautet, zeigt die UI einen
  kurzen Upsell-Hinweis („zeitlich begrenzte Kampagnen sind ein Extra für Unterstützer“) — dieser
  blendet die Liste der festen Links **niemals** aus und schränkt sie auch nicht ein; sie bleibt für jede Stufe vollständig verfügbar. Der
  Upsell ist lediglich ein dezenter Hinweis und niemals eine Sperre.

### Empfehlungslink beim Anbieternamen (Anbieter-Dashboard)

`ProviderPageHeader` (`src/app/(dashboard)/dashboard/providers/[id]/components/`)
verlinkte den Anbieternamen bereits auf `providerInfo.website`, sofern vorhanden, wobei es
bereits einen Präzedenzfall für einen monetarisierten Link gibt: den Hinweis zum Partnerlink von Kimi (Moonshot AI)
(i18n-Schlüssel `providers.kimiPartnerLinkNote`). D28 verwendet exakt dasselbe dezente Hinweismuster
für standardmäßige Radar-Empfehlungslinks, anstatt einen neuen Schlüssel einzuführen.

Lose Kopplung als bewusstes Designprinzip:

- `resolveProviderHeaderLink()` (`src/app/(dashboard)/dashboard/providers/providerPageUtils.ts`)
  ist eine **reine** Funktion — `(staticWebsite, referralUrl) => { website, isReferralLink }`
  — ohne Abhängigkeit von `@/lib/radar` oder `@/lib/db/*`. `providerPageUtils.ts` bleibt als
  Ganzes frei von diesen Imports (sichergestellt durch
  `tests/unit/provider-header-referral-link.test.ts`).
- `ProviderDetailPageClient.tsx` (eine `"use client"`-Komponente) ist die einzige Stelle, die
  Radar-Daten abrufen darf — über `fetch("/api/radar/referrals")`, nach demselben Muster mit lokaler Route,
  das auch die Radar-Dashboard-Seite selbst verwendet — und ermittelt die standardmäßige Empfehlung
  clientseitig mit `findDefaultReferral()` aus der DB-unabhängigen Datei `src/lib/radar/referrals.ts`.
- Wenn `RADAR_ENABLED` deaktiviert ist, liefert der Abruf einen 404-Fehler, `referralUrl` bleibt `null` und
  `resolveProviderHeaderLink()` gibt die statische Katalog-`website` unverändert zurück — die
  Anbieterseite ist byte-identisch mit dem Zustand vor Einführung dieser Funktion. Dasselbe gilt, wenn
  noch kein Cache vorhanden ist oder für den jeweiligen Anbieter keine standardmäßige Empfehlung existiert.
- Wenn eine standardmäßige Empfehlung greift, erhält `ProviderPageHeader` den Wert `isReferralLink`
  und zeigt denselben dezenten Hinweis/Tooltip wie beim Kimi-Partnerlink an (unter Wiederverwendung des
  Schlüssels `providers.kimiPartnerLinkNote`) — niemals eine neue, separate visuelle Darstellung.

---

## So hosten Sie einen Feed selbst

Ein Fork oder Selbsthoster, der die vollständige Kontrolle über den Katalog haben möchte, kann einen eigenen Feed-Dienst betreiben, ohne den Client-Code zu ändern:

1. Stellen Sie einen Endpunkt `GET /v1/catalog/latest` bereit, der einen JSON-Body zurückgibt, der `RadarFeedSchema` (`src/lib/radar/feedSchema.ts`) erfüllt — auf oberster Ebene `feed:
"omniroute-radar"`, `schemaVersion: 2`, `version`, `tier`, `providers`, `models`,
   `quirks` und `totals`. Berücksichtigen Sie `x-omniroute-radar-schema: 2`; ein übergangskompatibler Server sollte Anfragen ohne diesen Header standardmäßig mit einem separat signierten v1-Artefakt beantworten.
2. Signieren Sie die exakten Antwortbytes mit einem Ed25519-Schlüsselpaar und geben Sie die Base64-Signatur im Antwort-Header `x-omniroute-feed-signature` zurück.
3. Setzen Sie `RADAR_FEED_URL` auf die neue Basis-URL und `RADAR_FEED_PUBKEY` auf den zugehörigen öffentlichen Schlüssel (Base64-DER-SPKI oder PEM) — siehe die
   [Referenz der Umgebungsvariablen](../reference/ENVIRONMENT.md#27-radar-feed-self-hosting).
4. Aktivieren Sie `RADAR_ENABLED` und stimmen Sie über `POST /api/radar/settings` zu
   (`{ optIn: true }`).

Es sind keine weiteren Codeänderungen erforderlich — `verifyFeedBytes()` übernimmt die Überschreibung automatisch (`getFeedPublicKeys()` in `src/lib/radar/pinnedKeys.ts`), und Versionsvergleich, Schemavalidierung sowie die Zusammenführungsregeln werden auf einen selbst gehosteten Feed identisch angewendet.

Empfehlungslinks (siehe [Empfehlungslinks (kostenlose Guthaben)](#referral-links-free-credits)
oben) sind ein separates, optionales Artefakt: Ein Fork, der nur `/v1/catalog/latest` bereitstellt, funktioniert weiterhin vollständig — `syncRadarReferrals()` wechselt bei einem `404` von `/v1/referrals/latest` auf `{ status: "error" }`, und der Cache bleibt einfach leer, sodass `GET /api/radar/referrals` weiterhin `{ fixed: [], campaigns: [], tier: null }` zurückgibt, anstatt den Rest der Seite fehlschlagen zu lassen. Um zusätzlich Empfehlungslinks anzubieten, stellen Sie `GET /v1/referrals/latest` so bereit, dass es `RadarReferralsFeedSchema` (`src/lib/radar/referralsFeedSchema.ts`) erfüllt, und signieren Sie es mit demselben Ed25519-Schlüsselpaar wie den Katalog-Feed.

Supporter-Angebote sind ein weiteres optionales Artefakt. Um sie bereitzustellen, implementieren Sie `GET /v1/offers/latest` mit dem geschlossenen `RadarOffersFeedSchema` (`src/lib/radar/offersFeedSchema.ts`), verlangen Sie eine aktive Berechtigung, geben Sie `x-omniroute-feed-tier: live` zurück und signieren Sie die exakten Bytes mit demselben Schlüssel. Bei einem Fork, der diesen Endpunkt weglässt, bleibt das Verhalten von Katalog und Empfehlungen unverändert; die Aktualisierung der Angebote schlägt ohne destruktive Auswirkungen fehl, und der zuletzt verifizierte lokale Angebots-Cache bleibt verfügbar.

Intel ist auf dieselbe Weise optional. Ein Selbsthoster kann `GET /v1/intel/latest` mithilfe von `RadarIntelFeedSchema` (`src/lib/radar/intelFeedSchema.ts`) bereitstellen, eine aktive Berechtigung verlangen, `x-omniroute-feed-tier: live` zurückgeben und die exakten Bytes mit dem gemeinsamen Ed25519-Schlüssel signieren. Wird der Endpunkt weggelassen, bleiben Katalog, Empfehlungen und Angebote unverändert; die Intel-Aktualisierung bewahrt den letzten verifizierten lokalen Snapshot auf.

---

## Zugehörige Dokumentation

- [`docs/security/ERROR_SANITIZATION.md`](../security/ERROR_SANITIZATION.md) — das von den Routen unter `/api/radar/*` verwendete Muster für Fehlerantworten.
- [`docs/reference/ENVIRONMENT.md`](../reference/ENVIRONMENT.md#27-radar-feed-self-hosting)
  — Referenz für `RADAR_FEED_URL` / `RADAR_FEED_PUBKEY`.
