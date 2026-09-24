# CLAUDE.md (Bosanski)

🌐 **Languages:** 🇺🇸 [English](../../../CLAUDE.md) · 🇪🇹 [am](../am/CLAUDE.md) · 🇸🇦 [ar](../ar/CLAUDE.md) · 🇦🇿 [az](../az/CLAUDE.md) · 🇧🇬 [bg](../bg/CLAUDE.md) · 🇧🇩 [bn](../bn/CLAUDE.md) · 🇨🇿 [cs](../cs/CLAUDE.md) · 🇩🇰 [da](../da/CLAUDE.md) · 🇩🇪 [de](../de/CLAUDE.md) · 🇬🇷 [el](../el/CLAUDE.md) · 🇪🇸 [es](../es/CLAUDE.md) · 🇪🇪 [et](../et/CLAUDE.md) · 🇮🇷 [fa](../fa/CLAUDE.md) · 🇫🇮 [fi](../fi/CLAUDE.md) · 🇫🇷 [fr](../fr/CLAUDE.md) · 🇮🇪 [ga](../ga/CLAUDE.md) · 🇮🇳 [gu](../gu/CLAUDE.md) · 🇳🇬 [ha](../ha/CLAUDE.md) · 🇮🇱 [he](../he/CLAUDE.md) · 🇮🇳 [hi](../hi/CLAUDE.md) · 🇭🇷 [hr](../hr/CLAUDE.md) · 🇭🇺 [hu](../hu/CLAUDE.md) · 🇦🇲 [hy](../hy/CLAUDE.md) · 🇮🇩 [id](../id/CLAUDE.md) · 🇳🇬 [ig](../ig/CLAUDE.md) · 🇮🇹 [it](../it/CLAUDE.md) · 🇯🇵 [ja](../ja/CLAUDE.md) · 🇬🇪 [ka](../ka/CLAUDE.md) · 🇰🇭 [km](../km/CLAUDE.md) · 🇮🇳 [kn](../kn/CLAUDE.md) · 🇰🇷 [ko](../ko/CLAUDE.md) · 🇱🇹 [lt](../lt/CLAUDE.md) · 🇱🇻 [lv](../lv/CLAUDE.md) · 🇮🇳 [ml](../ml/CLAUDE.md) · 🇮🇳 [mr](../mr/CLAUDE.md) · 🇲🇾 [ms](../ms/CLAUDE.md) · 🇲🇹 [mt](../mt/CLAUDE.md) · 🇲🇲 [my](../my/CLAUDE.md) · 🇳🇵 [ne](../ne/CLAUDE.md) · 🇳🇱 [nl](../nl/CLAUDE.md) · 🇳🇴 [no](../no/CLAUDE.md) · 🇮🇳 [or](../or/CLAUDE.md) · 🇮🇳 [pa](../pa/CLAUDE.md) · 🇵🇭 [phi](../phi/CLAUDE.md) · 🇵🇱 [pl](../pl/CLAUDE.md) · 🇵🇹 [pt](../pt/CLAUDE.md) · 🇧🇷 [pt-BR](../pt-BR/CLAUDE.md) · 🇷🇴 [ro](../ro/CLAUDE.md) · 🇷🇺 [ru](../ru/CLAUDE.md) · 🇱🇰 [si](../si/CLAUDE.md) · 🇸🇰 [sk](../sk/CLAUDE.md) · 🇸🇮 [sl](../sl/CLAUDE.md) · 🇷🇸 [sr](../sr/CLAUDE.md) · 🇸🇪 [sv](../sv/CLAUDE.md) · 🇰🇪 [sw](../sw/CLAUDE.md) · 🇮🇳 [ta](../ta/CLAUDE.md) · 🇮🇳 [te](../te/CLAUDE.md) · 🇹🇭 [th](../th/CLAUDE.md) · 🇹🇷 [tr](../tr/CLAUDE.md) · 🇺🇦 [uk-UA](../uk-UA/CLAUDE.md) · 🇵🇰 [ur](../ur/CLAUDE.md) · 🇺🇿 [uz](../uz/CLAUDE.md) · 🇻🇳 [vi](../vi/CLAUDE.md) · 🇳🇬 [yo](../yo/CLAUDE.md) · 🇨🇳 [zh-CN](../zh-CN/CLAUDE.md) · 🇹🇼 [zh-TW](../zh-TW/CLAUDE.md)

---

@AGENTS.md

**Sva pravila projekta nalaze se u [`AGENTS.md`](AGENTS.md)** — jedinom izvoru istine za bilo koju VI
asistent (arhitektura, konvencije, testiranje, zahtjevi kvalitete, git tok rada, 23 teška pravila,
PII znanje). Pročitajte ga u cijelosti; nemojte ponovo dodavati pravila projekta ovdje. Sve što je navedeno odnosi se SAMO na
na Claude Code — operativna poboljšanja pravila već definiranih u `AGENTS.md`.

## Izolacija radnog stabla — specifičnosti Claudeovog koda

