# CLAUDE.md (සිංහල)

🌐 **Languages:** 🇺🇸 [English](../../../CLAUDE.md) · 🇪🇹 [am](../am/CLAUDE.md) · 🇸🇦 [ar](../ar/CLAUDE.md) · 🇦🇿 [az](../az/CLAUDE.md) · 🇧🇬 [bg](../bg/CLAUDE.md) · 🇧🇩 [bn](../bn/CLAUDE.md) · 🇧🇦 [bs](../bs/CLAUDE.md) · 🇨🇿 [cs](../cs/CLAUDE.md) · 🇩🇰 [da](../da/CLAUDE.md) · 🇩🇪 [de](../de/CLAUDE.md) · 🇬🇷 [el](../el/CLAUDE.md) · 🇪🇸 [es](../es/CLAUDE.md) · 🇪🇪 [et](../et/CLAUDE.md) · 🇮🇷 [fa](../fa/CLAUDE.md) · 🇫🇮 [fi](../fi/CLAUDE.md) · 🇫🇷 [fr](../fr/CLAUDE.md) · 🇮🇪 [ga](../ga/CLAUDE.md) · 🇮🇳 [gu](../gu/CLAUDE.md) · 🇳🇬 [ha](../ha/CLAUDE.md) · 🇮🇱 [he](../he/CLAUDE.md) · 🇮🇳 [hi](../hi/CLAUDE.md) · 🇭🇷 [hr](../hr/CLAUDE.md) · 🇭🇺 [hu](../hu/CLAUDE.md) · 🇦🇲 [hy](../hy/CLAUDE.md) · 🇮🇩 [id](../id/CLAUDE.md) · 🇳🇬 [ig](../ig/CLAUDE.md) · 🇮🇹 [it](../it/CLAUDE.md) · 🇯🇵 [ja](../ja/CLAUDE.md) · 🇬🇪 [ka](../ka/CLAUDE.md) · 🇰🇭 [km](../km/CLAUDE.md) · 🇮🇳 [kn](../kn/CLAUDE.md) · 🇰🇷 [ko](../ko/CLAUDE.md) · 🇱🇹 [lt](../lt/CLAUDE.md) · 🇱🇻 [lv](../lv/CLAUDE.md) · 🇮🇳 [ml](../ml/CLAUDE.md) · 🇮🇳 [mr](../mr/CLAUDE.md) · 🇲🇾 [ms](../ms/CLAUDE.md) · 🇲🇹 [mt](../mt/CLAUDE.md) · 🇲🇲 [my](../my/CLAUDE.md) · 🇳🇵 [ne](../ne/CLAUDE.md) · 🇳🇱 [nl](../nl/CLAUDE.md) · 🇳🇴 [no](../no/CLAUDE.md) · 🇮🇳 [or](../or/CLAUDE.md) · 🇮🇳 [pa](../pa/CLAUDE.md) · 🇵🇭 [phi](../phi/CLAUDE.md) · 🇵🇱 [pl](../pl/CLAUDE.md) · 🇵🇹 [pt](../pt/CLAUDE.md) · 🇧🇷 [pt-BR](../pt-BR/CLAUDE.md) · 🇷🇴 [ro](../ro/CLAUDE.md) · 🇷🇺 [ru](../ru/CLAUDE.md) · 🇸🇰 [sk](../sk/CLAUDE.md) · 🇸🇮 [sl](../sl/CLAUDE.md) · 🇷🇸 [sr](../sr/CLAUDE.md) · 🇸🇪 [sv](../sv/CLAUDE.md) · 🇰🇪 [sw](../sw/CLAUDE.md) · 🇮🇳 [ta](../ta/CLAUDE.md) · 🇮🇳 [te](../te/CLAUDE.md) · 🇹🇭 [th](../th/CLAUDE.md) · 🇹🇷 [tr](../tr/CLAUDE.md) · 🇺🇦 [uk-UA](../uk-UA/CLAUDE.md) · 🇵🇰 [ur](../ur/CLAUDE.md) · 🇺🇿 [uz](../uz/CLAUDE.md) · 🇻🇳 [vi](../vi/CLAUDE.md) · 🇳🇬 [yo](../yo/CLAUDE.md) · 🇨🇳 [zh-CN](../zh-CN/CLAUDE.md) · 🇹🇼 [zh-TW](../zh-TW/CLAUDE.md)

