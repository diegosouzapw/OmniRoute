# Zed IDE Integration in Docker Environments (Deutsch)

🌐 **Languages:** 🇺🇸 [English](../../../../providers/ZED-DOCKER.md) · 🇪🇹 [am](../../../am/docs/providers/ZED-DOCKER.md) · 🇸🇦 [ar](../../../ar/docs/providers/ZED-DOCKER.md) · 🇦🇿 [az](../../../az/docs/providers/ZED-DOCKER.md) · 🇧🇬 [bg](../../../bg/docs/providers/ZED-DOCKER.md) · 🇧🇩 [bn](../../../bn/docs/providers/ZED-DOCKER.md) · 🇨🇿 [cs](../../../cs/docs/providers/ZED-DOCKER.md) · 🇩🇰 [da](../../../da/docs/providers/ZED-DOCKER.md) · 🇬🇷 [el](../../../el/docs/providers/ZED-DOCKER.md) · 🇪🇸 [es](../../../es/docs/providers/ZED-DOCKER.md) · 🇪🇪 [et](../../../et/docs/providers/ZED-DOCKER.md) · 🇮🇷 [fa](../../../fa/docs/providers/ZED-DOCKER.md) · 🇫🇮 [fi](../../../fi/docs/providers/ZED-DOCKER.md) · 🇫🇷 [fr](../../../fr/docs/providers/ZED-DOCKER.md) · 🇮🇪 [ga](../../../ga/docs/providers/ZED-DOCKER.md) · 🇮🇳 [gu](../../../gu/docs/providers/ZED-DOCKER.md) · 🇳🇬 [ha](../../../ha/docs/providers/ZED-DOCKER.md) · 🇮🇱 [he](../../../he/docs/providers/ZED-DOCKER.md) · 🇮🇳 [hi](../../../hi/docs/providers/ZED-DOCKER.md) · 🇭🇷 [hr](../../../hr/docs/providers/ZED-DOCKER.md) · 🇭🇺 [hu](../../../hu/docs/providers/ZED-DOCKER.md) · 🇦🇲 [hy](../../../hy/docs/providers/ZED-DOCKER.md) · 🇮🇩 [id](../../../id/docs/providers/ZED-DOCKER.md) · 🇳🇬 [ig](../../../ig/docs/providers/ZED-DOCKER.md) · 🇮🇹 [it](../../../it/docs/providers/ZED-DOCKER.md) · 🇯🇵 [ja](../../../ja/docs/providers/ZED-DOCKER.md) · 🇬🇪 [ka](../../../ka/docs/providers/ZED-DOCKER.md) · 🇰🇭 [km](../../../km/docs/providers/ZED-DOCKER.md) · 🇮🇳 [kn](../../../kn/docs/providers/ZED-DOCKER.md) · 🇰🇷 [ko](../../../ko/docs/providers/ZED-DOCKER.md) · 🇱🇹 [lt](../../../lt/docs/providers/ZED-DOCKER.md) · 🇱🇻 [lv](../../../lv/docs/providers/ZED-DOCKER.md) · 🇮🇳 [ml](../../../ml/docs/providers/ZED-DOCKER.md) · 🇮🇳 [mr](../../../mr/docs/providers/ZED-DOCKER.md) · 🇲🇾 [ms](../../../ms/docs/providers/ZED-DOCKER.md) · 🇲🇹 [mt](../../../mt/docs/providers/ZED-DOCKER.md) · 🇲🇲 [my](../../../my/docs/providers/ZED-DOCKER.md) · 🇳🇵 [ne](../../../ne/docs/providers/ZED-DOCKER.md) · 🇳🇱 [nl](../../../nl/docs/providers/ZED-DOCKER.md) · 🇳🇴 [no](../../../no/docs/providers/ZED-DOCKER.md) · 🇮🇳 [or](../../../or/docs/providers/ZED-DOCKER.md) · 🇮🇳 [pa](../../../pa/docs/providers/ZED-DOCKER.md) · 🇵🇭 [phi](../../../phi/docs/providers/ZED-DOCKER.md) · 🇵🇱 [pl](../../../pl/docs/providers/ZED-DOCKER.md) · 🇵🇹 [pt](../../../pt/docs/providers/ZED-DOCKER.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/providers/ZED-DOCKER.md) · 🇷🇴 [ro](../../../ro/docs/providers/ZED-DOCKER.md) · 🇷🇺 [ru](../../../ru/docs/providers/ZED-DOCKER.md) · 🇱🇰 [si](../../../si/docs/providers/ZED-DOCKER.md) · 🇸🇰 [sk](../../../sk/docs/providers/ZED-DOCKER.md) · 🇸🇮 [sl](../../../sl/docs/providers/ZED-DOCKER.md) · 🇷🇸 [sr](../../../sr/docs/providers/ZED-DOCKER.md) · 🇸🇪 [sv](../../../sv/docs/providers/ZED-DOCKER.md) · 🇰🇪 [sw](../../../sw/docs/providers/ZED-DOCKER.md) · 🇮🇳 [ta](../../../ta/docs/providers/ZED-DOCKER.md) · 🇮🇳 [te](../../../te/docs/providers/ZED-DOCKER.md) · 🇹🇭 [th](../../../th/docs/providers/ZED-DOCKER.md) · 🇹🇷 [tr](../../../tr/docs/providers/ZED-DOCKER.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/providers/ZED-DOCKER.md) · 🇵🇰 [ur](../../../ur/docs/providers/ZED-DOCKER.md) · 🇺🇿 [uz](../../../uz/docs/providers/ZED-DOCKER.md) · 🇻🇳 [vi](../../../vi/docs/providers/ZED-DOCKER.md) · 🇳🇬 [yo](../../../yo/docs/providers/ZED-DOCKER.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/providers/ZED-DOCKER.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/providers/ZED-DOCKER.md)

