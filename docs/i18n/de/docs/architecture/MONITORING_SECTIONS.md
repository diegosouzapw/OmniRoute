# Monitoring & Costs — Navigation Structure (Deutsch)

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/MONITORING_SECTIONS.md) · 🇪🇹 [am](../../../am/docs/architecture/MONITORING_SECTIONS.md) · 🇸🇦 [ar](../../../ar/docs/architecture/MONITORING_SECTIONS.md) · 🇦🇿 [az](../../../az/docs/architecture/MONITORING_SECTIONS.md) · 🇧🇬 [bg](../../../bg/docs/architecture/MONITORING_SECTIONS.md) · 🇧🇩 [bn](../../../bn/docs/architecture/MONITORING_SECTIONS.md) · 🇨🇿 [cs](../../../cs/docs/architecture/MONITORING_SECTIONS.md) · 🇩🇰 [da](../../../da/docs/architecture/MONITORING_SECTIONS.md) · 🇬🇷 [el](../../../el/docs/architecture/MONITORING_SECTIONS.md) · 🇪🇸 [es](../../../es/docs/architecture/MONITORING_SECTIONS.md) · 🇪🇪 [et](../../../et/docs/architecture/MONITORING_SECTIONS.md) · 🇮🇷 [fa](../../../fa/docs/architecture/MONITORING_SECTIONS.md) · 🇫🇮 [fi](../../../fi/docs/architecture/MONITORING_SECTIONS.md) · 🇫🇷 [fr](../../../fr/docs/architecture/MONITORING_SECTIONS.md) · 🇮🇪 [ga](../../../ga/docs/architecture/MONITORING_SECTIONS.md) · 🇮🇳 [gu](../../../gu/docs/architecture/MONITORING_SECTIONS.md) · 🇳🇬 [ha](../../../ha/docs/architecture/MONITORING_SECTIONS.md) · 🇮🇱 [he](../../../he/docs/architecture/MONITORING_SECTIONS.md) · 🇮🇳 [hi](../../../hi/docs/architecture/MONITORING_SECTIONS.md) · 🇭🇷 [hr](../../../hr/docs/architecture/MONITORING_SECTIONS.md) · 🇭🇺 [hu](../../../hu/docs/architecture/MONITORING_SECTIONS.md) · 🇦🇲 [hy](../../../hy/docs/architecture/MONITORING_SECTIONS.md) · 🇮🇩 [id](../../../id/docs/architecture/MONITORING_SECTIONS.md) · 🇳🇬 [ig](../../../ig/docs/architecture/MONITORING_SECTIONS.md) · 🇮🇹 [it](../../../it/docs/architecture/MONITORING_SECTIONS.md) · 🇯🇵 [ja](../../../ja/docs/architecture/MONITORING_SECTIONS.md) · 🇬🇪 [ka](../../../ka/docs/architecture/MONITORING_SECTIONS.md) · 🇰🇭 [km](../../../km/docs/architecture/MONITORING_SECTIONS.md) · 🇮🇳 [kn](../../../kn/docs/architecture/MONITORING_SECTIONS.md) · 🇰🇷 [ko](../../../ko/docs/architecture/MONITORING_SECTIONS.md) · 🇱🇹 [lt](../../../lt/docs/architecture/MONITORING_SECTIONS.md) · 🇱🇻 [lv](../../../lv/docs/architecture/MONITORING_SECTIONS.md) · 🇮🇳 [ml](../../../ml/docs/architecture/MONITORING_SECTIONS.md) · 🇮🇳 [mr](../../../mr/docs/architecture/MONITORING_SECTIONS.md) · 🇲🇾 [ms](../../../ms/docs/architecture/MONITORING_SECTIONS.md) · 🇲🇹 [mt](../../../mt/docs/architecture/MONITORING_SECTIONS.md) · 🇲🇲 [my](../../../my/docs/architecture/MONITORING_SECTIONS.md) · 🇳🇵 [ne](../../../ne/docs/architecture/MONITORING_SECTIONS.md) · 🇳🇱 [nl](../../../nl/docs/architecture/MONITORING_SECTIONS.md) · 🇳🇴 [no](../../../no/docs/architecture/MONITORING_SECTIONS.md) · 🇮🇳 [or](../../../or/docs/architecture/MONITORING_SECTIONS.md) · 🇮🇳 [pa](../../../pa/docs/architecture/MONITORING_SECTIONS.md) · 🇵🇭 [phi](../../../phi/docs/architecture/MONITORING_SECTIONS.md) · 🇵🇱 [pl](../../../pl/docs/architecture/MONITORING_SECTIONS.md) · 🇵🇹 [pt](../../../pt/docs/architecture/MONITORING_SECTIONS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/MONITORING_SECTIONS.md) · 🇷🇴 [ro](../../../ro/docs/architecture/MONITORING_SECTIONS.md) · 🇷🇺 [ru](../../../ru/docs/architecture/MONITORING_SECTIONS.md) · 🇱🇰 [si](../../../si/docs/architecture/MONITORING_SECTIONS.md) · 🇸🇰 [sk](../../../sk/docs/architecture/MONITORING_SECTIONS.md) · 🇸🇮 [sl](../../../sl/docs/architecture/MONITORING_SECTIONS.md) · 🇷🇸 [sr](../../../sr/docs/architecture/MONITORING_SECTIONS.md) · 🇸🇪 [sv](../../../sv/docs/architecture/MONITORING_SECTIONS.md) · 🇰🇪 [sw](../../../sw/docs/architecture/MONITORING_SECTIONS.md) · 🇮🇳 [ta](../../../ta/docs/architecture/MONITORING_SECTIONS.md) · 🇮🇳 [te](../../../te/docs/architecture/MONITORING_SECTIONS.md) · 🇹🇭 [th](../../../th/docs/architecture/MONITORING_SECTIONS.md) · 🇹🇷 [tr](../../../tr/docs/architecture/MONITORING_SECTIONS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/MONITORING_SECTIONS.md) · 🇵🇰 [ur](../../../ur/docs/architecture/MONITORING_SECTIONS.md) · 🇺🇿 [uz](../../../uz/docs/architecture/MONITORING_SECTIONS.md) · 🇻🇳 [vi](../../../vi/docs/architecture/MONITORING_SECTIONS.md) · 🇳🇬 [yo](../../../yo/docs/architecture/MONITORING_SECTIONS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/MONITORING_SECTIONS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/MONITORING_SECTIONS.md)

