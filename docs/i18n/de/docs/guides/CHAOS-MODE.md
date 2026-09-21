# Chaos Mode (Deutsch)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/CHAOS-MODE.md) · 🇪🇹 [am](../../../am/docs/guides/CHAOS-MODE.md) · 🇸🇦 [ar](../../../ar/docs/guides/CHAOS-MODE.md) · 🇦🇿 [az](../../../az/docs/guides/CHAOS-MODE.md) · 🇧🇬 [bg](../../../bg/docs/guides/CHAOS-MODE.md) · 🇧🇩 [bn](../../../bn/docs/guides/CHAOS-MODE.md) · 🇨🇿 [cs](../../../cs/docs/guides/CHAOS-MODE.md) · 🇩🇰 [da](../../../da/docs/guides/CHAOS-MODE.md) · 🇬🇷 [el](../../../el/docs/guides/CHAOS-MODE.md) · 🇪🇸 [es](../../../es/docs/guides/CHAOS-MODE.md) · 🇪🇪 [et](../../../et/docs/guides/CHAOS-MODE.md) · 🇮🇷 [fa](../../../fa/docs/guides/CHAOS-MODE.md) · 🇫🇮 [fi](../../../fi/docs/guides/CHAOS-MODE.md) · 🇫🇷 [fr](../../../fr/docs/guides/CHAOS-MODE.md) · 🇮🇪 [ga](../../../ga/docs/guides/CHAOS-MODE.md) · 🇮🇳 [gu](../../../gu/docs/guides/CHAOS-MODE.md) · 🇳🇬 [ha](../../../ha/docs/guides/CHAOS-MODE.md) · 🇮🇱 [he](../../../he/docs/guides/CHAOS-MODE.md) · 🇮🇳 [hi](../../../hi/docs/guides/CHAOS-MODE.md) · 🇭🇷 [hr](../../../hr/docs/guides/CHAOS-MODE.md) · 🇭🇺 [hu](../../../hu/docs/guides/CHAOS-MODE.md) · 🇦🇲 [hy](../../../hy/docs/guides/CHAOS-MODE.md) · 🇮🇩 [id](../../../id/docs/guides/CHAOS-MODE.md) · 🇳🇬 [ig](../../../ig/docs/guides/CHAOS-MODE.md) · 🇮🇹 [it](../../../it/docs/guides/CHAOS-MODE.md) · 🇯🇵 [ja](../../../ja/docs/guides/CHAOS-MODE.md) · 🇬🇪 [ka](../../../ka/docs/guides/CHAOS-MODE.md) · 🇰🇭 [km](../../../km/docs/guides/CHAOS-MODE.md) · 🇮🇳 [kn](../../../kn/docs/guides/CHAOS-MODE.md) · 🇰🇷 [ko](../../../ko/docs/guides/CHAOS-MODE.md) · 🇱🇹 [lt](../../../lt/docs/guides/CHAOS-MODE.md) · 🇱🇻 [lv](../../../lv/docs/guides/CHAOS-MODE.md) · 🇮🇳 [ml](../../../ml/docs/guides/CHAOS-MODE.md) · 🇮🇳 [mr](../../../mr/docs/guides/CHAOS-MODE.md) · 🇲🇾 [ms](../../../ms/docs/guides/CHAOS-MODE.md) · 🇲🇹 [mt](../../../mt/docs/guides/CHAOS-MODE.md) · 🇲🇲 [my](../../../my/docs/guides/CHAOS-MODE.md) · 🇳🇵 [ne](../../../ne/docs/guides/CHAOS-MODE.md) · 🇳🇱 [nl](../../../nl/docs/guides/CHAOS-MODE.md) · 🇳🇴 [no](../../../no/docs/guides/CHAOS-MODE.md) · 🇮🇳 [or](../../../or/docs/guides/CHAOS-MODE.md) · 🇮🇳 [pa](../../../pa/docs/guides/CHAOS-MODE.md) · 🇵🇭 [phi](../../../phi/docs/guides/CHAOS-MODE.md) · 🇵🇱 [pl](../../../pl/docs/guides/CHAOS-MODE.md) · 🇵🇹 [pt](../../../pt/docs/guides/CHAOS-MODE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/CHAOS-MODE.md) · 🇷🇴 [ro](../../../ro/docs/guides/CHAOS-MODE.md) · 🇷🇺 [ru](../../../ru/docs/guides/CHAOS-MODE.md) · 🇱🇰 [si](../../../si/docs/guides/CHAOS-MODE.md) · 🇸🇰 [sk](../../../sk/docs/guides/CHAOS-MODE.md) · 🇸🇮 [sl](../../../sl/docs/guides/CHAOS-MODE.md) · 🇷🇸 [sr](../../../sr/docs/guides/CHAOS-MODE.md) · 🇸🇪 [sv](../../../sv/docs/guides/CHAOS-MODE.md) · 🇰🇪 [sw](../../../sw/docs/guides/CHAOS-MODE.md) · 🇮🇳 [ta](../../../ta/docs/guides/CHAOS-MODE.md) · 🇮🇳 [te](../../../te/docs/guides/CHAOS-MODE.md) · 🇹🇭 [th](../../../th/docs/guides/CHAOS-MODE.md) · 🇹🇷 [tr](../../../tr/docs/guides/CHAOS-MODE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/CHAOS-MODE.md) · 🇵🇰 [ur](../../../ur/docs/guides/CHAOS-MODE.md) · 🇺🇿 [uz](../../../uz/docs/guides/CHAOS-MODE.md) · 🇻🇳 [vi](../../../vi/docs/guides/CHAOS-MODE.md) · 🇳🇬 [yo](../../../yo/docs/guides/CHAOS-MODE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/CHAOS-MODE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/CHAOS-MODE.md)

