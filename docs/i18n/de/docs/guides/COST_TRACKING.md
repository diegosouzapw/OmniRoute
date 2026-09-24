# Cost & Spend Tracking (Deutsch)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/COST_TRACKING.md) · 🇪🇹 [am](../../../am/docs/guides/COST_TRACKING.md) · 🇸🇦 [ar](../../../ar/docs/guides/COST_TRACKING.md) · 🇦🇿 [az](../../../az/docs/guides/COST_TRACKING.md) · 🇧🇬 [bg](../../../bg/docs/guides/COST_TRACKING.md) · 🇧🇩 [bn](../../../bn/docs/guides/COST_TRACKING.md) · 🇧🇦 [bs](../../../bs/docs/guides/COST_TRACKING.md) · 🇨🇿 [cs](../../../cs/docs/guides/COST_TRACKING.md) · 🇩🇰 [da](../../../da/docs/guides/COST_TRACKING.md) · 🇬🇷 [el](../../../el/docs/guides/COST_TRACKING.md) · 🇪🇸 [es](../../../es/docs/guides/COST_TRACKING.md) · 🇪🇪 [et](../../../et/docs/guides/COST_TRACKING.md) · 🇮🇷 [fa](../../../fa/docs/guides/COST_TRACKING.md) · 🇫🇮 [fi](../../../fi/docs/guides/COST_TRACKING.md) · 🇫🇷 [fr](../../../fr/docs/guides/COST_TRACKING.md) · 🇮🇪 [ga](../../../ga/docs/guides/COST_TRACKING.md) · 🇮🇳 [gu](../../../gu/docs/guides/COST_TRACKING.md) · 🇳🇬 [ha](../../../ha/docs/guides/COST_TRACKING.md) · 🇮🇱 [he](../../../he/docs/guides/COST_TRACKING.md) · 🇮🇳 [hi](../../../hi/docs/guides/COST_TRACKING.md) · 🇭🇷 [hr](../../../hr/docs/guides/COST_TRACKING.md) · 🇭🇺 [hu](../../../hu/docs/guides/COST_TRACKING.md) · 🇦🇲 [hy](../../../hy/docs/guides/COST_TRACKING.md) · 🇮🇩 [id](../../../id/docs/guides/COST_TRACKING.md) · 🇳🇬 [ig](../../../ig/docs/guides/COST_TRACKING.md) · 🇮🇹 [it](../../../it/docs/guides/COST_TRACKING.md) · 🇯🇵 [ja](../../../ja/docs/guides/COST_TRACKING.md) · 🇬🇪 [ka](../../../ka/docs/guides/COST_TRACKING.md) · 🇰🇭 [km](../../../km/docs/guides/COST_TRACKING.md) · 🇮🇳 [kn](../../../kn/docs/guides/COST_TRACKING.md) · 🇰🇷 [ko](../../../ko/docs/guides/COST_TRACKING.md) · 🇱🇹 [lt](../../../lt/docs/guides/COST_TRACKING.md) · 🇱🇻 [lv](../../../lv/docs/guides/COST_TRACKING.md) · 🇮🇳 [ml](../../../ml/docs/guides/COST_TRACKING.md) · 🇮🇳 [mr](../../../mr/docs/guides/COST_TRACKING.md) · 🇲🇾 [ms](../../../ms/docs/guides/COST_TRACKING.md) · 🇲🇹 [mt](../../../mt/docs/guides/COST_TRACKING.md) · 🇲🇲 [my](../../../my/docs/guides/COST_TRACKING.md) · 🇳🇵 [ne](../../../ne/docs/guides/COST_TRACKING.md) · 🇳🇱 [nl](../../../nl/docs/guides/COST_TRACKING.md) · 🇳🇴 [no](../../../no/docs/guides/COST_TRACKING.md) · 🇮🇳 [or](../../../or/docs/guides/COST_TRACKING.md) · 🇮🇳 [pa](../../../pa/docs/guides/COST_TRACKING.md) · 🇵🇭 [phi](../../../phi/docs/guides/COST_TRACKING.md) · 🇵🇱 [pl](../../../pl/docs/guides/COST_TRACKING.md) · 🇵🇹 [pt](../../../pt/docs/guides/COST_TRACKING.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/COST_TRACKING.md) · 🇷🇴 [ro](../../../ro/docs/guides/COST_TRACKING.md) · 🇷🇺 [ru](../../../ru/docs/guides/COST_TRACKING.md) · 🇱🇰 [si](../../../si/docs/guides/COST_TRACKING.md) · 🇸🇰 [sk](../../../sk/docs/guides/COST_TRACKING.md) · 🇸🇮 [sl](../../../sl/docs/guides/COST_TRACKING.md) · 🇷🇸 [sr](../../../sr/docs/guides/COST_TRACKING.md) · 🇸🇪 [sv](../../../sv/docs/guides/COST_TRACKING.md) · 🇰🇪 [sw](../../../sw/docs/guides/COST_TRACKING.md) · 🇮🇳 [ta](../../../ta/docs/guides/COST_TRACKING.md) · 🇮🇳 [te](../../../te/docs/guides/COST_TRACKING.md) · 🇹🇭 [th](../../../th/docs/guides/COST_TRACKING.md) · 🇹🇷 [tr](../../../tr/docs/guides/COST_TRACKING.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/COST_TRACKING.md) · 🇵🇰 [ur](../../../ur/docs/guides/COST_TRACKING.md) · 🇺🇿 [uz](../../../uz/docs/guides/COST_TRACKING.md) · 🇻🇳 [vi](../../../vi/docs/guides/COST_TRACKING.md) · 🇳🇬 [yo](../../../yo/docs/guides/COST_TRACKING.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/COST_TRACKING.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/COST_TRACKING.md)

