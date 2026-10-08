# CLAUDE.md (ગુજરાતી)

🌐 **Languages:** 🇺🇸 [English](../../../CLAUDE.md) · 🇪🇹 [am](../am/CLAUDE.md) · 🇸🇦 [ar](../ar/CLAUDE.md) · 🇦🇿 [az](../az/CLAUDE.md) · 🇧🇬 [bg](../bg/CLAUDE.md) · 🇧🇩 [bn](../bn/CLAUDE.md) · 🇧🇦 [bs](../bs/CLAUDE.md) · 🇨🇿 [cs](../cs/CLAUDE.md) · 🇩🇰 [da](../da/CLAUDE.md) · 🇩🇪 [de](../de/CLAUDE.md) · 🇬🇷 [el](../el/CLAUDE.md) · 🇪🇸 [es](../es/CLAUDE.md) · 🇪🇪 [et](../et/CLAUDE.md) · 🇮🇷 [fa](../fa/CLAUDE.md) · 🇫🇮 [fi](../fi/CLAUDE.md) · 🇫🇷 [fr](../fr/CLAUDE.md) · 🇮🇪 [ga](../ga/CLAUDE.md) · 🇳🇬 [ha](../ha/CLAUDE.md) · 🇮🇱 [he](../he/CLAUDE.md) · 🇮🇳 [hi](../hi/CLAUDE.md) · 🇭🇷 [hr](../hr/CLAUDE.md) · 🇭🇺 [hu](../hu/CLAUDE.md) · 🇦🇲 [hy](../hy/CLAUDE.md) · 🇮🇩 [id](../id/CLAUDE.md) · 🇳🇬 [ig](../ig/CLAUDE.md) · 🇮🇹 [it](../it/CLAUDE.md) · 🇯🇵 [ja](../ja/CLAUDE.md) · 🇬🇪 [ka](../ka/CLAUDE.md) · 🇰🇭 [km](../km/CLAUDE.md) · 🇮🇳 [kn](../kn/CLAUDE.md) · 🇰🇷 [ko](../ko/CLAUDE.md) · 🇱🇹 [lt](../lt/CLAUDE.md) · 🇱🇻 [lv](../lv/CLAUDE.md) · 🇮🇳 [ml](../ml/CLAUDE.md) · 🇮🇳 [mr](../mr/CLAUDE.md) · 🇲🇾 [ms](../ms/CLAUDE.md) · 🇲🇹 [mt](../mt/CLAUDE.md) · 🇲🇲 [my](../my/CLAUDE.md) · 🇳🇵 [ne](../ne/CLAUDE.md) · 🇳🇱 [nl](../nl/CLAUDE.md) · 🇳🇴 [no](../no/CLAUDE.md) · 🇮🇳 [or](../or/CLAUDE.md) · 🇮🇳 [pa](../pa/CLAUDE.md) · 🇵🇭 [phi](../phi/CLAUDE.md) · 🇵🇱 [pl](../pl/CLAUDE.md) · 🇵🇹 [pt](../pt/CLAUDE.md) · 🇧🇷 [pt-BR](../pt-BR/CLAUDE.md) · 🇷🇴 [ro](../ro/CLAUDE.md) · 🇷🇺 [ru](../ru/CLAUDE.md) · 🇱🇰 [si](../si/CLAUDE.md) · 🇸🇰 [sk](../sk/CLAUDE.md) · 🇸🇮 [sl](../sl/CLAUDE.md) · 🇷🇸 [sr](../sr/CLAUDE.md) · 🇸🇪 [sv](../sv/CLAUDE.md) · 🇰🇪 [sw](../sw/CLAUDE.md) · 🇮🇳 [ta](../ta/CLAUDE.md) · 🇮🇳 [te](../te/CLAUDE.md) · 🇹🇭 [th](../th/CLAUDE.md) · 🇹🇷 [tr](../tr/CLAUDE.md) · 🇺🇦 [uk-UA](../uk-UA/CLAUDE.md) · 🇵🇰 [ur](../ur/CLAUDE.md) · 🇺🇿 [uz](../uz/CLAUDE.md) · 🇻🇳 [vi](../vi/CLAUDE.md) · 🇳🇬 [yo](../yo/CLAUDE.md) · 🇨🇳 [zh-CN](../zh-CN/CLAUDE.md) · 🇹🇼 [zh-TW](../zh-TW/CLAUDE.md)

