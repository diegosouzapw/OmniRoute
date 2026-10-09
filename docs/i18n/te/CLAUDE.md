# CLAUDE.md (తెలుగు)

🌐 **Languages:** 🇺🇸 [English](../../../CLAUDE.md) · 🇪🇹 [am](../am/CLAUDE.md) · 🇸🇦 [ar](../ar/CLAUDE.md) · 🇦🇿 [az](../az/CLAUDE.md) · 🇧🇬 [bg](../bg/CLAUDE.md) · 🇧🇩 [bn](../bn/CLAUDE.md) · 🇧🇦 [bs](../bs/CLAUDE.md) · 🇨🇿 [cs](../cs/CLAUDE.md) · 🇩🇰 [da](../da/CLAUDE.md) · 🇩🇪 [de](../de/CLAUDE.md) · 🇬🇷 [el](../el/CLAUDE.md) · 🇪🇸 [es](../es/CLAUDE.md) · 🇪🇪 [et](../et/CLAUDE.md) · 🇮🇷 [fa](../fa/CLAUDE.md) · 🇫🇮 [fi](../fi/CLAUDE.md) · 🇫🇷 [fr](../fr/CLAUDE.md) · 🇮🇪 [ga](../ga/CLAUDE.md) · 🇮🇳 [gu](../gu/CLAUDE.md) · 🇳🇬 [ha](../ha/CLAUDE.md) · 🇮🇱 [he](../he/CLAUDE.md) · 🇮🇳 [hi](../hi/CLAUDE.md) · 🇭🇷 [hr](../hr/CLAUDE.md) · 🇭🇺 [hu](../hu/CLAUDE.md) · 🇦🇲 [hy](../hy/CLAUDE.md) · 🇮🇩 [id](../id/CLAUDE.md) · 🇳🇬 [ig](../ig/CLAUDE.md) · 🇮🇹 [it](../it/CLAUDE.md) · 🇯🇵 [ja](../ja/CLAUDE.md) · 🇬🇪 [ka](../ka/CLAUDE.md) · 🇰🇭 [km](../km/CLAUDE.md) · 🇮🇳 [kn](../kn/CLAUDE.md) · 🇰🇷 [ko](../ko/CLAUDE.md) · 🇱🇹 [lt](../lt/CLAUDE.md) · 🇱🇻 [lv](../lv/CLAUDE.md) · 🇮🇳 [ml](../ml/CLAUDE.md) · 🇮🇳 [mr](../mr/CLAUDE.md) · 🇲🇾 [ms](../ms/CLAUDE.md) · 🇲🇹 [mt](../mt/CLAUDE.md) · 🇲🇲 [my](../my/CLAUDE.md) · 🇳🇵 [ne](../ne/CLAUDE.md) · 🇳🇱 [nl](../nl/CLAUDE.md) · 🇳🇴 [no](../no/CLAUDE.md) · 🇮🇳 [or](../or/CLAUDE.md) · 🇮🇳 [pa](../pa/CLAUDE.md) · 🇵🇭 [phi](../phi/CLAUDE.md) · 🇵🇱 [pl](../pl/CLAUDE.md) · 🇵🇹 [pt](../pt/CLAUDE.md) · 🇧🇷 [pt-BR](../pt-BR/CLAUDE.md) · 🇷🇴 [ro](../ro/CLAUDE.md) · 🇷🇺 [ru](../ru/CLAUDE.md) · 🇱🇰 [si](../si/CLAUDE.md) · 🇸🇰 [sk](../sk/CLAUDE.md) · 🇸🇮 [sl](../sl/CLAUDE.md) · 🇷🇸 [sr](../sr/CLAUDE.md) · 🇸🇪 [sv](../sv/CLAUDE.md) · 🇰🇪 [sw](../sw/CLAUDE.md) · 🇮🇳 [ta](../ta/CLAUDE.md) · 🇹🇭 [th](../th/CLAUDE.md) · 🇹🇷 [tr](../tr/CLAUDE.md) · 🇺🇦 [uk-UA](../uk-UA/CLAUDE.md) · 🇵🇰 [ur](../ur/CLAUDE.md) · 🇺🇿 [uz](../uz/CLAUDE.md) · 🇻🇳 [vi](../vi/CLAUDE.md) · 🇳🇬 [yo](../yo/CLAUDE.md) · 🇨🇳 [zh-CN](../zh-CN/CLAUDE.md) · 🇹🇼 [zh-TW](../zh-TW/CLAUDE.md)

---

