# Self-Hosted Runner Box Operations (.113 pool) (Español)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/RUNNER_BOX.md) · 🇪🇹 [am](../../../am/docs/ops/RUNNER_BOX.md) · 🇸🇦 [ar](../../../ar/docs/ops/RUNNER_BOX.md) · 🇦🇿 [az](../../../az/docs/ops/RUNNER_BOX.md) · 🇧🇬 [bg](../../../bg/docs/ops/RUNNER_BOX.md) · 🇧🇩 [bn](../../../bn/docs/ops/RUNNER_BOX.md) · 🇧🇦 [bs](../../../bs/docs/ops/RUNNER_BOX.md) · 🇨🇿 [cs](../../../cs/docs/ops/RUNNER_BOX.md) · 🇩🇰 [da](../../../da/docs/ops/RUNNER_BOX.md) · 🇩🇪 [de](../../../de/docs/ops/RUNNER_BOX.md) · 🇬🇷 [el](../../../el/docs/ops/RUNNER_BOX.md) · 🇪🇪 [et](../../../et/docs/ops/RUNNER_BOX.md) · 🇮🇷 [fa](../../../fa/docs/ops/RUNNER_BOX.md) · 🇫🇮 [fi](../../../fi/docs/ops/RUNNER_BOX.md) · 🇫🇷 [fr](../../../fr/docs/ops/RUNNER_BOX.md) · 🇮🇪 [ga](../../../ga/docs/ops/RUNNER_BOX.md) · 🇮🇳 [gu](../../../gu/docs/ops/RUNNER_BOX.md) · 🇳🇬 [ha](../../../ha/docs/ops/RUNNER_BOX.md) · 🇮🇱 [he](../../../he/docs/ops/RUNNER_BOX.md) · 🇮🇳 [hi](../../../hi/docs/ops/RUNNER_BOX.md) · 🇭🇷 [hr](../../../hr/docs/ops/RUNNER_BOX.md) · 🇭🇺 [hu](../../../hu/docs/ops/RUNNER_BOX.md) · 🇦🇲 [hy](../../../hy/docs/ops/RUNNER_BOX.md) · 🇮🇩 [id](../../../id/docs/ops/RUNNER_BOX.md) · 🇳🇬 [ig](../../../ig/docs/ops/RUNNER_BOX.md) · 🇮🇹 [it](../../../it/docs/ops/RUNNER_BOX.md) · 🇯🇵 [ja](../../../ja/docs/ops/RUNNER_BOX.md) · 🇬🇪 [ka](../../../ka/docs/ops/RUNNER_BOX.md) · 🇰🇭 [km](../../../km/docs/ops/RUNNER_BOX.md) · 🇮🇳 [kn](../../../kn/docs/ops/RUNNER_BOX.md) · 🇰🇷 [ko](../../../ko/docs/ops/RUNNER_BOX.md) · 🇱🇹 [lt](../../../lt/docs/ops/RUNNER_BOX.md) · 🇱🇻 [lv](../../../lv/docs/ops/RUNNER_BOX.md) · 🇮🇳 [ml](../../../ml/docs/ops/RUNNER_BOX.md) · 🇮🇳 [mr](../../../mr/docs/ops/RUNNER_BOX.md) · 🇲🇾 [ms](../../../ms/docs/ops/RUNNER_BOX.md) · 🇲🇹 [mt](../../../mt/docs/ops/RUNNER_BOX.md) · 🇲🇲 [my](../../../my/docs/ops/RUNNER_BOX.md) · 🇳🇵 [ne](../../../ne/docs/ops/RUNNER_BOX.md) · 🇳🇱 [nl](../../../nl/docs/ops/RUNNER_BOX.md) · 🇳🇴 [no](../../../no/docs/ops/RUNNER_BOX.md) · 🇮🇳 [or](../../../or/docs/ops/RUNNER_BOX.md) · 🇮🇳 [pa](../../../pa/docs/ops/RUNNER_BOX.md) · 🇵🇭 [phi](../../../phi/docs/ops/RUNNER_BOX.md) · 🇵🇱 [pl](../../../pl/docs/ops/RUNNER_BOX.md) · 🇵🇹 [pt](../../../pt/docs/ops/RUNNER_BOX.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/RUNNER_BOX.md) · 🇷🇴 [ro](../../../ro/docs/ops/RUNNER_BOX.md) · 🇷🇺 [ru](../../../ru/docs/ops/RUNNER_BOX.md) · 🇱🇰 [si](../../../si/docs/ops/RUNNER_BOX.md) · 🇸🇰 [sk](../../../sk/docs/ops/RUNNER_BOX.md) · 🇸🇮 [sl](../../../sl/docs/ops/RUNNER_BOX.md) · 🇷🇸 [sr](../../../sr/docs/ops/RUNNER_BOX.md) · 🇸🇪 [sv](../../../sv/docs/ops/RUNNER_BOX.md) · 🇰🇪 [sw](../../../sw/docs/ops/RUNNER_BOX.md) · 🇮🇳 [ta](../../../ta/docs/ops/RUNNER_BOX.md) · 🇮🇳 [te](../../../te/docs/ops/RUNNER_BOX.md) · 🇹🇭 [th](../../../th/docs/ops/RUNNER_BOX.md) · 🇹🇷 [tr](../../../tr/docs/ops/RUNNER_BOX.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/RUNNER_BOX.md) · 🇵🇰 [ur](../../../ur/docs/ops/RUNNER_BOX.md) · 🇺🇿 [uz](../../../uz/docs/ops/RUNNER_BOX.md) · 🇻🇳 [vi](../../../vi/docs/ops/RUNNER_BOX.md) · 🇳🇬 [yo](../../../yo/docs/ops/RUNNER_BOX.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/RUNNER_BOX.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/RUNNER_BOX.md)

