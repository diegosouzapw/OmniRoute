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

Register samodejno naloži šest varoval po prednostnem vrstnem redu ob uvozu
(glej `registry.ts` → `registerDefaultGuardrails()`):

| Prioriteta | Ime                 | Faza(e)        | Datoteka              |
| ---------- | ------------------- | -------------- | --------------------- |
| `5`        | `vision-bridge`     | `preCall`      | `visionBridge.ts`     |
| `6`        | `audio-bridge`      | `preCall`      | `audioBridge.ts`      |
| `7`        | `video-bridge`      | `preCall`      | `videoBridge.ts`      |
| `10`       | `pii-masker`        | `pre` + `post` | `piiMasker.ts`        |
| `20`       | `prompt-injection`  | `preCall`      | `promptInjection.ts`  |
| `95`       | `credential-masker` | `pre` + `post` | `credentialMasker.ts` |

Nižje prioritetne številke se izvedejo **prve**.

### Vizualni most (`visionBridge.ts`) — Most modalnosti PR-1

Prestrezava zahteve, ki vsebujejo slike in so namenjene **modelom brez vizualnih zmožnosti**, ter bodisi preusmeri celotno zahtevo na model, ki podpira vid, bodisi nadomesti slikovne dele z besedilnimi opisi, ki jih ustvari nastavljiv vizualni model, pred klicem navzgor. To omogoča ponudnikom samo za besedilo, da transparentno obravnavajo večmodalne tovore.

Potek:

1.  Preskoči, če ciljni model že podpira vid (razen če se pojavi na seznamu prisilnih mostov `isVisionBridgeForcedModel`).
2.  Izvleče slikovne dele prek `extractImageParts(messages)`
    (`visionBridgeHelpers.ts`), ki delegira na **poenoten detektor medijev**
    `detectMediaParts()` v `open-sse/utils/mediaParts.ts` — enoten vir resnice,
    deljen s filtrom združljivosti kombinacij. Ekstrakcija je na seznamu dovoljenih
    za dele najvišje ravni oblik, ki jih `replaceImageParts` lahko vstavi nazaj
    (pogodba izvleci↔nadomesti): OpenAI `image_url`, Anthropic base64
    `source.type:"base64"`, Anthropic URL `source.type:"url"` in Responses API
    `input_image`. Ugnezdeni zadetki in oblike samo za indikatorje so material
    za kombinirani filter in niso nikoli izvlečeni. Preskoči, če ni najdenih.
3.  Razreši konfiguracijo med izvajanjem prek `resolveVisionBridgeRuntimeSettings()`
    (`src/shared/constants/modalityBridgeDefaults.ts`): nove nastavitve `modalityBridge*`
    prevladajo; stare nastavitve `visionBridge*` ostanejo **enociklična rezerva**
    (okno za povratno stanje). Preskoči pred kakršnim koli prehodom medijev,
    ko je most onemogočen.
4.  Izbirnik načina (`modalityBridgeVisionMode`, glej spodnjo tabelo) odloča
    o preusmeritvi proti opisu. Preusmeritev vrne `modifiedPayload` z zamenjanim
    samo `model`-om, plus meta podatke `{ rerouted, fromModel, toModel, imagesKept }`.
