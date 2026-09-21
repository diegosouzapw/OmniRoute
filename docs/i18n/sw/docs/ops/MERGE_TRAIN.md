# Merge Queue & Manual Merge-Train Runbook (Kiswahili)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/MERGE_TRAIN.md) · 🇪🇹 [am](../../../am/docs/ops/MERGE_TRAIN.md) · 🇸🇦 [ar](../../../ar/docs/ops/MERGE_TRAIN.md) · 🇦🇿 [az](../../../az/docs/ops/MERGE_TRAIN.md) · 🇧🇬 [bg](../../../bg/docs/ops/MERGE_TRAIN.md) · 🇧🇩 [bn](../../../bn/docs/ops/MERGE_TRAIN.md) · 🇨🇿 [cs](../../../cs/docs/ops/MERGE_TRAIN.md) · 🇩🇰 [da](../../../da/docs/ops/MERGE_TRAIN.md) · 🇩🇪 [de](../../../de/docs/ops/MERGE_TRAIN.md) · 🇬🇷 [el](../../../el/docs/ops/MERGE_TRAIN.md) · 🇪🇸 [es](../../../es/docs/ops/MERGE_TRAIN.md) · 🇪🇪 [et](../../../et/docs/ops/MERGE_TRAIN.md) · 🇮🇷 [fa](../../../fa/docs/ops/MERGE_TRAIN.md) · 🇫🇮 [fi](../../../fi/docs/ops/MERGE_TRAIN.md) · 🇫🇷 [fr](../../../fr/docs/ops/MERGE_TRAIN.md) · 🇮🇪 [ga](../../../ga/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [gu](../../../gu/docs/ops/MERGE_TRAIN.md) · 🇳🇬 [ha](../../../ha/docs/ops/MERGE_TRAIN.md) · 🇮🇱 [he](../../../he/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [hi](../../../hi/docs/ops/MERGE_TRAIN.md) · 🇭🇷 [hr](../../../hr/docs/ops/MERGE_TRAIN.md) · 🇭🇺 [hu](../../../hu/docs/ops/MERGE_TRAIN.md) · 🇦🇲 [hy](../../../hy/docs/ops/MERGE_TRAIN.md) · 🇮🇩 [id](../../../id/docs/ops/MERGE_TRAIN.md) · 🇳🇬 [ig](../../../ig/docs/ops/MERGE_TRAIN.md) · 🇮🇹 [it](../../../it/docs/ops/MERGE_TRAIN.md) · 🇯🇵 [ja](../../../ja/docs/ops/MERGE_TRAIN.md) · 🇬🇪 [ka](../../../ka/docs/ops/MERGE_TRAIN.md) · 🇰🇭 [km](../../../km/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [kn](../../../kn/docs/ops/MERGE_TRAIN.md) · 🇰🇷 [ko](../../../ko/docs/ops/MERGE_TRAIN.md) · 🇱🇹 [lt](../../../lt/docs/ops/MERGE_TRAIN.md) · 🇱🇻 [lv](../../../lv/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [ml](../../../ml/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [mr](../../../mr/docs/ops/MERGE_TRAIN.md) · 🇲🇾 [ms](../../../ms/docs/ops/MERGE_TRAIN.md) · 🇲🇹 [mt](../../../mt/docs/ops/MERGE_TRAIN.md) · 🇲🇲 [my](../../../my/docs/ops/MERGE_TRAIN.md) · 🇳🇵 [ne](../../../ne/docs/ops/MERGE_TRAIN.md) · 🇳🇱 [nl](../../../nl/docs/ops/MERGE_TRAIN.md) · 🇳🇴 [no](../../../no/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [or](../../../or/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [pa](../../../pa/docs/ops/MERGE_TRAIN.md) · 🇵🇭 [phi](../../../phi/docs/ops/MERGE_TRAIN.md) · 🇵🇱 [pl](../../../pl/docs/ops/MERGE_TRAIN.md) · 🇵🇹 [pt](../../../pt/docs/ops/MERGE_TRAIN.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/MERGE_TRAIN.md) · 🇷🇴 [ro](../../../ro/docs/ops/MERGE_TRAIN.md) · 🇷🇺 [ru](../../../ru/docs/ops/MERGE_TRAIN.md) · 🇱🇰 [si](../../../si/docs/ops/MERGE_TRAIN.md) · 🇸🇰 [sk](../../../sk/docs/ops/MERGE_TRAIN.md) · 🇸🇮 [sl](../../../sl/docs/ops/MERGE_TRAIN.md) · 🇷🇸 [sr](../../../sr/docs/ops/MERGE_TRAIN.md) · 🇸🇪 [sv](../../../sv/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [ta](../../../ta/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [te](../../../te/docs/ops/MERGE_TRAIN.md) · 🇹🇭 [th](../../../th/docs/ops/MERGE_TRAIN.md) · 🇹🇷 [tr](../../../tr/docs/ops/MERGE_TRAIN.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/MERGE_TRAIN.md) · 🇵🇰 [ur](../../../ur/docs/ops/MERGE_TRAIN.md) · 🇺🇿 [uz](../../../uz/docs/ops/MERGE_TRAIN.md) · 🇻🇳 [vi](../../../vi/docs/ops/MERGE_TRAIN.md) · 🇳🇬 [yo](../../../yo/docs/ops/MERGE_TRAIN.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/MERGE_TRAIN.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/MERGE_TRAIN.md)

