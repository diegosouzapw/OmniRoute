# CLAUDE.md (አማርኛ)

🌐 **Languages:** 🇺🇸 [English](../../../CLAUDE.md) · 🇸🇦 [ar](../ar/CLAUDE.md) · 🇦🇿 [az](../az/CLAUDE.md) · 🇧🇬 [bg](../bg/CLAUDE.md) · 🇧🇩 [bn](../bn/CLAUDE.md) · 🇨🇿 [cs](../cs/CLAUDE.md) · 🇩🇰 [da](../da/CLAUDE.md) · 🇩🇪 [de](../de/CLAUDE.md) · 🇬🇷 [el](../el/CLAUDE.md) · 🇪🇸 [es](../es/CLAUDE.md) · 🇪🇪 [et](../et/CLAUDE.md) · 🇮🇷 [fa](../fa/CLAUDE.md) · 🇫🇮 [fi](../fi/CLAUDE.md) · 🇫🇷 [fr](../fr/CLAUDE.md) · 🇮🇪 [ga](../ga/CLAUDE.md) · 🇮🇳 [gu](../gu/CLAUDE.md) · 🇳🇬 [ha](../ha/CLAUDE.md) · 🇮🇱 [he](../he/CLAUDE.md) · 🇮🇳 [hi](../hi/CLAUDE.md) · 🇭🇷 [hr](../hr/CLAUDE.md) · 🇭🇺 [hu](../hu/CLAUDE.md) · 🇦🇲 [hy](../hy/CLAUDE.md) · 🇮🇩 [id](../id/CLAUDE.md) · 🇳🇬 [ig](../ig/CLAUDE.md) · 🇮🇹 [it](../it/CLAUDE.md) · 🇯🇵 [ja](../ja/CLAUDE.md) · 🇬🇪 [ka](../ka/CLAUDE.md) · 🇰🇭 [km](../km/CLAUDE.md) · 🇮🇳 [kn](../kn/CLAUDE.md) · 🇰🇷 [ko](../ko/CLAUDE.md) · 🇱🇹 [lt](../lt/CLAUDE.md) · 🇱🇻 [lv](../lv/CLAUDE.md) · 🇮🇳 [ml](../ml/CLAUDE.md) · 🇮🇳 [mr](../mr/CLAUDE.md) · 🇲🇾 [ms](../ms/CLAUDE.md) · 🇲🇹 [mt](../mt/CLAUDE.md) · 🇲🇲 [my](../my/CLAUDE.md) · 🇳🇵 [ne](../ne/CLAUDE.md) · 🇳🇱 [nl](../nl/CLAUDE.md) · 🇳🇴 [no](../no/CLAUDE.md) · 🇮🇳 [or](../or/CLAUDE.md) · 🇮🇳 [pa](../pa/CLAUDE.md) · 🇵🇭 [phi](../phi/CLAUDE.md) · 🇵🇱 [pl](../pl/CLAUDE.md) · 🇵🇹 [pt](../pt/CLAUDE.md) · 🇧🇷 [pt-BR](../pt-BR/CLAUDE.md) · 🇷🇴 [ro](../ro/CLAUDE.md) · 🇷🇺 [ru](../ru/CLAUDE.md) · 🇱🇰 [si](../si/CLAUDE.md) · 🇸🇰 [sk](../sk/CLAUDE.md) · 🇸🇮 [sl](../sl/CLAUDE.md) · 🇷🇸 [sr](../sr/CLAUDE.md) · 🇸🇪 [sv](../sv/CLAUDE.md) · 🇰🇪 [sw](../sw/CLAUDE.md) · 🇮🇳 [ta](../ta/CLAUDE.md) · 🇮🇳 [te](../te/CLAUDE.md) · 🇹🇭 [th](../th/CLAUDE.md) · 🇹🇷 [tr](../tr/CLAUDE.md) · 🇺🇦 [uk-UA](../uk-UA/CLAUDE.md) · 🇵🇰 [ur](../ur/CLAUDE.md) · 🇺🇿 [uz](../uz/CLAUDE.md) · 🇻🇳 [vi](../vi/CLAUDE.md) · 🇳🇬 [yo](../yo/CLAUDE.md) · 🇨🇳 [zh-CN](../zh-CN/CLAUDE.md) · 🇹🇼 [zh-TW](../zh-TW/CLAUDE.md)

