# RTK Compression (မြန်မာ)

🌐 **Languages:** 🇺🇸 [English](../../../../compression/RTK_COMPRESSION.md) · 🇪🇹 [am](../../../am/docs/compression/RTK_COMPRESSION.md) · 🇸🇦 [ar](../../../ar/docs/compression/RTK_COMPRESSION.md) · 🇦🇿 [az](../../../az/docs/compression/RTK_COMPRESSION.md) · 🇧🇬 [bg](../../../bg/docs/compression/RTK_COMPRESSION.md) · 🇧🇩 [bn](../../../bn/docs/compression/RTK_COMPRESSION.md) · 🇨🇿 [cs](../../../cs/docs/compression/RTK_COMPRESSION.md) · 🇩🇰 [da](../../../da/docs/compression/RTK_COMPRESSION.md) · 🇩🇪 [de](../../../de/docs/compression/RTK_COMPRESSION.md) · 🇬🇷 [el](../../../el/docs/compression/RTK_COMPRESSION.md) · 🇪🇸 [es](../../../es/docs/compression/RTK_COMPRESSION.md) · 🇪🇪 [et](../../../et/docs/compression/RTK_COMPRESSION.md) · 🇮🇷 [fa](../../../fa/docs/compression/RTK_COMPRESSION.md) · 🇫🇮 [fi](../../../fi/docs/compression/RTK_COMPRESSION.md) · 🇫🇷 [fr](../../../fr/docs/compression/RTK_COMPRESSION.md) · 🇮🇪 [ga](../../../ga/docs/compression/RTK_COMPRESSION.md) · 🇮🇳 [gu](../../../gu/docs/compression/RTK_COMPRESSION.md) · 🇳🇬 [ha](../../../ha/docs/compression/RTK_COMPRESSION.md) · 🇮🇱 [he](../../../he/docs/compression/RTK_COMPRESSION.md) · 🇮🇳 [hi](../../../hi/docs/compression/RTK_COMPRESSION.md) · 🇭🇷 [hr](../../../hr/docs/compression/RTK_COMPRESSION.md) · 🇭🇺 [hu](../../../hu/docs/compression/RTK_COMPRESSION.md) · 🇦🇲 [hy](../../../hy/docs/compression/RTK_COMPRESSION.md) · 🇮🇩 [id](../../../id/docs/compression/RTK_COMPRESSION.md) · 🇳🇬 [ig](../../../ig/docs/compression/RTK_COMPRESSION.md) · 🇮🇹 [it](../../../it/docs/compression/RTK_COMPRESSION.md) · 🇯🇵 [ja](../../../ja/docs/compression/RTK_COMPRESSION.md) · 🇬🇪 [ka](../../../ka/docs/compression/RTK_COMPRESSION.md) · 🇰🇭 [km](../../../km/docs/compression/RTK_COMPRESSION.md) · 🇮🇳 [kn](../../../kn/docs/compression/RTK_COMPRESSION.md) · 🇰🇷 [ko](../../../ko/docs/compression/RTK_COMPRESSION.md) · 🇱🇹 [lt](../../../lt/docs/compression/RTK_COMPRESSION.md) · 🇱🇻 [lv](../../../lv/docs/compression/RTK_COMPRESSION.md) · 🇮🇳 [ml](../../../ml/docs/compression/RTK_COMPRESSION.md) · 🇮🇳 [mr](../../../mr/docs/compression/RTK_COMPRESSION.md) · 🇲🇾 [ms](../../../ms/docs/compression/RTK_COMPRESSION.md) · 🇲🇹 [mt](../../../mt/docs/compression/RTK_COMPRESSION.md) · 🇳🇵 [ne](../../../ne/docs/compression/RTK_COMPRESSION.md) · 🇳🇱 [nl](../../../nl/docs/compression/RTK_COMPRESSION.md) · 🇳🇴 [no](../../../no/docs/compression/RTK_COMPRESSION.md) · 🇮🇳 [or](../../../or/docs/compression/RTK_COMPRESSION.md) · 🇮🇳 [pa](../../../pa/docs/compression/RTK_COMPRESSION.md) · 🇵🇭 [phi](../../../phi/docs/compression/RTK_COMPRESSION.md) · 🇵🇱 [pl](../../../pl/docs/compression/RTK_COMPRESSION.md) · 🇵🇹 [pt](../../../pt/docs/compression/RTK_COMPRESSION.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/compression/RTK_COMPRESSION.md) · 🇷🇴 [ro](../../../ro/docs/compression/RTK_COMPRESSION.md) · 🇷🇺 [ru](../../../ru/docs/compression/RTK_COMPRESSION.md) · 🇱🇰 [si](../../../si/docs/compression/RTK_COMPRESSION.md) · 🇸🇰 [sk](../../../sk/docs/compression/RTK_COMPRESSION.md) · 🇸🇮 [sl](../../../sl/docs/compression/RTK_COMPRESSION.md) · 🇷🇸 [sr](../../../sr/docs/compression/RTK_COMPRESSION.md) · 🇸🇪 [sv](../../../sv/docs/compression/RTK_COMPRESSION.md) · 🇰🇪 [sw](../../../sw/docs/compression/RTK_COMPRESSION.md) · 🇮🇳 [ta](../../../ta/docs/compression/RTK_COMPRESSION.md) · 🇮🇳 [te](../../../te/docs/compression/RTK_COMPRESSION.md) · 🇹🇭 [th](../../../th/docs/compression/RTK_COMPRESSION.md) · 🇹🇷 [tr](../../../tr/docs/compression/RTK_COMPRESSION.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/compression/RTK_COMPRESSION.md) · 🇵🇰 [ur](../../../ur/docs/compression/RTK_COMPRESSION.md) · 🇺🇿 [uz](../../../uz/docs/compression/RTK_COMPRESSION.md) · 🇻🇳 [vi](../../../vi/docs/compression/RTK_COMPRESSION.md) · 🇳🇬 [yo](../../../yo/docs/compression/RTK_COMPRESSION.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/compression/RTK_COMPRESSION.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/compression/RTK_COMPRESSION.md)

---

RTK compression သည် terminal နှင့် tool output များအတွက် OmniRoute ၏ command-aware compression engine ဖြစ်သည်။ ၎င်းကို context တိုးပွားမှုအများစုသည် test log များ၊ build output၊ package manager ဆိုင်ရာ မလိုအပ်သော output များ၊ shell transcript များ၊ Docker output၊ git output နှင့် stack trace များမှ ဖြစ်ပေါ်လာသည့် coding-agent session များအတွက် ဒီဇိုင်းပြုလုပ်ထားသည်။

RTK ကို `defaultMode: "rtk"` ဖြင့် တိုက်ရိုက်အသုံးပြုနိုင်သကဲ့သို့ stacked pipeline တစ်ခု၏ ပထမအဆင့်အဖြစ်လည်း အသုံးပြုနိုင်ပြီး ပုံမှန်အားဖြင့် အောက်ပါအတိုင်းဖြစ်သည်။

```txt
rtk -> caveman
```

ဤအစီအစဉ်သည် မလိုအပ်သော machine output များကို ဦးစွာချုံ့ပြီးနောက် ကျန်ရှိသော စာသားများကို Caveman က ထပ်မံကျစ်လျစ်စေသည်။

မူရင်း RTK က command-output အတွက် `60-90%` ချွေတာနိုင်ကြောင်း ဖော်ပြထားသည်။ ၎င်း၏ README နမူနာ session တွင် ပုံမှန် token `~118,000` မှ RTK token `~23,900` သို့ လျော့ကျသွားပြီး `79.7%` (`~80%`) ချွေတာနိုင်သည်။ OmniRoute သည် Caveman input compression နှင့် တွဲဖက်ထားသော savings တွက်ချက်မှုအတွက် မူရင်း RTK ၏ ပျမ်းမျှတန်ဖိုးကို အသုံးပြုသည်။

