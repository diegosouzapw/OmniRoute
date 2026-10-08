# CLAUDE.md (မြန်မာ)

🌐 **Languages:** 🇺🇸 [English](../../../CLAUDE.md) · 🇪🇹 [am](../am/CLAUDE.md) · 🇸🇦 [ar](../ar/CLAUDE.md) · 🇦🇿 [az](../az/CLAUDE.md) · 🇧🇬 [bg](../bg/CLAUDE.md) · 🇧🇩 [bn](../bn/CLAUDE.md) · 🇧🇦 [bs](../bs/CLAUDE.md) · 🇨🇿 [cs](../cs/CLAUDE.md) · 🇩🇰 [da](../da/CLAUDE.md) · 🇩🇪 [de](../de/CLAUDE.md) · 🇬🇷 [el](../el/CLAUDE.md) · 🇪🇸 [es](../es/CLAUDE.md) · 🇪🇪 [et](../et/CLAUDE.md) · 🇮🇷 [fa](../fa/CLAUDE.md) · 🇫🇮 [fi](../fi/CLAUDE.md) · 🇫🇷 [fr](../fr/CLAUDE.md) · 🇮🇪 [ga](../ga/CLAUDE.md) · 🇮🇳 [gu](../gu/CLAUDE.md) · 🇳🇬 [ha](../ha/CLAUDE.md) · 🇮🇱 [he](../he/CLAUDE.md) · 🇮🇳 [hi](../hi/CLAUDE.md) · 🇭🇷 [hr](../hr/CLAUDE.md) · 🇭🇺 [hu](../hu/CLAUDE.md) · 🇦🇲 [hy](../hy/CLAUDE.md) · 🇮🇩 [id](../id/CLAUDE.md) · 🇳🇬 [ig](../ig/CLAUDE.md) · 🇮🇹 [it](../it/CLAUDE.md) · 🇯🇵 [ja](../ja/CLAUDE.md) · 🇬🇪 [ka](../ka/CLAUDE.md) · 🇰🇭 [km](../km/CLAUDE.md) · 🇮🇳 [kn](../kn/CLAUDE.md) · 🇰🇷 [ko](../ko/CLAUDE.md) · 🇱🇹 [lt](../lt/CLAUDE.md) · 🇱🇻 [lv](../lv/CLAUDE.md) · 🇮🇳 [ml](../ml/CLAUDE.md) · 🇮🇳 [mr](../mr/CLAUDE.md) · 🇲🇾 [ms](../ms/CLAUDE.md) · 🇲🇹 [mt](../mt/CLAUDE.md) · 🇳🇵 [ne](../ne/CLAUDE.md) · 🇳🇱 [nl](../nl/CLAUDE.md) · 🇳🇴 [no](../no/CLAUDE.md) · 🇮🇳 [or](../or/CLAUDE.md) · 🇮🇳 [pa](../pa/CLAUDE.md) · 🇵🇭 [phi](../phi/CLAUDE.md) · 🇵🇱 [pl](../pl/CLAUDE.md) · 🇵🇹 [pt](../pt/CLAUDE.md) · 🇧🇷 [pt-BR](../pt-BR/CLAUDE.md) · 🇷🇴 [ro](../ro/CLAUDE.md) · 🇷🇺 [ru](../ru/CLAUDE.md) · 🇱🇰 [si](../si/CLAUDE.md) · 🇸🇰 [sk](../sk/CLAUDE.md) · 🇸🇮 [sl](../sl/CLAUDE.md) · 🇷🇸 [sr](../sr/CLAUDE.md) · 🇸🇪 [sv](../sv/CLAUDE.md) · 🇰🇪 [sw](../sw/CLAUDE.md) · 🇮🇳 [ta](../ta/CLAUDE.md) · 🇮🇳 [te](../te/CLAUDE.md) · 🇹🇭 [th](../th/CLAUDE.md) · 🇹🇷 [tr](../tr/CLAUDE.md) · 🇺🇦 [uk-UA](../uk-UA/CLAUDE.md) · 🇵🇰 [ur](../ur/CLAUDE.md) · 🇺🇿 [uz](../uz/CLAUDE.md) · 🇻🇳 [vi](../vi/CLAUDE.md) · 🇳🇬 [yo](../yo/CLAUDE.md) · 🇨🇳 [zh-CN](../zh-CN/CLAUDE.md) · 🇹🇼 [zh-TW](../zh-TW/CLAUDE.md)

---

@AGENTS.md

