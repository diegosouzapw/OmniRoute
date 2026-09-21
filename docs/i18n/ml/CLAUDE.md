# CLAUDE.md (മലയാളം)

🌐 **Languages:** 🇺🇸 [English](../../../CLAUDE.md) · 🇪🇹 [am](../am/CLAUDE.md) · 🇸🇦 [ar](../ar/CLAUDE.md) · 🇦🇿 [az](../az/CLAUDE.md) · 🇧🇬 [bg](../bg/CLAUDE.md) · 🇧🇩 [bn](../bn/CLAUDE.md) · 🇨🇿 [cs](../cs/CLAUDE.md) · 🇩🇰 [da](../da/CLAUDE.md) · 🇩🇪 [de](../de/CLAUDE.md) · 🇬🇷 [el](../el/CLAUDE.md) · 🇪🇸 [es](../es/CLAUDE.md) · 🇪🇪 [et](../et/CLAUDE.md) · 🇮🇷 [fa](../fa/CLAUDE.md) · 🇫🇮 [fi](../fi/CLAUDE.md) · 🇫🇷 [fr](../fr/CLAUDE.md) · 🇮🇪 [ga](../ga/CLAUDE.md) · 🇮🇳 [gu](../gu/CLAUDE.md) · 🇳🇬 [ha](../ha/CLAUDE.md) · 🇮🇱 [he](../he/CLAUDE.md) · 🇮🇳 [hi](../hi/CLAUDE.md) · 🇭🇷 [hr](../hr/CLAUDE.md) · 🇭🇺 [hu](../hu/CLAUDE.md) · 🇦🇲 [hy](../hy/CLAUDE.md) · 🇮🇩 [id](../id/CLAUDE.md) · 🇳🇬 [ig](../ig/CLAUDE.md) · 🇮🇹 [it](../it/CLAUDE.md) · 🇯🇵 [ja](../ja/CLAUDE.md) · 🇬🇪 [ka](../ka/CLAUDE.md) · 🇰🇭 [km](../km/CLAUDE.md) · 🇮🇳 [kn](../kn/CLAUDE.md) · 🇰🇷 [ko](../ko/CLAUDE.md) · 🇱🇹 [lt](../lt/CLAUDE.md) · 🇱🇻 [lv](../lv/CLAUDE.md) · 🇮🇳 [mr](../mr/CLAUDE.md) · 🇲🇾 [ms](../ms/CLAUDE.md) · 🇲🇹 [mt](../mt/CLAUDE.md) · 🇲🇲 [my](../my/CLAUDE.md) · 🇳🇵 [ne](../ne/CLAUDE.md) · 🇳🇱 [nl](../nl/CLAUDE.md) · 🇳🇴 [no](../no/CLAUDE.md) · 🇮🇳 [or](../or/CLAUDE.md) · 🇮🇳 [pa](../pa/CLAUDE.md) · 🇵🇭 [phi](../phi/CLAUDE.md) · 🇵🇱 [pl](../pl/CLAUDE.md) · 🇵🇹 [pt](../pt/CLAUDE.md) · 🇧🇷 [pt-BR](../pt-BR/CLAUDE.md) · 🇷🇴 [ro](../ro/CLAUDE.md) · 🇷🇺 [ru](../ru/CLAUDE.md) · 🇱🇰 [si](../si/CLAUDE.md) · 🇸🇰 [sk](../sk/CLAUDE.md) · 🇸🇮 [sl](../sl/CLAUDE.md) · 🇷🇸 [sr](../sr/CLAUDE.md) · 🇸🇪 [sv](../sv/CLAUDE.md) · 🇰🇪 [sw](../sw/CLAUDE.md) · 🇮🇳 [ta](../ta/CLAUDE.md) · 🇮🇳 [te](../te/CLAUDE.md) · 🇹🇭 [th](../th/CLAUDE.md) · 🇹🇷 [tr](../tr/CLAUDE.md) · 🇺🇦 [uk-UA](../uk-UA/CLAUDE.md) · 🇵🇰 [ur](../ur/CLAUDE.md) · 🇺🇿 [uz](../uz/CLAUDE.md) · 🇻🇳 [vi](../vi/CLAUDE.md) · 🇳🇬 [yo](../yo/CLAUDE.md) · 🇨🇳 [zh-CN](../zh-CN/CLAUDE.md) · 🇹🇼 [zh-TW](../zh-TW/CLAUDE.md)

---

@AGENTS.md

