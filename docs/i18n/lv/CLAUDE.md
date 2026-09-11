# CLAUDE.md (Latviešu)

🌐 **Languages:** 🇺🇸 [English](../../../CLAUDE.md) · 🇸🇦 [ar](../ar/CLAUDE.md) · 🇦🇿 [az](../az/CLAUDE.md) · 🇧🇬 [bg](../bg/CLAUDE.md) · 🇧🇩 [bn](../bn/CLAUDE.md) · 🇨🇿 [cs](../cs/CLAUDE.md) · 🇩🇰 [da](../da/CLAUDE.md) · 🇩🇪 [de](../de/CLAUDE.md) · 🇬🇷 [el](../el/CLAUDE.md) · 🇪🇸 [es](../es/CLAUDE.md) · 🇪🇪 [et](../et/CLAUDE.md) · 🇮🇷 [fa](../fa/CLAUDE.md) · 🇫🇮 [fi](../fi/CLAUDE.md) · 🇫🇷 [fr](../fr/CLAUDE.md) · 🇮🇪 [ga](../ga/CLAUDE.md) · 🇮🇳 [gu](../gu/CLAUDE.md) · 🇮🇱 [he](../he/CLAUDE.md) · 🇮🇳 [hi](../hi/CLAUDE.md) · 🇭🇷 [hr](../hr/CLAUDE.md) · 🇭🇺 [hu](../hu/CLAUDE.md) · 🇮🇩 [id](../id/CLAUDE.md) · 🇮🇹 [it](../it/CLAUDE.md) · 🇯🇵 [ja](../ja/CLAUDE.md) · 🇰🇷 [ko](../ko/CLAUDE.md) · 🇱🇹 [lt](../lt/CLAUDE.md) · 🇮🇳 [mr](../mr/CLAUDE.md) · 🇲🇾 [ms](../ms/CLAUDE.md) · 🇲🇹 [mt](../mt/CLAUDE.md) · 🇳🇱 [nl](../nl/CLAUDE.md) · 🇳🇴 [no](../no/CLAUDE.md) · 🇵🇭 [phi](../phi/CLAUDE.md) · 🇵🇱 [pl](../pl/CLAUDE.md) · 🇵🇹 [pt](../pt/CLAUDE.md) · 🇧🇷 [pt-BR](../pt-BR/CLAUDE.md) · 🇷🇴 [ro](../ro/CLAUDE.md) · 🇷🇺 [ru](../ru/CLAUDE.md) · 🇸🇰 [sk](../sk/CLAUDE.md) · 🇸🇮 [sl](../sl/CLAUDE.md) · 🇷🇸 [sr](../sr/CLAUDE.md) · 🇸🇪 [sv](../sv/CLAUDE.md) · 🇰🇪 [sw](../sw/CLAUDE.md) · 🇮🇳 [ta](../ta/CLAUDE.md) · 🇮🇳 [te](../te/CLAUDE.md) · 🇹🇭 [th](../th/CLAUDE.md) · 🇹🇷 [tr](../tr/CLAUDE.md) · 🇺🇦 [uk-UA](../uk-UA/CLAUDE.md) · 🇵🇰 [ur](../ur/CLAUDE.md) · 🇻🇳 [vi](../vi/CLAUDE.md) · 🇨🇳 [zh-CN](../zh-CN/CLAUDE.md) · 🇹🇼 [zh-TW](../zh-TW/CLAUDE.md)

---

@AGENTS.md

**Visi projekta noteikumi atrodas [`AGENTS.md`](AGENTS.md)** — tas ir vienīgais patiesības avots ikvienam AI
asistentam (arhitektūrai, konvencijām, testēšanai, kvalitātes vārtejām, git darbplūsmai, 23 stingrajiem
noteikumiem un PII atziņām). Izlasiet to pilnībā; nepievienojiet projekta noteikumus šeit atkārtoti. Viss tālāk
minētais attiecas TIKAI uz Claude Code — tās ir jau `AGENTS.md` definēto noteikumu operatīvās precizēšanas.

## Darba koka izolācija — Claude Code specifika

Pilns obligātais darba koka protokols (bāzes zara apstiprināšana, `.claude/worktrees/` kanoniskais
ceļš, `cp -al` node_modules, nojaukšanas noteikumi) ir aprakstīts `AGENTS.md` → Git darbplūsma → "Darba
koka izolācija". Claude Code specifiskie punkti:

- Apstipriniet bāzes zaru ar operatoru, izmantojot `AskUserQuestion` (stingrais noteikums Nr. 19), ja vien viņš
  to jau nav norādījis.
- Dodiet priekšroku vietējam `EnterWorktree` rīkam — tas jau izveido darba kokus zem
  `.claude/worktrees/` (kanoniskais ceļš). Izveidojiet darba koku ar dokumentēto `git
worktree add` komandu, pēc tam izsauciet `EnterWorktree`, norādot tā `path`.

