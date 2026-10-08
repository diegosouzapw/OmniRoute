# CLAUDE.md (Gaeilge)

🌐 **Languages:** 🇺🇸 [English](../../../CLAUDE.md) · 🇪🇹 [am](../am/CLAUDE.md) · 🇸🇦 [ar](../ar/CLAUDE.md) · 🇦🇿 [az](../az/CLAUDE.md) · 🇧🇬 [bg](../bg/CLAUDE.md) · 🇧🇩 [bn](../bn/CLAUDE.md) · 🇧🇦 [bs](../bs/CLAUDE.md) · 🇨🇿 [cs](../cs/CLAUDE.md) · 🇩🇰 [da](../da/CLAUDE.md) · 🇩🇪 [de](../de/CLAUDE.md) · 🇬🇷 [el](../el/CLAUDE.md) · 🇪🇸 [es](../es/CLAUDE.md) · 🇪🇪 [et](../et/CLAUDE.md) · 🇮🇷 [fa](../fa/CLAUDE.md) · 🇫🇮 [fi](../fi/CLAUDE.md) · 🇫🇷 [fr](../fr/CLAUDE.md) · 🇮🇳 [gu](../gu/CLAUDE.md) · 🇳🇬 [ha](../ha/CLAUDE.md) · 🇮🇱 [he](../he/CLAUDE.md) · 🇮🇳 [hi](../hi/CLAUDE.md) · 🇭🇷 [hr](../hr/CLAUDE.md) · 🇭🇺 [hu](../hu/CLAUDE.md) · 🇦🇲 [hy](../hy/CLAUDE.md) · 🇮🇩 [id](../id/CLAUDE.md) · 🇳🇬 [ig](../ig/CLAUDE.md) · 🇮🇹 [it](../it/CLAUDE.md) · 🇯🇵 [ja](../ja/CLAUDE.md) · 🇬🇪 [ka](../ka/CLAUDE.md) · 🇰🇭 [km](../km/CLAUDE.md) · 🇮🇳 [kn](../kn/CLAUDE.md) · 🇰🇷 [ko](../ko/CLAUDE.md) · 🇱🇹 [lt](../lt/CLAUDE.md) · 🇱🇻 [lv](../lv/CLAUDE.md) · 🇮🇳 [ml](../ml/CLAUDE.md) · 🇮🇳 [mr](../mr/CLAUDE.md) · 🇲🇾 [ms](../ms/CLAUDE.md) · 🇲🇹 [mt](../mt/CLAUDE.md) · 🇲🇲 [my](../my/CLAUDE.md) · 🇳🇵 [ne](../ne/CLAUDE.md) · 🇳🇱 [nl](../nl/CLAUDE.md) · 🇳🇴 [no](../no/CLAUDE.md) · 🇮🇳 [or](../or/CLAUDE.md) · 🇮🇳 [pa](../pa/CLAUDE.md) · 🇵🇭 [phi](../phi/CLAUDE.md) · 🇵🇱 [pl](../pl/CLAUDE.md) · 🇵🇹 [pt](../pt/CLAUDE.md) · 🇧🇷 [pt-BR](../pt-BR/CLAUDE.md) · 🇷🇴 [ro](../ro/CLAUDE.md) · 🇷🇺 [ru](../ru/CLAUDE.md) · 🇱🇰 [si](../si/CLAUDE.md) · 🇸🇰 [sk](../sk/CLAUDE.md) · 🇸🇮 [sl](../sl/CLAUDE.md) · 🇷🇸 [sr](../sr/CLAUDE.md) · 🇸🇪 [sv](../sv/CLAUDE.md) · 🇰🇪 [sw](../sw/CLAUDE.md) · 🇮🇳 [ta](../ta/CLAUDE.md) · 🇮🇳 [te](../te/CLAUDE.md) · 🇹🇭 [th](../th/CLAUDE.md) · 🇹🇷 [tr](../tr/CLAUDE.md) · 🇺🇦 [uk-UA](../uk-UA/CLAUDE.md) · 🇵🇰 [ur](../ur/CLAUDE.md) · 🇺🇿 [uz](../uz/CLAUDE.md) · 🇻🇳 [vi](../vi/CLAUDE.md) · 🇳🇬 [yo](../yo/CLAUDE.md) · 🇨🇳 [zh-CN](../zh-CN/CLAUDE.md) · 🇹🇼 [zh-TW](../zh-TW/CLAUDE.md)

---

@AGENTS.md

**Tá rialacha uile an tionscadail in [`AGENTS.md`](AGENTS.md)** — an t-aon fhoinse fírinne do gach cúntóir
AI (ailtireacht, coinbhinsiúin, tástáil, geataí cáilíochta, sreabhadh oibre git, na 23 Riail Dhiana,
foghlaimí PII). Léigh ina iomláine é; ná cuir rialacha an tionscadail leis arís anseo. Baineann gach rud thíos le
Claude Code AMHÁIN — mionchoigeartuithe oibríochtúla ar rialacha atá sainithe cheana féin in `AGENTS.md`.

## Leithlisiú worktree — sonraí sonracha do Claude Code

Tá an prótacal iomlán éigeantach worktree (deimhniú an bhunbhrainse, conair chanónach
`.claude/worktrees/`, `cp -al` node_modules, rialacha díchoimisiúnaithe) in `AGENTS.md` → Git Workflow → "Worktree
isolation". Pointí sonracha do Claude Code:

- Deimhnigh an bunbhrainse leis an oibreoir trí `AskUserQuestion` (Riail Dhian #19) mura bhfuil sé
  ráite acu leat cheana féin.
- Tabhair tús áite don uirlis dhúchasach `EnterWorktree` — cruthaíonn sí worktrees faoi
  `.claude/worktrees/` (an chonair chanónach) cheana féin. Cruthaigh an worktree leis an ordú doiciméadaithe `git
worktree add`, ansin glaoigh ar `EnterWorktree` lena `path`.

## Sábháilteacht trastseisiúin — sonraí sonracha do Claude Code

Rialaíonn Rialacha Dána #19/#21/#22 (in `AGENTS.md`) seisiúin chomhthreomhara. Meabhrúcháin oibríochtúla don
chreat seo:

- **Macasamhlaigh an cosc ar `git stash` focal ar fhocal i leid gach fo-ghníomhaire a bhaineann le git**
  (uirlis Agent / scripteanna Workflow) — ní fhaigheann fo-ghníomhairí an comhad seo le hoidhreacht, agus tharla
  atarlú taifeadta na heachtra stash trí fho-ghníomhaire.
- Sula gcumascann tú nó sula mbrúnn tú chuig aon PR nár chruthaigh tú _sa seisiún seo_, rith `git worktree list`
  agus athsheiceáil `gh pr view <N> --json state,headRefOid` (Riail Dhian #22b).
- Críochnaigh gach seisiún agus an príomhsheiceáil amach ar an mbrainse ar ar thosaigh sí.

## Superpowers / déantáin phleanála — sáruithe conaire

Sainítear coinbhinsiún `_tasks/` in `AGENTS.md` → "Planning & Research Artifacts". Tagann na
scileanna superpowers le réamhshocruithe a dhíríonn ar `docs/…` — tá na réamhshocruithe sin **sáraithe
anseo**. Nuair a fhógraíonn scil superpowers conair amhail "saved to `docs/superpowers/plans/…`",
athscríobh í go dtí a coibhéis `_tasks/…` sula scríobhann tú:

| Déantán (scil)                           | Réamhshocrú (NÁ húsáid)   | Sábháil anseo ina ionad                                       |
| ---------------------------------------- | ------------------------- | ------------------------------------------------------------- |
| Pleananna (`writing-plans`)              | `docs/superpowers/plans/` | `_tasks/superpowers/plans/YYYY-MM-DD-<feature>.md`            |
| Sonraíochtaí / dearadh (`brainstorming`) | `docs/superpowers/specs/` | `_tasks/superpowers/specs/YYYY-MM-DD-<topic>-design.md`       |
| Taighde (`deep-research`, ad-hoc)        | `docs/research/`          | `_tasks/research/…`                                           |
| Aistrithe (`/handoff`)                   | —                         | `_tasks/hands-off/<YYYY-MM-DD>_<branch>_v<versão>_sess-<id>/` |

Cuir na déantáin sin faoi leaganrialú laistigh de stór `_tasks/` (`git -C _tasks …`), agus ná cuir sa phríomhstór riamh iad.

## Comhaid scríobtha / shealadacha — úsáid `_artifacts/`, ní `/tmp`

Sáraíonn an tionscadal seo scríobhlann réamhshocraithe seisiúin an chreata (`/tmp/claude-*/…`). Scríobh
comhaid shealadacha/oibre — easpórtálacha, comhaid zip ghinte, aschuir idirmheánacha aonuaire, rud ar bith a
chuirfeá in `/tmp` murach sin — chuig `/home/diegosouzapw/dev/proxys/OmniRoute/_artifacts/` ina ionad.

- Is conair fhréimhe `_*` é `_artifacts/`: tá sí gitignored cheana féin (`AGENTS.md` → "Root `_*` paths"), maireann sí
  ar an diosca amháin, agus ní dhéantar í a rianú riamh.
- Cúis: má choinnítear aschur scríobtha taobh istigh den tionscadal (seachas `/tmp`), bíonn sé thar a bheith éasca don oibreoir
  gach rud sealadach a aimsiú agus a scriosadh in aon áit amháin, in ionad cuardach a dhéanamh ar fud eolairí sealadacha
  `/tmp` a bhaineann go sonrach le seisiúin agus a imíonn nó a charnann gan a bheith rianaithe.
- Ná cuir é seo amú le `_tasks/` (Riail Dhian #23, a stór príobháideach git féin do phleananna/
  sonraíochtaí/taighde/aistrithe marthanacha) — is do chomhaid oibre indiúscartha amháin é `_artifacts/`; ní gá d'aon rud
  anseo maireachtáil nó a bheith faoi leaganrialú.

## Bunleagan glas sula n-osclaítear PRanna

Sula ngearrann tú brainse nó sula n-osclaíonn tú PR, rith an tseiceáil bhunleagain ghlais (`AGENTS.md` → Git Workflow →
"Base-green check"; tagraíonn scileanna an tionscadail di mar `.agents/skills/_shared/base-green.md`). Ní mór
`⚠️ base-red inherited: #<issue>` a bheith i gcorp PR a osclaíodh agus barr an bhunleagain dearg. Chun
staid dhearg charntha a ghlanadh (barr dearg an bhunleagain + PRanna dearga), úsáid an scil `/sweep-reds`.