---

> Implementiert in Gruppe B (Plan 16). Siehe `src/shared/constants/sidebarVisibility.ts`.

---

## Navigation auf oberster Ebene

Die Dashboard-Seitenleiste (nach Gruppe B) enthält diese Bereiche auf oberster Ebene in der folgenden Reihenfolge:

```
Startseite
Anbieter
Kombinationen
API-Schlüssel
Einstellungen
Analysen
Kosten         ← NEU (Gruppe B, Plan 16)
Überwachung    ← NEU ORGANISIERT (Gruppe B, Plan 16)
...
```

---

## Bereich „Kosten“ (neu, Ebene 1)

Pfadpräfix: `/dashboard/costs/`

| Element            | URL                                  | Beschreibung                                            |
| ------------------ | ------------------------------------ | ------------------------------------------------------- |
| Übersicht          | `/dashboard/costs`                   | Aggregiertes Kosten-Dashboard (aus Analysen verschoben) |
| Preisgestaltung    | `/dashboard/costs/pricing`           | Preistabelle pro Modell                                 |
| Budget             | `/dashboard/costs/budget`            | Budgetschwellenwerte + Warnungen                        |
| Kontingentfreigabe | `/dashboard/costs/quota-share`       | Kontingentfreigabe-Pools + Nutzung                      |
| Plankonfiguration  | `/dashboard/costs/quota-share/plans` | Planspezifische Überschreibungen pro Anbieter           |

**Begründung**: Preisgestaltung, Budget und Kontingentfreigabe befanden sich zuvor unter
`Überwachung > Kostenparameter`. Durch die Verschiebung in einen eigenen Bereich
auf oberster Ebene sind sie leichter auffindbar, ohne durch die Observability-Werkzeuge
navigieren zu müssen.

---

## Bereich „Überwachung“ (neu organisiert)

Der Bereich „Überwachung“ enthält jetzt **Aktivität an oberster Stelle**, gefolgt von **3 Untergruppen**:

```
Überwachung
├── Aktivität                ← Zeitleisten-Feed (Element auf oberster Ebene)
├── Protokollgruppe
│   ├── Protokolle (alle)
│   ├── Proxy-Protokolle
│   └── Konsolenprotokolle
├── Auditgruppe
│   ├── Auditprotokoll
│   ├── MCP-Audit
│   └── A2A-Audit
└── Systemgruppe
    ├── Systemzustand
    └── Laufzeit
```

### Änderungen gegenüber der alten Struktur

| Vorher                                                                                                                | Nachher                                           |
| --------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------- |
| Aktivität = Registerkarte innerhalb von „Protokolle“, die das Auditprotokoll anzeigte                                 | Aktivität = eigener Feed (`/dashboard/activity`)  |
| Gruppe „Kostenparameter“ unter „Überwachung“                                                                          | In den Bereich „Kosten“ verschoben                |
| Flache Liste: Protokolle, Aktivität (Protokolle), Audit, Systemzustand, Laufzeit, Preisgestaltung, Budget, Kontingent | Struktur mit 3 Gruppen + eigener Bereich „Kosten“ |

