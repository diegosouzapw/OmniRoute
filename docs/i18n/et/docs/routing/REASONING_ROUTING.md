# Reasoning Routing (Eesti)

🌐 **Languages:** 🇺🇸 [English](../../../../routing/REASONING_ROUTING.md) · 🇪🇹 [am](../../../am/docs/routing/REASONING_ROUTING.md) · 🇸🇦 [ar](../../../ar/docs/routing/REASONING_ROUTING.md) · 🇦🇿 [az](../../../az/docs/routing/REASONING_ROUTING.md) · 🇧🇬 [bg](../../../bg/docs/routing/REASONING_ROUTING.md) · 🇧🇩 [bn](../../../bn/docs/routing/REASONING_ROUTING.md) · 🇨🇿 [cs](../../../cs/docs/routing/REASONING_ROUTING.md) · 🇩🇰 [da](../../../da/docs/routing/REASONING_ROUTING.md) · 🇩🇪 [de](../../../de/docs/routing/REASONING_ROUTING.md) · 🇬🇷 [el](../../../el/docs/routing/REASONING_ROUTING.md) · 🇪🇸 [es](../../../es/docs/routing/REASONING_ROUTING.md) · 🇮🇷 [fa](../../../fa/docs/routing/REASONING_ROUTING.md) · 🇫🇮 [fi](../../../fi/docs/routing/REASONING_ROUTING.md) · 🇫🇷 [fr](../../../fr/docs/routing/REASONING_ROUTING.md) · 🇮🇪 [ga](../../../ga/docs/routing/REASONING_ROUTING.md) · 🇮🇳 [gu](../../../gu/docs/routing/REASONING_ROUTING.md) · 🇳🇬 [ha](../../../ha/docs/routing/REASONING_ROUTING.md) · 🇮🇱 [he](../../../he/docs/routing/REASONING_ROUTING.md) · 🇮🇳 [hi](../../../hi/docs/routing/REASONING_ROUTING.md) · 🇭🇷 [hr](../../../hr/docs/routing/REASONING_ROUTING.md) · 🇭🇺 [hu](../../../hu/docs/routing/REASONING_ROUTING.md) · 🇦🇲 [hy](../../../hy/docs/routing/REASONING_ROUTING.md) · 🇮🇩 [id](../../../id/docs/routing/REASONING_ROUTING.md) · 🇳🇬 [ig](../../../ig/docs/routing/REASONING_ROUTING.md) · 🇮🇹 [it](../../../it/docs/routing/REASONING_ROUTING.md) · 🇯🇵 [ja](../../../ja/docs/routing/REASONING_ROUTING.md) · 🇬🇪 [ka](../../../ka/docs/routing/REASONING_ROUTING.md) · 🇰🇭 [km](../../../km/docs/routing/REASONING_ROUTING.md) · 🇮🇳 [kn](../../../kn/docs/routing/REASONING_ROUTING.md) · 🇰🇷 [ko](../../../ko/docs/routing/REASONING_ROUTING.md) · 🇱🇹 [lt](../../../lt/docs/routing/REASONING_ROUTING.md) · 🇱🇻 [lv](../../../lv/docs/routing/REASONING_ROUTING.md) · 🇮🇳 [ml](../../../ml/docs/routing/REASONING_ROUTING.md) · 🇮🇳 [mr](../../../mr/docs/routing/REASONING_ROUTING.md) · 🇲🇾 [ms](../../../ms/docs/routing/REASONING_ROUTING.md) · 🇲🇹 [mt](../../../mt/docs/routing/REASONING_ROUTING.md) · 🇲🇲 [my](../../../my/docs/routing/REASONING_ROUTING.md) · 🇳🇵 [ne](../../../ne/docs/routing/REASONING_ROUTING.md) · 🇳🇱 [nl](../../../nl/docs/routing/REASONING_ROUTING.md) · 🇳🇴 [no](../../../no/docs/routing/REASONING_ROUTING.md) · 🇮🇳 [or](../../../or/docs/routing/REASONING_ROUTING.md) · 🇮🇳 [pa](../../../pa/docs/routing/REASONING_ROUTING.md) · 🇵🇭 [phi](../../../phi/docs/routing/REASONING_ROUTING.md) · 🇵🇱 [pl](../../../pl/docs/routing/REASONING_ROUTING.md) · 🇵🇹 [pt](../../../pt/docs/routing/REASONING_ROUTING.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/routing/REASONING_ROUTING.md) · 🇷🇴 [ro](../../../ro/docs/routing/REASONING_ROUTING.md) · 🇷🇺 [ru](../../../ru/docs/routing/REASONING_ROUTING.md) · 🇱🇰 [si](../../../si/docs/routing/REASONING_ROUTING.md) · 🇸🇰 [sk](../../../sk/docs/routing/REASONING_ROUTING.md) · 🇸🇮 [sl](../../../sl/docs/routing/REASONING_ROUTING.md) · 🇷🇸 [sr](../../../sr/docs/routing/REASONING_ROUTING.md) · 🇸🇪 [sv](../../../sv/docs/routing/REASONING_ROUTING.md) · 🇰🇪 [sw](../../../sw/docs/routing/REASONING_ROUTING.md) · 🇮🇳 [ta](../../../ta/docs/routing/REASONING_ROUTING.md) · 🇮🇳 [te](../../../te/docs/routing/REASONING_ROUTING.md) · 🇹🇭 [th](../../../th/docs/routing/REASONING_ROUTING.md) · 🇹🇷 [tr](../../../tr/docs/routing/REASONING_ROUTING.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/routing/REASONING_ROUTING.md) · 🇵🇰 [ur](../../../ur/docs/routing/REASONING_ROUTING.md) · 🇺🇿 [uz](../../../uz/docs/routing/REASONING_ROUTING.md) · 🇻🇳 [vi](../../../vi/docs/routing/REASONING_ROUTING.md) · 🇳🇬 [yo](../../../yo/docs/routing/REASONING_ROUTING.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/routing/REASONING_ROUTING.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/routing/REASONING_ROUTING.md)

