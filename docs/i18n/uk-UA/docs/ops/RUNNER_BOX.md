# Self-Hosted Runner Box Operations (.113 pool) (Українська)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/RUNNER_BOX.md) · 🇪🇹 [am](../../../am/docs/ops/RUNNER_BOX.md) · 🇸🇦 [ar](../../../ar/docs/ops/RUNNER_BOX.md) · 🇦🇿 [az](../../../az/docs/ops/RUNNER_BOX.md) · 🇧🇬 [bg](../../../bg/docs/ops/RUNNER_BOX.md) · 🇧🇩 [bn](../../../bn/docs/ops/RUNNER_BOX.md) · 🇨🇿 [cs](../../../cs/docs/ops/RUNNER_BOX.md) · 🇩🇰 [da](../../../da/docs/ops/RUNNER_BOX.md) · 🇩🇪 [de](../../../de/docs/ops/RUNNER_BOX.md) · 🇬🇷 [el](../../../el/docs/ops/RUNNER_BOX.md) · 🇪🇸 [es](../../../es/docs/ops/RUNNER_BOX.md) · 🇪🇪 [et](../../../et/docs/ops/RUNNER_BOX.md) · 🇮🇷 [fa](../../../fa/docs/ops/RUNNER_BOX.md) · 🇫🇮 [fi](../../../fi/docs/ops/RUNNER_BOX.md) · 🇫🇷 [fr](../../../fr/docs/ops/RUNNER_BOX.md) · 🇮🇪 [ga](../../../ga/docs/ops/RUNNER_BOX.md) · 🇮🇳 [gu](../../../gu/docs/ops/RUNNER_BOX.md) · 🇳🇬 [ha](../../../ha/docs/ops/RUNNER_BOX.md) · 🇮🇱 [he](../../../he/docs/ops/RUNNER_BOX.md) · 🇮🇳 [hi](../../../hi/docs/ops/RUNNER_BOX.md) · 🇭🇷 [hr](../../../hr/docs/ops/RUNNER_BOX.md) · 🇭🇺 [hu](../../../hu/docs/ops/RUNNER_BOX.md) · 🇦🇲 [hy](../../../hy/docs/ops/RUNNER_BOX.md) · 🇮🇩 [id](../../../id/docs/ops/RUNNER_BOX.md) · 🇳🇬 [ig](../../../ig/docs/ops/RUNNER_BOX.md) · 🇮🇹 [it](../../../it/docs/ops/RUNNER_BOX.md) · 🇯🇵 [ja](../../../ja/docs/ops/RUNNER_BOX.md) · 🇬🇪 [ka](../../../ka/docs/ops/RUNNER_BOX.md) · 🇰🇭 [km](../../../km/docs/ops/RUNNER_BOX.md) · 🇮🇳 [kn](../../../kn/docs/ops/RUNNER_BOX.md) · 🇰🇷 [ko](../../../ko/docs/ops/RUNNER_BOX.md) · 🇱🇹 [lt](../../../lt/docs/ops/RUNNER_BOX.md) · 🇱🇻 [lv](../../../lv/docs/ops/RUNNER_BOX.md) · 🇮🇳 [ml](../../../ml/docs/ops/RUNNER_BOX.md) · 🇮🇳 [mr](../../../mr/docs/ops/RUNNER_BOX.md) · 🇲🇾 [ms](../../../ms/docs/ops/RUNNER_BOX.md) · 🇲🇹 [mt](../../../mt/docs/ops/RUNNER_BOX.md) · 🇲🇲 [my](../../../my/docs/ops/RUNNER_BOX.md) · 🇳🇵 [ne](../../../ne/docs/ops/RUNNER_BOX.md) · 🇳🇱 [nl](../../../nl/docs/ops/RUNNER_BOX.md) · 🇳🇴 [no](../../../no/docs/ops/RUNNER_BOX.md) · 🇮🇳 [or](../../../or/docs/ops/RUNNER_BOX.md) · 🇮🇳 [pa](../../../pa/docs/ops/RUNNER_BOX.md) · 🇵🇭 [phi](../../../phi/docs/ops/RUNNER_BOX.md) · 🇵🇱 [pl](../../../pl/docs/ops/RUNNER_BOX.md) · 🇵🇹 [pt](../../../pt/docs/ops/RUNNER_BOX.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/RUNNER_BOX.md) · 🇷🇴 [ro](../../../ro/docs/ops/RUNNER_BOX.md) · 🇷🇺 [ru](../../../ru/docs/ops/RUNNER_BOX.md) · 🇱🇰 [si](../../../si/docs/ops/RUNNER_BOX.md) · 🇸🇰 [sk](../../../sk/docs/ops/RUNNER_BOX.md) · 🇸🇮 [sl](../../../sl/docs/ops/RUNNER_BOX.md) · 🇷🇸 [sr](../../../sr/docs/ops/RUNNER_BOX.md) · 🇸🇪 [sv](../../../sv/docs/ops/RUNNER_BOX.md) · 🇰🇪 [sw](../../../sw/docs/ops/RUNNER_BOX.md) · 🇮🇳 [ta](../../../ta/docs/ops/RUNNER_BOX.md) · 🇮🇳 [te](../../../te/docs/ops/RUNNER_BOX.md) · 🇹🇭 [th](../../../th/docs/ops/RUNNER_BOX.md) · 🇹🇷 [tr](../../../tr/docs/ops/RUNNER_BOX.md) · 🇵🇰 [ur](../../../ur/docs/ops/RUNNER_BOX.md) · 🇺🇿 [uz](../../../uz/docs/ops/RUNNER_BOX.md) · 🇻🇳 [vi](../../../vi/docs/ops/RUNNER_BOX.md) · 🇳🇬 [yo](../../../yo/docs/ops/RUNNER_BOX.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/RUNNER_BOX.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/RUNNER_BOX.md)

