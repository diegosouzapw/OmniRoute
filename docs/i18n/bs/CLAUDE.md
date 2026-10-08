# CLAUDE.md (Bosanski)

🌐 **Languages:** 🇺🇸 [English](../../../CLAUDE.md) · 🇪🇹 [am](../am/CLAUDE.md) · 🇸🇦 [ar](../ar/CLAUDE.md) · 🇦🇿 [az](../az/CLAUDE.md) · 🇧🇬 [bg](../bg/CLAUDE.md) · 🇧🇩 [bn](../bn/CLAUDE.md) · 🇨🇿 [cs](../cs/CLAUDE.md) · 🇩🇰 [da](../da/CLAUDE.md) · 🇩🇪 [de](../de/CLAUDE.md) · 🇬🇷 [el](../el/CLAUDE.md) · 🇪🇸 [es](../es/CLAUDE.md) · 🇪🇪 [et](../et/CLAUDE.md) · 🇮🇷 [fa](../fa/CLAUDE.md) · 🇫🇮 [fi](../fi/CLAUDE.md) · 🇫🇷 [fr](../fr/CLAUDE.md) · 🇮🇪 [ga](../ga/CLAUDE.md) · 🇮🇳 [gu](../gu/CLAUDE.md) · 🇳🇬 [ha](../ha/CLAUDE.md) · 🇮🇱 [he](../he/CLAUDE.md) · 🇮🇳 [hi](../hi/CLAUDE.md) · 🇭🇷 [hr](../hr/CLAUDE.md) · 🇭🇺 [hu](../hu/CLAUDE.md) · 🇦🇲 [hy](../hy/CLAUDE.md) · 🇮🇩 [id](../id/CLAUDE.md) · 🇳🇬 [ig](../ig/CLAUDE.md) · 🇮🇹 [it](../it/CLAUDE.md) · 🇯🇵 [ja](../ja/CLAUDE.md) · 🇬🇪 [ka](../ka/CLAUDE.md) · 🇰🇭 [km](../km/CLAUDE.md) · 🇮🇳 [kn](../kn/CLAUDE.md) · 🇰🇷 [ko](../ko/CLAUDE.md) · 🇱🇹 [lt](../lt/CLAUDE.md) · 🇱🇻 [lv](../lv/CLAUDE.md) · 🇮🇳 [ml](../ml/CLAUDE.md) · 🇮🇳 [mr](../mr/CLAUDE.md) · 🇲🇾 [ms](../ms/CLAUDE.md) · 🇲🇹 [mt](../mt/CLAUDE.md) · 🇲🇲 [my](../my/CLAUDE.md) · 🇳🇵 [ne](../ne/CLAUDE.md) · 🇳🇱 [nl](../nl/CLAUDE.md) · 🇳🇴 [no](../no/CLAUDE.md) · 🇮🇳 [or](../or/CLAUDE.md) · 🇮🇳 [pa](../pa/CLAUDE.md) · 🇵🇭 [phi](../phi/CLAUDE.md) · 🇵🇱 [pl](../pl/CLAUDE.md) · 🇵🇹 [pt](../pt/CLAUDE.md) · 🇧🇷 [pt-BR](../pt-BR/CLAUDE.md) · 🇷🇴 [ro](../ro/CLAUDE.md) · 🇷🇺 [ru](../ru/CLAUDE.md) · 🇱🇰 [si](../si/CLAUDE.md) · 🇸🇰 [sk](../sk/CLAUDE.md) · 🇸🇮 [sl](../sl/CLAUDE.md) · 🇷🇸 [sr](../sr/CLAUDE.md) · 🇸🇪 [sv](../sv/CLAUDE.md) · 🇰🇪 [sw](../sw/CLAUDE.md) · 🇮🇳 [ta](../ta/CLAUDE.md) · 🇮🇳 [te](../te/CLAUDE.md) · 🇹🇭 [th](../th/CLAUDE.md) · 🇹🇷 [tr](../tr/CLAUDE.md) · 🇺🇦 [uk-UA](../uk-UA/CLAUDE.md) · 🇵🇰 [ur](../ur/CLAUDE.md) · 🇺🇿 [uz](../uz/CLAUDE.md) · 🇻🇳 [vi](../vi/CLAUDE.md) · 🇳🇬 [yo](../yo/CLAUDE.md) · 🇨🇳 [zh-CN](../zh-CN/CLAUDE.md) · 🇹🇼 [zh-TW](../zh-TW/CLAUDE.md)

---

@AGENTS.md

**Sva projektna pravila nalaze se u [`AGENTS.md`](AGENTS.md)** — jedinom izvoru istine za svakog AI
asistenta (arhitektura, konvencije, testiranje, kontrole kvaliteta, git radni tok, 23 stroga pravila,
saznanja o ličnim identifikacijskim podacima). Pročitajte ga u cijelosti; nemojte ovdje ponovo dodavati projektna pravila. Sve u nastavku odnosi se ISKLJUČIVO
na Claude Code — operativna pojašnjenja pravila koja su već definirana u `AGENTS.md`.

## Izolacija radnog stabla — specifičnosti za Claude Code

