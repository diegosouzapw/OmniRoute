# CLAUDE.md (हिन्दी)

🌐 **Languages:** 🇺🇸 [English](../../../CLAUDE.md) · 🇪🇹 [am](../am/CLAUDE.md) · 🇸🇦 [ar](../ar/CLAUDE.md) · 🇦🇿 [az](../az/CLAUDE.md) · 🇧🇬 [bg](../bg/CLAUDE.md) · 🇧🇩 [bn](../bn/CLAUDE.md) · 🇧🇦 [bs](../bs/CLAUDE.md) · 🇨🇿 [cs](../cs/CLAUDE.md) · 🇩🇰 [da](../da/CLAUDE.md) · 🇩🇪 [de](../de/CLAUDE.md) · 🇬🇷 [el](../el/CLAUDE.md) · 🇪🇸 [es](../es/CLAUDE.md) · 🇪🇪 [et](../et/CLAUDE.md) · 🇮🇷 [fa](../fa/CLAUDE.md) · 🇫🇮 [fi](../fi/CLAUDE.md) · 🇫🇷 [fr](../fr/CLAUDE.md) · 🇮🇪 [ga](../ga/CLAUDE.md) · 🇮🇳 [gu](../gu/CLAUDE.md) · 🇳🇬 [ha](../ha/CLAUDE.md) · 🇮🇱 [he](../he/CLAUDE.md) · 🇭🇷 [hr](../hr/CLAUDE.md) · 🇭🇺 [hu](../hu/CLAUDE.md) · 🇦🇲 [hy](../hy/CLAUDE.md) · 🇮🇩 [id](../id/CLAUDE.md) · 🇳🇬 [ig](../ig/CLAUDE.md) · 🇮🇹 [it](../it/CLAUDE.md) · 🇯🇵 [ja](../ja/CLAUDE.md) · 🇬🇪 [ka](../ka/CLAUDE.md) · 🇰🇭 [km](../km/CLAUDE.md) · 🇮🇳 [kn](../kn/CLAUDE.md) · 🇰🇷 [ko](../ko/CLAUDE.md) · 🇱🇹 [lt](../lt/CLAUDE.md) · 🇱🇻 [lv](../lv/CLAUDE.md) · 🇮🇳 [ml](../ml/CLAUDE.md) · 🇮🇳 [mr](../mr/CLAUDE.md) · 🇲🇾 [ms](../ms/CLAUDE.md) · 🇲🇹 [mt](../mt/CLAUDE.md) · 🇲🇲 [my](../my/CLAUDE.md) · 🇳🇵 [ne](../ne/CLAUDE.md) · 🇳🇱 [nl](../nl/CLAUDE.md) · 🇳🇴 [no](../no/CLAUDE.md) · 🇮🇳 [or](../or/CLAUDE.md) · 🇮🇳 [pa](../pa/CLAUDE.md) · 🇵🇭 [phi](../phi/CLAUDE.md) · 🇵🇱 [pl](../pl/CLAUDE.md) · 🇵🇹 [pt](../pt/CLAUDE.md) · 🇧🇷 [pt-BR](../pt-BR/CLAUDE.md) · 🇷🇴 [ro](../ro/CLAUDE.md) · 🇷🇺 [ru](../ru/CLAUDE.md) · 🇱🇰 [si](../si/CLAUDE.md) · 🇸🇰 [sk](../sk/CLAUDE.md) · 🇸🇮 [sl](../sl/CLAUDE.md) · 🇷🇸 [sr](../sr/CLAUDE.md) · 🇸🇪 [sv](../sv/CLAUDE.md) · 🇰🇪 [sw](../sw/CLAUDE.md) · 🇮🇳 [ta](../ta/CLAUDE.md) · 🇮🇳 [te](../te/CLAUDE.md) · 🇹🇭 [th](../th/CLAUDE.md) · 🇹🇷 [tr](../tr/CLAUDE.md) · 🇺🇦 [uk-UA](../uk-UA/CLAUDE.md) · 🇵🇰 [ur](../ur/CLAUDE.md) · 🇺🇿 [uz](../uz/CLAUDE.md) · 🇻🇳 [vi](../vi/CLAUDE.md) · 🇳🇬 [yo](../yo/CLAUDE.md) · 🇨🇳 [zh-CN](../zh-CN/CLAUDE.md) · 🇹🇼 [zh-TW](../zh-TW/CLAUDE.md)

