# CLAUDE.md (Eesti)

🌐 **Languages:** 🇺🇸 [English](../../../CLAUDE.md) · 🇸🇦 [ar](../ar/CLAUDE.md) · 🇦🇿 [az](../az/CLAUDE.md) · 🇧🇬 [bg](../bg/CLAUDE.md) · 🇧🇩 [bn](../bn/CLAUDE.md) · 🇨🇿 [cs](../cs/CLAUDE.md) · 🇩🇰 [da](../da/CLAUDE.md) · 🇩🇪 [de](../de/CLAUDE.md) · 🇬🇷 [el](../el/CLAUDE.md) · 🇪🇸 [es](../es/CLAUDE.md) · 🇮🇷 [fa](../fa/CLAUDE.md) · 🇫🇮 [fi](../fi/CLAUDE.md) · 🇫🇷 [fr](../fr/CLAUDE.md) · 🇮🇪 [ga](../ga/CLAUDE.md) · 🇮🇳 [gu](../gu/CLAUDE.md) · 🇮🇱 [he](../he/CLAUDE.md) · 🇮🇳 [hi](../hi/CLAUDE.md) · 🇭🇷 [hr](../hr/CLAUDE.md) · 🇭🇺 [hu](../hu/CLAUDE.md) · 🇮🇩 [id](../id/CLAUDE.md) · 🇮🇹 [it](../it/CLAUDE.md) · 🇯🇵 [ja](../ja/CLAUDE.md) · 🇰🇷 [ko](../ko/CLAUDE.md) · 🇱🇹 [lt](../lt/CLAUDE.md) · 🇱🇻 [lv](../lv/CLAUDE.md) · 🇮🇳 [mr](../mr/CLAUDE.md) · 🇲🇾 [ms](../ms/CLAUDE.md) · 🇲🇹 [mt](../mt/CLAUDE.md) · 🇳🇱 [nl](../nl/CLAUDE.md) · 🇳🇴 [no](../no/CLAUDE.md) · 🇵🇭 [phi](../phi/CLAUDE.md) · 🇵🇱 [pl](../pl/CLAUDE.md) · 🇵🇹 [pt](../pt/CLAUDE.md) · 🇧🇷 [pt-BR](../pt-BR/CLAUDE.md) · 🇷🇴 [ro](../ro/CLAUDE.md) · 🇷🇺 [ru](../ru/CLAUDE.md) · 🇸🇰 [sk](../sk/CLAUDE.md) · 🇸🇮 [sl](../sl/CLAUDE.md) · 🇷🇸 [sr](../sr/CLAUDE.md) · 🇸🇪 [sv](../sv/CLAUDE.md) · 🇰🇪 [sw](../sw/CLAUDE.md) · 🇮🇳 [ta](../ta/CLAUDE.md) · 🇮🇳 [te](../te/CLAUDE.md) · 🇹🇭 [th](../th/CLAUDE.md) · 🇹🇷 [tr](../tr/CLAUDE.md) · 🇺🇦 [uk-UA](../uk-UA/CLAUDE.md) · 🇵🇰 [ur](../ur/CLAUDE.md) · 🇻🇳 [vi](../vi/CLAUDE.md) · 🇨🇳 [zh-CN](../zh-CN/CLAUDE.md) · 🇹🇼 [zh-TW](../zh-TW/CLAUDE.md)

---

@AGENTS.md

**Kõik projekti reeglid asuvad failis [`AGENTS.md`](AGENTS.md)** — see on iga AI-assistendi jaoks
ainus tõeallikas (arhitektuur, kokkulepped, testimine, kvaliteediväravad, giti töövoog, 23 ranget
reeglit, isikuandmetega seotud õppetunnid). Loe see täielikult läbi; ära lisa projekti reegleid siia
uuesti. Kõik alljärgnev kehtib AINULT Claude Code'i kohta — need on failis `AGENTS.md` juba
määratletud reeglite praktilised täpsustused.

## Tööpuu isoleerimine — Claude Code'i eripärad

Täielik kohustuslik tööpuuprotokoll (baasharu kinnitamine, `.claude/worktrees/` kui kanooniline
asukoht, `cp -al` node_modules, eemaldamisreeglid) asub jaotises `AGENTS.md` → Giti töövoog →
„Tööpuu isoleerimine“. Claude Code'i spetsiifilised punktid:

- Kinnita baasharu operaatoriga tööriista `AskUserQuestion` kaudu (range reegel nr 19), kui ta
  pole seda juba öelnud.
- Eelista sisseehitatud tööriista `EnterWorktree` — see loob tööpuud juba kataloogi
  `.claude/worktrees/` (kanooniline asukoht). Loo tööpuu dokumenteeritud käsuga `git
worktree add` ja kutsu seejärel välja `EnterWorktree`, edastades selle `path`.