---

Пул із власними раннерами (`self-hosted, omni-release` на всіх восьми раннерах; `omni-build` на двох) працює на сервері **.113**.
Виміряно 2026-08-28 (розбір інциденту v3.8.50, частина III):

| ресурс    | значення                                                                                                      | що це означає для планування                                                                                                                                                                  |
| --------- | ------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| RAM / CPU | **31 GB / 32 ядра** (було 16 GB, коли цей документ написали вперше)                                           | один `next-build` на піку використовує **~14 GB** → 2 одночасні важкі збірки повністю завантажують сервер, 3 виводять його з ладу (2026-08-28 06:42Z: навантаження 56, втрачено два завдання) |
| swap      | 15 GB                                                                                                         | сервер пройшов публікацію v3.8.50 завдяки свопінгу; тиск відображається в `/proc/pressure/memory`                                                                                             |
| `/tmp`    | **12 GB tmpfs = RAM**                                                                                         | усе, що зберігається там, займає пам’ять; залишки очищаються через 3 год                                                                                                                      |
| диск      | 188 GB                                                                                                        | робочі копії `_work` для 8 раннерів без обмежень сягають ~70 GB                                                                                                                               |
| раннери   | **6 слухачів**: 4 OmniRoute (1 `omni-build` + 1 лише `omni-release` + 2 `omni-light`) + OmniHeuris + OmniMind | усі вони спільно використовують зазначену вище пам’ять; `omniroute-113-3/-4/-7/-8` вимкнені (`systemctl enable --now` знову запускає один із них)                                             |

## Установлення прибиральника (одноразово, на сервері)

```bash
scp scripts/ops/runner-janitor.sh root@192.168.0.113:/opt/omniroute-ops/runner-janitor.sh
ssh root@192.168.0.113 'chmod +x /opt/omniroute-ops/runner-janitor.sh; apt-get install -y lsof'
# cron (root): кожні 30 хв, журнал у /var/log/runner-janitor.log
*/30 * * * * MAX_ACTIVE_RUNNERS=6 /opt/omniroute-ops/runner-janitor.sh >> /var/log/runner-janitor.log 2>&1
```

`lsof` є обов’язковим: перед видаленням прибиральник підтверджує, що шлях не використовується, за допомогою одного знімка відкритих
файлів, а без цього інструмента нічого не видаляє та повідомляє
про це (код завершення 1). Спочатку перевіряйте будь-які зміни за допомогою `--dry-run` — цей режим точно показує, що буде
зроблено, і нічого не змінює.

Що він робить під час кожного запуску: очищає наші власні залишки (`runner-*`, `omniroute-*`,
`next-build*`, `e2e-build.tar.gz`) через **3 год у tmpfs** і через 24 год у дисковому
`_work/_temp`; завершує процес `next-build`, старіший за 75 хв (жодне завдання не виконується так довго —
2026-08-27 один процес працював 70 хв після того, як GitHub оголосив його завдання втраченим); видаляє робочі
копії старші за 48 год для раннерів, чиї служби **зупинено**; сповіщає, коли використання диска ≥ 85 %, показник PSI пам’яті
`full/avg60` ≥ 10 % або кількість слухачів перевищує `MAX_ACTIVE_RUNNERS` (із
розподілом на omniroute/інші). Код завершення 1 = потрібна увага; перегляньте журнал.

## Модулі раннерів: KillMode

Стандартний параметр раннера `KillMode=process` залишає процеси `Runner.Worker → npm → next-build`
активними після зупинки або перезапуску модуля — осиротіла збірка продовжує споживати оперативну пам’ять і
CPU, хоча з нею не пов’язане жодне завдання. Кожен модуль OmniRoute має додаткову конфігурацію
(`/etc/systemd/system/actions.runner.diegosouzapw-OmniRoute.<name>.service.d/10-killmode.conf`)
із `KillMode=mixed`: спочатку SIGTERM надсилається слухачу, а після
`TimeoutStop` — SIGKILL усій cgroup. Зміна набуває чинності після наступного перезапуску модуля — перезапускайте **по одному раннеру,
лише коли він неактивний**, виконуючи перевірку неактивності та перезапуск однією командою.

