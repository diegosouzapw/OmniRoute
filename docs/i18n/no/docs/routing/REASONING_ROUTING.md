# Reasoning Routing (Norsk)

🌐 **Languages:** 🇺🇸 [English](../../../../routing/REASONING_ROUTING.md) · 🇪🇹 [am](../../../am/docs/routing/REASONING_ROUTING.md) · 🇸🇦 [ar](../../../ar/docs/routing/REASONING_ROUTING.md) · 🇦🇿 [az](../../../az/docs/routing/REASONING_ROUTING.md) · 🇧🇬 [bg](../../../bg/docs/routing/REASONING_ROUTING.md) · 🇧🇩 [bn](../../../bn/docs/routing/REASONING_ROUTING.md) · 🇨🇿 [cs](../../../cs/docs/routing/REASONING_ROUTING.md) · 🇩🇰 [da](../../../da/docs/routing/REASONING_ROUTING.md) · 🇩🇪 [de](../../../de/docs/routing/REASONING_ROUTING.md) · 🇬🇷 [el](../../../el/docs/routing/REASONING_ROUTING.md) · 🇪🇸 [es](../../../es/docs/routing/REASONING_ROUTING.md) · 🇪🇪 [et](../../../et/docs/routing/REASONING_ROUTING.md) · 🇮🇷 [fa](../../../fa/docs/routing/REASONING_ROUTING.md) · 🇫🇮 [fi](../../../fi/docs/routing/REASONING_ROUTING.md) · 🇫🇷 [fr](../../../fr/docs/routing/REASONING_ROUTING.md) · 🇮🇪 [ga](../../../ga/docs/routing/REASONING_ROUTING.md) · 🇮🇳 [gu](../../../gu/docs/routing/REASONING_ROUTING.md) · 🇳🇬 [ha](../../../ha/docs/routing/REASONING_ROUTING.md) · 🇮🇱 [he](../../../he/docs/routing/REASONING_ROUTING.md) · 🇮🇳 [hi](../../../hi/docs/routing/REASONING_ROUTING.md) · 🇭🇷 [hr](../../../hr/docs/routing/REASONING_ROUTING.md) · 🇭🇺 [hu](../../../hu/docs/routing/REASONING_ROUTING.md) · 🇦🇲 [hy](../../../hy/docs/routing/REASONING_ROUTING.md) · 🇮🇩 [id](../../../id/docs/routing/REASONING_ROUTING.md) · 🇳🇬 [ig](../../../ig/docs/routing/REASONING_ROUTING.md) · 🇮🇹 [it](../../../it/docs/routing/REASONING_ROUTING.md) · 🇯🇵 [ja](../../../ja/docs/routing/REASONING_ROUTING.md) · 🇬🇪 [ka](../../../ka/docs/routing/REASONING_ROUTING.md) · 🇰🇭 [km](../../../km/docs/routing/REASONING_ROUTING.md) · 🇮🇳 [kn](../../../kn/docs/routing/REASONING_ROUTING.md) · 🇰🇷 [ko](../../../ko/docs/routing/REASONING_ROUTING.md) · 🇱🇹 [lt](../../../lt/docs/routing/REASONING_ROUTING.md) · 🇱🇻 [lv](../../../lv/docs/routing/REASONING_ROUTING.md) · 🇮🇳 [ml](../../../ml/docs/routing/REASONING_ROUTING.md) · 🇮🇳 [mr](../../../mr/docs/routing/REASONING_ROUTING.md) · 🇲🇾 [ms](../../../ms/docs/routing/REASONING_ROUTING.md) · 🇲🇹 [mt](../../../mt/docs/routing/REASONING_ROUTING.md) · 🇲🇲 [my](../../../my/docs/routing/REASONING_ROUTING.md) · 🇳🇵 [ne](../../../ne/docs/routing/REASONING_ROUTING.md) · 🇳🇱 [nl](../../../nl/docs/routing/REASONING_ROUTING.md) · 🇮🇳 [or](../../../or/docs/routing/REASONING_ROUTING.md) · 🇮🇳 [pa](../../../pa/docs/routing/REASONING_ROUTING.md) · 🇵🇭 [phi](../../../phi/docs/routing/REASONING_ROUTING.md) · 🇵🇱 [pl](../../../pl/docs/routing/REASONING_ROUTING.md) · 🇵🇹 [pt](../../../pt/docs/routing/REASONING_ROUTING.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/routing/REASONING_ROUTING.md) · 🇷🇴 [ro](../../../ro/docs/routing/REASONING_ROUTING.md) · 🇷🇺 [ru](../../../ru/docs/routing/REASONING_ROUTING.md) · 🇱🇰 [si](../../../si/docs/routing/REASONING_ROUTING.md) · 🇸🇰 [sk](../../../sk/docs/routing/REASONING_ROUTING.md) · 🇸🇮 [sl](../../../sl/docs/routing/REASONING_ROUTING.md) · 🇷🇸 [sr](../../../sr/docs/routing/REASONING_ROUTING.md) · 🇸🇪 [sv](../../../sv/docs/routing/REASONING_ROUTING.md) · 🇰🇪 [sw](../../../sw/docs/routing/REASONING_ROUTING.md) · 🇮🇳 [ta](../../../ta/docs/routing/REASONING_ROUTING.md) · 🇮🇳 [te](../../../te/docs/routing/REASONING_ROUTING.md) · 🇹🇭 [th](../../../th/docs/routing/REASONING_ROUTING.md) · 🇹🇷 [tr](../../../tr/docs/routing/REASONING_ROUTING.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/routing/REASONING_ROUTING.md) · 🇵🇰 [ur](../../../ur/docs/routing/REASONING_ROUTING.md) · 🇺🇿 [uz](../../../uz/docs/routing/REASONING_ROUTING.md) · 🇻🇳 [vi](../../../vi/docs/routing/REASONING_ROUTING.md) · 🇳🇬 [yo](../../../yo/docs/routing/REASONING_ROUTING.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/routing/REASONING_ROUTING.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/routing/REASONING_ROUTING.md)

