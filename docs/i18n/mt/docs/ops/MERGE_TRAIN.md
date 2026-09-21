# Merge Queue & Manual Merge-Train Runbook (Malti)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/MERGE_TRAIN.md) · 🇪🇹 [am](../../../am/docs/ops/MERGE_TRAIN.md) · 🇸🇦 [ar](../../../ar/docs/ops/MERGE_TRAIN.md) · 🇦🇿 [az](../../../az/docs/ops/MERGE_TRAIN.md) · 🇧🇬 [bg](../../../bg/docs/ops/MERGE_TRAIN.md) · 🇧🇩 [bn](../../../bn/docs/ops/MERGE_TRAIN.md) · 🇨🇿 [cs](../../../cs/docs/ops/MERGE_TRAIN.md) · 🇩🇰 [da](../../../da/docs/ops/MERGE_TRAIN.md) · 🇩🇪 [de](../../../de/docs/ops/MERGE_TRAIN.md) · 🇬🇷 [el](../../../el/docs/ops/MERGE_TRAIN.md) · 🇪🇸 [es](../../../es/docs/ops/MERGE_TRAIN.md) · 🇪🇪 [et](../../../et/docs/ops/MERGE_TRAIN.md) · 🇮🇷 [fa](../../../fa/docs/ops/MERGE_TRAIN.md) · 🇫🇮 [fi](../../../fi/docs/ops/MERGE_TRAIN.md) · 🇫🇷 [fr](../../../fr/docs/ops/MERGE_TRAIN.md) · 🇮🇪 [ga](../../../ga/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [gu](../../../gu/docs/ops/MERGE_TRAIN.md) · 🇳🇬 [ha](../../../ha/docs/ops/MERGE_TRAIN.md) · 🇮🇱 [he](../../../he/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [hi](../../../hi/docs/ops/MERGE_TRAIN.md) · 🇭🇷 [hr](../../../hr/docs/ops/MERGE_TRAIN.md) · 🇭🇺 [hu](../../../hu/docs/ops/MERGE_TRAIN.md) · 🇦🇲 [hy](../../../hy/docs/ops/MERGE_TRAIN.md) · 🇮🇩 [id](../../../id/docs/ops/MERGE_TRAIN.md) · 🇳🇬 [ig](../../../ig/docs/ops/MERGE_TRAIN.md) · 🇮🇹 [it](../../../it/docs/ops/MERGE_TRAIN.md) · 🇯🇵 [ja](../../../ja/docs/ops/MERGE_TRAIN.md) · 🇬🇪 [ka](../../../ka/docs/ops/MERGE_TRAIN.md) · 🇰🇭 [km](../../../km/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [kn](../../../kn/docs/ops/MERGE_TRAIN.md) · 🇰🇷 [ko](../../../ko/docs/ops/MERGE_TRAIN.md) · 🇱🇹 [lt](../../../lt/docs/ops/MERGE_TRAIN.md) · 🇱🇻 [lv](../../../lv/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [ml](../../../ml/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [mr](../../../mr/docs/ops/MERGE_TRAIN.md) · 🇲🇾 [ms](../../../ms/docs/ops/MERGE_TRAIN.md) · 🇲🇲 [my](../../../my/docs/ops/MERGE_TRAIN.md) · 🇳🇵 [ne](../../../ne/docs/ops/MERGE_TRAIN.md) · 🇳🇱 [nl](../../../nl/docs/ops/MERGE_TRAIN.md) · 🇳🇴 [no](../../../no/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [or](../../../or/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [pa](../../../pa/docs/ops/MERGE_TRAIN.md) · 🇵🇭 [phi](../../../phi/docs/ops/MERGE_TRAIN.md) · 🇵🇱 [pl](../../../pl/docs/ops/MERGE_TRAIN.md) · 🇵🇹 [pt](../../../pt/docs/ops/MERGE_TRAIN.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/MERGE_TRAIN.md) · 🇷🇴 [ro](../../../ro/docs/ops/MERGE_TRAIN.md) · 🇷🇺 [ru](../../../ru/docs/ops/MERGE_TRAIN.md) · 🇱🇰 [si](../../../si/docs/ops/MERGE_TRAIN.md) · 🇸🇰 [sk](../../../sk/docs/ops/MERGE_TRAIN.md) · 🇸🇮 [sl](../../../sl/docs/ops/MERGE_TRAIN.md) · 🇷🇸 [sr](../../../sr/docs/ops/MERGE_TRAIN.md) · 🇸🇪 [sv](../../../sv/docs/ops/MERGE_TRAIN.md) · 🇰🇪 [sw](../../../sw/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [ta](../../../ta/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [te](../../../te/docs/ops/MERGE_TRAIN.md) · 🇹🇭 [th](../../../th/docs/ops/MERGE_TRAIN.md) · 🇹🇷 [tr](../../../tr/docs/ops/MERGE_TRAIN.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/MERGE_TRAIN.md) · 🇵🇰 [ur](../../../ur/docs/ops/MERGE_TRAIN.md) · 🇺🇿 [uz](../../../uz/docs/ops/MERGE_TRAIN.md) · 🇻🇳 [vi](../../../vi/docs/ops/MERGE_TRAIN.md) · 🇳🇬 [yo](../../../yo/docs/ops/MERGE_TRAIN.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/MERGE_TRAIN.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/MERGE_TRAIN.md)

