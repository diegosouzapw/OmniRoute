# Guardrails (Čeština)

🌐 **Languages:** 🇺🇸 [English](../../../../security/GUARDRAILS.md) · 🇪🇹 [am](../../../am/docs/security/GUARDRAILS.md) · 🇸🇦 [ar](../../../ar/docs/security/GUARDRAILS.md) · 🇦🇿 [az](../../../az/docs/security/GUARDRAILS.md) · 🇧🇬 [bg](../../../bg/docs/security/GUARDRAILS.md) · 🇧🇩 [bn](../../../bn/docs/security/GUARDRAILS.md) · 🇩🇰 [da](../../../da/docs/security/GUARDRAILS.md) · 🇩🇪 [de](../../../de/docs/security/GUARDRAILS.md) · 🇬🇷 [el](../../../el/docs/security/GUARDRAILS.md) · 🇪🇸 [es](../../../es/docs/security/GUARDRAILS.md) · 🇪🇪 [et](../../../et/docs/security/GUARDRAILS.md) · 🇮🇷 [fa](../../../fa/docs/security/GUARDRAILS.md) · 🇫🇮 [fi](../../../fi/docs/security/GUARDRAILS.md) · 🇫🇷 [fr](../../../fr/docs/security/GUARDRAILS.md) · 🇮🇪 [ga](../../../ga/docs/security/GUARDRAILS.md) · 🇮🇳 [gu](../../../gu/docs/security/GUARDRAILS.md) · 🇳🇬 [ha](../../../ha/docs/security/GUARDRAILS.md) · 🇮🇱 [he](../../../he/docs/security/GUARDRAILS.md) · 🇮🇳 [hi](../../../hi/docs/security/GUARDRAILS.md) · 🇭🇷 [hr](../../../hr/docs/security/GUARDRAILS.md) · 🇭🇺 [hu](../../../hu/docs/security/GUARDRAILS.md) · 🇦🇲 [hy](../../../hy/docs/security/GUARDRAILS.md) · 🇮🇩 [id](../../../id/docs/security/GUARDRAILS.md) · 🇳🇬 [ig](../../../ig/docs/security/GUARDRAILS.md) · 🇮🇹 [it](../../../it/docs/security/GUARDRAILS.md) · 🇯🇵 [ja](../../../ja/docs/security/GUARDRAILS.md) · 🇬🇪 [ka](../../../ka/docs/security/GUARDRAILS.md) · 🇰🇭 [km](../../../km/docs/security/GUARDRAILS.md) · 🇮🇳 [kn](../../../kn/docs/security/GUARDRAILS.md) · 🇰🇷 [ko](../../../ko/docs/security/GUARDRAILS.md) · 🇱🇹 [lt](../../../lt/docs/security/GUARDRAILS.md) · 🇱🇻 [lv](../../../lv/docs/security/GUARDRAILS.md) · 🇮🇳 [ml](../../../ml/docs/security/GUARDRAILS.md) · 🇮🇳 [mr](../../../mr/docs/security/GUARDRAILS.md) · 🇲🇾 [ms](../../../ms/docs/security/GUARDRAILS.md) · 🇲🇹 [mt](../../../mt/docs/security/GUARDRAILS.md) · 🇲🇲 [my](../../../my/docs/security/GUARDRAILS.md) · 🇳🇵 [ne](../../../ne/docs/security/GUARDRAILS.md) · 🇳🇱 [nl](../../../nl/docs/security/GUARDRAILS.md) · 🇳🇴 [no](../../../no/docs/security/GUARDRAILS.md) · 🇮🇳 [or](../../../or/docs/security/GUARDRAILS.md) · 🇮🇳 [pa](../../../pa/docs/security/GUARDRAILS.md) · 🇵🇭 [phi](../../../phi/docs/security/GUARDRAILS.md) · 🇵🇱 [pl](../../../pl/docs/security/GUARDRAILS.md) · 🇵🇹 [pt](../../../pt/docs/security/GUARDRAILS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/security/GUARDRAILS.md) · 🇷🇴 [ro](../../../ro/docs/security/GUARDRAILS.md) · 🇷🇺 [ru](../../../ru/docs/security/GUARDRAILS.md) · 🇱🇰 [si](../../../si/docs/security/GUARDRAILS.md) · 🇸🇰 [sk](../../../sk/docs/security/GUARDRAILS.md) · 🇸🇮 [sl](../../../sl/docs/security/GUARDRAILS.md) · 🇷🇸 [sr](../../../sr/docs/security/GUARDRAILS.md) · 🇸🇪 [sv](../../../sv/docs/security/GUARDRAILS.md) · 🇰🇪 [sw](../../../sw/docs/security/GUARDRAILS.md) · 🇮🇳 [ta](../../../ta/docs/security/GUARDRAILS.md) · 🇮🇳 [te](../../../te/docs/security/GUARDRAILS.md) · 🇹🇭 [th](../../../th/docs/security/GUARDRAILS.md) · 🇹🇷 [tr](../../../tr/docs/security/GUARDRAILS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/security/GUARDRAILS.md) · 🇵🇰 [ur](../../../ur/docs/security/GUARDRAILS.md) · 🇺🇿 [uz](../../../uz/docs/security/GUARDRAILS.md) · 🇻🇳 [vi](../../../vi/docs/security/GUARDRAILS.md) · 🇳🇬 [yo](../../../yo/docs/security/GUARDRAILS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/security/GUARDRAILS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/security/GUARDRAILS.md)

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

## Vestavěné guardraily

Registr při importu automaticky načítá šest guardrailů v pořadí podle priority
(viz `registry.ts` → `registerDefaultGuardrails()`):

| Priorita | Název               | Fáze           | Soubor                |
| -------- | ------------------- | -------------- | --------------------- |
| `5`      | `vision-bridge`     | `preCall`      | `visionBridge.ts`     |
| `6`      | `audio-bridge`      | `preCall`      | `audioBridge.ts`      |
| `7`      | `video-bridge`      | `preCall`      | `videoBridge.ts`      |
| `10`     | `pii-masker`        | `pre` + `post` | `piiMasker.ts`        |
| `20`     | `prompt-injection`  | `preCall`      | `promptInjection.ts`  |
| `95`     | `credential-masker` | `pre` + `post` | `credentialMasker.ts` |

Nižší čísla priority se spouštějí **dříve**.

### Vision Bridge (`visionBridge.ts`) — Modality Bridge PR-1

Zachytává požadavky obsahující obrázky, které míří na **modely bez podpory obrazu**, a buď
přesměruje celý požadavek na model podporující obraz, nebo před
upstream voláním nahradí obrazové části textovými popisy vytvořenými konfigurovatelným modelem pro zpracování obrazu.
Poskytovatelé podporující pouze text tak mohou transparentně zpracovávat
multimodální datové části.

Průběh:

1. Přeskočí zpracování, pokud cílový model již podporuje obraz (pokud se nenachází v
   seznamu vynuceného přemostění `isVisionBridgeForcedModel`).
2. Extrahuje obrazové části pomocí `extractImageParts(messages)`
   (`visionBridgeHelpers.ts`), která deleguje na **sjednocený detektor
   médií** `detectMediaParts()` v `open-sse/utils/mediaParts.ts` — jediný
   zdroj pravdy sdílený s filtrem kompatibility kombinací.
   Extrakce je omezena seznamem povolených částí nejvyšší úrovně ve tvarech,
   které může `replaceImageParts` vložit zpět (kontrakt extrakce↔nahrazení): OpenAI
   `image_url`, Anthropic base64 `source.type:"base64"`, Anthropic URL
   `source.type:"url"` a Responses API `input_image`. Vnořené shody a
   tvary sloužící pouze jako indikátory jsou materiálem pro filtr kombinací a nikdy se neextrahují.
   Pokud nejsou žádné nalezeny, zpracování se přeskočí.
