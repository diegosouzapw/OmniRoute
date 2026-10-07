# Merge Queue & Manual Merge-Train Runbook (മലയാളം)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/MERGE_TRAIN.md) · 🇪🇹 [am](../../../am/docs/ops/MERGE_TRAIN.md) · 🇸🇦 [ar](../../../ar/docs/ops/MERGE_TRAIN.md) · 🇦🇿 [az](../../../az/docs/ops/MERGE_TRAIN.md) · 🇧🇬 [bg](../../../bg/docs/ops/MERGE_TRAIN.md) · 🇧🇩 [bn](../../../bn/docs/ops/MERGE_TRAIN.md) · 🇧🇦 [bs](../../../bs/docs/ops/MERGE_TRAIN.md) · 🇨🇿 [cs](../../../cs/docs/ops/MERGE_TRAIN.md) · 🇩🇰 [da](../../../da/docs/ops/MERGE_TRAIN.md) · 🇩🇪 [de](../../../de/docs/ops/MERGE_TRAIN.md) · 🇬🇷 [el](../../../el/docs/ops/MERGE_TRAIN.md) · 🇪🇸 [es](../../../es/docs/ops/MERGE_TRAIN.md) · 🇪🇪 [et](../../../et/docs/ops/MERGE_TRAIN.md) · 🇮🇷 [fa](../../../fa/docs/ops/MERGE_TRAIN.md) · 🇫🇮 [fi](../../../fi/docs/ops/MERGE_TRAIN.md) · 🇫🇷 [fr](../../../fr/docs/ops/MERGE_TRAIN.md) · 🇮🇪 [ga](../../../ga/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [gu](../../../gu/docs/ops/MERGE_TRAIN.md) · 🇳🇬 [ha](../../../ha/docs/ops/MERGE_TRAIN.md) · 🇮🇱 [he](../../../he/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [hi](../../../hi/docs/ops/MERGE_TRAIN.md) · 🇭🇷 [hr](../../../hr/docs/ops/MERGE_TRAIN.md) · 🇭🇺 [hu](../../../hu/docs/ops/MERGE_TRAIN.md) · 🇦🇲 [hy](../../../hy/docs/ops/MERGE_TRAIN.md) · 🇮🇩 [id](../../../id/docs/ops/MERGE_TRAIN.md) · 🇳🇬 [ig](../../../ig/docs/ops/MERGE_TRAIN.md) · 🇮🇹 [it](../../../it/docs/ops/MERGE_TRAIN.md) · 🇯🇵 [ja](../../../ja/docs/ops/MERGE_TRAIN.md) · 🇬🇪 [ka](../../../ka/docs/ops/MERGE_TRAIN.md) · 🇰🇭 [km](../../../km/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [kn](../../../kn/docs/ops/MERGE_TRAIN.md) · 🇰🇷 [ko](../../../ko/docs/ops/MERGE_TRAIN.md) · 🇱🇹 [lt](../../../lt/docs/ops/MERGE_TRAIN.md) · 🇱🇻 [lv](../../../lv/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [mr](../../../mr/docs/ops/MERGE_TRAIN.md) · 🇲🇾 [ms](../../../ms/docs/ops/MERGE_TRAIN.md) · 🇲🇹 [mt](../../../mt/docs/ops/MERGE_TRAIN.md) · 🇲🇲 [my](../../../my/docs/ops/MERGE_TRAIN.md) · 🇳🇵 [ne](../../../ne/docs/ops/MERGE_TRAIN.md) · 🇳🇱 [nl](../../../nl/docs/ops/MERGE_TRAIN.md) · 🇳🇴 [no](../../../no/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [or](../../../or/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [pa](../../../pa/docs/ops/MERGE_TRAIN.md) · 🇵🇭 [phi](../../../phi/docs/ops/MERGE_TRAIN.md) · 🇵🇱 [pl](../../../pl/docs/ops/MERGE_TRAIN.md) · 🇵🇹 [pt](../../../pt/docs/ops/MERGE_TRAIN.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/MERGE_TRAIN.md) · 🇷🇴 [ro](../../../ro/docs/ops/MERGE_TRAIN.md) · 🇷🇺 [ru](../../../ru/docs/ops/MERGE_TRAIN.md) · 🇱🇰 [si](../../../si/docs/ops/MERGE_TRAIN.md) · 🇸🇰 [sk](../../../sk/docs/ops/MERGE_TRAIN.md) · 🇸🇮 [sl](../../../sl/docs/ops/MERGE_TRAIN.md) · 🇷🇸 [sr](../../../sr/docs/ops/MERGE_TRAIN.md) · 🇸🇪 [sv](../../../sv/docs/ops/MERGE_TRAIN.md) · 🇰🇪 [sw](../../../sw/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [ta](../../../ta/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [te](../../../te/docs/ops/MERGE_TRAIN.md) · 🇹🇭 [th](../../../th/docs/ops/MERGE_TRAIN.md) · 🇹🇷 [tr](../../../tr/docs/ops/MERGE_TRAIN.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/MERGE_TRAIN.md) · 🇵🇰 [ur](../../../ur/docs/ops/MERGE_TRAIN.md) · 🇺🇿 [uz](../../../uz/docs/ops/MERGE_TRAIN.md) · 🇻🇳 [vi](../../../vi/docs/ops/MERGE_TRAIN.md) · 🇳🇬 [yo](../../../yo/docs/ops/MERGE_TRAIN.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/MERGE_TRAIN.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/MERGE_TRAIN.md)

