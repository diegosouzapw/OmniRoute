# Import providers from a CSV or JSON file (Deutsch)

🌐 **Languages:** 🇺🇸 [English](../../../../providers/CSV-IMPORT.md) · 🇪🇹 [am](../../../am/docs/providers/CSV-IMPORT.md) · 🇸🇦 [ar](../../../ar/docs/providers/CSV-IMPORT.md) · 🇦🇿 [az](../../../az/docs/providers/CSV-IMPORT.md) · 🇧🇬 [bg](../../../bg/docs/providers/CSV-IMPORT.md) · 🇧🇩 [bn](../../../bn/docs/providers/CSV-IMPORT.md) · 🇨🇿 [cs](../../../cs/docs/providers/CSV-IMPORT.md) · 🇩🇰 [da](../../../da/docs/providers/CSV-IMPORT.md) · 🇬🇷 [el](../../../el/docs/providers/CSV-IMPORT.md) · 🇪🇸 [es](../../../es/docs/providers/CSV-IMPORT.md) · 🇪🇪 [et](../../../et/docs/providers/CSV-IMPORT.md) · 🇮🇷 [fa](../../../fa/docs/providers/CSV-IMPORT.md) · 🇫🇮 [fi](../../../fi/docs/providers/CSV-IMPORT.md) · 🇫🇷 [fr](../../../fr/docs/providers/CSV-IMPORT.md) · 🇮🇪 [ga](../../../ga/docs/providers/CSV-IMPORT.md) · 🇮🇳 [gu](../../../gu/docs/providers/CSV-IMPORT.md) · 🇳🇬 [ha](../../../ha/docs/providers/CSV-IMPORT.md) · 🇮🇱 [he](../../../he/docs/providers/CSV-IMPORT.md) · 🇮🇳 [hi](../../../hi/docs/providers/CSV-IMPORT.md) · 🇭🇷 [hr](../../../hr/docs/providers/CSV-IMPORT.md) · 🇭🇺 [hu](../../../hu/docs/providers/CSV-IMPORT.md) · 🇦🇲 [hy](../../../hy/docs/providers/CSV-IMPORT.md) · 🇮🇩 [id](../../../id/docs/providers/CSV-IMPORT.md) · 🇳🇬 [ig](../../../ig/docs/providers/CSV-IMPORT.md) · 🇮🇹 [it](../../../it/docs/providers/CSV-IMPORT.md) · 🇯🇵 [ja](../../../ja/docs/providers/CSV-IMPORT.md) · 🇬🇪 [ka](../../../ka/docs/providers/CSV-IMPORT.md) · 🇰🇭 [km](../../../km/docs/providers/CSV-IMPORT.md) · 🇮🇳 [kn](../../../kn/docs/providers/CSV-IMPORT.md) · 🇰🇷 [ko](../../../ko/docs/providers/CSV-IMPORT.md) · 🇱🇹 [lt](../../../lt/docs/providers/CSV-IMPORT.md) · 🇱🇻 [lv](../../../lv/docs/providers/CSV-IMPORT.md) · 🇮🇳 [ml](../../../ml/docs/providers/CSV-IMPORT.md) · 🇮🇳 [mr](../../../mr/docs/providers/CSV-IMPORT.md) · 🇲🇾 [ms](../../../ms/docs/providers/CSV-IMPORT.md) · 🇲🇹 [mt](../../../mt/docs/providers/CSV-IMPORT.md) · 🇲🇲 [my](../../../my/docs/providers/CSV-IMPORT.md) · 🇳🇵 [ne](../../../ne/docs/providers/CSV-IMPORT.md) · 🇳🇱 [nl](../../../nl/docs/providers/CSV-IMPORT.md) · 🇳🇴 [no](../../../no/docs/providers/CSV-IMPORT.md) · 🇮🇳 [or](../../../or/docs/providers/CSV-IMPORT.md) · 🇮🇳 [pa](../../../pa/docs/providers/CSV-IMPORT.md) · 🇵🇭 [phi](../../../phi/docs/providers/CSV-IMPORT.md) · 🇵🇱 [pl](../../../pl/docs/providers/CSV-IMPORT.md) · 🇵🇹 [pt](../../../pt/docs/providers/CSV-IMPORT.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/providers/CSV-IMPORT.md) · 🇷🇴 [ro](../../../ro/docs/providers/CSV-IMPORT.md) · 🇷🇺 [ru](../../../ru/docs/providers/CSV-IMPORT.md) · 🇱🇰 [si](../../../si/docs/providers/CSV-IMPORT.md) · 🇸🇰 [sk](../../../sk/docs/providers/CSV-IMPORT.md) · 🇸🇮 [sl](../../../sl/docs/providers/CSV-IMPORT.md) · 🇷🇸 [sr](../../../sr/docs/providers/CSV-IMPORT.md) · 🇸🇪 [sv](../../../sv/docs/providers/CSV-IMPORT.md) · 🇰🇪 [sw](../../../sw/docs/providers/CSV-IMPORT.md) · 🇮🇳 [ta](../../../ta/docs/providers/CSV-IMPORT.md) · 🇮🇳 [te](../../../te/docs/providers/CSV-IMPORT.md) · 🇹🇭 [th](../../../th/docs/providers/CSV-IMPORT.md) · 🇹🇷 [tr](../../../tr/docs/providers/CSV-IMPORT.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/providers/CSV-IMPORT.md) · 🇵🇰 [ur](../../../ur/docs/providers/CSV-IMPORT.md) · 🇺🇿 [uz](../../../uz/docs/providers/CSV-IMPORT.md) · 🇻🇳 [vi](../../../vi/docs/providers/CSV-IMPORT.md) · 🇳🇬 [yo](../../../yo/docs/providers/CSV-IMPORT.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/providers/CSV-IMPORT.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/providers/CSV-IMPORT.md)

