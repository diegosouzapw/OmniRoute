# Subscription-first routing (Deutsch)

🌐 **Languages:** 🇺🇸 [English](../../../../routing/SUBSCRIPTION_LADDER.md) · 🇪🇹 [am](../../../am/docs/routing/SUBSCRIPTION_LADDER.md) · 🇸🇦 [ar](../../../ar/docs/routing/SUBSCRIPTION_LADDER.md) · 🇦🇿 [az](../../../az/docs/routing/SUBSCRIPTION_LADDER.md) · 🇧🇬 [bg](../../../bg/docs/routing/SUBSCRIPTION_LADDER.md) · 🇧🇩 [bn](../../../bn/docs/routing/SUBSCRIPTION_LADDER.md) · 🇧🇦 [bs](../../../bs/docs/routing/SUBSCRIPTION_LADDER.md) · 🇨🇿 [cs](../../../cs/docs/routing/SUBSCRIPTION_LADDER.md) · 🇩🇰 [da](../../../da/docs/routing/SUBSCRIPTION_LADDER.md) · 🇬🇷 [el](../../../el/docs/routing/SUBSCRIPTION_LADDER.md) · 🇪🇸 [es](../../../es/docs/routing/SUBSCRIPTION_LADDER.md) · 🇪🇪 [et](../../../et/docs/routing/SUBSCRIPTION_LADDER.md) · 🇮🇷 [fa](../../../fa/docs/routing/SUBSCRIPTION_LADDER.md) · 🇫🇮 [fi](../../../fi/docs/routing/SUBSCRIPTION_LADDER.md) · 🇫🇷 [fr](../../../fr/docs/routing/SUBSCRIPTION_LADDER.md) · 🇮🇪 [ga](../../../ga/docs/routing/SUBSCRIPTION_LADDER.md) · 🇮🇳 [gu](../../../gu/docs/routing/SUBSCRIPTION_LADDER.md) · 🇳🇬 [ha](../../../ha/docs/routing/SUBSCRIPTION_LADDER.md) · 🇮🇱 [he](../../../he/docs/routing/SUBSCRIPTION_LADDER.md) · 🇮🇳 [hi](../../../hi/docs/routing/SUBSCRIPTION_LADDER.md) · 🇭🇷 [hr](../../../hr/docs/routing/SUBSCRIPTION_LADDER.md) · 🇭🇺 [hu](../../../hu/docs/routing/SUBSCRIPTION_LADDER.md) · 🇦🇲 [hy](../../../hy/docs/routing/SUBSCRIPTION_LADDER.md) · 🇮🇩 [id](../../../id/docs/routing/SUBSCRIPTION_LADDER.md) · 🇳🇬 [ig](../../../ig/docs/routing/SUBSCRIPTION_LADDER.md) · 🇮🇹 [it](../../../it/docs/routing/SUBSCRIPTION_LADDER.md) · 🇯🇵 [ja](../../../ja/docs/routing/SUBSCRIPTION_LADDER.md) · 🇬🇪 [ka](../../../ka/docs/routing/SUBSCRIPTION_LADDER.md) · 🇰🇭 [km](../../../km/docs/routing/SUBSCRIPTION_LADDER.md) · 🇮🇳 [kn](../../../kn/docs/routing/SUBSCRIPTION_LADDER.md) · 🇰🇷 [ko](../../../ko/docs/routing/SUBSCRIPTION_LADDER.md) · 🇱🇹 [lt](../../../lt/docs/routing/SUBSCRIPTION_LADDER.md) · 🇱🇻 [lv](../../../lv/docs/routing/SUBSCRIPTION_LADDER.md) · 🇮🇳 [ml](../../../ml/docs/routing/SUBSCRIPTION_LADDER.md) · 🇮🇳 [mr](../../../mr/docs/routing/SUBSCRIPTION_LADDER.md) · 🇲🇾 [ms](../../../ms/docs/routing/SUBSCRIPTION_LADDER.md) · 🇲🇹 [mt](../../../mt/docs/routing/SUBSCRIPTION_LADDER.md) · 🇲🇲 [my](../../../my/docs/routing/SUBSCRIPTION_LADDER.md) · 🇳🇵 [ne](../../../ne/docs/routing/SUBSCRIPTION_LADDER.md) · 🇳🇱 [nl](../../../nl/docs/routing/SUBSCRIPTION_LADDER.md) · 🇳🇴 [no](../../../no/docs/routing/SUBSCRIPTION_LADDER.md) · 🇮🇳 [or](../../../or/docs/routing/SUBSCRIPTION_LADDER.md) · 🇮🇳 [pa](../../../pa/docs/routing/SUBSCRIPTION_LADDER.md) · 🇵🇭 [phi](../../../phi/docs/routing/SUBSCRIPTION_LADDER.md) · 🇵🇱 [pl](../../../pl/docs/routing/SUBSCRIPTION_LADDER.md) · 🇵🇹 [pt](../../../pt/docs/routing/SUBSCRIPTION_LADDER.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/routing/SUBSCRIPTION_LADDER.md) · 🇷🇴 [ro](../../../ro/docs/routing/SUBSCRIPTION_LADDER.md) · 🇷🇺 [ru](../../../ru/docs/routing/SUBSCRIPTION_LADDER.md) · 🇱🇰 [si](../../../si/docs/routing/SUBSCRIPTION_LADDER.md) · 🇸🇰 [sk](../../../sk/docs/routing/SUBSCRIPTION_LADDER.md) · 🇸🇮 [sl](../../../sl/docs/routing/SUBSCRIPTION_LADDER.md) · 🇷🇸 [sr](../../../sr/docs/routing/SUBSCRIPTION_LADDER.md) · 🇸🇪 [sv](../../../sv/docs/routing/SUBSCRIPTION_LADDER.md) · 🇰🇪 [sw](../../../sw/docs/routing/SUBSCRIPTION_LADDER.md) · 🇮🇳 [ta](../../../ta/docs/routing/SUBSCRIPTION_LADDER.md) · 🇮🇳 [te](../../../te/docs/routing/SUBSCRIPTION_LADDER.md) · 🇹🇭 [th](../../../th/docs/routing/SUBSCRIPTION_LADDER.md) · 🇹🇷 [tr](../../../tr/docs/routing/SUBSCRIPTION_LADDER.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/routing/SUBSCRIPTION_LADDER.md) · 🇵🇰 [ur](../../../ur/docs/routing/SUBSCRIPTION_LADDER.md) · 🇺🇿 [uz](../../../uz/docs/routing/SUBSCRIPTION_LADDER.md) · 🇻🇳 [vi](../../../vi/docs/routing/SUBSCRIPTION_LADDER.md) · 🇳🇬 [yo](../../../yo/docs/routing/SUBSCRIPTION_LADDER.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/routing/SUBSCRIPTION_LADDER.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/routing/SUBSCRIPTION_LADDER.md)

