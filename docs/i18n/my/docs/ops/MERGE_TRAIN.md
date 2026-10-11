# Merge Queue & Manual Merge-Train Runbook (မြန်မာ)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/MERGE_TRAIN.md) · 🇪🇹 [am](../../../am/docs/ops/MERGE_TRAIN.md) · 🇸🇦 [ar](../../../ar/docs/ops/MERGE_TRAIN.md) · 🇦🇿 [az](../../../az/docs/ops/MERGE_TRAIN.md) · 🇧🇬 [bg](../../../bg/docs/ops/MERGE_TRAIN.md) · 🇧🇩 [bn](../../../bn/docs/ops/MERGE_TRAIN.md) · 🇧🇦 [bs](../../../bs/docs/ops/MERGE_TRAIN.md) · 🇨🇿 [cs](../../../cs/docs/ops/MERGE_TRAIN.md) · 🇩🇰 [da](../../../da/docs/ops/MERGE_TRAIN.md) · 🇩🇪 [de](../../../de/docs/ops/MERGE_TRAIN.md) · 🇬🇷 [el](../../../el/docs/ops/MERGE_TRAIN.md) · 🇪🇸 [es](../../../es/docs/ops/MERGE_TRAIN.md) · 🇪🇪 [et](../../../et/docs/ops/MERGE_TRAIN.md) · 🇮🇷 [fa](../../../fa/docs/ops/MERGE_TRAIN.md) · 🇫🇮 [fi](../../../fi/docs/ops/MERGE_TRAIN.md) · 🇫🇷 [fr](../../../fr/docs/ops/MERGE_TRAIN.md) · 🇮🇪 [ga](../../../ga/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [gu](../../../gu/docs/ops/MERGE_TRAIN.md) · 🇳🇬 [ha](../../../ha/docs/ops/MERGE_TRAIN.md) · 🇮🇱 [he](../../../he/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [hi](../../../hi/docs/ops/MERGE_TRAIN.md) · 🇭🇷 [hr](../../../hr/docs/ops/MERGE_TRAIN.md) · 🇭🇺 [hu](../../../hu/docs/ops/MERGE_TRAIN.md) · 🇦🇲 [hy](../../../hy/docs/ops/MERGE_TRAIN.md) · 🇮🇩 [id](../../../id/docs/ops/MERGE_TRAIN.md) · 🇳🇬 [ig](../../../ig/docs/ops/MERGE_TRAIN.md) · 🇮🇹 [it](../../../it/docs/ops/MERGE_TRAIN.md) · 🇯🇵 [ja](../../../ja/docs/ops/MERGE_TRAIN.md) · 🇬🇪 [ka](../../../ka/docs/ops/MERGE_TRAIN.md) · 🇰🇭 [km](../../../km/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [kn](../../../kn/docs/ops/MERGE_TRAIN.md) · 🇰🇷 [ko](../../../ko/docs/ops/MERGE_TRAIN.md) · 🇱🇹 [lt](../../../lt/docs/ops/MERGE_TRAIN.md) · 🇱🇻 [lv](../../../lv/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [ml](../../../ml/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [mr](../../../mr/docs/ops/MERGE_TRAIN.md) · 🇲🇾 [ms](../../../ms/docs/ops/MERGE_TRAIN.md) · 🇲🇹 [mt](../../../mt/docs/ops/MERGE_TRAIN.md) · 🇳🇵 [ne](../../../ne/docs/ops/MERGE_TRAIN.md) · 🇳🇱 [nl](../../../nl/docs/ops/MERGE_TRAIN.md) · 🇳🇴 [no](../../../no/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [or](../../../or/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [pa](../../../pa/docs/ops/MERGE_TRAIN.md) · 🇵🇭 [phi](../../../phi/docs/ops/MERGE_TRAIN.md) · 🇵🇱 [pl](../../../pl/docs/ops/MERGE_TRAIN.md) · 🇵🇹 [pt](../../../pt/docs/ops/MERGE_TRAIN.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/MERGE_TRAIN.md) · 🇷🇴 [ro](../../../ro/docs/ops/MERGE_TRAIN.md) · 🇷🇺 [ru](../../../ru/docs/ops/MERGE_TRAIN.md) · 🇱🇰 [si](../../../si/docs/ops/MERGE_TRAIN.md) · 🇸🇰 [sk](../../../sk/docs/ops/MERGE_TRAIN.md) · 🇸🇮 [sl](../../../sl/docs/ops/MERGE_TRAIN.md) · 🇷🇸 [sr](../../../sr/docs/ops/MERGE_TRAIN.md) · 🇸🇪 [sv](../../../sv/docs/ops/MERGE_TRAIN.md) · 🇰🇪 [sw](../../../sw/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [ta](../../../ta/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [te](../../../te/docs/ops/MERGE_TRAIN.md) · 🇹🇭 [th](../../../th/docs/ops/MERGE_TRAIN.md) · 🇹🇷 [tr](../../../tr/docs/ops/MERGE_TRAIN.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/MERGE_TRAIN.md) · 🇵🇰 [ur](../../../ur/docs/ops/MERGE_TRAIN.md) · 🇺🇿 [uz](../../../uz/docs/ops/MERGE_TRAIN.md) · 🇻🇳 [vi](../../../vi/docs/ops/MERGE_TRAIN.md) · 🇳🇬 [yo](../../../yo/docs/ops/MERGE_TRAIN.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/MERGE_TRAIN.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/MERGE_TRAIN.md)

