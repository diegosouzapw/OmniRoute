# Tunnels Guide (Deutsch)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/TUNNELS_GUIDE.md) · 🇪🇹 [am](../../../am/docs/ops/TUNNELS_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/ops/TUNNELS_GUIDE.md) · 🇦🇿 [az](../../../az/docs/ops/TUNNELS_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/ops/TUNNELS_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/ops/TUNNELS_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/ops/TUNNELS_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/ops/TUNNELS_GUIDE.md) · 🇩🇰 [da](../../../da/docs/ops/TUNNELS_GUIDE.md) · 🇬🇷 [el](../../../el/docs/ops/TUNNELS_GUIDE.md) · 🇪🇸 [es](../../../es/docs/ops/TUNNELS_GUIDE.md) · 🇪🇪 [et](../../../et/docs/ops/TUNNELS_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/ops/TUNNELS_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/ops/TUNNELS_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/ops/TUNNELS_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/ops/TUNNELS_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/ops/TUNNELS_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/ops/TUNNELS_GUIDE.md) · 🇮🇱 [he](../../../he/docs/ops/TUNNELS_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/ops/TUNNELS_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/ops/TUNNELS_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/ops/TUNNELS_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/ops/TUNNELS_GUIDE.md) · 🇮🇩 [id](../../../id/docs/ops/TUNNELS_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/ops/TUNNELS_GUIDE.md) · 🇮🇹 [it](../../../it/docs/ops/TUNNELS_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/ops/TUNNELS_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/ops/TUNNELS_GUIDE.md) · 🇰🇭 [km](../../../km/docs/ops/TUNNELS_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/ops/TUNNELS_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/ops/TUNNELS_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/ops/TUNNELS_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/ops/TUNNELS_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/ops/TUNNELS_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/ops/TUNNELS_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/ops/TUNNELS_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/ops/TUNNELS_GUIDE.md) · 🇲🇲 [my](../../../my/docs/ops/TUNNELS_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/ops/TUNNELS_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/ops/TUNNELS_GUIDE.md) · 🇳🇴 [no](../../../no/docs/ops/TUNNELS_GUIDE.md) · 🇮🇳 [or](../../../or/docs/ops/TUNNELS_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/ops/TUNNELS_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/ops/TUNNELS_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/ops/TUNNELS_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/ops/TUNNELS_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/TUNNELS_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/ops/TUNNELS_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/ops/TUNNELS_GUIDE.md) · 🇱🇰 [si](../../../si/docs/ops/TUNNELS_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/ops/TUNNELS_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/ops/TUNNELS_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/ops/TUNNELS_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/ops/TUNNELS_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/ops/TUNNELS_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/ops/TUNNELS_GUIDE.md) · 🇮🇳 [te](../../../te/docs/ops/TUNNELS_GUIDE.md) · 🇹🇭 [th](../../../th/docs/ops/TUNNELS_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/ops/TUNNELS_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/TUNNELS_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/ops/TUNNELS_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/ops/TUNNELS_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/ops/TUNNELS_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/ops/TUNNELS_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/TUNNELS_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/TUNNELS_GUIDE.md)

---

> **Maßgebliche Quelle:** `src/lib/{cloudflaredTunnel,ngrokTunnel,tailscaleTunnel}.ts`, `src/app/api/tunnels/`
> **Zuletzt aktualisiert:** 2026-06-28 — v3.8.40

OmniRoute kann seinen lokalen Server (`http://localhost:20128`) über drei
Tunnel-Backends im öffentlichen Internet verfügbar machen. Dies ist nützlich für:

- OAuth-Callbacks von Cloud-Anbietern (Antigravity, Gemini, Cursor), die eine
  öffentlich erreichbare Weiterleitungs-URL benötigen.
- Das Teilen Ihrer lokalen Instanz mit Teammitgliedern, ohne eine VM bereitzustellen.
- Tests auf Mobilgeräten, aus der Ferne oder über Netzwerkgrenzen hinweg.

