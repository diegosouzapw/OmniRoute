# Release-Green: keeping the queue and release branch green (မြန်မာ)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/RELEASE_GREEN.md) · 🇪🇹 [am](../../../am/docs/ops/RELEASE_GREEN.md) · 🇸🇦 [ar](../../../ar/docs/ops/RELEASE_GREEN.md) · 🇦🇿 [az](../../../az/docs/ops/RELEASE_GREEN.md) · 🇧🇬 [bg](../../../bg/docs/ops/RELEASE_GREEN.md) · 🇧🇩 [bn](../../../bn/docs/ops/RELEASE_GREEN.md) · 🇨🇿 [cs](../../../cs/docs/ops/RELEASE_GREEN.md) · 🇩🇰 [da](../../../da/docs/ops/RELEASE_GREEN.md) · 🇩🇪 [de](../../../de/docs/ops/RELEASE_GREEN.md) · 🇬🇷 [el](../../../el/docs/ops/RELEASE_GREEN.md) · 🇪🇸 [es](../../../es/docs/ops/RELEASE_GREEN.md) · 🇪🇪 [et](../../../et/docs/ops/RELEASE_GREEN.md) · 🇮🇷 [fa](../../../fa/docs/ops/RELEASE_GREEN.md) · 🇫🇮 [fi](../../../fi/docs/ops/RELEASE_GREEN.md) · 🇫🇷 [fr](../../../fr/docs/ops/RELEASE_GREEN.md) · 🇮🇪 [ga](../../../ga/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [gu](../../../gu/docs/ops/RELEASE_GREEN.md) · 🇳🇬 [ha](../../../ha/docs/ops/RELEASE_GREEN.md) · 🇮🇱 [he](../../../he/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [hi](../../../hi/docs/ops/RELEASE_GREEN.md) · 🇭🇷 [hr](../../../hr/docs/ops/RELEASE_GREEN.md) · 🇭🇺 [hu](../../../hu/docs/ops/RELEASE_GREEN.md) · 🇦🇲 [hy](../../../hy/docs/ops/RELEASE_GREEN.md) · 🇮🇩 [id](../../../id/docs/ops/RELEASE_GREEN.md) · 🇳🇬 [ig](../../../ig/docs/ops/RELEASE_GREEN.md) · 🇮🇹 [it](../../../it/docs/ops/RELEASE_GREEN.md) · 🇯🇵 [ja](../../../ja/docs/ops/RELEASE_GREEN.md) · 🇬🇪 [ka](../../../ka/docs/ops/RELEASE_GREEN.md) · 🇰🇭 [km](../../../km/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [kn](../../../kn/docs/ops/RELEASE_GREEN.md) · 🇰🇷 [ko](../../../ko/docs/ops/RELEASE_GREEN.md) · 🇱🇹 [lt](../../../lt/docs/ops/RELEASE_GREEN.md) · 🇱🇻 [lv](../../../lv/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [ml](../../../ml/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [mr](../../../mr/docs/ops/RELEASE_GREEN.md) · 🇲🇾 [ms](../../../ms/docs/ops/RELEASE_GREEN.md) · 🇲🇹 [mt](../../../mt/docs/ops/RELEASE_GREEN.md) · 🇳🇵 [ne](../../../ne/docs/ops/RELEASE_GREEN.md) · 🇳🇱 [nl](../../../nl/docs/ops/RELEASE_GREEN.md) · 🇳🇴 [no](../../../no/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [or](../../../or/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [pa](../../../pa/docs/ops/RELEASE_GREEN.md) · 🇵🇭 [phi](../../../phi/docs/ops/RELEASE_GREEN.md) · 🇵🇱 [pl](../../../pl/docs/ops/RELEASE_GREEN.md) · 🇵🇹 [pt](../../../pt/docs/ops/RELEASE_GREEN.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/RELEASE_GREEN.md) · 🇷🇴 [ro](../../../ro/docs/ops/RELEASE_GREEN.md) · 🇷🇺 [ru](../../../ru/docs/ops/RELEASE_GREEN.md) · 🇱🇰 [si](../../../si/docs/ops/RELEASE_GREEN.md) · 🇸🇰 [sk](../../../sk/docs/ops/RELEASE_GREEN.md) · 🇸🇮 [sl](../../../sl/docs/ops/RELEASE_GREEN.md) · 🇷🇸 [sr](../../../sr/docs/ops/RELEASE_GREEN.md) · 🇸🇪 [sv](../../../sv/docs/ops/RELEASE_GREEN.md) · 🇰🇪 [sw](../../../sw/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [ta](../../../ta/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [te](../../../te/docs/ops/RELEASE_GREEN.md) · 🇹🇭 [th](../../../th/docs/ops/RELEASE_GREEN.md) · 🇹🇷 [tr](../../../tr/docs/ops/RELEASE_GREEN.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/RELEASE_GREEN.md) · 🇵🇰 [ur](../../../ur/docs/ops/RELEASE_GREEN.md) · 🇺🇿 [uz](../../../uz/docs/ops/RELEASE_GREEN.md) · 🇻🇳 [vi](../../../vi/docs/ops/RELEASE_GREEN.md) · 🇳🇬 [yo](../../../yo/docs/ops/RELEASE_GREEN.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/RELEASE_GREEN.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/RELEASE_GREEN.md)