---

Tangu v3.8.49 (WS3.2/WS3.4 ya mpango wa ubora/kasi), njia chaguo-msingi ya kuunganisha
PR zilizokaguliwa kwenye `release/vX.Y.Z` ni **foleni ya kuunganisha ya Mergify** (`.mergify.yml`);
**msururu wa kuunganisha wa mikono** ulioelezwa hapa chini ni NJIA MBADALA — inayotumika wakati wa matukio,
kusitishwa kwa matoleo, au ikiwa mpango wa Mergify Open Source utabadilika.

## Njia chaguo-msingi: foleni ya Mergify

1. PR inakaguliwa/inapitishwa na kampeni na kuidhinishwa na lango la ⭐ la kabla ya kuunganisha
   la mmiliki (ripoti + uamuzi kwa kila kipengee — angalia `/merge-prs` Hatua ya 0.75).
2. Mmiliki (au kipindi kinachotekeleza uamuzi wa mmiliki) huweka lebo ya **`queue`**.
   Lebo HIYO ndiyo idhini ya kuunganisha; Mergify huitekeleza tu.
3. Mergify hukusanya hadi PR 10 zilizo kwenye foleni, huhakiki kundi dhidi ya malango ya haraka,
   na huunganisha (squash). Kundi jekundu **hugawanywa kiotomatiki** — PR yenye tatizo
   hutengwa baada ya takriban uthibitishaji upya wa log2(N) na kuondolewa kwenye foleni; nyingine huendelea.
4. Baada ya kuunganisha, mtiririko endelevu wa kazi wa release-green huhakiki kilele kipya wakati wa push
   na hufungua issue ya uhusishaji ikiwa mchanganyiko ulisababisha rejesho la hitilafu (kamwe haurejeshi kiotomatiki).