Alle drei Backends werden prozessintern verwaltet — OmniRoute startet/stoppt die
zugrunde liegende Binärdatei oder das SDK über das Dashboard oder die REST-API.
Es ist keine Einrichtung eines Reverse-Proxys oder von systemd erforderlich.

## Backends im Überblick

| Backend                     | Beständigkeit                                                                    | Kosten                              | Einrichtung                                               |
| --------------------------- | -------------------------------------------------------------------------------- | ----------------------------------- | --------------------------------------------------------- |
| **Cloudflare Quick Tunnel** | Temporär (URL ändert sich bei jedem Neustart)                                    | Kostenlos                           | Keine — installiert `cloudflared` automatisch             |
| **ngrok**                   | Stabil, wenn ein kostenpflichtiger Tarif oder eine feste Domain konfiguriert ist | Kostenloser Tarif + kostenpflichtig | Erfordert ngrok-Konto + authtoken                         |
| **Tailscale Funnel**        | Stabil pro Knoten innerhalb Ihres Tailnets                                       | Für private Nutzung kostenlos       | Erfordert Tailscale-Installation + Anmeldung + Funnel-ACL |

Die Implementierungen befinden sich in `src/lib/cloudflaredTunnel.ts`,
`src/lib/ngrokTunnel.ts` und `src/lib/tailscaleTunnel.ts`. Alle drei geben ein
einheitlich aufgebautes `status`-Objekt mit den Feldern `phase`, `running`, `publicUrl`,
`apiUrl`, `targetUrl` und `lastError` zurück, sodass das Dashboard sie einheitlich
darstellen kann.

## 1. Cloudflare Tunnel (Quick Tunnel + Named Tunnel)

`src/lib/cloudflaredTunnel.ts` führt `cloudflared` als untergeordneten Prozess aus.
Es unterstützt zwei Modi, die danach ausgewählt werden, ob eine Named-Tunnel-Konfiguration
bereitgestellt wird:

- **Quick Tunnel (Standard).** Führt `cloudflared tunnel --url
http://localhost:<apiPort>` aus und liest die zugewiesene `*.trycloudflare.com`-URL
  aus stdout aus. URLs sind temporär und ändern sich bei jedem Neustart.
- **Named Tunnel (optional).** Wenn `CLOUDFLARED_CONFIG` auf eine lokal verwaltete
  cloudflared-`config.yml` verweist, führt OmniRoute `cloudflared tunnel --no-autoupdate
--config <path> run` aus, wodurch Sie einen **stabilen, benannten Hostnamen**
  erhalten. Die Konfiguration stellt die Tunnel-UUID, `credentials-file` und das
  `ingress`-Routing bereit, sodass kein `--url` übergeben wird und kein Token des
  Zero-Trust-Dashboards erforderlich ist. `run` liest die Anmeldedaten aus dem
  absoluten `credentials-file`-Pfad der Konfiguration — `cert.pem` wird nicht
  benötigt (es wird nur für die Verwaltung des Tunnel-Lebenszyklus verwendet).

Wichtige Verhaltensweisen:

- **Automatische Installation.** Bei der ersten Verwendung lädt OmniRoute die neueste
  `cloudflared`-Binärdatei aus den offiziellen GitHub-Releases herunter (die verwaltete
  Installation befindet sich unter `DATA_DIR/cloudflared/`). Der SHA256-Wert des
  heruntergeladenen Artefakts wird vor der Ausführung anhand des Release-Manifests
  überprüft.
- **Prozessüberwachung.** Die cloudflared-PID und die aufgelöste URL werden in
  `quick-tunnel-state.json` gespeichert, sodass das Dashboard den Status nach dem
  Neuladen wiederherstellen kann.

### Einrichtung eines Named Tunnels (stabiler Hostname)

1. Erstellen Sie einmalig mit der cloudflared-CLI einen lokal verwalteten Tunnel:

   ```bash
   cloudflared tunnel login
   cloudflared tunnel create omniroute
   cloudflared tunnel route dns omniroute ai.example.com
   ```

