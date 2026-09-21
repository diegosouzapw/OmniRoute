# Reasoning Routing (Hrvatski)

🌐 **Languages:** 🇺🇸 [English](../../../../routing/REASONING_ROUTING.md) · 🇪🇹 [am](../../../am/docs/routing/REASONING_ROUTING.md) · 🇸🇦 [ar](../../../ar/docs/routing/REASONING_ROUTING.md) · 🇦🇿 [az](../../../az/docs/routing/REASONING_ROUTING.md) · 🇧🇬 [bg](../../../bg/docs/routing/REASONING_ROUTING.md) · 🇧🇩 [bn](../../../bn/docs/routing/REASONING_ROUTING.md) · 🇨🇿 [cs](../../../cs/docs/routing/REASONING_ROUTING.md) · 🇩🇰 [da](../../../da/docs/routing/REASONING_ROUTING.md) · 🇩🇪 [de](../../../de/docs/routing/REASONING_ROUTING.md) · 🇬🇷 [el](../../../el/docs/routing/REASONING_ROUTING.md) · 🇪🇸 [es](../../../es/docs/routing/REASONING_ROUTING.md) · 🇪🇪 [et](../../../et/docs/routing/REASONING_ROUTING.md) · 🇮🇷 [fa](../../../fa/docs/routing/REASONING_ROUTING.md) · 🇫🇮 [fi](../../../fi/docs/routing/REASONING_ROUTING.md) · 🇫🇷 [fr](../../../fr/docs/routing/REASONING_ROUTING.md) · 🇮🇪 [ga](../../../ga/docs/routing/REASONING_ROUTING.md) · 🇮🇳 [gu](../../../gu/docs/routing/REASONING_ROUTING.md) · 🇳🇬 [ha](../../../ha/docs/routing/REASONING_ROUTING.md) · 🇮🇱 [he](../../../he/docs/routing/REASONING_ROUTING.md) · 🇮🇳 [hi](../../../hi/docs/routing/REASONING_ROUTING.md) · 🇭🇺 [hu](../../../hu/docs/routing/REASONING_ROUTING.md) · 🇦🇲 [hy](../../../hy/docs/routing/REASONING_ROUTING.md) · 🇮🇩 [id](../../../id/docs/routing/REASONING_ROUTING.md) · 🇳🇬 [ig](../../../ig/docs/routing/REASONING_ROUTING.md) · 🇮🇹 [it](../../../it/docs/routing/REASONING_ROUTING.md) · 🇯🇵 [ja](../../../ja/docs/routing/REASONING_ROUTING.md) · 🇬🇪 [ka](../../../ka/docs/routing/REASONING_ROUTING.md) · 🇰🇭 [km](../../../km/docs/routing/REASONING_ROUTING.md) · 🇮🇳 [kn](../../../kn/docs/routing/REASONING_ROUTING.md) · 🇰🇷 [ko](../../../ko/docs/routing/REASONING_ROUTING.md) · 🇱🇹 [lt](../../../lt/docs/routing/REASONING_ROUTING.md) · 🇱🇻 [lv](../../../lv/docs/routing/REASONING_ROUTING.md) · 🇮🇳 [ml](../../../ml/docs/routing/REASONING_ROUTING.md) · 🇮🇳 [mr](../../../mr/docs/routing/REASONING_ROUTING.md) · 🇲🇾 [ms](../../../ms/docs/routing/REASONING_ROUTING.md) · 🇲🇹 [mt](../../../mt/docs/routing/REASONING_ROUTING.md) · 🇲🇲 [my](../../../my/docs/routing/REASONING_ROUTING.md) · 🇳🇵 [ne](../../../ne/docs/routing/REASONING_ROUTING.md) · 🇳🇱 [nl](../../../nl/docs/routing/REASONING_ROUTING.md) · 🇳🇴 [no](../../../no/docs/routing/REASONING_ROUTING.md) · 🇮🇳 [or](../../../or/docs/routing/REASONING_ROUTING.md) · 🇮🇳 [pa](../../../pa/docs/routing/REASONING_ROUTING.md) · 🇵🇭 [phi](../../../phi/docs/routing/REASONING_ROUTING.md) · 🇵🇱 [pl](../../../pl/docs/routing/REASONING_ROUTING.md) · 🇵🇹 [pt](../../../pt/docs/routing/REASONING_ROUTING.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/routing/REASONING_ROUTING.md) · 🇷🇴 [ro](../../../ro/docs/routing/REASONING_ROUTING.md) · 🇷🇺 [ru](../../../ru/docs/routing/REASONING_ROUTING.md) · 🇱🇰 [si](../../../si/docs/routing/REASONING_ROUTING.md) · 🇸🇰 [sk](../../../sk/docs/routing/REASONING_ROUTING.md) · 🇸🇮 [sl](../../../sl/docs/routing/REASONING_ROUTING.md) · 🇷🇸 [sr](../../../sr/docs/routing/REASONING_ROUTING.md) · 🇸🇪 [sv](../../../sv/docs/routing/REASONING_ROUTING.md) · 🇰🇪 [sw](../../../sw/docs/routing/REASONING_ROUTING.md) · 🇮🇳 [ta](../../../ta/docs/routing/REASONING_ROUTING.md) · 🇮🇳 [te](../../../te/docs/routing/REASONING_ROUTING.md) · 🇹🇭 [th](../../../th/docs/routing/REASONING_ROUTING.md) · 🇹🇷 [tr](../../../tr/docs/routing/REASONING_ROUTING.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/routing/REASONING_ROUTING.md) · 🇵🇰 [ur](../../../ur/docs/routing/REASONING_ROUTING.md) · 🇺🇿 [uz](../../../uz/docs/routing/REASONING_ROUTING.md) · 🇻🇳 [vi](../../../vi/docs/routing/REASONING_ROUTING.md) · 🇳🇬 [yo](../../../yo/docs/routing/REASONING_ROUTING.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/routing/REASONING_ROUTING.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/routing/REASONING_ROUTING.md)

