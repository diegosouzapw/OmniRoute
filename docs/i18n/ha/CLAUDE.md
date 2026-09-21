# CLAUDE.md (Hausa)

🌐 **Languages:** 🇺🇸 [English](../../../CLAUDE.md) · 🇪🇹 [am](../am/CLAUDE.md) · 🇸🇦 [ar](../ar/CLAUDE.md) · 🇦🇿 [az](../az/CLAUDE.md) · 🇧🇬 [bg](../bg/CLAUDE.md) · 🇧🇩 [bn](../bn/CLAUDE.md) · 🇨🇿 [cs](../cs/CLAUDE.md) · 🇩🇰 [da](../da/CLAUDE.md) · 🇩🇪 [de](../de/CLAUDE.md) · 🇬🇷 [el](../el/CLAUDE.md) · 🇪🇸 [es](../es/CLAUDE.md) · 🇪🇪 [et](../et/CLAUDE.md) · 🇮🇷 [fa](../fa/CLAUDE.md) · 🇫🇮 [fi](../fi/CLAUDE.md) · 🇫🇷 [fr](../fr/CLAUDE.md) · 🇮🇪 [ga](../ga/CLAUDE.md) · 🇮🇳 [gu](../gu/CLAUDE.md) · 🇮🇱 [he](../he/CLAUDE.md) · 🇮🇳 [hi](../hi/CLAUDE.md) · 🇭🇷 [hr](../hr/CLAUDE.md) · 🇭🇺 [hu](../hu/CLAUDE.md) · 🇦🇲 [hy](../hy/CLAUDE.md) · 🇮🇩 [id](../id/CLAUDE.md) · 🇳🇬 [ig](../ig/CLAUDE.md) · 🇮🇹 [it](../it/CLAUDE.md) · 🇯🇵 [ja](../ja/CLAUDE.md) · 🇬🇪 [ka](../ka/CLAUDE.md) · 🇰🇭 [km](../km/CLAUDE.md) · 🇮🇳 [kn](../kn/CLAUDE.md) · 🇰🇷 [ko](../ko/CLAUDE.md) · 🇱🇹 [lt](../lt/CLAUDE.md) · 🇱🇻 [lv](../lv/CLAUDE.md) · 🇮🇳 [ml](../ml/CLAUDE.md) · 🇮🇳 [mr](../mr/CLAUDE.md) · 🇲🇾 [ms](../ms/CLAUDE.md) · 🇲🇹 [mt](../mt/CLAUDE.md) · 🇲🇲 [my](../my/CLAUDE.md) · 🇳🇵 [ne](../ne/CLAUDE.md) · 🇳🇱 [nl](../nl/CLAUDE.md) · 🇳🇴 [no](../no/CLAUDE.md) · 🇮🇳 [or](../or/CLAUDE.md) · 🇮🇳 [pa](../pa/CLAUDE.md) · 🇵🇭 [phi](../phi/CLAUDE.md) · 🇵🇱 [pl](../pl/CLAUDE.md) · 🇵🇹 [pt](../pt/CLAUDE.md) · 🇧🇷 [pt-BR](../pt-BR/CLAUDE.md) · 🇷🇴 [ro](../ro/CLAUDE.md) · 🇷🇺 [ru](../ru/CLAUDE.md) · 🇱🇰 [si](../si/CLAUDE.md) · 🇸🇰 [sk](../sk/CLAUDE.md) · 🇸🇮 [sl](../sl/CLAUDE.md) · 🇷🇸 [sr](../sr/CLAUDE.md) · 🇸🇪 [sv](../sv/CLAUDE.md) · 🇰🇪 [sw](../sw/CLAUDE.md) · 🇮🇳 [ta](../ta/CLAUDE.md) · 🇮🇳 [te](../te/CLAUDE.md) · 🇹🇭 [th](../th/CLAUDE.md) · 🇹🇷 [tr](../tr/CLAUDE.md) · 🇺🇦 [uk-UA](../uk-UA/CLAUDE.md) · 🇵🇰 [ur](../ur/CLAUDE.md) · 🇺🇿 [uz](../uz/CLAUDE.md) · 🇻🇳 [vi](../vi/CLAUDE.md) · 🇳🇬 [yo](../yo/CLAUDE.md) · 🇨🇳 [zh-CN](../zh-CN/CLAUDE.md) · 🇹🇼 [zh-TW](../zh-TW/CLAUDE.md)

---

@AGENTS.md

**Dukkan ƙa'idojin aikin suna cikin [`AGENTS.md`](AGENTS.md)** — shi ne tushen gaskiya guda ɗaya ga kowane mataimakin AI
(gine-gine, ƙa'idojin aiki, gwaji, matakan tabbatar da inganci, tsarin aikin git, Ƙa'idoji Masu Tsauri 23,
abubuwan da aka koya game da PII). Karanta shi gaba ɗaya; kada ka sake ƙara ƙa'idojin aikin a nan. Duk abin da ke ƙasa ya shafi Claude Code KAWAI
— gyare-gyaren gudanarwa na ƙa'idojin da aka riga aka bayyana a cikin `AGENTS.md`.

## Keɓewar worktree — takamaiman bayanai na Claude Code

Cikakkiyar ƙa'idar worktree ta dole (tabbatar da reshen tushe, hanyar `.claude/worktrees/` ta ƙa'ida,
`cp -al` node_modules, ƙa'idojin rushewa) tana cikin `AGENTS.md` → Git Workflow → "Worktree
isolation". Abubuwan da suka shafi Claude Code kaɗai:

- Tabbatar da reshen tushe tare da mai gudanarwa ta hanyar `AskUserQuestion` (Ƙa'ida Mai Tsauri #19) sai dai idan ya
  riga ya gaya maka.
- Fi son amfani da kayan aikin asali na `EnterWorktree` — ya riga ya ƙirƙiri worktrees a ƙarƙashin
  `.claude/worktrees/` (hanyar ƙa'ida). Ƙirƙiri worktree da umarnin `git
worktree add` da aka rubuta, sannan ka kira `EnterWorktree` tare da `path` ɗinsa.

## Tsaro tsakanin zaman aiki — takamaiman bayanai na Claude Code

Ƙa'idoji Masu Tsauri #19/#21/#22 (a cikin `AGENTS.md`) suna tafiyar da zaman aiki masu gudana a lokaci guda. Tunatarwar gudanarwa ga wannan
tsari:

- **Maimaita haramcin `git stash` kalma-da-kalma a cikin umarnin kowane ƙaramin wakili da zai taɓa git**
  (kayan aikin Agent / rubutun Workflow) — ƙananan wakilai ba sa gadon wannan fayil, kuma maimaituwar
  matsalar stash da aka rubuta ta faru ne ta hannun ƙaramin wakili.
- Kafin haɗawa ko turawa zuwa kowane PR da ba ka ƙirƙira ba _a wannan zaman_, gudanar da `git worktree list`
  sannan ka sake duba `gh pr view <N> --json state,headRefOid` (Ƙa'ida Mai Tsauri #22b).
- Ƙare kowane zaman aiki tare da babban wurin checkout a reshen da ya fara a kai.

## Superpowers / kayan tsarawa — sauya hanyoyi

An bayyana tsarin `_tasks/` a cikin `AGENTS.md` → "Planning & Research Artifacts". Ƙwarewar
superpowers suna zuwa da tsoffin saituna masu nuni zuwa `docs/…` — waɗannan tsoffin saitunan an **sauya su
a nan**. Idan wata ƙwarewar superpowers ta sanar da hanya kamar "an adana a `docs/superpowers/plans/…`",
sake rubuta ta zuwa makamanciyar hanyar `_tasks/…` kafin rubutawa:

| Kayan aiki (ƙwarewa)                         | Tsohuwar hanya (KADA a yi amfani da ita) | Ajiye a nan maimakon haka                                     |
| -------------------------------------------- | ---------------------------------------- | ------------------------------------------------------------- |
| Tsare-tsare (`writing-plans`)                | `docs/superpowers/plans/`                | `_tasks/superpowers/plans/YYYY-MM-DD-<feature>.md`            |
| Ƙayyadaddun bayanai / ƙira (`brainstorming`) | `docs/superpowers/specs/`                | `_tasks/superpowers/specs/YYYY-MM-DD-<topic>-design.md`       |
| Bincike (`deep-research`, na lokaci-lokaci)  | `docs/research/`                         | `_tasks/research/…`                                           |
| Miƙa aiki (`/handoff`)                       | —                                        | `_tasks/hands-off/<YYYY-MM-DD>_<branch>_v<versão>_sess-<id>/` |

Yi commit na waɗannan kayan a cikin ma'ajiyar `_tasks/` (`git -C _tasks …`), ba a cikin babban ma'ajiyar ba.

## Fayilolin gwaji / na wucin gadi — yi amfani da `_artifacts/`, ba `/tmp` ba

Wannan aikin ya sauya tsohon wurin rubutun gwaji na zaman aiki na tsarin (`/tmp/claude-*/…`). Rubuta
fayilolin wucin gadi/na aiki — exports, zip da aka samar, sakamakon matsakaici na amfani sau ɗaya, duk abin da
da in ba haka ba za ka saka a `/tmp` — zuwa `/home/diegosouzapw/dev/proxys/OmniRoute/_artifacts/` maimakon haka.

- `_artifacts/` hanya ce ta tushen `_*`: an riga an sanya ta cikin gitignore (`AGENTS.md` → "Root `_*` paths"), tana
  kan faifai kawai, ba a taɓa bibiyarta.
- Dalili: ajiye sakamakon gwaji a cikin aikin (maimakon `/tmp`) yana sauƙaƙa wa mai gudanarwa
  ganowa da share duk abin wucin gadi a wuri guda, maimakon nema a cikin manyan fayilolin
  `/tmp` na musamman ga zaman aiki waɗanda suke ɓacewa ko tara abubuwan da ba a bibiyarsu.
- Kada ka **rikita** wannan da `_tasks/` (Ƙa'ida Mai Tsauri #23, ma'ajiyar git mai zaman kanta don
  tsare-tsare/ƙayyadaddun bayanai/bincike/miƙa aiki masu ɗorewa) — `_artifacts/` na fayilolin aiki masu yarwa ne kawai, babu abin
  da ke nan da yake buƙatar tsira ko a ba shi sigar.

## Tabbatar da koren tushe kafin buɗe PRs

Kafin ƙirƙirar reshe ko buɗe PR, gudanar da binciken koren tushe (`AGENTS.md` → Git Workflow →
"Base-green check"; ƙwarewar aikin tana ambatonsa a matsayin `.agents/skills/_shared/base-green.md`). Duk PR da
aka buɗe alhali ƙarshen tushe ja ne dole ne ya ƙunshi `⚠️ base-red inherited: #<issue>` a jikinsa. Don
kawar da tarin yanayin ja (ƙarshen tushe + PRs ja), yi amfani da ƙwarewar `/sweep-reds`.