3. Přeloží běhovou konfiguraci pomocí `resolveVisionBridgeRuntimeSettings()`
   (`src/shared/constants/modalityBridgeDefaults.ts`): nové klíče nastavení `modalityBridge*`
   mají přednost; starší klíče `visionBridge*` zůstávají jako **záložní možnost pro jeden cyklus**
   (okno pro návrat zpět). Pokud je bridge zakázán, zpracování se přeskočí ještě před jakýmkoli průchodem médii.
4. Volič režimu (`modalityBridgeVisionMode`, viz tabulka níže) rozhodne mezi
   přesměrováním a popisem. Přesměrování vrátí `modifiedPayload`, kde je nahrazen pouze `model`,
   spolu s metadaty `{ rerouted, fromModel, toModel, imagesKept }`.
5. Cesta popisu: omezí počet obrázků na `maxImages`, sestaví prompt zohledňující úlohu,
   zkontroluje mezipaměť popisů, zavolá model pro zpracování obrazu **paralelně**
   (`Promise.allSettled`) a na jejich místo vloží textové části `[Image N]: <description>`.
   Neúspěšný popis vrátí `null` a původní obrazová část je
   **zachována** (#4012) — s výjimkou cesty popisu kombinace, pokud selhaly
   všechny popisy; v takovém případě potvrzený upstream bez podpory obrazu obdrží zástupný text
   `(unavailable — no vision-capable provider connected)` (#8430).
6. Vrátí `modifiedPayload` + metadata (`imagesProcessed`, `descriptions`,
   `processingTimeMs`, `visionModel`).

#### Volič režimu (`modalityBridgeVisionMode`)

| Režim      | Výchozí | Chování                                                                                                                                                                                                                                                                                                                        |
| ---------- | ------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `auto`     | ✔       | Původní heuristika beze změny (#6640/#7204): modely mimo kombinaci / modely `auto/` se přesměrují na nejlepší model podporující obraz, pokud původní model již nemá použitelné přihlašovací údaje (pak se použije popis); cíle kombinací vždy používají popis.                                                                 |
| `describe` |         | Vždy použije popis — blok přesměrování se zcela přeskočí; odpovídá vždy model zvolený uživatelem.                                                                                                                                                                                                                              |
| `reroute`  |         | Vynutí přesměrování: kontrola zachování modelu s přihlašovacími údaji se obejde. Kontrola přihlašovacích údajů **cíle** přesměrování však stále platí — pokud neexistuje použitelný cíl podporující obraz, požadavek přejde k popisu, aby se nezpracované obrázky nikdy nedostaly k backendu podporujícímu pouze text (#8430). |

Vynucené režimy provedou zkratku **předtím**, než se spustí automatická heuristika; chování režimu `auto`
je bajtově totožné s guardrailem před PR-1.

#### Prompt popisu zohledňující úlohu (`modalityBridgeVisionTaskAware`)

Výchozí hodnota je **true**. `composeVisionPrompt()` (`visionBridgeHelpers.ts`) připojí
text **poslední zprávy uživatele** (zkrácený na 500 znaků) k základnímu
promptu popisu, čímž popis zaměří na to, na co se uživatel skutečně ptal
(vzor codex-vision-proxy), a požádá model pro zpracování obrazu o přepis viditelného
textu. Pokud je příznak vypnutý — nebo uživatelský text chybí — použije se základní prompt beze změny.

Vlastní požadavek kompatibilní s OpenAI ve smyčce describe (`callVisionModelSingle()`
v `visionBridgeHelpers.ts`) vždy požaduje `image_url.detail: "high"` —
bezpodmínečně, pro každého volajícího/poskytovatele, bez závislosti na jakémkoli signálu klienta.
Vzorkování s nízkou úrovní detailů zhoršuje přesnost OCR právě u úlohy přepisu
textu, kterou tento prompt požaduje, takže samotné volání describe vždy požaduje vysokou
úroveň detailů bez ohledu na to, jakou úroveň detailů používal původní příchozí požadavek. Toto
ovlivňuje pouze tělo interního požadavku describe; nemění způsob, jakým
OmniRoute předává volajícího vlastní hodnotu `image_url.detail` v primárním požadavku —
tato výchozí hodnota se aplikuje samostatně a pouze pro rozpoznané klienty OpenCode ve
funkci `defaultImageDetail()` (`open-sse/handlers/chatCore/upstreamBody.ts`). Větev
s přenosovým formátem Anthropic ve vlastní smyčce describe nemá pole `detail`
a žádná z těchto výchozích hodnot ji neovlivňuje.

#### Limit výstupu describe (`modalityBridgeVisionMaxChars`)

| Klíč                           | Výchozí hodnota | Rozsah             |
| ------------------------------ | --------------- | ------------------ |
| `modalityBridgeVisionMaxChars` | `0`             | `0` nebo 100–50000 |

`0` (výchozí hodnota) znamená **bez limitu** — popis vrácený funkcí
`callVisionModel()` se předá beze změny, čímž se zachová stávající
chování. Jakákoli hodnota v rozsahu 100–50000 popis zkrátí a přidá
příponu `…` před jeho vložením zpět ve formátu `[Image N]: <description>`
(`VisionBridgeGuardrail.preCall()` v `src/lib/guardrails/visionBridge.ts`).
Pro úlohy OCR s vysokou mírou detailů, u nichž následný model potřebuje
úplný přepis, tuto hodnotu zvyšte; chcete-li omezit spotřebu tokenů u upovídaných modelů
pro zpracování obrazu, snižte ji. Pole na řídicím panelu se nachází v panelu Advanced na kartě Vision
(`modality-bridge-max-chars` v `ModalityBridgeVisionTab.tsx`) a jakoukoli
hodnotu mezi 1 a 99 zvýší na minimální hodnotu 100, zatímco explicitní `0`
ponechá beze změny — `0` je sama o sobě platnou hodnotou Zod
(`z.union([z.literal(0), z.number().int().min(100).max(50000)])`), nikoli pouze
výchozí hodnotou „nenastaveno“.

#### Mezipaměť describe (`modalityBridge/bridgeCache.ts`)

Procesně sdílená mezipaměť LRU + TTL v paměti pro výstupy describe.
Klíč = `sha256(imageRef + composedPrompt + configuredBridgeModel)` s
rámcováním pomocí prefixů délek (bez kolizí hranic polí). Komponentou modelu je
**nakonfigurovaný** model bridge, nikoli model, který skutečně odpověděl —
`callVisionModel` může interně použít záložní model a vytváření klíče pro každý pokus by
mezipaměť fragmentovalo. Neúspěšné operace describe se nikdy neukládají do mezipaměti. Nastavení:

| Klíč                            | Výchozí hodnota | Rozsah  |
| ------------------------------- | --------------- | ------- |
| `modalityBridgeCacheEnabled`    | `true`          | —       |
| `modalityBridgeCacheTtlMinutes` | `60`            | 1–1440  |
| `modalityBridgeCacheMaxEntries` | `200`           | 10–5000 |

#### Normalizace vzdálených obrázků (vlastní smyčka describe/načtení base64)

Když bridge sám načte **vzdálený** obrázek — pro vlastní volání describe Anthropic
a převod do base64 ve formátu přenosu claude
(`ensureBase64ImagesForClaudeWire`), v obou případech prostřednictvím
`fetchRemoteImageAsDataUri()` v `visionBridgeHelpers.ts` — výsledný datový
identifikátor URI je před vložením do požadavku modelu pro zpracování obrazu zpracován funkcí
`normalizeDataUri()`
(`open-sse/utils/imageNormalize.ts`). Nadměrně velké obrázky jsou zmenšeny tak, aby jejich **delší strana měla 2048 px** (což odpovídá
limitu změny velikosti, který již OpenAI/Anthropic uplatňují na straně serveru), čímž se sníží
objem nahrávaných dat a latence, aniž by se změnilo to, co model pro zpracování obrazu vidí. Změna velikosti
používá `sharp`, načítaný dynamickým importem: na platformě, kde se jeho nativní
binární soubor nepodaří načíst, funkce `normalizeDataUri()` **nikdy nevyvolá výjimku** — místo toho
propustí původní bajty beze změny, takže cesta describe/převodu do base64
zůstane vždy funkční. Data, která nejsou obrázkem (načtení, které nevrátilo
dekódovatelný obrázek), jsou rovněž předána beze změny. Tato normalizace
je omezena na obrázky, které bridge načítá pro své vlastní volání — nikdy
se neaplikuje na nezpracovanou předávanou datovou část volajícího, což je v souladu
s principem změn pouze po výslovném přihlášení (Pevné pravidlo č. 20).

#### Schéma nastavení + migrace

Nové klíče `modalityBridge*` jsou validovány pomocí Zod v `updateSettingsSchema`
(`src/shared/validation/settingsSchemas.ts`): `modalityBridgeVisionEnabled`,
`modalityBridgeVisionMode`, `modalityBridgeVisionModel`,
`modalityBridgeVisionTaskAware`, `modalityBridgeVisionPrompt`,
`modalityBridgeVisionTimeout`, `modalityBridgeVisionMaxImages`,
`modalityBridgeVisionMaxChars`, trojice `modalityBridgeCache*` a skupina
`modalityBridgeAudio*` používaná komponentou Audio Bridge. Migrace
`141_modality_bridge_settings.sql` kopíruje existující starší hodnoty
`visionBridge*` do odpovídajících nových klíčů (idempotentně, nikdy nepřepíše
hodnotu `modalityBridge*` nastavenou operátorem); starší klíče zůstanou po dobu
jednoho cyklu vydání akceptovány jako záložní zdroj pro čtení.

#### Hlavička pro transparentnost + statistiky

Odpovědi transformované pomocí describe obsahují
`x-omniroute-modality-bridge: image->text;model=<visionModel>;parts=<n>`
(vytvořenou funkcí `buildModalityBridgeHeader()` v `modalityBridge/bridgeStats.ts`,
přidanou funkcí `withModalityBridgeHeader()` v `src/sse/handlers/chatHelpers.ts`).
Přesměrované požadavky neobdrží **žádnou** hlavičku — datová část nebyla změněna a záměna modelu
je již viditelná v poli `model` těla odpovědi.

`GET /api/modality-bridge/stats` (ověření správy, stejná úroveň jako
`GET /api/settings`) vrací čítače jednotlivých modalit uložené v paměti
`{ attempts, successes, bridged, cacheHits, failures, totalLatencyMs,
latencySamples, averageLatencyMs, lastUsedAt }` pro `vision`, `audio` a
`video`. `averageLatencyMs` používá jako jmenovatel `latencySamples`, nikoli všechny
pokusy; operace bez měření času nevytváří umělý vzorek s nulovou dobou
v milisekundách. `bridged` zůstává zpětně kompatibilním aliasem pro úspěšné
převody; neúspěšné pokusy jeho hodnotu nezvyšují.
Čítače se záměrně resetují při restartu procesu
(telemetrie, nikoli účtování).

#### Konfigurace řídicího panelu

Vyhrazená stránka ovládacího panelu je
`/dashboard/settings/modality-bridge`. Její karty `Vision`, `Audio`
a `Video`, dostupné prostřednictvím URL, při přepínání hodnoty `tab` zachovávají parametry dotazu.
Karta Vision zpřístupňuje povolení funkce, režim, výběr modelu (včetně automatického
výchozího nastavení), výzvy zohledňující úlohu, pokročilé limity časového limitu, obrázků, délky popisu a mezipaměti,
běhová
počítadla a chráněný ukázkový požadavek. Aktivní je také karta Audio: zpřístupňuje
povolení funkce, výběr modelu pouze pro STT s možností Auto, limity časového limitu a maximální délky klipu, zvuková
počítadla a ukázkový test `input_audio`. Karta Video je funkční: hlásí
běhový stav FFmpeg/ffprobe — jeden ze čtyř explicitních stavů uživatelského rozhraní (`unknown`, když
kontrola probíhá nebo ji nebylo možné dokončit, `restricted` na hostiteli
ovládacího panelu mimo loopback, kde se kontrola přeskočí na straně klienta, `unavailable` po provedení
kontroly a potvrzení nedostupnosti, nebo `available` s verzemi FFmpeg/ffprobe) — trvale ukládá
limity povolení, modelu, snímků, videa a časového limitu, filtruje výběr modelů pouze na modely
podporující obrazové vstupy a zpřístupňuje počítadla videa.

Původní karta Vision Bridge v nastavení AI nyní slouží jako kompatibilní odkaz na
novou stránku; již neobsahuje druhou kopii formuláře. Media Providers také
propojuje pracovní postupy Image-to-Text a Speech-to-Text s odpovídajícími kartami Modality
Bridge, aniž by odstraňovalo stávající testovací prostředí Speech-to-Text.

**Vynechání kontroly přijetí pro vlastní smyčku:** když je volání popisu směrováno přes
vlastní smyčku `/v1` služby OmniRoute (nestandardní model poskytovatele), dílčí požadavek odesílá
`x-omniroute-admission-bypass: internal` a je ověřen pomocí vyřešeného
přihlašovacího údaje vlastní smyčky — lokálního zástupného klíče `sk_omniroute` v lokálním režimu nebo
klíče prostředí `OMNIROUTE_API_KEY` / `ROUTER_API_KEY` nakonfigurovaného
provozovatelem (#1350), aby nasazení s
`REQUIRE_API_KEY=true` mohla nadále spouštět volání popisu. Toto vynechání je
respektováno pouze pro tyto přesné přihlašovací údaje, takže externí klienti nemohou použít
hlavičku k přeskočení kontroly přijetí.

Starší výchozí hodnoty jsou v `src/shared/constants/visionBridgeDefaults.ts`;
nové výchozí hodnoty režimu, zohlednění úlohy a mezipaměti společně s resolverem nastavení jsou v
`src/shared/constants/modalityBridgeDefaults.ts`. Ochranná vrstva zpřístupňuje
volbu konstruktoru `deps`, aby testy mohly vkládat falešné implementace `getSettings` a
`callVisionModel`.

### Audio Bridge (`audioBridge.ts`) — Modality Bridge PR-3

Zachytává chatové požadavky obsahující zvuk předtím, než dorazí k cíli, o kterém není
známo, že přijímá zvukový vstup. Chatový požadavek nikdy nepřesměrovává: zvukové části jsou
přepsány prostřednictvím stávajícího multipart endpointu kompatibilního s OpenAI a
zvolený chatový model pokračuje s textovými přepisy.

Průběh:

1. Určí `supportsAudio` prostřednictvím `getResolvedModelCapabilities()`. Explicitní
   metadata registru poskytovatelů mají přednost, následují statická metadata modelu a poté synchronizované
   `modalities_input`. Deklarovaný seznam vstupů bez `audio` znamená `false`; pokud
   neexistují žádné informace o schopnostech, zůstává hodnota `null`. Hodnoty `false` i `null` aktivují
   konzervativní můstek, zatímco `true` jej obchází.
2. Načte nastavení `modalityBridgeAudio*` a extrahuje spojitelné zvukové části nejvyšší úrovně
   ze všech zpráv prostřednictvím sdíleného detektoru `detectMediaParts()`.
   Podporované formáty přenosu jsou OpenAI `input_audio`, `audio_url` a
   `source.media_type: "audio/*"`. Vnořený zvuk je detekován pro směrování, ale není
   cestou spojování odstraněn. Množství zpracování je omezeno hodnotou `modalityBridgeAudioMaxClips`;
   pozdější části zůstanou nedotčené.
3. Použije nakonfigurovanou hodnotu `provider/model`, nebo nechá `selectAudioBridgeModel()` projít
   `AUDIO_TRANSCRIPTION_PROVIDERS` ve stabilním pořadí katalogu a vybrat první
   model s použitelným aktivním přihlašovacím údajem poskytovatele.
4. `callAudioTranscription()` převede zvuk ve formátu base64/data-URI na multipart
   `file`, nebo stáhne vzdálenou adresu `audio_url` prostřednictvím ochrany odchozích spojení povolující pouze veřejné cíle,
   s připnutím DNS a limitem 25 MB. Poté odešle metodou POST soubor a vybraný
   model do lokální vlastní smyčky `/v1/audio/transcriptions`, ověřené pomocí
   `resolveSelfLoopBearer()`. Stávající trasa přepisu provede běžné
   vyhledání přihlašovacích údajů, zpracování doby pozastavení a limitů požadavků a předání poskytovateli.
5. Úspěšná volání nahradí příslušné části textem `[Audio N]: <transcript>`. Volání
   probíhají pomocí `Promise.allSettled`: jednotlivé selhání zachová původní
   zvukovou část (smlouva #4012). Pokud všechna volání selžou a je prokázáno, že cíl má
   `supportsAudio === false`, části se změní na
   `[Audio N]: (unavailable — no STT provider connected)` (smlouva #8430). U
   neznámého cíle (`null`) zůstane při selhání všech volání obsah nedotčený. Prokázaný
   čistě textový cíl bez použitelného přihlašovacího údaje STT obdrží stejnou explicitní
   zástupnou hodnotu bez provedení síťového volání.

Úspěšné přepisy používají celoprocesovou mezipaměť LRU/TTL služby Modality Bridge. Klíč
kombinuje odkaz na zvuk, stabilní označení operace `audio-transcription`
a vybraný model STT; selhání se nikdy neukládají do mezipaměti. Pokusy o zpracování zvuku aktualizují
sdílená počítadla `bridged`, `cacheHits`, `failures` a `lastUsedAt`.
Transformované odpovědi obsahují
`x-omniroute-modality-bridge: audio->text;model=<sttModel>;parts=<n>`; nedotčené
požadavky neobdrží segment Audio Bridge.

Běhová nastavení jsou uložena v databázi a validována pomocí Zod:

| Klíč                          | Výchozí hodnota | Rozsah           |
| ----------------------------- | --------------- | ---------------- |
| `modalityBridgeAudioEnabled`  | `true`          | —                |
| `modalityBridgeAudioModel`    | `""`            | Auto nebo ID STT |
| `modalityBridgeAudioTimeout`  | `60000`         | 1000–300000      |
| `modalityBridgeAudioMaxClips` | `3`             | 1–10             |

Sdílená mezipaměť je nadále řízena nastaveními `modalityBridgeCacheEnabled`,
`modalityBridgeCacheTtlMinutes` a `modalityBridgeCacheMaxEntries`.

### Video Bridge (`videoBridge.ts`, `videoBridgePipeline.ts`)

Zachytává části videa na nejvyšší úrovni v `messages` rozhraní Chat Completions a v
`input` rozhraní Responses API před voláním cíle bez známé nativní podpory videa.
Podporované formáty jsou `input_video`, `video_url`, `video_source`, URL adresy HTTPS
a datové URI `data:video/*;base64,...`. Samotné názvy souborů v textu nejsou
považovány za video.

`VideoBridgeGuardrail.preCall` (`videoBridge.ts`) zajišťuje průchod požadavkem,
kontrolu schopností/zásad, agregaci v rámci požadavku a datovou část odpovědi.
Zpracování jednotlivých videí — získání dat, mezipaměť kompletního výsledku,
popis sekvence snímků (který slučuje případný volajícím deklarovaný přepis zvuku)
a metriky/přerušení/úklid jednotlivých pokusů — je skryto za `processVideoPart`
v `videoBridgePipeline.ts`, které je voláno jednou pro každou část videa uvnitř
smyčky `preCall`. Tento modul také definuje explicitní hranice portů
`VideoMediaBrokerPort` (získávání bajtů a extrakce vzorkovaných snímků),
`VideoAudioTranscriptionPort` (sloučení volajícím deklarovaného přepisu zvuku
s titulky vzorkovaných snímků) a `VideoDrilldownPort` (hranice perzistence
podrobného rozboru snímků; zatím není zapojena do `processVideoPart` — záznamy
podrobného rozboru dnes zapisuje pouze samostatná trasa
`/api/modality-bridge/video/drilldown`).

Veřejná cesta požadavku `/v1` nikdy neimportuje ani nespouští podproces. Vzdálená
videa se stahují s limitem 50 MiB; vložená videa v base64 mají konzervativní
limit 36 MiB dekódovaných dat na jedno video, aby se obálka
modelu/zpráv/rámcování vešla do veřejného limitu 50 MiB pro přijímání požadavků
JSON. Délka vložených dat a odhad dekódované velikosti se kontrolují před
alokací. Pro počáteční vzdálenou URL adresu i každé přesměrování je vyžadováno
HTTPS a používá se stávající ochrana odchozích spojení pouze na veřejné adresy
s připnutím DNS. Bajty poté překročí přesnou interní hranici zprostředkovatele
`POST /api/modality-bridge/video/extract`. Tato trasa je současně `LOCAL_ONLY`
a `SPAWN_CAPABLE`, přijímá pouze ověřený požadavek v rámci procesu z důvěryhodného
rozhraní loopback a nikdy nepřijímá URL adresu, cestu v souborovém systému,
spustitelný soubor ani seznam argumentů. Zpracování limitu velikosti těla API
a inkrementální čtečka těla obslužné rutiny nezávisle vynucují limit vstupu
zprostředkovatele 50 MiB. Jeho omezená fronta provádí vždy jednu extrakci,
umožňuje čtyři čekající úlohy a omezuje objem čekajících vstupních dat na
100 MiB.

Uvnitř zprostředkovatele čte `ffprobe` soukromý místní soubor; pevný seznam
povolených formátů vylučuje formáty playlistů a manifestů. U povolených
kontejnerů rodiny MOV zůstávají externí datové reference MOV ve výchozím
nastavení zakázány a pevně stanovený příkaz je nepovoluje. `ffprobe` i `ffmpeg`
používají seznam povolených protokolů omezený pouze na `file`, jedno vlákno,
pevná pole argumentů, žádný shell a spustitelné soubory vyhledané pomocí `PATH`.
Proudy s připojeným obrázkem obalu nejsou kandidáty k přehrání. Všechny
přehrávatelné proudy musí splňovat limity a před deterministickým záložním
výběrem proudu s nejnižším indexem se upřednostňuje explicitní výchozí proud.
Videa jsou omezena na 600 sekund, 8 192 pixelů v každém rozměru a 33 554 432
zdrojových pixelů. FFmpeg vzorkuje 1–16 prostředních snímků ve formátu JPEG,
zmenšuje delší hranu nejvýše na 1 024 pixelů bez zvětšování menších vstupů
a nikdy nepřijímá URL adresu. Výchozí metodou vzorkování je `uniform`. Volitelné
zásady `scene_aware` a experimentální `segment_aware` provedou jeden dodatečný
pevně stanovený průchod FFmpeg přes již ověřený místní proud, vyberou omezený
počet časových značek scén `showinfo` a při selhání detektoru, vypršení časového
limitu, chybném výstupu nebo prázdné sadě kandidátů deterministicky přejdou ke
stejným rovnoměrným středovým bodům. Režim zohledňující segmenty přiděluje vzorky
středových bodů úměrně ověřeným intervalům scén; důkazy režimu zohledňujícího
segmenty a chování při použití záložního postupu jsou podrobně popsány níže.
Pevný limit 16 snímků se u každé zásady uplatňuje po výběru. Pokud má požadavek
se zohledněním scén rozpočet pouze jednoho snímku, použije rovnoměrný středový
bod aktivního okna celého videa nebo zaměřeného okna a uvede
`policyEffective: uniform`: jediný vybraný snímek scény nemůže zachovat oba
časové konce. Volající může volitelně zadat konečné zaměřené okno (`start`/`end`
v sekundách); hranice se omezí na dobu trvání média, obrácená nebo nekonečná
okna se odmítnou a všechny zásady vzorkování se použijí pouze v normalizovaném
intervalu. Výsledné okno je zahrnuto v metadatech vzorkování a v nedůvěryhodné
předponě popisu, aby navazující modely mohly odlišit zaměřený úsek od celé
časové osy.

Sémantické zaměření titulků je samostatné, explicitní nastavení. Výchozí režim
analýzy `full` zachovává stávající prompt pro snímky a nikdy nepředává text
požadavku modelu pro titulky. V režimu `focused` načte most pouze nejnovější
neprázdný uživatelský text `text`/`input_text` ze stejného kontejneru Chat nebo
Responses, normalizuje jej do NFC, sloučí řídicí znaky a bílé znaky a omezí jej
na 500 kódových bodů Unicode. Prázdný výsledek způsobí návrat k přesnému promptu
režimu `full`. Použitelná nápověda se serializuje jako JSON ve vyhrazeném bloku
nedůvěryhodného uživatelského kontextu a smí pouze upřednostnit pozorovatelné
podrobnosti; nemůže potlačit samostatné varování před následováním pokynů
viditelných nebo slyšitelných v médiu. Textové zaměření nikdy neodvozuje
`start`/`end` ani nemění časový vzorkovač.

#### FU-07 strukturální důkazy segmentů

`segment_aware` používá jeden omezený průchod předběžné analýzy přes již ověřený
místní proud videa. Pevný řetězec filtrů nejprve zmenší šířku nejvýše na
320 pixelů, detekuje změny scén a zamrzlé intervaly a poté vzorkuje frekvencí
1 snímek za sekundu za účelem analýzy rozmazání, průměrného jasu a
prostorových/časových informací. Průchod je omezen na 600 strukturálních vzorků,
jedno vlákno FFmpeg/filtru, stejné seznamy povolených protokolů omezené pouze na
`file` a povolených kontejnerů, limit výstupu procesu 1 MiB a nejvýše 30 sekund
v rámci sdíleného přerušení/termínu zprostředkovatele. Z požadavku nikdy nepřijímá
příkaz, filtr, cestu ani URL adresu.

Strukturální hodnoty představují deterministické důkazy vzorkování, nikoli sémantické
porozumění videu. Neodvozují subjekty, akce, titulky, řeč ani záměr uživatele.
Hranice scén a zamrznutí vytvářejí segmenty; pokrytí zamrznutí, rozmazání,
expozice, prostorové detaily a časové změny ovlivňují pouze způsob rozdělení
stávajícího rozpočtu 1–16 snímků. Zcela zamrzlý segment je omezen na jeden snímek,
zatímco nezamrzlé segmenty soutěží o zbývající rozpočet. Když je hranic více
než snímků, zachová se rovnoměrné pokrytí časové osy, aby rychlé střihy na začátku
nemohly skrýt dlouhý koncový segment. Hranice scén v rámci 1sekundového
analytického rozlišení hranice zamrznutí se sloučí.

Chybějící filtry, poškozené/prázdné důkazy, chyba detektoru nebo vypršení časového
limitu omezené předběžné analýzy vedou k otevřenému selhání a použití přesné
zásady rovnoměrných středových bodů. Přerušení volajícím nebo termín brokeru
nevede k otevřenému selhání: ukončí probíhající podproces, zabrání pozdější
extrakci snímků a soukromý dočasný strom je odstraněn v bloku `finally`.

`scripts/perf/video-bridge-fu07-eval.ts` generuje deterministické skutečné
testovací vstupy FFmpeg pro úsporu volání titulků po deduplikaci, rozdělení
rozpočtu při intenzivním pohybu, důkazy o rozmazání/expozici/SI-TI, rychlé střihy
s dlouhým koncem a falešně pozitivní výsledky při postupném prolínání. Zaznamenává
reálný čas předběžné analýzy a tam, kde je k dispozici `/usr/bin/time`, také čas
CPU podřízeného procesu a špičkové využití RSS. Jeho kontroly kvality jsou pouze
strukturálními orákuly. Kvalita skutečného modelu titulků zůstává `HOLD`, protože
tento testovací systém nemá autorizovaný koncový bod ani pevně daného hodnotitele.
Finanční úspory rovněž zůstávají `HOLD`, pokud parametr
`--caption-cost-per-call-usd` neposkytne explicitní kladný odhad nákladů na jedno
volání; skript žádný z těchto výsledků nikdy nevytváří uměle.

Každý snímek je omezen na 4 MiB, všechny nezpracované snímky dohromady na 23 MiB
a serializovaná odpověď brokeru na 32 MiB. Soukromý dočasný adresář je odstraněn
v bloku `finally`. OmniRoute nepřibaluje FFmpeg a nepřijímá vlastní cestu ke
spustitelnému souboru. Před vytvořením titulků provede most konzervativní vizuální
deduplikaci: každý JPEG je zmenšen na 16×16 vyrovnávací paměť ve stupních šedi
a porovnán pouze s posledním zachovaným snímkem. Pro požadovaný rozpočet titulků
vyšší než jeden snímek poskytne extrakce omezený fond kandidátů o velikosti
nejvýše dvojnásobku tohoto rozpočtu a nikdy více než 16 snímků. Požadovaný limit
se použije až po deduplikaci, přičemž při závěrečném ztenčování zůstanou zachováni
první a poslední vybraný kandidát, pokud rozpočet činí alespoň dva snímky.
Verzovaná zásada
`grayscale-16x16-mean-cells-v2` používá vyšší z hodnot průměrného rozdílu jasu
a podílu buněk miniatury, jejichž normalizovaný rozdíl je alespoň 0,05. Prahová
hodnota duplicity je konstanta 0,04, zvolená kvůli předvídatelnosti namísto
zpřístupnění jako běhové nastavení. Tento sekundární
vysoce kontrastní signál zachovává drobný pohyb a změny viditelného textu, které
může porovnání založené pouze na průměru skrýt. Chyby komparátoru nebo dekodéru
vedou k otevřenému selhání a zachování pokrytí. Výstupní metadata oddělují
extrahované kandidáty, úspěšně použité snímky a odstraněné vizuální duplicity.

Explicitně označená část videa může požádat o kontaktní list s časovými značkami.
Most vytvoří mřížku JPEG nejvýše se 4 sloupci a 16 snímky. Každá buňka o velikosti
512 pixelů vypálí časovou značku svého zdroje do vysoce kontrastního spodního
pruhu, zatímco stejné časové značky zůstanou v textových metadatech pro následné
přiřazení a audit. Kompletní JPEG zůstává omezen na 32 MiB. Pokud `sharp` nedokáže
mřížku dekódovat nebo sestavit, most se vrátí k jednotlivým snímkům JPEG;
přerušení klientem se nadále přenese přes operaci s kontaktním listem.

Důkazy pro povýšení jsou záměrně odděleny od syntetického mikrobenchmarku
kompozice. `scripts/perf/video-bridge-contact-sheet-eval.ts` definuje
A/B testovací systém s verzovaným schématem pro skutečné modely počítačového
vidění kompatibilní s OpenAI. Měří tokeny hlášené poskytovatelem, celkovou reálnou
latenci (včetně sestavení kontaktního listu), počet volání modelu a zachování
faktů definovaných manifestem. Nezpracované odpovědi modelu se do zprávy
nezapisují; uchovávají se pouze otisky SHA-256 a ID odpovídajících faktů. Testovací
systém neprovede žádné síťové ani placené volání modelu, pokud není předán parametr
`--execute-real` a nakonfigurovány `--model`, `OMNIROUTE_BASE_URL`
a `OMNIROUTE_API_KEY`. Bez takového explicitního skutečného běhu zůstává jeho
strojově čitelný verdikt `HOLD`; samotná syntetická měření objemu dat/počtu volání
nejsou důkazem pro povýšení.

Volající mohou k podporované části videa připojit volitelné pole
`transcript.cues`, pokud již mají k dispozici zarovnaný text. Každý záznam musí
obsahovat `text`, konečný interval `start`/`end` v rámci zjištěné délky a povolený
`source` (`client`, `embedded` nebo `audio-bridge`); výchozí hodnota `confidence`
je `1` a musí zůstat mezi `0` a `1`. Přesné duplikáty záznamů se sloučí.
OmniRoute na základě těchto metadat nikdy nespouští přepis: ověřené záznamy jsou
zkopírovány do popsaného výsledku spolu se zdrojem, mírou spolehlivosti a intervalem
a vykresleny jako nedůvěryhodná pozorování společně s titulky snímků. Neplatný
text, text mimo rozsah nebo text bez informací o původu je odmítnut, namísto aby
byl smíchán s proudem titulků. Pole `source` je v současnosti deklarováno
volajícím, nikoli ověřeno serverem: OmniRoute vynucuje, aby hodnota byla jedním
ze tří povolených řetězců, ale dosud kryptograficky nepotvrzuje, že označení
`embedded` nebo `audio-bridge` skutečně pochází z extrakce vlastněné serverem.
Dokud nebude toto ověřování implementováno, považujte `source` za nedůvěryhodnou
nápovědu; nezakládejte na něm rozhodování o autorizaci.

Pokročilý volající může pro stejné video poskytnout již autorizovanou stopu
`audioTranscript`. Slučovací vrstva zpracuje vizuální a zvuková pozorování se
společným časovým limitem a signálem přerušení, seřadí je na společné časové ose,
sloučí přesné duplicity a vrátí částečný výsledek, pokud uspěje pouze jedna
strana. Neplatná stopa `audioTranscript` vede k tomuto částečnému výsledku —
vizuální popis se zachová a zvuková větev zaznamená sanitizovaný kód selhání —
místo aby selhalo celé video. Dostupnost jednotlivých větví, příznak částečného
výsledku a sanitizované kódy selhání se zachovají v popsaném výsledku, v
metadatech ochranných mechanismů (`audioFusionRuns`/`audioFusionPartials`/
`audioFusionFailureCodes`), v metadatech mezipaměti výsledků a v čítačích
slučování mostu. Výchozí cesta Video Bridge nevyvolává převod řeči na text ani
nestahuje druhou kopii média; bez této explicitní stopy zůstává pouze u videa.

**Uchovávání přepisů (#12150 P1).** Toto se použije automaticky vždy, když
Video Bridge (který je sám volitelný) vykreslí položku přepisu — neexistuje
žádný samostatný příznak uchovávání. Když požadavek vykreslí libovolnou položku
přepisu (volajícím deklarovaný `transcript` nebo sloučený `audioTranscript`),
ochranný mechanismus ji označí jako `videoBridgeObserved` a vytvoří redigovanou
stínovou kopii popisu videa — identické vykreslení, ve kterém je volný text
každé položky nahrazen řetězcem `[redacted-video-transcript]`. Tato kopie
vzniká nahrazením strukturovaného pole položky před sestavením řetězce (nikdy
parsováním sloučeného textu, takže nemůže přežít žádný obsah položky —
nepřátelský ani běžný, včetně textů obsahujících `]`, jako jsou
`[inaudible]`/`[music]`). V uloženém těle požadavku v protokolu volání se každá
textová část odvozená z videa nahradí touto redigovanou stínovou kopií na
základě shody obsahu; kotva `fullText` se znovu načte z dokončené datové
struktury ochranného mechanismu před voláním, takže shoda uspěje i poté, co
pozdější řetězené ochranné mechanismy (maskování osobních údajů a přihlašovacích
údajů s prioritami 10/95) přepíší text popisu na místě, a poté, co vložení
systémové výzvy, předání kontextu nebo paměti změní strukturu pole zpráv. Tělo
odeslané modelu se nemění. Pozorovaný požadavek také nevytváří žádnou trvalou
Memory (extrakce odvozená z požadavku i odpovědi se přeskočí), takže ani vlastní
odpověď modelu nemůže zopakovat text přepisu do Memory.

Stále otevřené oblasti uchovávání, sledované pro navazující práci (**P2**,
#12430): nezpracovaný snímek klientského požadavku před ochrannými mechanismy v
artefaktu podrobného protokolu; bezpečné zamítnutí pokračování
`previous_response_id`; interní volání odvozených výzev, která vkládají přepis
do syntetizovaného řetězcového zadání (fáze zpracování, předání kontextu); a tělo
odpovědi / kopie odpovědi modelu v sémantické mezipaměti, pokud odpověď přepis
cituje. Jde o nezpracované či odpověďové nebo volitelné oblasti mimo rozsah P1,
který pokrývá uložené tělo požadavku + Memory.

Interní životní cyklus `/api/modality-bridge/video/drilldown` je samostatná
mezipaměťová vrstva pro zpětnou smyčku ověřovanou tokenem. Každá operace také
vyžaduje kanonický neprůhledný identifikátor principála. Než bude produkční
volající povolen, musí tento identifikátor odvodit z ověřeného tenanta a nikdy
nesmí předávat hodnotu zvolenou klientem. Klíče mezipaměti vážou tohoto
principála na kanonické identifikátory relace a odkazu na video, ukládají pouze
jejich klíče odvozené pomocí SHA-256 a omezují čtení i mazání na stejného
principála. Mezipaměť ukládá nejvýše 16 odvozených snímků JPEG na položku,
nechá je vypršet po deseti minutách a podporuje omezené čtení pomocí
`start`/`end` nebo explicitní odstranění relace.

Každý principál je omezen na 16 položek a 64 MiB kanonických dat JPEG. Tyto
limity jsou nezávislé na globálním stropu 64 položek / 256 MiB: tlak na kvótu
principála vyřadí před zvažováním globálního vyřazování podle LRU pouze nejméně
nedávno použité položky daného principála. Platnost vypršených položek se při
aktivitě mezipaměti odstraní z účtování principála i globálního účtování,
zatímco zrušení a selhání validace nepotvrdí částečnou náhradu.

Mezipaměť odmítá nekanonické Base64, nadbytečné doplnění, média jiného typu než
JPEG, poškozené nebo zkrácené soubory JPEG a soubory JPEG, které během omezeného
dekódování celého obrázku pomocí `sharp` vyvolají varování. Každý přijatý obrázek
znovu zakóduje jako kanonický JPEG, odvodí šířku a výšku z dekódovaných bajtů
namísto důvěry v pole volajícího a odstraní veškeré koncové polyglotní bajty
místo jejich uchování. Do obou kvót se započítává pouze omezená kanonická
komprimovaná vyrovnávací paměť. Limit přenosu JSON zahrnuje režii Base64 pro
strop dekódovaného vstupu 32 MiB. Každý uložený odvozený výstup zaznamenává
ověřený formát a rozlišení JPEG, zásady vzorkování, verzi odvození, čas vytvoření,
serverem vypočítaný hash obsahu a hashovaný nadřazený odkaz spolu s hashem obsahu
nadřazeného objektu od důvěryhodného volajícího. Zrušení se kontroluje mezi
asynchronními fázemi dekódování a výpočtu hashe před atomickým potvrzením do
mezipaměti.

Tato etapa zatím nepřipojuje k této trase produkčního producenta a neposkytuje
výběr variant s více rozlišeními. Transparentní cesta požadavku Video Bridge
proto nevyžaduje žádnou dodatečnou práci, zatímco odvození principála vázané na
tenanta a úplný životní cyklus FU-08 s více rozlišeními zůstávají explicitní
navazující prací a nejsou dokumentovány jako dokončené chování.

Snímky jsou postupně opatřovány popisky pomocí nakonfigurovaného modelu Video. Prázdné
přepsání nastavení Video zdědí nastavení Vision; pokud jsou obě prázdná, automatický
směrovač Vision vybere efektivní model podporující obraz. Úspěšné popisky
nahradí původní část stabilním prefixem `[Video description:`, který také
označuje text jako nedůvěryhodné pozorování odvozené z média a sděluje navazujícím
modelům, aby se neřídily pokyny nalezenými v médiu. Klíče mezipaměti popisků snímků
zahrnují bajty JPEG, prompt, časové razítko a efektivní model; ukládají se pouze úspěšné
popisky. Záznamy mezipaměti uchovávají skutečný model, který úspěšně vytvořil výstup,
včetně záložního modelu; pokud byly různé snímky vytvořeny různými modely,
bridge hlásí `mixed`. Při zásahu mezipaměti se znovu použije identita tohoto modelu,
namísto jejího přeznačení podle požadovaného plánu směrování. Mezipaměť výsledků
pro celé video je klíčována podle všech vstupů, které mění výstup — promptu, efektivního
modelu, zásad vzorkování, počtu snímků, režimu sémantické analýzy, otisku SHA-256
normalizované nápovědy zaměření, okna zaměření, `transcript`,
`audioTranscript` a příznaku kontaktního archu — takže změna kterékoli z těchto
dimenzí způsobí minutí mezipaměti, nikdy opětovné použití zastaralého výsledku. Verze,
prahová hodnota a omezený počet kandidátních snímků zásad vizuální deduplikace jsou
rovněž explicitně uvedeny v klíči a metadatech mezipaměti výsledků; změna zásad proto
nemůže znovu použít zastaralý popis celého videa. Metadata mezipaměti výsledků v4
uchovávají režim a otisk, nikdy nezpracovanou uživatelskou úlohu. Metadata guardrailu
uvádějí požadovaný i efektivní režim analýzy; požadovaný režim `focused` bez
použitelného uživatelského textu je vykázán jako efektivně `full`.

Guardrail extrahuje každou podporovanou část videa, ale popíše nejvýše
`modalityBridgeVideoMaxVideos` videí. U cíle, u kterého je prokázáno
`supportsVideo === false`, se neúspěšná videa a videa nad limitem změní na explicitní
bezpečné textové značky, takže nezůstane žádné nezpracované video. Pokud podpora není
známa, zůstanou tyto části beze změny. Cíle s `supportsVideo === true` bridge
obcházejí. Signál přerušení klientského požadavku se propaguje přes stahování, frontu
brokeru, podprocesy a volání pro tvorbu popisků; přerušení zastaví zpracování mezi
videi a nikdy při selhání nepovolí průchod nezpracovaného média.

Běhová nastavení jsou uložena v DB a validována pomocí Zod:

| Klíč                                | Výchozí hodnota | Rozsah / chování                                                                                         |
| ----------------------------------- | --------------- | -------------------------------------------------------------------------------------------------------- |
| `modalityBridgeVideoEnabled`        | `false`         | Volitelný běhový modul, aktivovaný explicitně                                                            |
| `modalityBridgeVideoAnalysisMode`   | `"full"`        | `full` zachovává obecné popisky; `focused` používá omezený, nedůvěryhodný kontext nejnovějšího uživatele |
| `modalityBridgeVideoModel`          | `""`            | Zdědí model Vision Bridge                                                                                |
| `modalityBridgeVideoFrameCount`     | `8`             | 1–16                                                                                                     |
| `modalityBridgeVideoSamplingPolicy` | `"uniform"`     | `uniform`, `scene_aware` nebo proporcionální `segment_aware`; při selhání detektoru se použije `uniform` |
| `modalityBridgeVideoMaxVideos`      | `1`             | 1–4                                                                                                      |
| `modalityBridgeVideoTimeout`        | `120000`        | 1000–120000 ms                                                                                           |

Starší uložené hodnoty časového limitu Video přesahující 120 sekund jsou omezeny na
termín brokeru; zápisy nových nastavení nad tímto limitem jsou odmítnuty.
`GET /api/modality-bridge/video/runtime` vyžaduje důvěryhodnou, označenou lokální
adresu loopback ještě před autentizací nebo kontrolou běhového prostředí a poté
vyžaduje oprávnění pro správu. Vrací pouze `available`, sanitizované verze
FFmpeg/ffprobe a pevně daný důvod, pokud běhové prostředí není dostupné. Interní
endpoint pro extrakci není veřejné API pro nahrávání: při zaplnění fronty vrací
`503` spolu s `Retry-After`, při odpojení volajícího vrací `499` a při dosažení
pevně stanoveného termínu brokeru vrací `504`. Převedené odpovědi přidávají
`video->text;model=<visionModel>;parts=<videos>` do centrální hlavičky
`x-omniroute-modality-bridge`, aniž by odstraňovaly segmenty Vision nebo Audio.

### Maskování PII (`piiMasker.ts`)

Spouští se v **obou** fázích.

- **`preCall`** naklonuje payload, projde `system`, `messages`, `input` a
  `prompt` (včetně položek ve formě prostého řetězce) a použije `processPII()` (z
  `@/shared/utils/inputSanitizer`) na řetězcová pole `content`/`text`. Když je
  `PII_REDACTION_ENABLED=true`, detekované PII jsou ve výstupním payloadu
  redigovány. To je nezávislé na `INPUT_SANITIZER_MODE` (který řídí pouze
  zásady proti vkládání instrukcí do promptu). Když je redigování vypnuté, volání
  zaznamená počty detekcí bez přepisování obsahu.
- **`postCall`** vytvoří hlubokou kopii odpovědi a spustí `sanitizePIIResponse()`
  spolu s maskováním struktury Responses API (`maskResponsesOutput` — pokrývá
  `output_text` a `output[].content[].text`). Pokud dojde k jakékoli redakci,
  upravená odpověď nahradí původní.

Guardrail nikdy neblokuje; pouze přidává anotace (`meta.detections`,
`meta.redacted`) nebo přepisuje obsah.

### Vkládání instrukcí do promptu (`promptInjection.ts`)

Detekuje nepřátelské struktury v obsahu dodaném uživatelem a vynucuje
nakonfigurované zásady. Chování je řízeno proměnnými prostředí a možnostmi
konstruktoru:

| Nastavení      | Proměnná prostředí                                                                                   | Výchozí hodnota | Účinek                                                                                                                                                                                      |
| -------------- | ---------------------------------------------------------------------------------------------------- | --------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Povoleno       | `INPUT_SANITIZER_ENABLED`                                                                            | `true`          | Při hodnotě `false` se ochranný mechanismus ihned ukončí.                                                                                                                                   |
| Režim          | `INJECTION_GUARD_MODE` / `INPUT_SANITIZER_MODE`                                                      | `warn`          | Zásady pro injekce: `block`, `warn` nebo `log`. (`redact` je přijímáno kvůli zpětné kompatibilitě, ale text injekce **neodstraňuje**; přepis PII v požadavku řídí `PII_REDACTION_ENABLED`.) |
| Práh blokování | Volba `blockThreshold` / `INPUT_SANITIZER_BLOCK_THRESHOLD` (alias `INJECTION_GUARD_BLOCK_THRESHOLD`) | `high`          | Minimální závažnost vyžadovaná k blokování. Při výchozím nastavení slouží střední závažnost pouze k pozorování.                                                                             |

**Priorita režimu** (`getMode`): `options.mode` volajícího →
**přepsání příznakem funkce v DB** `INJECTION_GUARD_MODE` (Dashboard → Settings →
Feature Flags) → proměnná prostředí `INJECTION_GUARD_MODE` → proměnná prostředí `INPUT_SANITIZER_MODE` →
`warn`. Přepsání z řídicího panelu má tedy přednost před proměnnými prostředí, takže uživatelské
rozhraní Feature Flags řídí spuštěný ochranný mechanismus za běhu (bez restartu). Čtení z DB je zabezpečené proti selhání:
pokud skončí chybou, ochranný mechanismus přejde na chování založené na proměnných prostředí, a pokud není
nastaveno žádné přepsání, je chování totožné s vyhodnocením pouze podle proměnných prostředí.

Zdroje detekce:

1. `sanitizeRequest()` z `@/shared/utils/inputSanitizer` (sdílená sada detektorů
   používaná i jinde v pipeline).
2. Vestavěné `DEFAULT_GUARD_PATTERNS` (aktuálně `system_override_inline` a
   `markdown_system_block`, oba se závažností `high`).
3. Volitelné `customPatterns` předané prostřednictvím voleb konstruktoru (řetězce, regulární výrazy
   nebo záznamy `{ name, pattern, severity }`).

Když `mode === "block"` **a** alespoň jedna detekce dosáhne prahové hodnoty
závažnosti, `preCall` vrátí `{ block: true, message: "Request rejected:
suspicious content detected" }`. V režimech `warn`/`log` ochranný mechanismus událost zaznamená, ale
volání povolí. Sdílená pomocná funkce `evaluatePromptInjection()` je rovněž exportována
pro volající, kteří potřebují vyhodnocovat prompty bez použití registru.

**Limit skenování (v3.8.20):** detektor kontroluje pouze **prvních 16 KB**
spojeného textu promptu — `MAX_INJECTION_SCAN_BYTES = 16 * 1024` (16 384 bajtů) v
`src/shared/utils/inputSanitizer.ts`. Funkce `detectInjection()` i
`evaluatePromptInjection()` před spuštěním smyčky vzorů použijí
`slice(0, MAX_INJECTION_SCAN_BYTES)`. Direktivy injekce se nacházejí poblíž začátku vstupu, takže tento
limit omezuje využití CPU/GC regulárními výrazy u payloadů o velikosti stovek KB, aniž by oslabil detekci (viz
#3932, #4041).

### Maskování přihlašovacích údajů (`credentialMasker.ts`)

Spouští se v **obou** fázích a ve výchozím řetězci jako poslední (priorita `95`). Rediguje
známé vzory API klíčů / tajných tokenů z odchozího payloadu (obsah zprávy,
argumenty volání nástrojů, výsledky nástrojů) **i** z odpovědi poskytovatele, takže
přihlašovací údaj vložený do promptu (nebo vrácený ve výsledku nástroje) neunikne
upstream poskytovateli ani zpět klientovi.

- **Pouze s výslovným přihlášením**, stejná konvence jako u redakce PII (související s pevným pravidlem č. 20):
  vypnuto, pokud `settings.credentialRedactionEnabled === true` **nebo**
  `CREDENTIAL_REDACTION_ENABLED=true`. Pokud je vypnuto, ochranný mechanismus neprovádí žádnou akci —
  nikdy neblokuje ani nepřepisuje.
- `redactCredentials()` prochází celý strom payloadu/odpovědi (`walkValue()`,
  bezpečně vůči prototype pollution a cyklům díky `WeakSet`) a nahrazuje shody
  zástupným symbolem `[REDACTED:<type>]`, přičemž klonuje pouze větve, které byly skutečně
  změněny.
- `CREDENTIAL_PATTERNS` pokrývá klíče poskytovatelů LLM (OpenAI, OpenAI-proj,
  Anthropic, Google, Hugging Face, Replicate), tokeny VCS/SaaS (GitHub, Slack,
  Linear, Notion, npm, Postman, Discord), platební klíče (Stripe, Square), cloudové
  klíče (přístupový klíč AWS, Twilio, SendGrid, Mailgun), soukromé klíče / JWT,
  připojovací řetězce obsahující přihlašovací údaje (`mongodb://user:pass@...` atd.) a
  obecný vzor hodnoty hlavičky `Authorization`/`x-api-key`/`api-key`/`apikey`.
  Klíče ve tvaru hlaviček (`authorization`, `x-api-key`, `api-key`,
  `apikey`) jsou redigovány strukturálně (pouze hodnota, prefix schématu jako
  `Bearer `/`Basic ` je zachován), nikoli pomocí obecného textového regulárního výrazu.
- Ochranný mechanismus nikdy neblokuje; pouze přepisuje (`modifiedPayload` /
  `modifiedResponse`) a přidává anotace (`meta.credentialsRedacted`, `meta.count`).

Ochrana proti regresím: `tests/unit/credential-masker-guardrail.test.ts`.

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
