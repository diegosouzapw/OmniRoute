# CLAUDE.md (Azərbaycan dili)

🌐 **Languages:** 🇺🇸 [English](../../../CLAUDE.md) · 🇪🇹 [am](../am/CLAUDE.md) · 🇸🇦 [ar](../ar/CLAUDE.md) · 🇧🇬 [bg](../bg/CLAUDE.md) · 🇧🇩 [bn](../bn/CLAUDE.md) · 🇧🇦 [bs](../bs/CLAUDE.md) · 🇨🇿 [cs](../cs/CLAUDE.md) · 🇩🇰 [da](../da/CLAUDE.md) · 🇩🇪 [de](../de/CLAUDE.md) · 🇬🇷 [el](../el/CLAUDE.md) · 🇪🇸 [es](../es/CLAUDE.md) · 🇪🇪 [et](../et/CLAUDE.md) · 🇮🇷 [fa](../fa/CLAUDE.md) · 🇫🇮 [fi](../fi/CLAUDE.md) · 🇫🇷 [fr](../fr/CLAUDE.md) · 🇮🇪 [ga](../ga/CLAUDE.md) · 🇮🇳 [gu](../gu/CLAUDE.md) · 🇳🇬 [ha](../ha/CLAUDE.md) · 🇮🇱 [he](../he/CLAUDE.md) · 🇮🇳 [hi](../hi/CLAUDE.md) · 🇭🇷 [hr](../hr/CLAUDE.md) · 🇭🇺 [hu](../hu/CLAUDE.md) · 🇦🇲 [hy](../hy/CLAUDE.md) · 🇮🇩 [id](../id/CLAUDE.md) · 🇳🇬 [ig](../ig/CLAUDE.md) · 🇮🇹 [it](../it/CLAUDE.md) · 🇯🇵 [ja](../ja/CLAUDE.md) · 🇬🇪 [ka](../ka/CLAUDE.md) · 🇰🇭 [km](../km/CLAUDE.md) · 🇮🇳 [kn](../kn/CLAUDE.md) · 🇰🇷 [ko](../ko/CLAUDE.md) · 🇱🇹 [lt](../lt/CLAUDE.md) · 🇱🇻 [lv](../lv/CLAUDE.md) · 🇮🇳 [ml](../ml/CLAUDE.md) · 🇮🇳 [mr](../mr/CLAUDE.md) · 🇲🇾 [ms](../ms/CLAUDE.md) · 🇲🇹 [mt](../mt/CLAUDE.md) · 🇲🇲 [my](../my/CLAUDE.md) · 🇳🇵 [ne](../ne/CLAUDE.md) · 🇳🇱 [nl](../nl/CLAUDE.md) · 🇳🇴 [no](../no/CLAUDE.md) · 🇮🇳 [or](../or/CLAUDE.md) · 🇮🇳 [pa](../pa/CLAUDE.md) · 🇵🇭 [phi](../phi/CLAUDE.md) · 🇵🇱 [pl](../pl/CLAUDE.md) · 🇵🇹 [pt](../pt/CLAUDE.md) · 🇧🇷 [pt-BR](../pt-BR/CLAUDE.md) · 🇷🇴 [ro](../ro/CLAUDE.md) · 🇷🇺 [ru](../ru/CLAUDE.md) · 🇱🇰 [si](../si/CLAUDE.md) · 🇸🇰 [sk](../sk/CLAUDE.md) · 🇸🇮 [sl](../sl/CLAUDE.md) · 🇷🇸 [sr](../sr/CLAUDE.md) · 🇸🇪 [sv](../sv/CLAUDE.md) · 🇰🇪 [sw](../sw/CLAUDE.md) · 🇮🇳 [ta](../ta/CLAUDE.md) · 🇮🇳 [te](../te/CLAUDE.md) · 🇹🇭 [th](../th/CLAUDE.md) · 🇹🇷 [tr](../tr/CLAUDE.md) · 🇺🇦 [uk-UA](../uk-UA/CLAUDE.md) · 🇵🇰 [ur](../ur/CLAUDE.md) · 🇺🇿 [uz](../uz/CLAUDE.md) · 🇻🇳 [vi](../vi/CLAUDE.md) · 🇳🇬 [yo](../yo/CLAUDE.md) · 🇨🇳 [zh-CN](../zh-CN/CLAUDE.md) · 🇹🇼 [zh-TW](../zh-TW/CLAUDE.md)

---

@AGENTS.md

**Bütün layihə qaydaları [`AGENTS.md`](AGENTS.md) faylında yerləşir** — hər bir AI köməkçisi üçün
vahid həqiqət mənbəyidir (arxitektura, konvensiyalar, testlər, keyfiyyət yoxlamaları, git iş axını,
23 Sərt Qayda, PII üzrə öyrənilənlər). Onu tam oxuyun; layihə qaydalarını burada yenidən əlavə
etməyin. Aşağıdakıların hamısı YALNIZ Claude Code üçün keçərlidir — bunlar `AGENTS.md` faylında
artıq müəyyən edilmiş qaydaların əməliyyat dəqiqləşdirmələridir.

## Worktree izolyasiyası — Claude Code xüsusiyyətləri

Məcburi worktree protokolunun tam təsviri (əsas branch-in təsdiqlənməsi, `.claude/worktrees/`
kanonik yolu, `cp -al` node_modules, təmizləmə qaydaları) `AGENTS.md` → Git Workflow → "Worktree
isolation" bölməsindədir. Claude Code-a xas məqamlar:

- Əgər operator əsas branch-i artıq bildirməyibsə, onu `AskUserQuestion` vasitəsilə təsdiqləyin
  (Sərt Qayda #19).
- Daxili `EnterWorktree` alətinə üstünlük verin — o, worktree-ləri artıq `.claude/worktrees/`
  (kanonik yol) altında yaradır. Worktree-ni sənədləşdirilmiş `git worktree add` əmri ilə yaradın,
  sonra `path` dəyəri ilə `EnterWorktree` çağırın.

## Sessiyalararası təhlükəsizlik — Claude Code xüsusiyyətləri

Sərt Qaydalar #19/#21/#22 (`AGENTS.md` faylında) paralel sessiyaları tənzimləyir. Bu icra mühiti
üçün əməliyyat xatırlatmaları:

- **Git-ə toxunan hər bir alt agentin sorğusunda `git stash` qadağasını sözbəsöz təkrarlayın**
  (Agent aləti / Workflow skriptləri) — alt agentlər bu faylı miras almır və stash insidentinin
  qeydə alınmış təkrarı alt agent vasitəsilə baş verib.
- _Bu sessiyada_ yaratmadığınız hər hansı PR-a merge və ya push etməzdən əvvəl `git worktree list`
  icra edin və `gh pr view <N> --json state,headRefOid` ilə yenidən yoxlayın (Sərt Qayda #22b).
- Hər sessiyanı əsas checkout-u başladığı branch-də saxlayaraq bitirin.

## Superpowers / planlaşdırma artefaktları — yol əvəzləmələri

`_tasks/` konvensiyası `AGENTS.md` → "Planning & Research Artifacts" bölməsində müəyyən edilib.
Superpowers bacarıqları `docs/…` istiqamətini göstərən standart yollarla gəlir — həmin standartlar
**burada əvəzlənir**. Superpowers bacarığı "saved to `docs/superpowers/plans/…`" kimi bir yol elan
etdikdə, yazmazdan əvvəl onu `_tasks/…` ekvivalenti ilə əvəz edin:

| Artefakt (bacarıq)                          | Standart (istifadə ETMƏYİN) | Bunun əvəzinə burada saxlayın                                 |
| ------------------------------------------- | --------------------------- | ------------------------------------------------------------- |
| Planlar (`writing-plans`)                   | `docs/superpowers/plans/`   | `_tasks/superpowers/plans/YYYY-MM-DD-<feature>.md`            |
| Spesifikasiyalar / dizayn (`brainstorming`) | `docs/superpowers/specs/`   | `_tasks/superpowers/specs/YYYY-MM-DD-<topic>-design.md`       |
| Araşdırma (`deep-research`, ad-hoc)         | `docs/research/`            | `_tasks/research/…`                                           |
| Təhvil-təslimlər (`/handoff`)               | —                           | `_tasks/hands-off/<YYYY-MM-DD>_<branch>_v<versão>_sess-<id>/` |

Həmin artefaktları əsas repoda deyil, `_tasks/` reposunda commit edin (`git -C _tasks …`).

## Qaralama / müvəqqəti fayllar — `/tmp` deyil, `_artifacts/` istifadə edin

Bu layihə icra mühitinin standart sessiya qaralama sahəsini (`/tmp/claude-*/…`) əvəzləyir.
Müvəqqəti/işçi faylları — ixraclar, yaradılmış zip faylları, birdəfəlik aralıq nəticələr və
normalda `/tmp` daxilində saxlayacağınız hər şeyi — bunun əvəzinə
`/home/diegosouzapw/dev/proxys/OmniRoute/_artifacts/` daxilində saxlayın.

- `_artifacts/` kök səviyyəli `_*` yoludur: artıq gitignore-a əlavə olunub (`AGENTS.md` → "Root
  `_*` paths"), yalnız diskdə saxlanılır və heç vaxt izlənmir.
- Səbəb: qaralama nəticələrini layihənin daxilində (`/tmp` əvəzinə) saxlamaq operatorun bütün
  müvəqqəti faylları bir yerdə asanlıqla tapıb silməsinə imkan verir; beləliklə yoxa çıxan və ya
  izlənilməyən fayllarla dolan, müvəqqəti sessiyaya xas `/tmp` qovluqlarında axtarış aparmağa
  ehtiyac qalmır.
- Bunu `_tasks/` ilə qarışdırmayın (Sərt Qayda #23, davamlı
  planlar/spesifikasiyalar/araşdırmalar/təhvil-təslimlər üçün ayrıca şəxsi git reposu) —
  `_artifacts/` yalnız birdəfəlik işçi fayllar üçündür; buradakı heç nəyin qorunmasına və ya
  versiyalaşdırılmasına ehtiyac yoxdur.

## PR-ları açmazdan əvvəl base-green yoxlaması

Branch yaratmazdan və ya PR açmazdan əvvəl base-green yoxlamasını icra edin (`AGENTS.md` → Git
Workflow → "Base-green check"; layihə bacarıqları ona `.agents/skills/_shared/base-green.md` kimi
istinad edir). Base tip qırmızı vəziyyətdə olarkən açılmış PR-ın mətnində `⚠️ base-red inherited:
#<issue>` olmalıdır. Toplanmış qırmızı vəziyyəti (base tip + qırmızı PR-lar) aradan qaldırmaq üçün
`/sweep-reds` bacarığından istifadə edin.