---

@AGENTS.md

**પ્રોજેક્ટના તમામ નિયમો [`AGENTS.md`](AGENTS.md)માં છે** — દરેક AI સહાયક માટે સત્યનો એકમાત્ર સ્રોત
(આર્કિટેક્ચર, પ્રણાલીઓ, પરીક્ષણ, ગુણવત્તા દ્વાર, git કાર્યપ્રવાહ, 23 કડક નિયમો,
PII શીખ). તેને સંપૂર્ણ વાંચો; પ્રોજેક્ટના નિયમો અહીં ફરીથી ઉમેરશો નહીં. નીચેની દરેક બાબત ફક્ત
Claude Code પર લાગુ પડે છે — `AGENTS.md`માં પહેલેથી નિર્ધારિત નિયમોના સંચાલનાત્મક સુધારા.

## Worktree અલગીકરણ — Claude Codeની વિશિષ્ટતાઓ

સંપૂર્ણ ફરજિયાત worktree પ્રોટોકોલ (આધાર શાખાની પુષ્ટિ, `.claude/worktrees/` પ્રમાણભૂત
પાથ, `cp -al` node_modules, દૂર કરવાના નિયમો) `AGENTS.md` → Git Workflow → "Worktree
isolation"માં છે. Claude-Code-વિશિષ્ટ મુદ્દાઓ:

- જો સંચાલકે તમને આધાર શાખા પહેલેથી ન જણાવી હોય, તો `AskUserQuestion` દ્વારા તેની પુષ્ટિ કરો
  (કડક નિયમ #19).
- મૂળ `EnterWorktree` ટૂલને પ્રાધાન્ય આપો — તે પહેલેથી જ `.claude/worktrees/`
  (પ્રમાણભૂત પાથ) હેઠળ worktree બનાવે છે. દસ્તાવેજીકૃત `git
worktree add` કમાન્ડ વડે worktree બનાવો, પછી તેના `path` સાથે `EnterWorktree`ને કૉલ કરો.

## ક્રોસ-સેશન સુરક્ષા — Claude Codeની વિશિષ્ટતાઓ

કડક નિયમો #19/#21/#22 (`AGENTS.md`માં) સમાંતર સેશનોનું સંચાલન કરે છે. આ
હાર્ણેસ માટે સંચાલનાત્મક સ્મરણો:

- **gitને સ્પર્શતા દરેક સબએજન્ટના પ્રોમ્પ્ટમાં `git stash` પ્રતિબંધ શબ્દશઃ નકલ કરો**
  (Agent ટૂલ / Workflow સ્ક્રિપ્ટ્સ) — સબએજન્ટ આ ફાઇલ વારસામાં મેળવતા નથી અને stash ઘટનાનું
  નોંધાયેલ પુનરાવર્તન સબએજન્ટ મારફતે થયું હતું.
- તમે _આ સેશનમાં_ ન બનાવેલી કોઈપણ PRને મર્જ કે પુશ કરતાં પહેલાં `git worktree list`
  ચલાવો અને `gh pr view <N> --json state,headRefOid` ફરીથી તપાસો (કડક નિયમ #22b).
- દરેક સેશનના અંતે મુખ્ય checkoutને તે જે શાખા પર શરૂ થયું હતું તેના પર જ રાખો.

## Superpowers / આયોજન આર્ટિફેક્ટ્સ — પાથ ઓવરરાઇડ્સ

`_tasks/` પ્રણાલી `AGENTS.md` → "Planning & Research Artifacts"માં નિર્ધારિત છે.
superpowers કૌશલ્યોનાં ડિફૉલ્ટ્સ `docs/…` તરફ નિર્દેશ કરે છે — તે ડિફૉલ્ટ્સ અહીં
**ઓવરરાઇડ કરેલા છે**. જ્યારે કોઈ superpowers કૌશલ્ય "saved to `docs/superpowers/plans/…`"
જેવા પાથની જાહેરાત કરે, ત્યારે લખતાં પહેલાં તેને `_tasks/…` સમકક્ષમાં ફરીથી લખો:

| આર્ટિફેક્ટ (કૌશલ્ય)                | ડિફૉલ્ટ (ઉપયોગ કરશો નહીં) | તેના બદલે અહીં સાચવો                                          |
| ---------------------------------- | ------------------------- | ------------------------------------------------------------- |
| યોજનાઓ (`writing-plans`)           | `docs/superpowers/plans/` | `_tasks/superpowers/plans/YYYY-MM-DD-<feature>.md`            |
| સ્પેક્સ / ડિઝાઇન (`brainstorming`) | `docs/superpowers/specs/` | `_tasks/superpowers/specs/YYYY-MM-DD-<topic>-design.md`       |
| સંશોધન (`deep-research`, તદર્થ)    | `docs/research/`          | `_tasks/research/…`                                           |
| હેન્ડ-ઑફ્સ (`/handoff`)            | —                         | `_tasks/hands-off/<YYYY-MM-DD>_<branch>_v<versão>_sess-<id>/` |

તે આર્ટિફેક્ટ્સને `_tasks/` રેપોઝિટરીની અંદર કમિટ કરો (`git -C _tasks …`), મુખ્ય રેપોઝિટરીમાં ક્યારેય નહીં.

## સ્ક્રેચ / અસ્થાયી ફાઇલો — `/tmp` નહીં, `_artifacts/` વાપરો

આ પ્રોજેક્ટ હાર્ણેસના ડિફૉલ્ટ સેશન સ્ક્રેચપેડ (`/tmp/claude-*/…`)ને ઓવરરાઇડ કરે છે. અસ્થાયી/કાર્યરત
ફાઇલો — exports, જનરેટ કરેલી zips, એકવાર ઉપયોગમાં લેવાતા વચગાળાના outputs, જે કંઈ તમે અન્યથા
`/tmp`માં મૂકશો — તેના બદલે `/home/diegosouzapw/dev/proxys/OmniRoute/_artifacts/`માં લખો.

- `_artifacts/` એક રૂટ `_*` પાથ છે: તે પહેલેથી gitignored છે (`AGENTS.md` → "Root `_*` paths"), ફક્ત
  ડિસ્ક પર રહે છે અને ક્યારેય ટ્રૅક થતો નથી.
- કારણ: સ્ક્રેચ outputને પ્રોજેક્ટની અંદર (`/tmp`ને બદલે) રાખવાથી સંચાલક માટે અસ્થાયી દરેક વસ્તુને
  એક જગ્યાએ શોધવી અને કાઢી નાખવી સરળ બને છે, તેના બદલે એવા ક્ષણિક સેશન-વિશિષ્ટ `/tmp`
  ડિરેક્ટરીઓમાં શોધવું પડે જે અદૃશ્ય થાય છે અથવા ટ્રૅક ન થયેલી રીતે એકઠી થાય છે.
- આને `_tasks/` સાથે **ગૂંચવશો નહીં** (કડક નિયમ #23, ટકાઉ
  યોજનાઓ/સ્પેક્સ/સંશોધન/હેન્ડ-ઑફ્સ માટે તેની પોતાની ખાનગી git રેપોઝિટરી) — `_artifacts/` ફક્ત નિકાલયોગ્ય કાર્યરત ફાઇલો માટે છે, અહીંની
  કોઈપણ વસ્તુને સાચવી રાખવાની કે વર્ઝન કરવાની જરૂર નથી.

## PR ખોલતા પહેલાં આધાર લીલો હોવો જરૂરી

શાખા બનાવતાં કે PR ખોલતાં પહેલાં base-green તપાસ ચલાવો (`AGENTS.md` → Git Workflow →
"Base-green check"; પ્રોજેક્ટ કૌશલ્યો તેનો સંદર્ભ `.agents/skills/_shared/base-green.md` તરીકે આપે છે). આધાર tip લાલ હોય ત્યારે
ખોલેલી PRના bodyમાં `⚠️ base-red inherited: #<issue>` હોવું જ જોઈએ. એકઠી થયેલી લાલ સ્થિતિ
(આધાર tip + લાલ PRs) દૂર કરવા માટે `/sweep-reds` કૌશલ્ય વાપરો.
