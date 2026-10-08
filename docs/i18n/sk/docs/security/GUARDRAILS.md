# Guardrails (Slovenčina)

🌐 **Languages:** 🇺🇸 [English](../../../../security/GUARDRAILS.md) · 🇪🇹 [am](../../../am/docs/security/GUARDRAILS.md) · 🇸🇦 [ar](../../../ar/docs/security/GUARDRAILS.md) · 🇦🇿 [az](../../../az/docs/security/GUARDRAILS.md) · 🇧🇬 [bg](../../../bg/docs/security/GUARDRAILS.md) · 🇧🇩 [bn](../../../bn/docs/security/GUARDRAILS.md) · 🇧🇦 [bs](../../../bs/docs/security/GUARDRAILS.md) · 🇨🇿 [cs](../../../cs/docs/security/GUARDRAILS.md) · 🇩🇰 [da](../../../da/docs/security/GUARDRAILS.md) · 🇩🇪 [de](../../../de/docs/security/GUARDRAILS.md) · 🇬🇷 [el](../../../el/docs/security/GUARDRAILS.md) · 🇪🇸 [es](../../../es/docs/security/GUARDRAILS.md) · 🇪🇪 [et](../../../et/docs/security/GUARDRAILS.md) · 🇮🇷 [fa](../../../fa/docs/security/GUARDRAILS.md) · 🇫🇮 [fi](../../../fi/docs/security/GUARDRAILS.md) · 🇫🇷 [fr](../../../fr/docs/security/GUARDRAILS.md) · 🇮🇪 [ga](../../../ga/docs/security/GUARDRAILS.md) · 🇮🇳 [gu](../../../gu/docs/security/GUARDRAILS.md) · 🇳🇬 [ha](../../../ha/docs/security/GUARDRAILS.md) · 🇮🇱 [he](../../../he/docs/security/GUARDRAILS.md) · 🇮🇳 [hi](../../../hi/docs/security/GUARDRAILS.md) · 🇭🇷 [hr](../../../hr/docs/security/GUARDRAILS.md) · 🇭🇺 [hu](../../../hu/docs/security/GUARDRAILS.md) · 🇦🇲 [hy](../../../hy/docs/security/GUARDRAILS.md) · 🇮🇩 [id](../../../id/docs/security/GUARDRAILS.md) · 🇳🇬 [ig](../../../ig/docs/security/GUARDRAILS.md) · 🇮🇹 [it](../../../it/docs/security/GUARDRAILS.md) · 🇯🇵 [ja](../../../ja/docs/security/GUARDRAILS.md) · 🇬🇪 [ka](../../../ka/docs/security/GUARDRAILS.md) · 🇰🇭 [km](../../../km/docs/security/GUARDRAILS.md) · 🇮🇳 [kn](../../../kn/docs/security/GUARDRAILS.md) · 🇰🇷 [ko](../../../ko/docs/security/GUARDRAILS.md) · 🇱🇹 [lt](../../../lt/docs/security/GUARDRAILS.md) · 🇱🇻 [lv](../../../lv/docs/security/GUARDRAILS.md) · 🇮🇳 [ml](../../../ml/docs/security/GUARDRAILS.md) · 🇮🇳 [mr](../../../mr/docs/security/GUARDRAILS.md) · 🇲🇾 [ms](../../../ms/docs/security/GUARDRAILS.md) · 🇲🇹 [mt](../../../mt/docs/security/GUARDRAILS.md) · 🇲🇲 [my](../../../my/docs/security/GUARDRAILS.md) · 🇳🇵 [ne](../../../ne/docs/security/GUARDRAILS.md) · 🇳🇱 [nl](../../../nl/docs/security/GUARDRAILS.md) · 🇳🇴 [no](../../../no/docs/security/GUARDRAILS.md) · 🇮🇳 [or](../../../or/docs/security/GUARDRAILS.md) · 🇮🇳 [pa](../../../pa/docs/security/GUARDRAILS.md) · 🇵🇭 [phi](../../../phi/docs/security/GUARDRAILS.md) · 🇵🇱 [pl](../../../pl/docs/security/GUARDRAILS.md) · 🇵🇹 [pt](../../../pt/docs/security/GUARDRAILS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/security/GUARDRAILS.md) · 🇷🇴 [ro](../../../ro/docs/security/GUARDRAILS.md) · 🇷🇺 [ru](../../../ru/docs/security/GUARDRAILS.md) · 🇱🇰 [si](../../../si/docs/security/GUARDRAILS.md) · 🇸🇮 [sl](../../../sl/docs/security/GUARDRAILS.md) · 🇷🇸 [sr](../../../sr/docs/security/GUARDRAILS.md) · 🇸🇪 [sv](../../../sv/docs/security/GUARDRAILS.md) · 🇰🇪 [sw](../../../sw/docs/security/GUARDRAILS.md) · 🇮🇳 [ta](../../../ta/docs/security/GUARDRAILS.md) · 🇮🇳 [te](../../../te/docs/security/GUARDRAILS.md) · 🇹🇭 [th](../../../th/docs/security/GUARDRAILS.md) · 🇹🇷 [tr](../../../tr/docs/security/GUARDRAILS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/security/GUARDRAILS.md) · 🇵🇰 [ur](../../../ur/docs/security/GUARDRAILS.md) · 🇺🇿 [uz](../../../uz/docs/security/GUARDRAILS.md) · 🇻🇳 [vi](../../../vi/docs/security/GUARDRAILS.md) · 🇳🇬 [yo](../../../yo/docs/security/GUARDRAILS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/security/GUARDRAILS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/security/GUARDRAILS.md)

---

