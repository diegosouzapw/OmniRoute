# CLAUDE.md (मराठी)

🌐 **Languages:** 🇺🇸 [English](../../../CLAUDE.md) · 🇪🇹 [am](../am/CLAUDE.md) · 🇸🇦 [ar](../ar/CLAUDE.md) · 🇦🇿 [az](../az/CLAUDE.md) · 🇧🇬 [bg](../bg/CLAUDE.md) · 🇧🇩 [bn](../bn/CLAUDE.md) · 🇧🇦 [bs](../bs/CLAUDE.md) · 🇨🇿 [cs](../cs/CLAUDE.md) · 🇩🇰 [da](../da/CLAUDE.md) · 🇩🇪 [de](../de/CLAUDE.md) · 🇬🇷 [el](../el/CLAUDE.md) · 🇪🇸 [es](../es/CLAUDE.md) · 🇪🇪 [et](../et/CLAUDE.md) · 🇮🇷 [fa](../fa/CLAUDE.md) · 🇫🇮 [fi](../fi/CLAUDE.md) · 🇫🇷 [fr](../fr/CLAUDE.md) · 🇮🇪 [ga](../ga/CLAUDE.md) · 🇮🇳 [gu](../gu/CLAUDE.md) · 🇳🇬 [ha](../ha/CLAUDE.md) · 🇮🇱 [he](../he/CLAUDE.md) · 🇮🇳 [hi](../hi/CLAUDE.md) · 🇭🇷 [hr](../hr/CLAUDE.md) · 🇭🇺 [hu](../hu/CLAUDE.md) · 🇦🇲 [hy](../hy/CLAUDE.md) · 🇮🇩 [id](../id/CLAUDE.md) · 🇳🇬 [ig](../ig/CLAUDE.md) · 🇮🇹 [it](../it/CLAUDE.md) · 🇯🇵 [ja](../ja/CLAUDE.md) · 🇬🇪 [ka](../ka/CLAUDE.md) · 🇰🇭 [km](../km/CLAUDE.md) · 🇮🇳 [kn](../kn/CLAUDE.md) · 🇰🇷 [ko](../ko/CLAUDE.md) · 🇱🇹 [lt](../lt/CLAUDE.md) · 🇱🇻 [lv](../lv/CLAUDE.md) · 🇮🇳 [ml](../ml/CLAUDE.md) · 🇲🇾 [ms](../ms/CLAUDE.md) · 🇲🇹 [mt](../mt/CLAUDE.md) · 🇲🇲 [my](../my/CLAUDE.md) · 🇳🇵 [ne](../ne/CLAUDE.md) · 🇳🇱 [nl](../nl/CLAUDE.md) · 🇳🇴 [no](../no/CLAUDE.md) · 🇮🇳 [or](../or/CLAUDE.md) · 🇮🇳 [pa](../pa/CLAUDE.md) · 🇵🇭 [phi](../phi/CLAUDE.md) · 🇵🇱 [pl](../pl/CLAUDE.md) · 🇵🇹 [pt](../pt/CLAUDE.md) · 🇧🇷 [pt-BR](../pt-BR/CLAUDE.md) · 🇷🇴 [ro](../ro/CLAUDE.md) · 🇷🇺 [ru](../ru/CLAUDE.md) · 🇱🇰 [si](../si/CLAUDE.md) · 🇸🇰 [sk](../sk/CLAUDE.md) · 🇸🇮 [sl](../sl/CLAUDE.md) · 🇷🇸 [sr](../sr/CLAUDE.md) · 🇸🇪 [sv](../sv/CLAUDE.md) · 🇰🇪 [sw](../sw/CLAUDE.md) · 🇮🇳 [ta](../ta/CLAUDE.md) · 🇮🇳 [te](../te/CLAUDE.md) · 🇹🇭 [th](../th/CLAUDE.md) · 🇹🇷 [tr](../tr/CLAUDE.md) · 🇺🇦 [uk-UA](../uk-UA/CLAUDE.md) · 🇵🇰 [ur](../ur/CLAUDE.md) · 🇺🇿 [uz](../uz/CLAUDE.md) · 🇻🇳 [vi](../vi/CLAUDE.md) · 🇳🇬 [yo](../yo/CLAUDE.md) · 🇨🇳 [zh-CN](../zh-CN/CLAUDE.md) · 🇹🇼 [zh-TW](../zh-TW/CLAUDE.md)

---

@AGENTS.md

**प्रकल्पाचे सर्व नियम [`AGENTS.md`](AGENTS.md) मध्ये आहेत** — प्रत्येक AI सहाय्यकासाठी सत्याचा एकमेव स्रोत
(आर्किटेक्चर, संकेतपद्धती, चाचणी, गुणवत्ता द्वारं, git कार्यप्रवाह, 23 कठोर नियम,
PII मधून घेतलेले धडे). ते पूर्णपणे वाचा; प्रकल्पाचे नियम येथे पुन्हा जोडू नका. खालील सर्व बाबी केवळ
Claude Code ला लागू होतात — `AGENTS.md` मध्ये आधीच परिभाषित केलेल्या नियमांचे कार्यात्मक परिष्करण.

## Worktree विलगीकरण — Claude Code साठी विशिष्ट बाबी

संपूर्ण अनिवार्य worktree प्रोटोकॉल (बेस-ब्रँचची पुष्टी, `.claude/worktrees/` प्रमाणित
पथ, `cp -al` node_modules, teardown नियम) `AGENTS.md` → Git Workflow → "Worktree
isolation" मध्ये आहे. Claude-Code-विशिष्ट मुद्दे:

