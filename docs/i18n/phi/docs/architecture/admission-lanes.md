# Admission lanes (#9654) — two lane systems, what gates each, where each reports (Filipino)

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/admission-lanes.md) · 🇪🇹 [am](../../../am/docs/architecture/admission-lanes.md) · 🇸🇦 [ar](../../../ar/docs/architecture/admission-lanes.md) · 🇦🇿 [az](../../../az/docs/architecture/admission-lanes.md) · 🇧🇬 [bg](../../../bg/docs/architecture/admission-lanes.md) · 🇧🇩 [bn](../../../bn/docs/architecture/admission-lanes.md) · 🇨🇿 [cs](../../../cs/docs/architecture/admission-lanes.md) · 🇩🇰 [da](../../../da/docs/architecture/admission-lanes.md) · 🇩🇪 [de](../../../de/docs/architecture/admission-lanes.md) · 🇬🇷 [el](../../../el/docs/architecture/admission-lanes.md) · 🇪🇸 [es](../../../es/docs/architecture/admission-lanes.md) · 🇪🇪 [et](../../../et/docs/architecture/admission-lanes.md) · 🇮🇷 [fa](../../../fa/docs/architecture/admission-lanes.md) · 🇫🇮 [fi](../../../fi/docs/architecture/admission-lanes.md) · 🇫🇷 [fr](../../../fr/docs/architecture/admission-lanes.md) · 🇮🇪 [ga](../../../ga/docs/architecture/admission-lanes.md) · 🇮🇳 [gu](../../../gu/docs/architecture/admission-lanes.md) · 🇳🇬 [ha](../../../ha/docs/architecture/admission-lanes.md) · 🇮🇱 [he](../../../he/docs/architecture/admission-lanes.md) · 🇮🇳 [hi](../../../hi/docs/architecture/admission-lanes.md) · 🇭🇷 [hr](../../../hr/docs/architecture/admission-lanes.md) · 🇭🇺 [hu](../../../hu/docs/architecture/admission-lanes.md) · 🇦🇲 [hy](../../../hy/docs/architecture/admission-lanes.md) · 🇮🇩 [id](../../../id/docs/architecture/admission-lanes.md) · 🇳🇬 [ig](../../../ig/docs/architecture/admission-lanes.md) · 🇮🇹 [it](../../../it/docs/architecture/admission-lanes.md) · 🇯🇵 [ja](../../../ja/docs/architecture/admission-lanes.md) · 🇬🇪 [ka](../../../ka/docs/architecture/admission-lanes.md) · 🇰🇭 [km](../../../km/docs/architecture/admission-lanes.md) · 🇮🇳 [kn](../../../kn/docs/architecture/admission-lanes.md) · 🇰🇷 [ko](../../../ko/docs/architecture/admission-lanes.md) · 🇱🇹 [lt](../../../lt/docs/architecture/admission-lanes.md) · 🇱🇻 [lv](../../../lv/docs/architecture/admission-lanes.md) · 🇮🇳 [ml](../../../ml/docs/architecture/admission-lanes.md) · 🇮🇳 [mr](../../../mr/docs/architecture/admission-lanes.md) · 🇲🇾 [ms](../../../ms/docs/architecture/admission-lanes.md) · 🇲🇹 [mt](../../../mt/docs/architecture/admission-lanes.md) · 🇲🇲 [my](../../../my/docs/architecture/admission-lanes.md) · 🇳🇵 [ne](../../../ne/docs/architecture/admission-lanes.md) · 🇳🇱 [nl](../../../nl/docs/architecture/admission-lanes.md) · 🇳🇴 [no](../../../no/docs/architecture/admission-lanes.md) · 🇮🇳 [or](../../../or/docs/architecture/admission-lanes.md) · 🇮🇳 [pa](../../../pa/docs/architecture/admission-lanes.md) · 🇵🇱 [pl](../../../pl/docs/architecture/admission-lanes.md) · 🇵🇹 [pt](../../../pt/docs/architecture/admission-lanes.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/admission-lanes.md) · 🇷🇴 [ro](../../../ro/docs/architecture/admission-lanes.md) · 🇷🇺 [ru](../../../ru/docs/architecture/admission-lanes.md) · 🇱🇰 [si](../../../si/docs/architecture/admission-lanes.md) · 🇸🇰 [sk](../../../sk/docs/architecture/admission-lanes.md) · 🇸🇮 [sl](../../../sl/docs/architecture/admission-lanes.md) · 🇷🇸 [sr](../../../sr/docs/architecture/admission-lanes.md) · 🇸🇪 [sv](../../../sv/docs/architecture/admission-lanes.md) · 🇰🇪 [sw](../../../sw/docs/architecture/admission-lanes.md) · 🇮🇳 [ta](../../../ta/docs/architecture/admission-lanes.md) · 🇮🇳 [te](../../../te/docs/architecture/admission-lanes.md) · 🇹🇭 [th](../../../th/docs/architecture/admission-lanes.md) · 🇹🇷 [tr](../../../tr/docs/architecture/admission-lanes.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/admission-lanes.md) · 🇵🇰 [ur](../../../ur/docs/architecture/admission-lanes.md) · 🇺🇿 [uz](../../../uz/docs/architecture/admission-lanes.md) · 🇻🇳 [vi](../../../vi/docs/architecture/admission-lanes.md) · 🇳🇬 [yo](../../../yo/docs/architecture/admission-lanes.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/admission-lanes.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/admission-lanes.md)