---

> Zwei neue `auto/*`-IDs — `auto/subscription` und `auto/thrifty`. Beide werden nur auf ausdrückliche
> Anforderung verwendet: Nichts wird über sie geroutet, sofern ein Aufrufer die ID nicht namentlich
> anfordert, und kein bestehender Pool, keine Strategie und kein Standardwert wird geändert.

## Warum dies existiert

OmniRoute beantwortet bereits zwei Kostenfragen, doch keine davon ist die, die sich die meisten Betreiber stellen.

| Bestehender Mechanismus                                  | Beantwortet                                                  |
| -------------------------------------------------------- | ------------------------------------------------------------ |
| `hidePaidModels` (`autoCombo/paidModelFilter.ts`)        | „Ist dieses Modell als kostenlos katalogisiert?“             |
| `freeAccessPolicy: "strict"` (`strictZeroCostFilter.ts`) | „Kann mir diese Verbindung jemals Kosten verursachen?“       |
| `quotaPreflight` (`combo/quotaExhaustionCutoff.ts`)      | „Nähert sich diese Verbindung ihrem Limit?“                  |
| `budgetCap` / `budgetFallback` (`autoCombo/engine.ts`)   | „Ausgaben begrenzen, auf die günstigste Option zurückfallen“ |

Jeder ausschließlich auf kostenlose Nutzung ausgelegte Mechanismus **schlägt geschlossen fehl** — ein
erschöpfter kostenloser Pool ist ein leerer Pool und führt niemals zu einem Wechsel auf eine
kostenpflichtige Option — und jeder Mechanismus auf der kostenpflichtigen Seite ignoriert Tarifstufen.
Keiner beantwortet:

> „Nutze das Kontingent, für das ich bereits bezahle. Wenn es aufgebraucht ist, stoppe entweder oder
> steige Stufe für Stufe zu den günstigsten kostenpflichtigen Optionen auf — und kehre in dem Moment
> zurück, in dem es zurückgesetzt wird.“

## Die Abrechnung ist eine Eigenschaft der Verbindung, nicht des Modells

