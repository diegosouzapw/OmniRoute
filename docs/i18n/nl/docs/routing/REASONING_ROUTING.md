# Reasoning Routing (Nederlands)

🌐 **Languages:** 🇺🇸 [English](../../../../routing/REASONING_ROUTING.md) · 🇪🇹 [am](../../../am/docs/routing/REASONING_ROUTING.md) · 🇸🇦 [ar](../../../ar/docs/routing/REASONING_ROUTING.md) · 🇦🇿 [az](../../../az/docs/routing/REASONING_ROUTING.md) · 🇧🇬 [bg](../../../bg/docs/routing/REASONING_ROUTING.md) · 🇧🇩 [bn](../../../bn/docs/routing/REASONING_ROUTING.md) · 🇨🇿 [cs](../../../cs/docs/routing/REASONING_ROUTING.md) · 🇩🇰 [da](../../../da/docs/routing/REASONING_ROUTING.md) · 🇩🇪 [de](../../../de/docs/routing/REASONING_ROUTING.md) · 🇬🇷 [el](../../../el/docs/routing/REASONING_ROUTING.md) · 🇪🇸 [es](../../../es/docs/routing/REASONING_ROUTING.md) · 🇪🇪 [et](../../../et/docs/routing/REASONING_ROUTING.md) · 🇮🇷 [fa](../../../fa/docs/routing/REASONING_ROUTING.md) · 🇫🇮 [fi](../../../fi/docs/routing/REASONING_ROUTING.md) · 🇫🇷 [fr](../../../fr/docs/routing/REASONING_ROUTING.md) · 🇮🇪 [ga](../../../ga/docs/routing/REASONING_ROUTING.md) · 🇮🇳 [gu](../../../gu/docs/routing/REASONING_ROUTING.md) · 🇳🇬 [ha](../../../ha/docs/routing/REASONING_ROUTING.md) · 🇮🇱 [he](../../../he/docs/routing/REASONING_ROUTING.md) · 🇮🇳 [hi](../../../hi/docs/routing/REASONING_ROUTING.md) · 🇭🇷 [hr](../../../hr/docs/routing/REASONING_ROUTING.md) · 🇭🇺 [hu](../../../hu/docs/routing/REASONING_ROUTING.md) · 🇦🇲 [hy](../../../hy/docs/routing/REASONING_ROUTING.md) · 🇮🇩 [id](../../../id/docs/routing/REASONING_ROUTING.md) · 🇳🇬 [ig](../../../ig/docs/routing/REASONING_ROUTING.md) · 🇮🇹 [it](../../../it/docs/routing/REASONING_ROUTING.md) · 🇯🇵 [ja](../../../ja/docs/routing/REASONING_ROUTING.md) · 🇬🇪 [ka](../../../ka/docs/routing/REASONING_ROUTING.md) · 🇰🇭 [km](../../../km/docs/routing/REASONING_ROUTING.md) · 🇮🇳 [kn](../../../kn/docs/routing/REASONING_ROUTING.md) · 🇰🇷 [ko](../../../ko/docs/routing/REASONING_ROUTING.md) · 🇱🇹 [lt](../../../lt/docs/routing/REASONING_ROUTING.md) · 🇱🇻 [lv](../../../lv/docs/routing/REASONING_ROUTING.md) · 🇮🇳 [ml](../../../ml/docs/routing/REASONING_ROUTING.md) · 🇮🇳 [mr](../../../mr/docs/routing/REASONING_ROUTING.md) · 🇲🇾 [ms](../../../ms/docs/routing/REASONING_ROUTING.md) · 🇲🇹 [mt](../../../mt/docs/routing/REASONING_ROUTING.md) · 🇲🇲 [my](../../../my/docs/routing/REASONING_ROUTING.md) · 🇳🇵 [ne](../../../ne/docs/routing/REASONING_ROUTING.md) · 🇳🇴 [no](../../../no/docs/routing/REASONING_ROUTING.md) · 🇮🇳 [or](../../../or/docs/routing/REASONING_ROUTING.md) · 🇮🇳 [pa](../../../pa/docs/routing/REASONING_ROUTING.md) · 🇵🇭 [phi](../../../phi/docs/routing/REASONING_ROUTING.md) · 🇵🇱 [pl](../../../pl/docs/routing/REASONING_ROUTING.md) · 🇵🇹 [pt](../../../pt/docs/routing/REASONING_ROUTING.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/routing/REASONING_ROUTING.md) · 🇷🇴 [ro](../../../ro/docs/routing/REASONING_ROUTING.md) · 🇷🇺 [ru](../../../ru/docs/routing/REASONING_ROUTING.md) · 🇱🇰 [si](../../../si/docs/routing/REASONING_ROUTING.md) · 🇸🇰 [sk](../../../sk/docs/routing/REASONING_ROUTING.md) · 🇸🇮 [sl](../../../sl/docs/routing/REASONING_ROUTING.md) · 🇷🇸 [sr](../../../sr/docs/routing/REASONING_ROUTING.md) · 🇸🇪 [sv](../../../sv/docs/routing/REASONING_ROUTING.md) · 🇰🇪 [sw](../../../sw/docs/routing/REASONING_ROUTING.md) · 🇮🇳 [ta](../../../ta/docs/routing/REASONING_ROUTING.md) · 🇮🇳 [te](../../../te/docs/routing/REASONING_ROUTING.md) · 🇹🇭 [th](../../../th/docs/routing/REASONING_ROUTING.md) · 🇹🇷 [tr](../../../tr/docs/routing/REASONING_ROUTING.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/routing/REASONING_ROUTING.md) · 🇵🇰 [ur](../../../ur/docs/routing/REASONING_ROUTING.md) · 🇺🇿 [uz](../../../uz/docs/routing/REASONING_ROUTING.md) · 🇻🇳 [vi](../../../vi/docs/routing/REASONING_ROUTING.md) · 🇳🇬 [yo](../../../yo/docs/routing/REASONING_ROUTING.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/routing/REASONING_ROUTING.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/routing/REASONING_ROUTING.md)

