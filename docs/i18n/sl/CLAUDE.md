# CLAUDE.md (Slovenščina)

🌐 **Languages:** 🇺🇸 [English](../../../CLAUDE.md) · 🇸🇦 [ar](../ar/CLAUDE.md) · 🇦🇿 [az](../az/CLAUDE.md) · 🇧🇬 [bg](../bg/CLAUDE.md) · 🇧🇩 [bn](../bn/CLAUDE.md) · 🇨🇿 [cs](../cs/CLAUDE.md) · 🇩🇰 [da](../da/CLAUDE.md) · 🇩🇪 [de](../de/CLAUDE.md) · 🇬🇷 [el](../el/CLAUDE.md) · 🇪🇸 [es](../es/CLAUDE.md) · 🇪🇪 [et](../et/CLAUDE.md) · 🇮🇷 [fa](../fa/CLAUDE.md) · 🇫🇮 [fi](../fi/CLAUDE.md) · 🇫🇷 [fr](../fr/CLAUDE.md) · 🇮🇪 [ga](../ga/CLAUDE.md) · 🇮🇳 [gu](../gu/CLAUDE.md) · 🇮🇱 [he](../he/CLAUDE.md) · 🇮🇳 [hi](../hi/CLAUDE.md) · 🇭🇷 [hr](../hr/CLAUDE.md) · 🇭🇺 [hu](../hu/CLAUDE.md) · 🇮🇩 [id](../id/CLAUDE.md) · 🇮🇹 [it](../it/CLAUDE.md) · 🇯🇵 [ja](../ja/CLAUDE.md) · 🇰🇷 [ko](../ko/CLAUDE.md) · 🇱🇹 [lt](../lt/CLAUDE.md) · 🇱🇻 [lv](../lv/CLAUDE.md) · 🇮🇳 [mr](../mr/CLAUDE.md) · 🇲🇾 [ms](../ms/CLAUDE.md) · 🇲🇹 [mt](../mt/CLAUDE.md) · 🇳🇱 [nl](../nl/CLAUDE.md) · 🇳🇴 [no](../no/CLAUDE.md) · 🇵🇭 [phi](../phi/CLAUDE.md) · 🇵🇱 [pl](../pl/CLAUDE.md) · 🇵🇹 [pt](../pt/CLAUDE.md) · 🇧🇷 [pt-BR](../pt-BR/CLAUDE.md) · 🇷🇴 [ro](../ro/CLAUDE.md) · 🇷🇺 [ru](../ru/CLAUDE.md) · 🇸🇰 [sk](../sk/CLAUDE.md) · 🇷🇸 [sr](../sr/CLAUDE.md) · 🇸🇪 [sv](../sv/CLAUDE.md) · 🇰🇪 [sw](../sw/CLAUDE.md) · 🇮🇳 [ta](../ta/CLAUDE.md) · 🇮🇳 [te](../te/CLAUDE.md) · 🇹🇭 [th](../th/CLAUDE.md) · 🇹🇷 [tr](../tr/CLAUDE.md) · 🇺🇦 [uk-UA](../uk-UA/CLAUDE.md) · 🇵🇰 [ur](../ur/CLAUDE.md) · 🇻🇳 [vi](../vi/CLAUDE.md) · 🇨🇳 [zh-CN](../zh-CN/CLAUDE.md) · 🇹🇼 [zh-TW](../zh-TW/CLAUDE.md)

---

@AGENTS.md

**Vsa projektna pravila so v datoteki [`AGENTS.md`](AGENTS.md)** — edinem merodajnem viru za vsakega
pomočnika AI (arhitektura, konvencije, testiranje, merila kakovosti, potek dela git, 23 strogih pravil,
spoznanja o PII). Preberite jo v celoti; projektnih pravil ne dodajajte znova sem. Vse spodaj navedeno velja SAMO
za Claude Code — gre za operativne dopolnitve pravil, ki so že opredeljena v `AGENTS.md`.

## Izolacija delovnih dreves — posebnosti za Claude Code

Celoten obvezni protokol za delovna drevesa (potrditev osnovne veje, kanonična pot
`.claude/worktrees/`, `cp -al` node_modules, pravila odstranjevanja) je v `AGENTS.md` → Potek dela Git → »Izolacija
delovnih dreves«. Točke, značilne za Claude Code:

- Osnovno vejo potrdite z upravljavcem prek `AskUserQuestion` (strogo pravilo št. 19), razen če vam jo je
  že navedel.