---

> **Dashboard:** **Chaos Mode** (Seitenleiste) → `/dashboard/chaos`  
> **API:** `GET` / `PUT` `/api/chaos/config` · `POST /api/chaos/run` (Dashboard-Sitzung) · `POST /api/skills/collect/chaos` (API-Schlüssel)  
> **Quelle:** `src/lib/chaos/chaosExecutor.ts`, `src/lib/chaos/chaosConfig.ts`

Chaos Mode sendet **eine Aufgabe gleichzeitig an mehrere Anbieter** — jeder teilnehmende Anbieter
steuert eine Modellinstanz bei, und Sie erhalten alle Antworten nebeneinander (oder verkettet). Es
handelt sich um eine Oberfläche zur Ausführung mehrerer Modelle, nicht um eine Routing-Strategie:
Ihr normaler `/v1/chat/completions`-Datenverkehr wird davon niemals beeinflusst.

**Begriffsklärung — drei verschiedene Funktionen werden mit „chaos“ im Namen ausgeliefert:**

| Element                   | Beschreibung                                                                                                                               | Dokumentation                                |
| ------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------ | -------------------------------------------- |
| **Chaos Mode**            | Die hier beschriebene Dashboard-Seite samt API: Eine Aufgabe auf viele Anbieter verteilen (parallel oder kollaborativ).                    | Diese Anleitung                              |
| `auto/chaos`              | Eine Auto-Combo-Modell-ID mit Gewichtungen für die Bewertung von Fehlerinjektionen zur Resilienzprüfung. Keine Konfiguration erforderlich. | [AUTO-COMBO.md](../routing/AUTO-COMBO.md)    |
| Chaos-Combo-Konfiguration | Eine persistierte Kombination, bei der `config.chaos.enabled` die Anfrage an ein Panel mit optionalem Bewertungsmodell verteilt (nur API). | `open-sse/services/autoCombo/chaosEngine.ts` |

## Einrichtung

1. Öffnen Sie **Dashboard → Chaos Mode** (`/dashboard/chaos`).
2. **Aktivieren** Sie den Modus — Chaos Mode wird **standardmäßig deaktiviert** ausgeliefert (`enabled: false` in
   `src/lib/chaos/chaosConfig.ts`). Solange er deaktiviert ist, antwortet `POST /api/chaos/run` mit
   `400 — "Chaos Mode ist nicht aktiviert. Aktivieren Sie ihn unter Dashboard → Chaos Mode."`.