---

Wenn OmniRoute innerhalb von Docker ausgeführt wird, schlägt der standardmäßige Ablauf „Aus Zed-Schlüsselbund importieren“ fehl,
da der Container nicht auf den Schlüsselbund-Daemon des Host-Betriebssystems zugreifen kann (`libsecret` unter Linux,
Schlüsselbund unter macOS, Anmeldeinformationsverwaltung unter Windows) und die Zed-Konfigurationsverzeichnisse im
Host-Dateisystem standardmäßig innerhalb des Containers nicht sichtbar sind.

## Warum der Schlüsselbundimport in Docker fehlschlägt

Innerhalb eines Containers treten zwei blockierende Probleme auf:

1. **Dateisystemisolierung** — `isZedInstalled()` sucht nach `~/.config/zed` (Linux),
   `~/Library/Application Support/Zed` (macOS) oder dem entsprechenden Windows-Pfad. Diese Pfade
   befinden sich auf dem Host und sind nur verfügbar, wenn sie explizit als Volume eingebunden werden.
2. **IPC-Isolierung** — Selbst wenn das Konfigurationsverzeichnis eingebunden ist, kommuniziert das native
   Modul `keytar` über einen Unix-Socket oder eine D-Bus-Sitzung mit dem Schlüsselbunddienst des Betriebssystems.
   Beide werden standardmäßig nicht an den Container weitergeleitet, sodass das Auslesen von Anmeldeinformationen immer fehlschlägt.

OmniRoute erkennt die Docker-Umgebung anhand von zwei Heuristiken:

- Vorhandensein von `/.dockerenv` (wird beim Start des Containers vom Docker-Daemon erstellt).
- Die Zeichenfolge `docker` in `/proc/1/cgroup` (Linux cgroup v1).

Wenn eine der beiden Heuristiken zutrifft, gibt die Importroute HTTP 422 mit
`zedDockerEnvironment: true` sowie einer Meldung zurück, die Sie zur Registerkarte für den manuellen Token-Import weiterleitet.

## Verwenden der Registerkarte für den manuellen Token-Import

1. Öffnen Sie **Dashboard → Anbieter → Zed**.
2. Der Bereich **Manueller Token-Import** wird unterhalb der Karte für den Schlüsselbundimport angezeigt. Wenn
   OmniRoute Docker erkennt, wird dieser Bereich nach dem ersten fehlgeschlagenen
   Schlüsselbundimport automatisch erweitert.
