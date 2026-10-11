# Merge Queue & Manual Merge-Train Runbook (മലയാളം)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/MERGE_TRAIN.md) · 🇪🇹 [am](../../../am/docs/ops/MERGE_TRAIN.md) · 🇸🇦 [ar](../../../ar/docs/ops/MERGE_TRAIN.md) · 🇦🇿 [az](../../../az/docs/ops/MERGE_TRAIN.md) · 🇧🇬 [bg](../../../bg/docs/ops/MERGE_TRAIN.md) · 🇧🇩 [bn](../../../bn/docs/ops/MERGE_TRAIN.md) · 🇧🇦 [bs](../../../bs/docs/ops/MERGE_TRAIN.md) · 🇨🇿 [cs](../../../cs/docs/ops/MERGE_TRAIN.md) · 🇩🇰 [da](../../../da/docs/ops/MERGE_TRAIN.md) · 🇩🇪 [de](../../../de/docs/ops/MERGE_TRAIN.md) · 🇬🇷 [el](../../../el/docs/ops/MERGE_TRAIN.md) · 🇪🇸 [es](../../../es/docs/ops/MERGE_TRAIN.md) · 🇪🇪 [et](../../../et/docs/ops/MERGE_TRAIN.md) · 🇮🇷 [fa](../../../fa/docs/ops/MERGE_TRAIN.md) · 🇫🇮 [fi](../../../fi/docs/ops/MERGE_TRAIN.md) · 🇫🇷 [fr](../../../fr/docs/ops/MERGE_TRAIN.md) · 🇮🇪 [ga](../../../ga/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [gu](../../../gu/docs/ops/MERGE_TRAIN.md) · 🇳🇬 [ha](../../../ha/docs/ops/MERGE_TRAIN.md) · 🇮🇱 [he](../../../he/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [hi](../../../hi/docs/ops/MERGE_TRAIN.md) · 🇭🇷 [hr](../../../hr/docs/ops/MERGE_TRAIN.md) · 🇭🇺 [hu](../../../hu/docs/ops/MERGE_TRAIN.md) · 🇦🇲 [hy](../../../hy/docs/ops/MERGE_TRAIN.md) · 🇮🇩 [id](../../../id/docs/ops/MERGE_TRAIN.md) · 🇳🇬 [ig](../../../ig/docs/ops/MERGE_TRAIN.md) · 🇮🇹 [it](../../../it/docs/ops/MERGE_TRAIN.md) · 🇯🇵 [ja](../../../ja/docs/ops/MERGE_TRAIN.md) · 🇬🇪 [ka](../../../ka/docs/ops/MERGE_TRAIN.md) · 🇰🇭 [km](../../../km/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [kn](../../../kn/docs/ops/MERGE_TRAIN.md) · 🇰🇷 [ko](../../../ko/docs/ops/MERGE_TRAIN.md) · 🇱🇹 [lt](../../../lt/docs/ops/MERGE_TRAIN.md) · 🇱🇻 [lv](../../../lv/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [mr](../../../mr/docs/ops/MERGE_TRAIN.md) · 🇲🇾 [ms](../../../ms/docs/ops/MERGE_TRAIN.md) · 🇲🇹 [mt](../../../mt/docs/ops/MERGE_TRAIN.md) · 🇲🇲 [my](../../../my/docs/ops/MERGE_TRAIN.md) · 🇳🇵 [ne](../../../ne/docs/ops/MERGE_TRAIN.md) · 🇳🇱 [nl](../../../nl/docs/ops/MERGE_TRAIN.md) · 🇳🇴 [no](../../../no/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [or](../../../or/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [pa](../../../pa/docs/ops/MERGE_TRAIN.md) · 🇵🇭 [phi](../../../phi/docs/ops/MERGE_TRAIN.md) · 🇵🇱 [pl](../../../pl/docs/ops/MERGE_TRAIN.md) · 🇵🇹 [pt](../../../pt/docs/ops/MERGE_TRAIN.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/MERGE_TRAIN.md) · 🇷🇴 [ro](../../../ro/docs/ops/MERGE_TRAIN.md) · 🇷🇺 [ru](../../../ru/docs/ops/MERGE_TRAIN.md) · 🇱🇰 [si](../../../si/docs/ops/MERGE_TRAIN.md) · 🇸🇰 [sk](../../../sk/docs/ops/MERGE_TRAIN.md) · 🇸🇮 [sl](../../../sl/docs/ops/MERGE_TRAIN.md) · 🇷🇸 [sr](../../../sr/docs/ops/MERGE_TRAIN.md) · 🇸🇪 [sv](../../../sv/docs/ops/MERGE_TRAIN.md) · 🇰🇪 [sw](../../../sw/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [ta](../../../ta/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [te](../../../te/docs/ops/MERGE_TRAIN.md) · 🇹🇭 [th](../../../th/docs/ops/MERGE_TRAIN.md) · 🇹🇷 [tr](../../../tr/docs/ops/MERGE_TRAIN.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/MERGE_TRAIN.md) · 🇵🇰 [ur](../../../ur/docs/ops/MERGE_TRAIN.md) · 🇺🇿 [uz](../../../uz/docs/ops/MERGE_TRAIN.md) · 🇻🇳 [vi](../../../vi/docs/ops/MERGE_TRAIN.md) · 🇳🇬 [yo](../../../yo/docs/ops/MERGE_TRAIN.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/MERGE_TRAIN.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/MERGE_TRAIN.md)