---

@AGENTS.md

**සියලුම ව්යාපෘති නීති [`AGENTS.md`](AGENTS.md) තුළ ඇත** — සෑම AI සහායකයෙකු සඳහාම වන එකම සත්ය මූලාශ්රය
(ගෘහනිර්මාණය, සම්මුතීන්, පරීක්ෂණ, තත්ත්ව ද්වාර, git කාර්ය ප්රවාහය, දැඩි නීති 23,
PII ඉගෙනුම්). එය සම්පූර්ණයෙන් කියවන්න; ව්යාපෘති නීති මෙහි නැවත එක් නොකරන්න. පහත ඇති සියල්ල අදාළ වන්නේ
Claude Code සඳහා පමණි — `AGENTS.md` තුළ දැනටමත් අර්ථ දක්වා ඇති නීතිවල මෙහෙයුම්මය පිරිපහදු කිරීම් ලෙසය.

## Worktree හුදකලා කිරීම — Claude Code සඳහා විශේෂ කරුණු

සම්පූර්ණ අනිවාර්ය worktree ප්රොටෝකෝලය (මූලික ශාඛාව තහවුරු කිරීම, `.claude/worktrees/` සම්මත
මාර්ගය, `cp -al` node_modules, ඉවත් කිරීමේ නීති) `AGENTS.md` → Git Workflow → "Worktree
isolation" තුළ ඇත. Claude-Code සඳහා විශේෂ කරුණු:

- ක්රියාකරු දැනටමත් එය ඔබට පවසා නොමැති නම්, `AskUserQuestion` හරහා මූලික ශාඛාව තහවුරු කරන්න (දැඩි නීතිය #19).
- ස්වදේශීය `EnterWorktree` මෙවලම වඩාත් යෝග්යය — එය දැනටමත් `.claude/worktrees/`
  (සම්මත මාර්ගය) යටතේ worktree නිර්මාණය කරයි. ලේඛනගත `git
worktree add` විධානයෙන් worktree නිර්මාණය කර, ඉන්පසු එහි `path` සමඟ `EnterWorktree` අමතන්න.

## සැසි අතර ආරක්ෂාව — Claude Code සඳහා විශේෂ කරුණු

සමාන්තර සැසි පාලනය කරන්නේ දැඩි නීති #19/#21/#22 (`AGENTS.md` තුළ) ය. මෙම
harness සඳහා මෙහෙයුම් සිහිකැඳවීම්:

- **git ස්පර්ශ කරන සෑම subagent එකකම prompt එක තුළ `git stash` තහනම වචනයෙන් වචනයට ප්රතිනිර්මාණය කරන්න**
  (Agent tool / Workflow scripts) — subagent මෙම ගොනුව උරුම කර නොගන්නා අතර, සටහන්ගත
  stash සිදුවීමේ පුනරාවර්තනය සිදු වූයේ subagent එකක් හරහාය.
- _මෙම සැසියේදී_ ඔබ නිර්මාණය නොකළ ඕනෑම PR එකකට merge කිරීමට හෝ push කිරීමට පෙර, `git worktree list`
  ධාවනය කර `gh pr view <N> --json state,headRefOid` නැවත පරීක්ෂා කරන්න (දැඩි නීතිය #22b).
- සෑම සැසියක්ම අවසන් කරන විට ප්රධාන checkout එක එය ආරම්භ වූ ශාඛාවේම තබන්න.

## Superpowers / සැලසුම් කලාකෘති — මාර්ග අතික්රමණ

`_tasks/` සම්මුතිය `AGENTS.md` → "Planning & Research Artifacts" තුළ අර්ථ දක්වා ඇත.
superpowers skills සමඟ ලැබෙන පෙරනිමි `docs/…` වෙත යොමු වේ — එම පෙරනිමි මෙහිදී **අතික්රමණය කර ඇත**.
superpowers skill එකක් "saved to `docs/superpowers/plans/…`" වැනි මාර්ගයක් නිවේදනය කරන විට,
ලිවීමට පෙර එය සමාන `_tasks/…` මාර්ගයට නැවත ලියන්න:

| කලාකෘතිය (skill)                      | පෙරනිමිය (භාවිත නොකරන්න)  | ඒ වෙනුවට මෙහි සුරකින්න                                        |
| ------------------------------------- | ------------------------- | ------------------------------------------------------------- |
| සැලසුම් (`writing-plans`)             | `docs/superpowers/plans/` | `_tasks/superpowers/plans/YYYY-MM-DD-<feature>.md`            |
| පිරිවිතර / නිර්මාණය (`brainstorming`) | `docs/superpowers/specs/` | `_tasks/superpowers/specs/YYYY-MM-DD-<topic>-design.md`       |
| පර්යේෂණ (`deep-research`, තත්කාර්ය)   | `docs/research/`          | `_tasks/research/…`                                           |
| භාරදීම් (`/handoff`)                  | —                         | `_tasks/hands-off/<YYYY-MM-DD>_<branch>_v<versão>_sess-<id>/` |

එම කලාකෘති ප්රධාන repo එකෙහි නොව, `_tasks/` repo එක තුළ commit කරන්න (`git -C _tasks …`).

## Scratch / තාවකාලික ගොනු — `/tmp` නොව `_artifacts/` භාවිත කරන්න

මෙම ව්යාපෘතිය harness හි පෙරනිමි සැසි scratchpad එක (`/tmp/claude-*/…`) අතික්රමණය කරයි.
තාවකාලික/වැඩ කරන ගොනු — exports, ජනනය කළ zips, එක්වරක් පමණක් භාවිත වන අතරමැදි ප්රතිදාන, ඔබ සාමාන්යයෙන්
`/tmp` තුළ තබන ඕනෑම දෙයක් — ඒ වෙනුවට `/home/diegosouzapw/dev/proxys/OmniRoute/_artifacts/` වෙත ලියන්න.

- `_artifacts/` යනු root `_*` මාර්ගයකි: එය දැනටමත් gitignore කර ඇත (`AGENTS.md` → "Root `_*` paths"), තැටියේ
  පමණක් පවතින අතර කිසිවිටෙක track නොකෙරේ.
- හේතුව: තාවකාලික ප්රතිදාන ව්යාපෘතිය තුළ (`/tmp` වෙනුවට) තබා ගැනීමෙන්, අතුරුදහන් වන හෝ track නොකළ ගොනු
  එකතු වන තාවකාලික සැසි-විශේෂිත `/tmp` නාමාවලි පුරා සෙවීම වෙනුවට, ක්රියාකරුට තාවකාලික
  සියල්ල එකම ස්ථානයකින් සොයා මකා දැමීම ඉතා පහසු වේ.
- මෙය `_tasks/` සමඟ පටලවා **නොගන්න** (දැඩි නීතිය #23, දිගුකාලීන
  සැලසුම්/පිරිවිතර/පර්යේෂණ/භාරදීම් සඳහා වන එහිම පෞද්ගලික git repo එක) — `_artifacts/` යනු ඉවත දැමිය හැකි වැඩ කරන ගොනු සඳහා පමණි; මෙහි ඇති කිසිවක්
  සුරැකී පැවතීමට හෝ අනුවාදගත කිරීමට අවශ්ය නොවේ.

## PR විවෘත කිරීමට පෙර මූලික තත්ත්වය green බව තහවුරු කිරීම

ශාඛාවක් කපා ගැනීමට හෝ PR එකක් විවෘත කිරීමට පෙර, base-green පරීක්ෂාව ධාවනය කරන්න (`AGENTS.md` → Git Workflow →
"Base-green check"; ව්යාපෘති skills එය `.agents/skills/_shared/base-green.md` ලෙස යොමු කරයි). මූලික tip එක redව තිබියදී
විවෘත කළ PR එකක body එකෙහි `⚠️ base-red inherited: #<issue>` තිබිය යුතුය. එකතු වී ඇති red තත්ත්වයක්
(මූලික tip එක + red PRs) නිරාකරණය කිරීමට `/sweep-reds` skill එක භාවිත කරන්න.
