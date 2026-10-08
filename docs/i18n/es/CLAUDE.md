# CLAUDE.md (Español)

🌐 **Languages:** 🇺🇸 [English](../../../CLAUDE.md) · 🇪🇹 [am](../am/CLAUDE.md) · 🇸🇦 [ar](../ar/CLAUDE.md) · 🇦🇿 [az](../az/CLAUDE.md) · 🇧🇬 [bg](../bg/CLAUDE.md) · 🇧🇩 [bn](../bn/CLAUDE.md) · 🇧🇦 [bs](../bs/CLAUDE.md) · 🇨🇿 [cs](../cs/CLAUDE.md) · 🇩🇰 [da](../da/CLAUDE.md) · 🇩🇪 [de](../de/CLAUDE.md) · 🇬🇷 [el](../el/CLAUDE.md) · 🇪🇪 [et](../et/CLAUDE.md) · 🇮🇷 [fa](../fa/CLAUDE.md) · 🇫🇮 [fi](../fi/CLAUDE.md) · 🇫🇷 [fr](../fr/CLAUDE.md) · 🇮🇪 [ga](../ga/CLAUDE.md) · 🇮🇳 [gu](../gu/CLAUDE.md) · 🇳🇬 [ha](../ha/CLAUDE.md) · 🇮🇱 [he](../he/CLAUDE.md) · 🇮🇳 [hi](../hi/CLAUDE.md) · 🇭🇷 [hr](../hr/CLAUDE.md) · 🇭🇺 [hu](../hu/CLAUDE.md) · 🇦🇲 [hy](../hy/CLAUDE.md) · 🇮🇩 [id](../id/CLAUDE.md) · 🇳🇬 [ig](../ig/CLAUDE.md) · 🇮🇹 [it](../it/CLAUDE.md) · 🇯🇵 [ja](../ja/CLAUDE.md) · 🇬🇪 [ka](../ka/CLAUDE.md) · 🇰🇭 [km](../km/CLAUDE.md) · 🇮🇳 [kn](../kn/CLAUDE.md) · 🇰🇷 [ko](../ko/CLAUDE.md) · 🇱🇹 [lt](../lt/CLAUDE.md) · 🇱🇻 [lv](../lv/CLAUDE.md) · 🇮🇳 [ml](../ml/CLAUDE.md) · 🇮🇳 [mr](../mr/CLAUDE.md) · 🇲🇾 [ms](../ms/CLAUDE.md) · 🇲🇹 [mt](../mt/CLAUDE.md) · 🇲🇲 [my](../my/CLAUDE.md) · 🇳🇵 [ne](../ne/CLAUDE.md) · 🇳🇱 [nl](../nl/CLAUDE.md) · 🇳🇴 [no](../no/CLAUDE.md) · 🇮🇳 [or](../or/CLAUDE.md) · 🇮🇳 [pa](../pa/CLAUDE.md) · 🇵🇭 [phi](../phi/CLAUDE.md) · 🇵🇱 [pl](../pl/CLAUDE.md) · 🇵🇹 [pt](../pt/CLAUDE.md) · 🇧🇷 [pt-BR](../pt-BR/CLAUDE.md) · 🇷🇴 [ro](../ro/CLAUDE.md) · 🇷🇺 [ru](../ru/CLAUDE.md) · 🇱🇰 [si](../si/CLAUDE.md) · 🇸🇰 [sk](../sk/CLAUDE.md) · 🇸🇮 [sl](../sl/CLAUDE.md) · 🇷🇸 [sr](../sr/CLAUDE.md) · 🇸🇪 [sv](../sv/CLAUDE.md) · 🇰🇪 [sw](../sw/CLAUDE.md) · 🇮🇳 [ta](../ta/CLAUDE.md) · 🇮🇳 [te](../te/CLAUDE.md) · 🇹🇭 [th](../th/CLAUDE.md) · 🇹🇷 [tr](../tr/CLAUDE.md) · 🇺🇦 [uk-UA](../uk-UA/CLAUDE.md) · 🇵🇰 [ur](../ur/CLAUDE.md) · 🇺🇿 [uz](../uz/CLAUDE.md) · 🇻🇳 [vi](../vi/CLAUDE.md) · 🇳🇬 [yo](../yo/CLAUDE.md) · 🇨🇳 [zh-CN](../zh-CN/CLAUDE.md) · 🇹🇼 [zh-TW](../zh-TW/CLAUDE.md)

---

@AGENTS.md

**Todas las reglas del proyecto se encuentran en [`AGENTS.md`](AGENTS.md)** — la única fuente de verdad para cada asistente de IA
(arquitectura, convenciones, pruebas, controles de calidad, flujo de trabajo de git, las 23 Reglas Estrictas,
aprendizajes sobre PII). Léelo por completo; no vuelvas a añadir aquí las reglas del proyecto. Todo lo que aparece a continuación se aplica ÚNICAMENTE
a Claude Code: ajustes operativos de las reglas ya definidas en `AGENTS.md`.

