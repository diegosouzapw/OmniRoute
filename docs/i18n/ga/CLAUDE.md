# CLAUDE.md (Gaeilge)

🌐 **Languages:** 🇺🇸 [English](../../../CLAUDE.md) · 🇸🇦 [ar](../ar/CLAUDE.md) · 🇦🇿 [az](../az/CLAUDE.md) · 🇧🇬 [bg](../bg/CLAUDE.md) · 🇧🇩 [bn](../bn/CLAUDE.md) · 🇨🇿 [cs](../cs/CLAUDE.md) · 🇩🇰 [da](../da/CLAUDE.md) · 🇩🇪 [de](../de/CLAUDE.md) · 🇬🇷 [el](../el/CLAUDE.md) · 🇪🇸 [es](../es/CLAUDE.md) · 🇪🇪 [et](../et/CLAUDE.md) · 🇮🇷 [fa](../fa/CLAUDE.md) · 🇫🇮 [fi](../fi/CLAUDE.md) · 🇫🇷 [fr](../fr/CLAUDE.md) · 🇮🇳 [gu](../gu/CLAUDE.md) · 🇮🇱 [he](../he/CLAUDE.md) · 🇮🇳 [hi](../hi/CLAUDE.md) · 🇭🇷 [hr](../hr/CLAUDE.md) · 🇭🇺 [hu](../hu/CLAUDE.md) · 🇮🇩 [id](../id/CLAUDE.md) · 🇮🇹 [it](../it/CLAUDE.md) · 🇯🇵 [ja](../ja/CLAUDE.md) · 🇰🇷 [ko](../ko/CLAUDE.md) · 🇱🇹 [lt](../lt/CLAUDE.md) · 🇱🇻 [lv](../lv/CLAUDE.md) · 🇮🇳 [mr](../mr/CLAUDE.md) · 🇲🇾 [ms](../ms/CLAUDE.md) · 🇲🇹 [mt](../mt/CLAUDE.md) · 🇳🇱 [nl](../nl/CLAUDE.md) · 🇳🇴 [no](../no/CLAUDE.md) · 🇵🇭 [phi](../phi/CLAUDE.md) · 🇵🇱 [pl](../pl/CLAUDE.md) · 🇵🇹 [pt](../pt/CLAUDE.md) · 🇧🇷 [pt-BR](../pt-BR/CLAUDE.md) · 🇷🇴 [ro](../ro/CLAUDE.md) · 🇷🇺 [ru](../ru/CLAUDE.md) · 🇸🇰 [sk](../sk/CLAUDE.md) · 🇸🇮 [sl](../sl/CLAUDE.md) · 🇷🇸 [sr](../sr/CLAUDE.md) · 🇸🇪 [sv](../sv/CLAUDE.md) · 🇰🇪 [sw](../sw/CLAUDE.md) · 🇮🇳 [ta](../ta/CLAUDE.md) · 🇮🇳 [te](../te/CLAUDE.md) · 🇹🇭 [th](../th/CLAUDE.md) · 🇹🇷 [tr](../tr/CLAUDE.md) · 🇺🇦 [uk-UA](../uk-UA/CLAUDE.md) · 🇵🇰 [ur](../ur/CLAUDE.md) · 🇻🇳 [vi](../vi/CLAUDE.md) · 🇨🇳 [zh-CN](../zh-CN/CLAUDE.md) · 🇹🇼 [zh-TW](../zh-TW/CLAUDE.md)

---

@AGENTS.md

**Tá na rialacha tionscadail uile ag teacht le chéile i [`AGENTS.md`](AGENTS.md)** — an fhoinse fhíorúil amháin do gach cuiditheoir AI (gníomhshocrú, coinbhinsiúin, tástáil, geataí caighdeáin, sreaimh oibre git, na 23 Rialacha Crua, foghlaim PII). Léigh é ina iomlán; ná cuir rialacha tanscadail leis anseo arís. Ní bhaineann an méid atá thíos ach le Claude Code — buanchoigeartúcháin oibríochtúla ar rialacha atá sainmhínithe cheana féin in `AGENTS.md`.

## Isoleáil Worktree — Sonrachais Claude Code

Tá an prótacal iomlán éigeantach worktree (deimhniúa an bhunoibre, cosán caighdeánach `.claude/worktrees/`, `cp -al` node_modules, rialacha crutha) ag teacht le chéile in `AGENTS.md` → Sreaimh Oibre → "Isoleáil Worktree". Sonrachais ar leith le haghaidh Claude Code:

- Deimhnigh an bunoibreacha leis an oibreoir tríd an uirlis `AskUserQuestion` (Riala Crua #19) mura bhfuil sé curtha in iúl cheana féin agat.
- Is fearr an uirlis nádúrtha `EnterWorktree` a úsáid — cruthaíonn sí worktrees cheana féin faoin gcosán caighdeánach `.claude/worktrees/`. Cruthaigh an worktree leis an ordú `git worktree add` atá curtha ar fáil, ansin glaodh ar `EnterWorktree` leis an `path`.

## Sábháilteacht tras-seisiún — Sonrachais Claude Code

Tá na Rialacha Crua #19/#21/#22 (in `AGENTS.md`) ag rialú seisiúnain iomadúla. Meabhrúcháin oibríochtúla don stuáil seo:

- **Atáirg an toirmeasc ar `git stash` go heacnamhar i leigheann gach fo-ainmneoir a théann i dteagmháil le git** (Uirlis Agent / Scripteanna Sreaimh Oibre) — ná glanann fo-ainmneoirí an comhad seo, agus tháinig an seicheamh taifeadta den eachtra stash tríd an bhfo-ainmneoir.
- Roimh cumasc nó brú chuig aon PR nár chruthaigh tú i _seisiún seo_, rith `git worktree list` agus déan athsheiceáil ar `gh pr view <N> --json state,headRefOid` (Riala Crua #22b).
- Cruthaigh gach seisiún leis an seiceáil príomhach ar an ngeallaigh a thosaigh sé air.

## Cumhachtaí breise / gníomhairí pleanála — athrú cosáin

Tá an coinbhinsiún `_tasks/` sainmhínithe in `AGENTS.md` → "Gníomhairí Taighde & Pleanála". Tá na scileanna cumhachta breise ag teacht le leagan réamhshocraithe a dhíríonn ar `docs/…` — tá na leagananna réamhshocraithe seo **athraithe anseo**. Nuair a fhógraíonn scile cumhachta breise cosán cosúil le "sábháilte go `docs/superpowers/plans/…`", athscríobh é go dtí an leagan `_tasks/…` sula scríobhann tú:

| Gníomhaíocht (scile)                     | Réamhshocraithe (NÁ húsáid é) | Sábháil anseo ina ionad                                       |
| ---------------------------------------- | ----------------------------- | ------------------------------------------------------------- |
| Pleananna (`writing-plans`)              | `docs/superpowers/plans/`     | `_tasks/superpowers/plans/YYYY-MM-DD-<feature>.md`            |
| Sonraíochtaí / dearadh (`brainstorming`) | `docs/superpowers/specs/`     | `_tasks/superpowers/specs/YYYY-MM-DD-<topic>-design.md`       |
| Taighde (`deep-research`, ad-hoc)        | `docs/research/`              | `_tasks/research/…`                                           |
| Aistrithe (`/handoff`)                   | —                             | `_tasks/hands-off/<YYYY-MM-DD>_<branch>_v<versão>_sess-<id>/` |

Cuir na gníomhairí seo i bhfeidhm taobh istigh de stóras `_tasks/` (`git -C _tasks …`), ná cuir iad sa stóras phríomhach.

## Comhaid sealadacha /试点工作 — úsáid `_artifacts/`, ná úsáid `/tmp`

Athraíonn an tionscadal seo an leabhar sealadach réamhshocraithe den stuáil (`/tmp/claude-*/…`). Scríobh comhaid sealadacha/oibre — easpórtáil, zipanna ginte, aschur idirghabhála aon-uaire, aon rud eile a chuirfeá i `/tmp` — go `/home/diegosouzapw/dev/proxys/OmniRoute/_artifacts/` ina ionad.

- Is cosán root é `_artifacts/`: tá sé faoin amhrán cheana féin (`AGENTS.md` → "Root `_*` paths"), maireann sé ar an diosca amháin, gan riamh a rianú.
- Fáth: tá sé éasca don oibreoir comhaid sealadacha uile a aimsú agus a scriosadh in aon áit amháin má choinnítear iad laistigh den tionscadal (i gcomparáid le `/tmp`), seachas iad a lorg i bhfillteáin seisiún-bhunaithe sealadacha a dhúnann nó a bhailíonn comhaid gan rianú.
- **Ná** cuimhnigh é seo le `_tasks/` (Riala Crua #23, stóras príobháideach git ar leith do phleananna/sonraíochtaí/taighde/aistrithe marthanacha) — is do chomhaid oibre intuigthe amháin é `_artifacts/`, ní theastaíonn aon rud anseo a mhairfidh nó a bheidh leaganáilte.

## Bun-glann sula ndéantar PR oscailte

Roimh brainse a bhaint nó PR a oscailt, rith seiceáil an bhun-glann (`AGENTS.md` → Sreaimh Oibre → "Seiceáil bun-glann"; tagraíonn scileanna an tionscadail dó mar `.agents/skills/_shared/base-green.md`). Ní mór don PR a osclaítear nuair atá an bun-fhoireann dearg `⚠️ bun-dearg faighte: #<issue>` a iompar ina chorp. Chun stát dearg carnaithe a dhraenáil (bun-fhoireann + PRanna dearga), úsáid an scile `/sweep-reds`.
