# CLAUDE.md (नेपाली)

🌐 **Languages:** 🇺🇸 [English](../../../CLAUDE.md) · 🇪🇹 [am](../am/CLAUDE.md) · 🇸🇦 [ar](../ar/CLAUDE.md) · 🇦🇿 [az](../az/CLAUDE.md) · 🇧🇬 [bg](../bg/CLAUDE.md) · 🇧🇩 [bn](../bn/CLAUDE.md) · 🇧🇦 [bs](../bs/CLAUDE.md) · 🇨🇿 [cs](../cs/CLAUDE.md) · 🇩🇰 [da](../da/CLAUDE.md) · 🇩🇪 [de](../de/CLAUDE.md) · 🇬🇷 [el](../el/CLAUDE.md) · 🇪🇸 [es](../es/CLAUDE.md) · 🇪🇪 [et](../et/CLAUDE.md) · 🇮🇷 [fa](../fa/CLAUDE.md) · 🇫🇮 [fi](../fi/CLAUDE.md) · 🇫🇷 [fr](../fr/CLAUDE.md) · 🇮🇪 [ga](../ga/CLAUDE.md) · 🇮🇳 [gu](../gu/CLAUDE.md) · 🇳🇬 [ha](../ha/CLAUDE.md) · 🇮🇱 [he](../he/CLAUDE.md) · 🇮🇳 [hi](../hi/CLAUDE.md) · 🇭🇷 [hr](../hr/CLAUDE.md) · 🇭🇺 [hu](../hu/CLAUDE.md) · 🇦🇲 [hy](../hy/CLAUDE.md) · 🇮🇩 [id](../id/CLAUDE.md) · 🇳🇬 [ig](../ig/CLAUDE.md) · 🇮🇹 [it](../it/CLAUDE.md) · 🇯🇵 [ja](../ja/CLAUDE.md) · 🇬🇪 [ka](../ka/CLAUDE.md) · 🇰🇭 [km](../km/CLAUDE.md) · 🇮🇳 [kn](../kn/CLAUDE.md) · 🇰🇷 [ko](../ko/CLAUDE.md) · 🇱🇹 [lt](../lt/CLAUDE.md) · 🇱🇻 [lv](../lv/CLAUDE.md) · 🇮🇳 [ml](../ml/CLAUDE.md) · 🇮🇳 [mr](../mr/CLAUDE.md) · 🇲🇾 [ms](../ms/CLAUDE.md) · 🇲🇹 [mt](../mt/CLAUDE.md) · 🇲🇲 [my](../my/CLAUDE.md) · 🇳🇱 [nl](../nl/CLAUDE.md) · 🇳🇴 [no](../no/CLAUDE.md) · 🇮🇳 [or](../or/CLAUDE.md) · 🇮🇳 [pa](../pa/CLAUDE.md) · 🇵🇭 [phi](../phi/CLAUDE.md) · 🇵🇱 [pl](../pl/CLAUDE.md) · 🇵🇹 [pt](../pt/CLAUDE.md) · 🇧🇷 [pt-BR](../pt-BR/CLAUDE.md) · 🇷🇴 [ro](../ro/CLAUDE.md) · 🇷🇺 [ru](../ru/CLAUDE.md) · 🇱🇰 [si](../si/CLAUDE.md) · 🇸🇰 [sk](../sk/CLAUDE.md) · 🇸🇮 [sl](../sl/CLAUDE.md) · 🇷🇸 [sr](../sr/CLAUDE.md) · 🇸🇪 [sv](../sv/CLAUDE.md) · 🇰🇪 [sw](../sw/CLAUDE.md) · 🇮🇳 [ta](../ta/CLAUDE.md) · 🇮🇳 [te](../te/CLAUDE.md) · 🇹🇭 [th](../th/CLAUDE.md) · 🇹🇷 [tr](../tr/CLAUDE.md) · 🇺🇦 [uk-UA](../uk-UA/CLAUDE.md) · 🇵🇰 [ur](../ur/CLAUDE.md) · 🇺🇿 [uz](../uz/CLAUDE.md) · 🇻🇳 [vi](../vi/CLAUDE.md) · 🇳🇬 [yo](../yo/CLAUDE.md) · 🇨🇳 [zh-CN](../zh-CN/CLAUDE.md) · 🇹🇼 [zh-TW](../zh-TW/CLAUDE.md)