---

v3.8.49 (quality/velocity အစီအစဉ်၏ WS3.2/WS3.4) မှစ၍ စိစစ်ပြီးသော PR များကို
`release/vX.Y.Z` သို့ ပေါင်းစည်းရန် မူလသတ်မှတ်ထားသည့် လမ်းကြောင်းမှာ **Mergify merge queue**
(`.mergify.yml`) ဖြစ်သည်။ အောက်တွင် မှတ်တမ်းတင်ထားသော **manual merge-train** မှာမူ
အရေးပေါ်ဖြစ်ရပ်များ၊ release freeze ကာလများ၊ သို့မဟုတ် Mergify Open Source အစီအစဉ်
ပြောင်းလဲသွားသည့်အခါ အသုံးပြုရန် အရန်နည်းလမ်း ဖြစ်သည်။

## မူလလမ်းကြောင်း: Mergify queue

1. PR ကို campaigns များက ပြန်လည်သုံးသပ်ပြီး အတည်ပြုချက်ရထားသလို၊ ပိုင်ရှင်၏ merge မလုပ်မီ ⭐
   gate မှလည်း အတည်ပြုထားရမည် (အစီရင်ခံစာ + အချက်တစ်ခုချင်းစီအလိုက် ဆုံးဖြတ်ချက် — `/merge-prs` အဆင့် 0.75 ကိုကြည့်ပါ)။
2. ပိုင်ရှင် (သို့မဟုတ် ပိုင်ရှင်၏ဆုံးဖြတ်ချက်အတိုင်း လုပ်ဆောင်နေသော session) သည် **`queue`**
   label ကို ထည့်သွင်းသည်။ ထို label သည် merge အတည်ပြုချက်ပင်ဖြစ်ပြီး၊ Mergify က ၎င်းကို အကောင်အထည်ဖော်ပေးရုံသာဖြစ်သည်။
