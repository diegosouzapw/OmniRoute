# Self-Hosted Runner Box Operations (.113 pool) (Русский)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/RUNNER_BOX.md) · 🇪🇹 [am](../../../am/docs/ops/RUNNER_BOX.md) · 🇸🇦 [ar](../../../ar/docs/ops/RUNNER_BOX.md) · 🇦🇿 [az](../../../az/docs/ops/RUNNER_BOX.md) · 🇧🇬 [bg](../../../bg/docs/ops/RUNNER_BOX.md) · 🇧🇩 [bn](../../../bn/docs/ops/RUNNER_BOX.md) · 🇨🇿 [cs](../../../cs/docs/ops/RUNNER_BOX.md) · 🇩🇰 [da](../../../da/docs/ops/RUNNER_BOX.md) · 🇩🇪 [de](../../../de/docs/ops/RUNNER_BOX.md) · 🇬🇷 [el](../../../el/docs/ops/RUNNER_BOX.md) · 🇪🇸 [es](../../../es/docs/ops/RUNNER_BOX.md) · 🇪🇪 [et](../../../et/docs/ops/RUNNER_BOX.md) · 🇮🇷 [fa](../../../fa/docs/ops/RUNNER_BOX.md) · 🇫🇮 [fi](../../../fi/docs/ops/RUNNER_BOX.md) · 🇫🇷 [fr](../../../fr/docs/ops/RUNNER_BOX.md) · 🇮🇪 [ga](../../../ga/docs/ops/RUNNER_BOX.md) · 🇮🇳 [gu](../../../gu/docs/ops/RUNNER_BOX.md) · 🇳🇬 [ha](../../../ha/docs/ops/RUNNER_BOX.md) · 🇮🇱 [he](../../../he/docs/ops/RUNNER_BOX.md) · 🇮🇳 [hi](../../../hi/docs/ops/RUNNER_BOX.md) · 🇭🇷 [hr](../../../hr/docs/ops/RUNNER_BOX.md) · 🇭🇺 [hu](../../../hu/docs/ops/RUNNER_BOX.md) · 🇦🇲 [hy](../../../hy/docs/ops/RUNNER_BOX.md) · 🇮🇩 [id](../../../id/docs/ops/RUNNER_BOX.md) · 🇳🇬 [ig](../../../ig/docs/ops/RUNNER_BOX.md) · 🇮🇹 [it](../../../it/docs/ops/RUNNER_BOX.md) · 🇯🇵 [ja](../../../ja/docs/ops/RUNNER_BOX.md) · 🇬🇪 [ka](../../../ka/docs/ops/RUNNER_BOX.md) · 🇰🇭 [km](../../../km/docs/ops/RUNNER_BOX.md) · 🇮🇳 [kn](../../../kn/docs/ops/RUNNER_BOX.md) · 🇰🇷 [ko](../../../ko/docs/ops/RUNNER_BOX.md) · 🇱🇹 [lt](../../../lt/docs/ops/RUNNER_BOX.md) · 🇱🇻 [lv](../../../lv/docs/ops/RUNNER_BOX.md) · 🇮🇳 [ml](../../../ml/docs/ops/RUNNER_BOX.md) · 🇮🇳 [mr](../../../mr/docs/ops/RUNNER_BOX.md) · 🇲🇾 [ms](../../../ms/docs/ops/RUNNER_BOX.md) · 🇲🇹 [mt](../../../mt/docs/ops/RUNNER_BOX.md) · 🇲🇲 [my](../../../my/docs/ops/RUNNER_BOX.md) · 🇳🇵 [ne](../../../ne/docs/ops/RUNNER_BOX.md) · 🇳🇱 [nl](../../../nl/docs/ops/RUNNER_BOX.md) · 🇳🇴 [no](../../../no/docs/ops/RUNNER_BOX.md) · 🇮🇳 [or](../../../or/docs/ops/RUNNER_BOX.md) · 🇮🇳 [pa](../../../pa/docs/ops/RUNNER_BOX.md) · 🇵🇭 [phi](../../../phi/docs/ops/RUNNER_BOX.md) · 🇵🇱 [pl](../../../pl/docs/ops/RUNNER_BOX.md) · 🇵🇹 [pt](../../../pt/docs/ops/RUNNER_BOX.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/RUNNER_BOX.md) · 🇷🇴 [ro](../../../ro/docs/ops/RUNNER_BOX.md) · 🇱🇰 [si](../../../si/docs/ops/RUNNER_BOX.md) · 🇸🇰 [sk](../../../sk/docs/ops/RUNNER_BOX.md) · 🇸🇮 [sl](../../../sl/docs/ops/RUNNER_BOX.md) · 🇷🇸 [sr](../../../sr/docs/ops/RUNNER_BOX.md) · 🇸🇪 [sv](../../../sv/docs/ops/RUNNER_BOX.md) · 🇰🇪 [sw](../../../sw/docs/ops/RUNNER_BOX.md) · 🇮🇳 [ta](../../../ta/docs/ops/RUNNER_BOX.md) · 🇮🇳 [te](../../../te/docs/ops/RUNNER_BOX.md) · 🇹🇭 [th](../../../th/docs/ops/RUNNER_BOX.md) · 🇹🇷 [tr](../../../tr/docs/ops/RUNNER_BOX.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/RUNNER_BOX.md) · 🇵🇰 [ur](../../../ur/docs/ops/RUNNER_BOX.md) · 🇺🇿 [uz](../../../uz/docs/ops/RUNNER_BOX.md) · 🇻🇳 [vi](../../../vi/docs/ops/RUNNER_BOX.md) · 🇳🇬 [yo](../../../yo/docs/ops/RUNNER_BOX.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/RUNNER_BOX.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/RUNNER_BOX.md)