`classifyTier()` (`open-sse/services/tierResolver.ts`) verwendet `(provider, model)` als Schlüssel und
gibt anhand der Katalogpreise `free | cheap | premium` zurück. Ob eine Anfrage jedoch zusätzliche
Kosten verursacht, hängt davon ab, **welche Verbindung sie verarbeitet**: Dasselbe Modell ist über
eine Claude-Code-OAuth-Verbindung im Tarif enthalten und wird über eine API-Schlüssel-Verbindung
pro Token abgerechnet.

`provider_connections.auth_type` ist in keiner Richtung ein verlässlicher Indikator — es gibt
verbrauchsabhängig abgerechnete OAuth-Verbindungen ebenso wie im Tarif enthaltene API-Schlüssel-Verbindungen
(ein Copilot-Arbeitsplatz-Token ist kein verbrauchsabhängig abgerechneter API-Schlüssel). Daher stammt die
Abrechnungsklasse aus einem **kuratierten Katalog**,
`open-sse/config/connectionBillingCatalog.ts`, der anhand der veröffentlichten Bedingungen jedes
Anbieters manuell gepflegt wird — dasselbe Muster, das `FreeModelBudget.hardStopGuaranteed`
bereits für kostenlose Modelle etabliert hat.

```ts
type ConnectionBillingClass = "subscription" | "metered" | "keyless" | "unknown";
type ConnectionOverageBehavior = "hard-stop" | "meters-to-paid" | "unknown";
```

Auflösungsreihenfolge (`autoCombo/connectionBilling.ts`): der synthetische Sentinel ohne
Authentifizierung → `keyless`; ein Katalogeintrag, der sowohl zum Anbieter **als auch** zu
`authType` passt; ein anbieterweiter Eintrag; andernfalls `unknown`. **Nicht kuratiert bedeutet
nicht kostenlos** — `unknown` wird überall als `metered` behandelt, sodass ein morgen
hinzugefügter Anbieter zunächst außerhalb der Abonnementstufe beginnt und bewusst in den
Katalog aufgenommen werden muss.

## Das Stufenmodell

Fünf Stufen in Eskalationsreihenfolge. Sie unterscheiden sich nicht nur im Preis — jede besitzt
ihr **eigenes** Erschöpfungssignal, weshalb es sich hierbei nicht lediglich um eine Sortierung handelt.

| #   | Stufe          | Zugehörigkeit                                                              | Erschöpft, wenn                          |
| --- | -------------- | -------------------------------------------------------------------------- | ---------------------------------------- |
| 0   | `subscription` | kuratiertes `billing: "subscription"`                                      | Kontingentfenster am/unter dem Grenzwert |
| 1   | `keyless`      | der synthetische Pfad ohne Authentifizierung                               | Verbindungs-Cooldown / Leistungsschalter |
| 2   | `free`         | verbrauchsabhängig abgerechnete Verbindung, `classifyTier() === "free"`    | kostenloses Kontingent erschöpft         |
| 3   | `cheap`        | verbrauchsabhängig abgerechnete Verbindung, `classifyTier() === "cheap"`   | Budget der Stufe verbraucht              |
| 4   | `premium`      | verbrauchsabhängig abgerechnete Verbindung, `classifyTier() === "premium"` | Budget der Stufe verbraucht              |

Die Stufen 0–2 werden durch ein **Kontingent** erschöpft, das beobachtbar ist und bereits erfasst
wird. Die Stufen 3–4 haben kein Kontingent — eine kostenpflichtige Verbindung verarbeitet Anfragen
unbegrenzt weiter — daher ist ihr einzig sinnvolles Erschöpfungssignal ein **Budget** pro Stufe.
Ohne ein solches Budget gibt es keinen Auslöser für „eskalieren, wenn `cheap` erschöpft ist“.

## `auto/subscription` — geschlossen ausfallen

Pool = nur Stufe 0, beschränkt auf Verbindungen, deren Mehrverbrauch als `hard-stop`
dokumentiert ist und für die jeweils live verifiziert wurde, dass noch Kontingent verfügbar ist.
Alles Uneindeutige wird ausgeschlossen: ein nicht kuratierter Anbieter, ein nicht verifizierbarer
Kontingentwert, ein veralteter Wert oder ein Mehrverbrauch, der kostenpflichtig abgerechnet wird.

Ein leerer Pool ist die **beabsichtigte** Antwort, kein Defekt — der bestehende Pfad des Aufrufers
für leere Pools wandelt ihn in einen eindeutigen Fehler um, statt stillschweigend auf eine
kostenpflichtige Alternative zurückzufallen. Das ist das gesamte Versprechen dieser ID.