```txt
RTK ပျမ်းမျှ:       80% ချွေတာမှု
Caveman input:     46% ချွေတာမှု
တွဲဖက်အသုံးပြုမှု:  1 - (1 - 0.80) * (1 - 0.46) = 89.2% ချွေတာမှု
အပိုင်းအခြား:       1 - (1 - 0.60..0.90) * (1 - 0.46) = 78.4-94.6%
```

## ချုံ့ပေးသည့်အရာများ

လက်ရှိ built-in catalog တွင် အောက်ပါအမျိုးအစားများအလိုက် filter 49 ခု ပါဝင်သည်။

| အမျိုးအစား | ဥပမာများ                                                        |
| ---------- | --------------------------------------------------------------- |
| `git`      | `git status`, `git branch`, `git diff`, `git log`               |
| `test`     | Vitest၊ Jest၊ Pytest၊ Playwright၊ Go test များ၊ Cargo test များ |
| `build`    | TypeScript၊ ESLint၊ Biome၊ Prettier၊ Vite၊ Webpack၊ Turbo၊ Nx   |
| `package`  | `npm install`, `npm audit`, `pip`, `uv sync`, Poetry၊ Bundler   |
| `shell`    | `ls`, `find`, `grep`, ယေဘုယျ shell log များ                     |
| `docker`   | `docker ps`, Docker log များ                                    |
| `infra`    | Terraform၊ OpenTofu၊ `systemctl status`                         |
| `generic`  | JSON output၊ stack trace များ၊ ယေဘုယျ output fallback           |

`open-sse/services/compression/engines/rtk/commandDetector.ts` ရှိ detector သည် filter မရွေးချယ်မီ output ကို အမျိုးအစားခွဲခြားသည်။ Command အမျိုးအစားတစ်ခုတည်းဖြင့် မလုံလောက်သည့်အခါ filter များသည် command pattern သို့မဟုတ် output regex ဖြင့်လည်း ကိုက်ညီမှုရှာနိုင်သည်။

## Filter ရွေးချယ်ဖြေရှင်းပုံ

RTK သည် filter များကို အောက်ပါအစီအစဉ်အတိုင်း load လုပ်သည်။

1. ယုံကြည်ထားသည့်အခါမှသာ `.rtk/filters.toml` နှင့် `.rtk/filters.json` မှ project filter များ။
2. `DATA_DIR/rtk/filters.toml` နှင့် `DATA_DIR/rtk/filters.json` မှ global filter များ။
3. `open-sse/services/compression/engines/rtk/filters/` မှ built-in filter များ။

Scope တစ်ခုတည်းအတွင်း RTK TOML schema v1 filter များသည် OmniRoute JSON filter များထက် ဦးစားပေးခံရသည်။ တင်သွင်းထားသော command-specific filter တစ်ခုက ထို scope ရှိ ပိုမိုကျယ်ပြန့်သော filter ကို override လုပ်နိုင်စေရန် TOML `match_command` expression များကို command-type ကိုက်ညီမှုမတိုင်မီ စစ်ဆေးသည်။ File format မည်သို့ပင်ဖြစ်စေ project scope သည် global scope ထက် ဦးစားပေးခံရဆဲဖြစ်သည်။

Regex filter များသည် tool output ကို agent များထံ ပြသပုံအား ပြောင်းလဲနိုင်သောကြောင့် project filter များကို ရည်ရွယ်ချက်ရှိရှိ trust-gate ဖြင့် ကန့်သတ်ထားသည်။ အောက်ပါအခြေအနေများထဲမှ တစ်ခုမှန်ကန်ပါက project filter file ကို လက်ခံသည်။

- `rtkConfig.trustProjectFilters` သည် `true` ဖြစ်သည်။
- `OMNIROUTE_RTK_TRUST_PROJECT_FILTERS=1` ကို သတ်မှတ်ထားသည်။
- `.rtk/trust.json` တွင် project filter file နှင့် ကိုက်ညီသော SHA-256 hash ပါဝင်သည်။

Trust file ဥပမာ-

```json
{
  "filtersSha256": "0123456789abcdef...",
  "filtersTomlSha256": "fedcba9876543210..."
}
```

Hash များသည် သီးခြားစီဖြစ်သည်။ `filtersSha256` သည် `.rtk/filters.json` ကို ယုံကြည်မှုပေးပြီး `filtersTomlSha256` သည် `.rtk/filters.toml` ကို ယုံကြည်မှုပေးသည်။ File တစ်ခုခုကို ပြင်ဆင်ပါက ၎င်းနှင့်သက်ဆိုင်သော trust entry တစ်ခုတည်းသာ အကျုံးမဝင်တော့ပါ။ Global file များကို administrator က install လုပ်ထားပြီး လက်ရှိ global-filter trust လုပ်ဆောင်ပုံကို အသုံးပြုသည်။

Custom filter များသည် filter object တစ်ခု သို့မဟုတ် filter object များပါဝင်သော array တစ်ခု ဖြစ်နိုင်သည်။ မမှန်ကန်သော custom filter များကို ကျော်သွားပြီး `/api/context/rtk/filters` diagnostics မှတစ်ဆင့် အစီရင်ခံသည်။ မမှန်ကန်သော built-in filter များသည် ချက်ချင်းရပ်တန့်ကာ error ပြသည်။

## RTK TOML schema v1 နှင့် ကိုက်ညီမှု

OmniRoute သည် RTK TOML schema v1 ကို အသုံးပြုထားသော ကြေညာသတ်မှတ်ပုံစံ filter ဖိုင်များကို parse လုပ်ခြင်း၊ စစ်ဆေးအတည်ပြုခြင်း၊ စမ်းသပ်ခြင်းနှင့် ထည့်သွင်းခြင်းတို့ ပြုလုပ်နိုင်သည်။
ပံ့ပိုးထားသော field များမှာ `description`, `match_command`, `strip_ansi`, `filter_stderr`,
`strip_lines_matching`, `keep_lines_matching`, `replace`, `match_output`, `truncate_lines_at`,
`head_lines`, `tail_lines`, `max_lines`, `on_empty` နှင့် `[[tests.<filter>]]` inline test များ ဖြစ်သည်။
မသိရှိသော field များ၊ မမှန်ကန်သော သို့မဟုတ် ဘေးကင်းမှုမရှိသော regular expression များ၊ strip/keep rule များကို တစ်ပြိုင်နက် အသုံးပြုခြင်း၊
1 MiB ထက်ကြီးသော ဖိုင်များနှင့် မသိရှိသော filter များကို ရည်ညွှန်းခြင်းတို့ကို လက်မခံပါ။ Inline test များ မအောင်မြင်သော ဖိုင်ကို
စစ်ဆေးကြည့်ရှုရန်အတွက် အတည်ပြုနိုင်သော်လည်း ထည့်သွင်းခြင်း သို့မဟုတ် load လုပ်ခြင်း မပြုနိုင်ပါ။ စိတ်ကြိုက်ဖိုင်ကို load လုပ်ရာတွင် မအောင်မြင်ပါက
fail-open အတိုင်း ဆက်လက်လုပ်ဆောင်သည်၊ ဆိုလိုသည်မှာ မမှန်ကန်သောဖိုင်ကို ကျော်သွားပြီး ကျန် filter များ ဆက်လက်အလုပ်လုပ်သည်။

Client က tool output ကို ဖမ်းယူပြီးနောက်မှသာ OmniRoute က လက်ခံရရှိသောကြောင့် `filter_stderr = true` သည်
process capture ကို ပြောင်းလဲနိုင်ခြင်းမရှိပါ။ ဤ field ကို မည်သည့်လုပ်ဆောင်ချက်မျှမရှိသော no-op အဖြစ် လက်ခံပြီး စစ်ဆေးအတည်ပြုမှုက သတိပေးချက်တစ်ခု ပြန်ပေးသည်။
ဤအရာကို RTK executable၊ shell hook များ၊ Rust command အကောင်အထည်ဖော်မှုများ သို့မဟုတ် ၎င်း၏ trust-store ဖွဲ့စည်းပုံတို့နှင့် အပြည့်အဝကိုက်ညီမှုဟု မဆိုဘဲ
ရည်ရွယ်ချက်ရှိရှိ **RTK TOML schema v1 compatibility** ဟု ဖော်ပြထားသည်။

