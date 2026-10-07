# CLAUDE.md (Magyar)

🌐 **Languages:** 🇺🇸 [English](../../../CLAUDE.md) · 🇪🇹 [am](../am/CLAUDE.md) · 🇸🇦 [ar](../ar/CLAUDE.md) · 🇦🇿 [az](../az/CLAUDE.md) · 🇧🇬 [bg](../bg/CLAUDE.md) · 🇧🇩 [bn](../bn/CLAUDE.md) · 🇧🇦 [bs](../bs/CLAUDE.md) · 🇨🇿 [cs](../cs/CLAUDE.md) · 🇩🇰 [da](../da/CLAUDE.md) · 🇩🇪 [de](../de/CLAUDE.md) · 🇬🇷 [el](../el/CLAUDE.md) · 🇪🇸 [es](../es/CLAUDE.md) · 🇪🇪 [et](../et/CLAUDE.md) · 🇮🇷 [fa](../fa/CLAUDE.md) · 🇫🇮 [fi](../fi/CLAUDE.md) · 🇫🇷 [fr](../fr/CLAUDE.md) · 🇮🇪 [ga](../ga/CLAUDE.md) · 🇮🇳 [gu](../gu/CLAUDE.md) · 🇳🇬 [ha](../ha/CLAUDE.md) · 🇮🇱 [he](../he/CLAUDE.md) · 🇮🇳 [hi](../hi/CLAUDE.md) · 🇭🇷 [hr](../hr/CLAUDE.md) · 🇦🇲 [hy](../hy/CLAUDE.md) · 🇮🇩 [id](../id/CLAUDE.md) · 🇳🇬 [ig](../ig/CLAUDE.md) · 🇮🇹 [it](../it/CLAUDE.md) · 🇯🇵 [ja](../ja/CLAUDE.md) · 🇬🇪 [ka](../ka/CLAUDE.md) · 🇰🇭 [km](../km/CLAUDE.md) · 🇮🇳 [kn](../kn/CLAUDE.md) · 🇰🇷 [ko](../ko/CLAUDE.md) · 🇱🇹 [lt](../lt/CLAUDE.md) · 🇱🇻 [lv](../lv/CLAUDE.md) · 🇮🇳 [ml](../ml/CLAUDE.md) · 🇮🇳 [mr](../mr/CLAUDE.md) · 🇲🇾 [ms](../ms/CLAUDE.md) · 🇲🇹 [mt](../mt/CLAUDE.md) · 🇲🇲 [my](../my/CLAUDE.md) · 🇳🇵 [ne](../ne/CLAUDE.md) · 🇳🇱 [nl](../nl/CLAUDE.md) · 🇳🇴 [no](../no/CLAUDE.md) · 🇮🇳 [or](../or/CLAUDE.md) · 🇮🇳 [pa](../pa/CLAUDE.md) · 🇵🇭 [phi](../phi/CLAUDE.md) · 🇵🇱 [pl](../pl/CLAUDE.md) · 🇵🇹 [pt](../pt/CLAUDE.md) · 🇧🇷 [pt-BR](../pt-BR/CLAUDE.md) · 🇷🇴 [ro](../ro/CLAUDE.md) · 🇷🇺 [ru](../ru/CLAUDE.md) · 🇱🇰 [si](../si/CLAUDE.md) · 🇸🇰 [sk](../sk/CLAUDE.md) · 🇸🇮 [sl](../sl/CLAUDE.md) · 🇷🇸 [sr](../sr/CLAUDE.md) · 🇸🇪 [sv](../sv/CLAUDE.md) · 🇰🇪 [sw](../sw/CLAUDE.md) · 🇮🇳 [ta](../ta/CLAUDE.md) · 🇮🇳 [te](../te/CLAUDE.md) · 🇹🇭 [th](../th/CLAUDE.md) · 🇹🇷 [tr](../tr/CLAUDE.md) · 🇺🇦 [uk-UA](../uk-UA/CLAUDE.md) · 🇵🇰 [ur](../ur/CLAUDE.md) · 🇺🇿 [uz](../uz/CLAUDE.md) · 🇻🇳 [vi](../vi/CLAUDE.md) · 🇳🇬 [yo](../yo/CLAUDE.md) · 🇨🇳 [zh-CN](../zh-CN/CLAUDE.md) · 🇹🇼 [zh-TW](../zh-TW/CLAUDE.md)

---

@AGENTS.md

**Minden projektszabály az [`AGENTS.md`](AGENTS.md) fájlban található** — ez az egyetlen hiteles információforrás minden AI-asszisztens számára (architektúra, konvenciók, tesztelés, minőségi ellenőrzőkapuk, git-munkafolyamat, a 23 szigorú szabály, személyazonosításra alkalmas adatokkal kapcsolatos tanulságok). Olvasd el teljes egészében; ne add hozzá újra ide a projektszabályokat. Az alábbiak KIZÁRÓLAG a Claude Code-ra vonatkoznak — az `AGENTS.md` fájlban már meghatározott szabályok működésbeli pontosításai.

## Worktree-elkülönítés — Claude Code-specifikus részletek

A teljes, kötelező worktree-protokoll (az alapág megerősítése, a `.claude/worktrees/` kanonikus
útvonal, `cp -al` node_modules, eltávolítási szabályok) az `AGENTS.md` → Git-munkafolyamat → „Worktree
isolation” szakaszában található. Claude Code-specifikus pontok:

- Erősítsd meg az alapágat az operátorral az `AskUserQuestion` használatával (19. szigorú szabály), kivéve, ha azt
  már közölte veled.
- Részesítsd előnyben a natív `EnterWorktree` eszközt — ez eleve a
  `.claude/worktrees/` (a kanonikus útvonal) alatt hozza létre a worktree-ket. Hozd létre a worktree-t a dokumentált `git
worktree add` paranccsal, majd hívd meg az `EnterWorktree` eszközt a worktree `path` értékével.

## Munkamenetek közötti biztonság — Claude Code-specifikus részletek

A párhuzamos munkameneteket a 19./21./22. szigorú szabályok (az `AGENTS.md` fájlban) szabályozzák. Működésbeli emlékeztetők ehhez a
környezethez:

- **A `git stash` tiltását szó szerint másold be minden githez hozzáférő alügynök promptjába**
  (Agent eszköz / munkafolyamat-szkriptek) — az alügynökök nem öröklik ezt a fájlt, és a stash-incidens dokumentált
  megismétlődése is egy alügynökön keresztül történt.
- Mielőtt olyan PR-t egyesítenél vagy küldenél fel, amelyet nem _ebben a munkamenetben_ hoztál létre, futtasd a `git worktree list`
  parancsot, és ellenőrizd újra a `gh pr view <N> --json state,headRefOid` kimenetét (22b. szigorú szabály).
- Minden munkamenetet úgy fejezz be, hogy a fő checkout azon az ágon legyen, amelyen a munkamenet kezdetekor volt.

## Superpowers / tervezési műtermékek — útvonal-felülírások

Az `_tasks/` konvenciót az `AGENTS.md` → „Planning & Research Artifacts” szakasza határozza meg. A
superpowers készségek alapértelmezései a `docs/…` útvonalra mutatnak — ezeket az alapértelmezéseket **itt
felülírjuk**. Amikor egy superpowers készség olyan útvonalat közöl, mint a „saved to `docs/superpowers/plans/…`”,
írás előtt helyettesítsd azt a megfelelő `_tasks/…` útvonallal:

| Műtermék (készség)                         | Alapértelmezés (NE használd) | Helyette ide mentsd                                           |
| ------------------------------------------ | ---------------------------- | ------------------------------------------------------------- |
| Tervek (`writing-plans`)                   | `docs/superpowers/plans/`    | `_tasks/superpowers/plans/YYYY-MM-DD-<feature>.md`            |
| Specifikációk / tervezés (`brainstorming`) | `docs/superpowers/specs/`    | `_tasks/superpowers/specs/YYYY-MM-DD-<topic>-design.md`       |
| Kutatás (`deep-research`, ad hoc)          | `docs/research/`             | `_tasks/research/…`                                           |
| Átadások (`/handoff`)                      | —                            | `_tasks/hands-off/<YYYY-MM-DD>_<branch>_v<versão>_sess-<id>/` |

Ezeket a műtermékeket az `_tasks/` repóban commitold (`git -C _tasks …`), soha ne a fő repóban.

## Jegyzet- / ideiglenes fájlok — az `_artifacts/` útvonalat használd, ne a `/tmp` könyvtárat

Ez a projekt felülírja a környezet alapértelmezett munkamenet-jegyzettömbjét (`/tmp/claude-*/…`). Az
ideiglenes/munkafájlokat — exportokat, generált zip-fájlokat, egyszer használatos köztes kimeneteket, bármit, amit
egyébként a `/tmp` könyvtárba helyeznél — ehelyett a `/home/diegosouzapw/dev/proxys/OmniRoute/_artifacts/` útvonalra írd.

- Az `_artifacts/` egy gyökérszintű `_*` útvonal: már szerepel a gitignore-ban (`AGENTS.md` → „Root `_*` paths”), csak
  a lemezen létezik, és soha nincs verziókövetve.
- Indoklás: ha a jegyzetjellegű kimeneteket a projekten belül tartjuk (a `/tmp` helyett), az operátor
  egyszerűen megtalálhat és egyetlen helyről törölhet minden ideiglenes fájlt, ahelyett, hogy
  eltűnő vagy verziókövetetlen fájlokat felhalmozó, rövid életű, munkamenet-specifikus `/tmp` könyvtárakban kellene keresgélnie.
- **Ne** keverd össze ezt az `_tasks/` könyvtárral (23. szigorú szabály, saját privát git-repóval rendelkezik a tartós
  tervekhez/specifikációkhoz/kutatásokhoz/átadásokhoz) — az `_artifacts/` kizárólag eldobható munkafájlokhoz való; itt
  semminek sem kell fennmaradnia vagy verziókövetés alá kerülnie.

## Zöld alapállapot PR-ek megnyitása előtt

Mielőtt ágat hoznál létre vagy PR-t nyitnál, futtasd az alapállapot zöld ellenőrzését (`AGENTS.md` → Git-munkafolyamat →
„Base-green check”; a projekt készségei `.agents/skills/_shared/base-green.md` néven hivatkoznak rá). Ha egy PR
akkor nyílik meg, amikor az alapág csúcsa piros, a törzsében szerepelnie kell a `⚠️ base-red inherited: #<issue>` szövegnek. A
felhalmozódott piros állapot (az alapág csúcsa + piros PR-ek) felszámolásához használd a `/sweep-reds` készséget.