@AGENTS.md

**ప్రాజెక్ట్ నియమాలన్నీ [`AGENTS.md`](AGENTS.md)లో ఉన్నాయి** — ప్రతి AI సహాయకుడికి ఆర్కిటెక్చర్, కన్వెన్షన్లు, టెస్టింగ్, క్వాలిటీ గేట్లు, git వర్క్ఫ్లో, 23 కఠిన నియమాలు, PII అభ్యాసాలకు ఇదే ఏకైక ప్రామాణిక మూలం. దాన్ని పూర్తిగా చదవండి; ప్రాజెక్ట్ నియమాలను ఇక్కడ మళ్లీ చేర్చవద్దు. దిగువన ఉన్నవన్నీ Claude Codeకు **మాత్రమే** వర్తిస్తాయి — ఇవి ఇప్పటికే `AGENTS.md`లో నిర్వచించిన నియమాలకు సంబంధించిన కార్యాచరణ మెరుగుదలలు.

## వర్క్ట్రీ ఐసోలేషన్ — Claude Code ప్రత్యేకాంశాలు

పూర్తి తప్పనిసరి వర్క్ట్రీ ప్రోటోకాల్ (బేస్ బ్రాంచ్ నిర్ధారణ, `.claude/worktrees/` ప్రామాణిక పాత్, `cp -al` node_modules, తొలగింపు నియమాలు) `AGENTS.md` → Git Workflow → "Worktree isolation"లో ఉంది. Claude-Codeకు ప్రత్యేకమైన అంశాలు:

- ఆపరేటర్ ఇప్పటికే చెప్పి ఉంటే తప్ప, `AskUserQuestion` ద్వారా వారితో బేస్ బ్రాంచ్ను నిర్ధారించండి (కఠిన నియమం #19).
- స్థానిక `EnterWorktree` టూల్కు ప్రాధాన్యం ఇవ్వండి — ఇది ఇప్పటికే `.claude/worktrees/` (ప్రామాణిక పాత్) కింద వర్క్ట్రీలను సృష్టిస్తుంది. డాక్యుమెంట్ చేసిన `git
worktree add` కమాండ్తో వర్క్ట్రీని సృష్టించి, ఆపై దాని `path`తో `EnterWorktree`ను కాల్ చేయండి.

## క్రాస్-సెషన్ భద్రత — Claude Code ప్రత్యేకాంశాలు

సమాంతర సెషన్లను కఠిన నియమాలు #19/#21/#22 (`AGENTS.md`లో) నియంత్రిస్తాయి. ఈ హార్నెస్కు సంబంధించిన కార్యాచరణ రిమైండర్లు:

- **gitను తాకే ప్రతి సబ్ఏజెంట్ ప్రాంప్ట్లో `git stash` నిషేధాన్ని యథాతథంగా పునరావృతం చేయండి**
  (Agent టూల్ / Workflow స్క్రిప్ట్లు) — సబ్ఏజెంట్లు ఈ ఫైల్ను వారసత్వంగా పొందవు, అలాగే stash సంఘటన మళ్లీ జరగడం సబ్ఏజెంట్ ద్వారానే నమోదైంది.
- _ఈ సెషన్లో_ మీరు సృష్టించని ఏదైనా PRలో మెర్జ్ చేయడానికి లేదా పుష్ చేయడానికి ముందు, `git worktree list`ను అమలు చేసి, `gh pr view <N> --json state,headRefOid`ను మళ్లీ తనిఖీ చేయండి (కఠిన నియమం #22b).
- ప్రతి సెషన్ ముగిసే సమయానికి ప్రధాన చెక్అవుట్ను అది ప్రారంభమైన బ్రాంచ్లోనే ఉంచండి.

## Superpowers / ప్లానింగ్ ఆర్టిఫ్యాక్ట్లు — పాత్ ఓవర్రైడ్లు

`_tasks/` కన్వెన్షన్ `AGENTS.md` → "Planning & Research Artifacts"లో నిర్వచించబడింది. Superpowers స్కిల్స్ `docs/…`ను సూచించే డిఫాల్ట్లతో వస్తాయి — ఆ డిఫాల్ట్లు ఇక్కడ **ఓవర్రైడ్ చేయబడ్డాయి**. ఒక Superpowers స్కిల్ "saved to `docs/superpowers/plans/…`" వంటి పాత్ను ప్రకటించినప్పుడు, రాయడానికి ముందు దాన్ని సమానమైన `_tasks/…` పాత్గా మార్చండి:

| ఆర్టిఫ్యాక్ట్ (స్కిల్)              | డిఫాల్ట్ (ఉపయోగించవద్దు)  | బదులుగా ఇక్కడ సేవ్ చేయండి                                     |
| ----------------------------------- | ------------------------- | ------------------------------------------------------------- |
| ప్లాన్లు (`writing-plans`)          | `docs/superpowers/plans/` | `_tasks/superpowers/plans/YYYY-MM-DD-<feature>.md`            |
| స్పెక్లు / డిజైన్ (`brainstorming`) | `docs/superpowers/specs/` | `_tasks/superpowers/specs/YYYY-MM-DD-<topic>-design.md`       |
| పరిశోధన (`deep-research`, ad-hoc)   | `docs/research/`          | `_tasks/research/…`                                           |
| హ్యాండ్-ఆఫ్లు (`/handoff`)          | —                         | `_tasks/hands-off/<YYYY-MM-DD>_<branch>_v<versão>_sess-<id>/` |

ఆ ఆర్టిఫ్యాక్ట్లను ప్రధాన రిపోలో కాకుండా, `_tasks/` రిపోలోనే (`git -C _tasks …`) కమిట్ చేయండి.

## స్క్రాచ్ / తాత్కాలిక ఫైళ్లు — `/tmp`కు బదులుగా `_artifacts/`ను ఉపయోగించండి

ఈ ప్రాజెక్ట్ హార్నెస్ డిఫాల్ట్ సెషన్ స్క్రాచ్ప్యాడ్ను (`/tmp/claude-*/…`) ఓవర్రైడ్ చేస్తుంది. తాత్కాలిక/వర్కింగ్ ఫైళ్లను — ఎక్స్పోర్ట్లు, జనరేట్ చేసిన zipలు, ఒక్కసారి మాత్రమే ఉపయోగించే మధ్యంతర అవుట్పుట్లు, సాధారణంగా `/tmp`లో ఉంచే ఏవైనా ఫైళ్లను — బదులుగా `/home/diegosouzapw/dev/proxys/OmniRoute/_artifacts/`లో రాయండి.

- `_artifacts/` ఒక రూట్ `_*` పాత్: ఇది ఇప్పటికే gitignore చేయబడింది (`AGENTS.md` → "Root `_*` paths"), డిస్క్లో మాత్రమే ఉంటుంది, ఎప్పుడూ ట్రాక్ చేయబడదు.
- కారణం: స్క్రాచ్ అవుట్పుట్ను `/tmp`కు బదులుగా ప్రాజెక్ట్ లోపల ఉంచడం వల్ల, కనుమరుగయ్యే లేదా ట్రాక్ చేయని ఫైళ్లు పేరుకుపోయే తాత్కాలిక సెషన్-నిర్దిష్ట `/tmp` డైరెక్టరీలన్నింటిలో వెతకకుండా, ఆపరేటర్ తాత్కాలికమైన ప్రతిదాన్ని ఒకేచోట సులభంగా కనుగొని తొలగించగలరు.
- దీన్ని `_tasks/`తో గందరగోళపరచవద్దు (కఠిన నియమం #23, దీర్ఘకాలిక ప్లాన్లు/స్పెక్లు/పరిశోధన/హ్యాండ్-ఆఫ్ల కోసం దాని స్వంత ప్రైవేట్ git రిపో) — `_artifacts/` పారవేయదగిన వర్కింగ్ ఫైళ్ల కోసం మాత్రమే; ఇక్కడ ఏదీ నిలిచి ఉండాల్సిన లేదా వెర్షన్ చేయాల్సిన అవసరం లేదు.

## PRలను తెరవడానికి ముందు బేస్-గ్రీన్

బ్రాంచ్ను సృష్టించడానికి లేదా PRను తెరవడానికి ముందు, బేస్-గ్రీన్ తనిఖీని అమలు చేయండి (`AGENTS.md` → Git Workflow → "Base-green check"; ప్రాజెక్ట్ స్కిల్స్ దీన్ని `.agents/skills/_shared/base-green.md`గా సూచిస్తాయి). బేస్ టిప్ రెడ్గా ఉన్నప్పుడు తెరిచిన PR బాడీలో `⚠️ base-red inherited: #<issue>` తప్పనిసరిగా ఉండాలి. పేరుకుపోయిన రెడ్ స్థితిని (బేస్ టిప్ + రెడ్ PRలు) తొలగించడానికి, `/sweep-reds` స్కిల్ను ఉపయోగించండి.