---

@AGENTS.md

**परियोजनाका सबै नियमहरू [`AGENTS.md`](AGENTS.md) मा छन्** — प्रत्येक AI सहायकका लागि सत्यको एकल स्रोत
(आर्किटेक्चर, प्रचलनहरू, परीक्षण, गुणस्तर गेटहरू, git कार्यप्रवाह, 23 वटा कडा नियमहरू,
PII सिकाइहरू)। यसलाई पूर्ण रूपमा पढ्नुहोस्; परियोजनाका नियमहरू यहाँ पुनः नथप्नुहोस्। तलका सबै कुरा
Claude Code मा मात्र लागू हुन्छन् — `AGENTS.md` मा पहिले नै परिभाषित नियमहरूका सञ्चालनगत परिष्करणहरू।

## Worktree पृथकीकरण — Claude Code का विशिष्टताहरू

पूर्ण अनिवार्य worktree प्रोटोकल (आधार शाखा पुष्टि, `.claude/worktrees/` को प्रामाणिक
पथ, `cp -al` node_modules, हटाउने नियमहरू) `AGENTS.md` → Git कार्यप्रवाह → "Worktree
पृथकीकरण" मा छ। Claude-Code-विशिष्ट बुँदाहरू:

- सञ्चालकले पहिले नै नभनेसम्म `AskUserQuestion` मार्फत आधार शाखा पुष्टि गर्नुहोस् (कडा नियम #19)।
- मूल `EnterWorktree` उपकरणलाई प्राथमिकता दिनुहोस् — यसले worktree हरू पहिले नै
  `.claude/worktrees/` (प्रामाणिक पथ) अन्तर्गत सिर्जना गर्छ। दस्तावेजीकृत `git
worktree add` आदेशद्वारा worktree सिर्जना गर्नुहोस्, त्यसपछि यसको `path` सहित `EnterWorktree` बोलाउनुहोस्।

## सत्र-पार सुरक्षा — Claude Code का विशिष्टताहरू

कडा नियमहरू #19/#21/#22 (`AGENTS.md` मा) ले समानान्तर सत्रहरूलाई नियन्त्रित गर्छन्। यस
हार्नेसका लागि सञ्चालनगत सम्झनाहरू:

- **git छुने प्रत्येक subagent को prompt मा `git stash` प्रतिबन्ध हुबहु दोहोर्याउनुहोस्**
  (Agent उपकरण / Workflow scripts) — subagent हरूले यो फाइल उत्तराधिकारमा पाउँदैनन्, र stash घटनाको
  अभिलेखित पुनरावृत्ति subagent मार्फत भएको थियो।
- तपाईंले _यस सत्रमा_ सिर्जना नगरेको कुनै पनि PR मा merge वा push गर्नुअघि `git worktree list`
  चलाउनुहोस् र `gh pr view <N> --json state,headRefOid` पुनः जाँच गर्नुहोस् (कडा नियम #22b)।
- प्रत्येक सत्रको अन्त्यमा मुख्य checkout लाई सुरु भएको शाखामै राख्नुहोस्।

## Superpowers / योजना आर्टिफ्याक्टहरू — पथ अधिलेखनहरू

`_tasks/` प्रचलन `AGENTS.md` → "योजना तथा अनुसन्धान आर्टिफ्याक्टहरू" मा परिभाषित छ।
superpowers skills सँग `docs/…` तर्फ सङ्केत गर्ने पूर्वनिर्धारित मानहरू आउँछन् — ती पूर्वनिर्धारित मानहरूलाई **यहाँ
अधिलेखन गरिएको छ**। कुनै superpowers skill ले "saved to `docs/superpowers/plans/…`" जस्तो पथ घोषणा गर्दा,
लेख्नुअघि त्यसलाई `_tasks/…` को समकक्षमा पुनर्लेखन गर्नुहोस्:

| आर्टिफ्याक्ट (skill)                    | पूर्वनिर्धारित (प्रयोग नगर्नुहोस्) | यसको सट्टा यहाँ बचत गर्नुहोस्                                 |
| --------------------------------------- | ---------------------------------- | ------------------------------------------------------------- |
| योजनाहरू (`writing-plans`)              | `docs/superpowers/plans/`          | `_tasks/superpowers/plans/YYYY-MM-DD-<feature>.md`            |
| विनिर्देशहरू / डिजाइन (`brainstorming`) | `docs/superpowers/specs/`          | `_tasks/superpowers/specs/YYYY-MM-DD-<topic>-design.md`       |
| अनुसन्धान (`deep-research`, तदर्थ)      | `docs/research/`                   | `_tasks/research/…`                                           |
| हस्तान्तरणहरू (`/handoff`)              | —                                  | `_tasks/hands-off/<YYYY-MM-DD>_<branch>_v<versão>_sess-<id>/` |

ती आर्टिफ्याक्टहरूलाई `_tasks/` repo भित्र commit गर्नुहोस् (`git -C _tasks …`), मुख्य repo मा कहिल्यै नगर्नुहोस्।

## Scratch / अस्थायी फाइलहरू — `/tmp` होइन, `_artifacts/` प्रयोग गर्नुहोस्

यो परियोजनाले हार्नेसको पूर्वनिर्धारित सत्र scratchpad (`/tmp/claude-*/…`) लाई अधिलेखन गर्छ। अस्थायी/कार्यरत
फाइलहरू — exports, उत्पन्न गरिएका zips, एकपटकका मध्यवर्ती outputs, अन्यथा `/tmp` मा राख्ने जुनसुकै कुरा —
यसको सट्टा `/home/diegosouzapw/dev/proxys/OmniRoute/_artifacts/` मा लेख्नुहोस्।

- `_artifacts/` एउटा root `_*` पथ हो: पहिले नै gitignored छ (`AGENTS.md` → "Root `_*` paths"), केवल
  डिस्कमा रहन्छ, कहिल्यै track हुँदैन।
- कारण: scratch output लाई परियोजनाभित्र राख्दा (`/tmp` को सट्टा) सञ्चालकलाई सबै अस्थायी कुरा
  एकै ठाउँमा फेला पार्न र मेटाउन अत्यन्त सजिलो हुन्छ, नत्र हराउने वा untracked रूपमा थुप्रिने
  क्षणिक सत्र-विशिष्ट `/tmp` डाइरेक्टरीहरूमा खोजिरहनुपर्छ।
- यसलाई `_tasks/` सँग **नझुक्क्याउनुहोस्** (कडा नियम #23, टिकाउ
  योजना/विनिर्देश/अनुसन्धान/हस्तान्तरणहरूका लागि यसको आफ्नै निजी git repo) — `_artifacts/` केवल फाल्न मिल्ने कार्यरत फाइलहरूका लागि हो,
  यहाँका कुनै पनि कुरा जीवित रहन वा versioned हुन आवश्यक छैन।

## PR खोल्नुअघि आधार हरियो बनाउनुहोस्

शाखा काट्न वा PR खोल्नुअघि base-green जाँच चलाउनुहोस् (`AGENTS.md` → Git कार्यप्रवाह →
"Base-green जाँच"; परियोजनाका skills ले यसलाई `.agents/skills/_shared/base-green.md` का रूपमा सन्दर्भ गर्छन्)। आधारको tip रातो हुँदा
खोलिएको PR को body मा `⚠️ base-red inherited: #<issue>` हुनैपर्छ। जम्मा भएको रातो अवस्था
(आधार tip + रातो PR हरू) हटाउन `/sweep-reds` skill प्रयोग गर्नुहोस्।