---

Pravila usmjeravanja zaključivanja proširuju postojeće usmjeravanje modela i kombinacija. Kada se nijedno aktivno pravilo ne podudara,
postojeće ponašanje za razmišljanje, sufikse, zadane postavke veze i prevođenje pružatelja usluge ostaje
nepromijenjeno.

## Upravljanje

Upravljanje pravilima dostupno je u odjeljku **Postavke → Globalno usmjeravanje**. Uređivač API ključeva pruža isto
upravljačko sučelje filtrirano prema odabranom ključu.

API za upravljanje dostupan je putem ovih ruta:

- `GET` i `POST` na `/api/settings/reasoning-routing-rules`
- `GET`, `PATCH` i `DELETE` na `/api/settings/reasoning-routing-rules/[id]`
- `POST` na `/api/settings/reasoning-routing-rules/simulate`

Sve rute upotrebljavaju `requireManagementAuth`. Ulazi se provjeravaju pomoću shema u
`src/shared/validation/schemas/reasoningRouting.ts`. Simulator nikada ne upućuje poziv nadređenoj usluzi.

## Razrješavanje pravila

Rana evaluacija odabire točno jedno pravilo. Opsezi se provjeravaju ovim redoslijedom:

1. `apiKey`
2. `combo`
3. `model`
4. `global`

Unutar opsega prvo pobjeđuje viši `priority`, zatim točno podudaranje modela u odnosu na glob uzorak,
pa stabilan redoslijed prema `createdAt` i `id`. `requestTags` se čitaju isključivo iz `metadata.tags`
i podržavaju podudaranje `any` ili `all`.

Pravilo `connection` evaluira se samo kada nijedno rano pravilo nije pobijedilo i kada je konkretna veza s pružateljem
već odabrana. Ono može promijeniti samo razinu napora i proračun.

## Napor i proračun

`sourceEffort` prihvaća `any`, `missing`, `none`, `low`, `medium`, `high`, `xhigh`, `max` i
`ultra`. `missing` znači da zahtjev ne sadrži ni diskretnu razinu napora, ni prekidač za razmišljanje,
ni proračun za razmišljanje. Stoga se signal koji sadrži samo proračun podudara jedino s `any`.

`effortMode` ima tri varijante:

- `inherit` zadržava razinu napora klijenta, a istodobno i dalje omogućuje promjenu modela ili kombinacije.
- `default` postavlja `targetEffort` samo kada nije prisutan eksplicitan signal zaključivanja.
- `force` zamjenjuje diskretnu razinu napora vrijednošću `targetEffort`.

Neovisno o tome, `budgetAction` može biti `preserve`, `remove` ili `set`. `force` s vrijednošću `none` uklanja
sva prepoznata polja napora i proračuna. `none` zajedno sa `set` nije valjano.

Zahtjevi usmjereni na poznate nekompatibilne modele odbijaju se prije poziva nadređenoj usluzi. Za ciljne
kombinacije uklanjaju se nekompatibilne stavke; ako nijedna ne preostane, zahtjev vraća status `400`.
Nepoznati podaci o mogućnostima generiraju upozorenje i ostavljaju pravilo aktivnim.

## Sigurnost i prijenosi

Izvorni i ciljni model, odnosno izvorna i ciljna kombinacija, i dalje podliježu postojećim pravilima
API ključa. Pravilo zaključivanja nikada ne proširuje dopuštenja za modele, kombinacije ili kvote.

Mehanizam je integriran u Chat Completions, Responses, Anthropic Messages i interni
Codex WebSocket put. WebSocket put prihvaća samo ciljne Codex modele; ciljne kombinacije ondje se ne mogu
izvršavati. Odluka pravila pohranjuje se u postojećem tragu rute bez tajnih podataka.

## Trajna pohrana

Migracija `src/lib/db/migrations/126_reasoning_routing_rules.sql` stvara tablicu
`reasoning_routing_rules`. Pravila se pozivaju na pohranjene API ključeve, kombinacije i veze s pružateljima.
Brisanjem se uklanjaju povezana pravila. Sloj za pristup bazi podataka u
`src/lib/db/reasoningRoutingRules.ts` održava predmemoriju za put zahtjeva koju je moguće poništiti.

Pravila su uključena u sigurnosne kopije SQLitea, potpuni izvoz baze podataka i paket za sinkronizaciju konfiguracije.
`reconcileReasoningRulesForSync` onemogućuje uvezena pravila kojima nedostaju reference i prijavljuje te
sukobe.
