# AUTO-COMBO (Malti)

🌐 **Languages:** 🇺🇸 [English](../../../../routing/AUTO-COMBO.md) · 🇸🇦 [ar](../../../ar/docs/routing/AUTO-COMBO.md) · 🇦🇿 [az](../../../az/docs/routing/AUTO-COMBO.md) · 🇧🇬 [bg](../../../bg/docs/routing/AUTO-COMBO.md) · 🇧🇩 [bn](../../../bn/docs/routing/AUTO-COMBO.md) · 🇨🇿 [cs](../../../cs/docs/routing/AUTO-COMBO.md) · 🇩🇰 [da](../../../da/docs/routing/AUTO-COMBO.md) · 🇩🇪 [de](../../../de/docs/routing/AUTO-COMBO.md) · 🇬🇷 [el](../../../el/docs/routing/AUTO-COMBO.md) · 🇪🇸 [es](../../../es/docs/routing/AUTO-COMBO.md) · 🇪🇪 [et](../../../et/docs/routing/AUTO-COMBO.md) · 🇮🇷 [fa](../../../fa/docs/routing/AUTO-COMBO.md) · 🇫🇮 [fi](../../../fi/docs/routing/AUTO-COMBO.md) · 🇫🇷 [fr](../../../fr/docs/routing/AUTO-COMBO.md) · 🇮🇪 [ga](../../../ga/docs/routing/AUTO-COMBO.md) · 🇮🇳 [gu](../../../gu/docs/routing/AUTO-COMBO.md) · 🇮🇱 [he](../../../he/docs/routing/AUTO-COMBO.md) · 🇮🇳 [hi](../../../hi/docs/routing/AUTO-COMBO.md) · 🇭🇷 [hr](../../../hr/docs/routing/AUTO-COMBO.md) · 🇭🇺 [hu](../../../hu/docs/routing/AUTO-COMBO.md) · 🇮🇩 [id](../../../id/docs/routing/AUTO-COMBO.md) · 🇮🇹 [it](../../../it/docs/routing/AUTO-COMBO.md) · 🇯🇵 [ja](../../../ja/docs/routing/AUTO-COMBO.md) · 🇰🇷 [ko](../../../ko/docs/routing/AUTO-COMBO.md) · 🇱🇹 [lt](../../../lt/docs/routing/AUTO-COMBO.md) · 🇱🇻 [lv](../../../lv/docs/routing/AUTO-COMBO.md) · 🇮🇳 [mr](../../../mr/docs/routing/AUTO-COMBO.md) · 🇲🇾 [ms](../../../ms/docs/routing/AUTO-COMBO.md) · 🇳🇱 [nl](../../../nl/docs/routing/AUTO-COMBO.md) · 🇳🇴 [no](../../../no/docs/routing/AUTO-COMBO.md) · 🇵🇭 [phi](../../../phi/docs/routing/AUTO-COMBO.md) · 🇵🇱 [pl](../../../pl/docs/routing/AUTO-COMBO.md) · 🇵🇹 [pt](../../../pt/docs/routing/AUTO-COMBO.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/routing/AUTO-COMBO.md) · 🇷🇴 [ro](../../../ro/docs/routing/AUTO-COMBO.md) · 🇷🇺 [ru](../../../ru/docs/routing/AUTO-COMBO.md) · 🇸🇰 [sk](../../../sk/docs/routing/AUTO-COMBO.md) · 🇸🇮 [sl](../../../sl/docs/routing/AUTO-COMBO.md) · 🇷🇸 [sr](../../../sr/docs/routing/AUTO-COMBO.md) · 🇸🇪 [sv](../../../sv/docs/routing/AUTO-COMBO.md) · 🇰🇪 [sw](../../../sw/docs/routing/AUTO-COMBO.md) · 🇮🇳 [ta](../../../ta/docs/routing/AUTO-COMBO.md) · 🇮🇳 [te](../../../te/docs/routing/AUTO-COMBO.md) · 🇹🇭 [th](../../../th/docs/routing/AUTO-COMBO.md) · 🇹🇷 [tr](../../../tr/docs/routing/AUTO-COMBO.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/routing/AUTO-COMBO.md) · 🇵🇰 [ur](../../../ur/docs/routing/AUTO-COMBO.md) · 🇻🇳 [vi](../../../vi/docs/routing/AUTO-COMBO.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/routing/AUTO-COMBO.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/routing/AUTO-COMBO.md)

---

---

title: "OmniRoute Auto-Combo Engine"
version: 3.8.40
lastUpdated: 2026-06-28
---

# OmniRoute Auto-Combo Engine

> **Għall-Utenti**: Qed tfittex bidu rapidu? Ara l-[Gwida għall-Utent Auto-Combo](../getting-started/AUTO-COMBO-GUIDE.md) għal spjegazzjonijiet sempliċi u eżempji.

> Ktajjen ta' mudelli li jamministraw ruħhom bi skorjar adattiv + rottjar awtomatiku mingħajr konfigurazzjoni

## Rottjar Awtomatiku Mingħajr Konfigurazzjoni (prefiss `auto/`)

> **ĠDID:** M'hemmx bżonn ta' ħolqien ta' combos. Uża l-prefiss `auto/` direttament fi kwalunkwe klijent.

### Eżempji Rapid

| Model ID       | Varjant | Imġiba                                                                                  |
| -------------- | ------- | --------------------------------------------------------------------------------------- |
| `auto`         | default | Il-fornituri kollha konnessi, strateġija LKGP, piżijiet bilanċjati                      |
| `auto/coding`  | coding  | Piżijiet li jipprijoritizzaw il-kwalità, adattati għall-ġenerazzjoni tal-kodiċi         |
| `auto/fast`    | fast    | Għażla b'piżijiet ta' latenza baxxa                                                     |
| `auto/cheap`   | cheap   | Rottjar ottimizzat għall-ispiża (l-inqas spiża l-ewwel)                                 |
| `auto/offline` | offline | Jiffavorixxi fornituri bl-ogħla disponibbiltà ta' kwota                                 |
| `auto/smart`   | smart   | Kwalità l-ewwel + rata ta' esplorazzjoni ogħla (10%) għal skoperta aħjar tal-mudelli    |
| `auto/lkgp`    | lkgp    | LKGP espliċitu (l-istess bħal `auto` default)                                           |
| `auto/chaos`   | chaos   | Piżijiet ta' injezzjoni ta' ħsarat għall-ittestjar tar-reżiljenza (inġinerija tal-kaos) |

### Kompożizzjoni Kategorija × Livell (`auto/<category>:<tier>`)