---

Wie OmniRoute die Kosten jeder Anfrage schätzt, erfasst und ausgibt — und warum die
Zahl im Dashboard ein **Einsparungstracker** und keine Rechnung ist.

Siehe auch: [Benutzerhandbuch](./USER_GUIDE.md) · [Funktionsübersicht](./FEATURES.md)

---

## Was es ist (und was nicht)

OmniRoute ordnet jeder Vervollständigung Kosten in USD pro Anfrage zu, indem die Anzahl
der Token mit den Preissätzen eines Modells multipliziert wird. Diese Zahlen bilden die
Grundlage für das **Kosten**-Dashboard, die CLI-Befehle `omniroute cost` /
`omniroute usage`, CSV-/JSON-Exporte und Budgets pro API-Schlüssel.

> **Die „Kosten“ im Dashboard sind ein Einsparungstracker und keine Rechnung.** OmniRoute
> stellt Ihnen niemals etwas in Rechnung — es leitet Ihre Anfragen an Anbieter weiter,
> die Sie bereits verbunden haben (Ihre eigenen Abonnements, kostenlosen Kontingente und
> API-Schlüssel). Wenn „Gesamtkosten von $290“ ausschließlich durch kostenlose Modelle
> entstanden sind, bedeutet das, dass Sie ungefähr **$290 _nicht_ an eine kostenpflichtige
> API gezahlt haben**. Der Betrag ist eine _Schätzung_ dessen, was derselbe Datenverkehr
> zu den regulären Listenpreisen gekostet hätte. So können Sie erkennen, worauf sich Ihre
> Nutzung konzentriert und wie viel Sie durch die Weiterleitung an günstigere oder
> kostenlose Anbieter einsparen.

Diese Einordnung wird direkt in der [README](../../README.md) des Projekts erläutert
(„die ‚Kosten‘ im Dashboard sind ein Einsparungstracker und keine Rechnung“).

Da es sich bei der Zahl um eine Schätzung handelt:

- Sie hängt von der Preistabelle ab, die OmniRoute für jedes Modell verwendet. Ein Modell
  ohne Preiseintrag verursacht Kosten von `0` (im Explorer wird es als Zeile
  „Legacy / Kostenlos“ angezeigt).