---

## ဤအရာက ဖြေရှင်းပေးသည့် ပြဿနာ

**full gate** (`.github/workflows/ci.yml` — unit shards၊ vitest၊ ratchets၊
`package-artifact`၊ SonarQube၊ E2E) သည် **release PR** (PR → `main`) တွင်သာ run ပါသည်။ `release/**`
ကို target လုပ်သည့် PR များသည် **fast-gates** (`quality.yml`: TIA သက်ရောက်မှုရှိသော tests + typecheck + lint)
ကို ရရှိပြီး၊ code အပြောင်းအလဲများအတွက် **အကြံပြုချက်သဘောသာဖြစ်သော** production build ကိုလည်း ရရှိပါသည်။
အကျိုးဆက်အနေဖြင့် release တွင်သာ ပေါ်လာသော red များသည် release branch ပေါ်တွင် တိတ်တဆိတ်
စုလာနိုင်ပြီး၊ release လုပ်ချိန်တွင် **တစ်ကြိမ်လျှင် ~40 min ကြာသော အလွှာများအဖြစ် ပေါက်ကွဲ**
လာနိုင်ပါသည်။

"release-green family" သည် ထို red များကို **ကြိုတင်ခန့်မှန်းရန်** ရှိနေခြင်းဖြစ်သည် — full
gate နှင့် ညီမျှသော validation ကို အချိန်မရွေး **local တွင် / release ပြင်ပတွင်** ပြုလုပ်နိုင်သဖြင့် release PR သည်
ပထမဆုံး CI run ကတည်းက green ဖြစ်နေစေပါသည်။

> **မညှိနှိုင်းနိုင်သော အခြေခံမူ:** ဤအရာများထဲမှ မည်သည့်အရာကမျှ contributor ကို မတားဆီးပါ။ ၎င်းတို့၏
> PR ကို fail ဖြစ်စေမည့် required check ကို ကျွန်ုပ်တို့ မထည့်ပါ။ **drift** (ratchets) သည် release လုပ်ချိန်တွင် maintainer က rebaseline
> လုပ်ရန်အတွက်သာဖြစ်ပြီး — contributor က စိုးရိမ်ရမည့်ကိစ္စ မဟုတ်ပါ။ မည်သည့်အစိတ်အပိုင်းကမျှ PR ကို **ပိတ်ခြင်း**
> (credit theft) မပြုသကဲ့သို့ pass ဖြစ်စေရန် test တစ်ခုကို **အားလျော့စေခြင်း** လည်း မပြုပါ။

## အစုအဖွဲ့ (အစိတ်အပိုင်း 4 ခု) — တစ်ခုချင်းစီကို သီးခြား run ပုံ

| အစိတ်အပိုင်း                                                               | ၎င်းက ဘာလဲ                                                                                  | မည်သည့်အချိန်တွင် run ရမည်                                           | အကျုံးဝင်မှု                            |
| -------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------- | -------------------------------------------------------------------- | --------------------------------------- |
| **`/green-prs`** (Solution A)                                              | maintainer က **ဖွင့်ထားသော PR များ၏ queue** ကို လိုအပ်သည့်အချိန်တွင် scan လုပ်ခြင်း         | **သီးခြား၊ အခါအားလျော်စွာ** — အထူးသဖြင့် `/generate-release` မလုပ်မီ | PR queue တစ်ခုလုံး → `release/**`       |
| **`/validate-release-green`** (Solution C — `npm run check:release-green`) | Validation engine: branch သို့မဟုတ် merge candidate ကို full gate နှင့်အညီ ပြန်လည်စစ်ဆေးသည် | သီးခြား၊ အချိန်မရွေး                                                 | သတ်မှတ်ထားသော branch သို့မဟုတ် merge-PR |
| **`/babysit <PR#>`**                                                       | PR **တစ်ခု** ၏ **live CI** ကို green ဖြစ်သည်အထိ မောင်းနှင်ပေးသည်                            | PR တစ်ခုချင်းအလိုက် သီးခြား                                          | PR တစ်ခုတည်း                            |
| **`nightly-release-green.yml`** (Solution D)                               | အလိုအလျောက် nightly workflow; HARD red ဖြစ်လျှင် issue ဖွင့်သည်                             | အလိုအလျောက် (cron)                                                   | လက်ရှိအသုံးပြုနေသော release branch      |