---

Regels voor reasoning-routering breiden de bestaande model- en combo-routering uit. Wanneer geen actieve regel overeenkomt, blijft het bestaande gedrag voor thinking, suffixen, standaardverbindingen en providervertaling ongewijzigd.

## Beheer

Regelbeheer is beschikbaar onder **Instellingen → Globale routering**. De API-sleuteleditor biedt dezelfde beheerinterface, gefilterd op de geselecteerde sleutel.

De beheer-API is beschikbaar via deze routes:

- `GET` en `POST` op `/api/settings/reasoning-routing-rules`
- `GET`, `PATCH` en `DELETE` op `/api/settings/reasoning-routing-rules/[id]`
- `POST` op `/api/settings/reasoning-routing-rules/simulate`

Alle routes gebruiken `requireManagementAuth`. Invoer wordt gevalideerd met de schema's in `src/shared/validation/schemas/reasoningRouting.ts`. De simulator voert nooit een upstreamaanroep uit.

## Regelresolutie

De vroege evaluatie selecteert precies één regel. Scopes worden in deze volgorde gecontroleerd:

1. `apiKey`
2. `combo`
3. `model`
4. `global`

Binnen een scope krijgt een hogere `priority` eerst voorrang, gevolgd door een exacte modelovereenkomst boven een globpatroon en vervolgens een stabiele volgorde op basis van `createdAt` en `id`. `requestTags` worden uitsluitend uit `metadata.tags` gelezen en ondersteunen overeenkomsten met `any` of `all`.

Een `connection`-regel wordt alleen geëvalueerd wanneer geen vroege regel heeft gewonnen en er al een concrete providerverbinding is geselecteerd. Deze regel mag alleen de inspanning en het budget wijzigen.

## Inspanning en budget

`sourceEffort` accepteert `any`, `missing`, `none`, `low`, `medium`, `high`, `xhigh`, `max` en `ultra`. `missing` betekent dat de aanvraag noch een afzonderlijke inspanningswaarde, noch een thinking-schakelaar of thinking-budget bevat. Een signaal dat alleen uit een budget bestaat, wordt daarom uitsluitend door `any` gematcht.

`effortMode` heeft drie varianten:

- `inherit` behoudt de inspanning van de client, terwijl het model of de combo nog steeds mag worden gewijzigd.
- `default` stelt `targetEffort` alleen in wanneer er geen expliciet reasoningsignaal aanwezig is.
- `force` vervangt de afzonderlijke inspanningswaarde door `targetEffort`.

Onafhankelijk daarvan kan `budgetAction` de waarde `preserve`, `remove` of `set` hebben. `force` met `none` verwijdert alle herkende inspannings- en budgetvelden. `none` in combinatie met `set` is ongeldig.

Aanvragen die zijn gericht op modellen waarvan bekend is dat ze incompatibel zijn, worden vóór de upstreamaanroep afgewezen. Voor combodoelen worden incompatibele vermeldingen verwijderd; als er geen overblijven, retourneert de aanvraag status `400`. Onbekende capaciteitsgegevens leiden tot een waarschuwing en laten de regel actief.

## Beveiliging en transporten

Het bron- en doelmodel, of de bron- en doelcombo, blijven onderworpen aan het bestaande API-sleutelbeleid. Een reasoningregel breidt de model-, combo- of quotamachtigingen nooit uit.

De engine is geïntegreerd in Chat Completions, Responses, Anthropic Messages en het interne Codex WebSocket-pad. Het WebSocket-pad accepteert alleen Codex-doelmodellen; combodoelen kunnen daar niet worden uitgevoerd. De regelbeslissing wordt zonder geheimen opgeslagen in de bestaande routeringstracering.

## Persistentie

De migratie `src/lib/db/migrations/126_reasoning_routing_rules.sql` maakt de tabel `reasoning_routing_rules` aan. Regels verwijzen naar opgeslagen API-sleutels, combo's en providerverbindingen. Bij verwijderingen worden gerelateerde regels opgeschoond. De databasetoegangslaag in `src/lib/db/reasoningRoutingRules.ts` onderhoudt een invalideerbare cache voor het aanvraagpad.

Regels worden opgenomen in SQLite-back-ups, de volledige database-export en de config-syncbundel. `reconcileReasoningRulesForSync` schakelt geïmporteerde regels met ontbrekende verwijzingen uit en rapporteert deze conflicten.
