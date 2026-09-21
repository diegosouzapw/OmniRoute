# Admission lanes (#9654) — two lane systems, what gates each, where each reports (Deutsch)

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/admission-lanes.md) · 🇪🇹 [am](../../../am/docs/architecture/admission-lanes.md) · 🇸🇦 [ar](../../../ar/docs/architecture/admission-lanes.md) · 🇦🇿 [az](../../../az/docs/architecture/admission-lanes.md) · 🇧🇬 [bg](../../../bg/docs/architecture/admission-lanes.md) · 🇧🇩 [bn](../../../bn/docs/architecture/admission-lanes.md) · 🇨🇿 [cs](../../../cs/docs/architecture/admission-lanes.md) · 🇩🇰 [da](../../../da/docs/architecture/admission-lanes.md) · 🇬🇷 [el](../../../el/docs/architecture/admission-lanes.md) · 🇪🇸 [es](../../../es/docs/architecture/admission-lanes.md) · 🇪🇪 [et](../../../et/docs/architecture/admission-lanes.md) · 🇮🇷 [fa](../../../fa/docs/architecture/admission-lanes.md) · 🇫🇮 [fi](../../../fi/docs/architecture/admission-lanes.md) · 🇫🇷 [fr](../../../fr/docs/architecture/admission-lanes.md) · 🇮🇪 [ga](../../../ga/docs/architecture/admission-lanes.md) · 🇮🇳 [gu](../../../gu/docs/architecture/admission-lanes.md) · 🇳🇬 [ha](../../../ha/docs/architecture/admission-lanes.md) · 🇮🇱 [he](../../../he/docs/architecture/admission-lanes.md) · 🇮🇳 [hi](../../../hi/docs/architecture/admission-lanes.md) · 🇭🇷 [hr](../../../hr/docs/architecture/admission-lanes.md) · 🇭🇺 [hu](../../../hu/docs/architecture/admission-lanes.md) · 🇦🇲 [hy](../../../hy/docs/architecture/admission-lanes.md) · 🇮🇩 [id](../../../id/docs/architecture/admission-lanes.md) · 🇳🇬 [ig](../../../ig/docs/architecture/admission-lanes.md) · 🇮🇹 [it](../../../it/docs/architecture/admission-lanes.md) · 🇯🇵 [ja](../../../ja/docs/architecture/admission-lanes.md) · 🇬🇪 [ka](../../../ka/docs/architecture/admission-lanes.md) · 🇰🇭 [km](../../../km/docs/architecture/admission-lanes.md) · 🇮🇳 [kn](../../../kn/docs/architecture/admission-lanes.md) · 🇰🇷 [ko](../../../ko/docs/architecture/admission-lanes.md) · 🇱🇹 [lt](../../../lt/docs/architecture/admission-lanes.md) · 🇱🇻 [lv](../../../lv/docs/architecture/admission-lanes.md) · 🇮🇳 [ml](../../../ml/docs/architecture/admission-lanes.md) · 🇮🇳 [mr](../../../mr/docs/architecture/admission-lanes.md) · 🇲🇾 [ms](../../../ms/docs/architecture/admission-lanes.md) · 🇲🇹 [mt](../../../mt/docs/architecture/admission-lanes.md) · 🇲🇲 [my](../../../my/docs/architecture/admission-lanes.md) · 🇳🇵 [ne](../../../ne/docs/architecture/admission-lanes.md) · 🇳🇱 [nl](../../../nl/docs/architecture/admission-lanes.md) · 🇳🇴 [no](../../../no/docs/architecture/admission-lanes.md) · 🇮🇳 [or](../../../or/docs/architecture/admission-lanes.md) · 🇮🇳 [pa](../../../pa/docs/architecture/admission-lanes.md) · 🇵🇭 [phi](../../../phi/docs/architecture/admission-lanes.md) · 🇵🇱 [pl](../../../pl/docs/architecture/admission-lanes.md) · 🇵🇹 [pt](../../../pt/docs/architecture/admission-lanes.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/admission-lanes.md) · 🇷🇴 [ro](../../../ro/docs/architecture/admission-lanes.md) · 🇷🇺 [ru](../../../ru/docs/architecture/admission-lanes.md) · 🇱🇰 [si](../../../si/docs/architecture/admission-lanes.md) · 🇸🇰 [sk](../../../sk/docs/architecture/admission-lanes.md) · 🇸🇮 [sl](../../../sl/docs/architecture/admission-lanes.md) · 🇷🇸 [sr](../../../sr/docs/architecture/admission-lanes.md) · 🇸🇪 [sv](../../../sv/docs/architecture/admission-lanes.md) · 🇰🇪 [sw](../../../sw/docs/architecture/admission-lanes.md) · 🇮🇳 [ta](../../../ta/docs/architecture/admission-lanes.md) · 🇮🇳 [te](../../../te/docs/architecture/admission-lanes.md) · 🇹🇭 [th](../../../th/docs/architecture/admission-lanes.md) · 🇹🇷 [tr](../../../tr/docs/architecture/admission-lanes.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/admission-lanes.md) · 🇵🇰 [ur](../../../ur/docs/architecture/admission-lanes.md) · 🇺🇿 [uz](../../../uz/docs/architecture/admission-lanes.md) · 🇻🇳 [vi](../../../vi/docs/architecture/admission-lanes.md) · 🇳🇬 [yo](../../../yo/docs/architecture/admission-lanes.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/admission-lanes.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/admission-lanes.md)

