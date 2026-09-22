# Admission lanes (#9654) — two lane systems, what gates each, where each reports (Yorùbá)

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/admission-lanes.md) · 🇪🇹 [am](../../../am/docs/architecture/admission-lanes.md) · 🇸🇦 [ar](../../../ar/docs/architecture/admission-lanes.md) · 🇦🇿 [az](../../../az/docs/architecture/admission-lanes.md) · 🇧🇬 [bg](../../../bg/docs/architecture/admission-lanes.md) · 🇧🇩 [bn](../../../bn/docs/architecture/admission-lanes.md) · 🇨🇿 [cs](../../../cs/docs/architecture/admission-lanes.md) · 🇩🇰 [da](../../../da/docs/architecture/admission-lanes.md) · 🇩🇪 [de](../../../de/docs/architecture/admission-lanes.md) · 🇬🇷 [el](../../../el/docs/architecture/admission-lanes.md) · 🇪🇸 [es](../../../es/docs/architecture/admission-lanes.md) · 🇪🇪 [et](../../../et/docs/architecture/admission-lanes.md) · 🇮🇷 [fa](../../../fa/docs/architecture/admission-lanes.md) · 🇫🇮 [fi](../../../fi/docs/architecture/admission-lanes.md) · 🇫🇷 [fr](../../../fr/docs/architecture/admission-lanes.md) · 🇮🇪 [ga](../../../ga/docs/architecture/admission-lanes.md) · 🇮🇳 [gu](../../../gu/docs/architecture/admission-lanes.md) · 🇳🇬 [ha](../../../ha/docs/architecture/admission-lanes.md) · 🇮🇱 [he](../../../he/docs/architecture/admission-lanes.md) · 🇮🇳 [hi](../../../hi/docs/architecture/admission-lanes.md) · 🇭🇷 [hr](../../../hr/docs/architecture/admission-lanes.md) · 🇭🇺 [hu](../../../hu/docs/architecture/admission-lanes.md) · 🇦🇲 [hy](../../../hy/docs/architecture/admission-lanes.md) · 🇮🇩 [id](../../../id/docs/architecture/admission-lanes.md) · 🇳🇬 [ig](../../../ig/docs/architecture/admission-lanes.md) · 🇮🇹 [it](../../../it/docs/architecture/admission-lanes.md) · 🇯🇵 [ja](../../../ja/docs/architecture/admission-lanes.md) · 🇬🇪 [ka](../../../ka/docs/architecture/admission-lanes.md) · 🇰🇭 [km](../../../km/docs/architecture/admission-lanes.md) · 🇮🇳 [kn](../../../kn/docs/architecture/admission-lanes.md) · 🇰🇷 [ko](../../../ko/docs/architecture/admission-lanes.md) · 🇱🇹 [lt](../../../lt/docs/architecture/admission-lanes.md) · 🇱🇻 [lv](../../../lv/docs/architecture/admission-lanes.md) · 🇮🇳 [ml](../../../ml/docs/architecture/admission-lanes.md) · 🇮🇳 [mr](../../../mr/docs/architecture/admission-lanes.md) · 🇲🇾 [ms](../../../ms/docs/architecture/admission-lanes.md) · 🇲🇹 [mt](../../../mt/docs/architecture/admission-lanes.md) · 🇲🇲 [my](../../../my/docs/architecture/admission-lanes.md) · 🇳🇵 [ne](../../../ne/docs/architecture/admission-lanes.md) · 🇳🇱 [nl](../../../nl/docs/architecture/admission-lanes.md) · 🇳🇴 [no](../../../no/docs/architecture/admission-lanes.md) · 🇮🇳 [or](../../../or/docs/architecture/admission-lanes.md) · 🇮🇳 [pa](../../../pa/docs/architecture/admission-lanes.md) · 🇵🇭 [phi](../../../phi/docs/architecture/admission-lanes.md) · 🇵🇱 [pl](../../../pl/docs/architecture/admission-lanes.md) · 🇵🇹 [pt](../../../pt/docs/architecture/admission-lanes.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/admission-lanes.md) · 🇷🇴 [ro](../../../ro/docs/architecture/admission-lanes.md) · 🇷🇺 [ru](../../../ru/docs/architecture/admission-lanes.md) · 🇱🇰 [si](../../../si/docs/architecture/admission-lanes.md) · 🇸🇰 [sk](../../../sk/docs/architecture/admission-lanes.md) · 🇸🇮 [sl](../../../sl/docs/architecture/admission-lanes.md) · 🇷🇸 [sr](../../../sr/docs/architecture/admission-lanes.md) · 🇸🇪 [sv](../../../sv/docs/architecture/admission-lanes.md) · 🇰🇪 [sw](../../../sw/docs/architecture/admission-lanes.md) · 🇮🇳 [ta](../../../ta/docs/architecture/admission-lanes.md) · 🇮🇳 [te](../../../te/docs/architecture/admission-lanes.md) · 🇹🇭 [th](../../../th/docs/architecture/admission-lanes.md) · 🇹🇷 [tr](../../../tr/docs/architecture/admission-lanes.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/admission-lanes.md) · 🇵🇰 [ur](../../../ur/docs/architecture/admission-lanes.md) · 🇺🇿 [uz](../../../uz/docs/architecture/admission-lanes.md) · 🇻🇳 [vi](../../../vi/docs/architecture/admission-lanes.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/admission-lanes.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/admission-lanes.md)

