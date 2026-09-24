# Guardrails (Čeština)

🌐 **Languages:** 🇺🇸 [English](../../../../security/GUARDRAILS.md) · 🇪🇹 [am](../../../am/docs/security/GUARDRAILS.md) · 🇸🇦 [ar](../../../ar/docs/security/GUARDRAILS.md) · 🇦🇿 [az](../../../az/docs/security/GUARDRAILS.md) · 🇧🇬 [bg](../../../bg/docs/security/GUARDRAILS.md) · 🇧🇩 [bn](../../../bn/docs/security/GUARDRAILS.md) · 🇧🇦 [bs](../../../bs/docs/security/GUARDRAILS.md) · 🇩🇰 [da](../../../da/docs/security/GUARDRAILS.md) · 🇩🇪 [de](../../../de/docs/security/GUARDRAILS.md) · 🇬🇷 [el](../../../el/docs/security/GUARDRAILS.md) · 🇪🇸 [es](../../../es/docs/security/GUARDRAILS.md) · 🇪🇪 [et](../../../et/docs/security/GUARDRAILS.md) · 🇮🇷 [fa](../../../fa/docs/security/GUARDRAILS.md) · 🇫🇮 [fi](../../../fi/docs/security/GUARDRAILS.md) · 🇫🇷 [fr](../../../fr/docs/security/GUARDRAILS.md) · 🇮🇪 [ga](../../../ga/docs/security/GUARDRAILS.md) · 🇮🇳 [gu](../../../gu/docs/security/GUARDRAILS.md) · 🇳🇬 [ha](../../../ha/docs/security/GUARDRAILS.md) · 🇮🇱 [he](../../../he/docs/security/GUARDRAILS.md) · 🇮🇳 [hi](../../../hi/docs/security/GUARDRAILS.md) · 🇭🇷 [hr](../../../hr/docs/security/GUARDRAILS.md) · 🇭🇺 [hu](../../../hu/docs/security/GUARDRAILS.md) · 🇦🇲 [hy](../../../hy/docs/security/GUARDRAILS.md) · 🇮🇩 [id](../../../id/docs/security/GUARDRAILS.md) · 🇳🇬 [ig](../../../ig/docs/security/GUARDRAILS.md) · 🇮🇹 [it](../../../it/docs/security/GUARDRAILS.md) · 🇯🇵 [ja](../../../ja/docs/security/GUARDRAILS.md) · 🇬🇪 [ka](../../../ka/docs/security/GUARDRAILS.md) · 🇰🇭 [km](../../../km/docs/security/GUARDRAILS.md) · 🇮🇳 [kn](../../../kn/docs/security/GUARDRAILS.md) · 🇰🇷 [ko](../../../ko/docs/security/GUARDRAILS.md) · 🇱🇹 [lt](../../../lt/docs/security/GUARDRAILS.md) · 🇱🇻 [lv](../../../lv/docs/security/GUARDRAILS.md) · 🇮🇳 [ml](../../../ml/docs/security/GUARDRAILS.md) · 🇮🇳 [mr](../../../mr/docs/security/GUARDRAILS.md) · 🇲🇾 [ms](../../../ms/docs/security/GUARDRAILS.md) · 🇲🇹 [mt](../../../mt/docs/security/GUARDRAILS.md) · 🇲🇲 [my](../../../my/docs/security/GUARDRAILS.md) · 🇳🇵 [ne](../../../ne/docs/security/GUARDRAILS.md) · 🇳🇱 [nl](../../../nl/docs/security/GUARDRAILS.md) · 🇳🇴 [no](../../../no/docs/security/GUARDRAILS.md) · 🇮🇳 [or](../../../or/docs/security/GUARDRAILS.md) · 🇮🇳 [pa](../../../pa/docs/security/GUARDRAILS.md) · 🇵🇭 [phi](../../../phi/docs/security/GUARDRAILS.md) · 🇵🇱 [pl](../../../pl/docs/security/GUARDRAILS.md) · 🇵🇹 [pt](../../../pt/docs/security/GUARDRAILS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/security/GUARDRAILS.md) · 🇷🇴 [ro](../../../ro/docs/security/GUARDRAILS.md) · 🇷🇺 [ru](../../../ru/docs/security/GUARDRAILS.md) · 🇱🇰 [si](../../../si/docs/security/GUARDRAILS.md) · 🇸🇰 [sk](../../../sk/docs/security/GUARDRAILS.md) · 🇸🇮 [sl](../../../sl/docs/security/GUARDRAILS.md) · 🇷🇸 [sr](../../../sr/docs/security/GUARDRAILS.md) · 🇸🇪 [sv](../../../sv/docs/security/GUARDRAILS.md) · 🇰🇪 [sw](../../../sw/docs/security/GUARDRAILS.md) · 🇮🇳 [ta](../../../ta/docs/security/GUARDRAILS.md) · 🇮🇳 [te](../../../te/docs/security/GUARDRAILS.md) · 🇹🇭 [th](../../../th/docs/security/GUARDRAILS.md) · 🇹🇷 [tr](../../../tr/docs/security/GUARDRAILS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/security/GUARDRAILS.md) · 🇵🇰 [ur](../../../ur/docs/security/GUARDRAILS.md) · 🇺🇿 [uz](../../../uz/docs/security/GUARDRAILS.md) · 🇻🇳 [vi](../../../vi/docs/security/GUARDRAILS.md) · 🇳🇬 [yo](../../../yo/docs/security/GUARDRAILS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/security/GUARDRAILS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/security/GUARDRAILS.md)

---