---

v3.8.49 മുതൽ (quality/velocity പ്ലാനിലെ WS3.2/WS3.4), അവലോകനം ചെയ്ത PR-കൾ
`release/vX.Y.Z`-ലേക്ക് ലയിപ്പിക്കുന്നതിനുള്ള ഡിഫോൾട്ട് പാത **Mergify merge queue** (`.mergify.yml`) ആണ്;
താഴെ രേഖപ്പെടുത്തിയിരിക്കുന്ന **manual merge-train** ഒരു FALLBACK ആണ് — ഇൻസിഡന്റുകൾ,
റിലീസ് ഫ്രീസ്, അല്ലെങ്കിൽ Mergify Open Source പ്ലാൻ എപ്പോഴെങ്കിലും മാറുകയാണെങ്കിൽ ഉപയോഗിക്കാനുള്ളത്.

## ഡിഫോൾട്ട് പാത: Mergify queue

1. ക്യാമ്പെയ്നുകൾ PR അവലോകനം ചെയ്ത് ഗ്രീൻ ആക്കുകയും, ഉടമയുടെ pre-merge ⭐
   gate അതിന് അംഗീകാരം നൽകുകയും ചെയ്യുന്നു (റിപ്പോർട്ട് + ഓരോ ഇനത്തിനുമുള്ള തീരുമാനം — `/merge-prs` Step 0.75 കാണുക).
2. ഉടമ (അല്ലെങ്കിൽ ഉടമയുടെ തീരുമാനപ്രകാരം പ്രവർത്തിക്കുന്ന സെഷൻ) **`queue`**
   ലേബൽ പ്രയോഗിക്കുന്നു. ആ ലേബൽ തന്നെയാണ് merge അംഗീകാരം; Mergify അത് നടപ്പാക്കുക മാത്രമാണ് ചെയ്യുന്നത്.
3. Mergify queue ചെയ്ത പരമാവധി 10 PR-കൾ വരെ ബാച്ച് ചെയ്യുകയും, fast-gates-നെതിരെ ബാച്ച്
   സാധൂകരിക്കുകയും, merge (squash) ചെയ്യുകയും ചെയ്യുന്നു. റെഡ് ആയ ബാച്ച് **സ്വയമേവ bisect ചെയ്യപ്പെടും** —
   പ്രശ്നമുണ്ടാക്കുന്ന PR ഏകദേശം ~log2(N) പുനഃസാധൂകരണങ്ങളിലൂടെ വേർതിരിച്ച് queue-ൽ നിന്ന് നീക്കപ്പെടും;
   ശേഷിക്കുന്നവ മുന്നോട്ടുപോകും.
