# ChatGPT Web (Codex)

`ChatGPT Web (Codex)` ist ein zusätzlicher Provider. Der bestehende Provider
`ChatGPT Web (Plus/Pro)` bleibt für normale Chats, Bilder und dessen bisherige
Tool-Emulation unverändert.

## Voraussetzungen

- ein vollständiger Cookie-Header einer angemeldeten ChatGPT-Sitzung;
- Chrome oder Chromium bei npm-, systemd- und PM2-Installationen;
- beim Docker-Profil `web` der interne Chromium-Dienst aus `docker-compose.yml`;
- ein OpenAI-Tunnel und ein ChatGPT-Custom-Connector für lokale Codex-Tools.

Der Tunnel ist nur für Tool-Runden nötig. `pro` ist read-only und benötigt keinen
lokalen Tool-Connector.

## Einrichtung in der Weboberfläche

1. Öffne den Provider `ChatGPT Web (Codex)` und füge eine Connection hinzu.
2. Füge den vollständigen ChatGPT-Cookie, die Tunnel-ID, den Runtime-Key und den
   Namen des Custom Connectors ein.
3. Starte die Prüfung. OmniRoute öffnet headless einen Temporary Chat und erkennt
   dabei auch, ob `pro` für das Konto verfügbar ist.
4. Speichere die Connection. OmniRoute ersetzt den eingegebenen Cookie durch den
   geprüften Playwright-Storage-State und speichert ihn zusammen mit dem Runtime-Key
   über die verschlüsselte Credential-Abstraktion.

Der rohe Cookie wird nach erfolgreichem Speichern nicht zusätzlich aufbewahrt.
Wenn die Sitzung abläuft, öffne die Connection, gib einen frischen vollständigen
Cookie ein und prüfe sie erneut. Der Doctor-Status im Edit-Dialog zeigt Browser,
Storage-State, Anmeldung, Temporary Chat, Tunnel, Connector und Tool-Roundtrip
getrennt an.

## Modelle und Combos

Die festen Modelle sind:

- `chatgpt-web-codex/instant`
- `chatgpt-web-codex/medium`
- `chatgpt-web-codex/high`
- `chatgpt-web-codex/extra-high`
- `chatgpt-web-codex/pro`

Füge eines davon wie jedes andere Modell zu einer Combo hinzu. Die Codex-App
sendet nur den Combo-Namen als `model` an den normalen Responses-Endpunkt
`/v1/responses`. Es gibt keinen Sonderendpoint und keinen Codex-Modus-Schalter.

`pro` führt keine lokalen Tools aus. Ein erzwungenes Tool macht dieses Combo-Ziel
inkompatibel; bei optionalen Tools läuft der Turn read-only und meldet diese
Einschränkung als Commentary.

## Sicherheitsmodell

- Der native Pfad verlangt einen Responses-Request, einen erkannten Codex-Client
  sowie zusammenpassende Thread- und Turn-Identitäten.
- Workspace, Sandbox, Approval-Policy und Toolkatalog stammen aus der nativen
  Codex-Hülle. Freier Prompttext ist dafür keine Autorität.
- ChatGPT erhält pro Turn nur eine kurzlebige Capability. Der MCP-Broker akzeptiert
  ausschließlich Tools, die Codex in genau diesem Turn angeboten hat.
- Das automatische Bestätigen von „Allow once“ gibt nur den Tool-Wunsch an Codex
  zurück. Codex allein entscheidet über Freigabe und Ausführung.
- Vor dem ersten Output darf die Combo auf ein anderes kompatibles Ziel fallen.
  Danach bleiben Provider, Modell, Connection und Browserturn bis zum Abschluss
  gepinnt.
- Cookies, Runtime-Keys, Storage-State und Capability-Tokens erscheinen nicht in
  Providerantworten oder Request-Logs.

## Headless VPS und Docker

Bei npm-, systemd- und PM2-Betrieb erkennt OmniRoute übliche Chrome- und
Chromium-Pfade. Alternativ kann `CHATGPT_WEB_CODEX_CHROME_PATH` gesetzt werden.

Das Docker-Profil `web` startet `chatgpt-web-codex-browser` im internen
Compose-Netz. Sein CDP-Port wird nicht auf dem Host veröffentlicht. Das geschützte
Profilvolume bleibt getrennt vom OmniRoute-Datenvolume und der Browser erhält
ausreichend Shared Memory. Der interne CDP-Proxy lauscht nur im Compose-Netz auf
Port `9223`; Chrome selbst bleibt im Sidecar an Loopback gebunden.

Eine Supervisor-Lease unter `DATA_DIR` verhindert, dass mehrere OmniRoute-Prozesse
denselben Tunnel- und Brokerzustand besitzen. Ein Konflikt erscheint im Doctor.

## Interaktive Wiederherstellung

Der normale Pfad ist vollständig headless. Wenn ChatGPT eine interaktive
Anmeldung oder Challenge verlangt, kann die bestehende VNC-Browser-Infrastruktur
als Recovery-Weg verwendet werden. Browser-UI und CDP dürfen dabei nur über
Loopback, eine authentifizierte Managementverbindung oder einen SSH-Tunnel
erreichbar sein; noVNC bleibt im normalen Betrieb deaktiviert.

## WebSocket-Fallback

Enthält eine Combo `ChatGPT Web (Codex)`, fordert die Responses-WebSocket-Brücke
vor der Upstream-Verbindung den HTTP/SSE-Fallback an. Die eigentliche Übertragung
erfolgt dann über `/v1/responses`.
