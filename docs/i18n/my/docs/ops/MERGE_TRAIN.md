# Merge Queue & Manual Merge-Train Runbook (မြန်မာ)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/MERGE_TRAIN.md) · 🇪🇹 [am](../../../am/docs/ops/MERGE_TRAIN.md) · 🇸🇦 [ar](../../../ar/docs/ops/MERGE_TRAIN.md) · 🇦🇿 [az](../../../az/docs/ops/MERGE_TRAIN.md) · 🇧🇬 [bg](../../../bg/docs/ops/MERGE_TRAIN.md) · 🇧🇩 [bn](../../../bn/docs/ops/MERGE_TRAIN.md) · 🇧🇦 [bs](../../../bs/docs/ops/MERGE_TRAIN.md) · 🇨🇿 [cs](../../../cs/docs/ops/MERGE_TRAIN.md) · 🇩🇰 [da](../../../da/docs/ops/MERGE_TRAIN.md) · 🇩🇪 [de](../../../de/docs/ops/MERGE_TRAIN.md) · 🇬🇷 [el](../../../el/docs/ops/MERGE_TRAIN.md) · 🇪🇸 [es](../../../es/docs/ops/MERGE_TRAIN.md) · 🇪🇪 [et](../../../et/docs/ops/MERGE_TRAIN.md) · 🇮🇷 [fa](../../../fa/docs/ops/MERGE_TRAIN.md) · 🇫🇮 [fi](../../../fi/docs/ops/MERGE_TRAIN.md) · 🇫🇷 [fr](../../../fr/docs/ops/MERGE_TRAIN.md) · 🇮🇪 [ga](../../../ga/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [gu](../../../gu/docs/ops/MERGE_TRAIN.md) · 🇳🇬 [ha](../../../ha/docs/ops/MERGE_TRAIN.md) · 🇮🇱 [he](../../../he/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [hi](../../../hi/docs/ops/MERGE_TRAIN.md) · 🇭🇷 [hr](../../../hr/docs/ops/MERGE_TRAIN.md) · 🇭🇺 [hu](../../../hu/docs/ops/MERGE_TRAIN.md) · 🇦🇲 [hy](../../../hy/docs/ops/MERGE_TRAIN.md) · 🇮🇩 [id](../../../id/docs/ops/MERGE_TRAIN.md) · 🇳🇬 [ig](../../../ig/docs/ops/MERGE_TRAIN.md) · 🇮🇹 [it](../../../it/docs/ops/MERGE_TRAIN.md) · 🇯🇵 [ja](../../../ja/docs/ops/MERGE_TRAIN.md) · 🇬🇪 [ka](../../../ka/docs/ops/MERGE_TRAIN.md) · 🇰🇭 [km](../../../km/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [kn](../../../kn/docs/ops/MERGE_TRAIN.md) · 🇰🇷 [ko](../../../ko/docs/ops/MERGE_TRAIN.md) · 🇱🇹 [lt](../../../lt/docs/ops/MERGE_TRAIN.md) · 🇱🇻 [lv](../../../lv/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [ml](../../../ml/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [mr](../../../mr/docs/ops/MERGE_TRAIN.md) · 🇲🇾 [ms](../../../ms/docs/ops/MERGE_TRAIN.md) · 🇲🇹 [mt](../../../mt/docs/ops/MERGE_TRAIN.md) · 🇳🇵 [ne](../../../ne/docs/ops/MERGE_TRAIN.md) · 🇳🇱 [nl](../../../nl/docs/ops/MERGE_TRAIN.md) · 🇳🇴 [no](../../../no/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [or](../../../or/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [pa](../../../pa/docs/ops/MERGE_TRAIN.md) · 🇵🇭 [phi](../../../phi/docs/ops/MERGE_TRAIN.md) · 🇵🇱 [pl](../../../pl/docs/ops/MERGE_TRAIN.md) · 🇵🇹 [pt](../../../pt/docs/ops/MERGE_TRAIN.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/MERGE_TRAIN.md) · 🇷🇴 [ro](../../../ro/docs/ops/MERGE_TRAIN.md) · 🇷🇺 [ru](../../../ru/docs/ops/MERGE_TRAIN.md) · 🇱🇰 [si](../../../si/docs/ops/MERGE_TRAIN.md) · 🇸🇰 [sk](../../../sk/docs/ops/MERGE_TRAIN.md) · 🇸🇮 [sl](../../../sl/docs/ops/MERGE_TRAIN.md) · 🇷🇸 [sr](../../../sr/docs/ops/MERGE_TRAIN.md) · 🇸🇪 [sv](../../../sv/docs/ops/MERGE_TRAIN.md) · 🇰🇪 [sw](../../../sw/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [ta](../../../ta/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [te](../../../te/docs/ops/MERGE_TRAIN.md) · 🇹🇭 [th](../../../th/docs/ops/MERGE_TRAIN.md) · 🇹🇷 [tr](../../../tr/docs/ops/MERGE_TRAIN.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/MERGE_TRAIN.md) · 🇵🇰 [ur](../../../ur/docs/ops/MERGE_TRAIN.md) · 🇺🇿 [uz](../../../uz/docs/ops/MERGE_TRAIN.md) · 🇻🇳 [vi](../../../vi/docs/ops/MERGE_TRAIN.md) · 🇳🇬 [yo](../../../yo/docs/ops/MERGE_TRAIN.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/MERGE_TRAIN.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/MERGE_TRAIN.md)