- Auch Datenverkehr über kostenlose Kontingente und Abonnements verursacht _geschätzte_
  Kosten — dies ist der Betrag, den Sie einsparen, und kein geschuldeter Betrag.

---

## Wie Kosten geschätzt werden

### Die Preisquelle

Die Kosten stammen aus einer Preistabelle, die gemäß der folgenden Prioritätsreihenfolge
ermittelt wird ([`src/lib/pricingSync.ts`](../../src/lib/pricingSync.ts)):

1. **Benutzerdefinierte Überschreibungen** — Preise, die Sie im Dashboard oder über
   `PATCH /api/pricing` festlegen.
2. **Synchronisierte externe Preise** — werden bei aktivierter Synchronisierung aus der
   öffentlichen Datei `model_prices_and_context_window.json` von LiteLLM abgerufen
   (und in einem separaten `pricing_synced`-Namensraum gespeichert, sodass Ihre
   Überschreibungen niemals ersetzt werden).
3. **Fest codierte Standardwerte** — werden mit OmniRoute ausgeliefert.

Die externe Preissynchronisierung ist **optional** und standardmäßig deaktiviert.
Relevante Umgebungsvariablen (siehe [`.env.example`](../../.env.example)):

| Umgebungsvariable       | Standardwert | Zweck                                                                  |
| ----------------------- | ------------ | ---------------------------------------------------------------------- |
| `PRICING_SYNC_ENABLED`  | `false`      | Aktiviert beim Start die LiteLLM-Preissynchronisierung im Hintergrund. |
| `PRICING_SYNC_INTERVAL` | `86400`      | Synchronisierungsintervall in **Sekunden** (standardmäßig täglich).    |
| `PRICING_SYNC_SOURCES`  | `litellm`    | Kommagetrennte Quellenliste (derzeit wird nur `litellm` unterstützt).  |

### Die Kostenformel

Die Kosten werden pro Anfrage anhand der Token-Anzahl und der Preise pro Million Token in
[`src/lib/usage/costCalculator.ts`](../../src/lib/usage/costCalculator.ts)
(`computeCostFromPricing` / `calculateCost`) berechnet:

- **Eingabe-Token** (abzüglich Cache-Lese- und Cache-Erstellungs-Token) × `input`-Preis.
- **Cache-Lese-Token** × `cached`-Preis (greift ersatzweise auf den Eingabepreis zurück).
- **Cache-Erstellungs-Token** × `cache_creation`-Preis (greift ersatzweise auf den
  Eingabepreis zurück).
- **Ausgabe-Token** × `output`-Preis.
- **Reasoning-Token** × `reasoning`-Preis (greift ersatzweise auf den Ausgabepreis zurück).

Alle Preise werden als USD pro 1.000.000 Token interpretiert. Für die Codex-Dienststufen
„fast“/„priority“ oder „flex“ gilt ein Kostenmultiplikator
(`getCodexFastCostMultiplier`) — bei „flex“ wird beispielsweise ein Token-Rabatt von 50 %
berechnet, der im Dashboard als **Flex-Einsparungen** angezeigt wird.

Modellnamen werden zunächst normalisiert (Anbieterpfadpräfixe wie `openai/` oder
`accounts/fireworks/models/` werden entfernt), sodass auch historische Zeilen weiterhin
einem Preis zugeordnet werden können.

### Wie Ausgaben erfasst werden

- Die Kosten pro Anfrage werden nach der Antwort berechnet und nach dem
  Fire-and-forget-Prinzip erfasst, sodass dem Client niemals zusätzliche Latenz
  entsteht. Der Verbrauch des gemeinsamen Kontingents wird für den nächsten Durchlauf
  der Ereignisschleife über
  [`src/lib/quota/spendRecorder.ts`](../../src/lib/quota/spendRecorder.ts) eingeplant.
