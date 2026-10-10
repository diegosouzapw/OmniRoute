# CLAUDE.md (தமிழ்)

🌐 **Languages:** 🇺🇸 [English](../../../CLAUDE.md) · 🇪🇹 [am](../am/CLAUDE.md) · 🇸🇦 [ar](../ar/CLAUDE.md) · 🇦🇿 [az](../az/CLAUDE.md) · 🇧🇬 [bg](../bg/CLAUDE.md) · 🇧🇩 [bn](../bn/CLAUDE.md) · 🇧🇦 [bs](../bs/CLAUDE.md) · 🇨🇿 [cs](../cs/CLAUDE.md) · 🇩🇰 [da](../da/CLAUDE.md) · 🇩🇪 [de](../de/CLAUDE.md) · 🇬🇷 [el](../el/CLAUDE.md) · 🇪🇸 [es](../es/CLAUDE.md) · 🇪🇪 [et](../et/CLAUDE.md) · 🇮🇷 [fa](../fa/CLAUDE.md) · 🇫🇮 [fi](../fi/CLAUDE.md) · 🇫🇷 [fr](../fr/CLAUDE.md) · 🇮🇪 [ga](../ga/CLAUDE.md) · 🇮🇳 [gu](../gu/CLAUDE.md) · 🇳🇬 [ha](../ha/CLAUDE.md) · 🇮🇱 [he](../he/CLAUDE.md) · 🇮🇳 [hi](../hi/CLAUDE.md) · 🇭🇷 [hr](../hr/CLAUDE.md) · 🇭🇺 [hu](../hu/CLAUDE.md) · 🇦🇲 [hy](../hy/CLAUDE.md) · 🇮🇩 [id](../id/CLAUDE.md) · 🇳🇬 [ig](../ig/CLAUDE.md) · 🇮🇹 [it](../it/CLAUDE.md) · 🇯🇵 [ja](../ja/CLAUDE.md) · 🇬🇪 [ka](../ka/CLAUDE.md) · 🇰🇭 [km](../km/CLAUDE.md) · 🇮🇳 [kn](../kn/CLAUDE.md) · 🇰🇷 [ko](../ko/CLAUDE.md) · 🇱🇹 [lt](../lt/CLAUDE.md) · 🇱🇻 [lv](../lv/CLAUDE.md) · 🇮🇳 [ml](../ml/CLAUDE.md) · 🇮🇳 [mr](../mr/CLAUDE.md) · 🇲🇾 [ms](../ms/CLAUDE.md) · 🇲🇹 [mt](../mt/CLAUDE.md) · 🇲🇲 [my](../my/CLAUDE.md) · 🇳🇵 [ne](../ne/CLAUDE.md) · 🇳🇱 [nl](../nl/CLAUDE.md) · 🇳🇴 [no](../no/CLAUDE.md) · 🇮🇳 [or](../or/CLAUDE.md) · 🇮🇳 [pa](../pa/CLAUDE.md) · 🇵🇭 [phi](../phi/CLAUDE.md) · 🇵🇱 [pl](../pl/CLAUDE.md) · 🇵🇹 [pt](../pt/CLAUDE.md) · 🇧🇷 [pt-BR](../pt-BR/CLAUDE.md) · 🇷🇴 [ro](../ro/CLAUDE.md) · 🇷🇺 [ru](../ru/CLAUDE.md) · 🇱🇰 [si](../si/CLAUDE.md) · 🇸🇰 [sk](../sk/CLAUDE.md) · 🇸🇮 [sl](../sl/CLAUDE.md) · 🇷🇸 [sr](../sr/CLAUDE.md) · 🇸🇪 [sv](../sv/CLAUDE.md) · 🇰🇪 [sw](../sw/CLAUDE.md) · 🇮🇳 [te](../te/CLAUDE.md) · 🇹🇭 [th](../th/CLAUDE.md) · 🇹🇷 [tr](../tr/CLAUDE.md) · 🇺🇦 [uk-UA](../uk-UA/CLAUDE.md) · 🇵🇰 [ur](../ur/CLAUDE.md) · 🇺🇿 [uz](../uz/CLAUDE.md) · 🇻🇳 [vi](../vi/CLAUDE.md) · 🇳🇬 [yo](../yo/CLAUDE.md) · 🇨🇳 [zh-CN](../zh-CN/CLAUDE.md) · 🇹🇼 [zh-TW](../zh-TW/CLAUDE.md)

---

@AGENTS.md

