# Reasoning Routing (Lietuvių)

🌐 **Languages:** 🇺🇸 [English](../../../../routing/REASONING_ROUTING.md) · 🇪🇹 [am](../../../am/docs/routing/REASONING_ROUTING.md) · 🇸🇦 [ar](../../../ar/docs/routing/REASONING_ROUTING.md) · 🇦🇿 [az](../../../az/docs/routing/REASONING_ROUTING.md) · 🇧🇬 [bg](../../../bg/docs/routing/REASONING_ROUTING.md) · 🇧🇩 [bn](../../../bn/docs/routing/REASONING_ROUTING.md) · 🇨🇿 [cs](../../../cs/docs/routing/REASONING_ROUTING.md) · 🇩🇰 [da](../../../da/docs/routing/REASONING_ROUTING.md) · 🇩🇪 [de](../../../de/docs/routing/REASONING_ROUTING.md) · 🇬🇷 [el](../../../el/docs/routing/REASONING_ROUTING.md) · 🇪🇸 [es](../../../es/docs/routing/REASONING_ROUTING.md) · 🇪🇪 [et](../../../et/docs/routing/REASONING_ROUTING.md) · 🇮🇷 [fa](../../../fa/docs/routing/REASONING_ROUTING.md) · 🇫🇮 [fi](../../../fi/docs/routing/REASONING_ROUTING.md) · 🇫🇷 [fr](../../../fr/docs/routing/REASONING_ROUTING.md) · 🇮🇪 [ga](../../../ga/docs/routing/REASONING_ROUTING.md) · 🇮🇳 [gu](../../../gu/docs/routing/REASONING_ROUTING.md) · 🇳🇬 [ha](../../../ha/docs/routing/REASONING_ROUTING.md) · 🇮🇱 [he](../../../he/docs/routing/REASONING_ROUTING.md) · 🇮🇳 [hi](../../../hi/docs/routing/REASONING_ROUTING.md) · 🇭🇷 [hr](../../../hr/docs/routing/REASONING_ROUTING.md) · 🇭🇺 [hu](../../../hu/docs/routing/REASONING_ROUTING.md) · 🇦🇲 [hy](../../../hy/docs/routing/REASONING_ROUTING.md) · 🇮🇩 [id](../../../id/docs/routing/REASONING_ROUTING.md) · 🇳🇬 [ig](../../../ig/docs/routing/REASONING_ROUTING.md) · 🇮🇹 [it](../../../it/docs/routing/REASONING_ROUTING.md) · 🇯🇵 [ja](../../../ja/docs/routing/REASONING_ROUTING.md) · 🇬🇪 [ka](../../../ka/docs/routing/REASONING_ROUTING.md) · 🇰🇭 [km](../../../km/docs/routing/REASONING_ROUTING.md) · 🇮🇳 [kn](../../../kn/docs/routing/REASONING_ROUTING.md) · 🇰🇷 [ko](../../../ko/docs/routing/REASONING_ROUTING.md) · 🇱🇻 [lv](../../../lv/docs/routing/REASONING_ROUTING.md) · 🇮🇳 [ml](../../../ml/docs/routing/REASONING_ROUTING.md) · 🇮🇳 [mr](../../../mr/docs/routing/REASONING_ROUTING.md) · 🇲🇾 [ms](../../../ms/docs/routing/REASONING_ROUTING.md) · 🇲🇹 [mt](../../../mt/docs/routing/REASONING_ROUTING.md) · 🇲🇲 [my](../../../my/docs/routing/REASONING_ROUTING.md) · 🇳🇵 [ne](../../../ne/docs/routing/REASONING_ROUTING.md) · 🇳🇱 [nl](../../../nl/docs/routing/REASONING_ROUTING.md) · 🇳🇴 [no](../../../no/docs/routing/REASONING_ROUTING.md) · 🇮🇳 [or](../../../or/docs/routing/REASONING_ROUTING.md) · 🇮🇳 [pa](../../../pa/docs/routing/REASONING_ROUTING.md) · 🇵🇭 [phi](../../../phi/docs/routing/REASONING_ROUTING.md) · 🇵🇱 [pl](../../../pl/docs/routing/REASONING_ROUTING.md) · 🇵🇹 [pt](../../../pt/docs/routing/REASONING_ROUTING.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/routing/REASONING_ROUTING.md) · 🇷🇴 [ro](../../../ro/docs/routing/REASONING_ROUTING.md) · 🇷🇺 [ru](../../../ru/docs/routing/REASONING_ROUTING.md) · 🇱🇰 [si](../../../si/docs/routing/REASONING_ROUTING.md) · 🇸🇰 [sk](../../../sk/docs/routing/REASONING_ROUTING.md) · 🇸🇮 [sl](../../../sl/docs/routing/REASONING_ROUTING.md) · 🇷🇸 [sr](../../../sr/docs/routing/REASONING_ROUTING.md) · 🇸🇪 [sv](../../../sv/docs/routing/REASONING_ROUTING.md) · 🇰🇪 [sw](../../../sw/docs/routing/REASONING_ROUTING.md) · 🇮🇳 [ta](../../../ta/docs/routing/REASONING_ROUTING.md) · 🇮🇳 [te](../../../te/docs/routing/REASONING_ROUTING.md) · 🇹🇭 [th](../../../th/docs/routing/REASONING_ROUTING.md) · 🇹🇷 [tr](../../../tr/docs/routing/REASONING_ROUTING.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/routing/REASONING_ROUTING.md) · 🇵🇰 [ur](../../../ur/docs/routing/REASONING_ROUTING.md) · 🇺🇿 [uz](../../../uz/docs/routing/REASONING_ROUTING.md) · 🇻🇳 [vi](../../../vi/docs/routing/REASONING_ROUTING.md) · 🇳🇬 [yo](../../../yo/docs/routing/REASONING_ROUTING.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/routing/REASONING_ROUTING.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/routing/REASONING_ROUTING.md)

