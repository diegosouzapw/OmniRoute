# CLAUDE.md (Română)

🌐 **Languages:** 🇺🇸 [English](../../../CLAUDE.md) · 🇪🇹 [am](../am/CLAUDE.md) · 🇸🇦 [ar](../ar/CLAUDE.md) · 🇦🇿 [az](../az/CLAUDE.md) · 🇧🇬 [bg](../bg/CLAUDE.md) · 🇧🇩 [bn](../bn/CLAUDE.md) · 🇧🇦 [bs](../bs/CLAUDE.md) · 🇨🇿 [cs](../cs/CLAUDE.md) · 🇩🇰 [da](../da/CLAUDE.md) · 🇩🇪 [de](../de/CLAUDE.md) · 🇬🇷 [el](../el/CLAUDE.md) · 🇪🇸 [es](../es/CLAUDE.md) · 🇪🇪 [et](../et/CLAUDE.md) · 🇮🇷 [fa](../fa/CLAUDE.md) · 🇫🇮 [fi](../fi/CLAUDE.md) · 🇫🇷 [fr](../fr/CLAUDE.md) · 🇮🇪 [ga](../ga/CLAUDE.md) · 🇮🇳 [gu](../gu/CLAUDE.md) · 🇳🇬 [ha](../ha/CLAUDE.md) · 🇮🇱 [he](../he/CLAUDE.md) · 🇮🇳 [hi](../hi/CLAUDE.md) · 🇭🇷 [hr](../hr/CLAUDE.md) · 🇭🇺 [hu](../hu/CLAUDE.md) · 🇦🇲 [hy](../hy/CLAUDE.md) · 🇮🇩 [id](../id/CLAUDE.md) · 🇳🇬 [ig](../ig/CLAUDE.md) · 🇮🇹 [it](../it/CLAUDE.md) · 🇯🇵 [ja](../ja/CLAUDE.md) · 🇬🇪 [ka](../ka/CLAUDE.md) · 🇰🇭 [km](../km/CLAUDE.md) · 🇮🇳 [kn](../kn/CLAUDE.md) · 🇰🇷 [ko](../ko/CLAUDE.md) · 🇱🇹 [lt](../lt/CLAUDE.md) · 🇱🇻 [lv](../lv/CLAUDE.md) · 🇮🇳 [ml](../ml/CLAUDE.md) · 🇮🇳 [mr](../mr/CLAUDE.md) · 🇲🇾 [ms](../ms/CLAUDE.md) · 🇲🇹 [mt](../mt/CLAUDE.md) · 🇲🇲 [my](../my/CLAUDE.md) · 🇳🇵 [ne](../ne/CLAUDE.md) · 🇳🇱 [nl](../nl/CLAUDE.md) · 🇳🇴 [no](../no/CLAUDE.md) · 🇮🇳 [or](../or/CLAUDE.md) · 🇮🇳 [pa](../pa/CLAUDE.md) · 🇵🇭 [phi](../phi/CLAUDE.md) · 🇵🇱 [pl](../pl/CLAUDE.md) · 🇵🇹 [pt](../pt/CLAUDE.md) · 🇧🇷 [pt-BR](../pt-BR/CLAUDE.md) · 🇷🇺 [ru](../ru/CLAUDE.md) · 🇱🇰 [si](../si/CLAUDE.md) · 🇸🇰 [sk](../sk/CLAUDE.md) · 🇸🇮 [sl](../sl/CLAUDE.md) · 🇷🇸 [sr](../sr/CLAUDE.md) · 🇸🇪 [sv](../sv/CLAUDE.md) · 🇰🇪 [sw](../sw/CLAUDE.md) · 🇮🇳 [ta](../ta/CLAUDE.md) · 🇮🇳 [te](../te/CLAUDE.md) · 🇹🇭 [th](../th/CLAUDE.md) · 🇹🇷 [tr](../tr/CLAUDE.md) · 🇺🇦 [uk-UA](../uk-UA/CLAUDE.md) · 🇵🇰 [ur](../ur/CLAUDE.md) · 🇺🇿 [uz](../uz/CLAUDE.md) · 🇻🇳 [vi](../vi/CLAUDE.md) · 🇳🇬 [yo](../yo/CLAUDE.md) · 🇨🇳 [zh-CN](../zh-CN/CLAUDE.md) · 🇹🇼 [zh-TW](../zh-TW/CLAUDE.md)

---

@AGENTS.md

**Toate regulile proiectului se află în [`AGENTS.md`](AGENTS.md)** — sursa unică de adevăr pentru fiecare
asistent AI (arhitectură, convenții, testare, praguri de calitate, flux de lucru git, cele 23 de Reguli stricte,
învățăminte privind PII). Citiți-l integral; nu adăugați din nou regulile proiectului aici. Tot ce urmează se aplică NUMAI
pentru Claude Code — îmbunătățiri operaționale ale regulilor deja definite în `AGENTS.md`.

## Izolarea worktree-urilor — particularități Claude Code