---

Пул собственных раннеров (`self-hosted, omni-release` на всех восьми раннерах; `omni-build` на двух) работает на машине **.113**.
Измерено 2026-08-28 (разбор инцидента v3.8.50, часть III):

| ресурс    | значение                                                                                                            | что это означает для планирования                                                                                                                                                        |
| --------- | ------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| RAM / CPU | **31 GB / 32 ядра** (было 16 GB, когда этот документ был впервые написан)                                           | один `next-build` на пике потребляет **~14 GB** → 2 параллельные тяжёлые сборки исчерпывают ресурсы машины, 3 выводят её из строя (2026-08-28 06:42Z: нагрузка 56, потеряны два задания) |
| swap      | 15 GB                                                                                                               | благодаря подкачке удалось завершить публикацию v3.8.50; нагрузка отражается в `/proc/pressure/memory`                                                                                   |
| `/tmp`    | **12 GB tmpfs = RAM**                                                                                               | всё, что размещается там, занимает память; остаточные файлы удаляются через 3 ч                                                                                                          |
| диск      | 188 GB                                                                                                              | рабочие копии `_work` от 8 раннеров разрастаются примерно до 70 GB без каких-либо ограничений                                                                                            |
| раннеры   | **6 слушателей**: 4 OmniRoute (1 `omni-build` + 1 только с `omni-release` + 2 `omni-light`) + OmniHeuris + OmniMind | все используют указанную выше общую память; `omniroute-113-3/-4/-7/-8` отключены (`systemctl enable --now` снова запускает один из них)                                                  |

## Установка скрипта очистки (однократно, на машине)

```bash
scp scripts/ops/runner-janitor.sh root@192.168.0.113:/opt/omniroute-ops/runner-janitor.sh
ssh root@192.168.0.113 'chmod +x /opt/omniroute-ops/runner-janitor.sh; apt-get install -y lsof'
# cron (root): каждые 30 мин, журнал записывается в /var/log/runner-janitor.log
*/30 * * * * MAX_ACTIVE_RUNNERS=6 /opt/omniroute-ops/runner-janitor.sh >> /var/log/runner-janitor.log 2>&1
```

Требуется `lsof`: прежде чем удалить путь, скрипт очистки по однократному снимку открытых
файлов убеждается, что путь не используется, а без этого инструмента он ничего не удаляет
и сообщает об этом (код выхода 1). Сначала проверяйте любые изменения с помощью `--dry-run` —
скрипт выведет в точности то, что он сделал бы, не меняя ничего.

Что он делает при каждом запуске: удаляет оставленные нами файлы (`runner-*`, `omniroute-*`,
`next-build*`, `e2e-build.tar.gz`) через **3 ч в tmpfs** и через 24 ч на диске в
`_work/_temp`; завершает процесс `next-build`, работающий более 75 мин (ни одно задание
не выполняется так долго — 2026-08-27 один процесс работал 70 мин после того, как GitHub
объявил его задание потерянным); удаляет рабочие копии старше 48 ч у раннеров, чьи службы
**остановлены**; предупреждает при заполнении диска ≥ 85 %, значении PSI памяти
`full/avg60` ≥ 10 % и количестве слушателей выше `MAX_ACTIVE_RUNNERS` (с разбивкой на
omniroute/прочие). Код выхода 1 = требуется внимание; проверьте журнал.

## Юниты раннеров: KillMode

Значение `KillMode=process`, используемое раннером по умолчанию, оставляет процесс `Runner.Worker → npm → next-build`
работающим после остановки или перезапуска юнита — осиротевшая сборка продолжает потреблять оперативную память и
процессорное время, хотя задание к ней уже не привязано. Каждый юнит OmniRoute содержит drop-in-файл
(`/etc/systemd/system/actions.runner.diegosouzapw-OmniRoute.<name>.service.d/10-killmode.conf`)
с `KillMode=mixed`: сначала SIGTERM отправляется слушателю, а по истечении
`TimeoutStop` всей cgroup отправляется SIGKILL. Настройка вступает в силу при следующем перезапуске юнита — перезапускайте **по одному раннеру
за раз и только во время простоя**, выполняя проверку простоя и перезапуск одной командой.