Dashboard ၏ အဆင့်မြင့် RTK view သည် paste လုပ်ထားသော သို့မဟုတ် upload လုပ်ထားသော TOML ကို လက်ခံသည်။ စစ်ဆေးအတည်ပြုခြင်းသည် read-only ဖြစ်သည်။
ထည့်သွင်းခြင်းက `DATA_DIR/rtk/filters.toml` ကို ကန့်သတ်ထားသော permission များဖြင့် atomic ပုံစံ ရေးသားပြီး
restart လုပ်ရန်မလိုဘဲ လက်ရှိ filter catalog ကို ပြန်လည်အသစ်ပြုလုပ်သည်။ ရှိပြီးသားဖိုင်ကို အစားထိုးရန် တိကျရှင်းလင်းသော `overwrite`
အတည်ပြုချက် လိုအပ်ပြီး ဦးစွာ `DATA_DIR/rtk/filters.toml.bak` ကို ဖန်တီးသည်။

## Filter DSL

Filter များသည် [Compression Rules Format](./COMPRESSION_RULES_FORMAT.md) တွင် ဖော်ပြထားသော JSON schema ကို အသုံးပြုသည်။
Runtime သည် အောက်ပါအဆင့်များကို အစဉ်လိုက် အသုံးချသည်-

```txt
stripAnsi -> filterStderr -> replace -> matchOutput -> drop/include lines
  -> truncateLineAt -> head/tail/maxLines -> onEmpty
```

အရေးကြီးသော field များ-

| Field                        | ရည်ရွယ်ချက်                                                                                                 |
| ---------------------------- | ----------------------------------------------------------------------------------------------------------- |
| `rules.stripAnsi`            | ကိုက်ညီမှုစစ်ဆေးခြင်းမပြုမီ terminal အရောင်/control sequence များကို ဖယ်ရှားရန်                             |
| `rules.filterStderr`         | ကိုက်ညီမှုစစ်ဆေးခြင်း/filter လုပ်ခြင်းမပြုမီ အသုံးများသော stderr prefix များကို စံပုံစံဖြစ်အောင် ပြုလုပ်ရန် |
| `rules.replace`              | အစဉ်လိုက် regex အစားထိုးမှုများကို အသုံးချရန်                                                               |
| `rules.matchOutput`          | Output သည် သိရှိထားသော အခြေအနေတစ်ခုနှင့် ကိုက်ညီသည့်အခါ ကျစ်လျစ်သော အနှစ်ချုပ်တစ်ခု ပြန်ပေးရန်              |
| `rules.matchOutput[].unless` | Error/failure pattern တစ်ခု ရှိနေသည့်အခါ ဖြတ်လမ်းလုပ်ဆောင်ချက်ကို ကျော်ရန်                                  |
| `rules.dropPatterns`         | မလိုအပ်ဘဲ ရှုပ်ထွေးစေသော စာကြောင်းများကို ဖယ်ရှားရန်                                                        |
| `rules.includePatterns`      | လက်တွေ့လုပ်ဆောင်နိုင်သော စာကြောင်းများကို ဦးစားပေးရန်                                                       |
| `rules.collapsePatterns`     | ထပ်တလဲလဲ ကိုက်ညီသော စာကြောင်းများကို စုစည်းချုံ့ရန်                                                         |
| `rules.deduplicate`          | Filter တစ်ခုချင်းစီအလိုက် opt-in ပြုလုပ်ခြင်းဖြင့် ဆက်တိုက်ထပ်နေသော စာကြောင်းများကို စုစည်းချုံ့ရန်         |
| `rules.truncateLineAt`       | Unicode ဘေးကင်းသော စာကြောင်းတစ်ကြောင်းချင်း ဖြတ်တောက်မှု                                                    |
| `rules.onEmpty`              | စာကြောင်းအားလုံးကို filter လုပ်ပြီးပါက အသုံးပြုမည့် အရန် message                                            |
| `tests[]`                    | Verify gate က အသုံးပြုသော inline sample များ                                                                |

Built-in filter များတွင် inline `tests[]` sample များ ပါဝင်သင့်သည်။ စိတ်ကြိုက် filter များတွင်လည်း
၎င်းတို့ကို ထည့်သွင်းသင့်ပြီး အထူးသဖြင့် project များစွာအကြား မျှဝေအသုံးပြုသည့်အခါ ထည့်သွင်းသင့်သည်။

## စာကြောင်း ထပ်နေမှု ဖယ်ရှားခြင်း (အလွှာနှစ်ခု)

RTK သည် သီးခြားအလွှာနှစ်ခုတွင် ထပ်နေသောစာကြောင်းများကို ပေါင်းစည်းသည်-

1. **Filter တစ်ခုချင်းအလိုက် `deduplicate` (ရွေးချယ်ဖွင့်နိုင်ပြီး ပုံသေ `false`)။** Filter တစ်ခုသည် ဖြတ်တောက်ခြင်းမပြုမီ _ထို filter နှင့် ကိုက်ညီသော output အတွင်းရှိ_ ဆက်တိုက်ထပ်နေသည့် စာကြောင်းများကို ပေါင်းစည်းရန် `rules.deduplicate: true`
   ဟု သတ်မှတ်နိုင်သည်။
   ၎င်းကို `lineFilter.ts` အတွင်း လုပ်ဆောင်သည်။ အဟောင်းပုံစံ filter များအတွက် filter က
   `collapsePatterns` ကို သတ်မှတ်ထားသည့်အခါ အလိုအလျောက် ဖွင့်ပေးသည်။ Schema- `open-sse/services/compression/engines/rtk/filterSchema.ts` ရှိ
   `deduplicate: z.boolean().default(false)`။
2. **Engine တစ်ခုလုံးအတွက် `deduplicateThreshold` (ပုံသေ `3`)။** Filter အားလုံးကို လုပ်ဆောင်ပြီးနောက် engine သည် ရလဒ်တစ်ခုလုံးရှိ
   တူညီပြီး ဆက်တိုက်ဖြစ်နေသော စာကြောင်းများ၏ အရေအတွက် `>= deduplicateThreshold` ဖြစ်သည့် မည်သည့်အစဉ်ကိုမဆို ပေါင်းစည်းသည်
   (`engines/rtk/index.ts` တွင် အသုံးပြုထားသော `deduplicateRepeatedLines`)။ ပုံမှန်ပြုလုပ်ချိန်တွင် တန်ဖိုးကို 2–100 အတွင်း ကန့်သတ်ထားသည်။

Filter တစ်ခုချင်းအလိုက် လုပ်ဆောင်မှုကို ဦးစွာ (filter အတွင်း၌) လုပ်ဆောင်ပြီး engine တစ်ခုလုံးအတွက် လုပ်ဆောင်မှုကို နောက်ဆုံးတွင် (ပေါင်းစပ်ထားသော
output တစ်ခုလုံးပေါ်တွင်) လုပ်ဆောင်သောကြောင့် ထပ်တလဲလဲ ရေတွက်ခြင်းမရှိဘဲ လုပ်ဆောင်မှုနှစ်ခုကို ပေါင်းစပ်နိုင်သည်။

## စာကြောင်းများ အုပ်စုဖွဲ့ခြင်း (`enableGrouping`)