## Drošība starp sesijām — Claude Code specifika

Stingrie noteikumi Nr. 19/21/22 (sadaļā `AGENTS.md`) regulē paralēlās sesijas. Operatīvie atgādinājumi šai
videi:

- **Atkārtojiet `git stash` aizliegumu burtiski katra apakšaģenta uzvednē, kas mijiedarbojas ar git**
  (Agent rīks / darbplūsmas skripti) — apakšaģenti šo failu nepārmanto, un reģistrētais incidenta atkārtošanās gadījums
  notika caur apakšaģentu.
- Pirms sapludināšanas vai nosūtīšanas uz jebkuru PR, ko šajā sesijā neesat izveidojis, izpildiet `git worktree list`
  un atkārtoti pārbaudiet `gh pr view <N> --json state,headRefOid` (stingrais noteikums Nr. 22b).
- Katru sesiju pabeidziet ar galveno checkout uz tā zara, kurā tā sākās.

## Superpowers / plānošanas artefakti — ceļu pārrakstīšana

Konvencija `_tasks/` ir definēta `AGENTS.md` → "Plānošanas un izpētes artefakti". Superpowers prasmes tiek
piegādātas ar noklusējumiem, kas norāda uz `docs/…` — šie noklusējumi **šeit tiek pārrakstīti**. Kad
Superpowers prasme paziņo par ceļu, piemēram, "saglabāts šeit: `docs/superpowers/plans/…`",
pirms rakstīšanas pārrakstiet to uz atbilstošo `_tasks/…` ekvivalentu:

| Artefakts (prasme)                         | Noklusējums (NELIETOT)    | Saglabāt šeit                                                 |
| ------------------------------------------ | ------------------------- | ------------------------------------------------------------- |
| Plāni (`writing-plans`)                    | `docs/superpowers/plans/` | `_tasks/superpowers/plans/YYYY-MM-DD-<feature>.md`            |
| Specifikācijas / dizains (`brainstorming`) | `docs/superpowers/specs/` | `_tasks/superpowers/specs/YYYY-MM-DD-<topic>-design.md`       |
| Izpēte (`deep-research`, ad-hoc)           | `docs/research/`          | `_tasks/research/…`                                           |
| Nodošana (`/handoff`)                      | —                         | `_tasks/hands-off/<YYYY-MM-DD>_<branch>_v<versão>_sess-<id>/` |

Iesniedziet šos artefaktus `_tasks/` repozitorijā (`git -C _tasks …`), nekad galvenajā repozitorijā.

## Melnraksti / pagaidu faili — izmantojiet `_artifacts/`, nevis `/tmp`

Šis projekts pārraksta vides noklusēto sesijas pagaidu vietu (`/tmp/claude-*/…`). Rakstiet pagaidu/darba failus — eksportus,
ģenerētus zip arhīvus, vienreizējus starpposma failus un visu pārējo, ko citādi ievietotu `/tmp` — uz
`/home/diegosouzapw/dev/proxys/OmniRoute/_artifacts/` tā vietā.

- `_artifacts/` ir saknes `_*` ceļš: tas jau ir ignorēts ar git (`AGENTS.md` → "Saknes `_*` ceļi"), atrodas
  tikai diskā un nekad netiek izsekojams.
- Iemesls: pagaidu izvades saglabāšana projektā (nevis `/tmp`) ļauj operatoram viegli atrast un izdzēst
  visu pagaidu saturu vienuviet, nevis meklēt pa īslaicīgām sesiju `/tmp` direktorijām, kas pazūd vai uzkrājas kā
  neizsekoti faili.
- Nejauciet to ar `_tasks/` (stingrais noteikums Nr. 23, tā ir atsevišķa privāta git repozitorija ilglaicīgiem
  plāniem/specifikācijām/izpētei/nodošanas materiāliem) — `_artifacts/` ir paredzēts tikai vienreiz lietojamiem darba
  failiem; nekas tajā nav jāsaglabā vai jāversijē.

## Bāzes stāvoklim jābūt zaļam pirms PR atvēršanas

Pirms zara izveides vai PR atvēršanas palaidiet bāzes stāvokļa pārbaudi (`AGENTS.md` → Git darbplūsma →
"Bāzes stāvokļa pārbaude"; projekta prasmes uz to atsaucas kā uz `.agents/skills/_shared/base-green.md`). PR,
kas atvērts, kamēr bāzes galapunkts ir sarkans, savā aprakstā ir jānorāda `⚠️ base-red inherited: #<issue>`. Lai
novērstu uzkrājušos sarkano stāvokli (bāzes galapunkts un sarkanie PR), izmantojiet prasmi `/sweep-reds`.