- Ausgaben für API-Schlüssel werden gepuffert und vom
  [`SpendBatchWriter`](../../src/lib/spend/batchWriter.ts) stapelweise geschrieben
  (standardmäßig alle 60 Sekunden, Puffer für 1.000 Einträge). Anpassbar über:

  | Umgebungsvariable                   | Standardwert | Zweck                                                   |
  | ----------------------------------- | ------------ | ------------------------------------------------------- |
  | `OMNIROUTE_SPEND_FLUSH_INTERVAL_MS` | `60000`      | Schreibintervall in Millisekunden.                      |
  | `OMNIROUTE_SPEND_MAX_BUFFER_SIZE`   | `1000`       | Maximale Anzahl gepufferter Einträge vor dem Schreiben. |

Die Kostenangaben des Dashboards werden **nicht** aus einem pro Zeile gespeicherten
Dollarbetrag ausgelesen — sie werden bei jeder Ausführung des Analyse-Endpunkts anhand
der Token-Anzahlen und der aktuellen Preistabelle dynamisch neu berechnet. Das bedeutet,
dass die Korrektur eines falschen Preises (und eine erneute Synchronisierung) die
historischen Kostenschätzungen rückwirkend aktualisiert.

---

## Dashboard: die Kostenseite

Die Seite **Kosten** befindet sich unter `/dashboard/costs`
(`src/app/(dashboard)/dashboard/costs/`).
Ihre Hauptansicht ist der Tab **Kostenübersicht**
(`src/app/(dashboard)/dashboard/costs/CostOverviewTab.tsx`),
der alle Daten über `GET /api/usage/analytics` lädt.

Angezeigte Inhalte:

- **Ausgabenkacheln** — geschätzte Ausgaben für _Heute (1d)_, _7d_, _30d_ und den ausgewählten
  Zeitraum. Zeitraumsauswahl: `7d`, `30d`, `90d`, `all`.
- **Hauptmetriken** — Anfragen im Zeitraum, aktive Anbieter, aktive Modelle, durchschnittliche
  Kosten pro Anfrage.
- **Kosten-Explorer** — eine sortier- und filterbare Tabelle, gruppiert nach **Anbieter**, **Modell**,
  **API-Schlüssel**, **Konto** oder **Service-Tarif**, mit Kosten, Anfragen, Tokens, durchschnittlichen
  Kosten pro Anfrage und prozentualem Anteil an den Gesamtkosten.
- **Token-Nutzung** — Gesamt-, Eingabe- und Ausgabe-Tokens sowie das Verhältnis von Eingabe zu Ausgabe.
- **Routing-Effizienz** — Anzahl der Fallbacks, Fallback-Rate und Abdeckung der angeforderten Modelle.
- **Monatliche Prognose** — prognostiziert die Ausgaben bis zum Monatsende anhand des jüngsten Tagesdurchschnitts.
- **Zeitraumvergleich** — prozentuale Veränderung zwischen der ersten und zweiten Hälfte des Zeitraums.
- **Diagramme** — täglicher Kostenverlauf, Anbieteranteil (Kreisdiagramm), Top-Anbieter, Top-Modelle, Kosten
  nach API-Schlüssel, Kosten nach Konto, wöchentliches Nutzungsmuster und eine Aktivitäts-Heatmap.
- **Export** — lädt den aktuellen Zeitraum als **CSV** oder **JSON** herunter (die Schaltflächen werden angezeigt,
  sobald Kostendaten ungleich null vorhanden sind).

Wenn kein Traffic mit Preisinformationen vorhanden ist, zeigen Zeilen anstelle von `$0` die Kennzeichnung „Legacy / Kostenlos“ an,
entsprechend dem Modell des Einsparungs-Trackers.

### Zugehörige Kosten-Unterseiten

Der Kostenbereich enthält außerdem folgende Seiten (alle unter `/dashboard/costs/`):

- **Preisgestaltung** (`/dashboard/costs/pricing`) — Preise pro Modell anzeigen und überschreiben (rendert
  den gemeinsamen Preisgestaltungs-Tab).
- **Budget** (`/dashboard/costs/budget`) — Ausgabenlimits pro Geltungsbereich festlegen (rendert den gemeinsamen
  Budget-Tab).
