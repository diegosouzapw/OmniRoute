# Merge Queue & Manual Merge-Train Runbook (ಕನ್ನಡ)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/MERGE_TRAIN.md) · 🇪🇹 [am](../../../am/docs/ops/MERGE_TRAIN.md) · 🇸🇦 [ar](../../../ar/docs/ops/MERGE_TRAIN.md) · 🇦🇿 [az](../../../az/docs/ops/MERGE_TRAIN.md) · 🇧🇬 [bg](../../../bg/docs/ops/MERGE_TRAIN.md) · 🇧🇩 [bn](../../../bn/docs/ops/MERGE_TRAIN.md) · 🇧🇦 [bs](../../../bs/docs/ops/MERGE_TRAIN.md) · 🇨🇿 [cs](../../../cs/docs/ops/MERGE_TRAIN.md) · 🇩🇰 [da](../../../da/docs/ops/MERGE_TRAIN.md) · 🇩🇪 [de](../../../de/docs/ops/MERGE_TRAIN.md) · 🇬🇷 [el](../../../el/docs/ops/MERGE_TRAIN.md) · 🇪🇸 [es](../../../es/docs/ops/MERGE_TRAIN.md) · 🇪🇪 [et](../../../et/docs/ops/MERGE_TRAIN.md) · 🇮🇷 [fa](../../../fa/docs/ops/MERGE_TRAIN.md) · 🇫🇮 [fi](../../../fi/docs/ops/MERGE_TRAIN.md) · 🇫🇷 [fr](../../../fr/docs/ops/MERGE_TRAIN.md) · 🇮🇪 [ga](../../../ga/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [gu](../../../gu/docs/ops/MERGE_TRAIN.md) · 🇳🇬 [ha](../../../ha/docs/ops/MERGE_TRAIN.md) · 🇮🇱 [he](../../../he/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [hi](../../../hi/docs/ops/MERGE_TRAIN.md) · 🇭🇷 [hr](../../../hr/docs/ops/MERGE_TRAIN.md) · 🇭🇺 [hu](../../../hu/docs/ops/MERGE_TRAIN.md) · 🇦🇲 [hy](../../../hy/docs/ops/MERGE_TRAIN.md) · 🇮🇩 [id](../../../id/docs/ops/MERGE_TRAIN.md) · 🇳🇬 [ig](../../../ig/docs/ops/MERGE_TRAIN.md) · 🇮🇹 [it](../../../it/docs/ops/MERGE_TRAIN.md) · 🇯🇵 [ja](../../../ja/docs/ops/MERGE_TRAIN.md) · 🇬🇪 [ka](../../../ka/docs/ops/MERGE_TRAIN.md) · 🇰🇭 [km](../../../km/docs/ops/MERGE_TRAIN.md) · 🇰🇷 [ko](../../../ko/docs/ops/MERGE_TRAIN.md) · 🇱🇹 [lt](../../../lt/docs/ops/MERGE_TRAIN.md) · 🇱🇻 [lv](../../../lv/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [ml](../../../ml/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [mr](../../../mr/docs/ops/MERGE_TRAIN.md) · 🇲🇾 [ms](../../../ms/docs/ops/MERGE_TRAIN.md) · 🇲🇹 [mt](../../../mt/docs/ops/MERGE_TRAIN.md) · 🇲🇲 [my](../../../my/docs/ops/MERGE_TRAIN.md) · 🇳🇵 [ne](../../../ne/docs/ops/MERGE_TRAIN.md) · 🇳🇱 [nl](../../../nl/docs/ops/MERGE_TRAIN.md) · 🇳🇴 [no](../../../no/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [or](../../../or/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [pa](../../../pa/docs/ops/MERGE_TRAIN.md) · 🇵🇭 [phi](../../../phi/docs/ops/MERGE_TRAIN.md) · 🇵🇱 [pl](../../../pl/docs/ops/MERGE_TRAIN.md) · 🇵🇹 [pt](../../../pt/docs/ops/MERGE_TRAIN.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/MERGE_TRAIN.md) · 🇷🇴 [ro](../../../ro/docs/ops/MERGE_TRAIN.md) · 🇷🇺 [ru](../../../ru/docs/ops/MERGE_TRAIN.md) · 🇱🇰 [si](../../../si/docs/ops/MERGE_TRAIN.md) · 🇸🇰 [sk](../../../sk/docs/ops/MERGE_TRAIN.md) · 🇸🇮 [sl](../../../sl/docs/ops/MERGE_TRAIN.md) · 🇷🇸 [sr](../../../sr/docs/ops/MERGE_TRAIN.md) · 🇸🇪 [sv](../../../sv/docs/ops/MERGE_TRAIN.md) · 🇰🇪 [sw](../../../sw/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [ta](../../../ta/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [te](../../../te/docs/ops/MERGE_TRAIN.md) · 🇹🇭 [th](../../../th/docs/ops/MERGE_TRAIN.md) · 🇹🇷 [tr](../../../tr/docs/ops/MERGE_TRAIN.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/MERGE_TRAIN.md) · 🇵🇰 [ur](../../../ur/docs/ops/MERGE_TRAIN.md) · 🇺🇿 [uz](../../../uz/docs/ops/MERGE_TRAIN.md) · 🇻🇳 [vi](../../../vi/docs/ops/MERGE_TRAIN.md) · 🇳🇬 [yo](../../../yo/docs/ops/MERGE_TRAIN.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/MERGE_TRAIN.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/MERGE_TRAIN.md)