---

v3.8.49 (quality/velocity အစီအစဉ်၏ WS3.2/WS3.4) မှစ၍ စစ်ဆေးသုံးသပ်ပြီးသော PR များကို `release/vX.Y.Z` ထဲသို့ ပေါင်းစည်းရန် မူလသတ်မှတ်ထားသည့် လမ်းကြောင်းမှာ **Mergify merge queue** (`.mergify.yml`) ဖြစ်သည်။ အောက်တွင် မှတ်တမ်းတင်ထားသည့် **manual merge-train** သည် FALLBACK ဖြစ်ပြီး ဖြစ်ရပ်ပြဿနာများ၊ release freeze များအတွင်း သို့မဟုတ် Mergify Open Source အစီအစဉ် ပြောင်းလဲသွားပါက အသုံးပြုရန်ဖြစ်သည်။

## မူလလမ်းကြောင်း: Mergify queue

1. PR ကို campaigns များက စစ်ဆေးသုံးသပ်ပြီး/green ဖြစ်အောင် လုပ်ထားကာ owner ၏ merge မလုပ်မီ ⭐
   gate ဖြင့် အတည်ပြုထားသည် (အစီရင်ခံစာ + item တစ်ခုချင်းစီအလိုက် ဆုံးဖြတ်ချက် — `/merge-prs` Step 0.75 ကို ကြည့်ပါ)။
2. Owner (သို့မဟုတ် owner ၏ ဆုံးဖြတ်ချက်အတိုင်း လုပ်ဆောင်နေသည့် session) က **`queue`**
   label ကို တပ်သည်။ အဆိုပါ label သည် merge အတည်ပြုချက်ပင် ဖြစ်သည်။ Mergify က ၎င်းကို လုပ်ဆောင်ပေးရုံသာဖြစ်သည်။
3. Mergify သည် queue ထဲရှိ PR များကို အများဆုံး 10 ခုအထိ batch အဖြစ် စုစည်းကာ fast-gates များနှင့် တိုက်ဆိုင်စစ်ဆေးပြီး merge (squash) လုပ်သည်။ Red ဖြစ်နေသော batch ကို **အလိုအလျောက် နှစ်ပိုင်းခွဲစစ်ဆေးသည်** — ပြဿနာဖြစ်စေသော PR ကို ~log2(N) ကြိမ် ပြန်လည်စစ်ဆေးခြင်းဖြင့် သီးခြားခွဲထုတ်ပြီး queue မှ ဖယ်ရှားကာ ကျန် PR များကို ဆက်လက်လုပ်ဆောင်သည်။
4. Merge ပြီးနောက် continuous release-green workflow သည် push လုပ်ချိန်တွင် tip အသစ်ကို စစ်ဆေးပြီး ပေါင်းစပ်မှုကြောင့် regression ဖြစ်ပါက attribution issue တစ်ခု ဖွင့်ပေးသည် (မည်သည့်အခါမျှ အလိုအလျောက် revert မလုပ်ပါ)။