- **Kontingentfreigabe** (`/dashboard/costs/quota-share`) — gemeinsam genutzte Kontingentpools und Ansichten
  der Verbrauchsrate.

---

## API-Endpunkte

Alle diese Endpunkte erfordern eine Management-Authentifizierung (Loopback/JWT, über `requireManagementAuth`), sofern
nicht anders angegeben.

### Nutzungs- und Kostenanalysen

| Methode | Endpunkt                 | Zweck                                                                                                                                                                                       |
| ------- | ------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `GET`   | `/api/usage/analytics`   | Vollständige Kosten-/Nutzungsanalyse: Zusammenfassung, täglicher Verlauf, nach Anbieter/Modell/API-Schlüssel/Konto/Tarif. Abfrage: `range`, `startDate`, `endDate`, `apiKeyIds`, `presets`. |
| `GET`   | `/api/usage/utilization` | Kontingentauslastung pro Anbieter im Zeitverlauf. Abfrage: `range` (`1h`/`24h`/`7d`/`30d`), `provider`.                                                                                     |
| `GET`   | `/api/usage/history`     | Unverarbeitete Zeilen des Nutzungsverlaufs.                                                                                                                                                 |
| `GET`   | `/api/usage/call-logs`   | Aufrufprotokolle pro Anfrage (Modell, Tokens, Kosten, Latenz, Status).                                                                                                                      |
| `GET`   | `/api/usage/quota`       | Status des Anbieterkontingents.                                                                                                                                                             |
| `GET`   | `/api/usage/proxy-logs`  | Proxy-Anfrageprotokolle.                                                                                                                                                                    |

### Budgets

| Methode | Endpunkt                 | Zweck                                                                                                       |
| ------- | ------------------------ | ----------------------------------------------------------------------------------------------------------- |
| `GET`   | `/api/usage/budget`      | Kostenzusammenfassung und Budgetprüfung für einen API-Schlüssel (Abfrageparameter `apiKeyId` erforderlich). |
| `POST`  | `/api/usage/budget`      | Tägliche/wöchentliche/monatliche USD-Limits und Warnschwelle für einen API-Schlüssel festlegen.             |
| `GET`   | `/api/usage/budget/bulk` | Zusammenfassende Budgetinformationen für mehrere API-Schlüssel.                                             |

> Die Budget-API ist auf einzelne **API-Schlüssel** (`apiKeyId`) beschränkt. Die von
> `GET /api/usage/budget` zurückgegebenen Limits umfassen `dailyLimitUsd`, `weeklyLimitUsd`, `monthlyLimitUsd`,
> einen `warningThreshold` und die laufenden Summen (`totalCostToday`, `totalCostMonth`, …).

### Preisgestaltung

| Methode  | Endpunkt                | Zweck                                                                                                                                                 |
| -------- | ----------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------- |
| `GET`    | `/api/pricing`          | Aktuelle zusammengeführte Preisgestaltung (Benutzer + synchronisiert + Standardwerte). Mit `?includeSources=1` wird die Quelle pro Eintrag angezeigt. |
| `PATCH`  | `/api/pricing`          | Preisgestaltung für `{ provider: { model: { input, output, cached, … } } }` überschreiben.                                                            |
| `DELETE` | `/api/pricing`          | Preisgestaltung auf Standardwerte zurücksetzen (optional eingeschränkt durch `?provider=&model=`).                                                    |
| `GET`    | `/api/pricing/defaults` | Standardmäßige Fallback-Tarife pro 1 Mio. anzeigen.                                                                                                   |
| `GET`    | `/api/pricing/models`   | Nach Modell aufgeschlüsselte Preisgestaltung.                                                                                                         |
| `POST`   | `/api/pricing/sync`     | Eine manuelle Synchronisierung aus externen Quellen (LiteLLM) auslösen.                                                                               |
| `GET`    | `/api/pricing/sync`     | Aktueller Synchronisierungsstatus.                                                                                                                    |
| `DELETE` | `/api/pricing/sync`     | Alle synchronisierten Preisdaten löschen.                                                                                                             |

### Weitere kostenrelevante Endpunkte