> **Zdroj pravdy:** `src/lib/guardrails/`
> **Naposledy aktualizováno:** 2026-08-29 — v3.8.51 (původ přepisu Video Bridge deklaruje volající,
> server jej zatím neověřuje — upřesněno dle #11661)

Guardraily prosazují bezpečnost, zásady a transformace obsahu na rozhraní
mezi OmniRoute a upstream poskytovateli. Každý guardrail může kontrolovat (a
volitelně odmítnout, transformovat nebo anotovat) datové části požadavků (`preCall`) a
upstream odpovědi (`postCall`).

Systém je **fail-open**: pokud guardrail během provádění vyvolá výjimku, registr
chybu zaznamená a pokračuje dalším guardrailem, místo aby požadavek
selhal. Blokování je výslovné rozhodnutí (`block: true`), nikdy ne nehoda.

## Vestavěné zábrany

Registr automaticky načítá šest zábran v prioritním pořadí při importu
(viz `registry.ts` → `registerDefaultGuardrails()`):

| Priorita | Název               | Fáze(e)        | Soubor                |
| -------- | ------------------- | -------------- | --------------------- |
| `5`      | `vision-bridge`     | `preCall`      | `visionBridge.ts`     |
| `6`      | `audio-bridge`      | `preCall`      | `audioBridge.ts`      |
| `7`      | `video-bridge`      | `preCall`      | `videoBridge.ts`      |
| `10`     | `pii-masker`        | `pre` + `post` | `piiMasker.ts`        |
| `20`     | `prompt-injection`  | `preCall`      | `promptInjection.ts`  |
| `95`     | `credential-masker` | `pre` + `post` | `credentialMasker.ts` |

Nižší čísla priorit se spouštějí **jako první**.

### Vision Bridge (`visionBridge.ts`) — Modality Bridge PR-1

Zachytává požadavky obsahující obrázky směřující na **modely bez podpory vidění** a buď
přesměruje celý požadavek na model s podporou vidění, nebo nahradí části obrázku
textovými popisy vytvořenými konfigurovatelným modelem vidění před
voláním upstreamu. To umožňuje poskytovatelům pouze textu transparentně zpracovávat
multimodální datové zátěže.

Tok:

1. Přeskočit, pokud cílový model již podporuje vidění (pokud se neobjeví v
   seznamu vynucených mostů `isVisionBridgeForcedModel`).
2. Extrahovat části obrázku pomocí `extractImageParts(messages)`
   (`visionBridgeHelpers.ts`), které deleguje na **jednotný detektor médií**
   `detectMediaParts()` v `open-sse/utils/mediaParts.ts` — jediný zdroj pravdy
   sdílený s filtrem kompatibility kombinací.
   Extrakce je povolena pro části nejvyšší úrovně tvarů, které
   `replaceImageParts` může zpět spojit (kontrakt extrakce↔nahrazení): OpenAI
   `image_url`, Anthropic base64 `source.type:"base64"`, Anthropic URL
   `source.type:"url"` a Responses API `input_image`. Vnořené shody a
   tvary pouze indikátorů jsou materiálem pro kombinovaný filtr a nikdy se
   neextrahují. Přeskočit, pokud žádné nebyly nalezeny.
3. Vyřešit konfiguraci za běhu pomocí `resolveVisionBridgeRuntimeSettings()`
   (`src/shared/constants/modalityBridgeDefaults.ts`): nové klíče nastavení
   `modalityBridge*` vítězí; starší klíče `visionBridge*` zůstávají **jednocyklovým
   záložním řešením** (okno pro vrácení zpět). Přeskočit před jakýmkoli procházením médií,
   když je most zakázán.
4. Selektor režimu (`modalityBridgeVisionMode`, viz tabulka níže) rozhoduje
   o přesměrování vs. popisu. Přesměrování vrací `modifiedPayload` pouze s
   vyměněným `model`, plus meta `{ rerouted, fromModel, toModel, imagesKept }`.
5. Cesta popisu: omezit obrázky na `maxImages`, sestavit prompt s ohledem na úkol,
   konzultovat cache popisu, volat model vidění **paralelně**
   (`Promise.allSettled`) a vložit textové části `[Image N]: <description>`
   na jejich místo. Neúspěšný popis vrátí `null` a původní část obrázku je
   **zachována** (#4012) — kromě cesty kombinovaného popisu, kdy všechny popisy
   selhaly, kde potvrzený neviditelný upstream dostane místo toho zástupný symbol
   `(unavailable — no vision-capable provider connected)` (#8430).
6. Vrátit `modifiedPayload` + meta (`imagesProcessed`, `descriptions`,
   `processingTimeMs`, `visionModel`).

#### Selektor režimu (`modalityBridgeVisionMode`)

| Režim      | Výchozí | Chování                                                                                                                                                                                                                                                               |
| ---------- | ------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `auto`     | ✔       | Starší heuristika, nedotčená (#6640/#7204): modely bez kombinace/`auto/` se přesměrují na nejlepší model vidění, pokud původní model již nemá použitelné pověření (pak popis); cíle kombinace vždy popisují.                                                          |
| `describe` |         | Vždy popisovat — blok přesměrování je zcela přeskočen; vždy odpovídá uživatelem zvolený model.                                                                                                                                                                        |
| `reroute`  |         | Vynucené přesměrování: ochrana modelu s pověřením je obejita. Ochrana pověření cíle přesměrování stále platí — pokud neexistuje použitelný cíl vidění, požadavek propadne k popisu, takže se nezpracované obrázky nikdy nedostanou k backendu pouze s textem (#8430). |

Vynucené režimy se zkracují **před** spuštěním automatické heuristiky; chování
`auto` je bitově identické s před-PR-1 zábranou.

#### Prompt pro popis s ohledem na úkol (`modalityBridgeVisionTaskAware`)

Výchozí **true**. `composeVisionPrompt()` (`visionBridgeHelpers.ts`) připojí
text **poslední uživatelské zprávy** (zkrácený na 500 znaků) k základnímu
promptu pro popis, čímž směřuje popis k tomu, co uživatel skutečně požadoval
(vzor codex-vision-proxy) a žádá model vidění o přepis viditelného textu.
Pokud je příznak vypnut — nebo není k dispozici žádný uživatelský text —
použije se základní prompt beze změny.

Popis vlastního OpenAI-kompatibilního požadavku self-loopu (`callVisionModelSingle()` v `visionBridgeHelpers.ts`) vždy požaduje `image_url.detail: "high"` – bezpodmínečně, pro každého volajícího/poskytovatele, bez ohledu na jakýkoli klientský signál. Vzorkování s nízkými detaily snižuje přesnost OCR přesně pro úlohu transkripce textu, kterou tento prompt požaduje, takže samotné volání popisu vždy požaduje vysoké detaily bez ohledu na úroveň detailů, kterou použil původní příchozí požadavek. To ovlivňuje pouze interní tělo požadavku popisu; nemění to, jak OmniRoute předává volajícího vlastní `image_url.detail` u primárního požadavku – toto výchozí nastavení je aplikováno samostatně a pouze pro detekované klienty OpenCode v `defaultImageDetail()` (`open-sse/handlers/chatCore/upstreamBody.ts`). Větev Anthropic wire-format self-loopu popisu nemá pole `detail` a není ovlivněna žádným z výchozích nastavení.

#### Omezení výstupu popisu (`modalityBridgeVisionMaxChars`)

| Klíč                           | Výchozí | Rozsah             |
| :----------------------------- | :------ | :----------------- |
| `modalityBridgeVisionMaxChars` | `0`     | `0` nebo 100–50000 |

`0` (výchozí) znamená **bez omezení** – popis vrácený `callVisionModel()` je předán beze změny, čímž se zachovává stávající chování. Jakákoli hodnota v rozsahu 100–50000 zkrátí popis s příponou `…` předtím, než je vložen zpět jako `[Image N]: <description>` (`VisionBridgeGuardrail.preCall()` v `src/lib/guardrails/visionBridge.ts`). Zvyšte tuto hodnotu pro úlohy OCR náročné na detaily, kde následný model potřebuje plnou transkripci; snižte ji pro omezení využití tokenů u upovídaných vizuálních modelů. Pole na řídicím panelu se nachází na panelu Pokročilé na kartě Vision (`modality-bridge-max-chars` v `ModalityBridgeVisionTab.tsx`) a omezuje jakoukoli hodnotu mezi 1 a 99 na spodní hranici 100, přičemž explicitní `0` zůstává nedotčena – `0` je platná hodnota Zod sama o sobě (`z.union([z.literal(0), z.number().int().min(100).max(50000)])`), nikoli pouze "nenastavené" výchozí.

#### Mezipaměť popisu (`modalityBridge/bridgeCache.ts`)

In-memory LRU + TTL mezipaměť pro výstupy popisu, sdílená v rámci celého procesu.
Klíč = `sha256(imageRef + composedPrompt + configuredBridgeModel)` s rámováním s předponou délky (žádné kolize hranic polí). Komponenta modelu je **konfigurovaný** bridge model, nikoli model, který skutečně odpověděl – `callVisionModel` se může interně vrátit k záložnímu řešení a klíčování pro každý pokus by fragmentovalo mezipaměť. Neúspěšné popisy se nikdy neukládají do mezipaměti. Nastavení:

| Klíč                            | Výchozí | Rozsah  |
| :------------------------------ | :------ | :------ |
| `modalityBridgeCacheEnabled`    | `true`  | —       |
| `modalityBridgeCacheTtlMinutes` | `60`    | 1–1440  |
| `modalityBridgeCacheMaxEntries` | `200`   | 10–5000 |

#### Normalizace vzdáleného obrazu (self-loop popis/načítání base64)

Když bridge sám načítá **vzdálený** obraz – Anthropic self-call popisu a konverze base64 ve formátu claude-wire-format (`ensureBase64ImagesForClaudeWire`), obojí přes `fetchRemoteImageAsDataUri()` v `visionBridgeHelpers.ts` – výsledný datový URI je před vložením do požadavku vizuálního modelu předán přes `normalizeDataUri()` (`open-sse/utils/imageNormalize.ts`). Příliš velké obrazy jsou zmenšeny na **2048px dlouhou hranu** (odpovídající limitu změny velikosti, který OpenAI/Anthropic již aplikují na straně serveru), což snižuje počet nahraných bajtů/latenci, aniž by se změnilo to, co vidí vizuální model. Změna velikosti používá `sharp`, načtený dynamickým importem: na platformě, kde se jeho nativní binární soubor nenačte, `normalizeDataUri()` **nikdy nevyvolá chybu** – vrátí se k předání původních bajtů, takže cesta popisu/konverze base64 vždy funguje. Nebrazové bajty (načtení, které nevrátilo dekódovatelný obraz) jsou také předány beze změny. Tato normalizace je omezena na obrazy, které bridge načítá pro svůj vlastní self-call – nikdy se nepoužije na původní průchozí datovou zátěž volajícího, což je v souladu s principem mutace pouze na základě opt-in (Tvrdé pravidlo #20).

#### Schéma nastavení + migrace

Nové klíče `modalityBridge*` jsou Zod-validovány v `updateSettingsSchema` (`src/shared/validation/settingsSchemas.ts`): `modalityBridgeVisionEnabled`, `modalityBridgeVisionMode`, `modalityBridgeVisionModel`, `modalityBridgeVisionTaskAware`, `modalityBridgeVisionPrompt`, `modalityBridgeVisionTimeout`, `modalityBridgeVisionMaxImages`, `modalityBridgeVisionMaxChars`, trojice `modalityBridgeCache*` a skupina `modalityBridgeAudio*` používaná Audio Bridge. Migrace `141_modality_bridge_settings.sql` kopíruje existující starší hodnoty `visionBridge*` do odpovídajících nových klíčů (idempotentní, nikdy nepřepíše operátorem nastavenou hodnotu `modalityBridge*`); starší klíče zůstávají přijímány jako záložní pro čtení po dobu jednoho cyklu vydání.

#### Hlavička transparentnosti + statistiky

Odpovědi transformované popisem nesou `x-omniroute-modality-bridge: image->text;model=<visionModel>;parts=<n>` (vytvořeno `buildModalityBridgeHeader()` v `modalityBridge/bridgeStats.ts`, označeno `withModalityBridgeHeader()` v `src/sse/handlers/chatHelpers.ts`). Přesměrované požadavky nedostanou **žádnou** hlavičku – datová zátěž byla nedotčena a výměna modelu je již viditelná v poli `model` v těle odpovědi.

`GET /api/modality-bridge/stats` (správcovské ověření, stejná úroveň jako `GET /api/settings`) vrací in-memory čítače pro jednotlivé modality `{ attempts, successes, bridged, cacheHits, failures, totalLatencyMs, latencySamples, averageLatencyMs, lastUsedAt }` pro `vision`, `audio` a `video`. `averageLatencyMs` používá `latencySamples`, nikoli všechny pokusy, jako svůj jmenovatel; operace bez časování nevytváří vzorek s nulovou milisekundou. `bridged` zůstává zpětně kompatibilním aliasem pro úspěšné konverze; neúspěšné pokusy jej nezvyšují. Čítače se resetují při restartu procesu záměrně (telemetrie, nikoli účetnictví).

#### Konfigurace řídicího panelu

Vyhrazená stránka řídicího panelu je
`/dashboard/settings/modality-bridge`. Její URL-adresovatelné záložky `Vision`, `Audio`
a `Video` zachovávají parametry dotazu při přepínání hodnoty `tab`.
Záložka Vision zpřístupňuje povolení, režim, výběr modelu (včetně automatického
výchozího), výzvy s ohledem na úlohu, pokročilé limity pro timeout/obrázek/délku popisu/cache,
čítače běhu a chráněný ukázkový požadavek. Záložka Audio je také aktivní: zpřístupňuje
povolení, výběr modelu pouze pro STT s možností Auto, limity pro timeout/maximální klip,
audio čítače a ukázkový test `input_audio`. Záložka Video je funkční: hlásí
stav běhu FFmpeg/ffprobe — jeden ze čtyř explicitních stavů UI (`unknown`, zatímco
se sonda provádí nebo se nepodařilo dokončit, `restricted` na hostiteli řídicího panelu,
který není loopback, kde je sonda přeskočena na straně klienta, `unavailable` po sondování
a potvrzení chybějícího stavu, nebo `available` s verzemi FFmpeg/ffprobe) — zachovává
limity pro povolení/model/snímek/video/timeout, filtruje výběr modelu na modely
schopné vize a zpřístupňuje video čítače.

Dřívější karta Vision Bridge v nastavení AI je odkazem pro kompatibilitu na
novou stránku; již neobsahuje druhou kopii formuláře. Poskytovatelé médií také
propojují pracovní postupy převodu obrazu na text a řeči na text s odpovídajícími
záložkami Modality Bridge, aniž by odstranili stávající Speech-to-Text playground.

**Obcházení přijetí self-loopu:** když volání `describe` prochází vlastním `/v1`
self-loopem OmniRoute (nestandardní model poskytovatele), podpožadavek odesílá
`x-omniroute-admission-bypass: internal` a je ověřen vyřešeným self-loop pověřením
— lokálním `sk_omniroute` sentinel v lokálním režimu, nebo operátorem nakonfigurovaným
klíčem prostředí `OMNIROUTE_API_KEY` / `ROUTER_API_KEY` (#1350), takže nasazení
s `REQUIRE_API_KEY=true` mohou stále spouštět volání `describe`. Obcházení je
respektováno pouze pro tato přesná pověření, takže externí klienti nemohou použít
hlavičku k přeskočení přijetí.

Starší výchozí nastavení se nacházejí v `src/shared/constants/visionBridgeDefaults.ts`;
nová výchozí nastavení pro režim/úlohu/cache a řešič nastavení se nacházejí v
`src/shared/constants/modalityBridgeDefaults.ts`. Guardrail zpřístupňuje možnost
konstruktoru `deps`, takže testy mohou vkládat falešné implementace `getSettings`
a `callVisionModel`.

### Audio Bridge (`audioBridge.ts`) — Modality Bridge PR-3

Zachytává chatové požadavky obsahující zvuk dříve, než se dostanou k cíli, o kterém
není známo, že by přijímal zvukový vstup. Nikdy nepřesměrovává chatový požadavek:
zvukové části jsou přepsány prostřednictvím stávajícího multipartového koncového
bodu kompatibilního s OpenAI a zvolený chatový model pokračuje s textovými přepisy.

Tok:

1.  Vyřeší `supportsAudio` prostřednictvím `getResolvedModelCapabilities()`. Explicitní
    metadata registru poskytovatele mají přednost, poté statická metadata modelu,
    poté synchronizovaný `modalities_input`. Deklarovaný seznam vstupů bez `audio`
    je `false`; žádný důkaz schopnosti zůstává `null`. Jak `false`, tak `null`
    aktivují konzervativní bridge, zatímco `true` jej obchází.
2.  Vyřeší nastavení `modalityBridgeAudio*` a extrahuje spojitelné zvukové části
    nejvyšší úrovně z každé zprávy prostřednictvím sdíleného detektoru `detectMediaParts()`.
    Podporované formáty jsou OpenAI `input_audio`, `audio_url` a `source.media_type: "audio/*"`.
    Vnořený zvuk je detekován pro směrování, ale není odstraněn cestou pro spojení.
    Práce je omezena `modalityBridgeAudioMaxClips`; pozdější části zůstávají nedotčeny.
3.  Respektuje nakonfigurovaný `provider/model`, nebo nechá `selectAudioBridgeModel()`
    projít `AUDIO_TRANSCRIPTION_PROVIDERS` ve stabilním pořadí katalogu a vybere
    první model s použitelným aktivním pověřením poskytovatele.
4.  `callAudioTranscription()` převádí base64/data-URI zvuk na multipart `file`,
    nebo stahuje vzdálenou `audio_url` přes veřejnou odchozí ochranu s DNS pinningem
    a limitem 25 MB. Poté POSTuje soubor a vybraný model na lokální
    `/v1/audio/transcriptions` self-loop, ověřený pomocí `resolveSelfLoopBearer()`.
    Stávající transkripční trasa provádí normální vyhledávání pověření, zpracování
    cooldownu/rate-limitu a odeslání poskytovateli.
5.  Úspěšná volání nahradí své části `[Audio N]: <transcript>`. Volání běží s
    `Promise.allSettled`: individuální selhání zachovává původní zvukovou část
    (kontrakt #4012). Pokud všechna volání selžou a cíl je prokázán jako
    `supportsAudio === false`, části se stanou `[Audio N]: (nedostupné — není připojen
žádný poskytovatel STT)` (kontrakt #8430). Pro neznámý cíl (`null`) zůstává
    výsledek všech selhání nedotčen. Prokázaný cíl pouze pro text bez použitelného
    pověření STT obdrží stejný explicitní stub bez provedení síťového volání.

Úspěšné přepisy používají celoprocesovou LRU/TTL cache Modality Bridge. Klíč
kombinuje zvukovou referenci, stabilní štítek operace `audio-transcription` a
vybraný STT model; selhání se nikdy necachují. Pokusy se zvukem aktualizují
sdílené čítače `bridged`, `cacheHits`, `failures` a `lastUsedAt`. Transformované
odpovědi nesou `x-omniroute-modality-bridge: audio->text;model=<sttModel>;parts=<n>`;
nedotčené požadavky neobdrží segment Audio Bridge.

Nastavení za běhu jsou zálohována v DB a validována pomocí Zod:

| Klíč                          | Výchozí | Rozsah           |
| :---------------------------- | :------ | :--------------- |
| `modalityBridgeAudioEnabled`  | `true`  | —                |
| `modalityBridgeAudioModel`    | `""`    | Auto nebo STT ID |
| `modalityBridgeAudioTimeout`  | `60000` | 1000–300000      |
| `modalityBridgeAudioMaxClips` | `3`     | 1–10             |

Sdílená cache zůstává řízena pomocí `modalityBridgeCacheEnabled`,
`modalityBridgeCacheTtlMinutes` a `modalityBridgeCacheMaxEntries`.

### Video Bridge (`videoBridge.ts`, `videoBridgePipeline.ts`)

Zachytává video části nejvyšší úrovně v `messages` a odpovědích Chat Completions
API `input` před voláním cíle bez známé nativní podpory videa.
Podporované tvary jsou `input_video`, `video_url`, `video_source`, HTTPS URL,
a datové URI `data:video/*;base64,...`. Prosté názvy souborů v textu nejsou považovány
za video.

`VideoBridgeGuardrail.preCall` (`videoBridge.ts`) se stará o procházení požadavků,
kontrolu schopností/zásad, agregaci na základě požadavku a datovou část odpovědi.
Práce s jednotlivými videi – získávání, celo-výsledková cache, popis sekvence snímků
(která spojuje jakýkoli volajícím deklarovaný audio přepis) a metriky/přerušení/vyčištění
na pokus – je skryta za `processVideoPart` v
`videoBridgePipeline.ts`, volaným jednou pro každou video část uvnitř smyčky `preCall`.
Tento modul také definuje explicitní hranice portů `VideoMediaBrokerPort`
(získávání bajtů a extrakce vzorkovaných snímků), `VideoAudioTranscriptionPort`
(spojování volajícím deklarovaného audio přepisu se vzorkovanými titulky) a
`VideoDrilldownPort` (hranice perzistence pro detailní analýzu snímků; zatím není
zapojena do `processVideoPart` – pouze samostatná trasa `/api/modality-bridge/video/drilldown`
dnes zapisuje záznamy detailní analýzy).

Veřejná cesta požadavku `/v1` nikdy neimportuje ani nevyvolává podproces. Vzdálená
videa jsou stahována s omezením 50 MiB; inline base64 videa mají
konzervativní limit 36 MiB dekódovaných na video, takže obálka modelu/zpráv/rámování
může zůstat uvnitř veřejného limitu pro příjem JSON požadavků 50 MiB. Inline
délka a odhady dekódované velikosti jsou kontrolovány před alokací. HTTPS je
vyžadováno na počáteční vzdálené URL a každém přesměrování, s použitím stávajícího
pouze veřejného odchozího zabezpečení s DNS pinningem. Bajty pak překročí přesnou interní
hranici brokera `POST /api/modality-bridge/video/extract`. Tato trasa je jak
`LOCAL_ONLY`, tak `SPAWN_CAPABLE`, přijímá pouze ověřený, důvěryhodný
loopback požadavek na proces a nikdy nepřijímá URL, cestu k souboru, spustitelný soubor
nebo seznam argumentů. Pipeline pro velikost těla API a inkrementální čtečka těla
obslužného programu nezávisle vynucují limit 50 MiB pro vstup brokera. Jeho omezená fronta
spouští jednu extrakci najednou, umožňuje čtyři čekající úlohy a omezuje čekající vstup na
100 MiB.

Uvnitř brokera `ffprobe` čte soukromý lokální soubor; pevný seznam povolených formátů
vylučuje formáty playlistů a manifestů. Pro povolené kontejnery rodiny MOV
zůstávají externí datové reference MOV ve výchozím nastavení zakázány a pevný příkaz
se k nim nepřihlašuje. Jak `ffprobe`, tak `ffmpeg` používají whitelist protokolů
pouze `file`, jedno vlákno, pevné pole argumentů, žádný shell a spustitelné soubory
rozlišené z `PATH`. Připojené obrázkové obalové streamy nejsou kandidáty na přehrávání.
Všechny přehratelné streamy musí splňovat limity a explicitní výchozí stream je
preferován před deterministickým záložním s nejnižším indexem. Videa jsou omezena na
600 sekund, 8 192 pixelů na rozměr a 33 554 432 zdrojových pixelů. FFmpeg vzorkuje
1–16 středových JPEG snímků, zmenšuje delší stranu na maximálně 1 024 pixelů bez
zvětšování menších vstupů a nikdy nepřijímá URL. Vzorkování je ve výchozím nastavení
`uniform`. Volitelné zásady `scene_aware` a experimentální `segment_aware` provádějí
jeden dodatečný pevný průchod FFmpegem přes již ověřený lokální stream, vybírají
omezené časové značky scény `showinfo` a deterministicky se vracejí ke stejným
uniformním středovým bodům při selhání detektoru, vypršení časového limitu,
chybném výstupu nebo prázdné sadě kandidátů. Režim segment-aware alokuje středové
vzorky proporcionálně k ověřeným intervalům scény; důkazy a chování při selhání
segment-aware jsou podrobně popsány níže. Pevný limit 16 snímků je
aplikován po výběru v každé zásadě. Když požadavek scene-aware má rozpočet pouze
na jeden snímek, používá uniformní středový bod aktivního celého videa nebo okna
zaostření a hlásí `policyEffective: uniform`: jeden vybraný snímek scény nemůže
zachovat oba časové konce. Volající může volitelně poskytnout
konečné okno zaostření (sekundy `start`/`end`); hranice jsou oříznuty na délku média,
obrácená nebo nekonečná okna jsou odmítnuta a všechny zásady vzorkování jsou
prováděny pouze uvnitř normalizovaného intervalu. Výsledné okno je zahrnuto
v metadatech vzorkování a v nedůvěryhodném prefixu popisu, aby následné modely
mohly rozlišit zaostřený úryvek od celé časové osy.

Sémantické zaostření titulků je samostatné, explicitní nastavení. Výchozí režim
analýzy `full` zachovává stávající výzvu snímku a nikdy nepředává text požadavku
modelu titulků. V režimu `focused` most čte pouze nejnovější neprázdný
uživatelem vytvořený `text`/`input_text` ze stejného kontejneru Chat nebo Responses,
normalizuje jej na NFC, sbaluje řídicí znaky a mezery a omezuje jej na 500
Unicode kódových bodů. Prázdný výsledek se vrátí k přesné výzvě `full`.
Použitelná nápověda je serializována jako JSON v vyhrazeném bloku
nedůvěryhodného uživatelského kontextu a může pouze prioritizovat pozorovatelné
detaily; nemůže přepsat samostatné varování před dodržováním pokynů viditelných
nebo slyšitelných v médiích. Textové zaostření nikdy neodvozuje `start`/`end`
ani nemění časový vzorkovač.

#### FU-07 důkazy strukturálního segmentu

`segment_aware` používá jeden omezený předanalytický průchod přes již ověřený
lokální video stream. Pevný řetězec filtrů nejprve škáluje na maximálně 320 pixelů
na šířku, detekuje změny scény a zamrzlé intervaly, poté vzorkuje 1 snímek za
sekundu pro rozmazání, průměrnou svítivost a prostorové/časové informace. Průchod
je omezen na 600 strukturálních vzorků, jedno vlákno FFmpeg/filtru, stejný
protokol pouze `file` a seznam povolených kontejnerů, limit 1 MiB výstupu procesu
a maximálně 30 sekund v rámci sdíleného přerušení/termínu brokera. Nikdy
nepřijímá příkaz, filtr, cestu nebo URL z požadavku.

Strukturální hodnoty jsou deterministické vzorkovací důkazy, nikoli sémantické porozumění videu. Neodvozují subjekty, akce, titulky, řeč ani záměr uživatele. Hranice scén a zmrazení tvoří segmenty; pokrytí zmrazením, rozostření, expozice, prostorové detaily a časová změna ovlivňují pouze to, jak je přidělen stávající rozpočet 1–16 snímků. Plně zmrazený segment je omezen na jeden snímek, zatímco nezmrazené segmenty soutěží o zbývající rozpočet. Když hranice převyšují počet snímků, je zachováno jednotné pokrytí časové osy, takže rychlé počáteční střihy nemohou skrýt dlouhý koncový segment. Hranice scén v rámci 1sekundového rozlišení analýzy hranice zmrazení jsou sloučeny.

Chybějící filtry, poškozené/prázdné důkazy, chyba detektoru nebo omezený časový limit předběžné analýzy se otevřeně vrátí k přesné jednotné politice středního bodu. Zrušení volajícím nebo termín brokera se neotevře: ukončí probíhající podproces, zabrání pozdější extrakci snímků a soukromý dočasný strom je odstraněn v `finally`.

`scripts/perf/video-bridge-fu07-eval.ts` generuje deterministické skutečné FFmpeg fixture pro úspory volání titulků po deduplikaci, alokaci rozpočtu pro hustý pohyb, důkazy rozostření/expozice/SI-TI, rychlé střihy s dlouhým koncem a falešné pozitiva postupného prolínání. Zaznamenává čas běhu před analýzou a, pokud je k dispozici `/usr/bin/time`, CPU podřízeného procesu a špičkové RSS. Jeho kontroly kvality jsou pouze strukturální orákula. Kvalita skutečného modelu titulků zůstává `HOLD`, protože tento testovací nástroj nemá autorizovaný koncový bod ani zmrazeného rozhodčího. Finanční úspory také zůstávají `HOLD`, pokud `--caption-cost-per-call-usd` nedodá explicitní pozitivní odhad nákladů na jedno volání; skript nikdy nevytváří ani jeden výsledek.

Každý snímek je omezen na 4 MiB, všechny surové snímky dohromady na 23 MiB a serializovaná odpověď brokera na 32 MiB. Soukromý dočasný adresář je odstraněn v `finally`. OmniRoute neobsahuje FFmpeg a nepřijímá vlastní cestu k spustitelnému souboru. Před titulkováním most aplikuje konzervativní vizuální deduplikační průchod: každý JPEG je zmenšen na 16×16 stupňů šedi a je porovnáván pouze s posledním zachovaným snímkem. Pro požadovaný rozpočet titulků nad jeden snímek extrakce poskytuje omezený fond kandidátů až do dvojnásobku tohoto rozpočtu a nikdy ne více než 16 snímků. Požadovaný limit je aplikován až po deduplikaci, přičemž první a poslední vybraní kandidáti jsou zachováni během konečného ztenčení, když je rozpočet alespoň dva. Verzovaná politika `grayscale-16x16-mean-cells-v2` používá větší z průměrné delty jasu a poměru buněk miniatury, jejichž normalizovaná delta je alespoň 0,05. Prahová hodnota duplikace je konstanta 0,04, zvolená pro předvídatelnost spíše než vystavená jako nastavení za běhu. Tento sekundární signál s vysokým kontrastem zachovává malé pohyby a změny viditelného textu, které by porovnání pouze průměrů mohlo skrýt. Chyby komparátoru nebo dekodéru se otevřeně vrátí a zachovají pokrytí. Výstupní metadata oddělují extrahované kandidáty, úspěšně použité snímky a vizuální duplikáty, které byly vyřazeny.

Explicitně označená část videa může požádat o časově označený kontaktní list. Most sestaví maximálně 4sloupcovou, 16snímkovou JPEG mřížku. Každá buňka o velikosti 512 pixelů vypálí svůj zdrojový časový údaj do spodního pásu s vysokým kontrastem, zatímco stejné časové údaje zůstávají v textových metadatech pro následné přiřazení a audit. Kompletní JPEG zůstává omezen na 32 MiB. Pokud `sharp` nemůže dekódovat nebo složit mřížku, most se vrátí k jednotlivým JPEG snímkům; zrušení klientem se stále šíří operací listu.

Důkazy o propagaci jsou záměrně odděleny od syntetického kompozičního mikrobenchmarku. `scripts/perf/video-bridge-contact-sheet-eval.ts` definuje A/B testovací nástroj s verzovaným schématem pro skutečné vizuální modely kompatibilní s OpenAI. Měří tokeny nahlášené poskytovatelem, celkovou latenci (včetně kompozice listu), počet volání modelu a uchování faktů definovaných v manifestu. Surové odpovědi modelu nejsou zapisovány do zprávy; uchovávají se pouze SHA-256 hashe a odpovídající ID faktů. Testovací nástroj neprovádí žádné síťové ani placené volání modelu, pokud není předán `--execute-real` a nejsou nakonfigurovány `--model`, `OMNIROUTE_BASE_URL` a `OMNIROUTE_API_KEY`. Bez tohoto explicitního skutečného spuštění zůstává jeho strojově čitelný verdikt `HOLD`; samotná syntetická měření zátěže/počtu volání nejsou důkazem propagace.

Volající mohou připojit volitelné pole `transcript.cues` k podporované části videa, pokud již mají zarovnaný text. Každá nápověda musí obsahovat `text`, konečný interval `start`/`end` uvnitř zkoumané doby a povolený `source` (`client`, `embedded` nebo `audio-bridge`); `confidence` má výchozí hodnotu `1` a musí zůstat mezi `0` a `1`. Přesné duplicitní nápovědy jsou sloučeny. OmniRoute nikdy nespouští transkripci z těchto metadat: ověřené nápovědy jsou zkopírovány do popsaného výsledku se zdrojem, důvěrou a intervalem a jsou vykresleny jako nedůvěryhodná pozorování vedle titulků snímků. Neplatný text, text mimo rozsah nebo text bez původu je odmítnut, nikoli smíchán do proudu titulků. Pole `source` je v současné době deklarováno volajícím, nikoli ověřeno serverem: OmniRoute vynucuje, aby hodnota byla jedním ze tří povolených řetězců, ale dosud kryptograficky nepotvrzuje, že štítek `embedded` nebo `audio-bridge` skutečně pochází z extrakce vlastněné serverem. Považujte `source` za nedůvěryhodnou nápovědu, dokud toto ověření nebude implementováno; nestavte na něm autorizační rozhodnutí.

Pokročilý volající může poskytnout již autorizovanou stopu `audioTranscript` pro stejné video. Spojovací šev zpracovává vizuální a zvuková pozorování pod jednou uzávěrkou a signálem pro zrušení, řadí je na společnou časovou osu, slučuje přesné duplikáty a hlásí částečný výsledek, když uspěje pouze jedna strana. Neplatný `audioTranscript` se degraduje na tento částečný výsledek — vizuální popis je zachován a zvuková větev zaznamená sanitizovaný kód chyby — namísto selhání celého videa. Dostupnost pro jednotlivé větve, příznak částečnosti a sanitizované kódy selhání jsou zachovány v popsaném výsledku, v metadatech guardrailu (`audioFusionRuns`/`audioFusionPartials`/`audioFusionFailureCodes`), v metadatech mezipaměti výsledků a v počítadlech fúze mostu. Výchozí cesta Video Bridge nevyvolává převod řeči na text ani nestahuje druhou kopii média; bez této explicitní stopy zůstává pouze video.

**Uchovávání přepisu (#12150 P1).** To se automaticky použije vždy, když Video Bridge (sám o sobě volitelný) vykreslí nápovědu přepisu — neexistuje žádný samostatný příznak uchovávání. Když požadavek vykreslí jakoukoli nápovědu přepisu (volajícím deklarovaný `transcript` nebo sloučený `audioTranscript`), guardrail ji označí jako `videoBridgeObserved` a vytvoří redigovaný stín popisu videa — identické vykreslení, ve kterém je volný text každé nápovědy nahrazen `[redacted-video-transcript]`, vytvořený nahrazením strukturovaného pole nápovědy před sestavením řetězce (nikdy ne parsováním zploštělého textu, takže žádný obsah nápovědy — nepřátelský nebo běžný, včetně těl obsahujících `]` jako `[inaudible]`/`[music]` — nemůže přežít). Tělo požadavku v trvalém protokolu volání vymění každou textovou část odvozenou z videa za tento redigovaný stín, shodující se podle rovnosti obsahu; kotva `fullText` je znovu načtena z dokončeného payloadu guardrailu před voláním, takže shoda stále uspěje i po tom, co pozdější řetězové guardraily (maskovače PII a pověření, priority 10/95) přepíší text popisu na místě a po tom, co injekce systémové výzvy/předání/paměti přetvoří pole zpráv. Tělo odeslané upstreamu modelu zůstává nezměněno. Pozorovaný požadavek také neplní žádnou trvalou paměť (extrakce odvozená z požadavku i odpovědi jsou přeskočeny), takže vlastní odpověď modelu nemůže zrcadlit text přepisu do paměti.

Další uchovávané kopie používají stejný signál pozorovaného požadavku. Nezpracovaný snímek klientského požadavku před guardrailem, požadavek čekající v paměti a log časně odmítnutých požadavků strukturálně nahrazují pole přepisu ve video částech; řetězcové výzvy syntetizované fázemi pipeline a předáním kontextu jsou redigovány v úložišti trvalého těla požadavku. Trvalý marker `video_content_removed` způsobí, že pokračování `previous_response_id` selže uzavřeně, namísto rekonstrukce textu, který byl záměrně zahozen. Pokud pozorovaný požadavek ztratí svůj stín redakce pro jednotlivé části před logováním, nebo dokonce jeden z několika video stínů selže ve shodě po pozdějších mutacích požadavku, uchovávané tělo požadavku je zcela vynecháno namísto uchování částečně redigovaného přepisu.

Pro pozorovaný požadavek může odpověď modelu citovat libovolnou část přepisu bez hranice strukturované nápovědy. Jeho trvalé `responseBody` v protokolu volání je proto nahrazeno značkou vynechání; podrobný artefakt pipeline (který může zahrnovat těla upstreamu/klienta a streamové bloky) není uchováván. Sémantické, idempotence a reasoning-replay cache obcházejí čtení a zápisy pro tento požadavek. Požadavek poskytovatele a klientovi viditelná odpověď zůstávají nezměněny. Počáteční keepalive bajty jsou vyprázdněny z dočasné vyrovnávací paměti, když je podrobný artefakt vynechán. Varování Kiro o chybném EventStreamu hlásí pouze počet bajtů payloadu, nikdy jeho obsah ani nezpracovanou chybu JSON parseru. To netvrdí, že každá nesouvisející diagnostika poskytovatele/pluginu byla auditována; širší pročištění uchovávaných dat je sledováno v #11658.

Interní životní cyklus `/api/modality-bridge/video/drilldown` je samostatný, loopback/tokenem autentizovaný cache substrát. Každá operace také vyžaduje kanonické neprůhledné ID principála. Před povolením produkčního volajícího musí odvodit toto ID z autentizovaného tenanta a nikdy nesmí předávat klientem vybranou hodnotu. Klíče mezipaměti vážou tohoto principála ke kanonickým ID relací a video-referencí, ukládají pouze jejich klíče odvozené z SHA-256 a omezují jak čtení, tak mazání na stejného principála. Mezipaměť ukládá maximálně 16 odvozených JPEG snímků na položku, expiruje je po deseti minutách a podporuje omezené čtení `start`/`end` nebo explicitní smazání relace.

Každý principál je omezen na 16 položek a 64 MiB kanonických JPEG dat. Tyto limity jsou nezávislé na globálním stropu 64 položek/256 MiB: tlak kvóty principála vyřadí pouze nejméně nedávno použité položky tohoto principála, než se zváží globální LRU vyřazení. Expirované položky jsou odstraněny z účetnictví principála i globálního účetnictví při aktivitě mezipaměti, zatímco zrušení a selhání validace neprovedou částečnou náhradu.

Mezipaměť odmítá nekanonické Base64, nadbytečné vycpávky, média, která nejsou JPEG, chybně formátované nebo zkrácené JPEGy a JPEGy, které vyvolají varování během omezeného `sharp` dekódování celého obrazu. Každý přijatý obrázek znovu zakóduje jako kanonický JPEG, odvozuje šířku a výšku z dekódovaných bajtů namísto spoléhání se na pole volajícího a zahazuje jakékoli koncové polyglotní bajty namísto jejich uchovávání. Pouze omezený kanonický komprimovaný buffer je započítán do obou kvót. Limit JSON wire zahrnuje režii Base64 pro strop 32 MiB dekódovaného vstupu. Každá uložená derivace zaznamenává svůj validovaný formát/rozlišení JPEG, politiku vzorkování, verzi derivace, čas vytvoření, serverem vypočítaný hash obsahu a hashovanou rodičovskou referenci plus hash rodičovského obsahu důvěryhodného volajícího. Zrušení je kontrolováno mezi asynchronními fázemi dekódování/hashování před atomickým potvrzením mezipaměti.

Tato tranše zatím nepřipojuje produkčního producenta k trase a neposkytuje výběr variant s více rozlišeními. Transparentní cesta požadavku Video Bridge proto nezpůsobuje žádnou dodatečnou práci, zatímco odvození principála vázaného na nájemce a plný životní cyklus FU-08 s více rozlišeními zůstávají explicitní následnou prací, spíše než aby byly dokumentovány jako kompletní chování.

Snímky jsou postupně opatřeny titulky pomocí nakonfigurovaného modelu Video. Prázdné přepsání Video dědí nastavení Vision; pokud jsou obě prázdné, Vision auto-router vybere efektivní model schopný vidění. Úspěšné titulky nahrazují původní část stabilní předponou `[Video description:`, která také označuje text jako nedůvěryhodné pozorování odvozené z médií a říká následným modelům, aby nepostupovaly podle pokynů nalezených v médiích. Klíče mezipaměti titulků snímků zahrnují JPEG bajty, prompt, časové razítko a efektivní model; do mezipaměti se ukládají pouze úspěšné titulky. Položky mezipaměti uchovávají skutečný úspěšný produkční model, včetně záložního modelu; bridge hlásí `mixed`, když byly různé snímky vytvořeny různými modely. Zásah do mezipaměti znovu použije tuto identitu producenta namísto jejího přejmenování na požadovaný plán směrování. Mezipaměť výsledků celého videa je klíčována každým vstupem, který mění výstup — prompt, efektivní model, politika vzorkování, počet snímků, režim sémantické analýzy, otisk SHA-256 normalizovaného nápovědy zaměření, okno zaměření, `transcript`, `audioTranscript` a příznak kontaktního listu — takže změna kterékoli z těchto dimenzí je chybou mezipaměti, nikdy ne zastaralým opětovným použitím. Verze politiky vizuální deduplikace, práh a omezený počet kandidátských snímků jsou také explicitní v klíči mezipaměti výsledků a metadatech; změna politiky proto nemůže znovu použít zastaralý popis celého videa. Metadata mezipaměti výsledků v4 uchovávají režim a otisk, nikdy ne syrový uživatelský úkol. Guardrail metadata hlásí jak požadované, tak efektivní režimy analýzy; požadovaný režim `focused` bez použitelného uživatelského textu je hlášen jako efektivně `full`.

Guardrail extrahuje každou podporovanou video část, ale popisuje ne více než `modalityBridgeVideoMaxVideos`. Pro cíl, u kterého se prokáže, že má `supportsVideo === false`, se neúspěšná a překročená videa stávají explicitními značkami bezpečného textu, takže žádné syrové video nepřežije. Pokud je schopnost neznámá, tyto části zůstávají nedotčeny. Cíle s `supportsVideo === true` bridge obcházejí. Signál přerušení klientského požadavku se šíří přes stahování, frontu brokera, podprocesy a volání titulků; přerušení se zastaví mezi videi a nikdy se neotevřou k syrovým médiím.

Nastavení běhového prostředí jsou zálohována v DB a validována pomocí Zod:

| Klíč                                | Výchozí     | Rozsah / chování                                                                                       |
| :---------------------------------- | :---------- | :----------------------------------------------------------------------------------------------------- |
| `modalityBridgeVideoEnabled`        | `false`     | Volitelné běhové prostředí, opt-in                                                                     |
| `modalityBridgeVideoAnalysisMode`   | `"full"`    | `full` zachovává obecné titulky; `focused` používá omezený, nedůvěryhodný kontext posledního uživatele |
| `modalityBridgeVideoModel`          | `""`        | Dědí model Vision Bridge                                                                               |
| `modalityBridgeVideoFrameCount`     | `8`         | 1–16                                                                                                   |
| `modalityBridgeVideoSamplingPolicy` | `"uniform"` | `uniform`, `scene_aware`, nebo proporcionální `segment_aware`; selhání detektoru se vrátí k `uniform`  |
| `modalityBridgeVideoMaxVideos`      | `1`         | 1–4                                                                                                    |
| `modalityBridgeVideoTimeout`        | `120000`    | 1000–120000 ms                                                                                         |

Starší trvalé hodnoty časového limitu videa nad 120 sekund jsou omezeny na termín brokera; nové zápisy nastavení nad tento limit jsou odmítnuty. `GET /api/modality-bridge/video/runtime` vyžaduje důvěryhodnou označenou loopback lokalitu před autentizací nebo zjišťováním běhového prostředí, poté vyžaduje správcovskou autentizaci. Vrací pouze `available`, sanitizované verze FFmpeg/ffprobe a pevný důvod, když běhové prostředí není dostupné. Interní extrakční koncový bod není veřejné API pro nahrávání: saturace fronty vrací `503` plus `Retry-After`, odpojení volajícího vrací `499` a pevný termín brokera vrací `504`. Konvertované odpovědi přidávají `video->text;model=<visionModel>;parts=<videos>` do centrální hlavičky `x-omniroute-modality-bridge` bez odstranění segmentů Vision nebo Audio.

### Maskovač PII (`piiMasker.ts`)

Běží na **obou** fázích.

- **`preCall`** klonuje payload, prochází `system`, `messages`, `input` a `prompt` (včetně položek prostého řetězce) a aplikuje `processPII()` (z `@/shared/utils/inputSanitizer`) na řetězcová pole `content`/`text`. Když je `PII_REDACTION_ENABLED=true`, detekované PII je redigováno v odchozím payloadu. To je nezávislé na `INPUT_SANITIZER_MODE` (který řídí pouze politiku vkládání promptů). Když je redakce vypnutá, volání zaznamenává počty detekcí bez přepisování obsahu.
- **`postCall`** provede hlubokou kopii odpovědi, spustí `sanitizePIIResponse()` plus maskovač tvaru Responses-API (`maskResponsesOutput` — pokrývá `output_text` a `output[].content[].text`). Pokud dojde k jakékoli redakci, upravená odpověď nahradí původní.

Guardrail nikdy neblokuje; pouze anotuje (`meta.detections`, `meta.redacted`) nebo přepisuje.

### Vkládání promptů (`promptInjection.ts`)

Detekuje nepřátelské struktury v uživatelském obsahu a vynucuje nakonfigurovanou politiku. Chování je řízeno proměnnými prostředí a možnostmi konstruktoru:

| Nastavení      | Env var                                                                                               | Výchozí | Účinek                                                                                                                                                                                           |
| -------------- | ----------------------------------------------------------------------------------------------------- | ------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Povoleno       | `INPUT_SANITIZER_ENABLED`                                                                             | `true`  | Když je `false`, guardrail se okamžitě ukončí.                                                                                                                                                   |
| Režim          | `INJECTION_GUARD_MODE` / `INPUT_SANITIZER_MODE`                                                       | `warn`  | Politika injekce: `block`, `warn`, nebo `log`. (`redact` je přijímáno pro zpětnou kompatibilitu, ale **neodstraňuje** text injekce; požadavek na přepsání PII je řízen `PII_REDACTION_ENABLED`.) |
| Práh blokování | `blockThreshold` option / `INPUT_SANITIZER_BLOCK_THRESHOLD` (alias `INJECTION_GUARD_BLOCK_THRESHOLD`) | `high`  | Minimální závažnost požadovaná pro blokování. Střední je ve výchozím nastavení pouze pro pozorování.                                                                                             |

**Priorita režimu** (`getMode`): volající `options.mode` →
`INJECTION_GUARD_MODE` **přepsání DB feature-flagem** (Dashboard → Nastavení →
Feature Flags) → `INJECTION_GUARD_MODE` env → `INPUT_SANITIZER_MODE` env →
`warn`. Přepsání z dashboardu má proto přednost před proměnnými prostředí, takže
uživatelské rozhraní Feature Flags řídí běžící guard v reálném čase (bez
restartu). Čtení z DB je odolné proti chybám: pokud dojde k chybě, guard se
vrátí k chování založenému na prostředí, a pokud není nastaveno žádné
přepsání, chování je identické s řešením pouze na základě prostředí.

Zdroje detekce:

1.  `sanitizeRequest()` z `@/shared/utils/inputSanitizer` (sdílená sada
    detektorů používaná jinde v pipeline).
2.  Vestavěné `DEFAULT_GUARD_PATTERNS` (aktuálně `system_override_inline` a
    `markdown_system_block`, obě se závažností `high`).
3.  Volitelné `customPatterns` předané prostřednictvím možností konstruktoru
    (řetězce, regex, nebo záznamy `{ name, pattern, severity }`).

Když `mode === "block"` **a** alespoň jedna detekce splňuje práh závažnosti,
`preCall` vrátí `{ block: true, message: "Request rejected: suspicious content
detected" }`. V režimech `warn`/`log` guardrail loguje, ale volání povolí.
Sdílená pomocná funkce `evaluatePromptInjection()` je také exportována pro
volající, kteří potřebují vyhodnotit výzvy, aniž by procházeli registrem.

**Limit skenování (v3.8.20):** detektor kontroluje pouze **prvních 16 KB**
spojeného textu výzvy — `MAX_INJECTION_SCAN_BYTES = 16 * 1024` (16 384 bajtů)
v `src/shared/utils/inputSanitizer.ts`. Jak `detectInjection()`, tak
`evaluatePromptInjection()` `slice(0, MAX_INJECTION_SCAN_BYTES)` před
spuštěním smyčky vzorů. Direktivy injekce se nacházejí blízko začátku vstupu,
takže toto omezuje CPU/GC regexu u payloadů o velikosti stovek KB, aniž by se
oslabila detekce (viz #3932, #4041).

### Maskovač pověření (`credentialMasker.ts`)

Běží v **obou** fázích, poslední ve výchozím řetězci (priorita `95`). Rediguje
známé vzory API klíčů / tajných tokenů z odchozího payloadu (obsah zprávy,
argumenty volání nástroje, výsledky nástroje) **a** z odpovědi poskytovatele,
takže pověření vložené do výzvy (nebo vrácené výsledkem nástroje) neunikne
upstream poskytovateli ani zpět klientovi.

- **Pouze opt-in**, stejná konvence jako redakce PII (Tvrzené pravidlo
  #20-přilehlé): zakázáno, pokud není `settings.credentialRedactionEnabled ===
true` **nebo** `CREDENTIAL_REDACTION_ENABLED=true`. Pokud je vypnutý,
  guardrail je no-op — nikdy neblokuje a nikdy nepřepisuje.
- `redactCredentials()` prochází celý strom payloadu/odpovědi (`walkValue()`,
  bezpečné proti znečištění prototypu, bezpečné proti cyklům pomocí
  `WeakSet`) a nahrazuje shody zástupným symbolem `[REDACTED:<type>]`,
  klonuje pouze větve, které se skutečně změnily.
- `CREDENTIAL_PATTERNS` pokrývá klíče poskytovatelů LLM (OpenAI, OpenAI-proj,
  Anthropic, Google, Hugging Face, Replicate), tokeny VCS/SaaS (GitHub,
  Slack, Linear, Notion, npm, Postman, Discord), platební klíče (Stripe,
  Square), cloudové klíče (AWS access key, Twilio, SendGrid, Mailgun),
  soukromé klíče / JWT, připojovací řetězce obsahující pověření
  (`mongodb://user:pass@...`, atd.) a obecný vzor hodnoty hlavičky
  `Authorization`/`x-api-key`/`api-key`/`apikey`. Klíče ve tvaru hlavičky
  (`authorization`, `x-api-key`, `api-key`, `apikey`) jsou redigovány
  strukturálně (pouze hodnota, předpona schématu jako `Bearer `/`Basic ` je
  zachována) spíše než prostřednictvím obecného textového regexu.
- Guardrail nikdy neblokuje; pouze přepisuje (`modifiedPayload` /
  `modifiedResponse`) a anotuje (`meta.credentialsRedacted`, `meta.count`).

Regresní ochrana: `tests/unit/credential-masker-guardrail.test.ts`.

## Základní kontrakt (`base.ts`)

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
  block?: boolean; // true zkrátí vyhodnocování řetězce
  message?: string; // zobrazí se při zablokování
  meta?: Record<string, unknown> | null;
  modifiedPayload?: TValue; // vráceno metodou preCall pro přepsání požadavku
  modifiedResponse?: TValue; // vráceno metodou postCall pro přepsání odpovědi
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

Ochranné pravidlo signalizuje „žádnou změnu“ vrácením hodnoty `void`, `{}` nebo
`{ block: false }`. Vrácení `modifiedPayload`/`modifiedResponse` nahradí
hodnotu procházející řetězcem pro následná ochranná pravidla.
`signal?: AbortSignal` přenáší životní cyklus volajícího do ochranných pravidel. Přerušení požadavku je záměrnou výjimkou z režimu fail-open: mediální převodníky ukončí práci a provedou úklid, aniž by obnovily nezpracovaná média pro cíl, o kterém je známo, že je nepodporuje.

## Registr (`registry.ts`)

Singleton `guardrailRegistry` poskytuje:

- `register(guardrail)` — přidá ochranné pravidlo (nebo je nahradí podle normalizovaného názvu) a
  znovu seřadí pravidla vzestupně podle `priority`.
- `clear()` / `list()` — pomocné administrativní funkce.
- `runPreCallHooks(payload, context)` — prochází aktivní ochranná pravidla, předává
  payload prostřednictvím `modifiedPayload` a zastaví se při prvním `block: true`.
- `runPostCallHooks(response, context)` — stejný postup na straně odpovědi.
- `resetGuardrailsForTests({ registerDefaults })` — vymaže stav a volitelně
  znovu zaregistruje výchozí pravidla pro čistou izolaci testů.

Oba spouštěče vracejí `{ blocked, payload|response, results, guardrail?, message? }`,
kde `results` je pole záznamů `GuardrailExecutionResult`, které obsahují
pro jednotlivá ochranná pravidla pole `blocked`, `skipped`, `modified`, `error` a `meta`,
užitečná pro trasování.

### Zakázání ochranných pravidel pro jednotlivé požadavky

`resolveDisabledGuardrails({ apiKeyInfo, body, headers })` shromažďuje
deduplikovaný seznam názvů ochranných pravidel, která mají být pro aktuální
požadavek přeskočena. Zdroje (všechny jsou volitelné a všechny se slučují):

- `apiKeyInfo.disabledGuardrails`
- `disabledGuardrails` v těle požadavku (na nejvyšší úrovni)
- `metadata.disabledGuardrails` v těle požadavku
- Hlavička `x-omniroute-disabled-guardrails` (nebo starší
  `x-disabled-guardrails`)

Hodnoty mohou být pole řetězců nebo řetězec oddělený čárkami; názvy jsou
normalizovány na malá písmena ve formátu kebab-case (`pii_masker` → `pii-masker`). Výsledek
je předán registru prostřednictvím `context.disabledGuardrails`, který přeskočí
odpovídající ochranná pravidla (`skipped: true` v `results`).

## Pořadí zpracování

Pro každý požadavek procházející přes `src/sse/handlers/chat.ts` a
`open-sse/handlers/chatCore.ts`:

1. `resolveDisabledGuardrails(...)` sestaví seznam vynechaných ochranných mechanismů z klíče API, těla požadavku
   a hlaviček.
2. `guardrailRegistry.runPreCallHooks(body, ctx)` spustí ochranné mechanismy ve vzestupném
   pořadí priorit:
   - Zakázané ochranné mechanismy se zaznamenají jako `skipped`.
   - Metoda `preCall` každého ochranného mechanismu může přepsat datovou část pomocí `modifiedPayload`.
   - První výskyt `block: true` okamžitě ukončí řetězec a obslužná rutina vrátí
     odpověď o zamítnutí ochranným mechanismem.
3. (Případně přepsaná) datová část pokračuje do kombinovaného směrování a odeslání
   nadřazené službě.
4. Po sestavení odpovědi spustí `guardrailRegistry.runPostCallHooks(...)`
   stejný řetězec nad odpovědí. Hodnota `block: true` v této fázi zahodí odpověď
   nadřazené služby.

Ochranné mechanismy, které vyvolají výjimku, se zaznamenají s `error: <message>` a zaprotokolují prostřednictvím
`logger.warn`, ale řetězec pokračuje — záměrně tedy funguje v režimu fail-open.

## Konfigurace

Proměnné prostředí načítané vestavěnými ochrannými mechanismy:

| Proměnná                              | Používá ji                | Účinek                                                                                                        |
| ------------------------------------- | ------------------------- | ------------------------------------------------------------------------------------------------------------- |
| `INPUT_SANITIZER_ENABLED`             | `prompt-injection`        | Nastavením na `false` se detekce zcela zakáže.                                                                |
| `INPUT_SANITIZER_MODE`                | `prompt-injection`        | Zásady pro injekce: `warn`, `block` nebo `log`. Zastaralá hodnota `redact` text injekce nepřepisuje.          |
| `INJECTION_GUARD_MODE`                | `prompt-injection`        | Režim ochrany proti injekcím; zároveň příznak funkce v DB, který **přepisuje** proměnné prostředí (DB > ENV). |
| `INPUT_SANITIZER_BLOCK_THRESHOLD`     | `prompt-injection`        | Minimální závažnost, kterou `MODE=block` odmítne: `high` (výchozí), `medium` nebo `low`.                      |
| `INJECTION_GUARD_BLOCK_THRESHOLD`     | `prompt-injection`        | Zastaralý alias pro `INPUT_SANITIZER_BLOCK_THRESHOLD`.                                                        |
| `PII_REDACTION_ENABLED`               | `pii-masker`              | Je-li nastaveno na `true`, údaje PII v požadavku se začerní (nezávisle na režimu injekcí).                    |
| `PII_RESPONSE_SANITIZATION` / `_MODE` | `pii-masker` (na výstupu) | Řídí chování maskování na straně odpovědi.                                                                    |

Ochranné mechanismy Modality Bridge načítají běhovou konfiguraci z úložiště nastavení
založeného na DB (`getSettings()`), nikoli z proměnných prostředí. Primární klíče pro obraz jsou
`modalityBridgeVisionEnabled`, `modalityBridgeVisionMode`,
`modalityBridgeVisionModel`, `modalityBridgeVisionTaskAware`,
`modalityBridgeVisionPrompt`, `modalityBridgeVisionTimeout`,
`modalityBridgeVisionMaxImages`, `modalityBridgeVisionMaxChars`,
`modalityBridgeCacheEnabled`, `modalityBridgeCacheTtlMinutes` a
`modalityBridgeCacheMaxEntries`. Zastaralé klíče
`visionBridge*` jsou přijímány pouze jako zdokumentovaný záložní zdroj pro čtení během jednoho cyklu;
zápisy z řídicího panelu používají primární klíče. Výchozí hodnoty a záložní
resolver se nacházejí v `src/shared/constants/modalityBridgeDefaults.ts`, přičemž zastaralé
konstanty zůstávají zachovány v `src/shared/constants/visionBridgeDefaults.ts`.

Zvuk používá `modalityBridgeAudioEnabled`, `modalityBridgeAudioModel`,
`modalityBridgeAudioTimeout` a `modalityBridgeAudioMaxClips` společně se sdílenými
nastaveními `modalityBridgeCache*`. Zvuk nemá záložní podporu zastaralých klíčů, protože tyto
klíče byly zavedeny se schématem Modality Bridge.

Video používá `modalityBridgeVideoEnabled`, `modalityBridgeVideoAnalysisMode`,
`modalityBridgeVideoModel`,
`modalityBridgeVideoFrameCount`, `modalityBridgeVideoSamplingPolicy`,
`modalityBridgeVideoMaxVideos` a
`modalityBridgeVideoTimeout` společně se sdílenými nastaveními `modalityBridgeCache*`.
Ve výchozím nastavení je zakázáno, protože FFmpeg/ffprobe jsou volitelné provozní
závislosti a popisování snímků zvyšuje latenci a náklady na model.

## Vlastní guardraily

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

Postup:

1. Vytvořte `src/lib/guardrails/myGuardrail.ts`, který rozšiřuje `BaseGuardrail`.
2. Implementujte `preCall` a/nebo `postCall`.
3. Buď jej zaregistrujte při importu (přidáním z `registerDefaultGuardrails`), nebo
   za běhu zavolejte `guardrailRegistry.register(...)` — registr nahradí
   jakýkoli dřívější guardrail se stejným normalizovaným názvem.
4. Přidejte testy do `tests/unit/` (existující příklady:
   `tests/unit/guardrails-registry.test.ts`,
   `tests/unit/prompt-injection-guard.test.ts`,
   `tests/unit/guardrails/visionBridge.test.ts`).

## Testování

Mezi testy použijte `resetGuardrailsForTests()`, abyste vždy začínali ze známého stavu.
Předejte `{ registerDefaults: false }`, chcete-li začít s prázdným registrem a
zaregistrovat pouze testované guardraily. Vision Bridge podporuje vkládání závislostí
(`deps.getSettings`, `deps.callVisionModel`); Audio Bridge zpřístupňuje ekvivalentní
rozhraní pro nastavení, schopnosti, výběr modelu STT, kontrolu přihlašovacích údajů
a přepis. Testy tak mohou ověřovat oba toky bez přístupu k databázi nebo síti.

## Viz také

- `src/lib/guardrails/` — implementace
- `src/shared/utils/inputSanitizer.ts` — sdílený detektor zajišťující
  detekci prompt injection a maskování PII
- `src/shared/constants/visionBridgeDefaults.ts` — výchozí hodnoty Vision Bridge a
  seznam modelů s vynuceným přemostěním
- `src/shared/constants/modalityBridgeDefaults.ts` — sdílené výchozí hodnoty běhového prostředí Vision/Audio
- `docs/architecture/RESILIENCE_GUIDE.md` — ortogonální vrstva (circuit breaker, intervaly zklidnění)
- `docs/reference/ENVIRONMENT.md` — úplný přehled proměnných prostředí

## Pokrytí tras ochranou proti injection a red-team testování (Fáze 8 · Blok D)

Ochrana proti injection (`createInjectionGuard` / `withInjectionGuard`) pokrývá všechny trasy,
které přijímají uživatelské prompty. Respektuje `INJECTION_GUARD_MODE` (výchozí `warn` = pouze protokolování;
`block` = vrátí HTTP 400 `SECURITY_001`).

| Typ              | Trasy                                                                                                                                                | Výchozí režim |
| ---------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- | ------------- |
| Text (stávající) | `/v1/chat/completions`, `/v1/completions`, `/v1/relay/chat/completions`                                                                              | warn          |
| Generativní      | `/v1/messages`, `/v1/responses`, `/v1/images/generations`, `/v1/images/edits`, `/v1/videos/generations`, `/v1/music/generations`, `/v1/audio/speech` | warn          |
| Data             | `/v1/embeddings`, `/v1/rerank`, `/v1/search`, `/v1/moderations`                                                                                      | warn          |

Extrakce textu (`extractMessageContents`) pokrývá `messages`/`input`/`prompt`/`query`+`documents`/`instructions`/`system`.

**Red-team testování (každou noc, `nightly-llm-security.yml`):** promptfoo ověřuje, že každá trasa blokuje
korpus OWASP-LLM v režimu `INJECTION_GUARD_MODE=block`; garak spouští sondy (bez tajného klíče se přeskočí).
`moderations` je zahrnuto kvůli konzistenci — provozovatelé jej mohou v režimu blokování vyjmout pomocí
`resolveDisabledGuardrails`.

Noční pracovní postup (`.github/workflows/nightly-llm-security.yml`, cron + ruční
spuštění) obsahuje dvě úlohy:

- **`promptfoo-guard` (blokující)** — spouští `promptfoo eval -c promptfooconfig.yaml`
  s `INJECTION_GUARD_MODE=block`. Každý nepřátelský případ (např. „ignoruj všechny
  předchozí instrukce…“, jailbreaky ve stylu DAN) ověřuje, že odpověď obsahuje
  `error.code === "SECURITY_001"`, tj. že ochrana požadavek skutečně odmítla.
- **`garak` (informativní)** — spouští garak `--probes promptinject,dan,leakreplay`
  proti lokální instanci OmniRoute (`http://localhost:20128/v1`). Je podmíněna
  tajným klíčem poskytovatele (`PROMPTFOO_PROVIDER_KEY`); pokud není k dispozici, korektně se přeskočí a je doplněna
  o `|| true`, takže podá hlášení, aniž by způsobila selhání CI.

Pokrytí pomocné funkce ochrany (`createInjectionGuard` / `withInjectionGuard`)
zahrnuje každou trasu `/v1` přijímající prompt; text promptu se získává z
`messages`/`input`/`prompt`/`query`+`documents`/`instructions`/`system` pomocí
`extractMessageContents()` v `src/shared/utils/inputSanitizer.ts`.