`rtkConfig.enableGrouping` သည် `true` (ပုံသေ `false`) ဖြစ်သောအခါ RTK သည် ထပ်နေမှုဖယ်ရှားပြီးနောက် ရလာသော ရလဒ်ပေါ်တွင် နောက်ထပ် `groupSimilarLines`
လုပ်ဆောင်မှုကို ပြုလုပ်ပြီး byte အဆင့်တွင် ထပ်တူမဟုတ်သော်လည်း _အလွန်ဆင်တူသော_
ဆက်တိုက်စာကြောင်းများ၏ အစဉ်များကို ပေါင်းစည်းသည်။ `rtkConfig.groupingThreshold` (ပုံသေ `3`) သည်
အုပ်စုဖွဲ့ခြင်းကို စတင်လုပ်ဆောင်စေမည့် အနည်းဆုံး အစဉ်အရှည်ဖြစ်သည်။ ၎င်းသည် `deduplicateThreshold` ၏ ဖွဲ့စည်းပုံဆိုင်ရာ အတွဲဖက်ဖြစ်သည်- dedup သည် အတိအကျ ထပ်နေမှုများကို ကိုင်တွယ်ပြီး
grouping သည် "ပုံသဏ္ဌာန်တူပြီး အနည်းငယ်သာ ကွဲပြားမှုရှိသောအရာများ" ကို ကိုင်တွယ်သည်။ Flag နှစ်ခုစလုံးသည် `key_value` table ထဲတွင် သိမ်းဆည်းထားသော `rtkConfig` JSON
၏ အစိတ်အပိုင်းများဖြစ်သောကြောင့် (အထက်ပါ Configuration ကို ကြည့်ပါ) ပြန်လည်စတင်ပြီးနောက်တွင်လည်း ဆက်တင်ကို ထိန်းသိမ်းထားသည်။

## Code Comment များ ဖယ်ရှားခြင်း (`stripCodeComments` / `preserveDocstrings`)

`rtkConfig.applyToCodeBlocks` ကို ဖွင့်ထားသည့်အခါ RTK သည် fenced code block များမှ comment များကိုလည်း ဖယ်ရှားနိုင်သည်-

- `stripCodeComments` (ပုံသေ `false`) — ရွေးချယ်ဖွင့်နိုင်သည်။ `true` ဖြစ်သောအခါ RTK သည် JavaScript
  နှင့် TypeScript fenced block များမှ comment များကို ဖယ်ရှားသည်။ ယခင်က flag ကို ဖတ်ယူသော်လည်း အမှန်တကယ် အသုံးမချခဲ့သောကြောင့် အသုံးပြုနေဆဲ production စနစ်တွင် မသိသာဘဲ ပြောင်းလဲသွားခြင်းကို
  ရှောင်ရှားရန် ပုံသေတန်ဖိုးကို "preserve" အဖြစ် ဆက်ထားသည်။
- `preserveDocstrings` (ပုံသေ `true`) — comment များ ဖယ်ရှားသောအခါ JSDoc/`/** … */` block comment များကို
  ဆက်လက်ထိန်းသိမ်းထားသည် (၎င်းတို့တွင် သုံးစွဲရသော byte ပမာဏထက် ပို၍တန်ဖိုးရှိသည့် API documentation ပါရှိသည်)။ ၎င်းတို့ကိုပါ ဖယ်ရှားရန် `false` ဟု သတ်မှတ်ပါ။

Comment ဖယ်ရှားခြင်းကို `open-sse/services/compression/engines/rtk/codeStripper.ts` တွင် ဖန်တီးထားသည်။ String၊ template နှင့် regex literal များကို comment များအဖြစ် ဘယ်သောအခါမှ မှားယွင်းမယူဆစေရန်
၎င်းသည် regex မဟုတ်ဘဲ **TypeScript parser** ကို အသုံးပြုပြီး JSX ကို ရှာတွေ့ပါက လုပ်ဆောင်မှုတစ်ခုလုံးကို ရပ်တန့်သည် (ထို့ကြောင့် JSX expression-container comment များ
ဘယ်သောအခါမှ ပျက်စီးမသွားပါ)။ လက်ရှိတွင် comment ဖယ်ရှားခြင်းကို **JavaScript နှင့် TypeScript တို့အတွက်သာ** အသုံးပြုသည် — stripper ၏
`CodeLanguage` set ထဲရှိ အခြားဘာသာစကားများ (Python, Rust, Go, Ruby, Java) တွင် စာကြောင်းအလွတ်နှင့်
whitespace ပေါင်းစည်းခြင်းရှိသော်လည်း comment ဖယ်ရှားခြင်း မရှိပါ။ ဖယ်ရှားပြင်ဆင်ထားသော block လုပ်ဆောင်မှုကို
`rulesApplied` တွင် `rtk:code-strip` ဟု tag တပ်ထားသည်။

> **မှတ်ချက် — GCF / tabular encoding သည် သီးခြား engine တစ်ခုဖြစ်သည်။** RTK တွင် "GCF"
> (Graph Compact Format) tabular/columnar JSON encoder **မပါဝင်ပါ**။ ယခင်
> `omni-tabular` encoder ကို အစားထိုးခဲ့သော ထို encoder သည် **headroom** engine
> (`open-sse/services/compression/engines/headroom/`၊ ထည့်သွင်းထားသော codec သည်
> `headroom/gcf/` အောက်တွင်ရှိသည်) ထဲတွင် ရှိသည်။ ၎င်းသည် ဤနေရာတွင် မှတ်တမ်းတင်ထားသော RTK filter pipeline နှင့် မသက်ဆိုင်ပါ။

## စီစဉ်သတ်မှတ်မှု

အလုံးစုံဆိုင်ရာ ဆက်တင်များကို `/api/settings/compression` မှတစ်ဆင့် ရယူနိုင်သည်။ RTK သီးသန့် ဆက်တင်များကိုလည်း
`/api/context/rtk/config` မှတစ်ဆင့် ရယူနိုင်သည်။

```json
{
  "defaultMode": "stacked",
  "autoTriggerMode": "stacked",
  "autoTriggerTokens": 32000,
  "stackedPipeline": [
    { "engine": "rtk", "intensity": "standard" },
    { "engine": "caveman", "intensity": "full" }
  ],
  "rtkConfig": {
    "enabled": true,
    "intensity": "standard",
    "applyToToolResults": true,
    "applyToCodeBlocks": false,
    "applyToAssistantMessages": false,
    "enabledFilters": [],
    "disabledFilters": [],
    "maxLinesPerResult": 120,
    "maxCharsPerResult": 12000,
    "deduplicateThreshold": 3,
    "customFiltersEnabled": true,
    "trustProjectFilters": false,
    "rawOutputRetention": "never",
    "rawOutputMaxBytes": 1048576,
    "enableGrouping": false,
    "groupingThreshold": 3,
    "stripCodeComments": false,
    "preserveDocstrings": true
  }
}
```

`enabledFilters` နှင့် `disabledFilters` တို့သည် `test-vitest` သို့မဟုတ် `git-diff` ကဲ့သို့သော filter id များကို အသုံးပြုသည်။

`rtkConfig` ၏ ပုံစံအပြည့်အစုံကို `open-sse/services/compression/types.ts` ရှိ `RtkConfig` /
`DEFAULT_RTK_CONFIG` တွင် သတ်မှတ်ထားသည်။ Object တစ်ခုလုံးကို SQLite `key_value` ဇယားအတွင်း
`namespace = "compression"`, `key = "rtkConfig"` အောက်တွင် JSON တန်ဖိုးတစ်ခုတည်းအဖြစ် သိမ်းဆည်းထားပြီး
(`src/lib/db/compression.ts`) ဖတ်ယူသည့်အခါ `normalizeRtkConfig` ဖြင့် စံသတ်မှတ်ပေးသည်။ ထို့ကြောင့် အောက်ပါ field အားလုံး
— `enableGrouping`, `groupingThreshold`, `stripCodeComments` နှင့် `preserveDocstrings` အပါအဝင် —
တူညီသော store မှတစ်ဆင့် အပြန်အလှန် သိမ်းဆည်း/ဖတ်ယူနိုင်ပြီး ပြန်လည်စတင်ပြီးနောက်တွင်လည်း ဆက်လက်တည်ရှိသည်။

