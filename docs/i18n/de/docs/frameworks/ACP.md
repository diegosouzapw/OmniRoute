# ACP registry and registered CLI launchers (Deutsch)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/ACP.md) · 🇪🇹 [am](../../../am/docs/frameworks/ACP.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/ACP.md) · 🇦🇿 [az](../../../az/docs/frameworks/ACP.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/ACP.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/ACP.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/ACP.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/ACP.md) · 🇩🇰 [da](../../../da/docs/frameworks/ACP.md) · 🇬🇷 [el](../../../el/docs/frameworks/ACP.md) · 🇪🇸 [es](../../../es/docs/frameworks/ACP.md) · 🇪🇪 [et](../../../et/docs/frameworks/ACP.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/ACP.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/ACP.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/ACP.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/ACP.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/ACP.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/ACP.md) · 🇮🇱 [he](../../../he/docs/frameworks/ACP.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/ACP.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/ACP.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/ACP.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/ACP.md) · 🇮🇩 [id](../../../id/docs/frameworks/ACP.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/ACP.md) · 🇮🇹 [it](../../../it/docs/frameworks/ACP.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/ACP.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/ACP.md) · 🇰🇭 [km](../../../km/docs/frameworks/ACP.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/ACP.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/ACP.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/ACP.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/ACP.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/ACP.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/ACP.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/ACP.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/ACP.md) · 🇲🇲 [my](../../../my/docs/frameworks/ACP.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/ACP.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/ACP.md) · 🇳🇴 [no](../../../no/docs/frameworks/ACP.md) · 🇮🇳 [or](../../../or/docs/frameworks/ACP.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/ACP.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/ACP.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/ACP.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/ACP.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/ACP.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/ACP.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/ACP.md) · 🇱🇰 [si](../../../si/docs/frameworks/ACP.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/ACP.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/ACP.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/ACP.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/ACP.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/ACP.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/ACP.md) · 🇮🇳 [te](../../../te/docs/frameworks/ACP.md) · 🇹🇭 [th](../../../th/docs/frameworks/ACP.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/ACP.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/ACP.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/ACP.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/ACP.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/ACP.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/ACP.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/ACP.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/ACP.md)

---

OmniRoute trennt **CLI-Erkennung**, das **native Agent Client Protocol** und
**Legacy-stdio-Adapter** voneinander. Das Auffinden einer installierten Binärdatei belegt weder deren
Authentifizierung noch deren Modellkompatibilität oder Bereitschaft zur Verarbeitung eines Prompts.

Das Dashboard verwendet `GET /api/acp/agents` und `POST /api/acp/agents` für die Bestandsverwaltung
und die Registrierung benutzerdefinierter Agenten. Dabei handelt es sich um ausschließlich lokale Verwaltungsrouten, nicht um eine
öffentliche API zum Starten von Prozessen oder Übermitteln von Prompts. Der interne
`AcpManager` wird nicht automatisch zu einem HTTP-Provider-Fallback.

## Registrierte Verträge

`config/cli-tools-manifest.json` ist die maßgebliche Quelle für integrierte Startbinärdateien,
Argumente und Backend-Modi. Die Registry leitet ihre Definitionen
aus diesem Manifest ab. Die Erkennung wird 60 Sekunden lang zwischengespeichert.

- `acp`: Der Gemini-Vertrag startet `gemini --experimental-acp` und kommuniziert
  über die offizielle TypeScript-SDK mittels durch Zeilenumbrüche getrenntem ACP-JSON-RPC.
- `stdio-adapter`: Andere registrierte Verträge verwenden weiterhin den Legacy-Adapter mit zeilenweiser Eingabe
  und stdout-Ausgabe. Eine zweisekündige Leerlaufphase ohne Ausgabe beendet die Antwort.
  Dieser Adapter bestätigt **keine** native ACP-Unterstützung für diese CLIs.

