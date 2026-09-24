# Cursor Image Generation (Deutsch)

🌐 **Languages:** 🇺🇸 [English](../../../../providers/CURSOR_IMAGE.md) · 🇪🇹 [am](../../../am/docs/providers/CURSOR_IMAGE.md) · 🇸🇦 [ar](../../../ar/docs/providers/CURSOR_IMAGE.md) · 🇦🇿 [az](../../../az/docs/providers/CURSOR_IMAGE.md) · 🇧🇬 [bg](../../../bg/docs/providers/CURSOR_IMAGE.md) · 🇧🇩 [bn](../../../bn/docs/providers/CURSOR_IMAGE.md) · 🇧🇦 [bs](../../../bs/docs/providers/CURSOR_IMAGE.md) · 🇨🇿 [cs](../../../cs/docs/providers/CURSOR_IMAGE.md) · 🇩🇰 [da](../../../da/docs/providers/CURSOR_IMAGE.md) · 🇬🇷 [el](../../../el/docs/providers/CURSOR_IMAGE.md) · 🇪🇸 [es](../../../es/docs/providers/CURSOR_IMAGE.md) · 🇪🇪 [et](../../../et/docs/providers/CURSOR_IMAGE.md) · 🇮🇷 [fa](../../../fa/docs/providers/CURSOR_IMAGE.md) · 🇫🇮 [fi](../../../fi/docs/providers/CURSOR_IMAGE.md) · 🇫🇷 [fr](../../../fr/docs/providers/CURSOR_IMAGE.md) · 🇮🇪 [ga](../../../ga/docs/providers/CURSOR_IMAGE.md) · 🇮🇳 [gu](../../../gu/docs/providers/CURSOR_IMAGE.md) · 🇳🇬 [ha](../../../ha/docs/providers/CURSOR_IMAGE.md) · 🇮🇱 [he](../../../he/docs/providers/CURSOR_IMAGE.md) · 🇮🇳 [hi](../../../hi/docs/providers/CURSOR_IMAGE.md) · 🇭🇷 [hr](../../../hr/docs/providers/CURSOR_IMAGE.md) · 🇭🇺 [hu](../../../hu/docs/providers/CURSOR_IMAGE.md) · 🇦🇲 [hy](../../../hy/docs/providers/CURSOR_IMAGE.md) · 🇮🇩 [id](../../../id/docs/providers/CURSOR_IMAGE.md) · 🇳🇬 [ig](../../../ig/docs/providers/CURSOR_IMAGE.md) · 🇮🇹 [it](../../../it/docs/providers/CURSOR_IMAGE.md) · 🇯🇵 [ja](../../../ja/docs/providers/CURSOR_IMAGE.md) · 🇬🇪 [ka](../../../ka/docs/providers/CURSOR_IMAGE.md) · 🇰🇭 [km](../../../km/docs/providers/CURSOR_IMAGE.md) · 🇮🇳 [kn](../../../kn/docs/providers/CURSOR_IMAGE.md) · 🇰🇷 [ko](../../../ko/docs/providers/CURSOR_IMAGE.md) · 🇱🇹 [lt](../../../lt/docs/providers/CURSOR_IMAGE.md) · 🇱🇻 [lv](../../../lv/docs/providers/CURSOR_IMAGE.md) · 🇮🇳 [ml](../../../ml/docs/providers/CURSOR_IMAGE.md) · 🇮🇳 [mr](../../../mr/docs/providers/CURSOR_IMAGE.md) · 🇲🇾 [ms](../../../ms/docs/providers/CURSOR_IMAGE.md) · 🇲🇹 [mt](../../../mt/docs/providers/CURSOR_IMAGE.md) · 🇲🇲 [my](../../../my/docs/providers/CURSOR_IMAGE.md) · 🇳🇵 [ne](../../../ne/docs/providers/CURSOR_IMAGE.md) · 🇳🇱 [nl](../../../nl/docs/providers/CURSOR_IMAGE.md) · 🇳🇴 [no](../../../no/docs/providers/CURSOR_IMAGE.md) · 🇮🇳 [or](../../../or/docs/providers/CURSOR_IMAGE.md) · 🇮🇳 [pa](../../../pa/docs/providers/CURSOR_IMAGE.md) · 🇵🇭 [phi](../../../phi/docs/providers/CURSOR_IMAGE.md) · 🇵🇱 [pl](../../../pl/docs/providers/CURSOR_IMAGE.md) · 🇵🇹 [pt](../../../pt/docs/providers/CURSOR_IMAGE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/providers/CURSOR_IMAGE.md) · 🇷🇴 [ro](../../../ro/docs/providers/CURSOR_IMAGE.md) · 🇷🇺 [ru](../../../ru/docs/providers/CURSOR_IMAGE.md) · 🇱🇰 [si](../../../si/docs/providers/CURSOR_IMAGE.md) · 🇸🇰 [sk](../../../sk/docs/providers/CURSOR_IMAGE.md) · 🇸🇮 [sl](../../../sl/docs/providers/CURSOR_IMAGE.md) · 🇷🇸 [sr](../../../sr/docs/providers/CURSOR_IMAGE.md) · 🇸🇪 [sv](../../../sv/docs/providers/CURSOR_IMAGE.md) · 🇰🇪 [sw](../../../sw/docs/providers/CURSOR_IMAGE.md) · 🇮🇳 [ta](../../../ta/docs/providers/CURSOR_IMAGE.md) · 🇮🇳 [te](../../../te/docs/providers/CURSOR_IMAGE.md) · 🇹🇭 [th](../../../th/docs/providers/CURSOR_IMAGE.md) · 🇹🇷 [tr](../../../tr/docs/providers/CURSOR_IMAGE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/providers/CURSOR_IMAGE.md) · 🇵🇰 [ur](../../../ur/docs/providers/CURSOR_IMAGE.md) · 🇺🇿 [uz](../../../uz/docs/providers/CURSOR_IMAGE.md) · 🇻🇳 [vi](../../../vi/docs/providers/CURSOR_IMAGE.md) · 🇳🇬 [yo](../../../yo/docs/providers/CURSOR_IMAGE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/providers/CURSOR_IMAGE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/providers/CURSOR_IMAGE.md)

