# Reasoning Routing (Svenska)

🌐 **Languages:** 🇺🇸 [English](../../../../routing/REASONING_ROUTING.md) · 🇪🇹 [am](../../../am/docs/routing/REASONING_ROUTING.md) · 🇸🇦 [ar](../../../ar/docs/routing/REASONING_ROUTING.md) · 🇦🇿 [az](../../../az/docs/routing/REASONING_ROUTING.md) · 🇧🇬 [bg](../../../bg/docs/routing/REASONING_ROUTING.md) · 🇧🇩 [bn](../../../bn/docs/routing/REASONING_ROUTING.md) · 🇨🇿 [cs](../../../cs/docs/routing/REASONING_ROUTING.md) · 🇩🇰 [da](../../../da/docs/routing/REASONING_ROUTING.md) · 🇩🇪 [de](../../../de/docs/routing/REASONING_ROUTING.md) · 🇬🇷 [el](../../../el/docs/routing/REASONING_ROUTING.md) · 🇪🇸 [es](../../../es/docs/routing/REASONING_ROUTING.md) · 🇪🇪 [et](../../../et/docs/routing/REASONING_ROUTING.md) · 🇮🇷 [fa](../../../fa/docs/routing/REASONING_ROUTING.md) · 🇫🇮 [fi](../../../fi/docs/routing/REASONING_ROUTING.md) · 🇫🇷 [fr](../../../fr/docs/routing/REASONING_ROUTING.md) · 🇮🇪 [ga](../../../ga/docs/routing/REASONING_ROUTING.md) · 🇮🇳 [gu](../../../gu/docs/routing/REASONING_ROUTING.md) · 🇳🇬 [ha](../../../ha/docs/routing/REASONING_ROUTING.md) · 🇮🇱 [he](../../../he/docs/routing/REASONING_ROUTING.md) · 🇮🇳 [hi](../../../hi/docs/routing/REASONING_ROUTING.md) · 🇭🇷 [hr](../../../hr/docs/routing/REASONING_ROUTING.md) · 🇭🇺 [hu](../../../hu/docs/routing/REASONING_ROUTING.md) · 🇦🇲 [hy](../../../hy/docs/routing/REASONING_ROUTING.md) · 🇮🇩 [id](../../../id/docs/routing/REASONING_ROUTING.md) · 🇳🇬 [ig](../../../ig/docs/routing/REASONING_ROUTING.md) · 🇮🇹 [it](../../../it/docs/routing/REASONING_ROUTING.md) · 🇯🇵 [ja](../../../ja/docs/routing/REASONING_ROUTING.md) · 🇬🇪 [ka](../../../ka/docs/routing/REASONING_ROUTING.md) · 🇰🇭 [km](../../../km/docs/routing/REASONING_ROUTING.md) · 🇮🇳 [kn](../../../kn/docs/routing/REASONING_ROUTING.md) · 🇰🇷 [ko](../../../ko/docs/routing/REASONING_ROUTING.md) · 🇱🇹 [lt](../../../lt/docs/routing/REASONING_ROUTING.md) · 🇱🇻 [lv](../../../lv/docs/routing/REASONING_ROUTING.md) · 🇮🇳 [ml](../../../ml/docs/routing/REASONING_ROUTING.md) · 🇮🇳 [mr](../../../mr/docs/routing/REASONING_ROUTING.md) · 🇲🇾 [ms](../../../ms/docs/routing/REASONING_ROUTING.md) · 🇲🇹 [mt](../../../mt/docs/routing/REASONING_ROUTING.md) · 🇲🇲 [my](../../../my/docs/routing/REASONING_ROUTING.md) · 🇳🇵 [ne](../../../ne/docs/routing/REASONING_ROUTING.md) · 🇳🇱 [nl](../../../nl/docs/routing/REASONING_ROUTING.md) · 🇳🇴 [no](../../../no/docs/routing/REASONING_ROUTING.md) · 🇮🇳 [or](../../../or/docs/routing/REASONING_ROUTING.md) · 🇮🇳 [pa](../../../pa/docs/routing/REASONING_ROUTING.md) · 🇵🇭 [phi](../../../phi/docs/routing/REASONING_ROUTING.md) · 🇵🇱 [pl](../../../pl/docs/routing/REASONING_ROUTING.md) · 🇵🇹 [pt](../../../pt/docs/routing/REASONING_ROUTING.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/routing/REASONING_ROUTING.md) · 🇷🇴 [ro](../../../ro/docs/routing/REASONING_ROUTING.md) · 🇷🇺 [ru](../../../ru/docs/routing/REASONING_ROUTING.md) · 🇱🇰 [si](../../../si/docs/routing/REASONING_ROUTING.md) · 🇸🇰 [sk](../../../sk/docs/routing/REASONING_ROUTING.md) · 🇸🇮 [sl](../../../sl/docs/routing/REASONING_ROUTING.md) · 🇷🇸 [sr](../../../sr/docs/routing/REASONING_ROUTING.md) · 🇰🇪 [sw](../../../sw/docs/routing/REASONING_ROUTING.md) · 🇮🇳 [ta](../../../ta/docs/routing/REASONING_ROUTING.md) · 🇮🇳 [te](../../../te/docs/routing/REASONING_ROUTING.md) · 🇹🇭 [th](../../../th/docs/routing/REASONING_ROUTING.md) · 🇹🇷 [tr](../../../tr/docs/routing/REASONING_ROUTING.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/routing/REASONING_ROUTING.md) · 🇵🇰 [ur](../../../ur/docs/routing/REASONING_ROUTING.md) · 🇺🇿 [uz](../../../uz/docs/routing/REASONING_ROUTING.md) · 🇻🇳 [vi](../../../vi/docs/routing/REASONING_ROUTING.md) · 🇳🇬 [yo](../../../yo/docs/routing/REASONING_ROUTING.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/routing/REASONING_ROUTING.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/routing/REASONING_ROUTING.md)