2. Erstellen Sie eine `~/.cloudflared/config.yml`, die Ihren Hostnamen an den lokalen
   API-Port von OmniRoute weiterleitet (standardmäßig 20128):

   ```yaml
   tunnel: <UUID-from-create>
   credentials-file: /home/you/.cloudflared/<UUID>.json
   ingress:
     - hostname: ai.example.com
       service: http://127.0.0.1:20128
     - service: http_status:404
   ```

3. Verweisen Sie OmniRoute auf die Konfiguration und starten Sie den Tunnel (neu):

   ```bash
   export CLOUDFLARED_CONFIG="/home/you/.cloudflared/config.yml"
   # optional — überschreibt den von OmniRoute gemeldeten Hostnamen; andernfalls wird er aus der
   # ersten ingress-Regel der Konfiguration gelesen:
   # export CLOUDFLARED_HOSTNAME="ai.example.com"
   ```

   Aktivieren Sie den Tunnel auf dieselbe Weise wie einen Quick Tunnel (REST /
   Dashboard / CLI unten). Ein Named Tunnel gibt keine öffentliche URL zum Auslesen
   aus, daher wird die Bereitschaft anhand der registrierten Edge-Verbindung von
   cloudflared erkannt, und `publicUrl`/`apiUrl` werden aus `CLOUDFLARED_HOSTNAME`
   (oder dem ersten ingress-Hostnamen der Konfiguration) übernommen.

### Aktivieren / Deaktivieren über REST

Der Endpunkt verwendet einen Body im Format `{action: "enable" | "disable"}` und
keine separaten `start`/`stop`-Pfade. Eine Verwaltungsautorisierung (Admin-Sitzung
oder Admin-API-Schlüssel) ist erforderlich.

```bash
# Aktivieren
curl -X POST http://localhost:20128/api/tunnels/cloudflared \
  -H "Content-Type: application/json" \
  -H "Cookie: auth_token=..." \
  -d '{"action":"enable"}'

# Status
curl http://localhost:20128/api/tunnels/cloudflared \
  -H "Cookie: auth_token=..."

# Deaktivieren
curl -X POST http://localhost:20128/api/tunnels/cloudflared \
  -H "Content-Type: application/json" \
  -H "Cookie: auth_token=..." \
  -d '{"action":"disable"}'
```

Oder über das Dashboard: **Einstellungen → Tunnel → Cloudflare**.

### Optionale Umgebungsvariablen

| Variable                                             | Zweck                                                                                                                                                                                         |
| ---------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `CLOUDFLARED_BIN`                                    | Überschreibt den Pfad zur Binärdatei. Wenn der Pfad gesetzt und gültig ist, verwendet OmniRoute diese Binärdatei, anstatt sie herunterzuladen.                                                |
| `CLOUDFLARED_PROTOCOL` / `TUNNEL_TRANSPORT_PROTOCOL` | Transportprotokoll (Standard: `http2`; außerdem `quic`, `auto`).                                                                                                                              |
| `CLOUDFLARED_CONFIG`                                 | Pfad zu einer lokal verwalteten cloudflared-`config.yml`. Wenn gesetzt, führt OmniRoute einen **benannten/persistenten** Tunnel (`tunnel --config <path> run`) statt eines Quick Tunnels aus. |
| `CLOUDFLARED_HOSTNAME`                               | Überschreibt den gemeldeten öffentlichen Hostnamen des benannten Tunnels (z. B. `ai.example.com`). Wenn nicht gesetzt, wird er aus dem ersten `ingress`-Hostnamen der Konfiguration gelesen.  |

## 2. ngrok

`src/lib/ngrokTunnel.ts` verwendet das **`@ngrok/ngrok` SDK** (prozessintern, ohne CLI-Unterprozess). Das native Modul wird beim ersten Start verzögert importiert, damit die App auf Plattformen ohne vorkompilierte Binärdateien beim Start nicht fehlschlägt.

### Voraussetzungen