---

OmniRoute ní àwọn ètò lane abẹ́lé-process **méjì** tí ìwọ̀n iṣẹ́ wọn yàtọ̀. Wọ́n ń ṣiṣẹ́ pọ̀ láti mú ara wọn pé; ó yẹ kí àwọn olùṣàkóso mọ èyí tí wọ́n ń wò.

## 1. Ìgbàwọlé káàkiri gbogbo iṣẹ́ ní ìpele báìtì (`chatBodyAdmission.ts`)

- **Ààlà:** ọ̀nà buffered-body/heap fún `POST /v1/chat/completions`,
  `/v1/messages`, `/v1/responses`, àti àwọn ipa-ọ̀nà mìíràn tó ní ìrísí ìfọ̀rọ̀wérọ̀. Ó ń dáàbò bo
  lòdì sí ìmúgbòòrò heap láti ara àwọn body coding-agent ńlá (#4380).
- **Olùdarí kan ṣoṣo fún gbogbo process, kì í ṣe àwọn lane ọ̀tọ̀ọ̀tọ̀ fún kọ́kọ́rọ́ kọ̀ọ̀kan (#10110).** Gbogbo API key
  (tí a ti hash) tàbí session `anonymous` ń gba ìgbàwọlé lábẹ́ **ìnáwó** àjọpín kan náà —
  hashed session id náà ni a lò NÌKAN gẹ́gẹ́ bí kọ́kọ́rọ́ ìṣètò tó ń mú ìdájọ́ òdodo wá (ìfiranṣẹ́
  round-robin láàárín àwọn olùdúró), kì í ṣe gẹ́gẹ́ bí ẹ̀ka agbára rárá. Ẹ̀yà àkọ́kọ́ kan ti
  ìwé yìí ṣàpèjúwe àwọn lane ọ̀tọ̀ọ̀tọ̀ fún kọ́kọ́rọ́ kọ̀ọ̀kan pẹ̀lú agbára olómìnira; a
  yọ àwòṣe yẹn kúrò ní #10110 nítorí ó jẹ́ kí àwọn ẹ̀rí ìdánimọ̀ èké tí kò ní ìfàṣẹsí
  lè sọ ààlà káàkiri gbogbo process di púpọ̀.
- **Ẹnu-ọ̀nà (#503-fanout): ìnáwó BYTE fún ingest tí a ń ṣèdá jáde fúnra rẹ̀, kì í ṣe iye request
  tí a ti fi ìdí rẹ̀ múlẹ̀.** Ààlà iye request ti àtijọ́ `CHAT_MAX_HEAVY_IN_FLIGHT` (àkọ́kọ́ rẹ̀ jẹ́ `1`
  ṣáájú àtúnṣe yìí) dín fan-out coding-agent (ọ̀pọ̀ subagent/CLI,
  tí àwọn body wọn sábà máa ń ju 256 KB lọ) kù sí concurrency tó fẹ́rẹ̀ẹ́ jẹ́ ~1, èyí tó ń fa
  503 lábẹ́ load tó jẹ́ ti déédéé pátápátá. Ní báyìí, ó máa ń ní ipa kìkì nígbà tí olùṣàkóso bá ṣètò
  `OMNIROUTE_CHAT_MAX_HEAVY_IN_FLIGHT` ní tààrà. Bí a kò bá ṣètò rẹ̀, ìgbàwọlé yóò dípò bẹ́ẹ̀
  jẹ́ dídènà nípasẹ̀ `OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES` — ìnáwó tí a ṣèdá jáde fúnra rẹ̀ láti inú
  ààlà memory gidi ti process náà (`src/shared/middleware/admissionBudget.ts`):
  25% ti èyí tó le jù láàárín ààlà V8 heap àti ààlà cgroup/container èyíkéyìí,
  tí a pín pẹ̀lú ifosiwewe ìmúgbòòrò ìgbà-díẹ̀ 8x, tí a sì fi ààlà sí láàárín 8 MiB àti
  2 GiB. Àwọn override tí a ṣètò ní tààrà ń lo àwọn ààlà kan náà. Èyí ń mú ara rẹ̀ bá ìwọ̀n mu láti
  container 512 MB dé desktop 32 GB láìsí àtúnṣe env kankan. Body tí kò lè
  wọ inú ìnáwó tó ń ṣiṣẹ́ yóò kùnà lẹ́sẹ̀kẹsẹ̀ pẹ̀lú `413 body_exceeds_budget`;
  ìdíje láàárín àwọn body tí ọ̀kọ̀ọ̀kan lè ṣiṣẹ́ nìkan ló ń wọ queue ìdájọ́ òdodo
  tó ní ààlà. Olùtọpa ìfúnpá ohun àmúlò tó ń ṣiṣẹ́ lọ́wọ́lọ́wọ́, tó sì ń lo ọ̀pọ̀ àmì (ìpín V8 heap,
  cgroup, PSI, àwọn ìṣẹ̀lẹ̀ OOM — `open-sse/utils/resourcePressurePolicy.ts`) ń dín
  àkókò ìdúró tó ní ààlà kù lábẹ́ ìfúnpá `high`, ó sì ń dín load kù lẹ́sẹ̀kẹsẹ̀ pẹ̀lú
  `503 resource_pressure` lábẹ́ ìfúnpá `critical`, kí a tó ingest báìtì kankan pàápàá.
  A ń ka PSI láti inú `memory.pressure` cgroup ti unit yìí nígbà tó bá wà
  (`open-sse/utils/resourcePressureSampler.ts`); `/proc/pressure/memory` jẹ́ ti gbogbo
  host, a sì ń lò ó gẹ́gẹ́ bí fallback nìkan lórí bare metal / cgroup v1, nítorí náà host
  tó ń ṣe swapping kò lè mú container tó wà ní idle dá 503 padà.
- **Àtúnṣe ètò:**
  - `OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES` — override fún ìnáwó báìtì tí a ṣèdá jáde fúnra rẹ̀
  - `OMNIROUTE_CHAT_MAX_HEAVY_IN_FLIGHT` — ààlà iye request ti àtijọ́, a gbọ́dọ̀ yan láti lò ó nìkan
  - `OMNIROUTE_CHAT_ADMISSION_QUEUE_MS` — ìdúró queue ṣáájú 503 (àkọ́kọ́ 2000)
  - `OMNIROUTE_CHAT_ADMISSION_MAX_QUEUED_BYTES` — valve heap fún àwọn báìtì tó wà ní queue (àkọ́kọ́ 4 MB)
  - `OMNIROUTE_CHAT_VIRTUAL_TTL_MS` / `OMNIROUTE_CHAT_VIRTUAL_MAX_SESSIONS` — kò yẹ ká máa lò mọ́
    àti pé wọn kò ṣe ohunkóhun láti #10110 (a tẹ́wọ́ gbà wọ́n fún ìbámu config, ṣùgbọ́n a kọbi ara sí wọn)
- **Àwọn ìròyìn:** `GET /api/monitoring/health` → `chatAdmission` (#11244) — pẹ̀lú
  àwọn àfikún #503-fanout `inflightBytes`, `maxInflightBytes`, `budgetSource`
  (`v8_heap` | `cgroup` | `override`), `pressureSeverity`, àti `countCapEnabled`
  (false lórí deployment àkọ́kọ́ — èyí ń jẹ́rìí pé ìnáwó báìtì, kì í ṣe ààlà iye
  ti àtijọ́, ni ohun tó ń dí agbára lọ́wọ́ ní ti gidi).

## 2. Àwọn ọ̀nà foju àkókò-ṣiṣẹ́ tó ń ṣe àtúnṣe ara wọn (`open-sse/services/admission`)

- **Ààlà:** ìgbàwọlé tó dá lórí kọ́kọ́rọ́ ayálégbé fún fífi iṣẹ́ ránṣẹ́ sí olùpèsè — iye-owó ìlà, àtúnṣe
  ààlà tó ń tẹ̀lé ìdádúró, fífi iṣẹ́ sí ìlà ọ̀nà, àti àwọn ìwọ̀n ọ̀nà.
- **Ẹnu-ọ̀nà:** **nípasẹ̀ yíyàn láti darapọ̀.** Ó jẹ́ aláṣiṣẹ́ àyàfi tí `OMNIROUTE_CHAT_VIRTUAL_LANES=true`. Láìsí èyí,
  olùdarí tó ń ṣe àtúnṣe ara rẹ̀ yóò pa ìhùwàsí ìlà àjọpín mọ́ (àwárí 1 ti #9654 yóò
  wúlò kìkì lẹ́yìn tí olùṣiṣẹ́ bá tan àwọn ọ̀nà).
- **Àtúnṣe:** `OMNIROUTE_CHAT_VIRTUAL_LANES` + àgbékalẹ̀ àtúnṣe ara-ẹni (`maxQueueCount`,
  `maxQueueCost`, `defaultMaxWaitMs`, …).
- **Àwọn ìròyìn:** `GET /api/monitoring/health` → `adaptiveAdmission` → `laneCount`,
  `laneQueuedCount`, `laneQueuedCost`, `laneTenants` (àwọn ID ọ̀nà tí a kò lè túmọ̀, kì í ṣe àwọn
  kọ́kọ́rọ́ gidi), àti `virtualLanes` — àmì “àwọn ọ̀nà ti ṣiṣẹ́” tó jẹ́ orísun òtítọ́ nínú àwòrán-ipò.

## 3. Àwọn ìdánwò fan-out — ìgbàwọlé fún olúkúlùkù ibi-àfojúsùn fún combo/fusion (#9654 Wave 2)

Combo (ààyò / round-robin) àti fusion ń pín iṣẹ́ sí ibi-àfojúsùn awoṣe N lábẹ́ ìbéèrè
òbí kan. Láti #9654 Wave 2, **a ń ṣàyẹ̀wò ibi-àfojúsùn fan-out kọ̀ọ̀kan ní ẹnu-ọ̀nà kí a tó fi ránṣẹ́** nípasẹ̀
ìdánwò fún olúkúlùkù ibi-àfojúsùn (`PerTargetAdmissionHook`, tí `createPerTargetAdmissionHook` kọ́)
lòdì sí ọ̀nà ayálégbé ti **òbí**.

- **Ààlà:** gbogbo ibi-àfojúsùn fan-out tí combo, fusion, àti ẹ̀rọ chaos fi ránṣẹ́.
  System 1 (ìpele byte) kò ní ìyípadà — kò ṣe ìdánwò àwọn ibi-àfojúsùn fan-out rárá.
- **Ẹnu-ọ̀nà:** **nípasẹ̀ yíyàn láti darapọ̀ pẹ̀lú system 2.** Kò ṣe ohunkóhun nígbà tí a kò bá ṣètò `OMNIROUTE_CHAT_VIRTUAL_LANES`
  — ìbéèrè òbí ti di àṣẹ lílò ìlà àjọpín mú ní ipò yẹn,
  nítorí náà ṣíṣe ìdánwò yóò ka a lẹ́ẹ̀mejì, yóò sì kọ àwọn ibi-àfojúsùn combo.
- **Ìtumọ̀ ìhùwàsí:**
  - **Kò ní dí iṣẹ́ dúró rárá — fò ó kọjá, má ṣe fi sí ìlà.** `maxWaitMs 0`: ọ̀nà tó kún
    yóò fò ibi-àfojúsùn náà kọjá, ètò ìpadà-sẹ́yìn combo (tàbí àkójọpọ̀ àwọn tó yè ti fusion)
    yóò sì ṣiṣẹ́ dípò rẹ̀. Ìpinnu mọ̀ọ́mọ̀ ni èyí: ibi-àfojúsùn fan-out jẹ́
    iṣẹ́ àfikún tí kò pọn dandan, fífi sí ìlà sì ń kó ẹrù sí i lórí ibi ìkọ̀sílẹ̀ gan-an tí a dá àwọn ọ̀nà
    láti dá dúró. Nítorí náà, `defaultMaxWaitMs` kan **ìbéèrè òbí nìkan**;
    àwọn ìdánwò fan-out kì í dúró, a sì mọ̀ọ́mọ̀ **kò pèsè àṣàyàn ìṣàkóso kankan** láti mú
    wọn dúró (ìtàn ọ̀ràn fi hàn pé àwọn àṣàyàn ìdúró fa ọ̀wọ́ mass-502/504
    tí #9654 ń dènà — ẹ tún gbé e yẹ̀wò kìkì bí olùṣiṣẹ́ kan bá ròyìn pé àwọn ibi-àfojúsùn fan-out
    tí a fò kọjá ń ba dídára ìdáhùn jẹ́).
  - **Tu sílẹ̀ lẹ́yìn ìgbàwọlé.** Ìdánwò tí a gbà wọlé yóò tu àṣẹ lílò rẹ̀ sílẹ̀ lẹ́sẹ̀kẹsẹ̀: ó jẹ́
    ẹnu-ọ̀nà agbára, kì í ṣe ìdádúró. Àṣẹ lílò òbí bo fan-out; dídì N
    míì mú yóò mú iye-owó iṣẹ́ àjọpín tó ń ṣiṣẹ́ pọ̀ ju bó ṣe yẹ lọ, yóò sì kọ àwọn ayálégbé mìíràn. Ìsapá-tó-dára-jù-lọ,
    kì í ṣe ìfipamọ́: ọ̀nà náà lè tún kún láàárín ìdánwò àti fífi iṣẹ́ ránṣẹ́, nítorí náà lábẹ́
    ìjà líle fún agbára, ẹnu-ọ̀nà lè gba iṣẹ́ wọ ọ̀nà kan tó ti tún kún
    nígbà tí a bá fi ibi-àfojúsùn náà ránṣẹ́.
  - **A ń díwọ̀n iye-owó láti inú body fan-out gidi.** Ìdánwò náà ń ṣírò iye-owó láti inú
    body gidi ti ibi-àfojúsùn — pẹ̀lú ẹ̀ka ìbéèrè tí a yọ láti inú àmì `stream`
    rẹ̀, gẹ́gẹ́ bí ipa-ọ̀nà òbí — kí a lè díwọ̀n iye-owó àwọn ọmọ ẹgbẹ́ àkójọpọ̀ fusion (`stream: false`)
    ní ẹ̀ka tí kì í ṣe streaming tí wọ́n máa lò ní tòótọ́, àti ti àwọn ibi-àfojúsùn priority/RR
    gẹ́gẹ́ bí ohun tí aṣàmúlò béèrè.
- **Àwọn ìròyìn:** fífo ìdánwò kan kọjá lẹ́yìn ibi-àfojúsùn àkọ́kọ́ yóò mú `fallbackCount`
  combo fún ìbéèrè kọ̀ọ̀kan pọ̀ sí i (ní àfarawé ìtumọ̀ ìpadà-sẹ́yìn tó ti wà; ó hàn nínú àwọn log combo);
  fusion yóò dá 503 padà nígbà tí a bá fò gbogbo ọmọ ẹgbẹ́ àkójọpọ̀ kọjá. **Kò sí
  counter àpapọ̀** (fún àpẹẹrẹ `virtualFanoutSkipped`) lórí àwòrán-ipò lọ́wọ́lọ́wọ́ —
  bí olùṣiṣẹ́ kan bá ròyìn pé wọn kò lè mọ bí ẹnu-ọ̀nà ọ̀nà ṣe máa ń fò àwọn ibi-àfojúsùn fan-out
  kọjá léraléra, ìyẹn ni àmì láti fi ọ̀kan kún un.

## Èwo ló ń hàn lórí pánẹ́ẹ̀lì ìṣàkóso

- `adaptiveAdmission.laneCount` / `laneTenants` → **àwọn ọ̀nà aláfojúrí aṣamubadọ́gba** (ètò 2).
- `adaptiveAdmission.virtualLanes === true` → àwọn ìwádìí fan-out ti abala 3 tún
  ń ṣiṣẹ́. Payload tí `virtualLanes` kò sí nínú rẹ̀ tàbí tí ó jẹ́ `false` túmọ̀ sí pé
  a kò ṣètò `OMNIROUTE_CHAT_VIRTUAL_LANES` — àwọn ọ̀nà ipele-byte (ètò 1) ṣì
  ń ṣiṣẹ́, ṣùgbọ́n kò sí ohunkóhun lábẹ́ `adaptiveAdmission` (bẹ́ẹ̀ ni kò sí ìdènà fan-out)
  tí yóò ṣiṣẹ́ títí tí a ó fi mú un ṣiṣẹ́.

## Ìdí tí àwọn méjèèjì fi wà

Àwọn ọ̀nà ipele-byte ń fi ààlà sí ipa-ọ̀nà parse/compress tó ń lo memory púpọ̀; àwọn ọ̀nà aṣamubadọ́gba
ń fi ààlà sí iye owó dispatch fún tenant kọ̀ọ̀kan. Èédú #9654 ti 1 ("ìbújáde session kan kì í fa 503 fún
òmíràn") ni ètò 1 ń fi agbára mú láìsí àdéhùn kankan, ètò 2 sì ń fi agbára mú un nígbà tí a bá ti mú opt-in ṣiṣẹ́.

## 4. `/v1/responses` gígùn nínú process kan (ààyè-àfikún nígbà tí ó ní ìlera)

[#10437](https://github.com/diegosouzapw/OmniRoute/pull/10437) ṣàfikún
`tryAcquireHealthyHeadroom` kí a lè gba request kejì tó ní ìgbékalẹ̀ tó wuwo wọlé
nígbà tí heap bá wà ní ìsàlẹ̀ `OMNIROUTE_CHAT_ADMISSION_HEAP_SHED_RATIO`. Ipa-ọ̀nà BYTE
tí `admitChatRequest` ń lò (bodies ≥ `OMNIROUTE_CHAT_LARGE_BODY_BYTES`,
àìyípadà 256 KiB, pẹ̀lú `POST /v1/responses`) ń lo **ọ̀nà àbáyọ kan náà**.

Èyí ni ìlànà **process-kan** tí a ṣe àtìlẹ́yìn fún láti ní ju SSE `/v1/responses`
gígùn méjì lọ tí ń ṣiṣẹ́ lẹ́ẹ̀kan náà: gbé primary + healthy-headroom sókè kìkì dé ibi tí heap
àti ìnáwó inflight-byte jákèjádò process (`OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES`
/ #10110) bá gba láàyè. Àwọn client SSE gígùn tó jẹ́ mẹ́wàá-mẹ́wàá (40–50) jẹ́ ìbéèrè
nípa ìnáwó memory yẹn, kì í ṣe ààlà ọjà líle ti “ó pọ̀ jù 2”. Heap tó wà lábẹ́ ìfúnpá ṣì máa
kọ̀ request sílẹ̀ pẹ̀lú `503` tí a lè tún gbìyànjú, kí #7849 má bàa padà.

Láti **sọ heaps di púpọ̀**, ṣiṣẹ́ N `DATA_DIR` olómìnira (#11024). Má ṣe lo
`replicas > 1` lórí fáìlì SQLite kan láéláé (#10350). Abala yìí kì í ṣe ṣíṣí
ìlànà scale-out DATA_DIR padà.
