# Reasoning Routing (Dansk)

🌐 **Languages:** 🇺🇸 [English](../../../../routing/REASONING_ROUTING.md) · 🇪🇹 [am](../../../am/docs/routing/REASONING_ROUTING.md) · 🇸🇦 [ar](../../../ar/docs/routing/REASONING_ROUTING.md) · 🇦🇿 [az](../../../az/docs/routing/REASONING_ROUTING.md) · 🇧🇬 [bg](../../../bg/docs/routing/REASONING_ROUTING.md) · 🇧🇩 [bn](../../../bn/docs/routing/REASONING_ROUTING.md) · 🇨🇿 [cs](../../../cs/docs/routing/REASONING_ROUTING.md) · 🇩🇪 [de](../../../de/docs/routing/REASONING_ROUTING.md) · 🇬🇷 [el](../../../el/docs/routing/REASONING_ROUTING.md) · 🇪🇸 [es](../../../es/docs/routing/REASONING_ROUTING.md) · 🇪🇪 [et](../../../et/docs/routing/REASONING_ROUTING.md) · 🇮🇷 [fa](../../../fa/docs/routing/REASONING_ROUTING.md) · 🇫🇮 [fi](../../../fi/docs/routing/REASONING_ROUTING.md) · 🇫🇷 [fr](../../../fr/docs/routing/REASONING_ROUTING.md) · 🇮🇪 [ga](../../../ga/docs/routing/REASONING_ROUTING.md) · 🇮🇳 [gu](../../../gu/docs/routing/REASONING_ROUTING.md) · 🇳🇬 [ha](../../../ha/docs/routing/REASONING_ROUTING.md) · 🇮🇱 [he](../../../he/docs/routing/REASONING_ROUTING.md) · 🇮🇳 [hi](../../../hi/docs/routing/REASONING_ROUTING.md) · 🇭🇷 [hr](../../../hr/docs/routing/REASONING_ROUTING.md) · 🇭🇺 [hu](../../../hu/docs/routing/REASONING_ROUTING.md) · 🇦🇲 [hy](../../../hy/docs/routing/REASONING_ROUTING.md) · 🇮🇩 [id](../../../id/docs/routing/REASONING_ROUTING.md) · 🇳🇬 [ig](../../../ig/docs/routing/REASONING_ROUTING.md) · 🇮🇹 [it](../../../it/docs/routing/REASONING_ROUTING.md) · 🇯🇵 [ja](../../../ja/docs/routing/REASONING_ROUTING.md) · 🇬🇪 [ka](../../../ka/docs/routing/REASONING_ROUTING.md) · 🇰🇭 [km](../../../km/docs/routing/REASONING_ROUTING.md) · 🇮🇳 [kn](../../../kn/docs/routing/REASONING_ROUTING.md) · 🇰🇷 [ko](../../../ko/docs/routing/REASONING_ROUTING.md) · 🇱🇹 [lt](../../../lt/docs/routing/REASONING_ROUTING.md) · 🇱🇻 [lv](../../../lv/docs/routing/REASONING_ROUTING.md) · 🇮🇳 [ml](../../../ml/docs/routing/REASONING_ROUTING.md) · 🇮🇳 [mr](../../../mr/docs/routing/REASONING_ROUTING.md) · 🇲🇾 [ms](../../../ms/docs/routing/REASONING_ROUTING.md) · 🇲🇹 [mt](../../../mt/docs/routing/REASONING_ROUTING.md) · 🇲🇲 [my](../../../my/docs/routing/REASONING_ROUTING.md) · 🇳🇵 [ne](../../../ne/docs/routing/REASONING_ROUTING.md) · 🇳🇱 [nl](../../../nl/docs/routing/REASONING_ROUTING.md) · 🇳🇴 [no](../../../no/docs/routing/REASONING_ROUTING.md) · 🇮🇳 [or](../../../or/docs/routing/REASONING_ROUTING.md) · 🇮🇳 [pa](../../../pa/docs/routing/REASONING_ROUTING.md) · 🇵🇭 [phi](../../../phi/docs/routing/REASONING_ROUTING.md) · 🇵🇱 [pl](../../../pl/docs/routing/REASONING_ROUTING.md) · 🇵🇹 [pt](../../../pt/docs/routing/REASONING_ROUTING.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/routing/REASONING_ROUTING.md) · 🇷🇴 [ro](../../../ro/docs/routing/REASONING_ROUTING.md) · 🇷🇺 [ru](../../../ru/docs/routing/REASONING_ROUTING.md) · 🇱🇰 [si](../../../si/docs/routing/REASONING_ROUTING.md) · 🇸🇰 [sk](../../../sk/docs/routing/REASONING_ROUTING.md) · 🇸🇮 [sl](../../../sl/docs/routing/REASONING_ROUTING.md) · 🇷🇸 [sr](../../../sr/docs/routing/REASONING_ROUTING.md) · 🇸🇪 [sv](../../../sv/docs/routing/REASONING_ROUTING.md) · 🇰🇪 [sw](../../../sw/docs/routing/REASONING_ROUTING.md) · 🇮🇳 [ta](../../../ta/docs/routing/REASONING_ROUTING.md) · 🇮🇳 [te](../../../te/docs/routing/REASONING_ROUTING.md) · 🇹🇭 [th](../../../th/docs/routing/REASONING_ROUTING.md) · 🇹🇷 [tr](../../../tr/docs/routing/REASONING_ROUTING.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/routing/REASONING_ROUTING.md) · 🇵🇰 [ur](../../../ur/docs/routing/REASONING_ROUTING.md) · 🇺🇿 [uz](../../../uz/docs/routing/REASONING_ROUTING.md) · 🇻🇳 [vi](../../../vi/docs/routing/REASONING_ROUTING.md) · 🇳🇬 [yo](../../../yo/docs/routing/REASONING_ROUTING.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/routing/REASONING_ROUTING.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/routing/REASONING_ROUTING.md)

