# Guardrails (Slovenščina)

🌐 **Languages:** 🇺🇸 [English](../../../../security/GUARDRAILS.md) · 🇪🇹 [am](../../../am/docs/security/GUARDRAILS.md) · 🇸🇦 [ar](../../../ar/docs/security/GUARDRAILS.md) · 🇦🇿 [az](../../../az/docs/security/GUARDRAILS.md) · 🇧🇬 [bg](../../../bg/docs/security/GUARDRAILS.md) · 🇧🇩 [bn](../../../bn/docs/security/GUARDRAILS.md) · 🇧🇦 [bs](../../../bs/docs/security/GUARDRAILS.md) · 🇨🇿 [cs](../../../cs/docs/security/GUARDRAILS.md) · 🇩🇰 [da](../../../da/docs/security/GUARDRAILS.md) · 🇩🇪 [de](../../../de/docs/security/GUARDRAILS.md) · 🇬🇷 [el](../../../el/docs/security/GUARDRAILS.md) · 🇪🇸 [es](../../../es/docs/security/GUARDRAILS.md) · 🇪🇪 [et](../../../et/docs/security/GUARDRAILS.md) · 🇮🇷 [fa](../../../fa/docs/security/GUARDRAILS.md) · 🇫🇮 [fi](../../../fi/docs/security/GUARDRAILS.md) · 🇫🇷 [fr](../../../fr/docs/security/GUARDRAILS.md) · 🇮🇪 [ga](../../../ga/docs/security/GUARDRAILS.md) · 🇮🇳 [gu](../../../gu/docs/security/GUARDRAILS.md) · 🇳🇬 [ha](../../../ha/docs/security/GUARDRAILS.md) · 🇮🇱 [he](../../../he/docs/security/GUARDRAILS.md) · 🇮🇳 [hi](../../../hi/docs/security/GUARDRAILS.md) · 🇭🇷 [hr](../../../hr/docs/security/GUARDRAILS.md) · 🇭🇺 [hu](../../../hu/docs/security/GUARDRAILS.md) · 🇦🇲 [hy](../../../hy/docs/security/GUARDRAILS.md) · 🇮🇩 [id](../../../id/docs/security/GUARDRAILS.md) · 🇳🇬 [ig](../../../ig/docs/security/GUARDRAILS.md) · 🇮🇹 [it](../../../it/docs/security/GUARDRAILS.md) · 🇯🇵 [ja](../../../ja/docs/security/GUARDRAILS.md) · 🇬🇪 [ka](../../../ka/docs/security/GUARDRAILS.md) · 🇰🇭 [km](../../../km/docs/security/GUARDRAILS.md) · 🇮🇳 [kn](../../../kn/docs/security/GUARDRAILS.md) · 🇰🇷 [ko](../../../ko/docs/security/GUARDRAILS.md) · 🇱🇹 [lt](../../../lt/docs/security/GUARDRAILS.md) · 🇱🇻 [lv](../../../lv/docs/security/GUARDRAILS.md) · 🇮🇳 [ml](../../../ml/docs/security/GUARDRAILS.md) · 🇮🇳 [mr](../../../mr/docs/security/GUARDRAILS.md) · 🇲🇾 [ms](../../../ms/docs/security/GUARDRAILS.md) · 🇲🇹 [mt](../../../mt/docs/security/GUARDRAILS.md) · 🇲🇲 [my](../../../my/docs/security/GUARDRAILS.md) · 🇳🇵 [ne](../../../ne/docs/security/GUARDRAILS.md) · 🇳🇱 [nl](../../../nl/docs/security/GUARDRAILS.md) · 🇳🇴 [no](../../../no/docs/security/GUARDRAILS.md) · 🇮🇳 [or](../../../or/docs/security/GUARDRAILS.md) · 🇮🇳 [pa](../../../pa/docs/security/GUARDRAILS.md) · 🇵🇭 [phi](../../../phi/docs/security/GUARDRAILS.md) · 🇵🇱 [pl](../../../pl/docs/security/GUARDRAILS.md) · 🇵🇹 [pt](../../../pt/docs/security/GUARDRAILS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/security/GUARDRAILS.md) · 🇷🇴 [ro](../../../ro/docs/security/GUARDRAILS.md) · 🇷🇺 [ru](../../../ru/docs/security/GUARDRAILS.md) · 🇱🇰 [si](../../../si/docs/security/GUARDRAILS.md) · 🇸🇰 [sk](../../../sk/docs/security/GUARDRAILS.md) · 🇷🇸 [sr](../../../sr/docs/security/GUARDRAILS.md) · 🇸🇪 [sv](../../../sv/docs/security/GUARDRAILS.md) · 🇰🇪 [sw](../../../sw/docs/security/GUARDRAILS.md) · 🇮🇳 [ta](../../../ta/docs/security/GUARDRAILS.md) · 🇮🇳 [te](../../../te/docs/security/GUARDRAILS.md) · 🇹🇭 [th](../../../th/docs/security/GUARDRAILS.md) · 🇹🇷 [tr](../../../tr/docs/security/GUARDRAILS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/security/GUARDRAILS.md) · 🇵🇰 [ur](../../../ur/docs/security/GUARDRAILS.md) · 🇺🇿 [uz](../../../uz/docs/security/GUARDRAILS.md) · 🇻🇳 [vi](../../../vi/docs/security/GUARDRAILS.md) · 🇳🇬 [yo](../../../yo/docs/security/GUARDRAILS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/security/GUARDRAILS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/security/GUARDRAILS.md)

---