---

Dashboard → Anbieter → **Aus Datei importieren** erstellt API-Schlüssel-Verbindungen aus einer CSV- oder JSON-Liste. Jede Zeile kann auf einen anderen Anbieter verweisen. Teilweise Fehler sind ausdrücklich vorgesehen: Gültige Zeilen werden auch dann importiert, wenn andere fehlschlagen, und das Modal zeigt an, warum die fehlgeschlagenen Zeilen abgelehnt wurden.

Dieser Import erstellt **keine** neuen OpenAI-/Anthropic-kompatiblen Endpunktknoten. Erstellen Sie diese zuerst (Dashboard → Anbieter → OpenAI-kompatiblen Anbieter hinzufügen oder `omniroute nodes add`) und importieren Sie anschließend Zeilen, deren Spalte `provider` die ID dieses Knotens enthält. Ein zeilenspezifischer Wert für `baseUrl` kann die URL des Knotens weiterhin überschreiben.

## CSV (positionsbasiert)

Die Spaltennamen sind rein kosmetisch. Der Parser teilt jede Zeile auf und weist die Werte anhand ihres Index zu:

| Index | Feld       | Erforderlich | Hinweise                                                                                                                                                |
| ----- | ---------- | ------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 0     | `provider` | ja           | ID eines vorhandenen verwalteten Anbieters (`openai`, `anthropic`, …) **oder** ID eines bereits registrierten OpenAI-/Anthropic-kompatiblen **Knotens** |
| 1     | `name`     | ja           | Anzeigename der Verbindung                                                                                                                              |
| 2     | `apiKey`   | ja           | API-Schlüssel                                                                                                                                           |
| 3     | `baseUrl`  | nein         | Zeilenspezifische URL-Überschreibung                                                                                                                    |
| 4     | `priority` | nein         | Ganzzahl zwischen 1 und 100                                                                                                                             |

Eine erste Zeile, deren erste Spalte das exakte Wort `provider` enthält (Groß-/Kleinschreibung wird nicht berücksichtigt), wird als Kopfzeile übersprungen. Leerzeilen und `#`-Kommentare werden übersprungen.

Laden Sie über das Import-Modal eine Ausgangsdatei herunter (**CSV-Vorlage herunterladen**). Beispiel:

```csv
# OmniRoute-Anbieterimport (positionsbasierte Spalten)
provider,name,apiKey,baseUrl,priority
openai,Prod OpenAI,sk-your-openai-key,,1
```

Eine frei erfundene ID wie `openai-compatible-chat-001` ist kein Knoten. Die API gibt für diese Zeile `Unknown or unsupported provider` zurück; das Modal zeigt die Meldung neben dem Zeilennamen an.

## JSON

Ein JSON-Array aus Objekten mit denselben Feldern (`provider`, `name`, `apiKey`, `baseUrl?`, `priority?`). Anders als bei CSV werden JSON-Schlüssel namentlich angegeben.

```json
[
  {
    "provider": "openai",
    "name": "Prod OpenAI",
    "apiKey": "sk-your-openai-key",
    "priority": 1
  }
]
```