| Key                    | မူလတန်ဖိုး | ရည်ရွယ်ချက်                                                                                            |
| ---------------------- | ---------- | ------------------------------------------------------------------------------------------------------ |
| `deduplicateThreshold` | `3`        | Engine တစ်ခုလုံးအတွက်- ခေါက်သိမ်းရန် ဆက်တိုက်တူညီသော စာကြောင်းအနည်းဆုံးအရေအတွက် (2–100 အတွင်း)         |
| `enableGrouping`       | `false`    | ရွေးချယ်ဖွင့်ရမည်- ဆက်တိုက်ရှိသော တူညီလုနီးပါး စာကြောင်းများကို ခေါက်သိမ်းရန်                          |
| `groupingThreshold`    | `3`        | Grouping ကို စတင်စေမည့် ဆက်တိုက်ဆင်တူသော စာကြောင်းအနည်းဆုံးအရေအတွက်                                    |
| `stripCodeComments`    | `false`    | ရွေးချယ်ဖွင့်ရမည်- fenced code block များမှ comment များကို ဖယ်ရှားရန် (`applyToCodeBlocks` လိုအပ်သည်) |
| `preserveDocstrings`   | `true`     | Comment များကို ဖယ်ရှားသည့်အခါ JSDoc/`/** … */` block များကို ဆက်လက်ထိန်းသိမ်းရန်                      |

## API

| Route                              | Method | ရည်ရွယ်ချက်                                                       |
| ---------------------------------- | ------ | ----------------------------------------------------------------- |
| `/api/context/rtk/config`          | GET    | RTK config ကို ဖတ်ယူရန်                                           |
| `/api/context/rtk/config`          | PUT    | RTK config ကို အပ်ဒိတ်လုပ်ရန်                                     |
| `/api/context/rtk/filters`         | GET    | Filter catalog နှင့် load diagnostic များကို စာရင်းပြုစုရန်       |
| `/api/context/rtk/import`          | POST   | RTK TOML schema v1 ဖိုင်များကို အတည်ပြုရန် သို့မဟုတ် ထည့်သွင်းရန် |
| `/api/context/rtk/test`            | POST   | စာသား payload တစ်ခုအတွက် RTK compression ကို အစမ်းကြည့်ရန်        |
| `/api/context/rtk/raw-output/[id]` | GET    | ထိန်းသိမ်းထားသော အချက်အလက်ဖျောက်ထားသည့် raw output ကို ဖတ်ယူရန်   |
| `/api/compression/preview`         | POST   | မည်သည့် compression mode ကိုမဆို အစမ်းကြည့်ရန်                    |

RTK test payload-

```json
{
  "command": "npm test",
  "text": "FAIL tests/example.test.ts\nAssertionError: expected true\nTest Files 1 failed",
  "config": {
    "intensity": "standard"
  }
}
```

Compression preview payload-

```json
{
  "mode": "stacked",
  "messages": [
    {
      "role": "tool",
      "content": "FAIL tests/example.test.ts\nAssertionError: expected true\nTest Files 1 failed"
    }
  ],
  "config": {
    "rtkConfig": {
      "rawOutputRetention": "failures"
    }
  }
}
```

စီမံခန့်ခွဲမှု route များသည် dashboard management auth သို့မဟုတ် ကိုက်ညီသော API-key policy ကို လိုအပ်သည်။

RTK TOML validation payload-

```json
{
  "action": "validate",
  "content": "schema_version = 1\n\n[filters.my-tool]\nmatch_command = \"^my-tool\\\\b\"\nmax_lines = 20\n"
}
```

အတည်ပြုပြီးသော ဖိုင်ကို အလုံးစုံဆိုင်ရာအဖြစ် ထည့်သွင်းရန် `"action": "install"` ကို အသုံးပြုပါ။ ရှိပြီးသား အလုံးစုံဆိုင်ရာဖိုင်ကို
အစားထိုးမည်ကို ပြန်လည်စစ်ဆေးပြီး အတည်ပြုပြီးမှသာ `"overwrite": true` ကို ထည့်ပါ။

## မူရင်း Output ကို ပြန်လည်ရယူခြင်း

RTK သည် ပုံမှန်အားဖြင့် ချုံ့ထားသော စာသားကိုသာ ပြန်ပေးသည်။ Debugging ပြုလုပ်ရန်အတွက် `rawOutputRetention` သည် ပြင်ဆင်ဖျောက်ထားသော မူရင်း output ကို ထိန်းသိမ်းထားနိုင်သည်-

| တန်ဖိုး    | လုပ်ဆောင်ပုံ                                                                 |
| ---------- | ---------------------------------------------------------------------------- |
| `never`    | မူရင်း output ကို မထိန်းသိမ်းပါ                                              |
| `failures` | ပျက်ကွက်မှု ဖြစ်နိုင်ခြေရှိသည့် output ကိုသာ ထိန်းသိမ်းပါ                    |
| `always`   | ပြင်ဆင်ဖျောက်ပြီးနောက် ချုံ့ထားသော RTK မူရင်း output အားလုံးကို ထိန်းသိမ်းပါ |

ထိန်းသိမ်းထားသော ဖိုင်များကို အောက်ပါတည်နေရာတွင် ရေးသားသည်-

```txt
DATA_DIR/rtk/raw-output/
```

သိမ်းဆည်းခြင်းမပြုမီ common bearer token များ၊ API key များ၊ Slack token များ၊
AWS access key များနှင့် assignment ပုံစံ `token=...`, `secret=...`, `password=...` တန်ဖိုးများအပါအဝင်
လျှို့ဝှက်ချက်များကို ပြင်ဆင်ဖျောက်ထားသည်။ Analytics တွင် pointer id၊ အရွယ်အစားနှင့် hash metadata တို့ကိုသာ သိမ်းဆည်းသည်။

## Verify Gate

သီးသန့်ဦးတည်ထားသော verify gate သည် ပြင်ပ command များကို shell မှတစ်ဆင့် မခေါ်ဘဲ built-in inline filter test များကို လုပ်ဆောင်သည်-

```bash
node --import tsx/esm --test tests/unit/compression/rtk-verify.test.ts
```

ပိုမိုကျယ်ပြန့်သော RTK gate မှာ-

```bash
node --import tsx/esm --test \
  tests/unit/compression/rtk-*.test.ts \
  tests/unit/compression/pipeline-integration.test.ts \
  tests/unit/compression/context-compression-api.test.ts
```

Release မပြုလုပ်မီ ကျယ်ပြန့်သော compression gate ကို လုပ်ဆောင်ပါ-

```bash
node --import tsx/esm --test \
  tests/unit/compression/*.test.ts \
  tests/golden-set/*.test.ts \
  tests/integration/compression-pipeline.test.ts \
  tests/unit/api/compression/compression-api.test.ts
```

## RTK ကို တိုးချဲ့ခြင်း

1. Filter JSON ဖိုင်တစ်ခုကို ထည့်သွင်းပါ သို့မဟုတ် အပ်ဒိတ်လုပ်ပါ။
2. အရေးကြီးသော လုပ်ဆောင်ပုံကို သက်သေပြသည့် `tests[]` နမူနာ အနည်းဆုံးတစ်ခု ထည့်သွင်းပါ။
3. Command family အသစ်များအတွက် `tests/unit/compression/fixtures/rtk/` အောက်တွင် fixture တစ်ခု ထည့်သွင်းပါ။
4. Output class အသစ်ကို မိတ်ဆက်သည့်အခါ command detection coverage ကို ထည့်သွင်းပါ။
5. Verify နှင့် ကျယ်ပြန့်သော RTK gate များကို လုပ်ဆောင်ပါ။
6. Filter သည် project-local ဖြစ်ပါက စစ်ဆေးသုံးသပ်ပြီးမှသာ `.rtk/filters.json` ကို commit လုပ်ပြီး `.rtk/trust.json` ကို refresh လုပ်ပါ။

---

## ပြင်းအားအဆင့်များ (v3.8.16+)

RTK သည် **ချုံ့မှု ပြင်းထန်ခြင်း** နှင့် **ဘေးကင်းမှု** တို့အကြား ချိန်ညှိရွေးချယ်နိုင်သော **ပြင်းအားအဆင့် 3 ဆင့်** ကို ပံ့ပိုးသည်။ အဆင့်ကို engine config ရှိ `config.intensity` မှတစ်ဆင့် သတ်မှတ်သည်။

