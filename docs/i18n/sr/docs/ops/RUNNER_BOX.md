# Self-Hosted Runner Box Operations (.113 pool) (Српски)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/RUNNER_BOX.md) · 🇪🇹 [am](../../../am/docs/ops/RUNNER_BOX.md) · 🇸🇦 [ar](../../../ar/docs/ops/RUNNER_BOX.md) · 🇦🇿 [az](../../../az/docs/ops/RUNNER_BOX.md) · 🇧🇬 [bg](../../../bg/docs/ops/RUNNER_BOX.md) · 🇧🇩 [bn](../../../bn/docs/ops/RUNNER_BOX.md) · 🇨🇿 [cs](../../../cs/docs/ops/RUNNER_BOX.md) · 🇩🇰 [da](../../../da/docs/ops/RUNNER_BOX.md) · 🇩🇪 [de](../../../de/docs/ops/RUNNER_BOX.md) · 🇬🇷 [el](../../../el/docs/ops/RUNNER_BOX.md) · 🇪🇸 [es](../../../es/docs/ops/RUNNER_BOX.md) · 🇪🇪 [et](../../../et/docs/ops/RUNNER_BOX.md) · 🇮🇷 [fa](../../../fa/docs/ops/RUNNER_BOX.md) · 🇫🇮 [fi](../../../fi/docs/ops/RUNNER_BOX.md) · 🇫🇷 [fr](../../../fr/docs/ops/RUNNER_BOX.md) · 🇮🇪 [ga](../../../ga/docs/ops/RUNNER_BOX.md) · 🇮🇳 [gu](../../../gu/docs/ops/RUNNER_BOX.md) · 🇳🇬 [ha](../../../ha/docs/ops/RUNNER_BOX.md) · 🇮🇱 [he](../../../he/docs/ops/RUNNER_BOX.md) · 🇮🇳 [hi](../../../hi/docs/ops/RUNNER_BOX.md) · 🇭🇷 [hr](../../../hr/docs/ops/RUNNER_BOX.md) · 🇭🇺 [hu](../../../hu/docs/ops/RUNNER_BOX.md) · 🇦🇲 [hy](../../../hy/docs/ops/RUNNER_BOX.md) · 🇮🇩 [id](../../../id/docs/ops/RUNNER_BOX.md) · 🇳🇬 [ig](../../../ig/docs/ops/RUNNER_BOX.md) · 🇮🇹 [it](../../../it/docs/ops/RUNNER_BOX.md) · 🇯🇵 [ja](../../../ja/docs/ops/RUNNER_BOX.md) · 🇬🇪 [ka](../../../ka/docs/ops/RUNNER_BOX.md) · 🇰🇭 [km](../../../km/docs/ops/RUNNER_BOX.md) · 🇮🇳 [kn](../../../kn/docs/ops/RUNNER_BOX.md) · 🇰🇷 [ko](../../../ko/docs/ops/RUNNER_BOX.md) · 🇱🇹 [lt](../../../lt/docs/ops/RUNNER_BOX.md) · 🇱🇻 [lv](../../../lv/docs/ops/RUNNER_BOX.md) · 🇮🇳 [ml](../../../ml/docs/ops/RUNNER_BOX.md) · 🇮🇳 [mr](../../../mr/docs/ops/RUNNER_BOX.md) · 🇲🇾 [ms](../../../ms/docs/ops/RUNNER_BOX.md) · 🇲🇹 [mt](../../../mt/docs/ops/RUNNER_BOX.md) · 🇲🇲 [my](../../../my/docs/ops/RUNNER_BOX.md) · 🇳🇵 [ne](../../../ne/docs/ops/RUNNER_BOX.md) · 🇳🇱 [nl](../../../nl/docs/ops/RUNNER_BOX.md) · 🇳🇴 [no](../../../no/docs/ops/RUNNER_BOX.md) · 🇮🇳 [or](../../../or/docs/ops/RUNNER_BOX.md) · 🇮🇳 [pa](../../../pa/docs/ops/RUNNER_BOX.md) · 🇵🇭 [phi](../../../phi/docs/ops/RUNNER_BOX.md) · 🇵🇱 [pl](../../../pl/docs/ops/RUNNER_BOX.md) · 🇵🇹 [pt](../../../pt/docs/ops/RUNNER_BOX.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/RUNNER_BOX.md) · 🇷🇴 [ro](../../../ro/docs/ops/RUNNER_BOX.md) · 🇷🇺 [ru](../../../ru/docs/ops/RUNNER_BOX.md) · 🇱🇰 [si](../../../si/docs/ops/RUNNER_BOX.md) · 🇸🇰 [sk](../../../sk/docs/ops/RUNNER_BOX.md) · 🇸🇮 [sl](../../../sl/docs/ops/RUNNER_BOX.md) · 🇸🇪 [sv](../../../sv/docs/ops/RUNNER_BOX.md) · 🇰🇪 [sw](../../../sw/docs/ops/RUNNER_BOX.md) · 🇮🇳 [ta](../../../ta/docs/ops/RUNNER_BOX.md) · 🇮🇳 [te](../../../te/docs/ops/RUNNER_BOX.md) · 🇹🇭 [th](../../../th/docs/ops/RUNNER_BOX.md) · 🇹🇷 [tr](../../../tr/docs/ops/RUNNER_BOX.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/RUNNER_BOX.md) · 🇵🇰 [ur](../../../ur/docs/ops/RUNNER_BOX.md) · 🇺🇿 [uz](../../../uz/docs/ops/RUNNER_BOX.md) · 🇻🇳 [vi](../../../vi/docs/ops/RUNNER_BOX.md) · 🇳🇬 [yo](../../../yo/docs/ops/RUNNER_BOX.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/RUNNER_BOX.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/RUNNER_BOX.md)

