# Model Exposure Allow/Deny List (Norsk)

🌐 **Languages:** 🇺🇸 [English](../../../../routing/MODEL_EXPOSURE_LIST.md) · 🇪🇹 [am](../../../am/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇸🇦 [ar](../../../ar/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇦🇿 [az](../../../az/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇧🇬 [bg](../../../bg/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇧🇩 [bn](../../../bn/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇨🇿 [cs](../../../cs/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇩🇰 [da](../../../da/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇩🇪 [de](../../../de/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇬🇷 [el](../../../el/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇪🇸 [es](../../../es/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇪🇪 [et](../../../et/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇮🇷 [fa](../../../fa/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇫🇮 [fi](../../../fi/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇫🇷 [fr](../../../fr/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇮🇪 [ga](../../../ga/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇮🇳 [gu](../../../gu/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇳🇬 [ha](../../../ha/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇮🇱 [he](../../../he/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇮🇳 [hi](../../../hi/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇭🇷 [hr](../../../hr/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇭🇺 [hu](../../../hu/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇦🇲 [hy](../../../hy/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇮🇩 [id](../../../id/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇳🇬 [ig](../../../ig/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇮🇹 [it](../../../it/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇯🇵 [ja](../../../ja/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇬🇪 [ka](../../../ka/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇰🇭 [km](../../../km/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇮🇳 [kn](../../../kn/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇰🇷 [ko](../../../ko/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇱🇹 [lt](../../../lt/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇱🇻 [lv](../../../lv/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇮🇳 [ml](../../../ml/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇮🇳 [mr](../../../mr/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇲🇾 [ms](../../../ms/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇲🇹 [mt](../../../mt/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇲🇲 [my](../../../my/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇳🇵 [ne](../../../ne/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇳🇱 [nl](../../../nl/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇮🇳 [or](../../../or/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇮🇳 [pa](../../../pa/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇵🇭 [phi](../../../phi/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇵🇱 [pl](../../../pl/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇵🇹 [pt](../../../pt/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇷🇴 [ro](../../../ro/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇷🇺 [ru](../../../ru/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇱🇰 [si](../../../si/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇸🇰 [sk](../../../sk/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇸🇮 [sl](../../../sl/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇷🇸 [sr](../../../sr/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇸🇪 [sv](../../../sv/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇰🇪 [sw](../../../sw/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇮🇳 [ta](../../../ta/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇮🇳 [te](../../../te/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇹🇭 [th](../../../th/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇹🇷 [tr](../../../tr/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇵🇰 [ur](../../../ur/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇺🇿 [uz](../../../uz/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇻🇳 [vi](../../../vi/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇳🇬 [yo](../../../yo/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/routing/MODEL_EXPOSURE_LIST.md)

---

> Aktivert eksplisitt, avslått som standard (når både `modelVisibilityAllowlist`/`modelVisibilityDenylist` er tomme, forblir
> `/v1/models`-katalogen OG hver `auto/*`-kandidatpool byteidentiske). Et søsken til
> `hidePaidModels`/`hideAutoCombos` (`src/lib/db/settings.ts`) for operatører som ønsker en kuratert
> modelliste av årsaker som ikke har noe med kostnader å gjøre.

## Hvorfor dette finnes

`hidePaidModels` besvarer «er denne modellen gratis?», og `hideAutoCombos` besvarer «skal virtuelle
`auto/*`-ID-er annonseres i det hele tatt?» – ingen av dem lar en operatør kuratere et vilkårlig
delsett av modeller (f.eks. vise nøyaktig de modellene en gitt Claude Code-/OpenCode-klient skal se,
uavhengig av prising). #11481 legger til dette som to uavhengige, eksplisitt aktiverte innstillinger
for strengearrayer.

## Innstillinger

| Nøkkel                     | Type       | Standardverdi | Betydning                                                                            |
| -------------------------- | ---------- | ------------- | ------------------------------------------------------------------------------------ |
| `modelVisibilityDenylist`  | `string[]` | `[]`          | Oppføringer som samsvarer med en kandidat, skjuler den fra katalogen/kandidatpoolen. |
| `modelVisibilityAllowlist` | `string[]` | `[]`          | Når den ikke er tom, forblir KUN kandidater med samsvar synlige.                     |

Begge godtar opptil 500 oppføringer med opptil 200 tegn hver (Zod-validert i
`src/shared/validation/settingsSchemas.ts`). En oppføring er enten:

- en eksakt katalog-ID – `"gpt-4o"` (modell-ID uten prefiks) eller `"openai/gpt-4o"` (med leverandørprefiks), eller
- et glob-mønster som bruker `*`/`?` – f.eks. `"openai/gpt-4*"` eller `"anthropic/*"` – evaluert via den
  samme delte `globToRegex()`-samsvarsmotoren (`src/shared/utils/globPattern.ts`) som allerede brukes av
  `ModelRoutingSection`s kombinasjonstilordninger per modell og `freeModels.ts::matchesOnlyPaidModels`.

Prioritet: blokkeringslisten kontrolleres først (en blokkert oppføring er alltid skjult, selv om den også
samsvarer med tillatelseslisten); når tillatelseslisten ikke er tom, beholdes bare oppføringene den samsvarer med.

## To kontrollpunkter, ikke ett

Lærdommen fra #6512 (et katalogfilter kun basert på `hidePaidModels` lot fortsatt `auto/*` rute til en
betalt modell, siden kombinasjonens kandidatpool ble bygget uavhengig) gjelder på nøyaktig samme måte her.
Samsvarspredikatet `isModelExposureAllowed()` (`src/shared/utils/modelExposureList.ts`) kalles fra BEGGE:

- `src/app/api/v1/models/catalog.ts` – selve `/v1/models`-oppføringen, ved de samme 5 kontrollpunktene per kilde
  som `shouldHidePaid()` allerede styrer (statiske `PROVIDER_MODELS`, synkroniserte leverandørrader,
  egendefinerte rader, aliasbaserte rader, administrerte reserverader).
- `open-sse/services/autoCombo/modelExposureFilter.ts::filterModelExposureCandidates()` – kalt
  fra `virtualFactory.ts::buildPreparedPool`, umiddelbart etter det tilsvarende
  `filterPaidOnlyCandidates()`-kallet, slik at en blokkert modell heller aldri kan velges inn i en
  `auto/*`-kandidatpool.

## Dette filtreres IKKE

Gjenspeiler den eksisterende virkemåten til `hideAutoCombos`: En modell-ID som sendes **eksplisitt** (ikke via `auto/*`,
og ikke oppdaget gjennom katalogoppføringen), blokkeres aldri ved videresending – bare
annonsering/medlemskap i kandidatpoolen filtreres. Dette er uavhengig av `hidePaidModels`;
en operatør kan ønske et kuratert utvalg av årsaker som ikke har noe med kostnader å gjøre, så begge
innstillingene kombineres som uavhengige OG-koblede filtre, på samme måte som den eksisterende kombinasjonen av flere flagg i
`catalog.ts`.

Innstillingseksport (`GET /api/settings/export-json`) inkluderer begge arrayene ordrett, som alle andre
innstillingsfelt – i motsetning til `hidePaidModels`s eksportfilter for kombinasjonstrinn finnes det ingen risiko
ved gjeninnlasting her: En blokkert ID som er innebygd i et eksportert kombinasjonstrinn, er operatørens eget eksplisitte rutingsvalg,
ikke noe eksportgrensen trenger å fjerne.
