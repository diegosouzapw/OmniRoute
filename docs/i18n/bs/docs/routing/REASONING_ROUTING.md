# REASONING_ROUTING (Bosanski)

🌐 **Languages:** 🇺🇸 [English](../../../../routing/REASONING_ROUTING.md) · 🇪🇹 [am](../../../am/docs/routing/REASONING_ROUTING.md) · 🇸🇦 [ar](../../../ar/docs/routing/REASONING_ROUTING.md) · 🇦🇿 [az](../../../az/docs/routing/REASONING_ROUTING.md) · 🇧🇬 [bg](../../../bg/docs/routing/REASONING_ROUTING.md) · 🇧🇩 [bn](../../../bn/docs/routing/REASONING_ROUTING.md) · 🇨🇿 [cs](../../../cs/docs/routing/REASONING_ROUTING.md) · 🇩🇰 [da](../../../da/docs/routing/REASONING_ROUTING.md) · 🇩🇪 [de](../../../de/docs/routing/REASONING_ROUTING.md) · 🇬🇷 [el](../../../el/docs/routing/REASONING_ROUTING.md) · 🇪🇸 [es](../../../es/docs/routing/REASONING_ROUTING.md) · 🇪🇪 [et](../../../et/docs/routing/REASONING_ROUTING.md) · 🇮🇷 [fa](../../../fa/docs/routing/REASONING_ROUTING.md) · 🇫🇮 [fi](../../../fi/docs/routing/REASONING_ROUTING.md) · 🇫🇷 [fr](../../../fr/docs/routing/REASONING_ROUTING.md) · 🇮🇪 [ga](../../../ga/docs/routing/REASONING_ROUTING.md) · 🇮🇳 [gu](../../../gu/docs/routing/REASONING_ROUTING.md) · 🇳🇬 [ha](../../../ha/docs/routing/REASONING_ROUTING.md) · 🇮🇱 [he](../../../he/docs/routing/REASONING_ROUTING.md) · 🇮🇳 [hi](../../../hi/docs/routing/REASONING_ROUTING.md) · 🇭🇷 [hr](../../../hr/docs/routing/REASONING_ROUTING.md) · 🇭🇺 [hu](../../../hu/docs/routing/REASONING_ROUTING.md) · 🇦🇲 [hy](../../../hy/docs/routing/REASONING_ROUTING.md) · 🇮🇩 [id](../../../id/docs/routing/REASONING_ROUTING.md) · 🇳🇬 [ig](../../../ig/docs/routing/REASONING_ROUTING.md) · 🇮🇹 [it](../../../it/docs/routing/REASONING_ROUTING.md) · 🇯🇵 [ja](../../../ja/docs/routing/REASONING_ROUTING.md) · 🇬🇪 [ka](../../../ka/docs/routing/REASONING_ROUTING.md) · 🇰🇭 [km](../../../km/docs/routing/REASONING_ROUTING.md) · 🇮🇳 [kn](../../../kn/docs/routing/REASONING_ROUTING.md) · 🇰🇷 [ko](../../../ko/docs/routing/REASONING_ROUTING.md) · 🇱🇹 [lt](../../../lt/docs/routing/REASONING_ROUTING.md) · 🇱🇻 [lv](../../../lv/docs/routing/REASONING_ROUTING.md) · 🇮🇳 [ml](../../../ml/docs/routing/REASONING_ROUTING.md) · 🇮🇳 [mr](../../../mr/docs/routing/REASONING_ROUTING.md) · 🇲🇾 [ms](../../../ms/docs/routing/REASONING_ROUTING.md) · 🇲🇹 [mt](../../../mt/docs/routing/REASONING_ROUTING.md) · 🇲🇲 [my](../../../my/docs/routing/REASONING_ROUTING.md) · 🇳🇵 [ne](../../../ne/docs/routing/REASONING_ROUTING.md) · 🇳🇱 [nl](../../../nl/docs/routing/REASONING_ROUTING.md) · 🇳🇴 [no](../../../no/docs/routing/REASONING_ROUTING.md) · 🇮🇳 [or](../../../or/docs/routing/REASONING_ROUTING.md) · 🇮🇳 [pa](../../../pa/docs/routing/REASONING_ROUTING.md) · 🇵🇭 [phi](../../../phi/docs/routing/REASONING_ROUTING.md) · 🇵🇱 [pl](../../../pl/docs/routing/REASONING_ROUTING.md) · 🇵🇹 [pt](../../../pt/docs/routing/REASONING_ROUTING.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/routing/REASONING_ROUTING.md) · 🇷🇴 [ro](../../../ro/docs/routing/REASONING_ROUTING.md) · 🇷🇺 [ru](../../../ru/docs/routing/REASONING_ROUTING.md) · 🇱🇰 [si](../../../si/docs/routing/REASONING_ROUTING.md) · 🇸🇰 [sk](../../../sk/docs/routing/REASONING_ROUTING.md) · 🇸🇮 [sl](../../../sl/docs/routing/REASONING_ROUTING.md) · 🇷🇸 [sr](../../../sr/docs/routing/REASONING_ROUTING.md) · 🇸🇪 [sv](../../../sv/docs/routing/REASONING_ROUTING.md) · 🇰🇪 [sw](../../../sw/docs/routing/REASONING_ROUTING.md) · 🇮🇳 [ta](../../../ta/docs/routing/REASONING_ROUTING.md) · 🇮🇳 [te](../../../te/docs/routing/REASONING_ROUTING.md) · 🇹🇭 [th](../../../th/docs/routing/REASONING_ROUTING.md) · 🇹🇷 [tr](../../../tr/docs/routing/REASONING_ROUTING.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/routing/REASONING_ROUTING.md) · 🇵🇰 [ur](../../../ur/docs/routing/REASONING_ROUTING.md) · 🇺🇿 [uz](../../../uz/docs/routing/REASONING_ROUTING.md) · 🇻🇳 [vi](../../../vi/docs/routing/REASONING_ROUTING.md) · 🇳🇬 [yo](../../../yo/docs/routing/REASONING_ROUTING.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/routing/REASONING_ROUTING.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/routing/REASONING_ROUTING.md)

