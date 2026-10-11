# Merge Queue & Manual Merge-Train Runbook (Malti)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/MERGE_TRAIN.md) · 🇪🇹 [am](../../../am/docs/ops/MERGE_TRAIN.md) · 🇸🇦 [ar](../../../ar/docs/ops/MERGE_TRAIN.md) · 🇦🇿 [az](../../../az/docs/ops/MERGE_TRAIN.md) · 🇧🇬 [bg](../../../bg/docs/ops/MERGE_TRAIN.md) · 🇧🇩 [bn](../../../bn/docs/ops/MERGE_TRAIN.md) · 🇧🇦 [bs](../../../bs/docs/ops/MERGE_TRAIN.md) · 🇨🇿 [cs](../../../cs/docs/ops/MERGE_TRAIN.md) · 🇩🇰 [da](../../../da/docs/ops/MERGE_TRAIN.md) · 🇩🇪 [de](../../../de/docs/ops/MERGE_TRAIN.md) · 🇬🇷 [el](../../../el/docs/ops/MERGE_TRAIN.md) · 🇪🇸 [es](../../../es/docs/ops/MERGE_TRAIN.md) · 🇪🇪 [et](../../../et/docs/ops/MERGE_TRAIN.md) · 🇮🇷 [fa](../../../fa/docs/ops/MERGE_TRAIN.md) · 🇫🇮 [fi](../../../fi/docs/ops/MERGE_TRAIN.md) · 🇫🇷 [fr](../../../fr/docs/ops/MERGE_TRAIN.md) · 🇮🇪 [ga](../../../ga/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [gu](../../../gu/docs/ops/MERGE_TRAIN.md) · 🇳🇬 [ha](../../../ha/docs/ops/MERGE_TRAIN.md) · 🇮🇱 [he](../../../he/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [hi](../../../hi/docs/ops/MERGE_TRAIN.md) · 🇭🇷 [hr](../../../hr/docs/ops/MERGE_TRAIN.md) · 🇭🇺 [hu](../../../hu/docs/ops/MERGE_TRAIN.md) · 🇦🇲 [hy](../../../hy/docs/ops/MERGE_TRAIN.md) · 🇮🇩 [id](../../../id/docs/ops/MERGE_TRAIN.md) · 🇳🇬 [ig](../../../ig/docs/ops/MERGE_TRAIN.md) · 🇮🇹 [it](../../../it/docs/ops/MERGE_TRAIN.md) · 🇯🇵 [ja](../../../ja/docs/ops/MERGE_TRAIN.md) · 🇬🇪 [ka](../../../ka/docs/ops/MERGE_TRAIN.md) · 🇰🇭 [km](../../../km/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [kn](../../../kn/docs/ops/MERGE_TRAIN.md) · 🇰🇷 [ko](../../../ko/docs/ops/MERGE_TRAIN.md) · 🇱🇹 [lt](../../../lt/docs/ops/MERGE_TRAIN.md) · 🇱🇻 [lv](../../../lv/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [ml](../../../ml/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [mr](../../../mr/docs/ops/MERGE_TRAIN.md) · 🇲🇾 [ms](../../../ms/docs/ops/MERGE_TRAIN.md) · 🇲🇲 [my](../../../my/docs/ops/MERGE_TRAIN.md) · 🇳🇵 [ne](../../../ne/docs/ops/MERGE_TRAIN.md) · 🇳🇱 [nl](../../../nl/docs/ops/MERGE_TRAIN.md) · 🇳🇴 [no](../../../no/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [or](../../../or/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [pa](../../../pa/docs/ops/MERGE_TRAIN.md) · 🇵🇭 [phi](../../../phi/docs/ops/MERGE_TRAIN.md) · 🇵🇱 [pl](../../../pl/docs/ops/MERGE_TRAIN.md) · 🇵🇹 [pt](../../../pt/docs/ops/MERGE_TRAIN.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/MERGE_TRAIN.md) · 🇷🇴 [ro](../../../ro/docs/ops/MERGE_TRAIN.md) · 🇷🇺 [ru](../../../ru/docs/ops/MERGE_TRAIN.md) · 🇱🇰 [si](../../../si/docs/ops/MERGE_TRAIN.md) · 🇸🇰 [sk](../../../sk/docs/ops/MERGE_TRAIN.md) · 🇸🇮 [sl](../../../sl/docs/ops/MERGE_TRAIN.md) · 🇷🇸 [sr](../../../sr/docs/ops/MERGE_TRAIN.md) · 🇸🇪 [sv](../../../sv/docs/ops/MERGE_TRAIN.md) · 🇰🇪 [sw](../../../sw/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [ta](../../../ta/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [te](../../../te/docs/ops/MERGE_TRAIN.md) · 🇹🇭 [th](../../../th/docs/ops/MERGE_TRAIN.md) · 🇹🇷 [tr](../../../tr/docs/ops/MERGE_TRAIN.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/MERGE_TRAIN.md) · 🇵🇰 [ur](../../../ur/docs/ops/MERGE_TRAIN.md) · 🇺🇿 [uz](../../../uz/docs/ops/MERGE_TRAIN.md) · 🇻🇳 [vi](../../../vi/docs/ops/MERGE_TRAIN.md) · 🇳🇬 [yo](../../../yo/docs/ops/MERGE_TRAIN.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/MERGE_TRAIN.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/MERGE_TRAIN.md)

