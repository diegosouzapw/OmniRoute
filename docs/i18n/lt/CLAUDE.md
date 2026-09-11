# CLAUDE.md (Lietuvių)

🌐 **Languages:** 🇺🇸 [English](../../../CLAUDE.md) · 🇸🇦 [ar](../ar/CLAUDE.md) · 🇦🇿 [az](../az/CLAUDE.md) · 🇧🇬 [bg](../bg/CLAUDE.md) · 🇧🇩 [bn](../bn/CLAUDE.md) · 🇨🇿 [cs](../cs/CLAUDE.md) · 🇩🇰 [da](../da/CLAUDE.md) · 🇩🇪 [de](../de/CLAUDE.md) · 🇬🇷 [el](../el/CLAUDE.md) · 🇪🇸 [es](../es/CLAUDE.md) · 🇪🇪 [et](../et/CLAUDE.md) · 🇮🇷 [fa](../fa/CLAUDE.md) · 🇫🇮 [fi](../fi/CLAUDE.md) · 🇫🇷 [fr](../fr/CLAUDE.md) · 🇮🇪 [ga](../ga/CLAUDE.md) · 🇮🇳 [gu](../gu/CLAUDE.md) · 🇮🇱 [he](../he/CLAUDE.md) · 🇮🇳 [hi](../hi/CLAUDE.md) · 🇭🇷 [hr](../hr/CLAUDE.md) · 🇭🇺 [hu](../hu/CLAUDE.md) · 🇮🇩 [id](../id/CLAUDE.md) · 🇮🇹 [it](../it/CLAUDE.md) · 🇯🇵 [ja](../ja/CLAUDE.md) · 🇰🇷 [ko](../ko/CLAUDE.md) · 🇱🇻 [lv](../lv/CLAUDE.md) · 🇮🇳 [mr](../mr/CLAUDE.md) · 🇲🇾 [ms](../ms/CLAUDE.md) · 🇲🇹 [mt](../mt/CLAUDE.md) · 🇳🇱 [nl](../nl/CLAUDE.md) · 🇳🇴 [no](../no/CLAUDE.md) · 🇵🇭 [phi](../phi/CLAUDE.md) · 🇵🇱 [pl](../pl/CLAUDE.md) · 🇵🇹 [pt](../pt/CLAUDE.md) · 🇧🇷 [pt-BR](../pt-BR/CLAUDE.md) · 🇷🇴 [ro](../ro/CLAUDE.md) · 🇷🇺 [ru](../ru/CLAUDE.md) · 🇸🇰 [sk](../sk/CLAUDE.md) · 🇸🇮 [sl](../sl/CLAUDE.md) · 🇷🇸 [sr](../sr/CLAUDE.md) · 🇸🇪 [sv](../sv/CLAUDE.md) · 🇰🇪 [sw](../sw/CLAUDE.md) · 🇮🇳 [ta](../ta/CLAUDE.md) · 🇮🇳 [te](../te/CLAUDE.md) · 🇹🇭 [th](../th/CLAUDE.md) · 🇹🇷 [tr](../tr/CLAUDE.md) · 🇺🇦 [uk-UA](../uk-UA/CLAUDE.md) · 🇵🇰 [ur](../ur/CLAUDE.md) · 🇻🇳 [vi](../vi/CLAUDE.md) · 🇨🇳 [zh-CN](../zh-CN/CLAUDE.md) · 🇹🇼 [zh-TW](../zh-TW/CLAUDE.md)

---

@AGENTS.md

**Visos projekto taisyklės pateiktos faile [`AGENTS.md`](AGENTS.md)** — tai vienintelis tiesos šaltinis kiekvienam DI
asistentui (architektūra, susitarimai, testavimas, kokybės patikros, git darbo eiga, 23 griežtosios taisyklės,
su PII susijusios įžvalgos). Perskaitykite jį visą; projekto taisyklių čia iš naujo neįtraukite. Visa toliau
pateikta informacija taikoma TIK Claude Code — tai `AGENTS.md` jau apibrėžtų taisyklių praktiniai patikslinimai.

## Darbinių medžių izoliavimas — Claude Code ypatumai

Visas privalomas darbinių medžių protokolas (bazinės šakos patvirtinimas, kanoninis
`.claude/worktrees/` kelias, `cp -al` node_modules, išvalymo taisyklės) pateiktas `AGENTS.md` → Git darbo eiga → „Darbinių medžių
izoliavimas“. Claude Code skirti punktai:

- Patvirtinkite bazinę šaką su operatoriumi naudodami `AskUserQuestion` (griežtoji taisyklė Nr. 19), nebent jis
  ją jau nurodė.
- Pirmenybę teikite integruotajam `EnterWorktree` įrankiui — jis jau kuria darbinius medžius
  `.claude/worktrees/` kataloge (kanoniniame kelyje). Sukurkite darbinį medį dokumentuota `git
worktree add` komanda, tada iškvieskite `EnterWorktree`, nurodydami jo `path`.