---

Samprotavimo maršruto parinkimo taisyklės papildo esamą modelių ir kombinacijų maršruto parinkimą. Kai neatitinka jokia aktyvi taisyklė,
esama samprotavimo, priesagų, numatytųjų ryšio reikšmių ir teikėjo transformavimo elgsena lieka
nepakitusi.

## Valdymas

Taisykles galima valdyti skiltyje **Nustatymai → Visuotinis maršruto parinkimas**. API rakto rengyklėje pateikiama
ta pati valdymo sąsaja, filtruojama pagal pasirinktą raktą.

Valdymo API pasiekiama šiais maršrutais:

- `GET` ir `POST` adresu `/api/settings/reasoning-routing-rules`
- `GET`, `PATCH` ir `DELETE` adresu `/api/settings/reasoning-routing-rules/[id]`
- `POST` adresu `/api/settings/reasoning-routing-rules/simulate`

Visuose maršrutuose naudojama `requireManagementAuth`. Įvestys tikrinamos pagal schemas, esančias
`src/shared/validation/schemas/reasoningRouting.ts`. Simuliatorius niekada nesiunčia užklausos išorinei sistemai.

## Taisyklės parinkimas

Ankstyvojo vertinimo metu parenkama tiksliai viena taisyklė. Taikymo sritys tikrinamos šia tvarka:

1. `apiKey`
2. `combo`
3. `model`
4. `global`

Taikymo srityje pirmiausia laimi aukštesnė `priority` reikšmė, tada tikslus modelio atitikmuo turi pirmenybę prieš glob šabloną,
o po to taikoma stabili `createdAt` ir `id` rikiavimo tvarka. `requestTags` skaitomos tik iš `metadata.tags`
ir palaiko `any` arba `all` atitiktį.

`connection` taisyklė vertinama tik tada, kai nelaimėjo jokia ankstyvojo vertinimo taisyklė ir jau buvo
pasirinktas konkretus teikėjo ryšys. Ji gali pakeisti tik samprotavimo intensyvumą ir biudžetą.

## Samprotavimo intensyvumas ir biudžetas

`sourceEffort` priima `any`, `missing`, `none`, `low`, `medium`, `high`, `xhigh`, `max` ir
`ultra`. `missing` reiškia, kad užklausoje nėra nei atskiro samprotavimo intensyvumo, nei samprotavimo perjungiklio,
nei samprotavimo biudžeto. Todėl tik biudžetą nurodantis signalas atitinka tik `any`.

`effortMode` turi tris variantus:

- `inherit` išlaiko kliento samprotavimo intensyvumą, kartu leisdamas pakeisti modelį arba kombinaciją.
- `default` nustato `targetEffort` tik tada, kai nėra aiškiai pateikto samprotavimo signalo.
- `force` pakeičia atskirą samprotavimo intensyvumą į `targetEffort`.

Nepriklausomai nuo to, `budgetAction` gali būti `preserve`, `remove` arba `set`. `force` su `none` pašalina
visus atpažįstamus samprotavimo intensyvumo ir biudžeto laukus. `none` kartu su `set` yra neleistinas derinys.

Užklausos, skirtos žinomiems nesuderinamiems modeliams, atmetamos prieš siunčiant jas išorinei sistemai. Kai taikinys yra kombinacija,
nesuderinami įrašai pašalinami; jei jų nelieka, užklausa grąžina būseną `400`.
Kai nėra galimybių duomenų, pateikiamas įspėjimas, o taisyklė lieka aktyvi.

## Saugumas ir perdavimo būdai

Šaltinio ir tiksliniam modeliui arba šaltinio ir tikslinei kombinacijai toliau taikoma esama API rakto
politika. Samprotavimo taisyklė niekada neišplečia modelių, kombinacijų ar kvotų leidimų.

Variklis integruotas į „Chat Completions“, „Responses“, „Anthropic Messages“ ir vidinį
„Codex WebSocket“ kelią. „WebSocket“ kelias priima tik tikslinius „Codex“ modelius; kombinacijų taikinių
jame vykdyti negalima. Taisyklės sprendimas saugomas esamame maršruto sekimo įraše be slaptų duomenų.

## Išsaugojimas

Migracija `src/lib/db/migrations/126_reasoning_routing_rules.sql` sukuria
`reasoning_routing_rules` lentelę. Taisyklės nurodo saugomus API raktus, kombinacijas ir teikėjų ryšius.
Ištrynus susijusius objektus, susijusios taisyklės taip pat pašalinamos. Duomenų bazės prieigos sluoksnis
`src/lib/db/reasoningRoutingRules.ts` užklausų keliui palaiko talpyklą, kurią galima pripažinti nebegaliojančia.

Taisyklės įtraukiamos į SQLite atsargines kopijas, visos duomenų bazės eksportą ir konfigūracijos sinchronizavimo paketą.
`reconcileReasoningRulesForSync` išjungia importuotas taisykles, kurioms trūksta nuorodų, ir praneša apie šiuos
konfliktus.