## Правила експлуатації

- **Ліміт важких збірок: ОДНА за раз — забезпечується міткою (з 2026-08-29).** Кожне завдання,
  яке виконує повний `next build`, націлене на `[self-hosted, omni-build]`, і лише
  **`omniroute-113-5`** має цю мітку (додану через API раннерів — без
  повторної реєстрації): `ci.yml` `Build`, `npm-publish.yml` `publish`, обидві
  перевірки `nightly-release-green` і **amd64** у `docker-publish.yml` (на хостинговому раннері
  з 7 GB для цього дерева виник ResourceExhausted — #11976). Етап Docker для arm64 залишається на
  `ubuntu-24.04-arm` (ARM-машини немає) з webpack. Docker amd64 також використовує webpack:
  Turbopack на цьому дереві аварійно завершився всередині BuildKit (`TurbopackInternalError:
there must be a path to a root`, запуск 33253576569) навіть із 31 GB; збірка
  того самого дерева для arm64 за допомогою webpack на хостинговому ARM-раннері завершилася успішно. Docker amd64
  використовує спільну групу паралельності `heavy-build-main` із `Build` у `ci.yml`
  (`cancel-in-progress: false`), тому очікує в черзі на єдиний слот. Docker Engine
  має бути доступним на `omniroute-113-5` (`docker info` є першим кроком завдання публікації).
  Раніше ліміт становив два, але для 31 GB це було неправильно: о
  2026-08-29 17:26 UTC дві паралельні збірки `next-build` (15.4 GB + 17.2 GB RSS) залишили на машині
  лише 5 GB вільної пам’яті за використаних 4 GB swap, і OOM-механізм ядра завершив одну з них — systemd
  зарахував це завершення модулю _іншого_ раннера, `runsvc.sh` надіслав SIGKILL цьому слухачу, а
  його завдання завершилося з повідомленням "The runner has received a shutdown signal" (тим самим текстом, що й у разі
  OOM на хостинговому раннері). `omniroute-113-6` зберігає лише `omni-release`. Важкі збірки після
  злиттів у `main`, із PR і нічного запуску тепер виконуються послідовно в одному слоті; черга — це ціна.
  Другий слот повернеться, коли віртуальна машина Proxmox отримає більше оперативної пам’яті (48–64 GB):
  `gh api -X POST repos/<repo>/actions/runners/<id of omniroute-113-6>/labels -f 'labels[]=omni-build'`.
- **Легкий пул: `omni-light` (2026-08-29, #11965).** `omniroute-113` і `omniroute-113-2` мають
  мітку `omni-light` для завдань, яким потрібен лише серверний `next build` (~5–6 GB), а не повний: нічні
  завдання Schemathesis, promptfoo, garak і axe-a11y. Вони виконувалися на хостинговому раннері з 7 GB і
  аварійно завершилися на `release/v3.8.51`, коли за ними ніхто не стежив. Найгірший сценарій для машини — 2 важкі + 2 легкі ≈
  30 + 12 GB — більше за 31 GB оперативної пам’яті, але в межах 16 GB swap; справжнє рішення для збільшення запасу — більше оперативної пам’яті
  у віртуальній машині Proxmox (`tomni-proxmox-113`), що підвищить ліміти міток до 3 важких + 2 легких.
- **Менше слухачів навмисно.** Чотири модулі OmniRoute було вимкнено 2026-08-29 — оскільки машину використовують лише
  `Build` із `ci.yml` та нічні завдання, 8 слухачів простоювали, а кожен додатковий слухач є
  потенційним споживачем 14 GB. Ліміт прибиральника — 6 (`MAX_ACTIVE_RUNNERS=6` у cron): він враховує
  кожен `Runner.Listener` на машині, а OmniHeuris + OmniMind додають ще два до наших чотирьох.
- **Ніколи не очищуйте `/tmp` або `_work` вручну, поки хоча б один раннер зайнятий.**
  Перевірка з подальшим видаленням, між якими є пауза, призвела до того, що активне завдання Build втратило свій
  `_work` 2026-08-27. Прибиральник виконує перевірку та видалення як одну операцію;
  дозвольте йому це зробити.
- Зупинка раннера посеред виконання завдання скасовує це завдання (підтверджено на практиці): використовуйте `systemctl stop` лише
  тоді, коли слухач не має дочірнього процесу `Runner.Worker`, — і виконуйте це однією командою.
- Робочі процеси не повинні зберігати артефакти в `/tmp` (він розміщений в оперативній пам’яті). Завантажуйте їх у
  `$RUNNER_TEMP` (на диску, окремо для кожного раннера) — завантаження артефакту `next-build` розміром 1.3 GB у tmpfs тривало 27–32
  хвилини, а передавання з диска — 2 хвилини.
- VPS `.15` призначений лише для середовища омологації — CI-раннери на ньому ніколи не запускаються.