---

Самостални скуп (`self-hosted, omni-release` на свих осам извршилаца; `omni-build` на два) ради на серверу **.113**.
Измерено 2026-08-28 (постмортем за v3.8.50, део III):

| ресурс    | вредност                                                                                                          | значај за распоређивање                                                                                                                                               |
| --------- | ----------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| RAM / CPU | **31 GB / 32 језгра** (било је 16 GB када је овај документ први пут написан)                                      | један `next-build` достиже **~14 GB** → 2 истовремена захтевна процеса израде засићују сервер, а 3 га обарају (2026-08-28 06:42Z: оптерећење 56, два посла изгубљена) |
| swap      | 15 GB                                                                                                             | захваљујући swap-у успео је да заврши објављивање v3.8.50; притисак је видљив у `/proc/pressure/memory`                                                               |
| `/tmp`    | **12 GB tmpfs = RAM**                                                                                             | све што се тамо остави заузима меморију; заостаци се чисте после 3 h                                                                                                  |
| диск      | 188 GB                                                                                                            | `_work` радне копије 8 извршилаца достижу ~70 GB без ограничења                                                                                                       |
| извршиоци | **6 слушалаца**: 4 OmniRoute (1 `omni-build` + 1 само за `omni-release` + 2 `omni-light`) + OmniHeuris + OmniMind | сви деле горенаведену меморију; `omniroute-113-3/-4/-7/-8` су онемогућени (`systemctl enable --now` поново покреће један)                                             |

## Инсталирање чистача (једнократно, на серверу)

```bash
scp scripts/ops/runner-janitor.sh root@192.168.0.113:/opt/omniroute-ops/runner-janitor.sh
ssh root@192.168.0.113 'chmod +x /opt/omniroute-ops/runner-janitor.sh; apt-get install -y lsof'
# cron (root): сваких 30 минута, евиденција у /var/log/runner-janitor.log
*/30 * * * * MAX_ACTIVE_RUNNERS=6 /opt/omniroute-ops/runner-janitor.sh >> /var/log/runner-janitor.log 2>&1
```

`lsof` је обавезан: чистач једним снимком отворених датотека потврђује да је путања
неактивна пре него што је уклони, а без тог алата не уклања ништа и то пријављује
(излазни код 1). Сваку измену прво испробајте помоћу `--dry-run` — тачно исписује шта би
урадила и не мења ништа.

Шта ради при сваком покретању: чисти наше заостатке (`runner-*`, `omniroute-*`,
`next-build*`, `e2e-build.tar.gz`) после **3 h на tmpfs-у** и после 24 h на диску у
`_work/_temp`; прекида `next-build` старији од 75 min (ниједан посао не траје толико — 2026-08-27
један је радио 70 min након што је GitHub прогласио његов посао изгубљеним); уклања радне
копије старије од 48 h за извршиоце чија је јединица **заустављена**; упозорава када је
искоришћеност диска ≥ 85 %, меморијски PSI `full/avg60` ≥ 10 % и када има више слушалаца
него што задаје `MAX_ACTIVE_RUNNERS` (са поделом на omniroute/остале). Излазни код 1 =
потребна је пажња; прочитајте евиденцију.

## Јединице извршилаца: KillMode

Подразумевани `KillMode=process` извршиоца оставља `Runner.Worker → npm → next-build`
активним када се јединица заустави или поново покрене — напуштена изградња наставља да троши RAM и
CPU, а да није повезана ни са једним задатком. Свака OmniRoute јединица има додатну конфигурацију
(`/etc/systemd/system/actions.runner.diegosouzapw-OmniRoute.<name>.service.d/10-killmode.conf`)
са `KillMode=mixed`: најпре SIGTERM процесу који ослушкује, а затим SIGKILL целој cgroup групи по истеку
`TimeoutStop`. Ступа на снагу при следећем поновном покретању јединице — поново покрећите **по један извршилац,
и то само када је неактиван**, при чему провера неактивности и поновно покретање морају бити у истој команди.