---

@AGENTS.md

**सभी प्रोजेक्ट नियम [`AGENTS.md`](AGENTS.md) में हैं** — प्रत्येक AI सहायक के लिए सत्य का एकमात्र स्रोत
(आर्किटेक्चर, परंपराएँ, परीक्षण, गुणवत्ता द्वार, git वर्कफ़्लो, 23 कठोर नियम,
PII से मिली सीख)। इसे पूरा पढ़ें; प्रोजेक्ट नियमों को यहाँ दोबारा न जोड़ें। नीचे दी गई हर चीज़ केवल
Claude Code पर लागू होती है — `AGENTS.md` में पहले से परिभाषित नियमों के परिचालन संबंधी परिशोधन।

## वर्कट्री पृथक्करण — Claude Code की विशिष्टताएँ

संपूर्ण अनिवार्य वर्कट्री प्रोटोकॉल (बेस-ब्रांच की पुष्टि, `.claude/worktrees/` मानक
पथ, `cp -al` node_modules, हटाने के नियम) `AGENTS.md` → Git Workflow → "Worktree
isolation" में है। Claude-Code-विशिष्ट बिंदु:

- ऑपरेटर से `AskUserQuestion` के माध्यम से बेस ब्रांच की पुष्टि करें (कठोर नियम #19), जब तक कि उन्होंने
  आपको पहले से न बताया हो।
- मूल `EnterWorktree` टूल को प्राथमिकता दें — यह पहले से ही
  `.claude/worktrees/` (मानक पथ) के अंतर्गत वर्कट्री बनाता है। दस्तावेज़ीकृत `git
worktree add` कमांड से वर्कट्री बनाएँ, फिर उसके `path` के साथ `EnterWorktree` को कॉल करें।

## क्रॉस-सेशन सुरक्षा — Claude Code की विशिष्टताएँ

कठोर नियम #19/#21/#22 (`AGENTS.md` में) समानांतर सेशन को नियंत्रित करते हैं। इस
हार्नेस के लिए परिचालन अनुस्मारक:

- **git को प्रभावित करने वाले प्रत्येक सबएजेंट के प्रॉम्प्ट में `git stash` प्रतिबंध को शब्दशः दोहराएँ**
  (Agent टूल / Workflow स्क्रिप्ट) — सबएजेंट इस फ़ाइल को इनहेरिट नहीं करते, और stash घटना की दर्ज
  पुनरावृत्ति एक सबएजेंट के माध्यम से हुई थी।
- किसी ऐसे PR में मर्ज या पुश करने से पहले जिसे आपने _इस सेशन में_ नहीं बनाया है, `git worktree list`
  चलाएँ और `gh pr view <N> --json state,headRefOid` की फिर से जाँच करें (कठोर नियम #22b)।
- प्रत्येक सेशन को मुख्य चेकआउट उसी ब्रांच पर रखकर समाप्त करें, जिस पर वह शुरू हुआ था।

## Superpowers / योजना आर्टिफ़ैक्ट — पथ ओवरराइड

`_tasks/` परंपरा `AGENTS.md` → "Planning & Research Artifacts" में परिभाषित है।
superpowers स्किल्स के डिफ़ॉल्ट `docs/…` की ओर संकेत करते हैं — उन डिफ़ॉल्ट को **यहाँ
ओवरराइड किया गया है**। जब कोई superpowers स्किल "saved to `docs/superpowers/plans/…`" जैसा पथ घोषित करे,
तो लिखने से पहले उसे समकक्ष `_tasks/…` पथ में बदलें:

| आर्टिफ़ैक्ट (स्किल)                   | डिफ़ॉल्ट (उपयोग न करें)   | इसके बजाय यहाँ सहेजें                                         |
| ------------------------------------- | ------------------------- | ------------------------------------------------------------- |
| योजनाएँ (`writing-plans`)             | `docs/superpowers/plans/` | `_tasks/superpowers/plans/YYYY-MM-DD-<feature>.md`            |
| विनिर्देश / डिज़ाइन (`brainstorming`) | `docs/superpowers/specs/` | `_tasks/superpowers/specs/YYYY-MM-DD-<topic>-design.md`       |
| शोध (`deep-research`, तदर्थ)          | `docs/research/`          | `_tasks/research/…`                                           |
| हैंड-ऑफ़ (`/handoff`)                 | —                         | `_tasks/hands-off/<YYYY-MM-DD>_<branch>_v<versão>_sess-<id>/` |

उन आर्टिफ़ैक्ट को `_tasks/` रेपो के भीतर कमिट करें (`git -C _tasks …`), मुख्य रेपो में कभी नहीं।

## स्क्रैच / अस्थायी फ़ाइलें — `/tmp` नहीं, `_artifacts/` का उपयोग करें

यह प्रोजेक्ट हार्नेस के डिफ़ॉल्ट सेशन स्क्रैचपैड (`/tmp/claude-*/…`) को ओवरराइड करता है। अस्थायी/कार्यशील
फ़ाइलें — एक्सपोर्ट, जेनरेट की गई zip फ़ाइलें, एकबारगी मध्यवर्ती आउटपुट, वह सब कुछ जिसे आप अन्यथा
`/tmp` में रखते — इसके बजाय `/home/diegosouzapw/dev/proxys/OmniRoute/_artifacts/` में लिखें।

- `_artifacts/` एक रूट `_*` पथ है: पहले से gitignored है (`AGENTS.md` → "Root `_*` paths"), केवल
  डिस्क पर रहता है, कभी ट्रैक नहीं किया जाता।
- कारण: स्क्रैच आउटपुट को प्रोजेक्ट के भीतर (`/tmp` के बजाय) रखने से ऑपरेटर के लिए
  सभी अस्थायी चीज़ों को एक ही स्थान पर ढूँढना और हटाना आसान हो जाता है, बजाय उन अस्थायी
  सेशन-विशिष्ट `/tmp` डायरेक्टरियों में खोजने के जो गायब हो जाती हैं या बिना ट्रैक हुए जमा होती रहती हैं।
- इसे `_tasks/` (कठोर नियम #23, टिकाऊ
  योजनाओं/विनिर्देशों/शोध/हैंड-ऑफ़ के लिए इसका अपना निजी git रेपो) के साथ **भ्रमित न करें** — `_artifacts/` केवल नष्ट की जा सकने वाली कार्यशील फ़ाइलों के लिए है, यहाँ
  किसी भी चीज़ को सुरक्षित रखने या वर्ज़न करने की आवश्यकता नहीं है।

## PR खोलने से पहले बेस-ग्रीन

ब्रांच काटने या PR खोलने से पहले, बेस-ग्रीन जाँच चलाएँ (`AGENTS.md` → Git Workflow →
"Base-green check"; प्रोजेक्ट स्किल्स इसे `.agents/skills/_shared/base-green.md` के रूप में संदर्भित करती हैं)। यदि
बेस टिप रेड होने के दौरान कोई PR खोला जाता है, तो उसके बॉडी में `⚠️ base-red inherited: #<issue>` होना चाहिए। संचित
रेड स्थिति (बेस टिप + रेड PR) को समाप्त करने के लिए, `/sweep-reds` स्किल का उपयोग करें।
