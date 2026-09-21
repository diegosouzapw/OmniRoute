# Plugin Marketplace (Deutsch)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/PLUGIN_MARKETPLACE.md) · 🇪🇹 [am](../../../am/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇦🇿 [az](../../../az/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇩🇰 [da](../../../da/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇬🇷 [el](../../../el/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇪🇸 [es](../../../es/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇪🇪 [et](../../../et/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇱 [he](../../../he/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇩 [id](../../../id/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇹 [it](../../../it/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇰🇭 [km](../../../km/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇲🇲 [my](../../../my/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇳🇴 [no](../../../no/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇳 [or](../../../or/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇱🇰 [si](../../../si/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇳 [te](../../../te/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇹🇭 [th](../../../th/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/PLUGIN_MARKETPLACE.md)

---

> **Verbindliche Quelle:** `src/lib/plugins/` (`marketplace.ts`, `manager.ts`, `manifest.ts`,
> `scanner.ts`, `loader.ts`), `src/app/api/plugins/` und
> `src/app/(dashboard)/dashboard/plugins/`
> **Zuletzt aktualisiert:** 2026-06-28 — v3.8.40

OmniRoute enthält ein Plugin-System nach dem Vorbild von WordPress. Plugins sind eigenständige
Verzeichnisse — jeweils mit einem `plugin.json`-Manifest und einer Einstiegsdatei —, die sich
in die Anfrage-Pipeline (`onRequest` / `onResponse` / `onError`) und in
Lebenszyklusereignisse (`onInstall` / `onActivate` / `onDeactivate` / `onUninstall`) einklinken.

