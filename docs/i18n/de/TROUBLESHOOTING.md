# Fehlerbehebung

🌐 **Languages:** 🇺🇸 [English](../../TROUBLESHOOTING.md) | 🇧🇷 [Português (Brasil)](../pt-BR/TROUBLESHOOTING.md) | 🇪🇸 [Español](../es/TROUBLESHOOTING.md) | 🇫🇷 [Français](../fr/TROUBLESHOOTING.md) | 🇮🇹 [Italiano](../it/TROUBLESHOOTING.md) | 🇷🇺 [Русский](../ru/TROUBLESHOOTING.md) | 🇨🇳 [中文 (简体)](../zh-CN/TROUBLESHOOTING.md) | 🇩🇪 [Deutsch](../de/TROUBLESHOOTING.md) | 🇮🇳 [हिन्दी](../in/TROUBLESHOOTING.md) | 🇹🇭 [ไทย](../th/TROUBLESHOOTING.md) | 🇺🇦 [Українська](../uk-UA/TROUBLESHOOTING.md) | 🇸🇦 [العربية](../ar/TROUBLESHOOTING.md) | 🇯🇵 [日本語](../ja/TROUBLESHOOTING.md) | 🇻🇳 [Tiếng Việt](../vi/TROUBLESHOOTING.md) | 🇧🇬 [Български](../bg/TROUBLESHOOTING.md) | 🇩🇰 [Dansk](../da/TROUBLESHOOTING.md) | 🇫🇮 [Suomi](../fi/TROUBLESHOOTING.md) | 🇮🇱 [עברית](../he/TROUBLESHOOTING.md) | 🇭🇺 [Magyar](../hu/TROUBLESHOOTING.md) | 🇮🇩 [Bahasa Indonesia](../id/TROUBLESHOOTING.md) | 🇰🇷 [한국어](../ko/TROUBLESHOOTING.md) | 🇲🇾 [Bahasa Melayu](../ms/TROUBLESHOOTING.md) | 🇳🇱 [Nederlands](../nl/TROUBLESHOOTING.md) | 🇳🇴 [Norsk](../no/TROUBLESHOOTING.md) | 🇵🇹 [Português (Portugal)](../pt/TROUBLESHOOTING.md) | 🇷🇴 [Română](../ro/TROUBLESHOOTING.md) | 🇵🇱 [Polski](../pl/TROUBLESHOOTING.md) | 🇸🇰 [Slovenčina](../sk/TROUBLESHOOTING.md) | 🇸🇪 [Svenska](../sv/TROUBLESHOOTING.md) | 🇵🇭 [Filipino](../phi/TROUBLESHOOTING.md)

Häufige Probleme und Lösungen für OmniRoute.

---

## Schnelle Lösungen

| Problem                                    | Lösung                                                                   |
| ------------------------------------------ | ------------------------------------------------------------------------ | ---------------- |
| Erster Login funktioniert nicht            | Überprüfen Sie `INITIAL_PASSWORD` in `.env` (Standard: `123456`)         |
| Dashboard wird am falschen Port geöffnet   | Legen Sie `PORT=20128` und `NEXT_PUBLIC_BASE_URL=http://localhost:20128` | fest             |
| Keine Anforderungsprotokolle unter `logs/` | Setze `ENABLE_REQUEST_LOGS=true`                                         |
| EACCES: Berechtigung verweigert            | Legen Sie `DATA_DIR=/path/to/writable/dir` fest, um `~/.omniroute`       | zu überschreiben |
| Routing-Strategie wird nicht gespeichert   | Update auf v1.4.11+ (Zod-Schema-Korrektur für Einstellungspersistenz)    |

---

## Anbieterprobleme

### „Sprachmodell hat keine Nachrichten bereitgestellt“

**Ursache:** Anbieterkontingent erschöpft.

**Fix:**

1. Überprüfen Sie den Quoten-Tracker im Dashboard
2. Verwenden Sie eine Kombination mit Fallback-Stufen
3. Wechseln Sie zum günstigeren/kostenlosen Tarif

### Ratenbegrenzung

**Ursache:** Das Abonnementkontingent ist erschöpft.

**Fix:**

- Fallback hinzufügen: `cc/claude-opus-4-6 → glm/glm-4.7 → if/kimi-k2-thinking`
- Verwenden Sie GLM/MiniMax als günstiges Backup

### OAuth-Token abgelaufen

OmniRoute aktualisiert Token automatisch. Wenn die Probleme weiterhin bestehen:

1. Dashboard → Anbieter → Erneut verbinden
2. Löschen Sie die Anbieterverbindung und fügen Sie sie erneut hinzu

---

## Cloud-Probleme

### Cloud-Synchronisierungsfehler

1. Überprüfen Sie, ob `BASE_URL` auf Ihre laufende Instanz verweist (z. B. `http://localhost:20128`).
2. Überprüfen Sie, ob `CLOUD_URL` auf Ihren Cloud-Endpunkt verweist (z. B. `https://omniroute.dev`).
3. Halten Sie die Werte von `NEXT_PUBLIC_*` an den serverseitigen Werten ausgerichtet

