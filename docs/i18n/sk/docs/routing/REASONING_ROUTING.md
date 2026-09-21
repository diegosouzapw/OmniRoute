# Reasoning Routing (Slovenčina)

🌐 **Languages:** 🇺🇸 [English](../../../../routing/REASONING_ROUTING.md) · 🇪🇹 [am](../../../am/docs/routing/REASONING_ROUTING.md) · 🇸🇦 [ar](../../../ar/docs/routing/REASONING_ROUTING.md) · 🇦🇿 [az](../../../az/docs/routing/REASONING_ROUTING.md) · 🇧🇬 [bg](../../../bg/docs/routing/REASONING_ROUTING.md) · 🇧🇩 [bn](../../../bn/docs/routing/REASONING_ROUTING.md) · 🇨🇿 [cs](../../../cs/docs/routing/REASONING_ROUTING.md) · 🇩🇰 [da](../../../da/docs/routing/REASONING_ROUTING.md) · 🇩🇪 [de](../../../de/docs/routing/REASONING_ROUTING.md) · 🇬🇷 [el](../../../el/docs/routing/REASONING_ROUTING.md) · 🇪🇸 [es](../../../es/docs/routing/REASONING_ROUTING.md) · 🇪🇪 [et](../../../et/docs/routing/REASONING_ROUTING.md) · 🇮🇷 [fa](../../../fa/docs/routing/REASONING_ROUTING.md) · 🇫🇮 [fi](../../../fi/docs/routing/REASONING_ROUTING.md) · 🇫🇷 [fr](../../../fr/docs/routing/REASONING_ROUTING.md) · 🇮🇪 [ga](../../../ga/docs/routing/REASONING_ROUTING.md) · 🇮🇳 [gu](../../../gu/docs/routing/REASONING_ROUTING.md) · 🇳🇬 [ha](../../../ha/docs/routing/REASONING_ROUTING.md) · 🇮🇱 [he](../../../he/docs/routing/REASONING_ROUTING.md) · 🇮🇳 [hi](../../../hi/docs/routing/REASONING_ROUTING.md) · 🇭🇷 [hr](../../../hr/docs/routing/REASONING_ROUTING.md) · 🇭🇺 [hu](../../../hu/docs/routing/REASONING_ROUTING.md) · 🇦🇲 [hy](../../../hy/docs/routing/REASONING_ROUTING.md) · 🇮🇩 [id](../../../id/docs/routing/REASONING_ROUTING.md) · 🇳🇬 [ig](../../../ig/docs/routing/REASONING_ROUTING.md) · 🇮🇹 [it](../../../it/docs/routing/REASONING_ROUTING.md) · 🇯🇵 [ja](../../../ja/docs/routing/REASONING_ROUTING.md) · 🇬🇪 [ka](../../../ka/docs/routing/REASONING_ROUTING.md) · 🇰🇭 [km](../../../km/docs/routing/REASONING_ROUTING.md) · 🇮🇳 [kn](../../../kn/docs/routing/REASONING_ROUTING.md) · 🇰🇷 [ko](../../../ko/docs/routing/REASONING_ROUTING.md) · 🇱🇹 [lt](../../../lt/docs/routing/REASONING_ROUTING.md) · 🇱🇻 [lv](../../../lv/docs/routing/REASONING_ROUTING.md) · 🇮🇳 [ml](../../../ml/docs/routing/REASONING_ROUTING.md) · 🇮🇳 [mr](../../../mr/docs/routing/REASONING_ROUTING.md) · 🇲🇾 [ms](../../../ms/docs/routing/REASONING_ROUTING.md) · 🇲🇹 [mt](../../../mt/docs/routing/REASONING_ROUTING.md) · 🇲🇲 [my](../../../my/docs/routing/REASONING_ROUTING.md) · 🇳🇵 [ne](../../../ne/docs/routing/REASONING_ROUTING.md) · 🇳🇱 [nl](../../../nl/docs/routing/REASONING_ROUTING.md) · 🇳🇴 [no](../../../no/docs/routing/REASONING_ROUTING.md) · 🇮🇳 [or](../../../or/docs/routing/REASONING_ROUTING.md) · 🇮🇳 [pa](../../../pa/docs/routing/REASONING_ROUTING.md) · 🇵🇭 [phi](../../../phi/docs/routing/REASONING_ROUTING.md) · 🇵🇱 [pl](../../../pl/docs/routing/REASONING_ROUTING.md) · 🇵🇹 [pt](../../../pt/docs/routing/REASONING_ROUTING.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/routing/REASONING_ROUTING.md) · 🇷🇴 [ro](../../../ro/docs/routing/REASONING_ROUTING.md) · 🇷🇺 [ru](../../../ru/docs/routing/REASONING_ROUTING.md) · 🇱🇰 [si](../../../si/docs/routing/REASONING_ROUTING.md) · 🇸🇮 [sl](../../../sl/docs/routing/REASONING_ROUTING.md) · 🇷🇸 [sr](../../../sr/docs/routing/REASONING_ROUTING.md) · 🇸🇪 [sv](../../../sv/docs/routing/REASONING_ROUTING.md) · 🇰🇪 [sw](../../../sw/docs/routing/REASONING_ROUTING.md) · 🇮🇳 [ta](../../../ta/docs/routing/REASONING_ROUTING.md) · 🇮🇳 [te](../../../te/docs/routing/REASONING_ROUTING.md) · 🇹🇭 [th](../../../th/docs/routing/REASONING_ROUTING.md) · 🇹🇷 [tr](../../../tr/docs/routing/REASONING_ROUTING.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/routing/REASONING_ROUTING.md) · 🇵🇰 [ur](../../../ur/docs/routing/REASONING_ROUTING.md) · 🇺🇿 [uz](../../../uz/docs/routing/REASONING_ROUTING.md) · 🇻🇳 [vi](../../../vi/docs/routing/REASONING_ROUTING.md) · 🇳🇬 [yo](../../../yo/docs/routing/REASONING_ROUTING.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/routing/REASONING_ROUTING.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/routing/REASONING_ROUTING.md)