Vizuizi vya usalama (vinaakisi Kanuni Kali #21/#22 za `CLAUDE.md`):

- **Kusitishwa kwa toleo kuko wazi** → USIWEKE lebo kwenye PR zinazolenga branch iliyositishwa; kwanza zibadilishe zilenge
  `release/vX+1` inayotumika.
- **PR inayoendelea ya kipindi kingine** → usiiwekee lebo kamwe; ni kipindi kinachoimiliki pekee
  kinachoweka kazi yake kwenye foleni.
- Tofauti za majaribio pekee na PR zenye lebo ya `hotfix` tayari huendesha CI iliyopunguzwa (angalia
  `RELEASE_CHECKLIST.md` → Njia ya Haraka ya Hotfix); masharti ya foleni hukubali seti yoyote
  ya ukaguzi iliyoendeshwa (`#check-failure=0` + `#check-pending=0`).

## Njia mbadala: msururu wa kuunganisha wa mikono

Hutumika wakati foleni haipatikani. Hii inarasimisha utaratibu uliokamilisha PR 33 ndani ya
siku moja wakati wa mzunguko wa v3.8.47:

1. **Kusanya kundi** (~PR 10–30 zilizokaguliwa+kuidhinishwa). Kagua migongano ya `linked:`
   (`tap.testFiles` zinazofanana, sehemu zilezile za CHANGELOG) na uzishughulikie kwa mfuatano.
2. **Hakiki MARA MOJA**: katika worktree iliyotengwa kutoka kwenye kilele cha toleo, unganisha vichwa vyote vya kundi
   ndani ya mfumo, kisha endesha msururu wa majaribio unaolingana na toleo
   (`npm run check:release-green`, ongeza `--with-build` kabla ya toleo).
   `scripts/release/merge-train.sh <base> <PR#>…` huendesha hatua za 1–2 kiotomatiki (PR zinazokinzana
   huondolewa, msururu unaendelea). Hali kamili huendesha `npm run test:unit` — kiendeshaji
   kilichoboreshwa kwa mashine (`--test-concurrency=20`), **si** sehemu mbili za CI za core 4
   zinazoendeshwa kwa mfuatano, ambazo zilifanya awamu kuu itumie takriban 25% ya mashine yenye core 16 (ilirekebishwa
   2026-07-18). `--fast` (ukamilishaji wa misururu mikubwa ndani ya siku, ulioidhinishwa na mmiliki 2026-07-18)
   huhifadhi kila lango tuli + vitest lakini huendesha tu faili za node:test zilizobadilishwa na
   PR zilizoingizwa; msururu KAMILI bado lazima uendeshwe angalau mara moja kwa siku kwenye
   kilele kilichokusanywa (msururu mmoja bila `--fast`).
3. **Kijani** → unganisha PR kwa mfuatano (ukikagua tena `state,headRefOid` kabla ya kila moja —
   PR ambayo head yake imebadilika huingia tena kwenye ukaguzi). Thibitisha kuwa tofauti halisi ya kila muunganisho ni
   badiliko la PR yenyewe (hakuna urejeshaji wa kutatua migongano kiotomatiki: kagua `git diff --stat` ili kutambua
   ufutaji ulio nje ya wigo).
4. **Nyekundu** → gawanya kundi kwa nusu (hakiki kila nusu) badala ya kuhakiki upya
   moja baada ya nyingine; rudisha PR yenye tatizo kwenye foleni ya ukaguzi pamoja na ushahidi.
5. **Kamwe**: usiunganishe kwenye branch iliyositishwa wakati wa kusitishwa kwa toleo; usitumie `git stash` popote;
   usirudie CI kwa ujumla ukitumaini hali nyekundu itaondoka (kanuni: hali nyekundu ni taarifa).

## Viwango (kwa nini foleni ni salama kwa kutumia malango ya haraka pekee)

- **Kwa kila PR** (malango ya haraka ya quality.yml): majaribio yaliyoathiriwa na TIA + unit kamili yenye sehemu 4 +
  vitest + mkusanyiko wa lint + typecheck + uthabiti wa docs/changelog.
- **Kwa kila kundi/kilele** (release-green endelevu): malango MAGUMU ya `--quick` kwa kila push kwenye
  branch ya toleo; ukaguzi kamili wa `--with-build --full-ci` mara 3 kwa siku.
- **Kwa kila toleo** (ci.yml kwenye PR ya toleo): matrix kamili ikijumuisha E2E ×9,
  package-artifact + tarball boot-smoke, coverage/ratchets.

Hakuna kinachohakikiwa kwa kiwango cha chini kuliko awali — sehemu nzito sasa huendeshwa kwa kila kundi/kilele
badala ya kwa kila PR, jambo linaloondoa safari za kurudia za O(N).