### Cloud `stream=false` Gibt 500 zurück

**Symptom:** `Unexpected token 'd'...` am Cloud-Endpunkt für Nicht-Streaming-Anrufe.

**Ursache:** Upstream gibt SSE-Nutzdaten zurück, während der Client JSON erwartet.

**Problemumgehung:** Verwenden Sie `stream=true` für Cloud-Direktaufrufe. Die lokale Laufzeit umfasst SSE→JSON-Fallback.

### Cloud sagt verbunden, aber „Ungültiger API-Schlüssel“

1. Erstellen Sie einen neuen Schlüssel aus dem lokalen Dashboard (`/api/keys`).
2. Führen Sie die Cloud-Synchronisierung aus: Cloud aktivieren → Jetzt synchronisieren
3. Alte/nicht synchronisierte Schlüssel können weiterhin `401` in der Cloud zurückgeben

---

## Docker-Probleme

### CLI-Tool wird als „Nicht installiert“ angezeigt

1. Laufzeitfelder prüfen: `curl http://localhost:20128/api/cli-tools/runtime/codex | jq`
2. Für den portablen Modus: Bildziel `runner-cli` verwenden (gebündelte CLIs)
3. Für den Host-Mount-Modus: Legen Sie `CLI_EXTRA_PATHS` fest und mounten Sie das Host-Bin-Verzeichnis als schreibgeschützt
4. Wenn `installed=true` und `runnable=false`: Binärdatei gefunden wurde, die Integritätsprüfung jedoch fehlgeschlagen ist

### Schnelle Laufzeitvalidierung

```bash
curl -s http://localhost:20128/api/cli-tools/codex-settings | jq '{installed,runnable,commandPath,runtimeMode,reason}'
curl -s http://localhost:20128/api/cli-tools/claude-settings | jq '{installed,runnable,commandPath,runtimeMode,reason}'
curl -s http://localhost:20128/api/cli-tools/openclaw-settings | jq '{installed,runnable,commandPath,runtimeMode,reason}'
```

---

## Kostenprobleme

### Hohe Kosten

1. Überprüfen Sie die Nutzungsstatistiken im Dashboard → Nutzung
2. Primärmodell auf GLM/MiniMax umstellen
3. Nutzen Sie das kostenlose Kontingent (Gemini CLI, iFlow) für unkritische Aufgaben
4. Legen Sie Kostenbudgets pro API-Schlüssel fest: Dashboard → API-Schlüssel → Budget

---

## Debuggen

### Anforderungsprotokolle aktivieren

Legen Sie `ENABLE_REQUEST_LOGS=true` in Ihrer `.env`-Datei fest. Protokolle werden im Verzeichnis `logs/` angezeigt.

### Überprüfen Sie den Zustand des Anbieters

```bash
# Health dashboard
http://localhost:20128/dashboard/health

# API health check
curl http://localhost:20128/api/monitoring/health
```

### Laufzeitspeicher

- Hauptstatus: `${DATA_DIR}/db.json` (Anbieter, Combos, Aliase, Schlüssel, Einstellungen)
- Verwendung: `${DATA_DIR}/usage.json`, `${DATA_DIR}/log.txt`, `${DATA_DIR}/call_logs/`
  – Anforderungsprotokolle: `<repo>/logs/...` (wenn `ENABLE_REQUEST_LOGS=true`)

---

## Probleme mit Leistungsschaltern

### Provider bleibt im OPEN-Zustand hängen

Wenn der Leistungsschalter eines Anbieters OFFEN ist, werden Anfragen blockiert, bis die Abklingzeit abgelaufen ist.

**Fix:**

1. Gehen Sie zu **Dashboard → Einstellungen → Resilienz**
2. Überprüfen Sie die Leistungsschalterkarte des betroffenen Anbieters
3. Klicken Sie auf **Alle zurücksetzen**, um alle Unterbrecher zu löschen, oder warten Sie, bis die Abklingzeit abgelaufen ist
4. Stellen Sie vor dem Zurücksetzen sicher, dass der Anbieter tatsächlich verfügbar ist

### Der Anbieter löst weiterhin den Schutzschalter aus

Wenn ein Anbieter wiederholt in den OPEN-Zustand wechselt:

1. Überprüfen Sie **Dashboard → Health → Provider Health** auf das Fehlermuster
2. Gehen Sie zu **Einstellungen → Ausfallsicherheit → Anbieterprofile** und erhöhen Sie den Fehlerschwellenwert
3. Überprüfen Sie, ob der Anbieter die API-Grenzwerte geändert hat oder eine erneute Authentifizierung erfordert
4. Überprüfen Sie die Latenz-Telemetrie – hohe Latenz kann zu zeitüberschreitungsbedingten Fehlern führen

---

## Probleme mit der Audiotranskription

### Fehler „Nicht unterstütztes Modell“.

– Stellen Sie sicher, dass Sie das richtige Präfix verwenden: `deepgram/nova-3` oder `assemblyai/best`