---

## Aktivität im Vergleich zum Auditprotokoll

Diese beiden Bereiche sind nun voneinander getrennt:

| Dimension                 | Aktivität (`/dashboard/activity`)                                 | Auditprotokoll (`/dashboard/audit`)        |
| ------------------------- | ----------------------------------------------------------------- | ------------------------------------------ |
| **Zweck**                 | Benutzerorientierter Ereignis-Feed („Was ist kürzlich passiert?“) | Compliance-/Sicherheitsprotokoll           |
| **Datenquelle**           | `GET /api/compliance/audit-log?level=high`                        | `GET /api/compliance/audit-log?level=all`  |
| **Format**                | Zeitleiste, nach Tag gruppiert, verständliche Verben + Symbole    | Dichte, paginierte Tabelle, 50/Seite       |
| **Filter**                | Ereignistypkategorie                                              | Aktion, Schweregrad, Akteur, Datumsbereich |
| **Export**                | Nicht verfügbar                                                   | JSON-Export                                |
| **Akteurfilter**          | Nicht anwendbar                                                   | Nach Akteur filterbar                      |
| **Angezeigte Ereignisse** | Nur übergeordnete Aktionen (Positivliste)                         | Alle Auditereignisse                       |

### Positivliste übergeordneter Aktionen

Definiert in `src/lib/audit/highLevelActions.ts`. Steuert, welche Ereignisse im
Aktivitäts-Feed angezeigt werden. Die Positivliste umfasst:

- Ereignisse zum Hinzufügen, Entfernen und Testen von Anbietern
- Erstellen, Aktualisieren und Löschen von Kombinationen
- Lebenszyklus von API-Schlüsseln (Erstellen, Widerrufen, Rotieren)
- Erreichen eines Budgetschwellenwerts
- Authentifizierungsanmeldung/-abmeldung
- Erstellung einer Cloud-Agent-Sitzung
- Registrierung von MCP-Werkzeugen
- Erstellen/Löschen von Webhooks
- Änderungen an Kontingentpools/-plänen (`quota.*`-Aktionen, Gruppe B)
- Plattformereignisse (Aktualisierung, Bereitstellung)
- Installieren/Entfernen von Skills

Ereignisse, die nicht in dieser Liste enthalten sind, erscheinen nur im Auditprotokoll.

### Hinzufügen einer neuen übergeordneten Aktion

Bearbeiten Sie `src/lib/audit/highLevelActions.ts` und fügen Sie die Aktionszeichenfolge zu
`HIGH_LEVEL_ACTIONS` hinzu. Dies erfordert einen PR (die Liste befindet sich im Code und ist nicht über die Datenbank konfigurierbar).
Das entsprechende Symbol kann zu `src/lib/audit/activityIcons.ts` hinzugefügt werden.

---

## Weiterleitung: `/dashboard/logs/activity`

Der alte Pfad `/dashboard/logs/activity` wird über `permanentRedirect()` in
`src/app/(dashboard)/dashboard/logs/activity/page.tsx` dauerhaft (HTTP 308) zu
`/dashboard/activity` weitergeleitet.

Die alte Seitenleisten-ID `logs-activity` bleibt in `HIDEABLE_SIDEBAR_ITEM_IDS`
erhalten (wurde jedoch aus `SIDEBAR_DEFINITIONS` entfernt), damit Benutzervoreinstellungen,
die auf die alte ID verweisen, nicht beschädigt werden.

---

## i18n

Von Gruppe B hinzugefügte Namespaces:

| Namespace-Schlüssel     | Abgedeckter Bereich                                                         |
| ----------------------- | --------------------------------------------------------------------------- |
| `sidebar.costsSection`  | Bezeichnung des Bereichs „Kosten“                                           |
| `sidebar.activity`      | Seitenleistenelement „Aktivität“                                            |
| `sidebar.logsGroup`     | Bezeichnung der Untergruppe „Protokolle“                                    |
| `sidebar.systemGroup`   | Bezeichnung der Untergruppe „System“                                        |
| `sidebar.costsOverview` | Element der Kostenübersicht                                                 |
| `activity.*`            | Alle Zeichenfolgen der Aktivitätsseite (Titel, Verben, Filter, Leerzustand) |

Die maßgeblichen Quell-Locales sind `pt-BR` und `en`. Alle anderen 40 Locales greifen über
den `next-intl`-Fallback-Mechanismus auf Englisch zurück (konfiguriert in `src/i18n/config.ts`).