---

# Usmjeravanje rezonovanja

Pravila usmjeravanja rezonovanja proširuju postojeće usmjeravanje modela i kombinacija. Kada se ne podudara nijedno aktivno pravilo, postojeće ponašanje za thinking, suffix, connection-default i provider-translation ostaje nepromijenjeno.

## Upravljanje

Upravljanje pravilima je dostupno pod **Settings → Global Routing**. Uređivač API ključeva pruža isti korisnički interfejs za upravljanje filtriran prema odabranom ključu.

API za upravljanje je izložen putem ovih ruta:

- `GET` i `POST` na `/api/settings/reasoning-routing-rules`
- `GET`, `PATCH` i `DELETE` na `/api/settings/reasoning-routing-rules/[id]`
- `POST` na `/api/settings/reasoning-routing-rules/simulate`

Sve rute koriste `requireManagementAuth`. Ulazni podaci se validiraju pomoću šema u `src/shared/validation/schemas/reasoningRouting.ts`. Simulator nikada ne pravi uzvodni poziv.

## Razrješenje pravila

Rana evaluacija bira tačno jedno pravilo. Opsezi se provjeravaju ovim redoslijedom:

1. `apiKey`
2. `combo`
3. `model`
4. `global`

Unutar opsega, veći `priority` pobjeđuje prvi, nakon čega slijedi tačno podudaranje modela u odnosu na glob uzorak, a zatim stabilno `createdAt` i `id` redoslijed. `requestTags` se čitaju isključivo iz `metadata.tags` i podržavaju `any` ili `all` podudaranje.

`connection` pravilo se evaluira samo kada nijedno rano pravilo nije pobijedilo i kada je već odabrana konkretna konekcija provajdera. Ono može promijeniti samo napor (effort) i budžet.

## Napor i budžet

`sourceEffort` prihvata `any`, `missing`, `none`, `low`, `medium`, `high`, `xhigh`, `max` i `ultra`. `missing` znači da zahtjev ne sadrži ni diskretni napor, ni prekidač za razmišljanje (thinking toggle), ni budžet za razmišljanje. Signal samo za budžet se stoga podudara samo sa `any`.

`effortMode` ima tri varijante:

- `inherit` zadržava napor klijenta dok i dalje dozvoljava promjenu modela ili kombinacije.
- `default` postavlja `targetEffort` samo kada nije prisutan eksplicitan signal rezonovanja.
- `force` zamjenjuje diskretni napor sa `targetEffort`.

Nezavisno od toga, `budgetAction` može biti `preserve`, `remove` ili `set`. `force` sa `none` uklanja sva prepoznata polja napora i budžeta. `none` zajedno sa `set` je nevažeće.

Zahtjevi koji ciljaju poznate nekompatibilne modele se odbijaju prije uzvodnog poziva. Za ciljeve kombinacija, nekompatibilni unosi se uklanjaju; ako nijedan ne ostane, zahtjev vraća status `400`. Nepoznati podaci o mogućnostima proizvode upozorenje i ostavljaju pravilo aktivnim.

## Sigurnost i transporti

Izvorni i ciljni model, ili izvorna i ciljna kombinacija, ostaju podložni postojećoj politici API ključeva. Pravilo rezonovanja nikada ne proširuje dozvole za model, kombinaciju ili kvotu.

Mehanizam je integrisan u Chat Completions, Responses, Anthropic Messages i internu Codex WebSocket putanju. WebSocket putanja prihvata samo Codex ciljne modele; ciljevi kombinacija se ne mogu izvršiti tamo. Odluka o pravilu se pohranjuje u postojeći trag rute bez tajni.

## Trajnost

Migracija `src/lib/db/migrations/126_reasoning_routing_rules.sql` kreira tabelu `reasoning_routing_rules`. Pravila referenciraju pohranjene API ključeve, kombinacije i konekcije provajdera. Brisanja čiste povezana pravila. Sloj za pristup bazi podataka u `src/lib/db/reasoningRoutingRules.ts` održava keš koji se može poništiti za putanju zahtjeva.

Pravila su uključena u SQLite sigurnosne kopije, puni izvoz baze podataka i config-sync paket. `reconcileReasoningRulesForSync` onemogućava uvezena pravila sa nedostajućim referencama i prijavljuje te konflikte.