1. Registrieren Sie sich unter <https://ngrok.com>.
2. Kopieren Sie Ihr Authtoken aus dem ngrok-Dashboard.
3. Stellen Sie es auf eine der folgenden Arten bereit:
   - `.env`: `NGROK_AUTHTOKEN=<token>`, oder
   - Dashboard: **Einstellungen → Tunnel → ngrok**, oder
   - REST-Body (einmalig): `{"action":"enable","authToken":"<token>"}`.

Wenn keine dieser Optionen konfiguriert ist, gibt der Status `phase: "needs_auth"` zurück.

### Über REST aktivieren/deaktivieren

```bash
# Aktivieren (verwendet NGROK_AUTHTOKEN aus der Umgebung)
curl -X POST http://localhost:20128/api/tunnels/ngrok \
  -H "Content-Type: application/json" \
  -H "Cookie: auth_token=..." \
  -d '{"action":"enable"}'

# Mit Inline-Token aktivieren
curl -X POST http://localhost:20128/api/tunnels/ngrok \
  -H "Content-Type: application/json" \
  -H "Cookie: auth_token=..." \
  -d '{"action":"enable","authToken":"2abc..."}'

# Status
curl http://localhost:20128/api/tunnels/ngrok \
  -H "Cookie: auth_token=..."

# Deaktivieren
curl -X POST http://localhost:20128/api/tunnels/ngrok \
  -H "Content-Type: application/json" \
  -H "Cookie: auth_token=..." \
  -d '{"action":"disable"}'
```

Die Antwort enthält die zugewiesene `publicUrl` (z. B. `https://abcd-1234.ngrok-free.app`). Benutzerdefinierte Domains, Regionen und Richtlinienregeln müssen im ngrok-Dashboard konfiguriert werden — OmniRoute selbst leitet lediglich die lokale Ziel-URL an das SDK weiter.

## 3. Tailscale Funnel

`src/lib/tailscaleTunnel.ts` steuert die systemweite `tailscale` CLI, um den lokalen API-Port über **Funnel** (Tailscales öffentliches Internet-Gateway für Serve) bereitzustellen. Es unterstützt den vollständigen Lebenszyklus: Installation, Anmeldung, Start des Daemons, Aktivierung und Deaktivierung.

Die Implementierung ruft `tailscale funnel --bg <port>` auf (Hintergrundmodus). Die öffentliche URL hat die Form `https://<machine>.<tailnet>.ts.net/`.

### Voraussetzungen

1. Installieren Sie Tailscale (oder lassen Sie OmniRoute dies erledigen — siehe den nachfolgenden `install`-Endpunkt).
2. Melden Sie sich an (`tailscale login` oder über den `login`-Endpunkt von OmniRoute).
3. Aktivieren Sie Funnel für Ihr Tailnet in der Tailscale-Administrationskonsole:
   <https://login.tailscale.com/admin/settings/features>.

Unter Linux und macOS benötigt der Daemon (`tailscaled`) `sudo` zur Steuerung. Die POST-Endpunkte akzeptieren ein optionales Feld `sudoPassword`, das für die Dauer des Aufrufs an den MITM-Passwort-Cache von OmniRoute (`getCachedPassword` / `setCachedPassword`) weitergeleitet wird. Windows verwendet die standardmäßige Dienstinstallation unter `C:\Program Files\Tailscale\tailscale.exe`.

### REST-Endpunkte

Tailscale bietet eine umfangreichere Oberfläche als die anderen Backends, da Installation, Anmeldung, Daemon und Tunnel voneinander getrennt sind.