---

OmniRoute stellt die **Bildgenerierung** des Cursor-Tarifs unter `POST /v1/images/generations` über dieselbe Anbieter-ID wie für den Chat bereit: `cursor` (Alias `cu`).

| Feld                 | Wert                                                                                                |
| -------------------- | --------------------------------------------------------------------------------------------------- |
| `IMAGE_PROVIDERS`-ID | `cursor`                                                                                            |
| Format               | `cursor-agent-image`                                                                                |
| Authentifizierung    | Dieselbe OAuth-/API-Schlüssel-Verbindung wie beim Chat (`provider_connections.provider = "cursor"`) |
| Modelle              | `cursor/auto`, `cursor/composer-2`, `cursor/composer-2.5`                                           |

## Warum die Agent CLI verwendet wird

Der Cursor-Chat in OmniRoute verwendet `agent.v1.AgentService/Run` (protobuf). Dieser Pfad **lehnt** integrierte Client-Tools (Shell, Schreiben, …) ab. Die Bildgenerierung ist ein natives Cursor-Tool, das von der **`agent` CLI** unter Nutzung des Benutzerplatzes ausgeführt wird. Der Bild-Handler startet daher `agent` mit einem fest vorgegebenen Prompt und einem temporären Arbeitsbereich pro Anfrage (analog zu Community-Bridges für Benutzerplätze) und gibt anschließend OpenAI-kompatibles `b64_json` zurück.

## Zugriffsbeschränkung (Feste Regeln #15 + #17)