## Aislamiento de worktrees — aspectos específicos de Claude Code

El protocolo obligatorio completo para worktrees (confirmación de la rama base, ruta canónica
`.claude/worktrees/`, `cp -al` node_modules, reglas de eliminación) está en `AGENTS.md` → Flujo de trabajo de Git → "Aislamiento de
worktrees". Puntos específicos de Claude Code:

- Confirma la rama base con el operador mediante `AskUserQuestion` (Regla Estricta #19), salvo que ya
  te la haya indicado.
- Prefiere la herramienta nativa `EnterWorktree`, que ya crea worktrees en
  `.claude/worktrees/` (la ruta canónica). Crea el worktree con el comando documentado `git
worktree add` y luego llama a `EnterWorktree` con su `path`.

## Seguridad entre sesiones — aspectos específicos de Claude Code

Las Reglas Estrictas #19/#21/#22 (en `AGENTS.md`) rigen las sesiones paralelas. Recordatorios operativos para este
entorno:

- **Reproduce literalmente la prohibición de `git stash` en el prompt de cada subagente que interactúe con git**
  (herramienta Agent / scripts de Workflow): los subagentes no heredan este archivo y la recurrencia
  registrada del incidente con stash se produjo a través de un subagente.
- Antes de fusionar o enviar cambios a cualquier PR que no hayas creado _en esta sesión_, ejecuta `git worktree list`
  y vuelve a comprobar `gh pr view <N> --json state,headRefOid` (Regla Estricta #22b).
- Finaliza cada sesión con el checkout principal en la rama en la que comenzó.

## Superpowers / artefactos de planificación — sustituciones de rutas

La convención `_tasks/` se define en `AGENTS.md` → "Artefactos de planificación e investigación". Las
skills de superpowers incluyen valores predeterminados que apuntan a `docs/…`; esos valores predeterminados quedan **sustituidos
aquí**. Cuando una skill de superpowers anuncie una ruta como "guardado en `docs/superpowers/plans/…`",
sustitúyela por el equivalente en `_tasks/…` antes de escribir:

| Artefacto (skill)                           | Valor predeterminado (NO usar) | Guardar aquí en su lugar                                      |
| ------------------------------------------- | ------------------------------ | ------------------------------------------------------------- |
| Planes (`writing-plans`)                    | `docs/superpowers/plans/`      | `_tasks/superpowers/plans/YYYY-MM-DD-<feature>.md`            |
| Especificaciones / diseño (`brainstorming`) | `docs/superpowers/specs/`      | `_tasks/superpowers/specs/YYYY-MM-DD-<topic>-design.md`       |
| Investigación (`deep-research`, ad hoc)     | `docs/research/`               | `_tasks/research/…`                                           |
| Entregas (`/handoff`)                       | —                              | `_tasks/hands-off/<YYYY-MM-DD>_<branch>_v<versão>_sess-<id>/` |

Confirma esos artefactos dentro del repositorio `_tasks/` (`git -C _tasks …`), nunca en el repositorio principal.

## Archivos temporales / de trabajo — usa `_artifacts/`, no `/tmp`

Este proyecto sustituye el bloc de notas temporal predeterminado de la sesión del entorno (`/tmp/claude-*/…`). Escribe
los archivos temporales/de trabajo — exportaciones, zips generados, resultados intermedios de uso puntual y cualquier cosa que,
de otro modo, colocarías en `/tmp` — en `/home/diegosouzapw/dev/proxys/OmniRoute/_artifacts/`.

- `_artifacts/` es una ruta raíz `_*`: ya está ignorada por git (`AGENTS.md` → "Rutas raíz `_*`"), existe
  únicamente en disco y nunca se versiona.
- Motivo: mantener los resultados temporales dentro del proyecto (en lugar de `/tmp`) facilita al operador
  encontrar y eliminar todo lo temporal en un único lugar, en vez de buscar en directorios efímeros
  `/tmp` específicos de cada sesión que desaparecen o acumulan archivos sin seguimiento.
- **No** confundas esto con `_tasks/` (Regla Estricta #23, su propio repositorio git privado para
  planes/especificaciones/investigaciones/entregas duraderos): `_artifacts/` es únicamente para archivos de trabajo desechables; nada
  de lo que haya aquí necesita conservarse ni versionarse.

## Base en verde antes de abrir PRs

Antes de crear una rama o abrir una PR, ejecuta la comprobación de base en verde (`AGENTS.md` → Flujo de trabajo de Git →
"Comprobación de base en verde"; las skills del proyecto hacen referencia a ella como `.agents/skills/_shared/base-green.md`). Una PR
abierta mientras el extremo de la base está en rojo debe incluir `⚠️ base-red inherited: #<issue>` en su cuerpo. Para
resolver un estado rojo acumulado (extremo de la base + PRs en rojo), usa la skill `/sweep-reds`.