3. Mergify သည် queue ထဲရှိ PR များကို fast-gates များနှင့် **တစ်ခုချင်းစီ အစဉ်လိုက်**
   (တစ်ကြိမ်လျှင် တစ်ခု) စစ်ဆေးပြီး merge (squash) လုပ်သည်။ Batching + အလိုအလျောက် bisection သည် အခပေး Mergify tier
   ဖြစ်သည် (အခမဲ့အစီအစဉ်တွင် "Cannot use Merge Queue batch"၊ #7220)၊ ထို့ကြောင့် `.mergify.yml` တွင်
   `batch_size` ကို သတ်မှတ်မထားပါ။ batching သည် အောက်တွင်ဖော်ပြထားသော manual merge-train ၏ တာဝန်အဖြစ် ဆက်ရှိနေသည်။ စစ်ဆေးမှုများသည်
   `checks_timeout` (240 min = `quality.yml` ၏ တိုင်းတာထားသော p95 ထက် 2×) ကျော်လွန်သည့်တိုင် pending ဖြစ်နေသော PR ကို
   queue ပိတ်ဆို့မနေစေရန် queue မှ ထုတ်ပယ်သည်။
4. Merge ပြီးနောက် continuous release-green workflow သည် push လုပ်ချိန်တွင် tip အသစ်ကို စစ်ဆေးပြီး
   ပေါင်းစပ်မှုကြောင့် regression ဖြစ်ပါက attribution issue တစ်ခု ဖွင့်သည် (မည်သည့်အခါမျှ အလိုအလျောက် revert မလုပ်ပါ)။

အကာအကွယ်စည်းမျဉ်းများ (`CLAUDE.md` Hard Rules #21/#22 နှင့် အတူတူဖြစ်သည်):

- **Release freeze ဖွင့်ထားသည်** → freeze လုပ်ထားသော branch ကို ပစ်မှတ်ထားသည့် PR များအား label မတပ်ပါနှင့်။ ပထမဦးစွာ
  အသုံးပြုနေသော `release/vX+1` သို့ retarget လုပ်ပါ။
- **အခြား session တစ်ခု၏ လုပ်ဆောင်ဆဲ PR** → မည်သည့်အခါမျှ label မတပ်ပါနှင့်။ ပိုင်ဆိုင်သော session ကသာ
  ၎င်း၏ကိုယ်ပိုင်အလုပ်ကို queue ထဲသို့ ထည့်ရမည်။
- Tests-only diff များနှင့် `hotfix` label တပ်ထားသော PR များသည် လျှော့ချထားသော CI ကို လုပ်ဆောင်ပြီးဖြစ်သည်
  (`RELEASE_CHECKLIST.md` → Hotfix Fast-Lane ကိုကြည့်ပါ)။ queue condition များသည် အမှန်တကယ်
  လုပ်ဆောင်ခဲ့သော မည်သည့် check set ကိုမဆို လက်ခံသည် (`#check-failure=0` + `#check-pending=0`)။

## အရန်နည်းလမ်း: manual merge-train

Queue ကို အသုံးမပြုနိုင်သည့်အခါ အသုံးပြုသည်။ ဤနည်းလမ်းသည် v3.8.47 စက်ဝန်းအတွင်း
တစ်ရက်တည်းဖြင့် PR 33 ခုကို ရှင်းလင်းနိုင်ခဲ့သော လုပ်ထုံးလုပ်နည်းကို စံသတ်မှတ်ထားခြင်း ဖြစ်သည်။

1. **Batch ကို စုစည်းပါ** (စိစစ်ပြီး+အတည်ပြုထားသော PR ~10–30 ခု)။ `linked:` တိုက်ဆိုင်မှုများ
   (`tap.testFiles` တူခြင်း၊ CHANGELOG hunk များ တူခြင်း) ကို စစ်ဆေးပြီး ၎င်းတို့ကို အစဉ်လိုက် လုပ်ဆောင်ပါ။
2. **တစ်ကြိမ်တည်း စစ်ဆေးပါ**: release tip မှ ခွဲထုတ်ထားသော သီးခြား worktree တစ်ခုတွင် batch
   head အားလုံးကို စက်အတွင်း၌ ပေါင်းစည်းပြီးနောက် release နှင့်ညီမျှသော suite ကို လုပ်ဆောင်ပါ
   (`npm run check:release-green`၊ release မလုပ်မီ `--with-build` ထည့်ပါ)။
   `scripts/release/merge-train.sh <base> <PR#>…` သည် အဆင့် 1–2 ကို အလိုအလျောက်လုပ်ဆောင်ပေးသည်
   (ပဋိပက္ခဖြစ်သော PR များကို ထုတ်ပယ်ပြီး train က ဆက်လက်လုပ်ဆောင်သည်)။ Full mode သည်
   `npm run test:unit` — box အတွက် ချိန်ညှိထားသော runner (`--test-concurrency=20`) ကို လုပ်ဆောင်ပြီး၊
   16-core box တစ်ခု၏ ~25% ဖြင့် အဓိကအဆင့်ကို လုပ်ဆောင်စေခဲ့သော အစဉ်လိုက် 4-core CI shard
   နှစ်ခုကို **မသုံးပါ** (2026-07-18 တွင် ပြင်ဆင်ခဲ့သည်)။ `--fast` (တစ်ရက်အတွင်း mega-train များကို
   ရှင်းလင်းရန်၊ ပိုင်ရှင်က 2026-07-18 တွင် အတည်ပြုထားသည်) သည် static gate အားလုံး + vitest ကို
   ဆက်လက်ထားရှိသော်လည်း train ပေါ်တင်ထားသော PR များက ပြောင်းလဲထားသည့် node:test file များကိုသာ
   လုပ်ဆောင်သည်။ စုစည်းပြီးသား tip ပေါ်တွင် FULL suite ကို တစ်ရက်လျှင် အနည်းဆုံး တစ်ကြိမ်
   (`--fast` မပါသော train တစ်ခု) လုပ်ဆောင်ရမည်။
3. **Green** → PR များကို အစဉ်လိုက် ပေါင်းစည်းပါ (တစ်ခုချင်းစီမတိုင်မီ `state,headRefOid` ကို ပြန်စစ်ပါ —
   head ပြောင်းသွားသော PR သည် review ထဲသို့ ပြန်ဝင်ရမည်)။ Merge တစ်ခုချင်းစီ၏ net diff သည်
   ထို PR ကိုယ်တိုင်၏ ပြောင်းလဲမှုသာဖြစ်ကြောင်း သက်သေပြပါ (အလိုအလျောက်ဖြေရှင်းသည့် revert များ မလုပ်ပါနှင့်။
   သတ်မှတ်နယ်ပယ်ပြင်ပ ဖျက်မှုများရှိမရှိ `git diff --stat` ကို စစ်ဆေးပါ)။
4. **Red** → တစ်ခုချင်းစီ ပြန်စစ်မည့်အစား batch ကို တစ်ဝက်စီခွဲစစ်ပါ (တစ်ဝက်စီကို စစ်ဆေးပါ)။
   ပြဿနာဖြစ်စေသော PR ကို အထောက်အထားနှင့်အတူ review queue သို့ ပြန်ပို့ပါ။
5. **မည်သည့်အခါမျှ မလုပ်ရမည်များ**: freeze ကာလအတွင်း freeze လုပ်ထားသော branch သို့ merge မလုပ်ပါနှင့်။
   မည်သည့်နေရာတွင်မဆို `git stash` မလုပ်ပါနှင့်။ Red ပျောက်သွားမည်ဟု မျှော်လင့်ပြီး CI တစ်ခုလုံးကို
   ပြန်မလုပ်ပါနှင့် (စည်းမျဉ်း: red သည် အသုံးဝင်သော အချက်အလက်ဖြစ်သည်)။

## အဆင့်ခွဲခြားမှု (fast-gates များသာဖြင့် queue ကို လုံခြုံစွာ အသုံးပြုနိုင်သည့်အကြောင်းရင်း)

- **PR တစ်ခုချင်းစီအလိုက်** (quality.yml fast-gates): TIA သက်ရောက်မှုရှိသော စမ်းသပ်မှုများ + full unit 4-shard +
  vitest + lint bag + typecheck + docs/changelog ခိုင်မာမှု။
- **Batch/tip တစ်ခုချင်းစီအလိုက်** (continuous release-green): release branch သို့ push တိုင်းတွင်
  `--quick` HARD gates၊ တစ်ရက်လျှင် 3 ကြိမ် full `--with-build --full-ci` sweep များ။
- **Release တစ်ခုချင်းစီအလိုက်** (release PR ပေါ်ရှိ ci.yml): E2E ×9၊ package-artifact +
  tarball boot-smoke၊ coverage/ratchets အပါအဝင် ပြည့်စုံသော matrix။

ယခင်ကထက် စစ်ဆေးမှုလျော့နည်းသွားခြင်း မရှိပါ — အချိန်နှင့်ရင်းမြစ်များစွာ လိုအပ်သော မျက်နှာပြင်ကို
PR တစ်ခုချင်းစီအလိုက် လုပ်ဆောင်မည့်အစား batch/tip တစ်ခုချင်းစီအလိုက် လုပ်ဆောင်ခြင်းသာဖြစ်ပြီး၊
ထိုနည်းဖြင့် O(N) round-trip များကို ဖယ်ရှားနိုင်သည်။

## `merge-train.sh` အတွက် အသစ် checkout လုပ်ထားချိန် လိုအပ်ချက်များ

Script သည် မည်သည့် worktree အလုပ်ကိုမျှ မစတင်မီ root checkout ပေါ်တွင် အမှားတွေ့သည်နှင့် ချက်ချင်းရပ်သည့်
**preflight** ကို လုပ်ဆောင်သည်။ ထို့ကြောင့် ပျက်နေသော install တစ်ခုကို red train အဖြစ် မှားယွင်းယူဆမိခြင်း
လုံးဝမဖြစ်နိုင်ပါ။

1. `npm ci` ကို လုပ်ဆောင်ပြီးနောက် npm က ပိတ်ဆို့ထားသော `bun` postinstall ကို လုပ်ဆောင်ပါ:
   `(cd node_modules/bun && node install.js)` — ထိုသို့မလုပ်ပါက `check:provider-consistency`
   နှင့် `check:known-symbols` (`bun scripts/…` နှစ်ခုစလုံး) သည် train နှင့် base နှစ်ခုစလုံးတွင်
   ချိုးဖောက်မှုဖော်ပြသည့် line မရှိဘဲ fail ဖြစ်မည်။
2. အပို `node_modules/node_modules` မရှိရပါ (dependency tree ပွားနေခြင်းဖြစ်ပြီး React ကို နှစ်ကြိမ်
   load လုပ်မိသဖြင့် UI vitest suite များ ချက်ချင်း fail ဖြစ်သည်)။
3. `node_modules/.bin/tsc` ရှိပြီး executable ဖြစ်ရမည် (မပြည့်စုံသော install တွင် ၎င်းမပါရှိပါ)။

Train သည် ပိတ်ဆို့မှုဖြစ်စေသော `npm run check:cycles:ratchet` ကို လုပ်ဆောင်သည်။ သီးသန့်
`npm run check:cycles` သည် အကြံပြုချက်ပေးရန်သာ ဖြစ်သည် (၎င်းသည် SCC များကို စာရင်းပြုစုပြီး
ကျန်းမာသော base ပေါ်တွင်ပင် non-zero ဖြင့် ထွက်သည်)။