---

El pool autoalojado (`self-hosted, omni-release` en los ocho runners; `omni-build` en dos) se ejecuta en la máquina **.113**.
Medido el 2026-08-28 (análisis post mortem de v3.8.50, Parte III):

| recurso   | valor                                                                                                          | qué implica para la programación                                                                                                                                          |
| --------- | -------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| RAM / CPU | **31 GB / 32 núcleos** (eran 16 GB cuando se redactó este documento por primera vez)                           | un `next-build` alcanza picos de **~14 GB** → 2 compilaciones pesadas simultáneas saturan la máquina; 3 la tumban (2026-08-28 06:42Z: carga de 56, dos trabajos perdidos) |
| swap      | 15 GB                                                                                                          | logró completar la publicación de v3.8.50 mediante swap; la presión se refleja en `/proc/pressure/memory`                                                                 |
| `/tmp`    | **12 GB tmpfs = RAM**                                                                                          | todo lo que se almacene ahí consume memoria; los residuos se limpian después de 3 h                                                                                       |
| disco     | 188 GB                                                                                                         | los checkouts de `_work` de 8 runners alcanzan ~70 GB sin ningún límite                                                                                                   |
| runners   | **6 listeners**: 4 OmniRoute (1 `omni-build` + 1 solo `omni-release` + 2 `omni-light`) + OmniHeuris + OmniMind | todos comparten la memoria indicada arriba; `omniroute-113-3/-4/-7/-8` están deshabilitados (`systemctl enable --now` vuelve a activar uno)                               |

## Instalar el proceso de limpieza (una sola vez, en la máquina)

```bash
scp scripts/ops/runner-janitor.sh root@192.168.0.113:/opt/omniroute-ops/runner-janitor.sh
ssh root@192.168.0.113 'chmod +x /opt/omniroute-ops/runner-janitor.sh; apt-get install -y lsof'
# cron (root): cada 30 min, registrar en /var/log/runner-janitor.log
*/30 * * * * MAX_ACTIVE_RUNNERS=6 /opt/omniroute-ops/runner-janitor.sh >> /var/log/runner-janitor.log 2>&1
```

`lsof` es obligatorio: el proceso de limpieza comprueba que una ruta está inactiva mediante una instantánea de los archivos abiertos antes de eliminarla; sin la herramienta, no elimina nada e informa de ello (código de salida 1). Pruebe primero cualquier cambio con `--dry-run`: muestra exactamente lo que haría y no modifica nada.

Qué hace en cada ejecución: limpia nuestros propios residuos (`runner-*`, `omniroute-*`,
`next-build*`, `e2e-build.tar.gz`) después de **3 h en tmpfs** y 24 h en
`_work/_temp` del disco; finaliza cualquier `next-build` de más de 75 min (ningún
trabajo tarda tanto; el 2026-08-27 uno siguió ejecutándose durante 70 min después
de que GitHub declarase perdido su trabajo); elimina checkouts de más de 48 h de
runners cuya unidad está **detenida**; alerta si el uso del disco es ≥ 85 %, si
`full/avg60` del PSI de memoria es ≥ 10 % y si hay más listeners que
`MAX_ACTIVE_RUNNERS` (con un desglose entre omniroute y otros). Código de salida
1 = requiere atención; consulte el registro.

## Unidades de runner: KillMode

El valor predeterminado `KillMode=process` del runner deja
`Runner.Worker → npm → next-build` activo cuando una unidad se detiene o reinicia:
una compilación huérfana continúa consumiendo RAM y CPU sin tener ningún trabajo
asociado. Cada unidad de OmniRoute incluye un archivo drop-in
(`/etc/systemd/system/actions.runner.diegosouzapw-OmniRoute.<name>.service.d/10-killmode.conf`)
con `KillMode=mixed`: primero envía SIGTERM al listener y, al llegar a
`TimeoutStop`, envía SIGKILL a todo el cgroup. Entra en vigor en el siguiente
reinicio de la unidad: reinicia **un runner a la vez, únicamente cuando esté
inactivo**, con la comprobación de inactividad y el reinicio en el mismo comando.