## Правила эксплуатации

- **Лимит тяжёлых сборок: ОДНА одновременно — обеспечивается меткой (с 2026-08-29).** Каждое задание,
  запускающее полный `next build`, ориентировано на `[self-hosted, omni-build]`, и только
  **`omniroute-113-5`** имеет эту метку (добавлена через API раннеров — без
  повторной регистрации): `ci.yml` `Build`, `npm-publish.yml` `publish`, обе
  проверки `nightly-release-green` и **amd64** в `docker-publish.yml` (на хостинговом
  раннере с 7 ГБ для этой ветки возникла ошибка ResourceExhausted — #11976). Часть Docker для arm64 остаётся на
  `ubuntu-24.04-arm` (ARM-машины нет) и использует webpack. Docker для amd64 также использует webpack:
  Turbopack на этой ветке аварийно завершился внутри BuildKit (`TurbopackInternalError:
there must be a path to a root`, запуск 33253576569) даже при 31 ГБ; сборка той же
  ветки для arm64 с webpack на хостинговом ARM-раннере завершилась успешно. Задание `docker-publish` для amd64
  использует общую группу параллелизма `heavy-build-main` с `ci.yml` `Build`
  (`cancel-in-progress: false`), поэтому ожидает в очереди единственного слота. Docker Engine
  должен быть установлен на `omniroute-113-5` (`docker info` — первый шаг задания публикации).
  Ранее лимит составлял два, но для 31 ГБ это было ошибкой: в
  2026-08-29 17:26 UTC две параллельные сборки `next-build` (15,4 ГБ + 17,2 ГБ RSS) уменьшили объём
  свободной памяти на машине до 5 ГБ при использовании 4 ГБ swap, после чего OOM-механизм ядра завершил одну из них — systemd
  отнёс это завершение к юниту _другого_ раннера, `runsvc.sh` отправил тому слушателю SIGKILL, и
  выполнявшееся на нём задание завершилось с сообщением "The runner has received a shutdown signal" (тем же текстом, что и при
  OOM на хостинговом раннере). На `omniroute-113-6` остаётся только `omni-release`. Тяжёлые сборки из
  слияний в `main`, PR и ночных запусков теперь последовательно выполняются в одном слоте; очередь — цена этого ограничения.
  Второй слот вернётся, когда виртуальная машина Proxmox получит больше оперативной памяти (48–64 ГБ):
  `gh api -X POST repos/<repo>/actions/runners/<id of omniroute-113-6>/labels -f 'labels[]=omni-build'`.
- **Лёгкий пул: `omni-light` (2026-08-29, #11965).** `omniroute-113` и `omniroute-113-2` имеют
  метку `omni-light` для заданий, которым требуется только серверная сборка `next build` (~5–6 ГБ), но не полная:
  ночные задания Schemathesis, promptfoo, garak и axe-a11y. Ранее они выполнялись на хостинговом раннере с 7 ГБ и
  завершались с ошибкой на `release/v3.8.51`, пока никто не следил за ними. Худший сценарий для машины — 2 тяжёлых + 2 лёгких ≈
  30 + 12 ГБ: это превышает 31 ГБ оперативной памяти, но укладывается в 16 ГБ swap; настоящее решение проблемы с запасом памяти —
  увеличить объём оперативной памяти виртуальной машины Proxmox (`tomni-proxmox-113`), что позволит увеличить лимиты по меткам до 3 тяжёлых + 2 лёгких.
- **Меньше слушателей намеренно.** Четыре юнита OmniRoute были отключены 2026-08-29 — поскольку машину используют только
  `ci.yml` `Build` и ночные задания, 8 слушателей простаивали, а каждый дополнительный слушатель — потенциальный потребитель 14 ГБ.
  Лимит уборщика равен 6 (`MAX_ACTIVE_RUNNERS=6` в cron): он подсчитывает
  все процессы `Runner.Listener` на машине, а OmniHeuris и OmniMind добавляют два процесса к нашим четырём.
- **Никогда не очищайте `/tmp` или `_work` вручную, пока хотя бы один раннер занят.**
  Проверка с последующим удалением, между которыми есть временной промежуток, привела к тому, что выполнявшееся задание Build потеряло свой каталог
  `_work` 2026-08-27. Уборщик выполняет проверку и удаление за один шаг;
  предоставьте это ему.
- Остановка раннера во время выполнения задания отменяет задание (проверено на работающей системе): используйте `systemctl stop`, только
  когда у его слушателя нет дочернего процесса `Runner.Worker`, — и выполняйте это одной командой.
- Рабочие процессы не должны размещать артефакты в `/tmp` (он находится в оперативной памяти). Загружайте их в
  `$RUNNER_TEMP` (на диске, отдельно для каждого раннера) — артефакт `next-build` размером 1,3 ГБ загружался в tmpfs 27–32
  минуты, а его выгрузка с диска заняла 2 минуты.
- VPS `.15` предназначен только для омологации — CI-раннеры на нём никогда не запускаются.