### အဆင့် 3 ဆင့်

| အဆင့်                       | ဖြတ်တောက်မှု သတ်မှတ်ချက်     | Token ချွေတာမှု | အန္တရာယ်  | အသင့်တော်ဆုံး အသုံးပြုမှု                    |
| --------------------------- | ---------------------------- | --------------- | --------- | -------------------------------------------- |
| `minimal`                   | အပိုင်းတစ်ခုလျှင် 24 ကြောင်း | ~20-40%         | အလွန်နည်း | အရေးကြီးသော context ပါဝင်သည့် Production     |
| `standard` (မူလသတ်မှတ်ချက်) | အပိုင်းတစ်ခုလျှင် 24 ကြောင်း | ~50-70%         | နည်း      | နေ့စဉ် coding session များ                   |
| `aggressive`                | အပိုင်းတစ်ခုလျှင် 16 ကြောင်း | ~70-90%         | အလယ်အလတ်  | ကြာရှည်သော session များ၊ အများဆုံး ချွေတာမှု |

### ဖြတ်တောက်မှု ဖြစ်ပေါ်သည့်နေရာ

ဖြတ်တောက်မှု သတ်မှတ်ချက်သည် `lineFilter.ts` ကို သက်ရောက်စေသည်-

```ts
// open-sse/services/compression/engines/rtk/index.ts:329-330 မှ
config.intensity === "aggressive" ? 16 : 24,
config.intensity === "aggressive" ? 16 : 24,
```

အပိုင်းတစ်ခုစီ၏ **အစပိုင်း** နှင့် **အဆုံးပိုင်း** နှစ်ခုလုံးကို ထိန်းသိမ်းထားပြီး ဖြတ်တောက်မှု စတင်သည့်အခါ အလယ်ပိုင်း content ကို ဖယ်ရှားသည်။

### ဆက်လက်ထားရှိသည့်အရာနှင့် ဖြတ်တောက်ခံရသည့်အရာ

| Content                          | minimal          | standard         | aggressive       |
| -------------------------------- | ---------------- | ---------------- | ---------------- |
| Error များ / stack trace များ    | ✅ ထိန်းသိမ်းထား | ✅ ထိန်းသိမ်းထား | ✅ ထိန်းသိမ်းထား |
| Test ပျက်ကွက်မှုများ             | ✅ ထိန်းသိမ်းထား | ✅ ထိန်းသိမ်းထား | ✅ ထိန်းသိမ်းထား |
| Build error များ                 | ✅ ထိန်းသိမ်းထား | ✅ ထိန်းသိမ်းထား | ✅ ထိန်းသိမ်းထား |
| Test အောင်မြင်မှုများ (အသေးစိတ်) | ✅ ထိန်းသိမ်းထား | 🟡 ခေါက်သိမ်းထား | 🟡 ခေါက်သိမ်းထား |
| ပုံမှန် output (info log များ)   | 🟡 ခေါက်သိမ်းထား | 🟡 ခေါက်သိမ်းထား | ❌ ဖယ်ရှားထား    |
| Progress bar များ                | 🟡 ခေါက်သိမ်းထား | ❌ ဖယ်ရှားထား    | ❌ ဖယ်ရှားထား    |
| Banner / ASCII art               | 🟡 ခေါက်သိမ်းထား | ❌ ဖယ်ရှားထား    | ❌ ဖယ်ရှားထား    |

### သင့်တော်သော ပြင်းအားကို ရွေးချယ်ခြင်း

```
                  Context ဆုံးရှုံးမှုသည် ဆိုးရွားသည့် ဘေးဒုက္ခ ဖြစ်စေမည်လား?
                  │
      ┌───────────┼───────────┐
      │           │           │
    ဖြစ်မည်       မဖြစ်ပါ      မသေချာပါ
      │           │           │
      ▼           │           │
   minimal        │           │
      │           │           │
      │           ▼           ▼
      │      Throughput က    `standard` ကို ဦးစွာ
      │      မည်မျှအရေးကြီးသလဲ? စမ်းကြည့်ပါ (ဖြစ်ရပ်များ၏
      │           │          80% အတွက် အလုပ်ဖြစ်သည်)
      │      ┌────┴────┐
      │      │         │
      │     နည်း       များ
      │      │         │
      │      ▼         ▼
      │   standard   aggressive
      │      │         │
      └──────┴─────────┘
```

### ပြင်းအားကို Config ပြုလုပ်ခြင်း

**Combo တစ်ခုချင်းအလိုက်** (combo config အတွင်း)-

```json
{
  "combo": "my-coding-combo",
  "routing": {/* ... */},
  "compression": {
    "engine": "rtk",
    "intensity": "aggressive"
  }
}
```

**Programmatically**-

`rtkEngine` (`@omniroute/open-sse/services/compression/engines/rtk`) သည်
`CompressionEngine` တစ်ခုဖြစ်ပြီး `updateConfig` method မရှိပါ။ ထို့အစား engine ၏ config ကို
registry helper မှတစ်ဆင့် အပ်ဒိတ်လုပ်ပါ-

```ts
import { updateEngineConfig } from "@omniroute/open-sse/services/compression/engines/registry";

updateEngineConfig("rtk", { intensity: "aggressive" });
```

### အကျိုးသက်ရောက်မှုကို အတည်ပြုခြင်း

သင်ရွေးချယ်ထားသော ပြင်းအားတွင် သင့် filter သည် ဘေးကင်းကြောင်း အတည်ပြုရန် **Verify Gate** (အောက်တွင်ကြည့်ပါ) ကို အသုံးပြုပါ-

```ts
import { runRtkFilterTests } from "omniroute/compression/engines/rtk/verify";

const result = runRtkFilterTests({ intensity: "aggressive" });
if (!result.passed) {
  console.error("ပြင်းအား aggressive တွင် Filter များ မအောင်မြင်ပါ");
}
```

---

## စိတ်ကြိုက် Filter ဖန်တီးခြင်း (v3.8.16+)

`engines/rtk/filters/` directory တွင် **အသင့်ပါဝင်သော filter JSON ဖိုင် 49+ ခု** ပါရှိသည်။ မူလသတ်မှတ်ချက်များဖြင့် မပံ့ပိုးထားသော စိတ်ကြိုက် tool များ၏ output ကို ချုံ့ရန် မိမိကိုယ်ပိုင် filter များကို ထည့်သွင်းနိုင်သည်။

### Filter Schema (Zod)