---

v3.8.49 ರಿಂದ (ಗುಣಮಟ್ಟ/ವೇಗ ಯೋಜನೆಯ WS3.2/WS3.4), ಪರಿಶೀಲಿಸಲಾದ PRಗಳನ್ನು
`release/vX.Y.Z` ಗೆ ವಿಲೀನಗೊಳಿಸುವ ಡೀಫಾಲ್ಟ್ ಮಾರ್ಗವು **Mergify ವಿಲೀನ ಸರತಿ** (`.mergify.yml`);
ಕೆಳಗೆ ದಾಖಲಿಸಿರುವ **ಹಸ್ತಚಾಲಿತ merge-train** ಹಿಮ್ಮೆಟ್ಟುವ ಆಯ್ಕೆಯಾಗಿದೆ — ಘಟನೆಗಳ ಸಂದರ್ಭದಲ್ಲಿ,
ಬಿಡುಗಡೆ ಸ್ಥಗಿತಗಳ ವೇಳೆ, ಅಥವಾ Mergify Open Source ಯೋಜನೆ ಎಂದಾದರೂ ಬದಲಾದರೆ ಇದನ್ನು ಬಳಸಲಾಗುತ್ತದೆ.

## ಡೀಫಾಲ್ಟ್ ಮಾರ್ಗ: Mergify ಸರತಿ

1. PR ಅನ್ನು ಅಭಿಯಾನಗಳು ಪರಿಶೀಲಿಸಿ/ಹಸಿರು ಸ್ಥಿತಿಗೆ ತರುತ್ತವೆ ಮತ್ತು ಮಾಲೀಕರ ವಿಲೀನಪೂರ್ವ ⭐
   ಗೇಟ್ನಿಂದ ಅನುಮೋದಿಸಲಾಗುತ್ತದೆ (ವರದಿ + ಪ್ರತಿ ಅಂಶದ ನಿರ್ಧಾರ — `/merge-prs` ಹಂತ 0.75 ನೋಡಿ).
2. ಮಾಲೀಕರು (ಅಥವಾ ಮಾಲೀಕರ ನಿರ್ಧಾರದ ಮೇರೆಗೆ ಕಾರ್ಯನಿರ್ವಹಿಸುವ ಸೆಷನ್) **`queue`**
   ಲೇಬಲ್ ಅನ್ನು ಅನ್ವಯಿಸುತ್ತಾರೆ. ಈ ಲೇಬಲ್ ವಿಲೀನ ಅನುಮೋದನೆಯೇ ಆಗಿದೆ; Mergify ಅದನ್ನು ಕೇವಲ ಕಾರ್ಯಗತಗೊಳಿಸುತ್ತದೆ.
3. Mergify ಸರತಿಯಲ್ಲಿರುವ ಗರಿಷ್ಠ 10 PRಗಳನ್ನು ಬ್ಯಾಚ್ ಮಾಡುತ್ತದೆ, ವೇಗದ ಗೇಟ್ಗಳ ವಿರುದ್ಧ ಬ್ಯಾಚ್ ಅನ್ನು ಮೌಲ್ಯೀಕರಿಸುತ್ತದೆ,
   ಮತ್ತು ವಿಲೀನಗೊಳಿಸುತ್ತದೆ (squash). ಕೆಂಪು ಬ್ಯಾಚ್ ಅನ್ನು **ಸ್ವಯಂಚಾಲಿತವಾಗಿ ದ್ವಿಭಜಿಸಲಾಗುತ್ತದೆ** — ಸಮಸ್ಯೆ ಉಂಟುಮಾಡಿದ PR ಅನ್ನು
   ~log2(N) ಮರುಮೌಲ್ಯೀಕರಣಗಳಲ್ಲಿ ಪ್ರತ್ಯೇಕಿಸಿ ಸರತಿಯಿಂದ ತೆಗೆಯಲಾಗುತ್ತದೆ; ಉಳಿದವು ಮುಂದುವರಿಯುತ್ತವೆ.