---

Ang OmniRoute ay may **dalawang** process-local lane system na may magkaibang saklaw. Ang mga ito ay
magkatuwang; dapat malaman ng mga operator kung alin ang kanilang tinitingnan.

## 1. Proseso ng admission sa antas ng byte para sa buong process (`chatBodyAdmission.ts`)

- **Saklaw:** ang path ng buffered body/heap para sa `POST /v1/chat/completions`,
  `/v1/messages`, `/v1/responses`, at iba pang mga route na hugis-chat. Nagbibigay
  ito ng proteksiyon laban sa paglaki ng paggamit ng heap dahil sa malalaking body
  mula sa mga coding agent (#4380).
- **Isang process-global na controller, hindi mga lane para sa bawat key (#10110).**
  Ang bawat API key (naka-hash) o `anonymous` na session ay ina-admit batay sa
  **iisang** nakabahaging budget — ginagamit LAMANG ang naka-hash na session id
  bilang fairness scheduling key (round-robin na dispatch sa mga naghihintay),
  at hindi kailanman bilang capacity shard. Inilarawan ng naunang bersyon ng
  dokumentong ito ang mga lane para sa bawat key na may magkakahiwalay na
  kapasidad; inalis ang modelong iyon sa #10110 dahil pinahintulutan nitong
  paramihin ng mga hindi authenticated na pekeng credential ang process-wide
  na limitasyon.
- **Gate (#503-fanout): isang awtomatikong kinukuwentang ingest BYTE budget,
  hindi isang nakapirming bilang ng request.** Ang legacy na request-count cap
  na `CHAT_MAX_HEAVY_IN_FLIGHT` (default na `1` bago ang pag-aayos na ito) ay
  nagpabagsak sa fan-out ng coding agent (maraming subagent/CLI, na ang mga body
  ay karaniwang > 256 KB) tungo sa epektibong concurrency na ~1, na nagdulot ng
  mga 503 sa ilalim ng ganap na normal na load. Nagiging umiiral lamang ito
  ngayon kapag tahasang itinakda ng operator ang
  `OMNIROUTE_CHAT_MAX_HEAVY_IN_FLIGHT`. Kapag hindi ito itinakda, ang admission
  ay sa halip kino-control ng `OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES` — isang budget
  na awtomatikong kinukuwenta mula sa aktuwal na memory ceiling ng process
  (`src/shared/middleware/admissionBudget.ts`): 25% ng mas mababang limitasyon
  sa pagitan ng V8 heap limit at anumang cgroup/container limit, na hinati sa
  8x transient-amplification factor, at nilimitahan sa pagitan ng 8 MiB at
  2 GiB. Ginagamit ng mga tahasang override ang parehong mga limitasyon.
  Awtomatiko itong umaangkop mula sa isang 512 MB na container hanggang sa
  isang 32 GB na desktop nang hindi kailangang i-tune ang env. Ang body na
  hindi maaaring magkasya sa epektibong budget ay agad na mabibigo nang may
  `413 body_exceeds_budget`; tanging ang agawan sa pagitan ng mga body na
  indibidwal na kayang serbisyuhan ang pumapasok sa bounded fairness queue.
  Ang isang live na multi-signal resource-pressure tracker (V8 heap ratio,
  cgroup, PSI, mga OOM event —
  `open-sse/utils/resourcePressurePolicy.ts`) ay nagpapaikli sa bounded na
  paghihintay sa ilalim ng `high` na pressure at agad na nagbabawas ng load
  gamit ang `503 resource_pressure` sa ilalim ng `critical` na pressure, bago
  pa man ma-ingest ang anumang byte. Binabasa ang PSI mula sa `memory.pressure`
  ng cgroup ng unit na ito kapag mayroon
  (`open-sse/utils/resourcePressureSampler.ts`); ang
  `/proc/pressure/memory` ay para sa buong host at ginagamit lamang bilang
  fallback sa bare metal / cgroup v1, kaya hindi maaaring magdulot ng 503 sa
  isang idle na container ang isang host na nagsa-swap.
- **Pag-tune:**
  - `OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES` — override para sa awtomatikong kinukuwentang byte budget
  - `OMNIROUTE_CHAT_MAX_HEAVY_IN_FLIGHT` — legacy na request-count cap, opt-in lamang
  - `OMNIROUTE_CHAT_ADMISSION_QUEUE_MS` — tagal ng paghihintay sa queue bago ang 503 (default 2000)
  - `OMNIROUTE_CHAT_ADMISSION_MAX_QUEUED_BYTES` — heap valve para sa mga naka-queue na byte (default 4 MB)
  - `OMNIROUTE_CHAT_VIRTUAL_TTL_MS` / `OMNIROUTE_CHAT_VIRTUAL_MAX_SESSIONS` — deprecated
    na mga no-op mula noong #10110 (tinatanggap para sa compatibility ng config, ngunit binabalewala)
- **Mga ulat:** `GET /api/monitoring/health` → `chatAdmission` (#11244) — kabilang
  ang mga idinagdag ng #503-fanout na `inflightBytes`, `maxInflightBytes`,
  `budgetSource` (`v8_heap` | `cgroup` | `override`), `pressureSeverity`, at
  `countCapEnabled` (false sa isang default na deployment — kinukumpirma nitong
  ang byte budget, at hindi ang legacy na count cap, ang aktuwal na umiiral na
  limitasyon).

## 2. Mga adaptive runtime virtual lane (`open-sse/services/admission`)

- **Saklaw:** admission gamit ang tenant key para sa provider dispatch — queue cost, pag-aangkop ng limitasyon batay sa latency, pagpila sa lane, at mga sukatan ng lane.
- **Gate:** **opt-in.** Naka-disable maliban kung `OMNIROUTE_CHAT_VIRTUAL_LANES=true`. Kung wala ito, pananatilihin ng adaptive controller ang gawi ng shared queue (malalapat lamang ang criterion 1 ng #9654 kapag pinagana ng operator ang mga lane).
- **Pag-tune:** `OMNIROUTE_CHAT_VIRTUAL_LANES` + adaptive config (`maxQueueCount`, `maxQueueCost`, `defaultMaxWaitMs`, …).
- **Mga ulat:** `GET /api/monitoring/health` → `adaptiveAdmission` → `laneCount`, `laneQueuedCount`, `laneQueuedCost`, `laneTenants` (mga opaque na lane ID, hindi kailanman mga raw key), at `virtualLanes` — ang awtoritatibong flag na "naka-on ang mga lane" sa snapshot.

## 3. Mga fan-out probe — per-target admission para sa combo/fusion (#9654 Wave 2)

Ang combo (priority / round-robin) at fusion ay nagfa-fan out ng N target na modelo sa ilalim ng isang parent request. Mula noong #9654 Wave 2, **gine-gate ang bawat fan-out target bago ang dispatch** sa pamamagitan ng isang per-target probe (`PerTargetAdmissionHook`, na binubuo ng `createPerTargetAdmissionHook`) laban sa tenant lane ng **parent**.

- **Saklaw:** bawat fan-out target na dini-dispatch ng combo, fusion, at chaos engine. Hindi naaapektuhan ang System 1 (byte-level) — hindi ito kailanman nagpo-probe ng mga fan-out target.
- **Gate:** **opt-in kasama ng system 2.** No-op kapag hindi naka-set ang `OMNIROUTE_CHAT_VIRTUAL_LANES` — hawak na ng parent request ang shared-queue lease sa mode na iyon, kaya ang pag-probe ay magdudulot ng dobleng pagbilang at pagtanggi sa mga combo target.
- **Semantika:**
  - **Mahigpit na non-blocking — i-skip, huwag kailanman ipila.** `maxWaitMs 0`: ini-skip ng punong lane ang target at ang fallback machinery ng combo (o ang survivor panel ng fusion) ang nagsisilbi sa halip. Sinadya ito: kalabisan na trabaho ang isang fan-out target, at ang pagpila rito ay nagdaragdag ng load sa mismong congestion na nilalayong pigilan ng mga lane. Samakatuwid, nalalapat lamang ang `defaultMaxWaitMs` sa **parent request**; hindi kailanman naghihintay ang mga fan-out probe, at sadyang **walang knob** upang paghintayin ang mga ito (ipinapakita ng kasaysayan ng issue na ang mga wait knob ay nagdulot ng klase ng maramihang 502/504 na pinipigilan ng #9654 — muling suriin lamang kung iuulat ng operator na pinabababa ng mga na-skip na fan-out target ang kalidad ng tugon).
  - **Release-on-admit.** Agad na nire-release ng isang na-admit na probe ang lease nito: isa itong capacity gate, hindi isang hold. Sinasaklaw ng lease ng parent ang fan-out; ang pag-hold ng N pang lease ay magpapalaki sa shared active cost at hahantong sa pagtanggi sa ibang mga tenant. Best-effort ito, hindi isang reservation: maaaring mapuno muli ang lane sa pagitan ng probe at dispatch, kaya sa ilalim ng matinding contention, maaaring mag-admit ang gate sa isang lane na puno na ulit pagsapit ng dispatch ng target.
  - **Pinipresyuhan mula sa aktuwal na fan-out body.** Tinatantiya ng probe ang cost mula sa aktuwal na body ng target — kabilang ang request class na hinango mula sa `stream` flag nito, eksaktong gaya ng parent path — kaya ang mga miyembro ng fusion panel (`stream: false`) ay pinipresyuhan ayon sa non-streaming class na aktuwal nilang gagamitin, at ang mga priority/RR target naman ayon sa anumang hiniling ng user.
- **Mga ulat:** pinapataas ng isang probe skip pagkatapos ng unang target ang per-request na `fallbackCount` ng combo (alinsunod sa umiiral na fallback semantics; makikita sa mga combo log); nagbabalik ang fusion ng 503 kapag na-skip ang bawat miyembro ng panel. **Walang aggregate counter** (hal. `virtualFanoutSkipped`) sa snapshot sa kasalukuyan — kung iuulat ng operator na hindi nila matukoy kung gaano kadalas ini-skip ng lane gate ang mga fan-out target, iyon ang magiging trigger upang magdagdag nito.

## Alin ang lumalabas sa dashboard

- `adaptiveAdmission.laneCount` / `laneTenants` → **mga adaptive virtual lane** (system 2).
- `adaptiveAdmission.virtualLanes === true` → aktibo rin ang mga fan-out probe ng seksyon 3.
  Ang payload na walang `virtualLanes` o may halagang `false` ay nangangahulugang
  hindi nakatakda ang `OMNIROUTE_CHAT_VIRTUAL_LANES` — aktibo pa rin ang mga
  byte-level lane (system 1), ngunit walang anumang nasa ilalim ng
  `adaptiveAdmission` (at walang fan-out gating) na umiiral hanggang sa paganahin ito.

## Bakit parehong umiiral ang mga ito

Nililimitahan ng mga byte-level lane ang parse/compress path na mabigat sa memory;
nililimitahan naman ng mga adaptive lane ang gastos sa dispatch para sa bawat tenant.
Ang criterion 1 ng #9654 ("hindi nagdudulot ng 503 sa isa pa ang bugso ng isang session")
ay ipinapatupad nang walang kondisyon ng system 1 at ng system 2 kapag pinagana na ang
opt-in.

## 4. Mahabang `/v1/responses` sa iisang proseso (healthy-headroom)

Idinagdag ng [#10437](https://github.com/diegosouzapw/OmniRoute/pull/10437) ang
`tryAcquireHealthyHeadroom` upang tanggapin ang pangalawang request na mabigat sa
estruktura kapag mas mababa ang heap sa `OMNIROUTE_CHAT_ADMISSION_HEAP_SHED_RATIO`.
Ginagamit ng BYTE path na ginagamit ng `admitChatRequest` (mga body na ≥
`OMNIROUTE_CHAT_LARGE_BODY_BYTES`, default na 256 KiB, kabilang ang
`POST /v1/responses`) ang **parehong** palugit.

Ito ang sinusuportahang recipe para sa **iisang proseso** upang magkaroon ng higit
sa dalawang sabay-sabay na mahabang SSE `/v1/responses`: itaas lamang ang primary +
healthy-headroom hanggang sa limitasyong pinahihintulutan ng heap at ng
process-wide inflight-byte budget (`OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES` / #10110).
Ang sampu-sampung mahahabang SSE client (40–50) ay usapin ng memory budget na iyon,
hindi isang mahigpit na limitasyon ng produkto na “max 2.” Patuloy pa ring
nagse-shed ang heap na nasa ilalim ng pressure gamit ang retryable na `503` upang
hindi bumalik ang #7849.

Upang **paramihin ang mga heap**, magpatakbo ng N magkakahiwalay na `DATA_DIR`
(#11024). Huwag kailanman gumamit ng `replicas > 1` sa iisang SQLite file (#10350).
Ang seksyong ito ay hindi muling pagbubukas ng DATA_DIR scale-out recipe.