- Überprüfen Sie, ob der Anbieter unter **Dashboard → Anbieter** verbunden ist.

### Die Transkription ist leer oder schlägt fehl

- Überprüfen Sie die unterstützten Audioformate: `mp3`, `wav`, `m4a`, `flac`, `ogg`, `webm`
- Stellen Sie sicher, dass die Dateigröße innerhalb der Anbietergrenzen liegt (normalerweise < 25 MB).
- Überprüfen Sie die Gültigkeit des API-Schlüssels des Anbieters auf der Anbieterkarte

---

## Übersetzer-Debugging

Verwenden Sie **Dashboard → Übersetzer**, um Formatübersetzungsprobleme zu beheben:

| Modus            | Wann zu verwenden                                                                                                                       |
| ---------------- | --------------------------------------------------------------------------------------------------------------------------------------- |
| **Spielplatz**   | Vergleichen Sie Eingabe-/Ausgabeformate nebeneinander – fügen Sie eine fehlgeschlagene Anfrage ein, um zu sehen, wie sie übersetzt wird |
| **Chat-Tester**  | Senden Sie Live-Nachrichten und überprüfen Sie die vollständige Anfrage-/Antwort-Nutzlast einschließlich Header                         |
| **Prüfstand**    | Führen Sie Stapeltests über Formatkombinationen hinweg durch, um herauszufinden, welche Übersetzungen fehlerhaft sind                   |
| **Live-Monitor** | Beobachten Sie den Anfragefluss in Echtzeit, um zeitweise auftretende Übersetzungsprobleme zu erkennen                                  |

### Häufige Formatprobleme

- **Thinking-Tags werden nicht angezeigt** – Überprüfen Sie, ob der Zielanbieter Thinking und die Einstellung des Thinking-Budgets unterstützt
- **Tool-Aufrufe löschen** – Bei einigen Formatübersetzungen werden möglicherweise nicht unterstützte Felder entfernt. im Playground-Modus überprüfen
- **Systemaufforderung fehlt** – Claude und Gemini gehen unterschiedlich mit Systemaufforderungen um; Überprüfen Sie die Übersetzungsausgabe
- **SDK gibt Rohzeichenfolge anstelle von Objekt zurück** – In Version 1.1.0 behoben: Antwortbereinigung entfernt jetzt nicht standardmäßige Felder (`x_groq`, `usage_breakdown` usw.), die zu OpenAI SDK Pydantic-Validierungsfehlern führen
- **GLM/ERNIE lehnt die Rolle `system` ab** – In Version 1.1.0 behoben: Der Rollennormalisierer führt automatisch Systemnachrichten in Benutzernachrichten für inkompatible Modelle zusammen
- **`developer` Rolle nicht erkannt** – In v1.1.0 behoben: automatisch in `system` für Nicht-OpenAI-Anbieter konvertiert
- **`json_schema` funktioniert nicht mit Gemini** – In v1.1.0 behoben: `response_format` wird jetzt in Geminis `responseMimeType` + `responseSchema` konvertiert

---

## Resilienzeinstellungen

### Automatische Ratenbegrenzung wird nicht ausgelöst

– Die automatische Ratenbegrenzung gilt nur für API-Schlüsselanbieter (nicht OAuth/Abonnement).

- Überprüfen Sie, ob in **Einstellungen → Ausfallsicherheit → Anbieterprofile** die automatische Ratenbegrenzung aktiviert ist
  – Überprüfen Sie, ob der Anbieter Statuscodes `429` oder Header `Retry-After` zurückgibt

### Optimierung des exponentiellen Backoffs

Anbieterprofile unterstützen diese Einstellungen:

- **Basisverzögerung** – Anfängliche Wartezeit nach dem ersten Fehler (Standard: 1 s)
- **Max. Verzögerung** – Maximale Wartezeitobergrenze (Standard: 30 s)
- **Multiplikator** – Wie viel Verzögerung pro aufeinanderfolgendem Fehler erhöht werden soll (Standard: 2x)

### Anti-donnernde Herde

Wenn viele gleichzeitige Anfragen einen Anbieter mit begrenzter Rate treffen, verwendet OmniRoute Mutex + automatische Ratenbegrenzung, um Anfragen zu serialisieren und kaskadierende Fehler zu verhindern. Dies geschieht automatisch für API-Schlüsselanbieter.

---

## Immer noch nicht weitergekommen?

- **GitHub-Probleme**: [github.com/diegosouzapw/OmniRoute/issues](https://github.com/diegosouzapw/OmniRoute/issues)
- **Architektur**: Interne Details finden Sie unter [link](ARCHITECTURE.md)
- **API-Referenz**: Siehe [link](API_REFERENCE.md) für alle Endpunkte
- **Gesundheits-Dashboard**: Überprüfen Sie **Dashboard → Gesundheit** auf den Echtzeit-Systemstatus
- **Übersetzer**: Verwenden Sie **Dashboard → Übersetzer**, um Formatprobleme zu beheben