အကာအကွယ်စည်းမျဉ်းများ (`CLAUDE.md` Hard Rules #21/#22 ကို ထင်ဟပ်ထားသည်):

- **Release freeze ဖွင့်ထားခြင်း** → freeze လုပ်ထားသော branch ကို ပစ်မှတ်ထားသည့် PR များအား label မတပ်ပါနှင့်။ ဦးစွာ အသုံးပြုနေသော `release/vX+1` သို့ retarget လုပ်ပါ။
- **အခြား session တစ်ခု၏ လုပ်ဆောင်ဆဲ PR** → မည်သည့်အခါမျှ label မတပ်ပါနှင့်။ ပိုင်ဆိုင်သော session ကသာ ၎င်း၏ကိုယ်ပိုင်အလုပ်ကို queue ထည့်ရမည်။
- Tests-only diff များနှင့် `hotfix` label တပ်ထားသော PR များသည် လျှော့ချထားသည့် CI ကို လုပ်ဆောင်ပြီးဖြစ်သည် (`RELEASE_CHECKLIST.md` → Hotfix Fast-Lane ကို ကြည့်ပါ)။ Queue ၏ အခြေအနေသတ်မှတ်ချက်များသည် အမှန်တကယ် လုပ်ဆောင်ခဲ့သည့် မည်သည့် check အစုကိုမဆို လက်ခံသည် (`#check-failure=0` + `#check-pending=0`)။

## Fallback: manual merge-train

Queue အသုံးမပြုနိုင်သည့်အခါ အသုံးပြုသည်။ ၎င်းသည် v3.8.47 cycle အတွင်း တစ်ရက်တည်းဖြင့် PR 33 ခုကို ရှင်းလင်းခဲ့သည့် လုပ်ထုံးလုပ်နည်းကို စည်းမျဉ်းအဖြစ် သတ်မှတ်ထားခြင်းဖြစ်သည်။

1. **Batch ကို စုစည်းပါ** (စစ်ဆေးသုံးသပ်ပြီး+အတည်ပြုပြီးသော PR ~10–30 ခု)။ `linked:` collision များ
   (`tap.testFiles` တူညီခြင်း၊ CHANGELOG hunk များ တူညီခြင်း) ကို စစ်ဆေးပြီး ထို PR များကို အစဉ်လိုက် သီးခြားလုပ်ဆောင်ပါ။
2. **တစ်ကြိမ်သာ စစ်ဆေးပါ**: release tip မှ ခွဲထုတ်ထားသည့် သီးခြား worktree တစ်ခုတွင် batch head အားလုံးကို local တွင် merge လုပ်ပြီး release နှင့်ညီမျှသော suite
   (`npm run check:release-green`၊ release မလုပ်မီ `--with-build` ထည့်ပါ) ကို run ပါ။
   `scripts/release/merge-train.sh <base> <PR#>…` သည် အဆင့် 1–2 ကို အလိုအလျောက် လုပ်ဆောင်ပေးသည် (conflict ဖြစ်သော PR များကို ထုတ်ပယ်ပြီး train က ဆက်လက်လုပ်ဆောင်သည်)။ Full mode သည် `npm run test:unit` — box အတွက် ချိန်ညှိထားသော runner (`--test-concurrency=20`) — ကို run သည်။ ၎င်းသည် အစဉ်လိုက်လုပ်ဆောင်သော 4-core CI shard နှစ်ခု **မဟုတ်ပါ**။ ထို shard နှစ်ခုကြောင့် 16-core box တစ်ခု၏ အဓိက phase အသုံးပြုမှုသည် ~25% သာရှိခဲ့သည် (2026-07-18 တွင် ပြင်ဆင်ပြီး)။ `--fast` (တစ်ရက်အတွင်း mega-train များ ရှင်းလင်းရန်၊ owner မှ 2026-07-18 တွင် အတည်ပြုထားသည်) သည် static gate အားလုံး + vitest ကို ဆက်လက် run သော်လည်း train ပေါ်တင်ထားသော PR များကြောင့် ပြောင်းလဲသွားသည့် node:test file များကိုသာ run သည်။ စုစည်းထားသော tip ပေါ်တွင် FULL suite ကို တစ်ရက်လျှင် အနည်းဆုံး တစ်ကြိမ် run ရမည် (`--fast` မပါသော train တစ်ခု)။
3. **Green** → PR များကို အစဉ်လိုက် merge လုပ်ပါ (တစ်ခုစီမလုပ်မီ `state,headRefOid` ကို ပြန်စစ်ပါ — head ပြောင်းသွားသော PR သည် review ထဲသို့ ပြန်ဝင်ရမည်)။ Merge တစ်ခုစီ၏ net diff သည် ထို PR ၏ ကိုယ်ပိုင်ပြောင်းလဲမှုသာဖြစ်ကြောင်း သက်သေပြပါ (auto-resolve revert မလုပ်ရ။ သတ်မှတ်အတိုင်းအတာပြင်ပ ဖျက်မှုများ ရှိမရှိ `git diff --stat` ကို စစ်ဆေးပါ)။
4. **Red** → တစ်ခုချင်းစီ ပြန်လည်စစ်ဆေးမည့်အစား batch ကို ထက်ဝက်စီခွဲ၍ bisect လုပ်ပါ (တစ်ဝက်စီကို စစ်ဆေးပါ)။ ပြဿနာဖြစ်စေသော PR ကို အထောက်အထားနှင့်တကွ review queue သို့ ပြန်ပို့ပါ။
5. **မည်သည့်အခါမျှ မလုပ်ရန်**: freeze ကာလအတွင်း freeze လုပ်ထားသော branch သို့ merge မလုပ်ရ။ မည်သည့်နေရာတွင်မျှ `git stash` မလုပ်ရ။ Red ပျောက်သွားမည်ဟု မျှော်လင့်ပြီး CI ကို အားလုံးပြန် run မလုပ်ရ (စည်းမျဉ်း: red သည် အသုံးဝင်သော အချက်အလက်ဖြစ်သည်)။

## အဆင့်ခွဲခြားခြင်း (fast-gates များသာဖြင့် queue ကို အဘယ်ကြောင့် လုံခြုံစွာ အသုံးပြုနိုင်သနည်း)

- **PR တစ်ခုချင်းစီအလိုက်** (quality.yml fast-gates): TIA သက်ရောက်သည့် test များ + full unit 4-shard +
  vitest + lint အစု + typecheck + docs/changelog ပြည့်စုံမှန်ကန်မှု။
- **Batch/tip တစ်ခုချင်းစီအလိုက်** (continuous release-green): release branch သို့ push တိုင်းတွင် `--quick` HARD gate များ၊ တစ်ရက်လျှင် 3 ကြိမ် full `--with-build --full-ci` sweep များ။
- **Release တစ်ခုချင်းစီအလိုက်** (release PR ပေါ်ရှိ ci.yml): E2E ×9 အပါအဝင် matrix အပြည့်အစုံ၊
  package-artifact + tarball boot-smoke၊ coverage/ratchets။

ယခင်ကထက် လျော့နည်းစွာ စစ်ဆေးသည့်အရာ တစ်ခုမျှ မရှိပါ — အလေးချိန်များသော surface ကို PR တစ်ခုချင်းစီအစား batch/tip တစ်ခုချင်းစီအလိုက် run ခြင်းသာဖြစ်ပြီး ယင်းက O(N) round-trip များကို ဖယ်ရှားပေးခြင်းဖြစ်သည်။