3. Wählen Sie den Anbieter aus der Dropdown-Liste aus (OpenAI, Anthropic, Google, Mistral, xAI,
   OpenRouter oder DeepSeek).
4. Fügen Sie den API-Schlüssel in das Passwortfeld ein.
5. Klicken Sie auf **Importieren**.

Der Schlüssel wird als neue Anbieterverbindung mit dem Namen
`Zed Manual Import (<provider>)` gespeichert.

## Wo Zed API-Schlüssel auf dem Host speichert

Zed speichert Schlüssel für KI-Anbieter im Schlüsselbund des Betriebssystems unter Dienstnamen wie
`zed-openai`, `ai.zed.openai`, `zed-anthropic` usw. Um sie für den manuellen
Import abzurufen, suchen Sie an folgenden Orten:

**Linux**

```
~/.config/zed/settings.json
```

Der Abschnitt `language_models` enthält die Anbieterkonfigurationen. Schlüssel, die über die
Zed-Benutzeroberfläche im Schlüsselbund gespeichert wurden, stehen nicht als Klartext in `settings.json`; rufen Sie sie über
eine Schlüsselbundanzeige wie GNOME Keyring / Seahorse oder durch Ausführen des folgenden Befehls ab:

```bash
secret-tool lookup service zed-openai account api-key
```

**macOS**

```
~/Library/Application Support/Zed/settings.json
```

Schlüsselbundeinträge finden Sie in **Keychain Access.app**, indem Sie nach `zed` suchen.

## Option zum Einbinden eines Volumes (Fortgeschritten)

Sie können das Zed-Konfigurationsverzeichnis optional schreibgeschützt in den Container einbinden.
Dies behebt das Schlüsselbundproblem nicht, kann jedoch für zukünftige Funktionen nützlich sein, die
nicht vertrauliche Zed-Konfigurationswerte lesen (z. B. Modellpräferenzen).

```yaml
# Ausschnitt aus docker-compose.yml
services:
  omniroute:
    image: omniroute:latest
    volumes:
      # Linux-Host
      - "${HOME}/.config/zed:/host-zed-config:ro"
      # macOS-Host (stattdessen auskommentieren)
      # - "${HOME}/Library/Application Support/Zed:/host-zed-config:ro"
    environment:
      # Zukünftig: ZED_CONFIG_PATH=/host-zed-config
      PORT: "20128"
```

Hinweis: Eine Überschreibung über die Umgebungsvariable `ZED_CONFIG_PATH` ist noch nicht implementiert. Dieser
Ausschnitt dient als Referenz für den Zeitpunkt, zu dem diese Funktion hinzugefügt wird.

## API für den manuellen Import

Der Endpunkt für den manuellen Import kann auch direkt aufgerufen werden:

```
POST /api/providers/zed/manual-import
Content-Type: application/json
Authorization: Bearer <oma_live_or_manage_scoped_api_key>

{
  "provider": "openai",
  "token": "sk-...",
  "label": "Mein Zed-OpenAI-Schlüssel"   // optional
}
```

Bei Erfolg wird Folgendes zurückgegeben:

```json
{ "success": true, "connectionId": "...", "provider": "openai" }
```

## Fehlerbehebung

| Symptom                                   | Ursache                                            | Lösung                                             |
| ----------------------------------------- | -------------------------------------------------- | -------------------------------------------------- |
| 422 + `zedDockerEnvironment: true`        | Ausführung innerhalb von Docker                    | Registerkarte „Manueller Token-Import“ nutzen      |
| 404 + `zedInstalled: false`               | Zed ist nicht auf dem Host installiert             | Zed installieren oder manuellen Import nutzen      |
| 403 + Schlüsselbundzugriff verweigert     | Betriebssystem verweigert den Schlüsselbundzugriff | Berechtigung in der Betriebssystemabfrage erteilen |
| 404 + Schlüsselbunddienst nicht verfügbar | `libsecret` fehlt unter Linux                      | `libsecret-1-dev` installieren                     |
