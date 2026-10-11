# Merge Queue & Manual Merge-Train Runbook (ಕನ್ನಡ)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/MERGE_TRAIN.md) · 🇪🇹 [am](../../../am/docs/ops/MERGE_TRAIN.md) · 🇸🇦 [ar](../../../ar/docs/ops/MERGE_TRAIN.md) · 🇦🇿 [az](../../../az/docs/ops/MERGE_TRAIN.md) · 🇧🇬 [bg](../../../bg/docs/ops/MERGE_TRAIN.md) · 🇧🇩 [bn](../../../bn/docs/ops/MERGE_TRAIN.md) · 🇧🇦 [bs](../../../bs/docs/ops/MERGE_TRAIN.md) · 🇨🇿 [cs](../../../cs/docs/ops/MERGE_TRAIN.md) · 🇩🇰 [da](../../../da/docs/ops/MERGE_TRAIN.md) · 🇩🇪 [de](../../../de/docs/ops/MERGE_TRAIN.md) · 🇬🇷 [el](../../../el/docs/ops/MERGE_TRAIN.md) · 🇪🇸 [es](../../../es/docs/ops/MERGE_TRAIN.md) · 🇪🇪 [et](../../../et/docs/ops/MERGE_TRAIN.md) · 🇮🇷 [fa](../../../fa/docs/ops/MERGE_TRAIN.md) · 🇫🇮 [fi](../../../fi/docs/ops/MERGE_TRAIN.md) · 🇫🇷 [fr](../../../fr/docs/ops/MERGE_TRAIN.md) · 🇮🇪 [ga](../../../ga/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [gu](../../../gu/docs/ops/MERGE_TRAIN.md) · 🇳🇬 [ha](../../../ha/docs/ops/MERGE_TRAIN.md) · 🇮🇱 [he](../../../he/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [hi](../../../hi/docs/ops/MERGE_TRAIN.md) · 🇭🇷 [hr](../../../hr/docs/ops/MERGE_TRAIN.md) · 🇭🇺 [hu](../../../hu/docs/ops/MERGE_TRAIN.md) · 🇦🇲 [hy](../../../hy/docs/ops/MERGE_TRAIN.md) · 🇮🇩 [id](../../../id/docs/ops/MERGE_TRAIN.md) · 🇳🇬 [ig](../../../ig/docs/ops/MERGE_TRAIN.md) · 🇮🇹 [it](../../../it/docs/ops/MERGE_TRAIN.md) · 🇯🇵 [ja](../../../ja/docs/ops/MERGE_TRAIN.md) · 🇬🇪 [ka](../../../ka/docs/ops/MERGE_TRAIN.md) · 🇰🇭 [km](../../../km/docs/ops/MERGE_TRAIN.md) · 🇰🇷 [ko](../../../ko/docs/ops/MERGE_TRAIN.md) · 🇱🇹 [lt](../../../lt/docs/ops/MERGE_TRAIN.md) · 🇱🇻 [lv](../../../lv/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [ml](../../../ml/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [mr](../../../mr/docs/ops/MERGE_TRAIN.md) · 🇲🇾 [ms](../../../ms/docs/ops/MERGE_TRAIN.md) · 🇲🇹 [mt](../../../mt/docs/ops/MERGE_TRAIN.md) · 🇲🇲 [my](../../../my/docs/ops/MERGE_TRAIN.md) · 🇳🇵 [ne](../../../ne/docs/ops/MERGE_TRAIN.md) · 🇳🇱 [nl](../../../nl/docs/ops/MERGE_TRAIN.md) · 🇳🇴 [no](../../../no/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [or](../../../or/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [pa](../../../pa/docs/ops/MERGE_TRAIN.md) · 🇵🇭 [phi](../../../phi/docs/ops/MERGE_TRAIN.md) · 🇵🇱 [pl](../../../pl/docs/ops/MERGE_TRAIN.md) · 🇵🇹 [pt](../../../pt/docs/ops/MERGE_TRAIN.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/MERGE_TRAIN.md) · 🇷🇴 [ro](../../../ro/docs/ops/MERGE_TRAIN.md) · 🇷🇺 [ru](../../../ru/docs/ops/MERGE_TRAIN.md) · 🇱🇰 [si](../../../si/docs/ops/MERGE_TRAIN.md) · 🇸🇰 [sk](../../../sk/docs/ops/MERGE_TRAIN.md) · 🇸🇮 [sl](../../../sl/docs/ops/MERGE_TRAIN.md) · 🇷🇸 [sr](../../../sr/docs/ops/MERGE_TRAIN.md) · 🇸🇪 [sv](../../../sv/docs/ops/MERGE_TRAIN.md) · 🇰🇪 [sw](../../../sw/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [ta](../../../ta/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [te](../../../te/docs/ops/MERGE_TRAIN.md) · 🇹🇭 [th](../../../th/docs/ops/MERGE_TRAIN.md) · 🇹🇷 [tr](../../../tr/docs/ops/MERGE_TRAIN.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/MERGE_TRAIN.md) · 🇵🇰 [ur](../../../ur/docs/ops/MERGE_TRAIN.md) · 🇺🇿 [uz](../../../uz/docs/ops/MERGE_TRAIN.md) · 🇻🇳 [vi](../../../vi/docs/ops/MERGE_TRAIN.md) · 🇳🇬 [yo](../../../yo/docs/ops/MERGE_TRAIN.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/MERGE_TRAIN.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/MERGE_TRAIN.md)