---

@AGENTS.md

**ሁሉም የፕሮጀክት ደንቦች በ[`AGENTS.md`](AGENTS.md) ውስጥ ይገኛሉ** — ለእያንዳንዱ AI
ረዳት ብቸኛው የእውነት ምንጭ ነው (አርክቴክቸር፣ ልማዶች፣ ሙከራ፣ የጥራት መግቢያዎች፣ የgit የሥራ ፍሰት፣ 23ቱ ጥብቅ ደንቦች፣
የPII ትምህርቶች)። ሙሉውን ያንብቡ፤ የፕሮጀክት ደንቦችን እዚህ እንደገና አይጨምሩ። ከዚህ በታች ያለው ሁሉ ለClaude Code ብቻ
ይሠራል — በ`AGENTS.md` ውስጥ አስቀድመው የተገለጹ ደንቦች የአሠራር ማሻሻያዎች ናቸው።

## የWorktree መነጠል — የClaude Code ዝርዝሮች

ሙሉው አስገዳጅ የworktree ፕሮቶኮል (የመሠረት branch ማረጋገጫ፣ `.claude/worktrees/` መደበኛ
path፣ `cp -al` node_modules፣ የማፍረስ ደንቦች) በ`AGENTS.md` → Git Workflow → "Worktree
isolation" ውስጥ ይገኛል። ለClaude Code የተለዩ ነጥቦች፦

