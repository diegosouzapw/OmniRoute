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

## Vstavané guardraily

Register pri importe automaticky načíta šesť guardrailov v poradí podľa priority
(pozrite `registry.ts` → `registerDefaultGuardrails()`):

| Priorita | Názov               | Fáza/fázy      | Súbor                 |
| -------- | ------------------- | -------------- | --------------------- |
| `5`      | `vision-bridge`     | `preCall`      | `visionBridge.ts`     |
| `6`      | `audio-bridge`      | `preCall`      | `audioBridge.ts`      |
| `7`      | `video-bridge`      | `preCall`      | `videoBridge.ts`      |
| `10`     | `pii-masker`        | `pre` + `post` | `piiMasker.ts`        |
| `20`     | `prompt-injection`  | `preCall`      | `promptInjection.ts`  |
| `95`     | `credential-masker` | `pre` + `post` | `credentialMasker.ts` |

Nižšie čísla priority sa vykonávajú **ako prvé**.

### Vision Bridge (`visionBridge.ts`) — Modality Bridge PR-1

Zachytáva požiadavky obsahujúce obrázky, ktoré smerujú na **modely bez podpory
obrazu**, a buď presmeruje celú požiadavku na model podporujúci obraz, alebo
pred volaním nadradeného poskytovateľa nahradí časti s obrázkami textovými
opismi vytvorenými konfigurovateľným modelom na spracovanie obrazu. Vďaka tomu
môžu poskytovatelia podporujúci iba text transparentne spracúvať multimodálne
dátové časti.

Postup:

1. Preskočí spracovanie, ak cieľový model už podporuje obraz (pokiaľ sa
   nenachádza v zozname modelov s vynúteným premostením
   `isVisionBridgeForcedModel`).
2. Extrahuje časti s obrázkami pomocou `extractImageParts(messages)`
   (`visionBridgeHelpers.ts`), ktorá deleguje na **zjednotený detektor médií**
   `detectMediaParts()` v `open-sse/utils/mediaParts.ts` — jediný zdroj pravdy
   zdieľaný s filtrom kompatibility kombinácií. Extrakcia je obmedzená zoznamom
   povolených častí najvyššej úrovne s tvarmi, ktoré môže `replaceImageParts`
   vložiť späť (kontrakt extrakcia↔nahradenie): OpenAI `image_url`, Anthropic
   base64 `source.type:"base64"`, Anthropic URL `source.type:"url"` a Responses
   API `input_image`. Vnorené nálezy a tvary obsahujúce iba indikátor sú
   určené pre filter kombinácií a nikdy sa neextrahujú. Ak sa žiadne nenájdu,
   spracovanie sa preskočí.
3. Určí konfiguráciu počas behu pomocou
   `resolveVisionBridgeRuntimeSettings()`
   (`src/shared/constants/modalityBridgeDefaults.ts`): nové kľúče nastavení
   `modalityBridge*` majú prednosť; staršie kľúče `visionBridge*` zostávajú
   **záložnou možnosťou počas jedného cyklu** (okno na návrat k predchádzajúcej
   verzii). Keď je premostenie vypnuté, spracovanie sa preskočí ešte pred
   akýmkoľvek prechádzaním médií.
4. Selektor režimu (`modalityBridgeVisionMode`, pozrite tabuľku nižšie)
   rozhoduje medzi presmerovaním a opisom. Presmerovanie vráti
   `modifiedPayload`, v ktorom je zmenený iba `model`, spolu s metaúdajmi
   `{ rerouted, fromModel, toModel, imagesKept }`.