---

Regler for resonneringsruting utvider den eksisterende rutingen for modeller og kombinasjoner. Når ingen aktiv regel samsvarer,
forblir den eksisterende virkemåten for tenkning, suffikser, standardinnstillinger for tilkoblinger og leverandøroversettelse
uendret.

## Administrasjon

Regeladministrasjon er tilgjengelig under **Innstillinger → Global ruting**. API-nøkkelredigeringen tilbyr det
samme administrasjonsgrensesnittet, filtrert etter den valgte nøkkelen.

Administrasjons-API-et er tilgjengelig via disse rutene:

- `GET` og `POST` på `/api/settings/reasoning-routing-rules`
- `GET`, `PATCH` og `DELETE` på `/api/settings/reasoning-routing-rules/[id]`
- `POST` på `/api/settings/reasoning-routing-rules/simulate`

Alle rutene bruker `requireManagementAuth`. Inndata valideres med skjemaene i
`src/shared/validation/schemas/reasoningRouting.ts`. Simulatoren foretar aldri et oppstrømskall.

## Regeloppløsning

Den tidlige evalueringen velger nøyaktig én regel. Virkeområdene kontrolleres i denne rekkefølgen:

1. `apiKey`
2. `combo`
3. `model`
4. `global`

Innenfor et virkeområde vinner høyere `priority` først, etterfulgt av et eksakt modellsamsvar fremfor et glob-mønster,
og deretter stabil sortering etter `createdAt` og `id`. `requestTags` leses utelukkende fra `metadata.tags`
og støtter samsvar med `any` eller `all`.

En `connection`-regel evalueres bare når ingen tidlig regel vant og en konkret leverandørtilkobling allerede
er valgt. Den kan bare endre innsatsnivå og budsjett.

## Innsatsnivå og budsjett

`sourceEffort` godtar `any`, `missing`, `none`, `low`, `medium`, `high`, `xhigh`, `max` og
`ultra`. `missing` betyr at forespørselen verken inneholder et eksplisitt innsatsnivå, en tenkebryter
eller et tenkebudsjett. Et signal som bare angir budsjett, samsvarer derfor kun med `any`.

`effortMode` har tre varianter:

- `inherit` beholder klientens innsatsnivå, samtidig som modellen eller kombinasjonen fortsatt kan endres.
- `default` angir `targetEffort` bare når det ikke finnes noe eksplisitt resonneringssignal.
- `force` erstatter det eksplisitte innsatsnivået med `targetEffort`.

Uavhengig av dette kan `budgetAction` være `preserve`, `remove` eller `set`. `force` med `none` fjerner
alle gjenkjente felt for innsatsnivå og budsjett. `none` sammen med `set` er ugyldig.

Forespørsler rettet mot modeller som er kjent for å være inkompatible, avvises før oppstrømskallet. For kombinasjonsmål
fjernes inkompatible oppføringer. Hvis ingen gjenstår, returnerer forespørselen status `400`.
Ukjente funksjonsdata genererer en advarsel og lar regelen forbli aktiv.

## Sikkerhet og transportmekanismer

Kilde- og målmodellen, eller kilde- og målkombinasjonen, er fortsatt underlagt de eksisterende retningslinjene for API-nøkkelen.
En resonneringsregel utvider aldri tillatelser for modeller, kombinasjoner eller kvoter.

Motoren er integrert i Chat Completions, Responses, Anthropic Messages og den interne
Codex WebSocket-banen. WebSocket-banen godtar bare Codex-målmodeller. Kombinasjonsmål kan ikke
kjøres der. Regelavgjørelsen lagres uten hemmeligheter i det eksisterende rutesporet.

## Persistens

Migreringen `src/lib/db/migrations/126_reasoning_routing_rules.sql` oppretter tabellen
`reasoning_routing_rules`. Regler refererer til lagrede API-nøkler, kombinasjoner og leverandørtilkoblinger.
Slettinger rydder opp i relaterte regler. Databasetilgangslaget i
`src/lib/db/reasoningRoutingRules.ts` vedlikeholder en ugyldiggjørbar hurtigbuffer for forespørselsbanen.

Reglene inkluderes i SQLite-sikkerhetskopier, fullstendig databaseeksport og konfigurasjonssynkroniseringspakken.
`reconcileReasoningRulesForSync` deaktiverer importerte regler med manglende referanser og rapporterer disse
konfliktene.
