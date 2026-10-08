# CLAUDE.md (Suomi)

🌐 **Languages:** 🇺🇸 [English](../../../CLAUDE.md) · 🇪🇹 [am](../am/CLAUDE.md) · 🇸🇦 [ar](../ar/CLAUDE.md) · 🇦🇿 [az](../az/CLAUDE.md) · 🇧🇬 [bg](../bg/CLAUDE.md) · 🇧🇩 [bn](../bn/CLAUDE.md) · 🇧🇦 [bs](../bs/CLAUDE.md) · 🇨🇿 [cs](../cs/CLAUDE.md) · 🇩🇰 [da](../da/CLAUDE.md) · 🇩🇪 [de](../de/CLAUDE.md) · 🇬🇷 [el](../el/CLAUDE.md) · 🇪🇸 [es](../es/CLAUDE.md) · 🇪🇪 [et](../et/CLAUDE.md) · 🇮🇷 [fa](../fa/CLAUDE.md) · 🇫🇷 [fr](../fr/CLAUDE.md) · 🇮🇪 [ga](../ga/CLAUDE.md) · 🇮🇳 [gu](../gu/CLAUDE.md) · 🇳🇬 [ha](../ha/CLAUDE.md) · 🇮🇱 [he](../he/CLAUDE.md) · 🇮🇳 [hi](../hi/CLAUDE.md) · 🇭🇷 [hr](../hr/CLAUDE.md) · 🇭🇺 [hu](../hu/CLAUDE.md) · 🇦🇲 [hy](../hy/CLAUDE.md) · 🇮🇩 [id](../id/CLAUDE.md) · 🇳🇬 [ig](../ig/CLAUDE.md) · 🇮🇹 [it](../it/CLAUDE.md) · 🇯🇵 [ja](../ja/CLAUDE.md) · 🇬🇪 [ka](../ka/CLAUDE.md) · 🇰🇭 [km](../km/CLAUDE.md) · 🇮🇳 [kn](../kn/CLAUDE.md) · 🇰🇷 [ko](../ko/CLAUDE.md) · 🇱🇹 [lt](../lt/CLAUDE.md) · 🇱🇻 [lv](../lv/CLAUDE.md) · 🇮🇳 [ml](../ml/CLAUDE.md) · 🇮🇳 [mr](../mr/CLAUDE.md) · 🇲🇾 [ms](../ms/CLAUDE.md) · 🇲🇹 [mt](../mt/CLAUDE.md) · 🇲🇲 [my](../my/CLAUDE.md) · 🇳🇵 [ne](../ne/CLAUDE.md) · 🇳🇱 [nl](../nl/CLAUDE.md) · 🇳🇴 [no](../no/CLAUDE.md) · 🇮🇳 [or](../or/CLAUDE.md) · 🇮🇳 [pa](../pa/CLAUDE.md) · 🇵🇭 [phi](../phi/CLAUDE.md) · 🇵🇱 [pl](../pl/CLAUDE.md) · 🇵🇹 [pt](../pt/CLAUDE.md) · 🇧🇷 [pt-BR](../pt-BR/CLAUDE.md) · 🇷🇴 [ro](../ro/CLAUDE.md) · 🇷🇺 [ru](../ru/CLAUDE.md) · 🇱🇰 [si](../si/CLAUDE.md) · 🇸🇰 [sk](../sk/CLAUDE.md) · 🇸🇮 [sl](../sl/CLAUDE.md) · 🇷🇸 [sr](../sr/CLAUDE.md) · 🇸🇪 [sv](../sv/CLAUDE.md) · 🇰🇪 [sw](../sw/CLAUDE.md) · 🇮🇳 [ta](../ta/CLAUDE.md) · 🇮🇳 [te](../te/CLAUDE.md) · 🇹🇭 [th](../th/CLAUDE.md) · 🇹🇷 [tr](../tr/CLAUDE.md) · 🇺🇦 [uk-UA](../uk-UA/CLAUDE.md) · 🇵🇰 [ur](../ur/CLAUDE.md) · 🇺🇿 [uz](../uz/CLAUDE.md) · 🇻🇳 [vi](../vi/CLAUDE.md) · 🇳🇬 [yo](../yo/CLAUDE.md) · 🇨🇳 [zh-CN](../zh-CN/CLAUDE.md) · 🇹🇼 [zh-TW](../zh-TW/CLAUDE.md)

---

@AGENTS.md

**Kaikki projektin säännöt ovat tiedostossa [`AGENTS.md`](AGENTS.md)** — se on kaikkien
tekoälyavustajien ainoa totuuden lähde (arkkitehtuuri, käytännöt, testaus, laatuportit, git-työnkulku,
23 ehdotonta sääntöä, henkilötietoja koskevat opit). Lue se kokonaan; älä lisää projektin sääntöjä
uudelleen tähän. Kaikki alla oleva koskee VAIN Claude Codea — kyse on tiedostossa `AGENTS.md` jo
määriteltyjen sääntöjen toiminnallisista tarkennuksista.

## Worktree-eristys — Claude Codea koskevat erityisohjeet

Täydellinen pakollinen worktree-protokolla (pohjahaaran vahvistaminen, kanoninen
`.claude/worktrees/`-polku, `cp -al` node_modules, purkusäännöt) on kohdassa `AGENTS.md` → Git
Workflow → "Worktree isolation". Claude Codea koskevat erityiskohdat:

- Vahvista pohjahaara operaattorilta `AskUserQuestion`-toiminnolla (ehdoton sääntö #19), ellei hän
  ole jo kertonut sitä.
- Suosi natiivia `EnterWorktree`-työkalua — se luo worktreet valmiiksi kanonisen
  `.claude/worktrees/`-polun alle. Luo worktree dokumentoidulla `git worktree add` -komennolla ja
  kutsu sitten `EnterWorktree`-työkalua sen `path`-arvolla.

## Istuntojen välinen turvallisuus — Claude Codea koskevat erityisohjeet

Ehdottomat säännöt #19/#21/#22 (tiedostossa `AGENTS.md`) ohjaavat rinnakkaisia istuntoja.
Toiminnalliset muistutukset tälle suoritusympäristölle:

- **Toista `git stash` -kielto sanatarkasti jokaisen gitiin koskevan aliagentin kehotteessa**
  (Agent-työkalu / työnkulkuskriptit) — aliagentit eivät peri tätä tiedostoa, ja kirjattu
  stash-ongelman toistuminen tapahtui aliagentin kautta.
- Ennen yhdistämistä tai puskemista sellaiseen PR:ään, jota et luonut _tässä istunnossa_, suorita
  `git worktree list` ja tarkista uudelleen `gh pr view <N> --json state,headRefOid` (ehdoton sääntö
  #22b).
- Päätä jokainen istunto niin, että päätyökopio on samalla haaralla, jolla se oli istunnon alkaessa.

## Superpowers-/suunnitteluartifaktit — polkujen ohitukset

`_tasks/`-käytäntö on määritelty kohdassa `AGENTS.md` → "Planning & Research Artifacts".
Superpowers-taidot toimitetaan oletuksilla, jotka viittaavat polkuun `docs/…` — nämä oletukset
**ohitetaan tässä**. Kun superpowers-taito ilmoittaa polun, kuten "tallennettu kohteeseen
`docs/superpowers/plans/…`", muuta se vastaavaksi `_tasks/…`-poluksi ennen kirjoittamista:

| Artifakti (taito)                           | Oletus (ÄLÄ käytä)        | Tallenna sen sijaan tänne                                     |
| ------------------------------------------- | ------------------------- | ------------------------------------------------------------- |
| Suunnitelmat (`writing-plans`)              | `docs/superpowers/plans/` | `_tasks/superpowers/plans/YYYY-MM-DD-<feature>.md`            |
| Määritykset / suunnittelu (`brainstorming`) | `docs/superpowers/specs/` | `_tasks/superpowers/specs/YYYY-MM-DD-<topic>-design.md`       |
| Tutkimus (`deep-research`, tilapäinen)      | `docs/research/`          | `_tasks/research/…`                                           |
| Luovutukset (`/handoff`)                    | —                         | `_tasks/hands-off/<YYYY-MM-DD>_<branch>_v<versão>_sess-<id>/` |

Commitoi nämä artifaktit `_tasks/`-repositoriossa (`git -C _tasks …`), älä koskaan päärepositoriossa.

## Luonnos-/väliaikaistiedostot — käytä `_artifacts/`-hakemistoa, älä `/tmp`-hakemistoa

Tämä projekti ohittaa suoritusympäristön oletusarvoisen istuntokohtaisen luonnosalueen
(`/tmp/claude-*/…`). Kirjoita väliaikaiset/työtiedostot — viennit, luodut zip-tiedostot,
kertaluonteiset välitulosteet ja kaikki, minkä muutoin sijoittaisit hakemistoon `/tmp` — sen sijaan
hakemistoon `/home/diegosouzapw/dev/proxys/OmniRoute/_artifacts/`.

- `_artifacts/` on juuritason `_*`-polku: se on jo gitin ohittama (`AGENTS.md` → "Root `_*`
  paths"), sijaitsee vain levyllä eikä sitä koskaan seurata.
- Syy: luonnostulosteiden säilyttäminen projektin sisällä (`/tmp`-hakemiston sijaan) tekee kaikkien
  väliaikaistiedostojen löytämisestä ja poistamisesta operaattorille helppoa yhdessä paikassa sen
  sijaan, että niitä pitäisi etsiä katoavista tai seuraamattomia tiedostoja kerryttävistä
  väliaikaisista istuntokohtaisista `/tmp`-hakemistoista.
- Älä **sekoita** tätä `_tasks/`-hakemistoon (ehdoton sääntö #23, oma yksityinen git-repositorio
  pysyville suunnitelmille/määrityksille/tutkimuksille/luovutuksille) — `_artifacts/` on tarkoitettu
  vain kertakäyttöisille työtiedostoille; minkään täällä olevan ei tarvitse säilyä tai olla
  versioitu.

## Pohjan vihreys ennen PR:ien avaamista

Ennen haaran luomista tai PR:n avaamista suorita pohjan vihreystarkistus (`AGENTS.md` → Git
Workflow → "Base-green check"; projektin taidot viittaavat siihen polulla
`.agents/skills/_shared/base-green.md`). PR:n, joka avataan pohjahaaran kärjen ollessa punainen,
tekstissä on oltava `⚠️ base-red inherited: #<issue>`. Käytä `/sweep-reds`-taitoa kertyneen punaisen
tilan (pohjahaaran kärki + punaiset PR:t) purkamiseen.