---

Minn v3.8.49 (WS3.2/WS3.4 tal-pjan tal-kwalità/veloċità), il-perkors predefinit tal-merge għal
PRs rieżaminati lejn `release/vX.Y.Z` huwa l-**kju tal-merge ta’ Mergify** (`.mergify.yml`);
il-**merge-train manwali** dokumentat hawn taħt huwa l-MEKKANIŻMU TA’ RIŻERVA — jintuża waqt inċidenti,
iffriżar tar-rilaxx, jew jekk il-pjan Open Source ta’ Mergify qatt jinbidel.

## Perkors predefinit: il-kju ta’ Mergify

1. Il-PR jiġi rieżaminat/jgħaddi b’suċċess mill-kampanji u approvat mill-gate ⭐ ta’ qabel il-merge
   tas-sid (ir-rapport + id-deċiżjoni għal kull element — ara `/merge-prs` Pass 0.75).
2. Is-sid (jew is-sessjoni li taġixxi skont id-deċiżjoni tas-sid) japplika t-tikketta **`queue`**.
   It-tikketta HIJA l-approvazzjoni tal-merge; Mergify sempliċement jeżegwixxiha.
3. Mergify jiġbor sa 10 PRs fil-kju f’lott wieħed, jivvalida l-lott mal-fast-gates,
   u jagħmel merge (squash). Lott aħmar jiġi **maqsum binarjament awtomatikament** — il-PR problematiku
   jiġi iżolat f’~log2(N) rivalidazzjonijiet u jitneħħa mill-kju; il-bqija jkomplu.
4. Wara l-merge, il-workflow kontinwu release-green jivvalida t-tip il-ġdid waqt push
   u jiftaħ issue ta’ attribuzzjoni jekk il-kombinazzjoni tkun marret lura (qatt ma jagħmel auto-revert).