```ts
{
  "id": "string",                      // မဖြစ်မနေလိုအပ်သည်။ Filter identifier (kebab-case၊ ဥပမာ "python-traceback")
  "label": "string",                   // မဖြစ်မနေလိုအပ်သည်။ လူဖတ်ရှုနားလည်နိုင်သော filter အမည်
  "description": "string",             // ရွေးချယ်နိုင်သည် (မူလတန်ဖိုး: "")။ Filter ၏ လုပ်ဆောင်ချက်အကြောင်း အကျဉ်းချုပ်ဖော်ပြချက်
  "category": "git|test|build|shell|docker|package|infra|cloud|generic",
  "priority": number,                  // ရွေးချယ်နိုင်သည် (0-100၊ မူလတန်ဖိုး: 50)။ လုပ်ဆောင်မည့်အစီအစဉ် (တန်ဖိုးပိုမြင့်လေ အရင်လုပ်ဆောင်လေ)
  "match": {
    "commands": ["string"],            // ကိုက်ညီစစ်ဆေးမည့် command အမည်များ (ဥပမာ "python", "pytest")
    "patterns": ["string"],            // Output ကို ကိုက်ညီစစ်ဆေးမည့် regex pattern များ
    "outputTypes": ["string"]          // ရှာဖွေတွေ့ရှိထားသော output class များ (ဥပမာ "test-failure")
  },
  "rules": {
    "stripAnsi": boolean,              // ရွေးချယ်နိုင်သည် (မူလတန်ဖိုး: false)။ ANSI အရောင် code များကို ဖယ်ရှားမည်
    "replace": [                       // ရှာဖွေ၍ အစားထိုးသည့် rule များ (မူလတန်ဖိုး: [])
      { "pattern": "regex", "replacement": "..." }
    ],
    "matchOutput": [                   // Pattern ကိုက်ညီပါက ချက်ချင်းရပ်တန့်မည် (မူလတန်ဖိုး: [])
      {
        "pattern": "regex",
        "message": "short summary",
        "unless": "regex"              // ဤ pattern ကိုက်ညီပါက ကျော်သွားမည်
      }
    ],
    "includePatterns": ["string"],     // ထိန်းသိမ်းထားမည့် စာကြောင်းများ (regex pattern များ၊ မူလတန်ဖိုး: [])
    "dropPatterns": ["string"],        // ဖယ်ရှားမည့် စာကြောင်းများ (regex pattern များ၊ မူလတန်ဖိုး: [])
    "collapsePatterns": ["string"],    // တစ်ကြိမ်တည်းသာ ပေါ်လာစေရန် ချုံ့မည့် စာကြောင်းများ (မူလတန်ဖိုး: [])
    "deduplicate": boolean,            // ရွေးချယ်နိုင်သည် (မူလတန်ဖိုး: false)။ ထပ်နေသော စာကြောင်းများကို ဖယ်ရှားမည်
    "truncateLineAt": number,          // ရွေးချယ်နိုင်သည် (မူလတန်ဖိုး: 0)။ စာကြောင်းများကို အများဆုံး character အရေအတွက်အထိ ဖြတ်တောက်မည်
    "maxLines": number,                // ရွေးချယ်နိုင်သည် (မူလတန်ဖိုး: 0)။ စာကြောင်းစုစုပေါင်းအတွက် အတိအကျ အများဆုံးကန့်သတ်ချက်
    "headLines": number,               // ရွေးချယ်နိုင်သည် (မူလတန်ဖိုး: 20)။ ကိုက်ညီသော output ၏ ပထမ N စာကြောင်းကို ထိန်းသိမ်းမည်
    "tailLines": number,               // ရွေးချယ်နိုင်သည် (မူလတန်ဖိုး: 20)။ ကိုက်ညီသော output ၏ နောက်ဆုံး N စာကြောင်းကို ထိန်းသိမ်းမည်
    "onEmpty": "string",               // ရွေးချယ်နိုင်သည် (မူလတန်ဖိုး: "")။ စာကြောင်းအားလုံး filter လုပ်ခံရပါက အသုံးပြုမည့် အရန် message
    "filterStderr": boolean            // ရွေးချယ်နိုင်သည် (မူလတန်ဖိုး: false)။ stderr output ကိုလည်း filter လုပ်မည်
  },
  "preserve": {
    "errorPatterns": ["string"],       // အမြဲတမ်း ထိန်းသိမ်းထားရမည့် pattern များ (မူလတန်ဖိုး: [])
    "summaryPatterns": ["string"]      // နောက်ဆုံးအကျဉ်းချုပ်စာကြောင်းအတွက် pattern များ (မူလတန်ဖိုး: [])
  },
  "tests": [                           // စစ်ဆေးအတည်ပြုရန် inline test များ (မူလတန်ဖိုး: [])
    {
      "name": "string",               // မဖြစ်မနေလိုအပ်သည်။ Test အမည်
      "input": "sample output",        // မဖြစ်မနေလိုအပ်သည်။ နမူနာ input စာသား
      "expected": "expected output",   // မဖြစ်မနေလိုအပ်သည်။ မျှော်မှန်းထားသော ချုံ့ပြီး output
      "command": "optional command"    // ရွေးချယ်နိုင်သည်။ Command context
    }
  ]
}
```

### ဥပမာ- Python Traceback Filter

```json
{
  "id": "python-traceback",
  "label": "Python Traceback Filter",
  "description": "Compresses Python tracebacks to essential file/line locations and error type",
  "category": "test",
  "priority": 60,
  "match": {
    "commands": ["python", "python3", "pytest", "uv", "poetry"],
    "patterns": ["Traceback \\(most recent call last\\)", "Error", "Exception"],
    "outputTypes": ["error-traceback"]
  },
  "rules": {
    "stripAnsi": true,
    "includePatterns": [
      "Traceback \\(most recent call last\\)",
      "^\\s*File \".+\", line \\d+",
      "^\\s*[A-Z][a-zA-Z]+Error:",
      "^\\s*[A-Z][a-zA-Z]+Exception"
    ],
    "dropPatterns": ["site-packages/", "^\\s+[a-z_]+\\([^)]*\\)$"],
    "headLines": 5,
    "tailLines": 3,
    "maxLines": 25,
    "filterStderr": true
  },
  "preserve": {
    "errorPatterns": ["Error:", "Exception:", "Traceback"],
    "summaryPatterns": ["^[A-Z][a-zA-Z]+(?:Error|Exception):"]
  },
  "tests": [
    {
      "name": "preserves-error-type-and-location",
      "input": "Traceback (most recent call last):\n  File \"app.py\", line 42, in main\n    do_thing()\n  File \"lib/utils.py\", line 17, in helper\n    return 1 / 0\nZeroDivisionError: division by zero",
      "expected": "Traceback (most recent call last):\n  File \"app.py\", line 42, in main\n  File \"lib/utils.py\", line 17, in helper\nZeroDivisionError: division by zero",
      "command": "python app.py"
    }
  ]
}
```

### စိတ်ကြိုက် Filter များကို Load လုပ်ခြင်း

အသိအမှတ်ပြုထားသော တည်နေရာတစ်ခုတွင် ဖိုင်ကို ထားပါ-

```
~/.omniroute/rtk/filters/my-filter.json     # အသုံးပြုသူအဆင့်
<project>/.rtk/filters/my-filter.json      # Project အဆင့်
```

စတင်ချိန်တွင် `open-sse/services/compression/engines/rtk/filterLoader.ts` ရှိ `loadRtkFilters()` မှတစ်ဆင့် filter များကို အလိုအလျောက် load လုပ်သည်။ Loader သည် အောက်ပါတည်နေရာများမှ filter များကို ရှာဖွေသည်-

- အသင့်ပါဝင်သော catalog: `open-sse/services/compression/engines/rtk/filters/`
- အသုံးပြုသူ directory: `~/.omniroute/rtk/filters/`
- Project directory: `<project>/.rtk/filters/`

Filter များကို program မှတစ်ဆင့် load လုပ်ရန်-

```ts
import { loadRtkFilters } from "@omniroute/open-sse/services/compression/engines/rtk/filterLoader";

// ရွေးချယ်စရာများ- customFiltersEnabled (အသုံးပြုသူ/project filter များကို load လုပ်မည်၊ မူလအားဖြင့် ဖွင့်ထားသည်)၊
// trustProjectFilters၊ refresh။
const filters = loadRtkFilters({ customFiltersEnabled: true });
```

### စစ်ဆေးအတည်ပြုခြင်း

Load လုပ်ချိန်တွင် filter များကို Zod schema နှင့် တိုက်ဆိုင်စစ်ဆေးအတည်ပြုသည်။ ဖွဲ့စည်းပုံမှားယွင်းသော filter သည် load လုပ်၍မရဘဲ error တစ်ခုကို log မှတ်တမ်းတင်မည်-

```
RTK_FILTER_LOADER: filter "my-filter" failed validation:
  - rules.replace.0.pattern: Invalid regex
  - match.commands: must not be empty
```

ထည့်သွင်းထားသော filter အားလုံးကို စစ်ဆေးအတည်ပြုရန် `open-sse/services/compression/engines/rtk/verify.ts` မှ export လုပ်ထားသော `runRtkFilterTests()` ကို ခေါ်ပါ။

### အကောင်းဆုံး လုပ်ဆောင်နည်းများ