4. ವಿಲೀನದ ನಂತರ, ನಿರಂತರ release-green ಕಾರ್ಯಪ್ರವಾಹವು push ಮಾಡಿದಾಗ ಹೊಸ ತುದಿಯನ್ನು ಮೌಲ್ಯೀಕರಿಸುತ್ತದೆ
   ಮತ್ತು ಸಂಯೋಜನೆಯಿಂದ ಹಿನ್ನಡೆಯಾಗಿದ್ದರೆ attribution issue ಅನ್ನು ತೆರೆಯುತ್ತದೆ (ಎಂದಿಗೂ ಸ್ವಯಂ-revert ಮಾಡುವುದಿಲ್ಲ).

ರಕ್ಷಣಾತ್ಮಕ ನಿಯಮಗಳು (`CLAUDE.md` ಕಠಿಣ ನಿಯಮಗಳು #21/#22 ಅನ್ನು ಪ್ರತಿಬಿಂಬಿಸುತ್ತವೆ):

- **ಬಿಡುಗಡೆ ಸ್ಥಗಿತ ಜಾರಿಯಲ್ಲಿದೆ** → ಸ್ಥಗಿತಗೊಂಡ ಶಾಖೆಯನ್ನು ಗುರಿಯಾಗಿಸಿಕೊಂಡ PRಗಳಿಗೆ ಲೇಬಲ್ ಹಾಕಬೇಡಿ; ಮೊದಲು ಅವುಗಳನ್ನು
  ಸಕ್ರಿಯ `release/vX+1` ಗೆ ಮರುಗುರಿಪಡಿಸಿ.
- **ಮತ್ತೊಂದು ಸೆಷನ್ನ ಪ್ರಗತಿಯಲ್ಲಿರುವ PR** → ಅದಕ್ಕೆ ಎಂದಿಗೂ ಲೇಬಲ್ ಹಾಕಬೇಡಿ; ಮಾಲೀಕತ್ವದ ಸೆಷನ್ ಮಾತ್ರ
  ತನ್ನದೇ ಕೆಲಸವನ್ನು ಸರತಿಗೆ ಸೇರಿಸುತ್ತದೆ.
- ಪರೀಕ್ಷೆಗಳಿಗೆ ಮಾತ್ರ ಸಂಬಂಧಿಸಿದ diffಗಳು ಮತ್ತು `hotfix` ಲೇಬಲ್ ಹೊಂದಿರುವ PRಗಳು ಈಗಾಗಲೇ ಕಡಿತಗೊಳಿಸಿದ CI ಅನ್ನು ಚಲಾಯಿಸುತ್ತವೆ (`RELEASE_CHECKLIST.md`
  → Hotfix Fast-Lane ನೋಡಿ); ಸರತಿಯ ಷರತ್ತುಗಳು ನಿಜವಾಗಿ ಚಲಾಯಿಸಲಾದ ಯಾವುದೇ check ಸಮೂಹವನ್ನು
  ಸ್ವೀಕರಿಸುತ್ತವೆ (`#check-failure=0` + `#check-pending=0`).

## ಹಿಮ್ಮೆಟ್ಟುವ ಆಯ್ಕೆ: ಹಸ್ತಚಾಲಿತ merge-train

ಸರತಿ ಲಭ್ಯವಿಲ್ಲದಾಗ ಬಳಸಲಾಗುತ್ತದೆ. ಇದು v3.8.47 ಚಕ್ರದ ಸಮಯದಲ್ಲಿ ಒಂದೇ ದಿನದಲ್ಲಿ 33 PRಗಳನ್ನು
ಪೂರ್ಣಗೊಳಿಸಿದ ಅಭ್ಯಾಸವನ್ನು ವಿಧಿಬದ್ಧಗೊಳಿಸುತ್ತದೆ:

1. **ಬ್ಯಾಚ್ ಅನ್ನು ಜೋಡಿಸಿ** (~10–30 ಪರಿಶೀಲಿಸಲಾದ+ಅನುಮೋದಿಸಲಾದ PRಗಳು). `linked:` ಘರ್ಷಣೆಗಳನ್ನು
   (ಒಂದೇ `tap.testFiles`, ಒಂದೇ CHANGELOG ಭಾಗಗಳು) ಪರಿಶೀಲಿಸಿ ಮತ್ತು ಅವುಗಳನ್ನು ಅನುಕ್ರಮಗೊಳಿಸಿ.
2. **ಒಮ್ಮೆ ಮಾತ್ರ ಮೌಲ್ಯೀಕರಿಸಿ**: ಬಿಡುಗಡೆ ತುದಿಯಿಂದ ಪ್ರತ್ಯೇಕಿಸಿದ worktree ನಲ್ಲಿ, ಎಲ್ಲಾ ಬ್ಯಾಚ್
   headಗಳನ್ನು ಸ್ಥಳೀಯವಾಗಿ ವಿಲೀನಗೊಳಿಸಿ, ನಂತರ ಬಿಡುಗಡೆಗೆ ಸಮಾನವಾದ suite ಅನ್ನು ಚಲಾಯಿಸಿ
   (`npm run check:release-green`, ಬಿಡುಗಡೆಗೂ ಮೊದಲು `--with-build` ಸೇರಿಸಿ).
   `scripts/release/merge-train.sh <base> <PR#>…` ಹಂತಗಳು 1–2 ಅನ್ನು ಸ್ವಯಂಚಾಲಿತಗೊಳಿಸುತ್ತದೆ (ಘರ್ಷಿಸುವ
   PRಗಳನ್ನು ಹೊರಹಾಕಲಾಗುತ್ತದೆ, train ಮುಂದುವರಿಯುತ್ತದೆ). ಪೂರ್ಣ ಮೋಡ್ `npm run test:unit` ಅನ್ನು ಚಲಾಯಿಸುತ್ತದೆ —
   ಬಾಕ್ಸ್ಗೆ ಹೊಂದಿಸಿದ runner (`--test-concurrency=20`), **ಎರಡು ಅನುಕ್ರಮ 4-core CI
   shardಗಳನ್ನಲ್ಲ**; ಅವು ಪ್ರಧಾನ ಹಂತವನ್ನು 16-core ಬಾಕ್ಸ್ನ ~25% ಬಳಕೆಯಲ್ಲಿ ಚಲಾಯಿಸಿದ್ದವು (ಸರಿಪಡಿಸಿದ್ದು
   2026-07-18). `--fast` (ಒಂದೇ ದಿನದ mega-train ಪೂರ್ಣಗೊಳಿಸುವಿಕೆಗಳು, ಮಾಲೀಕರಿಂದ 2026-07-18 ರಂದು ಅನುಮೋದಿಸಲಾಗಿದೆ)
   ಪ್ರತಿಯೊಂದು static gate + vitest ಅನ್ನು ಉಳಿಸಿಕೊಳ್ಳುತ್ತದೆ, ಆದರೆ train ಗೆ ಸೇರಿಸಲಾದ PRಗಳಿಂದ ಬದಲಾದ
   node:test ಫೈಲ್ಗಳನ್ನು ಮಾತ್ರ ಚಲಾಯಿಸುತ್ತದೆ; ಸಂಗ್ರಹಿತ ತುದಿಯ ಮೇಲೆ ಪೂರ್ಣ suite ಅನ್ನು ಇನ್ನೂ ದಿನಕ್ಕೆ
   ಕನಿಷ್ಠ ಒಮ್ಮೆಯಾದರೂ ಚಲಾಯಿಸಬೇಕು (`--fast` ಇಲ್ಲದ ಒಂದು train).
3. **ಹಸಿರು** → PRಗಳನ್ನು ಅನುಕ್ರಮವಾಗಿ ವಿಲೀನಗೊಳಿಸಿ (ಪ್ರತಿಯೊಂದಕ್ಕೂ ಮೊದಲು `state,headRefOid` ಅನ್ನು ಮರುಪರಿಶೀಲಿಸಿ —
   head ಬದಲಾಗಿರುವ PR ಮತ್ತೆ ಪರಿಶೀಲನಾ ಸರತಿಗೆ ಪ್ರವೇಶಿಸುತ್ತದೆ). ಪ್ರತಿಯೊಂದು ವಿಲೀನದ ನಿವ್ವಳ diff
   ಆ PRನ ಸ್ವಂತ ಬದಲಾವಣೆಯೇ ಎಂಬುದನ್ನು ಸಾಬೀತುಪಡಿಸಿ (ಸ್ವಯಂ-resolve revertಗಳು ಬೇಡ: ವ್ಯಾಪ್ತಿಯಿಂದ ಹೊರಗಿನ
   ಅಳಿಸುವಿಕೆಗಳಿಗಾಗಿ `git diff --stat` ಅನ್ನು ಪರಿಶೋಧಿಸಿ).
4. **ಕೆಂಪು** → ಒಂದೊಂದಾಗಿ ಮರುಮೌಲ್ಯೀಕರಿಸುವ ಬದಲು ಬ್ಯಾಚ್ ಅನ್ನು ಅರ್ಧಗಳಾಗಿ ದ್ವಿಭಜಿಸಿ (ಪ್ರತಿ ಅರ್ಧವನ್ನು ಮೌಲ್ಯೀಕರಿಸಿ);
   ಸಮಸ್ಯೆ ಉಂಟುಮಾಡಿದ PR ಅನ್ನು ಸಾಕ್ಷ್ಯದೊಂದಿಗೆ ಮತ್ತೆ ಪರಿಶೀಲನಾ ಸರತಿಗೆ ಕಳುಹಿಸಿ.
5. **ಎಂದಿಗೂ ಮಾಡಬೇಡಿ**: ಸ್ಥಗಿತದ ಸಮಯದಲ್ಲಿ ಸ್ಥಗಿತಗೊಂಡ ಶಾಖೆಗೆ ವಿಲೀನಗೊಳಿಸುವುದು; ಎಲ್ಲಿಯಾದರೂ
   `git stash` ಬಳಸುವುದು; ಕೆಂಪು ಸ್ಥಿತಿ ಮಾಯವಾಗುತ್ತದೆಂಬ ನಿರೀಕ್ಷೆಯಲ್ಲಿ CI ಅನ್ನು ಸಾರಾಸಗಟಾಗಿ ಮರುಚಲಾಯಿಸುವುದು
   (ನಿಯಮ: ಕೆಂಪು ಸ್ಥಿತಿಯು ಮಾಹಿತಿಯಾಗಿದೆ).

## ಹಂತೀಕರಣ (ಕೇವಲ ವೇಗದ ಗೇಟ್ಗಳೊಂದಿಗೆ ಸರತಿ ಏಕೆ ಸುರಕ್ಷಿತವಾಗಿದೆ)

- **ಪ್ರತಿ PRಗೆ** (quality.yml ವೇಗದ ಗೇಟ್ಗಳು): TIA-ಪ್ರಭಾವಿತ ಪರೀಕ್ಷೆಗಳು + ಪೂರ್ಣ unit 4-shard +
  vitest + lint ಸಮೂಹ + typecheck + docs/changelog ಸಮಗ್ರತೆ.
- **ಪ್ರತಿ ಬ್ಯಾಚ್/ತುದಿಗೆ** (ನಿರಂತರ release-green): ಬಿಡುಗಡೆ ಶಾಖೆಗೆ ಮಾಡುವ ಪ್ರತಿಯೊಂದು pushನಲ್ಲಿ
  `--quick` ಕಠಿಣ ಗೇಟ್ಗಳು; ದಿನಕ್ಕೆ 3× ಪೂರ್ಣ `--with-build --full-ci` ಪರಿಶೀಲನೆಗಳು.
- **ಪ್ರತಿ ಬಿಡುಗಡೆಗೆ** (ಬಿಡುಗಡೆ PRನಲ್ಲಿನ ci.yml): E2E ×9,
  package-artifact + tarball boot-smoke, coverage/ratchets ಒಳಗೊಂಡ ಸಂಪೂರ್ಣ matrix.

ಮೊದಲಿಗಿಂತ ಕಡಿಮೆ ಯಾವುದನ್ನೂ ಮೌಲ್ಯೀಕರಿಸಲಾಗುತ್ತಿಲ್ಲ — ಭಾರೀ ಪರೀಕ್ಷಾ ವ್ಯಾಪ್ತಿಯು ಪ್ರತಿ PRಗೆ ಬದಲಾಗಿ
ಪ್ರತಿ ಬ್ಯಾಚ್/ತುದಿಗೆ ಚಲಿಸುತ್ತದೆ; ಇದೇ O(N) ಸುತ್ತು-ಪ್ರಯಾಣಗಳನ್ನು ತೆಗೆದುಹಾಕುತ್ತದೆ.