---

v3.8.49 ರಿಂದ (ಗುಣಮಟ್ಟ/ವೇಗ ಯೋಜನೆಯ WS3.2/WS3.4), ಪರಿಶೀಲಿಸಲಾದ PRಗಳನ್ನು
`release/vX.Y.Z` ಗೆ ವಿಲೀನಗೊಳಿಸುವ ಡೀಫಾಲ್ಟ್ ಮಾರ್ಗವೆಂದರೆ **Mergify ವಿಲೀನ ಸರತಿ** (`.mergify.yml`);
ಕೆಳಗೆ ದಾಖಲಿಸಿರುವ **ಹಸ್ತಚಾಲಿತ merge-train** FALLBACK ಆಗಿದೆ — ಘಟನೆಗಳ ಸಂದರ್ಭದಲ್ಲಿ,
ಬಿಡುಗಡೆ ಸ್ಥಗಿತದ ಸಮಯದಲ್ಲಿ ಅಥವಾ Mergify Open Source ಯೋಜನೆ ಎಂದಾದರೂ ಬದಲಾದರೆ ಇದನ್ನು ಬಳಸಲಾಗುತ್ತದೆ.

## ಡೀಫಾಲ್ಟ್ ಮಾರ್ಗ: Mergify ಕ್ಯೂ

1. PR ಅನ್ನು ಅಭಿಯಾನಗಳು ಪರಿಶೀಲಿಸಿ/ಹಸಿರು ನಿಶಾನೆ ನೀಡಿರುತ್ತವೆ ಮತ್ತು ಮಾಲೀಕರ ವಿಲೀನ-ಪೂರ್ವ ⭐
   ಗೇಟ್ನಿಂದ ಅನುಮೋದಿಸಲಾಗಿರುತ್ತದೆ (ವರದಿ + ಪ್ರತಿ-ಐಟಂ ನಿರ್ಧಾರ — `/merge-prs` ಹಂತ 0.75 ನೋಡಿ).
2. ಮಾಲೀಕರು (ಅಥವಾ ಮಾಲೀಕರ ನಿರ್ಧಾರದ ಮೇರೆಗೆ ಕಾರ್ಯನಿರ್ವಹಿಸುವ ಸೆಷನ್) **`queue`**
   ಲೇಬಲ್ ಅನ್ನು ಅನ್ವಯಿಸುತ್ತಾರೆ. ಆ ಲೇಬಲ್ವೇ ವಿಲೀನದ ಅನುಮೋದನೆ; Mergify ಅದನ್ನು ಕಾರ್ಯಗತಗೊಳಿಸುವುದಷ್ಟೇ.