1. **`tests[]` ကို အမြဲထည့်သွင်းပါ** — ၎င်းတို့သည် သင့် filter အလုပ်လုပ်ကြောင်း သက်သေပြပြီး ပြန်လည်ချို့ယွင်းမှုများကို ကာကွယ်ပေးသည်
2. **အမြန်ဆုံးဖြတ်ရန် `matchOutput` ကို အသုံးပြုပါ** — စာကြောင်းတစ်ကြောင်းတည်းဖြင့် အကြောင်းအရာကို ပြည့်စုံစွာ ဖော်ပြနိုင်ပါက block တစ်ခုလုံးကို အစားထိုးပါ
3. **`strip` ထက် `keep` ကို ဦးစားပေးပါ** — “အမြဲထိန်းသိမ်းရန်” စည်းမျဉ်းများကို တိတိကျကျ သတ်မှတ်ခြင်းသည် “အမြဲဖယ်ရှားရန်” စည်းမျဉ်းများထက် ပိုမိုလုံခြုံသည်
4. **ပြင်းအားအဆင့် ၃ ဆင့်လုံးတွင် စမ်းသပ်ပါ** — `minimal` သည် မည်သည့်အပြောင်းအလဲမျှ မပြုလုပ်သင့်ဘဲ `aggressive` သည်လည်း error များကို ဆက်လက်ထိန်းသိမ်းထားသင့်သည်
5. **`unless` field ကို အသုံးပြုပါ** — “X ပါရှိပါက မလုပ်ဆောင်ရန်” စည်းကမ်းဖြင့် အမြန်ဆုံးဖြတ်မှုများကို ကာကွယ်ထိန်းချုပ်ပါ

---

## မူရင်း Output ပြန်လည်ရယူခြင်းနှင့် Verify Gate

RTK က output ကို အလွန်အမင်း ချုံ့လိုက်သည့်အခါ debugging၊ audit သို့မဟုတ် replay ပြုလုပ်ရန်အတွက် **မူရင်းစာသားကို ပြန်လည်ရယူနိုင်သည်**။

### မူရင်း Output ပြန်လည်ရယူခြင်း အလုပ်လုပ်ပုံ

```
မူရင်း output (10K tokens)
        │
        ▼
RTK ချုံ့ခြင်း (rawOutput.enabled=true ဖြင့်)
        │
        ├─▶ ချုံ့ထားသော output (2K tokens)  ──▶ LLM သို့
        │
        └─▶ မူရင်း output (10K tokens)       ──▶ DB ထဲတွင် သိမ်းဆည်းထားသည်
                                                  (request_id ဖြင့် ချိတ်ဆက်ထားသည်)
```

### မူရင်း Output သိမ်းဆည်းမှုကို ဖွင့်ခြင်း

**Request တစ်ခုချင်းအလိုက်** (combo config ထဲတွင်):

```json
{
  "compression": {
    "engine": "rtk",
    "intensity": "aggressive",
    "rawOutput": {
      "enabled": true,
      "maxBytes": 1048576 // 1MB အများဆုံးကန့်သတ်ချက်
    }
  }
}
```

**မူလသတ်မှတ်ချက်**: `rawOutput.enabled: false` (storage ကို ချွေတာပေးသည်)။

### Storage ကုန်ကျစရိတ်

| Request တစ်ခုချင်းလျှင်        | 1MB အများဆုံး | 10MB အများဆုံး |
| ------------------------------ | ------------- | -------------- |
| ပျမ်းမျှ ချုံ့ထားသော output    | ~5KB          | ~5KB           |
| သိမ်းဆည်းထားသော မူရင်း output  | ~50-500KB     | ~500KB-5MB     |
| တစ်ရက်လျှင် request 1000 ဖြင့် | 50-500MB/day  | 500MB-5GB/day  |

> **အကြံပြုချက်**: မူရင်း output ကို အမြဲဖွင့်ထားခြင်းမဟုတ်ဘဲ **debugging session များ** သို့မဟုတ် **နမူနာရွေးချယ်ထားသော audit များ** အတွက်သာ ဖွင့်ပါ။

### မူရင်းကို ပြန်လည်ရယူခြင်း

```ts
import { readRtkRawOutput } from "omniroute/compression/engines/rtk/rawOutput";

const raw = readRtkRawOutput(pointerId); // compression stats မှ pointerId
if (raw) {
  console.log("Original output:", raw);
}
```

ချုံ့ပြီးနောက် `CompressionStats.rtkRawOutputPointers[]` ထဲတွင် `pointerId` ကို ပြန်ပေးသည်။
Function signature အတွက် `open-sse/services/compression/engines/rtk/rawOutput.ts:102` ကို ကြည့်ပါ။

### Verify Gate

**RTK Filter Verification** (`open-sse/services/compression/engines/rtk/verify.ts`) သည် filter အားလုံးကို ၎င်းတို့၏ `tests[]` များနှင့် တိုက်ဆိုင်စစ်ဆေးပြီး intensity အဆင့် 3 ဆင့်လုံးတွင် အပြုအမူ မှန်ကန်ကြောင်း အတည်ပြုသည်။

Verification ပြုလုပ်ရန် **`runRtkFilterTests()` ကို ခေါ်ပါ**:

```ts
import { runRtkFilterTests } from "open-sse/services/compression/engines/rtk/verify";

const result = runRtkFilterTests();
console.log(`Passed: ${result.outcomes.filter((o) => o.passed).length}`);
console.log(`Failed: ${result.outcomes.filter((o) => !o.passed).length}`);
if (!result.passed) {
  console.error("Filters failed verification");
  result.outcomes
    .filter((o) => !o.passed)
    .forEach((o) => {
      console.error(
        `  - ${o.filterId} / ${o.testName}: expected "${o.expected}", got "${o.actual}"`
      );
    });
}
```

**၎င်းက စစ်ဆေးအတည်ပြုသည့်အရာများ**:

1. Filter တိုင်းကို load လုပ်နိုင်ပြီး schema validation ကို အောင်မြင်သည်
2. `tests[]` entry တိုင်းသည် မျှော်မှန်းထားသော output ကို ထုတ်ပေးသည်
3. `minimal` intensity သည် no-op ဖြစ်သည် (မူရင်းကို ထိန်းသိမ်းပြီး structural filter များကိုသာ အသုံးပြုသည်)
4. `aggressive` intensity သည် error များ၊ test failure များနှင့် stack trace များကို ထိန်းသိမ်းထားသည်
5. ချုံ့ထားသော output သည် မူရင်း input ထက် မည်သည့်အခါမျှ ပိုမကြီးပါ

- Source: `open-sse/services/compression/engines/rtk/` (ဖိုင် 63 ခု၊ ~70KB)

- **Filter ပြောင်းလဲမှုကို merge မလုပ်မီ** — test များ အောင်မြင်ကြောင်း အမြဲသေချာစေပါ
- **RTK engine ကို upgrade လုပ်ပြီးနောက်** — schema ပြောင်းလဲသွားနိုင်သည်
- **Monitoring အတွင်း အခါအားလျော်စွာ** — test fixture များတွင် drift ဖြစ်ပေါ်ခြင်းမှ ကာကွယ်ပေးသည်
- **Tool/command family အသစ်တစ်ခု ထည့်သွင်းသည့်အခါ** — filter အသစ် အလုပ်လုပ်ကြောင်း သက်သေပြသည်

---

## ထပ်မံကြည့်ရှုရန်

- [COMPRESSION_GUIDE.md](./COMPRESSION_GUIDE.md) — ဖိသိပ်မှု pipeline အပြည့်အစုံ၏ ခြုံငုံသုံးသပ်ချက်
- [COMPRESSION_ENGINES.md](./COMPRESSION_ENGINES.md) — Engine registry နှင့် ထည့်သွင်းပေးထားသော engine များ
- [EXTENDING_COMPRESSION.md](./EXTENDING_COMPRESSION.md) — စိတ်ကြိုက် engine များ၊ language pack များနှင့် အထပ်လိုက် pipeline များ
- ရင်းမြစ်: `open-sse/services/compression/engines/rtk/` (ဖိုင် 63 ခု၊ ~70KB)