| Endpunkt                              | Methode | Zweck                                                                        |
| ------------------------------------- | ------- | ---------------------------------------------------------------------------- |
| `/api/tunnels/tailscale`              | `GET`   | Zusammengefasster Tunnelstatus (`phase`, `tunnelUrl`, `apiUrl` usw.)         |
| `/api/tunnels/tailscale/check`        | `GET`   | Prüfung auf niedrigerer Ebene: installiert? angemeldet? Daemon aktiv?        |
| `/api/tunnels/tailscale/install`      | `POST`  | Tailscale installieren (SSE-gestreamte Fortschrittsereignisse) — Linux/macOS |
| `/api/tunnels/tailscale/start-daemon` | `POST`  | `tailscaled` unter Linux/macOS starten                                       |
| `/api/tunnels/tailscale/login`        | `POST`  | Anmeldevorgang starten; gibt eine im Browser zu öffnende `authUrl` zurück    |
| `/api/tunnels/tailscale/enable`       | `POST`  | Funnel für den API-Port starten                                              |
| `/api/tunnels/tailscale/disable`      | `POST`  | Funnel stoppen                                                               |

Alle Tailscale-Endpunkte erfordern eine Verwaltungs-Authentifizierung (siehe `routeUtils.ts :: requireTailscaleAuth`).

Beispiel für die Aktivierung:

```bash
curl -X POST http://localhost:20128/api/tunnels/tailscale/enable \
  -H "Content-Type: application/json" \
  -H "Cookie: auth_token=..." \
  -d '{"sudoPassword":"<linux-pwd>","port":20128}'
```

Wenn Funnel in der Administrationskonsole nicht aktiviert ist, enthält die Antwort `funnelNotEnabled: true` sowie eine `enableUrl`, die in einem Browser geöffnet werden kann.

### Optionale Umgebungsvariablen

| Variable        | Zweck                                         |
| --------------- | --------------------------------------------- |
| `TAILSCALE_BIN` | Pfad zur `tailscale`-Binärdatei überschreiben |

## Endpunktübersicht

| Endpunkt                              | Methode | Anfragetext                         | Authentifizierung |
| ------------------------------------- | ------- | ----------------------------------- | ----------------- |
| `/api/tunnels/cloudflared`            | `GET`   | —                                   | management        |
| `/api/tunnels/cloudflared`            | `POST`  | `{action: "enable" \| "disable"}`   | management        |
| `/api/tunnels/ngrok`                  | `GET`   | —                                   | management        |
| `/api/tunnels/ngrok`                  | `POST`  | `{action, authToken?}`              | management        |
| `/api/tunnels/tailscale`              | `GET`   | —                                   | management        |
| `/api/tunnels/tailscale/check`        | `GET`   | —                                   | management        |
| `/api/tunnels/tailscale/install`      | `POST`  | `{sudoPassword?}` (SSE)             | management        |
| `/api/tunnels/tailscale/start-daemon` | `POST`  | `{sudoPassword?}`                   | management        |
| `/api/tunnels/tailscale/login`        | `POST`  | `{hostname?}`                       | management        |
| `/api/tunnels/tailscale/enable`       | `POST`  | `{sudoPassword?, hostname?, port?}` | management        |
| `/api/tunnels/tailscale/disable`      | `POST`  | `{sudoPassword?}`                   | management        |

Es gibt keinen zentralen Endpunkt `/api/settings/tunnels` — jedes Backend ist
unabhängig.

## Hinweise zum OAuth-Callback

Wenn Sie OmniRoute über einen Tunnel verfügbar machen, müssen das Dashboard und
die OAuth-Abläufe Callback-URLs unter Verwendung des **öffentlichen**
Hostnamens und nicht von `localhost` erstellen. Andernfalls leitet der
OAuth-Anbieter den Benutzer an eine URL zurück, die von seinen Servern nicht
erreichbar ist, und der Handshake schlägt fehl.

Für Änderungen im Dashboard und das Speichern von Einstellungen muss der
Tunnel-Hostname nicht in `NEXT_PUBLIC_BASE_URL` festgelegt werden. Das
authentifizierte Dashboard sendet unsichere Same-Origin-Anfragen mit einem an
die Sitzung gebundenen CSRF-Token. Daher können kurzlebige Hosts von Cloudflare
Quick Tunnel nach der Anmeldung weiterhin für die normale Verwaltung über die
Benutzeroberfläche verwendet werden.