## Правила рада

- **Ограничење за захтевне изградње: ЈЕДНА истовремено — спроводи се ознаком (од 2026-08-29).** Сваки задатак
  који покреће пун `next build` циља `[self-hosted, omni-build]`, а само
  **`omniroute-113-5`** има ту ознаку (додату преко API-ја за извршиоце — без
  поновне регистрације): `ci.yml` `Build`, `npm-publish.yml` `publish`, обе
  `nightly-release-green` валидације и **amd64** у `docker-publish.yml` (хостовани
  извршилац са 7 GB добио је ResourceExhausted на овом стаблу — #11976). Docker грана за arm64 остаје на
  `ubuntu-24.04-arm` (нема ARM машине) са webpack-ом. Docker amd64 такође користи webpack:
  Turbopack се на овом стаблу срушио унутар BuildKit-а (`TurbopackInternalError:
there must be a path to a root`, покретање 33253576569), чак и са 31 GB; webpack изградња истог
  стабла за arm64 на хостованом ARM-у била је успешна. amd64 у `docker-publish` дели
  concurrency групу `heavy-build-main` са `Build` задатком из `ci.yml`
  (`cancel-in-progress: false`), па чека у реду за једино место. Docker Engine
  мора бити на `omniroute-113-5` (`docker info` је први корак задатка објављивања).
  Претходно ограничење је било два и показало се погрешним за 31 GB: дана
  2026-08-29 у 17:26 UTC, два истовремена `next-build` процеса (15.4 GB + 17.2 GB RSS) спустила су слободну
  меморију машине на 5 GB, уз 4 GB коришћеног swap-а, па је kernel преко OOM-а прекинуо један од њих — systemd
  је евидентирао прекид у јединици _другог_ извршиоца, `runsvc.sh` је послао SIGKILL том процесу за ослушкивање, а
  задатак на њему је прекинут поруком „The runner has received a shutdown signal“ (исти текст као код
  OOM-а хостованог извршиоца). `omniroute-113-6` задржава само `omni-release`. Захтевне изградње из
  спајања у `main`, PR-ова и ноћног покретања сада се извршавају редом на једном месту; чекање у реду је цена тога.
  Друго место се враћа оног дана када Proxmox VM добије више RAM-а (48–64 GB):
  `gh api -X POST repos/<repo>/actions/runners/<id of omniroute-113-6>/labels -f 'labels[]=omni-build'`.
- **Лаки скуп: `omni-light` (2026-08-29, #11965).** `omniroute-113` и `omniroute-113-2` имају
  `omni-light` за задатке којима је потребан само backend `next build` (~5–6 GB), али не и пун: ноћне
  Schemathesis, promptfoo, garak и axe-a11y задатке. Извршавали су се на хостованом извршиоцу са 7 GB и
  прекинули су се на `release/v3.8.51`, а да то нико није пратио. Најгори случај на машини је 2 захтевна + 2 лака ≈
  30 + 12 GB — више од 31 GB RAM-а, али унутар 16 GB swap-а; право решење за резервни капацитет је више RAM-а
  на Proxmox VM-у (`tomni-proxmox-113`), чиме ограничења ознака постају 3 захтевна + 2 лака.
- **Намерно мање процеса за ослушкивање.** Четири OmniRoute јединице су онемогућене 2026-08-29 — пошто само
  `Build` из `ci.yml` и ноћни задаци користе машину, 8 процеса за ослушкивање било је неактивно, а сваки додатни је
  потенцијални потрошач од 14 GB. Ограничење чистача је 6 (`MAX_ACTIVE_RUNNERS=6` у cron-у): он броји
  сваки `Runner.Listener` на машини, а OmniHeuris + OmniMind додају још два нашим четирима.
- **Никада ручно не чистите `/tmp` или `_work` док је било који извршилац заузет.**
  Провера, па брисање након временског размака између те две радње, довели су до тога да активан Build задатак изгуби свој
  `_work` 2026-08-27. Чистач обавља проверу и уклањање у једном кораку;
  препустите то њему.
- Заустављање извршиоца усред задатка отказује задатак (потврђено у раду): користите `systemctl stop` само
  када његов процес за ослушкивање нема подређени `Runner.Worker` процес — и урадите то једном командом.
- Токови рада не смеју да смештају артефакте у `/tmp` (он је у RAM-у). Преузимајте у
  `$RUNNER_TEMP` (на диску, засебно за сваког извршиоца) — `next-build` артефакту од 1.3 GB требало је 27–32
  минута да се смести на tmpfs и 2 минута да се отпреми са диска.
- `.15` VPS је само за хомологацију — никада не покреће CI извршиоце.
