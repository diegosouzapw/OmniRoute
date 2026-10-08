# CLAUDE.md (Kiswahili)

🌐 **Languages:** 🇺🇸 [English](../../../CLAUDE.md) · 🇪🇹 [am](../am/CLAUDE.md) · 🇸🇦 [ar](../ar/CLAUDE.md) · 🇦🇿 [az](../az/CLAUDE.md) · 🇧🇬 [bg](../bg/CLAUDE.md) · 🇧🇩 [bn](../bn/CLAUDE.md) · 🇧🇦 [bs](../bs/CLAUDE.md) · 🇨🇿 [cs](../cs/CLAUDE.md) · 🇩🇰 [da](../da/CLAUDE.md) · 🇩🇪 [de](../de/CLAUDE.md) · 🇬🇷 [el](../el/CLAUDE.md) · 🇪🇸 [es](../es/CLAUDE.md) · 🇪🇪 [et](../et/CLAUDE.md) · 🇮🇷 [fa](../fa/CLAUDE.md) · 🇫🇮 [fi](../fi/CLAUDE.md) · 🇫🇷 [fr](../fr/CLAUDE.md) · 🇮🇪 [ga](../ga/CLAUDE.md) · 🇮🇳 [gu](../gu/CLAUDE.md) · 🇳🇬 [ha](../ha/CLAUDE.md) · 🇮🇱 [he](../he/CLAUDE.md) · 🇮🇳 [hi](../hi/CLAUDE.md) · 🇭🇷 [hr](../hr/CLAUDE.md) · 🇭🇺 [hu](../hu/CLAUDE.md) · 🇦🇲 [hy](../hy/CLAUDE.md) · 🇮🇩 [id](../id/CLAUDE.md) · 🇳🇬 [ig](../ig/CLAUDE.md) · 🇮🇹 [it](../it/CLAUDE.md) · 🇯🇵 [ja](../ja/CLAUDE.md) · 🇬🇪 [ka](../ka/CLAUDE.md) · 🇰🇭 [km](../km/CLAUDE.md) · 🇮🇳 [kn](../kn/CLAUDE.md) · 🇰🇷 [ko](../ko/CLAUDE.md) · 🇱🇹 [lt](../lt/CLAUDE.md) · 🇱🇻 [lv](../lv/CLAUDE.md) · 🇮🇳 [ml](../ml/CLAUDE.md) · 🇮🇳 [mr](../mr/CLAUDE.md) · 🇲🇾 [ms](../ms/CLAUDE.md) · 🇲🇹 [mt](../mt/CLAUDE.md) · 🇲🇲 [my](../my/CLAUDE.md) · 🇳🇵 [ne](../ne/CLAUDE.md) · 🇳🇱 [nl](../nl/CLAUDE.md) · 🇳🇴 [no](../no/CLAUDE.md) · 🇮🇳 [or](../or/CLAUDE.md) · 🇮🇳 [pa](../pa/CLAUDE.md) · 🇵🇭 [phi](../phi/CLAUDE.md) · 🇵🇱 [pl](../pl/CLAUDE.md) · 🇵🇹 [pt](../pt/CLAUDE.md) · 🇧🇷 [pt-BR](../pt-BR/CLAUDE.md) · 🇷🇴 [ro](../ro/CLAUDE.md) · 🇷🇺 [ru](../ru/CLAUDE.md) · 🇱🇰 [si](../si/CLAUDE.md) · 🇸🇰 [sk](../sk/CLAUDE.md) · 🇸🇮 [sl](../sl/CLAUDE.md) · 🇷🇸 [sr](../sr/CLAUDE.md) · 🇸🇪 [sv](../sv/CLAUDE.md) · 🇮🇳 [ta](../ta/CLAUDE.md) · 🇮🇳 [te](../te/CLAUDE.md) · 🇹🇭 [th](../th/CLAUDE.md) · 🇹🇷 [tr](../tr/CLAUDE.md) · 🇺🇦 [uk-UA](../uk-UA/CLAUDE.md) · 🇵🇰 [ur](../ur/CLAUDE.md) · 🇺🇿 [uz](../uz/CLAUDE.md) · 🇻🇳 [vi](../vi/CLAUDE.md) · 🇳🇬 [yo](../yo/CLAUDE.md) · 🇨🇳 [zh-CN](../zh-CN/CLAUDE.md) · 🇹🇼 [zh-TW](../zh-TW/CLAUDE.md)

---

@AGENTS.md

**Sheria zote za mradi zimo katika [`AGENTS.md`](AGENTS.md)** — chanzo pekee cha ukweli kwa kila
msaidizi wa AI (usanifu, kanuni, majaribio, vigezo vya ubora, mtiririko wa kazi wa git, Sheria 23
Ngumu, mafunzo kuhusu PII). Isome kikamilifu; usiongeze tena sheria za mradi hapa. Kila kitu hapa
chini kinatumika kwa Claude Code PEKEE — maboresho ya kiutendaji ya sheria ambazo tayari
zimefafanuliwa katika `AGENTS.md`.

## Utengaji wa worktree — mahususi kwa Claude Code