5. Cesta opisu: obmedzí počet obrázkov na `maxImages`, zostaví prompt
   zohľadňujúci úlohu, skontroluje vyrovnávaciu pamäť opisov, zavolá model na
   spracovanie obrazu **paralelne** (`Promise.allSettled`) a namiesto obrázkov
   vloží textové časti `[Image N]: <description>`. Neúspešný opis poskytne
   `null` a pôvodná časť s obrázkom sa **zachová** (#4012) — s výnimkou cesty
   opisu pre kombináciu, keď zlyhali všetky opisy; v takom prípade dostane
   potvrdený nadradený poskytovateľ bez podpory obrazu namiesto obrázka zástupný
   text `(unavailable — no vision-capable provider connected)` (#8430).
6. Vráti `modifiedPayload` + metaúdaje (`imagesProcessed`, `descriptions`,
   `processingTimeMs`, `visionModel`).

#### Selektor režimu (`modalityBridgeVisionMode`)

| Režim      | Predvolený | Správanie                                                                                                                                                                                                                                                                                                                                         |
| ---------- | ---------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `auto`     | ✔          | Pôvodná heuristika bez zmien (#6640/#7204): modely, ktoré nie sú kombinované, a modely `auto/` sa presmerujú na najlepší model podporujúci obraz, pokiaľ pôvodný model už nemá použiteľné prihlasovacie údaje (vtedy sa vytvorí opis); kombinované ciele vždy vytvárajú opis.                                                                     |
| `describe` |            | Vždy vytvorí opis — blok presmerovania sa úplne preskočí; vždy odpovedá model zvolený používateľom.                                                                                                                                                                                                                                               |
| `reroute`  |            | Vynútené presmerovanie: kontrola zachovania modelu s prihlasovacími údajmi sa obíde. Kontrola prihlasovacích údajov **cieľa** presmerovania sa naďalej uplatňuje — ak neexistuje použiteľný cieľ podporujúci obraz, požiadavka prejde na vytvorenie opisu, aby sa nespracované obrázky nikdy nedostali k backendu podporujúcemu iba text (#8430). |

Vynútené režimy ukončia rozhodovanie **pred** spustením automatickej
heuristiky; správanie režimu `auto` je bajtovo identické s guardrailom spred
PR-1.

#### Prompt opisu zohľadňujúci úlohu (`modalityBridgeVisionTaskAware`)

Predvolene **true**. `composeVisionPrompt()` (`visionBridgeHelpers.ts`) pridá
k základnému promptu na opis text **poslednej správy používateľa** (skrátený na
500 znakov), čím nasmeruje opis na to, na čo sa používateľ skutočne pýtal
(vzor codex-vision-proxy), a požiada model na spracovanie obrazu, aby prepísal
viditeľný text. Keď je príznak vypnutý — alebo nie je k dispozícii žiadny text
používateľa — základný prompt sa použije bez zmien.

Vlastná slučka describe s požiadavkou kompatibilnou s OpenAI (`callVisionModelSingle()`
v `visionBridgeHelpers.ts`) vždy požaduje `image_url.detail: "high"` —
bezpodmienečne, pre každého volajúceho/poskytovateľa, bez závislosti od
akéhokoľvek signálu klienta. Vzorkovanie s nízkou úrovňou detailov znižuje
presnosť OCR práve pri úlohe prepisu textu, ktorú táto výzva požaduje, preto
samotné volanie describe vždy požaduje vysokú úroveň detailov bez ohľadu na to,
akú úroveň detailov používala pôvodná prichádzajúca požiadavka. Ovplyvňuje to
iba interné telo požiadavky describe; nemení to spôsob, akým OmniRoute odovzdáva
vlastnú hodnotu `image_url.detail` volajúceho v primárnej požiadavke — táto
predvolená hodnota sa aplikuje samostatne a iba pre rozpoznaných klientov
OpenCode vo funkcii `defaultImageDetail()`
(`open-sse/handlers/chatCore/upstreamBody.ts`). Vetva vlastnej slučky describe
s prenosovým formátom Anthropic nemá pole `detail` a žiadna z týchto
predvolených hodnôt ju neovplyvňuje.

#### Limit výstupu describe (`modalityBridgeVisionMaxChars`)

| Kľúč                           | Predvolená hodnota | Rozsah              |
| ------------------------------ | ------------------ | ------------------- |
| `modalityBridgeVisionMaxChars` | `0`                | `0` alebo 100–50000 |

`0` (predvolená hodnota) znamená **bez limitu** — opis vrátený funkciou
`callVisionModel()` sa odovzdá bez úprav, čím sa zachová existujúce správanie.
Akákoľvek hodnota v rozsahu 100–50000 skráti opis s príponou `…` predtým, ako
sa vloží späť vo forme `[Image N]: <description>`
(`VisionBridgeGuardrail.preCall()` v `src/lib/guardrails/visionBridge.ts`).
Túto hodnotu zvýšte pri úlohách OCR náročných na detaily, pri ktorých následný
model potrebuje úplný prepis; znížte ju, ak chcete obmedziť spotrebu tokenov
pri príliš výrečných modeloch spracovania obrazu. Pole na riadiacom paneli sa
nachádza na karte Vision v paneli Advanced
(`modality-bridge-max-chars` v `ModalityBridgeVisionTab.tsx`) a každú hodnotu
od 1 do 99 upraví nahor na minimálnu hodnotu 100, pričom explicitnú hodnotu
`0` ponechá nedotknutú — `0` je samostatne platnou hodnotou Zod
(`z.union([z.literal(0), z.number().int().min(100).max(50000)])`), nielen
predvolenou hodnotou „nenastavené“.

#### Vyrovnávacia pamäť describe (`modalityBridge/bridgeCache.ts`)

Procesovo zdieľaná vyrovnávacia pamäť LRU + TTL v pamäti pre výstupy describe.
Kľúč = `sha256(imageRef + composedPrompt + configuredBridgeModel)` s rámcovaním
pomocou prefixov dĺžky (bez kolízií na hraniciach polí). Komponent modelu je
**nakonfigurovaný** premosťovací model, nie model, ktorý skutočne odpovedal —
`callVisionModel` môže interne použiť záložný model a vytváranie kľúčov pre
jednotlivé pokusy by fragmentovalo vyrovnávaciu pamäť. Neúspešné volania
describe sa nikdy neukladajú do vyrovnávacej pamäte. Nastavenia:

| Kľúč                            | Predvolená hodnota | Rozsah  |
| ------------------------------- | ------------------ | ------- |
| `modalityBridgeCacheEnabled`    | `true`             | —       |
| `modalityBridgeCacheTtlMinutes` | `60`               | 1–1440  |
| `modalityBridgeCacheMaxEntries` | `200`              | 10–5000 |

#### Normalizácia vzdialených obrázkov (vlastné volanie describe/načítanie base64)

Keď most sám načítava **vzdialený** obrázok — pri vlastnom volaní describe
Anthropic aj pri konverzii base64 do prenosového formátu Claude
(`ensureBase64ImagesForClaudeWire`), v oboch prípadoch prostredníctvom
`fetchRemoteImageAsDataUri()` v `visionBridgeHelpers.ts` — výsledné dátové URI
sa pred vložením do požiadavky modelu spracovania obrazu odošle cez
`normalizeDataUri()` (`open-sse/utils/imageNormalize.ts`). Obrázky s nadmernou
veľkosťou sa zmenšia na **2048px na dlhšej strane** (v súlade s limitom zmeny
veľkosti, ktorý OpenAI/Anthropic už uplatňujú na strane servera), čím sa zníži
objem nahrávaných bajtov a latencia bez zmeny toho, čo model spracovania obrazu
vidí. Zmena veľkosti používa `sharp`, načítaný dynamickým importom: na platforme,
kde sa jeho natívny binárny súbor nepodarí načítať, funkcia
`normalizeDataUri()` **nikdy nevyvolá výnimku** — namiesto toho odovzdá pôvodné
bajty bez zmeny, takže cesta describe/konverzie base64 zostane vždy funkčná.
Bajty, ktoré nie sú obrázkom (načítanie, ktoré nevrátilo dekódovateľný obrázok),
sa tiež odovzdajú bez zmeny. Táto normalizácia sa obmedzuje na obrázky, ktoré
most načíta pre svoje vlastné volanie — nikdy sa nepoužije na nespracovaný
prechodový obsah volajúceho, v súlade s princípom zmien iba po výslovnom
povolení (Pevné pravidlo č. 20).

#### Schéma nastavení + migrácia

Nové kľúče `modalityBridge*` sa overujú pomocou Zod v
`updateSettingsSchema` (`src/shared/validation/settingsSchemas.ts`):
`modalityBridgeVisionEnabled`, `modalityBridgeVisionMode`,
`modalityBridgeVisionModel`, `modalityBridgeVisionTaskAware`,
`modalityBridgeVisionPrompt`, `modalityBridgeVisionTimeout`,
`modalityBridgeVisionMaxImages`, `modalityBridgeVisionMaxChars`, trojica
`modalityBridgeCache*` a skupina `modalityBridgeAudio*`, ktorú používa Audio
Bridge. Migrácia `141_modality_bridge_settings.sql` kopíruje existujúce staršie
hodnoty `visionBridge*` do zodpovedajúcich nových kľúčov (idempotentne, nikdy
neprepíše hodnotu `modalityBridge*` nastavenú operátorom); staršie kľúče zostanú
počas jedného cyklu vydania akceptované ako záložný zdroj pri čítaní.

#### Hlavička transparentnosti + štatistiky

Odpovede transformované pomocou describe obsahujú
`x-omniroute-modality-bridge: image->text;model=<visionModel>;parts=<n>`
(vytvorené funkciou `buildModalityBridgeHeader()` v
`modalityBridge/bridgeStats.ts`, pridané funkciou
`withModalityBridgeHeader()` v `src/sse/handlers/chatHelpers.ts`).
Presmerované požiadavky nedostanú **žiadnu** hlavičku — obsah zostal nezmenený
a zmena modelu je už viditeľná v poli `model` v tele odpovede.

`GET /api/modality-bridge/stats` (správcovská autentifikácia, rovnaká úroveň
ako pri `GET /api/settings`) vracia počítadlá jednotlivých modalít uložené
v pamäti `{ attempts, successes, bridged, cacheHits, failures, totalLatencyMs,
latencySamples, averageLatencyMs, lastUsedAt }` pre `vision`, `audio` a
`video`. `averageLatencyMs` používa ako menovateľ `latencySamples`, nie všetky
pokusy; operácia bez merania času nevytvára umelú vzorku s nulovým počtom
milisekúnd. `bridged` zostáva spätne kompatibilným aliasom pre úspešné
konverzie; neúspešné pokusy ho nezvyšujú.
Počítadlá sa zámerne vynulujú pri reštarte procesu
(telemetria, nie účtovníctvo).

#### Konfigurácia riadiaceho panela

Vyhradená stránka ovládacieho panela je
`/dashboard/settings/modality-bridge`. Jej karty `Vision`, `Audio`
a `Video`, na ktoré možno odkazovať pomocou URL, pri prepínaní hodnoty `tab`
zachovávajú parametre dopytu. Karta Vision sprístupňuje zapnutie, režim, výber
modelu (vrátane automatického predvoleného modelu), výzvy zohľadňujúce úlohu,
pokročilé limity časového limitu/obrázkov/dĺžky opisu/vyrovnávacej pamäte,
počítadlá behu a chránenú vzorovú požiadavku. Karta Audio je takisto aktívna:
sprístupňuje zapnutie, výber modelu len pre STT s možnosťou Auto, limity časového
limitu/maximálnej dĺžky klipu, počítadlá zvuku a vzorový test `input_audio`.
Karta Video je funkčná: hlási stav behu FFmpeg/ffprobe — jeden zo štyroch
explicitných stavov používateľského rozhrania (`unknown`, kým prebieha kontrola
alebo ju nebolo možné dokončiť, `restricted` pri hostiteľovi ovládacieho panela,
ktorý nie je loopback, keď sa kontrola preskočí na strane klienta, `unavailable`
po vykonaní kontroly a potvrdení nedostupnosti alebo `available` s verziami
FFmpeg/ffprobe) — ukladá limity zapnutia/modelu/snímok/videa/časového limitu,
filtruje výber modelov na modely podporujúce obrazové vstupy a sprístupňuje
počítadlá videa.

Pôvodná karta Vision Bridge v nastaveniach AI je odkazom na novú stránku kvôli
kompatibilite; už neobsahuje druhú kópiu formulára. Media Providers tiež
prepája pracovné postupy Image-to-Text a Speech-to-Text s príslušnými kartami
Modality Bridge bez odstránenia existujúceho testovacieho prostredia
Speech-to-Text.

**Obídenie prijímania pri slučke na seba:** keď sa volanie opisu smeruje cez
vlastnú slučku `/v1` služby OmniRoute (neštandardný model poskytovateľa),
podpožiadavka odošle `x-omniroute-admission-bypass: internal` a autentifikuje sa
pomocou rozpoznaného poverenia slučky na seba — lokálneho zástupného reťazca
`sk_omniroute` v lokálnom režime alebo kľúča prostredia `OMNIROUTE_API_KEY` /
`ROUTER_API_KEY` nakonfigurovaného prevádzkovateľom (#1350), takže nasadenia s
`REQUIRE_API_KEY=true` môžu stále vykonať volanie opisu. Obídenie sa akceptuje
iba pre tieto presné poverenia, takže externí klienti nemôžu pomocou hlavičky
preskočiť prijímanie.

Staršie predvolené hodnoty sa nachádzajú v
`src/shared/constants/visionBridgeDefaults.ts`; nové predvolené hodnoty
režimu/zohľadnenia úlohy/vyrovnávacej pamäte a resolver nastavení sa nachádzajú
v `src/shared/constants/modalityBridgeDefaults.ts`. Ochranný mechanizmus
sprístupňuje možnosť konštruktora `deps`, aby testy mohli vložiť falošné
implementácie `getSettings` a `callVisionModel`.

### Audio Bridge (`audioBridge.ts`) — Modality Bridge PR-3

Zachytáva chatové požiadavky obsahujúce zvuk predtým, než sa dostanú k cieľu,
o ktorom nie je známe, že prijíma zvukový vstup. Chatovú požiadavku nikdy
nepresmeruje: zvukové časti sa prepisujú prostredníctvom existujúceho
viacdielneho koncového bodu kompatibilného s OpenAI a zvolený chatový model
pokračuje s textovými prepismi.

Postup:

1. Rozpoznajte `supportsAudio` prostredníctvom
   `getResolvedModelCapabilities()`. Prednosť majú explicitné metadáta registra
   poskytovateľov, potom statické metadáta modelu a následne synchronizované
   `modalities_input`. Deklarovaný zoznam vstupov bez `audio` má hodnotu `false`;
   ak neexistujú žiadne dôkazy o schopnostiach, zostáva hodnota `null`. Hodnoty
   `false` aj `null` aktivujú konzervatívny most, zatiaľ čo hodnota `true` ho
   obchádza.
2. Rozpoznajte nastavenia `modalityBridgeAudio*` a zo všetkých správ extrahujte
   nahraditeľné zvukové časti najvyššej úrovne pomocou zdieľaného detektora
   `detectMediaParts()`. Podporované prenosové formáty sú OpenAI `input_audio`,
   `audio_url` a `source.media_type: "audio/*"`. Vnorený zvuk sa deteguje na
   účely smerovania, ale cesta nahradenia ho neodstráni. Množstvo práce je
   obmedzené hodnotou `modalityBridgeAudioMaxClips`; neskoršie časti zostávajú
   nedotknuté.
3. Rešpektujte nakonfigurovanú hodnotu `provider/model` alebo nechajte
   `selectAudioBridgeModel()` prejsť `AUDIO_TRANSCRIPTION_PROVIDERS` v stabilnom
   poradí katalógu a vybrať prvý model s použiteľným aktívnym poverením
   poskytovateľa.
4. `callAudioTranscription()` konvertuje zvuk vo formáte base64/data-URI na
   viacdielny `file` alebo stiahne vzdialenú adresu `audio_url` cez ochranu
   odchádzajúcich spojení povoľujúcu len verejné adresy, s pripnutím DNS
   a limitom 25 MB. Následne pomocou metódy POST odošle súbor a vybraný model do
   lokálnej slučky na seba `/v1/audio/transcriptions`, autentifikovanej pomocou
   `resolveSelfLoopBearer()`. Existujúca trasa prepisu vykoná bežné vyhľadanie
   poverení, spracovanie času na zotavenie/obmedzenia rýchlosti a odoslanie
   poskytovateľovi.
5. Úspešné volania nahradia príslušné časti hodnotou
   `[Audio N]: <transcript>`. Volania sa spúšťajú pomocou `Promise.allSettled`:
   individuálne zlyhanie zachová pôvodnú zvukovú časť (zmluva #4012). Ak zlyhajú
   všetky volania a je dokázané, že cieľ má `supportsAudio === false`, časti sa
   zmenia na `[Audio N]: (unavailable — no STT provider connected)` (zmluva
   #8430). Pri neznámom cieli (`null`) zostane výsledok po zlyhaní všetkých
   volaní nedotknutý. Cieľ, pri ktorom je dokázané, že podporuje iba text,
   a ktorý nemá použiteľné poverenie STT, dostane rovnakú explicitnú zástupnú
   hodnotu bez vykonania sieťového volania.

Úspešné prepisy používajú vyrovnávaciu pamäť LRU/TTL Modality Bridge spoločnú
pre celý proces. Kľúč kombinuje odkaz na zvuk, stabilné označenie operácie
`audio-transcription` a vybraný model STT; zlyhania sa nikdy neukladajú do
vyrovnávacej pamäte. Pokusy o spracovanie zvuku aktualizujú zdieľané počítadlá
`bridged`, `cacheHits`, `failures` a `lastUsedAt`. Transformované odpovede
obsahujú
`x-omniroute-modality-bridge: audio->text;model=<sttModel>;parts=<n>`;
nedotknuté požiadavky nedostanú segment Audio Bridge.

Nastavenia behu sa ukladajú v databáze a validujú pomocou Zod:

| Kľúč                          | Predvolená hodnota | Rozsah            |
| ----------------------------- | ------------------ | ----------------- |
| `modalityBridgeAudioEnabled`  | `true`             | —                 |
| `modalityBridgeAudioModel`    | `""`               | Auto alebo STT ID |
| `modalityBridgeAudioTimeout`  | `60000`            | 1000–300000       |
| `modalityBridgeAudioMaxClips` | `3`                | 1–10              |

Zdieľaná vyrovnávacia pamäť je naďalej riadená nastaveniami
`modalityBridgeCacheEnabled`, `modalityBridgeCacheTtlMinutes` a
`modalityBridgeCacheMaxEntries`.

### Video Bridge (`videoBridge.ts`, `videoBridgePipeline.ts`)

Zachytáva časti videa najvyššej úrovne v `messages` rozhrania Chat Completions a v
`input` rozhrania Responses API pred volaním cieľa bez známej natívnej podpory
videa. Podporované formáty sú `input_video`, `video_url`, `video_source`, URL
adresy HTTPS a dátové URI `data:video/*;base64,...`. Samotné názvy súborov v
texte sa nepovažujú za video.

`VideoBridgeGuardrail.preCall` (`videoBridge.ts`) zabezpečuje prechádzanie
požiadavky, kontrolu schopností a zásad, agregáciu v rámci požiadavky a dátový
obsah odpovede. Spracovanie jednotlivých videí — získanie, vyrovnávacia pamäť
celého výsledku, opis sekvencie snímok (ktorý zlučuje akýkoľvek prepis zvuku
deklarovaný volajúcim) a metriky, prerušenie a čistenie pri jednotlivých
pokusoch — je skryté za `processVideoPart` v `videoBridgePipeline.ts`, ktoré sa
volá raz pre každú časť videa v slučke `preCall`. Tento modul tiež definuje
explicitné hranice portov `VideoMediaBrokerPort` (získavanie bajtov a extrakcia
vzorkovaných snímok), `VideoAudioTranscriptionPort` (zlúčenie prepisu zvuku
deklarovaného volajúcim s popismi vzorkovaných snímok) a `VideoDrilldownPort`
(hranica perzistencie detailného preskúmania snímok; zatiaľ nie je zapojená do
`processVideoPart` — záznamy detailného preskúmania dnes zapisuje iba samostatná
trasa `/api/modality-bridge/video/drilldown`).

Verejná cesta požiadaviek `/v1` nikdy neimportuje ani nespúšťa podproces.
Vzdialené videá sa sťahujú s limitom 50 MiB; vložené videá vo formáte base64
majú konzervatívny limit 36 MiB dekódovaných dát na jedno video, aby obálka
modelu, správ a rámcovania zostala v rámci verejného limitu 50 MiB pre prijatie
požiadavky JSON. Dĺžka vložených dát a odhady dekódovanej veľkosti sa kontrolujú
pred alokáciou. Protokol HTTPS sa vyžaduje pre počiatočnú vzdialenú URL adresu
aj pre každé presmerovanie, pričom sa používa existujúca ochrana odchádzajúcich
spojení iba na verejné adresy s pripnutím DNS. Bajty potom prechádzajú presnou
internou hranicou sprostredkovateľa `POST /api/modality-bridge/video/extract`.
Táto trasa je súčasne `LOCAL_ONLY` a `SPAWN_CAPABLE`, prijíma iba autentifikovanú
požiadavku v rámci procesu z dôveryhodného rozhrania spätnej slučky a nikdy
neprijíma URL adresu, cestu súborového systému, spustiteľný súbor ani zoznam
argumentov. Spracovateľský reťazec limitu veľkosti tela API a inkrementálny
čítač tela obslužnej rutiny nezávisle vynucujú limit 50 MiB pre vstup
sprostredkovateľa. Jeho obmedzený rad vykonáva naraz jednu extrakciu, povoľuje
štyri čakajúce úlohy a obmedzuje čakajúci vstup na 100 MiB.

Vo vnútri sprostredkovateľa číta `ffprobe` súkromný lokálny súbor; pevný zoznam
povolených formátov vylučuje formáty zoznamov skladieb a manifestov. Pre
povolené kontajnery rodiny MOV zostávajú externé dátové odkazy MOV predvolene
zakázané a pevný príkaz ich nepovoľuje. `ffprobe` aj `ffmpeg` používajú zoznam
povolených protokolov obmedzený iba na `file`, jedno vlákno, pevné polia
argumentov, žiadny shell a spustiteľné súbory vyhľadávané cez `PATH`. Prúdy
obrázkov obalu pripojených k súboru nie sú kandidátmi na prehrávanie. Všetky
prehrávateľné prúdy musia spĺňať limity a explicitný predvolený prúd má prednosť
pred deterministickou záložnou voľbou s najnižším indexom. Videá sú obmedzené
na 600 sekúnd, 8 192 pixelov na rozmer a 33 554 432 zdrojových pixelov. FFmpeg
vzorkuje 1 až 16 stredových snímok JPEG, zmenšuje dlhšiu hranu najviac na 1 024
pixelov bez zväčšovania menších vstupov a nikdy neprijíma URL adresu. Vzorkovanie
je predvolene `uniform`. Voliteľné zásady `scene_aware` a experimentálna
`segment_aware` vykonajú jeden dodatočný pevne určený priechod FFmpeg nad už
overeným lokálnym prúdom, vyberú obmedzené časové značky scén `showinfo` a pri
zlyhaní detektora, vypršaní časového limitu, chybnom výstupe alebo prázdnej
množine kandidátov sa deterministicky vrátia k rovnakým rovnomerným stredovým
bodom. Režim zohľadňujúci segmenty prideľuje vzorky stredových bodov pomerne
podľa overených intervalov scén; dôkazy a záložné správanie režimu
zohľadňujúceho segmenty sú podrobne opísané nižšie. Pevný limit 16 snímok sa
uplatňuje po výbere pri každej zásade. Keď má požiadavka zohľadňujúca scény
rozpočet iba na jednu snímku, použije rovnomerný stredový bod aktívneho okna
celého videa alebo okna zaostrenia a uvedie `policyEffective: uniform`: jediná
vybraná snímka scény nedokáže zachovať oba časové konce. Volajúci môže voliteľne
zadať konečné okno zaostrenia (`start`/`end` v sekundách); hranice sa obmedzia
na trvanie média, obrátené alebo nekonečné či neurčité okná sa odmietnu a všetky
zásady vzorkovania sa vykonávajú iba v rámci normalizovaného intervalu. Výsledné
okno je zahrnuté v metadátach vzorkovania aj v nedôveryhodnej predpone opisu,
aby následné modely dokázali rozlíšiť zameraný úryvok od celej časovej osi.

Sémantické zameranie popisov je samostatné explicitné nastavenie. Predvolený
režim analýzy `full` zachováva existujúcu výzvu pre snímky a nikdy nepreposiela
text požiadavky modelu popisov. V režime `focused` most číta iba najnovší
neprázdny používateľom vytvorený `text`/`input_text` z rovnakého kontajnera Chat
alebo Responses, normalizuje ho do NFC, zjednotí riadiace znaky a biele znaky a
obmedzí ho na 500 kódových bodov Unicode. Prázdny výsledok sa vráti k presnej
výzve režimu `full`. Použiteľná pomôcka sa serializuje ako JSON vo vyhradenom
bloku nedôveryhodného používateľského kontextu a môže iba uprednostniť
pozorovateľné podrobnosti; nemôže prepísať samostatné upozornenie, aby sa
nenasledovali pokyny viditeľné alebo počuteľné v médiu. Textové zameranie nikdy
neodvodzuje `start`/`end` ani nemení časový vzorkovač.

#### Štrukturálne dôkazy segmentov FU-07

`segment_aware` používa jeden obmedzený priechod predbežnej analýzy nad už
overeným lokálnym prúdom videa. Pevný reťazec filtrov najskôr zmenší šírku
najviac na 320 pixelov, zistí zmeny scén a zmrazené intervaly a potom vzorkuje
rýchlosťou 1 snímka za sekundu na určenie rozmazania, priemerného jasu a
priestorových/časových informácií. Priechod je obmedzený na 600 štrukturálnych
vzoriek, jedno vlákno FFmpeg/filtrov, rovnaké zoznamy povolených protokolov iba
pre `file` a povolených kontajnerov, limit 1 MiB na výstup procesu a najviac 30
sekúnd v rámci zdieľaného prerušenia/termínu sprostredkovateľa. Nikdy neprijíma
príkaz, filter, cestu ani URL adresu z požiadavky.

Štrukturálne hodnoty predstavujú deterministické dôkazy zo vzorkovania, nie sémantické porozumenie videu. Neodvodzujú objekty, činnosti, titulky, reč ani zámer používateľa. Hranice scén a zamrznutia vytvárajú segmenty; pokrytie zamrznutia, rozmazanie, expozícia, priestorové detaily a časové zmeny ovplyvňujú iba spôsob rozdelenia existujúceho rozpočtu 1–16 snímok. Úplne zamrznutý segment je obmedzený na jednu snímku, zatiaľ čo nezamrznuté segmenty súťažia o zostávajúci rozpočet. Keď je hraníc viac než snímok, zachováva sa rovnomerné pokrytie časovej osi, aby rýchle strihy na začiatku nemohli skryť dlhý koncový segment. Hranice scén v rámci 1-sekundového analytického rozlíšenia hranice zamrznutia sa zlúčia.

Chýbajúce filtre, nesprávne formátované alebo prázdne dôkazy, chyba detektora či časový limit ohraničenej predbežnej analýzy spôsobia bezpečný prechod na presnú politiku rovnomerných stredových bodov. Zrušenie zo strany volajúceho alebo uplynutie termínu sprostredkovateľa takýto prechod nespôsobí: ukončí prebiehajúci podproces, zabráni neskoršej extrakcii snímok a súkromný dočasný strom sa odstráni v bloku `finally`.

`scripts/perf/video-bridge-fu07-eval.ts` generuje deterministické skutočné testovacie vstupy FFmpeg na meranie úspory volaní titulkovania po deduplikácii, prideľovania rozpočtu pri intenzívnom pohybe, dôkazov rozmazania/expozície/SI-TI, rýchlych strihov s dlhým koncom a falošne pozitívnych výsledkov pri postupnom prelínaní. Zaznamenáva reálny čas predbežnej analýzy a tam, kde je k dispozícii `/usr/bin/time`, aj čas CPU podradeného procesu a maximálnu hodnotu RSS. Jeho kontroly kvality sú iba štrukturálne orákulá. Kvalita skutočného modelu titulkovania zostáva v stave `HOLD`, pretože tento testovací nástroj nemá autorizovaný koncový bod ani nemenného hodnotiteľa. Aj finančné úspory zostávajú v stave `HOLD`, pokiaľ `--caption-cost-per-call-usd` neposkytne explicitný kladný odhad ceny za jedno volanie; skript nikdy nevymýšľa ani jeden z týchto výsledkov.

Každá snímka je obmedzená na 4 MiB, všetky nespracované snímky spolu na 23 MiB a serializovaná odpoveď sprostredkovateľa na 32 MiB. Súkromný dočasný adresár sa odstráni v bloku `finally`. OmniRoute neobsahuje FFmpeg a neumožňuje zadať vlastnú cestu k spustiteľnému súboru. Pred titulkovaním most použije konzervatívnu vizuálnu deduplikáciu: každý súbor JPEG sa zmenší na 16×16 vyrovnávaciu pamäť v odtieňoch sivej a porovná sa iba s poslednou zachovanou snímkou. Pri požadovanom rozpočte titulkovania vyššom než jedna snímka poskytne extrakcia ohraničenú množinu kandidátov s veľkosťou najviac dvojnásobku daného rozpočtu, nikdy však viac než 16 snímok. Požadovaný limit sa uplatní až po deduplikácii, pričom pri rozpočte aspoň dvoch snímok sa počas konečného preriedenia zachová prvý aj posledný vybraný kandidát. Verziovaná politika `grayscale-16x16-mean-cells-v2` používa vyššiu hodnotu z priemernej zmeny jasu a pomeru buniek miniatúry, ktorých normalizovaná zmena je aspoň 0,05. Prah duplicity je konštanta 0,04, zvolená kvôli predvídateľnosti namiesto toho, aby bola dostupná ako nastavenie za behu. Tento sekundárny vysokokontrastný signál zachováva drobný pohyb a zmeny viditeľného textu, ktoré môže porovnanie založené iba na priemere skryť. Chyby komparátora alebo dekodéra spôsobia bezpečný prechod a zachovanie pokrytia. Výstupné metadáta rozlišujú extrahovaných kandidátov, úspešne použité snímky a odstránené vizuálne duplicity.

Explicitne označená časť videa môže požadovať kontaktný hárok s časovými značkami. Most vytvorí mriežku JPEG s najviac 4 stĺpcami a 16 snímkami. Každá 512-pixelová bunka vloží časovú značku zdroja do vysokokontrastného spodného pásu, pričom rovnaké časové značky zostávajú aj v textových metadátach na následné priradenie a audit. Celý súbor JPEG zostáva obmedzený na 32 MiB. Ak `sharp` nedokáže mriežku dekódovať alebo zostaviť, most použije jednotlivé snímky JPEG; zrušenie klientom sa aj naďalej prenesie cez operáciu s hárkom.

Dôkazy na povýšenie sú zámerne oddelené od syntetického mikrobenchmarku zostavovania. `scripts/perf/video-bridge-contact-sheet-eval.ts` definuje testovací nástroj A/B s verziovanou schémou pre skutočné modely videnia kompatibilné s OpenAI. Meria tokeny hlásené poskytovateľom, celkovú latenciu od začiatku do konca (vrátane zostavenia hárka), počet volaní modelu a zachovanie faktov definovaných manifestom. Nespracované odpovede modelu sa do správy nezapisujú; zachovávajú sa iba kontrolné súčty SHA-256 a ID zhodných faktov. Testovací nástroj nevykoná žiadne sieťové ani platené volanie modelu, pokiaľ nie je zadaný parameter `--execute-real` a nakonfigurované položky `--model`, `OMNIROUTE_BASE_URL` a `OMNIROUTE_API_KEY`. Bez takéhoto explicitného skutočného spustenia zostáva jeho strojovo čitateľný verdikt v stave `HOLD`; samotné syntetické merania dátových nákladov a počtu volaní nie sú dôkazom na povýšenie.

Volajúci môžu k podporovanej časti videa pripojiť voliteľné pole `transcript.cues`, ak už majú zarovnaný text. Každý prvok musí obsahovať `text`, konečný interval `start`/`end` v rámci zistenej dĺžky trvania a povolený `source` (`client`, `embedded` alebo `audio-bridge`); predvolená hodnota `confidence` je `1` a musí zostať medzi `0` a `1`. Presné duplicitné prvky sa zlúčia. OmniRoute nikdy nezačne prepis na základe týchto metadát: overené prvky sa skopírujú do opísaného výsledku spolu so zdrojom, mierou istoty a intervalom a zobrazia sa ako nedôveryhodné pozorovania vedľa titulkov snímok. Neplatný text, text mimo rozsahu alebo text bez informácie o pôvode sa odmietne namiesto toho, aby sa zmiešal s prúdom titulkov. Pole `source` v súčasnosti deklaruje volajúci a server ho neoveruje: OmniRoute vynucuje, aby hodnota bola jedným z troch povolených reťazcov, zatiaľ však kryptograficky nepotvrdzuje, že označenie `embedded` alebo `audio-bridge` skutočne pochádza z extrakcie vlastnenej serverom. Kým nebude takéto overovanie zavedené, považujte `source` za nedôveryhodnú pomôcku; nezakladajte na ňom rozhodnutia o autorizácii.

Pokročilý volajúci môže poskytnúť už autorizovanú stopu `audioTranscript`
pre to isté video. Zlučovacia vrstva spúšťa vizuálne a zvukové pozorovania s
jedným termínom a signálom prerušenia, zoraďuje ich na spoločnej časovej osi,
zlučuje presné duplikáty a hlási čiastočný výsledok, keď uspeje iba jedna strana.
Neplatný `audioTranscript` vedie k takémuto čiastočnému výsledku — vizuálny
opis sa zachová a zvuková vetva zaznamená sanitizovaný kód zlyhania —
namiesto zlyhania celého videa. Dostupnosť jednotlivých vetiev, príznak čiastočného
výsledku a sanitizované kódy zlyhania sa zachovávajú v opísanom výsledku, v
metadátach ochranných mechanizmov (`audioFusionRuns`/`audioFusionPartials`/
`audioFusionFailureCodes`), v metadátach vyrovnávacej pamäte výsledkov a v
počítadlách zlučovania mosta. Predvolená cesta Video Bridge nevyvoláva prevod
reči na text ani nesťahuje druhú kópiu média; bez tejto explicitnej stopy zostáva
obmedzená iba na video.

**Uchovávanie prepisov (#12150 P1).** Toto sa uplatňuje automaticky vždy, keď
Video Bridge (ktorý je sám voliteľný) vykreslí titulok prepisu — neexistuje
samostatný príznak uchovávania. Keď požiadavka vykreslí ľubovoľný titulok prepisu
(volajúcim deklarovaný `transcript` alebo zlúčený `audioTranscript`), ochranný
mechanizmus ho označí ako `videoBridgeObserved` a vytvorí redigovaný tieň opisu
videa — identické vykreslenie, v ktorom je voľný text každého titulku nahradený
reťazcom `[redacted-video-transcript]`, vytvorený nahradením poľa
štruktúrovaného titulku pred zostavením reťazca (nikdy nie analýzou zlúčeného
textu, takže nemôže prežiť žiadny obsah titulku — škodlivý ani bežný, vrátane
obsahu zahŕňajúceho `]`, napríklad `[inaudible]`/`[music]`). Telo požiadavky
uložené v protokole volaní nahradí každú textovú časť odvodenú od videa týmto
redigovaným tieňom, pričom zhoda sa určuje podľa totožnosti obsahu; ukotvenie
`fullText` sa znova načíta z dokončeného dátového obsahu ochranného mechanizmu
pred volaním, takže porovnanie zostane úspešné aj po tom, ako neskoršie reťazené
ochranné mechanizmy (maskovanie osobných údajov a prihlasovacích údajov s
prioritami 10/95) prepíšu text opisu na mieste, a po tom, ako vloženie systémovej
výzvy, odovzdania kontextu alebo pamäte zmení štruktúru poľa správ. Telo odoslané
upstream modelu zostáva nezmenené. Pozorovaná požiadavka tiež nevytvára žiadnu
trvalú Pamäť (extrakcia odvodená od požiadavky aj odpovede sa preskočí), takže
vlastná odpoveď modelu nemôže zopakovať text prepisu do Pamäte.

Naďalej otvorené oblasti uchovávania sledované v nadväzujúcej úlohe (**P2**,
#12430): nespracovaná snímka klientskej požiadavky pred ochrannými mechanizmami
v artefakte podrobného protokolu; pokračovanie `previous_response_id` s
uzavretím pri zlyhaní; interné odoslania odvodených výziev, ktoré vkladajú prepis
do syntetizovanej textovej výzvy (fázy pipeline, odovzdanie kontextu); a telo
odpovede/kópia v sémantickej vyrovnávacej pamäti odpovede modelu, ktorá cituje
prepis. Ide o nespracované oblasti, oblasti triedy odpovedí alebo voliteľné
oblasti mimo rozsahu P1, ktorý zahŕňa uložené telo požiadavky + Pamäť.

Životný cyklus interného koncového bodu
`/api/modality-bridge/video/drilldown` je samostatný substrát vyrovnávacej
pamäte autentifikovaný cez loopback/token. Každá operácia vyžaduje aj kanonický
nepriehľadný identifikátor subjektu. Pred aktivovaním produkčného volajúceho musí
tento identifikátor odvodiť od autentifikovaného tenanta a nikdy nesmie
preposlať hodnotu zvolenú klientom. Kľúče vyrovnávacej pamäte viažu tento
subjekt na kanonické identifikátory relácie a referencie videa, ukladajú iba ich
kľúče odvodené pomocou SHA-256 a obmedzujú čítanie aj odstraňovanie na ten istý
subjekt. Vyrovnávacia pamäť uchováva najviac 16 odvodených snímok JPEG v jednej
položke, po desiatich minútach ich platnosť vyprší a podporuje obmedzené čítanie
pomocou `start`/`end` alebo explicitné odstránenie relácie.

Každý subjekt je obmedzený na 16 položiek a 64 MiB kanonických údajov JPEG. Tieto
limity sú nezávislé od globálneho stropu 64 položiek/256 MiB: pri tlaku na kvótu
subjektu sa pred zvážením globálneho vyradenia LRU vyradia iba najdlhšie
nepoužívané položky daného subjektu. Položky s uplynutou platnosťou sa pri
aktivite vyrovnávacej pamäte odstránia z účtovania subjektu aj globálneho
účtovania, zatiaľ čo zrušenie a zlyhanie overenia neuložia čiastočnú náhradu.

Vyrovnávacia pamäť odmieta nekanonický Base64, nadbytočné výplňové znaky, médiá
iné ako JPEG, poškodené alebo skrátené súbory JPEG a súbory JPEG, ktoré počas
obmedzeného dekódovania celého obrázka pomocou `sharp` vyvolajú varovanie. Každý
prijatý obrázok znova zakóduje ako kanonický JPEG, šírku a výšku odvodí z
dekódovaných bajtov namiesto dôvery v polia volajúceho a zahodí všetky koncové
polyglotné bajty namiesto ich zachovania. Do oboch kvót sa započítava iba
obmedzený kanonický komprimovaný buffer. Limit prenosu JSON zahŕňa režijné dáta
Base64 pre strop dekódovaného vstupu 32 MiB. Každé uložené odvodenie zaznamenáva
svoj overený formát/rozlíšenie JPEG, politiku vzorkovania, verziu odvodenia, čas
vytvorenia, hash obsahu vypočítaný serverom a zahashovanú nadradenú referenciu
spolu s hashom nadradeného obsahu od dôveryhodného volajúceho. Zrušenie sa
kontroluje medzi asynchrónnymi fázami dekódovania/hašovania pred atómovým
uložením do vyrovnávacej pamäte.

Táto etapa zatiaľ nepripája ku koncovému bodu produkčného producenta a
neposkytuje výber variantu s viacerými rozlíšeniami. Transparentná cesta
požiadavky Video Bridge preto neprináša žiadnu dodatočnú prácu, zatiaľ čo
odvodenie subjektu viazané na tenanta a úplný životný cyklus FU-08 s viacerými
rozlíšeniami zostávajú explicitnou nadväzujúcou úlohou a nie sú dokumentované
ako dokončené správanie.

Snímky sú sekvenčne opisované pomocou nakonfigurovaného modelu Video. Prázdne
prepísanie nastavenia Video zdedí nastavenie Vision; ak sú obe prázdne,
automatický smerovač Vision vyberie efektívny model podporujúci obraz. Úspešné
opisy nahradia pôvodnú časť stabilným prefixom `[Video description:`, ktorý
zároveň označuje text ako nedôveryhodné pozorovanie odvodené z média a oznamuje
následným modelom, aby sa neriadili pokynmi nájdenými v médiu. Kľúče vyrovnávacej
pamäte opisov snímok zahŕňajú bajty JPEG, prompt, časovú značku a efektívny
model; do vyrovnávacej pamäte sa ukladajú iba úspešné opisy. Záznamy vyrovnávacej
pamäte uchovávajú skutočný úspešný producentský model vrátane záložného modelu;
most hlási `mixed`, keď boli rôzne snímky vytvorené rôznymi modelmi. Zásah do
vyrovnávacej pamäte opätovne použije túto identitu producenta namiesto toho, aby
ju premenoval podľa požadovaného plánu smerovania. Vyrovnávacia pamäť výsledku
celého videa používa kľúč založený na každom vstupe, ktorý mení výstup — prompte,
efektívnom modeli, politike vzorkovania, počte snímok, režime sémantickej analýzy,
odtlačku SHA-256 normalizovanej nápovedy zamerania, okne zamerania,
`transcript`, `audioTranscript` a príznaku kontaktného hárka — takže zmena
ktorejkoľvek z týchto dimenzií znamená minutie vyrovnávacej pamäte, nikdy nie
opätovné použitie zastaraného výsledku. Verzia politiky vizuálnej deduplikácie,
prahová hodnota a obmedzený počet kandidátskych snímok sú takisto explicitne
uvedené v kľúči a metadátach vyrovnávacej pamäte výsledkov; zmena politiky preto
nemôže opätovne použiť zastaraný opis celého videa. Metadáta vyrovnávacej pamäte
výsledkov v4 uchovávajú režim a odtlačok, nikdy nie nespracovanú úlohu
používateľa. Metadáta ochranného mechanizmu uvádzajú požadovaný aj efektívny
režim analýzy; požadovaný režim `focused` bez použiteľného používateľského textu
sa vykazuje ako efektívne `full`.

Ochranný mechanizmus extrahuje každú podporovanú časť videa, ale opisuje najviac
`modalityBridgeVideoMaxVideos`. Pre cieľ, pri ktorom je preukázané
`supportsVideo === false`, sa neúspešné videá a videá nad limit zmenia na
explicitné bezpečné textové značky, takže nezostane žiadne nespracované video.
Ak je podpora neznáma, tieto časti zostanú nedotknuté. Ciele s
`supportsVideo === true` most obídu. Signál prerušenia požiadavky klienta sa
šíri cez sťahovanie, front sprostredkovateľa, podprocesy a volania na vytvorenie
opisov; prerušenia zastavia spracovanie medzi videami a nikdy pri zlyhaní
neprepustia nespracované médium.

Nastavenia behu sú uložené v databáze a overované pomocou Zod:

| Kľúč                                | Predvolené  | Rozsah/správanie                                                                                                        |
| ----------------------------------- | ----------- | ----------------------------------------------------------------------------------------------------------------------- |
| `modalityBridgeVideoEnabled`        | `false`     | Voliteľný beh, vyžaduje výslovné zapnutie                                                                               |
| `modalityBridgeVideoAnalysisMode`   | `"full"`    | `full` zachováva všeobecné opisy; `focused` používa obmedzený, nedôveryhodný kontext najnovšieho používateľa            |
| `modalityBridgeVideoModel`          | `""`        | Zdedí model mosta Vision                                                                                                |
| `modalityBridgeVideoFrameCount`     | `8`         | 1–16                                                                                                                    |
| `modalityBridgeVideoSamplingPolicy` | `"uniform"` | `uniform`, `scene_aware` alebo proporcionálne `segment_aware`; zlyhanie detektora použije ako záložnú možnosť `uniform` |
| `modalityBridgeVideoMaxVideos`      | `1`         | 1–4                                                                                                                     |
| `modalityBridgeVideoTimeout`        | `120000`    | 1000–120000 ms                                                                                                          |

Staršie uložené hodnoty časového limitu Video nad 120 sekúnd sa obmedzia na
konečný termín sprostredkovateľa; nové zápisy nastavení nad týmto limitom sa
zamietnu. `GET /api/modality-bridge/video/runtime` vyžaduje dôveryhodnú
opečiatkovanú lokálnosť spätnej slučky pred autentifikáciou alebo zisťovaním
prostredia behu a následne vyžaduje autentifikáciu na správu. Vracia iba
`available`, sanitizované verzie FFmpeg/ffprobe a pevne stanovený dôvod, keď
prostredie behu nie je dostupné. Interný koncový bod extrakcie nie je verejným
API na nahrávanie: nasýtenie frontu vráti `503` spolu s `Retry-After`, odpojenie
volajúceho vráti `499` a pevne stanovený konečný termín sprostredkovateľa vráti
`504`. Konvertované odpovede pridávajú
`video->text;model=<visionModel>;parts=<videos>` do centrálnej hlavičky
`x-omniroute-modality-bridge` bez odstránenia segmentov Vision alebo Audio.

### Maskovač PII (`piiMasker.ts`)

Spúšťa sa v **oboch** fázach.

- **`preCall`** klonuje dátový obsah, prechádza cez `system`, `messages`, `input`
  a `prompt` (vrátane položiek s obyčajným reťazcom) a aplikuje `processPII()`
  (z `@/shared/utils/inputSanitizer`) na reťazcové polia `content`/`text`. Keď
  je `PII_REDACTION_ENABLED=true`, zistené PII sa vo výstupnom dátovom obsahu
  začiernia. Toto je nezávislé od `INPUT_SANITIZER_MODE` (ktorý riadi iba
  politiku injektovania promptov). Keď je začierňovanie vypnuté, volanie
  zaznamenáva počty zistení bez prepisovania obsahu.
- **`postCall`** hĺbkovo klonuje odpoveď, spustí `sanitizePIIResponse()` spolu
  s maskovačom tvaru Responses API (`maskResponsesOutput` — pokrýva
  `output_text` a `output[].content[].text`). Ak dôjde k akémukoľvek
  začierneniu, upravená odpoveď nahradí pôvodnú.

Ochranný mechanizmus nikdy neblokuje; iba pridáva anotácie (`meta.detections`,
`meta.redacted`) alebo prepisuje.

### Injektovanie promptov (`promptInjection.ts`)

Zisťuje nepriateľské štruktúry v obsahu dodanom používateľom a vynucuje
nakonfigurovanú politiku. Správanie je riadené premennými prostredia a
možnosťami konštruktora:

| Nastavenie      | Premenná prostredia                                                                                    | Predvolené | Účinok                                                                                                                                                                                                    |
| --------------- | ------------------------------------------------------------------------------------------------------ | ---------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Povolené        | `INPUT_SANITIZER_ENABLED`                                                                              | `true`     | Pri hodnote `false` sa ochranný mechanizmus okamžite ukončí.                                                                                                                                              |
| Režim           | `INJECTION_GUARD_MODE` / `INPUT_SANITIZER_MODE`                                                        | `warn`     | Zásada pre injekcie: `block`, `warn` alebo `log`. (`redact` je podporované kvôli spätnej kompatibilite, ale **neodstraňuje** text injekcie; prepisovanie PII v požiadavke riadi `PII_REDACTION_ENABLED`.) |
| Prah blokovania | možnosť `blockThreshold` / `INPUT_SANITIZER_BLOCK_THRESHOLD` (alias `INJECTION_GUARD_BLOCK_THRESHOLD`) | `high`     | Minimálna závažnosť potrebná na zablokovanie. Pri predvolenom nastavení je stredná závažnosť iba monitorovaná.                                                                                            |

**Priorita režimov** (`getMode`): `options.mode` volajúceho →
**prepísanie príznakom funkcie v DB** `INJECTION_GUARD_MODE` (Ovládací panel → Nastavenia →
Príznaky funkcií) → premenná prostredia `INJECTION_GUARD_MODE` → premenná prostredia `INPUT_SANITIZER_MODE` →
`warn`. Prepísanie z ovládacieho panela má teda prednosť pred premennými prostredia, takže používateľské rozhranie
Príznaky funkcií riadi spustený ochranný mechanizmus v reálnom čase (bez reštartu). Čítanie z DB je zabezpečené proti zlyhaniu:
ak dôjde k chybe, ochranný mechanizmus sa vráti k správaniu založenému na premenných prostredia, a ak nie je nastavené žiadne
prepísanie, správanie je rovnaké ako pri vyhodnocovaní výhradne z premenných prostredia.

Zdroje detekcie:

1. `sanitizeRequest()` z `@/shared/utils/inputSanitizer` (zdieľaná súprava detektorov
   používaná aj na iných miestach spracovateľského reťazca).
2. Vstavané `DEFAULT_GUARD_PATTERNS` (aktuálne `system_override_inline` a
   `markdown_system_block`, obe so závažnosťou `high`).
3. Voliteľné `customPatterns` odovzdané prostredníctvom možností konštruktora (reťazce, regulárne výrazy
   alebo záznamy `{ name, pattern, severity }`).

Keď `mode === "block"` **a** aspoň jedna detekcia dosiahne prah
závažnosti, `preCall` vráti `{ block: true, message: "Request rejected:
suspicious content detected" }`. V režimoch `warn`/`log` ochranný mechanizmus zaznamená udalosť,
ale volanie povolí. Zdieľaná pomocná funkcia `evaluatePromptInjection()` sa tiež exportuje
pre volajúcich, ktorí potrebujú vyhodnocovať prompty bez použitia registra.

**Obmedzenie kontroly (v3.8.20):** detektor kontroluje iba **prvých 16 KB**
spojeného textu promptu — `MAX_INJECTION_SCAN_BYTES = 16 * 1024` (16 384 bajtov) v
`src/shared/utils/inputSanitizer.ts`. Funkcie `detectInjection()` aj
`evaluatePromptInjection()` pred spustením slučky vzorov používajú
`slice(0, MAX_INJECTION_SCAN_BYTES)`. Direktívy injekcie sa nachádzajú blízko začiatku vstupu, takže sa tým
obmedzuje zaťaženie CPU/GC regulárnymi výrazmi pri payloads s veľkosťou niekoľko stoviek KB bez oslabenia detekcie (porov.
#3932, #4041).

### Maskovanie prihlasovacích údajov (`credentialMasker.ts`)

Spúšťa sa v **oboch** fázach, ako posledné v predvolenom reťazci (priorita `95`). Rediguje
známe vzory kľúčov API a tajných tokenov z odchádzajúceho payloadu (obsah správ,
argumenty volaní nástrojov, výsledky nástrojov) **aj** z odpovede poskytovateľa, takže
prihlasovací údaj vložený do promptu (alebo zopakovaný vo výsledku nástroja) neunikne
poskytovateľovi ani späť klientovi.

- **Iba s výslovným povolením**, rovnaká konvencia ako pri redigovaní PII (súvisiace s Prísnym pravidlom č. 20):
  funkcia je zakázaná, pokiaľ `settings.credentialRedactionEnabled === true` **alebo**
  `CREDENTIAL_REDACTION_ENABLED=true`. Keď je vypnutá, ochranný mechanizmus nevykonáva žiadnu operáciu —
  nikdy neblokuje ani neprepisuje.
- `redactCredentials()` prechádza celým stromom payloadu/odpovede (`walkValue()`,
  bezpečné voči znečisteniu prototypu a cyklom pomocou `WeakSet`) a nahrádza zhody
  zástupným symbolom `[REDACTED:<type>]`, pričom klonuje iba vetvy, ktoré sa skutočne
  zmenili.
- `CREDENTIAL_PATTERNS` pokrýva kľúče poskytovateľov LLM (OpenAI, OpenAI-proj,
  Anthropic, Google, Hugging Face, Replicate), tokeny VCS/SaaS (GitHub, Slack,
  Linear, Notion, npm, Postman, Discord), platobné kľúče (Stripe, Square), cloudové
  kľúče (prístupový kľúč AWS, Twilio, SendGrid, Mailgun), súkromné kľúče/JWT,
  pripojovacie reťazce obsahujúce prihlasovacie údaje (`mongodb://user:pass@...` atď.) a
  všeobecný vzor hodnoty hlavičky `Authorization`/`x-api-key`/`api-key`/`apikey`.
  Kľúče vo forme hlavičiek (`authorization`, `x-api-key`, `api-key`,
  `apikey`) sa redigujú štrukturálne (iba hodnota, pričom prefix schémy, napríklad
  `Bearer `/`Basic `, zostáva zachovaný), a nie pomocou všeobecného textového regulárneho výrazu.
- Ochranný mechanizmus nikdy neblokuje; iba prepisuje (`modifiedPayload` /
  `modifiedResponse`) a pridáva anotácie (`meta.credentialsRedacted`, `meta.count`).

Ochrana proti regresii: `tests/unit/credential-masker-guardrail.test.ts`.

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