---

Minn v3.8.49 (WS3.2/WS3.4 tal-pjan tal-kwalità/veloċità), il-perkors predefinit tal-merge għal
PRs rieżaminati lejn `release/vX.Y.Z` huwa l-**kju tal-merge ta’ Mergify** (`.mergify.yml`);
il-**merge-train manwali** dokumentat hawn taħt huwa l-għażla ta’ RIŻERVA — jintuża waqt inċidenti,
waqfiet tar-rilaxx, jew jekk il-pjan Open Source ta’ Mergify qatt jinbidel.

## Mogħdija awtomatika: il-kju ta’ Mergify

1. Il-PR jiġi rieżaminat/jingħata l-aħdar mill-kampanji u approvat mill-gate ⭐ ta’ qabel il-merge tas-sid (ir-rapport + id-deċiżjoni għal kull element — ara `/merge-prs` Pass 0.75).
2. Is-sid (jew is-sessjoni li taġixxi fuq id-deċiżjoni tas-sid) japplika t-tikketta **`queue`**. It-tikketta HIJA l-approvazzjoni tal-merge; Mergify sempliċement jeżegwixxiha.
3. Mergify jivvalida l-PRs fil-kju **b’mod sekwenzjali** (wieħed kull darba) kontra l-fast-gates u jagħmel il-merge (squash). Il-batching + il-bisection awtomatika huma parti minn livell imħallas ta’ Mergify ("Cannot use Merge Queue batch" fuq il-pjan bla ħlas, #7220), għalhekk `.mergify.yml` ma jistabbilixxi ebda `batch_size`; il-batching jibqa’ l-kompitu tal-merge-train manwali hawn taħt. PR li l-kontrolli tiegħu jkunu għadhom pendenti wara `checks_timeout` (240 min = 2× il-p95 imkejjel ta’ `quality.yml`) jitneħħa mill-kju minflok ma jwaqqaf il-kju.
4. Wara l-merge, il-workflow kontinwu ta’ validazzjoni tal-istat aħdar tar-rilaxx jivvalida t-tip il-ġdid waqt il-push u jiftaħ issue ta’ attribuzzjoni jekk il-kombinazzjoni tkun marret lura (qatt ma jagħmel auto-revert).

Miżuri ta’ protezzjoni (jirriflettu `CLAUDE.md` Regoli Stretti #21/#22):

- **Release freeze miftuħ** → TAPPLIKAX tikketti fuq PRs immirati lejn il-fergħa ffriżata; l-ewwel immirahom mill-ġdid lejn ir-`release/vX+1` attiv.
- **PR in-flight ta’ sessjoni oħra** → qatt tapplikalu tikketta; hija biss is-sessjoni sid li tqiegħed ix-xogħol tagħha stess fil-kju.
- Diffs tat-testijiet biss u PRs bit-tikketta `hotfix` diġà jħaddmu CI mnaqqas (ara `RELEASE_CHECKLIST.md` → Hotfix Fast-Lane); il-kundizzjonijiet tal-kju jaċċettaw kwalunkwe sett ta’ kontrolli li fil-fatt tħaddem (`#check-failure=0` + `#check-pending=0`).

## Għażla ta’ riżerva: il-merge-train manwali

Jintuża meta l-kju ma jkunx disponibbli. Dan jikkodifika l-prattika li pproċessat 33 PR
f’ġurnata waħda matul iċ-ċiklu v3.8.47:

1. **Arma l-lott** (~10–30 PR rieżaminati+approvati). Iċċekkja għal kolliżjonijiet `linked:`
   (l-istess `tap.testFiles`, l-istess hunks taċ-CHANGELOG) u ssekwenzjahom.
2. **Ivvalida DARBA**: f’worktree iżolat mit-tip tar-rilaxx, agħmel merge lokalment tal-heads
   kollha tal-lott, imbagħad ħaddem is-suite ekwivalenti għal dik tar-rilaxx
   (`npm run check:release-green`, żid `--with-build` qabel rilaxx).
   `scripts/release/merge-train.sh <base> <PR#>…` jawtomatizza l-passi 1–2 (PRs f’kunflitt
   jitneħħew, u t-train ikompli). Il-modalità sħiħa tħaddem `npm run test:unit` — ir-runner
   aġġustat għall-magna (`--test-concurrency=20`), **mhux** iż-żewġ shards sekwenzjali ta’ CI
   b’4 cores, li ġiegħlu lill-fażi dominanti tuża ~25% ta’ magna b’16-il core (irranġat
   2026-07-18). `--fast` (għall-ipproċessar ta’ mega-trains matul il-ġurnata, approvat mis-sid
   2026-07-18) iżomm kull gate statiku + vitest iżda jħaddem biss il-fajls node:test mibdula
   mill-PRs abbord; is-suite SĦIĦA xorta trid titħaddem mill-inqas darba kuljum fuq it-tip
   akkumulat (train wieħed mingħajr `--fast`).
3. **Aħdar** → agħmel merge tal-PRs f’sekwenza (erġa’ ċċekkja `state,headRefOid` qabel kull wieħed —
   PR li ċċaqlaqlu l-head jerġa’ jidħol għar-rieżami). Ipprova li n-net diff ta’ kull merge huwa
   l-bidla tal-PR innifsu (l-ebda reverts b’auto-resolve: awditja `git diff --stat` għal
   tħassir barra mill-ambitu).
4. **Aħmar** → aqsam il-lott binarjament f’nofsijiet (ivvalida kull nofs) minflok terġa’ tivvalida
   wieħed wieħed; erġa’ poġġi l-PR problematiku fil-kju tar-rieżami flimkien mal-evidenza.
5. **Qatt**: tagħmel merge waqt waqfa fil-branch iffriżat; tuża `git stash` kullimkien;
   terġa’ tħaddem is-CI kollu bit-tama li l-aħmar jgħib (regola: aħmar huwa informazzjoni).

## Klassifikazzjoni f’livelli (għaliex il-kju huwa sikur b’fast-gates biss)

- **Għal kull PR** (fast-gates ta’ quality.yml): testijiet affettwati mit-TIA + unit sħiħ b’4 shards +
  vitest + ġabra ta’ lint + typecheck + integrità tad-dokumentazzjoni/changelog.
- **Għal kull lott/tip** (release-green kontinwu): gates STRETTI `--quick` ma’ kull push lejn
  il-branch tar-rilaxx; sweeps sħaħ `--with-build --full-ci` 3×/jum.
- **Għal kull rilaxx** (ci.yml fuq il-PR tar-rilaxx): il-matriċi sħiħa inklużi E2E ×9,
  package-artifact + tarball boot-smoke, coverage/ratchets.

Xejn mhu qed jiġi vvalidat inqas minn qabel — is-superfiċje tqila sempliċement titħaddem għal kull lott/tip
minflok għal kull PR, u dan huwa dak li jelimina r-round-trips O(N).

## Prerekwiżiti ta’ checkout ġdid għal `merge-train.sh`

L-iskript iħaddem **preflight** fail-fast fuq ir-root checkout (qabel kwalunkwe xogħol
fuq il-worktree) sabiex installazzjoni difettuża qatt ma tkun tista’ tidher bħala train aħmar:

1. `npm ci`, imbagħad ħaddem il-postinstall ta’ `bun` li npm jimblokka:
   `(cd node_modules/bun && node install.js)` — inkella `check:provider-consistency`
   u `check:known-symbols` (it-tnejn `bun scripts/…`) ifallu fuq it-train U fuq il-base
   mingħajr linja ta’ ksur.
2. Ebda `node_modules/node_modules` żejjed (siġra duplikata ta’ dipendenzi; React jitgħabba darbtejn
   u s-suites UI ta’ vitest ifallu immedjatament).
3. `node_modules/.bin/tsc` preżenti u eżegwibbli (installazzjoni parzjali ma jkollhiex).

It-train iħaddem il-`npm run check:cycles:ratchet` obbligatorju; `npm run check:cycles`
waħdu huwa konsultattiv (jelenka l-SCCs u joħroġ b’status mhux żero anki fuq base f’saħħtu).