**എല്ലാ പ്രോജക്റ്റ് നിയമങ്ങളും [`AGENTS.md`](AGENTS.md)-ലാണ് ഉള്ളത്** — ഓരോ AI
അസിസ്റ്റന്റിനുമുള്ള ഏക ആധികാരിക ഉറവിടം (ആർക്കിടെക്ചർ, കൺവെൻഷനുകൾ, ടെസ്റ്റിംഗ്, ക്വാളിറ്റി ഗേറ്റുകൾ, git വർക്ക്ഫ്ലോ, 23 കർശന നിയമങ്ങൾ,
PII സംബന്ധിച്ച പഠനങ്ങൾ). അത് പൂർണ്ണമായി വായിക്കുക; പ്രോജക്റ്റ് നിയമങ്ങൾ ഇവിടെ വീണ്ടും ചേർക്കരുത്. താഴെയുള്ളതെല്ലാം
Claude Code-ന് മാത്രം ബാധകമാണ് — `AGENTS.md`-ൽ ഇതിനകം നിർവചിച്ചിട്ടുള്ള നിയമങ്ങളുടെ പ്രവർത്തനപരമായ പരിഷ്കരണങ്ങൾ.

## Worktree ഒറ്റപ്പെടുത്തൽ — Claude Code-നുള്ള പ്രത്യേക നിർദ്ദേശങ്ങൾ

പൂർണ്ണമായ നിർബന്ധിത worktree പ്രോട്ടോക്കോൾ (base branch സ്ഥിരീകരണം, `.claude/worktrees/` കാനോണിക്കൽ
പാത, `cp -al` node_modules, നീക്കംചെയ്യൽ നിയമങ്ങൾ) `AGENTS.md` → Git Workflow → "Worktree
isolation" എന്നതിലുണ്ട്. Claude Code-നുള്ള പ്രത്യേക കാര്യങ്ങൾ:

- ഓപ്പറേറ്റർ ഇതിനകം അറിയിച്ചിട്ടില്ലെങ്കിൽ, `AskUserQuestion` വഴി base branch സ്ഥിരീകരിക്കുക
  (കർശന നിയമം #19).
- നേറ്റീവ് `EnterWorktree` ടൂൾ ഉപയോഗിക്കുന്നതിന് മുൻഗണന നൽകുക — അത് ഇതിനകം
  `.claude/worktrees/`-ന് കീഴിലാണ് worktree-കൾ സൃഷ്ടിക്കുന്നത് (കാനോണിക്കൽ പാത). രേഖപ്പെടുത്തിയ `git
worktree add` കമാൻഡ് ഉപയോഗിച്ച് worktree സൃഷ്ടിച്ചശേഷം, അതിന്റെ `path` ഉപയോഗിച്ച് `EnterWorktree` വിളിക്കുക.

## സെഷനുകൾക്കിടയിലെ സുരക്ഷ — Claude Code-നുള്ള പ്രത്യേക നിർദ്ദേശങ്ങൾ

കർശന നിയമങ്ങൾ #19/#21/#22 (`AGENTS.md`-ൽ) സമാന്തര സെഷനുകളെ നിയന്ത്രിക്കുന്നു. ഈ
ഹാർനെസിനുള്ള പ്രവർത്തനപരമായ ഓർമ്മപ്പെടുത്തലുകൾ:

- **git കൈകാര്യം ചെയ്യുന്ന ഓരോ subagent-ന്റെയും prompt-ൽ `git stash` നിരോധനം അതേപടി ആവർത്തിക്കുക**
  (Agent tool / Workflow scripts) — subagent-ുകൾക്ക് ഈ ഫയൽ പാരമ്പര്യമായി ലഭിക്കില്ല; കൂടാതെ stash സംഭവം
  വീണ്ടും ഉണ്ടായതായി രേഖപ്പെടുത്തിയത് ഒരു subagent വഴിയായിരുന്നു.
- _ഈ സെഷനിൽ_ നിങ്ങൾ സൃഷ്ടിക്കാത്ത ഏതെങ്കിലും PR merge ചെയ്യുന്നതിനോ push ചെയ്യുന്നതിനോ മുമ്പ്, `git worktree list`
  പ്രവർത്തിപ്പിച്ച് `gh pr view <N> --json state,headRefOid` വീണ്ടും പരിശോധിക്കുക (കർശന നിയമം #22b).
- ഓരോ സെഷനും അവസാനിപ്പിക്കുമ്പോൾ, പ്രധാന checkout ആരംഭിച്ച അതേ branch-ൽ തന്നെയാണെന്ന് ഉറപ്പാക്കുക.

## Superpowers / പ്ലാനിംഗ് ആർട്ടിഫാക്റ്റുകൾ — പാതാ ഓവർറൈഡുകൾ

`_tasks/` കൺവെൻഷൻ `AGENTS.md` → "Planning & Research Artifacts" എന്നതിൽ നിർവചിച്ചിട്ടുണ്ട്.
superpowers skills-നൊപ്പം വരുന്ന ഡിഫോൾട്ടുകൾ `docs/…`-ലേക്ക് ചൂണ്ടുന്നതാണ് — ആ ഡിഫോൾട്ടുകൾ ഇവിടെ
**ഓവർറൈഡ് ചെയ്തിരിക്കുന്നു**. ഒരു superpowers skill "saved to `docs/superpowers/plans/…`" പോലുള്ള ഒരു പാത പ്രഖ്യാപിക്കുമ്പോൾ,
എഴുതുന്നതിന് മുമ്പ് അത് തത്തുല്യമായ `_tasks/…` പാതയിലേക്ക് മാറ്റുക:

| ആർട്ടിഫാക്റ്റ് (skill)                      | ഡിഫോൾട്ട് (ഉപയോഗിക്കരുത്) | പകരം ഇവിടെ സംരക്ഷിക്കുക                                       |
| ------------------------------------------- | ------------------------- | ------------------------------------------------------------- |
| പ്ലാനുകൾ (`writing-plans`)                  | `docs/superpowers/plans/` | `_tasks/superpowers/plans/YYYY-MM-DD-<feature>.md`            |
| സ്പെസിഫിക്കേഷനുകൾ / ഡിസൈൻ (`brainstorming`) | `docs/superpowers/specs/` | `_tasks/superpowers/specs/YYYY-MM-DD-<topic>-design.md`       |
| ഗവേഷണം (`deep-research`, ad-hoc)            | `docs/research/`          | `_tasks/research/…`                                           |
| കൈമാറ്റങ്ങൾ (`/handoff`)                    | —                         | `_tasks/hands-off/<YYYY-MM-DD>_<branch>_v<versão>_sess-<id>/` |

ആ ആർട്ടിഫാക്റ്റുകൾ പ്രധാന repo-യിൽ ഒരിക്കലും commit ചെയ്യാതെ, `_tasks/` repo-യ്ക്കുള്ളിൽ
(`git -C _tasks …`) commit ചെയ്യുക.

## Scratch / താൽക്കാലിക ഫയലുകൾ — `/tmp` അല്ല, `_artifacts/` ഉപയോഗിക്കുക

ഈ പ്രോജക്റ്റ് ഹാർനെസിന്റെ ഡിഫോൾട്ട് സെഷൻ scratchpad (`/tmp/claude-*/…`) ഓവർറൈഡ് ചെയ്യുന്നു.
താൽക്കാലിക/പ്രവർത്തന ഫയലുകൾ — exports, സൃഷ്ടിച്ച zip-കൾ, ഒറ്റത്തവണ ഉപയോഗിക്കുന്ന ഇടക്കാല outputs, സാധാരണയായി
`/tmp`-ൽ ഇടുമായിരുന്ന മറ്റെന്തും — പകരം `/home/diegosouzapw/dev/proxys/OmniRoute/_artifacts/`-ൽ എഴുതുക.

- `_artifacts/` ഒരു root `_*` പാതയാണ്: ഇതിനകം gitignore ചെയ്തിട്ടുണ്ട് (`AGENTS.md` → "Root `_*` paths"), ഡിസ്കിൽ
  മാത്രം നിലനിൽക്കും, ഒരിക്കലും track ചെയ്യപ്പെടില്ല.
- കാരണം: scratch output പ്രോജക്റ്റിനുള്ളിൽ സൂക്ഷിക്കുന്നത് (`/tmp`-ന് പകരം), അപ്രത്യക്ഷമാകുകയോ
  track ചെയ്യപ്പെടാതെ കുമിഞ്ഞുകൂടുകയോ ചെയ്യുന്ന താൽക്കാലിക session-specific `/tmp` ഡയറക്ടറികളിലാകെ തിരയുന്നതിനുപകരം,
  താൽക്കാലികമായ എല്ലാം ഒരിടത്ത് കണ്ടെത്താനും ഇല്ലാതാക്കാനും ഓപ്പറേറ്റർക്ക് എളുപ്പമാക്കുന്നു.
- ഇതിനെ `_tasks/`-മായി തെറ്റിദ്ധരിക്കരുത് (കർശന നിയമം #23, ദീർഘകാലം സൂക്ഷിക്കേണ്ട
  plans/specs/research/hand-offs-നുള്ള അതിന്റെ സ്വന്തം സ്വകാര്യ git repo) — `_artifacts/` ഉപേക്ഷിക്കാവുന്ന പ്രവർത്തന ഫയലുകൾക്ക് മാത്രമാണ്;
  ഇവിടെയുള്ള ഒന്നും നിലനിർത്തുകയോ version ചെയ്യുകയോ വേണ്ടതില്ല.

## PR-കൾ തുറക്കുന്നതിന് മുമ്പ് base-green ഉറപ്പാക്കുക

ഒരു branch സൃഷ്ടിക്കുന്നതിനോ PR തുറക്കുന്നതിനോ മുമ്പ്, base-green പരിശോധന പ്രവർത്തിപ്പിക്കുക (`AGENTS.md` → Git Workflow →
"Base-green check"; പ്രോജക്റ്റ് skills ഇതിനെ `.agents/skills/_shared/base-green.md` എന്ന് പരാമർശിക്കുന്നു). base tip red ആയിരിക്കുമ്പോൾ
തുറക്കുന്ന PR-ന്റെ body-യിൽ `⚠️ base-red inherited: #<issue>` ഉണ്ടായിരിക്കണം. കുമിഞ്ഞുകൂടിയ red അവസ്ഥ
(base tip + red PR-കൾ) പരിഹരിക്കാൻ `/sweep-reds` skill ഉപയോഗിക്കുക.
