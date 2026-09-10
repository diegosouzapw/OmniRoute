# CLAUDE.md (Hrvatski)

🌐 **Languages:** 🇺🇸 [English](../../../CLAUDE.md) · 🇸🇦 [ar](../ar/CLAUDE.md) · 🇦🇿 [az](../az/CLAUDE.md) · 🇧🇬 [bg](../bg/CLAUDE.md) · 🇧🇩 [bn](../bn/CLAUDE.md) · 🇨🇿 [cs](../cs/CLAUDE.md) · 🇩🇰 [da](../da/CLAUDE.md) · 🇩🇪 [de](../de/CLAUDE.md) · 🇬🇷 [el](../el/CLAUDE.md) · 🇪🇸 [es](../es/CLAUDE.md) · 🇪🇪 [et](../et/CLAUDE.md) · 🇮🇷 [fa](../fa/CLAUDE.md) · 🇫🇮 [fi](../fi/CLAUDE.md) · 🇫🇷 [fr](../fr/CLAUDE.md) · 🇮🇪 [ga](../ga/CLAUDE.md) · 🇮🇳 [gu](../gu/CLAUDE.md) · 🇮🇱 [he](../he/CLAUDE.md) · 🇮🇳 [hi](../hi/CLAUDE.md) · 🇭🇺 [hu](../hu/CLAUDE.md) · 🇮🇩 [id](../id/CLAUDE.md) · 🇮🇹 [it](../it/CLAUDE.md) · 🇯🇵 [ja](../ja/CLAUDE.md) · 🇰🇷 [ko](../ko/CLAUDE.md) · 🇱🇹 [lt](../lt/CLAUDE.md) · 🇱🇻 [lv](../lv/CLAUDE.md) · 🇮🇳 [mr](../mr/CLAUDE.md) · 🇲🇾 [ms](../ms/CLAUDE.md) · 🇲🇹 [mt](../mt/CLAUDE.md) · 🇳🇱 [nl](../nl/CLAUDE.md) · 🇳🇴 [no](../no/CLAUDE.md) · 🇵🇭 [phi](../phi/CLAUDE.md) · 🇵🇱 [pl](../pl/CLAUDE.md) · 🇵🇹 [pt](../pt/CLAUDE.md) · 🇧🇷 [pt-BR](../pt-BR/CLAUDE.md) · 🇷🇴 [ro](../ro/CLAUDE.md) · 🇷🇺 [ru](../ru/CLAUDE.md) · 🇸🇰 [sk](../sk/CLAUDE.md) · 🇸🇮 [sl](../sl/CLAUDE.md) · 🇷🇸 [sr](../sr/CLAUDE.md) · 🇸🇪 [sv](../sv/CLAUDE.md) · 🇰🇪 [sw](../sw/CLAUDE.md) · 🇮🇳 [ta](../ta/CLAUDE.md) · 🇮🇳 [te](../te/CLAUDE.md) · 🇹🇭 [th](../th/CLAUDE.md) · 🇹🇷 [tr](../tr/CLAUDE.md) · 🇺🇦 [uk-UA](../uk-UA/CLAUDE.md) · 🇵🇰 [ur](../ur/CLAUDE.md) · 🇻🇳 [vi](../vi/CLAUDE.md) · 🇨🇳 [zh-CN](../zh-CN/CLAUDE.md) · 🇹🇼 [zh-TW](../zh-TW/CLAUDE.md)

---

# AGENTS.md

**Sva pravila projekta nalaze se u [`AGENTS.md`](AGENTS.md)** — jedini izvor istine za svakog AI
asistenta (arhitektura, konvencije, testiranje, kvalitativni uvjeti, git tijek rada, 23 Tvrda pravila,
PII saznanja). Pročitajte ga u cijelosti; nemojte ovdje ponovo dodavati pravila projekta. Sve u nastavku odnosi se ISKLJUČIVO
na Claude Code — operativna poboljšanja pravila već definiranih u `AGENTS.md`.

## Izolacija radnog stabla — specifičnosti Claude Code-a

Potpuni obavezni protokol radnog stabla (potvrda osnovne grane, kanonska putanja `.claude/worktrees/`,
`cp -al` node_modules, pravila uklanjanja) nalazi se u `AGENTS.md` → Git tijek rada → "Izolacija radnog stabla".
Točke specifične za Claude Code:

- Potvrdite osnovnu granu s operatorom putem `AskUserQuestion` (Tvrdo pravilo #19) osim ako
  su vam je već priopćili.
- Dajte prednost nativnom alatu `EnterWorktree` — on već stvara radna stabla u
  `.claude/worktrees/` (kanonska putanja). Stvorite radno stablo dokumentiranom naredbom `git
worktree add`, zatim pozovite `EnterWorktree` s njegovom `path` putanjom.

## Sigurnost između sesija — specifičnosti Claude Code-a

Tvrda pravila #19/#21/#22 (u `AGENTS.md`) upravljaju paralelnim sesijama. Operativni podsjetnici za ovaj
sustav:

- **Doslovno repliciraite zabranu `git stash` u upit svakog podagenta koji dotiče git**
  (Agent alat / Skripte tijeka rada) — podagenti ne nasljeđuju ovu datoteku, a zabilježeno
  ponavljanje incidenta s pohranom dolazilo je kroz podagenta.
- Prije spajanja ili guranja u bilo koji PR koji niste stvorili _ove sesije_, pokrenite `git worktree list`
  i provjerite `gh pr view <N> --json state,headRefOid` (Tvrdo pravilo #22b).
- Završite svaku sesiju s glavnim odjavom na grani na kojoj je počela.

## Supermoći / artefakti planiranja — nadogradnja putanja

Konvencija `_tasks/` definirana je u `AGENTS.md` → "Artefakti planiranja i istraživanja". Vještine supermoći
dolaze s zadanim postavkama koje pokazuju na `docs/…` — te zadane postavke su ovdje **nadograđene**.
Kada vještina supermoći najavi putanju poput "spremljeno u `docs/superpowers/plans/…`",
prepišite je u ekvivalent `_tasks/…` prije pisanja:

| Artefakt (vještina)                      | Zadano (NE koristiti)     | Umjesto toga spremi ovdje                                      |
| ---------------------------------------- | ------------------------- | -------------------------------------------------------------- |
| Planovi (`writing-plans`)                | `docs/superpowers/plans/` | `_tasks/superpowers/plans/YYYY-MM-DD-<feature>.md`             |
| Specifikacije / dizajn (`brainstorming`) | `docs/superpowers/specs/` | `_tasks/superpowers/specs/YYYY-MM-DD-<topic>-design.md`        |
| Istraživanje (`deep-research`, ad-hoc)   | `docs/research/`          | `_tasks/research/…`                                            |
| Predaje (`/handoff`)                     | —                         | `_tasks/hands-off/<YYYY-MM-DD>_<branch>_v<verzija>_sess-<id>/` |

Pohranite te artefakte unutar repozitorija `_tasks/` (`git -C _tasks …`), nikada u glavnom repozitoriju.

## Privremene datoteke — koristite `_artifacts/`, ne `/tmp`

Ovaj projekt nadograđuje zadani privremeni radni prostor sustava (`/tmp/claude-*/…`). Privremene/radne
datoteke — izvozi, generirani zipovi, jednokratni međuizlazi, sve što biste inače stavili u `/tmp` —
pišite u `/home/diegosouzapw/dev/proxys/OmniRoute/_artifacts/`.

- `_artifacts/` je korijen `_*` putanje: već je u gitignore (`AGENTS.md` → "Korijen `_*` putanja"), živi
  samo na disku, nikada se ne prati.
- Razlog: čuvanje privremenog izlaza unutar projekta (nasuprot `/tmp`) operatoru olakšava pronalaženje i brisanje svega privremenog na jednom mjestu, umjesto pretraživanja po prolaznim
  direktorijima `/tmp` specifičnim za sesiju koji nestaju ili se nakupljaju bez praćenja.
- **Nemojte** ovo miješati s `_tasks/` (Tvrdo pravilo #23, vlastiti privatni git repozitorij za trajne
  planove/specifikacije/istraživanja/predaje) — `_artifacts/` je samo za jednokratne radne datoteke, ništa
  ovdje ne treba preživjeti niti biti verzijonirano.

## Baza zelena prije otvaranja PR-ova

Prije odvajanja grane ili otvaranja PR-a, pokrenite provjeru baze-zelene (`AGENTS.md` → Git tijek rada →
"Provjera baze-zelene"; projektne vještine na nju se pozivaju kao `.agents/skills/_shared/base-green.md`). PR
otvoren dok je vrh baze crven mora u tijelu sadržavati `⚠️ base-red inherited: #<issue>`. Za
ispuštanje nakupljenog crvenog stanja (vrh baze + crveni PR-ovi), koristite vještinu `/sweep-reds`.
