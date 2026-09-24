# ADR: Pluggable persistence boundary (Deutsch)

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/persistence-backend-boundary.md) · 🇪🇹 [am](../../../am/docs/architecture/persistence-backend-boundary.md) · 🇸🇦 [ar](../../../ar/docs/architecture/persistence-backend-boundary.md) · 🇦🇿 [az](../../../az/docs/architecture/persistence-backend-boundary.md) · 🇧🇬 [bg](../../../bg/docs/architecture/persistence-backend-boundary.md) · 🇧🇩 [bn](../../../bn/docs/architecture/persistence-backend-boundary.md) · 🇧🇦 [bs](../../../bs/docs/architecture/persistence-backend-boundary.md) · 🇨🇿 [cs](../../../cs/docs/architecture/persistence-backend-boundary.md) · 🇩🇰 [da](../../../da/docs/architecture/persistence-backend-boundary.md) · 🇬🇷 [el](../../../el/docs/architecture/persistence-backend-boundary.md) · 🇪🇸 [es](../../../es/docs/architecture/persistence-backend-boundary.md) · 🇪🇪 [et](../../../et/docs/architecture/persistence-backend-boundary.md) · 🇮🇷 [fa](../../../fa/docs/architecture/persistence-backend-boundary.md) · 🇫🇮 [fi](../../../fi/docs/architecture/persistence-backend-boundary.md) · 🇫🇷 [fr](../../../fr/docs/architecture/persistence-backend-boundary.md) · 🇮🇪 [ga](../../../ga/docs/architecture/persistence-backend-boundary.md) · 🇮🇳 [gu](../../../gu/docs/architecture/persistence-backend-boundary.md) · 🇳🇬 [ha](../../../ha/docs/architecture/persistence-backend-boundary.md) · 🇮🇱 [he](../../../he/docs/architecture/persistence-backend-boundary.md) · 🇮🇳 [hi](../../../hi/docs/architecture/persistence-backend-boundary.md) · 🇭🇷 [hr](../../../hr/docs/architecture/persistence-backend-boundary.md) · 🇭🇺 [hu](../../../hu/docs/architecture/persistence-backend-boundary.md) · 🇦🇲 [hy](../../../hy/docs/architecture/persistence-backend-boundary.md) · 🇮🇩 [id](../../../id/docs/architecture/persistence-backend-boundary.md) · 🇳🇬 [ig](../../../ig/docs/architecture/persistence-backend-boundary.md) · 🇮🇹 [it](../../../it/docs/architecture/persistence-backend-boundary.md) · 🇯🇵 [ja](../../../ja/docs/architecture/persistence-backend-boundary.md) · 🇬🇪 [ka](../../../ka/docs/architecture/persistence-backend-boundary.md) · 🇰🇭 [km](../../../km/docs/architecture/persistence-backend-boundary.md) · 🇮🇳 [kn](../../../kn/docs/architecture/persistence-backend-boundary.md) · 🇰🇷 [ko](../../../ko/docs/architecture/persistence-backend-boundary.md) · 🇱🇹 [lt](../../../lt/docs/architecture/persistence-backend-boundary.md) · 🇱🇻 [lv](../../../lv/docs/architecture/persistence-backend-boundary.md) · 🇮🇳 [ml](../../../ml/docs/architecture/persistence-backend-boundary.md) · 🇮🇳 [mr](../../../mr/docs/architecture/persistence-backend-boundary.md) · 🇲🇾 [ms](../../../ms/docs/architecture/persistence-backend-boundary.md) · 🇲🇹 [mt](../../../mt/docs/architecture/persistence-backend-boundary.md) · 🇲🇲 [my](../../../my/docs/architecture/persistence-backend-boundary.md) · 🇳🇵 [ne](../../../ne/docs/architecture/persistence-backend-boundary.md) · 🇳🇱 [nl](../../../nl/docs/architecture/persistence-backend-boundary.md) · 🇳🇴 [no](../../../no/docs/architecture/persistence-backend-boundary.md) · 🇮🇳 [or](../../../or/docs/architecture/persistence-backend-boundary.md) · 🇮🇳 [pa](../../../pa/docs/architecture/persistence-backend-boundary.md) · 🇵🇭 [phi](../../../phi/docs/architecture/persistence-backend-boundary.md) · 🇵🇱 [pl](../../../pl/docs/architecture/persistence-backend-boundary.md) · 🇵🇹 [pt](../../../pt/docs/architecture/persistence-backend-boundary.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/persistence-backend-boundary.md) · 🇷🇴 [ro](../../../ro/docs/architecture/persistence-backend-boundary.md) · 🇷🇺 [ru](../../../ru/docs/architecture/persistence-backend-boundary.md) · 🇱🇰 [si](../../../si/docs/architecture/persistence-backend-boundary.md) · 🇸🇰 [sk](../../../sk/docs/architecture/persistence-backend-boundary.md) · 🇸🇮 [sl](../../../sl/docs/architecture/persistence-backend-boundary.md) · 🇷🇸 [sr](../../../sr/docs/architecture/persistence-backend-boundary.md) · 🇸🇪 [sv](../../../sv/docs/architecture/persistence-backend-boundary.md) · 🇰🇪 [sw](../../../sw/docs/architecture/persistence-backend-boundary.md) · 🇮🇳 [ta](../../../ta/docs/architecture/persistence-backend-boundary.md) · 🇮🇳 [te](../../../te/docs/architecture/persistence-backend-boundary.md) · 🇹🇭 [th](../../../th/docs/architecture/persistence-backend-boundary.md) · 🇹🇷 [tr](../../../tr/docs/architecture/persistence-backend-boundary.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/persistence-backend-boundary.md) · 🇵🇰 [ur](../../../ur/docs/architecture/persistence-backend-boundary.md) · 🇺🇿 [uz](../../../uz/docs/architecture/persistence-backend-boundary.md) · 🇻🇳 [vi](../../../vi/docs/architecture/persistence-backend-boundary.md) · 🇳🇬 [yo](../../../yo/docs/architecture/persistence-backend-boundary.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/persistence-backend-boundary.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/persistence-backend-boundary.md)