Potpuno obavezni protokol radnog stabla (osnovna grana commit, kanonska putanja `.claude/worktrees/`,
`cp -al` node_modules, pravila uklanjanja) se nalazi u `AGENTS.md` → Git Workflow → "Izolacija radnog stabla".
Tačke specifične za Claudea Codea:

- Potvrdite osnovnu granu s operatorom putem `AskUserQuestion` (Tvrdo pravilo #19) osim ako
  već su ti rekli.
- Dajte prednost izvornom alatu `EnterWorktree` — on već kreira radna stabla u
  `.claude/worktrees/` (kanonska putanja). Kreirajte radno stablo pomoću dokumentirane `git naredbe`
  worktree add`, zatim pozovite `EnterWorktree`sa njegovom putanjom`path`.

## Sigurnost između sesija — specifičnosti Claude Code-a

Tvrda pravila #19/#21/#22 (u `AGENTS.md`) upravljaju paralelnim sesijama. Operativni podsjetnici za ovaj
šuštanje:

- **Doslovno repliciraj zabranu `git stash` u upitu svakog podagenta koji dodiruje git**
  (Alat agenta / Skripte toka rada) — subagenti ne nasljeđuju ovu datoteku, a snimljeni
  Ponavljanje incidenta sa skladištenjem dogodilo se preko subagenta.
- Prije spajanja ili slanja na bilo koji PR koji niste kreirali u _ovoj sesiji_, pokrenite `git worktree list`
  i provjerite `gh pr view <N> --json state,headRefOid` (teško pravilo #22b).
- Završite svaku sesiju s glavnim odjavom na grani na kojoj je počela.

## Supermoći / Planiranje artefakata — Nadogradnja puta

Konvencija `_tasks/` je definirana u `AGENTS.md` → "Artefakti planiranja i istraživanja". Vještine supermoći
dolaze s podrazumijevanim vrijednostima koje pokazuju na `docs/…` — te podrazumijevane vrijednosti su ovdje **nadograđene**.
Kada vještina supermoći najavi putanju poput "sačuvano u `docs/superpowers/plans/…`",
prepišite je u ekvivalent `_tasks/…` prije pisanja:

| Artefakt (vještina)                          | Zadano (NE KORISTITI)     | Sačuvaj ovdje umjesto toga                                     |
| -------------------------------------------- | ------------------------- | -------------------------------------------------------------- |
| Planovi (`planovi-pisanja`)                  | `docs/superpowers/plans/` | `_tasks/superpowers/plans/YYYY-MM-DD-<feature>.md`             |
| Specifikacije / dizajn (`brainstorming`)     | `docs/superpowers/specs/` | `_tasks/superpowers/specs/YYYY-MM-DD-<topic>-design.md`        |
| Istraživanje (`duboko istraživanje`, ad-hoc) | `docs/research/`          | `_tasks/research/…`                                            |
| Predaje (`/handoff`)                         | —                         | `_tasks/hands-off/<GGGG-MM-DD>_<branch>_v<verzija>_sess-<id>/` |

Pohranite ove artefakte unutar `_tasks/` repozitorija (`git -C _tasks …`), nikada u glavnom repozitoriju.

## Privremene datoteke — koristite `_artifacts/`, a ne `/tmp`

Ovaj projekat se zasniva na zadanom privremenom radnom prostoru sistema (`/tmp/claude-*/…`). Privremeno/Radno
datoteke — izvozi, generirani zip-ovi, jednokratni međuizlazi, sve što biste inače stavili u `/tmp` —
napišite u `/home/diegosouzapw/dev/proxys/OmniRoute/_artifacts/`.

- `_artifacts/` je korijen putanja `_*`: već se nalazi u gitignore-u (`AGENTS.md` → "Korijen putanja `_*`"), živi
  samo na disku, nikad nije praćeno.
- Razlog: pohranjivanje privremenog izlaza unutar projekta (za razliku od `/tmp`) olakšava operateru pronalaženje i brisanje svih privremenih izlaza na jednom mjestu, umjesto pretraživanja prolaznih pojava
  direktorijima `/tmp` specifičnim za sesiju koji nestaju ili se nakupljaju bez praćenja.
- **Nemojte** ovo miješati sa `_tasks/` (Teško pravilo br. 23, vaš vlastiti privatni git repozitorij za trajno
  planove/specifikacije/istraživanja/predaje) — `_artifacts/` je samo za jednokratne radne datoteke, ništa
  Ne mora opstati niti biti verzioniran ovdje.

## Osnovno zeleno prije otvaranja PR-ova

Prije kreiranja grane ili otvaranja PR-a, pokrenite provjeru osnovnog zelenog (`AGENTS.md` → Git Workflow →
"Provjera baze-zelene"; projektne vještine na nju se pozivaju kao `.agents/skills/_shared/base-green.md`). PR
otvoreno dok je osnovni vrh crven mora sadržavati `⚠️ base-red inherent: #<issue>` u tijelu. Za
Za oslobađanje akumuliranog crvenog stanja (baza, vrh + crveni PR-ovi), koristite vještinu `/sweep-reds`.