Itifaki kamili ya lazima ya worktree (uthibitishaji wa tawi msingi, njia rasmi ya
`.claude/worktrees/`, `cp -al` node_modules, sheria za kuondoa) iko katika `AGENTS.md` → Git Workflow
→ "Worktree isolation". Mambo mahususi kwa Claude Code:

- Thibitisha tawi msingi na mwendeshaji kupitia `AskUserQuestion` (Sheria Ngumu #19) isipokuwa
  tayari amekwambia.
- Pendelea zana asilia ya `EnterWorktree` — tayari huunda worktree chini ya
  `.claude/worktrees/` (njia rasmi). Unda worktree kwa amri ya `git worktree add`
  iliyoandikwa kwenye nyaraka, kisha uite `EnterWorktree` ukitumia `path` yake.

## Usalama kati ya vipindi — mahususi kwa Claude Code

Sheria Ngumu #19/#21/#22 (katika `AGENTS.md`) zinasimamia vipindi sambamba. Vikumbusho vya
kiutendaji kwa mazingira haya:

- **Rudia marufuku ya `git stash` neno kwa neno katika prompt ya kila subagent inayogusa git**
  (zana ya Agent / hati za Workflow) — subagent hazirithi faili hii, na tukio la stash
  lililojirudia lilitokea kupitia subagent.
- Kabla ya kuunganisha au kusukuma kwenye PR yoyote ambayo hukuiunda _katika kipindi hiki_,
  endesha `git worktree list` na ukague tena `gh pr view <N> --json state,headRefOid`
  (Sheria Ngumu #22b).
- Maliza kila kipindi huku checkout kuu ikiwa kwenye tawi ililoanzia.

## Superpowers / vizalia vya upangaji — ubatilishaji wa njia

Utaratibu wa `_tasks/` umefafanuliwa katika `AGENTS.md` → "Planning & Research Artifacts". Skills
za superpowers huja na chaguo-msingi zinazoelekeza kwenye `docs/…` — chaguo-msingi hizo
**zimebatilishwa hapa**. Wakati skill ya superpowers inapotangaza njia kama "imehifadhiwa katika
`docs/superpowers/plans/…`", iandike upya kuwa njia inayolingana ya `_tasks/…` kabla ya kuandika:

| Kizalia (skill)                   | Chaguo-msingi (USITUMIE)  | Hifadhi hapa badala yake                                      |
| --------------------------------- | ------------------------- | ------------------------------------------------------------- |
| Mipango (`writing-plans`)         | `docs/superpowers/plans/` | `_tasks/superpowers/plans/YYYY-MM-DD-<feature>.md`            |
| Vipimo / muundo (`brainstorming`) | `docs/superpowers/specs/` | `_tasks/superpowers/specs/YYYY-MM-DD-<topic>-design.md`       |
| Utafiti (`deep-research`, ad-hoc) | `docs/research/`          | `_tasks/research/…`                                           |
| Makabidhiano (`/handoff`)         | —                         | `_tasks/hands-off/<YYYY-MM-DD>_<branch>_v<versão>_sess-<id>/` |

Commit vizalia hivyo ndani ya repo ya `_tasks/` (`git -C _tasks …`), kamwe si katika repo kuu.

## Faili za muda / za majaribio — tumia `_artifacts/`, si `/tmp`

Mradi huu unabatilisha scratchpad chaguo-msingi ya kipindi ya mazingira haya
(`/tmp/claude-*/…`). Andika faili za muda/za kufanyia kazi — exports, zip zilizozalishwa, matokeo
ya kati ya matumizi ya mara moja, chochote ambacho ungeweka katika `/tmp` — katika
`/home/diegosouzapw/dev/proxys/OmniRoute/_artifacts/` badala yake.

- `_artifacts/` ni njia ya msingi ya `_*`: tayari imepuuzwa na git (`AGENTS.md` → "Root `_*`
  paths"), ipo kwenye diski pekee, na haifuatiliwi kamwe.
- Sababu: kuweka matokeo ya muda ndani ya mradi (badala ya `/tmp`) humwezesha mwendeshaji kupata
  na kufuta kila kitu cha muda kwa urahisi katika sehemu moja, badala ya kutafuta katika saraka
  za muda za `/tmp` zinazohusiana na vipindi mahususi ambazo hutoweka au kukusanya faili
  zisizofuatiliwa.
- **Usichanganye** hii na `_tasks/` (Sheria Ngumu #23, repo yake binafsi ya git kwa mipango,
  vipimo, utafiti na makabidhiano ya kudumu) — `_artifacts/` ni kwa faili za kufanyia kazi
  zinazoweza kutupwa pekee; hakuna kitu hapa kinachohitaji kudumu au kudhibitiwa kwa matoleo.

## Hakikisha msingi ni wa kijani kabla ya kufungua PR

Kabla ya kuunda tawi au kufungua PR, endesha ukaguzi wa base-green (`AGENTS.md` → Git Workflow →
"Base-green check"; skills za mradi zinarejelea kama `.agents/skills/_shared/base-green.md`). PR
iliyofunguliwa wakati ncha ya msingi ni nyekundu lazima iwe na `⚠️ base-red inherited: #<issue>`
katika maelezo yake. Ili kuondoa hali nyekundu iliyolimbikizwa (ncha ya msingi + PR nyekundu),
tumia skill ya `/sweep-reds`.