**ပရောဂျက်စည်းမျဉ်းအားလုံးကို [`AGENTS.md`](AGENTS.md) တွင် ထည့်သွင်းထားပါသည်** — AI
assistant အားလုံးအတွက် တစ်ခုတည်းသော အမှန်တရားရင်းမြစ်ဖြစ်သည် (architecture၊ conventions၊ testing၊ quality gates၊ git workflow၊ Hard Rules ၂၃ ချက်၊
PII learnings)။ အပြည့်အစုံဖတ်ရှုပါ၊ ပရောဂျက်စည်းမျဉ်းများကို ဤနေရာတွင် ထပ်မံမထည့်ပါနှင့်။ အောက်ပါအချက်အားလုံးသည် Claude Code
အတွက်သာ သက်ဆိုင်ပြီး `AGENTS.md` တွင် သတ်မှတ်ထားပြီးဖြစ်သော စည်းမျဉ်းများ၏ လုပ်ငန်းဆောင်ရွက်မှုဆိုင်ရာ ပြင်ဆင်ချက်များဖြစ်သည်။

## Worktree သီးခြားခွဲထားမှု — Claude Code ဆိုင်ရာ သီးသန့်အချက်များ

မဖြစ်မနေလိုက်နာရမည့် worktree protocol အပြည့်အစုံ (base branch အတည်ပြုခြင်း၊ `.claude/worktrees/` canonical
path၊ `cp -al` node_modules၊ ဖယ်ရှားသိမ်းဆည်းမှုစည်းမျဉ်းများ) ကို `AGENTS.md` → Git Workflow → "Worktree
isolation" တွင် ဖော်ပြထားသည်။ Claude-Code ဆိုင်ရာ သီးသန့်အချက်များမှာ-