- ऑपरेटरने बेस ब्रँच आधीच सांगितली नसेल, तर `AskUserQuestion` द्वारे तिची पुष्टी करा (कठोर नियम #19).
- मूळ `EnterWorktree` साधनाला प्राधान्य द्या — ते आधीच `.claude/worktrees/`
  (प्रमाणित पथ) अंतर्गत worktrees तयार करते. दस्तऐवजीकरण केलेल्या `git
worktree add` कमांडने worktree तयार करा, त्यानंतर त्याच्या `path` सह `EnterWorktree` कॉल करा.

## सत्रांमधील सुरक्षितता — Claude Code साठी विशिष्ट बाबी

कठोर नियम #19/#21/#22 (`AGENTS.md` मध्ये) समांतर सत्रांना नियंत्रित करतात. या
हर्नेससाठी कार्यात्मक स्मरणपत्रे:

- **git ला स्पर्श करणाऱ्या प्रत्येक subagent च्या prompt मध्ये `git stash` वरील बंदी शब्दशः प्रतिकृत करा**
  (Agent साधन / Workflow स्क्रिप्ट्स) — subagents ना ही फाइल वारशाने मिळत नाही आणि stash घटनेची नोंदवलेली
  पुनरावृत्ती subagent मार्फत झाली होती.
- तुम्ही _या सत्रात_ तयार न केलेल्या कोणत्याही PR मध्ये merge किंवा push करण्यापूर्वी `git worktree list`
  चालवा आणि `gh pr view <N> --json state,headRefOid` पुन्हा तपासा (कठोर नियम #22b).
- प्रत्येक सत्राच्या शेवटी मुख्य checkout ज्या ब्रँचवर सुरू झाले होते त्याच ब्रँचवर ठेवा.

## Superpowers / नियोजन कलाकृती — पथ अधिलिखित मूल्ये

`_tasks/` संकेतपद्धतीची व्याख्या `AGENTS.md` → "Planning & Research Artifacts" मध्ये केली आहे.
superpowers skills सोबत `docs/…` कडे निर्देश करणारी डीफॉल्ट मूल्ये येतात — ती डीफॉल्ट मूल्ये येथे
**अधिलिखित केली आहेत**. एखादे superpowers skill "saved to `docs/superpowers/plans/…`" सारखा पथ
जाहीर करते तेव्हा लिहिण्यापूर्वी तो `_tasks/…` समतुल्य पथाने बदला:

| कलाकृती (skill)                  | डीफॉल्ट (वापरू नका)       | त्याऐवजी येथे जतन करा                                         |
| -------------------------------- | ------------------------- | ------------------------------------------------------------- |
| योजना (`writing-plans`)          | `docs/superpowers/plans/` | `_tasks/superpowers/plans/YYYY-MM-DD-<feature>.md`            |
| तपशील / डिझाइन (`brainstorming`) | `docs/superpowers/specs/` | `_tasks/superpowers/specs/YYYY-MM-DD-<topic>-design.md`       |
| संशोधन (`deep-research`, तदर्थ)  | `docs/research/`          | `_tasks/research/…`                                           |
| हस्तांतरण (`/handoff`)           | —                         | `_tasks/hands-off/<YYYY-MM-DD>_<branch>_v<versão>_sess-<id>/` |

त्या कलाकृती मुख्य repo मध्ये कधीही ठेवू नका; `_tasks/` repo मध्येच commit करा (`git -C _tasks …`).

## Scratch / तात्पुरत्या फाइल्स — `/tmp` ऐवजी `_artifacts/` वापरा

हा प्रकल्प हर्नेसचे डीफॉल्ट सत्र scratchpad (`/tmp/claude-*/…`) अधिलिखित करतो. तात्पुरत्या/कार्यरत
फाइल्स — exports, व्युत्पन्न zips, एकदाच वापरायची मध्यवर्ती outputs, अन्यथा `/tmp` मध्ये ठेवली असती अशी कोणतीही गोष्ट
— त्याऐवजी `/home/diegosouzapw/dev/proxys/OmniRoute/_artifacts/` मध्ये लिहा.

- `_artifacts/` हा root `_*` पथ आहे: आधीच gitignore केलेला (`AGENTS.md` → "Root `_*` paths"), फक्त
  डिस्कवर राहतो, कधीही track केला जात नाही.
- कारण: scratch output प्रकल्पाच्या आत (`/tmp` ऐवजी) ठेवल्यामुळे ऑपरेटरला सर्व तात्पुरत्या गोष्टी
  एकाच ठिकाणी सहज शोधून हटवता येतात; नाहीतर अदृश्य होणाऱ्या किंवा untracked स्वरूपात साचणाऱ्या
  क्षणिक, सत्र-विशिष्ट `/tmp` निर्देशिकांमध्ये शोधावे लागते.
- याची `_tasks/` सोबत **गल्लत करू नका** (कठोर नियम #23, टिकाऊ
  योजना/तपशील/संशोधन/हस्तांतरणासाठी त्याचा स्वतःचा खासगी git repo आहे) — `_artifacts/` केवळ टाकून देण्यायोग्य कार्यरत फाइल्ससाठी आहे;
  येथील कोणत्याही गोष्टीला टिकून राहण्याची किंवा versioning करण्याची गरज नाही.

## PR उघडण्यापूर्वी बेस-ग्रीन

ब्रँच तयार करण्यापूर्वी किंवा PR उघडण्यापूर्वी base-green तपासणी चालवा (`AGENTS.md` → Git Workflow →
"Base-green check"; प्रकल्प skills मध्ये त्याचा संदर्भ `.agents/skills/_shared/base-green.md` असा आहे). बेस tip red असताना
उघडलेल्या PR च्या body मध्ये `⚠️ base-red inherited: #<issue>` असणे आवश्यक आहे. साचलेली red स्थिती
(base tip + red PRs) दूर करण्यासाठी `/sweep-reds` skill वापरा.