## Reglas de operación

- **Límite de compilaciones pesadas: UNA a la vez — aplicado mediante etiqueta (desde 2026-08-29).** Cada trabajo
  que ejecuta un `next build` completo apunta a `[self-hosted, omni-build]`, y solo
  **`omniroute-113-5`** tiene esa etiqueta (añadida mediante la API de runners, sin
  volver a registrarlo): `ci.yml` `Build`, `npm-publish.yml` `publish`, ambas
  validaciones de `nightly-release-green` y **amd64** de `docker-publish.yml` (el runner alojado
  de 7 GB sufrió ResourceExhausted con este árbol — #11976). La rama arm64 de Docker permanece en
  `ubuntu-24.04-arm` (no hay máquina ARM) con webpack. Docker amd64 también utiliza webpack:
  Turbopack entró en pánico dentro de BuildKit con este árbol (`TurbopackInternalError:
there must be a path to a root`, ejecución 33253576569), incluso con 31 GB; la compilación
  arm64 con webpack del mismo árbol en ARM alojado se completó correctamente. amd64 de
  `docker-publish` comparte el grupo de concurrencia `heavy-build-main` con `Build`
  de `ci.yml` (`cancel-in-progress: false`), por lo que queda en cola para la única plaza. Docker Engine
  debe estar en `omniroute-113-5` (`docker info` es el primer paso del trabajo de publicación).
  Dos era el límite anterior y resultó incorrecto para 31 GB: el
  2026-08-29 a las 17:26 UTC, dos procesos `next-build` simultáneos (15,4 GB + 17,2 GB de RSS) dejaron la máquina
  con 5 GB libres y 4 GB de swap en uso, y el OOM killer del kernel terminó uno de ellos; systemd
  registró la terminación en la unidad del _otro_ runner, `runsvc.sh` envió SIGKILL a ese listener y
  su trabajo terminó con "The runner has received a shutdown signal" (el mismo texto que aparece en un
  OOM de un runner alojado). `omniroute-113-6` conserva únicamente `omni-release`. Las compilaciones
  pesadas procedentes de fusiones en `main`, PR y la ejecución nocturna ahora se serializan en una sola plaza;
  la cola es el precio que hay que pagar. La segunda plaza volverá el día en que la VM de Proxmox reciba más RAM
  (48–64 GB):
  `gh api -X POST repos/<repo>/actions/runners/<id of omniroute-113-6>/labels -f 'labels[]=omni-build'`.
- **Pool ligero: `omni-light` (2026-08-29, #11965).** `omniroute-113` y `omniroute-113-2` tienen
  `omni-light` para trabajos que necesitan un `next build` solo del backend (~5–6 GB), pero no uno completo: los
  trabajos nocturnos de Schemathesis, promptfoo, garak y axe-a11y. Se ejecutaban en el runner alojado de 7 GB y
  fallaron en `release/v3.8.51` sin que nadie estuviera supervisando. El peor caso en la máquina es 2 pesadas + 2 ligeras ≈
  30 + 12 GB: supera los 31 GB de RAM, pero cabe dentro de los 16 GB de swap; la solución real para disponer de margen es añadir más RAM
  a la VM de Proxmox (`tomni-proxmox-113`), lo que convierte los límites por etiqueta en 3 pesadas + 2 ligeras.
- **Menos listeners a propósito.** Cuatro unidades de OmniRoute se deshabilitaron el 2026-08-29: dado que solo
  `Build` de `ci.yml` y las ejecuciones nocturnas utilizan la máquina, había 8 listeners inactivos y cada uno adicional es un
  posible consumidor de 14 GB. El límite del janitor es 6 (`MAX_ACTIVE_RUNNERS=6` en cron): contabiliza
  cada `Runner.Listener` de la máquina, y OmniHeuris + OmniMind añaden dos a nuestros cuatro.
- **Nunca limpies `/tmp` ni `_work` manualmente mientras algún runner esté ocupado.** Una
  comprobación seguida de una eliminación, con un intervalo entre ambas, hizo que un trabajo Build activo perdiera su
  `_work` el 2026-08-27. El janitor realiza la comprobación y la eliminación en un solo paso;
  deja que se encargue.
- Detener un runner en mitad de un trabajo cancela el trabajo (observado en vivo): usa `systemctl stop` únicamente
  cuando su listener no tenga ningún proceso hijo `Runner.Worker`, y hazlo en un solo comando.
- Los workflows no deben almacenar artefactos en `/tmp` (está en RAM). Descárgalos en
  `$RUNNER_TEMP` (en disco, uno por runner): el artefacto `next-build` de 1,3 GB tardó entre 27 y 32
  minutos en llegar al tmpfs y 2 minutos en cargarse desde el disco.
- El VPS `.15` es únicamente para homologación: nunca ejecuta runners de CI.
