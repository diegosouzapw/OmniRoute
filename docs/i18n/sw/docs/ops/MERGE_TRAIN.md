# Merge Queue & Manual Merge-Train Runbook (Kiswahili)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/MERGE_TRAIN.md) · 🇪🇹 [am](../../../am/docs/ops/MERGE_TRAIN.md) · 🇸🇦 [ar](../../../ar/docs/ops/MERGE_TRAIN.md) · 🇦🇿 [az](../../../az/docs/ops/MERGE_TRAIN.md) · 🇧🇬 [bg](../../../bg/docs/ops/MERGE_TRAIN.md) · 🇧🇩 [bn](../../../bn/docs/ops/MERGE_TRAIN.md) · 🇧🇦 [bs](../../../bs/docs/ops/MERGE_TRAIN.md) · 🇨🇿 [cs](../../../cs/docs/ops/MERGE_TRAIN.md) · 🇩🇰 [da](../../../da/docs/ops/MERGE_TRAIN.md) · 🇩🇪 [de](../../../de/docs/ops/MERGE_TRAIN.md) · 🇬🇷 [el](../../../el/docs/ops/MERGE_TRAIN.md) · 🇪🇸 [es](../../../es/docs/ops/MERGE_TRAIN.md) · 🇪🇪 [et](../../../et/docs/ops/MERGE_TRAIN.md) · 🇮🇷 [fa](../../../fa/docs/ops/MERGE_TRAIN.md) · 🇫🇮 [fi](../../../fi/docs/ops/MERGE_TRAIN.md) · 🇫🇷 [fr](../../../fr/docs/ops/MERGE_TRAIN.md) · 🇮🇪 [ga](../../../ga/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [gu](../../../gu/docs/ops/MERGE_TRAIN.md) · 🇳🇬 [ha](../../../ha/docs/ops/MERGE_TRAIN.md) · 🇮🇱 [he](../../../he/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [hi](../../../hi/docs/ops/MERGE_TRAIN.md) · 🇭🇷 [hr](../../../hr/docs/ops/MERGE_TRAIN.md) · 🇭🇺 [hu](../../../hu/docs/ops/MERGE_TRAIN.md) · 🇦🇲 [hy](../../../hy/docs/ops/MERGE_TRAIN.md) · 🇮🇩 [id](../../../id/docs/ops/MERGE_TRAIN.md) · 🇳🇬 [ig](../../../ig/docs/ops/MERGE_TRAIN.md) · 🇮🇹 [it](../../../it/docs/ops/MERGE_TRAIN.md) · 🇯🇵 [ja](../../../ja/docs/ops/MERGE_TRAIN.md) · 🇬🇪 [ka](../../../ka/docs/ops/MERGE_TRAIN.md) · 🇰🇭 [km](../../../km/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [kn](../../../kn/docs/ops/MERGE_TRAIN.md) · 🇰🇷 [ko](../../../ko/docs/ops/MERGE_TRAIN.md) · 🇱🇹 [lt](../../../lt/docs/ops/MERGE_TRAIN.md) · 🇱🇻 [lv](../../../lv/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [ml](../../../ml/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [mr](../../../mr/docs/ops/MERGE_TRAIN.md) · 🇲🇾 [ms](../../../ms/docs/ops/MERGE_TRAIN.md) · 🇲🇹 [mt](../../../mt/docs/ops/MERGE_TRAIN.md) · 🇲🇲 [my](../../../my/docs/ops/MERGE_TRAIN.md) · 🇳🇵 [ne](../../../ne/docs/ops/MERGE_TRAIN.md) · 🇳🇱 [nl](../../../nl/docs/ops/MERGE_TRAIN.md) · 🇳🇴 [no](../../../no/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [or](../../../or/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [pa](../../../pa/docs/ops/MERGE_TRAIN.md) · 🇵🇭 [phi](../../../phi/docs/ops/MERGE_TRAIN.md) · 🇵🇱 [pl](../../../pl/docs/ops/MERGE_TRAIN.md) · 🇵🇹 [pt](../../../pt/docs/ops/MERGE_TRAIN.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/MERGE_TRAIN.md) · 🇷🇴 [ro](../../../ro/docs/ops/MERGE_TRAIN.md) · 🇷🇺 [ru](../../../ru/docs/ops/MERGE_TRAIN.md) · 🇱🇰 [si](../../../si/docs/ops/MERGE_TRAIN.md) · 🇸🇰 [sk](../../../sk/docs/ops/MERGE_TRAIN.md) · 🇸🇮 [sl](../../../sl/docs/ops/MERGE_TRAIN.md) · 🇷🇸 [sr](../../../sr/docs/ops/MERGE_TRAIN.md) · 🇸🇪 [sv](../../../sv/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [ta](../../../ta/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [te](../../../te/docs/ops/MERGE_TRAIN.md) · 🇹🇭 [th](../../../th/docs/ops/MERGE_TRAIN.md) · 🇹🇷 [tr](../../../tr/docs/ops/MERGE_TRAIN.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/MERGE_TRAIN.md) · 🇵🇰 [ur](../../../ur/docs/ops/MERGE_TRAIN.md) · 🇺🇿 [uz](../../../uz/docs/ops/MERGE_TRAIN.md) · 🇻🇳 [vi](../../../vi/docs/ops/MERGE_TRAIN.md) · 🇳🇬 [yo](../../../yo/docs/ops/MERGE_TRAIN.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/MERGE_TRAIN.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/MERGE_TRAIN.md)