`keyless` erfüllt die Voraussetzungen bewusst **nicht**: Diese Gruppierung bedeutet „der Tarif,
für den ich bezahle“, daher gehört ein Backend ohne Authentifizierung nicht hinein. Verwende
dafür `auto/thrifty` (oder `auto/best-free`).

### Verbindungssicherheit

Ein Kandidat ist nicht immer an eine einzelne Verbindung gebunden — ein logischer Kandidat
enthält eine `allowedConnectionIds`-Positivliste, und das tatsächlich verwendete Konto wird
erst später beim Dispatch durch `open-sse/services/combo/autoStrategy.ts` ausgewählt. Beide
Gruppierungen überprüfen daher **jede Verbindung einzeln** und reduzieren
`allowedConnectionIds` auf genau die verbleibende Teilmenge — niemals auf die vollständige
ursprüngliche Liste und niemals auf ein willkürlich ausgewähltes Mitglied. Da
`autoStrategy.ts` dieses Array bereits als strikte Positivliste durchsetzt, macht das
Umschreiben an dieser Stelle „verifiziert“ und „tatsächlich verwendet“ konstruktionsbedingt
zur selben Menge. Dies ist dieselbe Invariante und dieselbe Begründung wie bei
[STRICT_ZERO_COST](./STRICT_ZERO_COST.md).

## `auto/thrifty` — jeweils um eine Stufe eskalieren

Pool = alle Stufen, nach Stufenindex geordnet, wobei ausgeschöpfte Kandidaten ausgeschlossen
werden. Die `auto`-Engine bewertet weiterhin **innerhalb** des verbleibenden Pools: Die Leiter
entscheidet, welche Stufen berücksichtigt werden, die Bewertung entscheidet, welcher Kandidat
innerhalb dieser Stufen gewinnt. Die Reihenfolge innerhalb einer Stufe bleibt stabil, sodass
die eigene Rangfolge des Scorers durch dieses Overlay niemals umsortiert wird.

Dies ist ein Overlay für Reihenfolge und Ausschluss, **kein** neuer Dispatcher: Die spekulative
Schleife von `combo.ts` durchläuft Ziele bereits der Reihe nach und wechselt bei einem Fehler
zum nächsten. Eine Laufzeiterschöpfung, die von der Vorabprüfung nicht erkannt wurde, führt
daher noch innerhalb derselben Anfrage zur nächsten Stufe.

Während `auto/subscription` geschlossen ausfällt, fällt `auto/thrifty` **offen** aus: Eine im
Tarif enthaltene Verbindung ohne verwertbaren Kontingentwert wird weiterhin zuerst ausprobiert.
Der Versuch verursacht keine Kosten, und falls sich herausstellt, dass sie ausgeschöpft ist,
wird ohnehin zur nächsten Stufe gewechselt — würde man den Versuch hingegen verweigern, würde
die Anfrage bei fehlender Telemetrie an eine kostenpflichtige Stufe gesendet, also genau das
Ergebnis, das diese Gruppierung verhindern soll.

## Rückkehr zum Tarif nach einem Reset

Drei unabhängige Dinge müssen ablaufen, bevor das Routing zu Stufe 0 zurückkehrt. Wird nur eines
davon behoben, bleibt die Leiter noch lange nach dem Auffüllen des Tarifs auf kostenpflichtigen
Stufen hängen.

1. **Der Kontingentstatus-Cache** — `freeAccessQuota.ts` speichert pro
   `(provider, connection)` mit einer TTL von 180s. Ein zwischengespeicherter Eintrag, dessen
   eigenes `resetAt` bereits verstrichen ist, beschreibt ein nicht mehr existierendes Fenster
   und wird daher jetzt **unabhängig vom Alter** als veraltet behandelt, wodurch eine
   Aktualisierung erzwungen wird. Ohne dies wird ein um Mitternacht aufgefüllter Tarif weiterhin
   als ausgeschöpft angezeigt, bis die TTL zufällig abläuft.
2. **Der eigene Zustand der Leiter** — einen solchen gibt es absichtlich nicht. Die Eignung
   einer Stufe wird bei jedem Aufbau des Pools anhand des aktuellen Kontingentstatus neu
   berechnet; es gibt keinen persistenten Datensatz „derzeit auf Stufe 3“, der einen Reset
   überdauern und das Routing blockieren könnte.