**அனைத்து திட்ட விதிகளும் [`AGENTS.md`](AGENTS.md)-இல் உள்ளன** — ஒவ்வொரு AI உதவியாளருக்கும் கட்டமைப்பு, மரபுகள், சோதனை, தர நுழைவாயில்கள், git பணிப்பாய்வு, 23 கடுமையான விதிகள் மற்றும் PII கற்றல்களுக்கான ஒரே உண்மை ஆதாரம் இதுவே. அதை முழுமையாகப் படிக்கவும்; திட்ட விதிகளை இங்கே மீண்டும் சேர்க்க வேண்டாம். கீழே உள்ள அனைத்தும் Claude Code-க்கு **மட்டுமே** பொருந்தும் — இவை `AGENTS.md`-இல் ஏற்கெனவே வரையறுக்கப்பட்ட விதிகளின் செயல்பாட்டு மேம்பாடுகள்.

## Worktree தனிமைப்படுத்தல் — Claude Code-க்கான குறிப்புகள்

முழுமையான கட்டாய worktree நெறிமுறை (அடிப்படைக் கிளை உறுதிப்படுத்தல், `.claude/worktrees/` அதிகாரப்பூர்வப் பாதை, `cp -al` node_modules, அகற்றுதல் விதிகள்) `AGENTS.md` → Git Workflow → "Worktree isolation" என்பதில் உள்ளது. Claude Code-க்கான குறிப்பிட்ட அம்சங்கள்:

- அடிப்படைக் கிளையை இயக்குநர் ஏற்கெனவே தெரிவித்திருக்காவிட்டால், `AskUserQuestion` மூலம் அவரிடம் உறுதிப்படுத்தவும் (கடுமையான விதி #19).
- சொந்த `EnterWorktree` கருவியைப் பயன்படுத்துவதற்கு முன்னுரிமை அளிக்கவும் — அது ஏற்கெனவே அதிகாரப்பூர்வப் பாதையான `.claude/worktrees/`-இன் கீழ் worktree-களை உருவாக்குகிறது. ஆவணப்படுத்தப்பட்ட `git
worktree add` கட்டளையைக் கொண்டு worktree-ஐ உருவாக்கி, பின்னர் அதன் `path` உடன் `EnterWorktree`-ஐ அழைக்கவும்.

## அமர்வுகளுக்கு இடையேயான பாதுகாப்பு — Claude Code-க்கான குறிப்புகள்

இணை அமர்வுகளை கடுமையான விதிகள் #19/#21/#22 (`AGENTS.md`-இல்) நிர்வகிக்கின்றன. இந்த harness-க்கான செயல்பாட்டு நினைவூட்டல்கள்:

- **git-ஐத் தொடும் ஒவ்வொரு துணைமுகவரின் prompt-இலும் `git stash` தடையைச் சொல் மாறாமல் நகலெடுக்கவும்** (Agent கருவி / Workflow scripts) — துணைமுகவர்கள் இந்தக் கோப்பை மரபுரிமையாகப் பெறுவதில்லை; மேலும் stash சம்பவம் மீண்டும் நிகழ்ந்ததாகப் பதிவானது ஒரு துணைமுகவர் மூலமாகவே.
- _இந்த அமர்வில்_ நீங்கள் உருவாக்காத எந்த PR-ஐயும் merge அல்லது push செய்வதற்கு முன், `git worktree list`-ஐ இயக்கி, `gh pr view <N> --json state,headRefOid`-ஐ மீண்டும் சரிபார்க்கவும் (கடுமையான விதி #22b).
- ஒவ்வொரு அமர்வையும், அது தொடங்கியபோது இருந்த கிளையிலேயே முதன்மை checkout இருக்குமாறு முடிக்கவும்.

## Superpowers / திட்டமிடல் கலைப்பொருட்கள் — பாதை மேலெழுதல்கள்

`_tasks/` மரபு `AGENTS.md` → "Planning & Research Artifacts" என்பதில் வரையறுக்கப்பட்டுள்ளது. superpowers திறன்களின் இயல்புநிலைகள் `docs/…`-ஐச் சுட்டுகின்றன — அந்த இயல்புநிலைகள் **இங்கே மேலெழுதப்படுகின்றன**. ஒரு superpowers திறன் "saved to `docs/superpowers/plans/…`" போன்ற பாதையை அறிவிக்கும்போது, எழுதுவதற்கு முன் அதை இணையான `_tasks/…` பாதையாக மாற்றவும்:

| கலைப்பொருள் (திறன்)                              | இயல்புநிலை (பயன்படுத்த வேண்டாம்) | அதற்குப் பதிலாக இங்கே சேமிக்கவும்                             |
| ------------------------------------------------ | -------------------------------- | ------------------------------------------------------------- |
| திட்டங்கள் (`writing-plans`)                     | `docs/superpowers/plans/`        | `_tasks/superpowers/plans/YYYY-MM-DD-<feature>.md`            |
| விவரக்குறிப்புகள் / வடிவமைப்பு (`brainstorming`) | `docs/superpowers/specs/`        | `_tasks/superpowers/specs/YYYY-MM-DD-<topic>-design.md`       |
| ஆராய்ச்சி (`deep-research`, தற்காலிகமானது)       | `docs/research/`                 | `_tasks/research/…`                                           |
| பணிமாற்றங்கள் (`/handoff`)                       | —                                | `_tasks/hands-off/<YYYY-MM-DD>_<branch>_v<versão>_sess-<id>/` |

அந்தக் கலைப்பொருட்களை முதன்மை repo-வில் ஒருபோதும் அல்லாமல், `_tasks/` repo-வுக்குள் (`git -C _tasks …`) commit செய்யவும்.

## Scratch / தற்காலிகக் கோப்புகள் — `/tmp` அல்ல, `_artifacts/`-ஐப் பயன்படுத்தவும்

இந்தத் திட்டம் harness-இன் இயல்புநிலை அமர்வு scratchpad-ஐ (`/tmp/claude-*/…`) மேலெழுதுகிறது. ஏற்றுமதிகள், உருவாக்கப்பட்ட zip-கள், ஒருமுறை பயன்படும் இடைநிலை வெளியீடுகள் மற்றும் இல்லையெனில் `/tmp`-இல் வைக்கக்கூடிய எதுவாக இருந்தாலும், தற்காலிக/பணிக் கோப்புகளை அதற்குப் பதிலாக `/home/diegosouzapw/dev/proxys/OmniRoute/_artifacts/`-இல் எழுதவும்.

- `_artifacts/` என்பது மூல மட்டத்திலுள்ள `_*` பாதையாகும்: இது ஏற்கெனவே gitignore செய்யப்பட்டுள்ளது (`AGENTS.md` → "Root `_*` paths"), வட்டில் மட்டுமே இருக்கும், ஒருபோதும் கண்காணிக்கப்படாது.
- காரணம்: scratch வெளியீட்டை `/tmp`-க்குப் பதிலாகத் திட்டத்தின் உள்ளேயே வைத்திருப்பதால், மறைந்து போகும் அல்லது கண்காணிக்கப்படாமல் குவியும் தற்காலிக அமர்வு-குறிப்பிட்ட `/tmp` கோப்பகங்களில் தேடுவதற்குப் பதிலாக, இயக்குநர் தற்காலிகமான அனைத்தையும் ஒரே இடத்தில் எளிதாகக் கண்டுபிடித்து நீக்க முடியும்.
- இதை `_tasks/` உடன் குழப்ப வேண்டாம் (கடுமையான விதி #23, நீடித்த திட்டங்கள்/விவரக்குறிப்புகள்/ஆராய்ச்சி/பணிமாற்றங்களுக்கான அதன் சொந்தத் தனிப்பட்ட git repo) — `_artifacts/` என்பது கைவிடக்கூடிய பணிக் கோப்புகளுக்கு மட்டுமே; இங்குள்ள எதுவும் நீடித்திருக்கவோ பதிப்பிடப்படவோ தேவையில்லை.

## PR-களைத் திறப்பதற்கு முன் அடிப்படை பசுமை

ஒரு கிளையைப் பிரிப்பதற்கோ PR-ஐத் திறப்பதற்கோ முன், அடிப்படை பசுமைச் சரிபார்ப்பை இயக்கவும் (`AGENTS.md` → Git Workflow → "Base-green check"; திட்டத் திறன்கள் இதை `.agents/skills/_shared/base-green.md` எனக் குறிப்பிடுகின்றன). அடிப்படை முனை சிவப்பாக இருக்கும்போது திறக்கப்படும் PR-இன் body-இல் `⚠️ base-red inherited: #<issue>` இடம்பெற வேண்டும். குவிந்துள்ள சிவப்பு நிலையை (அடிப்படை முனை + சிவப்பு PR-கள்) அகற்ற, `/sweep-reds` திறனைப் பயன்படுத்தவும்.