**"ဒါက release များအတွက်ပဲလား?" ဟူသည့်မေးခွန်းအတွက် အဖြေတို:** **မဟုတ်ပါ။** `/green-prs` ကို
**release များကြားတွင် အခါအားလျော်စွာ** run ရန် ဒီဇိုင်းရေးဆွဲထားသည်။ သီးခြား run ခြင်းသည် ပုံမှန်အသုံးပြုပုံဖြစ်ပြီး —
release သည် ၎င်းကို run ခြင်းမှ တန်ဖိုးအများဆုံး ရရှိသည့် အချိန်သာ ဖြစ်ပါသည်။

## PR မှ release သို့ အကြံပြု build

`quality.yml` တွင် ယခုအခါ draft မဟုတ်သော code PR များနှင့် Mergify queue branch များအတွက် `Build (advisory)` ပါဝင်လာပါသည်။
၎င်းသည် `ci.yml` ရှိ production build လုပ်ငန်းစဉ်ဖြစ်သော Node 24၊ `npm-ci-retry`၊
`check:node-runtime` နှင့် `OMNIROUTE_USE_TURBOPACK=1` ဖြင့် `npm run build` တို့ကို အလားတူ လုပ်ဆောင်ပါသည်။ ဤ workflow တွင် downstream quality job တစ်ခုမျှ build artifact ကို အသုံးမပြုသောကြောင့်
build artifact ကို ရည်ရွယ်ချက်ရှိရှိ upload မလုပ်ပါ။
တည်ငြိမ်သော release-PR run များကို တစ်ပတ်ကြာ လုပ်ဆောင်ပြီးနောက် `continue-on-error` ကို ဖယ်ရှားပါ။ ထိုသို့ဖြင့် ဤ signal သည်
PR မှ release သို့ blocking gate တစ်ခု ဖြစ်လာပါမည်။

## ဖြေရှင်းချက် C — `npm run check:release-green` (အင်ဂျင်)

လက်ရှိ working tree အပေါ်တွင် release နှင့်ညီမျှသော validation ကို ပြန်လည်လုပ်ဆောင်ပြီး red တစ်ခုချင်းစီကို အမျိုးအစားခွဲသည်-