Der **Plugin-Marktplatz** bildet die Erkennungsebene über diesem System. Er
stellt einen durchsuchbaren Katalog installierbarer Plugins bereit. Standardmäßig besteht der Katalog
aus einer kleinen integrierten Ausgangsregistrierung. Ein Betreiber kann stattdessen eine benutzerdefinierte Remote-
Registrierungs-URL angeben. In diesem Fall wird der Abruf durch einen DNS-auflösenden SSRF-Schutz
abgesichert (siehe [Sicherheit](#security)).

Jede Plugin-Route ist **nur über Loopback erreichbar** (Stufe 1 — `LOCAL_ONLY`): Plugins laden
Code und führen ihn in untergeordneten Prozessen aus. Daher sind die Routen unabhängig von der Authentifizierung
nicht von einem Nicht-Loopback-Ursprung aus erreichbar. Siehe
[`docs/security/ROUTE_GUARD_TIERS.md`](../security/ROUTE_GUARD_TIERS.md).

## Zusammenspiel der Komponenten

```
Dashboard (/dashboard/plugins)
  ├─ Registerkarte „Installiert“ → GET /api/plugins            (listPlugins)
  │                                POST /api/plugins/scan      (pluginManager.scan)
  │                                POST /api/plugins/{name}/activate|deactivate
  │                                DELETE /api/plugins/{name}   (deinstallieren)
  └─ Registerkarte „Marktplatz“  → GET /api/plugins/marketplace
                                     → listMarketplacePlugins()
                                       ├─ keine benutzerdefinierte URL → integrierte SEED_REGISTRY
                                       └─ benutzerdefinierte URL → isSafeMarketplaceUrl()-SSRF-Schutz
                                                                     → safeOutboundFetch(guard:"public-only")
```

- **Registrierungsebene** — `src/lib/plugins/marketplace.ts`: listet bzw. durchsucht den
  Katalog und greift bei jedem Fehler auf die Ausgangsregistrierung zurück.
- **Lebenszyklusebene** — `src/lib/plugins/manager.ts` (`pluginManager`-Singleton):
  Installation, Upgrade, Aktivierung, Deaktivierung, Deinstallation, Scan und Laden beim Start.
- **Manifestebene** — `src/lib/plugins/manifest.ts`: Zod-Schema und Standardwerte für
  `plugin.json`.
- **Scanner** — `src/lib/plugins/scanner.ts`: erkennt Plugins auf dem Datenträger im
  Plugin-Verzeichnis.
- **Loader** — `src/lib/plugins/loader.ts`: startet jedes Plugin in einem isolierten
  untergeordneten Prozess und vermittelt Hook-Aufrufe über IPC.

## Marktplatzkatalog

`listMarketplacePlugins()` (`src/lib/plugins/marketplace.ts`) gibt eine Liste von
`MarketplaceEntry`-Objekten zurück:

| Feld          | Typ      | Hinweise                                    |
| ------------- | -------- | ------------------------------------------- |
| `name`        | string   | Plugin-Name in kebab-case                   |
| `version`     | string   | semver                                      |
| `description` | string   | Kurze Zusammenfassung                       |
| `author`      | string   | Autor / Organisation                        |
| `license`     | string   | Lizenz-ID im SPDX-Stil                      |
| `downloadUrl` | string   | Quell-Download-URL (kann leer sein)         |
| `repository`  | string?  | Optionale Repository-URL                    |
| `tags`        | string[] | Tags zum Suchen/Filtern                     |
| `downloads`   | number   | Anzahl der Downloads                        |
| `rating`      | number   | 0–5                                         |
| `verified`    | boolean  | Ob der Eintrag als verifiziert markiert ist |
| `lastUpdated` | string   | ISO-ähnliche Datumszeichenfolge             |

Wenn keine benutzerdefinierte Registrierungs-URL konfiguriert ist, verwendet der Katalog die integrierte
`SEED_REGISTRY` (derzeit `request-logger`, `rate-limiter`, `cost-tracker` und
`theme-manager`). Die Ausgangsregistrierung ist immer verfügbar — wenn eine konfigurierte Remote-
Registrierung nicht erreichbar ist, einen anderen Status als `200` zurückgibt oder einen nicht erkannten
Inhalt liefert, protokolliert `listMarketplacePlugins()` eine Warnung und greift auf die Ausgangsliste zurück.

> Hinweis: Der **Katalog** des Marktplatzes (Durchsuchen/Suchen) ist durchgängig angebunden, aber
> die Ein-Klick-**Installation** aus dem Marktplatzkatalog ist noch nicht implementiert —
> die Schaltfläche „Installieren“ im Dashboard zeigt bei einem Marktplatzeintrag derzeit einen
> Hinweis „Demnächst verfügbar“ an. Installationen erfolgen aktuell über den Installationsablauf
> mit lokalem Pfad (`POST /api/plugins`) und die Erkennung auf dem Datenträger (`POST /api/plugins/scan`).

## REST-API

Alle Endpunkte erfordern eine Management-Authentifizierung (`requireManagementAuth`)
**und** sind ausschließlich über Loopback erreichbar — `/api/plugins` und
`/api/plugins/` sind in `LOCAL_ONLY_API_PREFIXES`
(`src/server/authz/routeGuard.ts`) aufgeführt.

| Endpunkt                         | Methode | Beschreibung                                                      |
| -------------------------------- | ------- | ----------------------------------------------------------------- |
| `/api/plugins`                   | GET     | Installierte Plugins auflisten (optionaler `?status=`-Filter)     |
| `/api/plugins`                   | POST    | Ein Plugin von einem absoluten lokalen Pfad installieren          |
| `/api/plugins/scan`              | POST    | Das Plugin-Verzeichnis durchsuchen und neue Plugins registrieren  |
| `/api/plugins/marketplace`       | GET     | Einträge des Marketplace-Katalogs auflisten                       |
| `/api/plugins/[name]`            | GET     | Details eines installierten Plugins abrufen                       |
| `/api/plugins/[name]`            | DELETE  | Ein Plugin deinstallieren                                         |
| `/api/plugins/[name]/activate`   | POST    | Aktivieren (laden + Hooks registrieren)                           |
| `/api/plugins/[name]/deactivate` | POST    | Deaktivieren (`onDeactivate` auslösen, Hooks deregistrieren)      |
| `/api/plugins/[name]/config`     | GET     | Plugin-Konfiguration + Konfigurationsschema abrufen               |
| `/api/plugins/[name]/config`     | PUT     | Plugin-Konfiguration aktualisieren (anhand des Schemas validiert) |

Der `status`-Filter von `GET /api/plugins` akzeptiert einen der Werte
`installed` / `active` / `inactive` / `error`. Ein ungültiger Wert führt zu `400`.

### Installierte Plugins auflisten

```bash
curl http://localhost:20128/api/plugins \
  -H "Cookie: auth_token=..."
```

### Von einem lokalen Pfad installieren

```bash
curl -X POST http://localhost:20128/api/plugins \
  -H "Cookie: auth_token=..." \
  -H "Content-Type: application/json" \
  -d '{ "path": "/absolute/path/to/my-plugin" }'
```

Der `path` muss **absolut** sein und darf weder `..`-Traversierungssegmente noch
Nullbytes enthalten (durch Zod erzwungen). Das Quellverzeichnis muss eine gültige
`plugin.json` enthalten (oder das übergeordnete Verzeichnis einer solchen sein).
Bei Erfolg lautet der Antwortstatus `201`, und die Zeile des installierten Plugins
wird zurückgegeben.

### Marketplace durchsuchen

```bash
curl http://localhost:20128/api/plugins/marketplace \
  -H "Cookie: auth_token=..."
```

### Plugin-Konfiguration aktualisieren

```bash
curl -X PUT http://localhost:20128/api/plugins/my-plugin/config \
  -H "Cookie: auth_token=..." \
  -H "Content-Type: application/json" \
  -d '{ "config": { "level": "debug", "maxItems": 100 } }'
```

`PUT .../config` validiert jeden angegebenen Wert anhand des `configSchema` des
Plugins (im Manifest deklariert): `number`-Felder berücksichtigen `min`/`max`,
`select`-Felder müssen dem deklarierten `enum` entsprechen. Schlüssel, die nicht
im Schema enthalten sind, werden zugelassen.

## Konfiguration

### Plugin-Verzeichnis

Plugins befinden sich im OmniRoute-Datenverzeichnis:

```
~/.omniroute/plugins/<plugin-name>/
  ├─ plugin.json
  └─ index.js          # (oder worauf manifest.main verweist)
```

`getDefaultPluginDir()` (`src/lib/plugins/scanner.ts`) ermittelt dieses Verzeichnis
in drei Schritten:

1. **`OMNIROUTE_PLUGINS_DIR`**, sofern gesetzt — wird unabhängig vom Wert von `HOME`
   unverändert verwendet. Dies ist die explizite Option für Docker/K8s, wo der
   Plugin-Verzeichnisbaum per Bind-Mount unter einem Pfad eingebunden ist, der
   üblicherweise nichts mit dem Home-Verzeichnis des Containers zu tun hat (#11827).
2. `<home>/.omniroute/plugins`, wobei `<home>` aus den Umgebungsvariablen `HOME` /
   `USERPROFILE` stammt.
3. `/tmp/.omniroute/plugins`, wenn der Prozess überhaupt kein Home-Verzeichnis
   exportiert.

Das ermittelte Verzeichnis wird beim Start einmal als `scanner.dir_resolved`
protokolliert, einschließlich der maßgeblichen Eingabe (`OMNIROUTE_PLUGINS_DIR`,
`home` oder `no-home-fallback`) — dadurch meldet ein Image, das unbemerkt bei
Schritt 3 landet, diesen Umstand, anstatt lediglich eine leere Plugin-Liste
auszugeben. `POST /api/plugins/scan` erkennt dort jedes Unterverzeichnis, das
eine gültige `plugin.json` enthält, und registriert es; dasselbe Verzeichnis ist
das Stammverzeichnis, in das `pluginManager.install()` Plugins kopiert, sodass
eine Überschreibung Erkennung und Installation gemeinsam verschiebt.

> **`OMNIROUTE_PLUGINS_DIR` ist nicht `OMNIROUTE_PLUGIN_PATH`.** Letzteres wird nur
> vom CLI-Loader für Befehls-Plugins (`bin/cli/plugins.mjs`) gelesen, um
> `omniroute-cmd-*`-npm-Pakete zu finden, die `omniroute`-Unterbefehle hinzufügen —
> es hat keine Auswirkungen auf den hier beschriebenen Laufzeit-Scanner. Siehe
> [PLUGINS.md](./PLUGINS.md) für diese Variante.

### Benutzerdefinierte Marketplace-Registry-URL

Die Quelle des Marketplace-Katalogs wird aus der Einstellung
`pluginMarketplaceUrl` gelesen (`src/lib/plugins/marketplace.ts` liest
`settings.pluginMarketplaceUrl`). Wenn sie auf eine `http(s)`-URL gesetzt ist,
ruft `listMarketplacePlugins()` diese URL ab und akzeptiert entweder ein
JSON-Array von Einträgen auf oberster Ebene oder ein Objekt mit einem
`plugins`-Array; Einträge ohne einen `name` vom Typ String werden herausgefiltert.
Wenn sie nicht gesetzt ist (oder wenn der Abruf an der SSRF-Schutzprüfung
scheitert bzw. eine fehlerhafte Antwort zurückgibt), wird die integrierte
Ausgangs-Registry verwendet.

Der Dashboard-Tab „Marketplace“ stellt ein Feld für diese URL bereit (die über
`GET /api/settings` zurückgelesen wird).

> Implementierungshinweis: Die Dashboard-Aktion „Speichern“ sendet
> `pluginMarketplaceUrl` an `PATCH /api/settings`. Zum Zeitpunkt der Erstellung
> ist dieser Schlüssel nicht in `updateSettingsSchema`
> (`src/shared/validation/settingsSchemas.ts`) deklariert. Überprüfen Sie daher
> die Persistenz in Ihrer Version, bevor Sie sich darauf verlassen — der
> **Lese**pfad (`getSettings()` → `listMarketplacePlugins()`) berücksichtigt den
> Schlüssel, sobald er im Einstellungsspeicher vorhanden ist.

## Sicherheit

### Routenstufe — nur Loopback

Plugins führen Code in gestarteten Kindprozessen aus, daher wird die gesamte
`/api/plugins`-Oberfläche als `LOCAL_ONLY` (Stufe 1) klassifiziert. Die
Loopback-Erzwingung erfolgt bedingungslos **vor** jeder Authentifizierungsprüfung,
sodass ein offengelegtes Verwaltungstoken, das die Maschine über einen Tunnel
erreicht, weiterhin kein Plugin installieren, aktivieren oder deinstallieren
kann. Siehe [`docs/security/ROUTE_GUARD_TIERS.md`](../security/ROUTE_GUARD_TIERS.md)
und Harte Regeln #15 / #17.

### SSRF-Schutz für die Marketplace-Registry

Eine benutzerdefinierte Registry-URL ist eine durch Angreifer beeinflussbare
Konfiguration. Daher durchläuft sie in `listMarketplacePlugins()` vor dem Abruf
zwei Schutzebenen:

1. **`isSafeMarketplaceUrl(url)`** (`src/lib/plugins/marketplace.ts`):
   - Lehnt alles ab, was nicht `http:` / `https:` ist.
   - Lehnt literale private, Loopback-, Link-Local- und ULA-Hosts (IPv4 **und**
     IPv6, einschließlich IPv4-Mapped-Adressen) über das kanonische
     `isPrivateHost` (`src/shared/network/outboundUrlGuard.ts`) ab.
   - Löst **sowohl** `A`- als auch `AAAA`-Einträge auf und lehnt die URL ab,
     wenn **eine beliebige** aufgelöste Adresse privat ist — dadurch wird die
     Umgehung über öffentlicher Hostname → private IP geschlossen.
   - **Schlägt sicher fehl**: Ein Fehler bei der DNS-Auflösung führt zur
     Ablehnung der URL.
2. **`safeOutboundFetch(url, { guard: "public-only", timeoutMs: 5000 })`**
   (`src/shared/network/safeOutboundFetch.ts`): Wendet den URL-Schutz für
   ausschließlich öffentliche Adressen zum Abrufzeitpunkt erneut an und
   **blockiert Weiterleitungen** (kein Schwenk von öffentlich zu privat über
   `30x`).

Eine URL, die an einer der beiden Schutzebenen scheitert, bricht die Anfrage
nicht ab — der Marketplace greift stillschweigend auf die integrierte
Ausgangs-Registry zurück und protokolliert eine Warnung.

> Dieser Schutz wurde in PR #3774 gezielt gehärtet, um A + AAAA aufzulösen und
> das kanonische `isPrivateHost` anstelle einer reinen IPv4-Prüfung zu verwenden.

### Isolierung der Plugin-Ausführung

- **Prozessisolierung** — `loadPlugin()` (`src/lib/plugins/loader.ts`) startet
  jedes Plugin in einem separaten Node.js-Kindprozess und kommuniziert über IPC.
  Hook-Aufrufe besitzen ein Zeitlimit mit einer Eskalation von `SIGTERM` →
  `SIGKILL`.
- **Umgebungsvariablen-Zulassungsliste** — Der Kindprozess erhält nur eine
  zugelassene Menge von Umgebungsvariablen; die umfassendere Menge wird nur
  gewährt, wenn das Manifest die Berechtigung `env` anfordert.
- **Pfadbegrenzung** — Installation, Upgrade und Deinstallation stellen sicher,
  dass das Plugin-Verzeichnis und `manifest.main` **innerhalb** des verwalteten
  Plugin-Stammverzeichnisses aufgelöst werden, bevor Kopier- oder rekursive
  Löschvorgänge stattfinden (Schutz vor manipulierten Datenbankpfaden und
  `../`-Traversal in `manifest.main`). Bei der Aktivierung werden symbolische
  Links über `realpath` aufgelöst, und das Laden eines Einstiegspunkts, der das
  Plugin-Verzeichnis verlässt, wird verweigert.
- **Optionale Integritätsbindung** — Ein Manifest kann ein `integrity`-Feld
  (`sha256-<base64>`, SRI-Format) deklarieren. Ist es vorhanden, überprüft der
  Loader beim Laden den Hash der Einstiegsdatei und verweigert bei einer
  Abweichung die Aktivierung. Dies ist eine optionale Erkennung von
  Manipulationen, **keine** Sicherheitsgrenze — die ausschließlich auf Loopback
  beschränkte Weiterleitung und das Berechtigungsmodell bilden die tatsächlichen
  Grenzen.

## Manifest (`plugin.json`)

Validiert durch `PluginManifestSchema` (`src/lib/plugins/manifest.ts`):

| Feld               | Typ       | Hinweise                                                                   |
| ------------------ | --------- | -------------------------------------------------------------------------- |
| `name`             | string    | Erforderlich; Kebab-Case (`^[a-z0-9-]+$`), 1–100 Zeichen                   |
| `version`          | string    | Erforderlich; Semver (`MAJOR.MINOR.PATCH`)                                 |
| `description`      | string?   | ≤ 500 Zeichen                                                              |
| `author`           | string?   | ≤ 200 Zeichen                                                              |
| `license`          | string?   | Standardwert ist `MIT`                                                     |
| `main`             | string?   | Einstiegsdatei; Standardwert ist `index.js`                                |
| `source`           | enum?     | `local` \| `marketplace` (Standardwert ist `local`)                        |
| `tags`             | string[]? | Such-Tags                                                                  |
| `requires`         | object?   | `{ omniroute?, permissions[] }`                                            |
| `hooks`            | object?   | Boolesche Angaben dazu, welche Hooks das Plugin implementiert              |
| `skills`           | object[]? | Optionale Skill-Definitionen                                               |
| `enabledByDefault` | boolean?  | Bei der Installation automatisch aktivieren                                |
| `configSchema`     | object?   | Zuordnung von Konfigurationsfeldern (`string`/`number`/`boolean`/`select`) |
| `integrity`        | string?   | Optionale Bindung der Einstiegsdatei an `sha256-<base64>`                  |

Berechtigungen stammen aus der Enumeration
`network` / `file-read` / `file-write` / `env` / `exec`.

## Lebenszyklusablauf

```
install (POST /api/plugins, Pfad)
  → Manifest scannen/validieren → in Staging kopieren → sicherstellen, dass main innerhalb des Verzeichnisses liegt
  → atomar nach ~/.omniroute/plugins/<name> umbenennen → DB-Zeile einfügen
  → onInstall auslösen → falls enabledByDefault: aktivieren

activate (POST /api/plugins/{name}/activate)
  → realpath-Einschlussprüfung → loadPlugin() (Kindprozess starten)
  → deklarierte Hooks registrieren → status = "active" → onActivate auslösen

deactivate (POST /api/plugins/{name}/deactivate)
  → onDeactivate auslösen (VOR dem Aufheben der Registrierung) → Hook-Registrierungen aufheben
  → Kindprozess beenden → status = "inactive"

uninstall (DELETE /api/plugins/{name})
  → deaktivieren, falls aktiv → onUninstall auslösen
  → rekursives Löschen des Plugin-Verzeichnisses mit Einschlussprüfung → DB-Zeile löschen
```

Wird `install` erneut für ein Verzeichnis ausgeführt, dessen Manifest-Version **strikt
neuer** als die installierte Version ist, erfolgt automatisch ein Upgrade (saubere Neuinstallation; die Konfiguration wird
auf die Standardwerte zurückgesetzt). Eine gleiche oder ältere Version wird abgelehnt.

## Datenbank

Tabelle `plugins` (Migration `076_create_plugins.sql`):

| Spalte          | Typ     | Hinweise                                              |
| --------------- | ------- | ----------------------------------------------------- |
| `id`            | TEXT PK | UUID                                                  |
| `name`          | TEXT    | Eindeutig                                             |
| `version`       | TEXT    | semver; Standardwert `1.0.0`                          |
| `description`   | TEXT    | Optional                                              |
| `author`        | TEXT    | Optional                                              |
| `license`       | TEXT    | Standardwert `MIT`                                    |
| `main`          | TEXT    | Einstiegsdatei; Standardwert `index.js`               |
| `source`        | TEXT    | Standardwert `local`                                  |
| `tags`          | TEXT    | JSON-Array; Standardwert `[]`                         |
| `status`        | TEXT    | `installed` \| `active` \| `inactive` \| `error`      |
| `enabled`       | INT     | 0/1; Standardwert 0                                   |
| `manifest`      | TEXT    | Vollständiges Manifest-JSON                           |
| `config`        | TEXT    | JSON; Standardwert `{}`                               |
| `config_schema` | TEXT    | JSON; Standardwert `{}`                               |
| `hooks`         | TEXT    | JSON-Array deklarierter Hook-Namen; Standardwert `[]` |
| `permissions`   | TEXT    | JSON-Array; Standardwert `[]`                         |
| `plugin_dir`    | TEXT    | Absolutes Installationsverzeichnis                    |
| `error_message` | TEXT    | Wird gesetzt, wenn `status = "error"`                 |
| `installed_at`  | TEXT    | `datetime('now')`                                     |
| `updated_at`    | TEXT    | `datetime('now')`                                     |
| `activated_at`  | TEXT    | Wird bei der Aktivierung gesetzt                      |

Plugin-Metriken und -Analysen werden in zusätzlichen Tabellen erfasst
(`090_plugin_metrics.sql`, `091_plugin_analytics.sql`).

## Dashboard

Die Dashboard-Seite unter `/dashboard/plugins`
(`src/app/(dashboard)/dashboard/plugins/page.tsx`) bietet zwei Registerkarten:

- **Installiert** — listet installierte Plugins mit ihren deklarierten Hooks, einem
  Schalter zum Aktivieren/Deaktivieren, einer Schaltfläche zum Deinstallieren und einer Aktion „Nach Plugins suchen“
  (`POST /api/plugins/scan`) auf.
- **Marketplace** — zeigt den Katalog von `GET /api/plugins/marketplace` mit einem
  Feld zum Festlegen der benutzerdefinierten Registry-URL an.

Eine pluginspezifische Konfigurationsseite befindet sich unter `/dashboard/plugins/[name]/config`
(`src/app/(dashboard)/dashboard/plugins/[name]/config/page.tsx`).

## Siehe auch

- [`docs/security/ROUTE_GUARD_TIERS.md`](../security/ROUTE_GUARD_TIERS.md) —
  warum `/api/plugins` nur über Loopback erreichbar ist (Tier 1)
- [`docs/frameworks/SKILLS.md`](./SKILLS.md) — das zugehörige Skills-Framework
  (`src/lib/skills/`); Plugins können Skills in ihrem Manifest deklarieren
- [`docs/frameworks/WEBHOOKS.md`](./WEBHOOKS.md) — ereignisgesteuerte ausgehende
  Integrationen
- [`docs/security/ERROR_SANITIZATION.md`](../security/ERROR_SANITIZATION.md) —
  das von jeder Plugin-Route für Fehlerantworten verwendete `buildErrorBody()`-Muster