## Saugumas tarp sesijų — Claude Code ypatumai

Griežtosios taisyklės Nr. 19, Nr. 21 ir Nr. 22 (faile `AGENTS.md`) reglamentuoja lygiagrečias sesijas. Praktiniai priminimai šiai
vykdymo aplinkai:

- **Kiekvieno su git dirbančio pagalbinio agento užklausoje pažodžiui pakartokite draudimą naudoti `git stash`**
  (`Agent` įrankis / darbo eigos scenarijai) — pagalbiniai agentai nepaveldi šio failo, o užfiksuotas
  stash incidento pasikartojimas įvyko būtent per pagalbinį agentą.
- Prieš sujungdami ar išsiųsdami pakeitimus į bet kurį PR, kurio nesukūrėte _šioje sesijoje_, paleiskite `git worktree list`
  ir iš naujo patikrinkite `gh pr view <N> --json state,headRefOid` (griežtoji taisyklė Nr. 22b).
- Kiekvienos sesijos pabaigoje pagrindinę darbinę kopiją palikite toje pačioje šakoje, kurioje ji buvo sesijos pradžioje.

## Superpowers / planavimo artefaktai — kelių perrašymai

`_tasks/` susitarimas apibrėžtas `AGENTS.md` → „Planavimo ir tyrimų artefaktai“. Su
superpowers įgūdžiais pateikiamos numatytosios reikšmės, nukreipiančios į `docs/…` — šios numatytosios reikšmės čia yra **perrašomos**.
Kai superpowers įgūdis paskelbia kelią, pavyzdžiui, „išsaugota į `docs/superpowers/plans/…`“,
prieš įrašydami pakeiskite jį atitinkamu `_tasks/…` keliu:

| Artefaktas (įgūdis)                         | Numatytasis (NENAUDOTI)   | Vietoje jo išsaugoti čia                                      |
| ------------------------------------------- | ------------------------- | ------------------------------------------------------------- |
| Planai (`writing-plans`)                    | `docs/superpowers/plans/` | `_tasks/superpowers/plans/YYYY-MM-DD-<feature>.md`            |
| Specifikacijos / dizainas (`brainstorming`) | `docs/superpowers/specs/` | `_tasks/superpowers/specs/YYYY-MM-DD-<topic>-design.md`       |
| Tyrimai (`deep-research`, ad-hoc)           | `docs/research/`          | `_tasks/research/…`                                           |
| Darbo perdavimai (`/handoff`)               | —                         | `_tasks/hands-off/<YYYY-MM-DD>_<branch>_v<versão>_sess-<id>/` |

Komituokite šiuos artefaktus `_tasks/` saugykloje (`git -C _tasks …`), niekada ne pagrindinėje saugykloje.

## Juodraščiai / laikinieji failai — naudokite `_artifacts/`, o ne `/tmp`

Šiame projekte perrašoma vykdymo aplinkos numatytoji sesijos juodraščių vieta (`/tmp/claude-*/…`). Laikinuosius / darbinius
failus — eksportuotus duomenis, sugeneruotus zip archyvus, vienkartinius tarpinius rezultatus ir viską, ką kitu atveju
įrašytumėte į `/tmp` — rašykite į `/home/diegosouzapw/dev/proxys/OmniRoute/_artifacts/`.

- `_artifacts/` yra šakninio lygmens `_*` kelias: jo git jau nepaiso (`AGENTS.md` → „Šakninio lygmens `_*` keliai“), jis egzistuoja
  tik diske ir niekada nėra sekamas.
- Priežastis: laikant juodraštinius rezultatus projekte (o ne `/tmp`), operatoriui labai paprasta
  vienoje vietoje rasti ir ištrinti visus laikinuosius failus, užuot jų ieškojus trumpalaikiuose,
  konkrečioms sesijoms skirtuose `/tmp` kataloguose, kurie išnyksta arba kuriuose kaupiasi nesekami failai.
- **Nepainiokite** šio katalogo su `_tasks/` (griežtoji taisyklė Nr. 23, atskira privati git saugykla ilgalaikiams
  planams, specifikacijoms, tyrimams ir darbo perdavimams) — `_artifacts/` skirtas tik vienkartiniams darbiniams failams; nieko
  iš čia nereikia išsaugoti ar versijuoti.

## Žalia bazė prieš atidarant PR

Prieš sukurdami šaką ar atidarydami PR, atlikite žalios bazės patikrą (`AGENTS.md` → Git darbo eiga →
„Žalios bazės patikra“; projekto įgūdžiuose ji nurodoma kaip `.agents/skills/_shared/base-green.md`). Jei PR
atidaromas, kai bazinės šakos viršūnė yra raudona, jo apraše turi būti `⚠️ base-red inherited: #<issue>`. Norėdami
pašalinti susikaupusią raudoną būseną (bazinės šakos viršūnė + raudoni PR), naudokite `/sweep-reds` įgūdį.