4. Merge-നുശേഷം, continuous release-green workflow push ചെയ്യുമ്പോൾ പുതിയ tip
   സാധൂകരിക്കുകയും, സംയോജനം regression ഉണ്ടാക്കിയെങ്കിൽ attribution issue തുറക്കുകയും ചെയ്യുന്നു (ഒരിക്കലും സ്വയമേവ revert ചെയ്യില്ല).

സുരക്ഷാ നിയന്ത്രണങ്ങൾ (`CLAUDE.md` Hard Rules #21/#22-ന്റെ പ്രതിരൂപം):

- **Release freeze നിലവിലുണ്ട്** → ഫ്രീസ് ചെയ്ത branch ലക്ഷ്യമിടുന്ന PR-കൾക്ക് ലേബൽ നൽകരുത്;
  ആദ്യം സജീവമായ `release/vX+1`-ലേക്ക് retarget ചെയ്യുക.
- **മറ്റൊരു സെഷന്റെ in-flight PR** → അതിന് ഒരിക്കലും ലേബൽ നൽകരുത്; ഉടമസ്ഥതയുള്ള സെഷൻ മാത്രമേ
  സ്വന്തം വർക്ക് queue ചെയ്യാവൂ.
- Tests-only diff-കളും `hotfix` ലേബലുള്ള PR-കളും ഇതിനകം തന്നെ കുറച്ച CI ആണ് പ്രവർത്തിപ്പിക്കുന്നത്
  (`RELEASE_CHECKLIST.md` → Hotfix Fast-Lane കാണുക); യഥാർഥത്തിൽ പ്രവർത്തിച്ച ഏത് check set-ഉം
  queue condition-കൾ അംഗീകരിക്കും (`#check-failure=0` + `#check-pending=0`).

## FALLBACK: manual merge-train

Queue ലഭ്യമല്ലാത്തപ്പോൾ ഉപയോഗിക്കുന്നു. v3.8.47 സൈക്കിളിൽ ഒരൊറ്റ ദിവസംകൊണ്ട് 33 PR-കൾ
പൂർത്തിയാക്കിയ പ്രവർത്തനരീതിയെ ഇത് ഔപചാരികമാക്കുന്നു:

1. **ബാച്ച് തയ്യാറാക്കുക** (അവലോകനം ചെയ്ത് അംഗീകരിച്ച ഏകദേശം 10–30 PR-കൾ). `linked:` collision-കൾ
   (ഒരേ `tap.testFiles`, ഒരേ CHANGELOG hunk-കൾ) പരിശോധിച്ച് അവ ക്രമാനുസൃതമായി കൈകാര്യം ചെയ്യുക.
2. **ഒരിക്കൽ മാത്രം സാധൂകരിക്കുക**: release tip-ൽ നിന്നുള്ള ഒരു isolated worktree-യിൽ എല്ലാ batch
   head-കളും local ആയി merge ചെയ്തശേഷം, release-equivalent suite പ്രവർത്തിപ്പിക്കുക
   (`npm run check:release-green`, റിലീസിന് മുമ്പ് `--with-build` ചേർക്കുക).
   `scripts/release/merge-train.sh <base> <PR#>…` ഘട്ടങ്ങൾ 1–2 ഓട്ടോമേറ്റ് ചെയ്യുന്നു (conflict ഉള്ള
   PR-കൾ പുറത്താക്കപ്പെടും, train തുടരും). Full mode `npm run test:unit` പ്രവർത്തിപ്പിക്കുന്നു —
   box-നായി tune ചെയ്ത runner (`--test-concurrency=20`), **രണ്ട് sequential 4-core CI
   shard-ുകൾ അല്ല**; അവ 16-core box-ിലെ പ്രധാന phase ഏകദേശം ~25% ശേഷിയിൽ മാത്രം പ്രവർത്തിക്കാൻ
   കാരണമായിരുന്നു (2026-07-18-ന് പരിഹരിച്ചു). `--fast` (ഒരേ ദിവസത്തെ mega-train drain-ുകൾ,
   2026-07-18-ന് ഉടമ അംഗീകരിച്ചത്) എല്ലാ static gate-കളും + vitest-ഉം നിലനിർത്തുന്നു, എന്നാൽ
   train-ൽ ഉൾപ്പെടുത്തിയ PR-കൾ മാറ്റിയ node:test file-കൾ മാത്രം പ്രവർത്തിപ്പിക്കുന്നു; സമാഹരിച്ച
   tip-ൽ FULL suite ഇപ്പോഴും ദിവസത്തിൽ കുറഞ്ഞത് ഒരിക്കലെങ്കിലും പ്രവർത്തിപ്പിക്കണം
   (`--fast` ഇല്ലാത്ത ഒരു train).
3. **ഗ്രീൻ** → PR-കൾ ക്രമത്തിൽ merge ചെയ്യുക (ഓരോന്നിനും മുമ്പ് `state,headRefOid` വീണ്ടും പരിശോധിക്കുക —
   head മാറിയ PR വീണ്ടും review-ലേക്ക് പ്രവേശിക്കും). ഓരോ merge-ന്റെയും net diff ആ PR-ന്റെ
   സ്വന്തം മാറ്റം മാത്രമാണെന്ന് തെളിയിക്കുക (auto-resolve revert-ുകൾ പാടില്ല: പരിധിക്ക് പുറത്തുള്ള
   deletion-ുകൾ കണ്ടെത്താൻ `git diff --stat` audit ചെയ്യുക).
4. **റെഡ്** → ഓരോന്നായി വീണ്ടും സാധൂകരിക്കുന്നതിന് പകരം ബാച്ചിനെ പകുതികളായി bisect ചെയ്യുക
   (ഓരോ പകുതിയും സാധൂകരിക്കുക); പ്രശ്നമുണ്ടാക്കുന്ന PR തെളിവുകൾ സഹിതം review queue-ലേക്ക് തിരികെ വിടുക.
5. **ഒരിക്കലും ചെയ്യരുത്**: freeze സമയത്ത് frozen branch-ലേക്ക് merge ചെയ്യൽ; എവിടെയെങ്കിലും
   `git stash` ചെയ്യൽ; റെഡ് സ്വയം മാറുമെന്ന പ്രതീക്ഷയിൽ CI മുഴുവനായും വീണ്ടും പ്രവർത്തിപ്പിക്കൽ
   (നിയമം: റെഡ് എന്നത് വിവരമാണ്).

## Tiering (fast-gates മാത്രം ഉപയോഗിച്ചാലും queue സുരക്ഷിതമായിരിക്കുന്നത് എന്തുകൊണ്ട്)

- **ഓരോ PR-നും** (quality.yml fast-gates): TIA ബാധിച്ച test-ുകൾ + full unit 4-shard +
  vitest + lint bag + typecheck + docs/changelog integrity.
- **ഓരോ batch/tip-നും** (continuous release-green): release branch-ലേക്കുള്ള ഓരോ push-ലും
  `--quick` HARD gate-ുകൾ; ദിവസത്തിൽ 3 തവണ full `--with-build --full-ci` sweep-ുകൾ.
- **ഓരോ റിലീസിനും** (release PR-ലെ ci.yml): E2E ×9 ഉൾപ്പെടെയുള്ള complete matrix,
  package-artifact + tarball boot-smoke, coverage/ratchet-ുകൾ.

മുമ്പത്തേതിനേക്കാൾ കുറവായി ഒന്നും സാധൂകരിക്കപ്പെടുന്നില്ല — കനത്ത surface ഓരോ PR-നും പകരം
ഓരോ batch/tip-നും പ്രവർത്തിക്കുന്നു; അതാണ് O(N) round-trip-ുകൾ ഒഴിവാക്കുന്നത്.