- Operator က ကြိုတင်ပြောထားခြင်းမရှိပါက base branch ကို `AskUserQuestion` မှတစ်ဆင့် အတည်ပြုပါ
  (Hard Rule #19)။
- Native `EnterWorktree` tool ကို ဦးစားပေးအသုံးပြုပါ — ၎င်းသည် canonical path ဖြစ်သော
  `.claude/worktrees/` အောက်တွင် worktree များကို ဖန်တီးပြီးဖြစ်သည်။ မှတ်တမ်းတင်ထားသော `git
worktree add` command ဖြင့် worktree ကို ဖန်တီးပြီးနောက် ၎င်း၏ `path` ဖြင့် `EnterWorktree` ကို ခေါ်ပါ။

## Session များအကြား ဘေးကင်းလုံခြုံမှု — Claude Code ဆိုင်ရာ သီးသန့်အချက်များ

`AGENTS.md` ရှိ Hard Rules #19/#21/#22 သည် parallel session များကို ထိန်းချုပ်သည်။ ဤ
harness အတွက် လုပ်ငန်းဆောင်ရွက်မှုဆိုင်ရာ သတိပေးချက်များမှာ-

- **git ကို ထိတွေ့သည့် subagent တိုင်း၏ prompt တွင် `git stash` တားမြစ်ချက်ကို စာသားအတိုင်း ထပ်မံထည့်သွင်းပါ**
  (Agent tool / Workflow scripts) — subagent များသည် ဤဖိုင်ကို အမွေဆက်ခံခြင်းမရှိသည့်အပြင်၊ မှတ်တမ်းတင်ထားသော
  stash ဖြစ်ရပ် ထပ်မံဖြစ်ပွားမှုမှာလည်း subagent မှတစ်ဆင့် ဖြစ်ပေါ်ခဲ့သည်။
- _ဤ session တွင်_ သင်မဖန်တီးခဲ့သော PR တစ်ခုခုကို merge သို့မဟုတ် push မလုပ်မီ `git worktree list`
  ကို run ပြီး `gh pr view <N> --json state,headRefOid` ကို ထပ်မံစစ်ဆေးပါ (Hard Rule #22b)။
- Session တိုင်း၏အဆုံးတွင် main checkout ကို ၎င်းစတင်ခဲ့သည့် branch ပေါ်တွင် ထားရှိပါ။

## Superpowers / စီမံကိန်းရေးဆွဲမှု artifact များ — path အစားထိုးသတ်မှတ်ချက်များ

`_tasks/` convention ကို `AGENTS.md` → "Planning & Research Artifacts" တွင် သတ်မှတ်ထားသည်။
Superpowers skill များ၏ မူလ default များသည် `docs/…` ကို ညွှန်ပြသည် — ထို default များကို **ဤနေရာတွင်
အစားထိုးသတ်မှတ်ထားသည်**။ Superpowers skill တစ်ခုက "saved to `docs/superpowers/plans/…`" ကဲ့သို့သော path တစ်ခုကို ကြေညာသည့်အခါ
မရေးသားမီ ၎င်းကို သက်ဆိုင်ရာ `_tasks/…` path သို့ ပြန်လည်ရေးသားပါ-

| Artifact (skill)                             | Default (မသုံးရ)          | ဤနေရာတွင် အစားထိုးသိမ်းဆည်းရန်                                |
| -------------------------------------------- | ------------------------- | ------------------------------------------------------------- |
| စီမံကိန်းများ (`writing-plans`)              | `docs/superpowers/plans/` | `_tasks/superpowers/plans/YYYY-MM-DD-<feature>.md`            |
| သတ်မှတ်ချက်များ / ဒီဇိုင်း (`brainstorming`) | `docs/superpowers/specs/` | `_tasks/superpowers/specs/YYYY-MM-DD-<topic>-design.md`       |
| သုတေသန (`deep-research`, ad-hoc)             | `docs/research/`          | `_tasks/research/…`                                           |
| လွှဲပြောင်းပေးအပ်မှုများ (`/handoff`)        | —                         | `_tasks/hands-off/<YYYY-MM-DD>_<branch>_v<versão>_sess-<id>/` |

ထို artifact များကို main repo တွင် မဟုတ်ဘဲ `_tasks/` repo အတွင်းတွင် commit လုပ်ပါ (`git -C _tasks …`)။

## Scratch / ယာယီဖိုင်များ — `/tmp` မဟုတ်ဘဲ `_artifacts/` ကို အသုံးပြုပါ

ဤပရောဂျက်သည် harness ၏ မူလ session scratchpad (`/tmp/claude-*/…`) ကို အစားထိုးသတ်မှတ်ထားသည်။
ယာယီ/လုပ်ငန်းသုံးဖိုင်များ — exports၊ ထုတ်လုပ်ထားသော zip များ၊ တစ်ကြိမ်သုံး အလယ်အလတ် output များနှင့် ပုံမှန်အားဖြင့်
`/tmp` ထဲသို့ ထည့်မည့် မည်သည့်အရာမဆို — ကို `/home/diegosouzapw/dev/proxys/OmniRoute/_artifacts/` တွင် အစားထိုးရေးသားပါ။

- `_artifacts/` သည် root `_*` path တစ်ခုဖြစ်သည်- gitignore ထဲတွင် ထည့်သွင်းပြီးဖြစ်ကာ (`AGENTS.md` → "Root `_*` paths")
  disk ပေါ်တွင်သာ ရှိပြီး မည်သည့်အခါမျှ track မလုပ်ပါ။
- အကြောင်းရင်း- scratch output ကို ပရောဂျက်အတွင်းတွင် ထားရှိခြင်းသည် (`/tmp` နှင့် နှိုင်းယှဉ်ပါက) operator အတွက်
  ယာယီအရာအားလုံးကို တစ်နေရာတည်းတွင် အလွယ်တကူ ရှာဖွေဖျက်ပစ်နိုင်စေပြီး၊ ပျောက်ကွယ်သွားနိုင်သည့် သို့မဟုတ် untracked အဖြစ်
  စုပုံလာနိုင်သည့် session သီးသန့် `/tmp` directory များအနှံ့ လိုက်လံရှာဖွေရန် မလိုတော့ပါ။
- ၎င်းကို `_tasks/` နှင့် **မရောထွေးပါနှင့်** (Hard Rule #23၊ ရေရှည်တည်တံ့သော
  စီမံကိန်းများ/သတ်မှတ်ချက်များ/သုတေသနများ/လွှဲပြောင်းပေးအပ်မှုများအတွက် ကိုယ်ပိုင် private git repo) — `_artifacts/` သည် စွန့်ပစ်နိုင်သော လုပ်ငန်းသုံးဖိုင်များအတွက်သာဖြစ်ပြီး၊
  ဤနေရာရှိ မည်သည့်အရာကိုမျှ ရေရှည်ထိန်းသိမ်းရန် သို့မဟုတ် version ထိန်းချုပ်ရန် မလိုအပ်ပါ။

## PR များမဖွင့်မီ Base-green ဖြစ်ကြောင်း စစ်ဆေးခြင်း

Branch တစ်ခုခွဲထုတ်ခြင်း သို့မဟုတ် PR တစ်ခုဖွင့်ခြင်းမပြုမီ base-green check ကို run ပါ (`AGENTS.md` → Git Workflow →
"Base-green check"; project skill များတွင် ၎င်းကို `.agents/skills/_shared/base-green.md` အဖြစ် ရည်ညွှန်းထားသည်)။ Base tip သည် red ဖြစ်နေချိန်တွင် ဖွင့်ထားသော PR တစ်ခု၏ body တွင် `⚠️ base-red inherited: #<issue>` ကို ထည့်သွင်းရမည်။
စုပုံနေသော red state (base tip + red PR များ) ကို ဖြေရှင်းရှင်းလင်းရန် `/sweep-reds` skill ကို အသုံးပြုပါ။