---

v3.8.49 മുതൽ (quality/velocity പ്ലാനിലെ WS3.2/WS3.4), റിവ്യൂ ചെയ്ത PR-കൾ
`release/vX.Y.Z`-ലേക്ക് ലയിപ്പിക്കുന്നതിനുള്ള ഡിഫോൾട്ട് മാർഗം **Mergify merge queue** (`.mergify.yml`) ആണ്;
താഴെ രേഖപ്പെടുത്തിയിരിക്കുന്ന **manual merge-train** ഒരു FALLBACK ആണ് — ഇൻസിഡന്റുകൾ,
റിലീസ് ഫ്രീസുകൾ, അല്ലെങ്കിൽ Mergify Open Source പ്ലാൻ എപ്പോഴെങ്കിലും മാറുകയാണെങ്കിൽ ഉപയോഗിക്കാനുള്ളത്.

## ഡിഫോൾട്ട് പാത: Mergify ക്യൂ

1. PR campaigns അവലോകനം ചെയ്ത് green ആക്കുകയും, ഉടമയുടെ pre-merge ⭐
   gate അംഗീകരിക്കുകയും ചെയ്യുന്നു (റിപ്പോർട്ട് + ഓരോ ഇനത്തിനുമുള്ള തീരുമാനം — `/merge-prs` ഘട്ടം 0.75 കാണുക).
2. ഉടമ (അല്ലെങ്കിൽ ഉടമയുടെ തീരുമാനപ്രകാരം പ്രവർത്തിക്കുന്ന session) **`queue`**
   label പ്രയോഗിക്കുന്നു. ആ label തന്നെയാണ് merge അംഗീകാരം; Mergify അത് നടപ്പിലാക്കുക മാത്രമാണ് ചെയ്യുന്നത്.