---

Põhjenduse marsruutimise reeglid laiendavad olemasolevat mudeli- ja kombinatsioonipõhist marsruutimist. Kui ükski aktiivne reegel ei sobi,
jääb olemasolev mõtlemise, sufiksi, ühenduse vaikeväärtuse ja teenusepakkuja tõlkimise käitumine
muutmata.

## Haldus

Reegleid saab hallata jaotises **Seaded → Globaalne marsruutimine**. API-võtme redaktor pakub sama
haldusliidest, mis on filtreeritud valitud võtme järgi.

Halduse API on saadaval järgmiste marsruutide kaudu:

- `GET` ja `POST` aadressil `/api/settings/reasoning-routing-rules`
- `GET`, `PATCH` ja `DELETE` aadressil `/api/settings/reasoning-routing-rules/[id]`
- `POST` aadressil `/api/settings/reasoning-routing-rules/simulate`

Kõik marsruudid kasutavad funktsiooni `requireManagementAuth`. Sisendeid valideeritakse failis
`src/shared/validation/schemas/reasoningRouting.ts` olevate skeemidega. Simulaator ei tee kunagi ülesvoolupäringut.

## Reegli lahendamine

Varajane hindamine valib täpselt ühe reegli. Ulatusi kontrollitakse järgmises järjekorras:

1. `apiKey`
2. `combo`
3. `model`
4. `global`

Ulatuse piires võidab esmalt suurem `priority`, seejärel mudeli täpne vaste glob-mustrile,
ning siis stabiilne järjestus väljade `createdAt` ja `id` alusel. `requestTags` loetakse ainult väljast `metadata.tags`
ning need toetavad vastendamist režiimis `any` või `all`.

Reeglit `connection` hinnatakse ainult siis, kui ükski varajane reegel ei võitnud ja konkreetne teenusepakkuja ühendus on
juba valitud. See võib muuta ainult pingutustaset ja eelarvet.

## Pingutustase ja eelarve

`sourceEffort` aktsepteerib väärtusi `any`, `missing`, `none`, `low`, `medium`, `high`, `xhigh`, `max` ja
`ultra`. `missing` tähendab, et päring ei sisalda eraldiseisvat pingutustaset, mõtlemise lülitit
ega mõtlemise eelarvet. Seetõttu vastendatakse ainult eelarve signaal üksnes väärtusega `any`.

Väljal `effortMode` on kolm varianti:

- `inherit` säilitab kliendi pingutustaseme, võimaldades samal ajal mudelit või kombinatsiooni muuta.
- `default` määrab `targetEffort` ainult siis, kui otsest põhjendussignaali pole.
- `force` asendab eraldiseisva pingutustaseme väärtusega `targetEffort`.

Sellest sõltumatult võib `budgetAction` olla `preserve`, `remove` või `set`. `force` koos väärtusega `none` eemaldab
kõik tuvastatud pingutustaseme- ja eelarveväljad. `none` koos väärtusega `set` ei ole lubatud.

Teadaolevalt ühildumatutele mudelitele suunatud päringud lükatakse enne ülesvoolupäringut tagasi. Kombinatsiooni
sihtmärkide puhul eemaldatakse ühildumatud kirjed; kui ühtegi ei jää alles, tagastab päring oleku `400`.
Tundmatud võimekusandmed tekitavad hoiatuse ja reegel jääb aktiivseks.

## Turvalisus ja transpordid

Lähte- ja sihtmudelile või lähte- ja sihtkombinatsioonile kehtib endiselt olemasolev API-võtme
poliitika. Põhjendusreegel ei laienda kunagi mudeli-, kombinatsiooni- ega kvoodiõigusi.

Mootor on integreeritud Chat Completionsi, Responsesi, Anthropic Messagesi ja sisemisse
Codexi WebSocketi teekonda. WebSocketi teekond aktsepteerib ainult Codexi sihtmudeleid; kombinatsiooni sihtmärke ei saa
seal käivitada. Reegli otsus salvestatakse olemasolevasse marsruudi jälitusse ilma saladusteta.

## Püsimälu

Migratsioon `src/lib/db/migrations/126_reasoning_routing_rules.sql` loob tabeli
`reasoning_routing_rules`. Reeglid viitavad salvestatud API-võtmetele, kombinatsioonidele ja teenusepakkuja ühendustele.
Kustutamisel eemaldatakse seotud reeglid. Andmebaasi juurdepääsukiht failis
`src/lib/db/reasoningRoutingRules.ts` haldab päringutee jaoks tühistatavat vahemälu.

Reeglid kaasatakse SQLite'i varukoopiatesse, täielikku andmebaasi eksporti ja konfiguratsiooni sünkroonimispaketti.
`reconcileReasoningRulesForSync` keelab imporditud reeglid, millel puuduvad viited, ja teatab nendest
konfliktidest.