- **HARD** (typecheck၊ lint error များ၊ unit၊ vitest၊ db-rules၊ public-creds၊ ရွေးချယ်နိုင်သော
  `package-artifact`) → **တကယ့် defect**; `exit 1`။ Source branch ပေါ်တွင် ပြင်ဆင်သည် (TDD၊ Rule #18)။
- **DRIFT** (eslint **warning များ**၊ cognitive-complexity၊ file-size) → cycle အတွင်း စုပုံလာသော ratchet drift ဖြစ်ပြီး
  **contributor ၏ အပြစ်မဟုတ်ပါ**; ၎င်းကို report သာလုပ်ပြီး **release လုပ်ချိန်တွင် maintainer က rebaseline လုပ်သည်**။
  Drift သည် exit code ကို **မည်သည့်အခါမျှ** မပြောင်းလဲပါ — ထို့ကြောင့် မည်သူ့ကိုမျှ ဘယ်တော့မှ မတားဆီးပါ။

```bash
npm run check:release-green                 # လက်ရှိ branch (working tree)
node scripts/quality/validate-release-green.mjs --json   # ဖွဲ့စည်းတည်ဆောက်ထားသော output
node scripts/quality/validate-release-green.mjs --quick  # unit+vitest ကို ကျော်သည် (drift+typecheck+lint သာ)
node scripts/quality/validate-release-green.mjs --with-build  # package-artifact ပါဝင်သည် (နှေးသည်)
```

ရောဂါရှာဖွေပြီး **report** သာလုပ်သည် (အလိုအလျောက်ပြင်ဆင်ခြင်း မရှိပါ)။ Green ဖြစ်အောင် ပြင်ဆင်သည့် orchestration သည်
`/green-prs` နှင့် `/review-prs` တွင် ရှိသည်။

## ဖြေရှင်းချက် A — `/green-prs` (queue scan)

လုပ်ထုံးလုပ်နည်း (အကျဉ်းချုပ် — အသေးစိတ်အတွက် `green-prs` skill ကို ကြည့်ပါ)-

1. Active release branch နှင့် ဆက်စပ်သော ဖွင့်ထားသည့် PR များ၏ queue ကို **စာရင်းပြုစုပါ**။
2. PR တစ်ခုချင်းစီကို **triage လုပ်ပါ** (viable / reject-worthy / needs-author) — reject/needs-author များကို
   **report သာလုပ်ပြီး ပိတ်မထားပါ** (author က ဆုံးဖြတ်သည်)။
3. Viable PR တစ်ခုချင်းစီအတွက် **သီးခြား worktree** (Rule #19) တစ်ခုအတွင်း PR ကို release tip သို့ ယူဆောင်ပြီး
   `npm run check:release-green` ကို run ပါ-
   - **HARD** → co-authorship မှတစ်ဆင့် **contributor ၏ branch ပေါ်တွင်** ပြင်ဆင်ပါ (author ၏ "Merged" status ကို ထိန်းသိမ်းပေးသည်)၊
     HARD အားလုံး ရှင်းလင်းသွားသည်အထိ ပြန် run ပါ။
   - **DRIFT** → မပြင်ဘဲထားပါ; release လုပ်ချိန်တွင် rebaseline လုပ်ပါမည်။
4. PR × (verdict၊ HARD red များ၊ ပြင်ဆင်ပြီးပြီလား?၊ DRIFT၊ ယခု release-green ဖြစ်ပြီလား?) ဇယားကို **report လုပ်ပါ**။

Merge မလုပ်ဘဲ queue ကို **ပြင်ဆင်နိုင်သည်**; အတိအလင်း တောင်းဆိုသည့်အခါမှသာ merge လုပ်ပြီး — PR ကို မည်သည့်အခါမျှ မပိတ်ပါ။

## အကြံပြုထားသော လုပ်ဆောင်ချိန်ဇယား

- **`/green-prs` ကို အခါအားလျော်စွာ** (ဥပမာ အပတ်စဉ်) run ပြီး **`/generate-release` မတိုင်မီ အမြဲတမ်း**
  run ပါ။
- **`nightly-release-green.yml`** (ဖြေရှင်းချက် D) ကို စဉ်ဆက်မပြတ် signal အဖြစ် ထိန်းသိမ်းထားပါ- ၎င်းက
  HARD red issue တစ်ခုကို ဖွင့်လိုက်သောအခါ scan လုပ်ရမည့်အချိန် ဖြစ်သည်။
- Branch တစ်ခု သို့မဟုတ် သီးခြား merge candidate တစ်ခုကို စစ်ဆေးရန် **`/validate-release-green`** ကို လိုအပ်သလို အသုံးပြုပါ။
- သီးခြား PR တစ်ခုကို live CI တွင် green ဖြစ်သည်အထိ ဆောင်ရွက်ပေးရန် လိုအပ်သည့်အခါ **`/babysit <PR#>`** ကို အသုံးပြုပါ။

## Release နှင့် ဆက်နွှယ်ပုံ

- `/generate-release` သည် **Phase 0 (pre-flight)** တွင် validation ကို ခေါ်သည်- release PR ကို မဖွင့်မီ DRIFT ကို rebaseline လုပ်ပြီး
  HARD ကို ပြင်ဆင်သည်။
- `/review-prs` သည် merge ဆုံးဖြတ်ချက်အဆင့်တွင် release-green gate ကို အသုံးပြုသည် (merge မလုပ်မီ green ဖြစ်ရမည်)။

အစိတ်အပိုင်းအားလုံး၏ ရည်ရွယ်ချက်မှာ အတူတူပင်ဖြစ်သည်- release လုပ်သည့်နေ့တွင် မိနစ် ၄၀ ကြာသော layer များတစ်လျှောက်
red များကို လိုက်လံဖြေရှင်းနေမည့်အစား **ပထမဆုံး CI run မှာပင် green ဖြစ်သော release PR တစ်ခု** ရရှိရန်ဖြစ်သည်။