Legen Sie Folgendes fest:

```bash
NEXT_PUBLIC_BASE_URL=https://<Ihr-Tunnel-Host>
```

und starten Sie OmniRoute neu, bevor Sie OAuth initiieren. Bei kurzlebigen
Cloudflare Quick Tunnels ändert sich die URL nach jedem Neustart. Bevorzugen Sie
daher für den produktiven OAuth-Einsatz ngrok mit einer reservierten Domain oder
Tailscale Funnel.

## Systemzustand und Überwachung

Das Dashboard zeigt den Tunnelstatus unter **Einstellungen → Tunnel** an:

- Aktive Backends und die aktuelle `phase` (`stopped`, `starting`, `running`,
  `needs_auth`, `error`).
- Die aktuelle öffentliche URL und die daraus abgeleitete API-URL
  (`<publicUrl>/v1`).
- Die lokale Ziel-URL, an die der Tunnel weiterleitet.
- Die letzte Fehlermeldung, sofern vorhanden.

Fragen Sie zur programmatischen Überwachung regelmäßig die backend-spezifischen
`GET`-Endpunkte ab. Der gleichzeitige Betrieb mehrerer Backends ist zulässig;
OmniRoute verfolgt jedes davon unabhängig.

## Fehlerbehebung

### „cloudflared-Binärdatei nicht gefunden“

OmniRoute versucht bei der ersten Verwendung eine automatische Installation.
Falls die Installation blockiert wird (eingeschränktes Netzwerk, kein Zugriff
auf GitHub), laden Sie `cloudflared` manuell von
<https://github.com/cloudflare/cloudflared/releases> herunter und legen Sie
`CLOUDFLARED_BIN=/path/to/cloudflared` fest.

### „ngrok: Authtoken erforderlich“

`phase: "needs_auth"` bedeutet, dass kein Authtoken gefunden wurde. Legen Sie
`NGROK_AUTHTOKEN` in `.env` fest, konfigurieren Sie ihn über das Dashboard oder
übergeben Sie `authToken` im Anfragetext des POST-Aufrufs zum Aktivieren.

### „tailscale: Funnel nicht aktiviert“

Wenn die Antwort auf die Aktivierungsanfrage `funnelNotEnabled: true` enthält,
ist Funnel für Ihr Tailnet deaktiviert. Öffnen Sie die zurückgegebene
`enableUrl` (oder die Funktionsseite in der Verwaltungskonsole) und aktivieren
Sie Funnel.

### Änderungen der Tunnel-URL beeinträchtigen OAuth

Verwenden Sie ngrok mit einer reservierten Domain oder Tailscale Funnel (beide
sind pro Knoten stabil). Cloudflare Quick Tunnels sind konzeptbedingt kurzlebig
und werden für langlebige OAuth-Callbacks nicht empfohlen.

### Zugriff unter Linux/macOS für Tailscale verweigert

`tailscaled` benötigt Root-Rechte. Übergeben Sie `sudoPassword` an den
entsprechenden POST-Endpunkt oder starten Sie den Daemon selbst
(`sudo systemctl start tailscaled`).

## Siehe auch

- [PROXY_GUIDE.md](./PROXY_GUIDE.md) — ausgehender Proxy (1proxy, SOCKS5, HTTP) für
  ausgehenden Datenverkehr.
- [ENVIRONMENT.md](../reference/ENVIRONMENT.md) — vollständige Liste der Umgebungsvariablen einschließlich
  `NEXT_PUBLIC_BASE_URL`.
- [FLY_IO_DEPLOYMENT_GUIDE.md](./FLY_IO_DEPLOYMENT_GUIDE.md),
  [DOCKER_GUIDE.md](../guides/DOCKER_GUIDE.md) — Alternativen zu Tunneling für stabiles
  öffentliches Hosting.
- Quellcode: `src/lib/{cloudflaredTunnel,ngrokTunnel,tailscaleTunnel}.ts`,
  `src/app/api/tunnels/`.