Dies ist das einzige `IMAGE_PROVIDERS`-Format, das einen untergeordneten Prozess (das
`agent`-Binary) startet. Da `POST /v1/images/generations` von ca. 40 weiteren, keine
Prozesse startenden Bildanbietern gemeinsam genutzt wird, die legitimerweise von
externen Aufrufern verwendet werden, ist nicht die gesamte Route als **`LOCAL_ONLY`**
klassifiziert. Stattdessen erzwingt `handleCursorAgentImageGeneration` eine eigene
Zugriffssperre mithilfe des vertrauenswürdigen `AUTHZ_HEADER_PEER_LOCALITY`-Urteils,
das die Authz-Pipeline jeder Anfrage zuweist (basierend auf dem tatsächlichen TCP-Peer,
niemals auf dem fälschbaren `Host`-Header): Nur Aufrufer aus `loopback` und `lan` dürfen
den Prozessstart erreichen; alle anderen (einschließlich eines geleakten API-Schlüssels,
der über einen öffentlichen Tunnel erneut verwendet wird) erhalten den Status `403`,
bevor eine Suche nach Zugangsdaten oder ein Prozessstart erfolgt. Siehe
`src/server/authz/policies/management.ts` für dieselbe Richtlinie, die auf den übrigen
`LOCAL_ONLY`-Bereich angewendet wird.

## Nebenläufigkeitssperre auf Modulebene (Einschränkung auf eine einzelne Instanz)

`CURSOR_IMG_MAX_CONCURRENT` wird durch einen speicherinternen Zähler/eine Warteschlange
durchgesetzt, dessen bzw. deren Gültigkeitsbereich auf die Node-Modulinstanz
(`open-sse/handlers/imageGeneration/providers/cursorAgentImage.ts`) beschränkt ist.
Dadurch wird die Anzahl gleichzeitiger `agent`-Prozessstarts innerhalb eines einzelnen
OmniRoute-Prozesses korrekt begrenzt, aber es findet **keine** Koordination zwischen
mehreren Prozessen/Instanzen statt, die denselben Cursor-Benutzerplatz gemeinsam nutzen
(z. B. bei einer Bereitstellung mit mehreren Replikaten) — jede Instanz setzt ihr
eigenes unabhängiges Limit durch. Für eine Bereitstellung mit einer einzelnen Instanz
(der Standard) ist dies exakt; horizontal skalierte Bereitstellungen sollten
`CURSOR_IMG_MAX_CONCURRENT` pro Instanz konservativ festlegen oder Cursor-Bildanfragen
an eine einzelne Instanz weiterleiten.

## Voraussetzungen

1. Ein im Dashboard verbundenes Cursor-Konto (OAuth oder `crsr_…`-API-Schlüssel).
2. Das Cursor-Agent-Binary muss für den OmniRoute-Prozess verfügbar sein:
   - Umgebungsvariable `CURSOR_AGENT_BIN=/path/to/agent`, oder
   - `~/.local/bin/agent`, oder
   - `providerSpecificData.agentBin` in der Cursor-Verbindung.

Optionale Feinabstimmung:

| Umgebungsvariable           | Standardwert             | Bedeutung                                                        |
| --------------------------- | ------------------------ | ---------------------------------------------------------------- |
| `CURSOR_IMG_TIMEOUT_MS`     | `210000`                 | Maximale Laufzeit pro Bild                                       |
| `CURSOR_IMG_MAX_CONCURRENT` | `2`                      | Nebenläufigkeitssperre für den gemeinsam genutzten Benutzerplatz |
| `CURSOR_IMG_MODEL`          | (Anfragemodell / `auto`) | Überschreibt `--model` der CLI                                   |

## Beispiel

```bash
curl -sS https://<host>/v1/images/generations \
  -H "Authorization: Bearer <omni-api-key>" \
  -H "Content-Type: application/json" \
  -d '{"model":"cursor/auto","prompt":"a lantern in fog","size":"1024x1024"}'
```

Die Generierung dauert üblicherweise 1–2 Minuten. Bevorzugen Sie einen internen Netzwerkpfad; Edge-Proxys mit Timeouts von ca. 100 Sekunden schlagen fehl.

## LiteLLM

Registrieren Sie ein Bildmodell mit `mode: image_generation`, `api_base: http://omniroute:20128/v1` und `model: openai/cursor/auto` (oder nur `cursor/auto`, abhängig von Ihrer LiteLLM-Version).
