# Self-Hosted Runner Box Operations (.113 pool) (Polski)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/RUNNER_BOX.md) · 🇪🇹 [am](../../../am/docs/ops/RUNNER_BOX.md) · 🇸🇦 [ar](../../../ar/docs/ops/RUNNER_BOX.md) · 🇦🇿 [az](../../../az/docs/ops/RUNNER_BOX.md) · 🇧🇬 [bg](../../../bg/docs/ops/RUNNER_BOX.md) · 🇧🇩 [bn](../../../bn/docs/ops/RUNNER_BOX.md) · 🇧🇦 [bs](../../../bs/docs/ops/RUNNER_BOX.md) · 🇨🇿 [cs](../../../cs/docs/ops/RUNNER_BOX.md) · 🇩🇰 [da](../../../da/docs/ops/RUNNER_BOX.md) · 🇩🇪 [de](../../../de/docs/ops/RUNNER_BOX.md) · 🇬🇷 [el](../../../el/docs/ops/RUNNER_BOX.md) · 🇪🇸 [es](../../../es/docs/ops/RUNNER_BOX.md) · 🇪🇪 [et](../../../et/docs/ops/RUNNER_BOX.md) · 🇮🇷 [fa](../../../fa/docs/ops/RUNNER_BOX.md) · 🇫🇮 [fi](../../../fi/docs/ops/RUNNER_BOX.md) · 🇫🇷 [fr](../../../fr/docs/ops/RUNNER_BOX.md) · 🇮🇪 [ga](../../../ga/docs/ops/RUNNER_BOX.md) · 🇮🇳 [gu](../../../gu/docs/ops/RUNNER_BOX.md) · 🇳🇬 [ha](../../../ha/docs/ops/RUNNER_BOX.md) · 🇮🇱 [he](../../../he/docs/ops/RUNNER_BOX.md) · 🇮🇳 [hi](../../../hi/docs/ops/RUNNER_BOX.md) · 🇭🇷 [hr](../../../hr/docs/ops/RUNNER_BOX.md) · 🇭🇺 [hu](../../../hu/docs/ops/RUNNER_BOX.md) · 🇦🇲 [hy](../../../hy/docs/ops/RUNNER_BOX.md) · 🇮🇩 [id](../../../id/docs/ops/RUNNER_BOX.md) · 🇳🇬 [ig](../../../ig/docs/ops/RUNNER_BOX.md) · 🇮🇹 [it](../../../it/docs/ops/RUNNER_BOX.md) · 🇯🇵 [ja](../../../ja/docs/ops/RUNNER_BOX.md) · 🇬🇪 [ka](../../../ka/docs/ops/RUNNER_BOX.md) · 🇰🇭 [km](../../../km/docs/ops/RUNNER_BOX.md) · 🇮🇳 [kn](../../../kn/docs/ops/RUNNER_BOX.md) · 🇰🇷 [ko](../../../ko/docs/ops/RUNNER_BOX.md) · 🇱🇹 [lt](../../../lt/docs/ops/RUNNER_BOX.md) · 🇱🇻 [lv](../../../lv/docs/ops/RUNNER_BOX.md) · 🇮🇳 [ml](../../../ml/docs/ops/RUNNER_BOX.md) · 🇮🇳 [mr](../../../mr/docs/ops/RUNNER_BOX.md) · 🇲🇾 [ms](../../../ms/docs/ops/RUNNER_BOX.md) · 🇲🇹 [mt](../../../mt/docs/ops/RUNNER_BOX.md) · 🇲🇲 [my](../../../my/docs/ops/RUNNER_BOX.md) · 🇳🇵 [ne](../../../ne/docs/ops/RUNNER_BOX.md) · 🇳🇱 [nl](../../../nl/docs/ops/RUNNER_BOX.md) · 🇳🇴 [no](../../../no/docs/ops/RUNNER_BOX.md) · 🇮🇳 [or](../../../or/docs/ops/RUNNER_BOX.md) · 🇮🇳 [pa](../../../pa/docs/ops/RUNNER_BOX.md) · 🇵🇭 [phi](../../../phi/docs/ops/RUNNER_BOX.md) · 🇵🇹 [pt](../../../pt/docs/ops/RUNNER_BOX.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/RUNNER_BOX.md) · 🇷🇴 [ro](../../../ro/docs/ops/RUNNER_BOX.md) · 🇷🇺 [ru](../../../ru/docs/ops/RUNNER_BOX.md) · 🇱🇰 [si](../../../si/docs/ops/RUNNER_BOX.md) · 🇸🇰 [sk](../../../sk/docs/ops/RUNNER_BOX.md) · 🇸🇮 [sl](../../../sl/docs/ops/RUNNER_BOX.md) · 🇷🇸 [sr](../../../sr/docs/ops/RUNNER_BOX.md) · 🇸🇪 [sv](../../../sv/docs/ops/RUNNER_BOX.md) · 🇰🇪 [sw](../../../sw/docs/ops/RUNNER_BOX.md) · 🇮🇳 [ta](../../../ta/docs/ops/RUNNER_BOX.md) · 🇮🇳 [te](../../../te/docs/ops/RUNNER_BOX.md) · 🇹🇭 [th](../../../th/docs/ops/RUNNER_BOX.md) · 🇹🇷 [tr](../../../tr/docs/ops/RUNNER_BOX.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/RUNNER_BOX.md) · 🇵🇰 [ur](../../../ur/docs/ops/RUNNER_BOX.md) · 🇺🇿 [uz](../../../uz/docs/ops/RUNNER_BOX.md) · 🇻🇳 [vi](../../../vi/docs/ops/RUNNER_BOX.md) · 🇳🇬 [yo](../../../yo/docs/ops/RUNNER_BOX.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/RUNNER_BOX.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/RUNNER_BOX.md)