---

OmniRoute verfügt über **zwei** prozesslokale Lane-Systeme mit unterschiedlichen Geltungsbereichen. Sie ergänzen sich; Betreiber sollten wissen, welches davon sie gerade betrachten.

## 1. Prozessweite Zulassungssteuerung auf Byte-Ebene (`chatBodyAdmission.ts`)

- **Geltungsbereich:** der Pfad für gepufferte Bodies/Heap bei `POST /v1/chat/completions`,
  `/v1/messages`, `/v1/responses` und den anderen Chat-ähnlichen Routen. Schützt
  vor Heap-Verstärkung durch große Bodies von Coding-Agenten (#4380).
- **Ein einziger prozessglobaler Controller, keine Lanes pro Schlüssel (#10110).** Jeder API-Schlüssel
  (gehasht) bzw. jede `anonymous`-Sitzung wird gegen dasselbe gemeinsame Budget
  zugelassen — die gehashte Sitzungs-ID wird AUSSCHLIESSLICH als Fairness-Schlüssel für die Planung verwendet
  (Round-Robin-Verteilung unter den Wartenden), niemals als Kapazitäts-Shard. Eine frühere Version dieser
  Dokumentation beschrieb Lanes pro Schlüssel mit unabhängiger Kapazität; dieses Modell wurde
  in #10110 entfernt, weil nicht authentifizierte, gefälschte Anmeldedaten damit
  die prozessweite Grenze vervielfachen konnten.
- **Gate (#503-fanout): ein automatisch abgeleitetes BYTE-Budget für die Aufnahme, keine feste Anzahl von
  Anfragen.** Die veraltete Begrenzung `CHAT_MAX_HEAVY_IN_FLIGHT` für die Anzahl von Anfragen (vor
  dieser Korrektur standardmäßig `1`) reduzierte den Fan-out von Coding-Agenten (mehrere Subagenten/CLIs,
  Bodies regelmäßig > 256 KB) auf eine effektive Parallelität von ~1, was
  unter völlig normaler Last zu 503-Fehlern führte. Sie greift jetzt nur, wenn ein Betreiber
  `OMNIROUTE_CHAT_MAX_HEAVY_IN_FLIGHT` ausdrücklich festlegt. Bleibt die Variable ungesetzt, wird die Zulassung stattdessen
  durch `OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES` gesteuert — ein Budget, das automatisch aus der
  tatsächlichen Speicherobergrenze des Prozesses abgeleitet wird (`src/shared/middleware/admissionBudget.ts`):
  25 % des kleineren Werts aus dem V8-Heap-Limit und einem etwaigen cgroup-/Container-Limit,
  geteilt durch einen Faktor von 8 für die vorübergehende Verstärkung und begrenzt auf einen Bereich zwischen 8 MiB und
  2 GiB. Explizite Überschreibungen verwenden dieselben Grenzen. Dadurch skaliert es sich ohne
  Anpassung von Umgebungsvariablen selbstständig von einem 512-MB-Container bis zu einem 32-GB-Desktop. Ein Body, der nicht
  in das effektive Budget passt, wird sofort mit `413 body_exceeds_budget` abgelehnt;
  nur Konkurrenz zwischen einzeln verarbeitbaren Bodies gelangt in die begrenzte
  Fairness-Warteschlange. Ein aktiver, mehrere Signale auswertender Ressourcenbelastungs-Tracker (V8-Heap-Verhältnis,
  cgroup, PSI, OOM-Ereignisse — `open-sse/utils/resourcePressurePolicy.ts`) verkürzt
  unter `high`-Belastung die begrenzte Wartezeit und verwirft unter
  `critical`-Belastung Anfragen sofort mit `503 resource_pressure`, noch bevor überhaupt Bytes
  aufgenommen werden. PSI wird, sofern vorhanden, aus `memory.pressure` der cgroup dieser Einheit gelesen
  (`open-sse/utils/resourcePressureSampler.ts`); `/proc/pressure/memory` gilt
  hostweit und dient nur auf Bare-Metal-Systemen bzw. unter cgroup v1 als Rückfalloption, sodass ein auslagernder
  Host nicht zu 503-Fehlern in einem inaktiven Container führen kann.
- **Konfiguration:**
  - `OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES` — Überschreibung für das automatisch abgeleitete Byte-Budget
  - `OMNIROUTE_CHAT_MAX_HEAVY_IN_FLIGHT` — veraltete Begrenzung der Anfrageanzahl, nur bei expliziter Aktivierung
  - `OMNIROUTE_CHAT_ADMISSION_QUEUE_MS` — Wartezeit in der Warteschlange vor einem 503-Fehler (Standardwert: 2000)
  - `OMNIROUTE_CHAT_ADMISSION_MAX_QUEUED_BYTES` — Heap-Ventil für Bytes in der Warteschlange (Standardwert: 4 MB)
  - `OMNIROUTE_CHAT_VIRTUAL_TTL_MS` / `OMNIROUTE_CHAT_VIRTUAL_MAX_SESSIONS` — seit #10110 veraltete
    No-ops (aus Gründen der Konfigurationskompatibilität akzeptiert, aber ignoriert)
- **Berichte:** `GET /api/monitoring/health` → `chatAdmission` (#11244) — einschließlich
  der Ergänzungen aus #503-fanout: `inflightBytes`, `maxInflightBytes`, `budgetSource`
  (`v8_heap` | `cgroup` | `override`), `pressureSeverity` und `countCapEnabled`
  (bei einer Standardbereitstellung false — bestätigt, dass tatsächlich das Byte-Budget und nicht die veraltete
  Anzahlbegrenzung greift).

## 2. Adaptive virtuelle Laufzeit-Lanes (`open-sse/services/admission`)

- **Umfang:** Tenant-Key-Zulassung für den Provider-Dispatch — Warteschlangenkosten, latenzgesteuerte
  Limitanpassung, Lane-Warteschlangen und Lane-Metriken.
- **Gate:** **Opt-in.** Deaktiviert, sofern nicht `OMNIROUTE_CHAT_VIRTUAL_LANES=true` gesetzt ist. Ohne diese Einstellung
  behält der adaptive Controller das Verhalten mit gemeinsamer Warteschlange bei (Kriterium 1 von #9654
  gilt erst, sobald ein Operator Lanes aktiviert).
- **Abstimmung:** `OMNIROUTE_CHAT_VIRTUAL_LANES` + adaptive Konfiguration (`maxQueueCount`,
  `maxQueueCost`, `defaultMaxWaitMs`, …).
- **Berichte:** `GET /api/monitoring/health` → `adaptiveAdmission` → `laneCount`,
  `laneQueuedCount`, `laneQueuedCost`, `laneTenants` (undurchsichtige Lane-IDs, niemals rohe
  Schlüssel) und `virtualLanes` — das maßgebliche Flag „Lanes sind aktiviert“ im Snapshot.

## 3. Fan-out-Probes — Zulassung pro Ziel für Combo/Fusion (#9654 Welle 2)

Combo (Priorität / Round-Robin) und Fusion verteilen unter einer übergeordneten
Anfrage auf N Modellziele. Seit #9654 Welle 2 wird **jedes Fan-out-Ziel vor dem Dispatch gegatet**,
und zwar durch eine zielbezogene Probe (`PerTargetAdmissionHook`, erstellt durch `createPerTargetAdmissionHook`)
gegen die Tenant-Lane der **übergeordneten** Anfrage.

- **Umfang:** jedes Fan-out-Ziel, das von Combo, Fusion und der Chaos-Engine dispatcht wird.
  System 1 (auf Byte-Ebene) ist davon nicht betroffen — es prüft Fan-out-Ziele niemals.
- **Gate:** **Opt-in zusammen mit System 2.** Eine No-op-Operation, wenn `OMNIROUTE_CHAT_VIRTUAL_LANES`
  nicht gesetzt ist — die übergeordnete Anfrage hält in diesem Modus bereits die Lease der gemeinsamen Warteschlange,
  sodass eine Probe doppelt zählen und Combo-Ziele ablehnen würde.
- **Semantik:**
  - **Strikt nicht blockierend — überspringen, niemals in die Warteschlange einreihen.** `maxWaitMs 0`: Eine volle Lane
    überspringt das Ziel, und stattdessen greift der Fallback-Mechanismus der Combo (oder
    das Survivor-Panel der Fusion). Dies ist beabsichtigt: Ein Fan-out-Ziel ist redundante
    Arbeit, und es in die Warteschlange einzureihen, würde genau die Überlastung weiter erhöhen, die Lanes
    verhindern sollen. `defaultMaxWaitMs` gilt daher **nur für die übergeordnete Anfrage**;
    Fan-out-Probes warten niemals, und es gibt absichtlich **keinen Konfigurationsregler**, mit dem
    sie zum Warten gebracht werden können (der Issue-Verlauf zeigt, dass Warte-Konfigurationsregler jene massenhaften
    502/504-Fehler verursacht haben, die #9654 verhindert — nur erneut prüfen, wenn ein Operator meldet,
    dass übersprungene Fan-out-Ziele die Antwortqualität beeinträchtigen).
  - **Freigabe bei Zulassung.** Eine zugelassene Probe gibt ihre Lease sofort frei: Sie ist
    ein Kapazitäts-Gate, kein Haltemechanismus. Die Lease der übergeordneten Anfrage deckt den Fan-out ab; N
    weitere Leases zu halten, würde die gemeinsamen aktiven Kosten künstlich erhöhen und andere Tenants ablehnen. Nach bestem Bemühen,
    keine Reservierung: Die Lane kann sich zwischen Probe und Dispatch erneut füllen, sodass
    das Gate bei starker Konkurrenz möglicherweise den Zutritt zu einer Lane gewährt, die bereits wieder voll ist,
    wenn das Ziel dispatcht wird.
  - **Preisbildung anhand des tatsächlichen Fan-out-Bodys.** Die Probe schätzt die Kosten anhand des
    tatsächlichen Bodys des Ziels — einschließlich der aus dessen `stream`-Flag abgeleiteten Anfrageklasse,
    genau wie beim Pfad der übergeordneten Anfrage —, sodass Mitglieder des Fusion-Panels (`stream: false`)
    anhand der Non-Streaming-Klasse bepreist werden, die sie tatsächlich belegen werden, und Prioritäts-/RR-Ziele
    anhand dessen, was der Benutzer angefordert hat.
- **Berichte:** Das Überspringen durch eine Probe nach dem ersten Ziel erhöht den anfragebezogenen
  `fallbackCount` der Combo (entsprechend der bestehenden Fallback-Semantik; sichtbar in den Combo-
  Logs); Fusion gibt 503 zurück, wenn jedes Panel-Mitglied übersprungen wird. Derzeit gibt es
  **keinen aggregierten Zähler** (z. B. `virtualFanoutSkipped`) im Snapshot —
  wenn ein Operator meldet, nicht erkennen zu können, wie oft das Lane-Gate Fan-out-
  Ziele überspringt, ist dies der Auslöser, einen solchen Zähler hinzuzufügen.

## Was in einem Dashboard angezeigt wird

- `adaptiveAdmission.laneCount` / `laneTenants` → **adaptive virtuelle Lanes** (System 2).
- `adaptiveAdmission.virtualLanes === true` → die Fan-out-Probes aus Abschnitt 3 sind
  ebenfalls aktiv. Fehlt `virtualLanes` in einem Payload oder ist der Wert `false`, bedeutet dies,
  dass `OMNIROUTE_CHAT_VIRTUAL_LANES` nicht gesetzt ist — die Lanes auf Byte-Ebene (System 1) sind
  weiterhin aktiv, aber unter `adaptiveAdmission` ist nichts wirksam (und es findet kein Fan-out-Gating statt),
  bis die Option aktiviert wird.

## Warum beide existieren

Die Lanes auf Byte-Ebene begrenzen den speicherintensiven Parsing-/Komprimierungspfad; die adaptiven Lanes
begrenzen die Dispatch-Kosten pro Mandant. Kriterium 1 aus #9654 („der Burst einer Sitzung führt nicht zu einem 503
für eine andere“) wird von System 1 bedingungslos und von System 2 nach Aktivierung der Opt-in-Option durchgesetzt.

## 4. Lange `/v1/responses` in einem Prozess (gesunde Heap-Reserve)

Mit [#10437](https://github.com/diegosouzapw/OmniRoute/pull/10437) wurde
`tryAcquireHealthyHeadroom` hinzugefügt, sodass eine zweite strukturell aufwendige Anfrage zugelassen wird,
wenn die Heap-Auslastung unter `OMNIROUTE_CHAT_ADMISSION_HEAP_SHED_RATIO` liegt. Der von
`admitChatRequest` verwendete BYTE-Pfad (Bodies ≥ `OMNIROUTE_CHAT_LARGE_BODY_BYTES`,
standardmäßig 256 KiB, einschließlich `POST /v1/responses`) nutzt **denselben** Ausweichmechanismus.

Dies ist das unterstützte Rezept für **einen Prozess**, um mehr als zwei gleichzeitige lange
SSE-`/v1/responses` zu ermöglichen: Erhöhen Sie das primäre Limit und die gesunde Heap-Reserve nur so weit, wie es der Heap
und das prozessweite Budget für gleichzeitig verarbeitete Bytes (`OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES`
/ #10110) zulassen. Dutzende lange SSE-Clients (40–50) sind eine Frage dieses Speicherbudgets
und keine feste Produktbeschränkung von „maximal 2“. Ein unter Druck stehender Heap lehnt weiterhin Anfragen mit einem
wiederholbaren `503` ab, damit #7849 nicht erneut auftritt.

Um die Anzahl der Heaps zu **multiplizieren**, führen Sie N unabhängige `DATA_DIR`s aus (#11024). Verwenden Sie niemals
`replicas > 1` mit einer einzelnen SQLite-Datei (#10350). Dieser Abschnitt stellt keine Wiederaufnahme
des DATA_DIR-Scale-out-Rezepts dar.
