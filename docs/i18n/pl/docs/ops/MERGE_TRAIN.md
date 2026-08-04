---
title: Kolejka merge i ręczny merge-train — runbook
---

# Kolejka merge i ręczny merge-train — runbook

Od v3.8.49 (WS3.2/WS3.4 planu quality/velocity) domyślną ścieżką merge dla
zrecenzowanych PR do `release/vX.Y.Z` jest **kolejka merge Mergify** (`.mergify.yml`);
**ręczny merge-train** opisany poniżej to FALLBACK — używany podczas incydentów,
zamrożeń release albo gdy plan Mergify Open Source kiedykolwiek się zmieni.

## Domyślna ścieżka: kolejka Mergify

1. PR jest zrecenzowany/zielony przez campaigny i zatwierdzony bramką ⭐ pre-merge
   właściciela (raport + decyzja per pozycja — zob. `/merge-prs` Krok 0.75).
2. Właściciel (lub sesja działająca na decyzji właściciela) nakłada etykietę **`queue`**.
   Etykieta JEST zatwierdzeniem merge; Mergify tylko je wykonuje.
3. Mergify grupuje do 10 PR w kolejce, waliduje batch względem fast-gates
   i merguje (squash). Czerwony batch jest **automatycznie bisectowany** — winny PR
   jest izolowany w ~log2(N) rewalidacjach i usuwany z kolejki; reszta idzie dalej.
4. Po merge ciągły workflow release-green waliduje nowy tip na push
   i otwiera issue atrybucji, jeśli kombinacja się regresowała (nigdy auto-revert).

Guardrails (odzwierciedlenie Hard Rules #21/#22 z `CLAUDE.md`):

- **Otwarte zamrożenie release** → NIE nakładaj etykiet na PR celujące w zamrożoną gałąź; najpierw
  zmień target na aktywne `release/vX+1`.
- **PR in-flight innej sesji** → nigdy go nie etykietuj; tylko sesja-właściciel kolejkuje
  własną pracę.
- Diffy tylko-testowe i PR z etykietą `hotfix` już uruchamiają zredukowane CI (zob.
  `RELEASE_CHECKLIST.md` → Hotfix Fast-Lane); warunki kolejki akceptują dowolny
  zestaw checków, który faktycznie się uruchomił (`#check-failure=0` + `#check-pending=0`).

## Fallback: ręczny merge-train

Używany, gdy kolejka jest niedostępna. Kodyfikuje praktykę, którą maintainerzy stosowali
przed Mergify: jeden lokalny worktree, sekwencyjne cherry-picki, jeden push.

```bash
# 1. Świeży worktree na tipie release
git fetch origin
git worktree add /tmp/omni-merge-train origin/release/vX.Y.Z
cd /tmp/omni-merge-train

# 2. Dla każdego zatwierdzonego PR (w kolejności zależności / starsze najpierw):
gh pr checkout <N>                  # pobiera head PR
git checkout release/vX.Y.Z
git cherry-pick <pr-head-sha>       # lub zakres, jeśli PR ma wiele commitów
# rozwiąż konflikty lokalnie; NIE force-push do gałęzi PR

# 3. Jeden push na końcu
git push origin HEAD:release/vX.Y.Z

# 4. Posprzątaj
cd -
git worktree remove /tmp/omni-merge-train
```

Reguły bezpieczeństwa (bez zmian względem kolejki):

- Nigdy nie force-pushuj do `release/*` ani `main`.
- Nigdy nie merguj PR innej sesji bez jej zgody (Hard Rule #22).
- Podczas zamrożenia release wstrzymaj train i przekieruj nowe PR na następną linię
  release (Hard Rule #21).
- Po puszhu obserwuj workflow continuous-release-green; otwórz issue atrybucji przy
  regresie zamiast ślepego revertu.

## Kiedy wracać z fallbacku do kolejki

Gdy Mergify znów działa (status strony OK, reguły w `.mergify.yml` przechodzą dry-run
`mergify validate`), zdejmij wszelkie tymczasowe obejścia i wróć do ścieżki z etykietą
`queue`. Ręczny train to narzędzie awaryjne, nie równoległy tor.