---

Regler för resonemangsroutning utökar den befintliga modell- och kombinationsroutningen. När ingen aktiv regel matchar förblir det befintliga beteendet för tänkande, suffix, standardanslutning och leverantörsöversättning oförändrat.

## Hantering

Regelhantering är tillgänglig under **Inställningar → Global routning**. API-nyckelredigeraren tillhandahåller samma hanteringsgränssnitt filtrerat efter den valda nyckeln.

Hanterings-API:et exponeras via följande routes:

- `GET` och `POST` på `/api/settings/reasoning-routing-rules`
- `GET`, `PATCH` och `DELETE` på `/api/settings/reasoning-routing-rules/[id]`
- `POST` på `/api/settings/reasoning-routing-rules/simulate`

Alla routes använder `requireManagementAuth`. Indata valideras med schemana i `src/shared/validation/schemas/reasoningRouting.ts`. Simulatorn gör aldrig något anrop till en uppströmsleverantör.

## Regelmatchning

Den tidiga utvärderingen väljer exakt en regel. Omfattningar kontrolleras i följande ordning:

1. `apiKey`
2. `combo`
3. `model`
4. `global`

Inom en omfattning vinner högre `priority` först, följt av en exakt modellmatchning framför ett globmönster och därefter en stabil sortering efter `createdAt` och `id`. `requestTags` läses enbart från `metadata.tags` och stöder matchning med `any` eller `all`.

En `connection`-regel utvärderas endast när ingen tidig regel har valts och en konkret leverantörsanslutning redan har valts. Den får endast ändra ansträngningsnivå och budget.

## Ansträngningsnivå och budget

`sourceEffort` accepterar `any`, `missing`, `none`, `low`, `medium`, `high`, `xhigh`, `max` och `ultra`. `missing` innebär att begäran varken innehåller en diskret ansträngningsnivå, en aktivering eller inaktivering av tänkande eller en budget för tänkande. En signal som enbart består av en budget matchas därför endast av `any`.

`effortMode` har tre varianter:

- `inherit` behåller klientens ansträngningsnivå samtidigt som modellen eller kombinationen fortfarande kan ändras.
- `default` anger `targetEffort` endast när ingen explicit resonemangssignal finns.
- `force` ersätter den diskreta ansträngningsnivån med `targetEffort`.

Oberoende av detta kan `budgetAction` vara `preserve`, `remove` eller `set`. `force` med `none` tar bort alla identifierade fält för ansträngningsnivå och budget. `none` tillsammans med `set` är ogiltigt.

Begäranden riktade mot modeller som är kända för att vara inkompatibla avvisas före anropet till uppströmsleverantören. För kombinationsmål tas inkompatibla poster bort; om inga återstår returnerar begäran status `400`. Okända kapabilitetsdata genererar en varning och lämnar regeln aktiv.

## Säkerhet och transporter

Käll- och målmodellen, eller käll- och målkombinationen, omfattas fortfarande av den befintliga API-nyckelpolicyn. En resonemangsregel utökar aldrig behörigheter för modeller, kombinationer eller kvoter.

Motorn är integrerad i Chat Completions, Responses, Anthropic Messages och den interna Codex WebSocket-sökvägen. WebSocket-sökvägen accepterar endast Codex-målmodeller; kombinationsmål kan inte köras där. Regelbeslutet lagras i den befintliga routningsspårningen utan hemligheter.

## Persistens

Migreringen `src/lib/db/migrations/126_reasoning_routing_rules.sql` skapar tabellen `reasoning_routing_rules`. Regler refererar till lagrade API-nycklar, kombinationer och leverantörsanslutningar. Borttagningar rensar relaterade regler. Databasåtkomstlagret i `src/lib/db/reasoningRoutingRules.ts` upprätthåller en cache som kan invalideras för begärandesökvägen.

Regler inkluderas i SQLite-säkerhetskopior, den fullständiga databasexporten och konfigurationssynkroniseringspaketet. `reconcileReasoningRulesForSync` inaktiverar importerade regler med saknade referenser och rapporterar dessa konflikter.