Gemini dokumentiert das Start-Flag in seiner [CLI-Referenz](https://geminicli.com/docs/cli/cli-reference/).
Der Client verwendet die [offizielle ACP-SDK](https://github.com/agentclientprotocol/typescript-sdk)
für Initialisierung, Sitzungserstellung, Prompt-Anfragen, Benachrichtigungen und Abbruch.

Definitionen benutzerdefinierter Agenten bleiben vom Administrator kontrollierte Startverträge.
Durch die Registrierung einer Binärdatei und von Argumenten erhält dieser Prozess die lokalen
Ausführungsberechtigungen des Serverbenutzers; die Registrierung stellt keine Sandbox dar. Versionsprüfungen akzeptieren
nur die registrierte ausführbare Datei und ein erkanntes Versions-Flag.

## Interne Start-API

```typescript
import { acpManager } from "@/lib/acp";

const session = acpManager.spawn("gemini", {
  cwd: process.cwd(),
  // Nur die Provider-Variablen übergeben, die diesem Agenten ausdrücklich zugewiesen wurden.
  env: {
    GEMINI_API_KEY: process.env.GEMINI_API_KEY,
  },
});

try {
  const response = await acpManager.sendPrompt(session.id, "Dieses Projekt erklären", 120_000);
  // Die Antwort in der aufrufenden Anwendung verarbeiten.
} finally {
  acpManager.kill(session.id);
}
```

`spawn(agentId, options)` ermittelt die ausführbare Datei und die Argumente aus der
registrierten Definition. Die einzigen Optionen für Aufrufer sind `cwd` und `env`; die alte
Signatur `spawn(agentId, binary, args, env)` sowie Überschreibungen der ausführbaren Datei werden
abgelehnt. HTTP-Startverträge werden von diesem Manager nicht unterstützt.

Der Kindprozess übernimmt dasselbe Betriebssystem, Terminal, Gebietsschema und dieselbe Zertifikats-
Positivliste wie die CLI-Starter. Server-/Provider-Geheimnisse werden nicht aus der
übergeordneten Umgebung kopiert. Für die ausgewählte CLI erforderliche Zugangsdaten müssen
explizit übergeben oder über die eigene lokale Authentifizierung dieser CLI bereitgestellt
werden. Der Kindprozess besitzt weiterhin die Dateisystemberechtigungen des lokalen Benutzers und kann seine eigene Konfiguration lesen.

## Nativer Lebenszyklus und Grenzwerte

1. Die registrierte Binärdatei starten, ACP initialisieren und eine Sitzung erstellen, deren Stammverzeichnis
   das ausgewählte Arbeitsverzeichnis ist. Für die Initialisierung gilt ein Limit von zehn Sekunden.
2. Einen Prompt übermitteln und Textbenachrichtigungen ausschließlich für diese Sitzung erfassen.
   Als Abschluss gilt die Prompt-RPC-Antwort, nicht ein Zeitraum ohne stdout-Ausgabe.
3. Eine einzige Prompt-Frist verwenden, einschließlich einer noch nicht abgeschlossenen Initialisierung; der Standardwert
   beträgt 120 Sekunden. Gleichzeitige Prompts im selben Prozess werden abgelehnt.
4. Bei einem nativen Timeout `session/cancel` versuchen und den Prozess beenden. Ein
   begrenztes Zeitfenster von 100 ms ermöglicht das Leeren der Benachrichtigungen vor der Beendigung.
5. Den Transportzustand schließen und die Sitzung entfernen, wenn die Initialisierung fehlschlägt, die
   Verbindung geschlossen wird, der Prozess beendet wird oder der Aufrufer ihn beendet.

Anfragen nach Werkzeugberechtigungen werden abgelehnt. Es werden keine Dateisystem- oder Terminal-Client-
Fähigkeiten angekündigt. Diese Einschränkungen kapseln die Kindbinärdatei selbst nicht in einer Sandbox
und ersetzen nicht die eigenen Autorisierungseinstellungen einer CLI.

Sowohl nativer Text als auch Legacy-stdout/stderr speichern höchstens 1 MiB an Zeichen,
wobei die neuesten Ausgaben zusammen mit einem Kürzungshinweis erhalten bleiben. Ein einzelner nativer Übertragungs-
Frame ist vor dem SDK-Parsing auf 2 MiB an Bytes begrenzt. Die Puffer werden für jeden Prompt zurückgesetzt.

`kill(sessionId)` sendet SIGTERM und nach fünf Sekunden SIGKILL, falls der Prozess
noch nicht beendet wurde. Legacy-Prompt-Timeouts geben Listener und Timer frei, lassen
die Sitzung jedoch für einen weiteren Prompt verfügbar; die Aufrufer bleiben dafür verantwortlich,
nach Abschluss `kill()` oder `killAll()` aufzurufen.

## Ereignisse und Inspektion

Der Manager gibt `stdout`, `stderr` und `exit` aus, jeweils mit `sessionId`.
`sessionError` meldet einen bereinigten Transportfehler. Das kompatibilitätsbezogene Ereignis `error`
wird nur ausgegeben, wenn es einen Abonnenten hat, sodass eine fehlende Binärdatei
keinen unbehandelten EventEmitter-Fehler verursachen kann.

- `getSession(sessionId)` gibt eine verwaltete Sitzung oder `undefined` zurück.
- `getActiveSessions()` schließt angehaltene oder sich im Anhalten befindende Sitzungen aus.
- `sendInput(sessionId, input)` ist nur für einen aktiven Legacy-Adapter verfügbar;
  natives ACP lehnt Roheingaben ab, um seinen JSON-RPC-Datenstrom zu schützen.
- `killAll()` beendet jede von dieser Instanz verwaltete Sitzung.

## Validierungsgrenzen

Deterministische Fixtures decken den nativen Handshake, die Textausgabe, abgelehnte
Berechtigungen, Abbruch, gleichzeitige Prompts, fehlgeschlagene Initialisierung, Prozessbeendigung,
Ausgabelimits und Geheimnis-Isolation ab. Bestehende Regressionstests für Legacy-Puffer und -Listener
bleiben erhalten. Diese Tests belegen weder eine aktive Gemini-Anmeldung
noch eine erfolgreiche Provider-Inferenz; dafür ist ein separat autorisierter Smoke-Test
in der Zielumgebung erforderlich.

## Zugehörige Dokumentation

- [Agentenprotokolle](./AGENT_PROTOCOLS_GUIDE.md)
- [CLI-Startverträge](../guides/CLI-LAUNCH-CONTRACTS.md)
- [CLI-Werkzeuge](../reference/CLI-TOOLS.md)
- [A2A-Server](./A2A-SERVER.md)
- [Cloud-Agenten](./CLOUD_AGENT.md)