---

Pula self-hostowana (`self-hosted, omni-release` na wszystkich ośmiu runnerach; `omni-build` na dwóch) działa na maszynie **.113**.
Pomiary z 2026-08-28 (analiza po incydencie v3.8.50, część III):

| zasób     | wartość                                                                                                          | znaczenie dla planowania                                                                                                                                                          |
| --------- | ---------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| RAM / CPU | **31 GB / 32 rdzenie** (było 16 GB, gdy ten dokument powstał po raz pierwszy)                                    | jeden `next-build` osiąga szczytowe zużycie **~14 GB** → 2 równoczesne ciężkie buildy nasycają maszynę, 3 ją przeciążają (2026-08-28 06:42Z: obciążenie 56, utracono dwa zadania) |
| swap      | 15 GB                                                                                                            | przetrwała publikację v3.8.50 dzięki intensywnemu użyciu swapu; presję widać w `/proc/pressure/memory`                                                                            |
| `/tmp`    | **12 GB tmpfs = RAM**                                                                                            | wszystko, co jest tam przechowywane, zajmuje pamięć; pozostałości są usuwane po 3 godz.                                                                                           |
| dysk      | 188 GB                                                                                                           | checkouty `_work` z 8 runnerów osiągają ~70 GB bez żadnego limitu                                                                                                                 |
| runnery   | **6 listenerów**: 4 OmniRoute (1 `omni-build` + 1 tylko `omni-release` + 2 `omni-light`) + OmniHeuris + OmniMind | wszystkie współdzielą powyższą pamięć; `omniroute-113-3/-4/-7/-8` są wyłączone (`systemctl enable --now` ponownie uruchamia jeden z nich)                                         |

## Instalacja janitora (jednorazowo, na maszynie)

```bash
scp scripts/ops/runner-janitor.sh root@192.168.0.113:/opt/omniroute-ops/runner-janitor.sh
ssh root@192.168.0.113 'chmod +x /opt/omniroute-ops/runner-janitor.sh; apt-get install -y lsof'
# cron (root): co 30 min, logowanie do /var/log/runner-janitor.log
*/30 * * * * MAX_ACTIVE_RUNNERS=6 /opt/omniroute-ops/runner-janitor.sh >> /var/log/runner-janitor.log 2>&1
```