---

Pravidlá smerovania uvažovania rozširujú existujúce smerovanie modelov a kombinácií. Ak sa nezhoduje žiadne aktívne pravidlo,
existujúce správanie týkajúce sa uvažovania, prípony, predvoleného pripojenia a prekladu poskytovateľa zostáva
nezmenené.

## Správa

Správa pravidiel je dostupná v časti **Nastavenia → Globálne smerovanie**. Editor API kľúčov poskytuje
rovnaké používateľské rozhranie správy filtrované podľa vybraného kľúča.

API na správu je dostupné prostredníctvom týchto trás:

- `GET` a `POST` na `/api/settings/reasoning-routing-rules`
- `GET`, `PATCH` a `DELETE` na `/api/settings/reasoning-routing-rules/[id]`
- `POST` na `/api/settings/reasoning-routing-rules/simulate`

Všetky trasy používajú `requireManagementAuth`. Vstupy sa overujú pomocou schém v
`src/shared/validation/schemas/reasoningRouting.ts`. Simulátor nikdy nevykonáva volanie do nadradenej služby.

## Vyhodnocovanie pravidiel

Včasné vyhodnotenie vyberie presne jedno pravidlo. Rozsahy sa kontrolujú v tomto poradí:

1. `apiKey`
2. `combo`
3. `model`
4. `global`

V rámci rozsahu má najprv prednosť vyššia hodnota `priority`, potom presná zhoda modelu pred vzorom glob
a následne stabilné poradie podľa `createdAt` a `id`. Hodnoty `requestTags` sa čítajú výhradne z `metadata.tags`
a podporujú zhodu `any` alebo `all`.

Pravidlo `connection` sa vyhodnotí iba vtedy, keď nezvíťazilo žiadne skoršie pravidlo a už bolo vybrané
konkrétne pripojenie poskytovateľa. Môže zmeniť iba úsilie a rozpočet.

## Úsilie a rozpočet

`sourceEffort` prijíma hodnoty `any`, `missing`, `none`, `low`, `medium`, `high`, `xhigh`, `max` a
`ultra`. Hodnota `missing` znamená, že požiadavka neobsahuje ani samostatnú úroveň úsilia, ani prepínač
uvažovania, ani rozpočet na uvažovanie. Signál obsahujúci iba rozpočet sa preto zhoduje len s hodnotou `any`.

`effortMode` má tri varianty:

- `inherit` zachová úsilie klienta, pričom stále umožňuje zmenu modelu alebo kombinácie.
- `default` nastaví `targetEffort` iba vtedy, keď nie je prítomný žiadny explicitný signál uvažovania.
- `force` nahradí samostatnú úroveň úsilia hodnotou `targetEffort`.

Nezávisle od toho môže mať `budgetAction` hodnotu `preserve`, `remove` alebo `set`. Hodnota `force`
spolu s `none` odstráni všetky rozpoznané polia úsilia a rozpočtu. Kombinácia `none` s `set` je neplatná.

Požiadavky smerujúce na známe nekompatibilné modely sa odmietnu ešte pred volaním nadradenej služby.
V prípade cieľových kombinácií sa nekompatibilné položky odstránia; ak nezostane žiadna, požiadavka vráti
stav `400`. Neznáme údaje o schopnostiach spôsobia upozornenie a pravidlo zostane aktívne.

## Zabezpečenie a transporty

Zdrojový a cieľový model alebo zdrojová a cieľová kombinácia naďalej podliehajú existujúcim pravidlám
API kľúča. Pravidlo uvažovania nikdy nerozširuje oprávnenia pre modely, kombinácie ani kvóty.

Mechanizmus je integrovaný do Chat Completions, Responses, Anthropic Messages a internej cesty
Codex WebSocket. Cesta WebSocket prijíma iba cieľové modely Codex; cieľové kombinácie v nej nemožno
spustiť. Rozhodnutie pravidla sa uloží do existujúceho záznamu trasy bez tajných údajov.

## Perzistencia

Migrácia `src/lib/db/migrations/126_reasoning_routing_rules.sql` vytvára tabuľku
`reasoning_routing_rules`. Pravidlá odkazujú na uložené API kľúče, kombinácie a pripojenia poskytovateľov.
Odstránením sa vyčistia súvisiace pravidlá. Vrstva prístupu k databáze v
`src/lib/db/reasoningRoutingRules.ts` udržiava zneplatniteľnú vyrovnávaciu pamäť pre cestu požiadavky.

Pravidlá sú zahrnuté v zálohách SQLite, úplnom exporte databázy a balíku synchronizácie konfigurácie.
`reconcileReasoningRulesForSync` deaktivuje importované pravidlá s chýbajúcimi odkazmi a hlási tieto
konflikty.