3. ക്യൂവിലുള്ള PR-കളെ fast-gates-ന് എതിരെ Mergify **ക്രമാനുഗതമായി** (ഒരു സമയം ഒന്ന്) സാധൂകരിക്കുകയും
   merge (squash) ചെയ്യുകയും ചെയ്യുന്നു. Batching + automatic bisection എന്നത് പണമടയ്ക്കേണ്ട Mergify tier ആണ്
   (സൗജന്യ പ്ലാനിൽ "Cannot use Merge Queue batch", #7220), അതിനാൽ `.mergify.yml`-ൽ
   `batch_size` സജ്ജീകരിക്കുന്നില്ല; batching താഴെയുള്ള manual merge-train-ന്റെ ചുമതലയായി തുടരുന്നു. `checks_timeout`-ന്
   ശേഷവും (240 മിനിറ്റ് = `quality.yml`-ന്റെ അളന്ന p95-ന്റെ 2×) checks pending ആയിരിക്കുന്ന PR,
   ക്യൂ സ്തംഭിപ്പിക്കുന്നതിന് പകരം അതിൽനിന്ന് നീക്കം ചെയ്യപ്പെടും.
4. Merge ചെയ്തതിനുശേഷം, continuous release-green workflow push-ൽ പുതിയ tip സാധൂകരിക്കുകയും
   ഈ സംയോജനം regression ഉണ്ടാക്കിയിട്ടുണ്ടെങ്കിൽ attribution issue തുറക്കുകയും ചെയ്യുന്നു (ഒരിക്കലും auto-revert ചെയ്യില്ല).

സുരക്ഷാ നിയന്ത്രണങ്ങൾ (`CLAUDE.md` Hard Rules #21/#22-ന്റെ പ്രതിരൂപം):

- **Release freeze നിലവിലുണ്ട്** → freeze ചെയ്ത branch ലക്ഷ്യമിടുന്ന PR-കൾക്ക് label നൽകരുത്; ആദ്യം അവയെ
  സജീവമായ `release/vX+1`-ലേക്ക് retarget ചെയ്യുക.
- **മറ്റൊരു session-ന്റെ പുരോഗതിയിലുള്ള PR** → അതിന് ഒരിക്കലും label നൽകരുത്; ഉടമസ്ഥതയുള്ള session മാത്രമേ
  സ്വന്തം work ക്യൂവിൽ ചേർക്കാവൂ.
- Tests-only diffs-ഉം `hotfix` label ഉള്ള PR-കളും ഇതിനകം reduced CI പ്രവർത്തിപ്പിക്കുന്നു (
  `RELEASE_CHECKLIST.md` → Hotfix Fast-Lane കാണുക); യഥാർഥത്തിൽ പ്രവർത്തിച്ച ഏതൊരു
  check set-ഉം queue conditions അംഗീകരിക്കുന്നു (`#check-failure=0` + `#check-pending=0`).

## Fallback: manual merge-train

queue ലഭ്യമല്ലാത്തപ്പോൾ ഉപയോഗിക്കുന്നു. v3.8.47 സൈക്കിളിൽ ഒരു ദിവസംകൊണ്ട് 33 PR-കൾ
തീർപ്പാക്കിയ പ്രക്രിയയെ ഇത് ഔപചാരികമാക്കുന്നു:

1. **ബാച്ച് തയ്യാറാക്കുക** (റിവ്യൂ ചെയ്ത് അംഗീകരിച്ച ഏകദേശം 10–30 PR-കൾ). `linked:` കൂട്ടിയിടികൾ
   (ഒരേ `tap.testFiles`, ഒരേ CHANGELOG hunks) പരിശോധിച്ച് അവയെ ക്രമാനുസൃതമായി പ്രവർത്തിപ്പിക്കുക.
2. **ഒരിക്കൽ മാത്രം സാധൂകരിക്കുക**: release tip-ൽ നിന്നുള്ള ഒറ്റപ്പെട്ട worktree-യിൽ എല്ലാ batch
   head-ുകളും ലോക്കലായി merge ചെയ്യുക; തുടർന്ന് release-ന് തുല്യമായ suite
   പ്രവർത്തിപ്പിക്കുക (`npm run check:release-green`; release-ന് മുമ്പ് `--with-build` ചേർക്കുക).
   `scripts/release/merge-train.sh <base> <PR#>…` 1–2 ഘട്ടങ്ങൾ ഓട്ടോമേറ്റ് ചെയ്യുന്നു (വൈരുദ്ധ്യമുള്ള
   PR-കൾ പുറത്താക്കപ്പെടും; train തുടരും). Full mode `npm run test:unit` പ്രവർത്തിപ്പിക്കുന്നു —
   box-ന് അനുയോജ്യമായി ക്രമീകരിച്ച runner (`--test-concurrency=20`), തുടർച്ചയായി പ്രവർത്തിക്കുന്ന രണ്ട് 4-core CI
   shard-ുകൾ **അല്ല**; അവ 16-core box-ന്റെ ഏകദേശം 25% ശേഷി മാത്രം ഉപയോഗിച്ച് പ്രധാന ഘട്ടത്തെ പ്രവർത്തിപ്പിച്ചിരുന്നു
   (2026-07-18-ന് പരിഹരിച്ചു). `--fast` (ഒരേ ദിവസത്തെ mega-train drains, 2026-07-18-ന് ഉടമ അംഗീകരിച്ചത്)
   എല്ലാ static gate-ുകളും + vitest-ഉം നിലനിർത്തുന്നു, എന്നാൽ train-ൽ ഉൾപ്പെടുത്തിയ PR-കൾ മാറ്റിയ
   node:test ഫയലുകൾ മാത്രം പ്രവർത്തിപ്പിക്കുന്നു; സമാഹരിച്ച tip-ൽ ദിവസത്തിൽ കുറഞ്ഞത് ഒരിക്കലെങ്കിലും
   FULL suite പ്രവർത്തിക്കണം (`--fast` ഇല്ലാത്ത ഒരു train).
3. **Green** → PR-കൾ ക്രമത്തിൽ merge ചെയ്യുക (ഓരോന്നിനും മുമ്പ് `state,headRefOid` വീണ്ടും പരിശോധിക്കുക —
   head മാറിയ PR വീണ്ടും review-ലേക്ക് പ്രവേശിക്കും). ഓരോ merge-ന്റെയും net diff ആ
   PR-ന്റെ സ്വന്തം മാറ്റം മാത്രമാണെന്ന് തെളിയിക്കുക (auto-resolve revert-ുകൾ അനുവദനീയമല്ല:
   scope-ന് പുറത്തുള്ള deletion-ുകൾ കണ്ടെത്താൻ `git diff --stat` ഓഡിറ്റ് ചെയ്യുക).
4. **Red** → ഓരോന്നായി വീണ്ടും സാധൂകരിക്കുന്നതിന് പകരം ബാച്ചിനെ പകുതികളായി bisect ചെയ്യുക
   (ഓരോ പകുതിയും സാധൂകരിക്കുക); പ്രശ്നമുണ്ടാക്കുന്ന PR തെളിവോടുകൂടി review queue-ലേക്ക് തിരികെ വിടുക.
5. **ഒരിക്കലും ചെയ്യരുത്**: freeze സമയത്ത് frozen branch-ലേക്ക് merge ചെയ്യരുത്; എവിടെയും `git stash`
   ഉപയോഗിക്കരുത്; red മാറുമെന്ന പ്രതീക്ഷയിൽ CI മൊത്തമായി വീണ്ടും പ്രവർത്തിപ്പിക്കരുത്
   (നിയമം: red എന്നത് വിവരമാണ്).

## Tiering (fast-gates മാത്രം ഉപയോഗിച്ചിട്ടും queue സുരക്ഷിതമാകുന്നതിന്റെ കാരണം)

- **ഓരോ PR-നും** (quality.yml fast-gates): TIA ബാധിച്ച tests + full unit 4-shard +
  vitest + lint bag + typecheck + docs/changelog integrity.
- **ഓരോ batch/tip-നും** (continuous release-green): release branch-ലേക്കുള്ള ഓരോ push-ലും
  `--quick` HARD gate-ുകൾ; ദിവസത്തിൽ 3 തവണ full `--with-build --full-ci` sweep-ുകൾ.
- **ഓരോ release-നും** (release PR-ലെ ci.yml): E2E ×9 ഉൾപ്പെടെയുള്ള സമ്പൂർണ്ണ matrix,
  package-artifact + tarball boot-smoke, coverage/ratchets.

മുമ്പത്തേക്കാൾ കുറഞ്ഞ തോതിൽ ഒന്നും സാധൂകരിക്കപ്പെടുന്നില്ല — ഭാരമേറിയ surface ഓരോ PR-നും പകരം
ഓരോ batch/tip-നും പ്രവർത്തിക്കുന്നു; ഇതാണ് O(N) round-trip-ുകൾ ഒഴിവാക്കുന്നത്.

## `merge-train.sh`-നുള്ള fresh-checkout മുൻവ്യവസ്ഥകൾ

തകരാറിലായ install ഒരിക്കലും red train ആയി തെറ്റിദ്ധരിക്കപ്പെടാതിരിക്കാൻ script, ഏതെങ്കിലും worktree
പ്രവർത്തനത്തിന് മുമ്പ്, root checkout-ൽ fail-fast **preflight** പ്രവർത്തിപ്പിക്കുന്നു:

1. `npm ci`, തുടർന്ന് npm തടയുന്ന `bun` postinstall പ്രവർത്തിപ്പിക്കുക:
   `(cd node_modules/bun && node install.js)` — അല്ലെങ്കിൽ `check:provider-consistency`,
   `check:known-symbols` (രണ്ടും `bun scripts/…`) എന്നിവ train-ലും base-ലും
   violation line ഇല്ലാതെ പരാജയപ്പെടും.
2. അനാവശ്യമായ `node_modules/node_modules` ഉണ്ടാകരുത് (duplicate dependency tree; React രണ്ടുതവണ load
   ചെയ്യപ്പെടുകയും UI vitest suite-ുകൾ ഉടൻ പരാജയപ്പെടുകയും ചെയ്യും).
3. `node_modules/.bin/tsc` ഉണ്ടായിരിക്കുകയും executable ആയിരിക്കുകയും വേണം (partial install-ൽ അത് ഉണ്ടായിരിക്കില്ല).

train blocking ആയ `npm run check:cycles:ratchet` പ്രവർത്തിപ്പിക്കുന്നു; `npm run check:cycles` മാത്രം
advisory ആണ് (അത് SCC-കൾ പട്ടികപ്പെടുത്തുകയും ആരോഗ്യകരമായ base-ൽ പോലും non-zero ആയി exit ചെയ്യുകയും ചെയ്യുന്നു).