- ኦፕሬተሩ አስቀድሞ ካልነገረዎት በስተቀር፣ የመሠረት branchን በ`AskUserQuestion` (ጥብቅ ደንብ #19) አረጋግጡ።
- አገርኛውን `EnterWorktree` tool ይምረጡ — እሱ ቀድሞውኑ worktreesን በ
  `.claude/worktrees/` (መደበኛው path) ሥር ይፈጥራል። በሰነድ የተገለጸውን `git
worktree add` command በመጠቀም worktreeውን ይፍጠሩ፣ ከዚያም `EnterWorktree`ን ከ`path` ጋር ይጥሩ።

## የክፍለ-ጊዜ ተሻጋሪ ደህንነት — የClaude Code ዝርዝሮች

ጥብቅ ደንቦች #19/#21/#22 (በ`AGENTS.md` ውስጥ) ትይዩ ክፍለ-ጊዜዎችን ያስተዳድራሉ። ለዚህ
harness የአሠራር ማስታወሻዎች፦

- **gitን በሚነካ እያንዳንዱ subagent prompt ውስጥ የ`git stash` ክልከላን ቃል በቃል ይድገሙ**
  (Agent tool / Workflow scripts) — subagents ይህን ፋይል አይወርሱም፣ እና የstash ክስተቱ በመዝገብ የተያዘው
  ድግግሞሽ በsubagent በኩል ነበር።
- _በዚህ ክፍለ-ጊዜ_ ባልፈጠሩት ማንኛውም PR ላይ merge ወይም push ከማድረግዎ በፊት፣ `git worktree list`ን
  ያስኪዱ እና `gh pr view <N> --json state,headRefOid`ን እንደገና ያረጋግጡ (ጥብቅ ደንብ #22b)።
- እያንዳንዱን ክፍለ-ጊዜ ዋናው checkout በጀመረበት branch ላይ ሆኖ ያጠናቅቁ።

## Superpowers / የዕቅድ artifacts — የpath መሻር

የ`_tasks/` ልማድ በ`AGENTS.md` → "Planning & Research Artifacts" ውስጥ ተገልጿል።
የsuperpowers skills ወደ `docs/…` የሚያመለክቱ defaults ይዘው ይመጣሉ — እነዚያ defaults እዚህ **ተሽረዋል**።
አንድ superpowers skill እንደ "saved to `docs/superpowers/plans/…`" ያለ path ሲያሳውቅ፣ ከመጻፍዎ በፊት
ወደ `_tasks/…` አቻው ይቀይሩት፦

| Artifact (skill)               | Default (አይጠቀሙ)           | በምትኩ እዚህ ያስቀምጡ                                                |
| ------------------------------ | ------------------------- | ------------------------------------------------------------- |
| ዕቅዶች (`writing-plans`)         | `docs/superpowers/plans/` | `_tasks/superpowers/plans/YYYY-MM-DD-<feature>.md`            |
| Specs / ዲዛይን (`brainstorming`) | `docs/superpowers/specs/` | `_tasks/superpowers/specs/YYYY-MM-DD-<topic>-design.md`       |
| ምርምር (`deep-research`, ጊዜያዊ)   | `docs/research/`          | `_tasks/research/…`                                           |
| ርክክቦች (`/handoff`)             | —                         | `_tasks/hands-off/<YYYY-MM-DD>_<branch>_v<versão>_sess-<id>/` |

እነዚያን artifacts በ`_tasks/` repo ውስጥ (`git -C _tasks …`) commit ያድርጉ፤ በዋናው repo ውስጥ ፈጽሞ አያድርጉ።

## Scratch / ጊዜያዊ ፋይሎች — `/tmp`ን ሳይሆን `_artifacts/`ን ይጠቀሙ

ይህ ፕሮጀክት የharnessን default የክፍለ-ጊዜ scratchpad (`/tmp/claude-*/…`) ይሽራል።
ጊዜያዊ/የሥራ ፋይሎችን — exports፣ የተፈጠሩ zips፣ ለአንድ ጊዜ የሚያገለግሉ መካከለኛ outputs፣ እንዲሁም
በሌላ ሁኔታ በ`/tmp` ውስጥ የሚያስቀምጡትን ማንኛውንም ነገር — በምትኩ ወደ `/home/diegosouzapw/dev/proxys/OmniRoute/_artifacts/` ይጻፉ።

- `_artifacts/` root `_*` path ነው፦ አስቀድሞ gitignored ተደርጓል (`AGENTS.md` → "Root `_*` paths")፣ በdisk ላይ ብቻ
  ይኖራል፣ ፈጽሞ tracked አይሆንም።
- ምክንያቱ፦ scratch outputን በፕሮጀክቱ ውስጥ (ከ`/tmp` ይልቅ) ማቆየት ኦፕሬተሩ
  ጊዜያዊ የሆነውን ሁሉ በአንድ ቦታ በቀላሉ እንዲያገኝና እንዲሰርዝ ያስችለዋል፤ ይህም
  የሚጠፉ ወይም untracked ሆነው የሚከማቹ ጊዜያዊ፣ ለየክፍለ-ጊዜው የተለዩ `/tmp` directoriesን ከማሰስ ይልቅ ነው።
- ይህን ከ`_tasks/` (ጥብቅ ደንብ #23፣ ዘላቂ
  ዕቅዶች/specs/ምርምር/ርክክቦች የሚቀመጡበት የራሱ private git repo) ጋር **አያምታቱ** — `_artifacts/` ለሚጣሉ የሥራ ፋይሎች ብቻ ነው፤ እዚህ
  ያለ ምንም ነገር መቆየት ወይም versioned መሆን አያስፈልገውም።

## PRsን ከመክፈት በፊት Base-green

branch ከመፍጠርዎ ወይም PR ከመክፈትዎ በፊት፣ የbase-green checkን (`AGENTS.md` → Git Workflow →
"Base-green check"፤ የፕሮጀክት skills እንደ `.agents/skills/_shared/base-green.md` ይጠቅሱታል) ያስኪዱ። base tip red ሆኖ ሳለ
የተከፈተ PR በbodyው ውስጥ `⚠️ base-red inherited: #<issue>` መያዝ አለበት። የተከማቸ red stateን (base tip + red PRs)
ለማጽዳት፣ `/sweep-reds` skillን ይጠቀሙ።