3. Mergify ಕ್ಯೂಗೆ ಸೇರಿಸಲಾದ PRಗಳನ್ನು ಫಾಸ್ಟ್-ಗೇಟ್ಗಳ ವಿರುದ್ಧ **ಅನುಕ್ರಮವಾಗಿ**
   (ಒಂದು ಬಾರಿಗೆ ಒಂದು) ಮೌಲ್ಯೀಕರಿಸಿ, ವಿಲೀನಗೊಳಿಸುತ್ತದೆ (squash). ಬ್ಯಾಚಿಂಗ್ + ಸ್ವಯಂಚಾಲಿತ ಬೈಸೆಕ್ಷನ್
   ಪಾವತಿಸಬೇಕಾದ Mergify ಶ್ರೇಣಿಯ ವೈಶಿಷ್ಟ್ಯವಾಗಿದೆ (ಉಚಿತ ಯೋಜನೆಯಲ್ಲಿ "Cannot use Merge Queue batch",
   #7220), ಆದ್ದರಿಂದ `.mergify.yml` ಯಾವುದೇ `batch_size` ಅನ್ನು ಹೊಂದಿಸುವುದಿಲ್ಲ; ಬ್ಯಾಚಿಂಗ್ ಕೆಳಗಿನ
   ಕೈಯಾರೆ ನಿರ್ವಹಿಸುವ merge-trainನ ಕೆಲಸವಾಗಿಯೇ ಉಳಿಯುತ್ತದೆ. `checks_timeout` ನಂತರವೂ
   (240 ನಿಮಿಷ = `quality.yml` ನ ಅಳೆಯಲಾದ p95 ನ 2×) ಪರಿಶೀಲನೆಗಳು ಬಾಕಿ ಇರುವ PR ಅನ್ನು
   ಕ್ಯೂ ಸ್ಥಗಿತಗೊಳ್ಳದಂತೆ ಅದರಿಂದ ತೆಗೆದುಹಾಕಲಾಗುತ್ತದೆ.
4. ವಿಲೀನದ ನಂತರ, ನಿರಂತರ release-green ಕಾರ್ಯಪ್ರವಾಹವು push ಆದಾಗ ಹೊಸ tip ಅನ್ನು
   ಮೌಲ್ಯೀಕರಿಸುತ್ತದೆ ಮತ್ತು ಸಂಯೋಜನೆಯು ಹಿಂಜರಿತಕ್ಕೆ ಕಾರಣವಾಗಿದ್ದರೆ attribution issue ಅನ್ನು ತೆರೆಯುತ್ತದೆ
   (ಎಂದಿಗೂ ಸ್ವಯಂ-revert ಮಾಡುವುದಿಲ್ಲ).

ರಕ್ಷಣಾತ್ಮಕ ನಿಯಮಗಳು (`CLAUDE.md` ನ ಕಠಿಣ ನಿಯಮಗಳು #21/#22 ಅನ್ನು ಪ್ರತಿಬಿಂಬಿಸುತ್ತವೆ):

- **Release freeze ತೆರೆದಿದೆ** → freeze ಮಾಡಲಾದ branch ಅನ್ನು ಗುರಿಯಾಗಿಸಿಕೊಂಡಿರುವ PRಗಳಿಗೆ ಲೇಬಲ್
  ಹಾಕಬೇಡಿ; ಮೊದಲು ಸಕ್ರಿಯ `release/vX+1` ಗೆ ಮರುಗುರಿಪಡಿಸಿ.
- **ಮತ್ತೊಂದು ಸೆಷನ್ನ ಪ್ರಗತಿಯಲ್ಲಿರುವ PR** → ಅದಕ್ಕೆ ಎಂದಿಗೂ ಲೇಬಲ್ ಹಾಕಬೇಡಿ; ಮಾಲೀಕತ್ವ ಹೊಂದಿರುವ
  ಸೆಷನ್ ಮಾತ್ರ ತನ್ನ ಸ್ವಂತ ಕೆಲಸವನ್ನು ಕ್ಯೂಗೆ ಸೇರಿಸುತ್ತದೆ.
- ಕೇವಲ ಪರೀಕ್ಷೆಗಳ diffಗಳು ಮತ್ತು `hotfix`-ಲೇಬಲ್ ಹೊಂದಿರುವ PRಗಳು ಈಗಾಗಲೇ ಕಡಿತಗೊಳಿಸಿದ CI ಅನ್ನು
  ಚಲಾಯಿಸುತ್ತವೆ (`RELEASE_CHECKLIST.md` → Hotfix Fast-Lane ನೋಡಿ); ವಾಸ್ತವವಾಗಿ ಚಲಾಯಿಸಲಾದ ಯಾವುದೇ
  ಪರಿಶೀಲನಾ ಸಮೂಹವನ್ನು ಕ್ಯೂ ಷರತ್ತುಗಳು ಸ್ವೀಕರಿಸುತ್ತವೆ (`#check-failure=0` + `#check-pending=0`).

## ಪರ್ಯಾಯ: ಹಸ್ತಚಾಲಿತ merge-train

ಸರತಿ ಲಭ್ಯವಿಲ್ಲದಾಗ ಬಳಸಲಾಗುತ್ತದೆ. ಇದು v3.8.47 ಚಕ್ರದ ಸಮಯದಲ್ಲಿ ಒಂದೇ ದಿನದಲ್ಲಿ 33 PRಗಳನ್ನು
ಪೂರ್ಣಗೊಳಿಸಿದ ಅಭ್ಯಾಸವನ್ನು ನಿಯಮಬದ್ಧಗೊಳಿಸುತ್ತದೆ:

1. **ಬ್ಯಾಚ್ ಅನ್ನು ಜೋಡಿಸಿ** (~10–30 ಪರಿಶೀಲಿಸಲಾದ+ಅನುಮೋದಿಸಲಾದ PRಗಳು). `linked:` ಘರ್ಷಣೆಗಳನ್ನು
   (ಒಂದೇ `tap.testFiles`, ಒಂದೇ CHANGELOG ಭಾಗಗಳು) ಪರಿಶೀಲಿಸಿ ಮತ್ತು ಅವುಗಳನ್ನು ಅನುಕ್ರಮವಾಗಿ ಪ್ರಕ್ರಿಯೆಗೊಳಿಸಿ.
2. **ಒಮ್ಮೆ ಮಾತ್ರ ಮೌಲ್ಯೀಕರಿಸಿ**: ಬಿಡುಗಡೆ ತುದಿಯಿಂದ ಪ್ರತ್ಯೇಕಿಸಲಾದ worktree ಯಲ್ಲಿ, ಎಲ್ಲಾ ಬ್ಯಾಚ್
   head ಗಳನ್ನು ಸ್ಥಳೀಯವಾಗಿ ವಿಲೀನಗೊಳಿಸಿ, ನಂತರ ಬಿಡುಗಡೆಗೆ ಸಮಾನವಾದ ಸೂಟ್ ಅನ್ನು ಚಲಾಯಿಸಿ
   (`npm run check:release-green`, ಬಿಡುಗಡೆಗೂ ಮೊದಲು `--with-build` ಸೇರಿಸಿ).
   `scripts/release/merge-train.sh <base> <PR#>…` ಹಂತಗಳು 1–2 ಅನ್ನು ಸ್ವಯಂಚಾಲಿತಗೊಳಿಸುತ್ತದೆ (ಘರ್ಷಿಸುವ
   PRಗಳು ಹೊರಬೀಳುತ್ತವೆ, train ಮುಂದುವರಿಯುತ್ತದೆ). ಪೂರ್ಣ ಮೋಡ್ `npm run test:unit` ಅನ್ನು ಚಲಾಯಿಸುತ್ತದೆ —
   ಯಂತ್ರಕ್ಕೆ ಹೊಂದಿಸಲಾದ runner (`--test-concurrency=20`), **ಎರಡು ಅನುಕ್ರಮ 4-core CI
   shardಗಳಲ್ಲ**, ಏಕೆಂದರೆ ಅವು ಪ್ರಧಾನ ಹಂತವನ್ನು 16-core ಯಂತ್ರದ ~25% ಬಳಕೆಯಲ್ಲಿ ಚಲಾಯಿಸುತ್ತಿದ್ದವು (ಇದನ್ನು
   2026-07-18 ರಂದು ಸರಿಪಡಿಸಲಾಗಿದೆ). `--fast` (ಒಂದೇ ದಿನದ mega-train ಪೂರ್ಣಗೊಳಿಸುವಿಕೆಗಳು, 2026-07-18 ರಂದು ಮಾಲೀಕರಿಂದ ಅನುಮೋದಿತ)
   ಪ್ರತಿಯೊಂದು static gate + vitest ಅನ್ನು ಉಳಿಸಿಕೊಳ್ಳುತ್ತದೆ, ಆದರೆ train ಗೆ ಸೇರಿಸಲಾದ PRಗಳಿಂದ ಬದಲಾದ
   node:test ಫೈಲ್ಗಳನ್ನು ಮಾತ್ರ ಚಲಾಯಿಸುತ್ತದೆ; ಸಂಗ್ರಹಿತ ತುದಿಯ ಮೇಲೆ FULL ಸೂಟ್ ಅನ್ನು ದಿನಕ್ಕೆ ಕನಿಷ್ಠ ಒಮ್ಮೆಯಾದರೂ
   ಚಲಾಯಿಸಬೇಕು (`--fast` ಇಲ್ಲದ ಒಂದು train).
3. **ಹಸಿರು** → PRಗಳನ್ನು ಅನುಕ್ರಮವಾಗಿ ವಿಲೀನಗೊಳಿಸಿ (ಪ್ರತಿಯೊಂದಕ್ಕೂ ಮೊದಲು `state,headRefOid` ಅನ್ನು ಮರುಪರಿಶೀಲಿಸಿ —
   head ಬದಲಾಗಿರುವ PR ಮತ್ತೆ ಪರಿಶೀಲನಾ ಸರತಿಗೆ ಸೇರುತ್ತದೆ). ಪ್ರತಿಯೊಂದು ವಿಲೀನದ ನಿವ್ವಳ ವ್ಯತ್ಯಾಸವು
   ಆ PRನ ಸ್ವಂತ ಬದಲಾವಣೆಯೇ ಎಂದು ಸಾಬೀತುಪಡಿಸಿ (ಸ್ವಯಂ-resolve revertಗಳು ಬೇಡ: ವ್ಯಾಪ್ತಿಯಿಂದ ಹೊರಗಿನ
   ಅಳಿಸುವಿಕೆಗಳಿಗಾಗಿ `git diff --stat` ಅನ್ನು ಆಡಿಟ್ ಮಾಡಿ).
4. **ಕೆಂಪು** → ಒಂದೊಂದಾಗಿ ಮರುಮೌಲ್ಯೀಕರಿಸುವ ಬದಲು ಬ್ಯಾಚ್ ಅನ್ನು ಅರ್ಧಗಳಾಗಿ ದ್ವಿಭಜಿಸಿ (ಪ್ರತಿ ಅರ್ಧವನ್ನು ಮೌಲ್ಯೀಕರಿಸಿ);
   ಸಮಸ್ಯೆಯಿರುವ PR ಅನ್ನು ಸಾಕ್ಷ್ಯದೊಂದಿಗೆ ಮತ್ತೆ ಪರಿಶೀಲನಾ ಸರತಿಗೆ ಕಳುಹಿಸಿ.
5. **ಎಂದಿಗೂ ಮಾಡಬಾರದು**: ಸ್ಥಗಿತದ ಸಮಯದಲ್ಲಿ ಸ್ಥಗಿತಗೊಂಡ ಶಾಖೆಗೆ ವಿಲೀನಗೊಳಿಸುವುದು; ಎಲ್ಲಿಯಾದರೂ `git stash`
   ಬಳಸುವುದು; ಕೆಂಪು ಸ್ಥಿತಿ ಹೋಗಬಹುದು ಎಂಬ ನಿರೀಕ್ಷೆಯಿಂದ CI ಅನ್ನು ಸಾರಾಸಗಟಾಗಿ ಮರುಚಲಾಯಿಸುವುದು (ನಿಯಮ: ಕೆಂಪು ಎಂದರೆ ಮಾಹಿತಿ).

## ಹಂತೀಕರಣ (ವೇಗದ ಗೇಟ್ಗಳೊಂದಿಗೆ ಮಾತ್ರವೂ ಸರತಿ ಏಕೆ ಸುರಕ್ಷಿತವಾಗಿದೆ)

- **ಪ್ರತಿ PRಗೆ** (quality.yml ವೇಗದ ಗೇಟ್ಗಳು): TIA-ಪ್ರಭಾವಿತ ಪರೀಕ್ಷೆಗಳು + ಪೂರ್ಣ unit 4-shard +
  vitest + lint ಸಮೂಹ + typecheck + docs/changelog ಸಮಗ್ರತೆ.
- **ಪ್ರತಿ ಬ್ಯಾಚ್/ತುದಿಗೆ** (ನಿರಂತರ release-green): ಬಿಡುಗಡೆ ಶಾಖೆಗೆ ಪ್ರತಿ push ನಲ್ಲೂ `--quick` HARD ಗೇಟ್ಗಳು;
  ಪೂರ್ಣ `--with-build --full-ci` ಪರಿಶೀಲನೆಗಳು ದಿನಕ್ಕೆ 3×.
- **ಪ್ರತಿ ಬಿಡುಗಡೆಗೆ** (ಬಿಡುಗಡೆ PR ಮೇಲಿನ ci.yml): E2E ×9 ಸೇರಿದಂತೆ ಸಂಪೂರ್ಣ matrix,
  package-artifact + tarball boot-smoke, coverage/ratchets.

ಮೊದಲಿಗಿಂತ ಕಡಿಮೆ ಪ್ರಮಾಣದಲ್ಲಿ ಯಾವುದನ್ನೂ ಮೌಲ್ಯೀಕರಿಸುವುದಿಲ್ಲ — ಭಾರವಾದ ವ್ಯಾಪ್ತಿಯು ಪ್ರತಿ PRಗೆ ಬದಲಾಗಿ
ಪ್ರತಿ ಬ್ಯಾಚ್/ತುದಿಗೆ ಚಲಿಸುತ್ತದೆ; ಇದುವೇ O(N) ಸುತ್ತು-ಪ್ರಯಾಣಗಳನ್ನು ತೆಗೆದುಹಾಕುತ್ತದೆ.

## `merge-train.sh` ಗಾಗಿ ಹೊಸ-checkout ಪೂರ್ವಾಪೇಕ್ಷೆಗಳು

ದೋಷಪೂರಿತ ಸ್ಥಾಪನೆಯು ಎಂದಿಗೂ ಕೆಂಪು train ಎಂದು ತಪ್ಪಾಗಿ ಕಾಣಿಸಿಕೊಳ್ಳದಂತೆ, ಸ್ಕ್ರಿಪ್ಟ್ root checkout ನಲ್ಲಿ
(ಯಾವುದೇ worktree ಕೆಲಸಕ್ಕೂ ಮೊದಲು) ತಕ್ಷಣ-ವಿಫಲಗೊಳ್ಳುವ **preflight** ಅನ್ನು ಚಲಾಯಿಸುತ್ತದೆ:

1. `npm ci`, ನಂತರ npm ತಡೆಯುವ `bun` postinstall ಅನ್ನು ಚಲಾಯಿಸಿ:
   `(cd node_modules/bun && node install.js)` — ಇಲ್ಲವಾದರೆ `check:provider-consistency`
   ಮತ್ತು `check:known-symbols` (ಎರಡೂ `bun scripts/…`) ಉಲ್ಲಂಘನಾ ಸಾಲಿಲ್ಲದೆಯೇ train ಮತ್ತು base
   ಎರಡರಲ್ಲೂ ವಿಫಲಗೊಳ್ಳುತ್ತವೆ.
2. ಅನಗತ್ಯ `node_modules/node_modules` ಇರಬಾರದು (ನಕಲಿ dependency tree; React ಎರಡು ಬಾರಿ ಲೋಡ್ ಆಗುತ್ತದೆ
   ಮತ್ತು UI vitest ಸೂಟ್ಗಳು ತಕ್ಷಣವೇ ವಿಫಲಗೊಳ್ಳುತ್ತವೆ).
3. `node_modules/.bin/tsc` ಇರಬೇಕು ಮತ್ತು ಕಾರ್ಯಗತಗೊಳಿಸಬಹುದಾಗಿರಬೇಕು (ಅಪೂರ್ಣ ಸ್ಥಾಪನೆಯಲ್ಲಿ ಅದು ಇರುವುದಿಲ್ಲ).

train ತಡೆಯೊಡ್ಡುವ `npm run check:cycles:ratchet` ಅನ್ನು ಚಲಾಯಿಸುತ್ತದೆ; ಕೇವಲ `npm run check:cycles`
ಸಲಹಾತ್ಮಕವಾಗಿದೆ (ಇದು SCCಗಳನ್ನು ಪಟ್ಟಿ ಮಾಡುತ್ತದೆ ಮತ್ತು ಆರೋಗ್ಯಕರ base ಮೇಲೆಯೂ non-zero ಸ್ಥಿತಿಯೊಂದಿಗೆ ನಿರ್ಗಮಿಸುತ್ತದೆ).