---

Regler for ræsonneringsrouting udvider den eksisterende model- og kombinationsrouting. Når ingen aktiv regel matcher,
forbliver den eksisterende adfærd for tænkning, suffiks, forbindelsesstandard og udbyderoversættelse
uændret.

## Administration

Regeladministration er tilgængelig under **Indstillinger → Global routing**. API-nøgleeditoren indeholder den
samme administrationsgrænseflade filtreret efter den valgte nøgle.

Administrations-API'et eksponeres via disse ruter:

- `GET` og `POST` på `/api/settings/reasoning-routing-rules`
- `GET`, `PATCH` og `DELETE` på `/api/settings/reasoning-routing-rules/[id]`
- `POST` på `/api/settings/reasoning-routing-rules/simulate`

Alle ruter bruger `requireManagementAuth`. Input valideres med skemaerne i
`src/shared/validation/schemas/reasoningRouting.ts`. Simulatoren foretager aldrig et upstream-kald.

## Regelbestemmelse

Den tidlige evaluering vælger præcis én regel. Omfang kontrolleres i denne rækkefølge:

1. `apiKey`
2. `combo`
3. `model`
4. `global`

Inden for et omfang vinder en højere `priority` først, efterfulgt af et nøjagtigt modelmatch frem for et globmønster
og derefter stabil sortering efter `createdAt` og `id`. `requestTags` læses udelukkende fra `metadata.tags`
og understøtter matchning med `any` eller `all`.

En `connection`-regel evalueres kun, når ingen tidlig regel vandt, og en konkret udbyderforbindelse allerede
er valgt. Den kan kun ændre indsats og budget.

## Indsats og budget

`sourceEffort` accepterer `any`, `missing`, `none`, `low`, `medium`, `high`, `xhigh`, `max` og
`ultra`. `missing` betyder, at anmodningen hverken indeholder et særskilt indsatsniveau, en tænkningstil/fra-indstilling
eller et tænkningsbudget. Et signal, der kun angiver et budget, matches derfor kun af `any`.

`effortMode` har tre varianter:

- `inherit` bevarer klientens indsatsniveau, mens modellen eller kombinationen stadig kan ændres.
- `default` angiver kun `targetEffort`, når der ikke findes noget eksplicit ræsonneringssignal.
- `force` erstatter det særskilte indsatsniveau med `targetEffort`.

Uafhængigt heraf kan `budgetAction` være `preserve`, `remove` eller `set`. `force` med `none` fjerner
alle genkendte indsats- og budgetfelter. `none` sammen med `set` er ugyldigt.

Anmodninger, der er målrettet modeller med kendt inkompatibilitet, afvises før upstream-kaldet. For kombinationsmål
fjernes inkompatible poster. Hvis ingen er tilbage, returnerer anmodningen status `400`.
Ukendte kapabilitetsdata genererer en advarsel og lader reglen forblive aktiv.

## Sikkerhed og transportprotokoller

Kilde- og målmodellen eller kilde- og målkombinationen er fortsat underlagt den eksisterende API-nøglepolitik.
En ræsonneringsregel udvider aldrig tilladelser til modeller, kombinationer eller kvoter.

Motoren er integreret i Chat Completions, Responses, Anthropic Messages og den interne
Codex WebSocket-sti. WebSocket-stien accepterer kun Codex-målmodeller. Kombinationsmål kan ikke
køres der. Regelbeslutningen gemmes uden hemmeligheder i den eksisterende rutesporing.

## Persistens

Migreringen `src/lib/db/migrations/126_reasoning_routing_rules.sql` opretter tabellen
`reasoning_routing_rules`. Regler refererer til gemte API-nøgler, kombinationer og udbyderforbindelser.
Sletninger rydder op i relaterede regler. Databaseadgangslaget i
`src/lib/db/reasoningRoutingRules.ts` vedligeholder en cache, der kan ugyldiggøres, til anmodningsstien.

Regler medtages i SQLite-sikkerhedskopier, den fulde databaseeksport og config-sync-pakken.
`reconcileReasoningRulesForSync` deaktiverer importerede regler med manglende referencer og rapporterer disse
konflikter.