Salvagwardji (jirriflettu `CLAUDE.md` Regoli Stretti #21/#22):

- **Iffriżar tar-rilaxx miftuħ** → TAPPLIKAX tikketti lil PRs immirati lejn il-fergħa ffriżata; l-ewwel
  erġa’ mmirahom lejn ir-`release/vX+1` attiv.
- **PR għaddej ta’ sessjoni oħra** → qatt tapplikalu tikketta; is-sessjoni sid biss tqiegħed
  ix-xogħol tagħha stess fil-kju.
- Diffs tat-testijiet biss u PRs bit-tikketta `hotfix` diġà jħaddmu CI mnaqqas (ara
  `RELEASE_CHECKLIST.md` → Korsija Rapida tal-Hotfix); il-kundizzjonijiet tal-kju jaċċettaw kwalunkwe
  sett ta’ checks li effettivament tħaddem (`#check-failure=0` + `#check-pending=0`).

## Mekkaniżmu ta’ riżerva: il-merge-train manwali

Jintuża meta l-kju ma jkunx disponibbli. Dan jikkodifika l-prattika li pproċessat 33 PR
f’ġurnata waħda matul iċ-ċiklu v3.8.47:

1. **Arma l-lott** (~10–30 PRs rieżaminati+approvati). Iċċekkja għal kolliżjonijiet `linked:`
   (l-istess `tap.testFiles`, l-istess hunks ta’ CHANGELOG) u ssekwenzjahom.
2. **Ivvalida DARBA**: f’worktree iżolat mit-tip tar-rilaxx, agħmel merge lokalment tal-heads
   kollha tal-lott, imbagħad ħaddem is-suite ekwivalenti għal dik tar-rilaxx
   (`npm run check:release-green`, żid `--with-build` qabel rilaxx).
   `scripts/release/merge-train.sh <base> <PR#>…` jawtomatizza l-passi 1–2 (PRs
   f’kunflitt jitneħħew, u t-train ikompli). Il-modalità sħiħa tħaddem `npm run test:unit` — ir-runner
   ottimizzat għall-magna (`--test-concurrency=20`), **mhux** iż-żewġ shards sekwenzjali ta’ CI
   b’4 cores, li wasslu l-fażi dominanti biex tuża ~25% ta’ magna b’16-il core (irranġat
   2026-07-18). `--fast` (għall-ipproċessar ta’ mega-trains fl-istess ġurnata, approvat mis-sid 2026-07-18)
   iżomm kull gate statiku + vitest iżda jħaddem biss il-fajls node:test mibdula mill-
   PRs inklużi; is-suite SĦIĦA xorta trid titħaddem mill-inqas darba kuljum fuq it-
   tip akkumulat (train wieħed mingħajr `--fast`).
3. **Aħdar** → agħmel merge tal-PRs f’sekwenza (filwaqt li terġa’ tiċċekkja `state,headRefOid` qabel kull wieħed —
   PR li l-head tiegħu nbidel jerġa’ jidħol fir-rieżami). Ipprova li d-diff nett ta’ kull merge huwa l-
   bidla tal-PR innifsu (ebda reverts permezz ta’ auto-resolve: awditja `git diff --stat` għal
   tħassir barra mill-ambitu).
4. **Aħmar** → aqsam il-lott binarjament f’nofsijiet (ivvalida kull nofs) minflok terġa’ tivvalida
   wieħed wieħed; irritorna l-PR problematiku fil-kju tar-rieżami flimkien mal-evidenza.
5. **Qatt**: tagħmel merge waqt iffriżar lejn il-fergħa ffriżata; tuża `git stash` imkien;
   terġa’ tħaddem is-CI kollu bit-tama li aħmar jgħib (regola: aħmar huwa informazzjoni).

## Tqassim f’livelli (għaliex il-kju huwa sikur b’fast-gates biss)

- **Għal kull PR** (fast-gates ta’ quality.yml): testijiet affettwati minn TIA + unit sħiħ b’4 shards +
  vitest + grupp ta’ lint + typecheck + integrità tad-dokumentazzjoni/changelog.
- **Għal kull lott/tip** (release-green kontinwu): gates STRETTI `--quick` ma’ kull push lejn
  il-fergħa tar-rilaxx; sweeps sħaħ `--with-build --full-ci` 3×/jum.
- **Għal kull rilaxx** (ci.yml fuq il-PR tar-rilaxx): il-matriċi kompluta inkl. E2E ×9,
  package-artifact + boot-smoke tat-tarball, coverage/ratchets.

Xejn ma jiġi vvalidat inqas minn qabel — is-superfiċje tqila sempliċement titħaddem għal kull lott/tip
minflok għal kull PR, u dan huwa li jneħħi r-round-trips O(N).