3. Wählen Sie die Teilnehmer und Standardwerte aus (werden pro Instanz über den Einstellungsspeicher persistiert):

   | Feld                | Bedeutung                                                           | Standardwert / Grenzwerte              |
   | ------------------- | ------------------------------------------------------------------- | -------------------------------------- |
   | `enabled`           | Hauptschalter                                                       | `false`                                |
   | `defaultMode`       | `parallel` oder `collaborative` (siehe unten)                       | `parallel`                             |
   | `providerOverrides` | Teilnahme je Anbieter (`providerId`, optional `modelId`, `enabled`) | leer = jeder aktive Anbieter, max. 200 |
   | `systemPrompt`      | Überschreibung für den integrierten Chaos-System-Prompt             | optional, max. 10.000 Zeichen          |
   | `timeoutMs`         | Maximale Dauer pro Modellaufruf                                     | `120000` (5.000–600.000)               |
   | `maxTokens`         | `max_tokens` pro Modellaufruf                                       | `4096` (256–128.000)                   |

4. Führen Sie **einen Test direkt auf der Seite** aus — der Ergebnisbereich zeigt die Antwort,
   den Status und die Dauer jedes Anbieters an.

## Ausführungsmodi

- **`parallel`** — jedes Modell erhält gleichzeitig dieselbe Aufgabe; Sie erhalten alle Antworten
  unabhängig voneinander.
- **`collaborative`** — die Modelle werden **in einer Kette** ausgeführt: Jedes Modell sieht die Ausgabe des
  vorherigen Modells und wird gebeten, sie zu verfeinern, zu erweitern, zu kritisieren oder eine Alternative anzubieten. Das Feld `summary`
  der Antwort verkettet die erfolgreichen Ausgaben in der Reihenfolge der Kette (parallele Ausführungen haben kein `summary`).

## API

### `POST /api/chaos/run` — Dashboard-Sitzung

Cookie-authentifiziert (die Verwaltungssitzung — siehe
[MANAGEMENT-AUTH.md](MANAGEMENT-AUTH.md)); wird von der Dashboard-Seite verwendet.

```jsonc
// Anfragekörper
{
  "task": "Compare approaches to X", // erforderlich
  "providers": ["glm", "kimi"], // optionaler Filter
  "mode": "parallel", // optional — überschreibt defaultMode
  "systemPrompt": "…", // optionale Überschreibung
  "maxTokens": 4096, // optionale Überschreibung
}
```

### `POST /api/skills/collect/chaos` — API-Schlüssel

Bearer-Token-Variante für externe Aufrufer. Der Schlüssel muss über die **Chaos-Mode-Berechtigung**
(`chaosModeEnabled`) verfügen, die **standardmäßig deaktiviert** ist — aktivieren Sie sie für jeden Schlüssel unter
**Dashboard → API Manager → Schlüssel bearbeiten → Berechtigungen → Chaos Mode**. Derselbe Anfragekörper wie oben.

```bash
curl -X POST http://localhost:20128/api/skills/collect/chaos \
  -H "Authorization: Bearer $OMNIROUTE_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"task":"Compare approaches to X","mode":"parallel"}'
```

Beide Endpunkte geben dieselbe Struktur zurück:

```jsonc
{
  "task": "…",
  "mode": "parallel",
  "startedAt": "2026-09-01T00:00:00.000Z",
  "totalProviders": 3,
  "totalResults": 3,
  "models": [
    {
      "providerId": "glm",
      "providerName": "GLM",
      "modelId": "glm-4.7",
      "status": "success",
      "content": "…",
      "durationMs": 3210,
    },
  ],
  "summary": "…", // nur im kollaborativen Modus
}
```

## Fehlerbehebung

- **`400 Chaos Mode is not enabled`** — siehe Schritt 2 oben: Der globale Schalter ist deaktiviert.
- **Der API-Schlüssel wird bei `/api/skills/collect/chaos` abgelehnt** — dem Schlüssel fehlt die schlüsselspezifische
  Berechtigung `chaosModeEnabled` (standardmäßig deaktiviert; dies ist eine Einstellung, kein Fehler).
- **Ein erwarteter Anbieter fehlt in den Ergebnissen** — überprüfen Sie `providerOverrides` auf der
  Chaos-Mode-Seite (eine deaktivierte Überschreibung schließt ihn aus) und ob die Anbieterverbindung
  aktiv ist.