| Methode | Endpunkt                      | Zweck                                                                                                       |
| ------- | ----------------------------- | ----------------------------------------------------------------------------------------------------------- |
| `GET`   | `/api/free-tier/summary`      | Token-Gesamtmenge für kostenlose Modelle, in diesem Monat genutzt und verbleibendes kostenloses Kontingent. |
| `GET`   | `/api/quota/pools/[id]/usage` | Nutzung eines Pools mit gemeinsamem Kontingent.                                                             |

---

## CLI

Die CLI von OmniRoute stellt Befehle für Kosten, Nutzung und Preise bereit (registriert in
[`bin/cli/commands/registry.mjs`](../../bin/cli/commands/registry.mjs)).

### `omniroute cost`

Ein nach `/api/usage/analytics` aggregierter Kostenbericht.

```bash
omniroute cost                          # letzte 30 Tage, nach Anbieter gruppiert
omniroute cost --period 7d              # letzte 7 Tage
omniroute cost --group-by model         # gruppieren nach provider | model | combo | api-key | day
omniroute cost --since 2026-06-01 --until 2026-06-13
omniroute cost --api-key <key> --limit 50
```

Spalten: Gruppe, Anfragen, Eingabe-/Ausgabe-Token, Kosten (USD) und prozentualer Anteil an der Gesamtsumme. Am Ende
wird eine Gesamtsummenzeile ausgegeben (unterdrückt mit `--quiet` oder `--output json`).

### `omniroute usage`

```bash
omniroute usage analytics --period 30d [--provider <id>]   # Kostenzusammenfassung pro Anbieter
omniroute usage logs [--limit 100] [--follow] [--api-key <k>] [--search <q>]
omniroute usage quota [--provider <id>] [--check]
omniroute usage utilization [--api-key <k>]
omniroute usage history [--limit 100]
omniroute usage proxy-logs [--limit 100]

# Budgets
omniroute usage budget list
omniroute usage budget get [scope]
omniroute usage budget set <amount> [--scope global] [--period monthly]
omniroute usage budget reset [scope]
```

### `omniroute pricing`

```bash
omniroute pricing list [--provider <p>] [--model <m>] [--limit 200]
omniroute pricing get <model>
omniroute pricing sync [--provider <p>] [--force]   # POST /api/pricing/sync
omniroute pricing diff [--model <m>]
omniroute pricing defaults show
omniroute pricing defaults set [--input <p>] [--output <p>] [--cache-read <p>] [--cache-write <p>]
```

> `pricing defaults show` liest `GET /api/pricing/defaults`. Um stattdessen die Preise einzelner Modelle
> zu bearbeiten, verwenden Sie die Dashboard-Seite **Pricing** oder `PATCH /api/pricing`.

---

## Fehlerbehebung

- **Alle Kosten werden als $0 / „Legacy / Free“ angezeigt.** Für die verwendeten Modelle ist kein Preiseintrag vorhanden.
  Aktivieren Sie die externe Synchronisierung (`PRICING_SYNC_ENABLED=true`) und führen Sie `omniroute pricing sync` aus oder
  legen Sie die Preise manuell über die Seite „Pricing“ / `PATCH /api/pricing` fest.
- **Ein historisches Modell hat einen falschen Preis.** Korrigieren Sie den Preis (durch Überschreiben oder erneutes Synchronisieren) – die Kosten werden
  bei jedem Abruf der Analysedaten anhand der Token-Anzahl neu berechnet, sodass die Schätzungen rückwirkend aktualisiert werden.
- **Die Ausgaben hinken den Echtzeitdaten hinterher.** Die Ausgaben pro Schlüssel werden gebündelt verarbeitet; verringern Sie
  `OMNIROUTE_SPEND_FLUSH_INTERVAL_MS`, wenn Sie aktuellere Zahlen benötigen.

---

Informationen dazu, wie sich dies in das übergeordnete Dashboard einfügt, finden Sie im [Benutzerhandbuch](./USER_GUIDE.md) und
in der [Funktionsübersicht](./FEATURES.md).