> **Zdroj pravdy:** `src/lib/guardrails/`
> **Naposledy aktualizované:** 2026-08-29 — v3.8.51 (pôvod prepisu Video Bridge deklaruje volajúci,
> server ho zatiaľ neoveruje — spresnené podľa #11661)

Guardraily vynucujú bezpečnosť, pravidlá a transformácie obsahu na rozhraní
medzi OmniRoute a nadradenými poskytovateľmi. Každý guardrail môže kontrolovať
(a voliteľne odmietnuť, transformovať alebo anotovať) dátové časti požiadaviek
(`preCall`) a odpovede nadradených poskytovateľov (`postCall`).

Systém je navrhnutý ako **fail-open**: ak guardrail počas vykonávania vyhodí
výnimku, register zaznamená chybu a namiesto zlyhania požiadavky pokračuje
ďalším guardrailom. Blokovanie je explicitné rozhodnutie (`block: true`), nikdy
nie náhoda.

## Vstavané ochranné mechanizmy

Register automaticky načíta šesť ochranných mechanizmov v poradí priority pri importe (pozri `registry.ts` → `registerDefaultGuardrails()`):

| Priorita | Názov               | Fáza(y)        | Súbor                 |
| -------- | ------------------- | -------------- | --------------------- |
| `5`      | `vision-bridge`     | `preCall`      | `visionBridge.ts`     |
| `6`      | `audio-bridge`      | `preCall`      | `audioBridge.ts`      |
| `7`      | `video-bridge`      | `preCall`      | `videoBridge.ts`      |
| `10`     | `pii-masker`        | `pre` + `post` | `piiMasker.ts`        |
| `20`     | `prompt-injection`  | `preCall`      | `promptInjection.ts`  |
| `95`     | `credential-masker` | `pre` + `post` | `credentialMasker.ts` |

Nižšie čísla priority sa spúšťajú **ako prvé**.

### Vision Bridge (`visionBridge.ts`) — Modality Bridge PR-1

Zachytáva požiadavky obsahujúce obrázky, ktoré sú určené pre **modely bez podpory videnia**, a buď presmeruje celú požiadavku na model s podporou videnia, alebo nahradí obrazové časti textovými popismi vytvorenými konfigurovateľným modelom videnia pred volaním upstream. To umožňuje poskytovateľom len s textom transparentne spracovávať multimodálne dáta.

Priebeh:

1.  Preskočiť, ak cieľový model už podporuje videnie (pokiaľ sa nenachádza v zozname vynútených mostov `isVisionBridgeForcedModel`).
2.  Extrahovať obrazové časti pomocou `extractImageParts(messages)` (`visionBridgeHelpers.ts`), ktoré deleguje na **jednotný detektor médií** `detectMediaParts()` v `open-sse/utils/mediaParts.ts` – jediný zdroj pravdy zdieľaný s filtrom kompatibility kombinácií. Extrakcia je povolená pre časti najvyššej úrovne tvarov, ktoré `replaceImageParts` dokáže spätne spojiť (kontrakt extrakcie↔nahradenia): OpenAI `image_url`, Anthropic base64 `source.type:"base64"`, Anthropic URL `source.type:"url"` a Responses API `input_image`. Vnorené zhody a tvary len s indikátorom sú materiálom pre kombinovaný filter a nikdy sa neextrahujú. Preskočiť, ak sa žiadne nenájdu.
3.  Vyriešiť konfiguráciu za behu pomocou `resolveVisionBridgeRuntimeSettings()` (`src/shared/constants/modalityBridgeDefaults.ts`): nové kľúče nastavení `modalityBridge*` majú prednosť; staršie kľúče `visionBridge*` zostávajú **jednocyklovým záložným riešením** (okno pre vrátenie zmien). Preskočiť pred akýmkoľvek prechodom médií, keď je mostík zakázaný.
4.  Selektor režimu (`modalityBridgeVisionMode`, pozri tabuľku nižšie) rozhoduje o presmerovaní vs. popise. Presmerovanie vráti `modifiedPayload` len s vymeneným `modelom`, plus meta `{ rerouted, fromModel, toModel, imagesKept }`.
5.  Cesta popisu: obmedziť obrázky na `maxImages`, zostaviť výzvu citlivú na úlohu, konzultovať cache popisu, zavolať model videnia **paralelne** (`Promise.allSettled`) a vložiť textové časti `[Image N]: <description>` na ich miesto. Neúspešný popis vráti `null` a pôvodná obrazová časť je **zachovaná** (#4012) – okrem cesty kombinovaného popisu, keď zlyhal každý popis, kde potvrdený upstream bez videnia dostane namiesto toho zástupný text `(nedostupné – nie je pripojený žiadny poskytovateľ s podporou videnia)` (#8430).
6.  Vrátiť `modifiedPayload` + meta (`imagesProcessed`, `descriptions`, `processingTimeMs`, `visionModel`).

#### Selektor režimu (`modalityBridgeVisionMode`)

| Režim      | Predvolené | Správanie                                                                                                                                                                                                                                                                       |
| ---------- | ---------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `auto`     | ✔          | Stará heuristika, nedotknutá (#6640/#7204): modely bez kombinácie/`auto/` sa presmerujú na najlepší model videnia, pokiaľ pôvodný model už nemá použiteľné poverenia (potom popis); kombinované ciele vždy popisujú.                                                            |
| `describe` |            | Vždy popisovať — blok presmerovania je úplne preskočený; vždy odpovedá model zvolený používateľom.                                                                                                                                                                              |
| `reroute`  |            | Vynútiť presmerovanie: ochrana `keep-credentialed-model` je obídená. Ochrana poverení pre **cieľ** presmerovania stále platí — ak neexistuje žiadny použiteľný cieľ videnia, požiadavka prejde na popis, takže surové obrázky sa nikdy nedostanú do textového backendu (#8430). |

Vynútené režimy sa skratujú **pred** spustením automatickej heuristiky; správanie `auto` je bajtovo identické s ochranným mechanizmom pred PR-1.

#### Výzva na popis citlivá na úlohu (`modalityBridgeVisionTaskAware`)

Predvolené **true**. `composeVisionPrompt()` (`visionBridgeHelpers.ts`) pripojí text **poslednej správy používateľa** (skrátený na 500 znakov) k základnej výzve na popis, čím smeruje popis k tomu, čo používateľ skutočne žiadal (vzor codex-vision-proxy) a žiada model videnia, aby prepísal viditeľný text. Ak je príznak vypnutý – alebo nie je k dispozícii žiadny používateľský text – použije sa základná výzva nezmenená.

Vlastná požiadavka slučky `describe` kompatibilná s OpenAI (`callVisionModelSingle()` v `visionBridgeHelpers.ts`) vždy požaduje `image_url.detail: "high"` – bezpodmienečne, pre každého volajúceho/poskytovateľa, bez ohľadu na signál klienta. Vzorkovanie s nízkymi detailmi znižuje presnosť OCR presne pre úlohu prepisu textu, ktorú táto výzva požaduje, takže samotné volanie `describe` vždy žiada vysoké detaily bez ohľadu na úroveň detailov, ktorú použila pôvodná prichádzajúca požiadavka. Toto ovplyvňuje iba interné telo požiadavky `describe`; nemení to, ako OmniRoute preposiela vlastné `image_url.detail` volajúceho pri primárnej požiadavke – táto predvolená hodnota sa aplikuje samostatne a iba pre detekovaných klientov OpenCode v `defaultImageDetail()` (`open-sse/handlers/chatCore/upstreamBody.ts`). Vetva formátu Anthropic wire-format pre slučku `describe` nemá pole `detail` a nie je ovplyvnená žiadnou z predvolených hodnôt.

#### Obmedzenie výstupu `describe` (`modalityBridgeVisionMaxChars`)

| Kľúč                           | Predvolené | Rozsah              |
| :----------------------------- | :--------- | :------------------ |
| `modalityBridgeVisionMaxChars` | `0`        | `0` alebo 100–50000 |

`0` (predvolené) znamená **bez obmedzenia** – popis vrátený funkciou `callVisionModel()` sa prenáša bez úprav, čím sa zachováva existujúce správanie. Akákoľvek hodnota v rozsahu 100–50000 skráti popis s príponou `…` predtým, ako sa vloží späť ako `[Image N]: <description>` (`VisionBridgeGuardrail.preCall()` v `src/lib/guardrails/visionBridge.ts`). Zvýšte túto hodnotu pre úlohy OCR náročné na detaily, kde následný model potrebuje úplný prepis; znížte ju na obmedzenie spotreby tokenov pri rozsiahlych vizuálnych modeloch. Pole na paneli sa nachádza na paneli Advanced na karte Vision (`modality-bridge-max-chars` v `ModalityBridgeVisionTab.tsx`) a obmedzuje akúkoľvek hodnotu medzi 1 a 99 na spodnú hranicu 100, pričom explicitnú `0` ponecháva nedotknutú – `0` je platná hodnota Zod sama o sebe (`z.union([z.literal(0), z.number().int().min(100).max(50000)])`), nielen "nenastavená" predvolená hodnota.

#### Cache `describe` (`modalityBridge/bridgeCache.ts`)

In-memory LRU + TTL cache pre výstupy `describe`, zdieľaná v rámci celého procesu.
Kľúč = `sha256(imageRef + composedPrompt + configuredBridgeModel)` s rámovaním s prefixom dĺžky (žiadne kolízie hraníc polí). Komponent modelu je **konfigurovaný** bridge model, nie model, ktorý skutočne odpovedal – `callVisionModel` sa môže interne vrátiť k predchádzajúcej verzii a kľúčovanie pre každý pokus by fragmentovalo cache. Neúspešné `describe` sa nikdy neukladajú do cache. Nastavenia:

| Kľúč                            | Predvolené | Rozsah  |
| :------------------------------ | :--------- | :------ |
| `modalityBridgeCacheEnabled`    | `true`     | —       |
| `modalityBridgeCacheTtlMinutes` | `60`       | 1–1440  |
| `modalityBridgeCacheMaxEntries` | `200`      | 10–5000 |

#### Normalizácia vzdialeného obrazu (self-loop describe/base64 fetch)

Keď bridge sám načíta **vzdialený** obrázok – Anthropic self-call `describe` a konverzia base64 formátu claude-wire-format (`ensureBase64ImagesForClaudeWire`), obe prostredníctvom `fetchRemoteImageAsDataUri()` v `visionBridgeHelpers.ts` – výsledné data URI prechádza cez `normalizeDataUri()` (`open-sse/utils/imageNormalize.ts`) predtým, ako sa vloží do požiadavky vizuálneho modelu. Príliš veľké obrázky sa zmenšia na **dlhú stranu 2048px** (čo zodpovedá limitu zmeny veľkosti, ktorý už OpenAI/Anthropic aplikujú na strane servera), čo znižuje počet nahraných bajtov/latenciu bez zmeny toho, čo vidí vizuálny model. Zmena veľkosti používa `sharp`, načítaný prostredníctvom dynamického importu: na platforme, kde sa jeho natívny binárny súbor nenačíta, `normalizeDataUri()` **nikdy nevyvolá chybu** – vráti sa k prenosu pôvodných bajtov, takže cesta `describe`/konverzie base64 vždy funguje. Bajty, ktoré nie sú obrázkom (načítanie, ktoré nevrátilo dekódovateľný obrázok), sa tiež prenášajú nedotknuté. Táto normalizácia je obmedzená na obrázky, ktoré bridge načíta pre svoje vlastné volanie – nikdy sa neaplikuje na pôvodnú prenesenú dátovú časť volajúceho, čo je v súlade s princípom mutácie iba na základe opt-in (Hard Rule #20).

#### Schéma nastavení + migrácia

Nové kľúče `modalityBridge*` sú validované pomocou Zod v `updateSettingsSchema` (`src/shared/validation/settingsSchemas.ts`): `modalityBridgeVisionEnabled`, `modalityBridgeVisionMode`, `modalityBridgeVisionModel`, `modalityBridgeVisionTaskAware`, `modalityBridgeVisionPrompt`, `modalityBridgeVisionTimeout`, `modalityBridgeVisionMaxImages`, `modalityBridgeVisionMaxChars`, trojica `modalityBridgeCache*` a skupina `modalityBridgeAudio*` používaná Audio Bridge. Migrácia `141_modality_bridge_settings.sql` kopíruje existujúce staršie hodnoty `visionBridge*` do zodpovedajúcich nových kľúčov (idempotentné, nikdy neprepíše operátorom nastavenú hodnotu `modalityBridge*`); staršie kľúče zostávajú akceptované ako záložný čítací mechanizmus pre jeden cyklus vydania.

#### Hlavička transparentnosti + štatistiky

Odpovede transformované pomocou `describe` obsahujú hlavičku
`x-omniroute-modality-bridge: image->text;model=<visionModel>;parts=<n>`
(vytvorenú funkciou `buildModalityBridgeHeader()` v `modalityBridge/bridgeStats.ts`, označenú funkciou `withModalityBridgeHeader()` v `src/sse/handlers/chatHelpers.ts`). Presmerované požiadavky nedostanú **žiadnu** hlavičku – dátová časť bola nedotknutá a výmena modelu je už viditeľná v poli `model` v tele odpovede.

`GET /api/modality-bridge/stats` (správa autentifikácie, rovnaká úroveň ako `GET /api/settings`) vracia in-memory počítadlá pre jednotlivé modality
`{ attempts, successes, bridged, cacheHits, failures, totalLatencyMs, latencySamples, averageLatencyMs, lastUsedAt }` pre `vision`, `audio` a `video`. `averageLatencyMs` používa `latencySamples`, nie všetky pokusy, ako svojho menovateľa; operácia bez časovania nevytvára vzorku s nulovou milisekundou. `bridged` zostáva spätne kompatibilným aliasom pre úspešné konverzie; neúspešné pokusy ho nezvyšujú.
Počítadlá sa resetujú pri reštarte procesu zámerne (telemetria, nie účtovníctvo).

#### Konfigurácia dashboardu

Vyhradená stránka panela je `/dashboard/settings/modality-bridge`. Jej `Vision`, `Audio` a `Video` karty, ktoré sú dostupné cez URL, zachovávajú parametre dopytu pri prepínaní hodnoty `tab`. Karta Vision sprístupňuje zapnutie, režim, výber modelu (vrátane automatického predvoleného), promptovanie s ohľadom na úlohu, pokročilé limity pre časový limit/obrázok/dĺžku popisu/vyrovnávaciu pamäť, počítadlá behu a chránenú vzorovú požiadavku. Karta Audio je taktiež aktívna: sprístupňuje zapnutie, výber modelu iba pre STT s možnosťou Auto, limity pre časový limit/maximálny klip, zvukové počítadlá a test vzorky `input_audio`. Karta Video je funkčná: hlási stav behu FFmpeg/ffprobe – jeden zo štyroch explicitných stavov UI (`unknown`, zatiaľ čo prebieha sonda alebo sa ju nepodarilo dokončiť; `restricted` na hostiteľovi panela bez spätnej slučky, kde sa sonda preskakuje na strane klienta; `unavailable` po otestovaní a potvrdení chýbania; alebo `available` s verziami FFmpeg/ffprobe) – uchováva limity pre zapnutie/model/snímku/video/časový limit, filtruje výber modelu na modely schopné spracovať vizuálny obsah a sprístupňuje počítadlá videa.

Bývalá karta Vision Bridge v nastaveniach AI je odkazom kompatibility na novú stránku; už neobsahuje druhú kópiu formulára. Poskytovatelia médií taktiež prepájajú pracovné postupy Image-to-Text a Speech-to-Text so zodpovedajúcimi kartami Modality Bridge bez toho, aby odstránili existujúce ihrisko Speech-to-Text.

**Obídenie prijatia so spätnou sľučkou (Self-loop admission bypass):** keď volanie popisu prechádza cez vlastnú `/v1` spätnú sľučku OmniRoute (model neštandardného poskytovateľa), čiastočná požiadavka odošle `x-omniroute-admission-bypass: internal` a je autentifikovaná pomocou vyriešeného poverenia spätnej sľučky – lokálneho strážcu `sk_omniroute` v lokálnom režime alebo konfiguračného kľúča prostredia `OMNIROUTE_API_KEY` / `ROUTER_API_KEY` od operátora (#1350), takže nasadenia s `REQUIRE_API_KEY=true` môžu stále spustiť volanie popisu. Obídenie je akceptované iba pre tieto presné poverenia, takže externé klienti nemôžu použiť hlavičku na preskočenie prijatia.

Staršie predvolené nastavenia sa nachádzajú v `src/shared/constants/visionBridgeDefaults.ts`; nové predvolené nastavenia pre režim/úlohu/vyrovnávaciu pamäť a riešič nastavení sa nachádzajú v `src/shared/constants/modalityBridgeDefaults.ts`. Strážca sprístupňuje možnosť konštruktora `deps`, aby testy mohli injektovať falošné implementácie `getSettings` a `callVisionModel`.

### Audio Bridge (`audioBridge.ts`) — Modality Bridge PR-3

Zachytáva chatové požiadavky obsahujúce zvuk predtým, ako dorazia do cieľa, o ktorom nie je známe, že akceptuje zvukový vstup. Chatovú požiadavku nikdy nepresmerováva: zvukové časti sú prepisované prostredníctvom existujúceho viacdielneho koncového bodu kompatibilného s OpenAI a vybraný chatový model pokračuje s textovými prepismi.

Postup:

1. Vyriešte `supportsAudio` prostredníctvom `getResolvedModelCapabilities()`. Vyhráva explicitné metadáta registra poskytovateľov, potom statické metadáta modelu a nakoniec synchronizované `modalities_input`. Deklarovaný zoznam vstupov bez `audio` je `false`; žiadne dôkazy o schopnostiach zostávajú `null`. Hodnoty `false` aj `null` aktivujú konzervatívny most, zatiaľ čo `true` ho obíde.
2. Vyriešte nastavenia `modalityBridgeAudio*` a extrahujte rozdeliteľné zvukové časti najvyššej úrovne zo každej správy pomocou zdieľaného detektora `detectMediaParts()`. Podporované tvary na prenos sú OpenAI `input_audio`, `audio_url` a `source.media_type: "audio/*"`. Vnorený zvuk je detekovaný na účely smerovania, ale nie je odstránený cestou rozdelenia. Práca je obmedzená na `modalityBridgeAudioMaxClips`; neskoršie časti zostávajú nedotknuté.
3. Dodržujte konfigurovaný `provider/model` alebo nechajte `selectAudioBridgeModel()` prejsť `AUDIO_TRANSCRIPTION_PROVIDERS` v stabilnom poradí katalógu a vybrať prvý model s použiteľným aktívnym poverením poskytovateľa.
4. `callAudioTranscription()` konvertuje zvuk base64 / data-URI na viacdielny `file` alebo stiahne vzdialený `audio_url` cez odchádzajúcu stráž iba pre verejné použitie s pripínaním DNS a limitom 25 MB. Následne odošle súbor a vybraný model pomocou požiadavky POST do lokálnej spätnej sľučky `/v1/audio/transcriptions` autentifikovanej pomocou `resolveSelfLoopBearer()`. Existujúca trasa prepisu vykonáva štandardné vyhľadávanie poverení, spracovanie chladenia / obmedzovania rýchlosti (rate-limit) a distribúciu poskytovateľovi.
5. Úspešné volania nahradia svoje časti výrazom `[Audio N]: <transcript>`. Volania sa spúšťajú pomocou `Promise.allSettled`: individuálne zlyhanie zachová pôvodnú zvukovú časť (zmluva #4012). Ak zlyhá každé volanie a cieľ je preukázateľne `supportsAudio === false`, časti sa zmenia na `[Audio N]: (unavailable — no STT provider connected)` (zmluva #8430). Pre neznámy cieľ (`null`) zostáva výsledok pri zlyhaní všetkých volaní nedotknutý. Preukázateľne textový cieľ bez použiteľných STT poverení dostane rovnakú explicitnú náhradu bez vykonania sieťového volania.

Úspešné prepisy využívajú procesnú LRU/TTL vyrovnávaciu pamäť Modality Bridge. Kľúč kombinuje odkaz na zvuk, stabilný štítok operácie `audio-transcription` a vybraný STT model; zlyhania sa nikdy neukladajú do vyrovnávacej pamäte. Zvukové pokusy aktualizujú zdieľané počítadlá `bridged`, `cacheHits`, `failures` a `lastUsedAt`. Transformované odpovede obsahujú hlavičku `x-omniroute-modality-bridge: audio->text;model=<sttModel>;parts=<n>`; nedotknuté požiadavky nezískajú segment Audio Bridge.

Nastavenia behu sú podložené databázou a overené pomocou Zod:

| Kľúč                          | Predvolené | Rozsah            |
| ----------------------------- | ---------- | ----------------- |
| `modalityBridgeAudioEnabled`  | `true`     | —                 |
| `modalityBridgeAudioModel`    | `""`       | Auto alebo STT ID |
| `modalityBridgeAudioTimeout`  | `60000`    | 1000–300000       |
| `modalityBridgeAudioMaxClips` | `3`        | 1–10              |

Zdieľaná vyrovnávacia pamäť je naďalej kontrolovaná pomocou `modalityBridgeCacheEnabled`, `modalityBridgeCacheTtlMinutes` a `modalityBridgeCacheMaxEntries`.

### Video Bridge (`videoBridge.ts`, `videoBridgePipeline.ts`)

Zachycuje video časti najvyššej úrovne v `messages` a odpovediach Chat Completions
API `input` pred volaním cieľa bez známej natívnej podpory videa.
Podporované tvary sú `input_video`, `video_url`, `video_source`, HTTPS URL,
a `data:video/*;base64,...` dátové URI. Obyčajné názvy súborov v texte sa nepovažujú
za video.

`VideoBridgeGuardrail.preCall` (`videoBridge.ts`) vlastní prechádzanie požiadaviek,
kontrolu schopností/politík, agregáciu na požiadavku a dátovú časť odpovede.
Práca s jednotlivými videami – získavanie, celo-výsledková cache, popis sekvencie snímok
(ktorá spája akýkoľvek volajúcim deklarovaný audio prepis) a metriky/prerušenie/čistenie
na pokus – je skrytá za `processVideoPart` v
`videoBridgePipeline.ts`, volaná raz pre každú video časť v rámci cyklu `preCall`.
Tento modul tiež definuje explicitné hranice portov `VideoMediaBrokerPort`
(získavanie bajtov a extrakcia vzorkovaných snímok), `VideoAudioTranscriptionPort`
(spájanie volajúcim deklarovaného audio prepisu so vzorkovanými titulkami) a
`VideoDrilldownPort` (hranica perzistencie pre detailné prezeranie snímok; zatiaľ nie je
zapojená do `processVideoPart` – iba samostatná trasa `/api/modality-bridge/video/drilldown`
zapisuje záznamy pre detailné prezeranie dnes).

Verejná cesta požiadavky `/v1` nikdy neimportuje ani nevyvoláva podproces. Vzdialené
videá sa sťahujú s limitom 50 MiB; inline base64 videá majú
konzervatívny limit 36 MiB dekódovaných na video, takže obálka modelu/správ/rámcovania
môže zostať v rámci verejného limitu prijatia JSON požiadavky 50 MiB. Inline
dĺžka a odhady dekódovanej veľkosti sa kontrolujú pred alokáciou. HTTPS je
vyžadované na počiatočnej vzdialenej URL a pri každom presmerovaní,
používajúc existujúcu verejnú odchádzajúcu ochranu s pripínaním DNS. Bajty potom prechádzajú
presnou internou hranicou brokera `POST /api/modality-bridge/video/extract`. Táto trasa je
`LOCAL_ONLY` aj `SPAWN_CAPABLE`, akceptuje iba autentifikovanú,
dôveryhodnú požiadavku s lokálnou slučkou na proces a nikdy neakceptuje URL, cestu k súboru,
spustiteľný súbor alebo zoznam argumentov. Pipeline pre veľkosť tela API a inkrementálny
čítač tela obsluhy nezávisle vynucujú limit vstupu brokera 50 MiB. Jeho ohraničený
front vykonáva jednu extrakciu naraz, umožňuje štyri čakajúce úlohy a obmedzuje
čakajúci vstup na 100 MiB.

Vo vnútri brokera `ffprobe` číta súkromný lokálny súbor; pevný formát
whitelist vylučuje formáty playlistov a manifestov. Pre povolené kontajnery
rodiny MOV zostávajú externé dátové referencie MOV predvolene zakázané a
pevný príkaz ich nepovoľuje. `ffprobe` aj `ffmpeg` používajú
whitelist protokolu iba `file`, jedno vlákno, pevné polia argumentov,
žiadny shell a spustiteľné súbory rozlíšené z `PATH`. Priložené obrázkové
krycie streamy nie sú kandidátmi na prehrávanie. Všetky prehrávateľné streamy
musia spĺňať limity a explicitný predvolený stream je preferovaný pred
deterministickým fallbackom s najnižším indexom. Videá sú obmedzené na 600
sekúnd, 8 192 pixelov na rozmer a 33 554 432 zdrojových pixelov. FFmpeg
vzorkuje 1–16 stredových JPEG snímok, zmenšuje dlhú stranu na maximálne 1 024
pixelov bez zväčšovania menších vstupov a nikdy neprijíma URL. Vzorkovanie je
predvolene `uniform`. Voliteľné politiky `scene_aware` a experimentálne
`segment_aware` vykonávajú jeden dodatočný pevný prechod FFmpeg cez už
validovaný lokálny stream, vyberajú ohraničené časové značky scény `showinfo`
a deterministicky sa vrátia k rovnakým uniformným stredovým bodom pri zlyhaní
detektora, vypršaní časového limitu, chybnom výstupe alebo prázdnej množine
kandidátov. Režim segment-aware alokuje stredové vzorky proporcionálne k
validovaným intervalom scény; dôkazy a správanie fallbacku segment-aware sú
podrobne popísané nižšie. Pevný limit 16 snímok sa aplikuje po výbere v
každej politike. Keď požiadavka s vedomím scény má rozpočet iba na jednu
snímku, použije uniformný stredový bod aktívneho celého videa alebo okna
zaostrenia a hlási `policyEffective: uniform`: jedna vybraná snímka scény
nemôže zachovať oba časové konce. Volajúci môže voliteľne poskytnúť konečné
okno zaostrenia (`start`/`end` sekundy); hranice sú ohraničené na trvanie
médií, obrátené alebo nekonečné okná sú odmietnuté a všetky politiky
vzorkovania sa vykonávajú iba v rámci normalizovaného intervalu. Výsledné
okno je zahrnuté v metadátach vzorkovania a v nedôveryhodnom prefixe popisu,
aby následné modely mohli rozlíšiť zaostrený úryvok od celej časovej osi.

Sémantické zameranie titulkov je samostatné, explicitné nastavenie. Predvolený režim analýzy `full`
zachováva existujúcu výzvu snímky a nikdy neposiela text požiadavky modelu titulkov.
V režime `focused` mostík číta iba najnovší neprázdny text/vstupný text
napísaný používateľom z rovnakého kontajnera chatu alebo odpovedí, normalizuje ho na NFC,
zbalí riadiace znaky a medzery a obmedzí ho na 500 Unicode kódových bodov.
Prázdny výsledok sa vráti k presnej výzve `full`. Použiteľná nápoveda je serializovaná
ako JSON v špeciálnom bloku nedôveryhodného používateľského kontextu a môže iba
uprednostniť pozorovateľné detaily; nemôže prepísať samostatné varovanie pred
dodržiavaním pokynov viditeľných alebo počuteľných v médiách. Textové zameranie nikdy
neodvodzuje `start`/`end` ani nemení časový vzorkovač.

#### FU-07 dôkaz štrukturálneho segmentu

`segment_aware` používa jeden ohraničený predbežný analytický prechod cez už validovaný
lokálny video stream. Pevný reťazec filtrov najprv zmenší na maximálne 320 pixelov
na šírku, detekuje zmeny scény a zamrznuté intervaly, potom vzorkuje 1 snímku za
sekundu pre rozmazanie, priemernú svietivosť a priestorové/časové informácie. Prechod je
obmedzený na 600 štrukturálnych vzoriek, jedno vlákno FFmpeg/filtra, rovnaké
protokolové a kontajnerové whitelist pre `file`-only, limit výstupu procesu 1 MiB
a maximálne 30 sekúnd v rámci zdieľaného prerušenia/termínu brokera. Nikdy
neprijíma príkaz, filter, cestu alebo URL z požiadavky.

Štrukturálne hodnoty sú deterministické dôkazy vzorkovania, nie sémantické porozumenie videa. Neodvodzujú subjekty, akcie, titulky, reč ani zámer používateľa. Hranice scén a zmrazenia tvoria segmenty; pokrytie zmrazenia, rozmazanie, expozícia, priestorové detaily a časová zmena ovplyvňujú len to, ako sa alokuje existujúci rozpočet 1–16 snímok. Plne zmrazený segment je obmedzený na jednu snímku, zatiaľ čo nezmrazené segmenty súťažia o zostávajúci rozpočet. Keď hranice prevyšujú počet snímok, zachováva sa rovnomerné pokrytie časovej osi, aby rýchle skoré strihy nemohli skryť dlhý záverečný segment. Hranice scén v rámci 1-sekundového rozlíšenia analýzy hranice zmrazenia sú zjednotené.

Chýbajúce filtre, chybné/prázdne dôkazy, chyba detektora alebo ohraničený časový limit predbežnej analýzy zlyhajú a prejdú na presnú politiku rovnomerného stredného bodu. Zrušenie volajúcim alebo termín brokera nespôsobí otvorené zlyhanie: ukončí prebiehajúci podproces, zabráni neskoršej extrakcii snímok a súkromný dočasný strom sa odstráni v `finally`.

`scripts/perf/video-bridge-fu07-eval.ts` generuje deterministické reálne FFmpeg fixtúry pre úspory volaní titulkov po deduplikácii, alokáciu rozpočtu pre hustý pohyb, dôkazy rozmazania/expozície/SI-TI, rýchle strihy s dlhým záverom a falošné pozitíva postupného stmievania. Zaznamenáva čas steny pred analýzou a, ak je k dispozícii `/usr/bin/time`, aj CPU podprocesu a špičkový RSS. Jeho kontroly kvality sú len štrukturálne orákulá. Kvalita skutočného modelu titulkov zostáva `HOLD`, pretože tento testovací rámec nemá autorizovaný koncový bod ani zmrazeného posudzovateľa. Finančné úspory tiež zostávajú `HOLD`, pokiaľ `--caption-cost-per-call-usd` nedodá explicitný pozitívny odhad nákladov na jedno volanie; skript nikdy nevytvára ani jeden z týchto výsledkov.

Každá snímka je obmedzená na 4 MiB, všetky surové snímky spolu na 23 MiB a serializovaná odpoveď brokera na 32 MiB. Súkromný dočasný adresár sa odstráni v `finally`. OmniRoute neobsahuje FFmpeg a neprijíma vlastnú spustiteľnú cestu. Pred titulkovaním mostík aplikuje konzervatívny vizuálny deduplikačný prechod: každý JPEG je zmenšený na 16×16 stupňov šedej a porovnáva sa len s poslednou zachovanou snímkou. Pre požadovaný rozpočet titulkov nad jednu snímku, extrakcia poskytuje ohraničený súbor kandidátov až do dvojnásobku tohto rozpočtu a nikdy nie viac ako 16 snímok. Požadovaný limit sa aplikuje až po deduplikácii, pričom prví a poslední vybraní kandidáti sú zachovaní počas záverečného zriedenia, keď je rozpočet aspoň dva. Verziovaná politika `grayscale-16x16-mean-cells-v2` používa väčšiu z priemernej delty luma a pomeru buniek miniatúr, ktorých normalizovaná delta je aspoň 0.05. Prah duplikácie je konštanta 0.04, zvolená pre predvídateľnosť, a nie ako nastavenie za behu. Tento sekundárny vysokokontrastný signál zachováva malé pohyby a zmeny viditeľného textu, ktoré by porovnanie len priemerom mohlo skryť. Chyby komparátora alebo dekodéra zlyhajú otvorene a zachovajú pokrytie. Výstupné metadáta oddeľujú extrahovaných kandidátov, úspešne použité snímky a vyradené vizuálne duplikáty.

Explicitne označená časť videa môže požiadať o časovo označený kontaktný list. Mostík vytvorí maximálne 4-stĺpcovú, 16-snímkovú JPEG mriežku. Každá 512-pixelová bunka vypáli svoju zdrojovú časovú značku do vysokokontrastného spodného pásu, zatiaľ čo rovnaké časové značky zostávajú v textových metadátach pre následné priradenie a audit. Kompletný JPEG zostáva obmedzený na 32 MiB. Ak `sharp` nedokáže dekódovať alebo skomponovať mriežku, mostík sa vráti k jednotlivým JPEG snímkam; zrušenie klientom sa stále šíri cez operáciu listu.

Dôkazy o propagácii sú zámerne oddelené od syntetického mikrobenchmarku kompozície. `scripts/perf/video-bridge-contact-sheet-eval.ts` definuje A/B testovací rámec s verziovanou schémou pre reálne vizuálne modely kompatibilné s OpenAI. Meria tokeny nahlásené poskytovateľom, celkovú latenciu (vrátane kompozície listu), počet volaní modelu a uchovanie faktov definovaných v manifeste. Surové odpovede modelu sa nezapisujú do správy; uchovávajú sa len SHA-256 súhrny a zhodné ID faktov. Testovací rámec nevykonáva žiadne sieťové ani platené volania modelu, pokiaľ nie je odovzdaný `--execute-real` a nie sú nakonfigurované `OMNIROUTE_BASE_URL` a `OMNIROUTE_API_KEY`. Bez tohto explicitného reálneho spustenia zostáva jeho strojovo čitateľný verdikt `HOLD`; samotné syntetické merania záťaže/počtu volaní nie sú dôkazom propagácie.

Volajúci môžu pripojiť voliteľné pole `transcript.cues` k podporovanej časti videa, ak už majú zarovnaný text. Každá narážka musí obsahovať `text`, konečný interval `start`/`end` v rámci sondovanej dĺžky a povolený `source` (`client`, `embedded` alebo `audio-bridge`); `confidence` predvolene je `1` a musí zostať medzi `0` a `1`. Presné duplicitné narážky sú zbalené. OmniRoute nikdy nespúšťa prepis z týchto metadát: validované narážky sú skopírované do popísaného výsledku so zdrojom, dôverou a intervalom a sú zobrazené ako nedôveryhodné pozorovania popri titulkoch snímok. Neplatný text, text mimo rozsahu alebo text bez pôvodu je odmietnutý, namiesto toho, aby bol zmiešaný do prúdu titulkov. Pole `source` je v súčasnosti deklarované volajúcim, nie overené serverom: OmniRoute vynucuje, aby hodnota bola jedným z troch povolených reťazcov, ale zatiaľ kryptograficky nepotvrdzuje, že štítok `embedded` alebo `audio-bridge` skutočne pochádza z extrakcie vlastnenej serverom. Považujte `source` za nedôveryhodnú narážku, kým sa toto overenie neuskutoční; nestavajte na ňom autorizačné rozhodnutia.

Pokročilý volajúci môže poskytnúť už autorizovanú stopu `audioTranscript` pre to isté video. Spojovací šev spracováva vizuálne a zvukové pozorovania pod jedným termínom a signálom prerušenia, usporadúva ich na spoločnej časovej osi, zlučuje presné duplikáty a hlási čiastočný výsledok, ak uspeje len jedna strana. Neplatný `audioTranscript` sa zhorší na tento čiastočný výsledok — vizuálny popis sa zachová a zvuková vetva zaznamená sanitovaný kód chyby — namiesto zlyhania celého videa. Dostupnosť pre každú vetvu, príznak čiastočnosti a sanitované kódy chýb sú zachované v popísanom výsledku, v metadátach guardrailu (`audioFusionRuns`/`audioFusionPartials`/`audioFusionFailureCodes`), v metadátach cache výsledkov a v počítadlách fúzie mosta. Predvolená cesta Video Bridge nevyvoláva prevod reči na text ani nesťahuje druhú kópiu média; bez tejto explicitnej stopy zostáva iba video.

**Uchovávanie prepisu (#12150 P1).** Toto sa uplatňuje automaticky vždy, keď Video Bridge (ktorý je sám voliteľný) vykreslí značku prepisu — neexistuje samostatný príznak uchovávania. Keď požiadavka vykreslí akúkoľvek značku prepisu (volajúcim deklarovaný `transcript` alebo zlúčený `audioTranscript`), guardrail ju označí ako `videoBridgeObserved` a vytvorí redigovaný tieň popisu videa — identické vykreslenie, v ktorom je voľný text každého značky nahradený reťazcom `[redacted-video-transcript]`, vytvoreným nahradením štruktúrovaného poľa značky pred zostavením reťazca (nikdy nie parsovaním splošteného textu, takže žiadny obsah značky — či už útočný alebo bežný, vrátane telies obsahujúcich `]` ako napríklad `[inaudible]`/`[music]` — nemôže prežiť). Telo požiadavky v perzistentnom zázname hovorov vymení každú textovú časť odvodenú z videa za tento redigovaný tieň, zhodovaný podľa rovnosti obsahu; kotva `fullText` sa znovu načíta z dokončeného payloadu guardrailu pred volaním, takže zhoda stále uspeje aj po tom, čo neskoršie reťazové guardraily (maskovače PII a poverení, priority 10/95) prepíšu text popisu na mieste a po tom, čo injekcia systémovej výzvy/odovzdania/pamäte preformuje pole správ. Telo odoslané upstreamu modelu zostáva nezmenené. Pozorovaná požiadavka tiež neplní žiadnu trvalú pamäť (preskakuje sa extrakcia odvodená z požiadavky aj z odpovede), takže vlastná odpoveď modelu nemôže zopakovať text prepisu do pamäte.

Dodatočné uchované kópie používajú rovnaký signál pozorovanej požiadavky. Surový snímok klientskej požiadavky pred guardrailom, požiadavka čakajúca v pamäti a skorý záznam odmietnutých požiadaviek štrukturálne nahrádzajú polia prepisu vo video častiach; reťazcové výzvy syntetizované fázami pipeline a odovzdávaním kontextu sú redigované v úložisku perzistentného tela požiadavky. Perzistentný značkovač `video_content_removed` spôsobí, že pokračovanie `previous_response_id` zlyhá uzavreto, namiesto aby rekonštruovalo text, ktorý bol zámerne zahodený. Ak pozorovaná požiadavka stratí svoj tieň redakcie pre jednotlivé časti pred zaznamenaním, alebo dokonca jeden z niekoľkých video tieňov sa nezhoduje po neskorších mutáciách požiadavky, uchované telo požiadavky sa úplne vynechá namiesto uchovania čiastočne redigovaného prepisu.

Pre pozorovanú požiadavku môže odpoveď modelu citovať akúkoľvek časť prepisu bez štruktúrovanej hranice značky. Jeho perzistentné `responseBody` v zázname hovorov je preto nahradené značkou vynechania; podrobný artefakt pipeline (ktorý môže zahŕňať upstream/klientske telá a streamové bloky) sa neuchováva. Sémantické, idempotencia a cache pre opakovanie uvažovania obchádzajú čítanie a zápis pre túto požiadavku. Požiadavka poskytovateľa a klientovi viditeľná odpoveď zostávajú nezmenené. Skoré keepalive bajty sú vyprázdnené z dočasného bufferu, keď je podrobný artefakt vynechaný. Upozornenie Kiro na chybne formovaný EventStream hlási iba počet bajtov payloadu, nikdy jeho obsah ani surovú chybu JSON parsera. Toto netvrdí, že každá nesúvisiaca diagnostika poskytovateľa/pluginu bola auditovaná; širšie preverovanie uchovávaných sinkov je sledované v #11658.

Interný životný cyklus `/api/modality-bridge/video/drilldown` je samostatný, loopback/tokenom autentifikovaný cache substrát. Každá operácia tiež vyžaduje kanonické nepriehľadné ID princípu. Pred povolením produkčného volajúceho musí odvodiť toto ID z autentifikovaného nájomníka a nikdy nesmie preposielať klientom vybranú hodnotu. Kľúče cache viažu tento princíp ku kanonickým ID relácií a video-referencií, ukladajú iba ich kľúče odvodené pomocou SHA-256 a obmedzujú čítanie aj mazanie na rovnaký princíp. Cache ukladá maximálne 16 odvodených JPEG snímok na záznam, expiruje ich po desiatich minútach a podporuje ohraničené čítanie `start`/`end` alebo explicitné vymazanie relácie.

Každý princíp je obmedzený na 16 záznamov a 64 MiB kanonických JPEG dát. Tieto limity sú nezávislé od globálneho stropu 64 záznamov/256 MiB: tlak kvóty princípu vyradí iba najmenej nedávno použité záznamy tohto princípu predtým, ako sa zváži globálne LRU vyradenie. Expirované záznamy sú odstránené z účtovníctva princípu aj globálneho účtovníctva pri aktivite cache, zatiaľ čo zrušenie a zlyhanie validácie necommitujú čiastočnú náhradu.

Cache odmieta nekanonické Base64, nadmerné dopĺňanie, iné ako JPEG médiá, chybne formované alebo skrátené JPEGy a JPEGy, ktoré vyvolajú varovanie počas ohraničeného dekódovania celého obrazu pomocou `sharp`. Každý prijatý obrázok prekoduje ako kanonický JPEG, odvodí šírku a výšku z dekódovaných bajtov namiesto spoliehania sa na polia volajúceho a zahodí všetky koncové polyglotné bajty namiesto ich uchovávania. Iba ohraničený kanonický komprimovaný buffer sa započítava do oboch kvót. Limit JSON wire zahŕňa réžiu Base64 pre strop 32 MiB dekódovaného vstupu. Každá uložená derivácia zaznamenáva svoj validovaný formát/rozlíšenie JPEG, politiku vzorkovania, verziu derivácie, čas vytvorenia, serverom vypočítaný hash obsahu a hashovanú referenciu rodiča plus hash obsahu rodiča dôveryhodného volajúceho. Zrušenie sa kontroluje medzi asynchrónnymi fázami dekódovania/hashovania pred atomickým commitom cache.

Táto tranža zatiaľ nepripája produkčného producenta k trase a neposkytuje výber variantov s viacerými rozlíšeniami. Transparentná cesta požiadavky Video Bridge preto nespôsobuje žiadnu dodatočnú prácu, zatiaľ čo odvodenie princípu viazaného na nájomcu a celý životný cyklus FU-08 s viacerými rozlíšeniami zostávajú explicitnou následnou prácou, namiesto toho, aby boli dokumentované ako kompletné správanie.

Snímky sú postupne popisované nakonfigurovaným modelom Video. Prázdne prepísanie Video zdedí nastavenie Vision; ak sú obe prázdne, automatický smerovač Vision vyberie efektívny model schopný videnia. Úspešné popisy nahradia pôvodnú časť stabilnou predponou `[Video description:` ktorá tiež označuje text ako nedôveryhodné pozorovanie odvodené z médií a hovorí následným modelom, aby sa neriadili pokynmi nájdenými v médiách. Kľúče vyrovnávacej pamäte popisov snímok zahŕňajú bajty JPEG, výzvu, časovú pečiatku a efektívny model; do vyrovnávacej pamäte sa ukladajú iba úspešné popisy. Položky vyrovnávacej pamäte si zachovávajú skutočný úspešný model producenta, vrátane záložného modelu; most hlási `mixed`, keď boli rôzne snímky vytvorené rôznymi modelmi. Trafenie do vyrovnávacej pamäte opätovne použije túto identitu producenta namiesto toho, aby ju premenovalo na požadovaný plán smerovania. Celovideová vyrovnávacia pamäť výsledkov je kľúčovaná na základe každého vstupu, ktorý mení výstup — výzva, efektívny model, politika vzorkovania, počet snímok, režim sémantickej analýzy, odtlačok SHA-256 normalizovaného náznaku zaostrenia, okno zaostrenia, `transcript`, `audioTranscript` a príznak kontaktného listu — takže zmena ktorejkoľvek z týchto dimenzií je zlyhaním vyrovnávacej pamäte, nikdy nie zastaraným opätovným použitím. Verzia politiky vizuálnej deduplikácie, prahová hodnota a ohraničený počet kandidátskych snímok sú tiež explicitné v kľúči vyrovnávacej pamäte výsledkov a metadátach; zmena politiky preto nemôže opätovne použiť zastaraný celovideový popis. Metadáta vyrovnávacej pamäte výsledkov v4 uchovávajú režim a odtlačok, nikdy nie surovú používateľskú úlohu. Metadáta guardrail hlásia požadované aj efektívne režimy analýzy; požadovaný režim `focused` bez použiteľného používateľského textu je hlásený ako efektívne `full`.

Guardrail extrahuje každú podporovanú video časť, ale nepopisuje viac ako `modalityBridgeVideoMaxVideos`. Pre cieľ, u ktorého sa preukázalo, že má `supportsVideo === false`, sa neúspešné a prekročené videá stávajú explicitnými bezpečnými textovými značkami, takže žiadne surové video neprežije. Keď je schopnosť neznáma, tieto časti zostávajú nedotknuté. Ciele s `supportsVideo === true` obchádzajú most. Signál prerušenia požiadavky klienta sa šíri cez sťahovanie, frontu brokera, podprocesy a volania popisov; prerušenia sa zastavia medzi videami a nikdy sa neotvoria k surovým médiám.

Nastavenia za behu sú zálohované v DB a validované pomocou Zod:

| Kľúč                                | Predvolené  | Rozsah / správanie                                                                                             |
| :---------------------------------- | :---------- | :------------------------------------------------------------------------------------------------------------- |
| `modalityBridgeVideoEnabled`        | `false`     | Voliteľné za behu, prihlásenie                                                                                 |
| `modalityBridgeVideoAnalysisMode`   | `"full"`    | `full` zachováva všeobecné popisy; `focused` používa ohraničený, nedôveryhodný kontext najnovšieho používateľa |
| `modalityBridgeVideoModel`          | `""`        | Zdedí model Vision Bridge                                                                                      |
| `modalityBridgeVideoFrameCount`     | `8`         | 1–16                                                                                                           |
| `modalityBridgeVideoSamplingPolicy` | `"uniform"` | `uniform`, `scene_aware`, alebo proporcionálne `segment_aware`; zlyhanie detektora sa vráti k `uniform`        |
| `modalityBridgeVideoMaxVideos`      | `1`         | 1–4                                                                                                            |
| `modalityBridgeVideoTimeout`        | `120000`    | 1000–120000 ms                                                                                                 |

Staršie pretrvávajúce hodnoty časového limitu videa nad 120 sekúnd sú obmedzené na termín brokera; nové zápisy nastavení nad tento limit sú odmietnuté. `GET /api/modality-bridge/video/runtime` vyžaduje dôveryhodnú označenú loopback lokalitu pred autentifikáciou alebo sondovaním za behu, potom vyžaduje správcovskú autentifikáciu. Vracia iba `available`, sanitizované verzie FFmpeg/ffprobe a pevný dôvod, keď je runtime nedostupný. Interný extrakčný koncový bod nie je verejné API na nahrávanie: saturácia fronty vráti `503` plus `Retry-After`, odpojenie volajúceho vráti `499` a pevný termín brokera vráti `504`. Konvertované odpovede pridávajú `video->text;model=<visionModel>;parts=<videos>` do centrálnej hlavičky `x-omniroute-modality-bridge` bez odstránenia segmentov Vision alebo Audio.

### Maskovač PII (`piiMasker.ts`)

Beží na **oboch** fázach.

- **`preCall`** klonuje payload, prechádza `system`, `messages`, `input` a `prompt` (vrátane položiek s obyčajným reťazcom) a aplikuje `processPII()` (z `@/shared/utils/inputSanitizer`) na reťazcové polia `content`/`text`. Keď `PII_REDACTION_ENABLED=true`, detegované PII je redigované vo výstupnom payloade. Toto je nezávislé od `INPUT_SANITIZER_MODE` (ktorý riadi iba politiku vstrekovania výziev). Keď je redakcia vypnutá, volanie zaznamenáva počty detekcií bez prepisovania obsahu.
- **`postCall`** hlboko klonuje odpoveď, spúšťa `sanitizePIIResponse()` plus maskovač tvaru Responses-API (`maskResponsesOutput` — pokrýva `output_text` a `output[].content[].text`). Ak dôjde k akejkoľvek redakcii, upravená odpoveď nahradí pôvodnú.

Guardrail nikdy neblokuje; iba anotuje (`meta.detections`, `meta.redacted`) alebo prepisuje.

### Vstrekovanie výziev (`promptInjection.ts`)

Deteguje nepriateľské štruktúry v obsahu dodanom používateľom a vynucuje nakonfigurovanú politiku. Správanie je riadené premennými prostredia a možnosťami konštruktora:

| Nastavenie      | Premenná prostredia                                                                                   | Predvolené | Účinok                                                                                                                                                                                                   |
| --------------- | ----------------------------------------------------------------------------------------------------- | ---------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Povolené        | `INPUT_SANITIZER_ENABLED`                                                                             | `true`     | Keď je `false`, zábrana sa skratuje.                                                                                                                                                                     |
| Režim           | `INJECTION_GUARD_MODE` / `INPUT_SANITIZER_MODE`                                                       | `warn`     | Politika injekcie: `block`, `warn` alebo `log`. (`redact` je akceptované pre spätnú kompatibilitu, ale **neodstraňuje** injekčný text; požiadavka na prepísanie PII je riadená `PII_REDACTION_ENABLED`.) |
| Prah blokovania | `blockThreshold` option / `INPUT_SANITIZER_BLOCK_THRESHOLD` (alias `INJECTION_GUARD_BLOCK_THRESHOLD`) | `high`     | Minimálna závažnosť potrebná na blokovanie. Stredná je v predvolenom nastavení len na pozorovanie.                                                                                                       |

**Priorita režimu** (`getMode`): volajúci `options.mode` →
`INJECTION_GUARD_MODE` **prepis funkcie DB** (Dashboard → Settings →
Feature Flags) → `INJECTION_GUARD_MODE` env → `INPUT_SANITIZER_MODE` env →
`warn`. Prepis z dashboardu teda vyhráva nad premennými prostredia, takže UI Feature Flags
riadi spustenú zábranu naživo (bez reštartu). Čítanie z DB je bezpečné proti zlyhaniu:
ak dôjde k chybe, zábrana sa vráti k správaniu založenému na prostredí, a keď
nie je nastavený žiadny prepis, správanie je identické s rozlíšením len na základe prostredia.

Zdroje detekcie:

1. `sanitizeRequest()` z `@/shared/utils/inputSanitizer` (zdieľaná sada detektorov
   používaná inde v pipeline).
2. Vstavané `DEFAULT_GUARD_PATTERNS` (aktuálne `system_override_inline` a
   `markdown_system_block`, obe s `high` závažnosťou).
3. Voliteľné `customPatterns` odovzdané prostredníctvom možností konštruktora (reťazce, regex,
   alebo záznamy `{ name, pattern, severity }`).

Keď `mode === "block"` **a** aspoň jedna detekcia spĺňa prah závažnosti,
`preCall` vráti `{ block: true, message: "Request rejected:
suspicious content detected" }`. V režimoch `warn`/`log` zábrana zaznamená, ale
povoliť volanie. Zdieľaná pomocná funkcia `evaluatePromptInjection()` je tiež exportovaná
pre volajúcich, ktorí potrebujú vyhodnotiť výzvy bez prechodu cez register.

**Hranica skenovania (v3.8.20):** detektor kontroluje iba **prvých 16 KB**
spojeného textu výzvy — `MAX_INJECTION_SCAN_BYTES = 16 * 1024` (16 384 bajtov) v
`src/shared/utils/inputSanitizer.ts`. Obidve funkcie `detectInjection()` a
`evaluatePromptInjection()` `slice(0, MAX_INJECTION_SCAN_BYTES)` pred spustením
cyklu vzorov. Direktivy injekcie sú blízko začiatku vstupu, takže to
obmedzuje CPU/GC regexu pri viacstokilobajtových dátach bez oslabenia detekcie (porov.
#3932, #4041).

### Maskovač poverení (`credentialMasker.ts`)

Spúšťa sa na **oboch** fázach, posledný v predvolenom reťazci (priorita `95`). Rediguje
známe vzory API kľúčov / tajných tokenov z odchádzajúceho dátového bloku (obsah správy,
argumenty volania nástroja, výsledky nástroja) **a** odpovede poskytovateľa, takže
poverenie vložené do výzvy (alebo vrátené výsledkom nástroja) sa neprezradí
upstream poskytovateľovi ani späť klientovi.

- **Len opt-in**, rovnaká konvencia ako redigovanie PII (Tvrdé pravidlo #20-susediace):
  zakázané, pokiaľ `settings.credentialRedactionEnabled === true` **alebo**
  `CREDENTIAL_REDACTION_ENABLED=true`. Ak je vypnuté, zábrana je no-op —
  nikdy neblokuje a nikdy neprepisuje.
- `redactCredentials()` prechádza celý strom dátového bloku/odpovede (`walkValue()`,
  bezpečné proti znečisteniu prototypu, bezpečné proti cyklom pomocou `WeakSet`) a nahrádza zhody
  zástupným symbolom `[REDACTED:<type>]`, klonujúc iba vetvy, ktoré sa skutočne
  zmenili.
- `CREDENTIAL_PATTERNS` pokrýva kľúče poskytovateľov LLM (OpenAI, OpenAI-proj,
  Anthropic, Google, Hugging Face, Replicate), tokeny VCS/SaaS (GitHub, Slack,
  Linear, Notion, npm, Postman, Discord), platobné kľúče (Stripe, Square), cloudové
  kľúče (prístupový kľúč AWS, Twilio, SendGrid, Mailgun), súkromné kľúče / JWT,
  pripojovacie reťazce obsahujúce poverenia (`mongodb://user:pass@...`, atď.) a
  generický vzor hodnoty hlavičky `Authorization`/`x-api-key`/`api-key`/`apikey`.
  Kľúče v tvare hlavičky (`authorization`, `x-api-key`, `api-key`,
  `apikey`) sú redigované štrukturálne (iba hodnota, prefix schémy ako
  `Bearer `/`Basic ` je zachovaný) namiesto prostredníctvom generického textového regexu.
- Zábrana nikdy neblokuje; iba prepisuje (`modifiedPayload` /
  `modifiedResponse`) a anotuje (`meta.credentialsRedacted`, `meta.count`).

Regresná zábrana: `tests/unit/credential-masker-guardrail.test.ts`.

## Základný kontrakt (`base.ts`)

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
  block?: boolean; // hodnota true okamžite ukončí reťazec
  message?: string; // zobrazí sa pri blokovaní
  meta?: Record<string, unknown> | null;
  modifiedPayload?: TValue; // vrátené metódou preCall na úpravu požiadavky
  modifiedResponse?: TValue; // vrátené metódou postCall na úpravu odpovede
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

Ochranný mechanizmus signalizuje „bez zmeny“ vrátením hodnoty `void`, `{}` alebo
`{ block: false }`. Vrátenie hodnoty `modifiedPayload`/`modifiedResponse` nahradí
hodnotu prechádzajúcu reťazcom pre nasledujúce ochranné mechanizmy.
`signal?: AbortSignal` prenáša životný cyklus volajúceho do ochranných mechanizmov. Prerušenie požiadavky je zámernou výnimkou typu fail-open: mediálne mosty zastavia prácu a vykonajú vyčistenie bez obnovenia nespracovaných médií pre cieľ, o ktorom je známe, že ich nepodporuje.

## Register (`registry.ts`)

Jediná inštancia `guardrailRegistry` poskytuje:

- `register(guardrail)` — pridá ochranný mechanizmus (alebo ho nahradí podľa normalizovaného názvu) a
  opätovne zoradí mechanizmy vzostupne podľa `priority`.
- `clear()` / `list()` — administratívne pomocné metódy.
- `runPreCallHooks(payload, context)` — prechádza aktívnymi ochrannými mechanizmami, odovzdáva
  payload prostredníctvom `modifiedPayload` a zastaví sa pri prvom výskyte `block: true`.
- `runPostCallHooks(response, context)` — rovnaký postup na strane odpovede.
- `resetGuardrailsForTests({ registerDefaults })` — vymaže stav a voliteľne
  znova zaregistruje predvolené mechanizmy, aby sa zabezpečila čistá izolácia testov.

Obe spúšťacie metódy vracajú `{ blocked, payload|response, results, guardrail?, message? }`,
kde `results` je pole záznamov `GuardrailExecutionResult`, ktoré obsahujú
polia `blocked`, `skipped`, `modified`, `error` a `meta` pre každý ochranný mechanizmus,
čo je užitočné pri trasovaní.

### Vypnutie ochranných mechanizmov pre jednotlivé požiadavky

`resolveDisabledGuardrails({ apiKeyInfo, body, headers })` zhromažďuje
deduplikovaný zoznam názvov ochranných mechanizmov, ktoré sa majú pre aktuálnu
požiadavku preskočiť. Zdroje (všetky sú voliteľné a zlúčia sa):

- `apiKeyInfo.disabledGuardrails`
- `disabledGuardrails` v tele požiadavky (na najvyššej úrovni)
- `metadata.disabledGuardrails` v tele požiadavky
- Hlavička `x-omniroute-disabled-guardrails` (alebo staršia
  `x-disabled-guardrails`)

Hodnoty môžu byť polia reťazcov alebo reťazec oddelený čiarkami; názvy sa
normalizujú na malé písmená vo formáte kebab-case (`pii_masker` → `pii-masker`). Výsledok
sa prostredníctvom `context.disabledGuardrails` odovzdá registru, ktorý preskočí
zodpovedajúce ochranné mechanizmy (`skipped: true` v `results`).

## Poradie vykonávania

Pre každú požiadavku prechádzajúcu cez `src/sse/handlers/chat.ts` a
`open-sse/handlers/chatCore.ts`:

1. `resolveDisabledGuardrails(...)` zostaví zoznam vynechaných ochranných mechanizmov z kľúča API, tela požiadavky
   a hlavičiek.
2. `guardrailRegistry.runPreCallHooks(body, ctx)` spustí ochranné mechanizmy vo vzostupnom
   poradí priority:
   - Zakázané ochranné mechanizmy sa zaznamenajú ako `skipped`.
   - Metóda `preCall` každého ochranného mechanizmu môže prepísať dátový obsah prostredníctvom `modifiedPayload`.
   - Prvý výskyt `block: true` ukončí reťazec a obslužná rutina vráti
     odpoveď o odmietnutí ochranným mechanizmom.
3. (Potenciálne prepísaný) dátový obsah pokračuje do kombinovaného smerovania a následného
   odoslania nadradenému systému.
4. Po zostavení odpovede spustí `guardrailRegistry.runPostCallHooks(...)`
   rovnaký reťazec nad odpoveďou. Hodnota `block: true` v tomto bode zahodí odpoveď
   nadradeného systému.

Ochranné mechanizmy, ktoré vyvolajú výnimku, sa zaznamenajú s `error: <message>` a zapíšu do protokolu
prostredníctvom `logger.warn`, ale reťazec pokračuje — zámerne využíva princíp fail-open.

## Konfigurácia

Premenné prostredia čítané vstavanými ochrannými mechanizmami:

| Premenná                              | Používa ju                          | Účinok                                                                                                                                |
| ------------------------------------- | ----------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------- |
| `INPUT_SANITIZER_ENABLED`             | `prompt-injection`                  | Nastavením na `false` sa detekcia úplne zakáže.                                                                                       |
| `INPUT_SANITIZER_MODE`                | `prompt-injection`                  | Pravidlá pre injektáž: `warn`, `block` alebo `log`. Staršia hodnota `redact` text injektáže neprepisuje.                              |
| `INJECTION_GUARD_MODE`                | `prompt-injection`                  | Režim ochrany proti injektáži; zároveň ide o príznak funkcie v databáze, ktorý **má prednosť** pred premennými prostredia (DB > ENV). |
| `INPUT_SANITIZER_BLOCK_THRESHOLD`     | `prompt-injection`                  | Minimálna závažnosť, ktorú režim `MODE=block` odmietne: `high` (predvolené), `medium` alebo `low`.                                    |
| `INJECTION_GUARD_BLOCK_THRESHOLD`     | `prompt-injection`                  | Starší alias pre `INPUT_SANITIZER_BLOCK_THRESHOLD`.                                                                                   |
| `PII_REDACTION_ENABLED`               | `pii-masker`                        | Ak je nastavená na `true`, osobné údaje v požiadavke sa redigujú (nezávisle od režimu injektáže).                                     |
| `PII_RESPONSE_SANITIZATION` / `_MODE` | `pii-masker` (následné spracovanie) | Ovláda správanie maskovania na strane odpovede.                                                                                       |

Ochranné mechanizmy Modality Bridge čítajú konfiguráciu za behu z úložiska nastavení
založeného na databáze (`getSettings()`), nie z premenných prostredia. Primárne kľúče pre Vision sú
`modalityBridgeVisionEnabled`, `modalityBridgeVisionMode`,
`modalityBridgeVisionModel`, `modalityBridgeVisionTaskAware`,
`modalityBridgeVisionPrompt`, `modalityBridgeVisionTimeout`,
`modalityBridgeVisionMaxImages`, `modalityBridgeVisionMaxChars`,
`modalityBridgeCacheEnabled`, `modalityBridgeCacheTtlMinutes` a
`modalityBridgeCacheMaxEntries`. Staršie kľúče
`visionBridge*` sa akceptujú iba ako zdokumentované záložné hodnoty na čítanie počas jedného cyklu;
zápisy z ovládacieho panela používajú primárne kľúče. Predvolené hodnoty a záložný
resolver sa nachádzajú v `src/shared/constants/modalityBridgeDefaults.ts`, pričom staršie
konštanty zostávajú zachované v `src/shared/constants/visionBridgeDefaults.ts`.

Audio používa `modalityBridgeAudioEnabled`, `modalityBridgeAudioModel`,
`modalityBridgeAudioTimeout` a `modalityBridgeAudioMaxClips` spolu so zdieľanými
nastaveniami `modalityBridgeCache*`. Audio nemá záložný mechanizmus pre staršie kľúče, pretože tieto
kľúče boli zavedené spolu so schémou Modality Bridge.

Video používa `modalityBridgeVideoEnabled`, `modalityBridgeVideoAnalysisMode`,
`modalityBridgeVideoModel`,
`modalityBridgeVideoFrameCount`, `modalityBridgeVideoSamplingPolicy`,
`modalityBridgeVideoMaxVideos` a
`modalityBridgeVideoTimeout` spolu so zdieľanými nastaveniami `modalityBridgeCache*`.
V predvolenom nastavení je zakázané, pretože FFmpeg/ffprobe sú voliteľné prevádzkové
závislosti a opis snímok zvyšuje latenciu a náklady na model.

## Vlastné ochranné mechanizmy

```typescript
import { BaseGuardrail, guardrailRegistry } from "@/lib/guardrails";

class BudgetGuardrail extends BaseGuardrail {
  constructor() {
    super("budget", { priority: 50 });
  }

  async preCall(payload, ctx) {
    if (ctx.apiKeyInfo?.budgetExceeded) {
      return { block: true, message: "Denný rozpočet bol prekročený" };
    }
    return { block: false };
  }
}

guardrailRegistry.register(new BudgetGuardrail());
```

Postup:

1. Vytvorte `src/lib/guardrails/myGuardrail.ts`, ktorý rozširuje `BaseGuardrail`.
2. Implementujte `preCall` a/alebo `postCall`.
3. Buď ho zaregistrujte pri importe (pridaním z `registerDefaultGuardrails`), alebo
   zavolajte `guardrailRegistry.register(...)` za behu — register nahradí
   každý predchádzajúci ochranný mechanizmus s rovnakým normalizovaným názvom.
4. Pridajte testy do `tests/unit/` (existujúce príklady:
   `tests/unit/guardrails-registry.test.ts`,
   `tests/unit/prompt-injection-guard.test.ts`,
   `tests/unit/guardrails/visionBridge.test.ts`).

## Testovanie

Medzi testami používajte `resetGuardrailsForTests()`, aby ste začali zo známeho stavu.
Ak chcete začať s prázdnym registrom a zaregistrovať iba testované ochranné mechanizmy,
odovzdajte `{ registerDefaults: false }`. Vision Bridge podporuje vkladanie závislostí
(`deps.getSettings`, `deps.callVisionModel`); Audio Bridge poskytuje ekvivalentné
body napojenia pre nastavenia, schopnosti, výber modelu STT, kontroly prihlasovacích
údajov a transkripciu. Testy tak môžu overiť oba toky bez prístupu k databáze
alebo sieti.

## Pozrite tiež

- `src/lib/guardrails/` — implementácia
- `src/shared/utils/inputSanitizer.ts` — zdieľaný detektor, ktorý zabezpečuje
  detekciu injektovania promptov a maskovanie osobných údajov
- `src/shared/constants/visionBridgeDefaults.ts` — predvolené nastavenia Vision Bridge a
  zoznam modelov s vynúteným premostením
- `src/shared/constants/modalityBridgeDefaults.ts` — zdieľané predvolené nastavenia behu pre Vision/Audio
- `docs/architecture/RESILIENCE_GUIDE.md` — ortogonálna vrstva (istič, doby čakania)
- `docs/reference/ENVIRONMENT.md` — úplný prehľad premenných prostredia

## Pokrytie trás ochranou pred injektovaním a red-team testovanie (Fáza 8 · Blok D)

Ochrana pred injektovaním (`createInjectionGuard` / `withInjectionGuard`) pokrýva všetky trasy,
ktoré prijímajú používateľské prompty. Rešpektuje `INJECTION_GUARD_MODE` (predvolená hodnota `warn` = iba zaznamenať;
`block` = vráti HTTP 400 `SECURITY_001`).

| Typ               | Trasy                                                                                                                                                | Predvolený režim |
| ----------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------- |
| Text (existujúce) | `/v1/chat/completions`, `/v1/completions`, `/v1/relay/chat/completions`                                                                              | warn             |
| Generatívne       | `/v1/messages`, `/v1/responses`, `/v1/images/generations`, `/v1/images/edits`, `/v1/videos/generations`, `/v1/music/generations`, `/v1/audio/speech` | warn             |
| Dáta              | `/v1/embeddings`, `/v1/rerank`, `/v1/search`, `/v1/moderations`                                                                                      | warn             |

Extrakcia textu (`extractMessageContents`) pokrýva `messages`/`input`/`prompt`/`query`+`documents`/`instructions`/`system`.

**Red-team testovanie (každú noc, `nightly-llm-security.yml`):** promptfoo overuje, že každá trasa blokuje
korpus OWASP-LLM v režime `INJECTION_GUARD_MODE=block`; garak spúšťa sondy (bez tajného kľúča sa preskočí).
Trasa `moderations` je zahrnutá kvôli konzistentnosti — prevádzkovatelia ju môžu v režime blokovania vyňať
prostredníctvom `resolveDisabledGuardrails`.

Nočný pracovný postup (`.github/workflows/nightly-llm-security.yml`, cron + manuálne
spustenie) obsahuje dve úlohy:

- **`promptfoo-guard` (blokujúca)** — spúšťa `promptfoo eval -c promptfooconfig.yaml`
  s `INJECTION_GUARD_MODE=block`. Každý nepriateľský prípad (napr. „ignoruj všetky
  predchádzajúce pokyny…“, prelomenia obmedzení v štýle DAN) overuje, že odpoveď obsahuje
  `error.code === "SECURITY_001"`, t. j. ochrana požiadavku skutočne odmietla.
- **`garak` (poradná)** — spúšťa garak s `--probes promptinject,dan,leakreplay`
  voči lokálnej inštancii OmniRoute (`http://localhost:20128/v1`). Je podmienená dostupnosťou
  tajného kľúča poskytovateľa (`PROMPTFOO_PROVIDER_KEY`); ak nie je dostupný, úloha sa korektne
  preskočí a je zakončená `|| true`, takže iba hlási výsledky bez zlyhania CI.

Pokrytie pomocnej ochrany (`createInjectionGuard` / `withInjectionGuard`)
zahŕňa každú trasu `/v1`, ktorá prijíma prompt; text promptu sa získava z
`messages`/`input`/`prompt`/`query`+`documents`/`instructions`/`system` pomocou
`extractMessageContents()` v `src/shared/utils/inputSanitizer.ts`.