---

Tangu v3.8.49 (WS3.2/WS3.4 ya mpango wa quality/velocity), njia chaguo-msingi ya kuunganisha
PR zilizokaguliwa kwenye `release/vX.Y.Z` ni **foleni ya uunganishaji ya Mergify** (`.mergify.yml`);
**treni ya uunganishaji ya mikono** iliyoelezwa hapa chini ni NJIA MBADALA — hutumika wakati wa matukio,
vipindi vya kusitisha matoleo, au ikiwa mpango wa Mergify Open Source utabadilika.

## Njia chaguo-msingi: foleni ya Mergify

1. PR hukaguliwa/huidhinishwa na kampeni na kuidhinishwa na lango la ⭐ la kabla ya kuunganisha
   la mmiliki (ripoti + uamuzi wa kila kipengee — tazama `/merge-prs` Hatua ya 0.75).
2. Mmiliki (au kikao kinachotekeleza uamuzi wa mmiliki) huweka lebo ya **`queue`**.
   Lebo hiyo NDIYO idhini ya kuunganisha; Mergify huitekeleza tu.
3. Mergify huthibitisha PR zilizo kwenye foleni **kwa mfululizo** (moja baada ya nyingine) dhidi ya malango ya haraka
   na kuziunganisha (squash). Ujumuishaji wa mafungu + ugawaji wa kiotomatiki ni kiwango cha kulipia cha Mergify
   ("Cannot use Merge Queue batch" kwenye mpango wa bila malipo, #7220), kwa hivyo `.mergify.yml` haiweki
   `batch_size`; ujumuishaji wa mafungu unasalia kuwa jukumu la treni ya kuunganisha ya mkono iliyo hapa chini. PR ambayo
   ukaguzi wake bado unasubiri baada ya `checks_timeout` (dakika 240 = mara 2 ya p95 iliyopimwa ya
   `quality.yml`) huondolewa kwenye foleni badala ya kuzuia foleni.
4. Baada ya kuunganisha, mtiririko endelevu wa kazi wa release-green huthibitisha ncha mpya wakati wa push
   na hufungua suala la kuhusisha chanzo ikiwa mchanganyiko huo ulisababisha hitilafu mpya (kamwe haurejeshi kiotomatiki).

Vizuizi vya usalama (vinaakisi `CLAUDE.md` Kanuni Kali #21/#22):

- **Kusitishwa kwa toleo kumeanza** → USIWEKE lebo kwenye PR zinazolenga tawi lililositishwa; elekeza upya kwenye
  `release/vX+1` inayotumika kwanza.
- **PR inayoendelea ya kikao kingine** → usiiwekee lebo kamwe; ni kikao kinachoimiliki pekee kinachoweka
  kazi yake kwenye foleni.
- Tofauti za majaribio pekee na PR zilizo na lebo ya `hotfix` tayari huendesha CI iliyopunguzwa (tazama
  `RELEASE_CHECKLIST.md` → Njia ya Haraka ya Hotfix); masharti ya foleni hukubali seti yoyote ya
  ukaguzi iliyotekelezwa (`#check-failure=0` + `#check-pending=0`).

## Njia mbadala: treni ya uunganishaji ya mikono

Hutumika wakati foleni haipatikani. Hii inarasimisha utaratibu uliokamilisha PR 33 kwa
siku moja wakati wa mzunguko wa v3.8.47:

1. **Kusanya kundi** (takriban PR 10–30 zilizokaguliwa+kuidhinishwa). Kagua migongano ya `linked:`
   (`tap.testFiles` zinazofanana, sehemu zilezile za CHANGELOG) na uchakate hizo kwa mfuatano.
2. **Hakiki MARA MOJA**: katika worktree iliyotengwa kutoka kwenye ncha ya toleo, unganisha vichwa vyote
   vya kundi ndani ya mazingira ya karibu, kisha uendeshe mkusanyiko sawa na wa toleo
   (`npm run check:release-green`, ongeza `--with-build` kabla ya toleo).
   `scripts/release/merge-train.sh <base> <PR#>…` hujiendeshea hatua za 1–2 (PR zinazogongana
   huondolewa, treni huendelea). Hali kamili huendesha `npm run test:unit` — kiendesha
   kilichoboreshwa kwa mashine (`--test-concurrency=20`), **si** vipande viwili vya CI vya core 4
   vinavyoendeshwa kwa mfuatano, ambavyo vilifanya awamu kuu itumie takriban 25% ya mashine ya core 16 (ilirekebishwa
   2026-07-18). `--fast` (ukamilishaji wa treni kubwa ndani ya siku, ulioidhinishwa na mmiliki 2026-07-18)
   hudumisha kila kizuizi tuli + vitest lakini huendesha tu faili za node:test zilizobadilishwa na
   PR zilizoingia kwenye treni; mkusanyiko KAMILI lazima bado uendeshwe angalau mara moja kwa siku kwenye
   ncha iliyokusanywa (treni moja bila `--fast`).
3. **Kijani** → unganisha PR kwa mfuatano (ukikagua upya `state,headRefOid` kabla ya kila moja —
   PR ambayo kichwa chake kimehamishwa hurudi kwenye ukaguzi). Thibitisha kwamba tofauti halisi ya kila uunganishaji ni
   mabadiliko ya PR yenyewe (hakuna urejeshaji wa auto-resolve: kagua `git diff --stat` ili kutambua
   ufutaji ulio nje ya wigo).
4. **Nyekundu** → gawanya kundi katika nusu (hakiki kila nusu) badala ya kuhakiki upya
   moja baada ya nyingine; rudisha PR inayosababisha tatizo kwenye foleni ya ukaguzi pamoja na ushahidi.
5. **Kamwe**: usiunganishe kwenye tawi lililositishwa wakati wa kusitishwa kwa toleo; usitumie `git stash` popote;
   usirudie CI kwa ujumla ukitumaini hali nyekundu itaondoka (kanuni: hali nyekundu ni taarifa).

## Ngazi (kwa nini foleni ni salama kwa kutumia fast-gates pekee)

- **Kwa kila PR** (fast-gates za quality.yml): majaribio yaliyoathiriwa na TIA + vitengo kamili vya shard 4 +
  vitest + mkusanyiko wa lint + typecheck + uadilifu wa docs/changelog.
- **Kwa kila kundi/ncha** (release-green endelevu): vizuizi IMARA vya `--quick` kwa kila push kwenye
  tawi la toleo; ukaguzi kamili wa `--with-build --full-ci` mara 3 kwa siku.
- **Kwa kila toleo** (ci.yml kwenye PR ya toleo): matrix kamili ikijumuisha E2E ×9,
  package-artifact + tarball boot-smoke, coverage/ratchets.

Hakuna kinachohakikiwa kwa kiwango kidogo kuliko awali — sehemu nzito huendeshwa tu kwa kila kundi/ncha
badala ya kwa kila PR, jambo linaloondoa safari za O(N).

## Mahitaji ya awali ya checkout mpya kwa `merge-train.sh`

Script huendesha **preflight** inayositisha mara moja inaposhindwa kwenye checkout ya msingi (kabla ya kazi yoyote ya worktree)
ili usakinishaji ulioharibika usiweze kamwe kujifanya treni nyekundu:

1. `npm ci`, kisha endesha postinstall ya `bun` ambayo npm huzuia:
   `(cd node_modules/bun && node install.js)` — vinginevyo `check:provider-consistency`
   na `check:known-symbols` (zote mbili ni `bun scripts/…`) hushindwa kwenye treni NA kwenye msingi bila
   mstari wa ukiukaji.
2. Kusiwe na `node_modules/node_modules` isiyotarajiwa (mti wa utegemezi uliojirudia; React hupakiwa mara mbili
   na mikusanyiko ya UI ya vitest hushindwa papo hapo).
3. `node_modules/.bin/tsc` iwepo na iweze kutekelezwa (usakinishaji usiokamilika hauna faili hiyo).

Treni huendesha `npm run check:cycles:ratchet` inayozuia; `npm run check:cycles`
pekee ni ya ushauri (huorodhesha SCC na hutoka na hali isiyo sifuri hata kwenye msingi wenye afya).