## Seanssidevaheline ohutus — Claude Code'i eripärad

Ranged reeglid nr 19/21/22 (failis `AGENTS.md`) reguleerivad paralleelseid seansse. Praktilised
meeldetuletused selle töökeskkonna jaoks:

- **Korda `git stash` keeldu sõna-sõnalt iga giti puudutava alamagendi viibas**
  (tööriist Agent / Workflow-skriptid) — alamagendid ei päri seda faili ning registreeritud
  stash-intsidendi kordumine toimus alamagendi kaudu.
- Enne sellise PR-i ühendamist või push'imist, mida sa _selle seansi jooksul_ ei loonud, käivita
  `git worktree list` ja kontrolli uuesti käsuga `gh pr view <N> --json state,headRefOid`
  (range reegel nr 22b).
- Lõpeta iga seanss nii, et põhiväljavõte asub harus, kus see seansi alguses oli.

## Superpowers / planeerimisartefaktid — asukohtade ülekirjutused

Kokkulepe `_tasks/` on määratletud failis `AGENTS.md` → „Planeerimis- ja uurimisartefaktid“.
Superpowersi oskuste vaikeväärtused osutavad asukohtadele `docs/…` — need vaikeväärtused on
**siin üle kirjutatud**. Kui mõni Superpowersi oskus teatab asukohast, näiteks „salvestatud
asukohta `docs/superpowers/plans/…`“, asenda see enne kirjutamist vastava `_tasks/…` asukohaga:

| Artefakt (oskus)                              | Vaikeasukoht (ÄRA kasuta) | Salvesta selle asemel siia                                    |
| --------------------------------------------- | ------------------------- | ------------------------------------------------------------- |
| Plaanid (`writing-plans`)                     | `docs/superpowers/plans/` | `_tasks/superpowers/plans/YYYY-MM-DD-<feature>.md`            |
| Spetsifikatsioonid / disain (`brainstorming`) | `docs/superpowers/specs/` | `_tasks/superpowers/specs/YYYY-MM-DD-<topic>-design.md`       |
| Uurimistöö (`deep-research`, ühekordne)       | `docs/research/`          | `_tasks/research/…`                                           |
| Üleandmised (`/handoff`)                      | —                         | `_tasks/hands-off/<YYYY-MM-DD>_<branch>_v<versão>_sess-<id>/` |

Commit'i need artefaktid repositooriumis `_tasks/` (`git -C _tasks …`), mitte kunagi
põhirepositooriumis.

## Mustand- ja ajutised failid — kasuta `_artifacts/`, mitte `/tmp`

See projekt kirjutab üle töökeskkonna seansi mustandiala vaikeasukoha (`/tmp/claude-*/…`).
Kirjuta ajutised/tööfailid — ekspordid, genereeritud zip-failid, ühekordsed vahetulemused ja kõik,
mille muidu paigutaksid kataloogi `/tmp` — selle asemel asukohta
`/home/diegosouzapw/dev/proxys/OmniRoute/_artifacts/`.

- `_artifacts/` on juurtaseme `_*` asukoht: git juba ignoreerib seda (`AGENTS.md` → „Juurtaseme
  `_*` asukohad“), see eksisteerib ainult kettal ja seda ei jälgita kunagi.
- Põhjus: mustandväljundi hoidmine projektis (mitte kataloogis `/tmp`) võimaldab operaatoril
  hõlpsasti leida ja kustutada kõik ajutise ühest kohast, selle asemel et otsida seda mööduvatest
  seansipõhistest `/tmp` kataloogidest, mis kaovad või kuhu kuhjuvad jälgimata failid.
- Ära aja seda segamini asukohaga `_tasks/` (range reegel nr 23, selle enda privaatne
  git-repositoorium püsivate plaanide/spetsifikatsioonide/uurimistööde/üleandmiste jaoks) —
  `_artifacts/` on mõeldud ainult ühekordsetele tööfailidele; miski siin ei pea säilima ega olema
  versioonitud.

## Roheline baasharu enne PR-ide avamist

Enne haru loomist või PR-i avamist käivita baasharu rohelisuse kontroll (`AGENTS.md` → Giti
töövoog → „Baasharu rohelisuse kontroll“; projekti oskused viitavad sellele kui
`.agents/skills/_shared/base-green.md`). Kui PR avatakse ajal, mil baasharu tipp on punane, peab
selle kirjeldus sisaldama teksti `⚠️ base-red inherited: #<issue>`. Kuhjunud punase oleku
(baasharu tipp + punased PR-id) kõrvaldamiseks kasuta oskust `/sweep-reds`.