---

- **Status:** Vorgeschlagen — erfordert die Genehmigung eines Maintainers, bevor mit der Laufzeitimplementierung begonnen wird
- **Tracking-Issue:** [#8075](https://github.com/diegosouzapw/OmniRoute/issues/8075)
- **Geltungsbereich:** Ausschließlich Persistenzarchitektur; diese Entscheidung fügt keine externe Datenbank hinzu und wählt auch keine aus

## Kontext

OmniRoute stellt derzeit domänenorientierte Persistenzfunktionen aus `src/lib/db/` bereit, während die
von `src/lib/db/core.ts` zurückgegebene gemeinsame Verbindung den synchronen `SqliteAdapter`-Vertrag
in `src/lib/db/adapters/types.ts` implementiert. Dieser Adapter unterstützt mehrere SQLite-Laufzeitumgebungen,
seine Schnittstelle bleibt jedoch SQLite-spezifisch: synchrone vorbereitete Anweisungen, `pragma`,
verzögerte und sofortige Transaktionen, native Backups bzw. Backups durch Dateikopien, Checkpoints
und ein lokales Datenbank-Handle.

Der aktuelle Start- und Wiederherstellungspfad verwaltet außerdem den Lebenszyklus der SQLite-Datei.
`src/lib/db/core.ts` ermittelt `storage.sqlite`, verwaltet einen prozessweit globalen Adapter, führt
WAL-Checkpoints durch, erhält bei der Wiederherstellung ausgewählte Tabellen und entfernt beim
Neuaufbau einer Datenbank SQLite-Begleitdateien. Die Treiberauswahl in
`src/lib/db/adapters/driverFactory.ts` wählt aus den unterstützten SQLite-Laufzeitumgebungen aus; sie
ist keine Abstraktion für externe Backends.

Die Schemaentwicklung ist ähnlich eng gekoppelt. `src/lib/db/migrationRunner.ts` wendet nummerierte
SQL-Dateien an, untersucht `sqlite_master` und `PRAGMA table_info`, erkennt optionale
FTS5-Unterstützung und führt Migrationsarbeiten in SQLite-Transaktionen aus. Betriebliche Module wie
`src/lib/db/backup.ts` und `src/lib/db/optimizationSettings.ts` verwenden direkt die Semantik von
Backups, `PRAGMA`, WAL, Seitengröße, automatischem Vacuum und `VACUUM`.

Dies sind gültige Eigenschaften der eingebetteten SQLite-Bereitstellung. Sie sollen weiterhin
verfügbar bleiben, ohne PostgreSQL oder MySQL zur Nachbildung einer SQLite-API zu zwingen.

## Entscheidung

Für portierbaren, dauerhaften Zustand wird eine zweistufige Persistenzgrenze eingeführt:

1. **Verträge für Domänen-Repositories** definieren die Persistenzoperationen, die von Geschäfts- und
   Routing-Code benötigt werden. Aufrufer sind von Domänenverhalten und Domänendaten abhängig, nicht
   von SQL-Text, vorbereiteten Anweisungen, Datenbankdateien oder Dialektobjekten.
2. **Ein interner asynchroner Backend-Vertrag** unterstützt Repository-Implementierungen mit
   Transaktionskontexten, Zustands- und Bereitschaftsprüfungen, Migrationskoordination,
   Backend-Fähigkeiten und klassifizierten Fehlern. Die genaue TypeScript-Schnittstelle wird mit dem
   ersten Implementierungs-PR vorgeschlagen und durch Konformitätstests bestätigt; dieser ADR legt
   bewusst keine spekulative API fest.

SQLite bleibt die Standardimplementierung. Die bestehende SQLite-Treiberkaskade und der synchrone
`SqliteAdapter` verbleiben hinter der SQLite-Repository-Implementierung, während Domänen in kleinen
vertikalen Abschnitten migriert werden. Kein Benutzer muss einen externen Dienst konfigurieren.

PostgreSQL ist die erste vorgeschlagene externe Implementierung, nachdem die Repository-Grenze
anhand von SQLite bestätigt wurde. MySQL folgt als gleichrangige Implementierung auf Basis derselben
Konformitätstests, anstatt einen zweiten Fork der Geschäftslogik zu bilden.

## Regeln für die Abgrenzung

### Portierbare Repository-Schnittstelle

Ein portierbares Repository darf Folgendes bereitstellen:

- domänenspezifische Lese- und Schreibvorgänge;
- explizite atomare Operationen und transaktionsgebundenen Repository-Zugriff;
- Vergleichs-/Aktualisierungs- oder Lease-Operationen, sofern Nebenläufigkeitssemantik Teil der Domäne ist;
- Backend-neutrale Paginierung, Sortierung und Constraint-Fehler.

Zustands- und Bereitschaftsprüfungen des Backends sowie die Migrationskoordination gehören zum
internen Backend-/Betriebsvertrag und nicht zu einzelnen Domänen-Repositories.

Ein portierbares Repository darf Folgendes nicht bereitstellen:

- `prepare`, `get`, `all`, `run` oder rohe Treiber-Handles;
- `PRAGMA`, WAL-Checkpoint-Modi, `VACUUM` oder Seiten-/Cache-Optimierung;
- SQLite-Dateipfade, Begleitdateien oder Backups durch Dateikopien;
- `lastInsertRowid` als Backend-übergreifenden Domänenvertrag;
- FTS5- oder `sqlite-vec`-Syntax;
- einen generischen Dialekt-Ausweg, der von regulärem Geschäftscode verwendet wird.

### Schnittstelle für Backend-Fähigkeiten

Backend-spezifisches Verhalten bleibt explizit und auffindbar. Ausschließlich für SQLite vorgesehene
Wartungsfunktionen verbleiben hinter ihrer eigenen Implementierung und Betriebsschnittstelle,
darunter:

- Auswahl des Laufzeittreibers;
- WAL-Checkpoints und SQLite-Verhalten beim Herunterfahren;
- Einstellungen für Seitengröße, Cache-Größe und automatisches Vacuum;
- Sicherung, Wiederherstellung und Reparatur von Datenbankdateien;
- SQLite-Schemaintrospektion;
- Integration von FTS5 und `sqlite-vec`.

Ein externes Backend muss diese Funktionen nicht nachbilden. Repositories müssen entweder eine
portierbare Fähigkeit verwenden, eine Backend-spezifische Implementierung mit dokumentiertem
Verhalten bereitstellen oder melden, dass eine Fähigkeit nicht verfügbar ist.

## Transaktions- und Migrationsmodell

Repository-APIs definieren die atomare Geschäftsoperation; Aufrufer wählen keinen SQL-Transaktionsmodus aus.
Jede Operation muss ihre beobachtbaren Nebenläufigkeitsgarantien definieren: geschützte Invarianten, Konflikterkennung, Wiederholungsversuchsklassifizierung, Idempotenzanforderungen und Weitergabe des Transaktionskontexts.
Implementierungen dürfen unterschiedliche Transaktions- und Isolationsmechanismen nur verwenden, wenn diese beobachtbaren Garantien gleichwertig bleiben. SQLite kann intern weiterhin sein aktuelles verzögertes oder unmittelbares Transaktionsverhalten verwenden, sofern es den Vertrag der Operation erfüllt.

Externe Backends erfordern eine explizite Zuständigkeit für Migrationen, damit mehrere Anwendungsreplikate nicht gleichzeitig dieselbe Schemaänderung ausführen.
Migrationshistorien verschiedener Backends können dieselben logischen Meilensteine abbilden, es wird jedoch nicht davon ausgegangen, dass SQLite-SQL-Dateien auf andere Dialekte portierbar oder dort wiederverwendbar sind.

## Backend-übergreifende Konformitätssemantik

Konformitätstests müssen das Verhalten abdecken, nicht nur die Signaturen der Repository-Methoden. Jede migrierte Domäne muss Folgendes definieren und verifizieren:

- Zeitzone, Genauigkeit und Serialisierung von Zeitstempeln;
- Erwartungen an die Sortierung von `NULL`, die Kollation und die Groß-/Kleinschreibung;
- Darstellung und Vergleichsverhalten von JSON;
- Genauigkeit von Ganzzahlen, Dezimalzahlen und Geldbeträgen;
- stabile Sortierung und deterministische Kriterien zum Auflösen von Gleichständen bei der Paginierung;
- ID-Generierung ohne Abhängigkeit von SQLite-Zeilen-IDs;
- Klassifizierung von Verletzungen der Eindeutigkeits- und Fremdschlüsselregeln;
- Verhalten bezüglich der Anzahl betroffener Zeilen bei wirkungslosen Operationen sowie Vergleichs-/Aktualisierungs- und Löschoperationen;
- Ergebnisse gleichzeitiger Schreibvorgänge, wiederholbare Konflikte und idempotente Wiederholungsversuche.

Wenn für eine Domäne keine gleichwertige beobachtbare Semantik angegeben werden kann, ist sie noch nicht portierbar und muss Backend-spezifisch bleiben, bis dieser Vertrag entworfen wurde.

## Kompatibilitätsanforderungen

Jede Implementierung, die diesem ADR folgt, muss die folgenden Eigenschaften beibehalten:

- SQLite bleibt die konfigurationsfreie Standardeinstellung.
- Bestehende SQLite-Dateien und Migrationshistorien bleiben lesbar.
- SQLite-Fallbacks für npm, Electron, Docker und eingeschränkte Laufzeitumgebungen behalten ihren aktuellen Startpfad bei.
- Gespeicherte Anbieter-Zugangsdaten verwenden weiterhin das bestehende Verschlüsselungsverhalten der Anwendung.
- Eine Repository-Migration ändert nicht stillschweigend die Routing-, Kontingent-, API-Schlüssel- oder Audit-Semantik.
- Das Sicherungs- und Wiederherstellungsverhalten wird für jedes Backend separat dokumentiert und nicht als universell dargestellt.
- Eine reine, unveränderte SQLite-Installation lädt oder benötigt keinen externen Datenbanktreiber.

## Bereitstellungsreihenfolge

1. Eine reproduzierbare Bestandsaufnahme der SQLite-Kopplungen als separates Review-Artefakt veröffentlichen.
2. Die ersten Repository-Verträge und Konformitätstests für eine Domäne einführen.
3. Die bestehende SQLite-Implementierung hinter diese Verträge verschieben, ohne die Standardeinstellungen zu ändern.
4. Vorbehaltlich der Genehmigung durch die Maintainer PostgreSQL als erste externe Implementierung für einen
   klar abgegrenzten Teil der Steuerungsebene hinzufügen.
5. Den gemeinsam genutzten Zustand erst erweitern, nachdem Tests für gleichzeitige Schreibvorgänge und die Zuständigkeit für Migrationen vorhanden sind.
6. Einen offline ausführbaren, validierten Migrationspfad von SQLite zu einem externen Backend hinzufügen, bevor ein Datenbankwechsel beworben wird.
7. MySQL auf Grundlage der bewährten Repository- und Backend-Verträge hinzufügen.

Jeder Laufzeitschritt ist ein separater, überprüfbarer PR. Ein späterer Schritt darf nicht als Rechtfertigung dafür dienen, eine noch nicht nachgewiesene Abstraktion aus einem früheren Schritt zusammenzuführen.

## Erster Implementierungsabschnitt

Der erste Laufzeitabschnitt soll ausgewählt werden, nachdem die Kopplungsinventur geprüft wurde. Provider-Verbindungen, API-Schlüssel, Combos und die Routing-Konfiguration kommen infrage, da ihre Basistabellen in `src/lib/db/core.ts` sichtbar sind, aber dieser ADR genehmigt weder eine Tabellenliste noch einen Migrations-PR.
Der Abschnitt muss Folgendes umfassen:

- Tests zur Beibehaltung des SQLite-Verhaltens;
- Repository-Konformitätstests;
- explizite Transaktionsgrenzen;
- Überprüfung der Verschlüsselung und Schwärzung gespeicherter Zugangsdaten;
- keine Änderung an der standardmäßigen Startkonfiguration.

## Erwogene Alternativen

### PostgreSQL unterhalb von `SqliteAdapter` hinzufügen

Abgelehnt. `SqliteAdapter` ist eine Kompatibilitätsschicht für SQLite-Laufzeitumgebungen und stellt SQLite-spezifische Operationen bereit. Eine Emulation dieser Oberfläche würde synchrone und dialektspezifische Annahmen in ein neues Backend übertragen.

### Allen Domänen eine generische Abfrage-/Ausführungs-API bereitstellen

Als primäre Abgrenzung abgelehnt. Dadurch würde zwar die Verbindungsverwaltung zentralisiert, die Kopplung an SQL-Dialekt, Transaktionen und Tabellen bliebe jedoch in den Geschäftsmodulen bestehen. Ein Low-Level-Backend-Primitiv kann innerhalb von Repository-Implementierungen existieren, jedoch nicht als anwendungsseitige Persistenz-API.

### Die gesamte Persistenz neu schreiben, bevor ein einzelner Abschnitt validiert wurde

Abgelehnt. Die aktuelle Persistenzoberfläche ist umfangreich und umfasst den Dateilebenszyklus, Wiederherstellung, Suche und betriebliche Einstellungen. Vertikale Abschnitte ermöglichen überprüfbares Verhalten und klar abgegrenzte Rollbacks.

### SQLite als Standard ersetzen

Abgelehnt. Eingebettete und Desktop-Bereitstellungen sind vom aktuellen Startmodell ohne externe Dienste abhängig. Ein externes Backend ist optional.

### Redis als maßgebliche dauerhafte Datenquelle verwenden

Abgelehnt. Redis kann explizit kurzlebige Koordination, Caches oder Zähler unterstützen, ersetzt jedoch nicht den hier beschriebenen Vertrag für dauerhafte Repositories.

## Konsequenzen

### Vorteile

- Der Geschäftscode erhält eine stabile, vom Datenbankdialekt unabhängige Persistenzschnittstelle.
- Das SQLite-Verhalten wird getestet, bevor ein externes Backend die Abstraktion bestimmt.
- PostgreSQL und MySQL verwenden gemeinsame Verträge und Tests, anstatt Domänenlogik zu duplizieren.
- Ausschließlich in SQLite verfügbare Funktionen bleiben vollwertige Funktionen, anstatt zu undichten Kompatibilitäts-Shims zu werden.
- Das Verhalten von Migrationen und Transaktionen bei mehreren Replikaten wird zu einem expliziten Entwurfsaspekt.

### Kosten und Risiken

- Die Extraktion von Repositories erfordert eine schrittweise Migration der Aufrufstellen.
- Asynchrone Grenzen können sich auf derzeit synchronen Servicecode auswirken.
- Backendübergreifende Semantik erfordert Konformitätstests, die über die Kompatibilität der SQL-Syntax hinausgehen.
- Sicherung, Suche, Vektorspeicherung und Wartung bleiben funktionsspezifisch.
- Der Betrieb mehrerer Persistenzimplementierungen erhöht die Kosten für CI und betrieblichen Support.

## Nicht-Ziele

Dieser ADR:

- fügt weder eine Datenbankabhängigkeit, Umgebungsvariable, ein Schema noch eine Migration hinzu;
- ändert weder das aktive SQLite-Singleton noch die Treiberkaskade;
- verspricht keine Unterstützung für PostgreSQL oder MySQL in einer bestimmten Version;
- macht FTS5, `sqlite-vec`, Sicherungsdateien oder die SQLite-Wartung nicht portabel;
- definiert keine Aktiv-Aktiv-Bereitschaft, bevor Tests für gemeinsam genutzten Zustand und Koordination vorhanden sind;
- genehmigt keine einmalige Komplettüberarbeitung von `src/lib/db/`.

## Offene Fragen zur Genehmigung durch die Maintainer

1. Ist ein Repository mit interner asynchroner Backend-Grenze die bevorzugte Richtung, oder sollte
   die externe Persistenz hinter einem separaten Control-Plane-Dienst liegen?
2. Ist PostgreSQL als erste externe Implementierung nach der SQLite-Konformität akzeptabel?
3. Welche Domäne sollte der erste abgegrenzte Repository-Bereich sein?
4. Welcher Zustand muss für den ersten Meilenstein mit mehreren Replikaten gemeinsam genutzt werden, und welcher bleibt knotenlokal?
5. Welcher Kompatibilitätszeitraum ist für eine unterbrochene oder zurückgesetzte Repository-Migration erforderlich?

Bis diese Fragen geklärt sind, ist dieses Dokument als Vorschlag zu verstehen und impliziert kein Laufzeit-Refactoring.
