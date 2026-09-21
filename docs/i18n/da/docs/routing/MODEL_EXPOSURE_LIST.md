# Model Exposure Allow/Deny List (Dansk)

🌐 **Languages:** 🇺🇸 [English](../../../../routing/MODEL_EXPOSURE_LIST.md) · 🇪🇹 [am](../../../am/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇸🇦 [ar](../../../ar/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇦🇿 [az](../../../az/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇧🇬 [bg](../../../bg/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇧🇩 [bn](../../../bn/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇨🇿 [cs](../../../cs/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇩🇪 [de](../../../de/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇬🇷 [el](../../../el/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇪🇸 [es](../../../es/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇪🇪 [et](../../../et/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇮🇷 [fa](../../../fa/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇫🇮 [fi](../../../fi/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇫🇷 [fr](../../../fr/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇮🇪 [ga](../../../ga/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇮🇳 [gu](../../../gu/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇳🇬 [ha](../../../ha/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇮🇱 [he](../../../he/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇮🇳 [hi](../../../hi/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇭🇷 [hr](../../../hr/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇭🇺 [hu](../../../hu/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇦🇲 [hy](../../../hy/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇮🇩 [id](../../../id/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇳🇬 [ig](../../../ig/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇮🇹 [it](../../../it/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇯🇵 [ja](../../../ja/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇬🇪 [ka](../../../ka/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇰🇭 [km](../../../km/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇮🇳 [kn](../../../kn/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇰🇷 [ko](../../../ko/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇱🇹 [lt](../../../lt/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇱🇻 [lv](../../../lv/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇮🇳 [ml](../../../ml/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇮🇳 [mr](../../../mr/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇲🇾 [ms](../../../ms/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇲🇹 [mt](../../../mt/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇲🇲 [my](../../../my/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇳🇵 [ne](../../../ne/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇳🇱 [nl](../../../nl/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇳🇴 [no](../../../no/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇮🇳 [or](../../../or/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇮🇳 [pa](../../../pa/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇵🇭 [phi](../../../phi/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇵🇱 [pl](../../../pl/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇵🇹 [pt](../../../pt/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇷🇴 [ro](../../../ro/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇷🇺 [ru](../../../ru/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇱🇰 [si](../../../si/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇸🇰 [sk](../../../sk/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇸🇮 [sl](../../../sl/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇷🇸 [sr](../../../sr/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇸🇪 [sv](../../../sv/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇰🇪 [sw](../../../sw/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇮🇳 [ta](../../../ta/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇮🇳 [te](../../../te/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇹🇭 [th](../../../th/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇹🇷 [tr](../../../tr/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇵🇰 [ur](../../../ur/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇺🇿 [uz](../../../uz/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇻🇳 [vi](../../../vi/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇳🇬 [yo](../../../yo/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/routing/MODEL_EXPOSURE_LIST.md)

---

> Aktivér efter eget valg, deaktiveret som standard (når både `modelVisibilityAllowlist` og `modelVisibilityDenylist` er tomme, forbliver
> `/v1/models`-kataloget OG hver `auto/*`-kandidatpulje byte-identiske). En søskende til
> `hidePaidModels`/`hideAutoCombos` (`src/lib/db/settings.ts`) for operatører, der ønsker en kurateret
> modelliste af årsager, som ikke har noget med omkostninger at gøre.

## Hvorfor dette findes

`hidePaidModels` besvarer "er denne model gratis?", og `hideAutoCombos` besvarer "skal virtuelle
`auto/*`-id'er overhovedet annonceres?" — ingen af dem giver en operatør mulighed for at kuratere en vilkårlig delmængde af
modeller (f.eks. at vise præcis de modeller, som en given Claude Code-/OpenCode-klient skal kunne se,
uafhængigt af prissætning). #11481 tilføjer dette som to uafhængige indstillinger med tilvalg og streng-arrays.

## Indstillinger

| Nøgle                      | Type       | Standard | Betydning                                                                    |
| -------------------------- | ---------- | -------- | ---------------------------------------------------------------------------- |
| `modelVisibilityDenylist`  | `string[]` | `[]`     | Poster, der matcher en kandidat, skjuler den fra kataloget/kandidatpuljen.   |
| `modelVisibilityAllowlist` | `string[]` | `[]`     | Når den ikke er tom, forbliver KUN poster, der matcher en kandidat, synlige. |

Begge accepterer op til 500 poster på op til 200 tegn hver (Zod-valideret i
`src/shared/validation/settingsSchemas.ts`). En post er enten:

- et eksakt katalog-id — `"gpt-4o"` (model-id uden præfiks) eller `"openai/gpt-4o"` (med udbyderpræfiks), eller
- et glob-mønster, der bruger `*`/`?` — f.eks. `"openai/gpt-4*"` eller `"anthropic/*"` — som fortolkes via den
  samme fælles `globToRegex()`-matcher (`src/shared/utils/globPattern.ts`), der allerede bruges af
  `ModelRoutingSection`s kombinationstilknytninger pr. model og `freeModels.ts::matchesOnlyPaidModels`.

Prioritet: Afvisningslisten kontrolleres først (en afvist post er altid skjult, selv hvis den også
matcher tilladelseslisten); når tilladelseslisten ikke er tom, er det kun poster, den matcher, der bevares.

## To kontrolpunkter, ikke ét

Læren fra #6512 (et katalogfilter, der kun brugte `hidePaidModels`, tillod stadig `auto/*` at dirigere til en
betalingsmodel, da kombinationens kandidatpulje blev opbygget uafhængigt) gælder på samme måde her.
Matchprædikatet `isModelExposureAllowed()` (`src/shared/utils/modelExposureList.ts`) kaldes fra BEGGE:

- `src/app/api/v1/models/catalog.ts` — selve `/v1/models`-listen ved de samme 5 kontrolpunkter pr. kilde,
  som `shouldHidePaid()` allerede styrer (statiske `PROVIDER_MODELS`, synkroniserede udbyderrækker,
  brugerdefinerede rækker, alias-understøttede rækker og administrerede reserverækker).
- `open-sse/services/autoCombo/modelExposureFilter.ts::filterModelExposureCandidates()` — kaldes
  fra `virtualFactory.ts::buildPreparedPool` umiddelbart efter det tilsvarende
  `filterPaidOnlyCandidates()`-kald, så en afvist model heller aldrig kan vælges ind i en
  `auto/*`-kandidatpulje.

## Hvad der IKKE filtreres

Afspejler `hideAutoCombos`s eksisterende adfærd: Et model-id, der sendes **eksplicit** (ikke via `auto/*`
og ikke fundet gennem kataloglisten), blokeres aldrig ved afsendelse — kun
annoncering/medlemskab af kandidatpuljen filtreres. Dette er uafhængigt af `hidePaidModels`;
en operatør kan ønske et kurateret sæt af årsager, der ikke har noget med omkostninger at gøre, så begge
indstillinger kombineres som uafhængige OG-filtre på samme måde som den eksisterende kombination af flere flag i
`catalog.ts`.

Eksport af indstillinger (`GET /api/settings/export-json`) inkluderer begge arrays ordret ligesom ethvert andet
indstillingsfelt — i modsætning til `hidePaidModels`s eksportfilter for kombinationstrin er der ingen risiko for
rehydrering her: Et afvist id, der er indlejret i et eksporteret kombinationstrin, er operatørens eget eksplicitte routingvalg
og ikke noget, som eksportgrænsen behøver at fjerne.