`lsof` jest wymagany: przed usunięciem ścieżki janitor potwierdza, że jest ona
nieużywana, na podstawie pojedynczej migawki otwartych plików; bez tego narzędzia
niczego nie usuwa i informuje o tym (kod wyjścia 1). Każdą zmianę należy najpierw
wypróbować z opcją `--dry-run` — skrypt dokładnie wypisze, co by zrobił, i niczego
nie zmieni.

Co robi przy każdym uruchomieniu: usuwa nasze pozostałości (`runner-*`,
`omniroute-*`, `next-build*`, `e2e-build.tar.gz`) po **3 godz. w tmpfs** oraz po
24 godz. w katalogu dyskowym `_work/_temp`; kończy proces `next-build` starszy
niż 75 min (żadne zadanie nie trwa tak długo — 2026-08-27 jeden proces działał
przez 70 min po tym, jak GitHub uznał jego zadanie za utracone); usuwa checkouty
starsze niż 48 godz. dla runnerów, których jednostka jest **zatrzymana**; alarmuje
przy wykorzystaniu dysku ≥ 85%, wartości PSI pamięci `full/avg60` ≥ 10% oraz
liczbie listenerów większej niż `MAX_ACTIVE_RUNNERS` (z podziałem na
omniroute/inne). Kod wyjścia 1 = wymagana interwencja; sprawdź log.

## Jednostki runnera: KillMode

Domyślne ustawienie runnera `KillMode=process` pozostawia procesy `Runner.Worker → npm → next-build`
przy życiu po zatrzymaniu lub ponownym uruchomieniu jednostki — osierocony build nadal zużywa RAM i
CPU, mimo że nie jest już powiązany z żadnym zadaniem. Każda jednostka OmniRoute ma plik drop-in
(`/etc/systemd/system/actions.runner.diegosouzapw-OmniRoute.<name>.service.d/10-killmode.conf`)
z `KillMode=mixed`: najpierw SIGTERM do listenera, a przy
`TimeoutStop` SIGKILL do całej grupy cgroup. Ustawienie zaczyna obowiązywać przy następnym ponownym uruchomieniu jednostki — uruchamiaj ponownie **tylko jednego runnera naraz
i wyłącznie wtedy, gdy jest bezczynny**, wykonując sprawdzenie bezczynności i ponowne uruchomienie w tym samym poleceniu.

## Zasady operacyjne