Suffissi stil OpenRouter jisseparaw **liema tip ta' rotta** (kategorija) minn **kif tottimizzaha** (livell), sabiex tkun tista' tikkomponihom liberament (#4235 Fażi B, `open-sse/services/autoCombo/suffixComposition.ts`):

- **Kategoriji** (jiffiltraw il-pool ta' kandidati bil-kapaċità): `coding` · `reasoning` · `vision` · `chat` · `multimodal`. `vision`/`multimodal` iżommu mudelli b'kapaċità viżiva; `reasoning` iżomm mudelli ta' raġunament/ħsieb.
- **Livelli** (jagħżlu l-piżijiet tal-iskorjar / filtru tal-pool): `fast` (vjeġġi malajr) · `cheap` (alias `floor`, iffrankar tal-ispejjeż) · `reliable` (saħħa tal-circuit-breaker + stabbiltà tal-latenza) · `free` / `pro` (jiffiltraw il-pool bil-livell tal-mudell permezz ta' `classifyTier` — livell b'xejn vs. premium).

| Eżempju                | Jirriżolvi fi                                                                |
| ---------------------- | ---------------------------------------------------------------------------- |
| `auto/coding:fast`     | pool tal-kodifikazzjoni, piżijiet ta' latenza baxxa                          |
| `auto/coding:cheap`    | pool tal-kodifikazzjoni, ottimizzat għall-ispiża (alias `auto/coding:floor`) |
| `auto/reasoning:pro`   | mudelli ta' raġunament/ħsieb biss, livell premium                            |
| `auto/vision`          | mudelli b'kapaċità viżiva (l-ebda livell → piżijiet bilanċjati)              |
| `auto/multimodal:free` | mudelli b'kapaċità multimodali, livell b'xejn biss                           |

Kwalunkwe `auto/<category>[:<tier>]` validu jirriżolvi fuq talba; sottogrupp ikkurjat huwa rreklamat f'`/v1/models` u fid-dashboard (`AUTO_SUFFIX_VARIANTS` f'`open-sse/services/autoCombo/builtinCatalog.ts`). Il-filtrazzjoni hija **fail-open** — jekk restrizzjoni ma taqbilx ma' mudelli konnessi, jintuża l-pool sħiħ sabiex ir-rottjar qatt ma jinkiser. L-iskorjar ewlieni (`combo.ts`) ma jinbidilx; il-filtru tal-kategorija/livell huwa applikat f'`buildAutoCandidates`.

> **Intelliġenza tal-mudelli live:** l-idoneità tar-rottjar awtomatiku hija infurmata minn klassifiki live **Arena ELO** + dejta tal-livelli minn **models.dev** meta l-bandiera `ARENA_ELO_SYNC_ENABLED` tkun attiva (inkella taqa' lura fuq il-mappa statika tal-idoneità).

**Kif tużah:**

```bash
# Kwalunkwe IDE jew għodda CLI li tappoġġja l-format OpenAI
Base URL: http://localhost:20128/v1
API Key:  <your-endpoint-key>

# Fil-kodiċi jew konfigurazzjoni tiegħek, issettja l-mudell għal:
model: "auto"                 # default bilanċjat
model: "auto/coding"          # l-aħjar għal kompiti ta' kodifikazzjoni
model: "auto/fast"            # l-aktar veloċi disponibbli
model: "auto/cheap"           # l-irħas għal kull token
```

**X'jiġri:**

1. OmniRoute jiskopri l-prefiss `auto/` f'`src/sse/handlers/chat.ts`
2. Jistaqsi lill-**konnessjonijiet kollha tal-fornituri attivi** mid-database
3. Jiffiltra dawk b'kredenzjali validi (ċavetta API jew token OAuth)
4. Jiddetermina l-mudell għal kull konnessjoni (`connection.defaultModel` jew l-ewwel mudell tal-fornitur)
5. Jibni **combo virtwali** fil-memorja (mhux maħżun fid-database)
6. Jirrotta billi juża l-profil tal-piżijiet tal-varjant magħżul + strateġija LKGP

**Proprjetajiet ewlenin:**

- ✅ **Dejjem attiv:** L-ebda swiċċ, l-ebda ħolqien ta' combos, l-ebda konfigurazzjoni meħtieġa
- ✅ **Dinamiku:** Jirrifletti l-fornituri konnessi attwali awtomatikament
- ✅ **Stabbiltà tas-sessjoni:** LKGP jiżgura li l-aħħar fornitur b'suċċess jingħata prijorità
- ✅ **Konxju ta' kontijiet multipli:** Kull konnessjoni tal-fornitur issir kandidat separat
- ✅ **L-ebda kitba fid-database:** Il-combo virtwali jeżisti biss għat-talba, żero overhead ta' persistenza

### Kontroll tal-kandidati għal kull ċavetta (#7819, Livell 1+2)

`GET /v1/auto-combo/{channel}/candidates` (`{channel}` = is-suffiss wara `auto/`, jew
il-`auto` litterali għall-kanal bażi) huwa endpoint **read-only** li jelenka
il-pool attwali ta' kandidati ta' kanal `auto/*` imżejjen bir-reachability live, billi
jerġa' juża l-qari tar-reżiljenza eżistenti (qatt l-istat `state` mhux ipproċessat tal-breaker):

- circuit breaker tal-fornitur — `getCircuitBreaker(provider).getStatus()` / `.canExecute()`
- cooldown tal-konnessjoni — `rateLimitedUntil` / `testStatus` fuq ir-ringiela
  `provider_connections` riżolta
- lockout tal-mudell — `isModelLocked(provider, connectionId, model)`

Kull kandidat iġorr ukoll il-bandiera `excluded` ta' din iċ-ċavetta API. L-esklużjonijiet huma maħżuna
għal kull ċavetta API (tabella `auto_candidate_overrides`, migrazzjoni `128`) — OmniRoute huwa
single-tenant mingħajr tabella `users`, għalhekk `apiKeyId` hija l-identità reali l-eqreb
għal kull min jsejjaħ — u infurzata fil-punt ta' kontroll tal-pool tal-kandidati f'
`open-sse/services/autoCombo/virtualFactory.ts` permezz tal-funzjoni pura u ttestjata
`filterExcludedCandidates()` (`open-sse/services/autoCombo/candidateOverrides.ts`).
Il-filtru huwa **fail-open**: `apiKeyId`/kanal mhux issettjat jew falliment ta' tfittxija fid-database
iħallu l-pool mhux iffiltrat, għalhekk operatur mingħajr overrides konfigurati jara rottjar
identiku byte-byte bħal qabel din il-karatteristika.

**Imdawwar għal issue ta' segwitu:** piżijiet għal kull kandidat + ordni espliċitu (Livell 3
— jitma' fil-mogħdijiet eżistenti ta' strateġija b'piżijiet/prijorità) u l-iffissar ta' strateġija
speċifika `combo.ts` għal kull kanal `auto/*` (Livell 4). Ara l-pjan #7819 għall-mistoqsija
miftuħa dwar jekk l-overrides għandhomx jibqgħu għal kull ċavetta API jew isiru globali minħabba
l-mudell single-tenant.

**Wara l-kwinti:**

```txt
Talba: { model: "auto/coding" }
   ↓
src/sse/handlers/chat.ts jiskopri l-prefiss
   ↓
createVirtualAutoCombo('coding') → candidatePool mill-konnessjonijiet attivi
   ↓
handleComboChat (l-istess engine bħal combos persistenti)
   ↓
Skorjar awtomatiku jagħżel l-aħjar fornitur/mudell għal kull talba
```

**Fajls tal-implimentazzjoni:**

| Fajl                                                      | Skop                                                   |
| --------------------------------------------------------- | ------------------------------------------------------ |
| `open-sse/services/autoCombo/autoPrefix.ts`               | Parser tal-prefiss (`parseAutoPrefix`)                 |
| `open-sse/services/autoCombo/virtualFactory.ts`           | Joħloq oġġetti virtwali `AutoComboConfig`              |
| `open-sse/services/autoCombo/providerRegistryAccessor.ts` | Hook tat-test għall-mocking tar-reġistru tal-fornituri |
| `src/sse/handlers/chat.ts`                                | Integrazzjoni: short-circuit tal-prefiss awtomatiku    |
| `src/shared/constants/providers.ts`                       | Entrata tas-sistema `SYSTEM_PROVIDERS.auto`            |

````

## Ismijiet ta' Combos Li Jaqblu ma' ID ta' Mudell Reali

Combo li l-`name` tiegħu huwa identiku għal ID ta' mudell sempliċi (eż. combo jismu `gpt-5.5`) huwa **mudell intenzjonat u appoġġjat**, mhux bug: huwa l-mekkaniżmu għal fallback tal-provider għal kull ID ta' mudell dokumentat f'[#6940](https://github.com/diegosouzapw/OmniRoute/issues/6940). Minħabba li r-riżoluzzjoni tal-combo tiġi ċċekkjata qabel ir-riżoluzzjoni tal-ID ta' mudell sempliċi (`getComboForModel()` f'`src/sse/services/model.ts`), talba għall-ID sempliċi `gpt-5.5` tiġi rrottata permezz tal-miri tal-combo (eż. `acme-responses/gpt-5.5`, `backup-responses/gpt-5.5`) minflok direttament lejn fornitur wieħed — dan jerġa' juża l-preċedenza li l-combo jingħata qabel il-rewrite mibnija għal [#3227/#3233](https://github.com/diegosouzapw/OmniRoute/issues/3227) u huwa ttestjat b'regression minn `tests/unit/responses-combo-resolution-3227.test.ts` u `tests/unit/combo-name-codex-responses-rewrite.test.ts`.

Il-ħolqien jew il-bidla tal-isem ta' combo għal isem li jitfa' dell fuq ID ta' mudell reali **qatt ma jiġi rrifjutat** — li tagħmel dan ikisser dan il-fluss tax-xogħol dokumentat. Minflok (#8530), `POST /api/combos` u `PUT /api/combos/[id]` iwaħħlu kamp `warning` mhux li jimblokka mar-rispons meta l-isem (il-ġdid) jaħbat ma' ID ta' mudell reali:

```json
{ "warning": { "code": "COMBO_NAME_SHADOWS_MODEL", "modelId": "gpt-5.5", "providerId": "openai" } }
````

Fil-boot, `scanComboModelNameCollisionsAtBoot()` (`src/instrumentation-node.ts`) jillogga wkoll twissija `[STARTUP]` ta' linja waħda li telenka kull combo eżistenti li jitfa' dell fuq ID ta' mudell, sabiex l-operaturi li jiltaqgħu ma' dan b'inċident (aktar milli intenzjonalment, skont #6940) ikollhom sinjal. Il-helper tad-detezzjoni jinsab f'`src/lib/combos/modelNameCollision.ts`.

## Issejjaħ Combo Personalizzat minn Klijent

Il-combos persistiti (Settings → Combos) jintużaw biss meta l-klijent jibgħat l-**isem eżatt** tal-combo fil-kamp `model` — m'hemm l-ebda tqabbil fuzzy jew parzjali tal-isem tal-combo, u l-ebda prefiss `auto/` involut. Ordni tar-riżoluzzjoni (`getComboForModel()` f'`src/sse/services/model.ts`):

1. tqabbil eżatt tal-isem tal-combo (`model: "my-combo"`),
2. prefiss `combo/<name>` (`model: "combo/my-combo"`),
3. mappings glob model→combo (`/api/model-combo-mappings`).

```bash
curl -X POST http://localhost:20128/v1/chat/completions \
  -H "Authorization: Bearer <key>" \
  -H "Content-Type: application/json" \
  -d '{"model":"my-combo","messages":[{"role":"user","content":"Hello"}]}'
```

Żewġ nases komuni:

- **`auto` ma jużax il-combos tiegħek.** `auto`/`auto/*` jibni l-pool ta' kandidati tiegħu stess b'zero-config u jikkonsulta biss combos persistiti jekk combo jismu litteralment `auto` (mhux rakkomandat). Biex tirrotta permezz ta' combo, ibgħat l-isem eżatt tiegħu — mhux `auto`.
- **`openrouter/auto` huwa prodott reali mħallas ta' OpenRouter** ("Auto Best Available"), mhux alias ta' OmniRoute. Huwa l-entrata statika unika tal-mudell fir-reġistru ta' OpenRouter (`open-sse/config/providers/registry/openrouter/index.ts`) u jiġi ffatturat separatament. Uża Settings → Routing → Hide paid models biex teskludih mill-pools ta' `auto`.

Ara [#7992](https://github.com/diegosouzapw/OmniRoute/issues/7992) u [#7111](https://github.com/diegosouzapw/OmniRoute/issues/7111) għall-konfużjoni oriġinali li dan jiddokumenta.

## Kif Jaħdem (Auto-Combos Persistenti)

Il-Magna tal-Auto-Combo tagħżel b'mod dinamiku l-aħjar fornitur/mudell għal kull talba billi tuża **funzjoni ta' punteġġ b'16-il fattur** (definita f'`open-sse/services/autoCombo/scoring.ts` → `DEFAULT_WEIGHTS`). Il-piżijiet default jammontaw għal `1.0`; piżijiet personalizzati jiġu rrinormalizzati minn `normalizeScoringWeights()`. Tlieta mis-sittax — `cacheAffinity`, `resetWindowAffinity` u `reliability` — iġorru piż default ta' `0`: dawn xorta jiġu kkalkulati għal kull kandidat, u `cacheAffinity` jikkontrolla d-deduplikazzjoni tal-prompt-cache barra mill-punteġġ, għalhekk huma fatturi ddikjarati li sempliċiment ma jivvutawx b'mod default.

![Punteġġ b'16-il fattur tal-Auto-Combo](../diagrams/exported/auto-combo-scoring.svg)

> Sors: [diagrams/auto-combo-scoring.mmd](../diagrams/auto-combo-scoring.mmd) (irriġenera permezz ta' `npm run docs:render-diagrams`). L-isem tal-fajl huwa storiku; is-sors u d-dijagramma rrenduta juru s-16-il fattur kollha ddikjarati f'`DEFAULT_WEIGHTS`.

| Fattur                | Piż Default | Deskrizzjoni                                                                                                                                                                                                                    |
| :-------------------- | :---------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `quota`               | 0.1429      | Kwota li fadal / spazju tal-limitu tar-rata [0..1]                                                                                                                                                                              |
| `health`              | 0.1605      | Punteġġ tas-saħħa mill-circuit breaker (CLOSED=1.0, HALF_OPEN=0.5, OPEN=0.0)                                                                                                                                                    |
| `costInv`             | 0.1429      | Spiża **imħallta** inversa (60% input + 40% output token price, normalizzata) — orħos = punteġġ ogħla                                                                                                                           |
| `latencyInv`          | 0.1143      | Latency p95 inversa normalizzata għall-pool — aktar mgħaġġel = punteġġ ogħla                                                                                                                                                    |
| `taskFit`             | 0.0762      | Idoneità tat-tip ta' kompitu (kodifikar, reviżjoni, ippjanar, analiżi, debugging, dokumentazzjoni)                                                                                                                              |
| `stability`           | 0.0476      | Stabbiltà bbażata fuq il-varjanza mid-devjazzjoni standard tal-latency — kandidat li l-ħin ta' rispons tiegħu jvarja jikseb punteġġ aktar baxx                                                                                  |
| `tierPriority`        | 0.0476      | Prijorità tat-tier tal-kont — Ultra=1.0, Pro=0.67, Standard=0.33, Free=0.0                                                                                                                                                      |
| `tierAffinity`        | 0.0476      | Affinità bejn it-tier tal-kandidat u t-tier rakkomandat mill-manifest                                                                                                                                                           |
| `specificityMatch`    | 0.0476      | Tqabbil bejn is-specificità tat-talba (ħjiel mill-manifest) u t-tier tal-mudell                                                                                                                                                 |
| `contextAffinity`     | 0.0476      | Affinità bejn il-ħtieġa tat-tieqa tal-kuntest tat-talba u t-tieqa tal-kuntest tal-mudell                                                                                                                                        |
| `sessionAvailability` | 0.0476      | Disponibbiltà tas-sessjoni OAuth tal-konnessjoni kandidata għal din is-sessjoni (`getOAuthSessionAvailability()`; konnessjonijiet mhux OAuth jiksbu 1.0)                                                                        |
| `connectionDensity`   | 0.0476      | Ifrex it-tagħbija fuq konnessjonijiet tal-istess fornitur (anti-konċentrazzjoni)                                                                                                                                                |
| `cacheAffinity`       | 0.00        | Affinità tal-hash ta' rendezvous lejn il-konnessjoni li x'aktarx diġà għandha l-prefiss tal-prompt-cache ta' din it-talba (`open-sse/services/combo/promptCacheAffinity.ts`); diżattivat b'mod default (#8008)                  |
| `resetWindowAffinity` | 0.00        | Preġudizzju lejn konnessjonijiet li t-tieqa ta' reset tal-kwota tagħhom hija favorevoli (diżattivat b'mod default)                                                                                                              |
| `quality`             | 0.03        | Sinjal tal-kwalità tal-output immexxi mill-feedback mit-tracker tal-kwalità tal-avvenimenti tar-routing; kandidati mingħajr osservazzjonijiet jirċievu 0.5 newtrali                                                             |
| `reliability`         | 0.00        | Sehem tas-suċċess osservat, `1 - failureRate`, minn 24 siegħa ta' storja ta' użu wara art ta' għaxar kampjuni (metriċi f'ħin reali mod ieħor); kandidati mingħajr osservazzjonijiet jinqraw bħala 1.0. Diżattivat b'mod default |

**Somma:** `0.1429 + 0.1605 + 0.1429 + 0.1143 + 0.0762 + (7 × 0.0476) + 0.00 + 0.00 + 0.03 + 0.00 = 1.0` kif iddikjarat f'`DEFAULT_WEIGHTS`; piżijiet ikkonfigurati mill-utent jiġu rrinormalizzati f'distribuzzjoni minn `normalizeScoringWeights()` qabel il-punteġġ.

## Pakketti tal-Modi

6 profili ta' piżijiet predefiniti f'`open-sse/services/autoCombo/modePacks.ts`. Kull pakkett jissostitwixxi l-piżijiet default kompletament biex ibażaż l-għażla lejn għan wieħed. Kull pakkett diġà jammonta għal `1.0` (`0.9999` kif stampat b'erba' deċimali), għalhekk `normalizeScoringWeights()` m'għandu xejn sinifikanti x'jikkoreġi meta pakkett ikun attiv — il-valuri hawn taħt huma, wara l-arrotondament, dawk li japplika l-iskorer.

| Fattur                | ship-fast  | cost-saver | quality-first | offline-friendly | reliability-first | chaos-mode |
| :-------------------- | :--------- | :--------- | :------------ | :--------------- | :---------------- | :--------- |
| `quota`               | 0.1333     | 0.1333     | 0.0952        | **0.3524**       | 0.1333            | 0.0476     |
| `health`              | 0.2667     | 0.1810     | 0.1714        | 0.2667           | **0.3524**        | **0.4000** |
| `costInv`             | 0.0476     | **0.3524** | 0.0476        | 0.0952           | 0.0381            | 0.0190     |
| `latencyInv`          | **0.3048** | 0.0476     | 0.0476        | 0.0476           | 0.0476            | 0.0286     |
| `taskFit`             | 0.0952     | 0.0952     | **0.3524**    | 0.0000           | 0.0952            | 0.1905     |
| `stability`           | 0.0000     | 0.0476     | 0.1429        | 0.0952           | 0.1905            | 0.1714     |
| `tierPriority`        | 0.0476     | 0.0476     | 0.0476        | 0.0476           | 0.0476            | 0.0190     |
| `tierAffinity`        | 0.0000     | 0.0000     | 0.0000        | 0.0000           | 0.0000            | 0.0000     |
| `specificityMatch`    | 0.0000     | 0.0000     | 0.0000        | 0.0000           | 0.0000            | 0.0000     |
| `contextAffinity`     | 0.0095     | 0.0000     | 0.0000        | 0.0000           | 0.0000            | 0.0286     |
| `sessionAvailability` | 0.0476     | 0.0476     | 0.0476        | 0.0476           | 0.0476            | 0.0476     |
| `resetWindowAffinity` | 0.0000     | 0.0000     | 0.0000        | 0.0000           | 0.0000            | 0.0000     |
| `connectionDensity`   | 0.0476     | 0.0476     | 0.0476        | 0.0476           | 0.0476            | 0.0476     |

Noti:

- **L-ebda pakkett ma jissettja `quality`, u pakkett jissostitwixxi l-mappa tal-piżijiet kompletament** (`weights = pack`, mhux merge). `quality` iġorr `0.03` f'`DEFAULT_WEIGHTS`, iżda taħt kwalunkwe pakkett tal-modalità jinnormalizza għal `0` — l-għażla ta' pakkett isikket is-sinjal tal-kwalità osservata kompletament. Jekk trid li l-feedback tal-kwalità jinfluwenza r-routing, ħalli `modePack` mhux issettjat u aġġusta l-piżijiet direttament. (`cacheAffinity` ukoll mhux issettjat minn kull pakkett, iżda jiddefawti għal `0` xorta waħda, għalhekk xejn ma jinbidel hemmhekk.)
- `tierAffinity`, `specificityMatch` u `resetWindowAffinity` huma espliċitament `0` f'kull pakkett.
- L-enfasi ta' kull pakkett f'daqqa t'għajn:
  - **ship-fast** → latencyInv 0.3048 + health 0.2667 (latenza baxxa, konnessjonijiet b'saħħithom)
  - **cost-saver** → costInv 0.3524 (l-irħas tokens jirbħu)
  - **quality-first** → taskFit 0.3524 + stability 0.1429 (l-aħjar mudell għall-kompitu, konsistenti)
  - **offline-friendly** → quota 0.3524 + health 0.2667 (l-akbar marġni irrispettivament mill-veloċità/ispiża)
  - **reliability-first** → health 0.3524 + stability 0.1905 (l-inqas sorpriżi)
  - **chaos-mode** → health 0.4000 + taskFit 0.1905 (profil ta' injezzjoni ta' ħsarat)

### Kontrolli għal Kull Talba (headers) — #6023 / #6024 / #6025 / #3470

Kombo `auto` jista' jkun iggwidat **għal kull talba** permezz ta' tliet headers, mingħajr ma jbiddel il-konfigurazzjoni maħżuna tal-kombo. Dawn japplikaw biss għall-istrateġija `auto` u biss għat-talba li ġġorrhom; il-`modePack`/`budgetCap`/`budgetFallback` salvati tal-kombo jintużaw meta l-header ma jkunx preżenti.

| Header                        | Jaċċetta                                                                                                                                                                                                     | Effett                                                                                                                                                                                                                                                      |
| :---------------------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `X-OmniRoute-Mode`            | alias predefinit (`fast`, `balanced`, `quality`, `cheap`, `reliable`, `offline`) jew isem ta' pakkett mhux ipproċessat (`ship-fast`, `cost-saver`, `quality-first`, `offline-friendly`, `reliability-first`) | Jissostitwixxi l-piżijiet tal-iskor għal din it-talba. `balanced`/`default` jġiegħlu l-piżijiet default (l-ebda pakkett). Valuri mhux magħrufa jiġu injorati (il-konfigurazzjoni tinżamm).                                                                  |
| `X-OmniRoute-Budget`          | numru pożittiv (massimu USD għal kull talba)                                                                                                                                                                 | Limitu iebes tal-ispiża: kandidati li l-ispiża stmata tagħhom taqbeżu jiġu ffiltrati qabel l-għażla. X'jiġri meta **kull** kandidat jaqbeżu huwa kkontrollat minn `X-OmniRoute-Budget-Fallback` hawn taħt.                                                  |
| `X-OmniRoute-Budget-Fallback` | `cheapest` (default, aliases: `cheapest-viable`, `soft`) jew `strict` (aliases: `block`, `hard`)                                                                                                             | `cheapest`: jaqa' lura għall-aktar kandidat irħis globalment anki jekk xorta jaqbeż il-limitu (imġiba legacy). `strict`: jirrifjuta li jagħżel — it-talba tfalli malajr b'`HTTP 402` minflok tonfoq iżżejjed fis-skiet. Valuri mhux magħrufa jiġu injorati. |

```bash
# Ġiegħel l-aktar profil veloċi, illimita din it-talba għal $0.05, u ibblokja iebes minflok tonfoq iżżejjed
curl -sS http://localhost:20128/v1/chat/completions \
  -H "Content-Type: application/json" \
  -H "X-OmniRoute-Mode: fast" \
  -H "X-OmniRoute-Budget: 0.05" \
  -H "X-OmniRoute-Budget-Fallback: strict" \
  -d '{"model":"auto","messages":[{"role":"user","content":"hi"}]}'
```

Ir-riżoluzzjoni hija funzjoni pura (`open-sse/services/autoCombo/requestControls.ts`); il-valuri riżolti jitimgħu l-inputs eżistenti tal-magna `config.modePack` / `config.budgetCap` / `config.budgetFallback`. Il-`config.budgetFallback` maħżun ta' kombo ("strict" | "cheapest") jistabbilixxi l-politika persistenti; il-header jissostitwiha għal talba waħda.

## L-Istrateġiji Kollha tar-Routing

Il-magna combo ta' OmniRoute tappoġġja **19-il strateġija ta' routing** (iddikjarati f'`src/shared/constants/routingStrategies.ts` → `ROUTING_STRATEGY_VALUES`). Il-magna Auto Combo nnifisha hija esposta taħt l-istrateġija `auto`; l-oħrajn huma disponibbli għal combos persistenti.

| Strategy            | Description                                                                                                                                                                                                                |
| :------------------ | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `priority`          | Lista ordnata bl-ewwel mira b'prijorità espliċita                                                                                                                                                                          |
| `weighted`          | Random peżat skont il-piż ta' kull mira                                                                                                                                                                                    |
| `round-robin`       | Iċċirkola mill-miri fl-ordni                                                                                                                                                                                               |
| `context-relay`     | Għaddi l-kuntest minn mira għal oħra (konversazzjonijiet twal)                                                                                                                                                             |
| `fill-first`        | Imla l-kwota ta' kull mira qabel ma tgħaddi għal dik li jmiss                                                                                                                                                              |
| `p2c`               | Bilanċ tat-tagħbija random bl-għażliet power-of-2                                                                                                                                                                          |
| `random`            | Għażla random uniformi                                                                                                                                                                                                     |
| `least-used`        | Agħżel il-mira bl-inqas tagħbija attwali                                                                                                                                                                                   |
| `cost-optimized`    | Naqqas il-$ għal kull talba skont il-prezzijiet tal-katalgu                                                                                                                                                                |
| `reset-aware` ⭐    | Agħti prijorità skont il-ħin ta' reset tal-kwota — twieqi ta' reset qosra jikklassifikaw ogħla                                                                                                                             |
| `reset-window`      | Ippreferi miri li t-tieqa tal-kwota tagħhom tirrisettja l-aktar malajr                                                                                                                                                     |
| `headroom`          | Agħżel il-mira bl-aktar spazju ta' kwota li jifdal                                                                                                                                                                         |
| `strict-random`     | Random mingħajr deduplikazzjoni ta' repetizzjonijiet                                                                                                                                                                       |
| `auto`              | Uża l-iskor ta' Auto Combo (16-il fattur) — **rakkomandat**                                                                                                                                                                |
| `lkgp`              | L-aħħar Mogħdija Magħrufa bħala Tajba (twaħħal mal-aħħar fornitur ta' suċċess, imbagħad terġa' lura għar-regoli)                                                                                                           |
| `context-optimized` | Agħżel il-mira bl-aħjar adattament għad-daqs tal-kuntest attwali                                                                                                                                                           |
| `cache-optimized`   | Irranġa l-miri mill-ġdid skont l-affinità tal-cache tal-prompt — il-konnessjoni li x'aktarx diġà għandha l-prefiss cached ta' din it-talba tiġi ppruvata l-ewwel (`open-sse/services/combo/promptCacheAffinity.ts`, #8008) |
| `fusion` 🧬         | Ferra' barra lejn panel ta' mudelli b'mod parallel, imbagħad sintetizza tweġiba waħda permezz ta' ġudikant (ara hawn taħt)                                                                                                 |
| `pipeline`          | Mexxi l-miri b'mod sekwenzjali, billi tgħaddi l-output ta' kull pass fl-input tal-pass li jmiss; tintbagħat biss it-tweġiba finali (#6396)                                                                                 |

⭐ = Ġdid fil-v3.8.0 · 🧬 = Ġdid fil-v3.8.36

### Is-semantika ta' `weighted`

`weighted` huwa **tlugħ random proporzjonali għal kull talba** (`open-sse/services/combo/targetSorters.ts` → `selectWeightedTarget`), mhux ekwalizzatur:

- Kull talba tiġbed **pass** wieħed bil-probabbiltà `weight / totalWeight`; il-passi li jifdal huma ordnati skont il-piż b'mod dixxendenti bħala l-katina ta' fallback għal dik it-talba.
- Pass li l-piż tiegħu huwa `0` (jew nieqes) **qatt ma jitjieb** sakemm kwalunkwe pass ieħor ikollu piż > 0 — jista' jservi biss bħala fallback wara li l-pass miġbud ifalli. Biss meta **l-piżijiet kollha** jkunu 0 l-għażla ssir uniformi.
- Passi li l-miri tagħhom huma kollha mhux disponibbli — circuit breaker tal-fornitur `OPEN`, cooldown tal-konnessjoni, lockout tal-mudell — jitneħħew mit-tlugħ qabel ma jseħħ (`open-sse/services/combo/targetResolution.ts`), għalhekk pass b'saħħtu wieħed jista' temporanjament jirbaħ kull talba.
- `stickyWeightedLimit` (konfigurazzjoni combo, default `1` = off) jwaħħal il-pass miġbud għal dak in-numru ta' suċċessi konsekuttivi qabel ma jerġa' jiġbed.

Għal rotazzjoni stretta uża `round-robin`; piżijiet ugwali fuq `weighted` jagħtu bilanċ statistiku — mhux strett.

## Strateġija ta' Fużjoni

`fusion` hija l-istrateġija waħda li **ma** tagħżel mira waħda. Hija tqassam il-prompt
lil **kull mudell tal-panel b'mod parallel**, imbagħad **mudell ġudikant** konfigurabbli
jissintetizza tweġiba finali waħda mit-tweġibiet kollha tal-panel. Portat minn upstream `decolua/9router`
(id-disinn ta' Fużjoni ta' OpenRouter); implimentazzjoni fi `open-sse/services/fusion.ts`.

Kif taħdem:

0. **Bypass b'għodod** — talba li ġġorr array `tools` mhux vojt b'`tool_choice` mhux espliċitament `"none"` taqbeż il-panel għal kollox: tirrotta direttament lejn
   mudell wieħed (il-ġudikant ikkonfigurat, jew `panel[0]`) b'`tools`/`tool_choice`
   mgħoddija mingħajr modifika. Il-membri tal-panel m'għandhomx aċċess għall-għodod u d-
   direttiva ta' sintesi tal-ġudikant tiskoraġġixxi l-emissjoni ta' sejħiet ta' għodod,
   għalhekk klijenti agentiċi/li jsejħu għodod jiksbu deċiżjoni reali ta' sejħa ta' għodda
   minflok proża sintetizzata (#6771).
1. **Tferrix** (biss għal talbiet li ma jġorrux għodod) — il-prompt jintbagħat lil kull
   mudell tal-panel fl-istess ħin, imġiegħel mhux streaming bl-għodod imneħħija (il-ġudikant
   jeħtieġ proża sħiħa biex jissintetizza).
2. **Ġbir ta' kwordam b'perjodu ta' grazzja** — malli jaslu `minPanel` tweġibiet, jibda
   timer qasir ta' grazzja għal dawk li jibqgħu lura, imbagħad il-fużjoni tipproċedi b'dak li nġabar.
   Dan jillimita l-penali tal-iktar mudell bil-mod fuq il-ħin reali, b'limitu ta' żmien iebes.
3. **Sintesi tal-ġudikant** — it-tweġibiet tal-panel huma anonimizzati (`Source 1`, `Source 2`, … — biex
   il-ġudikant jiżen is-sustanza, mhux il-marka tal-mudell) u jingħataw lill-ġudikant, li janalizza
   l-kunsens / il-kontradizzjonijiet / il-kopertura parzjali / l-għarfien uniku / il-punti mejta, imbagħad
   jikteb **waħda** tweġiba awtoritattiva. Is-sejħa tal-ġudikant iżżomm il-bandiera `stream` oriġinali
   tal-klijent + l-għodod, għalhekk l-istreaming u l-użu ta' għodod downstream xorta jaħdmu.
4. **Degradazzjoni grazzjuża** — 0 tweġibiet tal-panel → `503`; eżattament 1 superstiti → dik it-tweġiba
   tintbagħat direttament (xejn x'tingħaqad); panel b'mudell wieħed iwieġeb direttament.

Membru tal-panel jista' jkun ukoll pass `combo-ref` (`{kind: "combo-ref", comboName: "..."}`) li jirreferi
għal combo ieħor — jiġi riżolt bħala **vuċi waħda tal-panel bħala kaxxa s-sewda** (dispaċċ rikursiv sħiħ
fil-combo referenzjat, mhux tferrix tal-miri tiegħu stess), bl-istess protezzjoni ta' fond/ċiklu
li kull strateġija oħra li tuża combo-ref diġà tuża (#6764).

### Konfigurazzjoni

Ikkonfigurat fuq il-blob `config` tal-combo (l-ebda migrazzjoni ta' skema — jerġa' juża t-tabella
`combos` eżistenti):

| Qasam                                    | Tip      | Default                  | Skop                                                                                           |
| :--------------------------------------- | :------- | :----------------------- | :--------------------------------------------------------------------------------------------- |
| `config.judgeModel`                      | `string` | l-ewwel mudell tal-panel | Mudell li jissintetizza t-tweġiba finali                                                       |
| `config.fusionTuning.minPanel`           | `number` | `2`                      | Tweġibiet b'suċċess meħtieġa qabel jibda t-timer tal-grazzja (illimitat għal `[2, panelSize]`) |
| `config.fusionTuning.stragglerGraceMs`   | `number` | `8000`                   | Kemm idum jistenna għal dawk li jibqgħu lura malli jintlaħaq il-kwordam                        |
| `config.fusionTuning.panelHardTimeoutMs` | `number` | `90000`                  | Limitu assolut biex mudell wieħed imdendel ma jwaqqafx it-talba                                |

Il-valuri default jinsabu fi `FUSION_DEFAULTS` (`open-sse/services/fusion.ts`).

### Eżempju

```bash
curl -X POST http://localhost:20128/api/combos \
  -H "Authorization: Bearer <key>" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "fusion-panel",
    "strategy": "fusion",
    "targets": [
      { "model": "cc/claude-opus-4-7" },
      { "model": "cx/gpt-5.5" },
      { "model": "glm/glm-5.1" }
    ],
    "config": {
      "judgeModel": "cc/claude-opus-4-7",
      "fusionTuning": { "minPanel": 2, "stragglerGraceMs": 8000, "panelHardTimeoutMs": 90000 }
    }
  }'
```

Imbagħad sejjaħha bħal kull combo: `{"model":"fusion-panel","messages":[...]}`.

## Fabbrika Awtomatika tal-Kombinazzjonijiet Vwali

Il-magni tal-Kombinazzjoni Awtomatika mhux bżonn kombo li tista' twettaq minn qabel. Minflok, `open-sse/services/autoCombo/virtualFactory.ts` jibni kandidati awtomatikament:

1. Jiġbed `getProviderConnections({ isActive: true })` (kull konnessjoni attivata)
2. Jifiltrahom għal dawk b'kredenzjali validi (API key jew token OAuth li ma għaddiex mill-ħin permezz ta' `hasUsableOAuthToken()`)
3. Jikkwota mal-`getProviderRegistry()` għall disponibbiltà tal-mudell + tpoġġija tal-prezz
4. Għal kull tuple `(provider, model, connection)`, jibni `VirtualAutoComboCandidate`
5. Jgħażel `connection.defaultModel` (jew l-ewwel mudell tar-reġistru) bħala l-mira tal-koordinazzjoni
6. Jiskora kull kandidat bl-16-fattur `scorePool()` u l-pakkett tal-piżijiet tal-varjant
7. Jirritorna l-`AutoComboConfig` li jirriżulta fil-memorja għal `handleComboQedChat()` — qatt ma jinżamm永久 fil-DB

Dan ifisser li **żieda ta' provider ġdid b'`auto/*` attivament tkabbir ta' pool tal-kandidati** — m'hemmx bżonn teditja kombo manwalment. Il-kombo virtwali terġa' tinbena għal kull talba, għalhekk il-konnessjonijiet ġodda jew dawk li reġgħu saru tajba jittieħdu immedjatament.

## Tiswija Awstenjata

- **Eskluzjoni temporanja**: Skor < 0.2 → esklux għal 5 minuti (arrestar progressiv, massimu 30 minuta)
- **Kuxjenza tal-circuit breaker**: OPEN → awtomatikament esklux; HALF_OPEN → talbiet ta' probe
- **Mod tal-inċident**: >50% OPEN → jiddisattiva l-esplorazzjoni, jimmassimizza l-istabbiltà
- **Rkupru wara l-esklużjoni**: Wara l-esklużjoni, l-ewwel talba hija "probe" b'waqfaqqqar imnaqqsa

## Esplorazzjoni tal-Bandit

5% tal-talbiet (konfigurabbli) jiġu diretta lejn providur għall-esplorazzjoni random. Jiġi misħut fil-mod tal-inċident.

## API

**M'hemmx punt ta' ppreżentazzjoni `POST /api/combos/auto` apposta** — il-Kombinazzjoni Awtomatika tintuża b'żewġ modi:

1. **Konfigurazzjoni null (rakkomandata):** Agħti kwalunkwe talba ta' kisba tal-karrijun bil-`model: "auto"` jew `model: "auto/<variant>"`. Il-fabbrika virtwali tibni l-kombo għal kull talba — l-ebda permanenti, l-ebda sejħiet API meħtieġa.

2. **Kombo permanenti b'`strategy: "auto"`:** Oħloq kombo regolari permezz ta' `POST /api/combos` u waqqaf `strategy: "auto"` flimkien ma' `config.auto.weights` / `config.auto.candidatePool`. L-istess magni ta' skor juża; il-kombo jinżamm f'`combos` u jista' jerġa' jintuża bl-ID.

Għall-iskoperta, `GET /api/combos/auto` jelenka kull varjant mal-pool tal-kandidati risolvuti flimkien ma' `context_length` / `max_output_tokens` — il-MAX fost it-twieqi tal-pool tal-kandidati. Il-klijenti (pereż. il-pluggin tal-opencode) għandhom jirreklamaw dawn il-valuri minflok `0`: kuntest b'ħin jaħna jiddisattiva l-kompakking awtomatiku tal-opencode kompletament, ħallilek is-sessjonijiet jikbru sakemm il-purgatory tal-istorja tal-gateway jċaħħad il-kuntest. Huwa sigur tirreklama MAX minħabba li l-filtri tal-kuntest tal-kombinazzjoni awtomatika jidderettaw it-talbiet li jaqbżu d-daqs lejn kandidati b'tieqi kbar.

```bash
# Użu b'konfigurazzjoni null (ebda ħolqien ta' kombo)
curl -X POST http://localhost:20128/v1/chat/completions \
  -H "Authorization: Bearer <key>" \
  -H "Content-Type: application/json" \
  -d '{"model":"auto/coding","messages":[{"role":"user","content":"Hello"}]}'

# Kombo awtomatika permanenti permezz tal-punt normali tal-kombi
curl -X POST http://localhost:20128/api/combos \
  -H "Content-Type: application/json" \
  -d '{"id":"my-auto","name":"Auto Coder","strategy":"auto","config":{"auto":{"candidatePool":["anthropic","google","openai"],"weights":{"quota":0.15,"health":0.3,"costInv":0.05,"latencyInv":0.35,"taskFit":0.1,"stability":0,"tierPriority":0.05}}}}'
```

### Strateġiji tal-router awtomatiku

Il-kombi permanenti b'`strategy: "auto"` jistgħu jwewwqu `config.routerStrategy` (jew l-antik
`config.auto.routerStrategy`) f' wieħed minn dawk li ġejjin:

- `rules` — skor tal-piżijiet regolari
- `score` — jagħżel l-ogħla skor tal-piżijiet konfigurati. L-ekwità eżatta tippreserva l-ordni
  tal-kandidati konfigurata; l-`explorationRate` eżistenti jissampja mill-pool rankat kollu.
- `cost` / `eco` — l-iktar b'mhux frisk tal-provduri b'saħħithom
- `latency` / `fast` — l-inqas p95 latent ma' penali ta' affidabilità
- `sla-aware` / `sla` — jippreferixxi kandidati li jissodisfaw p95 latent, rata ta' żbalji, u SLOs
  tal-kost opcjonali
- `lkgp` — l-iktar providur magħruf tajjeb tal-aħħar l-ewwel

### Strateġiji tal-router fid-dettalji

Il-magni tal-kombinazzjoni awtomatika joffri 6 implimentazzjonijiet ta' **RouterStrategy** li
tista' tibdilhom permezz ta' `config.routerStrategy` (jew l-antik `config.auto.routerStrategy`).
Kull strateġija tagħżel providur wieħed mill-pool tal-kandidati, b'`RoutingContext`
(tip ta' xogħol, disks/twists tal-għodod, stima tat-tokens, politika SLA opcjonali, providur
magħruf tajjeb tal-aħħar opcjonali).

#### 1. `rules` (predefinit) — skor tal-piżijiet 16-fattur

Jwarrep il-magni tal-skor eżistenti. Jifiltrahom kandidati b'circuit-breaker
`OPEN`, imbagħad jgħaddi `scorePool()` bil-tip ta' xogħol attwali u `getTaskFitness()`,
jagħżel il-provdur bl-akbar skor.

```ts
class RulesStrategyImpl implements RouterStrategy {
  readonly name = "rules";
  readonly description = "16-factor weighted scoring (see DEFAULT_WEIGHTS)";

  select(pool, context) {
    const eligible = pool.filter((c) => c.circuitBreakerState !== "OPEN");
    const ranked = scorePool(
      eligible.length > 0 ? eligible : pool,
      context.taskType,
      undefined,
      getTaskFitness
    );
    return { provider: ranked[0].provider /* ... */ };
  }
}
```

**Meta tużah**: Predefinit. Tużah meta trid kumprommess bilanċjat fost l-is sinjali kollha.

**Alija**: `rules` (ebda alja)

---

#### 2. `cost` / `eco` — l-iktar providur b'mhux frisk ta' saħħa

Jissorod il-pool tal-kandidati b'`costPer1MTokens` (il-quddiem) u jagħżel l-iktar b'mhux frisk.
Jifiltrahom l-ewwel kandidati b'`OPEN`.

```ts
class CostStrategyImpl implements RouterStrategy {
  readonly name = "cost";
  readonly description = "Always selects cheapest available provider";

  select(pool, context) {
    const healthy = pool.filter((c) => c.circuitBreakerState !== "OPEN");
    const sorted = [...healthy].sort((a, b) => a.costPer1MTokens - b.costPer1MTokens);
    return { provider: sorted[0].provider /* ... */ };
  }
}
```

**Meta tużah**: Xogħol sensittiv għall-ispejjeċi, ipproċessar ta' lott, jew xogħol ta' sfond.

**Alijiet**: `cost`, `eco`

---

#### 3. `latency` / `fast` — l-inqas latent p95 ma' penali tal-affidabilità

Jissorod b'`p95LatencyMs + (errorRate * 1000)`. Il-penali tar-rata tal-żball tiżgura
provduri mhux affidabbli jiġu rankati anki jekk il-lethal nomin tagħhom ikun baxx.

```ts
class LatencyStrategyImpl implements RouterStrategy {
  readonly name = "latency";
  readonly description = "Prioritizes lowest p95 latency with reliability weighting";

  select(pool, context) {
    const healthy = pool.filter((c) => c.circuitBreakerState !== "OPEN");
    const sorted = [...healthy].sort(
      (a, b) => a.p95LatencyMs + a.errorRate * 1000 - (b.p95LatencyMs + b.errorRate * 1000)
    );
    return { provider: sorted[0].provider /* ... */ };
  }
}
```

**Meta tużah**: Xogħol sensittiv għal latent bħal karrijun real-time, awtokompletar, jew
għodda ta' kodiċi interattivi.

**Alijiet**: `latency`, `fast`

---

#### 4. `sla-aware` / `sla` — kkonformità mal-SLOs tal-kost/żball/latent

Jiskora kull kandidat skont kemm jissodisfa l-politika SLA konfigurata:

| Fattur              | Piż | Formola                                            |
| ------------------- | --- | -------------------------------------------------- |
| Skor tal-lethal     | 35% | `threshold / max(value, ε)`                        |
| Skor tal-żball      | 35% | `threshold / max(value, ε)`                        |
| Skor ta' saħħa      | 15% | `1.0` (CLOSED) / `0.5` (HALF_OPEN) / `0.0` (OPEN)  |
| Skor tal-kost       | 10% | `threshold / max(value, ε)` jew inversament inżamm |
| Skor tal-istabilità | 5%  | latent inversament inżamm stddev                   |

Meta `hardConstraints: true`, il-kandidati jissorodew l-ewwel minn **skor tal-vjolazzjoni**
(kemm jaqbżu xi SLO), imbagħad b'iskor kompost. Mod ieħor huwa biss
l-iskor kompost.

```ts
class SLAStrategyImpl implements RouterStrategy {
  readonly name = "sla-aware";
  readonly description =
    "Selects the provider most likely to satisfy latency, error-rate, and cost SLOs";

  select(pool, context) {
    // ... scores each candidate against policy: { targetP95Ms, maxErrorRate, maxCostPer1MTokens, hardConstraints }
  }
}
```

**Għanijiet SLA** (mwaqqfa fil-konfigurazzjoni tal-kombo):

```json
{
  "strategy": "auto",
  "config": {
    "routerStrategy": "sla-aware",
    "slaTargetP95Ms": 1500,
    "slaMaxErrorRate": 0.05,
    "slaMaxCostPer1MTokens": 5,
    "slaHardConstraints": true
  }
}
```

**Meta tużah**: Xogħol fil-produzzjoni b'baġits stretti ta' latent, rata ta' żball, jew kost.

**Alijiet**: `sla-aware`, `sla`

---

#### 5. `lkgp` — l-iktar providur magħruf tajjeb tal-aħħar l-ewwel

Jipprova l-**provdur magħruf tajjeb tal-aħħar** (jekk imwaqqaf) l-ewwel, imbagħad jirrikorri għall-
strateġija `rules`. Utli għal stickiness tal-sessjoni — l-istess providur iħares
talbiet ta' segwit f'konversazzjoni.

```ts
class LKGPStrategyImpl implements RouterStrategy {
  readonly name = "lkgp";
  readonly description = "Tries last known good provider first, then falls back to rules";

  select(pool, context) {
    if (context.lkgpEnabled === false) {
      return getStrategy("rules").select(pool, context);
    }

    if (context.lastKnownGoodProvider) {
      const candidates = pool.filter(
        (c) => c.provider === context.lastKnownGoodProvider && c.circuitBreakerState !== "OPEN"
      );
      if (candidates.length > 0) {
        return { provider: candidates[0].provider /* ... */ };
      }
    }

    // Fallback to rules strategy
    return getStrategy("rules").select(pool, context);
  }
}
```

**Meta tużah**: Konversazzjonijiet b'ħafna dawwar fejn trid l-istess providur iħares
talbiet ta' segwit (pereż. għal cache, kontinwità tal-kuntest, jew konsistenza fil-prezz).

**Alija**: `lkgp` (ebda alja)

---

### Strateġiji tal-router personalizzati

Tista' tireġistra l-implimentazzjoni tiegħek stess ta' `RouterStrategy` permezz tal-API pubblika:

```ts
import {
  registerStrategy,
  type RouterStrategy,
} from "@omniroute/open-sse/services/autoCombo/routerStrategy";

class MyCustomStrategy implements RouterStrategy {
  readonly name = "my-custom";
  readonly description = "My custom routing strategy";

  select(pool, context) {
    // Your routing logic here
    return {
      provider: pool[0].provider,
      model: pool[0].model,
      strategy: this.name,
      reason: "MyCustomStrategy: ...",
      candidatesConsidered: pool.length,
      finalScore: 1.0,
    };
  }
}

registerStrategy("my-custom", new MyCustomStrategy());
```

Imbagħad tużah:

```json
{
  "strategy": "auto",
  "config": {
    "routerStrategy": "my-custom"
  }
}
```

---

### Gwida għall-għażla tal-istrateġija tal-router

| Kaxxa tal-ħidma         | Strateġija  | Raġuni                                           |
| ----------------------- | ----------- | ------------------------------------------------ |
| Xogħol bilanċjat        | `rules`     | Predefinit — jqis il-fatturi kollha              |
| Innaqqas l-ispejjeċ     | `cost`      | Dejjem jagħżel l-iktar b'mhux frisk              |
| Innaqqas il-lethal      | `latency`   | Jagħżel l-iktar mgħaġġel tal-provduri affidabbli |
| SLOs stretti            | `sla-aware` | Jifiltrahom mil-limiti tal-p95/żball/kost        |
| Karrijun b'ħafna dawwar | `lkgp`      | Stickiness tal-sessjoni                          |

Għanijiet tal-SLA:

```json
{
  "strategy": "auto",
  "config": {
    "routerStrategy": "sla-aware",
    "slaTargetP95Ms": 1500,
    "slaMaxErrorRate": 0.05,
    "slaMaxCostPer1MTokens": 5,
    "slaHardConstraints": true
  }
}
```

## Adegwatezza tal-Kompitu

30+ mudelli skurjati fuq 6 tipi ta' kompiti (`coding`, `review`, `planning`, `analysis`, `debugging`, `documentation`). Jappoġġja mudelli wildcard (eż., `*-coder` → punteġġ għoli ta' coding).

## Rekapitulazzjoni tal-Varjanti Auto

Inkluż il-`auto` sempliċi (default) flimkien mas-6 valuri ta' `AutoVariant` dikjarati f'`autoPrefix.ts`, hemm **7 IDs ta' mudelli invokabbli**:

`auto`, `auto/coding`, `auto/fast`, `auto/cheap`, `auto/offline`, `auto/smart`, `auto/lkgp`

(`AutoVariant` innifsu jelenka 6 valuri; is-7 għażla hija "l-ebda varjant" — `auto` sempliċi — immaniġġjata minn `parseAutoPrefix()` bħala `variant: undefined`.)

## Kif it-tiers jaqblu mal-Auto-Combo

Il-funzjoni ta' punteġġ b'16-il fattur (`open-sse/services/autoCombo/scoring.ts`) tittratta s-sħubija fit-tier bħala żewġ sinjali: `tierPriority` (0.0476) u `tierAffinity` (0.0476). Ara t-tabella kanonika [tabella tal-fatturi ta' punteġġ](#how-it-works-persisted-auto-combos) hawn fuq għas-sett sħiħ ta' `DEFAULT_WEIGHTS` — l-overrides għal kull pakkett (ship-fast/cost-saver/quality-first/offline-friendly) huma elenkati fit-tabella "Profil tal-piżijiet għal kull pakkett".

It-tier waħdu ma **jġiegħelx** lit-Tier 1 l-ewwel — jekk il-latenza tat-Tier 1 tkun ħażina jew il-kost-vs-kwalità ma jkunx ottimali, it-Tier 2 jirbaħ. Biex iġġiegħel l-ordni tat-tiers, uża l-istrateġija `priority` u arranġa l-fornituri skont it-tier.

Biex tiffavorixxi bil-qawwa lit-Tier 1 (sottoskrizzjoni), żid il-piż ta' `tierPriority`:

```json
{
  "strategy": "auto",
  "config": { "auto": { "weights": { "tierPriority": 0.3, "costInv": 0.05 } } }
}
```

Ara `docs/marketing/TIERS.md` għad-definizzjonijiet tat-tiers u l-klassifikazzjoni tal-fornituri.

## Ittestjar u Kopertura

### Matriċi deterministika tad-deċiżjoni tar-routing (`npm run test:combo:matrix`)

`tests/integration/combo-matrix/*.test.ts` jipprova d-**deċiżjoni** tar-routing tal-istrateġiji pubbliċi kollha 19 minn tarf sa tarf permezz tal-pipeline reali tal-combo b'upstream mockjat. Il-kopertura tinkludi:

- L-istrateġiji kollha 19 ta' `ROUTING_STRATEGY_VALUES` (ordered, weighted, cost, context, fusion, …).
- `quota-share` (intern) minn tarf sa tarf: ġustizzja DRR + deprijoritizzazzjoni tas-saturazzjoni permezz tas-seam reali `selectQuotaShareTarget` (`registerQuotaFetcher` / `setLKGP` / `__setHeadroomSaturationFetcherForTests`).
- Kopertura ta' `context-relay` universal-handoff għal kull għadd ta' miri.

Dan is-suite jitħaddem fil-CI (xogħol `test:integration`) b'`--test-concurrency=1` u `--test-force-exit` sabiex ikun deterministiku u ma jeħtieġx kredenzjali live.

### Smoke test live b'gate (MHUX fil-CI — fornituri reali)

| Kmand                                  | X'jagħmel                                                                            |
| :------------------------------------- | :----------------------------------------------------------------------------------- |
| `npm run test:combo:live`              | Routing reali fil-proċess b'`RUN_COMBO_LIVE=1`; jieħu snapshot ta' DB OmniRoute live |
| `npm run test:combo:live:vps`          | Sejħiet HTTP kontra server OmniRoute live (issettja `COMBO_LIVE_BASE_URL`)           |
| `npm run test:combo:live:vps:failover` | L-istess, b'xenarji ta' failover deliberati                                          |

Dawn is-smoke tests jeżerċitaw il-passaġġ reali tal-wire (combo → provider → completion). Huma esklużi apposta mill-CI għaliex jeħtieġu kredenzjali live u aċċess għal VPS.

## Fajls

| Fajl                                                      | Għan                                                                                                      |
| :-------------------------------------------------------- | :-------------------------------------------------------------------------------------------------------- |
| `open-sse/services/autoCombo/scoring.ts`                  | Funzjoni ta' skoring b'16-il fattur, `DEFAULT_WEIGHTS`, normalizzazzjoni tal-pul                          |
| `open-sse/services/autoCombo/taskFitness.ts`              | Arrikkja tal-konformità tal-mudell × xogħol                                                               |
| `open-sse/services/autoCombo/engine.ts`                   | Loġika ta' għażla, bandit, limitu tal-bġit                                                                |
| `open-sse/services/autoCombo/selfHealing.ts`              | Ekluzzjoni, sondi, modalità ta' inċident                                                                  |
| `open-sse/services/autoCombo/modePacks.ts`                | 6 profili tal-piż (ship-fast, cost-saver, quality-first, offline-friendly, reliability-first, chaos-mode) |
| `open-sse/services/autoCombo/autoPrefix.ts`               | Parsur tal-prefiss `auto/` + 6 varjanti                                                                   |
| `open-sse/services/autoCombo/virtualFactory.ts`           | Joħloq `AutoComboConfig` f'memorja minn konnessjonijiet ħajjin                                            |
| `open-sse/services/autoCombo/providerRegistryAccessor.ts` | Ganc tal-għodda għat-testjar tal-għodda tal-registru tal-fornitur                                         |
| `src/shared/constants/routingStrategies.ts`               | `ROUTING_STRATEGY_VALUES` (19-il strateġija)                                                              |
| `src/sse/handlers/chat.ts`                                | Integrazzjoni: skontċirċwitu tal-prefiss awtomatiku                                                       |