Potpuni obavezni protokol za radna stabla (potvrda osnovne grane, kanonska
putanja `.claude/worktrees/`, `cp -al` za node_modules, pravila uklanjanja) nalazi se u `AGENTS.md` → Git radni tok → „Izolacija
radnog stabla“. Stavke specifične za Claude Code:

- Potvrdite osnovnu granu s operaterom putem `AskUserQuestion` (strogo pravilo #19), osim ako vam je
  već rekao.
- Dajte prednost izvornom alatu `EnterWorktree` — on već kreira radna stabla unutar
  `.claude/worktrees/` (kanonska putanja). Kreirajte radno stablo dokumentiranom naredbom `git
worktree add`, a zatim pozovite `EnterWorktree` s njegovom `path`.

## Sigurnost između sesija — specifičnosti za Claude Code

Stroga pravila #19/#21/#22 (u `AGENTS.md`) uređuju paralelne sesije. Operativni podsjetnici za ovaj
sistem:

- **Doslovno ponovite zabranu korištenja `git stash` u upitu svakog podagenta koji koristi git**
  (alat Agent / skripte radnog toka) — podagenti ne nasljeđuju ovu datoteku, a zabilježeno
  ponavljanje incidenta sa stashom dogodilo se putem podagenta.
- Prije spajanja ili slanja izmjena u bilo koji PR koji niste kreirali _u ovoj sesiji_, pokrenite `git worktree list`
  i ponovo provjerite `gh pr view <N> --json state,headRefOid` (strogo pravilo #22b).
- Završite svaku sesiju tako da glavna radna kopija bude na grani na kojoj je sesija započela.

## Superpowers / artefakti planiranja — zamjene putanja

Konvencija `_tasks/` definirana je u `AGENTS.md` → „Artefakti planiranja i istraživanja“. Vještine
superpowers isporučuju se sa zadanim vrijednostima koje upućuju na `docs/…` — te zadane vrijednosti su **zamijenjene
ovdje**. Kada vještina superpowers navede putanju poput „sačuvano u `docs/superpowers/plans/…`“,
prije zapisivanja zamijenite je odgovarajućom putanjom u `_tasks/…`:

| Artefakt (vještina)                      | Zadana lokacija (NE koristite) | Umjesto toga sačuvajte ovdje                                  |
| ---------------------------------------- | ------------------------------ | ------------------------------------------------------------- |
| Planovi (`writing-plans`)                | `docs/superpowers/plans/`      | `_tasks/superpowers/plans/YYYY-MM-DD-<feature>.md`            |
| Specifikacije / dizajn (`brainstorming`) | `docs/superpowers/specs/`      | `_tasks/superpowers/specs/YYYY-MM-DD-<topic>-design.md`       |
| Istraživanje (`deep-research`, ad hoc)   | `docs/research/`               | `_tasks/research/…`                                           |
| Primopredaje (`/handoff`)                | —                              | `_tasks/hands-off/<YYYY-MM-DD>_<branch>_v<versão>_sess-<id>/` |

Commitujte te artefakte unutar repozitorija `_tasks/` (`git -C _tasks …`), nikada u glavnom repozitoriju.

## Privremene / radne datoteke — koristite `_artifacts/`, ne `/tmp`

Ovaj projekt zamjenjuje zadanu radnu lokaciju sesije ovog sistema (`/tmp/claude-*/…`). Pišite
privremene/radne datoteke — izvoze, generirane zip arhive, jednokratne međurezultate, sve što biste
inače smjestili u `/tmp` — u `/home/diegosouzapw/dev/proxys/OmniRoute/_artifacts/`.

- `_artifacts/` je korijenska putanja `_*`: već je zanemarena u gitu (`AGENTS.md` → „Korijenske putanje `_*`“), postoji
  samo na disku i nikada se ne prati.
- Razlog: čuvanje privremenih rezultata unutar projekta (umjesto u `/tmp`) omogućava operateru
  da jednostavno pronađe i izbriše sve privremeno na jednom mjestu, umjesto da pretražuje prolazne
  direktorije `/tmp` specifične za sesiju, koji nestaju ili gomilaju nepraćene datoteke.
- **Nemojte** ovo zamijeniti s `_tasks/` (strogo pravilo #23, zaseban privatni git repozitorij za trajne
  planove/specifikacije/istraživanja/primopredaje) — `_artifacts/` služi samo za potrošne radne datoteke; ništa
  ovdje ne treba opstati niti biti verzionirano.

## Zelena osnovna grana prije otvaranja PR-ova

Prije kreiranja grane ili otvaranja PR-a pokrenite provjeru zelene osnovne grane (`AGENTS.md` → Git radni tok →
„Provjera zelene osnovne grane“; projektne vještine upućuju na nju kao `.agents/skills/_shared/base-green.md`). PR
otvoren dok je vrh osnovne grane crven mora u svom opisu sadržavati `⚠️ base-red inherited: #<issue>`. Za
uklanjanje nagomilanog crvenog stanja (vrh osnovne grane + crveni PR-ovi) koristite vještinu `/sweep-reds`.