5.  Pot opisa: omeji slike na `maxImages`, sestavi poziv, ki upošteva nalogo,
    preveri predpomnilnik opisov, pokliče vizualni model **vzporedno**
    (`Promise.allSettled`) in vstavi besedilne dele `[Slika N]: <opis>` na
    njihovo mesto. Neuspešen opis vrne `null` in izvirni slikovni del je
    **ohranjen** (#4012) — razen na poti kombiniranega opisa, ko so vsi opisi
    spodleteli, kjer potrjen ne-vizualni vir prejme nadomestek
    `(ni na voljo — ni povezanega ponudnika, ki podpira vid)` namesto tega (#8430).
6.  Vrne `modifiedPayload` + meta podatke (`imagesProcessed`, `descriptions`,
    `processingTimeMs`, `visionModel`).

#### Izbirnik načina (`modalityBridgeVisionMode`)

| Način      | Privzeto | Obnašanje                                                                                                                                                                                                                                                                                      |
| ---------- | -------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `auto`     | ✔        | Zapuščena hevristika, nedotaknjena (#6640/#7204): ne-kombinirani/`auto/` modeli se preusmerijo na najboljši model vida, razen če ima izvirni model že uporabne poverilnice (potem opišejo); kombinirane tarče vedno opišejo.                                                                   |
| `describe` |          | Vedno opiši — blok za preusmeritev je v celoti preskočen; uporabnikov izbrani model vedno odgovori.                                                                                                                                                                                            |
| `reroute`  |          | Prisilna preusmeritev: varovalo za ohranjanje modela s poverilnicami je obvoženo. Varovalo poverilnic za **cilj** preusmeritve še vedno velja — kadar ni na voljo uporabnega vizualnega cilja, zahteva pade na opis, tako da surove slike nikoli ne dosežejo zaledja samo za besedilo (#8430). |

Prisilni načini se izvedejo **pred** zagonom avtomatske hevristike; obnašanje `auto`
je bitno enako varovalu pred PR-1.

#### Poziv za opis, ki upošteva nalogo (`modalityBridgeVisionTaskAware`)

Privzeto **true**. `composeVisionPrompt()` (`visionBridgeHelpers.ts`) doda
besedilo **zadnjega uporabnikovega sporočila** (skrajšano na 500 znakov) k
osnovnemu pozivu za opis, s čimer usmerja opis k temu, kar je uporabnik
dejansko vprašal (vzorec codex-vision-proxy) in prosi model vida, naj prepiše
vidno besedilo. Če je zastavica izklopljena — ali ni uporabnikovega besedila —
se osnovni poziv uporabi nespremenjen.

Lastni OpenAI-združljiv zahtevek zanke `describe self-loop` (`callVisionModelSingle()` v `visionBridgeHelpers.ts`) vedno zahteva `image_url.detail: "high"` – brezpogojno, za vsakega klicatelja/ponudnika, ne glede na signal odjemalca. Vzorčenje z nizko podrobnostjo zmanjšuje natančnost OCR za nalogo prepisovanja besedila, ki jo zahteva ta poziv, zato klic `describe` sam vedno zahteva visoko podrobnost, ne glede na to, katero raven podrobnosti je uporabil prvotni dohodni zahtevek. To vpliva samo na telo internega zahtevka `describe`; ne spreminja načina, kako OmniRoute posreduje klicateljevo lastno `image_url.detail` pri primarnem zahtevku – ta privzeta vrednost se uporablja ločeno in samo za zaznane odjemalce OpenCode v `defaultImageDetail()` (`open-sse/handlers/chatCore/upstreamBody.ts`). Veja `Anthropic wire-format` zanke `describe self-loop` nima polja `detail` in nanjo ne vpliva nobena privzeta vrednost.

#### Omejitev izhoda opisa (`modalityBridgeVisionMaxChars`)

| Ključ                          | Privzeto | Razpon            |
| ------------------------------ | -------- | ----------------- |
| `modalityBridgeVisionMaxChars` | `0`      | `0` ali 100–50000 |

`0` (privzeto) pomeni **brez omejitve** – opis, ki ga vrne `callVisionModel()`, se posreduje nespremenjen, s čimer se ohrani obstoječe vedenje. Vsaka vrednost v razponu 100–50000 skrajša opis s pripono `…`, preden se ta ponovno vstavi kot `[Image N]: <description>` (`VisionBridgeGuardrail.preCall()` v `src/lib/guardrails/visionBridge.ts`). To vrednost povečajte za naloge OCR, ki so bogate s podrobnostmi in kjer spodnji model potrebuje celoten prepis; zmanjšajte jo, da omejite porabo žetonov pri zgovornih vizualnih modelih. Polje na nadzorni plošči se nahaja na zavihku Vision, v plošči Advanced (`modality-bridge-max-chars` v `ModalityBridgeVisionTab.tsx`) in omejuje vsako vrednost med 1 in 99 na spodnjo mejo 100, medtem ko eksplicitno `0` pusti nedotaknjeno – `0` je veljavna vrednost Zod sama po sebi (`z.union([z.literal(0), z.number().int().min(100).max(50000)])`), ne zgolj "nenastavljena" privzeta vrednost.

#### Predpomnilnik opisa (`modalityBridge/bridgeCache.ts`)

V pomnilniku LRU + TTL predpomnilnik za izhode opisov, deljen znotraj procesa.
Ključ = `sha256(imageRef + composedPrompt + configuredBridgeModel)` z uokvirjanjem dolžine predpone (brez trkov mej polj). Komponenta modela je **konfiguriran** premostitveni model, ne model, ki je dejansko odgovoril – `callVisionModel` se lahko interno vrne na nadomestno rešitev, in ključevanje na poskus bi razdrobilo predpomnilnik. Neuspeli opisi se nikoli ne predpomnijo. Nastavitve:

| Ključ                           | Privzeto | Razpon  |
| ------------------------------- | -------- | ------- |
| `modalityBridgeCacheEnabled`    | `true`   | —       |
| `modalityBridgeCacheTtlMinutes` | `60`     | 1–1440  |
| `modalityBridgeCacheMaxEntries` | `200`    | 10–5000 |

#### Normalizacija oddaljenih slik (opis zanke/pridobivanje base64)

Ko most sam pridobi **oddaljeno** sliko – samoklic opisa Anthropic in pretvorba base64 v formatu claude-wire-format (`ensureBase64ImagesForClaudeWire`), oboje prek `fetchRemoteImageAsDataUri()` v `visionBridgeHelpers.ts` – se nastali podatkovni URI posreduje skozi `normalizeDataUri()` (`open-sse/utils/imageNormalize.ts`), preden se vgradi v zahtevek vizualnega modela. Prevelike slike se pomanjšajo na **2048px dolgo stranico** (kar ustreza omejitvi spreminjanja velikosti, ki jo OpenAI/Anthropic že uporabljata na strežniški strani), kar zmanjša prenesene bajte/latenco, ne da bi spremenilo, kar vidi vizualni model. Spreminjanje velikosti uporablja `sharp`, naložen prek dinamičnega uvoza: na platformi, kjer se njegova izvorna binarna datoteka ne naloži, `normalizeDataUri()` **nikoli ne vrže napake** – vrne se na posredovanje izvirnih bajtov, tako da pot opisa/pretvorbe base64 vedno deluje. Nebajtne slike (pridobitev, ki ni vrnila dekodirljive slike) se prav tako posredujejo nedotaknjene. Ta normalizacija je omejena na slike, ki jih most pridobi za svoj lastni samoklic – nikoli se ne uporablja za klicateljev neobdelan prehodni tovor, kar je v skladu z načelom mutacije samo z opt-in (Trdo pravilo #20).

#### Shema nastavitev + migracija

Novi ključi `modalityBridge*` so Zod-validirani v `updateSettingsSchema` (`src/shared/validation/settingsSchemas.ts`): `modalityBridgeVisionEnabled`, `modalityBridgeVisionMode`, `modalityBridgeVisionModel`, `modalityBridgeVisionTaskAware`, `modalityBridgeVisionPrompt`, `modalityBridgeVisionTimeout`, `modalityBridgeVisionMaxImages`, `modalityBridgeVisionMaxChars`, trojica `modalityBridgeCache*` in skupina `modalityBridgeAudio*`, ki jo uporablja Audio Bridge. Migracija `141_modality_bridge_settings.sql` kopira obstoječe stare vrednosti `visionBridge*` v ustrezne nove ključe (idempotentno, nikoli ne prepiše vrednosti `modalityBridge*`, ki jo je nastavil operater); stari ključi ostanejo sprejeti kot nadomestni vir za branje za en cikel izdaje.

#### Glava preglednosti + statistika

Odzivi, preoblikovani z opisom, vsebujejo `x-omniroute-modality-bridge: image->text;model=<visionModel>;parts=<n>` (zgrajeno z `buildModalityBridgeHeader()` v `modalityBridge/bridgeStats.ts`, označeno z `withModalityBridgeHeader()` v `src/sse/handlers/chatHelpers.ts`). Preusmerjeni zahtevki **ne dobijo** glave – tovor je bil nedotaknjen in zamenjava modela je že vidna v polju `model` v telesu odziva.

`GET /api/modality-bridge/stats` (upravljavska avtentikacija, isti nivo kot `GET /api/settings`) vrne števce v pomnilniku za posamezne modalnosti `{ attempts, successes, bridged, cacheHits, failures, totalLatencyMs, latencySamples, averageLatencyMs, lastUsedAt }` za `vision`, `audio` in `video`. `averageLatencyMs` uporablja `latencySamples`, ne vse poskuse, kot imenovalec; operacija brez merjenja časa ne ustvari vzorca z nič milisekundami. `bridged` ostaja nazaj združljiv vzdevek za uspešne pretvorbe; neuspeli poskusi ga ne povečajo. Števci se ponastavijo ob ponovnem zagonu procesa po zasnovi (telemetrija, ne računovodstvo).

#### Konfiguracija nadzorne plošče

Namenska stran nadzorne plošče je
`/dashboard/settings/modality-bridge`. Njene URL-naslovljive zavihke `Vision`, `Audio`
in `Video` ohranjajo parametre poizvedbe med preklapljanjem vrednosti `tab`.
Zavihek Vision omogoča vklop, način, izbiro modela (vključno s samodejno
privzeto izbiro), pozivanje, ki upošteva naloge, napredne omejitve
časovne omejitve/slike/dolžine opisa/predpomnilnika, števce izvajanja
in zaščiteno vzorčno zahtevo. Zavihek Audio je prav tako aktiven: omogoča
vklop, izbirnik modelov samo za STT z možnostjo Auto, omejitve časovne
omejitve/največjega posnetka, zvočne števce in vzorčni test `input_audio`.
Zavihek Video je funkcionalen: poroča o stanju izvajanja FFmpeg/ffprobe —
eno od štirih eksplicitnih stanj uporabniškega vmesnika (`unknown`, medtem ko
je sonda v teku ali se ni mogla dokončati, `restricted` na gostitelju nadzorne
plošče, ki ni povratna zanka, kjer je sonda preskočena na strani odjemalca,
`unavailable`, ko je sonda preverjena in potrjeno manjka, ali `available`
z različicami FFmpeg/ffprobe) — ohranja omejitve omogočanja/modela/okvirja/videa/časovne
omejitve, filtrira izbirnik modelov na modele, ki podpirajo vizijo, in prikazuje
video števce.

Nekdanja kartica Vision Bridge pod nastavitvami AI je povezava za združljivost
na novo stran; ne vsebuje več druge kopije obrazca. Ponudniki medijev prav tako
povezujejo delovne tokove pretvorbe slike v besedilo in govora v besedilo z
ustreznimi zavihki Modality Bridge, ne da bi odstranili obstoječe igrišče za
pretvorbo govora v besedilo.

**Obvod preverjanja dostopa z zanko:** ko klic za opis poteka skozi lastno
zanko `/v1` OmniRoute (nestandardni model ponudnika), podzahteva pošlje
`x-omniroute-admission-bypass: internal` in je avtenticirana z razrešeno
poverilnico zanke — lokalnim `sk_omniroute` sentinelom v lokalnem načinu
ali operaterjevo konfigurirano okoljsko spremenljivko `OMNIROUTE_API_KEY` /
`ROUTER_API_KEY` (#1350), tako da lahko implementacije z `REQUIRE_API_KEY=true`
še vedno izvajajo klic za opis. Obvod je upoštevan samo za te točne
poverilnice, zato zunanji odjemalci ne morejo uporabiti glave za preskok
preverjanja dostopa.

Stare privzete nastavitve so v `src/shared/constants/visionBridgeDefaults.ts`;
nove privzete nastavitve za način/nalogo/predpomnilnik in razreševalnik
nastavitev so v `src/shared/constants/modalityBridgeDefaults.ts`. Zaščitna
ograja razkriva možnost konstruktorja `deps`, tako da lahko testi vbrizgajo
lažne implementacije `getSettings` in `callVisionModel`.

### Zvočni most (`audioBridge.ts`) — Modality Bridge PR-3

Prestrezava klepetalne zahteve, ki vsebujejo zvok, preden dosežejo cilj, za
katerega ni znano, da sprejema zvočni vnos. Nikoli ne preusmeri klepetalne
zahteve: zvočni deli so prepisani prek obstoječe večdelne končne točke,
združljive z OpenAI, in izbrani model klepeta nadaljuje z besedilnimi prepisi.

Potek:

1.  Razreši `supportsAudio` prek `getResolvedModelCapabilities()`. Eksplicitni
    metapodatki registra ponudnikov prevladajo, nato statični metapodatki
    modela, nato sinhronizirani `modalities_input`. Deklariran seznam vnosov
    brez `audio` je `false`; brez dokazov o zmožnostih ostane `null`. Tako
    `false` kot `null` aktivirata konzervativni most, medtem ko `true` omogoča
    obvod.
2.  Razreši nastavitve `modalityBridgeAudio*` in izvleče združljive zvočne
    dele najvišje ravni iz vsakega sporočila prek skupnega detektorja
    `detectMediaParts()`. Podprte oblike žice so OpenAI `input_audio`,
    `audio_url` in `source.media_type: "audio/*"`. Ugnezdeni zvok je zaznan
    za usmerjanje, vendar ga pot spajanja ne odstrani. Delo je omejeno z
    `modalityBridgeAudioMaxClips`; kasnejši deli ostanejo nedotaknjeni.
3.  Upošteva konfiguriran `provider/model` ali pusti, da `selectAudioBridgeModel()`
    preide `AUDIO_TRANSCRIPTION_PROVIDERS` v stabilnem vrstnem redu kataloga
    in izbere prvi model z uporabno aktivno poverilnico ponudnika.
4.  `callAudioTranscription()` pretvori base64/data-URI zvok v večdelno `file`
    ali prenese oddaljen `audio_url` prek javne odhodne zaščite z DNS
    pripenjanjem in omejitvijo 25 MB. Nato POST-a datoteko in izbrani model
    na lokalno zanko `/v1/audio/transcriptions`, avtenticirano z
    `resolveSelfLoopBearer()`. Obstoječa pot prepisovanja izvaja normalno
    iskanje poverilnic, obravnavo ohlajanja/omejitve hitrosti in dispečiranje
    ponudnika.
5.  Uspešni klici nadomestijo svoje dele z `[Audio N]: <transcript>`. Klici se
    izvajajo z `Promise.allSettled`: posamezna napaka ohrani ta izvirni zvočni
    del (pogodba #4012). Če vsi klici ne uspejo in je dokazano, da cilj
    `supportsAudio === false`, deli postanejo `[Audio N]: (ni na voljo — ni
povezanega ponudnika STT)` (pogodba #8430). Za neznan cilj (`null`)
    rezultat vseh napak ostane nedotaknjen. Dokazan cilj samo za besedilo brez
    uporabne poverilnice STT prejme enak eksplicitni nadomestek, ne da bi
    izdal omrežni klic.

Uspešni prepisi uporabljajo predpomnilnik LRU/TTL Modality Bridge, ki je
skupen celotnemu procesu. Ključ združuje zvočno referenco, stabilno oznako
operacije `audio-transcription` in izbrani model STT; napake se nikoli ne
shranijo v predpomnilnik. Poskusi z zvokom posodobijo skupne števce `bridged`,
`cacheHits`, `failures` in `lastUsedAt`. Preoblikovani odgovori vsebujejo
`x-omniroute-modality-bridge: audio->text;model=<sttModel>;parts=<n>`;
nedotaknjene zahteve ne prejmejo segmenta Audio Bridge.

Nastavitve izvajanja so podprte z DB in potrjene z Zod:

| Ključ                         | Privzeto | Razpon          |
| ----------------------------- | -------- | --------------- |
| `modalityBridgeAudioEnabled`  | `true`   | —               |
| `modalityBridgeAudioModel`    | `""`     | Auto ali STT ID |
| `modalityBridgeAudioTimeout`  | `60000`  | 1000–300000     |
| `modalityBridgeAudioMaxClips` | `3`      | 1–10            |

Skupni predpomnilnik ostaja nadzorovan z `modalityBridgeCacheEnabled`,
`modalityBridgeCacheTtlMinutes` in `modalityBridgeCacheMaxEntries`.

### Video most (`videoBridge.ts`, `videoBridgePipeline.ts`)

Prestrezne video dele najvišje ravni v `messages` za dokončanje klepeta in `input` API-ja za odzive, preden se pokliče cilj brez znane izvorne video podpore.
Podprte oblike so `input_video`, `video_url`, `video_source`, HTTPS URL-ji in `data:video/*;base64,...` podatkovni URI-ji. Navadna imena datotek v besedilu se ne obravnavajo kot video.

`VideoBridgeGuardrail.preCall` (`videoBridge.ts`) je odgovoren za prehod zahtev, preverjanje zmogljivosti/politike, agregacijo na zahtevo in odzivno vsebino.
Delo na video posnetku – pridobivanje, predpomnilnik celotnega rezultata, opis zaporedja sličic (ki združuje morebitni zvočni prepis, ki ga je deklariral klicatelj) in metrike/prekinitev/čiščenje na poskus – je skrito za `processVideoPart` v `videoBridgePipeline.ts`, ki se pokliče enkrat za vsak video del znotraj zanke `preCall`.
Ta modul določa tudi eksplicitne meje vrat `VideoMediaBrokerPort` (pridobivanje bajtov in ekstrakcija vzorčenih sličic), `VideoAudioTranscriptionPort` (združevanje zvočnega prepisa, ki ga je deklariral klicatelj, z vzorčenimi podnapisi) in `VideoDrilldownPort` (meja obstojnosti podrobne analize sličic; še ni povezana z `processVideoPart` – danes samo ločena pot `/api/modality-bridge/video/drilldown` zapisuje vnose podrobne analize).

Javna pot za zahteve `/v1` nikoli ne uvozi ali prikliče podprocesa. Oddaljeni videoposnetki se prenesejo pod omejitvijo 50 MiB; vgrajeni base64 videoposnetki imajo konzervativno omejitev 36 MiB dekodiranih na video, tako da lahko model/sporočila/okvirna ovojnica ostanejo znotraj javne omejitve sprejema JSON zahtev 50 MiB. Ocene vgrajene dolžine in dekodirane velikosti se preverijo pred dodelitvijo. HTTPS je obvezen na začetnem oddaljenem URL-ju in vsaki preusmeritvi, z uporabo obstoječe javne odhodne zaščite z DNS pripenjanjem. Bajti nato prečkajo natančno notranjo mejo posrednika `POST /api/modality-bridge/video/extract`. Ta pot je `LOCAL_ONLY` in `SPAWN_CAPABLE`, sprejema samo avtenticirano, zaupanja vredno povratno zahtevo na proces in nikoli ne sprejema URL-ja, poti datotečnega sistema, izvedljive datoteke ali seznama argumentov. Cevovod za velikost telesa API-ja in inkrementalni bralnik telesa upravljavca neodvisno uveljavljata omejitev vnosa posrednika 50 MiB. Njegova omejena čakalna vrsta izvaja eno ekstrakcijo naenkrat, omogoča štiri čakajoče naloge in omejuje čakajoči vnos na 100 MiB.

Znotraj posrednika `ffprobe` bere zasebno lokalno datoteko; fiksni seznam dovoljenih formatov izključuje formate seznamov predvajanja in manifestov. Za dovoljene vsebnike družine MOV ostanejo zunanje reference podatkov MOV privzeto onemogočene, fiksni ukaz pa jih ne omogoča. Tako `ffprobe` kot `ffmpeg` uporabljata seznam dovoljenih protokolov samo za `file`, eno nit, fiksne nize argumentov, brez lupine in izvedljive datoteke, razrešene iz `PATH`. Priloženi slikovni tokovi niso kandidati za predvajanje. Vsi predvajljivi tokovi morajo izpolnjevati omejitve, pred determinističnim nadomestnim tokom z najnižjim indeksom pa je prednosten ekspliciten privzeti tok. Videoposnetki so omejeni na 600 sekund, 8.192 slikovnih pik na dimenzijo in 33.554.432 izvornih slikovnih pik. FFmpeg vzorči 1–16 srednjih sličic JPEG, zmanjša daljši rob na največ 1.024 slikovnih pik brez povečanja manjših vhodov in nikoli ne prejme URL-ja. Vzorčenje je privzeto `uniformno`. Izbirni politiki `scene_aware` in eksperimentalna `segment_aware` izvedeta en dodaten fiksni prehod FFmpeg-a čez že potrjen lokalni tok, izbereta omejene časovne žige scene `showinfo` in se deterministično vrneta na iste uniformne srednje točke ob napaki detektorja, časovni omejitvi, napačno oblikovanem izhodu ali praznem naboru kandidatov. Način, ki upošteva segmente, dodeli vzorce srednjih točk sorazmerno potrjenim intervalom scene; dokazi in nadomestno vedenje, ki upošteva segmente, so podrobno opisani spodaj. Trda omejitev 16 sličic se uporabi po izbiri v vsaki politiki. Ko ima zahteva, ki upošteva scene, proračun samo za eno sličico, uporabi uniformno srednjo točko aktivnega celotnega videa ali okna fokusa in poroča `policyEffective: uniform`: ena izbrana sličica scene ne more ohraniti obeh časovnih koncev. Klicatelj lahko po želji zagotovi končno okno fokusa (`start`/`end` sekund); meje so omejene na trajanje medija, obrnjena ali neskončna okna so zavrnjena, vse politike vzorčenja pa se izvajajo samo znotraj normaliziranega intervala. Nastalo okno je vključeno v metapodatke vzorčenja in v nezaupljiv opisni predponi, tako da lahko nadaljnji modeli razlikujejo osredotočen izsek od celotne časovnice.

Fokus semantičnih podnapisov je ločena, eksplicitna nastavitev. Privzeti način analize `full` ohranja obstoječi poziv sličice in nikoli ne posreduje besedila zahteve modelu podnapisov. V načinu `focused` most bere samo najnovejše neprazno uporabniško avtorizirano `text`/`input_text` iz istega vsebnika klepeta ali odzivov, ga normalizira na NFC, združi kontrolne znake in presledke ter ga omeji na 500 Unicode kodnih točk. Prazen rezultat se vrne na natančen poziv `full`. Uporaben namig je serializiran kot JSON v namenskem bloku nezaupljivega uporabniškega konteksta in lahko samo določi prednost opazljivim podrobnostim; ne more preglasiti ločenega opozorila proti upoštevanju navodil, vidnih ali slišnih v mediju. Besedilni fokus nikoli ne sklepa `start`/`end` ali spreminja časovnega vzorčevalnika.

#### FU-07 strukturni dokazi segmentov

`segment_aware` uporablja en omejen prehod predanalize čez že potrjen lokalni video tok. Fiksna veriga filtrov najprej zmanjša velikost na največ 320 slikovnih pik širine, zazna spremembe scene in zamrznjene intervale, nato pa vzorči 1 sličico na sekundo za zameglitev, povprečno svetilnost in prostorske/časovne informacije. Prehod je omejen na 600 strukturnih vzorcev, eno nit FFmpeg/filtra, iste protokole samo za `file` in sezname dovoljenih vsebnih formatov, omejitev izhoda procesa 1 MiB in največ 30 sekund znotraj skupne prekinitve/roka posrednika. Nikoli ne sprejme ukaza, filtra, poti ali URL-ja iz zahteve.

Strukturne vrednosti so deterministični dokazi vzorčenja, ne pa semantično razumevanje videa. Ne sklepajo o subjektih, dejanjih, napisih, govoru ali uporabnikovem namenu. Meje prizorov in zamrznitev tvorijo segmente; pokritost zamrznitve, zamegljenost, osvetlitev, prostorski detajli in časovne spremembe vplivajo le na to, kako se dodeli obstoječi proračun 1–16 sličic. Popolnoma zamrznjen segment je omejen na eno sličico, medtem ko se nezamrznjeni segmenti potegujejo za preostali proračun. Ko je meja več kot sličic, se ohrani enakomerna pokritost časovnice, tako da hitri zgodnji rezi ne morejo skriti dolgega končnega segmenta. Meje prizorov znotraj 1-sekundne ločljivosti analize meje zamrznitve se združijo.

Manjkajoči filtri, napačno oblikovani/prazni dokazi, napaka detektorja ali omejena časovna omejitev predanalize privedejo do natančne enotne politike središčne točke. Prekinitev klicatelja ali rok posrednika ne privede do odprtega stanja: prekine podproces v teku, prepreči kasnejše ekstrakcije sličic, in zasebno začasno drevo se odstrani v `finally`.

`scripts/perf/video-bridge-fu07-eval.ts` generira deterministične realne FFmpeg naprave za prihranke pri klicih napisov po deduplikaciji, dodelitev proračuna za gosto gibanje, dokaze o zamegljenosti/osvetlitvi/SI-TI, hitre reze z dolgim repom in lažne pozitive postopnega bledenja. Beleži čas izvajanja predanalize in, kjer je na voljo `/usr/bin/time`, CPU podrejenega procesa in največji RSS. Njegove preverbe kakovosti so le strukturni orakli. Kakovost dejanskega modela napisov ostaja `HOLD`, ker ta testna oprema nima pooblaščene končne točke ali zamrznjenega sodnika. Denarni prihranki prav tako ostajajo `HOLD`, razen če `--caption-cost-per-call-usd` zagotovi eksplicitno pozitivno oceno stroškov na klic; skripta nikoli ne ponaredi nobenega rezultata.

Vsaka sličica je omejena na 4 MiB, vse surove sličice skupaj na 23 MiB, in serializiran odziv posrednika na 32 MiB. Zasebni začasni imenik se odstrani v `finally`. OmniRoute ne vključuje FFmpeg in ne sprejema poti do izvedljive datoteke po meri. Pred ustvarjanjem napisov most uporabi konzervativen vizualni prehod deduplikacije: vsak JPEG se zmanjša na 16×16 sivinski medpomnilnik in se primerja samo z zadnjo ohranjeno sličico. Za zahtevani proračun napisov nad eno sličico, ekstrakcija zagotovi omejen nabor kandidatov do dvakratnika tega proračuna in nikoli več kot 16 sličic. Zahtevana omejitev se uporabi šele po deduplikaciji, pri čemer se prvi in zadnji izbrani kandidati ohranijo med končnim redčenjem, ko je proračun vsaj dva. Različica politike `grayscale-16x16-mean-cells-v2` uporablja večjo vrednost med povprečno delto luma in razmerjem celic sličic, katerih normalizirana delta je vsaj 0,05. Prag za podvojene elemente je konstanta 0,04, izbrana zaradi predvidljivosti in ne izpostavljena kot nastavitev med izvajanjem. Ta sekundarni visokokontrastni signal ohranja majhne premike in spremembe vidnega besedila, ki jih lahko skrije primerjava samo povprečja. Napake primerjalnika ali dekoderja se odprejo in ohranijo pokritost. Izhodni metapodatki ločujejo ekstrahirane kandidate, uspešno uporabljene sličice in zavržene vizualne duplikate.

Eksplicitno označen del videa lahko zahteva časovno žigosan kontaktni list. Most zgradi največ 4-stolpčno, 16-slično JPEG mrežo. Vsaka celica velikosti 512 slikovnih pik vtisne svojo izvorno časovno žigo v visokokontrastni spodnji pas, medtem ko iste časovne žige ostanejo v besedilnih metapodatkih za nadaljnje povezovanje in revizijo. Celoten JPEG ostane omejen na 32 MiB. Če `sharp` ne more dekodirati ali sestaviti mreže, se most vrne na posamezne JPEG sličice; prekinitev s strani odjemalca se še vedno razširi skozi operacijo lista.

Dokazi za promocijo so namerno ločeni od sintetičnega mikropreizkusa sestavljanja. `scripts/perf/video-bridge-contact-sheet-eval.ts` definira A/B testno opremo z različico sheme za resnične vizualne modele, združljive z OpenAI. Meri žetone, ki jih poroča ponudnik, celotno zakasnitev (vključno s sestavo lista), število klicev modela in ohranjanje dejstev, določenih v manifestu. Surovi odzivi modela niso zapisani v poročilo; ohranjeni so le SHA-256 zgoščene vrednosti in ujemajoči se ID-ji dejstev. Testna oprema ne izvaja omrežnih ali plačljivih klicev modela, razen če je podan `--execute-real` in so konfigurirani `--model`, `OMNIROUTE_BASE_URL` ter `OMNIROUTE_API_KEY`. Brez tega eksplicitnega resničnega izvajanja, njegova strojno berljiva sodba ostaja `HOLD`; meritve sintetičnih podatkov/števila klicev same po sebi niso dokaz za promocijo.

Klicatelji lahko priložijo neobvezen niz `transcript.cues` podprtemu delu videa, če že imajo poravnano besedilo. Vsak znak mora vsebovati `text`, končni interval `start`/`end` znotraj preiskane dolžine in dovoljen `source` (`client`, `embedded` ali `audio-bridge`); `confidence` privzeto znaša `1` in mora ostati med `0` in `1`. Natančni podvojeni znaki se združijo. OmniRoute nikoli ne začne prepisovanja iz teh metapodatkov: potrjeni znaki se kopirajo v opisani rezultat z virom, zaupanjem in intervalom ter so prikazani kot nezaupljiva opazovanja poleg napisov sličic. Neveljavno, izven obsega ali besedilo brez izvora je zavrnjeno, namesto da bi se mešalo v tok napisov. Polje `source` je trenutno deklarirano s strani klicatelja, ne preverjeno s strani strežnika: OmniRoute uveljavlja, da je vrednost ena od treh dovoljenih nizov, vendar še ne kriptografsko potrjuje, da je oznaka `embedded` ali `audio-bridge` dejansko prišla iz ekstrakcije v lasti strežnika. Obravnavajte `source` kot nezaupljiv namig, dokler ta preverba ne bo implementirana; na podlagi tega ne gradite odločitev o avtorizaciji.

Napredni klicatelj lahko zagotovi že avtorizirano sled `audioTranscript` za isti video. Združitveni šiv obdeluje vizualna in zvočna opazovanja pod enim rokom in signalom za prekinitev, jih razvrsti na skupno časovnico, združi natančne podvojitve in poroča o delnem rezultatu, ko uspe le ena stran. Neveljaven `audioTranscript` se zniža na ta delni rezultat — vizualni opis se ohrani in zvočna veja zabeleži očiščeno kodo napake — namesto da bi povzročil neuspeh celotnega videa. Razpoložljivost po vejah, zastavica za delni rezultat in očiščene kode napak so ohranjene v opisanem rezultatu, v metapodatkih varovalne ograje (`audioFusionRuns`/`audioFusionPartials`/`audioFusionFailureCodes`), v metapodatkih predpomnilnika rezultatov in v števcih združevanja mostu. Privzeta pot Video Bridge ne sproži pretvorbe govora v besedilo niti ne prenese druge kopije medija; brez te eksplicitne sledi ostane samo video.

**Ohranjanje prepisa (#12150 P1).** To se samodejno uporablja, kadar koli Video Bridge (ki je sam po sebi izbirna funkcija) prikaže namig za prepis — ločene zastavice za ohranjanje ni. Ko zahteva prikaže kateri koli namig za prepis (klicatelj-deklariran `transcript` ali združen `audioTranscript`), ga varovalna ograja označi kot `videoBridgeObserved` in ustvari redigirano senco video opisa — identično upodobitev, v kateri je prosto besedilno telo vsakega namiga nadomeščeno z `[redacted-video-transcript]`, zgrajeno z zamenjavo polja strukturiranega namiga, preden se niz sestavi (nikoli s parsiranjem sploščenega besedila, tako da nobena vsebina namiga — sovražna ali običajna, vključno z telesi, ki vsebujejo `]` kot so `[inaudible]`/`[music]` — ne more preživeti). Telo zahteve v vztrajnem dnevniku klicev zamenja vsak video-izpeljan besedilni del s to redigirano senco, usklajeno po enakosti vsebine; sidro `fullText` se ponovno prebere iz dokončane predklicne vsebine varovalne ograje, tako da se ujemanje še vedno uspešno izvede po tem, ko kasnejše verižne varovalne ograje (maskirniki PII in poverilnic, prioritete 10/95) prepišejo besedilo opisa na mestu in po tem, ko injekcija sistemskega poziva/predaje/pomnilnika preoblikuje polje sporočil. Telo, poslano navzgor modelu, ostane nespremenjeno. Opazovana zahteva prav tako ne napolni trajnega pomnilnika (preskočeno je tako pridobivanje iz zahteve kot iz odgovora), tako da modelov lasten odgovor ne more ponoviti besedila prepisa v pomnilnik.

Dodatne ohranjene kopije uporabljajo enak signal opazovane zahteve. Surovi posnetek zahteve stranke pred varovalno ograjo, čakajoča zahteva v pomnilniku in zgodnji dnevnik zavrnjenih zahtev strukturno nadomeščajo polja prepisa v video delih; nizovni pozivi, sintetizirani s stopnjami cevovoda in predajo konteksta, so redigirani na ponoru vztrajnega telesa zahteve. Vztrajni označevalec `video_content_removed` povzroči, da se nadaljevanje `previous_response_id` zapre z napako, namesto da bi rekonstruiralo besedilo, ki je bilo namerno zavrženo. Če opazovana zahteva izgubi svojo senco redakcije po delih pred beleženjem, ali celo ena od več video senc ne ustreza po kasnejših mutacijah zahteve, se ohranjeno telo zahteve v celoti izpusti, namesto da bi se ohranil delno redigiran prepis.

Za opazovano zahtevo lahko odgovor modela citira kateri koli del prepisa brez meje strukturiranega namiga. Njegovo vztrajno `responseBody` v dnevniku klicev je zato nadomeščeno z označevalcem izpusta; podroben artefakt cevovoda (ki lahko vključuje telesa navzgor/stranke in dele toka) ni ohranjen. Semantični, idempotentni in predpomnilniki za ponovno predvajanje razlogovanja za to zahtevo preskočijo branje in pisanje. Zahteva ponudnika in odziv, viden stranki, ostajata nespremenjena. Zgodnji keepalive bajti se izpraznijo iz začasnega medpomnilnika, ko je podroben artefakt izpuščen. Kirovo opozorilo o napačno oblikovanem EventStreamu poroča samo o številu bajtov tovora, nikoli o njegovi vsebini ali surovi napaki JSON parserja. To ne trdi, da je bila vsaka nepovezana diagnostika ponudnika/vtičnika revidirana; širše čiščenje ohranjenih ponorov se spremlja v #11658.

Notranji življenjski cikel `/api/modality-bridge/video/drilldown` je ločen, povratni/žetonsko avtenticiran predpomnilniški substrat. Vsaka operacija zahteva tudi kanonični neprozorni ID subjekta. Preden se omogoči produkcijski klicatelj, mora ta ID izpeljati iz avtenticiranega najemnika in nikoli ne sme posredovati vrednosti, ki jo je izbrala stranka. Ključi predpomnilnika vežejo ta subjekt na kanonične ID-je seje in video referenc, shranjujejo samo njihove ključe, izpeljane iz SHA-256, in omejujejo tako branje kot brisanje na isti subjekt. Predpomnilnik shrani največ 16 izpeljanih JPEG sličic na vnos, jih izteče po desetih minutah in podpira omejeno branje `start`/`end` ali eksplicitno brisanje seje.

Vsak subjekt je omejen na 16 vnosov in 64 MiB kanoničnih JPEG podatkov. Te omejitve so neodvisne od globalne zgornje meje 64 vnosov/256 MiB: pritisk kvote subjekta izloči samo najmanj nedavno uporabljene vnose tega subjekta, preden se upošteva globalno izločanje LRU. Iztečeni vnosi se odstranijo iz računovodstva subjekta in globalnega računovodstva ob aktivnosti predpomnilnika, medtem ko preklic in napaka pri validaciji ne potrdita delne zamenjave.

Predpomnilnik zavrača nekanonični Base64, prekomerno polnilo, medije, ki niso JPEG, napačno oblikovane ali skrajšane JPEG-e in JPEG-e, ki povzročijo opozorilo med omejenim dekodiranjem celotne slike `sharp`. Vsako sprejeto sliko ponovno kodira kot kanonični JPEG, izpelje širino in višino iz dekodiranih bajtov namesto da bi zaupal poljem klicatelja, in zavrže morebitne končne poliglotne bajte, namesto da bi jih ohranil. Samo omejen kanonični stisnjen medpomnilnik se zaračuna obema kvotama. Omejitev JSON žice vključuje Base64 režijo za zgornjo mejo 32 MiB dekodiranega vhoda. Vsaka shranjena izpeljava beleži svojo potrjeno obliko/ločljivost JPEG, politiko vzorčenja, različico izpeljave, čas ustvarjanja, strežniško izračunano zgoščeno vrednost vsebine in zgoščeno starševsko referenco ter zgoščeno vrednost vsebine starša zaupanja vrednega klicatelja. Preklic se preveri med asinhronimi fazami dekodiranja/zgoščevanja pred atomično potrditvijo predpomnilnika.

Ta tranša še ne povezuje produkcijskega producenta z usmerjevalnikom in ne
zagotavlja izbire različic z več ločljivostmi. Transparentna pot zahteve Video Bridge
zato ne povzroča dodatnega dela, medtem ko izpeljava glavnega subjekta, vezanega na najemnika, in
celoten življenjski cikel FU-08 z več ločljivostmi ostajata eksplicitno nadaljnje delo,
namesto da bi bili dokumentirani kot popolno vedenje.

Okvirji so zaporedno opremljeni z napisom konfiguriranega video modela. Prazen
preglasitev videa podeduje nastavitev Vision; če sta oba prazna, Vision
samodejni usmerjevalnik izbere učinkovit model, ki podpira vid. Uspešni napisi
nadomestijo izvirni del s stabilno predpono `[Video description:` , ki tudi
označuje besedilo kot nezaupljivo opazovanje, pridobljeno iz medijev, in pove spodnjim
modelom, naj ne sledijo navodilom, najdenim v medijih. Ključi predpomnilnika napisov okvirjev
vključujejo JPEG bajte, poziv, časovni žig in učinkovit model; samo uspešni
napisi so shranjeni v predpomnilnik. Vnosi v predpomnilnik ohranijo dejanski uspešni model producenta,
vključno z nadomestnim modelom; most poroča `mixed`, ko so bili različni okvirji
producirani z različnimi modeli. Zadeti predpomnilnik ponovno uporabi to identiteto producenta
namesto da bi jo preimenoval kot zahtevani načrt usmerjanja. Predpomnilnik rezultatov celotnega videa
je ključen za vsak vhod, ki spremeni izhod — poziv, učinkovit
model, politika vzorčenja, število sličic, način semantične analize, SHA-256
prstni odtis normaliziranega namiga fokusa, okno fokusa, `transcript`,
`audioTranscript` in zastavica kontaktnega lista — tako da sprememba katere koli od teh
dimenzij povzroči zgrešitev predpomnilnika, nikoli zastarelo ponovno uporabo. Različica politike vizualnega dedupliciranja,
prag in omejeno število kandidatnih sličic so prav tako eksplicitni v ključu predpomnilnika rezultatov
in metapodatkih; sprememba politike zato ne more ponovno uporabiti zastarele
opis celotnega videa. Metapodatki predpomnilnika rezultatov v4 ohranjajo način in
prstni odtis, nikoli surove uporabniške naloge. Metapodatki varovalne ograje poročajo o obeh
zahtevanih in učinkovitih načinih analize; zahtevan `focused` način brez
uporabnega uporabniškega besedila je poročan kot učinkovito `full`.

Varovalna ograja izvleče vsak podprt video del, vendar ne opiše več kot
`modalityBridgeVideoMaxVideos`. Za cilj, za katerega je dokazano, da ima
`supportsVideo === false`, neuspeli in prekomerni videoposnetki postanejo eksplicitni varni
besedilni označevalci, tako da noben surov video ne preživi. Ko je zmogljivost neznana, ti deli
ostanejo nedotaknjeni. Cilji z `supportsVideo === true` obidejo most.
Signal za prekinitev zahteve odjemalca se širi skozi prenos, posredniško čakalno vrsto,
podprocese in klice napisov; prekinitve se ustavijo med videoposnetki in nikoli ne odpovejo
odprto za surove medije.

Nastavitve izvajanja so podprte z DB in potrjene z Zodom:

| Ključ                               | Privzeto    | Razpon / vedenje                                                                                      |
| :---------------------------------- | :---------- | :---------------------------------------------------------------------------------------------------- |
| `modalityBridgeVideoEnabled`        | `false`     | Izbirno izvajanje, opt-in                                                                             |
| `modalityBridgeVideoAnalysisMode`   | `"full"`    | `full` ohranja splošne napise; `focused` uporablja omejen, nezaupljiv najnovejši uporabniški kontekst |
| `modalityBridgeVideoModel`          | `""`        | Podeduje model Vision Bridge                                                                          |
| `modalityBridgeVideoFrameCount`     | `8`         | 1–16                                                                                                  |
| `modalityBridgeVideoSamplingPolicy` | `"uniform"` | `uniform`, `scene_aware` ali sorazmerno `segment_aware`; napaka detektorja se vrne na `uniform`       |
| `modalityBridgeVideoMaxVideos`      | `1`         | 1–4                                                                                                   |
| `modalityBridgeVideoTimeout`        | `120000`    | 1000–120000 ms                                                                                        |

Stare shranjene vrednosti časovne omejitve videa nad 120 sekund so omejene na
rok posrednika; novi zapisi nastavitev nad to omejitvijo so zavrnjeni.
`GET /api/modality-bridge/video/runtime` zahteva zaupanja vredno žigosano povratno
lokalnost pred avtentikacijo ali preverjanjem izvajanja, nato pa zahteva avtentikacijo
upravljanja. Vrne samo `available`, očiščene različice FFmpeg/ffprobe in fiksni
razlog, ko izvajanje ni na voljo. Notranja končna točka za ekstrakcijo ni
javni API za nalaganje: nasičenost čakalne vrste vrne `503` plus `Retry-After`,
prekinitev klicatelja vrne `499`, fiksni rok posrednika pa vrne `504`. Pretvorjeni
odgovori dodajo `video->text;model=<visionModel>;parts=<videos>` v osrednjo
glavo `x-omniroute-modality-bridge`, ne da bi odstranili segmente Vision ali Audio.

### PII Masker (`piiMasker.ts`)

Deluje na **obeh** stopnjah.

- **`preCall`** klonira tovor, preide `system`, `messages`, `input` in
  `prompt` (vključno z navadnimi nizovnimi elementi) in uporabi `processPII()` (iz
  `@/shared/utils/inputSanitizer`) na nizovnih poljih `content`/`text`. Ko
  `PII_REDACTION_ENABLED=true`, se zaznani PII redigira v odhodnem
  tovoru. To je neodvisno od `INPUT_SANITIZER_MODE` (ki nadzoruje samo
  politiko vbrizgavanja pozivov). Ko je redakcija izklopljena, klic beleži število zaznav
  brez prepisovanja vsebine.
- **`postCall`** globoko klonira odgovor, zažene `sanitizePIIResponse()` plus
  masker oblike API-ja za odgovore (`maskResponsesOutput` — zajema
  `output_text` in `output[].content[].text`). Če pride do kakršne koli redakcije,
  spremenjeni odgovor nadomesti izvirnega.

Varovalna ograja nikoli ne blokira; samo dodaja opombe (`meta.detections`,
`meta.redacted`) ali prepisuje.

### Vbrizgavanje pozivov (`promptInjection.ts`)

Zazna nasprotne strukture v uporabniško vneseni vsebini in uveljavlja
konfigurirano politiko. Vedenje je določeno z okoljskimi spremenljivkami in
možnostmi konstruktorja:

| Nastavitev | Spremenljivka okolja | Privzeto | Učinek

| --- | --- | --- | --- |
| Omogočeno | `INPUT_SANITIZER_ENABLED` | `true` | Ko je `false`, se zaščita takoj izklopi. |
| Način | `INJECTION_GUARD_MODE` / `INPUT_SANITIZER_MODE` | `warn` | Pravilnik o injiciranju: `block`, `warn` ali `log`. (`redact` je sprejet zaradi združljivosti nazaj, vendar **ne** odstrani injiciranega besedila; zahteva za prepis PII je nadzorovana z `PII_REDACTION_ENABLED`.) |
| Prag blokiranja | `blockThreshold` možnost / `INPUT_SANITIZER_BLOCK_THRESHOLD` (alias `INJECTION_GUARD_BLOCK_THRESHOLD`) | `high` | Najmanjša zahtevana resnost za blokiranje. Srednja resnost je privzeto samo za opazovanje. |

**Prednost načina** (`getMode`): klicatelj `options.mode` →
`INJECTION_GUARD_MODE` **preglasitev funkcije DB** (Nadzorna plošča → Nastavitve →
Zastavice funkcij) → `INJECTION_GUARD_MODE` okolje → `INPUT_SANITIZER_MODE` okolje →
`warn`. Preglasitev nadzorne plošče torej prevlada nad spremenljivkami okolja, tako da
uporabniški vmesnik zastavic funkcij nadzoruje delovanje zaščite v živo (brez ponovnega zagona). Branje iz baze podatkov je varno pred napakami:
če pride do napake, se zaščita vrne na vedenje, ki temelji na okolju, in ko ni
nastavljena preglasitev, je vedenje enako rešitvi, ki temelji samo na okolju.

Viri zaznavanja:

1. `sanitizeRequest()` iz `@/shared/utils/inputSanitizer` (skupni nabor detektorjev,
   ki se uporablja drugje v cevovodu).
2. Vgrajeni `DEFAULT_GUARD_PATTERNS` (trenutno `system_override_inline` in
   `markdown_system_block`, oba z `high` resnostjo).
3. Neobvezni `customPatterns`, posredovani prek možnosti konstruktorja (nizi, regex,
   ali `{ name, pattern, severity }` zapisi).

Ko je `mode === "block"` **in** vsaj ena zaznava doseže prag resnosti,
`preCall` vrne `{ block: true, message: "Request rejected:
suspicious content detected" }`. V načinih `warn`/`log` zaščita beleži, vendar
dovoli klic. Skupni pomočnik `evaluatePromptInjection()` je tudi izvožen
za klicatelje, ki morajo oceniti pozive, ne da bi šli skozi register.

**Meja skeniranja (v3.8.20):** detektor pregleduje samo **prvih 16 KB**
združenega besedila poziva — `MAX_INJECTION_SCAN_BYTES = 16 * 1024` (16 384 bajtov) v
`src/shared/utils/inputSanitizer.ts`. Oba `detectInjection()` in
`evaluatePromptInjection()` `slice(0, MAX_INJECTION_SCAN_BYTES)` pred zagonom
zanke vzorcev. Direktive za injiciranje so blizu vrha vnosa, zato to
omejuje CPU/GC regex na več sto KB velikih podatkovnih paketih, ne da bi oslabilo
zaznavanje (prim. #3932, #4041).

### Maskiranje poverilnic (`credentialMasker.ts`)

Deluje na **obeh** stopnjah, zadnji v privzeti verigi (prioriteta `95`). Redigira
znane vzorce API-ključev / tajnih žetonov iz odhodnega tovora
(vsebina sporočila, argumenti klica orodja, rezultati orodja) **in** odziva ponudnika,
tako da poverilnica, prilepljena v poziv (ali ponovljena z rezultatom orodja),
ne pride do ponudnika navzgor ali nazaj do odjemalca.

- **Samo opt-in**, enaka konvencija kot redakcija PII (Trdo pravilo #20-povezano):
  onemogočeno, razen če `settings.credentialRedactionEnabled === true` **ali**
  `CREDENTIAL_REDACTION_ENABLED=true`. Če je izklopljeno, je zaščita brez učinka —
  nikoli ne blokira in nikoli ne prepisuje.
- `redactCredentials()` preide celotno drevo tovora/odziva (`walkValue()`,
  varno pred onesnaženjem prototipa, varno pred cikli prek `WeakSet`) in nadomesti ujemanja z
  nadomestnim znakom `[REDACTED:<type>]`, klonira samo veje, ki so se dejansko
  spremenile.
- `CREDENTIAL_PATTERNS` zajema ključe ponudnikov LLM (OpenAI, OpenAI-proj,
  Anthropic, Google, Hugging Face, Replicate), žetone VCS/SaaS (GitHub, Slack,
  Linear, Notion, npm, Postman, Discord), plačilne ključe (Stripe, Square),
  ključe v oblaku (AWS dostopni ključ, Twilio, SendGrid, Mailgun), zasebne ključe / JWT-je,
  povezovalne nize, ki vsebujejo poverilnice (`mongodb://user:pass@...`, itd.), in
  generični vzorec vrednosti glave `Authorization`/`x-api-key`/`api-key`/`apikey`.
  Ključi v obliki glave (`authorization`, `x-api-key`, `api-key`, `apikey`) so
  redigirani strukturno (samo vrednost, predpona sheme, kot je
  `Bearer `/`Basic `, je ohranjena) in ne prek generičnega besedilnega regexa.
- Zaščita nikoli ne blokira; samo prepisuje (`modifiedPayload` /
  `modifiedResponse`) in dodaja opombe (`meta.credentialsRedacted`, `meta.count`).

Regresijska zaščita: `tests/unit/credential-masker-guardrail.test.ts`.

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