- Prednost dajte izvornemu orodju `EnterWorktree` — delovna drevesa že ustvarja pod
  `.claude/worktrees/` (kanonična pot). Delovno drevo ustvarite z dokumentiranim ukazom `git
worktree add`, nato pa pokličite `EnterWorktree` z njegovo `path`.

## Varnost med sejami — posebnosti za Claude Code

Stroga pravila št. 19/21/22 (v `AGENTS.md`) urejajo vzporedne seje. Operativni opomniki za to
izvajalno okolje:

- **Prepoved `git stash` dobesedno vključite v poziv vsakega podagenta, ki uporablja git**
  (orodje Agent/skripti Workflow) — podagenti te datoteke ne podedujejo, zabeležena
  ponovitev incidenta s stash pa se je zgodila prek podagenta.
- Pred spajanjem ali potiskanjem v kateri koli PR, ki ga niste ustvarili _v tej seji_, zaženite `git worktree list`
  in ponovno preverite `gh pr view <N> --json state,headRefOid` (strogo pravilo št. 22b).
- Vsako sejo končajte tako, da je glavna delovna kopija na veji, na kateri se je seja začela.

## Superpowers/artefakti načrtovanja — preglasitve poti

Konvencija `_tasks/` je opredeljena v `AGENTS.md` → »Artefakti načrtovanja in raziskovanja«. Veščine
superpowers so privzeto nastavljene na poti v `docs/…` — te privzete vrednosti so **preglašene
tukaj**. Ko veščina superpowers objavi pot, kot je »shranjeno v `docs/superpowers/plans/…`«,
jo pred zapisovanjem spremenite v ustreznico pod `_tasks/…`:

| Artefakt (veščina)                        | Privzeto (NE uporabljajte) | Namesto tega shranite sem                                     |
| ----------------------------------------- | -------------------------- | ------------------------------------------------------------- |
| Načrti (`writing-plans`)                  | `docs/superpowers/plans/`  | `_tasks/superpowers/plans/YYYY-MM-DD-<feature>.md`            |
| Specifikacije/zasnova (`brainstorming`)   | `docs/superpowers/specs/`  | `_tasks/superpowers/specs/YYYY-MM-DD-<topic>-design.md`       |
| Raziskave (`deep-research`, priložnostne) | `docs/research/`           | `_tasks/research/…`                                           |
| Predaje (`/handoff`)                      | —                          | `_tasks/hands-off/<YYYY-MM-DD>_<branch>_v<versão>_sess-<id>/` |

Te artefakte vključite v objavo znotraj repozitorija `_tasks/` (`git -C _tasks …`), nikoli v glavnem repozitoriju.

## Delovne/začasne datoteke — uporabljajte `_artifacts/`, ne `/tmp`

Ta projekt preglasi privzeto začasno delovno mesto seje izvajalnega okolja (`/tmp/claude-*/…`). Začasne/delovne
datoteke — izvoze, ustvarjene datoteke zip, enkratne vmesne izhode in vse, kar bi
sicer shranili v `/tmp` — namesto tega zapisujte v `/home/diegosouzapw/dev/proxys/OmniRoute/_artifacts/`.

- `_artifacts/` je korenska pot `_*`: git jo že prezre (`AGENTS.md` → »Korenske poti `_*`«), obstaja
  samo na disku in se nikoli ne sledi.
- Razlog: če začasni izhod ostane znotraj projekta (namesto v `/tmp`), ga upravljavec
  zlahka najde in vse začasno izbriše na enem mestu, namesto da išče po kratkotrajnih
  imenikih `/tmp`, specifičnih za posamezne seje, ki izginejo ali se kopičijo brez sledenja.
- Tega **ne** zamenjujte z `_tasks/` (strogo pravilo št. 23, lasten zasebni repozitorij git za trajne
  načrte/specifikacije/raziskave/predaje) — `_artifacts/` je namenjen samo zavrgljivim delovnim datotekam; ničesar
  tukaj ni treba ohraniti ali različiciti.

## Zelena osnova pred odpiranjem PR-jev

Pred ustvarjanjem veje ali odpiranjem PR-ja zaženite preverjanje zelene osnove (`AGENTS.md` → Potek dela Git →
»Preverjanje zelene osnove«; projektne veščine se nanj sklicujejo kot `.agents/skills/_shared/base-green.md`). PR,
odprt, ko je vrh osnovne veje rdeč, mora v telesu vsebovati `⚠️ base-red inherited: #<issue>`. Za
odpravo nakopičenega rdečega stanja (vrh osnovne veje + rdeči PR-ji) uporabite veščino `/sweep-reds`.