Protocolul complet și obligatoriu pentru worktree-uri (confirmarea ramurii de bază, calea canonică
`.claude/worktrees/`, `cp -al` pentru node_modules, regulile de eliminare) se află în `AGENTS.md` → Flux de lucru Git → „Izolarea
worktree-urilor”. Aspecte specifice Claude Code:

- Confirmați ramura de bază cu operatorul prin `AskUserQuestion` (Regula strictă #19), cu excepția cazului în care
  v-a comunicat-o deja.
- Preferați instrumentul nativ `EnterWorktree` — acesta creează deja worktree-uri în
  `.claude/worktrees/` (calea canonică). Creați worktree-ul folosind comanda documentată `git
worktree add`, apoi apelați `EnterWorktree` cu parametrul său `path`.

## Siguranță între sesiuni — particularități Claude Code

Regulile stricte #19/#21/#22 (din `AGENTS.md`) guvernează sesiunile paralele. Mementouri operaționale pentru acest
mediu:

- **Replicați textual interdicția privind `git stash` în promptul fiecărui subagent care interacționează cu git**
  (instrumentul Agent / scripturi de flux de lucru) — subagenții nu moștenesc acest fișier, iar recurența
  înregistrată a incidentului legat de stash a avut loc printr-un subagent.
- Înainte de a face merge sau push către orice PR pe care nu l-ați creat _în această sesiune_, rulați `git worktree list`
  și verificați din nou `gh pr view <N> --json state,headRefOid` (Regula strictă #22b).
- Încheiați fiecare sesiune cu checkout-ul principal pe ramura pe care se afla la început.

## Superpowers / artefacte de planificare — suprascrieri ale căilor

Convenția `_tasks/` este definită în `AGENTS.md` → „Artefacte de planificare și cercetare”. Abilitățile
superpowers sunt livrate cu valori implicite care indică spre `docs/…` — aceste valori implicite sunt **suprascrise
aici**. Când o abilitate superpowers anunță o cale precum „salvat în `docs/superpowers/plans/…`”,
rescrieți-o cu echivalentul din `_tasks/…` înainte de scriere:

| Artefact (abilitate)                    | Valoare implicită (NU o utilizați) | Salvați aici în schimb                                        |
| --------------------------------------- | ---------------------------------- | ------------------------------------------------------------- |
| Planuri (`writing-plans`)               | `docs/superpowers/plans/`          | `_tasks/superpowers/plans/YYYY-MM-DD-<feature>.md`            |
| Specificații / design (`brainstorming`) | `docs/superpowers/specs/`          | `_tasks/superpowers/specs/YYYY-MM-DD-<topic>-design.md`       |
| Cercetare (`deep-research`, ad-hoc)     | `docs/research/`                   | `_tasks/research/…`                                           |
| Predări (`/handoff`)                    | —                                  | `_tasks/hands-off/<YYYY-MM-DD>_<branch>_v<versão>_sess-<id>/` |

Faceți commit pentru aceste artefacte în repo-ul `_tasks/` (`git -C _tasks …`), niciodată în repo-ul principal.

## Fișiere de lucru / temporare — utilizați `_artifacts/`, nu `/tmp`

Acest proiect suprascrie spațiul de lucru temporar implicit al mediului pentru sesiuni (`/tmp/claude-*/…`). Scrieți
fișierele temporare/de lucru — exporturi, arhive zip generate, rezultate intermediare de unică folosință, orice ați
pune altfel în `/tmp` — în `/home/diegosouzapw/dev/proxys/OmniRoute/_artifacts/`.

- `_artifacts/` este o cale rădăcină `_*`: este deja ignorată de git (`AGENTS.md` → „Căi rădăcină `_*`”), există
  doar pe disc și nu este urmărită niciodată.
- Motiv: păstrarea rezultatelor temporare în interiorul proiectului (în loc de `/tmp`) îi permite operatorului
  să găsească și să șteargă cu ușurință tot ce este temporar într-un singur loc, în loc să caute prin directoare
  `/tmp` efemere, specifice sesiunilor, care dispar sau acumulează fișiere neurmărite.
- **Nu** confundați acest director cu `_tasks/` (Regula strictă #23, propriul său repo git privat pentru
  planuri/specificații/cercetări/predări durabile) — `_artifacts/` este destinat exclusiv fișierelor de lucru de unică folosință; nimic
  de aici nu trebuie păstrat sau versionat.

## Bază verde înainte de deschiderea PR-urilor

Înainte de a crea o ramură sau de a deschide un PR, rulați verificarea bazei verzi (`AGENTS.md` → Flux de lucru Git →
„Verificarea bazei verzi”; abilitățile proiectului fac referire la aceasta drept `.agents/skills/_shared/base-green.md`). Un PR
deschis în timp ce vârful bazei este roșu trebuie să includă `⚠️ base-red inherited: #<issue>` în corpul său. Pentru
a remedia o stare roșie acumulată (vârful bazei + PR-uri roșii), utilizați abilitatea `/sweep-reds`.