> **Vir resnice:** `src/lib/guardrails/`
> **Nazadnje posodobljeno:** 2026-08-29 — v3.8.51 (izvor prepisa Video Bridge določi klicatelj,
> strežnik pa ga še ne preverja — pojasnjeno skladno z #11661)

Varovala uveljavljajo varnost, pravilnike in preoblikovanje vsebine na meji
med OmniRoute in ponudniki v zaledju. Vsako varovalo lahko pregleda (in
po želji zavrne, preoblikuje ali opremi z opombami) koristne vsebine zahtev (`preCall`) ter
odzive iz zaledja (`postCall`).

Sistem je zasnovan tako, da ob napaki **dovoli nadaljevanje**: če varovalo med izvajanjem sproži izjemo, register
zabeleži napako in nadaljuje z naslednjim varovalom, namesto da bi
zahteva spodletela. Blokiranje je izrecna odločitev (`block: true`), nikoli naključje.

## Vgrajena varovala

Register ob uvozu samodejno naloži šest varoval po prednostnem vrstnem redu
(glejte `registry.ts` → `registerDefaultGuardrails()`):

| Prednost | Ime                 | Faze           | Datoteka              |
| -------- | ------------------- | -------------- | --------------------- |
| `5`      | `vision-bridge`     | `preCall`      | `visionBridge.ts`     |
| `6`      | `audio-bridge`      | `preCall`      | `audioBridge.ts`      |
| `7`      | `video-bridge`      | `preCall`      | `videoBridge.ts`      |
| `10`     | `pii-masker`        | `pre` + `post` | `piiMasker.ts`        |
| `20`     | `prompt-injection`  | `preCall`      | `promptInjection.ts`  |
| `95`     | `credential-masker` | `pre` + `post` | `credentialMasker.ts` |

Nižje številke prednosti se izvedejo **prej**.

### Vision Bridge (`visionBridge.ts`) — Most modalnosti PR-1

Prestrezanje zahtev, ki vsebujejo slike in so namenjene **modelom brez podpore za vid**, ter
bodisi preusmeritev celotne zahteve na model s podporo za vid bodisi zamenjava slikovnih
delov z besedilnimi opisi, ki jih pred klicem zaledja ustvari nastavljiv model za vid.
Tako lahko ponudniki, ki podpirajo samo besedilo, pregledno obravnavajo
večmodalne koristne vsebine.

Potek:

1. Preskoči, če ciljni model že podpira vid (razen če je na
   seznamu modelov s prisilno uporabo mostu `isVisionBridgeForcedModel`).
2. Izloči slikovne dele prek `extractImageParts(messages)`
   (`visionBridgeHelpers.ts`), ki izvedbo preda **enotnemu zaznavalniku
   predstavnosti** `detectMediaParts()` v `open-sse/utils/mediaParts.ts` — edinemu
   viru resnice, ki si ga deli s filtrom združljivosti combo.
   Izločanje je omejeno na seznam dovoljenih delov na najvišji ravni z oblikami,
   ki jih lahko `replaceImageParts` vstavi nazaj (pogodba izločanje↔zamenjava): OpenAI
   `image_url`, Anthropic base64 `source.type:"base64"`, Anthropic URL
   `source.type:"url"` in Responses API `input_image`. Ugnezdeni zadetki in
   oblike, ki vsebujejo samo indikatorje, so namenjeni filtru combo in se nikoli ne izločijo.
   Preskoči, če ni najden noben.
3. Razreši nastavitve izvajalnega okolja prek `resolveVisionBridgeRuntimeSettings()`
   (`src/shared/constants/modalityBridgeDefaults.ts`): novi ključi nastavitev `modalityBridge*`
   imajo prednost; podedovani ključi `visionBridge*` ostajajo na voljo kot **nadomestna možnost za en cikel**
   (obdobje za povrnitev). Ko je most onemogočen, preskoči pred kakršnim koli pregledovanjem predstavnosti.
4. Izbirnik načina (`modalityBridgeVisionMode`, glejte spodnjo tabelo) določi
   preusmerjanje ali opisovanje. Preusmerjanje vrne `modifiedPayload`, v katerem je zamenjan samo `model`,
   skupaj z metapodatki `{ rerouted, fromModel, toModel, imagesKept }`.
5. Pot opisovanja: omeji število slik na `maxImages`, sestavi poziv, prilagojen opravilu,
   preveri predpomnilnik opisov, pokliče model za vid **vzporedno**
   (`Promise.allSettled`) in namesto slik vstavi besedilne dele `[Image N]: <description>`.
   Neuspelo opisovanje vrne `null`, izvirni slikovni del pa se
   **ohrani** (#4012) — razen na poti opisovanja combo, ko so spodleteli vsi
   poskusi opisovanja; v tem primeru se za potrjeno zaledje brez podpore za vid vstavi nadomestno besedilo
   `(ni na voljo — povezan ni noben ponudnik s podporo za vid)` (#8430).
6. Vrne `modifiedPayload` in metapodatke (`imagesProcessed`, `descriptions`,
   `processingTimeMs`, `visionModel`).

#### Izbirnik načina (`modalityBridgeVisionMode`)

| Način      | Privzeto | Vedenje                                                                                                                                                                                                                                                                                                  |
| ---------- | -------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `auto`     | ✔        | Nespremenjena podedovana hevristika (#6640/#7204): modeli, ki niso combo, in modeli `auto/` se preusmerijo na najboljši model za vid, razen če ima izvirni model že uporabne poverilnice (takrat se uporabi opisovanje); cilji combo vedno uporabijo opisovanje.                                         |
| `describe` |          | Vedno uporabi opisovanje — blok za preusmerjanje se v celoti preskoči; vedno odgovori model, ki ga je izbral uporabnik.                                                                                                                                                                                  |
| `reroute`  |          | Vsili preusmerjanje: varovalo za ohranitev modela s poverilnicami se zaobide. Varovalo poverilnic za **cilj** preusmerjanja še vedno velja — če ni uporabnega cilja s podporo za vid, zahteva nadaljuje na opisovanje, da neobdelane slike nikoli ne dosežejo zaledja, ki podpira samo besedilo (#8430). |

Prisilni načini prekinejo izvajanje **pred** samodejno hevristiko; vedenje načina `auto`
je bajtno enako varovalu pred PR-1.

#### Poziv za opisovanje, prilagojen opravilu (`modalityBridgeVisionTaskAware`)

Privzeto **true**. `composeVisionPrompt()` (`visionBridgeHelpers.ts`) osnovnemu
pozivu za opisovanje doda besedilo **zadnjega uporabniškega sporočila** (skrajšano na 500 znakov),
s čimer opis usmeri k temu, kar je uporabnik dejansko vprašal
(vzorec codex-vision-proxy), model za vid pa pozove tudi k prepisu vidnega
besedila. Ko je zastavica izklopljena — ali uporabniškega besedila ni — se osnovni poziv uporabi nespremenjen.

Samopovratna zahteva za opis, združljiva z OpenAI (`callVisionModelSingle()`
v `visionBridgeHelpers.ts`), vedno zahteva `image_url.detail: "high"` —
brezpogojno, za vsakega klicatelja/ponudnika in neodvisno od kakršnega koli
signala odjemalca. Vzorčenje z nizko stopnjo podrobnosti poslabša natančnost
OCR prav pri nalogi prepisovanja besedila, ki jo zahteva ta poziv, zato sam
klic za opis vedno zahteva visoko stopnjo podrobnosti, ne glede na raven
podrobnosti izvorne dohodne zahteve. To vpliva samo na telo interne zahteve za
opis; ne spremeni načina, kako OmniRoute posreduje klicateljevo lastno
`image_url.detail` v primarni zahtevi — ta privzeta vrednost se uporabi ločeno
in samo za zaznane odjemalce OpenCode v `defaultImageDetail()`
(`open-sse/handlers/chatCore/upstreamBody.ts`). Veja samopovratnega opisa v
žičnem formatu Anthropic nima polja `detail` in nanjo nobena od teh privzetih
vrednosti ne vpliva.

#### Omejitev izhoda opisa (`modalityBridgeVisionMaxChars`)

| Ključ                          | Privzeto | Razpon            |
| ------------------------------ | -------- | ----------------- |
| `modalityBridgeVisionMaxChars` | `0`      | `0` ali 100–50000 |

`0` (privzeto) pomeni **brez omejitve** — opis, ki ga vrne
`callVisionModel()`, se posreduje nespremenjen, s čimer se ohrani obstoječe
vedenje. Vsaka vrednost v razponu 100–50000 skrajša opis in mu doda pripono
`…`, preden se vstavi nazaj v obliki `[Slika N]: <opis>`
(`VisionBridgeGuardrail.preCall()` v `src/lib/guardrails/visionBridge.ts`).
To vrednost zvišajte pri opravilih OCR z veliko podrobnostmi, pri katerih
nadaljnji model potrebuje celoten prepis; znižajte jo, da omejite porabo
žetonov pri gostobesednih vidnih modelih. Polje na nadzorni plošči je v
razdelku Napredno zavihka Vision (`modality-bridge-max-chars` v
`ModalityBridgeVisionTab.tsx`) in vsako vrednost med 1 in 99 omeji navzgor na
najmanjšo vrednost 100, izrecno vrednost `0` pa pusti nespremenjeno — `0` je
samostojna veljavna vrednost Zod
(`z.union([z.literal(0), z.number().int().min(100).max(50000)])`) in ne zgolj
privzeta vrednost za »nenastavljeno«.

#### Predpomnilnik opisov (`modalityBridge/bridgeCache.ts`)

Procesno skupen predpomnilnik LRU + TTL v pomnilniku za izhode opisov.
Ključ = `sha256(imageRef + composedPrompt + configuredBridgeModel)` z
uokvirjanjem s predpono dolžine (brez trkov na mejah polj). Komponenta modela
je **konfigurirani** premostitveni model in ne model, ki je dejansko odgovoril
— `callVisionModel` lahko interno uporabi nadomestni model, oblikovanje ključa
za vsak poskus posebej pa bi razdrobilo predpomnilnik. Neuspešni opisi se
nikoli ne shranijo v predpomnilnik. Nastavitve:

| Ključ                           | Privzeto | Razpon  |
| ------------------------------- | -------- | ------- |
| `modalityBridgeCacheEnabled`    | `true`   | —       |
| `modalityBridgeCacheTtlMinutes` | `60`     | 1–1440  |
| `modalityBridgeCacheMaxEntries` | `200`    | 10–5000 |

#### Normalizacija oddaljenih slik (samopovratni opis/pridobivanje base64)

Ko most sam pridobi **oddaljeno** sliko — za samoklic opisa Anthropic in
pretvorbo v base64 za žični format Claude
(`ensureBase64ImagesForClaudeWire`), oboje prek
`fetchRemoteImageAsDataUri()` v `visionBridgeHelpers.ts` — se nastali podatkovni
URI pred vdelavo v zahtevo za vidni model obdela z `normalizeDataUri()`
(`open-sse/utils/imageNormalize.ts`). Prevelike slike se pomanjšajo tako, da
ima **daljša stranica 2048px** (kar ustreza omejitvi spreminjanja velikosti, ki
jo OpenAI/Anthropic že uporabljata na strežniški strani), s čimer se zmanjšajo
količina naloženih bajtov in zakasnitve, ne da bi se spremenilo to, kar vidi
vidni model. Spreminjanje velikosti uporablja `sharp`, naložen prek dinamičnega
uvoza: na platformi, kjer njegove izvorne binarne datoteke ni mogoče naložiti,
`normalizeDataUri()` **nikoli ne sproži izjeme** — namesto tega nespremenjene
izvorne bajte samo posreduje naprej, zato pot opisa/pretvorbe v base64 vedno
ostane delujoča. Tudi bajti, ki niso slika (pridobivanje ni vrnilo slike, ki bi
jo bilo mogoče dekodirati), se posredujejo nespremenjeni. Ta normalizacija je
omejena na slike, ki jih most pridobi za svoj samoklic — nikoli se ne uporabi
za klicateljevo neobdelano posredovano koristno vsebino, skladno z načelom
spreminjanja samo ob izrecni privolitvi (strogo pravilo št. 20).

#### Shema nastavitev + selitev

Novi ključi `modalityBridge*` se preverjajo z Zod v `updateSettingsSchema`
(`src/shared/validation/settingsSchemas.ts`): `modalityBridgeVisionEnabled`,
`modalityBridgeVisionMode`, `modalityBridgeVisionModel`,
`modalityBridgeVisionTaskAware`, `modalityBridgeVisionPrompt`,
`modalityBridgeVisionTimeout`, `modalityBridgeVisionMaxImages`,
`modalityBridgeVisionMaxChars`, trojica `modalityBridgeCache*` in skupina
`modalityBridgeAudio*`, ki jo uporablja Audio Bridge. Selitev
`141_modality_bridge_settings.sql` kopira obstoječe starejše vrednosti
`visionBridge*` v ustrezne nove ključe (idempotentno in brez prepisovanja
vrednosti `modalityBridge*`, ki jo je nastavil upravljavec); starejši ključi
ostanejo sprejeti kot rezervna možnost za branje v enem ciklu izdaje.

#### Glava za preglednost + statistika

Odgovori, pretvorjeni z opisom, vsebujejo
`x-omniroute-modality-bridge: image->text;model=<visionModel>;parts=<n>`
(sestavi jo `buildModalityBridgeHeader()` v `modalityBridge/bridgeStats.ts`,
doda pa jo `withModalityBridgeHeader()` v `src/sse/handlers/chatHelpers.ts`).
Preusmerjene zahteve **nimajo** glave — koristna vsebina ni bila spremenjena,
zamenjava modela pa je že vidna v polju `model` telesa odgovora.

`GET /api/modality-bridge/stats` (avtentikacija za upravljanje, ista raven kot
`GET /api/settings`) vrne števce v pomnilniku za posamezne modalnosti
`{ attempts, successes, bridged, cacheHits, failures, totalLatencyMs,
latencySamples, averageLatencyMs, lastUsedAt }` za `vision`, `audio` in
`video`. `averageLatencyMs` kot imenovalec uporablja `latencySamples`, ne vseh
poskusov; operacija brez merjenja časa ne ustvari izmišljenega
ničmilisekundnega vzorca. `bridged` ostaja vzvratno združljiv vzdevek za
uspešne pretvorbe; neuspešni poskusi ga ne povečajo.
Števci se načrtno ponastavijo ob vnovičnem zagonu procesa
(telemetrija, ne računovodstvo).

#### Konfiguracija nadzorne plošče

Namenska stran nadzorne plošče je
`/dashboard/settings/modality-bridge`. Njeni zavihki `Vid`, `Zvok` in
`Video`, dostopni prek URL-ja, pri preklapljanju vrednosti `tab` ohranijo parametre poizvedbe.
Zavihek Vid omogoča omogočanje funkcije, izbiro načina in modela (vključno s samodejno
privzeto izbiro), pozive glede na opravilo, napredne omejitve časovne omejitve/slike/dolžine opisa/predpomnilnika,
števce izvajalnega okolja
in zaščiten vzorčni zahtevek. Tudi zavihek Zvok je aktiven: omogoča
omogočanje funkcije, izbirnik modela samo za STT z možnostjo Samodejno, omejitve časovne omejitve/največje dolžine posnetka, števce
zvoka in vzorčni preizkus `input_audio`. Zavihek Video je funkcionalen: prikazuje
stanje izvajalnega okolja FFmpeg/ffprobe — eno od štirih izrecnih stanj uporabniškega vmesnika (`unknown`, medtem ko
preverjanje poteka ali ga ni bilo mogoče dokončati, `restricted` pri gostitelju
nadzorne plošče, ki ni povratna zanka, kjer je preverjanje preskočeno na strani odjemalca, `unavailable`, ko je preverjanje
končano in je potrjeno, da orodje manjka, ali `available` z različicama FFmpeg/ffprobe) — trajno shrani
omejitve omogočanja/modela/sličic/videa/časovne omejitve, filtrira izbirnik modelov na modele,
ki podpirajo vid, in prikazuje števce videa.

Prejšnja kartica Most za vid v nastavitvah umetne inteligence je združljivostna povezava do
nove strani; ne vsebuje več druge kopije obrazca. Ponudniki predstavnosti prav tako
povezujejo poteka dela Slika-v-besedilo in Govor-v-besedilo z ustreznima zavihkoma Modality
Bridge, ne da bi odstranili obstoječe preizkusno okolje Govor-v-besedilo.

**Obhod preverjanja dovoljenja za lastno povratno zanko:** ko je klic za opis usmerjen skozi
lastno povratno zanko `/v1` sistema OmniRoute (nestandardni model ponudnika), podzahtevek pošlje
`x-omniroute-admission-bypass: internal` in je overjen z razrešenim
poverilom za lastno povratno zanko — lokalno nadomestno vrednostjo `sk_omniroute` v lokalnem načinu ali
ključem okolja `OMNIROUTE_API_KEY` / `ROUTER_API_KEY`, ki ga je nastavil upravljavec (#1350), tako da
lahko uvedbe z `REQUIRE_API_KEY=true` še vedno izvedejo klic za opis. Obhod
je upoštevan samo za ta natančna poverila, zato zunanji odjemalci ne morejo uporabiti
glave za preskok preverjanja dovoljenja.

Podedovane privzete vrednosti so v `src/shared/constants/visionBridgeDefaults.ts`;
nove privzete vrednosti za način/opravila/predpomnilnik in razreševalnik nastavitev pa so v
`src/shared/constants/modalityBridgeDefaults.ts`. Zaščitni mehanizem ponuja možnost konstruktorja
`deps`, da lahko preizkusi vstavijo lažne izvedbe `getSettings` in
`callVisionModel`.

### Zvočni most (`audioBridge.ts`) — Modality Bridge PR-3

Prestrezanje zahtevkov za klepet, ki vsebujejo zvok, preden dosežejo cilj, za katerega ni
znano, da sprejema zvočni vhod. Zahtevek za klepet ni nikoli preusmerjen: zvočni deli se
prepišejo prek obstoječe večdelne končne točke, združljive z OpenAI, izbrani
model za klepet pa nadaljuje z besedilnimi prepisi.

Potek:

1. Razrešite `supportsAudio` prek `getResolvedModelCapabilities()`. Izrecni
   metapodatki registra ponudnikov imajo prednost, sledijo statični metapodatki modela in nato sinhronizirani
   `modalities_input`. Deklarirani seznam vhodov brez `audio` pomeni `false`; če ni
   dokazov o zmogljivosti, vrednost ostane `null`. Tako `false` kot `null` aktivirata
   konservativni most, medtem ko ga `true` obide.
2. Razrešite nastavitve `modalityBridgeAudio*` in iz vsakega sporočila izvlecite zamenljive
   zvočne dele na najvišji ravni prek skupnega detektorja `detectMediaParts()`.
   Podprte oblike prenosa so OpenAI `input_audio`, `audio_url` in
   `source.media_type: "audio/*"`. Ugnezdeni zvok je zaznan za usmerjanje, vendar ga
   pot zamenjave ne odstrani. Delo je omejeno z `modalityBridgeAudioMaxClips`;
   poznejši deli ostanejo nedotaknjeni.
3. Upoštevajte nastavljen `provider/model` ali pa naj `selectAudioBridgeModel()` pregleda
   `AUDIO_TRANSCRIPTION_PROVIDERS` v stabilnem vrstnem redu kataloga in izbere prvi
   model z uporabnim poverilom aktivnega ponudnika.
4. `callAudioTranscription()` pretvori zvok base64/podatkovnega URI-ja v večdelno
   datoteko `file` ali prenese oddaljeni `audio_url` prek zaščite za javne izhodne povezave
   s pripenjanjem DNS in omejitvijo 25 MB. Nato datoteko in izbrani
   model pošlje z metodo POST v lokalno lastno povratno zanko `/v1/audio/transcriptions`, overjeno z
   `resolveSelfLoopBearer()`. Obstoječa pot za prepis izvede običajno
   iskanje poveril, obravnavo obdobja mirovanja/omejevanja hitrosti in posredovanje ponudniku.
5. Uspešni klici nadomestijo svoje dele z `[Zvok N]: <prepis>`. Klici
   se izvajajo z `Promise.allSettled`: posamezna napaka ohrani izvirni
   zvočni del (pogodba #4012). Če vsi klici spodletijo in je dokazano, da ima cilj
   `supportsAudio === false`, deli postanejo
   `[Zvok N]: (ni na voljo — povezan ni noben ponudnik STT)` (pogodba #8430). Pri
   neznanem cilju (`null`) rezultat, pri katerem so spodleteli vsi klici, ostane nedotaknjen. Dokazano
   besedilni cilj brez uporabnega poverila STT prejme enako izrecno
   nadomestno besedilo brez izvedbe omrežnega klica.

Uspešni prepisi uporabljajo procesno skupen predpomnilnik LRU/TTL sistema Modality Bridge.
Ključ združuje sklic na zvok, stabilno oznako operacije `audio-transcription`
in izbrani model STT; napake se nikoli ne shranijo v predpomnilnik. Poskusi obdelave zvoka posodobijo
skupne števce `bridged`, `cacheHits`, `failures` in `lastUsedAt`.
Pretvorjeni odgovori vsebujejo
`x-omniroute-modality-bridge: audio->text;model=<sttModel>;parts=<n>`; nedotaknjeni
zahtevki ne prejmejo segmenta Zvočnega mostu.

Nastavitve izvajalnega okolja so shranjene v podatkovni zbirki in preverjene z Zod:

| Ključ                         | Privzeto | Razpon               |
| ----------------------------- | -------- | -------------------- |
| `modalityBridgeAudioEnabled`  | `true`   | —                    |
| `modalityBridgeAudioModel`    | `""`     | Samodejno ali ID STT |
| `modalityBridgeAudioTimeout`  | `60000`  | 1000–300000          |
| `modalityBridgeAudioMaxClips` | `3`      | 1–10                 |

Skupni predpomnilnik še naprej upravljajo `modalityBridgeCacheEnabled`,
`modalityBridgeCacheTtlMinutes` in `modalityBridgeCacheMaxEntries`.

### Video most (`videoBridge.ts`, `videoBridgePipeline.ts`)

Prestrezanje delov videoposnetkov na najvišji ravni v `messages` API-ja Chat Completions in `input` API-ja Responses, preden je poklican ciljni sistem brez znane izvorne podpore za videoposnetke.
Podprte oblike so `input_video`, `video_url`, `video_source`, URL-ji HTTPS
in podatkovni URI-ji `data:video/*;base64,...`. Navadna imena datotek v besedilu se ne obravnavajo
kot videoposnetki.

`VideoBridgeGuardrail.preCall` (`videoBridge.ts`) je odgovoren za prečkanje zahteve,
preverjanje zmožnosti/pravilnika, združevanje na ravni zahteve in koristno vsebino odgovora.
Delo za posamezen videoposnetek — pridobivanje, predpomnilnik celotnega rezultata, opisovanje zaporedja
sličic (ki združi morebitni zvočni prepis, ki ga je navedel klicatelj) ter metrike/prekinitev/čiščenje
za posamezen poskus — je skrito za `processVideoPart` v
`videoBridgePipeline.ts`, ki se pokliče enkrat za vsak del videoposnetka znotraj zanke `preCall`.
Ta modul določa tudi eksplicitne meje vrat `VideoMediaBrokerPort`
(pridobivanje bajtov in ekstrahiranje vzorčenih sličic), `VideoAudioTranscriptionPort`
(združevanje zvočnega prepisa, ki ga je navedel klicatelj, z napisi vzorčenih sličic) in
`VideoDrilldownPort` (meja trajnega shranjevanja za podrobni pregled sličic; še ni povezana
s `processVideoPart` — zapise podrobnega pregleda trenutno zapisuje samo ločena pot
`/api/modality-bridge/video/drilldown`).

Javna pot zahtev `/v1` nikoli ne uvozi ali prikliče podprocesa. Oddaljeni
videoposnetki se prenesejo z omejitvijo 50 MiB; vdelani videoposnetki base64 imajo
konservativno omejitev dekodirane velikosti 36 MiB na videoposnetek, da lahko ovojnica
modela/sporočil/uokvirjanja ostane znotraj javne omejitve 50 MiB za sprejem zahtev JSON.
Dolžina vdelane vsebine in ocene dekodirane velikosti se preverijo pred dodelitvijo pomnilnika. HTTPS je
zahtevan za začetni oddaljeni URL in vsako preusmeritev, pri čemer se uporablja obstoječa
zaščita za javne izhodne povezave s pripenjanjem DNS. Bajti nato prečkajo natančno interno
mejo posrednika `POST /api/modality-bridge/video/extract`. Ta pot je hkrati
`LOCAL_ONLY` in `SPAWN_CAPABLE`, sprejema samo overjeno zahtevo znotraj procesa
iz zaupanja vredne povratne zanke ter nikoli ne sprejme URL-ja, poti datotečnega sistema, izvršljive datoteke
ali seznama argumentov. Cevovod API-ja za velikost telesa in obdelovalnikov postopni bralnik telesa
neodvisno uveljavljata omejitev 50 MiB za vhod posrednika. Njegova omejena čakalna vrsta izvaja
eno ekstrahiranje naenkrat, dovoljuje štiri čakajoča opravila in omejuje čakajoči vhod na
100 MiB.

Znotraj posrednika `ffprobe` bere zasebno lokalno datoteko; fiksni seznam
dovoljenih oblik izključuje oblike seznamov predvajanja in manifestov. Za dovoljene vsebnike
družine MOV ostanejo zunanji sklici na podatke MOV privzeto onemogočeni, fiksni
ukaz pa jih ne omogoči. Tako `ffprobe` kot `ffmpeg` uporabljata seznam dovoljenih protokolov,
omejen samo na `file`, eno nit, fiksna polja argumentov, brez lupine,
izvršljive datoteke pa se razrešijo iz `PATH`. Tokovi naslovnih slik kot prilog niso
kandidati za predvajanje. Vsi tokovi, ki jih je mogoče predvajati, morajo izpolnjevati omejitve, pri čemer
ima eksplicitni privzeti tok prednost pred deterministično nadomestno izbiro z najnižjim indeksom.
Videoposnetki so omejeni na 600 sekund, 8.192 slikovnih pik na dimenzijo in
33.554.432 izvornih slikovnih pik. FFmpeg vzorči 1–16 sredinskih sličic JPEG, zmanjša
daljšo stranico na največ 1.024 slikovnih pik, ne da bi povečal manjše vhode, in
nikoli ne prejme URL-ja. Privzeti način vzorčenja je `uniform`. Izbirna pravilnika
`scene_aware` in poskusni `segment_aware` izvedeta en dodaten
fiksni prehod FFmpeg čez že preverjeni lokalni tok, izbereta omejene časovne žige prizorov
`showinfo` in se ob napaki detektorja, časovni prekoračitvi, nepravilno oblikovanem izhodu ali praznem
naboru kandidatov deterministično vrneta na iste enakomerno porazdeljene sredinske točke.
Način, ki upošteva segmente, dodeli vzorce sredinskih točk sorazmerno s preverjenimi
intervali prizorov; dokazi načina, ki upošteva segmente, in nadomestno vedenje so
podrobno opisani spodaj. Stroga omejitev 16 sličic se
pri vsakem pravilniku uporabi po izbiri. Ko ima zahteva, ki upošteva prizore, na voljo samo
eno sličico, uporabi enakomerno sredinsko točko aktivnega celotnega videoposnetka ali ciljnega
okna in sporoči `policyEffective: uniform`: ena sama izbrana sličica prizora
ne more ohraniti obeh časovnih skrajnosti. Klicatelj lahko po želji poda
končno ciljno okno (`start`/`end` v sekundah); meje se omejijo na trajanje predstavnostne
vsebine, obrnjena ali nekončna okna se zavrnejo, vsi pravilniki vzorčenja
pa se izvedejo samo znotraj normaliziranega intervala. Nastalo
okno je vključeno v metapodatke vzorčenja in predpono nezaupanja vrednega opisa,
da lahko modeli v nadaljevanju razlikujejo ciljni izsek od celotne
časovnice.

Semantično osredotočanje napisov je ločena, eksplicitna nastavitev. Privzeti način analize
`full` ohrani obstoječi poziv za sličice in modelu za napise nikoli ne posreduje besedila
zahteve. V načinu `focused` most prebere samo najnovejši
neprazen `text`/`input_text`, ki ga je ustvaril uporabnik, iz istega vsebnika Chat ali Responses,
ga normalizira v NFC, strne kontrolne znake in presledke
ter omeji na 500 kodnih točk Unicode. Prazen rezultat se vrne na
natančen poziv `full`. Uporaben namig se serializira kot JSON v namenskem
bloku konteksta nezaupanja vrednega uporabnika in sme le prednostno razvrstiti opazne podrobnosti;
ne more preglasiti ločenega opozorila, naj se ne sledi navodilom, ki so vidna
ali slišna v predstavnostni vsebini. Besedilno osredotočanje nikoli ne izpelje `start`/`end` in ne spremeni
časovnega vzorčevalnika.

#### FU-07 strukturni dokazi segmentov

`segment_aware` uporablja en omejen predhodni analitični prehod čez že preverjeni
lokalni videotok. Fiksna veriga filtrov najprej zmanjša širino na največ 320 slikovnih
pik, zazna spremembe prizorov in zamrznjene intervale, nato vzorči z 1 sličico na
sekundo za določanje zamegljenosti, povprečne svetlosti ter prostorskih/časovnih informacij. Prehod je
omejen na 600 strukturnih vzorcev, eno nit FFmpeg/filtrov, ista
seznama dovoljenih protokolov, omejena samo na `file`, in vsebnikov, omejitev izhoda procesa 1 MiB
ter največ 30 sekund znotraj skupne prekinitve/roka posrednika. Nikoli
ne sprejme ukaza, filtra, poti ali URL-ja iz zahteve.

Strukturne vrednosti so deterministični dokazi vzorčenja, ne semantično
razumevanje videoposnetka. Ne sklepajo o subjektih, dejanjih, podnapisih, govoru
ali namenu uporabnika. Meje prizorov in zamrznitev oblikujejo segmente; pokritost
zamrznitev, zamegljenost, osvetlitev, prostorske podrobnosti in časovne spremembe
vplivajo le na razporeditev obstoječega proračuna 1–16 sličic. Popolnoma
zamrznjen segment je omejen na eno sličico, nezamrznjeni segmenti pa tekmujejo
za preostali proračun. Ko je mej več kot sličic, se ohrani enakomerna pokritost
časovnice, tako da hitri zgodnji rezi ne morejo skriti dolgega končnega segmenta.
Meje prizorov, ki so znotraj 1-sekundne ločljivosti analize glede na mejo
zamrznitve, se združijo.

Manjkajoči filtri, nepravilno oblikovani/prazni dokazi, napaka detektorja ali
časovna omejitev omejene predhodne analize povzročijo varno nadaljevanje z
natančno pravilnikom enakomernih sredinskih točk. Prekinitev klicatelja ali rok
posrednika ne povzročita varnega nadaljevanja: končata izvajajoči se podproces,
preprečita poznejše pridobivanje sličic, zasebno začasno drevo pa se odstrani v
`finally`.

`scripts/perf/video-bridge-fu07-eval.ts` ustvari deterministične dejanske testne
primerke FFmpeg za prihranke pri klicih za podnaslavljanje po odstranjevanju
dvojnikov, razporeditev proračuna pri gostem gibanju, dokaze o
zamegljenosti/osvetlitvi/SI-TI, hitre reze z dolgim zaključkom in lažno pozitivne
rezultate pri postopnem prehodu. Beleži dejanski čas predhodne analize ter, kjer
je na voljo `/usr/bin/time`, procesorski čas podrejenega procesa in največjo
porabo RSS. Njegova preverjanja kakovosti so zgolj strukturni oraklji. Kakovost
dejanskega modela za podnaslavljanje ostaja `HOLD`, ker ta preizkusni okvir nima
pooblaščene končne točke ali zamrznjenega ocenjevalnika. Tudi denarni prihranki
ostajajo `HOLD`, razen če `--caption-cost-per-call-usd` poda izrecno pozitivno
oceno stroška na klic; skript nikoli ne izmisli nobenega od teh rezultatov.

Vsaka sličica je omejena na 4 MiB, vse neobdelane sličice skupaj na 23 MiB,
serializirani odgovor posrednika pa na 32 MiB. Zasebni začasni imenik se odstrani
v `finally`. OmniRoute ne vključuje FFmpeg in ne sprejema poti do izvedljive
datoteke po meri. Pred podnaslavljanjem most uporabi konservativno vizualno
odstranjevanje dvojnikov: vsak JPEG se zmanjša na sivinski medpomnilnik velikosti
16×16 in primerja samo z zadnjo ohranjeno sličico. Pri zahtevanem proračunu za
podnaslavljanje, večjem od ene sličice, pridobivanje zagotovi omejeno množico
kandidatov z največ dvakratnikom tega proračuna in nikoli več kot 16 sličicami.
Zahtevana zgornja meja se uporabi šele po odstranjevanju dvojnikov, pri končnem
redčenju pa se ohranita prvi in zadnji izbrani kandidat, kadar proračun znaša
vsaj dve sličici. Različicami opredeljeni pravilnik
`grayscale-16x16-mean-cells-v2` uporabi večjo vrednost med povprečno razliko v
svetilnosti in deležem celic sličice, katerih normalizirana razlika znaša vsaj
0.05. Prag za dvojnike je konstanta 0.04, izbrana zaradi predvidljivosti in ne
izpostavljena kot nastavitev med izvajanjem. Ta sekundarni visokokontrastni
signal ohrani majhne premike in spremembe vidnega besedila, ki jih primerjava,
temelječa samo na povprečju, lahko skrije. Napake primerjalnika ali dekodirnika
povzročijo varno nadaljevanje in ohranijo pokritost. Izhodni metapodatki ločujejo
pridobljene kandidate, uspešno uporabljene sličice in odstranjene vizualne
dvojnike.

Izrecno označen del videoposnetka lahko zahteva kontaktni list s časovnimi
oznakami. Most ustvari mrežo JPEG z največ 4 stolpci in 16 sličicami. Vsaka
celica s 512 slikovnimi pikami vtisne časovno oznako izvorne sličice v
visokokontrastni spodnji pas, iste časovne oznake pa ostanejo tudi v besedilnih
metapodatkih za nadaljnje povezovanje in revizijo. Celoten JPEG ostane omejen na
32 MiB. Če `sharp` ne more dekodirati ali sestaviti mreže, most uporabi
posamezne sličice JPEG; prekinitev odjemalca se še vedno prenese skozi operacijo
ustvarjanja lista.

Dokazi za uveljavitev so namenoma ločeni od sintetičnega mikroprimerjalnega
preizkusa sestavljanja. `scripts/perf/video-bridge-contact-sheet-eval.ts`
opredeljuje A/B-preizkusni okvir z različicami sheme za dejanske modele vida,
združljive z OpenAI. Meri žetone, ki jih sporoči ponudnik, skupno dejansko
zakasnitev (vključno s sestavljanjem lista), število klicev modela in ohranitev
dejstev, opredeljenih v manifestu. Neobdelani odgovori modela se ne zapišejo v
poročilo; ohranijo se samo izvlečki SHA-256 in ID-ji ujemajočih se dejstev.
Preizkusni okvir ne izvede nobenega omrežnega ali plačljivega klica modela, razen
če je podan `--execute-real` ter so nastavljeni `--model`,
`OMNIROUTE_BASE_URL` in `OMNIROUTE_API_KEY`. Brez takšnega izrecnega dejanskega
izvajanja njegov strojno berljiv rezultat ostane `HOLD`; sintetične meritve
koristnega tovora/števila klicev same po sebi niso dokaz za uveljavitev.

Klicatelji lahko podprtemu delu videoposnetka priložijo neobvezno polje
`transcript.cues`, kadar že imajo časovno usklajeno besedilo. Vsak element mora
vsebovati `text`, končni interval `start`/`end` znotraj ugotovljenega trajanja in
`source` z dovoljenega seznama (`client`, `embedded` ali `audio-bridge`);
`confidence` ima privzeto vrednost `1` in mora ostati med `0` in `1`. Popolnoma
enaki elementi se združijo. OmniRoute iz teh metapodatkov nikoli ne začne
prepisovanja: preverjeni elementi se skupaj z virom, zaupanjem in intervalom
kopirajo v opisani rezultat ter se prikažejo kot nezaupanja vredna opažanja
poleg podnapisov sličic. Neveljavno besedilo, besedilo zunaj razpona ali brez
navedbe izvora se zavrne, namesto da bi se pomešalo v tok podnapisov. Polje
`source` trenutno navede klicatelj in ga strežnik ne preveri: OmniRoute zagotovi,
da je vrednost eden od treh dovoljenih nizov, vendar še ne potrdi kriptografsko,
da oznaka `embedded` ali `audio-bridge` dejansko izvira iz pridobivanja, ki ga
upravlja strežnik. Dokler takšno preverjanje ni uvedeno, obravnavajte `source`
kot nezaupanja vreden namig; na njem ne utemeljujte odločitev o avtorizaciji.

Napredni klicatelj lahko za isti videoposnetek zagotovi že avtorizirano sled
`audioTranscript`. Spoj združevanja izvaja vizualna in zvočna opazovanja znotraj
istega roka in signala za prekinitev, jih razvrsti na skupni časovni osi, združi
popolnoma enake dvojnike ter sporoči delni rezultat, kadar uspe le ena stran.
Neveljaven `audioTranscript` se pretvori v tak delni rezultat — vizualni opis
se ohrani, zvočna veja pa zabeleži sanitizirano kodo napake — namesto da bi
spodletela obdelava celotnega videoposnetka. Razpoložljivost posameznih vej,
zastavica delnega rezultata in sanitizirane kode napak se ohranijo v opisanem
rezultatu, v metapodatkih varnostnih omejitev (`audioFusionRuns`/`audioFusionPartials`/
`audioFusionFailureCodes`), v metapodatkih predpomnilnika rezultatov in v števcih
združevanja mostu. Privzeta pot Video Bridge ne prikliče pretvorbe govora v
besedilo in ne prenese druge kopije predstavnostne datoteke; brez te izrecno
podane sledi ostane omejena samo na videoposnetek.

**Hramba prepisa (#12150 P1).** To se uporabi samodejno, kadar koli Video Bridge
(ki ga je treba posebej omogočiti) izriše oznako prepisa — ločena zastavica za
hrambo ne obstaja. Ko zahteva izriše katero koli oznako prepisa (s strani
klicatelja deklariran `transcript` ali združen `audioTranscript`), jo varnostna
omejitev označi kot `videoBridgeObserved` in ustvari redigirano senčno različico
opisa videoposnetka — enako upodobitev, v kateri je telo poljubnega besedila
vsake oznake zamenjano z `[redacted-video-transcript]`. Ta različica je izdelana
z zamenjavo strukturiranega polja oznake, preden se sestavi niz (nikoli z
razčlenjevanjem sploščenega besedila, zato ne more preživeti nobena vsebina
oznake — niti zlonamerna niti običajna, vključno s telesi, ki vsebujejo `]`, kot
sta `[inaudible]`/`[music]`). V telesu zahteve, shranjenem v dnevniku klicev, se
vsak besedilni del, izpeljan iz videoposnetka, zamenja s to redigirano senčno
različico, ujemanje pa se opravi na podlagi enakosti vsebine; sidro `fullText` se
znova prebere iz dokončane vsebine varnostne omejitve pred klicem, zato ujemanje
še vedno uspe, potem ko poznejše verižne varnostne omejitve (prikrivalniki PII
in poverilnic s prioritetama 10/95) sproti prepišejo besedilo opisa, ter potem,
ko vstavljanje sistemskega poziva, predaje in pomnilnika preoblikuje polje
sporočil. Telo, poslano modelu navzgor, ostane nespremenjeno. Opazovana zahteva
prav tako ne zapolni trajnega pomnilnika Memory (preskoči se tako pridobivanje
iz zahteve kot pridobivanje iz odgovora), zato lastni odgovor modela ne more
prenesti besedila prepisa v Memory.

Površine hrambe, ki ostajajo odprte in se spremljajo za nadaljnjo obravnavo
(**P2**, #12430): neobdelani posnetek zahteve odjemalca pred varnostno omejitvijo
v artefaktu podrobnega dnevnika; nadaljevanje `previous_response_id`, ki se ob
napaki varno zapre; notranje posredovanje izpeljanih pozivov, ki prepis vgradi v
sintetiziran niz poziva (stopnje cevovoda, predaja konteksta); ter telo odgovora
oziroma kopija odgovora modela v semantičnem predpomnilniku, ki citira prepis.
To so neobdelane površine oziroma površine razreda odgovorov ali površine, ki
jih je treba posebej omogočiti, zato ne spadajo v obseg shranjenega telesa
zahteve in pomnilnika Memory v P1.

Notranji življenjski cikel `/api/modality-bridge/video/drilldown` je ločena,
z povratno zanko in žetonom overjena predpomnilniška podlaga. Vsaka operacija
zahteva tudi kanonični neprosojni ID glavnega subjekta. Preden se omogoči
produkcijski klicatelj, mora ta ID izpeljati iz overjenega najemnika in nikoli
ne sme posredovati vrednosti, ki jo izbere odjemalec. Ključi predpomnilnika
vežejo ta glavni subjekt na kanonične ID-je seje in reference videoposnetka,
shranjujejo samo njihove ključe, izpeljane s SHA-256, ter omejijo tako branje
kot brisanje na isti glavni subjekt. Predpomnilnik shrani največ 16 izpeljanih
okvirjev JPEG na vnos, jih po desetih minutah označi kot potekle ter podpira
omejena branja `start`/`end` ali izrecen izbris seje.

Vsak glavni subjekt je omejen na 16 vnosov in 64 MiB kanoničnih podatkov JPEG.
Te omejitve so neodvisne od globalne zgornje meje 64 vnosov/256 MiB: pritisk
kvote glavnega subjekta pred upoštevanjem globalnega odstranjevanja LRU odstrani
samo najmanj nedavno uporabljene vnose tega glavnega subjekta. Potekli vnosi se
ob dejavnosti predpomnilnika odstranijo tako iz obračuna glavnega subjekta kot
iz globalnega obračuna, medtem ko prekinitev in neuspešno preverjanje veljavnosti
ne potrdita delne zamenjave.

Predpomnilnik zavrne nekanonični Base64, odvečno dopolnjevanje, predstavnostne
podatke, ki niso JPEG, nepravilno oblikovane ali okrnjene datoteke JPEG ter
datoteke JPEG, ki med omejenim dekodiranjem celotne slike s `sharp` povzročijo
opozorilo. Vsako sprejeto sliko ponovno kodira kot kanonični JPEG, širino in
višino izpelje iz dekodiranih bajtov, namesto da bi zaupal poljem klicatelja, ter
zavrže vse zaključne poliglotske bajte, namesto da bi jih ohranil. V obe kvoti
se všteva samo omejeni kanonični stisnjeni medpomnilnik. Omejitev prenosa JSON
vključuje režijske podatke Base64 za zgornjo mejo 32 MiB dekodiranega vhoda. Vsaka
shranjena izpeljava beleži preverjeno obliko/ločljivost JPEG, pravilnik vzorčenja,
različico izpeljave, čas nastanka, strežniško izračunano zgoščeno vrednost vsebine
ter zgoščeno nadrejeno referenco skupaj z zgoščeno vrednostjo nadrejene vsebine,
ki jo zagotovi zaupanja vredni klicatelj. Prekinitev se preveri med asinhronimi
fazami dekodiranja in izračunavanja zgoščene vrednosti, preden se predpomnilnik
atomsko potrdi.

Ta sklop še ne povezuje produkcijskega proizvajalca s potjo in ne zagotavlja
izbire različic z več ločljivostmi. Pregledna pot zahteve Video Bridge zato ne
povzroči dodatnega dela, izpeljava glavnega subjekta, vezana na najemnika, ter
celoten življenjski cikel FU-08 z več ločljivostmi pa ostajata izrecno nadaljnje
delo in nista dokumentirana kot dokončano vedenje.

Sličice so zaporedno opremljene z opisi z uporabo konfiguriranega modela Video. Prazna
preglasitev Video podeduje nastavitev Vision; če sta obe prazni, samodejni
usmerjevalnik Vision izbere dejanski model, ki podpira vid. Uspešni opisi
zamenjajo izvirni del s stalno predpono `[Video description:`, ki besedilo tudi
označi kot nezaupanja vredno opazovanje, izpeljano iz predstavnosti, in nadaljnjim
modelom naroči, naj ne upoštevajo navodil, najdenih v predstavnosti. Ključi
predpomnilnika opisov sličic vključujejo bajte JPEG, poziv, časovni žig in dejanski
model; predpomnijo se samo uspešni opisi. Vnosi v predpomnilniku ohranijo dejanski
model, ki je uspešno ustvaril rezultat, vključno z nadomestnim modelom; most sporoči
`mixed`, kadar so različne sličice ustvarili različni modeli. Zadetek v predpomnilniku
znova uporabi identiteto tega modela, namesto da bi jo preimenoval v zahtevani načrt
usmerjanja. Predpomnilnik rezultatov celotnega videoposnetka je določen z vsakim
vhodom, ki spremeni izhod — pozivom, dejanskim modelom, pravilnikom vzorčenja,
številom sličic, načinom semantične analize, prstnim odtisom SHA-256 normaliziranega
namiga za osredotočenje, oknom osredotočenja, `transcript`, `audioTranscript` in
zastavico kontaktnega lista — zato sprememba katere koli od teh razsežnosti povzroči
zgrešitev predpomnilnika in nikoli ponovne uporabe zastarelega rezultata. Različica
pravilnika vizualnega odstranjevanja dvojnikov, prag in omejeno število kandidatnih
sličic so prav tako izrecno vključeni v ključ in metapodatke predpomnilnika rezultatov;
sprememba pravilnika zato ne more ponovno uporabiti zastarelega opisa celotnega
videoposnetka. Metapodatki predpomnilnika rezultatov v4 hranijo način in prstni
odtis, nikoli pa neobdelane uporabnikove naloge. Metapodatki varovalnega mehanizma
navajajo tako zahtevani kot dejanski način analize; zahtevani način `focused` brez
uporabnega uporabniškega besedila je naveden kot dejansko `full`.

Varovalni mehanizem izvleče vsak podprt del videoposnetka, vendar jih opiše največ
`modalityBridgeVideoMaxVideos`. Za cilj, za katerega je dokazano, da ima
`supportsVideo === false`, neuspešni videoposnetki in videoposnetki nad omejitvijo
postanejo izrecne varne besedilne oznake, tako da ne preživi noben neobdelan
videoposnetek. Kadar zmožnost ni znana, ti deli ostanejo nedotaknjeni. Cilji z
`supportsVideo === true` obidejo most.
Signal za prekinitev zahteve odjemalca se razširi skozi prenos, čakalno vrsto
posrednika, podprocese in klice za ustvarjanje opisov; prekinitve ustavijo izvajanje
med videoposnetki in nikoli ne dovolijo nadaljevanja z neobdelano predstavnostjo.

Nastavitve izvajalnega okolja so shranjene v zbirki podatkov in preverjene z Zod:

| Ključ                               | Privzeto    | Razpon / vedenje                                                                                         |
| ----------------------------------- | ----------- | -------------------------------------------------------------------------------------------------------- |
| `modalityBridgeVideoEnabled`        | `false`     | Izbirno izvajalno okolje, omogočeno po izbiri                                                            |
| `modalityBridgeVideoAnalysisMode`   | `"full"`    | `full` ohrani splošne opise; `focused` uporablja omejen, nezaupanja vreden kontekst zadnjega uporabnika  |
| `modalityBridgeVideoModel`          | `""`        | Podeduje model mostu Vision                                                                              |
| `modalityBridgeVideoFrameCount`     | `8`         | 1–16                                                                                                     |
| `modalityBridgeVideoSamplingPolicy` | `"uniform"` | `uniform`, `scene_aware` ali sorazmerni `segment_aware`; napaka detektorja povzroči preklop na `uniform` |
| `modalityBridgeVideoMaxVideos`      | `1`         | 1–4                                                                                                      |
| `modalityBridgeVideoTimeout`        | `120000`    | 1000–120000 ms                                                                                           |

Starejše trajno shranjene vrednosti časovne omejitve Video nad 120 sekundami se
omejijo na rok posrednika; novi zapisi nastavitev nad to omejitvijo so zavrnjeni.
`GET /api/modality-bridge/video/runtime` pred preverjanjem pristnosti ali
poizvedovanjem o izvajalnem okolju zahteva zaupanja vredno, žigosano lokalnost
povratne zanke, nato pa zahteva skrbniško preverjanje pristnosti. Vrne samo
`available`, prečiščeni različici FFmpeg/ffprobe in nespremenljiv razlog, kadar
izvajalno okolje ni na voljo. Notranja končna točka za izvlečenje ni javni API za
nalaganje: nasičenost čakalne vrste vrne `503` skupaj z `Retry-After`, prekinitev
povezave klicatelja vrne `499`, nespremenljivi rok posrednika pa vrne `504`.
Pretvorjeni odgovori osrednji glavi `x-omniroute-modality-bridge` dodajo
`video->text;model=<visionModel>;parts=<videos>`, ne da bi odstranili segmente
Vision ali Audio.

### Maskirnik osebno določljivih podatkov (`piiMasker.ts`)

Izvaja se v **obeh** fazah.

- **`preCall`** klonira koristno vsebino, pregleda `system`, `messages`, `input` in
  `prompt` (vključno z elementi v obliki navadnega niza) ter uporabi `processPII()` (iz
  `@/shared/utils/inputSanitizer`) za polja nizov `content`/`text`. Kadar je
  `PII_REDACTION_ENABLED=true`, so zaznani osebno določljivi podatki v odhodni
  koristni vsebini redigirani. To je neodvisno od `INPUT_SANITIZER_MODE` (ki nadzira
  samo pravilnik za vrivanje pozivov). Kadar je redigiranje izklopljeno, klic zabeleži
  število zaznav, ne da bi prepisal vsebino.
- **`postCall`** globoko klonira odgovor ter izvede `sanitizePIIResponse()` in
  maskirnik oblike API-ja Responses (`maskResponsesOutput` — zajema
  `output_text` in `output[].content[].text`). Če pride do kakršnega koli
  redigiranja, spremenjeni odgovor nadomesti izvirnega.

Varovalni mehanizem nikoli ne blokira; samo doda opombe (`meta.detections`,
`meta.redacted`) ali prepiše vsebino.

### Vrivanje pozivov (`promptInjection.ts`)

Zazna nasprotovalne strukture v vsebini, ki jo posreduje uporabnik, in uveljavi
konfigurirani pravilnik. Vedenje določajo spremenljivke okolja in možnosti
konstruktorja:

| Nastavitev      | Spremenljivka okolja                                                                                     | Privzeto | Učinek                                                                                                                                                                                                                                 |
| --------------- | -------------------------------------------------------------------------------------------------------- | -------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Omogočeno       | `INPUT_SANITIZER_ENABLED`                                                                                | `true`   | Ko je nastavljeno na `false`, se varovalni mehanizem predčasno zaključi.                                                                                                                                                               |
| Način           | `INJECTION_GUARD_MODE` / `INPUT_SANITIZER_MODE`                                                          | `warn`   | Pravilnik za napade z vrivanjem: `block`, `warn` ali `log`. (`redact` je sprejet zaradi združljivosti za nazaj, vendar **ne** odstrani vrinjenega besedila; prepisovanje osebnih podatkov v zahtevi upravlja `PII_REDACTION_ENABLED`.) |
| Prag blokiranja | Možnost `blockThreshold` / `INPUT_SANITIZER_BLOCK_THRESHOLD` (vzdevek `INJECTION_GUARD_BLOCK_THRESHOLD`) | `high`   | Najnižja stopnja resnosti, potrebna za blokiranje. Pri privzeti nastavitvi je srednja stopnja namenjena samo opazovanju.                                                                                                               |

**Prednostni vrstni red načinov** (`getMode`): klicateljev `options.mode` →
**preglasitev funkcijske zastavice v zbirki podatkov** `INJECTION_GUARD_MODE` (Nadzorna plošča → Nastavitve →
Funkcijske zastavice) → spremenljivka okolja `INJECTION_GUARD_MODE` → spremenljivka okolja `INPUT_SANITIZER_MODE` →
`warn`. Preglasitev na nadzorni plošči ima zato prednost pred spremenljivkami okolja, tako da uporabniški vmesnik
Funkcijske zastavice sproti upravlja delujoči varovalni mehanizem (brez ponovnega zagona). Branje iz zbirke podatkov je varno ob napaki:
če pride do napake, varovalni mehanizem uporabi vedenje na podlagi spremenljivk okolja, kadar pa
preglasitev ni nastavljena, je vedenje enako razreševanju samo na podlagi spremenljivk okolja.

Viri zaznavanja:

1. `sanitizeRequest()` iz `@/shared/utils/inputSanitizer` (skupni nabor
   detektorjev, uporabljen tudi drugod v cevovodu).
2. Vgrajeni `DEFAULT_GUARD_PATTERNS` (trenutno `system_override_inline` in
   `markdown_system_block`, oba z resnostjo `high`).
3. Izbirni `customPatterns`, posredovani prek možnosti konstruktorja (nizi, regularni izrazi
   ali zapisi `{ name, pattern, severity }`).

Ko je `mode === "block"` **in** vsaj ena zaznava doseže prag
resnosti, `preCall` vrne `{ block: true, message: "Zahteva zavrnjena:
zaznana je bila sumljiva vsebina" }`. V načinih `warn`/`log` varovalni mehanizem dogodek zabeleži, vendar
dovoli klic. Skupna pomožna funkcija `evaluatePromptInjection()` je prav tako izvožena
za klicatelje, ki morajo oceniti pozive brez uporabe registra.

**Omejitev pregledovanja (v3.8.20):** detektor pregleda samo **prvih 16 KB**
združenega besedila poziva — `MAX_INJECTION_SCAN_BYTES = 16 * 1024` (16 384 bajtov) v
`src/shared/utils/inputSanitizer.ts`. Tako `detectInjection()` kot
`evaluatePromptInjection()` pred izvajanjem zanke vzorcev uporabita `slice(0, MAX_INJECTION_SCAN_BYTES)`.
Direktive za vrivanje so blizu začetka vhoda, zato to omeji porabo procesorja in zbiralnika smeti zaradi regularnih izrazov
pri koristnih vsebinah z več sto KB, ne da bi oslabilo zaznavanje (prim.
#3932, #4041).

### Maskiranje poverilnic (`credentialMasker.ts`)

Izvaja se v **obeh** fazah, zadnje v privzeti verigi (prednost `95`). Prekrije
dobro znane vzorce ključev API / skrivnih žetonov v odhodni koristni vsebini (vsebina
sporočila, argumenti klicev orodij, rezultati orodij) **in** v odgovoru ponudnika, tako da
poverilnica, prilepljena v poziv (ali vrnjena v rezultatu orodja), ne uide
zunanjemu ponudniku ali nazaj odjemalcu.

- **Samo z izrecno vključitvijo**, po enakem dogovoru kot prekrivanje osebnih podatkov (sorodno Trdemu pravilu št. 20):
  onemogočeno, razen če je `settings.credentialRedactionEnabled === true` **ali**
  `CREDENTIAL_REDACTION_ENABLED=true`. Ko je izklopljeno, varovalni mehanizem ne izvede ničesar —
  nikoli ne blokira in nikoli ne prepisuje.
- `redactCredentials()` prehodi celotno drevo koristne vsebine/odgovora (`walkValue()`,
  varno pred onesnaženjem prototipa, varno pred cikli z uporabo `WeakSet`) in zadetke nadomesti
  z označbo `[REDACTED:<type>]`, pri čemer klonira samo veje, ki so se dejansko
  spremenile.
- `CREDENTIAL_PATTERNS` zajema ključe ponudnikov LLM (OpenAI, OpenAI-proj,
  Anthropic, Google, Hugging Face, Replicate), žetone VCS/SaaS (GitHub, Slack,
  Linear, Notion, npm, Postman, Discord), plačilne ključe (Stripe, Square), ključe
  oblačnih storitev (dostopni ključ AWS, Twilio, SendGrid, Mailgun), zasebne ključe / JWT-je,
  povezovalne nize s poverilnicami (`mongodb://user:pass@...` itd.) in
  splošni vzorec vrednosti glave `Authorization`/`x-api-key`/`api-key`/`apikey`.
  Ključi v obliki glav (`authorization`, `x-api-key`, `api-key`,
  `apikey`) se prekrijejo strukturno (samo vrednost, predpona sheme, kot je
  `Bearer `/`Basic `, pa se ohrani), namesto prek splošnega regularnega izraza za besedilo.
- Varovalni mehanizem nikoli ne blokira; samo prepisuje (`modifiedPayload` /
  `modifiedResponse`) in dodaja opombe (`meta.credentialsRedacted`, `meta.count`).

Zaščita pred regresijami: `tests/unit/credential-masker-guardrail.test.ts`.

## Osnovna pogodba (`base.ts`)

```typescript
class BaseGuardrail {
  enabled: boolean;
  name: string;
  priority: number;

  constructor(name: string, options?: { enabled?: boolean; priority?: number });

  async preCall(payload: unknown, context: GuardrailContext): Promise<GuardrailResult | void>;

  async postCall(response: unknown, context: GuardrailContext): Promise<GuardrailResult | void>;
}

interface GuardrailResult<TValue = unknown> {
  block?: boolean; // vrednost true prekine verigo
  message?: string; // prikazano ob blokiranju
  meta?: Record<string, unknown> | null;
  modifiedPayload?: TValue; // vrne preCall za preoblikovanje zahteve
  modifiedResponse?: TValue; // vrne postCall za preoblikovanje odgovora
}

interface GuardrailContext {
  apiKeyInfo?: Record<string, unknown> | null;
  disabledGuardrails?: string[] | null;
  endpoint?: string | null;
  headers?: Headers | Record<string, unknown> | null;
  log?: GuardrailLog | Console | null;
  method?: string | null;
  model?: string | null;
  provider?: string | null;
  signal?: AbortSignal;
  sourceFormat?: string | null;
  stream?: boolean;
  targetFormat?: string | null;
}
```

Varovalo sporoči »brez spremembe« tako, da vrne `void`, `{}` ali
`{ block: false }`. Vrnitev `modifiedPayload`/`modifiedResponse` zamenja
vrednost, ki teče skozi verigo do naslednjih varoval.
`signal?: AbortSignal` posreduje življenjski cikel klicatelja varovalom. Prekinitev zahteve je namerna izjema s pristopom »fail-open«: predstavnostni mostovi ustavijo delo in počistijo vire, ne da bi obnovili neobdelano predstavnost za cilj, za katerega je znano, da je ne podpira.

## Register (`registry.ts`)

Edinec `guardrailRegistry` izpostavlja:

- `register(guardrail)` — doda varovalo (ali ga zamenja glede na normalizirano ime) in
  znova razvrsti varovala po naraščajoči vrednosti `priority`.
- `clear()` / `list()` — skrbniški pomožni funkciji.
- `runPreCallHooks(payload, context)` — gre skozi aktivna varovala, posreduje
  koristno vsebino prek `modifiedPayload` in se ustavi pri prvem `block: true`.
- `runPostCallHooks(response, context)` — enak potek na strani odgovora.
- `resetGuardrailsForTests({ registerDefaults })` — počisti stanje in po želji
  znova registrira privzete nastavitve za čisto izolacijo preizkusov.

Oba izvajalnika vrneta `{ blocked, payload|response, results, guardrail?, message? }`,
pri čemer je `results` polje zapisov `GuardrailExecutionResult`, ki vključujejo
polja `blocked`, `skipped`, `modified`, `error` in `meta` za vsako varovalo,
kar je uporabno za sledenje.

### Onemogočanje varoval za posamezno zahtevo

`resolveDisabledGuardrails({ apiKeyInfo, body, headers })` zbere
podvojenih vrednosti očiščen seznam imen varoval, ki jih je treba preskočiti za trenutno
zahtevo. Viri (vsi izbirni, vsi združeni):

- `apiKeyInfo.disabledGuardrails`
- `disabledGuardrails` v telesu zahteve (na najvišji ravni)
- `metadata.disabledGuardrails` v telesu zahteve
- Glava `x-omniroute-disabled-guardrails` (ali starejša
  `x-disabled-guardrails`)

Vrednosti so lahko polja nizov ali niz, ločen z vejicami; imena so
normalizirana v male črke in zapis kebab-case (`pii_masker` → `pii-masker`). Rezultat
se prek `context.disabledGuardrails` posreduje registru, ki preskoči
ujemajoča se varovala (`skipped: true` v `results`).

## Vrstni red izvajanja

Za vsako zahtevo, ki teče skozi `src/sse/handlers/chat.ts` in
`open-sse/handlers/chatCore.ts`:

1. `resolveDisabledGuardrails(...)` sestavi seznam za preskok na podlagi ključa API, telesa
   in glav.
2. `guardrailRegistry.runPreCallHooks(body, ctx)` izvede varovalne mehanizme po naraščajočem
   vrstnem redu prioritete:
   - Onemogočeni varovalni mehanizmi so zabeleženi kot `skipped`.
   - `preCall` vsakega varovalnega mehanizma lahko prepiše koristno vsebino prek `modifiedPayload`.
   - Prvi `block: true` prekine verigo, obravnavalnik pa vrne
     odgovor o zavrnitvi s strani varovalnega mehanizma.
3. (Morebiti prepisana) koristna vsebina se posreduje kombiniranemu usmerjanju in
   pošiljanju nadrejenemu ponudniku.
4. Ko je odgovor sestavljen, `guardrailRegistry.runPostCallHooks(...)`
   izvede isto verigo nad odgovorom. `block: true` na tej točki zavrže odgovor
   nadrejenega ponudnika.

Varovalni mehanizmi, ki sprožijo izjemo, so zabeleženi z `error: <message>` in zapisani v dnevnik prek
`logger.warn`, vendar se veriga nadaljuje — zasnovano po načelu odprtega odpovedovanja.

## Konfiguracija

Spremenljivke okolja, ki jih berejo vgrajeni varovalni mehanizmi:

| Spremenljivka                         | Uporablja jo                 | Učinek                                                                                                                       |
| ------------------------------------- | ---------------------------- | ---------------------------------------------------------------------------------------------------------------------------- |
| `INPUT_SANITIZER_ENABLED`             | `prompt-injection`           | Nastavite na `false`, da zaznavanje v celoti onemogočite.                                                                    |
| `INPUT_SANITIZER_MODE`                | `prompt-injection`           | Pravilnik za vrivanje: `warn`, `block` ali `log`. Podedovana vrednost `redact` ne prepisuje vrinjenega besedila.             |
| `INJECTION_GUARD_MODE`                | `prompt-injection`           | Način za zaščito pred vrivanjem; tudi zastavica funkcije v zbirki podatkov, ki **preglasi** spremenljivke okolja (DB > ENV). |
| `INPUT_SANITIZER_BLOCK_THRESHOLD`     | `prompt-injection`           | Najnižja stopnja resnosti, ki jo `MODE=block` zavrne: `high` (privzeto), `medium` ali `low`.                                 |
| `INJECTION_GUARD_BLOCK_THRESHOLD`     | `prompt-injection`           | Podedovan vzdevek za `INPUT_SANITIZER_BLOCK_THRESHOLD`.                                                                      |
| `PII_REDACTION_ENABLED`               | `pii-masker`                 | Ko je nastavljeno na `true`, se podatki PII v zahtevi zakrijejo (neodvisno od načina vrivanja).                              |
| `PII_RESPONSE_SANITIZATION` / `_MODE` | `pii-masker` (nadaljnji tok) | Nadzira vedenje prikrivanja na strani odgovora.                                                                              |

Varovalni mehanizmi Modality Bridge berejo izvajalno konfiguracijo iz shrambe
nastavitev, podprte z zbirko podatkov (`getSettings()`), in ne iz spremenljivk okolja. Primarni ključi za slikovni način so
`modalityBridgeVisionEnabled`, `modalityBridgeVisionMode`,
`modalityBridgeVisionModel`, `modalityBridgeVisionTaskAware`,
`modalityBridgeVisionPrompt`, `modalityBridgeVisionTimeout`,
`modalityBridgeVisionMaxImages`, `modalityBridgeVisionMaxChars`,
`modalityBridgeCacheEnabled`, `modalityBridgeCacheTtlMinutes` in
`modalityBridgeCacheMaxEntries`. Podedovani ključi
`visionBridge*` so sprejeti samo kot dokumentiran nadomestni način branja za en cikel;
zapisi nadzorne plošče uporabljajo primarne ključe. Privzete vrednosti in razreševalnik nadomestnih vrednosti
so v `src/shared/constants/modalityBridgeDefaults.ts`, podedovane
konstante pa so ohranjene v `src/shared/constants/visionBridgeDefaults.ts`.

Zvok uporablja `modalityBridgeAudioEnabled`, `modalityBridgeAudioModel`,
`modalityBridgeAudioTimeout` in `modalityBridgeAudioMaxClips` ter skupne
nastavitve `modalityBridgeCache*`. Zvok nima nadomestnega branja podedovanih ključev, ker so bili ti
ključi uvedeni s shemo Modality Bridge.

Video uporablja `modalityBridgeVideoEnabled`, `modalityBridgeVideoAnalysisMode`,
`modalityBridgeVideoModel`,
`modalityBridgeVideoFrameCount`, `modalityBridgeVideoSamplingPolicy`,
`modalityBridgeVideoMaxVideos` in
`modalityBridgeVideoTimeout` ter skupne nastavitve `modalityBridgeCache*`.
Privzeto je onemogočen, ker sta FFmpeg/ffprobe izbirni operativni
odvisnosti, opisovanje sličic pa poveča zakasnitev in stroške modela.

## Zaščitni mehanizmi po meri

```typescript
import { BaseGuardrail, guardrailRegistry } from "@/lib/guardrails";

class BudgetGuardrail extends BaseGuardrail {
  constructor() {
    super("budget", { priority: 50 });
  }

  async preCall(payload, ctx) {
    if (ctx.apiKeyInfo?.budgetExceeded) {
      return { block: true, message: "Daily budget exceeded" };
    }
    return { block: false };
  }
}

guardrailRegistry.register(new BudgetGuardrail());
```

Koraki:

1. Ustvarite `src/lib/guardrails/myGuardrail.ts`, ki razširja `BaseGuardrail`.
2. Implementirajte `preCall` in/ali `postCall`.
3. Registrirajte ga bodisi ob uvozu (dodajte ga iz `registerDefaultGuardrails`) bodisi
   med izvajanjem pokličite `guardrailRegistry.register(...)` — register zamenja
   vsak predhodni zaščitni mehanizem z enakim normaliziranim imenom.
4. Dodajte teste v `tests/unit/` (obstoječi primeri:
   `tests/unit/guardrails-registry.test.ts`,
   `tests/unit/prompt-injection-guard.test.ts`,
   `tests/unit/guardrails/visionBridge.test.ts`).

## Testiranje

Med testi uporabite `resetGuardrailsForTests()`, da začnete iz znanega stanja.
Posredujte `{ registerDefaults: false }`, da začnete s praznim registrom in
registrirate samo zaščitne mehanizme, ki jih testirate. Vision Bridge podpira vstavljanje
odvisnosti (`deps.getSettings`, `deps.callVisionModel`); Audio Bridge ponuja
enakovredne priključne točke za nastavitve, zmogljivosti, izbiro modela STT, preverjanje
poverilnic in prepisovanje. Testi lahko zato preverjajo oba poteka brez dostopa do
podatkovne zbirke ali omrežja.

## Glejte tudi

- `src/lib/guardrails/` — implementacija
- `src/shared/utils/inputSanitizer.ts` — skupni detektor, ki omogoča
  zaznavanje vbrizgavanja pozivov in maskiranje osebno določljivih podatkov
- `src/shared/constants/visionBridgeDefaults.ts` — privzete nastavitve Vision Bridge in
  seznam modelov s prisilno uporabo mostu
- `src/shared/constants/modalityBridgeDefaults.ts` — skupne privzete nastavitve izvajalnega okolja Vision/Audio
- `docs/architecture/RESILIENCE_GUIDE.md` — neodvisna plast (varovalka, obdobja mirovanja)
- `docs/reference/ENVIRONMENT.md` — celoten pregled spremenljivk okolja

## Pokritost poti z zaščito pred vbrizgavanjem in red-team testiranje (8. faza · sklop D)

Zaščita pred vbrizgavanjem (`createInjectionGuard` / `withInjectionGuard`) pokriva vse poti,
ki sprejemajo uporabniške pozive. Upošteva `INJECTION_GUARD_MODE` (privzeto `warn` = samo beleženje;
`block` = vrne HTTP 400 `SECURITY_001`).

| Vrsta                | Poti                                                                                                                                                 | Privzeti način |
| -------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- | -------------- |
| Besedilo (obstoječe) | `/v1/chat/completions`, `/v1/completions`, `/v1/relay/chat/completions`                                                                              | warn           |
| Generativno          | `/v1/messages`, `/v1/responses`, `/v1/images/generations`, `/v1/images/edits`, `/v1/videos/generations`, `/v1/music/generations`, `/v1/audio/speech` | warn           |
| Podatki              | `/v1/embeddings`, `/v1/rerank`, `/v1/search`, `/v1/moderations`                                                                                      | warn           |

Izločanje besedila (`extractMessageContents`) pokriva `messages`/`input`/`prompt`/`query`+`documents`/`instructions`/`system`.

**Red-team testiranje (vsako noč, `nightly-llm-security.yml`):** promptfoo preverja, ali vsaka pot blokira
korpus OWASP-LLM v načinu `INJECTION_GUARD_MODE=block`; garak izvaja sonde (brez skrivnosti se preskoči).
Pot `moderations` je vključena zaradi doslednosti — upravljavci jo lahko v načinu blokiranja izvzamejo prek
`resolveDisabledGuardrails`.

Nočni delovni tok (`.github/workflows/nightly-llm-security.yml`, cron + ročni
zagon) ima dve opravili:

- **`promptfoo-guard` (blokirajoče)** — izvede `promptfoo eval -c promptfooconfig.yaml`
  z `INJECTION_GUARD_MODE=block`. Vsak nasprotniški primer (npr. »prezri vsa
  prejšnja navodila …«, poskusi pobega iz omejitev v slogu DAN) preveri, ali odgovor vsebuje
  `error.code === "SECURITY_001"`, tj. ali je zaščita dejansko zavrnila zahtevo.
- **`garak` (svetovalno)** — izvede garak `--probes promptinject,dan,leakreplay`
  proti lokalnemu primerku OmniRoute (`http://localhost:20128/v1`). Pogojeno je s
  skrivnostjo ponudnika (`PROMPTFOO_PROVIDER_KEY`); brez nje se elegantno preskoči, ukaz pa ima pripono
  `|| true`, zato poroča, ne da bi povzročil neuspeh CI.

Pokritost pomožne funkcije zaščite (`createInjectionGuard` / `withInjectionGuard`)
obsega vse poti `/v1`, ki sprejemajo pozive; besedilo poziva se pridobi iz
`messages`/`input`/`prompt`/`query`+`documents`/`instructions`/`system` s funkcijo
`extractMessageContents()` v `src/shared/utils/inputSanitizer.ts`.