3. **Die Abklingzeit der Verbindung** — der zur Ausschöpfung führende 429-Fehler setzt
   `rateLimitedUntil` anhand eines exponentiellen Backoffs, der bei einer Tarifverbindung über
   den tatsächlichen Reset hinausreichen kann. `clampCooldownToReset()`
   (`subscriptionLadder.ts`) begrenzt eine Abklingzeit auf den Reset-Zeitpunkt des Upstreams
   und kann sie niemals verlängern. **Dies ist implementiert und getestet, aber noch nicht
   verdrahtet**: Der Kontingent-Cache wird in `src/sse/services/auth.ts` _bevor_ eine
   Abklingzeit geschrieben wird invalidiert, daher muss `resetAt` früher in dieser Funktion
   erfasst werden — eine Änderung am kritischen Resilienzpfad, die in einen eigenen geprüften
   PR gehört. Bis dahin wartet der Wiedereintritt die Abklingzeit der Verbindung ab
   (die bereits `Retry-After`-Hinweise des Upstreams bevorzugt, wenn der Anbieter sie sendet).

### Flattervermeidung

Eine gerade zurückgesetzte Stufe wird erst wieder oberhalb von
`reentryMinRemainingPercent` (Standardwert 5) zugelassen, während eine bereits verwendete
Verbindung nur oberhalb von `exitCutoffPercent` bleiben muss (Standardwert 2, entsprechend
`quotaPreflight.defaultThresholdPercent`). Die Differenz ist das Hystereseband — ohne dieses
würde eine Verbindung, die um den Grenzwert schwankt, bei aufeinanderfolgenden Anfragen
zwischen den Stufen oszillieren.

## Konfiguration

Nur zur Feinabstimmung. Es gibt bewusst **kein** `enabled`-Flag: Ein Schalter, der diese deaktivieren könnte,
würde dazu führen, dass `auto/subscription` unbemerkt den vollständigen Pool — einschließlich kostenpflichtiger Modelle — unter einem
Namen bereitstellt, der das Gegenteil verspricht.

```jsonc
{
  "subscriptionLadder": {
    "exitCutoffPercent": 2,
    "reentryMinRemainingPercent": 5,
    "rungBudgetUsd": { "cheap": 5.0, "premium": 0 }, // 0 deaktiviert eine Stufe vollständig
  },
}
```

Die Budgetbegrenzung bleibt wirkungslos, bis ein Ausgaben-Resolver eingebunden ist: Wenn keine Abrechnungsdaten verfügbar sind, wird eine kostenpflichtige
Stufe zwar eingeordnet, aber niemals begrenzt. Seit v3.8.51 wird die Einstellung `rungBudgetUsd` vom
Schema akzeptiert, aber NOCH NICHT durchgesetzt — behandeln Sie sie als reservierte Konfiguration, nicht als aktive Ausgabenobergrenze. Die Stufenreihenfolge, die kontingentbasierte Ausschöpfung und der Wiedereinstieg nach dem Zurücksetzen
funktionieren auch ohne sie.

## Zusammensetzung

`subscription` und `thrifty` sind `AutoTier`-Werte und lassen sich daher mit jeder Kategorie kombinieren:
`auto/coding:thrifty`, `auto/reasoning:subscription` und so weiter. Die beiden einfachen IDs
(`auto/subscription`, `auto/thrifty`) werden in `/v1/models` und im Dashboard aufgeführt.

Keine der beiden IDs gehört zur kostenpflichtigen Stufe, daher gibt `isPaidTierAutoId()` für beide `false` zurück und
`auto/subscription` bleibt trotz `hidePaidModels` erhalten.

## Speicherort des Codes

| Bereich                                     | Datei                                               |
| ------------------------------------------- | --------------------------------------------------- |
| Kuratierte Abrechnungsdaten                 | `open-sse/config/connectionBillingCatalog.ts`       |
| Klassifizierer                              | `open-sse/services/autoCombo/connectionBilling.ts`  |
| Stufen, beide Gruppierungen, Wiedereinstieg | `open-sse/services/autoCombo/subscriptionLadder.ts` |
| Einbindung in den Kandidatenpool            | `open-sse/services/autoCombo/virtualFactory.ts`     |
| Zurücksetzungsabhängige Cache-Veralterung   | `open-sse/services/autoCombo/freeAccessQuota.ts`    |
| Stufenoberfläche                            | `open-sse/services/autoCombo/suffixComposition.ts`  |
| Aufgeführte IDs                             | `open-sse/services/autoCombo/builtinCatalog.ts`     |
| Tests                                       | `tests/unit/autoCombo/subscription-ladder.test.ts`  |