- **Limit ciężkich buildów: JEDEN naraz — wymuszany przez etykietę (od 2026-08-29).** Każde zadanie
  wykonujące pełne `next build` jest kierowane do `[self-hosted, omni-build]`, a tylko
  **`omniroute-113-5`** ma tę etykietę (dodaną przez API runnerów — bez
  ponownej rejestracji): `ci.yml` `Build`, `npm-publish.yml` `publish`, obie
  walidacje `nightly-release-green` oraz **amd64** w `docker-publish.yml` (hostowany runner
  z 7 GB zakończył się błędem ResourceExhausted dla tego drzewa — #11976). Etap Docker arm64 pozostaje na
  `ubuntu-24.04-arm` (brak maszyny ARM) i używa webpacka. Docker amd64 również używa webpacka:
  Turbopack dla tego drzewa spanikował wewnątrz BuildKit (`TurbopackInternalError:
there must be a path to a root`, uruchomienie 33253576569), nawet przy 31 GB; build
  tego samego drzewa dla arm64 przy użyciu webpacka na hostowanym ARM zakończył się powodzeniem. `docker-publish` dla amd64
  współdzieli grupę współbieżności `heavy-build-main` z `Build` w `ci.yml`
  (`cancel-in-progress: false`), więc czeka w kolejce na jedyny slot. Docker Engine
  musi znajdować się na `omniroute-113-5` (`docker info` jest pierwszym krokiem zadania publikacji).
  Poprzedni limit wynosił dwa i był błędny dla 31 GB: dnia
  2026-08-29 o 17:26 UTC dwa równoczesne procesy `next-build` (15,4 GB + 17,2 GB RSS) zmniejszyły ilość
  wolnej pamięci na maszynie do 5 GB przy wykorzystanych 4 GB swapu, a mechanizm OOM kernela zabił jeden z nich — systemd
  przypisał to zakończenie do jednostki _drugiego_ runnera, `runsvc.sh` wysłał SIGKILL do tego listenera, a
  wykonywane przez niego zadanie zakończyło się komunikatem „The runner has received a shutdown signal” (tym samym tekstem co przy
  OOM hostowanego runnera). `omniroute-113-6` zachowuje tylko `omni-release`. Ciężkie buildy pochodzące
  ze scaleń do `main`, PR-ów i zadań nocnych są teraz wykonywane szeregowo w jednym slocie; kolejka jest tego ceną.
  Drugi slot wróci, gdy maszyna wirtualna Proxmox otrzyma więcej RAM-u (48–64 GB):
  `gh api -X POST repos/<repo>/actions/runners/<id of omniroute-113-6>/labels -f 'labels[]=omni-build'`.
- **Pula lekkich zadań: `omni-light` (2026-08-29, #11965).** `omniroute-113` i `omniroute-113-2` mają
  etykietę `omni-light` dla zadań wymagających tylko backendowego `next build` (~5–6 GB), ale nie pełnego buildu:
  nocnych zadań Schemathesis, promptfoo, garak i axe-a11y. Działały one na hostowanym runnerze z 7 GB i
  zakończyły się awarią na `release/v3.8.51`, gdy nikt ich nie monitorował. Najgorszy przypadek na tej maszynie to 2 ciężkie + 2 lekkie ≈
  30 + 12 GB — powyżej 31 GB RAM-u, ale w granicach 16 GB swapu; właściwym rozwiązaniem zapewniającym zapas jest więcej RAM-u
  w maszynie wirtualnej Proxmox (`tomni-proxmox-113`), co zmieni limity wynikające z etykiet na 3 ciężkie + 2 lekkie.
- **Celowo mniej listenerów.** Cztery jednostki OmniRoute zostały wyłączone 2026-08-29 — ponieważ z maszyny korzystają tylko
  `Build` w `ci.yml` i zadania nocne, 8 listenerów pozostawało bezczynnych, a każdy dodatkowy może być potencjalnym
  tenantem zużywającym 14 GB. Limit janitora wynosi 6 (`MAX_ACTIVE_RUNNERS=6` w cron): zlicza on
  każdy proces `Runner.Listener` na maszynie, a OmniHeuris i OmniMind dodają dwa do naszych czterech.
- **Nigdy nie czyść ręcznie `/tmp` ani `_work`, gdy którykolwiek runner jest zajęty.**
  Sprawdzenie, a następnie usunięcie z przerwą między tymi operacjami spowodowało, że aktywne zadanie Build utraciło swój katalog
  `_work` 2026-08-27. Janitor wykonuje sprawdzenie i usunięcie w jednym kroku;
  pozostaw to jemu.
- Zatrzymanie runnera w trakcie zadania anuluje zadanie (zaobserwowano na żywo): używaj `systemctl stop` wyłącznie
  wtedy, gdy jego listener nie ma procesu potomnego `Runner.Worker` — i wykonuj to w jednym poleceniu.
- Workflow nie mogą przechowywać artefaktów w `/tmp` (znajduje się on w RAM-ie). Pobieraj je do
  `$RUNNER_TEMP` (na dysku, osobno dla każdego runnera) — zapisanie artefaktu `next-build` o wielkości 1,3 GB
  w tmpfs zajęło 27–32 minuty, a przesłanie go z dysku zajęło 2 minuty.
- VPS `.15` służy wyłącznie do homologacji — nigdy nie uruchamia runnerów CI.
